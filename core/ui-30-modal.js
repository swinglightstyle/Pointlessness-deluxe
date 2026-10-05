/* POINTLESS ui 30: screen/modal system.
 * LB.registerScreen(id, { title, icon, wide, render(body, ctx) -> optional dispose fn, onClose(reason) }).
 * One screen open at a time inside #pm-lobby (so the fuzz harness and the text check cover it). Focus is moved into the
 * dialog and restored on close, Tab is trapped, Escape and a click on the backdrop close it, the page behind is locked. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;
  const NAT = P.native;
  const h = LB.h;
  let modalRoot = null;
  let cur = null;
  let foldedNarrator = false;       // true while WE collapsed Management for an open dialog (landscape phones)

  LB.registerScreen = function (id, def) {
    if (!LB.screens[id]) LB.screenOrder.push(id);
    LB.screens[id] = def;
  };
  LB.setModalRoot = function (el) { modalRoot = el; };

  const FOCUSABLE = 'button:not([disabled]), [href], input:not([disabled]):not([type="hidden"]), select:not([disabled]), textarea:not([disabled]), summary, [tabindex]:not([tabindex="-1"])';
  function focusables(root) {
    return Array.prototype.filter.call(root.querySelectorAll(FOCUSABLE), function (e) {
      return !e.hidden && !(e.closest && e.closest('[hidden]')) && (e.offsetWidth > 0 || e.offsetHeight > 0 || e.getClientRects().length > 0);
    });
  }

  function dispose(c, reason) {
    c.disposed = true;
    c.cleanups.splice(0).forEach(function (fn) { try { fn(reason); } catch (e) { P.reportError(e, { where: 'lobby.screen.dispose' }); } });
    c.timers.splice(0).forEach(function (t) { NAT.clearTimeout(t); NAT.clearInterval(t); });
  }

  function closeInternal(reason, keepFocus) {
    const c = cur;
    if (!c) return false;
    cur = null;
    const def = c.def;
    dispose(c, reason);
    try { if (def.onClose) def.onClose(reason); } catch (e) { P.reportError(e, { where: 'lobby.screen.onClose' }); }
    if (c.overlay.parentNode) c.overlay.parentNode.removeChild(c.overlay);
    document.body.classList.remove('lb-modal-open');
    if (!keepFocus && c.prevFocus && c.prevFocus.isConnected && c.prevFocus.focus) { try { c.prevFocus.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
    if (!cur && foldedNarrator) {          // Management folded away for the dialog (short screens): unfold, without saving it as a preference
      foldedNarrator = false;
      try { const nar = LB.parts.narrator; if (nar && nar.isCollapsed()) nar.setCollapsed(false, true); } catch (e) { /* ignore */ }
    }
    P.emit('lobby:screen', { id: null, closed: c.id });
    return true;
  }

  LB.closeScreen = function (reason) { return closeInternal(reason || 'close', false); };
  LB.currentScreen = function () { return cur ? cur.id : null; };
  LB.screenCtx = function () { return cur ? cur.ctx : null; };

  LB.openScreen = function (id, opts) {
    const def = LB.screens[id];
    if (!def || !modalRoot) return false;
    opts = opts || {};
    let prevFocus = null;
    if (cur) { prevFocus = cur.prevFocus; closeInternal('replace', true); }
    else { try { prevFocus = document.activeElement; } catch (e) { prevFocus = null; } }

    const titleText = typeof def.title === 'function' ? def.title() : def.title;
    const titleEl = h('h2', { class: 'lb-dlg-title', id: 'lb-dlg-title' }, titleText);
    const closeBtn = h('button', { type: 'button', class: 'lb-btn lb-btn-small lb-dlg-close', 'aria-label': 'Close ' + titleText }, h('span', { 'aria-hidden': 'true' }, '✕ '), 'Close');
    const body = h('div', { class: 'lb-dlg-body' });
    const dlg = h('div', { class: 'lb-dlg lb-dlg-' + id + (def.wide ? ' lb-dlg-wide' : ''), role: 'dialog', 'aria-modal': 'true', 'aria-labelledby': 'lb-dlg-title', tabindex: '-1' },
      h('header', { class: 'lb-dlg-head' }, h('span', { class: 'lb-dlg-ico', 'aria-hidden': 'true' }, def.icon || '📁'), titleEl, closeBtn),
      body);
    const overlay = h('div', { class: 'lb-overlay' }, dlg);
    const c = { id: id, def: def, overlay: overlay, dlg: dlg, body: body, prevFocus: prevFocus, cleanups: [], timers: [], disposed: false, ctx: null };

    const ctx = {
      id: id, body: body, dlg: dlg,
      close: function (reason) { if (cur === c) closeInternal(reason || 'close', false); },
      isOpen: function () { return cur === c && !c.disposed; },
      setTitle: function (t) { titleEl.textContent = t; closeBtn.setAttribute('aria-label', 'Close ' + t); },
      onDispose: function (fn) { c.cleanups.push(fn); },
      on: function (name, fn) { const off = P.on(name, function (d, n) { if (cur === c && !c.disposed) fn(d, n); }); c.cleanups.push(off); return off; },
      listen: function (target, type, fn, o) { NAT.add(target, type, fn, o); c.cleanups.push(function () { NAT.remove(target, type, fn, o); }); },
      later: function (fn, ms) { const t = NAT.setTimeout(function () { if (cur === c && !c.disposed) fn(); }, ms); c.timers.push(t); return t; },
      every: function (fn, ms) { const t = NAT.setInterval(function () { if (cur === c && !c.disposed) fn(); }, ms); c.timers.push(t); return t; },
      args: opts
    };
    c.ctx = ctx;
    cur = c;

    NAT.add(closeBtn, 'click', function () { ctx.close('button'); });
    NAT.add(overlay, 'mousedown', function (e) { if (e.target === overlay && def.backdropClose !== false) ctx.close('backdrop'); });
    NAT.add(dlg, 'keydown', function (e) {
      if (e.key !== 'Tab') return;
      const f = focusables(dlg);
      if (!f.length) { e.preventDefault(); dlg.focus(); return; }
      const first = f[0], last = f[f.length - 1], active = document.activeElement;
      if (e.shiftKey && (active === first || active === dlg)) { e.preventDefault(); last.focus(); }
      else if (!e.shiftKey && active === last) { e.preventDefault(); first.focus(); }
    });

    modalRoot.appendChild(overlay);
    document.body.classList.add('lb-modal-open');
    /* on a short window (landscape phone) the expanded narrator would leave the dialog a sliver: fold it away while the dialog is open */
    try {
      const nar = LB.parts.narrator;
      if (nar && !foldedNarrator && (window.innerHeight || 800) < 640 && !nar.isCollapsed()) { nar.setCollapsed(true, true); foldedNarrator = true; }
    } catch (e) { /* ignore */ }
    try {
      const disp = def.render(body, ctx);
      if (typeof disp === 'function') c.cleanups.push(disp);
    } catch (e) {
      P.reportError(e, { where: 'lobby.screen.' + id });
      LB.clear(body);
      body.appendChild(h('p', { class: 'lb-empty' }, 'This screen has gone out to lunch. Details are in More > Diagnostics.'));
    }
    if (cur === c) {
      try { dlg.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
      try { body.scrollTop = 0; } catch (e) { /* ignore */ }
      LB.stat('lobby.screensOpened');
      P.emit('lobby:screen', { id: id });
      if (!opts.quiet && def.greet !== false) {
        const lines = LB.text.screenOpen[id];
        if (lines && lines.length && LB.rand() < 0.55) LB.say(LB.bag('screen-' + id, lines), { priority: 0, mood: 'neutral' });
      }
    }
    return true;
  };

  /* shared little builders used by several screens */
  LB.sectionTitle = function (text, sub) {
    return h('div', { class: 'lb-sect' }, h('h3', { class: 'lb-sect-title' }, text), sub ? h('p', { class: 'lb-sect-sub' }, sub) : null);
  };
  LB.emptyState = function (emoji, text, sub) {
    return h('div', { class: 'lb-empty' }, h('div', { class: 'lb-empty-ico', 'aria-hidden': 'true' }, emoji || '🗂️'), h('p', { class: 'lb-empty-text' }, text), sub ? h('p', { class: 'lb-empty-sub' }, sub) : null);
  };
  LB.chipGroup = function (label, options, value, onPick) {
    const wrap = h('div', { class: 'lb-chips', role: 'group', 'aria-label': label });
    const btns = {};
    options.forEach(function (o) {
      const b = h('button', { type: 'button', class: 'lb-chip', 'aria-pressed': 'false' }, o.label);
      NAT.add(b, 'click', function () { set(o.value); onPick(o.value); });
      btns[o.value] = b; wrap.appendChild(b);
    });
    function set(v) { Object.keys(btns).forEach(function (k) { const on = k === String(v); btns[k].setAttribute('aria-pressed', on ? 'true' : 'false'); btns[k].classList.toggle('lb-on', on); }); }
    set(value);
    return { el: wrap, set: set, buttons: btns };
  };
})();
