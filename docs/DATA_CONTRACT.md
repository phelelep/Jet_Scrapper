# Contrat de données

Interface entre la collecte (`tracker/`, `update.py`) et le site statique (`site/`).
Toute modification de ce fichier doit être répercutée des deux côtés.

## 1. Source de vérité : CSV dans `data/` (committés)

`data/jets.db` (SQLite) n'est qu'un **cache jetable** : `update.py` le reconstruit à partir des
CSV au début de chaque exécution, puis réécrit les CSV à la fin. Encodage UTF-8, séparateur
virgule, une ligne d'en-tête, horodatages en **secondes epoch UTC** (entiers). Les lignes
sont triées de façon déterministe (voir chaque fichier) pour garder des diffs git minimaux.

| Fichier | Colonnes | Tri | Qui écrit |
|---|---|---|---|
| `data/targets.csv` | *(inchangé, édité à la main)* `groupe,entite,personne_ou_entreprise,immatriculation,hex,modele,annee,proprietaire_faa,confiance,source` | tel quel | humain |
| `data/flights.csv` | `icao24,first_seen,last_seen,dep,arr,callsign` (`dep`/`arr` vides si inconnus) | `icao24, first_seen` | OpenSky |
| `data/windows.csv` | `icao24,window_start,fetched_at` | `icao24, window_start` | OpenSky |
| `data/snapshots.csv` | `ts,icao24,status,lat,lon,alt_ft,gs_kt,track_deg,callsign` ; `status` ∈ `airborne`, `ground`, `unseen` ; champs numériques vides si inconnus | `ts, icao24` | adsb.lol |
| `data/runs.csv` | `ts,step,status,requests,credits_remaining,message` ; `step` ∈ `opensky`, `snapshot`, `build` ; `status` ∈ `ok`, `partial`, `error`, `skipped` | `ts` | `update.py` |

Rétention : `flights`, `windows` et `snapshots` sont limités aux 90 derniers jours (glissant).
`runs` garde les 500 dernières lignes.

## 2. Sortie : `site/data.js`

Seul fichier du site généré par la collecte. Contenu : une seule instruction
`window.JETS_DATA = { ... };` (JSON valide après le `=`). Horodatages en secondes epoch UTC.

```js
window.JETS_DATA = {
  "generated_at": 1790740000,          // fin de la génération
  "snapshot_at": 1790739990,           // heure du relevé adsb.lol (null si le relevé a échoué)
  "history": {
    "days": 90,
    "start": 1782950400,               // minuit UTC, début de la fenêtre glissante
    "end": 1790640000                  // minuit UTC du jour courant (fin des données OpenSky, J-1 inclus)
  },
  "counts": { "total": 28, "airborne": 3, "ground": 2, "unseen": 23 },

  "aircraft": [                        // un objet par ligne de targets.csv, même ordre
    {
      "hex": "a835af",
      "reg": "N628TS",
      "group": "watchlist",            // "watchlist" | "autres" | "sp500"
      "entity": "SpaceX / Tesla / xAI",
      "person": "Elon Musk",
      "model": "Gulfstream G650ER",
      "year": "2015",                  // chaîne, peut être ""
      "owner": "FALCON LANDING LLC (Hawthorne CA)",
      "confidence": "haute",           // "haute" | "moyenne"
      "source": "FAA + plane-alert-db",

      "status": "airborne",            // "airborne" | "ground" | "unseen" (au moment du relevé)
      "position": {                    // null si status == "unseen" ou position inconnue
        "lat": 52.3, "lon": 4.76,
        "alt_ft": 41000,               // null au sol
        "gs_kt": 470.2,                // peut être null
        "track_deg": 275.0,            // cap, peut être null
        "callsign": "N628TS",          // peut être ""
        "stale_min": 0                 // âge de la position en minutes (lastPosition adsb.lol), 0 si fraîche
      },
      "nearest_airport": {             // null si pas de position
        "code": "EHAM", "name": "Amsterdam Airport Schiphol",
        "city": "Amsterdam", "country": "NL", "dist_km": 3.2
      },

      "last_flight": {                 // dernier vol OpenSky, null si aucun
        "first_seen": 1790632514, "last_seen": 1790635374,
        "dep": "KFTW", "arr": "KVBT"   // codes, peuvent être null
      },
      "stats": {
        "d7":  { "flights": 4,  "hours": 6.5 },
        "d30": { "flights": 12, "hours": 20.1 },
        "d90": { "flights": 30, "hours": 55.0 },
        "top_airport": { "code": "KLAX", "city": "Los Angeles", "count": 14 },  // null si aucun vol
        "coverage_days": 18            // jours de la fenêtre de 90 j déjà récupérés depuis OpenSky
      }
    }
  ],

  "airports": {                        // uniquement les aéroports référencés par "flights"
    "KLAX": { "name": "Los Angeles International Airport", "city": "Los Angeles",
              "country": "US", "lat": 33.94, "lon": -118.41 }
  },

  "flights": [                         // tous les vols des 90 derniers jours, du plus récent au plus ancien
    {
      "hex": "a835af",
      "first_seen": 1790632514,        // décollage (estimé)
      "last_seen": 1790635374,         // atterrissage (estimé)
      "dep": "KLAX",                   // code aéroport ou null ; détails dans "airports"
      "arr": "KSJC",                   // code aéroport ou null
      "callsign": "N628TS",
      "duration_min": 48,
      "distance_km": 490.3             // grand cercle dep→arr, null si un des deux est inconnu
    }
  ]
};
```

Règles :
- `hours` = somme des `duration_min` / 60, arrondie à 0,1.
- Les heures de vol et les comptes `d7`, `d30` et `d90` sont calculés par rapport à `history.end`.
- Le site ne doit jamais planter si un champ nullable est `null` ou si une liste est vide.
