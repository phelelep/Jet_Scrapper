# Jet Tracker — suivi des jets d'affaires par ADS-B

Projet d'entraînement, compagnon de [`News_agent`](../News_agent) : suivre les jets d'affaires
des sociétés de la watchlist (et de quelques grands dirigeants) à partir de données publiques
et gratuites, pour apprendre le traitement de données ADS-B et, à terme, tester si les
mouvements d'avions d'entreprise précèdent des annonces.

**Cadre :** on suit des avions d'entreprise, d'État et de personnalités publiques (jamais de particuliers ni de célébrités du divertissement). Le site est publié
sur GitHub Pages et rafraîchi toutes les 30 minutes par GitHub Actions (voir « Publication »).

## Les résultats

- **Le site** (<https://phelelep.github.io/Jet_Scrapper/>, rafraîchi toutes les 30 min) :
  carte, statut en direct (en vol, au sol, non détecté), vols et routes des 90 derniers jours.
- **[`JETS.md`](JETS.md)** : le référentiel des avions (immatriculation, hex, modèle,
  propriétaire au registre FAA, niveau de confiance), les immatriculations réservées
  (signaux), les difficultés rencontrées et les prochaines étapes.

## Arborescence

```
New_project/
├── README.md                 ce fichier
├── JETS.md                   référentiel des avions (écrit à la main)
├── PLAN.md                   plan du site web (architecture, phases, features)
├── update.py                 POINT D'ENTRÉE UNIQUE : collecte + génération du site
├── serve.py                  serveur local du site (aperçu)
├── docs/
│   └── DATA_CONTRACT.md      contrat d'interface collecte ↔ site (CSV et site/data.js)
├── tracker/                  package de collecte et de génération
│   ├── config.py             chemins et constantes (90 j, fenêtres de 2 j, 30 crédits/requête…)
│   ├── db.py                 schéma SQLite, CSV → jets.db → CSV, rétention, dédoublonnage
│   ├── opensky.py            historique des vols (OpenSky /flights/aircraft, ou /flights/all au-delà de 40 avions)
│   ├── snapshot.py           relevé instantané (adsb.lol, appels groupés par 100 avions)
│   ├── airports.py           aéroports OurAirports : plus proche, recherche par code
│   └── build.py              génère site/data.js
├── scripts/
│   ├── faa_search.py         recherche de jets dans le registre FAA par nom de propriétaire
│   ├── sp500_fleet.py        jets d'affaires des sociétés du S&P 500 et de leurs dirigeants
│   └── celebplanes.py        avions d'une personnalité (celebplanes.com) recoupés avec le registre FAA
├── site/
│   ├── index.html, style.css, app.js   le site (carte, jets watchlist / autres jets, historique)
│   └── data.js               données du site (généré)
├── tests/
│   └── test_tracker.py       tests unitaires (unittest)
└── data/
    ├── targets.csv           LA liste des avions suivis (groupes watchlist / autres / sp500 / personnalites)
    ├── sp500.csv             constituants du S&P 500 (datasets/s-and-p-500-companies)
    ├── sp500_candidates.csv  jets trouvés par sp500_fleet.py (généré, non versionné)
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
python serve.py                       # aperçu du site sur http://localhost:8000
python -m unittest discover -s tests  # tests
```

Déroulé : **CSV → `jets.db` → OpenSky → adsb.lol → `site/data.js` → CSV**.
- Chaque étape est isolée : si OpenSky ou adsb.lol échoue (quota, réseau), la génération du
  site a quand même lieu avec les données déjà connues. Chaque étape ajoute une ligne à
  `data/runs.csv` (statut `ok`, `partial`, `error` ou `skipped`, requêtes, crédits restants).
- **Les CSV de `data/` sont la source de vérité** (committés dans git) ; `data/jets.db` n'est
  qu'un cache SQLite jetable, recréé à partir des CSV au début de chaque exécution puis
  réexporté. Les CSV sont triés de façon déterministe : une exécution ajoute des lignes
  sans réordonner les autres. Format détaillé : [`docs/DATA_CONTRACT.md`](docs/DATA_CONTRACT.md).
- Rétention : 90 jours glissants pour les vols et fenêtres, 3 jours pour les relevés ; 500 lignes pour `runs`.

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
- **Mode global (à partir de 40 avions, `GLOBAL_MODE_MIN_AIRCRAFT`) :** un appel par avion
  coûterait trop cher (222 avions × 30 crédits ≈ 6 700 crédits/jour). Le script interroge
  alors `/flights/all` par tranches de 2 h (12 appels par jour, quel que soit le nombre
  d'avions) et ne garde que les vols des avions suivis. Les tranches sont notées dans
  `windows.csv` avec `icao24 = *`. Rattrapage : 90 jours × 12 = 1 080 tranches. **Le coût
  en crédits de `/flights/all` n'est pas documenté** : il est mesuré au premier lancement
  (`credits_remaining` dans `runs.csv`).
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

### `serve.py` : aperçu local
Sert `site/` sur http://localhost:8000, sans cache navigateur. Lancer `python update.py`
pour régénérer `site/data.js` (qui n'est plus commité).

## Publication : GitHub Actions + GitHub Pages

Workflow [`.github/workflows/update.yml`](.github/workflows/update.yml) :
- **toutes les 30 min** : `python update.py --skip-opensky` (relevé adsb.lol + site) ;
- **chaque jour à 04:17 UTC** : `python update.py` complet (historique OpenSky en plus) ;
- **à chaque push sur `main`** touchant le site ou la collecte, et à la demande (onglet Actions,
  « Run workflow », case OpenSky).

Chaque passage commite `data/*.csv`, puis publie `site/` sur GitHub Pages.
`site/data.js` n'est pas commité. La page relit `data.js` toutes les 5 min et se recharge
quand de nouvelles données sont publiées.

Mise en place (une fois) :
1. *Settings → Pages → Build and deployment → Source* : **GitHub Actions**.
2. *Settings → Secrets and variables → Actions* : secrets `OPENSKY_CLIENT_ID` et
   `OPENSKY_CLIENT_SECRET` (contenu de `credentials.json`).
3. Pousser sur `main` : le premier passage se lance et publie le site.

Limites : GitHub peut retarder une exécution planifiée de quelques minutes à plus d'une demi-heure
(ou la sauter si la plateforme est chargée). Les relevés ne sont gardés que 3 jours
(`SNAPSHOT_DAYS`), seul le dernier sert au site. Avant de commiter en local des fichiers de
`data/`, faire `git pull` : le workflow les modifie toutes les 30 min.

### `scripts/sp500_fleet.py` : flotte S&P 500
Rapproche les 503 sociétés du S&P 500 du registre FAA, par le propriétaire ou un
co-propriétaire (copropriétés NetJets/Flexjet), et de plane-alert-db (flottes de société et
dirigeants connus). Règles de filtrage :
- jets d'affaires uniquement ;
- ni compagnies aériennes, ni fret, ni constructeurs (Boeing, Textron) ;
- attributions plane-alert-db écartées si le propriétaire FAA actuel est une autre société.

```bash
python scripts/sp500_fleet.py           # écrit data/sp500_candidates.csv
python scripts/sp500_fleet.py --merge   # ajoute les nouveaux à data/targets.csv (groupe sp500)
```

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
