# Grundvorstellungen Mathematik

Web-App für die Fachschaft Mathematik (LMG Uetersen): alle Grundvorstellungen (GV) sortierbar, knapp erklärt, visualisiert – als Grundlage, um sich auf verbindliche GV zu einigen.

Stand 24.11.2026: Entwurf für die Fachkonferenz. Vollständige Liste (39 Konzepte, 101 GV) als Kurzkarten; ausgearbeitet ist nur **Funktionaler Zusammenhang** als Muster.

## Aufbau
- `data.js` – alle Konzepte und GV (Leitidee, Kurzbeschreibung, Klassenstufen ab/bis) + Ausarbeitungen + Quellen
- `viz.js` – interaktive SVG-Visualisierungen (Kontext Bremsweg s = (v : 10)²)
- `app.js` – Übersicht (Karten / Entwicklungslinie, Filter nach Leitidee und Stufe, Suche), Detailseiten, Plakat-Ansicht
- `style.css` – inkl. Druck-Layout DIN A1 hoch

## Ansichten
- `#` Übersicht · `#k/<id>` Konzept · `#plakat/<id>` Plakat (DIN A1, nur für ausgearbeitete Konzepte)

## Lokal ansehen
Statische Seite ohne Build. Über einen lokalen Server öffnen (z. B. `python -m http.server` im Ordner `KI_Tools`, dann `/Grundvorstellungen/`).

## Neue Ausarbeitung ergänzen
1. In `data.js` beim Konzept `ausarbeitung: "<schluessel>"` setzen.
2. In `AUSARBEITUNGEN` einen Eintrag nach dem Muster `fz` anlegen.
3. In `viz.js` je GV eine Funktion `(container, {statisch})` schreiben und in `VIZ` registrieren.

Stufenangaben sind ein erster Vorschlag und müssen mit dem Fachcurriculum abgeglichen werden.
