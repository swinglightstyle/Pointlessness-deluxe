/* POINTLESS core 10: storage with in-memory fallback. localStorage is probed; every call is try/catch.
 * Selftest runs, ?nostorage=1 and blocked storage all use memory only. Never throws.
 * isPersistent() is false while the LAST write failed (it recovers by itself after a later write succeeds). */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const mem = Object.create(null);
  let ls = null;
  let degraded = false;
  let lastError = '';

  (function probe() {
    if (P.params.nostorage || P.params.mode === 'selftest') return;
    try {
      const s = window.localStorage;
      const k = '__pointless_probe__';
      s.setItem(k, '1');
      if (s.getItem(k) !== '1') return;
      s.removeItem(k);
      ls = s;
    } catch (e) { ls = null; }
  })();

  const storage = {
    kind: ls ? 'localStorage' : 'memory',
    isPersistent: function () { return !!ls && !degraded; },
    lastError: function () { return lastError; },
    get: function (key) {
      if (ls) {
        try { const v = ls.getItem(key); if (v !== null) return v; } catch (e) { degraded = true; lastError = String(e && e.message || e); }
      }
      return Object.prototype.hasOwnProperty.call(mem, key) ? mem[key] : null;
    },
    /** o.quiet: a failure does not flip isPersistent() (used for the best-effort corrupt-save backup). Returns false when the write did not reach the disk. */
    set: function (key, value, o) {
      value = String(value);
      mem[key] = value;
      if (ls) {
        try { ls.setItem(key, value); if (!(o && o.quiet)) { degraded = false; lastError = ''; } return true; }
        catch (e) { if (!(o && o.quiet)) { degraded = true; lastError = String(e && e.message || e); } return false; }
      }
      return true;
    },
    remove: function (key) {
      delete mem[key];
      if (ls) { try { ls.removeItem(key); } catch (e) { degraded = true; } }
    },
    /** key of the real save: dev gets its own throwaway namespace; selftest is memory-only anyway */
    saveKey: function () {
      const base = 'pointless-arcade-v1';
      if (P.params.mode === 'dev') return base + ':dev:' + P.params.target;
      if (P.params.mode === 'selftest') return base + ':selftest';
      return base;
    },
    /** key of the tiny "who wrote last" stamp used to notice another tab saving over this one */
    stampKey: function () { return storage.saveKey() + ':stamp'; }
  };
  P.storage = storage;
})();
