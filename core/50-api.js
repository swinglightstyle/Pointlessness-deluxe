/* POINTLESS core 50: the module `api` factory (SPEC section 4: every member).
 * P.makeApi(def, root, opts) -> { api, ctx }. ctx is engine-private bookkeeping (call counters, warnings,
 * dispose) used by the host and the fuzz harness. Managed timers/listeners/engine subscriptions are cleared on dispose. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const NAT = P.native;
  const U = P.util;
  const SVG_NS = 'http://www.w3.org/2000/svg';
  /* lower-case name -> canonical (camelCase) SVG element name */
  const SVG_CANON = Object.create(null);
  ('svg path circle rect g line polygon polyline ellipse text tspan defs linearGradient radialGradient stop use clipPath mask pattern filter ' +
    'feGaussianBlur feOffset feBlend feColorMatrix feFlood feTurbulence feDropShadow feComposite feMerge feMergeNode feMorphology feDisplacementMap ' +
    'feComponentTransfer feFuncR feFuncG feFuncB feFuncA feConvolveMatrix feImage feTile image symbol marker textPath title desc animate ' +
    'animateTransform animateMotion set foreignObject switch view').split(' ').forEach(function (t) { SVG_CANON[t.toLowerCase()] = t; });
  /* elements api.el refuses to build: they would run or load code from outside the module (use P.injectCSS for styles) */
  const BLOCKED_TAGS = { script: 1, iframe: 1, frame: 1, frameset: 1, object: 1, embed: 1, base: 1, meta: 1, link: 1 };
  /* properties (not attributes): applied AFTER every attribute and child exist, so {type:'range', max:300, value:200} and select values work */
  const PROP_KEYS = { value: 1, checked: 1, disabled: 1, selected: 1, hidden: 1, open: 1, multiple: 1, readOnly: 1, required: 1, autofocus: 1, tabIndex: 1 };
  /* attributes whose true/false are the STRINGS "true"/"false" (aria-pressed="false" is meaningful; a bare attribute is not) */
  const ENUM_ATTR = /^(aria-|draggable$|spellcheck$|contenteditable$)/i;
  const UNITLESS = Object.create(null);
  ('opacity zIndex flex flexGrow flexShrink order lineHeight fontWeight zoom columnCount columns gridRow gridColumn gridRowStart gridRowEnd gridColumnStart ' +
    'gridColumnEnd scale aspectRatio strokeWidth strokeOpacity fillOpacity strokeMiterlimit tabSize orphans widows animationIterationCount ' +
    'floodOpacity stopOpacity lineClamp WebkitLineClamp').split(' ').forEach(function (k) { UNITLESS[k] = 1; });
  const MAX_TIMERS = 1000;
  const MAX_DELAY = 2147483647;           // longer delays overflow the browser's 32-bit timer and would fire at once
  const instances = {};

  function guard(ctx, label, fn, thisArg, args) {
    try { return fn.apply(thisArg === undefined ? null : thisArg, args || []); }
    catch (e) { P.reportError(e, { module: ctx.id, where: label }); }
    return undefined;
  }
  function noop() {}

  P.makeApi = function (def, root, opts) {
    opts = opts || {};
    const id = def.id;
    const n = instances[id] = (instances[id] || 0) + 1;
    const rng = U.makeRng(((P.params.seed | 0) * 2654435761 + U.hashStr(id) + n * 40503) >>> 0);
    const ctx = {
      id: id, destroyed: false, instance: n, system: !!opts.system, createdAt: NAT.now(), earlyExit: false,
      counts: { award: 0, say: 0, line: 0, stat: 0, flag: 0, achieve: 0, sfx: 0, confetti: 0, toast: 0, save: 0, exit: 0, badSfx: 0, afterDestroy: 0 },
      warnings: [], warned: {},
      timers: new Map(),     // handle -> {kind, native}
      listeners: [],         // {target,event,fn,capture}
      subs: [],              // engine event subscriptions (api.onEvent)
      nextHandle: 1
    };
    function warn(key, msg) {
      if (ctx.warned[key]) return;
      ctx.warned[key] = 1;
      ctx.warnings.push(msg);
      P.diag.add('warn', '[' + id + '] ' + msg, { module: id });
    }
    function live(name) {
      if (!ctx.destroyed) return true;
      ctx.counts.afterDestroy++;
      warn('after:' + name, 'api.' + name + ' called after the module was destroyed (a stale callback?)');
      return false;
    }

    /* ---- managed timers ---- */
    function addTimer(kind, fn, ms, args) {
      if (!live(kind)) return 0;
      if (typeof fn !== 'function') { warn('timerfn:' + kind, 'api.' + kind + ' needs a function (string callbacks are not supported)'); return 0; }
      if (ctx.timers.size >= MAX_TIMERS) { warn('timermax', 'too many active managed timers (' + MAX_TIMERS + '); request ignored'); return 0; }
      ms = Number(ms);
      if (ms !== ms || ms < 0) ms = 0;
      else if (ms > MAX_DELAY) ms = MAX_DELAY;           // Infinity / 1e12 mean "practically never", not "now"
      const h = ctx.nextHandle++;
      let native;
      if (kind === 'setTimeout') {
        native = NAT.setTimeout(function () {
          ctx.timers.delete(h);
          if (ctx.destroyed) return;
          guard(ctx, 'setTimeout callback', fn, null, args);
        }, Math.max(1, ms));
      } else if (kind === 'setInterval') {
        native = NAT.setInterval(function () {
          if (ctx.destroyed) return;
          guard(ctx, 'setInterval callback', fn, null, args);
        }, Math.max(8, ms));
      } else {
        native = NAT.raf(function (t) {
          ctx.timers.delete(h);
          if (ctx.destroyed) return;
          guard(ctx, 'requestAnimationFrame callback', fn, null, [t === undefined ? NAT.now() : t]);
        });
      }
      ctx.timers.set(h, { kind: kind, native: native });
      return h;
    }
    function clearTimer(h) {
      const t = ctx.timers.get(h);
      if (!t) return;
      ctx.timers.delete(h);
      if (t.kind === 'setTimeout') NAT.clearTimeout(t.native);
      else if (t.kind === 'setInterval') NAT.clearInterval(t.native);
      else NAT.cancelRaf(t.native);
    }

    /* ---- managed listeners ---- */
    function onEvent(target, event, handler, o) {
      if (!live('on')) return noop;
      if (!target || typeof target.addEventListener !== 'function' || typeof event !== 'string') {
        warn('onbad', 'api.on needs (target, event, handler) with a real event target');
        return noop;
      }
      const fn = typeof handler === 'function' ? handler : (handler && typeof handler.handleEvent === 'function' ? function (e) { handler.handleEvent(e); } : null);
      if (!fn) { warn('onhandler', 'api.on needs a handler function'); return noop; }
      const capture = o === true || !!(o && typeof o === 'object' && o.capture);
      const rec = { target: target, event: event, capture: capture, fn: null };
      rec.fn = function (ev) {
        if (ctx.destroyed) return;
        try { fn.call(this, ev); } catch (e) { P.reportError(e, { module: id, where: 'event ' + event }); }
        if (o && typeof o === 'object' && o.once) off();
      };
      NAT.add(target, event, rec.fn, o);
      ctx.listeners.push(rec);
      function off() {
        const i = ctx.listeners.indexOf(rec);
        if (i < 0) return;
        ctx.listeners.splice(i, 1);
        NAT.remove(target, event, rec.fn, capture);
      }
      return off;
    }
    /* managed subscription to ENGINE events (P.on): 'meh', 'say', 'stat', 'achievement', 'bought', 'toast' ... removed on destroy */
    function onGame(name, handler) {
      if (!live('onEvent')) return noop;
      if (typeof name !== 'string' || typeof handler !== 'function') { warn('ongamebad', 'api.onEvent needs (eventName, handler function)'); return noop; }
      const offEngine = NAT.on(name, function (d, nm) {
        if (ctx.destroyed) return;
        try { handler(d, nm); } catch (e) { P.reportError(e, { module: id, where: 'engine event ' + name }); }
      });
      ctx.subs.push(offEngine);
      return function () { offEngine(); const i = ctx.subs.indexOf(offEngine); if (i >= 0) ctx.subs.splice(i, 1); };
    }

    /* ---- hyperscript ---- */
    function setStyle(el, v, isSvg) {
      if (typeof v === 'string') { if (isSvg) el.setAttribute('style', v); else el.style.cssText = v; return; }
      if (v && typeof v === 'object') {
        Object.keys(v).forEach(function (k) {
          const val = v[k];
          if (val === null || val === undefined || val === false) return;
          try {
            if (k.indexOf('-') >= 0) el.style.setProperty(k, String(val));
            else el.style[k] = typeof val === 'number' && !UNITLESS[k] ? val + 'px' : String(val);
          } catch (e) { /* unknown property */ }
        });
      }
    }
    function addKids(el, kids) {
      for (let i = 0; i < kids.length; i++) {
        const c = kids[i];
        if (c === null || c === undefined || c === false || c === true) continue;
        if (typeof c === 'function') { warn('fnchild', 'api.el ignored a function passed as a child (call it, or pass its result)'); continue; }
        if (Array.isArray(c)) addKids(el, c);
        else if (c && c.nodeType) el.appendChild(c);
        else el.appendChild(document.createTextNode(String(c)));
      }
    }
    function setAttr(node, k, v) {
      try { node.setAttribute(k, v); }
      catch (e) { warn('badattr:' + k, 'api.el could not set attribute "' + String(k).slice(0, 30) + '" (invalid name)'); }
    }
    function el(tag) {
      const rest = Array.prototype.slice.call(arguments, 1);
      let attrs = rest.length ? rest[0] : null;
      let kids;
      if (attrs !== null && attrs !== undefined && (typeof attrs !== 'object' || attrs.nodeType || Array.isArray(attrs))) { kids = rest; attrs = null; }
      else kids = rest.slice(1);
      tag = String(tag || 'div');
      const low = tag.toLowerCase();
      if (BLOCKED_TAGS[low]) { warn('blockedtag:' + low, 'api.el refuses to create <' + low + '> (it would load or run outside code); a <span> was made instead'); tag = 'span'; }
      const canon = SVG_CANON[tag.toLowerCase()];
      const isSvg = !!canon;
      let node;
      try { node = isSvg ? document.createElementNS(SVG_NS, canon) : document.createElement(tag); }
      catch (e) { warn('badtag', 'api.el could not create <' + tag.slice(0, 30) + '> (invalid tag name); a <div> was made instead'); node = document.createElement('div'); }
      let props = null;
      if (attrs) {
        Object.keys(attrs).forEach(function (k) {
          const v = attrs[k];
          if (k === 'class' || k === 'className') { if (v) node.setAttribute('class', Array.isArray(v) ? v.filter(Boolean).join(' ') : String(v)); }
          else if (k === 'style') setStyle(node, v, isSvg);
          else if (k === 'text' || k === 'textContent') node.textContent = v === null || v === undefined ? '' : String(v);
          else if (k === 'dataset') {
            if (v && typeof v === 'object') Object.keys(v).forEach(function (d) {
              if (v[d] === null || v[d] === undefined) return;
              setAttr(node, 'data-' + d.replace(/[A-Z]/g, function (m) { return '-' + m.toLowerCase(); }), String(v[d]));
            });
          }
          else if (k.length > 2 && k.charAt(0) === 'o' && k.charAt(1) === 'n' && (typeof v === 'function' || k.toLowerCase() in node)) {
            if (typeof v === 'function') {
              const evName = k.slice(2).toLowerCase();
              NAT.add(node, evName, function (ev) {
                if (ctx.destroyed) return;
                try { v.call(node, ev); } catch (e) { P.reportError(e, { module: id, where: 'event ' + evName }); }
              });
            } else warn('inlineon:' + k, 'api.el ignored "' + k + '": inline string handlers are not supported, pass a function');
          }
          else if (PROP_KEYS[k] && !isSvg) { (props || (props = [])).push(k); }
          else if (k === 'for' || k === 'htmlFor') { if (!isSvg && v !== null && v !== undefined && v !== false) setAttr(node, 'for', String(v)); }
          else if (v === true) setAttr(node, k, ENUM_ATTR.test(k) ? 'true' : '');
          else if (v === false) { if (ENUM_ATTR.test(k)) setAttr(node, k, 'false'); }
          else if (v === null || v === undefined) { /* skip */ }
          else setAttr(node, k, String(v));
        });
      }
      addKids(node, kids);
      if (props) {
        if (props.indexOf('multiple') > 0) { props.splice(props.indexOf('multiple'), 1); props.unshift('multiple'); }
        props.forEach(function (k) {
          const v = attrs[k];
          if (v === undefined || v === null) return;      // {value: undefined} must not become the text "undefined"
          try { node[k] = v; } catch (e) { /* ignore */ }
        });
      }
      return node;
    }

    /* ---- stats ---- */
    function statName(name, write) {
      if (typeof name !== 'string' || !name) { warn('statname', 'stat name must be a non-empty string'); return null; }
      if (write) {
        if (P.state.stat.isEngine(name)) { warn('engstat:' + name, 'stat "' + name + '" belongs to the engine; write ignored'); return null; }
        if (name.indexOf(id + '.') !== 0 && !ctx.system) warn('statpfx:' + name, 'module stat "' + name + '" must be prefixed "' + id + '."');
      }
      return name;
    }

    /* ---- pointer / positions ---- */
    function rootRect() {
      try { return root.getBoundingClientRect(); } catch (e) { return null; }
    }
    function awardPos() {
      const r = rootRect();
      const lp = P.fx.lastPointer;
      if (r && lp && NAT.now() - lp.t < 3000 && lp.x >= r.left && lp.x <= r.right && lp.y >= r.top && lp.y <= r.bottom) return { x: lp.x, y: lp.y - 20 };
      if (r && r.width > 0) return { x: r.left + r.width / 2, y: r.top + Math.min(Math.max(r.height * 0.25, 60), 160) };
      return { x: (window.innerWidth || 800) / 2, y: (window.innerHeight || 600) / 3 };
    }

    const api = {
      root: root,
      id: id,
      selftest: P.params.mode === 'selftest',
      get destroyed() { return ctx.destroyed; },
      player: { get name() { return P.state.player.getName(); }, set name(v) { /* read-only: use the Settings screen */ } },

      award: function (amount, reason) {
        ctx.counts.award++;
        if (!live('award')) return 0;
        let a = Number(amount);
        if (!isFinite(a) || a === 0) return 0;
        a = U.clamp(a, -1e9, 1e9);
        const delta = P.state.addMeh(a, { reason: reason ? String(reason) : id, module: id });
        if (delta > 0) P.state.stat.inc(id + '.meh', delta);
        if (Math.abs(delta) >= 0.005) {       // float what actually changed hands: nothing floats for a 0 delta, and "-5" at a balance of 2 floats "-2"
          const pos = awardPos();
          P.fx.floatText((delta > 0 ? '+' : '-') + U.fmt(Math.abs(delta)) + ' Meh', pos.x, pos.y, { kind: delta > 0 ? 'gain' : 'loss' });
        }
        return delta;
      },
      meh: function () { return P.state.getMeh(); },
      fmt: U.fmt,

      say: function (text, o) {
        ctx.counts.say++;
        if (!live('say')) return false;
        const e = P.narrator.say(text, Object.assign({}, o || {}, { module: def.title, moduleId: id }));
        return !!e;
      },
      /* optional 2nd arg: token context, e.g. api.line('m:x:lines', { count: 12, item: 'a stapler' }) */
      line: function (cat, tokens) {
        ctx.counts.line++;
        return P.narrator.line(cat, Object.assign({ module: def.title }, tokens || {}));
      },
      sayRandom: function (cat, o) { return api.say(api.line(cat, o), o); },

      achieve: function (aid) {
        ctx.counts.achieve++;
        if (!live('achieve')) return false;
        if (typeof aid === 'string' && !ctx.system && aid.indexOf(id + '.') !== 0) warn('achpfx:' + aid, 'achievement id "' + aid + '" must be prefixed "' + id + '."');
        return P.state.ach.unlock(aid);
      },

      stat: {
        inc: function (name, amount) { ctx.counts.stat++; if (!live('stat.inc')) return 0; const k = statName(name, true); return k ? P.state.stat.inc(k, amount === undefined ? 1 : amount) : 0; },
        set: function (name, v) { ctx.counts.stat++; if (!live('stat.set')) return 0; const k = statName(name, true); return k ? P.state.stat.set(k, v) : 0; },
        max: function (name, v) { ctx.counts.stat++; if (!live('stat.max')) return 0; const k = statName(name, true); return k ? P.state.stat.max(k, v) : 0; },
        get: function (name) { const k = statName(name, false); return k ? P.state.stat.get(k) : 0; }
      },
      flag: {
        get: function (name) { return P.state.flag.get(name); },
        set: function (name, v) { ctx.counts.flag++; if (!live('flag.set')) return; P.state.flag.set(name, v); }
      },
      save: {
        get: function (key, dflt) { return P.state.modGet(id, String(key), dflt); },
        set: function (key, v) { ctx.counts.save++; if (!live('save.set')) return false; return P.state.modSet(id, String(key), v); }
      },

      sfx: function (name) {
        ctx.counts.sfx++;
        if (!live('sfx')) return;
        if (!P.sfx.has(name)) { ctx.counts.badSfx++; warn('sfx:' + name, 'unknown sfx name "' + String(name) + '"'); return; }
        P.sfx.play(name);
      },
      confetti: function (x, y, count) {
        ctx.counts.confetti++;
        if (!live('confetti')) return;
        if (x === undefined || x === null || !isFinite(Number(x)) || y === undefined || y === null || !isFinite(Number(y))) {
          const r = rootRect();
          x = r ? r.left + r.width / 2 : undefined;
          y = r ? r.top + Math.min(r.height / 2, 260) : undefined;
        }
        P.fx.confetti(x, y, count);
      },
      toast: function (text, o) {
        ctx.counts.toast++;
        if (!live('toast')) return;
        P.fx.toast(text, o);
      },

      rand: rng.rand, randInt: rng.randInt, pick: rng.pick, shuffle: rng.shuffle, chance: rng.chance,

      setTimeout: function (fn, ms) { return addTimer('setTimeout', fn, ms, Array.prototype.slice.call(arguments, 2)); },
      setInterval: function (fn, ms) { return addTimer('setInterval', fn, ms, Array.prototype.slice.call(arguments, 2)); },
      requestAnimationFrame: function (fn) { return addTimer('requestAnimationFrame', fn, 0, []); },
      clearTimeout: clearTimer,
      clearInterval: clearTimer,
      cancelAnimationFrame: clearTimer,
      on: onEvent,
      onEvent: onGame,

      hasItem: function (iid) { return P.state.item.has(iid); },
      itemCount: function (iid) { return P.state.item.count(iid); },
      el: el,
      setTitle: function (text) { if (!ctx.destroyed && P.host) P.host.setTitle(id, text); },
      exit: function () {
        ctx.counts.exit++;
        if (!live('exit')) return;
        /* leaving during mount, or from a timer right after mount, bounces the player straight back to the Lobby: flagged (the fuzz harness FAILS it) */
        let fromEvent = false;
        try { fromEvent = !!window.event; } catch (e) { /* ignore */ }
        if ((P.host && P.host.mounting) || (NAT.now() - ctx.createdAt < 400 && !fromEvent)) {
          ctx.earlyExit = true;
          warn('earlyexit', 'api.exit() was called during mount or from a timer right after it; the player would be bounced straight back to the Lobby');
        }
        NAT.setTimeout(function () { if (!ctx.destroyed && P.host) P.host.exit({ by: id }); }, 0);
      },
      now: function () { return NAT.now(); }
    };

    ctx.dispose = function () {
      ctx.destroyed = true;
      ctx.timers.forEach(function (t) {
        if (t.kind === 'setTimeout') NAT.clearTimeout(t.native);
        else if (t.kind === 'setInterval') NAT.clearInterval(t.native);
        else NAT.cancelRaf(t.native);
      });
      ctx.timers.clear();
      ctx.listeners.forEach(function (r) { try { NAT.remove(r.target, r.event, r.fn, r.capture); } catch (e) { /* ignore */ } });
      ctx.listeners.length = 0;
      ctx.subs.forEach(function (off) { try { off(); } catch (e) { /* ignore */ } });
      ctx.subs.length = 0;
    };
    ctx.activeTimers = function () { return ctx.timers.size; };
    ctx.activeListeners = function () { return ctx.listeners.length; };
    return { api: api, ctx: ctx };
  };

  let sys = null;
  /** engine-level api (id 'shop') for shop effect callbacks; never disposed */
  P.systemApi = function () {
    if (!sys) {
      const root = document.getElementById('pm-shell') || document.body;
      sys = P.makeApi({ id: 'shop', title: 'Gift Shop of Nothing' }, root, { system: true }).api;
    }
    return sys;
  };
})();
