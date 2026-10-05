/* POINTLESS ui 64: Ascend - pay Meh, reset Meh and purchases (trophies/stats kept), gain an Ascension Count and a tiny cosmetic.
 * "You have ascended 1 step. You are in the same place. It is slightly more humming." */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;
  const NAT = P.native;
  const h = LB.h;

  LB.ASC = [
    { emoji: '🔔', name: 'Faint Hum', desc: 'A hum, installed. You can only hear it when you are not listening.' },
    { emoji: '🎫', name: 'Slightly Better Lanyard', desc: 'The same lanyard, but it has been thought about.' },
    { emoji: '😇', name: 'Laminated Halo', desc: 'Wipe-clean. Does not float. Worn with dignity.' },
    { emoji: '🧦', name: 'Honorary Sock', desc: 'A sock of the Missing Sock\'s acquaintance. It will not say where.' },
    { emoji: '📎', name: 'Ceremonial Paperclip', desc: 'Holds nothing together, officially.' },
    { emoji: '💺', name: 'Chair With Opinions', desc: 'It leans when you are wrong. It is leaning now.' },
    { emoji: '🥔', name: 'Gerald\'s Nod', desc: 'A slight nod from a potato of enormous gravitas. It cannot be returned.' },
    { emoji: '☁️', name: 'Personal Cloud (Indoor)', desc: 'It follows you at a respectful distance of 7 1/2 feet.' },
    { emoji: '🎺', name: 'Distant Trumpet', desc: 'Somewhere, one note. It is for you. It is also for lunch.' },
    { emoji: '🌟', name: 'Star, Provisional', desc: 'Pending approval from the sky.' },
    { emoji: '🔮', name: 'Reflection, Approved', desc: 'Your reflection has been signed off by Compliance.' },
    { emoji: '🏅', name: 'Medal for Attendance at Ascending', desc: 'Awarded for turning up, then rising slightly.' }
  ];
  LB.ascCosmetic = function (n) { return n > 0 ? LB.ASC[(n - 1) % LB.ASC.length] : null; };
  const HUM = ['slightly', 'noticeably', 'considerably', 'alarmingly', 'devotedly', 'ceremonially', 'professionally', 'unreasonably'];

  LB.registerScreen('ascend', {
    title: 'Ascend', icon: '⬆️',
    render: function (body, ctx) {
      const resultBox = h('div', { class: 'lb-asc-result', 'aria-live': 'polite' });
      const stairs = h('div', { class: 'lb-stairs', 'aria-hidden': 'true' });
      const countEl = h('b', { class: 'lb-asc-count' });
      const costEl = h('b', { class: 'lb-asc-cost' });
      const bar = h('span', { class: 'lb-bar' }, h('i', { class: 'lb-bar-fill' }));
      const barNote = h('p', { class: 'lb-note-line' });
      const confirmBox = h('div', { class: 'lb-asc-confirm', hidden: true });
      const goBtn = h('button', { type: 'button', class: 'lb-btn lb-btn-primary lb-asc-btn' });
      const collection = h('ul', { class: 'lb-asc-collection', 'aria-label': 'Ascension cosmetics' });

      function paintStairs() {
        const n = P.state.ascensions();
        LB.clear(stairs);
        const at = n % 8;
        for (let i = 0; i < 8; i++) {
          stairs.appendChild(h('div', { class: 'lb-stair' + (i === at ? ' lb-here' : ''), style: { '--h': (18 + i * 11) + 'px' } },
            i === at ? h('span', { class: 'lb-you' }, '🚶') : null));
        }
      }
      function paint() {
        const n = P.state.ascensions(), cost = P.state.ascendCost(), meh = P.state.getMeh();
        countEl.textContent = LB.fmt(n);
        costEl.textContent = LB.fmt(cost) + ' Meh';
        bar.firstChild.style.width = Math.round(Math.min(1, meh / cost) * 100) + '%';
        barNote.textContent = meh >= cost ? 'You can afford it. You can also afford not to. Both are available.' : 'You have ' + LB.fmt(meh) + ' of ' + LB.fmt(cost) + ' Meh. ' + LB.fmt(cost - meh) + ' to go.';
        goBtn.textContent = '⬆️ Ascend ('+ LB.fmt(cost) + ' Meh)';
        goBtn.classList.toggle('lb-poor', meh + 1e-9 < cost);
        paintStairs();
        LB.clear(collection);
        const gained = Math.min(n, 24);
        if (!n) collection.appendChild(h('li', { class: 'lb-asc-none' }, 'No cosmetics yet. You are un-humming. It is a good baseline.'));
        for (let i = 1; i <= gained; i++) {
          const c = LB.ascCosmetic(i);
          collection.appendChild(h('li', { class: 'lb-asc-item' }, h('span', { class: 'lb-asc-emoji', 'aria-hidden': 'true' }, c.emoji), h('div', {}, h('b', {}, c.name + (i > LB.ASC.length ? ' (again)' : '')), h('small', {}, c.desc))));
        }
      }
      function closeConfirm() { confirmBox.hidden = true; goBtn.hidden = false; }
      NAT.add(goBtn, 'click', function () {
        const cost = P.state.ascendCost();
        if (P.state.getMeh() + 1e-9 < cost) {
          LB.sfx('error');
          goBtn.classList.remove('lb-shake'); void goBtn.offsetWidth; goBtn.classList.add('lb-shake');
          LB.say('Ascension costs ' + LB.fmt(cost) + ' Meh. You have ' + LB.fmt(P.state.getMeh()) + '. The stairs have been asked to wait, and are good at it.', { priority: 1, mood: 'disappointed' });
          return;
        }
        LB.clear(confirmBox);
        const yes = h('button', { type: 'button', class: 'lb-btn lb-btn-primary' }, 'Yes, ascend');
        const no = h('button', { type: 'button', class: 'lb-btn' }, 'Not yet');
        confirmBox.appendChild(h('p', {}, 'This resets your Meh to 0 and returns your Gift Shop purchases to the shop. Trophies, statistics, departments and settings stay. Proceed?'));
        confirmBox.appendChild(h('div', { class: 'lb-actions' }, yes, no));
        confirmBox.hidden = false; goBtn.hidden = true;
        try { yes.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
        NAT.add(no, 'click', function () { closeConfirm(); try { goBtn.focus({ preventScroll: true }); } catch (e) { /* ignore */ } });
        NAT.add(yes, 'click', function () {
          const r = P.state.ascend();
          closeConfirm();
          if (!r.ok) { LB.sfx('error'); LB.say('Ascension declined. You are ' + LB.fmt(r.short || 0) + ' Meh short, and the stairs are unmoved.', { priority: 1, mood: 'disappointed' }); paint(); return; }
          LB.sfx('tada'); LB.confetti();
          const c = LB.ascCosmetic(r.count);
          const adj = HUM[(r.count - 1) % HUM.length];
          LB.clear(resultBox);
          resultBox.appendChild(h('p', { class: 'lb-asc-line' }, 'You have ascended ' + r.count + ' ' + LB.plural(r.count, 'step') + '. You are in the same place. It is ' + adj + ' more humming.'));
          resultBox.appendChild(h('p', { class: 'lb-asc-gain' }, 'New cosmetic: ' + c.emoji + ' ' + c.name + '. ' + c.desc));
          LB.say('You have ascended ' + r.count + ' ' + LB.plural(r.count, 'step') + '. You are in the same place. It is ' + adj + ' more humming.', { priority: 2, mood: 'proud' });
          LB.toast(c.name, { icon: c.emoji, title: 'Ascension cosmetic', kind: 'achievement' });
          paint();
        });
      });

      body.appendChild(h('div', { class: 'lb-asc-top' },
        h('div', { class: 'lb-asc-stats' },
          h('p', { class: 'lb-asc-big' }, 'Ascensions: ', countEl),
          h('p', {}, 'Next ascension costs ', costEl),
          bar, barNote,
          h('p', { class: 'lb-sect-sub' }, 'Ascending resets your Meh and purchases. In return you receive an Ascension Count and a tiny cosmetic. Nothing else happens, which is the point, and also the problem.'),
          goBtn, confirmBox),
        stairs));
      body.appendChild(resultBox);
      body.appendChild(LB.sectionTitle('Your Ascension Collection', 'Worn automatically. Visible in the header, to those who look.'));
      body.appendChild(collection);
      paint();
      let t = 0;
      ctx.on('meh', function () { if (t) return; t = NAT.setTimeout(function () { t = 0; if (ctx.isOpen()) paint(); }, 700); });
      ctx.on('ascend', function () { paint(); });
      ctx.onDispose(function () { if (t) NAT.clearTimeout(t); });
    }
  });
})();
