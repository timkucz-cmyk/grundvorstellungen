// Grundvorstellungen – App (Routing, Karten, Entwicklungslinie, Plakate, Konzeptseiten)
const $ = (s, r = document) => r.querySelector(s);
const kopf = $("#kopf");
const main = $("#main");
const state = { suche: "", leitidee: "", stufe: "" };
const idx = (s) => STUFEN.indexOf(s);
const stufenText = (ab, bis) => (ab === bis ? ab : `${ab}–${bis}`);
const spanne = (k) => {
  const ab = Math.min(...k.gv.map((g) => idx(g.ab))), bis = Math.max(...k.gv.map((g) => idx(g.bis)));
  return stufenText(STUFEN[ab], STUFEN[bis]);
};
const kz = (l) => `<span class="kz" title="${LEITIDEEN[l].name}">${LEITIDEEN[l].kuerzel.replace("&", "&amp;")}</span>`;
const anzGV = KONZEPTE.reduce((n, k) => n + k.gv.length, 0);

// Mini-Grafiken der Kacheln und Plakate (statisch)
const ACHSEN = '<path d="M20 130 H225 M20 130 V12" stroke="#646a72" stroke-width="1.5" fill="none"/>';
const PARABEL = (farbe, breite) => `<path d="M20 130 Q120 130 220 20" stroke="${farbe}" stroke-width="${breite}" fill="none"/>`;
const MINI = {
  zuordnung: `<svg class="mini" viewBox="0 0 240 150" role="img" aria-label="Parabel mit abgelesenem Punkt">${ACHSEN}${PARABEL("#cfd1cf", 3)}<path d="M140 130 V90.4 H20" stroke="#17181a" stroke-width="2" stroke-dasharray="5 4" fill="none"/><circle cx="140" cy="90.4" r="6" fill="#17181a"/></svg>`,
  kovariation: `<svg class="mini" viewBox="0 0 240 150" role="img" aria-label="Parabel mit wachsenden Änderungsstufen">${ACHSEN}${PARABEL("#cfd1cf", 3)}<path d="M20 130 H60 V125.6 H100 V112.4 H140 V90.4 H180 V59.6 H220 V20" stroke="#17181a" stroke-width="2.5" fill="none"/></svg>`,
  objekt: `<svg class="mini" viewBox="0 0 240 150" role="img" aria-label="Schar von Parabeln">${ACHSEN}<path d="M20 130 Q120 130 220 75" stroke="#cfd1cf" stroke-width="2.5" fill="none"/><path d="M20 130 Q90.5 130 161 20" stroke="#cfd1cf" stroke-width="2.5" fill="none"/>${PARABEL("#17181a", 3.5)}</svg>`,
};

// ---------- Kopfband ----------
function kopfStart(aktiv, titel, text) {
  const nav = [["", "Karten"], ["linie", "Entwicklungslinie"], ["plakate", "Plakate"]]
    .map(([h, n]) => `<a href="#${h}" class="${aktiv === h ? "an" : ""}">${n}</a>`).join("");
  kopf.innerHTML = `<div class="wrap">
    <div class="kopf-zeile"><a class="ueberzeile" href="#">Fachschaft Mathematik · LMG Uetersen</a><nav aria-label="Ansichten">${nav}</nav></div>
    <h1>${titel}</h1><p>${text}</p></div>`;
}
function kopfKonzept(k, text) {
  kopf.innerHTML = `<div class="wrap">
    <a class="zurueck" href="#">← Alle Grundvorstellungen</a>
    <div class="meta">${kz(k.leitidee)}<span class="ueberzeile">Kl. ${spanne(k)}</span></div>
    <h1>${k.name}</h1>${text ? `<p>${text}</p>` : ""}</div>`;
}

// ---------- Filter ----------
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
function filterBlock() {
  return `<section class="block filter" aria-label="Filter">
    <div class="zeile">
      <input id="suche" type="search" aria-label="Suchen" placeholder="Suchen, z. B. Bruch, Änderungsrate, Waage …" value="${state.suche}">
      <label>Klasse <select id="stufe"><option value="">alle</option>${STUFEN.map((s) => `<option ${state.stufe === s ? "selected" : ""}>${s}</option>`).join("")}</select></label>
    </div>
    <div class="zeile" id="leitideen"><span class="etikett">Leitideen</span>
      ${Object.entries(LEITIDEEN).map(([id, l]) => `<button class="li-knopf" data-l="${id}" aria-pressed="${state.leitidee === id}">${kz(id)}${l.name}</button>`).join("")}
    </div>
  </section>
  <div class="leiste"><h2 id="zaehler"></h2><span class="leise" id="hinweis"></span></div>
  <div id="ergebnis"></div>`;
}
function filterAktivieren(zeichne) {
  $("#suche").addEventListener("input", (e) => { state.suche = e.target.value; zeichne(); });
  $("#stufe").addEventListener("change", (e) => { state.stufe = e.target.value; zeichne(); });
  $("#leitideen").addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    state.leitidee = state.leitidee === b.dataset.l ? "" : b.dataset.l;
    document.querySelectorAll(".li-knopf").forEach((x) => x.setAttribute("aria-pressed", x.dataset.l === state.leitidee));
    zeichne();
  });
  zeichne();
}
function zaehlerText(liste) {
  const n = liste.reduce((s, k) => s + k.gv.length, 0);
  const teil = state.leitidee ? ` · ${LEITIDEEN[state.leitidee].name}` : "";
  return `${liste.length} Begriffe · ${n} Grundvorstellungen${teil}`;
}

