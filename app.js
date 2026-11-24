// Grundvorstellungen – App (Routing, Übersicht, Entwicklungslinie, Detail, Plakat)
const $ = (s) => document.querySelector(s);
const main = $("#main");
const state = { suche: "", leitidee: "", stufe: "", ansicht: "karten" };
const idx = (s) => STUFEN.indexOf(s);
const stufenText = (ab, bis) => (ab === bis ? `Kl. ${ab}` : `${ab}–${bis}`);
const spanne = (k) => {
  const ab = Math.min(...k.gv.map((g) => idx(g.ab))), bis = Math.max(...k.gv.map((g) => idx(g.bis)));
  return [STUFEN[ab], STUFEN[bis]];
};

function gefiltert() {
  const q = state.suche.trim().toLowerCase();
  return KONZEPTE.filter((k) => {
    if (state.leitidee && k.leitidee !== state.leitidee) return false;
    if (state.stufe) {
      const s = idx(state.stufe);
      if (!k.gv.some((g) => idx(g.ab) <= s && s <= idx(g.bis))) return false;
    }
    if (!q) return true;
    return (k.name + " " + k.gv.map((g) => g.name + " " + g.kurz).join(" ")).toLowerCase().includes(q);
  });
}

// ---------- Übersicht ----------
function renderUebersicht() {
  const liste = gefiltert();
  const anzGV = liste.reduce((n, k) => n + k.gv.length, 0);
  main.innerHTML = `
    <section class="filter">
      <input id="suche" type="search" placeholder="Suchen, z. B. Bruch, Änderungsrate, Waage …" value="${state.suche}">
      <div class="chips" id="leitideen">
        <button data-l="" class="${state.leitidee ? "" : "an"}">Alle Leitideen</button>
        ${Object.entries(LEITIDEEN).map(([id, l]) => `<button data-l="${id}" style="--c:${l.farbe}" class="${state.leitidee === id ? "an" : ""}">${l.name}</button>`).join("")}
      </div>
      <div class="zeile">
        <label>Klassenstufe
          <select id="stufe"><option value="">alle</option>${STUFEN.map((s) => `<option ${state.stufe === s ? "selected" : ""}>${s}</option>`).join("")}</select>
        </label>
        <div class="umschalter">
          <button data-v="karten" class="${state.ansicht === "karten" ? "an" : ""}">Karten</button>
          <button data-v="linie" class="${state.ansicht === "linie" ? "an" : ""}">Entwicklungslinie</button>
        </div>
        <span class="zaehler">${liste.length} Konzepte · ${anzGV} Grundvorstellungen</span>
      </div>
    </section>
    <section id="inhalt"></section>`;
  const inhalt = $("#inhalt");
  inhalt.innerHTML = state.ansicht === "karten" ? karten(liste) : linie(liste);

  $("#suche").addEventListener("input", (e) => { state.suche = e.target.value; const pos = e.target.selectionStart; renderUebersicht(); const s = $("#suche"); s.focus(); s.setSelectionRange(pos, pos); });
  $("#leitideen").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { state.leitidee = b.dataset.l; renderUebersicht(); } });
  $("#stufe").addEventListener("change", (e) => { state.stufe = e.target.value; renderUebersicht(); });
  document.querySelector(".umschalter").addEventListener("click", (e) => { const b = e.target.closest("button"); if (b) { state.ansicht = b.dataset.v; renderUebersicht(); } });
}

function karten(liste) {
  if (!liste.length) return `<p class="leer">Nichts gefunden.</p>`;
  return `<div class="karten">${liste.map((k) => {
    const l = LEITIDEEN[k.leitidee], [ab, bis] = spanne(k);
    return `<a class="karte ${k.ausarbeitung ? "fertig" : ""}" href="#k/${k.id}" style="--c:${l.farbe}">
      <div class="kopf"><span class="li">${l.name}</span><span class="st">${stufenText(ab, bis)}</span></div>
      <h3>${k.name}${k.ausarbeitung ? ' <span class="badge">ausgearbeitet</span>' : ""}</h3>
      <ul>${k.gv.map((g) => `<li><b>${g.name}</b> – ${g.kurz}</li>`).join("")}</ul>
    </a>`;
  }).join("")}</div>`;
}

function linie(liste) {
  if (!liste.length) return `<p class="leer">Nichts gefunden.</p>`;
  const kopf = `<div class="ln-kopf"><span></span>${STUFEN.map((s) => `<span>${s}</span>`).join("")}</div>`;
  const zeilen = liste.map((k) => {
    const c = LEITIDEEN[k.leitidee].farbe;
    const balken = k.gv.map((g) => {
      const a = idx(g.ab), b = idx(g.bis);
      return `<div class="ln-gv" style="grid-column:${a + 1} / ${b + 2};--c:${c}" title="${g.name}: ${g.kurz} (${stufenText(g.ab, g.bis)})">${g.name}</div>`;
    }).join("");
    return `<a class="ln-zeile" href="#k/${k.id}"><span class="ln-name" style="--c:${c}">${k.name}</span><div class="ln-spur">${balken}</div></a>`;
  }).join("");
  return `<div class="linie">${kopf}${zeilen}</div><p class="fuss">Stufenangaben sind ein erster Vorschlag – mit dem Fachcurriculum abgleichen.</p>`;
}

