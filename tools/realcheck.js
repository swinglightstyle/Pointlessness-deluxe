'use strict';
/*
 * node tools/realcheck.js [moduleId] [--all] [--browser edge|chrome|both] [--keep] [--timeout SEC]
 *
 * "Does it work when a person double-clicks index.html?"  Runs headless Edge (and Chrome, when installed) with ONLY
 *   --headless=new --disable-gpu --virtual-time-budget --dump-dom (plus a throw-away --user-data-dir and a window size),
 * i.e. WITHOUT --allow-file-access-from-files, against file:///.../index.html, and reads the dumped DOM:
 *   1. Lobby: the page rendered, all modules are registered (the Registry Report of the Diagnostics screen says how many,
 *      the card grid is counted too), Diagnostics holds no errors / load failures / "Script error.", storage is localStorage.
 *   2. Persistence: the SAME profile is loaded a second time; the passive Meh earned by the first run must still be there.
 *   3. ?nostorage=1: the in-memory fallback boots the Lobby too ("not persistent" in the Registry Report).
 *   4. ?dev=<id>: the module mounts into its window, no crash card, the dev bar reports 0 errors. --all does every module.
 *   5. Mojibake: the dumped page text contains no double-encoded UTF-8 (script encoding on file:// is a classic trap).
 * Exit 0 PASS, 1 FAIL, 2 infrastructure problem (no browser, nothing dumped).
 */
const fs = require('fs');
const path = require('path');
const os = require('os');
const B = require('./_browser.js');
const build = require('./build.js');

const argv = process.argv.slice(2);
const opt = { all: false, browser: 'both', keep: false, timeout: 120, mod: '' };
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  const val = () => { const v = argv[++i]; if (v === undefined) { console.error('missing value for ' + a); process.exit(2); } return v; };
  if (a === '--all') opt.all = true;
  else if (a === '--keep') opt.keep = true;
  else if (a === '--browser') opt.browser = val();
  else if (a === '--timeout') opt.timeout = parseFloat(val());
  else if (a.startsWith('--')) { console.error('unknown option ' + a); process.exit(2); }
  else opt.mod = a.replace(/\.js$/, '').replace(/^.*[\\/]/, '');
}

/* double-encoded UTF-8 (signatures shared with tools/lint.js) */
const MOJI = require('./_moji.js');

function txt(html) { return html.replace(/<style[\s\S]*?<\/style>/g, ' ').replace(/<script[\s\S]*?<\/script>/g, ' '); }
function body(html) { const i = html.indexOf('<body'); return i < 0 ? html : html.slice(i); }
function parseMeh(html) {
  const m = /class="lb-meh[ "][^>]*>([^<]*)</.exec(html);
  if (!m) return NaN;
  const s = m[1].replace(/,/g, '').trim();
  const n = parseFloat(s);
  if (!isFinite(n)) return NaN;
  return /K/i.test(s) ? n * 1e3 : /M/i.test(s) ? n * 1e6 : n;
}
function registry(html) {
  const out = {};
  const re = /<dt>([^<]+)<\/dt><dd>([^<]*)<\/dd>/g;
  let m;
  while ((m = re.exec(html))) out[m[1]] = m[2];
  return out;
}

function browsers() {
  const list = [];
  const want = opt.browser;
  const first = (arr) => arr.find((p) => { try { return fs.existsSync(p); } catch (e) { return false; } });
  if (want === 'edge' || want === 'both') { const p = first([B.EDGE, B.EDGE64]); if (p) list.push({ name: 'Edge', exe: p }); }
  if (want === 'chrome' || want === 'both') { const p = first([B.CHROME, B.CHROME64]); if (p) list.push({ name: 'Chrome', exe: p }); }
  return list;
}

async function load(br, query, virtualMs, udd) {
  const url = B.fileUrl('index.html', query);
  const r = await B.runBrowser({ url, exe: br.exe, minimal: true, virtualMs, timeoutMs: opt.timeout * 1000, width: 1100, height: 800, dumpDom: true, userDataDir: udd, keepProfile: !!udd });
  return r;
}
function tmpProfile(tag) { return fs.mkdtempSync(path.join(os.tmpdir(), 'pointless-edge-rc-' + tag + '-')); }

async function pool(items, n, fn) {
  const res = new Array(items.length);
  let next = 0;
  await Promise.all(Array.from({ length: Math.min(n, items.length) }, async () => {
    while (next < items.length) { const i = next++; res[i] = await fn(items[i], i); }
  }));
  return res;
}

