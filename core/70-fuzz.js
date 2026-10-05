/* POINTLESS core 70: fuzz harness (SPEC section 6). Runs ONLY for ?selftest=<id|lobby> (full run) and for
 * ?actions=N (screenshots: a few random actions, no checks). Never loaded into the player's experience:
 * nothing here executes unless boot calls P.fuzz.start() / P.fuzz.runActions().
 * Everything uses P.native timers/listeners so the raw-timer wrappers below only ever see module code. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const NAT = P.native;
  const U = P.util;

  const INTERACTIVE_SEL = 'button, [role="button"], a[href], input, textarea, select, summary, [contenteditable=""], ' +
    '[contenteditable="true"], [tabindex]:not([tabindex="-1"]), canvas, [draggable="true"], [onclick]';
  const FOCUSABLE_SEL = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
  const TEXT_SKIP_INPUT = { checkbox: 1, radio: 1, button: 1, submit: 1, reset: 1, image: 1, hidden: 1, file: 1 };
  const TYPE_POOL = ['hello', 'Gerald', '42', '-1', '0', '1e999', '   ', '', 'x'.repeat(300), '9'.repeat(40), '🥔🥔🥔',
    '<b>bold</b> & <i>stuff</i>', "'; DROP TABLE meh; --", 'a b c d e f g', 'Sandra', '7 1/2', 'éèê 你好', '../../etc', '{player}', '${x}'];
  const KEYS = [' ', 'Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'Escape', 'Tab', 'Backspace',
    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z',
    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'B', '?', 'Shift'];
  const KEYCODES = { ' ': 32, Enter: 13, Escape: 27, Tab: 9, Backspace: 8, ArrowLeft: 37, ArrowUp: 38, ArrowRight: 39, ArrowDown: 40, Shift: 16 };

  /* the REAL viewport (window.innerWidth/innerHeight are faked during a "resize" step; pointer coordinates must not be clamped to the fake size) */
  function vpW() { return document.documentElement.clientWidth || 1000; }
  function vpH() { return document.documentElement.clientHeight || 800; }
  const FORBID_RE = /(?<![A-Za-z])(?:NaN|undefined|null(?![a-z]{3,})|\[object Object\])/g;   // "nullify"/"nullable" are words; "NaNs", "NaNpx", "undefinedx" are bugs

  /* ---- raw timers / listeners created while a games/*.js file is LOADING (outside mount) are invisible to the per-session wrappers
   * (they install after load), so a tiny recorder is installed right now, before the games load. selftest only. ---- */
  const loadTime = [];
  (function installLoadRecorder() {
    if (P.params.mode !== 'selftest') return;
    const gameFile = function () {
      try { const s = document.currentScript; const src = (s && s.src) || ''; return /[\\/]games[\\/]/.test(src) ? src.replace(/^.*[\\/]games[\\/]/, 'games/') : ''; } catch (e) { return ''; }
    };
    const note = function (what) { const f = gameFile(); if (f && loadTime.length < 20) loadTime.push(f + ': ' + what); };
    const oSI = window.setInterval, oST = window.setTimeout, oRAF = window.requestAnimationFrame, oAdd = EventTarget.prototype.addEventListener;
    window.setInterval = function () { note('window.setInterval at load time'); return oSI.apply(window, arguments); };
    window.setTimeout = function () { note('window.setTimeout at load time'); return oST.apply(window, arguments); };
    if (oRAF) window.requestAnimationFrame = function () { note('requestAnimationFrame at load time'); return oRAF.apply(window, arguments); };
    EventTarget.prototype.addEventListener = function (type) {
      try { if (this === window || this === document || this === document.documentElement || this === document.body) note('addEventListener("' + type + '") on a global at load time'); } catch (e) { /* ignore */ }
      return oAdd.apply(this, arguments);
    };
  })();

  function sleep(ms) { return new Promise(function (r) { NAT.setTimeout(r, ms); }); }
  function trimStack(s) { return String(s || '').split('\n').slice(0, 6).join('\n'); }
  function fmtArgs(args) {
    return Array.prototype.map.call(args, function (a) {
      if (a && a.message) return a.message;
      if (typeof a === 'object') { try { return JSON.stringify(a); } catch (e) { return String(a); } }
      return String(a);
    }).join(' ').slice(0, 300);
  }

  /* ============================== low-level event helpers ============================== */
  function mouseInit(x, y, extra) {
    return Object.assign({ bubbles: true, cancelable: true, composed: true, view: window, clientX: x, clientY: y, screenX: x, screenY: y, button: 0, buttons: 0, detail: 0 }, extra || {});
  }
  function fireMouse(target, type, x, y, extra) {
    try { return target.dispatchEvent(new MouseEvent(type, mouseInit(x, y, extra))); } catch (e) { return true; }
  }
  function firePointer(target, type, x, y, extra) {
    try {
      const init = mouseInit(x, y, extra);
      init.pointerId = 1; init.pointerType = 'mouse'; init.isPrimary = true; init.width = 1; init.height = 1;
      init.pressure = init.buttons ? 0.5 : 0;
      return target.dispatchEvent(new PointerEvent(type, init));
    } catch (e) { return true; }
  }
  function fireKey(target, type, key, extra) {
    try {
      const code = key === ' ' ? 'Space' : /^[a-z]$/i.test(key) ? 'Key' + key.toUpperCase() : /^\d$/.test(key) ? 'Digit' + key : key === 'Shift' ? 'ShiftLeft' : key;
      const kc = KEYCODES[key] !== undefined ? KEYCODES[key] : (key.length === 1 ? key.toUpperCase().charCodeAt(0) : 0);
      const ev = new KeyboardEvent(type, Object.assign({ key: key, code: code, keyCode: kc, which: kc, bubbles: true, cancelable: true, composed: true, view: window }, extra || {}));
      if (ev.keyCode !== kc) { try { Object.defineProperty(ev, 'keyCode', { get: function () { return kc; } }); Object.defineProperty(ev, 'which', { get: function () { return kc; } }); } catch (e) { /* ignore */ } }
      return target.dispatchEvent(ev);
    } catch (e) { return true; }
  }
  function isVisible(e) {
    try {
      if (!e.getBoundingClientRect) return false;
      const r = e.getBoundingClientRect();
      if (r.width <= 0 || r.height <= 0) return false;
      const cs = window.getComputedStyle(e);
      return cs.visibility !== 'hidden' && cs.display !== 'none' && cs.pointerEvents !== 'none' && parseFloat(cs.opacity) !== 0;
    } catch (e2) { return false; }
  }
  function isTextual(el) {
    if (el.tagName === 'TEXTAREA') return true;
    if (el.tagName === 'INPUT') return !TEXT_SKIP_INPUT[(el.type || 'text').toLowerCase()];
    return !!el.isContentEditable && el.getAttribute('contenteditable') !== 'false';
  }
  function isButtonish(el) {
    const t = el.tagName;
    if (t === 'BUTTON' || t === 'SUMMARY' || (t === 'A' && el.hasAttribute('href'))) return true;
    if (el.getAttribute && el.getAttribute('role') === 'button') return true;
    if (t === 'INPUT') { const ty = (el.type || '').toLowerCase(); return ty === 'button' || ty === 'submit' || ty === 'checkbox' || ty === 'radio' || ty === 'reset'; }
    return false;
  }

  /* ============================== action engine (shared by full runs and screenshots) ============================== */
  function makeEngine(getScope, rng, opts) {
    opts = opts || {};
    const E = { step: 0, interactiveMax: 0, ptrCache: null, counts: { click: 0, type: 0, key: 0, drag: 0, burst: 0, hover: 0, scroll: 0, resize: 0, visibility: 0, touch: 0, select: 0, blocked: 0 } };
    let savedInner = null, fakeHidden = false;

    E.gather = function () {
      const scope = getScope();
      if (!scope) return [];
      const list = [], seen = new Set();
      const els = scope.querySelectorAll(INTERACTIVE_SEL);
      for (let i = 0; i < els.length && list.length < 500; i++) { if (isVisible(els[i])) { list.push(els[i]); seen.add(els[i]); } }
      if (E.step % 8 === 0 || !E.ptrCache) {
        const all = scope.getElementsByTagName('*'), found = [];
        const lim = Math.min(all.length, 900);
        for (let i = 0; i < lim && found.length < 200; i++) {
          const e = all[i];
          if (seen.has(e) || e.tagName === 'SCRIPT' || e.tagName === 'STYLE') continue;
          let cur = ''; try { cur = window.getComputedStyle(e).cursor; } catch (x) { continue; }
          if (cur === 'pointer' && isVisible(e)) found.push(e);
        }
        E.ptrCache = found;
      }
      for (let i = 0; i < E.ptrCache.length; i++) { const e = E.ptrCache[i]; if (e.isConnected && scope.contains(e) && !seen.has(e)) list.push(e); }
      if (list.length > E.interactiveMax) E.interactiveMax = list.length;
      return list;
    };

    /* choose a point on el; resolve what is actually on top there (like a real pointer would) */
    E.resolve = function (el) {
      const scope = getScope();
      for (let attempt = 0; attempt < 3; attempt++) {
        let r;
        try { r = el.getBoundingClientRect(); } catch (e) { return null; }
        const x = r.left + r.width * (0.15 + 0.7 * rng.rand()), y = r.top + r.height * (0.15 + 0.7 * rng.rand());
        const vw = vpW(), vh = vpH();
        if (x < 0 || y < 0 || x >= vw || y >= vh) {
          if (attempt === 0) { try { el.scrollIntoView({ block: 'center', inline: 'nearest' }); } catch (e) { /* ignore */ } continue; }
          return { target: el, x: Math.max(0, Math.min(vw - 1, x)), y: Math.max(0, Math.min(vh - 1, y)) };
        }
        const hit = document.elementFromPoint(x, y);
        if (!hit) return { target: el, x: x, y: y };
        if (el.contains(hit) || (scope && scope.contains(hit))) return { target: hit, x: x, y: y };
        if (attempt === 0) { try { el.scrollIntoView({ block: 'center', inline: 'nearest' }); } catch (e) { /* ignore */ } }
      }
      E.counts.blocked++;
      return null;
    };

    E.hover = function (el) {
      const p = E.resolve(el); if (!p) return;
      firePointer(p.target, 'pointerover', p.x, p.y); fireMouse(p.target, 'mouseover', p.x, p.y);
      firePointer(p.target, 'pointerenter', p.x, p.y, { bubbles: false }); fireMouse(p.target, 'mouseenter', p.x, p.y, { bubbles: false });
      firePointer(p.target, 'pointermove', p.x, p.y); fireMouse(p.target, 'mousemove', p.x, p.y);
      E.counts.hover++;
    };

    E.click = function (el, quick) {
      const p = E.resolve(el); if (!p) return false;
      const t = p.target;
      if (!quick) E.hover(el);
      firePointer(t, 'pointerdown', p.x, p.y, { buttons: 1 });
      const md = fireMouse(t, 'mousedown', p.x, p.y, { buttons: 1 });
      if (md) { try { const f = t.closest ? t.closest(FOCUSABLE_SEL) : null; if (f && f.focus) f.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
      firePointer(t, 'pointerup', p.x, p.y);
      fireMouse(t, 'mouseup', p.x, p.y);
      const sel = t.closest ? t.closest('select') : null;
      if (sel) E.pickOption(sel);
      const range = t.tagName === 'INPUT' && t.type === 'range' ? t : null;
      if (range) E.setRange(range);
      fireMouse(t, 'click', p.x, p.y, { detail: 1 });
      E.counts.click++;
      return true;
    };
    E.dblclick = function (el) {
      if (E.click(el, true)) { E.click(el, true); const p = E.resolve(el); if (p) fireMouse(p.target, 'dblclick', p.x, p.y, { detail: 2 }); }
    };
    E.pickOption = function (sel) {
      try {
        if (!sel.options || !sel.options.length) return;
        sel.selectedIndex = rng.randInt(0, sel.options.length - 1);
        sel.dispatchEvent(new Event('input', { bubbles: true })); sel.dispatchEvent(new Event('change', { bubbles: true }));
        E.counts.select++;
      } catch (e) { /* ignore */ }
    };
    E.setRange = function (r) {
      try {
        const lo = Number(r.min || 0), hi = Number(r.max || 100);
        r.value = String(lo + Math.floor(rng.rand() * (hi - lo + 1)));
        r.dispatchEvent(new Event('input', { bubbles: true })); r.dispatchEvent(new Event('change', { bubbles: true }));
      } catch (e) { /* ignore */ }
    };

    E.burst = function (el) {
      const n = rng.randInt(25, 70);
      for (let i = 0; i < n; i++) { if (!E.click(el, true)) break; }
      E.counts.burst++;
    };

    E.type = function (el) {
      try {
        el.focus && el.focus({ preventScroll: true });
        const ce = !('value' in el);
        const text = rng.pick(TYPE_POOL);
        const setVal = function (v) {
          if (ce) { el.textContent = v; return; }
          const proto = el.tagName === 'TEXTAREA' ? HTMLTextAreaElement.prototype : HTMLInputElement.prototype;
          const d = Object.getOwnPropertyDescriptor(proto, 'value');
          if (d && d.set) d.set.call(el, v); else el.value = v;
        };
        const getVal = function () { return ce ? el.textContent : el.value; };
        if (el.tagName === 'INPUT' && el.type === 'color') { setVal('#' + ('000000' + Math.floor(rng.rand() * 0xffffff).toString(16)).slice(-6)); el.dispatchEvent(new Event('input', { bubbles: true })); el.dispatchEvent(new Event('change', { bubbles: true })); E.counts.type++; return; }
        if (el.tagName === 'INPUT' && el.type === 'range') { E.setRange(el); E.counts.type++; return; }
        if (rng.rand() < 0.12) { setVal(''); el.dispatchEvent(new Event('input', { bubbles: true })); }
        if (text.length <= 12 && rng.rand() < 0.75) {
          for (let i = 0; i < text.length; i++) {
            const ch = text.charAt(i);
            fireKey(el, 'keydown', ch); fireKey(el, 'keypress', ch);
            let next = getVal() + ch;
            const ml = el.maxLength; if (ml > 0) next = next.slice(0, ml);
            setVal(next);
            try { el.dispatchEvent(new InputEvent('input', { bubbles: true, data: ch, inputType: 'insertText' })); } catch (e) { el.dispatchEvent(new Event('input', { bubbles: true })); }
            fireKey(el, 'keyup', ch);
          }
        } else {
          let v = text; const ml = el.maxLength; if (ml > 0) v = v.slice(0, ml);
          setVal(v);
          try { el.dispatchEvent(new InputEvent('input', { bubbles: true, data: v, inputType: 'insertFromPaste' })); } catch (e) { el.dispatchEvent(new Event('input', { bubbles: true })); }
        }
        if (rng.rand() < 0.5) el.dispatchEvent(new Event('change', { bubbles: true }));
        if (rng.rand() < 0.35) E.key('Enter', el);
        E.counts.type++;
      } catch (e) { /* harness-level problem, ignore */ }
    };

    E.focusables = function () {
      const scope = getScope(); if (!scope) return [];
      return Array.prototype.filter.call(scope.querySelectorAll(FOCUSABLE_SEL), function (e) { return !e.disabled && isVisible(e); });
    };
    E.key = function (key, forced) {
      const scope = getScope();
      let target = forced;
      if (!target) {
        const ae = document.activeElement;
        target = ae && ae !== document.body && scope && scope.contains(ae) ? ae : (rng.rand() < 0.5 ? document.body : (scope || document.body));
      }
      key = key || rng.pick(KEYS);
      const shift = rng.rand() < 0.1;
      if (key === 'Tab') {
        const ok = fireKey(target, 'keydown', 'Tab', { shiftKey: shift });
        if (ok) {
          const f = E.focusables();
          if (f.length) {
            let i = f.indexOf(document.activeElement);
            i = i < 0 ? 0 : (i + (shift ? f.length - 1 : 1)) % f.length;
            try { f[i].focus({ preventScroll: false }); } catch (e) { /* ignore */ }
          }
        }
        fireKey(target, 'keyup', 'Tab');
        E.counts.key++;
        return;
      }
      const dn = fireKey(target, 'keydown', key, { shiftKey: shift });
      if (key.length === 1) fireKey(target, 'keypress', key);
      if (dn && key === 'Enter' && isButtonish(target)) fireMouse(target, 'click', 0, 0, { detail: 0 });
      fireKey(target, 'keyup', key, { shiftKey: shift });
      if (key === ' ' && isButtonish(target) && dn) fireMouse(target, 'click', 0, 0, { detail: 0 });
      if (key === 'Enter' && target.tagName === 'INPUT' && target.form && dn) { try { if (target.form.requestSubmit) target.form.requestSubmit(); } catch (e) { /* ignore */ } }
      E.counts.key++;
    };

    E.drag = function (el) {
      const p = E.resolve(el); if (!p) return;
      const t = p.target;
      firePointer(t, 'pointerdown', p.x, p.y, { buttons: 1 }); fireMouse(t, 'mousedown', p.x, p.y, { buttons: 1 });
      const vw = vpW(), vh = vpH();
      let lx = p.x, ly = p.y, last = t;
      const n = rng.randInt(3, 9);
      for (let i = 0; i < n; i++) {
        lx = Math.max(0, Math.min(vw - 1, lx + (rng.rand() - 0.5) * 220)); ly = Math.max(0, Math.min(vh - 1, ly + (rng.rand() - 0.5) * 220));
        const under = document.elementFromPoint(lx, ly) || document.body;
        last = under;
        firePointer(under, 'pointermove', lx, ly, { buttons: 1 }); fireMouse(under, 'mousemove', lx, ly, { buttons: 1 });
        if (under !== document) { firePointer(document, 'pointermove', lx, ly, { buttons: 1 }); fireMouse(document, 'mousemove', lx, ly, { buttons: 1 }); }
      }
      firePointer(last, 'pointerup', lx, ly); fireMouse(last, 'mouseup', lx, ly);
      firePointer(document, 'pointerup', lx, ly); fireMouse(document, 'mouseup', lx, ly);
      if (t.getAttribute && t.getAttribute('draggable') === 'true' && typeof DataTransfer === 'function') {
        try {
          const dt = new DataTransfer();
          const mk = function (type, tg, x, y) { tg.dispatchEvent(new DragEvent(type, { bubbles: true, cancelable: true, dataTransfer: dt, clientX: x, clientY: y })); };
          mk('dragstart', t, p.x, p.y); mk('dragenter', last, lx, ly); mk('dragover', last, lx, ly); mk('drop', last, lx, ly); mk('dragend', t, lx, ly);
        } catch (e) { /* ignore */ }
      }
      E.counts.drag++;
    };

    E.touch = function (el) {
      if (typeof Touch !== 'function' || typeof TouchEvent !== 'function') return E.click(el);
      const p = E.resolve(el); if (!p) return;
      try {
        const mkT = function (x, y) { return new Touch({ identifier: 1, target: p.target, clientX: x, clientY: y, pageX: x, pageY: y, screenX: x, screenY: y, radiusX: 2, radiusY: 2, force: 0.5 }); };
        const fire = function (type, x, y) {
          const t = mkT(x, y), list = type === 'touchend' ? [] : [t];
          p.target.dispatchEvent(new TouchEvent(type, { bubbles: true, cancelable: true, touches: list, targetTouches: list, changedTouches: [t] }));
        };
        fire('touchstart', p.x, p.y);
        const n = rng.randInt(0, 4);
        for (let i = 0; i < n; i++) fire('touchmove', p.x + (rng.rand() - 0.5) * 120, p.y + (rng.rand() - 0.5) * 120);
        fire('touchend', p.x, p.y);
        E.counts.touch++;
      } catch (e) { /* ignore */ }
    };

    E.scroll = function () {
      try {
        window.scrollBy(0, (rng.rand() - 0.5) * 700);
        const c = E.gather();
        const t = c.length ? rng.pick(c) : (getScope() || document.body);
        t.dispatchEvent(new WheelEvent('wheel', { bubbles: true, cancelable: true, deltaY: (rng.rand() - 0.5) * 240, clientX: 100, clientY: 100 }));
        E.counts.scroll++;
      } catch (e) { /* ignore */ }
    };

    E.resize = function (w) {
      try {
        const shell = document.getElementById('pm-shell');
        const widths = [360, 414, 600, 768, 1024, 1400];
        w = w || rng.pick(widths);
        const h = Math.round(w * (0.6 + rng.rand() * 0.9));
        if (shell) { shell.style.maxWidth = w + 'px'; shell.style.marginLeft = 'auto'; shell.style.marginRight = 'auto'; }
        if (!savedInner) savedInner = { w: Object.getOwnPropertyDescriptor(window, 'innerWidth'), h: Object.getOwnPropertyDescriptor(window, 'innerHeight') };
        Object.defineProperty(window, 'innerWidth', { configurable: true, get: function () { return w; } });
        Object.defineProperty(window, 'innerHeight', { configurable: true, get: function () { return h; } });
        window.dispatchEvent(new Event('resize'));
        E.counts.resize++;
      } catch (e) { /* ignore */ }
    };
    E.restoreSize = function () {
      try {
        const shell = document.getElementById('pm-shell');
        if (shell) { shell.style.maxWidth = ''; shell.style.marginLeft = ''; shell.style.marginRight = ''; }
        if (savedInner) {
          if (savedInner.w) Object.defineProperty(window, 'innerWidth', savedInner.w); else delete window.innerWidth;
          if (savedInner.h) Object.defineProperty(window, 'innerHeight', savedInner.h); else delete window.innerHeight;
          savedInner = null;
          window.dispatchEvent(new Event('resize'));
        }
      } catch (e) { /* ignore */ }
    };

    E.visibility = function (hidden) {
      try {
        if (hidden) {
          Object.defineProperty(document, 'hidden', { configurable: true, get: function () { return true; } });
          Object.defineProperty(document, 'visibilityState', { configurable: true, get: function () { return 'hidden'; } });
          fakeHidden = true;
        } else {
          delete document.hidden; delete document.visibilityState; fakeHidden = false;
        }
        document.dispatchEvent(new Event('visibilitychange'));
        window.dispatchEvent(new Event(hidden ? 'blur' : 'focus'));
        E.counts.visibility++;
      } catch (e) { /* ignore */ }
    };
    E.restoreVisibility = function () { if (fakeHidden) E.visibility(false); };

    /* one random fuzz action. returns a label (for debugging) */
    E.randomAction = function (o) {
      o = o || {};
      E.step++;
      const cands = E.gather();
      const textual = cands.filter(isTextual);
      const r = rng.rand();
      if (!cands.length) {
        if (r < 0.6) { E.key(); return 'key'; }
        if (r < 0.8) { E.scroll(); return 'scroll'; }
        E.resize(); return 'resize';
      }
      const pickEl = function () { return rng.pick(cands); };
      if (r < 0.44) { E.click(pickEl()); return 'click'; }
      if (r < 0.52 && textual.length) { E.type(rng.pick(textual)); return 'type'; }
      if (r < 0.66) { E.key(); return 'key'; }
      if (r < 0.74) { E.drag(pickEl()); return 'drag'; }
      if (r < 0.79) { E.burst(pickEl()); return 'burst'; }
      if (r < 0.83) { E.dblclick(pickEl()); return 'dblclick'; }
      if (r < 0.88) { E.hover(pickEl()); return 'hover'; }
      if (r < 0.91) { E.touch(pickEl()); return 'touch'; }
      if (r < 0.94) { E.scroll(); return 'scroll'; }
      if (r < 0.97 && !o.noResize) { E.resize(); return 'resize'; }
      if (!o.noVisibility) {
        E.visibility(true);
        return 'visibility';
      }
      E.click(pickEl()); return 'click';
    };
    return E;
  }

  /* ============================== session: capture, wrappers, checks ============================== */
  function makeSession(kind, id) {
    const S = {
      kind: kind, id: id, step: 0, phase: 'init', instSeq: 0, curInst: 0, dead: new Set(),
      errors: [], errorMap: {}, errorCount: 0, errorsAfterDestroy: 0, loadErrors: [], earlyErrors: [], otherLoadErrors: [], warnings: [], warnSet: new Set(),
      consoleErrors: 0, consoleWarns: 0, consoleMsgs: [], dialogs: [], navAttempts: [], opens: 0,
      forbidden: [], forbiddenKeys: new Set(), harnessErrors: [], lobbyErrors: [], crashes: [],
      totals: { award: 0, say: 0, line: 0, stat: 0, flag: 0, achieve: 0, sfx: 0, confetti: 0, toast: 0, save: 0, exit: 0, badSfx: 0, afterDestroy: 0 },
      raw: { intervals: [], timeouts: [], rafs: [], listeners: [], engineSubs: [], observers: [] }, rawHandles: new Map(),
      nodes: { baselineStep: 0, baseline: -1, end: 0, max: 0, docEnd: 0 },
      remounts: 0, exits: 0, pendingRemount: false, roots: [], restore: [],
      earlyExits: 0, rawSubmits: [], pageTamper: [], bodyLeaks: [],
      screens: { opened: {}, failed: {} }, modulesEntered: {}, bodyBefore: new Set(), t0: NAT.now()
    };
    const warn = function (msg) {
      const key = String(msg).replace(/^\[[a-z0-9-]+\] /, '');        // the same warning arrives twice: once from the api ("[id] ...") and once from the diagnostics log
      if (S.warnSet.has(key) || S.warnings.length >= 30) return;
      S.warnSet.add(key); S.warnings.push(msg);
    };
    S.warn = warn;

    /* ---- diag -> errors / warnings ---- */
    const offDiag = P.on('diag', function (e) {
      if (e.kind === 'error' || e.kind === 'module-error') {
        S.errorCount++;
        /* a rejected promise has no "phase": only timers and listeners that outlive destroy() count as errors-after-destroy */
        if (S.phase === 'destroyed' && !/^unhandled promise rejection/.test(String(e.msg))) S.errorsAfterDestroy++;
        const key = String(e.msg).replace(/\d+/g, '#') + '|' + String(e.where || e.src || '').replace(/\d+/g, '#');
        let g = S.errorMap[key];
        if (!g) {
          g = { message: e.msg, stack: trimStack(e.stack), where: e.where || e.src || '', module: e.module || '', phase: S.phase, step: S.step, count: 0 };
          S.errorMap[key] = g;
          if (S.errors.length < 25) S.errors.push(g);
        }
        g.count++;
      } else if (e.kind === 'load') {
        S.loadErrors.push(e.msg);
      } else if (e.kind === 'warn') {
        warn(e.msg);
      }
    });
    S.restore.push(offDiag);
    P.diag.list.forEach(function (e) { if (e.kind === 'warn') warn(e.msg); });
    const offCrash = P.on('module:crash', function (c) { S.crashes.push(c); });
    S.restore.push(offCrash);

    /* ---- console / dialogs ---- */
    const oErr = console.error, oWarn = console.warn;
    console.error = function () { S.consoleErrors++; if (S.consoleMsgs.length < 40) S.consoleMsgs.push('error: ' + fmtArgs(arguments)); };
    console.warn = function () { S.consoleWarns++; if (S.consoleMsgs.length < 40) S.consoleMsgs.push('warn: ' + fmtArgs(arguments)); };
    S.restore.push(function () { console.error = oErr; console.warn = oWarn; });
    const dlg = ['alert', 'confirm', 'prompt'], saved = {};
    dlg.forEach(function (n) {
      saved[n] = window[n];
      window[n] = function (msg) { S.dialogs.push(n + '(' + String(msg).slice(0, 60) + ')'); return n === 'confirm' ? false : null; };
    });
    const oOpen = window.open;
    window.open = function (u) { S.opens++; S.dialogs.push('window.open(' + String(u).slice(0, 60) + ')'); return null; };
    S.restore.push(function () { dlg.forEach(function (n) { window[n] = saved[n]; }); window.open = oOpen; });

    /* ---- synthetic events have no real pointer/user activation: neutralise the APIs that would throw because of that ---- */
    ['setPointerCapture', 'releasePointerCapture'].forEach(function (name) {
      const orig = Element.prototype[name];
      if (typeof orig !== 'function') return;
      Element.prototype[name] = function () { try { return orig.apply(this, arguments); } catch (e) { if (e && e.name === 'NotFoundError') return undefined; throw e; } };
      S.restore.push(function () { Element.prototype[name] = orig; });
    });
    const oFull = Element.prototype.requestFullscreen;
    if (typeof oFull === 'function') {
      Element.prototype.requestFullscreen = function () { return Promise.resolve(); };
      S.restore.push(function () { Element.prototype.requestFullscreen = oFull; });
    }

    /* ---- navigation / submit guard ---- */
    const guardClick = function (ev) {
      const t = ev.target;
      const a = t && t.closest ? t.closest('a[href]') : null;
      if (a) {
        const href = a.getAttribute('href') || '';
        if (href.charAt(0) !== '#') { ev.preventDefault(); if (S.navAttempts.length < 8) S.navAttempts.push(href.slice(0, 80)); }
      }
    };
    NAT.add(document, 'click', guardClick, true);
    S.restore.push(function () { NAT.remove(document, 'click', guardClick, true); });
    /* a <form> that is submitted without preventDefault() reloads the page in real play. The guard listener is added to the form itself while the
     * submit event is still travelling down to it, so it runs AFTER the module's own handlers and can see whether they called preventDefault(). */
    const guarded = new WeakSet();
    const guardSubmitCapture = function (ev) {
      const f = ev.target;
      if (f && f.nodeType === 1 && !guarded.has(f)) {
        guarded.add(f);
        NAT.add(f, 'submit', function (e2) {
          if (!e2.defaultPrevented && f.method !== 'dialog' && S.rawSubmits.length < 5) S.rawSubmits.push('<form' + (f.id ? '#' + f.id : '') + (typeof f.className === 'string' && f.className ? '.' + f.className.split(/\s+/)[0] : '') + '>');
          e2.preventDefault();
        }, false);
      }
    };
    const guardSubmitBubble = function (ev) { ev.preventDefault(); };
    NAT.add(window, 'submit', guardSubmitCapture, true);
    NAT.add(window, 'submit', guardSubmitBubble, false);
    S.restore.push(function () { NAT.remove(window, 'submit', guardSubmitCapture, true); NAT.remove(window, 'submit', guardSubmitBubble, false); });
    /* location.href = ..., location.reload() etc.: the Navigation API lets us cancel and report them */
    try {
      const nav = window.navigation;
      if (nav && typeof nav.addEventListener === 'function') {
        const onNav = function (e) {
          try {
            if (e.destination && e.destination.sameDocument) return;      // #hash links, history.pushState
            if (e.cancelable) e.preventDefault();
            if (S.navAttempts.length < 8) S.navAttempts.push('location -> ' + String(e.destination && e.destination.url).replace(/^.*[\\/]pointless-arcade[\\/]/, '').slice(0, 80));
          } catch (e2) { /* ignore */ }
        };
        NAT.add(nav, 'navigate', onNav);
        S.restore.push(function () { NAT.remove(nav, 'navigate', onNav); });
      }
    } catch (e) { /* no Navigation API */ }

    /* ---- raw timer / listener wrappers: only module code ever reaches these ---- */
    const oSI = window.setInterval, oCI = window.clearInterval, oST = window.setTimeout, oCT = window.clearTimeout;
    const oRAF = window.requestAnimationFrame, oCRAF = window.cancelAnimationFrame;
    const oAdd = EventTarget.prototype.addEventListener, oRem = EventTarget.prototype.removeEventListener;
    const oStackLimit = Error.stackTraceLimit;
    Error.stackTraceLimit = 40;
    const stackHasGames = function () { let s = ''; try { s = new Error().stack || ''; } catch (e) { /* ignore */ } return /[\\/]games[\\/]/.test(s); };
    const attributed = function () { return S.curInst > 0 && stackHasGames(); };
    window.setInterval = function (fn) {
      const args = Array.prototype.slice.call(arguments);
      let rec = null;
      if (attributed()) {
        rec = { kind: 'interval', owner: S.curInst, cleared: false, runs: 0, runsAfter: 0, ms: args[1] };
        if (typeof fn === 'function') args[0] = function () { rec.runs++; if (S.dead.has(rec.owner)) rec.runsAfter++; return fn.apply(this, arguments); };
      }
      const h = oSI.apply(window, args);
      if (rec) { S.raw.intervals.push(rec); S.rawHandles.set('i' + h, rec); }
      return h;
    };
    window.clearInterval = function (h) { const r = S.rawHandles.get('i' + h); if (r) r.cleared = true; return oCI.call(window, h); };
    window.setTimeout = function (fn) {
      const args = Array.prototype.slice.call(arguments);
      let rec = null;
      if (attributed()) {
        rec = { kind: 'timeout', owner: S.curInst, cleared: false, fired: false, firedAfter: false, ms: args[1] };
        if (typeof fn === 'function') args[0] = function () { rec.fired = true; if (S.dead.has(rec.owner)) rec.firedAfter = true; return fn.apply(this, arguments); };
      }
      const h = oST.apply(window, args);
      if (rec) { S.raw.timeouts.push(rec); S.rawHandles.set('t' + h, rec); }
      return h;
    };
    window.clearTimeout = function (h) { const r = S.rawHandles.get('t' + h); if (r) r.cleared = true; return oCT.call(window, h); };
    if (oRAF) {
      window.requestAnimationFrame = function (cb) {
        if (attributed()) {
          const rec = { kind: 'raf', owner: S.curInst, fired: false, firedAfter: false };
          S.raw.rafs.push(rec);
          const h = oRAF.call(window, typeof cb === 'function' ? function (t) { rec.fired = true; if (S.dead.has(rec.owner)) rec.firedAfter = true; return cb(t); } : cb);
          return h;
        }
        return oRAF.call(window, cb);
      };
      window.cancelAnimationFrame = function (h) { return oCRAF.call(window, h); };
    }
    /* targets that outlive the module: window/document/body, media-query lists, the visual viewport, screen, and any page element OUTSIDE the module root */
    const longLived = function (t) {
      if (t === window || t === document || t === document.documentElement || t === document.body) return true;
      try {
        if (typeof MediaQueryList === 'function' && t instanceof MediaQueryList) return true;
        if (window.visualViewport && t === window.visualViewport) return true;
        if (typeof Screen === 'function' && t instanceof Screen) return true;
        if (window.screen && window.screen.orientation && t === window.screen.orientation) return true;
        if (t && t.nodeType === 1 && t.isConnected) {
          const c = P.host && P.host.current;
          if (c && c.root && !c.root.contains(t) && !(t.closest && t.closest('#pm-fx'))) return true;
        }
      } catch (e) { /* ignore */ }
      return false;
    };
    const markRemoved = function (target, type, fn, cap) {
      const L = S.raw.listeners;
      for (let i = L.length - 1; i >= 0; i--) { const r = L[i]; if (!r.removed && r.target === target && r.type === type && r.fn === fn && r.cap === cap) { r.removed = true; break; } }
    };
    EventTarget.prototype.addEventListener = function (type, fn, o) {
      try {
        if (fn && S.curInst > 0 && longLived(this) && stackHasGames()) {
          const cap = o === true || !!(o && typeof o === 'object' && o.capture);
          const rec = { target: this, type: type, fn: fn, cap: cap, removed: false, owner: S.curInst };
          S.raw.listeners.push(rec);
          if (o && typeof o === 'object' && o.once) {          /* { once: true } removes itself when it fires: a second once-listener notices that */
            try { oAdd.call(this, type, function () { rec.removed = true; }, { once: true, capture: cap }); } catch (e2) { /* ignore */ }
          }
        }
      } catch (e) { /* never break the page */ }
      return oAdd.apply(this, arguments);
    };
    EventTarget.prototype.removeEventListener = function (type, fn, o) {
      try { markRemoved(this, type, fn, o === true || !!(o && typeof o === 'object' && o.capture)); } catch (e) { /* ignore */ }
      return oRem.apply(this, arguments);
    };
    /* legacy matchMedia(...).addListener(fn) */
    if (typeof MediaQueryList === 'function' && MediaQueryList.prototype.addListener) {
      const oAL = MediaQueryList.prototype.addListener, oRL = MediaQueryList.prototype.removeListener;
      MediaQueryList.prototype.addListener = function (fn) {
        try { if (typeof fn === 'function' && S.curInst > 0 && stackHasGames()) S.raw.listeners.push({ target: this, type: 'change', fn: fn, cap: false, removed: false, owner: S.curInst }); } catch (e) { /* ignore */ }
        return oAL.apply(this, arguments);
      };
      MediaQueryList.prototype.removeListener = function (fn) { try { markRemoved(this, 'change', fn, false); } catch (e) { /* ignore */ } return oRL.apply(this, arguments); };
      S.restore.push(function () { MediaQueryList.prototype.addListener = oAL; MediaQueryList.prototype.removeListener = oRL; });
    }
    /* Resize/Intersection/MutationObservers watching page elements outside the module root keep firing after destroy unless disconnected */
    ['ResizeObserver', 'IntersectionObserver', 'MutationObserver'].forEach(function (name) {
      const O = window[name];
      if (typeof O !== 'function') return;
      const W = function (cb, opts) {
        const obs = new O(cb, opts);
        try {
          const recs = [];
          const oo = obs.observe, ou = obs.unobserve, od = obs.disconnect;
          obs.observe = function (t) {
            try {
              if (S.curInst > 0 && t && t.nodeType && t.isConnected && stackHasGames()) {
                const c = P.host && P.host.current;
                if (!(c && c.root && c.root.contains(t))) { const r = { kind: name, active: true, owner: S.curInst, target: t }; recs.push(r); S.raw.observers.push(r); }
              }
            } catch (e) { /* ignore */ }
            return oo.apply(this, arguments);
          };
          if (ou) obs.unobserve = function (t) { recs.forEach(function (r) { if (r.target === t) r.active = false; }); return ou.apply(this, arguments); };
          obs.disconnect = function () { recs.forEach(function (r) { r.active = false; }); return od.apply(this, arguments); };
        } catch (e) { /* ignore */ }
        return obs;
      };
      W.prototype = O.prototype;
      window[name] = W;
      S.restore.push(function () { window[name] = O; });
    });
    /* P.on(...) called by module code is never removed automatically (api.onEvent is the managed version) */
    const oOn = P.on;
    P.on = function () {
      const off = oOn.apply(P, arguments);
      try {
        if (S.curInst > 0 && stackHasGames()) {
          const rec = { name: arguments[0], off: false };
          S.raw.engineSubs.push(rec);
          return function () { rec.off = true; return off(); };
        }
      } catch (e) { /* ignore */ }
      return off;
    };
    /* document.title set by module code */
    try {
      const td = Object.getOwnPropertyDescriptor(Document.prototype, 'title');
      if (td && td.set) {
        Object.defineProperty(Document.prototype, 'title', {
          configurable: true, enumerable: td.enumerable, get: td.get,
          set: function (v) { try { if (this === document && S.curInst > 0 && stackHasGames() && S.pageTamper.length < 6) S.pageTamper.push('document.title was assigned by module code'); } catch (e) { /* ignore */ } return td.set.call(this, v); }
        });
        S.restore.push(function () { Object.defineProperty(Document.prototype, 'title', td); });
      }
    } catch (e) { /* ignore */ }
    S.restore.push(function () {
      window.setInterval = oSI; window.clearInterval = oCI; window.setTimeout = oST; window.clearTimeout = oCT;
      if (oRAF) { window.requestAnimationFrame = oRAF; window.cancelAnimationFrame = oCRAF; }
      EventTarget.prototype.addEventListener = oAdd; EventTarget.prototype.removeEventListener = oRem;
      P.on = oOn;
      Error.stackTraceLimit = oStackLimit;
    });

    /* ---- page tampering (module runs only: the Lobby changes body classes legitimately) ---- */
    const pageSnap = function () {
      const b = document.body, h = document.documentElement;
      return { bodyClass: b.getAttribute('class') || '', bodyStyle: b.getAttribute('style') || '', htmlClass: h.getAttribute('class') || '', htmlStyle: h.getAttribute('style') || '',
        head: new Set(Array.prototype.slice.call(document.head ? document.head.children : [])) };
    };
    const snap0 = kind === 'module' ? pageSnap() : null;
    S.pageCheck = function () {
      if (!snap0) return;
      const n = pageSnap();
      if (n.bodyClass !== snap0.bodyClass) S.pageTamper.push('<body> class changed: "' + snap0.bodyClass + '" -> "' + n.bodyClass + '"');
      if (n.bodyStyle !== snap0.bodyStyle) S.pageTamper.push('<body> style changed');
      if (n.htmlClass !== snap0.htmlClass) S.pageTamper.push('<html> class changed');
      if (n.htmlStyle !== snap0.htmlStyle) S.pageTamper.push('<html> style changed');
      if (document.head) {
        Array.prototype.forEach.call(document.head.children, function (c) {
          if (snap0.head.has(c) || c.hasAttribute('data-pm') || c.hasAttribute('data-pm-shop')) return;
          S.pageTamper.push('document.head gained <' + c.tagName.toLowerCase() + '> (use P.injectCSS)');
        });
      }
    };

    /* ---- instance lifecycle bookkeeping ---- */
    const offMounting = P.on('module:mounting', function (e) { S.instSeq++; S.curInst = S.instSeq; S.phase = 'mounting'; S.instOf = e.ctx; });
    const offMounted = P.on('module:mounted', function () { S.phase = 'running'; });
    const offDestroying = P.on('module:destroying', function () {
      const c = P.host.current;
      if (c) S.roots.push(c.root);
    });
    const offDestroyed = P.on('module:destroyed', function (e) {
      S.dead.add(S.curInst); S.curInst = 0; S.phase = 'destroyed';
      Object.keys(S.totals).forEach(function (k) { S.totals[k] += (e.counts && e.counts[k]) || 0; });
      if (e.ctx && e.ctx.warnings) e.ctx.warnings.forEach(warn);
      if (e.ctx && e.ctx.earlyExit) S.earlyExits++;
      if (e.ctx && e.ctx.leftInBody) e.ctx.leftInBody.forEach(function (l) { if (S.bodyLeaks.length < 5) S.bodyLeaks.push(l); });
    });
    S.restore.push(offMounting, offMounted, offDestroying, offDestroyed);
    S.liveTotals = function () {
      const t = Object.assign({}, S.totals);
      const c = P.host.current;
      if (c) Object.keys(t).forEach(function (k) { t[k] += (c.ctx.counts[k] || 0); });
      return t;
    };
    /* destroy the mounted module (errors thrown by its own destroy() belong to the run, not to "after destroy") */
    S.destroyNow = function () {
      S.phase = 'destroying';
      P.host.destroyCurrent();
      S.phase = 'destroyed';
    };

    /* ---- checks ---- */
    S.scanText = function (txt, where) {
      if (!txt) return;
      FORBID_RE.lastIndex = 0;
      let m, n = 0;
      while ((m = FORBID_RE.exec(txt)) && n < 6) {
        n++;
        const ctxText = txt.slice(Math.max(0, m.index - 30), m.index + m[0].length + 30).replace(/\s+/g, ' ');
        if (S.forbiddenKeys.has(ctxText) || S.forbidden.length >= 12) continue;
        S.forbiddenKeys.add(ctxText);
        S.forbidden.push({ word: m[0], context: ctxText, step: S.step, where: where || 'text' });
      }
    };
    S.textCheck = function (scope) {
      const grab = function (e) { try { return e.innerText || e.textContent || ''; } catch (x) { return ''; } };
      if (scope) {
        S.scanText(grab(scope), 'text');
        try {
          const els = scope.querySelectorAll('[aria-label],[title],[alt],[placeholder]');
          for (let i = 0; i < els.length && i < 200; i++) {
            ['aria-label', 'title', 'alt', 'placeholder'].forEach(function (a) {
              const v = els[i].getAttribute(a);
              if (v) S.scanText(v, 'attribute ' + a);
            });
          }
          const fields = scope.querySelectorAll('input, textarea, select');
          for (let i = 0; i < fields.length && i < 100; i++) {
            const f = fields[i], ty = (f.type || '').toLowerCase();
            if (ty === 'password' || ty === 'file' || ty === 'hidden') continue;
            S.scanText(String(f.value === undefined || f.value === null ? '' : f.value), 'field value');
          }
        } catch (e) { /* ignore */ }
      }
      /* output surfaces that live OUTSIDE the module root: Management's bubble, toasts, floating "+N Meh", the title bar, the tab title */
      try {
        ['#pm-narrator', '.pm-toast', '.pm-float', '#pm-title'].forEach(function (sel) {
          const list = document.querySelectorAll(sel);
          for (let i = 0; i < list.length && i < 12; i++) S.scanText(grab(list[i]), sel);
        });
        S.scanText(document.title, 'document.title');
      } catch (e) { /* ignore */ }
    };
    /* every string Management says, every toast and floating text: checked the moment it is emitted, so a line that is on screen for 2 seconds is still caught */
    const offSay = P.on('say', function (e) { S.scanText(String(e.text), 'say'); if (e.who && e.who !== 'Management') S.scanText(String(e.who), 'say (who)'); });
    /* lines that are queued but never get on screen (priority-0 chatter is coalesced and dropped) are checked at the moment they are said */
    const oNarrSay = P.narrator.say;
    P.narrator.say = function (text, opts) {
      try {
        if (text !== undefined && text !== null) S.scanText(String(text), 'say');
        if (opts && typeof opts.who === 'string') S.scanText(opts.who, 'say (who)');
      } catch (e) { /* ignore */ }
      return oNarrSay.apply(this, arguments);
    };
    S.restore.push(function () { P.narrator.say = oNarrSay; });
    const offToast = P.on('toast', function (e) {
      const o = (e && e.opts) || {};
      S.scanText([e && e.text == null ? '' : String(e && e.text), o.title ? String(o.title) : '', o.desc ? String(o.desc) : ''].join(' | '), 'toast');
    });
    const offFloat = P.on('float', function (e) { S.scanText(String(e && e.text), 'floating text'); });
    S.restore.push(offSay, offToast, offFloat);
    S.countNodes = function (scope) { try { return scope ? scope.getElementsByTagName('*').length : 0; } catch (e) { return 0; } };
    S.sampleNodes = function (scope) {
      const n = S.countNodes(scope);
      if (n > S.nodes.max) S.nodes.max = n;
      return n;
    };
    S.teardown = function () { S.restore.slice().reverse().forEach(function (f) { try { f(); } catch (e) { /* ignore */ } }); S.restore.length = 0; };
    return S;
  }

  function publish(res, extraTitle) {
    try {
      const old = document.getElementById('selftest-result'); if (old && old.parentNode) old.parentNode.removeChild(old);
      const pre = document.createElement('pre');
      pre.id = 'selftest-result';
      pre.setAttribute('data-json', encodeURIComponent(JSON.stringify(res)));
      pre.textContent = JSON.stringify(res, null, 1);
      (document.body || document.documentElement).appendChild(pre);
      document.title = res.pass ? 'SELFTEST:PASS' : 'SELFTEST:FAIL';
    } catch (e) {
      document.title = 'SELFTEST:FAIL';
    }
  }
  function publishPartial(obj) {
    try {
      let pre = document.getElementById('selftest-partial');
      if (!pre) { pre = document.createElement('pre'); pre.id = 'selftest-partial'; (document.body || document.documentElement).appendChild(pre); }
      pre.setAttribute('data-json', encodeURIComponent(JSON.stringify(obj)));
      pre.textContent = 'partial step ' + obj.step + ' phase ' + obj.phase;
    } catch (e) { /* ignore */ }
    /* also stream it to the console: the node tool reads stderr, so even a page that hangs and gets killed tells where it stopped */
    try { NAT.log('[POINTLESS-PARTIAL] ' + JSON.stringify(obj)); } catch (e) { /* ignore */ }
  }

  /* ---- shared finalisation of leak / dom checks ---- */
  function leakReport(S) {
    const out = { intervals: 0, intervalTicksAfterDestroy: 0, timeoutsFiredAfterDestroy: 0, timeoutsPending: 0, rawTimeouts: S.raw.timeouts.length,
      rawIntervals: S.raw.intervals.length, rawRafs: S.raw.rafs.length, rafsFiredAfterDestroy: 0, listeners: 0, outsideDom: [], rootsStillAttached: 0,
      engineSubs: 0, observers: 0, loadTime: [] };
    S.raw.intervals.forEach(function (r) { if (!r.cleared) out.intervals++; out.intervalTicksAfterDestroy += r.runsAfter; });
    S.raw.timeouts.forEach(function (r) { if (r.firedAfter) out.timeoutsFiredAfterDestroy++; else if (!r.fired && !r.cleared) out.timeoutsPending++; });
    S.raw.rafs.forEach(function (r) { if (r.firedAfter) out.rafsFiredAfterDestroy++; });
    S.raw.listeners.forEach(function (r) { if (!r.removed) out.listeners++; });
    S.raw.engineSubs.forEach(function (r) { if (!r.off) out.engineSubs++; });
    S.raw.observers.forEach(function (r) { if (r.active) out.observers++; });
    out.loadTime = loadTime.filter(function (s) { return S.kind !== 'module' || s.indexOf('games/' + S.id + '.js') === 0; });
    S.bodyLeaks.forEach(function (l) { out.outsideDom.push(l); });
    S.roots.forEach(function (r) { if (r.isConnected) out.rootsStillAttached++; });
    Array.prototype.forEach.call(document.body.children, function (c) {
      if (S.bodyBefore.has(c)) return;
      if ((c.id && c.id.indexOf('pm-') === 0) || (c.className && typeof c.className === 'string' && /(^|\s)pm-/.test(c.className))) return;
      if (c.id === 'selftest-result' || c.id === 'selftest-partial') return;
      out.outsideDom.push(c.tagName.toLowerCase() + (c.id ? '#' + c.id : '') + (typeof c.className === 'string' && c.className ? '.' + c.className.split(/\s+/)[0] : ''));
    });
    return out;
  }
  function addLeakFailures(S, leaks, reasons) {
    if (leaks.intervals) reasons.push('LEAK: ' + leaks.intervals + ' raw setInterval(s) created by the module were never cleared (' + leaks.intervalTicksAfterDestroy +
      ' tick(s) ran after destroy). Use api.setInterval, which is cleaned up automatically.');
    if (leaks.timeoutsFiredAfterDestroy) reasons.push('LEAK: ' + leaks.timeoutsFiredAfterDestroy + ' raw setTimeout callback(s) fired after the module was destroyed. Use api.setTimeout.');
    if (leaks.timeoutsPending) reasons.push('LEAK: ' + leaks.timeoutsPending + ' raw setTimeout(s) were still pending when the module was destroyed and never cleared (they would fire later, in a module that is gone, however long the delay). Use api.setTimeout.');
    if (leaks.rafsFiredAfterDestroy) reasons.push('LEAK: ' + leaks.rafsFiredAfterDestroy + ' raw requestAnimationFrame callback(s) fired after destroy. Use api.requestAnimationFrame.');
    if (leaks.listeners) reasons.push('LEAK: ' + leaks.listeners + ' listener(s) added to window/document/body/matchMedia/visualViewport or to page elements outside the module root were never removed on destroy. Use api.on (auto-removed).');
    if (leaks.engineSubs) reasons.push('LEAK: ' + leaks.engineSubs + ' P.on(...) subscription(s) made by module code were never removed on destroy. Use api.onEvent(name, fn) (auto-removed).');
    if (leaks.observers) reasons.push('LEAK: ' + leaks.observers + ' ResizeObserver/IntersectionObserver/MutationObserver(s) are still observing page elements outside the module root after destroy. Call disconnect() in destroy().');
    if (leaks.loadTime.length) reasons.push('LOAD-TIME TIMER/LISTENER: ' + leaks.loadTime.slice(0, 3).join('; ') + '. Create timers and listeners inside mount() with api.* (anything made while the file loads outlives every mount).');
    if (leaks.rootsStillAttached) reasons.push('LEAK: the module root element is still attached to the page after destroy.');
    if (leaks.outsideDom.length) reasons.push('LEAK: module left DOM outside its root after destroy: ' + leaks.outsideDom.slice(0, 5).join(', '));
    if (leaks.rawTimeouts || leaks.rawIntervals || leaks.rawRafs) {
      S.warn('module used raw timers (window.setTimeout x' + leaks.rawTimeouts + ', setInterval x' + leaks.rawIntervals + ', requestAnimationFrame x' + leaks.rawRafs + '); use api.setTimeout/setInterval/requestAnimationFrame');
    }

  }

  /* ============================== MODULE fuzz ============================== */
  async function runModule(id) {
    const steps = P.params.steps;
    const seed = P.params.seed;
    const rng = U.makeRng((seed * 1000003) ^ 0xF22);
    const S = makeSession('module', id);
    S.rng = rng;
    S.bodyBefore = new Set(Array.prototype.slice.call(document.body.children));
    const res = { id: id, mode: 'module', seed: seed, stepsRequested: steps };
    const reasons = [];
    const getScope = function () { const c = P.host.current; return c ? c.root : null; };
    const E = makeEngine(getScope, rng);
    P.host.exitHandler = function () {
      S.exits++;
      if (S.remounts < 60) S.pendingRemount = true;
    };
    S.step = 0;
    let performed = 0;
    try {
      /* load problems */
      P.diag.list.forEach(function (e) {
        if (e.kind === 'load' || e.kind === 'error' || e.kind === 'module-error') {
          const mine = e.module === id || (e.src && e.src.indexOf(id + '.js') >= 0) || (e.msg && e.msg.indexOf('games/' + id + '.js') >= 0);
          (mine ? S.loadErrors : S.otherLoadErrors).push('[' + e.kind + '] ' + e.msg + (e.src ? ' @ ' + e.src : ''));
        }
      });
      if (S.otherLoadErrors.length) S.warn('load problems in other files (not this module): ' + S.otherLoadErrors.slice(0, 3).join(' | '));
      if (!P.getModule(id)) {
        const other = P.modules.filter(function (m) { return m.file && m.file.indexOf('games/' + id + '.js') >= 0; }).map(function (m) { return m.id; });
        if (other.length) S.loadErrors.push('the file registered module id "' + other.join('", "') + '" but the filename says "' + id + '": the file name and the module id must match');
        reasons.push('MODULE NOT REGISTERED: games/' + id + '.js did not call P.registerModule with id "' + id + '".' +
          (S.loadErrors.length ? ' Load errors: ' + S.loadErrors.join(' | ') : ' No load errors were reported (file missing, wrong id, or registerModule rejected: see warnings).'));
        return finishModule(S, res, reasons, 0, E);
      }
      if (S.loadErrors.length) reasons.push('LOAD ERROR in games/' + id + '.js: ' + S.loadErrors.join(' | '));

      /* first mount */
      await sleep(30);
      S.phase = 'mounting';
      const mres = P.host.enter(id, { force: true, silent: true });
      if (!mres.ok) {
        reasons.push('CRASH: module failed to mount (' + (P.host.lastCrash ? P.host.lastCrash.message : mres.reason) + ')');
        return finishModule(S, res, reasons, 0, E);
      }
      await sleep(300);
      const root0 = getScope();
      if (!root0 || (!root0.children.length && !(root0.textContent || '').trim())) reasons.push('EMPTY: module root has no content 300ms after mount.');
      S.sampleNodes(root0);
      S.textCheck(root0);

      const baseStep = Math.max(5, Math.min(100, Math.floor(steps / 4)));
      const midStep = Math.floor(steps / 2);
      const idleStep = Math.floor(steps * 0.6);
      const spamSteps = { };
      spamSteps[Math.max(3, Math.floor(steps * 0.3))] = 1; spamSteps[Math.max(4, Math.floor(steps * 0.8))] = 1;
      const textEvery = Math.max(10, Math.floor(steps / 40));

      for (let i = 0; i < steps; i++) {
        S.step = i;
        await sleep(rng.randInt(6, 40));
        try {
          if (S.pendingRemount) {
            S.pendingRemount = false; S.remounts++;
            S.destroyNow(); await sleep(120);
            S.phase = 'mounting'; const r2 = P.host.enter(id, { force: true, silent: true });
            if (!r2.ok) { reasons.push('CRASH: module failed to mount on re-entry (' + (P.host.lastCrash ? P.host.lastCrash.message : r2.reason) + ')'); break; }
          }
          if (i === midStep) {
            S.remounts++;
            S.destroyNow(); await sleep(350);
            S.phase = 'mounting'; const r3 = P.host.enter(id, { force: true, silent: true });
            if (!r3.ok) { reasons.push('CRASH: module failed to mount after the mid-run destroy/remount (' + (P.host.lastCrash ? P.host.lastCrash.message : r3.reason) + ')'); break; }
          }
          if (i === idleStep && P.params.idle > 0) { E.restoreVisibility(); await sleep(P.params.idle); }
          if (spamSteps[i]) { const c = E.gather(); if (c.length) { E.burst(rng.pick(c)); } }
          else E.randomAction();
          if (E.counts.visibility && rng.rand() < 0.5) E.restoreVisibility();
          performed++;
          if (i % textEvery === 0) { S.textCheck(getScope()); }
          if (i === baseStep) { S.nodes.baselineStep = i; S.nodes.baseline = S.sampleNodes(getScope()); }
          else if (i % 20 === 0) S.sampleNodes(getScope());
          if (i % 50 === 0) publishPartial({ step: i, phase: S.phase, errors: S.errorCount, awards: S.liveTotals().award, says: S.liveTotals().say });
        } catch (e) {
          S.harnessErrors.push('step ' + i + ': ' + (e && e.stack ? trimStack(e.stack) : e));
        }
      }
      E.restoreVisibility(); E.restoreSize();
      await sleep(100);
      const scopeEnd = getScope();
      S.textCheck(scopeEnd);
      S.nodes.end = S.sampleNodes(scopeEnd);
      S.nodes.docEnd = document.getElementsByTagName('*').length;
      if (S.nodes.baseline < 0) S.nodes.baseline = S.nodes.end;
      res.rootNonEmptyAtEnd = !!(scopeEnd && (scopeEnd.children.length || (scopeEnd.textContent || '').trim()));
      res.mainCounts = S.liveTotals();

      /* remount storm: 20 rapid mount/destroy cycles */
      for (let i = 0; i < 20; i++) {
        S.destroyNow(); S.remounts++;
        await sleep(5);
        S.phase = 'mounting';
        const r4 = P.host.enter(id, { force: true, silent: true });
        if (!r4.ok) { reasons.push('CRASH: module failed to mount during the remount storm (cycle ' + i + ')'); break; }
        await sleep(rng.randInt(15, 50));
        for (let k = rng.randInt(1, 3); k > 0; k--) { try { E.randomAction({ noResize: true, noVisibility: true }); } catch (e) { /* ignore */ } }
      }
      S.destroyNow();
      await sleep(2000);      // anything still alive now is a leak
    } catch (e) {
      S.harnessErrors.push('harness crashed: ' + (e && e.stack ? trimStack(e.stack) : e));
    }
    return finishModule(S, res, reasons, performed, E);
  }

  function finishModule(S, res, reasons, performed, E) {
    try { P.host.exitHandler = null; } catch (e) { /* ignore */ }
    try { if (P.host.current) S.destroyNow(); } catch (e) { /* ignore */ }
    const leaks = leakReport(S);
    try { S.pageCheck(); } catch (e) { /* ignore */ }
    S.teardown();
    res.pageTamper = S.pageTamper;
    res.earlyExits = S.earlyExits;
    res.rawSubmits = S.rawSubmits;
    res.steps = performed;
    res.interactive = E.interactiveMax;
    res.actions = E.counts;
    const counts = res.mainCounts || S.liveTotals();
    res.counts = counts;
    res.totals = S.totals;
    res.leaks = leaks;
    res.nodes = S.nodes;
    res.remounts = S.remounts; res.exits = S.exits;
    res.errorCount = S.errorCount; res.errors = S.errors; res.errorsAfterDestroy = S.errorsAfterDestroy;
    res.consoleErrors = S.consoleErrors; res.consoleWarns = S.consoleWarns; res.consoleMsgs = S.consoleMsgs;
    res.forbidden = S.forbidden;
    try {   // which of the module's own trophies the run actually unlocked (a reachable-looking trophy that never fires is a bug nobody sees otherwise)
      const pre = P.params.target === 'lobby' ? '' : P.params.target + '.';
      const mine = P.achievementOrder.filter(function (aid) { return !pre || aid.indexOf(pre) === 0; });
      res.achievementsDeclared = mine.length;
      res.achievementsUnlocked = mine.filter(function (aid) { return P.state.ach.isUnlocked(aid); });
    } catch (e) { /* diagnostics only */ }
    res.dialogs = S.dialogs; res.navAttempts = S.navAttempts;
    res.crashes = S.crashes;
    res.loadErrors = S.loadErrors;
    res.harnessErrors = S.harnessErrors;
    res.virtualMs = Math.round(NAT.now() - S.t0);
    const registered = !!P.getModule(res.id);

    if (registered) {
      if (S.errorCount && !(S.crashes.length && S.errors.every(function (e) { return e.where === 'mount'; }))) {
        reasons.push('UNCAUGHT ERRORS: ' + S.errorCount + ' total, ' + Object.keys(S.errorMap).length + ' distinct (first: ' + (S.errors[0] ? S.errors[0].message + (S.errors[0].where ? ' @ ' + S.errors[0].where : '') : '?') + ')');
      }
      if (S.errorsAfterDestroy) {
        const first = S.errors.filter(function (e) { return e.phase === 'destroyed'; })[0];
        reasons.push('ERRORS AFTER DESTROY: ' + S.errorsAfterDestroy + ' error(s) fired while no module instance was mounted' + (first ? ' (first: ' + first.message + ')' : '') + '. A timer or listener outlived destroy().');
      }
      if (S.consoleErrors) reasons.push('CONSOLE.ERROR called ' + S.consoleErrors + ' time(s): ' + S.consoleMsgs.filter(function (m) { return m.indexOf('error:') === 0; }).slice(0, 2).join(' | '));
      if (S.forbidden.length) reasons.push('FORBIDDEN TEXT visible in the UI: ' + S.forbidden.slice(0, 4).map(function (f) { return '"' + f.word + '" in "' + f.context + '"'; }).join('; '));
      if (res.mainCounts) {
        if (!counts.award) reasons.push('NO AWARDS: api.award was never called during the run (the module is not engaging with the Meh economy).');
        if (!counts.say) reasons.push('SILENT: api.say / api.sayRandom was never called (Management never spoke).');
        if (!counts.stat) S.warn('api.stat.* was never called (rule 5: count key actions with api.stat.inc("<id>.<thing>"))');
        if (!counts.achieve && !counts.stat) S.warn('no achievements were unlocked during the run (that is fine, but check they are reachable)');
        if (res.rootNonEmptyAtEnd === false) reasons.push('EMPTY: module root was empty at the end of the run.');
        if (!E.interactiveMax) reasons.push('NO INTERACTIVE ELEMENTS: found no buttons/inputs/clickable elements in the module root (is it playable by keyboard and mouse?).');
        const n = S.nodes;
        if (n.end > 6000) reasons.push('DOM TOO BIG: ' + n.end + ' nodes in the module root (limit 6000).');
        else if (n.baseline > 0 && n.end > 200 && n.end > n.baseline * 5) reasons.push('DOM GROWTH: root grew from ' + n.baseline + ' nodes (step ' + n.baselineStep + ') to ' + n.end + ' (limit 5x). Cap your logs/lists.');
      }
      if (S.dialogs.length) reasons.push('FORBIDDEN CALL: ' + S.dialogs.slice(0, 3).join(', ') + ' (no alert/confirm/prompt/window.open).');
      if (S.navAttempts.length) reasons.push('NAVIGATION: the module has link(s) or code that would leave the page: ' + S.navAttempts.slice(0, 3).join(', '));
      if (S.rawSubmits.length) reasons.push('FORM SUBMIT: ' + S.rawSubmits.slice(0, 3).join(', ') + ' was submitted without event.preventDefault() (in a real browser the page would reload and the module would be lost).');
      if (S.earlyExits) reasons.push('EARLY EXIT: api.exit() was called during mount() or from a timer right after it (' + S.earlyExits + 'x): the player would be bounced straight back to the Lobby.');
      if (S.pageTamper.length) reasons.push('PAGE TAMPERING: ' + S.pageTamper.slice(0, 3).join('; ') + '. A module may only touch its own root.');
      if (S.crashes.length && !reasons.some(function (r) { return r.indexOf('CRASH:') === 0; })) reasons.push('CRASH SHIELD fired ' + S.crashes.length + 'x: ' + S.crashes[0].message);
      addLeakFailures(S, leaks, reasons);
      if (res.mainCounts && performed < res.stepsRequested && !reasons.some(function (r) { return r.indexOf('CRASH') === 0 || r.indexOf('EMPTY') === 0; })) {
        reasons.push('INCOMPLETE: only ' + performed + ' of ' + res.stepsRequested + ' steps were performed.');
      }
    }
    if (S.harnessErrors.length) reasons.push('HARNESS ERROR (tell the engine owner): ' + S.harnessErrors[0].split('\n')[0]);
    if (S.consoleWarns) S.warn('console.warn called ' + S.consoleWarns + ' time(s): ' + S.consoleMsgs.filter(function (m) { return m.indexOf('warn:') === 0; }).slice(0, 2).join(' | '));
    res.warnings = S.warnings;
    res.reasons = reasons;
    res.pass = reasons.length === 0;
    publish(res);
    return res;
  }

  /* ============================== LOBBY fuzz ============================== */
  async function runLobby() {
    const steps = P.params.steps;
    const seed = P.params.seed;
    const rng = U.makeRng((seed * 1000003) ^ 0xF22);
    const S = makeSession('lobby', 'lobby');
    S.bodyBefore = new Set(Array.prototype.slice.call(document.body.children));
    const res = { id: 'lobby', mode: 'lobby', seed: seed, stepsRequested: steps };
    const reasons = [];
    /* inside a module the fuzzer works on the module root (a whole-shell scope would let the always-visible Exit and Mute buttons soak up
     * most clicks); one step in ten uses the whole shell so those controls, the narrator and the title bar get exercised too */
    let shellPick = false;
    const shellEl = function () { return P.ui.shell || document.getElementById('pm-shell'); };
    const getScope = function () { const c = P.host.current; return (c && !c.crashed && !shellPick && c.root.isConnected) ? c.root : shellEl(); };
    const E = makeEngine(getScope, rng);
    const L = P.ui.lobby;
    let performed = 0;
    P.host.exitHandler = null;
    try {
      P.diag.list.forEach(function (e) {
        const line = '[' + e.kind + '] ' + e.msg + (e.src ? ' @ ' + e.src : '');
        if (e.kind === 'load') S.loadErrors.push(line);
        else if (e.kind === 'error' || e.kind === 'module-error') S.earlyErrors.push(line);
      });
      if (!L) { reasons.push('NO LOBBY: nothing called P.ui.setLobby(...).'); return finishLobby(S, res, reasons, 0, E, []); }
      const screens = Array.isArray(L.screens) ? L.screens.slice() : [];
      const pending = rng.shuffle(screens);
      res.screens = screens;
      P.state.addMeh(1e7, { reason: 'fuzz' });
      await sleep(200);
      S.phase = 'running'; S.curInst = 0;
      S.sampleNodes(getScope());
      const baseStep = Math.max(5, Math.min(100, Math.floor(steps / 4)));
      const textEvery = Math.max(10, Math.floor(steps / 40));
      const mods = P.modules.map(function (m) { return m.id; });
      const toVisit = rng.shuffle(mods);      // every module is visited once before any is visited twice
      let stepsInModule = 0, moduleLimit = 14;
      const enter = function (mid) {
        P.state.unlockModule(mid);
        const er = P.host.enter(mid, {});
        if (er.ok || er.reason === 'crash') S.modulesEntered[mid] = 1;
        if (er.ok) { stepsInModule = 0; moduleLimit = rng.randInt(10, 28); }
        return er;
      };

      for (let i = 0; i < steps; i++) {
        S.step = i;
        await sleep(rng.randInt(6, 40));
        try {
          const inMod = !!P.host.current;
          if (inMod) {
            stepsInModule++;
            if (stepsInModule > moduleLimit) { P.host.exit({ by: 'fuzz', force: true }); S.exits++; stepsInModule = 0; S.curInst = 0; }
            else { shellPick = rng.rand() < 0.1; try { E.randomAction({ noResize: false }); } finally { shellPick = false; } }
          } else {
            const r = rng.rand();
            if (pending.length && r < 0.4) {
              const sid = pending.shift();
              let ok = false;
              try { ok = L.openScreen(sid); } catch (e) { S.lobbyErrors.push('openScreen("' + sid + '") threw: ' + (e && e.message ? e.message : e)); }
              if (ok === false) S.screens.failed[sid] = 1; else S.screens.opened[sid] = 1;
              await sleep(40);
            } else if (screens.length && r < 0.5) {
              const sid = rng.pick(screens);
              try { if (L.openScreen(sid) !== false) S.screens.opened[sid] = 1; } catch (e) { S.lobbyErrors.push('openScreen("' + sid + '") threw: ' + (e && e.message ? e.message : e)); }
            } else if (mods.length && r < 0.64 && i > 3) {
              enter(toVisit.length ? toVisit.shift() : rng.pick(mods));
            } else E.randomAction();
          }
          if (E.counts.visibility && rng.rand() < 0.5) E.restoreVisibility();
          performed++;
          if (i % textEvery === 0) S.textCheck(shellEl());
          if (i === baseStep) { S.nodes.baselineStep = i; S.nodes.baseline = S.sampleNodes(shellEl()); }
          else if (i % 20 === 0) { S.nodes.docEnd = document.getElementsByTagName('*').length; S.sampleNodes(shellEl()); }
          if (i % 50 === 0) publishPartial({ step: i, phase: S.phase, errors: S.errorCount, entered: Object.keys(S.modulesEntered).length });
        } catch (e) {
          S.harnessErrors.push('step ' + i + ': ' + (e && e.stack ? trimStack(e.stack) : e));
        }
      }
      /* sweep: random entry only covers a slice of a big arcade, so every module that is still unvisited is entered once and poked */
      E.restoreVisibility(); E.restoreSize();
      try { if (L.closeScreen) L.closeScreen(); } catch (e) { /* ignore */ }
      const unvisited = mods.filter(function (m) { return !S.modulesEntered[m]; });
      res.sweep = unvisited.length;
      for (let u = 0; u < unvisited.length; u++) {
        try {
          if (P.host.current) { P.host.exit({ by: 'fuzz', force: true }); S.exits++; }
          S.step = steps + u; S.curInst = 0;
          await sleep(12);
          const er = enter(unvisited[u]);
          if (er.ok) {
            for (let k = 0; k < 6; k++) {
              await sleep(rng.randInt(8, 30));
              if (k === 2) { const c = E.gather(); if (c.length) E.burst(rng.pick(c)); else E.randomAction({ noResize: true, noVisibility: true }); }
              else E.randomAction({ noResize: true, noVisibility: true });
            }
            S.textCheck(getScope());
          }
          if (u % 25 === 0) publishPartial({ step: steps + u, phase: 'sweep', errors: S.errorCount, entered: Object.keys(S.modulesEntered).length });
        } catch (e) {
          S.harnessErrors.push('sweep ' + unvisited[u] + ': ' + (e && e.stack ? trimStack(e.stack) : e));
        }
      }
      /* make sure every screen got opened at least once, then tidy up */
      for (const sid of pending.concat(screens.filter(function (s) { return !S.screens.opened[s] && !S.screens.failed[s]; }))) {
        let ok = false;
        try { ok = L.openScreen(sid); } catch (e) { S.lobbyErrors.push('openScreen("' + sid + '") threw: ' + (e && e.message ? e.message : e)); }
        if (ok === false) S.screens.failed[sid] = 1; else S.screens.opened[sid] = 1;
        await sleep(30);
      }
      if (P.host.current) { P.host.exit({ by: 'fuzz', force: true }); }
      try { if (L.closeScreen) L.closeScreen(); } catch (e) { /* ignore */ }
      await sleep(300);
      S.textCheck(shellEl());
      S.nodes.end = S.sampleNodes(shellEl());
      S.nodes.docEnd = document.getElementsByTagName('*').length;
      if (S.nodes.baseline < 0) S.nodes.baseline = S.nodes.end;
      await sleep(2000);
    } catch (e) {
      S.harnessErrors.push('harness crashed: ' + (e && e.stack ? trimStack(e.stack) : e));
    }
    return finishLobby(S, res, reasons, performed, E, []);
  }

  function finishLobby(S, res, reasons, performed, E) {
    try { if (P.host.current) S.destroyNow(); } catch (e) { /* ignore */ }
    const leaks = leakReport(S);
    S.teardown();
    res.steps = performed; res.interactive = E.interactiveMax; res.actions = E.counts;
    res.leaks = leaks; res.nodes = S.nodes; res.totals = S.totals;
    res.errorCount = S.errorCount; res.errors = S.errors;
    res.consoleErrors = S.consoleErrors; res.consoleWarns = S.consoleWarns; res.consoleMsgs = S.consoleMsgs;
    res.forbidden = S.forbidden; res.dialogs = S.dialogs; res.navAttempts = S.navAttempts; res.crashes = S.crashes;
    res.loadErrors = S.loadErrors; res.earlyErrors = S.earlyErrors; res.lobbyErrors = S.lobbyErrors; res.harnessErrors = S.harnessErrors;
    res.screensOpened = Object.keys(S.screens.opened); res.screensFailed = Object.keys(S.screens.failed);
    res.modulesEntered = Object.keys(S.modulesEntered);
    res.modulesTotal = P.modules.length;
    res.earlyExits = S.earlyExits; res.rawSubmits = S.rawSubmits; res.exits = S.exits;
    res.virtualMs = Math.round(NAT.now() - S.t0);
    if (S.loadErrors.length) reasons.push('LOAD ERRORS: ' + S.loadErrors.slice(0, 4).join(' | '));
    if (S.earlyErrors.length) reasons.push('ERRORS BEFORE THE RUN (a file threw while loading, or the Lobby threw while mounting): ' + S.earlyErrors.slice(0, 3).join(' | '));
    if (S.lobbyErrors.length) reasons.push('LOBBY ERROR: ' + S.lobbyErrors.slice(0, 3).join(' | '));
    if (S.errorCount) reasons.push('UNCAUGHT ERRORS: ' + S.errorCount + ' (first: ' + (S.errors[0] ? S.errors[0].message + (S.errors[0].where ? ' @ ' + S.errors[0].where : '') : '?') + ')');
    if (S.consoleErrors) reasons.push('CONSOLE.ERROR called ' + S.consoleErrors + ' time(s): ' + S.consoleMsgs.slice(0, 2).join(' | '));
    if (S.forbidden.length) reasons.push('FORBIDDEN TEXT visible: ' + S.forbidden.slice(0, 4).map(function (f) { return '"' + f.word + '" in "' + f.context + '" (' + f.where + ')'; }).join('; '));
    if (S.crashes.length) reasons.push('A MODULE CRASHED (' + S.crashes.map(function (c) { return c.id; }).join(', ') + '): the Lobby survived, but fix the module: ' + S.crashes[0].message);
    if (S.dialogs.length) reasons.push('FORBIDDEN CALL: ' + S.dialogs.slice(0, 3).join(', '));
    if (S.navAttempts.length) reasons.push('NAVIGATION: link(s) or code that would leave the page: ' + S.navAttempts.slice(0, 3).join(', '));
    if (S.rawSubmits.length) reasons.push('FORM SUBMIT: ' + S.rawSubmits.slice(0, 3).join(', ') + ' was submitted without event.preventDefault() (the page would reload).');
    if (S.earlyExits) reasons.push('EARLY EXIT: a module called api.exit() during mount() or from a timer right after it (' + S.earlyExits + 'x).');
    if (res.screensFailed.length) reasons.push('SCREENS DID NOT OPEN: ' + res.screensFailed.join(', '));
    if (res.modulesEntered.length < res.modulesTotal && P.ui.lobby) reasons.push('MODULES NOT ENTERED: ' + res.modulesEntered.length + ' of ' + res.modulesTotal + ' modules were entered (a module that cannot be entered cannot be tested).');
    if (!E.interactiveMax && P.ui.lobby) reasons.push('NO INTERACTIVE ELEMENTS found in the Lobby.');
    const n = S.nodes;
    if (n.docEnd > 14000) reasons.push('DOM TOO BIG: ' + n.docEnd + ' nodes in the page (limit 14000).');
    else if (n.baseline > 0 && n.end > 400 && n.end > n.baseline * 5) reasons.push('DOM GROWTH: Lobby grew from ' + n.baseline + ' to ' + n.end + ' nodes (limit 5x).');
    addLeakFailures(S, leaks, reasons);
    if (performed < res.stepsRequested && P.ui.lobby) reasons.push('INCOMPLETE: only ' + performed + ' of ' + res.stepsRequested + ' steps were performed.');
    if (S.harnessErrors.length) reasons.push('HARNESS ERROR (tell the engine owner): ' + S.harnessErrors[0].split('\n')[0]);
    res.warnings = S.warnings;
    res.reasons = reasons;
    res.pass = reasons.length === 0;
    publish(res);
    return res;
  }

  /* ============================== public ============================== */
  P.fuzz = {
    start: function () {
      const target = P.params.target;
      const p = target === 'lobby' ? runLobby() : runModule(target);
      return p.catch(function (e) {
        publish({ id: target, pass: false, reasons: ['HARNESS CRASHED: ' + (e && e.stack ? trimStack(e.stack) : e)], warnings: [], errors: [] });
      });
    },
    /** screenshots: N random actions, no checks, no long idle, size/visibility untouched */
    runActions: async function (n) {
      const rng = U.makeRng((P.params.seed * 1000003) ^ 0xA11);
      const E = makeEngine(function () {
        const c = P.host.current;
        return c ? c.root : (P.ui.shell || document.getElementById('pm-shell'));
      }, rng);
      for (let i = 0; i < n; i++) {
        await sleep(rng.randInt(8, 35));
        try { E.randomAction({ noResize: true, noVisibility: true }); } catch (e) { /* ignore */ }
      }
      if (P.params.shot) { try { window.scrollTo(0, 0); } catch (e) { /* ignore */ } }   // a fuzzed wheel/scroll must not leave the screenshot looking at the middle of the page
      return E.counts;
    }
  };
})();
