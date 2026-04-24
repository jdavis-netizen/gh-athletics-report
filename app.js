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
    weekLabel: "Week of April 17–24, 2026",
    dateRange: "Friday, April 17 – Friday, April 24, 2026",
    sports: [
      {
        name: "Baseball",
        record: "15-5 overall",
        games: [
          { date: "Fri 4/17", opponent: "vs El Capitan", score: "3-1", result: "W", notes: "Home win to open the week; Eagles stay sharp in GHL play" },
          { date: "Tue 4/21", opponent: "@ Grossmont", score: "4-12", result: "L", notes: "Tough road loss to league rival Grossmont" },
          { date: "Thu 4/23", opponent: "vs Grossmont", score: "14-1", result: "W", notes: "Dominant bounce-back home win to split the series; Eagles now 15-5" }
        ]
      },
      {
        name: "Softball",
        record: "6-11 overall",
        games: [
          { date: "Tue 4/21", opponent: "@ Santana", score: "1-12", result: "L", notes: "Tough road loss in GHL play" },
          { date: "Thu 4/23", opponent: "vs El Capitan", score: "14-11", result: "W", notes: "High-scoring home win; Lady Eagles showed explosive offensive firepower" }
        ]
      },
      {
        name: "Boys Lacrosse",
        record: "14-3 overall",
        games: [
          { date: "Fri 4/17", opponent: "vs Helix", score: "15-4", result: "W", notes: "Dominant home win over the Scotties in GHL action" },
          { date: "Tue 4/21", opponent: "@ El Capitan", score: "15-4", result: "W", notes: "Emphatic road win; Eagles outscored opponents 30-8 on the week — now 14-3" },
          { date: "Fri 4/24", opponent: "vs Santana", score: "", result: "", notes: "Tonight at Granite Hills Stadium — 7:00 PM. Go Eagles!" }
        ]
      },
      {
        name: "Girls Lacrosse",
        record: "6-9 overall",
        games: [
          { date: "Fri 4/17", opponent: "@ El Capitan", score: "11-4", result: "W", notes: "Strong road win to open the week; Lady Eagles showing real momentum" },
          { date: "Tue 4/21", opponent: "vs West Hills", score: "12-10", result: "W", notes: "Gritty home win; two wins this week signal a strong finish to the season" },
          { date: "Fri 4/24", opponent: "@ Valhalla", score: "", result: "", notes: "Away game tonight at 7:00 PM" }
        ]
      },
      {
        name: "Boys Volleyball",
        record: "17-12 overall, 7-0 GHL (1st place)",
        games: [
          { date: "Thu 4/17", opponent: "Tournament (1-2)", score: "", result: "", notes: "Beat Mount Miguel 2-1; lost to Poway 0-2 and La Jolla 1-2 in non-league tournament play" },
          { date: "Sat 4/18", opponent: "Tournament (4-0)", score: "8-0 sets", result: "W", notes: "Swept Montgomery, Mater Dei Catholic, Fallbrook, and Grossmont — dominant Saturday performance" },
          { date: "Mon 4/20", opponent: "@ Monte Vista", score: "3-2", result: "W", notes: "Hard-fought GHL road win; Eagles now 7-0 in league and in 1st place" },
          { date: "Wed 4/22", opponent: "vs El Cajon Valley", score: "", result: "", notes: "Score not yet posted" }
        ]
      },
      {
        name: "Swimming & Diving",
        record: "",
        games: [
          { date: "Fri 4/17", opponent: "vs West Hills", score: "", result: "", notes: "Home meet held; scores not yet posted" },
          { date: "Fri 4/24", opponent: "@ Helix", score: "", result: "", notes: "Away meet today at 4:00 PM — score pending" }
        ]
      },
      {
        name: "Track & Field",
        record: "",
        games: [
          { date: "Thu 4/23", opponent: "@ El Capitan", score: "", result: "", notes: "Dual meet competed Thursday; results not yet posted" }
        ]
      },
      {
        name: "Boys Tennis",
        record: "",
        games: [
          { date: "Fri 4/17", opponent: "@ Mount Miguel", score: "12-1", result: "W", notes: "Dominant road win in GHL action — Eagles won 12 of 13 matches" }
        ]
      },
      {
        name: "Boys Golf",
        record: "No events this week",
        games: []
      }
    ],
    notables: [
      "Baseball — Bounced back from road loss at Grossmont with a dominant 14-1 home win Thursday; now 15-5 overall and strong CIF contender",
      "Boys Lacrosse — Outscored opponents 30-8 this week with identical 15-4 wins over Helix and El Capitan; now 14-3 and primed for a deep CIF run",
      "Girls Lacrosse — Won two straight (11-4 @ El Cap, 12-10 vs West Hills); now 6-9 and riding real momentum into the final week",
      "Boys Volleyball — Went 5-2 in tournament weekend including a perfect 4-0 Saturday sweep; undefeated in GHL (7-0, 1st place)",
      "Boys Tennis — Dominant 12-1 road win at Mount Miguel; one of the Eagles' best tennis results of the spring"
    ],
    principalMemo: `Dear Dr. Jesperson,

I'm pleased to share this week's Eagle Athletics update for the week of April 17–24, 2026. With the regular season winding down, our student-athletes are competing with urgency and purpose, and this week's results reflect the character of Granite Hills athletics.

Baseball went 2–1 on the week, opening with a 3–1 home win over El Capitan on Friday. After a tough 4–12 road loss at Grossmont on Tuesday, the Eagles answered with a commanding 14–1 home victory over the Foothillers on Thursday — exactly the type of bounce-back performance a CIF-bound team needs. The Eagles stand at 15–5 overall heading into the final stretch of the regular season.

Softball split their two games: a 1–12 loss at Santana on Tuesday followed by a high-energy 14–11 home win over El Capitan on Thursday. The offensive output against El Capitan was outstanding and showed the ceiling of what this group can do. The team is now 6–11 overall.

Boys Lacrosse had a dominant week. The Eagles beat Helix 15–4 at home on Friday and followed it up with a 15–4 road win at El Capitan on Tuesday — outscoring opponents 30–8 across both games. Now 14–3 overall, this team is playing some of the best lacrosse in East County and is firmly positioned for a deep CIF run. Tonight they host Santana at Granite Hills Stadium at 7:00 PM.

Girls Lacrosse won both games this week, opening with a strong 11–4 road win at El Capitan on Friday and following it with a gritty 12–10 home victory over West Hills on Tuesday. Now 6–9 overall, the Lady Eagles have shown real growth and resilience in the back half of the season. They travel to Valhalla tonight at 7:00 PM.

Boys Volleyball had a full and productive week of competition. After a mixed Thursday tournament (going 1–2 against Poway and La Jolla, with a win over Mount Miguel), the Eagles returned Saturday and swept all four opponents — Montgomery, Mater Dei Catholic, Fallbrook, and Grossmont — going 4–0 with scores of 2–0 in each match. On Monday, they won a tight 3–2 GHL road match at Monte Vista, their seventh consecutive league victory. The Eagles remain undefeated in the Grossmont Hills League at 7–0 and are firmly in first place. Wednesday's result against El Cajon Valley is pending.

Boys Tennis picked up a dominant 12–1 road win at Mount Miguel on Friday — an exceptional team performance.

Swimming & Diving hosted West Hills on Friday (scores not yet posted) and travels to Helix today for a 4:00 PM meet. Track & Field competed at El Capitan on Thursday; results are not yet posted. Boys Golf had no events this week.

As always, thank you for your continued support of our student-athletes. We are proud of how this group is representing Granite Hills.

Go Eagles!

James Davis
Athletic Director
Granite Hills High School`,

    paScript: `Good morning, Eagles! Here are this week's athletics highlights — it was a BIG week for your Eagle athletes!

Baseball kicked things off Friday with a 3 to 1 home win over El Capitan! After a tough road loss at Grossmont Tuesday, the Eagles came right back and DOMINATED Thursday — beating Grossmont 14 to 1 at home! The Eagles are now 15 and 5 overall! That's championship baseball!

Softball fought hard this week — after a tough road game at Santana, the Lady Eagles came home Thursday and EXPLODED for 14 runs, beating El Capitan 14 to 11! Outstanding offensive performance!

Boys Lacrosse had an INCREDIBLE week — they beat Helix 15 to 4 at home Friday, then went on the road and beat El Capitan 15 to 4 Tuesday! That's 30 goals scored and only 8 allowed this week! The Eagles are now 14 and 3! And TONIGHT — Boys Lacrosse hosts Santana right here at Granite Hills Stadium at 7 PM! Come out and cheer on the Eagles!

Girls Lacrosse also had a fantastic week — they beat El Capitan 11 to 4 on the road Friday, then held on for a tough 12 to 10 home win over West Hills Tuesday! The Lady Eagles are now 6 and 9 and playing their best lacrosse of the year! They travel to Valhalla TONIGHT at 7 PM — go Eagles!

Boys Volleyball — wow, what a week! They went 4 and 0 on Saturday — sweeping Montgomery, Mater Dei Catholic, Fallbrook, and Grossmont — then won at Monte Vista on Monday! They are SEVEN and ZERO in the Grossmont Hills League — UNDEFEATED — and sitting in FIRST PLACE! These guys are LOCKED IN!

And Boys Tennis picked up a dominant 12 to 1 road win at Mount Miguel! That's one of the best tennis results of the season — great job Eagles!

Keep pushing, Eagles — we are in the home stretch! You are making Granite Hills proud every single day. Go Eagles!`
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
