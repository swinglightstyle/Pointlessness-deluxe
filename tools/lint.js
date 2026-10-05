'use strict';
/*
 * node tools/lint.js [file...] [--quiet] [--strict] [--json]
 *
 * Static checks for SPEC.md (sections 1, 4, 5, 7). No arguments: lints games/*.js, content/*.js,
 * tools/template-module.js (as a module) and core/*.js (engine files: syntax + eval/url only).
 * Errors exit 1. Warnings exit 0 unless --strict. Add the comment text "lint-ignore" to a line to silence findings on it.
 * Uses a small JS lexer so patterns inside strings/comments never produce false positives (except URL checks,
 * which look at string contents on purpose).
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');
const MOJI = require('./_moji.js');

const ROOT = path.resolve(__dirname, '..');
const CATEGORIES = ['greeting', 'idle', 'award', 'bigAward', 'nothing', 'buy', 'hubReturn', 'moduleEnter', 'moduleExit', 'farewell',
  'achievement', 'error404', 'tip', 'lockedTease', 'ticker', 'fortune', 'tosClause', 'creditsLine', 'patchNote', 'loading', 'poster',
  'plantStatus', 'notice', 'lobbyEvent'];
const TOKENS = ['player', 'meh', 'module', 'count', 'item'];
const SHARED_FLAGS = ['metGerald', 'metSandra', 'metToaster', 'metStapler', 'metDennis', 'metTuesday', 'seenSock'];
const KID = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
const KEYWORDS = new Set(['return', 'typeof', 'instanceof', 'in', 'of', 'new', 'delete', 'void', 'throw', 'case', 'do', 'else', 'yield', 'await']);
const LINE_BUDGET = 1800, LINE_WARN = 1500;
/* ids the engine reserves (keep in sync with P.RESERVED_IDS in core/00-registry.js) */
const RESERVED_IDS = ['lobby', 'shop', 'meh', 'clicks', 'keys', 'time', 'modules', 'session', 'achievements', 'narrator', 'ascensions', 'tos',
  'template', 'system'];
/* emoji newer than Emoji 12 render as an empty "tofu" box on Windows 10 (and older Android/Linux fonts). Ranges of code points. */
const NEW_EMOJI = [[0x1F6D7, 0x1F6D7], [0x1F6DC, 0x1F6DF], [0x1F6FB, 0x1F6FC], [0x1F7F0, 0x1F7F0], [0x1F90C, 0x1F90C], [0x1F972, 0x1F972],
  [0x1F977, 0x1F979], [0x1F9A3, 0x1F9A4], [0x1F9AB, 0x1F9AD], [0x1F9CB, 0x1F9CC], [0x1FA7B, 0x1FA7F], [0x1FA83, 0x1FA8F], [0x1FA96, 0x1FAFF]];
function isNewEmoji(cp) { for (const r of NEW_EMOJI) if (cp >= r[0] && cp <= r[1]) return true; return false; }

