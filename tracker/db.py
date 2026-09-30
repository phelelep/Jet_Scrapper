"""Stockage : CSV de data/ (source de vérité, committés) <-> cache SQLite data/jets.db.

`load()` reconstruit la base à partir des CSV au début de chaque exécution, `dump()` réécrit
les CSV à la fin, triés de façon déterministe (voir docs/DATA_CONTRACT.md) pour garder des
diffs git minimaux. Au tout premier lancement (pas encore de flights.csv), les données déjà
présentes dans l'ancienne base jets.db sont reprises (migration).
"""
import csv
import os
import sqlite3
from pathlib import Path

from . import config

# Colonnes exportées dans les CSV, avec leur type : int, float, str (vide -> "")
# ou "opt" (texte, vide -> NULL).
TABLES = {
    "flights": [("icao24", str), ("first_seen", int), ("last_seen", int),
                ("dep", "opt"), ("arr", "opt"), ("callsign", str)],
    "windows": [("icao24", str), ("window_start", int), ("fetched_at", int)],
    "snapshots": [("ts", int), ("icao24", str), ("status", str), ("lat", float), ("lon", float),
                  ("alt_ft", int), ("gs_kt", float), ("track_deg", float), ("callsign", str)],
    "runs": [("ts", int), ("step", str), ("status", str), ("requests", int),
             ("credits_remaining", int), ("message", str)],
}

# Tri des CSV. Pour runs, à horodatage égal on garde l'ordre d'insertion (rowid).
SORT = {
    "flights": "icao24, first_seen",
    "windows": "icao24, window_start",
    "snapshots": "ts, icao24",
    "runs": "ts, rowid",
}

SCHEMA = """
CREATE TABLE flights (
    icao24 TEXT, first_seen INTEGER, last_seen INTEGER,
    dep TEXT, arr TEXT, callsign TEXT,
    PRIMARY KEY (icao24, first_seen));
CREATE TABLE windows (
    icao24 TEXT, window_start INTEGER, fetched_at INTEGER,
    PRIMARY KEY (icao24, window_start));
-- seen_pos : âge (s) de la position adsb.lol ; non exporté en CSV (absent du contrat),
-- donc connu uniquement pour le relevé de l'exécution en cours.
CREATE TABLE snapshots (
    ts INTEGER, icao24 TEXT, status TEXT, lat REAL, lon REAL,
    alt_ft INTEGER, gs_kt REAL, track_deg REAL, callsign TEXT, seen_pos REAL,
    PRIMARY KEY (ts, icao24));
CREATE TABLE runs (
    ts INTEGER, step TEXT, status TEXT, requests INTEGER,
    credits_remaining INTEGER, message TEXT);
"""


def csv_path(data_dir, table):
    return Path(data_dir) / f"{table}.csv"


def _parse(value, kind):
    if kind is str:
        return value
    if value == "":
        return None
    if kind == "opt":
        return value
    if kind is int:
        return int(float(value))
    return float(value)


def _format(value):
    if value is None:
        return ""
    if isinstance(value, float):
        return repr(value)
    return str(value)


def load_targets(path=config.TARGETS):
    """Liste des avions (lignes de targets.csv, dans l'ordre du fichier)."""
    with open(path, encoding="utf-8", newline="") as f:
        return [t for t in csv.DictReader(f) if t.get("hex")]


def _read_legacy(db_path):
    """Vols et fenêtres de l'ancienne base (avant les CSV), ou None."""
    if not Path(db_path).exists():
        return None
    old = sqlite3.connect(db_path)
    try:
        names = {r[0] for r in old.execute("SELECT name FROM sqlite_master WHERE type = 'table'")}
        if "flights" not in names:
            return None
        rows = {"flights": old.execute(
            "SELECT icao24, first_seen, last_seen, dep, arr, callsign FROM flights").fetchall()}
        rows["windows"] = (old.execute("SELECT icao24, window_start, fetched_at FROM windows").fetchall()
                           if "windows" in names else [])
        return rows
    finally:
        old.close()


