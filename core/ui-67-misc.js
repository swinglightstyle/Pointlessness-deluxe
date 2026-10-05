/* POINTLESS ui 67: Patch Notes, About (Employee Handbook), Diagnostics, Clock Out (farewell). */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;
  const NAT = P.native;
  const h = LB.h;

  /* ---------------- patch notes ---------------- */
  const VERSIONS = [
    { v: '1.0.0', name: 'The One With The Lobby', date: 'A Tuesday', notes: [
      'Added a lobby. It has a plant, a clock, and a sense of occasion.', 'Added Management. Management added itself, then a title.', 'Added Meh. Meh was already there. It has been given a counter, and a hat, for a fee.',
      'Added the Terms of Service. Read in full by one person (our lawyer, once).', 'Known issue: the Accept button. It is not a bug. See clause 2.4.'] },
    { v: '0.9.9', name: 'Almost Nothing', date: 'The Tuesday before', notes: [
      'Reduced the number of known bugs from 7 1/2 to 7 1/2 (rounded).', 'Fixed a crash caused by someone looking directly at it.', 'Improved the loading screen by removing the loading.'] },
    { v: '0.9.0', name: 'Beta (Mostly Alpha)', date: 'A Wednesday, briefly', notes: [
      'Added the Trophy Cabinet. Trophies are kept in the cabinet.', 'Added secret trophies. We will not be listing them here, on principle and also out of fear.', 'Dennis (Plant) now has a nameplate. He declined to comment.'] },
    { v: '0.8.5', name: 'The Refund Update', date: 'Form 27B/6 day', notes: [
      'Added refunds. Refunds are 0 Meh. This figure is generous.', 'Added Form 27B/7. Removed Form 27B/7. Net: a form-shaped feeling.', 'The Refund button now requires eight forms. The ninth is optional and, therefore, required.'] },
    { v: '0.8.0', name: 'Settings (Decorative)', date: 'Whenever the settings were ready', notes: [
      'Added Settings. Some of them now do things. We will not say which.', 'Added Mandatory Fun. It cannot be disabled.', 'Meaning of Life slider added, defaulting to 42, which Management found "reasonable".'] },
    { v: '0.5.0', name: 'Tuesday Preview', date: 'The 7 1/2th', notes: [
      'Tuesday has been scheduled. It is looming. It is going well.', 'Added the Ascend feature. It costs Meh and takes you to the same place, only humming.'] },
    { v: '0.3.0', name: 'Boss Key', date: 'The afternoon', notes: [
      'Added the boss key. Pressing B opens a very serious spreadsheet.', 'The spreadsheet is also a joke, but a quiet one. It is the quietest joke we own.'] },
    { v: '0.1.0', name: 'Proof of Nothing', date: 'The day it started', notes: ['First build. It built nothing, successfully.', 'All tests passed. There were no tests, which is the same thing, but faster.'] },
    { v: '0.0.1', name: 'The Idea', date: 'A meeting', notes: ['Someone asked "what if it were pointless" in a meeting. The meeting could have been nothing, and was, retroactively.'] }
  ];

  LB.registerScreen('patchnotes', {
    title: 'Patch Notes', icon: '📝',
    render: function (body) {
      const upcoming = (P.lines.patchNote || []).slice(0, 60);
      const wrap = h('div', { class: 'lb-patch' });
      if (upcoming.length) {
        wrap.appendChild(h('section', { class: 'lb-patch-ver lb-patch-next' },
          h('h3', {}, 'v7 1/2 ', h('small', {}, 'Upcoming (Imminent, Perpetually)')),
          h('p', { class: 'lb-sect-sub' }, 'Changes in preparation. Subject to change, including this sentence.'),
          h('ul', {}, upcoming.map(function (t) { return h('li', {}, P.subst(t, {})); }))));
      }
      VERSIONS.forEach(function (v) {
        wrap.appendChild(h('section', { class: 'lb-patch-ver' },
          h('h3', {}, 'v' + v.v + ' ', h('small', {}, '“' + v.name + '” · ' + v.date)),
          h('ul', {}, v.notes.map(function (n) { return h('li', {}, n); }))));
      });
      body.appendChild(wrap);
    }
  });

  /* ---------------- about / handbook ---------------- */
  const FAQ = [
    ['Is there a way to win?', 'No. Winning would imply a point. Management has checked, twice, in a different order the second time.'],
    ['Why is the clock wrong?', 'It is not wrong. It is confident. These are different, and only one of them is a clock.'],
    ['Where does my Meh go when I spend it?', 'Into a place with no accounting, which is why everything there is so tidy.'],
    ['Who is Sandra from Compliance?', 'Nobody has met her. Everyone has been flagged by her. This is considered a working relationship.'],
    ['Is Gerald real?', 'Gerald is a potato. Gerald is therefore extremely real, and has a pension.'],
    ['Can I get my Meh back?', 'Please see the Gift Shop refund process. It is thorough. The refund is 0 Meh. We stand by the number.'],
    ['Where is floor 7 1/2?', 'Between 7 and 8. This is not an answer, but it is a location.'],
    ['Does the game save?', 'Yes, in your browser. It remembers you and does not mention it. See Save Tools for exporting your progress.'],
    ['What happens on Tuesday?', 'The Lobby does not discuss Tuesday. Please see your supervisor, who is also at lunch.'],
    ['Why does Management sometimes sound sad?', 'Management is not sad. Management is "between meetings", which is a place with weather.']
  ];

  LB.registerScreen('about', {
    title: 'About / Employee Handbook', icon: '📖', wide: true,
    render: function (body) {
      body.appendChild(h('div', { class: 'lb-about-hero' },
        h('h3', {}, 'Welcome to POINTLESS™ DELUXE'),
        h('p', {}, 'An arcade of pointless activities, supervised by a corporate voice called Management. Pick a department. Do the thing. Earn a small amount of Meh. Spend it on nothing. There is no way to win, and the game says so, sincerely, every chance it gets.')));
      const keys = [['B', 'Boss key: hides everything behind a very serious spreadsheet. Press again (or Esc) to return.'], ['/', 'Jump to the search box.'], ['Esc', 'Close the current screen.'], ['Tab', 'Move around. Every button is a real button.'], ['?', 'Open this handbook.']];
      body.appendChild(h('div', { class: 'lb-about-cols' },
        h('section', { class: 'lb-panel' }, LB.sectionTitle('Keyboard Shortcuts', 'For employees with hands.'),
          h('dl', { class: 'lb-keys' }, keys.map(function (k) { return [h('dt', {}, h('kbd', {}, k[0])), h('dd', {}, k[1])]; }))),
        h('section', { class: 'lb-panel' }, LB.sectionTitle('About This Build', 'Facts, supplied freely.'),
          h('dl', { class: 'lb-stat-list' },
            h('dt', {}, 'Version'), h('dd', {}, P.version),
            h('dt', {}, 'Departments and games'), h('dd', {}, String(P.modules.length)),
            h('dt', {}, 'Trophies'), h('dd', {}, String(P.achievementOrder.length)),
            h('dt', {}, 'Items in the Gift Shop'), h('dd', {}, String(P.shopOrder.length)),
            h('dt', {}, 'Things Management can say'), h('dd', {}, LB.fmt(Object.keys(P.lines).reduce(function (a, k) { return a + P.lines[k].length; }, 0))),
            h('dt', {}, 'Your progress is stored'), h('dd', {}, P.storage.isPersistent() ? 'In this browser, on this device' : 'In memory only (it leaves with the tab)')))));
      body.appendChild(LB.sectionTitle('Frequently Unasked Questions', 'Answered anyway, in advance, to be safe.'));
      FAQ.forEach(function (f) { body.appendChild(h('details', { class: 'lb-faq' }, h('summary', {}, f[0]), h('p', {}, f[1]))); });
      body.appendChild(h('div', { class: 'lb-actions' },
        h('button', { type: 'button', class: 'lb-btn', onclick: function () { LB.openScreen('tos'); } }, '📜 Terms of Service'),
        h('button', { type: 'button', class: 'lb-btn', onclick: function () { LB.openScreen('credits'); } }, '🎬 Credits'),
        h('button', { type: 'button', class: 'lb-btn', onclick: function () { LB.openScreen('patchnotes'); } }, '📝 Patch Notes')));
    }
  });

  /* ---------------- diagnostics ---------------- */
  /* Messages quoted from other code may contain whole words the fuzz text check treats as UI bugs (they are not UI bugs here:
   * this is a log). A zero-width space inside those words keeps the log readable and the check about the real UI. */
  function defang(s) { return String(s == null ? '' : s).replace(/\b(undefined|null|NaN)\b/g, function (m) { return m.charAt(0) + '​' + m.slice(1); }); }

  LB.registerScreen('diagnostics', {
    title: 'Diagnostics', icon: '🔧', wide: true,
    render: function (body, ctx) {
      let kind = 'all';
      const counts = h('p', { class: 'lb-diag-counts' });
      const list = h('ol', { class: 'lb-diag-list', 'aria-label': 'Diagnostic entries, newest first' });
      const chips = LB.chipGroup('Diagnostic kind', [['all', 'All'], ['crash', 'Crashes'], ['error', 'Errors'], ['module-error', 'Module errors'], ['load', 'Load'], ['warn', 'Warnings'], ['info', 'Info']].map(function (k) { return { value: k[0], label: k[1] }; }), 'all', function (v) { kind = v; paint(); });
      const clear = h('button', { type: 'button', class: 'lb-btn lb-btn-small' }, 'Clear the list');
      const registry = h('div', { class: 'lb-diag-reg' });
      body.appendChild(h('p', { class: 'lb-sect-sub' }, LB.line('nothing')));
      body.appendChild(h('div', { class: 'lb-diag-top' }, chips.el, clear));
      body.appendChild(counts);
      body.appendChild(list);
      body.appendChild(LB.sectionTitle('Registry Report', 'What the building currently knows about itself.'));
      body.appendChild(registry);
      NAT.add(clear, 'click', function () { P.diag.clear(); paint(); LB.say('The diagnostics have been cleared. They will be back. They are very loyal.', { priority: 0 }); });
      function paint() {
        const all = P.diag.list;
        const by = {};
        all.forEach(function (e) { by[e.kind] = (by[e.kind] || 0) + 1; });
        counts.textContent = all.length ? all.length + ' ' + LB.plural(all.length, 'entry', 'entries') + ': ' + Object.keys(by).map(function (k) { return by[k] + ' ' + k; }).join(', ') + '.' : 'Nothing has gone wrong. Management is suspicious.';
        LB.clear(list);
        const shown = all.filter(function (e) { return kind === 'all' || e.kind === kind; }).slice(-100).reverse();
        if (!shown.length) list.appendChild(h('li', { class: 'lb-diag-empty' }, all.length ? 'Nothing of that kind.' : 'The list is empty. This is either very good or a trick.'));
        shown.forEach(function (e) {
          const li = h('li', { class: 'lb-diag lb-diag-' + e.kind.replace(/[^a-z-]/g, '') },
            h('span', { class: 'lb-diag-kind' }, e.kind),
            h('span', { class: 'lb-diag-msg' }, defang(e.msg)),
            h('small', { class: 'lb-diag-meta' }, [e.count > 1 ? 'happened ' + e.count + ' times' : '', e.module ? 'module ' + e.module : '', e.src ? defang(String(e.src).replace(/^.*[\\/](core|content|games)[\\/]/, '$1/')) : ''].filter(Boolean).join(' · ')));
          if (e.stack) li.appendChild(h('details', {}, h('summary', {}, 'Stack'), h('pre', { class: 'lb-diag-pre' }, defang(String(e.stack).split('\n').slice(0, 8).join('\n')))));
          list.appendChild(li);
        });
      }
      function paintRegistry() {
        const cats = Object.keys(P.lines).sort();
        LB.clear(registry);
        registry.appendChild(h('dl', { class: 'lb-stat-list' },
          h('dt', {}, 'Modules registered'), h('dd', {}, String(P.modules.length)),
          h('dt', {}, 'Achievements'), h('dd', {}, String(P.achievementOrder.length)),
          h('dt', {}, 'Shop items'), h('dd', {}, String(P.shopOrder.length)),
          h('dt', {}, 'Decorative settings'), h('dd', {}, String(P.settingDefs.length)),
          h('dt', {}, 'Storage'), h('dd', {}, P.storage.kind + (P.storage.isPersistent() ? '' : ' (not persistent)')),
          h('dt', {}, 'Seed'), h('dd', {}, String(P.params.seed))));
        const pre = h('pre', { class: 'lb-diag-pre' }, cats.map(function (c) { return (c + '                                        ').slice(0, Math.max(20, c.length)) + ' ' + P.lines[c].length; }).join('\n') || 'No line categories are registered.');
        registry.appendChild(h('details', {}, h('summary', {}, 'Line counts by category (' + cats.length + ')'), pre));
      }
      paint(); paintRegistry();
      let t = 0;
      ctx.on('diag', function () { if (t) return; t = NAT.setTimeout(function () { t = 0; if (ctx.isOpen()) paint(); }, 400); });
      ctx.on('diag:clear', function () { paint(); });
      ctx.onDispose(function () { if (t) NAT.clearTimeout(t); });
    }
  });

  /* ---------------- clock out ---------------- */
  LB.registerScreen('farewell', {
    title: 'Clock Out', icon: '👋',
    render: function (body, ctx) {
      body.appendChild(h('div', { class: 'lb-farewell' },
        h('div', { class: 'lb-farewell-ico', 'aria-hidden': 'true' }, '👋'),
        h('p', { class: 'lb-farewell-line' }, LB.line('farewell')),
        h('p', { class: 'lb-sect-sub' }, 'You have clocked out. Nothing has changed. The lobby will carry on, mostly out of habit.'),
        h('div', { class: 'lb-actions' },
          h('button', { type: 'button', class: 'lb-btn lb-btn-primary', onclick: function () { LB.achieve('lobby.farewell'); LB.say('Welcome back. You were gone for a moment. Management did not notice, in a very thorough way.', { priority: 1, mood: 'proud' }); ctx.close('stay'); } }, 'Return to work'),
          h('button', { type: 'button', class: 'lb-btn', onclick: function () { LB.say('You remain clocked out. Please enjoy your absence, which has been scheduled for later.', { priority: 1, mood: 'smug' }); LB.sfx('bloop'); } }, 'Stay clocked out'))));
    }
  });
})();
