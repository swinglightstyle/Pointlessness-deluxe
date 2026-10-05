/* POINTLESS ui 75: boss key (fake spreadsheet), Konami code, the word "potato", keyboard shortcuts, Escape routing,
 * document title, crash notices. Global key handling lives here, in one place. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;
  const NAT = P.native;
  const h = LB.h;
  const BOSS_TITLE = 'Quarterly_Report_FINAL_v7_REAL.xlsx - Spreadsheet';
  /* Lobby keyboard shortcuts (B, Konami, "potato", / and ?) belong to the Lobby: in ?dev=<id> / ?selftest=<id> and inside a module they stay
   * out of the way, so a module may use B, P, O, T and A freely. (Inside a module only the grave accent ` is the boss key.) */
  function lobbyKeys() { return P.params.mode === 'lobby' || P.params.target === 'lobby'; }
  const BASE_TITLE = 'POINTLESS™ DELUXE';

  /* ---------------- document title ---------------- */
  LB.paintTitle = function () {
    const c = P.host.current;
    try { document.title = c && c.def ? c.def.title + ' · ' + BASE_TITLE : BASE_TITLE; } catch (e) { /* ignore */ }
  };

  /* ---------------- boss key ---------------- */
  const DEPTS = ['Synergy', 'Alignment', 'Leveraging', 'Circling Back', 'Touching Base', 'Deliverables (Delivered)', 'Learnings', 'Going Forward', 'Low-Hanging Fruit', 'Bandwidth', 'Stakeholders',
    'Pain Points', 'Value Add', 'Deep Dives', 'Offline Discussions', 'Key Takeaways', 'Mindshare', 'Ideation', 'Paradigms (Shifted)', 'Pivot (Minor)'];
  const STATUS = ['On Track', 'Technically On Track', 'At Risk (Of Being Fine)', 'Tuesday', 'Pending Pending', 'Green (Yellow)'];
  const NOTES = ['see attached', 'per Sandra', 'TBD (TBD)', 'circle back', 'N/A (applicable)', 'see previous', 'per my last email', 'do not open'];
  const COLS = 'ABCDEFGH'.split('');

  function buildBossEl() {
    const formulaRef = h('span', { class: 'lb-bx-ref' }, 'A1');
    const formulaTxt = h('span', { class: 'lb-bx-fx' }, 'Quarterly Report (FINAL v7 REAL)');
    const table = h('table', { class: 'lb-bx-table' });
    const headRow = h('tr', {}, h('th', { class: 'lb-bx-corner' }));
    COLS.forEach(function (c) { headRow.appendChild(h('th', { class: 'lb-bx-col' }, c)); });
    table.appendChild(headRow);
    const rows = [];
    rows.push(['Quarterly Report (FINAL v7 REAL)', '', '', '', '', '', '', '']);
    rows.push(['', '', '', '', '', '', '', '']);
    rows.push(['Department', 'Q1', 'Q2', 'Q3', 'Q4', 'Total', 'Status', 'Notes']);
    const sums = [0, 0, 0, 0, 0];
    DEPTS.forEach(function (d, i) {
      const q = [0, 1, 2, 3].map(function (k) { return ((i * 7 + k * 5 + 3) % 17) + 2; });
      const total = q.reduce(function (a, b) { return a + b; }, 0);
      q.forEach(function (v, k) { sums[k] += v; }); sums[4] += total;
      rows.push([d, q[0], q[1], q[2], q[3], total, STATUS[i % STATUS.length], NOTES[(i * 3) % NOTES.length]]);
    });
    rows.push(['TOTAL', sums[0], sums[1], sums[2], sums[3], sums[4], 'Tuesday', 'see previous']);
    rows.push(['AVERAGE', (sums[0] / DEPTS.length).toFixed(1), (sums[1] / DEPTS.length).toFixed(1), (sums[2] / DEPTS.length).toFixed(1), (sums[3] / DEPTS.length).toFixed(1), (sums[4] / DEPTS.length).toFixed(1), '7 1/2', 'rounded']);
    let selected = null;
    rows.forEach(function (r, ri) {
      const tr = h('tr', {}, h('th', { class: 'lb-bx-row' }, String(ri + 1)));
      r.forEach(function (v, ci) {
        const td = h('td', { class: 'lb-bx-cell' + (ri === 2 ? ' lb-bx-hd' : '') + (typeof v === 'number' || /^\d/.test(String(v)) ? ' lb-bx-num' : '') }, String(v));
        NAT.add(td, 'click', function () {
          if (selected) selected.classList.remove('lb-bx-sel');
          selected = td; td.classList.add('lb-bx-sel');
          formulaRef.textContent = COLS[ci] + (ri + 1);
          formulaTxt.textContent = (ci === 5 && ri >= 3 && ri < 3 + DEPTS.length) ? '=SUM(B' + (ri + 1) + ':E' + (ri + 1) + ')' : (ri === rows.length - 2 && ci > 0 && ci < 6 ? '=SUM(' + COLS[ci] + '4:' + COLS[ci] + (3 + DEPTS.length) + ')' : String(v));
        });
        tr.appendChild(td);
      });
      table.appendChild(tr);
    });
    const closeBtn = h('button', { type: 'button', class: 'lb-bx-close', 'aria-label': 'Close the spreadsheet and return (B or Escape)' }, '✕');
    const el = h('div', { class: 'lb-boss', role: 'dialog', 'aria-label': 'Spreadsheet', tabindex: '-1' },
      h('div', { class: 'lb-bx-titlebar' }, h('span', { class: 'lb-bx-icon', 'aria-hidden': 'true' }, '▦'), h('span', { class: 'lb-bx-name' }, BOSS_TITLE), closeBtn),
      h('div', { class: 'lb-bx-menu', 'aria-hidden': 'true' }, ['File', 'Home', 'Insert', 'Page Layout', 'Formulas', 'Data', 'Review', 'View'].map(function (t, i) { return h('span', { class: i === 1 ? 'lb-on' : '' }, t); })),
      h('div', { class: 'lb-bx-tools', 'aria-hidden': 'true' }, ['B', 'I', 'U', '%', ',', '.0', '∑', '⇅'].map(function (t) { return h('span', {}, t); })),
      h('div', { class: 'lb-bx-formula' }, formulaRef, h('span', { class: 'lb-bx-fxicon', 'aria-hidden': 'true' }, 'fx'), formulaTxt),
      h('div', { class: 'lb-bx-sheet' }, table),
      h('div', { class: 'lb-bx-tabs', 'aria-hidden': 'true' }, h('span', {}, 'Sheet1'), h('span', {}, 'Sheet1 (2)'), h('span', { class: 'lb-on' }, 'Sheet1 (2) FINAL'), h('span', {}, '+')),
      h('div', { class: 'lb-bx-status', 'aria-hidden': 'true' }, h('span', {}, 'Ready'), h('span', {}, 'Average: 7 1/2   Count: ' + DEPTS.length + '   Sum: ' + (rows[rows.length - 2][5]))));
    return { el: el, closeBtn: closeBtn };
  }

  let boss = null, bossPrevFocus = null;
  function bossActive() { return !!(boss && boss.el.isConnected); }
  function openBoss() {
    if (bossActive()) return;
    boss = buildBossEl();
    const host = P.ui.shell || document.body;
    host.appendChild(boss.el);
    document.body.classList.add('lb-boss-open');
    try { bossPrevFocus = document.activeElement; } catch (e) { bossPrevFocus = null; }
    try { P.sfx.suspend(true); } catch (e) { /* ignore */ }          // transient hush: never written to the save, so a crash cannot leave the game muted
    try { document.title = BOSS_TITLE; } catch (e) { /* ignore */ }
    NAT.add(boss.closeBtn, 'click', closeBoss);
    try { boss.el.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
    LB.stat('lobby.bossKeys');
    if (P.state.stat.get('lobby.bossKeys') === 1) LB.say(LB.bag('bossIn', LB.text.bossIn), { priority: 0, mood: 'panic' });
  }
  function closeBoss() {
    if (!bossActive()) return;
    const b = boss; boss = null;
    if (b.el.parentNode) b.el.parentNode.removeChild(b.el);
    document.body.classList.remove('lb-boss-open');
    try { P.sfx.suspend(false); } catch (e) { /* ignore */ }
    LB.paintTitle();
    if (bossPrevFocus && bossPrevFocus.isConnected && bossPrevFocus.focus) { try { bossPrevFocus.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    LB.say(LB.bag('bossBack', LB.text.bossBack), { priority: 1, mood: 'smug' });
  }
  LB.parts.boss = { active: bossActive, open: openBoss, close: closeBoss, toggle: function () { if (bossActive()) closeBoss(); else openBoss(); } };

  /* ---------------- keyboard ---------------- */
  const KONAMI = ['arrowup', 'arrowup', 'arrowdown', 'arrowdown', 'arrowleft', 'arrowright', 'arrowleft', 'arrowright', 'b', 'a'];
  const POTATO = ['p', 'o', 't', 'a', 't', 'o'];
  const kbuf = [], pbuf = [];          // rolling buffers of the latest keys: a near-miss ("Up" then the whole sequence) still counts
  let discoTimer = 0;

  function isTyping(t) {
    if (!t || !t.tagName) return false;
    const tag = t.tagName;
    if (tag === 'TEXTAREA' || tag === 'SELECT') return true;
    if (tag === 'INPUT') { const ty = (t.type || 'text').toLowerCase(); return !(ty === 'checkbox' || ty === 'radio' || ty === 'button' || ty === 'submit' || ty === 'range'); }
    return !!t.isContentEditable;
  }
  function konami() {
    LB.stat('lobby.konami');
    LB.achieve('lobby.konami');
    LB.sfx('tada'); LB.confetti(undefined, undefined, 120);
    LB.say(LB.bag('konami', LB.text.konami), { priority: 2, mood: 'proud' });
    if (!LB.flag('lobby.konamiPaid')) { LB.flag('lobby.konamiPaid', true); P.state.addMeh(30, { reason: 'ancient sequence' }); }   // paid once: the ancient sequence is not a Meh farm
    document.body.classList.add('lb-disco');
    if (discoTimer) NAT.clearTimeout(discoTimer);
    discoTimer = LB.later(function () { discoTimer = 0; document.body.classList.remove('lb-disco'); }, 9000);
  }
  function potato() {
    LB.stat('lobby.potato');
    LB.achieve('lobby.potato');
    LB.flag('metGerald', true);
    LB.sfx('honk');
    LB.say(LB.bag('potato', LB.text.potato), { priority: 2, mood: 'proud', who: 'Gerald' });
  }
  function handleEscape(e) {
    if (bossActive()) { e.preventDefault(); closeBoss(); return; }
    const hd = LB.parts.header;
    if (hd && hd.menuOpen()) { hd.setMenu(false, true); return; }
    const nar = LB.parts.narrator;
    if (nar && nar.logOpen && nar.logOpen()) { nar.setLog(false); return; }
    if (LB.currentScreen()) { LB.closeScreen('escape'); return; }
  }

  NAT.add(document, 'keydown', function (e) {
    const key = String(e.key || '');
    if (key === 'Escape') { handleEscape(e); return; }
    if (!lobbyKeys()) return;
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    if (isTyping(e.target)) return;
    if (P.host.current) {                        // inside a module: hands off every letter, except the grave accent (boss key)
      if (key === '`' && !e.repeat) LB.parts.boss.toggle();
      return;
    }
    const lk = key.toLowerCase();
    /* sequences: compare the last N keys, so a stray extra key before the sequence does not spoil it */
    kbuf.push(lk); if (kbuf.length > KONAMI.length) kbuf.shift();
    pbuf.push(lk); if (pbuf.length > POTATO.length) pbuf.shift();
    if (kbuf.join(',') === KONAMI.join(',')) { kbuf.length = 0; konami(); return; }
    if (pbuf.join(',') === POTATO.join(',')) { pbuf.length = 0; potato(); }
    /* single keys */
    if (lk === 'b' && !e.repeat) {
      if (kbuf.slice(-9).join(',') === KONAMI.slice(0, 9).join(',')) return;       // that was the "B" of the ancient sequence, not the boss key
      LB.parts.boss.toggle();
      return;
    }
    if (bossActive()) return;
    if (key === '/' && !LB.currentScreen()) {
      e.preventDefault();
      if (LB.parts.grid) LB.parts.grid.focusSearch();
    } else if (key === '?' && !LB.currentScreen()) {
      LB.openScreen('about');
    }
  });

  /* ---------------- module crash notice + document title ---------------- */
  P.on('module:crash', function (c) {
    LB.toast('A module has gone out to lunch. Details: More > Diagnostics.', { icon: '🥪', title: 'Crash shield', duration: 5000 });
    void c;
  });
  P.on('module:mounted', LB.paintTitle);
  P.on('module:exit', LB.paintTitle);
})();
