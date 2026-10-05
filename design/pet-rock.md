# DESIGN BRIEF: Pet Rock: Hardcore Mode  (module id `pet-rock`)

Builder: you need only SPEC.md, VOICE.md and this file. Output: ONE file `games/pet-rock.js` (<= ~1800 lines, vanilla JS, classic script, no external anything). This brief merges three pitches and cuts what is not buildable. Where this brief and a pitch disagree, this brief wins. Where this brief is silent, follow SPEC.md section 5.

Registration skeleton:
- `id: 'pet-rock'`, `title: 'Pet Rock: Hardcore Mode'`, `tagline: 'His needs are all at 100%. Please begin.'`, `icon: '🪨'`, `category: 'game'`, `unlockCost: 0`, `tags: ['care sim','rock','diary']`.
- All CSS classes `m-pet-rock-*`. All stats `pet-rock.*`. All achievements `pet-rock.*`.
- Module lines via `P.addLines('m:pet-rock:<cat>', [...])`, read with `api.line(...)` / `api.sayRandom(...)` (the engine avoids immediate repeats). IMPORTANT: the engine substitutes tokens `{player}` `{meh}` `{module}` `{count}` `{item}` in lines. This brief uses `%N`, `%FAV`, `%P`, `%S`, `%NAME`, `%M` (percent tokens) for module-side substitution, done with a tiny `fill(str, map)` helper AFTER `api.line()`. Never leave a `%X` token unreplaced (see Risks).

---

## 1. CONCEPT

You adopt a rock. His name defaults to **Clive** (renamable on the Adoption Certificate). Management informs you that **Hardcore Mode** means his needs must be met around the clock. His needs are all at 100%, have been since "Before", and cannot move. Every feed, walk, hug and tuck-in is logged as a delta of +0.000. Management treats this as a crisis it is calmly managing. Meanwhile Clive keeps a **diary** that grows quietly, ruinously profound, and every entry ends with a P.S. about **moss**.

Tone: total sincerity. Clive is never wrong, never changes, never suffers. The player is the only one at the facility who might not be fine. Over about 10 minutes the module runs the VOICE arc: normal -> weird -> bureaucratically unhinged -> strangely touching -> back to normal like nothing happened. Then it loops forever (the not-ending).

Pillars (cut anything that does not serve one):
1. **The Zero Delta** (running gag 1): every action prints a delta that is always zero, with escalating ceremony.
2. **Moss** (running gag 2): every diary entry's P.S.; pays off at Entry 12 and on every graduation.
3. **"Clive is fine"** (running gag 3): ends every alarm, then leaks into other contexts, then becomes a eulogy, then becomes quiet and personal.
4. The diary is the real game. The care verbs are how you earn pages.
5. Weird behavior is rewarded (idle, spam, resize, naming, padlock).

---

## 2. LAYOUT (desktop >= 900px; stacks below 640px)

Root `.m-pet-rock-app` is a CSS grid, 2 columns: LEFT (~57%) and RIGHT (~43%).

LEFT column, top to bottom:
1. **Habitat** (`.m-pet-rock-habitat`, aspect-ish 4:3, min-height 260px). Contents back to front: sky/parallax layers (4 absolutely positioned layers), a CSS desk lamp at top-left casting a conic-gradient cone of light, the doily (radial-gradient rings, scalloped look via `repeating-radial-gradient`), **Clive** (inline SVG) centered on the doily, the Crumb Reserve (absolutely positioned crumbs/snacks beside him), an SVG overlay for the leash, the weather layer (rain drops), the night overlay (for Tuck In / Bedtime), the moss cells on his shoulder. A small **clock-sun** in the top-right corner: a round clock face whose hands spin the wrong way (Lobby motif), purely CSS.
2. **Delta Ticker** (`.m-pet-rock-ticker`): monospace strip, blinking cursor, max 6 lines (oldest dropped). Format of each line is in section 5.
3. **Vitals Strip**: six SVG semicircle gauges (Hunger, Energy, Mood, Hygiene, Purpose, Stoneness). Each: needle pinned at 100 (rightmost), a mint badge `STABLE`, tiny rotating caption, a `title` tooltip. Later up to three more gauges slide in (Vibes, Gravitas, Tuesday Readiness). Wellness dial (see below) sits at the end of the strip.
4. **Care Bar**: row of five chunky real `<button>`s with emoji and keyboard hints: `🧁 Feed (F)`, `🦮 Walk (W)`, `💗 Support (S)`, `🧻 Tuck In (T)`, `📖 Diary (D)`. A sixth button `Ask Clive How He Is Doing` is added at 6:30 (Inversion). Buttons are >= 48px tall, with a thick shadow, a press-down effect, visible `:focus-visible` rings. Locked buttons are real `<button disabled>` with a lock emoji in the label and `aria-disabled`.

RIGHT column, top to bottom:
1. **Status Panel**: "Care Hours Logged: 0.0", "Incidents: 0", **Needs Imminent** badge (appears 0:40), **Attention Debt: 0** (appears 0:40), **Care Goal** Zeno bar (appears 0:40), **Care Certification** rank line, and the **Hourly Care Schedule** (five static rows `Feed | Due: now | Last done: now`, appears 0:40).
2. **Diary** (`.m-pet-rock-diary`): lilac cover with a decorative 🔒 padlock that opens with a small click animation; open state shows a cream page with ruled lines (`repeating-linear-gradient`), handwriting font stack `'Segoe Script','Bradley Hand','Comic Sans MS',cursive`, the P.S. in a smaller slanted style, Prev/Next buttons, page indicator `Entry N of 13`, a `Read aloud` button (slow typewriter, no sound), a heart toggle `♡ Favorite page`, and a moss tally corner (green dots). Page flip: CSS 3D `rotateY` transition on a single page element (~450ms). Under `prefers-reduced-motion` the flip becomes an opacity crossfade.
3. **Album** (only after the first Photo Day): a polaroid strip of identical frames (max 12) with captions.

Mobile (< 640px): single column order: Habitat, Ticker, Vitals (2-col grid), Status Panel, Diary, Album. Care Bar is `position: sticky; bottom: 0` inside root with a cream background and top border. Tap targets >= 48px. Works from 360px to 1400px; no horizontal scroll.

**Wellness Index dial**: SVG half-circle dial, needle drawn pointing at 100 and never rotated. A flag tab beside it reads `Target: 101%` (Management nudges it; each loop it goes up by one). Dial "shudders by 0 pixels" in Tuesday phase (it is a CSS animation with `translateX(0px)`; that is the joke).

---

## 3. CLIVE (the rock) AND VISUALS

Palette (CSS custom properties on `.m-pet-rock-app`): cream `#fff4d6` / paper `#fbf1dc`, ink `#2b2433` (3px outlines), rock slate `#8e9aa6`, highlight `#b7c1cb`, shade `#5e6a77`, mint `#9ee6c3`, coral `#ff8a78`, mustard `#f2c14e` (lamp glow, ribbons), lilac `#bfa8f0` (diary cover), moss `#7aa07a`, night indigo `#2a2750`. Sticker-shadow cards: `box-shadow: 4px 4px 0 var(--ink)`, 3px ink borders, radius 14px. Faint dotted-paper background: `radial-gradient(#0000000f 1px, transparent 1px) 0 0/14px 14px`.

Clive: one inline SVG, `viewBox="0 0 200 150"`.
- Body path (use this or similar): `M24 112 C10 84 28 46 62 34 C92 22 132 24 160 44 C188 64 194 100 170 120 C146 140 60 142 24 112 Z`, fill a `radialGradient` (highlight `#b7c1cb` at 30%/30% to `#8e9aa6` to `#5e6a77`), stroke ink 3px.
- Speckles: 10-14 tiny dark/light circles at SEEDED positions (use `api.rand()` once at mount; positions inside the blob bounding box).
- Googly eyes: two white circles (cx 82/122, cy 78, r 13, ink stroke 2) with dark pupils (r 6). Pupils follow the cursor with a damped spring in one `api.requestAnimationFrame` loop (stiffness ~0.15, damping ~0.8, pupil offset clamped to 6px). When the cursor has been idle > 3s, pupils sag under "gravity" (target offset y +5). The loop early-outs when velocity is ~0 and no input (do not redraw when settled). Clive has NO mouth.
- Blink (secret): a `<g class="m-pet-rock-lids">` with two lids hidden by default; shown 450ms on the Blink event.
- Underside (secret, press `U`): toggle a second `<g>` showing the underside (darker, different speckles, same eyes hidden). Snap toggle (no 3D).
- Moss: `<circle>` cells on his upper-right shoulder, green `#7aa07a`, 4px radius each, placed in a fixed list of 12 spots, one per `moss` count; at moss >= 100 also show a tiny 👑 SVG `<text>` crown. Moss count persists in `api.save`.
- Accessories toggled by state: `sleepcap` (Tuck In/Bedtime), `scarf` (during Walk), `sunglasses` (loop mode "Ironic"), `umbrella` (rain). Simple SVG groups.
- "Breathes" 0.5% scale on a 6s loop, shadow too. It is "the monitor". Disabled under reduced motion.
- Polished (secret, 100 pokes): add a white `ellipse` highlight with opacity .6 for the session (module-level variable, survives remounts but not page reload).
- Pixel shift: `transform: translate(1px)` on Clive's SVG wrapper only.

Snack Hill (feed-spam): a mound of emoji/CSS dots over Clive with only his eyes showing (z-index above body, below eyes via clip). Simpler: hide the body path with a `<g>` of piled circles and keep the eyes group on top.

Day/night: `.m-pet-rock-habitat.is-night` swaps the background to indigo with the lamp as the only warm light; the cone brightens. Bedtime adds a 35% dark overlay with a radial hole around Clive (`radial-gradient(circle at 50% 62%, transparent 60px, rgba(20,18,50,.35) 140px)`).

Parallax (Walk): four layers (`far hills`, `mailbox + lamp post emoji row`, `a dog emoji that drifts across`, `ground tiles`), each a wide div (200% width) with a repeated emoji/gradient content, moved with `transform: translateX(-Xpx)` where X = (walkPixels * speedFactor) % layerWidth. Speed factors 0.2 / 0.5 / 0.8 / 1.2. Clive does not move. Under `prefers-reduced-motion` (check `matchMedia` in try/catch at mount): freeze parallax (layers do not move, the odometer still counts) and shrink shake effects.

Leash: SVG `<path>` quadratic curve from the pointer/handle position (in habitat coordinates) to Clive's chest. Control point = midpoint with `y += sag` where `sag = min(80, 8 + dist * 0.25)` so it sags more the farther you are. For keyboard walks, the "handle" is a small 🦮 emoji that drifts right at a steady speed to a max of 70% width and wobbles back when released. Pure cosmetic.

Weather: 30 absolutely positioned 💧 spans (reuse the same 30 nodes; hide when not raining), umbrella emoji over Clive. Rain lasts 12s.

---

## 4. CONTROLS (every control is real `<button>`/input; mouse, touch and keyboard all work)

Global shortcut keys (listen with `api.on(document,'keydown',...)`). They are IGNORED when: the event target is an input/textarea/select/contenteditable, any modifier (ctrl/alt/meta) is held, `e.repeat` is true (except where a hold is intended, see Walk), or a blocking modal is open (except `Escape`). Do NOT use `B` (Lobby boss key). Keys: `F` feed cycle/serve, `W` walk (hold), `S` support (hold), `T` tuck in, `D` diary, `U` underside, `1`/`2`/`3` affirmation chips (while Support held), `ArrowLeft/ArrowRight` page turn when diary open or walk steer when walking (Right held also starts a walk), `Escape` closes diary/overlay.

