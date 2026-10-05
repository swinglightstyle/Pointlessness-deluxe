# WHACK-A-NOTHING - Final Design Brief

Module id: `whack-a-nothing` (file `games/whack-a-nothing.js`). Category `game`. Tags `['timing','judged','whack']`. Icon `🔨`. `unlockCost: 0` (the integrator may raise it). Title `Whack-A-Nothing`. Tagline: "Whack at the exact moment nothing peaks. A panel of three will grade you out of a total you cannot reach."

This brief merges three writers' pitches. Kept: pitch 1's real-time Nothing with Stir / Rise / Peak / Sink phases, the three-judge panel (Plimsoll, Quill, Finch and his 7½), the Hush round, ghost mallet, annexing board, postcard-catching and Retirement Gala. Kept from pitch 2: the Replay Timeline sentence ("Nothing occurred 214 ms before you. Nothing was not told."), the clause-creep gag, the Folding Chair, the eyes-in-the-hole rare event, and the idle "eyes". Kept from pitch 3: Pre-Nothing, Gavin the mallet, Rain Delay (Indoors), the Witness Statement bit (shortened), Gerald as guest judge. Cut as unbuildable or redundant: the bracket tournament, Hole Union, 4x4 Premium holes, red-yarn corkboard, 12-camera replay, the H "hush hold" key, the Appeals window as a separate overlay (the scorecards ARE the appeal buttons), heat-map view, mole-whacks-back secret.

Naming decisions: the mole is **Barry** ("B.", "Congratulations, Barry"). The judges are **Judge Marguerite Plimsoll** (Technical Merit), **Judge Hobart Quill** (Artistic Impression of Nothing), **Judge Finch** (Consistency). Every module stat and flag is prefixed `whack-a-nothing.`.

---

## 1. Concept

A fully staffed whack-a-mole lawn on which no mole has ever appeared. Management insists the mole is scheduled. What DOES occur is a Nothing: an empty hole stirs, a dotted outline of a mole-shaped absence rises out of it, peaks, and sinks. You whack at the exact peak. The timing is real and measured to the millisecond; the thing being timed is not there. A three-judge panel grades every whack out of 30. The maximum possible panel score is 26.5, because Finch always holds up 7½ and the other two top out at 9.5. The scoreboard says "of 30 (30 not available at this time)". It is mathematically impossible to win.

Arc (VOICE.md): normal (one hole) -> weird (panel arrives late, rumors) -> bureaucratically unhinged (appeals, Hush rounds, ghosts, Hole 5 on a break) -> strangely touching (postcards, the judges applauding the player because the mole sent regrets) -> back to normal like nothing happened (lawn resets to one hole, "nothing happened"). Then it loops forever as "Whack-A-Nothing (Continued)".

---

## 2. Controls and exact interactions

### 2.1 Whacking
Timing error = |whackTime - peakTime| in ms, using `api.now()` captured on `pointerdown` (mouse and touch) or `keydown` (keyboard). Never use the `click` event for timing. Add a `click` fallback ONLY when no `pointerdown`/`keydown` for that button was seen in the last 60 ms (the fuzz harness and some assistive tech send bare clicks); dedupe so one physical action never grades twice.

- **Mouse:** over the lawn the real cursor is hidden (`cursor:none`, only when `matchMedia('(hover:hover) and (pointer:fine)')` matches) and replaced by a `🔨` span (`pointer-events:none`) that follows the pointer using a CSS `transform` with `transition: transform 90ms ease-out` (lag) and a tilt of `rotate(clamp(vx*0.4, -25, 25)deg)` from horizontal velocity. `pointerdown` = whack: mallet animates to `rotate(-70deg) scale(0.9)` over ~90 ms (`transition`), spawns a dust ring (a radial-gradient circle that scales and fades), plays `whoosh`.
- **Target selection:** the hole under the pointer; if the pointer is on bare lawn, the nearest hole whose centre is within 90 px; if none, it is a lawn whack (always "unscheduled").
- **Touch:** tapping a hole is a whack; the mallet drops at the tap point (the mallet span is hidden on touch devices, only the dust ring and a quick mallet flash show). Hole buttons are at least 64px tall at 360px width.
- **Keyboard:** holes 1-9 map to `KeyQ KeyW KeyE / KeyA KeyS KeyD / KeyZ KeyX KeyC` (use `event.code`) and numpad `Numpad7 Numpad8 Numpad9 / Numpad4 Numpad5 Numpad6 / Numpad1 Numpad2 Numpad3` (the numpad is physical, so Numpad7 = hole 1 top-left and Numpad1 = hole 7 bottom-left). Arrow keys move focus between hole `<button>`s in DOM order (spatially by grid: Left/Right +/-1, Up/Down +/- columns, skipping hidden holes). Space or Enter on a focused hole whacks it (handle on `keydown`, `preventDefault`, ignore `event.repeat`). Tab reaches every hole, the scorecards, the postcards and the Rumor Board. Holes 10, 11, 12 and 7½ are reached by arrows/Tab only (they have no letter key).
- **Esc:** harmless. Management says one of the `esc` lines (rate limited to once per 30 s). It also cancels a postcard hold in progress.
- Keys are ignored when `event.target` is an input/textarea (there are none, but be safe) and when a modifier (Ctrl/Alt/Meta) is held.

### 2.2 Grades (error, label, Meh via `api.award`)
| Condition | Label | Effect |
|---|---|---|
| err <= 40 ms | `Nothing, Perfected` | `ding`, tiny confetti, +2 Meh, stat `.perfects` |
| err <= 120 ms | `Textbook Nothing` | +0.8 Meh |
| err <= 250 ms | `Adequate Nothing` | +0.4 Meh |
| err <= 450 ms, early | `Premature Nothing` | `boing`, +0.1 Meh, stat `.premature` |
| err <= 450 ms, late | `Belated Nothing` | `sad`, +0.1 Meh, stat `.belated` |
| otherwise, or no Nothing active in the targeted hole | `Unscheduled Whack at Pure Nothing` | +0.1 Meh at most once per 2000 ms (else 0, but still graded and stamped) |

- A graded whack (err <= 450) consumes that Nothing (it pops into a puff and vanishes). A whack with err > 450 does NOT consume it.
- The grade label is stamped on the lawn: a rotated rubber-stamp `div` (double border, coral, `mix-blend-mode:multiply`), fades after 1 s, `stamp` sfx. Keep at most 12 stamp nodes in the DOM (recycle the oldest).
- Streak: consecutive Adequate-or-better whacks. Streak counter appears at Stage 2. Track `bestStreak` in `api.save` and `api.stat.max('whack-a-nothing.streak', n)`.
- Always `api.stat.inc('whack-a-nothing.whacks')` per processed whack, graded or not (whacks swallowed during fatigue are not counted).

### 2.3 The Nothing (one hole, four phases, no gauge)
`dur(T)` = `max(900, 1800 - 900 * (T / 420))` ms where T is the escalation clock in seconds (see section 4); first loop 1800 -> 900 by minute 7. Under `api.selftest` multiply by 0.6. Let `start` be the spawn time; `peakAt = start + 0.65*dur` (computed up front from `api.now()` at spawn; NEVER recompute the peak from a timer callback).
1. **STIR** (0-35%): hole rim jiggles (CSS keyframes, 2-3 dust crumbs fall; `tick` sfx quietly). Skipped under reduced motion (a tiny static ring instead).
2. **RISE** (35-65%): an inline SVG dotted outline of a mole-shaped absence (a dashed silhouette, a faint `∅` at its centre) rises out of the hole. The inside of the outline is filled with exactly the lawn colour so you are watching nothing, outlined. Dashes march (stroke-dashoffset animation).
3. **PEAK** (at 65%): outline is tallest, dashes snap solid for ~80 ms (add class `peak` then remove).
4. **SINK** (65-100%), then **VANISH**.

There is no timer bar. The hole's own phase is the only cue. One 33 ms `api.setInterval` ticker evaluates every active Nothing from `api.now()` and only touches the DOM when a phase changes (do not use one `setTimeout` per phase; do not use `requestAnimationFrame` for the logic). Each hole owns one persistent `<svg>` and 3 pooled crumb spans, toggled by classes.

An occupant roll at spawn time (all rolls via `api.rand`):
- **Toast:** 1 in 150 (selftest: 1 in 20), only if Hole 4 exists and is free: the Nothing is replaced by a toast slice at Hole 4 (secret 4). `pop` sfx is used ONLY for this event.
- **Eyes:** 1 in 400 (selftest: 1 in 30): a normal Nothing, but at the peak frame two tiny CSS dots (eyes) appear in the dark of the hole for one tick (~120 ms) (rare event 6).
- **Twin on 7½:** from Stage 7, one spawn in four also spawns an identical Nothing (same start, same peak) on Hole 7½.

### 2.4 The Panel
Three busts above the lawn as emoji faces on coloured circles with mustard name plaques (🧐 Plimsoll, 🎩 Quill, 🧓 Finch). Each has a scorecard `<button>` (a paddle: a flip card, `rotateX(180deg)` on reveal; reduced motion: no flip, just show). After every graded whack the paddles reveal one at a time, 300 ms apart (`tick` sfx per reveal, `bell` on the third). If a new whack arrives mid-sequence, bump a `roundToken`, reset paddles to the blank face, and run the new sequence; every reveal callback must compare its captured token first.

