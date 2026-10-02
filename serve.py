"""Serveur local du site (aperçu de ce que publie GitHub Pages).

Sert le dossier site/ sur http://localhost:8000, sans cache navigateur pour que data.js
soit relu après chaque `python update.py`. En ligne, les données sont rafraîchies toutes
les 30 minutes par le workflow .github/workflows/update.yml.

Usage : python serve.py [--port 8000] [--no-browser]
"""
import argparse
import functools
import sys
import webbrowser
from http.server import SimpleHTTPRequestHandler, ThreadingHTTPServer

from tracker import config


class Handler(SimpleHTTPRequestHandler):
    def end_headers(self):
        # data.js change à chaque relevé : jamais de cache navigateur
        self.send_header("Cache-Control", "no-store")
        super().end_headers()

    def log_message(self, fmt, *args):
        pass


def main():
    ap = argparse.ArgumentParser(description="Sert le site en local.")
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
