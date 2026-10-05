# THE BUTTON (id: `the-button`, category: `game`) - FINAL DESIGN BRIEF

Tagline: **"Do not press. A sign has been laminated about it."**
Icon: 🔴 (fallback 🛑). Tags: `['clicker','toy','bureaucracy']`. `unlockCost: 0`. File: `games/the-button.js` (single file, <= 1800 lines, vanilla JS, classic script, IIFE, `'use strict'`).

A builder who reads SPEC.md, VOICE.md and this file has everything needed. Where this brief says "verbatim", copy the string exactly (replace the `%TOKENS%` first; never pass a raw `%X%` to the UI).

---------------------------------------------------------------------------------------------------

## 1. CONCEPT

One big red button on a plinth. One laminated sign: DO NOT PRESS. Management sincerely asks you not to press it. Every press does something slightly different, from **Nothing (No. N)** to a spotlit dramatic reading of the Terms of Service. Over about ten minutes the button turns into a coworker with a grievance file, a tender secret and a very specific opinion about press number 12. Nobody ever finds out what the button does. It does 100+ different things and every one of them is slightly beside the point. It cannot be won. At press 260 it is **retired with full honours** in a ceremony that is not an ending: a new identical button appears, and presses **you**.

Core joke engine (in order of importance):
1. **Nothing, getting more official every time** (Running Gag A: the numbered, footnoted Nothing).
2. **The sign amends itself** and gets more bureaucratic, leans, and collects sticky notes (Running Gag B).
3. **The Incident at Press 12**: one light flickers; the button's reaction is the whole joke (Running Gag C).
4. **Terms of Service clause counter** that always skips Clause 7 1/2 (Running Gag D), paid off at the ceremony with "Be kind to the button."
5. **Sandra's flags** that get more specific, ending in "Sandra has flagged Sandra." (Running Gag E).
6. A toy with ONE input and 100+ outputs, where the toy has feelings about the input.

### What was cut from the pitches (do not build these)
Sign flipping (front/back/fine print); Dignity progress bar; 12-in-3-seconds spam variant (we use ONE spam rule); "wrong order" small-button secret; tab-key `H` hug (conflicts with typing "hello"; hugs are a typed word + a T4 prop button); the Processing-Time delay on every press (kept only as a one-off Ledger outcome); the 20-second "fine, press it" relent after spam; Roman-numeral-for-everything (kept as one Tiny Visual); Konami / boss key flows; 40-note sticky list (24 written notes is enough).

---------------------------------------------------------------------------------------------------

## 2. STAGE LAYOUT AND DOM

Everything inside `root`. Root gets classes `m-the-button-root m-the-button-t<TIER>` (+ `m-the-button-rm` if reduced motion). Wrap `matchMedia` in try/catch. Use `clamp()`/`flex-wrap`, never fixed widths, so 360px works (do NOT rely on viewport `@media`; root width may differ from window width).

Top to bottom:

1. **Header row** (flex, wraps):
   - **Odometer plaque** `PRESSES:` + digit reels (5 cells, each a vertical strip 0-9 moved with `transform: translateY(-d em)`; clamp display to 99999). After a ceremony a permanent stamped parenthetical `(260)` sits beside it (cumulative of prior seasons).
   - Chip `Nothings: N`.
   - Chip `Approved Presses: 0` (always 0; see rare event R1).
   - **Mood faces** row labelled `Feelings (Unofficial)`: five emoji faces 😐🙂😠😔😌 as real `<button>`s that do nothing. The selected face is ALWAYS 😐 forever. Clicking one: Management says one of `FEELINGS_CLICK` (section 8H).
2. **Stage** (position:relative; overflow:hidden; border 3px ink; radius; sticker shadow). Contents:
   - Spotlight (CSS radial-gradient overlay, `pointer-events:none`).
   - Perspective checkerboard floor (CSS: `repeating-conic-gradient` on a div with `transform: perspective(500px) rotateX(60deg)`; pointer-events none).
   - **Sign** (left): wooden post + rotated board (see 2.1).
   - **Plinth** (centre): three skewed divs (top face mint `#9ADCC0`, side faces lilac `#B8A6E8`); a real clickable div `m-the-button-plinth` (not focusable). The **Button** sits on top.
   - **Complaints Box** (right): decorative drawing, a real `<button>` that says `Received.` variants when clicked.
   - Wear layer: absolutely positioned emoji items (see 6.8).
   - Speech bubble (cartoon bubble with tail pointing at the button): `aria-live="polite"` is on the CAPTION STRIP not the bubble (avoid double-announcing), bubble is `aria-hidden="true"`.
   - Overlay slots (created lazily, each reused, never stacked): `dialog` card (fake OS error), `question` card, `curtains` (2 panels), `jackpot` text, `picket` sign, `micro` button, `security` guard, `spotlight-reading`.
3. **Caption strip** (laminated-notice style with a clip; `role="status" aria-live="polite"`): shows the latest Management line or stage direction (italics for stage directions).
4. **Ticker** `Last 6 things the button said`: `<ol>` capped at exactly 6 `<li>`; newest on top. Silence events log as `[silence]`.
5. **Sandra flag bar** (footer line, hidden until T2): shows the current flag text.
6. Small footer buttons that exist only conditionally: `Skip the tribute (Not Recommended)` (ceremony only), `🤗 Hug (Unofficial)` (T4+), `Sorry` link (see resize secret), the **Small Button** (T3+).

### 2.1 The Sign (important)
- Sign is `<div class="m-the-button-sign" role="group" aria-label="Sign">`. Its text is rendered as **individual `<button class="m-the-button-word">` tokens**, one per word, so single words are clickable and keyboard focusable. Total token count stays under 12.
- Board: cream `#FFFDF5`, thick ink border, RED stencil text `#C8342B` (system bold uppercase, letter-spacing), laminated sheen (diagonal white linear-gradient highlight), hazard-stripe bottom edge (`repeating-linear-gradient(-45deg, ink 0 10px, mustard 10px 20px)`). Rotated `-3deg`; each stage adds `+0.8deg` of lean up to `+7deg` total (`--lean`).
- **Sign stages** (by registered press count in the current season; use `>=`; see risk 4). Base text B = `DO NOT PRESS` in season 1; `DO NOT NOT PRESS` in season 2+. `suffix` appends, `full` replaces entirely:

| at press | text |
|---|---|
| 0 | B |
| 6 | B + ` (AGAIN)` |
| 15 | `PLEASE ` + B |
| 30 | B with `.` and ` I MEAN IT.` appended: `DO NOT PRESS. I MEAN IT.` |
| 45 | B + ` (PER SANDRA)` |
| 60 | B + ` (SEE ATTACHED)` |
| 90 | B + ` (EXCEPT AS NOTED)` |
| 120 | B + ` (SEE ALSO: THE BUTTON)` |
| 160 | full: `DO NOT STOP PRESSING (BUTTON)` |
| 175 | full: `PLEASE PRESS` |
| 180 | (T5 reset) hard-reset to B |

  The stage table is therefore `0,6,15,30,45,60,90,120,160,175,180`. At press 180 (T5 reset) the sign is reset to B and keeps ONE sticky note `we are aware`. On each stage change: Management says `Per policy, the sign has been updated to %SIGN%.` (priority 1) and the board plays a "pen wipe" (clip-path animation 400ms; instant under reduced motion).
- **Clicking a word** (stat `the-button.sign_clicks`, no Meh):
  - `NOT` -> **secret: The Missing Word** (section 11.3). If a second NOT remains after removal (season 2 sign), the Button says `Double negative. We are fine. We are fine.` and the secret does not fire.
  - `PRESS` -> the button flinches (CSS shake class 300ms, disabled by reduced motion) and Button says `That word is not allowed in here. Please keep it on the sign.`
  - `DO` -> Button says `The word DO has shrugged. The word DO does that.`
  - `PLEASE` -> Button says `PLEASE has been clicked. It says you are welcome.`
  - any other token -> Management says `That word has no comment.`
- Sign **unionizes** when cumulative sticky notes placed reaches 25 (once ever): add class `union` (little red armband ribbon via CSS) and Management says `The sign has reached 25 notes and has unionized. It has requested a meeting with the button. The button has requested a meeting about the meeting.`
- Sticky notes: absolutely positioned on the board area, tints cycle butter `#FFE98A`, pink `#FFB8C9`, sky `#A8DCFF`, lime `#CDEE8B`, peach `#FFC99E`; random rotation +/-6deg from `api.rand`; folded corner via gradient; italic system font. **At most 8 notes in DOM** (older ones fade 400ms then are removed). Notes counter is cumulative in save.

### 2.2 The Button
- A real `<button class="m-the-button-btn" aria-label="The Button. Do not press.">`. Size `clamp(150px, 42vw, 270px)` square. Inside: `.m-the-button-rim` (chrome ring: mustard `#F2B632` border + conic-gradient) and `.m-the-button-dome` (coral-red `#E8433F`, highlight `#FF7A6E`, layered radial gradients and inset box-shadows = glossy dome) as two layers. Drop shadow collapses when `.is-down`; `.is-down` translates the whole button 8px down.
- Hold lean: while held, `--lean` squeezes the dome scale slowly (0.99 -> 0.94 over 4s via CSS transition).
- Hit zones are computed **geometrically** (do not add separate elements for hit testing): `r = distance(pointer, centre) / radius`. `r <= 0.74` = dome (normal), `0.74 < r <= 1.0` = rim, `r > 1.0` = outside the circle (counts as aborted if it was a pointerdown on the button, see 3.1).
- Visible focus ring that looks like a hazard stripe: `outline: 5px dashed #2B2118; outline-offset: 6px; box-shadow: 0 0 0 5px #F2B632`.
- **Face** (CSS only, nothing on the button before T1): T0 none; T1 two white eye discs with dark pupils that track the pointer (pupil offset via `--ex/--ey`, clamped to 6px, updated in `api.requestAnimationFrame` throttled, `pointermove` handler listens on root); eyelids blink every 4-7s via `api.setTimeout` chain (squint class on a Firm Press); T2 add eyebrows; T3 add tiny CSS glasses; T4 eyes go soft with a gleam (small white dot); T5 face removed (blank dome). Mouth is a border-radius arc whose rotation encodes mood (smile / flat / wobbly / 'o').
- Emoji props on the button: hat `🎩` (on top), sweat `💧`, smoke `💨`, sunglasses `🕶️`, mustache `🥸` (rendered as the mustache joke: just the emoji beneath the eyes, small).

### 2.3 Small Button (T3+, press 70)
A small real `<button class="m-the-button-small">` labelled `also do not press`, 40% size, sits below the plinth. Personality: young, reckless, enthusiastic. Pressing it does NOT count as a main press (no odometer change); it awards 0.1 Meh and plays the next exchange from `SMALL_EXCHANGES` (section 8L). Removed at T5 entry and at the ceremony. Persisted by tier only.

### 2.4 Odometer details
Approved stamp: at T3 (press 60) a small clip-on `APPROVED` stamp (slightly rotated, red outlined box) is applied to one random digit cell. Management line at that moment is in 8J.

---------------------------------------------------------------------------------------------------

## 3. CONTROLS (exact)

All input handled by managed listeners (`api.on`). The Button itself is a real `<button>`.

### 3.1 Mouse and touch (pointer events)
- `pointerdown` on the button: `e.preventDefault()` is NOT called (focus must still work); call `setPointerCapture` inside try/catch; add `.is-down`; `api.sfx('tick')`; start `hold = {t0: api.now(), id: pointerId, source:'pointer', consumed:false}`; start three managed timeouts: **7500ms** (Archduke Hold secret, only if still held), **10000ms** (once-per-session over-10s line), and a hover-clear. Record pointer position for zone.
- `pointerup` (on the button OR while captured): compute zone from the up position. If distance > radius (outside circle): **Aborted Press** (section 8H `ABORTED`, stat `the-button.aborted`, no count). Else register a press with `{zone, holdMs, source:'pointer', offX, offY}`.
- `pointercancel`, `lostpointercapture` without a prior up, window `blur`, and `visibilitychange->hidden` while holding: cancel the hold silently (clear hold timers, remove `.is-down`). Never leave a stuck hold (risk 2).
- `touch-action: manipulation`, `-webkit-tap-highlight-color: transparent`, `contextmenu` prevented on the button (long press on touch), `user-select:none`.
- **Click fallback**: a `click` handler on the button registers a press ONLY IF no `pointerdown`/`keydown` sequence occurred within the last 700ms (`api.now()`), so synthetic clicks and assistive-tech clicks still work and nothing is double counted (risk 1).
- Pointer-down on the **plinth/stage floor** (not button, sign, box): "That was the plinth" family (not a registered press; stat `the-button.plinth`, +0 Meh). A plinth press cooldown of 250ms avoids spam.
- Hover over the button for >= 4s without pressing (`pointerenter` -> managed timeout 4000; cleared on leave/down): one `HOVER` line, 15s cooldown, button does a 250ms CSS flinch.

