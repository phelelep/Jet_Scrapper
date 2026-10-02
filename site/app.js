/* Suivi des jets : lit window.JETS_DATA (voir docs/DATA_CONTRACT.md, section 2). */
(function () {
  "use strict";

  var D = window.JETS_DATA;
  if (!D || typeof D !== "object") {
    document.getElementById("nodata").hidden = false;
    return;
  }
  document.getElementById("app").hidden = false;

  // ---------- Normalisation (le site ne doit jamais planter sur un null) ----------
  var aircraft = Array.isArray(D.aircraft) ? D.aircraft.filter(Boolean) : [];
  var flights = Array.isArray(D.flights) ? D.flights.filter(Boolean) : [];
  var airports = D.airports && typeof D.airports === "object" ? D.airports : {};
  var history = D.history || {};
  var DAY = 86400;
  var histEnd = num(history.end) != null ? history.end
    : (flights.length ? Math.max.apply(null, flights.map(function (f) { return f.first_seen || 0; })) : Date.now() / 1000);
  var byHex = {};
  aircraft.forEach(function (a) { byHex[a.hex] = a; });

  // ---------- Utilitaires ----------
  function num(v) { return typeof v === "number" && isFinite(v) ? v : null; }
  function esc(s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function fmtUTC(ts, withTime) {
    if (num(ts) == null) return "—";
    var d = new Date(ts * 1000);
    var s = d.getUTCFullYear() + "-" + pad(d.getUTCMonth() + 1) + "-" + pad(d.getUTCDate());
    if (withTime !== false) s += " " + pad(d.getUTCHours()) + ":" + pad(d.getUTCMinutes());
    return s;
  }
  function fmtLocal(ts) {
    if (num(ts) == null) return "—";
    return new Date(ts * 1000).toLocaleString("fr-FR", {
      year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit"
    });
  }
  function fmtDur(min) {
    if (num(min) == null) return "—";
    min = Math.round(min);
    if (min < 60) return min + " min";
    return Math.floor(min / 60) + " h " + pad(min % 60);
  }
  function fmtNum(v, dec) {
    if (num(v) == null) return "—";
    return v.toLocaleString("fr-FR", { minimumFractionDigits: dec || 0, maximumFractionDigits: dec || 0 });
  }
  function fmtKm(v) { return num(v) == null ? "—" : fmtNum(v) + " km"; }
  function apCity(code) { var a = code && airports[code]; return a ? (a.city || a.name || "") : ""; }
  function apHTML(code) {
    if (!code) return '<span class="unk">?</span>';
    var c = apCity(code);
    return '<span class="code">' + esc(code) + "</span>" + (c ? ' <span class="city">' + esc(c) + "</span>" : "");
  }
  var STATUS_FR = { airborne: "En vol", ground: "Au sol", unseen: "Non détecté" };
  function badge(s) {
    var k = STATUS_FR[s] ? s : "unseen";
    return '<span class="badge ' + k + '">' + STATUS_FR[k] + "</span>";
  }
  function stat(s) {
    var n = s && num(s.flights) != null ? s.flights : 0;
    var h = s && num(s.hours) != null ? s.hours : 0;
    if (!n) return '<span class="stat zero">0</span>';
    return '<span class="stat"><b>' + n + '</b><span class="h">' + fmtNum(h, 1) + " h</span></span>";
  }
  function cmp(a, b) {  // null/"" toujours en fin de liste
    var na = a == null || a === "", nb = b == null || b === "";
    if (na || nb) return na && nb ? 0 : (na ? 1 : -1);
    if (typeof a === "string" || typeof b === "string")
      return String(a).localeCompare(String(b), "fr", { numeric: true, sensitivity: "base" });
    return a < b ? -1 : a > b ? 1 : 0;
  }
  function makeSortable(table, state, keys, render) {
    var ths = table.querySelectorAll("th[data-k]");
    function mark() {
      ths.forEach(function (th) {
        th.classList.toggle("sorted", th.dataset.k === state.key);
        th.classList.toggle("desc", th.dataset.k === state.key && state.dir < 0);
      });
    }
    ths.forEach(function (th) {
      th.addEventListener("click", function () {
        var k = th.dataset.k;
        if (state.key === k) state.dir = -state.dir;
        else { state.key = k; state.dir = keys[k].desc ? -1 : 1; }
        mark(); render();
      });
    });
    mark();
    return function sort(rows) {
      var f = keys[state.key].v, dir = state.dir;
      return rows.slice().sort(function (a, b) {
        var va = f(a), vb = f(b);
        var nulls = (va == null || va === "") - (vb == null || vb === "");
        if (nulls) return nulls;          // nulls en fin, quel que soit le sens
        return dir * cmp(va, vb);
      });
    };
  }

  // ---------- En-tête ----------
  (function header() {
    var c = D.counts || {};
    function cnt(k) {
      if (num(c[k]) != null) return c[k];
      if (k === "total") return aircraft.length;
      return aircraft.filter(function (a) { return a.status === k; }).length;
    }
    document.getElementById("kpis").innerHTML = [
      ["air", "En vol", cnt("airborne")], ["ground", "Au sol", cnt("ground")],
      ["unseen", "Non détectés", cnt("unseen")], ["", "Total", cnt("total")]
    ].map(function (k) {
      return '<div class="kpi ' + k[0] + '"><div class="v">' + k[2] + '</div><div class="l">' + k[1] + "</div></div>";
    }).join("");

    var cov = aircraft.map(function (a) { return a.stats && num(a.stats.coverage_days); })
      .filter(function (v) { return v != null; });
    var days = num(history.days) || 90, covTxt = "—";
    if (cov.length) {
      var mn = Math.min.apply(null, cov), mx = Math.max.apply(null, cov);
      covTxt = (mn === mx ? mn : mn + "–" + mx) + " j / " + days + " j récupérés";
    }
    var snap = num(D.snapshot_at) != null
      ? fmtUTC(D.snapshot_at) + " UTC <span class=\"muted\">(" + esc(fmtLocal(D.snapshot_at)) + " heure locale)</span>"
      : '<span class="muted">relevé indisponible</span>';
    var hist = (num(history.start) != null && num(history.end) != null)
      ? fmtUTC(history.start, false) + " → " + fmtUTC(history.end - DAY, false) + " <span class=\"muted\">(" + days + " j)</span>"
      : "—";
    document.getElementById("meta").innerHTML =
      '<span class="k">Relevé</span><span class="v">' + snap + "</span>" +
      '<span class="k">Historique</span><span class="v">' + hist + "</span>" +
      '<span class="k">Couverture</span><span class="v">' + covTxt + "</span>";
    document.getElementById("generated").textContent =
      "Généré le " + (num(D.generated_at) != null ? fmtUTC(D.generated_at) + " UTC" : "—");
  })();

  // ---------- Carte ----------
  // Fond de carte sombre. "carto" (dark_all) renvoie désormais des tuiles filigranées
  // « API KEY REQUIRED » sans clé ; "esri" (World Dark Gray, sans clé) est donc utilisé par défaut.
  var TILE_PROVIDER = "esri";
  var TILES = {
    carto: [{
      url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
      opt: { subdomains: "abcd", maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>' }
    }],
    esri: [{
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Base/MapServer/tile/{z}/{y}/{x}",
      opt: { maxZoom: 16,
        attribution: 'Tiles &copy; <a href="https://www.esri.com/">Esri</a> &mdash; Esri, HERE, Garmin, &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }
    }, {
      url: "https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Dark_Gray_Reference/MapServer/tile/{z}/{y}/{x}",
      opt: { maxZoom: 16, pane: "labels", opacity: 0.8 }
    }]
  };
  var map = null, markers = {}, layerAir, layerGround, layerRoutes;
  var tgGround = document.getElementById("tg-ground"), tgRoutes = document.getElementById("tg-routes");

  function planeSVG(color, track) {
    var rot = num(track) != null ? track : 0;
    return '<svg width="26" height="26" viewBox="0 0 24 24" style="transform:rotate(' + rot + 'deg)">' +
      '<path style="fill:' + color + '" stroke="#000" stroke-width=".6" d="M12 1.5c.9 0 1.4 1 1.4 2.2v5.6l8.1 4.7v2.1l-8.1-2.5v5l2.3 1.7V22L12 21.1 8.3 22v-1.7l2.3-1.7v-5l-8.1 2.5V14l8.1-4.7V3.7c0-1.2.5-2.2 1.4-2.2z"/>' +
      (num(track) == null ? '<circle cx="12" cy="12" r="11" fill="none" style="stroke:' + color + '" stroke-dasharray="2 2" stroke-width="1"/>' : "") +
      "</svg>";
  }
  function popupHTML(a) {
    var p = a.position || {}, n = a.nearest_airport;
    var rows = [
      ["Société", esc(a.entity || "—")],
      ["Personne", esc(a.person || "—")],
      ["Modèle", esc(a.model || "—")],
      ["Indicatif", esc(p.callsign || "—")],
      ["Altitude", a.status === "ground" ? "au sol" : (num(p.alt_ft) != null ? fmtNum(p.alt_ft) + " ft" : "—")],
      ["Vitesse", num(p.gs_kt) != null ? fmtNum(p.gs_kt) + " kt" : "—"],
      ["Cap", num(p.track_deg) != null ? fmtNum(p.track_deg) + "°" : "—"],
      ["Aéroport proche", n ? esc(n.code || "?") + " " + esc(n.city || n.name || "") +
        (num(n.dist_km) != null ? ' <span class="muted">(' + fmtNum(n.dist_km, 1) + " km)</span>" : "") : "—"]
    ];
    if (num(p.stale_min)) rows.push(["Position", "il y a " + p.stale_min + " min"]);
    return '<div class="pop-title">' + esc(a.reg || a.hex) + " " + badge(a.status) + "</div>" +
      '<div class="pop-sub">' + esc(a.owner || "") + "</div>" +
      '<div class="pop-grid">' + rows.map(function (r) {
        return '<span class="k">' + r[0] + '</span><span class="v">' + r[1] + "</span>";
      }).join("") + "</div>";
  }
  function hasPos(a) { return a.position && num(a.position.lat) != null && num(a.position.lon) != null; }

  // Grand cercle approché (interpolation sphérique), pour des routes plus réalistes.
  function arc(lat1, lon1, lat2, lon2, n) {
    var r = Math.PI / 180, p1 = [lat1 * r, lon1 * r], p2 = [lat2 * r, lon2 * r];
    var d = 2 * Math.asin(Math.sqrt(Math.pow(Math.sin((p2[0] - p1[0]) / 2), 2) +
      Math.cos(p1[0]) * Math.cos(p2[0]) * Math.pow(Math.sin((p2[1] - p1[1]) / 2), 2)));
    if (!d) return [[lat1, lon1], [lat2, lon2]];
    var pts = [], prevLon = null;
    for (var i = 0; i <= n; i++) {
      var f = i / n, A = Math.sin((1 - f) * d) / Math.sin(d), B = Math.sin(f * d) / Math.sin(d);
      var x = A * Math.cos(p1[0]) * Math.cos(p1[1]) + B * Math.cos(p2[0]) * Math.cos(p2[1]);
      var y = A * Math.cos(p1[0]) * Math.sin(p1[1]) + B * Math.cos(p2[0]) * Math.sin(p2[1]);
      var z = A * Math.sin(p1[0]) + B * Math.sin(p2[0]);
      var lat = Math.atan2(z, Math.sqrt(x * x + y * y)) / r, lon = Math.atan2(y, x) / r;
      if (prevLon != null) { while (lon - prevLon > 180) lon -= 360; while (lon - prevLon < -180) lon += 360; }
      prevLon = lon; pts.push([lat, lon]);
    }
    return pts;
  }

  function initMap() {
    var el = document.getElementById("map");
    if (typeof L === "undefined") {
      el.innerHTML = '<div class="map-msg">Carte indisponible (Leaflet n’a pas pu être chargé — connexion Internet requise).</div>';
      tgGround.disabled = tgRoutes.disabled = true;
      return;
    }
    map = L.map(el, { worldCopyJump: true, zoomControl: true, minZoom: 2 });
    var lp = map.createPane("labels");               // libellés au-dessus du fond, sous les routes
    lp.style.zIndex = 350; lp.style.pointerEvents = "none";
    (TILES[TILE_PROVIDER] || TILES.esri).forEach(function (t) { L.tileLayer(t.url, t.opt).addTo(map); });
    layerAir = L.layerGroup().addTo(map);
    layerGround = L.layerGroup();
    layerRoutes = L.layerGroup();

    var nAir = 0, nGround = 0;
    aircraft.forEach(function (a) {
      if (!hasPos(a) || (a.status !== "airborne" && a.status !== "ground")) return;
      var air = a.status === "airborne", p = a.position;
      var icon = L.divIcon({
        className: "plane-icon", iconSize: [26, 26], iconAnchor: [13, 13], popupAnchor: [0, -12],
        html: planeSVG(air ? "var(--air)" : "var(--ground)", air ? p.track_deg : null) +
          '<span class="plane-label' + (air ? "" : " ground-label") + '">' + esc(a.reg || a.hex) + "</span>"
      });
      var m = L.marker([p.lat, p.lon], { icon: icon, zIndexOffset: air ? 1000 : 0, title: a.reg || a.hex })
        .bindPopup(popupHTML(a));
      (air ? layerAir : layerGround).addLayer(m);
      markers[a.hex] = m;
      if (air) nAir++; else nGround++;
    });

    var since = histEnd - 7 * DAY, nRoutes = 0;
    flights.forEach(function (f) {
      if (!(f.first_seen >= since) || !f.dep || !f.arr || f.dep === f.arr) return;
      var A = airports[f.dep], B = airports[f.arr];
      if (!A || !B || num(A.lat) == null || num(B.lat) == null || num(A.lon) == null || num(B.lon) == null) return;
      var a = byHex[f.hex];
      L.polyline(arc(A.lat, A.lon, B.lat, B.lon, 32), { color: "#4cc2ff", weight: 1.6, opacity: 0.55 })
        .bindTooltip((a ? a.reg : f.hex) + " · " + f.dep + " → " + f.arr + " · " + fmtUTC(f.first_seen) + " UTC", { sticky: true })
        .addTo(layerRoutes);
      [[f.dep, A], [f.arr, B]].forEach(function (x) {
        L.circleMarker([x[1].lat, x[1].lon], { radius: 3, color: "#4cc2ff", weight: 1, fillOpacity: 0.8 })
          .bindTooltip(x[0] + " " + (x[1].city || "")).addTo(layerRoutes);
      });
      nRoutes++;
    });

    document.getElementById("map-caption").textContent =
      "· " + nAir + " en vol au relevé" + " · " + nGround + " au sol positionné(s) · " + nRoutes + " route(s) sur 7 j";
    tgGround.addEventListener("change", function () { toggle(layerGround, tgGround.checked); });
    tgRoutes.addEventListener("change", function () { toggle(layerRoutes, tgRoutes.checked); });
    fitMap();
  }
  function toggle(layer, on) {
    if (on) map.addLayer(layer); else map.removeLayer(layer);
    fitMap();
  }
  function fitMap() {
    var b = L.latLngBounds([]);
    [layerAir, tgGround.checked && layerGround, tgRoutes.checked && layerRoutes].forEach(function (lg) {
      if (!lg) return;
      lg.eachLayer(function (l) {
        if (l.getLatLng) b.extend(l.getLatLng()); else if (l.getBounds) b.extend(l.getBounds());
      });
    });
    if (!b.isValid()) map.setView([39, -60], 3);                       // Amérique du Nord + Europe
    else if (b.getNorthEast().equals(b.getSouthWest())) map.setView(b.getCenter(), 6);
    else map.fitBounds(b, { padding: [40, 40], maxZoom: 7 });
  }
  initMap();

  // ---------- Récapitulatifs flotte (watchlist / autres jets) ----------
  var selectedHex = null;
  var STATUS_ORDER = { airborne: 0, ground: 1, unseen: 2 };
  var FLEET_HEAD = "<tr>" + [
    ["reg", "Immat."], ["entity", "Société"], ["person", "Personne"], ["model", "Modèle"],
    ["status", "Statut"], ["last", "Dernier vol (UTC)"], ["d7", "7 j", "num"], ["d30", "30 j", "num"],
    ["d90", "90 j", "num"], ["top", "Aéroport principal"], ["conf", "Confiance"]
  ].map(function (c) {
    return '<th data-k="' + c[0] + '"' + (c[2] ? ' class="' + c[2] + '"' : "") + ">" + c[1] + "</th>";
  }).join("") + "</tr>";
  function st(a, k) { return a.stats && a.stats[k] && num(a.stats[k].flights) != null ? a.stats[k].flights : 0; }
  var FLEET_KEYS = {
    reg: { v: function (a) { return a.reg; } },
    entity: { v: function (a) { return a.entity; } },
    person: { v: function (a) { return a.person; } },
    model: { v: function (a) { return a.model; } },
    status: { v: function (a) { return (STATUS_ORDER[a.status] != null ? STATUS_ORDER[a.status] : 3) * 1e6 - st(a, "d90"); } },
    last: { v: function (a) { return a.last_flight ? a.last_flight.first_seen : null; }, desc: true },
    d7: { v: function (a) { return st(a, "d7") * 1e4 + ((a.stats && a.stats.d7 && a.stats.d7.hours) || 0); }, desc: true },
    d30: { v: function (a) { return st(a, "d30") * 1e4 + ((a.stats && a.stats.d30 && a.stats.d30.hours) || 0); }, desc: true },
    d90: { v: function (a) { return st(a, "d90") * 1e4 + ((a.stats && a.stats.d90 && a.stats.d90.hours) || 0); }, desc: true },
    top: { v: function (a) { return a.stats && a.stats.top_airport ? a.stats.top_airport.code : null; } },
    conf: { v: function (a) { return a.confidence; } }
  };

  function fleetRow(a) {
    var lf = a.last_flight, s = a.stats || {}, top = s.top_airport;
    var last = lf
      ? '<span class="t">' + fmtUTC(lf.first_seen) + "</span> " + (lf.dep ? '<span class="code">' + esc(lf.dep) + "</span>" : '<span class="unk">?</span>') +
        ' <span class="unk">→</span> ' + (lf.arr ? '<span class="code">' + esc(lf.arr) + "</span>" : '<span class="unk">?</span>')
      : '<span class="unk">aucun vol</span>';
    return '<tr data-hex="' + esc(a.hex) + '"' + (a.hex === selectedHex ? ' class="sel"' : "") + ">" +
      '<td class="reg">' + esc(a.reg || a.hex) + "</td>" +
      "<td>" + esc(a.entity || "—") + "</td>" +
      '<td class="dim">' + esc(a.person || "—") + "</td>" +
      "<td>" + esc(a.model || "—") + (a.year ? ' <span class="unk">' + esc(a.year) + "</span>" : "") + "</td>" +
      "<td>" + badge(a.status) + "</td>" +
      "<td>" + last + "</td>" +
      '<td class="num">' + stat(s.d7) + "</td>" +
      '<td class="num">' + stat(s.d30) + "</td>" +
      '<td class="num">' + stat(s.d90) + "</td>" +
      "<td>" + (top ? apHTML(top.code) + (num(top.count) != null ? ' <span class="unk">×' + top.count + "</span>" : "") : '<span class="unk">—</span>') + "</td>" +
      '<td class="conf-' + esc(a.confidence) + '">' + esc(a.confidence || "—") + "</td></tr>";
  }

  // Une vue par tableau : ses avions, son tri, sa légende.
  function fleetView(tableId, captionId, list) {
    var table = document.getElementById(tableId), body = table.querySelector("tbody");
    table.querySelector("thead").innerHTML = FLEET_HEAD;
    var sort = makeSortable(table, { key: "status", dir: 1 }, FLEET_KEYS, render);
    function render() {
      body.innerHTML = list.length ? sort(list).map(fleetRow).join("")
        : '<tr><td colspan="11" class="unk">Aucun avion dans ce groupe.</td></tr>';
      var nf = list.filter(function (a) { return !a.last_flight; }).length;
      document.getElementById(captionId).textContent = "· " + list.length + (list.length > 1 ? " jets" : " jet") +
        (nf ? " · " + nf + " sans vol sur 90 j" : "");
    }
    body.addEventListener("click", onFleetClick);
    render();
    return body;
  }
  var fleetBodies = [
    fleetView("fleet-wl", "fleet-wl-caption", aircraft.filter(function (a) { return a.group === "watchlist"; })),
    fleetView("fleet-other", "fleet-other-caption", aircraft.filter(function (a) { return a.group !== "watchlist"; }))
  ];
  function markSelected() {
    fleetBodies.forEach(function (b) {
      b.querySelectorAll("tr[data-hex]").forEach(function (r) { r.classList.toggle("sel", r.dataset.hex === selectedHex); });
    });
  }

  function onFleetClick(e) {
    var tr = e.target.closest("tr[data-hex]");
    if (!tr) return;
    var hex = tr.dataset.hex, a = byHex[hex];
    if (selectedHex === hex) { selectedHex = null; fAircraft.value = ""; }
    else {
      selectedHex = hex; fAircraft.value = hex;
      if (map && a && hasPos(a)) {
        if (a.status === "ground" && !tgGround.checked) { tgGround.checked = true; map.addLayer(layerGround); }
        map.setView([a.position.lat, a.position.lon], Math.max(map.getZoom(), 6));
        if (markers[hex]) markers[hex].openPopup();
        document.querySelector(".map-panel").scrollIntoView({ behavior: "smooth", block: "nearest" });
      }
    }
    markSelected();
    renderFlights();
  }

  // ---------- Historique des vols ----------
  var flTable = document.getElementById("flights"), flBody = flTable.querySelector("tbody");
  var fAircraft = document.getElementById("f-aircraft"), fEntity = document.getElementById("f-entity");
  var fAirport = document.getElementById("f-airport"), fSearch = document.getElementById("f-search");
  var period = 90;

  // Pré-calcul d'une ligne par vol (texte de recherche compris).
  var rowsAll = flights.map(function (f) {
    var a = byHex[f.hex] || {};
    return {
      f: f, a: a, reg: a.reg || f.hex, entity: a.entity || "",
      search: [a.reg, f.hex, a.entity, a.person, a.model, f.callsign, f.dep, f.arr, apCity(f.dep), apCity(f.arr),
        f.dep && airports[f.dep] && airports[f.dep].name, f.arr && airports[f.arr] && airports[f.arr].name]
        .filter(Boolean).join(" ").toLowerCase()
    };
  });

  function fillSelect(sel, items) {
    sel.insertAdjacentHTML("beforeend", items.map(function (it) {
      return '<option value="' + esc(it[0]) + '">' + esc(it[1]) + "</option>";
    }).join(""));
  }
  fillSelect(fAircraft, aircraft.slice().sort(function (x, y) { return cmp(x.reg, y.reg); })
    .map(function (a) { return [a.hex, (a.reg || a.hex) + " — " + (a.entity || "")]; }));
  var ents = {};
  aircraft.forEach(function (a) { if (a.entity) ents[a.entity] = 1; });
  fillSelect(fEntity, Object.keys(ents).sort(cmp).map(function (e) { return [e, e]; }));
  fillSelect(fAirport, Object.keys(airports).sort(cmp).map(function (c) {
    var ap = airports[c] || {};
    return [c, c + " — " + (ap.city || ap.name || "") + (ap.country ? " (" + ap.country + ")" : "")];
  }));

  var flSort = makeSortable(flTable, { key: "t", dir: -1 }, {
    t: { v: function (r) { return r.f.first_seen; }, desc: true },
    reg: { v: function (r) { return r.reg; } },
    entity: { v: function (r) { return r.entity; } },
    dep: { v: function (r) { return r.f.dep; } },
    arr: { v: function (r) { return r.f.arr; } },
    dur: { v: function (r) { return num(r.f.duration_min); }, desc: true },
    dist: { v: function (r) { return num(r.f.distance_km); }, desc: true },
    cs: { v: function (r) { return r.f.callsign; } }
  }, renderFlights);

  function renderFlights() {
    var since = histEnd - period * DAY;
    var hx = fAircraft.value, en = fEntity.value, ap = fAirport.value;
    var q = fSearch.value.trim().toLowerCase().split(/\s+/).filter(Boolean);
    [fAircraft, fEntity, fAirport].forEach(function (s) { s.classList.toggle("active", !!s.value); });
    var rows = rowsAll.filter(function (r) {
      var f = r.f;
      if (period < 90 && !(f.first_seen >= since)) return false;
      if (hx && f.hex !== hx) return false;
      if (en && r.entity !== en) return false;
      if (ap && f.dep !== ap && f.arr !== ap) return false;
      for (var i = 0; i < q.length; i++) if (r.search.indexOf(q[i]) < 0) return false;
      return true;
    });
    rows = flSort(rows);
    var html = new Array(rows.length);
    for (var i = 0; i < rows.length; i++) {
      var r = rows[i], f = r.f;
      html[i] = "<tr>" +
        '<td class="t">' + fmtUTC(f.first_seen) + "</td>" +
        '<td class="reg">' + esc(r.reg) + "</td>" +
        "<td>" + esc(r.entity || "—") + "</td>" +
        "<td>" + apHTML(f.dep) + "</td>" +
        '<td class="arrow-col">→</td>' +
        "<td>" + apHTML(f.arr) + "</td>" +
        '<td class="num">' + fmtDur(f.duration_min) + "</td>" +
        '<td class="num">' + (num(f.distance_km) != null ? fmtKm(f.distance_km) : '<span class="unk">—</span>') + "</td>" +
        '<td class="mono dim">' + esc(f.callsign || "—") + "</td></tr>";
    }
    flBody.innerHTML = html.join("");
    document.getElementById("flights-empty").hidden = rows.length > 0;
    var totalMin = rows.reduce(function (s, r) { return s + (num(r.f.duration_min) || 0); }, 0);
    document.getElementById("flights-count").textContent = "· " + rows.length + " vol" + (rows.length > 1 ? "s" : "") +
      " affiché" + (rows.length > 1 ? "s" : "") + " sur " + flights.length + " · " + fmtNum(totalMin / 60, 1) + " h de vol";
    document.getElementById("period-range").textContent = period < 90
      ? "Du " + fmtUTC(since, false) + " au " + fmtUTC(histEnd - DAY, false) + " (UTC)"
      : "Fenêtre complète de " + (num(history.days) || 90) + " jours";
  }

  document.getElementById("period").addEventListener("click", function (e) {
    var b = e.target.closest("button[data-p]");
    if (!b) return;
    period = +b.dataset.p;
    this.querySelectorAll("button").forEach(function (x) { x.classList.toggle("on", x === b); });
    renderFlights();
  });
  fAircraft.addEventListener("change", function () {
    selectedHex = fAircraft.value || null;
    markSelected();
    renderFlights();
  });
  [fEntity, fAirport].forEach(function (s) { s.addEventListener("change", renderFlights); });
  var tmr;
  fSearch.addEventListener("input", function () { clearTimeout(tmr); tmr = setTimeout(renderFlights, 120); });
  document.getElementById("f-reset").addEventListener("click", function () {
    fAircraft.value = fEntity.value = fAirport.value = fSearch.value = "";
    selectedHex = null;
    markSelected();
    period = 90;
    document.querySelectorAll("#period button").forEach(function (x) { x.classList.toggle("on", x.dataset.p === "90"); });
    renderFlights();
  });
  renderFlights();

  // ---------- Rafraîchissement ----------
  // Le workflow GitHub publie de nouvelles données toutes les 30 min : on relit data.js
  // toutes les 5 min et on recharge la page seulement si generated_at a changé.
  if (location.protocol !== "file:" && window.fetch) {
    setInterval(function () {
      if (document.hidden) return;
      fetch("data.js?t=" + Date.now(), { cache: "no-store" })
        .then(function (r) { return r.ok ? r.text() : ""; })
        .then(function (txt) {
          var m = /"generated_at":\s*(\d+)/.exec(txt);
          if (m && +m[1] > (num(D.generated_at) || 0)) location.reload();
        })
        .catch(function () {});
    }, 5 * 60 * 1000);
  }
})();
