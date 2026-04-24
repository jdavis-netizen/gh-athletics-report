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
    weekLabel: "Week of April 20–24, 2026",
    dateRange: "Monday, April 20 – Thursday, April 24, 2026",
    sports: [
      {
        name: "Baseball",
        record: "15-5 overall",
        games: [
          { date: "Tue 4/21", opponent: "@ Grossmont", score: "4-12", result: "L", notes: "Tough road loss in GHL play" },
          { date: "Thu 4/23", opponent: "vs Grossmont", score: "14-1", result: "W", notes: "Dominant bounce-back win at home to split the series" }
        ]
      },
      {
        name: "Softball",
        record: "6-11 overall",
        games: [
          { date: "Tue 4/21", opponent: "@ Santana", score: "12-1", result: "L", notes: "Tough road loss in league play" },
          { date: "Thu 4/23", opponent: "vs El Capitan", score: "14-11", result: "W", notes: "High-scoring home win; Eagles showed great offensive firepower" }
        ]
      },
      {
        name: "Boys Lacrosse",
        record: "12-3 overall",
        games: [
          { date: "Tue 4/21", opponent: "@ El Capitan", score: "15-4", result: "W", notes: "Dominant GHL road win; Eagles remain one of East County's top programs" },
          { date: "Thu 4/24", opponent: "vs Santana", score: "", result: "", notes: "Home game tonight at 7:00 PM — Go Eagles!" }
        ]
      },
      {
        name: "Girls Lacrosse",
        record: "4-7 overall",
        games: [
          { date: "Tue 4/21", opponent: "vs West Hills", score: "12-10", result: "W", notes: "Gritty home win in GHL play; Lady Eagles continue to build momentum" },
          { date: "Thu 4/24", opponent: "@ Valhalla", score: "", result: "", notes: "Away game tonight at 7:00 PM" }
        ]
      },
      {
        name: "Boys Volleyball",
        record: "17-12 overall, 7-0 GHL (1st place)",
        games: [
          { date: "Sat 4/18", opponent: "Tournament (4-0)", score: "8-0 sets", result: "W", notes: "Swept Montgomery, Mater Dei Catholic, Fallbrook & Grossmont in weekend tournament" },
          { date: "Mon 4/20", opponent: "@ Monte Vista", score: "3-2", result: "W", notes: "Hard-fought GHL road win; Eagles now 7-0 in league, 1st place" },
          { date: "Wed 4/22", opponent: "vs El Cajon Valley", score: "", result: "", notes: "Score not yet posted" }
        ]
      },
      {
        name: "Swimming & Diving",
        record: "",
        games: [
          { date: "Thu 4/24", opponent: "@ Helix", score: "", result: "", notes: "Away meet today at 4:00 PM — score pending" }
        ]
      },
      {
        name: "Track & Field",
        record: "",
        games: [
          { date: "Thu 4/23", opponent: "@ El Capitan", score: "", result: "", notes: "Dual meet results not yet posted" }
        ]
      },
      {
        name: "Boys Tennis",
        record: "",
        games: [
          { date: "", opponent: "No matches this week", score: "", result: "", notes: "No scheduled matches April 20–24" }
        ]
      },
      {
        name: "Boys Golf",
        record: "No events this week",
        games: []
      }
    ],
    notables: [
      "Baseball — Dominant 14-1 home win over Grossmont Thursday after tough road loss Tuesday; now 15-5 overall",
      "Softball — Explosive 14-11 home win over El Capitan; team showing offensive firepower at season's end",
      "Boys Lacrosse — Crushed El Capitan 15-4 on the road; now 12-3 and primed for CIF run",
      "Girls Lacrosse — 12-10 home win over West Hills; now 4-7 and playing best lacrosse of the season",
      "Boys Volleyball — Undefeated in GHL at 7-0 (1st place); 4-0 weekend tournament plus W at Monte Vista"
    ],
    principalMemo: `Dear Dr. Jesperson,

I'm pleased to share this week's athletics update for Granite Hills High School for the week of April 20–24, 2026. As we enter the final stretch of the regular season, our student-athletes are competing with tremendous heart and representing Granite Hills with pride.

Baseball split their two-game Grossmont Hills League series with Grossmont. The Eagles dropped a tough road game Tuesday, 4–12, but answered with a dominant 14–1 home victory on Thursday — a statement win as the CIF playoff picture comes into focus. Granite Hills stands at 15–5 overall and remains a strong postseason contender.

Softball also split this week, falling 12–1 at Santana on Tuesday before rallying for an impressive 14–11 home win over El Capitan on Thursday. The offensive output on Thursday was exactly what we needed to see from this group. The team is now 6–11 and finishing the regular season on a competitive note.

Boys Lacrosse continued their dominant run with a commanding 15–4 road win at El Capitan in GHL action on Tuesday, improving to 12–3 overall. The Eagles are playing their best lacrosse of the season and are well positioned for a deep CIF run. Tonight they host Santana at 7:00 PM in what should be a strong home sendoff.

Girls Lacrosse picked up a gritty 12–10 home win over West Hills on Tuesday — their fourth victory of the season. Now 4–7, this team has shown real growth and resilience through the second half of the year. They travel to Valhalla tonight at 7:00 PM.

Boys Volleyball continued their remarkable league dominance. Coming off a 4–0 weekend tournament performance last Saturday (sweeping Montgomery, Mater Dei Catholic, Fallbrook, and Grossmont), the Eagles won a hard-fought 3–2 match at Monte Vista on Monday — their seventh straight Grossmont Hills League win. At 17–12 overall and a perfect 7–0 in league, this team is in first place and peaking at exactly the right time of year.

Swimming & Diving travels to Helix this afternoon for a 4:00 PM away meet. Track & Field competed in a dual meet at El Capitan on Thursday; results not yet posted. Boys Tennis has no matches this week and Boys Golf had no events.

Go Eagles! 🦅

James Davis
Athletic Director
Granite Hills High School`,

    paScript: `Good morning, Eagles! Here are your weekly athletics highlights!

Eagle Baseball bounced back in a big way — after a tough road loss to Grossmont on Tuesday, the Eagles came home and blew them out 14 to 1 on Thursday! That's championship character right there! Eagles are now 15 and 5!

Softball scored 14 runs to beat El Capitan 14 to 11 on Thursday! What an offensive performance by our Eagle softball team!

Boys Lacrosse crushed El Capitan 15 to 4 on the road Tuesday — the Eagles are 12 and 3 and look like a team ready for a CIF playoff run! And TONIGHT they host Santana at 7 PM right here at home — come out and cheer on the Eagles!

Girls Lacrosse beat West Hills 12 to 10 at home Tuesday! The Lady Eagles are now 4 and 7 and playing their best lacrosse of the season!

Boys Volleyball is in FIRST PLACE in the Grossmont Hills League — 7 wins, ZERO losses in league! They swept four teams in a weekend tournament, then beat Monte Vista on the road Monday. This team is unstoppable right now — Go Eagles!

And a big shoutout to all of our spring student-athletes — we are in the home stretch, and you are making Granite Hills proud every single day. Go Eagles!`
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
