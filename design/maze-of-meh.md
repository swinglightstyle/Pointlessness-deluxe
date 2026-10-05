# DESIGN BRIEF: Maze of Meh  (id: `maze-of-meh`, category: `game`)

Builder: read SPEC.md and VOICE.md first, then build `games/maze-of-meh.js` as ONE file, <= 1800 lines (aim for 1500 so lint does not warn), vanilla JS, no assets. This brief is final. Where it is silent, decide sensibly and move on. Do not ask anyone anything. Verify only with `node tools/lint.js games/maze-of-meh.js`, `node tools/selftest.js maze-of-meh`, `node tools/shot.js maze-of-meh` (and `--width 360`), never with a browser tool.

Module registration: `id:'maze-of-meh'`, `title:'Maze of Meh'`, `tagline:'The exit leads to the same maze. The plaque says Level 7 1/2.'`, `icon:'🧭'` (Emoji 2, safe), `category:'game'`, `unlockCost:0`, `tags:['maze','arcade','walls']`. Cast of fixed text categories prefix: `m:maze-of-meh:<cat>`. CSS prefix `m-maze-of-meh-`. Stat prefix `maze-of-meh.`.

## 0. Showrunner decisions (what was cut and why)

SPINE = pitch 1 (wall label physics is the joke you can physically feel; Level 7 1/2 -> 7 3/4 -> ... -> LEVEL 8 -> 7 1/2 (rounded); chair + note from yourself with real stats; Sign with a Confidence counter; flood-fill-guarded relabeller).

STOLEN from pitch 2: persisted maze seed so the maze is identical across sessions too; plaque suffix idea reduced to the "(rounded)" post-it; Gerald in a chair; the missing Sock cameo; the "WALL (correctly labelled)" applause gag; 1-click wall tooltip; the Wall that retires and goes to Florida; overexertion report as the spam tier 2 (all walls suggestive for 8s); the "Please stop reading my handwriting" note.

STOLEN from pitch 3: wall `HURT FEELINGS` complaint with a Reference Number; the RESIZE gag (`RE-SIZED (per Facilities)`); the "Hi." note and its follow-ups ("Hi. Again."); the hand-wobbled walls; Meh batching idea.

CUT as unbuildable in one file, redundant, or weak:
- Continuous circle-vs-segment movement (pitch 2). Movement is CELL-BASED with a tween. Much safer.
- 13x9 grid growth, 1/7 scale mini-maze, Form 27B/6 exit gate, exit shying away, Fire Drill, caution tape, DECORATIVE label, "The Annex" secret room, exit "thinking it over", processing-fee negative award, "ghost Arrow at the exit", Roundabout Certificate (turn counting), Underneath plaque (click 7 times), 7-sits nameplate, dead-end count shrinking to a "plain clean maze" at beat 10 (beat 10 is calm instead), `(again)/(still)/(Deluxe)` suffixes, decimal 7.99902 fallback (the cycle resets at level 8 so it is never needed), mid-level grid resize (the grid size is fixed at mount; the canvas merely rescales).
- Union-find or A* anything: plain BFS only.

First joke inside 10 seconds with zero input: 0.5 s Management welcomes you; at 3.5 s the first wall (always "Wall 14") is stamped LOAD-BEARING in front of your eyes with a thud.

---

## 1. Concept

A tiny arrow avatar (the Arrow) walks a canvas maze to a glowing exit. The exit leads to the SAME maze, now under a brass plaque that reads "Level 7 1/2". The walls are relabelled every few seconds by Management, and the label decides what the wall physically does: LOAD-BEARING is solid, SUGGESTIVE can be walked through (slowly, saying "excuse me"), PENDING REVIEW flickers open and shut each second, A WALL IN NAME ONLY lets you through but steals your held direction for 400 ms. A very sure Sign at each junction points both ways at once with a Confidence counter that only goes up. Every dead end holds one chair and a note from the last person here, who is you. The notes are written from your own play: step counts, bump counts, your last wrong turn. By minute five they predict your next key.

Levels creep toward 8 in halves (7 1/2, 7 3/4, 7 7/8, 7 15/16, 7 31/32, 7 63/64, 7 127/128, 7 255/256) and can never reach it. At 7 255/256 the plaque rolls over to LEVEL 8 for a few seconds, Management gasps, and then it is Level 7 1/2 (rounded) and the whole thing starts again with your pocket notes still in your pocket. The game cannot be won; it can be sat in, which counts for more than you would expect.

The tone is the VOICE.md tone: total sincerity about a maze that is not hard, only administratively unfinished.

Cast used: Management (api.say), the Sign (and Sign B "Regional Sign"), the walls (Wall 14 is a recurring character), Sandra from Compliance (cited only), Gerald (potato, rare, in a chair), Dennis (Plant) beside the exit, the Missing Sock (one cameo), Kevin (the name in "a wall in name only"), Tuesday (a rare wall label), You (the author of every note).

---

## 2. World model and constants

### 2.1 Grid and maze
- Grid `W x H` in cells: **15 x 11** if `root.clientWidth >= 500` at mount, otherwise **11 x 9**. Fixed for the life of the mount (never rebuilt on resize).
- Maze seed: `seed = api.save.get('seed', 0)`; if 0, `seed = api.randInt(1, 2147483646)` and `api.save.set('seed', seed)`. Generate the maze ONCE per mount with a LOCAL PRNG (inline mulberry32 seeded with `seed ^ (W*131+H)`, 6 lines, do not use `api.rand` for the layout), so every level and every session in the same grid size is identical. Use `api.rand` for everything else (label picks, timers, notes).
- Generation: recursive backtracker (iterative stack, start at 0,0) -> BASE passages. Then "braid": pick up to 6 dead-end cells (excluding start and exit) at random from the local PRNG and open a wall to a random neighbour, but STOP braiding when the number of dead ends would fall below 6. Result must have >= 5 dead ends (excluding start and exit); if not (tiny grid), skip braiding entirely.
- Start cell = (0,0) top-left. Exit cell = (W-1,H-1) bottom-right.
- Data: cells indexed `i = y*W + x`. Edges between orthogonal neighbours stored as objects `{id, a, b, dir, base:'wall'|'gap', label:null|{type,text,born,n}}` and looked up by `edgeAt[i*4+dir]` (dir 0=N,1=E,2=S,3=W; the same edge object is stored under both cells). Outer boundary is NOT an edge: it is always solid and never labelled. Number edges `id = 1..` in creation order; `n` (the number printed in "Wall n") equals `id` EXCEPT the scripted first stamp which is always wall number **14** (display override), the recurring character.
- Dead end = a cell with exactly ONE `gap` edge in the base maze, excluding start and exit. Each dead end gets one chair (🪑) and one note slot. Keep the list `chairs[]` ordered by BFS distance from start (so "the last dead end" = farthest).
- BFS helpers (write once, reuse): `bfs(from, passableFn)` returns distance array and parent array; used for the sign's true direction, the click-to-walk path, the flood-fill check, and the idle walk.

### 2.2 Label types (the physics table)
Every label has a PHYSICS TYPE and a display TEXT chosen from the variants. The type is what the avatar feels.

| type | display texts (variants, pick one) | blocks movement? | crossing cost | extra |
|---|---|---|---|---|
| `solid` | LOAD-BEARING (70% weight), STRUCTURAL, LOAD-BEARING (SMALL LOAD) (only beat >= 6), LOAD-BEARING (BUT LIKE, EMOTIONALLY) (only beat >= 8) | yes | n/a | bump: thud line, `bloop` sfx, squash |
| `suggestive` | SUGGESTIVE, SUGGESTIVE (PER SANDRA) (only beat >= 6), PREVIOUSLY SUGGESTIVE, NOW RECONSIDERING (only after the player has crossed 10 suggestive walls in total) | no | **330 ms** (3x normal 110) | avatar bubble "excuse me"-style, +1 `maze-of-meh.suggestivePasses`, mark the edge "noted" with a tick drawn on it (until relabelled) |
| `pending` | PENDING REVIEW, UNDER REVIEW, THIS WALL HAS BEEN IN A MEETING ABOUT ITSELF (only beat >= 7) | solid on ODD whole seconds of `labelClockSeconds`, open on EVEN | 110 ms | drawn flickering at 1 Hz with a clock glyph 🕒 over it; blocked bump plays `buzz` at most once per 2 s. Only unlocked from beat 5 or after the first exit |
| `nameonly` | A WALL IN NAME ONLY, A WALL (KEVIN) | no | 110 ms | after the avatar finishes crossing, ignore all movement input for **400 ms** ("the wall takes a moment to remember it isn't one"). Only unlocked from beat 5 or after the first exit |
| `sandra` (rare, 3% of stamps, beat >= 6) | AS PER SANDRA | yes | n/a | when bumped, the wall reads a clause (list 9.7) |
| `support` (rare) | EMOTIONAL SUPPORT | yes | n/a | first bump of each such wall per level: `api.award(1)` (max 3 per level) |
| `tuesday` (rare, once per 2 minutes max, beat >= 8) | TUESDAY | yes | n/a | for 5 s every edge within 2 cells of this edge (Chebyshev distance between cell centres of the edge midpoint) is treated as `solid` regardless of its label (temporary override, grey tint). The Tuesday wall itself, if a `gap`, becomes solid |
| `wall` (rare, 1 in 40 stamps, any beat >= 3) | WALL | yes | n/a | EVENT: relabelling freezes and the ticker shows "(applause)"; see line group 9.7 |
| `waiting` (idle secret only) | WAITING | no | 110 ms | dotted, all edges; see section 6 |
| `hurt` (spam secret only) | HURT FEELINGS | yes | n/a | blue tear drawn; see section 6 |
| `retired` (spam secret only) | GONE TO FLORIDA | no (gap, permanent for this level) | 110 ms | cake emoji 🎂 drawn at the edge for the rest of the level |

