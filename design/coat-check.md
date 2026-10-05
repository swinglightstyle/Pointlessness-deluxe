# COAT CHECK (id: `coat-check`, category: `department`) - FINAL DESIGN BRIEF

Tagline (registerModule `tagline`): **"Check anything. Get back something. It is technically yours."**
Icon: 🧥 (Emoji 5, safe). Tags: `['hanging','drift','tickets']`. `unlockCost: 0`. Window title (`api.setTitle`): **"Coat Check, Counter 7 1/2"**. File: `games/coat-check.js` (single file, classic script, one IIFE, `'use strict'`, **hard cap 1800 lines, aim for <= 1700**; tier plan in section 3). CSS prefix `m-coat-check-` (write the literal prefix in every selector so `tools/lint.js` sees it; in JS use `const k = s => 'm-coat-check-' + s`). Stats, flags, achievements: `coat-check.*`. Line categories: `m:coat-check:<name>`.

A builder who reads SPEC.md, VOICE.md and this file has everything needed. Nobody is available to answer questions: where this brief is silent, choose the simplest thing that is funny and safe. Where a line is listed under a category, the bullet text after `- ` is the exact string (JS strings: use double quotes or escape apostrophes; `{item}`, `{count}`, `{player}` are the ENGINE tokens, pass them via `api.sayRandom(cat, {item:..., count:...})`; never use any other `{braces}` in text).

---------------------------------------------------------------------------------------------------

## 1. CONCEPT

You step up to a varnished counter at the **Coat Check, Counter 7 1/2**. Behind a Dutch-door hatch stands **LYLE** (👴, Attendant, Acting, since 1994: sleeve garters, one pencil behind each ear and a third he is not using in his hand), a man with the weariness of someone who has asked "What are we checking today?" eleven million times. Before you can do anything the **ticket prints itself**: `No. 0001 (Provisional)`.

On the left is **THE PILE** of things to check: a coat, then (as the minutes go by) an umbrella, **A Tuesday**, **A Vague Unease**, **The Concept of Q3**, **Your Posture**, **4:17 PM**. In the middle is **THE RACK**: a brass rail with numbered hooks that **sags under the weight of abstractions**. You drag things onto hooks. Every check prints a **STUB** on a claim ticket that gets absurdly long (`STUB 3 of 7 1/2`, then `STUB 41 of 7 1/2`: the denominator never changes). **Retrieval always works.** You tear a stub (or click the hatch), a cartoon hand slides the item out, and **what comes back has DRIFTED**: a second collar, a faint opinion about rain, "4% more Thursday". Management insists it is **TECHNICALLY YOURS** (a rubber stamp slams down every time) and shows a live **Technically Yours meter** that can never reach 0 or 100.

The toy is **physical hanging**: a rack that sags, hooks drilled out of the ceiling, items that creep together and **FUSE** into portmanteaus, a ticket strip that outgrows the window, a frosted back-room window where shadows do something unspecified with your things, a mannequin you can wear your Tuesday on, a rack that becomes a conveyor. The only stat that matters is **how slightly different everything has become**. Pitch in one line: *you are doing laundry for the concept of ownership.*

