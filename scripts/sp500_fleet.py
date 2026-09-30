"""Cherche dans le registre FAA les jets d'affaires des sociétés du S&P 500.

Entrées : data/sp500.csv (liste des constituants), data/faa/ (registre FAA),
          data/plane-alert-db.csv (base communautaire, pour les dirigeants).
Sortie  : data/sp500_candidates.csv — une ligne par avion trouvé, à relire avant
          d'ajouter à data/targets.csv (python scripts/sp500_fleet.py --merge).

Règle de rapprochement : le nom du propriétaire (ou d'un co-propriétaire en copropriété),
une fois normalisé, doit être le nom de la société suivi uniquement de mots « neutres »
(AVIATION, FLIGHT, SERVICES…). Cela évite « APPLE VALLEY LLC » pour Apple.
"""
import argparse
import csv
import re
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))
import faa_search  # noqa: E402

ROOT = Path(__file__).resolve().parent.parent
SP500 = ROOT / "data" / "sp500.csv"
PLANE_ALERT = ROOT / "data" / "plane-alert-db.csv"
OUT = ROOT / "data" / "sp500_candidates.csv"
TARGETS = ROOT / "data" / "targets.csv"

# Transport aérien : leurs flottes ne sont pas des jets d'affaires
EXCLUDED_SUB_INDUSTRIES = {"Passenger Airlines", "Air Freight & Logistics"}
# Constructeurs : leurs avions immatriculés sont surtout du stock, des démonstrateurs ou des essais
EXCLUDED_SYMBOLS = {"TXT", "BA"}

# Dirigeants connus (plane-alert-db) → symbole de leur société
PERSON_SYMBOL = {"Elon Musk": "TSLA", "Mark Zuckerberg": "META", "Larry Ellison": "ORCL",
                 "Eric Schmidt": "GOOGL", "Bill Gates": "MSFT", "Steve Ballmer": "MSFT",
                 "Marc Benioff": "CRM", "Michael Dell": "DELL", "Jensen Huang": "NVDA",
                 "Jeff Bezos": "AMZN", "Tim Cook": "AAPL", "Warren Buffett": "BRK.B"}

SUFFIXES = {"INC", "INCORPORATED", "CORP", "CORPORATION", "CO", "COMPANY", "COMPANIES", "LLC", "LP",
            "LTD", "PLC", "NV", "SA", "AG", "THE", "HOLDINGS", "HOLDING", "GROUP", "CLASS", "A", "B", "C"}
NEUTRAL_TAIL = {"AVIATION", "AIRCRAFT", "FLIGHT", "FLIGHTS", "OPERATIONS", "OPS", "SERVICES",
                "SERVICE", "TRANSPORTATION", "TRAVEL", "USA", "US", "AMERICA", "NORTH", "AMERICAS",
                "CORPORATE", "GLOBAL", "INTERNATIONAL", "ENTERPRISES", "MANAGEMENT", "JET", "JETS",
                "LEASING", "DEPARTMENT", "DEPT", "OF", "AND", "ADMINISTRATIVE", "SHARED"} | SUFFIXES

# Noms juridiques différents du nom usuel (clé = colonne Security du CSV)
ALIASES = {
    "Alphabet Inc. (Class A)": ["ALPHABET", "GOOGLE"],
    "Alphabet Inc. (Class C)": [],  # doublon de la classe A
    "Meta Platforms": ["META PLATFORMS", "FACEBOOK"],
    "Walmart": ["WALMART", "WAL MART", "WAL MART STORES"],
    "Fox Corporation (Class B)": [], "News Corp (Class B)": [],
    "Amazon": ["AMAZON COM", "AMAZON"],
    "Berkshire Hathaway": ["BERKSHIRE HATHAWAY"],
    "JPMorgan Chase": ["JPMORGAN CHASE", "JP MORGAN CHASE", "JPMORGAN CHASE BANK"],
    "Johnson & Johnson": ["JOHNSON AND JOHNSON"],
    "Procter & Gamble": ["PROCTER AND GAMBLE"],
    "Coca-Cola Company (The)": ["COCA COLA"],
    "Home Depot (The)": ["HOME DEPOT", "HOME DEPOT USA"],
    "Exxon Mobil": ["EXXON MOBIL", "EXXONMOBIL"],
    "IBM": ["IBM", "INTERNATIONAL BUSINESS MACHINES"],
    "Labcorp": ["LABCORP", "LABORATORY CORPORATION OF AMERICA"],
}

