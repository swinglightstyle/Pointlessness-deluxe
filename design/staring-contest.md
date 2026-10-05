# DESIGN BRIEF: Staring Contest With a Painting (`staring-contest`)

Final merged brief (showrunner). A builder who reads only SPEC.md, VOICE.md and this file can build the module. Output file: `games/staring-contest.js` (single file, <= ~1800 lines, vanilla JS, classic script, no network). Every line of dialogue in section 9 is final and verbatim; where it contains `{tokens}` see 9.0.

Decisions made while merging the three pitches (so nobody re-litigates them):
- Painting character and tone: pitch 1 ("Man Who Has Just Remembered Something"), year **1743 (Revised 1744)** everywhere (not 1704). Painting age is the fixed text "283 years".
- Loss engine: pitch 1's hidden **Cheat** deck + Sudden Death backstop, with pitch 3's **3 free micro-saccades per round**, per-round shuffle-bag verdicts and the **Appeals Desk** (a wall).
- Progression: pitch 3's **wall-clock beats** (module elapsed time, not rounds survived), pitch 1's ten beats and cheats, pitch 2's touching **Quiet Moment / Mutual Regard**, pitch 2's **Draw/Continental Drift** reduced to a buildable drift check.
- CUT as unbuildable or weak in one file: touch "hold a finger on the eyes" mechanic (touch = tap BEGIN then hands off), Dr. Brushwork/Security/ESCORT bar, Referee Pemberton, the painted dog and odds board, the "player eye avatar" aging, canvas dust (CSS dust only), the live curator escort, the 120 s "Draw" as its own mode, the pitch-3 "Bowl of Fruit" and "Season 2 rewrite" (replaced by the hat loop), per-beat unique music.
- Resize IS a blink (pitch 1), with the 7:5 secret (pitch 1).

---------------------------------------------------------------------

## 1. Concept

One screen: a gilt-framed portrait of a man who has just remembered something, in a plum damask gallery. You press BEGIN STARING, then must do nothing: no mouse movement beyond tolerance, no keys, no clicks, no touch, no leaving. The painting has been staring since 1743 and **always wins**. Doing nothing correctly only decides *which* loss you get: every round has a hidden **Cheat** (a fly blinks on your behalf, your reflection yawns, a cow out-stares you from behind, the gallery closes, 17 forms drop, the painting falls off the wall, etc.). Failure is ceremony: a rubber stamp, confetti thrown for the painting, a bylaw citation whose number is slightly wrong ("Bylaw 4(b)(iii-ish)", "per Sandra"). Stillness is both the only skill and the only way to see the jokes.

Tone: VOICE.md in full. Total sincerity. Never explain a joke. Management is the narrator; Sandra is cited, never seen.

Category `game`, `unlockCost: 0`, icon `🖼️`, tags `['stillness','patience','staring']`, tagline: "Hold still. The painting has been practising since 1743."

---------------------------------------------------------------------

## 2. Exact interactions and controls

### 2.1 The only real controls (all real `<button>`s, keyboard accessible)
- **GO button** (`.m-staring-contest-go`): the big button. Label sequence: first time `BEGIN STARING`, afterwards `Rematch` (see 9.9 for the evolving label list). Mouse click, touch tap, Enter, Space. It is **autofocused** (`focus({preventScroll:true})`) on mount and after every verdict, so keyboard-only players can play. Full width and thumb-height on mobile.
- **FILE AN APPEAL** (secondary, only inside the verdict card). Costs 0.5 Meh via `api.award(-0.5,'Appeal Fee')`. Always fails in a new way (9.12).
- **Honor System** toggle (on the placard, a real button with `aria-pressed`). Turns **input detection off entirely** (the painting still wins through its own cheats). Persist in `api.save`. Only toggleable in READY/VERDICT. In `api.selftest` it defaults to ON (so the fuzz harness cannot end every round at once).
- **Tea cup** (only during a Cooling-Off, 7.2).
- **Hook scene** painting drag (only when the painting has fallen: secret 7.4 and Beat 8). The only drag in the module.
- Decorative "bait" elements that are real clickable-looking things and are all blinks when clicked: Dennis the plant, the `FREE MEH (DO NOT CLICK)` button (appears from Beat 2, max once per round), the three form-prompt buttons (YES / NO / REMIND ME LATER, Beat 6). Nothing else is interactive. Escape pressed while NOT in a stare shows an Escape line (9.1).

### 2.2 Round flow
1. Player presses GO. State -> GRACE. A 3-second **"Eyes Open"** countdown (`3`, `2`, `1` big numerals over the painting). During GRACE **all input is ignored for blink purposes** (but still counts toward spam detection, 7.2). The click that started the round cannot lose it. Pointer anchor is re-captured at the first pointermove after GRACE ends.
2. GRACE ends -> STARE. `YOU` clock counts up in 0.1 s steps (tabular digits, `00:07.5`). `PAINTING` clock shows an unfalsifiable age with a new odd unit each round (9.10), always "ahead".
3. During STARE: heartbeat events every ~7.5 s, Stillness Dividend every 5 s, Glare tiers, a hidden **Cheat** fires 11 to 45 s in, Sudden Death Clause at 60 s as a backstop. The player's only act is to not act.
4. A **loss** (input blink, cheat, appeal, backstop) -> VERDICT (stamp, card, REMATCH).

### 2.3 What counts as a blink (an immediate loss) during STARE (not GRACE, Honor OFF)
| Input | Rule |
|---|---|
| pointermove / mousemove | Track cumulative path length (ignore events with movementX and movementY both 0). **Micro-saccade** = more than 6 px of cumulative travel inside any 400 ms window. Sandra permits **3 free micro-saccades per round**; after one is counted, re-anchor and ignore movement counting for 700 ms (so one bump costs one). The **4th is a blink**. HUD shows three eye-dot pips ("Micro-saccades remaining: 3, per Sandra"); spent pips go dark with a tick sfx and a 9.3 saccade line. Sub-threshold travel is accumulated in `drift` for the Continental Drift secret. |
| pointerdown / mousedown / click / touchstart | instant blink (idempotent: first one wins, see Risks) |
| wheel, touchmove (over 12 px), touchend | instant blink |
| keydown or keyup (any key including Tab, Escape, Shift) | instant blink |
| window `blur`, `document.visibilitychange` to hidden | blink, "tab" verdict |
| window `resize` (width or height changed by >= 2 px from the value at STARE start; on coarse-pointer devices ignore height-only changes) | blink, "resize" verdict (unique bylaw; 7:5 secret, 8.4) |
| `pointerleave`/`mouseleave` of `root` when `relatedTarget` is outside root (ignore touch and `relatedTarget` null while `document.hidden`) | blink, "left the room" verdict |
| Honor System ON | none of the above are checked; only cheats, the Sudden Death backstop and the appeals pool can end a round |

Touch players: tap GO, then lift and leave the screen alone. A touch player wins stillness by simply not touching; they still lose to the cheat, exactly as everyone does.

### 2.4 Things the player actually controls (all cosmetic, none matter)
1. **Where the cursor rests** when the stare begins: pupils track it (up to 4 SVG units, with 1 s lag from Beat 7). Resting-position lines (9.7) fire once per round at 5 s from Beat 3 on (60% chance; 100% in Beat 7): eye, face, frame, wall, placard, clock, corner.
2. **Whether to hold at all**: Glare tiers climb at 3, 7.5, 15, 25, 40, 60 s (Mild, Firm, Withering, Notarized, Municipal, Unreasonable) and the painting reacts, but Glare does nothing. The Glare ring (a mint/mustard SVG ring) is **hidden until Beat 3**, then shown as a fake progress bar. Tier lines always fire from Beat 1.
3. **Dragging** (Beat 8 and the Hook secret only).
4. The 7.50 to 7.59 s blink window (secret, 8.5).

### 2.5 Meh economy (tiny, all `api.award`, batched so floaters are not spammy)
- Stillness Dividend: +0.2 Meh every 5 s held (stamp the reason "Stillness Dividend"; reuse the text in 9.6).
- Participation Meh on every loss: `min(4, 1 + 0.5*glareTier)`; round 1 loss pays exactly 1 plus the first-loss line.
- Appeal: -0.5. Cooling-off tea press: -0.5. Spam fee is the same -0.5.
- Secret/achievement payouts are done through the achievement `reward` field (do NOT also call `api.award` for the same amount).

---------------------------------------------------------------------

## 3. State machine

States: `READY` (only before round 1 of a mount), `GRACE`, `STARE`, `VERDICT`, `COOLING` (spam), `SCENE` (hook fall/rehang drag or ending ceremony, runs inside VERDICT as a sub-state so GO is always available).

```
READY --GO--> GRACE --3s--> STARE --lose(cause)--> VERDICT --GO--> GRACE ...
VERDICT/READY --12 inputs in 4s--> COOLING (7.5s) --> VERDICT
VERDICT --mouse wiggle 3s--> SCENE:hookFall --rehang or 20s--> VERDICT
STARE (Beat 10 gala complete) or VERDICT after module time >= 10:00 --> SCENE:ending --> VERDICT (Round 1 Again)
```
Every STARE round has a `roundId`; **every timer callback created for a round must check `roundId === current && state === 'STARE'`** and all round timers are cleared in `endRound()`.

