"""Tests unitaires (bibliothèque standard) : python -m unittest discover -s tests"""
import shutil
import sqlite3
import sys
import tempfile
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent.parent))

from tracker import build, config, db, opensky, snapshot  # noqa: E402
from tracker.airports import Airports, haversine_km  # noqa: E402

DAY = config.DAY
TODAY = 20726 * DAY  # un jour pair depuis l'epoch (2026-09-30 00:00 UTC)


def memory_db():
    conn = sqlite3.connect(":memory:")
    conn.executescript(db.SCHEMA)
    return conn


def fake_airports():
    rows = [
        {"ident": "KLAX", "type": "large_airport", "name": "Los Angeles Intl", "latitude_deg": "33.9425",
         "longitude_deg": "-118.408", "iso_country": "US", "municipality": "Los Angeles",
         "icao_code": "KLAX", "gps_code": "KLAX", "local_code": "LAX", "keywords": ""},
        {"ident": "KSJC", "type": "large_airport", "name": "San Jose Intl", "latitude_deg": "37.3626",
         "longitude_deg": "-121.929", "iso_country": "US", "municipality": "San Jose",
         "icao_code": "KSJC", "gps_code": "KSJC", "local_code": "SJC", "keywords": ""},
        {"ident": "TX99", "type": "small_airport", "name": "Ranch Strip", "latitude_deg": "30.0",
         "longitude_deg": "-97.0", "iso_country": "US", "municipality": "Nowhere",
         "icao_code": "", "gps_code": "", "local_code": "19TX", "keywords": ""},
        {"ident": "US-1", "type": "closed", "name": "Old Field", "latitude_deg": "31.0",
         "longitude_deg": "-81.0", "iso_country": "US", "municipality": "Darien",
         "icao_code": "", "gps_code": "", "local_code": "", "keywords": "3GE7"},
    ]
    return Airports(rows)


class WindowTests(unittest.TestCase):
    def test_windows_aligned_and_cover_history(self):
        ws = opensky.windows_recent_first(TODAY)
        self.assertTrue(all(w % (2 * DAY) == 0 for w in ws))
        self.assertEqual(ws, sorted(ws, reverse=True))
        # La première fenêtre contient la veille.
        self.assertLessEqual(ws[0], TODAY - DAY)
        self.assertGreater(ws[0] + 2 * DAY, TODAY - DAY)
        # La dernière recouvre le début de l'historique.
        start = config.history_start(TODAY)
        self.assertLessEqual(ws[-1], start)
        self.assertEqual(len(ws), 45)  # jour pair : [J-90, J) = 45 fenêtres exactement
        self.assertEqual(len(opensky.windows_recent_first(TODAY + DAY)), 46)  # jour impair : une de plus

    def test_window_containing_yesterday_on_odd_day(self):
        ws = opensky.windows_recent_first(TODAY + DAY)  # la veille est alors un jour pair
        self.assertEqual(ws[0], TODAY)

    def test_is_final(self):
        w = TODAY - 4 * DAY
        self.assertFalse(opensky.is_final(w, w + 2 * DAY + 10))
        self.assertTrue(opensky.is_final(w, w + 3 * DAY))

    def test_plan_yesterday_first_then_backfill(self):
        ws = opensky.windows_recent_first(TODAY)
        hexes = ["aaa", "bbb"]
        done = {("aaa", ws[0]): ws[0] + 10 * DAY,        # définitive : pas refaite
                ("bbb", ws[0]): ws[0] + DAY,              # pas définitive : refaite
                ("aaa", ws[1]): ws[1] + 10 * DAY}
        plan = opensky.plan_requests(hexes, done, TODAY)
        self.assertEqual(plan[0], (ws[0], "bbb"))
        self.assertEqual(plan[1], (ws[1], "bbb"))
        self.assertNotIn((ws[0], "aaa"), plan)
        self.assertNotIn((ws[1], "aaa"), plan)
        self.assertEqual(len(plan), 1 + 1 + 2 * (len(ws) - 2))


