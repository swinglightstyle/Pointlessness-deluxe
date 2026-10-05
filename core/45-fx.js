/* POINTLESS core 45: effects layer (#pm-fx): floating "+N Meh" text, toasts, confetti.
 * Plain DOM + one canvas. Honors reduced motion. Never throws. The Lobby may restyle via CSS (core/base.css). */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const NAT = P.native;
  const U = P.util;
  const COLORS = ['#ff8a7a', '#ffd166', '#7bdcb5', '#b8a1f0', '#ffffff', '#ff6fa5', '#6ec6ff'];
  const MAX_FLOATS = 14, MAX_PARTICLES = 420;

  let layer = null, toastBox = null, canvas = null, g2 = null;
  let parts = [], running = false, lastT = 0, resizeBound = false;
  const floats = [];

  function reduced() {
    try { return !!P.state.setting.get('reduceMotion'); } catch (e) { return false; }
  }
  function ensureLayer() {
    if (layer && layer.isConnected) return layer;
    layer = document.getElementById('pm-fx');
    if (!layer) {
      layer = document.createElement('div');
      layer.id = 'pm-fx';
      layer.className = 'pm-fx';
      (document.body || document.documentElement).appendChild(layer);
    }
    toastBox = null; canvas = null; g2 = null;
    return layer;
  }
  function ensureToastBox() {
    ensureLayer();
    if (toastBox && toastBox.isConnected) return toastBox;
    toastBox = document.createElement('div');
    toastBox.className = 'pm-toasts';
    toastBox.setAttribute('aria-live', 'polite');
    layer.appendChild(toastBox);
    return toastBox;
  }
  function sizeCanvas() {
    if (!canvas) return;
    canvas.width = Math.max(1, window.innerWidth || 800);
    canvas.height = Math.max(1, window.innerHeight || 600);
  }
  function ensureCanvas() {
    ensureLayer();
    if (canvas && canvas.isConnected) return !!g2;
    canvas = document.createElement('canvas');
    canvas.className = 'pm-confetti';
    canvas.setAttribute('aria-hidden', 'true');
    layer.appendChild(canvas);
    sizeCanvas();
    try { g2 = canvas.getContext('2d'); } catch (e) { g2 = null; }
    if (!resizeBound) { resizeBound = true; NAT.add(window, 'resize', sizeCanvas); }
    return !!g2;
  }

  function floatText(text, x, y, opts) {
    try {
      opts = opts || {};
      ensureLayer();
      const w = window.innerWidth || 800;
      x = U.clamp(Number(x), 50, Math.max(51, w - 50));
      y = U.clamp(Number(y), 30, Math.max(31, (window.innerHeight || 600) - 20));
      const el = document.createElement('div');
      el.className = 'pm-float' + (opts.kind ? ' pm-float-' + String(opts.kind).replace(/[^a-z-]/gi, '') : '') + (reduced() ? ' pm-float-still' : '');
      el.textContent = String(text).slice(0, 40);
      el.style.left = x + 'px';
      el.style.top = y + 'px';
      layer.appendChild(el);
      floats.push(el);
      while (floats.length > MAX_FLOATS) { const old = floats.shift(); if (old.parentNode) old.parentNode.removeChild(old); }
      NAT.setTimeout(function () {
        const i = floats.indexOf(el); if (i >= 0) floats.splice(i, 1);
        if (el.parentNode) el.parentNode.removeChild(el);
      }, reduced() ? 1100 : 1500);
      P.emit('float', { text: text, x: x, y: y });
    } catch (e) { /* never throw */ }
  }

  /* Toast queue: at most MAX_VISIBLE toasts on screen, the rest wait their turn (staggered, so they never pile up
   * over a module). Achievement toasts are held back while a module is within its first HOLD_MS, so the player can
   * see the module first. The 'toast' event is still emitted at call time (the fuzz harness checks the text then). */
  const MAX_VISIBLE = 2, MAX_QUEUE = 8, HOLD_MS = 12000, STAGGER_MS = 420;
  let queue = [], visible = 0, lastShown = -1e9, pumpTimer = 0, holdUntil = 0, holdBound = false;
  function inModule() { try { return !!(P.host && P.host.current); } catch (e) { return false; } }
  function held(item) {
    return item.opts.kind === 'achievement' && inModule() && NAT.now() < holdUntil;
  }
  function schedulePump(ms) {
    if (pumpTimer) return;
    pumpTimer = NAT.setTimeout(function () { pumpTimer = 0; pump(); }, Math.max(1, ms));
  }
  function pump() {
    try {
      if (visible >= MAX_VISIBLE) return;
      const wait = lastShown + STAGGER_MS - NAT.now();
      if (wait > 0 && queue.length) { schedulePump(wait); return; }
      for (let i = 0; i < queue.length; i++) {
        if (held(queue[i])) continue;
        const item = queue.splice(i, 1)[0];
        showToast(item.text, item.opts);
        if (queue.length) schedulePump(STAGGER_MS);
        return;
      }
      if (queue.length && inModule()) schedulePump(Math.max(200, holdUntil - NAT.now() + 30));
    } catch (e) { /* never throw */ }
  }
  function bindHold() {
    if (holdBound) return;
    holdBound = true;
    try {
      P.on('module:mounting', function () { holdUntil = NAT.now() + HOLD_MS; });
      P.on('module:mounted', function () { holdUntil = NAT.now() + HOLD_MS; });
      P.on('module:destroyed', function () { holdUntil = 0; schedulePump(250); });
    } catch (e) { /* never throw */ }
  }

  function toast(text, opts) {
    try {
      opts = opts || {};
      bindHold();
      P.emit('toast', { text: text, opts: opts });
      queue.push({ text: text, opts: opts });
      while (queue.length > MAX_QUEUE) queue.shift();
      pump();
    } catch (e) { /* never throw */ }
  }

  function showToast(text, opts) {
    try {
      opts = opts || {};
      const box = ensureToastBox();
      box.classList.toggle('pm-toasts-mod', inModule());
      try {   // while a module window is open, sit just below its title bar so Exit / Mute stay reachable
        const tb = document.querySelector('#pm-modwin:not([hidden]) .pm-titlebar');
        if (tb && inModule()) { const r = tb.getBoundingClientRect(); box.style.top = Math.max(8, Math.min(Math.round(r.bottom) + 6, (window.innerHeight || 600) - 120)) + 'px'; }
        else box.style.top = '';
      } catch (e2) { box.style.top = ''; }
      visible++; lastShown = NAT.now();
      const t = document.createElement('div');
      t.className = 'pm-toast' + (opts.kind ? ' pm-toast-' + String(opts.kind).replace(/[^a-z-]/gi, '') : '');
      t.setAttribute('role', 'status');
      if (opts.icon) {
        const ic = document.createElement('span');
        ic.className = 'pm-toast-icon'; ic.textContent = String(opts.icon); ic.setAttribute('aria-hidden', 'true');
        t.appendChild(ic);
      }
      const body = document.createElement('div');
      body.className = 'pm-toast-body';
      if (opts.title) { const h = document.createElement('b'); h.className = 'pm-toast-title'; h.textContent = String(opts.title).slice(0, 60); body.appendChild(h); }
      const tx = document.createElement('div');
      tx.className = 'pm-toast-text'; tx.textContent = P.subst(String(text == null ? '' : text).slice(0, 240), {});
      body.appendChild(tx);
      if (opts.desc) { const d = document.createElement('div'); d.className = 'pm-toast-desc'; d.textContent = String(opts.desc).slice(0, 240); body.appendChild(d); }
      t.appendChild(body);
      box.appendChild(t);

      NAT.setTimeout(function () {
        if (t.parentNode) t.parentNode.removeChild(t);
        visible = Math.max(0, visible - 1);
        schedulePump(STAGGER_MS);
      }, U.clamp(inModule() ? Math.min(opts.duration || 3200, 2800) : (opts.duration || 3200), 800, 15000));   // inside a module, toasts leave sooner so they cover less of the game
    } catch (e) { /* never throw */ }
  }

  function loop() {
    const now = NAT.now();
    const dt = U.clamp((now - lastT) / 16.67, 0.4, 3);
    lastT = now;
    if (g2 && canvas) {
      g2.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = parts.length - 1; i >= 0; i--) {
        const p = parts[i];
        p.vy += 0.22 * dt; p.vx *= Math.pow(0.992, dt);
        p.x += p.vx * dt; p.y += p.vy * dt; p.r += p.vr * dt; p.life -= dt;
        if (p.life <= 0 || p.y > canvas.height + 30) { parts.splice(i, 1); continue; }
        g2.save();
        g2.globalAlpha = Math.min(1, p.life / 25);
        g2.translate(p.x, p.y); g2.rotate(p.r);
        g2.fillStyle = p.c;
        g2.fillRect(-p.s / 2, -p.s / 3, p.s, p.s * 0.6);
        g2.restore();
      }
    }
    if (parts.length) NAT.raf(loop);
    else { running = false; if (g2 && canvas) g2.clearRect(0, 0, canvas.width, canvas.height); }
  }
  function confetti(x, y, n) {
    try {
      if (reduced()) return;
      if (!ensureCanvas()) return;
      n = U.clamp(Math.round(Number(n) || 40), 1, 200);
      x = isFinite(Number(x)) ? Number(x) : (window.innerWidth || 800) / 2;
      y = isFinite(Number(y)) ? Number(y) : (window.innerHeight || 600) / 2;
      for (let i = 0; i < n && parts.length < MAX_PARTICLES; i++) {
        const a = -Math.PI / 2 + (P.rng.rand() - 0.5) * Math.PI * 1.1;
        const sp = 4 + P.rng.rand() * 8;
        parts.push({
          x: x, y: y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp, r: P.rng.rand() * 6.28, vr: (P.rng.rand() - 0.5) * 0.4,
          s: 5 + P.rng.rand() * 6, c: COLORS[Math.floor(P.rng.rand() * COLORS.length)], life: 70 + P.rng.rand() * 70
        });
      }
      P.emit('confetti', { x: x, y: y, n: n });
      if (!running) { running = true; lastT = NAT.now(); NAT.raf(loop); }
    } catch (e) { /* never throw */ }
  }

  P.fx = {
    reduced: reduced, ensureLayer: ensureLayer,
    floatText: floatText, toast: toast, confetti: confetti,
    lastPointer: { x: 0, y: 0, t: -1e9 },
    particleCount: function () { return parts.length; }
  };
})();


