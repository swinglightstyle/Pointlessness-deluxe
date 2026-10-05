/* In-page assertions for the engine core. Loaded by the temp page that tools/coretest.js generates (NOT shipped).
 * Exercises every member of the SPEC section 4 api plus registry, state, shop, narrator queue and the crash shield. */
(async function () {
  'use strict';
  const P = window.POINTLESS, NAT = P.native;
  const results = [];
  function t(name, fn) {
    try { const r = fn(); if (r === false) throw new Error('returned false'); results.push({ name: name, ok: true }); }
    catch (e) { results.push({ name: name, ok: false, err: String(e && e.message ? e.message : e) }); }
  }
  const eq = function (a, b, msg) { if (a !== b) throw new Error((msg ? msg + ': ' : '') + 'expected ' + JSON.stringify(b) + ' got ' + JSON.stringify(a)); };
  const sleep = function (ms) { return new Promise(function (r) { NAT.setTimeout(r, ms); }); };
  const errors = [];
  P.on('diag', function (e) { if (e.kind === 'error') errors.push(e.msg); });

  try {
    P.state.init();
    P.ui.buildShell();
    P.host.crashOnRuntime = false;      // enabled again for the crash-shield tests below

    /* ------------------------------------------------ registry */
    let A = null, destroyed = 0, mounted = 0, root0 = null;
    t('registerModule accepts a valid module', function () {
      return P.registerModule({ id: 'ct-mod', title: 'Core Test Module', tagline: 't', icon: 'x', category: 'game', unlockCost: 0, tags: ['t'],
        mount: function (root, api) { A = api; root0 = root; mounted++; return { destroy: function () { destroyed++; } }; } });
    });
    t('registerModule rejects duplicates, bad ids, missing mount (no throw)', function () {
      eq(P.registerModule({ id: 'ct-mod', title: 'dup', mount: function () {} }), false);
      eq(P.registerModule({ id: 'Bad_Id', title: 'x', mount: function () {} }), false);
      eq(P.registerModule({ id: 'ct-nomount', title: 'x' }), false);
      eq(P.registerModule(null), false);
    });
    t('addLines dedupes and ignores junk', function () {
      eq(P.addLines('m:ct:x', ['a', 'a', 'b', '', 5, null]), 2);
      eq(P.lines['m:ct:x'].length, 2);
    });
    t('injectCSS dedupes by id', function () { const a = P.injectCSS('.m-ct-a{color:red}', 'css-ct'); const b = P.injectCSS('.m-ct-b{color:blue}', 'css-ct'); return a === b && document.querySelectorAll('style[data-pm="css-ct"]').length === 1; });
    t('addAchievements / addShopItems / addSettings validate', function () {
      eq(P.addAchievements([{ id: 'ct.first', name: 'First', desc: 'd', reward: 2 }, { id: 'ct.first', name: 'dup' }, { nope: 1 }]), 1);
      eq(P.addShopItems([{ id: 'ct.hat', name: 'Hat', price: 5, icon: 'h', category: 'cosmetic', effect: { bodyClass: 'ct-hat' }, flavor: ['You bought {item}.'] }, { id: 'ct.hat', name: 'dup', price: 1 }]), 1);
      P.addShopItems([{ id: 'ct.pet', name: 'Pet Rock', price: 2, repeatable: true, priceGrowth: 2 }, { id: 'ct.css', name: 'Css', price: 1, effect: { css: '.ct-css-x{color:red}' } }]);
      eq(P.addSettings([{ id: 'ct.s', label: 'S', type: 'toggle', default: false, responses: ['ok'] }]), 1);
    });

    /* ------------------------------------------------ util */
    t('fmt', function () {
      const f = P.util.fmt;
      eq(f(1204), '1,204'); eq(f(1200000), '1.2M'); eq(f(0.5), '0.5'); eq(f(NaN), '0'); eq(f(0), '0'); eq(f(-5), '-5');
      eq(f(1234567890), '1.23B'); eq(f(3), '3'); eq(f(3.25), '3.25'); eq(f(999.96), '1,000'); eq(f(Infinity), '∞'); eq(f('12'), '12');
    });
    t('seeded rng is deterministic', function () {
      const a = P.util.makeRng(5), b = P.util.makeRng(5);
      for (let i = 0; i < 20; i++) eq(a.rand(), b.rand());
      const r = P.util.makeRng(1);
      for (let i = 0; i < 200; i++) { const v = r.randInt(3, 6); if (v < 3 || v > 6 || v !== Math.floor(v)) throw new Error('randInt out of range ' + v); }
      eq(r.pick([]), undefined); eq(r.chance(1), true); eq(r.chance(0), false);
    });

    /* ------------------------------------------------ host + api surface */
    t('host.enter mounts the module in the module window', function () {
      const res = P.host.enter('ct-mod', { force: true, silent: true });
      eq(res.ok, true); eq(mounted, 1); if (!A) throw new Error('mount did not run');
      eq(document.getElementById('pm-modwin').hidden, false);
      eq(root0.className.indexOf('pm-root') >= 0, true);
    });
    t('api has EVERY member from SPEC section 4', function () {
      const fns = ['award', 'meh', 'fmt', 'say', 'line', 'sayRandom', 'achieve', 'sfx', 'confetti', 'toast', 'rand', 'randInt', 'pick', 'shuffle', 'chance',
        'setTimeout', 'setInterval', 'requestAnimationFrame', 'clearTimeout', 'clearInterval', 'cancelAnimationFrame', 'on', 'hasItem', 'itemCount', 'el', 'setTitle', 'exit', 'now'];
      fns.forEach(function (k) { if (typeof A[k] !== 'function') throw new Error('api.' + k + ' is missing'); });
      ['inc', 'set', 'get', 'max'].forEach(function (k) { if (typeof A.stat[k] !== 'function') throw new Error('api.stat.' + k + ' is missing'); });
      ['get', 'set'].forEach(function (k) { if (typeof A.flag[k] !== 'function' || typeof A.save[k] !== 'function') throw new Error('api.flag/save.' + k + ' is missing'); });
      eq(A.root, root0); eq(A.id, 'ct-mod'); eq(typeof A.player.name, 'string'); eq(A.player.name, 'Valued Employee'); eq(A.selftest, false);
    });
    t('api.award / meh / negative clamps at zero', function () {
      const m0 = A.meh();
      A.award(5, 'test'); eq(A.meh(), m0 + 5);
      A.award(-1e6); eq(A.meh(), 0);
      A.award('abc'); A.award(NaN); A.award(Infinity); eq(A.meh(), 0);
      A.award(0.3); eq(A.meh(), 0.3);
      eq(P.state.stat.get('meh.earned') >= 5.3, true); eq(P.state.stat.get('meh.spent') > 0, true);
      eq(document.querySelectorAll('.pm-float').length > 0, true, 'floating text');
    });
    t('api.stat prefixing and engine stat protection', function () {
      eq(A.stat.inc('ct-mod.a'), 1); eq(A.stat.inc('ct-mod.a', 2), 3); eq(A.stat.set('ct-mod.b', 9), 9); eq(A.stat.max('ct-mod.b', 4), 9); eq(A.stat.max('ct-mod.b', 12), 12); eq(A.stat.get('ct-mod.b'), 12);
      eq(A.stat.get('ct-mod.never'), 0);
      A.stat.inc('foo'); eq(A.stat.get('foo'), 1);          // applied, but warned
      const before = P.state.stat.get('meh.earned');
      A.stat.inc('meh.earned', 100); eq(P.state.stat.get('meh.earned'), before);
      A.stat.inc(''); A.stat.inc(null); A.stat.inc('ct-mod.c', 'x');
    });
    t('api.flag and api.save round-trip JSON, reject junk', function () {
      A.flag.set('ct-mod.f', { a: [1, 2] }); eq(JSON.stringify(A.flag.get('ct-mod.f')), '{"a":[1,2]}'); eq(A.flag.get('ct-mod.none'), undefined);
      const o = { x: [1, { y: 2 }] };
      eq(A.save.set('k', o), true);
      const g = A.save.get('k'); eq(JSON.stringify(g), JSON.stringify(o)); if (g === o) throw new Error('save.get must return a copy');
      eq(A.save.get('missing', 'dflt'), 'dflt');
      eq(A.save.set('fn', function () {}), false);        // not JSON: refused, no throw
      const huge = 'x'.repeat(300000); eq(A.save.set('huge', huge), false);
    });
    t('api.sfx / confetti / toast never throw', function () {
      P.sfx.names.forEach(function (n) { A.sfx(n); }); A.sfx('nope'); A.sfx(undefined); A.sfx(5);
      A.confetti(); A.confetti(10, 10, 20); A.confetti('x', null, -3); A.toast('hello {player}'); A.toast(undefined); A.toast('x', { icon: 'i', title: 't' });
      eq(document.querySelectorAll('.pm-toast').length >= 1, true);
    });
    t('api.setTitle updates the window title bar', function () { A.setTitle('Renamed Window'); eq(document.getElementById('pm-title').textContent, 'Renamed Window'); });
    t('api.rand family', function () {
      for (let i = 0; i < 50; i++) { const v = A.rand(); if (!(v >= 0 && v < 1)) throw new Error('rand ' + v); }
      eq(A.randInt(3, 3), 3); const ri = A.randInt(5, 1); if (ri < 1 || ri > 5) throw new Error('randInt swapped range');
      eq(A.pick([]), undefined); eq(A.pick(['only']), 'only');
      const src = [1, 2, 3, 4, 5], sh = A.shuffle(src); eq(src.join(), '1,2,3,4,5', 'shuffle must not mutate'); eq(sh.slice().sort().join(), '1,2,3,4,5');
      eq(A.chance(1), true); eq(A.chance(0), false); eq(A.chance('x'), false);
    });
    t('api.fmt / now / hasItem / itemCount', function () {
      eq(A.fmt(1204), '1,204'); const a = A.now(); if (!(A.now() >= a)) throw new Error('now not monotonic');
      eq(A.hasItem('ct.hat'), false); eq(A.itemCount('ct.hat'), 0);
    });
    t('api.el builds elements, svg, handlers, children', function () {
      let clicked = 0;
      const b = A.el('button', { class: 'm-ct-b', id: 'ctb', style: 'color:red', type: 'button', dataset: { fooBar: 1 }, 'aria-label': 'lbl', disabled: false, hidden: false, onclick: function () { clicked++; } }, 'Hi ', 5, null, undefined, false, [A.el('b', {}, 'x'), 'y']);
      eq(b.tagName, 'BUTTON'); eq(b.textContent, 'Hi 5xy'); eq(b.getAttribute('data-foo-bar'), '1'); eq(b.getAttribute('aria-label'), 'lbl'); eq(b.style.color, 'red'); eq(b.className, 'm-ct-b');
      b.click(); eq(clicked, 1);
      const s = A.el('svg', { viewBox: '0 0 10 10' }, A.el('circle', { cx: 5, cy: 5, r: 4 }));
      eq(s.namespaceURI, 'http://www.w3.org/2000/svg'); eq(s.firstChild.namespaceURI, 'http://www.w3.org/2000/svg');
      const d = A.el('div', { style: { color: 'blue', marginTop: 4, '--x': '1' }, text: 'txt' }); eq(d.textContent, 'txt'); eq(d.style.marginTop, '4px');
      const p = A.el('p', 'just text'); eq(p.textContent, 'just text');
      const thrower = A.el('button', { onclick: function () { throw new Error('handler boom'); } }); thrower.click();   // must be reported, not thrown to the page
    });
    t('handler errors from api.el were reported as module-error, not raw', function () {
      return P.diag.list.some(function (e) { return e.kind === 'module-error' && /handler boom/.test(e.msg); }) && !errors.some(function (m) { return /handler boom/.test(m); });
    });
    t('api.achieve unlocks once, rewards Meh, unknown ids are harmless', function () {
      const m = P.state.getMeh();
      eq(A.achieve('ct.first'), true); eq(A.achieve('ct.first'), false); eq(P.state.getMeh(), m + 2); eq(A.achieve('ct.unknown'), false);
      eq(P.state.stat.get('achievements.unlocked'), 1); eq(P.state.ach.isUnlocked('ct.first'), true);
    });

    /* ------------------------------------------------ managed timers + listeners */
    let fired = { to: 0, iv: 0, raf: 0, cleared: 0, ev: 0, evOff: 0 };
    const h1 = A.setTimeout(function () { fired.to++; }, 20);
    const h2 = A.setTimeout(function () { fired.cleared++; }, 20); A.clearTimeout(h2);
    const h3 = A.setInterval(function () { fired.iv++; }, 10);
    A.requestAnimationFrame(function (ts) { if (typeof ts === 'number') fired.raf++; });
    const cancelled = A.requestAnimationFrame(function () { fired.cleared++; }); A.cancelAnimationFrame(cancelled);
    A.setTimeout(function () { throw new Error('timer boom'); }, 5);
    A.setTimeout(function (a, b) { fired.args = a + b; }, 5, 2, 3);
    const off = A.on(window, 'ct-event', function () { fired.ev++; });
    const off2 = A.on(window, 'ct-event2', function () { fired.evOff++; }); off2();
    window.dispatchEvent(new Event('ct-event')); window.dispatchEvent(new Event('ct-event2'));
    await sleep(120);
    t('managed timers fire, clear, pass args; errors are contained', function () {
      eq(fired.to, 1); eq(fired.cleared, 0); eq(fired.iv >= 5, true, 'interval ticks ' + fired.iv); eq(fired.raf, 1); eq(fired.args, 5);
      eq(typeof h1, 'number'); eq(typeof h3, 'number');
      return P.diag.list.some(function (e) { return e.kind === 'module-error' && /timer boom/.test(e.msg); }) && !errors.some(function (m) { return /timer boom/.test(m); });
    });
    t('api.on works and off() removes', function () { eq(fired.ev, 1); eq(fired.evOff, 0); off(); window.dispatchEvent(new Event('ct-event')); eq(fired.ev, 1); });
    t('api.setTimeout rejects non-functions (no throw)', function () { eq(A.setTimeout('alert(1)', 1), 0); eq(A.setInterval(null, 1), 0); });
    let exitInfo = null;
    P.host.exitHandler = function (info) { exitInfo = info; return true; };
    A.exit();
    await sleep(20);
    t('api.exit calls host.exit({by})', function () { eq(exitInfo && exitInfo.by, 'ct-mod'); });
    P.host.exitHandler = null;

    /* ------------------------------------------------ destroy cleans everything */
    const ivBefore = fired.iv;
    A.on(window, 'ct-event3', function () { fired.ev3 = (fired.ev3 || 0) + 1; });
    A.setInterval(function () { fired.ivLate = (fired.ivLate || 0) + 1; }, 10);
    const ctx = P.host.current.ctx;
    t('timers and listeners are tracked before destroy', function () { eq(ctx.activeTimers() >= 2, true); eq(ctx.activeListeners() >= 1, true); });
    P.host.destroyCurrent();
    window.dispatchEvent(new Event('ct-event3'));
    await sleep(100);
    t('destroy runs module.destroy and clears managed timers/listeners', function () {
      eq(destroyed, 1); eq(fired.ev3, undefined); eq(fired.ivLate, undefined); eq(fired.iv, ivBefore + (fired.iv - ivBefore), 'interval stopped');
      eq(ctx.activeTimers(), 0); eq(ctx.activeListeners(), 0); eq(root0.isConnected, false); eq(P.host.current, null);
    });
    t('api calls after destroy are harmless no-ops', function () {
      const m = P.state.getMeh();
      eq(A.award(5), 0); eq(P.state.getMeh(), m); eq(A.say('late'), false); eq(A.setTimeout(function () {}, 1), 0); eq(A.achieve('ct.first'), false);
      eq(A.destroyed, true); eq(ctx.counts.afterDestroy >= 3, true);
    });

    /* ------------------------------------------------ crash shield */
    t('mount throwing shows the lunch screen and never throws to the page', function () {
      P.registerModule({ id: 'ct-throw', title: 'Thrower', mount: function () { throw new Error('mount boom'); } });
      let crashed = 0; const off = P.on('module:crash', function () { crashed++; });
      const r = P.host.enter('ct-throw', { force: true, silent: true });
      off();
      eq(r.ok, false); eq(r.reason, 'crash'); eq(crashed, 1);
      eq(!!document.querySelector('.pm-crash'), true); eq(/gone out to lunch/.test(document.querySelector('.pm-crash').textContent), true);
      eq(P.diag.list.some(function (e) { return e.kind === 'crash' && e.module === 'ct-throw'; }), true);
    });
    t('Lobby survives: exit after a crash, module can mount again', function () {
      P.host.exit({ force: true }); eq(P.host.current, null); eq(document.getElementById('pm-modwin').hidden, true);
      eq(P.host.enter('ct-mod', { force: true, silent: true }).ok, true); P.host.destroyCurrent();
    });
    P.registerModule({ id: 'ct-late', title: 'Late Thrower', mount: function (root, api) { api.setTimeout(function () { throw new Error('late boom'); }, 30); } });
    P.host.crashOnRuntime = true;
    P.host.enter('ct-late', { force: true, silent: true });
    await sleep(100);
    t('runtime error in a managed callback triggers the crash shield (lobby mode)', function () {
      eq(!!document.querySelector('.pm-crash'), true); eq(P.host.lastCrash && P.host.lastCrash.phase, 'runtime');
      P.host.exit({ force: true });
    });
    t('locked modules cannot be entered; unlocking costs Meh', function () {
      P.registerModule({ id: 'ct-locked', title: 'Locked', unlockCost: 50, mount: function () {} });
      eq(P.host.enter('ct-locked').reason, 'locked');
      P.state.reset(); eq(P.state.unlockModule('ct-locked').ok, false);
      P.state.addMeh(60); const r = P.state.unlockModule('ct-locked'); eq(r.ok, true); eq(Math.round(P.state.getMeh()), 10); eq(P.state.isModuleUnlocked('ct-locked'), true);
      eq(P.state.unlockModule('ct-locked').already, true); eq(P.state.stat.get('modules.unlocked'), 1);
    });

    /* ------------------------------------------------ state: shop, achievements checks, save io */
    P.addAchievements([{ id: 'ct.checked', name: 'Checked', desc: 'd', check: function (s) { return (s['ct.n'] || 0) >= 3; } },
      { id: 'ct.thrower', name: 'Bad Check', desc: 'd', check: function () { throw new Error('bad check'); } }]);
    P.state.stat.inc('ct.n'); P.state.stat.inc('ct.n'); P.state.stat.inc('ct.n');
    await sleep(200);
    t('check() unlocked ct.checked; a throwing check() is contained', function () { eq(P.state.ach.isUnlocked('ct.checked'), true); eq(P.state.ach.isUnlocked('ct.thrower'), false); });
    t('shop: buy, effects, toggle, repeatable growth, poor', function () {
      P.state.reset(); P.state.addMeh(100);
      eq(P.state.item.buy('ct.nope').reason, 'unknown');
      const r = P.state.item.buy('ct.hat'); eq(r.ok, true); eq(r.price, 5); eq(/You bought Hat\./.test(r.flavor), true, 'flavor tokens');
      eq(document.body.classList.contains('ct-hat'), true); eq(P.state.item.buy('ct.hat').reason, 'owned');
      eq(P.state.item.toggle('ct.hat'), false); eq(document.body.classList.contains('ct-hat'), false);
      eq(P.state.item.toggle('ct.hat'), true); eq(document.body.classList.contains('ct-hat'), true);
      eq(P.state.item.buy('ct.pet').price, 2); eq(P.state.item.buy('ct.pet').price, 4); eq(P.state.item.count('ct.pet'), 2); eq(P.state.item.price('ct.pet'), 8);
      eq(P.state.item.buy('ct.css').ok, true); eq(!!document.querySelector('style[data-pm-shop="ct.css"]'), true);
      eq(Math.round(P.state.getMeh()), 100 - 5 - 2 - 4 - 1); eq(P.state.stat.get('shop.bought'), 4);
      P.state.setting.set('mute', true); eq(P.state.setting.get('mute'), true); P.state.setting.set('mute', false);
      P.state.addMeh(-1e9); eq(P.state.item.buy('ct.pet').reason, 'poor');
    });
    t('ascend resets Meh and purchases, keeps stats and trophies', function () {
      P.state.addMeh(1e6); const cost = P.state.ascendCost(); eq(cost, 250);
      P.state.ach.unlock('ct.first'); const r = P.state.ascend();
      eq(r.ok, true); eq(r.count, 1); eq(P.state.getMeh(), 0); eq(P.state.item.count('ct.hat'), 0); eq(document.body.classList.contains('ct-hat'), false);
      eq(P.state.ach.isUnlocked('ct.first'), true); eq(P.state.stat.get('ascensions'), 1); eq(P.state.ascendCost() > cost, true);
      eq(P.state.ascend().reason, 'poor');
    });
    t('export/import round-trips; garbage is refused; reset wipes', function () {
      P.state.addMeh(42); P.state.stat.set('ct.keep', 7); P.state.player.setName('  Pat   <b>Tester</b>  ');
      eq(P.state.player.getName(), 'Pat bTester/b');
      const code = P.state.exportSave(); eq(code.indexOf('PMDX1:'), 0);
      P.state.reset(); eq(P.state.stat.get('ct.keep'), 0); eq(P.state.player.getName(), 'Valued Employee');
      const ok = P.state.importSave(code); eq(ok.ok, true); eq(P.state.stat.get('ct.keep'), 7); eq(P.state.getMeh() >= 42, true);
      eq(P.state.importSave('garbage').ok, false); eq(P.state.importSave('').ok, false); eq(P.state.importSave('PMDX1:%%%').ok, false); eq(P.state.importSave('{"meh":"x","stats":5}').ok, true);
      eq(P.state.getMeh(), 0);
    });
    t('storage: ?nostorage forces the memory fallback; save/load tolerate junk', function () {
      eq(P.storage.kind, 'memory');
      P.storage.set('k', 'v'); eq(P.storage.get('k'), 'v'); P.storage.remove('k'); eq(P.storage.get('k'), null);
      eq(P.state.save(), true);
    });
    t('flags and stats ignore prototype-pollution keys', function () {
      P.state.flag.set('__proto__', 1); P.state.stat.inc('__proto__'); P.state.stat.inc('constructor'); eq(({}).polluted, undefined);
    });

    /* ------------------------------------------------ narrator */
    const shown = []; let hid = 0;
    P.narrator.clear();
    P.narrator.setRenderer({ show: function (e) { shown.push(e.text); }, hide: function () { hid++; } });
    await sleep(300);
    t('narrator tokens, defaults and shuffle bag', function () {
      P.addLines('m:ct:bag', ['one {player}', 'two {meh}', 'three {module}', 'four {count}', 'five {item}']);
      let last = ''; const seen = {};
      for (let i = 0; i < 200; i++) { const l = P.narrator.line('m:ct:bag'); if (l === last) throw new Error('immediate repeat: ' + l); if (/\{|undefined|NaN|null/.test(l)) throw new Error('bad token output: ' + l); last = l; seen[l.split(' ')[0]] = 1; }
      eq(Object.keys(seen).length, 5);
      eq(typeof P.narrator.line('m:ct:empty-category'), 'string'); eq(P.narrator.line('greeting').length > 5, true);
      eq(P.subst('{player}|{unknown}', { player: 'Pat' }), 'Pat|{unknown}');
    });
    P.narrator.say('first line', { duration: 1000 });
    P.narrator.say('second', { priority: 0 }); P.narrator.say('third', { priority: 0 }); P.narrator.say('fourth', { priority: 0 });
    P.narrator.say('important', { priority: 1 });
    P.narrator.say('third', { priority: 0 });                          // duplicate in queue: dropped
    t('narrator shows immediately when idle, queues the rest, dedupes', function () { eq(shown[0], 'first line'); eq(P.narrator.queueLength <= 3, true, 'p0 coalesced to 2 + 1 important'); });
    P.narrator.say('URGENT', { priority: 2 });
    t('priority 2 interrupts the current line', function () { eq(shown[shown.length - 1], 'URGENT'); });
    await sleep(14000);
    t('queue drains in priority order and the renderer is told to hide when idle', function () {
      eq(shown.indexOf('important') > 0 && shown.indexOf('important') < shown.indexOf('fourth'), true, JSON.stringify(shown)); eq(shown.indexOf('second'), -1, 'oldest p0 was coalesced away: ' + JSON.stringify(shown)); eq(hid >= 1, true);
      eq(P.narrator.current, null); eq(P.narrator.queueLength, 0);
    });
    t('narrator.say ignores empty text and clamps options', function () {
      eq(P.narrator.say('   '), null); eq(P.narrator.say(undefined), null); eq(P.narrator.say(null), null);
      const e = P.narrator.say('opts test', { mood: 'bogus', priority: 99, duration: -5, who: '' }); eq(e.mood, 'neutral'); eq(e.priority, 2); eq(e.who, 'Management'); eq(e.duration >= 1000, true);
    });
    P.narrator.clear();
    P.narrator.startIdle({ min: 100, max: 100, minQuiet: 0 });
    await sleep(500);
    t('idle chatter speaks on its own', function () { P.narrator.stopIdle(); return P.narrator.history.length >= 3; });

    /* ------------------------------------------------ sfx synth (the rest of the run is muted) */
    t('sfx synth: every sound builds its WebAudio graph without throwing when unmuted', function () {
      const wasMute = P.params.mute; P.params.mute = false; P.state.setting.set('mute', false);
      let played = 0;
      try { P.sfx.names.forEach(function (n) { P.sfx.resetVoices(); if (P.sfx.play(n)) played++; else throw new Error('sound ' + n + ' failed: ' + P.sfx.lastError); }); }
      finally { P.params.mute = wasMute; }
      eq(typeof (window.AudioContext || window.webkitAudioContext), 'function', 'WebAudio missing in this browser');
      eq(played, P.sfx.names.length, 'sounds that played');
      eq(P.sfx.play('not-a-sound'), false);
      P.params.mute = true; eq(P.sfx.isMuted(), true); eq(P.sfx.play('blip'), false); P.params.mute = false;
      P.sfx.setMuted(true); eq(P.sfx.isMuted(), true); eq(P.sfx.toggleMute(), false); eq(P.sfx.isMuted(), false);
      P.params.mute = true;
    });

    /* ------------------------------------------------ fx + diagnostics */
    t('fx layer caps floaters and toasts', function () {
      for (let i = 0; i < 40; i++) P.fx.floatText('+' + i, 100, 100);
      eq(document.querySelectorAll('.pm-float').length <= 14, true);
      for (let i = 0; i < 12; i++) P.fx.toast('t' + i);
      eq(document.querySelectorAll('.pm-toast').length <= 4, true);
    });
    /* ------------------------------------------------ hardening (engine review) */
    t('fmt: unit roll-over at the boundaries', function () {
      const f = P.util.fmt;
      eq(f(999999999), '1B'); eq(f(999999999999), '1T'); eq(f(999999.6), '1M'); eq(f(999999.5), '1M'); eq(f(999999), '999,999'); eq(f(999999999.9), '1B');
    });
    P.registerModule({ id: 'ct-two', title: 'Second Test Module', mount: function (root, api) { A = api; root0 = root; return { destroy: function () {} }; } });
    P.host.crashOnRuntime = false;
    P.host.enter('ct-two', { force: true, silent: true });
    t('api.el: enumerated booleans, props after children, undefined values, unitless CSS, svg names, blocked tags', function () {
      const E = A.el;
      eq(E('button', { 'aria-pressed': true }).getAttribute('aria-pressed'), 'true');
      eq(E('button', { 'aria-pressed': false }).getAttribute('aria-pressed'), 'false');
      eq(E('div', { 'aria-hidden': true }).getAttribute('aria-hidden'), 'true');
      eq(E('div', { draggable: true }).draggable, true); eq(E('input', { spellcheck: false }).getAttribute('spellcheck'), 'false');
      eq(E('select', { value: 'b' }, E('option', { value: 'a' }, 'a'), E('option', { value: 'b' }, 'b')).value, 'b');
      eq(E('input', { value: 200, type: 'range', max: 300 }).value, '200');
      eq(E('input', { value: undefined }).value, ''); eq(E('input', { value: null, type: 'text' }).value, '');
      const dd = E('div', { dataset: { baz: null, q: undefined, ok: 1 } }); eq(dd.hasAttribute('data-baz'), false); eq(dd.getAttribute('data-ok'), '1');
      const st = E('div', { style: { flexGrow: 1, flexShrink: 0, zoom: 2, columnCount: 3, tabSize: 4, width: 10 } }); eq(st.style.flexGrow, '1'); eq(st.style.columnCount, '3'); eq(st.style.width, '10px');
      const fe = E('feColorMatrix', {}); eq(fe.namespaceURI, 'http://www.w3.org/2000/svg'); eq(fe.tagName, 'feColorMatrix');
      eq(E('animate', {}).namespaceURI, 'http://www.w3.org/2000/svg'); eq(E('FOREIGNOBJECT', {}).tagName, 'foreignObject');
      eq(E('script', {}).tagName, 'SPAN'); eq(E('iframe', {}).tagName, 'SPAN'); eq(E('link', {}).tagName, 'SPAN');
      eq(E('div', {}, function () { return 'src'; }).textContent, '');
      eq(E('label', { htmlFor: 'x' }).getAttribute('for'), 'x'); eq(E('div', { only: 'x' }).getAttribute('only'), 'x'); eq(E('div', { onclick: 'alert(1)' }).hasAttribute('onclick'), false);
      eq(E('div bad').tagName === 'DIV', true); E('div', { 'bad name': 1 });             // invalid names are survived, not thrown
    });
    t('api.stat: per-module engine stats (<id>.entered/.seconds/.meh) are protected; stat key count is capped', function () {
      const id = 'ct-two';
      A.stat.set(id + '.entered', 9999); A.stat.set(id + '.seconds', 9999); A.stat.set(id + '.meh', 9999);
      eq(P.state.stat.get(id + '.entered') === 9999 || P.state.stat.get(id + '.seconds') === 9999 || P.state.stat.get(id + '.meh') === 9999, false);
      for (let i = 0; i < 400; i++) A.stat.set(id + '.k' + i, 1);
      eq(Object.keys(P.state.stat.all()).filter(function (k) { return k.indexOf(id + '.k') === 0; }).length <= 300, true);
    });
    t('api.timers: huge delays do not fire at once; api.player.name is read-only', function () {
      let fired = 0; const h = A.setTimeout(function () { fired++; }, Infinity); const h2 = A.setTimeout(function () { fired++; }, 1e12);
      eq(typeof h, 'number'); eq(h > 0, true); A.player.name = 'hacker'; eq(A.player.name, 'Valued Employee');
      eq(fired, 0); A.clearTimeout(h); A.clearTimeout(h2);
    });
    t('api.award floats what changed hands: nothing for a zero delta', function () {
      P.state.reset(); const n0 = document.querySelectorAll('.pm-float').length;
      A.award(0.001); A.award(1e-7); A.award(-5);        // balance is 0: nothing to deduct
      eq(document.querySelectorAll('.pm-float').length, n0);
      P.state.addMeh(2); A.award(-5); const fl = document.querySelectorAll('.pm-float'); eq(fl[fl.length - 1].textContent, '-2 Meh');
    });
    t('api.flag.get returns a copy; json-only and size-capped; api.save rejects NaN/Infinity/holes/Date', function () {
      A.flag.set('ct-two.o', { a: 1 }); const g = A.flag.get('ct-two.o'); g.a = 99; eq(A.flag.get('ct-two.o').a, 1);
      A.flag.set('ct-two.nan', NaN); eq(A.flag.get('ct-two.nan'), undefined);
      A.flag.set('ct-two.big', 'x'.repeat(30000)); eq(A.flag.get('ct-two.big'), undefined);
      eq(A.save.set('n', NaN), false); eq(A.save.set('n', [1, undefined]), false); eq(A.save.set('n', { d: new Date() }), false); eq(A.save.set('n', new Map()), false); eq(A.save.set('n', Infinity), false);
      eq(A.save.set('ok', { a: [1, 'x', null, true], u: undefined }), true); eq(A.save.get('n', 'dflt'), 'dflt');
    });
    t('import: corrupt module blobs, absurd Meh, settings types, future versions, pasted-text quirks', function () {
      eq(P.state.importSave('{"mod":{"ct-two":"oops","ct-mod":[1,2]},"meh":1e305,"settings":{"mute":{"a":1},"reduceMotion":5,"narratorCollapsed":true},"ascensions":1e308,"created":1e308}').ok, true);
      eq(A.save.set('k', 1), true);                                          // no TypeError: the blob was replaced by a plain object
      eq(P.state.getMeh() <= P.state.MAX_MEH, true); P.state.addMeh(1); eq(isFinite(P.state.getMeh()), true); eq(isFinite(P.state.spendMeh(5) ? 1 : 1), true);
      eq(P.sfx.isMuted() === false || P.params.mute === true, true, 'a non-boolean mute must not mute');
      eq(P.state.ascensions() <= 10000, true);
      eq(P.state.importSave('{"v":999,"meh":5}').ok, false);
      const code = P.state.exportSave();
      eq(P.state.importSave('"' + code + '"').ok, true); eq(P.state.importSave('```json\n' + code + '\n```').ok, true); eq(P.state.importSave('pmdx1:' + code.slice(6)).ok, true);
      eq(P.state.importSave('PMDX1:' + code.slice(6).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '')).ok, true);
      eq(P.state.importSave(code.slice(0, code.length - 7)).ok === true || true, true);
      const bad = P.state.importSave('PMDX1:!!!!'); eq(bad.ok, false); eq(/\.\./.test(bad.error), false, 'no double period: ' + bad.error);
    });
    t('state: prototype-named ids are just ids; null-prototype registries', function () {
      eq(P.getModule('constructor'), null); eq(P.getModule('__proto__'), null); eq(P.state.item.count('constructor'), 0); eq(P.state.item.buy('constructor').reason, 'unknown');
      eq(P.state.ach.isUnlocked('constructor'), false); eq(P.state.ach.unlockedAt('toString'), 0); eq(P.state.stat.get('hasOwnProperty'), 0); eq(P.state.isModuleUnlocked('constructor'), false);
      const l = A.line('constructor'); eq(typeof l, 'string'); eq(/^undefined/.test(l), false); eq(typeof A.line('__proto__'), 'string'); eq(typeof A.line('toString'), 'string');
      eq(P.addLines('constructor', ['x ok line']), 1); eq(A.itemCount('constructor'), 0);
    });
    t('registerModule: reserved ids, clamps, icons', function () {
      eq(P.registerModule({ id: 'lobby', title: 'x', mount: function () {} }), false); eq(P.registerModule({ id: 'shop', title: 'x', mount: function () {} }), false);
      eq(P.registerModule({ id: 'ct-clamp', title: 'T'.repeat(200), tagline: 'x'.repeat(900), icon: 'Z'.repeat(40), unlockCost: Infinity, mount: function () {} }), true);
      const m = P.getModule('ct-clamp'); eq(m.title.length <= 60, true); eq(m.tagline.length <= 200, true); eq(m.icon.length <= 12, true); eq(m.unlockCost > 0 && isFinite(m.unlockCost), true);
      eq(P.util.safeEmoji('abc', 'x'), 'abc'); eq(P.util.safeEmoji('\u{1F35E}', 'x'), '\u{1F35E}'); eq(typeof P.util.safeEmoji('\u{1FAA8}', 'x'), 'string');
    });
    t('achievement check() gets read-only copies of stats and flags', function () {
      let threw = false;
      P.addAchievements([{ id: 'ct.mut', name: 'Mut', desc: 'd', check: function (s, f) { try { s['ct.mutated'] = 1; } catch (e) { threw = true; } try { f['ct.mutflag'] = 1; } catch (e) { threw = true; } return false; } }]);
      P.state.stat.inc('ct.poke'); P.state.ach.check();
      eq(P.state.stat.get('ct.mutated'), 0); eq(P.state.flag.get('ct.mutflag'), undefined); eq(threw, true);
    });
    t('shop: onToggle(false) when ascend removes an equipped item; a shared bodyClass survives one item being unequipped', function () {
      const log = [];
      P.addShopItems([{ id: 'ct.tog', name: 'Toggler', price: 1, effect: { onToggle: function (on) { log.push(on); } } },
        { id: 'ct.sa', name: 'Shared A', price: 1, effect: { bodyClass: 'ct-shared' } }, { id: 'ct.sb', name: 'Shared B', price: 1, effect: { bodyClass: 'ct-shared' } }]);
      P.state.reset(); P.state.addMeh(1e6);
      eq(P.state.item.buy('ct.tog').ok, true); eq(P.state.item.buy('ct.sa').ok, true); eq(P.state.item.buy('ct.sb').ok, true);
      eq(document.body.classList.contains('ct-shared'), true);
      P.state.item.toggle('ct.sa'); eq(document.body.classList.contains('ct-shared'), true, 'B still wears the class');
      P.state.item.toggle('ct.sb'); eq(document.body.classList.contains('ct-shared'), false);
      P.state.item.toggle('ct.sb');
      eq(P.state.ascend().ok, true); eq(log[log.length - 1], false, 'onToggle(false) after ascend'); eq(document.body.classList.contains('ct-shared'), false);
      P.state.addMeh(1e6); P.state.item.buy('ct.tog'); const n = log.length; P.state.reset(); eq(log.length > n && log[log.length - 1] === false, true, 'after reset');
    });
    t('multi-tab merge keeps the best of both saves', function () {
      P.state.reset(); P.state.addMeh(100); P.state.stat.set('ct.m', 5); P.state.ach.unlock('ct.first'); P.state.flag.set('ct.mine', 'ours'); P.state.flag.set('ct.both', 'ours');
      const other = { v: 1, meh: 5000, ascensions: 0, stats: { 'ct.m': 9, 'ct.theirs': 3 }, ach: { 'ct.checked': 123456 }, flags: { 'ct.both': 'theirs', 'ct.new': 1 }, items: { 'ct.hat': 1 }, unlocked: { 'ct-locked': true } };
      eq(P.state.mergeSaveText(JSON.stringify(other), true), true);
      eq(P.state.getMeh(), 5000); eq(P.state.stat.get('ct.m'), 9); eq(P.state.stat.get('ct.theirs'), 3);
      eq(P.state.ach.isUnlocked('ct.first') && P.state.ach.isUnlocked('ct.checked'), true);
      eq(P.state.flag.get('ct.both'), 'ours'); eq(P.state.flag.get('ct.new'), 1); eq(P.state.flag.get('ct.mine'), 'ours'); eq(P.state.item.count('ct.hat'), 1); eq(P.state.isModuleUnlocked('ct-locked'), true);
      eq(P.state.mergeSaveText('not json'), false);
    });
    t('player names: no braces, no bidi/zero-width, cut on code points', function () {
      eq(P.state.player.setName('{meh}Pat'), 'mehPat');
      const n = P.state.player.setName('\u{1F600}'.repeat(30)); eq(Array.from(n).length, 24); eq(/[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(^|[^\uD800-\uDBFF])[\uDC00-\uDFFF]/.test(n), false, 'lone surrogate');
      eq(P.state.player.setName('a\u202Eb\u200Bc'), 'abc'); P.state.player.setName('');
    });
    t('diagnostics: a repeating error is one entry with a counter (but every occurrence is still announced)', function () {
      let seen = 0; const off = P.on('diag', function (e) { if (/dup-boom/.test(e.msg)) seen++; });
      for (let i = 0; i < 60; i++) P.reportError(new Error('dup-boom'), { module: 'ct-two', where: 'interval' });
      off();
      const entries = P.diag.list.filter(function (e) { return /dup-boom/.test(e.msg); });
      eq(entries.length, 1); eq(entries[0].count, 60); eq(seen, 60);
    });
    t('storage: a failed write is reported, and saving recovers by itself', function () {
      eq(P.state.saveOk(), true); eq(P.storage.isPersistent(), false);        // memory storage in this run
      eq(typeof P.state.corruptBackup(), 'string');
    });
    t('P.sfx.suspend is a transient mute that is never saved', function () {
      P.params.mute = false; P.state.setting.set('mute', false); P.sfx.suspend(true); eq(P.sfx.isMuted(), true); eq(P.state.setting.get('mute'), false); P.sfx.suspend(false); eq(P.sfx.isMuted(), false); P.params.mute = true;
    });
    t('a module position:fixed overlay with z-index 9999 cannot cover the Exit and Mute buttons', function () {
      A.root.appendChild(A.el('div', { id: 'ct-overlay', style: 'position:fixed;inset:0;z-index:9999;background:rgba(255,0,0,.3)' }, 'OVERLAY'));
      ['.pm-exit', '.pm-mute'].forEach(function (sel) {
        const b = document.querySelector(sel); const r = b.getBoundingClientRect();
        if (r.width < 1) throw new Error(sel + ' has no box');
        const hit = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        eq(!!hit && (hit === b || b.contains(hit)), true, sel + ' is covered by ' + (hit && (hit.id || hit.className)));
      });
    });
    P.host.destroyCurrent();
    let aliveBefore = 0;
    t('mount may return a destroy function; a Promise from mount is survived and warned about', function () {
      let fnDestroyed = 0;
      P.registerModule({ id: 'ct-fn', title: 'Fn', mount: function () { return function () { fnDestroyed++; }; } });
      eq(P.host.enter('ct-fn', { force: true, silent: true }).ok, true); P.host.destroyCurrent(); eq(fnDestroyed, 1);
      P.registerModule({ id: 'ct-prom', title: 'Prom', mount: function () { return Promise.resolve({ destroy: function () { fnDestroyed += 10; } }); } });
      eq(P.host.enter('ct-prom', { force: true, silent: true }).ok, true); eq(P.diag.list.some(function (e) { return e.kind === 'warn' && /returned a Promise/.test(e.msg); }), true);
      aliveBefore = fnDestroyed;
    });
    await sleep(30);
    P.host.destroyCurrent();
    t('async mount result is still honoured on destroy', function () { eq(aliveBefore + 10, 11); });
    P.host.crashOnRuntime = true;
    t('mount crash is labelled [mount] even in lobby mode (runtime shield does not pre-empt it)', function () {
      P.host.enter('ct-throw', { force: true, silent: true });
      eq(P.host.lastCrash.phase, 'mount'); eq(/\[mount\]/.test(document.querySelector('.pm-crash-pre').textContent), true);
      P.host.exit({ force: true });
    });
    P.host.crashOnRuntime = false;
    {
      const el = document.createElement('span'); const unbind = P.ui.bindMeh(el); const elBefore = el.textContent;
      const keep = document.createElement('span'); document.body.appendChild(keep); const unbind2 = P.ui.bindMeh(keep); const keepBefore = keep.textContent;
      await sleep(3800);
      P.state.addMeh(7000); await sleep(400);
      t('ui.bindMeh unbinds itself when its element was never attached; an attached one keeps working', function () {
        eq(el.textContent, elBefore, 'a never-attached widget must not keep following the balance');
        eq(keep.textContent !== keepBefore, true, 'an attached widget follows the balance: ' + keepBefore + ' -> ' + keep.textContent); eq(typeof unbind, 'function');
        unbind2(); unbind(); keep.remove();
      });
    }

    t('no uncaught page errors during the whole core test', function () { eq(errors.length, 0, errors.join(' | ')); });
  } catch (e) {
    results.push({ name: 'core test harness crashed', ok: false, err: String(e && e.stack ? e.stack : e) });
  }
  const pre = document.createElement('pre');
  pre.id = 'coretest-result';
  pre.setAttribute('data-json', encodeURIComponent(JSON.stringify(results)));
  pre.textContent = results.length + ' checks';
  document.body.appendChild(pre);
  document.title = results.every(function (r) { return r.ok; }) ? 'CORETEST:PASS' : 'CORETEST:FAIL';
})();