class GlobalModeTests(unittest.TestCase):
    def test_slots_cover_history_recent_first(self):
        slots = opensky.slots_recent_first(TODAY)
        self.assertEqual(slots[0], TODAY - config.SLOT_SECONDS)       # dernière tranche de la veille
        self.assertEqual(slots[-1], config.history_start(TODAY))
        self.assertEqual(len(slots), config.HISTORY_DAYS * 12)

    def test_plan_global_skips_final_slots(self):
        key, slots = config.GLOBAL_KEY, opensky.slots_recent_first(TODAY)
        done = {(key, slots[0]): TODAY + 7 * 3600,   # téléchargée après le traitement nocturne
                (key, slots[1]): TODAY + 60}         # trop tôt : à refaire
        plan = opensky.plan_global(done, TODAY)
        self.assertNotIn((slots[0], key), plan)
        self.assertEqual(plan[0], (slots[1], key))
        self.assertEqual(len(plan), len(slots) - 1)

    def test_global_covered_days(self):
        day = TODAY - 3 * DAY
        full = [(day + i * config.SLOT_SECONDS, day + 2 * DAY) for i in range(12)]
        partial = [(day - DAY + i * config.SLOT_SECONDS, day + 2 * DAY) for i in range(11)]
        self.assertEqual(build.global_covered_days(full + partial), frozenset({day}))
        start = config.history_start(TODAY)
        self.assertEqual(build.coverage_days([], start, TODAY, frozenset({day})), 1)


class DedupeTests(unittest.TestCase):
    def fl(self, first, last, dep, arr):
        return {"firstSeen": first, "lastSeen": last, "estDepartureAirport": dep,
                "estArrivalAirport": arr, "callsign": "N1  "}

    def test_keeps_most_complete_version(self):
        conn = memory_db()
        db.save_flight(conn, "abc", self.fl(1000, 5000, "KLAX", None))
        db.save_flight(conn, "abc", self.fl(1300, 5000, "KLAX", "KSJC"))  # plus complète
        self.assertEqual(db.save_flight(conn, "abc", self.fl(1100, 4000, "KLAX", None)), 0)
        rows = conn.execute("SELECT * FROM flights").fetchall()
        self.assertEqual(rows, [("abc", 1300, 5000, "KLAX", "KSJC", "N1")])

    def test_distinct_flights_kept_and_dedupe_idempotent(self):
        conn = memory_db()
        conn.executemany("INSERT INTO flights VALUES (?,?,?,?,?,?)",
                         [("abc", 1000, 5000, "KLAX", None, "N1"), ("abc", 1200, 5100, "KLAX", "KSJC", "N1"),
                          ("abc", 90000, 95000, "KSJC", "KLAX", "N1")])
        self.assertEqual(db.dedupe(conn), 1)
        self.assertEqual(db.dedupe(conn), 0)
        self.assertEqual(conn.execute("SELECT first_seen FROM flights ORDER BY 1").fetchall(), [(1200,), (90000,)])


class ComputeTests(unittest.TestCase):
    def setUp(self):
        self.ap = fake_airports()

    def test_airport_lookup(self):
        self.assertEqual(self.ap.lookup("klax")["city"], "Los Angeles")
        self.assertEqual(self.ap.lookup("19TX")["name"], "Ranch Strip")
        self.assertEqual(self.ap.lookup("3GE7")["city"], "Darien")
        self.assertIsNone(self.ap.lookup("ZZZZ"))
        info, dist = self.ap.nearest(33.95, -118.40)
        self.assertEqual(info["code"], "KLAX")
        self.assertLess(dist, 2)

    def test_flight_record_duration_distance(self):
        f = build.flight_record(("abc", 0, 3000, "KLAX", "KSJC", "N1"), self.ap)
        self.assertEqual(f["duration_min"], 50)
        self.assertAlmostEqual(f["distance_km"], 490, delta=10)
        g = build.flight_record(("abc", 0, 89, "KLAX", None, ""), self.ap)
        self.assertEqual(g["duration_min"], 1)
        self.assertIsNone(g["distance_km"])
        self.assertIsNone(g["arr"])

    def test_haversine(self):
        self.assertAlmostEqual(haversine_km(0, 0, 0, 1), 111.19, places=1)

    def test_stats(self):
        end = TODAY
        mk = lambda first, mins, dep="KLAX", arr="KSJC": {  # noqa: E731
            "first_seen": first, "last_seen": first + mins * 60, "dep": dep, "arr": arr, "duration_min": mins}
        flights = [mk(end - DAY, 60), mk(end - 10 * DAY, 90, "KSJC", "KLAX"),
                   mk(end - 60 * DAY, 30, "KLAX", None), mk(end + 3600, 45)]  # le dernier : après history.end
        self.assertEqual(build.period_stats(flights, end, 7), {"flights": 1, "hours": 1.0})
        self.assertEqual(build.period_stats(flights, end, 30), {"flights": 2, "hours": 2.5})
        self.assertEqual(build.period_stats(flights, end, 90), {"flights": 3, "hours": 3.0})
        top = build.top_airport(flights[:3], self.ap)
        self.assertEqual(top, {"code": "KLAX", "city": "Los Angeles", "count": 3})
        self.assertIsNone(build.top_airport([], self.ap))

    def test_coverage_days(self):
        start, end = config.history_start(TODAY), TODAY
        w = TODAY - 2 * DAY
        # Récupérée aujourd'hui : les deux jours sont terminés.
        self.assertEqual(build.coverage_days([(w, TODAY + 100)], start, end), 2)
        # Récupérée pendant son second jour : seul le premier compte.
        self.assertEqual(build.coverage_days([(w, w + DAY + 100)], start, end), 1)

    def test_snapshot_rows(self):
        ts = 1000
        self.assertEqual(snapshot.row_for(ts, "abc", None)[2], "unseen")
        air = snapshot.row_for(ts, "abc", {"lat": 1.0, "lon": 2.0, "alt_baro": 41000, "gs": 450,
                                           "track": 90.5, "flight": "N1 "})
        self.assertEqual(air, (ts, "abc", "airborne", 1.0, 2.0, 41000, 450.0, 90.5, "N1", None))
        ground = snapshot.row_for(ts, "abc", {"alt_baro": "ground",
                                              "lastPosition": {"lat": 3.0, "lon": 4.0, "seen_pos": 600}})
        self.assertEqual(ground[2:6], ("ground", 3.0, 4.0, None))
        self.assertEqual(ground[9], 600.0)


