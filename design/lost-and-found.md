# LOST & FOUND (MOSTLY LOST) (id: `lost-and-found`, category: `department`) - FINAL DESIGN BRIEF

Tagline: **"Describe what you lost. We will give you it. It is a ticket."**
Icon: 🎫 (Emoji 1, safe). Tags: `['drawing','tickets','keeping']`. `unlockCost: 0`. Window title (`api.setTitle`): **"Lost Property, Window 7 1/2"**. File: `games/lost-and-found.js` (single file, classic script, IIFE, `'use strict'`, **hard cap 1800 lines, aim for <= 1700**; see section 3 for the tier plan and what to drop first). CSS prefix `m-lost-and-found-` (write the literal prefix in every CSS selector so `tools/lint.js` sees it; in JS use `const k = s => 'm-lost-and-found-' + s`). Stats, flags, achievements: `lost-and-found.*`. Line categories: `m:lost-and-found:<name>`.

A builder who reads SPEC.md, VOICE.md and this file has everything needed. Nobody is available to answer questions: where this brief is silent, choose the simplest thing that is funny and safe. Where it says "verbatim", the text after `| ` to the end of the line is the exact string.

---------------------------------------------------------------------------------------------------

## 1. CONCEPT

You walk up to a varnished counter in Lost Property, Window 7 1/2. Behind it, asleep under a green lamp, is **WENDELL, Lost Property Clerk** (🧓 in a cardigan, a loupe pushed up on his forehead which he squints through anyway). Behind him is a shelf wall of other people's lost things, furred with dust.

**You describe what you lost** by typing it, drawing it on a clipboard with a pencil that is **tied to the counter by a string**, or both. Wendell searches (in the dark, with a lamp that YOU steer along the shelves), and returns with a **CLAIM TICKET**. The ticket is not a receipt for the thing. **The ticket IS the thing.** ("Ticket 0001: One (1) Umbrella, Hypothetical. The ticket is the umbrella. It is slightly damp, which is how we know.") The ticket prints a thumbnail of YOUR doodle, and tickets behave like the thing they are (the keys ticket jingles, the umbrella ticket rains on itself).

You can **use** the ticket, hold it up to the light, flip it to read the fine print, redeem it (for a ticket for the ticket), hand it to a customer, or **LET GO** of it: press and hold while it tugs back. Everything you let go of is **KEPT, FOREVER**, on the bottom **Permanent Shelf**, drawn from your own doodles, saved between sessions. Nothing in the building has ever left it. The board over the door says **RETURNED TO OWNER: 0 of 7 1/2** and the 0 never moves (it is a constant in the source, never a variable). The shelf then starts handing your own kept things back to you as a stranger's belongings ("Is this yours? It was handed in. By you."), and you get a ticket for the ticket, and the pad shrinks, and the string stays long.

Arc (VOICE.md rule 3): normal (a ticket that is the thing) -> weird (the search, the 4:17 callbacks, tickets of tickets) -> bureaucratically unhinged (the Line, the Audit, the Lost & Found gets lost, you are handed the stool, blind drawing of Lot 7 1/2) -> strangely touching (Wendell asks you to draw what HE lost at 4:17) -> back to normal like nothing happened (counter resets, Wendell asleep, your shelf fuller, "Next.").

**No way to win**: winning would be finding something. The ending sincerely congratulates you and then continues. The only thing that ever grows is the shelf.

Why it is distinct from other modules: it is the only module where the player DRAWS and TYPES, where a persistent shelf is made of the player's own doodles, and where the reward object is always the paperwork itself.

---------------------------------------------------------------------------------------------------

## 2. SHOWRUNNER DECISIONS (what was merged and what was cut)

Three pitches were merged into one module. **One clerk: Wendell** (the Ottoline and Philomena pitches are NOT built; do not add either). Decisions:

