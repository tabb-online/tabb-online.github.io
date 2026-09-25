// TABB Padel – Preisgestaltung
// Jeder Eintrag enthält:
// startDate, endDate, start, end, price
//
// Datumsformat: YYYY-MM-DD
// Zeitformat: HH:MM
//
// Überschneidungen innerhalb derselben Gruppe werden im Rechner erkannt
// und als Warnung ausgegeben.

const PREISE = {
  werktag: [
    {
      startDate: "2026-01-01",
      endDate: "2099-12-31",
      start: "00:00",
      end: "17:00",
      price: 24.00
    },
    {
      startDate: "2026-01-01",
      endDate: "2099-12-31",
      start: "17:00",
      end: "24:00",
      price: 32.00
    }
  ],

  wochenende: [
    {
      startDate: "2026-01-01",
      endDate: "2099-12-31",
      start: "00:00",
      end: "24:00",
      price: 32.00
    }
  ],

  // Gewichtung für die Aufteilung des vollständigen Platzpreises.
  anteile: {
    gast: 1.00,
    padel: 0.50,
    tennis: 0.25
  }
};