An UNLABELLED edge: `base:'wall'` is solid ("plain Wall"), `base:'gap'` is open. Labels only ever sit on INTERIOR edges. A label may sit on a `gap` edge (a doorway can be relabelled and, if the label is solid, a doorway becomes a wall: "Wall 31 has been installed in the corridor. It was a doorway."). Max simultaneous labelled edges: 16 (the oldest labels expire back to their base state first when a stamp batch would exceed it).

### 2.3 Crossing function (one place, used by keyboard, mouse path, touch, idle walk)
```
canCross(edge, nowSec): returns {ok, ms, kind} or {ok:false, why}
  if tempSolid(edge, now)            -> blocked (tuesday override)
  if recessUntil > now               -> {ok:true, ms:330, kind:'suggestive'}   // spam tier 2 makes everything suggestive
  if !edge.label: base 'gap' -> {ok, ms:110} ; base 'wall' -> blocked
  switch label.type: solid|sandra|support|wall|hurt -> blocked
     suggestive -> ok 330 ; pending -> floor(labelClock) odd ? blocked : ok 110
     nameonly -> ok 110 + lock400 ; waiting|retired -> ok 110 ; tuesday -> blocked
```
Decide ONCE at the start of the move; the tween then runs to completion even if the label changes mid-tween (never trap the avatar inside an edge).

---

## 3. Controls (exact)

Root has `tabIndex=0`, `role="application"`, `aria-label="Maze of Meh. Arrow keys or WASD to walk. E to sit or ask the sign. R to read or take a note. Walls: ask them."`. The stage (canvas wrapper) is focusable, focus on mount via `api.setTimeout(()=>stage.focus(),0)`.

**Keyboard** (listen with `api.on(root,'keydown',...)` AND `api.on(document,'keydown',...)` guarded by an `if (handledEvents.has(e)) return` pattern or a `lastEvent` token so one event is handled once; ignore `e.ctrlKey/metaKey/altKey`; if `e.target` is a BUTTON/INPUT and the key is Space or Enter, return without handling (let the button click)):
- Arrow keys or WASD: move one cell per press; auto-repeat keydown (`e.repeat`) also moves, throttled to one move per **130 ms** and never while a tween is running. NO "held key" state (a synthetic keydown without keyup must never wedge). `preventDefault()` on arrows and Space so the page never scrolls.
- E or Space: SIT if standing on a chair cell; else ASK THE SIGN if within 1 cell (Manhattan) of a sign; else if sitting, re-read the note (no award). Otherwise ticker line from group 9.12 "nothing".
- R or Enter: if sitting, TAKE the note into the pocket; else if next to a sign, ask; else if on a chair, sit; else if the pocket is non-empty, show the newest pocket note in the note card for 4 s (read only). Otherwise the "nothing" ticker line.
- Escape: stand up if sitting. Otherwise ticker: "Escape has been pressed. Escape did nothing. Management notes that it did nothing." Never exits the module.
- Any movement key while sitting stands up first and consumes the press.

**Mouse** (pointer events on the canvas; use `e.pointerType`):
- Click a cell: the Arrow follows a BFS path through edges that are passable RIGHT NOW (treat `pending` as passable only if open this instant), one cell per **130 ms**, re-checked at every step with `canCross`. If a step is blocked (a wall became solid), stop and print a line from 9.4 "click". Clicking again cancels and replaces the path.
- Click the Arrow's own cell while on a chair: sit. Click a sign within 1 cell: ask it. Click the chair cell when standing on it: sit.
- Click within 7 css px of a solid or labelled edge: wall tooltip = ticker line `Wall n: <TEXT>. <flavor from its type>` (do not walk). This test wins over cell-click only when such an edge is within that distance AND the click is farther than 40% of a cell from the cell centre.
- Pointer position is ALWAYS converted using a fresh `canvas.getBoundingClientRect()` and the CSS size, never cached.

**Touch / drag steering:** `pointerdown` on the canvas (with `setPointerCapture` inside try/catch) records the origin; `pointermove` computes the cardinal direction from the origin (dead zone 14 px); while pressed and outside the dead zone, the main loop moves in that direction every 130 ms when not tweening. `pointerup`, `pointercancel`, `lostpointercapture`, `blur` and a 4-second no-move safety clear the steer. A press-and-release that moved < 14 px is a click (above). `touch-action:none` on the canvas.

**On-screen buttons** (real `<button>`s, 44px min size, ALWAYS rendered, not hidden on desktop):
- D-pad: Up, Left, Down, Right. `pointerdown` makes one step then starts an `api.setInterval` at 130 ms that steps while the button is held; `pointerup`, `pointerleave`, `pointercancel`, `blur` clear it; `click` from keyboard Enter/Space (detail 0 / no preceding pointerdown) = exactly one step. Hard cap: an interval clears itself after 5 s.
- Action button: label shows the current context: `Sit`, `Ask the sign`, `Take note` (while sitting), `Read pocket`, or `Nothing in reach` (disabled). 
- Stand button: enabled only while sitting.
- Take note button: enabled while a note card is open and not yet taken.

All narrative text goes to the aria-live ticker and the note card (`aria-live="polite"`). Management via `api.say` carries the same story at lower frequency.

---

## 4. Systems

### 4.1 The Relabeller
- Clock `relabelIn` (seconds) counts down in the rAF loop with delta time. The countdown bar (DOM) shows `1 - relabelIn/relabelTotal` and turns coral in the last second. It does NOT count down while: sitting, a modal ceremony (exit door, ending, annex-style stalls), `WALL` applause freeze, dizzy lock, or tab hidden (dt is clamped to 100 ms per frame).
- Interval `relabelTotal` = random 6..11 s in beats 1-6, 5..8 s in beats 7-9, 12..16 s in beat 10.
- A relabelling stamps 3..6 edges (3..4 in beat 10 plus 1 forced `solid`). Pick edges: 70% from `base:'wall'` interior edges, 30% from `base:'gap'` (not the edge you are mid-cross). Pick types by weight table limited by unlock level `u = max(beat, exits*2)`: `u<5`: solid 60 / suggestive 40; `u>=5`: solid 38 / suggestive 28 / pending 17 / nameonly 17; rares roll first: `wall` 1/40 per stamp from beat 3, then (beat >= 6) 3% total rare split sandra/support, `tuesday` per beat >= 8 gate. Guarantee at least ONE passable-type label (suggestive/nameonly) per batch in the first three batches.
- First scripted stamp (t=3.5 s of the arc): the base wall on the start cell's east side (or south side if that is a gap), display number 14, type `solid`, text LOAD-BEARING. Then relabelling countdown begins at t=8 s with the first batch landing at ~12 s (always includes one `suggestive` within 5 cells of the Arrow).
- **Flood-fill guard (mandatory):** after choosing a batch, tentatively apply it and BFS from the Arrow's current cell to the exit (and to the sign nearest the Arrow, optional) over edges where `permSolid(edge)` is false (permSolid = solid/sandra/support/wall/hurt label, or unlabelled `wall`; `pending`, `suggestive`, `nameonly`, `waiting` count as PASSABLE; tuesday is temporary and ignored). If the exit is unreachable, convert the solid stamps on `gap` edges to `suggestive` one at a time until reachable; if still not (should be impossible), drop the batch and retry once, then give up silently. The exit must ALWAYS be reachable in the permanent sense.
- Stamp animation: each new label drops a coral rectangle with the word (scale 1.6 -> 1 with overshoot, 220 ms), plays `stamp` (at most 2 plays per batch), and a short shadow thud. Reduced motion: appear instantly.
- Lifespan: labels persist until they are 3 relabellings old, then revert to base (silently, tag fades). Expiry of a TEMP override (tuesday 5 s, recess 8 s) ends on the clock.
- Ticker: every batch prints one line from `relabel.<type>` for the first stamp and a `batch` summary line. From beat 7 prefix with `MINUTES: ` lines from `committee` instead of the batch line. Management (`api.say`) only voices: the first two batches of each level (priority 0) and any rare label (priority 1). Never more than one `api.say` from the relabeller per 20 s.
- `api.stat.inc('maze-of-meh.relabels')` per batch.

### 4.2 The Signs
- Sign A ("the Sign") stands on the first junction (>= 3 open base sides) whose BFS distance from the start is between 4 and 12 along the solution path; if none, the first junction anywhere. Sign B ("Regional Sign", always correct) appears at beat 7 on the next junction along the path (or nearest junction to the Arrow if none).
- Visual: a post with two big arrow boards pointing OPPOSITE directions, both lettered EXIT. Board angles are springs (`ang += (target-ang)*min(1,dt*9)`, with a tiny overshoot term). When the Arrow is within 2 cells the arrows spin one full turn and settle (the settle direction = the last answer or a random axis).
- ASK (E/R/click/button, within 1 cell Manhattan): picks a direction among the junction's open base sides that is NOT the true shortest-path direction toward the exit; 1 in 8 asks it picks the true direction "by accident" and is visibly nervous (sweat drops drawn, nervous lines in 9.6). Sound `bell`. +1 `maze-of-meh.signAsks`, `api.award(0.05)`. The board rotates to that direction; Confidence increments along `['100%','140%','2,000%','11,000%','sure is a feeling']` and then stays on the last value. Confidence NEVER goes down, including across levels and sessions (store index in `api.save('signConf')` max 4... it just increments on each ask).
- FOLLOW TRACKING: after an ask, if the Arrow makes 3 consecutive steps in the pointed direction within 8 s, the sign turns to face the OTHER way and says the "too far" lines. Count `maze-of-meh.signFollows` (+1 per completion). If the pointed direction happened to be the true one (nervous case), it does not count as a wrong follow and the sign says "SIGN: ...Do not tell anyone."
- Sign B ask: always the true BFS direction using CURRENT passability; if the first step toward the exit is currently solid, it points AT THE WALL and says its wall line; Sign A then argues (speech bubbles alternate over 4 s: 2 lines from 9.6 "argue"). Sign B ask gives `api.award(0.05)` too.
- Final loop gag: in any level after the ending (loops >= 1) the FIRST ask of Sign A each level points straight at the Arrow's own cell and says the "you" line.

