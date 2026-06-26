/* ============================================================
   Granite Hills Eagle Athletics — Weekly Report App
   ============================================================ */

const DATA_KEY = 'gh_athletics_data';

function showApp() {
  const loginScreen = document.getElementById('login-screen');
  if (loginScreen) loginScreen.style.display = 'none';
  document.getElementById('app').style.display = 'block';
  document.getElementById('app').removeAttribute('hidden');
  loadReport();
}

// ===== TABS =====
document.querySelectorAll('.nav-link, .tab').forEach(tab => {
  tab.addEventListener('click', () => {
    document.querySelectorAll('.nav-link, .tab').forEach(t => t.classList.remove('active'));
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    tab.classList.add('active');
    document.getElementById('panel-' + tab.dataset.tab).classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// ===== COPY BUTTONS =====
document.querySelectorAll('.btn-copy').forEach(btn => {
  btn.addEventListener('click', () => {
    const el = document.getElementById(btn.dataset.copy);
    navigator.clipboard.writeText(el.innerText).then(() => {
      btn.innerHTML = 'Copied!';
      btn.classList.add('copied');
      setTimeout(() => { btn.innerHTML = 'Copy <span class="arrow">&rarr;</span>'; btn.classList.remove('copied'); }, 2000);
    });
  });
});

// ===== SAMPLE DATA =====
function getSampleData() {
  return {
    weekLabel: "Week of June 20–26, 2026 — Season Wrap-Up",
    dateRange: "Saturday, June 20 – Friday, June 26, 2026",
    sports: [
      {
        name: "Baseball",
        record: "21-7 overall (10-2 league, GHL Champions) — Season complete",
        games: []
      },
      {
        name: "Softball",
        record: "Season complete",
        games: []
      },
      {
        name: "Boys Lacrosse",
        record: "Season complete — CIF Finalist 🏆",
        games: []
      },
      {
        name: "Girls Lacrosse",
        record: "Season complete",
        games: []
      },
      {
        name: "Boys Volleyball",
        record: "20-13 — Season complete (GHL Champions 🏆)",
        games: []
      },
      {
        name: "Swimming & Diving",
        record: "🏆 Girls GHL Champions | 2 CIF Champions to State — Season complete",
        games: []
      },
      {
        name: "Track & Field",
        record: "5th Place CIF San Diego Section Finals 🏆 — Season complete",
        games: []
      },
      {
        name: "Boys Tennis",
        record: "Season complete",
        games: []
      },
      {
        name: "Boys Golf",
        record: "Season complete",
        games: []
      }
    ],
    notables: [
      "🦅 The 2026 spring season is officially in the books — and what a season it was! Granite Hills brought home league titles in baseball, boys volleyball, and girls swim & dive, plus CIF Section honors in lacrosse, track, and swimming.",
      "🏆 Baseball — 5x Grossmont Hills League Champions, finishing 21-7 overall (10-2 in league).",
      "🏆 Boys Lacrosse — CIF San Diego Section Finalists.",
      "🏆 Boys Volleyball — Grossmont Hills League Champions (20-13).",
      "🏆 Swimming & Diving — Girls GHL Champions, with Austin Felio and Ella Morgan crowned CIF Champions and advancing to the State Championships.",
      "🏆 Track & Field — 5th Place overall at the CIF San Diego Section Finals at Mt. Carmel.",
      "No events this week — student-athletes are on summer break. Best of luck to all our graduating seniors!"
    ],
    principalMemo: `Dear Dr. Jesperson,

With our student-athletes now on summer break and the 2025–26 athletic calendar complete, I wanted to close out our weekly reports with a brief recap of an outstanding spring season for Eagle Athletics. There were no competitions during the week of June 20–26, so this serves as our season wrap-up.

Our spring teams gave Granite Hills a great deal to be proud of. Baseball captured its fifth consecutive Grossmont Hills League championship, finishing 21-7 overall and 10-2 in league play. Boys Volleyball brought home a Grossmont Hills League title of their own, closing the year at 20-13. Boys Lacrosse advanced all the way to the CIF San Diego Section Final, finishing as Section Finalists.

The pool and the track produced individual and team milestones as well. Our Girls Swim & Dive team were crowned Grossmont Hills League Champions, and swimmers Austin Felio and Ella Morgan each won CIF titles and represented Granite Hills at the CIF California State Championships. On the track, our athletes finished 5th overall at the CIF San Diego Section Finals at Mt. Carmel High School — an impressive result in one of the most competitive sections in the state.

I want to thank our coaches, our athletes, and our families for their dedication throughout the spring, and to congratulate our graduating seniors as they move on to their next chapter. We look forward to picking back up with fall sports in August.

Thank you, as always, for your continued support of Eagle Athletics. Have a wonderful summer.

Go Eagles!

James Davis
Athletic Director
Granite Hills High School`,

    paScript: `Good morning, Eagles! As we close out the school year, let's take one more moment to celebrate an incredible spring for Eagle Athletics!

Your Eagles brought home the hardware this spring — baseball captured its FIFTH straight league championship, boys volleyball are league champions, and our girls swim and dive team are league champs too! Boys lacrosse made it all the way to the CIF Section FINAL, our track team placed 5th in the entire CIF San Diego Section, and swimmers Austin Felio and Ella Morgan won CIF titles and competed at the STATE championships!

There are no events this week — our student-athletes have earned a well-deserved summer break. A huge congratulations to all of our graduating seniors — once an Eagle, ALWAYS an Eagle!

Thank you to every athlete, coach, and family for an unforgettable year. We'll see you in the fall! Have a great summer, and as always — GO EAGLES!`
  };
}

// ===== RENDER =====
function loadReport() {
  const raw = localStorage.getItem(DATA_KEY);
  let data;
  if (raw) {
    try { data = JSON.parse(raw); } catch { data = getSampleData(); }
  } else {
    data = getSampleData();
    localStorage.setItem(DATA_KEY, JSON.stringify(data, null, 2));
  }
  render(data);
  document.getElementById('admin-editor').value = JSON.stringify(data, null, 2);
}

function render(data) {
  // Week label
  document.getElementById('week-label').textContent = data.weekLabel || '';
  document.getElementById('overview-date').textContent = data.dateRange || '';

  // Stats
  let totalWins = 0, totalLosses = 0, totalEvents = 0;
  const activeSports = (data.sports || []).filter(s => s.games && s.games.length > 0);
  activeSports.forEach(sport => {
    sport.games.forEach(g => {
      totalEvents++;
      if (g.result === 'W') totalWins++;
      else if (g.result === 'L') totalLosses++;
    });
  });
  document.getElementById('stat-wins').textContent = totalWins;
  document.getElementById('stat-losses').textContent = totalLosses;
  document.getElementById('stat-events').textContent = totalEvents;
  document.getElementById('stat-sports').textContent = activeSports.length;

  // Notables
  const notablesList = document.getElementById('notables-list');
  const notablesCard = document.getElementById('notables-card');
  if (data.notables && data.notables.length) {
    notablesCard.hidden = false;
    notablesList.innerHTML = data.notables.map(n => `<li>${esc(n)}</li>`).join('');
  } else {
    notablesCard.hidden = true;
  }

  // Sport Summary Grid (Overview)
  const grid = document.getElementById('sport-summary-grid');
  grid.innerHTML = activeSports.map(sport => {
    const results = sport.games.map(g => {
      const cls = g.result === 'W' ? 'result-w' : (g.result === 'L' ? 'result-l' : '');
      return `<div class="result-line"><span class="${cls}">${esc(g.result)}</span> ${esc(g.opponent)} ${esc(g.score)}</div>`;
    }).join('');
    return `
      <div class="sport-summary-card">
        <h4>${esc(sport.name)}</h4>
        <div class="sport-record">${esc(sport.record)}</div>
        <div class="sport-results-mini">${results}</div>
      </div>`;
  }).join('');

  // Scores Panel
  const scoresContainer = document.getElementById('scores-container');
  scoresContainer.innerHTML = activeSports.map(sport => {
    const rows = sport.games.map(g => {
      const cls = g.result === 'W' ? 'win' : (g.result === 'L' ? 'loss' : '');
      return `<tr>
        <td>${esc(g.date)}</td>
        <td>${esc(g.opponent)}</td>
        <td>${esc(g.score)}</td>
        <td class="col-result ${cls}">${esc(g.result)}</td>
        <td>${esc(g.notes || '')}</td>
      </tr>`;
    }).join('');
    return `
      <div class="sport-block">
        <h3>${esc(sport.name)}</h3>
        <div class="record-line">${esc(sport.record)}</div>
        <table class="game-table">
          <thead><tr><th>Date</th><th>Opponent</th><th>Score</th><th>Result</th><th>Notes</th></tr></thead>
          <tbody>${rows}</tbody>
        </table>
      </div>`;
  }).join('');

  // Memo
  document.getElementById('memo-body').textContent = data.principalMemo || '(No memo this week)';

  // PA Script
  document.getElementById('pa-body').textContent = data.paScript || '(No PA script this week)';
}

function esc(str) {
  if (!str) return '';
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// ===== ADMIN SAVE =====
document.getElementById('btn-save').addEventListener('click', () => {
  const status = document.getElementById('save-status');
  try {
    const data = JSON.parse(document.getElementById('admin-editor').value);
    localStorage.setItem(DATA_KEY, JSON.stringify(data, null, 2));
    render(data);
    status.textContent = 'Saved successfully!';
    status.className = 'save-status success';
    setTimeout(() => { status.textContent = ''; }, 3000);
  } catch (err) {
    status.textContent = 'Invalid JSON: ' + err.message;
    status.className = 'save-status error';
  }
});

document.getElementById('btn-load-sample').addEventListener('click', () => {
  const data = getSampleData();
  document.getElementById('admin-editor').value = JSON.stringify(data, null, 2);
});

// ===== INIT =====
// Clear old cached data so the latest built-in report always loads.
localStorage.removeItem(DATA_KEY);
showApp();
