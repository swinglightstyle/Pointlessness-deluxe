# DESIGN BRIEF: Cafeteria of Almost Food  (id: `cafeteria`, category: `department`)

Builder: read SPEC.md and VOICE.md first, then build `games/cafeteria.js` as ONE file, <= 1800 lines (target 1650), vanilla JS, no assets. This brief is final. Where it is silent, decide sensibly and move on. Do not ask anyone anything. Module title: "Cafeteria of Almost Food". Tagline: "Lunch is served. Lunch is also, technically, a concept." Icon: 🍲. Tags: `['physical','lunch','department']`.

## 0. Showrunner decisions and the BUDGET RULE

Three pitches were merged. SPINE = pitch 1 (physical tray on a looping counter with per-dish friction, hold-to-serve, tilt, Bernadette behind fogged glass, the Hall with carried tray and 7.5-second lunch, the 10 beats, blue-hour After Hours, the Closing Bell). STOLEN from pitch 2: Doreen's "Hm." (now Bernadette's), the Placard asterisk idea (now the label footnotes), the Tuesday Special reverence (now the final sentence), the clock gag is CUT. STOLEN from pitch 3: the Seating Charter that amends itself, the coat that holds a seat at every table (one coat per table; at Table 6 it is a mop), Dennis the Salad Consultant, "Form 27B/6" footnotes, the record-scratch of "this is now a different line".

CUT as weak or unbuildable in one file: pointer drag-and-drop of tray items (replaced by click-select-then-click-well plus arrow-key swap), Velocity sliding along the tray, motion-blur filters on items, Shift+arrow squeegee, mood-ring SVG animations, window-resize easter eggs (fold into queue of Bernadettes, Overflow Annex), Lunch Ticket jackpot at 100, forbidden-chair W-E-D-N code, the 1-in-50 Left Tray, 31 distinct label variants per dish (replaced by a generator with dish-specific "contains" + "philosophy" lines and shuffle-bag generic fields), full 8-faction conversational heat model (heat is cosmetic and only picks a tier of reply), the Hall rotating every seat literally (replaced by a placard flip and a lean), the Bernadette portrait enlarging (replaced by a CSS class).

**BUDGET RULE (read this twice).** The module is large. Priority tiers; if the file passes ~1700 lines, delete from the bottom tier first without asking:
- **P0 (must exist):** Line scene with scrolling stations and friction zones, push controls (pointer drag + keyboard), TAKE hold-to-serve, Velocity, the Tray with tilt/spill/overfull and click-to-rearrange, Nutrition label card, Bernadette fog with Squeegee and Wipe all, Register scan and receipt, the Hall (carry tray, seats, 7.5s lunch, shift, Standing card, bell), the 10-beat timeline, After Hours idle, Seconds Fee spam, the Closing Bell not-ending, all achievements, save.
- **P1 (should):** Table 7 1/2 sliding gag and its two ways to reach it, coats and the Seating Charter strip, menu mutation and counter growth, Sandra's checkpoint and flyer, corkboard, Gerald cameo, Toaster pop-up toast, Fasting secret, Hungry Gary commentary, Pudding Skin, Half Velocity, Dennis, ticker/tip lines.
- **P2 (cut first):** Bread Roll chase, forest of upside-down chairs (3 min idle), parallax layers, "Adequate" gauge, wheel impulse, bell-rotation lean, applause emoji cloud.

---

## 1. Concept

You push a steel tray along a looping cafeteria counter of dishes that are almost food. Bernadette the lunch lady stands behind a fogged sneeze guard trying to tell you something important and is interrupted by the steam valve every single time, always at the last word. You take portions by holding a button (the serving size is however long you held it, in seconds, printed on a Nutrition Facts label that gets more philosophical), you keep the tray balanced, you reach the Register (you pay one feeling, plus tax), you carry the tray through the Hall and sit at a table for exactly 7.5 seconds, the table "shifts", your Standing prints as "Adjacent", a bell asks you to find a better seat, and the line reopens a little stranger. Standing, Belonging and Dignity always read Adjacent. The tray's equilibrium gauge always reads "Balanced (Emotionally)". Nothing is ever eaten, nothing is ever won.

First joke with ZERO input: at T=0.4s Management reads the menu aloud; the whiteboard says "Today's Special: A Special"; the counter drifts forward 14px on its own so "the tray is moving"; Hungry Gary sighs behind the tray.

Cast (all comedic): **Management** (narrator via `api.say`), **Bernadette** (lunch lady, bubbles only in her portrait, never `api.say` except where noted: use `who:'Bernadette'`), **Hungry Gary** (the 🧍 behind your tray; becomes Hungry Gary Jr. in later cycles), **The Toaster** (station 6, speaks in toast), **Gerald** (potato, Executive Table, cameo), **Sandra from Compliance** (never seen, always cited: flyer, clipboard, Charter clauses), **Dennis** (🌿 salad consultant), the **Coats** (one per table, named), **Tuesday** (never appears, looming; the soup was Tuesday).

---

## 2. THE LINE (scene A, default)

### 2.1 Layout, top to bottom (inside the module root; `.m-cafeteria-root`, flex column, min-height 420px)
1. **Menu Board** (whiteboard, tilted -1.2deg, cursive/italic system stack): "Today's Special: A Special" (text changes, see 9.4). Also hosts the tab buttons? No: tabs live in a slim header strip above it: buttons **The Line** and **The Hall** (Hall disabled with `aria-disabled` and title "Seating: not yet" until unlocked) plus a small "Nutrition" drawer toggle and "Notebook" toggle button.
2. **Counter band** (height ~42% of root, min 180px): checker-tile backdrop (repeating-conic-gradient cream/mint) scrolling at 0.4x (P2), mint counter top with steel rail, the station strip (22 recycled nodes at most), a glass sneeze-guard gradient overlay over every station, a faint steam wisp (CSS blob, static under reduced motion). Bernadette's portrait and her fogged glass sit at the RIGHT end of the band at >= 700px width, and below the band (full width, 120px tall) under 700px.
3. **Tray zone** (lower third): the Tray fixed at x = 30% of the counter width (CSS `left:30%`, centered), Hungry Gary peeking from behind it (🧍 at 0.8 scale, 2px up-left, with a sigh bubble), the Take button, the Ask button, the Squeegee toggle, the Wipe all button, the tray-equilibrium gauge (revealed at beat 3; before that it is hidden with `hidden`), the label card (right column at >= 900px; a collapsible drawer under 900px; a bottom sheet under 560px).
4. A visually hidden `aria-live="polite"` div (the narrative copy; see 16.9).

### 2.2 World model
- Stations form a loop. `STATION_W = 220` px. `L = stations.length * 220`. World position `pos` (px, wrapped into `[0, L)`) is the world x that sits under the tray centre; velocity `v` (px/s). **Forward = `pos` increases = stations slide LEFT past the fixed tray on screen** (the tray is "pushed right along the rail while the camera follows"). Dragging right pushes forward. Dragging left is backward.
- Station i occupies `[i*220, (i+1)*220)`, centre `c_i = i*220 + 110`. Screen x of station i's node = `trayX + wrapDelta(c_i - pos)` where `wrapDelta(d) = ((d + L/2) mod L + L) mod L - L/2` (positive-modulo, never negative). Write nodes with `transform: translateX(...)`; one node per station; hide nodes whose |x - trayX| > counterWidth.
- `atStation()` returns the station index if `|wrapDelta(c_i - pos)| < 45` (the 90px taped Portion Zone), else -1. `under()` = `floor(pos/220)` for friction.
- Max |v| clamps at 900. Every integration step: `if(!isFinite(v)) v=0; if(!isFinite(pos)) pos=0;`. dt clamped to 0.05.
- Friction per second (`v *= Math.exp(-fr*dt)`): default 1.0; Soup 0.35 and Sauce 0.35 and Gravy 0.35 (SLIPPERY, you coast); Jello 3.5 (STICKY); Milk 0.5; Pudding has a SKIN: while `|v| < 60` inside the Pudding station span, friction is 7 and `skin=true`; the first impulse that makes `|v| >= 60` there pops it (`api.sfx('pop')`, Management line `pudding.pop` once per cycle) and sets friction 0.6 until you leave the span, then `skin=true` again.
- Magnet (accessibility): when `|v| < 80` and the tray is within 25px of a zone centre (not Register), add a gentle pull `v += (c - pos)*4*dt`. Stopping inside a zone from motion (|v| < 15 after having been > 60) plays `api.sfx('blip')` once. `api.sfx('ding')` is reserved for the Toaster zone entry and the Register scan finishing.
- Counter lip tick: `api.sfx('tick')` every 60px of |travel| (if |v| > 700, every 120px), at most 8 per second.
- Lap counter: when `pos` wraps from near L to near 0 going forward, `laps++`, stat `cafeteria.laps`, +1 Meh once per lap (`api.award(1,'lap')`). Backward wrap does nothing.
- Autodrift at the start: at T=0.8 the counter eases forward 14px over 1.2s (set `v` so it travels exactly 14px; or tween `pos`).

### 2.3 Stations (data table; 13 at the start, grows to 22)
Fields: `id, name, short, emoji, fr, g (gravitas), tag`. Placement order at start (index): 0 soup, 1 meatloaf, 2 jello, 3 casserole, 4 salad, 5 pudding, 6 toaster, 7 sauce, 8 corn, 9 sandwich, 10 beige, 11 cup, 12 register (ALWAYS LAST).

| id | name (tent card) | short | emoji | fr | g |
|---|---|---|---|---|---|
| soup | Soup, Tentative | Soup | 🍲 | 0.35 | 4 (6 from beat 8) |
| meatloaf | Meatloaf (Theoretical) | Meatloaf | 🍖 | 1.0 | 3 |
| jello | Jello Cube | Jello | 🍮 | 3.5 | 2 |
| casserole | Casserole (Contains Casserole) | Casserole | 🥘 | 1.0 | 5 |
| salad | Salad Bar of Implication | Salad | 🥗 | 1.0 | 1 |
| pudding | Pudding (Skin Optional) | Pudding | 🥣 | skin | 2 |
| toaster | The Toaster | Toast | 🍞 | 1.0 | 1 |
| sauce | Sauce, Source Unknown | Sauce | 🥫 | 0.35 | 3 |
| corn | Corn (Distributed) | Corn | 🌽 | 1.0 | 1 |
| sandwich | Sandwich of Implied Filling | Sandwich | 🥪 | 1.0 | 2 |
| beige | The Beige Cube | Beige | 🍘 | 1.0 | 3 |
| cup | Pudding Cup, Sealed and Empty | Pudding Cup | 🥤 | 1.0 | 1 |
| register | The Register (a muffin tin) | Register | 🧁 | 1.0 | 0 |
| mashed (beat 6) | Mashed Potatoes (Not Gerald) | Mashed Potatoes | 🥔 | 1.0 | 4 |
| fish (beat 6) | Fish Stick, Singular | Fish Stick | 🐟 | 1.0 | 1 |
| milk (beat 6) | Milk of Uncertain Cow | Milk | 🥛 | 0.5 | 2 |
| sandra (beat 7) | Compliance Checkpoint | Checkpoint | 📋 | 1.0 | 0 (cannot be taken) |
| tomato (beat 9) | Tomato Who Wishes To Be Consulted | Tomato | 🍅 | 1.0 | 1 |
| spork (beat 9) | Spork (Flagged) | Spork | 🍴 | 1.0 | 1 (utensil) |
| salt (beat 9) | Salt, Reasonably | Salt | 🧂 | 1.0 | 1 |
| gravy (beat 9) | Gravy Boat (Empty) | Gravy | 🍯 | 0.35 | 2 |
| donot (beat 9) | Station 7 1/2: Do Not Take | Do Not Take | 🚫 | 1.0 | 5 |

Each dish renders as a BIG emoji (`font-size: calc(var(--u)*5.5)`, clamp 48-72px) with `filter: grayscale(35%) sepia(20%) saturate(.7)` (no blur: blur costs), a handwritten tent card with `name`, a glass overlay. Dish nodes are `<button>` elements with `aria-label` = name + friction hint ("slippery", "sticky") + "Enter reads the label". Tab order: dishes in station order.

**Insertion rule.** New stations are inserted immediately BEFORE the register (register stays last). When inserting `k` stations at index `ins`: `if (pos >= ins*220) pos += 220*k;` so the tray stays on the same station. Reuse DOM nodes (create missing ones, never more than 22 + 1 roll). Show the line "The line is now a different line" (L: `line.different`) when inserted.

