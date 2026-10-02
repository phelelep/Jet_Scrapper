# Plan — site web de suivi des jets

> **État au 2026-10-02 :** V1 livrée. Hébergement décidé : GitHub Pages, données rafraîchies
> toutes les 30 min par GitHub Actions (`.github/workflows/update.yml`, voir le README).
> Le site est public, et non privé comme prévu ci-dessous. Il suit 311 avions.

Objectif : un site **privé** qui montre les jets suivis et **l'historique de leurs vols sur les
90 derniers jours**, avec les informations pertinentes (propriétaire, vols, routes, statistiques).

Deux versions :

| | **V1 : maintenant** | **V2 : plus tard** |
|---|---|---|
| Avions | 28 | Jusqu'à 200 |
| Fréquence | **1 exécution par jour** | Toutes les 10 min |
| Site | Statique : une carte + un tableau des vols | Carte quasi en direct, fiches avion et société, alertes |
| Mise à jour | **Un seul script** : `python update.py` | Le même script, planifié |
| Hébergement | Local (ouvrir `site/index.html`) | À décider (section 6) |

## 1. Architecture V1

```
python update.py
   │
   ├─ 1. OpenSky ──► vols de la veille pour chaque avion (+ rattrapage des 90 j) ─┐
   ├─ 2. adsb.lol ─► 1 appel groupé : position des jets au moment du relevé ───────┼─► data/jets.db (SQLite)
   │                                                                               │
   └─ 3. build ───► lit la base ──► site/data.js ──► site/index.html (carte + tableau)
```

- **Un seul point d'entrée.** `update.py` enchaîne collecte et génération. Chaque étape est
  isolée : si OpenSky échoue, le site est quand même régénéré avec ce qui est en base.
- **Un site 100 % statique.**
  - `index.html`, `style.css` et `app.js` sont écrits une fois pour toutes.
  - Le script ne régénère que `site/data.js`, de la forme `window.JETS_DATA = {...}`.
  - On utilise un fichier `.js` plutôt que du JSON parce qu'il se charge aussi en ouvrant
    `index.html` directement depuis le disque (`file://`), sans serveur. Un `fetch()` de JSON
    y est bloqué par le navigateur.
- **Leaflet** (chargé depuis un CDN) pour la carte, **tableau en JavaScript simple** (tri et
  filtres), **aucune compilation**.
- **Pas de Cloudflare ni de serveur.** Ils ne servaient qu'à héberger un site dynamique chez toi
  avec HTTPS et connexion. Inutile tant que le site est statique et local.

## 2. Contenu du site V1 (une seule page)

| Bloc | Contenu |
|---|---|
| **En-tête** | Date et heure du relevé, nombre de jets en vol, au sol ou non détectés, fraîcheur de l'historique (jours couverts sur 90) |
| **Carte** | **Jets en vol au moment du relevé** : icône orientée selon le cap, info-bulle avec immatriculation, société, indicatif, altitude, vitesse et aéroport de départ du vol en cours. En option (case à cocher) : jets au sol à leur position, routes des 7 derniers jours en lignes départ → arrivée |
| **Récapitulatif flotte** | Une ligne par jet : société, modèle, statut au relevé, dernier vol, vols et heures de vol sur 7, 30 et 90 jours, aéroport principal |
| **Historique des vols** | Tous les vols sur 90 jours : date, jet, société, départ → arrivée (code et ville), durée, distance, indicatif. Filtres : **jour, semaine, mois, 90 jours**, par jet, par société, par aéroport. Tri par colonne |

> L'historique est limité à 90 jours. Pas de vue « année » tant que la fenêtre n'est pas élargie.

## 3. Modèle de données V1 (SQLite)

| Table | Contenu | Rempli par |
|---|---|---|
| `aircraft` | hex, immatriculation, modèle, année, société, personne, propriétaire FAA, confiance, source | `targets.csv` (resynchronisé à chaque exécution) |
| `flights` | hex, décollage, atterrissage, départ, arrivée, indicatif (+ durée et distance calculées) | OpenSky (existe déjà) |
| `windows` | fenêtres OpenSky déjà récupérées | OpenSky (existe déjà) |
| `snapshots` | horodatage du relevé, hex, statut, lat, lon, altitude, vitesse, cap, indicatif | adsb.lol, 1 ligne par jet et par exécution |
| `airports` | code, nom, ville, pays, lat, lon | OurAirports |
| `runs` | date, étape, statut, requêtes, crédits restants, message d'erreur | `update.py` |

## 4. Phases

### Phase 0 : fondations (fait)
- [x] Référentiel de 28 avions (`targets.csv`, `JETS.md`)
- [x] Statut en direct (adsb.lol), historique OpenSky glissant sur 90 jours, dédoublonnage

### Phase 1 : le script unique
- [x] Package `tracker/` : `db.py` (schéma), `opensky.py` (repris de `scripts/opensky_flights.py`),
      `snapshot.py` (repris de `scripts/update_status.py`), `build.py` (génère `site/data.js`)
- [x] `update.py` à la racine : collecte OpenSky → relevé adsb.lol → génération du site, avec un
      journal dans `runs`
- [x] Calculs : durée et distance de chaque vol, heures de vol par jet sur 7, 30 et 90 jours
- [x] Budget OpenSky : les vols de la veille passent en premier, le rattrapage des 90 jours
      utilise le reste du quota
- [x] `JETS.md` reste généré (le statut devient une vue du dernier relevé)

- [x] Stockage : les CSV de `data/` sont la source de vérité (committables, adaptés à
      GitHub Actions) ; `jets.db` est reconstruit à chaque exécution. Voir `docs/DATA_CONTRACT.md`

