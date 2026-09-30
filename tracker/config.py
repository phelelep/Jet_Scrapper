"""Chemins et constantes partagés par tout le package."""
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT / "data"
TARGETS = DATA_DIR / "targets.csv"
AIRPORTS = DATA_DIR / "airports.csv"
DB_PATH = DATA_DIR / "jets.db"          # cache jetable, reconstruit depuis les CSV
SITE_DIR = ROOT / "site"
DATA_JS = SITE_DIR / "data.js"
JETS_MD = ROOT / "JETS.md"

DAY = 86400
HISTORY_DAYS = 90                        # historique glissant (vols, fenêtres, relevés)
RUNS_KEEP = 500                          # lignes conservées dans runs.csv

# OpenSky (doc vérifiée le 2026-09-29) : fenêtre de 2 jours UTC max, 30 crédits par requête,
# 4 000 crédits/jour, données de la veille disponibles après le traitement nocturne.
OPENSKY_TOKEN_URL = ("https://auth.opensky-network.org/auth/realms/opensky-network/"
                     "protocol/openid-connect/token")
OPENSKY_FLIGHTS_URL = "https://opensky-network.org/api/flights/aircraft?icao24={hex}&begin={begin}&end={end}"
WINDOW_DAYS = 2
CREDITS_PER_CALL = 30

# Au-delà de GLOBAL_MODE_MIN_AIRCRAFT avions, un appel par avion coûte trop cher : on passe
# à /flights/all (tous les vols du monde par tranches de 2 h, filtrés de notre côté).
# 12 appels couvrent une journée quel que soit le nombre d'avions. Dans windows.csv, ces
# tranches sont enregistrées avec icao24 = GLOBAL_KEY.
OPENSKY_ALL_URL = "https://opensky-network.org/api/flights/all?begin={begin}&end={end}"
SLOT_SECONDS = 2 * 3600
GLOBAL_MODE_MIN_AIRCRAFT = 40
GLOBAL_KEY = "*"

# adsb.lol : appels groupés par paquets (les appels un par un déclenchent
# la limite de débit par IP).
ADSB_URL = "https://api.adsb.lol/v2/hex/{hexes}"
ADSB_CHUNK = 100      # avions par appel (URL raisonnable)
ADSB_PAUSE_S = 2      # pause entre deux appels
USER_AGENT = "jet-tracker-research/0.1"


def today_start(now_ts):
    """Minuit UTC (epoch) du jour de `now_ts`."""
    return int(now_ts) // DAY * DAY


def history_start(today_ts):
    """Début (epoch UTC, minuit) de l'historique glissant."""
    return (today_ts // DAY - HISTORY_DAYS) * DAY