Special stations:
- **The Toaster (index 6):** entering its zone plays `api.sfx('ding')` (once per entry) and pops a slice of toast above it with a word from `toast.words` for 1.4s. Taking here yields "Toast (It Means It)".
- **Dennis:** the Salad station has a small 🌿 sprite and the tent card suffix " (Consultant: Dennis)". On the 4th take at Salad: Dennis is promoted, station renamed "Dennis" (name, short "Dennis"), line `dennis.promote`. Taking "Dennis" then: line `dennis.take`.
- **The Register (last station):** see section 6.
- **Compliance Checkpoint (beat 7):** passing through its zone (tray center within 45px while |v|<200 or stop) stamps one random unreviewed tray item `REVIEWED (PENDING)` once per lap; line `sandra.stamp`. It cannot be taken (take there: line `sandra.nope`).
- **Station 7 1/2: Do Not Take (beat 9):** if taken: item "Do Not Take (Taken)" g 5, +0.5 Meh, line `donot.taken`, stat `cafeteria.donots`.
- **Bread Roll (beat 6, P2):** one extra moving node (🍞 with 🦵? no legs, just rolling) whose world position is `(base - 55*t) mod L` (it rolls opposite the line). It is a take-able "station" when the tray is within 45px of its position (priority over the static station under it). Taking it: `roll.caught`. If never caught it laps forever; harmless.

### 2.4 Push controls (all through `api.requestAnimationFrame` delta time; nothing runs hidden: dt is clamped to 0.05)
- **Pointer (mouse/touch):** `pointerdown` on the tray or on the counter band (not on dish buttons, which are clicks) starts a drag: record samples `{t, x}`; on `pointermove`: `pos += dx` where `dx = clientX - lastX` (clientX read fresh), keep `v` = smoothed velocity over the last 80ms of samples; on `pointerup`/`pointercancel`/`lostpointercapture`/window blur: release (the line then coasts with friction). `setPointerCapture` in try/catch. `touch-action: none` on the tray and counter band.
- **Wheel** over the counter (P2): adds impulse `v += clamp(deltaY+deltaX, -120, 120) * 3` (preventDefault only when over the band).
- **Keyboard** (focus anywhere in root except a focused text field; a focused dish button still lets arrows push because dish buttons only react to Enter): ArrowRight / D = shove: on first keydown add impulse +260 px/s, while held accelerate +900 px/s² up to cap 520; ArrowLeft / A = backward (mirror). Key state cleared on `keyup`, window `blur`, `visibilitychange`, and mode change. Space = TAKE (rule below). ArrowUp = ask Bernadette (when focus is not on a tray item). ArrowDown = toggle the Nutrition drawer. Escape = focus the tray. Enter on a focused dish: if the tray is NOT at that station, the tray glides there (a managed ease over 0.9s that sets `pos`, line `glide`); if it IS at that station, open the label.
- **Space handling rule:** TAKE only when `event.target` is the root, the tray, the Take button, or a dish button; on any other focused button (Wipe all, Squeegee, tabs, tray items) Space activates that button normally. `preventDefault` on TAKE (so no page scroll and no synthetic click).
- **Backward pushing** (Gary gag, beat 3 onward): when `v < -60` for 0.6s, Gary says a `gary.back` bubble and Management a `gary.mgmt` line (each rate-limited to once per 20s, and no more than 4 per cycle).
- Clicking/tapping a dish (not holding) = READ LABEL (section 3.3). Pointerdown on a dish does not start a push drag.

### 2.5 Hungry Gary
🧍 behind the tray. Sigh bubble (`gary.sigh`) at T=4.5 and about every 40s (`api.randInt(35,55)` seconds) while in Line. Cycle >= 2: his caption reads "Hungry Gary Jr." and a one-time line `gary.jr`. After Hours: he goes home (hidden).

### 2.6 The Coat in the line (callback)
After the 7th Charter refusal ever in the session, a small 🧥 appears behind Gary holding nothing. Nobody mentions it, except one line `coat.line` once. At the Closing Bell the coat sits down first (see 14).

---

## 3. THE TRAY AND TAKING

### 3.1 Wells and weights
- 8 wells: wells 0-6 are whole, well 7 is the half-height well ("7 and a half"). CSS grid with 4 columns x 2 rows: wells 0..3 on row 1, wells 4..6 and 7 on row 2 (well 7 is a short half-height cell in column 3). `xOffset` by column: -1.5, -0.5, +0.5, +1.5. The half well holds any item at 50% scale and 50% weight.
- Each well is a `<button class="m-cafeteria-well">` (aria-label "Well N, empty" / "Well N, holds Soup"). Items are drawn inside wells as `<button class="m-cafeteria-item">` (aria-label "Soup, weight 4, press Enter to pick up, arrows to move").
- Item data: `{id, name, short, emoji, w (weight), size, flags, slide}`; `w = dish.g * sizeFactor` where portion size steps are small 0.7 (held < 0.6s), normal 1.0 (< 1.5s), large 1.3. Quantised so mirrored identical items can cancel exactly (this is what makes the 0.0 degree event achievable).
- Item kinds: dish portions, Velocity (➡️, w 0.4, `size` 1), Half Velocity (w 0.2), Seconds (`Seconds #n`, w 1), Pudding Skin (w 1, `locked:true`, cannot be moved), Adjacent X (w = dish.g*0.8, rotated 14deg), "Do Not Take (Taken)", Toast (It Means It).
- **Click-to-rearrange** (the only P0 way to move items): click/Enter an item -> it becomes `selected` (highlight, live region "Soup picked up"); click/Enter any well -> the item moves there, swapping with an occupant if there is one; Escape or clicking the same item cancels. Keyboard shortcut: with an item focused, Arrow keys swap it with the neighbouring well (left/right/up/down within the grid; no wrap), no selection needed. Pointer drag between wells is a P2 nicety, skip it.

### 3.2 Tilt and spills
- `torque = Σ item.w * well.xOffset` (half-well items count at half weight and half size). `target = clamp(torque * 1.6, -22, 22)` degrees. Positive = clockwise (right side down).
- Displayed angle `a` follows a spring: `acc = (target + wobble - a)*80 - w*11; w += acc*dt; a += w*dt`, with `wobble = sin(t*9) * min(3, |v|/300 + |accelEst|/2500)` where `accelEst` is the smoothed `dv/dt`. Clamp `a` to +-30. Reduced motion: `a = target`, no wobble.
- Tilt readout next to the gauge: `a.toFixed(1)+'°'`. The gauge text is ALWAYS "Balanced (Emotionally)". Hidden until T=60 (beat 3), shown earlier if any item has slid.
- **Slide:** while `|a| > 12`, pick `slider` = heaviest item whose `well.xOffset * a > 0` (the low side); its `slide += dt/1.5` (if `|a| >= 20`, `+= dt/0.5`), drawn as `translateX(slide*6px)` with a dotted trail. If `|a| <= 12` all slides decay `-= dt/2`. At `slide >= 1`: the item is removed ("reclaimed by the line": a puff particle, `api.sfx('buzz')`, stat `cafeteria.spills`, Management `spill` bag with `{item}`, first one ever uses `spill.first`). At most one item reclaimed per 0.8s.
- **Overfull:** a 9th item pushes the oldest item off as "Seconds: X" (removed; line `overfull`), the new item enters the freed well.
- **Perfect balance event:** if the tray has >= 2 items, `|a| < 0.05`, `|w| < 0.02`, `|v| < 30` continuously for 0.6s while in the Line: the tilt readout shows `0.0°` and the gauge text for 4s reads "Balanced (Physically). Please do not tell the tray." Pays +5 Meh once per mount, unlocks `cafeteria.balanced`, line `perfect`.
- Hall: the same torque plus an acceleration term `ax/150` degrees (clamped +-14) so quick turns slop items; `|a| > 20` for 0.3s reclaims an item with the same rules.
- A fresh tray (after the bell) is empty. Items persist across Line/Hall switches within a lunch.

### 3.3 TAKE (hold-to-serve) and VELOCITY
- Press and hold TAKE (the big button under the tray via pointerdown/pointerup, Space keydown/keyup, never `click`): the ladle swings in (a rotating div) and a portion grows on a "portion plate" above the tray for as long as you hold, up to 2.4s. Release places it in the FIRST free well (order 0..7; if all full, the overfull rule). Rate limit: at most one portion per 140ms (extra presses are counted for spam but ignored).
- The label card updates LIVE during a hold: "Serving size: 1.37 seconds of Meatloaf" (the number is the held time to 2 decimals).
- **At a station** (`atStation()>=0`, and not Register/Checkpoint): you get that dish. `api.award(0.1,'take')` (0.02 if more than 10 takes in the last 10 seconds). Stat `cafeteria.takes`. Management `take` bag (every 3rd take) with `{item}` and `{count}`; hold quality lines (`take.short` for < 0.25s, `take.long` for >= 2.3s). The "Adequate" gauge is P2: a slim bar with a marker at `0.7 + ((takes*0.1618) % 1.2)` seconds; holding within 0.1 of it prints `take.adequate` once per 5 takes.
- **While moving:** if `|v| > 120` when you press TAKE: the ladle scoops air and you receive VELOCITY (➡️ glyph, 0.4 oz, w 0.4). Stat `cafeteria.velocity` +1 (also persisted). First ever: `velocity.first` and `cafeteria.velocity` achievement. Count them in `velCount`. Lines: `velocity` bag. At count 7 the line `velocity.seven` fires.
- **Half Velocity secret:** if `velCount >= 7` and you press TAKE while `|v| < 30` and the tray has a free well and the half well is free: produce a half-size Velocity (w 0.2) PLACED IN WELL 7. The tray levitates 4px for 2s; `api.sfx('fanfare')` quietly (volume cannot be controlled; use 'tick' three times instead if fanfare is too loud); line `velocity.half`; achievement `cafeteria.half`; +1 Meh; `velCount` resets to 0.
- **Not at a station** (`atStation() === -1`, `|v| <= 120`): Bernadette ladles the nearest station's dish anyway: item `Adjacent {short}` (rotated, `flags.adjacent`), line `take.adjacent`.
- **Pudding Skin rare:** each take at Pudding: `api.chance(1/40)` yields the unmovable Pudding Skin item instead; line `pudding.skin`; achievement `cafeteria.skin`.
- **Spam rule:** see 11.2.

### 3.4 The Nutrition Facts card (reading labels)
- Clicking/tapping a dish, or Enter on a focused dish that the tray is already at, opens the label (and sets it as the current card). It shows (in a white card with a 3px black frame, thick rules via borders only): heading "Nutrition Facts" (heavy); "Serving size" row; "Amount per serving" thick rule; "Calories" row; "Contains" row (dish-specific); "Does not contain" row (bag); "% Daily Value of Tuesday: NN%" bold row; "Allergens" row (bag); a boxed italic quote (dish-specific philosophy line); the footnote (bag; always starts with an asterisk; and from beat 9 the last row "Servings per container: you" replaces "Servings per container: 1").
- **Tuesday percent** creeps by beat: `TUES = [31,34,47,62,88,100,112]`, index by beat = `[0,0,1,2,3,3,4,5,6,6][beat-1]`.
- Each reading cycles the generic bags (so rereading shows different Calories, Does not contain, Allergens and footnote) and alternates the dish-specific philosophy line between its two variants. Reading counts: first read of each dish id: `api.award(0.3,'label')`, adds the id to the `labelsRead` set (cap 40) and sets stat `cafeteria.labels` to the set size; later reads of the same dish pay 0.05 at most once per 3 seconds. A label read triggers `label` bag every 4th read. Reading the same label more than 10 times in 6s: `spam.label`.
- Auto-open: Soup's label slides in at T=3.5 (beat 1).
- Tuesday review gag: at T=360, Management says `tuesday.review`.

---

## 4. BERNADETTE AND THE FOG (the running gag)

### 4.1 The portrait
CSS-built: circle head (skin tone `#e9c9a6`), hairnet drawn with `repeating-radial-gradient` dots, two eyebrows (one raised via keyframe on events), mustard apron, a ladle as a rotating rounded rect, a steam valve (a tiny pipe at her left with a pulsing white puff). Her glass: a rectangle about 240x140 CSS px (min 180x100) with a diagonal highlight. Speech area inside the glass: DOM text lines (handwritten-ish italic system stack) UNDER a `<canvas>` fog layer. Her short bubbles (`hm`, sighs) appear ABOVE the fog in a small pill.

