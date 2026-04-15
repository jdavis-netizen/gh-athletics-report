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
    weekLabel: "Week of April 6–12, 2026",
    dateRange: "Monday, April 6 – Saturday, April 12, 2026",
    sports: [
      {
        name: "Baseball",
        record: "11-4 overall",
        games: [
          { date: "Wed 4/8", opponent: "vs Helix", score: "11-2", result: "W", notes: "Dominant home win to open Grossmont Hills League title defense" },
          { date: "Fri 4/10", opponent: "@ Helix", score: "1-6", result: "L", notes: "Romeo Briones (Helix) held Eagles to one hit over 6 innings" }
        ]
      },
      {
        name: "Softball",
        record: "4-8 overall",
        games: [
          { date: "Mon 4/6", opponent: "@ Olympian", score: "8-3", result: "W", notes: "" },
          { date: "Tue 4/7", opponent: "vs San Marcos", score: "6-16", result: "L", notes: "Taylor Nash: 2 RBI; Ariana Heninger: 2 RBI (6 innings)" },
          { date: "Fri 4/10", opponent: "vs Point Loma", score: "1-8", result: "L", notes: "" }
        ]
      },
      {
        name: "Boys Lacrosse",
        record: "9-3 overall",
        games: [
          { date: "Tue 4/7", opponent: "vs La Jolla", score: "14-3", result: "W", notes: "" },
          { date: "Wed 4/8", opponent: "vs Corona del Mar", score: "9-8", result: "W", notes: "Thrilling one-goal victory" },
          { date: "Fri 4/10", opponent: "vs West Hills", score: "15-2", result: "W", notes: "" }
        ]
      },
      {
        name: "Girls Lacrosse",
        record: "1-7 overall",
        games: [
          { date: "Fri 4/10", opponent: "vs Eastlake", score: "4-9", result: "L", notes: "" }
        ]
      },
      {
        name: "Boys Volleyball",
        record: "8-4 overall",
        games: [
          { date: "Mon 4/6", opponent: "@ El Cajon Valley", score: "3-0", result: "W", notes: "" },
          { date: "Wed 4/8", opponent: "vs El Capitan", score: "3-0", result: "W", notes: "" },
          { date: "Fri 4/10", opponent: "vs University City", score: "3-1", result: "W", notes: "" }
        ]
      },
      {
        name: "Swimming & Diving",
        record: "",
        games: [
          { date: "Fri 4/10", opponent: "vs Grossmont (Girls Varsity)", score: "108-72", result: "W", notes: "" },
          { date: "Fri 4/10", opponent: "vs Grossmont (Boys Varsity)", score: "90-72", result: "W", notes: "" }
        ]
      },
      {
        name: "Track & Field",
        record: "",
        games: [
          { date: "Thu 4/9", opponent: "vs Steele Canyon (Boys)", score: "49-86", result: "L", notes: "Source: Athletic.net" },
          { date: "Thu 4/9", opponent: "vs Steele Canyon (Girls)", score: "24-107", result: "L", notes: "Source: Athletic.net" }
        ]
      },
      {
        name: "Boys Tennis",
        record: "",
        games: [
          { date: "Thu 4/9", opponent: "vs Grossmont", score: "6-12", result: "L", notes: "" }
        ]
      },
      {
        name: "Boys Golf",
        record: "No events this week",
        games: []
      }
    ],
    notables: [
      "Baseball — 11-2 rout of Helix to open league title defense",
      "Boys Lacrosse — 3-0 week including a dramatic 9-8 win over Corona del Mar",
      "Boys Volleyball — Swept all 3 matches this week, now 8-4",
      "Swimming & Diving — Swept Grossmont in all 4 divisions (Girls 108-72, Boys 90-72)",
      "Taylor Nash & Ariana Heninger (Softball) — 2 RBI each vs San Marcos"
    ],
    principalMemo: `Dear Dr. Jesperson,

I'm pleased to share this week's athletics update for Granite Hills High School.

It was a busy week for Eagle Athletics with several strong showings across our spring sports programs.

Baseball split their Grossmont Hills League series with Helix. The Eagles opened with a dominant 11-2 victory at home on Wednesday before falling 1-6 on the road Friday, where Helix's Romeo Briones held our hitters to just one hit over six innings. The Eagles stand at 11-4 overall.

Boys Lacrosse had an outstanding 3-0 week, highlighted by a thrilling 9-8 victory over Corona del Mar on Wednesday. They also cruised past La Jolla (14-3) and West Hills (15-2), improving to 9-3 on the season. The team is ranked #27 in California.

Boys Volleyball continued its strong run with three straight wins — sweeping El Cajon Valley and El Capitan 3-0, and topping University City 3-1 — moving to 8-4 overall.

Softball went 1-2 this week, picking up a solid 8-3 win at Olympian before dropping games to San Marcos and Point Loma. Taylor Nash and Ariana Heninger each contributed 2 RBI in the San Marcos game.

Girls Lacrosse fell to Eastlake 4-9 and sits at 1-7 on the season. The team continues to battle through a rebuilding year.

Boys Tennis fell to Grossmont 6-12 on Thursday in league play.

Track & Field hosted Steele Canyon on Thursday. The boys fell 49-86 and the girls lost 24-107 in the dual meet. Steele Canyon is a strong program and our athletes competed hard.

Swimming & Diving swept Grossmont on Friday — the girls won 108-72 and the boys won 90-72. Both JV squads won as well. Boys Golf had no events this week.

Go Eagles!

James Davis
Athletic Director
Granite Hills High School`,

    paScript: `Good morning, Eagles! Here are your weekly athletics highlights:

Eagle Baseball opened their league title defense with a huge 11-2 win over Helix at home on Wednesday! The Eagles are now 11-4 on the season.

Our Boys Lacrosse team went 3-and-0 this week, including a thrilling 9-8 victory over Corona del Mar! They also beat La Jolla 14-3 and West Hills 15-2. The Eagles are 9-3 and ranked 27th in California!

Boys Volleyball is on a roll — they swept all three matches this week, beating El Cajon Valley, El Capitan, and University City to improve to 8-4.

Softball picked up a nice 8-3 road win at Olympian on Monday. Great effort from Taylor Nash and Ariana Heninger this week.

Swimming and Diving swept Grossmont on Friday — girls won 108-72 and boys won 90-72! Great showing in the pool.

Let's keep supporting all our Eagle athletes — check the schedule for this week's home games. Go Eagles!`
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