# Jets d'affaires : constructeurs retenus (les Boeing/Airbus ne passent que s'ils sont des versions affaires)
BIZJET_MAKERS = ("GULFSTREAM", "DASSAULT", "BOMBARDIER", "CANADAIR", "LEARJET", "HAWKER", "RAYTHEON",
                 "TEXTRON", "CESSNA", "EMBRAER", "PILATUS", "HONDA", "IAI", "BEECH", "SABRELINER", "ECLIPSE")
BIZ_AIRLINER = re.compile(r"BBJ|737-7|737-8.*BBJ|A318|A319|ACJ", re.I)


def normalize(name):
    name = name.upper().replace("&", " AND ")
    name = re.sub(r"\(.*?\)", " ", name)
    return re.sub(r"[^A-Z0-9]+", " ", name).split()


def core(tokens):
    while tokens and tokens[-1] in SUFFIXES:
        tokens = tokens[:-1]
    while tokens and tokens[0] == "THE":
        tokens = tokens[1:]
    return tokens


def company_cores(security):
    names = ALIASES.get(security)
    if names is None:
        names = [security]
    return [c for c in (tuple(core(normalize(n))) for n in names) if c]


def owner_matches(owner, cores):
    tokens = normalize(owner)
    for c in cores:
        if tuple(tokens[:len(c)]) == c and all(t in NEUTRAL_TAIL for t in tokens[len(c):]):
            return True
    return False


def is_bizjet(model):
    m = model.upper()
    if m.startswith(("BOEING", "AIRBUS")):
        return bool(BIZ_AIRLINER.search(m))
    if "ERJ" in m:  # avions de ligne régionaux
        return False
    return m.startswith(BIZJET_MAKERS) or any(k in m for k in ("GULFSTREAM", "CHALLENGER", "GLOBAL", "FALCON", "CITATION"))


def load_companies():
    with open(SP500, encoding="utf-8", newline="") as f:
        return [(r["Symbol"], r["Security"], r["GICS Sub-Industry"], company_cores(r["Security"]))
                for r in csv.DictReader(f)
                if r["GICS Sub-Industry"] not in EXCLUDED_SUB_INDUSTRIES
                and r["Symbol"] not in EXCLUDED_SYMBOLS]


def find_corporate_jets(companies):
    models = faa_search.load_models()
    rows = []
    for ac in faa_search.iter_aircraft():
        if ac["TYPE ENGINE"] not in faa_search.JET_ENGINE_TYPES:
            continue
        model = models.get(ac["MFR MDL CODE"], "")
        if not is_bizjet(model):
            continue
        others = [ac[f"OTHER NAMES({i})"] for i in range(1, 6) if ac[f"OTHER NAMES({i})"]]
        fractional = ac["FRACT OWNER"] == "Y"
        for symbol, security, _, cores in companies:
            if owner_matches(ac["NAME"], cores):
                how = "propriétaire"
            elif any(owner_matches(o, cores) for o in others):
                how = "copropriétaire" if fractional else "co-titulaire"
            else:
                continue
            rows.append({
                "symbol": symbol, "entite": security, "personne_ou_entreprise": f"{security} (flotte société)",
                "immatriculation": "N" + ac["N-NUMBER"], "hex": ac["MODE S CODE HEX"].lower(),
                "modele": model, "annee": ac["YEAR MFR"],
                "proprietaire_faa": f'{ac["NAME"]} ({ac["CITY"]} {ac["STATE"]})'.strip(),
                "lien": how, "confiance": "haute" if how == "propriétaire" else "moyenne",
                "source": "FAA" if how == "propriétaire" else "FAA (copropriété)",
            })
    return rows