def load(db_path=config.DB_PATH, data_dir=config.DATA_DIR):
    """Reconstruit la base SQLite à partir des CSV et renvoie la connexion.
    Renvoie aussi le nombre de lignes migrées depuis l'ancienne base (0 en régime normal)."""
    legacy = None
    if not csv_path(data_dir, "flights").exists():
        legacy = _read_legacy(db_path)
    if str(db_path) != ":memory:" and Path(db_path).exists():
        os.remove(db_path)  # cache jetable
    conn = sqlite3.connect(db_path)
    conn.executescript(SCHEMA)
    migrated = 0
    for table, cols in TABLES.items():
        path = csv_path(data_dir, table)
        rows = []
        if path.exists():
            with open(path, encoding="utf-8", newline="") as f:
                rows = [tuple(_parse(r.get(name, ""), kind) for name, kind in cols)
                        for r in csv.DictReader(f)]
        elif legacy and table in legacy:
            rows = legacy[table]
            migrated += len(rows)
        if rows:
            names = ", ".join(name for name, _ in cols)
            marks = ", ".join("?" for _ in cols)
            conn.executemany(f"INSERT OR REPLACE INTO {table} ({names}) VALUES ({marks})", rows)
    conn.commit()
    return conn, migrated


def dump(conn, data_dir=config.DATA_DIR):
    """Réécrit les CSV (triés, fins de ligne LF). Écriture atomique via un fichier temporaire."""
    for table, cols in TABLES.items():
        names = [name for name, _ in cols]
        rows = conn.execute(f"SELECT {', '.join(names)} FROM {table} ORDER BY {SORT[table]}").fetchall()
        path = csv_path(data_dir, table)
        tmp = path.with_suffix(".csv.tmp")
        with open(tmp, "w", encoding="utf-8", newline="") as f:
            w = csv.writer(f, lineterminator="\n")
            w.writerow(names)
            w.writerows([_format(v) for v in row] for row in rows)
        os.replace(tmp, path)


def prune(conn, today_ts):
    """Rétention : 90 jours glissants pour flights/windows/snapshots, 500 lignes pour runs."""
    cutoff = config.history_start(today_ts)
    conn.execute("DELETE FROM flights WHERE first_seen < ?", (cutoff,))
    conn.execute("DELETE FROM windows WHERE window_start + ? <= ?", (config.WINDOW_DAYS * config.DAY, cutoff))
    conn.execute("DELETE FROM snapshots WHERE ts < ?", (cutoff,))
    conn.execute("""DELETE FROM runs WHERE rowid NOT IN
                    (SELECT rowid FROM runs ORDER BY ts DESC, rowid DESC LIMIT ?)""", (config.RUNS_KEEP,))
    conn.commit()


def save_flight(conn, hex_code, fl):
    """Insère un vol au format OpenSky. OpenSky renvoie parfois deux versions du même vol
    (décollage à quelques minutes près, l'une sans aéroport d'arrivée) : on garde la plus
    complète. Renvoie 1 si le vol a été enregistré, 0 s'il a été écarté."""
    first, last = fl["firstSeen"], fl["lastSeen"]
    arr = fl.get("estArrivalAirport") or None
    for old_first, old_last, old_arr in conn.execute(
            "SELECT first_seen, last_seen, arr FROM flights WHERE icao24 = ? AND ABS(first_seen - ?) < 900",
            (hex_code, first)).fetchall():
        if (old_arr is not None, old_last) >= (arr is not None, last) and old_first != first:
            return 0  # la version déjà en base est au moins aussi complète
        conn.execute("DELETE FROM flights WHERE icao24 = ? AND first_seen = ?", (hex_code, old_first))
    conn.execute("INSERT INTO flights VALUES (?,?,?,?,?,?)",
                 (hex_code, first, last, fl.get("estDepartureAirport") or None, arr,
                  (fl.get("callsign") or "").strip()))
    return 1


def dedupe(conn):
    """Applique la règle de save_flight aux vols déjà en base (idempotent)."""
    rows = conn.execute("SELECT icao24, first_seen, last_seen, dep, arr, callsign FROM flights "
                        "ORDER BY icao24, first_seen").fetchall()
    conn.execute("DELETE FROM flights")
    for h, first, last, dep, arr, cs in rows:
        save_flight(conn, h, {"firstSeen": first, "lastSeen": last, "estDepartureAirport": dep,
                              "estArrivalAirport": arr, "callsign": cs})
    conn.commit()
    return len(rows) - conn.execute("SELECT COUNT(*) FROM flights").fetchone()[0]


def record_run(conn, ts, step, status, requests=None, credits_remaining=None, message=""):
    conn.execute("INSERT INTO runs VALUES (?,?,?,?,?,?)",
                 (int(ts), step, status, requests, credits_remaining, message or ""))
    conn.commit()
