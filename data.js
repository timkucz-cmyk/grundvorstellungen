// Grundvorstellungen (GV) – Datenbasis
// Jedes Konzept hat mehrere GV. ab/bis = Klassenstufe (Vorschlag, mit Fachcurriculum abgleichen).
// Formulierungen eigene Zusammenfassungen nach der Literatur (siehe QUELLEN).

const STUFEN = ["5", "6", "7", "8", "9", "10", "E", "Q1", "Q2"];

const LEITIDEEN = {
  Z: { name: "Zahl und Operation", farbe: "#2563eb" },
  G: { name: "Größen und Messen", farbe: "#b45309" },
  R: { name: "Raum und Form", farbe: "#047857" },
  F: { name: "Funktionaler Zusammenhang", farbe: "#7c3aed" },
  D: { name: "Daten und Zufall", farbe: "#be123c" },
};

const KONZEPTE = [
  // ---------- Zahl und Operation ----------
  { id: "addition", name: "Addition", leitidee: "Z", gv: [
    { name: "Hinzufügen", kurz: "Zu einer Menge kommt etwas dazu (dynamisch).", ab: "5", bis: "6" },
    { name: "Zusammenfassen", kurz: "Zwei Mengen werden gleichzeitig betrachtet und vereinigt (statisch).", ab: "5", bis: "6" },
    { name: "Vorwärtsgehen", kurz: "Schritte nach rechts auf dem Zahlenstrahl.", ab: "5", bis: "7" },
  ]},
  { id: "subtraktion", name: "Subtraktion", leitidee: "Z", gv: [
    { name: "Wegnehmen", kurz: "Von einer Menge wird etwas entfernt.", ab: "5", bis: "6" },
    { name: "Ergänzen", kurz: "Wie viel fehlt bis zum Ziel?", ab: "5", bis: "6" },
    { name: "Vergleichen", kurz: "Wie groß ist der Unterschied zwischen zwei Zahlen?", ab: "5", bis: "7" },
  ]},
  { id: "multiplikation", name: "Multiplikation", leitidee: "Z", gv: [
    { name: "Wiederholte Addition", kurz: "3 · 4 heißt: dreimal die 4 nacheinander.", ab: "5", bis: "6" },
    { name: "Rechteckfeld", kurz: "Ein Feld aus 3 Reihen zu je 4 – alles auf einen Blick.", ab: "5", bis: "8" },
    { name: "Vervielfachen", kurz: "„Dreimal so viel wie …“ – ein Vergleich.", ab: "5", bis: "7" },
    { name: "Kombinieren", kurz: "Jedes mit jedem: 3 Hosen, 4 Shirts → 12 Outfits.", ab: "5", bis: "Q2" },
    { name: "Strecken und Stauchen", kurz: "Multiplizieren mit einem Faktor skaliert – mit Faktor < 1 wird es kleiner.", ab: "6", bis: "Q2" },
  ]},
  { id: "division", name: "Division", leitidee: "Z", gv: [
    { name: "Aufteilen", kurz: "Wie oft passt 4 in 12?", ab: "5", bis: "6" },
    { name: "Verteilen", kurz: "12 auf 4 gerecht verteilt – wie viel bekommt jeder?", ab: "5", bis: "6" },
    { name: "Umkehrung der Multiplikation", kurz: "12 : 4 ist die Zahl, die mal 4 wieder 12 ergibt.", ab: "5", bis: "8" },
  ]},
  { id: "bruch", name: "Bruch", leitidee: "Z", gv: [
    { name: "Teil eines Ganzen", kurz: "Ein Ganzes in gleich große Teile zerlegt, einige davon genommen.", ab: "6", bis: "7" },
    { name: "Teil mehrerer Ganzer", kurz: "3/4 als ein Viertel von drei Pizzen.", ab: "6", bis: "7" },
    { name: "Anteil (Operator)", kurz: "„3/4 von 20 €“ – der Bruch wirkt auf eine Größe.", ab: "6", bis: "Q2" },
    { name: "Verhältnis", kurz: "3 zu 4 – Teil zu Teil statt Teil zum Ganzen.", ab: "6", bis: "9" },
    { name: "Quotient", kurz: "3/4 ist das Ergebnis von 3 : 4.", ab: "6", bis: "8" },
    { name: "Zahl auf dem Zahlenstrahl", kurz: "Jeder Bruch ist ein Punkt – zwischen 0 und 1 liegen unendlich viele.", ab: "6", bis: "Q2" },
  ]},
  { id: "dezimalzahl", name: "Dezimalzahl", leitidee: "Z", gv: [
    { name: "Stellenwert", kurz: "Zehntel, Hundertstel … setzen die Stellentafel nach rechts fort.", ab: "6", bis: "8" },
    { name: "Zehnerbruch", kurz: "0,25 ist eine andere Schreibweise für 25/100.", ab: "6", bis: "8" },
    { name: "Verfeinerung", kurz: "Zwischen zwei Markierungen am Zahlenstrahl wird immer feiner unterteilt.", ab: "6", bis: "8" },
  ]},
  { id: "prozent", name: "Prozent", leitidee: "Z", gv: [
    { name: "Hundertstel-Anteil", kurz: "p % heißt p von 100.", ab: "7", bis: "10" },
    { name: "Vergleichsmaß", kurz: "Prozent macht Anteile mit verschiedenen Grundwerten vergleichbar.", ab: "7", bis: "Q2" },
    { name: "Operator (Faktor)", kurz: "+19 % heißt mal 1,19.", ab: "7", bis: "Q2" },
  ]},
  { id: "negative-zahlen", name: "Negative Zahlen", leitidee: "Z", gv: [
    { name: "Gegenzahl", kurz: "−3 liegt spiegelbildlich zu 3 am Nullpunkt.", ab: "6", bis: "8" },
    { name: "Zustand und Änderung", kurz: "Kontostand −20 € (Zustand) vs. Abbuchung −20 € (Änderung).", ab: "6", bis: "8" },
    { name: "Pfeil auf der Zahlengeraden", kurz: "Zahlen als gerichtete Schritte – Vorzeichen ist die Richtung.", ab: "6", bis: "9" },
    { name: "Neutralisieren", kurz: "+1 und −1 heben sich auf (Plus-/Minus-Plättchen).", ab: "6", bis: "8" },
  ]},
  { id: "variable", name: "Variable", leitidee: "Z", gv: [
    { name: "Unbekannte", kurz: "x steht für eine bestimmte, noch unbekannte Zahl.", ab: "7", bis: "Q2" },
    { name: "Platzhalter / allgemeine Zahl", kurz: "x steht für jede Zahl, die man einsetzen darf.", ab: "7", bis: "Q2" },
    { name: "Veränderliche", kurz: "x durchläuft Werte – der Term ändert sich mit.", ab: "7", bis: "Q2" },
    { name: "Kalkül", kurz: "Mit x wird nach Regeln gerechnet, ohne an Zahlen zu denken.", ab: "8", bis: "Q2" },
  ]},
  { id: "term", name: "Term", leitidee: "Z", gv: [
    { name: "Rechenanweisung", kurz: "Ein Term sagt, was mit einer Zahl zu tun ist.", ab: "7", bis: "9" },
    { name: "Struktur / Objekt", kurz: "Ein Term ist ein Ganzes mit Bauplan (Summe, Produkt …).", ab: "8", bis: "Q2" },
  ]},
  { id: "gleichheitszeichen", name: "Gleichheitszeichen", leitidee: "Z", gv: [
    { name: "Ergibt-Zeichen", kurz: "Links rechnen, rechts steht das Ergebnis (operational).", ab: "5", bis: "6" },
    { name: "Gleichwertigkeit", kurz: "Beide Seiten haben denselben Wert (relational).", ab: "5", bis: "Q2" },
  ]},
  { id: "gleichung", name: "Gleichung", leitidee: "Z", gv: [
    { name: "Waage", kurz: "Gleichgewicht bleibt, wenn man auf beiden Seiten dasselbe tut.", ab: "7", bis: "9" },
    { name: "Frage nach passenden Zahlen", kurz: "Für welche x stimmt die Aussage?", ab: "7", bis: "Q2" },
    { name: "Schnitt zweier Graphen", kurz: "f(x) = g(x) – wo treffen sich die Graphen?", ab: "8", bis: "Q2" },
  ]},
  { id: "potenz", name: "Potenz", leitidee: "Z", gv: [
    { name: "Wiederholte Multiplikation", kurz: "2⁵ heißt fünfmal mit 2 multiplizieren.", ab: "7", bis: "10" },
    { name: "Größenordnung", kurz: "Zehnerpotenzen zeigen, wie groß oder klein etwas ist.", ab: "7", bis: "Q2" },
    { name: "Wachstumsfaktor", kurz: "aⁿ: n Schritte mit dem Faktor a.", ab: "10", bis: "Q2" },
  ]},
  { id: "wurzel", name: "Wurzel", leitidee: "Z", gv: [
    { name: "Seitenlänge eines Quadrats", kurz: "√9 ist die Seite des Quadrats mit Fläche 9.", ab: "9", bis: "10" },
    { name: "Umkehrung des Quadrierens", kurz: "Welche positive Zahl ergibt quadriert 9?", ab: "9", bis: "Q2" },
  ]},
  { id: "logarithmus", name: "Logarithmus", leitidee: "Z", gv: [
    { name: "Gesuchter Exponent", kurz: "log₂ 32: Wie oft muss ich mit 2 multiplizieren?", ab: "10", bis: "Q2" },
    { name: "Umkehrung der Exponentialfunktion", kurz: "Vom Bestand zurück zur Zeit.", ab: "10", bis: "Q2" },
  ]},

  // ---------- Größen und Messen ----------
  { id: "groessen", name: "Größen und Messen", leitidee: "G", gv: [
    { name: "Vergleich mit Einheit", kurz: "Messen heißt zählen, wie oft die Einheit hineinpasst.", ab: "5", bis: "7" },
    { name: "Stützpunkte", kurz: "Bekannte Repräsentanten: 1 m ≈ Türbreite, 1 kg ≈ Milchpackung.", ab: "5", bis: "Q2" },
    { name: "Verfeinern der Einheit", kurz: "Passt es nicht genau, nimm eine kleinere Einheit.", ab: "5", bis: "7" },
  ]},
  { id: "flaecheninhalt", name: "Flächeninhalt", leitidee: "G", gv: [
    { name: "Auslegen", kurz: "Wie viele Einheitsquadrate passen hinein?", ab: "5", bis: "7" },
    { name: "Zerlegen und Ergänzen", kurz: "Umlegen ändert den Flächeninhalt nicht.", ab: "5", bis: "9" },
    { name: "Produkt von Längen", kurz: "Rechteck: Reihen mal Spalten von Einheitsquadraten.", ab: "5", bis: "Q2" },
  ]},
  { id: "volumen", name: "Volumen", leitidee: "G", gv: [
    { name: "Ausfüllen", kurz: "Wie viele Einheitswürfel passen hinein?", ab: "5", bis: "7" },
    { name: "Schichten", kurz: "Grundfläche mal Höhe – Schicht auf Schicht.", ab: "6", bis: "10" },
  ]},
  { id: "umfang", name: "Umfang", leitidee: "G", gv: [
    { name: "Länge des Randes", kurz: "Den Rand abwickeln und als Strecke messen.", ab: "5", bis: "9" },
  ]},

  // ---------- Raum und Form ----------
  { id: "winkel", name: "Winkel", leitidee: "R", gv: [
    { name: "Drehung", kurz: "Wie weit wurde gedreht?", ab: "5", bis: "Q2" },
    { name: "Knick / Ecke", kurz: "Zwei Schenkel von einem Scheitel aus (statisch).", ab: "5", bis: "8" },
    { name: "Richtungsunterschied", kurz: "Wie stark weichen zwei Richtungen voneinander ab?", ab: "5", bis: "Q2" },
  ]},
  { id: "kongruenz", name: "Kongruenz", leitidee: "R", gv: [
    { name: "Deckungsgleichheit", kurz: "Durch Verschieben, Drehen, Spiegeln aufeinanderlegbar.", ab: "5", bis: "8" },
  ]},
  { id: "aehnlichkeit", name: "Ähnlichkeit", leitidee: "R", gv: [
    { name: "Vergrößern / Verkleinern", kurz: "Alle Längen mit demselben Faktor.", ab: "9", bis: "10" },
    { name: "Gleiche Form", kurz: "Gleiche Winkel, gleiche Längenverhältnisse.", ab: "9", bis: "10" },
  ]},
  { id: "pythagoras", name: "Satz des Pythagoras", leitidee: "R", gv: [
    { name: "Flächen über den Seiten", kurz: "Die beiden kleinen Quadrate füllen zusammen das große.", ab: "9", bis: "10" },
    { name: "Abstand berechnen", kurz: "Wie weit ist es „schräg“?", ab: "9", bis: "Q2" },
  ]},
  { id: "vektor", name: "Vektor", leitidee: "R", gv: [
    { name: "Verschiebung", kurz: "Alle gleich langen, gleich gerichteten Pfeile sind derselbe Vektor.", ab: "E", bis: "Q2" },
    { name: "Zahlentupel", kurz: "Ein Vektor ist eine Liste von Koordinaten.", ab: "E", bis: "Q2" },
    { name: "Gerichtete Größe", kurz: "Betrag und Richtung – wie Kraft oder Geschwindigkeit.", ab: "E", bis: "Q2" },
  ]},
  { id: "koordinaten", name: "Koordinaten", leitidee: "R", gv: [
    { name: "Adresse eines Punktes", kurz: "Erst nach rechts, dann nach oben.", ab: "5", bis: "Q2" },
  ]},

  // ---------- Funktionaler Zusammenhang ----------
  { id: "funktionaler-zusammenhang", name: "Funktionaler Zusammenhang", leitidee: "F", ausarbeitung: "fz", gv: [
    { name: "Zuordnung", kurz: "Jedem x wird genau ein y zugeordnet.", ab: "5", bis: "Q2" },
    { name: "Kovariation", kurz: "Ändert sich x, ändert sich y – wie?", ab: "6", bis: "Q2" },
    { name: "Objekt", kurz: "Die Funktion als Ganzes – mit Eigenschaften, die man verändern kann.", ab: "8", bis: "Q2" },
  ]},
  { id: "proportionalitaet", name: "Proportionalität", leitidee: "F", gv: [
    { name: "Vervielfachen", kurz: "Doppelt so viel x → doppelt so viel y.", ab: "7", bis: "Q2" },
    { name: "Konstanter Quotient", kurz: "y : x ist immer gleich (Proportionalitätsfaktor).", ab: "7", bis: "10" },
    { name: "Ursprungsgerade", kurz: "Der Graph ist eine Gerade durch (0|0).", ab: "7", bis: "10" },
  ]},
  { id: "steigung", name: "Steigung (linear)", leitidee: "F", gv: [
    { name: "Konstante Änderungsrate", kurz: "Pro Schritt nach rechts immer gleich viel nach oben.", ab: "8", bis: "Q2" },
    { name: "Neigung", kurz: "Wie steil ist die Gerade? (Steigungsdreieck)", ab: "8", bis: "Q2" },
  ]},
  { id: "exponentiell", name: "Exponentielles Wachstum", leitidee: "F", gv: [
    { name: "Konstanter Faktor", kurz: "Pro Schritt wird mit demselben Faktor multipliziert.", ab: "10", bis: "Q2" },
    { name: "Prozentuale Änderung", kurz: "Pro Schritt gleicher Prozentsatz – nicht gleicher Betrag.", ab: "10", bis: "Q2" },
  ]},
  { id: "parameter", name: "Parameter", leitidee: "F", gv: [
    { name: "Formgeber", kurz: "Ein Parameter verändert den ganzen Graphen (Schar).", ab: "9", bis: "Q2" },
  ]},
  { id: "grenzwert", name: "Grenzwert", leitidee: "F", gv: [
    { name: "Annäherung", kurz: "Die Werte kommen einer Zahl beliebig nahe (dynamisch).", ab: "E", bis: "Q2" },
    { name: "Objekt", kurz: "Der Grenzwert ist eine feste Zahl (statisch).", ab: "E", bis: "Q2" },
  ]},
  { id: "ableitung", name: "Ableitung", leitidee: "F", gv: [
    { name: "Lokale Änderungsrate", kurz: "Wie schnell ändert sich f genau an dieser Stelle?", ab: "E", bis: "Q2" },
    { name: "Tangentensteigung", kurz: "Steigung der Geraden, die den Graphen dort berührt.", ab: "E", bis: "Q2" },
    { name: "Lokale Linearität", kurz: "Stark hineingezoomt sieht der Graph wie eine Gerade aus.", ab: "E", bis: "Q2" },
    { name: "Verstärkungsfaktor", kurz: "Kleine Änderung in x wird mit f′(x) multipliziert.", ab: "Q1", bis: "Q2" },
  ]},
  { id: "integral", name: "Integral", leitidee: "F", gv: [
    { name: "Orientierter Flächeninhalt", kurz: "Fläche zwischen Graph und x-Achse, unten negativ.", ab: "Q1", bis: "Q2" },
    { name: "Rekonstruktion", kurz: "Aus der Änderungsrate den Bestand zurückgewinnen.", ab: "Q1", bis: "Q2" },
    { name: "Kumulation", kurz: "Summe vieler kleiner Produkte (Rate · Zeit).", ab: "Q1", bis: "Q2" },
    { name: "Mittelwert", kurz: "Integral geteilt durch Intervallbreite = mittlere Höhe.", ab: "Q1", bis: "Q2" },
  ]},

  // ---------- Daten und Zufall ----------
  { id: "wahrscheinlichkeit", name: "Wahrscheinlichkeit", leitidee: "D", gv: [
    { name: "Klassisch (Laplace)", kurz: "Gleich wahrscheinliche Ergebnisse: günstige durch mögliche.", ab: "6", bis: "Q2" },
    { name: "Frequentistisch", kurz: "Relative Häufigkeit auf lange Sicht.", ab: "6", bis: "Q2" },
    { name: "Subjektiv", kurz: "Wie sehr vertraue ich darauf, dass es eintritt?", ab: "6", bis: "Q2" },
  ]},
  { id: "mittelwert", name: "Arithmetisches Mittel", leitidee: "D", gv: [
    { name: "Ausgleich", kurz: "Alles gerecht verteilen – jeder bekommt gleich viel.", ab: "5", bis: "Q2" },
    { name: "Schwerpunkt", kurz: "Die Daten balancieren auf dem Mittelwert.", ab: "6", bis: "Q2" },
    { name: "Repräsentant", kurz: "Ein typischer Wert für die ganze Gruppe.", ab: "5", bis: "Q2" },
  ]},
  { id: "median", name: "Median", leitidee: "D", gv: [
    { name: "Mitte der Rangliste", kurz: "Die Hälfte liegt darunter, die Hälfte darüber.", ab: "6", bis: "Q2" },
  ]},
  { id: "streuung", name: "Streuung", leitidee: "D", gv: [
    { name: "Abweichung vom Mittel", kurz: "Wie weit liegen die Daten im Schnitt vom Mittelwert weg?", ab: "8", bis: "Q2" },
  ]},
  { id: "erwartungswert", name: "Erwartungswert", leitidee: "D", gv: [
    { name: "Langfristiger Mittelwert", kurz: "Was kommt bei sehr vielen Durchführungen im Schnitt heraus?", ab: "10", bis: "Q2" },
    { name: "Schwerpunkt der Verteilung", kurz: "Wo balanciert das Histogramm?", ab: "Q1", bis: "Q2" },
  ]},
  { id: "bedingte-wkt", name: "Bedingte Wahrscheinlichkeit", leitidee: "D", gv: [
    { name: "Eingeschränkte Grundgesamtheit", kurz: "Nur noch die Fälle betrachten, in denen B eingetreten ist.", ab: "10", bis: "Q2" },
  ]},
];