def find_plane_alert(companies, known_hex):
    """Avions que plane-alert-db attribue à une société du S&P 500 ou à l'un de ses dirigeants,
    encore immatriculés à la FAA sous la même immatriculation (sinon la base est périmée)."""
    active = {}
    models = faa_search.load_models()
    for ac in faa_search.iter_aircraft():
        active["N" + ac["N-NUMBER"]] = (ac, models.get(ac["MFR MDL CODE"], ""))
    by_symbol = {c[0]: c for c in companies}
    rows = []
    with open(PLANE_ALERT, encoding="utf-8", newline="") as f:
        for r in csv.DictReader(f):
            reg, operator = r["$Registration"], r["$Operator"]
            if reg not in active or r["$ICAO"].lower() in known_hex:
                continue
            ac, model = active[reg]
            if (ac["MODE S CODE HEX"].lower() != r["$ICAO"].lower() or not is_bizjet(model)
                    or ac["TYPE ENGINE"] not in faa_search.JET_ENGINE_TYPES):
                continue
            if operator in PERSON_SYMBOL and PERSON_SYMBOL[operator] in by_symbol:
                company, person = by_symbol[PERSON_SYMBOL[operator]], operator
            else:
                company = next((c for c in companies if owner_matches(operator, c[3])), None)
                person = f"{company[1]} (flotte société)" if company else None
            if not company:
                continue
            # Propriétaire FAA : la société elle-même, un trust ou masqué → attribution crédible.
            # Une autre société nommée → la base communautaire est probablement périmée (avion revendu).
            owner = ac["NAME"]
            if any(normalize(owner)[:1] == list(c[:1]) for c in company[3]):  # même premier mot
                confidence = "haute"
            elif not owner or re.search(r"TRUST|BANK|LEASING|NA", owner):
                confidence = "moyenne"
            elif operator in PERSON_SYMBOL:
                confidence = "moyenne"  # les dirigeants passent par des LLC au nom neutre
            else:
                continue
            known_hex.add(r["$ICAO"].lower())
            rows.append({
                "symbol": company[0], "entite": company[1], "personne_ou_entreprise": person,
                "immatriculation": reg, "hex": r["$ICAO"].lower(), "modele": model, "annee": ac["YEAR MFR"],
                "proprietaire_faa": f'{ac["NAME"] or "(masqué par la FAA)"} ({ac["CITY"]} {ac["STATE"]})'.strip(),
                "lien": "plane-alert-db", "confiance": confidence, "source": "plane-alert-db + FAA",
            })
    return rows


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--merge", action="store_true", help="ajoute les candidats absents à data/targets.csv")
    args = ap.parse_args()

    companies = load_companies()
    rows = find_corporate_jets(companies)
    rows += find_plane_alert(companies, {r["hex"] for r in rows})
    rows.sort(key=lambda r: (r["symbol"], r["immatriculation"]))
    with open(OUT, "w", encoding="utf-8", newline="") as f:
        w = csv.DictWriter(f, fieldnames=list(rows[0].keys()) if rows else ["symbol"])
        w.writeheader()
        w.writerows(rows)
    by_company = {}
    for r in rows:
        by_company.setdefault(r["symbol"], []).append(r)
    print(f"{len(rows)} jets pour {len(by_company)} sociétés du S&P 500 -> {OUT.name}")

    if args.merge:
        merge(rows)


def merge(rows):
    with open(TARGETS, encoding="utf-8", newline="") as f:
        reader = csv.DictReader(f)
        fields, existing = reader.fieldnames, list(reader)
    known = {r["hex"] for r in existing}
    added = [{"groupe": "sp500", **{k: r[k] for k in fields if k in r and k != "groupe"}}
             for r in rows if r["hex"] not in known and not known.add(r["hex"])]
    with open(TARGETS, "a", encoding="utf-8", newline="") as f:
        csv.DictWriter(f, fieldnames=fields).writerows(added)
    print(f"{len(added)} avions ajoutés à {TARGETS.name}")


if __name__ == "__main__":
    main()
