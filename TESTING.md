# TESTING.md - how to build and verify a module (or the Lobby) without a person watching

Everything runs from the project root (the folder containing `index.html`) in Windows PowerShell 5.1.
There are no browser tools for agents: you verify with the node tools in `tools/`, which drive headless Edge (Chrome fallback).
Many agents work in the same folder at the same time. Every tool uses its own temp browser profile, so running them in parallel is safe.

## The 5-minute loop for a module

```powershell
# 1. start from the template (replace the id "template" everywhere in the copy)
Copy-Item tools\template-module.js games\my-module.js
#    then edit: header comment, CSS prefix m-my-module-, achievement ids my-module.*, stat names my-module.*,
#    line categories m:my-module:*, registerModule({ id: 'my-module', ... }). The file name MUST equal the id.

node tools/lint.js games/my-module.js        # static rules (fast, run it often)
node tools/selftest.js my-module             # fuzz: clicks, typing, keys, drags, resizes, remounts, leaks (2-5 seconds)
node tools/shot.js my-module --actions 15    # screenshot -> reports/shots/my-module.png, then open it with the Read tool
node tools/shot.js my-module --width 360 --height 740 --actions 15    # the real narrow layout
```
Finish only when lint has 0 errors and selftest says `PASS`. Look at both screenshots with the Read tool: the jokes land, nothing overlaps, the narrator bubble is readable.
`node tools/selftest.js lobby` fuzzes the whole Lobby with every module present (run it before reporting, it also catches interactions between modules): it enters EVERY module at least once and pokes it, with the runtime crash shield switched on.

## Before shipping (the integrator's final check)

The player double-clicks `index.html`: no build step, and no `--allow-file-access-from-files`. So, as the very last steps:

```powershell
node tools/build.js --check                  # exit 1 = generated/manifest.js is stale (a new/renamed/deleted file): run node tools/build.js
node tools/lint.js                           # 0 errors
node tools/coretest.js                       # engine regression test
node tools/selftest.js lobby --seed 1        # also --seed 2 and 3; a longer soak: --steps 1500
node tools/selftest.js lobby --real          # like a double-clicked file: errors from other files arrive as a bare "Script error."
node tools/selftest.js <each-module> --real  # a syntax error in games/x.js is reported by name even without file access
node tools/realcheck.js --all                # THE double-click proof, see below
```

### `tools/realcheck.js`: does it work when a person double-clicks index.html?

`node tools/realcheck.js [moduleId] [--all] [--browser edge|chrome|both] [--keep] [--timeout SEC]`

Runs headless Edge **and** Chrome with ONLY `--headless=new --disable-gpu --virtual-time-budget --dump-dom` (plus a throw-away `--user-data-dir` and a window size): no `--allow-file-access-from-files`, no automation extras, exactly what a command line a person could type would have. It reads the dumped DOM of `file:///.../index.html` and checks that:

