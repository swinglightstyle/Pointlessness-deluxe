'use strict';
/*
 * node tools/shot.js <id|lobby> [out.png] [--width W --height H] [--full] [--actions N] [--screen NAME] [--seed N] [--wait MS] [--timeout SEC] [--real] [--reduce-motion]
 *
 * Screenshot of a module (?dev=<id>) or the Lobby after load, optionally after N random fuzz actions
 * (?actions=N) or with a Lobby screen open (?screen=shop|trophies|stats|settings|ascend|tos|credits|...).
 *   --enter <moduleId>  (with "lobby") open that module from the REAL Lobby (real narrator panel, toasts, title bar) instead of ?dev.
 * Default output: reports/shots/<id>[-<screen>].png. Prints the PNG size so you know it is real; then look at it
 * with the Read tool. Exit 0 ok, 1 failure.
 *   --full  a tall window (at least 2400px high) so a module or Lobby taller than the screen is captured below the fold too.
 *   --real  run the browser WITHOUT --allow-file-access-from-files (what a double-clicked index.html really sees).
 *   --reduce-motion  emulate the OS setting prefers-reduced-motion: reduce (static ticker, calm animations).
 * The output path must end in .png and must not be inside core/, games/, content/, tools/, design/ or generated/ (or a file in the project
 * root): the tool replaces whatever is at that path, so a mistyped second argument must never be able to overwrite source files.
 */
const fs = require('fs');
const path = require('path');
const B = require('./_browser.js');
const build = require('./build.js');

function usage(msg) {
  if (msg) console.error(msg);
  console.error('usage: node tools/shot.js <id|lobby> [out.png] [--width W --height H] [--full] [--actions N] [--screen NAME] [--seed N] [--wait MS] [--timeout SEC] [--real] [--reduce-motion]');
  process.exit(1);
}

const argv = process.argv.slice(2);
const opt = { width: 1100, height: 800, actions: 0, screen: '', seed: 1, wait: undefined, timeout: 90, full: false, real: false, reduceMotion: false };
const pos = [];
for (let i = 0; i < argv.length; i++) {
  const a = argv[i];
  const val = () => { const v = argv[++i]; if (v === undefined) usage('missing value for ' + a); return v; };
  if (a === '--width') opt.width = parseInt(val(), 10);
  else if (a === '--height') opt.height = parseInt(val(), 10);
  else if (a === '--actions') opt.actions = parseInt(val(), 10);
  else if (a === '--screen') opt.screen = val();
  else if (a === '--enter') opt.enter = val();
  else if (a === '--seed') opt.seed = parseInt(val(), 10);
  else if (a === '--wait') opt.wait = parseInt(val(), 10);
  else if (a === '--timeout') opt.timeout = parseFloat(val());
  else if (a === '--full') opt.full = true;
  else if (a === '--real') opt.real = true;
  else if (a === '--reduce-motion') opt.reduceMotion = true;
  else if (a === '--firstrun') opt.firstrun = true;   /* Lobby only: no ?shot=1, so the real first-run welcome and opening line appear */
  else if (a.startsWith('--')) usage('unknown option ' + a);
  else pos.push(a);
}
if (!pos.length) usage('missing module id (or "lobby")');
const id = pos[0].replace(/\.js$/, '').replace(/^.*[\\/]/, '');
if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(id)) usage('"' + id + '" is not a kebab-case module id');
if (!(opt.width >= 200 && opt.width <= 3000 && opt.height >= 200 && opt.height <= 4000)) usage('--width/--height out of range');
if (opt.screen && !/^[a-z0-9-]+$/.test(opt.screen)) usage('--screen must be a short lowercase name');
if (opt.enter && (id !== 'lobby' || !/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(opt.enter))) usage('--enter <moduleId> only works together with "lobby"');

let out = pos[1];
if (!out) out = path.join(B.ROOT, 'reports', 'shots', id + (opt.screen ? '-' + opt.screen : '') + '.png');
out = path.resolve(out);
if (pos.length > 2) usage('unexpected argument "' + pos[2] + '"');
if (!/\.png$/i.test(out)) usage('the output file must end in .png (got "' + pos[1] + '"). Nothing was touched.');
{
  const rel = path.relative(B.ROOT, out);
  const inside = rel && !rel.startsWith('..') && !path.isAbsolute(rel);
  if (inside && (/^(core|games|content|tools|design|generated)[\\/]/i.test(rel) || !/[\\/]/.test(rel))) {
    usage('refusing to write a screenshot to "' + rel + '": that is a source folder or a project file. Use reports/shots/ (the default) or any folder outside core/games/content/tools/design/generated.');
  }
}
if (opt.full && opt.height < 2400) opt.height = 2400;

