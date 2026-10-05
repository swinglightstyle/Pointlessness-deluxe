/* POINTLESS core 40: narrator LOGIC (Management). Pure logic: line pools (shuffle bags, token
 * substitution), a priority queue with coalescing, hold timing, idle chatter. The visual UI plugs in with
 * P.narrator.setRenderer({ show(entry), hide(entry) }). core/60-host.js installs a plain default renderer. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const NAT = P.native;
  const U = P.util;

  const hist = [];
  const queue = [];
  const bags = Object.create(null);
  let cur = null, holdTimer = 0, gapTimer = 0, renderer = null, seq = 0;
  let lastShown = { text: '', at: -1e9 };
  let lastInput = NAT.now();
  let idleCfg = null, idleTimer = 0;

  /* ---- tokens: {player} {meh} {module} {count} {item} ---- */
  function ownedItemName() {
    const owned = P.shopOrder.filter(function (id) { return P.state.item.count(id) > 0; });
    if (!owned.length) return 'a thing';
    return P.shopMap[owned[Math.floor(P.rng.rand() * owned.length)]].name;
  }
  function subst(text, ctx) {
    ctx = ctx || {};
    return String(text).replace(/\{(player|meh|module|count|item)\}/g, function (m, k) {
      try {
        switch (k) {
          case 'player': return ctx.player != null ? String(ctx.player) : P.state.player.getName();
          case 'meh': return U.fmt(ctx.meh != null ? ctx.meh : P.state.getMeh());
          case 'module': {
            if (ctx.module) return String(ctx.module);
            const c = P.host && P.host.current;
            return c ? c.def.title : 'this department';
          }
          case 'count': return U.fmt(ctx.count != null ? ctx.count : P.state.stat.get('clicks.total'));
          case 'item': return ctx.item != null ? String(ctx.item) : ownedItemName();
        }
      } catch (e) { /* fall through */ }
      return { player: 'Valued Employee', meh: '0', module: 'this department', count: '0', item: 'a thing' }[k];
    });
  }
  P.subst = subst;

  /* ---- line pools ---- */
  function pool(cat) {
    const own = P.lines[cat];
    if (own && own.length) return { arr: own, key: cat };
    const fb = P.fallbackLines || {};
    if (Object.prototype.hasOwnProperty.call(fb, cat) && Array.isArray(fb[cat]) && fb[cat].length) return { arr: fb[cat], key: '~' + cat };
    const n = (P.lines.nothing && P.lines.nothing.length) ? P.lines.nothing : (fb.nothing || ['Management has nothing to say.']);
    return { arr: n, key: '~nothing' };
  }
  function newBag(n, last) {
    const idx = [];
    for (let i = 0; i < n; i++) idx.push(i);
    const order = P.rng.shuffle(idx);
    if (n > 1 && order[0] === last) { const t = order[0]; order[0] = order[n - 1]; order[n - 1] = t; }
    return { order: order, pos: 0, n: n, last: last };
  }
  function line(cat, ctx) {
    const p = pool(String(cat));
    let b = bags[p.key];
    if (!b || b.n !== p.arr.length || b.pos >= b.order.length) {
      b = bags[p.key] = newBag(p.arr.length, b ? b.last : -1);
    }
    const i = b.order[b.pos++];
    b.last = i;
    return subst(p.arr[i], ctx);
  }

  /* ---- queue ---- */
  function render(fn, e) {
    if (!renderer || typeof renderer[fn] !== 'function') return;
    try { renderer[fn](e); } catch (err) { P.diag.add('warn', 'narrator renderer.' + fn + ' threw: ' + (err && err.message ? err.message : err)); }
  }
  function show(e) {
    cur = e;
    e.shownAt = NAT.now();
    hist.push(e);
    if (hist.length > 60) hist.shift();
    try { P.state.stat.inc('narrator.lines', 1); } catch (err) { /* state not ready */ }
    render('show', e);
    P.emit('say', e);
    const hurry = queue.length >= 3 ? 0.45 : (queue.length >= 1 ? 0.75 : 1);
    if (holdTimer) NAT.clearTimeout(holdTimer);
    holdTimer = NAT.setTimeout(advance, Math.max(1000, e.duration * hurry));
  }
  function nextFromQueue() {
    const now = NAT.now();
    while (queue.length) {
      const n = queue.shift();
      if (n.priority === 0 && now - n.queuedAt > 15000) continue;   // stale chatter
      if (n.priority === 1 && now - n.queuedAt > 30000) continue;   // a beat that would arrive half a minute late is worse than none
      return n;
    }
    return null;
  }
  function advance() {
    if (holdTimer) { NAT.clearTimeout(holdTimer); holdTimer = 0; }
    const done = cur;
    cur = null;
    if (done) lastShown = { text: done.text, at: NAT.now() };
    if (!queue.length) { if (done) render('hide', done); return; }
    if (gapTimer) return;
    gapTimer = NAT.setTimeout(function () {
      gapTimer = 0;
      if (cur) return;
      const n = nextFromQueue();
      if (n) show(n); else if (done) render('hide', done);
    }, 140);
  }
  function trimQueue() {
    let p0 = 0;
    queue.forEach(function (q) { if (q.priority === 0) p0++; });
    while (p0 > 2) {
      const i = queue.findIndex(function (q) { return q.priority === 0; });
      if (i < 0) break;
      queue.splice(i, 1); p0--;
    }
    while (queue.length > 6) {
      let at = queue.length - 1;
      for (let i = 0; i < queue.length; i++) { if (queue[i].priority < queue[at].priority) at = i; }
      queue.splice(at, 1);
    }
  }
  function enqueue(e) {
    const now = NAT.now();
    e.queuedAt = now;
    if (cur && cur.text === e.text) return false;
    if (lastShown.text === e.text && now - lastShown.at < 4000) return false;
    for (let i = 0; i < queue.length; i++) { if (queue[i].text === e.text) return false; }
    if (!cur && !gapTimer) { show(e); return true; }
    if (!cur) {                                            // gap timer running: normal priority-ordered insert (FIFO within a priority)
      let g = queue.length;
      for (let i = 0; i < queue.length; i++) { if (queue[i].priority < e.priority) { g = i; break; } }
      queue.splice(g, 0, e);
      trimQueue();
      return queue.indexOf(e) >= 0;
    }
    if (e.priority >= 2 && cur.priority < 2) {            // urgent: cut in
      if (holdTimer) { NAT.clearTimeout(holdTimer); holdTimer = 0; }
      lastShown = { text: cur.text, at: now };
      cur = null;
      show(e);
      return true;
    }
    let at = queue.length;
    for (let i = 0; i < queue.length; i++) { if (queue[i].priority < e.priority) { at = i; break; } }
    queue.splice(at, 0, e);
    trimQueue();
    return queue.indexOf(e) >= 0;
  }
  function say(text, opts) {
    try {
      opts = opts || {};
      if (text === undefined || text === null) return null;
      let t = subst(String(text).slice(0, 2000), opts).replace(/\s+/g, ' ').trim();     // cut BEFORE the regex passes: a 10 MB string must stay cheap
      if (!t) return null;
      if (t.length > 600) t = t.slice(0, 597) + '...';
      let dur = Number(opts.duration);
      if (!isFinite(dur) || dur <= 0) dur = Math.min(9000, Math.max(2600, 1600 + t.length * 55));
      const e = {
        id: ++seq, text: t,
        mood: P.MOODS.indexOf(opts.mood) >= 0 ? opts.mood : 'neutral',
        who: typeof opts.who === 'string' && opts.who.trim() ? opts.who.trim().slice(0, 40) : 'Management',
        priority: U.clamp(Math.round(Number(opts.priority) || 0), 0, 2),
        duration: U.clamp(dur, 1000, 30000),
        src: opts.moduleId ? String(opts.moduleId) : '',
        t: Date.now(), queuedAt: 0, shownAt: 0
      };
      return enqueue(e) ? e : null;
    } catch (err) {
      P.diag.add('warn', 'narrator.say failed: ' + (err && err.message ? err.message : err));
      return null;
    }
  }
  function clear() {
    queue.length = 0;
    if (gapTimer) { NAT.clearTimeout(gapTimer); gapTimer = 0; }
    if (cur) advance();
  }

  /* ---- idle chatter ---- */
  function scheduleIdle() {
    if (idleTimer) NAT.clearTimeout(idleTimer);
    idleTimer = 0;
    if (!idleCfg) return;
    idleTimer = NAT.setTimeout(tickIdle, idleCfg.min + P.rng.rand() * Math.max(0, idleCfg.max - idleCfg.min));
  }
  function tickIdle() {
    idleTimer = 0;
    if (!idleCfg) return;
    try {
      const ok = (!idleCfg.when || idleCfg.when()) && !cur && !queue.length && !document.hidden &&
        (NAT.now() - lastInput >= idleCfg.minQuiet);
      if (ok) say(line(idleCfg.category), { priority: 0, mood: P.rng.pick(['neutral', 'smug', 'confused']) });
    } catch (e) { /* ignore */ }
    scheduleIdle();
  }

  P.narrator = {
    say: say,
    line: line,
    sayRandom: function (cat, opts) { return say(line(cat, opts), opts); },
    setRenderer: function (r) {
      renderer = r && typeof r === 'object' ? r : null;
      if (cur) render('show', cur);
    },
    getRenderer: function () { return renderer; },
    skip: function () { if (cur) advance(); },
    clear: clear,
    get current() { return cur; },
    get queueLength() { return queue.length; },
    history: hist,
    touch: function () { lastInput = NAT.now(); },
    lastInputAt: function () { return lastInput; },
    /** opts: { min:30000, max:60000, category:'idle', minQuiet:8000, when:()=>bool } */
    startIdle: function (opts) {
      idleCfg = Object.assign({ min: 30000, max: 60000, category: 'idle', minQuiet: 8000, when: null }, opts || {});
      scheduleIdle();
    },
    stopIdle: function () { idleCfg = null; if (idleTimer) NAT.clearTimeout(idleTimer); idleTimer = 0; }
  };
})();
