"""Recherche dans le registre FAA (MASTER.txt + ACFTREF.txt) des jets dont le
propriétaire déclaré correspond à un motif.

Usage : python scripts/faa_search.py "SPACE EXPLORATION" "TESLA" ...
Sortie : une ligne par avion (jets uniquement : moteurs turbofan/turbojet).
"""
import csv
import sys
from pathlib import Path

FAA_DIR = Path(__file__).resolve().parent.parent / "data" / "faa"
JET_ENGINE_TYPES = {"4", "5"}  # 4 = turbo-fan, 5 = turbo-jet


def load_models():
    models = {}
    with open(FAA_DIR / "ACFTREF.txt", encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            models[row["CODE"].strip()] = f'{row["MFR"].strip()} {row["MODEL"].strip()}'
    return models


def iter_aircraft():
    with open(FAA_DIR / "MASTER.txt", encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            yield {k.strip(): (v or "").strip() for k, v in row.items() if k}


def search(patterns, jets_only=True):
    models = load_models()
    patterns = [p.upper() for p in patterns]
    for ac in iter_aircraft():
        if jets_only and ac["TYPE ENGINE"] not in JET_ENGINE_TYPES:
            continue
        haystack = " ".join([ac["NAME"]] + [ac[f"OTHER NAMES({i})"] for i in range(1, 6)])
        hit = next((p for p in patterns if p in haystack), None)
        if hit:
            yield {
                "match": hit,
                "tail": "N" + ac["N-NUMBER"],
                "hex": ac["MODE S CODE HEX"].lower(),
                "model": models.get(ac["MFR MDL CODE"], ac["MFR MDL CODE"]),
                "year": ac["YEAR MFR"],
                "owner": ac["NAME"],
                "city": f'{ac["CITY"]}, {ac["STATE"]}',
                "last_action": ac["LAST ACTION DATE"],
            }


if __name__ == "__main__":
    w = csv.writer(sys.stdout, delimiter="|")
    for r in search(sys.argv[1:]):
        w.writerow(r.values())
