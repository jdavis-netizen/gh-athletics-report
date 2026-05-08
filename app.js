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
    weekLabel: "Week of April 24 – May 1, 2026",
    dateRange: "Friday, April 24 – Friday, May 1, 2026",
    sports: [
      {
        name: "Baseball",
        record: "16-5 overall",
        games: [
          { date: "Thu 4/30", opponent: "vs Valhalla", score: "20-0", result: "W", notes: "Dominant shutout — Eagles erupt for 20 runs at home; offense and pitching firing on all cylinders" },
          { date: "Fri 5/1", opponent: "@ Valhalla", score: "", result: "", notes: "Tonight on the road at 4:00 PM — Eagles look to sweep the league series" }
        ]
      },
      {
        name: "Softball",
        record: "",
        games: [
          { date: "Thu 4/30", opponent: "@ Steele Canyon", score: "", result: "", notes: "Road game played Thursday — score not yet posted" }
        ]
      },
      {
        name: "Boys Lacrosse",
        record: "14-3 overall",
        games: [
          { date: "Fri 4/24", opponent: "vs Santana", score: "12-9", result: "W", notes: "Home win at Granite Hills Stadium — solid grind-it-out victory" },
          { date: "Tue 4/28", opponent: "@ Helix", score: "17-3", result: "W", notes: "Dominant road blowout over the Scotties; Eagles continue to roll" },
          { date: "Fri 5/1", opponent: "vs El Capitan/Lakeside", score: "", result: "", notes: "Tonight at Granite Hills Stadium — 7:00 PM" }
        ]
      },
      {
        name: "Girls Lacrosse",
        record: "",
        games: [
          { date: "Fri 4/24", opponent: "@ Valhalla", score: "15-6", result: "W", notes: "Strong road win to open the week" },
          { date: "Tue 4/28", opponent: "vs El Capitan/Lakeside", score: "11-9", result: "W", notes: "Tight home win — 2-0 on the week!" },
          { date: "Fri 5/1", opponent: "@ West Hills", score: "", result: "", notes: "Road game tonight at 7:00 PM" }
        ]
      },
      {
        name: "Boys Volleyball",
        record: "",
        games: [
          { date: "Mon 4/27", opponent: "@ El Capitan/Lakeside", score: "3-0", result: "W", notes: "Sweep on the road in GHL play" },
          { date: "Wed 4/29", opponent: "vs Helix", score: "3-1", result: "W", notes: "Strong home win — Eagles handle the Scotties in 4 sets" }
        ]
      },
      {
        name: "Swimming & Diving",
        record: "Girls — Grossmont Hills League Champions 🏆",
        games: [
          { date: "Fri 4/24", opponent: "@ Helix", score: "", result: "", notes: "Boys & Girls meet last Friday — scores not posted" },
          { date: "Week", opponent: "GHL League Championship", score: "1st Place (Girls)", result: "W", notes: "Lady Eagles claim the Grossmont Hills League title!" }
        ]
      },
      {
        name: "Track & Field",
        record: "No meets this week",
        games: []
      },
      {
        name: "Boys Tennis",
        record: "",
        games: [
          { date: "Tue 4/28", opponent: "@ Central Union", score: "4-14", result: "L", notes: "Tough road loss in non-league action" }
        ]
      },
      {
        name: "Boys Golf",
        record: "No events this week",
        games: []
      }
    ],
    notables: [
      "🏆 Girls Swimming — GROSSMONT HILLS LEAGUE CHAMPIONS! Lady Eagles claim the league title!",
      "Baseball — Crushed Valhalla 20-0 at home Thursday in a dominant league win; Eagles now 16-5 and rolling into the final week",
      "Boys Lacrosse — Went 2-0 with a 12-9 home win over Santana and a 17-3 road blowout at Helix; now 14-3 overall",
      "Girls Lacrosse — Perfect 2-0 week with a 15-6 win at Valhalla and an 11-9 home win over El Capitan/Lakeside",
      "Boys Volleyball — Swept El Capitan/Lakeside 3-0 on the road and beat Helix 3-1 at home — another flawless week"
    ],
    principalMemo: `Dear Dr. Jesperson,

I'm pleased to share this week's Eagle Athletics update for the week of April 24 – May 1, 2026. We have a major accomplishment to celebrate this week, along with several outstanding team performances.

The biggest news: our Girls Swimming & Diving team has officially claimed the Grossmont Hills League Championship! This is a tremendous achievement for our Lady Eagles and a credit to the athletes, coaches, and program. Please join me in congratulating the team — they have represented Granite Hills with excellence all season.

Baseball delivered another headline performance — a dominant 20–0 home shutout of Valhalla on Thursday. The offense was relentless and the pitching was sharp; it was the kind of all-around performance that signals a team peaking at the right time. The Eagles improve to 16–5 overall and travel to Valhalla tonight to look to sweep the league series.

Boys Lacrosse went a perfect 2–0 on the week. The Eagles opened with a 12–9 home win over Santana on Friday, then traveled to Helix on Tuesday and posted a dominant 17–3 road victory. Now 14–3 overall, the team continues to play some of the best lacrosse in East County. They host El Capitan/Lakeside tonight at Granite Hills Stadium at 7:00 PM.

Girls Lacrosse also went 2–0, opening with a strong 15–6 road win at Valhalla on Friday and following it up with an 11–9 home win over El Capitan/Lakeside on Tuesday. The Lady Eagles travel to West Hills tonight at 7:00 PM.

Boys Volleyball continued its excellent run with two more wins — a 3–0 road sweep at El Capitan/Lakeside on Monday and a strong 3–1 home win over Helix on Wednesday. The team continues to lead the Grossmont Hills League and is putting together one of the best seasons in program history.

Boys Tennis fell 4–14 at Central Union on Tuesday in a tough non-league road match.

Softball played at Steele Canyon on Thursday; the score has not yet been posted. Track & Field had no meets and Boys Golf had no events this week.

Thank you, as always, for your continued support of our student-athletes. With the postseason just ahead, this is an exciting stretch of competition for our Eagles.

Go Eagles!

James Davis
Athletic Director
Granite Hills High School`,

    paScript: `Good morning, Eagles! Here are this week's athletics highlights — your Eagle athletes had a HUGE week!

First — let's give it up for our Girls Swimming and Diving team — they are your GROSSMONT HILLS LEAGUE CHAMPIONS! Congratulations to the Lady Eagles on bringing home the league title! Outstanding job!

Eagle Baseball put on a SHOW Thursday — they shut out Valhalla 20 to ZERO at home! That's right, 20 to nothing! The offense, the pitching, the defense — everything was working! The Eagles are now 16 and 5 overall, and they're back at it TONIGHT on the road at Valhalla, 4 PM!

Boys Lacrosse went 2 and 0 this week! They beat Santana 12 to 9 at home Friday, then went on the road Tuesday and BLEW OUT Helix 17 to 3! The Eagles are now 14 and 3! And TONIGHT they host El Capitan and Lakeside right here at Granite Hills Stadium — 7 PM! Come out and cheer on the Eagles!

Girls Lacrosse also went 2 and 0! They beat Valhalla 15 to 6 on the road Friday, then held on for an 11 to 9 home win over El Capitan and Lakeside on Tuesday! The Lady Eagles travel to West Hills tonight at 7 PM!

Boys Volleyball stayed PERFECT this week — a 3 to 0 sweep at El Capitan and Lakeside on Monday and a 3 to 1 home win over Helix on Wednesday! These guys are LOCKED IN and rolling toward the playoffs!

Boys Tennis fought hard at Central Union Tuesday in a tough non-league match.

Eagles, we are heading into the FINAL stretch of the season! Keep coming out, keep cheering loud, and let's send these teams into CIF with momentum! Go Eagles!`
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
