/* POINTLESS core 20: persistent state engine.
 * Meh balance, stats, flags, achievements, shop items, module unlocks, settings, module saves,
 * export/import, reset, ascend, passive Meh, multi-tab merge. UI-free: the Lobby builds on these functions + events.
 * Events (P.on): meh stat flag achievement bought toggled unlocked setting player reset import sync save ascend state:ready */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const NAT = P.native;
  const U = P.util;
  const own = U.own;
  const VERSION = 1;
  const DEFAULT_NAME = 'Valued Employee';
  const BAD_KEYS = { '__proto__': 1, 'constructor': 1, 'prototype': 1 };
  const ENGINE_STATS = ['meh.earned', 'meh.spent', 'meh.passive', 'lobby.visits', 'clicks.total', 'keys.total', 'time.seconds',
    'modules.entered', 'modules.unlocked', 'shop.bought', 'achievements.unlocked', 'narrator.lines', 'ascensions',
    'tos.scrolls', 'session.count'];
  const BUILTIN_SETTINGS = { mute: false };
  const LIVE_SETTINGS = ['mute', 'reduceMotion', 'narratorCollapsed'];
  const MAX_MEH = 1e15;                  // far beyond anything reachable; keeps meh*1e6 rounding and the save finite
  const MAX_ASCENSIONS = 10000;
  const MAX_FLAG_BYTES = 20000;          // one flag value
  const MAX_FLAGS_TOTAL = 150000;        // all flags together
  const MAX_MOD_BYTES = 200000;          // one module's api.save blob
  const MAX_KEYS_PER_PREFIX = 300;       // distinct stat names per module prefix (engine stats are exempt)
  const MAX_KEYS_TOTAL = 3000;
  const MAX_IMPORT_CHARS = 3e6;
  const DAY = 86400000;

  function fresh() {
    return {
      v: VERSION, created: Date.now(), lastSaved: 0, meh: 0, ascensions: 0,
      player: { name: '' }, stats: {}, flags: {}, ach: {}, items: {}, equipped: {}, unlocked: {}, mod: {}, settings: {}
    };
  }
  /* names: no control/bidi/zero-width characters, no braces (they would be re-expanded as {tokens} by the narrator), cut on code points */
  function cleanName(n) {
    if (typeof n !== 'string') return '';
    const s = n.replace(/[\u0000-\u001f\u007f<>{}\u00ad\u200b-\u200f\u2028-\u202e\u2060-\u2069\ufeff]/g, '').replace(/\s+/g, ' ').trim();
    const a = Array.from(s);
    return (a.length > 24 ? a.slice(0, 24).join('') : s).trim();
  }
  function numMap(o, intOnly, max) {
    const out = {};
    if (!U.isPlain(o)) return out;
    Object.keys(o).forEach(function (k) {
      if (BAD_KEYS[k]) return;
      const v = Number(o[k]);
      if (isFinite(v)) out[k] = intOnly ? Math.min(max || 1e9, Math.max(0, Math.floor(v))) : v;
    });
    return out;
  }
  function boolMap(o) {
    const out = {};
    if (!U.isPlain(o)) return out;
    Object.keys(o).forEach(function (k) { if (!BAD_KEYS[k]) out[k] = !!o[k]; });
    return out;
  }
  function safeTime(t, now) { t = Number(t); return isFinite(t) && t > 0 && t <= now + DAY ? t : now; }
  function jsonSize(v) { try { return JSON.stringify(v).length; } catch (e) { return Infinity; } }
  /* strict JSON check for module-written values: finite numbers only, no Date/Map/Set/class instances, no holes or undefined in arrays.
   * (undefined as an object property is fine: JSON simply leaves it out.) */
  function strictJson(v, d, b) {
    if (++b.n > 50000 || d > 24) return false;
    const t = typeof v;
    if (v === null || t === 'boolean' || t === 'string') return true;
    if (t === 'number') return isFinite(v);
    if (t !== 'object') return false;
    if (Array.isArray(v)) { for (let i = 0; i < v.length; i++) { if (!strictJson(v[i], d + 1, b)) return false; } return true; }
    const pr = Object.getPrototypeOf(v);
    if (pr !== Object.prototype && pr !== null) return false;
    const ks = Object.keys(v);
    for (let i = 0; i < ks.length; i++) { if (v[ks[i]] !== undefined && !strictJson(v[ks[i]], d + 1, b)) return false; }
    return true;
  }
  function cloneStrict(v) {
    if (!strictJson(v, 0, { n: 0 })) throw new Error('not plain JSON');
    return U.clone(v);
  }
  function sanitize(o) {
    if (!U.isPlain(o)) throw new Error('save is not an object');
    if (Number(o.v) > VERSION) throw new Error('save was written by a newer version of the game');
    const now = Date.now();
    const d = fresh();
    d.v = VERSION;
    d.created = safeTime(o.created, now);
    if (isFinite(Number(o.meh)) && Number(o.meh) >= 0) d.meh = Math.min(MAX_MEH, Number(o.meh));
    if (isFinite(Number(o.ascensions)) && Number(o.ascensions) >= 0) d.ascensions = Math.min(MAX_ASCENSIONS, Math.floor(Number(o.ascensions)));
    d.player = { name: cleanName(o.player && o.player.name) };
    d.stats = numMap(o.stats, false);
    d.items = numMap(o.items, true, 1e6);
    d.ach = numMap(o.ach, false);
    Object.keys(d.ach).forEach(function (k) { d.ach[k] = safeTime(d.ach[k], now); });
    d.equipped = boolMap(o.equipped);
    d.unlocked = boolMap(o.unlocked);
    d.flags = {};
    if (U.isPlain(o.flags)) {
      Object.keys(o.flags).forEach(function (k) {
        if (BAD_KEYS[k]) return;
        try { const c = U.clone(o.flags[k]); if (c !== undefined && jsonSize(c) <= MAX_FLAG_BYTES) d.flags[k] = c; } catch (e) { /* drop */ }
      });
    }
    d.mod = {};
    if (U.isPlain(o.mod)) {
      Object.keys(o.mod).forEach(function (k) {
        if (BAD_KEYS[k] || !U.isPlain(o.mod[k])) return;       // a module blob must be a plain object
        try { const c = U.clone(o.mod[k]); if (jsonSize(c) <= MAX_MOD_BYTES) d.mod[k] = c; } catch (e) { /* drop */ }
      });
    }
    d.settings = {};
    if (U.isPlain(o.settings)) {
      Object.keys(o.settings).forEach(function (k) {
        if (BAD_KEYS[k]) return;
        const v = o.settings[k], t = typeof v;
        if (t === 'boolean' || (t === 'number' && isFinite(v)) || (t === 'string' && v.length <= 200)) d.settings[k] = v;
      });
    }
    return d;
  }

  let data = fresh();
  let firstRun = true, corrupted = false, loaded = false;
  let saveTimer = 0, saveDue = 0, checkTimer = 0, dirty = false, lastSaveOk = true;
  let backupOk = false;
  const warned = {};
  function warnOnce(key, msg, extra) {
    if (warned[key]) return;
    warned[key] = 1;
    P.diag.add('warn', msg, extra);
  }

  /* ---- stat key index (caps how many distinct stat names a module can invent) ---- */
  let keyTotal = 0;
  const prefixCount = Object.create(null);
  function prefixOf(name) { const i = name.indexOf('.'); return i > 0 ? name.slice(0, i) : name; }
  function rebuildKeyIndex() {
    keyTotal = 0;
    Object.keys(prefixCount).forEach(function (k) { delete prefixCount[k]; });
    Object.keys(data.stats).forEach(function (k) { keyTotal++; const p = prefixOf(k); prefixCount[p] = (prefixCount[p] || 0) + 1; });
  }
  function admitKey(name) {
    if (stat.isEngine(name)) { keyTotal++; return true; }
    const p = prefixOf(name);
    if (keyTotal >= MAX_KEYS_TOTAL || (prefixCount[p] || 0) >= MAX_KEYS_PER_PREFIX) {
      warnOnce('statcap:' + p, 'too many distinct stat names under "' + p + '." (limit ' + MAX_KEYS_PER_PREFIX + '); new names are ignored. Use a few counters, not one per thing.', { module: p });
      return false;
    }
    keyTotal++; prefixCount[p] = (prefixCount[p] || 0) + 1;
    return true;
  }

  /* ---- multi-tab: several tabs share one save. Before every write we merge in whatever another tab wrote; a 'storage' event does it too. ---- */
  const TAB = Math.random().toString(36).slice(2, 8) + Date.now().toString(36);
  let crossTab = false, lastForeign = '', syncTimer = 0;
  function foreignStamp() {
    const s = P.storage.get(P.storage.stampKey());
    return s && s.indexOf(TAB + '|') !== 0 ? s : '';
  }
  function mergeSave(o, preferOurs) {
    Object.keys(o.stats).forEach(function (k) {                    // stats only grow: keep the larger
      if (!own(data.stats, k)) { if (admitKey(k)) data.stats[k] = o.stats[k]; }
      else if (o.stats[k] > data.stats[k]) data.stats[k] = o.stats[k];
    });
    Object.keys(o.ach).forEach(function (k) { if (!own(data.ach, k) || o.ach[k] < data.ach[k]) data.ach[k] = o.ach[k]; });
    Object.keys(o.unlocked).forEach(function (k) { if (o.unlocked[k]) data.unlocked[k] = true; });
    if (o.ascensions > data.ascensions) {                         // the other tab ascended: its Meh and shop shelf are the truth
      data.ascensions = o.ascensions; data.meh = o.meh;
      data.items = Object.assign({}, o.items); data.equipped = Object.assign({}, o.equipped);
    } else if (o.ascensions === data.ascensions) {
      if (o.meh > data.meh) data.meh = o.meh;
      Object.keys(o.items).forEach(function (k) { if (!own(data.items, k) || o.items[k] > data.items[k]) data.items[k] = o.items[k]; });
      Object.keys(o.equipped).forEach(function (k) { if (!own(data.equipped, k)) data.equipped[k] = o.equipped[k]; });
    }
    Object.keys(o.flags).forEach(function (k) { if (!own(data.flags, k) || !preferOurs) data.flags[k] = o.flags[k]; });
    Object.keys(o.settings).forEach(function (k) { if (!own(data.settings, k) || !preferOurs) data.settings[k] = o.settings[k]; });
    Object.keys(o.mod).forEach(function (id) {
      if (!own(data.mod, id) || !U.isPlain(data.mod[id])) { data.mod[id] = o.mod[id]; return; }
      Object.keys(o.mod[id]).forEach(function (k) { if (!own(data.mod[id], k) || !preferOurs) data.mod[id][k] = o.mod[id][k]; });
    });
    if (!data.player.name && o.player.name) data.player.name = o.player.name;
    if (o.created < data.created) data.created = o.created;
    if (o.lastSaved > data.lastSaved) data.lastSaved = o.lastSaved;
    rebuildKeyIndex();
  }
  function pullStored(preferOurs) {
    const raw = P.storage.get(P.storage.saveKey());
    if (!raw) return false;
    let o;
    try { o = sanitize(JSON.parse(raw)); } catch (e) { return false; }
    const before = equippedWithToggle();
    mergeSave(o, preferOurs);
    applyEffects(); settleToggles(before);
    return true;
  }
  /* merge a save text (as written by another tab) into the live state; used by the storage-event path and by the core test */
  function mergeSaveText(text, preferOurs) {
    let o;
    try { o = sanitize(JSON.parse(text)); } catch (e) { return false; }
    const before = equippedWithToggle();
    mergeSave(o, preferOurs !== false);
    applyEffects(); settleToggles(before);
    return true;
  }
  function pullIfForeign(preferOurs) {
    if (!crossTab) return false;
    const st = foreignStamp();
    if (!st || st === lastForeign) return false;
    lastForeign = st;
    return pullStored(preferOurs);
  }
  function syncFromOtherTab() {
    syncTimer = 0;
    if (pullIfForeign(dirty)) {
      P.emit('sync', {});
      P.emit('meh', { value: data.meh, delta: 0, reason: 'sync' });
      announceSettings();
    }
  }
  function onStorageEvent(e) {
    if (!e || (e.key !== P.storage.saveKey() && e.key !== P.storage.stampKey())) return;
    if (!syncTimer) syncTimer = NAT.setTimeout(syncFromOtherTab, 60);
  }
  function announceSettings() { LIVE_SETTINGS.forEach(function (id) { P.emit('setting', { id: id, value: setting.get(id, false) }); }); }

  /* ---- persistence ---- */
  function save() {
    try {
      if (crossTab) pullIfForeign(true);
      data.lastSaved = Date.now();
      const ok = P.storage.set(P.storage.saveKey(), JSON.stringify(data));
      if (ok && crossTab) P.storage.set(P.storage.stampKey(), TAB + '|' + data.lastSaved, { quiet: true });
      if (ok) dirty = false;
      lastSaveOk = ok;
      P.emit('save', { ok: ok });
      return ok;
    } catch (e) {
      lastSaveOk = false;
      P.diag.add('warn', 'save failed: ' + (e && e.message ? e.message : e));
      return false;
    }
  }
  /* slow = true for things that tick constantly (time played, passive Meh): they are flushed by a 15s timer and by pagehide/hidden/unload */
  function scheduleSave(slow) {
    if (!slow) dirty = true;
    const delay = slow ? 15000 : 800;
    const due = NAT.now() + delay;
    if (saveTimer) { if (due >= saveDue) return; NAT.clearTimeout(saveTimer); }
    saveDue = due;
    saveTimer = NAT.setTimeout(function () { saveTimer = 0; saveDue = 0; save(); }, delay);
  }
  function flushSave() {
    if (saveTimer) { NAT.clearTimeout(saveTimer); saveTimer = 0; saveDue = 0; }
    return save();
  }

  /* ---- meh ---- */
  function getMeh() { return data.meh; }
  function addMeh(n, o) {
    n = Number(n);
    if (!isFinite(n) || n === 0) return 0;
    const cur = data.meh;
    let next = cur + n;
    if (!isFinite(next)) return 0;
    if (next < 0) next = 0;
    if (next > MAX_MEH) next = MAX_MEH;
    const small = next < 1e9 && cur < 1e9;
    if (small) next = Math.round(next * 1e6) / 1e6;
    const delta = small ? Math.round((next - cur) * 1e6) / 1e6 : next - cur;
    data.meh = next;
    if (delta > 0) stat.inc(o && o.passive ? 'meh.passive' : 'meh.earned', delta);
    else if (delta < 0) stat.inc('meh.spent', -delta);
    P.emit('meh', { value: next, delta: delta, reason: o && o.reason ? String(o.reason) : '', passive: !!(o && o.passive) });
    scheduleSave(!!(o && o.passive));
    return delta;
  }
  function spendMeh(n, reason) {
    n = Number(n);
    if (!isFinite(n) || n < 0 || data.meh + 1e-9 < n) return false;
    if (n > 0) addMeh(-n, { reason: reason || 'spend' });
    return true;
  }

  /* ---- stats / flags ---- */
  function statChanged(name, value) {
    P.emit('stat', { name: name, value: value });
    scheduleSave(name === 'meh.passive' || /\.seconds$/.test(name));       // constantly ticking values: slow flush
    scheduleChecks();
  }
  const stat = {
    get: function (name) { const v = own(data.stats, name) ? data.stats[name] : 0; return typeof v === 'number' && isFinite(v) ? v : 0; },
    set: function (name, v) {
      if (typeof name !== 'string' || !name || BAD_KEYS[name]) return 0;
      v = Number(v); if (!isFinite(v)) return stat.get(name);
      if (!own(data.stats, name) && !admitKey(name)) return 0;
      data.stats[name] = v; statChanged(name, v); return v;
    },
    inc: function (name, n) {
      if (typeof name !== 'string' || !name || BAD_KEYS[name]) return 0;
      n = n === undefined ? 1 : Number(n);
      if (!isFinite(n)) return stat.get(name);
      const v = stat.get(name) + n;
      if (!isFinite(v)) return stat.get(name);
      if (!own(data.stats, name) && !admitKey(name)) return 0;
      data.stats[name] = v; statChanged(name, v); return v;
    },
    max: function (name, v) {
      if (typeof name !== 'string' || !name || BAD_KEYS[name]) return 0;
      v = Number(v); if (!isFinite(v)) return stat.get(name);
      const cur = own(data.stats, name) ? data.stats[name] : undefined;
      if (typeof cur !== 'number' || v > cur) {
        if (cur === undefined && !admitKey(name)) return 0;
        data.stats[name] = v; statChanged(name, v); return v;
      }
      return cur;
    },
    all: function () { return Object.assign({}, data.stats); },
    isEngine: function (name) {
      return ENGINE_STATS.indexOf(name) >= 0 || /^[a-z0-9-]+\.(entered|seconds|meh)$/.test(name);
    },
    keyCount: function () { return keyTotal; },
    ENGINE: ENGINE_STATS
  };
  const flag = {
    /* returns a copy: mutating it never changes the save behind your back */
    get: function (name) {
      if (!own(data.flags, name)) return undefined;
      const v = data.flags[name];
      if (v === null || typeof v !== 'object') return v;
      try { return U.clone(v); } catch (e) { return undefined; }
    },
    set: function (name, v) {
      if (typeof name !== 'string' || !name || BAD_KEYS[name]) return false;
      let c;
      if (v === undefined) delete data.flags[name];
      else {
        try { c = cloneStrict(v); } catch (e) { warnOnce('flagjson:' + name, 'flag "' + name + '" got a value that is not plain JSON (NaN, Infinity, Date, Map, undefined in arrays...); write ignored'); return false; }
        const sz = jsonSize(c);
        if (sz > MAX_FLAG_BYTES || (sz > 1000 && jsonSize(data.flags) + sz > MAX_FLAGS_TOTAL)) {
          warnOnce('flagsize:' + name, 'flag "' + name + '" is too big (' + sz + ' bytes; limit ' + MAX_FLAG_BYTES + '); write ignored. Use api.save for bulk data.');
          return false;
        }
        data.flags[name] = c;
      }
      P.emit('flag', { name: name, value: c });
      scheduleSave(); scheduleChecks();
      return true;
    },
    all: function () { try { return U.clone(data.flags); } catch (e) { return {}; } }
  };

  /* ---- achievements ---- */
  function scheduleChecks() {
    if (checkTimer) return;
    checkTimer = NAT.setTimeout(function () { checkTimer = 0; runChecks(); }, 60);
  }
  function runChecks() {
    const order = P.achievementOrder;
    let stats = null, flags = null;      // read-only copies: a check function must not be able to rewrite the save
    for (let i = 0; i < order.length; i++) {
      const d = P.achievementMap[order[i]];
      if (!d || !d.check || own(data.ach, d.id) || d.__checkOff) continue;
      try {
        if (!stats) {
          stats = Object.freeze(Object.assign({}, data.stats));
          try { flags = Object.freeze(U.clone(data.flags)); } catch (e) { flags = Object.freeze({}); }
        }
        if (d.check(stats, flags)) unlock(d.id);
      } catch (e) {
        d.__checkErrors = (d.__checkErrors || 0) + 1;
        if (d.__checkErrors >= 3) d.__checkOff = true;
        P.diag.add('warn', 'achievement check ' + d.id + ' threw: ' + (e && e.message ? e.message : e), { module: d.module });
      }
    }
  }
  function unlock(id) {
    const d = P.achievementMap[id];
    if (!d) { warnOnce('ach:' + id, 'unknown achievement id "' + id + '"'); return false; }
    if (own(data.ach, id)) return false;
    data.ach[id] = Date.now();
    stat.inc('achievements.unlocked', 1);
    if (d.reward > 0) addMeh(d.reward, { reason: 'achievement: ' + d.name });
    P.emit('achievement', { id: id, def: d });
    try { if (P.sfx) P.sfx.play('fanfare'); } catch (e) { /* ignore */ }
    try { if (P.fx) P.fx.toast(d.name, { icon: d.icon, title: 'Achievement unlocked', desc: d.desc, kind: 'achievement', duration: 4200 }); } catch (e) { /* ignore */ }
    try {
      /* inside a module the toast already announces it: the spoken line must not outrank (or bury) the module's own Management lines */
      if (P.narrator) P.narrator.say(P.narrator.line('achievement', { item: d.name }), { priority: (P.host && P.host.current) ? 0 : 1, mood: 'proud' });
    } catch (e) { /* ignore */ }
    scheduleSave();
    return true;
  }
  const ach = {
    unlock: unlock,
    isUnlocked: function (id) { return own(data.ach, id) && !!data.ach[id]; },
    unlockedAt: function (id) { return own(data.ach, id) ? data.ach[id] : 0; },
    /* only counts achievements that exist in this build (ids from old or renamed modules in a save are not "trophies") */
    count: function () { let n = 0; Object.keys(data.ach).forEach(function (k) { if (P.achievementMap[k]) n++; }); return n; },
    total: function () { return P.achievementOrder.length; },
    check: runChecks
  };

  /* ---- shop / items ---- */
  function toggleable(def) { return !!(def && def.effect && (def.effect.bodyClass || def.effect.css || def.effect.onToggle)); }
  function itemCount(id) { const v = own(data.items, id) ? data.items[id] : 0; return typeof v === 'number' && isFinite(v) ? v : 0; }
  function itemPrice(id) {
    const d = P.shopMap[id]; if (!d) return Infinity;
    const c = itemCount(id);
    if (!(d.priceGrowth > 1)) return Math.round(d.price * 100) / 100;
    const p = d.price * Math.pow(d.priceGrowth, c);      // grown prices are shown as tidy numbers: whole Meh from 10 up, one decimal below
    return p >= 10 ? Math.round(p) : Math.round(p * 10) / 10;
  }
  function isEquipped(id) { return itemCount(id) > 0 && !(own(data.equipped, id) && data.equipped[id] === false) && toggleable(P.shopMap[id]); }
  const shopCss = {};
  function applyEffects() {
    if (typeof document === 'undefined') return;
    const want = Object.create(null), seen = Object.create(null);     // body classes are the UNION over equipped items (two items may share one)
    P.shopOrder.forEach(function (id) {
      const d = P.shopMap[id];
      if (!d || !d.effect) return;
      const on = isEquipped(id);
      try {
        if (d.effect.bodyClass) {
          String(d.effect.bodyClass).split(/\s+/).filter(Boolean).forEach(function (c) { seen[c] = 1; if (on) want[c] = 1; });
        }
        if (d.effect.css) {
          if (on && !shopCss[id]) {
            const el = document.createElement('style');
            el.setAttribute('data-pm-shop', id);
            el.textContent = String(d.effect.css);
            (document.head || document.documentElement).appendChild(el);
            shopCss[id] = el;
          } else if (!on && shopCss[id]) {
            if (shopCss[id].parentNode) shopCss[id].parentNode.removeChild(shopCss[id]);
            delete shopCss[id];
          }
        }
      } catch (e) { P.diag.add('warn', 'shop effect ' + id + ' failed: ' + (e && e.message ? e.message : e)); }
    });
    try { if (document.body) Object.keys(seen).forEach(function (c) { document.body.classList.toggle(c, !!want[c]); }); } catch (e) { /* ignore */ }
  }
  function systemApi() { try { return P.systemApi ? P.systemApi() : null; } catch (e) { return null; } }
  /* equipped items with an onToggle callback: remembered before ascend/reset/import so the callback can hear "off" afterwards */
  function equippedWithToggle() {
    return P.shopOrder.filter(function (id) { const d = P.shopMap[id]; return d && d.effect && typeof d.effect.onToggle === 'function' && isEquipped(id); });
  }
  function settleToggles(before) {
    before.forEach(function (id) {
      if (isEquipped(id)) return;
      const d = P.shopMap[id];
      try { d.effect.onToggle(false, systemApi()); }
      catch (e) { P.diag.add('warn', 'onToggle(false) of ' + id + ' threw: ' + (e && e.message ? e.message : e)); }
      P.emit('toggled', { id: id, on: false });
    });
  }
  function buy(id) {
    const d = P.shopMap[id];
    if (!d) return { ok: false, reason: 'unknown' };
    const c = itemCount(id);
    if (c > 0 && !d.repeatable) return { ok: false, reason: 'owned' };
    const price = itemPrice(id);
    if (data.meh + 1e-9 < price) return { ok: false, reason: 'poor', price: price, short: Math.round((price - data.meh) * 100) / 100 };
    if (price > 0) addMeh(-price, { reason: 'bought ' + d.name });
    data.items[id] = c + 1;
    if (toggleable(d) && c === 0) data.equipped[id] = true;
    stat.inc('shop.bought', 1);
    applyEffects();
    try { if (d.effect && typeof d.effect.onBuy === 'function') d.effect.onBuy(systemApi()); }
    catch (e) { P.diag.add('warn', 'onBuy of ' + id + ' threw: ' + (e && e.message ? e.message : e)); }
    const flavor = d.flavor.length ? P.rng.pick(d.flavor) : '';
    P.emit('bought', { id: id, count: c + 1, price: price, def: d });
    scheduleSave();
    return { ok: true, item: d, count: c + 1, price: price, flavor: flavor ? P.subst(flavor, { item: d.name }) : '' };
  }
  function toggle(id) {
    const d = P.shopMap[id];
    if (!d || itemCount(id) < 1 || !toggleable(d)) return false;
    const on = !(own(data.equipped, id) ? data.equipped[id] !== false : true);
    data.equipped[id] = on;
    applyEffects();
    try { if (d.effect && typeof d.effect.onToggle === 'function') d.effect.onToggle(on, systemApi()); }
    catch (e) { P.diag.add('warn', 'onToggle of ' + id + ' threw: ' + (e && e.message ? e.message : e)); }
    P.emit('toggled', { id: id, on: on });
    scheduleSave();
    return on;
  }
  const item = { count: itemCount, has: function (id) { return itemCount(id) > 0; }, price: itemPrice, buy: buy, toggle: toggle,
    isEquipped: isEquipped, isToggleable: function (id) { return toggleable(P.shopMap[id]); }, applyEffects: applyEffects };

  /* ---- module unlocks ---- */
  function isModuleUnlocked(id) {
    const d = P.moduleMap[id];
    if (!d) return false;
    return d.unlockCost <= 0 || (own(data.unlocked, id) && !!data.unlocked[id]);
  }
  function unlockModule(id) {
    const d = P.moduleMap[id];
    if (!d) return { ok: false, reason: 'unknown' };
    if (isModuleUnlocked(id)) return { ok: true, already: true };
    if (data.meh + 1e-9 < d.unlockCost) return { ok: false, reason: 'poor', price: d.unlockCost, short: d.unlockCost - data.meh };
    addMeh(-d.unlockCost, { reason: 'unlocked ' + d.title });
    data.unlocked[id] = true;
    stat.inc('modules.unlocked', 1);
    P.emit('unlocked', { id: id, def: d });
    scheduleSave();
    return { ok: true, price: d.unlockCost };
  }

  /* ---- player / settings / module saves ---- */
  const player = {
    getName: function () { return data.player.name || DEFAULT_NAME; },
    hasName: function () { return !!data.player.name; },
    setName: function (n) {
      data.player.name = cleanName(n);
      P.emit('player', { name: player.getName() }); scheduleSave();
      return player.getName();
    },
    DEFAULT_NAME: DEFAULT_NAME
  };
  const setting = {
    get: function (id, dflt) {
      if (own(data.settings, id)) return data.settings[id];
      if (id === 'reduceMotion') {
        try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; }
      }
      if (P.settingMap[id] && P.settingMap[id].default !== undefined) return P.settingMap[id].default;
      if (own(BUILTIN_SETTINGS, id)) return BUILTIN_SETTINGS[id];
      return dflt;
    },
    set: function (id, v) {
      if (typeof id !== 'string' || !id || BAD_KEYS[id]) return;
      const t = typeof v;
      if (t !== 'boolean' && t !== 'string' && !(t === 'number' && isFinite(v))) return;
      if (t === 'string' && v.length > 200) v = v.slice(0, 200);
      data.settings[id] = v;
      P.emit('setting', { id: id, value: v }); scheduleSave();
    }
  };
  function modGet(id, key, dflt) {
    const m = own(data.mod, id) ? data.mod[id] : null;
    if (!U.isPlain(m) || !own(m, key)) return dflt;
    try { return U.clone(m[key]); } catch (e) { return dflt; }
  }
  function modSet(id, key, v) {
    if (typeof key !== 'string' || !key || BAD_KEYS[key] || typeof id !== 'string' || BAD_KEYS[id]) return false;
    let c;
    try { c = v === undefined ? undefined : cloneStrict(v); } catch (e) { warnOnce('modset:' + id, 'api.save.set in ' + id + ' got a value that is not plain JSON for "' + key + '" (NaN, Infinity, Date, Map, undefined in arrays...); write ignored', { module: id }); return false; }
    if (!own(data.mod, id) || !U.isPlain(data.mod[id])) data.mod[id] = {};
    const m = data.mod[id];
    const prev = own(m, key) ? m[key] : undefined;
    if (c === undefined) delete m[key]; else m[key] = c;
    if (jsonSize(m) > MAX_MOD_BYTES) {
      if (prev === undefined) delete m[key]; else m[key] = prev;
      warnOnce('modsize:' + id, 'api.save for ' + id + ' exceeded 200KB; write ignored', { module: id });
      return false;
    }
    scheduleSave();
    return true;
  }

  /* ---- export / import / reset / ascend ---- */
  function b64enc(s) { return btoa(unescape(encodeURIComponent(s))); }
  function b64dec(s) { return decodeURIComponent(escape(atob(s))); }
  function exportSave() { flushSave(); return 'PMDX1:' + b64enc(JSON.stringify(data)); }
  /* pasted saves arrive wrapped in quotes, code fences, zero-width junk, lower-case prefixes and URL-safe base64: accept them all */
  function normalizeImport(text) {
    let t = String(text === undefined || text === null ? '' : text);
    t = t.replace(/[\u200b-\u200d\u2060\ufeff]/g, '');
    t = t.replace(/^\s*```[a-z]*\s*/i, '').replace(/\s*```\s*$/, '').trim();
    t = t.replace(/^["'\u201c\u2018`]+/, '').replace(/["'\u201d\u2019`]+$/, '').trim();
    return t;
  }
  function importSave(text) {
    let json;
    try {
      const t = normalizeImport(text);
      const compact = t.replace(/\s+/g, '');
      if (!compact) return { ok: false, error: 'There was nothing to import. Management respects the nothing, but cannot file it.' };
      if (compact.length > MAX_IMPORT_CHARS) return { ok: false, error: 'That is too much save. Management has a drawer for saves, and it is a small drawer.' };
      if (compact.charAt(0) === '{') json = t;
      else if (/^pmdx1:/i.test(compact)) {
        let b = compact.slice(6).replace(/-/g, '+').replace(/_/g, '/');
        while (b.length % 4) b += '=';
        try { json = b64dec(b); }
        catch (e) { return { ok: false, error: 'That save is not correctly encoded. It was probably cut short when it was copied. Please copy the whole thing, including the boring end.' }; }
      }
      else return { ok: false, error: 'That does not look like a save. It does not look like anything, in fact.' };
    } catch (e) { return { ok: false, error: 'That does not look like a save. It does not look like anything, in fact.' }; }
    let d;
    try { d = sanitize(JSON.parse(json)); }
    catch (e) {
      const newer = e && /newer version/.test(String(e.message));
      return { ok: false, error: newer ? 'That save comes from a newer version of this game, which Management has not been briefed on yet. It has been politely declined, and left unharmed.'
        : 'That save could not be read. It stops partway through, as many things do. The save has been politely declined.' };
    }
    const before = equippedWithToggle();
    data = d; firstRun = false;
    rebuildKeyIndex();
    applyEffects(); settleToggles(before);
    P.emit('import', {}); P.emit('meh', { value: data.meh, delta: 0, reason: 'import' });
    announceSettings();
    const ok = flushSave();
    return ok ? { ok: true } : { ok: true, warning: 'The save was imported, but this browser would not store it. It will be gone when this tab closes.' };
  }
  function reset() {
    const before = equippedWithToggle();
    data = fresh();
    corrupted = false; firstRun = true;
    rebuildKeyIndex();
    applyEffects(); settleToggles(before);
    P.emit('reset', {}); P.emit('meh', { value: 0, delta: 0, reason: 'reset' });
    announceSettings();
    flushSave();
  }
  function ascendCost() { return Math.round(250 * Math.pow(1.6, data.ascensions || 0)); }
  function ascend() {
    const cost = ascendCost();
    if (data.meh + 1e-9 < cost) return { ok: false, reason: 'poor', price: cost, short: cost - data.meh };
    const before = equippedWithToggle();
    data.meh = 0; stat.inc('meh.spent', cost);
    data.items = {}; data.equipped = {};
    data.ascensions = Math.min(MAX_ASCENSIONS, (data.ascensions || 0) + 1);
    stat.set('ascensions', data.ascensions);
    applyEffects(); settleToggles(before);
    P.emit('ascend', { count: data.ascensions });
    P.emit('meh', { value: 0, delta: -cost, reason: 'ascend' });
    scheduleSave();
    return { ok: true, count: data.ascensions, price: cost };
  }

  /* ---- init ---- */
  function init() {
    if (loaded) return;
    loaded = true;
    const key = P.storage.saveKey();
    const raw = P.storage.get(key);
    if (raw === null || raw === '') { data = fresh(); firstRun = true; }
    else {
      try { data = sanitize(JSON.parse(raw)); firstRun = false; }
      catch (e) {
        /* best effort backup: a failed backup write must not mark the (fine) fresh save as unwritable */
        backupOk = P.storage.set(key + ':corrupt-backup', raw, { quiet: true });
        data = fresh(); firstRun = true; corrupted = true;
        P.diag.add('warn', 'save was unreadable (' + (e && e.message ? e.message : e) + '); starting fresh, ' + (backupOk ? 'original kept as backup' : 'the backup could not be stored'));
      }
    }
    rebuildKeyIndex();
    stat.inc('session.count', 1);
    applyEffects();
    crossTab = P.storage.kind === 'localStorage';
    if (crossTab) {
      lastForeign = foreignStamp();
      NAT.add(window, 'storage', onStorageEvent);
    }
    NAT.add(window, 'pagehide', function () { flushSave(); });
    NAT.add(window, 'beforeunload', function () { flushSave(); });
    NAT.add(document, 'visibilitychange', function () {
      if (document.hidden) flushSave();
      else if (crossTab && !syncTimer) syncTimer = NAT.setTimeout(syncFromOtherTab, 60);
    });
    P.emit('state:ready', {});
    P.emit('meh', { value: data.meh, delta: 0, reason: 'init' });
  }

  /* ---- passive meh ("Passive Meh (Unearned)") ---- */
  const passive = {
    running: false, timer: 0,
    rate: function () { return 0.1 + P.rng.rand() * 0.2; },
    start: function () {
      if (passive.running) return;
      passive.running = true;
      passive.timer = NAT.setInterval(function () {
        if (document.hidden || P.host && P.host.current) return;
        addMeh(passive.rate(), { passive: true, reason: 'Passive Meh (Unearned)' });
      }, 1000);
    },
    stop: function () { passive.running = false; if (passive.timer) NAT.clearInterval(passive.timer); passive.timer = 0; }
  };
  P.passive = passive;

  P.state = {
    init: init, VERSION: VERSION,
    get data() { return data; },
    get firstRun() { return firstRun; },
    get corrupted() { return corrupted; },
    consumeCorruptNotice: function () { const c = corrupted; corrupted = false; return c; },
    /** the raw text of the unreadable save that was set aside at load ('' if none or if the backup could not be stored) */
    corruptBackup: function () { try { return P.storage.get(P.storage.saveKey() + ':corrupt-backup') || ''; } catch (e) { return ''; } },
    /** true while the most recent save reached the disk (false: quota or blocked storage; progress is at risk) */
    saveOk: function () { return lastSaveOk; },
    getMeh: getMeh, addMeh: addMeh, spendMeh: spendMeh,
    stat: stat, flag: flag, ach: ach, item: item, player: player, setting: setting,
    isModuleUnlocked: isModuleUnlocked, unlockModule: unlockModule,
    modGet: modGet, modSet: modSet,
    save: flushSave, scheduleSave: scheduleSave,
    exportSave: exportSave, importSave: importSave, reset: reset, mergeSaveText: mergeSaveText,
    ascendCost: ascendCost, ascend: ascend,
    ascensions: function () { return data.ascensions || 0; },
    cleanName: cleanName,
    MAX_MEH: MAX_MEH
  };
})();
