"""Récupère les avions d'une personne ou d'une organisation sur celebplanes.com et les
recoupe avec le registre FAA.

Celebplanes est une source communautaire (fiabilité moyenne à faible) : chaque avion
trouvé est vérifié dans data/faa/MASTER.txt quand il est immatriculé aux États-Unis.

Usage : python scripts/celebplanes.py elon-musk jeff-bezos donald-trump ...
        python scripts/celebplanes.py --out data/celebplanes_candidates.csv elon-musk ...
Les identifiants (slugs) sont ceux des URL https://www.celebplanes.com/celebrity/<slug>.
Sortie : CSV (stdout ou --out), une ligne par avion.
"""
import argparse
import csv
import html
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import faa_search  # noqa: E402

BASE = "https://www.celebplanes.com"
HEADERS = {"User-Agent": "Mozilla/5.0 (Jet_Scrapper; projet personnel)"}
DELAY_S = 1.0  # politesse entre deux requêtes
FIELDS = ["slug", "personne", "immatriculation", "hex", "modele", "faa_statut", "faa_proprietaire",
          "faa_modele", "faa_annee", "faa_hex"]


def fetch(url):
    req = urllib.request.Request(url, headers=HEADERS)
    try:
        with urllib.request.urlopen(req, timeout=30) as r:
            return r.read().decode("utf-8", "replace")
    except urllib.error.HTTPError as e:
        if e.code == 404:
            return None
        raise
    finally:
        time.sleep(DELAY_S)


def person_tails(slug):
    page = fetch(f"{BASE}/celebrity/{slug}")
    if page is None:
        return None, []
    m = re.search(r"<h1[^>]*>(.*?)</h1>", page, re.S)
    name = html.unescape(re.sub(r"<[^>]+>", "", m.group(1))).strip() if m else slug
    tails = sorted(set(re.findall(r'href="/tail/([A-Z0-9-]+)"', page)))
    return name, tails


def tail_details(tail):
    page = fetch(f"{BASE}/tail/{tail}")
    if page is None:
        return {"hex": "", "modele": ""}
    hex_ = re.search(r"ICAO hex code is ([0-9A-Fa-f]{6})", page)
    title = re.search(r"<title>(.*?)</title>", page, re.S)
    model = ""
    if title:
        t = html.unescape(title.group(1))
        mm = re.search(r"—\s*(.*?)\s+Tail Number", t)
        model = mm.group(1) if mm else ""
    return {"hex": hex_.group(1).lower() if hex_ else "", "modele": model}


def load_faa():
    """N-number (sans le N) → ligne MASTER, plus les immatriculations réservées."""
    models = faa_search.load_models()
    master = {ac["N-NUMBER"]: ac for ac in faa_search.iter_aircraft()}
    reserved = {}
    with open(faa_search.FAA_DIR / "RESERVED.txt", encoding="utf-8-sig", newline="") as f:
        for row in csv.DictReader(f):
            row = {k.strip(): (v or "").strip() for k, v in row.items() if k}
            reserved[row["N-NUMBER"]] = row.get("REGISTRANT", "") or row.get("NAME", "")
    return models, master, reserved


def faa_check(tail, faa):
    models, master, reserved = faa
    if not tail.startswith("N"):
        return {"faa_statut": "hors registre US"}
    n = tail[1:]
    ac = master.get(n)
    if ac:
        return {"faa_statut": "actif", "faa_proprietaire": ac["NAME"] or "(masque par la FAA)",
                "faa_modele": models.get(ac["MFR MDL CODE"], ac["MFR MDL CODE"]),
                "faa_annee": ac["YEAR MFR"], "faa_hex": ac["MODE S CODE HEX"].lower()}
    if n in reserved:
        return {"faa_statut": "reservee seulement", "faa_proprietaire": reserved[n]}
    return {"faa_statut": "absent du registre"}


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("slugs", nargs="+")
    ap.add_argument("--out", help="fichier CSV de sortie (défaut : stdout)")
    args = ap.parse_args()

    faa = load_faa() if (faa_search.FAA_DIR / "MASTER.txt").exists() else None
    out = open(args.out, "w", encoding="utf-8", newline="") if args.out else sys.stdout
    w = csv.DictWriter(out, fieldnames=FIELDS)
    w.writeheader()
    for slug in args.slugs:
        name, tails = person_tails(slug)
        if name is None:
            print(f"[celebplanes] {slug} : page introuvable", file=sys.stderr)
            continue
        for tail in tails:
            row = {"slug": slug, "personne": name, "immatriculation": tail, **tail_details(tail)}
            if faa:
                row.update(faa_check(tail, faa))
            w.writerow(row)
            out.flush()
    if args.out:
        out.close()


if __name__ == "__main__":
    main()
