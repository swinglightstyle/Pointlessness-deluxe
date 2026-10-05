# DESIGN BRIEF: Elevator Simulator (id: `elevator-simulator`)

Final brief. A builder who reads SPEC.md, VOICE.md and this file can build the whole module. Output file: `games/elevator-simulator.js` (single file, <= ~1800 lines, vanilla JS, CSS via `P.injectCSS(..., 'css-elevator-simulator')`, every class prefixed `m-elevator-simulator-`, every stat/achievement prefixed `elevator-simulator.`).

Sources merged: pitch 1 (the Stranger "Four", Zeno's lever, deviation forms, door crack) is the spine. From pitch 2 we took: the half-size 7 1/2 button, the lanyard titles, the petty music-tier captions, the coat on Floor 9, the quiet ride, the awkwardness Silence. From pitch 3 we took: the rounded-for-your-convenience half button, the "Floor 13: Not Included" ghost plate, Dennis' floor-by-floor career, the toast smell, Management's passenger ride (as an idle event). Cut as unbuildable or weak: Rhonda (replaced by Four), 3D trapezoid cab, the 6px seam dead zone, the "exactly 7.5 seconds" secret, the 30-node paper passenger, 60-ride ending trigger (ending is Zeno-chain driven only).

---

## 1. CONCEPT

You are in an elevator. You press a floor. The elevator goes somewhere else, with confidence, and files a form about it. A Stranger named Four stands in the corner making small talk. Four is also the elevator. Your goal, printed on a banner, is **Floor 7 and a half**. It is not on the panel (well, a button for it is, but it is half the size of the others and warm to the touch). Nudging toward 7.5 halves the remaining distance each time (Zeno), so the display gains a digit per nudge until the double finally rounds to 7.5, at which point Management certifies "arrived (technically)", the paperwork says Floor 7, the goal is rewritten as 7 and three quarters, and the cab quietly resets with a small plaque added. Nothing matters. Everything is celebrated.

First joke (fires at t=0 with no input): doors open, speaker says the welcome line, LCD reads `-`, a brass plaque on the wall reads the Sandra plaque line.

## 2. BUILD PRIORITIES (so the 1800-line budget survives)

- **MUST (build first, in this order):** cab + panel layout; ride loop with weighted random destination; deviation forms; arrival vignettes; music tiers (sfx loop + captions); small talk tray + awkwardness; DOOR CLOSE/OPEN/ALARM/HELP gag ladder; beat system; idle + spam; Zeno lever + ending + not-ending; achievements/stats/save; keyboard.
- **SHOULD:** stare-at-the-number hold; door crack; Shaft Cam SVG; resize lines; ghost 6; Floor 13 plate; cast cameos (Gerald, Dennis, sock, Sandra signs); typed "7.5" secret; quiet ride; LCD face at overflow.
- **STRETCH (only if budget remains):** Stranger Swap rare event; other elevators in the Shaft Cam; Management's passenger ride (idle 3 min can instead be a plain line if short on budget); backwards-press secret; second Zeno cycle after the ending (target 7.75).

## 3. LAYOUT AND CONTROLS

### 3.1 Regions (all inside `root`)

Desktop (>= 560px): two columns, cab 60% / panel 40% (CSS grid `3fr 2fr`). Under 560px the panel moves under the cab, floor buttons become a 4-column grid, the Shaft Cam collapses to a thin vertical strip on the left edge of the cab, the Stranger scales to 80%. Under 400px root width the cab gets class `m-elevator-simulator-tiny` and Management says the tiny-window line.

**Cab (left):**
1. Ceiling strip: amber LCD floor indicator (focusable, `role="button"`, `tabindex="0"`, aria-label "Floor indicator. Hold to avoid eye contact."), speaker grille (radial-gradient dots) that doubles as muted subtitles for the Stranger's lines, "Now playing:" caption + 4-bar CSS equalizer.
2. Goal banner (always visible): `Goal: Floor 7 and a half. Closest so far: 7 (technically 7.0)`. After the ending: `Goal: Floor 7 and three quarters.`
3. Hallway window with two brass door panels (translateX, 500ms; reduced motion = opacity fade). Behind the doors a vignette box: emoji tableau (1-3 emoji, 40px+) plus a tiny sign (floor name) plus one flavor line.
4. Wall-mounted rotating sign strip (Sandra's rules) appears from beat 5.
5. The Stranger at the right wall: CSS-only (rounded body, round head, necktie triangle, two dot eyes, mouth that scaleY-animates while text shows, a lanyard label that changes each ride). Speech bubble above him.
6. Awkwardness thermometer (-5 to +10), appears at beat 3. Label "Awks".
7. Announcement strip at bottom of cab (`aria-live="polite"`): the one-line narrative for the current ride (deviation, vignette, replies). Keep max 3 lines of text visible; replace content, never append unbounded.
8. "Say something" tray (3 buttons) slides in above the announcement strip when the Stranger talks.
9. Wall plaque area (door-close plaque, "7.5" framed sign after the typed secret, PASSENGER OF THE MOMENT plaque after the ending). Max a handful of DOM nodes.

**Panel (right):**
- Brass plate. Round buttons (48px visual, >= 44px hit area). Floor buttons in ascending DOM order: `B2, B1, L, 1, 2, ... 12`, plus the blank plate (the "13 slot") between 12 and the extras. Half-size `7½` button placed right after `7` in DOM, 30px visual with a 44px transparent hit area (padding/pseudo-element). No floor 13 (a blank plate that lights by itself from beat 4; see secrets).
- Secondary row (all cosmetic): DOOR OPEN, DOOR CLOSE (diamond glyphs made with CSS borders or plain text arrows), ALARM, HELP.
- Unlock-by-beat buttons: blank mystery round button (no label, aria-label "Unlabeled button", from beat 4, reveals only a counter), PHONE (beat 5, "Pretend to check your phone"), and from beat 8 extra floors: `B3`, `12B`, `Roof (Indoor)`, `7 minus a bit`, `The Other Lobby`, `Floor (Current)`.
- After the ending: one new button `Going up?`.
- Nudge Lever zone (hidden until armed): a vertical drag track with a brass handle (120px travel; drag up past 100px to nudge, snaps back) AND a plain `Nudge` button right next to it (always present when armed, this is the keyboard/touch-safe path), plus hold-to-repeat.
- Each button shows a tiny "pressed N times" counter badge (the love meter); the more it is pressed, the stronger its glow ring (cap at 20 for the glow).
- Shaft Cam: a small inline SVG (dashed vertical line, floor ticks, cab rounded rect, a pulsing 7.5 dot between 7 and 8 that drifts further from the cab as you get closer).

### 3.2 Controls

| input | action |
|---|---|
| click / tap floor button | press floor (start a ride if idle; during a ride only bumps the love meter and spam counter) |
| `1`-`9`, `0` | floors 1-9 and 10 |
| `Shift`+`1`, `Shift`+`2` (use `event.code` `Digit1/Digit2`) | floors 11, 12 |
| `[` and `]` | B1 and B2 (DO NOT use `B`: the Lobby's boss key is `B`) |
| `L` | Lobby |
| `H` | the half button (7 1/2) |
| `T` | talk to the Stranger (picks the first tray choice) |
| `N` | nudge (only when lever armed; fire at most once per 250ms, key repeat allowed) |
| `D` | Door Close (the in-joke) |
| `E` (hold) | eye contact hold; also Space while the LCD has focus |
| `Enter` | activates focused button; on the hidden "Peek" button it peeks |
| Typing `7` then `.` then `5` within 4 seconds | typed secret (the `7` still presses floor 7; the final `5` does NOT press floor 5 when it completes the sequence) |
| Tab | walks panel buttons in DOM order |

Key handling: attach through `api.on(document, 'keydown', ...)`, ignore events with ctrl/meta/alt, ignore when target is input/textarea/select/contenteditable, ignore when the module root is not in the DOM. Only `preventDefault` for Space when it is the hold gesture. Touch: every target >= 44px, press-and-hold on the LCD is eye contact, lever is a pointer-events drag with pointer capture plus the plain button.

## 4. CORE SYSTEMS (exact rules)

### 4.1 State

One `S` object: `phase` (see 4.12), `rideToken` (integer incremented at every ride start/abort; every delayed callback captures it and bails if stale), `rides` (this mount), `totalRides` (persisted), `floor` (current numeric position), `lastArrival`, `pressedCounts{}`, `awks`, `beat` (1-10), `tier`, `deviationN`, `smallTalks`, `talkBag`, `zeno{active,n,pos,from,gap}`, `ended` (persisted), `plaque` (persisted), `closest` (persisted), `idleSince`, `mashStreak`, `lastPressAt`, `pleaseRides`, `typedBuf`.

Floor numeric positions: B3=-3, B2=-2, B1=-1, L=0, 1..12 = n, 12B=12.5, Roof (Indoor)=13, `7 minus a bit`=6.9, The Other Lobby=0, Floor (Current)=current floor, Floor 13 (ghost plate)=13.

### 4.2 The Ride (ride time 3.5s shrinking to 2.2s; with `api.selftest` ride time 400ms and all other waits scaled down)

1. PRESS: floor button lights (coral ring), LCD shows `Going to <P>` for 600ms. Total pressed count for that button +1. Ride time = `max(2200, 3500 - minutesSinceMount * 217)` ms.
2. DRAW (silently, at press time) the destination R with `drawDestination(P)` (4.3).
3. TRAVEL: doors close (500ms), LCD counts through numbers on a deliberately wrong trajectory: toward P for ~55% of the path, reverses toward R, flashes `--` for one step in the middle. Shaft Cam dot moves, cab jitters 2px (translateY keyframe, disabled under reduced motion), music plays (4.5), `tick` sfx on each count.
4. ARRIVE: `ding`, doors open (500ms), vignette shows (4.9), the deviation line is filed if R != P (4.4), Meh award 0.2, stat `elevator-simulator.rides` +1, music tier updates every 3rd ride, a lanyard title swaps.
5. DECIDE (in this priority order, checked once per arrival): quiet ride (beat 8, once) > Silence if Awks hit 10 > door crack pre-arrival (handled before step 4) > Zeno lever arm (4.8) > small talk (4.6) > cameo/special arrivals. If none: doors auto-close after 1800ms (selftest 200ms) and the cab idles waiting for a press.
6. Doors never auto-close while a tray, stare ring, crack window, lever, or Zeno chain is active.

Mashing during a ride queues nothing. Buttons just get brighter and the love counter grows.

### 4.3 `drawDestination(P)`

Available floors = floors currently on the panel (never includes the half button or the unlocked specials before beat 8). Steps:

1. First ever ride of the mount: scripted. R = (P > 6 ? P - 5 : P + 5). (Pressing 9 lands on 4.)
2. Teasing: from beat 3 with probability `teaseP` (beat 3: 0.25, beats 4-6: 0.35, beat >= 7: 0.45) pick from {7: 40, 8: 40, 6: 20}. Never R == P.
3. Else roll: 40% uniform over available floors; 30% within 1 of P (never P itself; if none valid, uniform); 15% the floor of the previous arrival ("the elevator likes it there"); 15% the floor you are currently on ("again").
4. If R == P, redraw once, then shift to P+1 (or P-1 at the top). A numeric pressed floor is never the destination. The "again" roll may land where you already were (deliver the "again" line).
5. Half button: handled separately (4.7).
6. Ghost plate / `7 minus a bit` / specials: when pressed, arrive exactly at the pressed special floor's tableau (they are jokes about being there, not about missing).

### 4.4 Deviation forms

Every arrival where R != P (a pressed floor) files `Deviation <N> on Form 27B/6`, N = running count (stat `elevator-simulator.deviations`, persisted via `api.stat`). One reason per deviation; Reason number = N. Compose the line in the announcement strip as: `PREFIX Deviation <N> on Form 27B/6. Reason <N> (<TYPE>): <BODY> <CITE>` (CITE optional). Grammar lives in Section 13.3 (4 prefixes x 8 types x 24 bodies = 768 combos, plus 10 handwritten). Rules: tail `Reason <N> cites Reason <K>.` appears 30% of the time when N >= 4 (K random in 1..N-1); from beat 8 the tail becomes the self-referential version 25% of the time. The 12th deviation fires the Form 27B/7 gag (13.3). Everything uses `fmtFloor()` to turn numeric positions into names ("Basement 2", "the Lobby", "12B"...).

### 4.5 Music (no audio files)

A managed `api.setInterval` plays an 8-step phrase by cycling `api.sfx` names only while a ride is traveling (and when the idle-5-minutes event starts the music by itself). The pattern is `['tick','blip','tick','bloop','tick','blip','bell','tick']`; at tier >= 9 steps 3 and 7 alternate `bell`/`honk` (the saxophone's ghost). Step interval ms = `round(380 - (tier-1) * 20.9)` (tier 1 = 380, tier 12 = 150). Tier = `min(12, 1 + floor(sessionRides / 3))`. "Now playing:" uses the tier table in 13.7: within a tier, ride 1 and 3 show the tier's main track, ride 2 shows a generated B-side ("<adj> <genre> (<paren>)", lists in 13.7). Equalizer is 4 CSS bars with `animation-duration` computed from tier (e.g. `1.2s / tier`). Stop the interval at arrival and at destroy. During Silence and the quiet ride the interval is not started. Cap sfx rate: never schedule faster than the tier table. Under mute/audio unavailable `api.sfx` is silent and nothing else changes.

### 4.6 Small talk (core verb 2)

- Shuffle bag `[talk, quiet, quiet]` reshuffled each time it empties, plus a guarantee: if 4 rides pass without a talk, the next ride talks. Active from beat 3. Before beat 3: ride 2 only, the Stranger says "Going up?" with no tray (see 13.5); after that nothing until beat 3.
- On talk: Four turns his head (CSS rotate of the head element), says an opener (13.5) in the bubble and on the grille subtitles. The tray shows 3 choices drawn without repeats from the 12-choice pool (13.5.2). Each choice has a hidden Awks delta, a reply line, and sets `lastReplies[]` (cap 3).
- Awks meter changes with the delta and is clamped -5..+10. Callbacks: when a choice is picked that was also among the last 3 replies, add the callback line (13.5.3) instead of the normal reply 50% of the time.
- Replying completes the talk: `api.award(1)`, stat `elevator-simulator.smalltalks` +1, doors auto-close after 1800ms.
- Ignoring (6s with no choice): tray fades, Four says the ignored line, Awks +2, no award.
- "Say nothing" is always one of the three choices (it is the best joke) once Four's confession pool is unlocked (always).
- Clicking Four himself = eye contact once per ride: Awks +2, line "Please don't." (13.5.5).

### 4.7 Awks 10: the Silence, and the half button

**Silence (at Awks 10):** doors open between floors "to let the tension out". All captions stop, music stops, announcement strip shows only `(the elevator holds its breath)`, screen dims 20% via a class. Holds 6s (selftest 800ms). If the player presses nothing for the whole 6s: achievement `silencer`. Pressing anything cancels the achievement flag but the Silence still completes (do not abort the phase). Afterwards Four says the post-silence line, Awks resets to 3.

**Half button (`7½`):** pressing it plays the doors-close sound and `api.sfx('tick')`, the LCD shows `7.5` for exactly one frame (use a 90ms timeout), then the ride proceeds to 7 or 8, strictly alternating (track `S.halfFlip`), with the line "Rounded for your convenience." Attempts counter `elevator-simulator.halfpresses`. Each failed attempt grows the button halo by 1px (cap 12px) and warms its color. Landing on 7/8 via the half button: award 3 Meh once per 10 half-presses max (rate limit) plus `Certificate of Near Miss` line, first time unlocks `near-miss`. At attempt 12 exactly: the "idea of 7 and a half" line (13.6). At ride 40 (sessionRides): the half button gets a tiny sticker (CSS only).

### 4.8 Zeno's lever (the goal)

- **Arming:** when a ride lands on 7 or 8, `S.beat >= 7`, and the ending has not happened yet: slide the lever in (CSS transform), Management says the lever line. Doors stay open. The lever stays armed until the next floor press (which starts a normal ride and disarms it) or until used.
- **Starting the chain:** the first nudge sets `zeno = { active:true, from: landedFloor (7 or 8), n:0 }`. If a chain already exists (abandoned earlier) it continues from its saved state; the first landing on 7/8 re-arms the lever.
- **Math (exact):** target `T = 7.5`. Track the exact gap as a power of two: after `n` nudges, `gap = Math.pow(2, -(n + 1))` (so n=0 -> 0.5). `pos = from === 7 ? T - gap : T + gap` as a Number. Do NOT compute by repeatedly halving `pos` (floating-point tie rounding is unpredictable at the end). Doubles near 7.5 have 2^-50 resolution, so `pos` is representable and distinct from 7.5 while `n + 1 <= 50`; when `n >= 50` (the 50th nudge) set `pos = T` exactly. Chain completes when `pos === 7.5`.
- LCD text = `String(pos)` (JS shortest round-trip, for example 7.4375, then eventually `7.499999999999999`). Digit count `d` = characters after the decimal point; `api.stat.max('elevator-simulator.maxdigits', d)`. LCD font-size classes by total string length: <=6 `s0`, <=8 `s1`, <=10 `s2`, <=12 `s3`, <=14 `s4`, else `s5` (progressively smaller font, gradient text on s4/s5). From `d >= 12` the LCD grows a drawn face (class on the LCD wrapper: `::before` two eyes, `::after` a mouth that gets more strained at d >= 15).
- Gap announcements: `<GAP>` token = `gap.toFixed(n + 1)` when gap >= 0.0001; otherwise Management says `<n+1> decimal places` instead (see 13.9 "tiny gap" lines).
- Each nudge: awards 0.05 Meh (every 10th nudge 0.5 Meh), `elevator-simulator.nudges` +1, a line from 13.9 (shuffle bag, never repeat; milestone lines override at n = 1, 5, 10, 13, 20, 30, 40, 49), `tick` sfx, Shaft Cam dot nudges closer to the 7.5 marker but the marker "drifts away" visually.
- Achievement `zeno` when `abs(7.5 - pos) <= 0.0001` and `pos !== 7.5` (the "four nines" - this happens at n = 13 exactly when starting from 7).
- Hold-to-repeat: on the Nudge button, pointerdown nudges once, then after 500ms repeats every 350ms (speeds to 200ms after 10 repeats), stops on pointerup/pointerleave/pointercancel/blur/destroy. Total chain length is 50 nudges, about 20 seconds when held.
- While `zeno.active`: floor buttons are dimmed (40% opacity, still focusable). Pressing a floor abandons the chain: Management says "Abandoning <POS>. The decimal has been placed in a drawer." (13.9), chain state is kept, ride starts normally, lever disarms. The goal banner's "Closest so far" uses the best (closest) position ever, persisted.
- Overflow dispute (13.9) fires once each at d = 12, 15, and the very last nudge before 7.5.
- **Certification at pos === 7.5:** run the ending (Section 9).

### 4.9 Floor vignettes

Each floor has: emoji tableau, sign text, and 2 flavor lines (13.4). The hallway window shows tableau + sign; the announcement strip shows one line. Basements get a fog gradient behind the tableau. Floor 7: a lone sock, facing away. Arrival at any floor sets the lanyard to a new title (13.5.6). Cameos replace the normal line on their trigger.

### 4.10 Door crack (rare mini-game)

From beat 3, about 1 ride in 25 (never twice within 10 rides; never during Zeno; never during a talk), the ride "stops between 7 and 8" (the LCD shows `7-8`): for 400ms (selftest 600ms) a 14px-wide sliver of bright hallway light appears between the door panels. Clicking/tapping the sliver (or Enter on the hidden `Peek` button, which receives focus via `api.setTimeout(0)` at the window start and is blurred at the end) wins: a hallway with a tiny door that is another elevator, the Missing Sock facing away, `api.award(3)`, achievement `crack` (secret), `elevator-simulator.cracks` +1. On any first miss the target widens to 40px for the rest of the mount. Missing it: the wistful line (13.6) and the ride continues to land on 7 or 8 (alternating).

### 4.11 Eye contact (core verb 3, "Stare at the number")

From beat 4, instead of a tray, every other talk (alternating bag `[tray, stare, tray]`) uses a stare prompt: Four says a question from the stare pool (13.5.4), and a ring appears around the LCD. Hold the LCD (pointerdown, or hold `E`, or hold Space while the LCD is focused) for 2 seconds (selftest 300ms). Release early: Four says the fail line, Awks +1. Hold through 2s: success line, Awks -1, `award(0.3)`. Continue to 6s: the "Management is moved" line, `award(0.5)` once, achievement `stare`. Ring timeout 8s with no input: "You looked." line (13.5.4), Awks +1. If DOOR CLOSE is pressed during a hold: Four says "Thanks." (secret reaction, no award, `elevator-simulator.doorclose` still counts). Releases must also be caught on `pointerup`, `pointercancel`, `blur`, `visibilitychange` (hidden), keyup and destroy so a hold can never stick.

### 4.12 Phase machine

`DOORS_OPEN_IDLE` -> (press) `PRESSED` (600ms lag) -> `RIDING` -> `ARRIVED` -> (one of) `TALK` | `STARE` | `LEVER_ARMED` | `QUIET` | `SILENCE` | `CRACK` | `IDLE_HOLD` -> back to `DOORS_OPEN_IDLE`. `ZENO` is a sub-state of `DOORS_OPEN_IDLE`/`LEVER_ARMED`. `ENDING` blocks all input except the single ending reply. A pressed floor during PRESSED/RIDING is ignored for movement (counter only). A pressed floor during TALK counts as ignoring the tray (the Stranger says the ignored line, Awks +2) and starts the ride. A pressed floor during STARE fails the stare (Awks +1). Every transition increments `rideToken` (or phase token) so queued timeouts from the old phase are no-ops.

## 5. THE ESCALATION TIMELINE (beats)

Beats advance only at an arrival, when BOTH the time (seconds since mount, divided by 20 when `api.selftest`) and the session ride count are reached. When a beat starts, Management says its beat line (13.8) and new content unlocks.

| beat | time | rides | name | what changes |
|---|---|---|---|---|
| 1 | 0:00 | 0 | NORMAL | Welcome line, plaque, tier 1 music. 15 panel buttons plus the small 7½. First press scripted (9 -> 4) with Reason 1. |
| 2 | 0:20 | 1 | PATTERN | Rides 2-4 establish press/arrive/reason/track. Reasons start citing each other. DOOR CLOSE's first response ("filed under Doors"). Four says "Going up?" once on ride 2 while you go down. |
| 3 | 0:50 | 3 | THE STRANGER | Four introduces himself, first tray, Awks meter appears. 7/8 teasing begins. Door crack becomes possible. |
| 4 | 1:30 | 6 | EYE CONTACT | Stare verb debuts. First door-close audit (12 presses is the audit, whenever it happens; the thresholds are count-based). Blank mystery button appears, plate 13 starts lighting. Music tier is whatever the ride count says (tier 3 by now). |
| 5 | 2:30 | 9 | CAST ARRIVES | Gerald boards at Floor 4 (on next arrival at 4, or force an arrival at 4 on the next ride if the player has not hit it). Sandra's rotating signs. PHONE button. Four hums a harmony half a step off from tier 5 up. |
| 6 | 3:30 | 12 | THE REVEAL | Four: "I'm also the elevator." Walls blink, his mouth syncs with the speaker, he fades 20% into the paneling. DOOR CLOSE is revealed wired to Dennis (Plant), who declines. From now on 30% of announcements end with an apology tail (13.5.7). |
| 7 | 4:30 | 15 | ZENO | The lever arms on any 7/8 landing. Banner becomes live (`Closest so far`). Management starts counting digits aloud. Music tier 7 includes the saxophone arriving from a different floor. |
| 8 | 6:00 | 19 | THE BUILDING GROWS | Extra panel floors unlock (B3, 12B, Roof (Indoor), 7 minus a bit, The Other Lobby, Floor (Current)). Shaft Cam shows other elevators, each with a stranger also being the elevator, waving (STRETCH). Spam rules announced in advance. Self-referential reasons. One-time QUIET RIDE on a later arrival. |
| 9 | digit overflow | nudges | DIGIT OVERFLOW | Not time-based: starts when `maxdigits >= 12` in the current chain. LCD face, overflow dispute, tier 10 "Gently". If never reached, the module stays in beat 8 content forever (that is fine). |
| 10 | arrival | chain done | ARRIVAL (TECHNICALLY) | The double hits 7.5. The ending (Section 9). |

The quiet ride (beat 8, once per save, on the first ride arrival after beat 8 starts that is not a lever/talk): no music, no lit buttons, the cab lighting warmer (CSS var), Four's lanyard reads `Passenger`, the exact lines in 13.10, one reply button `Of course.`, then the ride "goes up past 12 without a floor" (LCD counts 12, then `-`, then back to normal), Awks resets to 0.

## 6. IDLE, SPAM, RESIZE (required behaviors)

### 6.1 Long idle (first-class feature)

Track `S.idleSince` updated on any `pointerdown`, `keydown`, `click` inside the module. A single managed 1-second interval checks elapsed (`api.selftest` divides all thresholds by 30). Thresholds fire once per idle stretch:
- 45s: lights dim (CSS filter brightness 0.55 on the cab root), music (if running) slows by x2, LCD reads `THINKING`.
- 90s: Four asks "Do you want to talk about it?" (13.11).
- 3 min: `Incident of Silence #1` filed with a tiny clipboard element; achievement `silence-between` (secret), `award(1)`.
- 5 min: the cab starts the music by itself (a single quiet phrase, tier 1) and Four hums (13.11).
- (STRETCH) 7 min: Management takes a ride: doors open at 7, a line, Management rides to 8. No achievement; the plain line is enough.
- On the first input after >= 90s idle: remove dim, say "While you were away..." line (13.11), `elevator-simulator.idleevents` +1 per fired threshold. Never repeat the thresholds until real input.
Idle must not fire during TALK, STARE, CRACK, SILENCE, QUIET, ENDING (these have their own timeouts).

### 6.2 Spam ladder

Track `mashStreak`: each press of any panel button (floor, secondary, lever) increments it if within 600ms of the previous press, otherwise resets to 1. Escalation, each step fires at most once per streak:
- Streak 10: **Button Fatigue**. Buttons sag (CSS `skewY(3deg)`, dimmer glow rings) for 6s, the "Button Fatigue" line, **Mash Surcharge**: `api.award(-1)` ONCE (guard with a `surcharged` flag cleared when the streak resets) and "Mash Surcharge" line, stat `elevator-simulator.surcharges`.
- Streak 25: **Wet paint**. The panel gets a harmless CSS overlay ("WET PAINT") for 8s (selftest 1s). Floor presses are ignored with the line shown once (set `aria-disabled="true"` and a class; do NOT use the `disabled` attribute so focus is never lost; clear it in a timeout guarded by phase token and in destroy).
- Streak 40: **Elevator Security**. A tiny CSS cap appears on the cab, the "detained himself" line, Four says "I can feel every one of those.", achievement `spam` (secret). All input is ignored for 3s, then normal.
- After any of these: the **please rule** for 3 rides: a floor press waits 400ms (the button shows a fill) and Management says "Please." (it is a delay, not a hold requirement, so keyboard and touch work the same).
Do not stack: while Button Fatigue or Wet paint is active, do not fire them again.

### 6.3 Resize

On root width change (ResizeObserver on root, fallback `api.on(window,'resize')`; debounce 200ms): below 400px add `tiny` class and say the tiny-window line once per crossing (13.12). Crossing back up: the "I can finally gesture." line. Five crossings within 10s: the closet line. Below 400px keep 44px targets, reflow buttons to 3 columns and show the placard `Occupancy: 1.5 persons. Cozy.`

## 7. SECRETS AND RARE EVENTS

1. **Door crack** (4.10), achievement `crack`, secret.
2. **Typed 7.5** (`7`, `.`, `5` within 4s, not in an input): the typed lines (13.12), a framed `7.5` sign appears on the cab wall permanently (persisted), Four says nothing and looks at the sign, `award(1)`, achievement `typed`, secret.
3. **Ghost 6** (1 in 30 rides, from beat 3): button `6` lights by itself before the ride starts, ghost lines (13.12). Pressing it is a normal press of 6. Does not happen during Zeno.
4. **The 13 plate** (from beat 4): lights up on its own for ~3s about once every 12 rides. Pressing it while lit (or at any time after beat 4) arrives at `Floor 13: Not Included` (13.4). `elevator-simulator.floor13` +1.
5. **Long idle** (6.1), achievement `silence-between`, secret.
6. **Spam** (6.2), achievement `spam`, secret.
7. **Dennis and Gerald cameos** (Section 8).
8. **The Toaster smell:** if `api.flag.get('toaster.met')` or `api.flag.get('toaster.visited')` is truthy, 1 in 20 arrivals appends the toast line (13.13). Read both flag names defensively; never set them.
9. **Backwards presses** (STRETCH): pressing floors in strictly descending order 12 down to B2 with a ride-free gap: the lights go out for 2s and the whisper line (13.12).
10. **Stranger Swap** (STRETCH, 1 in 60 rides): one ride where the tray is labeled `Four says:` and the opener is "Going up?" from you; the replies are Four's lines. Three lines in 13.12.

## 8. CAST, CAMEOS, FLAGS

- **Four** the Stranger (never "Stranger" in dialogue after he introduces himself). Always hums a half-step off.
- **Gerald (VP of Spuds):** beat 5, boards at Floor 4 and rides one ride (lines 13.13). Sets `api.flag.set('metGerald', true)` on first appearance. After that he appears at 1 in 40 arrivals at floor 7 saying the Seven line, and only if `metGerald` is already true or the rare roll succeeds (rare roll also sets the flag).
- **Sandra:** never seen, only cited (rotating signs, 13.13).
- **Dennis (Plant):** floor L vignette every time. Count `lobbyVisits`: first visit he is simply there; 10th: promoted to Floor 1 Ambassador; 20th: "moved to floor 9", lobby shows a note, and the floor 9 plant grows by one emoji size step per 5 floor 9 visits (cap). He is wired to Door Close at beat 6.
- **The Missing Sock:** Floor 7 vignette always; door crack; ending (the only passenger who ever reached 7 1/2: a sock is in the paperwork floor).
- **Tuesday:** never appears. Two looming lines (13.13).
- Flags set: `metGerald`, `elevator-simulator.arrived` (true after ending), `elevator-simulator.metFour` (after first intro). Read-only: `toaster.met`, `toaster.visited`.

## 9. THE NOT-ENDING (beat 10)

Triggered when `pos === 7.5` after a nudge. Phase `ENDING`, all input except the reply button ignored, `rideToken++`.
1. t=0: `api.sfx('fanfare')`, `api.confetti()` (confetti is used exactly here and nowhere else in the module), LCD flashes `7.5`, Management speech (13.14.a), form line "Deviation 7.5, Reason: Technically." signed with a `ding`.
2. +1.2s: the doors open onto Floor 7 (the paperwork floor): tableau of a filing drawer with the sock. LCD reads `7.5`, then 1 second later `7`. Management says the paperwork line.
3. +2.5s: Four says "Oh good, you're here. Going up?" then, as a touching beat: "I never get to see where you go. Tell me about Floor 7 and a half." Single reply button: `It was fine.`
4. On reply (or after a 20s timeout the reply fires itself): `award(7.5)` with reason, stats `elevator-simulator.arrivals` +1, flag `arrived`, achievement `arrived`, Management reads the Door Close callback with the real count (`api.stat.get('elevator-simulator.doorclose')`), the plaque appears (13.14), the goal banner rewrites to Floor 7 and three quarters, persist `ended`, `plaque`.
5. Reset: cab returns to its clean start state (lights normal, awks 0, zeno cleared, floors restored to the initial 15, the beat-8 extra floors vanish, and `Going up?` is added), music tier resets to 1 and the first track name is shown in full silence (no sfx, caption only), all counters preserved. Four: "I'm Four again. I got better." The lever is retired for good (shown on the plaque as a tiny brass icon, no more arming). `Going up?` does the same as every other button (it picks a random floor).
6. After that the game just continues: beats loop back as flavor (no new lever), the Zeno content (STRETCH: second cycle to 7.75) can be skipped.

Never show a win screen. The congratulations are sincere and meaningless.

## 10. ECONOMY, STATS, SAVE

- Awards (Meh): ride 0.2; small talk 1; stare 0.3 (+0.5 for 6s); nudge 0.05 (0.5 every 10th); door crack 3; typed 7.5 1; silence-between 1; Silencer 1; near miss 3 (rate-limited); ending 7.5; Mash Surcharge -1 (once per streak). A local limiter: stop issuing small awards beyond 8 Meh in any rolling minute (the big ones are exempt).
- Stats (via `api.stat`): `elevator-simulator.rides`, `.smalltalks`, `.doorclose`, `.dooropen`, `.alarms`, `.nudges`, `.maxdigits` (use `.max`), `.deviations`, `.awks.peak` (use `.max`), `.idleevents`, `.halfpresses`, `.cracks`, `.surcharges`, `.floor13`, `.stares`, `.arrivals`.
- `api.save` keys: `totalRides`, `closest` (position number and gap), `history` (last 12 floors), `ended`, `plaque`, `typedSign`, `quietDone`, `lobbyVisits`, `floor9Visits`, `zeno` (chain state), `metFour`. Everything else resets per mount.
- Cap the DOM: the shaft log shows the last 5 entries; the announcement strip holds one block; plaques at most 3 nodes; never append unbounded.

## 11. ACHIEVEMENTS (ids prefixed `elevator-simulator.`; declare all in the file; >= 2 secret)

| id | name | desc | secret | reward |
|---|---|---|---|---|
| elevator-simulator.first-ride | Grand Marshal of the Maiden Ascent to Roughly Somewhere | Complete your first ride. You pressed one floor and arrived at another, which is the whole job. | no | 1 |
| elevator-simulator.small-talk | Supreme Laureate of Small Talk (Provisional) | Complete 5 small talks with Four, including at least one "Yep." | no | 3 |
| elevator-simulator.zeno | Zeno's Most Humble Servant, Duke of the Decimal | Nudge the cab to 7.4999 without ever arriving. | no | 5 |
| elevator-simulator.door-close | Archduke of the Placebo Door Close | Press Door Close 50 times. Nothing closes. A plaque is installed. | no | 3 |
| elevator-simulator.near-miss | Grand Order of the Near Miss (Seven, Class of Eight) | Press 7 1/2 and arrive at floor 7 or 8. Management calls this a personal best. | no | 2 |
| elevator-simulator.silencer | Supreme Silencer of the Held Breath | Trigger the Awkwardness 10 Silence and press nothing for 6 seconds. | no | 2 |
| elevator-simulator.stare | Warden of the Number | Studied the number for 6 seconds. Management is moved. | no | 2 |
| elevator-simulator.arrived | Grand Order of the Exact Arrival (Paperwork Pending) | The double hit 7.5. The paperwork says 7. The paperwork has been asked to reconsider. | no | 10 |
| elevator-simulator.silence-between | Dowager Empress of the Silence Between the Floors | Do nothing for 3 minutes. Nothing was done magnificently. | YES | 5 |
| elevator-simulator.crack | Keeper of the Hallway That Is Secretly Another Elevator | Click the door crack between 7 and 8 in time and meet the sock. | YES | 5 |
| elevator-simulator.typed | Registrar of the Decimal on the Wall | Type 7.5. The elevator does not do decimals. It wrote it down anyway. | YES | 3 |
| elevator-simulator.spam | Chairman of Every Floor, Detained by Himself | Press so many buttons that Elevator Security detains the elevator. | YES | 3 |

Unlock logic: first-ride on first arrival; small-talk when `smalltalks >= 5` and the "Yep." reply has been chosen once; zeno as in 4.8; door-close at 50 presses; near-miss when a half-button ride lands on 7/8; others as described.

## 12. VISUAL DESIGN

Palette (matches the Lobby but vintage cab): cream `#FFF3D6` background; thick `#2B2118` outlines (3px) on everything with 4px 4px 0 sticker shadows on cards; brass gradient `#C79A3B` -> `#F3D58A` -> `#A9782A` for doors and panel plate with a brushed `repeating-linear-gradient` overlay; mustard `#E8B531`; coral `#F26B5B` for lit buttons; mint `#7FD1B0` for ok/ding/goal accents; lilac `#B9A2E0` for the carpet pattern, speech bubble and equalizer; walnut `#4A2F1A` paneling via repeating vertical gradients; amber LCD `#FFB000` on `#1A0F00` with scanline overlay (`repeating-linear-gradient`) and `text-shadow` glow.

Cab drawing (flat CSS, optional `transform: perspective(900px) rotateX(2deg)` on the back wall only): back wall of walnut paneling, side shading via gradients, mustard carpet with a diamond pattern (two `conic-gradient` or `linear-gradient` layers) along the bottom, ceiling strip containing LCD, grille and equalizer. Doors are two brass panels over the hallway window; open = translateX(-100%/+100%), 500ms; reduced motion = opacity fade 150ms.

Buttons: round, 48px, radial-gradient face, 3px outline, braille dots (tiny CSS dots around the rim as a decoration, `aria-hidden`), coral glow ring `box-shadow` keyframe pulse when lit, active scale 0.92, counter badge in the corner. Door Open/Close are diamond-glyph buttons at the bottom; the blank mystery button is the only one with no label.

Stranger: CSS only. Body rounded rectangle lilac coat, round head, a tie triangle (`border` trick), two dot eyes (translateX toward the LCD during stare holds, snap away when stared at), a mouth (`scaleY` animation while talking), a lanyard label (small rotated rectangle). After the reveal: a thin brass edge that matches the wall, opacity .8. At Awks 10 the hum stops.

LCD: amber monospace, letter-spacing, glow; font-size steps `s0..s5` (see 4.8); from `d >= 12` face pseudo elements; `THINKING` idle text; only decimals are ever shown (no fraction formatting).

Shaft Cam: inline SVG 80x220: dashed shaft line, 15 floor ticks, cab rounded rect (transform), pulsing 7.5 dot between 7 and 8 with a CSS animation. Its drift away from the cab is cosmetic: `cx` offset grows slightly with each nudge. On mobile it becomes a 24px strip.

Motion: a ride adds a 2px vertical jitter (translateY keyframe, 0.18s infinite while riding), LCD flicker (opacity 0.85-1 per digit change). All big animations check `prefers-reduced-motion` (media query) to switch to fades/static. Idle dim = `filter: brightness(.55)` transition on the cab root. Lever: brass vertical track with a handle that translates with pointer events, it glows near the end of its travel. Confetti only at the ending.

## 13. CONTENT (verbatim; tokens in angle brackets are filled by the module; the engine's `{player}` etc. may also be used. Keep lines as written.)

### 13.1 Opening and goal (beat 1)

1. Welcome aboard. This elevator serves floors 1 through 12, and on request, feelings.
2. This elevator has been inspected by Sandra. Sandra did not ride it. Sandra took the stairs and has opinions. (plaque)
3. Your destination is Floor 7 and a half. Please select it from the panel. It is not on the panel. Please proceed.
4. Floor 7 and a half is where the 7 and the 8 shake hands. Please do not interrupt.
5. Please stand clear of the doors, the walls, and any narrative expectations.
6. The elevator is thinking about your request. The request has been put on a post-it. The post-it is on Floor 6.
7. First-ride deviation (scripted): You pressed 9. You have been delivered to 4. Management calls this a scenic route to the correct number.
8. Goal banner idle variants (rotate every ~60s as the second line of the banner): "Goal: Floor 7 and a half. Please select it." / "Goal: Floor 7 and a half. It has been selected for you." / "Goal: Floor 7 and a half. Guidance only."

### 13.2 Arrival lines (generic)

9. Doors opening. Doors reconsidering. Doors opening.
10. You have been delivered to <A>. You did not ask for <A>. <A> asked for you.
11. You have been delivered to where you already were. This is called efficiency.
12. Please mind the gap between expectation and the floor.
13. Doors opening. Please mind the gap, the step, and the metaphor.
14. This elevator travels at a speed best described as mid-morning.
15. Please hold the doors. The doors are holding you. This is a mutual arrangement.
16. You have been in this elevator for <C> rides. Elevators are designed for 40 seconds. We believe in you.
17. Reminder: the stairs are available. The stairs are on a different floor. The different floor is the stairs.
18. The elevator would like you to know it respects your ambition.

### 13.3 Deviation grammar (4.4)

PREFIX (pick one, never the same one twice in a row):
- You pressed <P>. You have been delivered to <A>.
- Going to <P>. Arriving at <A>.
- Requested: <P>. Provided: <A>.
- You pressed <P>. The elevator heard <A>.

TYPE (pick by shuffle bag): Ambient / Pre-emptive / Scheduled Surprise / Per the Stranger / Per Sandra / Technically / Administrative / Seasonal.

BODY (24, shuffle bag):
- The elevator wanted to see how you would react.
- You reacted. See the previous reason.
- A floor was lonely and has been compensated.
- The cable felt strongly.
- It was nearer, in a sense that has been withheld.
- The building is taller on Mondays, and it is a Monday somewhere.
- The doors voted. The doors abstained. The elevator broke the tie.
- A man on <A> had a feeling about you.
- The number you pressed was already taken. It has been sent to Lost Numbers.
- <A> asked for you by name. The name was Passenger.
- The elevator took the scenic route. The scenery is a corridor.
- The counterweight had a moment.
- Maintenance has not visited <A> in some time, and it wished to be seen.
- <A> was the closest floor to the idea of <P>.
- Management requested a different outcome and was not clear which.
- The elevator's horoscope said to go to <A>. Horoscopes are binding.
- It has always been <A>. You simply arrived at the wrong time.
- A rule exists. Sandra will provide it later.
- The floor indicator and the floor did not see eye to eye.
- Gravity declined to comment.
- The elevator remembered it had left something on <A>. It has not remembered what.
- Per the previous passenger, who is still on Floor 9.
- This is the shape of the building today.
- No reason. The reason has been filed under Reasons.

CITE tails: `Reason <N> cites Reason <K>.` (30%, N >= 4). Beat >= 8 self-reference (25%): `Reason <N> cites Reason <K>, which cites this sentence.` / `Reason <N> cites Reason <K>, which cites the sentence you are reading.`

Handwritten (use occasionally in place of the grammar, 1 in 8 deviations):
19. Going to 9. Arriving at 4. Reason: Ambient.
20. Deviation noted on Form 27B/6. Reason <N> cites Reason 3, which cites this sentence.
21. You pressed 6. You have been delivered to 2. The elevator regrets nothing and has put that in writing.
22. Reason 22: The elevator wanted to see how you would react. Reason 23: You reacted. Reason 24: See Reason 22.
23. Deviation <N> filed. The deviation has been deviated.
24. Reason <N>: The elevator has a policy of arriving. The policy does not specify where.
25. (12th deviation) Deviation 13 has been filed on Form 27B/7. Form 27B/7 was destroyed in 1998. It has been filed on the memory of it.
26. (25th deviation) Deviation 25. The deviations have been moved to a larger room. The room is Floor 5.
27. (50th deviation) Fifty deviations. Management has framed one. It is Reason 17. It is very good.

### 13.4 Floor vignettes (emoji tableau | sign | two lines each; pick one of the two per arrival, never the same twice in a row)

- **B3** (beat 8+): fog | BASEMENT 3 | "Basement 3. This floor was built from the leftover feelings of the other basements." / "Basement 3. A sign says THIS IS NOT THE END. A second sign says IT IS A LONG WAY DOWN TO FIND OUT."
- **B2:** fog | BASEMENT 2 | "Basement 2. Nobody is down here but the sense of having made a choice." / "Basement 2. A dehumidifier hums a song about being needed."
- **B1:** boxes | BASEMENT 1: STORAGE (OF STORAGE) | "Basement 1. Boxes labeled Other Boxes. The boxes are accurate." / "Basement 1. A mop in a bucket. The bucket is the manager."
- **L:** plant | LOBBY | "You have been delivered to the Lobby. You did not ask for the Lobby. The Lobby asked for you." / "The Lobby. Dennis (Plant) looks at you and says nothing. This is his entire job."
- **1:** bell | FLOOR 1: RECEPTION (UNMANNED, WELL-LOVED) | "Floor 1. A reception desk with a bell. The bell is on hold." / "Floor 1. A visitor's book with one signature: Visitor."
- **2:** clipboard | FLOOR 2: MEETINGS | "Floor 2. Doors opening on a meeting that has been going since Thursday. The doors close on a smaller one." / "Floor 2. A man holding a clipboard that holds a smaller clipboard. He nods. You nod. Per policy."
- **3:** copier | FLOOR 3: PHOTOCOPIES | "Floor 3. A lone photocopier, silently copying a single smudge since March." / "Floor 3. A water cooler that has been out of water since a meeting that could have been a floor."
- **4:** potato | FLOOR 4: SPUDS (ANNEX) | "Floor 4. Everyone here is very quiet and very round." / "Floor 4. The saxophone has left the building, but its sound remains."
- **5:** filing cabinet | FLOOR 5: FILING | "This elevator has stopped at Floor 5 to let nothing out. Nothing thanks you for your patience." / "Floor 5. A filing cabinet containing the filing cabinet's own file."
- **6:** balloon | FLOOR 6: MANDATORY FUN | "Floor 6. A single balloon labeled MANDATORY FUN (BYO PARTY). The balloon is losing the argument." / "Floor 6. Please mind the gap between expectation and the floor."
- **7:** sock | FLOOR 7: THE PAPERWORK FLOOR | "Arrived: Floor 7. Technically 7. Specifically 7.0, which is the loneliest way to be 7." / "On the hallway floor, a single sock, facing away. It appears to be en route to somewhere with purpose. You are not invited."
- **8:** carpet | FLOOR 8: A VERY QUIET CARPET | "Floor 8. A very quiet carpet. It has something to say, and has decided against it." / "Floor 8. You are one door too late. Management describes this as belatedly optimistic."
- **9:** big plant (coat on a hook) | FLOOR 9: SHADE | "Floor 9. A coat on a hook. The coat is not occupied. The coat is wearing a lanyard." / "Floor 9. The plant has grown another 6 inches. It has been given a title: Associate Director of Shade."
- **10:** phone | FLOOR 10: CALLS | "Floor 10. Everyone here is on a call. The call is about this elevator." / "Floor 10. A man says 'circling back' to a plant. The plant is Dennis. Dennis does not circle."
- **11:** abacus | FLOOR 11: DEPARTMENT OF FLOORS 10 AND 12 | "Floor 11. It is the same as Floor 3, but with higher self-esteem." / "Floor 11. The Department of Floors 10 and 12 is in a dispute. The dispute is on Floor 11."
- **12:** office | FLOOR 12: THE TOP | "Floor 12. The top. Beyond it, only Tuesday." / "Floor 12. An open-plan office where every desk is occupied by a coat with confidence."
- **12B** (beat 8+): film strip | FLOOR 12B | "Arrived at Floor 12B. The building has no Floor 13. Floor 12B is a rumor with carpeting." / "Floor 12B. A carpet, and the rumor of a chair."
- **Roof (Indoor)** (beat 8+): cloud | ROOF (INDOOR) | "Roof (Indoor). It is raining on the carpet in a very controlled way." / "Roof (Indoor). A sky has been installed. The sky has opinions about the sky."
- **7 minus a bit** (beat 8+): ruler | FLOOR 7 MINUS A BIT | "You are fractionally under 7. The bit has been informed." / "Floor 7 minus a bit. The bit is not here. The bit is on Floor 8, plus a bit."
- **The Other Lobby** (beat 8+): plant | THE OTHER LOBBY | "The Other Lobby. It is the same as the Lobby but slightly more confident." / "The Other Lobby. Dennis (Plant) is also here. Dennis (Plant) says it is a coincidence."
- **Floor (Current)** (beat 8+): footprints | FLOOR (CURRENT) | "Floor (Current). You are here. It is the only floor guaranteed to be." / "Floor (Current). Doors open on the doors you just came through."
- **13 (plate):** blank | FLOOR 13: NOT INCLUDED | "Floor 13: Not Included. This floor was not in the original estimate. It is not in the revised estimate either." / "Floor 13. The display reads 13 and nothing else. There is a polite sign. The sign is in good condition."
- **The Lobby, 10th visit:** "Dennis has been promoted to Floor 1 Ambassador. Dennis has not been told. Dennis is a plant."
- **The Lobby, 20th visit:** "Dennis is thriving elsewhere. A note on the wall says so. The note is not signed by Dennis."
- **Gerald at floor 7 (rare):** "Gerald (VP of Spuds) is standing on Floor 7. 'Seven is the greatest floor,' he says. 'It has a half.' The elevator does not stop for him. Management says: Gerald has been informed."
- **Dennis at 9:** from Dennis' 20th visit on, Floor 9 shows the plant 10% bigger each 5 visits.

### 13.5 Four, the Stranger

**13.5.1 Intros and introductions (by beat)**
- Ride 2 (beat 2, no tray): "Going up?" (you are going down). Then: "Of course you are. That is also up, from the basement's point of view."
- Beat 3 intro: Hi. I'm Four. People say I'm between Three and Five, but I think I'm just Four.
- Beat 6+ intro variant: I'm Nine, Four's cousin. You've met Four. We look the same. It's a family thing.
- After the ending: I'm Four again. I got better.

**13.5.2 Tray openers (12 pre-reveal, ask once each per shuffle bag)**
1. Cold in here, isn't it. Or it's warm. One of those. Which one is it for you?
2. Do you come to this floor often? I don't mean this floor. I mean any of them.
3. Nice weather we're having, in the sense that we're not in it.
4. Long day? I've had the same day since Floor 2.
5. I once said hello to a man for eleven floors. We never spoke again. He is Floor 11 now.
6. That's a nice way of standing. Is that how you stand? Don't change it.
7. Sorry, that was my cable. I'm very emotional in the mornings.
8. Do you ever think about how we're all just going up and down in a box? Anyway, how's your sister?
9. I'm just going up. Or down. I'll know when I get there.
10. Do you believe in Floor 13? I don't. I just think it's very private.
11. Did you take the stairs to get here? ...There are stairs. Please don't tell the others.
12. I was going to say something. I've forgotten it. It was good.

Post-reveal openers (beat 6+, added to the bag):
13. I'd get off here, but I'm the thing you're standing in. It's fine. It's been fine.
14. I was told this elevator has a personality. It is not as good as I was told.
15. I can feel every floor. I mean that as a compliment to the floors.
16. Sorry, I was thinking about a different floor. Same people. Better snacks.

**13.5.2b The 12-choice reply pool (3 shown per talk; label | Awks delta | Four's reply). Always include "Say nothing" at least once in every two talks.**
1. Comment on the weather | 0 | It is currently raining on Floors 1 to 6. Seven and above is Q4.
2. Say "Yep." | -1 | You said "Yep." It was received as a full paragraph.
3. Nod, slowly, to nobody | +1 | You nodded. Four nodded back. Neither of you knows what was agreed. It is binding.
4. Laugh a bit longer than needed | +3 | You laughed for three seconds too long. The elevator is now laughing too, in a lower register.
5. Pretend to be on the phone | -1 | You checked a phone you do not have. Four respects it. He has also checked his.
6. Study the floor indicator like it owes you money | -2 | Good choice. It does owe you. It has not said how much.
7. Look at your shoes | -2 | Good choice. They look like they have been somewhere.
8. Ask if he's going up | +1 | Up. Or the other one. I'll know when I get there. Don't wait.
9. Say "Small world." | +2 | Small world, you said, in a box. Four agrees. He has measured it. It is 1.5 persons.
10. Offer him a mint you do not have | +2 | He accepts. You both enjoy it enormously. Nobody has a mint.
11. Wave, with the wrong hand | +2 | He waves back with the wrong hand too. It is the start of something.
12. Say nothing | -3 | (confession, pick one) I once held a door for a whole afternoon and nobody was coming. It was the best afternoon of my life. / I have a small bag of tiny secrets. Want one? ...I think I am 14 percent escalator. / I have never once gone up on a Thursday. I am being brave about it.

**13.5.3 Callbacks (tracked via `lastReplies`; 50% when a choice repeats one of the last 3)**
- Yep: You said "Yep." to me earlier. I have thought about it on every floor since.
- Nod: You've nodded before. I took notes. I am the notes.
- Laugh: You laughed like that before. I'm not saying I mind. I'm saying the elevator remembers.
- Say nothing: Your silence on the weather was very clear. I think we understand each other now.
- Shoes: Those are the same shoes. I like a person who commits to shoes.
- Spam replies (4 talks in under 30s): You have said that before. I took notes. I am the notes.

**13.5.4 Ignored, stare, hold**
- Ignored: No, that's fine. I'm fine. It's fine. The silence is fine. We have a lot of it.
- Stare prompts (all end with "?", Four, then the ring appears): "Do you also find the number very interesting right now?" / "That's a good number, isn't it?" / "Are we both looking at the number, or just one of us?" / "Has it always been that number?" / "Isn't it nice when a number just sits there?" / "You're not going to look at me, are you?"
- Ring prompt (small text under the LCD): Hold the number. Do not look at him.
- Stare held 2s: Thank you for not looking. Most people just look.
- Stare failed: Are you looking at me? Look at the number. The number loves it.
- Stare held 6s: Studied the number for 6 seconds. Management is moved.
- Stare timeout: You looked. Everyone looks. It's fine. It's fine.
- Door Close during a hold: Thanks.

**13.5.5 Clicking Four / other**
- Please don't.
- (2nd click, same ride) Please. I'm doing the best I can with this face.
- Phone button (once per ride, Awks -1): You checked a phone you do not have. Awks: -1.
- Stranger parting (end of a talk, 1 in 4): Well. This is my floor. Oh. It's yours too. We keep doing this.
- After Silence: That was nice. Same time tomorrow? Not you. The elevator.

**13.5.6 Lanyard titles (swap each ride, no repeats until all used)**
Assistant to the Assistant / Acting Weather / Director of Whatever Floor This Is / Head of Not Being Asked / Senior Vice Coat / Interim Between / Associate Handrail / Lead Pause / Chief of Staring Straight Ahead / Visitor (Permanent) / Regional Gap Manager / Deputy Elevator. Post-reveal permanent title: Elevator (Acting). Quiet ride: Passenger.

**13.5.7 Reveal and apology tails**
- Reveal (beat 6, one tray with replies `I suspected.` / `Sure.` / `Say nothing` -> all respond with next line): I should tell you something. I'm also the elevator. Please don't make it weird. You're doing great.
- Reveal reply: Thank you. That's a relief. The walls blink. That's me. Sorry.
- Apology tails (30% of announcements post-reveal): (Sorry.) / (That was me. Sorry.) / (I said that, as the elevator. Apologies.) / (I'm so sorry. I'm the building's voice.) / (Please read that in a nicer voice.) / (Dennis would never have said it like that.)
- Harmony (tier 5+): Four hums a harmony. It is a half step off. It is a half step that has never been wrong before.

### 13.6 Half button (7½) and near misses

- Pressed (first time ever): The half button is warm to the touch. The elevator has noted your interest.
- Every press: Rounded for your convenience.
- Landing on 7 (via half): You pressed 7 1/2. Of the 12 floors available, the elevator chose 7. It is a difficult number to love.
- Landing on 8 (via half): You pressed 7 1/2. The elevator chose 8. 8 is 7 1/2, in a different department.
- Certificate (first 7/8 via half): Certificate of Near Miss: <A>. Issued with all the sincerity of a <A>. Not valid on the other one.
- Attempt 5: Your 7 1/2 attempts have been compiled into a Progress Report. The bar is 61 percent. The confidence is 100.
- Attempt 12: This is the 12th attempt. The elevator has decided to reach 7 and a half. You have arrived at the idea of 7 and a half. The idea is open for feedback.
- Attempt 25: The 7 1/2 button has been awarded a small sticker. It reads WORKS HARD.
- Landing on 7 (any ride): Floor 7 and a half is 0.5 away. This is the same distance as before. Management is proud of the fraction.
- Landing on 8 (any ride): Floor 8. You are one door too late. Management has marked this as belatedly optimistic.
- Landing on 7 early (before beat 7): You are on 7. Floor 7 and a half is not available at this time. Please wait. It is also not available later.
- Near-miss reports: "Nearly" filed. Excuse 4, paragraph 2. / "Nearly" filed. The blueprint had a typo. The typo was a floor. / "Nearly" filed. Lunch.
- Crack missed (wistful): You missed it. There was a hallway. There was a door in the hallway. The door was also an elevator. It is gone now.
- Crack hit: Beyond the doors is a hallway, and in the hallway is a door, and the door is also an elevator. A sock faces away, quietly. It does not matter. It is a secret.

### 13.7 Music

Tier table (track | caption). Within a tier ride 1 and 3 use the track; ride 2 uses a B-side.
1. Gentle Ascent in D (Slightly Flat) | A saxophone is being kind to you.
2. Gentle Ascent in D, Tier 2 (Smoother) | A saxophone has discovered butter.
3. Jazz With Ambitions | The piano has taken an evening class.
4. Gentle Ascent in D, Tier 4 (Now With Feelings) | The drummer has locked the bassist out of the arrangement.
5. Orchestral Jazz | The brass section has unionized and wants a longer break.
6. A Single Held Note, Sincerely | It has been held since 2:17. It has not been told it can stop.
7. Gentle Ascent in D, Tier 7 (Reprise of the Reprise) | A saxophone is arriving from a different floor.
8. The Song From Before You Were an Employee | A perfectly straightforward melody. The elevator seems quietly proud of it.
9. Gentle Ascent in D, Tier 9 (The Saxophone's Ghost) | The saxophone has left the building, but its sound remains on Floor 4.
10. Gently | Tier 10 is the word Gently, repeated at different pitches.
11. Gentle Ascent in D, Tier 11 (Reprise of the Reprise of a Different Reprise) | Nobody has asked who is reprising whom.
12. Silence (Premium Edition) | Available only in the elevator. Free, with ads. There are no ads.

B-side generator: `<adj> <genre> (<paren>)` with adj: Smooth / Beige / Reluctant / Overqualified / Sincere / Moderate / Hopeful / Underlit; genre: Lift Jazz / Panpipe Interpretation of a Spreadsheet / Waltz for Nobody in Particular / Lounge Concerto / Light Fugue / Bossa Nova for Carpet / Ballad of the Lanyard / Instrumental Meeting; paren: Reprise / Radio Edit / Extended Hold / Sad Version / Unplugged From Floor 3 / Cell B4 / Now With Feelings / For Strings and Management.
Extra music lines: "Now playing: <track>. <caption>" / "Smooth Jazz Adjacent. Adjacent to what has been withheld." / "Jazz Intermission. A stapled flyer has been left on the carpet."

### 13.8 Management and beat lines (one per beat, via `api.say`; also use `api.sayRandom` categories as appropriate)

- B1: Welcome to the Elevator Simulator. Please select a floor. The floor will be selected for you.
- B2: You pressed N and arrived at R. This is a pattern. Management has made a tick mark on a clipboard.
- B3: A person, standing. We are told he is called Four. He would like to talk. Please be agreeable.
- B4: Sandra has policies on eye contact. They are specific and contradictory. Please stare at the number.
- B5: Occupancy: 7 and a half persons maximum. Sandra from Compliance has flagged the half person as ambiguous.
- B6: Management has been asked to disclose that the person in the corner is also the elevator. Management wishes this had been phrased more gently.
- B7: A lever has arrived. It was not requested. It is, however, brass.
- B8: The building has grown. Management did not authorize this. Management has authorized it retroactively.
- B9: The decimal has exceeded what the display can say. The display is doing its best. The display is also a face.
- B10: Arrival has been certified. Please see Floor 7 for the paperwork.
- Door Open: Door Open pressed. The doors were already open. They now feel watched.
- Door Open x11: You pressed Door Open eleven times. The doors have opened a little out of respect.
- Alarm: A polite bell rings. Your concern has been added to the pile of concerns.
- Alarm x5: The pile of concerns has been given its own floor. It is a very good floor.
- Help: You have been connected to Help. Help is Four. Four is the elevator. Please hold.
- Blank button: The blank button has been pressed. It reveals a counter. The counter says <C>. It says nothing else.
- Management quotes (random, per arrival, 1 in 6): "Your ride has no point. Your ride has been logged as important." / "Thank you for riding. The committee rode alone." / "You are 7.5 percent of the way to understanding the elevator. Please continue."

### 13.9 Door Close gag ladder

- 1st: Door Close pressed. The doors have noted your enthusiasm and filed it under Doors.
- 2-11 (rotate): Door Close pressed. Doors are already making their own decisions. / Door Close pressed. The doors sighed. They did it on principle. / Door Close pressed. The doors are aware.
- 12th (audit): Door Close has been pressed 12 times. It is not connected to anything. It is, however, very well liked.
- 25th: The button has been renamed Door Closeish. It is more honest this way.
- 50th: You have pressed Door Close 50 times. A small plaque has been installed in your honor. It says Close.
- Beat 6 reveal: Door Close is wired directly to Dennis (Plant). Dennis has declined to close anything.
- Beat 6+: Dennis (Plant) has been notified of your request. Dennis (Plant) is thriving.
- During stare hold: Thanks. (Four)

### 13.10 Quiet ride (beat 8, once)

- (all music stops; lights warmer) This ride is quiet. No buttons are lit. Four stands there.
- The caption says Four has been in this elevator since before the building. He asks softly: "Is it all right if I stay on to the top?"
- Single reply: Of course.
- Four: Thank you. I don't get to see where it goes. I only get to be there.
- The elevator goes up past 12 without a floor. The lights are a bit warmer. Then they are not. Then it is a Tuesday somewhere.

### 13.11 Idle

- 45s (LCD): THINKING.
- 90s: The elevator has stopped between floors to give you space. It has given you the space. It is now standing in it.
- 90s Four: Do you want to talk about it? I don't know what "it" is. I'm ready.
- 3 min: Incident of Silence #1 filed. The silence has been given a badge and asked to wait in the hall.
- 5 min: The elevator has started the music by itself. It is playing it very quietly, for itself. Four hums along, half a step off.
- Return: While you were away, Floor 7 and a half was visited by nobody. It was lovely. You missed it. Please do not feel anything.
- Return (second time): While you were away, Dennis (Plant) filed a report about you. The report is nine words long. It says: no complaints. Present, apparently.
- Management ride (STRETCH, 7 min): The doors open on Floor 7. Management is there. "I wanted to see what it's like to be a passenger," he says. He rides to 8. He does not tip.

### 13.12 Spam, resize, secrets

- Spam 10: Button Fatigue detected. The buttons are tired. They would like a moment, and a modest raise.
- Mash Surcharge: Mash Surcharge applied: 1 Meh. Per policy, pressing is billed in arrears of feelings.
- Spam 25: The panel has been wet-painted. Please wait 8 seconds. It is not wet. It is a policy.
- Spam 40: Elevator Security has arrived. It is also the elevator. It has detained itself, gently, on your behalf.
- Spam 40 Four: I can feel every one of those. Please press like you mean it. Or less.
- Please rule: Please.
- Please rule (3rd ride): Please. Thank you. That is better.
- Tiny window: Occupancy is now 1.5 persons. Cozy. Sandra has been notified of the coziness.
- Resize back: Thank you. I can finally gesture.
- Resize x5: I think we've become a closet. I don't mind.
- Typed 7.5: You typed 7.5. The elevator does not do decimals. It has, however, written it down and put it on a wall.
- Typed (Four): (Four says nothing. He looks at the sign. It is the first time.)
- Ghost 6: Floor 6 has been pressed. You did not press Floor 6. Nobody is on 6. Somebody wants to be.
- Backwards (STRETCH): You are going down. I thought you wanted to be up. I will adjust my expectations.
- Swap (STRETCH): You are the one who is also the elevator today. / Going up? / Of course you are.
- Silence: (the elevator holds its breath)
- Silence end: That was nice. Same time tomorrow? Not you. The elevator.
- Awks 8 warning: The silence is starting to have a shape. Please do not describe it.
- Awks 10: The elevator has opened its doors between floors to let the tension out. This is a policy.

### 13.13 Cast

- Gerald: Gerald (VP of Spuds) has boarded at Floor 4. He presses nothing. "We are all on the same floor," he says, "in the sense that we are not."
- Gerald exits: Gerald has disembarked mid-sentence. The sentence continues on Floor 4.
- Gerald (rare at 7): see 13.4.
- Sandra signs (rotating, every 12s, beat 5+): Maximum occupancy: 1.5 people. Minimum occupancy: also 1.5. Stand accordingly. / Talking is encouraged. Talking is also a violation. Please do both in moderation. / Compliance Fee: 0.1 Meh for pressing during a red banner. Refundable via Form 27B/6. / All passengers must stand at a 35-degree angle to the wall. / Sandra has measured the angle. It is 34. / Floor 13 is not a floor. Please do not visit it. It has been visited. / Please do not look at the sign. It knows. / Sandra rode the stairs. The stairs have a rating.
- Dennis 10th Lobby: Dennis (Plant) has been promoted to Floor 1 Ambassador.
- Dennis 20th Lobby: Dennis is thriving elsewhere.
- Toast: Do you smell that? Someone in a previous ride was crying into a slice. It was moving.
- Toast (alt): The elevator smells faintly of toast. It is nobody's fault. It is also somebody's.
- Tuesday: Tuesday is not served by this elevator. Tuesday has its own.
- Tuesday (2): The elevator is aware it is a Tuesday somewhere. It does not wish to discuss it.
- Sock: Please do not step on it. It is on a journey.
- Sock (ending): The Missing Sock is on the paperwork floor. It is the only passenger who ever reached 7 1/2. It did not say how.

### 13.14 Zeno chain lines (milestone lines override at n = 1, 5, 10, 13, 20, 30, 40, 49)

- Lever arrives: A brass lever has slid into view. It wants to be pulled. It does not say why.
- n=1: Nudged. Floor 7 and a half is now 0.25 away. This has never failed to not arrive.
- n=5: We are 0.015625 from arrival. This is a personal best.
- n=10: Display: <POS>. Management: "We're basically there." Elevator: "Basically is a floor I do not serve."
- n=13: 7.4999. The elevator would like it noted that it has not arrived. The elevator would like it noted twice.
- n=20: <n+1> decimal places. Management has started a spreadsheet. It has one row.
- n=30: <n+1> decimal places. Nobody has been this close to 7 and a half. Nobody has been this far from it either.
- n=40: <n+1> decimal places. The nudge is now a rumor with a brass handle.
- n=49: The next nudge may be the last one, in the sense that it may not be.
- Generic (shuffle bag, tiny-gap versions use "<n+1> decimal places" instead of <GAP>): We are <GAP> from arrival. This is a personal best. / The cab has moved half the distance. The other half has been asked to wait. / Display: <POS>. Management says the display is trying its best. / This has never failed to not arrive. / Nudge recorded. The nudge has been given a number. The number is smaller. / We are <GAP> from arrival. Please do not look at the gap. / Halfway there, again. That is a recurring appointment.
- Abandon: Abandoning <POS>. The decimal has been placed in a drawer. The drawer is labeled DECIMALS.
- Overflow dispute, d=12: Management: "Does 7.499999999999 count?" The elevator: "It counts as a number." Management: "Does it count as a floor?"
- d=15: The display is struggling and so is the stranger's face. They are the same face. They are doing their best.
- last nudge (n=49): Management and the elevator hold a brief public disagreement about whether 7.4999999999999 counts. The elevator wins. It is not clear what it won.
- Float: The decimal has exceeded the capacity of the number. Arrival certified as 7.5. Photographs show Floor 7.
- Lever (retired, after ending): The lever has been retired. It now stands on a plaque. The plaque says LEVER.

### 13.15 The not-ending lines (use in order)

- a) (Management, sincerely): Congratulations. You are on Floor 7 and a half. The paperwork says Floor 7. The paperwork has been asked to reconsider.
- b) Deviation 7.5, Reason: Technically.
- c) The doors open on Floor 7. This is the paperwork floor. The paperwork says 7.
- d) Four: Oh good, you're here. Going up?
- e) Four: I never get to see where you go. Tell me about Floor 7 and a half.
- f) Reply button: It was fine.
- g) Management: The Door Close button has been pressed <C> times. It would like to say it was in the hallway. It was.
- h) New goal: Floor 7 and three quarters. Please hold your applause. It is the same applause, reused.
- i) Plaque appears: PASSENGER OF THE MOMENT: NOBODY. Nobody has been told. Nobody is thrilled.
- j) The cab resets. Music plays "Gentle Ascent in D (Slightly Flat)" exactly as it did at 0:00, in full silence. The speaker says: Welcome aboard. This elevator serves floors 1 through 12, and on request, feelings.
- k) Four (introduces himself again): I'm Four again. I got better.
- l) The new button `Going up?`: pressing it says "Going up. Or to a different version of up." and picks a random floor.
- m) Meh read: "Elevator Simulator has awarded you 7.5 Meh. This is the maximum, rounded to the nearest 7.5."
- n) If the player returns after the ending: Welcome back. The elevator remembers you. It has been doing nothing. It has been doing it for you.