Scoring (cosmetic but deterministic enough that the player can feel it). All scores in half points:
- **Plimsoll (Technical Merit, 0-9.5):** by err: <=40 -> 9.5; <=80 -> 9; <=120 -> 8.5; <=180 -> 7.5; <=250 -> 6.5; <=350 -> 5; <=450 -> 4; otherwise or unscheduled -> 2. Then `-0.5` "posture of the mallet" whenever a shuffle bag of `[0,0,0,1]` (reshuffled when empty) yields 1. Clamp to 0..9.5.
- **Quill (Artistic Impression of Nothing, 0-9.5):** base 7. +1 if this hole differs from the previous whack's hole; +1 more if the last three whacks were on three different holes; -1 if this is the third consecutive whack on the same hole. Clamp 0..9.5.
- **Finch (Consistency):** ALWAYS 7.5. For Perfected, for an unscheduled whack, for a whack that did not occur.
- Panel total shown under the panel: `Panel total: {total} of 30 (30 not available at this time)`. Max 26.5. 30 is "reserved".
- Running line under the panel: "Panel average: X.X of 30" over the last 10 graded whacks (optional cosmetic).
- Judge text (the `judge*` line categories) fires on roughly every third graded whack, not every one (never the same line twice in a row).
- **Clause creep (Plimsoll):** each time the posture deduction fires, increment `deductions`; pick `clauseLines[min(deductions-1, 4)]` in order: clause 4(a), clause 4(a)(ii)(c), clause 11½ ("found in a cupboard"), "the clause appendix to the clause appendix", clause 4:17 PM. After the 6th deduction, alternate with the "previous mallet" blame line.
- **Finch gag escalation (strictly in order, then random Finch lines):** (1) deadpan 7½; (2) Management notes it is "consistent"; (3) Plimsoll asks if Finch has considered a 7, Finch holds up 7½ in reply. Callbacks: Perfected -> the other two judges slowly turn to stare at Finch; Hush -> "a very quiet 7½"; Finch appeal -> "7½ (upheld, 7½)"; Gala -> his paddle is a party hat that reads 7½. The Rank ladder footnote reads: `Finch not included in the rank algorithm because Finch is the rank algorithm.`
- **Guest slot** (unlocks at 3:00, at most once per 3 minutes, 1 in 15 graded whacks): replaces Quill for ONE panel. Alternate Gerald, then the Folding Chair. Gerald's paddle shows `~` and he says a philosophical observation ("the color of Thursday"); if `api.flag.get('metGerald')` is true use the recognition lines, else the stranger lines and `api.flag.set('metGerald', true)`. The Folding Chair always scores 5.0.

### 2.5 Rank ladder (cosmetic)
Six ranks: Apprentice of Nothing, Associate Under-Whacker, Senior Under-Whacker, Principal Whacker (Acting), Director of Air Strikes, Grand Emeritus Under-Whacker. The ladder appears after the panel (Stage 1). Each graded whack adds points (Perfected 3, Textbook 2, Adequate 1.2, others 0.4, Hush success 4, Duet 3). Rank n needs `14 + 6n` points. The striped progress bar fills asymptotically so it reads at most 99.9% (display `Math.min(99.9, pct)` to one decimal). When points are complete: show `99.9%` for 2 s, stamp `RANK REBALANCING` (coral, rotated), bar drops to 12%, rank advances. After rank 6, loop to rank 1 with `(Returning)` appended (on later loops write `(Returning x{n})` instead of repeating the suffix). Save the rank in `api.save`.

### 2.6 Appeals
From Stage 4 (2:30) every scorecard can be appealed: click, Enter or Space on its button. The paddle spins for 8 s of "deliberation" (CSS `rotateX` loop, selftest 1 s; the number stays readable mid-spin), then returns with the SAME number plus a rubber stamp chosen from a shuffle bag of five distinct stamps: `UPHELD`, `DENIED`, `UPHELD, DENIED`, `NOTED`, `FILED` (reshuffle when empty, so five appeals give five different stamps). Fee: `api.award(-0.2, 'Appeal fee')` at filing. One appeal at a time per judge (a second click says the `appealBusy` line). Stat `.appeals` increments on completion; achievement at 5 completed. Finch's appeal result text is special (`appealFinch`). Cancel all appeals on gala/reset.

### 2.7 Micro-events (shuffle bag, one roughly every 12-20 s once Stage 1 is reached; selftest 1-2 s)
Bag: `draft`, `dennis`, `heckle`, `rumor` (if Stage >= 3), `blink-single`, `sandra`, `rain` (if Stage >= 2). Draw without replacement, reshuffle when empty, never the same twice in a row. Do not fire during Hush, gala, fatigue, or while a postcard overlay is open.
- **The Draft:** a 🍃 leaf crosses the lawn left to right over ~5 s (a `<button>` so it is whackable; 1 element, reused). Whacking it: foul of "Something" (`foul` line, -0.1 Meh, stat `.fouls`).
- **Dennis (Plant):** 🪴 sprouts out of a free hole, sulks 5 s, retracts. From Stage 7 he always uses Hole 2 and is bigger each time (`scale 1 + 0.15*k`, max 2). Whacking him: `dennisWhack` line, +1 leaf on a cosmetic `🍃 x N` counter. Hole 2's aria-label changes while he is present.
- **Judge heckle:** two judges argue in speech bubbles (a `heckle` line).
- **Rumor flag:** plants a 🪧 on a hole (section 3).
- **Single blink:** one judge blinks (emoji face swaps to `😑` for 150 ms). Cosmetic; this is the cover for secret 3.
- **Sandra audit:** a `micro` Sandra line via `api.say` plus `api.toast`. (Stat `.toast` counts toast-slice events only, see secrets.)
- **Rain Delay (Indoors):** scheduler paused 5 s (selftest 1 s), ☂️ emojis over every visible hole, `rain` lines at start and end. Nothings already in flight finish normally.
- **Gavin:** once only, at T >= 3:00: the mallet is named Gavin (`gavin` line), and the mallet span gets `title="Gavin"`.

---

## 3. Rumors, Hole 5, Hush, Ghosts, Postcards

### 3.1 The Rumor Board (Stage 3, 1:45)
A clipboard panel (the Rumor Board) holds at most 4 visible 🪧 notes, each: text, `Source:` line, `Confidence:` line. A rumor is planted every ~12 s on a random free hole (a 🪧 flag on the hole) and expires after 20 s, replaced by a "corrected" rumor (`rumorCorrection` line, new entry). Ticker strip on the board shows the newest rumor. Each rumor is more specific and less plausible than the last; sources get worse (worm with a lanyard -> pigeon on a cable -> sock in transit -> pebble who was there -> ...). Confidence is always `moderate-to-elevator` except Dennis's rumors (`very high; a plant would know`). Rumors are always about the mole and always wrong, then confirm something else (the Hole 2 rumor is about Dennis). The Rumor Board notes are `<button>`s: clicking one flips it to `Source: a hole.` (cosmetic, 1 s).
- **Rumor Adjacency:** whacking a hole carrying a 🪧 at err <= 120 ms: stamp `Rumor Adjacency`, +0.5 Meh extra, stat `.rumors`, the flag is removed.
- The only TRUE rumor: at T = 6:00 (loop 1) a rumor reads "The mole will send a postcard." Source "the worm with a lanyard (now credible)". 
- Toaster rumor at T = 5:30: "The toaster has been seen near a lawn." Then a toast slice is GUARANTEED at Hole 4 within 25 s (secret 4).
- After any toast event, for 5 s the board shows the rumor "Moles do not like toast." It is never explained.

### 3.2 Hole 5 is on a break (Stage 4)
At 2:30 Hole 5 (centre of 3x3, key `S`) grows a "Back in 5" sign and stops producing Nothings (its button stays focusable). Whacking it during the break: stamp `RUDE`, the `hole5Rude` line, -0.1 Meh. It returns at 6:30 in a tiny 🎩 with opinions (`hole5Return`); at 7:30 it tapes a note asking for a raise (`hole5Raise`). In loop 2 and later the sign reads `Back in 5 (revised: 7½)` and the break begins at Stage 4 and ends at Stage 8 as before. At the Gala Hole 5 hosts Table 5.

### 3.3 The Hush Round (Stage 5, first at 3:30, then every random 60-90 s of escalation clock)
A coral banner `SILENCE IN PROGRESS` drops (CSS spring; reduced motion: appears). Lawn gets `filter: grayscale(1)` for 10 s (selftest 2 s). Nothings keep stirring, but the player must NOT whack (any input that would whack counts). Whack = `buzz`, stamp `Class C Noise`, -0.2 Meh, `hushFail` line, round ends as failed, stat `.hushfails`. Surviving the full 10 s: `Serenity points: 4`, +1 Meh, panel reveals Plimsoll 9, Quill 9.5, Finch 7.5 ("a very quiet 7½"), stat `.hushes`, rank +4. During every Hush spawn a leaf crossing at 4 s; surviving without whacking the leaf is the condition of achievement `whack-a-nothing.stillness`. Hush never starts during fatigue, a postcard hold, or gala. On Hush start, clear any pending reveal timeouts.