### 4.1 FEED
- A **Snack Tray** of buttons: `🍇 Grape`, `🧁 Mini Muffin`, `🥕 Carrot Coin`, `🪡 Thimble of Water`. Later added: `🍞 Toast` (at 3:00), `Premium Gravel` and `Organic Gravel` (at 3:30; both are identical and both are labeled with a 🪨-ish emoji), `🥔 Gerald` (at 5:00 or when `api.flag.get('metGerald')` is set, whichever first).
- Select a snack (button gets `aria-pressed="true"`). Then ANY of: drag the snack from the tray onto Clive (pointer events: pointerdown on tray button starts a "ghost" element following the pointer; release over Clive's bounding rect = serve; elsewhere = snap back and still counts as a "meal" with line `declined`); click/tap Clive; or press `F` to cycle the selected snack and `Enter` to serve while focus is on the Habitat (or press `F` twice quickly = serve). Also: simply clicking the tray button WITHOUT dragging serves it immediately (click-to-throw: the snack auto-arcs to Clive with a CSS transition). This is the primary path; dragging is bonus.
- Serving: the snack settles beside Clive (a small absolutely positioned emoji with random offset on the doily, random rotation), soft `tick` sfx. **Crumb Reserve cap: 24 DOM items**; when full, the oldest is removed (recycled). Clive does not eat. Hold the snack over him 1s while dragging = "Chewing" jaw-less wiggle (CSS animation on the SVG wrapper, 0.5s) and the line `chewing`.
- Delta printed: `Hunger`. Stat `pet-rock.feeds`. Award 0.1-0.5 (see section 12).
- Spam: see 9.2.

### 4.2 WALK (unlock 1:00 or after 4 care actions)
- Hold the `Walk` button (pointerdown..pointerup/cancel/leave), OR hold `W`, OR hold `ArrowRight`, OR press-and-drag horizontally anywhere in the Habitat (distance dragged accumulates), OR swipe on touch.
- While walking: parallax runs, `scarf` shows, leash sags. Odometers read `You: 412 m. Clive: 0.000 m. Combined average: 206 m, a partnership best.` (numbers live: `You` = meters, `Clive` fixed at `0.000`, average = You / 2; "a partnership best" only when this walk's total exceeds the previous best, else "a respectable partnership"). Speed: 24 m per second of holding (so 412 m is a 17 s walk); drag walk: 1 m per 4 px.
- Release: if held >= 1.5 s, it counts as a **Walk** (stat `pet-rock.walks`, meters added to `pet-rock.meters`, award) else it is logged as `Brisk Intermission` (no walk count, tiny award 0.1).
- Rare scenery by cumulative walk distance: dog (always), suspicious duck at 150 m (once per mount, then 1/4 chance), a second rock that ignores Clive at 400 m, a puddle Clive "leaps by not moving" at 700 m, the **Missing Sock** crossing leftward with purpose (ONCE per save, flag `pet-rock.sockSeen`; the next diary page is the Sock callback).
- Delta printed: `Energy`.

### 4.3 SUPPORT (the Be There hold; unlock 1:40 or after 8 care actions)
- Hold the `Support` button (pointer) or `S` (keyboard; for keyboard also `Enter`/`Space` while the button has focus: keydown starts, keyup releases) to fill a **Warmth Ring** (SVG circle `stroke-dashoffset`) around Clive over **3.0 seconds**, hearts floating up. Release before 3.0s: `Interrupted` and the line `Hug incomplete...`. Full 3.0s: `Present`, a sparkle, +0.5 Meh, KPI line `Active Listening: 3.0 s`.
- While holding, three **affirmation chips** float in (buttons, also keys 1/2/3): `You are doing great`, `I believe in you`, `It is fine to be a rock`. Each gets a different Clive reaction line (below); none changes anything. His thought bubble stays blank ("which means it is working").
- A text input beside the ring: label `Tell Clive something nice` (max 80 chars). Enter or button `Tell` sends it: Clive replies with a stamp `Logged as: sound.` plus a keyword reaction (4.3.1). Use `textContent` ONLY. Do not store typed text anywhere except in memory for the current mount. Shortcuts are ignored while the input has focus.
- Delta printed: `Mood`. Stats `pet-rock.hugs` (completed holds), `pet-rock.hug.seconds` (cumulative held seconds, fractional ok but integer-rounded when displayed).

#### 4.3.1 Keyword hooks (case-insensitive substring match on typed text; first match wins; also drives a diary reply later via flag `lastKeyword`)
See lines under `supportKeyword` (section 6).
Typing `pebble` three times total in a mount triggers the **Great Pebble Schism of 1972** (a 3-page diary tangent: three extra pages inserted at the next diary unlock; see section 7.4).

### 4.4 TUCK IN (unlock 2:30 or when the Diary unlocks)
- Toggle (button or `T`): a folded-napkin blanket (CSS div) lowers over Clive (translateY transition), the lamp dims, habitat gets `is-night`, `sleepcap` shows. Pressing again lifts it.
- While tucked: the next diary page unlocked gets a bonus **P.S. (night)** line (random from `diaryNight`).
- Toggling more than 6 times in 10 s triggers Tuck-Spam (9.2).
- Delta printed: `Hygiene`. Stat `pet-rock.tucks` (count only toggles that tuck IN).

### 4.5 DIARY (unlock: first of (first completed Walk or Brisk Intermission AND elapsed >= 1:30) or elapsed >= 3:00; Management announces it)
- `Diary (D)` opens/closes the right-column book. First open: the padlock. The padlock accepts a typed number (see 4.5.1) or a click on the padlock itself (which prints `Wrong, but warm.` and opens anyway). It is decorative.
- Entry pacing: one new entry per **4 care actions OR 60 seconds, whichever comes first**, so there is always one nearly ready. A thin progress bar under the book (`Next entry: 2 of 4 care actions`). Reading a NEW entry (first time its page is shown) = +2 Meh, stat `pet-rock.diary.read` (unique entries read). Max 13 base entries + bonus pages.
- Controls: `Prev`/`Next` buttons, `ArrowLeft/ArrowRight` (when diary open), `Read aloud` (typewriter at ~28 chars/sec into the page text; replaced by full text if you navigate away; no sound), heart toggle (stored in module state and `api.save`, favorite page index). `Escape` closes.
- Entry 1 arrives right after the diary unlocks (padlock opens with a click animation; Management: "Entry 1 is charming and slightly too deep.").
- Each entry has 'text' + 'P.S.'. The P.S. mentions moss in the progression: No moss -> Moss? -> hope -> ignored for a stretch -> payoff at Entry 12.
- After Entry 13 (the "intentionally left rock" page, which is permanently the LAST page), new entries draw from the **Late bank** (7.3) and dynamic entries (7.2); they are inserted BEFORE the "intentionally left rock" page so it stays last. Page count then reads `Entry N of 13+`. In Hardcore loops 2+ the indicator reads `Chapter 1 of infinity`.
- Entries about the player (dynamic, section 7.2) use real stat counts (never undefined).

#### 4.5.1 Padlock input
A numeric input labeled `Combination`. Submit with Enter or `Try`. Rules: `0000` -> `Combination accepted. It was 0000. The lock was always decorative. Clive wanted you to try.` and open. `4500000000` -> opens AND adds the bonus **Entry Zero: Birthday** page (+3 Meh, secret achievement `pet-rock.entryzero`). Anything else (including empty/non-numeric) -> `Wrong, but warm.` and open.

### 4.6 POKE
Clicking/tapping Clive directly pats him. Counter `Pats: N (Gentle)`; rank by total pats: 0-19 Gentle, 20-49 Firm, 50+ Concerning. Stat `pet-rock.pokes`. Each poke: tiny CSS squish on the SVG (scale .97 for 80ms), `tick` sfx. Not a care action (no award, no diary progress) BUT 1 in 12 pokes awards 0.1 Meh. Keyboard: Clive has `tabindex="0"` and `role="button"` with `aria-label="Pat Clive"`; Enter/Space pats.

### 4.7 ASK CLIVE HOW HE IS DOING (added 6:30)
A real button. Effect only: Clive writes `He asked.` in the margin of the current diary page (a small slanted note). +0.2 Meh, once per press, counts as a care action for pacing but prints NO delta (the ticker prints `(no delta, Clive is asking)`).

### 4.8 Overlay / modal rules
At most ONE blocking modal at a time (`state.modal`). Blocking modals: Adoption Certificate, Vet Visit form, Support Circle, Care Review, Graduation, Quiet Room. Everything else is non-blocking (memo cards, toasts, bubbles, Management lines). Every blocking modal has a visible real button that closes it AND an auto-close timeout (60s; 12s for Certificate; Quiet Room 7.5s fixed) so the fuzz harness and idle players can never deadlock. `Escape` closes the topmost closable modal (not Quiet Room).

---

## 5. THE ZERO DELTA AND OTHER NUMBERS

`state.actions` = count of care actions (feeds + walks + brisk intermissions + completed hugs + tuck-ins + ask-clives). Poke and Diary reads are NOT care actions. Care actions drive delta precision and rank.

Delta line format (ticker, one per care action): `<Vital> 100 -> 100 (change: <delta>)`
where `<delta>` depends on n = `state.actions` (after increment):
- n 1..12: `+0.` followed by `(2 + n)` zeros -> n=1 `+0.000`, n=12 `+0.00000000000000`.
- n 13..39: scientific: `+0.0e-` followed by n (e.g. `+0.0e-14`).
- n 40..59: a **40-digit zero**: `+0.` + 40 zeros; first time it appears, Management reads it aloud (line `deltaLate`).
- n >= 60: framed `<span class="m-pet-rock-zd">Zero (Deluxe)</span>` (ribbon style, mustard background, a CSS ribbon end).
- n == 80 EXACTLY (once): print `+0.` + 18 zeros + `1` (a 1 at the 19th decimal). Management panics (line `delta80a`), and 2.5 s later corrects (line `delta80b`). Then it continues as Zero (Deluxe).
Tooltip texts on the gauges are policy language (section 6 `vitalTips`).

**Wellness Index**: always 100. Flag tab `Target: 101%` (loop k: `Target: <100+k+1>%`). Management occasionally nudges it with a line. `Over-achievement is declared a form of negligence.`

**Care Goal bar** (appears 0:40): Zeno style. Each care action closes half the remaining gap: `gap = 0.5^n`. Display: `Care Goal: ` + `(100 - 100*gap)` expressed as `99.` + nines where `nines = floor(n * 0.30103)` capped at 14 nines, then `...%` if capped. For n<=3 use plain `toFixed(2)` of the true value (50, 75, 87.50). Never prints 100 (clamp). The bar's fill width is `min(99.9, ...)`%. Safe math: never call `toFixed` with > 20, never build strings from huge n without a cap.

**Attention Debt**: `0`, with the tooltip `Must be reduced to 0.` Management mutters when you act: `Attention Debt: 0 -> 0. Target: 0.`

**Needs Imminent badge** (appears 0:40): `Needs Imminent: Hunger 100%, due in 00:07`. Counts 00:07 down each second to 00:01, then resets to 00:07 just before 00:00 (the gag: it never reaches 00:00). Pebble (after 4:30) gets its own timer reading `00:03.75` ticking in 0.25 steps `03.75, 03.50, 03.25 ... 00.25`, then resets to `03.75`. In the finale (Graduation) the main timer finally reaches `00:00`, nothing happens, and Management says `we do not discuss it.` One interval (api.setInterval 250ms) updates all timers; never one interval per timer.

**Care Certification** rank by `state.actions` (and set to the last rank at graduation): `Pebble Wrangler` (0), `Gravel Associate II` (10), `Boulder Liaison` (25), `Tectonic Specialist` (50), `Senior Vice Mineralogist` (80), `Chief Rock Officer` (graduation, or n >= 120). Rank-up: `stamp` sfx + line (`rankUp`).

**Care Hours Logged**: `elapsed minutes / 1` formatted with 1 decimal. Cosmetic.

**Incidents**: integer counter. Display rule: `count === 7` shows `7 1/2`, otherwise the integer. Incident events: Pixel Shift (9.4) and the event-deck Incident card (6.12). Management celebrates when the display first reads `7 1/2` (line `incident75`).

**Care Awards** (Meh): care action 0.1-0.5 (random), Support complete 0.5, Alert click 0.2, Diary first-read 2, Padlock Entry Zero 3, Witnessed 5, Graduation 25. Soft cap on care-action awards: max 6 Meh per rolling minute (token bucket in module state) so spam is not lucrative; over-cap actions still print deltas and lines, award 0 silently. Fees use `api.award(-x, reason)` (engine clamps at 0).

Stats (all via `api.stat.inc`): `pet-rock.feeds`, `pet-rock.walks`, `pet-rock.meters` (integer meters), `pet-rock.hugs`, `pet-rock.hug.seconds`, `pet-rock.pokes`, `pet-rock.tucks`, `pet-rock.diary.read`, `pet-rock.alerts` (alert bubbles clicked), `pet-rock.photos`, `pet-rock.actions`, `pet-rock.incidents`, `pet-rock.loops`. Use `api.stat.max('pet-rock.longestIdle', secs)`.

---

## 6. LIVE EVENT DECK AND SCHEDULED BEATS

### 6.1 Time model (critical)
One master `api.setInterval(tick, 250)`. `state.T` = elapsed play seconds, accumulated as `dt = min(1.0, (api.now() - last)/1000) * speed` each tick. `speed = api.selftest ? 12 : 1` (selftest compresses the whole 10-minute arc into ~50s of virtual time; also unlock thresholds are met sooner because unlocks use "time OR action count"). Clamping dt to 1s means a hidden tab does NOT fast-forward the arc. In loops >= 2, `speed *= 1.6` (the "same game, faster").

**Beat scheduler**: an array `BEATS = [{t, id, run}]` sorted by `t`. Each tick, if no modal is open and `T - lastBeatTime >= 8` and the next unfired beat has `t <= T`, fire exactly ONE beat. Beats are fired once per loop (reset index on loop). Beats that are blocking set `state.modal`.

**Event deck**: after T >= 50, every 15-25 s of play (random), if no modal is open and no beat fired in the last 8 s, draw the next from a shuffle bag (`api.shuffle` of the deck ids, refilled when empty, and re-shuffle if the first drawn equals the last drawn). Deck is NEVER drawn while idle > 45 s (the idle sequence has priority).
Deck ids: `alert, vet, photo, rain, birthday, gerald, dennis, sandra, circle, rockshow, incident, ticketjoke` (`vet`, `circle` only if not yet fired this loop by beat; if drawn already-fired, skip to next).

### 6.2 BEAT TIMELINE (T seconds; mm:ss)

| T | id | what happens |
|---|---|---|
| 0:00-0:03 | `intake` | Blocking Adoption Certificate slides in (cream card, ink border). Fields: `Name` (input, default `Clive`, max 16 chars, trimmed, empty -> `Clive`), `Birth date: Before`, `Distinguishing marks: rock`, `Signature: none, by design`. Button `Accept Custody`. Auto-accept after 12 s (Management: `Custody has been accepted on your behalf. Management does this for everyone.`). Management lines `intake` fire at 0:03 even before any input. On accept: name checks run (9.5). |
| 0:10 | `firstcare` | Management prompts Feed (`Feed is the only verb enabled at this time.`). Only Feed, Poke, Tuck-hidden are available. Six vitals appear, all `STABLE`. Line about the needle. |
| 0:40 | `hardcore` | Hardcore Mode explained. Needs Imminent badge, Attention Debt, Care Goal bar, Hourly Care Schedule appear. Wellness flag moves to 101. |
| 1:00 | `walk` | Walk unlocks (or earlier by 4 care actions). Parallax, odometers. Sandra flags the leash. |
| 1:40 | `support` | Support unlocks (or after 8 care actions). KPI `Active Listening`. |
| 2:15-3:00 | `diary` | Diary unlocks per 4.5. Entry 1. Padlock. |
| 2:30 | `tuck` | Tuck In unlocks (or when Diary unlocks). |
| 2:45 | `sandra1` | Sandra reclassifies Clive: `mineral, not a pet` -> `companion of record`. Memo card. |
| 3:00 | `inflate` | Metrics inflation: one extra vital every 20 s: `Vibes`, `Gravitas`, `Tuesday Readiness` (all 100%, slide in with a stamp animation). Toast and Toast snack unlock. |
| 3:15 | `vet` | Blocking Vet Visit (6.3). |
| 3:30 | `gravel` | Premium Gravel and Organic Gravel snacks appear. |
| 3:45 | `dennis` | Dennis (Plant) cameo (non-blocking card). Rain follows within 20 s (via deck `rain` forced next). |
| 4:30 | `pebble` | Pebble companion appears (6.5). |
| 5:00 | `circle` | Blocking Support Circle (6.6). Gerald snack unlocks. |
| 6:00 | `bedtime` | Bedtime (6.7). |
| 6:30 | `inversion` | Diary Entry 10 forced as next entry; Ask Clive button added (4.7). |
| 6:50 | `humans` | One tick: a vital briefly labeled `Humans` reads `38%`, sad sfx, then corrected (6.8). |
| 7:30 | `sediment` | The Sedimentary Event (6.9). |
| 7:45, 8:15, 8:45 | `tuesday1..3` | Tuesday Approaches (6.10). |
| 9:00 | `review` | Care Review: Clive presents YOUR performance review (6.11). Blocking. |
| 9:30 | `graduation` | Graduation ceremony (6.12). Blocking, then the loop. |

If the player takes forever to close a modal, beats queue and fire one by one every >= 8 s afterward; if a beat is overdue by > 90 s of play it is SKIPPED (except `review` and `graduation`, which always fire), so the arc never becomes a flood.

### 6.3 Vet Visit (blocking, beat + deck)
Card: `Dr. Pemberton-Slate (Veterinary Geology)` with a clipboard emoji. Intake form: three questions, each shown as `Question 1 of 7 1/2`, `Question 4 of 7 1/2`, `Question 7 1/2 of 7 1/2` (the last is a half-width checkbox `I half agree`). Every answer button leads to `Fine`. Q1 `Has the rock been exposed to weather?` options `Yes` / `Yes, but it was fine.` Q4 `Does the rock experience dread?` options `No` / `Not at this time` / `Fine`. Q7.5 is a checkbox. Submit button `Submit Findings` -> diagnosis `rock`, handshake line, a hand-shaking emoji that Clive cannot return. Also the **Stapler union rep** appears in the corner: `The Stapler (union rep) demands Clive be listed as a member. The Stapler has been pressed into service before.` The vet checks the Needs clock (`vetClock` line). Closes with `Fine`. Awards 0.5 Meh. Auto-close 60 s.

### 6.4 Event deck (non-blocking micro-events)
- **Alert**: a coral bubble `Clive needs: nothing. Respond within 3 seconds.` Click = +0.2 Meh, stat `pet-rock.alerts`, `alertHit` line. Miss = `alertMiss` line (`Equal outcome.`). From 7:30 the bubble text becomes the gentle variants (`Clive needs: a moment.`, `Clive needs: to be where he is.`, `Clive needs: Thursday, eventually.`).
- **Photo Day**: a camera emoji button `Snap`, click to snap. The Album (cap 12) adds an identical polaroid with the next escalating caption (6 `photoCaption` lines in order, then 6 more), stat `pet-rock.photos`, +0.2 Meh.
- **Rain**: 12 s of rain + umbrella; Clive's diary may mention it.
- **Birthday**: Clive's birthday (he has one daily). A candle emoji row; number of candles is `enough`.
- **Gerald cameo**: a potato emoji with CSS monocle. Speaks a Gerald line. If `api.flag.get('metGerald')` is true use the callback variant. Always speaks via `api.say(text, {who:'Gerald'})`.
- **Dennis cameo**: plant emoji with sunglasses, a card to Clive: `Thinking of you. Photosynthesizing.` Management: `Dennis did not attend. Dennis is a plant.`
- **Sandra flag**: a sticky note with a policy number and a flag (`Policy 4.2`, `4.2.1`, `4.2.1(a)`, `14`, `14(b)`), never a face.
- **Rock Show**: three judges (emoji) score all rocks 10. Clive wins Best in Show, "which is also what everyone else got."
- **Incident**: INCIDENT memo card with a random tilt and tape piece: `Clive moved. Footage reviewed. Footage inconclusive.` followed by escalating elaborations (6.13). Stat `pet-rock.incidents`, incident counter +1.
- **Ticket joke**: a small memo card of one of `memo` lines (suggestion-box style jokes).

### 6.5 Pebble (4:30)
A pebble (small SVG circle blob) appears beside Clive at the doily edge. It is a button (`aria-label="Serve the pebble"`). After every care action a coral dot `Pebble due` appears on it; clicking the pebble performs "the same action, smaller" (prints `Pebble 100 -> 100 (change: +0.000)` in the ticker, +0.1 Meh, tiny pop). It is optional, no penalty. Its own timer reads `00:03.75`. Name: `Gary Jr.` (the pebble would like to be called that; it does not have a Gary). Management drafts "tier three" (a grain of sand, name TBD, Quarterly) and "tier four" (labeled `Quarterly`) as two memo cards 40 s apart. Diary Entry (Late bank) later: the pebble asked what happens when we're gone.

### 6.6 Support Circle (5:00, blocking; also deck)
Modal grid of 12 identical rock emoji buttons (`🪨`) in a ring (flex-wrap circle layout). The prompt: `Find Clive.` Click any: `That's Clive.` (always, for each, with a different suffix from `circleClick`). Close button `Clive Has Chosen Anonymity`. After 3 clicks or 25 s, Management declares `Clive has chosen anonymity.` Then **Gerald arrives** offering himself as a snack: Clive declines (Gerald line). Awards 0.5 Meh.

### 6.7 Bedtime (6:00)
Management: `Lights out.` Night overlay (35%) + radial hole around Clive. The player must press `Tuck In` (a small blanket drags into place by click, no drag needed; if not tucked within 20 s it tucks itself, `Management does this for everyone`). 4 seconds later: the clock-sun hands read **3:17 AM** (text label `3:17 AM (Clive's clock)`), the rock "wakes" you with a diary entry (forced Entry: the 3:17 entry) that is `a feeling, not an emergency`. **Gerald card** arrives: if `api.flag.get('metGerald')` then signed `Gerald, VP of Spuds`, else signed `A Spud.` Text: `Have you considered being a potato.` Clive's reply goes in the diary margin: `Daily.` **Dennis** sends a leaf with a note: `Competent. Unimpressed.` The overlay lifts after 20 s or when the player un-tucks.

### 6.8 The Humans Glitch (6:50)
One vital tile reads label `Humans` and value `38%` for 2 s with a red-ish tint and `sad` sfx, then snaps to a normal tile. Management: `That label was a typo. It has been corrected to 100%. We do not discuss it.` (line `humans`). The second time it would occur (loop 2+) it reads `Humans: 100%` and Management says `Management noted the change and has chosen not to be moved.`

### 6.9 The Sedimentary Event (7:30)
Non-blocking but dramatic: a 2.5 s "evolution" overlay on Clive (sparkles via CSS keyframes and a few emoji, `fanfare` sfx, `api.confetti` once), Clive's SVG rotates 3 degrees permanently (CSS `rotate(3deg)`), result card `CLIVE (SLIGHTLY DIFFERENT ANGLE)`. Management calls it a promotion. Clive declines the raise "on a technicality". All stats unchanged. Persists until the loop ends (reset to 0deg at graduation). Under reduced motion: instant swap with a fade.

### 6.10 Tuesday Approaches (7:45-9:00)
Management panics in escalating tiers. A paper calendar tile (`TUE MINUS 4 DAYS`) tears off at 7:45 (4), 8:15 (3), 8:45 (2): the top page translates away and a new one reads the next number. The lamp flickers (CSS opacity animation, 3 s each time). The Wellness dial shudders by 0 pixels. The Alert bubbles become gentle/weird. Diary Entries 8 and 9 come due in this window. Management says `Clive is fine` three times then corrects itself (line `tuesdayFine`).

### 6.11 Care Review (9:00, blocking)
Card: `PERFORMANCE REVIEW (Rock's, presented by Clive)`. Rows: `Punctuality: Yes`, `Initiative: Overreaching`, `Listening: Present`, `Care Quality: Adequate (technically)`, `Overall: Meets Expectations, Technically` and then the word `technically` gets its own line, then `Footnote: technically.` The gauges stay 100%. Button `Acknowledge Review`. A pebble shaped like YOU drops to the cursor: (a 🪨 emoji with the player's name on a small tag) and `You have been adopted by a pebble. It is arriving at your cursor now. Please feed it. It is also fine.` The Needs timer finally hits 00:00 here and nothing happens, `we do not discuss it.` Awards 1 Meh. Auto-close 60 s.

### 6.12 Graduation (9:30, blocking)
Ceremony card, then three stages with 'Next' button (auto-advance 8s each, closeable):
1. Paper-hat Management line, Care Certification flips to `Chief Rock Officer, Level 1 of 1` (do not look for Level 2; it is also Level 1).
2. Slideshow of 6 identical screenshots (the same CSS-drawn Clive card, six times) with captions in rising emotion (the 6 `slideCaption` lines).
3. Entry 12 is guaranteed read here (if not already): **moss arrives, one cell**. Sandra's note approves it. Management weeps once, then claims it was a lens issue.
Then `Hardcore Mode Complete. Please enjoy Standard Mode.` +25 Meh, `api.confetti`, `tada` sfx, stat `pet-rock.loops` +1, achievement `pet-rock.graduate`, `api.save` moss+loops, then the LOOP: see 10.

### 6.13 Incident escalation (each Incident card draws the next in order, then random)
1. `Clive moved. Footage reviewed. Footage inconclusive.`
2. `Clive moved. A second reviewer was brought in. The second reviewer agrees with the first reviewer and is unsure why.`
3. `Clive moved. A sketch artist was commissioned. The sketch is of Clive. It is a good likeness. This does not help.`
4. `Clive moved. A panel of experts convened. They stood near Clive for 11 minutes and left looking thoughtful.`
5. `Clive moved. A strongly worded memo was drafted. The memo is addressed to the floor.`
6. `Clive moved. Footage reviewed in slow motion, then in no motion, then in a third motion Management declined to name.`
7. `Clive moved. The rock has been found back in place. The place was surveyed. The place was unmoved.`
8. `Clive moved. Please note: Clive did not move. This card is a courtesy.`

---

## 7. THE DIARY (FINAL TEXT)

Every base entry has `text` and `ps`. Show text, then the P.S. in smaller slanted type. All text rendered via `textContent`.

### 7.1 Base entries (in order; entries 1-13)
1. text: `Dear Diary, a person put me on a doily today. I have been a rock for 4.5 billion years and this is my first doily. I am cautiously accepting it.` ps: `P.S. No moss.`
2. text: `They fed me a grape. I thought about what it means to be given something you cannot use. Most things, I concluded.` ps: `P.S. Still no moss.`
3. text: `Everyone keeps asking if I'm okay. Being okay is the whole job. But the asking is nice. Keep asking.` ps: `P.S. Moss?`
4. text: `I was once part of a mountain. Mountains don't miss anyone because they can't turn around. I envy and fear this.` ps: `P.S. Moss? I am only asking.`
5. text: `Dennis grew a leaf today. I'm so happy for him. I'm so happy. I'm so happy.` ps: `P.S. Moss would be nice too. Not instead. Too.`
6. text: `Time passes differently for me. A year is a blink. A blink is also a blink. I have been blinking all along, but you only have my word.` ps: `P.S. (moss, no news)`
7. text: `Someone walked me today and I did not move. They did all the moving. I think that is a kind of love: someone going far so another can stay.` ps: `P.S. I have stopped looking at my shoulder. It is not related.`
8. text: `Tuesday is coming. I can feel it in my everything. I do not have an everything. It's a lot to go through without.` ps: `P.S. Moss can wait.`
9. text: `I think I've been holding up the idea of ground for everyone. Nobody has said thank you. I'm not asking. I'm writing it down in stone.` ps: `P.S. Still, moss.`
10. (The Inversion) text: `I've been watching you click. You are very diligent. Have you eaten? Have you had water? This is a rock's way of caring.` ps: `P.S. Moss can wait. You, apparently, can't.`
11. text: `If the point of a rock is to be, the point of you is to be here also, being. I checked. There is no other page.` ps: `P.S. Moss is optional. You are not. This is a compliment.`
12. (Payoff) text: `I decided I am fine. I was fine before I decided. The deciding was for me.` ps: `P.S. Moss has arrived. One cell. Perfect. Do not tell Sandra.`
13. text: `This page intentionally left rock.` ps: ``  (empty; page shows a small drawn rock)

Rules: Entry 10 is forced as the next entry at 6:30 (skip ahead if needed; later entries keep order). Entry 12 is guaranteed by the graduation beat. Entry 13 unlocks last. The page numbers shown are ordinal in unlock order.

### 7.2 Dynamic entries (inserted by condition, each at most once per loop)
- `diaryFav` (inserted at 3:30+ once any verb count > 0): `You have pressed %FAV %N times. I think this says something about you. I have chosen not to say what, out of tact.` ps: `P.S. Moss is not a verb. I checked.` (%FAV = most used of `Feed / Walk / Support / Tuck In`, chosen by max count, ties -> first; %N its count as integer.)
- `diaryGap` (inserted 5:00+ if the longest pause between inputs was > 15 s): `You once waited %S seconds before you clicked. A rock can wait that long. I have a lot of practice.` ps: `P.S. Thank you for coming back.` (%S integer seconds of the longest gap in the current mount, clamped 15..9999)
- `diaryHeart` (inserted if a favorite page is set): `I do not have a favorite page. But if I did, it would be page %P. I would not say so out loud.` ps: `P.S. You said it out loud for me. It is fine.` (%P = the favorite's ordinal)
- `diaryKey` (inserted if a keyword hook fired): `Someone told me a rock cannot feel. I told them: that is fine, and also you sounded sad.` ps: `P.S. Noted: "%KW".` (%KW is the matched KEYWORD from the fixed hook list, not user text; never print raw user input.)
- Entry 0 (idle) and Entry Zero: Birthday and the Schism pages: see below.

### 7.3 Late bank (inserted after entry 13 is read, one per unlock, in this order; then cycled; sign-off line replaces P.S. from loop 2)
`Day 7 1/2: The human talks to me when it thinks I'm not listening. I am always listening. It is the one thing I'm good at.`
`Diary: Dennis the Plant thrives. I admire him. He has chosen a direction. I have chosen all of them, very slowly.`
`Diary: I do not fear Tuesday. Tuesday is simply a Monday that has been given a little too much to carry.`
`Diary: The pebble asked what happens when we're gone. I said the same as when we're here, with fewer snacks.`
`Diary: Sandra measured my leash and wept, gently, at the ruler. I think she has someone she can't walk, either.`
`Diary: They call it doing nothing. I call it holding the whole afternoon in place so that it can't fall over.`
`Diary: The human has been here every day. I did not ask them to. It is the best thing that has happened to a mountain.`
`Diary: They say a watched rock never moves. I have found this to be true and restful.`
`Diary: I do not need to go anywhere. Some of the best places are exactly here.`
`Diary: A duck looked at me today. I think he was trying to determine if I was a rock. I was gracious.`
`Diary: Saw a sock today. I do not know where he is going. I hope there is a drawer at the end of it.` (only after the Missing Sock scenery event; else skipped)
`Diary: I forgave the sun for the fading of my upper left surface. We are on good terms.`
`Diary: I support the stapler. We have both been pressed into service.` (only after the Vet beat)
`Diary: I have counted. There are 1,204 other rocks in the garden. I could name them all, but I would have to name myself first, and I am working up to it.`
Sign-offs (loop 2+ replace P.S.; cycle): `Respectfully, a rock.` / `Warmly, in a temperature-neutral way, Clive.` / `Yours, in place.` / `P.S. Moss has, on reflection, always been on me.`

### 7.4 Special pages
- **Entry 0 (idle 150s)**: `Entry 0. No one here. I am a rock. It is the best I have ever been at it.` ps: `P.S. Moss? Never mind. No one is here.`
- **Entry Zero: Birthday** (padlock 4500000000): `Entry Zero: Birthday. I was born Before. Everything since has been a long, kind afterparty.` ps: `P.S. No moss yet. I am patient. I am a mountain with a head start.`
- **Great Pebble Schism of 1972** (3 pages, after typing pebble 3 times): (a) `Diary: Today I learned about the Great Pebble Schism of 1972. Half of the pebbles believed they were small rocks. The other half believed the rocks were large pebbles.` (b) `Diary: Nobody was hurt. There was a vote. It was a tie. A third faction, the Gravel, abstained and then felt very bad about it.` (c) `Diary: I take no side. I am a rock. I believe everyone is correct, loudly, slowly, in their own size.` all with ps `P.S. Moss was neutral. Moss is always neutral.`
- **Window Dressing** (resize then hide the tab, same mount): `Diary: The walls moved. Then the light went away. Then it came back. I have always suspected the room was negotiable.` ps: `P.S. Moss remains in place. Moss does not do windows.`
- **Night P.S.** (Tuck In bonus lines; `diaryNight` bank, random): `P.S. (night) Thank you for the blanket. It is a napkin. I know. It is also a blanket.` / `P.S. (night) It is dark and I am the same. This is the best arrangement.` / `P.S. (night) If you are reading this at night, go to bed. I will be here. I am always here.` / `P.S. (night) A small light is on. It is the only one. I would like to keep it.`
- **3:17 AM entry** (Bedtime): text `It is 3:17 AM. I woke up. Nothing is wrong. I just wanted someone to know that I am here and it is quiet and I am glad of it.` ps: `P.S. Not an emergency. A feeling. Moss would have understood.`
- **Letter**: `Letter to Whoever Is Watching` is the Inversion page text plus `(unlocked once)`. Do not add as a separate page.

---

## 8. FINAL LINES (verbatim; group = `P.addLines('m:pet-rock:<group>', ...)` unless marked [inline])

`%N` etc. are module-side tokens. Do NOT write literal `{` `}` in lines other than engine tokens.

### intake
- `Adoption Certificate: Name, Clive. Birth date, Before. Distinguishing marks, rock. Signature, none, by design.`
- `Congratulations on your new dependent. He needs everything. He has everything. Please begin.`
- `Welcome to Pet Rock: Hardcore Mode. Hardcore means his needs must be met around the clock. His needs are all at 100%.`
- `Permadeath is ON. The rock has been informed. The rock asked what the death part was.`
- `Hardcore Mode means the rock cannot be neglected, only observed neglecting to need things.`
- `Hunger 100%. Energy 100%. Mood 100%. Please do not interpret this as a lack of work for you.`

### vitalIntro
- `Six vitals. All STABLE. Management would like it noted that the needles have achieved this.`
- `The needles are pinned at 100. This is the achievement of the needle.`
- `Every gauge reads 100. Management has tried to read 101. The gauge declined.`

### vitalTips (title attributes, one per vital in order Hunger, Energy, Mood, Hygiene, Purpose, Stoneness, Vibes, Gravitas, Tuesday Readiness)
- `Hunger: 0. Management is very proud of it.`
- `Energy: unchanged since the Precambrian.`
- `Mood: stable. Reviewed and approved by gravity.`
- `Hygiene: spotless. There is nothing on him to wash off.`
- `Purpose: pending. Pending is also 100.`
- `Stoneness: maximum. This is his whole thing.`
- `Vibes: 100%. The committee asked what vibes are. The committee was told: yes.`
- `Gravitas: 100%. This is, technically, a unit of weight.`
- `Tuesday Readiness: 100%. It is also, technically, Wednesday.`

### vitalCaption (rotating small captions on STABLE badges)
- `unchanged since the Precambrian`
- `reviewed and approved by gravity`
- `holding steady, at length`
- `cannot be improved, only admired`
- `stable (on purpose)`
- `STABLE (and then some)`

### feed
- `Feeding logged. Hunger was 0 before and is 0 after. Management calls this a clean handoff.`
- `Clive did not eat the muffin. Clive did not not eat it either. Legal is reviewing the distinction.`
- `You fed Clive a grape. The grape is now technically in Clive's care.`
- `Meal 14 of 14 today. Clive's appetite remains geological.`
- `Nutrition label: serving size, one rock. Servings per container, one rock. Calories, see rock.`
- `The crumbs are not a mess. They are a Crumb Reserve, and Sandra has approved it for 11 more minutes.`
- `You have fed Clive one (1) carrot coin. He accepts it the way mountains accept erosion: eventually, in theory.`
- `Digestion complete. Nothing has changed, which is the optimal result for this species.`
- `Feeding log: 12:04 PM, snack, medium. 12:04 PM, snack, medium. 12:05 PM, Clive declined to comment.`
- `Clive is not full. Clive is not hungry. Clive is in a third state. Sandra from Compliance is drafting a form.`
- `The snack has settled beside Clive. Neither of them looks like it has plans.`
- `Clive was offered the thimble of water. He was thankful in a way that could not be measured.`
- `Hydration is 100%. Hydration was also 100% before the water. We will call that redundancy.`
- `Crumbs Offered: %N. Crumbs Eaten: 0. Crumbs Becoming Family: %N.`

### feedSpecial
- `You offered Premium Gravel. Clive found it identical to the ordinary gravel, and is touched anyway.`
- `You offered Organic Gravel. It is the same gravel. It is simply more confident.`
- `Toast. The toaster has been informed that Clive was fed toast. The toaster says: toast.`
- `You have offered Clive a potato. Gerald is the potato. Gerald considers the offer profoundly and is moved.`
- `The thimble of water has been placed beside Clive. The thimble has been given a small doily of its own.`
- `The snack was dropped off target. Clive politely declined. Per policy, this counts as a meal.`
- `Chewing detected. Clive has no jaw. The chewing is, technically, a wiggle of high intent.`

### deltaLate
- `Hunger +0.000000000000000000000000000000000000000. Management reads this aloud and calls it a lot of zero.`
- `Management has circled all of the zeroes and written steady beside them with great feeling.`
- `The delta is now so small it has been promoted to a rumor. Clive is fine.`

### deltaZD
- `Zero (Deluxe) is now printed on a ribbon. The ribbon is the most consistent number ever produced.`
- `The delta is framed. The frame is also zero. Management is thrilled in a measured way.`

### delta80a / delta80b
- a: `ALERT: a 1 has appeared at the 19th decimal. All hands. Please, someone find a ruler.`
- b: `Correction: it was a rounding error, in the rock's favor. We have apologized to the rock.`

### walk
- `Walk started. Clive is at the same coordinates he was born at, give or take 4.5 billion years.`
- `You walked %N m. Clive walked 0 m. Together you averaged %M m, a personal best for the partnership.`
- `Route altered to avoid hills. Clive requested no changes. Clive requested nothing. Clive is thriving.`
- `The leash is attached to Clive via a harness he did not consent to and cannot withdraw consent from.`
- `Pedometer reads 0 steps. Clive's legs are listed as pending.`
- `Walk Quality: Brisk (you), Stationary (Clive). Please file under both, technically.`
- `Sandra has flagged the leash at 7 1/2 feet. She calls it a leash with ambitions.`
- `Brisk Intermission recorded. You were out for a walk for %S seconds. Clive was out for none, and it was fine.`
- `The walk is complete. Everyone has returned to where they were. This is called a loop.`
- `Policy 14 says the rock must walk. Policy 14(b) says the rock may not. Clive has done both.`
- `Total distance: %N m. Clive's share: 0 m. Management has asked that this be called a partnership.`
- `The leash has stretched to its limit and snapped back. It has been told it did well.`

### walkScenery
- `A dog passes. Clive and the dog nod at each other. Neither moves. It is the closest anyone has come to conversation.`
- `A duck has appeared. The duck is not part of the program. The duck does not wish to be asked.`
- `A second rock is on the path. It does not look up. Clive wrote this down.`
- `A puddle. Clive leaps it by not moving. It was a clean jump and also no jump at all.`
- `A sock crosses the path in the opposite direction, with purpose. Nobody stops it. Nobody asks.`
- `A sign reads: Pet Rocks Must Be Leashed. Clive is leashed. Clive is also, spiritually, the sign.`
- `A squirrel crossed the path. Clive showed restraint, as he does with everything.`

### support
- `You told Clive he is doing great. Clive received this the way he receives everything: fully.`
- `Emotional support delivered. Clive's state has been recorded as still, which is the best possible state.`
- `Hug in progress. Warmth transferred: 0 degrees. Warmth intended: all of them.`
- `You said 'I'm proud of you.' Clive has been proud of himself since the Precambrian, but welcomes a second opinion.`
- `Reminder: a rock cannot be disappointed. Management was disappointed on his behalf anyway, to be safe.`
- `Active listening complete: 3.0 seconds. Clive rates this 'present.'`
- `You interrupted the silence early. The silence has accepted your apology.`
- `You are listening. Clive has not said anything yet; that is how you know it's working.`
- `Hug incomplete. Clive did not notice, as is his gift.`
- `Emotional support received. Emotional support currently in transit, though there was nowhere to go.`
- `Warmth Ring: complete. Clive's thought bubble remains blank, which Management classifies as work.`
- `Active Listening: 3.0 s. Management has added this to the KPIs. The KPI is 3.0 s.`

### affirm1 / affirm2 / affirm3 (chip reactions)
- 1 (`You are doing great`): `'You are doing great,' you said. Clive was already doing great. He has thanked you for the redundancy.`
- 2 (`I believe in you`): `'I believe in you,' you said. Clive believes in you as well, and in the ground.`
- 3 (`It is fine to be a rock`): `'It is fine to be a rock,' you said. Clive has had this on a pillow since the Precambrian.`

### supportKeyword (keyword -> reaction; keywords fixed: tired, sad, work, tuesday, cat, mom, dad, hello, pebble)
- tired: `Clive has been told you feel tired. Clive can wait with you. He has a great deal of practice.`
- sad: `Clive heard sad. Clive is a rock and cannot fix it, but he can sit near it the entire time.`
- work: `Clive has been told about work. He has been at his job since the Precambrian and has never once been promoted. He suggests lunch.`
- tuesday: `You mentioned Tuesday. Management has paused, dimmed the lights, and asked that nobody make eye contact.`
- cat: `Clive has been told about a cat. Clive and the cat have an understanding: neither of them has to move.`
- mom: `Clive has been told about a parent. Clive does not have one. He has a mountain, and he would like to meet yours.`
- dad: `Clive has been told about a parent. Clive does not have one. He has a mountain, and he would like to meet yours.`
- hello: `Hello, said you. Hello, said Clive, in the way a rock says it, which is by being there at the right time.`
- pebble: `The word pebble has been noted. Management asks that we not go there. We are going there.`
- (no match) `Logged as: sound. Clive has seen sound before. He has questions he cannot ask.`
- stamp text (all): `Logged as: sound.`
- Schism trigger line (3rd pebble): `The Great Pebble Schism of 1972 has been entered into the record. It is a three-page tangent. Clive is thrilled.`

### tuck
- `Lights out. Please tuck in Clive. He is already lying down, as he has since the Cretaceous.`
- `The blanket is a folded napkin. Clive has been informed. Clive says it is also a blanket.`
- `Clive has been tucked in. Nothing is different. He seems more comfortable in a way the instruments cannot detect.`
- `Hygiene: 100%. Clive has been put to bed clean. He has not been dirty since Before.`
- `The lamp is dimmed. It is the only warm light in the room. It has been asked to take its time.`
- `Tucking in is a toggle. Untucking is also a toggle. Management is neutral.`
- `Sleep detected. Clive was already asleep. Clive is, strictly, always asleep. It is a kind of expertise.`

### alertHit / alertMiss
- hit: `You answered the alert. Clive did not need anything. This is called a clean response.`
- hit: `Alert resolved. Clive thanks you by not having needed rescuing.`
- hit: `Response time: 1.4 seconds. Target: any. Clive is fine.`
- hit: `You responded to an alert about nothing with total commitment. This is the standard, and you have met it.`
- miss: `You missed the alert. Clive did not need anything. Equal outcome.`
- miss: `The alert has expired. So has the nothing it was about. Clive is fine.`
- miss: `Missed alert noted. Management would like to say it does not matter and it will say it twice.`
- alertText: `Clive needs: nothing. Respond within 3 seconds.` / `URGENT: Clive has not changed in 4 seconds. Clive is fine.` / `ALERT: Clive's needs are at 100%. Please remain calm. Clive is fine.` / `Hunger 0. Thirst 0. Dread 0. Moss pending.`
- alertGentle (from 7:30): `Clive needs: a moment.` / `Clive needs: to be where he is.` / `Clive needs: Thursday, eventually.`

### needs
- `Needs Imminent: Hunger 100%, due in 00:07. Management has set an alarm for 00:00. It will not go off. It will be on time.`
- `The timer has reset. It was one second from zero. Management says it is a very good timer.`
- `Sandra mutters about 7 1/2. Nobody has asked her what she means. It is the number.`
- `The vet checked the timer. It read 00:07. The vet checked again. It read 00:07. The vet wrote 'rock'.`
- `The pebble has its own timer. It reads 00:03.75. It is not quite a countdown. It is a quarterly estimate.`
- `The timer has reached 00:00. Nothing happened. We do not discuss it.`

### poke
- `Pats: %N. Rank: Gentle.`
- `Pats: %N. Rank: Firm.`
- `Pats: %N. Rank: Concerning.`
- `Clive was patted. He did not react. This is his reaction, and it is a strong one.`
- `Petting is permitted. Petting at this speed is classified as 'a lot' and billed at 0 Meh per pat.`
- `Clive has noted the pat. He has been patted before. He is a rock, so this was 4.5 billion years ago.`
- `A pat has been recorded. It was medium, with a hint of concern.`

### spam (poke)
- 15 in 3 s: `Excess Affection Fee: 0 Meh. The fee has been waived, but the waiver has also been waived, so it is back.`
- 15 in 3 s alt: `Please stop tapping Clive. He is not a doorbell. He is, however, available for tapping at a 1 Meh fee.`
- 30 in 5 s: `%N taps detected. Clive has filed a seismic complaint. It registered 0.0 on every scale and was very hurt.`
- 30 in 5 s alt: `Clive's personal space has been breached. It was 3 centimeters. It was all he had.`
- sign: `Do Not Tap` (small sign propped against Clive)
- 100 pokes: `Clive has been polished. He is now smoother for the remainder of this session. Management sighs very tiredly.`
- fee line: `A 1 Meh fee has been applied for the seismic complaint. Clive thanks you for your contribution to rock safety.`

### spamFeed
- `The snack pile has exceeded the Crumb Reserve. Clive is now a hill with a rock inside. Clive is fine.`
- `Rescue in progress. %N of 10 digs completed. Clive thanks you in advance.`
- `Rescue complete. Clive thanks you by not having needed rescuing.`
- `Officer Doily has issued a citation for excessive hospitality. Fine: 0.3 Meh. The officer is a doily.`

### spamTuck
- `Clive has refused to be tucked in. The napkin has folded itself. It exhaled.`
- `Tuck-spam detected. Clive has become a rock that cannot be tucked, only observed being tucked. Very tired sigh.`

### quietRoom (20 button presses in 6 s, once per 60 s)
- `Clive has been placed in a quiet room for his own protection. He will be released in 7.5 seconds. He is fine. The room is also fine.`
- `Clive has been released. He did not notice he was in a room. He notices now and would like it in his file.`

### idle
- 45 s: `Management notices you have stopped. Management is also stopped. We are stopped together.`
- 90 s: `You've been away 90 seconds. Clive did not notice. Clive noticed so quietly that it counts.`
- 150 s: `Clive has been unobserved for 2 minutes 30 seconds. He appears to be enjoying it. An unscheduled page has appeared.`
- 180 s: `Nobody has touched Clive in 3 minutes. He has been tucking in YOU, with a very small blanket, over your cursor.`
- 240 s: `Role reversal engaged. Clive is now caring for you. Player Hunger: Unknown. Clive is worried and extremely still.`
- 240 s diary: `Day 241: The human has not moved. I am worried and extremely still.`
- 360 s: `ALERT: Clive has moved 1 pixel to the left. All hands. Please, someone find a ruler.`
- 360 s follow: `Update: Clive did not move. The monitor did. We have apologized to Clive.`
- 600 s: `Clive has placed a call to Management. The call went to voicemail, which is also Clive.`
- return from 240 s+: `Clive is relieved. Clive would like that noted in his file.`
- return from 150 s+: `Welcome back. Clive did not miss you, he is a rock, but he wrote 14 pages and 3 of them were about the doily.`
- tab-away 30 s+: `Welcome Back Report. Time away: %S seconds. Clive missed you: 0 times. Pages written about missing you: 14.`
- Honorary Mattress toast text: `You have been tucked in by a rock. This is a Distinction.`
- Care Reversal certificate: `There, there.`

### vet
- `Dr. Pemberton-Slate (Veterinary Geology) has examined Clive. Findings: rock. Follow-up in 7 1/2 months.`
- `Vet intake form, question 4 of 7 1/2: Has the rock been exposed to weather? (Yes / Yes, but it was fine.)`
- `Diagnosis: rock. Prescription: more rock. Follow-up: whenever.`
- `Dr. Pemberton-Slate listened to Clive's chest. There was a pause. Then another. The diagnosis was 'quiet'.`
- `The vet recommends no changes, no medication, and a firm handshake that Clive cannot return.`
- `Invoice: 0 Meh. A 3 Meh Empathy Surcharge was applied and then pre-refunded.`
- `The Stapler (union rep) demands Clive be listed as a union member. He has also been pressed into service.`
- `Clive's pulse is geological. The vet describes it as 'a matter of opinion' and a good one.`
- `Clive's heartbeat has been entered as 'quiet'. Clive's insurance covers weathering, wind, and thoughtful silence. It does not cover Tuesday.`
- `The vet checked the Needs timer. It read 00:07. The vet checked again. It read 00:07.`

### sandra
- `Sandra from Compliance has flagged Clive. Per Policy 4.2, minerals may not be pets, only companions of record. Clive is upgraded.`
- `Sandra asks that Clive stop loitering. He has loitered since the last glacial period. She will grandfather him in.`
- `Sandra notes that rocks may not keep diaries. The diary is classified as a very long sigh in paragraph form.`
- `Policy 4.2.1(a): the diary shall be kept in a rock's own hand. The rock's hand is a rock. The diary is approved.`
- `Sandra grants a diary exemption (one page). Management reminds her it is a book. She has noted the reminder.`
- `Sandra has measured the leash at 7 1/2 feet. She would like it noted that it was exactly 7 1/2 feet. It was.`
- `Policy 14 says the rock must walk. Policy 14(b) says the rock may not. Sandra has flagged both.`
- `Sandra has approved the moss. The moss is tiny. So is my heart. Please disregard.`
- `Sandra from Compliance would like to remind everyone that the Precambrian is not a valid employment start date. It has been updated to 'Before'.`

### gerald
- `Gerald, Vice President of Spuds, enters. He regards Clive. 'We are both just the earth, finished early.'`
- `Gerald offered himself as a snack. Clive declined. Gerald called it the most honest rejection of his career.`
- `Gerald remembers you, and your potato-adjacent demeanor.` (only if metGerald)
- `A rock is just a potato that has given up on dreams, and so has achieved peace. - Gerald`
- `Gerald has noted that Clive has no eyes but wrote some on. Gerald finds this courageous.`
- `Gerald has left. He took the silence with him, but it was returned in perfect condition.`
- unmet-audience line: `A small potato silhouette sits in the back of the room. It is not on the agenda.`

### dennis
- `Dennis (Plant) was seen near the habitat, thriving. Clive's diary now contains a redacted paragraph.`
- `Dennis (Plant) sends a card to Clive: 'Thinking of you. Photosynthesizing.' Clive reads it for a long time.`
- `Dennis did not attend. Dennis is a plant.`
- `Dennis has sent a leaf with a note: 'Competent. Unimpressed.' Clive has pinned it on the doily.`
- `Dennis (Plant) has expressed a position. The position is upright.`

### photoCaption (in order)
- `Clive, evolving.` / `Photo 2 of 2 is identical to Photo 1. Caption: Clive, still evolving.` / `Photo 3: Clive, mid-thought.` / `Photo 4: Clive, from the good side.` / `Photo 5: Clive, from the other good side.` / `Photo 6: Clive, pre-dawn light, 4:30 PM.` / `Photo 7: Clive, tasteful.` / `Photo 8: Clive, unretouched, which is the most retouched a photo can get.` / `Photo 9: Clive and the lamp, a partnership.` / `Photo 10: Clive. We have run out of angles. He has all of them.` / `Photo 11: Clive, in love with the moment.` / `Photo 12: Clive. Album full. Clive, as ever, is not.`
- snap line: `Photo %N of %N is identical to Photos 1 through %M. Caption below.` (use only if N >= 2; %M = N-1)

### rain / birthday / rockshow
- `It is raining on Clive. Clive has been issued an umbrella. The umbrella stays put. So does the rain.`
- `The rain is falling on a rock that will outlast it. Both have been told this. Neither has a view.`
- `It is Clive's birthday. He has one daily. A candle has been lit. The number of candles is 'enough.'`
- `Clive's birthday: he is 4.5 billion years old, plus one day. The one day is the important one.`
- `Rock Show: the judges score all rocks a 10. Clive is awarded Best in Show, which is also what everyone else got.`
- `Judge 2 asked what the criteria are. Judge 1 said: rock. Judge 3 gave a 10 out of respect for the criteria.`

### pebble
- `Clive has acquired a pet rock. It is a pebble. The pebble is very needy. The pebble is, again, fine.`
- `The pebble would like to be called Gary Jr. The pebble does not have a Gary. The pebble is optimistic.`
- `Management has begun drafting a third tier of care: a grain of sand. Name TBD. Quarterly.`
- `Management is drafting a fourth tier. It is labeled Quarterly. We have not yet decided what it is.`
- `Pebble due: Hunger 100% -> 100% (change: +0.000). The pebble was fed. The pebble is fine.`
- `The pebble asked a question and Clive answered: 'Fine.' The pebble has questions about that answer.`

### circle
- `Twelve identical rocks sit in a ring. Find Clive. Management will wait. Management has waited before.`
- `That's Clive. (It is also possibly Clive.) Clive would like it recorded that he is not saying which.`
- `That is Clive. That is also Clive. That is a rock, and it will be treated as Clive for all purposes.`
- `You have found Clive. You have also not found him. This is called a draw.`
- `Clive has chosen anonymity. Management calls it a bold career move.`
- `Gerald arrives and offers himself as a snack. Clive declines. Gerald is moved.`

### bedtime
- `Lights out. Please tuck in Clive. He is already lying down, as he has since the Cretaceous.`
- `It is 3:17 AM. Clive has woken you, politely, with a diary entry. It is not an emergency. It is a feeling.`
- `A card from Gerald arrives: 'Have you considered being a potato.' Clive's reply is in the margin: 'Daily.'`
- `A leaf from Dennis arrives: 'Competent. Unimpressed.' Dennis does not attend the 3:17. Dennis is a plant.`
- `The room is dark. Clive's clock reads 3:17 AM. Everyone else's clock reads whatever it wants to.`
- `Management has also been awake. Management has no pet. Management has a laminated sense of purpose, which is a bit like a pet but less warm.`

### inversion
- `Clive has been watching you. He has asked whether you've eaten. This is not in the manual.`
- `A new button has appeared: 'Ask Clive How He Is Doing'. It has no effect. Clive wrote 'He asked' in the margin.`
- `Management admits, unprompted, that it has never owned anything.`
- `Have you eaten? Have you had water? Management asks only because Clive did. Please do.`
- `Margin note: 'He asked.'`

### humans
- `That label was a typo. It has been corrected to 100%. We do not discuss it.`
- `Humans: 38%. Management is correcting this to 100%. Management is correcting this to 100%.`
- `Humans: 100%. Management noted the change and has chosen not to be moved.`

### sediment
- `The Sedimentary Event has occurred. Clive is now Clive, viewed from a slightly different angle.`
- `Management calls it a promotion. Clive declines the raise on a technicality.`
- `Stats unchanged. The vitals remain at 100%. The angle is 3 degrees. The angle is also fine.`
- `Clive has evolved. Clive has also not. Clive says: 'I am the same, but tilted for emphasis.'`

### tuesday
- `Management: Tuesday is 4 days out. Clive is fine. Clive has always been fine on Tuesdays. This is what concerns us.`
- `Tuesday is 3 days out. Clive is fine. Clive is fine. Clive is fine. Management would like to correct that last one.`
- `Tuesday is 2 days out. The calendar has torn itself. The calendar is fine. The calendar needs a moment.`
- `The lamp is flickering. It does that on Tuesdays, apparently. It is not Tuesday. It is practicing.`
- `The Wellness Index has shuddered by 0 pixels. Management has issued a statement about it.`
- `tuesdayFine: Clive is fine. Clive is fine. Clive is fine. Clive is fine. Management would like to correct that: Clive is, statistically, fine.`

### incident75
- `Incidents: 7 1/2. Management celebrates. The half is a major achievement.`

### rankUp
- `Care Certification upgraded: %NAME. The stamp is wet. It will stay wet.`
- `Congratulations. Your rank is %NAME. Please do not look for the next rank. It is also this one.`

### review
- `PERFORMANCE REVIEW (Rock's): Punctuality: Yes. Initiative: Overreaching. Listening: Present. Overall: Meets Expectations, Technically.`
- `Care Quality: Adequate (technically). 'Technically' is doing a lot of work here and has asked for a raise.`
- `Technically.`
- `Footnote: technically.`
- `Clive congratulates you on the most consistent caregiving he has ever witnessed.`
- `A pebble shaped like you drops by your cursor to be adopted. Please feed it. It is also fine.`
- `The timer has reached 00:00. Nothing happened. We do not discuss it.`
- `Care Goal: 99.9999999%. Management reminds you that 100% is a myth invented by Tuesday.`

### graduation
- `Hardcore Mode Complete. Please enjoy Standard Mode.`
- `Care Certification: Chief Rock Officer. Level 1 of 1. Do not look for Level 2. It is also Level 1.`
- `The most consistent number ever produced has been read aloud to the room. The number is zero. The room applauds.`
- `Clive, tonight, was fine. Clive was fine before. Clive will be fine for the foreseeable geological future.`
- `Clive is fine. I wanted to say it one more time for me.`
- `Management wept once. It was a lens issue.`
- `Congratulations. You have reached the end of Hardcore Mode. Hardcore Mode continues.`
- `Day 1 (again). Clive remembers nothing. Clive remembers everything.`
- `Welcome back. Clive remembers nothing. Clive remembers everything.`
- `Tomorrow will be the same. Clive has prepared.`

### slideCaption (6, rising emotion)
- `Slide 1: Clive, Day 1.`
- `Slide 2: Clive, Day 1 (angle adjusted).`
- `Slide 3: Clive, quietly proud.`
- `Slide 4: Clive, loudly proud, in a way you cannot see.`
- `Slide 5: Clive and you. You are not in the photo. You are very much in the photo.`
- `Slide 6: Clive. This one is just Clive, and it means everything.`

### modes (shown in the header chip per loop; loop 1 = Hardcore)
- `Mode: Hardcore.`
- `Mode: Standard. (It is the same.)`
- `Mode: Gentle. (It is the same, but with a bow.)`
- `Mode: Ironic. (It is the same, but with sunglasses.)`
- `Mode: Retired. (It is the same, but with a pension.)`
- Back to Hardcore: `Welcome back to Hardcore Mode. Clive remembers nothing. Clive remembers everything.`
- Loop banner: `Loop %N complete. The moss is one cell larger. The Wellness flag now reads %M.`

### secrets
- blink toast: `Witnessed.` + Management: `That did not happen.` + incident log entry `Blink (Disputed).`
- blink diary denial (next entry gets this P.S. override): `P.S. I did not blink. It was the light.`
- pixel shift: `ALERT: Clive has moved 1 pixel. All hands. Please, someone find a ruler.` then `Update: Clive did not move. The monitor did. We have apologized to Clive.`
- underside: `Clive has been flipped. The underside is also fine. The stats show 100% on this side too.`
- underside diary: `I have seen the other side of myself. It is also me.` (a one-off P.S. override; counts as the next diary entry text)
- resize <400px: `Clive has been compressed. Clive is the same size. Clive would like that noted.`
- resize >5 times: `The walls moved. Clive looked up (a drawn eyebrow). He has always suspected the room was negotiable.`
- name Tuesday: `Management has paused. Please dim the lights. Please make no eye contact with the rock. All text has been adjusted.` + `Tuesday is fine. Tuesday is always fine. This is what concerns us.`
- name Gerald: `There can only be one Gerald.` + a tiny 🥔 cameo toast `Gerald (a different one) has been briefed.`
- name Dennis: `Dennis (Plant) has arrived, delighted, to be told the plant is not the rock.`
- name Moss: `A rock named Moss will not be getting moss. This is unrelated. Management has nothing further.`
- name Sandra: `Sandra from Compliance has been notified. Sandra has declined to be a rock. She is already a rock in spirit.`
- name Clive (default, no special) only: `Clive. A solid choice. A choice with a good silhouette.`
- padlock: see 4.5.1
- polished: see spam
- flip prompt on first underside: `Press U to flip the rock. This is not an instruction. It is a rumor.`
- pebble-three: see supportKeyword.

### memo (ticket joke / misc memos)
- `Memo: the rock is not for sale. The rock has no price. The rock has a doily.`
- `Memo: all care provided is now logged in three places. The first two are the same place.`
- `Memo: Hardcore Mode will be followed by Standard Mode. Standard Mode is the same. Please be calm.`
- `Memo: a rock has been found at the intersection of Care and Zero. It is, of course, Clive.`
- `Memo: please stop asking if Clive is okay. Please continue. It helps.`
- `Memo from the Suggestion Box: 'Add moss.' The box has been told it is a good listener.`
- `Memo: the rock has been in the building since Before. Facilities has no record of letting him in.`
- `Memo: Dennis requests a window. The window has been put on a waiting list. It is a long list. It is a window list.`

### greeting / exit (optional, [inline] one-liners spoken via api.say, try/catch)
- on mount (before intake appears): `Welcome to Hardcore Mode. Please wait while we locate your rock.`
- on exit button (in `destroy`, only if graduated): `Come back whenever. Clive will be here. He has nowhere else to be, and he wouldn't change it.`

Line count check: this file contains well over 100 distinct final lines; the builder must include ALL of them inline.

---

## 9. SECRETS, RARE EVENTS, IDLE AND SPAM

### 9.1 Idle (no pointer/key event inside root or on document for N seconds; `api.now()`-based, wall seconds, not `state.T`)
Idle thresholds in `api.selftest` are divided by 10. Priority: while idle >= 45 s the event deck pauses; beats still fire (they're time based) but if idle > 150 s and a beat is pending, idle sequence still wins visually (beats still queue).
| idle | effect |
|---|---|
| 45 s | Management notes the stop (line). |
| 90 s | Management says Clive noticed. |
| 150 s | Lamp dims on its own, deltas stop ticking. Unscheduled **Entry 0** diary page appears. Secret achievement `pet-rock.sovereign`. |
| 180 s | A tiny blanket SVG appears over the screen edge/cursor ("Clive is tucking in YOU"). Secret achievement `pet-rock.mattress`. Toast text per section 8. |
| 240 s | Role reversal: Habitat shows a panel `CARE OF THE PLAYER`: a bar `Player Hunger: Unknown`, Clive offers a 0-calorie crumb to the camera (a crumb emoji bobbing toward the screen), diary line. Secret achievement `pet-rock.reversal`. |
| 360 s | Clive moves ONE pixel left. Management files an Incident Report, denies it, then quietly appreciates it. Incident +1. |
| 600 s | Clive calls Management; voicemail (which is Clive). |
Any input snaps normal state back (remove blanket/panel, relight lamp) with the return lines. `longestIdle` is stored via `api.stat.max('pet-rock.longestIdle', secs)`.

### 9.2 Spam
All spam detectors use rolling timestamp arrays (cap length 60), not intervals.
- **Poke spam**: 15 pokes in 3 s -> `Excess Affection Fee: 0 Meh` line. 30 pokes in 5 s -> Seismic Complaint: habitat shakes by a fraction of a pixel (translate 0.4px, reduced motion: none), `Do Not Tap` sign, `api.award(-1,'Seismic fee')`. 100 total pokes in the session -> polished highlight for the rest of the session + sigh line. Each detector fires at most once per 20 s.
- **Feed spam**: more than 12 feeds in 5 s -> Clive buried under a snack hill, only eyes visible; click the hill 10 times to dig out (counter line `Rescue in progress. %N of 10 digs completed.`). While buried, Feed is disabled and serves are ignored. On completion: rescue line. Officer Doily citation memo, 0.3 Meh fee (negative award), once per 60 s. Awards secret achievement `pet-rock.hospitality` when the hill is dug out.
- **Tuck spam**: more than 6 toggles in 10 s -> Clive refuses; the napkin folds back by itself with a very tired sigh; tuck button disabled for 5 s.
- **Any-button spam**: 20 care-bar activations in 6 s (once per 60 s): `Quiet Room` blocking modal (7.5 s, not closable), then released. Counts toward `pet-rock.hospitality` too.
- **Hold-spam** (mashing Walk/Support): holds are idempotent; starting a hold while one is active is ignored.

### 9.3 Blink (rare)
After T >= 180 s: each real second (use the master tick, accumulate whole seconds) there is a 1-in-150 chance Clive blinks (lids visible 450 ms). Clicking Clive during the blink: toast `Witnessed.`, +5 Meh, secret achievement `pet-rock.witnessed`. Management does not notice (no line) unless witnessed ("That did not happen."). The next diary page gets the denial P.S. (section 8 secrets).

### 9.4 Pixel Shift (1% per care action)
`Math.random`-free: `api.chance(0.01)`. Clive translates 1 px for 1.5 s, a siren emoji row flashes at the top (reduced motion: static), all gauges go red 1 s, Management panics, then `Update: Clive did not move. The monitor did.` Incident +1. Secret achievement `pet-rock.shifted`.

### 9.5 Name secrets (case-insensitive, trimmed, on Accept Custody)
`tuesday`, `gerald`, `dennis`, `moss`, `sandra` (see section 8 secrets). Naming him `Tuesday` also awards secret `pet-rock.tuesday` with Management's note `The Meh reward for this achievement has been withdrawn in a small private ceremony.` (the achievement still has a tiny reward of 1; ignore the joke, it's decorative). The name appears in the module window title `api.setTitle('Pet Rock: Hardcore Mode (<Name>)')`. All lines use `Clive` literally EXCEPT the module may optionally replace the word `Clive` with the chosen name by a single `String.replace(/Clive/g, name)` in a `say()` wrapper (cheap and effective). If the name is not `Clive`, replace in lines and diary text. Limit name to 16 chars, plain text only.

### 9.6 Resize and tab-away
- `api.on(window,'resize', ...)`: count resizes (debounced 200 ms). Below 400 px width the first time: line `resize <400px`. More than 5 resizes in a mount: line `resize >5`. Habitat tilts 0.0 degrees (CSS: `rotate(0deg)` animation, a joke).
- `document.visibilitychange` (via `api.on(document, ...)`): record hidden time. On return after >= 30 s: Welcome Back Report card with `%S` integer seconds. If a resize happened earlier in this mount and the tab was hidden: unlock Window Dressing page.
- On hide: release any active hold (Walk/Support) cleanly.

### 9.7 Underside (U)
First press shows the underside and the line; 'Press U to flip the rock' hint is shown once as a Management line at 2:00 (non-instruction rumor). Diary one-off as noted.

### 9.8 Hidden: Padlock combos
See 4.5.1.

---

## 10. THE NOT-ENDING (loops)

At the end of Graduation, `loop += 1`, `moss += 1`, persist via `api.save.set('pet-rock', {loop, moss, name, fav})`. Banner line per section 8 `modes`/Loop banner.
- Loop 1 -> `Standard Mode` (the same game, same Clive, a bow on his doily, banner chip changes). Loop 2 -> `Gentle`. Loop 3 -> `Ironic` (sunglasses shown). Loop 4 -> `Retired`. Loop 5 -> back to `Hardcore` with the "Welcome back" line. Cycles on forever.
- Wellness flag target increments (101 -> 102 -> 103...).
- The beat schedule replays (index reset) starting at T = 90 s (skipping intake/firstcare/hardcore/walk/support beats), `speed *= 1.6`. Unlocks stay unlocked. Moss gains a cell on Clive's shoulder per loop; at 100 loops a tiny crown (cosmetic).
- The diary continues forever through the Late bank and dynamic pages; the last page stays `This page intentionally left rock.` In loops 2+ the book indicator reads `Chapter 1 of infinity`.
- Pebble stays; the Feed tray keeps all unlocked snacks; the Pebble-shaped-like-you becomes a permanent small companion in the Crumb Reserve area (counts toward the 24 cap as one item).
- The game never ends and never says it ended. At loop 1 completion Management says `The game continues.` once.
- First-open of a new mount with `loop > 0`: Management greets: `Welcome back. Clive remembers nothing. Clive remembers everything.` and skips the Certificate (Accept auto-done) but still shows Day counter. Day counter: a small label in the status panel, `Day N` (increments each 60 s), with `Day 7 1/2` shown twice (a one-time repeat) and `Day 1 (again)` after graduation.

---

## 11. ACHIEVEMENTS (all declared in the module file; ids prefixed `pet-rock.`)

Use `check` functions only where the stat exists as a global stat, otherwise call `api.achieve(id)` manually at the trigger. Rewards are tiny (1-25).

| id | name | desc | secret | reward | trigger |
|---|---|---|---|---|---|
| `pet-rock.nurturer` | Nurturer of Epochs, First Class | Feed Clive 25 times. He has never been hungry and plans to keep it that way. | no | 3 | `pet-rock.feeds >= 25` |
| `pet-rock.parade` | Grand Marshal of the Stationary Parade | Walk 1,000 metres with zero metres of rock displacement. The parade has been very still and very proud. | no | 3 | `pet-rock.meters >= 1000` |
| `pet-rock.laureate` | Laureate of Unreturned and Perfectly Received Affection | Give Clive 100 seconds of cumulative emotional support. He heard all of it. He will not be able to tell you so. | no | 3 | `pet-rock.hug.seconds >= 100` |
| `pet-rock.archivist` | Archivist of the Quiet Interior | Read all 13 diary entries. You now know a rock in a way that few have, and it is slightly too much. | no | 5 | read ordinals 1..13 (track a Set) |
| `pet-rock.custodian` | Grand Custodian of the Unchanging Metrics | Perform 25 care actions without a single gauge moving. | no | 3 | `state.actions >= 25` |
| `pet-rock.chancellor` | High Chancellor of Active Listening | Complete the full 3.0-second hold 10 times. | no | 3 | `pet-rock.hugs >= 10` |
| `pet-rock.graduate` | Chief Rock Officer, Level 1 of 1 | Complete Hardcore Mode. It continues. | no | 25 | first graduation |
| `pet-rock.shifted` | The Pebble Shifted | Witness Clive move 1 pixel. It was the monitor. | yes | 5 | Pixel Shift (9.4) |
| `pet-rock.sovereign` | Sovereign of Doing Nothing to a Rock Already Doing Nothing | Leave Clive entirely alone for 150 seconds. He has never felt so seen by being unobserved. | yes | 5 | idle 150 s |
| `pet-rock.mattress` | Honorary Mattress of the Mineral Kingdom | Be tucked in by the rock after 3 minutes of idleness. | yes | 5 | idle 180 s |
| `pet-rock.reversal` | The Care Reversal | Idle for 4 minutes and be cared for by a rock. Awarded with a handwritten certificate that says 'There, there.' | yes | 5 | idle 240 s |
| `pet-rock.tuesday` | Prophet of the Tuesday Pebble | Name your rock Tuesday. Management withdrew the reward in a small private ceremony. | yes | 1 | name |
| `pet-rock.hospitality` | The Hospitality Violation, Level Seven-and-a-Half | Bury Clive in snacks, or be placed in the Quiet Room. | yes | 5 | 9.2 |
| `pet-rock.witnessed` | Witnessed | Click Clive during the blink. It did not happen. | yes | 5 | 9.3 |
| `pet-rock.entryzero` | Entry Zero: Birthday | Type 4500000000 into the padlock. Clive has been waiting a very long time. | yes | 3 | 4.5.1 |
| `pet-rock.chair` (optional P2) | Chair of the Rock Wellness Committee | Complete 5 graduations. The committee is two pebbles and a potato. | no | 10 | `pet-rock.loops >= 5` |

(Declare >= 6 achievements, >= 2 secret: this list has 9 secret.)

---

## 12. IMPLEMENTATION HINTS (single file, <= 1800 lines)

**Structure of `games/pet-rock.js`** (order):
1. Header comment `/* POINTLESS module: pet-rock */`, IIFE, `'use strict'`, `P = window.POINTLESS`.
2. CSS string (<= ~220 lines), injected once with `P.injectCSS(css, 'css-pet-rock')`. Use CSS variables on `.m-pet-rock-app`. Keyframes: needle jitter, wobble, breathe, lamp flicker, flip, tuck, rain, siren, parallax not needed (JS-driven transform).
3. Data: lines in `P.addLines('m:pet-rock:<group>', [...])` (group by situation exactly as in section 8), diary arrays, snack list, beats, achievements via `P.addAchievements`.
4. `registerModule({... mount(root, api){ ... return { destroy(){...} } } })`.
5. Inside `mount`: one `state` object (all counters, flags, unlocked set, timers, holds, modal), `ui` (element refs), helpers: `h` = `api.el`, `fill(str, map)`, `say(text, opts)` (wraps `api.say`, replaces `Clive` with the chosen name, never passes falsy text), `award(n, why)` (token bucket), `bump(vital)` (delta ticker), `unlock(feature)`, `openModal(el, closeFn, autoMs)`, `closeModal()`, `fire(beatId)`, the master `tick()`, `onKey()`, `holds`, `render*` functions. Build DOM once, update by `textContent`/class toggles; do NOT rebuild big sections per tick.
6. `destroy()`: remove modal DOM and overlays; reset module-level variable `polished` is allowed to persist; everything else is tied to `api.on/api.set*` so auto-cleans. Always `return {destroy}`.

**Builders' conventions**
- Build static markup via `api.el` or one template string assigned via `innerHTML` ONLY for constant SVG/markup with no user text. User text (rock name, typed affirmation, combination) goes through `textContent`/`value` only.
- Use pointer events (`pointerdown/move/up/cancel`) with `setPointerCapture` in try/catch. Provide `touch-action: none` on the Habitat only while a walk drag is active (set via class), otherwise `touch-action: manipulation` so the page can scroll.
- A single hold controller: `startHold(kind)`, `endHold(kind, reason)`; kinds `walk`, `support`. Release on `pointerup`, `pointercancel`, `pointerleave` (for the button), `blur` (window), `visibilitychange`, `keyup`, destroy, and when its button is disabled. Idempotent. `state.hold = null` when ended.
- `tick()` updates holds (walk meters, ring progress), needs timers (once per 250 ms), Day counter, the beat scheduler, the event deck timer, the idle checker, the blink dice, the Zeno display (only when `actions` changed), the album/crumb caps. Everything in ONE interval. Per-frame work (pupil spring, leash, parallax) in one `api.requestAnimationFrame` loop that re-requests itself only while something is moving (or every frame if simpler; it's managed).
- `api.say` frequency: say something on every care action, every event, every beat. Use priority 1 for beats, 0 for flavor, 2 for panic lines.
- `api.sfx` map: feed `tick`, walk `whoosh` (once at start), support `bloop`, tuck `pop`, diary page `bell`, citation/stamp/rank `stamp`, alert `blip`, spam `buzz`, humans glitch `sad`, graduation `tada`, evolution `fanfare`, error sound unused.
- Cap everything: crumbs 24, album 12, ticker 6, incident log 12 (a small `<ul>` in the status panel's expandable details; if too much, skip the log and only keep the counter), visible rain 30, memo cards on screen max 3 (oldest auto-fades after 8 s), toasts via `api.toast`.
- `api.rand`/`api.chance`/`api.pick`/`api.shuffle` for ALL randomness (determinism under `?seed`). Never `Math.random`. Never `Date.now`/`performance.now` (use `api.now()`).
- Each Management line should be spoken with `{mood}` where meaningful: `proud` for clean handoffs, `confused` for vet, `panic` for pixel shift/80th action/Tuesday, `smug` for Zero (Deluxe), `disappointed` for missed alerts.
- Save: `api.save.get('pet-rock', {loop:0, moss:0, name:'Clive', fav:0})`. Wrap in try/catch; coerce numbers (`|0`) and clamp (`loop` 0..99999, `moss` 0..99999). Never trust the saved name (limit 16 chars, strip control chars).
- Keyboard: Arrow keys must not scroll the page when handled (`preventDefault` only when the key is actually consumed).
- `prefers-reduced-motion`: CSS `@media (prefers-reduced-motion: reduce)` kills keyframes, flip, shake, parallax; JS reads `matchMedia(...).matches` once per mount in try/catch and skips parallax transforms and sparkle layers.
- A11y: `aria-live="polite"` on the ticker and on a dedicated `Clive Says` region (the most recent diary text and Management echo); buttons have `aria-label`s; gauges have `role="img"` + `aria-label` `Hunger: 100 percent`.
- Priority if near 1800 lines (cut in this order): Album frames (keep counter only), Rock Show, Birthday, Weather, Support Circle (keep as a toast line), Rain, Photo Day, the 3-page Schism, Window Dressing, Underside. KEEP: Feed, Walk, Support, Tuck In, Diary (+ padlock), Delta ticker, Zeno bar, Needs timer, beats Intake/Vet/Pebble/Bedtime/Inversion/Sedimentary/Tuesday/Review/Graduation, the idle sequence, the spam handlers, name secrets, blink, pixel shift, loops.

**Fuzz-harness friendliness**: every blocking modal has a button and auto-close; the Certificate auto-accepts in 12 s of module time (and under `api.selftest`, advance quickly: speed x12); the padlock accepts any input; every hold ends on pointerup; `api.selftest` boosts `speed` and divides idle thresholds by 10; buttons you disable must re-enable on a timer; the fuzzer will click the snack hill, the pebble, memo cards (make memos clickable to dismiss).

---

## 13. RISKS: the 5 most likely implementation bugs

1. **Stuck holds (Walk/Support).** `pointerup` fires outside the button, the window loses focus, the tab hides, a `keyup` is swallowed because focus moved, or the button becomes disabled mid-hold, leaving the ring/walk running forever (leash sagging, meters ticking, Meh accruing). Fix: one `endHold()` idempotent function called from pointerup/cancel/leave, window blur, visibilitychange, keyup, destroy, and a safety check in `tick()` that auto-ends any hold lasting > 20 s. Ignore `e.repeat` keydowns for holds. Also: Space/Enter on a focused button triggers both keydown (hold start) AND click on keyup, so `preventDefault` on those keys for hold buttons, and never let a click handler double count the same hold.
2. **Modal deadlocks and beat-scheduler stalls/floods.** Two blocking modals at once, a modal with no reachable close button (the fuzzer cannot read instructions), a beat that sets `state.modal` and never clears it on destroy/remount, or a hidden tab that makes `dt` huge and fires every beat at once. Fix: one `openModal/closeModal` pair with a single `state.modal`, every modal gets a visible button AND an auto-close timer, `dt` clamped to 1 s per tick, at most one beat per 8 s with the "overdue > 90 s -> skip" rule (review/graduation excepted), and on remount all beat indices and state are reset because `state` is created inside `mount`.
3. **Leaks and unbounded DOM.** Crumbs, album polaroids, ticker lines, incident cards, memo cards, rain drops and diary page DOM grow without caps; a document-level `keydown` listener or `window` resize listener is attached with the raw `addEventListener` instead of `api.on`; an interval is started per timer instead of one master tick; the pupil RAF loop survives destroy; typewriter timers are not cleaned. Remounting 20 times then breaks the fuzz leak check. Fix: only `api.setInterval/setTimeout/requestAnimationFrame/on`, cap every list (24/12/6/12/30/3), rebuild nothing per tick, and clear the typewriter timer when the page changes or the diary closes.
4. **Keyboard shortcut collisions and focus loss.** `F/W/S/T/D/U/1/2/3` firing while the player types a name, an affirmation or a combination (and the name input becomes `FFFF`), shortcuts firing with Ctrl/Alt (browser shortcuts) or `B` (Lobby boss key, which must stay free), arrow keys scrolling the page or paging the diary while walking, repeated keydown auto-repeat spamming feeds, and focus being lost when a button is replaced/disabled. Fix: the guard described in section 4 (ignore input/textarea/select/contenteditable targets, modifier keys, `e.repeat`, open modals), `preventDefault` only when consumed, never rebuild a focused button (toggle `disabled`/classes instead), restore focus to the triggering button when a modal closes.
5. **Visible `NaN`/`undefined`/`%TOKEN`/huge-number glitches in UI text.** The Zeno nines count (`floor(n*0.30103)` with a huge n), `toFixed` with an out-of-range digits argument, scientific formatting at n 13..39, the 40-digit zero (build with `'0'.repeat(40)`, never from `Number`), the `%N`/`%FAV`/`%P`/`%S`/`%KW`/`%NAME`/`%M` tokens left unreplaced when stats are zero or the favorite is unset, `api.line` returning a line containing a literal engine token, dynamic diary entries rendering with `undefined` because the verb counts are zero, average meters dividing by zero, and `Day 7 1/2` handling. Fix: a `fill()` helper that replaces every known token with a coerced safe string and a final sweep `s.replace(/%[A-Z]+/g,'')`; guard every dynamic diary entry by its condition and fall back to the Late bank; always `String(Math.max(0,Math.floor(x)||0))` for any number that is printed; clamp n in formatting functions; run `?selftest=pet-rock` at several seeds and eyeball the ticker at actions 1, 12, 13, 39, 40, 59, 60, 80.

---

## 14. ACCEPTANCE CHECKLIST (for the builder before reporting)

- `node tools/lint.js games/pet-rock.js` clean; `node tools/selftest.js pet-rock --steps 400` PASS at seeds 1..3; screenshot at 1100x700 and 360x740 with `node tools/shot.js pet-rock --width 360 --height 740`.
- First joke visible within 10 seconds of mount without any input (the Certificate's `Birth date: Before` plus the 0:03 Management line).
- >= 80 distinct lines inline (this brief has 250+), >= 6 achievements (>= 2 secret), >= 3 callbacks (Gerald, Dennis, Sandra, Stapler, Sock, Toaster), >= 3 secrets, one idle event, one spam event.
- No way to win: all rewards are tiny; the Wellness Index never moves; the Care Goal never reaches 100%.
- The ending is not an ending: confirm that Graduation loops and the "intentionally left rock" page stays last.
