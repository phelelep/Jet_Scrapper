# Jet Tracker — suivi des jets d'affaires par ADS-B

Projet d'entraînement, compagnon de [`News_agent`](../News_agent) : suivre les jets d'affaires
des sociétés de la watchlist (et de quelques grands dirigeants) à partir de données publiques
et gratuites, pour apprendre le traitement de données ADS-B et, à terme, tester si les
mouvements d'avions d'entreprise précèdent des annonces.

**Cadre :** on suit des avions d'entreprise, pas des personnes. Données stockées en local,
rien n'est publié en temps réel (décalage ≥ 24 h pour toute sortie).

## Le résultat : [`JETS.md`](JETS.md)

- Le référentiel des avions (immatriculation, hex, modèle, propriétaire au registre FAA, niveau de confiance).
- Le statut en direct (en vol, au sol, non détecté) et l'aéroport le plus proche.
- Le nombre de vols sur les 90 derniers jours.
- Le site statique `site/` (données dans `site/data.js`), généré par `python update.py`.
- Les immatriculations réservées (signaux), les difficultés rencontrées et les prochaines étapes.

## Arborescence

```
New_project/
├── README.md                 ce fichier
├── JETS.md                   rapport / référentiel (section « Statut » générée entre marqueurs)
├── PLAN.md                   plan du site web (architecture, phases, features)
├── update.py                 POINT D'ENTRÉE UNIQUE : collecte + génération du site
├── docs/
│   └── DATA_CONTRACT.md      contrat d'interface collecte ↔ site (CSV et site/data.js)
├── tracker/                  package de collecte et de génération
│   ├── config.py             chemins et constantes (90 j, fenêtres de 2 j, 30 crédits/requête…)
│   ├── db.py                 schéma SQLite, CSV → jets.db → CSV, rétention, dédoublonnage
│   ├── opensky.py            historique des vols (OpenSky /flights/aircraft)
│   ├── snapshot.py           relevé instantané (adsb.lol, un seul appel groupé)
│   ├── airports.py           aéroports OurAirports : plus proche, recherche par code
│   └── build.py              génère site/data.js et la section « Statut » de JETS.md
├── scripts/
│   └── faa_search.py         recherche de jets dans le registre FAA par nom de propriétaire
├── site/
│   └── data.js               données du site (généré ; index.html, style.css, app.js : Phase 2)
├── tests/
│   └── test_tracker.py       tests unitaires (unittest)
└── data/
    ├── targets.csv           LA liste des avions suivis (éditée à la main)
    ├── flights.csv           vols OpenSky des 90 derniers jours      ┐
    ├── windows.csv           fenêtres OpenSky déjà récupérées         │ source de vérité,
    ├── snapshots.csv         relevés adsb.lol (1 ligne/avion/relevé)  │ committés
    ├── runs.csv              journal des exécutions (500 lignes)      ┘
    ├── jets.db               cache SQLite (reconstruit à chaque exécution, ignoré par git)
    ├── faa/                  registre FAA décompressé (généré)
    ├── ReleasableAircraft.zip  archive du registre FAA (téléchargée)
    ├── plane-alert-db.csv    base communautaire avion ↔ personne (téléchargée)
    └── airports.csv          aéroports OurAirports (téléchargé)
```

## Mise à jour : `python update.py`

```bash
python update.py                      # OpenSky (tout le quota du jour) + adsb.lol + site
python update.py --max-calls 10       # plafonne les requêtes OpenSky
python update.py --skip-opensky       # relevé adsb.lol + site uniquement
python update.py --skip-snapshot      # sans relevé adsb.lol
python -m unittest discover -s tests  # tests
```

Déroulé : **CSV → `jets.db` → OpenSky → adsb.lol → `site/data.js` + `JETS.md` → CSV**.
- Chaque étape est isolée : si OpenSky ou adsb.lol échoue (quota, réseau), la génération du
  site a quand même lieu avec les données déjà connues. Chaque étape ajoute une ligne à
  `data/runs.csv` (statut `ok`, `partial`, `error` ou `skipped`, requêtes, crédits restants).
- **Les CSV de `data/` sont la source de vérité** (committés dans git) ; `data/jets.db` n'est
  qu'un cache SQLite jetable, recréé à partir des CSV au début de chaque exécution puis
  réexporté. Les CSV sont triés de façon déterministe : une exécution ajoute des lignes
  sans réordonner les autres. Format détaillé : [`docs/DATA_CONTRACT.md`](docs/DATA_CONTRACT.md).
- Rétention : 90 jours glissants pour les vols, fenêtres et relevés ; 500 lignes pour `runs`.

## Modules

### `tracker/opensky.py`: historique des vols
- Récupère les vols (départ, arrivée, indicatif, horaires) via l'API **OpenSky**
  `/flights/aircraft`.
- Contraintes de l'API : fenêtres de 2 jours UTC maximum, 30 crédits par requête, 4 000
  crédits/jour, données disponibles à J+1.