### 4.3 Chairs, notes, pocket
- Walking onto a chair cell: prompt bubble "Sit?" above the chair, the Action button shows `Sit`.
- SIT (E/Space/R/Enter/click/button): the Arrow sinks into the chair (hat 🎩 drawn above it), sound `pop`, +1 `maze-of-meh.sits`; **freezes the Relabeller for as long as you sit**; opens the note card (DOM, tilted -1.5 deg, tape in the corner, cursive stack) with the chair's note. First sit per chair per level: `api.award(0.5)` and +1 `maze-of-meh.notes`. Repeat sits give 0 and the same note.
- Note choice (once per chair per level, at the first sit; store the string on the chair so re-sits show the same): see 4.3.1. Notes are signed `- You` by the builder (append ` - You`), except the special ones noted.
- TAKE (R/Enter while sitting, or the Take note button): the note goes to the Pocket and the card shows "(taken)". Pocket cap **7** strings (<= 160 chars each); an 8th note makes the OLDEST leave with the "pocket full" line. Pocket persists via `api.save('pocket', [...])` and survives levels, the not-ending, and sessions.
- Pocket DOM: 7 small paper icons (📝 or CSS squares) with `title` = first 40 chars. Clicking an icon shows that note in the card (read only).
- STAND UP: Escape, any move key, Stand button; sound none. While standing again, relabel clock resumes. Stat `maze-of-meh.sitSeconds` is NOT stored per tick (use a local counter and `api.stat.max('maze-of-meh.longestSit', secs)` on stand).
- Chair count growth (cosmetic, drawn as extra 🪑 emoji slightly offset): from beat 4 the farthest dead end ("the last dead end") and one random dead end get a SECOND chair; from beat 9 the last dead end gets a THIRD. A cell with 2+ chairs uses the notes in 4.3.2 ("someone has been busy" / "for when you bring someone") instead of the tiered pool. Chairs count display in the HUD stays the number of dead ends.
- Gerald (rare, only after arc time >= 300 s): at each level load, 1-in-4 chance a potato 🥔 occupies one random dead-end chair (not the last dead end). Stepping on it shows a Gerald remark instead of a note (9.5 group Gerald). If `api.flag.get('metGerald')` is truthy he is named; otherwise "a large potato" with the unexplained lines. Sitting is not blocked; the first sit awards 0.5 as usual. He leaves at the next level load.
- Chair Zero (loops >= 1 only, level 0 only): a chair on the START cell with the special note "You made it. Congratulations. Go back." Not part of the chair-order achievement.

#### 4.3.1 Tiers (which pool a note comes from)
`tier` is computed from the arc beat (section 5), NOT from lifetime, so the "back to normal" beat really goes back to nonsense:
- beats 1-3: `notes0` (nonsense advice)
- beat 4-5: 50% `notes1` (stats), 50% `notes0`
- beat 6: `notes1` and `notes2` (predictions) 50/50
- beat 7: `notes2`, with the "Hi." gag chance below
- beat 8: `notes3` (other levels) with nervous styling, 40% `notes2`
- beat 9: `letter` (the pocket-letter lines in order, see below) 
- beat 10: `notes0` only
Use `api.line(category)` (shuffle bag) then replace `%tokens%`: `%steps% %bumps% %sits% %mins% %level% %lastDir% %notes% %predict%` (all must resolve to non-empty plain text: `%lastDir%` defaults to "nowhere", `%predict%` defaults to "the arrow keys", counts are integers; NEVER emit raw `undefined` or `NaN`).
`%level%` = current plaque text without the word Level (e.g. `7 3/4`). `%mins%` = whole minutes of arc time, minimum 1. `%lastDir%` = the last direction key pressed as a word (left/right/up/down).
- 1 in 60 notes is just `Hi.` After a `Hi.` has been read, the next note read in this session (any tier) is `Hi. Again.` and the following one `Hi. Again. I am still here. It is me.` and after that the gag stops (no award, pure warmth). Track with a session counter.
- Prediction notes (`notes2` item 1): "The next key you press will be %predict%. I will wait." ARMS a check: the next movement/action key pressed after the note closes is compared to `%predict%` (the player's most frequent key among the last 12 pressed, computed at read time; if there is no history use ArrowRight). If it matches, Management says the `predictHit` line; if not, `predictMiss`. One armed prediction at a time.
- The `letter` tier (beat 9): reads `letter[letterIdx % 7]` and increments `letterIdx` (a module-level counter persisted for the session). The seven lines are written so they read as one pep talk in order; the pocket read-aloud at the exit reads them in pocket order.

#### 4.3.2 Pocket reading at the exit
At every exit the pocket is read aloud: Management `api.say` priority 1 sequence of the **newest 3** notes oldest-first, each ~3.2 s apart via `api.setTimeout` (and all 7 at the not-ending). Intro line first (9.5 group `pocketRead`). In beat 9 only, after the last read note Management pauses 2 s and says `letterPause`. Empty pocket: the `pocketEmpty` line.

### 4.4 The Exit and Levels
- The exit cell glows (mustard radial gradient pulsing on a 1.6 s sine) with a small 🌿 leaf beside it labelled "Dennis (Plant)" on first sight each level (tiny sitting, unimpressed lines in 9.8).
- Reaching the exit cell: mode `door` for **1.2 s**: door-open animation (a door shape swings), `api.confetti`, `tada` then `fanfare`, `api.award(7.5)`, +1 `maze-of-meh.exits`, Management line (priority 1) from `exitLevel` (see 9.8) incl. the templated "Level %from% complete. Level %to% is ready and, we want to be clear, is Level 7 1/2.". The plaque DOM flips (CSS 3D flip 500 ms) to the next fraction. Then REBUILD the same maze: avatar to start, visited cleared, notes cleared, chairs re-created for the new level (notes regenerate), labels cleared, relabel countdown reset to 8 s (no scripted stamp after the first level of a loop), cosmetic detail changes (below).
- Level index `k = 0..7` per cycle. Plaque texts: `['7 1/2','7 3/4','7 7/8','7 15/16','7 31/32','7 63/64','7 127/128','7 255/256']`. Plaque font size shrinks per char: `font-size = clamp(15, 30 - 1.5*(len-4), 30)` px.
- Cosmetic per level (the maze is IDENTICAL; only these change): floor tint `['#fff6df','#fdeab9','#f6efd2','#fde6d6','#eaf3dc','#f3e8f7','#e6f1f4','#fbf0cf']`, wall ink tint `['#2b2438','#34283a','#2b3238','#38302b','#2b3a30','#3a2b3a','#2b2e3f','#403424']`, chair cushion colour `['#6aa8f0'(blue),'#7fd6b0'(green),'#f5b82e'(mustard),'#ff7a6b'(coral),'#b9a3f2'(lilac),'#f0a6c8'(pink),'#9fd4e8'(sky),'#d9c27a'(sand)]`, sign board font (cycle `['system-ui','Georgia, serif','"Trebuchet MS", sans-serif','"Courier New", monospace', ...]`).
- At loop restart (after LEVEL 8) every cosmetic goes back to index 0 (cushions blue again).
- `api.stat.max('maze-of-meh.maxLevel', k+1)` after each exit. At `k=4` reached (7 31/32): unlock `maze-of-meh.almost8`.
- 1 in 40 on ANY level load (not the first of a loop): the plaque reads `LEVEL 8` for **0.4 s**, `bell`, Management inhales (line 9.8 `flash`), then flips back to the correct fraction.
- `Level 8` as an exit result only occurs from `k=7` (see section 7).

### 4.5 Scoring (tiny, all meaningless)
- +0.05 per first visit to a cell per level (batched: accumulate `pendingMeh` and `api.award` it at most every 1.5 s, only if >= 0.05).
- +0.5 per chair per level (first sit), +7.5 per exit, +1 per EMOTIONAL SUPPORT wall (cap 3/level), +10 once ever for the retirement cake (later retirements pay 1), +0.05 per sign ask, +0.1 "attendance" at t=5 s of the arc, secret achievements carry their own `reward` (5-10). Cap other awards at 12 Meh per level. Everything uses `api.award(n, reason)`.
- Stats (<=14 names, all `maze-of-meh.`): `steps bumps sits notes exits relabels signAsks signFollows suggestivePasses retired quorums loops maxLevel longestSit`.

---

## 5. The Director: escalation timeline (arc time `arcT`, seconds of module time, resets to 0 at the not-ending; also wraps at 630 s)

`arcT` advances with the clamped dt. Beat index = the last row whose start <= arcT. These are the TIME beats; exits additionally unlock things (`u = max(beat, exits*2)` for label types as in 4.1).

| beat | arcT | what changes (all additive until beat 10) |
|---|---|---|
| 1 | 0-10 | Maze draws itself wall by wall (1 s, instant if reduced motion). Welcome line 0.5 s. First stamp (Wall 14, LOAD-BEARING) at 3.5 s. Attendance award at 5 s. Arrow keys work immediately. Only solid + suggestive labels. |
| 2 | 10-40 | Footer legend fades in: "Walls: ask them." The first batch lands (~12 s) with one suggestive near the Arrow. Beat line `beat2`. First bump line bag active. Sign A is visible from the start; its approach lines trigger within 2 cells. |
| 3 | 40-90 | Beat line `beat3`. First chair note arrives as the player finds a dead end (tier 0). The word "You" signature reveals the joke: Management says the `youSigned` line once after the first note is read (priority 1). `wall` (1/40) rare begins. |
| 4 | 90-150 | Chair count growth begins (second chairs). Tier 1 stat notes mix in. Beat line `beat4`. The Sign's Confidence is visible on its tag. |
| 5 | 150-210 | `pending` and `nameonly` unlock (or sooner via exits). Beat line `beat5`. Sign A gets a hand-lettered sub-tag "Sign has been reviewed". |
| 6 | 210-270 | Rare labels `sandra` and `support` unlock; solid variant "(SMALL LOAD)". Notes tier 1+2 (predictions, "You will press E now"). Beat line `beat6`. |
| 7 | 270-330 | Relabelling Committee: ticker uses MINUTES lines; relabel interval 5-8 s; Sign A gets nameplate "Regional Sign" (line `nameplate`); Sign B appears and Sign A argues with it. `pending` variant "...MEETING ABOUT ITSELF". |
| 8 | 330-420 | Notes tier 3 (other levels, nervous styling: the note card gets a faint 1px shake, handwriting letters spaced), "Please stop reading my handwriting" note is in the pool. `tuesday` unlocks. Gerald can appear (1-in-4 per level load, needs arcT >= 300). Beat line `beat8`. The plaque font visibly shrinks at deeper levels. |
| 9 | 420-510 | Strangely touching. Letter tier notes; the third chair in the last dead end. The Missing Sock walks across the canvas once per session (timed at 450 s arc; 8 s crossing, drawn as 🧦 sliding along a corridor row, never interactive; lines 9.11). The maze is quiet: sfx volume feel by NOT playing `stamp` for batches (silent stamps) and relabel interval stays 5-8 s. Beat line `beat9` + the two touching lines. |
| 10 | 510-630 | Back to normal like nothing happened: notes tier 0, relabel 12-16 s with 3-4 stamps, no rare labels, Sign B hidden, second chairs hidden. Beat line `beat10`. At arcT = 630 the arc wraps to 0 (without resetting level or pocket), Management says `loopWelcome`, and the scripted first stamp does NOT repeat (it only happens at module mount and after the not-ending). |

Beat transitions call `api.say(line, {priority:1})` once. Never speak two beat lines within 8 s of each other.

Pacing guarantee for the builder: first relabel by 12 s, first sign proximity usually by ~40 s, first chair note by ~60-90 s, a stat-aware note within ~150 s, and a rare event or secret roughly every 25 s of play after minute 3.

---

## 6. Secrets, rare events, idle and spam

### 6.1 LONG IDLE (idle seconds counted as the sum of clamped dt since the last input; any key, pointer or button resets it)
- **60 s idle** (use `api.selftest ? 40 : 60` so the 62-second fuzz idle always triggers it): the Arrow walks BY ITSELF (BFS path, 130 ms per cell, mode `autowalk`, input cancels it) to the NEAREST chair (by path length, excluding a chair you are on), sits, writes its own note into that chair's slot: `NOTE (just now): I got tired of waiting for you. I am in the chair. Come find me. - You` (the chair's note becomes that and it is auto-read, no award). Management `idle60` line. Awards `maze-of-meh.idle` achievement (secret). The relabeller is frozen while it sits (normal rule).
- **180 s idle** (selftest only if `?idle` >= 200000): the maze sets every edge `waiting` (passable, dotted lines), the exit SLIDES (0.8 s, `whoosh`) to the cell adjacent to the Arrow (store `exitOverride`), Management says `idle180`. The next input of any kind: all walls become LOAD-BEARING at once (every interior edge that was `base:'wall'` is labelled solid, gaps unlabelled), the exit slides back to its corner, sfx `sad`, Management says `idleReturn`. These labels expire normally after 3 relabellings.
- Idle never advances `arcT`'s beat lines faster than normal and does not count as progress.

