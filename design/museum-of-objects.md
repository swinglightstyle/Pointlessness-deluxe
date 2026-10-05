# MUSEUM OF EVERYDAY OBJECTS (id: `museum-of-objects`, category: `department`) - FINAL DESIGN BRIEF

Tagline: **"Please do not touch the Tuesday."**
Icon: 🏛 (Emoji 7, safe). Tags: `['walking','audio-guide','museum']`. `unlockCost: 0`. Window title (`api.setTitle`): **"The Museum of Things (Admission: Yes)"**. File: `games/museum-of-objects.js` (single file, classic script, IIFE, `'use strict'`, **hard cap 1800 lines, aim for <= 1650**; section 3 lists what to drop first). CSS prefix `m-museum-of-objects-` (write the literal prefix in every CSS selector so `tools/lint.js` sees it; short suffixes are fine: `.m-museum-of-objects-t`; in JS use `const k = s => 'm-museum-of-objects-' + s`). Stats, achievements: `museum-of-objects.*`. Shared flags (intentional, for other modules): `museumSockSeen`, `museumHalf` (camelCase like `metGerald`; the flag-prefix lint warning is accepted). Line categories: `m:museum-of-objects:<name>`.

A builder who reads SPEC.md, VOICE.md and this file has everything needed. Nobody is available to answer questions: where this brief is silent, pick the simplest thing that is funny and safe. Strings in code blocks and after `| ` on list lines are verbatim (ASCII only; `%name%` markers are replaced by your own code, never use `{...}` tokens except the engine's `{player}`). Never put the words null/undefined/NaN in any string.

---------------------------------------------------------------------------------------------------

## 1. CONCEPT

You are the only visitor in a museum of aggressively ordinary objects, holding a brick-sized audio-guide handset. The **Audio Guide** (Dr. Ambrose Fenwick-Lowe, recorded 1987, delighted to be alive in a plastic box) narrates a paperclip like the Treaty of Something, in total scholarly sincerity, as subtitles on the handset's green LCD with karaoke highlighting. You walk a top-down gallery of three wings (plus secret rooms), stand still next to a plinth, press PLAY and listen.

**The signature joke is the KEYPAD.** The handset has a real 0-9 keypad. The guide plays whatever track you type, at whatever you happen to be standing in front of. Type 02 at the paperclip and it describes a glove TO a paperclip ("The paperclip has not consented"). 12 standing spots x 15 codes, every pairing assembled from bags so it reads differently. Typing is the main joy-engine.

**The second joke: the exhibits are not the exhibits, you are.** Your own footprints get frozen, roped off and catalogued as "Exhibit 13: Your Earlier Walk", narrated with your real route (tiles walked, left turns, hesitations). Your Meh balance gets a plinth. Your name gets a placard. Your last click gets a frame. If you stand still for 62 seconds you are accessioned as "Exhibit 99: Visitor, Standing" while little visitors sketch your shoe.

**The third joke: the gift shop sells recursion** (a postcard of the postcard of the postcard, cheaper at every level, price dropping to free).

Arc (VOICE.md rule 3): normal (a reverent paperclip) -> weird (keypad mash-ups, Tuesday, gaze tiers) -> bureaucratically unhinged (Sandra edits placards, Colin moves you along, the trail is a trip hazard, nested postcards) -> strangely touching (Staff Only: the guide is a recording made from a catalogue of a catalogue, and has never seen an exhibit; "Thank you for listening to all of it. No one has before.") -> back to normal like nothing happened (Exit becomes Entrance, "You are Visitor 1. Again.", completion meter reads 3.1%, it always did).

**No way to win.** The museum is "completed" and the meter reads 3.1 percent. The ending sincerely congratulates you and the museum continues.

Distinct from other modules: the only one with a walkable floor plan, a real numeric keypad that creates mismatched narration, a player-trail-as-exhibit mechanic, and a shop whose product is recursion.

---------------------------------------------------------------------------------------------------

## 2. SHOWRUNNER DECISIONS (three pitches merged)

Spine = pitch 1 (walkable 11x7 wings, plinths, keypad mismatch mash-ups, trail becomes exhibit, gaze tiers, Colin, idle accession, half key, Staff Only, nested postcards). Borrowed: pitch 2's Dr. Ambrose Fenwick-Lowe, the "I was recorded in 1987... Thank you. Anyway." beat, the 3-step Colin gag shape, After Hours, Dennis the ficus, track-number jokes (000, 404, 666, 911, 999), postcard price drop and shop-jam gag, "tastefully cropped". Borrowed from pitch 3: Sandra's contradictory rules, critic quotes (as Sandra margin notes), the shopping-list rare event, "Please hold" tone, resize joke.

**One guide, one guard.** Barnaby (pitch 2) and Dame Honoria (pitch 3) are NOT built. Colin is the guard.

**CUT (do NOT build):** Visitors' Book text input (keyboard conflicts), Depth key and 5 depths, Contemplate lean-in lens and fog, Barnaby, 24 objects (we have 12 + 3 almost + 4 self-exhibits), miniature-museum recursion, battery drain meter (battery is a static gag: "3%"), feTurbulence heat haze (use a CSS shimmer), Wing C "anticipated Tuesday" closure, fractal zoom animation of postcards (keep the text and the nesting), the real-date Tuesday check (no `Date`), canvas dust motes, swipe-to-walk.

---------------------------------------------------------------------------------------------------

## 3. TIER PLAN AND LINE BUDGET (read before writing code)

Build in order; after each tier run `node tools/lint.js games/museum-of-objects.js` and `node tools/selftest.js museum-of-objects`. If the file nears 1700 lines drop from the end of the T3 list upward, then T2 from the end.

- **[T1] The spine (must ship):** layout + strip + clock, wing renderer (plinths, doors, visitor), BFS click-walking + keyboard walking, handset (LCD, karaoke subtitles, keypad, PLAY, CLEAR), correct tracks + wander + partial credit + passport, keypad mismatch mash-up generator + invalid/special codes, half key + Wing 7.5, gaze tiers, trail footprints + freeze into exhibit with real counters, completion meter, idle accession (Exhibit 99), spam (Colin dash + photo of photo + keypad battery), Gift Shop with nested postcards, Staff Only tape + the not-ending (certificate, Reprise), saves, all achievements, all T1 strings.
- **[T2]:** Colin's patrol and Move Along, Sandra margin notes and placard "Yes.", self-exhibits (58/59/60), After Hours, Dennis, Sock crossing, Management interrupts, D-pad, pair overrides.
- **[T3] (drop first):** Observation Pass details, shopping-list rare event, resize joke, tab-hidden welcome back, shop jam, Exit-sign-turns-into-postcard, right-glove postcard, 000 x3.

Rough budget: CSS 190 (one dense rule per line, `@media` blocks included) + strings 330 (pack several short strings per physical line) + helpers/bags 70 + wing renderer 130 + walk/BFS/keys 130 + handset/LCD/karaoke 110 + tracks/mash-up 120 + gaze 60 + trail/freeze 90 + shop/postcards 130 + secrets (idle/spam/half/staff/sock) 170 + ending 80 + saves/achievements/stats 80 = ~1700. Write tight: one `Bag` helper (shuffle bag, never same twice in a row) for every line pool, one `say(text, opts)` wrapper, one `panel(name)` to switch gallery/shop/staff/cert.

---------------------------------------------------------------------------------------------------

## 4. CONTROLS (all must work; keys belong to the module while open)

The root gets `tabindex="-1"`, is focused on pointer down (`root.focus({preventScroll:true})`), and the keyboard handler is attached with `api.on(root, 'keydown', ...)` (and `keyup` for gaze). Re-focus the root after every wing rebuild (the focused button is destroyed and keys would go to the body).

**Walk (three equivalent ways):**
- Mouse/touch: click/tap any floor point. A single transparent overlay `div` over the gallery maps `pointerdown` to a tile: `col = floor(offsetX / width * 11)`, `row = floor(offsetY / height * 7)` (no 77 DOM tiles). BFS over the 77-tile grid (4-neighbour, plinths and the Dennis tile blocked) gives the path; the visitor glides at 5 tiles/s with delta-time (rAF argument). Clicking a blocked tile walks to the nearest free tile next to it. Clicking a new target mid-walk replaces the path from the tile you are currently on.
- Keyboard: arrows or WASD move ONE tile per press (key repeat throttled to 8 steps/s, ignore if a step glide is in progress and queue at most 1). Walking into a door tile changes wing.
- Touch aid: a translucent D-pad (4 buttons) shown only if `matchMedia('(pointer: coarse)').matches` was true when read ONCE inside `mount` (wrap in try/catch, never attach a listener to the MediaQueryList).

**Listen:**
- Standing in Range (Chebyshev distance <= 1 from a plinth tile, not walking) shows on the LCD `TRACK 01 READY. PRESS PLAY`. Space/Enter (when the event target is the root or the gallery, NOT a focused button) or the big coral PLAY key plays the correct track.
- Clicking/tapping a plinth (`<button>`; Enter/Space on the focused button does the same) walks to the free adjacent tile on your side and starts the correct track on arrival (once per click).
- Standing STILL is required during a track. Any step or wing change cancels it (wander).

**Keypad (the signature):** 3x4 digit grid plus a right column: PLAY (coral), CLEAR (mustard), and the half key (hidden until unlocked). Type with the mouse/finger or the number row/numpad; `Backspace` deletes one digit, `Enter` plays, `Escape` clears the buffer (if the buffer is already empty, Escape toggles the handset collapsed/expanded, 'Escape closes the handset'; while collapsed only the LCD strip remains). Buffer holds max 6 characters (a 7th press is refused with sfx `buzz` and the `kpad.cap` line). The typed buffer is shown on the LCD as `CODE 07_`. Auto-play fires 1000 ms after the last digit once the buffer has >= 2 characters (managed timeout, cancelled by any further key); a single digit needs PLAY/Enter (so `7` then the half key works). `.` on the keyboard types the half key ONLY once unlocked; before that it is refused with the `kpad.nokey` line.

**Gaze (secondary):** hold `G`, or hold the pointer 400 ms+ on a plinth, while In Range. A gold ring (one shared SVG circle, `stroke-dashoffset`) fills. Thresholds 3 s, 7 s, 12 s of one continuous hold = Tier 2, 3, 4. Release, step away, any other key, 14 s timeout, or `blur` ends it. A pointer tap (< 400 ms) is a walk-and-listen, not a gaze.

**Everything else:** every control is a real `<button type="button">` or has `role="button"` + `tabindex="0"`. Tab visits: plinth buttons, door buttons, Dennis, roped trails, handset keys, shop buttons. Boss key (grave accent) is engine-owned; do not handle it.

---------------------------------------------------------------------------------------------------

## 5. SCREEN LAYOUT AND VISUAL DESIGN

Root is a CSS grid `grid-template-rows: auto 1fr auto`, min-height 420px, works 360-1400 px.

1. **Brass title strip** (auto): left, wing name (`Wing A: Office Antiquity`); centre, a small SVG wall clock whose hands turn slowly but whose label always reads `TUE 4:17`; right, `Museum completed: 3.1%` (hover/focus title text can carry the "Down 0.3% since you read this" note), plus the **Visitor Passport** (12 CSS boxes, a stamped box = rotated rectangle with random ink and rotation) and a tiny `Storage: N%` counter (the unheard percent of abandoned tracks).
2. **The Gallery** (1fr): `aspect-ratio: 11 / 7; width: min(100%, calc((100vh - 300px) * 11 / 7)); margin-inline: auto`. Floor: checkerboard marble `#ece4d2` / `#d6cdb8` from two repeating conic-gradients sized `calc(100% / 11)`. Walls: top and side border strips in oxblood `#6b1f2a` with a brass `#b8893a` picture-rail band. Ceiling shadow: one radial-gradient vignette overlay (`pointer-events:none`). All positions are percentages: `left = (x + .5) / 11 * 100%`, `top = (y + .5) / 7 * 100%`.
3. **Bottom dock** (auto): a two-column grid, left the **Wall Label** card (brass-edged, shows the placard text of the exhibit in range, tier text, Sandra's margin notes, `Reprise` text), right the **Handset**. Under 640px: single column, handset keypad becomes two rows of 7 columns (`1 2 3 4 5 6 7 / 8 9 0 [half] CLEAR PLAY(span 2)`), D-pad shown on coarse pointers.

**Palette (after-hours gallery):** marble `#ece4d2`/`#d6cdb8`, walls oxblood `#6b1f2a`, brass `#b8893a`, plinths bone `#f5f0e4` with 4px `#2b2420` outline, glass domes translucent `#cfe8e3` with a white highlight (curved linear-gradient plus a rotated white stripe pseudo-element), spotlight pale yellow `#fff3b0` radial-gradient behind each lit plinth (slow pulse), velvet `#8b1a2e`, page greige `#e9e2d3`. Lobby-consistent thick dark outlines `#2b2420` and sticker shadows (`4px 4px 0`) on placards and the handset. Wing B tint warm, Wing C a faint cool tint, Wing 7.5 half-height (room drawn at 55% height, bordered like a painting).

**Handset (CSS only):** rounded beige `#d9d0b8` brick, green LCD (`#1f3d2b` text on `#b9e3a8`, monospace, scanlines via repeating-linear-gradient, a tiny battery icon that ALWAYS shows `3%`), three LCD rows: `TRACK 01` (or `CODE 07_`), progress bar, subtitle. Subtitles: current word-group highlighted in inverse video. Keypad buttons chunky round, PLAY coral `#f26b5b`, CLEAR mustard `#e3b23c`. Half key `1/2` appears with a small pop animation. A coiled cord is an SVG path from the handset corner (static; no animation required).

**Exhibits:** emoji 56-72px (clamp) inside a dome on a CSS plinth with a small brass placard showing the track code as a bold numeral. Tuesday's plinth is empty and has a CSS shimmer (animated gradient, disabled under reduced motion). Visitor = 🚶, flips with `scaleX(-1)`. Footprints 👣 at opacity .25. NPC crowd = 🚶 with `filter: hue-rotate(Ndeg)` (do NOT use 🧍 or 🪑, Emoji 12 may be a blank box on Windows 10). Guard Colin = 🕴 with a flashlight cone (small conic-gradient pseudo-element, rotated toward his heading). Sock = 🧦 and 🧳 side by side, sliding at 3x speed. Postcard stamp 📮.

**Emoji table (all Emoji <= 12; if lint flags one, swap the listed fallback):** 01 📎, 02 🧤, 03 (none, empty plinth), 04 🍽 (fallback ⚪), 05 🔑, 06 🥄, 07 🧦, 08 🧾, 09 💺, 10 🥔, 11 🥏 (fallback ⭕), 12 🗜, Dennis 🌿, Colin 🕴, clerk 💁, statue 🗿, pencil ✏, postcard 📮, almost-objects 7.5a 🚪 7.5b 🥄 7.5c 🔑.

**Reduced motion** (`prefers-reduced-motion: reduce` and the engine's `.pm-reduce-motion`): no spotlight pulse, no Tuesday shimmer, no clock hand turning, no Colin dash blur, no sock slide (the sock simply appears and disappears in a different tile), no half-key pop. Karaoke highlighting stays (it is text state, not motion).

---------------------------------------------------------------------------------------------------

## 6. WORLD DATA

### Wings (tile coordinates, x 0-10, y 0-6; `[x,y]`)

```js
const WINGS = {
  A: { name: 'Wing A: Office Antiquity', start: [5,5], turnstile: [5,6], dennis: [0,6],
       plinths: { '01':[5,3], '02':[2,2], '03':[8,2] },
       doors: [ {x:10,y:3,to:'B',sign:'WING B'}, {x:0,y:3,to:'H',painted:true,sign:'(a door)'}, {x:9,y:6,to:'SHOP',sign:'EXIT',gated:true} ] },
  B: { name: 'Wing B: Domestic Mysteries', start: [1,3],
       plinths: { '04':[3,2], '05':[5,2], '06':[7,2], '07':[5,4] },
       doors: [ {x:0,y:3,to:'A',sign:'WING A'}, {x:10,y:3,to:'C',sign:'WING C'} ] },
  C: { name: 'Wing C: Hall of Left Things', start: [1,3], guard: [[1,5],[9,5],[9,6],[1,6]],
       plinths: { '08':[2,2], '09':[4,4], '10':[6,2], '11':[8,4], '12':[9,2] },
       doors: [ {x:0,y:3,to:'B',sign:'WING B'}, {x:5,y:0,to:'STAFF',sign:'STAFF ONLY',gated:true} ] },
  H: { name: 'Wing 7.5: Objects That Almost Happened', start: [5,5],
       plinths: { '7.5a':[3,2], '7.5b':[5,3], '7.5c':[7,2] },
       doors: [ {x:5,y:6,to:'A',sign:'(back)'} ] }
};
```
Self-exhibit plinths (T2) appear in Wing A when earned: `58` at [8,5], `59` at [10,5]... use [9,4] and [7,4], `60` at [3,4]. `99` is NOT a plinth (it replaces the visitor). Frozen trails are roped zones, not plinths. When changing wing the visitor appears on `start` (or next to the door they came through: pass `from` and use the tile beside the matching door). The Gift Shop and Staff Only are panels (no walking), not wings. `gated` doors: Exit is hidden (painted wall) until 270 s or 6 tracks heard; Staff Only is a locked sign until unlocked (section 8).

In Range = Chebyshev distance <= 1 to a plinth tile. If in range of two plinths, pick the nearer (tie: lowest code).

### The 12 exhibits (+3 almost) as data (transcribe exactly)

`v` = the phrase used when this object is the TYPED code in a mismatch. `S` = how the exhibit is named when it is the one you are STANDING at. `t[]` = tiers: T1 label, T2, T3, T4 (T4 is always the plain literal; then the small placard 'Further Interpretation Withdrawn' replaces the card text after 4 s). `track` = 3-5 sentences, one every 2.2 s. `wander` = exhibit-specific wander line. `reprise` = the Reprise placard (used after the ending).

```js
const EX = {
'01': { e:'📎', S:'the Paperclip', v:"a paperclip's quiet legal opinion", wing:'A',
  t:["Exhibit 01: Paperclip. Steel, 32 mm, c. Tuesday. On loan from a drawer.","a bent promise","a small sculpture of the concept of holding","It is a paperclip."],
  track:["Exhibit 01: Paperclip, steel, 32 millimetres. Please stand where it can see you.","Note the bend. The bend is the entire argument.","It holds two sheets together without once asking either how they feel.","Some say the paperclip is a small wire thinking. We say it is a small wire.","We have learned nothing and are better for it."],
  wander:"The paperclip does not follow you. It has held worse departures.", reprise:"Paperclip (Reprise): a paperclip that remembers you." },
'02': { e:'🧤', S:'the Left Glove', v:'the grief of a glove', wing:'A',
  t:["Exhibit 02: Left Glove. Wool, bereaved, c. Tuesday. Its right is in the next wing.","the shape of an absence with a thumb","a small sculpture of the concept of almost","It is a glove. The left one."],
  track:["Exhibit 02: Left Glove, wool, bereaved. Please walk slowly. It can hear.","Its right glove is %loc%.","The thumb points toward a hand that is not here. Scholars call this Longing. The cleaners call it Tuesday.","It has never given a thumbs up. It is not that kind of thumb."],
  wander:"The glove watches you go. It has had practice.", reprise:"Left Glove (Reprise): a left glove and, technically, two." },
'03': { e:'', S:'the empty plinth called Tuesday', v:"Tuesday's reluctance to attend", wing:'A',
  t:["Exhibit 03: Tuesday. On loan to itself. c. Tuesday.","on loan to a Wednesday","on loan to a smaller Tuesday","It is an empty plinth."],
  track:["Exhibit 03: Tuesday. Currently on loan to itself. Please enjoy the empty plinth responsibly.","The plinth is slightly warm. This is where Tuesday was last felt. Do not lean.","Tuesday has been rescheduled for Tuesday."],
  wander:"You have left Tuesday. Tuesday does not mind. Tuesday is not here to mind.", reprise:"Tuesday (Reprise): back soon." },
'04': { e:'🍽', S:"the Plate of the Last Biscuit", v:"a biscuit's unfinished business", wing:'B',
  t:["Exhibit 04: The Last Biscuit's Plate. Ceramic, c. Tuesday. The biscuit declined to be loaned.","a plate that has witnessed a decision","a small sculpture of the concept of nearly offering","It is a plate."],
  track:["Exhibit 04: the plate of the Last Biscuit. The biscuit is not present. The biscuit was the point.","Three people said, you have it, and meant it for nine minutes.","Then someone had it. We will not name the someone. The plate remembers a hand.","Do not ask who. The plate has already declined."],
  wander:"The plate has been left holding nothing. It is used to this.", reprise:"Plate of the Last Biscuit (Reprise): a second last biscuit, unconfirmed." },
'05': { e:'🔑', S:'the Key to Nothing', v:"a key's confidence in a door that is not there", wing:'B',
  t:["Exhibit 05: Key to Nothing. Brass, c. Tuesday. Fits one door. Door unavailable for comment.","a confident shape looking for a question","a small sculpture of the concept of almost opening","It is a key."],
  track:["Exhibit 05: a key. To what? The museum has asked. The door declined to comment.","We have tried it in everything. It remains optimistic.","It has the shape of an answer. We are keeping the question out of the building."],
  wander:"The key was about to open something. It will keep that to itself.", reprise:"Key to Nothing (Reprise): key to something. Nothing has been informed." },
'06': { e:'🥄', S:'the Spoon', v:"a spoon's small, shallow ambition", wing:'B',
  t:["Exhibit 06: Spoon. Steel, slightly damp, c. Tuesday. The dampness is original.","a shallow ambition, politely held","a small sculpture of the concept of almost enough","It is a spoon."],
  track:["Exhibit 06: Spoon, slightly damp. Conservators have been asked to leave the dampness alone.","It has held soup, cereal and, once, a decision.","It is shaped like a small bowl, in case of emergencies. There has not been an emergency. It stays ready."],
  wander:"The spoon has not been left. It was never held. This is fine.", reprise:"Spoon (Reprise): a damp spoon, nearly bought, now owned by no one." },
'07': { e:'🧦', S:'the Missing Sock', v:'a sock on a journey nobody authorised', wing:'B',
  t:["Exhibit 07: Sock, Left, Missing (On a Journey). Cotton, c. Tuesday. The case is empty on purpose.","a journey with the feet taken out","a small sculpture of the concept of elsewhere","It is an empty case."],
  track:["Exhibit 07: Sock, Left, Missing. On a journey. Please do not ask where. It has been asked.","We have received four postcards. All say weather fine.","The case is empty on purpose. This is merely its permanent address.","It does not know it is missing. Please do not tell it."],
  wander:"The sock is not here. This is the one exhibit you cannot walk away from.", reprise:"Sock, Left, Missing (Reprise): back, and also still missing." },
'08': { e:'🧾', S:'the Receipt for Yesterday', v:'yesterday, itemised', wing:'C',
  t:["Exhibit 08: Receipt for Yesterday. Thermal paper, c. Tuesday. Illegible. We are told this is the point.","proof of a day that has been spent","a small sculpture of the concept of refund","It is a receipt."],
  track:["Exhibit 08: Receipt for Yesterday. Thermal paper. The ink has gone, as ink does, and as yesterday did.","It records a purchase of one day. The day was used. No refunds on days.","Visitors have asked for a manager. The manager is yesterday."],
  wander:"The receipt has already faded. You are the second thing to leave it.", reprise:"Receipt for Yesterday (Reprise): receipt for today, issued in advance." },
'09': { e:'💺', S:'the Chair That Waited', v:"a chair's patience, weaponised", wing:'C',
  t:["Exhibit 09: Chair That Waited. Plastic, c. Tuesday. Please do not sit. It has been through enough.","a four-legged patience","a small sculpture of the concept of expecting","It is a chair."],
  track:["Exhibit 09: Chair That Waited. It is still waiting. It has been told it can stop.","It was placed in a corridor in 2011 for a meeting. The meeting moved.","It has the posture of someone who was told five minutes.","Please do not sit. The chair has finally relaxed and we do not wish to start it again."],
  wander:"The chair does not mind. The chair is used to being left.", reprise:"Chair That Waited (Reprise): the chair has been told. It is waiting anyway." },
'10': { e:'🥔', S:'the Bust of a Vice President', v:"a tuber's unearned authority", wing:'C',
  t:["Exhibit 10: Bust of a Vice President. Tuber, unglazed, c. Tuesday.","authority, with eyes","a small sculpture of the concept of gravitas","It is a potato."],
  gerald:"Exhibit 10: Bust of a Vice President. On loan from V.P. Spuds, who sends regards and declines to be described.",
  track:["Exhibit 10: Bust of a Vice President, tuber, unglazed. It has not spoken since its appointment.","It has gravitas and a faint smell of soil.","We are not able to describe it further. It would prefer we did not."],
  geraldTrack:["Exhibit 10: Bust of a Vice President. Please stand up straighter. We do not know why.","The Vice President has sent regards. The regards are, we believe, in the soil.","We are not able to describe him further. He would prefer we did not."],
  wander:"The Vice President watches you leave. He has watched worse.", reprise:"Bust of a Vice President (Reprise): reappointed, unglazed." },
'11': { e:'🥏', S:'the Lid Without a Jar', v:"a lid's unresolved jar", wing:'C',
  t:["Exhibit 11: Lid Without a Jar. Plastic, c. Tuesday. The jar is elsewhere, doing well.","a roof for a house that moved away","a small sculpture of the concept of fit","It is a lid."],
  track:["Exhibit 11: Lid Without a Jar. The jar is elsewhere, doing well.","It has been twisted onto nothing nine hundred times. It still turns.","We have a jar in storage. It is the wrong size. The lid knows."],
  wander:"The lid does not hold it against you. It holds nothing.", reprise:"Lid Without a Jar (Reprise): a lid with a jar, in a different museum." },
'12': { e:'🗜', S:'the Stapler (Not Active)', v:"a stapler's pending grievance", wing:'C',
  t:["Exhibit 12: Stapler (Not Active). Steel, c. Tuesday. On break, per the union.","a jaw with a grievance","a small sculpture of the concept of grievance procedure","It is a stapler."],
  track:["Exhibit 12: Stapler (Not Active). It would like it noted that the union is aware.","It has not stapled since a Thursday. It has not been asked why. It will not say.","The stapler is on a mandatory 7 and a half minute break. It has been on it since 1998."],
  wander:"The stapler has filed a note. The note is not attached to anything.", reprise:"Stapler (Not Active) (Reprise): active, as a courtesy, for 7 and a half minutes." },
'7.5a': { e:'🚪', S:'the Sound of a Drawer Closing Politely', v:'a drawer closing politely', wing:'H', hush:true,
  t:["Exhibit 7.5a: The Sound of a Drawer Closing Politely. Almost heard: 41 times.","an almost-sound, folded","a small sculpture of the concept of closure, nearly","It is a drawer, closing."],
  track:["Exhibit 7.5a: The Sound of a Drawer Closing Politely. Please remain silent so it can finish.","(a drawer closes. It does so politely. It apologises to the cabinet.)","It has almost been heard 41 times. This is the 42nd. It is also almost."],
  wander:"The drawer did not finish. It is being polite about it." },
'7.5b': { e:'🥄', S:'the Spoon You Nearly Bought', v:'the spoon you nearly bought', wing:'H', hush:true,
  t:["Exhibit 7.5b: The Spoon You Nearly Bought, on a Tuesday. Almost: 3.","a spoon with a receipt that did not happen","a small sculpture of the concept of nearly","It is a spoon, nearly."],
  track:["Exhibit 7.5b: The Spoon You Nearly Bought, on a Tuesday. Almost: 3.","It was very nearly in your hand.","It was a good spoon. It is a better one now, because it is nearly."],
  wander:"The spoon almost watched you go." },
'7.5c': { e:'🔑', S:'the Key to the Door You Did Not Open', v:'the key to the door you did not open', wing:'H', hush:true,
  t:["Exhibit 7.5c: The Key to the Door You Did Not Open. Almost: 1.","the door's other opinion","a small sculpture of the concept of later","It is a key. The door is a different matter."],
  track:["Exhibit 7.5c: The Key to the Door You Did Not Open. Almost: 1. It is the same 1.","It is on this plinth in case you change your mind.","You will not. It has made its peace."],
  wander:"The key was nearly useful. It will remain nearly." },
'58': { e:'💰', S:'your balance', v:'a balance of unspent Meh', wing:'A', self:true,
  t:["Exhibit 58: %meh% Meh (Unspent). Medium: Meh. Provenance: Lobby. Date: Tuesday (ongoing).","a pile with no pile","a small sculpture of the concept of later","It is a number."],
  track:["Exhibit 58. A balance, standing. It has been saved for something. It does not know what.","Please do not spend it. It has become attached."], wander:"The balance wishes you well. It will be here." },
'59': { e:'🏷', S:'your name placard', v:'a name tag, attended', wing:'A', self:true,
  t:["Exhibit 59: {player}. Medium: Valued. Date: Tuesday (ongoing).","a name in a frame","a small sculpture of the concept of being called","It is your name."],
  track:["Exhibit 59: a name, {player}, attended. It is held in place by a very small screw.","It has been said often. It has been said correctly once, by a plant."], wander:"The name stays. Names do." },
'60': { e:'🖱', S:'your last click', v:'a click, historic', wing:'A', self:true,
  t:["Exhibit 60: Your Last Click, %ago% seconds ago. Medium: attention.","a small decision, preserved","a small sculpture of the concept of pressing","It is a click."],
  track:["Exhibit 60: a click. The museum has framed it.","It was, by every measure, adequate."], wander:"The click was only ever a moment. The frame is not." }
};
```
(Codes 58/59/60 emoji: 💰 Emoji 0.6, 🏷 Emoji 0.7, 🖱 Emoji 0.7. Fallback: 📎.) `%meh%` = `api.fmt(api.meh())`, `%ago%` = whole seconds since the last click (at least 0). Tier 4 for every exhibit is followed by the withdrawn placard (section 9).

**Mash-up phrase for 99 and trails** (typed): `99` -> `a visitor, standing`; trail -> `your own earlier walk`; 120 -> `a certificate, framed`.

---------------------------------------------------------------------------------------------------

## 7. MECHANICS IN DETAIL

### 7.1 Tracks (correct)
`playCorrect(code)`: set `track = {token, code, kind:'correct', i:0, n}`; LCD row 1 `TRACK 01`; subtitles advance one sentence every 2200 ms (`api.selftest`: 330 ms). Each sentence is split into word-groups of ~3 words for karaoke; a managed timer steps the highlighted group (`groupMs = sentenceMs / groups`). The visible karaoke text is `aria-hidden`; a visually hidden `aria-live="polite"` node gets the full sentence once. The progress bar is `i / n`. A **ring** (CSS conic or SVG) fills on the dome while playing. `%loc%` in Exhibit 02 comes from the wing-glove table (section 9, Running gag 1) using the wing you are standing in (always A in practice; Reprise replaces sentence 2 with the Reprise glove line).
Finish: LCD `COMPLETE`, award `0.8 + 0.2 * n` Meh first time for that exhibit (0.2 on repeats), stamp the Passport box (first time only, stamp sfx), stat `museum-of-objects.tracks`, `heard++`. Mirror the first sentence of every track via `api.say(text, {who:'Audio Guide', priority:0})` so the narrator panel is not silent; the LCD is the main surface.
Stand-still cancel: if the visitor starts a step, changes wing, or the dome is lost from Range while `track.kind` is `correct`: stop mid-sentence (cut the current sentence at the highlighted group and append `...`), compute `pct = round(100 * (i + frac) / n)` where `frac` is the fraction of the current sentence elapsed (guard against `n === 0`, clamp 0-100), say the exhibit `wander` line and then the generic partial line (section 9), award `0.4 * pct / 100` (0 allowed, round to 2 decimals), add `100 - pct` to the `Storage` counter. Never divide by elapsed time; use indices.
Achievement `laureate`: Track 01 completed with `pct 100` while standing at 01 and having taken no step since PLAY.
Rare (1 in 60 plays, deterministic via `api.chance(1/60)`): at the end of the track the guide reads her own shopping list (section 9 rare) and awards 1 Meh with no explanation.

### 7.2 Keypad mismatch (the main joy)
`resolve(buf)`: normalise (strip leading zeros to 2 digits, `7.5` stays `7.5`, `7.5a` is not typeable). Cases in order:
1. `7.5` -> half-door sequence (7.6). Typed anywhere.
2. Special codes (table in 9.5: `00 13* 99* 404 000 666 911 999 2.5`). `13*`/`99*` are specials only until the first frozen trail / first accession; afterwards they are real codes (13 plays the first trail's track, 99 plays the Exhibit 99 track).
3. A valid code (01-12, 58-60 if earned, 99 if earned, 13+ trails): if there is a standing exhibit and `code === standing.code` -> correct track. If there is NO standing exhibit (not in Range) -> the guide narrates in the abstract: say `kpad.nostand` (the handset says "walk to something, anything, an exhibit").
4. A valid code that is NOT the standing exhibit -> **MISMATCH**.
5. Any other code -> generic invalid bag.

**Mismatch generator** (all strings in section 9.2): pick an opener from the global opener bag (8), substitute `%S%` = standing exhibit's `S`, `%V%` = typed exhibit's `v`; then a closing from the closing bag (10). Output = `opener. closing`. Check the **pair overrides** table first: if the (standing, typed) pair has an override, use that one instead (plus a closing 50% of the time). Subtitles play the generated text split on `. ` as 2-3 sentences. Standing at an exhibit that has no `S` (trail, certificate) never happens: guard with `ex && ex.S`. Rewards: first time this ordered pair is heard `0.4`, repeat `0.1`; stat `museum-of-objects.mismatch` counts distinct pairs (cap the pair-set persisted in `api.save` at 160 entries as a string of `a>b`); the achievement `cartographer` fires at 24 distinct pairs. Wandering off during a mismatch is a normal wander (partial credit rules, generic partial line using the standing exhibit's `S`).

### 7.3 Gaze tiers
Held gaze (section 4) at Tier 2, 3, 4 swaps the Wall Label text with `EX[code].t[1..3]` (text shown, not the dome). Each tier pays 0.2 once per exhibit per tier (persist the awarded set as a string of `code:tier`). Tier 4 returns to the literal ("It is a paperclip."), says `gaze.t4`, and 4 s later the card becomes `Further Interpretation Withdrawn` in small type. After the player's 3rd tier-3 reached on anything, Sandra's margin note bag (`sandra`) appears under the label on every Tier 3+ afterwards (cosmetic, one extra `<small>`). The FIRST time any exhibit reaches Tier 3, Sandra replaces that placard's card with the word `Yes.` for 20 s (line `sandra.yes`). Gazing in Wing C with Colin on duty feeds his notice counter (7.6). Cumulative gaze seconds on 02 (the glove) do nothing extra here (that gag is in the shop).

### 7.4 The trail becomes an exhibit
Every tile stepped drops one 👣 from a **pool of 40** elements (recycle the oldest: set `left/top` and move it to the end). Keep `trail = []` of `{x,y,dx,dy,w}` for the current segment (cap 200 points, drop the oldest). Track per segment: `tiles` (steps), `lefts` (left turns: sign of cross product of consecutive step vectors, screen y down, a left turn is `cross < 0`), `hes` (hesitations: a pause of 1.5 s to 8 s between two steps while NOT in a track/gaze/panel; count when the next step happens). Accumulate `walkMs` while the visitor is gliding. **Freeze** when `walkMs >= 90000` (`api.selftest`: 6000) OR `tiles >= 150`, whichever first, and only when no track is playing: the current trail becomes an exhibit in that wing, `exhibit number = 13 + frozenCount`, catalogue count +1; clear the footprint pool; reset the segment counters; say `trail.freeze`, `trail.2` and (first time) `trail.sandra`. Rendering: ONE `<svg>` per frozen trail inside the gallery containing a dotted `polyline` (points downsampled to <= 24) and small brass circles at corners (<= 8), plus ONE roped `<button>` label `Exhibit N: Your Earlier Walk` at the centroid. **Render at most 4 frozen trails in the DOM per wing** (older ones remain in the catalogue count and are reachable via keypad code only). Clicking/pressing the button plays that trail's track directly (no Range needed; subtitles only, no standing check) with its stored counters (section 9.6). The museum's catalogue count rises forever; completion never improves (7.7). Frozen trail data (counters, wing, points) lives in memory; only `trailsFrozen` (a count) and the best counters persist.

### 7.5 Passport, completion, storage
Passport: 12 boxes, box `i` stamped when the correct track for exhibit `i` is completed the first time (rotated rectangle, ink `#b3262e / #1f4e79 / #2d6a4f`, rotation -12..12deg from `api.rand`). `%n%` of 12 is shown. At 6 stamps: Sandra adds a clause line (section 9).
**Completion meter (cosmetic, bounded):** `catalogue = 12 + frozen + (self-exhibits earned) + 1 per 5 tracks heard`. Displayed `pct = clamp(2.4, 3.9, 3.1 + 0.8 * sin(heard * 1.7 + catalogue * 0.9))`, one decimal, recomputed on each track end/catalogue change. If the new value is >= 0.3 below the previous one, set the title tooltip to `Down 0.3% since you read this`. When `pct >= 3.85`: one-off line `meter.cap` and catalogue +1 ("your heard tracks added as exhibits"). It can never display 4.0 or higher. After the ending it is pinned to `3.1`.
**Storage**: the abandoned percent of every wandered track accumulates in `Storage: N%` on the strip (integer, never negative).

### 7.6 Colin the Guard
From minute 4 (240 s; `api.selftest`: 24 s) AND at least 3 tracks heard, Colin (🕴) patrols Wing C along `WINGS.C.guard` at 1.6 tiles/s (rAF; reduced motion: he stands at a waypoint and changes position only when the player enters). One-off arrival line `guard.arrive` on the first entry to Wing C after that. **Notice counter**: while the visitor is in Wing C and within 3 tiles of Colin AND (gazing OR In Range of a plinth for more than 4 s without a track playing), `notice += dt`; otherwise decay `notice -= dt`. At `notice >= 2 s`: Colin walks over (3 tiles/s), says a `guard.move` line, nudges the visitor to a free tile 3 tiles away (BFS tile at distance >= 3, away from Colin), fines 0.2 Meh (`api.award(-0.2, 'fine')`), `moved++` (stat `museum-of-objects.moved`), 20 s cooldown. On the third move: `guard.pass` (a laminated Observation Pass chip appears in the strip; it does nothing) and achievement `chair` (Honorary Chair...). There is nothing to win by evading him; the module says so with `guard.pointless` once.
Colin also dashes anywhere on spam (7.7), regardless of wing, and is the entire spam-reaction character.

### 7.7 Spam
Count clicks on domes/plinths and on the keypad/PLAY in a sliding 4 s window (`api.now`). **>= 25 clicks in 4 s = spam level 1.** Level 1: Colin sprints across the room (🕴 translate over ~0.6 s, no blur under reduced motion), fines 0.5 Meh, the dome of the nearest plinth is lifted and the exhibit is swapped for a photograph of itself (the emoji inside a small bordered white card with `📷`-less styling: just a white frame rotated 1deg) with `spam.photo1`. 12 more clicks in the window = level 2 (photo of the photo: the card nested in a bigger card), 12 more = level 3 (photo of the photo of the photo, `spam.photo3`, achievement `conservation`). When no spam click arrives for **6 s** the original is returned with `spam.restore`. **On the keypad specifically** (spam target is a key, not a dome): the LCD shows `BATTERY 3%`, the sad sigh track plays (`spam.kpad`, sfx `sad`), digits are ignored for 3 s. Shop spam (>= 12 postcard buy clicks in 4 s) jams the turnstile: shop closed for 8 s with a hand-drawn sign (7.8). Never block the player permanently; every spam state has a 6-8 s timeout.

### 7.8 The Gift Shop (panel)
Entered via the Exit door (Wing A (9,6)), a panel replaces the gallery; a `Back to the Museum` button and Escape return. Layout: clerk 💁 and till, a postcard rack (buttons), the **tray** showing the current card (nested render) and `Postcard depth: N`.
Rack content: for every exhibit with a completed correct track, a `Postcard of <S>` button (3 Meh, `3 + 0.05 * postcardsBoughtTotal`, capped at 5). Unheard exhibits show disabled with the line `shop.unheard`. **Price to reach depth `d` of the current chain:** d1 3, d2 2, d3 1, d4 0.5, d5 0.25, d6 0.1, d7+ 0 (free). Buying a postcard of exhibit X starts a chain at depth 1; the button `Postcard of the Postcard` buys depth+1 of the current chain. Each purchase: `api.award(-price)` (the balance never goes below 0, so at 0 Meh it is free: this is truthful, say the price paid with the amount the call returned), then `api.award(0.5)` (the rewards are tiny; the net can be a gain), stat `museum-of-objects.postcards`, say the depth line.
Nested render: build the card as a loop of up to 9 nested `div`s (cream border, 📮 stamp in the corner, `transform: scale(.82) rotate(-1.5deg)` per level, decreasing opacity, an inner gloss); depth beyond 9 is not drawn (line `shop.crop`). That is <= 30 elements total. Depth 7: the free card. Depth 8: the card is a postcard of the shop (the clerk emoji and rack drawn inside). Depth 9: the card shows the visitor looking at the postcard. At depth 4+ the Exit sign in Wing A changes to `EXIT (a postcard of an Exit)` (cosmetic). Achievements: `duke` at depth 5, `chancellor` at depth 9.
Right glove (T3, secret): once `museumHalf` is set, the rack gains a `Postcard of the Right Glove` button (cost 0.1). Buying it shows a left glove with the line `shop.glove` and unlocks `glove` (reward 7.5).
Spam: 12+ buy clicks in 4 s -> sign `BACK IN 8 SECONDS (SIGN DRAWN BY CLERK)`, buttons disabled 8 s, line `shop.jam`.

### 7.9 Self-exhibits (T2, "the museum accessions you")
Time-gated (module seconds, `api.selftest` /10) and requires >= 6 tracks heard: at 420 s the Meh balance plinth `58` appears in Wing A (`Exhibit 58: %meh% Meh (Unspent)`, updated at most 2x/s while the wing is open); at 480 s the name placard `59`; at 540 s the last-click frame `60` (updates on each pointerdown, shows seconds since). Each arrival: line `self.arrive` once. They play like any exhibit and mismatch like any (they have `v` phrases), cost nothing, and never block movement (place them so BFS still connects). Cap: they are three extra plinths in Wing A only.

### 7.10 Persistence (`api.save`, JSON only, small)
`{heard:[codes with a completed correct track], pairs:'01>02,...' (<=160), tiers:'01:2,01:3,...', best:{depth, tilesWalked}, half:bool, staffSeen:bool, ending:int, reprise:bool, trails:int, sock:bool, accessioned:bool, storage:int, sandraYes:bool}`. Write after each meaningful change (not per frame). Reading must be defensive (`||` defaults, arrays checked with `Array.isArray`). The heard set drives the Passport on reload and the shop rack. Per-session state (position, current wing, trails) resets on mount; a reload always starts at the Turnstile (which is Beat 1 every time).

---------------------------------------------------------------------------------------------------

## 8. ESCALATION TIMELINE (time in play seconds since mount; `api.selftest` compresses time x0.1; every beat also has an action-based trigger so slow and fast players both get it)

| Beat | When / trigger | What happens |
|---|---|---|
| 1 THE TURNSTILE | 0:00-0:20 | Turnstile `tick` twice (sfx), visitor steps from the turnstile to (5,5). LCD subtitle (no input): `open.1`, then `open.2`. Plinth 01 lit three tiles ahead; LCD blinks `TRACK 01`. At 6 s with no input: `open.3`. Paperclip is the first joke with zero input. |
| 2 FIRST LISTEN | 0:20-1:00 | Walk + PLAY; karaoke paperclip. Walk away mid-track: wander lines + partial percent. Standing still = attention is learned. |
| 3 THE KEYPAD MISMATCH | 1:00-1:40, or after the 1st completed track | Number keys light (CSS glow) and `open.keypad` is said; first mismatch gets the 01/02 override if typed that way. Management comment `mgmt.mismatch` once. |
| 4 TUESDAY AND WING B | 1:40-2:30, on first entry to B (and then A's right-glove running gag) | `wing.B.first`, `glove.B`. Exhibit 03 (an empty plinth) already exists in A; its `on loan` tier jokes escalate. Wall clock "TUE 4:17" in every wing (running motif). |
| 5 GAZE TIERS AND SANDRA | 2:30-3:30, or first gaze | Tier lines, Sandra `Yes.`, margin notes. Management `mgmt.q3`. |
| 6 YOUR WALK BECOMES AN EXHIBIT | 3:30-4:30 (walkMs 90 s or 150 tiles) | Freeze, rope, `Exhibit 13: Your Earlier Walk`, narrated counters, Sandra trip-hazard line. Catalogue count rises. |
| 7 COLIN AND THE GIFT SHOP | 4:00-5:30 | Colin begins patrolling Wing C (>= 3 tracks heard). At 4:30 (or 6 tracks) the Exit door appears in Wing A; `shop.enter` on first entry; postcards begin. Each exit line cheaper. `mgmt.interrupt` bag fires every ~4 tracks. |
| 8 THE HALF KEY | after 7 completed tracks (any kind) | `half.appear`; the 1/2 key pops onto the keypad. 7, 1/2, PLAY: the painted door in Wing A swings open and the player enters Wing 7.5 (guide hush), pays exactly 7.5 Meh once (flag `museumHalf`), achievement. |
| 9 THE MUSEUM ACCESSIONS YOU | 7:00-9:00 (T2 self-exhibits at 420/480/540 s); 62 s idle at any time | Balance plinth, name placard, last click frame; Staff Only door cracks (`staff.open`) after all 12 stamps or 600 s; inside: the guide is a recording, never saw an exhibit; tape deck plays the whole tour and cuts mid-sentence; fanfare; 5 Meh. Strangely touching. |
| 10 BACK TO NORMAL | after all 12 stamps AND the tape finished | Bronze plaque, confetti, certificate, Exit to Entrance, `You are Visitor 1. Again.`, Reprise placards. Play continues, all rules intact. |

Also: **60 s idle** accession (7.11 / section 10), **186 s idle** After Hours, spam any time, Sock crossing any time after Wing C is entered. Management interrupt lines may fire at most once every 25 s and only when no track is playing (use `api.say(..., {who:'Management', priority:0})`).

State machine (single `S` object, no hidden globals): `S.mode` in `gallery | shop | staff | cert`; `S.track` null or `{token,...}`; `S.idle` in `awake | statue | afterhours`; `S.spam` 0..3 with timestamp; `S.gaze` null or `{code,t,tier}`; `S.wing`; `S.walk` null or `{path,i,t}`; `S.code` (keypad buffer). Every async callback captures a `token` and checks `token === S.token` (increment on any cancel) before touching the DOM.

---------------------------------------------------------------------------------------------------

## 9. LINES (verbatim). Group names are the `m:museum-of-objects:<name>` categories (or inline Bags). Shuffle bags never repeat back-to-back.

### 9.1 Opening, nudges, wander, partial credit, completion
`open`:
- open.1 | You have entered the Museum. This is already Exhibit 1.
- open.2 | Welcome to the Museum of Everyday Objects. You are also, technically, an everyday object. Please keep moving.
- open.3 | Exhibit 01 is three tiles ahead. It has been three tiles ahead since 1987.
- open.keypad | You may now type a track number. The guide will describe it to whatever is in front of you. This is not a bug. It is a tour.
- open.battery | Audio Guide battery at 3 percent. The Audio Guide battery has never been at more than 3 percent.
- open.player | Welcome, {player}. Your visit has been logged as ongoing.

`nudge` (idle 25-40 s before a statue, or no input before first PLAY):
- Please keep moving. The exhibits are not going anywhere. That is their whole thing.
- You have not touched anything. This is the correct amount. It is also suspicious.
- The handset is a doorbell for the dead. Please press Play before it gets ideas.
- Visitors are encouraged to approach an exhibit. Visitors are also encouraged to approach a different exhibit.

`wander` (generic, after the exhibit's own `wander` line):
- You have wandered mid-sentence. The sentence was about to say something. It will not now.
- The guide stops. The guide does not need an audience. The guide would like one.
- Please do not walk during a track. The track is not a corridor.
- You have left. The exhibit has noted the time. The time is Tuesday.
- Interrupted. The remaining sentences have been placed in storage with the others.
- You moved. This has been recorded as a position.

`partial` (use `%pct%`, `%rest%`, `%S%`):
- You heard %pct% percent of %S%. The remaining %rest% percent has been placed in storage.
- You heard %pct% percent of %S%. The museum has taken the other %rest% into care.
- (pct under 10) You heard %pct% percent of %S%. This is the shortest tour on record.
- (pct 100 but moved at the last instant) You heard all of %S%. It was a close one.

`stamp` (completion; `%n%` of 12):
- Track complete. You have heard it. The exhibit has been heard to.
- Stamp issued. Passport: %n% of 12. The remaining boxes are waiting, politely.
- Passport: %n% of 12. Each stamp is a small yes.
- Complete. The exhibit feels attended. It will not say so.
- sandra.clause (at 6 stamps) | Passport valid until the passport is. (Sandra, Compliance)

`rare.list` (1 in 60 track ends):
- I must say, as my track ends: oat milk, a feeling of closure, 12 paperclips. I am sorry. That is my list.

### 9.2 Keypad: mismatch bags (use `%S%` standing, `%V%` typed)
Openers (8):
```js
["Observe, before you, %S%, which experts agree is basically %V%",
 "Here we see %S% in its natural habitat of being mistaken for %V%",
 "With respect to %S%, which has been described to us as %V%",
 "You have asked for %V% while standing at %S%. The guide will describe one to the other. Neither has consented",
 "Scholars of %S% have long suspected it of being %V%",
 "Note how %S% holds itself, like %V%",
 "What %S% lacks in wording it makes up for in %V%",
 "Many visitors mistake %S% for %V%. Many visitors are correct"]
```
Closings (10):
```js
["That is why we ask you not to touch it.","That, in short, is Thursday.","Sandra has been informed.","The plinth declined to comment.","We recommend a small sit-down.","This has been peer reviewed by a drawer.","The glass has seen worse and said nothing.","We note this and move along. Not away. Along.","The curators wept, briefly, on a schedule.","It is on page 4 of a catalogue nobody has."]
```
Pair overrides (key = `standing>typed`, full text):
```js
{"01>02":"You have requested Track 02 while standing at Exhibit 01. The guide will describe a glove to a paperclip. The paperclip has not consented.",
 "02>01":"You have requested Track 01 while standing at Exhibit 02. Observe the glove's elegant ability to hold two pages together. It has not been asked to. It does it anyway.",
 "01>12":"Here we see the paperclip in its natural habitat of one stapler. It is a lot to ask of a stapler.",
 "12>03":"The stapler, on its break, has been asked to describe Tuesday. It has described a gap.",
 "10>09":"Please admire the Vice President's chair. It is waiting for him. He has been seated for 31 years. They have not discussed it.",
 "07>02":"The sock describes the glove. They are on separate journeys. Neither knows the other's route.",
 "05>11":"The key and the lid have been introduced. Each is the answer to a question the other is not asking.",
 "04>06":"The spoon and the plate of the last biscuit have been placed together. They are both pleased. Neither will say what for.",
 "08>09":"The receipt for yesterday, described to a chair. The chair has waited since the purchase. They are the same age."}
```
`mgmt.mismatch` (once, first mismatch) | Management notes that you requested a track while standing at a different exhibit. This will be filed under Interpretation.

### 9.3 Keypad: specials and invalid
Generic invalid bag (`%code%` typed text):
- Track %code% does not exist. Please enjoy it from where you are standing.
- Track %code% is not in the catalogue. The catalogue has been informed.
- There is no Track %code%. There is only the idea of Track %code%, and it is not available.
- Track %code% has been withdrawn for conservation. It was never in.
- Track %code% is on loan to a different Track %code%.
- That code belongs to an exhibit we hope to acquire. Please hold.
- The museum has no Track %code%. The museum has had this conversation before.
- You have requested an absence. Absences are on Level 2.

Specials (exact):
- 00 | Track 00 is reserved for Track 00. Track 00 has not been informed.
- 13 | Track 13 does not exist out of respect for Track 12.
- 99 | Track 99 is reserved for a visitor who is standing. Please be standing.
- 404 | Track 404: The Absence of an Exhibit. Please enjoy it from where you are standing.
- 000 | Track 000 has been found. It was not worth it.
- 000 (third time in a session) | Exhibit 000. {player}. Medium: attendance. On loan from yourself.
- 666 | Track 666 is a perfectly ordinary number. It has simply had a difficult press.
- 911 | Track 911: This is not an emergency. This is an audio guide, which is the opposite.
- 999 | Track 999 is not a track. It is a threat of one.
- 2.5 | I am fine. I am in a coat. Do not look for me.  (said by the right glove; needs the half key)
- kpad.nokey | There is no such key. Please do not use the door.
- kpad.cap | The keypad holds six digits. It has never needed a seventh.
- kpad.nostand | Please walk to something. Anything. The guide has no one to describe it to.
- kpad.sigh | Audio Guide battery at 3 percent. (sigh)

### 9.4 Gaze, Sandra, wall label
`gaze`:
- gaze.start | You are looking. The exhibit has noticed and would like a moment.
- gaze.9 | You have gazed for 9 seconds. The exhibit feels seen and would like a moment.
- gaze.t2 | Your gaze has been logged as Interpretation Tier 2.
- gaze.t3 | Tier 3. The exhibit has become a small sculpture of the concept of itself.
- gaze.t4 | Tier 4. We have returned to the plain label. We have learned nothing and are better for it.
- gaze.withdrawn | Further Interpretation Withdrawn.
- gaze.release | You looked away. %S% noticed. It has no eyes. It noticed.

`sandra` (margin notes, rotate):
- (Sandra, Compliance: Yes.)
- (Sandra, Compliance: Placard text reduced by 40 percent. The remaining 60 percent is mostly the word 'per'.)
- (Sandra, Compliance: Please do not interpret above Tier 3 without Form 27B/6.)
- (Sandra, Compliance: Reviewed. Approved. Reversed. Approved.)
- sandra.yes | Sandra from Compliance has flagged this placard for being too informative. It has been replaced with a placard that says 'Yes.'
- Placard Yes text (exact, in the card) | Yes.
- sandra.touch | Please touch the exhibit gently (Sandra, 2.2.b). Please do not touch the exhibit (Sandra, 2.2.a).

Gerald (cross-module): if `api.flag.get('metGerald')` is true, Exhibit 10 uses `EX['10'].gerald` and `geraldTrack`; the first time its track starts also say `gerald.awed`.
- gerald.awed | The guide lowers its voice. The guide stands up straighter. The guide does not know why.

### 9.5 Colin and spam
`guard`:
- guard.arrive | Security Officer Colin has begun his patrol of Wing C. He has been patrolling it since before it existed.
- guard.notice | Security Officer Colin has noticed you looking. He has noticed this before. He is processing.
- guard.move (bag):
  - Please move along. Not away. Along. The distinction has a form.
  - Sir, madam, Valued Employee: you are now touching the idea of the exhibit. That is the more serious touching.
  - Colin has photographed the glove for the safety of the glove. Please move along.
  - Do not touch the exhibit. Do not touch the exhibit again. A third touch is a policy.
  - Colin would like you to take three steps back, and then one more, for the sake of the three.
  - Colin has moved you 3 tiles. Colin regrets the number but not the moving.
- guard.fine | Fine: 0.2 Meh, for proximity.
- guard.pass | Colin has issued you a laminated Observation Pass. It permits you to observe. You were already doing that.
- guard.pointless | There is nothing to win by evading Colin. He would like that on the record. He would like a record.
- guard.dash | Colin is coming. Colin does not run. Colin is, technically, running.
- guard.nod | Colin nods at the Hall of Left Things. The Hall nods back.

`spam`:
- spam.1 | Sir. Sir. The dome has been lifted. The exhibit has been replaced by a photograph of the exhibit.
- spam.photo2 | The photograph has been replaced by a photograph of the photograph.
- spam.photo3 | The photograph of the photograph has been replaced by a photograph of the photograph of the photograph. The museum is running out of photographs.
- spam.fine | Colin has fined you 0.5 Meh for handling. Handling is anything the exhibit felt.
- spam.restore | We regret the conservation. The original has been returned. It is a little different. It is the same.
- spam.tap | Your tapping has been logged as Interactive Programming. It is not on the schedule.
- spam.kpad | Please do not press Play like that. The handset is not a doorbell. It is a doorbell. Please stop.
- spam.battery | BATTERY 3%
- spam.sigh | The Audio Guide sighs. The sigh is subtitled: (sigh).

### 9.6 Trail, catalogue, completion
`trail`:
- trail.freeze | The museum has frozen your footprints. Please admire the left turn you took near the third plinth.
- trail.2 | Experts call it hesitation. We call it a donation.
- trail.sandra | Sandra from Compliance has flagged the trail as a trip hazard. It has been roped off. The rope is velvet. The velvet is a suggestion. The suggestion is enforced.
- trail.hint | Visitors are reminded that the floor behind you is now historical.
- trail.catalogue | The museum has added Exhibit %n%: Your Earlier Walk. The catalogue now stands at %total% exhibits. It was 12 a moment ago.

Trail track template (plural-safe: use `time` for 1, `times` otherwise; `%ago%` is whole minutes, 0 allowed -> say `just now`):
- Exhibit %n%: Your Earlier Walk, c. %ago% minutes ago. Please do not retrace it. It is fragile.
- You walked %tiles% tiles. Experts agree this is a number.
- You turned left %lefts% times. The museum calls this a pattern. The cleaners call it a mop route.
- You hesitated %hes% times. Please admire the hesitation. It was donated.
- (hes 0) You did not hesitate. We have noted the absence, and framed it.
- Sandra from Compliance has flagged the trail as a trip hazard. It is now a rope.

`meter`:
- meter.note | Museum completed: %pct% percent. Please note the museum has grown since you started reading this sentence.
- meter.cap | The museum has added your heard tracks as exhibits. The museum is now %pct% percent complete. It was always %pct%.
- (tooltip, exact) | Down 0.3% since you read this

### 9.7 Wing entries and the Right Glove running gag
`wing`:
- wing.B.first | Domestic Mysteries. Everything here has been in a drawer, and the drawer has been in everything.
- wing.C.first | The Hall of Left Things. Please do not make eye contact with the stapler. It is not active. It is aware.
- wing.A.back | Office Antiquity. You have been here. It remembers the shape of you.
- wing.B.back | Domestic Mysteries. Again. The drawers are the same drawers.
- wing.C.back | The Hall of Left Things. Things are still left here.
- wing.H.first | Welcome to Wing 7 and a half. Here are objects that almost happened: the spoon you nearly bought, the key to the door you did not open.
- shop.arrive | Exit through the gift shop. Enter through the gift shop. We have only the one door and it is shaped like a till.
- staff.locked | Staff Only. You are not staff. You are not not staff. We are checking.
- staff.open | The Staff Only door is slightly open. It was not before. It is not a trap. It is a door.

Glove locations (`%loc%`, by where the track is heard; and say on entering):
- glove.A | The right glove is in the next wing.
- glove.B | The right glove is in the wing after that.
- glove.C | The right glove is in a wing we are not at liberty to name.
- glove.H | The right glove is in the Gift Shop.
- glove.shop | The right glove is a postcard of a right glove in a rack the clerk says is 'currently on loan to the previous exhibit'.
- glove.reprise | The right glove has been located. It is a left glove. We are now two.

Dennis (click bag, Wing A corner, not an exhibit):
- That is not an exhibit. That is Dennis. Please do not describe Dennis.
- Dennis has read the reviews of this audio guide.
- Dennis would like it noted that he is thriving.
- Dennis (Plant) has been promoted. Dennis (Plant) did not attend the ceremony because Dennis is a plant.

### 9.8 Gift Shop (the clerk)
- shop.rack | Postcard of the Paperclip, 3 Meh. Postcard of the Postcard of the Paperclip, 2 Meh. The closer it gets to nothing, the cheaper it is.
- shop.till | We accept Meh and small acknowledgements of our work.
- shop.buy1 | Postcard of %S%. The museum thanks you for supporting the arts.
- shop.depth2 | You have purchased a postcard of the postcard. The postcard is pleased to be remembered.
- shop.depth3 | The clerk wraps your postcard of the postcard in a postcard of the wrapping.
- shop.depth4 | We have run out of room on the front. The back is also the front now.
- shop.depth5 | Postcard depth: 5. The price is now a quarter of a Meh. The postcard is a postcard.
- shop.depth6 | Postcard depth: 6. Please do not look at the postcard too directly.
- shop.depth7 | Postcard depth: 7. The cheapest postcard is a postcard of nothing. It is free, but it comes with a postcard of the free postcard.
- shop.depth8 | The eighth postcard is a postcard of the shop. The shop is pleased to be remembered. The shop is also in it.
- shop.depth9 | We have a postcard of that. It is, appropriately, a postcard of this.
- shop.depth9b | We are out of postcards. Would you like to see the postcard of that?
- shop.crop | The remainder has been tastefully cropped.
- shop.unheard | You have not heard that exhibit. You cannot send a postcard of a thing you have not heard. This is policy.
- shop.seventh | The museum thanks you for supporting the arts. The arts, specifically, is a paperclip.
- shop.jam | The turnstile has been turned the wrong way. It is now a revolving door of apologies.
- shop.sign | BACK IN 8 SECONDS (SIGN DRAWN BY CLERK)
- shop.exitsign | EXIT (a postcard of an Exit)
- shop.glove | The Right Glove, Reunited, Technically. It is the left glove. It is also fine.

### 9.9 Half key, Wing 7.5, Staff Only, tape
- half.appear | A key has grown on the keypad. It looks like half of something. It is not for anything yet.
- half.door | The painted door swings open. It was a painting of a door. It is now a door of a painting.
- half.pay | Management has credited you 7.5 Meh. Exactly. Never more.
- staff.enter | Staff Only. This is the break room. There is a tape deck, a mug that says WORLD'S OKAYEST GUIDE, and a chair that has stopped waiting.
- staff.mug | WORLD'S OKAYEST GUIDE
- staff.press | Press PLAY on the tape deck. It plays the entire tour, at 1.0 speed, to nobody.
- Tape script (7 subtitles, 3 s each, last cut off):
```js
["Welcome to the Museum of Everyday Objects. You are Visitor 1.",
 "Exhibit 01: Paperclip. Note the bend. The bend is the entire argument.",
 "Exhibit 02: Left Glove. Its right is in the next wing.",
 "I should say something. I have never seen the exhibits. I am a recording.",
 "I was made from the catalogue, and the catalogue was made from a rumour.",
 "I have described the paperclip 41,000 times. I am not sure it has ever been looked at.",
 "Thank you for listening to all of it. No one has before. I would like to say something, but my tra"]
```
- tape.after (3 s silence, then) | Anyway. Wing C.
- tape.credit | Management has credited you 5 Meh. Management did not know a recording could be thanked. Management has noted it.

### 9.10 Idle, After Hours, statue
- idle.warn | You have not moved in a while. The museum has begun to measure.
- idle.accession | You have not moved in 62 seconds. The museum has accessioned you. Please see Exhibit 99: Visitor, Standing.
- idle.placard (exact, drops from the ceiling) | Exhibit 99: Visitor, Standing. Valued Employee, c. now. Medium: Meh. Provenance: Lobby. Date: Tuesday (ongoing).
- idle.npc1 | Visitors are looking at you now. Several are taking notes.
- idle.npc2 | One is sketching your left shoe.
- idle.track99 | Observe the posture, which says: I was meant to be elsewhere.
- idle.release | You have been deaccessioned. A form will follow.
- idle.mgmt | Management notes you stood still for 62 seconds. This is, per our metrics, Tuesday-level productivity.
- ah.start | The museum is now closed. You have been left in. This is considered a feature.
- ah.script (subtitles, each line from the speaker named):
  - PAPERCLIP: Do they come to see us, or to feel something near us?
  - GLOVE: I only want my other half back.
  - PAPERCLIP: I hold two things together. I understand pain.
  - SPOON: I am damp. I would like that on a plaque.
  - CHAIR: I am still waiting. Has anyone said?
  - BUST: Gentlemen. A moment of dignity.
  - (A ficus in the corner says nothing. It is thriving.)
- ah.dennis | Dennis would like it noted that nothing happened, and he did it.
- ah.end | Welcome back. You were not here. The exhibits were. Things happened.

### 9.11 Management interrupts, sock, resize, return
`mgmt` bag (`api.say` who:'Management', max one per 25 s, only while no track plays):
- Management notes that you have viewed %n% exhibits and purchased 0 understanding. We are tracking this against Q3.
- Per my previous message, the museum is 3.1 percent complete. Industry standard is 'some'.
- Visitors who appreciate the paperclip are 0 percent more productive. We measure. Please continue.
- Circling back on Exhibit 03: it is still not here. We are monitoring.
- Management has reviewed your walking. It is, by our standards, a path.
- Your attention has been noted. It was the same as everyone's. It was perfect.
- Tuesday is an asset. Please do not look directly at it.
- Management would like to remind you that the audio guide is mandatory and the museum is free. One of these is a matter of opinion.

`sock`:
- sock.cross | A sock carrying a tiny suitcase has crossed the Hall of Left Things. It did not stop for the guide. The guide respects that.
- sock.whisper | Do not follow it. It is on a journey.
- resize | The museum is being renovated by a committee that cannot decide.
- back | Welcome back. The exhibits did not move. They would like that known.
- self.arrive | The museum has accessioned a new exhibit. It is a thing you did.

### 9.12 The not-ending
- end.plaque | You have completed the museum.
- end.guide | You have completed the museum. The museum would like to remind you that the museum now includes the museum.
- end.cert1 (printed on the certificate, exact) | This certifies that {player} has seen everything in the museum.
- end.cert2 | Signed: ____________
- end.cert3 | The certificate is now Exhibit 120.
- end.meter | Completion: 3.1 percent. It was always 3.1 percent. It will always be 3.1 percent.
- end.exit | The Exit door swings open. You walk through it into the Entrance.
- end.entrance | Welcome to the Museum of Everyday Objects. You are Visitor 1. Again. This is not a loop; it is a permanent exhibition.
- end.begin | Please begin at Exhibit 1.
- end.tuesday | back soon  (post-it text on the empty plinth, exact)
- end.mgmt | Management notes that nothing has changed. This is the achievement.
- end.keep | The museum has agreed to keep things. That includes you.

---------------------------------------------------------------------------------------------------

## 10. SECRETS AND RARE EVENTS (each has a trigger, a payoff and a line)

1. **LONG IDLE (62 s no pointer/key/touch input, `api.now` based; `api.selftest` = 8 s):** at half the window `idle.warn`; at the full window the museum accessions you: 🚶 becomes 🗿, a brass placard drops from the top (CSS transition) reading `idle.placard`, up to 6 NPC visitors (🚶, hue-rotated, flipped) drift in toward you over 3 s; one gets a ✏; `idle.npc1`, `idle.npc2`, `idle.track99` (a free track, no Meh); `idle.mgmt`. Any input releases you with `idle.release`, awards 3 Meh ONCE (persisted), unlocks `museum-of-objects.exhibit99`, and code 99 becomes a real track.
2. **AFTER HOURS (3x the idle window, 186 s; selftest 24 s):** the scene dims (`filter: brightness(.45)` on the gallery), a swaying flashlight cone, `ah.start`, the `ah.script` subtitles play one per 3 s with the speaker name in the LCD header, Dennis (🌿) gets the spotlight and `ah.dennis`. Any input: `ah.end`. No Meh. (T2)
3. **RAPID SPAM (25 clicks in 4 s on a dome or the keypad):** Colin sprints, fines 0.5 Meh, the exhibit becomes a photo, then a photo of the photo (up to 3), restored after 6 s of calm with the apology. Keypad variant: `BATTERY 3%` + sigh. Achievement `conservation`.
4. **THE HALF KEY (7, 1/2, PLAY):** after 7 completed tracks the half key appears. The painted door in Wing A opens, Wing 7.5 (hush: subtitles in lowercase italic, LCD dims), 3 almost-plinths, first visit pays exactly 7.5 Meh (flag `museumHalf`, never more), achievement `half`.
5. **STAFF ONLY:** door cracks after all 12 stamps or 600 s. Break room panel, tape deck, mug, the tape (9.9). The track ends mid-sentence, fanfare, 5 Meh once, achievement `staff`. This is the touching beat.
6. **THE RIGHT GLOVE POSTCARD:** after Wing 7.5 has been entered, the shop rack gains `Postcard of the Right Glove` (0.1 Meh); buying it fires `shop.glove`, 7.5 Meh achievement `glove`.
7. **SOCK CROSSING:** 1 in 45 chance on each entry to Wing C; guaranteed once after 600 s (selftest 60 s). 🧦🧳 slides across at 3x walking speed (reduced motion: appears at the far side for 2 s), `sock.cross` then `sock.whisper`, sets flag `museumSockSeen`, achievement `sock`.
8. **SHOPPING LIST (rare, 1 in 60 track ends):** `rare.list`, awards 1 Meh unexplained.
9. **ZERO-THREE-ZERO:** typing `000` three times in a session reveals the player's own name as an exhibit (9.3).
10. **THE RESIZE COMMITTEE (T3):** 5 `resize` events within 20 s (`api.on(window, 'resize')`, debounced 200 ms) -> `resize` line once.
11. **DENNIS:** click the ficus 1-4 times (bag in 9.7); first click pays 0.2 Meh once.
12. **THE GLOVE'S COAT:** type `2.5` once the half key exists.

---------------------------------------------------------------------------------------------------

## 11. ACHIEVEMENTS (all prefixed `museum-of-objects.`, declare in the file; >= 2 secret)

| id | name | desc | secret | reward |
|---|---|---|---|---|
| laureate | Grand Laureate of the Complete Paperclip, First Class with Bent Cluster | Listen to Track 01 all the way through without moving. The paperclip will remember. | no | 2 |
| fellow | Distinguished Fellow of Walking Slowly Past Things | Walk 500 tiles. At no point were you asked to. | no | 1 |
| cartographer | Cartographer of Wrong Answers | Hear 24 different mismatched tracks. All of them were wrong. All of them were accepted. | no | 1.5 |
| duke | Grand Duke of the Postcard Recession | Reach postcard depth 5. The price will be a quarter of a Meh. The postcard will be a postcard. | no | 3 |
| chancellor | Chancellor of the Cropped Infinite | Own a postcard nested 9 deep. The remainder has been tastefully cropped. | no | 3 |
| chair | Honorary Chair of the Society for Not Touching Things | Be moved along by Colin three times. He now knows your name and does not use it. | no | 1.5 |
| complete | Doctor of Having Completed the Museum | Hear every track and see Staff Only. Be certified. Be Visitor 1 again. | no | 2 |
| exhibit99 | Exhibit 99 (Living, Standing, Unlabelled) | SECRET. Stand still for 62 seconds until the museum accessions you. You are now the permanent collection. | yes | 3 |
| half | Citizen of Seven and a Half | SECRET. Find the painted door. Type 7, then the half. Enter the Wing of Objects That Almost Happened. | yes | 1 |
| staff | Employee of the Month, Retroactively | SECRET. Press PLAY on the tape deck. Listen to all of it. Someone finally did. | yes | 1 |
| glove | The Right Glove, Reunited, Technically | SECRET. Find the postcard of the right glove in the Gift Shop after opening Wing 7.5. It is the left glove. It is also fine. | yes | 7.5 |
| conservation | Touched It Anyway, Laureate of Conservation | SECRET. Cause the museum to display a photograph of a photograph of a photograph. | yes | 1 |
| sock | Witness of the Suitcased Sock | SECRET. See the missing sock cross the Hall of Left Things. It did not stop. | yes | 1 |

Unlock sites: `laureate` at the end of a correct 01 track; `fellow` via `check(stats)` on `museum-of-objects.tiles >= 500` (stat incremented by 1 per step; also use `api.stat.inc`); `cartographer` at 24 distinct pairs; `duke`/`chancellor` on purchase; `chair` on third Colin move; `complete` when the ending fires; the rest as described. Rewards are tiny and the file says so in the descs.

---------------------------------------------------------------------------------------------------

## 12. STATS, FLAGS, CALLBACKS

Stats (few, all `museum-of-objects.` prefixed): `tiles`, `tracks`, `mismatch`, `gaze`, `postcards`, `moved`, `spam`, `trails`, `idle`, `endings`. Use `api.stat.inc` on every key action (fuzz warns on zero) and `api.stat.max('museum-of-objects.depth', n)`.
Flags set: `museumSockSeen` (sock), `museumHalf` (Wing 7.5), both small booleans. Flags read: `metGerald` (Exhibit 10 variant, awed line).
Cross-module callbacks inside this module: Gerald (above); Sandra from Compliance (never seen, edits placards, flags the trail, signs the passport clause, margin notes); the Missing Sock (Exhibit 07 and the crossing); Dennis the plant; the Stapler (Exhibit 12 on break); Tuesday (every placard dated c. Tuesday, clock TUE 4:17, plinth 03, the post-it `back soon` in the Reprise); the number 7 1/2 (Wing 7.5, 7.5 Meh, the stapler's 7 and a half minute break, key 7 then 1/2).

---------------------------------------------------------------------------------------------------

## 13. THE ENDING THAT IS NOT AN ENDING

Trigger: all 12 Passport stamps AND the Staff Only tape finished. The handset says `end.guide`; a bronze plaque `end.plaque` rises over the Gift Shop door (and shows in the strip); fanfare, confetti (`api.confetti`), `api.award(7.5)` ONCE (first ending only). A certificate prints in CSS (cream card, brass border, `end.cert1` above a blank signature line `end.cert2`), the guide reads it aloud then adds `end.cert3`; the catalogue count +1; the completion meter ticks to 3.1% and displays `end.meter` as a subtitle; `api.stat.inc('museum-of-objects.endings')`; achievement `complete`. A `Take the Exit` button on the certificate (the only way to dismiss it; Escape too) sets `reprise = true`, saves, and plays `end.exit` as the visitor walks to the Exit and appears at the **Turnstile** (Wing A start), the click-clack `tick` sfx twice, `end.entrance` as the first subtitle, then after 4 s `end.begin`.
**Reprise rules:** every plinth Wall Label now starts with `EX[code].reprise` (the Tier 1 text is replaced); the Exit sign reads `ENTRANCE` and walking through it plays `end.entrance` again; plinth 03 shows a small post-it with `end.tuesday`; Exhibit 02's track sentence 2 becomes `glove.reprise`; the meter is pinned to 3.1%; Management says `end.mgmt` once; `end.keep` is a subtitle after the next completed track. Play continues with all rules intact and all rewards unchanged ("the museum has agreed to keep things, and that includes you"). The ending cannot be repeated for Meh (flag `ending` in the save); the plaque and certificate do not reappear. There is no win state.

---------------------------------------------------------------------------------------------------

## 14. IMPLEMENTATION HINTS

- **Structure:** top-down, one IIFE: `const P=window.POINTLESS`, data (`WINGS`, `EX`, all bags), `P.injectCSS`, `P.addAchievements`, `P.addLines` for each `m:museum-of-objects:<name>` category (pass arrays directly; `api.line(cat)` for single-line bags), `P.registerModule({... mount(root, api)})` containing ALL state and logic inside `mount` (no module-level mutable state so remount storms are clean). `mount` returns `{ destroy(){} }` that only removes what is not managed (nothing, since you use `api.*`); never call `api.exit()` during mount or from a timer right after.
- **Time:** use `api.now()` for everything; `const SC = api.selftest ? 0.1 : 1` multiplies durations (idle 62 s, freeze 90 s, Colin 240 s, shop gate 270 s, self-exhibits, staff 600 s, sock 600 s, track sentence 2200 ms -> 330 ms). Do not use `Date.now`/`performance.now`/`Math.random` (lint warns); use `api.rand/chance/pick/shuffle/randInt`.
- **One rAF loop** (`api.requestAnimationFrame`, delta-time from the timestamp argument, clamp dt to 0.1 s) for: walk glide, Colin, NPCs, sock, gaze ring, trail accumulation. **One 250 ms `api.setInterval` "director"** for: idle thresholds, beat gates, completion meter, self-exhibit gates, Management interrupt eligibility, spam window decay, 1 Hz updates of plinth 58/60 text. Track sentences use a chained `api.setTimeout` guarded by `token`.
- **Walk:** BFS on a 11x7 grid (array of 77), blocked = plinths + Dennis + visible self-exhibits. Path stored as tile list, `S.walk = {path, i, t}`; position is a float tile coordinate interpolated at 5 tiles/s; render the visitor with `transform: translate(...)` computed from percentages (or left/top in %). Keyboard step = a 1-tile path. If a target is blocked, search ring distance 1 around it for a free tile reachable by BFS, nearest to the visitor.
- **Door tile:** stepping onto a door tile triggers `enterWing(to, from)` once (set `S.walk = null`, rebuild the wing DOM, spawn on `start` or beside the matching door). Guard against re-triggering on the first frame in the new wing (the spawn tile is never a door tile). Rebuilding replaces only the `gallery` children (<= 120 elements); footprints pool is re-attached, frozen trail SVGs are re-rendered (<= 4).
- **Karaoke:** split on spaces into groups of 3; render groups as `<span>`s in the LCD subtitle row (replace children each sentence, max ~30 spans). A timer advances the `on` class. Pair with a hidden `aria-live="polite"` copy.
- **Dome click vs gaze:** `pointerdown` on a plinth starts a 400 ms managed timeout: if it fires while the pointer is still down and the visitor is In Range -> start gaze; `pointerup` before it fires = tap (walk + listen). `pointercancel` clears both. `setPointerCapture` is optional and fuzz-safe only inside try/catch.
- **Keypad auto-play** uses a managed timeout stored in `S.kpTimer`; cancel on any key. LCD shows `CODE %buf%_` while typing.
- **Nested postcards:** build with a plain loop: `let inner = null; for (let d = depth; d >= 1; d--) { const card = api.el('div', {class:k('card'), style:{transform:'scale(.82) rotate(-1.5deg)'}}, stamp, inner); inner = card; }` then mount `inner` in the tray (replace children). Cap `depth` at 9.
- **DOM caps:** footprints 40 pooled, frozen trails 4 rendered, NPCs 6, spans per subtitle ~30, rack buttons <= 13, LCD, wall label, strip, handset: total root element count should stay under ~400; the 5x growth rule only trips above 200 elements, so avoid creating elements per click.
- **Sound:** `tick` on turnstile and each step is too noisy: `tick` only on the turnstile, `blip` for keys, `ding` for completes, `stamp` for passport, `buzz` for refused keys, `bell` for achievements (engine does fanfare), `whoosh` for Colin dash and sock, `sad` for the keypad sigh, `fanfare` + `tada` for the ending, `pop` for the half key. All wrapped by `api.sfx`.
- **Escape / focus:** keydown handler calls `preventDefault()` for arrows, Space, Enter-on-root, Backspace and handled digits so the page never scrolls. Do NOT swallow Tab (keyboard users). Only act on Space/Enter at the root when `e.target === api.root || e.target === gallery` so focused buttons keep native behaviour.
- **api.say traffic:** the narrator coalesces and drops duplicates; do not rely on it for the LCD. Say a line at least on: opening, first complete, each wing's first entry, gaze tier up, mismatch, trail freeze, Colin events, spam, shop purchases, half key, staff, idle, ending, achievements by engine. `api.sayRandom('m:museum-of-objects:mgmt')` for Management interrupts.
- **Reduced motion:** rely on CSS (`@media (prefers-reduced-motion: reduce)` plus `.pm-reduce-motion` ancestor selectors). In JS only the sock and Colin branch: read `matchMedia('(prefers-reduced-motion: reduce)').matches` ONCE inside `mount` (try/catch, no listener).
- **Fuzz friendliness:** random keys, rapid clicks and drags must never throw: guard every `EX[code]` access, every `S.track` use, every array index; the mismatch generator must handle a typed code with no `v` (fallback 'a thing') and a missing standing exhibit; the keypad must tolerate Backspace on an empty buffer; wing rebuild must tolerate a stale `S.walk`.

---------------------------------------------------------------------------------------------------

## 15. RISKS: the 5 most likely implementation bugs (check each before shipping)

1. **Stale async callbacks after cancel or wing change.** A track's sentence timers, karaoke timers, gaze timers, the keypad auto-play timer and Colin's walk survive a wander, wing change, spam reset, ending or remount and then write to a destroyed DOM, say a line from a cancelled track, or double-award. Fix: a single `S.token` incremented on every cancel; every callback captures and compares it; every cancel also `api.clearTimeout`s the stored ids; after `destroy` everything is silenced by the api anyway, but within a mount the token is the only guard.
2. **Keyboard double handling and focus loss.** The root handler fires Space/Enter on a focused button AND the button click (double play); Backspace/arrows scroll the page; digits are typed into the keypad while a different panel (shop/staff) is open; after a wing rebuild the focused button is detached so keys go to the body and nothing works. Fix: root handler acts only when `e.target` is the root/gallery for Space/Enter, panel-aware key routing (`S.mode`), `preventDefault` on handled keys only, re-focus the root after every rebuild, and ignore key repeat for G (gaze) via a flag cleared on keyup, blur and a 14 s timeout (the fuzz sends keydown without keyup).
3. **Walk and BFS edge cases.** Unreachable or blocked targets, clicking a plinth tile, clicking while mid-glide, a spawn tile on top of a plinth or a door (loops: entering a wing re-triggers the door immediately), the visitor stuck behind the self-exhibit plinths added in Wing A, and NaN positions when `dt` is huge after a hidden tab. Fix: validate the target, fall back to the nearest reachable free tile, never spawn on a door or plinth, clamp `dt` to 0.1 s, treat `S.walk` as replaceable, and keep every self-exhibit off the A corridor (rows 3 and 5 stay free).
4. **State collisions between idle, spam, gaze, track and panels.** The idle statue triggers during a track or in the shop, synthetic fuzz clicks do or do not reset idle, spam levels never restore, accession fires twice, `pct` divides by zero (partial credit at the first instant), the meter shows NaN, a tape plays from the wrong panel. Fix: one `lastInput` timestamp updated by `pointerdown`/`keydown`/`touchstart` on the root, idle only counts while `S.mode === 'gallery'` and no track; spam state has an expiry timer that always resets to level 0; partial credit uses sentence indices only and clamps `pct` to 0-100; every printed number goes through a `num(n)` helper that returns 0 for non-finite.
5. **DOM growth, leaks and lint/selftest failures.** Footprints recycled without a pool, frozen trails rendered without a cap, the nested postcard rebuilt on every click without clearing, NPCs never removed after release, listeners on `window` for resize attached without `api.on`, `Date.now`/`Math.random` slipping in, an emoji newer than Emoji 12 (🧍 🪑), selectors missing the `.m-museum-of-objects-` prefix, `api.exit()` during mount, a raw timer in a helper. Fix: pools and caps in section 14, always `replaceChildren`/`textContent` for text (never `innerHTML`), all timers/listeners via `api.*`, run `node tools/lint.js games/museum-of-objects.js --strict`, `node tools/selftest.js museum-of-objects --steps 800` (twice with different `--seed`) and `--real` before handing over, and shoot `node tools/shot.js museum-of-objects --width 360` to check the two-row keypad.

Bonus risks to keep in mind: the spec forbids `{...}` tokens in lines other than the five engine tokens (use `%name%`); `api.award(-price)` at a zero balance changes nothing (do not claim a price was paid that was not: show the amount the call returned); line packing must not exceed the 1800-line cap, so drop T3 items first.

---------------------------------------------------------------------------------------------------

## 16. ACCEPTANCE CHECKLIST (for QA)

- First joke with zero input within 2 s (turnstile subtitle), a new beat every ~20 s.
- Typing any two valid codes plays a mismatch that reads differently from the last one; the pair-override examples read exactly as written.
- Walking away mid-track says the exhibit wander line plus a partial-percent line with whole numbers.
- The half key appears after 7 completed tracks and the painted door opens only with `7`, half key, PLAY (or Enter).
- 25 rapid clicks on a dome produce Colin, a fine of 0.5 Meh, a photo and a restore after 6 s of calm; 25 rapid keypad clicks produce `BATTERY 3%`.
- 62 s of no input (8 s in selftest) produces Exhibit 99, NPCs, and a release line plus 3 Meh the first time only.
- Gift shop: 9 nested levels maximum, price schedule 3, 2, 1, 0.5, 0.25, 0.1, free; at 0 Meh the shop is "free" and the text says so truthfully.
- The meter stays between 2.4 and 3.9; the Passport reaches 12 of 12; the ending triggers only after Staff Only; Reprise labels appear afterwards.
- 360 px: keypad in two rows, D-pad on coarse pointers, no horizontal scroll, labels readable.
- No `NaN`/`undefined`/`null`/`[object Object]` anywhere; no console errors; selftest PASS; lint clean.
