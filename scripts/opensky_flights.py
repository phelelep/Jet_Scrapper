"""Récupère l'historique des vols des 90 derniers jours des avions de data/targets.csv via l'API OpenSky
et le stocke dans data/jets.db (SQLite).

Contraintes de l'API (doc OpenSky, vérifiées le 2026-09-29) :
- /flights/aircraft : fenêtre de 2 jours UTC maximum, alignée sur minuit ;
- 30 crédits par requête ; 4 000 crédits/jour (8 000 pour un feeder actif) ;
- données traitées la nuit : seuls les vols de la veille ou avant sont disponibles.

Stratégie : historique glissant de HISTORY_DAYS jours. Fenêtres de 2 jours alignées sur les
jours pairs depuis l'epoch (donc stables d'un lancement à l'autre), parcourues de la plus
récente à la plus ancienne, tous avions confondus (couverture équilibrée). Les vols et
fenêtres sortis de l'historique sont supprimés. Le script s'arrête
quand le budget de crédits du jour est épuisé ; relancé le lendemain, il reprend là où
il s'était arrêté. Une fenêtre trop récente est re-téléchargée jusqu'à être définitive.

Identifiants : fichier JSON {"clientId", "clientSecret"} désigné par la variable
d'environnement OPENSKY_CREDENTIALS (par défaut ~/.opensky/credentials.json,
puis ~/Downloads/credentials.json).

Usage : python scripts/opensky_flights.py [--max-calls N]
"""
import argparse
import csv
import json
import os
import sqlite3
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TARGETS = ROOT / "data" / "targets.csv"
DB = ROOT / "data" / "jets.db"
TOKEN_URL = "https://auth.opensky-network.org/auth/realms/opensky-network/protocol/openid-connect/token"
FLIGHTS_URL = "https://opensky-network.org/api/flights/aircraft?icao24={hex}&begin={begin}&end={end}"
HISTORY_DAYS = 90
WINDOW_DAYS = 2
CREDITS_PER_CALL = 30
DAY = 86400


def credentials_path():
    candidates = [os.environ.get("OPENSKY_CREDENTIALS"),
                  Path.home() / ".opensky" / "credentials.json",
                  Path.home() / "Downloads" / "credentials.json"]
    for p in candidates:
        if p and Path(p).is_file():
            return Path(p)
    raise SystemExit("Identifiants OpenSky introuvables (voir OPENSKY_CREDENTIALS).")


class OpenSky:
    def __init__(self):
        self.creds = json.loads(credentials_path().read_text(encoding="utf-8"))
        self.token, self.token_expiry = None, 0
        self.remaining = None

    def _auth_header(self):
        if time.time() > self.token_expiry - 60:  # jeton valable 30 min
            data = urllib.parse.urlencode({"grant_type": "client_credentials",
                                           "client_id": self.creds["clientId"],
                                           "client_secret": self.creds["clientSecret"]}).encode()
            with urllib.request.urlopen(TOKEN_URL, data, timeout=30) as r:
                tok = json.load(r)
            self.token, self.token_expiry = tok["access_token"], time.time() + tok["expires_in"]
        return {"Authorization": f"Bearer {self.token}"}

    def flights(self, hex_code, begin, end):
        """Liste des vols, ou None si l'API refuse (quota épuisé)."""
        req = urllib.request.Request(FLIGHTS_URL.format(hex=hex_code, begin=begin, end=end),
                                     headers=self._auth_header())
        try:
            with urllib.request.urlopen(req, timeout=60) as r:
                self.remaining = int(r.headers.get("X-Rate-Limit-Remaining", 0))
                return json.load(r)
        except urllib.error.HTTPError as e:
            if e.headers.get("X-Rate-Limit-Remaining"):
                self.remaining = int(e.headers["X-Rate-Limit-Remaining"])
            if e.code == 404:  # 404 = aucun vol sur la fenêtre
                return []
            if e.code == 429:
                return None
            raise


def open_db():
    db = sqlite3.connect(DB)
    db.executescript("""
        CREATE TABLE IF NOT EXISTS flights (
            icao24 TEXT, first_seen INTEGER, last_seen INTEGER,
            dep TEXT, arr TEXT, callsign TEXT,
            PRIMARY KEY (icao24, first_seen));
        CREATE TABLE IF NOT EXISTS windows (
            icao24 TEXT, window_start INTEGER, fetched_at INTEGER,
            PRIMARY KEY (icao24, window_start));
    """)
    return db