### 4.2 Fog implementation (this is the single trickiest piece; do exactly this)
- A coarse fog grid of `FW=160 x FH=90` cells stored as `Float32Array(FW*FH)` (`fog[i]` in 0..0.88). The canvas is `<canvas width=160 height=90>` stretched by CSS to the glass area. Render each frame the fog is dirty (a regrowth or wipe happened): fill an `ImageData` (reuse one buffer) with colour `(236,239,238, fog[i]*255)` and `putImageData`. Guard: if `getContext('2d')` returns null (headless), keep the fog model and skip drawing. Do NOT rely on stacking many low-alpha `fillRect`s: alpha quantisation makes regrowth stall.
- **Regrowth:** each frame `fog[i] = min(0.88, fog[i] + 0.14*dt)` for every cell (the valve is venting). Skip the loop when no cell is below the cap.
- **Wipe (squeegee):** pointer drag on the canvas (always on for mouse; for touch, only while the Squeegee toggle is on, and then `touch-action:none` on the glass): at each `pointermove` interpolate between the last and current point in canvas coordinates (`cx = (clientX - rect.left)/rect.width*FW`, rect read FRESH on every event) and for each interpolated point clear a disc: `fog[i] = max(0, fog[i] - 1)` within radius `r = max(3, 28 * FW / rect.width)` cells (28 CSS px brush), with a soft falloff.
- **Wipe all** (a real button; keyboard path): sets `clearUntil = now+1.2s` during which regrowth is suppressed and `fog` is set to 0 over the sentence area, then regrowth resumes; cooldown 10 seconds (real; label shows "Steam: 7s"). Line `wipeall` first time; during cooldown, pressing it says `wipeall.cooldown`.
- **Reduced motion:** the fog does not regrow continuously; it fades back with a flat opacity transition over 3s after a wipe and there are no valve vents.
- **Reading detection:** once per 250ms, sample a 12x6 grid of cells over the sentence text area; if >= 40% of samples have `fog < 0.35` the current sentence counts as READ (once per sentence). Then: collect the fragment (below), `api.award(1,'fragment')` (0.2 for a repeat of an already-found fragment), `api.sfx('pop')`, add to the hidden copy for screen readers (see 16.9), raise her eyebrow, and open the valve (puff animation + `api.sfx('whoosh')`) ~0.8s later: the fog snaps to 0.88 over the sentence region at that moment (a "HSSSS" that covers it), simulating the steam. Show a small "HSSSS" glyph burst.

### 4.3 Sentences
A sentence is a string plus a final hissed word. It displays as `words... ♨` where the final word is replaced by the steam glyph `♨` (the glyph, not the word). The first line appears when `spawnSentence()` runs:
- First scheduled at T=35 (sentence 1), second at T=105 (sentence 2), then every `api.randInt(20,35)` seconds of T while the Line is the active scene (deferred while in the Hall). Also spawned by ArrowUp / the Ask button / clicking Bernadette when none is active and the 6-second cooldown has passed. If one is active when you ask: a bubble `hm` ("Hm." ...) and stat `cafeteria.hms`.
- Pick the first sentence NOT yet in `fragFound` (saved), in the order below; if all 13 are found, random among them. Sentence 13 is reserved for beat 8 (T>=390) and the final unfogged sentence for beat 10.
- Beat 7 (T>=300) writes THREE sentences in a row (stacked lines) when spawned; reading any one counts. Beat 6+ steam vents are random: the auto-hiss fires at a random 6-14s after spawn even if unread (the fog fully returns).
- Fragment notebook (**Things Bernadette Almost Said**): a drawer (button "Notebook (N)") listing found fragments (cap 24 entries, shown newest first, `N` = count). At 8 fragments (or T>=390 with any), the drawer becomes a **corkboard**: absolutely positioned note cards with pushpins and an inline SVG whose red lines connect every pin to a soup pin at the centre. Management `cork`. Gold star in the margin after the Closing Bell.

### 4.4 The 14 sentences (verbatim; the displayed text replaces the last word with ♨)
1. `Listen, hon, the soup isn't actually` + HSSSS
2. `Don't take the third tray from the left. That tray has seen` + HSSSS
3. `Back in '98 we served something that wasn't` + HSSSS
4. `I'm not supposed to say who orders the Thursday meatloaf, but it's the one who` + HSSSS
5. `The walk-in has a door, and behind the door there is` + HSSSS
6. `Between you and the gravy, the gravy was never` + HSSSS
7. `The Jello is not wobbling for fun. It is wobbling because` + HSSSS
8. `Gerald has been coming here since before he was` + HSSSS
9. `Sandra from Compliance asked me to stop telling you the sporks are` + HSSSS
10. `The pudding's skin is not a skin. It is` + HSSSS
11. `There's a reason it's called Tuesday casserole on a Thursday, and the reason is` + HSSSS
12. `Table seven and a half was set for somebody in 1996, and when they finally came they` + HSSSS
13. (beat 8, exactly 14 words before the hiss) `I have worked here since the building was a different building, and nobody has` + HSSSS
14. (beat 10, the finale, NEVER fogged) `The soup was Tuesday, hon. It was always Tuesday.`

### 4.5 Hiss callbacks (the valve follows you; each fires once, Management lines)
- Register beep: first scan after beat 4: the receipt item line shows `BEEP (HSSSS)`; line `hiss.register`.
- Quiet Table: the first time silence meter >= 5: bubble `*achoo* (HSSSS)`; line `hiss.quiet`.
- Gerald's nod: line `hiss.gerald`.
- After the Closing Bell: the valve gives a very small, sheepish hiss every few minutes (`hiss.sheepish`).

---

## 5. (reserved: the Hall is section 7)

---

## 6. THE REGISTER

- Station 12 (always the last index). Reaching it (tray centred in its zone) with `>= 1` item and a stop (`|v| < 60`) starts a 3-second SCAN (`phase='scan'`, input to push is ignored for 3s; TAKE does nothing; show the receipt): items beep one at a time (`api.sfx('tick')` each, one per 3/n seconds), a receipt unfurls with up to 12 lines (cap): for each item `Item N: {short} .... a look` plus lines from the `receipt` bag; the total is ALWAYS `TOTAL: 1 feeling + tax` (cycle >= 2: `TOTAL: one feeling, plus tax, minus yesterday`). The tray pays a feeling (`api.award(0.5,'register')`). `api.sfx('ding')` at completion. Management `register` bag. Then the door labelled "Seating" opens: the Hall becomes available. The FIRST time ever: toast "Seating: Open (it has always been open)", line `seating.open`, and after 2.5s the scene auto-switches to the Hall (all later times, a button "Go to Seating" appears on the receipt and the Hall tab is simply enabled).
- **Empty tray at the register (FASTING secret):** requires >= 30 seconds of play and not yet triggered this lap: the receipt prints `Total: nothing, plus tax`, the cashier salutes (💂 is Emoji 1: use it, in a tiny speech bubble `salutes`), the Quiet silence falls (the Hall tables go quiet: `hall.silence` flag set for this lap), Gerald stands at the Executive Table and does not sit for the rest of the lap (Hall render uses `geraldStands`), line `fasting`, achievement `cafeteria.nothing`, +3 Meh. Once per lap (reset the lap flag when `pos` wraps).
- If the Hall has not been unlocked by T=150, unlock it anyway at T=150: toast and line `seating.open` ("Seating has always been open" is the joke: it was never locked).
- Receipt cap 12 lines; new scans clear the old one.

---

## 7. THE HALL (scene B)

### 7.1 SVG layout
Inline SVG, `viewBox="0 0 400 300"`, `preserveAspectRatio="xMidYMid meet"`, width 100%, aspect 4:3 (under 560px the SVG min-height is 300px and seat hit targets are >= 44 CSS px: draw invisible 28-unit circles under each seat; at 360px width 1 unit = 0.9px so use circles of r=24). Floor: SVG `<pattern>` tile (cream/mint). Walls: a thick outlined rectangle. A radiator drawn bottom-left. A painted window on the right wall (a rectangle with panes, flat and unconvincing). A door marker "SEATING" bottom-right where the tray enters (tray start `(360,272)`).

Tables (centres in SVG units; the builder may nudge), faction, tint, seats (31 seats TOTAL across the hall; the "31 seats" line depends on this):
| table | name | shape | pos | tint | seats |
|---|---|---|---|---|---|
| T1 | Staples, Local 7 | long rect 80x34 | (80,60) | mustard #d9a62e | 5 (one is a coat) |
| T2 | The Interns | round r24 | (200,55) | coral #e8756a | 5 (one coat) |
| T3 | The Quiet Table | round r22 | (320,65) | lilac #b8a6d9 | 4 (one coat) |
| T4 | People Who Remember The Old Soup | round r24 | (75,165) | gray #8c8f86 | 5 (one coat) |
| T5 | Executive Table | round r30, gold doily (radial gradient) | (200,160) | gold | 6 (Gerald; NOT enterable) |
| T6 | The Window Table | round r22 | (325,170) | cream | 4 (one is a mop 🧹: its coat) |
| T7 | Sandra's Table (Compliance) | long rect 70x28 | (200,250) | white | 1 (clipboard 📋; declines) |
| T7.5 | Table 7 1/2 (by the radiator) | tiny round r10 | (45,262) slides, see 7.5 | pink | 1 |
Seat total: 5+5+4+5+6+4+1+1 = 31. Enterable (sittable): T1-T4 and T6 minus their coat seats = 4+4+3+4+3 = 18, plus the T7.5 special.

Seats are `<g role="button" tabindex="0" aria-label="Table 2, The Interns, seat 3">` containing a rounded rect chair and (if occupied) an emoji from `🙂 😐 🧐 🥸 😶 🤓 😑`. Gerald is 🥔 with a placard. Each table has a tiny placard `<text>` (name, 7px) near it. Enter/Space on a seat `<g>` is handled via `keydown` (dispatch the same action as click).

### 7.2 Carrying the tray
- The tray is a small steel rounded rect (about 22x14 units) with up to 8 mini item dots, tilting via CSS `transform: rotate()` on its group.
- **Mouse:** the tray springs toward the pointer position while the pointer is over the SVG (hover is enough; `pointermove` stores the target in SVG coordinates computed with a fresh `getBoundingClientRect` and the viewBox ratio). Spring: `ax = 60*(tx-x) - 11*vx` (same for y), `max speed 260 units/s`. **Touch:** dragging carries the tray (`touch-action:none` on the SVG only while a touch drag is active; otherwise the page can still scroll), lifting the finger over a seat sits.
- **Keyboard:** arrows move a "walking tray" at 120 units/s; Shift = hustle 200 units/s (more tilt: add `+6deg` to the acceleration term). **Enter/Space on a focused seat button:** if the tray is within 40 units of that seat, sit; otherwise the tray auto-walks to it (managed ease 1.2s, with a line `hall.walk`) and then sits (so Tab + Enter is a complete keyboard play path).
- Tilt: see 3.2 (Hall version). Items may be reclaimed here too.
- Tables lean: when the tray is within 45 units of a table, its seated emoji rotate 3-5 deg toward the tray (CSS `transform-box: fill-box`), and a speech bubble above the table says a line from `isanyone` (rate-limited 1 per 6s globally). The Quiet Table has a silence meter (0..10) in a tiny bar: rises by `dt*3` when `|a| > 8` or tray speed > 150 units/s within 50 units; decays 0.5/s; at >= 5 the first time: `hiss.quiet` callback; at 10: the table "shushes" (the bubble `shush`) and the meter drops to 3.
- Hall metres: `hallMeters += speed*dt/ (viewBox unit per metre = 12)`; stat `cafeteria.hallMeters` updated (rounded) every 5s.

### 7.3 Sitting and the 7.5 second LUNCH (state `phase='lunch'`)
- Sit = release over a free seat / Enter / click on a seat. Refusals first:
  - **Coat seat** (one per table T1-T4, T6): refuse with that coat's line (`coat.*`), stat `cafeteria.refusals`, +1 Meh once per 3s, Charter line, the tray remains held. After the 7th refusal in the session: a coat joins the line (2.6).
  - **T5** Executive Table: refuse (`exec.refuse`), Gerald nods (cameo rules 10.1).
  - **T7**: refuse (`sandra.table`).
  - **Table 7 1/2:** special (7.5).
  - Otherwise: SIT.