(async () => {
  try { build.build({ quiet: true }); } catch (e) { console.error('build failed: ' + e.message); process.exit(2); }
  const games = fs.readdirSync(path.join(B.ROOT, 'games')).filter((f) => /^[a-z0-9]+(?:-[a-z0-9]+)*\.js$/.test(f)).map((f) => f.replace(/\.js$/, '')).sort();
  const brs = browsers();
  if (!brs.length) { console.error('No browser found (Edge/Chrome).'); process.exit(2); }
  const mod = opt.mod || games[0];
  if (!opt.all && games.indexOf(mod) < 0) { console.error('games/' + mod + '.js does not exist.'); process.exit(2); }
  let fails = 0, infra = 0;
  const say = (ok, msg) => { console.log((ok ? '  ok    ' : '  FAIL  ') + msg); if (!ok) fails++; };
  const temps = [];

  for (const br of brs) {
    console.log('== ' + br.name + ' (' + path.basename(br.exe) + '), file:// without --allow-file-access-from-files, games on disk: ' + games.length);
    const prof = tmpProfile('p'); temps.push(prof);

    /* 1 + 2: Lobby, then the same profile again */
    const r1 = await load(br, { screen: 'diagnostics' }, 20000, prof);
    if (!r1.stdout || r1.stdout.length < 2000) { console.log('  INFRA no DOM dumped: ' + (r1.error || 'empty output')); infra++; continue; }
    const h1 = body(r1.stdout), t1 = txt(h1), reg1 = registry(h1);
    say(/class="lb-root"/.test(h1), 'Lobby rendered (lb-root present)');
    say(!/class="pm-fatal"/.test(h1), 'no fatal card');
    const cards = (h1.match(/class="lb-card[ "]/g) || []).length;
    say(cards === games.length, 'module cards in the grid: ' + cards + ' / ' + games.length);
    say(String(reg1['Modules registered']) === String(games.length), 'Registry Report: Modules registered = ' + reg1['Modules registered'] + ' (expected ' + games.length + ')');
    say(reg1['Storage'] === 'localStorage', 'storage kind on file://: ' + reg1['Storage']);
    const cnt = /class="lb-diag-counts">([^<]*)</.exec(h1);
    const diagText = cnt ? cnt[1] : '(no counts element)';
    const entries = [];
    h1.replace(/<li class="lb-diag lb-diag-([a-z-]+)"><span class="lb-diag-kind">[^<]*<\/span><span class="lb-diag-msg">([^<]*)<\/span>/g, (m, k, msg) => { entries.push(k + ': ' + msg); return m; });
    const bad = entries.filter((e) => /^(crash|error|module-error|load):/.test(e));
    say(bad.length === 0, 'Diagnostics: ' + diagText + (bad.length ? '  ' + bad.slice(0, 5).join(' | ') : ''));
    say(!/Script error/i.test(t1), 'no "Script error." anywhere in the page');
    const m1 = parseMeh(h1);
    say(!MOJI.test(t1), 'no mojibake in the dumped page' + (MOJI.test(t1) ? ': ' + MOJI.describe((MOJI.first(t1) || [''])[0]) : ''));

    const r2 = await load(br, { screen: 'diagnostics' }, 20000, prof);
    const h2 = body(r2.stdout || ''), m2 = parseMeh(h2);
    say(isFinite(m1) && isFinite(m2) && m2 > m1 + 0.5, 'localStorage persistence across loads: Meh ' + m1 + ' -> ' + m2 + ' (second run starts from the first run\'s save)');

    /* 3: in-memory fallback */
    const r3 = await load(br, { nostorage: 1, screen: 'diagnostics' }, 8000);
    const h3 = body(r3.stdout || ''), reg3 = registry(h3);
    say(/class="lb-root"/.test(h3) && String(reg3['Modules registered']) === String(games.length), '?nostorage=1 boots the Lobby (' + (reg3['Storage'] || 'no registry') + ', ' + reg3['Modules registered'] + ' modules)');

    /* 4: ?dev=<id> */
    const ids = opt.all ? games : [mod];
    const results = await pool(ids, opt.all ? 4 : 1, async (id) => {
      const r = await load(br, { dev: id }, 8000);
      const h = body(r.stdout || '');
      const rootOk = new RegExp('<div class="pm-root[ "][^>]*data-module="' + id + '"').test(h) || new RegExp('<div [^>]*data-module="' + id + '"[^>]*class="pm-root[ "]').test(h);
      const crashed = /class="pm-crash"/.test(h);
      const dev = /class="pm-btn pm-devbtn[^"]*"[^>]*>(Diagnostics: [^<]*)</.exec(h);
      const devText = dev ? dev[1] : '(no dev bar)';
      const errs = /Diagnostics: (\d+) error/.exec(devText);
      return { id, rootOk, crashed, devText, errs: errs ? +errs[1] : -1, moji: MOJI.test(txt(h)), infra: !r.stdout || r.stdout.length < 2000 };
    });
    let devBad = 0;
    for (const x of results) {
      const ok = x.rootOk && !x.crashed && x.errs === 0 && !x.moji && !x.infra;
      if (!ok || !opt.all) say(ok, '?dev=' + x.id + ': module root ' + (x.rootOk ? 'mounted' : 'MISSING') + (x.crashed ? ', CRASH CARD' : '') + ', ' + x.devText + (x.moji ? ', MOJIBAKE' : '') + (x.infra ? ', no DOM dumped' : ''));
      if (!ok) devBad++;
    }
    if (opt.all && !devBad) say(true, '?dev=<id> for all ' + results.length + ' modules: mounted, no crash card, 0 dev-bar errors, no mojibake');
    else if (opt.all) fails += 0;
  }
  if (!opt.keep) temps.forEach((d) => B.rmDir(d));
  console.log(fails ? '\nREALCHECK FAIL (' + fails + ' problem' + (fails === 1 ? '' : 's') + ')' : infra && !fails ? '\nREALCHECK INCONCLUSIVE (' + infra + ' infrastructure problem(s))' : '\nREALCHECK PASS');
  process.exit(fails ? 1 : infra ? 2 : 0);
})().catch((e) => { console.error('realcheck crashed: ' + (e && e.stack || e)); process.exit(2); });