- **Budget :** d'abord la fenêtre qui contient la veille, pour chaque avion ; puis le
  rattrapage de l'historique de 90 jours, fenêtres de la plus récente à la plus ancienne,
  tous avions confondus, avec le reste du quota. Arrêt propre sur un refus 429 ou quand il
  reste moins de 30 crédits (étape `partial`) ; relancé le lendemain, il reprend où il
  s'était arrêté. Rattrapage initial : ~45 fenêtres × 28 avions ≈ 1 300 requêtes ≈ 10 jours
  de quota ; ensuite ~1 requête par avion et par jour.
- Retélécharge les fenêtres récentes tant qu'elles ne sont pas définitives, et dédoublonne
  les vols qu'OpenSky renvoie en double (on garde la version la plus complète).
- Identifiants : fichier JSON `{"clientId", "clientSecret"}` désigné par la variable
  `OPENSKY_CREDENTIALS` (par défaut `~/.opensky/credentials.json`, puis
  `~/Downloads/credentials.json`). Le secret n'est jamais affiché ni journalisé.
  **Ne jamais copier ce fichier dans le projet.**

### `tracker/snapshot.py`: relevé instantané
- Interroge **adsb.lol** en **un seul appel groupé** pour tous les codes hex de `targets.csv`
  (API gratuite, sans clé ; les appels un par un déclenchent la limite de débit).
- Une ligne par avion dans `snapshots.csv` : `airborne`, `ground` (`alt_baro == "ground"`)
  ou `unseen` ; position courante ou, à défaut, dernière position connue (`lastPosition`).

### `tracker/build.py`: génération
- `site/data.js` (`window.JETS_DATA = {...}`) : avions, statut au dernier relevé, aéroport
  le plus proche, dernier vol, vols et heures de vol sur 7, 30 et 90 jours, aéroport
  principal, couverture de l'historique, liste des vols avec durée et distance.
- Réécrit la section de `JETS.md` comprise entre `<!-- STATUS:START -->` et
  `<!-- STATUS:END -->` (vue du dernier relevé + colonne « Vols 90 j »). Le reste du fichier
  n'est pas modifié.

### `tracker/airports.py`: aéroports
Aéroport le plus proche d'une position, et recherche d'un code OpenSky (OACI, code GPS,
ident ou code local comme `19TX`, voire ancien code d'un aéroport fermé).

### `scripts/faa_search.py`: trouver les jets d'un propriétaire
Parcourt le registre FAA et renvoie les **jets** (turbofan/turbojet) dont le propriétaire ou un
co-propriétaire (champ `OTHER NAMES`, utile pour les copropriétés NetJets/Flexjet) contient
l'un des motifs donnés.
```bash
python scripts/faa_search.py "QUALCOMM" "FALCON LANDING"
```
Sortie : `motif|immatriculation|hex|modèle|année|propriétaire|ville|date dernière action`.
Pour ajouter un avion au suivi, reporter la ligne dans `data/targets.csv`.

## Fichiers de données

| Fichier | Origine | Contenu | Mise à jour |
|---|---|---|---|
| `data/targets.csv` | Manuel | Avions suivis : groupe, entité, personne, immatriculation, hex, modèle, année, propriétaire FAA, confiance, source | À la main |
| `data/flights.csv`, `data/windows.csv` | OpenSky (`update.py`) | Vols des 90 derniers jours ; fenêtres de 2 jours déjà récupérées | Chaque exécution |
| `data/snapshots.csv` | adsb.lol (`update.py`) | Relevés : statut, position, altitude, vitesse, cap, indicatif | Chaque exécution |
| `data/runs.csv` | `update.py` | Journal : étape, statut, requêtes, crédits restants, message | Chaque exécution |
| `data/jets.db` | `update.py` | Cache SQLite reconstruit depuis les CSV (non versionné) | Chaque exécution |
| `data/ReleasableAircraft.zip`, `data/faa/` | [Registre FAA](https://registry.faa.gov/database/ReleasableAircraft.zip) | `MASTER.txt` (avions actifs), `ACFTREF.txt` (modèles), `DEREG.txt` (radiés), `RESERVED.txt` (immatriculations réservées) | Retélécharger chaque semaine |
| `data/plane-alert-db.csv` | [plane-alert-db](https://github.com/sdr-enthusiasts/plane-alert-db) | Correspondances avion ↔ personne ou société, établies par la communauté (parfois périmées) | Retélécharger au besoin |
| `data/airports.csv` | [OurAirports](https://ourairports.com/data/) | Aéroports et coordonnées | Rarement |

## Sources de données

| Source | Usage | Accès |
|---|---|---|
| Registre FAA | Propriétaires, codes hex, réservations | Libre |
| adsb.lol | Positions en temps réel | Libre, sans clé |
| OpenSky Network | Historique des vols | Compte (4 000 crédits/jour, 8 000 pour un contributeur actif) |
| airplanes.live | Positions en temps réel (non filtrées) | API sur demande par e-mail (en cours) |

## Routine conseillée

1. `python update.py`, une fois par jour, en fin de journée UTC (le quota OpenSky se
   renouvelle chaque jour), puis committer les CSV de `data/`.
2. `python update.py --skip-opensky`, à la demande, pour un nouveau relevé adsb.lol.
3. Une fois par semaine : retélécharger le registre FAA et comparer `RESERVED.txt` pour
   repérer les nouvelles réservations des propriétaires suivis.