### 6.2 SPAM (ladder; all counted with a sliding 4 s window of input events, `inputLog` capped at 80 entries)
- **Tier 1: 20+ bumps into the SAME wall within 4 s:** that wall is relabelled `hurt` (HURT FEELINGS), a small blue tear is drawn on it, and the ticker prints the 3-line complaint (set A or B from 9.4 `hurt`, 1.6 s apart via timeouts) with a Reference Number `27B/6-NNNN` (random 4 digits). `honk` once. Cooldown 20 s per wall.
- **Tier 1b: 60 bumps in ONE level on the same wall:** the wall RETIRES: becomes a permanent `retired` gap for the rest of the level, 🎂 drawn on it, sign "GONE TO FLORIDA" drawn small, Management `retire` lines, `api.award(10)` the first time ever else 1, `tada`, `maze-of-meh.retired` achievement (secret), stat `maze-of-meh.retired`. Per-wall bump counts reset on level load.
- **Tier 2: 40+ inputs (keys, clicks, pointer moves while pressed count as 1 per 130 ms) within 3 s:** "OVEREXERTION REPORT No. 7 1/2": banner over the canvas for 3 s, the Arrow spins (dizzy) for 1.2 s and ignores input during it (`dizzyUntil`), ALL walls become suggestive for 8 s (`recessUntil`), `honk`, Management `overexert` lines. Fee 0 Meh. `maze-of-meh.pest` achievement (secret). Cooldown 30 s.
- Also: pressing/holding the same direction into a wall faster than 14 presses/s just counts as bumps; the throttle (130 ms) prevents infinite events.

### 6.3 Other secrets and rare events
1. **Quorum (sit 60 s):** after sitting 60 continuous seconds (`sitT`), everything in the maze stops (relabel frozen already, signs face down: board angle to the floor), a very small, very polite crowd of 6-9 tiny lilac arrow triangles appears around the chair cell facing the exit and sits (drawn as small triangles, no emoji), saying nothing. Management says `quorum` lines. `maze-of-meh.quorum` achievement (secret), stat `quorums`. Standing up: they all stand and leave very fast (0.6 s slide to the canvas edge, `whoosh`) and the `quorumLeave` line plays. Fires once per sit.
2. **Chair order (every chair in a level without exiting):** when `sitCountThisLevel === chairs.length` (distinct chairs, excluding Chair Zero) Management reads a stitched note: first sentence of each note joined in order, in up to 4 `api.say` chunks of <=140 chars, 3 s apart; the canvas hums (a faint lilac pulse for 6 s); `api.award(2)`; `maze-of-meh.stitched` achievement (secret). Line `stitched` first.
3. **LEVEL 8 flash (1 in 40 level loads):** see 4.4.
4. **WALL (1 in 40 stamps):** see line group 9.7; relabeller freezes 1 s, ticker "(applause)", `tada`, no award.
5. **Resize gag:** a managed `api.on(window,'resize', ...)` handler (debounced 300 ms with `api.setTimeout`) causes: an immediate extra relabel batch tagged text `RE-SIZED (per Facilities)` on one random edge (type `solid`), ticker line `resize`, and the Arrow is NOT moved (keep it simple and safe). More than 5 resizes inside 20 s: `triangle` line and the canvas draws with a `ctx.transform(1, 0, 0.18*sin, 1, 0, 0)` shear wobble for 3 s (skip when reduced motion). The handler also recomputes canvas size.
6. **Sock cameo** (beat 9, once per session), see section 5 and 9.11. If `api.stat.get('sock-matcher.entered') > 0` add the sock-matcher callback line.
7. **Gerald** (beat 8+): see 4.3.
8. **Callbacks to other modules (read-only):** if `api.stat.get('chair-rearranger.entered') > 0`, add the Inspector note (9.5 `notesX`) to the tier 0 pool. If `api.flag.get('metGerald')`, Gerald is named.

---

## 7. THE NOT-ENDING (exact sequence)

Triggered by reaching the exit while `k === 7` (plaque 7 255/256). It is mode `ending` and ignores input (a 12 s failsafe in the loop forces it out if a timeout is lost):
1. 0.0 s: exit door opens (1.2 s), the plaque rolls to `LEVEL 8` (flip), a BANNER drops from the top of the canvas (DOM, `YOU HAVE EXITED THE MAZE OF MEH`, giant), Management gasps (`api.say` mood `panic`, priority 2, line `ending1`), `api.confetti` three bursts (0, 0.4, 0.9 s), `tada` + `fanfare`, achievement `maze-of-meh.level8` unlocks (toast comes from the engine), `api.award(7.5)` as usual, and the whole canvas fades to white room (a DOM overlay with giant lettering, pure CSS).
2. 4.0 s: the banner FOLDS into a post-it (CSS transition: scale/translate to the corner, then swap its text), reading `Level 7 1/2 (rounded)`. Management line `ending2`.
3. 5.0 s: the door swings shut (a quick sound `bloop`), the white room fades. Management line `ending3`.
4. 5.6 s: REBUILD at `k=0`: cosmetics reset to index 0 (blue cushions), `loops += 1`, `arcT = 0`, Chair Zero appears on the start cell holding the note "You made it. Congratulations. Go back. - You". Management says `Welcome to the Maze of Meh.` (priority 1) and the first wall (Wall 14) is stamped LOAD-BEARING at 3.5 s again (the scripted opening repeats). The post-it stays in the corner of the plaque strip for 10 s then peels off.
5. The Pocket is untouched (the diary of the journey that returned to the start). At step 1 Management begins reading all pocket notes (4.3.2, newest 7).
6. It can be repeated forever. The achievement and 7.5 Meh are given on EVERY ending (achievement idempotent). `maze-of-meh.loops` +1.

---

## 8. Achievements (declare with `P.addAchievements`, >= 6 with >= 2 secret; ids prefixed)

