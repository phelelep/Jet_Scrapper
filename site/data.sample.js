// Données FACTICES pour développer le site (conformes à docs/DATA_CONTRACT.md).
// Pour tester : copier ce fichier en data.js dans un dossier de test.
window.JETS_DATA = {
 "generated_at": 1790777153,
 "snapshot_at": 1790777112,
 "history": {
  "days": 90,
  "start": 1782950400,
  "end": 1790726400
 },
 "counts": {
  "total": 28,
  "airborne": 4,
  "ground": 4,
  "unseen": 20
 },
 "aircraft": [
  {
   "hex": "a835af",
   "reg": "N628TS",
   "group": "watchlist",
   "entity": "SpaceX / Tesla / xAI",
   "person": "Elon Musk",
   "model": "Gulfstream G650ER",
   "year": "2015",
   "owner": "FALCON LANDING LLC (Hawthorne CA)",
   "confidence": "haute",
   "source": "FAA + plane-alert-db",
   "status": "airborne",
   "position": {
    "lat": 41.8349,
    "lon": -35.6009,
    "alt_ft": 43000,
    "gs_kt": 488.4,
    "track_deg": 42.3,
    "callsign": "N628TS",
    "stale_min": 0
   },
   "nearest_airport": {
    "code": "EGLF",
    "name": "Farnborough Airport",
    "city": "Farnborough",
    "country": "GB",
    "dist_km": 2829.6
   },
   "last_flight": {
    "first_seen": 1789253716,
    "last_seen": 1789257256,
    "dep": "KBRO",
    "arr": "KAUS"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 4,
     "hours": 7.6
    },
    "d90": {
     "flights": 16,
     "hours": 59.8
    },
    "top_airport": {
     "code": "KAUS",
     "city": "Austin",
     "count": 15
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a2ae0a",
   "reg": "N272BG",
   "group": "watchlist",
   "entity": "SpaceX / Tesla / xAI",
   "person": "Elon Musk",
   "model": "Gulfstream G550",
   "year": "2007",
   "owner": "FALCON LANDING LLC (Hawthorne CA)",
   "confidence": "haute",
   "source": "FAA",
   "status": "ground",
   "position": {
    "lat": 35.0464,
    "lon": -89.9797,
    "alt_ft": null,
    "gs_kt": 0.0,
    "track_deg": null,
    "callsign": "",
    "stale_min": 12
   },
   "nearest_airport": {
    "code": "KMEM",
    "name": "Memphis International Airport",
    "city": "Memphis",
    "country": "US",
    "dist_km": 0.5
   },
   "last_flight": {
    "first_seen": 1789724682,
    "last_seen": 1789727862,
    "dep": "KAUS",
    "arr": "KBRO"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 3,
     "hours": 4.0
    },
    "d90": {
     "flights": 11,
     "hours": 17.4
    },
    "top_airport": {
     "code": "KAUS",
     "city": "Austin",
     "count": 10
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a0046f",
   "reg": "N10XG",
   "group": "watchlist",
   "entity": "Alphabet (Google)",
   "person": "Google (flotte dirigeants)",
   "model": "Gulfstream G550",
   "year": "2008",
   "owner": "BANK OF UTAH TRUSTEE",
   "confidence": "moyenne",
   "source": "plane-alert-db + FAA (trust)",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1788695536,
    "last_seen": 1788714436,
    "dep": "KIAD",
    "arr": "KSJC"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 2,
     "hours": 10.6
    },
    "d90": {
     "flights": 6,
     "hours": 23.2
    },
    "top_airport": {
     "code": "KSJC",
     "city": "San Jose",
     "count": 6
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a21084",
   "reg": "N232G",
   "group": "watchlist",
   "entity": "Alphabet (Google)",
   "person": "Google (flotte dirigeants)",
   "model": "Gulfstream G650ER",
   "year": "2018",
   "owner": "BANK OF UTAH TRUSTEE",
   "confidence": "moyenne",
   "source": "plane-alert-db + FAA (trust)",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1789538799,
    "last_seen": 1789545639,
    "dep": "KSEA",
    "arr": "KSJC"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 4,
     "hours": 10.4
    },
    "d90": {
     "flights": 8,
     "hours": 44.1
    },
    "top_airport": {
     "code": "KSJC",
     "city": "San Jose",
     "count": 7
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a8926a",
   "reg": "N651WE",
   "group": "watchlist",
   "entity": "Alphabet (Google)",
   "person": "Google (flotte dirigeants)",
   "model": "Gulfstream G650ER",
   "year": "2015",
   "owner": "(masque par la FAA)",
   "confidence": "moyenne",
   "source": "plane-alert-db",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": null,
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 0,
     "hours": 0.0
    },
    "d90": {
     "flights": 0,
     "hours": 0.0
    },
    "top_airport": null,
    "coverage_days": 12
   }
  },
  {
   "hex": "a89621",
   "reg": "N652WE",
   "group": "watchlist",
   "entity": "Alphabet (Google)",
   "person": "Eric Schmidt (ex-CEO)",
   "model": "Gulfstream G650ER",
   "year": "2021",
   "owner": "(masque par la FAA)",
   "confidence": "moyenne",
   "source": "plane-alert-db",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1789220406,
    "last_seen": 1789239966,
    "dep": "KSJC",
    "arr": "KTEB"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 1,
     "hours": 5.4
    },
    "d90": {
     "flights": 5,
     "hours": 41.8
    },
    "top_airport": {
     "code": "KSJC",
     "city": "San Jose",
     "count": 5
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a9247d",
   "reg": "N68885",
   "group": "watchlist",
   "entity": "Meta",
   "person": "Mark Zuckerberg",
   "model": "Gulfstream G650ER",
   "year": "2021",
   "owner": "A7P TRUST CO INC TRUSTEE (Cheyenne WY)",
   "confidence": "moyenne",
   "source": "plane-alert-db + FAA (trust)",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1789598443,
    "last_seen": 1789618423,
    "dep": "KSJC",
    "arr": "KTEB"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 5,
     "hours": 27.3
    },
    "d90": {
     "flights": 7,
     "hours": 38.3
    },
    "top_airport": {
     "code": "KSJC",
     "city": "San Jose",
     "count": 7
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a47b5a",
   "reg": "N3880",
   "group": "watchlist",
   "entity": "Meta",
   "person": "Mark Zuckerberg",
   "model": "Gulfstream G700",
   "year": "2024",
   "owner": "A7P TRUST COMPANY INC TRUSTEE (Cheyenne WY)",
   "confidence": "moyenne",
   "source": "plane-alert-db + FAA (trust)",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1786675835,
    "last_seen": 1786682195,
    "dep": "KJAC",
    "arr": "KSJC"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 0,
     "hours": 0.0
    },
    "d90": {
     "flights": 6,
     "hours": 9.0
    },
    "top_airport": {
     "code": "KSJC",
     "city": "San Jose",
     "count": 6
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a97659",
   "reg": "N709DS",
   "group": "watchlist",
   "entity": "Microsoft",
   "person": "Steve Ballmer (ex-CEO)",
   "model": "Gulfstream G800",
   "year": "2025",
   "owner": "CRUISING ALTITUDE LLC (Seattle WA)",
   "confidence": "moyenne",
   "source": "plane-alert-db + FAA",
   "status": "airborne",
   "position": {
    "lat": 43.5339,
    "lon": -121.1584,
    "alt_ft": 39000,
    "gs_kt": 461.7,
    "track_deg": 166.5,
    "callsign": "N709DS",
    "stale_min": 3
   },
   "nearest_airport": {
    "code": "KBOI",
    "name": "Boise Air Terminal",
    "city": "Boise",
    "country": "US",
    "dist_km": 397.7
   },
   "last_flight": {
    "first_seen": 1790691937,
    "last_seen": 1790713357,
    "dep": "KBFI",
    "arr": "PHNL"
   },
   "stats": {
    "d7": {
     "flights": 3,
     "hours": 10.5
    },
    "d30": {
     "flights": 5,
     "hours": 15.1
    },
    "d90": {
     "flights": 9,
     "hours": 22.1
    },
    "top_airport": {
     "code": "KBFI",
     "city": "Seattle",
     "count": 9
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a71db6",
   "reg": "N558FX",
   "group": "watchlist",
   "entity": "AMD",
   "person": "AMD (copropriete Flexjet)",
   "model": "Bombardier Challenger 350",
   "year": "2020",
   "owner": "FLEXJET LLC (AMD co-proprietaire)",
   "confidence": "haute",
   "source": "FAA (fractional)",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1790272498,
    "last_seen": 1790274598,
    "dep": "KAUS",
    "arr": "KDAL"
   },
   "stats": {
    "d7": {
     "flights": 1,
     "hours": 0.6
    },
    "d30": {
     "flights": 1,
     "hours": 0.6
    },
    "d90": {
     "flights": 7,
     "hours": 4.5
    },
    "top_airport": {
     "code": "KAUS",
     "city": "Austin",
     "count": 7
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a8c3a8",
   "reg": "N664FX",
   "group": "watchlist",
   "entity": "AMD",
   "person": "AMD (copropriete Flexjet)",
   "model": "Gulfstream G650ER",
   "year": "2018",
   "owner": "PLM SERVICES LLC / Flexjet (AMD co-proprietaire)",
   "confidence": "haute",
   "source": "FAA (fractional)",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1787748770,
    "last_seen": 1787788910,
    "dep": "EGLF",
    "arr": "KSJC"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 0,
     "hours": 0.0
    },
    "d90": {
     "flights": 4,
     "hours": 44.7
    },
    "top_airport": {
     "code": "KSJC",
     "city": "San Jose",
     "count": 4
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "ac559f",
   "reg": "N894QS",
   "group": "watchlist",
   "entity": "Anduril",
   "person": "Anduril (copropriete NetJets)",
   "model": "Cessna Citation Longitude",
   "year": "2026",
   "owner": "NETJETS SALES INC (Anduril co-proprietaire)",
   "confidence": "haute",
   "source": "FAA (fractional)",
   "status": "airborne",
   "position": {
    "lat": 34.6042,
    "lon": -116.2161,
    "alt_ft": 23500,
    "gs_kt": null,
    "track_deg": null,
    "callsign": "EJA894",
    "stale_min": 0
   },
   "nearest_airport": {
    "code": "KLAS",
    "name": "Harry Reid International Airport",
    "city": "Las Vegas",
    "country": "US",
    "dist_km": 190.4
   },
   "last_flight": {
    "first_seen": 1790272544,
    "last_seen": 1790282744,
    "dep": "KAUS",
    "arr": "KCRQ"
   },
   "stats": {
    "d7": {
     "flights": 2,
     "hours": 5.5
    },
    "d30": {
     "flights": 2,
     "hours": 5.5
    },
    "d90": {
     "flights": 6,
     "hours": 11.8
    },
    "top_airport": {
     "code": "KCRQ",
     "city": "Carlsbad",
     "count": 6
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a5f06e",
   "reg": "N482EC",
   "group": "watchlist",
   "entity": "Constellation Energy",
   "person": "Constellation Energy",
   "model": "Dassault Falcon 2000EX",
   "year": "2020",
   "owner": "CONSTELLATION ENERGY GENERATION LLC",
   "confidence": "haute",
   "source": "FAA",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1786368666,
    "last_seen": 1786379106,
    "dep": "KBWI",
    "arr": "KHOU"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 0,
     "hours": 0.0
    },
    "d90": {
     "flights": 5,
     "hours": 11.8
    },
    "top_airport": {
     "code": "KBWI",
     "city": "Baltimore",
     "count": 5
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a5f7dc",
   "reg": "N484EC",
   "group": "watchlist",
   "entity": "Constellation Energy",
   "person": "Constellation Energy",
   "model": "Dassault Falcon 2000EX",
   "year": "",
   "owner": "CONSTELLATION ENERGY GENERATION LLC",
   "confidence": "haute",
   "source": "FAA",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": null,
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 0,
     "hours": 0.0
    },
    "d90": {
     "flights": 0,
     "hours": 0.0
    },
    "top_airport": null,
    "coverage_days": 18
   }
  },
  {
   "hex": "a2d6c8",
   "reg": "N282QA",
   "group": "watchlist",
   "entity": "Quanta Services",
   "person": "Quanta Services",
   "model": "Gulfstream G280",
   "year": "2014",
   "owner": "QUANTA SERVICES INC",
   "confidence": "haute",
   "source": "FAA",
   "status": "ground",
   "position": {
    "lat": 29.6494,
    "lon": -95.2819,
    "alt_ft": null,
    "gs_kt": 0.0,
    "track_deg": null,
    "callsign": "",
    "stale_min": 12
   },
   "nearest_airport": {
    "code": "KHOU",
    "name": "William P. Hobby Airport",
    "city": "Houston",
    "country": "US",
    "dist_km": 0.5
   },
   "last_flight": {
    "first_seen": 1790203713,
    "last_seen": 1790207193,
    "dep": "KDAL",
    "arr": "KHOU"
   },
   "stats": {
    "d7": {
     "flights": 2,
     "hours": 1.9
    },
    "d30": {
     "flights": 2,
     "hours": 1.9
    },
    "d90": {
     "flights": 6,
     "hours": 5.3
    },
    "top_airport": {
     "code": "KHOU",
     "city": "Houston",
     "count": 5
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a2da7f",
   "reg": "N283QA",
   "group": "watchlist",
   "entity": "Quanta Services",
   "person": "Quanta Services",
   "model": "Gulfstream G280",
   "year": "",
   "owner": "QUANTA SERVICES INC",
   "confidence": "haute",
   "source": "FAA",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1788424587,
    "last_seen": 1788427287,
    "dep": "KHOU",
    "arr": "KAUS"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 1,
     "hours": 0.8
    },
    "d90": {
     "flights": 3,
     "hours": 2.3
    },
    "top_airport": {
     "code": "KHOU",
     "city": "Houston",
     "count": 3
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "ab2404",
   "reg": "N817GS",
   "group": "autres",
   "entity": "Oracle",
   "person": "Larry Ellison",
   "model": "Gulfstream G650",
   "year": "2014",
   "owner": "WING AND A PRAYER INC (Walnut Creek CA)",
   "confidence": "moyenne",
   "source": "plane-alert-db + FAA",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1790233253,
    "last_seen": 1790237693,
    "dep": "KLAS",
    "arr": "KSJC"
   },
   "stats": {
    "d7": {
     "flights": 2,
     "hours": 2.5
    },
    "d30": {
     "flights": 2,
     "hours": 2.5
    },
    "d90": {
     "flights": 6,
     "hours": 24.0
    },
    "top_airport": {
     "code": "KSJC",
     "city": "San Jose",
     "count": 5
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "ac145b",
   "reg": "N878DB",
   "group": "autres",
   "entity": "Palantir / Founders Fund",
   "person": "Peter Thiel",
   "model": "Gulfstream G-V SP",
   "year": "2007",
   "owner": "THORONDOR LLC (Palo Alto CA)",
   "confidence": "moyenne",
   "source": "plane-alert-db + FAA",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1785442965,
    "last_seen": 1785463425,
    "dep": "KSFO",
    "arr": "KTEB"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 0,
     "hours": 0.0
    },
    "d90": {
     "flights": 5,
     "hours": 19.1
    },
    "top_airport": {
     "code": "KSFO",
     "city": "San Francisco",
     "count": 5
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "ac1fdb",
   "reg": "N880WT",
   "group": "autres",
   "entity": "Qualcomm",
   "person": "Qualcomm",
   "model": "Gulfstream G800",
   "year": "2025",
   "owner": "QUALCOMM INC",
   "confidence": "haute",
   "source": "FAA",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1787409408,
    "last_seen": 1787414268,
    "dep": "KSAN",
    "arr": "KSJC"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 0,
     "hours": 0.0
    },
    "d90": {
     "flights": 5,
     "hours": 51.4
    },
    "top_airport": {
     "code": "KSAN",
     "city": "San Diego",
     "count": 5
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "ac2749",
   "reg": "N882WT",
   "group": "autres",
   "entity": "Qualcomm",
   "person": "Qualcomm",
   "model": "Gulfstream G650ER",
   "year": "2022",
   "owner": "QUALCOMM INC",
   "confidence": "haute",
   "source": "FAA",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1787983428,
    "last_seen": 1787993268,
    "dep": "KAUS",
    "arr": "KSAN"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 0,
     "hours": 0.0
    },
    "d90": {
     "flights": 4,
     "hours": 15.3
    },
    "top_airport": {
     "code": "KSAN",
     "city": "San Diego",
     "count": 4
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a91338",
   "reg": "N684MT",
   "group": "autres",
   "entity": "Micron",
   "person": "Micron Technology",
   "model": "Gulfstream G650ER",
   "year": "2016",
   "owner": "MICRON TECHNOLOGY INC",
   "confidence": "haute",
   "source": "FAA",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1786331932,
    "last_seen": 1786342972,
    "dep": "KAUS",
    "arr": "KBOI"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 0,
     "hours": 0.0
    },
    "d90": {
     "flights": 6,
     "hours": 39.4
    },
    "top_airport": {
     "code": "KBOI",
     "city": "Boise",
     "count": 6
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "aa87e4",
   "reg": "N778MT",
   "group": "autres",
   "entity": "Micron",
   "person": "Micron Technology",
   "model": "Gulfstream G280",
   "year": "2018",
   "owner": "MICRON TECHNOLOGY INC",
   "confidence": "haute",
   "source": "FAA",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1790374133,
    "last_seen": 1790378813,
    "dep": "KSEA",
    "arr": "KBOI"
   },
   "stats": {
    "d7": {
     "flights": 3,
     "hours": 3.9
    },
    "d30": {
     "flights": 3,
     "hours": 3.9
    },
    "d90": {
     "flights": 5,
     "hours": 6.7
    },
    "top_airport": {
     "code": "KBOI",
     "city": "Boise",
     "count": 5
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "ab5d36",
   "reg": "N831MT",
   "group": "autres",
   "entity": "Micron",
   "person": "Micron Technology",
   "model": "Gulfstream G280",
   "year": "2021",
   "owner": "MICRON TECHNOLOGY INC",
   "confidence": "haute",
   "source": "FAA",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1783966925,
    "last_seen": 1783971965,
    "dep": "KSFO",
    "arr": "KBOI"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 0,
     "hours": 0.0
    },
    "d90": {
     "flights": 2,
     "hours": 3.0
    },
    "top_airport": {
     "code": "KSFO",
     "city": "San Francisco",
     "count": 2
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a5706f",
   "reg": "N45GX",
   "group": "autres",
   "entity": "Texas Instruments",
   "person": "Texas Instruments",
   "model": "Bombardier Global Express",
   "year": "2011",
   "owner": "TEXAS INSTRUMENTS INC",
   "confidence": "haute",
   "source": "FAA",
   "status": "ground",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1788973767,
    "last_seen": 1789014207,
    "dep": "KDAL",
    "arr": "EDDM"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 1,
     "hours": 11.2
    },
    "d90": {
     "flights": 5,
     "hours": 23.6
    },
    "top_airport": {
     "code": "KDAL",
     "city": "Dallas",
     "count": 5
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a597ee",
   "reg": "N46GX",
   "group": "autres",
   "entity": "Texas Instruments",
   "person": "Texas Instruments",
   "model": "Bombardier Global Express",
   "year": "2011",
   "owner": "TEXAS INSTRUMENTS INC",
   "confidence": "haute",
   "source": "FAA",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1785274961,
    "last_seen": 1785284621,
    "dep": "KDAL",
    "arr": "KSAN"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 0,
     "hours": 0.0
    },
    "d90": {
     "flights": 3,
     "hours": 4.3
    },
    "top_airport": {
     "code": "KDAL",
     "city": "Dallas",
     "count": 2
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a901cd",
   "reg": "N68KP",
   "group": "autres",
   "entity": "Citadel",
   "person": "Ken Griffin",
   "model": "Bombardier Global 6500",
   "year": "2021",
   "owner": "WILMINGTON TRUST CO TRUSTEE",
   "confidence": "moyenne",
   "source": "plane-alert-db + FAA (trust)",
   "status": "airborne",
   "position": {
    "lat": 33.0583,
    "lon": -77.3799,
    "alt_ft": 41000,
    "gs_kt": 452.0,
    "track_deg": 17.9,
    "callsign": "",
    "stale_min": 0
   },
   "nearest_airport": {
    "code": "KIAD",
    "name": "Washington Dulles International Airport",
    "city": "Washington",
    "country": "US",
    "dist_km": 654.6
   },
   "last_flight": {
    "first_seen": 1788873567,
    "last_seen": 1788882567,
    "dep": "KPBI",
    "arr": "KTEB"
   },
   "stats": {
    "d7": {
     "flights": 0,
     "hours": 0.0
    },
    "d30": {
     "flights": 1,
     "hours": 2.5
    },
    "d90": {
     "flights": 9,
     "hours": 35.7
    },
    "top_airport": {
     "code": "KPBI",
     "city": "West Palm Beach",
     "count": 9
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a326ca",
   "reg": "N302AK",
   "group": "autres",
   "entity": "Citadel",
   "person": "Ken Griffin",
   "model": "Bombardier Global 6000",
   "year": "2012",
   "owner": "TVPX AIRCRAFT SOLUTIONS INC TRUSTEE",
   "confidence": "moyenne",
   "source": "plane-alert-db + FAA (trust)",
   "status": "unseen",
   "position": null,
   "nearest_airport": null,
   "last_flight": {
    "first_seen": 1790470079,
    "last_seen": 1790479499,
    "dep": "KORD",
    "arr": "KPBI"
   },
   "stats": {
    "d7": {
     "flights": 2,
     "hours": 5.4
    },
    "d30": {
     "flights": 2,
     "hours": 5.4
    },
    "d90": {
     "flights": 4,
     "hours": 10.2
    },
    "top_airport": {
     "code": "KPBI",
     "city": "West Palm Beach",
     "count": 3
    },
    "coverage_days": 18
   }
  },
  {
   "hex": "a5bf2c",
   "reg": "N47EG",
   "group": "autres",
   "entity": "Bloomberg LP",
   "person": "Michael Bloomberg",
   "model": "Dassault Falcon 900EX",
   "year": "2018",
   "owner": "WING AND ROTOR TRANSPORTATION HOLDINGS LLC",
   "confidence": "moyenne",
   "source": "plane-alert-db + FAA",
   "status": "ground",
   "position": {
    "lat": 48.9734,
    "lon": 2.4384,
    "alt_ft": null,
    "gs_kt": 0.0,
    "track_deg": null,
    "callsign": "",
    "stale_min": 12
   },
   "nearest_airport": {
    "code": "LFPB",
    "name": "Paris-Le Bourget Airport",
    "city": "Paris",
    "country": "FR",
    "dist_km": 0.5
   },
   "last_flight": {
    "first_seen": 1790709161,
    "last_seen": 1790717861,
    "dep": "KTEB",
    "arr": "KPBI"
   },
   "stats": {
    "d7": {
     "flights": 1,
     "hours": 2.4
    },
    "d30": {
     "flights": 3,
     "hours": 18.8
    },
    "d90": {
     "flights": 7,
     "hours": 39.1
    },
    "top_airport": {
     "code": "KTEB",
     "city": "Teterboro",
     "count": 7
    },
    "coverage_days": 18
   }
  }
 ],
 "airports": {
  "EDDM": {
   "name": "Munich Airport",
   "city": "Munich",
   "country": "DE",
   "lat": 48.3538,
   "lon": 11.7861
  },
  "EGGW": {
   "name": "London Luton Airport",
   "city": "Luton",
   "country": "GB",
   "lat": 51.8747,
   "lon": -0.3683
  },
  "EGLF": {
   "name": "Farnborough Airport",
   "city": "Farnborough",
   "country": "GB",
   "lat": 51.2758,
   "lon": -0.7763
  },
  "KAUS": {
   "name": "Austin-Bergstrom International Airport",
   "city": "Austin",
   "country": "US",
   "lat": 30.1945,
   "lon": -97.6699
  },
  "KBFI": {
   "name": "Boeing Field King County International Airport",
   "city": "Seattle",
   "country": "US",
   "lat": 47.53,
   "lon": -122.302
  },
  "KBOI": {
   "name": "Boise Air Terminal",
   "city": "Boise",
   "country": "US",
   "lat": 43.5644,
   "lon": -116.2228
  },
  "KBRO": {
   "name": "Brownsville South Padre Island International Airport",
   "city": "Brownsville",
   "country": "US",
   "lat": 25.9068,
   "lon": -97.4259
  },
  "KBWI": {
   "name": "Baltimore/Washington International Airport",
   "city": "Baltimore",
   "country": "US",
   "lat": 39.1754,
   "lon": -76.6683
  },
  "KCRQ": {
   "name": "McClellan-Palomar Airport",
   "city": "Carlsbad",
   "country": "US",
   "lat": 33.1283,
   "lon": -117.28
  },
  "KDAL": {
   "name": "Dallas Love Field",
   "city": "Dallas",
   "country": "US",
   "lat": 32.8471,
   "lon": -96.8518
  },
  "KFTW": {
   "name": "Fort Worth Meacham International Airport",
   "city": "Fort Worth",
   "country": "US",
   "lat": 32.8198,
   "lon": -97.3624
  },
  "KHOU": {
   "name": "William P. Hobby Airport",
   "city": "Houston",
   "country": "US",
   "lat": 29.6454,
   "lon": -95.2789
  },
  "KIAD": {
   "name": "Washington Dulles International Airport",
   "city": "Washington",
   "country": "US",
   "lat": 38.9445,
   "lon": -77.4558
  },
  "KJAC": {
   "name": "Jackson Hole Airport",
   "city": "Jackson",
   "country": "US",
   "lat": 43.6073,
   "lon": -110.7377
  },
  "KLAS": {
   "name": "Harry Reid International Airport",
   "city": "Las Vegas",
   "country": "US",
   "lat": 36.0801,
   "lon": -115.1522
  },
  "KLAX": {
   "name": "Los Angeles International Airport",
   "city": "Los Angeles",
   "country": "US",
   "lat": 33.9425,
   "lon": -118.4081
  },
  "KMEM": {
   "name": "Memphis International Airport",
   "city": "Memphis",
   "country": "US",
   "lat": 35.0424,
   "lon": -89.9767
  },
  "KMIA": {
   "name": "Miami International Airport",
   "city": "Miami",
   "country": "US",
   "lat": 25.7932,
   "lon": -80.2906
  },
  "KORD": {
   "name": "Chicago O'Hare International Airport",
   "city": "Chicago",
   "country": "US",
   "lat": 41.9786,
   "lon": -87.9048
  },
  "KPBI": {
   "name": "Palm Beach International Airport",
   "city": "West Palm Beach",
   "country": "US",
   "lat": 26.6832,
   "lon": -80.0956
  },
  "KPWK": {
   "name": "Chicago Executive Airport",
   "city": "Wheeling",
   "country": "US",
   "lat": 42.1142,
   "lon": -87.9015
  },
  "KSAN": {
   "name": "San Diego International Airport",
   "city": "San Diego",
   "country": "US",
   "lat": 32.7336,
   "lon": -117.1897
  },
  "KSEA": {
   "name": "Seattle-Tacoma International Airport",
   "city": "Seattle",
   "country": "US",
   "lat": 47.449,
   "lon": -122.3093
  },
  "KSFO": {
   "name": "San Francisco International Airport",
   "city": "San Francisco",
   "country": "US",
   "lat": 37.619,
   "lon": -122.375
  },
  "KSJC": {
   "name": "Norman Y. Mineta San Jose International Airport",
   "city": "San Jose",
   "country": "US",
   "lat": 37.3626,
   "lon": -121.9291
  },
  "KTEB": {
   "name": "Teterboro Airport",
   "city": "Teterboro",
   "country": "US",
   "lat": 40.8501,
   "lon": -74.0608
  },
  "KVNY": {
   "name": "Van Nuys Airport",
   "city": "Van Nuys",
   "country": "US",
   "lat": 34.2098,
   "lon": -118.4899
  },
  "LFMN": {
   "name": "Nice Côte d'Azur Airport",
   "city": "Nice",
   "country": "FR",
   "lat": 43.6584,
   "lon": 7.2159
  },
  "LFPB": {
   "name": "Paris-Le Bourget Airport",
   "city": "Paris",
   "country": "FR",
   "lat": 48.9694,
   "lon": 2.4414
  },
  "LIRA": {
   "name": "Rome Ciampino Airport",
   "city": "Rome",
   "country": "IT",
   "lat": 41.7994,
   "lon": 12.5949
  },
  "LSGG": {
   "name": "Geneva Cointrin International Airport",
   "city": "Genève",
   "country": "CH",
   "lat": 46.2381,
   "lon": 6.109
  },
  "PHKO": {
   "name": "Ellison Onizuka Kona International Airport",
   "city": "Kailua-Kona",
   "country": "US",
   "lat": 19.7388,
   "lon": -156.0456
  },
  "PHNL": {
   "name": "Daniel K. Inouye International Airport",
   "city": "Honolulu",
   "country": "US",
   "lat": 21.3187,
   "lon": -157.9225
  }
 },
 "flights": [
  {
   "hex": "a5bf2c",
   "first_seen": 1790709161,
   "last_seen": 1790717861,
   "dep": "KTEB",
   "arr": "KPBI",
   "callsign": "N47EG",
   "duration_min": 145,
   "distance_km": 1670.0
  },
  {
   "hex": "a97659",
   "first_seen": 1790691937,
   "last_seen": 1790713357,
   "dep": "KBFI",
   "arr": "PHNL",
   "callsign": "N709DS",
   "duration_min": 357,
   "distance_km": 4312.9
  },
  {
   "hex": "a97659",
   "first_seen": 1790688341,
   "last_seen": 1790696201,
   "dep": "KVNY",
   "arr": "KBFI",
   "callsign": "N709DS",
   "duration_min": 131,
   "distance_km": 1514.9
  },
  {
   "hex": "a97659",
   "first_seen": 1790658881,
   "last_seen": 1790667521,
   "dep": "KBFI",
   "arr": "KVNY",
   "callsign": "N709DS",
   "duration_min": 144,
   "distance_km": 1514.9
  },
  {
   "hex": "a326ca",
   "first_seen": 1790470079,
   "last_seen": 1790479499,
   "dep": "KORD",
   "arr": "KPBI",
   "callsign": "N302AK",
   "duration_min": 157,
   "distance_km": 1843.7
  },
  {
   "hex": "aa87e4",
   "first_seen": 1790374133,
   "last_seen": 1790378813,
   "dep": "KSEA",
   "arr": "KBOI",
   "callsign": "N778MT",
   "duration_min": 78,
   "distance_km": 641.2
  },
  {
   "hex": "a326ca",
   "first_seen": 1790370659,
   "last_seen": 1790380559,
   "dep": "KPBI",
   "arr": "KORD",
   "callsign": "N302AK",
   "duration_min": 165,
   "distance_km": 1843.7
  },
  {
   "hex": "aa87e4",
   "first_seen": 1790343224,
   "last_seen": 1790348024,
   "dep": "KBOI",
   "arr": "KSJC",
   "callsign": "N778MT",
   "duration_min": 80,
   "distance_km": 841.3
  },
  {
   "hex": "aa87e4",
   "first_seen": 1790329853,
   "last_seen": 1790334473,
   "dep": "KBOI",
   "arr": "KSEA",
   "callsign": "N778MT",
   "duration_min": 77,
   "distance_km": 641.2
  },
  {
   "hex": "ac559f",
   "first_seen": 1790272544,
   "last_seen": 1790282744,
   "dep": "KAUS",
   "arr": "KCRQ",
   "callsign": "EJA894",
   "duration_min": 170,
   "distance_km": 1881.5
  },
  {
   "hex": "a71db6",
   "first_seen": 1790272498,
   "last_seen": 1790274598,
   "dep": "KAUS",
   "arr": "KDAL",
   "callsign": "LXJ558",
   "duration_min": 35,
   "distance_km": 305.0
  },
  {
   "hex": "ab2404",
   "first_seen": 1790233253,
   "last_seen": 1790237693,
   "dep": "KLAS",
   "arr": "KSJC",
   "callsign": "N817GS",
   "duration_min": 74,
   "distance_km": 620.5
  },
  {
   "hex": "ab2404",
   "first_seen": 1790207213,
   "last_seen": 1790211773,
   "dep": "KSJC",
   "arr": "KLAS",
   "callsign": "N817GS",
   "duration_min": 76,
   "distance_km": 620.5
  },
  {
   "hex": "a2d6c8",
   "first_seen": 1790203713,
   "last_seen": 1790207193,
   "dep": "KDAL",
   "arr": "KHOU",
   "callsign": "N282QA",
   "duration_min": 58,
   "distance_km": 386.1
  },
  {
   "hex": "a2d6c8",
   "first_seen": 1790182233,
   "last_seen": 1790185533,
   "dep": "KHOU",
   "arr": "KDAL",
   "callsign": "N282QA",
   "duration_min": 55,
   "distance_km": 386.1
  },
  {
   "hex": "ac559f",
   "first_seen": 1790165144,
   "last_seen": 1790174864,
   "dep": "KCRQ",
   "arr": "KAUS",
   "callsign": "EJA894",
   "duration_min": 162,
   "distance_km": 1881.5
  },
  {
   "hex": "a2ae0a",
   "first_seen": 1789724682,
   "last_seen": 1789727862,
   "dep": "KAUS",
   "arr": "KBRO",
   "callsign": "N272BG",
   "duration_min": 53,
   "distance_km": 477.4
  },
  {
   "hex": "a9247d",
   "first_seen": 1789598443,
   "last_seen": 1789618423,
   "dep": "KSJC",
   "arr": "KTEB",
   "callsign": "N68885",
   "duration_min": 333,
   "distance_km": 4097.1
  },
  {
   "hex": "a97659",
   "first_seen": 1789594912,
   "last_seen": 1789603432,
   "dep": "KVNY",
   "arr": "KBFI",
   "callsign": "N709DS",
   "duration_min": 142,
   "distance_km": 1514.9
  },
  {
   "hex": "a5bf2c",
   "first_seen": 1789578933,
   "last_seen": 1789608333,
   "dep": "LSGG",
   "arr": "KTEB",
   "callsign": "N47EG",
   "duration_min": 490,
   "distance_km": 6207.5
  },
  {
   "hex": "a21084",
   "first_seen": 1789538799,
   "last_seen": 1789545639,
   "dep": "KSEA",
   "arr": "KSJC",
   "callsign": "N232G",
   "duration_min": 114,
   "distance_km": 1122.0
  },
  {
   "hex": "a5bf2c",
   "first_seen": 1789517133,
   "last_seen": 1789546773,
   "dep": "KTEB",
   "arr": "LSGG",
   "callsign": "N47EG",
   "duration_min": 494,
   "distance_km": 6207.5
  },
  {
   "hex": "a97659",
   "first_seen": 1789485592,
   "last_seen": 1789493332,
   "dep": "KBFI",
   "arr": "KVNY",
   "callsign": "N709DS",
   "duration_min": 129,
   "distance_km": 1514.9
  },
  {
   "hex": "a21084",
   "first_seen": 1789463559,
   "last_seen": 1789469619,
   "dep": "KSJC",
   "arr": "KSEA",
   "callsign": "N232G",
   "duration_min": 101,
   "distance_km": 1122.0
  },
  {
   "hex": "a21084",
   "first_seen": 1789433041,
   "last_seen": 1789445401,
   "dep": "KAUS",
   "arr": null,
   "callsign": "N232G",
   "duration_min": 206,
   "distance_km": null
  },
  {
   "hex": "a21084",
   "first_seen": 1789399081,
   "last_seen": 1789411321,
   "dep": "KSJC",
   "arr": "KAUS",
   "callsign": "N232G",
   "duration_min": 204,
   "distance_km": 2371.4
  },
  {
   "hex": "a835af",
   "first_seen": 1789253716,
   "last_seen": 1789257256,
   "dep": "KBRO",
   "arr": "KAUS",
   "callsign": "N628TS",
   "duration_min": 59,
   "distance_km": 477.4
  },
  {
   "hex": "a89621",
   "first_seen": 1789220406,
   "last_seen": 1789239966,
   "dep": "KSJC",
   "arr": "KTEB",
   "callsign": "N652WE",
   "duration_min": 326,
   "distance_km": 4097.1
  },
  {
   "hex": "a835af",
   "first_seen": 1789174576,
   "last_seen": 1789178116,
   "dep": "KAUS",
   "arr": "KBRO",
   "callsign": "N628TS",
   "duration_min": 59,
   "distance_km": 477.4
  },
  {
   "hex": "a2ae0a",
   "first_seen": 1789160273,
   "last_seen": 1789165913,
   "dep": "KMEM",
   "arr": "KAUS",
   "callsign": "N272BG",
   "duration_min": 94,
   "distance_km": 899.3
  },
  {
   "hex": "a2ae0a",
   "first_seen": 1789075433,
   "last_seen": 1789080953,
   "dep": null,
   "arr": "KMEM",
   "callsign": "N272BG",
   "duration_min": 92,
   "distance_km": null
  },
  {
   "hex": "a5706f",
   "first_seen": 1788973767,
   "last_seen": 1789014207,
   "dep": "KDAL",
   "arr": "EDDM",
   "callsign": "N45GX",
   "duration_min": 674,
   "distance_km": 8549.3
  },
  {
   "hex": "a901cd",
   "first_seen": 1788873567,
   "last_seen": 1788882567,
   "dep": "KPBI",
   "arr": "KTEB",
   "callsign": "N68KP",
   "duration_min": 150,
   "distance_km": 1670.0
  },
  {
   "hex": "a9247d",
   "first_seen": 1788775090,
   "last_seen": 1788794290,
   "dep": "PHKO",
   "arr": "KSJC",
   "callsign": "N68885",
   "duration_min": 320,
   "distance_km": 3834.1
  },
  {
   "hex": "a0046f",
   "first_seen": 1788695536,
   "last_seen": 1788714436,
   "dep": "KIAD",
   "arr": "KSJC",
   "callsign": "N10XG",
   "duration_min": 315,
   "distance_km": 3853.8
  },
  {
   "hex": "a9247d",
   "first_seen": 1788662290,
   "last_seen": 1788680650,
   "dep": "KSJC",
   "arr": "PHKO",
   "callsign": "N68885",
   "duration_min": 306,
   "distance_km": 3834.1
  },
  {
   "hex": "a0046f",
   "first_seen": 1788575836,
   "last_seen": 1788595156,
   "dep": "KSJC",
   "arr": "KIAD",
   "callsign": "N10XG",
   "duration_min": 322,
   "distance_km": 3853.8
  },
  {
   "hex": "a2da7f",
   "first_seen": 1788424587,
   "last_seen": 1788427287,
   "dep": "KHOU",
   "arr": "KAUS",
   "callsign": "N283QA",
   "duration_min": 45,
   "distance_km": 238.4
  },
  {
   "hex": "a835af",
   "first_seen": 1788378200,
   "last_seen": 1788388100,
   "dep": "KLAX",
   "arr": "KAUS",
   "callsign": "N628TS",
   "duration_min": 165,
   "distance_km": 1994.4
  },
  {
   "hex": "a9247d",
   "first_seen": 1788342198,
   "last_seen": 1788362598,
   "dep": "KTEB",
   "arr": "KSJC",
   "callsign": "N68885",
   "duration_min": 340,
   "distance_km": 4097.1
  },
  {
   "hex": "a835af",
   "first_seen": 1788317900,
   "last_seen": 1788328280,
   "dep": null,
   "arr": "KLAX",
   "callsign": "N628TS",
   "duration_min": 173,
   "distance_km": null
  },
  {
   "hex": "a9247d",
   "first_seen": 1788217398,
   "last_seen": 1788237738,
   "dep": "KSJC",
   "arr": "KTEB",
   "callsign": "N68885",
   "duration_min": 339,
   "distance_km": 4097.1
  },
  {
   "hex": "a71db6",
   "first_seen": 1788059098,
   "last_seen": 1788061318,
   "dep": "KHOU",
   "arr": "KAUS",
   "callsign": "LXJ558",
   "duration_min": 37,
   "distance_km": 238.4
  },
  {
   "hex": "a5706f",
   "first_seen": 1788052940,
   "last_seen": 1788063800,
   "dep": "KTEB",
   "arr": "KDAL",
   "callsign": "N45GX",
   "duration_min": 181,
   "distance_km": 2206.1
  },
  {
   "hex": "a71db6",
   "first_seen": 1788042478,
   "last_seen": 1788044458,
   "dep": "KAUS",
   "arr": "KHOU",
   "callsign": "LXJ558",
   "duration_min": 33,
   "distance_km": 238.4
  },
  {
   "hex": "a5706f",
   "first_seen": 1788027680,
   "last_seen": 1788038960,
   "dep": "KDAL",
   "arr": "KTEB",
   "callsign": "N45GX",
   "duration_min": 188,
   "distance_km": 2206.1
  },
  {
   "hex": "ac2749",
   "first_seen": 1787983428,
   "last_seen": 1787993268,
   "dep": "KAUS",
   "arr": "KSAN",
   "callsign": "N882WT",
   "duration_min": 164,
   "distance_km": 1870.0
  },
  {
   "hex": "a89621",
   "first_seen": 1787970962,
   "last_seen": 1787990462,
   "dep": "KTEB",
   "arr": "KSJC",
   "callsign": "N652WE",
   "duration_min": 325,
   "distance_km": 4097.1
  },
  {
   "hex": "ac2749",
   "first_seen": 1787941188,
   "last_seen": 1787950908,
   "dep": "KSAN",
   "arr": "KAUS",
   "callsign": "N882WT",
   "duration_min": 162,
   "distance_km": 1870.0
  },
  {
   "hex": "ac2749",
   "first_seen": 1787900625,
   "last_seen": 1787918925,
   "dep": "KIAD",
   "arr": "KSAN",
   "callsign": "N882WT",
   "duration_min": 305,
   "distance_km": 3618.3
  },
  {
   "hex": "a89621",
   "first_seen": 1787857862,
   "last_seen": 1787878202,
   "dep": "KSJC",
   "arr": "KTEB",
   "callsign": "N652WE",
   "duration_min": 339,
   "distance_km": 4097.1
  },
  {
   "hex": "ac2749",
   "first_seen": 1787810325,
   "last_seen": 1787827665,
   "dep": "KSAN",
   "arr": "KIAD",
   "callsign": "N882WT",
   "duration_min": 289,
   "distance_km": 3618.3
  },
  {
   "hex": "a326ca",
   "first_seen": 1787756483,
   "last_seen": 1787765123,
   "dep": "KTEB",
   "arr": "KPBI",
   "callsign": "N302AK",
   "duration_min": 144,
   "distance_km": 1670.0
  },
  {
   "hex": "a901cd",
   "first_seen": 1787750787,
   "last_seen": 1787759547,
   "dep": "KTEB",
   "arr": "KPBI",
   "callsign": "N68KP",
   "duration_min": 146,
   "distance_km": 1670.0
  },
  {
   "hex": "a8c3a8",
   "first_seen": 1787748770,
   "last_seen": 1787788910,
   "dep": "EGLF",
   "arr": "KSJC",
   "callsign": "LXJ664",
   "duration_min": 669,
   "distance_km": 8619.0
  },
  {
   "hex": "a901cd",
   "first_seen": 1787661870,
   "last_seen": 1787695110,
   "dep": "EGGW",
   "arr": "KPBI",
   "callsign": "N68KP",
   "duration_min": 554,
   "distance_km": 7022.1
  },
  {
   "hex": "a901cd",
   "first_seen": 1787659227,
   "last_seen": 1787668227,
   "dep": "KPBI",
   "arr": "KTEB",
   "callsign": "N68KP",
   "duration_min": 150,
   "distance_km": 1670.0
  },
  {
   "hex": "a326ca",
   "first_seen": 1787650643,
   "last_seen": 1787659223,
   "dep": null,
   "arr": null,
   "callsign": "N302AK",
   "duration_min": 143,
   "distance_km": null
  },
  {
   "hex": "a8c3a8",
   "first_seen": 1787600630,
   "last_seen": 1787640710,
   "dep": "KSJC",
   "arr": "EGLF",
   "callsign": "LXJ664",
   "duration_min": 668,
   "distance_km": 8619.0
  },
  {
   "hex": "a901cd",
   "first_seen": 1787581830,
   "last_seen": 1787614770,
   "dep": "KPBI",
   "arr": "EGGW",
   "callsign": "N68KP",
   "duration_min": 549,
   "distance_km": 7022.1
  },
  {
   "hex": "a2ae0a",
   "first_seen": 1787559907,
   "last_seen": 1787563207,
   "dep": "KBRO",
   "arr": "KAUS",
   "callsign": "N272BG",
   "duration_min": 55,
   "distance_km": 477.4
  },
  {
   "hex": "a97659",
   "first_seen": 1787517229,
   "last_seen": 1787523529,
   "dep": "KSJC",
   "arr": "KBFI",
   "callsign": "N709DS",
   "duration_min": 105,
   "distance_km": 1131.0
  },
  {
   "hex": "a2ae0a",
   "first_seen": 1787452207,
   "last_seen": 1787455207,
   "dep": "KAUS",
   "arr": "KBRO",
   "callsign": "N272BG",
   "duration_min": 50,
   "distance_km": 477.4
  },
  {
   "hex": "a71db6",
   "first_seen": 1787440808,
   "last_seen": 1787443568,
   "dep": "KDAL",
   "arr": "KAUS",
   "callsign": "LXJ558",
   "duration_min": 46,
   "distance_km": 305.0
  },
  {
   "hex": "ac1fdb",
   "first_seen": 1787409408,
   "last_seen": 1787414268,
   "dep": "KSAN",
   "arr": "KSJC",
   "callsign": "N880WT",
   "duration_min": 81,
   "distance_km": 671.4
  },
  {
   "hex": "a97659",
   "first_seen": 1787402929,
   "last_seen": 1787409229,
   "dep": "KBFI",
   "arr": "KSJC",
   "callsign": "N709DS",
   "duration_min": 105,
   "distance_km": 1131.0
  },
  {
   "hex": "a71db6",
   "first_seen": 1787380448,
   "last_seen": 1787383268,
   "dep": "KAUS",
   "arr": "KDAL",
   "callsign": "LXJ558",
   "duration_min": 47,
   "distance_km": 305.0
  },
  {
   "hex": "a2ae0a",
   "first_seen": 1786906755,
   "last_seen": 1786911975,
   "dep": "KMEM",
   "arr": "KAUS",
   "callsign": "N272BG",
   "duration_min": 87,
   "distance_km": 899.3
  },
  {
   "hex": "a2ae0a",
   "first_seen": 1786807935,
   "last_seen": 1786812795,
   "dep": "KAUS",
   "arr": "KMEM",
   "callsign": "N272BG",
   "duration_min": 81,
   "distance_km": 899.3
  },
  {
   "hex": "a901cd",
   "first_seen": 1786691344,
   "last_seen": 1786700704,
   "dep": "KTEB",
   "arr": "KPBI",
   "callsign": "N68KP",
   "duration_min": 156,
   "distance_km": 1670.0
  },
  {
   "hex": "a47b5a",
   "first_seen": 1786675835,
   "last_seen": 1786682195,
   "dep": "KJAC",
   "arr": "KSJC",
   "callsign": "N3880",
   "duration_min": 106,
   "distance_km": 1172.2
  },
  {
   "hex": "a901cd",
   "first_seen": 1786660384,
   "last_seen": 1786669384,
   "dep": "KPBI",
   "arr": "KTEB",
   "callsign": "N68KP",
   "duration_min": 150,
   "distance_km": 1670.0
  },
  {
   "hex": "a901cd",
   "first_seen": 1786618677,
   "last_seen": 1786627257,
   "dep": "KTEB",
   "arr": "KPBI",
   "callsign": "N68KP",
   "duration_min": 143,
   "distance_km": 1670.0
  },
  {
   "hex": "a47b5a",
   "first_seen": 1786601075,
   "last_seen": 1786607375,
   "dep": "KSJC",
   "arr": "KJAC",
   "callsign": "N3880",
   "duration_min": 105,
   "distance_km": 1172.2
  },
  {
   "hex": "a901cd",
   "first_seen": 1786541697,
   "last_seen": 1786550217,
   "dep": "KPBI",
   "arr": "KTEB",
   "callsign": "N68KP",
   "duration_min": 142,
   "distance_km": 1670.0
  },
  {
   "hex": "a5bf2c",
   "first_seen": 1786517200,
   "last_seen": 1786525900,
   "dep": "KPBI",
   "arr": "KTEB",
   "callsign": "N47EG",
   "duration_min": 145,
   "distance_km": 1670.0
  },
  {
   "hex": "ab2404",
   "first_seen": 1786424669,
   "last_seen": 1786444769,
   "dep": "KPBI",
   "arr": "KSJC",
   "callsign": "N817GS",
   "duration_min": 335,
   "distance_km": 4082.2
  },
  {
   "hex": "a5bf2c",
   "first_seen": 1786407700,
   "last_seen": 1786416940,
   "dep": "KTEB",
   "arr": "KPBI",
   "callsign": "N47EG",
   "duration_min": 154,
   "distance_km": 1670.0
  },
  {
   "hex": "a5f06e",
   "first_seen": 1786368666,
   "last_seen": 1786379106,
   "dep": "KBWI",
   "arr": "KHOU",
   "callsign": "N482EC",
   "duration_min": 174,
   "distance_km": 2003.3
  },
  {
   "hex": "a91338",
   "first_seen": 1786331932,
   "last_seen": 1786342972,
   "dep": "KAUS",
   "arr": "KBOI",
   "callsign": "N684MT",
   "duration_min": 184,
   "distance_km": 2211.6
  },
  {
   "hex": "ab2404",
   "first_seen": 1786318169,
   "last_seen": 1786338329,
   "dep": null,
   "arr": null,
   "callsign": "N817GS",
   "duration_min": 336,
   "distance_km": null
  },
  {
   "hex": "a91338",
   "first_seen": 1786274092,
   "last_seen": 1786285852,
   "dep": "KBOI",
   "arr": "KAUS",
   "callsign": "N684MT",
   "duration_min": 196,
   "distance_km": 2211.6
  },
  {
   "hex": "a0046f",
   "first_seen": 1785989006,
   "last_seen": 1785993386,
   "dep": "KLAS",
   "arr": "KSJC",
   "callsign": "N10XG",
   "duration_min": 73,
   "distance_km": 620.5
  },
  {
   "hex": "a0046f",
   "first_seen": 1785934226,
   "last_seen": 1785938186,
   "dep": "KSJC",
   "arr": "KLAS",
   "callsign": "N10XG",
   "duration_min": 66,
   "distance_km": 620.5
  },
  {
   "hex": "ac559f",
   "first_seen": 1785825375,
   "last_seen": 1785834915,
   "dep": null,
   "arr": "KCRQ",
   "callsign": "EJA894",
   "duration_min": 159,
   "distance_km": null
  },
  {
   "hex": "a5bf2c",
   "first_seen": 1785818453,
   "last_seen": 1785845933,
   "dep": "LFPB",
   "arr": "KTEB",
   "callsign": "N47EG",
   "duration_min": 458,
   "distance_km": 5833.3
  },
  {
   "hex": "a5bf2c",
   "first_seen": 1785740573,
   "last_seen": 1785768353,
   "dep": "KTEB",
   "arr": "LFPB",
   "callsign": "N47EG",
   "duration_min": 463,
   "distance_km": 5833.3
  },
  {
   "hex": "ac559f",
   "first_seen": 1785725835,
   "last_seen": 1785735495,
   "dep": "KCRQ",
   "arr": "KAUS",
   "callsign": "EJA894",
   "duration_min": 161,
   "distance_km": 1881.5
  },
  {
   "hex": "a47b5a",
   "first_seen": 1785523457,
   "last_seen": 1785530057,
   "dep": "KJAC",
   "arr": "KSJC",
   "callsign": "N3880",
   "duration_min": 110,
   "distance_km": 1172.2
  },
  {
   "hex": "ac145b",
   "first_seen": 1785442965,
   "last_seen": 1785463425,
   "dep": "KSFO",
   "arr": "KTEB",
   "callsign": "N878DB",
   "duration_min": 341,
   "distance_km": 4123.9
  },
  {
   "hex": "a47b5a",
   "first_seen": 1785416057,
   "last_seen": 1785423077,
   "dep": "KSJC",
   "arr": "KJAC",
   "callsign": "N3880",
   "duration_min": 117,
   "distance_km": 1172.2
  },
  {
   "hex": "a91338",
   "first_seen": 1785293496,
   "last_seen": 1785336456,
   "dep": "LIRA",
   "arr": "KBOI",
   "callsign": "N684MT",
   "duration_min": 716,
   "distance_km": 9236.4
  },
  {
   "hex": "a835af",
   "first_seen": 1785292973,
   "last_seen": 1785303233,
   "dep": "KLAX",
   "arr": "KAUS",
   "callsign": "N628TS",
   "duration_min": 171,
   "distance_km": 1994.4
  },
  {
   "hex": "a597ee",
   "first_seen": 1785274961,
   "last_seen": 1785284621,
   "dep": "KDAL",
   "arr": "KSAN",
   "callsign": "N46GX",
   "duration_min": 161,
   "distance_km": 1898.2
  },
  {
   "hex": "a2ae0a",
   "first_seen": 1785269501,
   "last_seen": 1785279641,
   "dep": "KLAX",
   "arr": "KAUS",
   "callsign": "N272BG",
   "duration_min": 169,
   "distance_km": 1994.4
  },
  {
   "hex": "a71db6",
   "first_seen": 1785266016,
   "last_seen": 1785268176,
   "dep": "KHOU",
   "arr": "KAUS",
   "callsign": "LXJ558",
   "duration_min": 36,
   "distance_km": 238.4
  },
  {
   "hex": "a835af",
   "first_seen": 1785261113,
   "last_seen": 1785271673,
   "dep": "KAUS",
   "arr": "KLAX",
   "callsign": "N628TS",
   "duration_min": 176,
   "distance_km": 1994.4
  },
  {
   "hex": "a89621",
   "first_seen": 1785235796,
   "last_seen": 1785281156,
   "dep": "LFMN",
   "arr": "KSJC",
   "callsign": "N652WE",
   "duration_min": 756,
   "distance_km": 9650.9
  },
  {
   "hex": "a91338",
   "first_seen": 1785182136,
   "last_seen": 1785226056,
   "dep": "KBOI",
   "arr": "LIRA",
   "callsign": "N684MT",
   "duration_min": 732,
   "distance_km": 9236.4
  },
  {
   "hex": "a71db6",
   "first_seen": 1785177456,
   "last_seen": 1785179616,
   "dep": "KAUS",
   "arr": "KHOU",
   "callsign": "LXJ558",
   "duration_min": 36,
   "distance_km": 238.4
  },
  {
   "hex": "a2ae0a",
   "first_seen": 1785172961,
   "last_seen": 1785183401,
   "dep": "KAUS",
   "arr": null,
   "callsign": "N272BG",
   "duration_min": 174,
   "distance_km": null
  },
  {
   "hex": "a89621",
   "first_seen": 1785158036,
   "last_seen": 1785203816,
   "dep": "KSJC",
   "arr": "LFMN",
   "callsign": "N652WE",
   "duration_min": 763,
   "distance_km": 9650.9
  },
  {
   "hex": "a835af",
   "first_seen": 1785113721,
   "last_seen": 1785125541,
   "dep": "KTEB",
   "arr": "KAUS",
   "callsign": "N628TS",
   "duration_min": 197,
   "distance_km": 2431.8
  },
  {
   "hex": "a2d6c8",
   "first_seen": 1785075700,
   "last_seen": 1785079120,
   "dep": "KFTW",
   "arr": null,
   "callsign": "N282QA",
   "duration_min": 57,
   "distance_km": null
  },
  {
   "hex": "a2d6c8",
   "first_seen": 1785039880,
   "last_seen": 1785042760,
   "dep": "KHOU",
   "arr": "KFTW",
   "callsign": "N282QA",
   "duration_min": 48,
   "distance_km": 404.7
  },
  {
   "hex": "a8c3a8",
   "first_seen": 1785010882,
   "last_seen": 1785051022,
   "dep": "EGLF",
   "arr": "KSJC",
   "callsign": "LXJ664",
   "duration_min": 669,
   "distance_km": 8619.0
  },
  {
   "hex": "a835af",
   "first_seen": 1785008301,
   "last_seen": 1785020601,
   "dep": "KAUS",
   "arr": "KTEB",
   "callsign": "N628TS",
   "duration_min": 205,
   "distance_km": 2431.8
  },
  {
   "hex": "a21084",
   "first_seen": 1784944634,
   "last_seen": 1784985074,
   "dep": "EGGW",
   "arr": "KSJC",
   "callsign": "N232G",
   "duration_min": 674,
   "distance_km": 8590.7
  },
  {
   "hex": "a835af",
   "first_seen": 1784894227,
   "last_seen": 1784904427,
   "dep": "KLAX",
   "arr": "KAUS",
   "callsign": "N628TS",
   "duration_min": 170,
   "distance_km": 1994.4
  },
  {
   "hex": "a8c3a8",
   "first_seen": 1784884342,
   "last_seen": 1784924782,
   "dep": "KSJC",
   "arr": "EGLF",
   "callsign": "LXJ664",
   "duration_min": 674,
   "distance_km": 8619.0
  },
  {
   "hex": "a21084",
   "first_seen": 1784875394,
   "last_seen": 1784916314,
   "dep": "KSJC",
   "arr": "EGGW",
   "callsign": "N232G",
   "duration_min": 682,
   "distance_km": 8590.7
  },
  {
   "hex": "ac145b",
   "first_seen": 1784855447,
   "last_seen": 1784858687,
   "dep": "KLAX",
   "arr": "KSFO",
   "callsign": "N878DB",
   "duration_min": 54,
   "distance_km": 543.2
  },
  {
   "hex": "a835af",
   "first_seen": 1784826427,
   "last_seen": 1784837227,
   "dep": "KAUS",
   "arr": "KLAX",
   "callsign": "N628TS",
   "duration_min": 180,
   "distance_km": 1994.4
  },
  {
   "hex": "ab2404",
   "first_seen": 1784815862,
   "last_seen": 1784834282,
   "dep": "PHNL",
   "arr": "KSJC",
   "callsign": "N817GS",
   "duration_min": 307,
   "distance_km": 3885.8
  },
  {
   "hex": "a0046f",
   "first_seen": 1784798472,
   "last_seen": 1784817072,
   "dep": "KIAD",
   "arr": "KSJC",
   "callsign": "N10XG",
   "duration_min": 310,
   "distance_km": 3853.8
  },
  {
   "hex": "a5706f",
   "first_seen": 1784796969,
   "last_seen": 1784808249,
   "dep": "KTEB",
   "arr": "KDAL",
   "callsign": "N45GX",
   "duration_min": 188,
   "distance_km": 2206.1
  },
  {
   "hex": "ac145b",
   "first_seen": 1784780207,
   "last_seen": 1784783987,
   "dep": "KSFO",
   "arr": "KLAX",
   "callsign": "N878DB",
   "duration_min": 63,
   "distance_km": 543.2
  },
  {
   "hex": "ab2404",
   "first_seen": 1784747042,
   "last_seen": 1784765762,
   "dep": "KSJC",
   "arr": "PHNL",
   "callsign": "N817GS",
   "duration_min": 312,
   "distance_km": 3885.8
  },
  {
   "hex": "a5706f",
   "first_seen": 1784720889,
   "last_seen": 1784732049,
   "dep": "KDAL",
   "arr": "KTEB",
   "callsign": "N45GX",
   "duration_min": 186,
   "distance_km": 2206.1
  },
  {
   "hex": "a0046f",
   "first_seen": 1784711472,
   "last_seen": 1784729892,
   "dep": "KSJC",
   "arr": "KIAD",
   "callsign": "N10XG",
   "duration_min": 307,
   "distance_km": 3853.8
  },
  {
   "hex": "ac145b",
   "first_seen": 1784578418,
   "last_seen": 1784599058,
   "dep": "KMIA",
   "arr": "KSFO",
   "callsign": "N878DB",
   "duration_min": 344,
   "distance_km": 4153.7
  },
  {
   "hex": "a5f06e",
   "first_seen": 1784572094,
   "last_seen": 1784582114,
   "dep": "KHOU",
   "arr": "KBWI",
   "callsign": "N482EC",
   "duration_min": 167,
   "distance_km": 2003.3
  },
  {
   "hex": "a5f06e",
   "first_seen": 1784551274,
   "last_seen": 1784561174,
   "dep": "KBWI",
   "arr": "KHOU",
   "callsign": "N482EC",
   "duration_min": 165,
   "distance_km": 2003.3
  },
  {
   "hex": "ac145b",
   "first_seen": 1784546978,
   "last_seen": 1784567678,
   "dep": "KSFO",
   "arr": "KMIA",
   "callsign": "N878DB",
   "duration_min": 345,
   "distance_km": 4153.7
  },
  {
   "hex": "a9247d",
   "first_seen": 1784391726,
   "last_seen": 1784411826,
   "dep": "KTEB",
   "arr": "KSJC",
   "callsign": "N68885",
   "duration_min": 335,
   "distance_km": 4097.1
  },
  {
   "hex": "ac1fdb",
   "first_seen": 1784370281,
   "last_seen": 1784415521,
   "dep": "EDDM",
   "arr": "KSAN",
   "callsign": "N880WT",
   "duration_min": 754,
   "distance_km": 9673.1
  },
  {
   "hex": "a47b5a",
   "first_seen": 1784348883,
   "last_seen": 1784352243,
   "dep": "KVNY",
   "arr": "KSJC",
   "callsign": "N3880",
   "duration_min": 56,
   "distance_km": 468.0
  },
  {
   "hex": "a9247d",
   "first_seen": 1784296026,
   "last_seen": 1784315526,
   "dep": "KSJC",
   "arr": "KTEB",
   "callsign": "N68885",
   "duration_min": 325,
   "distance_km": 4097.1
  },
  {
   "hex": "a47b5a",
   "first_seen": 1784280723,
   "last_seen": 1784283603,
   "dep": "KSJC",
   "arr": "KVNY",
   "callsign": "N3880",
   "duration_min": 48,
   "distance_km": 468.0
  },
  {
   "hex": "ac1fdb",
   "first_seen": 1784274641,
   "last_seen": 1784319581,
   "dep": "KSAN",
   "arr": "EDDM",
   "callsign": "N880WT",
   "duration_min": 749,
   "distance_km": 9673.1
  },
  {
   "hex": "a835af",
   "first_seen": 1784202708,
   "last_seen": 1784212488,
   "dep": "KLAX",
   "arr": "KAUS",
   "callsign": "N628TS",
   "duration_min": 163,
   "distance_km": 1994.4
  },
  {
   "hex": "a835af",
   "first_seen": 1784124528,
   "last_seen": 1784134728,
   "dep": "KAUS",
   "arr": "KLAX",
   "callsign": "N628TS",
   "duration_min": 170,
   "distance_km": 1994.4
  },
  {
   "hex": "a91338",
   "first_seen": 1784074746,
   "last_seen": 1784090406,
   "dep": "KIAD",
   "arr": "KBOI",
   "callsign": "N684MT",
   "duration_min": 261,
   "distance_km": 3251.1
  },
  {
   "hex": "a91338",
   "first_seen": 1784051886,
   "last_seen": 1784068266,
   "dep": "KBOI",
   "arr": "KIAD",
   "callsign": "N684MT",
   "duration_min": 273,
   "distance_km": 3251.1
  },
  {
   "hex": "ab5d36",
   "first_seen": 1783966925,
   "last_seen": 1783971965,
   "dep": "KSFO",
   "arr": "KBOI",
   "callsign": "N831MT",
   "duration_min": 84,
   "distance_km": 840.3
  },
  {
   "hex": "ab5d36",
   "first_seen": 1783922285,
   "last_seen": 1783927865,
   "dep": "KBOI",
   "arr": "KSFO",
   "callsign": "N831MT",
   "duration_min": 93,
   "distance_km": 840.3
  },
  {
   "hex": "a835af",
   "first_seen": 1783914132,
   "last_seen": 1783925952,
   "dep": "KTEB",
   "arr": "KAUS",
   "callsign": "",
   "duration_min": 197,
   "distance_km": 2431.8
  },
  {
   "hex": "a2d6c8",
   "first_seen": 1783895515,
   "last_seen": 1783898815,
   "dep": "KDAL",
   "arr": "KHOU",
   "callsign": "N282QA",
   "duration_min": 55,
   "distance_km": 386.1
  },
  {
   "hex": "a835af",
   "first_seen": 1783887912,
   "last_seen": 1783900512,
   "dep": "KAUS",
   "arr": "KTEB",
   "callsign": "N628TS",
   "duration_min": 210,
   "distance_km": 2431.8
  },
  {
   "hex": "a2d6c8",
   "first_seen": 1783870615,
   "last_seen": 1783873435,
   "dep": "KHOU",
   "arr": "KDAL",
   "callsign": "N282QA",
   "duration_min": 47,
   "distance_km": 386.1
  },
  {
   "hex": "a5f06e",
   "first_seen": 1783805322,
   "last_seen": 1783811382,
   "dep": "KPWK",
   "arr": "KBWI",
   "callsign": "N482EC",
   "duration_min": 101,
   "distance_km": 1001.6
  },
  {
   "hex": "a5f06e",
   "first_seen": 1783745262,
   "last_seen": 1783751322,
   "dep": "KBWI",
   "arr": "KPWK",
   "callsign": "N482EC",
   "duration_min": 101,
   "distance_km": 1001.6
  },
  {
   "hex": "aa87e4",
   "first_seen": 1783593523,
   "last_seen": 1783598383,
   "dep": "KSJC",
   "arr": "KBOI",
   "callsign": "N778MT",
   "duration_min": 81,
   "distance_km": 841.3
  },
  {
   "hex": "aa87e4",
   "first_seen": 1783531063,
   "last_seen": 1783536283,
   "dep": "KBOI",
   "arr": "KSJC",
   "callsign": "N778MT",
   "duration_min": 87,
   "distance_km": 841.3
  },
  {
   "hex": "ac1fdb",
   "first_seen": 1783490660,
   "last_seen": 1783535780,
   "dep": "EDDM",
   "arr": "KSAN",
   "callsign": "N880WT",
   "duration_min": 752,
   "distance_km": 9673.1
  },
  {
   "hex": "a21084",
   "first_seen": 1783457501,
   "last_seen": 1783477361,
   "dep": "KTEB",
   "arr": "KSJC",
   "callsign": "N232G",
   "duration_min": 331,
   "distance_km": 4097.1
  },
  {
   "hex": "ac1fdb",
   "first_seen": 1783431140,
   "last_seen": 1783476080,
   "dep": "KSAN",
   "arr": "EDDM",
   "callsign": "N880WT",
   "duration_min": 749,
   "distance_km": 9673.1
  },
  {
   "hex": "a21084",
   "first_seen": 1783423241,
   "last_seen": 1783443221,
   "dep": "KSJC",
   "arr": "KTEB",
   "callsign": "N232G",
   "duration_min": 333,
   "distance_km": 4097.1
  },
  {
   "hex": "a2da7f",
   "first_seen": 1783406445,
   "last_seen": 1783409325,
   "dep": "KDAL",
   "arr": "KHOU",
   "callsign": "N283QA",
   "duration_min": 48,
   "distance_km": 386.1
  },
  {
   "hex": "a597ee",
   "first_seen": 1783405726,
   "last_seen": 1783408426,
   "dep": "KHOU",
   "arr": "KDAL",
   "callsign": "N46GX",
   "duration_min": 45,
   "distance_km": 386.1
  },
  {
   "hex": "a2da7f",
   "first_seen": 1783378365,
   "last_seen": 1783380945,
   "dep": "KHOU",
   "arr": "KDAL",
   "callsign": "N283QA",
   "duration_min": 43,
   "distance_km": 386.1
  },
  {
   "hex": "a2ae0a",
   "first_seen": 1783363908,
   "last_seen": 1783369728,
   "dep": "KMEM",
   "arr": "KAUS",
   "callsign": "N272BG",
   "duration_min": 97,
   "distance_km": 899.3
  },
  {
   "hex": "a597ee",
   "first_seen": 1783323826,
   "last_seen": 1783326886,
   "dep": null,
   "arr": null,
   "callsign": "N46GX",
   "duration_min": 51,
   "distance_km": null
  },
  {
   "hex": "a2ae0a",
   "first_seen": 1783318488,
   "last_seen": 1783324008,
   "dep": "KAUS",
   "arr": "KMEM",
   "callsign": "N272BG",
   "duration_min": 92,
   "distance_km": 899.3
  },
  {
   "hex": "ac559f",
   "first_seen": 1783301690,
   "last_seen": 1783303070,
   "dep": "KSAN",
   "arr": "KCRQ",
   "callsign": "EJA894",
   "duration_min": 23,
   "distance_km": 44.7
  },
  {
   "hex": "ac559f",
   "first_seen": 1783217510,
   "last_seen": 1783219370,
   "dep": "KCRQ",
   "arr": "KSAN",
   "callsign": "EJA894",
   "duration_min": 31,
   "distance_km": 44.7
  },
  {
   "hex": "a835af",
   "first_seen": 1783217325,
   "last_seen": 1783256445,
   "dep": "LFPB",
   "arr": "KAUS",
   "callsign": "N628TS",
   "duration_min": 652,
   "distance_km": 8200.9
  },
  {
   "hex": "a835af",
   "first_seen": 1783163805,
   "last_seen": 1783202085,
   "dep": "KAUS",
   "arr": "LFPB",
   "callsign": "N628TS",
   "duration_min": 638,
   "distance_km": 8200.9
  },
  {
   "hex": "a97659",
   "first_seen": 1783011657,
   "last_seen": 1783017717,
   "dep": "KSJC",
   "arr": "KBFI",
   "callsign": "N709DS",
   "duration_min": 101,
   "distance_km": 1131.0
  },
  {
   "hex": "a97659",
   "first_seen": 1782958797,
   "last_seen": 1782965577,
   "dep": "KBFI",
   "arr": "KSJC",
   "callsign": "N709DS",
   "duration_min": 113,
   "distance_km": 1131.0
  }
 ]
};
