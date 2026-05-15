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
    weekLabel: "Week of May 9–15, 2026",
    dateRange: "Saturday, May 9 – Friday, May 15, 2026",
    sports: [
      {
        name: "Baseball",
        record: "21-5 overall, 10-2 GHL — 🏆 5x League Champions in a row!",
        games: [
          { date: "Wed 5/13", opponent: "@ Grossmont", score: "12-9", result: "W", notes: "Big road win to keep first place locked up" },
          { date: "Thu 5/14", opponent: "vs Valhalla", score: "13-0", result: "W", notes: "Dominant home shutout to close the regular season — 13 runs!" }
        ]
      },
      {
        name: "Softball",
        record: "8-15 overall, 3-5 GHL",
        games: [
          { date: "Tue 5/12", opponent: "@ El Capitan", score: "4-6", result: "L", notes: "Hard-fought road loss in league play" },
          { date: "Thu 5/14", opponent: "@ Grossmont", score: "6-7", result: "L", notes: "Heartbreaker on the road — one-run loss to close the regular season" }
        ]
      },
      {
        name: "Boys Lacrosse",
        record: "17-3 overall — CIF Semifinals 🏆",
        games: [
          { date: "Sat 5/9", opponent: "vs Santana (CIF QF)", score: "17-7", result: "W", notes: "🏆 CIF QUARTERFINAL WIN! Eagles dominate Santana 17-7 to advance to the SEMIFINALS!" },
          { date: "Sat 5/16", opponent: "vs Santa Fe Christian (CIF SF)", score: "", result: "", notes: "🏆 CIF SEMIFINAL — Saturday at Granite Hills! One step from the championship — pack the stands!" }
        ]
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
        record: "Girls — Grossmont Hills League Champions 🏆 | Both teams at CIF Championships",
        games: [
          { date: "This Week", opponent: "CIF San Diego Championships", score: "", result: "", notes: "🏆 Boys and Girls Swim & Dive teams competing at the CIF San Diego Section Championships this week — represent Eagles!" }
        ]
      },
      {
        name: "Track & Field",
        record: "🏆 2 CIF Champions — Austin Felio & Ella Morgan headed to STATE!",
        games: [
          { date: "CIF Champions", opponent: "Austin Felio & Ella Morgan", score: "1st Place", result: "W", notes: "🏆 BOTH WON CIF and qualified for the CIF California State Championships! Outstanding achievement!" },
          { date: "Sat 5/9", opponent: "CIF-SS Division Prelims", score: "", result: "", notes: "Eagles ran in CIF San Diego Section Division Preliminaries — top performers advance toward Section Finals on May 23 at Mt. Carmel HS" }
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
      "🏆 Austin Felio & Ella Morgan (Track & Field) — BOTH WON CIF and qualified for the CIF California STATE CHAMPIONSHIPS! Tremendous achievement!",
      "🏆 Boys Lacrosse — CIF QUARTERFINAL WIN! Dominated Santana 17-7 to advance to the CIF SEMIFINALS this Saturday, May 16!",
      "🏆 Baseball — 5th GROSSMONT HILLS LEAGUE TITLE IN A ROW! Perfect 2-0 week to finish 21-5, 10-2 GHL — CIF playoffs ahead!",
      "Baseball — Closed the regular season with a statement 13-0 home shutout of Valhalla on Thursday",
      "Swimming & Diving — Both Boys and Girls teams representing Granite Hills at the CIF San Diego Section Championships this week",
      "Softball — Lady Eagles battled to a one-run road loss at Grossmont (6-7) to close the regular season"
    ],
    principalMemo: `Dear Dr. Jesperson,

I'm pleased to share this week's Eagle Athletics update for the week of May 9–15, 2026. It was a tremendous week for our spring teams as several programs closed out their regular seasons and advanced deeper into CIF playoffs. Granite Hills is firmly in the postseason spotlight across multiple sports.

The headline of the week comes from Boys Lacrosse. On Saturday, May 9, the Eagles defeated Santana 17–7 at Granite Hills Stadium in the CIF Quarterfinals — a dominant performance in front of a packed home crowd. The team improves to 17–3 overall and now advances to the CIF SEMIFINALS this Saturday, May 16, at home against Santa Fe Christian. We are one win away from the CIF Final, and another strong turnout from our school community would mean a great deal to these student-athletes.

Baseball closed the regular season in dominant fashion, going a perfect 2–0 on the week. The Eagles won 12–9 on the road at Grossmont on Wednesday and then dismantled Valhalla 13–0 at home on Thursday to wrap up the regular season. The team finished 21–5 overall and 10–2 in the Grossmont Hills League — and with this title, the Eagles have now won the Grossmont Hills League for the FIFTH YEAR IN A ROW. This is a true dynasty and a tremendous credit to our players, our coaching staff, and our program. CIF playoffs begin next week.

Softball had a difficult week, dropping two close league road games — a 6–4 loss at El Capitan on Tuesday and a one-run 7–6 heartbreaker at Grossmont on Thursday. The Lady Eagles finish the regular season at 8–15 (3–5 GHL). Our student-athletes never stopped competing.

Track & Field delivered the individual headline of the season — Austin Felio and Ella Morgan both WON their CIF events and qualified for the CIF California State Championships! This is an exceptional accomplishment and a tremendous representation of Granite Hills at the state level. Please join me in congratulating Austin and Ella. The CIF San Diego Section Finals continue on May 23 at Mt. Carmel High School, with more Eagle athletes still in the hunt.

Swimming & Diving — fresh off the Girls team's Grossmont Hills League championship — are competing at the CIF San Diego Section Championships this week. Both Boys and Girls squads have qualified, and we are proud of the depth of talent representing the Eagles at the section level.

Girls Lacrosse, Boys Volleyball, and Boys Tennis have all completed their seasons. Boys Volleyball finished as Grossmont Hills League Champions (20–13 overall), and Girls Lacrosse made the CIF Division II tournament. Boys Golf had no scheduled events this week.

Thank you, as always, for your continued support of our student-athletes. With Boys Lacrosse playing for a spot in the CIF Final, Baseball entering CIF playoffs as league champions, and Swim & Dive and Track competing at the section level, this is one of the most exciting weeks of the spring.

Go Eagles!

James Davis
Athletic Director
Granite Hills High School`,

    paScript: `Good morning, Eagles! HUGE week of athletics — and an even bigger weekend ahead!

SATURDAY NIGHT — your Boys Lacrosse Eagles are in the CIF SEMIFINALS at home against Santa Fe Christian! That's right — after DOMINATING Santana 17 to 7 last Saturday, the Eagles are now 17 and 3 and just ONE WIN away from the CIF FINAL! Eagles, this is the biggest home game of the year — come out, pack the stands, bring the noise, and let's send our boys to the championship!

Eagle Baseball just finished a PERFECT 2 and 0 week to wrap up the regular season! Wednesday they beat Grossmont 12 to 9 on the road, and Thursday they SHUT OUT Valhalla 13 to nothing at home! The Eagles finish 21 and 5 overall and 10 and 2 in league — and with that, your Eagle Baseball team has now won the GROSSMONT HILLS LEAGUE TITLE for the FIFTH YEAR IN A ROW! That's right — FIVE STRAIGHT! This is a DYNASTY, Eagles! CIF playoffs start NEXT WEEK — let's go!

Lady Eagles Softball battled hard on the road this week — tough one-run loss at Grossmont Thursday to finish the regular season. Thank you, seniors, for an incredible year — we are PROUD of you!

HUGE shoutout to Track and Field — Austin Felio and Ella Morgan BOTH WON CIF and are headed to the CIF CALIFORNIA STATE CHAMPIONSHIPS! Congratulations Austin and Ella — you are making Granite Hills history! Section Finals continue May 23 at Mt. Carmel — let's go track Eagles!

And in the pool — your Boys AND Girls Swimming and Diving teams are competing at the CIF SAN DIEGO SECTION CHAMPIONSHIPS this week! Your Lady Eagles are already your Grossmont Hills League CHAMPIONS — now they're chasing CIF hardware! GO EAGLES!

Eagles — let's pack Granite Hills Stadium SATURDAY for Boys Lacrosse vs Santa Fe Christian — CIF SEMIFINALS! One win from the CIF FINAL! Wear your navy and Columbia blue, bring your friends, and let's send our boys to the championship! GO EAGLES!`
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
