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
    weekLabel: "Week of April 13–17, 2026",
    dateRange: "Monday, April 13 – Thursday, April 17, 2026",
    sports: [
      {
        name: "Baseball",
        record: "13-4 overall",
        games: [
          { date: "Mon 4/14", opponent: "@ El Capitan", score: "10-1", result: "W", notes: "Dominant road win in GHL opener vs. El Capitan" },
          { date: "Thu 4/16", opponent: "vs El Capitan", score: "3-1", result: "W", notes: "Completed the home-and-away sweep of El Capitan" }
        ]
      },
      {
        name: "Softball",
        record: "5-10 overall",
        games: [
          { date: "Mon 4/14", opponent: "vs Steele Canyon", score: "9-8", result: "W", notes: "Walk-off win in 9 innings in GHL play" },
          { date: "Thu 4/16", opponent: "@ West Hills", score: "2-0", result: "L", notes: "Shutout loss on the road" }
        ]
      },
      {
        name: "Boys Lacrosse",
        record: "10-3 overall",
        games: [
          { date: "Mon 4/14", opponent: "@ Santana", score: "14-5", result: "W", notes: "GHL win; Eagles continue strong league run" }
        ]
      },
      {
        name: "Girls Lacrosse",
        record: "2-7 overall",
        games: [
          { date: "Mon 4/14", opponent: "vs Valhalla", score: "7-5", result: "W", notes: "Home win; second victory of the season" }
        ]
      },
      {
        name: "Boys Volleyball",
        record: "10-10 overall, 5-0 GHL (1st place)",
        games: [
          { date: "Mon 4/13", opponent: "@ Helix", score: "3-1", result: "W", notes: "5th straight league win; Eagles are undefeated in GHL" },
          { date: "Wed 4/15", opponent: "vs West Hills", score: "", result: "", notes: "Score not yet posted" }
        ]
      },
      {
        name: "Swimming & Diving",
        record: "",
        games: [
          { date: "Thu 4/17", opponent: "vs West Hills", score: "", result: "", notes: "Meet scheduled for 4:00 PM today — score pending" }
        ]
      },
      {
        name: "Track & Field",
        record: "",
        games: [
          { date: "Mon 4/13", opponent: "5-Way Invitational (host)", score: "", result: "", notes: "Granite Hills hosted 5-team invitational; full results not yet available" },
          { date: "Thu 4/16", opponent: "@ West Hills", score: "", result: "", notes: "Dual meet results not yet posted" }
        ]
      },
      {
        name: "Boys Tennis",
        record: "",
        games: [
          { date: "Mon 4/14", opponent: "@ El Cajon Valley", score: "12-6", result: "W", notes: "GHL win" },
          { date: "Thu 4/16", opponent: "vs Southwest EC", score: "10-8", result: "W", notes: "GHL win; back-to-back league victories" }
        ]
      },
      {
        name: "Boys Golf",
        record: "No events this week",
        games: []
      }
    ],
    notables: [
      "Baseball — Swept El Capitan in two league games (10-1 and 3-1); Eagles now 13-4 overall",
      "Softball — Dramatic walk-off 9-8 win over Steele Canyon in 9 innings in league play",
      "Boys Lacrosse — Beat Santana 14-5 in GHL, improving to 10-3 overall",
      "Girls Lacrosse — Picked up a gritty 7-5 win over Valhalla for their 2nd win of the season",
      "Boys Volleyball — Undefeated in Grossmont Hills League at 5-0, 1st place",
      "Boys Tennis — Won both league matches this week (12-6 and 10-8)"
    ],
    principalMemo: `Dear Dr. Jesperson,

I'm pleased to share this week's athletics update for Granite Hills High School for the week of April 13–17, 2026.

It was another productive week for Eagle Athletics, with wins across baseball, softball, lacrosse, volleyball, and tennis.

Baseball had an outstanding week, sweeping El Capitan in the Grossmont Hills League series. The Eagles dominated on the road Monday, 10-1, then closed out the sweep at home Thursday with a 3-1 victory. Granite Hills now stands at 13-4 overall and continues their push to defend the GHL title.

Softball delivered one of the highlights of the week with a dramatic walk-off 9-8 win over Steele Canyon in 9 innings on Monday. The Eagles played hard all week, though they fell 2-0 to West Hills on Thursday. The team stands at 5-10 on the year and continues to compete in league.

Boys Lacrosse traveled to Santana on Monday and came away with a convincing 14-5 league victory, improving to 10-3 overall. The Eagles continue to be one of the stronger programs in the area.

Girls Lacrosse picked up a big 7-5 home win over Valhalla on Monday, their second win of the season. The team is working hard and it's great to see their perseverance paying off. They now stand at 2-7.

Boys Volleyball is absolutely rolling in league play. The Eagles beat Helix on the road Monday 3-1, extending their Grossmont Hills League record to a perfect 5-0 and keeping them in first place. Their overall record stands at 10-10, but in league they are unmatched.

Boys Tennis continues to build momentum, winning both league matches this week — a 12-6 victory at El Cajon Valley on Monday and a 10-8 win over Southwest EC at home Thursday.

Track & Field hosted the Granite Hills 5-Way Invitational on Monday, giving our athletes valuable competitive experience. The team also competed in a dual meet at West Hills on Thursday; full results have not yet been posted. Swimming & Diving is scheduled to host West Hills this afternoon at 4:00 PM. Boys Golf had no events this week.

Go Eagles!

James Davis
Athletic Director
Granite Hills High School`,

    paScript: `Good morning, Eagles! Here are your weekly athletics highlights:

Eagle Baseball had a fantastic week — the Eagles swept El Capitan in two league games, winning 10-1 on the road Monday and 3-1 at home Thursday! Granite Hills is now 13 and 4 on the season!

Softball gave us one of the games of the year — a walk-off 9-8 win over Steele Canyon in 9 innings on Monday! What a comeback for our Eagle softball team!

Boys Lacrosse beat Santana 14-5 on the road Monday and is now 10 and 3 on the year. The Eagles are rolling!

Girls Lacrosse picked up a big home win over Valhalla, 7-5, on Monday. Great effort from our Lady Eagles!

Boys Volleyball is in first place in the Grossmont Hills League, undefeated at 5 and 0 in league play! The Eagles beat Helix 3-1 on Monday — way to go, Eagles!

Boys Tennis won both matches this week — 12-6 at El Cajon Valley and 10-8 over Southwest EC at home. Great work on the courts!

And a reminder — Swimming & Diving hosts West Hills today at 4 PM. Come out and cheer on the Eagles in the pool!

Let's keep the energy going — Go Eagles!`
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
