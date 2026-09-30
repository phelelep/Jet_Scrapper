"""Point d'entrée unique : collecte OpenSky -> relevé adsb.lol -> génération du site.

Déroulé : CSV de data/ -> data/jets.db (cache) -> OpenSky -> adsb.lol -> site/data.js et
JETS.md -> CSV. Chaque étape est isolée : l'échec de l'une n'empêche pas les suivantes
(la génération du site a toujours lieu) et chacune ajoute une ligne à data/runs.csv.

Usage : python update.py [--skip-opensky] [--skip-snapshot] [--max-calls N]
"""
import argparse
import sys
import time

from tracker import config, db, opensky, snapshot, build
from tracker.airports import Airports

LABELS = {"ok": "OK", "partial": "partiel", "error": "ERREUR", "skipped": "ignoré"}


def run_step(conn, name, func, summary):
    """Exécute une étape, journalise son résultat dans runs et ne propage jamais d'exception."""
    try:
        res = func()
    except Exception as e:
        res = {"status": "error", "message": f"{type(e).__name__}: {e}"}
    db.record_run(conn, time.time(), name, res["status"], res.get("requests"),
                  res.get("credits_remaining"), res.get("message", ""))
    summary.append((name, res))
    return res


def load_airports():
    """Aéroports OurAirports ; liste vide (codes et distances inconnus) si le fichier manque."""
    try:
        return Airports.load()
    except FileNotFoundError:
        print(f"  Attention : {config.AIRPORTS.name} introuvable, aéroports non résolus")
        return Airports([])


def main():
    ap = argparse.ArgumentParser(description="Met à jour les données et le site de suivi des jets.")
    ap.add_argument("--skip-opensky", action="store_true", help="ne pas interroger OpenSky")
    ap.add_argument("--skip-snapshot", action="store_true", help="ne pas faire de relevé adsb.lol")
    ap.add_argument("--max-calls", type=int, default=None, help="plafond de requêtes OpenSky pour ce lancement")
    args = ap.parse_args()
    try:  # console Windows : ne jamais planter sur un caractère non affichable
        sys.stdout.reconfigure(errors="replace")
    except (AttributeError, ValueError):
        pass

    today_ts = config.today_start(time.time())
    targets = db.load_targets()
    hexes = [t["hex"].lower() for t in targets]

    conn, migrated = db.load()
    if migrated:
        print(f"Migration : {migrated} lignes reprises de l'ancienne base jets.db")
    db.prune(conn, today_ts)
    removed = db.dedupe(conn)
    if removed:
        print(f"Dédoublonnage : {removed} vols en double supprimés")

    summary = []
    skipped = {"status": "skipped", "message": "ignoré (option de ligne de commande)"}

    print("OpenSky…")
    run_step(conn, "opensky",
             (lambda: skipped) if args.skip_opensky
             else (lambda: opensky.collect(conn, hexes, today_ts, args.max_calls)), summary)

    print("adsb.lol…")
    run_step(conn, "snapshot",
             (lambda: skipped) if args.skip_snapshot else (lambda: snapshot.take(conn, hexes)), summary)

    print("Génération du site…")
    res = run_step(conn, "build", lambda: build.build(conn, targets, load_airports(), today_ts), summary)

    db.prune(conn, today_ts)
    db.dump(conn)
    conn.close()

    print("\nRésumé :")
    for name, r in summary:
        extra = ""
        if r.get("requests"):
            extra += f", {r['requests']} requêtes"
        if r.get("credits_remaining") is not None:
            extra += f", {r['credits_remaining']} crédits restants"
        print(f"  {name:<9} {LABELS.get(r['status'], r['status'])}{extra} — {r.get('message', '')}")
    data = res.get("data")
    if data:
        c = data["counts"]
        print(f"  Flotte : {c['total']} avions — {c['airborne']} en vol, {c['ground']} au sol, "
              f"{c['unseen']} non détectés ; {len(data['flights'])} vols sur 90 j")
    print(f"  Fichiers : {config.DATA_JS.relative_to(config.ROOT)}, JETS.md, data/*.csv")
    return 1 if any(r["status"] == "error" for _, r in summary) else 0


if __name__ == "__main__":
    sys.exit(main())