- **Input:** Pitch 1's drawing (tethered pencil, matcher, thumbnails on tickets and shelf) AND Pitch 2/3's typed text (keyword table, USE reactions) coexist on one report form. Text wins the ITEM name; the drawing supplies the thumbnail and a margin note ("reads as: ..."). Empty text with a drawing: the matcher names the item. Empty with nothing: "Nothing (Pristine)".
- **Search:** Pitch 2's dark lamp search (steer a beam, tags appear, "Is this yours?") replaces Pitch 1's "hold the ladder" toy. A CSS ladder still slides along a rail under the beam (cosmetic).
- **Verbs:** USE, HOLD UP TO THE LIGHT, FLIP (fine print), REDEEM, LET GO (hold), GIVE (to a customer). Surrendering non-ticket pocket items uses the same hold mechanism.
- **Nesting:** Pitch 2's "Is this yours? (by you)" return flow with Pitch 1's shrinking pad, plus Pitch 3's REDEEM and its nested titles.
- **Beats kept from Pitch 1:** 4:17 PM near the third ficus, pockets and surrender (Gordon the lint), the stool (customers, three font buttons), blind drawing of Lot 7 1/2 beside your first doodle, Wendell's own lost thing.
- **Beats kept from Pitch 2:** the Line, Found Today board, Forever amendments, the pull-back, the heavy Nothing ticket (Wendell's 1974 story is now his own), cross-module items.
- **Beats kept from Pitch 3:** fine print clauses, the Audit, Items-returned recount gag, glasses-on-head gag (as the loupe on the forehead), ticket types by colour.

**CUT (do NOT build):** the dust canvas and scrubbing, the carry-the-ticket-across-the-lobby fan minigame and the windsock, the clock dial with a draggable hand (replaced by a range slider), the hold-the-ladder toy, the luggage-tag cursor span, the fractal zoom into a ticket, the neon FOUND letters, the Annex pagination (replaced by "The Annex (+N)" text), the staff-side customers separate from the Line (they share one customer component), "Tuesday items" (no `Date`), any cursor-following element, any second canvas besides the pad, the shelf strip and tiny thumbnails.

---------------------------------------------------------------------------------------------------

## 3. TIER PLAN AND LINE BUDGET (read before writing code)

Build in this order, running `node tools/lint.js games/lost-and-found.js` and `node tools/selftest.js lost-and-found` after each tier. If the file approaches 1750 lines, drop the highest-numbered tier items first (list at the end of this section).

- **[T1] The spine (must ship):** board + flipping sign, Wendell with wake/sleep, report form (text + chips + pad with tether + smudge + stamps + keyboard pen), matcher, rummage, lamp search (with Yes/No), ticket printing with thumbnail, keyword table + USE + LIGHT + FLIP, LAST SEEN slider, LET GO (hold) + KEPT stamp + Permanent Shelf (canvas + tags) + save, Return flow + nested titles + shrinking pad, bell + bell spam, idle + Night Shift, the Keeping + ending, achievements, per-phase watchdog, all T1 lines.
- **[T2]:** the Line (customers + GIVE + Gerald), the Audit, the pull-back, pockets + surrender + Lot 0, heavy Nothing ticket, the stool, blind drawing, REDEEM, cross-module shelf items, Previous Losses drawer.
- **[T3]:** swatches, Mr. Hobbs, smiley face secret, rare coin, the leaf, special words (found / wendell / everything / nothing x3), ticket paradox, 100th report, resize event lines, LIGHT x3 music box, action-hammering lockout, MORE bin, first-thing, name surrender text swap.

Approximate line budget: CSS 210 (one dense rule per line) + strings 330 (pack 1-2 strings per physical line in arrays; category arrays go straight into `P.addLines`) + helpers 80 + pad 170 + matcher 80 + shelf/save 110 + ticket/verbs 190 + search 130 + release 100 + beats (T2) 280 + idle/spam/secrets 130 + ending 110 = ~1920 if written loosely. **Write tight**: destructure helpers, share one `panel(name)` show/hide function, one `customer()` component for Line and Stool, one `holdAction()` for LET GO and surrender, one `Bag` class for every shuffle bag.

---------------------------------------------------------------------------------------------------

## 4. CONTROLS

**Mouse/pen:** type in the box, click chips, press-and-drag on the clipboard to draw, click REPORT LOSS, move the mouse over the stock room to steer the lamp, click an item to ask "Is this yours?", click ticket buttons, press-and-hold LET GO, click the bell, click Dennis (🌿), click pocket slots.
**Touch:** all of the above; drag on the pad to draw (`touch-action:none` on the canvas); drag on the wall to steer the lamp; LET GO by a single tap (auto-release, tap again to cancel) or by holding. All targets >= 44px on `@media (pointer:coarse)`.
**Keyboard only (everything reachable with Tab/Enter/Space, all controls real `<button type="button">`):**
- Text input: Enter submits REPORT LOSS (letters are never shortcuts while the input is focused).
- Pad canvas (`tabindex=0`, `role="application"`, `aria-label="Drawing pad, arrow keys move the pencil, Space lowers it"`): **arrows** nudge the pen 4px (Shift = 1px), **Space** toggles pen down/up, **Enter** = REPORT LOSS, **1-6** drop a stamp at the pen (circle, square, triangle, squiggle, X, dot), **Backspace** is refused (`pad.backspace` line, sfx `buzz`; "Erasing is Form 12").
- Global shortcuts (document-level `api.on(document,'keydown',...)`; ignored when the target is an input/textarea/select, when any modifier (Ctrl/Alt/Meta) is held, or when `e.repeat` except for held-button logic): **B** bell, **U** use, **H** hold to the light, **F** flip, **R** redeem, **L** let go (hold, see 8.6), **G** give, **S** surrender selected pocket, **1-6** select pocket slot (only when the pad does not have focus and pockets are visible), **Esc** context-dependent (stop search / cancel let-go / cancel return / the `esc` line; never a dead end).
- Search: arrows move the lamp one cell, Home/End jump, Enter examines the lit item, Esc = "I trust the process". Focusing any slot button also moves the lamp to it.
- Stool: keys **1-3** hand a ticket in Georgia / monospace / cursive.
- Boss key and all Lobby shortcuts are off in modules; every letter belongs to the module.

**Never block a spamming player:** every phase auto-resolves (watchdog, 8.0); a click on any other control while a transient reaction is showing just replaces it.

All state is reflected in ONE `aria-live="polite"` caption line under the counter (ticket summaries, items as they are lit, board readings). Management/Wendell/customer lines go through `api.say` (the engine announces them): **do not put aria-live anywhere else**.

---------------------------------------------------------------------------------------------------

## 5. LAYOUT AND VISUAL DESIGN (inside `root`, width-flexible 360-1400px)

Palette (its own room inside the Lobby's world): **wall teal `#2f5d62`** with a faint dotted-paper texture (radial-gradient dots), **pine counter `#c98f4f`** with lip `#8a5a2b`, **brass `#d8a631`** (bell, printer, plaques), **claim-ticket salmon `#ffd9c7`**, **lamp glow `#fff2a8`**, **shelf lilac `#b79df2`** with gold trim `#f4c542`, dark stock-room `#1f2b2e`, ink `#2b2118`, stamp red `#d63b3b`, KEPT mint `#7bd9b0`, dust grey `#b9b4a6`. Everything has 3px ink outlines and `4px 4px 0 #2b2118` sticker shadows. Focus ring everywhere: `outline:3px solid #ff6f61; outline-offset:2px`. System fonts; ticket text in monospace; Wendell's margin notes in a handwriting stack (`'Segoe Print','Bradley Hand',cursive`). Ticket tint by KIND (all cheap `background` classes): physical (keys, umbrella, phone, glasses, wallet, hat, bag, sock, pet) = salmon `#ffd9c7`; abstract (mind, patience, direction, nothing-is-white) = lilac `#e3d8fb`; time (watch, time words) = mustard `#f9e29a`; self = mint `#c4f1dd`; unknown/matcher-only = cream `#fff1d6`.

Root gets class `m-lost-and-found-room`. A managed `resize` listener (`api.on(window,'resize',...)`, plus one call at mount) reads `root.clientWidth` and toggles `m-lost-and-found-narrow` when < 520px (stock room 3 columns x 5 rows instead of 5 x 3; counter panels stack; Wendell "leans"). Reflect reduced motion into class `m-lost-and-found-rm` (`root.closest('.pm-reduce-motion')` or `matchMedia('(prefers-reduced-motion: reduce)')` in try/catch, re-read at each use). Under `-rm`: no sign flip rotation (opacity swap), no fan/sway/drift, ticket print is a fade, pull-back is an instant class swap, lamp has no easing.

Top to bottom (wide layout):

1. **BOARD (hanging from two chains made of repeating-linear-gradient links):** left, the **SIGN** (two faces, flips with `rotateX` at 1.0s): front `LOST & FOUND (MOSTLY LOST)`, back `LOST: YOUR PLACE IN LINE. FOUND: A DIFFERENT PLACE, SLIGHTLY BEHIND.` Right, the **flip board** with four cells: `LOST TODAY n` / `FOUND TODAY 0` / `KEPT FOREVER 41,206+kept` / `RETURNED TO OWNER: 0 of 7 1/2` (the last is a string constant). `title` attribute on the board: `FOUND TODAY 0: confirmed by Sandra. See Clause 9(a).`
2. **STOCK ROOM (hero, upper middle):** framed dark window (`#1f2b2e`) with a 5x3 grid of 15 slot `<button>`s (emoji item, brass slot number, NO tag text in the slot), a **lamp overlay** `div` with `background: radial-gradient(circle at var(--lx) var(--ly), transparent 0, transparent 62px, rgba(10,16,18,.92) 140px)` (hidden outside the search, replaced by a dim `rgba(10,16,18,.35)` plain overlay so the wall is still visible and slightly spooky), up to **10 dust motes** (absolutely positioned dots, two drift keyframes, `-rm`: none), the CSS **ladder** (two rails + rungs, slides horizontally to the lamp x via `transform`), and ONE **tag card** under the wall that shows the text of the nearest lit slot. Wendell and the counter overlap its bottom edge.
3. **WENDELL (centre, behind the counter):** a container with `🧓` (font-size ~64px), a CSS cardigan `div` (rounded rect with two button dots and a collar pseudo-element), a loupe (a circle border) pushed up on his forehead, a glasses-chain (curved border), a `z` bubble when asleep. States via classes: `asleep` (tilt 8deg, lowered, opacity .9, `z` bubble), `awake`, `away` (slid behind the swing door at the left during rummage), `climb` (on the ladder during search), `grin` (a tiny stitched smile `div` over the lower face, after the smiley secret), `lean` (narrow layout), `intick` (hidden while he is inside a ticket), `stool` (shifted aside; during the stool beat). One speech bubble `div` (max 2 visible) next to him mirrors Wendell's line if <= 110 characters (aria-hidden; the real announcement is `api.say`). Beside him on the counter: the **bell** 🔔 (button), **Dennis** 🌿 (button, in a clay pot `div`, `aria-label="Dennis (Plant)"`), the brass **ticket printer** (a boxy `div` with a slot and a red lamp that blinks while printing).
4. **THE COUNTER (lower half), three zones (3 columns above 760px root width, stacked below):**
   - **Left, the FORM:** clipboard card with a text input labelled `What have you lost?` (maxlength 40; placeholder cycles every 5s through the 5 placeholder lines, managed interval, paused while focused), 5 suggestion **chips** (real buttons) from a pool of 24 that gets more abstract with `S.reports`, the **PAD** (280x200 logical canvas with 3px ink border; wrapper CSS width = `padW` px, aspect 280:200; SVG overlay for the string; `SMUDGE` button; hint text `Pencil is tied to the counter.`), and the primary button `REPORT LOSS` (its label and handler change by mode: `DESCRIBE IT AGAIN` (return mode), `DROP THE CLOTH` (blind), `HAND IT OVER` (Wendell's lost thing)).
   - **Centre, the TICKET PANEL:** the selected ticket (see 8.5) with its verb buttons, a LAST SEEN slider row, the swatch chips (T3), below it the **TRAY**: up to 6 ticket chips (emoji + 14-char label, newest first; a `Previous Losses (n)` button toggles a list of the last 20) and the printer slot.
   - **Right, POCKETS + KEPT letterbox:** six pocket slot buttons (hidden until beat 8), a `SURRENDER` button, and the brass **KEPT letterbox** (a flap `div` that does a `translateY` thunk when something is surrendered).
5. **PERMANENT SHELF (bottom strip, "the museum of you"):** lilac `#b79df2` bar with gold trim. ONE `<canvas>` (width = container width, height 64) that draws up to 24 of your newest kept items as 40x30 thumbnails (a doodle polyline, or the item's emoji on a cardboard box if it has no doodle), oldest-first left to right; the text `The Annex (+N)` at the right end if there are more. Under it a scroll list `<ul>` (max-height ~96px, overflow auto) of at most 40 catalogue tags (`<li>` text), newest first.
6. **CAPTION** (one `aria-live="polite"` `<p>`), then the footer line `Kept Items: n. Nothing in the building has ever left it.` (static `<small>`, not live).

Overlays (lazy, removed afterwards, DOM caps): **night overlay** (vignette + <= 6 floating item cards), **pull-back frame** (the bigger room, 8.11), **audit panel**, **stool panel**, **certificate**.

**Sprite/emoji list (all Emoji <= 12; `node tools/lint.js` errors on newer; do NOT use 🪜 🪙 🪨 🪴 🪑):** 🎫 🧓 🔔 🔦 🌿 🧤 🔑 🌂 📅 💡 🧥 📛 🐕 🔘 🔖 🗝 🚲 🎩 📦 ❓ 🍊 🧵 🙂 👻 ⏰ 📌 🥄 🧦 🍞 🥪 🥌 🥔 📎 📋 🟡 🧑 👵 👴 👨 👩 🧔 👓 👛 📞 🐱 🧳 🧭.

---------------------------------------------------------------------------------------------------

## 6. DATA MODEL, SAVE AND STATS

```
S = {                       // session state, rebuilt on every mount
  phase, runId, timers:[],  // 8.0
  reports, cycles, tickets, // reports this session / completed tickets
  beatsDone:{audit,pullback,stool,blind,keeping}, epilogue:false,
  tray:[ticket...], sel:ticket|null, prev:[summaries<=20],
  mode:'report'|'return'|'blind'|'wendell',  // pad/form mode
  depthBase:0,              // depth of the item being returned
  strokes:[flat arrays], pen:{x,y,down}, smudged:false, padScale:1,
  firstDoodle:null,         // first non-empty drawing of THIS session (copy of polylines) or null
  kept:[...from save], keptTotal, annex,
  pockets:[{id,label,emoji,kind,gone}], pocketSel:-1, youName:false,
  clauseSeen:0, ficus:0, lights:0, bellTimes:[], bellTotal:0, reportTimes:[],
  lastInput:0, night:0, rel:null, search:{...}, customer:null,
  searches:0, coinDone:false, sandra:0, paperBell:false, bellKept:false
}
ticket = { no, item:'ONE (1) KEYS'..., raw:'keys'|'', thing:'keys', kind:'keys', match:'Keys to Something Smaller'|null,
           p:[polylines<=40pts total, ints 0..99]|null, depth:0, time:'' | '4:17 PM', clause:0, heavy:false,
           lit:false, colour:'', seen:false }
```

`api.save` blob under key `'v'` (written by `persist()` after every ticket, keep, give, and at the ending; wrapped in try/catch; **always < 20 KB**; arrays hold ints and short strings only; use `num()` on every number so `NaN` can never make `api.save.set` refuse the write):

```
{ sessions, loops, total,                       // total = lifetime reports; loops = endings completed
  kept:[{ t:'keys'(<=40), e:'🔑'(<=4 chars), k:'tk'|'lint'|'meh'|'rcpt'|'half'|'pencil'|'name'|'bell'|'lot'|'you',
          n:<order no>, d:<depth>, a:<amendments>, p:[[x,y,x,y,...],...] (<=40 pts, ints 0..99, optional), s:1 (hobbs sticker, optional) }],  // cap 60
  annex:<count of entries pushed out>, first:{t:'text',p:[...]}|null,  // the very first thing ever reported on this save
  smile:bool, lot0:bool, ficus:<tickets with 4:17>, clauses:<max clause seen> }
```
When `kept.length > 60`, shift the oldest and `annex++` ("kept forever never silently drops: the Annex count grows"). `KEPT FOREVER` on the board = `41206 + kept.length + annex` formatted with `api.fmt`.

**Stats** (`api.stat.inc` / `.max`, all prefixed `lost-and-found.`): `reports`, `tickets`, `examined`, `uses`, `lights`, `flips`, `kept` (items let go), `keptmax` (max entries), `bell`, `depthmax` (`.max`), `fourseventeen`, `given`, `staffed`, `blind`, `rollcalls`, `nights`, `redeemed`, `smudges`, `loops`. (19 names, well under the cap.)

**Flags:** write `api.flag.set('lost-and-found.smile', true)` (smiley), `'lost-and-found.lot0'`, `'lost-and-found.seen'` (true on first mount; others may read). READ (never set) `metGerald`, `sockSeen`, `sock-matcher.home`, and stats `sock-matcher.entered`, `toaster-debate.entered`, `complaints-dept.entered`; flag `complaints-dept.rockMet`.

---------------------------------------------------------------------------------------------------

## 7. HELPERS (small, write once, use everywhere)

- `num(x)`: `Number.isFinite(+x) ? +x : 0`. **Every** number that reaches text, style or save goes through it.
- `clean(s)`: `String(s == null ? '' : s).replace(/[\u0000-\u001f\u007f​-‏‪-‮{}%$<>\\]/g,'').replace(/\s+/g,' ').trim().slice(0,40)` (HTML-safety: the module only ever uses text nodes via `api.el` children or `textContent`).
- `fill(str, map)`: replaces the module tokens `$THING $N $SHELF $MATCH $ITEM $TIME $NAME $A $LABEL $COUNT $DEPTH $PAD` using a function replacer (never `$` replacement patterns), then **strips any leftover `\$[A-Z]{2,}\b`** so no raw token reaches the UI. Tokens appear only in lines in this brief; `{count}` is the engine token used only in the `keptCount` category.
- `Bag(arr)`: shuffle bag (`api.shuffle`) whose `next()` never repeats the previous item across reshuffles. Use for: bell replies, sfx rotation, rummage verbs, matcher names, USE variants, customers.
- `D(ms, stMs)`: duration helper. Under `api.selftest` returns `stMs` if given, else `Math.max(60, ms*0.05)`; else `ms`. `th(n)`: report thresholds: under `api.selftest` `Math.ceil(n/3)`, else `n`; if the save has `loops > 0` or `total >= 20` also `Math.ceil(n/2)` (a returning player replays the beats faster).
- `after(ms, fn)`: `const id=S.runId; const t=api.setTimeout(()=>{ if(id!==S.runId||api.destroyed) return; fn(); }, ms); S.timers.push(t); return t;` (cleared at every phase change).
- `setPhase(name, onIdle)`: `S.runId++`, clear `S.timers`, end any stroke, cancel any release, set `S.phase`, arm the watchdog (8.0), update panel visibility.
- `say(text, who, mood, pri)`: `api.say(fill(text), {who: who||'Management', mood: mood||'neutral', priority: pri||0})`; if `who==='Wendell'` or a customer and text.length <= 110, also set the speech bubble (cap 2 bubbles; each fades after 4s via `after`). `sayR(cat, who, map)` = `say(api.line('m:lost-and-found:'+cat), who)` with fill.
- `nth(n)`: 1st 2nd 3rd 4th ... 11th 12th 13th (teens rule).
- `half(n)`: formats a count with a trailing ` 1/2` when the fractional part is .5 (`19 1/2`).
- `pad4(n)`: zero-pads to 4 digits.

---------------------------------------------------------------------------------------------------

## 8. MECHANICS AND STATE MACHINE

### 8.0 Phases, runId, watchdogs, selftest scaling

`S.phase` is one of: `counter` (default, form + ticket panel live), `rummage` (clerk away, 1.5-2.5s), `search` (dark lamp), `audit` (T2), `pullback` (T2), `stool` (T2), `blind` (T2), `keeping` (roll call), `final` (Wendell's lost thing + certificate), `night` (secret). The **return flow is not a phase**: it is `S.mode==='return'` inside `counter` (the pad shrinks, the button says DESCRIBE IT AGAIN). Ticket verbs (USE, LIGHT, FLIP, REDEEM, LET GO, GIVE) are live in `counter` on `S.sel`. Opening a new report while a ticket is selected just leaves that ticket in the tray.

**Rules:** every phase change calls `setPhase` (`S.runId++`, clears that phase's managed timers); every async callback is created via `after()` (starts with the runId check); the one self-rescheduling `api.requestAnimationFrame` loop (string wobble, lamp easing, release ring, mote drift is CSS) checks `api.destroyed` and uses delta time (`dt` clamped to 0.1s). **Watchdog:** phases `rummage`, `search`, `audit`, `pullback`, `stool`, `blind`, `keeping`, `final` and `S.mode==='return'` each pass an `onIdle` default that is funny and resolves the phase; the watchdog fires `onIdle` after **20s with no player input** (re-armed by every pointerdown/keydown/input), and **a hard cap of 45s** regardless of input. Under selftest: 3s idle, 9s hard cap. The `counter` phase (without return mode) has NO watchdog except the first-ever zero-input print (8.1 first 10s), so the Night Shift can fire.

**Selftest/fast scaling (every long wait):** search 8s -> 1.5s, rummage 2s -> 150ms, LET GO 1.5s -> 0.3s (heavy Nothing 3s -> 0.5s), audit 12s -> 0.8s, FOUND 1/2 flicker 12s -> 1s, pull-back hold 3s -> 0.4s, roll call per item 1.2s -> 0.1s, "Back in 15 minutes" lockout 15s -> 1s, paper bell 15s -> 1s, Wendell-in-the-ticket 7.5s -> 1s, report thresholds via `th()`. **Idle secrets under selftest use K = 0.3** (45s/90s/+7.5s become 13.5s/27s/+2.25s so the engine's 62s virtual idle triggers them): `IDLE1 = 45000*K`, `IDLE2 = 90000*K`, `STILL = 7500*K`.

### 8.1 First 10 seconds, zero input (the opening)

- t=0: `api.setTitle('Lost Property, Window 7 1/2')`; Management says one of the `open` lines (priority 1; later loops use the `again` variants, 8.16/17); Wendell asleep (`z` bubble); the board reads LOST TODAY 0 / FOUND TODAY 0 / KEPT FOREVER 41,206+; the sign shows its front.
- t=1.0s: the **sign flips** to `LOST: YOUR PLACE IN LINE. FOUND: A DIFFERENT PLACE, SLIGHTLY BEHIND.` Management reads it aloud (`open.sign`, priority 0). sfx `tick`.
- t=3.0s: **Wendell wakes** (`wake` line, who 'Wendell'), the clipboard slides over (CSS), sfx `blip`. (If the player rings the bell or reports first, he wakes immediately and the 3s event is skipped.)
- t=12s (K-scaled) with no input AND `S.reports===0`: Wendell prints an unprompted ticket for **`THE THING YOU WERE ABOUT TO SAY`** (`noinput` line), kind `unknown`, goes through the normal ticket path (counts as report #1, award 0.5, no search).

### 8.2 THE PAD (drawing; `PAD` module section)

Logical canvas 280x200, DPR 1, `touch-action:none`. `S.padScale = clamp(0.88^depth, 96/280, 1)`; the wrapper CSS width = `round(280*padScale)`px (height by aspect); drawing coordinates are ALWAYS logical (0..280, 0..200) mapped with `(clientX-rect.left)*(280/rect.width)`.

- **Strokes:** `S.strokes` = array of flat arrays `[x0,y0,x1,y1,...]` (ints). Max 60 strokes; max 4000 points total (when exceeded, drop every second point of the oldest stroke until under). New points closer than 2px to the previous are ignored.
- **The tether (the signature gag):** the pencil is tied to the counter by a string. Anchor `A=(140,232)` (just below the sheet, logical). Tether radius in SCREEN pixels is constant `185`, so the logical radius is `R = 185 / padScale` (the pad shrinks, the string stays long: by depth 4 the pen can reach everything, "the string is wider than the sheet"). `borrowed pencil` (after surrendering the pencil): radius x0.8. Pointer/key positions are **clamped to the circle of radius R around A**: the top corners of a full-size sheet are literally out of reach. When a requested position was clamped, the string is taut: a straight line, a `twang` (`S.twang=6` amplitude decaying `e^(-6t)` with a 30Hz sine in the rAF loop) and sfx `tick` throttled to one per 250ms; caption `twang` at most once per 6s. Not clamped: quadratic path `M A Q mid+droop P` with `droop = max(0, (R - dist)) * 0.35` in an SVG `<path>` (stroke `#2b2118`, 2px, no fill) over the canvas; a small circle at the pen tip. The SVG viewBox is `0 0 280 240` (the extra 40px under the sheet shows the anchor, a brass nail).
- **Pointer:** `pointerdown` (primary button/touch/pen) -> `try{ canvas.setPointerCapture(e.pointerId) }catch(_){}`; start a stroke; `pointermove` while down appends clamped points; `pointerup`, `pointercancel`, `lostpointercapture`, and any phase change end the stroke (`endStroke()` is idempotent). A stroke shorter than 4px total becomes a dot (a 3-point mini stroke). The pen position is also updated on hover (so the string follows the cursor).
- **Keyboard pen:** `S.pen={x,y,down}` starts at (140,100). Arrows move it (clamped to the tether), Space toggles down/up (down starts a stroke at the pen, each further arrow adds a point, up ends it), keys 1-6 drop a stamp polyline centered at the pen, scaled ~14px (circle = 12-point closed loop; square = 5 pts closed; triangle = 4 pts closed; squiggle = 10-point sine; X = one 5-point polyline `(-1,-1)->(1,1)->(0,0)->(1,-1)->(-1,1)`; dot = 3 pts within 2px). Stamps respect stroke/point caps.
- **Smudge:** the `SMUDGE` button jitters every point by +-3px (seeded `api.rand`), redraws with `lineWidth 4`, `globalAlpha .55`, sets `S.smudged=true`, award 0.1 (once per drawing), `smudge` line ("Wendell finds the smudge MORE descriptive"). This is the only eraser; Backspace is refused (`pad.backspace`).
- **Render:** `drawDoodle(ctx, strokes, w, h, opts)` is the single renderer for the pad, ticket thumbnail (64x46), the shelf thumbs (40x30) and the blind-reveal canvases: it normalizes to the strokes' bbox when `opts.fit` is set. Ink: `#2b2118`, `lineWidth 2`, round caps/joins. Optional (T3): an inline SVG `feTurbulence` "rough pencil" filter is applied via CSS `filter:url(#...)` only to ticket thumbnails (not the pad).
- **Doodle storage:** `toPoly(strokes)` normalizes to a 0..99 box (uniform scale, ints) and decimates to **<= 40 points total** across strokes (keep first/last of each stroke, then thin evenly). Used for `ticket.p`, kept entries and `S.firstDoodle`.
- **Blind mode** (beat 10): while `S.mode==='blind'` the canvas has `opacity:0` while the pen is down (pointer or keyboard) and peeks (`opacity:1`) for 300ms after the pen goes up; the string SVG stays visible so the player can still feel the string. `blind.peek` line once per beat if they peek twice.
- **Return mode:** a dashed ticket-outline overlay (`::before`, perforated stub on the right) sits over the sheet; the sheet is the shrunk size.

### 8.3 THE MATCHER (deterministic; `MATCH` section)

`features(strokes)`: `n` (non-empty strokes), per stroke `len`, `closed` (len > 40, >= 6 points and first-to-last distance < 18), `straight` (chord/len), turning angle sum; `ink` (total length); bbox `w,h` and `aspect=w/max(h,1)`; `loops` (closed count); `dots` (strokes with len < 8); `center` (fraction of points inside the central 40% box of the bbox); `roundness` of a closed stroke = `4*PI*area/perimeter^2` (shoelace area); `spiral` (any stroke whose cumulative signed turning >= 3*PI).
First match wins, in this order (each bucket has 2-3 names in a `Bag`; `$MATCH` is the name):
1. `n===0`: **"Nothing (Pristine)"** (kind `nothing`, `heavy:true` when text is also empty).
2. **face** (secret, T3): exactly one closed stroke with roundness > 0.7 AND >= 2 dots whose centers lie inside that loop's bbox in its upper 60% AND >= 1 open stroke (len > 14) in its lower 60%: **"A Face, Lost in 1998"** + the smiley secret (11.3).
3. spiral: "One Sunday Afternoon, Slightly Used" / "A Train of Thought, Terminus Unknown"
4. `n > 25`: "A Reasonable Doubt" / "A Very Thorough Misunderstanding"
5. cross: 2 strokes each `straight > .8` and `len > 25` whose bboxes overlap near their middles: "Keys to Something Smaller" / "A Plus Sign, On Loan"
6. `n===1 && loops===1`: "A Hat, Probably Yours" / "A Halo, Returned Slightly Used"
7. `n===1 && straight > .9 && len > 150`: "The Thread of a Conversation" / "A Queue, Single File"
8. wide thin (`aspect > 3` or `< 0.33`) and `n <= 3`: "An Apology (Unclaimed Since 1994)" / "A Horizon, Unaccompanied"
9. `2 <= n <= 4`: "One (1) Umbrella, Hypothetical" / "A Brolly, Conceptually"
10. `n >= 8` and average stroke length < 35: "A Good Mood (Opened)" / "Several Small Reasons"
11. `center > .6`: "A Pen That Was Always Someone Else's" / "The Middle of Something"
12. fallback: "Something Shaped Like a Maybe" / "A Left-Handed Moment" / "The Rest of the Sentence"
A smudged drawing prefixes the name with `Smudged, and Therefore ` only for the margin note (never changes the bucket). The ticket's thumbnail is the doodle; under it the margin note reads `Wendell has written in the margin: reads as $MATCH.` (a `margin` line).

### 8.4 TEXT -> TICKET (keyword table; `TICKET` section)

`kindOf(raw)` tests lower-cased `raw` against regexes, first hit wins. Each kind has an emoji, a tint class, an animation class, and a USE line (section 16.U):

| kind | words | emoji | anim |
|---|---|---|---|
| ticket (secret) | exactly `my ticket`, `ticket`, `the ticket` | 🎫 | pulse |
| nothing | `nothing`, `empty`, `none`, empty string | ❓ | sag |
| keys | key | 🔑 | shake |
| umbrella | umbrella, brolly | 🌂 | drip |
| phone | phone, mobile | 📞 | shake |
| glasses | glasses, specs, spectacles | 👓 | pulse |
| wallet | wallet, purse | 👛 | sag |
| watch | watch, clock, time, minutes, hours, day, tuesday, monday, weekend, appointment | ⏰ | spin |
| mind | mind, marbles, thought, thread, plot, sentence, bus | 💡 | float |
| pet | cat, dog, hamster, pet | 🐱 | pulse |
| sock | sock, glove | 🧦 | float |
| direction | direction, way, lost | 🧭 | spin |
| patience | patience, temper, hope, faith, mood | 🙂 | float |
| hat | hat, cap | 🎩 | pulse |
| bag | bag, case, luggage | 🧳 | sag |
| self | me, myself, my place, place in line, name | 🙂 | pulse |
| generic | anything else (also matcher-only) | 🎫 | pulse |

(Any emoji from the safe list may be swapped for another safe one; the self kind shares 🙂 with patience on purpose.)

`item` string: strip leading `my|the|a|an|our|your`, uppercase, cut 40; if the last word ends in `s` but not `ss` and there are <= 3 words and the kind is not nothing/self/watch: prefix `ONE (1) SET OF `, else `ONE (1) `. `thing` (used in lines as `$THING`): the lower-cased `raw` with the leading article stripped; for matcher-only tickets, the matcher name lower-cased with the leading `a|an|the|one (1)` stripped (so "Your hat, probably yours" is the grammar, and it is correct). Empty raw and empty drawing: item `ONE (1) NOTHING (PRISTINE)`, thing `nothing`.

**Chips (24-pool, 5 shown, rotate on each report; the first 10 are concrete, the rest abstract):** keys, umbrella, one glove, my phone, glasses, my wallet, a hat, a cat, eleven minutes, my patience, my train of thought, my sense of direction, a Tuesday, the end of the sentence, my place in line, my plot, a bus, my temper, my name, half a thought, the thread, nothing, I do not know, whatever it was I came in for. (`I do not know` and `nothing` submit as empty/nothing; `I do not know` ticket item is `THE THING YOU WERE ABOUT TO SAY`.)

### 8.5 SEARCH, TICKET, TRAY (the core cycle; `CYCLE` section)

**Report submit** (`REPORT LOSS` button, Enter in input or on the pad): reads the text (`clean`), the strokes, builds the ticket data (8.3/8.4), `S.reports++`, `api.stat.inc('lost-and-found.reports')`, `api.award(0.5 or 0.3 for a chip)`, board LOST TODAY +1, records `S.firstDoodle` (first non-empty drawing of this session) and `save.first` (first ever, once), logs report time (spam check, 10.2), clears the form (text, strokes, smudged), then:
- report #1 of the session: `rummage` (Wendell away 1.5-2.5s, sfx pattern blip/bloop/pop on a 400ms tick, bubble verb from the `rummage` bag), then print.
- report #2+: `rummage` is skipped; `search` begins (Wendell climbs the ladder: `climb`, the room darkens).

**Search** (`S.phase==='search'`, 8s; selftest 1.5s; "I trust the process" button and Esc end it early): the 5x3 grid (3x5 narrow) is rebuilt with 15 slots chosen from the scenery pool (16.S, 24 items with tags) via a Bag; plus conditional cross-module items (14), plus **YOUR kept items** (from report #6 and `kept.length>=1`: guaranteed at least 1 slot; later 50% chance, max 2 slots; rendered as cream mini tickets, class `mine`), plus the rare coin (11.6). The **lamp** (`--lx`, `--ly`) follows pointer position over the wall (mouse hover, touch/pen drag), arrow-key steps (cell centers), Home/End; the true lamp position eases toward the target in the rAF loop (`1-exp(-14*dt)`, no easing in `-rm`). The CSS ladder `translateX` follows `lx`. A slot is `lit` when its center is within 90px of the lamp; the tag card shows the text of the nearest lit slot; the caption (aria-live) announces that text when the nearest lit slot changes (max one per 600ms). Click/Enter on a slot (lit or not; unlit ones say `It is dark. This is part of the search.` in the tag card) asks **"Is this yours?"** with two buttons `Yes, that is mine` / `No (that is also mine)`; the answer never matters; examining an item the first time in this search awards 0.2 (max 3 per ticket) and `lost-and-found.examined++`; the reaction line comes from the `yes`/`no` bags or the item's own special line (cross-module items 14). Return items: `YES` -> return mode (8.7), `NO` -> `a++` on the entry and the `returnNo` line. When the search ends: if nothing was examined, say `search.none` ("I saw you not looking."); Wendell returns (`search.back`), the ticket prints.

**Print** (after rummage/search): sfx `whoosh` + `stamp`, the printer lamp blinks, the ticket element is created with a `clip-path: inset(0 0 100% 0)` -> `inset(0)` reveal over 0.9s (`-rm`: fade), `S.tickets++`, `S.cycles++`, the ticket is `unshift`ed to `S.tray` (cap 6; the overflow drops off the tray into the `Previous Losses` ring `S.prev`, cap 20), `S.sel` = it, `api.stat.inc('lost-and-found.tickets')`, caption: `Ticket LF-$N. Item: $ITEM.`; Wendell says one `ticket` line (the first ticket also plays `fanfare`, `api.confetti(undefined, undefined, 14)`, Management says `ticket.first`, award 0.5, and `api.achieve('lost-and-found.first')`). From beat 3 on the ticket also gets `time = '4:17 PM'` automatically ("Wendell writes it anyway") and `api.stat.inc('lost-and-found.fourseventeen')`. Back to `counter`. Then `maybeBeat()` (section 9) may start the next beat after 2s.

**Ticket panel (centre):** the ticket is a `div` with a perforated left/right edge (`radial-gradient` mask), a conic-gradient hologram stripe, the header `CLAIM TICKET No. $N`, the thumbnail canvas (64x46, only if the drawing was non-empty; else the item emoji at 40px), `ITEM:` line (the nested title, 8.7), the margin note (if drawn), `CONDITION: lost (excellent)`, `LAST SEEN:` (`not stated` before beat 3; `Tuesday, 4:17 PM, near the third ficus` after; the ficus text escalates: first <5 uses `third ficus`, 5-9 `fifth ficus (of three)`, >=10 `the ficus that is also lost`), the footer `THIS TICKET IS THE ITEM. DO NOT LOSE IT. IT IS NOT A TICKET FOR THE ITEM.`, and a perforated stub with `LF-` + `pad4(no)` in a condensed serif. `kind` tint class on the ticket. Up to 3 stacked ticket layers are drawn with extra box-shadows (depth 0: none; 1: one layer; 2: two; 3+: three) - **never more than 3 DOM ticket elements**.
Verb buttons (all `<button type="button">`, 44px, in a wrapping row): `USE (U)`, `HOLD UP TO THE LIGHT (H)`, `FLIP (F)` (from report 2), `REDEEM (R)` (from report 3), `LET GO (L)` (from report 4), `GIVE (G)` (only while a customer is present). Gating by `S.reports >= th(n)`; before the gate the button is not in the DOM (not merely disabled), so the early screen is calm.
- **USE:** plays the kind's anim class for 1.2s (shake, drip/rain overlay on the ticket only, spin hands, sag, float, pulse) + sfx per kind (keys `tick`x3, umbrella `pop`, phone `bell`, watch `tick`, wallet `bloop`, nothing `sad`, generic `blip`), says the USE line (16.U, `$THING` filled), award 0.1, `uses++`. Tickets also **misbehave unprompted every 20-40s while selected** (keys shake, umbrella drips; a managed timeout reschedules itself; at most one anim at a time).
- **HOLD UP TO THE LIGHT:** a glint sweep + the big emoji watermark at 100px, opacity 1 for 2s over the text; one `light` line (bag); award 0.1; `lights++`; third time in a session = the music-box secret (11.9).
- **FLIP:** toggles the back: the fine print clause for this ticket (8.8). Enter on a focused ticket also flips.
- **REDEEM:** Wendell goes to the rummage (150ms selftest) and returns "the SAME item in the form in which it was lost: a new ticket", `depth+1`, stamp `CLAIMED`, the old ticket is replaced in the tray (same slot), `redeem` line; award 0.2; `redeemed++`; `depthmax`. With no ticket selected: prints `THE INTENTION TO REDEEM` as a normal ticket (`redeem.none` line).
- **GIVE / LET GO:** 8.6 and 8.9.

### 8.6 LET GO (hold-to-release; one mechanism for tickets AND pocket items)

A press-and-hold ring on the button (`conic-gradient(var(--c) calc(var(--p)*1%), transparent 0)`, `--p` driven in the rAF loop). The ticket (or pocket item) visibly **tugs back**: a CSS wobble class whose amplitude drops as `--p` rises, and Wendell reads a hesitation line at 25%/55%/80% progress (the `holding` bag, shown in the tag card/bubble, NOT via `api.say` repeatedly: only once per release via `api.say`).
`S.rel = {mode:'hold'|'auto', t:0, dur, target, dead:false}`.
- Duration: normal ticket 1.5s; heavy `Nothing` ticket 3s (and the 1974 story, 8.13); +1s per nesting depth; capped at 7.5s; pocket items 1.0s. Selftest: 0.3s (heavy 0.5s).
- **Start:** `pointerdown` on the button (mouse/touch/pen) or `keydown` Enter/Space on it (ignore `e.repeat`) starts `mode:'hold'`. **Release:** `pointerup` / `keyup`: if the press lasted < 250ms it was a TAP -> switch to `mode:'auto'` and keep going (touch/fuzz friendly: a tap starts a full auto-release); if >= 250ms and not complete -> cancel (`letgo.early` line, 0 Meh). A second tap while in `auto` mode, Esc, `pointercancel`, `blur` of the button, a phase change or a tab hide (`visibilitychange` via `api.on(document,...)`) cancels. A bare `click` with no preceding `pointerdown` within 400ms (synthetic) is treated as a tap.
- **Complete:** `KEPT` rubber stamp slams (scale 1.8 -> 1, rotate -6deg, double border, mint `#7bd9b0`) with the Forever amendment text for `S.keptTotal` (16.F), sfx `stamp`, the ticket flies (CSS transition to the shelf strip, 400ms; `-rm`: fade) and is removed from the tray, an entry is pushed to `S.kept` (cap 60, 6), `persist()`, the shelf canvas redraws, the catalogue tag is added (16.T), the letterbox does a `thunk` (sfx `bloop`), award 1, `kept++`, `keptmax`, Management says `keptCount` with `{count}` (every 3rd keep), Wendell says a `letgo.done` line. First ever: Management `letgo.plaque` (the three-note fanfare for a cardboard rectangle; `api.sfx('ding')` x3 on a 150ms tick) and `api.achieve('lost-and-found.letgo')`.
- Shelf Space labels: `Shelf Space N` where N counts 1,2,...,7, then `7 1/2`, then 8,9,...

### 8.7 THE RETURN AND NESTED TICKETS

When the player says **Yes** to a `mine` item: Wendell `return.yes1`, `S.mode='return'`, `S.depthBase = entry.d`, `S.padScale = clamp(0.88^(entry.d+1), 96/280, 1)`, the form shows the placeholder `Describe it fully. You have described it fully before.`, the pad shows the ticket outline, the button reads `DESCRIBE IT AGAIN`, Esc cancels back to normal mode ("Escape returns it; never a dead end"). Submit (anything, even nothing; also the watchdog's default after 20s) prints a ticket whose `thing` is the entry's label and whose `depth = entry.d+1`; the entry **stays on the shelf** (kept, `a++`); `S.mode='report'`, pad scale resets; award `0.3 * depth`; stats `depthmax`; Sandra: from depth 4 each new nested ticket adds `S.sandra++` and Management says `sandra.small` / `sandra.flag` (once per ticket, bag); `api.achieve('lost-and-found.nested')` at depth 3. Wendell lines by depth (16.R): 1, 2, 4 ("smaller"), 5 ("idea of a ticket"), 7 ("seven and a half would require the missing half").
**Title function** `title(t)`: depth 0: `item`; 1-4: `item` + ` (Ticket` repeated `depth` times + `)` repeated `depth` times (e.g. `ONE (1) UMBRELLA (TICKET (TICKET))`); 5-6: `TICKET to the 5th (umbrella)`; 7-8: `the idea of umbrella, presented as a ticket (7th)`; >= 9: `TICKET to the 9th (umbrella)`, `nth(depth)` counting up forever. **Depth is capped at 99999** in data and **at most 3 stacked ticket layers** in the DOM; the tray chip text is the title cut to 28 chars. The brief's old "Ticket x 7 1/2" form is dropped.

### 8.8 LAST SEEN and the fine print (beat 3)

From `S.reports >= th(3)` the selected ticket shows a **LAST SEEN row**: `When did you last have it?` with a real `<input type="range" min="0" max="23">` (hour of the day, labelled; keyboard arrows work) and a COMMIT on `change`. Whatever the player slides, the ticket then reads `Tuesday, 4:17 PM, near the third ficus`; Wendell says one `lastseen` line (the bag; escalating at the 5th/10th/15th: `ficus5`, `ficus10`, `ficus15` lines); award 0.2 once per ticket; the first time, Management says `lastseen.first` ("4:17 stays 4:17 on every ticket from now on"). `fourseventeen` counts every ticket that has the time written (slider or automatic). At `fourseventeen >= 10`: `api.achieve('lost-and-found.ficus')`. T3: **6 swatch chips** (Damp, Sort Of, Thursday, Beige-ish, Loud, Technically) add a `COLOUR:` line to the ticket, Wendell's matching `swatch` line, +0.1 once per ticket.
**FLIP (fine print):** each *distinct ticket* flipped for the first time reveals the next clause in order (`S.clauseSeen`, saved as `clauses`); reflipping shows the same one; after clause 9, the extras repeat in a bag (16.P). Management cites a clause back every 3rd flip (the `clause.cite` bag, e.g. "Kept under Clause 6, warmly."). Award 0.05; `flips++`.

### 8.9 THE LINE (customers; beat 6; `CUSTOMER` component, T2)

From `S.reports >= th(8)` and `kept.length >= 2`, after each ticket prints (and 40% of the time in the epilogue), **at most 1 customer** (👵🧔👨👩🧑, a Bag) steps up to the right end of the counter with a **speech card** built from the player's OWN earlier losses: pick a random entry from `S.kept` or `S.tray` (not the selected ticket) and use `thing` in one of the `line.ask` templates; if there is no history, use the canned `line.canned` bag. Up to 2 faded silhouettes (👤) wait behind (decor, no logic). The `GIVE (G)` button appears on the selected ticket; clicking GIVE then (or clicking the customer card / its button `Hand over my $THING`) hands that ticket over: Wendell `line.object` ("Tickets are not the item."), customer `line.thanks`, the ticket **leaves the tray and is kept by THEM forever** (not on your shelf), **award 2** (the best payout in the module), `given++`, `api.achieve('lost-and-found.line')`, the customer leaves. `Not today` button declines (customer `line.sigh`, shuffles to the back, a new customer later). A customer ignored for 2 reports leaves with `line.leave`. Customers never block the counter and never run out. **Mr. Hobbs (T3):** when `kept.length >= 3`, one customer in the Line is Hobbs who "reports a loss that is word for word one of YOUR kept items" (`hobbs.ask`); Wendell serves him automatically (`hobbs.ticket`), the entry stays on your shelf with a small tag `Hobbs: ticket issued` (`s:1`), +0.5 Meh, no player input needed. **Gerald (T2, only if `api.flag.get('metGerald')`):** once per session, in beat 6 or later, 🥔 joins the line and says (who `'Gerald'`) `gerald.ask`; Wendell replies `gerald.reply`; Gerald `gerald.thanks`. Gerald is read-only here (do NOT set `metGerald`).

### 8.10 THE AUDIT (beat 7a, T2)

Once, when `S.reports >= th(11)` and `maybeBeat()` picks it: `setPhase('audit', disputeDefault)`; verb buttons are hidden/disabled (the panel shows the audit panel instead); two clipboard emoji 📋 and a dim lamp appear; the panel shows five figures that **disagree and jitter every 700ms** from fixed arrays (`Items on shelf`, `Items lost`, `Items found: 0`, `Items kept`, `Items not lost: -7 1/2`); Management `audit.*` lines; a `Dispute the figures` button (always live) ends the phase immediately (so it can never trap a player); otherwise it ends after 12s (selftest 0.8s). During the audit the **ticket machine "prints a ticket for something you have not lost yet"**: choose a random chip text the player has NOT used, show `ONE (1) $ITEM, 8:45 PM, ready for collection` as a slip, and **prefill the text input** with that text; `audit.prophecy`. If the player's next report equals the prefilled text, Wendell is smug (`audit.smug`). Awards 0.3. Then the pull-back.

### 8.11 THE PULL-BACK (beat 7b, T2)

`setPhase('pullback', pullDefault)`. Management `pullback.lost` ("The Lost & Found has been lost.") The board: LOST TODAY += 7.5 (displays `half()`), FOUND TODAY flips to `1/2` for 12s (selftest 1s) with Management `pullback.half`, then back to `0`. Then the **camera pulls back**: the whole `.room` gets `transform: scale(.35)` over 2s (`-rm`: instant) while a lazily-created outer frame (a bigger shelf drawn with `repeating-linear-gradient`, a bigger counter slab, a bigger Wendell 🧓 at 3x size, a bigger sign saying `LOST & FOUND`) fades in around it. A bigger Wendell says `pullback.is` ("Is this yours?") with two buttons `Yes (it is)` / `No (it is also)`: either resolves; after 3s (selftest 0.4s) with no answer it resolves itself. Then the room scales back, the outer frame is removed (DOM cap), the Wendell lines `pullback.after` and Management `pullback.whole`. `api.achieve('lost-and-found.pullback')`, award 1.

### 8.12 POCKETS AND SURRENDER (beat 8, T2)

From `S.reports >= th(13)`: a row of **6 pocket slot buttons** appears, one more item arriving per report (`filled = min(6, reports - th(13) + 1)`), in this order: **Pocket Lint** 📎 (id `lint`), **1 Meh** 🟡 (`meh`), **A Receipt For The Receipt** 📋 (`rcpt`), **Half A Thought** 💡 (`half`), **Your Pencil** ✏ (`pencil`), **Your Name (on loan)** 📛 (`name`). Select a slot (click or keys 1-6), then `SURRENDER (S)` (the shared hold mechanism, 1.0s). There is no drag-and-drop onto the letterbox. On completion: the item "flies into the letterbox" (thunk), becomes a shelf entry with its own tag (16.T), Wendell reads its `pocket.<id>` line, award 0.5 (**1 Meh: `api.award(-1,'a Meh, kept')` instead; the engine never lets the balance go below 0**), `kept++`.
- **Pencil surrendered:** the pen becomes the "borrowed pencil" (tether radius x0.8, a `On loan, from itself` label on the pad; drawing never becomes impossible).
- **Name surrendered (T3):** `S.youName=true`: Wendell and the shelf tags call you `You` (module text only; never touch `api.player`).
- **All six surrendered:** the **Lot 0 secret** (11.4).
`pocket.arrive` lines announce each new item in the caption.

### 8.13 THE HEAVY THING (the Nothing ticket, T2)

A ticket with `heavy:true` (an empty submit with no drawing, the `nothing` chip, or typing `nothing`; NOT the `I do not know` chip, which makes the `THE THING YOU WERE ABOUT TO SAY` ticket) is `ONE (1) NOTHING (PRISTINE)`: the tray sags (CSS `rotate(-2deg) translateY(6px)` on the tray) while it is held. Its LET GO takes 3s (selftest 0.5s) and **during the hold Wendell tells his own 1974 story, one line per second, with NO sfx and NO Management lines for the whole hold** (`heavy.1/2/3` shown in the tag card + bubble, announced once through the caption; `api.say` only for the final line). Releasing early at any point makes him **stop mid-sentence** (the current story line cut at ~55% with a dash) and then say `heavy.again` ("I can start again."). The same ticket kind used three times in a row (11.7) gives the blank-both-sides variant.

### 8.14 THE STOOL (beat 9, T2)

Once, when `S.reports >= th(17)`: Wendell `stool.start`, `setPhase('stool', serveDefault)`, he steps aside (`stool` class) and the player sits behind the counter: the form panel is replaced by the stool panel: a customer emoji (1 visible) with a speech card (`stool.cust` list, in order the first 4 scripted, then random), and **three buttons labelled TICKET in three fonts** (Georgia, monospace, cursive; keys 1-3). All three are correct (the ticket is always the thing). Clicking one: Wendell's reaction for that font (`stool.georgia/mono/cursive`), the customer's thanks (`stool.thanks`, the first customer gets the sincere-joy line), award 0.2, `staffed++`, next customer. A 4:17 clock `div` on the wall (always reads 4:17). After 3 customers (selftest 3, fast): `stool.end` (Wendell takes the stool back), `api.achieve('lost-and-found.stool')`, award 1. The watchdog default (20s idle; selftest 3s) hands out the first font automatically.

### 8.15 BLIND DRAWING: LOT 7 1/2 (beat 10, T2)

Once, when `S.reports >= th(19)`: Wendell `blind.start`, `setPhase('blind', blindDefault)`, `S.mode='blind'` (8.2), the pad canvas is hidden while drawing, the text input is hidden, the button reads `DROP THE CLOTH` (Enter on the pad also drops it). On submit (or the watchdog default): award 2, `blind++`; **the cloth drops**: two small canvases appear side by side: left = **your first doodle of this session** (`S.firstDoodle`, or the saved `first.p` from a previous session, or a blank sheet if none), right = the blind attempt, joined by an SVG line that **wobbles** (a sine path updated in the rAF loop, amplitude 6px, until the next phase). Wendell reads `blind.reveal` ("It is your first drawing. It was handed in at 0:03 by someone who looked like you, but better rested.") or `blind.revealNone` if nothing was drawn first. Then `blind.claim` ("Lot 7 1/2 cannot be claimed. It can only be Kept..."). The blind drawing is added to the shelf as `Lot 7 1/2` (`k:'lot'`, entry saved with its doodle). `api.achieve('lost-and-found.blind')`. After 4s (selftest 0.5s) the counter returns.

### 8.16 THE KEEPING (beat 11) - see the full script in section 17

---------------------------------------------------------------------------------------------------

## 9. ESCALATION TIMELINE (the director's table)

Beats are triggered by `S.reports` thresholds (via `th()`), not the clock; a typical report takes 20-30s, so a full run is about 8-10 minutes. `maybeBeat()` runs 2s after every ticket print (and after any modal beat) and starts at most one unstarted beat whose threshold is met. Between beats the normal loop (report -> search -> ticket -> verbs) continues.

| # | Beat | Starts | What changes |
|---|---|---|---|
| 1 | THE COUNTER | 0:00 | Sign flips at 1s, Wendell wakes at 3s, first report: rummage, the ticket that is the thing, `fanfare` for nothing. USE and LIGHT available. |
| 2 | THE LADDER / THE LAMP | report 2 | Dark lamp search every report; Wendell climbs; `FLIP` arrives; the lamp is the toy; examining pays 0.2. |
| 3 | WHEN LAST SEEN | report 3 | The slider; 4:17 stays 4:17 on every ticket from now on; `REDEEM` arrives; swatches (T3). |
| 4 | KEPT | report 4 | `LET GO` arrives; first KEPT stamp, first plaque, Forever is amended for the first time; Sandra is cited; the Permanent Shelf starts to fill with your doodles. |
| 5 | THE RETURN | report 6 (needs a kept item) | The lamp finds YOUR kept things; YES = describe again = ticket of a ticket; nesting titles; the pad shrinks 12% per level; Sandra counts small tickets from depth 4. |
| 6 | THE LINE | report 8 (needs 2 kept) | A customer asks for your own earlier losses; GIVE pays 2; Gerald if `metGerald`; Hobbs (T3). |
| 7 | THE AUDIT, THEN THE PULL-BACK | report 11 | Figures disagree; a ticket for something you have not lost yet; then the whole room is a ticket-sized thing on a shelf in a bigger Lost & Found. |
| 8 | POCKETS (and the heavy thing) | report 13 | Six pockets fill; surrender Gordon the lint, 1 Meh, receipts, half a thought, pencil, name; the heavy Nothing ticket tells Wendell's 1974 story. Shelf looks like a museum of you. |
| 9 | THE STOOL | report 17 | Wendell hands you the stool; three font buttons, all correct. |
| 10 | LOT 7 1/2 | report 19 | Draw the cloth-covered lot blind; the cloth drops on your first doodle; the wobbling line. |
| 11 | THE KEEPING | report 20 | Roll call of the shelf by ladder; Wendell's own 4:17 loss; the certificate; the not-ending. |
| after | EPILOGUE | - | Everything unlocked; beats do not repeat this session; the loop continues. `loops++`, text variants advance. |

If a player reaches report 20 early because of the speed-up or a replay (`loops>0`), beats still run in order, one per ticket.

---------------------------------------------------------------------------------------------------

## 10. IDLE AND SPAM

### 10.1 Idle (real player input only; micro-moves < 20px and engine-driven phase changes do not count)

`S.lastInput` is updated by `pointerdown`, `keydown`, `input` events and `pointermove` with > 20px of travel since the last recorded position. A managed 500ms interval (`api.setInterval`) checks it **only when `S.phase==='counter'`**.
- **45s (`IDLE1`):** the lamp over Wendell dims (CSS class), he falls asleep on the bell: Management `idle.45`; sfx none. Rearms after any input.
- **90s (`IDLE2`): THE NIGHT SHIFT.** `setPhase('night')`, the lamp goes out (vignette overlay, `pointer-events:none`), up to 6 scenery item cards (emoji + a tiny ticket) float down from the shelf with a stepped `translateY` keyframe and line up at the counter, each holding a ticket reading `Lost: you`; Management `idle.90`. **Any input** (pointerdown, keydown, pointermove > 20px) scatters them back (`night` -> `counter`, overlay removed), Management says `idle.claimed` ("Someone has claimed you. It was you. The fee is 0 Meh. The fee was lost, and has been kept."). **If the player stays perfectly still 7.5s more (`STILL`)**: every ticket flips to `Found: you. Condition: here. Kept: nobody has said.`, a soft bell x4 (`api.sfx('bell')` on a 350ms tick), Management `idle.found`, **award 10**, `nights++`, `api.achieve('lost-and-found.night')`. Once the payoff has fired in a session it does not pay again (the visual repeats).
- **First-run zero-input print** at 12s (8.1) is the only phase exception.

### 10.2 Spam

- **Bell (12 rings within 3s):** `S.paperBell=true` for 15s (selftest 1s): the bell becomes a flat paper-drawing bell (CSS class), its sound is Wendell saying `bell.paper` flatly via `say`, a ticket-bell chip appears in the tray `BELL (lost) No. 0101`; Management `bell.spam`, Wendell `bell.filed`. Then `bell.back`. One-time `api.award(-0.5,'agitation fee')`. `api.achieve('lost-and-found.bell')`.
- **Bell (30 rings in a session):** the bell is surrendered and **KEPT** on the shelf (entry `k:'bell'`), the bell button is replaced by an invisible-but-focusable **knock** button over the counter (`aria-label="Knock on the counter"`, sfx `tick`); Wendell `bell.kept`; knocking wakes him (`bell.knock`).
- **Reports (8 within 10s):** the **MORE bin** slides in (a bin `div` labelled MORE), takes the next 3 tickets without comment (they do not print; a single receipt `Received: MORE (3). Not itemized. Kept.`), -0.5 Meh once (`spam.fee`), Wendell `spam.more`. (T3.)
- **Hammering:** 14 clicks within 3s on the same action button (REPORT LOSS, LET GO, SURRENDER, GIVE) disables the action buttons for 15s (selftest 1s) behind a sign `WINDOW 7 1/2 WILL BE BACK IN 15 MINUTES (15 SECONDS)`; Management `spam.back`; after the lockout the rubber stamp line `spam.stamp`. Awards Meh only through the normal paths (none here). (T3.)
- **Ordinary spam** (rapid clicks on USE, LIGHT, FLIP, the bell, Dennis): each click still plays sfx and the anim; lines are rate-limited to one per 700ms by the `say` coalescing; nothing ever stalls.

---------------------------------------------------------------------------------------------------

## 11. SECRETS AND RARE EVENTS (all T2/T3 unless marked)

1. **THE NIGHT SHIFT** [T1] - 10.1. Achievement `lost-and-found.night` (secret).
2. **THE BELL IS FILED / KEPT** [T1] - 10.2. Achievement `lost-and-found.bell` (secret).
3. **DRAW A SMILEY** [T3]: the face detector (8.3) fires: Wendell stops, touches his own face: `smile.face` ("That is my face. I lost it in 1998."), a stitched grin appears on the clerk (`grin` class), **+5 Meh** (`api.award(5,'a face')`), `api.flag.set('lost-and-found.smile', true)` and `save.smile=true`; from then on `wake`/`ticket` lines use their warmer variants (16.W `warm`). The ticket itself is `A Face, Lost in 1998`, which Wendell pins in his breast pocket: the ticket is removed from the tray (the pocket is pinned, not shelved). `api.achieve('lost-and-found.smile')`. The grin is permanent next session (`save.smile` read at mount).
4. **LOT 0** [T2]: surrender all six pocket items including your name and pencil: Wendell `lot0.say` ("You have surrendered everything. That makes you Lost Property."); a small `👤`-shaped silhouette entry `Lot 0` (`k:'you'`) goes on the shelf, `save.lot0=true`, `api.flag.set('lost-and-found.lot0', true)`, +5 Meh; next session Wendell greets with `lot0.next` ("You were on the shelf. You are free to go. Please note you are Kept."). `api.achieve('lost-and-found.lot0')` (secret).
5. **TICKET PARADOX** [T3]: typing exactly `my ticket`, `ticket` or `the ticket`: Wendell `paradox.1`; the ticket you get is "the ticket you are holding": depth+1 without the return flow, a second stub (CSS), an infinite-regress thumbnail (the ticket element's thumbnail is a ticket icon inside a ticket icon; CSS only). Three times in a row Wendell says `paradox.3` ("That is not a ticket. That is a position."). `api.achieve('lost-and-found.paradox')` (secret), award 1.
6. **RARE COIN** [T3]: about 1 search in 77, **and always on the 7 1/2th search of a session** (the 8th `S.searches` count, i.e. when `S.searches===8`): one slot holds 🟡 `One (1) Meh, found`. Examining it: board FOUND TODAY flips to `1`, `api.award(1,'a coin')`, Management `coin.found`; 1.5s later Wendell takes a handling fee `api.award(-1,'handling fee')` with `coin.fee`, board back to `0`, `coin.recount`.
7. **SPECIAL WORDS** [T3] (`clean(raw).toLowerCase()` exact or whole-word): `found` -> Wendell `word.found` and the sign becomes `LOST & LOST` for 30s (the board's FOUND cell reads `-` for 30s); `wendell` or `the clerk` -> he vanishes **into the ticket** (`intick` class, a `BACK IN 7 1/2 MINUTES` sign `div` on the counter; ringing the bell makes the ticket jingle); after 7.5s (selftest 1s) he steps out: `word.wendellBack`; `everything` -> the shelf wall's slots slide into the ticket (2s CSS) and refill after: `word.everything`, `word.refill`; `nothing` typed or empty-with-no-drawing three times in a session -> the blank-both-sides ticket `word.nothing3` (item `ONE (1) NOTHING (BOTH SIDES)`, the FLIP back is also blank).
8. **THE LEAF** [T3]: click Dennis (the pot button) 7 times in a session: Management `leaf.found`; board FOUND TODAY shows `1` for exactly 1s then back with `leaf.recount`; +0.5 Meh; `api.achieve('lost-and-found.leaf')` (secret). Clicks 1-6 give `dennis` bag lines.
9. **LIGHT x3** [T3]: holding up any tickets to the light three times in one session releases a quiet 3-note music-box rise (`api.sfx('bell')` on a 450ms tick x3), the ticket text becomes `Mine.` for 2s, Wendell `light.mine`.
10. **FIRST THING** [T3, session 2+]: about one search in 12 lights a slot holding the very first thing ever reported on this save (`save.first.t`), tagged as someone else's. YES: Wendell `firstthing` ("You have been looking for this since before you knew."), a ticket with a different number but the same date.
11. **THE 100TH REPORT** [T3]: when `save.total` reaches exactly 100: Management `hundred` (Wendell has run out of ticket paper and issues the ticket on the back of a ticket: it is "the same ticket, from the other side"); award 7.5.
12. **RESIZE** [T3]: below 520px root width the shelf goes 3 columns and Management says `resize.narrow` once per 20s; widening again says `resize.wide` once.

---------------------------------------------------------------------------------------------------

## 12. ACHIEVEMENTS (declare with `P.addAchievements`; ids prefixed `lost-and-found.`; 18 total, 6 secret)

| id | name | desc | icon | secret | reward |
|---|---|---|---|---|---|
| lost-and-found.first | Grand Marshal of Descriptions That Almost Resemble Something | Report your first loss. The ticket is the item. Wendell says it is a very good likeness of a ticket. | 🎫 | no | 2 |
| lost-and-found.ficus | Laureate of Tuesday, 4:17 PM, Near the Third Ficus | Have 4:17 PM written on ten of your tickets. The ficus sends its regards. There are three ficuses. It is not clear which one is sending. | ⏰ | no | 5 |
| lost-and-found.thing | Chancellor of the Ticket That Is the Thing, Hereditary | Receive 10 tickets that are the item. Not one item has been returned. The board reads 0 of 7 1/2 and is very pleased with its consistency. | 📋 | no | 5 |
| lost-and-found.letgo | Archduchess of Letting Go (Eventually, After A Bit) | Let go of your first ticket. It is kept forever, which is a clause, and the clause is also kept. | 📦 | no | 2 |
| lost-and-found.kept8 | Archduke of Surrendered Things, Kept in Perpetuity | Let go of 8 things. All are kept. The shelf has a velvet rope and a feeling. | 🗝 | no | 5 |
| lost-and-found.collection | High Chancellor of the Permanent Collection | Have 12 items kept forever on the shelf. The shelf did not ask for them. It has accepted them with a rattle. | 🧳 | no | 5 |
| lost-and-found.nested | Lord Protector of the Ticket That Is a Ticket (Ticket) | Hold a ticket three tickets deep. It is your thing. It is your thing's thing's thing. | 🎫 | no | 3 |
| lost-and-found.line | Supreme Handler of Tickets That Are Not the Item | Give a ticket to a customer. They thanked you for the item. Wendell would like it noted it was not the item. | 🙂 | no | 3 |
| lost-and-found.pullback | Pontiff of the Pull-Back | Witness the Lost & Found sitting on a shelf in a larger Lost & Found. Is this yours? It is. It was. | 🔦 | no | 3 |
| lost-and-found.stool | Warden of the Borrowed Stool | Hand out three tickets from behind the counter. All three fonts were correct. | 🧓 | no | 3 |
| lost-and-found.blind | Blind Surveyor of Lot 7 1/2 | Describe Lot 7 1/2 through a curtain. It was your first drawing. You are late to it. | 👻 | no | 3 |
| lost-and-found.keeping | Custodian of Everything That Remains | Reach the end of Lost & Found. Nothing has been found. The counter is open. | 📌 | no | 10 |
| lost-and-found.night | Warden of the Night Shift Queue and Its Tiny Tickets | Hold perfectly still while the lost things come down from the shelf and find you. They were looking for you. They have a ticket. | 🎫 | **yes** | 10 |
| lost-and-found.lot0 | Dame Commander of Lot 0 (One Valued Employee, Name on Loan) | Surrender everything you own, including your name. You are now Lost Property, Kept, and fine with it. | 👤 | **yes** | 10 |
| lost-and-found.smile | Restorer of a Face Lost in 1998 | Draw a smiley. A clerk touches his own face. It was never opened. It is a ticket now. | 🙂 | **yes** | 5 |
| lost-and-found.bell | Imperial Warden of the Bell That Is Lost In Plain Sight | Ring the bell 12 times in 3 seconds. The bell has been reported lost. It is right there. | 🔔 | **yes** | 5 |
| lost-and-found.leaf | Keeper of the Found Leaf (Foliage, Not An Item) | Click Dennis (Plant) seven times. A leaf is found for exactly one second. A recount is held. Gravity is thanked. | 🌿 | **yes** | 3 |
| lost-and-found.paradox | Sovereign of the Ticket That Is Also Held | Report your ticket lost while holding your ticket. These are not two things. They are one thing in a bad mood. | 🎫 | **yes** | 3 |

Triggers: `first` at the first ticket print; `ficus` when `fourseventeen>=10` (stat); `thing` at `tickets>=10`; `letgo` first completion; `kept8` at `kept>=8`; `collection` at `keptmax>=12`; `nested` depth 3; `line` first GIVE; `pullback` at the end of 8.11; `stool` at 8.14 end; `blind` at 8.15; `keeping` at the ending; secrets per section 11/10. Call `api.achieve` manually (stat-based `check` functions are allowed but unnecessary).

---------------------------------------------------------------------------------------------------

## 13. ECONOMY (tiny and meaningless; never more than 10 per event except the ending)

report 0.5 (chip report 0.3); examine an item 0.2 (once per item per search, max 3 per ticket); USE 0.1; LIGHT 0.1; FLIP 0.05; last seen 0.2 (once per ticket); swatch 0.1; smudge 0.1 (once per drawing); REDEEM 0.2; LET GO 1; pocket surrender 0.5 (**the 1 Meh pocket: `api.award(-1)`**); return/describe-again `0.3 x depth`; GIVE 2; stool 0.2 each (+1 at the end); audit 0.3; pull-back 1; blind 2; roll call 5; Wendell's drawing + ending 7.5; secrets: night 10, smiley 5, Lot 0 5, rare coin +1 then -1, 100th report 7.5, leaf 0.5, bell fee -0.5, MORE fee -0.5. Pass a short `reason` string to `api.award` ("a ticket", "kept forever", "a tiny coin"...). Call `api.award` at least once per report so the fuzz harness always sees engagement. The balance never goes below 0 (engine) and no module code ever assumes otherwise.

---------------------------------------------------------------------------------------------------

## 14. CROSS-MODULE CALLBACKS (read-only; wrap every read in try/catch; every item appears at most once per search)

- **The Missing Sock (sock-matcher)** - if `api.flag.get('sockSeen')` or `api.flag.get('sock-matcher.home')` or `api.stat.get('sock-matcher.entered') > 0`: one shelf slot holds 🧦 with the lilac tag `sock.tag`. Examining says `sock.yes`. If `sock-matcher.home` is true the tag becomes `sock.home`.
- **Gerald (potato-interview, elevator-simulator and others)** - `api.flag.get('metGerald')`: 8.9 (Line only, once per session). Never set the flag.
- **The Toaster (toaster-debate)** - `api.stat.get('toaster-debate.entered') > 0`: 🍞 `toast.tag`; examining plays `sad` and says `toast.yes`.
- **Brenda's half sandwich (complaints-dept)** - `api.stat.get('complaints-dept.entered') > 0`: 🥪 `sandwich.tag`; examine `sandwich.yes`.
- **The Rock (complaints-dept)** - `api.flag.get('complaints-dept.rockMet')`: 🥌 `rock.tag`; examine `rock.yes`.
- **Dennis the Lobby Plant** - the pot on the counter (`dennis` lines, the leaf secret). **Sandra from Compliance** - only cited (`sandra.*`, clause 7, the certificate signature `S.`), never seen. **Tuesday** - cited in clause 2 and the shelf tags.
- Others read this module: `lost-and-found.smile`, `lost-and-found.lot0`, `lost-and-found.seen`.

---------------------------------------------------------------------------------------------------

## 15. IMPLEMENTATION HINTS AND BUDGET

- File skeleton order: header comment `/* POINTLESS module: lost-and-found */`; IIFE; `const P = window.POINTLESS;` helpers (7); data (kinds table, scenery pool, stamp polylines, clauses, bags' source arrays); `P.injectCSS(css,'css-lost-and-found')`; `P.addAchievements([...])`; `P.addLines('m:lost-and-found:<name>', [...])` for every random-pick category (build them in a loop from an object `{open:[...], wake:[...]}` to save lines: one `for` over `Object.keys`); `P.registerModule({... mount(root, api){...}})`.
- **No timers or listeners at load**. In `mount`: build DOM with `api.el`; one `api.on(document,'keydown',...)`, one `api.on(window,'resize',...)`, one `api.on(document,'visibilitychange',...)`; one managed rAF loop; one managed 500ms idle interval; one managed 5s placeholder interval. `destroy()` can be `{}` or just set a local `dead=true` (everything else is managed). Remounting 20 times must not leak.
- All text is built with text nodes (`api.el` children / `textContent`); never `innerHTML`. Never put raw player text into `aria-label` without `clean()`.
- Never call `api.exit()`. No `Date`, `Math.random` (use `api.rand`/`api.pick`), no `localStorage` (use `api.save`).
- `api.say(who:'Wendell')` for Wendell and customers; `who:'Gerald'` for the potato; Management is the default. Moods: `smug` for audit.smug and bell.filed, `proud` for ticket.first and keeping, `confused` for return.yes1, `panic` for bell.spam, `disappointed` for letgo.early.
- Keep the shelf canvas redraw event-driven (on keep/load/resize), not per frame. The pad redraws only when strokes change or the pen moves (and the SVG path is updated in the rAF loop only when the pen/anchor/twang changed).
- Sound: `api.sfx` only with the known names: bell, ding, blip, tick, pop, honk, boing (bell rotation Bag), stamp (KEPT, print), bloop (thunk), whoosh (ticket slide), fanfare (first ticket, ending), tada (certificate), sad (nothing/toast), buzz (refused Backspace), error (never).
- Reduced motion: every CSS animation is wrapped by a `.m-lost-and-found-rm .m-lost-and-found-*{animation:none!important;transition:none!important}` rule; JS-timed visual effects check `RM()`.
- Run `node tools/lint.js games/lost-and-found.js`, `node tools/selftest.js lost-and-found --steps 600`, `--seed 1..5`, and `node tools/selftest.js lost-and-found --real`; look at `node tools/shot.js lost-and-found --width 360` and `--width 1100` (and one with `--actions 80`).
- **If the file approaches 1750 lines drop in this order:** T3 items in the order they are listed in section 3, then Hobbs, then the Audit prophecy prefill, then the pull-back outer frame (keep the scale-down only), then the Previous Losses drawer, then swatches, then Gerald, then the stool. Never drop: the tether, the matcher, the lamp search, LET GO, the shelf, Return/nesting, idle/Night Shift, bell spam, blind, the keeping.

---------------------------------------------------------------------------------------------------

## 16. ALL LINES (verbatim)

Convention: `W|` Wendell (`who:'Wendell'`), `M|` Management (`who:'Management'`), `C|` customer (speech card and `who:` the customer's label `Customer`), `G|` Gerald (`who:'Gerald'`), `S|` text that appears on the sign/ticket/board/caption (not spoken). Module tokens: `$THING $N $SHELF $MATCH $ITEM $TIME $NAME $A $LABEL $COUNT $DEPTH`. `{count}` is only used in `keptCount`. A category name below is the part after `m:lost-and-found:`. Register random-pick categories with `P.addLines`; keyed/ordered lists (USE by kind, clauses, amendments, tags by item, stool customers) are inline arrays.

### 16.O open (mount, priority 1; the first applicable one) and again (loops)
open:
- M| Welcome to Lost & Found. Please describe what you have lost. We will describe it back to you, with feeling.
- M| Window 7 1/2 is open. It has been open since a Tuesday. It is not clear which.
- M| We have found nothing since 1974. This is a record, and also a confession.
open.sign:
- M| The sign has been turned over. It is the same sign. It is now slightly behind.
- M| LOST: your place in line. FOUND: a different place, slightly behind. Management considers this a swap.
again (the loop variants, said once at mount by `save.loops`; index capped at 3):
- W| You again. Your things are where you left them, which is the same place you lost them.
- W| Again you. Please take a ticket. It is for the ticket.
- W| You, in retrospect. Please describe what you have lost. We will wait. We have the time. It is 4:17.
- W| Someone handed these in. They look like you, but better rested.
welcomeBack (Management, if the save has kept items):
- M| Welcome back. Your {count} items are doing fine. They have not been moved. They have not asked about you.
S| Sign front: LOST & FOUND (MOSTLY LOST)
S| Sign back: LOST: YOUR PLACE IN LINE. FOUND: A DIFFERENT PLACE, SLIGHTLY BEHIND.

### 16.W wake (3s, or on the first bell/report) and warm variants
wake:
- W| I was not asleep. I was resting my eyes on the inside of my eyelids. It is a recognized grade.
- W| Name? Never mind. You have the look of someone whose umbrella is in another county.
- W| Draw it, or say it, or both. Do not tell me what it is. I will tell you what it is. That is the service.
warm (only if the smiley secret is on the save):
- W| I was not asleep. I was resting my eyes. They are happier than they were.
- W| Name? Never mind. You have the look of someone who gave a clerk back his face.
noinput (the 12s unprompted ticket):
- W| You were about to say something. I have written down the thing you were about to say. It is on the ticket. It is the thing.
S| Item text: THE THING YOU WERE ABOUT TO SAY

### 16.B bell (bag of 10, each ring; sfx rotation bell, ding, blip, tick, pop, honk, boing; never repeats)
bell:
- W| Ding. I heard it. I hear everything. I misplace some of it.
- W| The bell is for emergencies. This is not an emergency. This is, however, a bell.
- W| Yes. Hello. I am awake. I am facing the other way, but awake.
- W| That was a B-flat. Or a complaint. They are filed together.
- W| One ring means attention. Two rings means attention, again. You have rung it once. Carry on.
- W| The bell has been rung. It will remember this, mostly in its clapper.
- W| I rang that bell for forty years. It rang me back, twice.
- W| Please do not ring the bell at the shelf. The shelf takes it personally.
- W| Ding. That is the sound of a thing being noticed. It is rare here.
- W| The bell is brass. The brass is lost. What you are ringing is its description.
bell.five:
- W| That is five. I have started a file called Rings. It is thin and it is yours.
bell.ten:
- W| That is ten. The file is now a folder. The folder has a tab. The tab says Rings (Yours).
bell.spam:
- M| You have rung the bell 12 times in 3 seconds. The bell has been reported lost. It is still there. It has been lost in plain sight, which is the hardest kind.
bell.filed:
- W| The bell has been filed. It is now Ticket 0101. Please ring the ticket. It rings in paper.
bell.paper:
- W| Ding.
bell.back:
- M| The bell has been found. It was never lost. It was filed. The distinction is Sandra's.
bell.kept:
- W| The bell has been Kept. Please knock. Knocking is on the shelf, next to Gordon.
bell.knock:
- W| Knock. Yes. Come in. There is no in. Come anyway.
S| Chip: BELL (lost) No. 0101
S| Knock button aria-label: Knock on the counter

### 16.R report, rummage, search
report (Wendell on receipt, bag; the first ever uses the first):
- W| Mm. Yes. I have seen this. I have not seen this. It is the same feeling.
- W| Please wait here. I will go and be somewhere else for a while. It is the whole service.
- W| Noted. It will be described to you shortly. Please do not describe it to yourself in the meantime.
- W| That is a very specific loss. I have a very general shelf. We will meet in the middle.
report.empty:
- W| You have lost nothing. Nothing is very popular. I have a ticket for it. The ticket is nothing, pristine.
rummage (bubble verbs, bag; shown as `Wendell is <verb>.`):
- shuffling
- sighing at a box
- reading a label out loud
- climbing the ladder to look at the ladder
- consulting a larger ladder
- apologising to a shelf
- finding a different thing and keeping it
search.start:
- M| The room has gone dark. This is part of the search. So is the lamp. You have the lamp. Please do not drop the lamp.
- W| Hold the lamp steady. If the shelf moves, it is because the floor moved. If the floor moved, it is because I did.
search.dark (clicking an unlit slot, tag card text):
- S| It is dark. This is part of the search.
search.none:
- W| I saw you not looking. It is a skill. I have seen it done by professionals.
search.trust:
- W| The process thanks you. The process is not a person. It is, however, standing by the door.
search.back:
- W| There. I have returned. It was a long way to the shelf and a longer way back.
- W| I am back. I would like it noted that the shelf is higher than it was.
- W| Back. The ladder and I are no longer speaking. We will resume on Monday.
yes (answered Yes on a stranger's item, bag):
- W| Noted. It is now yours, and still theirs. It has been placed between you in the form of a form.
- W| Yours. Of course. Please sign here. Not there. The other here.
- W| Mm. Yes. It has your look about it. It has everyone's look about it. That is the secret of a good lost thing.
no (bag):
- W| Noted. It goes back. It has now been lost twice, which is how you can tell it is serious.
- W| Of course. No. It was a long shot. The shelf is nothing but long shots.
- W| Not yours. It does not take it personally. It takes everything else personally.
S| Caption when a slot is lit: Shelf Space $SHELF. $LABEL (the tag text)

### 16.S the scenery pool (emoji | tag text; 24 items; 15 are chosen per search)
- 🧤 | One (1) left glove, belonging to a right hand. The hand has not been in.
- 🔑 | A set of keys to a door that has since been renovated into a different door.
- 🌂 | An umbrella, lost on a sunny day, handed in on a sunny day. It is waiting for rain with great dignity.
- 📅 | One (1) Tuesday. Found in a coat pocket. Unclaimed. Has a library fine.
- 💡 | One (1) very good idea, lost in the shower, 2009. It was shaped like a lightbulb. It has stopped glowing.
- 🧥 | A cardigan with a whole personality in the pocket. Not ours. We have read the personality. It is fine.
- 📛 | A lanyard. The badge is blank. The owner is described on the form as "a presence".
- 🐕 | A child's drawing of a dog, labelled DOG. The dog is not on the premises. The drawing is quite sure.
- 🔘 | Eleven unrelated buttons in a jar labelled Mostly Coat.
- 🔖 | A bookmark still holding someone's place in a book that was returned in 2003. The place has not been.
- 🗝 | A tiny brass key marked DRAWER. The drawer is marked KEY. They have never met.
- 🚲 | A bicycle bell rung once in 1998 and still faintly ringing, on a shelf, in the dark, in good faith.
- 🎩 | A hat that fits nobody and therefore everybody. It is two years overdue for being taken.
- 📦 | One argument, slightly used, still in the box it was won in.
- ❓ | A Reasonable Doubt (opened). Do not shake.
- 🍊 | One (1) Sunday afternoon. Found on a bench. Smells of oranges and nothing happening.
- 🧵 | The thread of a conversation. We have pulled it. We regret pulling it.
- 🙂 | A good mood, still wearing its tag. Do not put on in front of colleagues.
- ⏰ | A watch showing 4:17. It has been told what time it is. It is not listening.
- 📌 | Someone's place in line, folded small. It is still in the line, slightly behind.
- 🔦 | A torch, switched on, in daylight, in the lost property of a different lost property.
- 🥄 | One (1) spoon, lost at a wedding, found at a different wedding. It has taken to weddings.
- 👻 | Lot 7 1/2: Under a cloth. Described by nobody. Claimed by nobody. Warm. (always present; the cloth "breathes": a slow scale keyframe)
- 🧭 | A sense of direction, pointing at the clerk. It has been pointing for years. It is quite sure.
mine (the tag of one of YOUR kept items in the stock room): Handed in by you, last Thursday, 4:17 PM, near the third ficus. Described as: $LABEL.

Cross-module tags (14):
sock.tag: 🧦 | One (1) sock, on a journey. Reference: Lost Property, Window 7 1/2 (that is here). We did not see it come in. It sends regards.
sock.home: 🧦 | One (1) sock, Home (kept). It matches nothing now and is fine with that.
sock.yes: W| We have a form for it. The form is lilac. The sock has signed it.
toast.tag: 🍞 | One (1) slice of toast, warm. Unclaimed. Vouched for by itself.
toast.yes: W| It was handed in, in a good mood, and has been warm ever since. We do not ask how.
sandwich.tag: 🥪 | One (1) half sandwich, labelled BRENDA. The other half has been in a meeting since March.
sandwich.yes: W| It is half a sandwich. It is a whole complaint. They are kept together.
rock.tag: 🥌 | One (1) rock, calm. Handed in by a very senior complaint. Kept with respect.
rock.yes: W| It said nothing. It was the most helpful thing in the building.

### 16.T catalogue tags for kept items (the shelf list; `$TIME` is always `4:17 PM`)
tk (ticket): - Shelf Space $SHELF: $ITEM. Kept since 4:17 PM. Not claimed. Not claimable. Not thinking about you, but kept.
lint: - Shelf Space $SHELF: Gordon (pocket lint). Kept since 4:17 PM. Likes the dark.
meh: - Shelf Space $SHELF: One (1) Meh, on a small velvet cushion. Number 1. Not a unit of anything.
rcpt: - Shelf Space $SHELF: Receipt for the Receipt. Original receipt: lost. Receipt for it: this.
half: - Shelf Space $SHELF: Half a thought. Other half: sent a letter. Awaiting reply.
pencil: - Shelf Space $SHELF: One pencil, on loan, from itself. Tied to nothing.
name: - Shelf Space $SHELF: A name, framed. Previously: $NAME. Currently: You.
bell: - Shelf Space $SHELF: One (1) bell. Kept. Knocking is on the shelf, next to Gordon.
lot: - Lot 7 1/2: Described blind. Kept since before you came in.
you: - Lot 0: One Valued Employee, name on loan, unclaimed.
hobbs sticker (appended): - Hobbs: ticket issued.
amendment suffix for tk after a NO on return: - (kept again, with additional forever)

### 16.F Forever amendments (the KEPT stamp text, indexed by `S.keptTotal`, 8+ repeats the last)
1. KEPT FOREVER
2. KEPT FOREVER (UNTIL THURSDAY)
3. KEPT FOREVER (SUBJECT TO REVIEW)
4. KEPT FOREVER, WHICH IS A LONG TIME, WE CHECKED
5. KEPT FOREVER (RENEWED)
6. KEPT FOREVER, PLUS TUESDAY
7. KEPT FOREVER (7 1/2 YEARS, ROUNDED UP)
8. KEPT, WHICH IS THE SAME WORD
(After the ending: the stamp reads `KEPT FOREVER (CARRIED OVER)` for any entry that existed at the start of this session.)

### 16.K ticket, kept, let go
ticket (Wendell, after printing; bag):
- W| There it is. Your $THING. It is the ticket. It is slightly damp, which is how we know.
- W| Ticket $N issued. The ticket is your $THING. Please do not lose it. We have no ticket for that.
- W| I do not give you a ticket for it. I give you it. It is a ticket. It is what it is.
- W| That is your $THING. It has been given a number. That is how we know it is yours.
- W| Please do not fold your $THING. It is a ticket. Folding is a different form, and it is closed.
ticket.first:
- M| Congratulations. A fanfare has been arranged for a cardboard rectangle.
ticket.mgmt (every 4th ticket, bag):
- M| Items returned to owner: 0. Tickets issued to owner: $N. The owner is thrilled, we assume.
- M| Your claim was processed by someone who has also lost something, which makes them thorough.
- M| Per policy, a thing is lost only until it is reported. After that it is Pending, a status with its own chair.
margin (the ticket's margin note): S| Wendell has written in the margin: reads as $MATCH.
smudge:
- W| Smudged. Yes. That is more descriptive. Smudging is a recognised form of detail.
pad.backspace:
- W| Erasing is Form 12. Form 12 is the SMUDGE. It is the only eraser. It is a bit of a mess.
pad.twang:
- W| Please do not stretch the string. The string was here first.
- W| The pencil is tied to the counter. The counter has never once let go of it.
esc:
- W| Esc: You have already lost it. The Department thanks you for trying to un-lose it.
letgo.hint (shown in the tag card at the start of a hold):
- S| Hold to let go. It will tug. This is normal.
holding (bag, one shown per hold at 25/55/80%):
- W| Hold. Hold. Management is not looking. Management is looking at the other thing.
- W| It is tugging. They do that. It is a ticket's way of saying thank you for asking.
- W| Almost. A little more forever. Just the last bit of it.
letgo.done (bag):
- W| You have let go of your $THING. It is on Shelf Space $SHELF, between a trumpet mouthpiece and a mood.
- W| Kept. The ticket is on the shelf now. It remembers you. It has been told to be discreet.
- W| Kept. It has been given a small cardboard box and a label. The label says $THING. The box is thrilled.
- W| Your $THING is Kept. We have a place for it. The place is next to the other places.
letgo.early (bag):
- W| You let go early. The ticket held on a bit. Hesitation noted and filed under Almost.
- W| Release noted. Not completed. The ticket has put its hand back in your pocket.
letgo.plaque:
- M| A plaque has been fitted. A three-note fanfare has been played for a cardboard rectangle. Management is not sorry.
letgo.clause:
- W| Items you give up are kept. Forever. This is not a figure of speech. It is Clause 9, and Clause 9 has also been kept.
- W| Kept items cannot be returned. This is not a rule. It is a feeling the shelf has.
letgo.sandra:
- M| Sandra has amended Forever. Forever is now subject to review. Review is scheduled for Forever.
- M| Sandra has flagged Lost & Found for losing things. Sandra has flagged Found for finding nothing. Clause 14(c) bis.
keptCount (Management, {count} = kept items, every 3rd keep):
- M| Kept Items: {count}. Nothing in the building has ever left it. This is considered a success.
- M| Returned to Owner: 0 of 7 1/2. Management is proud of the consistency.

### 16.U USE reactions, by kind (shown in the caption AND said by Wendell; `$THING` filled)
- keys: The ticket jingles. It has unlocked the counter. The counter was not locked. It is now locked about it.
- umbrella: The ticket has opened. It is raining on the ticket only. The ticket is dry. The rain is disappointed.
- phone: Your phone (ticket) is ringing. It is the Lost & Found calling about your phone. They have not found it. They are the phone.
- glasses: You are now wearing your glasses (ticket). You can see clearly that you are holding a ticket.
- wallet: Your wallet (ticket) contains 0 Meh and a photograph of a smaller wallet. The smaller wallet looks proud.
- watch: Your watch (ticket) reads 7:30. It has been told what time it actually is. It is not listening.
- mind: Your train of thought (ticket) has arrived at a station. It is the same station. It has been here the whole time.
- pet: Your pet (ticket) is not a pet. It has been fed a ticket. Both are thriving.
- sock: Your sock (ticket) is half of a pair. The other half is also a ticket and is, per records, on a journey.
- direction: Your sense of direction (ticket) points firmly at the clerk. It has never been so accurate.
- patience: Your patience (ticket) is made of waiting. It is the most patient thing in the building, including Dennis (Plant).
- nothing: Nothing (ticket). It is blank. It is very heavy. Please sign for it. We have nothing to sign with.
- ticket: Your ticket (ticket). It is the ticket. It was always the ticket. It has been the ticket the entire time.
- hat: The ticket is on your head now. It fits. Several people look at it. Nobody says anything. This is how hats work.
- bag: The ticket is a bag. It contains a smaller bag, which contains the idea of what you had in it.
- self: The ticket introduces itself. It is you. It says it has been looking for you everywhere, and it is a little out of breath.
- time (use the `watch` kind's anim, but this line for `time` words): The ticket is late. It has been late since it was printed. It is on time for being late.
- generic: You used your $THING (ticket). It worked the only way a ticket works: you were asked to wait.

### 16.L light (HOLD UP TO THE LIGHT, bag), lastseen, swatches, ficus
light:
- W| You hold your $THING (ticket) to the light. It is exactly as translucent as it needs to be and not one thing more.
- W| Held to the light the ticket reads: "This is not the thing. It is the thing. It is not." The watermark is a keyhole, and a very small ficus.
- W| Against the light it is a ticket. Against the lamp it is also a ticket. Against the dark it is warm.
- W| You can see through it to the other side of the counter. I am there. I wave with the other hand.
light.mine:
- W| That is the third time. It has stopped being a ticket and become a word. The word is Mine. It will pass.
lastseen.ask:
- W| When did you last have it? ... Four seventeen. P.M. Near the third ficus. I will write that.
lastseen (bag):
- W| You said 9:40. I have written 4:17. Nine-forty is not a time we recognize on this floor.
- W| The third ficus is one of three ficuses. Which one is the third is a matter for the ficuses.
- W| Whatever you slid it to, it is 4:17. The slider is for your comfort. It is not connected to anything.
lastseen.first:
- M| 4:17 stays 4:17 on every ticket from now on. This is not a policy. It is a time.
ficus5:
- W| 4:17, near the third ficus. That is the fifth time. It is a pattern. It is also a ficus.
ficus10:
- W| That is ten. The ficus has asked to be informed. The ficus is a ficus.
ficus15:
- W| The ficus is now the fifth ficus of three. We have discussed it. The ficus has not.
ficus20:
- W| The ficus is also lost. It was found in a different building, standing near its own spot.
swatch (T3; one per colour):
- W| Damp. Yes. Damp is a colour in this office. It sits between taupe and apologetic.
- W| Sort Of. A bold choice. Sort Of is the colour of most decisions made here.
- W| Thursday. Rare. I have only ever lost one Thursday and it was mine.
- W| Beige-ish. The -ish is doing a lot of the work. We have given the -ish its own desk.
- W| Loud. Written down in capitals so that it can be heard from the back.
- W| Technically. Technically is a colour if you are technically a colour. It has been noted.

### 16.P fine print (clauses, in this exact order; extras repeat in a bag after clause 9)
1. This ticket is not the item. This ticket is the item.
2. Lost items may not be un-lost on Tuesdays.
3. The holder may not lose the ticket. If lost, see clause 1.
4. The Department is not responsible for the Department.
5. Clause 4 has been lost. Please describe Clause 4.
6. Clause 6 is Clause 1, but warmer.
7. Sandra has read this and nodded, which is a signature.
8. If you are reading this you have found something. Please return it.
9. There is no Clause 9. There is a gap where Clause 9 would be. The gap is kept.
extras (after 9, bag):
- Clause 10 is the same as Clause 9, with more gap.
- See reverse. You are on the reverse. See obverse.
- Fine print: the print is fine. The ticket is also fine. Nobody has checked the other one.
clause.cite (Management, every 3rd flip):
- M| Clause 1 has been cited. Clause 1 is pleased to be cited.
- M| Kept under Clause 6, warmly.
- M| Clause 9 is, as ever, not here. Management has checked.

### 16.R2 return, redeem and nesting (Wendell unless marked)
return.yes1: - Is this yours? It was handed in. By you. Last Thursday, 4:17 PM, near the third ficus.
return.yes2: - It is your $THING. You were lost, so you gave it up. It was kept, so it is found. We cannot reconcile these. The shelf can.
return.describe: - Claim it by describing it. Describe it fully. You have described it fully before. That is the problem.
return.claimed: - You have claimed your $THING. You have been issued a ticket for your $THING. It is your $THING (ticket) (ticket). This is the correct depth.
return.no: - Not yours. Noted. It goes back, kept again, with additional forever.
return.placeholder: S| Describe it fully. You have described it fully before.
nest.1: - A ticket for the ticket. The ticket for the ticket is, I regret to say, the ticket.
nest.2: - A ticket for the ticket for the ticket. We are ahead of schedule.
nest.4: - It is smaller. Everything is smaller. I did not authorize the scale.
nest.5: - At this depth the ticket is the idea of a ticket. The idea is on the shelf. The shelf is in the idea.
nest.7: - You have claimed a ticket for a ticket seven times. Seven and a half would require the missing half.
nest.9: - We are past the end of the numbering. The numbering has been informed. It has taken it well.
sandra.small (Management): - Sandra has flagged this ticket for being small.
sandra.flag (Management): - Sandra has flagged the flag.
redeem (bag):
- W| Redeemed. We have returned your $THING in the form in which it was lost: a ticket.
- W| The ticket has been redeemed for a ticket for the ticket. We apologize for the continuity.
- W| Please present the ticket to claim your ticket's ticket. I have seen this before. I have seen it in a mirror.
redeem.none:
- W| Redeem what? We have printed a ticket for The Intention To Redeem. It is a normal ticket. It may be given up.
S| Stamp text on a redeemed ticket: CLAIMED

### 16.C the Line (customers, T2)
line.ask (templates; `$THING` is one of your earlier losses):
- C| Has anyone found a $THING? Grey. Ordinary.
- C| I am looking for a $THING. I would know it if I saw it. I would also know it if I did not.
- C| I think I lost a $THING here. It would be the one you lost earlier. I had the same one.
line.canned (no history, bag):
- C| I am looking for an umbrella, grey, ordinary. I have been looking since the rain. It is a different rain.
- C| I have lost the end of the sentence. I begin the sentence again. I do not find it. I am much more fluent.
- C| Excuse me. Has a train of thought come in? It was going somewhere.
line.object:
- W| Tickets are not the item.
line.objectReply:
- C| Thank you for my item.
- W| That is not what I said.
line.thanks (bag):
- C| Thank you. It is exactly what I lost. It is a ticket. It is exactly what I lost.
- C| Splendid. I will keep it forever. I have been told that is a clause.
- C| That is the first time I have been given something and told what it is. I am delighted.
line.sigh (Not today, bag):
- C| Of course. I will go to the back. The back is where I live.
- C| I understand. I will return. I have been returning for some time.
line.leave:
- S| A customer sighs and goes to the back of a line that has only a back.
Hobbs (T3):
hobbs.ask: - C| I would like to report a loss. I have lost a $THING. They sound like yours.
hobbs.ticket: - W| We have your $THING. It is kept. Please describe it. Perfect. Here is a ticket. The ticket is also your $THING.
Gerald (T2):
gerald.ask: - G| I lost a hat here. I did not wear it. I would like it back. It was very much mine.
gerald.reply: - W| It is in the Permanent Collection. It is kept forever.
gerald.thanks: - G| Splendid. That is the first time I have been told where it is.

### 16.A the Audit (T2)
audit.start: - M| Audit in progress. Sandra's inspectors have arrived. They have clipboards. The clipboards have clipboards.
audit.figures (shown in the panel, with jittering numbers; the five labels): S| Items on shelf: $A / Items lost: $A / Items found: 0 / Items kept: $A / Items not lost: -7 1/2
audit.disagree: - M| The figures disagree with each other. They have agreed to disagree. Sandra has not agreed.
audit.prophecy: - M| The ticket machine has printed a ticket for something you have not lost yet. $ITEM, 8:45 PM, ready for collection.
audit.smug: - W| As predicted. Please do not look at me like that. It was printed before you had it. That is not my doing. That is the machine's.
audit.over: - M| The audit is over. The figures have been filed. They are lost.
audit.dispute: S| Dispute the figures

### 16.PB the pull-back (T2)
pullback.lost: - M| The Lost & Found has been lost. A notice has been posted on the counter. The notice has also been lost, and is inside the counter.
pullback.half: - M| A half has been found. The other half is looking for it. Lost Today has increased by 7 1/2. This is not a mistake. It is a rounding.
pullback.is: - W| Is this yours?
pullback.whole: - M| Is this yours? It is. It is the whole room. Please keep it on your person.
pullback.after: - W| That was not a camera move. That was a rumor. It has been withdrawn.

### 16.PK pockets (T2)
pocket.arrive (caption): S| Your pockets now hold: $LABEL.
pocket.intro: - M| Your pockets have filled with things you have. You are encouraged to be rid of them.
pocket.ask: - W| Please surrender an item. It will be Kept. Kept is a promise. Kept is also a shelf.
pocket.lint: - W| Surrendered: pocket lint. Kept, forever. We have named it Gordon. Gordon has a tag.
pocket.meh: - W| Surrendered: one (1) Meh. Kept, forever. It has been given a small velvet cushion and a number.
pocket.rcpt: - W| Surrendered: a Receipt For The Receipt. Kept, forever. The receipt receipt is in the drawer with the first one. They are friends.
pocket.half: - W| Surrendered: half a thought. Kept, forever. The other half has been sent a letter.
pocket.pencil: - W| Surrendered: your pencil. Kept, forever. You may keep drawing. It will be on loan, from itself.
pocket.name: - W| Surrendered: your name. It is on the shelf, in a small frame. We will call you "You". It is warmer than it sounds.
lot0.say: - W| You have surrendered everything. That makes you Lost Property. Lot 0: One Valued Employee, name on loan, unclaimed. Please sit on the shelf.
lot0.next: - W| You were on the shelf. You are free to go. Please note you are Kept.
S| Pocket slot labels: Pocket Lint / 1 Meh / A Receipt For The Receipt / Half A Thought / Your Pencil / Your Name (on loan)
S| Pad label after the pencil: Borrowed pencil (on loan, from itself)

### 16.H the heavy thing (T2; no sfx, no Management during the hold)
heavy.1: - W| I lost a ticket once. 1974. A coat, a cloakroom, a Thursday.
heavy.2: - W| I did not get the coat back. I got this job. It was in the same building.
heavy.3: - W| People think this place is about finding. It is about somewhere for lost things to be kept, so they are not lost somewhere worse.
heavy.again: - W| I can start again. I am good at starting again.
S| Tag card during the hold: Nothing (pristine). It weighs what it weighs.

### 16.ST the stool (T2)
stool.start: - W| You are behind the counter now. There is no ceremony. There is a stool. The stool is yours.
stool.cust (customer request, then Wendell's coaching line; in this order for the first 4, then random from the rest):
1. C| I lost the plot. | W| Ticket. It is the plot. Hand it over slowly. Do not spoil it.
2. C| I lost a bus. | W| Ticket. It is the bus. On the ticket it is number 7 1/2.
3. C| I lost my train of thought. | W| Ticket. It left from Platform 4 1/2. We are not looking into it.
4. C| I lost the keys to the car I lost. | W| Ticket. Ticket. It is a very small queue of keys.
5. C| I lost my temper. | W| Ticket. It is the temper. It has been calm since.
6. C| I lost my place in line. | W| Ticket. It is the place. It is slightly behind.
stool.thanks (bag): - C| Thank you. It is warm. It was warm when I lost it. | - C| I will keep it forever, which I understand is a clause.
stool.first: - C| Oh. Oh, thank you. I have been looking for this since the Spring Reorganization.
stool.georgia: - W| Georgia. A serious ticket. It has gravity. It will outlive us.
stool.mono: - W| Monospace. A ticket that does its taxes.
stool.cursive: - W| Cursive. A ticket with feelings. It has written you a note on the back.
stool.end: - W| That is enough. I will have the stool back. It remembers me. Thank you for holding it. The seat is warm, which is the work.
S| Stool clock label: 4:17 (it has been 4:17 since the stool)
S| Button labels: Ticket (Georgia) / Ticket (monospace) / Ticket (cursive)

### 16.BL blind drawing (T2)
blind.start: - W| Lot 7 1/2 cannot be described by looking. Please draw it blind. We will know if you peek. We will not do anything about it.
blind.cloth: - M| The cloth has been cinched. The pad is behind the curtain. The pencil is not.
blind.peek: - W| I saw that. I did not see anything. It is a skill.
blind.reveal: - W| Close. It is your first drawing. It was handed in at 0:03 by someone who looked like you, but better rested.
blind.revealNone: - W| It is your first drawing. You did not draw. It was an excellent likeness.
blind.compare: - W| The line between them wobbles. That is the distance. It is not far. It is not near either.
blind.claim: - W| Lot 7 1/2 cannot be claimed. It can only be Kept. It has been Kept since before you came in. You are late to it.
blind.done: - M| Lot 7 1/2 has been described. It was described by the one person who should not have. Congratulations.

### 16.IS idle, night, spam, secrets
idle.45: - M| Wendell has fallen asleep on the bell. The bell is not ringing. The bell is being very brave.
idle.90: - M| The lost things have come down from the shelf. They are queueing at the counter. Each holds a small ticket. Each reads: Lost: you.
idle.claimed: - M| Someone has claimed you. It was you. The fee is 0 Meh. The fee was lost, and has been kept.
idle.found: - M| Found: you. Condition: here. Kept: nobody has said.
S| Night ticket front: Lost: you
S| Night ticket flipped: Found: you. Condition: here. Kept: nobody has said.
spam.fee: - M| Rapid reports are not permitted. Sandra has authorized a fee of 0.5 Meh, which is 0.5 Meh we found down the back of the chair.
spam.more: - W| Overflow. A bin labelled MORE has been brought. It takes the next three without comment. It will print you a receipt for More (3).
S| MORE receipt: Received: MORE (3). Not itemized. Kept.
spam.back: - M| Window 7 1/2 will be Back in 15 minutes. (15 seconds.) The difference is a rounding. The sign has been updated.
spam.stamp: - W| Back. The counter is open. I was in the back. The back is large and has no walls.
smile.face: - W| That is my face. I lost it in 1998. It was never opened. It is a ticket now. It is in my pocket. Thank you.
paradox.1: - W| You have reported your ticket lost. You are holding your ticket. These are not two things. They are one thing in a bad mood.
paradox.3: - W| That is not a ticket. That is a position.
coin.found: - M| Found today: 1. One (1) Meh, on the floor. Please keep it where it can be found.
coin.fee: - W| That is a handling fee. 1 Meh. Please do not take it personally; it was found personally.
coin.recount: - M| Recount: it was a fee. Found today: 0.
word.found: - W| You cannot lose a found. Please lose something first. The Department has renamed itself Lost & Lost. It suits it.
word.wendell: - W| You have lost Wendell. A ticket has been issued. He is in it. Back in 7 1/2 minutes, says the sign, which is wrong by seven.
word.wendellBack: - W| Back. I was in the ticket. It is roomier than it looks.
word.everything: - W| Everything. A bold choice. It has been put in the ticket. It is a very big ticket. It fits in your hand. That is the ticket's whole trick.
word.refill: - W| Kept (again). It all came back. It was a very short trip.
word.nothing3: - W| Nothing again. This ticket is blank on both sides. It is the fullest ticket in the building.
leaf.found: - M| Found: one (1) leaf. Found by gravity. Gravity has been thanked.
leaf.recount: - M| Recount: a leaf is a leaf, not an item. Counted as foliage.
dennis (clicks 1-6, bag):
- M| Dennis (Plant) has been consulted. Dennis (Plant) did not respond. This is the most professional answer the counter has ever had.
- M| Dennis (Plant) has been spoken to. Dennis (Plant) is thinking about it.
- M| Dennis (Plant) is thriving. He has been told he is the only competent employee. He has taken it in his stride.
hundred: - M| You have filed 100 reports. Wendell has run out of ticket paper and will issue the next ticket on the back of a ticket. It is the same ticket, from the other side.
firstthing: - W| You have been looking for this since before you knew.
resize.narrow: - M| The counter is narrow today. Wendell has been asked to lean. He is leaning with commitment.
resize.wide: - W| The other items are back. They did not say where they were.
S| Board title text: FOUND TODAY 0: confirmed by Sandra. See Clause 9(a).
S| Board half (pull-back): FOUND TODAY 1/2
S| Footer: Kept Items: $COUNT. Nothing in the building has ever left it.

### 16.E ending (see 17 for the order)
keeping.start: - M| Roll call of the Permanent Shelf. Each item will be read aloud. None will be returned.
keeping.ladder: - W| I shall now read the shelf. Please stand. Or sit. The shelf does not mind.
keeping.item (`$LABEL` per entry; the `$LABEL` is the catalogue label, e.g. Gordon, "your pencil"): - W| Kept: $LABEL.
keeping.more: - W| And $COUNT more, all Kept. Kept is a very long list when read slowly.
keeping.end: - W| That is everything. It is not a lot. It is not a little. It is the exact amount.
keeping.skip: S| Skip the roll call
final.ask: - W| I lost something once. At 4:17. I do not remember what. The ficus was a nice colour. Will you draw it for me?
final.after: - W| It is a ticket. It is the thing. Thank you. I will keep it. I keep everything. It is the job, and also the problem.
final.pocket: - W| It is in my pocket. It is warm. Let us not discuss it.
final.sign: S| FOUND: A DIFFERENT PLACE, SLIGHTLY BEHIND, WITH YOU IN IT
final.certificate: S| CERTIFICATE OF EVERYTHING THAT REMAINS / Awarded to $NAME / For $COUNT things kept, 0 things found, and one clerk, slightly less lost. / Signed: S.
final.board: - M| Returned to Owner: 0 of 7 1/2. Management is proud of the consistency.
final.congrats: - M| Congratulations. You have reached the end of Lost & Found. Nothing has been found. The counter is open.
final.next: - W| Next.
final.ask2: - W| What have you lost?
S| `$NAME` in the certificate is `api.player.name` normally; `You` if the name was surrendered.
S| The bell rings once by itself (sfx `bell`) just before `final.next`.

---------------------------------------------------------------------------------------------------

## 17. THE ENDING THAT IS NOT AN ENDING (beat 11, about 8:30-10:00)

Triggered by `maybeBeat()` once `S.reports >= th(20)` and the blind beat is done (or the blind beat was skipped by thresholds; never skip the order: stool -> blind -> keeping).

1. **The Roll Call (`keeping`).** Management `keeping.start`, Wendell climbs the ladder (`climb`), the Permanent Shelf strip is highlighted, `keeping.ladder`. He reads **each kept item** (newest first, from `S.kept`, up to 20 entries; if there are more: `keeping.more` with `$COUNT`), each as `keeping.item` with the entry's label, one per 1.2s (selftest 0.1s), the shelf thumbnail and tag of the entry being read pulse (`scale 1.15` for the item, tag highlighted). If the shelf has fewer than 3 entries, he reads the scenery items instead (`Kept: $LABEL` for 3 random scenery tags). **Skippable only by Enter or the `Skip the roll call` button, and the button appears only after the 8th item** (immediately under selftest after the 2nd). Award 5, `rollcalls++`. Watchdog default: finish the roll call.
2. **The lamp dips** (a dim overlay), and Wendell says `final.ask` quietly. `setPhase('final', finalDefault)`; the pad opens with a **blank sheet at full size**, `S.mode='wendell'`, the button reads `HAND IT OVER`. Whatever you draw (even nothing) he looks at "for a long time" (a 3s pause, selftest 0.3s), then issues **himself** a ticket (printed on the printer, no search), says `final.after` (the thumbnail of your drawing on his ticket). He pins it in his breast pocket (`final.pocket`; the ticket moves to a small pocket `div` on Wendell and stays there until the reset). Award 7.5 (`api.award(7.5,'a drawing for a clerk')`), `api.confetti()`, sfx `tada`.
3. **The sign flips** for one second to `FOUND: A DIFFERENT PLACE, SLIGHTLY BEHIND, WITH YOU IN IT` (`final.sign`), then back to `LOST & FOUND (MOSTLY LOST)`.
4. **The Certificate of Everything That Remains prints** (an overlay card with `final.certificate`, Sandra signs it `S.`); a `Close` button dismisses it (auto-dismiss at 12s; selftest 1s).
5. **The board does not change.** `RETURNED TO OWNER: 0 of 7 1/2` is untouched; Management `final.board`.
6. Management `final.congrats` (priority 2, mood `proud`), `api.achieve('lost-and-found.keeping')`.
7. Wendell goes back to sleep (`asleep`), the sign flips back, **the bell rings once by itself**, Wendell says `final.next` then (after 2s) `final.ask2`, the pad resets to the normal report form, `S.epilogue=true`, `S.mode='report'`, `loops++` (saved), stat `loops++`. **The shelf is fuller than it was** (it keeps everything, plus the entry for Wendell's drawing if you drew one: the item `A thing Wendell lost at 4:17`, `k:'tk'`, saved). Items present at the end of this session are stamped `KEPT FOREVER (CARRIED OVER)` from now on. **Next session** (or next loop) Wendell's greeting uses the `again` list by `loops` (capped at index 3), and the doodles he mentions first are yours: `again[3]`.
8. The game continues exactly as before. It remains **impossible to win**: no item is ever returned, the 0 never moves, and the only thing that grows is the shelf. Optional (T3) closing aside after the very first ending: Management says, flatly, `final.board`'s companion: "There is no way to win. This was a completely fair outcome for a lost-and-found."

---------------------------------------------------------------------------------------------------

## 18. RISKS: THE 5 MOST LIKELY IMPLEMENTATION BUGS

1. **Stuck or ghost strokes and pointer-capture failures.** Synthetic pointer events have no active pointer (`setPointerCapture` throws `NotFoundError`), `pointerup` can land outside the canvas, phase changes can happen mid-stroke (search starts, blind begins, the night shift fires), and keyboard Space can leave the pen "down" forever. Result: strokes that never end, negative or NaN points, huge arrays, a pad that keeps drawing. Mitigation: wrap capture calls in try/catch; handle `pointerup`, `pointercancel`, `lostpointercapture` and `blur`; make `endStroke()` idempotent and call it from `setPhase`; clamp every point to the tether circle and to 0..280/0..200; run all coordinates through `num()`; enforce the 60-stroke and 4000-point caps in one function used by pointer, keyboard and stamps.
2. **Stale async callbacks and phase races.** The search, rummage, print, audit, pull-back, roll call, release ring and every chained timeout all outlive the phase that started them; the fuzz harness destroys and remounts mid-run and clicks everything. Result: a ticket printing after the player left, double beats, the roll call continuing in the epilogue, errors after destroy. Mitigation: ONE `after()` helper with the `runId` check, `S.timers` cleared in `setPhase`, `api.destroyed` check in the rAF loop, a `beatBusy` guard so `maybeBeat()` never starts a second modal beat, and every watchdog `onIdle` that resolves a phase must itself call `setPhase('counter')` exactly once.
3. **The hold-versus-tap duality of LET GO (and surrender).** Pointer hold, keyboard hold, a tap-to-auto-release, a second tap to cancel, `e.repeat` keydowns, `click` events without `pointerdown`, `pointerup` outside the button, and the fuzz's 25-70 click bursts all hit the same button. Result: double completions (two entries for one ticket), a ring that never fills or never clears, a ticket kept while a customer is being given it. Mitigation: a single `S.rel` object with `dead` flag and one `startRelease/cancelRelease/completeRelease` trio; ignore `e.repeat`; the 250ms tap rule; completion removes the target from the tray FIRST and re-checks it exists; cancel on blur, Esc, hide and phase change; the 14-clicks-in-3s hammer lockout.
4. **Text, token and number leaks into the UI or the save.** Player-typed text containing `%`, `{`, `$`, or spaces only; `fill()` leaving `$THING`; `thing` empty producing "Your  (ticket)"; `Math` results that become `NaN` (`0.88^depth`, `padW`, `half()`, ordinals, `th()` with a non-integer), values interpolated into `style`; `api.save.set` silently refusing a write because of one `NaN` or `undefined`, so kept items vanish between sessions; very long labels; `undefined` from `kept[idx]` when the array shrank. The fuzz harness FAILS on `NaN`, `undefined`, `null` and `[object Object]`. Mitigation: `clean()` on every input, `fill()` strips leftovers, every number through `num()`, an `emptyThing()` fallback ("nothing"), `persist()` builds the blob from scratch with only ints and short strings and checks `api.save.set`'s boolean, and a `selftest` run with the text input hit by random strings.
5. **Unbounded growth, performance and the 1800-line budget.** Per-frame canvas redraws, tags `<li>` and tray chips that never get trimmed, night items and bubbles that accumulate, the shelf canvas re-rendering 60 entries per mousemove, the slot grid rebuilt on every lamp move, `rAF` loops that never stop, and a file that balloons past 1800 lines (the lint error). Mitigation: DOM caps (tray 6, prev 20, tags 40, slots 15, motes 10, night items 6, bubbles 2, tickets 3, customers 1), the shelf canvas is event-driven, lamp updates only change CSS variables and class names on 15 cached nodes, the pad redraws only when strokes or the pen change, one rAF loop, and the tier plan (section 3) drives what gets cut first; check `wc -l` after each tier.

**Also watch:** (a) keyboard reachability when panels are swapped (use `hidden`, never remove the focused element; move focus to the primary button of the new panel after a phase change only if focus was inside the module); (b) the Night Shift overlay must be `pointer-events:none` and must not swallow Esc; (c) idle thresholds under selftest (`K=0.3`) and the 12s first-run print must not both fire in the same moment; (d) `matchMedia` and `root.clientWidth` reads can fail or return 0 in headless: default to the wide layout; (e) the `th()` speed-up must never skip a beat's prerequisite (e.g. Return needs a kept item: if there is none, do nothing and retry after the next ticket); (f) `api.say` priority-0 coalescing means a Wendell reaction can be dropped under spam: the caption and the bubble must still update so nothing looks broken.