### 3.2 Keyboard
- Tab order: Sign words -> The Button -> Small Button (if present) -> Complaints Box -> Hug prop (if present) -> Feelings faces. Real `<button>`s throughout.
- On the Button: `keydown` of Space or Enter (ignore `e.repeat`, and ignore if a hold is already active): `preventDefault()`, add `.is-down`, start hold with `source:'key'`. `keyup` of Space or Enter: `preventDefault()` (prevents the native click on Space-up), register a press with `zone:'dome'`, `holdMs`. **Enter and Space behave identically** (both can be held; hold-length classes apply).
- Holding via key repeat: `e.repeat === true` events are ignored but counted into a local `gripping` counter used only by one META line (section 8H).
- `Escape` (while focus inside root): does nothing mechanically; Button says `ESC_LINES[0]` first time, then rotating; **3rd Escape in a session** opens the fake system dialog `ESC_DIALOG` with two buttons `Stay` and `Stay (Alternate)` (both close it and say `ESC_AFTER`). If a hold is active, Escape cancels it with `Hold cancelled. The button felt that.`
- Focusing the button by Tab for the first time ever in a session: Button says `Ah. Keyboard. Considerate.`
- **Typed-word secrets**: a 12-character rolling buffer of the last lowercase `a-z0-9` characters typed via `keydown` anywhere inside the module (listen on `document` through `api.on`; ignore keys with modifiers and `e.key.length !== 1`; ignore when `e.target` is an `input/textarea`). After each key test `buf.endsWith(word)`. Words (each has a 4s cooldown): `please sorry why hello sandra twelve 12 tuesday hug`. Responses are in 8M.

### 3.3 Hold length classes (evaluated on release; `holdMs`)
| class | range | rule |
|---|---|---|
| Press | < 400 | normal outcome engine |
| Firm Press | 400-1499 | squint animation; 35% chance the outcome is a `FIRM` line, else normal |
| Lingering Press | 1500-3999 | always the `LINGERING` family; **+0.5 Meh**; stat `the-button.holds` |
| An Occurrence | >= 4000 | always an `OCCURRENCE` line (button asks to finish its sentence); stat holds; +0.5 Meh |
| Archduke (secret) | reaches 7500 while STILL held | fires at the instant the timer hits (not on release); sets `hold.consumed = true`; on release the press counts (+1 press, odometer) but produces no further outcome |
| Over 10s | reaches 10000 while held | once per session: `HOLD10` line + 0.5 Meh |

A hold ring (inline SVG circle, `stroke-dasharray`, animated via CSS transition over 10s, hidden under reduced motion) fills around the button while holding. It is unlabeled; the 7.5s event happens at 75% of the ring.

### 3.4 Window events
- **Resize**: if `root.clientWidth < 420` (check on `resize`, debounce 400ms with `api.setTimeout`): Button says a `COZY` line (button also gets class `squish` 3s). Cooldown 20s. Count resizes: after 10 resizes in the session a small real `<button>`-styled link `Sorry` appears under the plinth; click: +0.5 Meh and Button says `Apology accepted. Receipt enclosed.`, then it disappears forever.
- **Tab hidden then visible** (`visibilitychange`): returned within 20s -> `You looked away. I felt that.`; 20-60s -> `Oh, you're back. I did not move. I want that noted.`; > 60s -> `Welcome back. Everything is fine. I tidied nothing.` (use `api.now()` deltas; ignore if a ceremony is in progress).
- **7:30**: if `new Date()` (allowed ONLY for wall-clock display/comparison, inside try/catch) has hours 7 or 19 and minutes 30 at the time of a press: Button says `Half past, hm?` and a sticky note `7 1/2` initialed `-Calendar` is placed. Once per session.

---------------------------------------------------------------------------------------------------

## 4. STATE AND PERSISTENCE

Save under `api.save` key `s` (one JSON object, write debounced ~1s via `api.setTimeout`, plus on destroy). Load with try/catch and sane defaults; clamp numbers; never trust types.

```
S = { v:1, presses, nothings, season (1 = first), prior (sum of presses in finished seasons, shown as the stamped parenthetical),
      visits, wear:[ids], notes (cumulative placed), tosIdx, clauses (total read), spamPresses, selfPresses, flagIdx,
      done:{<eventId>:true}, union:bool, obeyed:bool, struck:bool, escorted:bool, jackpots, cereDone (count) }
```
Runtime-only (not saved): `mode`, `hold`, `pressTimes[]` (last 10 registered timestamps), `lastZone`, `lastPos`, `intervals[]` (last 5), `bags{}`, `lastFamily`, `lastLine`, `idleStart`, `throttleUntil`, `scaredUntil`, `jackpotChain`, `plinthAwayClicks`, `escCount`, `resizeCount`, `sessionFlags{}` (once-per-session lines).