// ---------- Konzept-Detail ----------
function renderKonzept(id) {
  const k = KONZEPTE.find((x) => x.id === id);
  if (!k) return renderUebersicht();
  if (k.ausarbeitung) return renderAusarbeitung(k, AUSARBEITUNGEN[k.ausarbeitung]);
  const l = LEITIDEEN[k.leitidee];
  main.innerHTML = `<a class="zurueck" href="#">← Übersicht</a>
    <header class="detail-kopf" style="--c:${l.farbe}"><span class="li">${l.name}</span><h2>${k.name}</h2></header>
    <div class="gv-liste">${k.gv.map((g) => `<div class="gv-kurz" style="--c:${l.farbe}"><h3>${g.name}</h3><p>${g.kurz}</p><span class="st">${stufenText(g.ab, g.bis)}</span></div>`).join("")}</div>
    <p class="hinweis-box">Ausarbeitung (Visualisierung, typische Fehlvorstellungen, Diagnoseaufgabe) folgt – Muster: <a href="#k/funktionaler-zusammenhang">Funktionaler Zusammenhang</a>.</p>`;
}

function renderAusarbeitung(k, A) {
  const l = LEITIDEEN[k.leitidee];
  main.innerHTML = `<a class="zurueck" href="#">← Übersicht</a>
    <header class="detail-kopf" style="--c:${l.farbe}">
      <span class="li">${l.name}</span><h2>${A.titel}</h2>
      <p class="lead">${A.einleitung}</p>
      <p class="kontext">${A.kontext}</p>
      <a class="plakat-link" href="#plakat/${k.id}">Plakat-Ansicht (DIN A1) →</a>
    </header>
    <nav class="sprung">${A.gv.map((g, i) => `<a href="#k/${k.id}" data-ziel="gv-${g.key}" style="--c:${FARBE[g.key]}"><b>${i + 1}</b> ${g.name}</a>`).join("")}</nav>
    ${A.gv.map((g, i) => `
      <section class="gv" id="gv-${g.key}" style="--c:${FARBE[g.key]}">
        <div class="gv-titel"><span class="nr">${i + 1}</span><div><h3>${g.name}</h3><p class="leitfrage">„${g.leitfrage}“</p></div></div>
        <p class="kern">${g.kern}</p>
        <div class="viz" data-viz="${g.key}"></div>
        <div class="spalten">
          <div><h4>Typische Fehlvorstellungen</h4><ul>${g.fehler.map((f) => `<li>${f}</li>`).join("")}</ul></div>
          <div><h4>Diagnoseaufgabe</h4><p>${g.diagnose}</p><details><summary>Erwartung</summary><p>${g.loesung}</p></details>
            <h4>Darstellungen</h4><p class="klein">${g.bilder}</p>
            <h4>Wo im Curriculum</h4><p class="klein">${g.stufen}</p></div>
        </div>
      </section>`).join("")}
    <section class="anschluss"><h3>Entwicklungslinien</h3>
      ${A.anschluss.map(([n, t]) => `<div class="al" style="--c:${FARBE[n.toLowerCase()]}"><b>${n}</b><span>${t}</span></div>`).join("")}
    </section>
    <section class="quellen"><h4>Quellen</h4><ul>${A.quellen.map((q) => `<li>${QUELLEN[q]}</li>`).join("")}</ul></section>`;
  main.querySelectorAll(".viz").forEach((d) => VIZ[d.dataset.viz](d));
  main.querySelector(".sprung").addEventListener("click", (e) => {
    const a = e.target.closest("a"); if (!a) return;
    e.preventDefault(); document.getElementById(a.dataset.ziel).scrollIntoView({ behavior: "smooth" });
  });
}

// ---------- Plakat (DIN A1 hoch) ----------
function renderPlakat(id) {
  const k = KONZEPTE.find((x) => x.id === id);
  const A = k && AUSARBEITUNGEN[k.ausarbeitung];
  if (!A) return renderUebersicht();
  document.body.classList.add("plakat-modus");
  main.innerHTML = `
    <div class="plakat-leiste"><a href="#k/${k.id}">← zurück</a><button onclick="window.print()">Drucken / als PDF (A1)</button>
      <span>Tipp: Im Druckdialog Papierformat A1 wählen, Ränder „keine“.</span></div>
    <article class="plakat">
      <header><p class="ueber">Grundvorstellung</p><h1>${A.titel}</h1><p class="unter">Eine Funktion – drei Blickwinkel</p></header>
      ${A.gv.map((g, i) => `
        <section class="p-gv" style="--c:${FARBE[g.key]}">
          <div class="p-kopf"><span class="nr">${i + 1}</span><h2>${g.name}</h2></div>
          <p class="p-frage">${g.leitfrage}</p>
          <p class="p-kern">${g.kern}</p>
          <div class="p-viz" data-viz="${g.key}"></div>
        </section>`).join("")}
      <footer>Beispiel: Bremsweg s = (v : 10)² · Fachschaft Mathematik · LMG Uetersen</footer>
    </article>`;
  main.querySelectorAll(".p-viz").forEach((d) => VIZ[d.dataset.viz](d, { statisch: true }));
}

// ---------- Router ----------
function route() {
  document.body.classList.remove("plakat-modus");
  const h = location.hash.slice(1);
  if (h.startsWith("k/")) renderKonzept(h.slice(2));
  else if (h.startsWith("plakat/")) renderPlakat(h.slice(7));
  else renderUebersicht();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();
