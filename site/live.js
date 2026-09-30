/* Bouton « Get live data » : demande un relevé adsb.lol au serveur local (serve.py),
   qui régénère data.js, puis recharge la page. Sans serveur (fichier ouvert depuis le
   disque ou site statique hébergé), le bouton est désactivé avec une explication. */
(function () {
  "use strict";
  var btn = document.getElementById("live-btn");
  var msg = document.getElementById("live-msg");
  if (!btn) return;

  function say(text, cls) {
    msg.textContent = text;
    msg.className = "live-msg" + (cls ? " " + cls : "");
  }

  if (location.protocol === "file:") {
    btn.disabled = true;
    btn.title = "Lancez « python serve.py » puis ouvrez http://localhost:8000";
    say("serveur local requis");
    return;
  }

  btn.addEventListener("click", function () {
    btn.disabled = true;
    say("Relevé en cours…");
    fetch("api/live", { method: "POST" })
      .then(function (r) {
        if (r.status === 404 || r.status === 501) throw new Error("serveur local requis (python serve.py)");
        return r.json();
      })
      .then(function (res) {
        if (!res.ok) throw new Error(res.message || "échec du relevé");
        var c = res.counts || {};
        say((res.cached ? "Relevé récent réutilisé — " : "") + (c.airborne || 0) + " en vol, rechargement…", "ok");
        setTimeout(function () { location.reload(); }, 600);
      })
      .catch(function (e) {
        btn.disabled = false;
        say(e.message, "err");
      });
  });
})();
