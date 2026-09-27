TABB Display POC v12

Neu aufgebaut nach der gewünschten festen Logik:

Browserfenster = 100 % Breite und 100 % Höhe.

Seite 1:
Platz 1 | Platz 2
Platz 3 | Platz 4
Platz 5 | Platz 6

Seite 2:
Platz 7 | Platz 8
Platz 9 | Platz 10
Platz 11 | Platz 12

Automatische Weiterschaltung: 10 Sekunden.

Wichtig:
- Kein horizontales Scrollen.
- Jede Court-Spalte ist exakt 50 % des verfügbaren Platzbereichs.
- Die drei Reihen teilen sich die verfügbare Höhe.
- Header und Sponsorenleiste bleiben stehen.
- Für den POC ist courtCount in spielplan.js auf 12 gesetzt, damit die Umschaltung 1-6 / 7-12 direkt getestet werden kann.
- Alle Dateien liegen weiterhin in einem Ordner.
- Version im index.html: v8

Änderung v9:
- Vor der Seitenanzeige 1 / 2 bzw. 2 / 2 befindet sich jetzt ein dezenter 10-Punkte-Fortschrittsindikator.
- Pro Sekunde wird bei der 10-Sekunden-Umschaltung ein weiterer Punkt blau.
- Sind alle Punkte erreicht, wird auf die nächste Court-Seite geschaltet und der Indikator beginnt von vorn.
- Dadurch ist aus der Entfernung erkennbar, wann der nächste Seitenwechsel kommt, ohne eine zusätzliche Sekundenanzeige einzublenden.

Änderung v10:
- Fortschrittsanzeige vor der Seitenzahl von 10 auf 4 Punkte reduziert.
- Die Anzeige entspricht grob den Zuständen 0 / 25 / 50 / 75 / 100 % bis zum nächsten Seitenwechsel.
- Seitenwechsel weiterhin nach 10 Sekunden.

Änderung v11:
- Die fünf sichtbaren Fortschrittszustände 0 / 25 / 50 / 75 / 100 % dauern jetzt gleich lang.
- Bei 10 Sekunden Seitenzeit: jeweils 2 Sekunden.
- Damit sind auch die vier vollständig ausgefüllten Punkte 2 Sekunden sichtbar, bevor die Seite wechselt.

Änderung v12:
- "Mannschaftsspiele" und das Datum des Spielplans wurden aus dem TABB-Header entfernt.
- Beide stehen jetzt direkt unter der scrollenden Sponsorenleiste und oberhalb des Willkommen-Blocks.
- Uhrzeit bleibt rechts neben dem TABB-Logo.
- Unter der Uhrzeit wird zusätzlich das aktuelle reale Datum angezeigt.
- Court-Matrix, 10-Sekunden-Umschaltung und 4-Punkte-Fortschrittsanzeige bleiben unverändert.
