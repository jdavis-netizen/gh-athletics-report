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
    weekLabel: "Week of June 27 – July 3, 2026 — Summer Break",
    dateRange: "Saturday, June 27 – Friday, July 3, 2026",
    sports: [
      {
        name: "Baseball",
        record: "Offseason — summer break (2026: 21-7, GHL Champions)",
        games: []
      },
      {
        name: "Softball",
        record: "Offseason — summer break",
        games: []
      },
      {
        name: "Boys Lacrosse",
        record: "Offseason — summer break (2026: CIF Section Finalist 🏆)",
        games: []
      },
      {
        name: "Girls Lacrosse",
        record: "Offseason — summer break",
        games: []
      },
      {
        name: "Boys Volleyball",
        record: "Offseason — summer break (2026: 20-13, GHL Champions 🏆)",
        games: []
      },
      {
        name: "Swimming & Diving",
        record: "Offseason — summer break (2026: Girls GHL Champions | 2 CIF Champions to State 🏆)",
        games: []
      },
      {
        name: "Track & Field",
        record: "Offseason — summer break (2026: 5th Place CIF San Diego Section Finals 🏆)",
        games: []
      },
      {
        name: "Boys Tennis",
        record: "Offseason — summer break",
        games: []
      },
      {
        name: "Boys Golf",
        record: "Offseason — summer break",
        games: []
      }
    ],
    notables: [
      "🦅 No competitions this week — Eagle student-athletes are on summer break following the close of an outstanding 2025–26 spring season.",
      "🏆 Season highlights still fresh: baseball (5x GHL Champions, 21-7), boys volleyball (GHL Champions), and girls swim & dive (GHL Champions) all captured league titles.",
      "🏆 Boys lacrosse finished as CIF San Diego Section Finalists, and track & field placed 5th at the CIF Section Finals.",
      "🏊 Swimmers Austin Felio and Ella Morgan closed the year as CIF Champions who competed at the CIF California State Championships.",
      "📅 Looking ahead: fall sports — football, girls volleyball, cross country, girls golf, field hockey, and water polo — begin practice in August. Go Eagles!"
    ],
    principalMemo: `Dear Dr. Jesperson,

I hope this note finds you enjoying the start of summer. There were no athletic competitions during the week of June 27 – July 3, as all of our teams remain on summer break following the conclusion of the 2025–26 spring season. I wanted to keep our weekly rhythm going with a brief check-in.

While the fields, pool, and courts are quiet this week, the accomplishments of our spring teams are still very much worth celebrating. Baseball closed the year as Grossmont Hills League Champions at 21-7, boys volleyball and girls swim & dive each brought home league titles of their own, boys lacrosse reached the CIF San Diego Section Final, and our track & field program placed 5th at the CIF Section Finals. Swimmers Austin Felio and Ella Morgan capped the season as CIF Champions who represented Granite Hills at the state level.

Our attention now turns toward the fall. Coaches are beginning to finalize summer conditioning and camp schedules, and fall sports — including football, girls volleyball, cross country, girls golf, field hockey, and water polo — will open practice in August. I will resume detailed weekly score reporting once competitions get underway.

Thank you, as always, for your continued support of Eagle Athletics. I hope you and your family have a restful and enjoyable holiday week.

Go Eagles!

James Davis
Athletic Director
Granite Hills High School`,

    paScript: `Good morning, Eagles, and happy summer! There are no events to report this week — our student-athletes are enjoying a well-earned break after an unforgettable spring season.

And what a spring it was! Baseball, boys volleyball, and girls swim and dive all brought home LEAGUE championships. Boys lacrosse made it all the way to the CIF Section Final, our track team placed 5th in the entire CIF San Diego Section, and swimmers Austin Felio and Ella Morgan won CIF titles and competed at the STATE championships!

Enjoy the break, Eagles — and get ready, because fall sports kick off in August! Have a safe and happy Fourth of July, and as always — GO EAGLES!`
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
