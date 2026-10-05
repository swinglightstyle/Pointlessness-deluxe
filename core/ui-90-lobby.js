/* POINTLESS ui 90: assembles the Lobby and registers it with P.ui.setLobby (last-sorting ui file, so it wins).
 * mount(container) builds everything once; show()/hide() are called by the module host; openScreen(id) serves ?screen= and the fuzz. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;
  const NAT = P.native;
  const h = LB.h;

  let root = null, beatTimer = 0, beat = 0, nextEvent = 80, mounted = false;

  function onBeat() {
    if (document.hidden || P.host.current) return;
    beat++;
    const hd = LB.parts.header, sd = LB.parts.side;
    if (hd) { if (beat % 10 === 0) hd.rotateSub(); if (beat % 7 === 0) hd.stepStaticTicker(); }
    if (sd) { if (beat % 34 === 0) sd.rotatePoster(); if (beat % 19 === 0) sd.rotateNote(); if (beat % 53 === 0) sd.rotatePlant(); }
    if (beat >= nextEvent) {
      nextEvent = beat + 70 + Math.floor(LB.rand() * 50);
      if (!LB.currentScreen() && !LB.parts.boss.active()) LB.toast(LB.line('lobbyEvent'), { icon: '🔔', title: 'Lobby event', duration: 5200 });
    }
  }
  function startBeat() { if (!beatTimer) beatTimer = NAT.setInterval(onBeat, 1000); }
  function stopBeat() { if (beatTimer) { NAT.clearInterval(beatTimer); beatTimer = 0; } }

  function decorateModuleWindow() {
    try {
      const win = P.ui.modwinEl;
      if (!win) return;
      const bar = win.querySelector('.pm-titlebar');
      if (bar && !bar.querySelector('.lb-win-dots')) bar.insertBefore(h('span', { class: 'lb-win-dots', 'aria-hidden': 'true' }, h('i'), h('i'), h('i')), bar.firstChild);
      const ex = win.querySelector('.pm-exit');
      if (ex) ex.textContent = '← Exit';
      win.setAttribute('aria-label', 'Department window');
    } catch (e) { /* cosmetic */ }
  }

  function mount(container) {
    if (mounted) return;
    mounted = true;
    root = h('div', { class: 'lb-root' });
    container.textContent = '';
    container.appendChild(root);
    LB.ensureLines(6);

    const footer = LB.buildChrome(root);
    /* one <main> landmark around the memo and the whole page body (it is also the target of the "Skip to departments" link) */
    const mainWrap = h('main', { class: 'lb-mainwrap', id: 'lb-main', tabindex: '-1' });
    const layout = h('div', { class: 'lb-layout' });
    const main = h('div', { class: 'lb-main', id: 'lb-grid-col' });
    layout.appendChild(main);
    const memo = LB.parts.header && LB.parts.header.memo;
    if (memo) mainWrap.appendChild(memo);
    mainWrap.appendChild(layout);
    root.appendChild(mainWrap);
    LB.buildGrid(main);
    LB.buildSide(layout);
    root.appendChild(footer);
    const modalRoot = h('div', { class: 'lb-modal-root' });
    root.appendChild(modalRoot);
    LB.setModalRoot(modalRoot);
    LB.buildNarrator(P.ui.shell || container.parentNode);
    decorateModuleWindow();
    LB.paintTitle();

    /* notices */
    try {
      if (P.state.consumeCorruptNotice()) {
        LB.addBanner(LB.text.corruptNotice, { icon: '🗄️', kind: 'warn' });
        LB.say('Your save was unreadable, so it has been put in a drawer and a fresh one issued. Management regrets nothing, but is thinking about it.', { priority: 2, mood: 'confused' });
      }
    } catch (e) { /* ignore */ }
    if (!P.storage.isPersistent() && !P.params.nostorage && P.params.mode === 'lobby') LB.addBanner(LB.text.memoryNotice, { icon: '🧠', kind: 'warn' });
    /* a save that did not reach the disk (quota, blocked storage) must not be silent: banner (at most once a minute) + the footer note */
    let failBanner = null, failAt = -1e9;
    P.on('save', function (e) {
      try {
        const ok = !(e && e.ok === false);
        if (!ok) {
          if ((!failBanner || !failBanner.isConnected) && NAT.now() - failAt > 60000 && P.params.mode === 'lobby') {
            failAt = NAT.now();
            failBanner = LB.addBanner(LB.text.saveFailNotice, { icon: '🧯', kind: 'warn' });
          }
        } else if (failBanner) { if (failBanner.parentNode) failBanner.parentNode.removeChild(failBanner); failBanner = null; }
        if (LB.parts.header && LB.parts.header.paintFooter) LB.parts.header.paintFooter();
      } catch (x) { /* cosmetic */ }
    });
    /* another tab saved over this one and the saves were merged: refresh what is on screen */
    P.on('sync', function () { try { LB.refreshAll(); } catch (x) { /* ignore */ } });

    /* life */
    if (P.params.mode === 'lobby' && !P.params.shot) P.passive.start();
    P.narrator.startIdle({ when: function () { return !P.host.current; } });
    startBeat();
    const firstTime = !P.params.shot && !LB.flag('lobby.welcomed');
    if (firstTime) {
      LB.say('Welcome to POINTLESS™ DELUXE. Please complete the form. It is the only form. Today.', { priority: 1, mood: 'proud' });
      LB.later(function () { if (!LB.currentScreen() && !P.host.current) LB.openScreen('welcome', { quiet: true }); }, 250);
    } else LB.say(LB.line('greeting'), { priority: 1, mood: 'proud' });
  }

  /* back from a module: keyboard users land on the card they came from (else the search box), not at the top of the page */
  function restoreFocus() {
    const id = LB.lastModuleId; LB.lastModuleId = '';
    try {
      const ae = document.activeElement;
      if (ae && ae !== document.body && ae.isConnected && ae.id !== 'pm-root') return;     // something sensible already has focus
      let t = null;
      if (id && root) {
        const cards = root.querySelectorAll('.lb-card[data-id]');
        for (let i = 0; i < cards.length; i++) { if (cards[i].getAttribute('data-id') === id) { t = cards[i].querySelector('.lb-card-btn'); break; } }
      }
      if (!t && root) t = root.querySelector('#lb-search');
      if (t) t.focus({ preventScroll: true });
    } catch (e) { /* ignore */ }
  }

  const lobby = {
    screens: LB.screenOrder.slice(),
    mount: mount,
    show: function () {
      if (!mounted) return;
      startBeat();
      if (LB.parts.grid) LB.parts.grid.render(true);
      if (LB.parts.header) { LB.parts.header.paintMemo(); LB.parts.header.paintBadge(); LB.parts.header.paintAsc(); }
      if (LB.parts.side) LB.parts.side.refresh();
      LB.paintTitle();
      if (LB.savedScroll) { const y = LB.savedScroll; LB.savedScroll = 0; try { window.scrollTo(0, y); } catch (e) { /* ignore */ } }
      restoreFocus();
    },
    hide: function () {
      stopBeat();
      if (LB.currentScreen()) LB.closeScreen('hide');
      if (LB.parts.header) LB.parts.header.setMenu(false);
    },
    openScreen: function (id) {
      if (!mounted) return false;
      return LB.openScreen(id) !== false;
    },
    closeScreen: function () { LB.closeScreen('api'); },
    currentScreen: function () { return LB.currentScreen(); }
  };
  P.ui.setLobby(lobby);
})();