### Phase 2 : le site statique
- [ ] `site/index.html`, `style.css`, `app.js` : en-tête, carte Leaflet, récapitulatif flotte,
      historique filtrable
- [ ] Thème sombre uniquement, écran d'ordinateur uniquement (pas d'adaptation mobile)
- [ ] **Critère de fin :** `python update.py` puis ouvrir `site/index.html` affiche tout sans serveur

### Phase 3 : fiabilisation (une fois l'historique de 90 jours complet, ~10 jours de quota)
- [ ] Marquer les jets sans aucun vol détecté (inactifs, vendus ou sous adresse PIA) et les remplacer
- [ ] Tests (pytest) : fenêtres, dédoublonnage, durées et distances, génération de `data.js`

### Phase 4 : exécution automatique et hébergement (à décider, voir section 6)

## 5. V2 : 200 jets, rafraîchissement toutes les 10 min

| Sujet | Ce qui change |
|---|---|
| **Trouver 200 jets** | Pipeline d'identification : recherche FAA par propriétaire et co-propriétaire, plane-alert-db, fichier de réservations. Chaque jet reçoit un niveau de confiance et une source |
| **Positions (adsb.lol)** | 1 appel groupé toutes les 10 min pour 200 hex (URL d'environ 1 400 caractères, acceptable). Les relevés successifs donnent des traces grossières des vols |
| **Historique (OpenSky)** | Un appel par avion ne passe plus : 200 × 30 crédits = 6 000 crédits par jour, au-delà du quota de 4 000. Deux solutions : **`/flights/all`** (tous les vols du monde par tranches de 2 h, 12 appels par jour quel que soit le nombre d'avions, filtrés de notre côté ; coût en crédits à mesurer), ou **devenir contributeur** avec un récepteur (8 000 crédits par jour) |
| **Stockage** | Environ 29 000 relevés par jour (200 × 144), soit environ 2,6 millions sur 90 jours. SQLite tient sans problème |
| **Site** | Fiche avion (routes, calendrier, statistiques), fiche société, alertes. Le site reste statique : un `data.js` par avion pour garder la page d'accueil légère |

## 6. Exécution et hébergement (à décider plus tard)

- **V1, 1 fois par jour :** GitHub Pages + GitHub Actions convient très bien. Une tâche
  quotidienne lance `update.py` et publie `site/`, avec les identifiants OpenSky stockés dans
  les secrets du dépôt. La base `jets.db` doit persister d'une exécution à l'autre (cache
  Actions ou commit de la base).
- **Point d'attention sur la confidentialité :** un site GitHub Pages est **public**, même
  depuis un dépôt privé. Seul GitHub Enterprise Cloud permet d'en restreindre l'accès. Pour un
  site réellement privé et statique, l'option gratuite est **Cloudflare Pages + Cloudflare
  Access** (connexion par e-mail). C'est là que Cloudflare redevient utile.
- **V2, toutes les 10 min :**
  - GitHub Actions devient limite : environ 144 exécutions par jour, soit ~4 300 min par mois
    alors que les dépôts privés n'ont que 2 000 min gratuites, et les tâches planifiées sont
    souvent retardées.
  - Il faudra alors une machine allumée en permanence : un Raspberry Pi (qui peut aussi servir
    de récepteur, donc de contributeur OpenSky) ou un VPS à environ 5 € par mois.

## 7. Features

### Prévues après la V1 (par ordre de valeur)
1. **Fiche avion** : routes sur 90 jours, calendrier des jours de vol, top 5 aéroports, statistiques.
2. **Lieux d'intérêt** : « N272BG à Memphis » n'a de sens que si on sait que c'est le site
   Colossus de xAI.
3. **Co-localisation** : deux jets suivis au même aéroport à 48 h d'intervalle.
4. **Nouvelles réservations FAA** (surveillance hebdomadaire de `RESERVED.txt`).
5. **Fiche société** et **page « avions à identifier »** (Tesla, NVIDIA, Apple…).
6. **CO₂ estimé par vol**, **export CSV**, **photos** (planespotters.net, avec crédit du photographe).
7. **Notifications** (Telegram) : utiles seulement en V2, avec la fréquence de 10 min.
8. **Section « Mouvements de jets »** dans le rapport de `News_agent` et registre de paris.

### Retiré ou mis de côté
- **Serveur, API FastAPI, Cloudflare Tunnel** : inutiles pour un site statique.
- **Collecte en continu toutes les 60 s** : remplacée par 1 relevé par jour en V1, puis toutes les 10 min en V2.
- **L'API airplanes.live** : elle fait double emploi avec adsb.lol. À garder comme source de secours.
- **Les traces complètes via `/tracks` d'OpenSky** : 30 crédits par vol et limitées à 30 jours.
  On trace des lignes directes départ → arrivée.
- **La vue « année »** : hors de la fenêtre de 90 jours.

## 8. Risques

| Risque | Parade |
|---|---|
| Quota OpenSky (4 000 crédits par jour) | Vols de la veille en priorité, rattrapage avec le reste ; `/flights/all` ou statut de contributeur en V2 |
| Un seul relevé par jour, donc peu de jets vus en vol | Normal en V1 : l'historique vient d'OpenSky, le relevé n'est qu'une photo de l'instant |
| adsb.lol change ses conditions | Source de secours airplanes.live (accès demandé) |
| Aéroports mal estimés par OpenSky | Afficher l'aéroport tel qu'estimé ; le vérifier avec nos relevés en V2 |
| Fuite des identifiants | Fichier hors du dépôt, secrets GitHub, `.gitignore` |
| Site GitHub Pages public | Cloudflare Pages + Access si la confidentialité est requise (section 6) |
