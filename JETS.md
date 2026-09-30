# Jets privés suivis — référentiel

Référentiel des jets d'affaires liés aux sociétés de la watchlist `News_agent`, plus quelques
grands dirigeants. Données brutes : [`data/targets.csv`](data/targets.csv).
Statut en direct régénéré par `python update.py`.

**Cadre :** on suit des avions d'entreprise, pas des personnes. Rien n'est publié en temps réel.

## Sources (toutes gratuites)

| Source | Rôle | Remarque |
|---|---|---|
| Registre FAA (`ReleasableAircraft.zip`) | Immatriculation → propriétaire → code hex | Téléchargé le 2026-09-29, mis à jour chaque jour |
| [plane-alert-db](https://github.com/sdr-enthusiasts/plane-alert-db) | Liste communautaire qui relie les avions aux personnes | Parfois périmée (voir ci-dessous) |
| API adsb.lol | Position en temps réel | Gratuite, sans clé |
| OurAirports | Position → aéroport le plus proche | |
| airplanes.live | *(prévu)* | **L'API exige de les contacter par e-mail** (contact@airplanes.live) avec une description du projet |
| OpenSky Network | Historique glissant 90 j → « Vols 90 j » (`tracker/opensky.py`, via `python update.py`) | Compte requis ; 30 crédits/requête, 4 000 crédits/jour → rattrapage initial en ~10 jours |

## Référentiel

### Sociétés de la watchlist

| Entité | Personne / usage | Immat. | Hex | Modèle | Propriétaire au registre FAA | Confiance |
|---|---|---|---|---|---|---|
| SpaceX / Tesla / xAI | Elon Musk | N628TS | `a835af` | Gulfstream G650ER (2015) | FALCON LANDING LLC | haute |
| SpaceX / Tesla / xAI | Elon Musk | N272BG | `a2ae0a` | Gulfstream G550 (2007) | FALCON LANDING LLC | haute |
| Alphabet | Flotte Google | N10XG | `a0046f` | Gulfstream G550 (2008) | BANK OF UTAH TRUSTEE | moyenne |
| Alphabet | Flotte Google | N232G | `a21084` | Gulfstream G650ER (2018) | BANK OF UTAH TRUSTEE | moyenne |
| Alphabet | Flotte Google | N651WE | `a8926a` | Gulfstream G650ER (2015) | *masqué par la FAA* | moyenne |
| Alphabet | Eric Schmidt | N652WE | `a89621` | Gulfstream G650ER (2021) | *masqué par la FAA* | moyenne |
| Meta | Mark Zuckerberg | N68885 | `a9247d` | Gulfstream G650ER (2021) | A7P TRUST CO TRUSTEE | moyenne |
| Meta | Mark Zuckerberg | N3880 | `a47b5a` | Gulfstream G700 (2024) | A7P TRUST CO TRUSTEE | moyenne |
| Microsoft | Steve Ballmer (ex-CEO) | N709DS | `a97659` | Gulfstream G800 (2025) | CRUISING ALTITUDE LLC | moyenne |
| AMD | Copropriété Flexjet | N558FX | `a71db6` | Challenger 350 (2020) | FLEXJET LLC (AMD co-propriétaire) | haute |
| AMD | Copropriété Flexjet | N664FX | `a8c3a8` | Gulfstream G650ER (2018) | PLM SERVICES / Flexjet (AMD co-propriétaire) | haute |
| Anduril | Copropriété NetJets | N894QS | `ac559f` | Citation Longitude (2026) | NETJETS SALES INC (Anduril co-propriétaire) | haute |
| Constellation Energy | Flotte société | N482EC | `a5f06e` | Falcon 2000EX (2020) | CONSTELLATION ENERGY GENERATION LLC | haute |
| Constellation Energy | Flotte société | N484EC | `a5f7dc` | Falcon 2000EX | CONSTELLATION ENERGY GENERATION LLC | haute |
| Quanta Services | Flotte société | N282QA | `a2d6c8` | Gulfstream G280 (2014) | QUANTA SERVICES INC | haute |
| Quanta Services | Flotte société | N283QA | `a2da7f` | Gulfstream G280 | QUANTA SERVICES INC | haute |

**Rien trouvé au registre FAA pour :** Tesla, NVIDIA, Apple, Microsoft (société), xAI,
Neuralink, Boring Co, Broadcom, Palantir (société), Rocket Lab, Intuitive Surgical,
AST SpaceMobile, Oklo, NuScale, BWX, Anthropic, OpenAI. TSMC, ASML et Arm immatriculent leurs
avions hors des États-Unis.
Ces sociétés passent probablement par des trusts, des LLC écrans, des jets en copropriété ou de
la location, et leurs avions restent donc à identifier.
Amazon n'apparaît qu'avec sa flotte cargo (767 et A330), exclue ici. Les deux immatriculations
connues de Jeff Bezos (N271DV, N758PB) ne sont plus portées par un avion : elles sont
seulement réservées par POPLAR GLEN LLC (voir plus bas).

### Autres grands dirigeants et sociétés

| Entité | Personne / usage | Immat. | Hex | Modèle | Propriétaire au registre FAA | Confiance |
|---|---|---|---|---|---|---|
| Oracle | Larry Ellison | N817GS | `ab2404` | Gulfstream G650 (2014) | WING AND A PRAYER INC | moyenne |
| Palantir / Founders Fund | Peter Thiel | N878DB | `ac145b` | Gulfstream G-V SP (2007) | THORONDOR LLC | moyenne |
| Qualcomm | Flotte société | N880WT | `ac1fdb` | Gulfstream G800 (2025) | QUALCOMM INC | haute |
| Qualcomm | Flotte société | N882WT | `ac2749` | Gulfstream G650ER (2022) | QUALCOMM INC | haute |
| Micron | Flotte société | N684MT | `a91338` | Gulfstream G650ER (2016) | MICRON TECHNOLOGY INC | haute |
| Micron | Flotte société | N778MT | `aa87e4` | Gulfstream G280 (2018) | MICRON TECHNOLOGY INC | haute |
| Micron | Flotte société | N831MT | `ab5d36` | Gulfstream G280 (2021) | MICRON TECHNOLOGY INC | haute |
| Texas Instruments | Flotte société | N45GX | `a5706f` | Global Express (2011) | TEXAS INSTRUMENTS INC | haute |
| Texas Instruments | Flotte société | N46GX | `a597ee` | Global Express (2011) | TEXAS INSTRUMENTS INC | haute |
| Citadel | Ken Griffin | N68KP | `a901cd` | Global 6500 (2021) | WILMINGTON TRUST CO TRUSTEE | moyenne |
| Citadel | Ken Griffin | N302AK | `a326ca` | Global 6000 (2012) | TVPX AIRCRAFT SOLUTIONS TRUSTEE | moyenne |
| Bloomberg LP | Michael Bloomberg | N47EG | `a5bf2c` | Falcon 900EX (2018) | WING AND ROTOR TRANSPORTATION HOLDINGS LLC | moyenne |

**Niveau de confiance :**
- **haute** : le nom de la société figure au registre FAA.
- **moyenne** : le registre ne montre qu'un trust ou une LLC, et c'est la base communautaire qui relie l'avion à la personne.

## Statut en direct

<!-- STATUS:START -->
_Relevé du 2026-09-30 08:26 UTC — statut : adsb.lol ; vols 90 j : OpenSky (nombre de vols / jours déjà récupérés sur les 90 derniers). Section générée par `python update.py`._

| Immat. | Hex | Entité | Statut actuel | Position actuelle | Vols 90 j |
|---|---|---|---|---|---|
| N628TS | `a835af` | Elon Musk | ⚪ Non détecté | — | 7 vols / 9 j |
| N272BG | `a2ae0a` | Elon Musk | ⚪ Non détecté | — | 12 vols / 9 j |
| N10XG | `a0046f` | Google (flotte dirigeants) | ⚪ Non détecté | — | 2 vols / 9 j |
| N232G | `a21084` | Google (flotte dirigeants) | ⚪ Non détecté | — | 0 vols / 9 j |
| N651WE | `a8926a` | Google (flotte dirigeants) | ⚪ Non détecté | — | 6 vols / 9 j |
| N652WE | `a89621` | Eric Schmidt (ex-CEO) | ⚪ Non détecté | — | 5 vols / 9 j |
| N68885 | `a9247d` | Mark Zuckerberg | ⚪ Non détecté | — | 2 vols / 9 j |
| N3880 | `a47b5a` | Mark Zuckerberg | ⚪ Non détecté | — | 8 vols / 9 j |
| N709DS | `a97659` | Steve Ballmer (ex-CEO) | ⚪ Non détecté | — | 8 vols / 9 j |
| N558FX | `a71db6` | AMD (copropriete Flexjet) | ⚪ Non détecté | — | 16 vols / 9 j |
| N664FX | `a8c3a8` | AMD (copropriete Flexjet) | ⚪ Non détecté | — | 6 vols / 9 j |
| N894QS | `ac559f` | Anduril (copropriete NetJets) | ⚪ Non détecté | — | 24 vols / 9 j |
| N482EC | `a5f06e` | Constellation Energy | ⚪ Non détecté | — | 7 vols / 9 j |
| N484EC | `a5f7dc` | Constellation Energy | ⚪ Non détecté | — | 9 vols / 9 j |
| N282QA | `a2d6c8` | Quanta Services | ⚪ Non détecté | — | 3 vols / 9 j |
| N283QA | `a2da7f` | Quanta Services | ⚪ Non détecté | — | 6 vols / 9 j |
| N817GS | `ab2404` | Larry Ellison | ⚪ Non détecté | — | 4 vols / 7 j |
| N878DB | `ac145b` | Peter Thiel | ⚪ Non détecté | — | 3 vols / 7 j |
| N880WT | `ac1fdb` | Qualcomm | ⚪ Non détecté | — | 0 vols / 7 j |
| N882WT | `ac2749` | Qualcomm | ⚪ Non détecté | — | 4 vols / 7 j |
| N684MT | `a91338` | Micron Technology | ⚪ Non détecté | — | 5 vols / 7 j |
| N778MT | `aa87e4` | Micron Technology | ⚪ Non détecté | — | 0 vols / 7 j |
| N831MT | `ab5d36` | Micron Technology | ⚪ Non détecté | — | 18 vols / 7 j |
| N45GX | `a5706f` | Texas Instruments | ⚪ Non détecté | — | 0 vols / 7 j |
| N46GX | `a597ee` | Texas Instruments | ⚪ Non détecté | — | 0 vols / 7 j |
| N68KP | `a901cd` | Ken Griffin | ⚪ Non détecté | — | 0 vols / 7 j |
| N302AK | `a326ca` | Ken Griffin | ⚪ Non détecté | — | 0 vols / 7 j |
| N47EG | `a5bf2c` | Michael Bloomberg | ⚪ Non détecté | — | 3 vols / 7 j |
<!-- STATUS:END -->

**Lecture du statut :**
- « Non détecté » ne veut pas dire « au sol ». L'avion peut être hors couverture, avoir son
  transpondeur coupé ou voler sous une adresse PIA temporaire.
- « Vols 90 j » = vols trouvés par OpenSky / nombre de jours (sur les 90 derniers) déjà récupérés. Le rattrapage avance chaque jour du plus récent au plus ancien.

## Signaux déjà visibles : immatriculations réservées

Le fichier `RESERVED.txt` de la FAA liste les immatriculations qu'une entité réserve **avant**
d'y rattacher un avion. Une réservation annonce souvent un achat, une vente ou un changement
d'immatriculation.

| Immat. réservée | Réservée par | Date | Lecture possible |
|---|---|---|---|
| N502SX, N365XX, N768X | FALCON LANDING LLC (Musk) | 2026-03-21 / 03-26 | Nouvel avion ou ré-immatriculation dans la flotte Musk |
| N271DV, N758PB, N758LB, N271DX, N271DY, N272DV… | POPLAR GLEN LLC (Bezos) | 2022 → 2026-06 | Les immatriculations « signature » de Bezos sont gardées de côté ; ses avions actuels volent sous d'autres immatriculations, encore inconnues |
| N492CE, N494CE | CONSTELLATION ENERGY GENERATION LLC | 2026-01-05 | Deux nouveaux avions probables (renouvellement ou extension de flotte) |
| N880WE, N881WE… N887WT | QUALCOMM INC | 2018 → 2025 | Réserve d'immatriculations pour renouveler la flotte |

## Difficultés rencontrées

1. **Propriétaires masqués.** Sur 27 378 avions à réaction multimoteurs immatriculés aux
   États-Unis (avions de ligne compris),
   **4 253** sont au nom d'un trustee (Bank of Utah, Wilmington Trust…) et **1 208** ont un
   propriétaire masqué par la FAA.
2. **La base communautaire se périme.** Plusieurs immatriculations listées (Gates N887WM et
   N194WM, Bezos N271DV, Dell N28ZD) ne figurent plus au registre actif : avions vendus,
   ré-immatriculés ou exportés. N28ZD a été radié le 2025-12-09 et exporté vers l'Inde.
3. **La copropriété.** Le registre donne un indice précieux : le champ `OTHER NAMES` révèle
   les co-propriétaires (AMD chez Flexjet, Anduril chez NetJets). Mais on ne sait pas quel
   co-propriétaire est à bord pendant un vol donné.
4. **Les API.** airplanes.live exige un accord préalable, OpenSky un compte et un quota de crédits pour l'historique,
   et les fichiers de trace d'adsb.lol ne sont pas accessibles par script.

## Prochaines étapes

- [ ] Écrire à airplanes.live pour obtenir l'accès à l'API.
- [x] Compte OpenSky : historique en cours de rattrapage (`python update.py`, à lancer chaque jour).
- [ ] Planifier `python update.py` (relevés stockés dans `data/snapshots.csv`).
- [ ] Trouver les avions manquants (Tesla, NVIDIA, Apple…) : chercher dans le registre FAA les
      numéros de série connus et les copropriétés.
- [ ] Surveiller les nouvelles réservations dans `RESERVED.txt` (comparaison quotidienne).