/* ------------------------------------------------------------------ lexer */
function lex(src) {
  const n = src.length;
  const code = src.split(''), noc = src.split('');
  const strings = [];
  const tmplStack = [];     // { depth, rec }
  let braceDepth = 0, i = 0, lastSig = '', prevSig = '', lastWord = '';
  const blank = (arr, a, b) => { for (let k = a; k < b && k < n; k++) if (arr[k] !== '\n' && arr[k] !== '\r') arr[k] = ' '; };

  function templateText(from, rec) {      // scan template text starting at `from`; returns index after the stop token
    let j = from;
    while (j < n) {
      const c = src[j];
      if (c === '\\') { rec.value += src.substr(j, 2); j += 2; continue; }
      if (c === '`') { rec.end = j; blank(code, from, j); return j + 1; }
      if (c === '$' && src[j + 1] === '{') {
        blank(code, from, j);
        rec.hasExpr = true;
        tmplStack.push({ depth: braceDepth, rec });
        braceDepth++;
        return j + 2;
      }
      rec.value += c; j++;
    }
    rec.end = n; blank(code, from, n);
    return n;
  }

  while (i < n) {
    const c = src[i], d = src[i + 1];
    if (c === '/' && d === '/') {
      let j = i; while (j < n && src[j] !== '\n') j++;
      blank(code, i, j); blank(noc, i, j); i = j; continue;
    }
    if (c === '/' && d === '*') {
      let j = src.indexOf('*/', i + 2); j = j < 0 ? n : j + 2;
      blank(code, i, j); blank(noc, i, j); i = j; continue;
    }
    if (c === '"' || c === "'") {
      let j = i + 1;
      while (j < n && src[j] !== c) { if (src[j] === '\\') j++; if (src[j] === '\n') break; j++; }
      strings.push({ start: i + 1, end: j, quote: c, value: src.slice(i + 1, j), hasExpr: false });
      blank(code, i + 1, j);
      i = j + 1; lastSig = '"'; lastWord = ''; continue;
    }
    if (c === '`') {
      const rec = { start: i + 1, end: i + 1, quote: '`', value: '', hasExpr: false };
      strings.push(rec);
      i = templateText(i + 1, rec); lastSig = '"'; lastWord = ''; continue;
    }
    if (c === '/') {
      const postfix = (lastSig === '+' || lastSig === '-') && prevSig === lastSig;       // i++ / 2: a division, not the start of a regex
      const allowRegex = !postfix && (!lastSig || /[(,=:[!&|?{};+\-*%<>~^}]/.test(lastSig) || (/[\w$]/.test(lastSig) && KEYWORDS.has(lastWord)));
      if (allowRegex) {
        let j = i + 1, cls = false;
        while (j < n) {
          const ch = src[j];
          if (ch === '\\') { j += 2; continue; }
          if (ch === '\n') break;
          if (ch === '[') cls = true; else if (ch === ']') cls = false; else if (ch === '/' && !cls) break;
          j++;
        }
        j++;
        while (j < n && /[a-z]/i.test(src[j])) j++;
        blank(code, i + 1, j - 1);
        i = j; lastSig = '/'; lastWord = ''; continue;
      }
    }
    if (c === '{') { braceDepth++; lastSig = c; i++; continue; }
    if (c === '}') {
      const top = tmplStack[tmplStack.length - 1];
      if (top && braceDepth === top.depth + 1) {
        braceDepth--; tmplStack.pop();
        i = templateText(i + 1, top.rec); lastSig = '"'; lastWord = ''; continue;
      }
      braceDepth--; lastSig = c; i++; continue;
    }
    if (/[A-Za-z_$]/.test(c)) {
      let j = i + 1; while (j < n && /[\w$]/.test(src[j])) j++;
      lastWord = src.slice(i, j); lastSig = 'a'; i = j; continue;
    }
    if (/[0-9]/.test(c)) {
      let j = i + 1; while (j < n && /[\w.]/.test(src[j])) j++;
      lastSig = '0'; lastWord = ''; i = j; continue;
    }
    if (!/\s/.test(c)) { prevSig = lastSig; lastSig = c; lastWord = ''; }
    i++;
  }
  return { code: code.join(''), noc: noc.join(''), strings };
}

function matchClose(text, openIdx) {
  const open = text[openIdx], close = open === '(' ? ')' : open === '{' ? '}' : ']';
  let depth = 0;
  for (let i = openIdx; i < text.length; i++) {
    if (text[i] === open) depth++;
    else if (text[i] === close) { depth--; if (depth === 0) return i; }
  }
  return -1;
}

/* ------------------------------------------------------------------ analysis of one file */
function classify(rel) {
  rel = rel.replace(/\\/g, '/');
  if (rel === 'tools/template-module.js') return 'template';
  if (/^games\//.test(rel)) return 'game';
  if (/^content\//.test(rel)) return 'content';
  if (/^core\//.test(rel)) return 'engine';
  return 'other';
}

function analyze(abs) {
  const rel = path.relative(ROOT, abs).replace(/\\/g, '/');
  const kind = classify(rel);
  const src = fs.readFileSync(abs, 'utf8').replace(/^﻿/, '');
  const L = lex(src);
  const lineStarts = [0];
  for (let i = 0; i < src.length; i++) if (src[i] === '\n') lineStarts.push(i + 1);
  const lineOf = (idx) => {
    let lo = 0, hi = lineStarts.length - 1;
    while (lo < hi) { const mid = (lo + hi + 1) >> 1; if (lineStarts[mid] <= idx) lo = mid; else hi = mid - 1; }
    return lo + 1;
  };
  const colOf = (idx) => idx - lineStarts[lineOf(idx) - 1] + 1;
  const srcLines = src.split('\n');
  const ignoreLines = new Set();
  srcLines.forEach((l, k) => { if (l.indexOf('lint-ignore') >= 0) ignoreLines.add(k + 1); });
  const base = path.basename(rel, '.js');
  let fileId = base;
  const header = /\/\*\s*POINTLESS module:\s*([a-z0-9-]+)\s*\*\//.exec(src);
  if (kind === 'template' && header) fileId = header[1];

  /* ids declared */
  const decl = { modules: [], achievements: [], shop: [], settings: [], lineCats: [] };
  const regIdx = [];
  const re = /\bregisterModule\s*\(\s*\{/g;
  let m;
  while ((m = re.exec(L.code))) {
    const open = m.index + m[0].length - 1;
    const close = matchClose(L.code, open);
    const text = L.noc.slice(open, close > 0 ? close : undefined);
    const idm = /\bid\s*:\s*(['"`])([^'"`\n]+)\1/.exec(text);
    regIdx.push(open);
    if (idm) decl.modules.push({ id: idm[2], line: lineOf(open + idm.index) });
  }
  function idsIn(callName, into) {
    const rx = new RegExp('\\b' + callName + '\\s*\\(', 'g');
    let mm; let total = 0, secret = 0;
    while ((mm = rx.exec(L.code))) {
      const open = mm.index + mm[0].length - 1;
      const close = matchClose(L.code, open);
      const text = L.noc.slice(open, close > 0 ? close : undefined);
      const rid = /\bid\s*:\s*(['"`])([^'"`\n]*)\1/g;
      let x;
      while ((x = rid.exec(text))) { into.push({ id: x[2], line: lineOf(open + x.index) }); total++; }
      const rs = /\bsecret\s*:\s*true\b/g;
      while (rs.exec(text)) secret++;
    }
    return { total, secret };
  }
  const achCount = idsIn('addAchievements', decl.achievements);
  idsIn('addShopItems', decl.shop);
  idsIn('addSettings', decl.settings);
  if (!decl.achievements.length && /\baddAchievements\s*\(/.test(L.code)) {
    /* achievements passed as a variable (P.addAchievements(LIST)): estimate from every dotted id literal in the file */
    const skip = new Set(decl.shop.concat(decl.settings).map((x) => x.id));
    const rid = /\bid\s*:\s*(['"`])([^'"`\n]*\.[^'"`\n]*)\1/g;
    let x;
    while ((x = rid.exec(L.noc))) if (!skip.has(x[2])) { decl.achievements.push({ id: x[2], line: lineOf(x.index) }); achCount.total++; }
    const rs = /\bsecret\s*:\s*true\b/g;
    while (rs.exec(L.noc)) achCount.secret++;
  }

  return { abs, rel, kind, src, L, lineOf, colOf, ignoreLines, fileId, header, decl, achCount, srcLines, regIdx };
}

/* ------------------------------------------------------------------ css check */
function checkCss(css, id, baseLine, add) {
  css = css.replace(/\/\*[\s\S]*?\*\//g, (s) => s.replace(/[^\n]/g, ' '));
  const n = css.length;
  let i = 0;
  const lineAt = (idx) => baseLine + (css.slice(0, idx).match(/\n/g) || []).length;
  const prefix = 'm-' + id + '-';
  function skipBlock() { let depth = 1; while (i < n && depth > 0) { if (css[i] === '{') depth++; else if (css[i] === '}') depth--; i++; } }
  function splitSel(s) {
    const out = []; let depth = 0, cur = '';
    for (const ch of s) {
      if (ch === '(' || ch === '[') depth++; else if (ch === ')' || ch === ']') depth--;
      if (ch === ',' && depth === 0) { out.push(cur); cur = ''; } else cur += ch;
    }
    out.push(cur); return out.map((x) => x.trim()).filter(Boolean);
  }
  function parseBlock() {
    while (i < n) {
      while (i < n && /\s/.test(css[i])) i++;
      if (i >= n) return;
      if (css[i] === '}') { i++; return; }
      const start = i;
      while (i < n && css[i] !== '{' && css[i] !== ';' && css[i] !== '}') i++;
      const prelude = css.slice(start, i).trim();
      const line = lineAt(start);
      if (i >= n) return;
      if (css[i] === ';') {
        i++;
        if (/^@import/i.test(prelude)) add(line, 'css-scope', '@import is not allowed in module CSS');
        continue;
      }
      if (css[i] === '}') continue;
      i++;                                  // consume '{'
      if (prelude[0] === '@') {
        const am = /^@([\w-]+)\s*([\s\S]*)$/.exec(prelude) || [];
        const name = (am[1] || '').toLowerCase();
        if (name === 'media' || name === 'supports' || name === 'container' || name === 'layer') parseBlock();
        else if (/keyframes$/.test(name)) {
          if ((am[2] || '').trim().indexOf(prefix) !== 0) add(line, 'css-scope', '@keyframes "' + (am[2] || '').trim() + '" must be prefixed "' + prefix + '"');
          skipBlock();
        } else if (name === 'font-face' || name === 'property' || name === 'page' || name === 'counter-style') {
          add(line, 'css-scope', '@' + name + ' is global and not allowed in module CSS'); skipBlock();
        } else skipBlock();
      } else {
        splitSel(prelude).forEach((sel) => {
          if (!new RegExp('[.#]' + prefix.replace(/[-]/g, '\\-')).test(sel)) {
            add(line, 'css-scope', 'selector "' + sel.slice(0, 60) + '" is not scoped to .' + prefix + '* (it would leak into the Lobby)');
          }
          const cr = /\.(-?[_a-zA-Z][\w-]*)/g; let cm;
          while ((cm = cr.exec(sel))) {
            if (cm[1].indexOf(prefix) !== 0 && cm[1].indexOf('pm-') !== 0) add(line, 'css-prefix', 'class ".' + cm[1] + '" must start with "' + prefix + '"');
          }
        });
        skipBlock();
      }
    }
  }
  parseBlock();
}

/* ------------------------------------------------------------------ per-file lint */
function lintFile(f, findings) {
  const add = (idx, sev, rule, msg) => {
    const line = typeof idx === 'number' && idx < 0 ? 1 : f.lineOf(idx);
    if (f.ignoreLines.has(line)) return;
    findings.push({ file: f.rel, line, col: f.colOf(idx), sev, rule, msg });
  };
  const addLine = (line, sev, rule, msg) => {
    if (f.ignoreLines.has(line)) return;
    findings.push({ file: f.rel, line, col: 1, sev, rule, msg });
  };
  const err = (idx, rule, msg) => add(idx, 'error', rule, msg);
  const warn = (idx, rule, msg) => add(idx, 'warning', rule, msg);
  const { L, kind, src } = f;
  const code = L.code;
  const isGame = kind === 'game' || kind === 'template';

  /* mojibake: UTF-8 that was decoded as Windows-1252/Latin-1 and then saved again (see tools/_moji.js for the exact signatures).
   * Checked in the RAW text (strings, comments and all) of every game, content pack and engine file. */
  {
    const MOJ = MOJI.regex();
    const seenLines = new Set();
    let mm, n = 0;
    while ((mm = MOJ.exec(src))) {
      const ln = f.lineOf(mm.index);
      if (seenLines.has(ln)) continue;
      seenLines.add(ln);
      if (++n > 8) break;
      const shown = src.slice(Math.max(0, mm.index - 12), mm.index + 14).replace(/\s+/g, ' ');
      add(mm.index, 'error', 'mojibake', 'double-encoded UTF-8 (' + MOJI.describe(mm[0]) + ') near "' + shown + '". Re-type the character with the Edit tool; never rewrite files with Set-Content/Out-File.');
    }
  }

  /* syntax */
  try { new vm.Script(src, { filename: f.rel }); }
  catch (e) {
    const lm = /:(\d+)\n/.exec(String(e.stack || ''));
    const ln = lm ? parseInt(lm[1], 10) : 1;
    if (/import statement|export/.test(e.message)) addLine(ln, 'error', 'no-esm', 'ES modules are forbidden (classic scripts only, SPEC 1): ' + e.message);
    else addLine(ln, 'error', 'syntax', 'SyntaxError: ' + e.message);
    return;     // everything else is unreliable on broken code
  }

  const rx = (re, fn) => { let m; re.lastIndex = 0; while ((m = re.exec(code))) { fn(m); if (m[0].length === 0) re.lastIndex++; } };

  /* forbidden patterns everywhere (engine included, except where the engine legitimately needs them) */
  rx(/\beval\s*\(/g, (m) => err(m.index, 'no-eval', 'eval() is forbidden'));
  rx(/\bnew\s+Function\b|(^|[^.\w$])Function\s*\(/g, (m) => err(m.index, 'no-eval', 'new Function is forbidden'));
  rx(/\b(setTimeout|setInterval)\s*\(\s*['"`]/g, (m) => err(m.index, 'no-eval', 'string argument to ' + m[1] + ' is eval in disguise'));
  L.strings.forEach((s) => {
    const mm = /\b(?:https?|wss?):\/\/(?!www\.w3\.org\/)[^\s'"`)]*/i.exec(s.value);
    if (mm) err(s.start + mm.index, 'no-url', 'external URL "' + mm[0].slice(0, 50) + '" (no network, no CDN, no external assets; namespace URLs under www.w3.org are fine)');
  });
  if (kind === 'engine' || kind === 'other') return;

  rx(/(^|[^.\w$])import\b(?=\s*[\w{*"'`(])/g, (m) => err(m.index + m[1].length, 'no-esm', '"import" is forbidden: classic scripts only (SPEC 1)'));
  rx(/(^|[^.\w$])export\s+(default|const|let|var|function|class|\{)/g, (m) => err(m.index + m[1].length, 'no-esm', '"export" is forbidden: classic scripts only'));
  rx(/(^|[^.\w$])fetch\s*\(|\bXMLHttpRequest\b|\bWebSocket\b|\bEventSource\b|\bsendBeacon\b/g, (m) => err(m.index, 'no-network', 'network access is forbidden (no fetch/XHR/WebSocket)'));
  rx(/(^|[^.\w$])(alert|confirm|prompt)\s*\(|\bwindow\s*\.\s*(alert|confirm|prompt)\s*\(/g, (m) => err(m.index, 'no-dialog', 'alert/confirm/prompt are forbidden (use api.say / api.toast / in-page UI)'));
  rx(/\b(window|globalThis|self|top|parent)\s*\.\s*open\s*\(/g, (m) => err(m.index, 'no-window-open', 'window.open is forbidden'));
  rx(/\bdocument\s*\.\s*write(ln)?\s*\(/g, (m) => err(m.index, 'no-document-write', 'document.write is forbidden'));
  rx(/(?:^|[^\w$.])(?:(?:window|document|self|top|parent)\s*\.\s*)?location\s*\.\s*(href|assign|replace|reload|hash|search|pathname)\s*(=(?!=)|\()|\b(?:window|document|self|top|parent)\s*\.\s*location\s*=(?!=)/g, (m) => err(m.index, 'no-navigation', 'navigating the page (location.*) is forbidden: the module would be gone; the fuzz harness FAILS it'));
  rx(/(?<![\w$.])(?<!\b(?:const|let|var|function)\s)location\s*=(?!=)/g, (m) => warn(m.index, 'no-navigation', 'a bare "location = ..." navigates the page (fine only if "location" is your own variable: then rename it)'));
  rx(/\bhistory\s*\.\s*(pushState|replaceState|go|back|forward)\b/g, (m) => err(m.index, 'no-navigation', 'history.' + m[1] + ' is forbidden: it changes the page behind the Lobby'));
  rx(/\bdebugger\b/g, (m) => err(m.index, 'no-debugger', 'remove the debugger statement'));
  rx(/\beval\b(?!\s*\()/g, (m) => err(m.index, 'no-eval', 'eval is forbidden in any form ((0, eval)(...), window.eval, aliases)'));
  rx(/\bimportScripts\b|\bnew\s+(?:Shared)?Worker\b|\bnavigator\s*\.\s*serviceWorker\b/g, (m) => err(m.index, 'no-network', m[0].replace(/\s+/g, ' ') + ' is forbidden (no workers, no extra scripts)'));
  /* string-keyed access to the same forbidden things: window['setTimeout'], console['error'], self["addEventListener"], window["eval"] ... */
  const BRACKET = { setTimeout: 'bare-timer', setInterval: 'bare-timer', requestAnimationFrame: 'bare-timer', clearTimeout: 'bare-timer', clearInterval: 'bare-timer', cancelAnimationFrame: 'bare-timer',
    eval: 'no-eval', Function: 'no-eval', localStorage: 'no-storage', sessionStorage: 'no-storage', indexedDB: 'no-storage', addEventListener: 'global-listener', removeEventListener: 'global-listener',
    open: 'no-window-open', alert: 'no-dialog', confirm: 'no-dialog', prompt: 'no-dialog', error: 'no-console-error', warn: 'no-console-error', fetch: 'no-network', XMLHttpRequest: 'no-network', WebSocket: 'no-network' };
  rx(/\b(window|globalThis|self|top|parent|document|console)\s*\[\s*(['"`])/g, (m) => {
    const s = L.strings.find((x) => x.start === m.index + m[0].length);
    if (s && Object.prototype.hasOwnProperty.call(BRACKET, s.value)) err(s.start, BRACKET[s.value], m[1] + '[\'' + s.value + '\'] is the forbidden ' + s.value + ' in disguise');
  });
  if (!isGame && kind !== 'content') return;

  /* emoji newer than Emoji 12 are empty boxes on Windows 10; dangerous URL schemes; protocol-relative URLs */
  {
    const noc = L.noc, seen = new Set();
    for (let i = 0; i < noc.length;) {
      const cp = noc.codePointAt(i);
      if (cp >= 0x1F000 && isNewEmoji(cp) && !seen.has(cp)) {
        seen.add(cp);
        err(i, 'new-emoji', 'emoji ' + String.fromCodePoint(cp) + ' (U+' + cp.toString(16).toUpperCase() + ') is newer than Emoji 12 and renders as an empty box on Windows 10 (and older systems). Use an older emoji.');
      }
      i += cp > 0xffff ? 2 : 1;
    }
    L.strings.forEach((s) => {
      if (/^\s*\/\/[a-z0-9-]+\.[a-z]{2,}/i.test(s.value)) err(s.start, 'no-url', 'protocol-relative URL "' + s.value.slice(0, 40) + '" is an external URL');
      if (/\bjavascript\s*:/i.test(s.value)) err(s.start, 'no-url', 'javascript: URLs are forbidden');
      if (/\bdata\s*:\s*(text\/html|application\/(x-)?javascript|text\/javascript)/i.test(s.value)) err(s.start, 'no-url', 'data: URL with active content is forbidden');
    });
  }

  if (isGame) {
    const aliasNames = new Set(['api']);
    let am;
    const rm = /\bmount\s*(?:\(|:\s*(?:async\s*)?function\s*\(|:\s*(?:async\s*)?\()\s*[\w$]+\s*,\s*([\w$]+)/g;
    while ((am = rm.exec(code))) aliasNames.add(am[1]);
    const ra = /\b(?:const|let|var)\s+([\w$]+)\s*=\s*api\s*[;,\n]/g;
    while ((am = ra.exec(code))) aliasNames.add(am[1]);

    /* bare timers */
    rx(/(?:([A-Za-z_$][\w$]*)\s*\??\.\s*)?\b(setTimeout|setInterval|requestAnimationFrame|clearTimeout|clearInterval|cancelAnimationFrame)\b\s*(?:\?\.\s*)?\(/g, (m) => {
      const owner = m[1];
      if (owner && aliasNames.has(owner)) return;
      const pre = code.slice(Math.max(0, m.index - 12), m.index);
      if (/function\s*$/.test(pre)) return;
      err(m.index, 'bare-timer', (owner ? owner + '.' : '') + m[2] + '( ) is forbidden in modules: use api.' + m[2] + ' (managed and auto-cleared on destroy)');
    });
    /* aliases of the window timers/listeners/storage: const { setTimeout } = window;  const st = setTimeout;  const ael = window.addEventListener */
    rx(/\b(?:const|let|var)\s*\{[^}]*\b(setTimeout|setInterval|requestAnimationFrame|localStorage|sessionStorage|indexedDB|eval|addEventListener|fetch)\b[^}]*\}\s*=\s*(?:window|globalThis|self|document)\b/g, (m) => err(m.index, 'bare-timer', 'destructuring ' + m[1] + ' out of window hides a forbidden call: use api.' + (/timeout|interval|animation/i.test(m[1]) ? m[1] : 'on / api.save')));
    rx(/=\s*(?:(?:window|globalThis|self)\s*\.\s*)?(setTimeout|setInterval|requestAnimationFrame)\s*[;,)\n]/g, (m) => err(m.index, 'bare-timer', 'aliasing ' + m[1] + ' hides a forbidden call: use api.' + m[1]));
    rx(/(?:^|[^\w$.])(window|self|globalThis|top|parent|document|document\.body|document\.documentElement|body)\s*\??\.\s*(addEventListener|removeEventListener)\b/g, (m) => err(m.index, 'global-listener', m[1] + '.' + m[2] + ' is forbidden: use api.on(' + m[1] + ', event, handler) (auto-removed on destroy)'));
    rx(/\b(?:window|globalThis|self)\s*\.\s*(?:addEventListener|setTimeout|setInterval)\s*\?\.\s*\(|\b(?:addEventListener)\s*\?\.\s*\(/g, (m) => err(m.index, 'global-listener', 'optional-call of a global timer/listener is forbidden: use api.*'));
    /* things a module must never touch: the page itself */
    rx(/\bdocument\s*\.\s*title\s*=(?!=)/g, (m) => err(m.index, 'page-tamper', 'document.title is the Lobby\'s: use api.setTitle for the module window'));
    rx(/\bdocument\s*\.\s*(?:body|documentElement)\s*\.\s*(classList|style|className|setAttribute|append|appendChild|prepend|insertBefore|replaceChildren|innerHTML|outerHTML)\b|\bdocument\s*\.\s*head\s*\.\s*(append|appendChild|prepend|insertBefore|innerHTML)\b/g, (m) => err(m.index, 'page-tamper', 'a module may only touch its own root (api.root), not ' + m[0].replace(/\s+/g, '') + '; the engine would have to clean it up'));
    rx(/\b(?:Object|Array|String|Number|Function|Promise|Map|Set|Date|Math|JSON|Element|Node|EventTarget|HTMLElement)\s*\.\s*prototype\s*\.\s*[\w$]+\s*=(?!=)|\bObject\s*\.\s*(?:defineProperty|assign|setPrototypeOf)\s*\(\s*(?:Object\.prototype|window|globalThis|document|self)\b/g, (m) => err(m.index, 'no-prototype-write', 'patching built-ins or window is forbidden: ' + m[0].slice(0, 40).replace(/\s+/g, ' ')));
    rx(/(?:^|[^\w$.])(?:window|globalThis|self)\s*\.\s*(?!on[a-z]+\s*=)([A-Za-z_$][\w$]*)\s*=(?!=)/g, (m) => err(m.index, 'no-global-write', 'creating or changing the global window.' + m[1] + ' is forbidden: keep state inside mount()'));
    rx(/\b(?:el|createElement|createElementNS)\s*\(\s*(?:[^'"`()]*,\s*)?(['"`])/g, (m) => {
      const s = L.strings.find((x) => x.start === m.index + m[0].length);
      if (s && /^(script|iframe|link|object|embed|meta|base|frame|frameset)$/i.test(s.value)) err(s.start, 'no-script-element', '<' + s.value + '> elements load or run outside code and are forbidden');
    });
    rx(/\bnew\s+Audio\b/g, (m) => warn(m.index, 'no-audio-files', 'no audio files in this project: use api.sfx(name) (WebAudio synth)'));
    rx(/\bnew\s+Date\s*\(\s*\)/g, (m) => warn(m.index, 'use-api-now', 'use api.now() (monotonic and virtual-time friendly); new Date() is the wall clock'));
    rx(/\.\s*(outerHTML\s*\+?=(?!=)|insertAdjacentHTML\s*\()/g, (m) => warn(m.index, 'inner-html', m[1].replace(/\s*\+?=.*|\(.*/, '') + ' with player-supplied text is unsafe: prefer api.el / textContent'));
    /* engine objects: modules talk to the engine through api only (P.on leaks; P.native is the engine's own) */
    rx(/\b(?:P|POINTLESS|window\s*\.\s*POINTLESS)\s*\.\s*on\s*\(/g, (m) => err(m.index, 'no-engine-on', 'P.on(...) is never removed when the module is destroyed: use api.onEvent(name, fn) (auto-removed)'));
    rx(/\b(?:P|POINTLESS|window\s*\.\s*POINTLESS)\s*\.\s*native\b/g, (m) => err(m.index, 'no-native', 'P.native is for the engine only: use api.setTimeout / api.on / api.now'));
    rx(/\b(?:P|POINTLESS|window\s*\.\s*POINTLESS)\s*\.\s*(state|fx|sfx|narrator|host|ui|passive|storage|diag|emit|reportError)\b/g, (m) => warn(m.index, 'use-api', 'P.' + m[1] + ' bypasses the api (stats, sound, narrator, toasts and state have api.* equivalents that are tracked and cleaned up)'));
    rx(/\b(window|document)\s*\.\s*on[a-z]+\s*=(?!=)/g, (m) => err(m.index, 'global-listener', 'assigning ' + m[0].replace(/\s*=$/, '') + ' is forbidden: use api.on'));
    rx(/\bconsole\s*\.\s*(error|warn)\b/g, (m) => err(m.index, 'no-console-error', 'console.' + m[1] + ' is forbidden in modules (the fuzz harness fails on it)'));
    rx(/\bconsole\s*\.\s*(log|info|debug)\b/g, (m) => warn(m.index, 'no-console-log', 'remove console.' + m[1] + ' before shipping'));
    rx(/\b(localStorage|sessionStorage|indexedDB)\b|\bdocument\s*\.\s*cookie\b/g, (m) => err(m.index, 'no-storage', m[0] + ' is forbidden: use api.save.get/set (module-scoped, with memory fallback)'));
    rx(/\bDate\s*\.\s*now\s*\(|\bperformance\s*\.\s*now\s*\(/g, (m) => warn(m.index, 'use-api-now', 'use api.now() (monotonic and virtual-time friendly)'));
    rx(/\bMath\s*\.\s*random\s*\(/g, (m) => warn(m.index, 'use-api-rand', 'use api.rand()/randInt/pick/shuffle/chance (seeded, deterministic under ?seed)'));
    rx(/\bdocument\s*\.\s*(body|documentElement|head|querySelector|querySelectorAll|getElementById|getElementsBy\w+)\b/g, (m) => warn(m.index, 'stay-in-root', 'rule 1: render only inside root (use root.querySelector); document.' + m[1] + ' touches the Lobby'));
    rx(/\.\s*innerHTML\s*\+?=(?!=)/g, (m) => warn(m.index, 'inner-html', 'innerHTML with player-supplied text is unsafe: prefer api.el / textContent'));

    /* registerModule + id conventions */
    if (!/\bregisterModule\s*\(/.test(code)) err(0, 'no-register', 'no P.registerModule({...}) call found');
    if (f.decl.modules.length > 1) warn(f.regIdx[1], 'multi-module', 'more than one registerModule in a file (one file = one module)');
    const expected = f.fileId;
    if (kind === 'game' && !KID.test(expected)) err(0, 'id-convention', 'file name "' + path.basename(f.rel) + '" must be kebab-case (a-z, 0-9, dashes)');
    if (f.decl.modules.length) {
      const mid = f.decl.modules[0];
      if (kind === 'game' && RESERVED_IDS.indexOf(mid.id) >= 0) addLine(mid.line, 'error', 'reserved-id', 'module id "' + mid.id + '" is reserved by the engine (' + RESERVED_IDS.join(', ') + '): pick another');
      if (!KID.test(mid.id)) addLine(mid.line, 'error', 'id-convention', 'module id "' + mid.id + '" must be kebab-case');
      else if (mid.id !== expected) addLine(mid.line, 'error', 'id-convention', 'module id "' + mid.id + '" must equal the file name "' + expected + '" (games/' + expected + '.js)');
    }
    const id = (f.decl.modules[0] && f.decl.modules[0].id) || expected;
    if (!f.header) warn(0, 'header', 'first line should be the marker comment: /* POINTLESS module: ' + id + ' */');
    else if (f.header[1] !== id) warn(f.src.indexOf(f.header[0]), 'header', 'header comment says "' + f.header[1] + '" but the module id is "' + id + '"');
    if (!/['"]use strict['"]/.test(src)) warn(0, 'use-strict', "missing 'use strict'");

    /* line budget */
    const nLines = f.srcLines.length;
    if (nLines > LINE_BUDGET) addLine(LINE_BUDGET, 'error', 'line-budget', 'file has ' + nLines + ' lines; budget is ' + LINE_BUDGET + ' (SPEC 5.9)');
    else if (nLines > LINE_WARN) addLine(1, 'warning', 'line-budget', 'file has ' + nLines + ' lines; budget is ' + LINE_BUDGET);

    /* injectCSS */
    const cssTokens = new Set();
    rx(/\binjectCSS\s*\(/g, (m) => {
      const open = m.index + m[0].length - 1;
      const close = matchClose(code, open);
      const inside = L.strings.filter((s) => s.start > open && s.start < (close > 0 ? close : Infinity));
      if (!inside.length) { warn(m.index, 'css-dynamic', 'injectCSS argument is not a string literal; cannot verify the m-' + id + '- prefix'); return; }
      const s = inside[0];
      cssTokens.add(s);
      checkCss(s.value, id, f.lineOf(s.start), (line, rule, msg) => addLine(line, 'error', rule, msg));
      const idArg = inside[1];
      if (idArg && idArg.value.indexOf('css-' + id) !== 0 && idArg.value.indexOf(id) < 0) warn(idArg.start, 'css-id', 'use a dedupe id containing the module id, e.g. "css-' + id + '"');
    });
    /* class names used from JS */
    L.strings.forEach((s) => {
      if (cssTokens.has(s)) return;
      const rc = /(^|[^\w-])(m-[a-z0-9][a-z0-9-]*)/g; let cm;
      while ((cm = rc.exec(s.value))) {
        if (cm[2].indexOf('m-' + id + '-') !== 0) err(s.start + cm.index + cm[1].length, 'css-prefix', 'class name "' + cm[2] + '" must start with "m-' + id + '-"');
      }
    });

    /* achievements / shop / stats / flags */
    f.decl.achievements.forEach((a) => { if (a.id.indexOf(id + '.') !== 0) addLine(a.line, 'error', 'id-prefix', 'achievement id "' + a.id + '" must be prefixed "' + id + '."'); });
    f.decl.shop.forEach((a) => { if (a.id.indexOf(id + '.') !== 0) addLine(a.line, 'error', 'id-prefix', 'shop item id "' + a.id + '" must be prefixed "' + id + '."'); });
    f.decl.settings.forEach((a) => { if (a.id.indexOf(id + '.') !== 0) addLine(a.line, 'warning', 'id-prefix', 'setting id "' + a.id + '" should be prefixed "' + id + '."'); });
    if (f.achCount.total < 6) addLine(1, 'error', 'achievements', 'declares ' + f.achCount.total + ' achievement(s); SPEC 5.5 requires >= 6');
    if (f.achCount.secret < 2) addLine(1, 'error', 'achievements', 'declares ' + f.achCount.secret + ' secret achievement(s) (secret:true); SPEC 5.5 requires >= 2');
    rx(/\bstat\s*\.\s*(inc|set|max)\s*\(\s*(['"`])/g, (m) => {
      const s = L.strings.find((x) => x.start === m.index + m[0].length);
      if (s && s.value.indexOf(id + '.') !== 0) err(s.start, 'stat-prefix', 'module stat "' + s.value + '" must be prefixed "' + id + '."');
    });
    rx(/\bflag\s*\.\s*set\s*\(\s*(['"`])/g, (m) => {
      const s = L.strings.find((x) => x.start === m.index + m[0].length);
      if (s && s.value.indexOf(id + '.') !== 0 && SHARED_FLAGS.indexOf(s.value) < 0) warn(s.start, 'flag-prefix', 'flag "' + s.value + '" should be prefixed "' + id + '." (unless it is an intentionally shared flag like metGerald)');
    });

    /* line categories */
    rx(/\baddLines\s*\(\s*(['"`])/g, (m) => {
      const s = L.strings.find((x) => x.start === m.index + m[0].length);
      if (!s) return;
      if (s.value.indexOf('m:') === 0) { if (s.value.indexOf('m:' + id + ':') !== 0) err(s.start, 'line-category', 'custom line category "' + s.value + '" must start with "m:' + id + ':"'); }
      else if (CATEGORIES.indexOf(s.value) < 0) err(s.start, 'line-category', 'unknown line category "' + s.value + '" (standard: ' + CATEGORIES.join(' ') + '; custom: m:' + id + ':<name>)');
    });
    rx(/\.\s*(line|sayRandom)\s*\(\s*(['"`])/g, (m) => {
      const s = L.strings.find((x) => x.start === m.index + m[0].length);
      if (!s) return;
      if (s.value.indexOf('m:') === 0 ? s.value.indexOf('m:' + id + ':') !== 0 : CATEGORIES.indexOf(s.value) < 0) warn(s.start, 'line-category', 'line category "' + s.value + '" is not a standard category or an m:' + id + ': category (typo?)');
    });

    /* a category that is spoken but never filled falls back to a generic line: almost always a typo */
    {
      const added = new Set(); let dynamicAdd = false;
      rx(/\baddLines\s*\(\s*(['"`]?)/g, (m) => {
        const s = m[1] ? L.strings.find((x) => x.start === m.index + m[0].length) : null;
        if (s) added.add(s.value); else dynamicAdd = true;
      });
      if (!dynamicAdd) {
        rx(/\.\s*(line|sayRandom)\s*\(\s*(['"`])/g, (m) => {
          const s = L.strings.find((x) => x.start === m.index + m[0].length);
          if (s && s.value.indexOf('m:' + id + ':') === 0 && !added.has(s.value)) warn(s.start, 'line-category-empty', 'line category "' + s.value + '" is used but never filled with P.addLines in this file: Management will say a generic fallback line (typo?)');
        });
      }
    }

    /* unknown tokens in text */
    L.strings.forEach((s) => {
      if (cssTokens.has(s) || s.value.length < 12 || s.value.indexOf(' ') < 0) return;
      const rt = /(?<!\$)\{([A-Za-z]+)\}/g; let tm;
      while ((tm = rt.exec(s.value))) {
        if (TOKENS.indexOf(tm[1]) < 0 && !/[;:]\s*[\w-]+\s*[:;]/.test(s.value)) warn(s.start + tm.index, 'unknown-token', 'unknown token {' + tm[1] + '} (known: ' + TOKENS.map((t) => '{' + t + '}').join(' ') + ')');
      }
    });

    /* content density (modules only; the template is intentionally tiny) */
    if (kind === 'game') {
      const lines = new Set();
      L.strings.forEach((s) => { if (!cssTokens.has(s) && s.value.length >= 25 && s.value.indexOf(' ') > 0 && !/^[\w./:#-]+$/.test(s.value)) lines.add(s.value); });
      if (lines.size < 80) addLine(1, 'warning', 'content-density', 'found ' + lines.size + ' distinct line-like strings; SPEC 5.6 wants >= 80 funny, specific lines');
    }
  }

  if (kind === 'content') {
    rx(/\baddLines\s*\(\s*(['"`])/g, (m) => {
      const s = L.strings.find((x) => x.start === m.index + m[0].length);
      if (!s) return;
      if (s.value.indexOf('m:') !== 0 && CATEGORIES.indexOf(s.value) < 0) err(s.start, 'line-category', 'unknown line category "' + s.value + '" (standard: ' + CATEGORIES.join(' ') + ')');
    });
    rx(/\bregisterModule\s*\(/g, (m) => warn(m.index, 'content-module', 'content files should not register modules (put them in games/)'));
    if (!KID.test(path.basename(f.rel, '.js').replace(/^_/, ''))) addLine(1, 'error', 'id-convention', 'content file name must be kebab-case');
    L.strings.forEach((s) => {
      if (s.value.length < 12 || s.value.indexOf(' ') < 0) return;
      const rt = /(?<!\$)\{([A-Za-z]+)\}/g; let tm;
      while ((tm = rt.exec(s.value))) if (TOKENS.indexOf(tm[1]) < 0 && !/[;:]\s*[\w-]+\s*[:;]/.test(s.value)) warn(s.start + tm.index, 'unknown-token', 'unknown token {' + tm[1] + '} (known: ' + TOKENS.map((t) => '{' + t + '}').join(' ') + ')');
    });
  }
}

/* ------------------------------------------------------------------ main */
function listFiles(dir, re) {
  const abs = path.join(ROOT, dir);
  try { return fs.readdirSync(abs).filter((n) => re.test(n) && !n.startsWith('_')).sort().map((n) => path.join(abs, n)); } catch (e) { return []; }
}

function run(argv) {
  const opts = { quiet: false, strict: false, json: false };
  const files = [];
  argv.forEach((a) => {
    if (a === '--quiet') opts.quiet = true; else if (a === '--strict') opts.strict = true; else if (a === '--json') opts.json = true;
    else if (a.startsWith('--')) { console.error('unknown option ' + a); process.exit(2); }
    else files.push(a);
  });
  let targets;
  if (files.length) {
    targets = files.map((f) => {
      let p = path.resolve(process.cwd(), f);
      if (!fs.existsSync(p)) p = path.resolve(ROOT, f);
      return p;
    });
    for (const t of targets) if (!fs.existsSync(t)) { console.error('lint: no such file: ' + t); process.exit(2); }
    /* a directory argument means "every .js file in it" (not EISDIR) */
    targets = [].concat.apply([], targets.map((t) => fs.statSync(t).isDirectory()
      ? fs.readdirSync(t).filter((n) => /\.js$/.test(n)).sort().map((n) => path.join(t, n)) : [t]));
  } else {
    targets = [].concat(listFiles('games', /\.js$/), listFiles('content', /\.js$/), [path.join(ROOT, 'tools', 'template-module.js')], listFiles('core', /\.js$/))
      .filter((p) => fs.existsSync(p));
  }
  const findings = [];
  const analyzed = {};
  targets.forEach((t) => {
    let f;
    try { f = analyze(t); } catch (e) { findings.push({ file: path.relative(ROOT, t), line: 1, col: 1, sev: 'error', rule: 'read', msg: e.message }); return; }
    analyzed[f.rel] = f;
    lintFile(f, findings);
  });

  /* duplicate ids across ALL project files (not just the ones being linted) */
  const index = {};
  const pool = [].concat(listFiles('games', /\.js$/), listFiles('content', /\.js$/));
  pool.forEach((p) => {
    const rel = path.relative(ROOT, p).replace(/\\/g, '/');
    let f = analyzed[rel];
    if (!f) { try { f = analyze(p); } catch (e) { return; } }
    const put = (kind, list) => list.forEach((x) => { (index[kind + ':' + x.id] = index[kind + ':' + x.id] || []).push({ rel, line: x.line }); });
    put('module', f.decl.modules.length ? f.decl.modules : []);
    put('achievement', f.decl.achievements); put('shop item', f.decl.shop); put('setting', f.decl.settings);
  });
  Object.keys(index).forEach((k) => {
    const where = index[k];
    if (where.length < 2) return;
    const [kind, id] = [k.slice(0, k.indexOf(':')), k.slice(k.indexOf(':') + 1)];
    where.forEach((w) => {
      if (!analyzed[w.rel]) return;
      const others = where.filter((o) => o !== w).map((o) => o.rel + ':' + o.line).join(', ');
      findings.push({ file: w.rel, line: w.line, col: 1, sev: 'error', rule: 'duplicate-id', msg: 'duplicate ' + kind + ' id "' + id + '" (also in ' + others + ')' });
    });
  });

  findings.sort((a, b) => (a.file < b.file ? -1 : a.file > b.file ? 1 : a.line - b.line));
  const errors = findings.filter((x) => x.sev === 'error').length;
  const warnings = findings.length - errors;
  if (opts.json) { console.log(JSON.stringify({ errors, warnings, findings }, null, 2)); }
  else {
    findings.forEach((x) => { if (opts.quiet && x.sev === 'warning') return; console.log(x.file + ':' + x.line + ':' + x.col + '  ' + x.sev + '  ' + x.rule + '  ' + x.msg); });
    console.log('lint: ' + targets.length + ' file(s), ' + errors + ' error(s), ' + warnings + ' warning(s)');
  }
  return (errors > 0 || (opts.strict && warnings > 0)) ? 1 : 0;
}

module.exports = { run, lex, analyze };
if (require.main === module) process.exit(run(process.argv.slice(2)));