1. the Lobby renders, the card grid and the Diagnostics "Registry Report" both say all modules (one per `games/*.js`) are registered, Diagnostics lists no crash/error/module-error/load entry and no "Script error.", and storage is `localStorage`;
2. persistence works on file://: the same profile is loaded a second time and must start from the Meh the first run saved;
3. `?nostorage=1` (the in-memory fallback) boots the Lobby too;
4. `?dev=<id>` mounts the module (default: the first one; `--all`: every module, four at a time), no crash card, dev bar says 0 errors;
5. the dumped page contains no mojibake (script encoding on file:// is a classic trap).

Exit 0 PASS, 1 FAIL, 2 infrastructure problem (no browser). It takes about 1 minute with `--all` (Edge and Chrome each). It uses `tools/_browser.js` (`minimal: true`) and `tools/_moji.js`.

### The mojibake guard

`node tools/lint.js` reports an **error** (rule `mojibake`) for double-encoded UTF-8 in any `games/*.js`, `content/*.js` and `core/*.js`: an ellipsis or apostrophe shown as `a-circumflex` + euro sign + ..., an emoji shown as `eth` + `Y-diaeresis` + ..., `A-tilde` + something (U+00C3/U+00C2/U+00E2 followed by U+0080..U+00BF or a Windows-1252 stand-in, U+00F0 U+0178) and U+FFFD. The signatures live in `tools/_moji.js` (built from code points so the tool files stay ASCII). Never rewrite a game file with PowerShell `Set-Content`/`Out-File`/`>`: that is how it happens; use the Edit/Write tools, which keep UTF-8.

## Running the game by hand (for the humans)

Double-click `index.html`. For a single module: `index.html?dev=my-module` (no Lobby; the dev bar has Restart, "Poke x60" and a "Diagnostics: N errors" button that lists what the engine swallowed; managed errors are also printed to the console; Exit restarts the module). In `?dev` the Lobby keys (B, Konami, "potato") are off, so your module may use every letter.
Other params: `?seed=N`, `?steps=N`, `?nostorage=1`, `?mute=1`, `?screen=<lobby screen>`, `?actions=N`. See SPEC section 3.

## Tools

| command | what it does | exit |
|---|---|---|
| `node tools/build.js [--check]` | rewrites `generated/manifest.js` from `core/ui-*`, `content/*.js`, `games/*.js` (files starting with `_` are skipped; `games/<id>.js` must be kebab-case, other names are skipped with a warning). selftest and shot do this for you. Run it after adding/deleting a file when you open `index.html` yourself, and **always before shipping**: the player has no build step. `--check` exits 1 if the manifest is stale. | 0 (`--check`: 0 / 1) |
| `node tools/lint.js [files] [--quiet] [--strict]` | static checks (SPEC section 7). No args = everything. `lint-ignore` in a comment silences one line. | 1 on errors |
| `node tools/selftest.js <id\|lobby> [--steps N] [--seed N] [--idle MS] [--width W] [--timeout SEC] [--real] [--json]` | fuzz harness (SPEC section 6). Reproducible: same seed, same run. | 0 PASS, 1 FAIL, 2 tool problem |
| `node tools/shot.js <id\|lobby> [out.png] [--width W] [--height H] [--full] [--actions N] [--screen NAME] [--enter MODULE-ID] [--seed N] [--wait MS] [--real] [--reduce-motion]` | screenshot (any width, 360 works; `--full` = tall window; `lobby --enter <id>` opens that module from the REAL Lobby, so you see the real Management panel, toasts and title bar over it (achievement toasts are held back for the first 12 s of a module: use `--wait 14000` to see them); the output must end in `.png` and not be inside core/games/content/tools/design/generated) | 0 / 1 |
| `node tools/coretest.js` | engine regression test (only needed when editing `core/*.js`) | 0 / 1 / 2 |
| `node tools/realcheck.js [id] [--all]` | the real double-click check in Edge and Chrome, no file-access flag (see "Before shipping") | 0 / 1 / 2 |

`--steps 1500` is a good soak test before you finish; a different `--seed` finds different bugs (try 2 and 3). `--real` runs without `--allow-file-access-from-files` (see "Before shipping"). `--width` below 500 is not honoured by headless browsers (a note says so): use `shot.js --width 360` to see narrow layouts.

## Reading a selftest result

`PASS` prints counts so you can see the module is alive: `award x107, say x49, stat x1268 ...`. `FAIL` prints one `FAIL` line per problem, then the uncaught errors with stacks (grouped, with counts), then warnings. What the lines mean:

| message starts with | meaning and fix |
|---|---|
| `MODULE NOT REGISTERED` | the file did not call `P.registerModule` with the id equal to the file name, or it failed to load (see the load errors). Syntax errors show with file:line. |
| `LOAD ERROR` | `games/<id>.js` threw while loading (typo, bad reference). |
| `CRASH` / `CRASH SHIELD` | `mount` threw (or a managed callback threw in Lobby mode). The stack is printed. |
| `UNCAUGHT ERRORS` | an exception escaped a handler/timer/promise. Fuzzing finds the weird states: empty lists, `pick([])`, clicking before something exists, NaN maths, typing a 300 character name. Guard those. |
| `ERRORS AFTER DESTROY` / `LEAK` | something outlived `destroy()`: you used `window.setInterval`/`setTimeout`/`requestAnimationFrame` (even a 10 s `setTimeout` that is still pending counts), `document.addEventListener` (also `{once:true}`, `matchMedia(...).addEventListener`, listeners on elements outside your root), `P.on(...)` (use `api.onEvent`), or an Observer left connected to `document.body` (call `disconnect()` in `destroy`). Use `api.setTimeout/setInterval`, `api.on(...)`, `api.onEvent(...)` (they are cleaned up for you). |
| `LOAD-TIME TIMER/LISTENER` | a timer or window/document listener was created while `games/<id>.js` loaded (outside `mount`). Move it into `mount` and use `api.*`. |
| `EARLY EXIT` | `api.exit()` was called during `mount()` or from a timer right after it: the player would bounce straight back to the Lobby. |
| `FORM SUBMIT` | a `<form>` was submitted without `event.preventDefault()`: in a real browser the page reloads and the module is gone. |
| `PAGE TAMPERING` | the module changed `<body>`/`<html>` classes or style, added an element to `document.head`, or assigned `document.title`. Only touch your own root (`api.root`); use `P.injectCSS` for CSS and `api.setTitle` for the title bar. |
| `NO AWARDS` / `SILENT` | `api.award` / `api.say` was never called during the run. Award tiny Meh regularly, speak regularly. |
| `FORBIDDEN TEXT` | something a player can read contained `NaN`, `undefined`, `null` or `[object Object]` (shown with context and where: `text`, `say`, `toast`, `floating text`, `#pm-title`, `field value`, `document.title` ...). Usually a missing fallback in string building. `Score: NaNpx` and `5NaN` count; the words `nullify`/`nullable` do not. |
| `DOM TOO BIG` / `DOM GROWTH` | unbounded logs/lists: cap them (the template caps its log at 6 items). |
| `NO INTERACTIVE ELEMENTS` | the harness found nothing to click. Use real `<button>`s (also needed for keyboard play). |
| `EMPTY` | the root was empty after mount. |
| `FORBIDDEN CALL` / `NAVIGATION` | `alert/confirm/prompt/window.open`, a link that leaves the page, or code such as `location.href = ...` / `location.reload()` (cancelled and reported). |
| `INCOMPLETE` | fewer steps than requested ran (usually after a crash). |
| `HARNESS ERROR` | a bug in the harness itself: tell the engine owner. |

`TOOL  hard timeout`: the page hung (infinite loop in a handler, or a runaway animation). The browser was killed and cleaned up. Try `--steps 60` to find the trigger; the tool prints the last progress it saw.
Warnings do not fail the run but are worth reading: raw timers, unprefixed stats, no `api.stat.*` calls, console warnings, an icon that has no glyph on this machine (emoji newer than Emoji 12; the engine shows a folder instead).
A hung page prints "last progress: step N, phase P" (the page streams `[POINTLESS-PARTIAL]` lines to the console). Caveat: a synchronous busy-wait such as `while (Date.now() < t) {}` hangs under the harness (virtual time cannot advance inside a loop that never yields): use `api.setTimeout`. A module that animates every frame with an expensive draw can also hit the hard timeout (the 62 virtual-second idle window runs about 4400 frames): make the frame cheaper or try `--idle 0`.

## What the fuzzer does, so you can design for it

Random clicks on whatever is on top at the click point, bursts of 25-70 clicks on one element (spam), typing odd strings (long, emoji, `<b>` tags, empty) into every text field, random keys (including Space/Enter on focused buttons, Tab, Escape), drags, touch, scroll, 360-1400px width changes, hidden-tab toggles, one 62 second idle (virtual time, so it is instant), a destroy and remount in the middle, 20 rapid remounts at the end, then 2 seconds of silence. Exit buttons (`api.exit()`) remount the module. `api.selftest` is `true` so you may shorten very long waits; the idle window is 62 virtual seconds, so put your "long idle" beat below that (the template uses 3s under selftest, 25s normally).
Virtual time means `Date.now()` and `performance.now()` move with the fake clock too, but real `requestAnimationFrame` never fires: use `api.requestAnimationFrame` (it runs on a 16ms timer under selftest/shot) and delta-time animation.

## Screenshots

`reports/shots/` holds the PNGs. Use the Read tool on the path the tool prints. Useful variants: `--actions 40` (state after play), `--width 360` (phone), `--wait 8000` (let long animations or idle lines happen: virtual milliseconds), `--seed 5`, and for the Lobby `--screen shop|trophies|stats|settings|ascend|tos|credits|...`.

## Troubleshooting

- `selftest`/`shot` say no browser: set `POINTLESS_BROWSER` to a `msedge.exe`/`chrome.exe` path.
- A stale `generated/manifest.js` only matters when you open `index.html` yourself: run `node tools/build.js`.
- Leftover profiles are swept automatically (`%TEMP%\pointless-edge-*`, older than 3 hours); a killed run leaves no browser processes behind.
- If lint reports a false positive, restructure the line or add `lint-ignore` in a comment on it. Do not edit `tools/`.