Arc (VOICE.md rule 3), about 10 minutes: normal (a coat, a ticket) -> weird (abstractions, sag, back room) -> bureaucratically unhinged (fusion, ticket overflow, conveyor of other people's coats) -> strangely touching (Lyle: nobody has ever asked how his coat is; his lunch break since 2004) -> back to normal like nothing happened (the Handback, the counter wipes, "Next. What would you like to check?").

**No way to win.** The meter is asymptotic (never 0, never 100), retrieval always works but never returns the original, and the only thing that ever completes is a ticket that never finishes. The ending sincerely congratulates you and then resets with a slight, permanent difference (+2 degrees of hue).

Distinct from the neighbours (do NOT build their toys): Lost & Found (Wendell, drawing, lamp, doodle shelf: the ticket IS the thing) and Sort the Pile (bins, rubric, scoring). Here the verbs are **hang, tear, wear**; there is no drawing, no typing, no sorting rubric, no scoring.

---------------------------------------------------------------------------------------------------

## 2. SHOWRUNNER DECISIONS (what was merged and what was cut)

Three pitches were merged. **One attendant: LYLE** (pitches 1 and 3 named him Bernard, but Bernard is canon for the Box in `suggestion-box`: do NOT use the name Bernard anywhere). Pitch 1 (rack physics, drift engine, fusion, back room, beats) is the spine. From pitch 2: the Wrong Coat escalation lines, the "Lyle's Own Coat" touching beat, Hook 7 1/2 ghost hook, the Lost Ticket rare event, the "Technically Yours" ladder wording. From pitch 3: the escalating TECHNICALLY YOURS stamp, hooks "off by one half", the shift-click gag, Dennis never draggable, Sandra's contradictory flags.

**CUT (do NOT build):** conveyor catch-the-item timing window (retrieval never depends on timing), oval-track motorised hooks (the conveyor is a discrete one-hook rotation with CSS transitions), the separate Archaeology drawer with 10-at-a-time paging (replaced by a collapsed "Archaeology" row, 8.6), a TOMORROW overflow rail, Form 27B/6 signature pad, scroll licence, drag-the-ticket-onto-the-rack and the Ticket of Tickets spiral, second attendant "Lyle (Weekend)" and Volume Fee, "Check Lyle" mirror-wall secret, the hand-drawn dust, the free-floating curling ticket on the floor (the strip just grows a second column), any canvas (everything is DOM + one inline SVG), `Date`/`new Date()`, mouse-follow decorations, fractal zooms, 100-item pile (cap 18).

---------------------------------------------------------------------------------------------------

## 3. TIER PLAN AND LINE BUDGET

Build in this order, running `node tools/lint.js games/coat-check.js` and `node tools/selftest.js coat-check` after each tier. If the file nears 1750 lines, drop the highest-numbered tier items first.

- **[T1] Spine (must ship):** layout, pile, hooks, drag/click/keyboard hang, rack sag SVG, stubs, tear/retrieve (hatch, stub, R/T), tray, drift engine (4 axes, visuals, names, depth 7 `formerly`, depth 12 concept), meter, Technically Yours stamp ladder, hook expansion with sign, beat engine beats 1-3, 10, Handback + reset loop + save/restore, bell, idle secret (Committee stages 1-3), Rush spam secret, all T1 lines, achievements.
- **[T2]:** back-room window + shadows (beat 4), Sandra banner and likeness numbers, creep + fusion (beat 5), ticket overflow + archaeology (beat 6), mannequin + wear + reverse check (beat 7), conveyor + patrons + Dennis (beat 8), recursion + Lyle's coat (beat 9), the cameos (Gerald, sock), tip jar, resize secret.
- **[T3]:** Half-hook ghost hook, Lost Ticket / neighbour's item rare retrievals, 4:17 clock gag, "Nothing, Checked Carefully", The Ending (Please Check), shift-click gag, hook plates off by one half, medal, cross-module lines, banner of milestones.

Approx budget: CSS 230 (one dense rule per line) + strings 380 (pack 2-3 strings per physical line; arrays go straight into `P.addLines`) + helpers 90 + state/save 120 + drag/hang 170 + rack render 120 + drift/retrieve 170 + ticket/stubs 90 + beats 230 + secrets 140 + ending 90 = ~1830 if loose. **Write tight**: one `Bag` class for every shuffle bag, one `item chip` component for pile/tray/worn/hung, one `drag` implementation, one `render*()` per zone, destructured helpers.

---------------------------------------------------------------------------------------------------

## 4. CONTROLS

**Mouse/pen:** drag a chip (pile, tray or worn) onto a hook, the mannequin or the exit mat; click a chip (select, outlined) then click a hook (hang); click a hung item or its stub (select; its hook glows); click the hatch (retrieve the selected hung item, or the OLDEST hung item if none is selected); drag a stub left 60px (tear); click the bell, the tip jar, TAKE IT HOME, Dennis.
**Touch:** same pointer events. A dragged chip lifts 40px above the finger. `touch-action:none` ONLY on chips and stubs (the page still scrolls). Every target >= 44px under `@media (pointer:coarse)`.
**Keyboard only (every chip, hook, hung item, stub, hatch, bell, jar, button is a real `<button type="button">`; Tab order: pile, rack hooks, hatch, ticket stubs, tray, mannequin, bell, jar):**
- Enter/Space on a chip selects it (the ONE `aria-live="polite"` caption says `Selected: Coat. Choose a hook.`). **Left/Right** move a visible ring along the hooks (also while a chip is selected and focus is anywhere in the module root), **1-9** jump to that hook, **Enter/Space** on the ring hangs it, **Esc** deselects (never a dead end).
- On a hung item or its stub: **Enter** selects; **T** (or Enter on the stub's TEAR button) tears/retrieves. **T** with nothing selected retrieves the oldest. **R** reads the ticket aloud (Management summarises the last 3 stubs). **W** takes off the last worn item. **E** wears the selected tray item (mannequin visible). **H** takes the selected tray item home. **B** rings the bell. Letters are shortcuts only via `api.on(document,'keydown',...)`, ignored when `e.target` is INPUT/TEXTAREA/SELECT/contenteditable, when Ctrl/Alt/Meta is held, and when `e.repeat`. (There are no text inputs in this module, so keys are free; the boss key in modules is the grave accent, not B.)
- Half-hook secret from the keyboard: **7 then 8 within 250ms** (8.11).
- **Never block a spamming player:** every transient state auto-resolves; clicking anything else while a reaction is showing just replaces it; the Rush lockout (10.2) QUEUES tears, it never refuses them.

All state changes are reflected in ONE `aria-live="polite"` caption `<p>` under the rack (selections, ticket summaries). Lyle/Management lines go through `api.say`: **do not put aria-live anywhere else.**

---------------------------------------------------------------------------------------------------

## 5. LAYOUT AND VISUAL DESIGN (inside `root`, flexible 360-1400px)

Palette (cheerful dysfunctional intranet, warmed toward a mid-century cloakroom): cream paper `#FFF3D6` (background, dotted-paper radial-gradient), ink `#2B2233` (3px outlines, text), brass `#D9A441` (rail, hooks, hatch trim, tip jar lid), oak counter `#A8693A` / `#7C4A24`, coral `#FF6F59` (stubs, Rush sign, stamps, FLAGGED stickers), mint `#7FD1AE` (meter fill, good hooks), lilac `#B79CED` (back room tint, Sandra banner, cameo items), felt maroon `#7A2E3B` (curtain, conveyor back wall), mustard `#F2C14E` (bell, tip jar, medal), ticket paper `#FBF5E6` with printed red numerals `#C63D2F`. Sticker shadows `4px 4px 0 #2B2233`, radius 14px, chunky system font; ticket text in monospace; Lyle's margin notes `'Segoe Print','Bradley Hand',cursive`. Focus ring everywhere: `outline:3px solid #FF6F59; outline-offset:2px`.

Root gets class `m-coat-check-room`. A managed `resize` listener (`api.on(window,'resize',...)` plus one call at mount) reads `root.clientWidth` and toggles `m-coat-check-narrow` below 700px. Reduced motion is reflected into class `m-coat-check-rm` (`root.closest('.pm-reduce-motion')` or `matchMedia('(prefers-reduced-motion: reduce)')` in try/catch, re-read at each use). Under `-rm`: no sway, no conveyor glide (items snap), no shake, ticket print and stamp are fades.

Top to bottom (wide layout, grid 22% / 56% / 22%):

1. **BACK ROOM WINDOW (top strip, ~64px, frosted glass):** `backdrop-filter: blur(3px)` plus a lilac gradient and a 1px dotted grain; up to **5 silhouettes** (👤 🧑 👴 👵 🧔; `filter: brightness(0) blur(1.5px) opacity(.7)`) animated with a gentle translate/rotate; a caption `<span aria-hidden>` under the glass names what the nearest shape is doing (8.4). Dark (unlit) until beat 4, then it lights. In beat 9 a miniature coat check appears inside it (8.10).
2. **THE RACK (centre column, ~55% of the module height):** one inline **SVG** with a brass rail drawn as a single quadratic path; hooks are small brass circles (CSS-drawn, **do not use any hook emoji**) positioned along the path; a number plate under each hook; a Dutch-door **HATCH** at the rack's right end with Lyle visible over its half door (the top half `rotateX`es open on retrieval; an ✋ with a CSS sleeve slides the item out). The rack's inner scroller has `min-width = hooks * 52px` and `overflow-x:auto` so 16 hooks stay usable at phone width.
3. **THE PILE (left column; below 700px a bottom block, horizontal wrap):** up to **18** item chips (64px rounded squares: big emoji + 12-char label, class border colour, tiny random rotation -4..4deg); overflow shown as `Pile (+N)` button that toggles a scroll list (max 12 shown). Hint under it (static): `Drag a thing onto a hook. Or click it, then click a hook.`
4. **THE TICKET STRIP (right column; below 700px a horizontal strip under the rack):** header `CLAIM TICKET No. 0001-A/7 1/2` in large red monospace numerals; perforated stubs (repeating-radial-gradient dots on the left edge, `clip-path` zigzag torn edge on torn stubs, monospace text with a 1px misregistered `text-shadow`), newest on top; a `ticket length: N cm` readout; an `Archaeology (+N)` row (8.6).
5. **FOOTER:** the **Technically Yours meter** (a thin ruler with ticks every 1%, mint fill, a CSS-triangle needle that eases, a dashed line at 100 labelled `not available`, a caption line), the **COUNTER TRAY** (up to 8 retrieved item chips, a TAKE IT HOME button and an EXIT MAT drop zone), the **MANNEQUIN** (appears in beat 7), the **tip jar** (🍯 button), the **bell** (🔔 button). All payouts go through `api.award`.
6. **CAPTION** (the single aria-live `<p>`), then a static `<small>` line `Retrieval always works. It is the only promise we make.`

**Sprites/emoji (all Emoji <= 12; lint errors on newer; do NOT use 🪝 🪙 🪨 🪴 🪑):** 🧥 🌂 🧣 🧤 📅 💭 📈 🧘 🕓 💨 💬 🎉 🎈 👝 🏃 🌿 🤨 🔊 🧦 🥔 🍯 ✋ 🕰 🔔 🎫 🏅 👴 👤 🧑 👵 🧔 🔖 📎 ⭐ 💫 🍂 📜 🌱 🙂. Dennis is 🌱, the ficus is 🌿.

**Dynamic things and their DOM caps:** rack items <= 34 (16 hooks x 2), pile chips <= 18 (+ list <= 12 rendered), tray <= 8, worn <= 8, stubs rendered <= 14 (older collapse), archaeology list rendered <= 10, back-room shadows <= 5, speech bubbles <= 2, ghost drag element = 1, badges <= 1 per item. Total module nodes stay under ~800.

---------------------------------------------------------------------------------------------------

## 6. DATA MODEL, SAVE AND STATS

```
S = {                          // session state, rebuilt on every mount
  beat:1, beatAt:0, actions:0, actAtBeat:0, phase:'play',    // phase: play|rush|self|handback|reset
  runId:0, timers:[],
  hooks:6, items:[item...],    // every item anywhere
  sel:null /* item id */, ring:0, drag:null, lastDragEnd:0,
  stubN:0, ticketK:0 /* checks on this ticket (suffix count) */, stubs:[{n,name,item,torn,fused}], stubsHidden:0,
  retrievals:0, checks:0, technically:0, cooldowns:{}, bursts:[], rush:{until:0,queue:[]},
  loops, world:0, tyBase:0, tyShown:99.2, tyWobble:0,
  idleStage:0, lastInput:0, clock:0, youName:'', nest:0,
  flags:{...}                  // per-session one-shots (sandraSaid, geraldDone, sockDone, dennisDone, lyleDone, medal...)
}
item = { id, base:'Coat', emoji:'🧥', cls:'physical', w:3 /*weight*/, heavy:0 /*extra sag*/, likeness:100|null,
         depth:0, drift:[strings<=12], brackets:[strings<=3], gen:0 /*concept promotions*/, checks:0,
         loc:'pile'|'rack'|'tray'|'worn', hook:-1, slot:'', born:ms, shareSince:0, fused:[bases]|null,
         tag:'' /* e.g. 'from the future' */, patron:false, locked:false /* Dennis, Lyle's afternoon */ }
```

`api.save` under key `'v'` (written by `persist()`, debounced 800ms via `after`, plus on destroy; ALWAYS wrapped in try/catch; **< 30 KB**; every number through `num()` so `NaN` never makes `api.save.set` refuse; strings cut to 40 chars; arrays cut to caps):
```
{ loops, world /*degrees mod 360*/, beat, ticketK, stubN, retrievals, checks, technically, hooks,
  items:[{ b, e, c, w, h, l, d, dr:[...<=12], br:[...<=3], g, ck, loc, hk, sl, f, tg }],   // cap 70
  stubs:[[n,name]] cap 60, stubsHidden, worn:[ids], sessions, total /*lifetime checks*/ }
```
`restore()` validates EVERYTHING (type, range, `typeof`) and falls back to a fresh start on any doubt; a restored game continues at the saved beat with that beat's features visible (`features(beat)`, 8.0). A reload shows Lyle line `back.*` (returning player). Corrupt/old blobs never throw.

**Stats** (`api.stat.inc` / `.max`, prefixed `coat-check.`): `hung`, `retrieved`, `stubs`, `drift-max` (`.max`), `fused`, `worn`, `rush`, `tips`, `home`, `loops`, `beats`, `bells`, `examined` (clicks on hung items). (13 names.) **Flags:** write `coat-check.seen` (true on first mount), `coat-check.gerald` (true when Gerald's trench was retrieved). READ only: `metGerald`, `metDennis`, `sockSeen`, `sock-matcher.home`, `lost-and-found.coat`; stats `lost-and-found.entered`, `suggestion-box.entered`.

---------------------------------------------------------------------------------------------------

## 7. HELPERS (write once, use everywhere)

- `num(x)`: `Number.isFinite(+x) ? +x : 0`. **Every** number that reaches text, style or save goes through it.
- `clamp`, `Bag(arr)`: shuffle bag via `api.shuffle`, `next()` never repeats the previous item across reshuffles. Used for every line category, drift axes, sfx rotation, pile draws.
- `SC = api.selftest ? 0.12 : 1`; `D(ms) = Math.max(40, ms * SC)` (every long wait scales; stated per feature).
- `after(ms, fn)`: `const id=S.runId; const t=api.setTimeout(()=>{ if(id!==S.runId||api.destroyed) return; fn(); }, ms); S.timers.push(t); return t;`. `every(ms, fn)` same with `api.setInterval`. `setPhase(name)` bumps `S.runId` and clears `S.timers` (so a phase change cancels the old phase's timers). Long-lived intervals (meter wobble, clock, creep, idle watch, pile arrivals, fusion check) are created ONCE at mount with `api.setInterval` and check `S.phase`; they are not tied to `runId`.
- `say(text, who, mood, pri)`: `api.say(text, {who: who||'Management', mood: mood||'neutral', priority: pri||0})`; if `who==='Lyle'` and `text.length <= 110`, also write the speech bubble next to Lyle (cap 2 bubbles, each removed after 4s via `after`). `sayR(cat, who, tokens, mood, pri)` = `api.sayRandom('m:coat-check:'+cat, {who, mood, priority, ...tokens})`.
- `T(d) = 99.9 - 48*(1 - Math.exp(-Math.pow(d/6, 2)))` (item technically-yours percent: depth 0 = 99.9, depth 1 = 98.6, depth 6 = 69.6, depth 12 = 52.9, depth 107 = 51.9: asymptotic, never 0 or 100). Meter value = mean of `T(depth)` over every item the player holds (rack + tray + worn; pile excluded), `99.2` when none; shown = clamp(mean + wobble, 40.0, 99.9), wobble re-rolled every 4s in +-0.3 (`api.rand`), the needle eases via one CSS `transition: left 1.2s`. **The displayed value is NEVER outside 40.0..99.9.** Exception on purpose (8.10): the gold `100.0` overlay flash. Under the ending it settles at exactly **61.8** and stops wobbling (10.5).
- `ticketNo(k)`: `'0001'` + the LAST 3 of the suffix tokens up to k, with a leading `…` when k > 3; `tok(i)` for i = 1.. = `['-A','/7 1/2','-ii','.5','-B','/3','-iii',' (Rev. 2)','-C','/7','-iv',' (Rev. 3)','-D','-v','/11','-E',' (Rev. 4)','-F'][i-1]`, beyond that `'-' + i.toString(36).toUpperCase()`. The denominator string is `DEN[min(loops, 4)]` with `DEN = ['7 1/2','7 and 3/5','7 and 5/8','7 and 2/3','7 and 3/4']`, a **constant within a loop**.
- `displayName(item)`: `base` + (brackets.length ? ' (' + brackets.join(', ') + ')' : ''); the CHIP shows it cut to 22 chars with `…`; the full name goes in `title` and `aria-label`.
- `portmanteau(a, b)`: table lookups first (`Umbrella+Coat -> Umbrellacoat`, `Tuesday+Scarf -> Tuesdayscarf`, `Unease+Q3 -> Unease-of-Q3`, `Posture+Coat -> Postcoat`), else `cap(firstWord(a)) + lower(firstWord(b))` with brackets stripped, cut to 20 chars.
- `nth(n)` ordinals, `pad4(n)`.

---------------------------------------------------------------------------------------------------

## 8. MECHANICS

### 8.0 Phases, runId, features, watchdogs, selftest scaling

`S.phase`: `play` (default), `rush` (hatch locked, 10.2), `self` (secret, 10.1), `handback` (beat 10), `reset` (200ms transitional). Beats are NOT phases (`S.beat` is a number); everything visible is derived from `features(beat)` so a restore at beat 6 rebuilds the right UI: `back = beat>=4`, `sandra = beat>=4`, `creep = beat>=5`, `fusion = beat>=5`, `overflow = beat>=6`, `mannequin = beat>=7`, `conveyor = beat>=8` (disables creep), `recursion = beat>=9`.

Every async callback is created via `after`/`every` (runId check). Watchdogs: `handback` and `self` have an `onIdle` default that resolves the phase after **20s** with no player input (hard cap 45s); under selftest 3s/9s. The `play` phase has NO watchdog, so idle secrets can fire.

**Selftest scaling (api.selftest):** beats, pile arrivals, creep (12s), fusion (10s), take-home respawn (15s), rush (7.5s), self (12s) all multiply by `SC = 0.12`; idle secrets use **K = 0.3** (45s/90s/120s/150s become 13.5s/27s/36s/45s so the engine's 62s virtual idle triggers them). Selftest also guarantees (`api.selftest`) the first 3 stages of the committee appear within 62s.

### 8.1 First 10 seconds, zero input (the opening)

- t=0.0: `api.setTitle`; `S.stubN=0`; board blank; Lyle asleep-ish at the hatch (tilted, `z`).
- t=0.4s: Management `open.m` line 1 (priority 1). The brass **ticket printer** ticks (sfx `tick`) and **Ticket No. 0001 (Provisional)** prints itself in the strip header (the first joke fires with zero input).
- t=1.6s: Management `open.m` line 2 (priority 0).
- t=3.0s: Lyle wakes (class change), says `open.l` line 1 **verbatim `What are we checking today?`** (priority 1), sfx `blip`. (If the player rings the bell or acts first, Lyle wakes immediately and the 3s event is skipped.)
- t=7.0s with no input: Lyle says the hint (`open.l` line 5: how to hang). Pile at this time: **a single Coat**.
- Loops >= 1: use `again.m` instead of `open.m`; a returning save (loops 0, total > 0) uses `back.m`.

### 8.2 The pile, items and growth

Item table `ITEMS` (name, emoji, class, weight, extra sag `heavy`, coat-likeness, minBeat, swing seconds): 

| base | emoji | class | w | heavy | likeness | minBeat |
|---|---|---|---|---|---|---|
| Coat | 🧥 | physical | 3 | 0 | 100 | 1 |
| Umbrella | 🌂 | physical | 1 | 0 | 38 | 2 |
| Scarf (Long) | 🧣 | physical | 1 | 0 | 62 | 2 |
| Left Glove (Right Hand) | 🧤 | physical | 0.5 | 0 | 31 | 2 |
| A Tuesday | 📅 | time | 0 | 12 | 4 | 3 |
| A Vague Unease | 💭 | feeling | 0 | 0 | null | 3 |
| The Concept of Q3 | 📈 | corporate | 40 | 0 | null | 3 |
| Your Posture | 🧘 | feeling | 5 | 0 | 18 | 3 |
| 4:17 PM | 🕓 | time | 2 | 0 | null | 3 |
| One (1) Sigh | 💨 | feeling | 0.5 | 0 | null | 3 |
| A Mild Disagreement | 💬 | feeling | 6 | 0 | null | 4 |
| Leftover Enthusiasm | 🎉 | feeling | 2 | 0 | null | 4 |
| A Surprise Pocket | 👝 | physical | 1 | 0 | 55 | 4 |
| Your Passport Photo Face | 🤨 | self | 2 | 0 | 9 | 4 |
| The Mandatory Fun | 🎈 | corporate | 25 | 0 | null | 5 |
| Momentum | 🏃 | abstract | 15 | 0 | null | 5 |
| The Third Ficus (Partial) | 🌿 | physical | 8 | 0 | 12 | 5 |
| The Sound of a Meeting | 🔊 | corporate | 9 | 0 | null | 5 |

Class border colours: physical = oak, time = mint, feeling = coral, corporate = mustard, abstract/self = lilac. Special one-offs (not in the table, spawned by events): `Gerald's Trench (Large Coat (Small))` 🧥+🥔 w 14 lilac; `A Sock` 🧦 w 0.2; `Queueing: A Guide` 📜; `The Coat Check (Partially)` 🧥 w 20 (beat 9); `Lyle's Own Coat (Worn Through, Sentimental)` 🧥 w 3 lilac (beat 9); `You (Valued Employee, Partial)` 🙂 (idle stage 3); `Nothing, Checked Carefully` 🎫 (idle stage 4); `The Ending (Please Check)` 🎫 w 30 (after the first loop); `Dennis (Plant)` 🌱 and `Lyle's Afternoon` 🕰 (not chips: decorations, `locked`).

**Initial pile: one Coat** (beat 1). **Growth:** a new item arrives every **18s or after every 2 actions since the last arrival, whichever first** (`every(1000)` timer; the draw is a `Bag` over items with `minBeat <= S.beat`, Coat included again from beat 3: `pile` line `a second Coat arrives`). At the START of beat 3, **three chips spill in at once** (A Tuesday, A Vague Unease, The Concept of Q3, in that order, 120ms apart, sfx `pop`). Pile cap 18 on screen; extra goes to the `Pile (+N)` list (cap 40 stored; beyond that the oldest overflow item is "politely absorbed": a `pile` line, no state). **Never any "no more items" state.** After a loop reset, the first arrival is The Ending (Please Check) (11.6).

### 8.3 CHECK IN (drag, click, keyboard) and the rack

**Drag (one implementation, root-level managed listeners, no per-chip capture dependency):** `pointerdown` on a chip (primary button/touch/pen; ignore if the item is `locked`) records `S.drag={id, sx, sy, moved:false, el}` and calls `try{ chip.setPointerCapture(e.pointerId) }catch(_){}`. `pointermove` on the root: after >= 6px of movement set `moved`, create ONE absolutely positioned **ghost** (a clone of the chip, `pointer-events:none`, in the root's overlay layer; coordinates relative to `root.getBoundingClientRect()`; touch lifts it 40px above the finger), tilt it `3deg` per `600px/s` of horizontal velocity (clamped +-14deg), and a trailing hang-string line (a 1px div scaled from the pointer). While dragging, **hooks within 90px of the pointer glow and lean** (class `m-coat-check-near`, nearest gets `m-coat-check-nearest`); **render functions are deferred while `S.drag` exists** (set `dirty`, flush on drop) so the pointer-captured chip is never removed mid-gesture. `pointerup`/`pointercancel`/`lostpointercapture`/`visibilitychange`/destroy ends the drag (`endDrag()` is idempotent and always removes the ghost).
Drop resolution (by distance from the pointer to element centres via `getBoundingClientRect`, NOT `elementFromPoint`): within **28px** of a hook -> hang (8.3.1); over the mannequin rect (beat 7+, item is in tray/worn) -> wear; over the exit mat or the TAKE IT HOME button (item in tray) -> take home; **anywhere else** -> the ghost animates back, sfx `boing`, `floor` line, nothing changes (a worn item dropped elsewhere stays worn).
**Click vs drag:** a gesture with `moved === false` is a click. The `click` handler is the ONE place that selects (so synthetic click-only fuzz works): it selects/deselects the chip, or if a chip is already selected and the clicked thing is a hook, hangs it. After a real drag set `S.lastDragEnd = api.now()` and ignore any `click` within 60ms of it (the browser fires one after pointerup). A `click` with `e.detail === 0` (keyboard Enter/Space) is a normal activation.

**8.3.1 Hang:** target hook `h` (0-based). If `h` is free or holds exactly one non-fused item, the item is hung there (`loc='rack'`, `hook=h`, `born=now`). **Co-hang is allowed:** a second item on an occupied hook sets `shareSince=now` on both (fusion timer, 8.5). A third item (hook already holds two, or one fused item) bumps to the nearest free hook; if none, see 8.3.2. On hang: sfx `ding`, the item **swings** (CSS pendulum `m-coat-check-sway`, `--swing` (3..9deg) and `--delay` per item from a seeded `api.rand`, disabled under `-rm`), the string snaps taut (a 120ms scaleY), the rail sag recomputes (8.3.3), a **stub** prints (8.4), `S.checks++`, `S.ticketK++`, stats `hung`, `S.actions++`, award **0.5** (0.2 for a re-check), a `hang` line (per-item line first time that base is hung, else the `hang` bag), the back room reacts (beat 4+), `burst()` for Rush (10.2). `4:17 PM` additionally makes the whole rack **clock-tick once** (every hung item jerks 2deg for one frame, sfx `tick`) (running gag 3).
**8.3.2 Rack full** (hooks == 16 and every hook holds two): the oldest hung item is retrieved to the tray for its own good (`hooks.full` line). Never a refusal.
**8.3.3 Rack physics (cheap, looks smart):** `sag = clamp(sum(item.w + item.heavy over rack items) * 0.35, 0, 70)` px. The rail is ONE SVG `<path d="M 0 y0 Q W/2 (y0 + 2*sag) W y0">`; a hook at fraction `t=(i+0.5)/hooks` has `x = W*t`, `y = y0 + 4*sag*t*(1-t)` (exact for a symmetric quadratic); items hang from `(x,y)` with a 1px string div (`transform-origin: top`). Recompute ONLY on hang/retrieve/wear/rotate/resize/hook-add, never per frame. sfx `boing` and a `sag` line when the sag crosses 20/45/70 (once each per loop). On `resize` re-layout from `root.clientWidth`.
**8.3.4 Hook expansion:** start **6** hooks, cap **16**. After any hang, if every hook holds >= 1 item and `hooks < 16`, after `D(1500)` a **drill** drops a new hook from the ceiling (CSS translateY from -60px with 8 dust puff divs that fade; a tiny sign `HOOK EXPANSION PROGRAMME, PHASE n OF 7 1/2` (n = hooks-5, so the 7th hook is PHASE 1) on a string for 3s) with the line from `hooks` (escalating ceremony: hook 9 has a ribbon (an SVG bow that is cut), hook 12 a confetti burst `api.confetti`, hook 16 the final one). Hook plates: number `1..hooks`; **from beat 4 one random plate at a time reads `n 1/2` and changes every 20s** (cosmetic; key 1-9 mapping is by index).

### 8.4 THE TICKET AND STUBS

Every hang appends a stub `{n: ++S.stubN, name: item.base cut, item: id}`. Text: `STUB n of <DEN>: BASE (BRACKET)` uppercased, using the item's first bracket (or `(BROWN-ISH)` for the very first coat; re-checked items read `(RETURNING)`; fused stubs read `STUB a+b of <DEN>: PORTMANTEAU` and render double-width sharing one perforation). `n` grows past the denominator forever (`Stub 41 of 7 1/2`). The ticket header number is `ticketNo(S.ticketK)`; the `ticket length` readout is `S.ticketK * 3.4` cm (one decimal) and reads over `100 cm` with the `ticket` line. Torn stubs stay on the strip greyed with a diagonal zigzag clip and `TORN`; **only the newest 14 stubs render**, older ones collapse into the `Archaeology (+N)` row (8.6); the data list is capped at 60 (the count `stubsHidden` keeps growing). Each rendered stub contains a real button `TEAR` (so keyboard works) and is itself selectable (click selects its item; the item's hook glows).
Beat 6 overflow (8.6): when stubs rendered exceed the strip's height the strip **grows a second column** (CSS `column-count:2` under a class) and the header **curls** (`perspective(400px) rotateX(18deg)` on the strip's bottom edge, a shadow gradient). Never more than 14 stub elements.

### 8.5 TEAR AND RETRIEVE (always works), DRIFT

**Triggers:** drag a stub left >= 60px (pointer events on the stub: below 60px on release it snaps back with the `tear.fear` line); click a hung item/stub (select) then click the HATCH; press Enter on a stub's TEAR button; press `T`. Clicking the HATCH with nothing selected retrieves the oldest hung item. Retrieving from an empty rack: line only (`hatch.empty` in `bell` bag), no item, no award.
**Sequence (all scaled with `D()`, 900ms total):** the stub rips (zigzag clip + sfx `whoosh`), the hatch's top half opens (`rotateX`), an ✋ with a sleeve slides the item onto the **counter tray** (`loc='tray'`, cap 8; if the tray is full the oldest tray item is taken home automatically with +0.5 and the normal respawn), the **TECHNICALLY YOURS stamp** slams on the item chip (scale 2.2 -> 1, rotation -12deg, sfx `stamp`, a 3px screen shake of the root, disabled under `-rm`). The stub is marked torn, the rack re-sags, `S.retrievals++`, `S.actions++`, stat `retrieved`, `burst()` (Rush), award **0.3**. Retrieval NEVER fails, is never refused and never loses the item.
**Special retrievals** (checked in this order, at most one per retrieval, never in the first 3 retrievals; each is a plain `api.chance`): Gerald's trench (1 in 25, retrieval >= 4, 10.3) -> Lost Ticket (1 in 60, 11.7) -> Neighbour's item (1 in 45, 11.7) -> otherwise normal. The Wrong Stub line `wrong` (stub text `SEE GERALD` etc.) exists only in those paths.

**THE DRIFT MODEL (the engine of the joke).** `item.drift[]` (cap 12). On each normal retrieval, push ONE drift drawn from a `Bag` per axis, axes cycled by a 4-bag so the same axis never repeats back to back: (a) **Trait**, (b) **Quantity**, (c) **Provenance**, (d) **Noun creep** (adds a bracket word to `item.brackets`, max 3 shown, oldest dropped). The drift phrase shows in the tray as a small `<small>` line under the chip name: `now: <phrase>`; `title` shows all drifts. Coat has a **scripted prefix** for its first 7 retrievals (the Wrong Coat gag, running gag 3) that replaces the axis draw: 1 `slightly warmer`, 2 `second collar`, 3 `name tag: Gordon`, 4 `now a size you identify with`, 5 `has been to a conference`, 6 `is now technically a cape`, 7 `back from a better coat`; the matching `coat` line plays instead of the generic retrieve line (8 and 12 add the sentimental lines). `depth = item.drift.length + 12 * item.gen` kept as a number `item.depth` (not capped by the 12 stored phrases; capped at 99999). `api.stat.max('coat-check.drift-max', depth)`. Re-checking a retrieved item extends the same chain (drift is per item, not per ticket).
**Content (verbatim, `DRIFT`):**
- TRAIT (14): `now has a second collar` / `smells faintly of the third ficus` / `is warmer than it was` / `has developed a small regret` / `has acquired a small, unexplained pocket` / `now has opinions on lunch (well-formed)` / `returned smelling faintly of a decision` / `is facing a different direction` / `has taken up a hobby` / `contains a receipt for itself` / `is slightly more thanked` / `now hums, quietly, in the key of Q3` / `has a faint opinion about rain` / `is now 4% more Thursday`.
- QUANTITY (10): `now 1.5 of itself` / `now has 3 sleeves, 1 of them retired` / `now one (1) fewer shadow` / `is 11 centimetres more, approximately` / `now two thirds of a pair` / `is now 7 1/2 percent coat` / `has gained a second, smaller one` / `now arrives in a quantity of Tuesday` / `is one-and-a-bit` / `has lost a quarter of its Mondays`.
- PROVENANCE (10): `recently from 1987` / `previously owned by a Thursday` / `was a gift, from itself` / `on loan from a better version of itself` / `returned from a wedding, not saying whose` / `last seen at a conference` / `formerly the property of a committee` / `has a pension (small)` / `was found in the lining of something` / `came with a note, in handwriting that is not yours`.
- NOUN CREEP brackets (22): `Brown-ish` / `Second Collar` / `Thursday-Adjacent` / `Slightly Damp` / `Warmer` / `Middle Name` / `Beige-ish` / `Loud` / `Technically` / `Partial` / `Reconsidered` / `Formerly Warmer` / `Wednesday-ish` / `Mildly Famous` / `Laminated` / `Gently Used` / `Sort Of` / `On Loan` / `Left-Handed` / `Pensionable` / `Hooked` / `Retired`.
**Visual drift (all CSS custom properties on the chip, `--d` = `min(depth,12)` for the first generation then `depth % 12` after a concept promotion, `--hue` = `d*37 + world`)**: `filter: hue-rotate(calc(var(--hue)*1deg)) saturate(calc(1 + var(--d)*.04))`; `rotate(calc(var(--d)*4deg))`; `scaleX(-1)` from depth 3 (class); a tiny **orbiting badge** emoji (`['📎','🔖','⭐','💫','🍂','🕓']`, one per item chosen by `id % 6`, `@keyframes m-coat-check-orbit` rotate-translate) from depth 2; at depth 7 a `formerly: <base lower>` line under the name (and the `drift7` milestone line); `world` (hue +2deg per loop) makes EVERY future run faintly different.
**CONCEPT (depth 12, 24, 36, ...):** the item is promoted: name becomes `The <Base minus article>` (second promotion `The Idea of The Coat`, then the prefix is not extended further, brackets cleared), emoji stays, class `concept` (opacity .6, dashed ring), `loc` becomes `pile` (it re-enters the pile ready to be checked as an idea), line `concept`, stat bump, `api.achieve('coat-check.concept')`, award 3. Loops forever.
**Technically Yours ladder (Management, after EVERY retrieval, by total `S.retrievals`):** tiers 1-2, 3-5, 6-9, 10-16, 17-30, 31+ (section 12 `technically`, two lines per tier, `Bag` within tier). **Stamp text escalates** by `S.technically` (stamps so far): 1 `TECHNICALLY YOURS`, 5 `TECHNICALLY YOURS (CERTIFIED)`, 10 `DEED OF TECHNICALITY`, 20 `TECHNICALLY YOURS, WORN ON A LANYARD`, 35 `CERTIFICATE OF TECHNICALITY, SIGNED BY THE ITEM`, 50 `TECHNICALLY YOURS (STAMPED, THEN STAMPED)` (the stamp element simply swaps text/border style). **Shift held while retrieving** (the pointer event's `shiftKey`): Management says `shift` line and stamps anyway.
**Re-check (the loop that builds the lineage):** a tray item can be dragged back to the rack (the stub reads `(RETURNING)`), extends its chain; the item's `checks++`; hovering/focusing a hung item shows a `title` family tree such as `Coat, 4th check`.
**Take it home:** TAKE IT HOME (or the exit mat, or H) on a selected tray item: it leaves (a slide-out), award **0.5**, stat `home`, a respawned **fresh, un-drifted** copy of its base appears in the pile `D(15000)` later ("because you left a gap", the `pile` line `gap`). `S.actions++`.

### 8.6 Beat engine and the ten beats

`beatTick()` runs every 1000ms (`api.setInterval`, once at mount): advances when **`elapsed >= max(40s*SC)`** AND **(actions since this beat started >= NEED[beat] OR elapsed >= 70s*SC)**; `NEED = [0,2,4,6,8,10,12,12,12,10,0]`. The beat clock is **paused while the idle committee is active** (`idleStage >= 1`) and resumes on input. Advancing: `S.beat++`, `S.beatAt=now`, award **5**, stat `beats`, sfx `tada` (no confetti except beat 10), then `enterBeat(n)`. Restoring from a save calls `features()` only, not `enterBeat` (no repeated announcements), except it re-says the current beat's intro once.

| beat | when (typical) | what happens (all with a Management or Lyle line from the listed category) |
|---|---|---|
| **1 The Ticket** | 0:00 | Opening (8.1). One Coat in the pile. Hang it on Hook 1: ding, string snaps, stub `STUB 1 of 7 1/2: COAT (BROWN-ISH)`. Achievement `first` (Grand Custodian of the Hallowed Hook) at the first hang. |
| **2 Retrieval and Drift** | 0:40 | Management invites retrieval (`beat2`). Tear the stub: the Coat returns slightly warmer. The **Technically Yours meter** appears at 99.2 with its first caption. Re-check the same coat and watch the drift chain grow in the name. Pile starts offering Umbrella, Scarf, Glove (growth table). |
| **3 The Pile Wakes Up** | 1:20 | Tuesday, Unease, Q3 spill in. The rack visibly sags (Q3 weighs 40, Tuesday 0 but sags anyway). Hooks run out at 6: the drill (8.3.4). |
| **4 The Back Room** | 2:10 | The frosted window lights; shadows react to what you hang/retrieve (8.7). Sandra posts a rule banner; coat-likeness numbers glow on each hook (8.8). Hook plates start going off by one half. |
| **5 Hook Creep and Fusion** | 3:00 | Every 12s one item creeps one hook toward the centre (gravity, or loyalty). Two items on one hook for 10s FUSE (8.9). First fusion pays the medal (`medal` line, `api.award(3)`). |
| **6 The Ticket Overflows** | 4:00 | The strip passes the bottom, curls, grows a second column; the denominator never changes. The `Archaeology (+N)` row appears: it lists up to 10 of the oldest recorded stubs; retrieving an item whose newest stub is >= 20 stubs old pushes THREE drifts at once ("a coat with six extra facts"). At 40 stubs on one ticket: `api.achieve('coat-check.ticket')`. |
| **7 The Wearing** | 5:00 | A mannequin appears bottom-centre (8.9). Drag retrieved items onto it. Management asks you to check what you are wearing (REVERSE CHECK). The meter now counts worn items. Lyle comments on what you wear. |
| **8 The Conveyor** | 6:15 | The rack becomes motorised: every `D(6000)` the whole rack rotates one hook; the last hook is behind the curtain (8.10). Other Patrons' coats pass (Patron 4417). Dennis (Plant) appears on hook 0 (undraggable). |
| **9 Check the Coat Check** | 7:30 | The pile offers `The Coat Check (Partially)` and `Lyle's Own Coat (Worn Through, Sentimental)`. Hang the first and a miniature coat check appears in the back-room window with a tiny Lyle (8.10). Lyle asks you to hold his ticket. The strangely touching beat. |
| **10 The Handback and Next** | 9:00 | 10.5. Everything resets, +2 degrees of world hue persist. |

Each beat has an `enterBeat` function that: says its intro line (`beatN`, Management, priority 1), plays `tada`, spawns that beat's special chips, and arms its watchdog if it has one. Beats 1-3 and 10 are T1; the rest T2/T3.

### 8.7 THE BACK ROOM (beat 4+; T2)

Silhouette elements (<= 5) get a CSS class `m-coat-check-busy` and a short caption (aria-hidden text under the glass) when events happen: hang Coat -> `a shape tries it on`; hang Q3 -> `a shape weeps at it, politely`; hang Tuesday -> `a shape files it`; hang Unease -> `a shape holds it at arm's length`; retrieve anything -> `a shape waves it off`; fusion -> `two shapes share one coat`; default -> `a shape waves`. Management speaks a `backroom` line at most every 25s (`chance .35`). In beat 9 the miniature appears here (8.10). Silhouettes are emoji with `filter:brightness(0) blur(1.5px) opacity(.7)`, drifting via two CSS keyframes (`m-coat-check-shade1/2`), none under `-rm`.

### 8.8 SANDRA AND COAT-LIKENESS (beat 4+; T2)

A banner (lilac, 3px ink, sticker shadow) reads `SANDRA (COMPLIANCE): ITEMS MUST HANG IN ORDER OF HOW COAT-LIKE THEY ARE.` Under each occupied hook a small pill shows the item's `likeness`: **green** (`#7FD1AE`) if it is >= the likeness of the item on the hook to its left, **yellow** (`#F2C14E`) if lower, and the text `unpublished` for `likeness === null` (class `m-coat-check-unpub`). Obeying or ignoring changes nothing but the lines. If the numeric items on the rack are in non-increasing order from the left for 5s with >= 3 numeric items: Sandra withdraws the rule (`sandra` line), award 1, banner text becomes `... IN ORDER, BUT SADDER.` (once per loop). Random flags: at 1 in 8 hangs a coral `FLAGGED` sticker appears on the item for 6s with one of the three `sandraflag` lines (cosmetic only: **never blocks anything**).

### 8.9 CREEP, FUSION, MANNEQUIN (beats 5 and 7; T2)

**Creep** (beat >= 5 and < 8): `every(D(12000))`: pick a random rack item whose hook is not the centre hook(s) `[floor((hooks-1)/2), ceil((hooks-1)/2)]`, not `S.drag.id`, not selected, and move it one hook toward the centre (CSS `transition: left .6s`); `creep` line sometimes. If the target holds one non-fused item the two now share a hook (`shareSince=now`).
**Fusion:** every 1s check: two items on one hook for >= `D(10000)` ms continuously, neither fused, neither being dragged or selected -> **FUSE**: a new item `{base: portmanteau, emoji: a.emoji + b.emoji at 70% size, w: a.w+b.w, heavy: a.heavy+b.heavy, depth: max(a.depth,b.depth), drift: union deduped cap 12, brackets: union cap 3, fused:[a.base,b.base]}` replaces both (one DOM chip, hook unchanged), their two stubs merge into one **double-wide stub** (8.4), line `fusion` ("Congratulations to the couple"), sfx `fanfare`, a 6-piece confetti `api.confetti`, stat `fused`, award 2, `api.achieve('coat-check.fusion')`. A fused item retrieves as one item (drift together) and cannot fuse again. If the user drags a fused item it drags as one.
**Mannequin** (beat >= 7): bottom-centre block (CSS: circle head, rounded-rect torso, a neck, two arms; 240px tall, 140px wide), five labelled absolute slots (`head`, `neck`, `torso`, `aura` x5). Wearing an item from the tray (drag, or select + E, or click the mannequin while a tray item is selected) sets `loc='worn'` and picks the slot by base: coat/trench -> torso, scarf/Q3/Posture/Sigh -> neck, Tuesday/Ficus/Passport Face/Unease -> head, anything else -> aura; if that slot is taken it goes to aura; if aura is full the OLDEST worn item returns to the tray. **Worn cap 8** (1 head + 1 neck + 1 torso + 5 aura). Aura items orbit (`m-coat-check-orbit` with `animation-delay` by index; none under `-rm`). Stats `worn`, award 0.5, `wear` line (per-base table first, else bag), `api.achieve('coat-check.wear')`. **REVERSE CHECK:** drag a worn item to a hook (it is hung again; `wear.take`-style line from `wear`); or W takes off the last worn to the tray. The meter counts worn items.

### 8.10 CONVEYOR, PATRONS, RECURSION, LYLE'S COAT (beats 8-9; T2)

**Conveyor (beat 8):** `every(D(6000))`: rotate every hung item one hook to the right (`hook = (hook+1) % hooks`; co-hung items move together; wrap-around items from the last hook come back to hook 0), CSS transition makes them glide; sfx `tick`. The last hook is covered by a maroon **curtain** `div` (items on it have `opacity:0`, `aria-hidden`): when an item leaves the curtain onto hook 0 it **"re-emerges changed"**: one silent extra drift push (depth+1) and a tiny `backroom`-style caption. `conveyor` line once per 40s (bag). **Patrons:** every 20s while fewer than 2 are on the rack, a patron item (`{patron:true, base:"Patron 4417's Coat"}` first, then `"Patron 2290's Umbrella"`, `"Patron 31's Tuesday"`, `"Patron 4417's Coat (Returning)"`, cycled) enters the rack on a free hook; it is not draggable (`locked`) but **can be retrieved** (hatch/T/click): it lands in the tray as a normal drifted item (`technically yours`, the `conveyor` wrong-coat line) and may be re-checked. Patrons leave after two full rotations if unretrieved. **Dennis (Plant):** from beat 8 a fixed 🌱 button in a clay pot sits at the rail's left end labelled `Hook 0`; any pointerdown/click/Enter says a `dennis` line (rotating bag, `metDennis` flag adds one extra line) and nothing else happens: **he cannot be dragged** (running gag; he is the one thing the module never lets you hold).
**Recursion (beat 9):** hang `The Coat Check (Partially)` and the back-room window shows a **miniature** coat check: a tiny Lyle (👴 at 60%), a tiny rack of 3 hooks (3 buttons), a tiny pile of one 🧥. Clicking a mini hook hangs a mini item there with a `recursion` line (cosmetic, no drift). Nest depth capped at **3** (`S.nest`): hanging "The Coat Check (Partially)" inside the mini rack makes an even smaller one (CSS `scale(.7)` each), at 3 the `recursion` line `as deep as it is permitted to be`. Max 3 nested DOM trees.
**Lyle's touching beat (beat 9):** after ~30s of the beat, Lyle (priority 1, lines in sequence 5s apart, `lyle` category lines 1, 2), and `Lyle's Own Coat (Worn Through, Sentimental)` appears in the pile. If checked and retrieved, it returns **`warmer, and slightly more thanked`** (a drift no other item can have) and the meter does its one-time `100.0` **gold flash** (a separate overlay element for 1.2s, then a `CORRECTED` stamp, then back to the real value); Management apologises (`lyle` line 5). A `HOLD LYLE'S TICKET` button appears in the footer in this beat: pressing it shows `lyle` line 6 and 7 and adds a **Lyle's Tuesday** stub that can never be torn (`locked`, text `STUB ? of 7 1/2: LYLE'S LUNCH BREAK (2004)`), line 8 on the second press. Achievement `lyle` (Keeper of Lyle's Ticket).

### 8.11 The one-ins (T3)

**Hook 7 1/2 (secret):** when `hooks >= 8`, a faint ghost hook (opacity .18, a real button labelled `Hook 7 and a half`) sits between hooks 7 and 8. Dropping or keying an item there (key 7 then 8 within 250ms, or drop within 28px of it) says `halfhook` line 2; Lyle **returns the item before you let go**: it goes straight to the tray with a normal drift AND a `from the future` tag drift; the ticket gains a `1/2` segment (`ticketK++`). 1 in 10 of those is `Your coat, but more yours` (a +1 bonus). Achievement `half` (Half-Hanger Extraordinary).
**Rare 4:17 gag (the clock):** the wall clock (🕰 in the header strip, minute hand rotating) starts at **4:00 PM** and advances 1 minute every `D(3000)` up to **4:59**, where it sticks forever (a very small second hand keeps sweeping; closing time never arrives). When it passes **4:17**, Lyle stops mid-sentence (the `time` lines 1 and 2, 1.5s apart) every run. At 4:59 Management says `time` line 3.
**Lost Ticket (1 in 60 retrievals, retrieval >= 4):** the item returns with **no drift at all** and the tag `what you left` (the only unmodded return in the game); `wrong` lines 1 and 2; award 4.
**Neighbour's item (1 in 45):** returns a random base from the table with a note (a `<small>` line) in the `wrong` category line 3; award 2.
**Medal:** first fusion also gives `medal` line, an inline 🏅 near the meter.

### 8.12 Sag, creep, and the meter wiring (summary of recompute triggers)

`recompute()` (called from hang/retrieve/wear/rotate/resize/add-hook/restore, never from a frame loop): sag, hook positions, item positions, likeness pills, the meter base (`tyBase`), `persist()` (debounced). The meter's wobble and caption cycle (`every(4000)`, caption bag of 12 `meter` lines) are the only repeating visual updates. There is **no rAF loop** in this module (swing, orbit, drift, conveyor glide, curtain, stamp are CSS); use `api.requestAnimationFrame` only if you add something that truly needs it.

---------------------------------------------------------------------------------------------------

## 9. ESCALATION TIMELINE (summary; the machine is 8.6)

normal 0:00-0:40 (a coat, a hook, a ticket) -> weird 0:40-3:00 (drift, abstractions, sag, back room, Sandra) -> bureaucratically unhinged 3:00-7:30 (creep, fusion, ticket overflow, wearing a Tuesday, conveyor, Patron 4417, Dennis on hook 0) -> strangely touching 7:30-9:00 (Lyle's coat, his lunch break since 2004) -> back to normal like nothing happened 9:00-10:00 (Handback, wipe, "Next.").

---------------------------------------------------------------------------------------------------

## 10. SECRETS, RARE EVENTS, IDLE AND SPAM

### 10.1 LONG IDLE: THE COMMITTEE (`S.idleStage`, K = 1, selftest 0.3)

`lastInput` is reset by every pointerdown/keydown/click inside root. `every(1000)` checks `idle = now - lastInput`:
- **45s (K-scaled):** Lyle hangs his own afternoon (a 🕰 undraggable decoration on a free hook, `locked`, cannot be retrieved) and **leaves the hatch** (Lyle `away`): `idle` line 1. Pauses the beat clock (`idleStage=1`).
- **90s:** the items on the rack silently **swap hooks** (a random permutation of hook assignments, co-hung items kept together) and tilt toward each other (`m-coat-check-committee` class: rotate +-6deg toward the centre): `idle` line 2. (`idleStage=2`)
- **120s:** a pile chip appears: **`You (Valued Employee, Partial)`** (🙂, `{player}` is NOT used in the chip name; it is exactly `You (Valued Employee, Partial)`): `idle` line 3. (`idleStage=3`)
- **150s (after the 120s stage, if the player still has not acted):** `stayed` lines: a handwritten ticket slides under the counter, `Nothing, Checked Carefully` (🎫, ticket 0000) joins the pile. If checked and retrieved it returns **`Something`** (award 12, achievement `stayed`, Patience of the Coat Rack). `idleStage=4`.
- Any input before the next stage resets `idleStage` to 0 (Lyle returns: a `back` line, Lyle `away` class removed, his afternoon remains on its hook until retrieved by T, which gives it back "slightly different").
- **Check yourself:** hanging `You (Valued Employee, Partial)` starts `S.phase='self'`: the counter goes **empty for `D(12000)`** (Lyle slides out of view, the printer lamp ticks once a second, the back-room silhouettes show a tiny 🙂 at 40% in the window), with `self` lines 1 and 2; then you are **retrieved slightly different** (`self` line 3): the item returns to the tray named `You (Valued Employee)` with brackets `2% More Coat`, drift phrase `is 2 percent more coat`, and **`api.setTitle('Coat Check, Counter 7 1/2: ' + 'Valued Employee' + ' (2% More Coat)')` for the rest of the session** (use `api.player.name` capped to 24 chars). `self` line 4 (Lyle) and 5. Award 6, achievement `self`. The watchdog (20s) resolves it if anything blocks.

### 10.2 RAPID SPAM: THE RUSH (20s cooldown)

`burst(kind)` is called on every **hang, tear/retrieve, hatch click and bell ring**; it pushes `now` onto `S.bursts`, drops entries older than 3000ms, and if **more than 8** remain AND the cooldown has passed: `rush()`. (Selftest does not change the 8-in-3s rule; the fuzz's spam bursts trigger it.) `rush()`:
1. `setPhase('rush')`; the hatch **slams shut** (sfx `buzz`), a hand-lettered sign swings down: **`BACK IN 7 1/2 SECONDS`** with a real countdown (`D(7500)`: shown as `7.5, 7.4, ...` from a managed 100ms interval inside the phase; Lyle is breathing into a paper bag shaped like a coat: 🧥 held to the face).
2. **Rush Surcharge:** `api.award(-3, 'rush surcharge')`, stat `rush`, achievement `surcharge` (Most Serene Sultan of Surcharges), `spam` lines 1-3 across the countdown, the printer jams and prints a **stub for a stub** (one extra stub entry `STUB n of 7 1/2: STUB (FOR A STUB)`, not tied to an item).
3. **Tears during the lockout are accepted and QUEUED** (cap 12; beyond it the tap is ignored with the caption `The queue is full. The queue is also you.`); hangs still work normally. **Knocking** on the hatch during the countdown (a click on the hatch) slides it open 2cm and passes you a **pamphlet** (once per rush): the chip `Queueing: A Guide` (📜) joins the pile (`spam` line 4), which is, per the line, a coat (class physical, base coat likeness 70).
4. At zero: `spam` line 7, the hatch reopens (sfx `bell`), **the queue is auto-retrieved in one burst** (each item drifts normally; 60ms apart), `spam` line 8, back to `play`, cooldown 20s.

Other spam handling: the **bell** ring has its own bag (`bell`); more than 12 rings in 4s is just a Rush (above). Dragging a locked item (Dennis, Lyle's afternoon, a patron) never starts a drag. The tip jar is a loop, never a reward (10.5).

### 10.3 Gerald's trench (rare, 1 in 25 retrievals, retrieval >= 4)

The retrieval returns **Gerald's spud-sized trench** (`Large Coat (Small)`, 🧥 with a tiny 🥔 badge, w 14, class lilac, a tiny ticket `G. (VP SPUDS)`) instead of your item; your stub text becomes `SEE GERALD` and **your item stays hung** (the NEXT retrieval of it can never be Gerald). `api.flag.set('coat-check.gerald', true)`. If `api.flag.get('metGerald')` is true Gerald speaks (`who:'Gerald'`, `gerald` line 2), else Management says `gerald` line 1/3. The trench hangs, re-checks and drifts normally (`Gerald's Trench (Large Coat (Small))`). Achievement `gerald` (secret).

### 10.4 The sock (rare; depth 4+ retrieval, 1 in 12; at most twice per session)

A loose sock rolls out of the lining: a `A Sock` (🧦, w 0.2) chip joins the pile. If `api.flag.get('sockSeen')` is true the sock says `Still travelling` and its stub, when torn, "retrieves" it **while it is also on its journey** (both are true: the chip stays on the rack and a second copy lands in the tray: `sock` line 2); else `sock` line 1. When torn the first time the tray item gets a postcard drift `Doing well. Do not circle back.` (`sock` line 3). If `sock-matcher.home` is set Lyle adds `sock` line 4.

### 10.5 Tip jar loop and The Ending that is not an ending

**Tip jar:** `tips` increments on each click: costs `api.award(-1)`, and `after(D(700))` Lyle tips it back `api.award(+1)` (net 0); `tip` line 1-3 rotate. The **9th** tip prints a stub `FEELING (1)` (stub line `STUB n of 7 1/2: FEELING (1)`, not an item) with `tip` line 4. The **20th** gets confetti and `tip` line 5. It is a loop, never a reward (the achievement is cosmetic).
**Resize (SECRET 4):** a managed `resize` that changes `root.clientWidth` by >= 60px (debounced 800ms; cooldown 4s) makes the rack **be moved**: all hooks re-seat, two random rack items swap places (a `m-coat-check-rattle` shake 400ms), `resize` line 1/2. The 5th qualifying resize in a session shows a single silhouette in the back-room window holding a tiny sign `STOP` and `resize` line 3 (achievement `stop`); the first time the layout goes narrow Management says `resize` line 4.
**The Ending (SECRET 6) and the Handback (10.5.1):**

#### 10.5.1 Beat 10: THE HANDBACK

`enterBeat(10)` sets `S.phase='handback'`: the rack freezes (no creep/rotation), the hatch opens, Lyle slides the **original coat** onto the counter: `Coat (Original, Retrieved)` with **depth 107** (synthetic: `depth: 107`, brackets `['Original','Retrieved']`, tag `a coat in spirit, in colour, and in a smaller, legal sense`, shown in the meter as T(107)) and the `handback` line 1. A `TAKE IT HOME` button (and the exit mat) are live. The meter settles at **exactly 61.8** and stops wobbling (`handback` line 7). **Taking it home** (or the watchdog default after 20s: Lyle says `it is yours. technically` and does it for you) plays `handback` lines 2-4: the certificate prints on a stub (`You have retrieved everything. Everything is slightly different. This has been our promise.`), 18 confetti, sfx `tada`, award **5**, `api.achieve('coat-check.handback')`, stat `home`, **Lyle says `handback` line 4 quietly (priority 2, no Management after it: the first time it sounds like a kindness)**. Then `resetLoop()` after `D(4000)`:
- `S.phase='reset'` (200ms), `S.runId++`, clear timers, remove all items, stubs, worn, tray, pile; `S.beat=1`, `S.stubN=0`, `S.ticketK=0`, `S.hooks=6`, `S.retrievals=0`, `S.technically=0`, `S.loops++` (stat `loops`), `S.world = (S.world + 2) % 360` (**+2 degrees of hue persist in the save, so every future run is faintly different**).
- The counter wipes (a CSS wipe), Lyle blinks, the hatch re-lifts; Lyle: **`Next. What would you like to check?`** The pile is **a single Coat**; the ticket reprints as `No. 0001` with `DEN[min(loops,4)]` (the first reset reads `of 7 and 3/5`, "You will not notice. Notice anyway."); the first pile arrival is **`The Ending (Please Check)`** (🎫). Everything else continues as if it had been 1 all along. The meter returns to its normal value.
- **THE ENDING (Please Check):** a pile chip that, if hung and retrieved, returns **`slightly different: it is now the beginning`** (`ending` lines 1-2): immediately `resetLoop()` again with `loops++` and another +2 degrees, and a new first line from `again.m`. Achievement `beginning` (secret). **Impossible to win.**

### 10.6 Cameos summary (callbacks, >= 3 required)

Gerald (10.3, `metGerald`), the Missing Sock (10.4, `sockSeen`, `sock-matcher.home`), Dennis (8.10), Sandra (8.8), Lost & Found (`lost-and-found.entered` > 0: `cross` line 1 once per session at beat 2 after a retrieval; `lost-and-found.coat` true: line 2), the Suggestion Box (`suggestion-box.entered` > 0: `cross` line 3 once per session at beat 8), and Tuesday (`cross` line 4). All reads are `api.flag.get` / `api.stat.get`; this module only WRITES `coat-check.*` flags.

---------------------------------------------------------------------------------------------------

## 11. ACHIEVEMENTS (ids prefixed `coat-check.`; >= 6 with >= 2 secret; use `P.addAchievements` with `check` for the stat-based ones)

| id | name | desc | secret | reward |
|---|---|---|---|---|
| `coat-check.first` | Grand Custodian of the Hallowed Hook | Hang your first item on the rack. It was always going to be a coat. It was always going to be Hook 1. | no | 1 |
| `coat-check.slight` | Archduke of Slight Differences | Retrieve 10 items and notice that every single one is slightly different. Management would like to say you noticed. | no (stat `retrieved` >= 10) | 3 |
| `coat-check.technically` | Supreme Sovereign of the Technically-Yours Decree | Re-check the same item until its drift reaches depth 7. It is technically still yours. It is technically still an item. | no (`drift-max` >= 7) | 4 |
| `coat-check.ticket` | Perpetual Patron of the Unending Ticket | Accumulate 40 stubs on one ticket. The denominator remains 7 1/2 in recognition of tradition. | no (`stubs` >= 40) | 4 |
| `coat-check.fusion` | Matchmaker Royal to the Couple on Hook | Let two items share a hook until they become a portmanteau. Congratulations to the couple. | no | 3 |
| `coat-check.wear` | Wearer of the Tuesday | Wear something that was never meant to be worn. It suits you. It suits everyone. | no | 3 |
| `coat-check.concept` | Thinker of The Coat, Idea Of | Drift an item past depth 12 until it becomes the idea of itself. | no | 3 |
| `coat-check.handback` | Retrieved, First Class | Complete the Coat Check. The Coat Check has not completed you. | no | 5 |
| `coat-check.self` | Lord High Chamberlain of Everything Having Been Checked | SECRET: Check yourself. You were retrieved. You are 2 percent more coat. This is a measurement, not a review. | yes | 6 |
| `coat-check.surcharge` | Most Serene Sultan of Surcharges | SECRET: Trigger the Rush and pay a surcharge of 3 Meh. Lyle breathed into a bag for you. | yes | 3 |
| `coat-check.gerald` | Bearer of the Very Serious Coat | SECRET: Retrieve the wrong coat. It was the right coat for a potato. | yes | 4 |
| `coat-check.half` | Half-Hanger Extraordinary | SECRET: Hang something on Hook 7 1/2. The hook was not there. The item was. | yes | 5 |
| `coat-check.stayed` | Patience of the Coat Rack | SECRET: Idle until the counter slides you a ticket for the one who stayed. | yes | 12 |
| `coat-check.feeling` | One of You Has Had a Feeling | SECRET: Tip the jar 20 times. We will not say which of you. | yes | 3 |
| `coat-check.stop` | Moved By the Building | SECRET: Resize the window five times. A shadow holds up a sign. | yes | 3 |
| `coat-check.beginning` | Chronicler of the Ending (It Is the Beginning) | SECRET: Check The Ending. It came back slightly different. | yes | 5 |
| `coat-check.lyle` | Keeper of Lyle's Ticket | Hold Lyle's ticket for his Tuesday. He did not say why. You did not ask. | no | 4 |

---------------------------------------------------------------------------------------------------

## 12. ALL LINES (verbatim; 270+ lines grouped by situation; speaker in brackets; `Bag` per category; never the same line twice in a row)

Speakers: **[M]** = Management (`who:'Management'`), **[L]** = Lyle (`who:'Lyle'`, also mirrored into his bubble if <= 110 chars), **[G]** = Gerald (`who:'Gerald'`).

**open.m [M, mood proud, priority 1/0 at t=0.4 / 1.6]**
- Welcome to the Coat Check, {player}. Everything you leave here is guaranteed to come back. We have not said as what.
- Ticket No. 0001 (Provisional) has printed itself. Provisional is just Permanent that has not made up its mind.

**open.l [L]** (1 is fixed at t=3s; 5 is the hint at 7s; the rest are the bag for later loops of the same session)
- What are we checking today?
- Name and item, please. Not in that order. Either order.
- I'll need you to check something. Anything. We are contractually adjacent to a rack.
- Is it a coat? It is a coat. We will call it a coat for the form.
- Drag it to a hook. Or click it, then click a hook. Or Tab to it. The rack is not fussy. I am slightly fussy.

**again.m [M, loops >= 1]**
- Welcome to your first visit.
- Welcome to the Coat Check. Here is your ticket, No. 0001. It is slightly different this time. You will not notice. Notice anyway.
- Ticket No. 0001 has been reprinted. The denominator has been quietly adjusted. We do not discuss the denominator.

**back.m [M, returning save, loops 0]**
- Welcome back. Your ticket is still valid (provisional). Your coat has been waiting. It went to a conference.
- Welcome back. The rack remembers everyone. It is not a compliment. It is a rack.

**hang [L]** (generic bag, `{item}` = display name)
- One (1) {item}, hung. It looks relieved. Hard to tell. It is a hanging thing.
- {item} has been hung. It is on its hook, which is technically the hook next to its hook.
- Hung. Your {item} swings once, for the form, and then a little more, for itself.
- We accept {item} at the owner's risk. The owner is you. The risk is mostly Thursday.
- {item}. Lovely. We will hold it to a standard we have not yet decided.
- Checked. The hook says nothing. It is a hook. It has been trained.
- Your {item} has been hung between two others. They have not been introduced. They will be.
- {item} received. Condition on arrival: hopeful.
- Another one hung. Per policy, the rack is not full. Per physics, it is leaning.
- Hung on a hook. The hook has accepted the weight and also, quietly, the idea.
- Your {item} is on hook {count}, which is technically hook {count} and a half.

**hangitem [L]** (the FIRST time that base is hung; matched by `base` key)
- Coat: One (1) coat, hung on a hook. Coats are a popular choice. So are Tuesdays. We do not judge. We only hang.
- Umbrella: Umbrella, hung. It has never been opened indoors. It is suspicious that you are asking.
- A Tuesday: You have checked A Tuesday. It is the heaviest thing on the rack and it weighs nothing.
- A Vague Unease: A Vague Unease has been hung. It has been hung before, and not by us.
- The Concept of Q3: The Concept of Q3 has been checked. The rack has sagged 11 millimetres. We have a form for sag. It is 11 millimetres long.
- Your Posture: Your Posture has been hung. The rack is standing up straighter. The rack is showing off.
- 4:17 PM: 4:17 PM has been hung. Everything on the rack ticked once. We cannot say why. We can say when.
- The Third Ficus (Partial): The Third Ficus (Partial) is on the rack. The other two are fine. They do not want to talk about it.
- The Sound of a Meeting: The Sound of a Meeting has been hung. It is quiet now. It is also, somehow, still going.
- Momentum: Momentum has been hung. It would like to be somewhere else, but it is holding still, for you.
- Your Passport Photo Face: Your Passport Photo Face is on the rack. It looks exactly as unimpressed as the original.
- A Surprise Pocket: A Surprise Pocket has been hung. It was not a surprise to us. It was a surprise to the pocket.

**stub [L]**
- Stub {count} has been issued. Please keep it somewhere you will remember. Not here. Here is where people forget.
- Your ticket has grown by one stub. This is a sign of health.
- The stub is numbered. The denominator is 7 1/2. We will not be taking questions on the denominator.
- Stub printed. It says what you checked. It does not say what you will get back. That is called a surprise.
- See the back of your ticket for terms. There is no back. That is also a term.

**tear [L]**
- The stub tore clean. A clean tear is a rare thing. Please frame it. Please do not frame it.
- Tear fear detected. Please take a breath. Tear it at your own pace, and then at ours.
- You tore the ticket and not the stub. Lyle has taped it. The tape is now also a stub.
- Perforations are guidelines. The stub has chosen to follow them. That is its choice.

**retrieve [L]**
- Your {item} has been retrieved. It has a small change now. This is within tolerance.
- Retrieval is guaranteed. Resemblance is not. See the back of your ticket. There is no back.
- The curtain rustles. Lyle returns. 'It was in the other place,' he says. There is no other place.
- This is your {item}. It has seen things. Mostly the inside of a rack, but with feeling.
- Slightly different? Per policy, retrieval is not an exact science. It is a science of exactness, approximately.
- Here is your {item}. Any improvements are complimentary. Any damages are also complimentary.
- Your {item} is back. It would not say where it was. We did not push. We are not that kind of window.
- Retrieved. It is not quite how you left it. It is, however, how it left.
- Everyone gets the same item back. It is just that the item is different.
- We have returned your {item}. We have also returned a feeling about it. You may keep the feeling.
- Your {item} came back through the hatch backwards. This is the correct way. It was a long way.

**retrieveitem [L]** (30% chance instead of the generic line, matched by base)
- Umbrella: Your umbrella has come back with a small opinion about rain. Please do not engage.
- A Tuesday: Your Tuesday has been retrieved. It is now a Wednesday-adjacent Tuesday. It will not tell us where it was.
- A Tuesday (2nd+): Your Tuesday returns with a middle name: Gregory. Tuesday Gregory is a designated Tuesday. Treat it kindly.
- A Vague Unease: Your Vague Unease has been retrieved. It is slightly less vague. We are monitoring it.
- The Concept of Q3: Your Q3 has been retrieved. It is not the same Q3. Nobody can say which Q3 is better.
- Your Posture: Your Posture returns. It is better. You sit up involuntarily. Thank you for your cooperation.
- 4:17 PM: 4:17 PM has been retrieved. It is now 4:18. We have told it to come back when it has made up its mind.
- The Sound of a Meeting: The Sound of a Meeting has been retrieved. It could have been nothing. It now is.
- The Mandatory Fun: The Mandatory Fun has been retrieved. It is slightly more mandatory and slightly less fun. The ratio is within tolerance.
- Left Glove (Right Hand): Your Left Glove has returned as the right one. It is still the wrong glove.
- Scarf (Long): Your Scarf has returned slightly longer. Do not measure it. It will know.

**coat [L / M mix; the Coat gag, by retrieval number of the original-lineage Coat]**
- 1: Your coat has returned slightly warmer. Warmth is not a defect. It is a feature we did not ship.
- 2: Your coat has returned with a second collar. This is within tolerance.
- 3: Your coat has returned with a name tag. The name is Gordon. Please treat Gordon kindly.
- 4: Your coat is now a size you identify with.
- 5: Your coat has been to a conference. It has brought back a lanyard and a small opinion about breakouts.
- 6: Your coat is now technically a cape. It does not seem to mind.
- 7: Your coat is back from a better coat. It will not discuss it.
- 8: Your coat has been checked 8 times. At this point it is less a coat than a relationship.
- 12: Your coat has been checked 12 times. Management would like to say a few words. They are 'coat' and 'thank you'.

**technically [M, after every retrieval; two per tier]**
- Tier 1-2: Technically yours.
- Tier 1-2: It is technically yours. We checked. We also checked that you would check.
- Tier 3-5: It is technically yours. Technically is doing a lot of work. Technically has been given a desk.
- Tier 3-5: Ownership is a spectrum. You are somewhere on it. Lyle has the map. The map is in the other coat.
- Tier 6-9: It is yours in all the ways that count. The remaining ways are with Sandra.
- Tier 6-9: Yours until further notice, which is now. Please do not ask for further notice.
- Tier 10-16: Technically has been promoted. Technically now has a title and a small plant.
- Tier 10-16: Yours in a legal sense. Yours in spirit, not in coat.
- Tier 17-30: Technically has been awarded a pension. Technically has not said what it will do with it.
- Tier 17-30: Your ownership has been stamped. The stamp has been stamped. We are quietly proud of the stamp.
- Tier 31+: Technically yours has reached the point where it simply sounds like a name. Please answer to it.
- Tier 31+: You may keep it. Technically.
- shift (Shift held): Technically, you did not ask for that to be yours. It has been stamped anyway.

**meter [M, footer caption bag of 12, shown every 4s; also `api.say` priority 0 at most every 60s]**
- The remaining fraction is on a journey.
- Anything over 99 percent is yours in all the ways that count. The rest belongs to the building.
- The needle points at a number it has chosen. It is quite pleased with it.
- Ownership is measured here in Technicallys. One Technically is a small amount of yours.
- The needle wobbles. This is not a fault. This is its personality.
- Please do not stare at the meter. It knows.
- Between Owned and Merely Near is a legal status. You are in it, comfortably.
- This figure has been audited by Sandra. Sandra changed it to a different figure, then back.
- Your items are yours to the extent the building allows. The building allows a lot. The building has opinions.
- The meter has never reached 0 and it has never reached 100. It lives in the middle, with the rest of us.
- A reading of 100 would be unauthorized. A reading of 0 would be an incident. You are in the safe, slightly worrying middle.
- The meter would like to remind you that it is a meter and not a verdict.

**sag [L/M]** (when sag crosses 20 / 45 / 70 px)
- The rack has sagged. We have a form for sag. It is 11 millimetres long.
- The rail is now a smile. It is not smiling at you. It is smiling at the weight.
- The rack has reached maximum sag, which is 70 millimetres. We have never had a minimum sag. It was thought to be unlucky.

**hooks [M]** (hook ceremony; 7: dust, 9: ribbon, 12: confetti)
- We are out of hooks. A hook is being installed. Please step back from the hook. The hook has questions.
- Hook 8 has arrived. It was in the ceiling the entire time. Management regrets nothing.
- Hook 9 has arrived with a ribbon. It was cut with small, brass ceremony. The ribbon is now also a hook.
- Hook 10. We were out of hooks before. This is a pattern, and we have named the pattern.
- Hook 12 has been installed. It is, by official count, the twelfth. Please applaud the way you would for a twelfth.
- Hook 14 has arrived. We have hung a hook. This is the recursion we were promised.
- Hook 16 is the final hook. A seventeenth hook has been requested. It is in committee.
- The rack is at capacity. Your oldest item has been retrieved for its own good. It is on the counter. It is slightly different.

**floor [L]**
- That is not a hook. That is the floor. The floor has been informed that you tried.
- Dropped. We will log it under Gravity.
- The {item} has fallen. It bounced once, in apology, and went back to the pile.
- The floor accepted your {item} and returned it. This is the floor's whole job.

**pile [M, low priority]**
- New items have arrived at the pile. Nobody has seen who is bringing them. HR is aware.
- The pile has grown. The pile has asked for a bigger pile.
- Please do not feed the pile after 5 PM. It is 4:59. The pile can wait one minute and has.
- Something has been left at the pile. It is not labelled. It is, however, a Thursday.
- A second Coat has arrived. It is not the first coat. Please do not introduce them.
- The pile has overflowed into a smaller pile. The smaller pile is proud.
- gap: A fresh copy has been put back to fill the gap you left. It is not the coat you took. It is the coat you meant.
- The pile has politely absorbed its oldest item. It was not asked to. It was very polite about it.

**backroom [M, beat 4+, prob .35 after a hang/retrieve, at most every 25s]**
- The shadows in the back room are staff. Please do not wave. They have been waving at each other since 1998.
- A shape in the back room is trying on your coat. This is part of the process. The process is, mostly, a shape.
- A shape in the back room is weeping at Q3, politely. It has done so before. It has a handkerchief for it.
- A shape is filing your Tuesday. It was not a filing sort of Tuesday. It has been persuaded.
- The back room has gone quiet. It is a working quiet. It is also a listening quiet.
- Someone in the back room is holding your Posture. They are holding it correctly. We are all slightly jealous.
- The frosted glass is a design feature. We do not know what is behind it. We know it is busy.
- Two shapes in the back room are sharing one coat. They have not asked. They look happy.

**sandra [M]**
- Sandra from Compliance has flagged the rack. Items must now hang in order of how coat-like they are. The ordering is unpublished.
- Sandra has clarified: a Tuesday is 4 percent coat-like. Sandra declined to say which 4.
- Sandra has noticed the rack is in order. Sandra has withdrawn the rule and issued a new one: in order, but sadder.
- Green means coat-like. Yellow means coat-adjacent. 'Unpublished' means Sandra has not published it.
- Sandra has asked that the rack stop leaning. The rack has asked what Sandra means by 'stop'.

**sandraflag [M]** (random FLAGGED sticker; always contradictory)
- Sandra has flagged this as too soft.
- Sandra has flagged this as too hard.
- Sandra has flagged this as, quote, moist.

**fusion [M]**
- Your {item} and its hook-mate have been sharing a hook for some time. They are now one. Congratulations to the couple.
- Two items on one hook have merged. The ticket has merged as well. The perforation is awkward about it.
- A fusion has occurred. The result is a portmanteau. The portmanteau has not been consulted.
- They are now a pair. A pair is a legal term. They did not read it.
- The stubs have fused into one double-wide stub. It shares a perforation. It also shares the denominator.
- The merged item would like it noted that it was happy before. It would also like it noted that it is happy now.

**creep [L/M]**
- Items on the rack drift toward the middle. This is gravity, or loyalty. The investigation is ongoing.
- An item has crept one hook toward the centre. Nobody saw it move. Everybody saw that it moved.
- The rack is leaning inward. The rack has been told this is how racks hold hands.

**ticket [M / L]**
- Your ticket is now 14 centimetres longer than the building. It has been allowed to leave through the window.
- Stub 41 of 7 1/2. The denominator has been consulted and declined to comment.
- The ticket has outgrown the window. Lyle picks it up with both hands like a very long scarf. 'You people,' he says, fondly.
- Your ticket has grown a second column. The columns have not met. They have exchanged a look.
- The denominator remains 7 1/2. In recognition of tradition. And in recognition of the denominator.
- Your ticket has been laminated at no charge. It is now harder to read and easier to hold.
- You have 40 stubs on one ticket. It is now a document. You may file it under Tickets (Long).

**archaeology [M / L]**
- Ticket Archaeology: oldest stub at the bottom. It says 'coat'. It is the same coat. Probably.
- This stub is very old. Its item has collected the facts of every day it was not here. You may collect them all at once.
- Old stubs are layered like sediment. Lyle brushes one gently. It says COAT (BROWN-ISH). He nods, and does not say what about.

**wear [L / M]**
- You are now wearing a Tuesday. It suits you. It suits everyone, which has always been its problem.
- Please check what you are wearing. We can see it. We will not say what it is.
- You have checked what you were wearing. You are now wearing less. You are also wearing more. See Form 27B/6.
- The Concept of Q3 looks well on you. It is a cold concept. Please dress for it.
- Lyle looks at you wearing a coat. 'Good,' he says. 'Finally a coat in the right place.'
- You are now wearing {item}. Lyle has noted it. He has noted a lot of things. His notes are a coat.
- Your aura has changed. Management declines to say which colour. It is the colour of the thing you are wearing.
- You are wearing too much. Please check some of yourself. The rack is practically waiting.
- You have taken off your {item}. It was not reluctant. It was a coat.

**conveyor [M / L]**
- The rack is now a conveyor. This has always been the plan. The plan was in the coat.
- A dry-cleaner hum fills the room. It is Lyle. Lyle has been the hum since 1994.
- Items ride around and vanish behind the curtain. They come back changed. They come back, which is the main thing.
- Patron 4417's coat is passing. Patron 4417 left in 1991 and said they would be right back.
- A coat on the rack is not yours. It is technically yours. It has been technically yours since you looked at it.
- You retrieved the wrong coat. It is the right coat for someone. Please hold it until they are ready.
- Another patron's coat has joined the rack. The rack is a shared economy now. Please do not check anything you would miss. Check everything you would miss.
- Behind the curtain something is being done to your items. It is being done kindly, with a small lamp.

**dennis [M / L]**
- Dennis (Plant) is on hook 0. He did not check in. He is simply always there.
- Dennis does not want to be checked. Dennis is thriving. Dennis has not been asked.
- Dennis was checked in 2019 and has not been collected. Dennis was never issued a ticket. Dennis is thriving.
- Dennis (Plant) has been moved one hook to the left. He moved himself back. It took a long time and nobody saw.
- Dennis (Plant) recognises you from the lobby. He does not wave. He is a plant. He leans.

**gerald [M / G]**
- A trench coat the size of a spud has been checked by Gerald, Vice President of Spuds. Please do not open it. It is a very serious coat.
- (G) I have a coat. It is large. I am not.
- The owner is a large potato, and we will say no more.
- Gerald has been informed. Gerald is a potato. Gerald does not check things; Gerald is checked on.
- The trench has been hung. It is a Large Coat (Small). Gerald has not commented. Gerald is on a break.

**sock [M / L]**
- A sock was found in the lining. It is not yours. It is, however, on a journey, and has asked us to hold its ticket.
- The sock waves. 'Still travelling,' it says. Its stub, when torn, retrieves it. It is also on its journey. Both are true.
- A postcard is attached to the sock: 'Doing well. Do not circle back.'
- The sock has a home now, we hear. It has asked to keep its ticket anyway.

**lyle [L, beat 9, priority 1; a line every 5s in order 1, 2, then on events]**
- I have been checking coats since 1994. Nobody has ever asked how mine is.
- It does not need to be on the good hook. (a pause) It goes on the good hook.
- Lyle's coat returns warmer, and slightly more thanked. That is not on the ticket. We will let it through.
- Technically Yours has reached 100.0 percent. This was an error. It has been corrected. We regret the moment.
- Lyle has asked you to hold his ticket. It is for his Tuesday. He did not say why. You did not ask.
- Lyle says nobody has retrieved his lunch break since 2004. He would like it slightly different.
- You are holding Lyle's ticket. It is for a lunch break. It is, technically, yours. He said it quietly.
- Lyle's own coat has arrived in the pile. Lyle is looking at the ceiling. The ceiling is very interesting.

**recursion [M / L]**
- You have checked the Coat Check. It is hanging in the back room, slightly smaller, with a Lyle in it. The Lyle is fine.
- There is a smaller rack in the window. A smaller you could hang a smaller coat on it. You could.
- The Coat Check inside the Coat Check inside the Coat Check is as deep as it is permitted to be. Sandra has a form.
- The smaller Lyle has asked the larger Lyle for a coat. The larger Lyle said 'Sure.' Neither coat was a coat.

**handback [M / L]**
- Your coat has been retrieved 107 times. It is a coat in spirit, in colour, and in a smaller, legal sense. Please take it home.
- Congratulations on completing the Coat Check. Your certificate has been printed on a stub.
- You have retrieved everything. Everything is slightly different. This has been our promise.
- (L, quietly) Technically a coat. Technically yours. Technically you.
- Lyle blinks. The counter wipes. The hatch rises.
- Technically Yours has settled at 61.8 percent. It has never reached 0 and it has never reached 100. It rests there for no reason.
- The meter has been told to rest. It has been told by the meter.

**next [L]**
- Next. What would you like to check?
- Next. Please state what you would like to check. You have already stated it. Please state it again, slightly different.

**ending [M, The Ending (Please Check)]**
- The Ending (Please Check) is in the pile. It is a very small ending. It has been told to wait.
- You have retrieved The Ending. It has come back slightly different: it is now the beginning.
- There is no way to finish the Coat Check. There is only a ticket that will not. We are very proud of the ticket.

**spam [M / L]**
- Please form a queue. You are the queue. Please form it behind yourself.
- A Rush Surcharge of 3 Meh has been applied. It was applied gently, like a sticker, but to your wallet.
- The hatch is closed for 7 1/2 seconds. This is a real timer. Lyle is breathing into a paper bag shaped like a coat.
- The hatch has opened 2 centimetres. A pamphlet has been passed through. It is called 'Queueing: A Guide'. It is a coat.
- You have exceeded the item limit of 3 items per second. This is a limit we made up. It is a good limit.
- The stub printer has jammed and printed a stub for a stub. The stub for the stub is for a stub.
- The hatch has reopened. Everything you asked for during the countdown arrives at once. Lyle will accept your thanks but not hold eye contact.
- The queue has been served. It was a small queue. It was entirely you.

**bell [L]**
- Lyle rings the bell back. Once. It is a different bell.
- The bell has been rung. Lyle has heard it. Lyle has always heard it.
- Yes. I heard it the first time. And the second time. Here is your attention.
- The bell is not a doorbell. It is not a doorbell for anything in particular.
- Lyle has retrieved a quiet moment from the back. It was yours.
- Nothing to retrieve. We will retrieve it anyway. It has been retrieved. It was nothing.

**idle [L / M]** (lines 1-3 are the committee stages; 4-7 are generic idle chatter)
- Lyle has checked his own afternoon. He will be back at an unspecified moment. Please enjoy the rack.
- The coats have formed a committee. The agenda is one item long: the person standing there.
- You have been standing here a long time. Would you like to check yourself? It is the quiet option.
- Lyle rings the bell once, to nobody. Then he rings it again, to be sure.
- Is anyone there? I am not asking you. I am asking the coats.
- Lyle starts naming the coats on the rack. Each name is a month.
- The clock has been wrong for some time now. It is wrong with such confidence that we have started to trust it.
- back: Lyle is back. His afternoon was fine. It has been retrieved, slightly different.

**self [M / L]**
- You have been checked. The counter is empty. Management remarks that it has never been so peaceful and so wrong.
- Something in the back room has put on a tiny version of you. It fits. This is worrying for both of you.
- You are back. You are slightly different. You are 2 percent more coat. This is not a compliment. It is a measurement.
- Lyle looks you up and down. 'Welcome back,' he says. He checks the ticket. 'Within tolerance.'
- {player} (2% More Coat) has been added to the title bar. It is a drift bracket. It will fade after the session, as brackets do.

**stayed [M]**
- A handwritten ticket slides out from under the counter. It reads: 'For the one who stayed.' It is for item 0000: Nothing, Checked Carefully.
- Item 0000 has been retrieved. It has returned as Something. Something is, strictly, an improvement.

**resize [M]**
- The rack has been moved. Please do not blame the rack. The rack was moved by the building.
- The building has moved the rack again. The building says it is for the light.
- The rack has been moved a fifth time. A shape in the back room holds up a small sign. It says STOP.
- Narrow window detected. Hooks have been reduced to fit your mood.

**tip [L]**
- You have tipped 1 Meh. Lyle has tipped it back. This will continue until one of you has a feeling.
- Lyle accepts the tip. Lyle returns the tip. The tip is, at this point, mostly motion.
- Lyle has tipped you 1 Meh, in a gentler voice. It is the same Meh. It has been through a lot.
- A stub has printed: FEELING (1). Nobody is saying whose.
- One of you has had a feeling. We will not say which.

**milestone [M]**
- 10 retrievals: You have retrieved 10 items. Each came back with one new thing. The new things are called details.
- 25 checks: You have checked 25 items. Per policy, I now owe you an acknowledgment. Acknowledged.
- 50 checks: We are experiencing high volumes of things. We were not prepared for the things.
- 100 checks: One hundred checks. The hatch has requested a pamphlet on its own condition. It is, again, a coat.
- drift7: An item has reached depth 7. Beneath its name it now reads 'formerly'. Formerly is a thriving department.
- concept: The {item} has drifted so far that it is now an idea. Please check it in as an idea.

**medal [M]**
- You have been awarded a medal for hanging things. It is a hook with a ribbon. The ribbon is also hanging.

**time [L / M]**
- This afternoon at the Coat Check has been, in a manner of speaking, a kind of
- Sorry. Habit.
- The clock has reached 4:59 PM. It will stay there. It is a very good place to stay.
- We close at 5:00 PM.
- Closing time is not a time. It is an attitude.

**wrong [M]** (rare retrievals)
- That is not your ticket. It is someone else's, and you have been handed their item. It is exactly what they left. This is the only unmodded return in the building.
- You did not get your own coat. You got the one you meant.
- Dear whoever has my Tuesday. Please be gentle. It likes toast.
- That stub belonged to a different coat. Lyle gave you that coat. It was a safe choice. It was not a good one.

**halfhook [L]**
- Hook 7 1/2 is not a hook. It is a suggestion with a nail in it. Use gently.
- You have hung something on Hook 7 1/2. Lyle returned it before you let go. 'Efficiency,' he says. He looks unwell about it.
- The item has come back from the future. It is slightly early. It will be on time next week.

**cross [M]**
- Wendell in Lost Property sends regards. He says everything you left here is also, technically, lost.
- A coat from Lost Property has been mentioned. It is not here. It is a ticket there. Lyle has a feeling about it.
- There is a box in Suggestions that has also been open since 1994. We have never met. We wave at the same time.
- Tuesday has been consulted about the rack. Tuesday has not responded. Tuesday is the heaviest thing here and not even a thing.

**beat intros [M, priority 1 at enterBeat n]**
- beat2: Please retrieve your coat at your convenience. The stub is the pink bit. Pink is the colour of intention.
- beat3: Please note that the pile has become more abstract. This is not our doing. We have only noticed it.
- beat4: The back room window has been lit. It is a window. What is behind it is staff.
- beat5: The rack has begun to move. It is not moving. It is being moved by the idea of the middle.
- beat6: The ticket has gone past the bottom of the window. It has not gone past the bottom of the ticket.
- beat7: A mannequin has been delivered. It has no name. It would like one. Please do not give it one.
- beat8: The rack is a conveyor. This was in the brochure. The brochure is in the coat.
- beat9: There is an item in the pile called The Coat Check (Partially). Please do not worry about it. Please check it.
- beat10: Your Coat Check is complete. This is not a threat. This is an assessment.

---------------------------------------------------------------------------------------------------

## 13. IMPLEMENTATION HINTS

- **Shape of the file:** header comment, `P.injectCSS(...)`, `P.addAchievements`, `P.addLines` calls (categories above; `retrieveitem` and `hangitem` are objects keyed by base, NOT line pools: use `api.say` directly with `fill`), data tables (`ITEMS`, `DRIFT`, `NEED`, `DEN`), `P.registerModule({... mount(root, api){...} })`. Inside `mount`: state, DOM build, render functions, event wiring, beat engine, timers, return `{destroy}`. Nothing runs at load time.
- **State -> DOM:** every zone has one idempotent `render*()` (`renderPile, renderRack, renderStubs, renderTray, renderWorn, renderMeter, renderBack, renderMini`) that rebuilds children from `S` (cheap: <= 800 nodes). Keep a `dirty` set and a single `flush()` called synchronously after each action; while `S.drag` exists, `flush()` is skipped and re-run on `endDrag()`.
- **Items are data, chips are throwaway:** DOM chips carry `dataset.id`; never keep DOM references across renders; look items up by id (`byId(id)`). Locked items (patron, Dennis, afternoon) are rendered without drag handlers.
- **Reuse the chip component** (`chipEl(item, ctx)`) for pile, rack, tray, worn and mini rack; ctx decides the label length and whether the stamp/`now:` drift line renders.
- **Pointer events:** root-level `api.on(root, 'pointermove'/'pointerup'/'pointercancel', ...)` plus `api.on(root, 'pointerdown', ...)` delegated by `closest('[data-chip],[data-stub]')`. No per-element listeners that need cleanup. Use `try/catch` around `setPointerCapture`. Everything fuzz-driven (synthetic pointer sequences with random coordinates, click-only sequences, key-only sequences) must leave `S.drag` null at the end (call `endDrag()` in `visibilitychange`, `phase` changes, `destroy`).
- **Rail path:** build the SVG once; update `d` and hook `cx/cy` on `recompute()`. Hook buttons are HTML `<button>`s absolutely positioned over the SVG at the computed (x, y) so keyboard/screen readers work; the SVG is `aria-hidden`.
- **Seeded randomness:** only `api.rand/randInt/pick/chance/shuffle`, never `Math.random`. **Time:** only `api.now()`. No `Date`.
- **Audio:** `ding` on hang, `stamp` on stub print and the TECHNICALLY YOURS slam, `whoosh` on tear, `boing` on sag and floor drops, `bell` on hatch and bell, `buzz` on Rush, `tick` on 4:17 and the conveyor, `pop` on pile arrivals, `fanfare` on fusion and achievements, `tada` on beats, `bloop` on tray drops, `sad` on surcharge. Rotate via a `Bag`.
- **Numbers are always run through `num()`** before reaching text, style or `api.save`. `NaN`, `undefined`, `null` and `[object Object]` must never appear in any visible string: build text with `String(x ?? '')` only through helpers; `fill()` strips leftover `{...}`/`$` tokens.
- **Selftest:** the fuzz runs 400 steps in ~9 virtual seconds and then a 62s idle at 60%: use `SC` so beats 1-9 fire in the fuzz, the committee reaches stage 3-4, a Rush is triggered by spam, and the module survives a destroy/remount mid-run and 20 rapid mounts: every timer is managed, `destroy()` only calls `persist()`.
- **Narrator pacing:** Lyle's `api.say` lines are priority 0 except openers/beat intros (1) and the kindness line (2); Management's meter and pile chatter is priority 0 and rate-limited by an `every` timestamp so the engine's queue never drops a punchline.
- **Dennis, Lyle's afternoon, patrons** are `locked` chips: never draggable, never hangable, never worn, never fused; guard in `hangItem`, `wear`, `fuse`, `creep`.
- **Save/restore:** call `persist()` after every checks/retrieve/beat/tip/wear and in `destroy`; call `restore()` once at mount; `restore` rebuilds the rack/pile/tray/worn from `items[]` using `loc`, clamps `hook` to `[0,hooks-1]`, drops anything malformed.

---------------------------------------------------------------------------------------------------

## 14. RISKS: THE 5 MOST LIKELY IMPLEMENTATION BUGS

1. **Drag/click double handling and orphaned drags.** The pointerup after a real drag fires a `click`, a chip re-rendered mid-gesture loses its pointer capture, and fuzz sequences (pointerdown with no pointerup, click-only, touch with no move) leave a ghost or `S.drag` set. Fix by design: one root-level handler, deferred renders while dragging, the 60ms `lastDragEnd` click-suppression, selection ONLY in the `click` handler, and an idempotent `endDrag()` on `pointercancel`, `lostpointercapture`, `visibilitychange`, phase change and `destroy`.
2. **Stale references and state drift across phases, loops and restores.** Items, stubs, selections and timers outlive a Handback reset, a `self` phase, a Rush or a restore (a stub pointing at a removed item, a fusion timer on a dragged/selected/worn item, a `locked` Dennis being hung, `sel` pointing at a deleted id, tearing a stub whose item already left). Look items up by id every time, null-guard everything, bump `runId` on every phase change, clear the rack/pile/tray/worn/stubs wholesale in `resetLoop()`, and make `retrieve(id)` a no-op-with-a-line if the id is gone (never an error, "retrieval always works" also means "never throws").
3. **Unbounded growth and long-run DOM/save bloat.** Stubs (`stubN` grows forever), pile overflow, drift arrays, brackets, speech bubbles, badges, confetti, patron items and mini racks can all grow without bound. Enforce the caps in section 5 and 6 in the data layer (not just in render), keep only the newest 14 stubs rendered, 60 stored, 12 drift phrases, 3 brackets, 70 saved items, and verify with the fuzz DOM-growth check (< 5x between step 100 and the end).
4. **Save validation and `api.save.set` refusing the write.** One `NaN`, `undefined` array hole, over-long string, class instance, or a blob over 200 KB makes the write fail silently and the game quietly stops saving or restores garbage. Run every number through `num()`, cut strings, store only plain JSON, wrap `persist()`/`restore()` in try/catch, validate on restore (type + range + cap) and fall back to a clean start on any doubt; test a `?dev=coat-check` reload at beats 3, 6 and 9 and with a hand-corrupted blob.
5. **Timer/race interactions between beats, idle secrets, Rush, creep, fusion and the conveyor.** The beat clock vs the committee pause, a Rush starting during the Handback or the `self` phase, creep and conveyor both moving items, two hooks assigned to one item after the committee swap, a second `rush()` firing before the first resolves, fusion firing on an item that creep just moved. Make every phase-bound timer go through `after()`; guard `rush()` with `S.phase === 'play'` and the cooldown; make creep and conveyor mutually exclusive via `features(beat)`; do all hook assignment through ONE `place(item, hook)` function that enforces max two items per hook, never a fused third, and clamps to `hooks`; re-verify conditions (both items still on that hook, neither dragged/selected/locked) at the moment fusion fires.

(Also watch: `{count}`/`{item}` tokens appearing in lines that are spoken without token opts (pass them every time or use the fixed-text variant), emoji newer than Emoji 12 (run lint), and `aria-live` appearing anywhere but the one caption.)
