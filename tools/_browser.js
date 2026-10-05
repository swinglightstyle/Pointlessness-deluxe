'use strict';
/*
 * Shared helper for tools/selftest.js and tools/shot.js: run headless Edge (Chrome fallback)
 * with a UNIQUE temp --user-data-dir (concurrency safe), a hard timeout that kills the whole
 * browser process tree, and guaranteed cleanup. Node only; not shipped to the browser.
 */
const fs = require('fs');
const os = require('os');
const path = require('path');
const cp = require('child_process');
const { pathToFileURL } = require('url');

const ROOT = path.resolve(__dirname, '..');
const EDGE = 'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe';
const EDGE64 = 'C:\\Program Files\\Microsoft\\Edge\\Application\\msedge.exe';
const CHROME = 'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe';
const CHROME64 = 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe';
const PROFILE_PREFIX = 'pointless-edge-';

function findBrowser() {
  const env = process.env.POINTLESS_BROWSER;
  const list = [env, EDGE, EDGE64, CHROME, CHROME64].filter(Boolean);
  for (const p of list) {
    try { if (fs.existsSync(p)) return p; } catch (e) { /* next */ }
  }
  throw new Error('No headless browser found. Looked for:\n  ' + list.join('\n  ') +
    '\nSet POINTLESS_BROWSER to a msedge.exe/chrome.exe path.');
}

function fileUrl(relFile, query) {
  const u = pathToFileURL(path.join(ROOT, relFile)).href;
  const q = query ? '?' + Object.keys(query).filter(k => query[k] !== undefined && query[k] !== null)
    .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(String(query[k]))).join('&') : '';
  return u + q;
}

function killTree(pid) {
  if (!pid) return;
  try {
    if (process.platform === 'win32') {
      cp.spawnSync('taskkill', ['/PID', String(pid), '/T', '/F'], { windowsHide: true, stdio: 'ignore', timeout: 8000 });
    } else {
      try { process.kill(-pid, 'SIGKILL'); } catch (e) { try { process.kill(pid, 'SIGKILL'); } catch (e2) { /* gone */ } }
    }
  } catch (e) { /* ignore */ }
}

