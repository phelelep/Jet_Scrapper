"""Historique des vols via l'API OpenSky /flights/aircraft (repris de scripts/opensky_flights.py).

Stratégie de budget (4 000 crédits/jour, 30 par requête) :
1. d'abord la fenêtre qui contient la veille, pour chaque avion ;
2. puis le rattrapage de l'historique de 90 jours, fenêtres de la plus récente à la plus
   ancienne, tous avions confondus, avec le reste du quota.
Les fenêtres de 2 jours sont alignées sur les jours pairs depuis l'epoch (stables d'un
lancement à l'autre). Une fenêtre récupérée avant d'être définitive est re-téléchargée.
Arrêt propre sur un 429 ou quand X-Rate-Limit-Remaining < 30.

Identifiants : fichier JSON {"clientId", "clientSecret"} désigné par OPENSKY_CREDENTIALS,
sinon ~/.opensky/credentials.json, puis ~/Downloads/credentials.json.
Le secret n'est jamais affiché, journalisé ni copié.
"""
import json
import os
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

from . import config
from .db import save_flight

DAY = config.DAY
WINDOW = config.WINDOW_DAYS * DAY


class QuotaExhausted(Exception):
    pass


def credentials_path():
    candidates = [os.environ.get("OPENSKY_CREDENTIALS"),
                  Path.home() / ".opensky" / "credentials.json",
                  Path.home() / "Downloads" / "credentials.json"]
    for p in candidates:
        if p and Path(p).is_file():
            return Path(p)
    return None


class OpenSky:
    def __init__(self, creds_file):
        creds = json.loads(Path(creds_file).read_text(encoding="utf-8"))
        # Seuls ces deux champs sont gardés, et uniquement en mémoire.
        self._client_id = creds["clientId"]
        self._client_secret = creds["clientSecret"]
        self._token, self._token_expiry = None, 0
        self.remaining = None
        self.retry_after = None

    def _auth_header(self):
        if time.time() > self._token_expiry - 60:  # jeton valable 30 min
            data = urllib.parse.urlencode({"grant_type": "client_credentials",
                                           "client_id": self._client_id,
                                           "client_secret": self._client_secret}).encode()
            try:
                with urllib.request.urlopen(config.OPENSKY_TOKEN_URL, data, timeout=30) as r:
                    tok = json.load(r)
            except urllib.error.HTTPError as e:
                # Message volontairement minimal : ni corps de réponse ni identifiants.
                raise RuntimeError(f"authentification OpenSky refusée (HTTP {e.code})") from None
            self._token, self._token_expiry = tok["access_token"], time.time() + tok["expires_in"]
        return {"Authorization": f"Bearer {self._token}"}

    def _read_remaining(self, headers):
        value = headers.get("X-Rate-Limit-Remaining") if headers else None
        if value not in (None, ""):
            self.remaining = int(value)

    def flights(self, hex_code, begin, end):
        """Vols d'un avion sur la fenêtre ; lève QuotaExhausted sur un 429."""
        return self._get(config.OPENSKY_FLIGHTS_URL.format(hex=hex_code, begin=begin, end=end))

    def all_flights(self, begin, end):
        """Tous les vols (tous avions) sur une tranche de 2 h maximum."""
        return self._get(config.OPENSKY_ALL_URL.format(begin=begin, end=end))

    def _get(self, url):
        req = urllib.request.Request(url, headers=self._auth_header())
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                self._read_remaining(r.headers)
                return json.load(r) or []
        except urllib.error.HTTPError as e:
            self._read_remaining(e.headers)
            if e.code == 404:  # 404 = aucun vol sur la fenêtre
                return []
            if e.code == 429:
                self.retry_after = e.headers.get("X-Rate-Limit-Retry-After-Seconds") if e.headers else None
                raise QuotaExhausted() from None
            raise


def window_of(day_ts):
    """Début de la fenêtre de 2 jours (alignée sur les jours pairs) qui contient `day_ts`."""
    d = day_ts // DAY
    return (d - d % config.WINDOW_DAYS) * DAY


def windows_recent_first(today_ts):
    """Débuts des fenêtres qui recouvrent l'historique, de la plus récente (celle qui
    contient la veille) à la plus ancienne."""
    start = window_of(today_ts - DAY)
    cutoff = config.history_start(today_ts)
    starts = []
    while start + WINDOW > cutoff:
        starts.append(start)
        start -= WINDOW
    return starts


def is_final(window_start, fetched_at):
    """Définitive si téléchargée au moins un jour après la fin de la fenêtre (traitement nocturne)."""
    return fetched_at >= window_start + WINDOW + DAY


