# POINTLESS(TM) DELUXE - Technical Spec (authoritative)

A deliberately, gloriously useless browser comedy game. An "arcade" of pointless activities ("modules") run from a Lobby by a relentlessly corporate narrator called **Management**. The currency is **Meh**. Nothing you do matters; everything you do is celebrated with total sincerity.

## 1. Hard constraints

- Opens by double-clicking `index.html` (file://). **No server, no build step needed to play, no network, no CDN, no external fonts/images/audio.**
- Vanilla JS in classic `<script>` tags. **NO ES modules, NO `import`, NO `fetch`/XHR, NO `eval`/`new Function` in shipped code** (tools may use them).
- Visuals: CSS, emoji, inline SVG, `<canvas>`. System fonts only.
- Targets latest Edge/Chrome/Firefox, desktop first, but usable down to 360px wide.
- Family friendly: no profanity, slurs, sexual content, real people, real brands, politics. See VOICE.md.
- A module must never be able to crash the Lobby. The Lobby must survive a module that throws.

## 2. Folder layout (project root = the folder containing this file)

```
index.html                 entry point (engine)
SPEC.md VOICE.md TESTING.md README.md
core/*.js core/*.css       engine (ONLY engine agents / the integrator edit these)
content/*.js               global content packs (lines, achievements, shop, ticker...)
games/<id>.js              one file per module; <id> is kebab-case and equals the module id
design/<id>.md             design briefs written before a module is built
tools/                     node dev tools (build.js selftest.js shot.js lint.js template-module.js)
generated/manifest.js      written by tools/build.js (list of content/*.js and games/*.js, files starting with "_" are skipped)
reports/                   scratch/QA output; reports/shots/ for screenshots
```

Load order in `index.html`: engine `core/00-registry.js ... core/70-fuzz.js` (fixed order, hard-coded in `index.html`) -> `generated/manifest.js` -> loader `document.write`s `<link>`/`<script>` tags for every `core/ui-*.css`, `core/ui-*.js` (Lobby UI, sorted), then every `content/*.js`, then every `games/*.js` -> `core/99-boot.js` (last). A script that throws while loading must not stop the others (`core/00-registry.js` captures it into `P.diag`, the Lobby's diagnostics list; `?selftest` reports it).

**Engine file ownership.** `core/00-` .. `core/99-*.js` and `core/base.css` belong to the engine agent. The Lobby agent adds only `core/ui-*.js` / `core/ui-*.css` (picked up automatically by `tools/build.js`; no `index.html` edit needed). `core/ui-00-lobby-placeholder.js|css` is a TEMPORARY placeholder Lobby: the Lobby agent deletes it (or just registers its own lobby from a later-sorting file: the last `P.ui.setLobby` call wins).

## 3. URL parameters

- `?dev=<id>`: load core + content + ONLY `games/<id>.js`, skip the Lobby and intro, mount that module directly in the module window. (Module agents test with this; it does not need the manifest.)
- `?selftest=<id>`: like `?dev=<id>` but runs the fuzz harness (section 6) and writes the result. `?selftest=lobby` loads everything from the manifest and fuzzes the Lobby (opens every screen, enters/exits modules).
- `?seed=N` seeds `api.rand` and the engine RNG. **Default: 1 under `?dev`/`?selftest` (reproducible), random in normal Lobby play** (a fixed default seed would make every real session identical). `?steps=N` (default 400) fuzz steps. `?nostorage=1` forces the in-memory save fallback. `?mute=1` disables audio.
- In `?dev`/`?selftest` mode persistence uses a throwaway namespace so runs never pollute the real save: `?dev=<id>` uses localStorage key `pointless-arcade-v1:dev:<id>` (survives reloads, so you can test saves); `?selftest` is memory-only (always a fresh save).
- Extra params (engine): `?shot=1` (screenshot run: timers replace rAF, Lobby must skip first-run modal/intro), `?actions=N` (after load run N random fuzz actions, no checks), `?screen=<name>` (Lobby: open that screen after boot), `?idle=MS` (selftest long-idle window, default 62000 virtual ms, 0 disables), `?enter=<id>` (with `?shot=1` in Lobby mode: open that module from the real Lobby; `tools/shot.js lobby --enter <id>`).
- Under headless virtual time the browser never fires real `requestAnimationFrame`; therefore `?selftest` and `?shot` make `api.requestAnimationFrame` run on a 16ms timer. Modules must keep animations delta-time based (use the timestamp argument) so this is invisible.

## 4. Global registry: `window.POINTLESS`

Called by files at load time:

```js
/* POINTLESS module: <id> */
(function () {
  'use strict';
  const P = window.POINTLESS;
  P.injectCSS(`.m-<id>-card{...}`, 'css-<id>');           // deduped by id; ALL class names prefixed m-<id>-
  P.addAchievements([{ id:'<id>.first', name:'...', desc:'...', icon:'🏆', secret:false, reward:5 }]);
  P.registerModule({
    id: '<id>', title: '...', tagline: 'one-line teaser',
    icon: '🍞', category: 'game' /* or 'department' */, unlockCost: 0, tags: ['clicker'],
    mount(root, api) { /* build UI inside root */ return { destroy() {} }; }  // destroy optional
  });
})();
```

- `P.registerModule(def)`: validates (id kebab-case, title, mount fn); duplicate ids and the **reserved ids** (`lobby shop meh clicks keys time modules session achievements narrator ascensions tos template system`: they collide with engine stat prefixes, the shop api or `?dev=lobby`; also `P.RESERVED_IDS`) are rejected with a console warning (never throw). Title is cut to 60 characters, tagline to 200, icon to 12 code points; `unlockCost: Infinity` means very expensive, not free. An icon (also achievement and shop icons) that has no glyph on this machine (an emoji newer than the system font, e.g. Emoji 13+ on Windows 10) is replaced by a fallback (`P.util.safeEmoji`); use Emoji 12 or older so every player sees what you meant (`node tools/lint.js` errors on newer ones).
- `P.addAchievements([{id, name, desc, icon?, secret?, reward?, check?(stats, flags)}])` - `check` is evaluated by the engine whenever a stat/flag changes (cheap, wrapped in try/catch). Otherwise unlocked manually with `api.achieve(id)`. Module achievement ids MUST be prefixed `<id>.`.
- `P.addShopItems([{id, name, desc, price, icon, category:'cosmetic'|'consumable'|'upgrade'|'junk', repeatable?, effect?:{bodyClass?, css?, onBuy?(api), onToggle?(on, api)}, flavor?:[strings]}])` - module items prefixed `<id>.`.
- `P.addLines(category, [strings])` - narrator/flavor lines. Tokens substituted at use: `{player}` `{meh}` `{module}` `{count}` `{item}`. Categories:
  `greeting idle award bigAward nothing buy hubReturn moduleEnter moduleExit farewell achievement error404 tip lockedTease ticker fortune tosClause creditsLine patchNote loading poster plantStatus notice lobbyEvent`
  (a module may also use its own custom categories, e.g. `P.addLines('m:<id>:insults', [...])` and read them with `api.line('m:<id>:insults')`).
- `P.addSettings([{id, label, type:'toggle'|'slider'|'select', options?, min?, max?, default, responses:[strings]}])` - decorative settings in the Settings screen that do nothing except make Management react with one of `responses`.
- `P.injectCSS(css, id)`.

### The `api` passed to `mount(root, api)`

| member | behaviour |
|---|---|
| `api.root`, `api.id` | the root element, the module id |
| `api.award(n, reason?)` | add `n` Meh (fractional ok, negative = fine, never below 0), floating "+N Meh" text, counts toward stats |
| `api.meh()` | current balance |
| `api.fmt(n)` | pretty number ("1,204", "1.2M") |
| `api.say(text, opts?)` | Management speaks. opts `{mood:'neutral'\|'proud'\|'disappointed'\|'confused'\|'panic'\|'smug', who:'Management'\|'Gerald'\|any string, duration:ms, priority:0-2}` |
| `api.line(category, tokens?)` / `api.sayRandom(category, opts?)` | pick a random line (token substituted, shuffle bag so no immediate repeats; an empty category falls back to a built-in line, never `undefined`) / say it. `tokens` (and, for `sayRandom`, `opts`) may carry `{player, meh, module, count, item}` overrides, e.g. `api.sayRandom('m:x:lines', { count: 12 })` |
| `api.achieve(id)` | unlock achievement (idempotent) |
| `api.stat.inc(name,n=1)` `.set` `.get` `.max` | global persistent stats; module stats MUST be prefixed `<id>.` |
| `api.flag.get(name)` `api.flag.set(name,v)` | global persistent flags for cross-module callbacks (prefix with module id unless intentionally shared like `metGerald`) |
| `api.save.get(key, dflt)` `api.save.set(key,v)` | module-scoped persistent JSON (localStorage; try/catch; memory fallback) |
| `api.sfx(name)` | `blip bloop ding honk boing sad fanfare error stamp pop whoosh tick tada bell buzz` WebAudio synth; silent if muted/unavailable; never throws |
| `api.confetti(x?, y?, n?)` | confetti burst (defaults to center of root) |
| `api.toast(text, opts?)` | small toast |
| `api.rand()` `randInt(a,b)` `pick(arr)` `shuffle(arr)` `chance(p)` | seeded RNG (deterministic under `?seed`) |
| `api.setTimeout/setInterval/requestAnimationFrame` + `clear*` | MANAGED versions, auto-cleared when the module is destroyed. **Modules must never use the window versions.** |
| `api.on(target, event, handler, opts)` | managed `addEventListener`, auto-removed on destroy. Returns an off() function |
| `api.onEvent(name, fn)` | managed subscription to ENGINE events (`meh`, `say`, `stat`, `achievement`, `bought`, `toast` ... see 9.5), auto-removed on destroy. Returns an off() function. **Never call `P.on` from a module**: it is not removed on destroy and fails the fuzz run |
| `api.hasItem(id)` `api.itemCount(id)` | shop ownership |
| `api.el(tag, attrs?, ...children)` | hyperscript helper (attrs: class, style string/object, on* functions, text, dataset, aria-*); details below |
| `api.setTitle(text)` | module window title bar text |
| `api.exit()` | return to the Lobby |
| `api.player` | `{name}` (default "Valued Employee") |
| `api.selftest` | true during fuzz runs (lets a module shorten very long waits) |
| `api.now()` | monotonic ms (use instead of Date.now/performance.now) |

The engine also tracks automatically (read-only for modules, see below): `meh.earned meh.spent meh.passive lobby.visits clicks.total keys.total time.seconds modules.entered modules.unlocked shop.bought achievements.unlocked narrator.lines ascensions tos.scrolls session.count` and per module `<id>.entered`, `<id>.seconds`, `<id>.meh` (Meh earned through that module's `api.award`). `lobby.visits`/`modules.entered`/`<id>.entered` are incremented by `P.host`; `tos.scrolls` by the Lobby.

**Exact behaviour of the api (as implemented in `core/50-api.js`):**

- Additional members: `api.destroyed` (getter, true after destroy). `api.line` takes an optional token object (above).
- `api.award(n, reason?)` returns the Meh actually added (negative when spent; 0 if ignored). Non-finite `n` is ignored; `n` is clamped to +-1e9; the balance never drops below 0. It floats the amount that actually changed hands ("+N Meh" / "-N Meh", nothing at all for a delta under 0.005, e.g. `award(-5)` at a balance of 2 floats "-2 Meh") near the last pointer position inside the root (else near the top of the root).
- `api.say(...)` returns true if the line was accepted (the narrator drops exact duplicates of the current/just-shown line and coalesces priority-0 chatter, so a return of false is normal under spam). `api.sayRandom` / `api.line` count as say/line calls for the fuzz harness.
- `api.stat.inc/set/max` with a name not starting with `<id>.` still applies but records a warning; the engine's own stats (list above) AND every `<anything>.entered`, `<anything>.seconds` and `<anything>.meh` are protected: writes to them are ignored with a warning. A module may create at most 300 distinct stat names under its own prefix (3000 in the whole save); further new names are ignored with a warning, so use a few counters, not one per thing. `api.stat.get` works for any name and returns 0 when unset.
- `api.save.set(key, v)` stores a JSON clone (returns false and ignores the write for non-JSON values: functions, `NaN`/`Infinity`, `Date`/`Map`/class instances, holes or `undefined` inside arrays; a property that is `undefined` is simply left out; also false when the module's blob would exceed 200 KB); `api.save.get` returns a fresh clone. `api.flag.get` also returns a copy; `api.flag.set` obeys the same JSON rule and refuses values over 20 KB (flags are for small cross-module facts; bulk data belongs in `api.save`). `api.player.name` is read-only (assigning is a no-op).
- `api.shuffle(arr)` returns a NEW shuffled array (does not mutate). `api.pick([])` returns `undefined`. `randInt(a,b)` is inclusive and tolerates swapped bounds.
- Managed timers: ids are plain numbers (not native ids); `setTimeout` clamps to >= 1ms, `setInterval` to >= 8ms, and delays above 2147483647 ms (also `Infinity`, `1e12`) mean "practically never" (they used to fire at once); a non-function callback returns 0 (string callbacks are not supported); at most 1000 live timers per module; an exception in a callback is caught and reported (`P.diag` kind `module-error`; an error that repeats every tick is ONE diagnostics entry with a counter), it never reaches `window.onerror`. After destroy every managed callback is silenced and the state-changing api calls (`award`, `say`, `achieve`, `stat.*`, `flag.set`, `save.set`, `sfx`, `confetti`, `toast`, timers, `on`, `onEvent`, `exit`) become harmless no-ops that are counted (`counts.afterDestroy`) and warned about.
- `api.on(target, event, handler, opts)` accepts any event target (also `window`/`document`); handler exceptions are caught and reported the same way; returns `off()`. `api.onEvent(name, fn)` is the same for engine events.
- `api.el`: `on*` function attributes are wrapped like `api.on` (inline string handlers such as `onclick: 'x()'` are ignored with a warning); children `null`/`undefined`/`false`/`true` and functions are not rendered (numbers are, so a `NaN` shows up and fails the fuzz run, as it should). Attributes: `true`/`false` become the strings `"true"`/`"false"` for `aria-*`, `draggable`, `spellcheck`, `contenteditable` (elsewhere `true` is a bare attribute and `false`/`null`/`undefined` skip it); `dataset` skips `null`/`undefined`; `htmlFor` works. Properties `value checked selected disabled hidden open multiple readOnly required autofocus tabIndex` are applied AFTER all attributes and children exist, so `{type:'range', max:300, value:200}` and `select` values work, and `{value: undefined}` leaves the field empty. Style objects: numbers get `px` except unitless properties (opacity, zIndex, flex, flexGrow, flexShrink, order, lineHeight, fontWeight, zoom, columnCount, gridRow/gridColumn, scale, aspectRatio, strokeWidth, tabSize ...). SVG tags are recognised case-insensitively and created with their canonical names (`feColorMatrix`, `animateTransform`, `foreignObject` ...). `script`, `iframe`, `object`, `embed`, `link`, `meta`, `base` are refused (a `<span>` is made and a warning logged); invalid tag/attribute names are survived (a `<div>` / skipped attribute plus a warning).
- `api.exit()` is deferred (runs on the next tick) so a module may call it from inside its own handlers. Under `?dev` and `?selftest` there is no Lobby: exit restarts/remounts the module. Calling it during `mount()` or from a timer right after mount bounces the player straight back to the Lobby: it is warned about and the fuzz run FAILS it.
- `mount` returns `{ destroy }`, nothing, or just a destroy function. A returned Promise is not supported (a warning is logged; what it later resolves to is still used as the instance).
- `api.sfx(name)` with an unknown name is a silent no-op plus a warning.

## 5. Module rules (every module must obey)

1. Render only inside `root` (a `div.pm-root`, min-height 420px, flexible width, must work 360px-1400px). Do not touch `document.body`/`document.documentElement`/`document.head`/`document.title`/`window` except via `api.on` (the harness FAILS body classes/styles, head elements, `document.title` and anything appended to `document.body`; the engine removes stray body children on destroy). `.pm-root` is `contain: layout paint; isolation: isolate`: a `position:fixed` child is positioned and clipped relative to the root and its `z-index` can never rise above the title bar, so a module cannot cover the Exit/Mute buttons or Management.
2. Prefix every CSS class `m-<id>-`; inject CSS via `P.injectCSS`. No leaks into the Lobby.
3. All timers/listeners/engine subscriptions via `api.*` (`api.setTimeout`, `api.on`, `api.onEvent`; or cleaned in `destroy`). Remounting 20 times must not leak or error. No timers or listeners while the file loads (only inside `mount`), no `P.on`, no `P.native`, no Observers left connected, no `<form>` submit without `preventDefault`, no `api.exit()` during mount.
4. **No way to win.** There may be rewards, levels, an "ending", but all are meaningless and the game says so, sincerely. Rewards tiny (0.1-50 Meh).
5. Call `api.award` regularly (small), `api.say`/`api.sayRandom` regularly, `api.stat.inc` for key actions (`<id>.<thing>`), and declare **>= 6 module achievements (>= 2 secret)** in the module file.
6. Content density: **>= 80 distinct, specific, funny lines** (inline in the file) with escalation, running gags, >= 3 callbacks, >= 3 secret/rare events, and at least one thing that only happens after a long idle and one that happens on rapid spam.
7. Robust: handle rapid clicking, keyboard-only play (real `<button>`s, Enter/Space), touch, resizing, hidden tabs. No uncaught errors, no `console.error`, no `NaN`/`undefined`/`null`/`[object Object]` in UI text, no unbounded DOM growth (cap logs/lists).
8. No `alert/confirm/prompt`, no `window.open`, no external URLs, no `eval`, no `location`/`history` navigation, no emoji newer than Emoji 12 (they are empty boxes on Windows 10).
9. Single file, <= ~1800 lines, no external assets.
10. First joke within 10 seconds; a new beat at least every ~20 seconds; the module explains itself without a tutorial wall.
11. `aria-live="polite"` for the main narrative text where feasible; respect `prefers-reduced-motion` for big animations.

## 6. Fuzz harness (`?selftest=<id>`)

Mounts the module (fresh throwaway save, seeded RNG, audio off), installs error capture (`window.onerror`, `unhandledrejection`, `console.error`/`console.warn` counting), then runs `steps` fuzz steps spaced by short managed timeouts: random clicks (real MouseEvent/PointerEvent sequences on random visible interactive-looking elements inside root: buttons, [role=button], inputs, anchors, elements with cursor:pointer, draggables, canvases at random coords), random typing into inputs/textareas/contenteditable, random keypresses (Space, Enter, arrows, letters, Escape, Tab), drags (down/move.../up), window resizes (360..1400), and visibility changes. Mid-run it destroys and remounts the module once. At the end it destroys, waits 2s of virtual time and verifies: no errors after destroy, root removed/empty, no leaked intervals (harness wraps `window.setInterval/setTimeout` to detect timers created by the module that survive destroy).
Checks and reports (as JSON in `<pre id="selftest-result">` and `document.title = "SELFTEST:PASS"` or `"SELFTEST:FAIL"`): uncaught errors (message+stack), console.error count, forbidden strings in visible text and output surfaces (`NaN`, `undefined`, `[object Object]`, `null`; see below), whether root had non-empty content, number of `award`/`say`/`stat` calls (a module with zero awards or zero narrator lines FAILS: it is not engaging with the engine), DOM node count growth (FAIL if > 5x growth between step 100 and end or > 6000 nodes), steps actually performed, interactive elements found (FAIL if zero).

**As implemented (`core/70-fuzz.js`) - interpretations and extras, authoritative where they differ from the paragraph above:**

- Steps are spaced by 6-40 virtual ms (managed by the engine's own timers). Mix per step: ~44% click, 8% typing (only when a text field exists), 14% keys, 8% drags (plus HTML5 drag events on `draggable`), 5% rapid spam bursts of 25-70 clicks on one element (two guaranteed), 4% double-click, 5% hover, 3% touch events, 3% wheel/scroll, 3% resize, remainder visibility toggles. Clicks go to what is actually on top at the chosen point (like a real pointer); if an overlay outside the root blocks it the element is scrolled into view first. Enter on a focused button-like element synthesises the click (Space on key-up), Tab moves focus, Enter in a text field submits its form.
- "Window resize" changes the max width of `#pm-shell` to 360..1400, overrides `window.innerWidth/innerHeight` and fires `resize` (CSS media queries cannot be emulated this way; use `node tools/shot.js <id> --width 360` to see the real narrow layout).
- A long idle (default 62 virtual seconds, `?idle=MS`) happens at 60% of the steps so idle behaviour fires. Mid-run (50%) the module is destroyed, 350ms of virtual time pass (stale timers/listeners get a chance to error), then it is mounted again; modules calling `api.exit()` are remounted the same way. At the end a **remount storm** (20 rapid mount/destroy cycles with a few clicks each) runs, then the last instance is destroyed and 2s of virtual time pass before the leak checks.
- Synthetic events have no user activation or active pointer: `setPointerCapture`/`releasePointerCapture` swallow `NotFoundError`, `requestFullscreen` resolves, `alert/confirm/prompt/window.open` are stubbed (and FAIL the run if called), links that would leave the page and form submits are cancelled (links FAIL the run; any `href` not starting with `#`).
- Leak detection wraps `window.setInterval/setTimeout/requestAnimationFrame`, `clear*`, `addEventListener` (also `{once:true}` listeners), `P.on`, the Resize/Intersection/MutationObserver constructors, `matchMedia().addListener` and the `document.title` setter; only calls coming from module code are recorded (a stack frame in `games/*.js`; engine code uses the captured natives in `P.native`). FAIL if: a raw `setInterval` is never cleared, a raw `setTimeout` callback fires after destroy **or is still pending at destroy and never cleared (however long its delay)**, a raw rAF callback fires after destroy, a listener on window/document/body/matchMedia lists/visualViewport/screen or on any page element outside the module root is never removed, a `P.on(...)` subscription is never removed, an Observer still watches page elements outside the root, the module root is still attached after destroy, the module left elements in `document.body` outside its root (the engine removes them and the run FAILS), **a timer or global listener was created while `games/<id>.js` was loading** (before `mount`), `api.exit()` was called during mount or from a timer right after it, a `<form>` was submitted without `preventDefault()`, the module navigated the page (`location.href = ...`, `location.reload()`; the Navigation API is used to cancel and report it), or it changed `<body>`/`<html>` classes or style, added elements to `document.head`, or assigned `document.title`. Any raw timer use is also reported as a warning. Errors counted while no instance is mounted are reported as `ERRORS AFTER DESTROY` (errors thrown by `destroy()` itself and unhandled promise rejections are counted as ordinary uncaught errors, not as "after destroy").
- Interpretation of the DOM-growth rule: FAIL if the module root has more than 6000 elements, or more than 5x the element count at step `min(100, steps/4)` AND more than 200 elements (so tiny roots do not trip the ratio). The Lobby run uses 14000 total page elements and a 5x ratio with a 400-element floor.
- Interpretation of "forbidden strings": `NaN`, `undefined`, `null` and `[object Object]` when they are not part of a longer word: the match needs a non-letter (or the start) before it, so `Score: NaNpx`, `5NaN`, `undefinedx`, `NaNMeh` and `$undefined` all FAIL while `nullify`/`nullable` (null followed by 3+ lower-case letters) are fine. Everything a player can read is checked: the root's `innerText`, `aria-label/title/alt/placeholder` attributes, the **values of inputs/textareas/selects**, Management's bubble, toasts, floating "+N Meh" text, the title bar and `document.title`. Every string passed to `say` (also lines that are queued and never shown), every `toast` and every floating text is additionally checked at the moment it is emitted, so a line that is on screen for two seconds is caught. Text the fuzzer types never contains those words.
- Warnings (do not fail): no `api.stat.*` call, raw timers, unprefixed stat/achievement ids, `console.warn`, unknown sfx name, load problems in OTHER files (a broken file elsewhere never fails your module), anything `P.diag` logged as `warn`.
- A mount that throws, a script that fails to load or throws while loading (`games/<id>.js`), a file whose `registerModule` id differs from its filename, a module that never registers: all FAIL with a message naming the cause.
- `?selftest=lobby` (see section 9): boots the real Lobby with every module, gives the player 10M Meh, opens every `P.ui.lobby.screens` entry at least once (a screen whose `openScreen` returns `false` FAILS), enters/exits modules (unlocking them first; every module is visited once before any is visited twice, and **after the random steps a sweep enters every module that is still unvisited and pokes it** (click, burst, keys), so "modules entered N/total" is always N = total, else FAIL). Inside a module the fuzzer works on the module root (one step in ten on the whole shell, so Exit, Mute and Management are exercised too); outside it works on the whole `#pm-shell`. The runtime crash shield is ENABLED in this run. It FAILS on any uncaught error, `console.error`, forbidden text, a crashed module (the Lobby surviving is required, but the crash is still reported), dialogs, leaks from modules, early exits, form submits, navigation, or DOM growth.
- Result JSON (`#selftest-result`, attribute `data-json` is URI-encoded JSON): `{id, mode, pass, reasons[], warnings[], steps, stepsRequested, seed, interactive, counts{award,say,line,stat,achieve,sfx,...}, nodes{baseline,end,max}, leaks{}, errors[{message,stack,where,phase,step,count}], errorCount, errorsAfterDestroy, consoleErrors, forbidden[{word,context,where}], remounts, exits, earlyExits, rawSubmits[], pageTamper[], actions{}, virtualMs, modulesEntered[], modulesTotal, ...}`. `#selftest-partial` is refreshed every 50 steps and the same JSON is streamed to the console as `[POINTLESS-PARTIAL] {...}` (the node tool reads it from stderr to say where a hung page stopped).

## 7. Dev tools (node, run from the project root)

- `node tools/build.js [--check]` - scans `core/ui-*.js|css`, `content/*.js` and `games/*.js` (sorted; skips names starting with `_`), writes `generated/manifest.js` (`window.__POINTLESS_FILES={ui:[...],css:[...],content:[...],games:[...]}`; `ui`/`css` are an extension for the Lobby files). Only rewrites when the content changed, always by atomic rename retried with backoff (never an in-place write, so a browser cannot read a half-written manifest). `games/<id>.js` must be kebab-case; other names (`UPPER.js`, `a b.js`, `x#y.js`) and directories are skipped with a warning. `selftest.js` and `shot.js` run it automatically. **The player double-clicks `index.html` with no build step, so run the build (or `node tools/build.js --check`, which exits 1 when the manifest is stale) as the last step before shipping.**
- `node tools/selftest.js <id|lobby> [--steps N] [--seed N] [--idle MS] [--width W] [--timeout SEC] [--real] [--json]` - headless Edge (fallback Chrome), unique temp `--user-data-dir` per run (concurrency-safe, cleaned up), `--headless=new --disable-gpu --allow-file-access-from-files --virtual-time-budget=<ms> --dump-dom`, parse `#selftest-result`; prints `PASS`/`FAIL` plus details; **exit code 0 PASS, 1 FAIL, 2 tool/infrastructure problem (no browser, hung page killed by the hard timeout, no result)**; the hard timeout kills the whole browser process tree; no zombie processes; a hung page still reports "last progress: step N, phase P" (read from the streamed console lines). A 400-step module run takes about 2-5 seconds. Numeric options are validated; `--width` below 500 is not honoured by headless browsers (a note is printed; use `shot.js` to see narrow layouts). **`--real` runs the browser WITHOUT `--allow-file-access-from-files`, like a player who double-clicked `index.html`**: errors thrown by other files then arrive as a bare "Script error." with no file or stack, which the engine attributes to the open module; a syntax error in `games/<id>.js` is reported by name ("loaded but never registered a module"). Run it once before shipping (the integrator's final check): `node tools/selftest.js lobby --real` and each module with `--real`.
- `node tools/shot.js <id|lobby> [out.png] [--width W --height H] [--full] [--actions N] [--screen NAME] [--seed N] [--wait MS] [--real] [--reduce-motion]` - screenshot after load (and N fuzz actions); default output `reports/shots/<id>[-<screen>].png`; verifies it is a real PNG (written to a temporary file next to the target and moved into place only when valid) and prints its size. The output path must end in `.png` and must not be inside `core/ games/ content/ tools/ design/ generated/` or be a file in the project root (a mistyped argument can no longer delete source files). Agents look at the PNG with the Read tool. Widths below 500 work too (headless browsers refuse narrower windows, so the page is rendered in an iframe of exactly that size and the PNG is cropped). `--full` uses a tall (>= 2400px) window so content below the fold is captured; `--reduce-motion` emulates `prefers-reduced-motion`.
- `node tools/lint.js [file...] [--quiet] [--strict] [--json]` - static checks using a small JS lexer (strings/comments never trigger false positives; `i++ / 2` is a division; `api?.setTimeout` is fine): syntax (`vm.Script`), forbidden patterns (`import`/`export`, `fetch(`, `XMLHttpRequest`/`WebSocket`, any `eval` (also `(0,eval)`, `window['eval']`), `new Function`, string timers, `alert(`/`confirm(`/`prompt(`, `window.open`, `document.write`, `location.*` navigation and `history.pushState/go/...` (errors), `debugger`, workers/`importScripts`/service workers, `<script>/<iframe>/<link>...` via `api.el`/`createElement`, `http(s)://`, protocol-relative, `javascript:` and active `data:` URLs inside any string - the `www.w3.org` namespace URLs are allowed, bare, `window.`-prefixed, string-keyed (`window['setTimeout']`), destructured or aliased `setTimeout/setInterval/requestAnimationFrame` and their `clear*` in games - allowed only on `api` (or the alias the mount function receives), `window/self/globalThis/document/body.addEventListener` in games (also string-keyed or optional-call) - use `api.on`, `P.on(...)` (use `api.onEvent`) and `P.native`, `console.error/warn` (also `console['error']`), `localStorage/sessionStorage/indexedDB/document.cookie`, `document.title =`, `document.body/documentElement/head` mutation, patching `Object.prototype` & co or assigning `window.foo`, **emoji newer than Emoji 12** (error), reserved module ids (error)), CSS scoping (every selector in `P.injectCSS` must contain `.m-<id>-`, classes must start `m-<id>-`, keyframes prefixed, no `@font-face`/`@import`), `m-*` class names used from JS, achievement/shop/stat/line-category prefixes (`m:<id>:`), >= 6 achievements with >= 2 `secret:true`, id = filename, duplicate module/achievement/shop/setting ids across ALL files, line budget (error > 1800, warn > 1500), missing `registerModule`. Warnings: `Date.now/performance.now/new Date()` (use `api.now`), `Math.random` (use `api.rand`), `document.body/querySelector` (stay in root), `innerHTML/outerHTML/insertAdjacentHTML`, `new Audio`, other `P.state/fx/sfx/narrator/host/ui` use (go through `api`), console.log, unknown `{tokens}`, an `m:<id>:` line category that is spoken but never filled with `addLines` in the file (typo: falls back to a generic line), flag prefixes, content density (< 80 distinct line-like strings). Put the text `lint-ignore` in a comment on a line to silence findings on that line. Without arguments it lints `games/`, `content/`, `tools/template-module.js` (as a module) and `core/*.js` (syntax/eval/url only). Exit 1 on errors (`--strict`: also on warnings).
- `node tools/realcheck.js [id] [--all]` - proves the double-click case: headless Edge and Chrome with only `--headless=new --disable-gpu --virtual-time-budget --dump-dom` against `file://.../index.html` (Lobby renders, every module registered, no load errors, localStorage persists across two loads, `?nostorage=1` and `?dev=<id>` work, no mojibake). Exit 0/1/2. `node tools/lint.js` also has an ERROR-level `mojibake` rule (`tools/_moji.js`) over games, content and core.
- Narrator queue detail: priority-1 lines that waited more than 30 s are dropped (priority-0 after 15 s); achievement narration is priority 0 while a module is open (the toast announces it), 1 in the Lobby.
- `node tools/coretest.js` - engine regression test (every api member, registry, state/shop/ascend/import, narrator queue, crash shield, the hardening checks from the engine review, plus a second page with REAL localStorage: multi-tab merge, failed writes, save frequency, corrupt-save backup); run it after touching `core/*.js`. Exit 0/1/2.
- `tools/template-module.js` - tiny fully compliant module that agents copy to `games/<id>.js` (then replace the id `template` everywhere: header comment, CSS prefix, ids, line categories, `registerModule`).
- Internal helpers: `tools/_browser.js` (browser launch/kill/cleanup; `realFiles`/`logConsole` options), `tools/_png.js`, `tools/coretest-page.js`, `tools/coretest-storage-page.js`.
- Edge: `C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe`; Chrome fallback `C:\Program Files (x86)\Google\Chrome\Application\chrome.exe` (override with env `POINTLESS_BROWSER`); Node v24; Windows PowerShell 5.1.

## 8. The Lobby (engine UI)

Visual style: **"cheerful dysfunctional intranet"**: warm cream background, thick dark outlines, sticker-shadow cards, mint / coral / mustard / lilac palette, chunky rounded system fonts, a faint dotted-paper texture, charming CSS-only decorations (lobby plant, wall posters, a clock that is always wrong). Distinct, intentional, delightful - not generic dark-mode SaaS. Works at 360px and 1400px.

- Header: logo "POINTLESS(TM) DELUXE" with rotating subtitle, **Meh counter** (animated), nav buttons: Gift Shop of Nothing, Trophy Cabinet, Statistics Nobody Asked For, Settings (Decorative), Ascend, More (About, Credits, Terms of Service, Patch Notes, Save tools).
- **News ticker** (top): "POINTLESS NEWS NETWORK", scrolling `ticker` lines, pauses on hover, honors reduced-motion.
- **Module grid**: cards with icon, title, tagline, tags, plays/time stats; search box; category tabs (All / Games / Departments / Locked); "Surprise Me" button; locked modules show a lock, price and a `lockedTease` line and can be unlocked with Meh. Must stay fast and usable with 100+ modules (lazy render/virtual chunking if needed).
- **Management** narrator panel (bottom-left, collapsible): avatar (CSS/emoji with moods), speech bubble with typewriter effect, priority queue, auto idle lines every 30-60s in the Lobby, never blocks interaction, `aria-live`.
- **Module window**: when a module runs, it fills a bordered "window" with a title bar (module title via `api.setTitle`, an Exit button, a "Mute" button), the Meh counter and narrator stay visible.
- **Gift Shop of Nothing**: grid of `addShopItems`, buy with Meh, owned/equipped toggles for items with `effect.bodyClass/css/onToggle`, repeatable counts, absurd flavor on purchase, a "Refund" button that refunds 0 Meh after an escalating series of forms.
- **Trophy Cabinet**: all achievements, locked/secret states ("???"), progress counter, unlock toast with fanfare.
- **Statistics Nobody Asked For**: every stat with a funny label (known map + prettified fallback) plus a few fake stats.
- **Settings (Decorative)**: real: player name, mute, reduce motion, export/import save text, hard reset (comedic 5-step confirmation done in-page, no `confirm()`); decorative: every `addSettings` entry + a few built-in ones (Difficulty: Yes; Meaning of Life slider; etc.).
- **Ascend**: costs Meh; resets Meh and purchases (keeps trophies/stats); grants an Ascension Count and a tiny cosmetic; "You have ascended 1 step. You are in the same place. It is slightly more humming."
- **Terms of Service** modal: long, scroll-to-bottom to enable "Accept", the Accept button gets progressively shy; **Credits** roll that is longer than the game; **Patch Notes**.
- **First run**: skippable welcome from Management, asks the player's name.
- **Passive Meh**: Lobby slowly gifts ~0.1-0.3 Meh/s while open, labeled "Passive Meh (Unearned)".
- **Boss key**: press `B` (not in an input) -> fake spreadsheet `Quarterly_Report_FINAL_v7_REAL.xlsx`; press again/Esc returns. It mutes with a transient `P.sfx.suspend(true)` (never stored). All Lobby keyboard shortcuts (B, the Konami code, typing "potato", `/`, `?`) are live only in the Lobby (`mode === 'lobby'` or `?selftest=lobby`) and only while no module is open; inside a module every letter belongs to the module (the boss key there is the grave accent `` ` ``), and in `?dev`/`?selftest=<id>` they are off. The Konami code is recognised from a rolling buffer (stray extra keys before it do not spoil it) and pays its 30 Meh once.
- Easter eggs: Konami code, clicking the lobby plant, clicking the logo 10x, clicking the wrong clock.
- **Save**: key `pointless-arcade-v1`, debounced autosave, try/catch, memory fallback, versioned, corrupted-save tolerant (resets with a comedic notice, never white-screens). **Several tabs share one save**: before every write the engine merges whatever another tab wrote (a tiny `<key>:stamp` entry says who wrote last) and a `storage` event does the same, so progress is never silently overwritten (merge: larger Meh and stats, union of trophies/unlocks/items, own flags/settings win; a tab that ascended wins its Meh and shelf). A save that does not reach the disk (quota, blocked storage) is never silent: a banner, a footer note, and `P.state.saveOk()` is false until a later write succeeds. Constantly ticking values (time played, passive Meh) are flushed by a 15s timer and on hide/unload instead of re-writing the whole save every second. The unreadable save set aside at load can be copied out of Save Tools.
- **Crash shield**: if a module throws in `mount` or at runtime, show "This module has gone out to lunch" with a Return button (a mount failure is labelled `[mount]`, a later one `[runtime]`); Lobby keeps working; error goes to a diagnostics list (More > Diagnostics, repeats are one entry with a count). A raw handler or timer error that the browser reports as a bare "Script error." (file://) while a module is open is attributed to that module. A module that appended elements to `document.body` is cleaned up after on exit. In `?dev=<id>` managed errors are also printed to the console and counted in the dev bar ("Diagnostics: N errors").
- Keyboard accessible, visible focus rings, `prefers-reduced-motion` honored, semantic HTML: one `<h1>` (the logo), a "Skip to departments" link, one `<main>`, focus returns to the card you came from after leaving a module, the news ticker has a pause button (and wraps instead of clipping under reduced motion), text colours meet WCAG AA, touch targets are >= 40px on coarse pointers and dialogs stay usable on landscape phones (Management folds away while a dialog is open on a window shorter than 640px).

## 9. Core runtime contract (what the Lobby agent builds on)

The engine (`core/00-*.js` .. `core/99-boot.js`, written by the engine agent) already provides everything below. The Lobby agent writes `core/ui-*.js|css` only and must not edit engine files (ask via a note in `reports/`, or work around it). Everything lives on `window.POINTLESS` (`P`).

### 9.1 Shell DOM (built by `P.ui.buildShell()` in boot)

```
#app.pm-app
  #pm-shell.pm-shell                (max-width 1100, bottom padding reserves space for the narrator)
    #pm-lobby.pm-lobby              YOUR container: Lobby.mount(container) renders in here
    #pm-modwin.pm-modwin[hidden]    module window (engine-owned, restyle via CSS if you like)
      .pm-titlebar > h2#pm-title.pm-title, .pm-meh, button.pm-mute, button.pm-exit
      .pm-modbody > div.pm-root[data-module=<id>]
    #pm-narrator.pm-narrator        default Management panel (fixed bottom-left, collapsible)
  #pm-fx.pm-fx                      fixed overlay: floating "+N Meh", .pm-toasts, canvas.pm-confetti (pointer-events none)
```
`P.ui.shell`, `P.ui.lobbyEl`, `P.ui.modwinEl` hold the elements. While a module runs the engine sets `#pm-lobby[hidden]` and calls `Lobby.hide()`; on exit it un-hides and calls `Lobby.show()`. The Meh counter, the narrator and the toasts stay visible in module mode (the title bar has its own Meh counter).

### 9.2 Registering the Lobby

```js
P.ui.setLobby({
  screens: ['shop','trophies','stats','settings','ascend','tos','credits','patchnotes','about','diagnostics', /* ... */],
  mount(container) {},        // called once at boot (lobby mode and ?selftest=lobby); build your UI inside container
  show() {}, hide() {},       // module window opened/closed: pause/resume your tickers here
  openScreen(id) {},          // open a screen/modal. MUST return false for an unknown id, true/undefined when opened
  closeScreen() {},
  currentScreen() {}          // id or null
});
```
- `?screen=<id>` (shot tool) calls `openScreen(id)` 50ms after `mount`. The selftest opens EVERY id in `screens` at least once (a `false` return fails the run), so list exactly the screens `openScreen` supports.
- First-run welcome: skip it when `P.params.shot` is set (so screenshots show the Lobby). In `?selftest=lobby` it may appear (the fuzzer will click through it). Use `P.state.firstRun` (true when no save existed) plus your own flag via `P.state.flag`.
- Start `P.passive.start()` only when `P.params.mode === 'lobby' && !P.params.shot` (it pauses itself while a module is open or the tab is hidden). It gifts 0.1-0.3 Meh per second, tracked as `meh.passive`, not `meh.earned`.
- Start the idle chatter with `P.narrator.startIdle({ when: () => !P.host.current })`.
- Wrap anything risky in try/catch or let errors propagate to `P.diag`: an uncaught error in the Lobby is never silently swallowed, and `?selftest=lobby` FAILS on it.

### 9.3 Module host: `P.host`

- `P.host.enter(id, opts?)` -> `{ok:true}` or `{ok:false, reason:'unknown'|'locked'|'crash'}`. Locked (unlockCost > 0 and not bought) modules refuse unless `opts.force`. Emits the engine counters (`modules.entered`, `<id>.entered`) and a `moduleEnter` narrator line (priority 1, Lobby mode only). A throwing `mount` shows the "This module has gone out to lunch" card with a Return button and the Lobby keeps working.
- `P.host.exit(info?)` leaves the module (stat `lobby.visits`, narrator `moduleExit` + `hubReturn` lines). `P.host.current` is `null` or `{def, api, ctx, root, instance, crashed}`. `P.host.remount()`, `P.host.destroyCurrent()` (used by dev/fuzz).
- Runtime errors attributed to the open module (managed timers/handlers, or an uncaught error whose stack is in `games/<id>.js`) also trigger the crash card in Lobby mode (`P.host.crashOnRuntime`).
- Crashes are logged: `P.diag.list` entries with `kind:'crash'`, plus event `module:crash`.

### 9.4 State: `P.state` (all persistent, autosaved, never throws)

- Meh: `getMeh()`, `addMeh(n, {reason, passive})` -> delta (never below 0; the balance is capped at 1e15, `P.state.MAX_MEH`), `spendMeh(n)` -> bool.
- `stat.get/set/inc/max/all()`, `flag.get/set/all()` (same semantics as the api), `stat.ENGINE` = list of engine stat names, `stat.isEngine(name)`.
- Achievements: registry maps `P.achievementMap[id]`, ordered ids `P.achievementOrder`; `ach.isUnlocked(id)`, `ach.unlockedAt(id)`, `ach.count()`, `ach.total()`, `ach.unlock(id)`. `check(stats, flags)` functions run (debounced 60ms) after any stat/flag change. Unlocking pays `reward`, plays `fanfare`, shows a toast and queues an `achievement` line by itself.
- Shop: `P.shopOrder`/`P.shopMap`; `item.count(id)`, `item.has(id)`, `item.price(id)` (applies `priceGrowth`: `price * priceGrowth^owned`), `item.buy(id)` -> `{ok, item, count, price, flavor}` or `{ok:false, reason:'unknown'|'owned'|'poor', short}`, `item.toggle(id)` (for items with `effect.bodyClass|css|onToggle`; returns the new on/off), `item.isEquipped(id)`, `item.isToggleable(id)`. `effect.bodyClass` toggles on `<body>`, `effect.css` is injected as `<style data-pm-shop=id>`, `onBuy(api)`/`onToggle(on, api)` receive a system api (`P.systemApi()`). `flavor` (token-substituted) is returned by `buy`; showing it is the Lobby's job. The "Refund" gag is the Lobby's.
- Modules: `isModuleUnlocked(id)`, `unlockModule(id)` -> `{ok, price}` / `{ok:false, reason:'poor', short}`.
- Player: `player.getName()` (default "Valued Employee"), `player.setName(s)` (sanitised: no control/bidi/zero-width characters, no `{` `}` (they would be re-expanded as tokens), <= 24 code points), `player.hasName()`.
- Settings: `setting.get(id, dflt)` / `setting.set(id, v)` (boolean/number/string). Real settings: `mute` (also `P.sfx.toggleMute()`), `reduceMotion` (default from the OS preference; body class `pm-reduce-motion` follows it automatically), `narratorCollapsed`. Decorative ones come from `P.settingDefs` / `P.settingMap` (`responses[]` is for Management to say when the player touches them).
- Save tools: `exportSave()` -> `'PMDX1:<base64>'`, `importSave(text)` -> `{ok}` / `{ok:false, error:<comedic message>}` (also accepts raw JSON), `reset()` (hard reset; the 5-step in-page confirmation is the Lobby's), `save()` (flush now). `P.state.corrupted` / `consumeCorruptNotice()`: true once if the save was unreadable (it is backed up under `<key>:corrupt-backup` and the game starts fresh; show the comedic notice).
- Ascend: `ascendCost()` (250 * 1.6^ascensions), `ascend()` -> `{ok, count, price}` / `{ok:false, reason:'poor', short}`; resets Meh and shop items (keeps trophies, stats, flags, module unlocks, settings) and sets stat `ascensions`. The cosmetic reward and the "same place, slightly more humming" text are the Lobby's (store them with a flag).
- Module saves: `modGet/modSet` (used by `api.save`; strict JSON only, 200 KB per module).
- Persistence helpers: `saveOk()` (false while the latest write failed), `corruptBackup()` (text of the unreadable save that was set aside, '' if none), `mergeSaveText(text, preferOurs=true)` (the multi-tab merge, usable by hand), `stat.keyCount()`, `MAX_MEH`. Loading/importing sanitises everything: module blobs must be plain objects, settings must be boolean/finite number/short string, Meh is capped at 1e15, ascensions at 10000, timestamps must be plausible, flags over 20 KB are dropped, and a save with `v` higher than this build understands is refused (kept as a backup at load), never downgraded. `importSave` also accepts pasted text wrapped in quotes or a code fence, with a lower-case prefix or URL-safe base64, and returns `{ok:true, warning}` when the browser would not store the imported save; its errors are fixed friendly messages (never a raw `JSON.parse` message). After an import, a reset or another tab's save, `setting` events are emitted for `mute`, `reduceMotion` and `narratorCollapsed` so the shell repaints (mute button, motion class, narrator), and `reset`, `import` and `sync` events tell the Lobby to refresh. Ascend, reset and import call `effect.onToggle(false)` for equipped items they remove, and a body class shared by several items stays while any of them is equipped.

### 9.5 Events: `P.on(name, fn)` -> `off()`; `P.emit(name, data)`

`meh {value, delta, reason, passive}`, `stat {name, value}`, `flag {name, value}`, `achievement {id, def}`, `bought {id, count, price, def}`, `toggled {id, on}`, `unlocked {id, def}`, `setting {id, value}`, `player {name}`, `ascend {count}`, `reset`, `import`, `sync` (another tab's save was merged in), `save {ok}`, `state:ready`, `say <entry>`, `toast {text, opts}`, `float`, `confetti`, `module:registered`, `module:mounting|mounted|destroying|destroyed|exit`, `module:crash`, `diag <entry>`, `boot`. Handler exceptions are caught and logged to `P.diag`.

### 9.6 Narrator (Management): `P.narrator` (logic) + the UI hook

- `say(text, {mood, who, duration, priority, ...tokens})`, `line(category, tokens?)`, `sayRandom(category, opts?)`, `skip()`, `clear()`, `current`, `queueLength`, `history` (last 60 entries `{id,text,mood,who,priority,duration,src,t}`), `startIdle({min:30000,max:60000,category:'idle',minQuiet:8000,when})`, `stopIdle()`.
- Queue rules (implemented): idle -> shows immediately; priority 2 cuts in; otherwise ordered by priority; at most 2 waiting priority-0 lines (oldest dropped), 6 total; exact duplicates (of the current line, the line shown in the last 4s, or one already queued) are dropped; priority-0 lines waiting longer than 15s are discarded; hold time is `clamp(2600..9000, 1600 + 55*chars)` ms, shortened to 75%/45% when others are waiting; 140ms gap between lines.
- `P.subst(text, ctx)` substitutes `{player} {meh} {module} {count} {item}` (unknown braces stay literal). If a category has no lines at all, `P.fallbackLines[category]` (core/05-fallback.js) is used, so `line()` never returns `undefined`.
- **UI hook:** `P.narrator.setRenderer({ show(entry), hide(entry) })`. The engine installs a plain default panel (`#pm-narrator`, class names `pm-narr-*`, typewriter via 22ms timers, a visually hidden `aria-live` copy of the text). The Lobby agent may restyle it with CSS or replace it entirely with `setRenderer` (then remove/hide `#pm-narrator`). Mood faces: neutral proud disappointed confused panic smug.

### 9.7 FX, sound, utilities

- `P.fx.toast(text, {icon, title, desc, kind, duration})`, `P.fx.floatText(text, x, y, {kind})`, `P.fx.confetti(x, y, n)`, `P.fx.reduced()`, `P.fx.ensureLayer()`; classes `.pm-toast*`, `.pm-float*` in `core/base.css`.
- `P.sfx.play(name)` (names in `P.SFX_NAMES`), `P.sfx.isMuted()`, `P.sfx.setMuted(bool)`, `P.sfx.toggleMute()`.
- `P.ui.bindMeh(el, {prefix, suffix})` keeps an element showing the animated balance ("1,204 Meh"); returns an unbind function. Use it for the header counter.
- `P.util`: `fmt, clamp, clone, hashStr, mulberry32, makeRng, isPlain, ID_RE`; `P.rng` (engine RNG, seeded), `P.fmt`.
- Registry accessors: `P.modules` (ordered defs `{id,title,tagline,icon,category,unlockCost,tags,mount,file,order}`), `P.getModule(id)`, `P.lines[category]`, `P.CATEGORIES`, `P.achievementMap/Order`, `P.shopMap/Order`, `P.settingDefs`. `P.injectCSS(css, id)` returns the style element.
- Diagnostics (for More > Diagnostics): `P.diag.list` (cap 300, `{id,t,kind,msg,module,stack,src}`; kinds `error` (uncaught), `module-error` (caught on a module's behalf), `load` (script failed to load), `crash`, `warn`, `info`), `P.diag.clear()`, `P.diag.add(kind, msg)`. Engine-reported bugs in modules (unknown achievement id, unprefixed stat ...) arrive as `warn`.
- `P.params`: `{mode:'lobby'|'dev'|'selftest', target, seed, steps, nostorage, mute, shot, actions, screen, idle}`.

### 9.8 Rules for Lobby code itself

- Use `P.native.setTimeout/setInterval/add/remove` (captured natives) for Lobby timers and global listeners if you want them invisible to the module leak detector, or the plain window versions - the detector only attributes calls whose stack passes through `games/*.js`, so both are fine. Clean up what you create when screens close; unbounded DOM growth fails `?selftest=lobby`.
- Never use `alert/confirm/prompt/window.open` (stubbed and failing in the selftest). All "are you sure" flows are in-page.
- Text the player can see must not contain the words `NaN`, `undefined`, `null` or `[object Object]` (fuzz check on the whole shell, plus every line Management says and every toast), including the content packs' lines when they are displayed.
- Keep the Lobby usable with 100+ modules (the fuzz run enters modules at random; `P.modules` can be large).
