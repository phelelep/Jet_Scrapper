# Jet Scrapper

Suivi des jets d'affaires de grandes sociétés, de dirigeants et de chefs d'État, à partir de
données ADS-B publiques et gratuites.

**Site : <https://phelelep.github.io/Jet_Scrapper/>**

On suit uniquement des avions d'entreprise, d'État et de personnalités publiques.

## Ce que montre le site

- Une carte des avions en vol.
- Les jets suivis, en deux tableaux : la watchlist et les autres.
- L'historique des vols sur 90 jours.

La liste des avions et leurs sources sont dans [`JETS.md`](JETS.md).

## Fonctionnement

- Toutes les 30 minutes, GitHub Actions lance `update.py` puis publie le site sur GitHub Pages.
- Les positions viennent d'adsb.lol. L'historique des vols vient d'OpenSky, une fois par jour.
- Les données sont enregistrées en CSV dans `data/`.
- Les avions suivis sont listés dans `data/targets.csv`.

## Lancer en local

Python 3, sans dépendance à installer.

```bash
python update.py --skip-opensky   # récupère les positions et génère le site
python serve.py                   # affiche le site sur http://localhost:8000
python -m unittest discover -s tests
```

L'historique OpenSky demande un compte OpenSky.

## Organisation

```
update.py    point d'entrée : collecte puis génération du site
serve.py     aperçu local du site
tracker/     collecte (OpenSky, adsb.lol) et génération du site
scripts/     outils pour trouver des avions (registre FAA, Celebplanes)
site/        le site (HTML, CSS, JS)
data/        données et liste des avions suivis
.github/     workflow de mise à jour et de publication
```
