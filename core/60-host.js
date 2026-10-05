/* POINTLESS core 60: shell DOM, module window host, crash shield, default narrator renderer, Meh binding.
 * Contract for the Lobby UI (see SPEC section 9): P.ui.setLobby({...}), P.host.enter/exit, P.ui.bindMeh,
 * P.narrator.setRenderer. The module window markup/classes (.pm-modwin, .pm-titlebar ...) live in core/base.css. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const NAT = P.native;
  const U = P.util;
  const ui = P.ui;

  let shell = null, lobbyEl = null, win = null, titleEl = null, mehEl = null, muteBtn = null, exitBtn = null, bodyEl = null;
  let narrEl = null, narrText = null, narrSr = null, narrWho = null, narrAvatar = null, narrToggle = null;
  let typeTimer = 0;
  const MOOD_FACE = { neutral: '🙂', proud: '😌', disappointed: '😞', confused: '😕', panic: '😱', smug: '😏' };

  function h(tag, cls, text) {
    const e = document.createElement(tag);
    if (cls) e.className = cls;
    if (text !== undefined) e.textContent = text;
    return e;
  }

  /* ---------- Meh counter binding (animated) ---------- */
  /* Keeps `el` showing the animated Meh balance. Returns unbind(). It also unbinds itself once the element has been removed from the page
   * (after it was attached), or if it was never attached within ~3.5s, so throw-away widgets cannot pile up listeners. */
  ui.bindMeh = function (el, o) {
    o = o || {};
    let shown = P.state.getMeh(), target = shown, timer = 0, seen = false, dead = false, gc = 0;
    const suffix = o.suffix === undefined ? ' Meh' : o.suffix;
    const prefix = o.prefix || '';
    function render(v) { el.textContent = prefix + U.fmt(v) + suffix; }
    function step() {
      timer = 0;
      const d = target - shown;
      if (!isFinite(d) || Math.abs(d) < 0.05 || Math.abs(d) < Math.abs(target) * 0.001) shown = target; else shown += d * 0.3;
      render(shown);
      if (shown !== target) timer = NAT.setTimeout(step, 40);
    }
    render(shown);
    const off = P.on('meh', function (e) {
      if (dead) return;
      if (el.isConnected) seen = true; else if (seen) { unbind(); return; }
      target = isFinite(e.value) ? e.value : 0;
      if (P.fx.reduced() || P.params.mode === 'selftest' || e.delta === 0 || !isFinite(e.delta)) { shown = target; render(shown); return; }
      if (!timer) timer = NAT.setTimeout(step, 40);
    });
    function unbind() { dead = true; off(); if (timer) NAT.clearTimeout(timer); timer = 0; if (gc) NAT.clearTimeout(gc); gc = 0; }
    gc = NAT.setTimeout(function () { gc = 0; if (el.isConnected) seen = true; else if (!seen) unbind(); }, 3500);
    return unbind;
  };

  ui.setLobby = function (lobby) { ui.lobby = lobby && typeof lobby === 'object' ? lobby : null; };
  ui.showFatal = function (title, lines) {
    const box = h('div', 'pm-fatal');
    box.setAttribute('role', 'alert');
    box.appendChild(h('h2', '', title));
    (lines || []).forEach(function (l) { box.appendChild(h('p', '', l)); });
    (lobbyEl || document.getElementById('app') || document.body).appendChild(box);
    return box;
  };

  /* ---------- default narrator renderer ---------- */
  function buildNarrator() {
    narrEl = h('aside', 'pm-narrator');
    narrEl.id = 'pm-narrator';
    narrEl.setAttribute('aria-label', 'Management');
    narrAvatar = h('div', 'pm-narr-avatar', MOOD_FACE.neutral);
    narrAvatar.setAttribute('aria-hidden', 'true');
    const main = h('div', 'pm-narr-main');
    narrWho = h('div', 'pm-narr-who', 'Management');
    const bubble = h('div', 'pm-narr-bubble pm-narr-quiet');
    narrText = h('span', 'pm-narr-text');
    narrText.setAttribute('aria-hidden', 'true');
    narrSr = h('span', 'pm-sr');
    narrSr.setAttribute('aria-live', 'polite');
    narrSr.setAttribute('role', 'status');
    bubble.appendChild(narrText); bubble.appendChild(narrSr);
    main.appendChild(narrWho); main.appendChild(bubble);
    narrToggle = h('button', 'pm-narr-toggle', '−');
    narrToggle.type = 'button';
    narrToggle.setAttribute('aria-expanded', 'true');
    narrToggle.setAttribute('aria-label', 'Collapse Management');
    NAT.add(narrToggle, 'click', function () { setNarratorCollapsed(!narrEl.classList.contains('pm-collapsed')); });
    narrEl.appendChild(narrAvatar); narrEl.appendChild(main); narrEl.appendChild(narrToggle);
    shell.appendChild(narrEl);
    if (P.state.setting.get('narratorCollapsed', false) === true) setNarratorCollapsed(true, true);
    P.narrator.setRenderer(defaultRenderer);
  }
  function setNarratorCollapsed(c, silent) {
    narrEl.classList.toggle('pm-collapsed', !!c);
    shell.classList.toggle('pm-narr-collapsed', !!c);
    narrToggle.textContent = c ? '+' : '−';
    narrToggle.setAttribute('aria-expanded', c ? 'false' : 'true');
    narrToggle.setAttribute('aria-label', c ? 'Expand Management' : 'Collapse Management');
    if (!silent) P.state.setting.set('narratorCollapsed', !!c);
  }
  const defaultRenderer = {
    show: function (e) {
      if (!narrText) return;
      if (typeTimer) { NAT.clearTimeout(typeTimer); typeTimer = 0; }
      narrWho.textContent = e.who;
      narrAvatar.textContent = MOOD_FACE[e.mood] || MOOD_FACE.neutral;
      narrAvatar.setAttribute('data-mood', e.mood);
      narrText.parentNode.classList.remove('pm-narr-quiet');
      narrSr.textContent = e.text;
      if (P.params.mode === 'selftest' || P.fx.reduced()) { narrText.textContent = e.text; return; }
      let i = 0;
      const text = e.text;
      (function type() {
        i = Math.min(text.length, i + 2);
        narrText.textContent = text.slice(0, i);
        if (i < text.length) typeTimer = NAT.setTimeout(type, 22);
        else typeTimer = 0;
      })();
    },
    hide: function () {
      if (!narrText) return;
      if (typeTimer) { NAT.clearTimeout(typeTimer); typeTimer = 0; narrText.textContent = P.narrator.history.length ? P.narrator.history[P.narrator.history.length - 1].text : ''; }
      narrText.parentNode.classList.add('pm-narr-quiet');
    }
  };

  /* ---------- shell ---------- */
  ui.buildShell = function () {
    if (shell) return shell;
    const app = document.getElementById('app') || (function () { const a = h('div', 'pm-app'); a.id = 'app'; document.body.appendChild(a); return a; })();
    app.textContent = '';
    shell = h('div', 'pm-shell');
    shell.id = 'pm-shell';
    lobbyEl = h('div', 'pm-lobby');
    lobbyEl.id = 'pm-lobby';
    win = h('section', 'pm-modwin');
    win.id = 'pm-modwin';
    win.hidden = true;
    win.setAttribute('aria-label', 'Module window');
    const bar = h('div', 'pm-titlebar');
    titleEl = h('h2', 'pm-title', '');
    titleEl.id = 'pm-title';
    mehEl = h('span', 'pm-meh');
    mehEl.setAttribute('title', 'Your Meh');
    muteBtn = h('button', 'pm-btn pm-mute', '');
    muteBtn.type = 'button';
    exitBtn = h('button', 'pm-btn pm-exit', 'Exit');
    exitBtn.type = 'button';
    exitBtn.setAttribute('aria-label', 'Exit to the Lobby');
    bar.appendChild(titleEl); bar.appendChild(mehEl); bar.appendChild(muteBtn); bar.appendChild(exitBtn);
    bodyEl = h('div', 'pm-modbody');
    win.appendChild(bar); win.appendChild(bodyEl);
    shell.appendChild(lobbyEl); shell.appendChild(win);
    app.appendChild(shell);
    P.fx.ensureLayer();
    ui.bindMeh(mehEl);
    function paintMute() {
      const m = P.sfx.isMuted();
      muteBtn.textContent = m ? '🔇 Muted' : '🔊 Sound';       // the label itself states the state; no aria-pressed on top of it ("Muted, pressed")
    }
    paintMute();
    P.on('setting', function (e) { if (e && e.id === 'mute') paintMute(); });
    P.on('setting', function (e) { if (e && e.id === 'narratorCollapsed' && narrEl && narrEl.isConnected) setNarratorCollapsed(e.value === true, true); });   // import / reset / other tab
    NAT.add(muteBtn, 'click', function () { P.sfx.toggleMute(); paintMute(); });
    NAT.add(exitBtn, 'click', function () { host.exit({ by: 'button' }); });
    buildNarrator();
    ui.shell = shell; ui.lobbyEl = lobbyEl; ui.modwinEl = win;
    return shell;
  };

  /* ---------- host ---------- */
  function showWin() { win.hidden = false; shell.classList.add('pm-in-module'); }
  function hideWin() { win.hidden = true; shell.classList.remove('pm-in-module'); }
  function lobbyActive() { return P.params.mode === 'lobby' || P.params.target === 'lobby'; }
  function lobbyCall(fn) {
    try { if (ui.lobby && typeof ui.lobby[fn] === 'function') ui.lobby[fn](); }
    catch (e) { P.reportError(e, { where: 'lobby.' + fn }); }
  }
  // Module-specific enter/exit lines (m:<id>:enter / m:<id>:exit) win about half the time when the module supplied any; else the global pool.
  function modCat(id, suffix, globalCat) {
    try {
      const cat = 'm:' + id + ':' + suffix;
      const arr = P.lines && P.lines[cat];
      if (arr && arr.length) {
        const r = (P.rng && typeof P.rng.rand === 'function') ? P.rng.rand() : 0.3;
        if (r < 0.5) return cat;
      }
    } catch (e) { /* ignore */ }
    return globalCat;
  }
  function showLobbyEl() { if (lobbyEl && lobbyActive()) { lobbyEl.hidden = false; lobbyCall('show'); } }
  function hideLobbyEl() { if (lobbyEl && lobbyActive()) { lobbyEl.hidden = true; lobbyCall('hide'); } }

  function crashCard(def, err, phase) {
    bodyEl.textContent = '';
    const card = h('div', 'pm-crash');
    card.setAttribute('role', 'alert');
    card.appendChild(h('div', 'pm-crash-emoji', '🥪'));
    card.appendChild(h('h2', 'pm-crash-title', 'This module has gone out to lunch'));
    card.appendChild(h('p', '', def.title + ' left a note on its desk that says "Back in 5." It has been 5 for some time. Management has been told, and is also at lunch.'));
    const det = h('details', 'pm-crash-details');
    det.appendChild(h('summary', '', 'Details for the person who is not at lunch'));
    const pre = h('pre', 'pm-crash-pre', '[' + phase + '] ' + (err && err.message ? err.message : String(err)) +
      (err && err.stack ? '\n' + String(err.stack).split('\n').slice(0, 6).join('\n') : ''));
    det.appendChild(pre);
    if (P.params.mode === 'dev') det.open = true;
    card.appendChild(det);
    const back = h('button', 'pm-btn pm-crash-return', P.params.mode === 'lobby' ? 'Return to the Lobby' : 'Restart module');
    back.type = 'button';
    NAT.add(back, 'click', function () { host.exit({ by: 'crash-return' }); });
    card.appendChild(back);
    bodyEl.appendChild(card);
  }

  function crash(def, err, phase) {
    const c = host.current;
    if (c && c.crashed) return;
    if (c) {
      c.crashed = true;
      host.destroying = true;
      try { if (c.instance && typeof c.instance.destroy === 'function') c.instance.destroy(); } catch (e) { /* module is already broken */ }
      try { c.ctx.dispose(); } catch (e) { /* ignore */ }
      host.destroying = false;
    }
    const msg = err && err.message ? err.message : String(err);
    host.lastCrash = { id: def.id, phase: phase, message: msg, stack: err && err.stack ? String(err.stack) : '' };
    P.diag.add('crash', 'module "' + def.id + '" crashed in ' + phase + ': ' + msg, { module: def.id, stack: host.lastCrash.stack });
    try { titleEl.textContent = '🥪 Out to lunch'; crashCard(def, err, phase); } catch (e) { /* ignore */ }
    try { P.sfx.play('sad'); } catch (e) { /* ignore */ }
    try { P.narrator.say('The module has gone out to lunch. This is not your fault, and it is not mine, which leaves lunch.', { priority: 2, mood: 'confused' }); } catch (e) { /* ignore */ }
    P.emit('module:crash', host.lastCrash);
  }

  /* a module that appended something to document.body (a fixed overlay, a tooltip) would otherwise trap the Lobby: take it out, and say so.
   * Engine and Lobby nodes (pm-*, lb-*, selftest-*) and script/style/link are never touched. */
  function sweepBody(c) {
    if (!c.bodyBefore || !document.body) return;
    Array.prototype.slice.call(document.body.children).forEach(function (n) {
      if (c.bodyBefore.has(n)) return;
      const tag = n.tagName;
      if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'LINK') return;
      const cls = typeof n.className === 'string' ? n.className : '';
      if (/^(pm-|lb-|selftest-)/.test(n.id || '') || /(^|\s)(pm-|lb-)/.test(cls)) return;
      const label = tag.toLowerCase() + (n.id ? '#' + n.id : '') + (cls ? '.' + cls.split(/\s+/)[0] : '');
      (c.ctx.leftInBody || (c.ctx.leftInBody = [])).push(label);
      try { document.body.removeChild(n); } catch (e) { /* ignore */ }
      P.diag.add('warn', '[' + c.def.id + '] left <' + label + '> in document.body; the engine removed it. Render only inside the module root.', { module: c.def.id });
    });
  }

  function destroyCurrent() {
    const c = host.current;
    if (!c) return null;
    host.destroying = true;
    P.emit('module:destroying', { id: c.def.id, ctx: c.ctx });
    if (!c.crashed) {
      try { if (c.instance && typeof c.instance.destroy === 'function') c.instance.destroy(); }
      catch (e) { P.reportError(e, { module: c.def.id, where: 'destroy' }); }
    }
    try { c.ctx.dispose(); } catch (e) { /* ignore */ }
    try { c.root.textContent = ''; if (c.root.parentNode) c.root.parentNode.removeChild(c.root); } catch (e) { /* ignore */ }
    try { bodyEl.textContent = ''; } catch (e) { /* ignore */ }
    try { sweepBody(c); } catch (e) { /* ignore */ }
    host.current = null;
    host.destroying = false;
    P.emit('module:destroyed', { id: c.def.id, ctx: c.ctx, counts: c.ctx.counts, crashed: !!c.crashed });
    return c;
  }

  function showMissing(id) {
    hideLobbyEl(); showWin();
    titleEl.textContent = '❓ ' + id;
    bodyEl.textContent = '';
    const card = h('div', 'pm-crash');
    card.setAttribute('role', 'alert');
    card.appendChild(h('div', 'pm-crash-emoji', '🔍'));
    card.appendChild(h('h2', 'pm-crash-title', 'Module "' + id + '" did not register'));
    card.appendChild(h('p', '', 'Nobody called P.registerModule with that id. Check games/' + id + '.js exists, loads without errors, and uses the same id.'));
    const errs = P.diag.list.filter(function (e) { return e.kind !== 'info'; }).slice(-8);
    if (errs.length) {
      const pre = h('pre', 'pm-crash-pre', errs.map(function (e) { return '[' + e.kind + '] ' + e.msg + (e.src ? '  @ ' + e.src : ''); }).join('\n'));
      card.appendChild(pre);
    }
    bodyEl.appendChild(card);
  }

  const host = {
    current: null,
    exitHandler: null,          // dev/selftest override: function (info)
    crashOnRuntime: P.params.mode === 'lobby',
    destroying: false, mounting: false, lastCrash: null,

    /** mount a module into the module window. opts: { force:true } skips the unlock check, { silent:true } skips narrator lines */
    enter: function (id, opts) {
      opts = opts || {};
      const def = P.getModule(id);
      if (!def) { showMissing(id); return { ok: false, reason: 'unknown' }; }
      if (!opts.force && P.params.mode === 'lobby' && !P.state.isModuleUnlocked(id)) return { ok: false, reason: 'locked' };
      if (host.current) destroyCurrent();
      hideLobbyEl(); showWin();
      titleEl.textContent = def.icon + ' ' + def.title;
      bodyEl.textContent = '';
      const root = h('div', 'pm-root');
      root.setAttribute('data-module', def.id);
      bodyEl.appendChild(root);
      const made = P.makeApi(def, root);
      host.current = { def: def, api: made.api, ctx: made.ctx, root: root, instance: null, startedAt: NAT.now(), crashed: false,
        bodyBefore: new Set(Array.prototype.slice.call(document.body.children)) };
      P.state.stat.inc('modules.entered', 1);
      P.state.stat.inc(def.id + '.entered', 1);
      P.emit('module:mounting', { id: id, def: def, ctx: made.ctx });
      if (!opts.silent && P.params.mode === 'lobby') {
        try { P.narrator.say(P.narrator.line(modCat(def.id, 'enter', 'moduleEnter'), { module: def.title }), { priority: 1 }); } catch (e) { /* ignore */ }
      }
      host.mounting = true;
      let inst;
      try { inst = def.mount(root, made.api); }
      catch (e) {
        P.reportError(e, { module: id, where: 'mount' });      // host.mounting is still true here, so the runtime shield stays out of it...
        host.mounting = false;
        crash(def, e, 'mount');                                // ...and the card is labelled [mount], not [runtime]
        return { ok: false, reason: 'crash' };
      }
      host.mounting = false;
      if (typeof inst === 'function') inst = { destroy: inst };                       // mount may return just a destroy function
      else if (inst && typeof inst.then === 'function') {                             // ...but not a Promise: say so, and still honour what it resolves to
        const msg = 'mount() returned a Promise. Mount must build the UI synchronously and return { destroy } (async mount is not supported)';
        P.diag.add('warn', '[' + id + '] ' + msg, { module: id });
        const pending = inst; inst = null;
        try {
          pending.then(function (r) {
            const c = host.current;
            if (!c || c.ctx !== made.ctx || c.instance) return;
            if (typeof r === 'function') c.instance = { destroy: r }; else if (r && typeof r === 'object') c.instance = r;
          }, function (err) { P.reportError(err, { module: id, where: 'mount (async)' }); });
        } catch (e2) { /* ignore */ }
      }
      if (host.current && host.current.ctx === made.ctx) host.current.instance = inst && typeof inst === 'object' ? inst : null;
      P.emit('module:mounted', { id: id, ctx: made.ctx });
      try { root.setAttribute('tabindex', '-1'); root.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
      return { ok: true };
    },

    /** request to leave the module (module's own Exit, the title bar button, crash Return) */
    exit: function (info) {
      info = info || {};
      if (host.exitHandler && !info.force) return host.exitHandler(info);
      const c = host.current;
      destroyCurrent();
      hideWin();
      showLobbyEl();
      P.state.stat.inc('lobby.visits', 1);
      if (c && P.params.mode === 'lobby') {
        try {
          P.narrator.say(P.narrator.line(modCat(c.def.id, 'exit', 'moduleExit'), { module: c.def.title }), { priority: 0 });
          P.narrator.say(P.narrator.line('hubReturn', { module: c.def.title }), { priority: 0 });
        } catch (e) { /* ignore */ }
      }
      P.emit('module:exit', { id: c ? c.def.id : '' });
      return true;
    },

    /** destroy and mount the current module again (dev restart, fuzz remount) */
    remount: function () {
      const c = host.current;
      if (!c) return { ok: false, reason: 'none' };
      const id = c.def.id;
      destroyCurrent();
      return host.enter(id, { force: true, silent: true });
    },

    destroyCurrent: destroyCurrent,
    setTitle: function (id, text) {
      const c = host.current;
      if (!c || c.def.id !== id || c.crashed || !titleEl) return;
      const t = (text === undefined || text === null) ? '' : String(text).trim().slice(0, 80);
      if (t) titleEl.textContent = t;
    },
    isOpen: function () { return !!host.current; },
    el: function () { return { shell: shell, lobby: lobbyEl, win: win, title: titleEl, body: bodyEl }; }
  };
  P.host = host;

  /* runtime crash shield: uncaught errors attributed to the mounted module end the module, not the Lobby */
  P.on('diag', function (e) {
    const c = host.current;
    if (!c || c.crashed || host.destroying || host.mounting || !host.crashOnRuntime) return;
    if (e.kind !== 'module-error' && e.kind !== 'error') return;
    if (e.module !== c.def.id) return;
    crash(c.def, { message: e.msg, stack: e.stack }, 'runtime');
  });
})();
