# Jets privés suivis — référentiel

Référentiel des jets d'affaires liés aux sociétés de la watchlist `News_agent`, plus quelques
grands dirigeants, des chefs d'État et des milliardaires. Données brutes : [`data/targets.csv`](data/targets.csv).
Statut en direct régénéré par `python update.py`.

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

<!-- STATUS:START -->
_Relevé du 2026-10-01 12:28 UTC — statut : adsb.lol ; vols 90 j : OpenSky (nombre de vols / jours déjà récupérés sur les 90 derniers). Section générée par `python update.py`._

| Immat. | Hex | Entité | Statut actuel | Position actuelle | Vols 90 j |
|---|---|---|---|---|---|
| N628TS | `a835af` | Elon Musk | ⚪ Non détecté | — | 7 vols / 11 j |
| N272BG | `a2ae0a` | Elon Musk | ⚪ Non détecté | — | 12 vols / 11 j |
| N10XG | `a0046f` | Google (flotte dirigeants) | ⚪ Non détecté | — | 2 vols / 11 j |
| N232G | `a21084` | Sergey Brin (co-fondateur) | ⚪ Non détecté | — | 0 vols / 11 j |
| N651WE | `a8926a` | Google (flotte dirigeants) | ⚪ Non détecté | — | 7 vols / 11 j |
| N652WE | `a89621` | Eric Schmidt (ex-CEO) | ⚪ Non détecté | — | 5 vols / 11 j |
| N68885 | `a9247d` | Mark Zuckerberg | ⚪ Non détecté | — | 2 vols / 11 j |
| N3880 | `a47b5a` | Mark Zuckerberg | ⚪ Non détecté | — | 8 vols / 11 j |
| N709DS | `a97659` | Steve Ballmer (ex-CEO) | ⚪ Non détecté | — | 9 vols / 11 j |
| N558FX | `a71db6` | AMD (copropriete Flexjet) | ⚪ Non détecté | — | 18 vols / 11 j |
| N664FX | `a8c3a8` | AMD (copropriete Flexjet) | ⚪ Non détecté | — | 6 vols / 11 j |
| N894QS | `ac559f` | Anduril (copropriete NetJets) | ⚪ Non détecté | — | 24 vols / 11 j |
| N482EC | `a5f06e` | Constellation Energy | ⚪ Non détecté | — | 7 vols / 11 j |
| N484EC | `a5f7dc` | Constellation Energy | ⚪ Non détecté | — | 10 vols / 11 j |
| N282QA | `a2d6c8` | Quanta Services | ⚪ Non détecté | — | 4 vols / 11 j |
| N283QA | `a2da7f` | Quanta Services | ⚪ Non détecté | — | 6 vols / 11 j |
| N7628 | `aa4c66` | Elon Musk | ⚪ Non détecté | — | 0 vols / 11 j |
| N8628 | `abd9b5` | Elon Musk | ⚪ Non détecté | — | 0 vols / 11 j |
| N154TS | `a0dac5` | SpaceX (navette equipes) | ⚪ Non détecté | — | 0 vols / 11 j |
| N450GG | `a572b9` | Elon Musk | ⚪ Non détecté | — | 0 vols / 11 j |
| N831FR | `ab5c9e` | Kimbal Musk (administrateur Tesla) | ⚪ Non détecté | — | 0 vols / 11 j |
| N11AF | `a029e0` | Jeff Bezos | ⚪ Non détecté | — | 0 vols / 11 j |
| N756LB | `aa314f` | Jeff Bezos | ⚪ Non détecté | — | 0 vols / 11 j |
| N194PJ | `a17855` | Jeff Bezos | ⚪ Non détecté | — | 0 vols / 11 j |
| N887GV | `ac3880` | Bill Gates (co-fondateur) | ⚪ Non détecté | — | 0 vols / 11 j |
| N618PB | `a80dbd` | Larry Page (co-fondateur) | ⚪ Non détecté | — | 0 vols / 11 j |
| N904G | `ac7e9e` | Google (flotte dirigeants) | ⚪ Non détecté | — | 0 vols / 11 j |
| 9H-VID | `4d230d` | Jensen Huang (affretement VistaJet) | ⚪ Non détecté | — | 0 vols / 11 j |
| N302TR | `a32879` | Masayoshi Son | ⚪ Non détecté | — | 0 vols / 11 j |
| N817GS | `ab2404` | Larry Ellison | ⚪ Non détecté | — | 4 vols / 11 j |
| N878DB | `ac145b` | Peter Thiel | ⚪ Non détecté | — | 5 vols / 11 j |
| N880WT | `ac1fdb` | Qualcomm | ⚪ Non détecté | — | 0 vols / 11 j |
| N882WT | `ac2749` | Qualcomm | ⚪ Non détecté | — | 4 vols / 11 j |
| N684MT | `a91338` | Micron Technology | ⚪ Non détecté | — | 6 vols / 11 j |
| N778MT | `aa87e4` | Micron Technology | ⚪ Non détecté | — | 0 vols / 11 j |
| N831MT | `ab5d36` | Micron Technology | 🟡 Au sol, transpondeur actif | 2 km de KBOI (Boise, US) | 18 vols / 11 j |
| N45GX | `a5706f` | Texas Instruments | ⚪ Non détecté | — | 0 vols / 11 j |
| N46GX | `a597ee` | Texas Instruments | ⚪ Non détecté | — | 0 vols / 11 j |
| N68KP | `a901cd` | Ken Griffin | ⚪ Non détecté | — | 0 vols / 11 j |
| N302AK | `a326ca` | Ken Griffin | ⚪ Non détecté | — | 0 vols / 11 j |
| N47EG | `a5bf2c` | Michael Bloomberg | ⚪ Non détecté | — | 3 vols / 11 j |
| N554AV | `a70e5b` | AbbVie (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N100AL | `a004bf` | Abbott Laboratories (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N550AL | `a6ff76` | Abbott Laboratories (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N900AL | `ac6f37` | Abbott Laboratories (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N82123 | `ab374c` | Adobe Inc. (flotte société) | ⚪ Non détecté | — | 4 vols / 11 j |
| N288QS | `a2ed22` | Autodesk (flotte société) | ⚪ Non détecté | — | 19 vols / 11 j |
| N71F | `a97a31` | AES Corporation (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N280AF | `a2ce01` | Aflac (flotte société) | ⚪ Non détecté | — | 4 vols / 11 j |
| N285AF | `a2e094` | Aflac (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N612AF | `a7f632` | Ameriprise Financial (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N616AF | `a8050e` | Ameriprise Financial (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N25ZG | `a2576b` | A. O. Smith (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N26HH | `a27d5b` | APA Corporation (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N289QS | `a2f0d9` | Amphenol (flotte société) | ⚪ Non détecté | — | 11 vols / 11 j |
| N332FX | `a39dd0` | Axon Enterprise (flotte société) | ⚪ Non détecté | — | 7 vols / 11 j |
| N650GB | `a88d52` | American Express (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N228BA | `a1fed3` | Bank of America (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N285BA | `a2e0a8` | Bank of America (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N676BA | `a8f21c` | Bank of America (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N400BC | `a4acbd` | Ball Corporation (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N394BB | `a491c0` | Brown & Brown (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N396BB | `a4992e` | Brown & Brown (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N1812C | `a14704` | Citigroup (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N175CT | `a12c04` | Caterpillar Inc. (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N797CT | `aad24a` | Caterpillar Inc. (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N711QS | `a98133` | Ciena (flotte société) | ⚪ Non détecté | — | 6 vols / 11 j |
| N204QS | `a1a24e` | Clorox (flotte société) | ⚪ Non détecté | — | 11 vols / 11 j |
| N63XF | `a83d76` | Comcast (flotte société) | ⚪ Non détecté | — | 4 vols / 11 j |
| N281CE | `a2d1e9` | Cummins (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N282CE | `a2d5a0` | Cummins (flotte société) | ⚪ Non détecté | — | 5 vols / 11 j |
| N283CE | `a2d957` | Cummins (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N804CE | `aaf0f0` | Cummins (flotte société) | ⚪ Non détecté | — | 4 vols / 11 j |
| N102CE | `a00c59` | CenterPoint Energy (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N595FX | `a7b08d` | Capital One (flotte société) | ⚪ Non détecté | — | 9 vols / 11 j |
| N660FX | `a8b4cc` | Coherent Corp. (flotte société) | ⚪ Non détecté | — | 7 vols / 11 j |
| N881RC | `ac2306` | Cooper Companies (The) (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N284CP | `a2dd17` | ConocoPhillips (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N793CP | `aac36a` | ConocoPhillips (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N795CP | `aacad8` | ConocoPhillips (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N797CP | `aad246` | ConocoPhillips (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N220FX | `a1e194` | Copart (flotte société) | ⚪ Non détecté | — | 11 vols / 11 j |
| N394WJ | `a493a2` | Copart (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N516FX | `a6784c` | Copart (flotte société) | ⚪ Non détecté | — | 19 vols / 11 j |
| N650HA | `a88d6a` | Marc Benioff | ⚪ Non détecté | — | 0 vols / 11 j |
| N1876P | `a15de5` | Chevron Corporation (flotte société) | 🟢 En vol — N1876P, 41000 ft, 547 kt | survol : 284 km de YCFS (Coffs Harbour, AU) | 1 vols / 11 j |
| N1895T | `a16534` | Chevron Corporation (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N1901G | `a16aad` | Chevron Corporation (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N884GL | `ac2d52` | Chevron Corporation (flotte société) | ⚪ Non détecté | — | 4 vols / 11 j |
| N604D | `a7d666` | Dominion Energy (flotte société) | ⚪ Non détecté | — | 9 vols / 11 j |
| N607D | `a7e18b` | Dominion Energy (flotte société) | ⚪ Non détecté | — | 5 vols / 11 j |
| N581D | `a779ea` | DuPont (flotte société) | ⚪ Non détecté | — | 5 vols / 11 j |
| N855DG | `abba3d` | Dollar General (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N288DX | `a2ec14` | Quest Diagnostics (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N648DX | `a88354` | Quest Diagnostics (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N899DX | `ac6724` | Quest Diagnostics (flotte société) | 🟢 En vol — LBQ500, 1525 ft, 151 kt | survol : 10 km de KTEB (Teterboro, US) | 0 vols / 11 j |
| N343FX | `a3c906` | Everest Group (flotte société) | ⚪ Non détecté | — | 10 vols / 11 j |
| N21FE | `a1b7ab` | FedEx Freight (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N39FE | `a480f2` | FedEx Freight (flotte société) | ⚪ Non détecté | — | 7 vols / 11 j |
| N280GD | `a2ce95` | General Dynamics (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N585G | `a78911` | General Dynamics (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N586G | `a78cc8` | General Dynamics (flotte société) | ⚪ Non détecté | — | 5 vols / 11 j |
| N587G | `a7907f` | General Dynamics (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N628G | `a8348b` | General Dynamics (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N101FX | `a008fe` | GE Vernova (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N18CG | `a13e8c` | Corning Inc. (flotte société) | 🟢 En vol — N18CG, 36000 ft, 422 kt | survol : 8 km de PA75 (Elkland, US) | 10 vols / 11 j |
| N28CG | `a2cbdb` | Corning Inc. (flotte société) | ⚪ Non détecté | — | 7 vols / 11 j |
| N295ML | `a3092b` | Corning Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N38CG | `a4592a` | Corning Inc. (flotte société) | ⚪ Non détecté | — | 19 vols / 11 j |
| N48CG | `a5e679` | Corning Inc. (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N58CG | `a773c8` | Corning Inc. (flotte société) | ⚪ Non détecté | — | 4 vols / 11 j |
| N788CG | `aaae77` | Corning Inc. (flotte société) | 🟢 En vol — N788CG, 20375 ft, 413 kt | survol : 10 km de 6NC8 (Advance, US) | 9 vols / 11 j |
| N28GP | `a2cc46` | Genuine Parts Company (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N183TS | `a14d8b` | Global Payments (flotte société) | 🟢 En vol — N183TS, 22000 ft, 444 kt | survol : 17 km de US-0123 (Powhatan, US) | 8 vols / 11 j |
| N288SF | `a2ed49` | Global Payments (flotte société) | ⚪ Non détecté | — | 12 vols / 11 j |
| N794BC | `aac6fd` | Global Payments (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N300WB | `a32148` | Garmin (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N78XL | `aa9045` | Garmin (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N820UT | `ab32af` | Garmin (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N888GL | `ac3c2e` | Garmin (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N8CB | `aadd5f` | Huntington Bancshares (flotte société) | ⚪ Non détecté | — | 5 vols / 11 j |
| N889H | `ac3ff3` | Honeywell Aerospace (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N933H | `acf17d` | Honeywell Aerospace (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N222VR | `a1ea5a` | HP Inc. (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N592FX | `a7a568` | HP Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N7SB | `a9516e` | HP Inc. (flotte société) | ⚪ Non détecté | — | 5 vols / 11 j |
| N198HF | `a18698` | Hormel Foods (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N199HF | `a18a4f` | Hormel Foods (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N733A | `a9d630` | Humana (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N733H | `a9d6df` | Humana (flotte société) | 🟢 En vol — N733H, 41000 ft, 428 kt | survol : 6 km de WV28 (Clarksburg, US) | 7 vols / 11 j |
| N733K | `a9d711` | Humana (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N780RW | `aa9212` | IBM (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N780TW | `aa9244` | IBM (flotte société) | ⚪ Non détecté | — | 5 vols / 11 j |
| N231CE | `a20c6e` | Intercontinental Exchange (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N414QS | `a4e46b` | IDEX Corporation (flotte société) | ⚪ Non détecté | — | 16 vols / 11 j |
| N496QS | `a627d1` | International Paper (flotte société) | ⚪ Non détecté | — | 17 vols / 11 j |
| N2291R | `a204fb` | Ingersoll Rand (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N780JH | `aa9156` | Jack Henry & Associates (flotte société) | 🟢 En vol — N780JH, 39975 ft, 437 kt | survol : 26 km de K0M4 (Camden, US) | 7 vols / 11 j |
| N894JH | `ac5500` | Jack Henry & Associates (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N895JH | `ac58b7` | Jack Henry & Associates (flotte société) | ⚪ Non détecté | — | 4 vols / 11 j |
| N1930J | `a175b1` | Johnson & Johnson (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N30QJ | `a31e60` | Johnson & Johnson (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N400J | `a4ad69` | Johnson & Johnson (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N60QJ | `a7c64d` | Johnson & Johnson (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N800J | `aae2a5` | Johnson & Johnson (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N886RW | `ac35ab` | Coca-Cola Company (The) (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N300KC | `a32036` | Kroger (flotte société) | 🟢 En vol — N300KC, 4975 ft, 240 kt | survol : 4 km de TN58 (Brighton, US) | 4 vols / 11 j |
| N302KC | `a327a4` | Kroger (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N304KC | `a32f12` | Kroger (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N618CR | `a80cb8` | Leidos (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N108DB | `a022b9` | Labcorp (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N517LH | `a67c72` | Labcorp (flotte société) | ⚪ Non détecté | — | 4 vols / 11 j |
| N344RS | `a3cdb2` | Lockheed Martin (flotte société) | ⚪ Non détecté | — | 4 vols / 11 j |
| N359GS | `a406e3` | Lockheed Martin (flotte société) | ⚪ Non détecté | — | 4 vols / 11 j |
| N650VC | `a88e98` | Lockheed Martin (flotte société) | ⚪ Non détecté | — | 4 vols / 11 j |
| N33LC | `a39473` | Lowe's (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N336LS | `a3ad24` | Las Vegas Sands (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N337LS | `a3b0db` | Las Vegas Sands (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N338LS | `a3b492` | Las Vegas Sands (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N339LS | `a3b849` | Las Vegas Sands (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N885LS | `ac3173` | Las Vegas Sands (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N889LS | `ac404f` | Las Vegas Sands (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N404MM | `a4bc9c` | Martin Marietta Materials (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N93M | `ace463` | 3M (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N422MP | `a5042e` | Marathon Petroleum (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N513FX | `a66d27` | Motorola Solutions (flotte société) | ⚪ Non détecté | — | 5 vols / 11 j |
| N533GV | `a6bc3c` | Netflix (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N714CG | `a98b22` | NiSource (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N1972 | `a184ca` | Nike, Inc. (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N3546 | `a3f6d3` | Nike, Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N6453 | `a87a8f` | Nike, Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N23NG | `a2075a` | Northrop Grumman (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N37NG | `a432a5` | Northrop Grumman (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N38NG | `a45a24` | Northrop Grumman (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N99NG | `add17d` | Northrop Grumman (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N750JT | `aa1ae3` | Nucor (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N940JF | `ad0df6` | Nucor (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N980JF | `adabf2` | Nucor (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N300KE | `a32038` | Oneok (flotte société) | ⚪ Non détecté | — | 10 vols / 11 j |
| N310KE | `a347b7` | Oneok (flotte société) | ⚪ Non détecté | — | 5 vols / 11 j |
| N370D | `a43416` | Paccar (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N701P | `a9598a` | Paccar (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N706P | `a96c1d` | Paccar (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N880T | `ac1f7e` | Paccar (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N3CP | `a31ae0` | Pfizer (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N4CP | `a4a82f` | Pfizer (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N6CP | `a7c2cd` | Pfizer (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N1PG | `a0014e` | Procter & Gamble (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N2PG | `a18e9d` | Procter & Gamble (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N5PG | `a6368a` | Procter & Gamble (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N6PG | `a7c3d9` | Procter & Gamble (flotte société) | ⚪ Non détecté | — | 6 vols / 11 j |
| N7PG | `a95128` | Procter & Gamble (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N412DL | `a4dbe4` | PNC Financial Services (flotte société) | ⚪ Non détecté | — | 5 vols / 11 j |
| N513DL | `a66cea` | PNC Financial Services (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N545DL | `a6ead5` | PNC Financial Services (flotte société) | ⚪ Non détecté | — | 4 vols / 11 j |
| N852DL | `abaf1c` | PNC Financial Services (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N211WG | `a1bf34` | Pentair (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N827GA | `ab4b73` | PPG Industries (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N857GA | `abc1f0` | PPG Industries (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N684QS | `a91382` | PPL Corporation (flotte société) | ⚪ Non détecté | — | 14 vols / 11 j |
| N552SC | `a7086c` | PTC Inc. (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N4050 | `a4c18c` | PayPal (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N459FX | `a5941e` | Regeneron Pharmaceuticals (flotte société) | ⚪ Non détecté | — | 4 vols / 11 j |
| N539CA | `a6d20f` | ResMed| (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N57AB | `a74c12` | Rockwell Automation (flotte société) | ⚪ Non détecté | — | 5 vols / 11 j |
| N68AB | `a900e0` | Rockwell Automation (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N3RP | `a31c25` | Roper Technologies (flotte société) | ⚪ Non détecté | — | 5 vols / 11 j |
| N19HS | `a16692` | Starbucks (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N1897S | `a16579` | J.M. Smucker Company (The) (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N97SJ | `ad82e5` | J.M. Smucker Company (The) (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N610FX | `a7ef51` | Solventum (flotte société) | ⚪ Non détecté | — | 15 vols / 11 j |
| N5262 | `a6a1d6` | State Street Corporation (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N421SC | `a500e9` | Stryker Corporation (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N520SC | `a68a81` | Stryker Corporation (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N625SC | `a82a63` | Stryker Corporation (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N484EM | `a5f7e5` | Target Corporation (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N837RE | `ab73d7` | UDR, Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N358V | `a40460` | Visa Inc. (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N256RC | `a26f42` | Vulcan Materials Company (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N957RC | `ad5022` | Vulcan Materials Company (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N74VZ | `a9f224` | Verizon (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N76VZ | `aa4122` | Verizon (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N191MM | `a16d01` | Workday, Inc. (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N281WC | `a2d3a9` | Williams Companies (flotte société) | ⚪ Non détecté | — | 3 vols / 11 j |
| N15DP | `a0c82f` | Walmart (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N16CP | `a0ef95` | Walmart (flotte société) | ⚪ Non détecté | — | 6 vols / 11 j |
| N17ZP | `a11921` | Walmart (flotte société) | ⚪ Non détecté | — | 6 vols / 11 j |
| N45GH | `a57061` | Walmart (flotte société) | ⚪ Non détecté | — | 4 vols / 11 j |
| N45HK | `a5707c` | Walmart (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N986BL | `adc192` | Walmart (flotte société) | 🟢 En vol — N986BL, 34450 ft, 378 kt | survol : 6 km de 75KS (Bartlett, US) | 0 vols / 11 j |
| N188WR | `a16068` | Wynn Resorts (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N88WR | `ac1d80` | Wynn Resorts (flotte société) | ⚪ Non détecté | — | 1 vols / 11 j |
| N969WR | `ad7f99` | Wynn Resorts (flotte société) | ⚪ Non détecté | — | 6 vols / 11 j |
| N355ZB | `a3f9a1` | Zimmer Biomet (flotte société) | ⚪ Non détecté | — | 2 vols / 11 j |
| N650ZB | `a88efb` | Zimmer Biomet (flotte société) | ⚪ Non détecté | — | 0 vols / 11 j |
| N757AF | `aa3410` | Donald Trump | ⚪ Non détecté | — | 0 vols / 11 j |
| 82-8000 | `adfdf8` | Air Force One (Donald Trump) | ⚪ Non détecté | — | 0 vols / 11 j |
| 92-9000 | `adfdf9` | Air Force One (Donald Trump) | ⚪ Non détecté | — | 0 vols / 11 j |
| 25-3300 | `af83f3` | Air Force One (Donald Trump) | ⚪ Non détecté | — | 0 vols / 11 j |
| 98-0001 | `adfeb7` | Air Force Two (JD Vance, Marco Rubio...) | ⚪ Non détecté | — | 0 vols / 11 j |
| 98-0002 | `adfeb8` | Air Force Two (JD Vance, Marco Rubio...) | ⚪ Non détecté | — | 0 vols / 11 j |
| 99-0003 | `adfeb9` | Air Force Two (JD Vance, Marco Rubio...) | ⚪ Non détecté | — | 0 vols / 11 j |
| 99-0004 | `adfeba` | Air Force Two (JD Vance, Marco Rubio...) | ⚪ Non détecté | — | 0 vols / 11 j |
| 09-0015 | `ae4ae6` | Air Force Two (JD Vance, Marco Rubio...) | ⚪ Non détecté | — | 0 vols / 11 j |
| 09-0016 | `ae4ae8` | Air Force Two (JD Vance, Marco Rubio...) | ⚪ Non détecté | — | 0 vols / 11 j |
| 09-0017 | `ae4aea` | Air Force Two (JD Vance, Marco Rubio...) | ⚪ Non détecté | — | 0 vols / 11 j |
| 19-0018 | `ae4aec` | Air Force Two (JD Vance, Marco Rubio...) | ⚪ Non détecté | — | 0 vols / 11 j |
| B-2479 | `7bc006` | Xi Jinping | ⚪ Non détecté | — | 0 vols / 11 j |
| B-2481 | `780d2c` | Xi Jinping | ⚪ Non détecté | — | 0 vols / 11 j |
| B-3999 | `7807fc` | Xi Jinping | ⚪ Non détecté | — | 0 vols / 11 j |
| F-RARF | `3b76ae` | Emmanuel Macron | ⚪ Non détecté | — | 0 vols / 11 j |
| F-RAFA | `3b770d` | Emmanuel Macron | 🟢 En vol — CTM1282, 18000 ft, 443 kt | survol : 8 km de LFSU (Rolampont, Haute-Marne, FR) | 0 vols / 11 j |
| F-RAFB | `3b76b3` | Emmanuel Macron | ⚪ Non détecté | — | 0 vols / 11 j |
| F-UJCU | `3b7542` | Emmanuel Macron | ⚪ Non détecté | — | 0 vols / 11 j |
| G-GBNI | `407dfc` | Premier ministre / famille royale | ⚪ Non détecté | — | 0 vols / 11 j |
| G-ZABH | `407d90` | Premier ministre / famille royale | ⚪ Non détecté | — | 0 vols / 11 j |
| G-ZAHS | `407d8f` | Premier ministre / famille royale | ⚪ Non détecté | — | 0 vols / 11 j |
| 10+01 | `3ea12c` | Chancelier | 🟢 En vol — GAF940, 1250 ft, 168 kt | survol : 3 km de EDDP (Schkeuditz, DE) | 0 vols / 11 j |
| 10+02 | `3f5d91` | Chancelier | 🟢 En vol — GAF937, 30725 ft, 484 kt | survol : 18 km de PT-0090 (Monforte, PT) | 0 vols / 11 j |
| 10+03 | `3e854f` | Chancelier | ⚪ Non détecté | — | 0 vols / 11 j |
| 80-1111 | `87c002` | Premier ministre | ⚪ Non détecté | — | 0 vols / 11 j |
| 80-1112 | `87c003` | Premier ministre | ⚪ Non détecté | — | 0 vols / 11 j |
| K7066 | `800585` | Narendra Modi | ⚪ Non détecté | — | 0 vols / 11 j |
| K7067 | `800c3d` | Narendra Modi | ⚪ Non détecté | — | 0 vols / 11 j |
| K5012 | `8002f6` | Narendra Modi | ⚪ Non détecté | — | 0 vols / 11 j |
| TC-TUR | `4bd2b2` | Recep Tayyip Erdogan | ⚪ Non détecté | — | 0 vols / 11 j |
| TC-TRK | `4bd24b` | Recep Tayyip Erdogan | ⚪ Non détecté | — | 0 vols / 11 j |
| TC-CAN | `4b8c2e` | Recep Tayyip Erdogan | ⚪ Non détecté | — | 0 vols / 11 j |
| TC-ATA | `4b8681` | Recep Tayyip Erdogan | ⚪ Non détecté | — | 0 vols / 11 j |
| FAB2101 | `e400d9` | Lula da Silva | ⚪ Non détecté | — | 0 vols / 11 j |
| 330-002 | `c2c363` | Premier ministre | ⚪ Non détecté | — | 0 vols / 11 j |
| 144-619 | `c2c1f1` | Premier ministre | ⚪ Non détecté | — | 0 vols / 11 j |
| 144-620 | `c2c1fb` | Premier ministre | ⚪ Non détecté | — | 0 vols / 11 j |
| 4X-ISR | `7386c0` | Premier ministre | ⚪ Non détecté | — | 0 vols / 11 j |
| 22-001 | `71be43` | President | ⚪ Non détecté | — | 0 vols / 11 j |
| HZ-HM1 | `710333` | Mohammed ben Salmane | ⚪ Non détecté | — | 0 vols / 11 j |
| HZ-HMS2 | `710334` | Mohammed ben Salmane | ⚪ Non détecté | — | 0 vols / 11 j |
| HZ-HM3 | `710195` | Mohammed ben Salmane | ⚪ Non détecté | — | 0 vols / 11 j |
| HZ-HM4 | `71019b` | Mohammed ben Salmane | ⚪ Non détecté | — | 0 vols / 11 j |
| HZ-HM5 | `710190` | Mohammed ben Salmane | ⚪ Non détecté | — | 0 vols / 11 j |
| HZ-MF6 | `71022b` | Ministere des Finances | ⚪ Non détecté | — | 0 vols / 11 j |
| A6-ALN | `896264` | Mohammed ben Zayed | ⚪ Non détecté | — | 0 vols / 11 j |
| A6-PFA | `8962e9` | Mohammed ben Zayed | ⚪ Non détecté | — | 0 vols / 11 j |
| A6-PFC | `89636e` | Mohammed ben Zayed | 🟢 En vol — AUH04, 40000 ft, 473 kt | survol : 333 km de EIBT (Belmullet, IE) | 0 vols / 11 j |
| A6-PFE | `8964c9` | Mohammed ben Zayed | ⚪ Non détecté | — | 0 vols / 11 j |
| A7-HHE | `06a0a2` | Emir Tamim ben Hamad Al Thani | ⚪ Non détecté | — | 0 vols / 11 j |
| A7-HHF | `06a2c3` | Emir Tamim ben Hamad Al Thani | ⚪ Non détecté | — | 0 vols / 11 j |
| A7-HHH | `06a021` | Emir Tamim ben Hamad Al Thani | ⚪ Non détecté | — | 0 vols / 11 j |
| A6-COM | `8961b4` | Mohammed ben Rachid Al Maktoum | ⚪ Non détecté | — | 0 vols / 11 j |
| A6-MMM | `8960ae` | Mohammed ben Rachid Al Maktoum | ⚪ Non détecté | — | 0 vols / 11 j |
| A6-HRM | `8960b4` | Mohammed ben Rachid Al Maktoum | ⚪ Non détecté | — | 0 vols / 11 j |
| A6-HHH | `896438` | Mohammed ben Rachid Al Maktoum | ⚪ Non détecté | — | 0 vols / 11 j |
| A6-HRS | `89605a` | Mohammed ben Rachid Al Maktoum | ⚪ Non détecté | — | 0 vols / 11 j |
| A6-GGP | `896272` | Mohammed ben Rachid Al Maktoum | ⚪ Non détecté | — | 0 vols / 11 j |
| VQ-BNZ | `4243fd` | Roi Abdallah II | ⚪ Non détecté | — | 0 vols / 11 j |
| 3A-MGA | `4d403f` | Prince Albert II | ⚪ Non détecté | — | 0 vols / 11 j |
| N417C | `a4ee53` | Larry Ellison | ⚪ Non détecté | — | 0 vols / 11 j |
| N6D | `a7c2d8` | Michael Dell | ⚪ Non détecté | — | 0 vols / 11 j |
| N228ZD | `a200fc` | Michael Dell | ⚪ Non détecté | — | 0 vols / 11 j |
| N3877 | `a47898` | Michael Saylor | ⚪ Non détecté | — | 0 vols / 11 j |
| N898NC | `ac643b` | Rupert Murdoch | ⚪ Non détecté | — | 0 vols / 11 j |
| N2N | `a18e7d` | Laurene Powell Jobs | ⚪ Non détecté | — | 0 vols / 11 j |
| VP-CAM | `424779` | Jack Ma | ⚪ Non détecté | — | 0 vols / 11 j |
| VT-AKV | `80169f` | Mukesh Ambani | ⚪ Non détecté | — | 0 vols / 11 j |
| VT-ASR | `801533` | Mukesh Ambani | ⚪ Non détecté | — | 0 vols / 11 j |
| VT-AGL | `8014b9` | Gautam Adani | ⚪ Non détecté | — | 0 vols / 11 j |
| VT-AHM | `801567` | Gautam Adani | ⚪ Non détecté | — | 0 vols / 11 j |
| XA-ATL | `0d02f1` | Carlos Slim | ⚪ Non détecté | — | 0 vols / 11 j |
| XA-CLR | `0d0bd1` | Carlos Slim | ⚪ Non détecté | — | 0 vols / 11 j |
| LX-RAY | `4d0207` | Roman Abramovich | ⚪ Non détecté | — | 0 vols / 11 j |
| M-GGAL | `4ca001` | Richard Branson | ⚪ Non détecté | — | 0 vols / 11 j |
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
- [x] Compte OpenSky : historique en cours de rattrapage (`python update.py`, à lancer chaque jour).
- [ ] Planifier `python update.py` (relevés stockés dans `data/snapshots.csv`).
- [ ] Trouver les avions manquants (Apple, Broadcom, Palantir/Karp…) : chercher dans le registre FAA les
      numéros de série connus et les copropriétés.
- [x] Personnalités validées (chefs d'État sauf Russie, milliardaires) et ajoutées au groupe
      `personnalites` de `data/targets.csv`.
- [ ] Retrouver les hex manquants (Brésil FAB2901/2902, Corée 26-001, Qatar A7-MSD, Jordanie VP-BHM).
- [ ] Surveiller les nouvelles réservations dans `RESERVED.txt` (comparaison quotidienne).
