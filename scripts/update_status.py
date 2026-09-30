"""Met à jour la section « Statut en direct » de JETS.md à partir de data/targets.csv.

Source temps réel : API publique adsb.lol (gratuite, sans clé), un seul appel groupé.
Position → aéroport le plus proche via OurAirports (data/airports.csv).

Usage : python scripts/update_status.py
"""
import csv
import json
import math
import sqlite3
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
TARGETS = ROOT / "data" / "targets.csv"
AIRPORTS = ROOT / "data" / "airports.csv"
REPORT = ROOT / "JETS.md"
DB = ROOT / "data" / "jets.db"  # rempli par opensky_flights.py
API = "https://api.adsb.lol/v2/hex/{hex}"
START, END = "<!-- STATUS:START -->", "<!-- STATUS:END -->"


def load_airports():
    keep = {"large_airport", "medium_airport", "small_airport"}
    with open(AIRPORTS, encoding="utf-8", newline="") as f:
        return [
            (float(a["latitude_deg"]), float(a["longitude_deg"]),
             a["icao_code"] or a["gps_code"] or a["ident"], a["name"], a["municipality"], a["iso_country"])
            for a in csv.DictReader(f) if a["type"] in keep
        ]


def haversine_km(lat1, lon1, lat2, lon2):
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp, dl = p2 - p1, math.radians(lon2 - lon1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 6371 * 2 * math.asin(math.sqrt(a))


def nearest_airport(airports, lat, lon):
    best = min(airports, key=lambda a: haversine_km(lat, lon, a[0], a[1]))
    return best, haversine_km(lat, lon, best[0], best[1])


def fetch_all(hex_codes):
    """Un seul appel pour tous les avions (l'API limite le débit par IP)."""
    req = urllib.request.Request(API.format(hex=",".join(hex_codes)), headers={"User-Agent": "jet-tracker-research/0.1"})
    with urllib.request.urlopen(req, timeout=30) as r:
        return {ac["hex"].lower(): ac for ac in json.load(r).get("ac") or []}


def describe(ac, airports):
    if ac is None:
        return "⚪ Non détecté", "—"
    lat, lon = ac.get("lat"), ac.get("lon")
    stale = ""
    if lat is None and ac.get("lastPosition"):
        last = ac["lastPosition"]
        lat, lon = last["lat"], last["lon"]
        stale = f" (dernière position, il y a {last.get('seen_pos', 0) / 60:.0f} min)"
    where = "position inconnue"
    if lat is not None and lon is not None:
        (_, _, code, name, city, country), dist = nearest_airport(airports, lat, lon)
        where = f"{dist:.0f} km de {code} ({city or name}, {country}){stale}"
    if ac.get("alt_baro") == "ground":
        return "🟡 Au sol, transpondeur actif", where
    callsign = (ac.get("flight") or "").strip() or "?"
    return f"🟢 En vol — {callsign}, {ac.get('alt_baro')} ft, {ac.get('gs', '?')} kt", f"survol : {where}"


def flight_counts():
    """{hex: (vols sur l'historique glissant, jours couverts)} depuis la base OpenSky, vide si absente."""
    if not DB.exists():
        return {}
    with sqlite3.connect(DB) as db:
        return {h: (n, 2 * cov) for h, n, cov in db.execute("""
            SELECT w.icao24, (SELECT COUNT(*) FROM flights f WHERE f.icao24 = w.icao24), COUNT(*)
            FROM windows w GROUP BY w.icao24""")}


def main():
    airports = load_airports()
    with open(TARGETS, encoding="utf-8", newline="") as f:
        targets = list(csv.DictReader(f))

    now = datetime.now(timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
    lines = [
        f"_Relevé du {now} — statut : adsb.lol ; vols 90 j : OpenSky (nombre de vols / jours déjà récupérés sur les 90 derniers)._",
        "",
        "| Immat. | Hex | Entité | Statut actuel | Position actuelle | Vols 90 j |",
        "|---|---|---|---|---|---|",
    ]
    live = fetch_all([t["hex"] for t in targets])
    counts = flight_counts()
    for t in targets:
        status, where = describe(live.get(t["hex"]), airports)
        n, days = counts.get(t["hex"], (None, 0))
        flights = f"{n} vols / {days} j" if n is not None else "n/d"
        lines.append(f"| {t['immatriculation']} | `{t['hex']}` | {t['personne_ou_entreprise']} | {status} | {where} | {flights} |")

    text = REPORT.read_text(encoding="utf-8")
    head, _, rest = text.partition(START)
    _, _, tail = rest.partition(END)
    REPORT.write_text(f"{head}{START}\n" + "\n".join(lines) + f"\n{END}{tail}", encoding="utf-8")
    print(f"{len(targets)} avions mis à jour dans {REPORT.name}")


if __name__ == "__main__":
    main()