def plan_requests(hexes, done, today_ts):
    """Ordre des requêtes [(window_start, hex)] : la fenêtre de la veille pour chaque avion,
    puis le rattrapage du plus récent au plus ancien. `done` : {(hex, window_start): fetched_at}."""
    def needed(h, w):
        return (h, w) not in done or not is_final(w, done[(h, w)])

    windows = windows_recent_first(today_ts)
    first = [(windows[0], h) for h in hexes if needed(h, windows[0])]
    rest = [(w, h) for w in windows[1:] for h in hexes if needed(h, w)]
    return first + rest


def slot_is_final(slot_start, fetched_at):
    """Tranche de 2 h définitive si téléchargée au moins 6 h après la fin de sa journée UTC
    (le traitement nocturne d'OpenSky a eu lieu)."""
    return fetched_at >= (slot_start // DAY + 1) * DAY + 6 * 3600


def slots_recent_first(today_ts):
    """Tranches de 2 h de la veille puis des jours précédents, jusqu'au début de l'historique."""
    cutoff = config.history_start(today_ts)
    return list(range(today_ts - config.SLOT_SECONDS, cutoff - 1, -config.SLOT_SECONDS))


def plan_global(done, today_ts):
    """Ordre des requêtes [(slot_start, GLOBAL_KEY)] en mode /flights/all."""
    key = config.GLOBAL_KEY
    return [(s, key) for s in slots_recent_first(today_ts)
            if (key, s) not in done or not slot_is_final(s, done[(key, s)])]


def collect(conn, hexes, today_ts, max_calls=None, log=print):
    """Étape OpenSky. Renvoie {status, requests, credits_remaining, message, new_flights}.
    Mode par avion (/flights/aircraft) pour une petite flotte, mode global (/flights/all)
    au-delà de GLOBAL_MODE_MIN_AIRCRAFT avions."""
    result = {"status": "ok", "requests": 0, "credits_remaining": None, "message": "", "new_flights": 0}
    creds = credentials_path()
    if creds is None:
        result.update(status="error", message="identifiants OpenSky introuvables (voir OPENSKY_CREDENTIALS)")
        return result

    done = {(h, w): fa for h, w, fa in conn.execute("SELECT icao24, window_start, fetched_at FROM windows")}
    global_mode = len(hexes) >= config.GLOBAL_MODE_MIN_AIRCRAFT
    if global_mode:
        todo = plan_global(done, today_ts)
        log(f"  OpenSky (mode global /flights/all) : {len(todo)} tranches de 2 h à récupérer")
    else:
        todo = plan_requests(hexes, done, today_ts)
        log(f"  OpenSky : {len(todo)} fenêtres (avion x 2 jours) à récupérer")
    if not todo:
        result["message"] = "historique à jour"
        return result

    tracked = set(hexes)
    api = OpenSky(creds)
    stop = None
    try:
        for w, h in todo:
            if max_calls is not None and result["requests"] >= max_calls:
                stop = f"plafond --max-calls {max_calls} atteint"
                break
            if api.remaining is not None and api.remaining < config.CREDITS_PER_CALL:
                stop = "budget de crédits du jour épuisé"
                break
            result["requests"] += 1
            if global_mode:
                for fl in api.all_flights(w, w + config.SLOT_SECONDS):
                    icao = (fl.get("icao24") or "").lower()
                    if icao in tracked:
                        result["new_flights"] += save_flight(conn, icao, fl)
            else:
                for fl in api.flights(h, w, w + WINDOW - 1):
                    result["new_flights"] += save_flight(conn, h, fl)
            conn.execute("INSERT OR REPLACE INTO windows VALUES (?,?,?)", (h, w, int(time.time())))
            conn.commit()
    except QuotaExhausted:
        stop = "quota atteint (429)"
        if api.retry_after:
            stop += f", réessayer dans {int(float(api.retry_after)) // 3600} h"
    except Exception as e:  # réseau, HTTP inattendu... : on garde ce qui a déjà été enregistré
        result.update(status="error", message=f"{type(e).__name__}: {e}")
    finally:
        result["credits_remaining"] = api.remaining

    if result["status"] == "ok":
        left = len(todo) - result["requests"] + (1 if stop == "quota atteint (429)" else 0)
        if stop and left > 0:
            result["status"] = "partial"
            result["message"] = f"{stop} ; {left} {'tranches' if global_mode else 'fenêtres'} restantes"
        else:
            result["message"] = "historique à jour"
    result["message"] = f"{result['new_flights']} vols enregistrés ; " + result["message"]
    return result
