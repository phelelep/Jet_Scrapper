"""Génération de site/data.js (format : docs/DATA_CONTRACT.md) et de la section
« Statut en direct » de JETS.md, à partir de la base et du dernier relevé adsb.lol."""
import json
import os
import time
from collections import Counter
from datetime import datetime, timezone

from . import config

DAY = config.DAY
STATUS_START, STATUS_END = "<!-- STATUS:START -->", "<!-- STATUS:END -->"


# ---------------------------------------------------------------- calculs sur les vols

def duration_min(first_seen, last_seen):
    return max(0, round((last_seen - first_seen) / 60))


def flight_record(row, airports):
    """Vol au format du contrat. `row` = (icao24, first_seen, last_seen, dep, arr, callsign)."""
    h, first, last, dep, arr, cs = row
    dist = airports.distance_km(dep, arr) if dep and arr else None
    return {"hex": h, "first_seen": first, "last_seen": last, "dep": dep or None, "arr": arr or None,
            "callsign": cs or "", "duration_min": duration_min(first, last),
            "distance_km": None if dist is None else round(dist, 1)}


def period_stats(flights, end, days):
    """{flights, hours} des vols dont le décollage est dans [end - days, end)."""
    sel = [f for f in flights if end - days * DAY <= f["first_seen"] < end]
    return {"flights": len(sel), "hours": round(sum(f["duration_min"] for f in sel) / 60, 1)}


def top_airport(flights, airports):
    """Aéroport le plus fréquent (nombre de vols qui y partent ou y arrivent), None si aucun."""
    c = Counter()
    for f in flights:
        for code in {f["dep"], f["arr"]} - {None}:
            c[code] += 1
    if not c:
        return None
    code, count = min(c.items(), key=lambda kv: (-kv[1], kv[0]))  # égalité : ordre alphabétique
    info = airports.lookup(code)
    return {"code": code, "city": (info["city"] or info["name"]) if info else "", "count": count}


def coverage_days(window_rows, start, end):
    """Jours de [start, end) couverts par une fenêtre téléchargée après la fin de ce jour.
    `window_rows` : [(window_start, fetched_at)] d'un avion."""
    covered = set()
    for w, fetched in window_rows:
        for d in range(w, w + config.WINDOW_DAYS * DAY, DAY):
            if start <= d < end and fetched >= d + DAY:
                covered.add(d)
    return len(covered)


def aircraft_stats(flights, window_rows, start, end, airports):
    in_history = [f for f in flights if start <= f["first_seen"] < end]
    return {"d7": period_stats(flights, end, 7), "d30": period_stats(flights, end, 30),
            "d90": period_stats(flights, end, config.HISTORY_DAYS),
            "top_airport": top_airport(in_history, airports),
            "coverage_days": coverage_days(window_rows, start, end)}


# ---------------------------------------------------------------- relevé adsb.lol

def latest_snapshot(conn):
    """(ts, {hex: ligne}) du relevé le plus récent, ou (None, {})."""
    ts = conn.execute("SELECT MAX(ts) FROM snapshots").fetchone()[0]
    if ts is None:
        return None, {}
    rows = conn.execute("""SELECT icao24, status, lat, lon, alt_ft, gs_kt, track_deg, callsign, seen_pos
                           FROM snapshots WHERE ts = ?""", (ts,)).fetchall()
    return ts, {r[0]: r for r in rows}


def position_of(snap):
    if snap is None or snap[1] == "unseen" or snap[2] is None or snap[3] is None:
        return None
    _, status, lat, lon, alt, gs, track, cs, seen_pos = snap
    return {"lat": lat, "lon": lon, "alt_ft": None if status == "ground" else alt,
            "gs_kt": gs, "track_deg": track, "callsign": cs or "",
            "stale_min": round(seen_pos / 60) if seen_pos else 0}


# ---------------------------------------------------------------- data.js

