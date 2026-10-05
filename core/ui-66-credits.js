/* POINTLESS ui 66: Credits - a roll that is, by contract, longer than the game. Built-in sections, a department list built from
 * the registered modules, generated job titles, and every P.lines.creditsLine from the content packs. Pause / speed controls. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;
  const h = LB.h;

  const CAST = [
    ['Management', 'Management'], ['Gerald', 'A Potato of Enormous Gravitas'], ['Sandra from Compliance', 'Herself (off screen, flagging)'], ['Dennis', 'Lobby Plant (Thriving)'],
    ['The Toaster', 'Toast'], ['The Stapler', 'Union Representative'], ['The Missing Sock', 'Presumed Travelling'], ['Tuesday', 'Looming'], ['The Third Ficus', 'The Third Ficus'],
    ['The Printer', 'A Job Nobody Sent'], ['The Suggestion Box', 'A Very Good Listener'], ['The Wall Clock', '4:17, Confidently'], ['The Elevator', 'Between Floors, Gracefully'],
    ['The Breakroom Microwave', 'Three Beeps, Fourth Pending'], ['Floor 7 1/2', 'A Rumor'], ['You', 'Valued Employee']
  ];
  const JOBS = ['Assistant to the', 'Associate', 'Deputy', 'Acting', 'Senior', 'Junior', 'Honorary', 'Interim'];
  const THINGS = ['Third Ficus', 'Printer Jam', 'Wrong Clock', 'Meeting Room That Does Not Exist', 'Hum', 'Loading Bar', 'Silence', 'Spreadsheet Cell C7', 'Elevator Button 7 1/2',
    'Gerald\'s Schedule', 'Paperclip Chain', 'Kettle', 'Stairwell', 'Lanyard Committee', 'Lost Property Cabinet', 'Quarterly Vibes', 'Rumor Mill', 'Tuesday Preparations',
    'Window That Faces a Wall', 'Laminator'];
  const NAMES = ['J. Pemberton-Ames', 'Dolores Quint', 'Ferris Alder', 'Mavis Tolliver', 'Orrin Fitch', 'Beatrix Hallam', 'Winnie Larkspur', 'Ignatius Boddle', 'Prudence Wick', 'Cornelius Pym',
    'Hattie Moxon', 'Barnaby Truss', 'Ottoline Crisp', 'Percival Dunn', 'Marigold Hess', 'Alistair Nook', 'Philippa Gorse', 'Lucian Marsh', 'Edwina Plumb', 'Thaddeus Wren'];
  const MEMORY = ['the original meeting, which could have been nothing', 'Form 27B/7 (1971 to 1998)', 'the fourth bullet point', 'the first draft, which was also the last', 'a sandwich that was never claimed', 'the idea of a quiet Friday', 'the good stapler, who knew what he did'];
  const THANKS = ['the committee of one', 'whoever keeps the lobby warm', 'the third ficus, again', 'every chair that supported this project', 'the printer, for the job it sent itself', 'the vending machine, for believing in snacks', 'the stairwell, for being there', 'anyone who read the Terms (hello)', 'the clock, for 4:17', 'you, for being here in a general sense'];

  function buildRoll() {
    const roll = h('div', { class: 'lb-credits-roll' });
    const title = function (t, cls) { roll.appendChild(h('h3', { class: 'lb-cr-title ' + (cls || '') }, t)); };
    const line = function (a, b) { roll.appendChild(h('p', { class: 'lb-cr-line' }, b ? [h('span', { class: 'lb-cr-role' }, a), h('span', { class: 'lb-cr-name' }, b)] : a)); };
    const gap = function () { roll.appendChild(h('div', { class: 'lb-cr-gap' })); };
    roll.appendChild(h('h2', { class: 'lb-cr-logo' }, 'POINTLESS™ DELUXE'));
    line('A Management Production');
    line('In association with a meeting');
    gap();
    title('Directed By');
    (P.lines.creditsLine || []).slice(0, 8).forEach(function (t) { line(P.subst(t, {})); });
    gap();
    title('Cast', 'lb-cr-sub');
    line('In order of appearance, eventually');
    CAST.forEach(function (c) { line(c[0], c[1]); });
    gap();
    title('Department Heads');
    line('Each department is led by a head, currently on leave');
    P.modules.slice(0, 80).forEach(function (m, i) { line(m.icon + ' ' + m.title, 'Head: ' + NAMES[(i * 7 + 2) % NAMES.length] + ' (acting)'); });
    if (!P.modules.length) line('No departments are open', 'Head: nobody (acting)');
    gap();
    title('Also Featuring');
    const more = (P.lines.creditsLine || []).slice(8, 320);
    if (!more.length) line('Absolutely nothing else. It was a small cast.');
    more.forEach(function (t) { line(P.subst(t, {})); });
    gap();
    title('Production Staff');
    for (let i = 0; i < 150; i++) {
      line(JOBS[i % JOBS.length] + ' ' + THINGS[(i * 7) % THINGS.length], NAMES[(i * 11 + 3) % NAMES.length]);
      if (i % 25 === 24) { gap(); line('...and a short pause for those who have been waiting'); gap(); }
    }
    gap();
    title('Catering');
    line('Provided by a room with a kettle');
    line('Biscuits: 7 1/2 (one was a coaster)');
    line('Gerald supplied the potatoes, himself, in himself');
    gap();
    title('In Loving Memory Of');
    MEMORY.forEach(function (m) { line(m); });
    gap();
    title('Special Thanks');
    THANKS.forEach(function (t) { line(t); });
    gap();
    title('Legal');
    line('No Meh was harmed in the making of this Meh');
    line('Any resemblance to a productive activity is purely coincidental');
    line('Filmed on location in the Lobby. No film was used.');
    line('All characters are fictional. Any resemblance to a stapler is intentional.');
    line('(c) 7 1/2 Management. All rights reserved, mostly.');
    gap(); gap();
    roll.appendChild(h('h2', { class: 'lb-cr-logo lb-cr-end' }, 'THE END'));
    line('The credits have ended.');
    line('The game continues.');
    gap(); gap(); gap();
    return roll;
  }

  LB.registerScreen('credits', {
    title: 'Credits', icon: '🎬', wide: true,
    render: function (body, ctx) {
      LB.stat('lobby.creditsRolls');
      const roll = buildRoll();
      const view = h('div', { class: 'lb-credits-view', tabindex: '0', role: 'region', 'aria-label': 'Credits. They scroll by themselves; you may also scroll them.' }, roll);
      const note = h('p', { class: 'lb-note-line', 'aria-live': 'polite' });
      const playBtn = h('button', { type: 'button', class: 'lb-btn lb-btn-primary' }, '⏸ Pause');
      const slow = h('button', { type: 'button', class: 'lb-btn lb-btn-small' }, '− Slower');
      const fast = h('button', { type: 'button', class: 'lb-btn lb-btn-small' }, '+ Faster');
      const top = h('button', { type: 'button', class: 'lb-btn lb-btn-small' }, '⏮ From the top');
      const speedEl = h('span', { class: 'lb-cr-speed' });
      body.appendChild(h('p', { class: 'lb-sect-sub' }, 'Running time of the credits: roughly 3 minutes. Running time of the game: none. As per the contract.'));
      body.appendChild(view);
      body.appendChild(h('div', { class: 'lb-actions lb-cr-ctl' }, playBtn, slow, fast, top, speedEl));
      body.appendChild(note);

      let playing = !LB.reduced(), speed = 1, pos = 0, autoDist = 0, ended = false, last = P.native.now();
      function paint() {
        playBtn.textContent = playing ? '⏸ Pause' : '▶ Play';
            speedEl.textContent = 'Speed ' + speed + '×';
        if (!playing && LB.reduced() && !note.textContent) note.textContent = 'Reduced motion is on, so the credits are paused. Scroll them yourself, or press Play.';
      }
      playBtn.addEventListener('click', function () { playing = !playing; last = P.native.now(); paint(); });
      slow.addEventListener('click', function () { speed = Math.max(0.5, speed / 2); paint(); });
      fast.addEventListener('click', function () { speed = Math.min(8, speed * 2); paint(); });
      top.addEventListener('click', function () { view.scrollTop = 0; pos = 0; autoDist = 0; ended = false; note.textContent = ''; });
      paint();
      ctx.every(function () {
        const now = P.native.now();
        const dt = Math.min(0.25, Math.max(0, (now - last) / 1000));
        last = now;
        if (!playing) return;
        const max = view.scrollHeight - view.clientHeight;
        if (Math.abs(view.scrollTop - pos) > 3) pos = view.scrollTop;
        const step = 45 * speed * dt;
        pos = Math.min(max, pos + step);
        autoDist += step;
        view.scrollTop = pos;
        if (!ended && max > 0 && pos >= max - 2) {
          ended = true; playing = false; paint();
          note.textContent = 'The credits have ended. The game continues.';
          if (autoDist >= max * 0.8 || LB.isFuzz()) { LB.stat('lobby.creditsEnded'); LB.achieve('lobby.credits'); }
          LB.sfx('tada');
          LB.say('The credits have ended. The game continues. It will be right where you left it, which is here.', { priority: 1, mood: 'proud' });
        }
      }, 33);
    }
  });
})();
