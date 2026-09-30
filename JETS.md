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
_Relevé du 2026-09-30 09:26 UTC — statut : adsb.lol ; vols 90 j : OpenSky (nombre de vols / jours déjà récupérés sur les 90 derniers). Section générée par `python update.py`._

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
| N554AV | `a70e5b` | AbbVie (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N100AL | `a004bf` | Abbott Laboratories (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N550AL | `a6ff76` | Abbott Laboratories (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N900AL | `ac6f37` | Abbott Laboratories (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N82123 | `ab374c` | Adobe Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N288QS | `a2ed22` | Autodesk (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N71F | `a97a31` | AES Corporation (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N280AF | `a2ce01` | Aflac (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N285AF | `a2e094` | Aflac (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N612AF | `a7f632` | Ameriprise Financial (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N616AF | `a8050e` | Ameriprise Financial (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N25ZG | `a2576b` | A. O. Smith (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N26HH | `a27d5b` | APA Corporation (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N289QS | `a2f0d9` | Amphenol (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N332FX | `a39dd0` | Axon Enterprise (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N650GB | `a88d52` | American Express (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N228BA | `a1fed3` | Bank of America (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N285BA | `a2e0a8` | Bank of America (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N676BA | `a8f21c` | Bank of America (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N400BC | `a4acbd` | Ball Corporation (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N394BB | `a491c0` | Brown & Brown (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N396BB | `a4992e` | Brown & Brown (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N1812C | `a14704` | Citigroup (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N175CT | `a12c04` | Caterpillar Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N797CT | `aad24a` | Caterpillar Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N711QS | `a98133` | Ciena (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N204QS | `a1a24e` | Clorox (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N63XF | `a83d76` | Comcast (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N281CE | `a2d1e9` | Cummins (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N282CE | `a2d5a0` | Cummins (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N283CE | `a2d957` | Cummins (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N804CE | `aaf0f0` | Cummins (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N102CE | `a00c59` | CenterPoint Energy (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N595FX | `a7b08d` | Capital One (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N660FX | `a8b4cc` | Coherent Corp. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N881RC | `ac2306` | Cooper Companies (The) (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N284CP | `a2dd17` | ConocoPhillips (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N793CP | `aac36a` | ConocoPhillips (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N795CP | `aacad8` | ConocoPhillips (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N797CP | `aad246` | ConocoPhillips (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N220FX | `a1e194` | Copart (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N394WJ | `a493a2` | Copart (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N516FX | `a6784c` | Copart (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N650HA | `a88d6a` | Marc Benioff | ⚪ Non détecté | — | 0 vols / 0 j |
| N1876P | `a15de5` | Chevron Corporation (flotte société) | 🟢 En vol — N1876P, 41000 ft, 565 kt | survol : 43 km de YLAO (Lameroo Airport, AU) | 0 vols / 0 j |
| N1895T | `a16534` | Chevron Corporation (flotte société) | 🟢 En vol — N1895T, 41000 ft, 528 kt | survol : 15 km de YTGV (The Grove Airport, AU) | 0 vols / 0 j |
| N1901G | `a16aad` | Chevron Corporation (flotte société) | 🟢 En vol — N1901G, 41000 ft, 546 kt | survol : 45 km de YCNO (Conargo Airport, AU) | 0 vols / 0 j |
| N884GL | `ac2d52` | Chevron Corporation (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N604D | `a7d666` | Dominion Energy (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N607D | `a7e18b` | Dominion Energy (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N581D | `a779ea` | DuPont (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N855DG | `abba3d` | Dollar General (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N288DX | `a2ec14` | Quest Diagnostics (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N648DX | `a88354` | Quest Diagnostics (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N899DX | `ac6724` | Quest Diagnostics (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N343FX | `a3c906` | Everest Group (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N21FE | `a1b7ab` | FedEx Freight (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N39FE | `a480f2` | FedEx Freight (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N280GD | `a2ce95` | General Dynamics (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N585G | `a78911` | General Dynamics (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N586G | `a78cc8` | General Dynamics (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N587G | `a7907f` | General Dynamics (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N628G | `a8348b` | General Dynamics (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N101FX | `a008fe` | GE Vernova (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N18CG | `a13e8c` | Corning Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N28CG | `a2cbdb` | Corning Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N295ML | `a3092b` | Corning Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N38CG | `a4592a` | Corning Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N48CG | `a5e679` | Corning Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N58CG | `a773c8` | Corning Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N788CG | `aaae77` | Corning Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N28GP | `a2cc46` | Genuine Parts Company (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N183TS | `a14d8b` | Global Payments (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N288SF | `a2ed49` | Global Payments (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N794BC | `aac6fd` | Global Payments (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N300WB | `a32148` | Garmin (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N78XL | `aa9045` | Garmin (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N820UT | `ab32af` | Garmin (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N888GL | `ac3c2e` | Garmin (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N8CB | `aadd5f` | Huntington Bancshares (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N889H | `ac3ff3` | Honeywell Aerospace (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N933H | `acf17d` | Honeywell Aerospace (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N222VR | `a1ea5a` | HP Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N592FX | `a7a568` | HP Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N7SB | `a9516e` | HP Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N198HF | `a18698` | Hormel Foods (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N199HF | `a18a4f` | Hormel Foods (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N733A | `a9d630` | Humana (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N733H | `a9d6df` | Humana (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N733K | `a9d711` | Humana (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N780RW | `aa9212` | IBM (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N780TW | `aa9244` | IBM (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N231CE | `a20c6e` | Intercontinental Exchange (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N414QS | `a4e46b` | IDEX Corporation (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N496QS | `a627d1` | International Paper (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N2291R | `a204fb` | Ingersoll Rand (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N780JH | `aa9156` | Jack Henry & Associates (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N894JH | `ac5500` | Jack Henry & Associates (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N895JH | `ac58b7` | Jack Henry & Associates (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N1930J | `a175b1` | Johnson & Johnson (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N30QJ | `a31e60` | Johnson & Johnson (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N400J | `a4ad69` | Johnson & Johnson (flotte société) | 🟢 En vol — N400J, 40100 ft, 492 kt | survol : 75 km de ZGLD (Yunfu (Luoding), CN) | 0 vols / 0 j |
| N60QJ | `a7c64d` | Johnson & Johnson (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N800J | `aae2a5` | Johnson & Johnson (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N886RW | `ac35ab` | Coca-Cola Company (The) (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N300KC | `a32036` | Kroger (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N302KC | `a327a4` | Kroger (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N304KC | `a32f12` | Kroger (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N618CR | `a80cb8` | Leidos (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N108DB | `a022b9` | Labcorp (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N517LH | `a67c72` | Labcorp (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N344RS | `a3cdb2` | Lockheed Martin (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N359GS | `a406e3` | Lockheed Martin (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N650VC | `a88e98` | Lockheed Martin (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N33LC | `a39473` | Lowe's (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N336LS | `a3ad24` | Las Vegas Sands (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N337LS | `a3b0db` | Las Vegas Sands (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N338LS | `a3b492` | Las Vegas Sands (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N339LS | `a3b849` | Las Vegas Sands (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N885LS | `ac3173` | Las Vegas Sands (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N889LS | `ac404f` | Las Vegas Sands (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N404MM | `a4bc9c` | Martin Marietta Materials (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N93M | `ace463` | 3M (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N422MP | `a5042e` | Marathon Petroleum (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N513FX | `a66d27` | Motorola Solutions (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N533GV | `a6bc3c` | Netflix (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N714CG | `a98b22` | NiSource (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N1972 | `a184ca` | Nike, Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N3546 | `a3f6d3` | Nike, Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N6453 | `a87a8f` | Nike, Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N23NG | `a2075a` | Northrop Grumman (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N37NG | `a432a5` | Northrop Grumman (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N38NG | `a45a24` | Northrop Grumman (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N99NG | `add17d` | Northrop Grumman (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N750JT | `aa1ae3` | Nucor (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N940JF | `ad0df6` | Nucor (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N980JF | `adabf2` | Nucor (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N300KE | `a32038` | Oneok (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N310KE | `a347b7` | Oneok (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N370D | `a43416` | Paccar (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N701P | `a9598a` | Paccar (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N706P | `a96c1d` | Paccar (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N880T | `ac1f7e` | Paccar (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N3CP | `a31ae0` | Pfizer (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N4CP | `a4a82f` | Pfizer (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N6CP | `a7c2cd` | Pfizer (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N1PG | `a0014e` | Procter & Gamble (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N2PG | `a18e9d` | Procter & Gamble (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N5PG | `a6368a` | Procter & Gamble (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N6PG | `a7c3d9` | Procter & Gamble (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N7PG | `a95128` | Procter & Gamble (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N412DL | `a4dbe4` | PNC Financial Services (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N513DL | `a66cea` | PNC Financial Services (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N545DL | `a6ead5` | PNC Financial Services (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N852DL | `abaf1c` | PNC Financial Services (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N211WG | `a1bf34` | Pentair (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N827GA | `ab4b73` | PPG Industries (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N857GA | `abc1f0` | PPG Industries (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N684QS | `a91382` | PPL Corporation (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N552SC | `a7086c` | PTC Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N4050 | `a4c18c` | PayPal (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N459FX | `a5941e` | Regeneron Pharmaceuticals (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N539CA | `a6d20f` | ResMed| (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N57AB | `a74c12` | Rockwell Automation (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N68AB | `a900e0` | Rockwell Automation (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N3RP | `a31c25` | Roper Technologies (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N19HS | `a16692` | Starbucks (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N1897S | `a16579` | J.M. Smucker Company (The) (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N97SJ | `ad82e5` | J.M. Smucker Company (The) (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N610FX | `a7ef51` | Solventum (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N5262 | `a6a1d6` | State Street Corporation (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N421SC | `a500e9` | Stryker Corporation (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N520SC | `a68a81` | Stryker Corporation (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N625SC | `a82a63` | Stryker Corporation (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N484EM | `a5f7e5` | Target Corporation (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N837RE | `ab73d7` | UDR, Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N358V | `a40460` | Visa Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N256RC | `a26f42` | Vulcan Materials Company (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N957RC | `ad5022` | Vulcan Materials Company (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N74VZ | `a9f224` | Verizon (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N76VZ | `aa4122` | Verizon (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N191MM | `a16d01` | Workday, Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N281WC | `a2d3a9` | Williams Companies (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N15DP | `a0c82f` | Walmart (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N16CP | `a0ef95` | Walmart (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N17ZP | `a11921` | Walmart (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N45GH | `a57061` | Walmart (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N45HK | `a5707c` | Walmart (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N986BL | `adc192` | Walmart (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N188WR | `a16068` | Wynn Resorts (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N88WR | `ac1d80` | Wynn Resorts (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N969WR | `ad7f99` | Wynn Resorts (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N355ZB | `a3f9a1` | Zimmer Biomet (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
| N650ZB | `a88efb` | Zimmer Biomet (flotte société) | ⚪ Non détecté | — | 0 vols / 0 j |
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
