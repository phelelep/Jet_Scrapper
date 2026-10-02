# Jets privés suivis — référentiel

Référentiel des jets d'affaires liés aux sociétés de la watchlist `News_agent`, plus quelques
grands dirigeants, des chefs d'État et des milliardaires. Données brutes : [`data/targets.csv`](data/targets.csv).
Statut en direct : voir le site (section ci-dessous).

**Cadre :** on suit des avions d'entreprise, des avions d'État et ceux de personnalités publiques
(dirigeants, chefs d'État, milliardaires), jamais de particuliers ni de célébrités du
divertissement. Rien n'est publié en temps réel.

## Sources (toutes gratuites)

| Source | Rôle | Remarque |
|---|---|---|
| Registre FAA (`ReleasableAircraft.zip`) | Immatriculation → propriétaire → code hex | Téléchargé le 2026-09-29, mis à jour chaque jour |
| [plane-alert-db](https://github.com/sdr-enthusiasts/plane-alert-db) | Liste communautaire qui relie les avions aux personnes | Parfois périmée (voir ci-dessous) |
| [Celebplanes](https://www.celebplanes.com) | Site communautaire avion ↔ personnalité (`scripts/celebplanes.py`) | Fiabilité faible à moyenne : chaque avion est recoupé avec le registre FAA |
| Presse spécialisée (aerocorner, Simple Flying, AirNav) | Numéros de série, ré-immatriculations, hex des avions étrangers | Non officiel |
| API adsb.lol | Position en temps réel | Gratuite, sans clé |
| OurAirports | Position → aéroport le plus proche | |
| airplanes.live | *(prévu)* | **L'API exige de les contacter par e-mail** (contact@airplanes.live) avec une description du projet |
| OpenSky Network | Historique glissant 90 j → « Vols 90 j » (`tracker/opensky.py`, via `python update.py`) | Compte requis ; 30 crédits/requête, 4 000 crédits/jour → rattrapage initial en ~10 jours |

## Référentiel

### Sociétés de la watchlist

| Entité | Personne / usage | Immat. | Hex | Modèle | Propriétaire au registre FAA | Confiance |
|---|---|---|---|---|---|---|
| SpaceX / Tesla / xAI | Elon Musk | N628TS | `a835af` | Gulfstream G650ER (2015) | FALCON LANDING LLC | haute |
| SpaceX / Tesla / xAI | Elon Musk | N7628 | `aa4c66` | Gulfstream G700 (2025, S/N 87108) | *masqué par la FAA* | moyenne |
| SpaceX / Tesla / xAI | Elon Musk | N8628 | `abd9b5` | Gulfstream G800 (2026, S/N 88013) | *masqué par la FAA* | moyenne |
| SpaceX / Tesla / xAI | Elon Musk | N272BG | `a2ae0a` | Gulfstream G550 (2007) | FALCON LANDING LLC | haute |
| SpaceX / Tesla / xAI | SpaceX (navette équipes) | N154TS | `a0dac5` | Boeing 737-800 (2002) | FALCON AVIATION HOLDINGS LLC (Hawthorne) | haute |
| SpaceX / Tesla / xAI | Elon Musk | N450GG | `a572b9` | Gulfstream G450 (2007) | TVPX AIRCRAFT SOLUTIONS TRUSTEE | faible |
| Tesla | Kimbal Musk (administrateur) | N831FR | `ab5c9e` | Gulfstream G600 (2021) | FREEDOM 105 LLC | faible |
| Amazon | Jeff Bezos | N11AF | `a029e0` | Gulfstream G700 (2024) | *masqué par la FAA* | moyenne |
| Amazon | Jeff Bezos | N756LB | `aa314f` | Gulfstream G650ER (2019, ex-N758PB) | *masqué par la FAA* | moyenne |
| Amazon | Jeff Bezos | N194PJ | `a17855` | Pilatus PC-24 (2020) | GUIDRY AVIATION LLC | faible |
| Alphabet | Flotte Google | N10XG | `a0046f` | Gulfstream G550 (2008) | BANK OF UTAH TRUSTEE | moyenne |
| Alphabet | Flotte Google | N904G | `ac7e9e` | Gulfstream G550 (2006) | BANK OF UTAH TRUSTEE | moyenne |
| Alphabet | Sergey Brin | N232G | `a21084` | Gulfstream G650ER (2018) | BANK OF UTAH TRUSTEE | moyenne |
| Alphabet | Larry Page | N618PB | `a80dbd` | Gulfstream G650ER (2022) | MAURICE JAMES AIRPLANE LLC | moyenne |
| Alphabet | Flotte Google | N651WE | `a8926a` | Gulfstream G650ER (2015) | *masqué par la FAA* | moyenne |
| Alphabet | Eric Schmidt | N652WE | `a89621` | Gulfstream G650ER (2021) | *masqué par la FAA* | moyenne |
| Meta | Mark Zuckerberg | N68885 | `a9247d` | Gulfstream G650ER (2021) | A7P TRUST CO TRUSTEE | moyenne |
| Meta | Mark Zuckerberg | N3880 | `a47b5a` | Gulfstream G700 (2024) | A7P TRUST CO TRUSTEE | moyenne |
| Microsoft | Bill Gates (co-fondateur) | N887GV | `ac3880` | Gulfstream G650ER (2018) | MENTE LLC (Seattle) | moyenne |
| Microsoft | Steve Ballmer (ex-CEO) | N709DS | `a97659` | Gulfstream G800 (2025) | CRUISING ALTITUDE LLC | moyenne |
| NVIDIA | Jensen Huang (affrètement VistaJet) | 9H-VID | `4d230d` | Bombardier Global 7500 (2020) | *registre maltais* : VistaJet Malta | faible |
| Arm (SoftBank) | Masayoshi Son | N302TR | `a32879` | Gulfstream G650ER (2017) | TVPX AIRCRAFT SOLUTIONS TRUSTEE | faible |
| AMD | Copropriété Flexjet | N558FX | `a71db6` | Challenger 350 (2020) | FLEXJET LLC (AMD co-propriétaire) | haute |
| AMD | Copropriété Flexjet | N664FX | `a8c3a8` | Gulfstream G650ER (2018) | PLM SERVICES / Flexjet (AMD co-propriétaire) | haute |
| Anduril | Copropriété NetJets | N894QS | `ac559f` | Citation Longitude (2026) | NETJETS SALES INC (Anduril co-propriétaire) | haute |
| Constellation Energy | Flotte société | N482EC | `a5f06e` | Falcon 2000EX (2020) | CONSTELLATION ENERGY GENERATION LLC | haute |
| Constellation Energy | Flotte société | N484EC | `a5f7dc` | Falcon 2000EX | CONSTELLATION ENERGY GENERATION LLC | haute |
| Quanta Services | Flotte société | N282QA | `a2d6c8` | Gulfstream G280 (2014) | QUANTA SERVICES INC | haute |
| Quanta Services | Flotte société | N283QA | `a2da7f` | Gulfstream G280 | QUANTA SERVICES INC | haute |

**Flotte Musk (mise à jour du 2026-10-01).** Le registre FAA confirme deux Gulfstream neufs au
propriétaire masqué : **N7628** (G700, immatriculé le 2026-06-12) et **N8628** (G800,
2026-02-27). Les immatriculations reprennent le « 628 » de N628TS (anniversaire du 28 juin).
Le G550 N502SX a quitté le registre actif (immatriculation seulement réservée par
FALCON LANDING LLC). N450GG et Kimbal Musk (N831FR) ne viennent que de Celebplanes.

**Pistes écartées :** N2N (G650, souvent attribué à Apple) appartient en réalité à Laurene
Powell Jobs ; N887WM et N194WM (Bill Gates) ont quitté le registre, N887GV les remplace.
Palantir déclare un « Executive Aircraft » appartenant à Alex Karp (G650, 17,2 M$ remboursés
en 2025) mais son immatriculation n'est pas publique. Palmer Luckey (Anduril) dit voler en
classe économique.

**Toujours rien (registre FAA, plane-alert-db, Celebplanes, presse) pour :** Tesla (société),
Apple, Microsoft (société), xAI, Neuralink, Boring Co, Broadcom, Palantir (société),
Rocket Lab, Intuitive Surgical, AST SpaceMobile, Oklo, NuScale, BWX, Anthropic, OpenAI.
TSMC et ASML immatriculent leurs avions hors des États-Unis. Au registre FAA, Anduril
n'apparaît qu'avec ses drones (Roadrunner, Barracuda, Fury…), exclus ici.
Ces sociétés passent probablement par des trusts, des LLC écrans, des jets en copropriété ou de
la location, et leurs avions restent donc à identifier.
Amazon n'apparaît qu'avec sa flotte cargo (767 et A330), exclue ici. Les anciennes
immatriculations de Jeff Bezos (N271DV, N758PB) ne sont plus portées par un avion : elles sont
seulement réservées par POPLAR GLEN LLC. Ses avions volent désormais sous N11AF et N756LB.

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

### Personnalités : chefs d'État et gouvernements

Liste validée le 2026-10-01 (sans la Russie). Sources : Celebplanes (`scripts/celebplanes.py`),
plane-alert-db, hexdb.io. Les avions d'État n'ont pas de propriétaire FAA : seul le code hex
permet de les suivre, et beaucoup coupent ou masquent leur transpondeur.

| Entité | Personne / usage | Immat. | Hex | Modèle | Propriétaire (FAA si US) | Confiance |
|---|---|---|---|---|---|---|
| Trump Organization | Donald Trump | N757AF | `aa3410` | Boeing 757-200 (1991) | DJT OPERATIONS I LLC | haute |
| Etats-Unis (presidence) | Air Force One (Donald Trump) | 82-8000 | `adfdf8` | Boeing VC-25A | (USAF, hors registre civil) | haute |
| Etats-Unis (presidence) | Air Force One (Donald Trump) | 92-9000 | `adfdf9` | Boeing VC-25A | (USAF, hors registre civil) | haute |
| Etats-Unis (presidence) | Air Force One (Donald Trump) | 25-3300 | `af83f3` | Boeing VC-25B (747-8, ex-Qatar) | (USAF, hors registre civil) | moyenne |
| Etats-Unis (vice-presidence / cabinet) | Air Force Two (JD Vance, Marco Rubio...) | 98-0001 | `adfeb7` | Boeing C-32A (757-200) | (USAF, flotte partagee) | moyenne |
| Etats-Unis (vice-presidence / cabinet) | Air Force Two (JD Vance, Marco Rubio...) | 98-0002 | `adfeb8` | Boeing C-32A (757-200) | (USAF, flotte partagee) | moyenne |
| Etats-Unis (vice-presidence / cabinet) | Air Force Two (JD Vance, Marco Rubio...) | 99-0003 | `adfeb9` | Boeing C-32A (757-200) | (USAF, flotte partagee) | moyenne |
| Etats-Unis (vice-presidence / cabinet) | Air Force Two (JD Vance, Marco Rubio...) | 99-0004 | `adfeba` | Boeing C-32A (757-200) | (USAF, flotte partagee) | moyenne |
| Etats-Unis (vice-presidence / cabinet) | Air Force Two (JD Vance, Marco Rubio...) | 09-0015 | `ae4ae6` | Boeing C-32A (757-200) | (USAF, flotte partagee) | moyenne |
| Etats-Unis (vice-presidence / cabinet) | Air Force Two (JD Vance, Marco Rubio...) | 09-0016 | `ae4ae8` | Boeing C-32A (757-200) | (USAF, flotte partagee) | moyenne |
| Etats-Unis (vice-presidence / cabinet) | Air Force Two (JD Vance, Marco Rubio...) | 09-0017 | `ae4aea` | Boeing C-32A (757-200) | (USAF, flotte partagee) | moyenne |
| Etats-Unis (vice-presidence / cabinet) | Air Force Two (JD Vance, Marco Rubio...) | 19-0018 | `ae4aec` | Boeing C-32A (757-200) | (USAF, flotte partagee) | moyenne |
| Chine (gouvernement) | Xi Jinping | B-2479 | `7bc006` | Boeing 747-400 | — | moyenne |
| Chine (gouvernement) | Xi Jinping | B-2481 | `780d2c` | Boeing 747-8 (Air China) | — | moyenne |
| Chine (gouvernement) | Xi Jinping | B-3999 | `7807fc` | Boeing 737 BBJ (Beijing Airlines) | — | moyenne |
| France (gouvernement) | Emmanuel Macron | F-RARF | `3b76ae` | Airbus A330-223 (Cotam 001) | — | haute |
| France (gouvernement) | Emmanuel Macron | F-RAFA | `3b770d` | Dassault Falcon 7X | — | haute |
| France (gouvernement) | Emmanuel Macron | F-RAFB | `3b76b3` | Dassault Falcon 7X | — | haute |
| France (gouvernement) | Emmanuel Macron | F-UJCU | `3b7542` | Airbus A330 MRTT Phenix | — | moyenne |
| Royaume-Uni (gouvernement) | Premier ministre / famille royale | G-GBNI | `407dfc` | Airbus A321neo | — | haute |
| Royaume-Uni (gouvernement) | Premier ministre / famille royale | G-ZABH | `407d90` | Dassault Falcon 900LX | — | haute |
| Royaume-Uni (gouvernement) | Premier ministre / famille royale | G-ZAHS | `407d8f` | Dassault Falcon 900LX | — | haute |
| Allemagne (gouvernement) | Chancelier | 10+01 | `3ea12c` | Airbus A350-941 | — | haute |
| Allemagne (gouvernement) | Chancelier | 10+02 | `3f5d91` | Airbus A350-941 | — | haute |
| Allemagne (gouvernement) | Chancelier | 10+03 | `3e854f` | Airbus A350-941 | — | haute |
| Japon (gouvernement) | Premier ministre | 80-1111 | `87c002` | Boeing 777-300ER | — | haute |
| Japon (gouvernement) | Premier ministre | 80-1112 | `87c003` | Boeing 777-300ER | — | haute |
| Inde (gouvernement) | Narendra Modi | K7066 | `800585` | Boeing 777-300ER (Air India One) | — | haute |
| Inde (gouvernement) | Narendra Modi | K7067 | `800c3d` | Boeing 777-300ER (Air India One) | — | haute |
| Inde (gouvernement) | Narendra Modi | K5012 | `8002f6` | Boeing 737 BBJ | — | haute |
| Turquie (gouvernement) | Recep Tayyip Erdogan | TC-TUR | `4bd2b2` | Airbus ACJ330 | — | haute |
| Turquie (gouvernement) | Recep Tayyip Erdogan | TC-TRK | `4bd24b` | Boeing 747-8 BBJ | — | haute |
| Turquie (gouvernement) | Recep Tayyip Erdogan | TC-CAN | `4b8c2e` | Airbus A340-500 | — | haute |
| Turquie (gouvernement) | Recep Tayyip Erdogan | TC-ATA | `4b8681` | Gulfstream G-IV | — | haute |
| Bresil (gouvernement) | Lula da Silva | FAB2101 | `e400d9` | Airbus VC-1A (A319) | — | haute |
| Canada (gouvernement) | Premier ministre | 330-002 | `c2c363` | Airbus CC-330 Husky | — | haute |
| Canada (gouvernement) | Premier ministre | 144-619 | `c2c1f1` | Bombardier CC-144D Challenger | — | haute |
| Canada (gouvernement) | Premier ministre | 144-620 | `c2c1fb` | Bombardier CC-144D Challenger | — | haute |
| Israel (gouvernement) | Premier ministre | 4X-ISR | `7386c0` | Boeing 767-300ER (Wing of Zion) | — | haute |
| Coree du Sud (gouvernement) | President | 22-001 | `71be43` | Boeing 747-8 | — | haute |
| Arabie saoudite | Mohammed ben Salmane | HZ-HM1 | `710333` | Boeing 747-400 | — | haute |
| Arabie saoudite | Mohammed ben Salmane | HZ-HMS2 | `710334` | Airbus A340-200 | — | moyenne |
| Arabie saoudite | Mohammed ben Salmane | HZ-HM3 | `710195` | Boeing 787-8 BBJ | — | faible |
| Arabie saoudite | Mohammed ben Salmane | HZ-HM4 | `71019b` | Boeing 787-8 BBJ | — | faible |
| Arabie saoudite | Mohammed ben Salmane | HZ-HM5 | `710190` | Boeing 777-300ER | — | faible |
| Arabie saoudite | Ministere des Finances | HZ-MF6 | `71022b` | Boeing 737NG | — | moyenne |
| Emirats arabes unis (Abu Dhabi) | Mohammed ben Zayed | A6-ALN | `896264` | Boeing 777-200ER | — | haute |
| Emirats arabes unis (Abu Dhabi) | Mohammed ben Zayed | A6-PFA | `8962e9` | Boeing 747-8 | — | haute |
| Emirats arabes unis (Abu Dhabi) | Mohammed ben Zayed | A6-PFC | `89636e` | Boeing 787 | — | moyenne |
| Emirats arabes unis (Abu Dhabi) | Mohammed ben Zayed | A6-PFE | `8964c9` | Boeing 787 BBJ | — | moyenne |
| Qatar (Qatar Amiri Flight) | Emir Tamim ben Hamad Al Thani | A7-HHE | `06a0a2` | Boeing 747-8 BBJ | — | haute |
| Qatar (Qatar Amiri Flight) | Emir Tamim ben Hamad Al Thani | A7-HHF | `06a2c3` | Boeing 747-8 BBJ | — | haute |
| Qatar (Qatar Amiri Flight) | Emir Tamim ben Hamad Al Thani | A7-HHH | `06a021` | Airbus A340-541 | — | haute |
| Emirats arabes unis (Dubai Air Wing) | Mohammed ben Rachid Al Maktoum | A6-COM | `8961b4` | Boeing 747 | — | haute |
| Emirats arabes unis (Dubai Air Wing) | Mohammed ben Rachid Al Maktoum | A6-MMM | `8960ae` | Boeing 747 | — | haute |
| Emirats arabes unis (Dubai Air Wing) | Mohammed ben Rachid Al Maktoum | A6-HRM | `8960b4` | Boeing 747 | — | moyenne |
| Emirats arabes unis (Dubai Air Wing) | Mohammed ben Rachid Al Maktoum | A6-HHH | `896438` | Gulfstream G650 | — | moyenne |
| Emirats arabes unis (Dubai Air Wing) | Mohammed ben Rachid Al Maktoum | A6-HRS | `89605a` | Boeing 737 BBJ | — | moyenne |
| Emirats arabes unis (Dubai Air Wing) | Mohammed ben Rachid Al Maktoum | A6-GGP | `896272` | Boeing 747-400F | — | moyenne |
| Jordanie (gouvernement) | Roi Abdallah II | VQ-BNZ | `4243fd` | Gulfstream G650ER | — | faible |
| Monaco | Prince Albert II | 3A-MGA | `4d403f` | Dassault Falcon 8X | — | haute |

### Personnalités : milliardaires

| Entité | Personne / usage | Immat. | Hex | Modèle | Propriétaire (FAA si US) | Confiance |
|---|---|---|---|---|---|---|
| Oracle | Larry Ellison | N417C | `a4ee53` | Cessna Citation CJ4 (2010) | WING AND A PRAYER INC | moyenne |
| Dell | Michael Dell | N6D | `a7c2d8` | Gulfstream G700 (2024) | WILMINGTON TRUST CO TRUSTEE | moyenne |
| Dell | Michael Dell | N228ZD | `a200fc` | Gulfstream G650ER (2015) | TVPX AIRCRAFT SOLUTIONS INC TRUSTEE | moyenne |
| Strategy (MicroStrategy) | Michael Saylor | N3877 | `a47898` | Bombardier Global Express XRS (2008) | 821 393 LLC | moyenne |
| News Corp / Fox | Rupert Murdoch | N898NC | `ac643b` | Gulfstream G650ER (2015) | BANK OF UTAH TRUSTEE | moyenne |
| Emerson Collective | Laurene Powell Jobs | N2N | `a18e7d` | Gulfstream G650 (2017) | BANK OF UTAH TRUSTEE | moyenne |
| Alibaba | Jack Ma | VP-CAM | `424779` | Boeing 737 BBJ | — | faible |
| Reliance Industries | Mukesh Ambani | VT-AKV | `80169f` | Boeing 737 MAX 9 BBJ | — | haute |
| Reliance Industries | Mukesh Ambani | VT-ASR | `801533` | Bombardier Global 7500 | — | moyenne |
| Adani Group | Gautam Adani | VT-AGL | `8014b9` | Bombardier Global 6500 | — | moyenne |
| Adani Group | Gautam Adani | VT-AHM | `801567` | Embraer Legacy 650 | — | moyenne |
| Grupo Carso / America Movil | Carlos Slim | XA-ATL | `0d02f1` | Gulfstream G550 | — | moyenne |
| Grupo Carso / America Movil | Carlos Slim | XA-CLR | `0d0bd1` | Gulfstream G650 | — | moyenne |
| Millhouse | Roman Abramovich | LX-RAY | `4d0207` | Gulfstream G650ER | — | moyenne |
| Virgin Group | Richard Branson | M-GGAL | `4ca001` | — | — | faible |

Déjà suivis dans un autre groupe : Larry Ellison (N817GS), Marc Benioff (N650HA), Steve Wynn
(N88WR). **Écartés :** Mark Cuban (N921MT seulement réservée), Larry Ellison N15GX (annulée),
Brésil FAB2901/2902, Corée du Sud 26-001, Qatar A7-MSD et Jordanie VP-BHM (hex introuvable).
**Désaccords entre sources :** Air Force One (Celebplanes décale les hex d'un cran ; on garde
plane-alert-db), MBS HZ-HMS2 et HZ-HM3/4/5, Jordanie VQ-BNZ, Jack Ma (VP-CAM selon plane-alert-db,
VP-CZM selon Celebplanes). Ces avions sont en confiance faible ou moyenne.

**Niveau de confiance :**
- **haute** : le nom de la société figure au registre FAA.
- **moyenne** : le registre ne montre qu'un trust ou une LLC, et c'est la base communautaire qui relie l'avion à la personne.
- **faible** : une seule source communautaire (Celebplanes) ou un avion d'affrètement partagé avec d'autres clients.

## Statut en direct

La position et le statut de chaque avion (en vol, au sol, non détecté), les vols des
90 derniers jours et les routes sont sur le site : <https://phelelep.github.io/Jet_Scrapper/>,
mis à jour toutes les 30 minutes par GitHub Actions.

« Non détecté » ne veut pas dire « au sol » : l'avion peut être hors couverture, avoir son
transpondeur coupé ou voler sous une adresse PIA temporaire.

## Signaux déjà visibles : immatriculations réservées

Le fichier `RESERVED.txt` de la FAA liste les immatriculations qu'une entité réserve **avant**
d'y rattacher un avion. Une réservation annonce souvent un achat, une vente ou un changement
d'immatriculation.

| Immat. réservée | Réservée par | Date | Lecture possible |
|---|---|---|---|
| N502SX, N365XX, N768X | FALCON LANDING LLC (Musk) | 2026-03-21 / 03-26 | N502SX (ex-G550) libéré ; le G700 N7628 est arrivé en juin 2026 |
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
- [x] Compte OpenSky : historique en cours de rattrapage (`python update.py`).
- [x] Planifier `python update.py` : GitHub Actions, toutes les 30 min (+ OpenSky une fois par jour).
- [ ] Trouver les avions manquants (Apple, Broadcom, Palantir/Karp…) : chercher dans le registre FAA les
      numéros de série connus et les copropriétés.
- [x] Personnalités validées (chefs d'État sauf Russie, milliardaires) et ajoutées au groupe
      `personnalites` de `data/targets.csv`.
- [ ] Retrouver les hex manquants (Brésil FAB2901/2902, Corée 26-001, Qatar A7-MSD, Jordanie VP-BHM).
- [ ] Surveiller les nouvelles réservations dans `RESERVED.txt` (comparaison quotidienne).
