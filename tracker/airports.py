"""Aéroports OurAirports (data/airports.csv) : aéroport le plus proche d'une position et
recherche par code.

Les codes renvoyés par OpenSky sont le plus souvent des codes OACI (KLAX), mais parfois
des codes locaux ou GPS (ex. 19TX) : on cherche dans icao_code, gps_code, ident puis
local_code, dans cet ordre de priorité. En dernier recours, un code peut figurer dans le
champ keywords (anciens codes d'aéroports fermés, ex. 3GE7 : OpenSky utilise encore certains
de ces anciens codes).
"""
import csv
import math

from . import config

# Types retenus pour « l'aéroport le plus proche » (pas d'héliports ni d'hydrobases).
NEAREST_TYPES = {"large_airport", "medium_airport", "small_airport"}
CODE_FIELDS = ("icao_code", "gps_code", "ident", "local_code", "keywords")


def haversine_km(lat1, lon1, lat2, lon2):
    p1, p2 = math.radians(lat1), math.radians(lat2)
    dp, dl = p2 - p1, math.radians(lon2 - lon1)
    a = math.sin(dp / 2) ** 2 + math.cos(p1) * math.cos(p2) * math.sin(dl / 2) ** 2
    return 6371 * 2 * math.asin(math.sqrt(a))


class Airports:
    def __init__(self, rows):
        """`rows` : dictionnaires au format OurAirports."""
        self.by_code = {}
        self.nearby = []
        parsed = []
        for a in rows:
            try:
                lat, lon = float(a["latitude_deg"]), float(a["longitude_deg"])
            except (KeyError, TypeError, ValueError):
                continue
            main_code = a.get("icao_code") or a.get("gps_code") or a.get("ident")
            info = {"code": main_code, "name": a.get("name") or "", "city": a.get("municipality") or "",
                    "country": a.get("iso_country") or "", "lat": lat, "lon": lon,
                    "closed": a.get("type") == "closed"}
            parsed.append((a, info))
            if a.get("type") in NEAREST_TYPES:
                self.nearby.append(info)
        # Index par code : un passage par champ, du plus fiable au moins fiable ; dans un même
        # champ, un aéroport ouvert l'emporte sur un aéroport fermé.
        for field in CODE_FIELDS:
            for a, info in parsed:
                value = a.get(field) or ""
                codes = value.split(",") if field == "keywords" else [value]
                for code in codes:
                    code = code.strip().upper()
                    if not code or (field == "keywords" and " " in code):
                        continue
                    current = self.by_code.get(code)
                    if current is None or (current[1] == field and current[0]["closed"] and not info["closed"]):
                        self.by_code[code] = (info, field)

    @classmethod
    def load(cls, path=config.AIRPORTS):
        with open(path, encoding="utf-8", newline="") as f:
            return cls(csv.DictReader(f))

    def lookup(self, code):
        """Infos de l'aéroport pour un code OpenSky, ou None si inconnu."""
        if not code:
            return None
        hit = self.by_code.get(code.strip().upper())
        return hit[0] if hit else None

    def nearest(self, lat, lon):
        """(infos, distance_km) de l'aéroport le plus proche, ou (None, None)."""
        if not self.nearby:
            return None, None
        best = min(self.nearby, key=lambda a: haversine_km(lat, lon, a["lat"], a["lon"]))
        return best, haversine_km(lat, lon, best["lat"], best["lon"])

    def distance_km(self, code1, code2):
        """Distance grand cercle entre deux codes, None si l'un est inconnu."""
        a, b = self.lookup(code1), self.lookup(code2)
        if a is None or b is None:
            return None
        return haversine_km(a["lat"], a["lon"], b["lat"], b["lon"])