const QUELLEN = [
  "vom Hofe, R. (1995): Grundvorstellungen mathematischer Inhalte. Heidelberg: Spektrum.",
  "vom Hofe, R. & Blum, W. (2016): „Grundvorstellungen“ as a Category of Subject-Matter Didactics. JMD 37, Suppl. 1.",
  "Vollrath, H.-J. (1989): Funktionales Denken. Journal für Mathematik-Didaktik 10(1), 3–37.",
  "Malle, G. (2000): Zwei Aspekte von Funktionen: Zuordnung und Kovariation. mathematik lehren 103.",
  "Malle, G. (1993): Didaktische Probleme der elementaren Algebra. Braunschweig: Vieweg.",
  "Greefrath, G., Oldenburg, R., Siller, H.-S., Ulm, V. & Weigand, H.-G. (2016): Didaktik der Analysis. Berlin: Springer.",
  "Padberg, F. & Wartha, S. (2017): Didaktik der Bruchrechnung. Berlin: Springer.",
];

// ---------- Ausarbeitungen (Detailseiten) ----------
const AUSARBEITUNGEN = {
  fz: {
    titel: "Funktionaler Zusammenhang",
    einleitung: "Funktionales Denken hat drei Seiten. Wer eine Funktion „verstanden“ hat, kann zwischen allen drei wechseln – je nach Frage. Fehlt eine Seite, entstehen typische, sehr stabile Fehler.",
    kontext: "Durchgehendes Beispiel: <b>Bremsweg</b> nach der Fahrschul-Faustformel <b>s = (v : 10)²</b> (v in km/h, s in m). Dieselbe Situation, drei Blickwinkel.",
    gv: [
      {
        key: "zuordnung",
        name: "Zuordnung",
        leitfrage: "Welcher Wert gehört zu …?",
        kern: "Jedem Wert der einen Größe wird <b>genau ein</b> Wert der anderen Größe zugeordnet. Der Blick geht auf <b>einzelne Wertepaare</b> – punktweise, statisch.",
        bilder: "Pfeildiagramm · Wertetabelle · Funktionsmaschine (Eingabe → Ausgabe) · Ablesen am Graphen",
        fehler: [
          "<b>Graph als Bild</b>: Der Graph einer Fahrt wird als Landkarte oder Bergstrecke gelesen („erst bergauf, dann bergab“).",
          "Achsen werden verwechselt: Zum Bremsweg wird die Geschwindigkeit abgelesen.",
          "„Eine Funktion braucht eine Formel.“ – Tabellen oder Messwerte gelten nicht als Funktion.",
        ],
        diagnose: "Lies ab: Welcher Bremsweg gehört zu 70 km/h? Welche Geschwindigkeit gehört zu einem Bremsweg von 25 m?",
        loesung: "s(70) = 49 m. Rückwärts: (v : 10)² = 25 ⇒ v = 50 km/h. Wer hier rät statt abzulesen, hat die Richtung der Zuordnung nicht sicher.",
        stufen: "ab Kl. 5/6 (Tabellen, Diagramme) · Kl. 7 Zuordnungen · Kl. 8 Funktionsbegriff · bis Q2 (Umkehrfunktion, Definitionsmenge)",
      },
      {
        key: "kovariation",
        name: "Kovariation",
        leitfrage: "Wie ändert sich y, wenn sich x ändert?",
        kern: "Ändert sich die eine Größe, ändert sich die andere <b>mit</b>. Der Blick geht auf das <b>Änderungsverhalten</b>: Wie stark, in welche Richtung, gleichmäßig oder nicht? – dynamisch.",
        bilder: "Änderungsdreiecke · Differenzen in der Wertetabelle · „je – desto“-Sätze · Bewegung entlang des Graphen",
        fehler: [
          "<b>Illusion der Linearität</b>: „Doppelt so schnell – doppelt so langer Bremsweg.“ Tatsächlich: vierfach.",
          "Wert und Änderung werden verwechselt: „Wo der Graph am höchsten ist, wächst er am schnellsten.“",
          "„Je – desto“ wird nur qualitativ gesehen; ob die Zunahme gleichmäßig ist, bleibt unbeachtet.",
        ],
        diagnose: "Lukas sagt: „Wenn ich doppelt so schnell fahre, ist mein Bremsweg doppelt so lang.“ Nimm Stellung.",
        loesung: "Falsch: s(50) = 25 m, s(100) = 100 m – vierfacher Bremsweg. Pro +10 km/h wächst der Zuwachs (+1, +3, +5, +7 … m).",
        stufen: "ab Kl. 6/7 (je – desto, Proportionalität) · Kl. 8 Steigung · E-Phase mittlere/lokale Änderungsrate · Q Ableitung",
      },
      {
        key: "objekt",
        name: "Objekt",
        leitfrage: "Wie sieht die ganze Funktion aus – und was passiert mit ihr?",
        kern: "Die Funktion ist ein <b>Ganzes</b>, ein eigenes mathematisches Objekt mit Eigenschaften (Form, Monotonie, Nullstellen …). Man kann sie als Ganzes verändern, vergleichen, verketten oder ableiten.",
        bilder: "Ganzer Graph auf einen Blick · Funktionenschar · Parameter verschieben/strecken · Funktionstyp erkennen",
        fehler: [
          "Der Graph wird nur als Punktmenge gesehen; globale Eigenschaften (steigend, symmetrisch) werden nicht erkannt.",
          "Parameter werden punktweise gedeutet („a verschiebt nur den Punkt bei 100“) statt als Wirkung auf den ganzen Graphen.",
          "Die Ableitungsfunktion wird nicht als neue Funktion begriffen, sondern als Zahl.",
        ],
        diagnose: "Skizziere den Bremsweg-Graphen für eine Gefahrenbremsung (a = 0,5) in dasselbe Koordinatensystem. Was bleibt gleich, was ändert sich?",
        loesung: "Gleich: Parabel durch (0|0), steigend, gleiche Form. Anders: an jeder Stelle halb so hoch – der ganze Graph wird mit 0,5 gestaucht.",
        stufen: "ab Kl. 8/9 (Funktionstypen, Parameter) · Kl. 10 Funktionenvergleich · E/Q Scharen, Ableitungsfunktion",
      },
    ],
    anschluss: [
      ["Zuordnung", "Wertetabelle (5/6) → Funktionsbegriff (8) → Umkehrfunktion, Definitionsmenge (Q)"],
      ["Kovariation", "je – desto (6) → konstante Steigung (8) → mittlere Änderungsrate (E) → Ableitung als lokale Änderungsrate (Q)"],
      ["Objekt", "Funktionstypen (9/10) → Parameter und Scharen (10/E) → Ableitungsfunktion als neue Funktion (Q)"],
    ],
    quellen: [0, 2, 3, 5],
  },
};
