// Visualisierungen – Funktionaler Zusammenhang
// Durchgehender Kontext: Bremsweg s in Abhängigkeit von der Geschwindigkeit v
// Faustformel Fahrschule: s = a · (v/10)²   (a = 1 normale Bremsung, a = 0,5 Gefahrenbremsung)

const NS = "http://www.w3.org/2000/svg";
const FARBE = { zuordnung: "#17181a", kovariation: "#17181a", objekt: "#17181a", grau: "#b5b9b6", text: "#17181a" };

function el(tag, attrs = {}, parent) {
  const e = document.createElementNS(NS, tag);
  for (const [k, v] of Object.entries(attrs)) e.setAttribute(k, v);
  if (parent) parent.appendChild(e);
  return e;
}
function txt(parent, x, y, s, attrs = {}) {
  const t = el("text", { x, y, "font-size": 13, fill: FARBE.text, ...attrs }, parent);
  t.textContent = s;
  return t;
}
const fmt = (n, d = 1) => n.toFixed(d).replace(".", ",").replace(/,0$/, "");
const bremsweg = (v, a = 1) => a * (v / 10) ** 2;

// Koordinatensystem v (0–100 km/h) gegen s (0–120 m)
function achsen(svg, { W = 560, H = 360, xmax = 100, ymax = 120 } = {}) {
  const P = { l: 52, r: 40, t: 16, b: 44 };
  svg.setAttribute("viewBox", `0 0 ${W} ${H}`);
  const X = (v) => P.l + (v / xmax) * (W - P.l - P.r);
  const Y = (s) => H - P.b - (s / ymax) * (H - P.t - P.b);
  const g = el("g", {}, svg);
  for (let v = 0; v <= xmax; v += 10) {
    el("line", { x1: X(v), y1: Y(0), x2: X(v), y2: Y(ymax), stroke: "#ecece8" }, g);
    txt(g, X(v), Y(0) + 18, v, { "text-anchor": "middle", "font-size": 12, fill: "#646a72" });
  }
  for (let s = 0; s <= ymax; s += 20) {
    el("line", { x1: X(0), y1: Y(s), x2: X(xmax), y2: Y(s), stroke: "#ecece8" }, g);
    txt(g, X(0) - 8, Y(s) + 4, s, { "text-anchor": "end", "font-size": 12, fill: "#646a72" });
  }
  el("line", { x1: X(0), y1: Y(0), x2: X(xmax), y2: Y(0), stroke: "#3d4147", "stroke-width": 1.5 }, g);
  el("line", { x1: X(0), y1: Y(0), x2: X(0), y2: Y(ymax), stroke: "#3d4147", "stroke-width": 1.5 }, g);
  txt(g, X(xmax), Y(0) + 36, "Geschwindigkeit v in km/h", { "text-anchor": "end", "font-size": 12 });
  txt(g, X(0) + 6, Y(ymax) + 4, "Bremsweg s in m", { "font-size": 12 });
  return { X, Y, xmax, ymax };
}
function kurve(svg, k, a, attrs) {
  let d = "";
  for (let v = 0; v <= k.xmax; v += 1) {
    const s = bremsweg(v, a);
    if (s > k.ymax) break;
    d += (d ? "L" : "M") + k.X(v).toFixed(1) + "," + k.Y(s).toFixed(1);
  }
  return el("path", { d, fill: "none", "stroke-width": 3, ...attrs }, svg);
}
function regler(container, { label, min, max, step, value, oninput, einheit = "" }) {
  const wrap = document.createElement("label");
  wrap.className = "regler";
  wrap.innerHTML = `<span>${label}</span><input type="range" min="${min}" max="${max}" step="${step}" value="${value}"><output></output>`;
  const inp = wrap.querySelector("input"), out = wrap.querySelector("output");
  const upd = () => { out.textContent = fmt(+inp.value) + einheit; oninput(+inp.value); };
  inp.addEventListener("input", upd);
  container.appendChild(wrap);
  upd();
  return inp;
}