## 14. IMPLEMENTATION HINTS

1. File skeleton: IIFE, `'use strict'`, `P.injectCSS(CSS,'css-elevator-simulator')`, achievements, `registerModule`. In `mount(root, api)` build the DOM once, keep references in a local `ui` object, create `S` and everything else in closure; return `{ destroy() {...} }` that clears the music interval (managed anyway), the ResizeObserver, the drag and hold listeners, and sets `S.dead = true` so any stray callback bails.
2. Lines: keep content as module-level constant arrays; pull with a `bag(arr)` helper (shuffle bag that never repeats back-to-back). Use `api.pick`/`api.shuffle` so selftest seeds are deterministic.
3. Use `api.say` only for beat lines, big moments and a rate-limited selection of arrival lines (at most one `api.say` every 2.5 seconds). Put the per-ride line in the module's own announcement strip.
4. `fmtFloor(n)`: -3 -> "Basement 3"; -2 -> "Basement 2"; -1 -> "Basement 1"; 0 -> "the Lobby"; 12.5 -> "12B"; 13 -> "13" (or the roof when the roof was pressed); 6.9 -> "7 minus a bit"; else the integer. Never print `NaN`/`undefined`: have every template filler return a string and default to "this floor".
5. Template fill: simple `str.replace(/<(\w+)>/g, (m,k)=> vars[k] != null ? vars[k] : '')`.
6. Selftest scaling: define `const T = api.selftest ? 0.1 : 1;` and multiply waits (ride, doors, holds, idle) by `T`; idle thresholds by `1/30`; stare hold 300ms; beat time gates `/20`.
7. Pointer events everywhere (`pointerdown`/`pointerup`/`pointercancel`) with `setPointerCapture` (try/catch) for the lever and the stare hold. The lever is draggable with a plain button fallback.
8. Do not trigger actions in the middle of destroy: all callbacks check `S.dead`.
9. Typing buffer: store `{ch, t}`; clear if older than 4s; the final `5` is swallowed only when the previous two keys were `7` then `.`.
10. Half-size button: use a wrapper `<span>` or `::after` to expand the hit area, and keep it a real `<button>` in DOM order after `7`.
11. Arrival priority (4.2.5) must be one function `afterArrive()` so only one thing can ever claim the doors.
12. Beat gating happens in `onArrive()` only; `maybeAdvanceBeat()` is idempotent.
13. The Shaft Cam: build once with `createElementNS`; update via attributes/transform, not by rebuilding.
14. Tab order: keep the DOM order floors ascending, then secondary buttons, then extras. The announcement strip is `aria-live="polite"`; do not set `aria-live` on anything that updates every 100ms (the LCD during counting is `aria-hidden`; announce only the arrival).
15. Reduced motion: `@media (prefers-reduced-motion: reduce)` disables the jitter, door slide (fade), equalizer bounce, confetti stays (engine handles).
16. Cap the history list (5 visible), the lanyard shuffle, awards limiter, and any plaque nodes.
17. Count lines early; this spec is large. Cut STRETCH before cutting jokes in MUST. Remember: `>= 80` distinct lines are required inline; this brief supplies about 280.

