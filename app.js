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
    weekLabel: "Week of May 23–29, 2026",
    dateRange: "Saturday, May 23 – Friday, May 29, 2026",
    sports: [
      {
        name: "Baseball",
        record: "🏆 5x Grossmont Hills League Champions — Still alive in CIF (double-elimination)",
        games: [
          { date: "Wed 5/27", opponent: "CIF Playoffs", score: "", result: "L", notes: "First playoff loss — but CIF is DOUBLE ELIMINATION, so the Eagles are still alive! Next game upcoming — let's go Eagles!" }
        ]
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
        record: "Season complete — CIF run ended 5/5",
        games: []
      },
      {
        name: "Boys Volleyball",
        record: "20-13 — Season complete (GHL Champions)",
        games: []
      },
      {
        name: "Swimming & Diving",
        record: "🏆 Girls GHL Champions | 2 CIF Champs — Austin Felio & Ella Morgan headed to STATE!",
        games: [
          { date: "CIF Champions", opponent: "Austin Felio & Ella Morgan", score: "1st Place", result: "W", notes: "🏆 BOTH WON CIF and qualified for the CIF California State Championships! Outstanding achievement!" },
          { date: "This Week", opponent: "CIF San Diego Championships", score: "", result: "", notes: "🏆 Boys and Girls Swim & Dive teams competed at the CIF San Diego Section Championships — represent Eagles!" }
        ]
      },
      {
        name: "Track & Field",
        record: "🏆 5th Place at CIF San Diego Section Finals!",
        games: [
          { date: "Sat 5/23", opponent: "CIF San Diego Section Finals", score: "5th Place", result: "W", notes: "🏆 Eagles finished FIFTH overall at the CIF Section Finals at Mt. Carmel HS — outstanding postseason performance!" }
        ]
      },
      {
        name: "Boys Tennis",
        record: "Season complete",
        games: []
      },
      {
        name: "Boys Golf",
        record: "No events this week",
        games: []
      }
    ],
    notables: [
      "🏆 Track & Field — Eagles finished 5TH PLACE at the CIF San Diego Section Finals on Saturday at Mt. Carmel! Tremendous postseason performance!",
      "Baseball — Eagles dropped Wednesday's CIF Playoff game, but they're still ALIVE — CIF is double-elimination! Go Eagles!"
    ],
    principalMemo: `Dear Dr. Jesperson,

I'm pleased to share this week's Eagle Athletics update for the week of May 23–29, 2026. A quieter week overall, with one fantastic team result and the end of an outstanding baseball season to report.

Track & Field delivered the highlight of the week, finishing FIFTH PLACE at the CIF San Diego Section Finals on Saturday, May 23, at Mt. Carmel High School. To place 5th in a section as competitive as San Diego is a real achievement and a great team effort by our athletes and coaches.

Baseball dropped their first CIF Playoff game on Wednesday — however, the CIF tournament is double-elimination, so the Eagles are still alive in the bracket. The 5-time defending Grossmont Hills League champions will look to rebound and continue their postseason run. We will share updates as the bracket progresses.

The rest of our spring programs have wrapped their seasons. Boys Lacrosse finished as CIF Finalists. Boys Volleyball finished as Grossmont Hills League champions. Our Girls Swim & Dive team are Grossmont Hills League champions, with Austin Felio and Ella Morgan competing at the CIF California State Championships.

It has been a tremendous spring for Eagle Athletics overall. Thank you, as always, for your continued support.

Go Eagles!

James Davis
Athletic Director
Granite Hills High School`,

    paScript: `Good morning, Eagles! A few quick athletics updates as the spring season wraps up.

Big shoutout to our Eagle Track and Field team — they took 5TH PLACE at the CIF San Diego Section Finals at Mt. Carmel this past Saturday! Fifth place in the entire section — that is a HUGE accomplishment! Way to go, Eagles!

Eagle Baseball dropped their first CIF Playoff game on Wednesday — BUT — CIF is double-elimination, Eagles, which means our 5-time defending league champions are STILL ALIVE in the bracket! Let's rally behind these Eagles and bring home a CIF run! Game info coming soon — let's GO Eagles!

What a spring it has been so far — CIF finalist boys lacrosse, league champion boys volleyball, league champion girls swim and dive with two CIF champions headed to STATE, and our 5-time league champ baseball team still battling in CIF. THIS is Eagle Athletics! Go Eagles!`
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
