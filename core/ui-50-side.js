/* POINTLESS ui 50: the lobby wall - the always-wrong clock, Dennis (Plant), motivational posters, the notice board
 * and the Fortune Dispenser. All text comes from the registry (poster, notice, plantStatus, fortune, lobbyEvent). */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;
  const NAT = P.native;
  const h = LB.h, S = LB.svg;
  const INK = '#2b2438';

  function buildClock() {
    const hourH = S('line', { class: 'lb-hand', x1: 50, y1: 50, x2: 50, y2: 30, stroke: INK, 'stroke-width': 5, 'stroke-linecap': 'round' });
    const minH = S('line', { class: 'lb-hand', x1: 50, y1: 50, x2: 50, y2: 18, stroke: INK, 'stroke-width': 3, 'stroke-linecap': 'round' });
    const secH = S('line', { class: 'lb-hand lb-sweep', x1: 50, y1: 56, x2: 50, y2: 14, stroke: '#d9503c', 'stroke-width': 1.6, 'stroke-linecap': 'round' });
    const face = S('svg', { class: 'lb-clock-svg', viewBox: '0 0 100 100', 'aria-hidden': 'true', focusable: 'false' },
      S('circle', { cx: 50, cy: 50, r: 46, fill: '#fffaf0', stroke: INK, 'stroke-width': 4 }),
      S('circle', { cx: 50, cy: 50, r: 40, fill: 'none', stroke: INK, 'stroke-width': 1, 'stroke-dasharray': '1 4' }));
    const nums = ['12', '1', '2', '3', '4', '5', '6', '7½', '8', '9', '10', '11'];
    nums.forEach(function (n, i) {
      const a = (i * 30 - 90) * Math.PI / 180;
      face.appendChild(S('text', { x: (50 + Math.cos(a) * 33).toFixed(1), y: (50 + Math.sin(a) * 33 + 3).toFixed(1), 'text-anchor': 'middle', 'font-size': n.length > 2 ? 8 : 9, 'font-weight': 900, fill: INK }, n));
    });
    face.appendChild(hourH); face.appendChild(minH); face.appendChild(secH);
    face.appendChild(S('circle', { cx: 50, cy: 50, r: 3.4, fill: '#ff8d7a', stroke: INK, 'stroke-width': 1.5 }));
    function setTime(hourDeg, minDeg) { hourH.style.transform = 'rotate(' + hourDeg + 'deg)'; minH.style.transform = 'rotate(' + minDeg + 'deg)'; }
    setTime(128.5, 102);   // 4:17, confidently
    const btn = h('button', { type: 'button', class: 'lb-clock-btn', 'aria-label': 'Wall clock. It says 4:17 and is sure of it. Click to adjust it.', title: 'The wall clock. It is always 4:17. Adjust it?' }, face);
    NAT.add(btn, 'click', function () {
      LB.stat('lobby.clockClicks');
      LB.sfx('tick');
      setTime(Math.round(LB.rand() * 720), Math.round(LB.rand() * 1440));
      LB.say(LB.bag('clock', LB.text.clockLines), { priority: 0, mood: 'confused' });
    });
    return btn;
  }

  function buildPlant() {
    const leaf = function (d, fill) { return S('path', { d: d, fill: fill, stroke: INK, 'stroke-width': 2.5, 'stroke-linejoin': 'round' }); };
    const sway = S('g', { class: 'lb-plant-sway' },
      S('path', { d: 'M50 80C50 60 48 46 40 34', fill: 'none', stroke: INK, 'stroke-width': 3, 'stroke-linecap': 'round' }),
      S('path', { d: 'M50 80C52 58 58 44 68 32', fill: 'none', stroke: INK, 'stroke-width': 3, 'stroke-linecap': 'round' }),
      S('path', { d: 'M50 80C50 62 50 44 50 26', fill: 'none', stroke: INK, 'stroke-width': 3, 'stroke-linecap': 'round' }),
      leaf('M40 34C26 36 18 26 20 16C32 16 40 22 40 34z', '#6fcf97'),
      leaf('M68 32C80 34 88 24 84 14C72 14 66 22 68 32z', '#52b788'),
      leaf('M50 26C40 22 38 10 46 3C56 8 58 18 50 26z', '#8be0c0'),
      leaf('M49 56C36 58 28 50 30 42C42 42 49 48 49 56z', '#52b788'),
      leaf('M52 52C62 56 74 52 76 44C66 40 54 42 52 52z', '#6fcf97'),
      S('g', { class: 'lb-flower' }, S('circle', { cx: 50, cy: 10, r: 8, fill: '#ff8fb8', stroke: INK, 'stroke-width': 2 }), S('circle', { cx: 50, cy: 10, r: 3, fill: '#ffd166', stroke: INK, 'stroke-width': 1.5 })));
    const svg = S('svg', { class: 'lb-plant-svg', viewBox: '0 0 100 112', 'aria-hidden': 'true', focusable: 'false' },
      sway,
      S('path', { d: 'M24 78h52l-6 28q-1 5-6 5H36q-5 0-6-5z', fill: '#ff8d7a', stroke: INK, 'stroke-width': 3, 'stroke-linejoin': 'round' }),
      S('rect', { x: 20, y: 74, width: 60, height: 9, rx: 3, fill: '#ffb3a4', stroke: INK, 'stroke-width': 3 }),
      S('rect', { x: 40, y: 90, width: 20, height: 9, rx: 2, fill: '#fffaf0', stroke: INK, 'stroke-width': 1.8 }),
      S('text', { x: 50, y: 97.5, 'text-anchor': 'middle', 'font-size': 6.5, 'font-weight': 900, fill: INK }, 'DENNIS'));
    const btn = h('button', { type: 'button', class: 'lb-plant-btn', 'aria-label': 'Dennis, the lobby plant. Click to check on him.', title: 'Dennis (Plant). Thriving.' }, svg);
    const status = h('p', { class: 'lb-plant-status', 'aria-live': 'polite' });
    function paintBloom() { svg.classList.toggle('lb-bloom', LB.getStat('lobby.plantPokes') >= 50); }
    function say(line) { status.textContent = line; }
    NAT.add(btn, 'click', function () {
      const n = LB.stat('lobby.plantPokes');
      LB.sfx('pop');
      btn.classList.remove('lb-perk'); void btn.offsetWidth; btn.classList.add('lb-perk');
      const m = LB.text.plantMilestones[n];
      const line = m || LB.line('plantStatus');
      say(line);
      LB.say(line, { priority: m ? 1 : 0, mood: m ? 'smug' : 'neutral', who: 'Management' });
      paintBloom();
    });
    const rotate = function () { say(LB.line('plantStatus')); };
    rotate(); paintBloom();
    return { btn: btn, status: status, rotate: rotate, paintBloom: paintBloom };
  }

  const POSTER_PICS = ['⛰️', '🌅', '🚣', '🦅', '🧗', '🌊', '🏔️', '🌄'];
  function splitPoster(t) {
    const m = /^([A-Z0-9 '&\-]{3,28}):\s*(.+)$/.exec(t);
    return m ? { title: m[1], body: m[2] } : { title: 'NOTICE', body: t };
  }

  LB.buildSide = function (container) {
    const offs = [];
    let posterIdx = 0, noteIdx = 0, fortuneBusy = false;

    /* clock + plant */
    const clock = buildClock();
    const plant = buildPlant();
    const wall = h('section', { class: 'lb-widget lb-w-wall', 'aria-label': 'The lobby' },
      h('h3', { class: 'lb-widget-title' }, 'The Lobby'),
      h('div', { class: 'lb-wall' },
        h('div', { class: 'lb-wall-clock' }, clock, h('small', { class: 'lb-cap' }, 'Wall clock (confident)')),
        h('div', { class: 'lb-wall-plant' }, plant.btn, h('small', { class: 'lb-cap' }, 'Dennis (Plant)'))),
      plant.status);

    /* poster */
    const posterEmoji = h('div', { class: 'lb-poster-pic', 'aria-hidden': 'true' });
    const posterTitle = h('h4', { class: 'lb-poster-title' });
    const posterBody = h('p', { class: 'lb-poster-body' });
    const posterFrame = h('div', { class: 'lb-poster' }, posterEmoji, posterTitle, posterBody);
    const posterBtn = h('button', { type: 'button', class: 'lb-btn lb-btn-small' }, 'Next poster');
    function setPoster() {
      const p = splitPoster(LB.line('poster'));
      posterIdx++;
      posterFrame.className = 'lb-poster lb-pz' + (posterIdx % 5);
      posterEmoji.textContent = POSTER_PICS[posterIdx % POSTER_PICS.length];
      posterTitle.textContent = p.title;
      posterBody.textContent = p.body;
    }
    NAT.add(posterBtn, 'click', function () { LB.sfx('whoosh'); setPoster(); });
    const posters = h('section', { class: 'lb-widget lb-w-poster', 'aria-label': 'Motivational poster' },
      h('h3', { class: 'lb-widget-title' }, 'Motivation Wall'), posterFrame, posterBtn);

    /* notices */
    const noteEls = [];
    for (let i = 0; i < 3; i++) {
      const n = h('button', { type: 'button', class: 'lb-note lb-nz' + i, title: 'Click to swap this notice for another', style: { '--rot': ((i * 3.7) % 6 - 3) + 'deg' } });
      NAT.add(n, 'click', function () { LB.sfx('pop'); setNote(i); });
      noteEls.push(n);
    }
    function setNote(i) { noteEls[i].textContent = LB.line('notice'); }
    const board = h('section', { class: 'lb-widget lb-w-board', 'aria-label': 'Notice board' },
      h('h3', { class: 'lb-widget-title' }, 'Notice Board'), h('div', { class: 'lb-board' }, noteEls));

    /* fortune dispenser */
    const slip = h('p', { class: 'lb-slip', hidden: true, 'aria-live': 'polite' });
    const dispBtn = h('button', { type: 'button', class: 'lb-btn lb-btn-primary lb-fortune-btn' }, '🥠 Dispense Fortune');
    const machine = h('div', { class: 'lb-machine', 'aria-hidden': 'true' }, h('span', { class: 'lb-machine-slot' }), h('span', { class: 'lb-machine-light' }));
    const fortune = h('section', { class: 'lb-widget lb-w-fortune', 'aria-label': 'Fortune Dispenser' },
      h('h3', { class: 'lb-widget-title' }, 'Fortune Dispenser'), h('div', { class: 'lb-fortune-row' }, machine, dispBtn), slip);
    NAT.add(dispBtn, 'click', function () {
      if (fortuneBusy) return;
      fortuneBusy = true;
      dispBtn.disabled = true;
      LB.stat('lobby.fortunes');
      LB.sfx('bell');
      machine.classList.add('lb-printing');
      LB.say(LB.bag('fortuneOut', LB.text.fortuneOut), { priority: 0, mood: 'smug' });
      const fin = function () {
        slip.hidden = false;
        slip.textContent = LB.line('fortune');
        slip.classList.remove('lb-print'); void slip.offsetWidth; slip.classList.add('lb-print');
        machine.classList.remove('lb-printing');
        dispBtn.disabled = false; fortuneBusy = false;
        LB.sfx('ding');
      };
      if (LB.reduced() || LB.isFuzz()) fin(); else NAT.setTimeout(fin, 900);
    });

    const side = h('aside', { class: 'lb-side', 'aria-label': 'The lobby wall' }, wall, posters, board, fortune);
    container.appendChild(side);
    setPoster();
    for (let i = 0; i < 3; i++) setNote(i);

    LB.parts.side = {
      el: side,
      rotatePoster: setPoster,
      rotateNote: function () { noteIdx = (noteIdx + 1) % 3; setNote(noteIdx); },
      rotatePlant: plant.rotate,
      refresh: function () { plant.paintBloom(); },
      destroy: function () { offs.splice(0).forEach(function (f) { f(); }); }
    };
    LB.registerRefresh(function () { plant.paintBloom(); });
    return side;
  };
})();