/** Kill any browser process still holding our private profile dir (rare; used after timeouts). */
function killByProfile(dir) {
  if (process.platform !== 'win32') return;
  try {
    const needle = dir.replace(/'/g, "''");
    const ps = "Get-CimInstance Win32_Process | Where-Object { $_.CommandLine -and $_.CommandLine.Contains('" + needle +
      "') } | ForEach-Object { Stop-Process -Id $_.ProcessId -Force -ErrorAction SilentlyContinue }";
    cp.spawnSync('powershell.exe', ['-NoProfile', '-NonInteractive', '-Command', ps],
      { windowsHide: true, stdio: 'ignore', timeout: 15000 });
  } catch (e) { /* ignore */ }
}

function rmDir(dir) {
  for (let i = 0; i < 8; i++) {
    try { fs.rmSync(dir, { recursive: true, force: true, maxRetries: 3, retryDelay: 100 }); return true; }
    catch (e) { Atomics.wait(new Int32Array(new SharedArrayBuffer(4)), 0, 0, 150); }
  }
  return !fs.existsSync(dir);
}

/** Remove abandoned profile dirs from crashed/killed runs (older than 3 hours). */
function sweepStale() {
  try {
    const tmp = os.tmpdir();
    const cutoff = Date.now() - 3 * 3600 * 1000;
    for (const name of fs.readdirSync(tmp)) {
      if (!name.startsWith(PROFILE_PREFIX)) continue;
      const p = path.join(tmp, name);
      try { if (fs.statSync(p).mtimeMs < cutoff) rmDir(p); } catch (e) { /* ignore */ }
    }
  } catch (e) { /* ignore */ }
}

/* if the node tool itself is interrupted (Ctrl+C, agent timeout, crash), do not leave browsers behind */
const ACTIVE = new Set();
function killActive() { ACTIVE.forEach((c) => killTree(c.pid)); ACTIVE.clear(); }
process.on('exit', killActive);
['SIGINT', 'SIGTERM', 'SIGBREAK'].forEach((sig) => { try { process.on(sig, () => { killActive(); process.exit(130); }); } catch (e) { /* unsupported signal */ } });

/**
 * opts: { url, virtualMs, timeoutMs, width, height, dumpDom:boolean, screenshot:absPath, extraArgs:[], userDataDir, keepProfile,
 *         realFiles:boolean  (true: do NOT pass --allow-file-access-from-files, i.e. behave like a player who double-clicks index.html:
 *                             errors in other files are reported as a bare "Script error." and so on),
 *         logConsole:boolean (stream page console output to stderr so a hung page can still be located) }
 * resolves { ok, timedOut, code, stdout, stderr, ms, error }
 */
function runBrowser(opts) {
  sweepStale();
  return new Promise((resolve) => {
    let exe;
    try { exe = opts.exe || findBrowser(); } catch (e) { resolve({ ok: false, error: e.message, stdout: '', stderr: '', ms: 0 }); return; }
    const udd = opts.userDataDir || fs.mkdtempSync(path.join(os.tmpdir(), PROFILE_PREFIX));
    /* opts.minimal: ONLY what a person could type on a command line (tools/realcheck.js): no automation-friendly extras at all */
    const args = opts.minimal ? [
      '--headless=new', '--disable-gpu',
      '--user-data-dir=' + udd,
      '--window-size=' + (opts.width || 1100) + ',' + (opts.height || 800),
      '--virtual-time-budget=' + Math.max(1000, Math.round(opts.virtualMs || 10000))
    ] : [
      '--headless=new', '--disable-gpu',
      '--no-first-run', '--no-default-browser-check', '--disable-extensions',
      '--disable-background-networking', '--disable-sync', '--disable-component-update',
      '--disable-default-apps', '--disable-breakpad', '--disable-crash-reporter',
      '--disable-features=Translate,MediaRouter,OptimizationHints,AutofillServerCommunication',
      '--metrics-recording-only', '--mute-audio', '--hide-scrollbars',
      '--force-device-scale-factor=1', '--password-store=basic', '--use-mock-keychain',
      '--user-data-dir=' + udd,
      '--window-size=' + (opts.width || 1100) + ',' + (opts.height || 800),
      '--virtual-time-budget=' + Math.max(1000, Math.round(opts.virtualMs || 10000))
    ];
    if (!opts.realFiles && !opts.minimal) args.push('--allow-file-access-from-files');
    if (opts.logConsole) args.push('--enable-logging=stderr', '--v=0');
    if (opts.dumpDom) args.push('--dump-dom');
    if (opts.screenshot) args.push('--screenshot=' + opts.screenshot);
    for (const a of (opts.extraArgs || [])) args.push(a);
    args.push(opts.url);

    const t0 = Date.now();
    let stdout = '', stderr = '', done = false, timedOut = false;
    let child;
    try {
      child = cp.spawn(exe, args, { windowsHide: true, stdio: ['ignore', 'pipe', 'pipe'] });
    } catch (e) {
      rmDir(udd);
      resolve({ ok: false, error: 'could not start browser: ' + e.message, stdout: '', stderr: '', ms: 0 });
      return;
    }
    ACTIVE.add(child);
    const finish = (code, error) => {
      if (done) return;
      done = true;
      clearTimeout(timer);
      ACTIVE.delete(child);
      if (timedOut || code === null) killTree(child.pid);   // normal exits leave nothing behind (verified); never taskkill a recycled pid
      if (timedOut) killByProfile(udd);
      const cleaned = opts.keepProfile ? true : rmDir(udd);
      resolve({ ok: !timedOut && !error, timedOut, code, stdout, stderr, ms: Date.now() - t0, error, profileCleaned: cleaned });
    };
    const timer = setTimeout(() => {
      timedOut = true;
      killTree(child.pid);
      // give the close event a moment, otherwise force finish
      setTimeout(() => finish(null, 'hard timeout after ' + Math.round((opts.timeoutMs || 90000) / 1000) + 's'), 1500);
    }, opts.timeoutMs || 90000);
    child.stdout.on('data', (d) => { if (stdout.length < 8e6) stdout += d.toString('utf8'); });
    child.stderr.on('data', (d) => { if (stderr.length < 8e6) stderr += d.toString('utf8'); });
    child.on('error', (e) => finish(null, 'browser error: ' + e.message));
    child.on('close', (code) => finish(code, timedOut ? 'hard timeout after ' + Math.round((opts.timeoutMs || 90000) / 1000) + 's' : null));
  });
}

module.exports = { ROOT, EDGE, EDGE64, CHROME, CHROME64, findBrowser, fileUrl, runBrowser, killTree, rmDir };

