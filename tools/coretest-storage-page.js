/* In-page assertions for REAL localStorage behaviour (multi-tab merge, failed writes, save frequency, corrupt-save backup).
 * Loaded by the second temp page that tools/coretest.js generates (NOT shipped). The page pre-seeds an unreadable save BEFORE the engine loads. */
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

  try {
    P.state.init();
    if (P.storage.kind !== 'localStorage') {
      results.push({ name: 'localStorage is unavailable in this browser profile: storage tests skipped', ok: true });
    } else {
      const KEY = P.storage.saveKey(), STAMP = P.storage.stampKey();
      t('an unreadable save at load: set aside as a backup, fresh game, and the fresh save is persistent', function () {
        eq(P.state.corrupted, true); eq(P.state.corruptBackup(), '{this is not json'); eq(P.storage.isPersistent(), true); eq(P.state.saveOk(), true);
        eq(localStorage.getItem(KEY + ':corrupt-backup'), '{this is not json');
      });
      const origSet = Storage.prototype.setItem;
      let setCalls = 0, failKey = '';
      Storage.prototype.setItem = function (k, v) {
        if (k === KEY) setCalls++;
        if (failKey && k === failKey) { const e = new Error('The quota has been exceeded.'); e.name = 'QuotaExceededError'; throw e; }
        return origSet.call(this, k, v);
      };
      let saveEvents = [];
      P.on('save', function (e) { saveEvents.push(e.ok); });
      t('a failed write is not silent and recovers by itself', function () {
        P.state.addMeh(5);
        failKey = KEY; eq(P.state.save(), false); eq(P.state.saveOk(), false); eq(P.storage.isPersistent(), false); eq(saveEvents[saveEvents.length - 1], false);
        failKey = ''; eq(P.state.save(), true); eq(P.state.saveOk(), true); eq(P.storage.isPersistent(), true, 'degraded flag must clear after a successful write'); eq(saveEvents[saveEvents.length - 1], true);
      });
      t('a huge flag cannot fill the disk: it is refused instead of silently disabling saving', function () {
        for (let i = 0; i < 6; i++) P.state.flag.set('big' + i, 'x'.repeat(2e6));
        eq(P.state.save(), true); eq(JSON.stringify(P.state.data.flags).length < 160000, true);
      });
      t('another tab saved: the next write merges it instead of overwriting it', function () {
        P.state.reset(); P.state.addMeh(100); P.state.stat.set('mt.mine', 4); P.state.save();
        const stored = JSON.parse(localStorage.getItem(KEY));
        stored.meh = 5000; stored.stats['mt.theirs'] = 7; stored.stats['mt.mine'] = 9; stored.ach = { 'mt.a': 1700000000000 }; stored.flags = { 'mt.flag': 'theirs' };
        origSet.call(localStorage, KEY, JSON.stringify(stored)); origSet.call(localStorage, STAMP, 'othertab|' + Date.now());
        P.state.addMeh(3);                                  // this (stale) tab keeps playing
        P.state.save();
        const now = JSON.parse(localStorage.getItem(KEY));
        eq(now.meh >= 5000, true, 'the other tab\'s 5000 Meh must survive: ' + now.meh); eq(now.stats['mt.theirs'], 7); eq(now.stats['mt.mine'], 9); eq(!!now.ach['mt.a'], true); eq(now.flags['mt.flag'], 'theirs');
        eq(P.state.getMeh() >= 5000, true);
      });
      let syncs = 0; P.on('sync', function () { syncs++; });
      const rawBefore = localStorage.getItem(KEY);
      const other = JSON.parse(rawBefore); other.meh = 9e6; other.stats['mt.event'] = 1;
      origSet.call(localStorage, KEY, JSON.stringify(other)); origSet.call(localStorage, STAMP, 'othertab2|' + Date.now());
      window.dispatchEvent(new StorageEvent('storage', { key: KEY, newValue: JSON.stringify(other) }));
      await sleep(300);
      t('a storage event from another tab is merged live (no write needed) and announced', function () {
        eq(P.state.getMeh(), 9e6); eq(P.state.stat.get('mt.event'), 1); eq(syncs >= 1, true);
      });
      /* save frequency: time played and passive Meh must not re-write the whole save every second */
      const c0 = setCalls;
      for (let i = 0; i < 10; i++) { P.state.stat.inc('time.seconds'); P.state.addMeh(0.2, { passive: true }); await sleep(1000); }
      t('ticking values (time.seconds, passive Meh) are flushed rarely, not once per second', function () { eq(setCalls - c0 <= 2, true, 'saves during 10 idle seconds: ' + (setCalls - c0)); });
      const c1 = setCalls;
      P.state.stat.inc('mt.real'); await sleep(1200);
      t('a real change is still saved within a second or so', function () { eq(setCalls - c1 >= 1, true); eq(JSON.parse(localStorage.getItem(KEY)).stats['mt.real'], 1); });
      Storage.prototype.setItem = origSet;
    }
  } catch (e) {
    results.push({ name: 'storage test harness crashed', ok: false, err: String(e && e.stack ? e.stack : e) });
  }
  const pre = document.createElement('pre');
  pre.id = 'coretest-result';
  pre.setAttribute('data-json', encodeURIComponent(JSON.stringify(results)));
  pre.textContent = results.length + ' checks';
  document.body.appendChild(pre);
  document.title = results.every(function (r) { return r.ok; }) ? 'CORETEST:PASS' : 'CORETEST:FAIL';
})();