// ---------- 1. Zuordnung ----------
// Eingabe v → Maschine → Ausgabe s; Ablesen am Graphen; Pfeildiagramm
function vizZuordnung(container, { statisch = false } = {}) {
  container.innerHTML = "";
  const box = document.createElement("div");
  box.className = "viz-grid";
  container.appendChild(box);

  const svg = el("svg", { class: "graph", role: "img", "aria-label": "Graph Bremsweg gegen Geschwindigkeit mit Ablesehilfe" });
  box.appendChild(svg);
  const k = achsen(svg);
  kurve(svg, k, 1, { stroke: FARBE.grau });
  const lv = el("line", { stroke: FARBE.zuordnung, "stroke-width": 2, "stroke-dasharray": "6 4" }, svg);
  const ls = el("line", { stroke: FARBE.zuordnung, "stroke-width": 2, "stroke-dasharray": "6 4" }, svg);
  const pkt = el("circle", { r: 7, fill: FARBE.zuordnung }, svg);
  const lab = txt(svg, 0, 0, "", { "font-weight": 700, fill: FARBE.zuordnung, "font-size": 14 });

  // Pfeildiagramm
  const pd = el("svg", { class: "pfeildiagramm", viewBox: "0 0 240 360", role: "img", "aria-label": "Pfeildiagramm" });
  box.appendChild(pd);
  const werte = [20, 40, 60, 80, 100];
  el("rect", { x: 10, y: 30, width: 80, height: 300, rx: 40, fill: "#f6f6f4", stroke: "#e4e5e3" }, pd);
  el("rect", { x: 150, y: 30, width: 80, height: 300, rx: 40, fill: "#f6f6f4", stroke: "#e4e5e3" }, pd);
  txt(pd, 50, 20, "v in km/h", { "text-anchor": "middle", "font-size": 12 });
  txt(pd, 190, 20, "s in m", { "text-anchor": "middle", "font-size": 12 });
  el("defs", {}, pd).innerHTML = `<marker id="pf" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0,0L10,5L0,10z" fill="currentColor"/></marker>`;
  const pfeile = werte.map((v, i) => {
    const y = 75 + i * 55;
    txt(pd, 50, y + 5, v, { "text-anchor": "middle", "font-size": 15 });
    txt(pd, 190, y + 5, fmt(bremsweg(v)), { "text-anchor": "middle", "font-size": 15 });
    return el("line", { x1: 72, y1: y, x2: 166, y2: y, stroke: FARBE.grau, "stroke-width": 2, "marker-end": "url(#pf)", color: FARBE.grau }, pd);
  });

  const maschine = document.createElement("div");
  maschine.className = "maschine";
  container.appendChild(maschine);

  function zeichne(v) {
    const s = bremsweg(v);
    lv.setAttribute("x1", k.X(v)); lv.setAttribute("y1", k.Y(0)); lv.setAttribute("x2", k.X(v)); lv.setAttribute("y2", k.Y(s));
    ls.setAttribute("x1", k.X(v)); ls.setAttribute("y1", k.Y(s)); ls.setAttribute("x2", k.X(0)); ls.setAttribute("y2", k.Y(s));
    pkt.setAttribute("cx", k.X(v)); pkt.setAttribute("cy", k.Y(s));
    lab.setAttribute("x", k.X(v) - 10); lab.setAttribute("y", k.Y(s) - 12);
    lab.setAttribute("text-anchor", "end");
    lab.textContent = `(${v} | ${fmt(s)})`;
    pfeile.forEach((p, i) => {
      const an = werte[i] === v;
      p.setAttribute("stroke", an ? FARBE.zuordnung : FARBE.grau);
      p.setAttribute("color", an ? FARBE.zuordnung : FARBE.grau);
      p.setAttribute("stroke-width", an ? 3.5 : 2);
    });
    maschine.innerHTML = `<span class="ein">${v} km/h</span><span class="pfeil">→</span><span class="box">s = (v : 10)²</span><span class="pfeil">→</span><span class="aus">${fmt(s)} m</span>`;
  }
  if (statisch) { zeichne(60); return; }
  const ctl = document.createElement("div"); ctl.className = "steuerung"; container.prepend(ctl);
  regler(ctl, { label: "Geschwindigkeit v", min: 0, max: 100, step: 10, value: 60, einheit: " km/h", oninput: zeichne });
}

