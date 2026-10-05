/* POINTLESS ui 62: Statistics Nobody Asked For - every stat with a funny label (known map + prettified fallback),
 * per-department sections (lazy), and a few frankly invented statistics. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;
  const NAT = P.native;
  const h = LB.h;

  const KNOWN = {
    'meh.earned': ['Meh earned, lifetime, pre-feeling', 'n'], 'meh.spent': ['Meh spent on things', 'n'], 'meh.passive': ['Passive Meh (Unearned)', 'n'],
    'lobby.visits': ['Times you returned to the Lobby', 'n'], 'clicks.total': ['Clicks, each personally logged', 'n'], 'keys.total': ['Keys pressed, none of them wrongly', 'n'],
    'time.seconds': ['Time on the clock (billed to nothing)', 'dur'], 'modules.entered': ['Departments entered', 'n'], 'modules.unlocked': ['Doors opened with money', 'n'],
    'shop.bought': ['Items purchased from nothing', 'n'], 'achievements.unlocked': ['Trophies awarded', 'n'], 'narrator.lines': ['Things Management has said at you', 'n'],
    'ascensions': ['Ascensions (same place, humming)', 'n'], 'tos.scrolls': ['Scrolls through the Terms of Service', 'n'], 'session.count': ['Sessions started', 'n'],
    'lobby.plantPokes': ['Pokes delivered to Dennis (Plant)', 'n'], 'lobby.logoClicks': ['Clicks on the logo', 'n'], 'lobby.clockClicks': ['Adjustments made to the wrong clock', 'n'],
    'lobby.mehClicks': ['Clicks on the Meh counter, which is not a button', 'n'], 'lobby.fortunes': ['Fortunes dispensed', 'n'], 'lobby.surprises': ['Surprises requested and delivered', 'n'],
    'lobby.bossKeys': ['Times you hid from Management', 'n'], 'lobby.refundForms': ['Refund forms filed', 'n'], 'lobby.refundsCompleted': ['Refunds processed (0 Meh each)', 'n'],
    'lobby.refundOpens': ['Visits to the refund desk', 'n'], 'lobby.emptySearches': ['Searches that found nothing', 'n'], 'lobby.screensOpened': ['Screens opened in the Lobby', 'n'],
    'lobby.konami': ['Ancient sequences entered', 'n'], 'lobby.settingsTouched': ['Decorative settings fiddled with', 'n'], 'lobby.tosAccepts': ['Times the Terms were accepted', 'n'],
    'lobby.tosDodges': ['Times the Accept button dodged you', 'n'], 'lobby.creditsRolls': ['Credit rolls started', 'n'], 'lobby.creditsEnded': ['Credit rolls survived to the end', 'n'],
    'lobby.potato': ['Times Gerald was summoned', 'n'], 'lobby.resets': ['Complete erasures survived', 'n']
  };

  function labelFor(key) {
    if (KNOWN[key]) return { label: KNOWN[key][0], kind: KNOWN[key][1] };
    const m = /^([a-z0-9-]+)\.(.+)$/.exec(key);
    if (m && P.moduleMap[m[1]]) {
      if (m[2] === 'entered') return { label: 'Visits', kind: 'n' };
      if (m[2] === 'seconds') return { label: 'Time spent here', kind: 'dur' };
      if (m[2] === 'meh') return { label: 'Meh earned here', kind: 'n' };
    }
    return { label: LB.prettify(key), kind: /seconds$|Seconds$/.test(key) ? 'dur' : 'n' };
  }
  function fmtVal(v, kind) { return kind === 'dur' ? LB.fmtDur(v) : LB.fmt(v); }
  function hoursToTuesday() {
    const now = new Date();
    const d = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const add = (2 - d.getDay() + 7) % 7;
    d.setDate(d.getDate() + (add === 0 ? 7 : add));
    return Math.round((d.getTime() - now.getTime()) / 3600000);
  }

  function fakeStats() {
    const s = P.state.stat.all();
    const clicks = s['clicks.total'] || 0;
    const earned = (s['meh.earned'] || 0) + (s['meh.passive'] || 0);
    const pokes = s['lobby.plantPokes'] || 0;
    const days = Math.max(0, Math.floor((Date.now() - (P.state.data.created || Date.now())) / 86400000));
    const wk = new Date().getDay() === 2;
    return [
      ['Hours until Tuesday', wk ? 'Today is Tuesday. It has been postponed by 0 hours.' : LB.fmt(hoursToTuesday()) + ' (approximately, and rising confidence)'],
      ['Probability that any of this matters', '0.0% (margin of error: 7 1/2 percent)'],
      ['Meh per click', clicks > 0 ? LB.fmt(Math.round(earned / clicks * 100) / 100) : 'Not yet measurable. Click something.'],
      ['Distance your cursor has travelled in the name of Meh', LB.fmt(Math.round(clicks * 0.14 * 10) / 10) + ' metres, give or take a desk'],
      ['Leaves on the third ficus', LB.fmt(7.5 + Math.floor((s['time.seconds'] || 0) / 300))],
      ['Dennis (Plant) current mood', pokes >= 50 ? 'Blooming, out of spite' : pokes >= 10 ? 'Not impressed' : pokes > 0 ? 'Tolerating you' : 'Thriving'],
      ['Management\'s confidence in you', Math.min(97, 51 + P.state.ach.count()) + '% (rounded in your favour, privately)'],
      ['Percentage of Meh that was fun', '7.5%'],
      ['Unread memos in your tray', LB.fmt(clicks % 17) + ' (they are the same memo)'],
      ['Tuesdays survived', LB.fmt(days) + ' days. All of the Tuesdays among them.'],
      ['Staples currently in the Stapler', 'Classified (union request)'],
      ['Refund forms awaiting Form 27B/7', LB.fmt(Math.max(0, Number(LB.flag('lobby.refundStep')) || 0)) + ' of 8']
    ];
  }

  LB.registerScreen('stats', {
    title: 'Statistics Nobody Asked For', icon: '📊', wide: true,
    render: function (body, ctx) {
      LB.achieve('lobby.stats');
      let query = '';
      const search = h('input', { type: 'search', class: 'lb-input', placeholder: 'Filter statistics…', maxlength: '40', 'aria-label': 'Filter statistics' });
      const out = h('div', { class: 'lb-stats-out' });
      const file = h('div', { class: 'lb-file' });
      body.appendChild(file);
      body.appendChild(h('div', { class: 'lb-stats-filter' }, search));
      body.appendChild(out);

      function row(label, val) { return [h('dt', {}, label), h('dd', {}, val)]; }
      function list(rows) { return h('dl', { class: 'lb-stat-list' }, rows.map(function (r) { return row(r[0], r[1]); })); }
      function matches(label) { return !query || label.toLowerCase().indexOf(query) >= 0; }
      function paintFile() {
        const r = LB.rank();
        LB.clear(file);
        file.appendChild(h('div', { class: 'lb-file-photo', 'aria-hidden': 'true' }, '👔'));
        file.appendChild(h('div', { class: 'lb-file-main' },
          h('h3', { class: 'lb-file-name' }, LB.player()),
          h('p', { class: 'lb-file-rank' }, r.name),
          h('p', { class: 'lb-file-line' }, 'Employee since ' + LB.dateStr(P.state.data.created || Date.now()) + ' · ' + LB.fmt(P.state.stat.get('session.count')) + ' ' + LB.plural(P.state.stat.get('session.count'), 'session') + ' · ' + LB.fmtDur(P.state.stat.get('time.seconds')) + ' on the clock'),
          h('p', { class: 'lb-file-line' }, 'Meh on hand: ' + LB.fmt(P.state.getMeh()) + ' · earned in total: ' + LB.fmt(P.state.stat.get('meh.earned') + P.state.stat.get('meh.passive')))));
      }
      function build() {
        LB.clear(out);
        const all = P.state.stat.all();
        const keys = Object.keys(all).sort();
        const engine = [], lobby = [], other = [], mods = Object.create(null);      // null prototype: a stat called 'constructor.visits' is just a stat
        keys.forEach(function (k) {
          const lf = labelFor(k);
          const item = [lf.label, fmtVal(all[k], lf.kind), k];
          const m = /^([a-z0-9-]+)\./.exec(k);
          if (KNOWN[k] && k.indexOf('lobby.') !== 0) engine.push(item);
          else if (k.indexOf('lobby.') === 0) lobby.push(item);
          else if (m && P.moduleMap[m[1]]) (mods[m[1]] || (mods[m[1]] = [])).push(item);
          else other.push(item);
        });
        // known engine stats never touched still deserve a row (zero is a statistic too)
        P.state.stat.ENGINE.forEach(function (k) { if (!(k in all)) engine.push([labelFor(k).label, '0', k]); });
        engine.sort(function (a, b) { return P.state.stat.ENGINE.indexOf(a[2]) - P.state.stat.ENGINE.indexOf(b[2]); });
        const filt = function (arr) { return arr.filter(function (r) { return matches(r[0]); }); };
        const section = function (title, sub, rows, cls) {
          if (!rows.length) return;
          out.appendChild(h('section', { class: 'lb-stat-sect ' + (cls || '') }, LB.sectionTitle(title, sub), list(rows)));
        };
        section('The Big Numbers', 'Counted by the building itself.', filt(engine), 'lb-s-big');
        section('Lobby Business', 'Recorded by the Lobby, which notices everything and mentions some of it.', filt(lobby));
        const mids = Object.keys(mods).sort(function (a, b) { return LB.moduleTitle(a).localeCompare(LB.moduleTitle(b)); });
        const shown = [];
        mids.forEach(function (id) {
          const title = LB.moduleTitle(id);
          const rows = mods[id].filter(function (r) { return !query || matches(r[0]) || title.toLowerCase().indexOf(query) >= 0; });
          if (rows.length) shown.push([id, title, rows]);
        });
        if (shown.length) {
          const sect = h('section', { class: 'lb-stat-sect lb-s-dept' }, LB.sectionTitle('Departments', 'Each department keeps its own books. Open one to read them.'));
          shown.slice(0, 60).forEach(function (g) {
            const det = h('details', { class: 'lb-stat-dept' }, h('summary', {}, h('span', { 'aria-hidden': 'true' }, P.moduleMap[g[0]].icon + ' '), g[1], h('small', {}, ' · ' + g[2].length + ' ' + LB.plural(g[2].length, 'statistic'))));
            let filled = false;
            const fill = function () { if (filled) return; filled = true; det.appendChild(list(g[2])); };
            NAT.add(det, 'toggle', function () { if (det.open) fill(); });
            if (query) { det.open = true; fill(); }
            sect.appendChild(det);
          });
          if (shown.length > 60) sect.appendChild(h('p', { class: 'lb-sect-sub' }, '...and ' + (shown.length - 60) + ' more departments. Narrow the filter to meet them.'));
          out.appendChild(sect);
        }
        const otherRows = filt(other);
        section('Other Quantities', 'Numbers of uncertain origin, held in trust.' + (otherRows.length > 150 ? ' (The first 150 of ' + otherRows.length + '; narrow the filter to meet the rest.)' : ''), otherRows.slice(0, 150));
        section('Fake Statistics', 'Invented for your comfort. Not independently verified, or dependently.', filt(fakeStats()), 'lb-s-fake');
        if (!out.firstChild) out.appendChild(LB.emptyState('📉', 'No statistic matches "' + LB.trunc(query, 24) + '".', LB.line('error404')));
      }
      NAT.add(search, 'input', function () { query = search.value.trim().toLowerCase(); build(); });
      paintFile(); build();
      let t = 0;
      ctx.on('stat', function () { if (t) return; t = NAT.setTimeout(function () { t = 0; if (ctx.isOpen() && !query) { paintFile(); } }, 1500); });
      ctx.onDispose(function () { if (t) NAT.clearTimeout(t); });
    }
  });
})();
