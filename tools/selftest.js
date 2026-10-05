'use strict';
/*
 * node tools/selftest.js <id|lobby> [--steps N] [--seed N] [--idle MS] [--width W] [--timeout SEC] [--real] [--json]
 *   --real  run the browser WITHOUT --allow-file-access-from-files, like a player who double-clicks index.html: errors thrown by other files are
 *           then hidden by the browser ("Script error.", no file name), so this shows what the crash shield and the diagnostics really see.
 *           Run it once before shipping (the integrator's final check).
 *
 * Runs the fuzz harness (core/70-fuzz.js, SPEC section 6) in headless Edge (Chrome fallback) with a unique
 * temp profile, parses #selftest-result from the dumped DOM and prints PASS/FAIL with details.
 * Exit code: 0 PASS, 1 FAIL, 2 tool/infrastructure problem (no browser, timeout, no result).
 */
const fs = require('fs');
const path = require('path');
const B = require('./_browser.js');
const build = require('./build.js');

function usage(msg) {
  if (msg) console.error(msg);
  console.error('usage: node tools/selftest.js <id|lobby> [--steps N] [--seed N] [--idle MS] [--width W] [--timeout SEC] [--real] [--json]');
  process.exit(2);
}

const argv = process.argv.slice(2);
const opt = { steps: 400, seed: 1, idle: undefined, width: 1100, timeout: undefined, json: false, real: false };
let id = '';
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  const val = () => { const v = argv[++i]; if (v === undefined) usage('missing value for ' + a); return v; };
  const num = (isInt) => { const raw = val(); const n = isInt ? parseInt(raw, 10) : parseFloat(raw); if (!Number.isFinite(n) || !/^-?[0-9.]+$/.test(raw)) usage(a + ' needs a number, got "' + raw + '"'); return n; };
  if (a === '--steps') opt.steps = num(true);
  else if (a === '--seed') opt.seed = num(true);
  else if (a === '--idle') { opt.idle = num(true); if (opt.idle < 0) usage('--idle must be >= 0 (0 disables the long idle)'); }
  else if (a === '--width') opt.width = num(true);
  else if (a === '--timeout') { opt.timeout = num(false); if (opt.timeout <= 0) usage('--timeout must be > 0 seconds'); }
  else if (a === '--real') opt.real = true;
  else if (a === '--json') opt.json = true;
  else if (a.startsWith('--')) usage('unknown option ' + a);
  else if (!id) id = a;
  else usage('unexpected argument ' + a);
}
if (!id) usage('missing module id (or "lobby")');
id = id.replace(/\.js$/, '').replace(/^.*[\\/]/, '');
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) usage('"' + id + '" is not a kebab-case module id');
if (!(opt.steps >= 1 && opt.steps <= 5000)) usage('--steps must be 1..5000');
if (!isFinite(opt.seed)) usage('--seed must be a number');
if (opt.width < 500) console.error('note: headless browsers refuse windows narrower than 500px, so --width ' + opt.width + ' is widened to ~500px. Use tools/shot.js --width ' + opt.width + ' to SEE a narrow layout.');