## 15. RISKS (the 5 most likely implementation bugs, and the fix)

1. **Stale timers re-firing after a phase change (double arrivals, tray over the ride, doors closing during a talk).** The ride has many chained timeouts (lag, travel, doors, hold, auto-close, idle). Fix: a single `rideToken`/phase token captured by every callback, `S.dead` check, one `afterArrive()` arbiter, and tests that spam keys during every phase.
2. **The Zeno math: reaching 7.5 never happens, happens twice, or prints `7.499999999999999` as `7.5`.** Repeated halving of a double can tie-round unpredictably, `toFixed`/`toPrecision` can print exponent notation, and hold-repeat can overshoot. Fix: track `n` and exact `gap = 2^-(n+1)`, compute `pos` fresh from it, force `pos = 7.5` at `n >= 50`, guard the chain with `if (S.phase === ENDING) return`, throttle nudges to >= 250ms (350ms hold repeat), and show gaps below 0.0001 as "N decimal places", never as `1.1e-13`.
3. **Held inputs sticking (stare ring, lever drag, nudge hold, `E`/Space keyup missed after blur or destroy).** Fix: cancel on `pointerup`, `pointercancel`, `lostpointercapture`, `blur`, `visibilitychange` (hidden), `keyup`, and in `destroy`; never rely on `mouseup` alone; do not `preventDefault` Space except for the stare hold; do not bind `B` (the Lobby boss key).
4. **Spam punishments firing every press or leaving the panel stuck.** Mash Surcharge applied on every click drains Meh and loses the player their balance; wet paint using the `disabled` attribute drops keyboard focus and, if the clearing timeout is cancelled by a phase change, never re-enables. Fix: `mashStreak` with per-streak `surcharged`/`fatigued`/`painted`/`detained` flags that reset only when the streak resets; wet paint uses a CSS overlay plus `aria-disabled` and a class (never `disabled`), cleared by a timeout that is re-armed on destroy/remount; the please rule is a delay, not a hold.
5. **Idle/resize/aria behavior leaking out of the module.** Idle thresholds firing in the middle of a talk or the ending, the dim filter staying after input, `ResizeObserver` left running after destroy, DOM growing in the log or plaque, `aria-live` regions announcing the LCD at 10Hz. Fix: a single 1s idle interval via `api.setInterval` that skips protected phases and resets on input, remove the dim class in one place, disconnect the observer in `destroy`, cap all lists, announce only arrivals, run `node tools/selftest.js elevator-simulator --steps 400` (multiple seeds) and `node tools/lint.js games/elevator-simulator.js` and fix everything including remount leaks (20 remounts, no growth).