Module-level clock `elapsed = (api.now() - t0)` in seconds (divided by `K`, see 3.2). Beat is `beatAt(elapsed)`. Beat changes are **applied at transitions into READY/GRACE/VERDICT** (never mid-round): the beat's set dressing is mounted, its intro line fires, and the placard rule is added.

### 3.1 Beat table (wall clock since mount, `K`-scaled)
| # | Time | Name | Dressing mounted at beat entry | Featured Cheat (debut guaranteed on the first round started in this beat) | Placard additions |
|---|---|---|---|---|---|
| 1 | 0:00-0:45 | The Plain Loss | painting, placard, Dennis (corner plant, SVG ficus), picture light, dust | `retro` (round 1 is ALWAYS `retro`) | Rule 1 |
| 2 | 0:45-1:30 | The Fly | FREE MEH bait button may appear | `fly` | Rule 2 |
| 3 | 1:30-2:15 | The Reflection | glass layer, Glare ring visible, pendulum clock on right wall (clock secret unlocks) | `reflection` | (none) |
| 4 | 2:15-3:00 | Tag Team | cow painting `Meadow With Mild Cow (c. 1822)` hung on a rail at the left | `cow` | Rule 3: See Rule 2. |
| 5 | 3:00-3:45 | Closing Time | mop bucket (bottom right) | `closing` | (none) |
| 6 | 3:45-4:30 | The Paperwork | form tray on the placard ("Forms pending: 0") | `forms` | Rule 4, 4a, 4b |
| 7 | 4:30-5:30 | The Painting Looks Back, Personally | vignette overlay, notary stamp slot, pupil lag 1 s | `intensity` | (none) |
| 8 | 5:30-6:30 | The Wall Falls | (hook is always present) | `wallfall` | Rule 5, 5a |
| 9 | 6:30-8:00 | You Are The Exhibit | visitor walkway strip (bottom), medal on Dennis, cafe sign slot | `cafe` (+ the Quiet Moment, 3.4) | Rule 6 |
| 10 | 8:00-10:00 | The Gala Final | velvet rope, Gerald's tiny chair, bunting | `gala` | Rule 7 1/2 |

After Beat 10 (or the Gala completing) the **Not-Ending** (section 10) resets the beat clock to 0 and increments `loops`.
Cheat selection per round: round 1 forced `retro`; the first round started in a beat whose featured cheat has not been seen this loop forces it; otherwise draw from a **shuffle bag** of cheats with `gate <= beat` (refill when empty; exclude `gala`; in Beat 10 every round is `gala`). 75% of Beat 1 to 9 rounds after the debut draw the beat's own featured cheat, otherwise the bag.

### 3.2 Time scale
`K = api.selftest ? 0.1 : 1`. Multiply by `K`: beat boundaries, cheat fire times, Glare tiers, heartbeat and dividend intervals, idle thresholds (7.3), Quiet Moment, Sudden Death. Do NOT scale GRACE below 0.5 s, the 0.6 s button lockout below 0.1 s, or CSS animation durations. Loops (`loops >= 1`) run all cheat and beat times at `x0.7`.

### 3.3 Cheat table (fires are seconds into STARE; clamp to >= 11 so the Continental Drift check at 10 s always runs first)
| id | gate | timeline inside the round | loss cause line | bylaw |
|---|---|---|---|---|
| `retro` Retroactive Start Date | 1 | wins at 12 s | 9.4 retro | Bylaw 4(b)(iii-ish) |
| `fly` Insect Proxy | 2 | fly enters 4 s, lands on painting's nose 8 s, drifts to your last cursor spot 11 s, hovers; "blinks on your behalf" 15 s | 9.4 fly | Bylaw 12 (was 11) |
| `appeal` Technicality Pool | 2 | wins at random 30-45 s via a pool of three: Playing Dead, Sustained Gaze, Stillness Without Commitment | 9.4 appeal | Bylaw 9(c) (continued from 9(a)) |
| `reflection` | 3 | silhouette shows 3 s; yawns 11 s; waves 14 s; blinks twice 16 s; loss at 17 s | 9.4 reflection | Bylaw 4(b) (per Sandra) |
| `cow` | 4 | cow slides in on the rail 4 s; Rule-3 line 9 s; out-stared from behind at 19 s | 9.4 cow | Bylaw 7 1/2 (see Bylaw 7 1/2) |
| `varnish` | 4 | painting blinks once (120 ms lid) at 22 s, gallery gasp, then 40 more blinks over 3 s; loss at 26 s "provocation by varnish" | 9.4 varnish | Bylaw 3 (subsection missing, was never there) |
| `closing` | 5 | closing announcement 14 s; lights out 20 s; mop appointed Night Guard 22 s; loss 27 s | 9.4 closing | Bylaw 6.5 (disputed by 6.4 and 6.6) |
| `forms` | 6 | blink-prompt appears 8 s (decided for you at 18 s: line only); forms drop 1 per 1.5 s starting 4 s; at **17** forms the pile "reaches the painting's weight": loss (~29.5 s) | 9.4 forms | Bylaw 27B/6 (Request for Bylaw 27B/7) |
| `intensity` | 7 | tier lines as usual; Withering (15 s) eyes scale to 1.6x and vignette tightens each tier; Notarized (25 s) notary stamp appears and "witnesses nothing"; loss 30 s | 9.4 intensity | Bylaw 14(d) (d is for decoration) |
| `wallfall` | 8 | painting drops off its hook at 14 s with a thud (shake respects reduced motion); pale younger rectangle exposed; you have **12 s** to drag it back; touching it loses (see 6.3); not touching it loses at 26 s | 9.4 wallfall | Bylaw 5(a) (see 5) |
| `cafe` | 9 | visitors file past staring at YOU 5-14 s; painting leaves for the cafe at 15 s (empty frame, sign `BACK IN 5 MIN`); loss 21 s | 9.4 cafe | Bylaw 2 (as amended by lunch) |
| `gala` | 10 | scripted composite (section 6.4) | Gerald's ruling | Bylaw Tuesday |
| `sudden` | any | backstop: Sudden Death Clause at 60 s makes the painting win retroactively (only reachable if a cheat was suppressed) | 9.4 sudden | Bylaw 1 (was 100, rounded) |

Bylaw strings above are the "broken number" bank; the verdict card picks the cheat's own bylaw. Input-blink verdicts draw from the bylaw bank in 9.5 with no immediate repeat.

### 3.4 The Quiet Moment (Beat 9, strangely touching, once per loop)
In the first Beat 9 round that survives to 9 s: provocations stop (the `cafe` loss is deferred to 34 s), the room dims in three CSS steps, and the painting speaks in its own voice (9.8) while a HUD line reads **"Mutual regard: 3 seconds. Not scored. Not scoreable."** for exactly 3 s of eye contact (pupils centered, no drift). No Meh for it, on purpose. Achievement `staring-contest.regard`. If the player blinks during these 3 s, no verdict is shown: the placard stays, and the round silently restarts into GRACE (at most 2 silent restarts, then it is an ordinary loss). The last visitor (a child) holds the stare for 2.1 s and nods (9.8).

---------------------------------------------------------------------

## 4. Heartbeat, rare events, and "never an empty stare"

Something small and visible must happen **every ~7.5 s** inside a round (shuffle bag, never repeat within 3): dust motes cross the picture light; the picture light flickers once; pupils shift 1 px; the eyebrow tilts one degree further (accumulates in-round, resets next round: "just remembered something" to "remembered what"); the placard rewrites one word; a distant gallery cough (`api.sfx('tick')`); a Management whisper from the 9.6 aside bag (rate limit: never two narrator lines within 3 s of each other except verdict/cheat lines). The Stillness Dividend (every 5 s) floats +0.2.

