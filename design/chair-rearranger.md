# DESIGN BRIEF: Chair Rearranger Pro  (id: `chair-rearranger`, category: `game`)

Builder: read SPEC.md and VOICE.md first, then build `games/chair-rearranger.js` as ONE file, <= 1800 lines, vanilla JS, no assets. This brief is final. Where it is silent, decide sensibly and move on. Do not ask anyone anything.

Showrunner decisions (so you know what was cut and why):
- SPINE = pitch 1 (Inspector Pemberton-Oyelaran, hedonic adaptation, sidle, window that moves, union consultation, zoom-out, certificate + reset).
- STOLEN from pitch 2: Colin the pigeon on the sill, the tiny undraggable "7 1/2th chair" (Gerald sits in it), stamp-escalation names, the four category readouts that roll and all land on Fine.
- STOLEN from pitch 3: "Stand by" mini-gag (Management only, sparingly), Chair Morale/strike idea is CUT (replaced by shake-nausea and rush-stamp), "Rooms Optimized" counter is CUT (Mk II numbering covers it).
- CUT as unbuildable or weak: persistence of chair positions, undo, Deep Inspection 4-page report, Qi arrows, Chair vote buckets, two-finger twist, separate crush-bonus system, cross-module flag for Dennis, 8-chair tower (only 6 movable chairs exist; tower threshold is 5), sunbeam brightening chairs via blend modes, audio soundtrack (there is none; "soundtrack goes soft" becomes a caption + one bell).
- Chair collisions do NOT exist (chairs overlap freely). This is what makes the tower possible and keeps the code small.

---

## 1. Concept

A top-down room: a window on the north wall, a door bottom-left, a pot plant (Dennis) in the bottom-right corner, a wooden floor with a travelling sunbeam. Five chairs have strong opinions about the window (or the door, or the middle, or a wall, or each other). The player drags them around trying to reach "the optimal arrangement". Inspector Pemberton-Oyelaran of the Bureau of Auspicious Arrangement scores the room. The score is ALWAYS exactly "Fine". The chairs are never fine: once a chair has been content for 4 continuous seconds it "gets used to it" and wants something else. Unhappy chairs slowly sidle toward what they want when you let go, so you are always herding a gentle tide of furniture.

The game cannot be won, and says so sincerely. Everything is cosmetic. Rewards are tiny.

Core joke engine: maximum ceremony (stamps, needles, reels, certificates, a Closing Ceremony) for a verdict that never varies.

First joke inside 10 seconds, with zero input: at ~2.5s Management says Marguerite asked to face the corner (she starts facing it), and at 5s the Inspector walks in, looks at the room for 0.4 seconds without looking up, and stamps FINE.

Cast (all comedic, none appear in the Lobby): Management (narrator, via `api.say`), Inspector Pemberton-Oyelaran (the 🧐), Clive, Brenda, Pip, Marguerite, Chair 3, Desmond (stool, arrives beat 5), Colin (pigeon), Gerald (potato, cameo), Sandra from Compliance (sticky note only), Dennis (Plant). Sock (rare).

---

## 2. World model

### 2.1 Coordinates
- The room is a `div` with `aspect-ratio: 4/3`, width = 100% of the module column (360px to ~1000px; cap at 1000px so the Lobby window never needs scrolling). Everything inside stores NORMALISED coordinates `x,y` in 0..1 plus `angle` in degrees.
- Distance helper (MANDATORY, used everywhere): `d(a,b) = Math.hypot(a.x-b.x, (a.y-b.y)*0.75)`. The y term is scaled by 0.75 so distances are isotropic in room-width units.
- Sizing: keep CSS var `--u` = roomWidth/100 (px), set on mount and on window resize (via `api.on(window,'resize',...)`). Chair size = `max(44px, calc(var(--u)*11))` so hit areas are >= 44px. Position chairs with `left:x*100%; top:y*100%; transform: translate(-50%,-50%) rotate(angle) scale(s)`.
- Chair angle convention: angle 0 = chair faces NORTH (back bar at the south side of the seat). Facing vector `f = (sin a, -cos a)` (y down is positive on screen). "Facing a point P" = angle between `f` and `(P - chair)` (with y scaled by 0.75... use the plain unscaled vector for angles) is < 30 degrees.
- Clamp chair centres to x in [0.05,0.95], y in [0.07,0.93] except the defenestration rule (2.6).
- ALL pointer math uses a FRESH `room.getBoundingClientRect()` on every event: `x = (clientX - r.left)/r.width`. NEVER cache it (the zoom-out beat applies a CSS scale to an ancestor).

### 2.2 Entities and exact start arrangement (also the arrangement restored by the reset)

| id | name | start x,y | start angle | want (kind) | tint | notes |
|---|---|---|---|---|---|---|
| c1 | Clive | 0.30, 0.50 | 0 | window | mint #8FD9B6 | the window lover |
| c2 | Brenda | 0.62, 0.30 | 45 | shade | lilac #B8A1E3 | sun on her left arm |
| c3 | Pip | 0.78, 0.74 | 90 | corner | slate #9FB4D9 | dim corner dweller |
| c4 | Marguerite | 0.20, 0.82 | 225 (faces the SW corner) | center | coral #FF8A7A | folding chair, dramatic |
| c5 | Chair 3 | 0.55, 0.70 | 0 | wall | mustard #F2C14E | wobbly, coaster under one leg |
| c6 | Desmond | arrives beat 5 at 0.50, 0.45 | 0 | window | sand #E8D5A3, round stool, no back bar | not present until beat 5 |

Static props: Window (starts north wall centre `(0.5, 0)`), Door at `(0.10, 1.0)` (decorative, labelled EXIT (DECORATIVE) in a title attr), Dennis `(0.93, 0.88)` (never movable), Sandra's sticky note on the west wall with a 🚩, Half Chair (beat 6, unmovable).

### 2.3 Satisfaction `s` in 0..1 (the "mood"), recomputed every tick
Let `win` = current window point on the wall, `door` = `(0.10,1.0)`.
- window: `s = clamp(1 - d(chair,win)/0.55) + (inBeam ? 0.10 : 0)`, then clamp 0..1.
- shade: `s = clamp(d(chair,win)/0.70) - (inBeam ? 0.20 : 0)`, clamp.
- door: `s = clamp(1 - d(chair,door)/0.50)`.
- corner ("dim corner"): the corner farthest from `win`; `s = clamp(1 - d(chair,corner)/0.45)`.
- near(X): `s = clamp(1 - d(chair, X)/0.35)` (X is another chair that is in the room).
- center: `s = clamp(1 - d(chair,{0.5,0.5})/0.40)`.
- wall: `wd = min(x, 1-x, y*0.75, (1-y)*0.75)`; `s = clamp(1 - wd/0.12)`.
Start values (verify in the self-check, all must be < 0.55 at start so nobody flips before the premise): Clive ~0.23, Brenda ~0.23 (in beam) to 0.36, Pip ~0.35, Marguerite ~0.04, Chair 3 0.00.

Faces by `s`: `<0.10 😣`, `<0.30 😕`, `<0.55 😐`, `<0.75 🙂`, `<0.90 😊`, `>=0.90 🥹`. Content = `s >= 0.55`. Dizzy overrides with 🤢. Out of the room (defenestrated) = no face.

### 2.4 Hedonic adaptation (why it can't be won)
- Per chair `contentT` accumulates dt while content, resets to 0 when not content.
- At `contentT >= 4`: FLIP. The chair sighs (bubble from its `flip` bag), Management narrates it as a staffing event (rate-limited to one per 6s; extra flips still happen, just quietly), +1 Meh (rate limit 1 per 3s), Dennis's leaf twitches, Colin tilts (if present), stat `chair-rearranger.flips` +1, roster chip does a little slot-machine roll. Then the chair gets a new `want` from the FLIP TABLE and `contentT = 0` and a 2s `flipGrace` during which it cannot flip again.
- FLIP TABLE (deterministic): window->door, door->window, shade->window, corner->near(Clive) (if Clive is out, window), near(X)->corner, center->wall, wall->near(Brenda) (if Brenda out, center). Desmond: window->door->window. Pip's first flip is therefore "wants to be near Clive": scripted line, and Pip follows Clive around.
- GUARD: after choosing the new want, if `s(new) >= 0.55` at the flip moment, immediately re-pick the next entry in a rotation `[window, door, center, wall, shade, corner]` that is not satisfied, so a chair never flips straight into contentment (prevents flip loops).
- Clive special cases: when he completes a flip FROM window, increment `clive.windowVisits`; on the 3rd, his flip line is the "third time" line. If Clive is within 0.05 of the exact midpoint of window and door and has been still for 3s: "stable discontent" event (once per cycle).

### 2.5 Sidle
If a chair is NOT held, NOT sliding from a throw, NOT meeting-circle, and `s < 0.55`: move it toward its want target at 0.010 room-widths/second (about 6px/s at 600px), plus a tiny squeak (`api.sfx('boing')` at most once per 2.5s globally, only if the chair is actually visible and moved > 0.02 since last squeak). Target points: window->win, shade->the point on the opposite side of the room centre from `win` (clamped), door->door, corner->corner, near(X)->X (stop at 0.12 distance), center->centre, wall->nearest wall point. Happy chairs hold still and show a hum (tiny ♪ that fades, max 1 on screen per chair, 1 per 5s). Reduced motion: no wobble, sidle still moves (it is slow) but without squeaks and without the wobble animation.

