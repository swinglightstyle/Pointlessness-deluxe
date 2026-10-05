'use strict';
/*
 * node tools/coretest.js
 * Regression test for the ENGINE (not for modules): loads core/*.js in headless Edge/Chrome on a temp page and
 * runs tools/coretest-page.js (every api member, registry, state/shop/ascend/import, narrator queue, crash shield, review-hardening checks) and\n * tools/coretest-storage-page.js (real localStorage: multi-tab merge, failed writes, save frequency, corrupt-save backup).
 * Exit 0 all pass, 1 failures, 2 tool problem.
 */
const fs = require('fs');
const path = require('path');
const B = require('./_browser.js');

const CORE = ['00-registry', '05-fallback', '10-storage', '20-state', '30-sfx', '40-narrator', '45-fx', '50-api', '60-host', '70-fuzz'];

/* one temp page per test script. pre: inline JS run BEFORE the engine loads (used to seed localStorage). */
async function runPage(file, query, pre, virtualMs) {
  const page = fs.readFileSync(path.join(__dirname, file), 'utf8');
  const wrap = path.join(B.ROOT, 'reports', '_coretest-' + process.pid + '-' + path.basename(file, '.js') + '.html');
  fs.mkdirSync(path.dirname(wrap), { recursive: true });
  const html = '<!doctype html><html><head><meta charset="utf-8"><title>coretest</title><link rel="stylesheet" href="../core/base.css"></head><body><div id="app"></div>\n' +
    (pre ? '<script>' + pre + '</script>\n' : '') +
    CORE.map((f) => '<script src="../core/' + f + '.js"></script>').join('\n') + '\n<script>' + page.replace(/<\/script/gi, '<\\/script') + '</script></body></html>';
  fs.writeFileSync(wrap, html, 'utf8');
  let r;
  try {
    r = await B.runBrowser({ url: require('url').pathToFileURL(wrap).href + query, virtualMs: virtualMs, timeoutMs: 90000, dumpDom: true });
  } finally { try { fs.unlinkSync(wrap); } catch (e) { /* ignore */ } }
  const m = r && r.stdout ? /<pre id="coretest-result"[^>]*?data-json="([^"]*)"/.exec(r.stdout) : null;
  if (!m) return { error: 'no result from the page. ' + ((r && r.error) || '') + (r && r.stdout ? ' (title: ' + ((/<title>([^<]*)/.exec(r.stdout) || [])[1] || '?') + ')' : ''), ms: r ? r.ms : 0, results: [] };
  return { results: JSON.parse(decodeURIComponent(m[1])), ms: r.ms };
}

(async () => {
  const runs = [
    await runPage('coretest-page.js', '?seed=7&mute=1&nostorage=1&shot=1', '', 30000),
    /* real localStorage (needs a persistent-capable profile; the page reports itself skipped when localStorage is unavailable) */
    await runPage('coretest-storage-page.js', '?seed=7&mute=1&shot=1', "try { localStorage.setItem('pointless-arcade-v1', '{this is not json'); } catch (e) {}", 60000)
  ];
  let total = 0, bad = 0, ms = 0;
  for (const r of runs) {
    if (r.error) { console.log('CORETEST ERROR: ' + r.error); process.exit(2); }
    ms += r.ms;
    r.results.forEach((x) => { total++; if (!x.ok) { bad++; console.log('  FAIL  ' + x.name + '\n        ' + x.err); } });
  }
  console.log('CORETEST ' + (bad ? 'FAIL' : 'PASS') + '  ' + (total - bad) + '/' + total + ' checks passed  (' + (ms / 1000).toFixed(1) + 's)');
  process.exit(bad ? 1 : 0);
})();
