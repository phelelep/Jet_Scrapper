"""Relevé instantané via adsb.lol (repris de scripts/update_status.py).

Appels groupés par paquets de ADSB_CHUNK avions, espacés de quelques secondes (API gratuite,
sans clé ; les appels un par un déclenchent la limite de débit). Une ligne par avion dans `snapshots`, y compris les
avions non détectés (`unseen`).
"""
import json
import time
import urllib.request

from . import config


def fetch_all(hex_codes):
    """(horodatage du relevé, {hex: entrée adsb.lol}, nombre d'appels)."""
    live, ts, calls = {}, None, 0
    for i in range(0, len(hex_codes), config.ADSB_CHUNK):
        if calls:
            time.sleep(config.ADSB_PAUSE_S)
        url = config.ADSB_URL.format(hexes=",".join(hex_codes[i:i + config.ADSB_CHUNK]))
        req = urllib.request.Request(url, headers={"User-Agent": config.USER_AGENT})
        with urllib.request.urlopen(req, timeout=30) as r:
            payload = json.load(r)
        calls += 1
        ts = ts or (int(payload["now"] / 1000) if payload.get("now") else int(time.time()))
        live.update({ac["hex"].lower(): ac for ac in payload.get("ac") or [] if ac.get("hex")})
    return ts or int(time.time()), live, calls


def _num(value, kind=float):
    if isinstance(value, bool) or not isinstance(value, (int, float)):
        return None
    return kind(value)


def row_for(ts, hex_code, ac):
    """Ligne de la table snapshots pour un avion (ac = entrée adsb.lol ou None)."""
    if ac is None:
        return (ts, hex_code, "unseen", None, None, None, None, None, "", None)
    lat, lon, seen_pos = _num(ac.get("lat")), _num(ac.get("lon")), None
    if (lat is None or lon is None) and isinstance(ac.get("lastPosition"), dict):
        last = ac["lastPosition"]
        lat, lon = _num(last.get("lat")), _num(last.get("lon"))
        seen_pos = _num(last.get("seen_pos")) or 0.0
    if lat is None or lon is None:
        lat = lon = seen_pos = None
    on_ground = ac.get("alt_baro") == "ground"
    return (ts, hex_code, "ground" if on_ground else "airborne", lat, lon,
            None if on_ground else _num(ac.get("alt_baro"), int),
            _num(ac.get("gs")), _num(ac.get("track")),
            (ac.get("flight") or "").strip(), seen_pos)


def take(conn, hexes):
    """Étape snapshot. Renvoie {status, requests, message, ts, counts}."""
    ts, live, calls = fetch_all(hexes)
    rows = [row_for(ts, h, live.get(h.lower())) for h in hexes]
    conn.executemany("INSERT OR REPLACE INTO snapshots VALUES (?,?,?,?,?,?,?,?,?,?)", rows)
    conn.commit()
    counts = {s: sum(1 for r in rows if r[2] == s) for s in ("airborne", "ground", "unseen")}
    msg = f"{counts['airborne']} en vol, {counts['ground']} au sol, {counts['unseen']} non détectés"
    return {"status": "ok", "requests": calls, "message": msg, "ts": ts, "counts": counts}