### 2.6 Defenestration (secret, repeatable)
If a chair is DROPPED (or thrown and slid) with `d(chair, win) < 0.08`: it fits through the closed window. It slides to the window point, shrinks, drifts off the top of the screen (fade+translateY on its element, `api.sfx('whoosh')` then a tiny 'pop' for the whoomph), then is `out` for 20 s (beat-clock seconds, not scaled in selftest... use real seconds divided by 10 when `api.selftest`). While out: skipped by mood, flips, towers, inspections; its roster chip shows "(outside)". After 20 s it re-enters through the door at `(0.10, 0.92)` with a 😎 tan face flag (`tan=true`, drawn as a small sunglasses/tan tint) and a postcard line from the cycling postcard list (cap history to the last 6; postcards chosen by `defenestrations % list.length`). Its `want` resets to window and `windowtrips` +1. Achievement `chair-rearranger.defenestrated`. Stat `chair-rearranger.defenestrations`. Only one chair out at a time; a second drop into the window while one is out just bounces the chair back with the line "The window is at capacity. It has never been at capacity before. It is thrilled."

### 2.7 Sunbeam
- Beam origin = window span on its wall (width 0.22). Direction = wall inward normal rotated by `sweepAngle`, where `sweepAngle = 22deg * sin(2*PI*T_real/period)`; period 90 s (30 s from beat 5 onward, "noticeably faster"; selftest: unchanged).
- Rendered as a skewed semi-transparent white-gold polygon via `clip-path: polygon(...)` on an absolutely-positioned `pointer-events:none` div, updated at ~10 fps (every 6th frame), not every frame. Length 0.9 room-widths, far end width 0.5.
- `inBeam(chair)` = point-in-polygon test on the same quad in normalised coordinates. Cheap, compute once per tick.
- Shade zone: a cool lilac translucent overlay with `pointer-events:none` on the half of the room farthest from the window (purely decorative).

### 2.8 The window moves (beat 6)
Window position is a perimeter parameter `wp`. Path: north centre (0.5,0) -> NE corner (1,0) -> SE corner (1,1) -> south centre (0.5,1). Total length 1.75 (units in the unscaled normalised plane). Slides eased over 20 seconds (reduced motion: instant jump). Render the window div at the point with `transform: translate(-50%,-50%) rotate(r)` where r = 0 (north wall), 90 (east wall), 180 (south wall), snapping to the wall the point is currently on. The beam uses the wall normal of the current wall. It stays on the south wall for the rest of the cycle. Everything (mood, corner, shade, beam) is computed from `win`, so nothing else needs special handling. Door is bottom-left and the window at the south wall centre never collides with it. Reset puts the window back north.

---

## 3. Controls (exact)

All chairs are real `<button>`s inside the room: `aria-label` = `"Clive, chair, wants the window"` (update the "wants" part when the want changes; update at most once per second to avoid chattering screen readers). Window is also a `<button aria-label="Window">`. Roster chips are `<button>`s. Never rebuild chair DOM per frame: update `style.left/top/transform` and `textContent` only when the value changed.

### Mouse
- Pointer-drag a chair (pointer events, `setPointerCapture` inside try/catch; synthetic fuzz events may have an invalid pointerId). On press: chair lifts: `scale(1.08)`, bigger shadow, `api.sfx('blip')`, stat nothing yet. While moving: legs scrape a scuff trail on the canvas (one scuff point per 6px of movement; cap, see 7). On release: a thunk (`api.sfx('tick')`), squash-and-stretch on the element for 180ms, a creak bubble sometimes. A drag that moved < 4px is a "click" (selects the chair, no drop effects).
- Throw: keep the last 80ms of pointer samples; on release, if speed > 0.5 room-widths/s the chair slides with exponential friction `v *= exp(-4*dt)` until `|v| < 0.02`, clamped to room. Reduced motion: no slide.
- Mouse wheel over the room while a chair is held (or selected/hovered): rotate it 15 degrees per wheel notch (`preventDefault` only when a chair is held).
- Double-click a chair: rotate 45 degrees.
- Right-click (`contextmenu`, `preventDefault`) or `P` key: PAT the chair.
- Hovered/selected/focused chair shows ONE shared floating "turn" knob (a real `<button aria-label="Turn chair 45 degrees">` positioned beside the chair). Clicking it rotates 45 degrees.
- Long hold (1.5s, pointer moved < 6px): before beat 7 = "ask": the chair speaks its want line; from beat 7 it is the CONSULTATION mechanic (section 5, beat 7).

### Touch
Same pointer events. `touch-action: none` on chairs ONLY (page still scrolls). Double-tap rotates 45. Turn knob works as above. Long-press = ask/consult as above.

### Keyboard
- Tab order: the chairs (DOM order), then the window, then the INSPECT button, then roster chips. Visible focus ring on all.
- `Space` or `Enter` on a focused chair picks it up (live region: "Clive lifted") / puts it down ("Clive placed"). Handle on `keydown` with `preventDefault` (so Space does not scroll and no synthetic click fires), NOT on `click`.
- While held: Arrow = move 10px, Shift+Arrow = 50px (convert px to normalised with a fresh rect width), `Q`/`E` rotate -15/+15, `Esc` cancels and returns the chair to its pick-up position (line: "Cancelled. The chair is relieved to be where it was, and also disappointed in you.").
- `I` = inspect, `P` = pat the focused/selected chair. When no chair is held, `Q/E` rotate the focused/selected chair.
- Keyboard users bypass consultation instantly (during beat 7 the live region says "Consultation conducted silently, as is traditional.").
- A visually hidden `aria-live="polite"` div receives thought bubbles (max 1 per 1.5s), verdict, and pick-up/place messages.

### Roster strip
One chip per chair: face emoji, name, tiny mood bar (width = `s`). Click/Enter selects the chair (focus it, show its bubble with its want line, say "{chair} wants ..."). Horizontally scrolling flex strip on narrow screens. Desmond's chip is added when he arrives; the Half Chair has no chip.

### INSPECT button
Big coral sticker button "INSPECT" (min 44px). Click or `I`. Behaviour in section 4.

---

## 4. The Inspector and the verdict

### 4.1 Visits
- Auto visit #1 at T=5s: scripted "glance". The 🧐 enters from the door, stops for 0.4s facing the room (no pausing at chairs), the stamp slams. No walk-through.
- Later auto visits: first at T~35s, then every 25 to 40 s (`api.randInt`), from beat 2 onward. A visit = walk-through: 🧐 walks (rAF, 0.28 room-widths/s, bobbing rotation) a path through every in-room chair, pausing 0.5s at each (adds one clipboard note per chair, capped), then ceremony. Total ~5s + ceremony.
- Player press of INSPECT = same as a walk-through but skip the walk if the player has pressed it more than once in 6s (see spam). Cooldown: none (spam handled).
- Never start a visit while one is running, while a chair is being defenestrated, or during the closing ceremony. If a visit would collide, defer 3s. During the zoom-out beat visits still happen but the giant Inspector also says "FINE" (see beat 9).

### 4.2 The ceremony (about 3.5 s, `api.sfx('tick')` per tick)
1. Four mini readouts roll like slot reels with plausible numbers: Chi Flow, Conversational Geometry, Sunlight Fairness, Door Respect. They spin through random values (8.9, 3.1, 11.0, 7.5, 0.0, 14) and each lands in turn on the word "Fine". (Implementation: four spans updated every 70ms by a managed interval during the ceremony; stop and set to "Fine" at staggered times.)
2. The dial: an inline SVG half-circle. The needle swings through a dramatic 0..100 chi range, hovers, trembles, then lands on FINE (centre of the single wide wedge). Every label on the dial reads FINE. A "Not Fine" wedge is drawn but covered by a sticker reading "Not available in your region". Every 7th inspection (and only then) the sticker peels at one corner (CSS rotate) and the Inspector presses it back (line in 8.3).
3. The rubber stamp slams down (scale+rotate keyframe, rotate -8deg, distressed with a repeating-radial-gradient mask). `api.sfx('stamp')`. Screen shake of the room 2px for 180ms (not under reduced motion).
4. The sub-readout rotates through: `5/10`, `5/10, no notes`, `5.000/10, to three places, all of them five` (cycle by inspection count).
5. Award +0.5 Meh (`api.award(0.5,'inspection')`), stats `inspections` +1 and `fines` +1.

### 4.3 Stamp escalation (the verdict word never changes, the paperwork around it does)
Use by inspection count `n` (1-based); after the list ends, loop the last six:
1. `FINE`
2. `FINE (certified)`
3. `Fine, with feeling`
4. `Fine (a gentle Fine, as requested)`
5. `FINE (laminated)`
6. `Fine` in the font the Inspector says he commissioned (use `font-family: Georgia, serif; font-style: italic; letter-spacing: .15em` and a tiny caption "typeface commissioned")
7. `FINE (notarized by a duck)` 8. `FINE (triple-checked, confidence 4%)` 9. `FINE (in cursive)` 10. `FINE (fine)` 11. `FINE (laminated, again)` 12. `FINE (fine, per policy)`
Cycle >= 2 appends ` Mk II` etc. to the stamp.

### 4.4 Which verdict LINE to use (pick a category, then a shuffle-bag line, never the same twice in a row)
Compute `moved` = sum of chair displacement since last inspection (normalised) and `spread` = circular spread of chair angles.
- n==1 (the glance): `inspector.first` line.
- `moved == 0`: `inspector.nochange`.
- `moved > 1.5`: `inspector.reshuffle`.
- all in-room chairs have angles pairwise > 40 degrees apart: `inspector.chaos`.
- otherwise `inspector.verdict` bag.
- If Gerald has just left (flag `gotGeraldPause`): prefix the line with the hesitation (line `inspector.gerald`) once.
Then optionally (1 in 3) add the "other nine" or the sub-readout joke.
Sandra's sticky note shuffles on every score (CSS keyframe).

