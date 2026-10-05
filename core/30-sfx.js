/* POINTLESS core 30: WebAudio sound synth. No audio files, ever.
 * Silent when muted (?mute=1, selftest, setting 'mute') or when WebAudio is unavailable. Never throws. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const NAT = P.native;
  let ctx = null, master = null, noiseBuf = null, active = 0, broken = false;
  const lastPlayed = {};

  let suspended = false;       // transient silence (boss key): never stored, so a crash cannot leave the game muted
  function muted() {
    if (P.params.mute || P.params.mode === 'selftest' || suspended) return true;
    try { return !!(P.state && P.state.setting.get('mute')); } catch (e) { return false; }
  }
  function ensure() {
    if (broken) return false;
    if (!ctx) {
      try {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (!AC) { broken = true; return false; }
        ctx = new AC();
        master = ctx.createGain();
        master.gain.value = 0.3;
        master.connect(ctx.destination);
      } catch (e) { broken = true; ctx = null; return false; }
    }
    try { if (ctx.state === 'suspended' && ctx.resume) { const p = ctx.resume(); if (p && p.catch) p.catch(function () {}); } } catch (e) { /* ignore */ }
    return true;
  }
  function getNoise() {
    if (noiseBuf) return noiseBuf;
    const len = Math.floor(ctx.sampleRate * 0.6);
    noiseBuf = ctx.createBuffer(1, len, ctx.sampleRate);
    const d = noiseBuf.getChannelData(0);
    let s = 1234567;
    for (let i = 0; i < len; i++) { s = (s * 1664525 + 1013904223) >>> 0; d[i] = (s / 4294967296) * 2 - 1; }
    return noiseBuf;
  }
  /* tone: oscillator with exponential frequency glide and a percussive envelope */
  function tone(type, f0, f1, t0, dur, vol, f2) {
    const o = ctx.createOscillator(), g = ctx.createGain();
    o.type = type;
    o.frequency.setValueAtTime(Math.max(20, f0), t0);
    if (f2) {
      o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t0 + dur * 0.4);
      o.frequency.exponentialRampToValueAtTime(Math.max(20, f2), t0 + dur);
    } else if (f1 && f1 !== f0) o.frequency.exponentialRampToValueAtTime(Math.max(20, f1), t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), t0 + 0.006);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    o.connect(g); g.connect(master);
    o.start(t0); o.stop(t0 + dur + 0.03);
    active++; o.onended = function () { active = Math.max(0, active - 1); };
  }
  function noise(t0, dur, vol, ftype, fa, fb) {
    const s = ctx.createBufferSource(), f = ctx.createBiquadFilter(), g = ctx.createGain();
    s.buffer = getNoise();
    f.type = ftype; f.frequency.setValueAtTime(fa, t0); f.Q.value = 1.2;
    if (fb) f.frequency.exponentialRampToValueAtTime(fb, t0 + dur);
    g.gain.setValueAtTime(0.0001, t0);
    g.gain.exponentialRampToValueAtTime(Math.max(0.0002, vol), t0 + 0.01);
    g.gain.exponentialRampToValueAtTime(0.0001, t0 + dur);
    s.connect(f); f.connect(g); g.connect(master);
    s.start(t0); s.stop(t0 + dur + 0.03);
    active++; s.onended = function () { active = Math.max(0, active - 1); };
  }

  const R = {
    blip: function (t) { tone('square', 880, 1180, t, 0.07, 0.16); },
    bloop: function (t) { tone('sine', 280, 640, t, 0.14, 0.3); },
    ding: function (t) { tone('sine', 1318, 1318, t, 0.5, 0.26); tone('sine', 1976, 1976, t, 0.32, 0.1); },
    honk: function (t) { tone('sawtooth', 233, 207, t, 0.28, 0.2); tone('square', 311, 277, t, 0.28, 0.1); },
    boing: function (t) { tone('sine', 150, 700, t, 0.38, 0.32, 110); },
    sad: function (t) {
      tone('triangle', 392, 370, t, 0.28, 0.26); tone('triangle', 349, 330, t + 0.3, 0.28, 0.26);
      tone('triangle', 311, 294, t + 0.6, 0.3, 0.26); tone('triangle', 262, 196, t + 0.92, 0.7, 0.28);
    },
    fanfare: function (t) {
      [523, 659, 784, 1047].forEach(function (f, i) { tone('square', f, f, t + i * 0.11, 0.18, 0.12); tone('triangle', f / 2, f / 2, t + i * 0.11, 0.2, 0.16); });
      tone('square', 1047, 1047, t + 0.5, 0.55, 0.12); tone('triangle', 784, 784, t + 0.5, 0.55, 0.16); tone('triangle', 523, 523, t + 0.5, 0.55, 0.16);
    },
    error: function (t) { tone('square', 170, 150, t, 0.13, 0.2); tone('square', 130, 110, t + 0.17, 0.2, 0.2); },
    stamp: function (t) { noise(t, 0.12, 0.5, 'lowpass', 900, 200); tone('sine', 130, 50, t, 0.18, 0.5); },
    pop: function (t) { tone('sine', 640, 180, t, 0.07, 0.34); noise(t, 0.03, 0.12, 'highpass', 2500); },
    whoosh: function (t) { noise(t, 0.45, 0.38, 'bandpass', 300, 2400); },
    tick: function (t) { tone('square', 1900, 1700, t, 0.02, 0.12); },
    tada: function (t) {
      [523, 659, 784].forEach(function (f) { tone('triangle', f, f, t, 0.22, 0.14); });
      [784, 988, 1175, 1568].forEach(function (f) { tone('triangle', f, f, t + 0.2, 0.7, 0.13); });
      noise(t + 0.2, 0.3, 0.12, 'highpass', 3000);
    },
    bell: function (t) { tone('sine', 880, 880, t, 1.3, 0.22); tone('sine', 1760, 1760, t, 0.9, 0.1); tone('sine', 2640, 2640, t, 0.5, 0.06); },
    buzz: function (t) { tone('sawtooth', 110, 105, t, 0.3, 0.2); tone('square', 55, 55, t, 0.3, 0.12); }
  };

  const sfx = {
    names: P.SFX_NAMES.slice(),
    isMuted: muted,
    /** transient hush that is NOT saved (the boss key uses it); setting 'mute' is untouched */
    suspend: function (on) { suspended = !!on; },
    has: function (name) { return Object.prototype.hasOwnProperty.call(R, name); },
    setMuted: function (m) { try { P.state.setting.set('mute', !!m); } catch (e) { /* ignore */ } },
    toggleMute: function () { const m = !muted(); sfx.setMuted(m); return m; },
    play: function (name) {
      try {
        if (!Object.prototype.hasOwnProperty.call(R, name)) return false;
        if (muted()) return false;
        const now = NAT.now();
        if (lastPlayed[name] && now - lastPlayed[name] < 28) return false;
        if (active > 28) return false;
        if (!ensure()) return false;
        lastPlayed[name] = now;
        R[name](ctx.currentTime + 0.005);
        return true;
      } catch (e) { sfx.lastError = e && e.message ? e.message : String(e); return false; }
    },
    lastError: null,
    resetVoices: function () { active = 0; }      // for tests: onended callbacks follow audio time, not virtual time
  };
  P.sfx = sfx;
})();