// ---------- Karten ----------
function renderKarten() {
  kopfStart("", "Grundvorstellungen", "Was soll man sich unter einem mathematischen Begriff vorstellen? Die gemeinsame Sprache der Fachschaft – von Klasse 5 bis Q2.");
  main.innerHTML = filterBlock();
  $("#hinweis").textContent = "Das Kürzel oben rechts zeigt die Leitidee.";
  filterAktivieren(() => {
    const liste = gefiltert();
    $("#zaehler").textContent = zaehlerText(liste);
    $("#ergebnis").innerHTML = liste.length ? `<div class="karten">${liste.map((k) => `
      <a class="karte" href="#k/${k.id}" aria-label="${k.name} – ${LEITIDEEN[k.leitidee].name}">
        <div class="oben"><span>Kl. ${spanne(k)}</span>${kz(k.leitidee)}</div>
        <h3>${k.name}</h3>
        <div class="pillen">${k.gv.map((g) => `<span class="pille" title="${g.kurz}">${g.name}</span>`).join("")}</div>
        ${k.ausarbeitung ? '<span class="mehr">Ausarbeitung ansehen →</span>' : ""}
      </a>`).join("")}</div>` : '<p class="leer">Nichts gefunden.</p>';
  });
}

// ---------- Entwicklungslinie ----------
function renderLinie() {
  kopfStart("linie", "Entwicklungslinie", "Wann wird welche Grundvorstellung angelegt – und worauf baut die nächste Stufe auf?");
  main.innerHTML = filterBlock();
  $("#hinweis").textContent = "Stufenangaben: Vorschlag, mit dem Fachcurriculum abzugleichen.";
  filterAktivieren(() => {
    const liste = gefiltert();
    $("#zaehler").textContent = zaehlerText(liste);
    $("#ergebnis").innerHTML = liste.length ? `<div class="linie">
      <div class="ln-kopf"><span>Begriff</span><div class="ln-stufen">${STUFEN.map((s) => `<span>${s}</span>`).join("")}</div></div>
      ${liste.map((k) => `<a class="ln-zeile" href="#k/${k.id}">
        <span class="ln-name">${kz(k.leitidee)}${k.name}</span>
        <div class="ln-spur">${k.gv.map((g) => `<span class="ln-gv ${g.verbindlich ? "fest" : ""}" style="grid-column:${idx(g.ab) + 1} / ${idx(g.bis) + 2}" title="${g.name}: ${g.kurz}">${g.name}</span>`).join("")}</div>
      </a>`).join("")}</div>` : '<p class="leer">Nichts gefunden.</p>';
  });
}

// ---------- Plakate ----------
function renderPlakate() {
  kopfStart("plakate", "Plakate", "Ein DIN-A1-Plakat je Begriff – für die Klassenräume, damit die Grundvorstellungen im Unterricht präsent sind.");
  const fertig = KONZEPTE.filter((k) => k.ausarbeitung);
  main.innerHTML = `<div class="block"><p style="margin:0">Plakate gibt es für ausgearbeitete Begriffe. Drucken: Plakat öffnen → „Drucken / als PDF“ → Papierformat A1, Ränder „keine“.</p></div>
    <div class="karten">${fertig.map((k) => `<a class="karte" href="#plakat/${k.id}">
      <div class="oben"><span>Kl. ${spanne(k)}</span>${kz(k.leitidee)}</div><h3>${k.name}</h3>
      <div class="pillen">${k.gv.map((g) => `<span class="pille">${g.name}</span>`).join("")}</div><span class="mehr">Plakat öffnen →</span></a>`).join("")}</div>`;
}

// ---------- Konzeptseiten ----------
function renderKonzept(id) {
  const k = KONZEPTE.find((x) => x.id === id);
  if (!k) return renderKarten();
  if (k.ausarbeitung) return renderAusarbeitung(k, AUSARBEITUNGEN[k.ausarbeitung]);
  kopfKonzept(k, LEITIDEEN[k.leitidee].name);
  main.innerHTML = `<div class="kacheln">${k.gv.map((g, i) => `<div class="kachel">
      <div class="nr-zeile"><span class="nr">${i + 1}</span><b>${g.name}</b></div>
      <p>${g.kurz}</p><span class="leise">Kl. ${stufenText(g.ab, g.bis)}</span></div>`).join("")}</div>
    <div class="block"><p style="margin:0">Ausarbeitung mit Visualisierung, Fehlvorstellungen und Diagnoseaufgabe folgt. Muster: <a href="#k/funktionaler-zusammenhang">Funktionaler Zusammenhang</a>.</p></div>`;
}