/* the page streams "[POINTLESS-PARTIAL] {json}" to the console every 50 steps; the last one tells where a hung or killed run stopped */
function lastPartial(stderr) {
  const lines = String(stderr || '').split('\n').filter((l) => l.indexOf('[POINTLESS-PARTIAL]') >= 0);
  for (let i = lines.length - 1; i >= 0; i--) {
    const m = /\[POINTLESS-PARTIAL\] (\{.*\})"?, source:/.exec(lines[i]) || /\[POINTLESS-PARTIAL\] (\{.*\})/.exec(lines[i]);
    if (!m) continue;
    try { return JSON.parse(m[1].replace(/\\"/g, '"')); } catch (e) { /* next */ }
  }
  return null;
}

function decodeResult(html, elId) {
  const re = new RegExp('<pre id="' + elId + '"[^>]*?data-json="([^"]*)"');
  const m = re.exec(html);
  if (!m) return null;
  try { return JSON.parse(decodeURIComponent(m[1])); } catch (e) { return null; }
}

function line(s) { process.stdout.write(s + '\n'); }
function shortPath(s) {
  return String(s).replace(/file:\/\/\/[^\s)]*?\/pointless-arcade\//gi, '').replace(/%20/g, ' ');
}

function report(res, meta) {
  if (opt.json) { line(JSON.stringify(res, null, 2)); return; }
  const head = 'SELFTEST ' + (res.pass ? 'PASS' : 'FAIL') + '  ' + id +
    '  (' + (res.steps !== undefined ? res.steps : '?') + '/' + opt.steps + ' steps, seed ' + opt.seed + ', ' +
    (meta.ms / 1000).toFixed(1) + 's real, ' + ((res.virtualMs || 0) / 1000).toFixed(0) + 's virtual)';
  line(head);
  if (!res.pass) {
    (res.reasons || []).forEach((r) => line('  FAIL  ' + r));
    if (res.errors && res.errors.length) {
      line('  errors:');
      res.errors.slice(0, 5).forEach((e, i) => {
        line('    ' + (i + 1) + '. ' + e.message + (e.count > 1 ? '  [x' + e.count + ']' : '') + (e.where ? '   @ ' + shortPath(e.where) : '') + '   (first seen: phase ' + e.phase + ', step ' + e.step + ')');
        if (e.stack) e.stack.split('\n').slice(0, 3).forEach((s) => line('         ' + shortPath(s.trim())));
      });
      if (res.errors.length > 5) line('    ... and ' + (res.errors.length - 5) + ' more distinct error(s); ' + res.errorCount + ' in total');
    }
    if (res.loadErrors && res.loadErrors.length) { line('  load errors:'); res.loadErrors.slice(0, 5).forEach((e) => line('    ' + e)); }
  }
  const bits = [];
  if (res.mode === 'module') {
    const c = res.mainCounts || res.counts || {};
    bits.push('interactive elements: ' + (res.interactive || 0));
    if (res.nodes) bits.push('root nodes: ' + res.nodes.baseline + ' -> ' + res.nodes.end);
    bits.push('award x' + (c.award || 0) + ', say x' + (c.say || 0) + ', stat x' + (c.stat || 0) + ', achieve x' + (c.achieve || 0) + ', sfx x' + (c.sfx || 0) +
      ', confetti x' + (c.confetti || 0) + ', toast x' + (c.toast || 0));
    bits.push('remounts: ' + (res.remounts || 0) + ', exits: ' + (res.exits || 0));
    if (Array.isArray(res.achievementsUnlocked)) bits.push('own achievements unlocked by the run: ' + res.achievementsUnlocked.length + '/' + res.achievementsDeclared +
      (res.achievementsUnlocked.length ? ' (' + res.achievementsUnlocked.map((a) => a.replace(/^[^.]*\./, '')).join(', ') + ')' : ''));
  } else if (res.mode === 'lobby') {
    bits.push('screens opened: ' + (res.screensOpened || []).length + '/' + (res.screens || []).length + (res.screensFailed && res.screensFailed.length ? ' (failed: ' + res.screensFailed.join(', ') + ')' : ''));
    bits.push('modules entered: ' + (res.modulesEntered || []).length + '/' + (res.modulesTotal !== undefined ? res.modulesTotal : '?') + (res.sweep ? ' (' + res.sweep + ' by the sweep)' : '') +
      ', module exits: ' + (res.exits || 0));
    if (res.nodes) bits.push('nodes: ' + res.nodes.baseline + ' -> ' + res.nodes.end + ' (page ' + res.nodes.docEnd + ')');
    bits.push('interactive elements: ' + (res.interactive || 0));
  }
  if (res.actions) {
    const a = res.actions;
    bits.push('actions: ' + Object.keys(a).filter((k) => a[k]).map((k) => k + ' ' + a[k]).join(', '));
  }
  bits.forEach((b) => line('  ' + b));
  if (res.warnings && res.warnings.length) {
    line('  warnings (' + res.warnings.length + '):');
    res.warnings.slice(0, 12).forEach((w) => line('    - ' + w));
  }
}

(async () => {
  let manifest = null;
  try { manifest = build.build({ quiet: true }); } catch (e) { console.error('build failed: ' + e.message); process.exit(2); }
  if (id !== 'lobby' && !fs.existsSync(path.join(B.ROOT, 'games', id + '.js'))) {
    line('SELFTEST FAIL  ' + id);
    line('  FAIL  games/' + id + '.js does not exist.');
    process.exit(1);
  }
  const idleMs = opt.idle !== undefined ? opt.idle : 62000;
  /* the Lobby run also sweeps every module once (~250 virtual ms each) */
  const sweepMs = id === 'lobby' && manifest ? manifest.games.length * 400 : 0;
  const virtualMs = opt.steps * 45 + idleMs + 30000 + sweepMs + (id === 'lobby' ? 15000 : 8000);
  const timeoutMs = Math.round((opt.timeout || (60 + opt.steps * 0.06 + idleMs / 4000)) * 1000);
  const url = B.fileUrl('index.html', { selftest: id, steps: opt.steps, seed: opt.seed, mute: 1, nostorage: 1, idle: opt.idle });

  let r = null;
  for (let attempt = 0; attempt < 3; attempt++) {
    r = await B.runBrowser({ url, virtualMs, timeoutMs, width: opt.width, height: 800, dumpDom: true, realFiles: opt.real, logConsole: true });
    if (r.timedOut) {
      /* a hang that never got past step 0 is a browser start-up stall under load (many headless Edges at once), not a module bug: retry */
      let pt = null;
      try { pt = lastPartial(r.stderr); } catch (e) { pt = null; }
      const stalled = !pt || !(pt.step > 0);
      if (stalled && attempt < 2) { line('(browser start-up stalled at step 0; retrying, attempt ' + (attempt + 2) + ' of 3)'); continue; }
      break;
    }
    if (r.stdout && r.stdout.indexOf('<html') >= 0) break;     // got a page; no retry needed
  }
  if (r.error && !r.stdout) {
    line('SELFTEST ERROR  ' + id + '  (' + (r.ms / 1000).toFixed(1) + 's real)');
    if (r.timedOut) {
      line('  TOOL  ' + r.error + ': the browser was killed (no zombie processes left behind).');
      line('        The page hung or is far too slow. Likely causes: an infinite loop in a click/key handler, a runaway');
      line('        requestAnimationFrame/setInterval doing heavy work, or a module building a huge DOM. Try --steps 60 to narrow it down; if the');
      line('        module animates every frame with a costly draw, try --idle 0 (the 62 virtual-second idle window runs ~4400 frames) or make the frame cheaper.');
      line('        Note: a busy-wait such as "while (Date.now() < t) {}" hangs under virtual time (the fake clock cannot advance inside a synchronous loop); use timers.');
      const pt = lastPartial(r.stderr);
      if (pt) line('  last progress: step ' + pt.step + ', phase ' + pt.phase + ', errors so far ' + pt.errors + (pt.entered !== undefined ? ', modules entered ' + pt.entered : ''));
      else line('  no progress was reported: the page hung before step 0 (an infinite loop while loading or mounting?)');
    } else {
      line('  TOOL  ' + r.error);
      if (r.stderr) line('  ' + r.stderr.split('\n').slice(0, 3).join('\n  '));
    }
    process.exit(2);
  }
  const res = decodeResult(r.stdout, 'selftest-result');
  if (!res) {
    const partial = lastPartial(r.stderr) || decodeResult(r.stdout, 'selftest-partial');
    line('SELFTEST ERROR  ' + id + '  (' + (r.ms / 1000).toFixed(1) + 's real)');
    if (r.timedOut) line('  TOOL  ' + r.error + '. The page probably hung (infinite loop in a module?) or is extremely slow.');
    else line('  TOOL  the browser exited without a selftest result. The virtual-time budget (' + Math.round(virtualMs / 1000) + 's) may have run out, or the page crashed.');
    if (partial) line('  last progress: step ' + partial.step + ', phase ' + partial.phase + ', errors so far ' + partial.errors);
    else line('  no progress was reported: the page may not have booted (check for script syntax errors with: node tools/lint.js)');
    if (r.timedOut) { /* partial already printed above when the run hung */ }
    const title = /<title>([^<]*)<\/title>/.exec(r.stdout || '');
    if (title) line('  page title: ' + title[1]);
    process.exit(2);
  }
  if (opt.real && !opt.json) line('(--real: browser started WITHOUT --allow-file-access-from-files, like a double-clicked index.html)');
  report(res, { ms: r.ms });
  process.exit(res.pass ? 0 : 1);
})();