Rare events:
- **Wink** (1 in 40 rounds, at a random 6-20 s): the painting winks (one eyelid), line 9.11, painting score +1 anyway, does not end the round.
- **Clock Wins** (4% per round, only from Beat 3; at a random 8-30 s): pupils slide right to the pendulum clock over 1 s, then one tick of "victory" (1 s, sfx `tick`) and a loss "The clock wins."
- **Gerald cameo** (Beat 4+, 1 in 6 verdicts, max once per mount): a text-only drop-in line via `api.say(..., {who:'Gerald'})` (9.13). Sets nothing.
- **Toast** (once per mount, after loss #7): a toast-slide line via `who:'The Toaster'` (9.13).
- **Ghost tremor** (secret line, 1 in 12 rounds that survive 41.2 s): see 9.6.

---------------------------------------------------------------------

## 5. Persisted data, stats, scoreboard

`api.save` keys: `wins` (the huge painting win total, starts 1743), `best_ms`, `rematches`, `rounds`, `losses`, `artistIdx`, `appeals`, `loops`, `blinkSecretDone` (bool), `hookDone` (bool), `honor` (bool), `cooldowns` (session only, not persisted), `seenCheats` (object, per loop, not required to persist).

Scoreboard: `PAINTING WINS: {fmt(wins)}`. Each loss adds `pick([1, 7, 12, 17, 283, 1743])` (so a loss adds an odd amount). `Best stare: {t} s (provisional)`. `Rematches: {n}`. Footnote under the scoreboard grows by loss count (9.14).

Stats (all via `api.stat.*`, names exactly): `staring-contest.rounds`, `.losses`, `.best_ms` (use `api.stat.max`), `.glare_max` (max, value 1 to 6), `.cheats_seen`, `.reflections`, `.fly_losses`, `.rematch_spam`, `.idle_blinks`, `.hooks_rehung`, `.clock_wins`, `.seven_five`, `.appeals`, `.still_seconds`, `.mouse_blinks`, `.key_blinks`, `.touch_blinks`, `.resizes`, `.tab_blinks`, `.exhibits`, `.loops`. Also set flag `staring-contest.sawSingleFrame`-style flags are NOT needed; set flag `staring-contest.met` once.

Engine callbacks to use: `api.stat.get('clicks.total')` and `api.stat.get('time.seconds')` for the career-clicks footnote (9.6); `api.flag.get('metGerald')` for Gerald.

---------------------------------------------------------------------

## 6. Systems detail

### 6.1 Placard
Brass placard right of the frame (desktop 260 px; under the painting on mobile). Georgia serif, italic title. Contents: title line, artist line, rules list (growing), status line (`aria-live="polite"`, the second narrative region), Honor toggle, form tray (Beat 6+), and `Rule` counter. **Initial text:** "PORTRAIT OF A MAN WHO HAS JUST REMEMBERED SOMETHING. Oil on panel, 1743 (Revised 1744). Currently winning." The **artist line changes every round** and each change is delivered as established fact (index advances per round, loops at the end with "You, retroactively" sticking after the not-ending): see 9.15.

### 6.2 Glare ring
SVG ring around the YOU clock. Tier thresholds 3, 7.5, 15, 25, 40, 60 s; ring fills continuously (mint), tier name below in mustard. At each tier: `api.stat.max('staring-contest.glare_max', tier)`, tier line (9.2), `api.sfx('tick')`. Tier 3 (Withering) unlocks achievement `staring-contest.withering`.

### 6.3 Drag (Beat 8 `wallfall` and the Hook secret)
Single shared function `startPaintingDrag(onDone)`. The painting wrapper gets `touch-action:none; cursor:grab`. `pointerdown` on the painting wrapper (this is the one pointerdown that is not a blink while the fall is active) -> `setPointerCapture`; `pointermove` moves it; `pointerup`/`pointercancel` ends. For `wallfall`: ANY drag start = loss "rehang loss" (9.4 wallfall) after the drop, with a different line if dropped on the hook (the hook is an SVG element at the top of the frame; success radius 40 px from the hook anchor) vs elsewhere. Every other input in that phase is still a blink. For the Hook secret, success within 20 s pays (7.4) and ends the scene.

### 6.4 Gala (Beat 10) scripted composite
One round of 44 s, composing the other cheats' **stage effects** (not their losses): 6 s fly, 12 s reflection yawn, 16 s cow slides in, 22 s lights out, 28 s forms flood (17 forms in 3 s), 34 s velvet rope drops. Gerald (🥔 on a tiny chair, a CSS tie, the fly lands on his hat if the fly has retired, 9.8) presides. **Every loss in Beat 10, early or late, gets a ruling from Gerald** (9.8 rulings, in order, each longer than the stare is allowed to be; show as a sequence of 2-3 bubbles over ~8 s, skippable by pressing GO). Greeting uses `api.flag.get('metGerald')` (if not set, he introduces himself and calls `api.flag.set('metGerald', true)`). The ending triggers at the first of: the Gala script running its full 44 s, or the first verdict at module time >= 10:00.
Architecture requirement: implement each cheat's visuals as a `fx.<name>.start()/stop()` pair so both its own cheat and the gala can use them.

### 6.5 Lights out (`closing` and Gala)
A full-room black overlay (`rgba(0,0,0,.96)`, `pointer-events:none`) with a **second, tiny SVG layer ABOVE it** containing only the two eyes (same coordinates as the painting's eyes; pupils synced; soft drop-shadow glow `filter: drop-shadow(0 0 6px #fff1a8)`). Dennis is also raised above the overlay (he is the only thing still lit, 9.4 closing). Do not use `mask-image` (cross-browser flakiness); the duplicated-eyes layer is the buildable equivalent.

### 6.6 Fly
14 px inline SVG (body ellipse + two translucent wing ellipses), `api.requestAnimationFrame` loop that only runs while the fly is active. Random-walk steering plus targets: painting nose, then the last known pointer coordinates in root coordinates (if no pointer has moved, use the GO button center). Never harmed, never explained. Career (running gag 2): first appears Beat 2; from loop 0 Beat 3+ it may crash other rounds as a 15% cameo; "Official Observer" sash after fly loss #3 (a CSS ribbon on the fly); judge's collar after #5; review of your stare after loss #2 (`9.4 fly review`); retires at the not-ending, returns in loops wearing a tiny hat. If the fly is hovering on the cursor and the player is still ≥ 3 s, the boundaries line (9.4 fly) fires once per round.

### 6.7 Reflection
In the glass layer: a blurred emoji-pose silhouette (a `🧍` mirrored with `transform: scaleX(-1)`, `filter: blur(2px)`, 25% opacity, `mix-blend-mode: screen`). Yawn = `scaleY` wobble keyframe. Wave = a `👋` pseudo-element rotating. Blink = opacity dip twice.

### 6.8 Cow painting
A second small frame hung on a ceiling rail at the left of the stage (width ~30%). Inline SVG/CSS: green field, three clouds, a cow seen from behind (rounded rectangle body, two legs, a swishing tail, a flat "smug rear"). Slides in on the rail with `transform: translateX` over 600 ms (instant under reduced motion). Title plate: `MEADOW WITH MILD COW (c. 1822)`. Stays hung from Beat 4 on; in the `cow` round it "tags in".

### 6.9 Forms (Beat 6)
Absolutely-positioned paper `div`s in the form tray with slight rotation and a mini header taken from 9.4 forms headers; each gets a tiny stamp. **Hard cap 17.** Clear all at the start of each new round. The blink prompt (modal-looking card with three real buttons) appears at 8 s; **clicking any button is a blink** with its own line; not choosing is "a choice made for you at 18 s" (line only).

### 6.10 Visitors (Beat 9)
Up to 12 total visitors (hard cap), each a 24 px emoji person on a looping CSS walkway strip along the bottom. Each visitor pauses in front of YOU (the cursor spot or the center of the stage), shows a speech bubble with a review (9.8), a stare time (shown as `{t} s`), and gets bored. Visitor #3 reviewed triggers `staring-contest.exhibit`. The last visitor of the beat is the child (2.1 s, nod). At Beat 9 the medal appears on Dennis: a 🏅 and the line "Dennis (Plant) has been awarded a medal. Dennis (Plant) has been awarded nothing else, and is thriving."

---------------------------------------------------------------------

## 7. Idle, spam, and the other secret machinery

### 7.1 Long idle (READY or VERDICT, no input of any kind; thresholds `K`-scaled)
- 60 s: line "You have been on the results screen for a minute..." (9.6 idle). (In READY: the painting "begins without you": same line.)
- 120 s: painting falls asleep with its eyes open, little `zzz` bubble.
- 180 s: **The Blink Heard Round the Gallery**. The painting's eyelids (hidden SVG rects) pass over the pupils for exactly **one 100 ms frame**; the placard types "The painting has blinked. Nobody saw." and the line 9.6 follows. Achievement `staring-contest.blink` (reward 7.5), stat `staring-contest.idle_blinks`. Fires once per save for the achievement; afterwards the blink still plays but is "just a blink" (line 9.6). Must only fire if the tab is visible and the module is the active window.
- 240 s: "This gallery closed an hour ago" sign lights up; achievement `staring-contest.quiet`.
Any input resets the idle timer.

### 7.2 Spam: Conciliation Hearing
Count discrete inputs (pointerdown, keydown) in **all states except COOLING**: 12 inputs within 4 s triggers a **Mandatory Cooling-Off Period of 7.5 s**.
- Shutters: two CSS eyelid panels close over the room for 600 ms (opacity fade under reduced motion), `api.sfx('sad')`.
- If a round was in GRACE it is cancelled silently (no loss). The GO button is replaced by a **tea cup** (`🍵` button). The painting "sits": a tiny SVG chair pushes up under the frame and the painting cannot use it.
- Management apologizes "on the painting's behalf, but only to you" (9.9).
- Pressing the tea 3 times extends the period by 7.5 s and fines 0.5 Meh (only once per cooling-off). Each press has its own line.
- 2nd cooling-off in a session within 60 s: the painting rolls its eyes in a full circle (CSS keyframe on the pupil groups).
- 3rd cooling-off: the chair has a cushion. Nothing else is awarded. Stat `staring-contest.rematch_spam` increments each time.
- Spam detection is suspended during COOLING and for 1 s after.

### 7.3 Mouse-wiggle spam: The Hook (VERDICT and READY only)
Detect: 10 horizontal pointer direction reversals, each segment >= 20 px, within 3 s. Effect: the painting tilts, swings and falls off its hook onto the carpet (thud + `api.sfx('boing')`, shake respects reduced motion). SCENE:hookFall runs for **20 s** (`K`-scaled) while the verdict card stays usable. Success (drop within 40 px of the hook anchor): +5 Meh via achievement `staring-contest.hook`, stat `hooks_rehung`, painting now permanently hangs **1 degree off-center for the rest of the session** ("The painting is level. The wall is the one that moved."). Failure: the painting re-hangs itself, a pale rectangle stays on the wall and **grows a caption by the next round** (9.16). Pressing GO cancels the scene (re-hang instantly).

### 7.4 Round-level secrets
- **7 1/2 Seconds of Fame:** if a BLINK (input, not a cheat) happens with STARE time in `[7500, 7599]` ms, replace the verdict card text with an official 7 1/2 ceremony: a fanfare (`api.sfx('fanfare')`), a plaque card that is also a form, achievement `staring-contest.seven`. Once per save for the achievement; the ceremony itself repeats.
- **Continental Drift:** at 10 s (K-scaled) of STARE, if saccades = 0 and cumulative travel is between 3 and 12 px (sub-threshold, snail's pace), Sandra invokes Rule 9(c) (9.3 drift): for exactly 4 s the painting **forfeits** (a PAINTING FORFEITS banner), then the appeal is filed and the painting wins on appeal. Achievement `staring-contest.tectonic`.
- **Aspect Ratio Violation:** resize blink verdict cites 1.37:1; if `Math.abs(innerWidth/innerHeight - 1.4) < 0.01` at the resize blink, show the kind verdict instead ("ah"), achievement `staring-contest.aspect`. Costs nothing.
- **The Clock Wins:** see section 4; achievement `staring-contest.clock`.
- **Dennis click:** blink with the Dennis line (9.4 dennis). 3rd lifetime Dennis click: line "Dennis (Plant) is beginning to take it personally. Dennis is a plant. This is the loudest Dennis has ever been."
- **12 rematches via GO in one session without the lockout**: nothing extra (spam covers it).

---------------------------------------------------------------------

## 8. Achievements (ids prefixed `staring-contest.`; 14 declared, 7 secret)

| id | name | desc | icon | secret | reward |
|---|---|---|---|---|---|
| `staring-contest.first` | The Grand Concession of the Lesser Eye | Lose your first round to the painting. You have joined a very long queue of the defeated, which is also a queue. | 🥈 | no | 2 |
| `staring-contest.withering` | Order of the Withering Gaze (Third Class, Provisional) | Hold a stare long enough to reach Glare level Withering (15 seconds). The painting is neither withered nor concerned. | 👁️ | no | 3 |
| `staring-contest.insect` | Knight Commander of the Insect Proxy | Lose a round because a fly blinked on your behalf. The fly has been notified. The fly is not available for comment. | 🪰 | no | 2 |
| `staring-contest.exhibit` | Honorary Doctorate in Having Been Looked At | Be reviewed by at least three gallery visitors in 'You Are The Exhibit'. You are now qualified to stand near things. | 🎓 | no | 5 |
| `staring-contest.paperwork` | Baron of Unsuccessful Paperwork | File 5 appeals. The Appeals Desk found against you with great ceremony. It is a wall. | 📜 | no | 3 |
| `staring-contest.regard` | Lord Protector of Mutual Regard | Share exactly 3 seconds of eye contact with the painting. Not scored. Not scoreable. | 🤝 | no | 5 |
| `staring-contest.runnerup` | Runner-Up in a Field of One | Reach the end of the staring contest. The staring contest continues. | 🎗️ | no | 10 |
| `staring-contest.blink` | The Blink Heard Round the Gallery | SECRET. Wait three minutes on the results screen and witness the painting blink for exactly one frame. Nobody else saw. You did, probably. | 😑 | yes | 7.5 |
| `staring-contest.hook` | Lord Protector of the Hook | SECRET. Shake the painting off the wall, then hang it back up yourself within 20 seconds. The wall has never been this level, which is to say not. | 🪝 | yes | 5 |
| `staring-contest.seven` | Seven and a Half Seconds of Fame | SECRET. Blink in the narrow window of 7.50 to 7.59 seconds. The plaque is also a form. | 🕢 | yes | 7.5 |
| `staring-contest.clock` | The Clock Is Also a Contestant | SECRET. Witness the painting look away at the clock for one second. It does not count as losing. It does not count as anything. | 🕰️ | yes | 3 |
| `staring-contest.tectonic` | The Tectonic Plate Eats the Painting | SECRET. Win Rule 9(c) by drifting the cursor at geological speed. The painting lost for exactly 4 seconds. | 🌋 | yes | 5 |
| `staring-contest.aspect` | Aspect Ratio Violation, Waived | SECRET. Resize the window to exactly 7:5 during a stare. The frame was moved. It said 'ah'. | 📐 | yes | 2 |
| `staring-contest.quiet` | The Quiet Appreciation of Doing Nothing | SECRET. Remain on the results screen for 4 minutes. The gallery closed an hour ago. You are still here. | 🕯️ | yes | 1 |

`check()` functions are not needed; unlock with `api.achieve` at the events above (first: on first loss; withering: when Glare tier 3 is reached; insect: on fly loss; paperwork: when `staring-contest.appeals` reaches 5; runnerup: on the not-ending). Achievement toasts replace the Management line, so unlock slightly after the verdict line (200 ms) to avoid clipping it.

---------------------------------------------------------------------

## 9. Lines (ALL FINAL, VERBATIM)

### 9.0 Token handling
Local tokens: `{t}` stare seconds with one decimal, `{px}` pixels moved (integer >= 1), `{n}` a number, `{player}` `api.player.name`, `{count}` lifetime clicks, `{secs}` lifetime seconds. **Implement your own `fill(str, vars)`** and run every string through it before `api.say`/placard/textContent (do not rely on the engine to substitute inside direct `api.say`). Register shuffle bags with `P.addLines('m:staring-contest:<cat>', [...])` and read them with `api.line()` where tokens are not needed, or use a local shuffle-bag helper (never repeat the previous line, never repeat within the bag until empty). Never let `undefined`, `NaN`, `null` or `{token}` reach the screen.

### 9.1 Intro, ready, Escape
1. Welcome to the Gallery of Unmoving Things. Please stare at the painting. The painting has been briefed.
2. Press BEGIN STARING when ready. The painting has been ready since 1743.
3. The painting is a very patient painting. It has been waiting 283 years for somebody to hold still. You are the first to try on a weekday.
4. Management would like to remind you that eye contact is a core competency.
5. Eye tracking is calibrated using proprietary telepathy. If it misreads you, that is feelings.
6. (round 1 grace) Do not move the mouse. Do not press anything. Do not, for the record, think loudly.
7. (grace) Eyes Open. The grace period ends in three seconds. The click that started this round will not be held against you. Everything after it will.
8. (Escape) Escape is not a blink. Escape is a lifestyle.
9. (Escape, 2nd) Escape has been noted. Escape was not asked to leave. Escape has not been asked anything.
10. (Escape, 3rd) Escape pressed during the pause between contests. This is permitted. The painting is hurt anyway.
11. (Honor on) The Honor System has been enabled. The painting trusts you. The painting has no honor, so this is a gesture.
12. (Honor off) Honor System disabled. Your hands are back on the clock.

### 9.2 Glare tiers (fire at 3 / 7.5 / 15 / 25 / 40 / 60 s)
13. Glare level: Mild. The painting has been mildly stared at. It has made a note in a very small notebook.
14. Glare level: Firm. Firm is the second of six. One of the others is notarized.
15. Glare level: Withering. The painting is neither withered nor concerned. The wall nearby has withered slightly in sympathy.
16. Glare level: Notarized. A notary has been called. The notary is also staring. Nobody is winning but the painting.
17. Glare level: Municipal. Your stare now requires a permit. The permit is in the building. The building is looking at you.
18. Glare level: Unreasonable. This is the final level. There is a sixth level. It is not this one.

### 9.3 Blink causes: Management line (shuffle bag per cause) / bylaw or short cause on the card
Mouse (the 4th micro-saccade or bigger):
19. You moved. The painting saw it. The painting saw it in 1743 and was already disappointed.
20. Your cursor moved {px} pixels. Sandra has measured {px} pixels. Sandra has feelings about {px} pixels.
21. Mouse displacement detected: {px} pixels. The painting measures in cubits, is unimpressed by pixels, and has won anyway.
22. Your cursor moved. The pixel has been logged, framed and hung in the east wing.
Micro-saccades (1 to 3, shown when each pip goes dark):
23. Micro-saccade 1 of 3 forgiven, per Sandra.
24. Micro-saccade 2 of 3. Sandra is beginning to have a face about it.
25. Micro-saccade 3 of 3. The next one is a blink. Sandra has said this in writing, in pencil.
Key:
26. You pressed a key. The painting did not press a key. This is what discipline looks like, framed.
27. That was a keypress. The painting felt it in the frame.
28. A key was pressed. The key has been asked to leave the contest. It is still on your keyboard, which is awkward for everybody.
Click / wheel:
29. You clicked. The painting is oil on panel and cannot click back. It has been clicked at emotionally.
30. You scrolled. The painting did not go anywhere. It is, famously, where it is.
Touch:
31. Touch detected. The painting does not have a finger. It does not need one. It is already above you.
32. You touched the screen. The painting wishes it noted that it was touched and nobody asked.
Leaving:
33. Tab switch detected. You blinked with an entire browser.
34. You looked away. The painting saw you looking away. The painting will not mention it. The painting is mentioning it.
35. You left the room. The painting remains in the room. The painting is also, technically, the room.
Resize:
36. You resized the window. That is moving the painting, which violates the Hands Off Exhibit rule and also the painting.
37. (card cause) Aspect Ratio Violation. 1.37:1 is the painting's. The window is not entitled to it.
38. (7:5 kind verdict) The frame hums a single note. It says 'ah'. The painting wins, but kindly.
Dennis / bait:
39. (Dennis click, Management) Dennis was not part of the contest.
40. (Dennis verdict card) Disqualified for contact with a plant. Dennis is thriving, and not looking, which is the true winning move.
41. (FREE MEH appears) A button has appeared: FREE MEH (DO NOT CLICK). We know you. We have a file. It is a very thin file, but it says 'will click'.
42. (FREE MEH clicked) You clicked FREE MEH (DO NOT CLICK). It was not free. It was not Meh. It was, in the end, a button.
43. (Dennis 3rd click) Dennis (Plant) is beginning to take it personally. Dennis is a plant. This is the loudest Dennis has ever been.
Drift (Continental Drift secret):
44. Sandra invokes Rule 9(c): Geological Movement Is Not Movement. The painting loses this round by default for exactly 4 seconds before the appeal is filed.
45. The appeal has been filed. The painting wins on appeal. The appeal was filed in 1743.

### 9.4 Cheat setup and loss lines
`retro`:
46. (loss) The painting has won. It began staring in 1743. You were given a head start of zero.
47. (card cause) Retroactive Start Date. The painting began first. The record shows it began first.
`fly`:
48. A fly has entered the contest. Nobody registered it. It is competing as an Independent.
49. (placard) The fly has landed on the painting's nose. The expression has not changed, which was already the expression of a man who has met flies.
50. The fly is now on your cursor. You cannot swat it. Swatting is movement. The fly has read the rules more carefully than you.
51. (boundaries) The painting has asked the fly to step aside. The fly has declined. We are all learning something about boundaries.
52. (loss) Disqualified under the Insect Proxy Clause: the fly blinked on your behalf. Flies blink 140 times a second. It was a lot of blinking.
53. (sash, after fly loss 3) The fly has been given a sash. It reads OFFICIAL OBSERVER. The fly would like to say a few words and has said them.
54. (fly review, after fly loss 2) Fly review of your stare: 'Tasted of concentration.'
`appeal` pool (card causes, shuffle bag):
55. Playing Dead (not a recognized variant). You held still for the contest. The judge rules this 'playing dead'. It is being logged for next year.
56. Sustained Gaze. This is a category created thirty seconds ago and backdated to 1743. The painting wins by it.
57. Stillness Without Commitment. You were still. You were not, in the judge's view, committed. The judge was looking at the painting at the time.
`reflection`:
58. The glass over the painting reflects you. Your reflection has yawned. You are responsible for your reflection (Bylaw 4(b), per Sandra).
59. Your reflection waved at the painting. The painting did not wave back. The painting is not unfriendly; the painting is oil.
60. (loss) Reflection disqualified for blinking twice. You personally are fine. You are simply associated with the reflection.
`cow`:
61. Please welcome Meadow With Mild Cow (c. 1822), standing in for the painting, who is not tired, but thought the cow should have a turn.
62. The cow is not looking at you. The cow has never been looking at you. This is the whole strategy.
63. (loss) You cannot out-stare the rear of a cow. Nobody has. It is a distinguished rear, and it has won.
`varnish`:
64. The painting blinked. The room gasps. Management rules it a crack in the varnish. It was a very expressive crack.
65. The painting blinked 40 more times. All varnish. The varnish is having a day.
66. (loss) Provocation by varnish. You were distracted by a crack that had eyelids. Management stands by the crack.
`closing`:
67. The gallery closes at 7 1/2 o'clock. The painting stays. The painting lives here and has a key.
68. Lights out. The painting's eyes are the only thing visible. Management would like to remind you that the painting is a painting.
69. A mop in a bucket has been appointed Night Guard. The mop has sided with the painting. The mop wrote that down.
70. (Dennis in the dark) Dennis (Plant) is still lit. Dennis is not impressed by either of you.
71. (loss) The painting has night vision. You do not. This was in the brochure, on the back, in the dark.
`forms`:
72. Form 27B/6 (Request to Stare) is pending. Form 27B/7 (Request to Stop Staring) was destroyed in 1998 and has been crossed out in advance.
73. (placard prompt) Would you like to blink? YES / NO / REMIND ME LATER. Not choosing is a choice. The painting has chosen for you.
74. (prompt button clicked) You clicked a button on the blinking form. You will be reminded. You have been reminded. You lost.
75. (loss, 17 forms) Seventeen forms are now in the corner. Do not touch them. The pile has reached the painting's weight, and the painting has won on paperwork.
Form headers (cycle, tiny print on each paper): Form 27B/6 Request to Stare; Form 27B/7 Request to Stop Staring (1998); Form 27B/8 Request for a Chair; Form 12 (was 11); Form 7 1/2; Form 4 Request for Form 4a; Form Tuesday; Form 14(d) Decoration.
`intensity`:
76. The vignette tightens. This is not a metaphor. It is a vignette, and it is tightening.
77. The painting's eyes are now 1.6 times their previous size. The painting says this is the same size. The painting is lying, accurately.
78. A notary has witnessed nothing. The notary's stamp is real. The nothing is also real.
79. (loss) The painting wins by intensity, a unit it made up this morning. It is, unrelated, a very good unit.
`wallfall`:
80. The painting has fallen off the wall. A cleaner rectangle of wall is visible. The wall looks younger. The wall is nervous.
81. Please re-hang the painting. Touching exhibits is forbidden. Please touch the exhibit. Both of these instructions are official.
82. (loss, dropped on hook) You hung the painting back up. You touched the exhibit. The painting wins; the hook also wins; you are third.
83. (loss, dropped elsewhere) You put the painting down near the hook. This is also touching. The hook has been informed. The hook is not upset; the hook is a hook.
84. (loss, did nothing) You did not hang the painting back up. This is also touching it, philosophically. The hook wins.
85. (thud) The painting has not been damaged. The painting was already damaged, in 1744, and has been revised.
`cafe` (exhibit flip):
86. Visitors are now staring at you. You are the exhibit. You are, regrettably, still not winning.
87. (sign on the empty frame) BACK IN 5 MIN
88. (loss) The painting has gone to the cafe. A painting at the cafe is not looking at you, and so cannot have lost. This is the whole rule.
89. (Dennis medal) Dennis (Plant) has been awarded a medal. Dennis (Plant) has been awarded nothing else, and is thriving.
`sudden`:
90. (loss) Sudden Death Clause invoked at 60 seconds. The painting wins retroactively. It was always going to win retroactively. It is a clause that has had a long career.
`clock` (rare):
91. The painting has looked away. This does not count as losing. It does not count as anything. Enjoy it for one tick.
92. (loss) The painting looked away at the wall clock for one second. The clock is wrong, confidently, and therefore wins.
`wink` (rare):
93. A wink is not a blink. This is the opposite of a loophole.

### 9.5 Verdict cards (generic Management verdicts, shuffle bag) and bylaw bank
94. Your stare lasted {t} seconds. The painting's stare is ongoing. We have rounded in the painting's favor, per policy.
95. The painting has been declared winner by a committee of one. The committee is the painting.
96. You lost on a technicality. The technicality was the entire contest.
97. Your blink has been entered into the record as 'adequate'. The painting's blink is not in the record. The painting has no blink.
98. You flinched at {t}. The painting did not flinch at {t}. The painting did not flinch in 1743 either, as far as we can tell.
99. Verdict No. {n}: the painting wins by seniority. Per policy, the older party is less blinky.
100. (first loss, award) Consolation prize: 1 Meh and a participation plaque. The plaque is also winning.
101. (award line) Participation Meh: {n}. The painting has framed the receipt.
7 1/2 ceremony:
102. You lasted exactly 7.5 seconds. This is the official unit of nothing in particular, and it has been waiting for you.
103. (plaque, also a form) SEVEN AND A HALF SECONDS OF FAME. Please sign here, here, and half here. Form 7 1/2. This plaque is also a form.
Bylaw bank (input-blink verdicts; show as "Cause of loss: {bylaw}, per Sandra"):
- Bylaw 4(b)(iii-ish)
- Bylaw 12 (was 11)
- Bylaw 7 1/2 (see Bylaw 7 1/2)
- Bylaw 9(c) (continued from 9(a))
- Bylaw 27B/6 (Request for Bylaw 27B/7)
- Bylaw 3 (subsection missing, was never there)
- Bylaw 1 (was 100, rounded)
- Bylaw 14(d) (d is for decoration)
- Bylaw 6.5 (disputed by 6.4 and 6.6)
- Bylaw 2 (as amended by lunch)
- Bylaw Tuesday

### 9.6 Heartbeat asides, dividend, callbacks, idle
Asides (bag; one per ~7.5 s heartbeat that picks Management):
104. The picture light flickers once. It has done this since 1743. The bulb has been replaced seven times. The flicker is original.
105. Dust crosses the painting's face. The painting does not blink. The dust has been noted.
106. A distant gallery cough. It is not the painting. The painting has a very quiet cough, and has never used it.
107. The painting's eyebrow has moved one degree. It has gone from 'remembered something' to 'remembered what'.
108. The placard has rewritten one word. It will not say which. It says it is a matter of record.
109. Somewhere in the building, a clock disagrees with another clock. Both are confident.
110. In the corner, Dennis (Plant) is not staring at anyone. Dennis is thriving. Dennis would like the record to show it has no eyes.
111. Sandra from Compliance has flagged your posture as 'attentive, but suspiciously confident'.
112. A slice of toast slides under the door marked ENCOURAGEMENT. It is lightly brown. It says: still lost.
113. Your pupils have been measured. They are the size of two small disappointments.
114. The painting's eyes follow you around the room. The room is a browser tab. The painting is thorough.
Dividend:
115. Stillness Dividend: 0.2 Meh. Earned by doing exactly nothing, with exceptional commitment.
Career callbacks (verdict footnote, rotate, once each per mount at most; use `api.stat.get`):
116. Our records show you have clicked {count} times in your career. The painting has clicked zero. Statistically, it is ahead.
117. Our records show {secs} seconds of your life in this building. The painting has been present for all of them, and several before.
Ghost tremor (rare, round survived 41.2 s):
118. At 41.2 seconds the painting measured a tremor of 0.4 pixels in your left hand. You did not have a left hand on the mouse. The painting has noted this.
Idle ladder (7.1):
119. (60 s) You have been on the results screen for a minute. The painting is also staring at the results screen. It is good news for no one.
120. (120 s) The painting has fallen asleep with its eyes open. This is called 'being a painting'.
121. (180 s, placard) The painting has blinked. Nobody saw. If a painting blinks in a gallery and nobody is looking, it was probably the lighting.
122. (180 s, Management) Management is not saying you saw it. Management is saying it was probably the lighting.
123. (later blinks) The painting blinked again. This time it is just a blink.
124. (240 s, sign) THIS GALLERY CLOSED AN HOUR AGO. YOU ARE STILL HERE. THIS IS THE LONGEST ANYONE HAS STAYED WITH THE PAINTING.

### 9.7 Resting-position lines (fire once per round, 5 s in, Beat 3+; mapped from last pointer position at STARE start)
125. (eye) You are pointing at the eye. That is rude in nine cultures and in the Gallery Handbook, Appendix 7 1/2.
126. (frame) You are resting your cursor on the frame. The frame is flattered. The painting is not jealous. The painting is never jealous.
127. (wall) You are staring at the wall beside the painting. The wall has noticed. The wall has no comment, and the wall has won.
128. (placard) You are reading the placard. The placard is not part of the contest. The placard is, however, winning.
129. (corner) You have parked your cursor in a corner. It is the only place in the room with no opinions.
130. (clock) You are looking at the pendulum clock. The painting has looked too. The clock is wrong and unbothered.
131. (face) You are resting on the face. The painting has no comment. The painting is wearing the expression it was already wearing.

### 9.8 Beat intros, rules, Quiet Moment, visitors, Gala, Gerald
Beat intro lines (fire at beat entry, priority 1):
132. (Beat 2) Rule 2 has been added to the placard: The painting may move. Please do not take this personally.
133. (Beat 3) A pane of glass has been installed over the painting for its protection. It has also been installed for yours.
134. (Beat 6) The placard has sprouted a form tray. It is not clear who requested this. Probably Form 27B/6.
135. (Beat 7) The painting now tracks the exact spot your cursor rests on, with a one second delay. This is not a threat. It is an observation with eyes.
136. (Beat 8) The painting will no longer support your confidence. This is a structural comment.
Placard rules (added in order; each shown as one list item):
- Rule 1: Do not move.
- Rule 2: The painting may move.
- Rule 3: See Rule 2.
- Rule 4: Thinking loudly is a blink. Rule 4a: Thinking quietly is a smaller blink. Rule 4b does not exist. Do not look for 4b.
- Rule 5: Touching exhibits is forbidden. Rule 5a: Please touch the exhibit.
- Rule 6: You are the exhibit.
- Rule 7 1/2: Rule 7 1/2 does not apply to the painting, nor to Rule 7 1/2.
Quiet Moment (placard, in the painting's own voice, first time it speaks):
137. I have been looked at for 283 years. Nobody has stared back until you.
138. How was your day? Do not answer. You are in a contest. But I would have liked to know.
139. Mutual regard: 3 seconds. Not scored. Not scoreable.
140. Management dims the lights a little. This is not a policy. This is just nice.
Visitor reviews (bag; one per visitor, each with its `{t}` stare time, e.g. `Visitor 3 looked at you for 2.1 seconds. Review: '...'`):
141. Very still. Would have liked a chair.
142. Seems like the type who has a favorite pen.
143. Not as large as the placard suggested.
144. Stared back. Rude. Five stars.
145. Looks tired. Is that part of it?
146. Better than the cow. Worse than the cow.
147. The frame is nicer than the contents.
148. Would not touch. Has not been told whether touching is allowed.
149. (the child, last visitor, fixed) Visitor 12, aged about 7 1/2, looked at you for 2.1 seconds. Review: she nodded. That was the review.
150. (Management, after the child) The last visitor held the stare for 2.1 seconds and nodded. Management is looking at the ceiling to give you privacy.
Gala (Beat 10). Intro:
151. Tonight the painting will defend its title against everything. The title is 'Painting'. It has always held it.
Gerald greeting (use `who:'Gerald'`):
152. (metGerald true) Ah, {player}. We have met. I have judged many contests. A potato does not blink. Nobody told me it was a skill.
153. (not met; then set the flag) I am Gerald, Vice President of Spuds. I have been asked to preside. I have no eyes to speak of, which makes me impartial and also useless.
Gerald rulings (in order, one per loss during Beat 10, each delivered as a 2-3 bubble speech; later rulings repeat from #3 if more losses):
154. The painting wins. The painting also loses. These are the same result, wearing different hats.
155. I rule that the stare was too short. I also rule that it was too long. I rule on the length of rulings, and this one is going on.
156. The fly is awarded the fly's own medal. The medal is the fly. The fly accepts, feeling the weight of it.
157. In the matter of the cow: the cow was always at the back. This is the nature of cows and of backs.
158. The mop has submitted a minority opinion. It is damp. It is overruled by being damp.
159. The committee roster is read. Hendrik. Hendrik's cousin, also Hendrik. Three plants, two of them Hendrik. And {player}.
160. Sandra from Compliance has reviewed the footnotes. They cite each other in a loop. She has declared the loop compliant.
161. (fly lands on Gerald's hat) The fly has landed on Gerald's hat. Gerald has not noticed. Gerald is a potato; the hat is a hat.
162. (fly retires) The fly has retired. The fly will be at the reception, mostly on the cheese.

### 9.9 Rematch labels, spam, cooling-off
GO button label, in order by round count (not per loop; reset at loops): `BEGIN STARING` (round 1), `Rematch`, `Rematch (Again)`, `Rematch (Respectfully)`, `Rematch (Through Gritted Teeth)`, `Rematch (Theoretical)`, then random from `Rematch (Notarized)`, `Rematch (Per Policy)`, `Rematch (At Your Convenience)`.
163. Rematch requested 12 times in 4 seconds. The painting needs a moment. A comfortable chair has been brought. The painting cannot sit.
164. Mandatory cooling-off period: 7 1/2 seconds. Please enjoy this tea. It is not real tea. It is a tea.
165. Management apologizes on the painting's behalf, but only to you.
166. (tea pressed) The tea has been pressed. Tea does not work like that. The period has been extended by 7 1/2 seconds and you have been fined 0.5 Meh.
167. (2nd cooling-off) The painting has rolled its eyes in a full circle. This is not in the rules. It has been added to the rules.
168. (3rd cooling-off) The chair now has a cushion. The painting still cannot sit. The cushion is a gesture.
169. (ends) The cooling-off period has ended. The tea is still warm. It was never warm. It is noted that it was warm.

### 9.10 Painting clock units (rotate; "always ahead")
- 283 years, 9 months, and counting
- 14,771 fortnights, give or take a fortnight
- 103,400 Tuesdays (none of them enjoyed)
- a long time
- 283 years, plus lunch
- since before you were a concept
- 7 1/2 centuries (rounded down by the painting's own hand)
- 1,743 and the rest

### 9.11 Hook (mouse wiggle)
170. You are shaking the mouse. The painting is now off-center, then off the hook, and then, emotionally, in your lap.
171. Please pick the painting up. Touching exhibits is forbidden. Management insists.
172. (success) The painting is level. The wall is the one that moved.
173. (failure) The painting has re-hung itself. It did not want help. A paler rectangle of wall remains.
Pale-rectangle captions (grow, one per next round): `Formerly: a painting.` then `Formerly: a painting, now a rectangle.` then `Formerly: a rectangle, now thinking about it.`

### 9.12 Appeals (12-line shuffle bag; the 5th appeal ever triggers the ceremony)
174. Appeal received. Estimated review time: 6 to 8 weeks, or 283 years, whichever is longer.
175. Appeal denied. Reason: the painting has already seen you do this.
176. Appeal denied. Please file Form 27B/6 (Request for Form 27B/7).
177. Appeal pending. You may check its status by staring at it.
178. Appeal denied. The wall has considered your argument and has no comment. The wall is load-bearing.
179. Appeal denied. As previously denied, per the wall.
180. Appeal denied. The appeal was beautifully argued and has been framed, separately, and denied.
181. Appeal denied on the grounds that you were looking at the wrong painting. There is only one painting. That is the ground.
182. Appeal denied. Sandra has stamped it twice. One stamp is for emphasis.
183. Appeal withdrawn by the wall, then re-filed by the wall, then denied by the wall.
184. Appeal denied. The panel found your argument 'moving' and your hands 'moving', which is worse.
185. Appeal denied. The Appeals Desk would like to thank you for your continued interest in being wrong.
186. (fee line, always before each appeal) Appeals cost 0.5 Meh. Refunds cost 0.
187. (5th appeal, after a 3 s "The Appeals Desk is reviewing the case...") You have filed 5 appeals. The Appeals Desk has finally ruled. It has found against you with great ceremony. Here is a fanfare. It is for nothing.

### 9.13 Cameos (rare)
188. (Gerald, who:'Gerald', Beat 4+) I too have stared at a painting. It was a wall. I won. The wall never knew.
189. (Gerald, if metGerald is already set, appended) Good to see you again. I do not remember you, but my eyes do.
190. (Toaster, who:'The Toaster', once per mount after loss 7) toast.
191. (Management translation, right after) The toaster says it is not your fault. The toaster is lying, but kindly.

### 9.14 Scoreboard footnotes (grow with total losses)
- 1 loss: `*`
- 3: `* see *`
- 6: `** (a ligature)`
- 10: `*** (the asterisk belongs to the painting)`
- 15 and up: `See *, see **, see ***, see *. Compliant, per Sandra.`

### 9.15 Artist lines (one per round, advance each round; stay on the last until the not-ending, which sets "You, retroactively")
1. Artist: Hendrik.
2. Artist: Hendrik (?). The question mark is original to the frame and has been appraised separately.
3. Artist: Hendrik's cousin, also Hendrik.
4. Artist: A committee of Hendriks, 3 of whom are plants.
5. Artist: Attributed to Hendrik, for tax reasons.
6. Artist: You, retroactively.

### 9.16 Not-ending and loop lines
192. (lights up) The lights come up. A string quartet of emoji instruments plays three notes. They are the right three notes.
193. (statement) Management would like to read a statement. The contest is concluded. The painting is declared Champion, undefeated since 1743. You are Runner-Up, in a field of one.
194. (trophy) A tiny trophy, which is just the frame, is handed to the painting by Gerald. The painting accepts without moving. A long beat passes.
195. (certificate text on the card) RUNNER-UP CERTIFICATE. This certifies that {player} came second in a field of one. Printed on Form 27B/6 (Request for Form 27B/7).
196. (thanks) Management would like to thank everyone who made this possible. This includes the painting, who made it impossible.
197. (rematch) The painting is available for a rematch at your convenience, which has been pre-approved.
198. (placard rewrite) Artist: You, retroactively.
199. (reset) Next up: Round 1. Same painting. It now has a small hat. It has not moved. The hat is also winning.
200. (hat) The hat was added in the dark. Nobody will say by whom. The painting's expression has moved by exactly one degree.
201. (Congratulations, final) Congratulations. You have reached the end of the staring contest. The staring contest continues.
202. (loop round 1 label) Round 1 (Again). Same rules. The painting has a hat. You have a past.

Additional escalation texts that need no extra lines: HUD `Micro-saccades remaining: 3, per Sandra`; scoreboard `PAINTING WINS`; stamp text `PAINTING WINS`; card labels `Stare`, `Painting`, `Cause of loss`, `Participation Meh`, `Best stare (provisional)`.

---------------------------------------------------------------------

## 10. The Not-Ending (an ending that is not an ending)

Trigger: Gala completion or first verdict at module time >= 10:00. Sequence (all with managed timeouts, GO stays available; pressing GO fast-forwards the ceremony):
1. 0 s: lights come up (undo any lights-out), `api.sfx('bell')`.
2. 1 s: a quartet of emoji instruments (🎻🎻🎺🥁) appears at the bottom and plays **three notes** (`api.sfx('blip')`, `'bloop'`, `'ding'` 400 ms apart). Line 192.
3. 3 s: Management's sincere statement, line 193 (priority 2).
4. 7 s: Gerald hands the tiny trophy (which is the frame, a gilt rectangle shrinking and moving) to the painting; line 194; **a 3 s silent beat** (nothing happens; no timer-driven narrator line).
5. 11 s: Runner-Up Certificate appears on a form card (text 195); `api.confetti` thrown for the painting; achievement `staring-contest.runnerup`; line 196.
6. 15 s: placard rewrites artist to "You, retroactively" (198); the GO button reappears labeled `Rematch (At Your Convenience)` (line 197).
7. On GO: loop. `loops += 1`, beat clock reset, round counter label = "Round 1 (Again)" (202), the painting is **wearing a tiny pointed cap** (hat SVG path) and the eyebrow is permanently 1 degree different; line 199 then 200 (whisper), line 201 once. Cheats reshuffled, the fly returns from retirement in a tiny hat, the placard rule counter can reach Rule 7 1/2. Everything runs at x0.7 time. The contest continues forever. It is impossible to win because the contest has no judge who is not also the painting.

---------------------------------------------------------------------

## 11. Visual design

### 11.1 Palette (CSS custom properties on the module root; ALL classes prefixed `m-staring-contest-`)
- Wall: deep plum `#3b1f2e`, damask = two layered `radial-gradient` dots + a `repeating-conic-gradient` ornament at 6% opacity. Wainscot: oxblood `#5a2a35` with a cream chair-rail line `#f3e6c8`.
- Frame: gilt gradient (`#f6d36b` to `#b8801f` to `#fff1a8`) built from 3 nested `box-shadow` rings and an inner bevel. Hook: a small brass SVG nail above the frame.
- Painting palette: umber `#4a2c1a`, ochre `#c8933b`, olive `#5b6b3c`, lead-white `#efe6cf`; vignette via radial gradient.
- Accents (Lobby-consistent): mint `#8fd5b0` (ring, ticks), coral `#f26b5b` (PAINTING WINS stamp, loss), mustard `#e3b341` (stamps, Glare tier), lilac `#b9a6e8` (notary, Gerald's chair). Ink `#1c1417` (thick outlines, sticker shadows on buttons and chips).
- Floor strip: parquet from two `repeating-linear-gradient` at 45deg, browns `#8a5a33`/`#7a4c29`, a skewed shadow under the frame for fake perspective.
- Placard: cream `#f3ecd8`, ink `#2b2118`, brass border.

### 11.2 Layout
Desktop (>= 720 px): `display:grid`. Top HUD row: clock `YOU` (left), the Glare ring in the middle (hidden before Beat 3), clock `PAINTING` (right), scoreboard and best/rematch counters. Center column ~62%: the painting in its frame (`aspect-ratio: 1.37` with `width: min(100%, 520px)`), picture light above (an inline SVG brass arm with a warm radial-gradient cone over the canvas, flickers on heartbeat), eyes tracking. Placard (260 px) to the right. Pendulum clock hangs on the right wall (CSS swing, wrong time; pendulum static under reduced motion), Dennis (SVG ficus) bottom-left, mop bucket bottom-right (Beat 5+), cow rail at the left of the stage (Beat 4+), visitors strip along the bottom (Beat 9+).
Mobile (<= 719 px, down to 360): single column, HUD clocks stacked into one two-line ticker, painting on top, placard below it (compact), GO button **full width and thumb-height**, the verdict card slides over the lower half. Cow becomes a small strip above the painting; visitors drop to one row. Minimum root height 420 px; no horizontal scroll at 360 px.
The GO button is the only large button. Everything else is non-interactive on purpose.

### 11.3 The painting (inline SVG, viewBox `0 0 400 320`, no external assets)
Layers in order: umber background with radial vignette; broad-shouldered figure in a black coat; white millstone ruff (stack of 3 ellipses around (200,235)); bald forehead (oval) with 2 highlight ellipses; pale oval face centered about (200,140) rx 52 ry 66; heavy eyelids as arcs; **two eyes** as separate `<g>`s with a sclera `ellipse` (rx 14, ry 8) at about (178,128) and (222,128), olive-brown iris and dark pupil `circle`s; the **pupil group** `transform: translate(dx,dy)` via CSS transform, clamped to 4 units, pointing toward the last pointer position (instant steps under reduced motion); eyebrows as a path with `transform: rotate()` that tilts 1 degree per heartbeat; a flat mouth path; **two eyelid rects** (clip to the sclera, `opacity:0`) used only for the secret blink (one frame, 100 ms), the varnish blinks, and the wink; a craquelure overlay (thin crossing SVG path pattern at 12% opacity); a gloss streak (diagonal gradient `rect`, slow 14 s breathe). Hat (loop): a small pointed cap `path` above the forehead, hidden until `loops >= 1`. The `#eyes-glow` clone layer (6.5) shares coordinates.

### 11.4 Stage effects and animations
- Glass layer: diagonal gradient glare band over the painting; hosts the reflection silhouette. Drifting light/dust: 6 CSS-animated spans (no canvas). Picture-light flicker: one opacity animation.
- Verdict: a rotated bordered `PAINTING WINS` stamp slams in (rotate/scale keyframe) with `api.sfx('stamp')`, then `api.confetti(...)` thrown **at the painting** (compute painting center in root coordinates).
- Notary: an SVG stamp with a lilac ring ("witnesses nothing"). Pale rectangle: a lighter-plum rectangle with a caption (9.11).
- Visitors: 24 px emoji people (🧍🚶🧓🧒) in tinted lilac chips on a CSS looping walkway with a tiny speech bubble. Gerald: 🥔 in a small chair (SVG chair, a CSS triangle tie). Tea: `🍵`. Mop: `🪣` plus CSS mop head. Quartet: 🎻🎻🎺🥁. Forms: stacked rotated paper divs.
- Stamps/shake: `prefers-reduced-motion` turns off drifting light, fly smoothing, screen shake, pendulum swing and replaces with static equivalents or opacity fades; pupils still shift by instant steps.

### 11.5 Accessibility
`aria-live="polite"` on the placard status line and (via `api.say`) the Management bubble. Verdict text is plain DOM text. Visible focus ring on GO (thick ink + mint outline). GO is the first tab stop; Honor System is the second. Tab during STARE is a blink (the rules) but Honor System turns that off.

---------------------------------------------------------------------

## 12. Implementation hints

### 12.1 File skeleton (target ~1500-1750 lines)
1. Header, `P.injectCSS` (one large template string, all selectors `.m-staring-contest-*`, a `:root`-free design: define CSS variables on `.m-staring-contest-room`).
2. `P.addAchievements` (8), `P.addLines('m:staring-contest:<cat>', ...)` for each category in section 9 (tokens `{t}`, `{px}`, etc. are filled locally).
3. Content constants: `BEATS`, `CHEATS`, `GLARE`, `ARTISTS`, `RULES`, `BYLAWS`, `UNITS`, `FOOTNOTES`.
4. `P.registerModule({ id:'staring-contest', ..., mount(root, api){ ... return {destroy} } })`.
5. Inside `mount`: build DOM with `api.el`; `setState(s)`; `startRound()`, `endRound(cause)`, per-cheat `fx` objects, `beatAt()`, `applyBeat()`, input handlers registered with `api.on` (document-level for key events, window for blur/resize, `document` for visibilitychange, root for pointer events), `armGlobalListeners()`, heartbeat scheduler, shuffle-bag helper `bag(arr)`, `say(text,opts)` wrapper that rate-limits and runs `fill`.
6. `destroy`: set `dead=true`; clear any native handles you created (nothing should be native); remove added DOM children of `root`; `root.textContent=''`.

### 12.2 Core code skeleton (pseudocode, adapt)
```js
let state='READY', roundId=0, stareStart=0, dead=false;
function lose(cause, extra){
  if(dead || state!=='STARE') return;          // idempotent: first caller wins
  state='VERDICT'; roundId++;                  // invalidates every round timer
  clearRoundTimers(); fx.stopAll(); showVerdict(cause, extra);
}
function onBlink(kind, ev){ if(state!=='STARE' || honor) return; lose(kind, {ev}); }
api.on(document,'keydown', e=>onBlink('key')); api.on(document,'keyup', e=>onBlink('key'));
api.on(root,'pointerdown', e=>{ if(hookDragActive(e)) return; onBlink(e.pointerType==='touch'?'touch':'click'); });
```
Round timers all go through one helper: `at(sec, fn)` which calls `api.setTimeout(()=>{ if(rid===roundId && state==='STARE') fn(); }, sec*1000*K)`. The clock tick uses `api.setInterval` at 100 ms for the display only (cheap), computing from `api.now()`, never accumulating.

### 12.3 Misc
- Pointer coordinates for pupils/fly: `getBoundingClientRect` of root cached on resize; update pupil transforms with a single rAF-throttled handler (`api.requestAnimationFrame`).
- Selftest: `K=0.1`, Honor ON by default, GRACE 0.5 s. The fuzz harness will click, type and resize: spam detection (7.2) will frequently trigger Cooling-Off; ensure the tea button exists and works, and that COOLING always ends.
- `api.say` budget: max one Management line per 3 s outside verdict/cheat/beat-intro priorities; use `priority:0` asides, `1` beat intros and cheat setup, `2` verdicts/rulings. Moods: `proud` on Rematch, `disappointed` on losses, `smug` on appeal denial, `confused` on the clock win, `panic` on spam.
- Gerald, Sandra, Dennis, the Toaster: Gerald uses `who:'Gerald'`; the Toaster `who:'The Toaster'`; Sandra and Dennis are only cited or drawn.
- Cap everything: forms 17, visitors 12, history log (a small collapsible list of past verdicts, 8 rows max, newest first), reflection 1, fly 1, confetti bursts 1 per verdict, DOM text lines never appended without trimming.
- Do not use `Date.now`, `performance.now`, or window timers. No `eval`, no external URLs, no `alert`.
- After building: `node tools/lint.js games/staring-contest.js`, `node tools/selftest.js staring-contest --steps 400 --seed 1` (and seeds 2 and 3), `node tools/shot.js staring-contest reports/shots/staring-contest.png` and view the PNG; test `--width 360 --height 740` too.

---------------------------------------------------------------------

## 13. Risks: the 5 most likely implementation bugs

1. **The starting click loses the round (self-inflicted blink).** Enter fires `click` on keydown but its `keyup` lands in GRACE; Space fires `click` on keyup; the pointer moves slightly while pressing; the GO button gets removed/focused when state changes. Mitigation: ignore all input for 3 s GRACE, re-anchor pointer on the first move after GRACE, and keep a 0.6 s `aria-disabled` lockout on GO after each verdict instead of disabling it (disabling drops focus and the verdict keystroke can restart the round). Check that key-repeat and blur from focusing the button do not count.
2. **Double-fired events produce double losses (two verdicts, double awards, double stat counts).** One physical input fires `pointerdown`, `mousedown`, `touchstart`, `click`, and `keydown`+`keyup` pairs. Mitigation: `lose()` is idempotent and checks `state==='STARE'` first; increment stats and call `api.award` only inside the single winning path; flip `state` before doing anything else; never call `lose` from two timers in the same tick.
3. **Stale timers and rAF loops leak across rounds and remounts** (a round-1 cheat timer fires in round 4; fly loop keeps running; a hook-scene timeout fires after the module is destroyed; `api.selftest` reports surviving intervals). Mitigation: `roundId` token checked in every callback (`at()` helper), all timers through `api.*`, `clearRoundTimers()` in `endRound`, a `dead` flag checked in every callback, and `fx.stopAll()` on verdict. Remount 20 times to prove it.
4. **False-positive blinks from resize/blur/visibility/pointerleave.** Headless Edge and mobile fire `blur` or tiny `resize` events (URL bar), overlays appearing under the cursor produce `pointerleave`/`mouseleave` with a child `relatedTarget`, and the fuzz harness resizes constantly. Mitigation: compare against values captured at STARE start with the thresholds in 2.3, ignore events while `state!=='STARE'`, use `root.contains(relatedTarget)` for pointerleave, keep all overlays `pointer-events:none`, and make Honor System the escape hatch (default ON in selftest).
5. **Drag and scene soft-locks** (the only drag in the module): the Beat 8 and Hook scenes need `setPointerCapture`, `pointercancel`, `touch-action:none`; the painting can get stuck mid-drag if `pointerup` lands outside, a drop on the edge never registers, or the "any pointerdown is a blink" rule fights the drag-start. Also the hook scene or the ending ceremony can leave GO unusable. Mitigation: a single `startPaintingDrag` with capture + cancel + timeout fallback (auto re-hang at 20 s), the drag-start exemption only while the fall is active, GO always available and always cancels any scene, and a final `restoreScene()` that resets transforms and removes the pale rectangle logic when needed.

Also watch for: `NaN`/`undefined`/`{token}` leaking into text (route everything through `fill()` and default every variable), unbounded DOM growth (forms, visitors, history), narrator spam (rate limiting) and the lights-out overlay blocking focus or clicks (it must be `pointer-events:none`).
