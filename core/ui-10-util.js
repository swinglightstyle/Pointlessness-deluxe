/* POINTLESS ui 10: Lobby namespace + shared helpers (P.ui.L).
 * Every other core/ui-*.js file hangs its pieces off P.ui.L and the last file (ui-90) registers the Lobby.
 * Lobby classes are prefixed "lb-". Lobby code may use plain DOM + P.native timers (captured natives). */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const NAT = P.native;
  const U = P.util;
  const LB = P.ui.L = P.ui.L || {};

  LB.P = P;
  LB.NAT = NAT;
  LB.screens = Object.create(null);          // id -> screen definition (see ui-30-modal.js); null prototype: ?screen=constructor is just an unknown id
  LB.screenOrder = [];
  LB.parts = {};            // named UI parts (header, grid, side, narrator ...) for cross-calls
  LB.refreshers = [];       // functions called by LB.refreshAll()

  /* ---------- tiny hyperscript ---------- */
  const PROPS = { value: 1, checked: 1, disabled: 1, hidden: 1, open: 1, selected: 1, readOnly: 1, required: 1, multiple: 1, tabIndex: 1 };
  function addKids(el, list, from) {
    for (let i = from; i < list.length; i++) {
      const c = list[i];
      if (c === null || c === undefined || c === false || c === true) continue;
      if (Array.isArray(c)) addKids(el, c, 0);
      else if (c.nodeType) el.appendChild(c);
      else el.appendChild(document.createTextNode(String(c)));
    }
  }
  function applyProps(el, a, isSvg) {
    const keys = Object.keys(a);
    for (let i = 0; i < keys.length; i++) {
      const k = keys[i], v = a[k];
      if (v === null || v === undefined) continue;
      if (k === 'class') { if (v) el.setAttribute('class', Array.isArray(v) ? v.filter(Boolean).join(' ') : String(v)); }
      else if (k === 'text') el.textContent = String(v);
      else if (k === 'style') {
        if (typeof v === 'string') el.setAttribute('style', v);
        else Object.keys(v).forEach(function (s) { el.style.setProperty(s, String(v[s])); });
      }
      else if (k === 'dataset') Object.keys(v).forEach(function (d) { el.setAttribute('data-' + d, String(v[d])); });
      else if (k.length > 2 && k.charAt(0) === 'o' && k.charAt(1) === 'n' && typeof v === 'function') NAT.add(el, k.slice(2).toLowerCase(), v);
      else if (!isSvg && PROPS[k]) el[k] = v;
      else if (v === true) el.setAttribute(k, '');
      else if (v === false) { /* skip */ }
      else el.setAttribute(k, String(v));
    }
  }
  LB.h = function (tag, a) {
    const el = document.createElement(tag);
    let from = 1;
    if (a && typeof a === 'object' && !a.nodeType && !Array.isArray(a)) { applyProps(el, a, false); from = 2; }
    addKids(el, arguments, from);
    return el;
  };
  const SVG_NS = 'http://www.w3.org/2000/svg';
  LB.svg = function (tag, a) {
    const el = document.createElementNS(SVG_NS, tag);
    let from = 1;
    if (a && typeof a === 'object' && !a.nodeType && !Array.isArray(a)) { applyProps(el, a, true); from = 2; }
    addKids(el, arguments, from);
    return el;
  };
  LB.clear = function (el) { if (el) el.textContent = ''; return el; };
  LB.on = function (target, type, fn, opts) { NAT.add(target, type, fn, opts); return function () { NAT.remove(target, type, fn, opts); }; };

  /* ---------- state shortcuts ---------- */
  LB.fmt = function (n) { return U.fmt(n); };
  LB.stat = function (name, n) { return P.state.stat.inc(name, n === undefined ? 1 : n); };
  LB.getStat = function (name) { return P.state.stat.get(name); };
  LB.flag = function (name, v) { if (v === undefined) return P.state.flag.get(name); P.state.flag.set(name, v); return v; };
  LB.achieve = function (id) { try { return P.state.ach.unlock(id); } catch (e) { return false; } };
  LB.sfx = function (name) { try { P.sfx.play(name); } catch (e) { /* silent */ } };
  LB.toast = function (text, o) { try { P.fx.toast(text, o); } catch (e) { /* ignore */ } };
  LB.confetti = function (x, y, n) { try { P.fx.confetti(x, y, n); } catch (e) { /* ignore */ } };
  LB.reduced = function () { try { return P.fx.reduced(); } catch (e) { return false; } };
  LB.player = function () { return P.state.player.getName(); };
  LB.later = function (fn, ms) { return NAT.setTimeout(fn, ms); };
  LB.rand = function () { return P.rng.rand(); };
  LB.pick = function (arr) { return arr && arr.length ? arr[Math.floor(P.rng.rand() * arr.length)] : undefined; };
  LB.shuffle = function (arr) { return P.rng.shuffle(arr || []); };
  LB.inLobby = function () { return !P.host.current; };
  LB.isFuzz = function () { return P.params.mode === 'selftest'; };

  /* shuffle-bag line from the registry (content packs plug in here; falls back to built-ins) */
  LB.line = function (cat, tokens) { return P.narrator.line(cat, tokens); };
  LB.say = function (text, opts) { try { return P.narrator.say(text, opts || {}); } catch (e) { return null; } };
  LB.sayLine = function (cat, opts) { return LB.say(LB.line(cat, opts), opts); };
  /* a built-in pool with its own shuffle bag, so repeated clicks do not repeat lines back to back */
  const bags = Object.create(null);
  LB.bag = function (key, arr, tokens) {
    if (!arr || !arr.length) return '';
    let b = bags[key];
    if (!b || b.n !== arr.length || b.pos >= b.order.length) {
      const order = P.rng.shuffle(arr.map(function (x, i) { return i; }));
      if (b && order.length > 1 && order[0] === b.last) { const t = order[0]; order[0] = order[order.length - 1]; order[order.length - 1] = t; }
      b = bags[key] = { order: order, pos: 0, n: arr.length, last: b ? b.last : -1 };
    }
    const i = b.order[b.pos++];
    b.last = i;
    return P.subst(arr[i], tokens || {});
  };

  /* ---------- formatting ---------- */
  LB.fmtDur = function (sec) {
    let s = Number(sec);
    s = isFinite(s) ? Math.min(Math.max(0, Math.floor(s)), 3.15e11) : 0;      // never print "Infinityd NaNh"
    if (s < 60) return s + 's';
    const m = Math.floor(s / 60);
    if (m < 60) return m + 'm ' + (s % 60) + 's';
    const hh = Math.floor(m / 60);
    if (hh < 48) return hh + 'h ' + (m % 60) + 'm';
    return Math.floor(hh / 24) + 'd ' + (hh % 24) + 'h';
  };
  LB.prettify = function (key) {
    let s = String(key || '');
    const dot = s.lastIndexOf('.');
    if (dot >= 0 && dot < s.length - 1) s = s.slice(dot + 1);
    s = s.replace(/([a-z0-9])([A-Z])/g, '$1 $2').replace(/[_\-]+/g, ' ').replace(/\s+/g, ' ').trim();
    if (!s) return 'Unnamed Quantity';
    return s.charAt(0).toUpperCase() + s.slice(1);
  };
  LB.trunc = function (s, n) { s = String(s == null ? '' : s); return s.length > n ? s.slice(0, Math.max(1, n - 1)) + '…' : s; };
  LB.plural = function (n, one, many) { return n === 1 ? one : (many || one + 's'); };
  LB.dateStr = function (t) {
    try { return new Date(t).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }); } catch (e) { return 'a date'; }
  };
  LB.moduleTitle = function (id) { const m = P.moduleMap[id]; return m ? m.title : ''; };

  /* ---------- rank (derived from lifetime Meh) ---------- */
  LB.RANKS = [
    [0, 'Provisional Valued Employee'], [25, 'Intern of Nothing'], [100, 'Associate of Nothing'], [300, 'Senior Associate of Nothing'],
    [1000, 'Team Lead of One'], [3000, 'Deputy Assistant Director of Directing'], [10000, 'Vice President of Adjacent Things'],
    [30000, 'Chief Meh Officer'], [100000, 'Emeritus (Of What, Unclear)'], [1000000, 'A Legend, Internally, in One Department']
  ];
  LB.rank = function () {
    const e = P.state.stat.get('meh.earned') + P.state.stat.get('meh.passive');
    let i = 0;
    for (let k = 0; k < LB.RANKS.length; k++) if (e >= LB.RANKS[k][0]) i = k;
    const cur = LB.RANKS[i], nxt = LB.RANKS[i + 1] || null;
    const frac = nxt ? Math.max(0, Math.min(1, (e - cur[0]) / (nxt[0] - cur[0]))) : 1;
    return { index: i, name: cur[1], next: nxt ? nxt[1] : '', nextAt: nxt ? nxt[0] : 0, earned: e, frac: frac };
  };

  /* ---------- paging helper (bounded DOM for long lists) ---------- */
  LB.makePager = function (onPage) {
    const h = LB.h;
    let page = 0, pages = 1;
    const label = h('span', { class: 'lb-pager-label', 'aria-live': 'polite' });
    const prev = h('button', { type: 'button', class: 'lb-btn lb-btn-small', onclick: function () { go(page - 1); } }, '◀ Previous');
    const next = h('button', { type: 'button', class: 'lb-btn lb-btn-small', onclick: function () { go(page + 1); } }, 'Next ▶');
    const el = h('div', { class: 'lb-pager', hidden: true }, prev, label, next);
    function paint() {
      label.textContent = 'Page ' + (page + 1) + ' of ' + pages;
      prev.disabled = page <= 0;
      next.disabled = page >= pages - 1;
      el.hidden = pages <= 1;
    }
    function go(p) {
      p = Math.max(0, Math.min(pages - 1, p));
      if (p === page) return;
      page = p; paint(); onPage(page);
    }
    return {
      el: el,
      get page() { return page; },
      setTotal: function (total, size, keepPage) {
        pages = Math.max(1, Math.ceil(total / size));
        page = keepPage ? Math.min(page, pages - 1) : 0;
        paint();
      }
    };
  };

  /* ---------- registration helpers ---------- */
  LB.registerRefresh = function (fn) { LB.refreshers.push(fn); };
  LB.refreshAll = function () {
    LB.refreshers.forEach(function (fn) { try { fn(); } catch (e) { P.reportError(e, { where: 'lobby.refresh' }); } });
  };
})();
