const state = window.TABB_SPIELPLAN || {
  date: new Date().toISOString().slice(0, 10),
  courtCount: 6,
  matches: []
};

const courtGrid = document.getElementById("courtGrid");
const displayDate = document.getElementById("displayDate");
const emptyState = document.getElementById("emptyState");

function formatDate(dateValue) {
  if (!dateValue) return "";
  const date = new Date(dateValue + "T12:00:00");
  return new Intl.DateTimeFormat("de-DE", {
    weekday: "long", day: "2-digit", month: "long", year: "numeric"
  }).format(date);
}

function escapeHtml(value) {
  return String(value)
    .replaceAll("&", "&amp;").replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;").replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function render() {
  displayDate.textContent = formatDate(state.date);
  courtGrid.innerHTML = "";

  const courtCount = Math.max(1, Number(state.courtCount) || 1);
  const matches = Array.isArray(state.matches) ? state.matches : [];

  for (let court = 1; court <= courtCount; court++) {
    const courtMatches = matches
      .filter(m => Number(m.court) === court)
      .sort((a,b) => String(a.start).localeCompare(String(b.start)));

    const card = document.createElement("article");
    card.className = "court-card";

    const head = document.createElement("div");
    head.className = "court-head";
    head.innerHTML = `<div class="court-number">Platz ${court}</div><div class="court-status">${
      courtMatches.length ? `${courtMatches.length} Begegnung${courtMatches.length > 1 ? "en" : ""}` : "frei"
    }</div>`;
    card.appendChild(head);

    if (!courtMatches.length) {
      const free = document.createElement("div");
      free.className = "free-court";
      free.innerHTML = `<div><strong>Heute frei</strong><div>Keine Mannschaftsbegegnung</div></div>`;
      card.appendChild(free);
    } else {
      const list = document.createElement("div");
      list.className = "match-list";
      courtMatches.forEach(match => {
        const item = document.createElement("div");
        item.className = "match";
        item.innerHTML =
          `<div class="match-time">${escapeHtml(match.start || "")}${match.end ? " – " + escapeHtml(match.end) : ""} Uhr</div>` +
          `<div class="team-row"><div class="team-label">Heim</div><div class="team">${escapeHtml(match.home || "")}</div></div>` +
          `<div class="team-row"><div class="team-label">Gast</div><div class="team">${escapeHtml(match.away || "")}</div></div>`;
        list.appendChild(item);
      });
      card.appendChild(list);
    }
    courtGrid.appendChild(card);
  }
  emptyState.classList.toggle("hidden", courtCount > 0);
}

render();