// ---------- 2. Kovariation ----------
// Wie ändert sich s, wenn v um Δv wächst? Änderungsdreiecke + Balken der Zuwächse
function vizKovariation(container, { statisch = false } = {}) {
  container.innerHTML = "";
  const svg = el("svg", { class: "graph breit", role: "img", "aria-label": "Graph mit Änderungsdreiecken" });
  container.appendChild(svg);
  const k = achsen(svg, { W: 760, H: 380 });
  kurve(svg, k, 1, { stroke: FARBE.grau });
  const gDreiecke = el("g", {}, svg);
  const info = document.createElement("div");
  info.className = "info";
  container.appendChild(info);

  let dv = 10, aktiv = 4;
  function zeichne() {
    gDreiecke.innerHTML = "";
    for (let i = 0; i * dv < 100; i++) {
      const v0 = i * dv, v1 = v0 + dv;
      const s0 = bremsweg(v0), s1 = bremsweg(v1);
      const an = i === aktiv;
      const c = an ? FARBE.kovariation : "#9aa1a9";
      el("line", { x1: k.X(v0), y1: k.Y(s0), x2: k.X(v1), y2: k.Y(s0), stroke: c, "stroke-width": an ? 3 : 2 }, gDreiecke);
      el("line", { x1: k.X(v1), y1: k.Y(s0), x2: k.X(v1), y2: k.Y(s1), stroke: c, "stroke-width": an ? 5 : 3 }, gDreiecke);
      if (dv >= 10 || an) txt(gDreiecke, k.X(v1) + 5, (k.Y(s0) + k.Y(s1)) / 2 + 4, "+" + fmt(s1 - s0), { "font-size": an ? 14 : 11, fill: an ? FARBE.kovariation : "#646a72", "font-weight": an ? 700 : 400 });
      const hit = el("rect", { x: k.X(v0), y: k.Y(k.ymax), width: k.X(v1) - k.X(v0), height: k.Y(0) - k.Y(k.ymax), fill: "transparent", style: "cursor:pointer" }, gDreiecke);
      hit.addEventListener("mouseenter", () => { aktiv = i; zeichne(); });
      hit.addEventListener("click", () => { aktiv = i; zeichne(); });
    }
    const v0 = aktiv * dv, ds = bremsweg(v0 + dv) - bremsweg(v0);
    info.innerHTML = `Von <b>${v0}</b> auf <b>${v0 + dv} km/h</b> (+${dv} km/h) wächst der Bremsweg um <b style="color:${FARBE.kovariation}">${fmt(ds)} m</b>.
      <br>Gleiche Änderung von v – aber der Zuwachs von s wird <b>immer größer</b>. Doppelte Geschwindigkeit heißt <b>vierfacher</b> Bremsweg.`;
  }
  if (statisch) { aktiv = 6; zeichne(); return; }
  const ctl = document.createElement("div"); ctl.className = "steuerung"; container.prepend(ctl);
  const knopf = document.createElement("div"); knopf.className = "knoepfe";
  knopf.innerHTML = "<span>Schrittweite Δv:</span>" + [5, 10, 20].map((d) => `<button data-d="${d}" class="${d === 10 ? "an" : ""}">${d} km/h</button>`).join("");
  knopf.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    const alt = aktiv * dv; dv = +b.dataset.d; aktiv = Math.min(Math.floor(alt / dv), 100 / dv - 1);
    knopf.querySelectorAll("button").forEach((x) => x.classList.toggle("an", x === b));
    zeichne();
  });
  ctl.appendChild(knopf);
  const hinweis = document.createElement("span"); hinweis.className = "hinweis"; hinweis.textContent = "Fahre mit der Maus über den Graphen.";
  ctl.appendChild(hinweis);
  zeichne();
}

