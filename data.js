// Grundvorstellungen (GV) – Datenbasis
// Jedes Konzept hat mehrere GV. ab/bis = Klassenstufe (Vorschlag, mit Fachcurriculum abgleichen).
// Formulierungen eigene Zusammenfassungen nach der Literatur (siehe QUELLEN).

const STUFEN = ["5", "6", "7", "8", "9", "10", "E", "Q1", "Q2"];

const LEITIDEEN = {
  Z: { name: "Zahl und Operation", kuerzel: "Z&O" },
  G: { name: "Größen und Messen", kuerzel: "G&M" },
  R: { name: "Raum und Form", kuerzel: "R&F" },
  F: { name: "Funktionaler Zusammenhang", kuerzel: "FZ" },
  D: { name: "Daten und Zufall", kuerzel: "D&Z" },
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

  // Größen und Messen, Raum und Form: siehe geometrie.js

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
// Kompakt: Bild + Erläuterungssatz sichtbar, alles Weitere ausklappbar.
const AUSARBEITUNGEN = {
  fz: {
    titel: "Funktionaler Zusammenhang",
    einleitung: "Eine Funktion – drei Blickwinkel. Verstanden hat den Begriff, wer zwischen ihnen wechseln kann.",
    kontext: "Durchgehendes Beispiel: Bremsweg s = (v : 10)² (v in km/h, s in m)",
    untertitel: "Eine Funktion – drei Blickwinkel",
    gv: [
      {
        key: "zuordnung", name: "Zuordnung",
        leitfrage: "Welcher Wert gehört zu …?",
        kern: "Jedem Wert der einen Größe wird <b>genau ein</b> Wert der anderen zugeordnet. Der Blick geht auf einzelne Wertepaare.",
        fehler: [
          "<b>Graph als Bild:</b> Eine Fahrt wird wie eine Bergstrecke gelesen.",
          "<b>Achsen verwechselt:</b> Zum Bremsweg wird die Geschwindigkeit abgelesen.",
        ],
        diagnose: "Welcher Bremsweg gehört zu 70 km/h? Welche Geschwindigkeit zu 25 m?",
        loesung: "49 m · 50 km/h",
        impuls: "<b>Funktionsmaschine:</b> Eine Person kennt die Regel, die Klasse ruft Eingaben und findet die Regel.",
        sprache: "„Zu 60 km/h gehört ein Bremsweg von 36 m.“",
        stufen: "Kl. 5/6 Tabellen · 7 Zuordnungen · 8 Funktionsbegriff · Q Umkehrfunktion",
      },
      {
        key: "kovariation", name: "Kovariation",
        leitfrage: "Wie ändert sich y, wenn sich x ändert?",
        kern: "Ändert sich die eine Größe, ändert sich die andere <b>mit</b>. Der Blick geht darauf, wie stark und wie gleichmäßig.",
        fehler: [
          "<b>Alles linear:</b> „Doppelt so schnell – doppelter Bremsweg.“ Tatsächlich: vierfach.",
          "<b>Wert statt Änderung:</b> „Wo der Graph hoch ist, wächst er schnell.“",
        ],
        diagnose: "„Doppelt so schnell heißt doppelt so langer Bremsweg.“ Stimmt das?",
        loesung: "Nein: s(50) = 25 m, s(100) = 100 m – vierfach.",
        impuls: "<b>Differenzenspalte:</b> In der Wertetabelle notieren, um wie viel s pro +10 km/h wächst.",
        sprache: "„Je schneller, desto länger – und zwar immer stärker.“",
        stufen: "Kl. 6/7 je – desto · 8 Steigung · E Änderungsrate · Q Ableitung",
      },
      {
        key: "objekt", name: "Objekt",
        leitfrage: "Wie sieht die ganze Funktion aus?",
        kern: "Die Funktion ist ein <b>Ganzes</b> mit Form und Eigenschaften – man kann sie als Ganzes verändern und vergleichen.",
        fehler: [
          "<b>Nur Punkte:</b> Eigenschaften wie „steigend“ oder „Parabel“ werden nicht gesehen.",
          "<b>Parameter punktweise:</b> Seine Wirkung auf den ganzen Graphen bleibt unbemerkt.",
        ],
        diagnose: "Skizziere den Graphen für eine Gefahrenbremsung (a = 0,5). Was bleibt, was ändert sich?",
        loesung: "Gleiche Parabelform durch (0|0), überall halb so hoch.",
        impuls: "<b>Graphen zuordnen:</b> normal, Gefahrenbremsung, nasse Fahrbahn – woran erkennst du es am ganzen Graphen?",
        sprache: "„Bei Gefahrenbremsung wird der ganze Graph gestaucht.“",
        stufen: "Kl. 8/9 Funktionstypen · 10 Parameter · E/Q Scharen, Ableitungsfunktion",
      },
    ],
    wechsel: {
      aufgabe: [
        ["Zuordnung", "Wie lang ist der Bremsweg bei 80 km/h?"],
        ["Kovariation", "Was bringt mehr: von 30 auf 20 km/h oder von 100 auf 90 km/h abbremsen?"],
        ["Objekt", "Auf nasser Fahrbahn ist der Bremsweg 1,5-mal so lang. Skizziere den Graphen."],
      ],
      loesung: "a) 64 m · b) 5 m gegenüber 19 m kürzer – bei hohem Tempo bringt es viel mehr · c) ganzer Graph mit 1,5 gestreckt",
    },
    anschluss: [
      ["Zuordnung", "Wertetabelle → Funktionsbegriff → Umkehrfunktion"],
      ["Kovariation", "je – desto → Steigung → Änderungsrate → Ableitung"],
      ["Objekt", "Funktionstypen → Parameter, Scharen → Ableitungsfunktion"],
    ],
    quellen: [0, 2, 3, 5],
  },
};
