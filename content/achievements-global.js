/* POINTLESS content pack: global achievements (ids prefixed "global.").
 * Parody of a completionist checklist. Names are absurdly grand, descriptions are deadpan, rewards are tiny.
 * Checks read only engine stats / flags (plus a few cheap, defensive peeks at P.state) and never throw. */
(function () {
  'use strict';
  const P = window.POINTLESS;

  /* ---- small defensive helpers ---- */
  const n = (s, k) => { const v = Number(s && s[k]); return isFinite(v) ? v : 0; };
  const earned = (s) => n(s, 'meh.earned') + n(s, 'meh.passive');
  const bal = () => { try { return Number(P.state.getMeh()) || 0; } catch (e) { return 0; } };
  const raw = () => { try { return String(P.state.player.getName() || ''); } catch (e) { return ''; } };
  const nm = () => raw().toLowerCase();
  const chosen = () => { try { return !!P.state.player.hasName(); } catch (e) { return false; } };
  const when = (f) => () => { try { return !!f(new Date()); } catch (e) { return false; } };
  const modCount = () => { try { return P.modules.length; } catch (e) { return 0; } };
  const lockedCount = () => { try { return P.modules.filter((m) => m.unlockCost > 0).length; } catch (e) { return 0; } };
  const trophies = () => { try { return { got: P.state.ach.count(), all: P.state.ach.total() }; } catch (e) { return { got: 0, all: 0 }; } };
  const allBut = (skip) => {
    try {
      const order = P.achievementOrder;
      for (let i = 0; i < order.length; i++) {
        if (skip.indexOf(order[i]) < 0 && !P.state.ach.isUnlocked(order[i])) return false;
      }
      return order.length > 50;
    } catch (e) { return false; }
  };
  const shelf = () => {
    let c = 0, mx = 0;
    try {
      const it = P.state.data.items || {};
      for (const k in it) { const v = Number(it[k]) || 0; if (v > 0) c++; if (v > mx) mx = v; }
    } catch (e) { /* no shelf */ }
    return { kinds: c, most: mx };
  };
  /* one pass over the stats per check round: how many departments, longest stay, biggest single-department haul */
  let lastS = null, lastV = null;
  const scan = (s) => {
    if (s === lastS && lastV) return lastV;
    const v = { dist: 0, maxEnt: 0, maxSec: 0, maxMeh: 0 };
    try {
      for (const k in s) {
        const x = Number(s[k]) || 0;
        if (k.endsWith('.entered') && k !== 'modules.entered') { if (x > 0) v.dist++; if (x > v.maxEnt) v.maxEnt = x; }
        else if (k.endsWith('.seconds') && k !== 'time.seconds') { if (x > v.maxSec) v.maxSec = x; }
        else if (k.endsWith('.meh')) { if (x > v.maxMeh) v.maxMeh = x; }
      }
    } catch (e) { /* partial scan is fine */ }
    lastS = s; lastV = v;
    return v;
  };

  /* ================= MEH EARNED, PASSIVE, SPENT, HELD ================= */
  P.addAchievements([
    { id: 'global.earn-25', name: 'Pocket Change, Technically', desc: 'Earn 25 Meh in total. Not enough for a coin, which is fine, because Meh is not a coin.', icon: '👛', reward: 0.5,
      check: (s) => earned(s) >= 25 },
    { id: 'global.earn-250', name: 'Quarter-Thousandaire', desc: "Earn 250 Meh in total. Management has rounded this up to 'a respectable pile'. It is not a pile, but it is the right shape.", icon: '🎟️', reward: 1,
      check: (s) => earned(s) >= 250 },
    { id: 'global.earn-500', name: 'Halfway to a Number You Already Know', desc: 'Earn 500 Meh in total. This is halfway to 1,000, which is not a destination, but is a lovely place to be told you are halfway to.', icon: '🧭', reward: 1.5,
      check: (s) => earned(s) >= 500 },
    { id: 'global.earn-2500', name: 'The Exact Middle of Something', desc: 'Earn 2,500 Meh in total. This is the exact middle of something. Sandra is checking what.', icon: '📐', reward: 2,
      check: (s) => earned(s) >= 2500 },
    { id: 'global.earn-5000', name: 'The Five Thousand Club', desc: 'Earn 5,000 Meh in total. The Club has one member and no clubhouse. This achievement is the clubhouse.', icon: '🎖️', reward: 3,
      check: (s) => earned(s) >= 5000 },
    { id: 'global.earn-25k', name: 'Meh at Scale', desc: 'Earn 25,000 Meh in total. At this volume it qualifies as infrastructure and must be inspected on Thursdays.', icon: '🏗️', reward: 5,
      check: (s) => earned(s) >= 25000 },
    { id: 'global.earn-50k', name: 'A Department Has Been Formed', desc: 'Earn 50,000 Meh in total. A finance department was formed to look at it. It has looked, and been given a nice room.', icon: '🗂️', reward: 5,
      check: (s) => earned(s) >= 50000 },
    { id: 'global.earn-100k', name: 'Six Figures of Shrug', desc: 'Earn 100,000 Meh in total. Six figures, none of which is a salary.', icon: '💼', reward: 7.5,
      check: (s) => earned(s) >= 100000 },
    { id: 'global.earn-500k', name: 'Half a Million, Briefly Discussed', desc: 'Earn 500,000 Meh in total. Management called a meeting about this. It was a good meeting. It was over before it began.', icon: '📣', reward: 7.5,
      check: (s) => earned(s) >= 500000 },
    { id: 'global.earn-1m', name: 'Seven Digits, All Level', desc: 'Earn 1,000,000 Meh in total. Seven digits, and not one of them is excited.', icon: '🏛️', reward: 10,
      check: (s) => earned(s) >= 1e6 },
    { id: 'global.earn-10m', name: 'Eight Digits, Quietly', desc: 'Earn 10,000,000 Meh in total. The accountants were informed. One looked up, then at another, and both looked back down.', icon: '🛎️', reward: 10,
      check: (s) => earned(s) >= 1e7 },
    { id: 'global.earn-1b', name: 'Billionaire of Nothing', desc: 'Earn 1,000,000,000 Meh in total. You are richer than several things that do not have money.', icon: '🌋', reward: 15,
      check: (s) => earned(s) >= 1e9 },
    { id: 'global.earn-1t', name: 'A Rounding Error in Every Direction', desc: 'Earn 1,000,000,000,000 Meh in total. Economists call this a rounding error, and for once they are right in all directions.', icon: '🌌', reward: 25,
      check: (s) => earned(s) >= 1e12 },
    { id: 'global.bal-cap', name: 'The Ceiling of Nothing', desc: 'Hold 1,000,000,000,000,000 Meh at once. This is the maximum. Nothing exists above it, including your next Meh.', icon: '🧱', reward: 50,
      check: () => bal() >= 1e15 },

    { id: 'global.passive-10', name: 'Unearned, Gently', desc: 'Receive 10 Passive Meh (Unearned). You did nothing. The nothing was credited.', icon: '☁️', reward: 0.5,
      check: (s) => n(s, 'meh.passive') >= 10 },
    { id: 'global.passive-100', name: 'Money for Old Rope', desc: 'Receive 100 Passive Meh. The rope was not consulted and is, frankly, relieved.', icon: '🧵', reward: 2,
      check: (s) => n(s, 'meh.passive') >= 100 },
    { id: 'global.passive-1000', name: 'Salaried, Spiritually', desc: 'Receive 1,000 Passive Meh for sitting in the Lobby. You are being paid to be near it.', icon: '📆', reward: 5,
      check: (s) => n(s, 'meh.passive') >= 1000 },
    { id: 'global.passive-10k', name: 'Gainfully Seated', desc: 'Receive 10,000 Passive Meh. Your chair has been on the payroll longer than you, and has received fewer emails.', icon: '🛋️', reward: 10,
      check: (s) => n(s, 'meh.passive') >= 10000 },
    { id: 'global.passive-100k', name: 'Retired Early, Still Here', desc: 'Receive 100,000 Passive Meh. You retired some time ago. Nobody told the Lobby, and nobody will.', icon: '🏖️', reward: 25,
      check: (s) => n(s, 'meh.passive') >= 100000 },
    { id: 'global.passive-dominant', name: 'More Gift Than Wage', desc: 'Receive at least twice as much Passive Meh as Meh you earned, past 50 Passive Meh. The Lobby is being generous. Possibly lonely.', icon: '🎁', reward: 2,
      check: (s) => n(s, 'meh.passive') >= 50 && n(s, 'meh.passive') >= 2 * n(s, 'meh.earned') },
    { id: 'global.passive-only', name: 'Purely Decorative Employee', desc: 'Receive 30 Passive Meh while having earned 5 Meh or fewer. Everything you own was given. Nothing was requested in return, in writing.', icon: '🌰', secret: true, reward: 3,
      check: (s) => n(s, 'meh.passive') >= 30 && n(s, 'meh.earned') <= 5 },

    { id: 'global.spend-1', name: 'Transaction (Sort Of)', desc: 'Spend 1 Meh. Money has left your possession and entered the economy, which sighed.', icon: '🛒', reward: 0.5,
      check: (s) => n(s, 'meh.spent') >= 1 },
    { id: 'global.spend-100', name: 'Big Spender (Relative to Yourself)', desc: 'Spend 100 Meh in total. This is a lot compared to you, which is the only fair comparison.', icon: '🎫', reward: 2,
      check: (s) => n(s, 'meh.spent') >= 100 },
    { id: 'global.spend-500', name: 'Discretionary Nothing', desc: "Spend 500 Meh in total. Sandra from Compliance has classified it as 'discretionary', and then as 'discreet'.", icon: '🗃️', reward: 3,
      check: (s) => n(s, 'meh.spent') >= 500 },
    { id: 'global.spend-2500', name: 'Consumer Confidence (Yours)', desc: 'Spend 2,500 Meh in total. Consumer confidence rose 0.0%, which in this sector is a rally.', icon: '📈', reward: 5,
      check: (s) => n(s, 'meh.spent') >= 2500 },
    { id: 'global.spend-100k', name: 'Whale in a Shallow Pond', desc: 'Spend 100,000 Meh in total. The pond has been renamed after you and is now 1.5 inches deeper.', icon: '🐳', reward: 10,
      check: (s) => n(s, 'meh.spent') >= 100000 },
    { id: 'global.spend-1m', name: 'Spent a Fortune on Specifics', desc: "Spend 1,000,000 Meh in total. Analysts cannot say on what. You cannot say on what. The receipts say 'various'.", icon: '🎆', reward: 15,
      check: (s) => n(s, 'meh.spent') >= 1e6 },
    { id: 'global.hoard-500', name: 'Dragon Without a Cave', desc: 'Earn 500 Meh without spending any. You sit on the pile. The pile is imaginary but has proven very sturdy.', icon: '🐉', reward: 2,
      check: (s) => earned(s) >= 500 && n(s, 'meh.spent') === 0 },
    { id: 'global.hoard-5000', name: 'Dragon Without a Cave, Extended Edition', desc: 'Earn 5,000 Meh without spending any. Management is no longer sure you have found the Gift Shop. The Gift Shop is sure it has found you.', icon: '🏰', reward: 5,
      check: (s) => earned(s) >= 5000 && n(s, 'meh.spent') === 0 },
    { id: 'global.balanced', name: 'Zero Net Worth, Maximum Joy', desc: 'Spend at least 95% of everything you have ever earned, once past 100 Meh. The books balance. The books are delighted.', icon: '🧮', reward: 3,
      check: (s) => earned(s) >= 100 && n(s, 'meh.spent') >= 0.95 * earned(s) },
    { id: 'global.broke', name: 'Down to Nothing, the House Speciality', desc: 'Hold 0 Meh after having earned at least 100. You are down to nothing, which is what the kitchen is best at.', icon: '🕳️', reward: 2,
      check: (s) => earned(s) >= 100 && bal() < 0.005 },
    { id: 'global.bal-7-5', name: 'Seven and a Half', desc: 'Hold 7.5 Meh. The number has been waiting for you since the building was built and does not mind how long it took.', icon: '🎯', secret: true, reward: 7.5,
      check: () => Math.abs(bal() - 7.5) < 0.04 },
    { id: 'global.bal-777', name: 'Triple Seven, No Jackpot', desc: 'Hold 777 Meh. Nothing happens. A small bell was considered and rejected on grounds of tone.', icon: '🎰', secret: true, reward: 7.77,
      check: () => Math.abs(bal() - 777) < 0.5 },
    { id: 'global.bal-1m', name: 'Seven Digits, Held', desc: 'Hold 1,000,000 Meh at once. It does not fit in a drawer. A drawer has been ordered and will be late.', icon: '🗄️', reward: 10,
      check: () => bal() >= 1e6 },
    { id: 'global.unascended-500', name: 'Standing at the Foot of the Stairs', desc: 'Hold 500 Meh without ever ascending. Ascension is available. It has waited for people in worse shape than you and is not in a hurry.', icon: '🧗', reward: 2,
      check: (s) => n(s, 'ascensions') === 0 && bal() >= 500 }
  ]);

  /* ================= TIME ON THE CLOCK, AND NOT CLICKING ================= */
  P.addAchievements([
    { id: 'global.time-1m', name: 'Technically Employed', desc: 'Spend 1 minute on the clock. Onboarding is complete, in that it is no longer beginning.', icon: '⏱️', reward: 0.5,
      check: (s) => n(s, 'time.seconds') >= 60 },
    { id: 'global.time-7m30', name: 'Seven and a Half Minutes', desc: 'Spend 7 1/2 minutes on the clock. The half minute has been logged separately, in a smaller font.', icon: '⏰', reward: 1,
      check: (s) => n(s, 'time.seconds') >= 450 },
    { id: 'global.time-15m', name: 'A Quarter Hour, Gratefully Received', desc: 'Spend 15 minutes on the clock. The quarter hour has been itemised as ten minutes of presence and five of what looked like presence.', icon: '🕒', reward: 2,
      check: (s) => n(s, 'time.seconds') >= 900 },
    { id: 'global.time-30m', name: 'Break Offered, Not Located', desc: 'Spend 30 minutes on the clock. This is when a break would be offered, were there a break, or an offer.', icon: '☕', reward: 2,
      check: (s) => n(s, 'time.seconds') >= 1800 },
    { id: 'global.time-1h', name: 'One Hour, Billed to Nothing', desc: 'Spend 1 hour on the clock. The Lobby clock was told and decided it is a different hour. It will not be discussing it.', icon: '⌛', reward: 3,
      check: (s) => n(s, 'time.seconds') >= 3600 },
    { id: 'global.time-2h', name: 'Intermission Declined', desc: 'Spend 2 hours on the clock. An intermission was announced twice. You stayed seated, in a way the usher described as moving.', icon: '🎞️', reward: 5,
      check: (s) => n(s, 'time.seconds') >= 7200 },
    { id: 'global.time-5h', name: 'Half a Workday at a Desk That Is Not a Desk', desc: 'Spend 5 hours on the clock. Roughly half a workday has been completed. Nobody can say which half.', icon: '🌅', reward: 7.5,
      check: (s) => n(s, 'time.seconds') >= 18000 },
    { id: 'global.time-7h30', name: 'A Full Shift (7 1/2 Hours)', desc: 'Spend 7 1/2 hours on the clock. A full shift. Your lunch has been on hold since 12:15 and has become sandwich-shaped.', icon: '🕢', reward: 10,
      check: (s) => n(s, 'time.seconds') >= 27000 },
    { id: 'global.time-24h', name: 'A Day Is a Day', desc: "Spend 24 hours on the clock in total. Management has declared it 'a Tuesday', retroactively, for morale.", icon: '🌞', reward: 15,
      check: (s) => n(s, 'time.seconds') >= 86400 },
    { id: 'global.time-72h', name: 'Three Days, Nothing Resolved', desc: 'Spend 72 hours on the clock. Not one agenda item has been resolved. Item 1 is \'Agenda\'. It is under discussion.', icon: '🛌', reward: 15,
      check: (s) => n(s, 'time.seconds') >= 259200 },
    { id: 'global.time-100h', name: 'Centurion of Hours', desc: 'Spend 100 hours on the clock. A laurel wreath was ordered. It arrived as a small salad, which everyone agreed was also fine.', icon: '🥗', reward: 20,
      check: (s) => n(s, 'time.seconds') >= 360000 },
    { id: 'global.time-1w', name: 'One Week, No Notice', desc: 'Spend 168 hours on the clock. You have been here a week and nobody gave notice, including you.', icon: '🗓️', reward: 25,
      check: (s) => n(s, 'time.seconds') >= 604800 },
    { id: 'global.time-30d', name: 'Tenured', desc: 'Spend 720 hours on the clock. You have been granted tenure, which this building defines as a chair that has stopped leaving.', icon: '🧓', secret: true, reward: 50,
      check: (s) => n(s, 'time.seconds') >= 2592000 },

    { id: 'global.observer', name: 'Observer Status', desc: 'Spend 15 minutes on the clock with 25 clicks or fewer. You are observing. Observing is mostly the part of clicking you have not done yet.', icon: '👁️', reward: 2,
      check: (s) => n(s, 'time.seconds') >= 900 && n(s, 'clicks.total') <= 25 },
    { id: 'global.contemplative', name: 'Contemplative Employee', desc: 'Spend an hour on the clock with fewer than 100 clicks. Management reads this as engagement. It is wrong in a way that helps you.', icon: '🧘', reward: 3,
      check: (s) => n(s, 'time.seconds') >= 3600 && n(s, 'clicks.total') < 100 },
    { id: 'global.hands-off', name: 'Hands Off, Eyes On', desc: 'Spend 30 minutes on the clock with 10 clicks or fewer and no keys pressed. Management is watching you not do things with something like admiration.', icon: '✋', secret: true, reward: 5,
      check: (s) => n(s, 'time.seconds') >= 1800 && n(s, 'clicks.total') <= 10 && n(s, 'keys.total') === 0 },
    { id: 'global.left-running', name: 'Left It Running', desc: 'Spend 3 hours on the clock with fewer than 150 clicks. The tab was open. Possibly you were present. The tab has chosen to believe so.', icon: '🛏️', reward: 7.5,
      check: (s) => n(s, 'time.seconds') >= 10800 && n(s, 'clicks.total') < 150 },
    { id: 'global.talked-at', name: 'Spoken To More Than Touched', desc: 'Hear Management 100 times while clicking fewer than 50 times. You listen. Management has begun to wonder who is conducting the interview.', icon: '👂', reward: 3,
      check: (s) => n(s, 'narrator.lines') >= 100 && n(s, 'clicks.total') < 50 }
  ]);

  /* ================= CLICKS AND KEYS ================= */
  P.addAchievements([
    { id: 'global.click-1', name: 'First Contact (Mouse)', desc: 'Click once. The click was logged, filed and thanked, in that order, by three different people.', icon: '🖱️', reward: 0.5,
      check: (s) => n(s, 'clicks.total') >= 1 },
    { id: 'global.click-10', name: 'Ten Clicks, Each Personally Logged', desc: 'Click 10 times. Each was logged by hand, by someone with a pen and strong feelings about margins.', icon: '🔟', reward: 0.5,
      check: (s) => n(s, 'clicks.total') >= 10 },
    { id: 'global.click-100', name: 'Centenary of Pressing', desc: 'Click 100 times. A small cake was ordered, then cancelled. The cake is not aware.', icon: '🎂', reward: 1.5,
      check: (s) => n(s, 'clicks.total') >= 100 },
    { id: 'global.click-250', name: 'Index Finger Wellness Programme', desc: 'Click 250 times. You have been enrolled in the Index Finger Wellness Programme, which consists of this sentence.', icon: '☝️', reward: 2,
      check: (s) => n(s, 'clicks.total') >= 250 },
    { id: 'global.click-500', name: 'Half a Thousand Taps (Per Policy 11-C)', desc: 'Click 500 times. Policy 11-C permits this. Policy 11-D permits it with a smile. Policy 11-E has been lost.', icon: '📌', reward: 3,
      check: (s) => n(s, 'clicks.total') >= 500 },
    { id: 'global.click-1000', name: 'A Moment of Silence, Interrupted', desc: 'Click 1,000 times. A moment of silence was proposed in your honour. The next click came in before it could start.', icon: '🔕', reward: 5,
      check: (s) => n(s, 'clicks.total') >= 1000 },
    { id: 'global.click-2500', name: 'Mouse Button Union Notice', desc: "Click 2,500 times. Your mouse has contacted the Stapler's union. The Stapler is 'considering representation'.", icon: '📎', reward: 5,
      check: (s) => n(s, 'clicks.total') >= 2500 },
    { id: 'global.click-5000', name: 'Callus Under Review', desc: 'Click 5,000 times. Your finger is under review by a callus. The callus will report back after lunch.', icon: '🤏', reward: 7.5,
      check: (s) => n(s, 'clicks.total') >= 5000 },
    { id: 'global.click-10k', name: 'Ten Thousand Clicks, One Opinion', desc: 'Click 10,000 times. Experts say this is how long it takes to become an expert at clicking. The experts could not be named.', icon: '🏅', reward: 10,
      check: (s) => n(s, 'clicks.total') >= 10000 },
    { id: 'global.click-25k', name: 'Clicker of Record', desc: 'Click 25,000 times. You are now the official record of your own clicking. The record is you. It has been filed under you.', icon: '📋', reward: 15,
      check: (s) => n(s, 'clicks.total') >= 25000 },
    { id: 'global.click-100k', name: 'A Hundred Thousand Tiny Decisions', desc: 'Click 100,000 times. Each was a decision. None was a good one. All were fine.', icon: '🧠', secret: true, reward: 50,
      check: (s) => n(s, 'clicks.total') >= 100000 },

    { id: 'global.key-1', name: 'Keyboard Detected', desc: 'Press a key. The keyboard has been detected and is being treated with equal parts suspicion and respect.', icon: '⌨️', reward: 0.5,
      check: (s) => n(s, 'keys.total') >= 1 },
    { id: 'global.key-100', name: 'Typing Pool, Population: You', desc: 'Press 100 keys. The typing pool has been filled. It is a pool of one. It is very still.', icon: '🏊', reward: 1,
      check: (s) => n(s, 'keys.total') >= 100 },
    { id: 'global.key-500', name: 'Words Per Minute: Not Measured', desc: 'Press 500 keys. Your typing speed was measured and came back as \'yes\'. The instrument has been thanked and retired.', icon: '💨', reward: 2,
      check: (s) => n(s, 'keys.total') >= 500 },
    { id: 'global.key-1000', name: 'A Thousand Keys, None Wrongly', desc: 'Press 1,000 keys. Records show none were pressed incorrectly, because the correct key has never been identified.', icon: '✅', reward: 3,
      check: (s) => n(s, 'keys.total') >= 1000 },
    { id: 'global.key-25k', name: 'Screenplay Without Plot', desc: 'Press 25,000 keys. A screenplay has formed. Everyone in it is waiting in a lobby. It tests very well.', icon: '🎬', reward: 10,
      check: (s) => n(s, 'keys.total') >= 25000 },
    { id: 'global.key-100k', name: 'The Keyboard Has Filed for Retirement', desc: 'Press 100,000 keys. The keyboard has filed for retirement. The paperwork is pending. It has been pending since key 99,999.', icon: '📃', reward: 25,
      check: (s) => n(s, 'keys.total') >= 100000 },
    { id: 'global.mouse-only', name: 'Mouse-Only Purist', desc: 'Click 500 times without pressing a single key. Your keyboard was dusted for the first time, on principle.', icon: '🐁', secret: true, reward: 3,
      check: (s) => n(s, 'clicks.total') >= 500 && n(s, 'keys.total') === 0 },
    { id: 'global.keys-over-clicks', name: 'The Keyboard Has Been Chosen', desc: 'Press more keys than you click, past 200 keys. You have chosen the keyboard. The mouse has taken it well, in silence.', icon: '🎹', reward: 2,
      check: (s) => n(s, 'keys.total') >= 200 && n(s, 'keys.total') > n(s, 'clicks.total') },
    { id: 'global.efficient', name: 'Return on Investment', desc: 'Average 1 Meh earned per click, past 500 clicks. Management calls this return on investment. In here, it is called that.', icon: '💹', reward: 2,
      check: (s) => n(s, 'clicks.total') >= 500 && n(s, 'meh.earned') >= n(s, 'clicks.total') },
    { id: 'global.inefficient', name: 'Inefficient, With Grace', desc: 'Average under 0.05 Meh earned per click, past 1,000 clicks. You have clicked a very great deal for very little, which is the dream.', icon: '🐌', reward: 2,
      check: (s) => n(s, 'clicks.total') >= 1000 && n(s, 'meh.earned') < 0.05 * n(s, 'clicks.total') }
  ]);

  /* ================= SESSIONS AND THE CALENDAR ================= */
  P.addAchievements([
    { id: 'global.session-2', name: 'Returning Employee', desc: 'Start a second session. Management left the light on, which was a mistake and also a gesture.', icon: '🚪', reward: 1,
      check: (s) => n(s, 'session.count') >= 2 },
    { id: 'global.session-5', name: 'Five Arrivals, One Pattern', desc: "Start 5 sessions. The pattern has been identified as 'you' and is under review.", icon: '📅', reward: 2,
      check: (s) => n(s, 'session.count') >= 5 },
    { id: 'global.session-7', name: 'Seven Arrivals', desc: 'Start 7 sessions. One of them was probably a Tuesday. Management is not looking into it, and has said so in a memo about looking into it.', icon: '🕖', reward: 3,
      check: (s) => n(s, 'session.count') >= 7 },
    { id: 'global.session-25', name: 'Keyholder, Informally', desc: 'Start 25 sessions. You have been given a key to the Lobby. The Lobby has no lock. The key is for feeling.', icon: '🔑', reward: 5,
      check: (s) => n(s, 'session.count') >= 25 },
    { id: 'global.session-100', name: 'A Hundred Arrivals', desc: 'Start 100 sessions. A plaque was commissioned, spelled correctly, and then lost in a drawer with the other plaques.', icon: '📇', reward: 15,
      check: (s) => n(s, 'session.count') >= 100 },
    { id: 'global.session-365', name: 'A Year of Arrivals, Not Necessarily Consecutive', desc: 'Start 365 sessions. A calendar was consulted. The calendar asked you to stop, and was gentle about it.', icon: '🎄', reward: 50,
      check: (s) => n(s, 'session.count') >= 365 },

    { id: 'global.cal-tuesday', name: 'Tuesday, Faced Directly', desc: 'Play on a Tuesday. Nothing happened. Management braced for four minutes, then stood down slowly, like a tent.', icon: '😬', secret: true, reward: 7.5,
      check: when((d) => d.getDay() === 2) },
    { id: 'global.cal-730', name: 'Seven Thirty, and the Half Is Doing Its Job', desc: 'Play at 7:30, morning or evening. This is 7 1/2 in the only language clocks speak.', icon: '🥞', secret: true, reward: 7.5,
      check: when((d) => d.getHours() % 12 === 7 && d.getMinutes() === 30) },
    { id: 'global.cal-fri13', name: 'Superstition (Audited)', desc: 'Play on Friday the 13th. The date was reviewed, found adequately unlucky, and left alone.', icon: '🐈', secret: true, reward: 3,
      check: when((d) => d.getDay() === 5 && d.getDate() === 13) },
    { id: 'global.cal-leap', name: 'Leap Employee', desc: 'Play on February 29. Your attendance is valid on one day in four years, which is more than most of your attendance.', icon: '🐸', secret: true, reward: 7.5,
      check: when((d) => d.getMonth() === 1 && d.getDate() === 29) },
    { id: 'global.cal-newyear', name: 'New Year, Same Lobby', desc: 'Play on January 1. A resolution was presented to Management. Management resolved to table it, and then to find a table.', icon: '🥂', reward: 3,
      check: when((d) => d.getMonth() === 0 && d.getDate() === 1) },
    { id: 'global.cal-3am', name: 'The Three A.M. Shift (Voluntary, Unlogged)', desc: 'Play between 3:00 and 3:59 AM. Management is not at its desk. Management is not certain where its desk is.', icon: '🦉', secret: true, reward: 5,
      check: when((d) => d.getHours() === 3) },
    { id: 'global.cal-monday', name: 'Monday, Before Nine', desc: 'Play on a Monday before 9:00 AM. Management apologises on behalf of Monday and has been unable to locate Monday.', icon: '🥱', reward: 3,
      check: when((d) => d.getDay() === 1 && d.getHours() < 9) },
    { id: 'global.cal-sunday', name: 'Sunday Evening Attendance', desc: 'Play on a Sunday after 6:00 PM. Tuesday is two days away. You are, strictly speaking, safe.', icon: '🌆', reward: 3,
      check: when((d) => d.getDay() === 0 && d.getHours() >= 18) },
    { id: 'global.cal-midnight', name: 'Midnight, Roughly Witnessed', desc: 'Play during the minute from 12:00 to 12:01 AM. The day changed hands in front of you and nobody signed.', icon: '🌙', reward: 3,
      check: when((d) => d.getHours() === 0 && d.getMinutes() === 0) },
    { id: 'global.cal-noon', name: 'High Noon, Low Stakes', desc: 'Play during the minute from 12:00 to 12:01 PM. The sun is directly overhead, filing no complaints.', icon: '☀️', reward: 3,
      check: when((d) => d.getHours() === 12 && d.getMinutes() === 0) },
    { id: 'global.cal-77', name: 'Seven of Seven', desc: 'Play on the 7th of July. Seven, month and day, which is as close to 7 1/2 as the calendar is willing to go.', icon: '🎲', secret: true, reward: 7.5,
      check: when((d) => d.getMonth() === 6 && d.getDate() === 7) },
    { id: 'global.cal-1111', name: 'Wish Accepted on Your Behalf', desc: 'Play at 11:11. A wish was offered. Management accepted it for you and has since misplaced it.', icon: '🌠', secret: true, reward: 3,
      check: when((d) => d.getHours() % 12 === 11 && d.getMinutes() === 11) }
  ]);

  /* ================= THE LOBBY, THE DEPARTMENTS, THE DOORS ================= */
  P.addAchievements([
    { id: 'global.visit-1', name: 'Back Where You Started', desc: 'Return to the Lobby from a department. The Lobby noticed. The Lobby will not be bringing it up.', icon: '↩️', reward: 1,
      check: (s) => n(s, 'lobby.visits') >= 1 },
    { id: 'global.visit-5', name: 'Boomerang Policy', desc: 'Return to the Lobby 5 times. Management calls this the Boomerang Policy. There is no policy. There is a boomerang at the front desk, unclaimed.', icon: '🔁', reward: 1,
      check: (s) => n(s, 'lobby.visits') >= 5 },
    { id: 'global.visit-10', name: 'Revolving Door Specialist', desc: 'Return to the Lobby 10 times. The revolving door has stopped revolving, out of respect.', icon: '🎡', reward: 2,
      check: (s) => n(s, 'lobby.visits') >= 10 },
    { id: 'global.visit-100', name: 'Lobby Furniture', desc: "Return to the Lobby 100 times. You have been reclassified from 'visitor' to 'fixture'. A small plaque is pending, in a drawer.", icon: '🧸', reward: 7.5,
      check: (s) => n(s, 'lobby.visits') >= 100 },
    { id: 'global.visit-250', name: 'Dennis Recognises Your Footsteps', desc: 'Return to the Lobby 250 times. Dennis (Plant) knows the sound of you. He has not turned. He is a plant.', icon: '🌿', reward: 10,
      check: (s) => n(s, 'lobby.visits') >= 250 },
    { id: 'global.visit-500', name: 'The Lobby Has a Favourite', desc: 'Return to the Lobby 500 times. The Lobby has a favourite. It is not allowed to say who, and has been standing very evenly.', icon: '🥇', reward: 15,
      check: (s) => n(s, 'lobby.visits') >= 500 },

    { id: 'global.dept-1', name: 'Door, Opened', desc: 'Enter a department. It was precisely as occupied as advertised.', icon: '🏢', reward: 1,
      check: (s) => n(s, 'modules.entered') >= 1 },
    { id: 'global.dept-10', name: 'Walk-In Employee', desc: 'Enter departments 10 times. No appointment was needed. A form was needed. The form was the walking in.', icon: '🚶', reward: 2,
      check: (s) => n(s, 'modules.entered') >= 10 },
    { id: 'global.dept-50', name: 'Fifty Doors, One Hallway', desc: 'Enter departments 50 times. It was the same hallway. Management is proud of the hallway and would like it left out of this.', icon: '🏬', reward: 5,
      check: (s) => n(s, 'modules.entered') >= 50 },
    { id: 'global.dept-100', name: 'A Hundred Entrances, Exit Signs Not Required', desc: 'Enter departments 100 times. The building has no exit signs, only affirmations, and you have now read a hundred of them.', icon: '🗺️', reward: 7.5,
      check: (s) => n(s, 'modules.entered') >= 100 },
    { id: 'global.dept-500', name: 'Half a Thousand Thresholds', desc: 'Enter departments 500 times. Several doormats have requested a rotation. Their request has been placed under a doormat.', icon: '🧹', reward: 15,
      check: (s) => n(s, 'modules.entered') >= 500 },

    { id: 'global.dept-d3', name: 'Sampler Plate', desc: 'Enter 3 different departments. The tasting menu is the whole menu, and also a floor plan.', icon: '🍽️', reward: 2,
      check: (s) => scan(s).dist >= 3 },
    { id: 'global.dept-d5', name: 'Cross-Trained', desc: 'Enter 5 different departments. You are now qualified to be confused by several things at once.', icon: '🔀', reward: 3,
      check: (s) => scan(s).dist >= 5 },
    { id: 'global.dept-d10', name: 'Generalist (Pending)', desc: "Enter 10 different departments. Your title has been updated to 'Generalist (Pending)'. The pending is the main part.", icon: '🧩', reward: 5,
      check: (s) => scan(s).dist >= 10 },
    { id: 'global.dept-d50', name: 'Knows Everyone, Known by No One', desc: 'Enter 50 different departments. The departments have been told about you and are checking whether that is true.', icon: '🕵️', reward: 15,
      check: (s) => scan(s).dist >= 50 },
    { id: 'global.dept-all', name: 'Every Door in the Building', desc: 'Enter every department at least once. Management has run out of departments. A new one is being built in your honour. It is not available.', icon: '🏁', reward: 25,
      check: (s) => modCount() >= 8 && scan(s).dist >= modCount() },

    { id: 'global.dept-r10', name: 'Regular', desc: 'Enter the same department 10 times. They have started saving you a seat, which is a stool.', icon: '🪑', reward: 2,
      check: (s) => scan(s).maxEnt >= 10 },
    { id: 'global.dept-r50', name: 'Regular, Carved Into Wood', desc: 'Enter the same department 50 times. Your name has been carved into the counter by someone who meant it kindly.', icon: '🌳', reward: 7.5,
      check: (s) => scan(s).maxEnt >= 50 },
    { id: 'global.dept-r100', name: 'A Hundred Visits to One Place', desc: 'Enter the same department 100 times. Loyal, or lost. The department has decided not to ask, which is the kind thing.', icon: '🧲', reward: 10,
      check: (s) => scan(s).maxEnt >= 100 },

    { id: 'global.dept-s5', name: 'Five Minutes in One Place', desc: 'Spend 5 minutes in a single department. Nobody asked you to leave, or to stay, or why.', icon: '⏳', reward: 1,
      check: (s) => scan(s).maxSec >= 300 },
    { id: 'global.dept-s60', name: 'Dwelling, Legally', desc: 'Spend an hour in a single department. In some districts this is now a tenancy. The department would like a deposit of 7 1/2 Meh and has not asked.', icon: '🏘️', reward: 5,
      check: (s) => scan(s).maxSec >= 3600 },
    { id: 'global.dept-s180', name: 'Moved In', desc: 'Spend 3 hours in a single department. Your mail is arriving there. The mail is a leaflet about mail.', icon: '📬', reward: 10,
      check: (s) => scan(s).maxSec >= 10800 },

    { id: 'global.dept-m100', name: 'A Productive Corner', desc: 'Earn 100 Meh in a single department. It is a corner. You are productive in it.', icon: '🔶', reward: 2,
      check: (s) => scan(s).maxMeh >= 100 },
    { id: 'global.dept-m10k', name: 'Master of a Single Nothing', desc: 'Earn 10,000 Meh in a single department. It has named a very small chair after you, for the Meh, not the sitting.', icon: '🎓', reward: 10,
      check: (s) => scan(s).maxMeh >= 10000 },

    { id: 'global.unlock-3', name: 'Keyholder (Small Ring)', desc: 'Unlock 3 departments. The key ring is small. The keys are metaphors with real teeth.', icon: '🔐', reward: 2,
      check: (s) => n(s, 'modules.unlocked') >= 3 },
    { id: 'global.unlock-10', name: 'Landlord of Ten Rooms', desc: 'Unlock 10 departments. You own no rooms. You are permitted to enter them. This is a different and more generous thing.', icon: '🗼', reward: 7.5,
      check: (s) => n(s, 'modules.unlocked') >= 10 },
    { id: 'global.unlock-all', name: 'Nothing Is Locked Anymore', desc: 'Unlock every locked department. The locks were retired in a small ceremony. Their pension is zero. They are glad of the quiet.', icon: '🗝️', reward: 15,
      check: (s) => lockedCount() >= 3 && n(s, 'modules.unlocked') >= lockedCount() },
    { id: 'global.doors-before-decor', name: 'Doors Before Decor', desc: 'Unlock a department before buying anything from the Gift Shop. You chose doors over decor. Interiors have taken note.', icon: '🚧', reward: 2,
      check: (s) => n(s, 'modules.unlocked') >= 1 && n(s, 'shop.bought') === 0 }
  ]);

  /* ================= THE GIFT SHOP OF NOTHING AND ITS REFUND DESK ================= */
  P.addAchievements([
    { id: 'global.shop-25', name: 'Shelf Presence', desc: 'Buy 25 things. The shelf has developed presence. It enters a room and others stop talking about nothing.', icon: '📚', reward: 2,
      check: (s) => n(s, 'shop.bought') >= 25 },
    { id: 'global.shop-100', name: 'A Hundred Purchases and a Gift Bag of Air', desc: 'Buy 100 things. You qualify for a gift bag. The gift bag is empty and went to the wrong customer, who is thrilled.', icon: '🎀', reward: 5,
      check: (s) => n(s, 'shop.bought') >= 100 },
    { id: 'global.shop-500', name: 'The Gift Shop Knows Your Name (Spelled Wrong, On Purpose)', desc: 'Buy 500 things. The Gift Shop knows your name. It spells it wrong as a form of intimacy.', icon: '🔖', reward: 15,
      check: (s) => n(s, 'shop.bought') >= 500 },
    { id: 'global.shelf-5', name: 'Eclectic Taste', desc: 'Own 5 different items at once. Visitors describe the shelf as eclectic, in the voice used for soup.', icon: '🧺', reward: 2,
      check: () => shelf().kinds >= 5 },
    { id: 'global.shelf-25', name: 'A Museum of Your Own Receipts', desc: 'Own 25 different items at once. You have a museum. It is of receipts. The receipts are of the museum.', icon: '🖼️', reward: 10,
      check: () => shelf().kinds >= 25 },
    { id: 'global.shelf-most-5', name: 'Repeat Customer', desc: 'Own the same item 5 times at once. The shop has noticed, and hung your picture by the till as a warning.', icon: '🛍️', reward: 2,
      check: () => shelf().most >= 5 },
    { id: 'global.shelf-most-10', name: 'I Already Have One (Buy Another)', desc: 'Own the same item 10 times at once. You already had one. You now have ten, which is a different kind of one.', icon: '🔂', reward: 4,
      check: () => shelf().most >= 10 },
    { id: 'global.shelf-everything', name: 'One of Everything, Which Is Not Everything', desc: 'Own every item the Gift Shop sells, at once. The shop is empty of things you do not own, which is a kind of shop.', icon: '🏪', reward: 15,
      check: () => { try { return P.shopOrder.length >= 10 && shelf().kinds >= P.shopOrder.length; } catch (e) { return false; } } },

    { id: 'global.refund-open', name: 'Customer Service, Visited', desc: 'Visit the refund desk. The desk is a desk. The refund is a policy. The policy is the desk.', icon: '🙋', reward: 1,
      check: (s) => n(s, 'lobby.refundOpens') >= 1 },
    { id: 'global.refund-form-1', name: 'Form Filed (Form 27B/6)', desc: 'File a refund form. Form 27B/6 has been received, stamped and set beside Form 27B/7, which does not exist.', icon: '📝', reward: 1,
      check: (s) => n(s, 'lobby.refundForms') >= 1 },
    { id: 'global.refund-step-4', name: 'Halfway Through the Paper', desc: 'Complete 4 of the 8 refund forms. Four forms in, no Meh back, and a fifth waiting with its pen already out.', icon: '📑', reward: 3,
      check: (s, f) => Number(f && f['lobby.refundStep']) >= 4 },
    { id: 'global.refund-step-7', name: 'One Form From Nothing', desc: 'Complete 7 of the 8 refund forms. One remains: a meeting, with a chair. Nothing has ever been this close to being refunded.', icon: '📄', secret: true, reward: 5,
      check: (s, f) => Number(f && f['lobby.refundStep']) >= 7 },
    { id: 'global.refund-twice', name: 'Refund Again?', desc: 'Complete the refund process twice. You have received 0 Meh twice, for a total of 0 Meh. The maths holds.', icon: '🔄', secret: true, reward: 7.5,
      check: (s) => n(s, 'lobby.refundsCompleted') >= 2 }
  ]);

  /* ================= THE TROPHY CABINET, ASCENSION, AND OTHER FORMS OF CLIMBING ================= */
  P.addAchievements([
    { id: 'global.trophy-1', name: 'Trophy Number One', desc: 'Unlock a trophy. The cabinet is now technically in use and has been told to behave accordingly.', icon: '🏆', reward: 0.5,
      check: (s) => n(s, 'achievements.unlocked') >= 1 },
    { id: 'global.trophy-5', name: 'A Shelf Begins', desc: 'Unlock 5 trophies. The cabinet has stopped being a cabinet and become a shelf with ambition.', icon: '🥈', reward: 1,
      check: (s) => n(s, 'achievements.unlocked') >= 5 },
    { id: 'global.trophy-20', name: 'Occasionally Visited by Light', desc: 'Unlock 20 trophies. The cabinet is occasionally visited by light. The light pulls a face and moves on.', icon: '💡', reward: 3,
      check: (s) => n(s, 'achievements.unlocked') >= 20 },
    { id: 'global.trophy-50', name: 'A Second Cabinet Has Been Considered', desc: 'Unlock 50 trophies. A second cabinet was considered. It declined, saying it had read the first one\'s reviews.', icon: '🎗️', reward: 6,
      check: (s) => n(s, 'achievements.unlocked') >= 50 },
    { id: 'global.trophy-100', name: 'A Hundred Awards For: See Above', desc: "Unlock 100 trophies. Each is awarded for the reason on the trophy above it. The top one is awarded for 'this'.", icon: '💯', reward: 12,
      check: (s) => n(s, 'achievements.unlocked') >= 100 },
    { id: 'global.trophy-150', name: 'Hall of Fame, One Seat', desc: 'Unlock 150 trophies. The Hall of Fame has one seat. It is yours. The Hall is a closet and has said it is happy for you.', icon: '👑', reward: 20,
      check: (s) => n(s, 'achievements.unlocked') >= 150 },
    { id: 'global.trophy-175', name: 'Almost Entirely Complete, Which Is Not a Category', desc: 'Unlock 175 trophies. Management has no category for almost entirely complete. It made one. The category is empty, and it is you.', icon: '🔭', reward: 25,
      check: (s) => n(s, 'achievements.unlocked') >= 175 },
    { id: 'global.seen-1', name: 'Admired One\'s Own Trophies', desc: 'Open the Trophy Cabinet while holding a trophy. It looks as good as when you left it, and is proud of you for returning.', icon: '🔍', reward: 1,
      check: (s, f) => Number(f && f['lobby.trophiesSeen']) >= 1 },
    { id: 'global.last-box', name: 'One Box Left, Possibly Two', desc: 'Unlock every trophy except this one and one other. The checklist has two boxes left. One is this. The other is shy.', icon: '☑️', secret: true, reward: 25,
      check: (s) => trophies().got >= 50 && allBut(['global.last-box', 'global.everything']) },
    { id: 'global.everything', name: 'Every Box Ticked (Except the Box That Was Not a Box)', desc: 'Unlock every other trophy in the cabinet. The checklist is complete. It is not sure what it was for and is thrilled.', icon: '✔️', secret: true, reward: 50,
      check: (s) => trophies().got >= 50 && allBut(['global.everything']) },

    { id: 'global.asc-2', name: 'Second Floor, Same Floor', desc: 'Ascend twice. The second floor is the first floor. It has been repainted to say so.', icon: '🔼', reward: 5,
      check: (s) => n(s, 'ascensions') >= 2 },
    { id: 'global.asc-7', name: 'Seven Ascensions, Seven and a Half Hums', desc: 'Ascend 7 times. The humming has reached 7 1/2 and been asked, politely, to stop at the half.', icon: '🔔', reward: 15,
      check: (s) => n(s, 'ascensions') >= 7 },
    { id: 'global.asc-10', name: 'Ten Steps Up, Still Level', desc: 'Ascend 10 times. You are at ground level, with views.', icon: '🏞️', reward: 20,
      check: (s) => n(s, 'ascensions') >= 10 },
    { id: 'global.asc-50', name: 'Above the Clouds, Which Are Also Here', desc: 'Ascend 50 times. You are above the clouds. The clouds are in the Lobby at head height, minding their business.', icon: '🌥️', reward: 50,
      check: (s) => n(s, 'ascensions') >= 50 },
    { id: 'global.asc-light', name: 'Light Traveller', desc: 'Ascend without ever having bought anything. You arrive with nothing and carry it very well.', icon: '🎒', reward: 5,
      check: (s) => n(s, 'ascensions') >= 1 && n(s, 'shop.bought') === 0 },
    { id: 'global.asc-direct', name: 'Went Up Without Going Anywhere First', desc: 'Ascend without ever entering a department. You rose without having been anywhere. It is the most efficient thing anyone has done here.', icon: '🛫', secret: true, reward: 5,
      check: (s) => n(s, 'ascensions') >= 1 && n(s, 'modules.entered') === 0 }
  ]);

  /* ================= TERMS OF SERVICE, CREDITS, THE BOSS KEY, THE ANCIENT SEQUENCE ================= */
  P.addAchievements([
    { id: 'global.tos-scroll-5', name: 'Scroller of Fine Print', desc: 'Scroll through the Terms of Service 5 times. Each scroll reveals a clause. Each clause reveals a footnote. Each footnote is lonely.', icon: '📜', reward: 1,
      check: (s) => n(s, 'tos.scrolls') >= 5 },
    { id: 'global.tos-scroll-100', name: 'Scrolled Past the Point of Return', desc: 'Scroll the Terms of Service 100 times. By reading, you have agreed to read more. See clause 14(b), which refers to clause 14(b).', icon: '♾️', reward: 4,
      check: (s) => n(s, 'tos.scrolls') >= 100 },
    { id: 'global.tos-scroll-500', name: 'Clause Archaeologist', desc: 'Scroll the Terms of Service 500 times. You have excavated a clause so old it refers to a different service and a different Tuesday.', icon: '🏺', reward: 8,
      check: (s) => n(s, 'tos.scrolls') >= 500 },
    { id: 'global.tos-dodge-1', name: 'The Button Moved', desc: 'Be dodged by the Accept button once. It has been assigned to a role in avoidance and is thriving.', icon: '🏃', reward: 1,
      check: (s) => n(s, 'lobby.tosDodges') >= 1 },
    { id: 'global.tos-dodge-7', name: 'Seven Dodges, As Is Customary', desc: 'Be dodged by the Accept button 7 times. This is customary. There is a custom. It is the button.', icon: '🤸', reward: 2,
      check: (s) => n(s, 'lobby.tosDodges') >= 7 },
    { id: 'global.tos-dodge-77', name: 'Seventy-Seven Dodges, Mutual Respect', desc: 'Be dodged by the Accept button 77 times. The button respects you. You respect the button. Neither of you can say so, owing to clause 9.', icon: '🥋', reward: 5,
      check: (s) => n(s, 'lobby.tosDodges') >= 77 },
    { id: 'global.tos-accept-2', name: 'Agreed Again, Voluntarily', desc: 'Accept the Terms of Service twice. The first acceptance took, and was forgotten, which is how most agreements are kept.', icon: '✍️', reward: 3,
      check: (s) => n(s, 'lobby.tosAccepts') >= 2 },
    { id: 'global.tos-never', name: 'Never Agreed to Anything', desc: 'Spend 30 minutes on the clock without accepting the Terms of Service. You are operating under implied terms. They are worse, and unwritten.', icon: '🙅', secret: true, reward: 3,
      check: (s) => n(s, 'time.seconds') >= 1800 && n(s, 'lobby.tosAccepts') === 0 },
    { id: 'global.tos-read-declined', name: 'Read It, Declined to Sign', desc: 'Scroll the Terms 10 times and be dodged 3 times without ever accepting. You have read all of it and the button has read all of you.', icon: '🧾', reward: 4,
      check: (s) => n(s, 'tos.scrolls') >= 10 && n(s, 'lobby.tosDodges') >= 3 && n(s, 'lobby.tosAccepts') === 0 },

    { id: 'global.credits-1', name: 'Roll Credits', desc: 'Start the credits. They roll. They are, in length, a form of weather.', icon: '🎥', reward: 1,
      check: (s) => n(s, 'lobby.creditsRolls') >= 1 },
    { id: 'global.credits-3', name: 'Credits, Third Run', desc: 'Start the credits 3 times. The names are familiar now. You have begun to wave at them as they pass, and some wave back.', icon: '👋', reward: 2,
      check: (s) => n(s, 'lobby.creditsRolls') >= 3 },
    { id: 'global.credits-end-2', name: 'Stayed Twice', desc: 'Watch the credits to the end twice. You know how it ends now. It does not, and you stayed anyway.', icon: '🍿', reward: 5,
      check: (s) => n(s, 'lobby.creditsEnded') >= 2 },
    { id: 'global.credits-skip', name: 'Left Before the Names', desc: 'Start the credits 5 times and finish none. The names remain unread. They are fine. They have been fine since 1998.', icon: '🧳', secret: true, reward: 3,
      check: (s) => n(s, 'lobby.creditsRolls') >= 5 && n(s, 'lobby.creditsEnded') === 0 },

    { id: 'global.boss-5', name: 'Spreadsheet Fluency', desc: 'Use the boss key 5 times. The spreadsheet is fluent in you now and has stopped needing a pivot table.', icon: '📉', reward: 2,
      check: (s) => n(s, 'lobby.bossKeys') >= 5 },
    { id: 'global.boss-10', name: 'Quarterly Report, Frequent Flyer', desc: 'Use the boss key 10 times. Quarterly_Report_FINAL_v7_REAL.xlsx has asked for a day off. It did not specify a day.', icon: '🗒️', reward: 3,
      check: (s) => n(s, 'lobby.bossKeys') >= 10 },
    { id: 'global.boss-77', name: 'Seventy-Seven Hides, No Totals', desc: 'Use the boss key 77 times. The spreadsheet still does not add up. It has stopped apologising, which is progress of a kind.', icon: '➗', reward: 7.5,
      check: (s) => n(s, 'lobby.bossKeys') >= 77 },
    { id: 'global.boss-avoider', name: 'Efficient Avoider', desc: 'Use the boss key 10 times without entering a single department. Management considers you its most efficient avoider and is hiding how impressed it is.', icon: '🙈', secret: true, reward: 5,
      check: (s) => n(s, 'lobby.bossKeys') >= 10 && n(s, 'modules.entered') === 0 },

    { id: 'global.konami-2', name: 'Ancient Sequence, Reprised', desc: 'Enter the ancient sequence of arrows a second time. The reward is nothing again. The nothing is familiar now and has a nickname.', icon: '🕹️', secret: true, reward: 2,
      check: (s) => n(s, 'lobby.konami') >= 2 },
    { id: 'global.konami-5', name: 'Paid Once, Asked Five Times', desc: 'Enter the ancient sequence 5 times. It paid once. You have taken the one payment as a lifestyle.', icon: '💸', secret: true, reward: 3,
      check: (s, f) => n(s, 'lobby.konami') >= 5 && !!(f && f['lobby.konamiPaid']) }
  ]);

  /* ================= GERALD, DENNIS, AND THE DECORATIONS WHO ARE TIRED ================= */
  P.addAchievements([
    { id: 'global.gerald-met', name: 'Met Gerald', desc: 'Meet Gerald, Vice President of Spuds. He is a potato of enormous gravitas. He did not rise. He has never risen. He is a potato.', icon: '🥔', secret: true, reward: 2,
      check: (s, f) => !!(f && f.metGerald) },
    { id: 'global.gerald-3', name: 'Gerald Recognises Your Voice', desc: 'Summon Gerald 3 times. He recognises your voice. He said nothing, which is how you know.', icon: '🔊', reward: 2,
      check: (s) => n(s, 'lobby.potato') >= 3 },
    { id: 'global.gerald-10', name: 'Gerald Has Stopped Answering', desc: 'Summon Gerald 10 times. He has stopped answering. He is still listening. This has been his position for some time.', icon: '🤫', reward: 5,
      check: (s) => n(s, 'lobby.potato') >= 10 },
    { id: 'global.two-professionals', name: 'Two Professionals', desc: 'Meet Gerald and poke Dennis (Plant) 10 times. A potato and a plant have shared a building for years and never spoken. It is going well.', icon: '🌱', secret: true, reward: 5,
      check: (s, f) => !!(f && f.metGerald) && n(s, 'lobby.plantPokes') >= 10 },

    { id: 'global.dennis-1', name: 'First Contact With Dennis (Plant)', desc: 'Poke Dennis (Plant) once. Dennis registered it. Dennis is a plant, so the register is vague.', icon: '🌾', reward: 0.5,
      check: (s) => n(s, 'lobby.plantPokes') >= 1 },
    { id: 'global.dennis-75', name: 'Dennis Has Spoken to HR (Dennis)', desc: 'Poke Dennis (Plant) 75 times. Dennis filed a complaint with HR. HR is also Dennis. Dennis found for Dennis.', icon: '📨', reward: 3,
      check: (s) => n(s, 'lobby.plantPokes') >= 75 },
    { id: 'global.dennis-100', name: 'A Hundred Pokes, One Leaf, Unmoved', desc: 'Poke Dennis (Plant) 100 times. One leaf moved. It wants that known as a coincidence and has retained a lawyer, also a leaf.', icon: '🍀', reward: 5,
      check: (s) => n(s, 'lobby.plantPokes') >= 100 },
    { id: 'global.dennis-250', name: 'Dennis Has Drafted a Statement', desc: 'Poke Dennis (Plant) 250 times. Dennis has drafted a statement. It is the longest thing he has produced, and it is mostly oxygen.', icon: '🎤', reward: 7.5,
      check: (s) => n(s, 'lobby.plantPokes') >= 250 },
    { id: 'global.dennis-500', name: 'Your Strongest Professional Relationship', desc: 'Poke Dennis (Plant) 500 times. Dennis considers you a colleague. He has not said so. He is a plant. It is the nicest thing he has not said.', icon: '💚', secret: true, reward: 10,
      check: (s) => n(s, 'lobby.plantPokes') >= 500 },
    { id: 'global.dennis-1000', name: 'Dennis Retires, In Place, Spitefully', desc: 'Poke Dennis (Plant) 1,000 times. Dennis has retired in place, out of spite. He is still thriving. It is a retirement from caring only.', icon: '🏝️', secret: true, reward: 25,
      check: (s) => n(s, 'lobby.plantPokes') >= 1000 },
    { id: 'global.dennis-loiter', name: 'Lobby Loiterer', desc: 'Poke Dennis (Plant) 100 times with 3 or fewer departments entered. The departments have noticed your absence and feel nothing, which is hard on them.', icon: '🕴️', secret: true, reward: 3,
      check: (s) => n(s, 'lobby.plantPokes') >= 100 && n(s, 'modules.entered') <= 3 },

    { id: 'global.logo-25', name: 'The Logo Has Been Handled Enough', desc: 'Click the logo 25 times. The logo wishes it known that it is a logo, not a button. It understands the confusion. It will not be signing anything.', icon: '🔰', reward: 2,
      check: (s) => n(s, 'lobby.logoClicks') >= 25 },
    { id: 'global.logo-100', name: 'A Hundred Brand Touchpoints', desc: 'Click the logo 100 times. Marketing would call this engagement. There is no Marketing, but a chair is being kept warm for it.', icon: '📯', reward: 5,
      check: (s) => n(s, 'lobby.logoClicks') >= 100 },
    { id: 'global.clock-25', name: 'The Clock Is Convinced It Was Right', desc: 'Adjust the wrong clock 25 times. It has adopted your adjustments and become wrong in a new, more committed direction.', icon: '⏲️', reward: 3,
      check: (s) => n(s, 'lobby.clockClicks') >= 25 },
    { id: 'global.clock-77', name: 'Time Unchanged, Opinion Strengthened', desc: "Adjust the wrong clock 77 times. The time is unchanged. The clock's opinion of the time has strengthened considerably.", icon: '🕙', reward: 5,
      check: (s) => n(s, 'lobby.clockClicks') >= 77 },
    { id: 'global.meh-click-25', name: 'The Counter Has Stopped Being Flattered', desc: 'Click the Meh counter 25 times. It is not a button. It has begun to behave like a tired one and has hired someone to say no.', icon: '🔣', reward: 3,
      check: (s) => n(s, 'lobby.mehClicks') >= 25 },
    { id: 'global.meh-click-77', name: 'Seventy-Seven Clicks on a Number, Awkward for Both', desc: 'Click the Meh counter 77 times. This is awkward for both of you. Neither can leave, because one of you is a number.', icon: '➕', reward: 5,
      check: (s) => n(s, 'lobby.mehClicks') >= 77 },
    { id: 'global.touched-all', name: 'Interrupted Everything Decorative', desc: 'Click the logo, the clock, the Meh counter and Dennis, each at least 7 times. Every decoration in the Lobby has now been interrupted. They are used to it.', icon: '🎪', secret: true, reward: 7.5,
      check: (s) => n(s, 'lobby.logoClicks') >= 7 && n(s, 'lobby.clockClicks') >= 7 && n(s, 'lobby.mehClicks') >= 7 && n(s, 'lobby.plantPokes') >= 7 },
    { id: 'global.all-secrets', name: "Known to the Lobby's Secrets", desc: 'Find the arrows, the boss key, the potato, the plant, the logo and the clock. The Lobby has no more secrets to keep, and is keeping that one.', icon: '🔏', secret: true, reward: 10,
      check: (s) => n(s, 'lobby.konami') >= 1 && n(s, 'lobby.bossKeys') >= 1 && n(s, 'lobby.potato') >= 1 && n(s, 'lobby.plantPokes') >= 10 && n(s, 'lobby.logoClicks') >= 10 && n(s, 'lobby.clockClicks') >= 7 }
  ]);

  /* ================= FORTUNES, SURPRISES, SEARCHES, SCREENS, SETTINGS ================= */
  P.addAchievements([
    { id: 'global.fortune-25', name: 'Fortunes Piling Up on a Shelf', desc: 'Collect 25 fortunes. The Fortune Dispenser asked whether you intend to act on any of them. You said you will consider it.', icon: '🥠', reward: 3,
      check: (s) => n(s, 'lobby.fortunes') >= 25 },
    { id: 'global.surprise-7', name: 'Seven Surprises, All Scheduled', desc: 'Press Surprise Me 7 times. Each arrived on time. You have begun to expect them, which is the end of a surprise and the start of a calendar.', icon: '🎊', reward: 2,
      check: (s) => n(s, 'lobby.surprises') >= 7 },
    { id: 'global.surprise-77', name: 'A Surprise Party for a Schedule', desc: 'Press Surprise Me 77 times. The schedule is surprised. It has been told it was always going to be, and is taking it badly.', icon: '🥳', reward: 7.5,
      check: (s) => n(s, 'lobby.surprises') >= 77 },
    { id: 'global.search-10', name: 'Nothing, Continued', desc: "Search for something that is not there, 10 times. Nothing is now well catalogued and cross-referenced under 'Not Here'.", icon: '🔎', reward: 2,
      check: (s) => n(s, 'lobby.emptySearches') >= 10 },
    { id: 'global.search-50', name: 'Nothing Found, in Alphabetical Order', desc: 'Search for something that is not there, 50 times. Nothing has been found so often it is now filed in alphabetical order, under N.', icon: '🔠', reward: 5,
      check: (s) => n(s, 'lobby.emptySearches') >= 50 },

    { id: 'global.screens-10', name: 'Doorknob Inspector', desc: 'Open 10 screens in the Lobby. You have tried the doors. The doors liked it and are pretending they did not.', icon: '🔘', reward: 1,
      check: (s) => n(s, 'lobby.screensOpened') >= 10 },
    { id: 'global.screens-40', name: 'Forty Screens, Settings Among Them', desc: 'Open 40 screens in the Lobby. A good number were Settings. Settings has been told and has not changed.', icon: '⚙️', reward: 3,
      check: (s) => n(s, 'lobby.screensOpened') >= 40 },
    { id: 'global.screens-100', name: 'Screen Door Specialist', desc: 'Open 100 screens in the Lobby. Each opened. Each closed. Something happened in between, and it was nothing in a good coat.', icon: '🖥️', reward: 5,
      check: (s) => n(s, 'lobby.screensOpened') >= 100 },
    { id: 'global.screens-500', name: 'A Door Has Had a Career', desc: 'Open 500 screens in the Lobby. One of them has now had a longer career than you and would like to discuss its retirement.', icon: '🛑', reward: 12,
      check: (s) => n(s, 'lobby.screensOpened') >= 500 },
    { id: 'global.settings-10', name: 'Fiddler', desc: 'Fiddle with the decorative settings 10 times. Not one of them did anything, and you may now say you checked.', icon: '🎚️', reward: 2,
      check: (s) => n(s, 'lobby.settingsTouched') >= 10 },
    { id: 'global.settings-40', name: 'Forty Times Through the Settings', desc: 'Fiddle with the decorative settings 40 times. Nothing changed 40 times, with great consistency. The dials are thrilled to be consulted.', icon: '🔧', reward: 4,
      check: (s) => n(s, 'lobby.settingsTouched') >= 40 },
    { id: 'global.settings-100', name: 'Settings Archaeologist (Dug Nothing Up)', desc: 'Fiddle with the decorative settings 100 times. You have dug deep. There is nothing there. It is exceptionally well-preserved nothing.', icon: '⛏️', reward: 7.5,
      check: (s) => n(s, 'lobby.settingsTouched') >= 100 }
  ]);

  /* ================= WHAT YOU CALLED YOURSELF ================= */
  P.addAchievements([
    { id: 'global.name-potato', name: 'Named After a Potato (Respectfully)', desc: "Choose a name containing 'potato', 'spud' or 'tater'. Gerald has been informed. He has not responded, which is what he does when moved.", icon: '🍠', secret: true, reward: 3,
      check: () => { const x = nm(); return x.indexOf('potato') >= 0 || x.indexOf('spud') >= 0 || x.indexOf('tater') >= 0; } },
    { id: 'global.name-gerald', name: 'Impersonating Gerald', desc: "Choose a name with 'Gerald' in it. Gerald has put it in a file with his own name on it. The file is a potato.", icon: '🎭', secret: true, reward: 3,
      check: () => nm().indexOf('gerald') >= 0 },
    { id: 'global.name-dennis', name: 'Dennis (Employee)', desc: "Choose a name with 'Dennis' in it. Dennis (Plant) now has a colleague and is not pleased about the handover.", icon: '🌲', secret: true, reward: 3,
      check: () => nm().indexOf('dennis') >= 0 },
    { id: 'global.name-sandra', name: 'Sandra? Sandra.', desc: "Choose a name with 'Sandra' in it. Sandra from Compliance has flagged this, and flagged the flag.", icon: '🚩', secret: true, reward: 3,
      check: () => nm().indexOf('sandra') >= 0 },
    { id: 'global.name-management', name: 'Hostile Takeover (Gentle)', desc: "Choose a name with 'Management' in it. Management has taken it well and is reviewing its own position, privately, in the dark.", icon: '👔', secret: true, reward: 5,
      check: () => nm().indexOf('management') >= 0 },
    { id: 'global.name-tuesday', name: 'Called Tuesday', desc: "Choose a name with 'Tuesday' in it. Management has stopped being afraid of you and started being afraid near you.", icon: '😨', secret: true, reward: 5,
      check: () => nm().indexOf('tuesday') >= 0 },
    { id: 'global.name-meh', name: 'Currency and Earner', desc: "Choose a name with 'Meh' in it. You are now both the currency and the person earning it. Accounting has gone for a lie down.", icon: '💱', secret: true, reward: 3,
      check: () => /(^|[^a-z])meh($|[^a-z])/.test(nm()) },
    { id: 'global.name-toaster', name: 'Toast, Named', desc: "Choose a name with 'Toaster' in it. The Toaster has been told someone is using its name. It has said only 'warm'.", icon: '🍞', secret: true, reward: 3,
      check: () => nm().indexOf('toaster') >= 0 },
    { id: 'global.name-stapler', name: 'Union Member, By Name', desc: "Choose a name with 'Stapler' in it. The Stapler has sent a representative, who is another stapler, and has requested a seat at the table.", icon: '🗜️', secret: true, reward: 3,
      check: () => nm().indexOf('stapler') >= 0 },
    { id: 'global.name-sock', name: 'The Missing Sock, Found, Misnamed', desc: "Choose a name with 'sock' in it. Reports of the Missing Sock are now confused and, in some respects, resolved.", icon: '🧦', secret: true, reward: 3,
      check: () => /(^|[^a-z])socks?($|[^a-z])/.test(nm()) },
    { id: 'global.name-nobody', name: 'Nobody, Employed', desc: "Choose a name with 'Nobody' in it. Nobody has been working here for a very long time and has done a great deal.", icon: '👤', secret: true, reward: 3,
      check: () => nm().indexOf('nobody') >= 0 },
    { id: 'global.name-number', name: 'A Name With a Number in It', desc: 'Choose a name containing a digit. Your name is now partly a form field, and Management loves a form field.', icon: '🔡', reward: 1,
      check: () => chosen() && /[0-9]/.test(raw()) },
    { id: 'global.name-max', name: 'Maximum Name', desc: 'Choose a name of 24 characters, the maximum. The name has used everything it was given and asks nothing further.', icon: '📏', reward: 3,
      check: () => Array.from(raw()).length >= 24 },
    { id: 'global.name-one', name: 'Initial Employee', desc: 'Choose a name of a single character. Management approves. A single character saves ink, and Management has been saving ink since 1998.', icon: '✒️', reward: 3,
      check: () => chosen() && Array.from(raw().trim()).length === 1 },
    { id: 'global.name-default', name: 'Chosen on Purpose', desc: "Choose the name 'Valued Employee' deliberately. It is the same name as before, but it is now yours, and has paperwork.", icon: '📛', secret: true, reward: 3,
      check: () => chosen() && nm().trim() === 'valued employee' },
    { id: 'global.name-7-5', name: 'Seven and a Half, Named', desc: 'Include 7 1/2 or 7.5 in your name. Management has added you to the 7 1/2 list. The list is 7 1/2 items long.', icon: '🔢', secret: true, reward: 7.5,
      check: () => { const x = raw(); return x.indexOf('7 1/2') >= 0 || x.indexOf('7.5') >= 0; } }
  ]);

  /* ================= MANAGEMENT, AND OTHER THINGS THAT ADD UP ================= */
  P.addAchievements([
    { id: 'global.narr-10', name: 'Listening, Technically', desc: 'Hear Management speak 10 times. Management has logged 10 instances of being listened to and is trying not to make it weird.', icon: '🎙️', reward: 0.5,
      check: (s) => n(s, 'narrator.lines') >= 10 },
    { id: 'global.narr-1000', name: 'A Thousand Sentences, a Few Meant', desc: 'Hear Management 1,000 times. About 7 1/2 percent of it was meant. Management has not said which percent.', icon: '📢', reward: 7.5,
      check: (s) => n(s, 'narrator.lines') >= 1000 },
    { id: 'global.narr-5000', name: 'Management Has Run Out, and Kept Going', desc: 'Hear Management 5,000 times. Management has run out of things to say. It has kept going, in the belief that this is what a voice is for.', icon: '🔉', reward: 20,
      check: (s) => n(s, 'narrator.lines') >= 5000 },
    { id: 'global.lifer', name: 'Lobby Lifer', desc: 'Click 1,000 times without entering a single department. The Lobby is the whole game now. The Lobby is humbled, and a little concerned.', icon: '🏠', secret: true, reward: 5,
      check: (s) => n(s, 'clicks.total') >= 1000 && n(s, 'modules.entered') === 0 },
    { id: 'global.window-shopper', name: 'Window Shopper, Permanently', desc: 'Return to the Lobby 50 times without buying anything. The Gift Shop has begun waving. You have begun not waving.', icon: '👀', reward: 3,
      check: (s) => n(s, 'lobby.visits') >= 50 && n(s, 'shop.bought') === 0 },
    { id: 'global.literate', name: 'Literate Employee', desc: 'Read the Terms of Service, accept them, and watch the credits to the end. You have read all the writing in the building and agreed to it. Sandra has no further comment.', icon: '🔤', secret: true, reward: 7.5,
      check: (s) => n(s, 'tos.scrolls') >= 1 && n(s, 'lobby.tosAccepts') >= 1 && n(s, 'lobby.creditsEnded') >= 1 }
  ]);
})();