class CsvRoundTripTests(unittest.TestCase):
    def setUp(self):
        self.dir = Path(tempfile.mkdtemp())

    def tearDown(self):
        shutil.rmtree(self.dir)

    def test_round_trip_is_byte_identical_and_sorted(self):
        conn = memory_db()
        # Insertion volontairement dans le désordre.
        conn.executemany("INSERT INTO flights VALUES (?,?,?,?,?,?)",
                         [("bbb", 200, 300, None, "KSJC", ""), ("aaa", 500, 900, "KLAX", "KSJC", "N1"),
                          ("aaa", 100, 150, "KLAX", None, "N1")])
        conn.executemany("INSERT INTO windows VALUES (?,?,?)", [("bbb", 0, 5), ("aaa", 172800, 9), ("aaa", 0, 7)])
        conn.executemany("INSERT INTO snapshots VALUES (?,?,?,?,?,?,?,?,?,?)",
                         [(20, "bbb", "unseen", None, None, None, None, None, "", None),
                          (20, "aaa", "airborne", 52.3, 4.76, 41000, 470.2, 0.0, "N1", 30.0),
                          (10, "aaa", "ground", 1.5, -2.25, None, 0.0, None, "", None)])
        for ts, step in [(30, "opensky"), (30, "snapshot"), (30, "build"), (5, "build")]:
            db.record_run(conn, ts, step, "ok", 1, None, 'msg, avec "guillemets"')
        db.dump(conn, self.dir)
        first = {p.name: p.read_bytes() for p in self.dir.glob("*.csv")}
        self.assertEqual(len(first), 4)

        conn2, migrated = db.load(":memory:", self.dir)
        self.assertEqual(migrated, 0)
        db.dump(conn2, self.dir)
        second = {p.name: p.read_bytes() for p in self.dir.glob("*.csv")}
        self.assertEqual(first, second)

        flights = first["flights.csv"].decode().splitlines()
        self.assertEqual(flights[1:], ["aaa,100,150,KLAX,,N1", "aaa,500,900,KLAX,KSJC,N1", "bbb,200,300,,KSJC,"])
        runs = [line.split(",")[1] for line in first["runs.csv"].decode().splitlines()[1:]]
        self.assertEqual(runs, ["build", "opensky", "snapshot", "build"])
        self.assertNotIn(b"\r\n", first["snapshots.csv"])
        # dep vide relu comme NULL
        self.assertIsNone(conn2.execute("SELECT dep FROM flights WHERE icao24='bbb'").fetchone()[0])

    def test_prune_retention(self):
        conn = memory_db()
        cutoff = config.history_start(TODAY)
        conn.executemany("INSERT INTO flights VALUES (?,?,?,?,?,?)",
                         [("a", cutoff - 1, cutoff + 10, None, None, ""), ("a", cutoff, cutoff + 10, None, None, "")])
        for i in range(config.RUNS_KEEP + 5):
            db.record_run(conn, i, "build", "ok")
        db.prune(conn, TODAY)
        self.assertEqual(conn.execute("SELECT COUNT(*) FROM flights").fetchone()[0], 1)
        self.assertEqual(conn.execute("SELECT COUNT(*), MIN(ts) FROM runs").fetchone(), (config.RUNS_KEEP, 5))


if __name__ == "__main__":
    unittest.main()