// ---------- 3. Objekt ----------
// Die Funktion als Ganzes: ein Parameter verändert den ganzen Graphen
function vizObjekt(container, { statisch = false } = {}) {
  container.innerHTML = "";
  const svg = el("svg", { class: "graph breit", role: "img", "aria-label": "Schar von Bremsweg-Graphen" });
  container.appendChild(svg);
  const k = achsen(svg, { W: 760, H: 380 });
  const gSchar = el("g", {}, svg);
  const ref = kurve(svg, k, 1, { stroke: FARBE.grau, "stroke-dasharray": "8 6", "stroke-width": 2.5 });
  const gAkt = el("g", {}, svg);
  const info = document.createElement("div"); info.className = "info"; container.appendChild(info);

  function zeichne(a) {
    gAkt.innerHTML = "";
    kurve(gAkt, k, a, { stroke: FARBE.objekt, "stroke-width": 4 });
    const s100 = bremsweg(100, a);
    const vEnde = s100 > k.ymax ? 10 * Math.sqrt(k.ymax / a) : 100;
    txt(gAkt, k.X(vEnde) - 8, k.Y(bremsweg(vEnde, a)) + 22, `a = ${fmt(a, 2)}`, { "text-anchor": "end", fill: FARBE.objekt, "font-weight": 700, "font-size": 15 });
    txt(gAkt, k.X(100) - 4, k.Y(100) - 8, "a = 1 (normal)", { "text-anchor": "end", fill: "#646a72", "font-size": 12 });
    const art = a < 0.75 ? "wie eine Gefahrenbremsung (stärker bremsen)" : a > 1.05 ? "wie glatte, nasse Fahrbahn (schlechter bremsen)" : "normale Bremsung";
    info.innerHTML = `s = <b style="color:${FARBE.objekt}">${fmt(a, 2)}</b> · (v : 10)² – ${art}.<br>
      Nicht ein Punkt ändert sich, sondern <b>der ganze Graph</b>: Er wird gestreckt oder gestaucht, bleibt aber eine Parabel durch den Ursprung.`;
  }
  if (statisch) {
    [0.5, 1.2].forEach((a) => kurve(gSchar, k, a, { stroke: "#cfd1cf", "stroke-width": 2 }));
    zeichne(0.5);
    return;
  }
  const ctl = document.createElement("div"); ctl.className = "steuerung"; container.prepend(ctl);
  const inp = regler(ctl, { label: "Faktor a", min: 0.3, max: 1.5, step: 0.05, value: 0.5, oninput: zeichne });
  const knopf = document.createElement("div"); knopf.className = "knoepfe";
  knopf.innerHTML = `<button data-a="1">normal (a = 1)</button><button data-a="0.5">Gefahrenbremsung (a = 0,5)</button><button data-schar>Schar zeigen</button>`;
  knopf.addEventListener("click", (e) => {
    const b = e.target.closest("button"); if (!b) return;
    if (b.hasAttribute("data-schar")) {
      const an = b.classList.toggle("an");
      gSchar.innerHTML = "";
      if (an) for (let a = 0.3; a <= 1.51; a += 0.2) kurve(gSchar, k, a, { stroke: "#e4e5e3", "stroke-width": 2 });
      return;
    }
    inp.value = b.dataset.a; inp.dispatchEvent(new Event("input"));
  });
  ctl.appendChild(knopf);
}

const VIZ = { zuordnung: vizZuordnung, kovariation: vizKovariation, objekt: vizObjekt };
