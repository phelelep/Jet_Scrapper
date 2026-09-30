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
- Les immatriculations réservées (signaux), les difficultés rencontrées et les prochaines étapes.

## Arborescence

```
New_project/
├── README.md                 ce fichier
├── JETS.md                   rapport / référentiel (sections générées entre marqueurs)
├── PLAN.md                   plan du site web (architecture, phases, features)
├── scripts/
│   ├── faa_search.py         recherche de jets dans le registre FAA par nom de propriétaire
│   ├── update_status.py      statut en direct (adsb.lol) + vols 90 j → JETS.md
│   └── opensky_flights.py    historique glissant 90 j (OpenSky) → data/jets.db
└── data/
    ├── targets.csv           LA liste des avions suivis (éditée à la main)
    ├── jets.db               base SQLite des vols (générée)
    ├── faa/                  registre FAA décompressé (généré)
    ├── ReleasableAircraft.zip  archive du registre FAA (téléchargée)
    ├── plane-alert-db.csv    base communautaire avion ↔ personne (téléchargée)
    └── airports.csv          aéroports OurAirports (téléchargé)
```

## Scripts

### `scripts/faa_search.py`: trouver les jets d'un propriétaire
Parcourt le registre FAA et renvoie les **jets** (turbofan/turbojet) dont le propriétaire ou un
co-propriétaire (champ `OTHER NAMES`, utile pour les copropriétés NetJets/Flexjet) contient
l'un des motifs donnés.
```bash
python scripts/faa_search.py "QUALCOMM" "FALCON LANDING"
```
Sortie : `motif|immatriculation|hex|modèle|année|propriétaire|ville|date dernière action`.
Pour ajouter un avion au suivi, reporter la ligne dans `data/targets.csv`.

### `scripts/update_status.py`: statut en direct
- Interroge **adsb.lol** en **un seul appel groupé** pour tous les codes hex de `targets.csv`
  (API gratuite, sans clé ; les appels un par un déclenchent la limite de débit).
- Associe chaque position à l'aéroport le plus proche via `airports.csv`.
- Lit le nombre de vols des 90 derniers jours dans `jets.db`.
- Réécrit la section de `JETS.md` comprise entre `<!-- STATUS:START -->` et
  `<!-- STATUS:END -->`. Le reste du fichier n'est pas modifié.
```bash
python scripts/update_status.py
```

### `scripts/opensky_flights.py`: historique des vols
- Récupère les vols (départ, arrivée, indicatif, horaires) via l'API **OpenSky**
  `/flights/aircraft`, et les stocke dans `data/jets.db`.
- Contraintes de l'API : fenêtres de 2 jours UTC maximum, 30 crédits par requête, 4 000
  crédits/jour, données disponibles à J+1.
- Maintient un **historique glissant de 90 jours** (`HISTORY_DAYS`) : fenêtres de 2 jours
  parcourues **de la plus récente à la plus ancienne, pour tous les avions à la fois**,
  jusqu'à épuiser le quota. Relancé le lendemain, il reprend où il s'était arrêté.
  Rattrapage initial : 46 fenêtres × 28 avions ≈ 1 300 requêtes ≈ 10 jours de quota.
  Ensuite, ~1 requête par avion et par jour suffit. Les vols de plus de 90 jours sont supprimés.
- Retélécharge les fenêtres récentes tant qu'elles ne sont pas définitives, et dédoublonne
  les vols qu'OpenSky renvoie en double.
- Identifiants : fichier JSON `{"clientId", "clientSecret"}` désigné par la variable
  `OPENSKY_CREDENTIALS` (par défaut `~/.opensky/credentials.json`, puis
  `~/Downloads/credentials.json`). **Ne jamais le copier dans le projet.**
```bash
python scripts/opensky_flights.py              # tout le quota du jour
python scripts/opensky_flights.py --max-calls 10
```

## Fichiers de données

| Fichier | Origine | Contenu | Mise à jour |
|---|---|---|---|
| `data/targets.csv` | Manuel | Avions suivis : groupe, entité, personne, immatriculation, hex, modèle, année, propriétaire FAA, confiance, source | À la main |
| `data/jets.db` | `opensky_flights.py` | Tables `flights` (vols) et `windows` (fenêtres déjà récupérées) | Chaque jour |
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

1. `python scripts/opensky_flights.py`, une fois par jour, en fin de journée UTC.
2. `python scripts/update_status.py`, à la demande ou toutes les 10 min.
3. Une fois par semaine : retélécharger le registre FAA et comparer `RESERVED.txt` pour
   repérer les nouvelles réservations des propriétaires suivis.