- On SIT: the tray goes onto the table; `phase='lunch'`; `lunchT=0`; the Management line `lunch.start`; three real `<button>`s appear under the Hall: **Nod**, **Say 'Interesting'**, **Pass the Salt**. Each press adds hidden Social Heat +1 and shows the table's reply (per-table, per-button lines in `reply.<table>`, section 12.7), rate limit one reply per 600ms (mash: `spam.nod`). A countdown ring (SVG circle stroke-dashoffset updated per frame) and the text "Lunch: 7.5". Lunch time advances by `dt` in the main loop (exactly 7.5s of dt, clamped; selftest uses the same 7.5s virtual).
- Lunch awards: +0.2 per button press (max 5 per lunch).
- **At lunchT >= 7.5 (THE SHIFT):** `phase='shift'` for ~3.5s: `shift` bag line (the table shifts: people stand, swap, one leaves for a napkin and never returns, a new faction arrives: animate seated emoji transforms with CSS and remove one emoji from the table until the lap ends), `api.sfx('bell')`, the **Standing card** prints (HTML card): rows `Standing: Adjacent`, `Belonging: Adjacent`, `Dignity: Adjacent`, each adding one Adjacent-coloured pip to a tray of pips (cap 12 shown; `+N` text after). Awards: `+2 Meh` (api.award 2,'seating'), stat `cafeteria.seatings`, record the seat id in `seatsSet` (cap 31; stat `cafeteria.seats` = size). Then the bell asks you to find a better seat: `bell` line.
- **Return to line:** the bell "ding" (api.sfx('bell')), a fresh empty tray (`trays++`, stat `cafeteria.trays`), the Menu Board advances (9.4), a new dish mutates in (the dish pool slowly becomes more abstract: the Charter strip and tent cards pick a more abstract alias after 3 seatings: e.g. "Soup, Tentative" tent card becomes "Soup, Hypothetical"; apply by a one-line alias table `ALIAS` for soup/meatloaf/casserole: P2), scene switches to the Line, and `pos` resets near station 0.
- **The 9th seating ever in a mount triggers the Closing Bell** (14) early: set `T = max(T, 565)`.

### 7.4 The Seating Charter strip
A one-line parchment strip under the Hall SVG (`aria-live="off"`) that is silently amended every time the tray comes within 45 units of a table: it changes to the next line in `charter` (section 12.8), and the table's own line is appended. It never settles. It is also shown briefly in the refusal toasts.

### 7.5 Table 7 1/2
- The placard cycles through the bag `placard`. Approaching: when the tray centre gets within 21.5 units of the table centre (tray radius + table radius + 7.5), the table SLIDES: `x += 38` (one seat to the right) over 0.4s (CSS transition), wrapping back to x=45 after x > 190 with a fade; `halfAttempts++`; line from `half.slide` (rate-limited 1 per 8s). It can never be reached by chasing.
- **Attempt 7 holds it:** on the 7th sliding approach (counting across the mount), the table stops moving for exactly 7.5 seconds ("out of pity"), the placard flips to `Reserved for: You, 7.5 Seconds Ago`, and its seat can be sat on (Enter/click). Sitting there: line `half.sit`, achievement `cafeteria.reserved` (secret), `api.award(7.5,'table seven and a half')` once, confetti, and the table is "removed as a clerical issue" 4s later (`half.removed`), the lunch proceeds normally (7.5s lunch, shift, Standing, bell) with the 7.5 award only once per session.
- **Closing Bell route:** if the player is in the Hall when the Closing Bell rings, Table 7 1/2 slides to the tray and the placard flips to `Reserved for: Next Employee`; same achievement and +7.5 (once per session).
- **Beat 9 (T>=480):** the placard first reads `Reserved for: Valued Employee` (or `api.player.name`); when the tray comes within 40 units it flips to `Reserved for: Next Employee`; line `placard.late`.

### 7.6 Hall population and details
- Seated emoji change with `lunches`. Names (placards, 6px): Marguerite, Phil, Phil, Other Phil (T4 and T3 after beat 8: "Condiment Border" salt shaker 🧂 in the middle of the table T3/T4: cosmetic). The Interns' placard reads "Interns (confident)".
- Gerald (T5): sits 🥔 nodding (CSS keyframe 6deg). Cameo rules 10.1.
- Applause (P2): at the Closing Bell every seated emoji gets a 👏 pop above it.

---

## 8. CONTROLS SUMMARY (exact; all interactive elements are real `<button>`s except Hall seats which are `<g role=button tabindex=0>` with keydown handlers)

| input | Line | Hall |
|---|---|---|
| Pointer drag on tray/counter | push (velocity from last 80ms) | tray follows pointer (mouse hover, touch drag) |
| Wheel (P2) | impulse | none |
| ArrowRight / D, ArrowLeft / A | shove forward/back (tap 260 px/s, hold cap 520) | walk tray (120 units/s, Shift 200) |
| Space (hold) / TAKE button (hold) | take (hold-to-serve) | sit if tray on a seat |
| Enter on a dish | glide / read label | n/a |
| Enter on a seat | n/a | sit / auto-walk then sit |
| ArrowUp / Ask button | ask Bernadette | n/a |
| ArrowDown | toggle Nutrition drawer | n/a |
| Escape | focus tray | return focus to tray |
| Squeegee toggle + drag on glass | wipe | n/a |
| Wipe all | clears fog 1.2s (cooldown 10s) | n/a |
| Click a dish | read label | n/a |
| Click item then well / arrows on item | rearrange | rearrange (tray card under SVG) |
| Tab order | Line/Hall tabs, Take, Ask, Squeegee, Wipe all, Notebook, Nutrition, dishes (station order), tray items, wells | tabs, seats (DOM order), Nod/Interesting/Salt when visible, tray items |

Touch: `touch-action:none` on the tray and counter band only; targets >= 44px; no hover-only interaction (every hover tooltip also opens on click/tap).

---

## 9. THE BEAT CLOCK AND ESCALATION TIMELINE

### 9.1 Machine
One beat clock `T` (seconds): `T += dt * SCALE` where `SCALE = api.selftest ? 10 : 1`. T pauses while After Hours is active, during `phase='closing'` hold and while a modal ceremony is running only if noted. Keep `beat` derived from T. Every trigger fires ONCE per cycle via a `fired{}` set cleared on reset. `phase` is one of `play | scan | lunch | shift | afterhours | closing | resetting`. `scene` is `line | hall`.

### 9.2 Timeline (T seconds)

| beat | T | name | triggers (all lines in section 12) |
|---|---|---|---|
| 1 | 0 | THE MENU | 0.4 `open.1`; 0.8 drift 14px; 1.6 Menu Board writes special; 2.6 `open.2`; 3.5 Soup label slides in, `open.soup`; 4.5 Gary sigh; 7 `open.3`; 9 `open.push` and the tray pulses once |
| 2 | 20 | THE LADLE | 20 `b2.ladle`; 24 `b2.hold` (TAKE button pulses); 35 fog sentence 1 spawns, Squeegee hint pulses, `wipehint`; 45 if `velCount==0` `b2.velocity` hint; friction differences noticed: first time passing Soup then Jello: `friction.note` |
| 3 | 60 | THE BALANCE | 60 gauge appears, `b3.gauge`, 62 `b3.half`; Gary backward commentary live |
| 4 | 105 | THE REGISTER | 105 fog sentence 2, `b4.register` and the Register zone glows; 150 Hall unlocked regardless (6) |
| 5 | 150 | THE SIT | 150 Hall tab pops (toast) if not yet unlocked; first Hall entry: `hall.first`, Table 7 1/2 noticed (placard) |
| 6 | 210 | THE MENU MUTATES | 210 insert mashed, fish, milk (13->16), `b6.menu`, `b6.steam` (vents now random), 215 Bread Roll starts rolling (P2), `b6.roll` |
| 7 | 300 | SANDRA AUDITS | 300 flyer drops over the Line (a laminated overlay card, dismissible, auto-dismiss after 12s; text 12.5) `b7.flyer`; insert the Compliance Checkpoint (16->17); utensils on tray get `Under Review` tape; fog writes 3 sentences in a row from now; `b7.fog` |
| - | 360 | THE REVIEW | 360 `tuesday.review` |
| 8 | 390 | THE MOSAIC | 390 `b8.cork`; corkboard opens; soup g 6 (`b8.soup`); sentence 13 (14 words) is queued next |
| 9 | 480 | THE BELL | 480 long bell, `b9.bell`; Hall placard `Valued Employee` set; insert tomato, spork, salt, gravy, donot (17->22); `b9.stations`; Gerald stands and nods (Hall if present, else `b9.gerald` line only); servings per container: you |
| 10 | 570 | TUESDAY IS SOUP | 570 the Closing Bell (section 14) |

Beat-gated line carry-over: if the player is in the Hall when a Line-only trigger fires (fog sentence), defer until scene=line (set a pending flag). If a beat fires during `lunch`/`scan`, queue the Management line but still apply state changes immediately (insertions are safe because of the `pos` fix).

### 9.3 Awards (all via `api.award`; never above 50 on one event)
+0.1 per take (0.02 when spammed), +0.3 first label per dish (+0.05 repeats, max 1/3s), +0.5 register, +1 per lap, +1 per new fragment (+0.2 repeats), +0.2 per Hall conversation press (max 5/lunch), +1 per refusal (max 1/3s), +2 per seating, +5 perfect balance (once), +7.5 Table 7 1/2 (once), +1 Half Velocity, +3 After Hours (once), +3 Fasting (once), +7 pea (once), -2 Seconds Fee, +5 Closing Bell. Stats (all prefixed `cafeteria.`): `takes velocity spills laps fragments labels seatings seats refusals trays hallMeters hms donots closings seconds` (seconds = seconds played, incremented once per second by managed interval).

### 9.4 Menu Board, Special and the cycle notch
- Board text bag `special`: "Today's Special: A Special", "Today's Special: A Special (Revised)", "Today's Special: Tomorrow's Special, Today", "Today's Special: The Special Formerly Known As Soup", "Today's Special: Whatever Is Left Of Tuesday". The board advances after each seating. After the Closing Bell the board erases itself (a CSS wipe) and writes `Breakfast (Lunch)`, then settles on `Today's Special: A Special (Again)` for cycle 2, `A Special (Again, again)` for cycle 3, and `A Special (Again) x{n}` after that.
- `cycle = 1 + closings` (saved; capped at 5 for text). Cycle >= 2: Register total reads `one feeling, plus tax, minus yesterday`; Gary becomes Jr. (2.5).
- The soup label says "Servings per container: 1" until beat 9, then "you".

---

## 10. CAST, CROSS-MODULE CALLBACKS, GAGS

### 10.1 Gerald (callback 1)
Gerald sits at T5 in the Hall nodding. When the tray passes within 55 units of T5: if `api.flag.get('metGerald')` is true, he speaks one profound line (`gerald.line`, via `api.say(..., {who:'Gerald'})`), else he only nods and Management says `gerald.nod`. At most one cameo per 4 minutes of real time. At beat 9 he stands, nods at you and sits (`gerald.stand`). In the FASTING secret he stands for the rest of the lap.

### 10.2 The Toaster (callback 2)
Station 6. Pops toast with a short word; ding on entry; Management `toaster` bag when you take. In After Hours it pops a slice that says `still here`.

### 10.3 Sandra from Compliance (callback 3)
Never seen. The flyer (beat 7), the Policy 9.4 tape on utensils, the Checkpoint, a clipboard at T7, and every Seating Charter clause is attributed to Sandra. Clipboard minutes at T7 (bubble bag `clipboard`).

### 10.4 Running gags (summary, details in section 12)
1. The Interrupted Sentence (section 4). 2. The Label That Is The Same Label (the Tuesday percent creeps; Servings per container becomes "you"). 3. Table 7 1/2 (section 7.5). 4. The Coat at every table. 5. Bernadette's "Hm." with tally in notebook (stat `cafeteria.hms`). 6. Hungry Gary. 7. Standing/Belonging/Dignity always Adjacent. 8. The Tray's gauge always "Balanced (Emotionally)". 9. The line is always "now a different line".

---

## 11. IDLE, SPAM, SECRETS AND RARE EVENTS

