/* POINTLESS core 99: boot. Runs last (after core, ui, content and games scripts have loaded).
 * Builds the shell, loads the save, installs global trackers, then starts the right mode:
 *   lobby    -> P.ui.lobby.mount(#pm-lobby)
 *   dev      -> mounts ?dev=<id> straight into the module window
 *   selftest -> fuzz harness (?selftest=<id|lobby>) */
(function () {
  'use strict';
  const P = window.POINTLESS;
  if (!P || P.booted) return;
  const NAT = P.native;
  const ui = P.ui;

  function start() {
    if (P.booted) return;
    P.booted = true;
    try { P.state.init(); } catch (e) { P.reportError(e, { where: 'state.init' }); }
    ui.buildShell();
    if (P.params.shot) document.documentElement.setAttribute('data-shot', '1');

    /* reduced motion body class (CSS hooks); 'setting' events are also emitted after import / reset / another tab's save */
    const paintMotion = function () { document.body.classList.toggle('pm-reduce-motion', P.fx.reduced()); };
    paintMotion();
    P.on('setting', function (e) { if (e && e.id === 'reduceMotion') paintMotion(); });
    P.on('import', paintMotion); P.on('reset', paintMotion);
    try {
      const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (mq && mq.addEventListener) mq.addEventListener('change', paintMotion);
    } catch (e) { /* ignore */ }

    /* global trackers */
    NAT.add(document, 'pointerdown', function (e) { P.fx.lastPointer = { x: e.clientX, y: e.clientY, t: NAT.now() }; }, true);
    NAT.add(document, 'click', function (e) {
      P.state.stat.inc('clicks.total', 1);
      P.narrator.touch();
      if (e.clientX || e.clientY) P.fx.lastPointer = { x: e.clientX, y: e.clientY, t: NAT.now() };
    }, true);
    NAT.add(document, 'keydown', function () { P.state.stat.inc('keys.total', 1); P.narrator.touch(); }, true);
    NAT.setInterval(function () {
      if (document.hidden) return;
      P.state.stat.inc('time.seconds', 1);
      const c = P.host.current;
      if (c && !c.crashed) P.state.stat.inc(c.def.id + '.seconds', 1);
    }, 1000);

    checkGameFiles();

    const mode = P.params.mode;
    const lobbyEl = ui.lobbyEl;

    if (!P.params.validTarget) {
      ui.showFatal('That id is not an id', ['"' + P.params.target + '" is not kebab-case (a-z, 0-9, dashes).']);
      if (mode === 'selftest' && P.fuzz) P.fuzz.start();
      return;
    }

    if (mode === 'dev') {
      lobbyEl.hidden = true;
      P.host.crashOnRuntime = false;
      const id = P.params.target;
      const bar = document.createElement('div');
      bar.className = 'pm-devbar';
      const label = document.createElement('span');
      label.textContent = 'DEV MODE · ' + id + ' · seed ' + P.params.seed;
      const mk = function (text, fn) {
        const b = document.createElement('button');
        b.type = 'button'; b.className = 'pm-btn pm-devbtn'; b.textContent = text;
        NAT.add(b, 'click', fn);
        return b;
      };
      bar.appendChild(label);
      bar.appendChild(mk('Restart', function () { P.host.remount(); }));
      bar.appendChild(mk('Poke x60', function () { P.fuzz.runActions(60); }));
      /* diagnostics counter: managed handlers, timers and engine events swallow their errors (the Lobby must survive them), so say so here */
      const diagBtn = mk('Diagnostics: 0', function () { diagPre.hidden = !diagPre.hidden; paintDiag(); });
      const diagPre = document.createElement('pre');
      diagPre.className = 'pm-devdiag'; diagPre.hidden = true;
      const paintDiag = function () {
        const list = P.diag.list.filter(function (e) { return e.kind !== 'info'; });
        const bad = list.filter(function (e) { return e.kind === 'error' || e.kind === 'module-error' || e.kind === 'crash' || e.kind === 'load'; }).length;
        diagBtn.textContent = 'Diagnostics: ' + bad + ' error' + (bad === 1 ? '' : 's') + ', ' + (list.length - bad) + ' warning' + (list.length - bad === 1 ? '' : 's');
        diagBtn.classList.toggle('pm-devbad', bad > 0);
        if (!diagPre.hidden) diagPre.textContent = list.slice(-25).map(function (e) { return '[' + e.kind + (e.count > 1 ? ' x' + e.count : '') + '] ' + e.msg + (e.where ? '  (' + e.where + ')' : ''); }).join('\n') || 'Nothing to report.';
      };
      P.on('diag', paintDiag); P.on('diag:clear', paintDiag);
      bar.appendChild(diagBtn);
      ui.shell.insertBefore(diagPre, ui.shell.firstChild);
      ui.shell.insertBefore(bar, ui.shell.firstChild);
      paintDiag();
      P.host.exitHandler = function (info) {
        if (info && info.by !== 'crash-return') P.fx.toast('Dev mode: there is no Lobby here, so Exit restarts the module.', { duration: 2400 });
        P.host.remount();
        return true;
      };
      P.host.enter(id, { force: true, silent: true });
      if (P.params.actions > 0) P.fuzz.runActions(P.params.actions);
    } else if (mode === 'selftest') {
      lobbyEl.hidden = P.params.target !== 'lobby';
      P.host.crashOnRuntime = P.params.target === 'lobby';      // the Lobby run also exercises the runtime crash shield; a module run reports errors itself
      if (P.params.target === 'lobby') mountLobby();
      P.fuzz.start();
    } else {
      mountLobby();
      if (P.params.actions > 0) P.fuzz.runActions(P.params.actions);
    }
    P.emit('boot', {});
  }

  /* A game file that loaded but never registered a module has a syntax error or threw while loading. On file:// the browser hides the details
   * ("Script error."), so name the file instead of relying on the error event. */
  function checkGameFiles() {
    try {
      const F = window.__POINTLESS_FILES;
      if (!F || !F.games) return;
      const only = P.params.mode === 'lobby' ? '' : (P.params.target === 'lobby' ? '' : P.params.target);
      const have = {};
      P.modules.forEach(function (m) { if (m.file) have[m.file] = 1; });
      P.diag.list.forEach(function (e) { if (e.module) have['!' + e.module] = 1; });
      F.games.forEach(function (f) {
        const id = f.replace(/^games\//, '').replace(/\.js$/, '');
        if (only && id !== only) return;
        if (have[f] || have['!' + id]) return;
        P.diag.add('load', f + ' loaded but never registered a module: it has a syntax error, threw while loading, or never called P.registerModule (run: node tools/lint.js ' + f + ')', { module: id, src: f });
      });
    } catch (e) { /* ignore */ }
  }

  function mountLobby() {
    const L = ui.lobby;
    if (!L) {
      ui.showFatal('No Lobby installed', ['Nothing called P.ui.setLobby(...). Add core/ui-*.js (see SPEC section 9).']);
      return;
    }
    try { L.mount(ui.lobbyEl); }
    catch (e) { P.reportError(e, { where: 'lobby.mount' }); ui.showFatal('The Lobby has gone out to lunch', [String(e && e.message ? e.message : e)]); return; }
    if (P.params.enter && P.params.shot && P.params.mode === 'lobby') {
      NAT.setTimeout(function () {
        try { P.host.enter(P.params.enter, { force: true }); } catch (e) { P.reportError(e, { where: 'shot enter' }); }
      }, 120);
    }
    if (P.params.screen && typeof L.openScreen === 'function') {
      NAT.setTimeout(function () {
        try {
          if (L.openScreen(P.params.screen) === false) {
            P.diag.add('warn', 'unknown ?screen=' + P.params.screen);
            P.fx.toast('Unknown ?screen=' + P.params.screen + '. Known screens: ' + (Array.isArray(L.screens) ? L.screens.join(', ') : '?'), { kind: 'warn', duration: 8000 });
          }
        }
        catch (e) { P.reportError(e, { where: 'lobby.openScreen' }); }
      }, 50);
    }
  }

  if (document.readyState === 'loading') NAT.add(document, 'DOMContentLoaded', start, { once: true });
  else start();
})();