const png = require('./_png.js');
const pngInfo = png.info;
/* Headless Edge/Chrome refuses windows narrower than 500px. For narrower shots the page is rendered inside an
 * iframe of the exact requested size (so media queries really see e.g. 360px) in a >=500px window, then cropped. */
const MIN_WINDOW = 500;

(async () => {
  try { build.build({ quiet: true }); } catch (e) { console.error('build failed: ' + e.message); process.exit(1); }
  if (id !== 'lobby' && !fs.existsSync(path.join(B.ROOT, 'games', id + '.js'))) {
    console.error('games/' + id + '.js does not exist.');
    process.exit(1);
  }
  fs.mkdirSync(path.dirname(out), { recursive: true });
  /* the browser writes to a temporary .png next to the target; the target is replaced only once the temporary file is a real PNG */
  const finalOut = out;
  out = finalOut.replace(/\.png$/i, '') + '.' + process.pid + '.tmp.png';
  try { fs.unlinkSync(out); } catch (e) { /* none */ }
  const query = { shot: 1, seed: opt.seed, mute: 1, nostorage: 1 };
  if (opt.firstrun && id === 'lobby') delete query.shot;
  if (id === 'lobby') { if (opt.screen) query.screen = opt.screen; if (opt.enter) query.enter = opt.enter; } else query.dev = id;
  if (opt.actions > 0) query.actions = opt.actions;
  let url = B.fileUrl('index.html', query);
  const virtualMs = opt.wait !== undefined ? opt.wait : 3500 + opt.actions * 60;
  let winW = opt.width, wrapper = null;
  if (true) { /* always an iframe: big canvases render blank in a normal-height top-level headless screenshot but fine inside an iframe */
    wrapper = path.join(B.ROOT, 'reports', '_shotwrap-' + process.pid + '-' + Math.random().toString(36).slice(2, 8) + '.html');
    fs.writeFileSync(wrapper, '<!doctype html><meta charset="utf-8"><body style="margin:0;background:#888"><iframe src="' + url +
      '" style="border:0;display:block;width:' + opt.width + 'px;height:' + opt.height + 'px"></iframe>', 'utf8');
    url = require('url').pathToFileURL(wrapper).href;
    winW = Math.max(MIN_WINDOW, opt.width);
  }
  let r = null;
  try {
    for (let attempt = 0; attempt < 2; attempt++) {
      r = await B.runBrowser({ url, virtualMs, timeoutMs: Math.round(opt.timeout * 1000), width: winW, height: opt.height, screenshot: out, realFiles: opt.real, extraArgs: opt.reduceMotion ? ['--force-prefers-reduced-motion'] : [] });
      if (fs.existsSync(out)) break;
      if (r.timedOut) break;
    }
  } finally {
    if (wrapper) { try { fs.unlinkSync(wrapper); } catch (e) { /* ignore */ } }
  }
  if (wrapper && fs.existsSync(out)) {
    try { png.cropTopLeft(out, opt.width, opt.height); }
    catch (e) { console.error('warning: could not crop the narrow screenshot (' + e.message + '); the PNG is ' + MIN_WINDOW + 'px wide'); }
  }
  if (!fs.existsSync(out)) {
    console.error('SHOT FAILED: no PNG was written. ' + (r.error || '') + (r.stderr ? '\n' + r.stderr.split('\n').slice(0, 4).join('\n') : ''));
    process.exit(1);
  }
  const info = pngInfo(out);
  if (!info) { try { fs.unlinkSync(out); } catch (e) { /* ignore */ } console.error('SHOT FAILED: the browser did not write a valid PNG (nothing was replaced).'); process.exit(1); }
  try { fs.renameSync(out, finalOut); }
  catch (e) { try { fs.copyFileSync(out, finalOut); fs.unlinkSync(out); } catch (e2) { console.error('SHOT FAILED: could not move the PNG into place: ' + e2.message); process.exit(1); } }
  out = finalOut;
  console.log('SHOT OK  ' + out + '  (' + info.width + 'x' + info.height + ' PNG, ' + info.bytes + ' bytes, ' + (r.ms / 1000).toFixed(1) + 's)');
  console.log('open it with the Read tool to look at it');
})();
