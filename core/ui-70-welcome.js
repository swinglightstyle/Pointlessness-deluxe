/* POINTLESS ui 70: first-run welcome from Management (skippable, asks the player's name). Flag: lobby.welcomed. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;
  const NAT = P.native;
  const h = LB.h;

  function markWelcomed() {
    if (!LB.flag('lobby.welcomed')) { LB.flag('lobby.welcomed', true); LB.achieve('lobby.welcome'); }
  }

  LB.registerScreen('welcome', {
    title: 'Orientation', icon: '🎓', greet: false,
    onClose: function () { markWelcomed(); if (LB.parts.header) LB.parts.header.paintMemo(); },
    render: function (body, ctx) {
      const input = h('input', { type: 'text', class: 'lb-input', id: 'lb-welcome-name', maxlength: '24', placeholder: 'Valued Employee', autocomplete: 'off', value: P.state.player.hasName() ? P.state.player.getName() : '' });
      const begin = h('button', { type: 'button', class: 'lb-btn lb-btn-primary' }, 'Begin Orientation');
      const skip = h('button', { type: 'button', class: 'lb-btn' }, 'Skip Orientation (skipping is also orientation)');
      body.appendChild(h('div', { class: 'lb-welcome' },
        h('div', { class: 'lb-memo-card' },
          h('p', { class: 'lb-memo-head' }, 'MEMO · TO: NEW EMPLOYEE · FROM: MANAGEMENT · RE: YOUR JOB'),
          h('p', {}, 'Congratulations. You have been hired to do nothing, effective immediately and also earlier.'),
          h('p', {}, 'Your duties are simple: pick a department, do the thing, collect a small amount of Meh, and spend it on nothing. Nothing is available in the Gift Shop. It is popular.'),
          h('p', {}, 'There is no way to win. Management means this in the warmest possible way.'),
          h('p', { class: 'lb-memo-sig' }, '— Management (a person, probably)')),
        h('div', { class: 'lb-field' }, h('label', { class: 'lb-label', for: 'lb-welcome-name' }, 'What should Management call you?'), input,
          h('small', { class: 'lb-hint' }, 'Up to 24 characters. Leave it blank to remain "Valued Employee", which is also a name, and a good one.')),
        h('div', { class: 'lb-actions' }, begin, skip),
        h('p', { class: 'lb-hint' }, 'Orientation takes 7 1/2 seconds and has been completed by everyone who finished it.')));
      function finish(skipped) {
        const n = P.state.player.setName(input.value);
        markWelcomed();
        LB.sfx(skipped ? 'blip' : 'tada');
        ctx.close('done');
        /* on a one-column layout the departments are a long scroll below the memo: bring them into view so the first move is obvious */
        LB.later(function () {
          try {
            if (P.host.current || LB.currentScreen() || !window.matchMedia || !window.matchMedia('(max-width: 760px)').matches) return;
            const g = document.getElementById('lb-grid-col');
            if (g && g.scrollIntoView) g.scrollIntoView({ block: 'start', behavior: P.fx.reduced() ? 'auto' : 'smooth' });
          } catch (e) { /* cosmetic */ }
        }, 120);
        if (skipped) LB.say(LB.bag('welcomeSkip', LB.text.welcomeSkip, { player: n }), { priority: 2, mood: 'smug' });
        else { LB.confetti(); LB.say('Welcome aboard, ' + n + '. Orientation is complete. You may now do nothing, with full authorization.', { priority: 2, mood: 'proud' }); }
      }
      NAT.add(begin, 'click', function () { finish(false); });
      NAT.add(skip, 'click', function () { finish(true); });
      NAT.add(input, 'keydown', function (e) { if (e.key === 'Enter') { e.preventDefault(); finish(false); } });
      ctx.later(function () { try { input.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }, 60);
    }
  });
})();
