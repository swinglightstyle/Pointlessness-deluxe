/* POINTLESS ui 20: Management, the narrator panel (bottom-left, collapsible).
 * Replaces the engine's plain default panel via P.narrator.setRenderer: SVG face with six moods, speech bubble with
 * a typewriter, a little "log" of the last lines, aria-live copy for screen readers. Never blocks interaction. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;
  const NAT = P.native;
  const h = LB.h, S = LB.svg;
  const INK = '#2b2438';
  const SPEAKERS = [
    [/gerald|potato|spud/i, '🥔'], [/toaster/i, '🍞'], [/sandra|compliance/i, '🗂️'], [/dennis|plant|ficus/i, '🌿'],
    [/stapler/i, '📎'], [/tuesday/i, '📅'], [/sock/i, '🧦'], [/suggestion/i, '📮'], [/clock/i, '🕰️'], [/printer/i, '🖨️']
  ];
  function speakerEmoji(who) {
    if (!who || /^management$/i.test(who)) return '';
    for (let i = 0; i < SPEAKERS.length; i++) if (SPEAKERS[i][0].test(who)) return SPEAKERS[i][1];
    return '💬';
  }

  function buildFace() {
    const g = function (mood) { return S.apply(null, ['g', { 'data-for': mood }].concat(Array.prototype.slice.call(arguments, 1))); };
    const stroke = function (d, w, extra) { return S('path', Object.assign({ d: d, fill: 'none', stroke: INK, 'stroke-width': w || 3, 'stroke-linecap': 'round', 'stroke-linejoin': 'round' }, extra || {})); };
    const dot = function (x, y, r) { return S('circle', { cx: x, cy: y, r: r, fill: INK }); };
    return S('svg', { class: 'lb-face', viewBox: '0 0 64 64', 'aria-hidden': 'true', focusable: 'false', 'data-mood': 'neutral' },
      S('path', { d: 'M6 64c0-13 11-19 26-19s26 6 26 19z', fill: INK }),
      S('rect', { x: 27, y: 41, width: 10, height: 8, rx: 2, fill: '#f2b95a', stroke: INK, 'stroke-width': 2 }),
      S('path', { d: 'M24.5 46l7.5 8 7.5-8z', fill: '#fffaf0', stroke: INK, 'stroke-width': 1.5, 'stroke-linejoin': 'round' }),
      S('path', { d: 'M30 50h4l2.5 13h-9z', fill: '#ff8d7a', stroke: INK, 'stroke-width': 1.5, 'stroke-linejoin': 'round' }),
      S('circle', { cx: 32, cy: 28, r: 19, fill: '#ffd166', stroke: INK, 'stroke-width': 3 }),
      S('path', { d: 'M13.5 25c1-11 9-16 19-16s17.5 5 18.5 16c-7-1-12-5-14-9-4 5-12 8-23.5 9z', fill: INK }),
      /* neutral */
      g('neutral', dot(24.5, 29.5, 2.7), dot(39.5, 29.5, 2.7), stroke('M26 38.5h12', 3)),
      /* proud */
      g('proud', stroke('M21.5 30.5q3-4.5 6 0', 2.8), stroke('M36.5 30.5q3-4.5 6 0', 2.8),
        S('circle', { cx: 19.5, cy: 35, r: 3.2, fill: '#ff8d7a', opacity: '.6' }), S('circle', { cx: 44.5, cy: 35, r: 3.2, fill: '#ff8d7a', opacity: '.6' }),
        S('path', { d: 'M24 35.5q8 10 16 0z', fill: '#fffaf0', stroke: INK, 'stroke-width': 2.6, 'stroke-linejoin': 'round' })),
      /* disappointed */
      g('disappointed', dot(24.5, 31, 2.5), dot(39.5, 31, 2.5), stroke('M19.5 25l8.5 3.5', 2.6), stroke('M44.5 25L36 28.5', 2.6), stroke('M25 41.5q7-6 14 0', 3)),
      /* confused */
      g('confused', dot(24.5, 30, 2.6), dot(39.5, 29, 3.1), stroke('M20 25.5h8', 2.6), stroke('M35 22.5q4.5-3.5 9 0', 2.6), stroke('M25 39.5q3.5-3 7 0t7 0', 2.8)),
      /* panic */
      g('panic', S('circle', { cx: 24, cy: 28.5, r: 5.2, fill: '#fffaf0', stroke: INK, 'stroke-width': 2 }), S('circle', { cx: 40, cy: 28.5, r: 5.2, fill: '#fffaf0', stroke: INK, 'stroke-width': 2 }),
        dot(24, 28.5, 1.7), dot(40, 28.5, 1.7), stroke('M17.5 20l9-3', 2.6), stroke('M46.5 20l-9-3', 2.6),
        S('ellipse', { cx: 32, cy: 40.5, rx: 5, ry: 4.6, fill: INK }),
        S('path', { d: 'M53 12q3.5 5.5 0 9q-3.5-3.5 0-9z', fill: '#9fd4ff', stroke: INK, 'stroke-width': 1.5, 'stroke-linejoin': 'round' })),
      /* smug */
      g('smug', stroke('M20.5 29.5h8', 3.2), stroke('M35.5 29.5h8', 3.2), dot(25, 32, 1.8), dot(40, 32, 1.8),
        stroke('M35 23.5q4.5-3.5 9-1', 2.6), stroke('M25 38.5q7 4.5 14-2.5', 3), stroke('M40 35.5l1.8-2.2', 2),
        S('circle', { cx: 19.5, cy: 36, r: 2.8, fill: '#ff8d7a', opacity: '.5' }), S('circle', { cx: 44.5, cy: 36, r: 2.8, fill: '#ff8d7a', opacity: '.5' }))
    );
  }

  LB.buildNarrator = function (shell) {
    const old = document.getElementById('pm-narrator');
    if (old && old.parentNode) old.parentNode.removeChild(old);

    const face = buildFace();
    const emoji = h('span', { class: 'lb-narr-emoji', 'aria-hidden': 'true', hidden: true });
    const faceBtn = h('button', { type: 'button', class: 'lb-narr-face', 'aria-label': 'Management (click to collapse or expand)', title: 'Management' }, face, emoji, h('span', { class: 'lb-narr-dot', 'aria-hidden': 'true' }));
    const who = h('span', { class: 'lb-narr-who' }, 'Management');
    const logBtn = h('button', { type: 'button', class: 'lb-narr-mini', 'aria-expanded': 'false', title: 'Show the last few things Management said' }, '📋 Log');
    const minBtn = h('button', { type: 'button', class: 'lb-narr-mini', 'aria-expanded': 'true', 'aria-label': 'Collapse Management' }, '−');
    /* the bubble itself can be clicked to hurry Management along; this button is the keyboard way to do the same */
    const nextBtn = h('button', { type: 'button', class: 'lb-narr-mini', 'aria-label': 'Hurry Management along (skip to the next line)', title: 'Hurry Management along' }, 'Next');
    const text = h('span', { class: 'lb-narr-text', 'aria-hidden': 'true' });
    const sr = h('span', { class: 'pm-sr', role: 'status', 'aria-live': 'polite' });
    const bubble = h('div', { class: 'lb-narr-bubble lb-quiet', 'data-mood': 'neutral', title: 'Click to hurry Management along' }, text, sr);
    const logList = h('ol', { class: 'lb-narr-loglist' });
    const logBox = h('div', { class: 'lb-narr-log', hidden: true }, h('div', { class: 'lb-narr-logtitle' }, 'Things Management has said (newest first)'), logList);
    const el = h('aside', { class: 'lb-narr', id: 'lb-narrator', 'aria-label': 'Management' },
      faceBtn,
      h('div', { class: 'lb-narr-main' }, h('div', { class: 'lb-narr-top' }, who, h('span', { class: 'lb-narr-btns' }, nextBtn, logBtn, minBtn)), bubble),
      logBox);
    shell.appendChild(el);

    let typeTimer = 0, typing = null, collapsed = false, logOpen = false;

    function setCollapsed(c, silent) {
      collapsed = !!c;
      el.classList.toggle('lb-collapsed', collapsed);
      shell.classList.toggle('pm-narr-collapsed', collapsed);
      minBtn.textContent = collapsed ? '+' : '−';
      minBtn.setAttribute('aria-expanded', collapsed ? 'false' : 'true');
      minBtn.setAttribute('aria-label', collapsed ? 'Expand Management' : 'Collapse Management');
      if (collapsed) { logOpen = false; logBox.hidden = true; logBtn.setAttribute('aria-expanded', 'false'); }
      else el.classList.remove('lb-ping');
      if (!silent) P.state.setting.set('narratorCollapsed', collapsed);
    }
    function paintLog() {
      LB.clear(logList);
      const hist = P.narrator.history.slice(-10).reverse();
      if (!hist.length) logList.appendChild(h('li', { class: 'lb-narr-logempty' }, 'Management has not spoken yet. This is unusual and slightly ominous.'));
      hist.forEach(function (e) { logList.appendChild(h('li', {}, h('b', {}, e.who + ': '), e.text)); });
    }
    function setLog(open) {
      logOpen = !!open && !collapsed;
      logBox.hidden = !logOpen;
      logBtn.setAttribute('aria-expanded', logOpen ? 'true' : 'false');
      if (logOpen) paintLog();
    }
    function finishTyping() {
      if (typeTimer) { NAT.clearTimeout(typeTimer); typeTimer = 0; }
      if (typing) { text.textContent = typing.text; typing = null; return true; }
      return false;
    }
    function typeIn(full) {
      if (typeTimer) { NAT.clearTimeout(typeTimer); typeTimer = 0; }
      if (LB.isFuzz() || LB.reduced()) { typing = null; text.textContent = full; return; }
      typing = { text: full }; let i = 0;
      (function tick() {
        i = Math.min(full.length, i + 2);
        text.textContent = full.slice(0, i);
        if (i < full.length) typeTimer = NAT.setTimeout(tick, 22);
        else { typeTimer = 0; typing = null; }
      })();
    }

    NAT.add(faceBtn, 'click', function () { setCollapsed(!collapsed); });
    NAT.add(minBtn, 'click', function () { setCollapsed(!collapsed); });
    NAT.add(logBtn, 'click', function () { setLog(!logOpen); });
    NAT.add(nextBtn, 'click', function () { if (!finishTyping()) P.narrator.skip(); });
    NAT.add(bubble, 'click', function () { if (!finishTyping()) P.narrator.skip(); });

    P.narrator.setRenderer({
      show: function (e) {
        const mood = P.MOODS.indexOf(e.mood) >= 0 ? e.mood : 'neutral';
        const em = speakerEmoji(e.who);
        who.textContent = e.who;
        el.setAttribute('data-speaker', em ? 'guest' : 'management');
        face.setAttribute('data-mood', mood);
        face.style.display = em ? 'none' : '';
        emoji.hidden = !em; emoji.textContent = em;
        bubble.setAttribute('data-mood', mood);
        bubble.classList.remove('lb-quiet');
        sr.textContent = e.text;
        if (collapsed) el.classList.add('lb-ping');
        typeIn(e.text);
        if (logOpen) paintLog();
      },
      hide: function () {
        finishTyping();
        bubble.classList.add('lb-quiet');
      }
    });

    if (P.state.setting.get('narratorCollapsed', false) === true) setCollapsed(true, true);
    /* import / reset / another tab changed the saved preference */
    P.on('setting', function (e) { if (e && e.id === 'narratorCollapsed' && (e.value === true) !== collapsed) setCollapsed(e.value === true, true); });
    LB.parts.narrator = { el: el, setCollapsed: setCollapsed, setLog: setLog, isCollapsed: function () { return collapsed; }, logOpen: function () { return logOpen; } };
    return el;
  };
})();