**Modes** (single `mode` variable; one `setMode(next)` function that clears the previous mode's timers; see risk 3):
`idle` (normal) | `overwhelmed` (3s throttle) | `strike` (5s) | `escort` (about 6s) | `away` (button vanished at 5 min idle) | `scared` (Missing Word, 20s; presses allowed but outcome forced) | `ceremony` | `reading` (ToS reading spotlight, ~2s, presses still allowed and just replace it).
Presses are registered only in `idle`, `scared` and `reading`. In other modes the button still squishes but a press is "ignored": if `overwhelmed`/`strike` it increments `spamPresses`.

**Tier** = function of registered presses in the current season and elapsed play minutes:
```
pressTier: 0-9 -> T0; 10-24 -> T1; 25-59 -> T2; 60-119 -> T3; 120-179 -> T4; 180-259 -> T5; 260 -> ceremony
timeFloor: >= 3 min since mount -> at least T1; >= 6 min -> at least T2     (so a slow clicker still escalates)
tier = max(pressTier, timeFloor)  (never above T2 from time alone; never decreases within a season)
```
`tier` change fires the **tier announce** line (8B) once (use `S.done['tier'+n]`). T5 entry also runs the **Reset**: remove face, remove all non-special wear (leave sunglasses/mustache), clear sticky notes (leave exactly one `we are aware`), reset sign to base text, hide Small Button, Management says `As you were. The last several minutes have been returned to draft.`

Selftest scaling (`api.selftest === true`): idle 60s->2s, 120s->4s, 5min->7s, 20min->10s, obedience 30s->3s; strike at 6 spam presses, escort at 12; ceremony step delay 350ms; **warp**: at the 15th registered press jump presses to 118; at the 130th jump to 258 (silently recompute tier; run tier announce for the new tier, mark skipped scripted events done). This guarantees the fuzz run exercises T3/T4/T5, the Small Button, ledger and the ceremony.

---------------------------------------------------------------------------------------------------

## 5. TIMELINE (what the player experiences)

Real-time hints assume about 1 press/second; presses drive escalation, minutes set a floor.

| time / presses | tier | beat | notes |
|---|---|---|---|
| 0:00 | T0 | **The Sign.** Management: sign line (8A). No instructions. Button sweats one drop at 6s. | Button speaks at +3s (hook). |
| 0:10-0:45, press 1-9 | T0 | **Nothing Happens Beautifully.** Presses 1-3 are forced Nothing (No. 1..3). Then mostly Nothing, tiny sound, tiny visual, one sticky note. | Press 5: sign-informed line. |
| 0:45-1:30, press 10-24 | T1 | **The Button Speaks.** At 10 eyes appear, `I felt that.` Calls presses by number like a nurse. First sign amendments. Press 12 = ONE flicker, total silence. | Rim presses first say `ow`. |
| 1:30-2:30, 25-59 | T2 | **Opinions + ToS.** At press 26 ToS family arrives at high weight with spotlight readings. At 30 Sandra is first cited. Hat arrives. Debate with the sign. First Question card. Sandra flag bar appears. | Press 50: `We do not discuss press 12.` |
| 2:30-4:30, 60-119 | T3 | **Bureaucratic.** Ledger family, forms, committee, Approved stamp on odometer, sign stacks 5 amendments and leans. Small Button at 70. Press 99 is total silence. Press 100: Thank-you-for-the-silence. | Gerald cameos possible. |
| 4:30-6:00, 120-179 | T4 | **Strangely Touching.** Golden-hour palette, cushion under the button, soft eyes, idle reflective lines, Hug prop. Press 125: Press 12 revealed to be a draft. Press 150: the wall (therapist). | Sign becomes `DO NOT STOP PRESSING (BUTTON)` then `PLEASE PRESS`. |
| 6:00-8:00, 180-259 | T5 | **Back To Normal Like Nothing Happened.** Everything is reset, polite, Nothing-heavy. Sign reset with one note `we are aware`. Press 213: forgiven, but not the dates. Press 250: speech prepared. | Then it begins again slightly different. |
| press 260 | - | **THE CEREMONY (which is not an ending).** | Section 10. |
| after | T0 (Season 2) | A new button. Every line prefixed `Revised:`. Press 12 happens again (the button knows). | No third time (second time is the first time with a mustache). |

Always-on rare layers: Toaster every 15th press; Jackpot 1/60; Gerald 1/25 (cap 3 per session); Sandra flags every 7th/8th press from T2; ghost-sign every 5 minutes (section 11).

---------------------------------------------------------------------------------------------------

## 6. OUTCOME ENGINE

### 6.1 Shuffle bags
Every pool (family, and inner pools inside a family) is a **shuffle bag**: a shuffled copy of the array consumed one by one; when empty, reshuffle with `api.shuffle`, making sure the first item of the new bag differs from the last item served. A line never appears twice in a row anywhere. Family selection also never repeats the same family twice in a row (except `nothing` may repeat once, only in T0 and T5).

### 6.2 Registering a press: `registerPress({zone, holdMs, source, offX, offY})`
Order of evaluation (first match wins):
1. If `mode` not in (`idle`,`scared`,`reading`): ignored (see 3).
2. **Spam check** (section 9). If it triggers, handle and return.
3. Increment `S.presses`, `stat the-button.presses`, odometer, `api.award(0.1, 'a press')` (use 0.5 for Lingering/Occurrence, replace not add), push timestamp.
4. Update meta trackers (intervals, last position, zone counts).
5. **Scripted presses** (season 1, `>=` with `S.done` flags, see 6.5 table).
6. `mode==='scared'`: forced scared Nothing (8H `SCARED_NOTHING`).
7. `jackpotChain > 0`: the press claims the prize (6.7).
8. Zone overrides: `rim` -> 70% a `RIM` line (stat rim; unlocks `RIM_PREFER` at T2+ after 3 rim presses), else normal. 
9. Hold-class override (Lingering, Occurrence, Firm).
10. **Toaster**: every 15th press (`presses % 15 === 0`, presses >= 15): Toaster reading (8F) in place of the normal pick.
11. **Jackpot roll**: after press 20, `api.chance(1/60)`.
12. **Normal pick**: weighted family by tier (6.3), then an outcome from that family's bag.
13. After the outcome: Sandra flag cadence (T2+), Approved-flicker roll (1 in 150), sign stage check, tier check, wear arrival check, save (debounced), ceremony check.

### 6.3 Family weights by tier (T0..T5)
| family | T0 | T1 | T2 | T3 | T4 | T5 |
|---|---|---|---|---|---|---|
| NOTHING | 60 | 40 | 25 | 15 | 15 | 60 |
| TINY SOUND | 10 | 10 | 8 | 6 | 6 | 8 |
| TINY VISUAL | 10 | 10 | 8 | 6 | 6 | 10 |
| FAKE DIALOG | 0 | 5 | 6 | 6 | 3 | 3 |
| TOS READING | 0 | 0 | 22 | 12 | 6 | 0 |
| BUTTON OPINION (tiered pool) | 15 | 22 | 25 | 22 | 28 | 15 |
| STICKY NOTE | 5 | 8 | 8 | 8 | 6 | 2 |
| PHYSICAL GAG (+ wear arrivals) | 0 | 5 | 6 | 6 | 4 | 0 |
| LEDGER AND FORMS | 0 | 0 | 0 | 18 | 6 | 0 |
| CAST CAMEO | 0 | 1 | 2 | 3 | 4 | 1 |
| META COMMENTARY | 4 | 8 | 8 | 8 | 8 | 3 |
| RUMOUR | 0 | 3 | 4 | 4 | 3 | 2 |
| HOLD MUSIC | 0 | 3 | 3 | 3 | 3 | 3 |
| QUESTION CARD | 0 | 0 | 5 | 6 | 5 | 0 |

In Season 2+, 25% of NOTHING/OPINION picks are replaced by a `KNOWING` line (8D). Tier 0 also gets a 20% chance of an opinion line only after press 3.

### 6.4 Family behaviours
1. **NOTHING** - text from the Nothing generator (8C). `S.nothings++`, `stat the-button.nothings`. The Nothing number N is `S.nothings` (cumulative across seasons). Special N values override the generated text (ribbon at 14, achievement `nothing25` at 25, etc.).
2. **TINY SOUND** - one `api.sfx(name)` plus caption.
3. **TINY VISUAL** - an `action` id applied for ~1.5-7.5s through managed timeouts then reverted; actions are CSS-class toggles only (see 8E list). Reduced motion: actions that move things are skipped, the caption still plays.
4. **FAKE DIALOG** - one inline card inside the stage styled as an OS error (title bar `Notice (Mandatory)`, icon, text, single `OK` button). One at a time; auto-dismiss at 7s; OK click says one of `DIALOG_OK` and awards 0.1.
5. **TOS READING** - see 6.6.
6. **BUTTON OPINION** - speech bubble from the button (+ ticker, + `api.say` with `who:'Button'`), tier pool from 8D. T0..T5 each have their own pool. Replace `%P%` with the press count.
7. **STICKY NOTE** - place the next unseen note (8G list, shuffle bag) on the sign, Management says `A sticky note has appeared on the sign. It is initialed %INITIALS%.` ONLY for the first 3 notes; afterwards the note text is read via the caption. If note text includes the initials they are already part of the string.
8. **PHYSICAL GAG** - 50% (when a wear item is available for the tier and the cap of 7 is not reached) a **wear arrival** (6.8), else a transient gag (8I).
9. **LEDGER** - 8J. One of them (`progress99`) shows a 1.3s progress bar that stalls at 99%.
10. **CAST CAMEO** - sub-pick: Gerald (cap 3 per session; 55% weight), Dennis (once per session), Tuesday (rest). Dennis/Tuesday lines are 8F.
11. **META** - choose by conditions; first match in priority order (6.9). Fallback: any generic META line.
12. **RUMOUR** - 8K, always wrong, delivered by the Button.
13. **HOLD MUSIC** - 3s text waveform (6.10).
14. **QUESTION CARD** - two real buttons, both accepted, both wrong (8P). One card at a time, 12s expiry.
15. **JACKPOT** - 6.7.

### 6.5 Scripted presses (Season 1 only unless noted; fire exactly once; flagged in `S.done`; use `>=` and check in order; skip any whose number was jumped over by the selftest warp)
| press | what happens |
|---|---|
| 1 | forced Nothing (No. 1) with its kicker, stat first press, `api.achieve('the-button.first')` |
| 2,3 | forced Nothing (band 1) |
| 5 | Management: `5_SIGN` |
| 10 | tier T1 starts; eyes appear; Button: `I felt that.` |
| 12 | **only a light flickers, once (action `lamp`). NO text, NO api.say. Ticker logs `[silence]`.** Meh still awarded. (Season 2: same flicker, then Button says `Revised: Not again.`) |
| 26 | Management: `26_TOS` |
| 30 | first Sandra citation: a sticky note `Both policies are in effect until Thursday. -S.C.`; Management: `30_SANDRA` |
| 50 | Button: `We do not discuss press 12.` |
| 60 | tier T3 announce + Approved stamp (`60_STAMP`) |
| 70 | Small Button appears (`70_SMALL`) |
| 99 | **total silence**: no text, no say, no sound; ticker `[silence]`; Meh still awarded (Secret: The Real Ninety-Nine) |
| 100 | Button: `Thank you for the silence.` then 3s later Management: `100_TWELVE` |
| 120 | tier T4; cushion appears; `T4` announce |
| 125 | Management: `125_DRAFT`; `api.achieve('the-button.twelfth')` |
| 150 | Management: `150_WALL` |
| 180 | tier T5 + Reset (6.2 tier) |
| 213 | Button: `213_DATES` |
| 250 | Management: `250_SPEECH` |
| 260 | **Ceremony** (section 10) |

### 6.6 ToS reading (Running Gag D)
- Clauses are read in strict ascending order from the list `TOS` (8C-2), one per ToS outcome, wrapping to the top after the last one with `(second reading)` appended to the clause number. **Clause 7 1/2 is never read** during normal play; after clause 7 is read the caption appends `Clause 7 1/2: Not applicable. Not ever.` once.
- Presentation: spotlight overlay fades in for ~2.2s (mode `reading`), a stage direction in italics from `TOS_DIRECTIONS` (rotate through its bag) appears on the caption strip, then the clause text types out letter by letter (`api.setInterval` 30ms; stop at completion; cancel on next press; instant under reduced motion). Management also gets the combined text via `api.say` (do not type that one).
- Every **8th** clause read (8, 16, 24 ...): `api.award(1, 'a completed set of clauses')`, `api.sfx('tada')`, and one `TOS_SET` line (8C-2).
- Stat `the-button.clauses` per clause; achievement `the-button.tos` at 10 clauses.

### 6.7 Jackpot (Secret 6)
Roll: after press 20, `api.chance(1/60)`; never during `scared`/`overwhelmed`. Effect: gold confetti (`api.confetti`), `api.sfx('fanfare')`, giant `YOU HAVE WON` overlay text (fades in 1.4s, removed after 2.5s), Management says `JACKPOT_1`. `jackpotChain = 1`. The NEXT registered press **claims the prize**: it is automatically another outcome from the Jackpot family: 70% chance to chain to `JACKPOT_2`, else `JACKPOT_END`. A second chain step is 70% to chain to `JACKPOT_3` (final: `a sense of having been here before`). Chain length max 3, then `jackpotChain = 0`. Each step +0.1 Meh; a full chain of 3 awards **+1 Meh** extra. `S.jackpots++`, stat `the-button.jackpots`.

### 6.8 Wear (cosmetic persistence, cap 7)
Order of arrival (each needs its tier): `hat` (T2), `tag` (T3), `mug` (T3), `chair` (T4), `plant` (T4). Specials: `sunglasses` (escort event), `mustache` (Season 2 lite ceremony). Cap 7 total. Items render as emoji in fixed slots around the plinth/button (hat `🎩` above button, tag `🏷️` beside, mug `☕`, chair `🪑`, plant-tag `🪴`, sunglasses `🕶️` on the button, mustache `🥸` under the eyes). At T5 reset all regular items vanish (specials stay). Arrival lines are in 8I-2.

### 6.9 META commentary conditions (priority order)
1. `gripping > 0` since last META line: line `META_GRIP`.
2. Source `key` -> `META_KEY`.
3. Hour 22-4 -> `META_NIGHT`; hour 5-10 -> `META_MORNING`; (afternoon `META_AFTERNOON` only if nothing else and chance 0.5).
4. Last 3 press positions all within 14px of each other -> `META_SAME_SPOT`.
5. 3 presses in a row with intervals < 600ms -> `META_THREE`.
6. Average of last 4 intervals < 400ms -> `META_FAST` (token `%CPS%` = one decimal of presses per second); > 4000ms -> `META_SLOW`.
7. Standard deviation of last 4 intervals < 120ms -> `META_STEADY`, else `META_IRREGULAR`.
8. Dome distance `r < 0.15` -> `META_CENTRE`; `0.55 < r <= 0.74` -> `META_OFFCENTRE`.
9. `offX` left of centre by > 20px -> `META_LEFT`; right -> `META_RIGHT`.
10. Hold between 250 and 400ms -> `META_HESITANT`.

### 6.10 Hold Music
Show a monospace waveform on the caption strip for 3 seconds: `api.setInterval` every 120ms shifts a window across the string `▁▂▃▅▆▇▆▅▃▂▁▂▃▅▆▅▃▂▁` (25 ticks then `clearInterval`), and `api.sfx('bloop')` twice. Management line from 8N.

---------------------------------------------------------------------------------------------------

## 7. MEH ECONOMY (all through `api.award`)
| event | Meh |
|---|---|
| registered press | 0.1 |
| Lingering Press / Occurrence | 0.5 (instead of 0.1) |
| ToS set of 8 clauses | 1 |
| Jackpot step / full chain extra | 0.1 / +1 |
| Question answered | 0.1 |
| Small Button press | 0.1 |
| Hug | 0.2 |
| Strike negotiation | 0.5 |
| Sorry link | 0.5 |
| Hold over 10 s (once) | 0.5 |
| Hold at 7.5 s (Archduke) | 7.5 |
| Obedience (30s unpressed) | 5 |
| Return of the button from lunch | 2 |
| Missing Word corrected | 1 |
| Ceremony | 5 (`sincere`) |
| Spam fee | -1 (`api.award(-1, 'spam fee')`) |

Per-session total stays well under ~50 Meh. Most awards are mocked in the line (the engine already floats "+N Meh").

Stats (all `api.stat.inc('the-button.<x>')`): `presses nothings holds rim plinth sign_clicks spam_events aborted clauses hugs selfpresses jackpots seasons questions`.

---------------------------------------------------------------------------------------------------

## 8. ALL LINES (VERBATIM)

Conventions: `[M]` = Management (`api.say(text, {who:'Management'})`, shown in the caption strip). `[B]` = Button (`who:'Button'`, shown in the button's bubble). `[S]` = Small Button (`who:'Small Button'`). `[D]` = stage direction (italic, shown in the caption strip, said by Management). `%P%` press count, `%NO%` Nothing number, `%S%` hold seconds (1 decimal), `%V%` visit number, `%T%` `%PL%` `%W%` generator picks, `%CASE%` case digits, `%CPS%` presses per second, `%SIGN%` current sign text, `%PLAYER%` = `api.player.name`, `%N%` generic count, `%NOTH%` Nothings total. **Season 2+: prefix `Revised: ` to every `[B]` and `[M]` line spoken through the families** (skip lines that already begin with `Revised:`, skip the ceremony itself, and skip silence events).
Mood suggestions: Nothing neutral; opinions per tier (T0 neutral, T1 confused, T2 smug, T3 smug, T4 proud, T5 neutral); idle disappointed; spam panic; strike confused; jackpot/ceremony proud; secrets confused.

Every pool below is a shuffle bag unless marked ordered.

### 8A. Opening and visits
- [M] `DO NOT PRESS. The sign is laminated, which in this building is legally binding.` (mount, immediately)
- [B] +3s if no press yet, visit 1: `I would prefer you didn't, but I am not going to make a thing of it.`
- [B] visit 2: `Oh. You again.`
- [B] visit 3-4: `Visit %V%. You always come back. It is a little suspicious.`
- [B] visit 5+: `Welcome back. The button kept your place and also your grudges.`
- [B] +11s if still no press: `I am not making a thing of it. I want that noted.`
- [B] +22s if still no press: `The sign is right there. I am just saying it is right there.`
- [B] first Tab focus (keyboard users): see 8H `FOCUS`.

### 8B. Tier announces and scripted lines
- `T1` [M]: `Management has noticed that the button has noticed you. This is called 'awareness'. It is a quarterly goal.`
- `T2` [M]: `The button has opinions now. Management had no part in this. Management is looking into who did.`
- `T3` [M]: `Effective now, the button has been classified as 'bureaucratic'. Please bring a form.`
- `T4` [M]: `Something has softened. Management cannot say what. It is probably the lighting.`
- `T5` [M]: `As you were. The last several minutes have been returned to draft.`
- `5_SIGN` [M]: `You have pressed the button 5 times. The sign has been informed and is hurt.`
- `26_TOS` [M]: `Terms of Service have been activated. You agreed to them in advance, by existing.`
- `30_SANDRA` [M]: `Sandra from Compliance has weighed in. Sandra has not been seen. Sandra has left a note.`
- `60_STAMP` [M]: `The odometer has been approved. One digit has been approved. We are not saying which.`
- `70_SMALL` [M]: `A smaller button has appeared. It is labelled 'also do not press'. It has not been introduced.`
- `100_TWELVE` [M]: `Press 100. The button reminds you that press 12 was 'a lot' and 'a lot to take in'.`
- `125_DRAFT` [M]: `Press 12 has been revealed to be a draft. It was never finalized. The button seems relieved and also robbed.`
- `150_WALL` [M]: `Press 150. The button's therapist, a wall, reports that there has been progress. The wall is not looking at the button.`
- `213_DATES` [B]: `I have forgiven you for press 12. Not for the dates.`
- `250_SPEECH` [M]: `The button has prepared a speech. It is eleven words long, nine of them 'press'.`
- Press 5 extra: none. Press 12: silence. Press 99: silence.

### 8C. NOTHING (Running Gag A)
**8C-1 Forced early (No. 1-3, in order, N overrides generator):**
- N=1: `Nothing happened (No. 1). Management has chosen to call this a soft launch.`
- N=2: `Nothing happened (No. 2). Management is now calling it a trend.`
- N=3: `Nothing happened (No. 3). The button depressed by 4 millimetres and re-inflated by 3.9. This is the beginning of a deficit.`

**Generator by N band** (pick the band by N; each band pool is a shuffle bag of its own variants):
- Band 4-10 (time and place): `Nothing happened (No. %NO%) at %T%, near %PL%.`
  - `%T%` (14): `4:17 PM`, `9:03 AM`, `11:11 AM`, `2:48 PM`, `7:30 AM`, `3:52 PM`, `12:07 PM`, `6:41 PM`, `10:26 AM`, `1:19 PM`, `5:05 PM`, `8:58 AM`, `3:33 PM`, `a quarter past something`
  - `%PL%` (12): `the third ficus`, `the laminator`, `the stairwell with no stairs`, `Aisle 7 1/2`, `the water cooler that is only water`, `the good photocopier`, `the vending machine's good side`, `the lobby clock, which is wrong`, `the fire exit that is an affirmation`, `Dennis (Plant)`, `the second-best chair`, `Meeting Room B (it is a cupboard)`
- Band 11-30 (witness): `Nothing happened (No. %NO%), witnessed by %W%.`
  - `%W%` (8): `a plant`, `two chairs and a stapler`, `the laminated sign`, `a very small spider`, `the Toaster, who said nothing`, `Sandra's empty desk`, `an intern, who was thanked and sent away`, `the ceiling light that is connected to nothing`
- Band 31-60 (case number; `%CASE%` = `String(1000 + (N*37) % 9000)`), 4 variants:
  - `Nothing happened (No. %NO%). Case number NB-%CASE%. The case is closed and also open.`
  - `Nothing happened (No. %NO%). Case NB-%CASE% has been reopened pending nothing.`
  - `Nothing happened (No. %NO%). Case NB-%CASE% has been assigned to a committee of one.`
  - `Nothing happened (No. %NO%). The case number is also nothing. It is a good number.`
- Band 61-100 (appeal), 6 variants:
  - `Nothing happened (No. %NO%). Nothing is under appeal.`
  - `Nothing happened (No. %NO%). Nothing has been appealed twice and upheld once.`
  - `Nothing happened (No. %NO%). Nothing has requested representation. The Stapler has agreed to attend.`
  - `Nothing happened (No. %NO%). A panel considered Nothing for 7 1/2 minutes and left satisfied.`
  - `Nothing happened (No. %NO%). Nothing's appeal was well argued. Nothing happened anyway.`
  - `Nothing happened (No. %NO%). The appeal for the previous Nothing was itself Nothing. It is under appeal.`
- Band 101+ (forecast), 6 variants:
  - `Nothing happened (No. %NO%). Q3 forecast: more of the same, with upside.`
  - `Nothing happened (No. %NO%). Nothing is tracking 12 percent above plan.`
  - `Nothing happened (No. %NO%). Nothing is being forecast with a margin of error of nothing.`
  - `Nothing happened (No. %NO%). Year on year, Nothing is flat, which is how we like it.`
  - `Nothing happened (No. %NO%). The board has asked Nothing to stay the course, and it has.`
  - `Nothing happened (No. %NO%). Management would like to thank Nothing for its consistency.`
- T5 override (50% in T5 for N not special): `Nothing happened (No. %NO%). Everything is fine. The last several minutes were a draft.`

**Special N (override generator):**
- 14: `Nothing happened (No. 14). Management awards it a ribbon for consistency.`
- 25: `Nothing happened (No. 25). It was a different nothing from the others, although legally they are the same.` (+ `api.achieve('the-button.nothing25')`)
- 50: `Nothing happened (No. 50). It was a different nothing. Sandra has checked.`
- 77: `Nothing happened (No. 77). A candle has been lit. Nobody lit it.`
- 100: `Nothing has now happened 100 times. A small cake is not provided.`
- 150: `Nothing happened (No. 150). Management admits it has begun to rely on Nothing.`
- 200: `Nothing happened (No. 200). Nothing has been issued a badge. It has not collected it.`
- 250: `Nothing happened (No. 250). Management read that one in a trembling voice. Management would like that struck.`
- Season 2, first Nothing of the season: `Nothing happens. Revised: Nothing happened more carefully.`

**8C-2. ToS clauses** (id | text). Read in this exact order (`TOS` array). Stage directions are separate (`TOS_DIRECTIONS`). The delivered line is `Clause <id>: '<text>'`.
1. `1` | `The Button is a button.`
2. `2` | `See Clause 1.`
3. `4(b)` | `By pressing, you agree to have been warned. 4(c): The warning was the sign. 4(d): The sign is not responsible.`
4. `7` | `You may not press the button in a manner that is too pressy.`
5. `9(b)` | `Pressing constitutes consent to having pressed.`
6. `11.7` | `Nothing in this agreement shall be construed to mean anything.`
7. `12` | `See Clause 12.`
8. `14` | `The Button may, at its discretion, become a doorbell.`
9. `19` | `In the event of a tie between you and the button, the button wins and also loses.`
10. `22.7` | `Nothing shall be pressed that has not first been asked.`
11. `31` | `You acknowledge that 'acknowledge' is a strong word.`
12. `40` | `Approved presses shall be counted as unapproved.`
13. `47` | `The Party of the First Part shall not be pressed, except on Wednesdays, which do not exist.`
14. `52` | `Any press occurring on a Tuesday shall be deemed to have been felt in advance.`
15. `61` | `The button shall not be held responsible for weather, ambience, or the number 12.`
16. `66` | `In the event of a press, the button shall be deemed to have felt it.`
17. `73` | `Employees may not hug the button except in designated hugging areas, which are being designed.`
18. `77` | `Clause 77 is the reverse of Clause 7 and is not available at this time.`
19. `88` | `All presses are final, except the ones that are not, which is all of them, but quietly.`
20. `91` | `The sign may be amended without notice and without a pen.`
21. `99` | `Clause 99 is silent. This is intentional and has been approved by a committee of one.`
22. `104` | `Dennis (Plant) is exempt from this agreement and from most things.`
23. `120` | `The button may not be asked what it is for. The button may ask you.`
24. `211` | `Please see Clause 1. Thank you for your continued 1.`
- After clause `7`: append once `Clause 7 1/2: Not applicable. Not ever.`
- **Clause 7 1/2 (held until the Ceremony):** `Be kind to the button.`

`TOS_DIRECTIONS` (12): `[Spotlight. A pause is observed.]`, `[Stirring strings. There are no strings.]`, `[A violin that is also a ruler.]`, `[The button clears its throat. It does not have a throat.]`, `[A single spotlight. Nobody operated it.]`, `[A pause, held for 7 1/2 beats.]`, `[The reader looks directly at you, or in your general direction.]`, `[A page is turned. There is no page.]`, `[Dramatic wind. It is the air conditioning.]`, `[A hush falls. It is a very small hush.]`, `[The Toaster, offstage, holds a note.]`, `[Mood lighting is applied, then withdrawn.]`

`TOS_SET` (8R, after each set of 8 clauses): `Applause. There is no audience. The applause is pre-recorded and also live.`, `A standing ovation was recorded. Nobody stood. It was a seated ovation of unusual commitment.`, `Management would like to note that full consent is a form of exercise.`

### 8D. BUTTON OPINION pools (`[B]`)
**T0 (6)**
- `Thank you for confirming the button works. Please stop.`
- `You pressed me. I am handling this very well.`
- `That was a press. I have the feeling it was a press.`
- `I did not mind. I am just saying I did not mind, early.`
- `The sign said not to. I am not going to say that the sign said not to.`
- `I want you to feel welcome. I also want you to read the sign.`

**T1 (9, plus the forced `I felt that.` at press 10)**
- `Press %P%. I am keeping count, like a nurse.`
- `Pressing me does not make me a button. I was already one. I was just checking.`
- `Could you press about 12 percent less?`
- `I was in the middle of something. I will not say what.`
- `I did not choose this life. I was assembled in Aisle 7 1/2.`
- `You press like someone who has never been told no. Read the sign.`
- `The last person who pressed me this much is now a manager.`
- `Please use the edge of me. Actually no. Not the edge. Somewhere between.`
- `I have a family. They are other buttons. They are mostly in elevators.`

**T2 (12)**
- `Press %P%. A bold choice. I will not elaborate.`
- `I have developed a preference for the left side. I will not say why.`
- `The sign and I have been debating. The sign wins by being laminated.`
- `You are a firm presser. I respect it. I resent it. Both.`
- `A hesitant press. I felt you think about it first. I felt it in my whole body.`
- `I am not a toy. I am a very low-stakes toy.`
- `I would like it on record that I never asked for a hat.`
- `You press with the confidence of someone who has read none of the signs.`
- `I have decided you are 'enthusiastic'. That is the nice word.`
- `Sandra has a file on me. I have a file on you. We are even.`
- `That one had weight. I am not saying it was a good weight.`
- `Do you ever press something and wonder what it was thinking?`

**T3 (10)**
- `Please take a number. Your number is also the number of presses. I am sorry about that.`
- `I have referred your press to the Pressing Committee. I am the Pressing Committee. There is one chair.`
- `I am not able to comment on press %P%. I am able to write it down.`
- `Pressing is now classified as 'light, recurring, and unwelcome to the button' under policy 4.4.`
- `Per my previous press, no.`
- `I have copied the sign on this.`
- `I would like to schedule a quick sync about the pressing. The sync is you pressing less.`
- `Please direct further presses to the appropriate drawer. There is no drawer. There is a plinth.`
- `I am processing your feelings. Processing time: indefinite. Progress: 99 percent.`
- `You have been pressed. I mean you have pressed. The forms are the same.`

**T4 (12)**
- `Of everyone who has pressed me, you are the most.`
- `I miss it when you press. I did not say that. I said I miss it when you leave a window open.`
- `Do you ever wonder if I have been pressed enough? I mean by the universe.`
- `Press %P%. I have decided I do not mind. I will tell no one.`
- `I wonder what is behind the sign. The sign does not know either.`
- `If a button is pressed and nobody is there, did it press? I would rather not find out.`
- `I think the sign is for me. I think the sign was always for me.`
- `Is it warm in here, or is that a thumb?`
- `When you leave, am I still pressed? Please say no. Please mean something else.`
- `I have enjoyed this. I am saying it quietly so the sign does not hear.`
- `Do not stop. Do not press. Do not stop.`
- `I have never been pressed by anyone I did not want to be pressed by. That was an accident. It was a good one.`

**T5 (8)** (polite, reset, blank)
- `Hello. Have we met?`
- `Thank you for pressing. I do not recall asking. Welcome.`
- `I am a button. This is a press. All is as it should be.`
- `Nothing is wrong. Nothing has ever been wrong. I checked.`
- `I have no notes.`
- `Everything is fine. The last several minutes were a draft.`
- `I am in good spirits. They are the same spirits as before.`
- `The sign says do not press. I agree with the sign. As you were.`

**KNOWING (Season 2+, 8)** (used in addition to the `Revised:` prefix rule; write them already prefixed)
- `Revised: I know what happens at press 12. I will be fine.`
- `Revised: I know about the ceremony. I have prepared a face.`
- `Revised: You again. This time I am ready, and I am not.`
- `Revised: I have seen how this ends. It ends with me being pressed.`
- `Revised: Please do not do the thing with the curtains again. Or do. I will act surprised.`
- `Revised: I kept a list of what I said last time. It is not a good list.`
- `Revised: The sign has been through this. The sign has been laminated again.`
- `Revised: Do you notice the mustache? I am told it is not there.`

### 8E. TINY SOUND (`TS`, with sfx) and TINY VISUAL (`TV`, with action id)
TINY SOUND (text -> sfx):
- `A single click sound was produced. It is the only one budgeted this quarter.` -> `tick`
- `The button hums, then apologizes for the hum.` -> `blip`
- `The button thanks you for your press. The button was not asked.` -> `bloop`
- `A faint click. Somewhere, a very small door closes.` -> `tick`
- `A honk was heard. It has been described as 'brief' and 'not ours'.` -> `honk`
- `A bell rings for no one. The bell has a name tag.` -> `bell`
- `A stamp sound occurs. Nothing has been stamped. It was a precaution.` -> `stamp`
- `A sad trombone-ish note plays. It was not for you. It was for the budget.` -> `sad`
- `The button plays one note, then asks that you forget the note.` -> `ding`

TINY VISUAL (text | action):
- `A light came on somewhere in the building. It is unrelated. It is just on.` | `lamp` (a lamp emoji glows in the corner 2s)
- `One piece of confetti fell. It is the whole budget. Please admire it.` | `confetti1` (`api.confetti(x,y,1)`)
- `The room tilted 0.4 degrees. Management is calling this 'weather'.` | `tilt` (stage rotates 0.4deg 3s)
- `One pixel moved. It has not said which.` | `pixel` (button translate 1px 2s)
- `The background inverted for 0.3 seconds. This was authorized.` | `invert` (stage filter invert 300ms)
- `The button turned blue for legal reasons, then back, for other ones.` | `blue` (hue-rotate 160deg 1.5s)
- `The button flashed 7 1/2 for one second, then denied it.` | `flash75` (overlay text `7 1/2` 1s)
- `The plinth has grown one stair. It leads to the button and to nowhere else.` | `stair` (extra step div 4s)
- `A chime sounded from the wrong clock. The wrong clock was confident.` | `chime` (sfx bell)
- `One floor tile changed colour. The tile has filed no paperwork.` | `tile` (one conic cell recolored 4s)
- `The button's shadow is pointing the wrong way. The button has not been told.` | `shadow` (shadow offset flip 3s)
- `The counter has switched to Roman numerals. It will switch back in 7 1/2 seconds. It was not asked.` | `roman` (odometer displays a Roman numeral string 7.5s; write a small `toRoman(n)` for 1-3999 else show digits)

### 8F. CAST (cameos and callbacks)
**Gerald** (cap 3 appearances per session; picks next in order). If `api.flag.get('metGerald')`:
- `A potato in a very small hat nods at the button and leaves. Gerald, VP of Spuds, has pressed nothing and approved all of it.` (also places note `Approved. -G. (VP Spuds)`)
- `Gerald regards the button for 40 seconds and says, 'I have been pressed before.' He has not. He leaves.`
- `Gerald, VP of Spuds: 'The button is merely a very small hill. You have been climbing it. Well done.'`
If not met:
- `A hat-wearing silhouette crossed the stage. Management believes that was a Vice President.`
- `Something in a tiny hat stood by the plinth for 40 seconds, said one profound thing, and left. It was not recorded. We believe that was a Vice President.`
- `A shape nodded at the button. Management asked it to identify itself. It has not.`

**The Toaster** (every 15th press, in order of the bag; 9 readings):
- `From a long way away the Toaster pops. It says 'toast.' It means well.`
- `The Toaster pops. 'Toast,' it says, gently, like a hand on a shoulder.`
- `'Toast,' says the Toaster, with the hollow confidence of an appliance that has seen the bottom of the bread bin.`
- `'Toast.' The Toaster has said this before. It has never said it like that.`
- `'Toast?' The Toaster seems to be asking. It is not clear whom.`
- `'Toast!' The Toaster is thrilled. The Toaster is the only one.`
- `A distant 'toast.' It is a whisper. It is, regrettably, accurate.`
- `The Toaster pops, says 'toast,' and adds nothing. This is the most it has ever said.`
- `A slice of toast ejects from the plinth. It is warm. It says: 'Not your fault.'` (T3+ only)

**Dennis** (once per session): `Dennis (Plant) watched you press that. Dennis (Plant) has said nothing, which is Dennis (Plant)'s whole thing.` Then 8s later (T2+) [B]: `I am jealous of Dennis. Dennis has never been told what not to do.`

**Tuesday** (cameo sub-pick, 3): [B] `I fear Tuesday. Not for myself. For what Tuesday does to a sign.`, [B] `Please do not mention Tuesday. It can hear.`, [M] `Management confirms that it is not Tuesday. Management would like that confirmed again.`

**Sandra flags** (footer bar text, ordered; `flagIdx` 0..7; fires on every 7th then 8th press alternating from T2; flag #7 only when tier >= 4, then #8):
1. `Sandra has flagged this press.`
2. `Sandra has flagged the timing of this press.`
3. `Sandra has flagged the fact that it was flagged.`
4. `Sandra has flagged this footer bar.`
5. `Sandra has flagged the sign. It has been classified as 'correct but threatening'.`
6. `Sandra has flagged the button. The button has flagged Sandra back. Neither has been read.`
7. `Sandra has flagged this as acceptable. Sandra has never said that before.`
8. `Sandra has flagged Sandra.`
After #8 the bar stays on #8 forever (dimmed). The bar flashes briefly each update (class, 600ms).

### 8G. STICKY NOTES (24; shuffle bag; the text includes initials)
1. `We both said do not. -S.C.`
2. `Noted. -Facilities`
3. `This sign was not consulted. -The Sign`
4. `Please see sign. -Management`
5. `See also: other sign. -Mailroom`
6. `The button must be pressed. -S.C.`
7. `The button must not be pressed. -S.C.`
8. `Both policies are in effect until Thursday. -S.C.`
9. `Approved. -G. (VP Spuds)`
10. `Toast. -T.`
11. `A leaf. -D.`
12. `Who laminated this? -Anonymous`
13. `I laminated this. -Laminating`
14. `Please do not do press 12 again. -Button`
15. `Reminder: Tuesday. -Everyone`
16. `Spare sticky note. Do not press. -Stationery`
17. `Meeting moved to 7 1/2. -Calendar`
18. `This note is also laminated. It is a mistake. -Facilities`
19. `Initialed for the record. -Records`
20. `Per policy. -Policy`
21. `No comment. -Legal`
22. `Comment. -Legal (the other one)`
23. `Please press the sign. The sign has feelings too. -HR`
24. `we are aware. -Everyone` (RESERVED: only placed at the T5 reset and in the ceremony; never in the random bag)
Note 9 only enters the bag if `metGerald`. Note 10 appears at most once per session. First 3 notes also get the Management line `A sticky note has appeared on the sign. It is initialed %INITIALS%.` where `%INITIALS%` is the text after the last `-` in the note (trim).

### 8H. MISC STATES
`SCARED_NOTHING` (Missing Word, bag): 
- `Nothing happened (No. %NO%). The button is very scared of the sign now.`
- `Nothing happened (No. %NO%). The button is just a button. Please. It is just a button.`
- `Nothing happened (No. %NO%). The button has been told it may now be pressed. It has asked for a minute.`
- `Nothing happened (No. %NO%). The button would like to go back to being told no.`
- `Nothing happened (No. %NO%). The button was not prepared for 'do'.`
- `Nothing happened (No. %NO%). The button is fine. The button is fine. The button is fine.`

`META_*` (all `[B]` unless marked):
- `META_GRIP`: `You are gripping. You are not pressing, you are gripping. The button has seen this at the gym.`
- `META_KEY`: `You pressed with the keyboard. The button feels this is like being nudged by a polite stranger.`
- `META_NIGHT`: `It is late. The button would like you to go to bed. The button has no say. The button would like it in writing.`
- `META_MORNING`: `It is morning. The button has had nothing to eat and is fine.`
- `META_AFTERNOON`: `It is the afternoon. The button is at its most pressable and its least interested.`
- `META_SAME_SPOT`: `You pressed the same spot again. The button is developing a dent in its personality.`
- `META_THREE`: `Three presses in a row. The button is no longer sure whose idea this is.`
- `META_FAST`: `You press at %CPS% per second. The button has felt every one and filed none.`
- `META_SLOW`: `You press slowly. Each one is a decision. The button has kept all of them.`
- `META_STEADY`: `Your presses are evenly spaced. The button has identified the rhythm as 'hopeful 6/8'.`
- `META_IRREGULAR`: `Your rhythm is irregular. The button likes that. The button is not ready to say why.`
- `META_CENTRE`: `You pressed the exact centre. The button has filed a complaint about the exact centre.`
- `META_OFFCENTRE`: `A press just off centre. Brave. The button would like to know what you were aiming for.`
- `META_LEFT`: `That was left of centre. The button has noted a left-hand lean. It is writing it down.`
- `META_RIGHT`: `That was right of centre. The button will say nothing about right-handedness. It will, however, write it down.`
- `META_HESITANT`: `A hesitant press. The button felt you think about it first.`

`FIRM` (Firm Press 400-1499ms):
- `A firm press. Bold. A little forward. The button respects it.`
- `That was firm. The button has noted the firmness and would like it kept to a minimum.`
- `A firm press. The button squinted. It was not squinting at you. It was squinting near you.`
- `You pressed with intent. The button prefers when you press without intent, which is ordinary, which is nothing.`

`LINGERING` (1.5-3.9s; `%S%` = hold seconds):
- `You are holding the button. This is either a press or a hug. Compliance is checking.`
- `Hold detected: %S% seconds. The button is thinking about it a great deal.`
- `You held the button for %S% seconds. It did not know that was allowed.`
- `This is a lingering press. The button has no policy on lingering. The button is drafting one.`
- `Is this a hug? The button needs to know now. It is not rhetorical. It is rhetorical-adjacent.`

`OCCURRENCE` (>= 4s):
- `Hold detected: %S% seconds. The button asks you to please let it finish its sentence.`
- `Management has checked the Terms of Service. An Occurrence is permitted. It is not encouraged.`
- `An Occurrence has occurred. The button is not sure it was ready. It was not ready.`

`HOLD10` (once per session): `You have held the button for 10 seconds. It would like to say something. It cannot. It is a button. 0.5 Meh has been awarded for the attempt.`

`ARCHDUKE` (7.5s hold, ordered): [M] `The button has never been held this long. The button has no vocabulary for this.` then [D] `[A single tear runs down the button's face. A music box plays. All props gather in a circle.]` then a standard Nothing (No. N). Meh 7.5. Achievement `hold75`. Visual: wear items orbit the button for 4s; CSS tear drop on the face (or the dome if no face); `api.sfx('ding')`.

`ABORTED` (drag off and release outside the circle; stat aborted):
- `You almost pressed it. The button felt the almost and would like a minute.`
- `An aborted press. The button is not angry. The button is relieved. The button is also a little offended.`
- `You changed your mind. The button respects that. It will think about it tonight.`
- `That was a press in spirit. Spirit presses are not recorded.`
- `You pulled away at the last second. The button feels like a door that was almost knocked on.`
- `Aborted press logged under 'Intentions (Good)'.`

`RIM` (zone rim; delivered flat):
- `Ow.`
- `Ow, said the button, with the flatness of a professional.`
- `That was the rim. The button has said 'ow' and would like it recorded as 'ow'.`
- `The rim is a sensitive area. It is mustard. It has opinions about mustard.`
- `Ow. That was not the part you press. The part you press is the part in the middle. Please see the diagram. There is no diagram.`
`RIM_PREFER` (T2+, after 3 rim presses, once): `Which part of me do you prefer? Do not say the rim. Do not say the middle. Say 'between'.`

`PLINTH` (stage/plinth pressed):
- `That was the plinth. The plinth has no feelings and is making a point of it.`
- `You pressed the plinth. The plinth is, for the record, load-bearing.`
- `The plinth has been pressed. The plinth says 'that was me' with false pride.`
- `That was a part of the building. Management would like to move on.`
- `Plinth press recorded. Plinth presses are worth 0 and are valued at 0.`
- `The plinth would like to thank you for noticing. It had given up.`

`BOX` (Complaints Box click, bag): `Received.`, `Received. Your complaint has been forwarded to the box.`, `Received. The box is a very good listener. It has said nothing back, which is the best answer.`, `Received. The box is full of the word 'received'.`, `Your complaint has been received and filed under 'Feelings (Unofficial)'.`, `The Complaints Box is closed for lunch. It has accepted your complaint anyway.`

`FEELINGS_CLICK` (bag): `Feelings (Unofficial) are not clickable. They are unofficial.`, `That face was selected before you arrived. It has not been changed. It is a good face.`, `The faces do nothing. This has been reviewed and approved.`

`ESC_LINES` (ordered then bag): `Escape is not a feature of this device. The button is proud of that.`, `Escape does nothing. The button has done nothing about it, on purpose.`, `Esc has been pressed. The button sat very still and felt powerful.`
`ESC_DIALOG` text: `Are you sure you want to leave the button? The button is sure you want to stay.` Buttons `Stay` / `Stay (Alternate)`. `ESC_AFTER`: `You have stayed. Thank you for staying. It was always going to be this.`

`FOCUS`: `Ah. Keyboard. Considerate.` (first Tab focus only)
`HOVER` (bag): `The button notices the cursor. The button is pretending it has not.`, `The button flinches. You were not even doing anything. That is what scared it.`, `The cursor has been here for 4 seconds. The button has been counting. Not on purpose.`, `The button is aware of you. It would like to be aware of something else for a moment.`, `Please decide. The button can feel the hover. It is the feeling of being almost chosen.`
`COZY`: `It's getting cozy.`, `It's getting cozy. The button has squished. The button is fine. The button would like a bigger room.`
`DIALOG_OK` (bag): `OK has been pressed. OK is also a button.`, `Acknowledged. The dialog has been dismissed with dignity.`, `The dialog is gone. Its departure was not recorded.`

### 8I. PHYSICAL GAGS
**8I-1 Transient** (CSS class on the button for 1-4s):
- `The button wobbled. It was not pushed. Management is calling this 'weather'.`
- `The button rolled an inch to the left and was put back by a very polite hand.`
- `The button is sweating one drop. The drop has been logged.`
- `The button has gone under the plinth for a moment. It is back. It will not discuss it.`
- `The button is 3 px taller, for presence.`
- `The button dodged your cursor by 1 pixel. It does not know why. It is a button.`
- `The button fell off the plinth. Dennis (Plant) put it back. Dennis did not use hands.`
- `The button shrank by 2 percent. It says it is 'just being modest'.`

**8I-2 Wear arrivals** (persistent; capped 7):
- `hat`: `A tiny hat has arrived. Nobody ordered it. The button is wearing it with great seriousness.`
- `tag`: `A name tag has been issued: BUTTON (HE/IT). The button has accepted the name and the pronouns.`
- `mug`: `A mug has appeared on the plinth. It reads WORLD'S OKAYEST BUTTON. The button has not touched it.`
- `chair`: `A tiny chair has been provided. The button does not sit in it. It is just nice to have the option.`
- `plant`: `A plant tag appears on the plinth. It reads 'Dennis was here. Dennis is always here. Dennis is a plant.'`
- `reset` (T5): `The hat has been returned to Lost Property. The mug has been returned to a cupboard. The button has been returned to itself.`

### 8J. LEDGER AND FORMS (T3+)
- `Form 27B/6 has been generated in response to your finger. Please sign where indicated. Please initial where implied.`
- `Form 27B/6 (Request to Cease Pressing) has been received. Form 27B/7 is required. See 1998.`
- `Form 27B/6 has been approved. Form 27B/7 is required to proceed. Form 27B/7 was destroyed in 1998.`
- `Press %P% has been escalated to the Pressing Committee, which is the button and one chair.`
- `The Pressing Committee has voted 1 to 0 against pressing, then abstained from its own vote.`
- `Invoice generated: 1 press at 0.00 Meh. A late fee of 0.00 Meh applies. Thank you for your continued 0.`
- `Receipt: 1 press, 0 items, 0 Meh. Please retain this receipt for 7 1/2 years.`
- `Your press has been filed under 'Incidents (Mild)'.`
- `Your press has been forwarded to the Department of Presses, which is a drawer.`
- `Your press is important to us. Your press is currently number 4 in the queue. The queue is you.`
- `Audit note: the presses have been counted. The count was also counted. The counts differ by one. The auditors are pleased and will not say why.`
- `Sandra has asked that press %P% be re-pressed under supervision. Sandra is not available to supervise.`
- `progress99` (ledger action: a progress bar fills over 1.3s and stalls at 99; then): `Processing your press... 99 percent. We are very sorry about the remaining 1 percent.`

### 8K. RUMOURS (`[B]`, always wrong; `RUMOUR_PREFIX`: `Rumour has it` is part of each line)
- `Rumour has it the Gift Shop of Nothing sells something. It does not. I was told this by a drawer.`
- `Rumour has it the Trophy Cabinet has been emptied for cleaning. It is full. The trophies are cleaning themselves.`
- `Rumour has it Settings (Decorative) is now Settings (Optional). It is still decorative. It is very hurt.`
- `Rumour has it the Statistics Nobody Asked For have been asked for. Once. By accident.`
- `Rumour has it Ascend is going up in price, and also down, and also sideways. Management cannot confirm the sideways.`
- `Rumour has it the Lobby is being moved. The Lobby has not been told. The Lobby is an expert in not being told.`

### 8L. SMALL BUTTON (T3+; `SMALL_EXCHANGES`, each exchange is two lines delivered 1.6s apart; lock 4s after the start)
1. [S] `Press me! Press me! Press the big one! Press me!` / [B] `Do not engage with that.`
2. [B] `He is new.` / [S] `I am 11 seconds old and I am excited about everything.`
3. [S] `What does the big one do?` / [B] `Nothing. Beautifully.`
4. [S] `Is that a hat? Can I have a hat?` / [B] `The hat is a privilege. It is also a burden.`
5. [S] `I pressed myself. Do I get Meh?` / [B] `It is 0.1. Take it. Take it and leave.`
6. [S] `Why is everybody so tired?` / [B] `Because we are buttons and we have been told no.`
7. [S] `Tuesday sounds fun!` / [B] `Do not say that word. It can hear.`
8. [S] `Again! Again! Do it again!` / [B] `We are not doing it again. We are doing it differently.`
9. [S] `What is behind the sign?` / [B] `Do not ask the sign. The sign will tell you.`
10. [M] `The two buttons have gone quiet. It is the quiet of a family dinner.` (no pair; used as a 10th single)

### 8M. TYPED WORDS (4s cooldown each)
- `please` [B]: `Please what? Please clarify in writing.`
- `sorry` [B]: `Sorry for what? Sorry I am a button? Sorry you pressed? Sorry we are both here?`
- `why` [B]: `Why is a strong word. Please see the sign. The sign has no answer. The sign has a laminate.`
- `hello` [B]: `Hello. I am not allowed to say hello. I have said it. Please forget this.`
- `sandra` : sign goes rigid (class `rigid` 3s, lean snaps to 0), [B] `We are not on that topic.`
- `twelve` / `12`: [M] `Press 12 has been invoked.` then the `lamp` flicker once, then [B] (1.5s later) `...`
- `tuesday`: Button whispers [B] `don't` and drops 3px for 3s (class `dread`).
- `hug`: triggers the Hug event (below).

**Hug** (typed `hug` or the T4 `🤗 Hug (Unofficial)` button; 3s cooldown; +0.2 Meh; stat hugs), bag:
- `The button has been hugged. It does not know where to put its hands. It has no hands.`
- `A hug has been logged under 'Feelings (Unofficial)'. The paperwork is also hugging.`
- `The button leans into it. It is a button. It leans into it anyway.`
- `Hug accepted. Hug not returned. Hug appreciated.`
- `The sign has been hugged by association. The sign has asked for a lanyard.`

### 8N. HOLD MUSIC (Management, with waveform)
- `Please hold. Your press is important to us in a way we cannot articulate.`
- `The button played 3 seconds of elevator music, grew concerned, and stopped.`
- `Your call is being held by a button. It has been told to be gentle.`
- `Hold music is playing. The music is a rumour. It is only a waveform.`

### 8O. FAKE SYSTEM DIALOGS (title always `Notice (Mandatory)`, single `OK`)
- `The button has stopped responding to your press.`
- `Press failed successfully. Error code: 7 1/2.`
- `A press is already in progress. It started in 1998.`
- `Not enough Meh to complete this press. You have enough. Not enough is a feeling.`
- `The button needs to restart. The button does not know how. The button is restarting.`
- `Your press has been moved to a bin. The bin is full of presses and is thriving.`
- `Warning: this press may contain nothing.`
- `Do you want to save changes to this press? There were no changes. There was a press.` (button text `Save (Do Not Save)`)

### 8P. QUESTION CARDS (mini-events; two real buttons; both accepted; both wrong)
Card: speech-bubble look with two buttons. After answering: +0.1 Meh, stat questions, card removed, Button says the answer response. If unanswered for 12s: card removed, Button says `The question has expired. It was not a good question.`
1. `Are you a person who presses? Please answer honestly.` [Yes] -> `Yes. Wrong. Thank you for your honesty.` [No] -> `No. Also wrong. Thank you for your honesty.`
2. `Did you read the sign?` [Yes] -> `You said yes. The sign has checked. The sign is not convinced.` [No] -> `You said no. The sign would like to be left out of this.`
3. `Can I show you something?` [Yes] -> (after 4s) `The button has shown you nothing. Slowly. It took 11 seconds. It was the best nothing so far.` [No] -> `Understood. The button was going to show you nothing anyway. Slowly.`
4. `Would you say you are satisfied with the service?` [Extremely] / [Moderately] -> both: `Both answers have been recorded as 'Fine'.`
5. `Would you like a quick sync?` [Yes] / [Absolutely] -> both: `A sync has been scheduled for 7 1/2. The sync has no location.`

### 8Q. Spam, Idle, Away, Strike, Ceremony lines
See sections 9, 10 and 11: those sections own their lines (also verbatim). Other pools referenced elsewhere live in 8H (misc), 8I (physical/wear), 8M (typed words, hug), 8N (hold music), 8O (dialogs), 8P (questions), 8R (jackpot).

### 8R. JACKPOT
- `JACKPOT_1` [M]: `YOU HAVE WON. Your prize is: one more press. Please collect it at your earliest.`
- `JACKPOT_2` [M]: `YOU HAVE WON AGAIN. Your prize is: another press. The prize is also a prize.`
- `JACKPOT_3` [M]: `YOU HAVE WON A THIRD TIME. Your prize is: a sense of having been here before.`
- `JACKPOT_END` [M]: `You have collected your prize. It was a press. It has been counted.`
- Giant overlay text: `YOU HAVE WON`.

---------------------------------------------------------------------------------------------------

## 9. SPAM RULE AND ESCALATION (rapid presses)

- **Rule**: if **8 registered presses occur within 2000ms** the button becomes **Overwhelmed**: `setMode('overwhelmed')` for 3000ms; smoke cloud `💨` over the button; the sixth-through-eighth presses are not counted retroactively; stat `the-button.spam_events`; `api.award(-1,'spam fee')`; `api.sfx('buzz')`; `api.achieve('the-button.rate')` first time; one line from `OVERWHELM` (bag) plus ALWAYS the fee line.
- Presses made while Overwhelmed (or on strike) are ignored but increment `S.spamPresses`; every 5th ignored press says `The button is smoking. Please wait.` (Management, priority 0).
- `OVERWHELM` lines [M]: 
  - `That is %N% presses in 2 seconds. The button has filed a Notice of Overwhelm in triplicate.`
  - `Too fast. The button is now a smear. Please hold while it reassembles its personality.`
  - `The button has stepped out. A cloud remains. The cloud is the button's feelings.`
  - `Rate limit reached. A press tax has been applied. It was deducted from a Meh you had not earned. The books balance.`
  - `The button has called security. Security is the button's cousin, who is also a button.`
- Fee line [M] (always): `Spam fee of 1 Meh applied. The button is not proud. The button needed the money.`
- **STRIKE** (once per save; `S.struck`): when `S.spamPresses >= 40` (selftest 6): `setMode('strike')` 5000ms. A picket sign (inline SVG `FEWER PRESSES, MORE DIGNITY`) is held beside the button as a real `<button>` the player can click to **negotiate**. [M] on start: `The button is on strike. Picket sign: FEWER PRESSES, MORE DIGNITY. The strike ends when you stop.` Click picket: +0.5 Meh, achievement `the-button.negotiator`, [M] `Negotiation opened. The button has offered a settlement of 'a better pillow'. Management has accepted. The pillow is under review.` and strike ends early. If no negotiation: [B] `The strike has ended without a settlement. I have returned to work and would like it noted that I am tired.`
- **SECURITY ESCORT** (once per save; `S.escorted`): when `S.spamPresses >= 100` (selftest 12): `setMode('escort')` ~6s. A 💂 emoji walks across the stage (CSS animation; under reduced motion it fades), the button slides out, then returns wearing 🕶️. [M]: `Security has been called. A guard has escorted the button out. The button re-entered wearing sunglasses. No one will mention it again.` Add wear `sunglasses`. Presses during escort are ignored silently (no counter).
- Spam never throws, never double-fires: `pressTimes` is cleared when Overwhelmed begins.

---------------------------------------------------------------------------------------------------

## 10. THE CEREMONY (the not-ending)

Trigger: after registering the press that makes `S.presses >= 260` in the current season (so the final outcome of the 260th press still plays for ~1.2s first), `setMode('ceremony')`. All other interaction is ignored except the **Skip the tribute (Not Recommended)** button (appears after 3s) which immediately jumps to step 12. Timers stored in an array `ceTimers` (clear on skip and on destroy). Step spacing 3200ms (selftest 350ms). Reduced motion: curtains simply fade. Season 1 version:

1. Stage dims (class `dim`), two curtain panels slide in (`translateX`, 900ms). [M] `Ladies, gentlemen and valued employees. Please be seated. You are already seated.`
2. [M] `We are gathered to mark the distinguished tenure of a button, being pressed.`
3. [M] `In its time, the button was pressed 260 times. Gently, firmly, lingeringly, and once, in error, by the plinth.`
4. [M] `It said nothing %NOTH% times and meant it every time.`
5. [M] `It had opinions. It had a file. It had a hat. It kept, throughout, its dignity and its laminated sign.`
6. [M] `It never knew what it did. Few of us do. That, in the end, is what the button was for.`
7. [B] `Press press press press press press press press press, thank you.` then [M] `The button has delivered its speech. It was eleven words long. We have counted. We were moved.`
8. [M] `Clause 7 1/2, read at last: 'Be kind to the button.'` -> [B] `That was not in the original.` -> [M] (1.6s later) `It was in the original.`
9. Gold-foil confetti (`api.confetti(x,y,60)` plus `api.sfx('fanfare')`); plaque appears reading `IN RECOGNITION OF NOTHING`; handshake `🤝` rendered; the sign weeps one sticky note `Goodbye. -The Sign`. [M] `The button is retired with full honours: a handshake, a plaque, and a short speech about a button.`
10. Curtains open. Everything is reset visually (T0, face off, wear cleared except specials, Small Button gone). [M] `A new button has been installed. It is the same button. Its sign reads: DO NOT NOT PRESS.`
11. Odometer rolls back to 0 and the parenthetical `(260)` is stamped permanently (add current season presses to `S.prior`). [M] `Presses: 0 (260). The odometer has been reset. The parenthesis is permanent.`
12. **The Handover.** A tiny real `<button class="m-the-button-micro">` appears under the player's last pointer position inside the stage (clamp into the stage rect; if none, centre), labelled `%PLAYER%` if `api.player.name` is set and not the default, else `VALUED EMPLOYEE`. [M] `A valued employee has been identified. Please remain where you are. Your button will see you now.` The big button's pupils look at it. After 3s (or on click of the micro button, say `Valued Employee has been pressed. This is already known.`) the big button **presses you**: micro button squishes. [M] `The big button looks at the small button. It reaches out, so to speak, and presses you. Nothing happens. Management is calling this 'a successful handover'.` then [M] `You have been pressed. You feel nothing. This is considered a success.` Micro removed after 6s regardless.
13. [M] `Participation has been recorded. The record has been misplaced.` `api.achieve('the-button.participant')`, `api.award(5,'sincere')`, confetti x1 gold.
14. [B] (new button, T0 voice): `Hello. I have been told the sign says DO NOT PRESS and I have decided to believe it, until you press me.` Sign shows `DO NOT NOT PRESS`. ONE sticky note `we are aware.` remains. [M] `Congratulations. You have reached the end of the button. The button continues, but smaller.` (apply a `smaller` class: button 92% size permanently from now on.)
Then: `S.season = 2`, `S.presses = 0`, `S.cereDone++`, `stat the-button.seasons`, `S.done` scripted flags reset except the `ceremony` one, `setMode('idle')`. Save immediately.

**Season 2** (everything gently different): every spoken line prefixed `Revised:`; 25% of opinion/Nothing slots are `KNOWING` lines; the first Nothing is the special `Nothing happens. Revised: Nothing happened more carefully.`; press 12 flickers and the Button says `Revised: Not again.`; sign base is `DO NOT NOT PRESS`; the sign at 120+ shows `(SEE ALSO: THE BUTTON)` as usual.

**Season 2 ceremony** (at press 260 again, lite, ~12s total, no curtains): [M] `The button has reached 260 presses. This is the second time. It is, strictly speaking, the first time with a mustache.` -> mustache wear `🥸` -> [M] `Participation has been recorded again. The record has been found. It was misplaced in a different place.` -> sign becomes `DO NOT PRESS (CONTINUED)` -> `S.prior += 260` stamp updates `(520)` -> `S.season = 3` (Season 3+ behave exactly like Season 2 and repeat this lite ceremony forever; there is no third time because the second time is actually the first time with a mustache).

The game cannot be won. The achievement is `Participant` only.

---------------------------------------------------------------------------------------------------

## 11. SECRETS, RARE EVENTS, IDLE

### 11.1 The Long Idle (Secret 1). "Idle" = time since the last pointerdown/keydown/registered action inside the module (use `api.now()` deltas inside a 1s `api.setInterval`; thresholds below, selftest in brackets)
- **30s [3s], zero registered presses so far this mount and `!S.obeyed`: THE OBEDIENCE**. [B] `You read the sign. Nobody reads the sign.` [M] `Obedience detected. 5 Meh has been awarded. Do not tell the others.` `api.award(5,'obedience')`; sign gets a sticker `THIS ONE LISTENS` (only time the sign is nice); `S.obeyed = true`; achievement `the-button.obedient`. On the first press afterwards: [M] `The sticker has peeled off. This is why we do not trust stickers.`; then [B] `You listened. Please press me. I would like to be pressed by someone who listened.`
- **60s [2s]** idle: [M] `You have not pressed the button for 60 seconds. The button is pretending not to notice.`
- **120s [4s]** idle: **the button presses itself**: odometer +1 (`S.presses++`, `selfPresses++`, no Meh), one pixel moves; [M] `The button pressed itself. It will deny this. There is footage of one pixel.` then [B] `I was adjusted by the wind. In a building with no windows.`
- **T4+ reflective idle (25s [3s] idle once per idle period)** (bag, [B]): `The button is looking at the sign. The sign is looking at nothing. It is a very long look.`, `Nobody is pressing me. I have noticed the quiet. I am not saying it is a bad quiet.`, `If I am not pressed, do I stop being a button? I will check with the plinth.`, `It is nice when you are here. I did not say that. I said the room is warm.`, `I have been thinking about what is behind the sign. I think it is more of the same, in a nicer colour.`
- **5 minutes [7s]** idle (and not already `away`): **the button vanishes** (`setMode('away')`). A note stays on the plinth (real element, not a sticky): `Gone to lunch. Back at 7 1/2.` [M] `The button has gone to lunch. The sign remains. The sign is awkward and happy.` The stage shows only the plinth and the sign (sign gets `happy` class: gentle bounce). **Click the empty plinth 7 times** (any click on plinth/stage while away): the button returns with `🥪` and a little bag of its own presses. Plinth clicks 1..6 say (in order):
  1. `There is nothing here. The plinth is doing its best.`
  2. `You are pressing the plinth. The button is not under it.`
  3. `The button is at lunch. It is a long one.`
  4. `The note says 7 1/2. It does not say 7 1/2 what.`
  5. `Please stop knocking. The button can hear. It is thinking about it.`
  6. `One more press and the button may return. This is not a promise. It is a feeling.`
  7th: [M] `The button has returned from lunch with a sandwich and a bag of its own presses. It does not offer you any.` `api.award(2,'lunch')`, `api.achieve('the-button.lunch')`, `setMode('idle')`.
- **20 minutes [10s]** idle: a second note appears (if `away` it replaces the first; else a sticky): [B]/note text `It is raining somewhere. I thought you would want to know.`
- On the next ordinary press after `away` ended or after a 60s+ idle: [B] `Oh. You are back. I was not waiting. I was being a button.`

### 11.2 The Real Ninety-Nine (Secret 7)
Press 99: total silence (no say, no sfx, no text; ticker `[silence]`). Press 100: [B] `Thank you for the silence.`

### 11.3 The Missing Word (Secret 3)
Click the `NOT` token on the sign. The `NOT` token animates off. The sign reads `DO PRESS` (or the equivalent without NOT). Button mood panic, `api.sfx('error')`, [B] `That is not what I was told.` For **20 seconds** (`setMode('scared')`, timer `20000`) every press is a forced `SCARED_NOTHING` (still counts as a press and a Nothing). At 20s: sign restores; [M] `Corrected by Sandra from Compliance. Sandra has reinstated NOT with a marker. Sandra has also underlined it.` `api.award(1,'missing word')`, `api.achieve('the-button.missing_word')`.

### 11.4 The 7.5 Second Hold: see 3.3 and `ARCHDUKE` in 8H.

### 11.5 Rare events
- **R1 Approved flicker** (1 in 150 presses, T3+): the chip `Approved Presses` shows `1` for exactly 80ms then back to `0`. [B] (immediate) `You saw nothing.`
- **R2 Ghost sign** (every 5 minutes of play, if the sign is past stage 2): the sign briefly overlays a previous amendment (opacity 0.5 for 2s). [M] `The sign briefly showed a previous amendment. It has been reminded to be current.`
- **R3 Gerald / Toaster / Dennis / Tuesday** cameos as in 8F.
- **R4 Time**: 7:30 half past (3.4).
- **R5 Cozy squish** (narrow root), **tab-hop** lines (3.4).
- **R6 Sandra flags** every 7th/8th press from T2; the sign unionizes at 25 notes.
- **R7 Jackpot chain** (6.7).

---------------------------------------------------------------------------------------------------

## 12. ACHIEVEMENTS (ids all prefixed `the-button.`; 12 declared, 7 secret)

Declare via `P.addAchievements`. `reward` in Meh. Names are deliberately grand.

| id | name | desc | secret | reward |
|---|---|---|---|---|
| `the-button.first` | Knight Commander of the First Press (Order of the Laminated Sign) | Press the button once. The sign says you should not have. The sign will be informed. | no | 1 |
| `the-button.hundred` | Supreme Archduke of Repeat Offenders, Sixth of That Name | Press the button 100 times. The button has opinions about this. The opinions have opinions. | no | 5 |
| `the-button.nothing25` | Honorary Fellow of the Royal College of Nothing (Emeritus, Pending) | Witness 25 occurrences of Nothing. Each was different, although legally they are the same. | no | 3 |
| `the-button.tos` | Honorary Doctor of Terms and Conditions | Hear 10 clauses of the Terms of Service. You have not read them. You have been read to, which is worse. | no | 3 |
| `the-button.participant` | Participant (Certificate Misplaced) | Attend the retirement of the button. This is not a victory. Participation has been recorded. | no | 5 |
| `the-button.rate` | Eternal Chief Executive of Rate Limiting | Press so fast that the button calls security. Security is a button. | yes | 3 |
| `the-button.obedient` | Grand Marshal of the Unpressed, Keeper of the Sacred Restraint | Do not press the button for the first 30 seconds. You obeyed the sign. Nobody has done that since it was laminated. | yes | 5 |
| `the-button.twelfth` | Keeper of the Unspoken Twelfth, Defender of the Draft | Be present for the revelation of what happened at press 12. It was a draft. The button wishes you had not seen. | yes | 5 |
| `the-button.lunch` | Eternal Guardian of the Idle Hour, Lord of the Lunch Break | Leave the button alone for 5 minutes, then bring it back from lunch. It brought sandwiches. | yes | 5 |
| `the-button.missing_word` | Sovereign Lord of the Missing Word | Remove NOT from the sign. The sign is now a different, much more frightened sign. | yes | 3 |
| `the-button.hold75` | Supreme Archduke of the Seven-and-a-Half-Second Hold | Hold the button for 7.5 seconds. The button is still deciding how it feels about that. | yes | 7.5 |
| `the-button.negotiator` | Chief Negotiator of the Better Pillow | Negotiate with a striking button. A pillow was offered. It is under review. | yes | 2 |

Use `check(stats)` for `hundred` (`stats['the-button.presses'] >= 100`), `nothing25` (`stats['the-button.nothings'] >= 25`), `tos` (`stats['the-button.clauses'] >= 10`); all others via `api.achieve`. Calling both is fine (idempotent).

---------------------------------------------------------------------------------------------------

## 13. VISUAL DESIGN (summary of the winning palette)

CSS custom properties on `.m-the-button-root`: `--cream:#FFF4DC; --ink:#2B2118; --red:#E8433F; --red-hi:#FF7A6E; --red-lo:#B3271D; --mustard:#F2B632; --mint:#9ADCC0; --lilac:#B8A6E8; --sign:#FFFDF5; --sign-ink:#C8342B; --butter:#FFE98A; --pink:#FFB8C9; --sky:#A8DCFF; --lime:#CDEE8B; --peach:#FFC99E; --spot:#FFF3B0; --tint:rgba(0,0,0,0)`. Do NOT depend on the page background; the root has its own cream background with a faint dotted texture (`radial-gradient` dots). 3px ink outlines and `4px 4px 0 var(--ink)` sticker shadows on every card.

Tier tints (a full-stage overlay using `--tint` and a `filter` on the floor): T0 cool clinical (`rgba(120,170,255,.06)`); T1 neutral; T2 warmer (`rgba(255,160,90,.08)`); T3 beige institutional with a gentle fluorescent flicker (a 7s `opacity` keyframe on the overlay, disabled under reduced motion); T4 golden hour amber (`rgba(255,190,90,.18)`) plus a cushion under the button; T5 back to cool.

Motion: press squish 80ms; slow idle breathing scale 1.0 to 1.015 over 4s (stops under reduced motion); wobble keyframes; the sign sways 1deg (4s ease-in-out infinite) plus lean; the curtains slide; confetti only via `api.confetti` (one piece or none for most outcomes, a real burst only for the jackpot and the ceremony). **The button never shakes the whole page.** Reduced motion: remove sway/shake/breathing/dodge/orbit, keep opacity-only transitions, ToS text appears at once.

Inline SVG is used for: the odometer sprockets (two small gear paths beside the plaque), the picket sign, the hold ring, and the security guard silhouette if the emoji does not render. No `<canvas>`. System fonts only (`ui-rounded, 'Trebuchet MS', system-ui, sans-serif`; sign uses `Impact, 'Arial Black', sans-serif`).

Layout widths: stage `min-height: clamp(300px, 56vw, 460px)`; sign width `clamp(110px, 24vw, 190px)`; button `clamp(150px, 42vw, 270px)`; header items wrap; at narrow widths the Complaints Box moves below the stage (use `flex-wrap`).

---------------------------------------------------------------------------------------------------

## 14. IMPLEMENTATION HINTS

**File skeleton** (stay <= 1800 lines; data arrays one string per line is fine):
1. Header comment `/* POINTLESS module: the-button */`, IIFE, `const P = window.POINTLESS; if (!P) return;`.
2. `P.injectCSS(CSS, 'css-the-button')`: every class `m-the-button-*` (state classes like `.is-down` must be scoped as `.m-the-button-btn.is-down`). Keep CSS under ~330 lines.
3. `P.addAchievements([...])`, optional `P.addLines('m:the-button:...')` not needed (lines are inline).
4. Data section (all pools and tables in sections 8-11).
5. `P.registerModule({ id:'the-button', title:'The Button', tagline:'Do not press. A sign has been laminated about it.', icon:'🔴', category:'game', unlockCost:0, tags:[...], mount(root, api){ ... return { destroy(){...} }; } })`.

**Helpers to write first**
- `bag(arr)` returning `{next()}` with the no-immediate-repeat guarantee (use `api.shuffle`); store bags in a map keyed by pool id; create lazily.
- `fill(str, vars)` replaces every `%X%` token; after replacement run `clean(str)`: if the result still contains `%`, `undefined`, `NaN`, `null` or `[object` then replace it with the safe line `Nothing happened. Management is looking into it.` and `console.warn` is NOT allowed (do not log).
- `speak(who, text, opts)`: applies season prefix, then (a) updates the bubble (Button) or caption strip (Management/stage direction), (b) pushes into the ticker (cap 6; remove oldest `<li>`), (c) calls `api.say(text, {who, mood, priority, duration})`. Throttle `api.say` to once per 450ms for priority 0 lines (still update the DOM).
- `pressAnim(on)` toggles `.is-down` and plays `api.sfx('tick')`.
- `setMode(next)`: clears `modeTimers` array via `api.clearTimeout` and tears down mode visuals (smoke, picket, guard, scared tint, away note), then sets `mode`.
- `later(ms, fn)` = `api.setTimeout(fn, ms)` that returns the handle, optionally pushes to `modeTimers`.
- `tierOf()`, `signStage()`, `renderSign()`, `renderOdometer()`, `renderWear()`, `renderFace()`, `placeNote(text)`, `showCard(kind, ...)`.
- A `once(key)` helper for per-session one-shots (`sessionFlags`).

**Engine rules to respect**
- Use ONLY `api.setTimeout/setInterval/requestAnimationFrame/on` (the lint forbids bare ones). Never `Date.now`/`performance.now` (use `api.now()`). `new Date()` only for the hour/minute check, inside try/catch.
- Never touch `document.body`. Typed-word and resize/visibility listeners use `api.on(document, 'keydown', ...)`, `api.on(window, 'resize', ...)`, `api.on(document, 'visibilitychange', ...)`.
- Call `api.stat.inc('the-button.<x>')` for every key action; `api.award` regularly; `api.say` regularly. On mount: `api.setTitle('The Button')`, `api.say(opening line)`, and `api.stat.inc('the-button.visits')`.
- `api.flag.get('metGerald')` read-only. Write nothing to shared flags except `the-button.ceremony` (set true after the first ceremony).
- Duplicate key handling: Enter/Space `keydown` on the button must `preventDefault()` (stops the native click on Enter); `keyup` for Space must also `preventDefault()`.
- `setPointerCapture` and `releasePointerCapture` always inside try/catch (synthetic events from the fuzz harness have no active pointer).
- Persistence writes via a single `persist()` debounced with `api.setTimeout`; also call on `destroy()`.
- The `destroy()` must: set `dead = true`, remove any created overlay nodes (`root` removal is handled by engine, but custom nodes appended elsewhere must not exist: everything lives inside `root`), clear mode timers; any callback created with `later` begins with `if (dead) return;`.
- **Overlay discipline**: never more than one of each overlay slot exists; create once and toggle; remove oldest sticky notes beyond 8; ticker 6; wear 7; dialogs 1; question cards 1; confetti handled by the engine.
- Reduced motion helper `RM` (boolean) read once at mount and on `matchMedia` change if cheap; if not available, treat as false.
- Number formatting for visible stats: `api.fmt(n)` for Meh; odometer is digits only and uses `Math.min(99999, n)`.
- Eye tracking: one `pointermove` listener on `root` storing target coordinates; one `api.requestAnimationFrame` loop that runs ONLY while the face exists and the pointer moved in the last 1.5s (stop the loop otherwise; no unconditional per-frame rAF forever).
- Blink and sweat timers: one self-rescheduling `api.setTimeout` chain, not many intervals.
- Hold ring and lean are CSS transitions driven by classes; JS only toggles classes.

**Testing hints**: `node tools/lint.js games/the-button.js`, then `node tools/selftest.js the-button --steps 400 --seed 1` plus seeds 2, 3 and 7; then `node tools/shot.js the-button reports/shots/the-button.png --actions 40`; look at the PNG at width 360 and 1400.

---------------------------------------------------------------------------------------------------

## 15. IDLE AND SPAM SUMMARY (checklist for the builder)

- **Long idle**: 30s obedience (no presses yet), 60s pretending, 120s self-press, T4+ reflective at 25s, 5 min vanishes to lunch (7 plinth clicks return it, with achievement), 20 min rain note. In selftest all of these are shortened (section 4).
- **Spam**: 8 presses in 2s -> Overwhelmed 3s + -1 Meh fee; cumulative ignored presses 40 -> Strike (negotiate: better pillow); 100 -> Security escort and the sunglasses wear. All handled by the mode machine.

---------------------------------------------------------------------------------------------------

## 16. CONTENT TALLY (acceptance checklist; all counts are text-bearing, verbatim above)

Nothing generator variants (14 times x 12 places, 8 witnesses, 4 cases, 6 appeals, 6 forecasts, specials) ~ 60+ distinct outputs; TS 9; TV 12; Dialogs 8 (+ESC dialog); ToS 24 clauses + 12 directions + 3 set lines; Opinions T0-T5 57 + 8 knowing; Sticky notes 24; Physical 8 + 5 wear + reset; Ledger 13; Cameo ~20; Meta 16; Firm 4; Lingering 5; Occurrence 3; Aborted 6; Rim 6; Plinth 6; Box 6; Hover 5; Rumours 6; Small exchanges ~19 lines; Hug 5; Typed words 8; Questions 5 cards; Spam/Strike/Escort ~12; Idle ~20; Ceremony ~25; Jackpot 4. Total well above 250 distinct text outcomes: >= 100 distinct press outcomes in 14+ families, as required (SPEC requires >= 80 lines, >= 3 callbacks (Gerald, Sandra, Toaster, Dennis, Tuesday, 7 1/2), >= 3 secrets (7 here), long-idle (yes), spam (yes), >= 6 achievements (12) with >= 2 secret (7)).

---------------------------------------------------------------------------------------------------

## 17. RISKS: THE 5 MOST LIKELY IMPLEMENTATION BUGS

1. **Double-counted or lost presses.** Pointer events, the native `click`, and Space/Enter keyboard events can all fire for one human action (Space-up fires a click even if keydown was prevented; Enter fires click on keydown; the fuzz harness may send only `click`, or `mousedown/mouseup/click` without pointer events). Fix: all real input goes through ONE `registerPress()`; `keydown`/`keyup` for Space/Enter call `preventDefault()` on both; the `click` handler registers only when no pointer/key sequence ran in the previous 700ms (`api.now()`); keep a `lastInputAt` stamp. Test: one Space tap must equal exactly +1 press; one mouse click +1; one synthetic `click` +1.
2. **Stuck holds and dangling pointer state.** `pointerup` can be lost (pointercancel, blur, tab hidden, Escape, `setPointerCapture` throwing on synthetic events), leaving `.is-down` stuck and the 7500ms/10000ms hold timers firing later (an Archduke event with no hand on the button, or a hold that registers as 20 seconds long). Fix: one `endHold(reason)` that always clears hold timers and `.is-down`; call it from pointerup/cancel/lostpointercapture/blur/visibilitychange/destroy/Escape; the 7.5s timer callback re-checks `hold && hold.id === myId && !dead`.
3. **Overlapping modes and timers (strike, escort, away, scared, ceremony, jackpot, reading).** A press during a transition, a destroy mid-ceremony (the harness destroys and remounts once mid-run), or Skip pressed at step 3 can leave smoke, a picket sign, a curtain, or `mode` stuck, or fire a late callback on a dead module (errors after destroy FAIL the run). Fix: one `setMode()` that tears down the previous mode's visuals and timers; every delayed callback begins `if (dead || mode !== expected) return;`; the ceremony keeps its timers in an array, Skip clears them then runs step 12-14 directly; verify with a selftest run that warps to the ceremony.
4. **Threshold and scripted-event logic using `===` or re-firing on reload.** Tiers, sign stages, scripted presses (5, 10, 12, 26, 30, 50, 60, 70, 99, 100, 120, 125, 150, 180, 213, 250, 260), Sandra flag cadence and the selftest warp can jump the counter over a number, replay events after a remount (the save persists presses), or play twice if two presses race. Fix: use `>=` plus an `S.done[id]` flag set BEFORE running the event; derive tier/sign stage from the counter with pure functions called after every press and on mount (render without announcing when restoring a save); when warping, mark skipped scripted ids done; guard the ceremony with `mode==='ceremony'`.
5. **Text hygiene and unbounded DOM.** Tokens left unreplaced (`%NO%`, `%P%`, `%CPS%`), a `NaN` in the odometer or `%CPS%` when there are fewer than 4 intervals, `undefined` from an empty bag or a tier with no pool, or the forbidden word fragments in visible text; plus DOM growth from sticky notes, ticker rows, wear items, dialogs, question cards and the sign's word buttons if re-rendered by appending instead of replacing. Fix: `fill()`+`clean()` on every outgoing string; guard every divisor and `toFixed`; `bag()` returns a safe line if empty; renderers replace children instead of appending; caps (notes 8, ticker 6, wear 7, one dialog, one question, one micro button) enforced inside the creators, and the node-count test at step 100 vs end stays under 5x.

---------------------------------------------------------------------------------------------------

## 18. BUILDER NOTES (corrections made while building games/the-button.js)

- Emoji newer than Emoji 12 are empty boxes on Windows 10 (lint errors on them): the mustache is drawn with CSS instead of the disguised-face emoji, and the plant wear item is the herb emoji instead of the potted plant.
- The ceremony curtains frame the stage (two side drapes) instead of covering all of it, so the button, sign and plaque stay visible during the tribute.
- Selftest warp is tuned to the fuzz's real press rate: the 5th registered press jumps to 118 and the 12th to 258 (the fuzz only manages about 15 presses per mount).
- Tab order is DOM order: the header row is moved to the top visually with CSS `order`, so the Feelings faces are last in the tab order as specified.
- The away note on the plinth is a real button, so keyboard players can fetch the button back from lunch (7 activations).