def build_data(conn, targets, airports, today_ts, generated_at=None):
    start, end = config.history_start(today_ts), today_ts
    rows = conn.execute("""SELECT icao24, first_seen, last_seen, dep, arr, callsign FROM flights
                           WHERE first_seen >= ? ORDER BY first_seen DESC, icao24""", (start,)).fetchall()
    flights = [flight_record(r, airports) for r in rows]
    by_hex = {}
    for f in flights:
        by_hex.setdefault(f["hex"], []).append(f)
    windows = {}
    for h, w, fa in conn.execute("SELECT icao24, window_start, fetched_at FROM windows"):
        windows.setdefault(h, []).append((w, fa))

    snap_ts, snaps = latest_snapshot(conn)
    aircraft, counts = [], Counter()
    for t in targets:
        h = t["hex"].lower()
        snap = snaps.get(h)
        status = snap[1] if snap else "unseen"
        counts[status] += 1
        pos = position_of(snap)
        nearest = None
        if pos:
            info, dist = airports.nearest(pos["lat"], pos["lon"])
            if info:
                nearest = {"code": info["code"], "name": info["name"], "city": info["city"],
                           "country": info["country"], "dist_km": round(dist, 1)}
        mine = by_hex.get(h, [])
        last = mine[0] if mine else None
        aircraft.append({
            "hex": h, "reg": t["immatriculation"], "group": t["groupe"], "entity": t["entite"],
            "person": t["personne_ou_entreprise"], "model": t["modele"], "year": t.get("annee") or "",
            "owner": t["proprietaire_faa"], "confidence": t["confiance"], "source": t["source"],
            "status": status, "position": pos, "nearest_airport": nearest,
            "last_flight": None if last is None else {k: last[k] for k in ("first_seen", "last_seen", "dep", "arr")},
            "stats": aircraft_stats(mine, windows.get(h, []), start, end, airports),
        })

    codes = sorted({c for f in flights for c in (f["dep"], f["arr"]) if c})
    airport_map = {}
    for code in codes:
        info = airports.lookup(code)
        if info:
            airport_map[code] = {k: info[k] for k in ("name", "city", "country", "lat", "lon")}

    return {
        "generated_at": int(generated_at if generated_at is not None else time.time()),
        "snapshot_at": snap_ts,
        "history": {"days": config.HISTORY_DAYS, "start": start, "end": end},
        "counts": {"total": len(targets), "airborne": counts["airborne"], "ground": counts["ground"],
                   "unseen": counts["unseen"]},
        "aircraft": aircraft,
        "airports": airport_map,
        "flights": flights,
    }


def write_data_js(data, path=config.DATA_JS):
    path.parent.mkdir(parents=True, exist_ok=True)
    tmp = path.with_suffix(".js.tmp")
    with open(tmp, "w", encoding="utf-8", newline="\n") as f:
        f.write("window.JETS_DATA = ")
        json.dump(data, f, ensure_ascii=False, indent=1)
        f.write(";\n")
    os.replace(tmp, path)


# ---------------------------------------------------------------- JETS.md

def _describe(a):
    pos, near = a["position"], a["nearest_airport"]
    where = "position inconnue"
    if near:
        where = f"{near['dist_km']:.0f} km de {near['code']} ({near['city'] or near['name']}, {near['country']})"
        if pos and pos["stale_min"]:
            where += f" (dernière position, il y a {pos['stale_min']} min)"
    if a["status"] == "unseen":
        return "⚪ Non détecté", "—"
    if a["status"] == "ground":
        return "🟡 Au sol, transpondeur actif", where
    alt = pos["alt_ft"] if pos and pos["alt_ft"] is not None else "?"
    gs = f"{pos['gs_kt']:.0f}" if pos and pos["gs_kt"] is not None else "?"
    cs = (pos["callsign"] if pos else "") or "?"
    return f"🟢 En vol — {cs}, {alt} ft, {gs} kt", f"survol : {where}"


def update_jets_md(data, path=config.JETS_MD):
    """Réécrit la section entre STATUS:START et STATUS:END (vue du dernier relevé)."""
    if data["snapshot_at"] is not None:
        when = datetime.fromtimestamp(data["snapshot_at"], timezone.utc).strftime("%Y-%m-%d %H:%M UTC")
        head = f"_Relevé du {when}"
    else:
        head = "_Aucun relevé adsb.lol disponible"
    lines = [
        f"{head} — statut : adsb.lol ; vols 90 j : OpenSky (nombre de vols / jours déjà récupérés "
        f"sur les 90 derniers). Section générée par `python update.py`._",
        "",
        "| Immat. | Hex | Entité | Statut actuel | Position actuelle | Vols 90 j |",
        "|---|---|---|---|---|---|",
    ]
    for a in data["aircraft"]:
        status, where = _describe(a)
        s = a["stats"]
        lines.append(f"| {a['reg']} | `{a['hex']}` | {a['person']} | {status} | {where} | "
                     f"{s['d90']['flights']} vols / {s['coverage_days']} j |")
    text = path.read_text(encoding="utf-8")
    if STATUS_START not in text or STATUS_END not in text:
        raise RuntimeError(f"marqueurs {STATUS_START} / {STATUS_END} absents de {path.name}")
    before, _, rest = text.partition(STATUS_START)
    _, _, after = rest.partition(STATUS_END)
    path.write_text(f"{before}{STATUS_START}\n" + "\n".join(lines) + f"\n{STATUS_END}{after}",
                    encoding="utf-8", newline="\n")


def build(conn, targets, airports, today_ts):
    """Étape build : data.js puis JETS.md. Renvoie {status, requests, message, data}."""
    data = build_data(conn, targets, airports, today_ts)
    write_data_js(data)
    update_jets_md(data)
    return {"status": "ok", "requests": 0, "data": data,
            "message": f"{len(data['aircraft'])} avions, {len(data['flights'])} vols, "
                       f"{len(data['airports'])} aéroports"}
