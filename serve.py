"""Serveur local du site, avec relevé en temps réel à la demande.

Sert le dossier site/ sur http://localhost:8000 et expose POST /api/live : relevé adsb.lol
pour toute la flotte, puis régénération de site/data.js et des CSV (comme
`python update.py --skip-opensky`). Le bouton « Get live data » du site appelle cette route.

Le navigateur ne peut pas interroger adsb.lol directement : l'API n'envoie pas d'en-tête
CORS. D'où ce relais local. Pour ménager l'API, un relevé de moins de 30 s est réutilisé.

Usage : python serve.py [--port 8000] [--no-browser]
"""
import argparse
import functools
import json
import sys
import threading
import time
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

import update
from tracker import build, config, db, snapshot

MIN_INTERVAL_S = 30
_lock = threading.Lock()
_last = {"at": 0.0, "result": None}


def refresh_live():
    """Relevé adsb.lol + génération du site. Renvoie un résumé JSON-sérialisable."""
    with _lock:
        if _last["result"] and time.time() - _last["at"] < MIN_INTERVAL_S:
            return {**_last["result"], "cached": True}
        today_ts = config.today_start(time.time())
        targets = db.load_targets()
        hexes = [t["hex"].lower() for t in targets]
        conn, _ = db.load()
        try:
            db.prune(conn, today_ts)
            summary = []
            snap = update.run_step(conn, "snapshot", lambda: snapshot.take(conn, hexes), summary)
            res = update.run_step(conn, "build",
                                  lambda: build.build(conn, targets, update.load_airports(), today_ts), summary)
            db.dump(conn)
        finally:
            conn.close()
        data = res.get("data") or {}
        result = {"ok": snap["status"] == "ok" and res["status"] == "ok",
                  "message": snap.get("message", ""),
                  "snapshot_at": data.get("snapshot_at"), "counts": data.get("counts"), "cached": False}
        _last.update(at=time.time(), result=result)
        return result


class Handler(SimpleHTTPRequestHandler):
    def do_POST(self):
        if self.path != "/api/live":
            self.send_error(404)
            return
        try:
            body, code = refresh_live(), 200
        except Exception as e:  # réseau, adsb.lol indisponible...
            body, code = {"ok": False, "message": f"{type(e).__name__}: {e}"}, 502
        payload = json.dumps(body).encode()
        self.send_response(code)
        self.send_header("Content-Type", "application/json")
        self.send_header("Content-Length", str(len(payload)))
        self.end_headers()
        self.wfile.write(payload)

    def end_headers(self):
        # data.js change à chaque relevé : jamais de cache navigateur
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        if args and "/api/" in str(args[0]):
            super().log_message(fmt, *args)


def main():
    ap = argparse.ArgumentParser(description="Sert le site en local avec le bouton « Get live data ».")
    ap.add_argument("--port", type=int, default=8000)
    ap.add_argument("--no-browser", action="store_true")
    args = ap.parse_args()
    try:
        sys.stdout.reconfigure(errors="replace")
    except (AttributeError, ValueError):
        pass
    handler = functools.partial(Handler, directory=str(config.SITE_DIR))
    server = ThreadingHTTPServer(("127.0.0.1", args.port), handler)
    url = f"http://localhost:{args.port}/"
    print(f"Site servi sur {url}  (Ctrl+C pour arrêter)")
    if not args.no_browser:
        webbrowser.open(url)
    try:
        server.serve_forever()
    except KeyboardInterrupt:
        pass


if __name__ == "__main__":
    main()
