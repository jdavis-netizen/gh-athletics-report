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
    weekLabel: "Week of May 1–8, 2026",
    dateRange: "Friday, May 1 – Friday, May 8, 2026",
    sports: [
      {
        name: "Baseball",
        record: "19-5 overall, 8-2 GHL — 1st place 🏆",
        games: [
          { date: "Fri 5/1", opponent: "@ Valhalla", score: "24-1", result: "W", notes: "Dominant road win to sweep Valhalla series — 24 runs!" },
          { date: "Tue 5/5", opponent: "vs Helix", score: "6-2", result: "W", notes: "Solid home win over the Scotties" },
          { date: "Thu 5/7", opponent: "@ El Capitan/Lakeside", score: "14-7", result: "W", notes: "Big road win in league play" },
          { date: "Fri 5/8", opponent: "@ Grossmont", score: "", result: "", notes: "Today on the road — 4:00 PM" }
        ]
      },
      {
        name: "Softball",
        record: "8-14 overall, 4-5 GHL",
        games: [
          { date: "Tue 5/5", opponent: "vs West Hills", score: "11-10", result: "W", notes: "Walk-off-style win at home in a high-scoring league battle!" },
          { date: "Thu 5/7", opponent: "vs Santana", score: "2-9", result: "L", notes: "Tough home loss in league play" }
        ]
      },
      {
        name: "Boys Lacrosse",
        record: "14-3 overall — CIF Quarterfinals 🏆",
        games: [
          { date: "Fri 5/1", opponent: "vs El Capitan/Lakeside", score: "", result: "", notes: "Home league finale at Granite Hills Stadium" },
          { date: "Sat 5/9", opponent: "vs Santana (CIF QF)", score: "", result: "", notes: "🏆 CIF QUARTERFINALS — Saturday at 7:00 PM at Granite Hills Stadium! Pack the stands and bring the noise!" }
        ]
      },
      {
        name: "Girls Lacrosse",
        record: "",
        games: [
          { date: "Fri 5/1", opponent: "@ West Hills", score: "15-9", result: "W", notes: "Strong road win to close out the league season!" },
          { date: "Week", opponent: "vs Mira Mesa", score: "", result: "L", notes: "Tough loss to Mira Mesa this week" }
        ]
      },
      {
        name: "Boys Volleyball",
        record: "GHL Champions — CIF Run Ends",
        games: [
          { date: "CIF Playoffs", opponent: "vs Eastlake", score: "2-3", result: "L", notes: "Heartbreaking 5-set loss in CIF — Eagles battle to the very end. A great season for the GHL Champions." }
        ]
      },
      {
        name: "Swimming & Diving",
        record: "Girls — Grossmont Hills League Champions 🏆 | Boys & Girls competing in CIF",
        games: [
          { date: "Season", opponent: "Grossmont Hills League Championship", score: "1st Place (Girls)", result: "W", notes: "🏆 LEAGUE CHAMPIONS — Lady Eagles claimed the GHL title!" },
          { date: "This Week", opponent: "CIF Championships", score: "", result: "", notes: "Both Boys and Girls Swim & Dive teams competing at CIF — let's go Eagles!" }
        ]
      },
      {
        name: "Track & Field",
        record: "Preparing for league finals",
        games: []
      },
      {
        name: "Boys Tennis",
        record: "",
        games: []
      },
      {
        name: "Boys Golf",
        record: "No events this week",
        games: []
      }
    ],
    notables: [
      "🏆 Boys Lacrosse — CIF QUARTERFINALS this Saturday vs Santana, 7:00 PM at Granite Hills Stadium! Come out and pack the stands!",
      "🏆 Girls Swimming — GROSSMONT HILLS LEAGUE CHAMPIONS! Both Boys & Girls Swim teams competing at CIF this week!",
      "🏆 Baseball — Perfect 3-0 week; now 19-5 overall, 8-2 GHL, 1st place — riding a 5-game win streak with one more week before CIF",
      "Boys Volleyball — Battled Eastlake to a heartbreaking 3-2 5-set CIF loss; what a season for the GHL Champs",
      "Softball — Big 11-10 home win over West Hills Tuesday in a thrilling high-scoring battle",
      "Girls Lacrosse — Strong 15-9 road win at West Hills; fell to Mira Mesa later in the week"
    ],
    principalMemo: `Dear Dr. Jesperson,

I'm pleased to share this week's Eagle Athletics update for the week of May 1–8, 2026. With the regular season wrapping up and CIF playoffs underway, our spring teams are competing at a high level and putting Granite Hills in great position for postseason success.

Baseball had a perfect 3–0 week. The Eagles took down Valhalla 24–1 on the road Friday, beat Helix 6–2 at home on Tuesday, and won 14–7 on the road at El Capitan/Lakeside on Thursday. The team is 19–5 overall and 8–2 in league — first place in the Grossmont Hills League and riding a 5-game win streak. Baseball still has one more week of regular season games before CIF playoffs begin, with games against Grossmont and Valhalla on the schedule.

The biggest event of the week is still ahead: Boys Lacrosse hosts Santana in the CIF Quarterfinals this Saturday, May 9, at 7:00 PM at Granite Hills Stadium. The Eagles are 14–3 overall and playing some of the best lacrosse in East County. We are anticipating a large crowd and would appreciate your help in spreading the word — this is a marquee event for our school.

Softball split their two league games this week. The Lady Eagles took down West Hills 11–10 in an exciting home contest on Tuesday before falling 9–2 to Santana at home on Thursday. The team is now 8–14 overall, with one more week of regular season games to play before CIF playoffs begin.

Girls Lacrosse went 1–1 on the week — a strong 15–9 road win over West Hills on Friday to close the regular season, followed by a tough loss to Mira Mesa later in the week.

Boys Volleyball — our reigning Grossmont Hills League Champions — saw their CIF run come to a heartbreaking end in a 3–2 five-set loss to Eastlake. The team battled to the final point and represented Granite Hills with pride and competitiveness throughout an outstanding season.

Swimming & Diving has been one of our brightest stories of the spring. Our Girls team are your Grossmont Hills League CHAMPIONS, and both the Boys and Girls teams are currently competing at the CIF Championships. Please join me in cheering on these student-athletes as they represent Granite Hills at the section level.

Boys Tennis, Track & Field, and Boys Golf had no scheduled events this week.

Thank you, as always, for your continued support of our student-athletes. This is an exciting time of year for Eagle Athletics.

Go Eagles!

James Davis
Athletic Director
Granite Hills High School`,

    paScript: `Good morning, Eagles! Here are this week's athletics highlights — and there is a HUGE event coming up tomorrow!

SATURDAY NIGHT — your Boys Lacrosse Eagles host Santana in the CIF QUARTERFINALS — 7 PM at Granite Hills Stadium! The Eagles are 14 and 3 and ready to roll! Eagles, you do NOT want to miss this one — come out, pack the stands, and bring the noise! Let's send our boys to the semifinals!

Eagle Baseball had a PERFECT 3 and 0 week! Friday they crushed Valhalla 24 to 1 on the road, Tuesday they beat Helix 6 to 2 at home, and Thursday they took down El Capitan and Lakeside 14 to 7 on the road! The Eagles are now 19 and 5, FIRST PLACE in the Grossmont Hills League at 8 and 2! One more week of regular season games — let's keep that win streak alive!

Softball fought hard this week — they BEAT West Hills 11 to 10 in a thriller at home Tuesday! Tough loss to Santana on Thursday, but the Lady Eagles still have one more week of regular season games before CIF — keep battling!

Girls Lacrosse closed out the regular season with a strong 15 to 9 road win at West Hills on Friday — tough loss to Mira Mesa later in the week, but a great year for the Lady Eagles!

And let's give it up for Boys Volleyball — your Grossmont Hills League CHAMPIONS — who battled Eastlake in CIF and came up just short in a 3 to 2 five-set thriller. What a season, men! Your school is PROUD!

And HUGE news from the pool — your Girls Swimming and Diving team are your GROSSMONT HILLS LEAGUE CHAMPIONS! AND — both the Boys AND Girls Swim and Dive teams are competing at the CIF Championships THIS WEEK! Let's go Eagles — bring home some hardware!

And don't forget — your Girls Swimming and Diving team are your GROSSMONT HILLS LEAGUE CHAMPIONS! Congratulations again to the Lady Eagles!

Eagles — let's pack Granite Hills Stadium SATURDAY NIGHT, 7 PM — Boys Lacrosse vs Santana, CIF QUARTERFINALS! Go Eagles!`
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