### 3.4 Ghosts of Whacks Past (Stage 6, 4:30)
Record `{hole, t}` of every processed whack from 4:30 onward (keep only the last 20 s, cap 60 entries). Each whack schedules (with `api.setTimeout`) a ghost replay at `t + 20000` (selftest `t + 2500`): a lilac `#b9a4e6` 50%-opacity mallet drops on that hole with a trailing box-shadow (reduced motion: fades instead). Skip the ghost if the hole no longer exists or the mode is gala/hush. **Temporal Duet:** when a ghost whack fires and the player whacked the same hole within 80 ms (either direction: at ghost fire check the player's last whack; at player whack check the last ghost fire), award +1 Meh, stamp `TEMPORAL DUET`, then Sandra fines 0.2 Meh (`api.award(-0.2)`), stat `.duets`.

### 3.5 The Postcard (6:30 and 7:15; the final one at 8:00 starts the Gala)
A cream `#fdf0c9` postcard with a teal border `#2f8f8a` and a CSS stamp (a dashed square with an emoji) flutters in like a leaf as a rotating, drifting `<button>` (sine drift; reduced motion: it simply sits). Only one postcard on the lawn at a time.
- **Catch:** press and hold on it for 1.5 s (selftest 0.3 s), pointer or Space/Enter held. A conic-gradient ring shows progress. Releasing early or moving off cancels the hold.
- **Whack it** (a quick press, released in under 300 ms, counted as a tap) damages it: stamp `DAMAGED`, a follow-up postcard "about the damage" arrives 15 s later (the damaged variant of postcard B).
- Caught: it pins to the **Postcard Wall** (12 fixed slots, each a tiny stamp; the newest takes the first free slot, then the oldest is replaced), a reading panel opens with a Flip button (front: "Greetings from Somewhere Lower!" with a CSS sun that is a hole; back: the text) and a Done button. Reading the back and pressing Done after >= 3 s counts as "read fully".
- Achievement `whack-a-nothing.postmaster` (secret): caught an undamaged postcard AND read the back fully.
- If a postcard sits untouched for 45 s it is "delivered by courier" to the wall, unread and undamaged but ineligible for the achievement.
- Under Hush/ghost, postcards keep drifting; the player must be calm during chaos.
- The wall also shows `cc: A Worm (Credible)` once the worm cc appears on a postcard (postcard B).

### 3.6 Annexation (Stage 7, 5:30)
Holes 10, 11, 12 are added "without consultation", making a 4x3 board; then a half-width Hole 7½ appears clipped by the lawn edge (a real full-height `<button>` positioned at the lawn's right edge with `overflow:hidden` on the lawn, half visible, between 7 and 8 in DOM and tab order). Whack on 7½ at err <= 120 -> `whack-a-nothing.seventh-half`. The Toaster rumor starts here (3.1).

---

## 4. Escalation timeline (state machine)

Single escalation clock `T` (seconds). `T` advances only while the player has given input within the last 45 s (so idling pauses escalation and the Idle secret is clean), times `TS` where `TS = api.selftest ? 10 : 1`. Loops >= 2 run the stage thresholds at 0.5x (stages arrive twice as fast), and the Nothing duration restarts at `1500` falling to `900`.

Exactly one `mode` at a time: `'play' | 'hush' | 'fatigue' | 'gala' | 'idleauto'`. Define `canWhack()` (false only during `fatigue`, which swallows whacks with a sigh and `ON BREAK` stamp; during `gala` whacks hit tables: 0.1 Meh at most once per 2 s and the `galaTable` line). Hush, fatigue and gala all clear active Nothings and pending panel/ghost timeouts on entry.

| Stage | T | Beat |
|---|---|---|
| 0 | 0:00 | THE ORIENTATION HOLE. One large centred hole, no panel. Management welcomes you and says the first Nothing is scheduled for 12:00:03. First Nothing stirs at 3 s (selftest 0.5 s). "Whack anywhere to learn." Sponsor banner: "Hole 1 is sponsored by Dennis (Plant)". Nothing else on screen so the first graded whack is an event. |
| 1 | after first whack (or 0:45 regardless) | THE PANEL ARRIVES LATE. Chairs wheeled in, judges apologize for the time, they review the first whack "on tape". First reveal sequence with Finch's deadpan 7½. Scores accumulate; rank ladder appears. |
| 2 | 1:00 | THE LAWN OPENS (3x3). Eight holes unfold with `whoosh`. Max 2 simultaneous Nothings; shuffle bag so no hole repeats immediately. Streak counter appears. Quill's pattern-repetition deduction is now felt. Rain Delay available. |
| 3 | 1:45 | THE RUMOR MILL. Flags, Rumor Board, rumor ticker; the mole is first mentioned as an HR matter. Micro-event `rumor` joins the bag. |
| 4 | 2:30 | HOLE 5 TAKES A BREAK, AND APPEALS OPEN. Scorecards become appealable buttons. |
| 5 | 3:30 | THE HUSH ROUND (first), then every 60-90 s. Guest slot and Gavin unlock at 3:00 (just before). Max 3 simultaneous Nothings. |
| 6 | 4:30 | GHOSTS OF WHACKS PAST begin recording; first ghost at 4:50. Quill whispers at 5:00 (once): "Was any of this the point?" |
| 7 | 5:30 | THE BOARD ANNEXES ITSELF (4x3 plus 7½); Dennis grows from Hole 2; the Toaster rumor and the guaranteed toast. 6:00: the true rumor. |
| 8 | 6:30 | THE POSTCARD (and Hole 5 returns). 7:15 postcard B. 7:30 Hole 5 asks for a raise. |
| 9 | 8:00 | THE RETIREMENT GALA (section 9). Ends with the reset; `loop += 1`, `T = 0`, `mode = 'play'`. |

Spawn cadence (gap between a Nothing ending and the next spawn, ms): Stage 0-1 `2200-3200`; Stage 2-4 `900-1600`; Stage 5+ `700-1300`. Hole choice: shuffle bag over free, visible, not-on-break holes (refill when empty, never the same hole twice in a row, never a hole with Dennis/toast on it). In selftest divide gaps by 3.

Persistence (`api.save`, module keys): `rank`, `rankPts`, `rankLoops`, `postcards` (array of postcard ids, cap 12), `whacks`, `bestStreak`, `loop`, `appeals`, `deductions`, `zSigned`, `gavin`. Each mount restarts at Stage 0 (T = 0) but with the saved `loop`, rank and wall. Saves are written at most once per 2 s and on destroy-safe events (never from `destroy`, use `api.save` through a debounced `api.setTimeout`).

Stats (all `api.stat.inc`, prefix `whack-a-nothing.`): `whacks perfects premature belated appeals hushes hushfails duets postcards rumors toast fouls unobserved fatigue zwhack eyes gala`; `streak` via `.max`.

---

## 5. Secrets and rare events

1. **THE LONG IDLE.** "Input" = `pointerdown`, `keydown`, `touchstart`, `pointermove` (>30 px since the last counted move). At 60 s: `idle60`. At 90 s: the holes talk among themselves (speech bubbles over three holes rotating through the `holeChat` lines, 1 every 6 s). At 120 s: `mode = 'idleauto'`: Nothings begin appearing and peaking on their own, the panel scores them automatically (a simulated whack at error 60-300 ms), Finch holds up 7½, the rank ladder advances by itself, `idle120` line, +0.1 Meh per auto-score. At 150 s: one hole shows two polite eyes for 800 ms (`idleEyes` line). At 180 s uninterrupted: `idle180`, +10 Meh, achievement `whack-a-nothing.idle`. At 600 s: `idleOOO` (an Out of Office message from the mole). ANY input ends it: `idleEnd` ("We have noticed you. The nothing has not.") or, if idle was between 60 and 120 s, `idleBack`. Selftest: divide all idle thresholds by 30.
2. **THE SPAM (WHACK FATIGUE).** 12 processed whacks within 3000 ms (sliding window, cooldown of 20 s before it can re-trigger) -> `mode = 'fatigue'` for 6 s (selftest 1 s). The mallet gets a tiny lanyard and sags (add a `🪪`, rotate the mallet 60deg); the judges all leave (busts hidden, paddles face down; Finch stays behind holding a 7½ in each hand); a 0.1 Meh Excess Whack Levy (`api.award(-0.1)`); whacks produce only a tired `sad` sound and an `ON BREAK` stamp. After 6 s the judges return with biscuits (a CSS plate with 🍪 emoji) and score the whole spam retroactively as one piece, "Study in Urgency" (Plimsoll 6.5, Quill 8, Finch 7.5, biscuits 9). Stat `.fatigue`, achievement `whack-a-nothing.fatigue` (secret).
3. **THE UNOBSERVED WHACK.** Each judge blinks on its own timer every 8-14 s (150 ms of `😑`). On 1 in 12 blink events all three blink in sync for 400 ms. A whack landing inside that 400 ms window (any grade) is Unobserved: the paddles show blurred `?` (CSS `filter: blur`), `unobserved` lines, no Meh, stat `.unobserved`, achievement `whack-a-nothing.unwitnessed` (secret) on the first one. (Hint in a line: "The judges blinked together just then.")
4. **THE TOAST.** The Toaster pops one slice of toast at Hole 4 (`pop`, the only pop in the module). The panel is hushed (paddles blank). Whack it: `toastWhack` ("This was breakfast."); let it sink: `toastSpared`. Toaster speaks in toast: one slice per sentence ("Toast."). Either outcome: stat `.toast`, +1 Meh, achievement `whack-a-nothing.toast` (secret). Then the 5 s rumor "Moles do not like toast."
5. **THE Z-WHACK.** Whack Holes 1, 2, 3, 5, 7, 8, 9 in that exact order with the last seven processed whacks spanning <= 8000 ms: a Z of scorch marks (7 dark ellipses, one per hole, 8 s) is drawn, `zwhack` lines, +5 Meh once per session (flag `whack-a-nothing.zSigned`, in-memory only so it resets each mount), stat `.zwhack`, achievement `whack-a-nothing.zwhack` (secret). Note: Hole 5 is on a break during Stage 4-7, so the Z is available only during Stage 2-3 and from Stage 8.
6. **THE EYES (rare).** 1-in-400 Nothings (see 2.3) shows two eyes at peak. Whacking that Nothing at err <= 250: achievement `whack-a-nothing.eyes` (secret). `eyes` lines. Management refuses to confirm the sighting.
7. **SMALL WINDOW.** When the root width crosses 480 px (via `resize` and a `ResizeObserver` fallback to `api.on(window,'resize')`), at most once per 60 s: `resize` line. (Layout changes only in CSS.)
8. **HOLE 7½ whacked 7 times** (cumulative, saved): Gerald appears on the bench ("The half is the whole, slightly wrongly."). Cosmetic; once.

Never place the long idle, spam or toast on the critical path of any other beat; they must not break the Stage clock.

---

## 6. Achievements (declare with `P.addAchievements`; ids prefixed `whack-a-nothing.`)

| id | Name | Desc | secret | reward | check |
|---|---|---|---|---|---|
| `whack-a-nothing.perfected` | Grand Marshal of the Unoccupied Aperture | Land your first Nothing, Perfected (within 40 ms). Judge Finch holds up 7½ in congratulations. | no | 5 | manual (first perfect) |
| `whack-a-nothing.seventh-half` | The Order of the Seventh and Also Half Whack | Whack Hole 7½ at a Textbook grade or better. It counts as half a hole, and so half an achievement, and so full. | no | 5 | manual |
| `whack-a-nothing.appeals` | Knight Commander of the Appeals Process | File 5 appeals and receive 5 identical scores with 5 different stamps. | no | 5 | `stats['whack-a-nothing.appeals']>=5` |
| `whack-a-nothing.stillness` | Chancellor of Stillness, First Class | Hold perfectly still through a full Hush round, even when a leaf drifts by. | no | 5 | manual |
| `whack-a-nothing.duet` | Duettist of the Temporal Variety | Whack in unison with your own ghost. Sandra has already fined you. | no | 5 | manual |
| `whack-a-nothing.hundred` | Hundred-Whack Dignitary, Order of the Mallet (Third Class) | Whack 100 times. The ceremony is attended by one plant and several drifting dust motes. | no | 5 | `stats['whack-a-nothing.whacks']>=100` |
| `whack-a-nothing.postmaster` | Postmaster General of Absent Moles | Catch a postcard without damaging it, then read it fully. Hidden because it is hard to be this patient. | YES | 10 | manual |
| `whack-a-nothing.unwitnessed` | Supreme Witness of the Unwitnessed Whack | Land an Unobserved Whack in the exact moment all three judges blink, then be told it never happened. | YES | 10 | manual |
| `whack-a-nothing.idle` | Grand Master of Not Whacking, Emeritus, With Distinction | Do nothing for 180 seconds. This was the best whack we have ever seen. | YES | 10 | manual |
| `whack-a-nothing.fatigue` | Supreme Arbiter of the Mallet Grievance | Whack 12 times in 3 seconds. The holes would like a word. The word is 'break'. | YES | 5 | manual |
| `whack-a-nothing.toast` | Order of the Unwhackable Breakfast | Witness the toast. Whack it or spare it. The toaster is grateful either way. | YES | 10 | manual |
| `whack-a-nothing.zwhack` | Signatory of the Lawn | Sign the lawn with a Z. It will be taken into account at the next review of nothing. | YES | 5 | manual |
| `whack-a-nothing.eyes` | Witness, Unconfirmed | Whack a Nothing at the exact moment it had eyes. Management has no record of this. | YES | 10 | manual |
| `whack-a-nothing.gala` | Guest of Honour (By Default) | Attend the Retirement Gala of a mole who did not. | no | 10 | manual at the certificate |

14 achievements, 8 secret (>= 6 and >= 2 required). Icons: 🏆 🥇 📜 🤫 👻 🔨 📮 👁️ 🕰️ 🪪 🍞 ✍️ 👀 🎉.

Optional shop items (`P.addShopItems`, prefix `whack-a-nothing.`): `lanyard` "Mallet Lanyard (Compliance Approved)" price 15, category `cosmetic`, flavor `["Sandra has approved the lanyard. Sandra has not approved the mallet."]`; `gavinhat` "Gavin's Little Hat" price 40, category `junk`, flavor `["Gavin has accepted the hat without comment. Gavin has never needed one. Gavin appreciates being asked."]`. Optional decorative settings: `whack-a-nothing.weight` slider "Mallet Weight" (responses: "The mallet has been weighed. The mallet declines to say.", "Sandra from Compliance has flagged the new weight.", "The mallet is now exactly as heavy as it was."); `whack-a-nothing.sens` select "Nothing Sensitivity" options Low/Medium/Yes (responses: "Sensitivity noted. The nothing remains as sensitive as before.", "Nothing has been consulted.").

---

## 7. Final jokes and lines (verbatim). All custom categories: `P.addLines('m:whack-a-nothing:<category>', [...])`; read with `api.line('m:whack-a-nothing:<category>')` / `api.sayRandom`.

Tokens (the module substitutes these itself; always supply a default so no `undefined`/`NaN` ever shows): `{err}` rounded ms, `{hole}` hole number or "7½", `{total}` panel total with one decimal ("22.5"), `{rest}` `(30 - total)` one decimal, `{n}` count, `{loop}` loop number, `{region}` postcard region.

Everything below is final. Do not paraphrase; fix only escaping.

### intro (say 2 in order at mount, then randomly if the module is re-entered; first joke must fire before the player acts)
- Welcome to Whack-A-Nothing. Whack when it appears. It will not appear. Timing is everything, and everything is absent.
- Please stand by. The first Nothing is scheduled for 12:00:03. A second Nothing is provisionally pencilled in for 12:00:04.
- The hole is ready. The hole has been ready since before you arrived. The hole is a professional.
- This is Hole 1. It is the only hole at this time. It is not nervous.
- Whack-A-Nothing was declared a sport by the same committee that declared Thursday. They were thorough.
- You do not need to see the nothing. You need only trust the outline of it.
- A mole is scheduled. The mole has not confirmed. The mole has not declined. The mole has a lanyard somewhere.
- First-time whackers are advised to whack at the instant the nothing peaks. The peak is marked by the absence of a marking.

### sponsor (banner under the title; advance one per stage, loop at the end)
- Hole 1 is sponsored by Dennis (Plant).
- Hole 4 is sponsored by Dennis (Plant). Dennis (Plant) is thriving in it.
- Hole 7 is sponsored by the idea of it.
- Hole 9 is sponsored by a hole that wishes to remain anonymous.
- Hole 4 is sponsored by Dennis (Plant). Dennis (Plant) believes in nothing in particular.

### firstWhack
- Whack registered. Nothing was struck. Nothing has been informed.
- That was your first whack. Management notes it was recorded, and also that it was yours.
- A first whack. Three chairs are being wheeled in so it can be judged retroactively. Please remain whacked.
- You have struck at nothing with a mallet for the first time. Go gently. It will be your career.

### panelArrives
- The panel apologizes for being late. They were held up by something. It is unclear what.
- Judges, please be seated. You are reviewing the previous whack 'on tape'. There is no tape.
- Judge Finch has arrived with a 7½ already raised. He has not yet seen the whack.
- The panel has been wheeled in. The panel is on casters. The panel is not insured for casters.
- Scores will now accumulate under the panel. Please do not attempt to read them as a trend.

### gradePerfected (also sets `+2 Meh` message)
- Nothing, Perfected. Please sit down. We are all very uncomfortable.
- Nothing, Perfected. {err} ms from the peak. The peak has asked for a moment alone.
- That was exactly the nothing. Judge Plimsoll has put down her pen and picked it up again.
- Perfected. There is no higher grade, in the sense that there is one and it is in a drawer.
- You whacked the exact instant of nothing. The silence lasts four seconds. It is the longest anyone has felt anything.

### gradeTextbook
- Textbook Nothing. A clean whack. The nothing never saw it coming, which is its default state.
- Textbook Nothing. The mallet was committed. The nothing was merely present.
- Textbook Nothing. {err} ms off the peak. Management calls this 'precision'.
- Textbook Nothing. This will be used to teach other nothings.

### gradeAdequate
- Adequate Nothing. Adequate is the grade we give when we are tired and fond of you.
- Adequate Nothing, {err} ms from the peak. The peak will be in touch.
- Adequate Nothing. Nobody was harmed. Several things were mildly acknowledged.
- Adequate Nothing. A solid effort in the general vicinity of the nothing.

### gradeEarly
- Premature Nothing. You whacked it before it had a chance to not appear.
- Early by {err} ms. The nothing was still putting its coat on.
- Premature Nothing. Whacking at nothing before the nothing is called Pre-Nothing, and it is frowned upon at the trade level.
- Premature Nothing. The nothing has been inconvenienced and asks that you ring ahead next time.
- Early. The nothing was told you were keen. It was not flattered.

### gradeLate
- Belated Nothing. The nothing left at 4:17. You arrived at 4:17 and a half.
- Late by {err} ms. The nothing has already gone home and taken the good chair.
- Belated Nothing. You are whacking the memory of a nothing. It is a very good memory.
- Belated Nothing. Nothing occurred {err} ms before you. Nothing was not told.
- Belated. The hole is exactly as empty as it was, but now with regret.

### unscheduled
- Unscheduled Whack at Pure Nothing. This is also a nothing, but it was not on the agenda.
- You have struck the lawn. The lawn has filed a brief complaint (Form 27B/6).
- Unscheduled Whack. Management will log it under 'Enthusiasm (Unspecified)'.
- Impact detected on air. The air has requested a copy of your credentials.
- The whack was real. The target was not scheduled. Both are true at once, which is rare for a Tuesday.

### replay (the Replay Timeline caption under the panel: a thin bar with a hollow circle where the Nothing peaked, a coral pip where you whacked, and the gap in ms; always one of)
- Nothing occurred {err} ms before you. Nothing was not told.
- Nothing occurred {err} ms after you. Nothing is not usually this keen.
- The pip and the circle are {err} ms apart. The photo finish shows a very clean hole.
- The replay is available. The replay is a hole. It is, once again, a hole.

### judgeDeduct (Plimsoll posture, used in this order by `deductions` count, clause creep)
- Judge Plimsoll deducts 0.5 for 'posture of the mallet', citing clause 4(a). The mallet was not consulted.
- Judge Plimsoll deducts 0.5 for posture under clause 4(a)(ii)(c). The clause is a long way down.
- Judge Plimsoll has found clause 11½. It was in the cupboard. It is a very small clause.
- Judge Plimsoll deducts 0.5 for posture, citing the clause appendix to the clause appendix.
- Judge Plimsoll deducts 0.5 for posture, citing clause 4:17 PM. Clause 4:17 PM is a time and also a clause.
- Judge Plimsoll has blamed the posture deduction on 'the previous mallet'. The previous mallet is unavailable for comment.
- Judge Plimsoll is still deducting for the previous mallet. The previous mallet is being very patient about it.

### judgePlimsoll
- Judge Plimsoll: 'The wrist was committed. The nothing was not. A 6.5.'
- Judge Plimsoll: 'I mark technique, not outcome. The outcome is nothing, and I mark that too.'
- Judge Plimsoll has noted that your whack arrived on time, in the sense that it arrived.
- Judge Plimsoll awards full marks for the swing and none for the sky.

### judgeQuill
- Judge Quill: 'I felt something. I checked. It was the draft. 8.'
- Judge Quill wishes it noted that the previous whack was 'more nothing-forward'.
- Judge Quill deducts a point for repetition. 'We have seen this hole. We were there.'
- Judge Quill rewards a new hole. 'Variety. In a field of nothing, a variety of nothing is a gift.'
- Judge Quill: 'Three in a row at the same hole is not a pattern. It is a lifestyle.'
- Judge Quill is moved by the geometry of your whacks. He asked not to say which geometry.
- Judge Quill: 'Artistic Impression of Nothing is a difficult field. I was nearly impressed.'
- Judge Quill, quietly: 'Was any of this the point? ... I will score that 7.5.' (Stage 6, once only)

### judgeFinch (first three in order, then the rest random)
- Judge Finch holds up a 7½.
- Judge Finch holds up a 7½. Management notes this is consistent.
- Judge Plimsoll quietly asks Judge Finch if he has ever considered a 7. Judge Finch holds up a 7½ in reply.
- Judge Finch holds up a 7½. Judge Finch always holds up a 7½. It is the system.
- Judge Finch's 7½ has been reviewed and found to be a 7½.
- Judge Finch holds up a 7½ for a whack that did not occur. The whack has sent regrets.
- Finch not included in the rank algorithm because Finch is the rank algorithm.
- The other two judges slowly turn to stare at Judge Finch. Judge Finch holds up a 7½. (after a Perfected)

### heckle (judges argue in speech bubbles)
- Plimsoll to Quill: 'You cannot score a whack for ambiance.' Quill to Plimsoll: 'I have scored for ambiance.'
- The judges confer. They agree to disagree about nothing, for eleven seconds, in writing.
- Judge Quill says the lawn is too green. Judge Plimsoll says it is the correct green. Judge Finch holds up a 7½.
- Judge Plimsoll accuses Judge Quill of 'feeling during working hours'. Judge Quill does not deny it.
- The panel is overwhelmed with nothing and requests lunch. Lunch has been classified as a nothing.
- Judge Quill asks whether the whack 'meant it'. Judge Plimsoll asks whether anything does.

### score
- Panel total: {total} of 30. The remaining {rest} is on back order from a supplier who is also Finch.
- Panel total: {total} of 30 (30 not available at this time). The scale was built that way on purpose.
- The scoreboard has been updated. The scoreboard did not ask to be updated.
- Thirty is reserved. We cannot tell you for whom.
- Panel total: {total} of 30. The panel would like to point out that 26.5 is a very good number and also the ceiling.

### streak
- Streak of {n}. A streak is just a nothing that has been repeated by someone who cares.
- Streak of {n} broken. The streak has been thanked for its service.
- Best streak: {n}. This has been filed under 'Persistence' and also under 'Lawn'.

### lawnOpens
- The lawn has been opened. Eight more holes were unfolded from the dirt. They were not asked.
- Nothings may now overlap. Please track two or three at once. Management believes in your peripheral vision.
- Holes 2 through 9 are now on site. They have all read Hole 1's notes.
- A streak counter has been installed. It counts consecutive Adequate-or-better whacks. It is very sincere.

### rumorSay (Management)
- A rumor flag has been planted on Hole {hole}. Whack it at its peak for Rumor Adjacency. Do not whack it at its trough, which is unscheduled.
- Rumor Adjacency. You whacked near a rumor at the exact nothing. The rumor is flattered and will not be confirming.
- The rumor on Hole {hole} has expired and been replaced by a correction.
- The mole is now mentioned for the first time as an HR matter. HR has no comment. HR is a rumor.
- Sandra from Compliance: 'Moles are not currently authorized to be rumored after 6 PM.'
- Sandra from Compliance has ruled that moles may not be rumored 'in a way that implies moles'.
- The only true rumor of the day: the mole will send a postcard. The worm is now considered credible.

### rumorCorrection
- Correction: the earlier rumor was about a different hole. The different hole has been notified.
- Correction: the earlier rumor was about Dennis. Dennis (Plant) is not a mole. Dennis (Plant) has asked us to stop.
- Correction: the earlier rumor was a draft. The draft is back and would like an apology.
- Correction: the earlier rumor has been replaced by a slightly nicer rumor.
- Rumor withdrawn. It has been replaced by a rumor with more detail and less evidence.

### rumorBoard (full entries are {text | Source | Confidence}; use in this order, then cycle with new corrections; Confidence is `moderate-to-elevator` unless stated)
1. Mole sighted at Hole 3, Tuesday-ish. | Source: a worm with a lanyard
2. Mole seen near the vending machine, in a hat. | Source: a pigeon on a cable
3. Mole is 'between jobs'. Mole is also 'doing very well'. | Source: a sock in transit
4. Mole sighted at Hole 6. Mole 'wants to be left alone, but also called twice'. | Source: a pebble who was there
5. Mole sighted at Hole 2. Tall, thriving, not a mole. | Source: Dennis (Plant) | Confidence: very high; a plant would know
6. A mole was spotted. It was a glove. | Source: the glove, who has asked not to be involved
7. Mole has taken up knitting. First project: a scarf for a hole. | Source: a dust mote with a clipboard
8. Mole enrolled in 'Appearing: A Beginner's Guide'. Has withdrawn twice. | Source: a leaf, somewhat blown
9. Mole has retained a lawyer. The lawyer is also a mole. | Source: the third ficus
10. Mole is on sabbatical until a Wednesday that has not been scheduled. | Source: the previous mallet
11. Mole seen near the elevator, which is also a rumor. | Source: a person who was told about it by the elevator
12. The toaster has been seen near a lawn. | Source: a crumb (T 5:30 only)
13. The mole will send a postcard. | Source: the worm with a lanyard (now credible) | Confidence: high (T 6:00 only, the only true rumor)
14. Moles do not like toast. | Source: unnamed | Confidence: not applicable (5 s after any toast, never explained)

### hole5
- Hole 5 is on a break. Back in 5. Hole 5 has not said which 5.
- Hole 5 has put up a 'Back in 5' sign. It is a very good sign. It is laminated.
- Hole 5 has opted out of your performance review. Hole 5 is still listening.
- That hole is on a break. The whack has been filed under Rude.
- Hole 5 has returned from its break in a tiny hat. The hole has questions about the board's direction.
- Hole 5 has taped a note to its rim asking for a raise. The note is polite and has bullet points.
- Hole 5 has taken a different break. The sign reads 'Back in 5 (revised: 7½)'.

### appeal
- The appeals window is open. Click any scorecard to appeal. The fee is 0.2 Meh. The fee is for appealing, not for winning.
- Your appeal has been received. A committee of one is forming. The committee is late.
- Appeal denied. Appeal upheld. Appeal denied again, but warmly.
- Appeal fee: 0.2 Meh. Fee for appealing the fee: also 0.2 Meh. Fee for noticing: waived.
- Appeal complete. The score has been reviewed with great care and left exactly as it was.
- Judge Finch's appeal returns: 7½ (upheld, 7½).
- An appeal is already in progress for this judge. The paddle is deliberating. Please do not rush the paddle.
- The paddle has finished spinning. The paddle is dizzy and would like it noted.

### hush
- SILENCE IN PROGRESS. Do not whack. Whacking the silence is a Class C Noise.
- Silence round. The holes will still stir. You will still not whack. This is called leadership.
- Management is whispering. Management has never whispered before. Management is not good at it.
- A leaf drifts past during the silence. You did not whack it. The leaf is moved and also late for something.
- Class C Noise. Please apologize to the lawn, quietly, in writing.
- You whacked during Silence. A small committee turned and looked at you. It is still looking.
- You did not whack. Judge Quill wept. Judge Finch held up a 7½. It was a very quiet 7½.
- Serenity points awarded: 4. They are valid for nothing, and nowhere.
- The silence has ended. Please resume noise at your own pace.

### ghost
- Your past self has arrived to whack. Please do not make eye contact.
- A ghost mallet is retracing your rhythm. Management finds your rhythm 'brave'.
- Temporal Duet. Your ghost whacked Hole {hole} at the same moment you did. That is a duet. It is also a fine.
- Sandra from Compliance has fined the duet 0.2 Meh. 'Whacking with oneself is permitted. Whacking with oneself in public is a levy.'
- The ghost has noticed you have changed your rhythm. The ghost is not angry. The ghost is on a delay.
- Your past self is twenty seconds behind and it shows. It is also the better whacker. It has been practicing.

### annex
- A tenth hole has been installed without consultation. Hole 10 says nothing. It is good at it.
- Holes 10, 11 and 12 have been added. A fourth column has been formed. It has no minutes.
- Hole 7½ has been added. It is half a hole, in the sense that it is also half a hole.
- Nothings on Hole 7½ now peak at the same instant as a nothing elsewhere. This is a coincidence in the sense that it is scheduled.
- Dennis (Plant) is growing out of Hole 2. Dennis is not a mole. Dennis is not impressed.
- Dennis (Plant) has grown again. Dennis (Plant) now has opinions about light.

### dennisWhack
- Dennis (Plant) has been struck. Dennis (Plant) has photosynthesized it.
- Dennis (Plant) has gained a leaf. The leaf has been counted. The leaf is thriving.
- You have whacked a plant. Management is calling this 'a gardening incident' and looking at Tuesday.

### toast
- Something popped up. It is toast. Toast is not nothing. This round is void.
- The Toaster has popped one slice at Hole 4 and left. It had somewhere to be. You are a spectator.
- The panel is hushed. Nobody has ever been this quiet about bread.
- You have whacked toast. This was not a whack. This was breakfast.
- Toast left unwhacked. A rare act of restraint, and a small snack for the Toaster.
- The Toaster, in toast: 'Toast.' It is the warmest thing anyone has said all day.
- The Toaster mutters: 'You are welcome here.' It is a slice, and it is a sentence.

### micro
- A draft crosses the lawn. It is a leaf. It would like to be left out of this.
- You whacked the leaf. That is a foul of 'Something'. Something is not on the agenda.
- The draft has passed. The draft was never here. The draft is also a rumor.
- Sandra from Compliance has audited the mallet. Policy 14.2: mallets must be whack-neutral. Yours has leanings.
- Sandra has clarified: mallets are permitted, whacking is permitted, mallets whacking is under review.
- Rain Delay (Indoors). The umbrellas have been deployed over the holes. There is no rain. The umbrellas are for the holes' dignity.
- The Rain Delay has ended. The holes would like to thank the umbrellas for their service.
- The mallet has been named Gavin. Gavin has accepted the name without comment.
- Substitute Judge: A Folding Chair. The chair scores 5.0. The chair is unmoved.
- Guest Judge Gerald has arrived. Gerald scores by observation. 'I score you the color of Thursday.' He left without leaving a number.
- Ah. The one from the spuds. (Gerald, if `metGerald` is true)
- Gerald introduces himself as a stranger of gravitas. He has set a flag. It is a very small flag.

### idle
- Nothing is still happening. Management is pleased with your consistency in watching it. (60 s)
- The holes have begun to talk among themselves. It is mostly about weather. (90 s)
- Nothing has started appearing on its own. You are not required for this. You never were. (120 s)
- The panel has scored the nothing automatically. Judge Finch held up a 7½. He did not need to be asked.
- A hole has opened its eyes very slightly. They blinked once. Did you see that? Neither did I. We are choosing not to log it. (150 s)
- Valued Employee, you have not whacked in 180 seconds. This is the best whack we have ever seen. (180 s)
- Out of Office from B. (Mole): 'I am out of the office until further notice. Nothing is urgent. I was never in.' (600 s)
- We have noticed you. The nothing has not. (any input after the auto mode starts)
- Welcome back. Nothing happened. We took notes. (any input after 60 s idle)

### holeChat (speech bubbles over holes during idle 90-120 s; rotate)
- Hole 1: Looks like rain.
- Hole 3: It is always raining somewhere.
- Hole 6: Not here, though.
- Hole 2: I heard Thursday.
- Hole 8: Humid, for a hole.
- Hole 4: Dennis says it is the light.
- Hole 9: I do not have a view. I have a position.
- Hole 7: I am being talked over by Hole 7½. I cannot hear it. I assume it is half.

### spam
- Whack Fatigue detected. The mallet has requested a break and a lanyard.
- Excess Whack Levy: 0.1 Meh. This is a whack tax. It is also, technically, a nothing tax.
- The judges have left for a break. Their paddles are face down. Judge Finch stayed behind holding a 7½ in each hand.
- ON BREAK. Whacks are currently producing only a tired sigh.
- The judges are back with biscuits. They will score the entire spam as a single piece called 'Study in Urgency'.
- 'Study in Urgency': Plimsoll 6.5, Quill 8, Finch 7½. The biscuits were also scored. The biscuits received a 9.
- The mallet is on a statutory break. Management has asked it to please remain a mallet.

### unobserved
- Did anyone see that? Per policy, it did not happen. Please do it again.
- The judges blinked. All of them. At the same time. This has been entered as 'Unobserved' and then removed from the record.
- The paddles read '?'. This is the official grade for a whack nobody witnessed.
- Management has not seen that whack and would like to congratulate you on it privately.

### zwhack
- You have signed the lawn. This will be taken into account at the next review of nothing.
- The scorch marks are in the shape of a Z. The lawn has asked what it stands for.

### eyes
- Something looked out of the hole. It said 'Oh,' and went back down. Management has no record of that.
- Management has been asked about the eyes. Management would like to talk about Tuesday.
- The eyes have been logged as 'weather'.

### postcardSay
- A postcard has landed on the lawn. It has a stamp from a place with a lawn.
- Hold the postcard to catch it. Whacking it is permitted, and will be noted in the follow-up.
- Postcard caught undamaged. It has been pinned to the wall with a thumbtack. The thumbtack is a rumor.
- Postcard damaged. The mole has sent a second postcard about the first postcard.
- Management has read the postcard 41 times. The postcard has not changed. Management has changed.
- The postcard wall is full. The oldest postcard has been moved to a drawer. The drawer is a rumor.
- The postcard has been delivered by courier. Nobody read it. The courier did.

### postcardText (distinct; each also a wall slot; P.S. grows into the main content)
- l1a: 'Dear Valued Employee, weather lovely. Sank three feet today. Yours in absence, B. (Mole). P.S. Do not wait up.'
- l1b (undamaged): 'Wish you were here. Actually, I wish I were there. It is complicated. There is a lawn. B. P.S. I did not wait up either. P.P.S. cc: A Worm (Credible).'
- l1bd (damaged): 'The crease is noted. The crease is fine. The crease has character. I am still in the hole, but with views. B. P.S. Please stop. P.P.S. The crease asks to be called Doris. P.P.P.S. cc: A Worm (Credible).'
- final: 'To whom it may concern: I am retiring from not-appearing. I am relocating to a hole in the countryside. It is the same, but with a view. B. P.S. Do not wait up. P.P.S. Please tell the judges I enjoyed their work, especially the seven and a half. P.P.P.S. The new hole has a fridge.'
- r1 (Loop 2+; {region} is printed on the front): 'Greetings from the Basement of the Moon. It is lower than it sounds. B. P.S. I am still not appearing. P.P.S. The moon has a hole. It is not mine.'
- r2: 'Greetings from a Different Lawn. The grass is the same, but mowed by someone who believes in me. B. P.S. Hole 7½ sends regards. P.P.S. The regards are half.'
- r3: 'Greetings from the Gap Between Two Couches. It is cozy. I have found four coins and a philosophy. B. P.S. The philosophy is mostly about down. P.P.S. The coins are for the judges.'
- r4: 'Greetings from the Back of a Drawer. I share it with a spoon who has strong views on Tuesday. B. P.S. The spoon is credible. P.P.S. The worm is jealous.'
- r5: 'Greetings from the pocket of a coat last worn in 1994. There is a ticket stub. I think it is for me. B. P.S. It is for a different mole. P.P.S. I am happy for them.'
- r6: 'Greetings from Underneath the Third Ficus. Dennis waved. It was a leaf. B. P.S. Dennis (Plant) is a great listener, for a plant. P.P.S. Dennis does not know I am here. This is going well.'
- r7: 'Greetings from the Gap Between 4:17 and 4:18. There is a lot of room. Nobody has ever been late here. B. P.S. I was here at 4:17 and a half. P.P.S. So were you, I think. I was not looking.'
- r8: 'Greetings from the other side of Hole 7½. It is the same, but half. B. P.S. This is the last postcard I will send from a hole. P.P.S. There will be another postcard from a hole.'
After r8, cycle again with 'Postcard (Resent). ' prepended and the stamp emoji changed. Stamp emoji by id: l1a 🐛, l1b 🌱, l1bd 🩹, final 🏡, r1 🌙, r2 🌿, r3 🛋️, r4 🥄, r5 🧥, r6 🪴, r7 🕟, r8 ½.

### gala
- The mole's final postcard announces retirement. Management is visibly shaken and has put on a tie.
- Retirement Gala. The holes are now tables. The tables are round. The party is going very well.
- Congratulations, Barry. (banner text)
- The mole has not arrived at the retirement party. The party is going very well without him.
- Table 5 is hosted by Hole 5. Hole 5 has been waiting for this since 2:30.
- Dennis (Plant) is best man. Dennis (Plant) has prepared no speech. It is going to be a good speech.
- Every paddle is a 7½. The judges are wearing party hats. Judge Finch's party hat also reads 7½.
- The mole is not present. You are. The judges stand and applaud you instead, because someone should be applauded and he sent regrets.
- Certificate: Outstanding Contribution to Not-Appearing. Signed: Finch (7½) and Sandra (unseen).
- You have whacked a table. The table accepts. It has been told it is a hole in a hat.
- Congratulations: Whack-A-Nothing is complete. Whack-A-Nothing (Continued) will begin shortly.

### reset
- Per my previous message, nothing happened. Please resume nothing.
- Postcards received: 1 (of a total unavailable).
- The rank has been rebalanced to 12 percent. The percentage was not consulted.
- The mole has sent the next postcard from a new, more specific location. Nobody has asked where.

### loopIntro (loop >= 2; also sets the window title to `Whack-A-Nothing (Continued)`)
- Welcome back to Whack-A-Nothing (Continued). Loop {loop}. The nothing has been refreshed.
- Whack-A-Nothing (Continued). The mole is still scheduled. The mole has not read the schedule.
- Round {loop} of the continuing nothing. The holes have been told you are returning. They have not been told why.
- Good to see you again. Per my previous message, nothing happened. Please resume nothing.
- The hole is ready. The hole has been ready the whole time. The hole has some notes for the mole.

### esc
- Escape detected. Management is not sure what you are escaping. The holes are not holding you.
- Escape has been pressed. The nothing was not aware that it was a hostage situation.

### resize
- The venue has been resized. The nothing is still full size.
- The holes have been rearranged without consultation. Hole 7 has been moved next to a window.

### rankLines
- Rank rebalancing in progress. Your rank is unchanged. Your percentage is not.
- 99.9 percent. Rank rebalancing. The percentage is a privilege, not a right.
- Rank rebalanced. You are now {rank}. The ladder is the ladder.
- Promotion recorded: {rank}. The promotion was not announced because the announcer is Finch and he held up a 7½.

### ticker (global, add via `P.addLines('ticker', [...])`; 4 lines)
- POINTLESS NEWS: Whack-A-Nothing reports record attendance of nothing. The nothing declined to comment.
- BREAKING: a mole has been rumored again. Experts confirm this is the fourteenth time this hour.
- JUDGING UPDATE: the panel awarded 7½ to a whack that did not occur. It is the finest 7½ of the quarter.
- LAWN REPORT: Hole 5 remains on a break. Hole 5 will be back in 5. The 5 has not been specified.

Line count: well over 200. Escalation: Finch gag, clause creep, Hole 5, rumors, postcards and gala are all explicit sequences, not random picks.

---

## 8. Visual design

**Palette (CSS custom properties on the module root `.m-whack-a-nothing-root`):** lawn mint `#9ad8a0` with mowing stripes `repeating-linear-gradient(90deg,#9ad8a0 0 48px,#7fc48a 48px 96px)`; dirt `#6b4426` with rim highlight `#8a5a35` and `inset 0 8px 14px #3d2514`; ink `#2b2118` (all outlines 3px); cream `#fff6e0` panel background; coral `#ff6f61` (stamps, Hush banner, mallet flash); mustard `#f2c14e` (plaques, paddles); lilac `#b9a4e6` (ghost mallet at 50% opacity); postcard cream `#fdf0c9` with teal border `#2f8f8a`. Everything has a thick ink outline and a hard 4px 4px 0 ink sticker shadow. Fits the cream-and-sticker Lobby; chunky rounded system fonts only.

**Layout (CSS grid, 360-1400 px):**
- TOP: a "judges table" strip: three busts (emoji on a coloured circle, mustard name plaque, scorecard button below) with the scoreboard `{total} of 30 (30 not available at this time)` beside them. Under it a thin sponsor strip.
- CENTER: the lawn: a rounded rectangle with a thick ink border and sticker shadow, a clock caption in its corner reading `Lawn time 4:17 PM` (it never changes), and the holes in a CSS grid: 1 hole (large, centred) -> 3x3 -> 4x3, plus half-hole 7½ absolutely positioned at the right edge half clipped. Each hole is a `<button>` at least 64px tall (min-height 64px) with radial-gradient dirt and an inset shadow; the rim is a pseudo-element that jiggles during Stir. The hole's SVG is a mole-silhouette dashed outline filled with the lawn colour.
- RIGHT (or below the lawn at <= 720 px): the Rumor Board clipboard (max 4 🪧 notes) above the Postcard Wall (12 tiny slots).
- BOTTOM: the rank ladder as a striped progress bar with the `RANK REBALANCING` stamp. Under it the aria-live narration strip (a `<div aria-live="polite">` repeating `api.say` text) and a collapsible "Lawn Report" `<details>` log capped at 12 rows, each row prefixed `Report {n}, filed 4:17 PM`.
- The mallet cursor span lives inside the lawn.
- Responsive: at 360px the lawn has 3 columns of at least 90px; the 4x3 stage uses 4 columns at ~72px wide x 64px tall; the panel stacks into three small columns above the lawn; no horizontal scroll. Hole 7½ is half the width of a normal hole.

**Tricks:** (1) the Nothing: inline SVG built via `innerHTML` (no `xmlns` attribute, because lint forbids `http://` strings), `stroke-dasharray: 3 4`, dashes march during Rise, `stroke-dasharray:none` on Peak. (2) mallet: transform transitions, no per-frame logic. (3) dust ring: a pooled circle with a radial-gradient, restarted by toggling a class. (4) stamps: rotated divs with `mix-blend-mode:multiply`, double border, capped at 12. (5) paddles: `rotateX` flip; `?` state uses `filter: blur(2px)`; face-down state shows a blank back. (6) Hush: `filter: grayscale(1)` on the lawn only plus a coral banner that drops via a CSS keyframe spring. (7) ghost: the same mallet in lilac, 50% opacity, with a `box-shadow` trail. (8) postcards: rotated cards drifting via a CSS `@keyframes` sine path (two nested animations: X and Y with different periods) with a conic-gradient ring around the card for hold progress. (9) gala: holes get class `table` -> `border-radius:50%` and a tablecloth `repeating-conic-gradient` with tiny `🎉`, judges' busts get a `🥳`-style party hat span (a CSS cone), banner `Congratulations, Barry`. (10) reduced motion (`@media (prefers-reduced-motion: reduce)`): no flips, jiggles, drifts, spring banner or marching dashes; stamps appear instantly; ghost fades instead of moving; all animation durations drop to 1 ms.

**Sound map (`api.sfx`):** `tick` (Stir, paddle reveals), `whoosh` (mallet drop, lawn opens), `ding` (Perfected), `boing` (Premature), `sad` (Belated, fatigue sigh), `bell` (third paddle), `buzz` (Hush violation), `tada` (postcard caught, certificate), `stamp` (grade stamp), `fanfare` (gala applause), `pop` ONLY for the toast event. Everything silent with `?mute=1`.

---

## 9. The not-ending

Stage 9 at T = 8:00 (loop 1; a mini-gala in loops >= 2: skip the certificate, Dennis, Hole 5 and applause beats and keep only a 15-second banner "Congratulations, Barry (Continued)" and the `reset` beat).
1. 0 s: the final postcard slides in (no catch required), Management reads `gala` line 1; mode -> `gala`; clear Nothings, rumors, ghosts, appeals, Hush.
2. 3 s: holes become round tables, judges put on party hats, every paddle reads 7½, banner "Congratulations, Barry". Table 1 seats Dennis (best man). Hole 5 hosts Table 5.
3. 12 s-26 s: Management speaks the `gala` lines in order (mole not present, party going well, Dennis best man, Table 5).
4. 26 s: `fanfare`. The judges stand and applaud the player because someone should be applauded and he sent regrets. Confetti.
5. 32 s: a certificate card appears ("Outstanding Contribution to Not-Appearing", signed Finch (7½), Sandra (unseen)), `tada`. `api.achieve('whack-a-nothing.gala')`, +10 Meh, stat `.gala`. A Dismiss button; auto-dismisses at 42 s.
6. 44 s: the lawn silently rolls back to ONE hole, rank bar rebalances to 12%, the counter reads `Postcards received: 1 (of a total unavailable)`, Management says the `reset` lines, the module title becomes `Whack-A-Nothing (Continued)` (`api.setTitle`), `loop += 1`, `T = 0`, `mode = 'play'`. The mole sends the next postcard (a region postcard in the next loop at Stage 8). It cannot be won and it loops forever with escalating, never-repeated lines (loop lines use shuffle bags; postcard regions cycle).
Selftest: compress this whole sequence by 10x.

---

## 10. Implementation hints

- Single file `games/whack-a-nothing.js` <= ~1800 lines. Budget: ~250 lines CSS, ~500 lines text tables, ~900 lines logic. Put all strings in compact arrays at the top. Use `const K = 'm-whack-a-nothing-'` and build the CSS template with it.
- Build ALL hole buttons ONCE at mount (13: holes 1-12 and 7½) and toggle `hidden`/classes/`aria-hidden` per stage; never rebuild the grid, so focus, pending Nothings and listeners survive layout transitions. Keyboard mapping is by hole NUMBER, not DOM index.
- One master clock: `now = api.now()`; one 33 ms `api.setInterval` ticker handles Nothing phases, Hush countdown, postcard drift hold progress, idle thresholds, and the escalation clock. Everything else is event-driven with `api.setTimeout`.
- Shuffle bags (helper `bag(arr)` that returns a `next()` function using `api.shuffle`) for holes, micro-events, appeal stamps, posture deductions, line categories.
- `say(cat, opts, vars)` helper: substitutes tokens and defaults (`err` -> `0`, `hole` -> `1`), passes `api.say(text, {mood, who})`, and mirrors the text into the aria-live strip and the capped log. Rate-limit `api.say` to at most once per 1.2 s except `priority:2`, otherwise the Lobby narrator queue floods.
- Make `grade(err, hole)` a pure function (testable): returns `{label, meh, key, plim, quill}`.
- `canWhack()` and `mode` guard every handler. Handlers: `pointerdown` on the lawn container (delegated), `keydown` via `api.on(document,'keydown',...)` (ignore when `root` not in the DOM), `click` fallback with the 60 ms dedupe.
- `api.award` only with finite numbers (guard `Number.isFinite`). Clamp displayed numbers with `toFixed(1)`.
- Never use window timers or `requestAnimationFrame`; never `fetch`, `eval`, `alert`; no `http://` or `https://` strings (SVG via `innerHTML` without `xmlns`).
- In selftest (`api.selftest`): `TS = 10` for the stage clock, Nothing durations x0.6, spawn gaps / 3, Hush 2 s, appeals 1 s, spam 1 s, postcard hold 0.3 s, idle thresholds / 30, gala / 10, toast 1 in 20, eyes 1 in 30. The harness must see several `api.award`, `api.say`, `api.stat.inc` calls within the first 5 steps (the first Nothing stirs in 0.5 s and the intro says 2 lines on mount).
- Cleanup: everything is managed by `api`, so `destroy` only needs to remove DOM refs; keep a `dead` flag so any late callback early-returns.
- Remounting 20 times: do not store module-level state outside `mount` except constants.
- First 10 s: the intro says line 1 immediately and line 2 after ~4 s; the first stir (3 s) is the first beat; the sponsor banner is visible from frame 0.
- `P.addLines` categories use `m:whack-a-nothing:<cat>` names. Avoid these tokens in code identifiers: `prompt(`, `alert(`, `eval(`, `confirm(`, `fetch(`.

---

## 11. Behavior summary: idle and spam

- **Idle:** 60 s -> line; 90 s -> holes chat in speech bubbles; 120 s -> Nothings appear and are auto-scored, Finch 7½, rank advances by itself; 150 s -> eyes; 180 s -> achievement and +10 Meh; 600 s -> Out of Office; any input -> "We have noticed you. The nothing has not." The escalation clock pauses while idle for > 45 s.
- **Spam:** 12 whacks in 3 s -> Whack Fatigue: lanyard mallet, judges leave, Finch holds two 7½, 6 s of tired sighs and `ON BREAK`, -0.1 Meh levy, the judges return with biscuits and score "Study in Urgency". A second trip within 60 s makes the three judges applaud slowly and sarcastically (`applaud-sarcastic`, just a line and three rapid `tick`s).

---

## 12. Risks: the 5 most likely implementation bugs

1. **Double-firing a whack.** A single physical action produces `pointerdown`, `keydown` AND `click` (Space/Enter on a focused button also fires `click`), so a naive build grades twice, awards twice and hits the spam detector at half the speed. Fix: all whack logic in `pointerdown`/`keydown` with `preventDefault` on Space/Enter, a click fallback gated by a 60 ms dedupe timestamp, and `event.repeat` ignored.
2. **Timing clock drift and selftest scaling.** If the peak is recomputed from a timer callback, from `performance.now`, or from a differently scaled clock, the "error in ms" lies, grades feel random, and the selftest (virtual time, `TS = 10`) desyncs. Fix: compute `peakAt` once at spawn from `api.now()`; one `dur()` function scales everything; the ticker only reads `api.now()`; never mix `Date.now`.
3. **Mode interplay and stale timeouts.** Hush, fatigue, gala, idle-auto, appeals, ghosts, postcard holds and panel reveal sequences all schedule their own `api.setTimeout`s. Overlaps cause paddles stuck face-down or on `?`, a Hush banner that never leaves, ghosts whacking tables, appeals finishing after the reset, or the Z drawn in the gala. Fix: one `mode` variable with `canWhack()`, a `roundToken` that every reveal/appeal callback re-checks, a `clearTransient()` called on every mode entry and on reset, and a `dead` flag.
4. **Layout transitions rebuild the DOM.** Re-rendering the hole grid when it grows (1 -> 3x3 -> 4x3 -> tables -> reset) loses keyboard focus, orphans active Nothings, breaks the keyboard hole map (10-12, 7½ have no letter) and mis-sizes Hole 7½ (clipped half-hole must remain a full-height, tabbable, whackable `<button>`; it must not overflow the page at 360 px). Fix: create all 13 hole buttons once, toggle visibility by class, key by hole number, and clip with `overflow:hidden` on the lawn only.
5. **Bad text and unbounded DOM.** Tokenised lines (`{err}`, `{hole}`, `{total}`) printed with no value produce `undefined`/`NaN`, which fails the harness; stamps, the log, postcards, crumbs, rumors and ghosts grow without bound over a 400-step fuzz. Fix: a single `fill(text, vars)` with defaults and a final `String(...).replace(/undefined|NaN|null/g,'')` safety net in dev, hard caps of 12 stamps / 12 log rows / 12 wall slots / 4 rumors / 60 pending ghosts / pooled crumb and dust nodes, and a finite-number guard on every `api.award`.

Other things to watch (not in the top 5): the mallet span covering holes and eating pointer events (`pointer-events:none`); the leaf and postcard buttons capturing pointer events during Hush; `localStorage` quota (cap saved postcard list at 12); hidden-tab throttling (the ticker must tolerate large gaps: clamp `dt`, and on resume do not auto-skip stages).