def save_flight(db, hex_code, fl):
    """Insère un vol. OpenSky renvoie parfois deux versions du même vol (décollage à
    quelques minutes près, l'une sans aéroport d'arrivée) : on garde la plus complète."""
    first, last = fl["firstSeen"], fl["lastSeen"]
    arr = fl.get("estArrivalAirport")
    for old_first, old_last, old_arr in db.execute(
            "SELECT first_seen, last_seen, arr FROM flights WHERE icao24 = ? AND ABS(first_seen - ?) < 900",
            (hex_code, first)).fetchall():
        if (old_arr is not None, old_last) >= (arr is not None, last) and old_first != first:
            return 0  # la version déjà en base est au moins aussi complète
        db.execute("DELETE FROM flights WHERE icao24 = ? AND first_seen = ?", (hex_code, old_first))
    db.execute("INSERT INTO flights VALUES (?,?,?,?,?,?)",
               (hex_code, first, last, fl.get("estDepartureAirport"), arr,
                (fl.get("callsign") or "").strip()))
    return 1


def dedupe(db):
    """Applique la règle de save_flight aux vols déjà en base."""
    rows = db.execute("SELECT icao24, first_seen, last_seen, dep, arr, callsign FROM flights ORDER BY icao24, first_seen").fetchall()
    db.execute("DELETE FROM flights")
    for h, first, last, dep, arr, cs in rows:
        save_flight(db, h, {"firstSeen": first, "lastSeen": last, "estDepartureAirport": dep,
                            "estArrivalAirport": arr, "callsign": cs})
    db.commit()


def history_start(today_ts):
    """Début (epoch UTC, minuit) de l'historique glissant."""
    return (today_ts // DAY - HISTORY_DAYS) * DAY


def windows_recent_first(today_ts):
    """Débuts des fenêtres de 2 jours (epoch UTC) qui recouvrent l'historique, de la plus
    récente (celle qui contient la veille) à la plus ancienne."""
    yesterday = today_ts // DAY - 1
    start = yesterday - yesterday % WINDOW_DAYS
    cutoff = history_start(today_ts) // DAY
    starts = []
    while start + WINDOW_DAYS > cutoff:
        starts.append(start * DAY)
        start -= WINDOW_DAYS
    return starts


def prune(db, today_ts):
    cutoff = history_start(today_ts)
    db.execute("DELETE FROM flights WHERE first_seen < ?", (cutoff,))
    db.execute("DELETE FROM windows WHERE window_start + ? <= ?", (WINDOW_DAYS * DAY, cutoff))
    db.commit()


def is_final(window_start, fetched_at):
    # Définitive si téléchargée au moins un jour après la fin de la fenêtre (traitement nocturne)
    return fetched_at >= window_start + (WINDOW_DAYS + 1) * DAY


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--max-calls", type=int, default=None, help="plafond de requêtes pour ce lancement")
    args = ap.parse_args()

    with open(TARGETS, encoding="utf-8", newline="") as f:
        hexes = [t["hex"] for t in csv.DictReader(f)]
    db = open_db()
    today_ts = int(time.time()) // DAY * DAY
    prune(db, today_ts)
    dedupe(db)
    done ={(h, w): fa for h, w, fa in db.execute("SELECT icao24, window_start, fetched_at FROM windows")}
    api = OpenSky()

    todo = [(w, h) for w in windows_recent_first(today_ts) for h in hexes
            if (h, w) not in done or not is_final(w, done[(h, w)])]
    print(f"{len(todo)} fenêtres (avion x 2 jours) à récupérer")

    calls = new_flights = 0
    for w, h in todo:
        if args.max_calls is not None and calls >= args.max_calls:
            break
        if api.remaining is not None and api.remaining < CREDITS_PER_CALL:
            print("Budget de crédits du jour épuisé.")
            break
        result = api.flights(h, w, w + WINDOW_DAYS * DAY - 1)
        calls += 1
        if result is None:
            print("Quota atteint (429).")
            break
        for fl in result:
            new_flights += save_flight(db, h, fl)
        db.execute("INSERT OR REPLACE INTO windows VALUES (?,?,?)", (h, w, int(time.time())))
        db.commit()

    total_windows = len(windows_recent_first(today_ts))
    print(f"{calls} requêtes, {new_flights} vols enregistrés, crédits restants : {api.remaining}")
    for h, n, cov in db.execute("""
            SELECT w.icao24, (SELECT COUNT(*) FROM flights f WHERE f.icao24 = w.icao24), COUNT(*)
            FROM windows w GROUP BY w.icao24 ORDER BY 2 DESC"""):
        print(f"  {h} : {n} vols, couverture {cov}/{total_windows} fenêtres")


if __name__ == "__main__":
    main()