### 4.5 Spam on INSPECT
Count presses (including presses while busy) in a sliding 6s window. > 10 presses: charge the re-inspection fee (`api.award(-0.5,'re-inspection fee')`), Management line `spam.inspect`, Inspector says `Fine (Rush)` (stamp text `FINE (Rush)`), the stamp animation runs faster each press (down to 120ms), then it STICKS: a tiny maintenance sign appears on the stamp for 5s ("STAMP UNDER MAINTENANCE. BACK IN 5 (APPROX.)") and INSPECT is disabled (`aria-disabled`, and visible). Afterwards: `spam.stampfree` line. Stat `chair-rearranger.rush` +1, achievement `chair-rearranger.rush`.

---

## 5. Escalation timeline (the state machine)

Keep ONE beat clock `T` (seconds) advanced by the main tick: `T += dt * SCALE` where `SCALE = api.selftest ? 10 : 1`. T pauses while a meeting (idle) is active and during the 7.5s ceremony hold. A `beat` index is derived from T by the thresholds below; each trigger fires once per cycle using a `fired{}` set that is cleared on reset. The module must be an actual machine: `phase` in `{play, meeting, closing, fading, resetting}`.

| beat | T start | name | triggers (all fire once, at the listed T, using the lines of section 8) |
|---|---|---|---|
| 1 | 0 | THE PREMISE | 0.5 Mgmt `intro1`; 2.5 Mgmt `marguerite`; 5 Inspector glance (4.1) + `inspector.first`; 8 Mgmt `intro2` + `please` |
| 2 | 10 | THE CORE LOOP | chair speech enabled; sidle and flips enabled; auto visits start (first at T=35); first drag triggers `firstmove` stuff |
| 3 | 40 | FIRST FLIP | Mgmt `nothingstays` at 40; Pip's crush behaviour is already in the flip table; emergent. If no flip has happened by T=75, Management says `nudgeflip` and Clive's content time to flip is shortened to 2s once |
| 4 | 90 | THE FIRST RULE | 90 Sandra policy 1 (dashed band inset 0.03 around the room; chairs inside the band get a small ⚠ chip); 105 Colin lands; 110 Sandra policy 2 (a second dashed line exactly on the wall) |
| 5 | 150 | DESMOND ARRIVES | 150 Desmond drops from the top of the room (`api.sfx('honk')`), probation lines; sunbeam period 30s; 165 bagua overlay fades in (10% opacity) |
| 6 | 210 | THE WINDOW MOVES | 210 window starts to slide (20s), Mgmt `winmove1` at 212, `winmove2` at 222, `winmove3` at 232; 240 Half Chair appears; 262 Gerald arrives (cameo, 25s) |
| 7 | 300 | THE UNION | 300 `union1`; 305 consultation rule active; picket sign appears beside Chair 3 at 310 |
| 8 | 390 | THE INSPECTOR GETS INVOLVED | 390 `tug1`; first tug at 396, then every 18-30 s; 400 Sandra policy 3; 420 Dennis glance |
| 9 | 480 | THE ZOOM-OUT | 480 zoom to 0.62 over 3s; first zoom-out award +5; window-gaze mechanic live; 500 giant Inspector scores; 510 Tuesday cloud |
| 10 | 570 | THE CERTIFICATE AND THE RESET | 570 zoom back; 575 closing ceremony; ~590 hung; hold 7.5s; fade; reset at ~599 (see 10) |

Selftest scaling means the fuzz run goes through all 10 beats and the reset in about 60 seconds of virtual time, which is what we want to exercise.

### Beat details (rules that the builder must implement)

**B2 The core loop.** Every drop: +0.1 Meh (cap 1 Meh per 10s via a leaky counter), `moves` +1, a bubble from the chair's `drop` bag or the generic drop bag. A drop that moved less than 12px: award 0.3 and Management `eleven` line (once per 5 drops). Every 25th move: `moves25` line (100th: `moves100`). First move ever: achievement `first-move`, line `firstmove`.

**B3 First flip.** Roster chips visibly cycle faces. Management narrates each flip (rate limit above).

**B4 Rules.** Dashed band element (pure CSS, `pointer-events:none`) at inset 3% (that is the "7 1/2 cm") and a second solid dashed line on the wall. A chair whose `wd < 0.03` gets the ⚠ chip (policy 1) and one whose `wd > 0.005` gets the ⚠ chip for policy 2: i.e., nearly every chair shows a ⚠ almost all the time, which is the joke. Both are enforced and both are ignored by the score. Sandra's sticky note text changes per policy (8.4). Scuff count 40: `scuff40`; 120: `scuff120`.

**B5 Desmond.** Drops in from above (CSS translateY from -120%), chair "Desmond" with a paperwork 📄 chip. He is a normal chair mechanically. Probation line. Bagua overlay: an inline SVG 3x3 grid of 9 zones named (row 1) Wealth, Fame, Marriage; (row 2) Family, Health, Helpful People; (row 3) Wealth (Again), Knowledge, Career; plus a tiny tenth box in the corner labelled Misc. Opacity 0.10. Dragging a chair across a zone boundary into a new zone makes the Inspector say the zone line (Inspector text via `api.say` with `who`), rate limited to once per 8s.

**B6 Window moves.** Section 2.8. Mgmt apologises on the window's behalf. At T=240 the Half Chair appears at the bottom edge `(0.5, 0.97)`, 50% scale, unmovable. Every 45s it quietly shifts 7.5px (0.0075 room-widths, toward the window point) and a line `half.slide` is said at most once per cycle. Header counter reads `5` then `6` (Desmond) then `6 (+1/2, disputed)`. Pointer-down on it = an "attempt" (`halfattempts` stat, bubble from `half` bag, never drags); the 7th attempt triggers `half7`, the 8th attempt unlocks the achievement. Gerald (T=262): a 🥔 with a tiny nameplate appears in the doorway, walks to the Half Chair and sits on it (its sprite becomes 🥔 on the chair), says his two lines, stays 25s, then leaves in a "puff of respect" (💨 emoji, fade out). Sets flag `metGerald` = true. If `api.flag.get('metGerald')` was already true BEFORE this visit, use the "returning" first line instead of the introduction. When he leaves set `gotGeraldPause` so the next verdict hesitates.

**B7 The union.** From T=305 dragging requires consultation, pointer users only:
- Pointer down on a chair starts a ring (an SVG circle around the chair, `stroke-dashoffset` filling over 1.5s via the main tick, not CSS) and the chair stays put. If the pointer moves > 6px before 1.5s, or is released early, the consultation fails: ring resets, bubble says one of the `consult.refuse` lines, and a counter `gripFatigue` increments. If `gripFatigue >= 6` within 8 seconds, Management says `consult.fatigue` once per 30s.
- At 1.5s the chair "consents" with a grudging bubble (`consult.consent` bag) and becomes draggable for that press. `consentUntil = T_real + 6` (6 real seconds). Rotation (dblclick/wheel/turn knob) is only allowed while `T_real < consentUntil` for that chair, otherwise Management says `consult.rotate` and nothing rotates.
- Picket sign: a small sticky sign appears beside Chair 3 reading `FIX CHAIR 3 (NOT THE COASTER)`.
- Keyboard users are exempt as above. Touch long-press = consultation.
- The consultation requirement ends at the closing ceremony.

**B8 The Inspector gets involved.**
- At T=396 and every 18-30s afterwards, the Inspector picks an in-room chair that is not held, walks to it (0.35 room-widths/s), "grips" it (a little hand 🤝/✋ emoji overlay or the clipboard attached to the chair), and drags it toward a target chosen by `api.rand` (a point that is anywhere in the room at least 0.2 away) over ~4s. When done he releases it; his arrangements are also Fine. He is smug (the eyebrows note in the clipboard).
- TUG-OF-WAR: if the player presses that chair while the Inspector holds it (or the Inspector grips a chair the player is holding at the moment he arrives; skip chairs being held for simplicity, so only the first case), the chair becomes `tugged`: its position = average of the player's pointer target and the Inspector's target, plus a +-0.006 random jitter at 20Hz. The Inspector lets go after 3s of tug or when the pointer is released. Outcome: nobody wins; award +0.5 once per tug, Management `tug.end`. Keyboard users picking up that chair also trigger the jitter on their arrow moves (halved effect).
- Dennis glance: at T=420 Dennis's leaf twitches once and Management says the `dennis.glance` line.
- Sandra policy 3 at T=400.

**B9 The zoom-out (the touching beat).**
- Add class `m-chair-rearranger-zoom` to the stage wrapper: CSS `transform: scale(0.62)` with a 3s ease transition (instant under reduced motion). The stage already contains the "desk" decor around the room, drawn with divs: a wooden desk edge, a lamp (lamp stand + shade + a soft light cone), a mug made of divs, and, off to the right, a "far window" (a large CSS window with a very still cloud) and a giant 🧐 and a giant 🪴, all visible only in zoom (opacity 0 -> 1). The module root must have `overflow:hidden` and the stage wrapper must be the thing that scales (not the room), so pointer math must use fresh rects (section 2.1).
- First zoom-out: `api.award(5,'perspective')`, line `zoom.award`, stat.
- Window gaze: every tick compute `facing(chair)` for each in-room chair (angle test 2.1 toward `win`, < 25 degrees). If at least 1 chair faces the window, the window gets a soft glow (CSS class). The first time ever (per cycle) that this happens during the beat, a quiet bubble from the window says `window.thanks` (and `stat thankyous` +1, achievement `thanks`). If ALL in-room chairs face the window at once: the sunbeam turns warm gold, `api.sfx('bell')` once, a caption "(the room hums, but softer)" appears for exactly 6 seconds (real seconds), and Management says `zoom.gold`, then 6s later `zoom.goldend`. Same condition at ANY time outside beat 9 unlocks `facing` achievement (with line `facing`), once per 20s.
- T=500: the giant Inspector scores the room: a giant "FINE." bubble at his side, in a bigger font, plus Management `zoom.giant`. T=510: a cloud shaped like a Tuesday (a CSS cloud with a tiny "Tue" label on it) drifts in the far window; Management says `zoom.tuesday`. Nothing else.
- Management also says `zoom.diorama` at T=483.