### 11.1 Idle (any `pointerdown`, `pointermove` (throttled 200ms), `keydown`, `wheel` inside root resets the idle timer; selftest: thresholds below divided by 10)
- **20s:** Management `idle.20` once per idle period.
- **75s: AFTER HOURS** (`phase='afterhours'`, T pauses): the blue-hour overlay (`#1d2a4a` at 55% opacity, 2s fade; flat under reduced motion), the counter stops (v=0, input restores), every dish "turns to face the tray" (CSS: each station's emoji gets `transform: scaleX(-1)` or a tilt toward the tray), Hungry Gary goes home (hidden), steam rises slowly, Bernadette removes her hairnet (CSS class: dots vanish) and leans on the guard. After 3s the soup speaks once: the Soup tent card bubble says `I have been the same soup the whole time.` (also Management line `afterhours.soup`, with `who:'Soup'`). Then the Menu Board lists the player's name: `Employee of the Lunch: {player name}`. Achievement `cafeteria.soup` ("The Soup Was Listening"), +3 Meh once per session. ANY input restores everything (overlay off, hairnet back, Gary back) and says `afterhours.back`.
- **180s (P2):** additionally, chairs go up on tables one by one: small CSS chair divs rotated 180deg appear on the counter and in the Hall every 2s until ~14 are up; any input drops them all with a quiet 'tick' and line `chairs.drop`. In the middle: `chairs.up` once.
- **Long idle in the Hall:** a tiny pigeon? No. Instead the table you are nearest to says `hall.idle` once.

### 11.2 Spam
- **SECONDS FEE:** count TAKE presses (pointerdown/keydown without repeat, including ones ignored by the 140ms rate limit) in a sliding 4s window. At 20+ presses: the Portion Control Bell clangs (`api.sfx('bell')`), Bernadette steps out (add class `m-cafeteria-stepout` to the portrait: scale 1.25 and the ladle raised like a gavel), `api.award(-2,'Seconds Fee')`, a laminated invoice appears: `INVOICE: Seconds of Seconds of Seconds` with a line `Fee: 2 Meh. Applied by Bernadette, personally.`; for the next 4s every take yields a `Seconds #n` item (n increments globally; they show their counter); line `spam.seconds`, achievement `cafeteria.seconds`. If the player reaches 70 presses (within the same window continuing, or a run of 70 presses with gaps < 1s): Bernadette sighs, takes the tray (all items removed), slides it back with exactly one **pea** on it (item "Pea", w 0.1), line `spam.pea`, `api.award(7,'pea')` once per session.
- **Label spam:** reading labels more than 10 times in 6s: `spam.label`, no award.
- **Hall button spam:** more than 6 conversation presses in 4s: `spam.nod`, no award.
- **Wipe spam:** `wipeall.cooldown` (cooldown covers it).
- **Roll spam over stations:** moving v bounces: fine.

### 11.3 Secrets and rares (all must be implemented; at least 3 are P1)
1. After Hours (11.1). 2. Seconds Fee and the Pea (11.2). 3. Fasting (section 6). 4. Seven and a Half of Velocity (3.3). 5. Pudding Skin (3.3). 6. Perfect Balance 0.0 (3.2). 7. Table 7 1/2 (7.5). 8. Dennis promotion (2.3). 9. The Do Not Take station (2.3). 10. The final sentence (4.4 #14). 11. Idle chairs (P2).

---

## 12. ALL FINAL LINES (verbatim)

Implementation: Management lines go through `P.addLines('m:cafeteria:<bag>', [...])` and `api.sayRandom('m:cafeteria:<bag>', opts)` where the bag name below is the heading; tokens `{item}` `{count}` are engine tokens (pass `{item: dishName, count: n}` in opts). Bubble and label strings are local arrays read through a local `bag(name)` shuffle-bag helper (use `api.shuffle`, never repeat the same string twice in a row). Mood hints in parentheses. Unless marked `[bubble]`, `[label]`, or `[card]`, a line is Management via `api.say`.

### 12.1 Opening and beat 1-3
- `open.1` (proud): "Welcome to lunch. Please select from the following items, each of which is almost something."
- `open.2`: "Today's Special: A Special. Tomorrow's Special: Today's Special, but nervous."
- `open.3`: "The menu changes daily, except for the menu."
- `open.drift`: "The line has begun moving on its own. This is a courtesy. You may take over at any time, which we will not notice."
- `open.soup`: "Soup, Tentative. Served warm in the sense that it has heard of warmth."
- `open.push`: "Push the tray by dragging it, or with the arrow keys. The counter will do the rest, reluctantly."
- `friction.note`: "You will have noticed that the soup is slippery and the Jello is sticky. This is not a defect. This is a feel."
- `b2.ladle`: "The ladle has been introduced. It has no feelings. It has a swing."
- `b2.hold`: "Hold TAKE to serve. Release to stop. The serving size is however long you held it, which is a fact about you."
- `b2.velocity`: "Tip: take something while the line is moving. The ladle will scoop air. Air is on the menu. Air is called Velocity."
- `wipehint`: "Tip: the fog is steam. The squeegee is a toggle. Wiping is allowed. Reading is allowed. Finishing is not."
- `b3.gauge`: "Please note the Tray Equilibrium gauge. It reads 'Balanced (Emotionally)'. The tilt is physical. The two are not speaking."
- `b3.half`: "Please note that the tray holds seven whole compartments and one half. The half is not a rumor. The half is a rule."
- `tilt.first`: "Your tray has begun to lean. Per Sandra from Compliance, a tray may lean up to 12 degrees, or one afternoon, whichever comes first."

### 12.2 Dish announcements (`dish` bag; spoken on first stop at each station per cycle; also tent-card tooltip)
- soup: "Soup, Tentative. Served warm in the sense that it has heard of warmth."
- meatloaf: "Meatloaf (Theoretical). Comes with a proof, which is also meatloaf."
- jello: "Jello Cube. It is wobbling under advisement."
- casserole: "Casserole (Contains Casserole). Allergens: also casserole."
- salad: "Salad Bar of Implication: a lettuce-like gesture, a cucumber-adjacent coin, and a tomato that wishes to be consulted."
- pudding: "Pudding (Skin Optional). The skin has declined to comment."
- toaster: "The Toaster offers toast. Only toast. It is warm, and it means 'I am glad you came.'"
- sauce: "Sauce, Source Unknown. Please do not ask the sauce. The sauce is on a break from being asked."
- corn: "Corn (Distributed). It has been shared equally, which is to say none of it reached you in particular."
- sandwich: "Sandwich of Implied Filling. Please do not check. Checking has been discouraged since Lunch Period 2."
- beige: "The Beige Cube. It is warm in spirit and beige in everything else."
- cup: "Pudding Cup, Sealed and Empty. The seal is intact. The emptiness is also intact. Both are guaranteed."
- register: "The Register. A cash drawer made of a muffin tin. It accepts feelings and returns change in weather."
- mashed: "Mashed Potatoes (Not Gerald). Gerald has asked that we stop saying 'Not Gerald' so loudly."
- fish: "Fish Stick, Singular. He is the last of his line, and the line is one."
- milk: "Milk of Uncertain Cow. The cow is pending."
- roll: "Bread Roll. It has rolled away. It is taking the long way to your tray."
- sandra: "Compliance Checkpoint. Please present your tray, your items, and your reasons."
- tomato: "Tomato Who Wishes To Be Consulted. It has been consulted. It wishes to be consulted again."
- spork: "Spork (Flagged). Sandra from Compliance has asked it to choose a side. It has chosen both, in writing."
- salt: "Salt, Reasonably. Reasonably is the amount. We are not taking questions on the amount."
- gravy: "Gravy Boat (Empty). The boat is full of intention."
- donot: "Station 7 1/2: Do Not Take. The sign is the dish."
- `pudding.pop`: "The pudding's skin has popped. It made a small sound, like a very quiet decision."
- `line.different`: "The line is now a different line. Nobody mentions it. The dishes are in a different order and Bernadette has moved one station to the left."

### 12.3 Taking, Velocity, Seconds (bags)
- `take` (use with `{item}` and `{count}`):
  - "You have taken the {item}. The {item} has noted your name and will not be using it."
  - "Tray weight: 0.9 lbs of food and 3.1 lbs of expectation."
  - "One {item}, served. It was on your tray in spirit already. We have simply made it official."
  - "That is {count} takes. The ladle has begun keeping a tally in a language it is inventing."
  - "Serving recorded. The {item} would like it known that it was not consulted."
  - "{item}: taken. Please keep it level. The tray is not responsible for what it is asked to carry."
  - "A portion of {item} has joined your tray. It looks around. It does not love it, but it stays."
  - "The ladle returns to its holster, which is a cup. The cup is unimpressed."
- `take.short`: "That was a sample. We do not do samples. It has been recorded as 'a gesture'."
- `take.long`: "That was a very long serving. The {item} has had time to think. It has not changed its mind."
- `take.adequate`: "That serving was Adequate. The gauge has moved on. It would like you to keep up."
- `take.adjacent`: "You have been served Adjacent {item}. Adjacent is the closest thing we have to arrived."
- `take.adjacent2`: "Bernadette ladled at you without looking. The {item} landed at an angle that the tray is calling 'a lifestyle'."
- `velocity.first` (proud): "You approached the ladle too fast and were served Velocity (0.4 oz). Nutritionally, it is mostly forward."
- `velocity` bag: "Velocity has been added to your tray. It will not stay put, which is its whole personality." / "Another Velocity. Your tray is now 0.4 oz more eager." / "Velocity, {count} of 7. Please do not rush the count. That is exactly what we are serving you." / "You have taken Velocity before. You have not taken it recently, and it noticed."
- `velocity.seven`: "Seven Velocities. Please slow down. We would like you to take exactly one more, at the speed of a held breath."
- `velocity.half`: "A half-portion of Velocity (0.2 oz), drawn at half size, which is how you know it is serious. Seven and a half of Velocity. The counter has a very quiet fanfare and nobody told it to."
- `pudding.skin`: "A Pudding Skin has been issued. It sits on the tray like a small, offended cloak. It cannot be moved. It has said so."
- `seconds.item` [label for the item]: "Seconds" with counter e.g. "Seconds #3".
- `dennis.promote`: "Dennis (Plant) has been promoted. Dennis (Plant) did not attend the ceremony because Dennis is a plant. The Salad station is now called Dennis."
- `dennis.take`: "Dennis is not on the menu. Dennis is on the board. Dennis would like that said again, and has nothing to add."
- `donot.taken`: "You took the Do Not Take. The Do Not Take has been informed. It said 'do not' in a small voice and it was already too late."
- `sandra.nope`: "The checkpoint cannot be taken. The checkpoint takes."
- `toaster` bag: "The Toaster has offered toast. It reads 'sorry'. The Toaster is not sorry about anything in particular. It is sorry in general, which is the warmest kind." / "A slice has popped up that says 'enjoy'. It means it. Toast, but it means it." / "The Toaster says 'welcome'. It says it with its whole slot." / "The Toaster pops nothing, which is a sentence. It is a sentence that says 'still here'."
- `toast.words` [popup text]: "welcome", "sorry", "enjoy", "ok", "warm", "yes", "hello", "glad", "again", "here", "still here", "toast".

### 12.4 Tilt, spill, balance
- `spill` bag ({item}): "The {item} has been reclaimed by the line. It leaves with a small, quiet sound and its dignity partially intact." / "Your tray tilts left. The pudding takes this personally." / "The {item} has slid into a better life. The floor has accepted it. The floor has no comment." / "Lunch Incident #{count}. The {item} has been reclaimed. Please do not take it personally. Take it a little personally." / "The {item} has gone. We observed a moment of silence, and then a longer moment, because someone was still looking."
- `spill.first` (funeral grade): "The first item has left your tray. We gather here, briefly, in the cafeteria, to say a few words about the gravy, which has slid off into a better life. Thank you."
- `overfull`: "Overfull. The tray holds seven and a half items. You asked it to hold eight, and it did not enjoy the word 'asked'. The oldest item has been moved to Seconds."
- `perfect`: "The tray has reached 0.0 degrees. We believe this was an accident. We have signed it anyway."
- [gauge text on perfect]: "Balanced (Physically). Please do not tell the tray."
- [gauge text normally, constant]: "Balanced (Emotionally)"
- `gary.mgmt` bag: "You pushed backward. The line does not allow backward. Hungry Gary, to his credit, allows it, briefly." / "Backward detected. Hungry Gary has been asked to be flexible and has said he is." / "The line has gone backward. Technically it is also a line."
- `glide`: "The tray is gliding to its destination, slowly, as a courtesy to the people who like to watch."

### 12.5 Bernadette and fragments
- `bern.ask`: "Bernadette leans in. Bernadette always leans in."
- `hm` [bubble bag]: "Hm." / "Hm. (Dismissal.)" / "Hm. (Concern.)" / "Hm. (Recognition.)" / "Hm. Not yet."
- `frag` bag: "You have read: '{item}'. It stops there. It has always stopped there." / "Fragment filed under 'Things Bernadette Almost Said'. The folder is getting heavier." / "The steam valve opened at the exact wrong moment. Management notes it has excellent timing." / "Another sentence, interrupted. This is the finest collection of its kind. It is also the only one." / "The sneeze guard fogs. The sneeze guard is loyal to someone." / "Bernadette says 'Nothing.' She says it like she is holding a door shut with it."
- `wipeall`: "Steam cooldown: 10 seconds. Please do not take this personally. The steam does not."
- `wipeall.cooldown`: "The steam is still recovering. It has asked for a minute. It has asked for ten seconds, which is the same minute."
- `b4.register`: "The Register is at the end of the line. It is also at the beginning of the line, if you squint. Please pay at the end."
- `cork`: "Are you keeping a corkboard? On our time?"
- `cork2`: "The corkboard has been reviewed. All the strings lead to the soup. This has been noted, and then immediately denied."
- `b8.cork`: "The notebook has begun sorting itself. Please do not help it. It is doing very well on its own, and the strings are red."
- `b8.soup`: "The soup is now the heaviest thing in the building. This has been the case for some time, but today it is official."
- `b7.fog`: "Bernadette is writing more now. Three sentences in a row. She has chosen to be insistent. The steam has chosen to be on time."
- `hiss.register`: "The steam valve has opened over the register beep. The valve appears to be following you."
- `hiss.quiet`: "A sneeze at the Quiet Table was covered by steam. It was not a sneeze. It was the first half of a word."
- `hiss.gerald`: "Gerald nodded. The valve opened. Gerald did not appear to be affected, which is what worries the valve."
- `hiss.sheepish`: "The valve has given a very small, sheepish hiss. It did it for old time's sake. It would like that not to be discussed."
- `sandra.bern`: "Sandra has asked Bernadette to stop. Bernadette has not been asked in the way that matters."

### 12.6 Register, receipt, seating open
- `register` bag: "Register total: one feeling, plus tax. Tax is also a feeling." / "Please pay at the beginning of the line, where the line begins, for the second time." / "Your tray has been approved by a cashier who scans, weighs, and forgives." / "The Register accepts your feeling. It gives you change in weather. It is partly cloudy."
- `receipt` bag [card lines, cap 12]: "7 1/2 x Moments of Doubt" / "Adjacent Surcharge ........ a nod" / "Item Processing Fee ........ 3 seconds" / "Tray Rental (per Tuesday) ...... 1 sigh" / "Sandra's Review Levy ........ pending" / "Napkin (theoretical) ....... free, not free" / "Ladle Service ........ 2 dignity" / "Bernadette's Silence ........ complimentary" / "Gravy Tax ........ a little more than expected" / "Loyalty Points ........ -4 (loyal to who)" / "Gratuity ........ a feeling, again" / "Forgiveness Fee ........ waived, then re-applied"
- [receipt totals]: `TOTAL: 1 feeling + tax` / `TOTAL: one feeling, plus tax, minus yesterday` / `Total: nothing, plus tax`
- `seating.open` (proud): "Seating: Open (it has always been open). Seating has also always been taken."
- `hall.first`: "Welcome to the Hall. Please carry your tray at a speed that suggests you know where you are going."
- `b4.seating`: "The door marked 'Seating' has opened. It was not locked. It was marked 'Seating' and that was enough."
- `salutes` [bubble]: "I salute the tray. It is light. It is the lightest tray I have seen."
- `fasting` (proud): "Nutritional Void. The cashier salutes. Every table goes quiet. Gerald has stood. Gerald will not be sitting for the rest of the lap. We are all very moved, and have nowhere to put it."

### 12.7 The Hall: conversation, shifts, refusals
- `isanyone` [bubble bag]: "Is anyone sitting here?" / "Yes. Whoever you were about to be." / "Not yet. Soon. Not you." / "It is warm. That is not a yes. It is not a no." / "Someone is sitting here. They are in the napkin line." / "Technically."
- `lunch.start`: "Lunch has begun. It lasts seven and a half seconds. This is the whole of it."
- `reply.T1` [bubble; order: Nod, Interesting, Salt]: "The Stapler's union notes your nod. It was a good nod. It was not union scale." / "'Interesting' is not on the list of demands. It has been added to the list of demands." / "The salt has been passed. The salt has joined the union. The salt wants better lighting."
- `reply.T2`: "An intern nods back with great confidence and no information." / "'Interesting,' says an intern, who did not hear what was said. 'Very.'" / "The Interns pass the salt in a circle for forty seconds, correctly."
- `reply.T3`: "The Quiet Table nods in silence, which is the loudest way to nod." / "You said 'Interesting.' The Quiet Table is now at 9 decibels of disapproval." / "The salt is passed without sound. Nobody has ever heard it land."
- `reply.T4`: "'In my day the soup said something,' someone says, to your nod." / "'Interesting,' they repeat, like the word is a reheated thing." / "'This is not the old salt,' says a man, and holds it for the rest of the lunch."
- `reply.T6`: "The mop nods, which is only the mop being moved by a draft." / "The window has not responded. It is painted." / "The salt is placed in front of the mop, who has not asked."
- `shift` bag: "You sat down and the table stood up. Per policy, this is a 'shift in seating philosophy'." / "Someone from your table has gone to get a napkin. They have been gone for the napkin's entire life." / "A new faction has arrived at your table. It is the same faction, wearing different name tags." / "The table has swapped places with the table next to it. Nobody has moved. The tables have." / "One diner leaves with a neat bow. You may have started this. The record is divided." / "The seat beneath you is now the seat beside you. You are pleased in a way that is not recorded."
- `bell` bag: "You have been asked to find a better seat. There are 31 seats. The correct one is the one you just left. It is warm." / "Standing: Adjacent. Dignity: Adjacent. Belonging: also Adjacent, but closer than last time." / "The bell has rung. The bell is not wrong. The bell is ahead of you by a small, constant amount." / "Lunch is over. Please return your tray to where you got it. You got it from yourself, so it is a short walk."
- `coat.1` (T1): "Request denied. The seat is taken by the Coat of Early Arrival. The coat has been there since 1996 and has seniority."
- `coat.2` (T2): "The seat belongs to the Coat Whose Owner Is Unknown. The owner is unknown. The coat is not worried."
- `coat.3` (T3): "That seat is held by the Coat (Quiet). It is so quiet it is technically a coat-shaped sound."
- `coat.4` (T4): "The Coat That Remembers The Old Soup is seated there. It will not discuss the old soup. It remembers it anyway."
- `coat.6` (T6): "The seat is taken by the Mop. The Mop has been here since the window was painted and is part of the view."
- `exec.refuse`: "The Executive Table is not enterable until Standing exceeds Adjacent. Standing is Adjacent. Standing will remain Adjacent. Please walk adjacent to it."
- `sandra.table`: "Sandra's Table (Compliance). Nobody sits. The clipboard has the seat. The clipboard has the minutes."
- `clipboard` [bubble bag]: "Minutes: lunch was held. Present: lunch." / "Item 1: the seat. Item 2: the seat (cont.)." / "Action: Sandra to review Sandra." / "Sandra has asked Bernadette to stop. Bernadette has not been asked in the way that matters."
- `shush` [bubble]: "Shhh." (The 'shhh' is very loud and violates the Quiet Table's own policy.)
- `hall.idle`: "The nearest table has noticed you standing there with a tray. It is willing to be sat at. It is also willing to be looked at, and would prefer that."
- `hall.walk`: "The tray is being walked to its seat. It is in good hands. The hands are yours, at a distance."
- `coat.line`: "Management notes that a coat has joined the line. It holds no tray. It has seniority."
- `gerald.nod`: "Gerald, at the Executive Table, nods at the mashed potatoes. It is not clear whom the nod is for. It is a family matter."
- `gerald.line` [Gerald, only if metGerald]: "A tray is merely a plate with ambition."
- `gerald.stand`: "Gerald has stood up at the Executive Table, nodded at you, and sat again. Nobody has ever seen Gerald stand. It was fine. It was a lot."

### 12.8 The Seating Charter (strip; rotate in order, loop; each is attributed to Sandra)
1. "Seating Charter, Clause 14(c): persons holding the Wobble may not sit with persons not holding the Wobble, as the Wobble is not a social event."
2. "Clause 14(d): persons not holding the Wobble may sit with persons not holding it, provided they are holding something else."
3. "Clause 22: a seat is a promise made by a chair. The chair has not been informed."
4. "Clause 3(a): the seat you are standing in is the seat you are asked to leave."
5. "Clause 7 1/2: a table of one is a meeting."
6. "Clause 31: there are 31 seats. The correct seat is the one you just left, and it is warm."
7. "Amendment 14(c)(ii): see Amendment 14(c)(i), which was destroyed in 1998."
8. "Clause 14(z): see Clause 14(a). Clause 14(a) does not exist. Sandra has initialled this."

### 12.9 Table 7 1/2
- `placard` [bag, the placard text itself]: "Reserved for: The Missing Sock" / "Reserved for: A Quorum" / "Reserved for: Someone Already Seated" / "Reserved for: You, 7.5 Seconds Ago"
- `half.slide` bag: "Table 7 1/2 is Reserved. Please see the host. There is no host. The host is reserved." / "You came within 7.5 of the table. The table slid one seat to the right. It was not rude about it." / "The table has moved again. It has moved the way a thought moves when you look at it."
- `half.pity`: "That is 7 attempts. The table has stopped out of pity. You have 7.5 seconds. Sit quickly, and with feeling."
- `half.sit`: "You have sat at Table 7 1/2. Nobody has ever sat at Table 7 1/2. It is set for one. It has your name on it, and it is for someone else."
- `half.removed`: "The table has been removed as a clerical issue. You were never there. You were, in fact, there."
- `placard.late`: "Table 7 1/2 now reads: Reserved for Valued Employee. You arrived 7.5 seconds late. The table is very understanding about it."

### 12.10 Beats 6-9
- `b6.menu`: "Management has updated the menu. The menu has been updated to include the things that were already there."
- `b6.steam`: "Steam vents are now random. The steam has been given discretion and is using it badly."
- `b6.roll`: "The Bread Roll has rolled away. Management would like it noted that rolling is not leaving."
- `roll.caught`: "You have caught the Bread Roll. It looks relieved, and also a little caught."
- `b7.flyer` (smug): "Policy 9.4: Sporks Flagged by Sandra from Compliance. Every utensil on your tray is now Under Review."
- `sandra.stamp`: "REVIEWED (PENDING). One of your items has been reviewed. It is pending. It will be pending when you leave."
- `sandra.fork`: "Policy 9.4: no one may eat a fork's worth of anything with a spoon's attitude."
- [flyer card text]: "POLICY 9.4: SPORKS FLAGGED BY SANDRA FROM COMPLIANCE" with the small print "Utensils must be reviewed. Reviews are pending. Pending is a status."
- `tuesday.review`: "We have flagged this percentage for review. The review is Tuesday."
- `b9.bell`: "A long lunch bell has rung and the whole Hall has rotated one seat clockwise. Nobody has moved. The seats have."
- `b9.stations`: "The counter has reached 22 stations. Please enjoy the new stations. They are the old stations, but more."
- `b9.gerald`: "Somewhere, in the Hall, Gerald has stood and nodded at nobody. It has been entered into the record as 'at you'."
- `gary.jr`: "Hungry Gary has become Hungry Gary Jr. This is not a promotion. It is a continuation."

### 12.11 Idle, After Hours, chairs
- `idle.20`: "Management notes you are standing very still. The soup is concerned."
- `afterhours.soup` [who: Soup]: "I have been the same soup the whole time."
- `afterhours.1`: "It is quiet. The cafeteria is blue. Management is not lonely. Management has simply noticed the blue."
- `afterhours.gary`: "Hungry Gary has gone home. He left a note. The note says 'Same time tomorrow?' and then, smaller, 'Is there a tomorrow?'"
- `afterhours.board` [board text]: "Employee of the Lunch: {player}"
- `afterhours.back`: "Welcome back. Everything is as you left it, except warmer and also blue."
- `chairs.up`: "A chair has gone up on a table. Then another. Please do not tell them the shift is over. It has been over."
- `chairs.drop`: "The chairs have come down. They did it quietly. They would like it noted that they did it for you."

### 12.12 Spam
- `spam.seconds`: "Portion Control Bell. A second helping has been charged to the account of the first helping."
- `spam.step`: "Bernadette has stepped out from behind the guard holding the ladle like a gavel. Please slow down."
- `spam.invoice` [card]: "INVOICE: Seconds of Seconds of Seconds" / "Fee: 2 Meh. Applied by Bernadette, personally."
- `spam.seconds2`: "You have taken Seconds of Seconds of Seconds. The tray is now a form of testimony."
- `spam.pea`: "A pea. Please pace yourself, hon."
- `spam.pea2`: "Bernadette has sighed, taken the tray, and politely slid it back with exactly one pea on it. The pea is warm. The pea is a message."
- `spam.label`: "You have read that label a number of times. It is the same label. It has become a little different out of politeness."
- `spam.nod`: "The table has run out of reactions to nod at. It has started to nod at the nodding."

### 12.13 The Closing Bell (see 14)
- `end.1`: "Lunch is concluded. Lunch has been very well attended by you. Please return your tray."
- `end.2`: "Every table applauds politely. Gerald stands, nods, and sits. The soup is, for the first time, not being asked to explain itself."
- `end.plaque` [plaque text]: "Cafeteria of Almost Food: Closed. Reopening: Now."
- `end.board` [board text]: "Breakfast (Lunch)"
- `end.3`: "Management congratulates you sincerely on the 4,000th lunch you have not yet had."
- `end.reset`: "The Special is now 'A Special (Again)'. The register total is 'one feeling, plus tax, minus yesterday'. Hungry Gary has become Hungry Gary Jr. Nothing is won. Nothing is lost."
- `end.coat`: "A coat has sat down first. It is eating nothing at Table 2 with perfect posture. It has seniority."
- `end.valve`: "A very small hiss was heard from off-screen. It was an apology. It was received."
- `end.noach`: "The achievement for finishing does not exist. We checked. We also checked whether we had checked."

### 12.14 Engine categories to ALSO register (`P.addLines`)
- `moduleEnter`: "Cafeteria of Almost Food. Please take a tray. The tray has already taken you."
- `moduleExit`: "You have left lunch unfinished. Lunch has not noticed. Lunch never notices."
- `tip`: "Tip: hold TAKE longer for a bigger portion. Hold it shorter for a gesture. Neither is lunch." / "Tip: the soup is slippery and the Jello is sticky. Bernadette is somewhere in between." / "Tip: wipe the fog. Read the sentence. Do not expect the end."
- `ticker`: "BREAKING: Cafeteria reports 4,000 lunches not yet had. Sources: lunch." / "Bernadette declines to comment on the soup. Steam declines to comment on Bernadette." / "Table 7 1/2 'Reserved', again. Sources close to the table say it moved." / "Percent Daily Value of Tuesday reaches 112. Management calls the number 'a lot of Tuesday'."
- `award`: "You have been awarded {meh} Meh for lunch. Lunch has been informed. Lunch has not responded."

### 12.15 Label generator content
**Serving size** bag [label row]: "1 ladle (the ladle disputes this)" / "1 reasonable amount of regret" / "1 portion, spiritually" / "7 1/2 grams, give or take a mood" / "1 tray's worth, per tray" / "1 forkful (a fork is on its way)" / "1 afternoon, sliced" / "whatever fits in the sentence"
**Calories**: "Calories: 140, give or take a mood" / "Calories: enough" / "Calories: not too many, not too few" / "Calories: 0 (see Tuesday)" / "Calories: a number, in a trench coat" / "Calories: 4 minutes of reflection" / "Calories: pending approval" / "Calories: on loan"
**Does not contain**: "Does not contain: the other 4 minutes" / "Does not contain: closure" / "Does not contain: a Wednesday" / "Does not contain: what you hoped" / "Does not contain: any of the above" / "Does not contain: Gerald (confirmed)" / "Does not contain: a decision" / "Does not contain: seconds"
**Allergens**: "Allergens: the wrong decade" / "Allergens: eye contact" / "Allergens: mild interest" / "Allergens: also allergens" / "Allergens: sometimes the wrong Tuesday" / "Allergens: none, but it has opinions"
**Footnote** (always starts with `*`): "*See Form 27B/6." / "*Continued on the back. The back says 'see front'." / "*Footnote destroyed in 1998." / "*Per Sandra." / "*Not applicable after the feeling." / "*Ask Bernadette. She will say 'Nothing.'" / "*Daily Value is a number nobody agreed on." / "*The asterisk is also an ingredient."
**Dish-specific**: `[Contains, Philosophy line]` per dish (the philosophy line alternates [0],[1] across rereads; the Contains row uses a fixed string):
- soup: Contains "warmth (alleged), a lesson, a bay leaf of unclear intent" / "The soup is a question the bowl has been asked for years." / "Soup is only soup when someone agrees to call it that, and no one has been home."
- meatloaf: "a proof, a second proof, loaf" / "Meatloaf is a theory that has been cooked long enough to count." / "To eat the meatloaf is to accept the theory. To refuse is also to accept it."
- jello: "wobble, resolve, a rumour of fruit" / "The Jello is not unsure. It is merely shaking from the weight of being certain." / "Everything wobbles. The Jello simply has the decency to be seen doing it."
- casserole: "casserole, and a smaller casserole" / "The casserole is the casserole's own reason." / "What is in the casserole is a matter between the casserole and the casserole."
- salad: "a gesture of lettuce, an idea of tomato" / "A salad is the cafeteria's way of asking if you are sure." / "Leaves are the earth's way of suggesting you take a minute. The salad has taken eleven."
- pudding: "skin (optional, unrequested), a spoon's worth of wait" / "The skin is the pudding's way of keeping its own counsel." / "Pudding is just patience that agreed to be eaten."
- toaster: "bread, heat, the sentence 'I am glad you came'" / "Toast is a warm way of saying it is nearly time." / "The toast says what the Toaster cannot, which is everything, in a very small amount."
- sauce: "sauce, source unknown, intent unknown, temperature known" / "The sauce is a source the sauce has not named." / "You do not ask the sauce where it is from. You ask where it is going. It does not know either."
- corn: "kernels, in a fair distribution" / "Every kernel has been treated equally. Not one of them knows how that felt." / "The corn was shared. It was shared in the way weather is shared."
- sandwich: "bread, bread, and a considered silence" / "The filling is implied. So is the rest of lunch." / "A sandwich is a promise made by two slices, to a third thing, in good faith."
- beige: "beige, beige, and a beige that was not in the plan" / "The cube is beige in the way that a Tuesday is beige." / "There is no bad beige, only beige that was not asked how it was feeling."
- cup: "a seal, an emptiness, a small guarantee" / "The cup is full of wait, which is a thing that weighs nothing and lasts." / "To be sealed and empty is to be exactly what you said you were. That is rare."
- mashed: "potato, restraint, a name that is not Gerald" / "A mash is a vegetable that has been asked to reconsider everything." / "Gerald is not in it. That is what makes it Gerald-adjacent."
- fish: "one fish, shaped like a stick, in a line of one" / "The fish stick is the last of the fish stick. It is dignified about it." / "A single stick is a trend nobody wanted to start."
- milk: "milk, from a cow that is pending" / "The cow has not been confirmed. The milk has been, which is the problem." / "Whole milk is the cow's way of being specific. This one is vague, and kind."
- tomato: "tomato, a wish, a request to be consulted" / "The tomato wants to be consulted. The tomato has been consulted. It is thinking." / "The tomato is a fruit that refused to be told."
- spork: "a spoon's attitude and a fork's ambition" / "A spork has chosen both and signed neither." / "Under Review is a place a spork can live for a very long time."
- salt: "salt, reasonably" / "Reasonably is the amount of salt that makes a person feel seen." / "Salt is how the soup knows it was meant."
- gravy: "intention, a boat, a long wait" / "The boat is empty. The gravy is somewhere better." / "Gravy is a sauce that has made peace with the plate."
- donot: "do not, do not, and a quieter do not" / "Do Not Take is a dish. It is the only dish that is honest about it." / "Some things are placed in front of you so you can say no and be seen saying it."
- Percent Daily Value of Tuesday row text: `% Daily Value of Tuesday: NN%` (bold).

---

## 13. ACHIEVEMENTS (all ids prefixed `cafeteria.`; declare with `P.addAchievements`; >= 6, of which >= 2 secret; this list has 12, 7 secret)

| id | name | desc | icon | secret | reward |
|---|---|---|---|---|---|
| cafeteria.marshal | Grand Marshal of the Almost Cuisine | Read the Nutrition Facts of every dish at least once. Nobody feels more informed. The Percent Daily Value of Tuesday has been recorded. | 🏅 | no | 3 (check: stats['cafeteria.labels']>=12) |
| cafeteria.velocity | Order of the Velocity, Third Class (Technically Fourth) | Take Velocity for the first time by approaching the ladle too fast. You are 0.4 oz faster than you were. | ➡️ | no | 1 |
| cafeteria.chancellor | Chancellor of the Seating Arrangement | Sit at 10 different seats in the Hall. Each seat was warm. Each was wrong. The table has accepted your resignation from it. | 🎓 | no | 4 (check: stats['cafeteria.seats']>=10) |
| cafeteria.hiss | Keeper of the Sacred Hiss | Read 12 different things Bernadette almost said. Not one finished sentence among them. This is the finest collection of its kind. | ♨️ | no | 4 (check: stats['cafeteria.fragments']>=12) |
| cafeteria.tuesday | It Was Always Tuesday | Reach the Closing Bell. The soup was Tuesday. It was always Tuesday. It is now somebody else's Tuesday. | 📅 | no | 5 |
| cafeteria.balanced | The Tray That Balanced Physically (Do Not Tell The Tray) | SECRET: Hit exactly 0.0 degrees of tilt. Management says it was an accident and signs it anyway. | ⚖️ | yes | 5 |
| cafeteria.reserved | Reserved Forever, Technically 7.5 Seconds Ago | SECRET: Sit at Table 7 1/2. The placard has your name on it, and it is for someone else. | 🔖 | yes | 7.5 |
| cafeteria.soup | The Soup Was Listening | SECRET: Leave the line alone until it goes blue. The soup spoke once, softly. It has not done so since. | 🍲 | yes | 3 |
| cafeteria.nothing | The Grand Order of Nothing On A Tray | SECRET: Reach the register with an empty tray. The cashier saluted. Gerald stood. | 🍽️ | yes | 3 |
| cafeteria.seconds | Seconds of Seconds of Seconds | SECRET: Take faster than a ladle can lawfully ladle. Bernadette stepped out. She was calm. It was worse. | 🔔 | yes | 3 |
| cafeteria.half | Seven and a Half of Velocity | SECRET: Collect Velocity 7 times, then one more at a standstill. A small fanfare was heard. It had not been told to start. | 🌬️ | yes | 7.5 |
| cafeteria.skin | A Small, Offended Cloak | SECRET: Receive the Pudding Skin. It sits on the tray. It will not discuss it. | 🥣 | yes | 2 |

There is no achievement for completing the loop beyond `cafeteria.tuesday`; the ending says so (`end.noach`).

---

## 14. THE NOT-ENDING: "The Closing Bell"

Trigger: T >= 570 (selftest scale gets it in about 57 virtual seconds), OR the 9th seating of the mount (sets T to at least 565 so it fires within seconds), or when `closings` already > 0 and the next 570 comes round. Phase `closing`. Any open lunch is allowed to finish its 7.5 seconds first (if `phase==='lunch'` or `'shift'`, defer by up to 11 seconds). Sequence (use a small timeline list advanced by `dt` so reset/destroy cancels everything, or `api.setTimeout` with an `epoch` token):
1. t0: the Closing Bell: `api.sfx('bell')` x3 (spaced 0.5s). Management `end.1`.
2. t0+1s: Bernadette finishes her sentence in 20px letters across the fog area: `The soup was Tuesday, hon. It was always Tuesday.` The fog does NOT cover it (set `fogLock=true`, clear the fog to 0 in the glass). The valve opens (puff) and the fog stays gone. Notebook gets sentence 14 and the gold star in its margin. `api.award(5,'closing bell')`, achievement `cafeteria.tuesday`, `api.confetti()`, `api.sfx('fanfare')`.
3. t0+4s: every table applauds politely (a 👏 pop above each seated emoji; in the Line scene an overlay row of emoji claps behind the tray), Gerald stands, nods, sits. `end.2`. If scene is Hall: Table 7 1/2 slides to the tray and flips to `Reserved for: Next Employee` (secret achievement, once).
4. t0+7s: chairs go up on tables (CSS chairs rotate and stack along the counter and in the Hall), the blue-hour overlay fades in, a plaque appears: `end.plaque`; the Menu Board erases itself (CSS wipe) and writes `end.board`. The counter slowly pulls the tray back to station 0 (tween `pos` to 0 over 3s, `v=0`). Management says `end.3`. A coat sits first (`end.coat`).
5. t0+11s: a tiny hiss off-screen (`end.valve`; `api.sfx('tick')` very small).
6. t0+13s (`phase='resetting'`): reset EVERYTHING one notch more elaborate: `cycle++` (and save `closings++`), stat `cafeteria.closings` +1, T=0, `fired={}`, stations back to the 13 start stations (the roll removed), friction table restored, soup g back to 4, empty tray, laps 0, `seatings` count for the 9th-seating rule reset to 0, `velCount` 0, the Charter back to line 1, fog cleared and regrowing, hall state reset (Gerald sits, coats seated, table 7 1/2 back at x=45), Gary becomes Jr. (cycle >= 2), the Board shows `Today's Special: A Special (Again)` (9.4), the Register total changes, overlay fades off, chairs drop. `end.reset` (proud). 6s later `end.noach`.
7. The Line resumes at station 1. Nothing is won. Nothing is lost. The module loops forever, with the final valve hiss returning once every few minutes (`hiss.sheepish`).

---

## 15. VISUAL DESIGN

**Palette** (CSS vars on `.m-cafeteria-root`, dark outlines `#2b2a33`, thick 3px, hard offset sticker shadows `4px 4px 0 #2b2a33`, as in the Lobby): cream tile `#f3ead2`, mint counter `#a8c9a0`, tray steel `#c9ced3` with shadow `#8f979e`, mustard `#d9a62e`, coral `#e8756a`, lilac `#b8a6d9`, soup-gray `#8c8f86`, blue-hour `#1d2a4a` at 55%, fog `#ecefee`. Institutional-cafeteria-cheerful. System rounded fonts for headings, a condensed stack for labels, an italic cursive stack for the whiteboard and Bernadette's glass.

**Dark mode**: not required (Lobby is cream). Honour `prefers-reduced-motion` (no blur, no bobbing, static steam, flat fog fade, tilt instantaneous).

**Layout widths**: >= 900px: counter band on the left 2/3 + Bernadette's glass at its right, nutrition card as a right column. 560-900px: nutrition card as a collapsible drawer beneath the tray, Bernadette's glass beneath the counter. < 560px: the drawer becomes a bottom sheet (`position:fixed` is fine inside `.pm-root`), hall seats >= 44px, tray and dishes scale with `--u` = clamp(10, rootWidth/100, 14) px. At 360px there must be no horizontal page scroll (the strip scrolls, the page does not).

**Tricks** (CSS-first): the Tray: steel with inset box-shadow and two highlight strips; wells as `display:grid` with 3px dark borders; the half well as `grid-row` height 50%. The sneeze guard: semi-transparent white-to-transparent gradient with a diagonal highlight. Steam wisps: `::before` blobs with `filter: blur(6px)` and a `translateY` keyframe (pointer-events none, disabled for reduced motion). The fog canvas is image-rendering: auto, absolutely over the glass text. The whiteboard marker font: italic system cursive stack; the special line uses a hand-drawn underline. Particles (crumbs, puffs) capped at 40 DOM nodes (pool and reuse). Parallax P2: tile background scrolls at 0.4x of `pos`; dishes 1x; a faint ceiling-light row at 0.15x.

**Emoji** (all <= Emoji 12): 🍲 🥣 🍞 🥔 🥗 🍮 🐟 🌽 🥛 🥄 🍴 🧂 🥪 🍅 🥫 ➡️ 🧍 🙂 😐 🧐 🥸 😶 🤓 😑 🍖 🥘 🍘 🥤 🧁 🍯 🚫 📋 🧥 🧹 💂 👏 🌿 ♨️. Run `node tools/lint.js games/cafeteria.js` and swap anything it flags. No emoji spam in jokes (emoji appear only as sprites).

---

## 16. IMPLEMENTATION HINTS

1. File structure: header comment `/* POINTLESS module: cafeteria */`; `P.injectCSS(..., 'css-cafeteria')` (one template literal, ALL classes `m-cafeteria-*`, keyframes `m-cafeteria-*`); `P.addAchievements`; `P.addLines` for each Management bag; local data (STATIONS table, SENTENCES, LABEL bags); `registerModule({id:'cafeteria', ... mount(root, api){...}})`. Keep every constant at the top of `mount`.
2. ONE main loop: `api.requestAnimationFrame(function frame(){ ... api.requestAnimationFrame(frame); })` using `api.now()`; `dt = Math.min(0.05, (now-last)/1000)`; if `dt<=0` skip. All systems (`pushStep, take, tilt, fog, beats, idle, hall, scan, lunch, ceremony`) are functions called from `tick(dt)` in order. No per-station or per-item timers. `api.setTimeout` only for tiny cosmetic fades and 1-shot UI (and capture `epoch`).
3. A `phase`/`scene` machine and an `epoch` counter incremented on `resetAll()`; every deferred callback captures `epoch` and bails if it changed. Beat triggers use `fired` (object). `resetAll()` clears timelines, `fired`, held keys, pointer state, `fogLock`, timers handles.
4. Number hygiene: helper `num(x, d)`; `clamp`; every `style.transform` is built via a helper that checks `isFinite`. Never print `undefined`: `fill()` helper with defaults for local `{}` tokens; strings passed to `api.say` are checked by the fuzz harness (words `NaN`, `null`, `undefined`).
5. Writes: update DOM only on change (cache last transform string per node); station nodes: cache `x` rounded to 0.5px; tray tilt text updated at 10Hz; labels replaced via `textContent`, not recreated each frame.
6. Shuffle-bag helper: `const bags={}; function bag(name,arr){ ... api.shuffle ... never same twice ... }`.
7. Keyboard: a single `keydown`/`keyup` pair via `api.on(document,...)` BUT ONLY act if the event target is inside `root` (`root.contains(e.target)`) or `document.body` while the module is focused-active (track `hasFocus` via `focusin`/`pointerdown` on root). Ignore keys with `ctrlKey/metaKey/altKey`. Space/Enter rule in 2.4. On `blur`, `visibilitychange` clear key state and any held-TAKE.
8. Pointer: one `pointerdown/move/up/cancel` set on the root with a `mode` discriminator (`push | wipe | none`); capture in try/catch; `touch-action` only on the elements that need it.
9. A11y live region: a hidden `aria-live="polite"` div (visually-hidden CSS) that receives (a) the tray state when it changes meaningfully ("Soup picked up", "Tilt 8.3 degrees") at most once per 1.5s, (b) fog sentences only AFTER they have been read (never the hidden word), (c) Hall status ("Lunch: 4 seconds"), (d) beat announcements. Use `textContent`.
10. Selftest hooks: `SCALE = api.selftest ? 10 : 1`; idle thresholds divided by 10 in selftest; the Closing Bell hold timings stay real-time but the beat clock scale carries the module to the ending within the fuzz run; the 7.5s lunch stays 7.5s of dt. Make sure the final ending and `resetAll` run cleanly at least once (fuzz sees them).
11. DOM caps: receipt 12 lines, notebook 24 entries, bubbles <= 6, particles <= 40, stations <= 22 + roll, Hall seats fixed 31, coats <= 6, chairs-up forest <= 14, toasts via engine.
12. Hall coordinates: viewBox math `x = (clientX - r.left)/r.width*400`, `y = (clientY - r.top)/r.height*300` with `r` read fresh. Because `preserveAspectRatio=meet` letterboxes when the box aspect differs, compute the scale as `s = Math.min(r.width/400, r.height/300)` and offset by the letterbox: `ox = (r.width - 400*s)/2`, `oy = (r.height - 300*s)/2`; `x = (clientX - r.left - ox)/s`.
13. Save blob via `api.save.set('s', {...})` (<= ~4KB): `{laps, seatings, closings, frag:[idx...], labels:[ids...cap 40], vel, seats:[ids...cap 31], flags:{tableHalfSeen, metBernadetteFullSentence}}` debounced (at most once per 2s) and in `destroy()`. `api.flag.set('cafeteria.closed', true)` after the first Closing Bell (for lobby callbacks).
14. `api.setTitle('Cafeteria of Almost Food')` at mount. Do not touch document/body/head; do not use `Math.random`, `Date.now`, `performance.now`, `setTimeout`, `alert`, `innerHTML` (use `api.el`).
15. First paint must contain the premise (Menu Board, counter with at least 5 stations visible, tray, Gary, Bernadette's glass fogged, the Take button) and Management speaks at 0.4s with no input.
16. Fuzz safety: the fuzzer presses everything, including TAKE hundreds of times (Seconds Fee and pea will fire; make sure the tray removal path is safe), clicks wells with no selection, presses Enter on seats while the tray is elsewhere, resizes, and toggles visibility; every handler must tolerate impossible states (no item selected, no sentence active, no coat found).
17. The Quiet Table silence meter and the tilt/spill logic must also work in the Hall with zero items.
18. `api.say` pacing: gate Management chatter with `sayGate(minMs)` (priority 0 chatter at most one per 6s; beat triggers priority 1; secrets priority 2). Never call `api.say` in a loop or inside the frame function without a gate.

---

## 17. RISKS: the 5 most likely implementation bugs

1. **The fog never comes back (or never clears).** Regrowth by stacking low-alpha `fillRect`s stalls from 8-bit quantisation; pointer-to-canvas mapping uses a cached rect or the CSS size instead of the 160x90 grid; `getContext` null in headless; the sentence is "read" instantly because the whole glass was cleared by Wipe all, or never because the detection samples the wrong area. FIX: the `Float32Array` model in 4.2, fresh `getBoundingClientRect` per event, a null-ctx guard, detection sampling only the sentence area, and one `putImageData` only when dirty.
2. **Wrap/loop math on the counter.** Negative modulo, `pos` crossing the seam, nodes flickering or doubling at the wrap, zones detected twice at the boundary between station L-1 and 0, and an insertion shifting the tray onto a different station mid-hold. FIX: `wrapDelta` with positive modulo, `pos` always normalised into `[0,L)` after each integration, `floor(pos/220)` with an explicit `% n`, apply the `pos += 220*k` fix on every insertion, and treat the Register as always last.
3. **Input conflicts and stuck input.** Space triggers both a take and a button click (or scrolls the page); arrow keys push while a tray item is focused for swapping; a held key or held TAKE never releases after blur, a hidden tab, a scene switch, or a `pointerup` that lands elsewhere; the fuzzer's synthetic `pointerup` without `pointerdown`. FIX: the Space rule in 2.4, keydown/keyup tracking with clears on blur/visibilitychange/mode change, a single pointer mode state with safety release (a hold longer than 3s without events is cancelled), and `setPointerCapture` in try/catch.
4. **Overlapping phases and the ending/reset.** The Closing Bell, a scan, a lunch, After Hours and a pending fog sentence all active at once leave orphan DOM (a stuck invoice, plaque, blue overlay, forest of chairs), or fire after `resetAll()`, or After Hours pauses T forever because input never arrives; the 9th-seating early trigger fires mid-lunch; `fired{}` not cleared so Cycle 2 has no beats. FIX: one `phase` machine, `epoch` tokens, deferring the Closing Bell until lunch/shift finishes, ANY input restoring After Hours, and a `resetAll()` that is the only path to the start state (also what the fuzz exercises through the scaled beat clock).
5. **Tilt, spill and balance feedback (NaN and false events).** Division by zero or `NaN` in the spring when dt is 0 or huge; removing items while iterating; the same item reclaimed twice; `balanced` firing on an empty or one-item tray; `selected` item index stale after a spill or the pea tray-wipe; overfull logic leaving holes (undefined) in the wells array so the label shows `undefined`. FIX: fixed-size `wells` array of `null|item` with helper functions only (`put`, `remove`, `swap`, `firstFree`), dt clamp, `num()` on every physics output, the `>= 2 items` and `0.6s dwell` rule for the 0.0 event, and clearing `selected` whenever the wells array changes.

Also watch: line count (apply the BUDGET RULE), DOM growth (receipt, notebook, particles), two `api.say` floods when the fuzz scale of 10 fires beats rapidly (gate them), and the first ten seconds (the opening must work with zero input).

---

## 18. ACCEPTANCE CHECKLIST (builder, before reporting)

- `node tools/lint.js games/cafeteria.js` clean (>= 6 achievements, >= 2 secret, id = filename, no unprefixed stats, no forbidden emoji, no raw timers, line count <= 1800).
- `node tools/selftest.js cafeteria` PASS with seeds 1 and 2 and `--real` once; the fuzz run must reach the Closing Bell and the reset at least once.
- `node tools/shot.js cafeteria --width 360` and `--width 1100`: counter strip, tray, Bernadette's glass and label card all visible; no horizontal page scroll; Hall at both widths (`--actions` can drive it, or temporarily default scene via a `?`-free test hook is NOT allowed: use real clicks via fuzz actions).
- First 10s: `open.1` at 0.4s with no input; drift; Soup label; Gary sigh.
- >= 100 distinct lines present (this brief has ~250), >= 3 callbacks (Gerald via `metGerald`, Toaster, Sandra), >= 3 secrets, idle (After Hours) and spam (Seconds Fee and pea) implemented, the not-ending implemented.
- Report back: what P2 features were cut for budget and the final line count.
