/* POINTLESS ui 40: Lobby chrome - intranet bar, header (logo, Meh counter), nav + More menu, news ticker,
 * banners, memo strip, footer. LB.buildChrome(root) appends them and returns refs in LB.parts.header. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;
  const NAT = P.native;
  const h = LB.h;

  const NAV = [
    { id: 'shop', ico: '🛍️', txt: 'Gift Shop', sub: 'of Nothing', full: 'Gift Shop of Nothing' },
    { id: 'trophies', ico: '🏆', txt: 'Trophies', sub: 'Cabinet', full: 'Trophy Cabinet' },
    { id: 'stats', ico: '📊', txt: 'Statistics', sub: 'Nobody Asked For', full: 'Statistics Nobody Asked For' },
    { id: 'settings', ico: '🎛️', txt: 'Settings', sub: '(Decorative)', full: 'Settings (Decorative)' },
    { id: 'ascend', ico: '⬆️', txt: 'Ascend', sub: '(Costs Meh)', full: 'Ascend' }
  ];
  const MORE = [
    { id: 'about', ico: '📖', label: 'About / Employee Handbook' },
    { id: 'credits', ico: '🎬', label: 'Credits' },
    { id: 'tos', ico: '📜', label: 'Terms of Service' },
    { id: 'patchnotes', ico: '📝', label: 'Patch Notes' },
    { id: 'savetools', ico: '💾', label: 'Save Tools' },
    { id: 'diagnostics', ico: '🔧', label: 'Diagnostics' },
    { id: 'farewell', ico: '👋', label: 'Clock Out' }
  ];

  function greetWord() {
    const hr = new Date().getHours();
    return hr < 5 ? 'Good night' : hr < 12 ? 'Good morning' : hr < 18 ? 'Good afternoon' : 'Good evening';
  }

  LB.buildChrome = function (root) {
    const refs = {};
    const offs = [];

    /* ---------- intranet bar ---------- */
    const whoEl = h('span', { class: 'lb-who' });
    const topbar = h('div', { class: 'lb-topbar' },
      h('span', { class: 'lb-crumbs' }, 'Intranet ', h('i', { 'aria-hidden': 'true' }, '›'), ' Lobby ', h('i', { 'aria-hidden': 'true' }, '›'), ' Pointless Deluxe'),
      h('span', { class: 'lb-topbar-r' }, whoEl, h('span', { class: 'lb-wallclock', title: 'The wall clock is correct. It is the time that is wrong.' }, '🕓 4:17 PM (confident)')));

    /* ---------- header: logo + purse ---------- */
    const letters = h('span', { class: 'lb-logo-word', 'aria-hidden': 'true' });
    'POINTLESS'.split('').forEach(function (ch, i) {
      letters.appendChild(h('span', { class: 'lb-l lb-c' + (i % 5), style: { '--r': (((i * 37) % 7) - 3) + 'deg', '--d': (i * 60) + 'ms' } }, ch));
    });
    const logo = h('button', { type: 'button', class: 'lb-logo', 'aria-label': 'POINTLESS (TM) DELUXE', title: 'POINTLESS(TM) DELUXE' },
      letters, h('sup', { class: 'lb-tm', 'aria-hidden': 'true' }, '™'), h('span', { class: 'lb-ribbon', 'aria-hidden': 'true' }, 'DELUXE'));
    const sub = h('p', { class: 'lb-sub' }, LB.text.subtitles[0]);
    const mehBtn = h('button', { type: 'button', class: 'lb-meh', title: 'Your Meh. It is a counter, not a button.' });
    const passive = h('small', { class: 'lb-passive' }, 'Passive Meh (Unearned): warming up');
    const asc = h('span', { class: 'lb-asc', hidden: true });
    const purse = h('div', { class: 'lb-purse' },
      h('div', { class: 'lb-meh-wrap' }, h('span', { class: 'lb-meh-label' }, 'Your Meh'), mehBtn), passive, asc);
    /* the logo button lives inside the page's one <h1> (accessible name: POINTLESS (TM) DELUXE) */
    const header = h('header', { class: 'lb-header' }, h('div', { class: 'lb-brand' }, h('h1', { class: 'lb-title1' }, logo), sub), purse);
    offs.push(P.ui.bindMeh(mehBtn, { suffix: '' }));

    let logoClicks = 0, subIdx = 0;
    NAT.add(logo, 'click', function () {
      logoClicks++;
      LB.stat('lobby.logoClicks');
      LB.sfx(logoClicks >= 10 ? 'tada' : 'pop');
      logo.classList.remove('lb-wiggle'); void logo.offsetWidth; logo.classList.add('lb-wiggle');
      const m = LB.text.logoMilestones[logoClicks];
      if (m) LB.say(m, { priority: 1, mood: logoClicks >= 10 ? 'proud' : 'confused' });
      if (logoClicks === 10) { logo.classList.add('lb-spin'); LB.later(function () { logo.classList.remove('lb-spin'); }, 1400); LB.confetti(); LB.achieve('lobby.logo'); }
    });
    let mehClicks = 0;
    NAT.add(mehBtn, 'click', function () {
      mehClicks++;
      LB.stat('lobby.mehClicks');
      LB.sfx('blip');
      const m = LB.text.mehMilestones[mehClicks];
      if (m) LB.say(m, { priority: 1, mood: 'confused' });
    });
    offs.push(P.on('meh', function (e) {
      if (!e) return;
      if (e.passive) {
        passive.textContent = 'Passive Meh (Unearned): +' + LB.fmt(e.delta) + ' · ' + LB.fmt(P.state.stat.get('meh.passive')) + ' so far';
      } else if (e.delta > 0 && !LB.reduced()) {
        mehBtn.classList.remove('lb-pop'); void mehBtn.offsetWidth; mehBtn.classList.add('lb-pop');
      }
    }));

    function rotateSub() {
      subIdx = (subIdx + 1 + Math.floor(LB.rand() * 3)) % LB.text.subtitles.length;
      sub.textContent = LB.text.subtitles[subIdx];
    }

    /* ---------- nav ---------- */
    const navBtns = {};
    const badge = h('span', { class: 'lb-badge', hidden: true, 'aria-label': 'new trophies' });
    const nav = h('nav', { class: 'lb-nav', 'aria-label': 'Lobby navigation' });
    NAV.forEach(function (n) {
      const b = h('button', { type: 'button', class: 'lb-nav-btn', title: n.full, 'aria-pressed': 'false', 'data-screen': n.id },
        h('span', { class: 'lb-nav-ico', 'aria-hidden': 'true' }, n.ico),
        h('span', { class: 'lb-nav-txt' }, n.txt, h('small', { class: 'lb-nav-sub' }, n.sub)),
        n.id === 'trophies' ? badge : null);
      b.setAttribute('aria-label', n.full);
      NAT.add(b, 'click', function () { if (LB.currentScreen() === n.id) LB.closeScreen(); else LB.openScreen(n.id); });
      navBtns[n.id] = b; nav.appendChild(b);
    });
    /* More menu */
    const moreBtn = h('button', { type: 'button', class: 'lb-nav-btn lb-nav-more', 'aria-haspopup': 'true', 'aria-expanded': 'false', 'aria-pressed': 'false' },
      h('span', { class: 'lb-nav-ico', 'aria-hidden': 'true' }, '☰'), h('span', { class: 'lb-nav-txt' }, 'More', h('small', { class: 'lb-nav-sub' }, 'Handbook, Fine Print')));
    const menu = h('div', { class: 'lb-menu', role: 'menu', hidden: true, 'aria-label': 'More' });
    const menuBtns = {};
    MORE.forEach(function (m) {
      const b = h('button', { type: 'button', class: 'lb-menu-item', role: 'menuitem' }, h('span', { 'aria-hidden': 'true' }, m.ico), ' ' + m.label);
      NAT.add(b, 'click', function () { setMenu(false); LB.openScreen(m.id); });
      menuBtns[m.id] = b; menu.appendChild(b);
    });
    const moreWrap = h('div', { class: 'lb-more' }, moreBtn, menu);
    nav.appendChild(moreWrap);
    function setMenu(open, focusBtn) {
      menu.hidden = !open;
      moreBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
      if (!open && focusBtn) { try { moreBtn.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    }
    NAT.add(moreBtn, 'click', function () { setMenu(menu.hidden); });
    NAT.add(document, 'mousedown', function (e) { if (!menu.hidden && !moreWrap.contains(e.target)) setMenu(false); });
    NAT.add(menu, 'keydown', function (e) {
      if (e.key !== 'ArrowDown' && e.key !== 'ArrowUp') return;
      const items = Array.prototype.slice.call(menu.querySelectorAll('button'));
      const i = items.indexOf(document.activeElement);
      const n = items[(i + (e.key === 'ArrowDown' ? 1 : items.length - 1)) % items.length];
      if (n) { e.preventDefault(); n.focus(); }
    });

    function paintNav() {
      const cur = LB.currentScreen();
      Object.keys(navBtns).forEach(function (id) { const on = cur === id; navBtns[id].setAttribute('aria-pressed', on ? 'true' : 'false'); navBtns[id].classList.toggle('lb-on', on); });
      const inMore = !!(cur && menuBtns[cur]);
      moreBtn.setAttribute('aria-pressed', inMore ? 'true' : 'false'); moreBtn.classList.toggle('lb-on', inMore);
    }
    offs.push(P.on('lobby:screen', paintNav));

    function paintBadge() {
      const unseen = Math.max(0, P.state.ach.count() - (Number(LB.flag('lobby.trophiesSeen')) || 0));
      badge.hidden = unseen <= 0;
      badge.textContent = unseen > 99 ? '99+' : String(unseen);
    }
    offs.push(P.on('achievement', paintBadge));

    /* ---------- ticker ---------- */
    const tickLabel = h('span', { class: 'lb-ticker-label' }, h('i', { class: 'lb-live', 'aria-hidden': 'true' }), h('span', { class: 'lb-tl-long' }, 'POINTLESS NEWS NETWORK'), h('span', { class: 'lb-tl-short', 'aria-hidden': 'true' }, 'PNN'));
    const track = h('div', { class: 'lb-ticker-track', 'aria-hidden': 'true' });
    const view = h('div', { class: 'lb-ticker-view' }, track);
    const srTicker = h('p', { class: 'pm-sr' });
    /* WCAG 2.2.2: moving content that starts by itself needs a pause control. Fixed label + aria-pressed (not both a changing label and a state). */
    const pauseBtn = h('button', { type: 'button', class: 'lb-ticker-pause', 'aria-pressed': 'false', 'aria-label': 'Pause the news ticker', title: 'Pause or resume the news ticker' }, '⏸');
    const ticker = h('section', { class: 'lb-ticker', 'aria-label': 'Pointless News Network' }, tickLabel, view, pauseBtn, srTicker);
    let headlines = [], tIdx = 0, tStatic = false, tPaused = false;
    function setTickerPaused(p) {
      tPaused = !!p;
      ticker.classList.toggle('lb-paused', tPaused);
      pauseBtn.setAttribute('aria-pressed', tPaused ? 'true' : 'false');
      pauseBtn.textContent = tPaused ? '▶' : '⏸';
    }
    NAT.add(pauseBtn, 'click', function () { setTickerPaused(!tPaused); });
    NAT.add(view, 'click', function () { setTickerPaused(!tPaused); });          // tap the strip itself to pause on touch screens
    function pickHeadlines(n) {
      const seen = {}, out = [];
      for (let i = 0; i < n * 4 && out.length < n; i++) { const t = LB.line('ticker'); if (!seen[t]) { seen[t] = 1; out.push(t); } }
      return out;
    }
    function makeRun() {
      const run = h('span', { class: 'lb-ticker-run' });
      headlines.forEach(function (t) { run.appendChild(h('span', { class: 'lb-ticker-item' }, t)); run.appendChild(h('i', { class: 'lb-ticker-sep', 'aria-hidden': 'true' }, '✦')); });
      return run;
    }
    function renderTicker() {
      tStatic = LB.reduced();
      headlines = pickHeadlines(9);
      if (!headlines.length) headlines = ['Nothing to report. Reporting it anyway.'];
      LB.clear(track);
      ticker.classList.toggle('lb-static', tStatic);
      if (tStatic) {
        tIdx = 0;
        track.appendChild(h('span', { class: 'lb-ticker-run' }, h('span', { class: 'lb-ticker-item' }, headlines[0])));
        track.style.animationDuration = '';
      } else {
        track.appendChild(makeRun()); track.appendChild(makeRun());
        const chars = headlines.reduce(function (a, t) { return a + t.length + 4; }, 0);
        track.style.animationDuration = Math.max(40, Math.round(chars * 0.15)) + 's';
      }
      srTicker.textContent = headlines.slice(0, 3).join('. ');
    }
    NAT.add(track, 'animationiteration', function () { if (!tStatic) renderTicker(); });
    offs.push(P.on('setting', function (e) { if (e && e.id === 'reduceMotion') renderTicker(); }));
    function stepStaticTicker() {
      if (!tStatic) { if (LB.reduced()) renderTicker(); return; }
      if (tPaused) return;
      tIdx++;
      if (tIdx >= headlines.length) { renderTicker(); return; }
      LB.clear(track);
      track.appendChild(h('span', { class: 'lb-ticker-run' }, h('span', { class: 'lb-ticker-item' }, headlines[tIdx])));
    }

    /* ---------- banners ---------- */
    const banners = h('div', { class: 'lb-banners', 'aria-live': 'polite' });
    LB.addBanner = function (text, o) {
      o = o || {};
      const b = h('div', { class: 'lb-banner' + (o.kind ? ' lb-banner-' + o.kind : ''), role: 'status' },
        h('span', { class: 'lb-banner-ico', 'aria-hidden': 'true' }, o.icon || '📌'),
        h('span', { class: 'lb-banner-text' }, text),
        h('button', { type: 'button', class: 'lb-btn lb-btn-small', onclick: function () { if (b.parentNode) b.parentNode.removeChild(b); } }, 'Dismiss'));
      banners.appendChild(b);
      while (banners.children.length > 3) banners.removeChild(banners.firstChild);
      return b;
    };

    /* ---------- memo strip ---------- */
    const memoTitle = h('h2', { class: 'lb-memo-title' });
    const memoTip = h('p', { class: 'lb-memo-tip' });
    const rankName = h('b', { class: 'lb-rank-name' });
    const rankNext = h('span', { class: 'lb-rank-next' });
    const rankBar = h('span', { class: 'lb-rank-bar' }, h('i', { class: 'lb-rank-fill' }));
    const tipBtn = h('button', { type: 'button', class: 'lb-btn lb-btn-small' }, 'Another tip');
    const memo = h('section', { class: 'lb-memo', 'aria-label': 'Memo' },
      h('div', { class: 'lb-memo-pin', 'aria-hidden': 'true' }, '📌'),
      h('div', { class: 'lb-memo-main' }, h('span', { class: 'lb-memo-kicker' }, 'MEMO'), memoTitle, memoTip, tipBtn),
      h('div', { class: 'lb-memo-rank' }, h('span', { class: 'lb-memo-kicker' }, 'YOUR CURRENT RANK'), rankName, rankBar, rankNext));
    NAT.add(tipBtn, 'click', function () { memoTip.textContent = LB.line('tip'); LB.sfx('blip'); });
    function paintMemo() {
      const nm = LB.player();
      memoTitle.textContent = greetWord() + ', ' + nm + '.';
      whoEl.textContent = 'Employee: ' + LB.trunc(nm, 24);
      const r = LB.rank();
      rankName.textContent = r.name;
      rankBar.firstChild.style.width = Math.round(r.frac * 100) + '%';
      rankNext.textContent = r.next ? 'Next: ' + r.next + ' at ' + LB.fmt(r.nextAt) + ' Meh earned' : 'There is no higher rank. There is a taller chair.';
    }
    let rankTimer = 0;
    offs.push(P.on('meh', function () {
      if (rankTimer) return;
      rankTimer = NAT.setTimeout(function () { rankTimer = 0; paintMemo(); }, 2000);
    }));
    offs.push(P.on('player', paintMemo));

    /* ---------- ascension cosmetic badge ---------- */
    function paintAsc() {
      const n = P.state.ascensions();
      const c = LB.ascCosmetic ? LB.ascCosmetic(n) : null;
      asc.hidden = !c;
      if (c) { asc.textContent = c.emoji + ' ' + c.name + (n > 1 ? ' ×' + n : ''); asc.title = 'Ascension ' + n + ': ' + c.desc; }
      document.body.classList.toggle('lbx-ascended', n > 0);
      document.body.style.setProperty('--lb-hum', String(Math.min(6, n)));
    }
    offs.push(P.on('ascend', paintAsc));

    /* ---------- footer ---------- */
    const saveNote = h('span', { class: 'lb-save-note' });
    function paintFooter() {
      saveNote.textContent = !P.storage.isPersistent() ? 'Save: memory only (lives in this tab)'
        : (P.state.saveOk() ? 'Save: stored in this browser' : 'Save: NOT being stored (browser storage is full or blocked)');
    }
    const footer = h('footer', { class: 'lb-footer' },
      h('span', {}, 'POINTLESS™ DELUXE v' + P.version + ' · A Management product · All rights reserved, mostly'),
      saveNote,
      h('span', { class: 'lb-footer-links' },
        h('button', { type: 'button', class: 'lb-link', onclick: function () { LB.openScreen('tos'); } }, 'Terms of Service'),
        h('button', { type: 'button', class: 'lb-link', onclick: function () { LB.openScreen('credits'); } }, 'Credits'),
        h('button', { type: 'button', class: 'lb-link', onclick: function () { LB.openScreen('patchnotes'); } }, 'Patch Notes')),
      h('span', { class: 'lb-footer-hint' }, 'Press B if someone walks past (inside a department: the  key).'));

    [topbar, header, nav, ticker, banners, memo].forEach(function (e) { root.appendChild(e); });
    /* keyboard users: the first Tab stop skips the logo, the Meh counter, the nav and the ticker */
    const skip = h('a', { class: 'lb-skip', href: '#lb-main' }, 'Skip to departments');
    NAT.add(skip, 'click', function (e) { e.preventDefault(); const m = document.getElementById('lb-main'); if (m) { try { m.focus({ preventScroll: false }); } catch (x) { /* ignore */ } } });
    root.insertBefore(skip, root.firstChild);
    LB.parts.header = {
      topbar: topbar, header: header, nav: nav, ticker: ticker, memo: memo, footer: footer, banners: banners,
      setMenu: setMenu, menuOpen: function () { return !menu.hidden; },
      navBtn: function (id) { return navBtns[id] || null; },
      rotateSub: rotateSub, stepStaticTicker: stepStaticTicker, renderTicker: renderTicker,
      refresh: function () { paintMemo(); paintBadge(); paintAsc(); paintFooter(); paintNav(); memoTip.textContent = LB.line('tip'); },
      paintBadge: paintBadge, paintMemo: paintMemo, paintAsc: paintAsc, paintFooter: paintFooter,
      destroy: function () { offs.splice(0).forEach(function (f) { try { f(); } catch (e) { /* ignore */ } }); }
    };
    renderTicker();
    LB.parts.header.refresh();
    LB.registerRefresh(function () { LB.parts.header.refresh(); renderTicker(); });
    return refs.footer = footer;
  };
})();
