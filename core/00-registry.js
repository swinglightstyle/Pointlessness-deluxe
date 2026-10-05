/* POINTLESS core 00: global registry, params, events, diagnostics, utilities.
 * Loaded first. Everything else hangs off window.POINTLESS. Classic script, no modules. */
(function (global) {
  'use strict';
  if (global.POINTLESS && global.POINTLESS.__core) return;

  /* ---- natives captured BEFORE anything (fuzz harness, modules) can wrap them ---- */
  const nativeAdd = EventTarget.prototype.addEventListener;
  const nativeRemove = EventTarget.prototype.removeEventListener;
  const NAT = {
    setTimeout: global.setTimeout.bind(global),
    clearTimeout: global.clearTimeout.bind(global),
    setInterval: global.setInterval.bind(global),
    clearInterval: global.clearInterval.bind(global),
    realRaf: (typeof global.requestAnimationFrame === 'function') ? global.requestAnimationFrame.bind(global) : null,
    realCancelRaf: (typeof global.cancelAnimationFrame === 'function') ? global.cancelAnimationFrame.bind(global) : null,
    add: function (target, type, fn, opts) { return nativeAdd.call(target, type, fn, opts); },
    remove: function (target, type, fn, opts) { return nativeRemove.call(target, type, fn, opts); },
    now: function () { return global.performance && performance.now ? performance.now() : Date.now(); },
    log: global.console && console.log ? console.log.bind(console) : function () {},
    warn: global.console && console.warn ? console.warn.bind(console) : function () {},
    useTimerRaf: false
  };

  /* ---- URL params ---- */
  const ID_RE = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  function parseParams() {
    let q;
    try { q = new URLSearchParams(global.location.search); } catch (e) { q = new URLSearchParams(''); }
    const num = function (k, d, lo, hi) {
      const raw = q.get(k);
      if (raw === null || raw === '') return d;
      const v = Number(raw);
      if (!isFinite(v)) return d;
      return Math.min(hi, Math.max(lo, v));
    };
    const flag = function (k) { const v = q.get(k); return v !== null && v !== '0' && v !== 'false'; };
    const dev = (q.get('dev') || '').trim();
    const st = (q.get('selftest') || '').trim();
    let mode = 'lobby';
    let target = '';
    if (st) { mode = 'selftest'; target = st; }
    else if (dev && dev !== 'lobby') { mode = 'dev'; target = dev; }
    const seedGiven = q.get('seed') !== null && q.get('seed') !== '' && isFinite(Number(q.get('seed')));
    let seed;
    if (seedGiven) seed = Math.floor(Number(q.get('seed')));
    else if (mode === 'lobby') seed = (Date.now() ^ Math.floor(Math.random() * 0x7fffffff)) >>> 0;
    else seed = 1;
    return {
      mode: mode,                         // 'lobby' | 'dev' | 'selftest'
      target: target,                     // module id, or 'lobby' (selftest only)
      dev: mode === 'dev' ? target : '',
      selftest: mode === 'selftest' ? target : '',
      seed: seed,
      seedExplicit: seedGiven,
      steps: Math.floor(num('steps', 400, 1, 5000)),
      nostorage: flag('nostorage'),
      mute: flag('mute'),
      shot: flag('shot'),                 // screenshot run: lobby must skip first-run modal / intros
      actions: Math.floor(num('actions', 0, 0, 2000)),
      screen: (q.get('screen') || '').trim(),
      enter: ID_RE.test((q.get('enter') || '').trim()) ? (q.get('enter') || '').trim() : '',   // with ?shot=1: open that module from the real Lobby (tools/shot.js --enter)
      idle: Math.floor(num('idle', 62000, 0, 600000)),   // fuzz long-idle window (virtual ms)
      validTarget: mode === 'lobby' || target === 'lobby' || ID_RE.test(target)
    };
  }
  const params = parseParams();
  NAT.useTimerRaf = params.mode === 'selftest' || params.shot;   // headless virtual time never fires real rAF
  NAT.raf = function (fn) {
    if (NAT.realRaf && !NAT.useTimerRaf) return NAT.realRaf(fn);
    return NAT.setTimeout(function () { fn(NAT.now()); }, 16);
  };
  NAT.cancelRaf = function (h) {
    if (NAT.realRaf && !NAT.useTimerRaf) { if (NAT.realCancelRaf) NAT.realCancelRaf(h); return; }
    NAT.clearTimeout(h);
  };

  /* ---- utilities ---- */
  function hashStr(s) {
    s = String(s);
    let h = 2166136261 >>> 0;
    for (let i = 0; i < s.length; i++) { h ^= s.charCodeAt(i); h = Math.imul(h, 16777619) >>> 0; }
    return h >>> 0;
  }
  function mulberry32(a) {
    a = a >>> 0;
    return function () {
      a = (a + 0x6D2B79F5) >>> 0;
      let t = a;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function makeRng(seed) {
    const r = mulberry32(Math.floor(Number(seed) || 0) >>> 0);
    const rng = {
      rand: r,
      randInt: function (a, b) {
        a = Math.floor(Number(a)); b = Math.floor(Number(b));
        if (!isFinite(a)) a = 0;
        if (!isFinite(b)) b = a;
        if (b < a) { const t = a; a = b; b = t; }
        return a + Math.floor(r() * (b - a + 1));
      },
      pick: function (arr) {
        if (!arr || !arr.length) return undefined;
        return arr[Math.floor(r() * arr.length)];
      },
      shuffle: function (arr) {
        const out = Array.prototype.slice.call(arr || []);
        for (let i = out.length - 1; i > 0; i--) {
          const j = Math.floor(r() * (i + 1));
          const t = out[i]; out[i] = out[j]; out[j] = t;
        }
        return out;
      },
      chance: function (p) { p = Number(p); if (!isFinite(p)) return false; return r() < p; }
    };
    return rng;
  }
  function clamp(n, lo, hi) { n = Number(n); if (!isFinite(n)) return lo; return Math.min(hi, Math.max(lo, n)); }
  function addCommas(s) { return s.replace(/\B(?=(\d{3})+(?!\d))/g, ','); }
  function trimZeros(s) { return s.indexOf('.') < 0 ? s : s.replace(/0+$/, '').replace(/\.$/, ''); }
  const UNITS = [[1e6, 'M'], [1e9, 'B'], [1e12, 'T'], [1e15, 'Qa'], [1e18, 'Qi']];
  function suffixed(a) {
    let i = 0;
    for (let k = 0; k < UNITS.length; k++) { if (a >= UNITS[k][0]) i = k; }
    let v = a / UNITS[i][0];
    if (parseFloat(v.toFixed(2)) >= 1000 && i < UNITS.length - 1) { i++; v = a / UNITS[i][0]; }   // 999999999 -> 1B, not 1000M
    return trimZeros(v.toFixed(2)) + UNITS[i][1];
  }
  function fmt(n) {
    n = Number(n);
    if (n !== n) return '0';
    if (!isFinite(n)) return n > 0 ? '∞' : '-∞';
    const neg = n < 0;
    const a = Math.abs(n);
    let out;
    if (a >= 1e21) out = a.toExponential(2).replace('e+', 'e');
    else if (a >= 999999.5) out = suffixed(a);
    else if (a >= 1000) out = addCommas(String(Math.round(a)));
    else if (a >= 10) { out = trimZeros(a.toFixed(1)); if (parseFloat(out) >= 1000) out = addCommas(String(Math.round(a))); }
    else if (a >= 0.005) out = trimZeros(a.toFixed(2));
    else out = '0';
    return (neg && out !== '0' ? '-' : '') + out;
  }
  function clone(v) { if (v === undefined) return undefined; return JSON.parse(JSON.stringify(v)); }
  function isPlain(o) { return o !== null && typeof o === 'object' && !Array.isArray(o); }
  function own(o, k) { return o !== null && o !== undefined && Object.prototype.hasOwnProperty.call(o, k); }

  /* ---- emoji safety net: newer emoji render as empty "tofu" boxes on older systems (e.g. Windows 10 lacks Emoji 13+).
   * safeEmoji(s, fallback) returns s if every pictograph in it has a glyph on this machine, else the fallback. ---- */
  const emojiCache = Object.create(null);
  let emojiCv = null, emojiG = null, tofuSig = '';
  function glyphSig(ch) {
    emojiG.clearRect(0, 0, 40, 40);
    emojiG.fillText(ch, 2, 4);
    const d = emojiG.getImageData(0, 0, 40, 40).data;
    let h = 2166136261 >>> 0, ink = 0;
    for (let i = 0; i < d.length; i += 4) { const v = d[i + 3] ? 1 + d[i] + d[i + 1] * 3 + d[i + 2] * 7 : 0; if (v) ink++; h = Math.imul(h ^ v, 16777619) >>> 0; }
    return ink + ':' + h;
  }
  function codepointOk(cp) {
    if (cp < 0x1F000) return true;                      // classic symbols and text-presentation characters are everywhere
    const key = 'c' + cp;
    if (key in emojiCache) return emojiCache[key];
    let ok = true;
    try {
      if (!emojiG) {
        emojiCv = document.createElement('canvas'); emojiCv.width = 40; emojiCv.height = 40;
        emojiG = emojiCv.getContext('2d', { willReadFrequently: true });
        emojiG.font = '28px "Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';
        emojiG.textBaseline = 'top';
        tofuSig = glyphSig(String.fromCodePoint(0x10FFFE));
      }
      ok = glyphSig(String.fromCodePoint(cp)) !== tofuSig;
    } catch (e) { ok = true; }
    emojiCache[key] = ok;
    return ok;
  }
  function safeEmoji(s, fallback) {
    s = String(s === undefined || s === null ? '' : s);
    for (const ch of s) { if (!codepointOk(ch.codePointAt(0))) return fallback; }
    return s;
  }
  function clipChars(s, n) { const a = Array.from(String(s)); return a.length > n ? a.slice(0, n).join('') : String(s); }

  /* ---- events ---- */
  const handlers = Object.create(null);
  function on(name, fn) {
    if (typeof fn !== 'function') return function () {};
    (handlers[name] || (handlers[name] = [])).push(fn);
    return function off() {
      const l = handlers[name]; if (!l) return;
      const i = l.indexOf(fn); if (i >= 0) l.splice(i, 1);
    };
  }
  let emitDepth = 0;
  function emit(name, data) {
    const l = handlers[name]; if (!l || !l.length) return;
    if (emitDepth > 8) return;
    emitDepth++;
    try {
      const copy = l.slice();
      for (let i = 0; i < copy.length; i++) {
        try { copy[i](data, name); }
        catch (e) { if (name !== 'diag') P.diag.add('error', 'handler for "' + name + '" threw: ' + (e && e.message ? e.message : e), { stack: e && e.stack }); }
      }
    } finally { emitDepth--; }
  }

  NAT.on = on;      // un-wrappable reference for engine code (the fuzz harness wraps P.on to catch module subscriptions that are never removed)

  /* ---- diagnostics ---- */
  const dupIndex = Object.create(null);
  const diag = {
    list: [], max: 300, seq: 0,
    add: function (kind, msg, extra) {
      const e = { id: ++diag.seq, t: Date.now(), kind: String(kind), msg: String(msg), module: '', stack: '', src: '' };
      if (extra) { for (const k in extra) { if (Object.prototype.hasOwnProperty.call(extra, k)) e[k] = extra[k]; } }
      if (typeof e.stack !== 'string') e.stack = e.stack ? String(e.stack) : '';
      /* an interval that throws every tick must not flood the 300-entry list: repeats bump a counter on the first entry
       * (subscribers still get one 'diag' event per occurrence so counters and the crash shield keep working) */
      if (e.kind === 'module-error' || e.kind === 'error') {
        const key = e.kind + '|' + e.module + '|' + (e.where || e.src || '') + '|' + e.msg;
        const prev = dupIndex[key];
        if (prev && diag.list.indexOf(prev) >= 0) {
          prev.count = (prev.count || 1) + 1;
          const again = Object.assign({}, prev, { id: e.id, t: e.t });
          emit('diag', again);
          return prev;
        }
        e.count = 1;
        dupIndex[key] = e;
      }
      diag.list.push(e);
      if (diag.list.length > diag.max) diag.list.splice(0, diag.list.length - diag.max);
      emit('diag', e);
      return e;
    },
    clear: function () { diag.list.length = 0; emit('diag:clear', null); },
    errors: function () { return diag.list.filter(function (e) { return e.kind === 'error' || e.kind === 'module-error' || e.kind === 'load'; }); }
  };
  function moduleFromText(text) {
    const m = /(?:^|[\\/])games[\\/]([a-z0-9][a-z0-9-]*)\.js/.exec(String(text || ''));
    return m ? m[1] : '';
  }
  /** Report an error that was caught by the engine on behalf of code (module handlers, timers, mount). */
  function reportError(err, ctx) {
    ctx = ctx || {};
    const msg = err && err.message ? err.message : String(err);
    const entry = diag.add('module-error', msg, {
      module: ctx.module || moduleFromText(err && err.stack) || '',
      where: ctx.where || '',
      stack: err && err.stack ? err.stack : ''
    });
    /* ?dev=<id>: nobody is watching the diagnostics list, so say it in the console (captured native: the fuzz harness does not count it) */
    if (params.mode === 'dev' && (entry.count === 1 || entry.count === 10 || entry.count === 100)) {
      NAT.warn('[POINTLESS] error in ' + (entry.module || 'module') + (entry.where ? ' (' + entry.where + ')' : '') + ': ' + msg + (entry.count > 1 ? ' [x' + entry.count + ']' : '') +
        (entry.stack ? '\n' + String(entry.stack).split('\n').slice(0, 4).join('\n') : ''));
    }
    return entry;
  }
  const IGNORED = /ResizeObserver loop/i;
  nativeAdd.call(global, 'error', function (ev) {
    try {
      const t = ev.target;
      if (t && t !== global && t.tagName) {
        const src = t.src || t.href || '';
        if (t.tagName === 'SCRIPT' || t.tagName === 'LINK') {
          diag.add('load', 'failed to load ' + src.replace(/^.*[\\/](core|content|games|generated)[\\/]/, '$1/'), { src: src, module: moduleFromText(src) });
        }
        return;
      }
      let msg = ev.message || (ev.error && ev.error.message) || 'Script error.';
      if (IGNORED.test(msg)) return;
      const stack = ev.error && ev.error.stack ? ev.error.stack : '';
      const where = (ev.filename || '') + (ev.lineno ? ':' + ev.lineno + (ev.colno ? ':' + ev.colno : '') : '');
      let mod = moduleFromText(where) || moduleFromText(stack);
      /* Double-clicked index.html is file://: browsers hide the details of errors thrown by other files ("Script error.",
       * no file name, no stack). While a module is open that is almost certainly its raw handler or timer, so say so. */
      if (!mod && msg === 'Script error.' && !ev.filename && P.host && P.host.current && !P.host.current.crashed) {
        mod = P.host.current.def.id;
        msg += ' (details hidden by the browser on file://; attributed to the open module "' + mod + '", probably a raw timer or event handler: use api.setTimeout / api.on)';
      }
      diag.add('error', msg, { stack: stack, src: where, module: mod });
    } catch (e) { /* never throw from the error handler */ }
  }, true);
  nativeAdd.call(global, 'unhandledrejection', function (ev) {
    try {
      const r = ev.reason;
      const msg = r && r.message ? r.message : String(r);
      let mod = moduleFromText(r && r.stack);
      /* a rejection with a plain string/number has no stack: blame the open module (the likeliest owner) */
      if (!mod && !(r && r.stack) && P.host && P.host.current && !P.host.current.crashed) mod = P.host.current.def.id;
      diag.add('error', 'unhandled promise rejection: ' + msg, { stack: r && r.stack ? r.stack : '', module: mod });
    } catch (e) { /* ignore */ }
  });

  /* ---- content registry ---- */
  const CATEGORIES = ['greeting', 'idle', 'award', 'bigAward', 'nothing', 'buy', 'hubReturn', 'moduleEnter', 'moduleExit',
    'farewell', 'achievement', 'error404', 'tip', 'lockedTease', 'ticker', 'fortune', 'tosClause', 'creditsLine', 'patchNote',
    'loading', 'poster', 'plantStatus', 'notice', 'lobbyEvent'];
  const MOOD = ['neutral', 'proud', 'disappointed', 'confused', 'panic', 'smug'];
  const SFX_NAMES = ['blip', 'bloop', 'ding', 'honk', 'boing', 'sad', 'fanfare', 'error', 'stamp', 'pop', 'whoosh', 'tick', 'tada', 'bell', 'buzz'];

  const P = {
    __core: true,
    version: '1.0.0',
    params: params,
    native: NAT,
    diag: diag,
    on: on,
    emit: emit,
    reportError: reportError,
    moduleFromText: moduleFromText,
    util: { hashStr: hashStr, mulberry32: mulberry32, makeRng: makeRng, clamp: clamp, fmt: fmt, clone: clone, isPlain: isPlain, ID_RE: ID_RE, own: own, safeEmoji: safeEmoji, clipChars: clipChars },
    CATEGORIES: CATEGORIES,
    MOODS: MOOD,
    SFX_NAMES: SFX_NAMES,
    modules: [],            // registered module defs, in registration order
    moduleMap: Object.create(null),      // (null-prototype maps: ids like 'constructor' or '__proto__' are just ids)
    achievementMap: Object.create(null),
    achievementOrder: [],
    shopMap: Object.create(null),
    shopOrder: [],
    lines: Object.create(null),   // category -> [strings]
    settingDefs: [],
    settingMap: Object.create(null),
    ui: {},
    rng: makeRng(params.seed ^ 0x5eed),
    fmt: fmt
  };
  global.POINTLESS = P;

  P.getModule = function (id) { return P.moduleMap[id] || null; };
  P.listModules = function () { return P.modules.slice(); };

  function currentScriptName() {
    try { const s = document.currentScript; return s && s.src ? s.src.replace(/^.*[\\/](core|content|games)[\\/]/, '$1/') : ''; } catch (e) { return ''; }
  }

  /* ids that would collide with engine areas, stat prefixes (lobby.* shop.* meh.* ...), ?dev=lobby / ?selftest=lobby or the template */
  const RESERVED_IDS = ['lobby', 'shop', 'meh', 'clicks', 'keys', 'time', 'modules', 'session', 'achievements', 'narrator', 'ascensions', 'tos',
    'template', 'system'];
  P.RESERVED_IDS = RESERVED_IDS;

  P.registerModule = function (def) {
    try {
      if (!def || typeof def !== 'object') throw new Error('definition must be an object');
      if (typeof def.id !== 'string' || !ID_RE.test(def.id)) throw new Error('id must be kebab-case, got ' + JSON.stringify(def.id));
      if (typeof def.title !== 'string' || !def.title.trim()) throw new Error('title is required');
      if (typeof def.mount !== 'function') throw new Error('mount must be a function');
      if (RESERVED_IDS.indexOf(def.id) >= 0) throw new Error('"' + def.id + '" is a reserved id (it collides with an engine area, stat prefix or ?dev/?selftest keyword): pick another');
      if (P.moduleMap[def.id]) throw new Error('duplicate module id "' + def.id + '" (first registration wins)');
      let icon = typeof def.icon === 'string' && def.icon ? clipChars(def.icon, 12) : '🎲';
      const safeIcon = safeEmoji(icon, '📁');
      if (safeIcon !== icon) { diag.add('warn', '[' + def.id + '] icon ' + icon + ' has no glyph on this system (too new an emoji); showing 📁 instead. Use Emoji 11 or older.', { module: def.id }); icon = safeIcon; }
      let cost = Number(def.unlockCost);
      cost = cost > 0 ? Math.min(cost, 1e15) : 0;      // NaN and negatives mean free; Infinity means "very expensive", not "free"
      const n = {
        id: def.id,
        title: clipChars(def.title.trim(), 60),
        tagline: typeof def.tagline === 'string' ? clipChars(def.tagline, 200) : '',
        icon: icon,
        category: def.category === 'department' ? 'department' : 'game',
        unlockCost: cost,
        tags: Array.isArray(def.tags) ? def.tags.filter(function (t) { return typeof t === 'string'; }).slice(0, 12).map(function (t) { return clipChars(t, 24); }) : [],
        mount: def.mount,
        file: currentScriptName(),
        order: P.modules.length
      };
      P.modules.push(n);
      P.moduleMap[n.id] = n;
      emit('module:registered', n);
      return true;
    } catch (e) {
      const id = def && def.id ? def.id : '?';
      const msg = 'registerModule(' + id + ') rejected: ' + (e && e.message ? e.message : e);
      diag.add('warn', msg, { module: id });
      NAT.warn('[POINTLESS] ' + msg);
      return false;
    }
  };

  P.addAchievements = function (list) {
    if (!Array.isArray(list)) { diag.add('warn', 'addAchievements expects an array'); return 0; }
    let added = 0;
    list.forEach(function (a) {
      if (!a || typeof a.id !== 'string' || !a.id || typeof a.name !== 'string') { diag.add('warn', 'bad achievement definition ignored'); return; }
      if (P.achievementMap[a.id]) { diag.add('warn', 'duplicate achievement id ' + a.id + ' ignored'); return; }
      const n = {
        id: a.id, name: clipChars(a.name, 80), desc: typeof a.desc === 'string' ? clipChars(a.desc, 300) : '',
        icon: typeof a.icon === 'string' && a.icon ? safeEmoji(clipChars(a.icon, 12), '🏆') : '🏆',
        secret: !!a.secret,
        reward: isFinite(Number(a.reward)) && Number(a.reward) > 0 ? Number(a.reward) : 0,
        check: typeof a.check === 'function' ? a.check : null,
        module: a.id.indexOf('.') > 0 ? a.id.slice(0, a.id.indexOf('.')) : ''
      };
      P.achievementMap[n.id] = n; P.achievementOrder.push(n.id); added++;
    });
    return added;
  };

  const SHOP_CATS = ['cosmetic', 'consumable', 'upgrade', 'junk'];
  P.addShopItems = function (list) {
    if (!Array.isArray(list)) { diag.add('warn', 'addShopItems expects an array'); return 0; }
    let added = 0;
    list.forEach(function (it) {
      if (!it || typeof it.id !== 'string' || !it.id || typeof it.name !== 'string') { diag.add('warn', 'bad shop item ignored'); return; }
      if (P.shopMap[it.id]) { diag.add('warn', 'duplicate shop item id ' + it.id + ' ignored'); return; }
      const price = Number(it.price);
      const n = {
        id: it.id, name: clipChars(it.name, 80), desc: typeof it.desc === 'string' ? clipChars(it.desc, 300) : '',
        price: isFinite(price) && price >= 0 ? price : 1,
        icon: typeof it.icon === 'string' && it.icon ? safeEmoji(clipChars(it.icon, 12), '🎁') : '🎁',
        category: SHOP_CATS.indexOf(it.category) >= 0 ? it.category : 'junk',
        repeatable: !!it.repeatable,
        priceGrowth: isFinite(Number(it.priceGrowth)) && Number(it.priceGrowth) >= 1 ? Number(it.priceGrowth) : 1,
        effect: it.effect && typeof it.effect === 'object' ? it.effect : null,
        flavor: Array.isArray(it.flavor) ? it.flavor.filter(function (s) { return typeof s === 'string' && s; }) : []
      };
      P.shopMap[n.id] = n; P.shopOrder.push(n.id); added++;
    });
    return added;
  };

  P.addLines = function (category, arr) {
    if (typeof category !== 'string' || !category) { diag.add('warn', 'addLines needs a category string'); return 0; }
    if (!Array.isArray(arr)) { diag.add('warn', 'addLines(' + category + ') needs an array'); return 0; }
    const dst = P.lines[category] || (P.lines[category] = []);
    let added = 0;
    arr.forEach(function (s) {
      if (typeof s !== 'string' || !s.trim()) return;
      if (dst.indexOf(s) >= 0) return;
      dst.push(s); added++;
    });
    return added;
  };

  P.addSettings = function (list) {
    if (!Array.isArray(list)) { diag.add('warn', 'addSettings expects an array'); return 0; }
    let added = 0;
    list.forEach(function (s) {
      if (!s || typeof s.id !== 'string' || !s.id || typeof s.label !== 'string') { diag.add('warn', 'bad setting ignored'); return; }
      if (P.settingMap[s.id]) { diag.add('warn', 'duplicate setting id ' + s.id + ' ignored'); return; }
      const n = {
        id: s.id, label: s.label,
        type: s.type === 'slider' || s.type === 'select' ? s.type : 'toggle',
        options: Array.isArray(s.options) ? s.options.slice() : [],
        min: isFinite(Number(s.min)) ? Number(s.min) : 0,
        max: isFinite(Number(s.max)) ? Number(s.max) : 100,
        default: s.default,
        responses: Array.isArray(s.responses) ? s.responses.filter(function (x) { return typeof x === 'string' && x; }) : []
      };
      P.settingDefs.push(n); P.settingMap[n.id] = n; added++;
    });
    return added;
  };

  const cssMap = {};
  P.injectCSS = function (css, id) {
    try {
      id = id ? String(id) : 'css-' + Object.keys(cssMap).length;
      if (cssMap[id]) return cssMap[id];
      const el = document.createElement('style');
      el.setAttribute('data-pm', id);
      el.textContent = String(css);
      (document.head || document.documentElement).appendChild(el);
      cssMap[id] = el;
      return el;
    } catch (e) {
      diag.add('warn', 'injectCSS failed: ' + (e && e.message ? e.message : e));
      return null;
    }
  };

  P.ready = function (fn) {
    if (document.readyState !== 'loading') { NAT.setTimeout(fn, 0); return; }
    NAT.add(document, 'DOMContentLoaded', function () { fn(); }, { once: true });
  };
})(window);