```
maze-of-meh.steps100   'Grand Marshal of the Meandering Arts'        100 steps. Nobody asked where to.           icon 🧭 reward 3   check: stats['maze-of-meh.steps']>=100
maze-of-meh.firstexit  'Lord Protector of Level 7 1/2'                Reach the exit for the first time. The maze behind it is exactly like the one you left.  icon 🚪 reward 5  check: exits>=1
maze-of-meh.chairs7    'Chair Laureate of the Dead End'              Read 7 different notes. All of them are from you. All of them are right.  icon 🪑 reward 5  check: notes>=7
maze-of-meh.almost8    'Supreme Archduke of Almost Level 8'          Reach Level 7 31/32. The plaque is proud of you in a very small font.  icon 🏅 reward 6  (manual api.achieve)
maze-of-meh.signs      'Cartographer of the Deeply Unsure'           Follow the Sign 10 times and be wrong 10 times. The Sign is 100% confident you did well.  icon 🚸 reward 5 check: signFollows>=10
maze-of-meh.retired    'The Wall Whisperer Who Was Heard'  (secret)  Bump the same wall 60 times in one level until it retires. It would like you to think about what you have done. It would also like you to visit Florida.  icon 🎂 reward 10
maze-of-meh.quorum     'Quorum Keeper of the Quietest Meeting' (secret)  Sit in a single chair for 60 seconds. Eleven tiny attendees agree that this is the best meeting this maze has ever held.  icon 🕒 reward 8
maze-of-meh.idle       'Patron Saint of the Pause'  (secret)        Do nothing for a full minute and the Arrow takes the chair for you. It is a lovely chair.  icon 🌙 reward 6
maze-of-meh.pest       'Supreme Overachieving Wall Pest' (secret)    Press 40 things in 3 seconds. The walls are filing a report and you are cc'd.  icon 📣 reward 5
maze-of-meh.stitched   'Auditor of Seats, Third Class' (secret)      Sit in every chair in a level without leaving it. The chairs noticed. So did the auditors.  icon 📝 reward 8
maze-of-meh.level8     'Escapee of the Maze of Meh' (secret)         YOU HAVE EXITED THE MAZE OF MEH. You are now in the Maze of Meh.  icon 🏁 reward 15
```
(Use ONLY Emoji 12 or older; 🧭 🚪 🪑 🏅 🚸 🎂 🕒 🌙 📣 📝 🏁 are all fine. If lint complains about any, swap for ⭐.)

---

## 9. ALL LINES (verbatim). Register each group as `P.addLines('m:maze-of-meh:<group>', [...])` and speak via `api.line/sayRandom`. `%x%` tokens are filled by the builder's own `.replace` (NOT P.subst). `{count}` and `{player}` are the only engine tokens (use `{count}` via `api.sayRandom(cat, {count:n})`). Where a line shows "SIGN:" the prefix is part of the text. No `exclamation soup`, no emoji in jokes.

### 9.1 `welcome` (mount; use #1 at 0.5 s of the very first mount, #2 at the first level of each later mount)
1. Welcome to the Maze of Meh. Please proceed to the exit, which we are told is 'around.'
2. Orientation: the exit is not hidden. It is merely far, and glowing, as budgeted.
3. Arrow keys, WASD, a mouse, a thumb. Management has no preference and has written one down.
4. This maze has been certified Moderately Confusing by a committee that got lost on the way to certifying it.

### 9.2 `loopWelcome` (after the not-ending and at each 630 s wrap)
1. Welcome to the Maze of Meh.

### 9.3 `relabel` groups (ticker lines on stamping; `%n%` wall number, `%label%` display text)
`relabelSolid`
1. Wall %n% has been relabelled '%label%'. It was not consulted.
2. Wall %n% is now '%label%'. What it bears is not disclosed.
3. Wall %n% has been marked '%label%'. Wall %n% would like to clarify that it is mostly emotional support.
4. Relabelling: wall %n%, '%label%'. Nothing about wall %n% has changed. Wall %n% feels seen.
5. Wall %n% is '%label%' as of now. As of earlier it was a wall, too.
6. Wall %n% has been installed in the corridor. It was a doorway. It is now '%label%' and a little defensive.

`relabelSuggestive`
1. Wall %n% is now 'suggestive'. It is not saying you may walk through it. It is saying it would not stop you.
2. Wall %n% is 'suggestive'. It would like it noted that it has not made any suggestions.
3. Wall %n% has been marked 'suggestive'. It is leaning. Management takes no position on the lean.
4. Wall %n%: 'suggestive'. Please do not read into it. It is reading into you.

`relabelPending`
1. Wall %n% is 'pending review'. Review is scheduled for a Tuesday that has not been invented yet.
2. Wall %n% is 'pending review'. It is a wall on odd seconds and a rumour on even ones.
3. Wall %n% has been sent for review. The reviewer is also a wall.

`relabelName`
1. Effective immediately, wall %n% is 'a wall in name only'. The name is Kevin.
2. Wall %n% is now 'a wall in name only'. It takes a moment to remember it isn't one.
3. Wall %n% has been renamed. The wall has not been told what to do with the name.

`batch` (ticker summary after each batch; `%count%` = number of stamps)
1. Relabelling complete. %count% walls changed. %count% walls feel exactly the same.
2. Relabelling complete. %count% walls changed. Management has not located the other ones.
3. %count% walls relabelled. The maze would like to be told next time. The maze has been told next time.
4. Next relabelling in a number of seconds that Management will not be taking questions on.

`committee` (beat 7+, replaces `batch`)
1. MINUTES: Motion to relabel wall %n% carried, 1-0. The wall abstained by being a wall.
2. MINUTES: Motion to relabel the south wall carried, 1-0. Quorum was Sandra.
3. MINUTES: Item 4, walls. Item 4 was relabelled. Item 5 was not reached.
4. MINUTES: The committee thanks wall %n% for its service and relabels it.

### 9.4 Walls, bumps, clicks, crossings
`bump` (ticker; also 1 in 6 bumps goes through `api.say` priority 0; `%bumps%` total bumps)
1. Thud. The wall acknowledges your input.
2. That was a load-bearing bump. It bore it.
3. Bump logged. Bump count is now %bumps%. Bump count was not a target, but it is on track.
4. The wall says it is not angry. It is just load-bearing at you.
5. Please do not apologise to the wall. It cannot hear you. It is also listening.
6. Bump %bumps%. The wall has added you to its list of regular visitors.
7. The wall took it well. The wall was not consulted.
8. Bonk. The wall takes its work very seriously.
9. That wall was a wall before it was labelled and will be one after.
10. Wall impact noted. Wall impact has been filed under 'weather'.
11. Another bump. The wall is beginning to recognise your footsteps.
12. A wall is a decision somebody made about a corridor. It was a good decision. It is being defended.

`bumpAgain` (same wall bumped before in this level)
1. You have bumped this wall before. It remembers the shape of you.
2. You have bumped that wall 12 times. It has started to recognise the angle.
3. This wall and you have met. This wall has met you. They are not seeing other people.

`click` (a click-path was stopped by a solid wall)
1. I was only following the click.
2. The click said go. The wall said no. You were only following the click.
3. The click has been informed.

`pendingBump` (blocked by pending review)
1. The wall is under review. Please do not lean on the review.
2. The wall flickers. It is deciding. It has been deciding since orientation.
3. Pending review: solid on odd seconds, open on even. Management recommends a watch.

`pendingPass`
1. You walked through a wall that was on break.
2. The wall was between decisions. You are the decision.

`suggestivePass` (ticker; `%suggestive%` total crossings)
1. 'Excuse me.' 'Not at all.' Nothing has happened and everyone is flustered.
2. You passed through a suggestive wall. It wishes to state that it did not say anything.
3. The wall was very understanding. It said it hears this a lot.
4. Suggestive wall crossed. It will remember this. It will not mention it.
5. You have walked through a suggestive wall %suggestive% times. The walls have begun to compare notes.