**B10 The certificate and the reset.** See section 10.

---

## 6. Cast mechanics

**Colin (T=105):** a 🐦 on the window sill (a bird on the window element; follows the window when it moves). Head-tilt keyframe on every drop and on flips; an eyebrow icon 🤨 appears beside him briefly. Colin's opinion is displayed, not scored. Lines `colin` bag. At the 20th move: `colin20`. When the window moves: `colin.move`. Cycle >= 2: he wears a lanyard (🪪 emoji pinned to him), line `colin.lanyard` once. When Colin lands, Pip (if in room) flinches: a bubble `pip.bird` and a 4px shake.

**Dennis (Plant):** 🪴 at (0.93,0.88), pointer-events none, always full thriving (a tiny ✨ twitch, no mood). After each flip the leaf (a pseudo-element or tiny 🌿 span) shifts by 1px for 600ms. A chair dropped within 0.10 of Dennis triggers `dennis.space` (cooldown 30s). Management `dennis.glance` at B8.

**Sandra:** a sticky note on the west wall with 🚩 and text. Never seen. Notes shuffle (CSS wiggle) on every verdict. Policies in 8.4. Her sticky text shows the CURRENT policy only (the older ones stay in the clipboard as lines).

**Coaster (Chair 3's wobble):** a small folded-coaster div under one leg of Chair 3 (a tiny rounded square rotated 8deg behind the chair, follows it). Chair 3 does a 1-degree rock for 500ms after every drop. The coaster is draggable ONCE per cycle: dragging it detaches it and Chair 3 teeters (class), Management says `coaster.drag`; when released (or after 3s) it snaps back under the leg and Management says `coaster.back`. Coaster positioning relative to the chair: store as an offset `{x:-0.02,y:0.025}`.

**Clive and the window (running gag):** tracked via `clive.windowVisits`; third visit line; stable-discontent event; defenestration/postcard callbacks; in Cycle >= 2 his lines are replaced by the `clive.tired` bag with probability `min(1, (cycle-1)*0.35)`.

**The sock (rare):** on each pickup, `api.chance(1/40)` (if no sock currently active): a 🧦 appears at the chair's old position, then scuttles slowly (0.025 room-widths/s) toward the window point and despawns on arrival. Management says `sock.found` and later `sock.go` (once each per sock). Achievement `sock`. Stat `socks`.

**The tower (rare):** if 5 or more in-room, non-held chairs have centres within 0.04 (normalised, using `d`) of each other (checked once per second), a tower forms: a tiny 🚩 flag appears at the centroid, chairs get a wobble class, Management says `tower.up`, the next inspection's verdict is `inspector.tower` (same Fine). Breaking it (any member moving > 0.06 away) causes 3 seconds of "silence": no sfx and no bubbles for 3 real seconds, Management says `tower.down`. Achievement `tower`. Stat `towers`.

---

## 7. Idle behaviour (real seconds since last pointer/key activity; in selftest divide thresholds by 20)

- 45 s: Management `idle.45` (once per idle period).
- 90 s: THE MEETING. `phase='meeting'`. Chairs tween (1.5s) into a circle of radius 0.18 around the room centre, all facing the middle (angle toward centre), saving their old positions. For ~10 s the chairs "talk": 10 scripted exchanges (lines `meeting`, one bubble per 1.0s, cap 4 live bubbles). Beat clock paused. At the end Management says `idle.minutes` and unlocks `chair-rearranger.meeting` (stat `meetings` +1). The chairs stay in the circle until activity.
- Any activity during/after the meeting: `phase='play'`, chairs scatter back to their saved positions in 0.6s with NO sound and no bubbles, Management says `idle.back` (only if the meeting had started).
- 300 s idle: the Inspector appears sitting in Pip (🧐 overlaid at Pip's seat, tilted 12deg, no speech), Management says `idle.5min`. Any activity removes him.
- Idle reset: any `pointerdown`, `pointermove` (throttled), `keydown` on the root counts as activity.

## 8. ALL final lines (verbatim). Use via a `bag(name)` helper

Implementation of shuffle bags: `function bag(name){ ... }` keeps a shuffled copy of `L[name]` and pops; refill with `api.shuffle` when empty; never return the same string twice in a row across a refill. Use plain `{chair}` `{n}` placeholders and replace them with a local `fill(str, vars)` helper (the engine's token substitution only runs through `api.line`; do not rely on it for `{chair}`/`{n}`). Management lines go through `api.say(text,{mood,...})`; Inspector lines through `api.say(text,{who:'Inspector Pemberton-Oyelaran', mood:'smug'})`; Sandra through `who:'Sandra (Compliance)'`; Gerald `who:'Gerald'`. Chair lines go into the in-room bubble ONLY (and the live region), not `api.say`. Put 5 to 10 of the Management lines also into engine categories with `P.addLines` (see 8.20).

### 8.1 Management: intro and premise (beat 1)
- `intro1`: "Welcome to Chair Rearranger Pro. The room is currently arranged. It would like to be arranged differently, but it did not say how."
- `marguerite`: "Marguerite asked to be placed facing the corner. We are honoring her process. She has not shared her process."
- `intro2`: "Please drag the chairs to achieve the optimal arrangement. Optimal is defined by an inspector who is on his way and has no sense of urgency."
- `please`: "Please achieve the optimal arrangement."
- `afterglance`: "You have not touched anything and have already been scored. We call this efficiency."
- `firstmove`: "A chair has been moved. It was already almost fine. It is now almost fine somewhere else."
- `nothingstays`: "Please note that nothing stays solved. This is a feature. It was always a feature."
- `nudgeflip`: "Management notes that no chair has changed its mind yet. This is considered a staffing risk."

### 8.2 Inspector verdicts
- `inspector.first`: "I have assessed the room in 0.4 seconds. Fine. I will now look up, briefly, to confirm that I did not need to."
- `inspector.verdict` bag:
  - "The energy in this room flows in a manner I would describe as 'present'. Fine."
  - "I have moved nothing and measured everything. Fine."
  - "I score on a scale of one to ten. I have never needed the other nine."
  - "Fine is not a compliment. Fine is not an insult. Fine is a load-bearing word."
  - "I have consulted my instruments. My instruments have consulted each other. Fine."
  - "Chi was detected. Chi was asked to leave. Chi has left. Fine."
  - "I note a chair facing a wall. I note it with respect. Fine."
  - "The room has a certain something. I have written 'something'. Fine."
  - "Sunlight, 7. Door, 4. Window, 'yes'. Overall: Fine."
  - "I would like it on record that I tried to find fault. The fault is in my instruments. Fine."
- `inspector.reshuffle`: "A bold rearrangement. Chi has been redistributed from nowhere to nowhere in equal measure. Fine."
- `inspector.nochange`: "You have changed nothing. The room appreciates the stability. Fine."
- `inspector.chaos`: "Every chair faces a different wall and the room is somehow still Fine. I checked twice. I checked once more."
- `inspector.tower`: "A tower. The same rating. Fine. I would like it noted that I looked up."
- `inspector.gerald`: "Fine. (I paused. I would like it noted that nobody saw me pause.)"
- `inspector.nine` (the sticker peel): "The 'Not Fine' sticker has lifted at one corner. He presses it back down. 'I have never needed the other nine.'"
- `inspector.arrive`: "The Inspector has arrived. He was not asked. He was, however, expected."
- Sub-readouts (cycle by inspection count): "5/10" , "5/10, no notes", "5.000/10, to three places, all of them five".
- Sandra's callback when she reviews: `sandra.review`: "Sandra says 'Fine is under review'. The review came back Fine."

### 8.3 Inspector clipboard notes (cap 12 lines; add one per chair pause, per verdict and per event)
- "Note: chair."
- "Note: another chair."
- "Note: the window (present)."
- "Note: Clive. See previous note about Clive."
- "Note: floor (scuffed, but with character)."
- "Note: nobody has asked me how I am."
- "Note: Desmond. Stool? Chair? Fine."
- "Note: pigeon. Out of scope. Fine."
- "Note: Sandra's note moved. Did not see it move."
- "Note: lunch is at 12:07. I have never seen 12:07."
- "Note: a sock. Not mine."
- "Note: I have written 'fine' 5 times. No further notes."
- "Note: eyebrows, deployed." (used by tug)
- "Note: Dennis (Plant). Not scored. Thriving."

### 8.4 Sandra from Compliance (sticky note text and Management lines)
- `sandra.p1`: "Sandra from Compliance has flagged the room. Policy 1: chairs must stand 7 1/2 centimetres from the wall."
- `sandra.p1.note`: "POLICY 1: chairs 7 1/2 cm FROM wall. -S."
- `sandra.p2`: "Sandra reminds you that chairs must also touch the wall. Policy 1 stands. Both are enforced."
- `sandra.p2.note`: "POLICY 2: chairs must TOUCH wall. (see Policy 1) -S."
- `sandra.both`: "Both policies are enforced and both are ignored by the score. The score is Fine. The score is under review."
- `sandra.p3`: "Sandra has issued Policy 3: chairs may not face the window except in emergencies, which are defined as when they do."
- `sandra.p3.note`: "POLICY 3: do not face window (unless emergency). -S."
- `sandra.contra`: "Per Sandra: chairs must face the window. Also per Sandra: chairs must not face the window. Both are enforced."
- `sandra.flag`: "Sandra from Compliance has flagged Chair 3 for 'sitting-adjacent behaviour'. She did not elaborate. She never elaborates."
- `sandra.warn` (tooltip on the ⚠ chip): "Warning: Policy 1. Also Policy 2."

### 8.5 Chairs: pickup, drop, rotate, pat, ask (bubbles)
Generic drop bag (`drop.generic`):
- "Thunk. That was my whole emotion."
- "Noted."
- "I have been to spots. This is one."
- "Creak. (Yes. Or my back.)"
- "A bold place to put me. I will not say it was wrong."
- "Excuse me. I had that square. I had it for several minutes."
- "Placed. I will be here. Unless I am not."
- "That is a floor. I am on it. Thank you for the update."
Generic pickup bag (`pickup.generic`): "Up. Fine." / "Unannounced, but fine." / "I was just getting comfortable with the floor." / "Weightless. Briefly. Do not drop me." / "Is this a promotion."
Generic rotate bag (`rotate.generic`): "I can see the wall. It has a nice texture." / "Now I face the corner. This is somehow worse and exactly right." / "A new angle. The old angle did not mind. I do." / "Facing the window now. No pressure. Some pressure." / "I am facing something. It will do."
Management rotate (once per 4 rotations): "Rotated 45 degrees. The chair now faces the filing cabinet, which has not faced anything since 2011."
Ask lines (long-press before beat 7, roster click): per chair want, e.g. Clive "I want the window. Nearer." etc. Use the specific chair `ask` bags below.

### 8.6 Clive (window lover)
- `clive.pickup`: "Nearer the window. No further. Nearer than that." / "Where I am now is fine. Nearer." / "Yes. Go on. I will tell you when. I will not tell you when."
- `clive.near` (content at the window): "I can see the car park. A man is walking to it. This is everything I hoped for." / "The window is exactly as advertised. I had not prepared for that." / "Do not move me. Do not leave me. Do not look at me."
- `clive.flip`: "Having it is not what I imagined. I would now like to be by the door." / "I have had the window. The window has had me. I would like to be by the door."
- `clive.third`: "This is the third time I have been here. It is always the same car park."
- `clive.door` (content at the door): "The door. Of course. It was always the door. Do you have the window?"
- `clive.drop`: "Placed. I was hoping for 'placed nearer'." / "A chair is a statement. Mine is 'nearer'."
- `clive.pat`: "That was nice. Could it have been nearer the window."
- `clive.stable`: "This is the worst and I cannot leave it."
- `clive.tired` (cycle >= 2): "Nearer. (I have said this before. I have said this in a previous version.)" / "I remember nothing and I am tired anyway." / "Nearer. I mean it slightly less than last time."
- `clive.ask`: "I want the window. I will tell you when I have it. I will not tell you what I want after that."
- Management flip: `flip.clive`: "Clive has achieved window proximity and is now experiencing 'having it'. This is going poorly."

### 8.7 Brenda (window averse)
- `brenda.pickup`: "The sun has been on my left arm since March. I have not complained. I am complaining now."
- `brenda.beam`: "Is that a beam. That is a beam. It is on me. I am saying nothing at volume."
- `brenda.near` (content in shade): "Shade. Lovely. I could weep. I will not. I am upholstery, we do not."
- `brenda.flip`: "I have acclimatised to shade and I find I miss the sun. Please do not tell the sun."
- `brenda.drop`: "Placed. Away from the glare, I hope. Ahead of schedule, I fear."
- `brenda.pat`: "Careful. Left arm."
- `brenda.ask`: "I would like to be out of the sun. The sun has been informed. The sun does not read."
- Management flip: `flip.brenda`: "Brenda has acclimatised to shade and now wants sun. Please remember her as she was, which was last Tuesday."

### 8.8 Pip (dim corner, then Clive)
- `pip.pickup`: "I was not built for glare. I was built for a dim, supportive corner and a person with a long meeting."
- `pip.near` (content in corner): "A corner. Thank you. I will be so quiet about how happy I am."
- `pip.flip`: "I have been in this corner for a while and I have started to want to be near Clive. It is not a decision. It is geography."
- `pip.crush`: "I am only near Clive because it is on the way to somewhere. Where is not specified."
- `pip.bird`: "Is that a bird. It is a bird. I was not built for birds either."
- `pip.pat`: "I have not been patted since the warranty period. Please do not stop. Please do not mention it."
- `pip.ask`: "A dim corner, please. Dim. Supportive. Only slightly damp."
- Management pat for Pip: `pat.pip`: "You patted Pip. Pip has not been patted since the warranty period. Pip's confidence is up 3 percent."
- Management flip: `flip.pip`: "Pip has moved from wanting a corner to wanting Clive. Management considers this progress. Pip considers it weather."

### 8.9 Marguerite (folding, dramatic)
- `marg.pickup`: "I fold under pressure. This is not pressure. I am folding on principle."
- `marg.ask`: "The centre of the room, please. I will be fine at the edge. I will be dramatically fine."
- `marg.near` (content at centre): "Yes. This. Look at me. No, not like that. Yes, like that."
- `marg.flip`: "I have had the centre and I find it very exposed. I would like a wall to lean on. Dramatically."
- `marg.drop`: "I am down. I am on the floor, spiritually. Physically I am here."
- `marg.pat`: "I accept this. I accept it for the record."

### 8.10 Chair 3 (wobble, coaster)
- `c3.pickup`: "I am level in spirit."
- `c3.ask`: "A wall. Something to lean on. I have been leaning on a coaster since 2019 and it is not a wall."
- `c3.coaster`: "Do not look at the coaster. The coaster has been through a lot."
- `c3.near` (content at a wall): "A wall. It does not judge. It is exactly as flat as me."
- `c3.flip`: "I have leaned on the wall and the wall has started leaning on me. I would like to be near Brenda."
- `c3.pat`: "I rocked. It was a good rock. I was level for a second."
- Management: `c3.wobble`: "Chair 3 has a wobble. A folded coaster has been under it since 2019. The coaster is exhausted."
- `coaster.drag`: "The coaster has been moved. Chair 3 is teetering. Please put it back. Everyone is relying on it."
- `coaster.back`: "The coaster has been returned. Chair 3 exhales. It is still crooked."

### 8.11 Desmond (stool)
- `desmond.arrive`: "A stool has dropped in from the ceiling and is claiming to be a chair. He has paperwork."
- `desmond.probation`: "Desmond has been admitted as a chair on a probationary basis. The probation is a stool-shaped formality."
- `desmond.papers`: "Desmond's paperwork lists 'height: adjustable, spiritually'. Sandra has initialled it from a distance."
- `desmond.pickup`: "I am a chair. The paperwork says stool. The paperwork has been wrong before."
- `desmond.ask`: "I have no back. I have a great deal of posture. I would like the window."
- `desmond.flip`: "I have been admitted and I find I want to leave. This is how probation feels."
- `desmond.near`: "A stool at a window. I have waited for this. I have no back and I do not need one."

### 8.12 Management flip narration (`flip` bag; {chair})
- "{chair} has achieved the thing it wanted and is now experiencing 'having it'. This is going poorly."
- "{chair} has acclimatised. Please remember it as it was, which was four seconds ago."
- "Staffing update: {chair} has changed its mind. HR has been told. HR said 'noted' and then 'oh'."
- "{chair} now wants the opposite. The opposite was available the whole time."
- "{chair} has submitted a change of preference in the form of a sigh. The sigh has been filed."
- "Management notes that {chair} was happy for exactly 4 seconds. It was a good 4 seconds."
- (Prefer `flip.clive`, `flip.brenda`, `flip.pip` for those chairs.)

### 8.13 Milestones and awards
- `moves25`: "You have moved a chair 25 times. Each move was recorded by someone, somewhere, in pencil."
- `moves100`: "100 moves. The pencil has been replaced. The new pencil has been briefed."
- `eleven`: "You have been awarded 0.3 Meh for moving a chair eleven pixels. The Meh was not consulted."
- `scuff40`: "The floor now bears 40 scuff marks. Facilities has called them 'a signature' and asked that it stop."
- `scuff120`: "The floor now bears 120 scuff marks. Facilities has stopped asking and started framing."
- `pat` bag (Management; {chair}): "You have patted {chair}. {chair} pretends not to notice. {chair} noticed." / "Patted. {chair}'s confidence is up 3 percent. It is not a measured number. It is a felt one." / "{chair} accepts the pat. It is the first pat of its career and it will remember." / "Pat recorded. {chair} has asked that it be recorded twice."
- `pat.spam`: "You have patted that chair 8 times in 4 seconds. It has been patted into a kind of confusion. It is pleased in a general way."
- `facing`: "Every chair is facing the window. Please hold this arrangement. It will last as long as it lasts."
- `stand` (use sparingly, max 3 per cycle, after a happy moment such as 3+ chairs content): "Optimal arrangement achieved for 0.3 seconds. Stand by." then later "Stand down." then "Stand over there."
- `tip` (rotate in the module header or after 60s idle... also register as engine `tip` lines): "Tip: there is no correct arrangement, only the one you are in. Sandra says the one you are in is incorrect." / "Tip: chairs can be patted. They will not say they liked it." / "Tip: the Inspector can be called with I. He is already on his way."

### 8.14 Colin (pigeon)
- `colin.land`: "A pigeon named Colin has landed on the sill. Colin has an opinion. Colin keeps it."
- `colin` bag: "Colin has tilted his head by 4 degrees. Management does not know what that means. Management has written it down." / "Pigeon Colin's opinion is not scored. It is, however, logged. Per Colin." / "Colin has looked at the chairs. Colin has looked at the window. Colin has looked at you. The order was deliberate."
- `colin20`: "Colin watches you move the chairs the way one watches weather arrange itself."
- `colin.move`: "Colin has moved with the window. Colin has always been where the window is. This is not loyalty. It is rent."
- `colin.lanyard`: "Colin has been issued a lanyard. He is now Window Compliance. He has not been briefed. He has been pigeon."

### 8.15 Half chair, Gerald
- `half.up`: "A small chair has appeared at the bottom edge. It is half a chair tall and cannot be moved. We will not be discussing it."
- `half.count`: "Please do not count the chairs. We have counted. It has always been a number and a half."
- `half` (bubble bag, on attempt): "I was here before the room. I will be here after the window." / "I am not for moving. I am for noticing." / "Seven. Eight. You are almost at seven and a half."
- `half7`: "That is 7 attempts. The chair would like you to know it felt all 7. And a half."
- `half.slide`: "The half chair has moved 7 1/2 pixels. Nobody saw it. That is how it is done."
- Header counter text: `5`, `6`, `6 (+1/2, disputed)`.
- `gerald.arrive`: "Gerald, Vice President of Spuds, has requested a seat. Gerald is a potato. The seat has gone very quiet out of respect."
- `gerald.intro` (first time): "I am Gerald. I am a potato. I am here about the seating."
- `gerald.again` (flag already true): "We meet again, in a chair this time."
- `gerald.ask`: "May I have the chair that is not a chair?"
- `gerald.seated`: "This is the correct size for governance."
- `gerald.profound`: "A chair is only a floor that has decided to rise. Sit with that. I cannot. I am a potato."
- `gerald.leave`: "Gerald has left in a puff of respect."

### 8.16 Window moves, gaze, zoom-out
- `winmove1`: "The window has relocated to the east wall. It did not announce this. It simply preferred it there."
- `winmove2`: "Management would like to clarify that windows do not usually move. This one is going through something."
- `winmove3`: "The window has continued to the south wall. The chairs have been asked to adjust. The chairs have asked the window to stop."
- `winmove.sorry`: "Management apologises on the window's behalf. The window did not authorise this apology."
- `winmove.settle`: "The window has settled on the south wall. It says this is where it was always going. It was not."
- `window.never` (window button pressed, never faced): "The window has never been faced directly. It says it does not mind. It minds a little."
- `window.thanks` (bubble from the window): "Thank you for looking."
- `window.thanks2`: "Thank you for looking. I know it is only a chair. It is the best chair I have ever been looked at by."
- `zoom.diorama`: "The room has been zoomed out. It is a diorama. It sits inside a larger room. That room is also Fine."
- `zoom.award`: "A first zoom-out has been recorded. 5 Meh has been awarded for perspective, which is not available in stores."
- `zoom.giant`: "The larger room has a larger Inspector. He has said 'Fine' in a bigger voice."
- `zoom.giantsay`: "FINE."
- `zoom.lonely`: "The giant window beyond the diorama window is lonely. It has asked nobody anything."
- `zoom.gold`: "Every chair is facing the window. The sunbeam has gone gold. Management is not scoring this. Management would like a moment."
- `zoom.goldend`: "Management has had the moment. We are scoring again. It is Fine."
- `zoom.tuesday`: "Through the far window, a cloud shaped like a Tuesday has been noted. Please do not make eye contact."
- `zoom.caption`: "(the room hums, but softer)"

### 8.17 Union and consultation
- `union1`: "The chairs have formed a union. Demands: lumbar respect, a view, and to be called 'seating professionals'."
- `union2`: "Chairs now require consultation before relocation. Please hold the chair for 1.5 seconds and say nothing, which is how consultation works."
- `consult.refuse` bag (bubble): "You did not wait. Consultation is the waiting." / "That was a squeeze. I need a hold." / "I felt that. It does not count."
- `consult.consent` bag (bubble): "Fine." / "...fine." / "Fine. Note that I said it." / "Consulted. Proceed. Gently."
- `consult.rotate`: "Rotation requires a second consent. Please hold again. The chair has been told you will be gentle."
- `consult.fatigue`: "Management notes grip fatigue. The chair notes it too, with a sigh that has seniority."
- `consult.silent` (live region only): "Consultation conducted silently, as is traditional."
- `picket`: "A tiny picket sign has appeared beside Chair 3. It reads 'FIX CHAIR 3 (NOT THE COASTER)'. The coaster has asked to be left out of this."
- `picket.text` (the sign itself): "FIX CHAIR 3 (NOT THE COASTER)"
- `union.stapler`: "The Stapler has been asked to mediate. The Stapler said 'not my union' and then 'but I see them'."

### 8.18 Tug of war and Dennis
- `tug1`: "The Inspector has begun moving chairs himself. His arrangement is also Fine. He is quiet about it, mostly with his eyebrows."
- `tug.say` (Inspector): "Kindly release {chair}. We are conducting a fine arrangement here."
- `tug.mgmt`: "Both parties are holding {chair}. {chair} is being held by two parties and is, as a result, vibrating."
- `tug.end`: "Nobody won {chair}. {chair} has noted this."
- `tug.smug`: "The Inspector's eyebrows say 'Fine'. They said it first."
- `dennis.glance`: "Dennis (Plant) has watched the arrangement from the corner. One leaf has moved by a centimetre. This is critique."
- `dennis.space`: "Dennis has asked for space. Dennis is a plant. Dennis has not moved. Dennis asks again by not moving."

### 8.19 Bagua zone lines (Inspector, one per zone; rate limit 1 per 8s)
- Wealth: "Wealth. The chair has entered Wealth. It has not been enriched. The zone is noting this."
- Fame: "Fame. Nobody has noticed. That is also a kind of Fame."
- Marriage: "Marriage. I will not comment. I will only say the chairs are very close and have not discussed it."
- Family: "Family. The chair is now family. The family has not been told."
- Health: "Health. The chair is well. I checked. It is wood."
- Helpful People: "Helpful People. None present. The zone considers this honest."
- Wealth (Again): "Wealth (Again). Same zone, second attempt. It has not improved."
- Knowledge: "Knowledge. The chair now knows nothing in a more informed way."
- Career: "Career. The chair has been placed in Career. It has no questions. It has many opinions about the window."
- Misc: "Misc. A zone for things that did not fit. I felt this one was for me."
- `bagua.up`: "A bagua has been laid on the floor. It has nine zones and a tenth labelled 'Misc'. Please do not ask which is which."

### 8.20 Secret and rare events
- Meeting (`meeting` lines in order; bubbles from the named chair, Desmond's line only if present): Clive "Item one: the window." / Brenda "Item two: also the window." / Pip "Item three: Clive." / Marguerite "I move that we be dramatic." / Chair 3 "Seconded. I wobble in favour." / Clive "All in favour of the window?" / Brenda "Opposed. And in favour. Both." / Pip "Noted." / Marguerite "The motion carries. Nothing has changed." / Chair 3 "Meeting adjourned. Mostly sideways." / Desmond "I would like it minuted that I attended."
- `idle.45`: "Hello? The chairs are wondering whether you have left. They have never been left before. They have been sat on, which is different."
- `idle.minutes`: "The chairs held a meeting while you were away. Minutes: none. Attendance: all. Outcome: 'We are fine.'"
- `idle.back`: "The chairs have returned to their positions with no sound. There was no meeting. It went very well."
- `idle.5min`: "You have been absent for 5 minutes. The Inspector has sat down in Pip and is quietly enjoying the angle. Please do not tell Pip."
- `spam.inspect`: "That is {n} inspections in 6 seconds. A re-inspection fee of 0.5 Meh has been applied and the Inspector has been informed he is popular."
- `spam.rush` (Inspector): "Fine (Rush)."
- `spam.stuck`: "The stamp has stuck. A man has been sent. The man is a sign."
- `spam.sign`: "STAMP UNDER MAINTENANCE. BACK IN 5 (APPROX.)"
- `spam.stampfree`: "The stamp has been freed. It says Fine. It has always said Fine. It was just stuck saying it."
- Shake nausea (`dizzy` bag; Management; {chair}): "{chair} was shaken at speed and now requires a moment, a glass of water, and a very flat floor." / "Shaking is not a form of arrangement. It is a form of weather." ; chair bubble `dizzy.say`: "Water. Please. Flat floor. Water."
- `dizzy.refuse` (bubble when dragged while dizzy): "No. Water first."
- Defenestration: `def.out`: "{chair} has gone out of the window. The window was closed. Management cannot explain this and has stopped trying." / `def.full`: "The window is at capacity. It has never been at capacity before. It is thrilled." / `def.back`: "{chair} has returned from outside with a tan and a postcard. It will not say where it has been. It says 'around'." / `def.count`: "Defenestrations: {n}. The window has been asked how it feels. It has said 'closed'."
- Postcards (cycle, cap history 6; show in a small card near the returning chair for 6 seconds and in the clipboard as a note): "Wish you were nearer." / "Wish you were here. I am here. It was fine." / "Weather: car park. Food: none. Chairs: few." / "Having a lovely time. The car park is smaller than it looks." / "Do not worry. I have met a bench. He has views." / "Day 20. Still outside. Still fine. Please send a cushion."
- `sock.found`: "A single sock was found beneath {chair}. It is looking for something. It will not say what."
- `sock.go`: "The sock has set off toward the window. It has a long way to go and no shoes."
- `tower.up`: "Five chairs have been stacked in one place. This is not an arrangement. It is a sculpture. It is Fine."
- `tower.down`: "The tower has come down. Please observe a moment of silence. It will last 3 seconds. It has begun."
- `half.secret` (shown when the half chair achievement unlocks): "You have attempted a chair 7 and a half times. The chair has not been moved. The attempts have been noted."

### 8.21 Selecting and ask
- Roster/selection Management line (`select`): "Selected: {chair}. {chair} wants {want}. {chair} will not say why." where `{want}` is: window "the window", shade "to be out of the sun", door "the door", corner "a dim corner", center "the middle of the room, with an audience", wall "a wall to lean on", near "to be near {X}".

### 8.22 Ending (see section 10)
- `end.ceremony`: "Closing Ceremony. Please stand. The chairs cannot. We will count it."
- `end.thanks`: "Thank you to Clive, Brenda, Pip, Marguerite, Chair 3 and Desmond for their service. Colin has been thanked separately."
- `end.score`: "Final score: Fine."
- `end.read1` (Inspector): "I, the undersigned, certify that this room has been arranged. In what manner is not specified. The arrangement is FINE."
- `end.read2` (Inspector): "Signed, Inspector Pemberton-Oyelaran, Bureau of Auspicious Arrangement. Witnessed by a plant."
- `end.hung`: "Certificate of Fine Arrangement issued. It has been framed and hung where the window was. The window is not upset. It is behind the frame, being fine."
- `end.coaster`: "The coaster has been framed separately. It is Employee of the Month. It does not know."
- `end.noach`: "The achievement for finishing does not exist. We checked. We also checked whether we had checked."
- `end.reset`: "The room has been returned to its original arrangement. We have no record of anything that occurred. Welcome. Please begin."
- `end.mk`: "All numbers have been updated to {mk}. This is a coincidence."
- `end.clive`: (bubble from Clive after reset) "Nearer."

### 8.23 Engine categories to ALSO register via `P.addLines` (so the Lobby uses them)
- `moduleEnter`: "Chair Rearranger Pro. Please arrange. The chairs have already begun to disagree."
- `moduleExit`: "You have left the room unarranged. The room says it was arranged. It always says that."
- `tip`: the three tips above.
- `ticker`: "BREAKING: Chair near window 'would prefer to be near door', sources confirm." / "Inspector issues score of Fine. Sources: Fine." / "Chair rearranged 40 times 'for reasons it did not share'. Facilities declines to comment."
- `award`: "You have been awarded {meh} Meh for placing a chair. The chair would like it noted that it was already there, spiritually."

---

## 9. Achievements (all ids prefixed `chair-rearranger.`; declare with `P.addAchievements`; unlock via `api.achieve`)

| id | name | desc | icon | secret | reward |
|---|---|---|---|---|---|
| chair-rearranger.first-move | Grand Marshal of the Slight Repositioning | Move a chair for the first time. It was already almost fine. | 🪑 | no | 1 |
| chair-rearranger.unvarying | Laureate of the Unvarying Verdict | Receive the verdict Fine 10 times. Every person who has ever played has also done this. | 🧐 | no | 3 |
| chair-rearranger.facing | Archduke of Facing the Window | Get every chair to face the window at once, for exactly as long as it takes them to change their minds. | 🪟 | no | 5 |
| chair-rearranger.pats | Sovereign Listener of Furniture | Pat chairs 20 times. They noticed. They are not saying. | 🖐️ | no | 3 |
| chair-rearranger.meeting | Keeper of the Quiet Chair Meeting | Idle for 90 seconds and overhear the chairs holding a meeting without you. Minutes: none. | 🪑 | yes | 4 |
| chair-rearranger.defenestrated | Defenestrator Emeritus of Seating, No Harm Done | Send a chair through the window. It came back with a tan and has not been the same since, in a good way. | 🕶️ | yes | 6 |
| chair-rearranger.tower | Master Builder of the Sculpture That Is Not an Arrangement | Stack five chairs in one place. The Inspector looked up. | 🚩 | yes | 4 |
| chair-rearranger.half | Fellow of the Royal Institute of Almost Counting Chairs | Attempt to drag the half chair 8 times. It was unmoved, in the manner of a chair. | ½ | yes | 4 |
| chair-rearranger.stable | Warden of Stable Discontent | Place Clive exactly halfway between window and door and leave him there. | 😐 | yes | 3 |
| chair-rearranger.rush | Tolerated Customer of the Rush Inspection | Press INSPECT until the stamp sticks. A man was sent. The man is a sign. | 🛠️ | yes | 2 |
| chair-rearranger.thanks | Honorary Friend of Windows | Face a chair at the window. It said something. It will not say it twice. | 🌤️ | yes | 3 |
| chair-rearranger.sock | Honorary Liaison to the Missing Sock | Find the sock beneath a chair. It is on a journey. You are not invited. | 🧦 | yes | 3 |

There is deliberately NO achievement for finishing a loop. Management says so (`end.noach`).

Stats (all prefixed): `chair-rearranger.moves`, `.inspections`, `.fines`, `.flips`, `.pats`, `.scuffs`, `.windowtrips`, `.defenestrations`, `.meetings`, `.towers`, `.socks`, `.cycles`, `.halfattempts`, `.rush`, `.thankyous`. Use `api.stat.inc` at the action. Use manual `api.achieve` (do not rely on `check` callbacks; they are optional here).

Awards summary (all via `api.award`): +0.1 per drop (cap 1 Meh/10s), +0.3 for tiny moves, +0.5 per inspection, +1 per flip (rate-limited 1 per 3s), +0.5 per tug, +5 first zoom-out per run, +7.5 at the Closing Ceremony, -0.5 for rush fee. Keep every award tiny. Call `api.say` at least every ~15s of active play (the escalation and flip lines cover it).

---

## 10. The not-ending (beat 10, T 570 onward)

1. T=570: scale back to 1 (2s). Consultation requirement ends. Auto visits stop. `phase='closing'`.
2. T=575: Management `end.ceremony`, `api.sfx('fanfare')`, `api.confetti`. The Inspector walks to the room centre carrying a Certificate (an SVG: cream paper, gold seal made of nested circles, the word FINE in embossed letters (text-shadow highlights and dark offset) and the small print "CERTIFICATE OF FINE ARRANGEMENT", "This certifies that a room was arranged."). If a postcard exists it is propped on the frame's corner later. He reads it aloud as `end.read1` then `end.read2` (3s apart). Management `end.thanks` then `end.score` (3s apart).
3. T~590: the certificate is framed and "hung" where the window currently is (it slides over the window sprite; window sprite stays behind it, dimmed). Management `end.hung`. The coaster is shown in a tiny frame on the wall (`end.coaster`) with a plate "Employee of the Month". If the player ever defenestrated a chair, its last postcard is propped on the frame.
4. The screen HOLDS on the finished room for EXACTLY 7.5 seconds (real seconds, `phase='closing'`; selftest: 0.75 s). Chairs do not sidle during the hold. `api.award(7.5,'closing ceremony')`.
5. `phase='fading'`: a full-room overlay fades to cream over 1s (reduced motion: instant).
6. `phase='resetting'` (while fully opaque): reset EVERYTHING to the start state: chair positions and angles, wants, content timers, `out` flags, tan flags, Desmond removed (hidden and chip removed), rules/bagua/picket/Colin/sock/tower/Half Chair state cleared, window back to north centre, beam period 90s, zoom class removed, T=0, `fired={}`, `cycle++`, stat `cycles` +1, scuff canvas cleared, bubbles and clipboard cleared, coaster re-attached, Inspector removed. Keep: achievements, stats, Meh, `metGerald`, the Half Chair's cycle growth (it reappears at T=240 as usual but at scale `0.5 * 1.075^(cycle-1)`, the "7 1/2 percent bigger" gag). Keep `clive.windowVisits` reset to 0.
7. Fade the overlay out (1s). Management `end.reset`, then 2s later `end.mk` with `mk` = ` Mk II` / ` Mk III` ... (roman up to X, then `Mk 11`...). Clive says `end.clive` ("Nearer."). From now on the title bar via `api.setTitle`, the header, the dial, the stamp and the clipboard heading carry the Mk suffix. Each cycle Clive becomes more tired (section 6). `end.noach` after 6s.
8. The game then continues exactly as minute zero. Nothing is won. Nothing is lost.

---

## 11. Visual design

Palette (tokens in CSS vars on the card root, prefix every class `m-chair-rearranger-`): cream paper `#FFF6E0` card background with a dotted texture (`radial-gradient` dots), ink `#2B2A33` for every 3px outline and text, mint `#8FD9B6`, coral `#FF8A7A`, mustard `#F2C14E`, lilac `#B8A1E3`. Sticker shadows: `box-shadow: 4px 4px 0 #2B2A33`. System rounded fonts only.

Layout (desktop >= 900px): header strip on top (module title "Chair Rearranger Pro" plus Mk suffix, the chair counter "Chairs: 5", and a mood legend of the six faces `😣 😕 😐 🙂 😊 🥹`); below, a 2-column grid: LEFT the stage/room (aspect 4:3, thick outline), RIGHT the sidebar with the Chi Dial (SVG half-circle with the needle and the wedge that covers everything, sub-readout under it), the four category readouts, and the clipboard card (running notes, capped 12). Below the grid: the roster strip and the INSPECT button. Under 700px: single column; the clipboard goes under the room; the roster becomes a horizontal scrolling strip; the dial stays above the clipboard.

The Room: floor = muted mustard-tan with `repeating-linear-gradient` plank lines, a darker thick wall edge (box-shadow inset). A rug (mint rounded rectangle, low contrast) near the middle. Window: CSS rectangle on the wall with panes (cross bars), curtains (two lilac side boxes), a sill; a tiny car park through it (3 small coloured boxes), and a still tree emoji. Door: a small rectangle bottom-left with "EXIT (DECORATIVE)" in a title attribute. Dennis: 🪴 in the corner with a leaf span that twitches 1px. Sandra's sticky note: yellow square with a folded corner, 🚩, 9px text, wiggles on score.

Chairs: built from divs: a rounded square seat (the tint), a back bar along one edge (darker tint, 3px outline), four small leg dots at the corners (ink dots), an emoji face centred on the seat (`font-size: calc(var(--u)*5)`), a soft shadow ellipse beneath (offset grows when lifted), a coloured cushion tint per personality. Squash-and-stretch on drop, 1-degree rock for Chair 3, a fold-out animation for Marguerite (scaleY 0.85 tilt for 300ms on pickup), round stool shape for Desmond (no back bar). Thought bubble: absolutely positioned pill with an SVG tail, max 4 alive, each fades after ~2.8s, `aria-hidden`. Mood bars in the roster are tiny rounded bars; rolling face chips use a CSS transition.

Sunbeam: a clip-path polygon, `rgba(255,244,200,.45)`, `mix-blend-mode: normal` (no blend modes). Shade overlay: lilac `rgba(184,161,227,.18)`. Gold mode: `rgba(255,214,102,.55)`.

Scuffs: a single `<canvas>` under the chairs (`pointer-events:none`) sized to the room's pixel size (re-sync size on resize, redraw from the point list). Store scuffs as a ring buffer of up to 600 normalised points. Draw as small dark-tan short strokes at 0.35 alpha.

Zoom stage: the stage wrapper holds the desk: a wooden desk edge band along the bottom, a lamp with a soft light cone, a mug made of two divs, a giant 🧐 (font-size ~ 5x), a giant 🪴, a large far window with a still cloud; they are `opacity:0` and revealed (transition) when `m-chair-rearranger-zoom` is on.

Inspector: a 🧐 emoji `font-size: calc(var(--u)*6)` with a CSS clipboard (div, white with lined paper bg) attached via an absolutely-positioned sibling and a bobbing rotation while walking. Stamp: bordered text with text-shadow and the distress mask. Certificate: inline SVG.

Reduced motion (`matchMedia('(prefers-reduced-motion: reduce)')` read inside try/catch at mount and on change): disable throw slide, zoom tween, sidle wobble and squeaks, stamp shake, window slide (instant), fades become instant.

## 12. Implementation hints

Structure of the file (suggested order, ~1500 lines, leave headroom):
1. `P.injectCSS` (one template literal), `P.addAchievements`, `P.addLines` (engine categories), the `L` object of lines, helper functions (`clamp`, `d`, `fill`, `bag`, roman numerals).
2. `registerModule({... mount(root, api) { ... return {destroy}; }})`.
3. Inside mount: state object `S` (chairs array, props, T, cycle, phase, counters), `build()` DOM once, `bindEvents()` through `api.on`, `tick(dt)` called from ONE `api.requestAnimationFrame` loop (re-registering itself; clamp dt to <= 0.1; use `api.now()` for dt). Do not create per-chair intervals.
4. Systems called by `tick`: `updateIdle`, `updateBeats(T)`, `updateMood`, `updateSidle`, `updateFlips`, `updateInspector`, `updateTug`, `updateWindow`, `updateBeam` (10fps), `updateSpecials` (tower/stable/sock/gaze once per second), `render` (writes style only when changed).
5. Ceremony sequences (dial, stamp, readouts) driven by a small timeline object advanced inside `tick` (no `setTimeout` chains), so reset/destroy cancels everything simply by clearing the timeline list. Use `api.setTimeout` ONLY for tiny cosmetic fades.
6. An `epoch` integer incremented on reset; every deferred callback captures `epoch` and bails if it changed.
7. Guards: `safe(fn)` wrapper for event handlers (try/catch, swallow after a single `console.warn`-free fallback; do NOT call `console.error`).
8. `destroy()`: nothing special if every timer/listener went through `api`; also cancel the live region and any `matchMedia` listener (register it via `api.on(mql,'change',...)`).
9. DOM caps: bubbles 4, clipboard 12 lines, postcards 6, scuff points 600, confetti via engine, floating text via engine.
10. Selftest friendliness: `SCALE = api.selftest ? 10 : 1` for the beat clock; idle thresholds divided by 20 in selftest; the closing hold 0.75s. The fuzz harness presses everything, so keep INSPECT, chips and chairs as real buttons and make sure it can never throw on weird sequences (pointerup without pointerdown, double pointerdown, keyboard on a held chair, etc.).
11. All text rendered must never be `undefined`/`NaN`: always `fill(str, vars)` with defaults, always `Number.isFinite` before writing styles (a helper `px(n)` that returns 0 for non-finite).
12. Management `api.say` calls: rate-limit with `sayGate(minGapMs)` to avoid flooding the engine's queue; use `priority:1` for beat triggers and `priority:0` for flip/pat chatter.
13. Seeded RNG: use `api.rand/randInt/pick/chance/shuffle` only (never `Math.random`), so seeded runs reproduce.
14. First paint must contain the premise: room, 5 chairs, window, Dennis, INSPECT button, roster, dial reading "FINE" (needle resting at the centre).
15. Chair `wants` text for aria-label: window "the window", shade "the shade", door "the door", corner "a dim corner", center "centre stage", wall "a wall", near "{X}".
16. Scores for towers use `d()` on normalised coordinates and exclude `out`, held and Half Chair entities.
17. Sunbeam polygon points (normalised, rendered as percentages): `A = win + tangent*(-0.11)`, `B = win + tangent*(0.11)`, `C = B + dir*0.9 + tangent*0.14`, `D = A + dir*0.9 - tangent*0.14`, where `dir` is the rotated inward normal and `tangent` is perpendicular. Compute in plain room-width units then convert y by `/0.75` for percentage output (the room is 4:3) so the beam is not distorted.

## 13. Risks: the 5 most likely implementation bugs

1. PEOPLE DRAG IN A SCALED, MOVING ROOM: pointer coordinates go wrong during/after the zoom-out because rect/scale was cached, or because the stage wrapper (not the room) carries the scale and `getBoundingClientRect` is read at the wrong time. Fix: read the room's rect fresh on every pointer/keyboard event, convert with ratios, never use `offsetLeft`; test by dragging while `m-chair-rearranger-zoom` is on and while the window is mid-slide. Also never compute positions in px for state (only normalised).
2. HELD STATE NEVER RELEASES: pointer capture lost, `pointercancel`, `blur`, `visibilitychange`, tab away during a drag, a synthetic fuzz `pointerup` on the wrong element, or a second pointerdown during the consultation ring leaves a chair `held` forever (it then never sidles, flips or inspects). Fix: single `drag` object; handle `pointerup`, `pointercancel`, `lostpointercapture`, `blur` on window (via `api.on`), and a safety release if the held chair has not received a move for 6 seconds; wrap `setPointerCapture`/`releasePointerCapture` in try/catch; always null the drag on reset/destroy.
3. KEYBOARD VS CLICK CONFLICT AND FOCUS LOSS: Space/Enter fires both `keydown` and a synthetic `click` (and Space scrolls the page), so a chair is picked up then put straight back down, or the page jumps; rebuilding chair DOM (e.g. re-rendering on each state change) drops focus mid-hold. Fix: handle Space/Enter on `keydown` only with `preventDefault`, ignore `click` events with `detail===0` on chairs, never recreate chair elements after mount (only change styles/text), keep `aria-label` updates throttled.
4. OVERLAPPING ASYNC SEQUENCES AND RESET LEAKS: the ceremony, Inspector walk, tug-of-war, defenestration return, Gerald's visit, the meeting, the zoom and the closing sequence all running at once leave orphan DOM (a stuck stamp, a floating Inspector, a chair hidden forever) or fire after the room was reset, and a reset that does not clear `out`, `tan`, `tugged`, `dizzy`, bubbles, the sock, the tower or `fired{}` makes Mk II broken. Fix: ONE phase machine, an `epoch` token on every deferred callback, `startVisit()` refuses while busy, the beat table fires each trigger once via `fired{}`, and a single `resetAll()` that is also what `?selftest` exercises via the fast SCALE. Defer or cancel a visit when a defenestration/tug/ending is active.
5. HEDONIC FLIP LOGIC GOES BAD: flips that land the chair straight into contentment cause a flip loop every 4s (or every frame) and spam Management; `NaN`/`undefined` appear when a want targets a chair that is `out` (Clive defenestrated while Pip wants near Clive) or Desmond who is not present yet; division by zero when normalising the sidle direction at zero distance; content timers advancing while held or during the meeting. Fix: the flip guard in 2.4 (re-pick if the new want is already >= 0.55), `flipGrace` of 2s, resolve `near(X)` targets defensively (fallback to `window`), `if (dist < 1e-4) skip`, only accumulate `contentT` when `phase==='play'` and the chair is neither held, tugged, out, nor in the circle, and rate-limit narration (`sayGate`).

Also watch: sunbeam polygon recomputed too often (keep 10 fps), the canvas not resized with the room (redraw scuffs from the ring buffer on resize), the Half Chair or Dennis accidentally receiving pointer events (give them `pointer-events:none` except the Half Chair which only counts attempts), and `api.say` flooding in selftest (SCALE=10 fires many beats quickly: `sayGate` must still let everything through eventually without queue buildup).

## 14. Quick acceptance checklist (builder, before reporting)

- `node tools/lint.js games/chair-rearranger.js` passes; `node tools/selftest.js chair-rearranger` PASS with the default seed and a second seed; screenshot at 360px and 1100px looks right (the room and chairs visible, no horizontal page scroll).
- First 10s: intro1, marguerite line, the Inspector glance at 5s, intro2, all with no input.
- All 12 achievements declared (>=6, >=2 secret) and unlockable; >= 100 distinct lines present in the file; >= 3 callbacks (Clive third visit/postcard, Colin/Pip bird, `metGerald`, Dennis, Sandra's note, the Mk II Clive); idle, spam and the not-ending all implemented.