function renderAusarbeitung(k, A) {
  kopfKonzept(k, A.einleitung);
  kopf.querySelector('.wrap').insertAdjacentHTML('beforeend', `<div class="kopf-zusatz"><span>${A.kontext}</span><a href="#plakat/${k.id}">Plakat DIN A1 →</a></div>`);
  const klappe = (titel, inhalt) => `<details><summary>${titel}</summary><div class="klappe">${inhalt}</div></details>`;
  main.innerHTML = `
    ${A.gv.map((g, i) => `<section class="gv-zeile" id="gv-${g.key}">
      <div class="gv-bild">${MINI[g.key]}</div>
      <div class="gv-text">
        <div class="nr-zeile"><span class="nr">${i + 1}</span><b>${g.name}</b></div>
        <p class="leitfrage">„${g.leitfrage}“</p>
        <p class="kern">${g.kern}</p>
        <div class="klappen">
          ${klappe("Interaktiv ausprobieren", `<div class="viz" data-viz="${g.key}"></div>`)}
          ${klappe("Typische Fehler", `<ul>${g.fehler.map((f) => `<li>${f}</li>`).join("")}</ul>`)}
          ${klappe("Diagnoseaufgabe", `<p>${g.diagnose}</p><p class="leise">Erwartung: ${g.loesung}</p>`)}
          ${klappe("Im Unterricht", `<p>${g.impuls}</p><p>${g.sprache}</p><p class="leise">${g.stufen}</p>`)}
        </div>
      </div>
    </section>`).join("")}
    <section class="block klappen">
      ${klappe("Zwischen den Blickwinkeln wechseln", `<ol type="a">${A.wechsel.aufgabe.map(([gv, t]) => `<li>${t} <span class="leise">(${gv})</span></li>`).join("")}</ol><p class="leise">Erwartung: ${A.wechsel.loesung}</p>`)}
      ${klappe("Entwicklungslinien", A.anschluss.map(([n, t]) => `<div class="al"><b>${n}</b><span>${t}</span></div>`).join(""))}
      ${klappe("Quellen", `<ul class="quellen">${A.quellen.map((q) => `<li>${QUELLEN[q]}</li>`).join("")}</ul>`)}
    </section>`;
  main.querySelectorAll(".viz").forEach((d) => VIZ[d.dataset.viz](d));
}

// ---------- Plakat (DIN A1 hoch) ----------
function renderPlakat(id) {
  const k = KONZEPTE.find((x) => x.id === id);
  const A = k && AUSARBEITUNGEN[k.ausarbeitung];
  if (!A) return renderPlakate();
  document.body.classList.add("plakat-modus");
  kopf.innerHTML = "";
  main.innerHTML = `
    <div class="plakat-leiste"><a href="#k/${k.id}">← zurück</a><button class="knopf" onclick="window.print()">Drucken / als PDF (A1)</button>
      <span class="leise">Im Druckdialog Papierformat A1 wählen, Ränder „keine“.</span></div>
    <article class="plakat">
      <header><p class="ueber">Grundvorstellung · ${LEITIDEEN[k.leitidee].name}</p><h1>${A.titel}</h1><p>Eine Funktion – drei Blickwinkel</p></header>
      <div class="p-inhalt">${A.gv.map((g, i) => `
        <section class="p-gv">
          <div class="p-kopf"><span class="nr">${i + 1}</span><h2>${g.name}</h2></div>
          <p class="p-frage">„${g.leitfrage}“</p>
          <p class="p-kern">${g.kern}</p>
          <div class="p-viz" data-viz="${g.key}"></div>
        </section>`).join("")}</div>
      <footer>Beispiel: Bremsweg s = (v : 10)² · Fachschaft Mathematik · LMG Uetersen</footer>
    </article>`;
  main.querySelectorAll(".p-viz").forEach((d) => VIZ[d.dataset.viz](d, { statisch: true }));
}

// ---------- Router ----------
function route() {
  document.body.classList.remove("plakat-modus");
  const h = location.hash.slice(1);
  if (h.startsWith("gv-")) return; // Sprungmarke innerhalb der Konzeptseite
  if (h.startsWith("k/")) renderKonzept(h.slice(2));
  else if (h.startsWith("plakat/")) renderPlakat(h.slice(7));
  else if (h === "linie") renderLinie();
  else if (h === "plakate") renderPlakate();
  else renderKarten();
  window.scrollTo(0, 0);
}
window.addEventListener("hashchange", route);
route();