`bubble` (the Arrow's speech bubble while crossing suggestive; pick randomly)
excuse me / pardon / sorry, sorry / just passing / terribly sorry

`nameCross`
1. The wall takes a moment to remember it isn't one. So do you.
2. A wall in name only. You walked through the name.
3. Your direction has been withdrawn for 400 milliseconds, pending Kevin.

`nothing` (E/R/Escape with nothing to do; ticker only, max once per 4 s)
1. Nothing to sit on. Nothing to ask. Management respects the effort.
2. There is nothing here to read. There is, however, you, and that is noted.
3. Escape has been pressed. Escape did nothing. Management notes that it did nothing.
4. Pocket empty. Pockets are mostly a state of mind. Management has one.

`hurt` (two sets of three, shown in sequence 1.6 s apart; `%n%` wall number, `%count%` bumps, `%ref%` 4 digits)
Set A:
1. WALL %n%: I would like to make a complaint.
2. WALL %n%: I have been walked into %count% times in 4 seconds. I am a wall. I do this for a living.
3. WALL %n%: Reference Number 27B/6-%ref%. Please do not contact me. Please contact me.
Set B:
1. WALL %n%: I am not angry. I am blue.
2. WALL %n%: There has been a lot of pressing. I did not consent to the pressing.
3. WALL %n%: Reference Number 27B/6-%ref%. A person will get back to you. The person is also a wall.

`retire`
1. Wall %n% has retired after 60 bumps. There will be cake. The cake is a drawing.
2. Wall %n% has gone to Florida. It left a gap and a note: 'Do not bump me. I am on a beach.'
3. Retirement cake: 10 Meh, one time only. The cake cannot be eaten, only honoured.

`overexert`
1. Rapid movement detected. The walls are filing an overexertion report. Everyone is cc'd.
2. Please stop pressing the arrows. They have been told to hold on. They are holding on.
3. Recess is called. For 8 seconds all walls are suggestive. Per policy, which was written during the recess.
4. You have exceeded the maze's recommended rate of progress. Please slow down. Not for any reason.
5. The overexertion fee is 0 Meh. Per policy.

`resize`
1. The building was adjusted. Please check you are still you.
2. Facilities has moved the walls slightly. Facilities did not move the point. Facilities never had it.
3. RE-SIZED (per Facilities). The maze is the same maze. It would like it noted that it is wider, spiritually.

`triangle`
1. The maze is now a triangle for a moment. It is not a triangle. It is a maze that is thinking about it.
2. The maze is a rectangle again. Management shrugs, in the way a plaque can.

### 9.5 Notes (shown in the note card, signed ` - You` by the builder unless stated)
`notes0` (nonsense advice; tier 0; 18)
1. Don't go left. I went left. It was left.
2. I sat here for 4 minutes. It was the best 4 minutes of this maze, which is a low bar.
3. The exit is real. I found it. It was also a maze. I am writing this from there.
4. If you are reading this, I am behind you. Do not turn around. I'm kidding. Turn around.
5. I left you a chair. This is the chair. Please enjoy it responsibly.
6. I was lost here. Then I was lost over there. Same feeling, better view.
7. Tell Dennis I said hi. Dennis is a plant. I know. Tell Dennis anyway.
8. It's me again. Still me. Surprisingly consistent.
9. Do not trust the sign. Trust the other sign. There is no other sign. Hold that thought.
10. To whoever is next: the exit is always the other one. I checked. It is not.
11. I wrote this for you. I was hoping you would be someone else.
12. The chair is a 6 out of 10. I am generous when I am lost.
13. P.S. the sign lied. P.P.S. so did I.
14. Went right. Right was also a mistake. Chair is fine though.
15. Nothing here. Just a chair, a note, and the knowledge that I will do this again.
16. It was right behind you the whole time. I am not saying which part.
17. Tuesday is coming. I have saved you a seat for it.
18. Please do not read the previous note. It was me. I was wrong.

`notes1` (stats; tier 1; 10)
1. I took %steps% steps to get here. The chair has been placed with that number in mind.
2. I have bumped into things %bumps% times. I am not counting. The maze is.
3. You have sat %sits% times today. The chair has filed nothing, but is thinking about it.
4. It has been %mins% minutes. I know because you know.
5. Level %level%. I would like to say I am further along than that. I am not. That is not a complaint.
6. Your last wrong turn was %lastDir%. I made it too. Same turn, different me.
7. %steps% steps. %bumps% bumps. One of those is a hobby.
8. You pressed %lastDir% last. I would not have. I did. It was a mistake. It was also correct.
9. At %mins% minutes in, I felt exactly like you do now. I am you. This is not a coincidence.
10. You have read %notes% notes in here. They are all from the same person. It is not you. It is you.
`notes1yes` (used only if `suggestivePasses` > 0; mixed into tier 1)
- You walked through a suggestive wall. It was fine. It said it was fine.
`notes1no` (used only if `suggestivePasses` == 0)
- You have not walked through a suggestive wall yet. It has noticed. It is waiting, politely.

`notes2` (predictions; tier 2; 7)
1. The next key you press will be %predict%. I will wait.
2. You will sit down in this chair in about 3 seconds. You are already sitting. I am early.
3. You are about to read this twice. Go on.
4. You will take this note. You always take the note. It is the note's whole plan.
5. In a moment you will stand up and go left. If you do not, I am wrong and you are not you.
6. You have read %notes% notes. You were going to read one more. That is this one.
7. Press %predict%. No, I mean it. I know you have already thought about it.
`predictHit`: The note was correct. The note takes no pleasure in this.
`predictMiss`: The note would like to revise itself. The note was written by someone who knew you less.

`notes3` (other levels; tier 3; 6)
1. I am you from Level 7 63/64. Everything is fine. Please stop reading my handwriting.
2. I am you from Level 7 7/8. I am here early. The maze is the same. I am the one that changed.
3. I am you from Level 7 255/256. I can see the exit from here. It is also a maze. It is also fine.
4. I am you from Level 7 1/2, the first one. I did not know any of this. It was a lovely time.
5. Level 7 15/16 sends regards. Level 7 15/16 is mostly a plaque.
6. I am you from Level 7 31/32. Please do not tell the earlier me about the later me. It would only make them hurry.

`letter` (tier 4; read in order, wraps after 7; they must chain)
1. Hello, me. I am writing this in the chair. It is a good chair. I did not expect that.
2. You are doing fine. I know the maze is the same maze. I know you know. You are doing fine anyway.
3. If you are lost, that is allowed. It is most of what is going on in here.
4. Walls are mostly suggestions. This is wrong. But for a second it was nice.
5. Do not go left. I keep saying that. Go left if you want to. It was probably fine.
6. Nobody has told you this yet: the sitting counts. The sitting is the best part. It counts for more than you would expect.
7. That is all. That is the letter. I will be in the chair if you need me. I am always in the chair. Love, you.
`letterPause`: Management did not write these. Management would like a copy.

`notesX` (callback and one-offs, mixed into tier 0 when the gate is true)
1. (gate: `chair-rearranger.entered`>0) Inspector Pemberton-Oyelaran has been through. The chair was rated Fine. The chair has not got used to it.
2. (gate: first-ever note of the first-ever session, 1-in-1) Hi. 
Note: the `Hi.` gag is handled in 4.3.1; do not add it as a normal entry.

`notesSecond` (a cell with 2 chairs)
1. Someone has been busy. There is a second chair now. I did not bring it. It was already you.
2. Two chairs. I sat in one. I cannot find the other one. It is probably also me.
3. This chair has a friend. The friend has a note. The note says 'see other chair'.

`notesThird` (the last dead end after beat 9)
1. Three chairs now. One for you, one for when you bring someone, and one for whoever they bring. Management has not been consulted.
2. Three chairs. I have been practising for when you bring someone.

`notesGerald` (Gerald in the chair, named when `metGerald`; otherwise use `geraldUnnamed`)
1. GERALD, seated: 'A maze is a straight line that has taken a long time to decide.'
2. GERALD, seated: 'The exit is a state of mind.' It is not. It is an exit. It is over there.
3. GERALD, seated: 'Every wall was once a very patient door.'
`geraldUnnamed`: A large potato is sitting in the chair. Management declines to explain. The potato declines to be explained.

`notesChairZero`: You made it. Congratulations. Go back.
`notesIdle`: NOTE (just now): I got tired of waiting for you. I am in the chair. Come find me.
`notesHi`: Hi. / Hi. Again. / Hi. Again. I am still here. It is me.

`youSigned` (Management, once after the first note is read in a session)
1. The notes are signed 'You'. Management has checked. Management is also, apparently, You.

### 9.6 Signs (lines may also render in a canvas speech bubble above the sign; keep the ticker too)
`signApproach` (first approach per level, within 2 cells)
1. SIGN: EXIT this way. Also this way, the other way. I am certain of both.
2. SIGN: I would walk you there myself, but I am a sign, bolted to a decision I made in 2009.
3. SIGN: 'You are here.' You are, in fact, here. The sign is rarely this right and is visibly shaken.
4. The sign has rotated. The sign denies rotating.
5. The sign points left with 100% confidence. The sign also points right with 100% confidence. Total confidence: 200%.

`signAsk` (`%dir%` word, `%conf%` current confidence text)
1. SIGN: %dir%. I have never been more certain. Please disregard the last time I said this.
2. SIGN: Go %dir%. Confidence %conf%. Sign regrets nothing.
3. SIGN: %dir%, obviously. I did not look it up. I am a sign.
4. Sign confidence is now %conf%. Sign regrets nothing.

`signNervous` (the accidental true direction)
1. SIGN: %dir%. ...Is that right? Why is nobody saying anything.
2. The sign has accidentally been correct and is sweating, structurally.
3. SIGN: %dir%. Please do not check.

`signTooFar`
1. SIGN: You've come too far.
2. SIGN: Bold. Not that one.
3. SIGN: You went the way it pointed. The sign has turned around to face the other way. It denies pointing.

`signYou` (loop gag, first ask per level when loops >= 1)
1. SIGN: You. The exit is you. It is technically correct, and the sign is taking it as a win.

`nameplate`
1. A nameplate has been installed on the sign. It reads 'Regional Sign'. The sign has been waiting for this since orientation.

`signB` (Sign B asks)
1. SIGN B (Regional): The exit is that way. I am always right. It is a burden.
2. SIGN B (Regional): That way. That way has been the way since the lease.
`signBwall` (the true first step is currently solid)
1. SIGN B points at a wall. SIGN B: I said the way. I did not say it was open.

`argue` (Sign A and B alternate; beat 7+)
1. SIGN A: That sign is only right because it has been lucky. SIGN B: Every time.
2. SIGN A: I was here first. I have the confidence to prove it.
3. SIGN A: Fine. FINE. Go that way. See what happens.
4. The two signs have been introduced. They are not speaking. One of them is, loudly, wrong.
5. SIGN A has filed a formal complaint about SIGN B being correct in public.
6. SIGN: Do not listen to the other sign. SIGN B: I am right here.

`signReviewed` (tag text): Sign has been reviewed
`signConfidence` sequence (UI, not lines): 100% / 140% / 2,000% / 11,000% / sure is a feeling

### 9.7 Rare labels
`sandraTag`: Wall %n% is marked 'AS PER SANDRA'. Sandra has not seen the wall. Sandra has seen the policy about the wall.
`sandraClause` (bump)
1. Clause 4.2: walls may be walked through, but only apologetically.
2. Clause 9(b): a wall shall not be leaned on after 4 PM, or before it.
3. Clause 11: this wall is deemed solid for the purposes of this clause only.
4. Clause 14.0.1: see Clause 14.0.1.
5. Clause 22: all clauses are subject to Clause 22.
`supportTag`: Wall %n% is now 'emotional support'. It is solid, but it means well.
`supportBump`
1. The wall holds you. Not physically. Philosophically. Also physically.
2. This wall is emotional support. It asks nothing. It has given you 1 Meh.
`tuesdayTag`
1. Wall %n% is 'TUESDAY'. Every wall nearby has gone quiet and solid. Management is not discussing it.
2. TUESDAY has arrived for 5 seconds. It was early. It is always early.
`wallTag` (1 in 40; ticker, then freeze 1 s)
1. A wall has been correctly labelled. Please hold for applause.
2. (applause)
3. Thank you. We will not be doing that again.

### 9.8 Sitting, exits, levels, Dennis
`sit`
1. You have sat down. This is the longest anyone has stayed at a decision in this maze.
2. The relabelling timer is frozen while you sit. This is the maze's only benefit and it is also pointless.
3. The chair is warm. Someone was just here. The note says it was you.
4. Chair rating: 6 out of 10. It is a chair. It has learned to be ready.
5. Your rest has been logged as 'Strategic Pause', a category created just now.
6. The chair has been sat in {count} times today. The chair has filed nothing, but is thinking about it. (`{count}` = `maze-of-meh.sits`)
7. Please remain seated until the maze comes to a complete stop. It has not started.
8. You rested for %secs% seconds. The maze waited. The maze is patient the way a clock is patient. (on stand, if >= 8 s)
9. You have stood up. The chair says nothing. The chair is relieved. The chair misses you.

`take`: Note pocketed. Pocket: %count% of 7.
`pocketFull`
1. The oldest note has stepped out to make room for itself. It did not say where.
2. Pocket full. The oldest note has left, to make room for the newest one. It left a note. You have not read it.

`pocketRead` (intro at each exit)
1. Management would like to read your pocket notes aloud. Management is not crying. Management has a draught.
2. Your pocket notes will now be read. Management reminds you that Management did not write them.
`pocketEmpty`: Your pocket is empty. Management read it anyway. It was brief.

`exitApproach`: The exit is glowing. This is a feature. It was budgeted.

`exitLevel` (Management on exit; `%from%` `%to%` plaque texts without "Level")
1. Level %from% complete. Level %to% is ready and, we want to be clear, is Level 7 1/2.
2. The maze has been completely replaced with an identical maze. Management cannot say what was wrong with the old one.
3. Your path efficiency is 0.00007%. We have rounded up to 'visibly walking'.
4. Management did not build this maze. Management found it, and renamed it.
5. Great progress. We are unable to measure it, but the mood on the floor is strong.
6. A maze is just a very slow corridor. Management says this without judgement.
7. Congratulations on exiting. You have entered the same maze, but with a plaque. The plaque is brass. The brass is cardboard.
8. You have exited {count} times. You are on the same floor. The floor has been described as 'load-bearing'. (`{count}` = exits)
9. Lateral progress is the fastest kind. It is also the only kind.
10. Door opened. Behind it: a maze. We are as surprised as you are, in an orderly fashion.

`plaque` (the level-specific line, spoken with the new plaque in addition; index by NEW `k`)
0. LEVEL 7 1/2. Plaque installed by a very confident contractor.
1. LEVEL 7 3/4. A plaque reading 7 3/4 has done the maths and wishes you luck.
2. LEVEL 7 7/8. We are getting closer to 8. We will never arrive. That is what 'closer' means.
3. LEVEL 7 15/16. The plaque has shrunk to fit. The maths has not.
4. LEVEL 7 31/32. Each level is half the distance to 8. It is a lot of halves. Management has counted them and stopped.
5. LEVEL 7 63/64. Management would like to defend the maths sincerely: 'closer' is a direction.
6. LEVEL 7 127/128. The font is now very small and very proud.
7. LEVEL 7 255/256. You are 1/256 of a level from Level 8. Management is not allowed to say what happens then.

`flash` (LEVEL 8 flash secret)
1. Management inhales. ...We did not see that. Please do not mention it.

`dennis`
1. Dennis (Plant) is sitting beside the exit. Dennis (Plant) is unimpressed. Dennis (Plant) has seen this exit before.
2. Dennis (Plant) has been appointed Exit Greeter. Dennis (Plant) greeted no one, thoroughly.

### 9.9 The not-ending
`ending1` (mood panic): LEVEL 8. Management gasps. Management has been told not to gasp. Management gasped.
`endingBanner` (big DOM text): YOU HAVE EXITED THE MAZE OF MEH
`ending2`: Management would like it noted that Level 8 was a rounding error and that it was an honour to witness.
`ending3`: The door has closed. It was never open. It was a very convincing 'ajar'.
`endingPostit`: Level 7 1/2 (rounded)
`endingDiary`: Your pocket notes are still with you. They now read as a diary of a journey that returned to the start.
(then `loopWelcome` #1: Welcome to the Maze of Meh.)

### 9.10 Idle, quorum, stitched
`idle60`
1. The Arrow has stopped. The Arrow has taken the initiative and a chair.
2. Management has not been told where the Arrow went. Management has looked in the chair.
3. We can see you are thinking. We are thinking too. About the walls, mostly.
`idle180`
1. The maze has come to you. Please do not make this weird.
2. Every wall is now 'WAITING'. They are all passable. They are all a little hopeful.
`idleReturn`
1. Welcome back. All walls have been relabelled LOAD-BEARING at once. The maze sighs. It was nice while it lasted.
`quorum`
1. A very small, very polite crowd has taken the neighbouring chairs. All of them face the exit. This is called Meeting Quorum.
2. Eleven tiny attendees agree that this is the best meeting this maze has ever held. Not a single item on the agenda.
`quorumLeave`
1. The meeting is adjourned. Everyone stood up very fast and left. The chairs are still warm.
2. Quorum lost. The minutes will say you left. The minutes will be correct.
`stitched`
1. Every chair has been sat in. The notes have been stitched into one, which is also a note, which is also from you.
2. This is the only moment the level hums.

### 9.11 Beat lines and the Sock
`beat2`: Relabelling is now live. Please do not lean on anything that has opinions.
`beat3`: Meeting minutes: the exit was discussed. The exit was not attended.
`beat4`: Management would like to remind you that every chair is a dead end's best idea.
`beat5`: Policy drift: walls may now be 'pending review' or 'in name only'. Neither is a promise.
`beat6`: Sandra from Compliance has joined the relabelling. Sandra is not here. Sandra is cited.
`beat7`: A Relabelling Committee has been formed. It has one member. Motions carry 1-0.
`beat8`: The notes have changed. Management would like it known that Management did not write the notes.
`beat9`: The maze is quiet. Management has not been told why. Management has decided to enjoy it.
`beat9b`: Thank you for being the only thing in here that moves. It has not gone unnoticed. It has gone mostly unnoticed. But some of it was noticed.
`beat9c`: Management has never found the exit and does not mind.
`beat10`: Back to normal. Nothing happened. We have never been more normal.
`attendance` (t=5 s, with the 0.1 Meh): Attendance has been taken. You were present.
`legend` (footer, not spoken): Walls: ask them.
`sock`
1. A single sock is walking away across the maze. It looks purposeful. It does not look back.
2. The Missing Sock has been spotted. It is unaccounted for. It is on a journey. It seems happy.
`sockMatcher` (only if `sock-matcher.entered` > 0): It has been logged as 0 of 2. Management is not saying where the other one is.

### 9.12 Fixed UI strings
- Prompt bubble over a chair: `Sit?`
- Action button labels: `Sit`, `Ask the sign`, `Take note`, `Read pocket`, `Nothing in reach`; extra buttons: `Stand`, `Up`, `Down`, `Left`, `Right`, `Take note`.
- Countdown bar label: `Next Relabelling`.
- Footer: `Walls: ask them.`
- Banner for spam tier 2: `OVEREXERTION REPORT No. 7 1/2`.
- Retired wall sign: `GONE TO FLORIDA`.
- Plaque prefix: `Level `.

(Total distinct line-like strings: well over 200 including notes, so the >= 80 requirement is met with room to cut.)

---

## 10. Visual design

PALETTE (module root CSS variables): cream background `#fff6df`, ink `#2b2438` (walls 3px, round caps), coral `#ff7a6b` (stamps), mustard `#f5b82e` (exit glow, plaque, sign A boards), mint `#7fd6b0` (Arrow fill, Sign B boards), lilac `#b9a3f2` (suggestive, quorum), warm grey `#c9c2b0`, sky `#6aa8f0` (blue cushion, tears). Cartoon-sticker cards: `box-shadow: 4px 4px 0 var(--ink)`, 2px ink border, 14px radius. Matches the Lobby's cheerful intranet look. System fonts only; notes use `font-family: "Segoe Script","Bradley Hand","Comic Sans MS",cursive`.

LAYOUT (root is a flex column, gap 8px, padding 8px, max-width 760px, centred, min-height 420px):
1. Headline strip: left = brass plaque DOM (`linear-gradient(#f6d468,#c79a2a)`, inset bevel, two fake screws via radial gradients, serif text `Level 7 1/2`, auto-shrink with level); right = HUD chips `Steps`, `Bumps`, `Chairs n/m`, `Level k/8`. The post-it (not-ending) appears over the plaque corner.
2. Canvas, centred, `max-width:720px`, width 100% of the column, aspect ratio from the grid. Cell size `cs = floor(min(720, root.clientWidth-16) / W)`, minimum 22 css px; canvas CSS size `W*cs+12` by `H*cs+12` (6px margin each side for line caps). Hi-DPI: `canvas.width = cssW*dpr` with `dpr = min(devicePixelRatio||1, 2)`, `ctx.setTransform(dpr,0,0,dpr,0,0)`. GUARD: if `clientWidth` is 0 use 360.
3. Label Ticker (`aria-live="polite"`, one line, ellipsis, 2 lines on narrow), then the "Next Relabelling" bar (6px, mint, coral last second).
4. Note card (hidden until used; tilted -1.5deg; tape rectangle; `font` cursive; max-height with scroll) + Pocket row of 7 slots.
5. Control row: Action button (wide), Stand, Take note; D-pad cluster of four 44px buttons in a plus layout; at <= 400px the D-pad is a 3x2 grid under the action row.
6. Footer legend `Walls: ask them.` (faded in at beat 2; static text for reduced motion).

CANVAS TRICKS (everything in ONE rAF loop with delta time):
- Floor: fill level tint, a carpet-tile check pattern (mint at 10% alpha, alternate cells), visited cells tinted mint 8%.
- Walls: base walls drawn as rounded line segments with a 0.8px seeded jitter (hand-wobbled; reduced motion: zero jitter). Plain walls ink 3px. LOAD-BEARING: 5px with a diagonal hazard-stripe tag. SUGGESTIVE: `setLineDash([5,5])`, `globalAlpha .45`, lilac, gentle `sin()` wobble (off in reduced motion), "noted" tick. PENDING: 1 Hz blink + 🕒 glyph. NAME ONLY: ink line with a tiny nametag "Kevin". TUESDAY: grey tint. WAITING: dotted. HURT: blue, with a tear (small teardrop path). RETIRED: gap + 🎂.
- Tags: a tiny paper rectangle across the edge midpoint with the label text (bold 8-10 px, shrink to fit `cs*1.7`), rotated -6..+6 degrees (per edge, seeded), `ctx.save/rotate/restore`, coral for solid-family, lilac for suggestive, mustard for pending, mint for name-only, grey for tuesday. Stamp animation scale 1.6 -> 1 overshoot; reduced motion off.
- Avatar: arrow-shaped path (triangle, round joins, mint fill, ink 2.5px outline, two small white eyes toward heading), heading eases to the move direction (shortest-angle lerp), squash 120%/80% for 80 ms on bump, sunk-into-chair pose with 🎩 when sitting, a speech bubble (rounded rect + tail, ink text 11px) for bubbles; dizzy = rotation spin.
- Chairs: 🪑 drawn with `fillText` at 60% of `cs`, over a small rounded coloured cushion square (level cushion colour), tiny shadow oval; second/third chairs offset by 7px. A potato 🥔 on top of the chair when Gerald is there. "Sit?" bubble when the Arrow stands on it.
- Signs: post + two arrow boards (path fills) with `EXIT` text on both boards, rotation spring, Confidence tag, nervous sweat drops. Sign B in mint with nameplate.
- Exit: radial gradient mustard glow pulsing 1.6 s, 🌿 beside it with a tiny "Dennis (Plant)" label (first time per level).
- Dennis, Sock (🧦), cake (🎂), Gerald (🥔): emoji, none newer than Emoji 12.
- Door animation (1.2 s) is a rectangle that rotates open via skewX; confetti via `api.confetti`.
- Reduced motion (`root.closest('body').classList.contains('pm-reduce-motion')` checked each frame inside try/catch, plus `window.matchMedia('(prefers-reduced-motion: reduce)').matches` read ONCE at mount, NEVER add a listener): no wobble, no jitter, no stamp overshoot, no flip animation (instant), no confetti shake, no shear wobble, no maze draw-on.

SOUND (only these names): `stamp` on stamps, `bloop` on solid bumps, `boing` on suggestive crossings and hurt, `buzz` on blocked pending, `pop` sitting, `ding` note read, `bell` sign ask and LEVEL 8 flash, `tada` + `fanfare` exit, `honk` spam, `sad` idle return, `whoosh` slides and quorum leaving, `blip` every 4th step (max one per 150 ms). NEVER `chime`, `thud` or any name not in the list.

---

## 11. Implementation hints

- File structure (top to bottom): header comment `/* POINTLESS module: maze-of-meh */`; IIFE strict; `P.injectCSS`; `P.addAchievements`; `P.addLines` groups (as arrays named by category); constants; `mount(root, api)` containing: helpers (rng, bfs), build maze, state object `S` (single mutable object: mode, avatar{cx,cy,fx,fy,heading,tween}, level k, loops, arcT, relabel clock, pocket, chairs[], signs[], labels, inputs), DOM build, canvas draw functions, systems update functions, input handlers, `loop(ts)`, `destroy`.
- Use ONLY managed timers/listeners: `api.requestAnimationFrame` (one loop; compute `dt = min(0.1, (ts-last)/1000)`; first frame `last=ts`; if `ts` is not a finite number use `api.now()`), `api.setTimeout/setInterval`, `api.on`. No timers or listeners at file load. `destroy()` clears local intervals (D-pad), the quorum/sock timeouts are managed anyway, removes the ending overlay. On `destroy` set `S.dead=true`; every callback starts `if (S.dead) return;`.
- Game modes in `S.mode`: `'play' | 'sit' | 'autowalk' | 'door' | 'ending' | 'freeze'`. Input handlers early-return in `door`/`ending`/`freeze` (except Escape/ticker). Timers for `door`/`ending` must set mode back AND be mirrored by a loop failsafe (`S.modeUntil` ms: if `api.now() > S.modeUntil + 2000` force `'play'` and rebuild).
- Keep per-frame work small: pre-compute wall lists, draw tags only for labelled edges (<= 16). Do not allocate in the loop except short-lived effects (cap `effects[]` at 40, `bubbles` at 4, `stamps` at 16). Update DOM text only when the value changed (ticker, plaque, HUD, button labels).
- Save usage: `api.save` keys `seed`, `pocket`, `signConf`, `sockSeen` (boolean). Always `try{}`-free (api.save never throws). Values are plain strings/numbers/arrays only.
- Meh batching: accumulate in `S.pendingMeh`, flush at most every 1.5 s so floating text is not spam.
- Management budget: wrap `api.say` in `sayM(text, o)` that enforces: priority 0 at most once per 5 s, `{mood}` mapped sensibly (proud for exits, smug for sign, panic for ending1, confused for notes, disappointed for idle return). Ticker lines have no limit except dedupe-last-line.
- Ticker helper `tick(text)` sets one line, ignores empty/duplicate, never passes `%token%` leftovers: after replacing, if `/%[a-zA-Z]+%/` still matches, strip it (belt and braces).
- Notes: `makeNote(chair)` returns a plain string; choose tier by `beatIndex(S.arcT)`, filter `notes1yes/no` by `suggestivePasses`, apply `%tokens%`, handle Hi gag, second/third chair overrides, Gerald, Chair Zero. Cache on `chair.note` and `chair.noteSource`.
- BFS passable function for the click path and idle walk: `p(edge) = canCrossNow(edge).ok`; for the sign direction and the flood-fill use the PERMANENT passability (section 4.1).
- First-frame safety: do not draw until `cs` is finite and > 0; recompute `cs` on resize via the managed resize handler (the SAME handler as the Resize gag, which debounces the extra stamp); never change `W,H`.
- Avoid forbidden words in visible text: `null`, `undefined`, `NaN`, `[object Object]`. Wall number, counts, `%mins%`, `%steps%` always `String(Math.max(0, Math.floor(n)))` guarded with `Number.isFinite`.
- Lint notes: only `{player}` and `{count}` as engine tokens; no `console.*`; no `Math.random` (use `api.rand/randInt/pick/chance/shuffle`); no `Date.now` (use `api.now()`); avoid `innerHTML`; no `localStorage`; every selector in CSS must contain `.m-maze-of-meh-`.
- Test commands to run before reporting done: `node tools/lint.js games/maze-of-meh.js`, `node tools/selftest.js maze-of-meh --steps 400`, `node tools/selftest.js maze-of-meh --idle 200000` (to exercise the 180 s idle branch), `node tools/shot.js maze-of-meh --wait 4000` and `--width 360`, then `node tools/selftest.js maze-of-meh --real`.

---

## 12. Risks: the 5 most likely implementation bugs

1. **The Relabeller seals the exit or strands the Arrow.** Solid stamps on `gap` edges, the Tuesday override, the idle "exit slides next to the Arrow" and the retirement/spam overrides all change passability. Bugs to expect: flood-fill uses CURRENT passability (pending edges flicker so the check lies), forgets that the exit may have moved, or treats the Arrow as standing inside an edge mid-tween. Mitigation: permanent-passability BFS (pending/suggestive/nameonly/waiting passable, temporary overrides ignored), run it on every batch AND after the idle exit move, commit each crossing decision at tween start, and add a debug assertion in `?dev` that BFS(start->exit) always succeeds on the base maze.
2. **Input handling double-fires or wedges.** Listening on both `root` and `document` can handle one keydown twice; Space/Enter on a focused button can both click the button and trigger the keyboard action; `preventDefault` on everything blocks Tab; a pointer drag whose `pointerup` never arrives (synthetic fuzz drags, `lostpointercapture`) keeps steering forever; the D-pad hold interval outlives the press; the 400 ms `nameonly` lock or `dizzyUntil` never expires. Mitigation: de-duplicate by event object, skip BUTTON/INPUT targets for Space/Enter, only `preventDefault` handled keys, NO held-key state (use auto-repeat keydowns plus a 130 ms throttle), clear every steer/interval on `pointerup/cancel/lostpointercapture/blur` and with a 4-5 s hard cap, and make every lock a timestamp compared to `api.now()` rather than a flag with a separate timer.
3. **Canvas sizing, hi-DPI and stale geometry.** `root.clientWidth` can be 0 (hidden at mount, fuzz resizes), producing `cs = NaN`, NaN text and a failed run; the grid size must not change after mount; click coordinates computed from a cached rect break when the page scrolls or scales; `devicePixelRatio` changes; the shear wobble leaks transform state. Mitigation: width fallback to 360, `Number.isFinite` guard on `cs`, never cache the rect (call `getBoundingClientRect()` per event), `ctx.save()/restore()` around every transformed block, reset `ctx.setTransform` at the start of each frame.
4. **Time and lifecycle bugs.** Using wall time instead of clamped dt makes a backgrounded tab fire several relabels, idle and quorum at once; the first rAF frame gives a huge or NaN dt; the ending/door sequences depend on chained `api.setTimeout`s and a mode flag that is never restored if the module is destroyed or a timer is lost, leaving the Arrow frozen; remounting 20 times leaves ending overlays, intervals or the post-it in the DOM; the 20-second selftest idle (62 s) must still reach the 60 s idle branch. Mitigation: ONE loop with clamped dt, all counters accumulated from dt, `S.dead` guard in every callback, `S.modeUntil` failsafe, overlays created inside root and removed in `destroy`, idle threshold `api.selftest ? 40 : 60`.
5. **Content tokens and text surfaces.** Notes and lines with `%steps%`/`%lastDir%`/`%predict%`/`{count}` tokens leaking raw (`%lastDir%`, `undefined`, `NaN`, `null`) into the ticker, the note card, aria-labels or `title` attributes (the fuzz harness fails on ANY of these anywhere readable); Management drowning because bump/relabel lines all go through `api.say`; unbounded DOM growth from tags, bubbles, toasts, pocket icons or ticker history; `api.save.set('pocket', ...)` rejected because of a non-JSON value or an over-long string. Mitigation: single `fill(text, vars)` helper with defaults for every token and a final sweep that strips any leftover `%word%`, cap every list (stamps 16, effects 40, bubbles 4, pocket 7, ticker one line), keep ticker as the unlimited outlet and `sayM` rate-limited, only strings/numbers/arrays in `api.save`.

