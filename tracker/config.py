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

# adsb.lol : un seul appel groupé pour tous les avions (les appels un par un déclenchent
# la limite de débit par IP).
ADSB_URL = "https://api.adsb.lol/v2/hex/{hexes}"
USER_AGENT = "jet-tracker-research/0.1"


def today_start(now_ts):
    """Minuit UTC (epoch) du jour de `now_ts`."""
    return int(now_ts) // DAY * DAY


def history_start(today_ts):
    """Début (epoch UTC, minuit) de l'historique glissant."""
    return (today_ts // DAY - HISTORY_DAYS) * DAY
