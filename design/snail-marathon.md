# DESIGN BRIEF: SNAIL MARATHON (id `snail-marathon`, category `game`)

File to build: `games/snail-marathon.js` (single file, vanilla JS, <= ~1800 lines, obey SPEC.md section 5 and VOICE.md).
Module registration: `id:'snail-marathon'`, `title:'Snail Marathon'`, `tagline:'3,000 pixels. One per click. The finish line is very sorry.'`, `icon:'🐌'` (lobby card only; inside the module the snail is DRAWN IN CODE, never emoji), `category:'game'`, `unlockCost:0`, `tags:['clicker','race','patience']`.
CSS prefix: `m-snail-marathon-`. Stats prefix and achievement ids prefix: `snail-marathon.`.

This brief merges three pitches. The spine is the canvas "TrackCam" pitch (Gary exactly +1 px, loupe, events, interest). Borrowed from the others: the apology ladder, the Course ruler "The Course (7½ km)", the Reverse Marathon, the Bird, typing SALT, the Sponsor creep, Sandra's contradictory rules, the 7½ cm desk reveal, the per-lap new absurd rule. Cut as unbuildable or weak: Brian-the-slug as a 5th rival (folded into Turbo), the soup conversation (sandwich only), Tuesday-weekday date check, window-resize "fold" gag, the commentators' 4-minute dead-air bell mechanic (replaced by the cutout/plate state), rank-cycling rubber-band leaderboard of 6, prehydration gag (kept as ONE line, see Hydration), one-note-piano click-in-time montage scoring (kept but cosmetic and tiny).

---

## 0. DECISIONS THE BUILDER MUST NOT SECOND-GUESS

1. The finish line character is "the Finish Line" with a sticker nametag reading `PAT`. Speaker label in captions: `Finish Line`.
2. Distance model: `P` = player's progress in px (float, may be fractional via half-slithers, may go negative via reverse). `R` = displayed distance remaining. `R = 3000 - P + T` where `T` = total accumulated "courtesy retreat" (px). The Finish Line only ever changes `T` (and during set-pieces eases `T` to hit scripted R values). `R` floor before the ending is 1.0 (clamp by reducing T growth).
3. The BEAT clock (1..10) decides everything. `beat = max(beatByActiveSeconds, beatByPixels)`. Beat 10 is the "line stops" state; the ending needs ONE more click after beat 10 has fully settled.
4. Never idle time counts toward beats. "Active seconds" `A` only increments in a second when the last accepted-or-refused input was < 10 s ago (and the tab is visible).
5. Under `api.selftest`: active seconds advance 6x, idle thresholds are 30/90/180 -> 3/9/18 s, event gap 15-25 s -> 3-5 s, event fallback 15 s -> 3 s, hydration hold 2.0 s -> 0.4 s, montage 14 s -> 2 s, salt wait 3 s -> 0.6 s, steward wait 6 s -> 1 s, ending sequence step delays /4. The sock is forced once after beat 3 in selftest. Use ONE helper `T(ms)` that scales all durations.
6. All module narration goes through ONE helper `say(who, text, opts)` which (a) appends to the module's own caption strip (aria-live polite, capped at 8 lines) and (b) forwards to `api.say(text,{who,mood,priority})` ONLY when who is Management/Gerald/Sandra or opts.engine is true, and never more often than once per 4 s (drop the rest, they still reach the caption strip). Tokens `{player} {meh} {pace} {n}` are substituted by the module itself (use `api.player.name`, `api.meh()`), NOT left to the engine. A line must never contain `undefined`, `null`, `NaN`, `[object Object]`.
7. Gary is exactly 1 px ahead. Always. The ONLY exception is the 90 s idle beat (he walks back to stand beside the shell) and the beat-10 "field waits" moment where nothing changes for Gary (he stays +1). On any input after idle he returns to exactly +1 with no comment.

---

## 1. CONCEPT

You are a snail. The Snail Marathon is 3,000 pixels. One click moves you one pixel. The Finish Line is a polite, anxious banner on two poles with tiny code-drawn shoes, who wants you to arrive and keeps courteously being elsewhere. Four rivals (one is always exactly 1 px ahead, by contract), two commentators who are slowly losing the will to commentate, a hydration volunteer called Brenda who is always on "cup 7 of 7", a sponsor who keeps getting vaguer, and a montage that gains you exactly one pixel. A magnifying loupe lets you watch the one pixel happen. Management narrates it as the most thrilling event in arcade history and has no comparison data.

Tone: the broadcast of a sporting event that does not exist, delivered with total sincerity. Arc: normal -> weird -> bureaucratically unhinged -> strangely touching -> not-ending that resets like nothing happened (Lap 2 of infinity).

First joke within 10 s: cork starter pistol at t=0, with the line "The starter pistol is a cork..." fired automatically (see Lines L1). The player never needs a tutorial: the SLITHER button says what it does.

---

## 2. CAST

- **Management**: default narrator (api.say).
- **Hector Plume** (rigorous, tired) and **Maxine Dunmore** (warm, tells the sandwich story). Booth commentators.
- **Finish Line ("Pat")**: tiny shoes, bows 12 degrees when retreating, apologises.
- **Gary** (Moist-O-Matic -> "the concept of Gary" -> "Gary (Self-Funded)"): ALWAYS +1 px. Mustard headband.
- **Sheila Zoomerton** (Slow Lane Mutual): sine-wave overtaker. Racing visor.
- **Turbo**: a slug (no shell), "disqualified", under a tea towel, carrying on regardless.
- **Yesterday's You**: ghost snail at 45% opacity, placed at your saved best px (or 400 if none).
- **Brenda**: hydration volunteer. Cup 7 of 7.
- **Sandra from Compliance**: never seen, cited, stamps things PROVISIONAL.
- **Gerald (VP of Spuds)**: appears only at the ending (and fires the gun if `api.flag.get('metGerald')` is already true). Sets `metGerald` true when he presents the medal.
- **The Cricket**: the only real animated crowd member. Clicking it 7 times (cumulative across sessions) reveals it is sponsored.
- **The Missing Sock**: rare background jogger with a tiny map.
- **Clipboard Man**: collects Montage Debt (only if you skipped the montage with Esc).
- **The Steward**: tiny, clipboard, crosses the track.

---

## 3. SCREEN LAYOUT AND VISUAL DESIGN

### 3.1 Palette (matches the Lobby)
cream `#FFF4DC` page/sky base; ink `#2B2118` for ALL outlines (3px) and sticker shadows (`box-shadow: 4px 4px 0 #2B2118`); mint `#9BE0C4` slime/grass; coral `#FF7A66` finish line, flags, SLITHER button; mustard `#F2B93B` sun, medals, Gary; lilac `#C3A6F0` booth and sponsor boards; sky-blue `#BFE3F2` horizon band. Fonts: `ui-rounded, 'Trebuchet MS', system-ui, sans-serif`; numbers in `ui-monospace, Consolas, monospace` with `font-variant-numeric: tabular-nums`. Faint dotted-paper texture on the module root via `radial-gradient(#2b211822 1px, transparent 1.5px) 0 0/14px 14px`. Golden-hour overlay (beats 9-10): a DOM overlay div with `linear-gradient(rgba(242,185,59,.35), rgba(255,122,102,.18))`, `pointer-events:none`, opacity transition 3 s.

### 3.2 DOM structure (single column; at >= 900px px width the booth becomes a right side column of 300px)
```
root.m-snail-marathon-wrap
  .m-snail-marathon-score        4 tiles: DISTANCE TO FINISH | POSITION | SLIME | PACE  (+ small LAP chip, + units chip)
  .m-snail-marathon-main
    .m-snail-marathon-trackbox   position:relative
       canvas.m-snail-marathon-cam     (TrackCam; width 100%; aspect-ratio 16/6; min-height 200px; max-height 300px)
       .m-snail-marathon-overlay       (sponsor break / montage / rival intro cards / ending cards render here; absolutely positioned over the canvas)
       .m-snail-marathon-flash         (white flash for camera/speed camera, 120ms fade)
       .m-snail-marathon-gold          (golden hour overlay)
       .m-snail-marathon-loupewrap     canvas 96x96, border-radius 50%, 3px ink border, glare pseudo-element; absolutely positioned, follows pointer
    .m-snail-marathon-course            tiny SVG ruler "The Course (7½ km)" with a 1-px dot that never visibly moves
    .m-snail-marathon-booth             lilac box: Hector face, Maxine face, INTEREST meter (droopy eyelid bar), caption strip (aria-live polite, 8 lines max)
  .m-snail-marathon-controls
    button.m-snail-marathon-go  "SLITHER (1 px)"   giant, coral, full width at 360px, 72px tall, bounces 2px on press
    button  "Loupe" toggle (aria-pressed)
    .m-snail-marathon-slot      FIXED min-height 64px; event buttons appear here so layout NEVER shifts
  .m-snail-marathon-shelf       polaroids (max 5), tilted -4..4 deg
  .m-snail-marathon-kbd         visible kbd chips: Space/Enter slither, Z X alternate, L loupe, H sip, Esc skip montage
```
All emoji inside the module are decorative with `aria-hidden="true"`. Real `<button>` for everything interactive, so Tab order works and the fuzz harness finds them.

### 3.3 TrackCam canvas (one canvas; DPR-aware; world drawn at 1 world px = 1 css px)
- Size: on mount and on resize, `cssW = clientWidth`, `cssH = clamp(cssW*6/16, 200, 300)`; `canvas.width = round(cssW*dpr)`, `canvas.height = round(cssH*dpr)`; `ctx.setTransform(dpr,0,0,dpr,0,0)`. If `cssW < 10` skip the frame (hidden/zero-size guard).
- Snail pinned at `snailX = 0.32*cssW` (screen), centre lane. Camera world x = `P - snailX`. Everything world-anchored is drawn at `screenX = worldX - P + snailX`.
- Five lanes, top to bottom: 1 Sheila, 2 Gary, 3 YOU, 4 Turbo, 5 Yesterday's You (ghost, alpha .45). Lane height `laneH = (cssH - 40)/5` (40px at the bottom reserved for the ruler strip).
- Draw order: sky -> sun (mustard disc, slow wobble) -> hills (sky-blue, parallax 0.2x) -> sponsor boards on the hedge -> hedges (0.5x) -> crowd row (14 grey cardboard cutouts + the Cricket) -> track bands (alternate mint/darker mint stripes) -> grass blades (1.0x, seeded pseudo-random so deterministic: `mulberry32(1234)` independent of api.rand) -> ruler strip (ticks every 2 px short, every 10 px long, scrolls 1.0x) -> mile marker signs -> salt patch/cup/cabbage/steward event props -> slime polyline (last 600 stored points) -> rivals -> YOUR snail -> Finish Line -> weather (<= 30 rain streaks) -> montage dim -> overlay text.
- **Snail (code-drawn)**: foot = rounded body path (mint-tinted `#C8E8B0` body with ink outline 3px), two eyestalks wobbling with `sin(t)` and drooping when no input for 3 s, shell = spiral of 3.5 turns drawn with arcs (angle*radius ramp) in coral with ink outline, shine highlight (white arc, alpha .6). States: normal, `damp` (shine overlay after successful sip), `withdrawn` (shell closed, tiny drifting z particles), `goggles` (spam tier 3), `sweat` (In Rhythm, 3 beads), `shake`. Squish on slither: `scaleX 1.12 / scaleY .9` for 90 ms, eased.
- **Rivals**: same snail routine with `{shellColor, hat}`: Gary mustard shell + headband; Sheila lilac shell + racing visor; Turbo drawn WITHOUT a shell as a slug plus a tea towel draped over him (small check pattern); Yesterday's You in alpha .45 with a sleepy droop. Label chip above each rival (name + current sponsor). Gary's chip reads `GARY +1`.
- **Slime trail**: polyline of stored world points (push a point per full px of forward progress, `shift()` when > 600). Mint `rgba(155,224,196,.85)`, width tapering from 5 (near snail) to 1 (oldest), then a white highlight stroke offset up 2 px at alpha .5.
- **Finish Line**: coral banner on two ink poles, checkered top (draw 8x2 alternating squares), TINY SHOES at the pole bases (two small ink ellipses that alternate when it moves), a worried face on the banner (two dots + wobbly smile arc), `PAT` nametag sticker. Screen x = `snailX + 36 + R` (nose offset 36 px) when that is < `cssW + 40`; otherwise it is OFF-SCREEN and a coral right-edge pennant arrow reads `FINISH ->  {R} px`. Retreat: animate `T` change over 400 ms (ease-out), shoes tap, poles bow 12 degrees; small speech bubble (see Lines L8 "bubbles"). Lap >= 2: sign under it reads `Back soon (always)`.
- **Mile markers**: wooden signs every 100 px of P (world x = 100k): `KM 0.0000013`, `KM 0.0000026`, ... computed `k*0.0000013` formatted with 7 decimals. Bell sfx when passed.
- **Crowd**: 14 cardboard cutouts (grey rounded rects with a smiley, slight lean) and ONE real cricket: a tiny hopper with two stick arms that claps (one clap at the gun, moderate cheering on events). Cricket hit-test radius 14 px for clicks.
- **Sponsor boards** on the hedge: Moist-O-Matic (lilac), Slow Lane Mutual (mint), Gary Inc. (mustard). Text changes by beat (see Sponsor creep).
- **Weather**: drizzle for 12 s, <= 30 diagonal streaks, hero lighting (a warm rim light on the snail).
- **Parallax for reduced motion**: parallax layers frozen (they still translate with P in steps), no bow (replace by a speech bubble "(bows)"), no camera shake, no confetti beyond 20 pieces.

### 3.4 LOUPE (the core pleasure)
Second canvas 96x96 css (`width/height` attributes = `96*dpr`), shown over the track. Draw with `imageSmoothingEnabled = false`: `ctx.drawImage(mainCanvas, sx, sy, sw, sw, 0, 0, 96*dpr, 96*dpr)` where `sw = 8*dpr` (8 css px square -> 12x zoom), `sx = (focusX - 4)*dpr`, `sy = (focusY - 4)*dpr`, with focus clamped to inside the main canvas. HARD GUARD: if `sw <= 0` or the main canvas has zero size, skip (drawImage with zero source size throws). Focus follows the pointer on the track (mouse), or sits on the snail's foot/slime tip (touch, `L` key, or Loupe button). Long-press 400 ms on the track pins/unpins it over the snail. Loupe toggle button has `aria-pressed`. The loupe shows: the snail's foot, Gary's 1-px lead, the slime pixel, the scrolling ruler ticks. The loupe auto-opens by itself for the FIRST click only (with a trumpet sfx 'fanfare' short) and auto-closes after 6 s unless the player pinned it.
Fractional positions (the 7½ half-slither) render as visible half-pixel blur in the loupe. This is a feature.

### 3.5 Booth faces (CSS)
Two circle heads (cream, 3px ink), two eyes each with an eyelid pseudo-element whose height is driven by CSS var `--lid` (0% open -> 60% closed) set from INTEREST: >= 60 open; < 60 `--lid:35%` (half-lidded); < 30 `--lid:55%` and a "chin cradle" (a small rounded rect hand under the chin); at 0 the faces are replaced by: a cardboard cutout of Hector (caption "wow"), a `BACK AFTER LUNCH` sign, and a paper plate. A rotated rounded-rect mic per head. Maxine has a sandwich icon (CSS: two beige rounded rects with a green wiggly line) that grows by one layer per sandwich beat; clicking the booth sandwich says "Please don't." (rare gag, Lines L16).

### 3.6 Responsive
360px: single column, SLITHER full width, score tiles 2x2, booth under the canvas, polaroid shelf wraps. >= 900px: `.m-snail-marathon-main` becomes a 2-col grid (canvas 1fr, booth 300px). Canvas never exceeds 300 css px tall. No horizontal scroll at 360px.

---

## 4. CORE MECHANICS

### 4.1 Inputs (exact)
| Input | Effect |
|---|---|
| click/tap on track canvas, on the snail, or on the SLITHER button | +1 px. Use `pointerdown` (so no 300 ms tap delay; set `touch-action:manipulation` on canvas and button, `preventDefault` on canvas pointerdown). On the SLITHER BUTTON use `click` for keyboard-origin activation only: dedupe so one physical press never counts twice (see Risks #3). |
| Shift-click or Alt-click | +0.5 px ("Elegant Half-Slither"). |
| Space or Enter (keydown, NOT on a focused event button) | +1 px. `e.repeat` is IGNORED. First ignored repeat says line L21 ("Held keys count as one click..."), thereafter every 10th ignored repeat. |
| Z then X alternately | +1 px each; alternation builds a cosmetic "Elegance" ring around the snail (max 8 segments, resets if the same key is pressed twice). |
| L | toggle loupe at the snail. |
| H (or Space/Enter held on the focused Hydration button) | hold to sip (see Hydration). |
| Esc | skip montage if one is running, else says L21b once ("Escape is not available...") then silent. |
| Left Arrow | -1 px backward (Shift+Left = -0.5). Ignored while Shell Inspection is active (arrows tilt the shell then). 20 consecutive Left presses with no other input in between triggers the Reverse Marathon secret. |
| Right Arrow | same as slither unless Shell Inspection is active (then it tilts the shell). |
| Hover track | loupe follows pointer. |
| Long-press 400 ms on track (touch) | pins loupe over snail until the next long-press. |
| Click booth sandwich / cricket / sock / Sheila's face | gags. |

All handlers ignore events whose target is an `input`, `textarea` or `[contenteditable]`. Register the key handler with `api.on(document,'keydown',h)` and bail out if `!root.isConnected`. Do not `preventDefault` on keys other than Space/Enter/arrow keys when they do something.

### 4.2 The slither pipeline (`doSlither(amount, src)`)
```
note click timestamp (for spam window, rhythm, pace) -- EVERY attempt counts, accepted or refused
stat clicks += 1
idleReset()
refusal = currentRefusal()   // first match:
  ending lock (ending sequence running)        -> ignore silently
  montage running                              -> not a slither; montage pulse handling instead
  sponsor break active                         -> 0 px, button shakes, no line (the SKIP SPONSOR button is the only live control)
  sip in progress                              -> SPILL: 0 px, ring resets, line L12 spill, stat spills++
  salt patch active AND snail on patch         -> 0 px, snail shrieks (tiny voice), sad sfx, line (rate-limited)
  steward crossing                             -> 0 px, steward tuts
  bird shadow active                           -> snail retracts 3 s, 0 px
  withdrawn (idle shell)                       -> wakes up instead (see Idle), 0 px
if refusal: react, update spam detector, return
P += amount; stat pixels += amount (forward only, integer part counted)
push slime point; squish; float "+1 px" pop (cap 6 floats live); sfx rotate blip/tick
courtesy: if floor(P/25) advanced -> retreat step (see 4.3), award 0.05 Meh (api.award, reason 'Slime')
every 100 px -> mile marker: bell, line, apology ladder rung, +0.2 Meh? (no: just the 25 px award)
rhythm detector update; interest refill if In Rhythm
beat checks, Gary +1, rank/overtake checks, secrets checks (7.5 exact, bird 1/250, etc.)
```
Rate-limit chatter: a line on a click is rolled with weights: 82% nothing, 8% commentator remark, 5% rival remark, 5% finish-line "bubble" only. Never the same line twice in a row per speaker (shuffle bags).

### 4.3 The Polite Finish Line (retreat model, buildable)
Efficiency table `EFF[beat]` for beats 1..10: `[1.0, 0.9, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05, 0]`.
Every time `P` crosses a multiple of 25 going FORWARD (track `lastRetreatBucket`), the line retreats: `step = round(25*(1-EFF[beat]))` px (beat 2 => 2 px, matching "I have shifted 2 pixels"). `T += step` (clamped so `R >= 1.0` before beat 10). Animate 400 ms. If `step > 0` show a bubble (bubble pool, L8a). Each 100 px mile marker ALSO fires the next rung of the Apology Ladder (L8) through `say('Finish Line', ...)` (rungs never repeat; after the last rung draw from the filler pool).
Going backward (Left Arrow) never reduces T. `R` grows by 1 per backward px (the line is "following at a respectful distance", say L26).
Scripted overrides:
- Beat 9 start: the Finish Line decides to "come in a little closer" and eases `R` to 12.4 over 6 s (retarget `T`), then flickers 12.4 -> 12.5 -> 12.4 every 4 s (cosmetic offsets applied to the displayed value only, never to P). The Finish Line also has a visible sigh (bubble `(sighs)`).
- Beat 10 reached: eases R to exactly 1.0 over 3 s, stops bobbing, shoes together, trembling (canvas jitter 1 px). R reads `1.0 px` (units revert to px). Only after the ease completes does `endingReady = true`.
Display unit chip and conversion (`units` var, changes at beat 8): `px` (R), `snail-lengths` (R/24, label "snail-lengths"), `Tuesday-adjacent` (R/180, label "Tuesday-adjacent"). Always one decimal, always via `fmtDist(R)` which returns `'0.0'` for non-finite input. At beat 8 start -> snail-lengths; 40 s of active time later -> Tuesday-adjacent; beat 10 -> px. Lap >= 2: snail-lengths from the start of the lap.
Progress percent is NOT shown (cut), the DISTANCE tile and the mini ruler are enough. The ruler dot is a 1-px dot at `P/3000` along a 300-px SVG line; it never visibly moves, and a caption under it reads `The Course (7½ km)`.

### 4.4 Score tiles
`DISTANCE TO FINISH` (big monospace, one decimal, e.g. `2,994.0 px`), `POSITION` (`5 of 5`), `SLIME` (`P` forward px travelled this lap, one decimal if fractional), `PACE` (px/s over the last 5 s, one decimal). LAP chip: `LAP 1 OF INFINITY` (from lap 2: `LAP 2 OF INFINITY`).

### 4.5 In Rhythm
Keep the last 8 click intervals (accepted clicks only). If `stddev < 0.15*mean` and `mean` between 150 and 2000 ms: `inRhythm = true`: snail shows sweat-bead shimmer, a soft `tick` metronome on each click (alternate 'tick' sfx), INTEREST refills +0.5 per click. Rhythm gives NO extra pixels. A streak of 8 consecutive in-rhythm clicks while the booth is empty (interest 0) brings Hector and Maxine back (L15). First time ever: say L14.

### 4.6 Meh and stats
- `api.award(0.05)` per 25 px forward (batched with the retreat step). Consolation Meh 0.1 when overtaken (max once per 8 s). Sip +1, Sponsor skip early +0.2 ("Brand Loyalty"), cabbage 0, interview 0.1, shell approved 0.3, memo dismissed 0.05, montage +1, mile marker 0.2 (every 100 px), achievements via engine reward, crossing +5, speed-camera 0 (fined: `api.award(-0.1)` clamped by engine), reverse marathon +4, SALT silence +1, sock whisperer via achievement. Steady play must stay around 1-3 Meh per minute.
- Stats (all via `api.stat.inc`): `snail-marathon.pixels`, `.clicks`, `.sips`, `.spills`, `.overtaken`, `.laps`, `.montages`, `.spam`, `.apologies`, `.polaroids`, `.reversed`, `.socks`, `.crickets`, `.idle_events`.
- `api.save` keys: `bestP` (max P reached in a lap, drives Yesterday's You), `socks`, `crickets`, `laps`, `cheeseSeen`, `club7half` (true after the 7½ Club ceremony).

---

## 5. RIVALS

Positions are relative to P so nothing can run away: `rivalX = P + offset(t)`.
- **Gary**: `offset = 1` exactly, always (see Decision 7). Chip `GARY +1`.
- **Sheila**: `offset = 38*sin(2*pi*t/80 + phase)`. She overtakes you (offset crossing from negative to positive) about every 40 s. Detect overtakes by sign change with 8 s cooldown: trigger `whoosh` sfx, a swoosh streak on canvas, Hector/Maxine overtaken line (L10), +0.1 Meh Consolation, interest +12, stat `overtaken`. Maxine mis-sees it.
- **Turbo**: `offset = 14 + 3*sin(t/3)`. The rank board PINS him in 3rd place with a DQ stamp regardless of position (cosmetic joke, board is a tiny list under the score tiles; the numeric POSITION tile counts only Gary, Sheila, Yesterday's You and Turbo by actual x).
- **Yesterday's You**: world x fixed at `bestP` (saved) or 400 if none, never moves (it did not sleep). When the player passes it, one line (L11).
- POSITION tile = `1 + count of rivals with x > P`. Gary guarantees you are never better than 2nd; expect 5 of 5 early and sometimes 4 of 5.
- Beat 9 (20 s window): all rivals "sync-click": they adopt your exact click timestamps with a cello sfx (`ding` pitched low is acceptable) and sweat beads. Beat 10: rivals stop moving ("waiting"); Gary stays +1.
- Rival intro cards (beat 2): overlay cards slide in one by one (4 cards x 2.4 s, skippable by clicking the overlay, auto-clear at 12 s fallback). Each card = name, sponsor banner, one line.

---

## 6. COMMENTATORS AND INTEREST

- INTEREST 0..100 starts at 100, drains 1 per second, refills: In Rhythm clicks +0.5, event completed +10, overtaken +12, mile marker +8, sip +10, 8-click rhythm streak when empty = full return to 60.
- Lines are chosen by tier: >= 70 rigorous (L5), 40-69 drifting (sandwich/lunch), 10-39 personal admin, 1-9 almost gone, 0 gone (cutout, sign, plate, cricket only). A commentator speaks roughly every 10-14 s when interest > 0 (via the scheduler's `chatter` timer), sandwich bits take priority when interest < 60.
- SANDWICH ARC (counter `sandwich` 0..3): first mention when interest first < 90 AND A >= 80 ("unrelated, remind me"); returns each time interest drops below 60/40/20 (sandwich 2, 3: "upset about the first"). It is interrupted by events up to 4 times (L16b). Re-engaging with rhythm makes her drop it (L15). Payoff in Lap 2: "The sandwich was cheese." / "I know." (L40, `cheeseSeen` saved). Idle 180 s book club: Maxine asks to join and tells the sandwich and is asked to leave (L35).
- At interest 0: booth shows the cutout; commentary stops; only the cricket claps now and then. 15 s later Management comments (L5d).

---

## 7. EVENTS (12 types, scheduler)

### 7.1 Scheduler
Shuffle bag of the 12 event types (`api.shuffle`), one every 15-25 s of ACTIVE time (`api.randInt(15,25)`), never the same type twice in a row, never while another event or set-piece is active, never during idle >= 30 s, never during the first 50 s (beats 1-2 are scripted), never when `endingReady`/ending. Each event has `start()`, `finish(result)` and a 15 s fallback timeout that resolves it automatically (cleared on finish, via api.setTimeout). Only ONE interactive control occupies `.m-snail-marathon-slot`. Beat gating: Photo Finish, Weather, Tangent, Memo, Interview, Cabbage from beat 3; Hydration (scripted #1 at beat 4), Sponsor Break (scripted #1 at beat 5), Salt Patch, Steward, Shell Inspection from beat 4; Sock Sighting is the rare one: after beat 3, each scheduler tick has a 1 in 14 chance (forced once per selftest run).
After an event completes: `interest += 10`, `api.award(small)`, `api.stat.inc` as listed.

### 7.2 The twelve
1. **Hydration Station**: a cup of dew icon appears trackside (canvas) and `HOLD TO SIP` button with a progress ring appears in the slot. Hold 2.0 s (pointerdown on the button, or key H, or Space/Enter held on the focused button; ignore repeat events, track keyup/pointerup/pointerleave/blur to cancel). ANY slither during the hold = spill (ring resets, L12, stat spills). Success: ring completes -> "Hydration 100%" (L13), +1 Meh, snail becomes damp (shine overlay stays until the next lap), droplet glitter. Cups are numbered and Brenda insists on `cup 7 of 7` (`cup 7½ of 7` once the 7½ Club has been joined). Scripted #1 at beat 4 start (+10 s): first time asks you NOT to click. Fallback: after 15 s the cup is quietly "removed and re-posted ahead for your convenience" (L13b). Stat `sips` on success. Prehydration gag: if the very first sip happens at P < 1: L13c.
2. **Sponsor Break**: full-width overlay ad on the track (Moist-O-Matic etc., lilac card with a fake product illustration made of CSS shapes) with a `SKIP SPONSOR (5)` button in the slot (counter shows remaining clicks). Needs 5 clicks, those clicks do NOT move the snail; SLITHER is disabled (aria-disabled) during the break. Skipping before the 10 s ad timer ends = Brand Loyalty +0.2 Meh. Ads from L18. Fallback 15 s.
3. **Salt Patch**: a white-speckled patch appears 60 px ahead; the snail walks onto it automatically? NO: it appears AT the snail ("the salt is under you"), a stewards' flag waves, a shaker is drawn above. Any click for the next 3 s = shriek in a tiny voice, 0 px, `sad` sfx, rate-limited line. After 3 s the patch is swept away ("The salt is thinking about it"). Clicking does NOT extend the wait. (Simplification of the pitch: no walking onto it.)
4. **Shell Inspection**: the shell tilts to a random angle (+/- 20 to 45 degrees). Drag the shell (pointer drag on the snail horizontally maps to angle) or arrow keys / two real buttons `Tilt <` `Tilt >` in the slot (each +/- 4 degrees; hold repeats are fine here) until `abs(angle) <= 3`. Steward stamps APPROVED (stamp sfx + ding), +0.3 Meh. Fallback: after 15 s the steward "approves it as found" (L19c).
5. **Cabbage Snack**: a cabbage leaf arrives (green polygon with veins). Slot button `HOLD TO NIBBLE` (1.0 s hold). Success: sparkle, "+0 pixels but +1 pride" (L20), counts as a completed event. Slithering during the nibble just cancels it (no penalty, no spill count).
6. **Photo Finish Camera**: flash overlay fires randomly, snapshot of the snail drawn into a small polaroid (use `drawImage` of a 120x90 crop of the main canvas onto a new 120x90 canvas, NOT `toDataURL`), pinned to the shelf with a random tilt and a caption from L22. Cap 5 (remove the oldest). Stat `polaroids`. No interaction. After the Sock Whisperer achievement the camera photographs the sock instead (caption "Photo: the sock. The sock is not in the photo. The photo is of the sock's absence.").
7. **Weather**: drizzle for 12 s. Slither is the same, but rain looks heroic and the cello sfx plays (one low `ding`). Lines L23. No interaction.
8. **Rival Interview**: Sheila's tiny face appears in a bubble in the slot as a button. Clicking answers "no comment" in one of 6 ways (L24), +0.1 Meh. Fallback 12 s: she leaves "no comment" unprompted.
9. **Commentary Tangent**: the hosts drift (sandwich gag or other L5 mid-tier bits), INTEREST dips by 15. No interaction. 8 s.
10. **Finish Line Memo**: sticky-note UI in the overlay corner with a `Dismiss` button in the slot. Notes escalate in formality in order (L25). +0.05 Meh when dismissed. Fallback 15 s: memo "dismisses itself, formally".
11. **Sock Sighting (rare)**: a sock jogs across the background crowd (canvas, 6 s) carrying a tiny map. Click it within 5 s (hit radius 20 px): it does not stop, line L38a. Counts toward the cumulative 3 for `snail-marathon.sock` (save `socks`, stat `socks`). Achievement at 3 (see section 11).
12. **Security Visit**: a tiny steward with a clipboard walks in front of the snail and across the track (6 s, canvas). Slithers during it = 0 px with a tut. Beat 8 version asks for the timing chip (L30). Cuter and shorter sibling of the salt patch.

### 7.3 Montage (scripted at beat 7, +10 s; also an optional repeat event in later laps at 5-minute spacing)
Management announces "a moment of inspiration" (L28). The track dims (overlay), piano sincerely starts (sequence of `ding` sfx as a one-note piano, one every 1.2 s), pulses ring across the overlay at 4 timed moments (circles shrinking toward a target); clicking each pulse in time is cosmetic (result always "Excellent" or "Excellent (Lower)"), a sunrise (mustard circle rising behind the hedge), slow motion (snail drawn at 0.3x speed), text `BELIEVE`, then captions (L28b, 6 of 14 from a shuffle bag, one every 2 s). Duration 14 s (selftest 2 s). At the end: exactly +1 px, +1 Meh, stat `montages`, "Montage: end" line. Esc/skip button (`Skip montage`, real button in the overlay) cancels: `montageDebt += 1`, line L28c; a Clipboard Man arrives at the next Steward visit or at beat 8 start (L29) and collects it (debt 0, stat none, +0 Meh). Fuzz-safe: montage always ends by timeout.

---

## 8. TIMELINE / STATE MACHINE (BEATS)

`beatByTime` thresholds in ACTIVE seconds: `[0, 20, 50, 80, 120, 180, 270, 360, 450, 540]` (beat 1..10). `beatByPixels` thresholds in P: `[0, 15, 100, 200, 350, 550, 800, 1100, 1450, 1700]`. `beat = max(both)`, never decreases within a lap. Lap >= 2: both threshold sets are multiplied by 0.5.

| Beat | Name | What happens (scripted one-shots fire once per lap unless noted; all lines in section 13) |
|---|---|---|
| 1 | THE GUN (0:00-0:20) | t=0 cork pistol pops (confetti n=4, `pop`). If `api.flag.get('metGerald')`: Gerald fires it ("Ready. Steady. Potato."), else Management "a potato was supposed to be here". Hector and Maxine welcome you from a booth the size of a toaster. Management intro line. First click: "You have moved 1 pixel", loupe opens by itself with a trumpet, cricket claps once. Finish Line is a quiet banner far off to the right (off-screen pennant). |
| 2 | THE FIELD (0:20-0:50) | Rival intro cards slide in one at a time. Gary overtakes you by exactly 1 px "and stays there forever". Position 5 of 5 (podium is a coaster). First Consolation Meh. |
| 3 | THE FINISH LINE HAS MANNERS (0:50-1:20) | Retreat steps now every 25 px at EFF 0.6. First mile marker (KM 0.0000013) at 100 px: line steps back and apologises (Ladder rung 1). Net progress visibly ticks down then up. Events begin (soft ones only). |
| 4 | HYDRATION STATION (1:20-2:00) | Scripted Hydration #1 with Brenda, "cup 7 of 7". Salt/Steward/Shell join the bag. |
| 5 | THE COMMENTATORS DRIFT (2:00-3:00) | INTEREST sagging. Sandwich story begins. Scripted Sponsor Break #1 (5 clicks that do not move you). Sheila overtakes with a whoosh. First Salt Patch is pushed to the front of the bag so "three different do-not-slither rules" are learned. |
| 6 | THE MIDDLE (3:00-4:30) | Turbo revealed in 3rd despite disqualification (board pin). Shell Inspection pushed to front. Memos become formal ("Re: my position"). First polaroid. Gary's sponsor becomes "the concept of Gary". |
| 7 | THE MONTAGE (4:30-6:00) | Scripted Montage (see 7.3). |
| 8 | BUREAUCRATIC UNHINGED (6:00-7:30) | Sandra flags the Finish Line for relocating without Form 27B/6; it files Form 27B/7. Units mutate px -> snail-lengths -> Tuesday-adjacent. Security Visit asks for your timing chip. Hosts read the terms of service of the booth. Clipboard Man collects Montage Debt if any. |
| 9 | EXISTENTIAL SPRINT (7:30-9:00) | R eases to 12.4 then flickers. Rivals sync-click (cello) for 20 s. Brenda returns with cup 7 of 7 and says she believes in you "which she was not supposed to". Sky goes golden for no reason. Everyone is in rhythm. Quietly overwhelming. Events are suspended except the Hydration return. |
| 10 | THE LINE STOPS (9:00-end) | Rivals stop and wait; Gary says go on. Finish Line stops stepping back, trembles, shoes together, R = 1.0 px. The next click closes it (the SLITHER button is enlarged and glows, label just `SLITHER`). See section 12. Forced to happen at A >= 600 s or P >= 1800 whichever is first (beat 10 states start at 540 s/1700 px, the forced ending at 600/1800 at the latest). |

Scripted one-shots use `api.setTimeout` through a tiny queue `script(fn, delay)` so everything is cleared on destroy. Tracking of fired scripted beats lives in a `fired{}` map reset each lap.

---

## 9. IDLE AND SPAM

### 9.1 Idle (real seconds without any input in root; paused while the tab is hidden; selftest thresholds /10)
- **30 s**: Management notes the stop and times it (L31). No new events start while idle >= 30 s; the current event runs out.
- **90 s**: snail withdraws into its shell (shell closes, tiny `z` particles), the hosts say "we're still live" (L32), Gary walks back through the whole field (tween 6 s) to stand beside your shell and says nothing (L33), the Hydration station flashes a cup nobody drinks (canvas cup blink, slot empty).
- **180 s**: the rivals form a book club (small chairs and a tiny table on canvas), Maxine asks to join, tells the sandwich, is asked to leave (L35). Achievement `snail-marathon.idler` (Lord High Archdeacon of Idling). +3 Meh. Stat `idle_events`.
- ANY input ends idle: snail pokes out, Gary tweens back to exactly +1 within 600 ms with NO comment, chairs fade, book-club ends. The first click after idle 90+ does not count as a slither (it wakes the snail).

### 9.2 Spam (sliding windows over ALL click attempts)
- **>= 12 clicks in 1 s** (cooldown 20 s): Stewards "request that you click like you mean it, but gently" (L36a). Speed lines on canvas.
- **>= 18 clicks in 1 s** (cooldown 20 s): speed camera flash (white overlay 120 ms fade, shutter sfx `pop`), fine of 3 px (`T += 3`, i.e. R +3, snail shakes 400 ms, never P), line L36b, stat `spam` +1, achievement `snail-marathon.spammer` (Supreme Overlord of Frantic Clicking). `api.award(-0.1)`.
- **>= 30 clicks in 3 s** (cooldown 60 s): snail sprouts racing goggles for 10 s, siren (`buzz` sfx twice), Management reads a three-sentence fake incident report about "unauthorised velocity" (L36c, three lines 2.5 s apart).
- **Held keys**: ignored; line L21.
- Multi-touch: cap 3 accepted slithers per 50 ms.

---

## 10. SECRETS AND RARE EVENTS (all must be implemented or explicitly listed in the cut order, section 16)

1. **The 7½ Club**: Shift/Alt-click gives +0.5. If `P` lands on exactly 7.5 (check after each move with `Math.abs(P-7.5)<1e-9`) -> trackside ceremonial curtain appears (canvas), rivals salute (hats lift), L37, achievement `snail-marathon.club`, save `club7half=true` (cups now read "cup 7½ of 7"). In Lap 2+, landing on 7.5 again summons Gerald in a hat (L37b).
2. **The Missing Sock** (event 11) and the card: after the 3rd cumulative sock click the sock leaves a tiny note at the finish line (L38b), polaroids photograph the sock, achievement `snail-marathon.sock`.
3. **Cricket clicks**: click the cricket 7 times (cumulative, save `crickets`): it drops a card that reads `I was always the crowd.` (L39), sponsor revealed as "Cricket (sponsored by someone)". Achievement `snail-marathon.cricket`.
4. **Reverse Marathon**: 20 consecutive Left Arrow presses (or 20 clicks on the small `WRONG WAY` sign hidden in the weeds/ hedge on canvas, hit radius 16 px). Moves you backward 1 px per Left press. Finish line follows as chaperone (L26). At P = -100 the smaller starting gun fires (clamp P >= -100). At exactly P = -7.5 (needs Shift+Left half-steps) say L26b once. First time it triggers: +4 Meh, stat `reversed`, achievement `snail-marathon.reverse`.
5. **The Bird** (rare, 1 in 250 forward slithers, never during events, montage, ending, or idle): a bird shadow glides across the lane for 4 s; everyone freezes mid-word (booth faces freeze, rivals pause). If the player clicks during it: snail retracts for 3 s (L40a). If the player does NOT slither/press anything for the 4 s: Hector "We did it, Maxine. We were all so still." (L40b), achievement `snail-marathon.bird`, then a 6 s commemorative song with sung captions (two `fanfare` sfx; L40c). Fires at most once per 3 minutes.
6. **SALT**: typing the letters S, A, L, T consecutively (keydown, any target outside inputs) makes every snail recoil, the sponsor Tarmac-Free Salt Alternative wail as a caption, L41, then a solemn 7.5 s moment of silence (all sfx off via a local flag, canvas dimmed, tiny candle drawn on the track). +1 Meh, no achievement. (If L is the loupe key it will toggle once; accepted.)
7. **Long idle** and **spam** tiers: section 9.
8. **The Idle Finish Line** variant is cut (idle is covered by Gary and the book club).
9. **Management cracks** (rare, touching, beat 10 and Lap 2): lines L34.

---

## 11. ACHIEVEMENTS (declare with `P.addAchievements`, ids exactly as shown, `icon` emoji, rewards 1-50)

| id | name | desc | secret | reward | unlock |
|---|---|---|---|---|---|
| `snail-marathon.millimetre` | Grand Magister of the First Millimetre | Travel 100 pixels. The certificate calls this "a distance". The certificate is a coaster. | no | 2 | P >= 100 first time |
| `snail-marathon.hydration` | Hydration Laureate of the Realm and Adjacent Realms | Successfully sip 3 cups of dew without moving. Brenda attends the ceremony from a small distance. | no | 4 | stat sips >= 3 |
| `snail-marathon.slowlane` | Knight Commander of the Slow Lane (Honorary) | Be overtaken by Sheila Zoomerton 5 times. Each overtaking is described in your file as "a team effort". | no | 3 | stat overtaken >= 5 |
| `snail-marathon.almost` | Her Majesty the Perpetual Almost | Get within 1.0 px of the finish line before it politely leaves. It sends a card. | no | 5 | beat 10 settles at R = 1.0 |
| `snail-marathon.provisional` | Provisional Champion of Infinity | Cross the finish line. Sandra has marked it PROVISIONAL. | no | 8 | first crossing |
| `snail-marathon.montage` | Imperial Witness to the Inspirational Montage | Watch the entire montage without skipping. You gained one pixel. It was worth it. | no | 3 | montage completes unskipped |
| `snail-marathon.idler` | Lord High Archdeacon of Idling | Do nothing for 180 seconds while the rivals hold a book club. The book club has been praised in the minutes. | YES | 6 | 180 s idle |
| `snail-marathon.spammer` | Supreme Overlord of Frantic Clicking | Click so fast the speed camera flashes. You have been fined 3 px by a snail with a cap and a ticket book. | YES | 6 | 18+ clicks in 1 s |
| `snail-marathon.club` | Founding Half-Member of the 7½ Club | Land on exactly 7.5 pixels. The Club is a half. It meets in the middle of the floor. | YES | 10 | secret 1 |
| `snail-marathon.sock` | Sock Whisperer, First Class | Click the Missing Sock 3 times across sessions. It still has no comment. | YES | 7 | secret 2 |
| `snail-marathon.bird` | Hero of the Bird Incident (Unsung, Then Sung) | Stay perfectly still while the bird passes. It saw nothing. You were magnificent. | YES | 8 | secret 5 |
| `snail-marathon.reverse` | The Reverse Marathon of Eternal Retreat | Walk backward 20 steps in a row. Compliance has thoughts. | YES | 6 | secret 4 |
| `snail-marathon.cricket` | Friend of the Crowd (Singular) | Click the cricket 7 times. It was always the crowd. | YES | 5 | secret 3 |

(>= 6 achievements, 8 secret.) Unlock via `api.achieve(id)` at the triggers above. Do not rely on `check()`.

---

## 12. THE NOT-ENDING (exact sequence)

Trigger: `beat >= 10`, `endingReady`, and ONE click (any accepted slither). The SLITHER button is enlarged (scale 1.12) and glows, label `SLITHER`. Everything below is `script()`-queued and cleared on destroy; the sequence ignores input except its own `Continue` button; delays shortened under selftest.
1. t=0: crossing: P += 1, R reads 0.0 briefly. Gun pop, `tada` sfx, `api.confetti(undefined, undefined, 120)`, the whole booth stands up (faces jump, hands up), crowd cutouts bounce, line L42a.
2. t=2 s: Gerald, Vice President of Spuds, rolls in (a potato with a hat and a ribbon, drawn in code, on a tiny cart) to present the medal (a bottle cap on a ribbon). He delivers the profound-but-wrong chips speech (L42b). `api.flag.set('metGerald', true)`.
3. t=6 s: Management reads the official time as `10:03.4` ("a time") regardless of actual time (L42c). `api.award(5, 'Crossing')`. `api.stat.inc('snail-marathon.laps')`.
4. t=9 s: Sandra's stamp lands: PROVISIONAL (big red-ink rubber stamp animation + `stamp` sfx), reason: the timing chip was a coaster (L42d). Achievement `snail-marathon.provisional`.
5. t=12 s: a tiny sticker on the finish line peels and reveals another: START. The Finish Line puts on a different hat (a new hat each lap from a list of 6: top hat, party hat, chef hat, tiny crown, traffic cone, nothing-but-a-bow), bows, and has already moved. Lines L42e. Optional pull-out reveal (skip if over budget): the camera pulls out and the track scales down to reveal a ruler and a coffee ring: `Course length: 7½ cm. Measured by S. (Compliance)`, then L42f.
6. t=15 s: `Continue` button (`Begin Lap {n+1}`) appears in the slot; clicking it or waiting 20 s starts the next lap.
7. Lap reset: P=0, T=0, R=3000.0, beat/active-seconds reset (but lap number ++), distance tiles reset, slime cleared, Yesterday's You moves to `bestP`, Gary +1, interest to 100, polaroids stay, damp removed, hosts return refreshed (L40: sandwich cheese payoff, only the first time or each lap with a variation), the Finish Line has the sign `Back soon (always)` and says Terribly sorry (L43).
8. Each subsequent lap swaps in ONE new absurd rule (rule index = `(lap-2) % 6`; announce with Management line L44):
   - Lap 2: course units are snail-lengths from the start.
   - Lap 3: rivals swap sponsors (Gary becomes "Gary (Self-Funded)", Sheila "Sheila (Pending)", Turbo "a tea towel").
   - Lap 4: the hydration station moves to the left side (mirror the slot/cup layout and the cup is drawn behind the snail).
   - Lap 5: the track gets a banked turn that does nothing (canvas track bands drawn along a gentle sine tilt; no gameplay change).
   - Lap 6: the rivals face backward but still go forward.
   - Lap 7: spam thresholds are doubled but fines are doubled too ("equity").
   - Lap 8+: cycle again; lines say the rule "returns, slightly different".
   Laps >= 2 ending thresholds are halved (shorter laps), no gun, no intro cards, montage and sponsor break #1 still fire.
The game never says "Game Over". `api.exit()` returns to the Lobby; the module says on exit: "Welcome back. You've missed nothing. You've been missed anyway." (This line goes to `api.say` from `destroy()` only if the engine allows; otherwise add it to the lobby via `P.addLines('hubReturn',[...])` at load.)

---

## 13. LINES (VERBATIM; `who | text`; groups by situation; shuffle bags per group; never the same line twice in a row)

Tokens: `{player}` `{meh}` `{pace}` `{n}`. Two-voice exchanges are "bits": consecutive lines in one group marked `[bit]` are spoken 2.5 s apart in order, as one unit.

### L1 Opening and first move
- Management | Welcome to the Snail Marathon, {player}. The course is 3,000 pixels. The finish line is, at this time, 3,000 pixels. Per policy, this may change.
- Management | The starter pistol is a cork. It has been fired. The cork is fine.
- Gerald | Ready. Steady. Potato.
- Management | A potato was supposed to be here. The potato has been rescheduled.
- Management | Click to move one pixel. We call this training.
- Hector | And they're off. Well. They're on. Nobody has technically left.
- Management | You have moved 1 pixel. Management would like to acknowledge the pixel. The pixel is aware.
- [bit] Maxine | Hector, that's a snail moving one pixel.
- [bit] Hector | Maxine, that's a pixel moving a snail.
- [bit] Maxine | I've written that down in case it's good.
- Hector | The crowd is going wild. The crowd is a cricket. The cricket is going moderately.
- Management | Loupe engaged. At 12x, a pixel is the size of a decision.
- Hector | The loupe confirms it. Gary is one pixel ahead. He looks very pleased.

### L2 The Field (intro cards: name | sponsor | line)
- Gary | Moist-O-Matic | I don't know how I'm ahead either. I just woke up like this. One pixel.
- Sheila Zoomerton | Slow Lane Mutual | I train by thinking about the road. The road is very supportive.
- Turbo | none (disqualified) | Turbo is a slug. Turbo has been disqualified for being a slug. Turbo is under a tea towel and carrying on regardless.
- Yesterday's You | none | Yesterday's You is {n} px ahead. Yesterday's You did not sleep. Yesterday's You is fine.
- Management | You are in 5th place of 5. The 5th place podium is a coaster. It is a good coaster.
- Hector | Gary has gone ahead by one pixel. Statistically that is a lot of Gary.
- Management | Consolation Meh: 0.1. Awarded for being overtaken. It is the nicest thing that has happened to you since the pixel.
- Hector | Turbo is in third. Maxine: Turbo is disqualified. Hector: And yet. Third. We don't ask.

### L3 Management status chatter (rolled every ~25 s while active)
- Management | Current pace: {pace} pixels per second. Internally this is described as 'a lot, for a snail'.
- Management | You have earned {meh} Meh. Hydrate responsibly. There is a station for this. The station is slow on purpose.
- Management | It is not about the distance. It is about the distance remaining, which is also distance.
- Management | You have passed KM 0.0000013. A small sign has been erected. It is the same sign. It has been moved.
- Management | Rank: 5th of 5. Gary is 1st by 1 pixel. We have measured this twice with a very small ruler.
- Management | Your shell has been fitted with a sponsor. The sponsor is you. You are doing excellent work for your own brand.
- Management | Please stop clicking so efficiently. We are not equipped to process this much distance.
- Management | You have moved 25 pixels. The start line has been notified. It declined to comment.
- Management | Every pixel is a small decision. This one was also a pixel.
- Management | Management would like to remind you that this is not a race. It is, however, a marathon.

### L4 In Rhythm / rhythm
- Management | Rhythm detected. Rhythm has no effect on pixels. Management enjoys it anyway.
- Management | You are in rhythm. A metronome has appeared. Nobody has claimed it.
- Hector | Wait, rhythm. He's got rhythm. Maxine, he has rhythm.
- Maxine | I've dropped my sandwich.

### L5 Commentators by interest tier
Tier A (rigorous, >= 70)
- Hector | Pixel 14. Textbook. Not the textbook anyone has, but a textbook exists.
- Maxine | That first pixel took 0.4 seconds. In snail terms that is reckless.
- Hector | Maxine, note the posture. That is the posture of a snail committed to forward.
- Maxine | I would like to say the pavement is in excellent condition. I have been told to say it.
- Hector | And a good clean slither there. Very little drag. Mostly drag.
Tier B (drifting, 40-69)
- Hector | The distance remaining is a number. Maxine, is it a number? Maxine: It's been a number for a while.
- Maxine | Speaking of lead changes, I had a sandwich on the way in. Completely unrelated. Remind me.
- Hector | We've been told to fill four minutes. Maxine, tell me about your sandwich. Maxine: Thank you. It was a good one.
- Hector | I have a parking permit that expires at five. That is the real race.
- Maxine | I have forgotten what we are watching. I want to say: a sport.
Tier C (low, 10-39)
- Maxine | Mm. Yes. Moving. Good.
- Hector | I believe he moved. Maxine: He might have. Hector: I will note it as a rumour.
- Maxine | I'm so proud. I'm also getting a sandwich.
- Hector | I have lost the thread. I believe it was a snail thread.
- Hector | Interest in this race currently stands at 14 percent, which Maxine says is generous.
Tier D (almost gone, 1-9)
- Maxine | Is it still going? ... I think it's still going.
- Hector | And they're off. Maxine: You said that. Hector: I'm saying it again. It's the same 'off'.
5d (zero interest, Management, after 15 s of booth empty)
- Booth | The commentators have gone to lunch. A cardboard cutout of Hector remains. It says 'wow'.
- Management | The booth is empty. The cricket has taken it personally.
- Management | A paper plate has been left in the booth. It may be a bid for attention.
Dead-air extras
- Hector | Hector here. Maxine has gone to find parking. We will be with you spiritually.
- Maxine | I am no longer sure what a pixel is. I used to be so sure.

### L6 Gary
- Gary | I don't know how I'm ahead either. I just woke up like this. One pixel.
- Gary | Don't look at me. I'm only up here because that's where I am.
- Hector | Gary is exactly one pixel ahead. Maxine: Exactly? Hector: To the pixel. It's a contract.
- Hector | The crisis is Gary. The crisis has always been Gary.
- Gary | One pixel is not much. But it is, famously, enough.
- Hector | Maxine, that is a pixel Gary did not earn. Maxine: He's never earned it. That's the beauty.

### L7 Sponsors (bubbles on boards and breaks)
- Sponsor | Moist-O-Matic: Are you moist? Are you sure? Call now. Operators are standing by a puddle.
- Sponsor | This leg of the marathon is brought to you by Gary, now sponsored by the concept of Gary.
- Sponsor | Slow Lane Mutual: we'll cover you at any pace, up to and including 'stopped'.
- Sponsor | Gary Inc. (Self-Funded): Gary. It's what's ahead.
- Sponsor | Gary (Pending): Gary, but we're awaiting the paperwork.
- Sponsor | We Support You (As Needed).
- Sponsor | Slightly Warmer Gravel Co. is also a sponsor. It has asked not to be told what it sponsors.
Sponsor creep schedule (board text): beat 1-5 `Moist-O-Matic` / `Slow Lane Mutual` / `Gary Inc.`; beat 6-8 `the concept of Gary` / `Slow Lane Mutual (Pending)` / `Gravel, Provisional`; beat 9-10 `Gary (Self-Funded)` / `A Sponsor` / `We Support You (As Needed)`.
Sponsor break skip
- Management | Sponsor skipped. Brand Loyalty has been awarded for skipping the brand. Management does not see the problem.
- Management | Skipped early. The sponsor is hurt, but supportive.
- Management | The sponsor break is over. You are exactly as you were, but advertised to.

### L8 THE FINISH LINE: apology ladder (one rung per mile marker, never repeating, in order)
- Finish Line | Terribly sorry. I have shifted 2 pixels. Wind.
- Finish Line | Don't mind me. Just stepping away. Lovely snail, by the way.
- Finish Line | Pardon me, there is a draught. I am just popping back a little.
- Finish Line | I apologise to the rivals as well. And to the cricket. Especially the cricket.
- Finish Line | Please accept a crumb. It is on the house. The house is also moving.
- Finish Line | Official notice: I am currently 'in transit'. Arrival expected on a date not yet invented.
- Finish Line | I have hired an assistant to move me back. He is very good. He is also me.
- Finish Line | I'd stay, but Sandra says I'm not insured above 0.5 snail-lengths of proximity.
- Finish Line | I have written you a card. It says sorry. It is a very small card.
- Finish Line | Honestly, I do wish you'd catch me. Please do not tell the others.
Filler pool after the ladder
- Finish Line | I'm not running away. I'm gracefully being elsewhere.
- Finish Line | I have been informed I am a finish line, not a destination. It was in the small print. It was very small.
- Finish Line | Another 40 pixels? Fine. For you.
- Finish Line | Come closer. Not that close. Perfect. Gone.
- Finish Line | I apologise for apologising. I will now apologise for that.
- Finish Line | Apologies, I've been double-booked as a start line in Lap 2. I'm already in the other room.
- Finish Line | I was exactly where I said. I was just also, for a moment, elsewhere.
- Finish Line | I'm in a meeting with myself. It's going very well. I'll come back to you.
8a Bubbles on small (25 px) retreats (random, tiny): `sorry` / `so sorry` / `oop` / `pardon` / `terribly` / `ahem` / `(bows)` / `elsewhere!`
Finish Line near-miss (R < 6, beat < 10)
- Finish Line | Oh. You're close. I'm so sorry. I'm just going to be over there.
Finish Line 12.4 beat (R flicker)
- Finish Line | I am 12.4 away. Now 12.5. Now 12.4. I don't know who is doing this.
- Finish Line | (sighs)
Finish Line stops (beat 10)
- Finish Line | I have stopped moving. I did not plan this. I am just so very tired of being elsewhere.
- Management | The finish line has stopped. The rivals have stopped. Nobody has been told why.

### L9 Rivals and the board
- Sheila Zoomerton | Slow Lane Mutual: you'll be fine. You're covered. The road is very supportive.
- Sheila Zoomerton | I'd like to congratulate you on the thing we both did. I'm not sure what it was.
- Turbo | (a small damp noise from under the tea towel)
- Turbo | I was told I would be disqualified. I was not told I would be third.
- Yesterday's You | You're catching up. I am the same as I was yesterday. I'm doing great.
- Management | The tea towel has been disqualified. The tea towel is carrying on regardless.

### L10 Overtaken (Sheila)
- Maxine | Sheila's through. Hector, I did not see Sheila get through. Hector: Nobody has, Maxine. She is a rumour with a hat.
- Hector | Sheila has overtaken. This has happened before. This is how overtaking works.
- Management | Sheila Zoomerton has overtaken you. Consolation Meh: 0.1. Both parties are fine.
- Maxine | Sheila is ahead. Hector: By how much? Maxine: A snail. Hector: That's helpful.
- Hector | Sheila is through. Maxine: Is that a team effort? Hector: Everything is, in the file.

### L11 Yesterday's You
- Management | You have passed Yesterday's You. They did not notice. They are asleep, in the sense that they are a ghost.
- Yesterday's You | Go on. Be better. I'll be right here being the same.

### L12 Hydration spill and start
- Management | Hydration Station. Hold to sip. Please do not rush the sip. The sip has been scheduled.
- Brenda | Cup 7 of 7. I know it's cup 7 of 7. It's been cup 7 of 7 for several cups.
- Management | You moved during a sip. The dew has been spilled. A volunteer sighs and refills it from a different dew.
- Brenda | It's fine. It's cup 7 of 7. It's always been cup 7 of 7. I'll get another.
- Brenda | Please do not click while sipping. It is a sip. It is not a click.
13 Hydration success and others
- Management | Hydration: 100%. Performance: unchanged. Mood: damper.
- Brenda | You did it. I'm not allowed to be proud. I'm proud. I have written it on the cup.
13b Cup re-posted
- Management | The hydration station has been quietly removed and re-posted ahead for your convenience.
13c Prehydration
- Management | You hydrated before you started. This is prehydration. It is not covered.
Cup 7½
- Brenda | Cup 7½ of 7. Don't ask. I have been told it is a member of the Club.
Beat 9 Brenda returns
- Brenda | Cup 7 of 7 again. I believe in you. I was not supposed to say that. It's on the cup.

### L14 First rhythm
- Management | You have been In Rhythm for the first time. A small tick has been installed. Per policy, please do not name it.
- Hector | I think he's got it. Whatever it is. Maxine: Cadence. Hector: Cadence.

### L15 Booth return
- Hector | Wait, is he going somewhere? Maxine: We left? Hector: We left. Maxine: Hello.
- Maxine | We're back! We never left! What did we miss?
- Hector | Wait, rhythm. He's got rhythm. Maxine, he has rhythm. Maxine: I've dropped my sandwich.

### L16 The sandwich
- Maxine | Speaking of lead changes, I had a sandwich on the way in. Completely unrelated. Remind me.
- Maxine | As I was saying about the sandwich. There was a second sandwich. It was upset about the first.
- Maxine | The third sandwich was a different kind of upset. It was upset about the second.
- Maxine | I have thought about the sandwich for a long time. I think the sandwich is thinking about me.
- Maxine | The sandwich was cheese. I just needed it said.
16b Interrupted
- Maxine | Anyway. Where was I. Hector: Sandwich. Maxine: Sandwich.
- Maxine | Sorry, that was a different sandwich. Hector: It's always a different sandwich.
- Hector | Maxine, you were going to tell me about the sandwich. Maxine: Not now, it's an event.
Booth sandwich click
- Maxine | Please don't.

### L17 Idle and spam short lines
(see L31-L36)

### L18 Sponsor break copy (ad screens, on-card text)
- `MOIST-O-MATIC: now with 12% more moist. Or 8% more. Subject to review.`
- `SLOW LANE MUTUAL: for when 'forward' is a lot.`
- `GARY INC.: a pixel is a start. A pixel ahead is a lifestyle.`
- Button | `SKIP SPONSOR (5)` ... `(4)` ... `(1)` ... `Skipped`

### L19 Shell Inspection
- Steward | Shell Inspection. We are looking for straightness. We are not looking for a reason.
- Steward | Slightly left. No. Right. No. The other left.
- Steward | APPROVED. The shell is straight. It was always straight. We just needed to see it.
19c fallback
- Steward | The shell has been approved as found. This is called a grandfather clause.

### L20 Cabbage
- Management | A cabbage leaf has arrived. Hold to nibble. It is not a metaphor.
- Management | +0 pixels, but +1 pride. Pride is not a pixel, but it is nearby.
- Management | The cabbage is gone. The cabbage was loved.

### L21 Held keys and Esc
- Management | Held keys count as one click. A snail is not a machine. It is a foot with ambitions.
21b
- Management | Escape is not available during a marathon. Neither is a marathon, but here we are.

### L22 Photo Finish captions (shuffle bag)
- A photograph has been taken. You look determined. You also look like a snail. We were not able to separate the two.
- Pictured: a snail, mid-pixel. The pixel declined to be photographed.
- Exhibit A: forward.
- Taken at the exact moment nothing happened.
- Your good side. Snails are mostly side.
- Candid. You had no idea. You still have no idea.
- Photo finish: you finished. Of what is unclear.
- A fine likeness. The likeness is also a snail, and also fine.
- Framed by Sandra. Sandra has flagged the frame.
- Moist, but with purpose.

### L23 Weather
- Management | Light drizzle for 12 seconds. Slither is the same. The rain, however, looks heroic.
- Management | The soundtrack has gained a cello. Nobody has asked where it came from.
- Hector | And the rain has made it a different race. Maxine: It's the same race. Hector: A wetter one.

### L24 Rival interview (Sheila: six no-comments)
- Sheila Zoomerton | No comment. I want that on the record. The record is a napkin.
- Sheila Zoomerton | I'm not at liberty to say. I am at liberty to be slightly ahead.
- Sheila Zoomerton | No comment, but I would like to thank the road.
- Sheila Zoomerton | My representative is at lunch. It's been a long lunch. It's a lunch with ambitions.
- Sheila Zoomerton | I'll say this: moist. I'll say no more.
- Sheila Zoomerton | No comment. That is a comment. I'm withdrawing it. No comment.

### L25 Finish Line memos (in order, each on a sticky note)
- Re: my position. I am currently somewhere. - FL
- Re: Re: my position. Please note I have moved. See attached sorry.
- FORMAL NOTICE. The undersigned (me) regrets to inform the snail (you) that the finish is, at this time, elsewhere.
- Per my previous memo: I am still elsewhere. Per my previous previous memo: so were you.
- MEMO TO FILE: I have no file. I have asked Sandra for a file. Sandra has flagged the request.
- (After the fifth) Finish Line | Thinking of you, from over here. It does not say where here is.

### L26 Reverse Marathon
- Hector | I'm told this is allowed.
- Maxine | He's going backward. Hector: He's going backward correctly.
- Management | You are walking backward. The finish line has politely followed behind you. This is now a chaperoned retreat.
- Management | You have reached the start. The starting gun fires again. It is a different gun. It is smaller.
- Management | Marathon reversal complete. You have finished the marathon backward, which is not allowed. We must check with Sandra.
- Management | You are in the seventh and a half position.
- Finish Line | Welcome back. Are we doing this or not?

### L27 Beat 3 and mile marker lines
- Management | The course is 3,000 pixels. The finish line is currently 3,000 pixels. It was 3,000 pixels a moment ago too.
- Management | This is called a moving target. Please do not take it personally.
- Management | KM 0.0000013 has been passed. The sign is the same sign. It has been moved.
- Management | Net progress: yes. Gross progress: also yes. The two have not met.

### L28 Montage
- Management | Management would like to announce a moment of inspiration.
- Management | A sunrise. Slow motion. You, in profile, dripping mildly. A piano, sincerely.
- Management | BELIEVE. Believe in the pixel. The pixel believes in you. The pixel has not been consulted.
- Management | Excellent.
- Management | Excellent (Lower).
- Management | You have trained for 14 seconds. You have gained 1 pixel. Management calls this 'a transformation'.
28b Captions (shuffle bag of 14; 6 shown per montage)
- Rain. It does not matter. Drink it.
- A leaf. You went around it. Look how far you have come.
- Every great snail began as a very small snail.
- They said you couldn't. They did not specify a pixel count.
- Sunrise. You are 4 pixels further than yesterday. The sunrise is unimpressed.
- Believe in yourself. Believe in the 0.3 pixels per second inside you.
- A leaf. A different leaf. The same leaf, but you have grown.
- Somewhere, a clock believes in you. The clock is wrong, with confidence.
- You were 1 px away from where you were. And now you are 2.
- The road is long. The road has also been short. The road has opinions.
- Gary, in profile, one pixel ahead. He is part of your journey.
- Slow is smooth. Smooth is fast. Fast is not applicable.
- Stand up straight. You are a snail. Do your best with that.
- Look how far you have come. It is the same distance as looking.
28c Skipped
- Management | Montage skipped. Montage Debt has accrued. A man with a clipboard is already crying.
29 Clipboard Man
- Clipboard Man | I'm here about the montage. Please do not make this about the montage.
- Clipboard Man | The debt is collected. I'd like to say thank you. I'd also like to say I am sad.

### L30 Beat 8 bureaucracy
- Management | Sandra from Compliance has flagged the finish line for relocating without Form 27B/6.
- Management | The finish line has filed Form 27B/7. It was destroyed in 1998.
- Management | Course units have been updated to snail-lengths. A snail-length is 24 pixels. It was always 24 pixels. We just hadn't said.
- Management | Course units have been updated to Tuesday-adjacent. Please do not ask which Tuesday.
- Steward | Timing chip, please. ... It's a coaster. That's fine. It's logged.
- Steward | You are required to be timed. We will time you. We will not tell you the time.
- Hector | Section 9 of the terms of service of the booth: the booth is not responsible for what is said in the booth. Maxine: We are in the booth. Hector: I'm aware.
- Maxine | Clause 14(c): the commentators may not be commentated on. Hector: So who's been doing it?
- Hector | We have stopped reading the script. We are now reading the terms of service of the booth. It has a better plot.

### L31 Idle 30 s
- Management | You have stopped. Management respects the stop. Management is also timing the stop.
- Management | The marathon is paused only by you. The marathon has noticed.

### L32 Idle 90 s
- Management | The snail has withdrawn into its shell. Gary has come back to stand next to it. Gary says nothing. Gary is a good rival.
- Hector | We're still live, Maxine. Maxine: I know. Hector: I'm saying it for the viewer. Maxine: There's no viewer. Hector: Well. Now there's a stop.
- Management | The hydration station is flashing a cup nobody will drink. It is a gesture.

### L33 Gary at idle
- Gary | (says nothing)

### L35 Idle 180 s (book club)
- Management | The rivals have formed a book club. Current book: the course map. Discussion is going badly.
- Maxine | May I join? I have a sandwich. Hector: Maxine, you have been asked to leave. Maxine: It's a very good sandwich.
- Management | You have achieved Lord High Archdeacon of Idling. The book club has been praised in the minutes.
- Management | Any click ends the idle. The book club thanks you for your absence.

### L34 Management cracks (rare, touching)
- Management | It is not about the distance. Sometimes I think it is. I think the distance is about you.
- Management | I have never finished anything. I would like to see it, once.
- Management | I am not fast. I am just afraid to be behind. (Management quotes this from a very old memo.)
- Management | I would like it noted that I enjoyed this. It is not a metric.
- Management | Management sounds, briefly, like a person. Management apologises. It will not happen again. It will.

### L36 Spam
- 36a Steward | Stewards request that you click like you mean it, but gently.
- 36b Management | Excessive velocity detected. A speed camera flashes. You have been fined 3 pixels. The pixels go to a good cause: Gary.
- 36b2 Management | You have been fined for movement. Movement is a privilege, like Thursdays.
- 36c1 Management | INCIDENT REPORT 14-B. At 11:42, a snail exceeded its own personal limits.
- 36c2 Management | The snail was wearing goggles. The goggles were not authorised.
- 36c3 Management | No one was hurt. Gary was one pixel ahead throughout. Please stop.
- Hector | He's clicking at speeds not seen since the previous click.
- Hector | I'm told that is a lot of clicking. I'm told by the stewards. They are exhausted.

### L37 The 7½ Club
- Management | 7 1/2 pixels. Welcome to the Club. The Club is a half. It meets in the middle of the floor.
- Management | A small ceremonial curtain has appeared trackside. The rivals have saluted. Gary has saluted a little less.
37b Gerald hat
- Gerald | Seven and a half. A man has to know when to be half. (He is wearing a hat.)

### L38 The sock
- 38a Management | The sock has no comment.
- Maxine | Is that. Hector: We don't ask the sock.
- Management | A sock jogs through the crowd with a tiny map. It is on a journey. It has declined your interest.
- 38b Management | The sock has left a tiny note at the finish line. It says 'Thank you for noticing'.
- Management | You have achieved Sock Whisperer, First Class. The sock has no comment.

### L39 The cricket
- Management | The cricket has acknowledged you. It is the only crowd member who has.
- Cricket card | I was always the crowd.
- Management | The cricket is sponsored by someone. We are looking into who. It is, tentatively, the crowd.

### L40 The bird and the sandwich payoff
40a (click during bird) Management | A bird shadow. The snail has retracted. The bird saw nothing and left. You have all been very brave.
40b Hector | We did it, Maxine. We were all so still.
40c (song, sung captions, one every 1.5 s): `A bird.` / `Went by.` / `We were brave.` / `That is all.`
L40 payoff (Lap 2 start)
- Hector | Welcome back to the marathon. We've been told it is the same marathon.
- Maxine | The sandwich was cheese.
- Hector | I know.
- Maxine | I just needed it said.

### L41 SALT
- Management | That was uncalled for.
- Sponsor | Tarmac-Free Salt Alternative: (a long, thin wail)
- Management | A moment of silence for the salt. It will last 7½ seconds. Thank you for your honesty.
- Management | The moment is over. Nobody was harmed. The salt remains a concept.

### L42 The ending (exact order)
42a Management | You have crossed the finish line. Congratulations. This crossing has been marked Provisional pending Sandra.
42a2 Hector | The whole booth is on its feet. Maxine: The booth is standing. The booth is a toaster.
42b Gerald | Every pixel is a small potato, and every potato is eventually a chip. Wear this bottle cap with pride, or at least with ribbon.
42b2 Management | Gerald was told it was a different event. He has stayed anyway.
42c Management | The official time is 10:03.4. That is a time. Management awards you 5 Meh. Per policy, that is exactly 5.
42d Management | Sandra from Compliance's stamp has landed: PROVISIONAL. The timing chip was a coaster.
42e Management | The finish line is now the starting line of Lap 2 of infinity. It has put on a different hat.
42e2 Finish Line | I've already moved. I'm in the other room. It's the start of the next one.
42f (desk reveal, optional) Management | The course measures 7½ centimetres. You have covered it 31 times. This is within tolerance. - S. (Compliance)
42g Management | You may leave at any time. The marathon will remain, loyally, a marathon.

### L43 Lap 2+ resets
- Management | Lap {n} of infinity. KPIs reset. Mood: resilient. Distance remaining: 3,000.0 px. A familiar number. It missed you.
- Finish Line | Terribly sorry. I was exactly here. I was also, as you know, a start line.
- Gary | One pixel ahead. Nothing has changed. It's so you have someone to chase.
- Sheila Zoomerton | I'd like to congratulate you again. I'm still not sure what it was.
- Finish Line | Back soon (always).

### L44 Lap rule announcements (rule index (lap-2)%6)
- Management | Lap 2 rule: the course is now measured in snail-lengths. Nobody consulted the snail-lengths.
- Management | Lap 3 rule: sponsors have swapped. Gary is now Gary (Self-Funded). Gary is thriving, financially.
- Management | Lap 4 rule: the hydration station has moved to the left. It says it has always been on the left.
- Management | Lap 5 rule: the track has a banked turn. It does nothing. It is very banked.
- Management | Lap 6 rule: the rivals now face backward. They are still going forward. Management admires the commitment.
- Management | Lap 7 rule: the spam thresholds are doubled, and the fines are doubled too. This is called equity.
- Management | Lap {n} rule: an old rule has returned, slightly different. It has put on weight.

### L45 Beat 10 (the touching beat)
- Management | The rivals have stopped. They are not winning. They are waiting. Nobody explains why.
- Gary | Go on. I'm one pixel ahead. I've always been one pixel ahead. It's so you have someone to chase.
- Finish Line | I just want you to arrive. I also would like to be somewhere else. These are both true.
- Management | R reads 1.0 pixel. It has never read 1.0 pixel. The number has asked for a moment.
- Hector | I think he's going to do it. Maxine: He's been going to do it for ten minutes. Hector: I know. It is going to be a lot.
- Management | The sky has gone golden. No reason has been given. None was requested.
- Management | Everyone is in rhythm. It is quietly overwhelming. Management has asked for a moment.
- Management | The rivals sync their clicks. A cello begins. Nobody put it there. It is simply here.

### L46 Misc one-offs
- Management | A new polaroid has been pinned. The shelf has been informed. The shelf declined to comment.
- Management | A speed camera flash was detected. It was a camera. It is a very good camera.
- Management | You have been awarded a very small Meh. It is the size of a pixel.
- Management | You are 100 pixels from the start. The start has been informed. The start is moving on.
- Management | Held. Not held. A held sip is a sip. A spilled sip is a lesson.
- Management | That was a half-slither. The Elegant Half-Slither. It is allowed. It is not understood.
- Management | You are in position 4 of 5. This has not happened before. We have notified the coaster.
- Management | The dew has been rated 'moist, with notes'. The notes are also dew.
- Management | Sandra has asked that you not be so enthusiastic. Sandra has asked that you not be unenthusiastic either.
- Management | You have achieved a thing. The thing has been logged. The log is also a coaster.
- Hector | This is the most thrilling event in the history of the arcade, according to Management. Management has no comparison data.
- Maxine | I'd say we're at the midpoint. Hector: We are at the third quarter. Maxine: Since when? Hector: Since it was convenient.

(Count: at least 190 distinct lines. Builder: do not drop below 100 even if cutting events.)

---

## 14. AUDIO MAP (`api.sfx`, never throws, silent if muted)
Blip per slither: alternate `blip`/`tick` (rotate by `P%2`). Mile marker: `bell`. Sip hold complete: `pop`. Spill: `buzz`. Salt shriek: `sad`. Overtake: `whoosh`. Sponsor skip: `ding`. Shell approved: `stamp` then `ding`. Montage "piano": `ding`. Spam camera: `pop`. Siren: `buzz` x2. First click trumpet: `fanfare` (once). Crossing: `tada`. Cork: `pop`. Interview: `honk` (tiny). Cricket click: `tick`. Reverse: `boing` on the first backward step. Bird song: `fanfare` x2. Silence mode (SALT): suppress all sfx for 7.5 s.

---

## 15. IMPLEMENTATION HINTS

- File skeleton: `(function(){'use strict'; const P=window.POINTLESS; ... P.injectCSS(CSS,'css-snail-marathon'); P.addAchievements([...]); P.registerModule({... mount(root, api){ ... return {destroy(){...}}; }});})();`
- Keep ALL mutable state in one `S` object created inside `mount()` (no module-level globals) so remount 20x leaves nothing behind. `destroy()` sets `S.dead = true`, cancels everything not already auto-cleared, and removes DOM. Every callback checks `if(S.dead) return`.
- Main loop: ONE `api.requestAnimationFrame` chain (not setInterval). `dt = clamp((now - last), 0, 50)` using `api.now()`. Update game timers (active seconds, interest drain, event timers) from the loop using accumulated dt OR a single `api.setInterval(tick, 250)`; do not mix. Pause timers when `document.hidden` (via `api.on(document,'visibilitychange')`), and gate with `S.dead`.
- Draw only when `root.isConnected` and canvas size valid. Cap `floats` at 6, `slime` at 600, polaroids at 5, caption log at 8 lines (remove oldest nodes), booth bits queue at 4.
- Use `api.setTimeout` for every one-shot, store handles in a `timers` Set only if you need early cancel. The `script(fn, ms)` helper = `api.setTimeout(() => { if(!S.dead) fn(); }, T(ms))`.
- `fmtNum(n)`: `Number.isFinite(n) ? n.toLocaleString('en-US',{minimumFractionDigits:1,maximumFractionDigits:1}) : '0.0'`.
- Event slot: a single `setSlot(node|null)` that REPLACES children (so there are never two controls). Slot has `min-height:64px`.
- Pointer handling: canvas `pointerdown`/`pointerup`/`pointermove`/`pointerleave`. Distinguish pointerType: `mouse` (hover loupe), `touch`/`pen` (long-press pins loupe). Compute coordinates via `getBoundingClientRect()` (don't trust `offsetX`).
- Dedupe slither: SLITHER button handles `pointerdown` for mouse/touch/pen (set `S.lastPointerSlither = api.now()`), and `click` handles keyboard-origin only: in `click`, if `e.detail === 0` (keyboard) count it; if `e.detail > 0` ignore (pointerdown already counted). Keyboard Space/Enter on the SLITHER button: handle `keydown` (ignore `e.repeat`), `preventDefault`, and then ignore the synthesized click via `e.detail===0` check being skipped when a keydown just fired (set flag for 50 ms). Simplest reliable: the button listens to `pointerdown` + `keydown` only and cancels `click` (`preventDefault`) always; the fuzz harness dispatching bare `click()` events must still count: so on `click` with `e.detail===0` AND no keydown/pointerdown in the last 60 ms, count one slither.
- Sip/nibble hold: `pointerdown` starts, `pointerup`/`pointercancel`/`pointerleave`/`blur`/key `keyup` cancels; a hold completes via `api.setTimeout`. Never rely on `repeat` keydowns.
- Shell dragging: pointerdown on snail starts drag when the Shell Inspection is active; angle = clamp(`(pointerX - startX) * 0.5 + startAngle`). Provide the two buttons too (fuzz and keyboard).
- Canvas readback needs nothing special (`drawImage(canvas)` from the same origin). Do NOT use `getImageData`/`toDataURL` (avoid taint/size issues).
- Seeded randomness: use `api.rand/pick/shuffle/chance` for gameplay (deterministic under `?seed`); use an independent `mulberry32` ONLY for the grass layout so the track is stable across rerolls.
- Performance: pre-render the static hill/hedge/crowd layers into an offscreen canvas strip once per resize and `drawImage` it with an x offset (repeat by modulo). Keep the draw under ~2 ms.
- `prefers-reduced-motion`: read `matchMedia('(prefers-reduced-motion: reduce)')` once and on change (via `api.on(mql,'change',...)`); set `S.reduced`; drop bow/shake/parallax/confetti scale as listed.
- Selftest speed-ups: see Decision 5; `T()` helper multiplies durations by `api.selftest ? 0.1 : 1` and active seconds by 6.
- Events: define each as `{id, minBeat, start(), end(result)}` in a table; the scheduler picks from a shuffled bag (re-shuffle when empty, drop events whose `minBeat > beat`). Event completion funnels through `finishEvent(id, result)` which clears the slot, clears the fallback timer, awards, bumps interest, and schedules the next gap.
- The ending is a linear script using `script()`; set `S.lockEnding = true` at its start and false after the lap reset.
- All strings come from the bag helper `bag(name, arr)` returning a function that yields a shuffled next item and never repeats the previous one (also across reshuffles).
- Budget: aim for ~1500 lines. See section 16 for the cut order.

---

## 16. CUT ORDER (if over 1800 lines or time runs short; do NOT cut core, finish line, rivals, interest, loupe, idle, spam, ending)
1. The 7½ cm desk-reveal animation (keep only the text lines L42f).
2. Lap rules 5, 6, 7 (banked turn, backward rivals, equity): keep text + no visual change.
3. The Bird song captions (keep the achievement and the 4 s freeze).
4. Shell Inspection drag (keep the two buttons + keys only).
5. The weather rain particle draw (keep the lines + cello).
6. Photo-finish caption bag shrinks to 6 entries.
7. Reverse Marathon's `WRONG WAY` sign (keep Left Arrow only).
8. The cricket card (keep the stat/achievement click counter).
9. Salt patch walking nuance (already simplified).
Never cut: achievements, at least 100 lines, idle, spam, ending, selftest awards/says/stats.

---

## 17. RISKS: THE 5 MOST LIKELY IMPLEMENTATION BUGS

1. **Distance math and units go wrong (NaN, negative R, flicker past the floor).** `R = 3000 - P + T` with retreat steps, scripted eases of `T` (beat 9: 12.4, beat 10: 1.0), reverse (negative P), fines (+3) and unit conversion (divide by 24 or 180) is a lot of arithmetic with several writers. Danger: two systems animating `T` at once, `R < 1.0` before beat 10, `R` printed as `NaN`/`-0.0`/`Infinity`, units chip not reverting, the retreat bucket check (`floor(P/25)`) firing repeatedly when P is fractional or negative. Mitigation: ONE `setT(target, ms)` that owns all T animation (cancel the previous), ONE `getR()` that clamps and finite-guards, ONE `fmtDist()`, and compare buckets with `Math.floor` on forward moves only.
2. **State machine collisions: events vs set-pieces vs idle vs ending.** Hydration holds, sponsor overlays, salt waits, the montage, intro cards, the bird, idle shell and the ending all want input and the slot at once. Danger: an event starting during the montage, a fallback timeout firing after another event has taken the slot (clearing the wrong control), a stuck "sponsor break disables SLITHER forever", the ending firing while a sip is mid-hold, scripted beats firing twice after a lap reset, timers surviving `destroy()` (fuzz harness flags leaked timers). Mitigation: a single `S.mode` (`play|event|setpiece|ending|idle`) with `canStartEvent()`, `finishEvent` as the only exit, fallback timeouts keyed by event instance id, `fired{}` reset per lap, and an audit of every `api.setTimeout` for `S.dead` guards.
3. **Input double-counting and mis-routing.** A press on the SLITHER button can fire `pointerdown`, then `click`; Space/Enter fires `keydown`, `keyup` and a synthesized `click`; touch can fire pointer events then mouse compat events; multi-touch counts per finger; `e.repeat` must be ignored; Space on the focused sip/skip/nibble buttons must not also slither; the global key handler must ignore inputs; Left arrow collides with Shell Inspection. The fuzz harness dispatches synthetic `click`/`pointerdown`/`keydown` in random combos. Mitigation: the dedupe scheme in section 15 (counted by source with a 60 ms guard), `touch-action:manipulation`, one central `doSlither()`, target checks, and the `refusal` table above.
4. **Canvas sizing, DPR and loupe exceptions.** Zero-size canvas when the root is hidden or at 360 px width, resize loops, `drawImage` with a zero source rectangle throwing `IndexSizeError`, rAF still running after destroy, the loupe sampling outside the canvas, blurry rendering at DPR 1.25/1.5/2, offscreen caches not rebuilt after resize (stretched hills), `ctx.setTransform` compounding scale across resizes (call it fresh each resize, not `scale()`). Mitigation: guard every draw with `cssW>=10 && cssH>=10 && !S.dead`, rebuild offscreen layers on resize, clamp loupe focus, never use `scale()` cumulatively, and run `api.requestAnimationFrame` only.
5. **Selftest/fuzz traps: unbounded DOM, forbidden strings, zero engagement, long timers.** Floating "+1 px" texts, caption lines, polaroids, spam-triggered lines and montage captions can grow DOM without bound; `undefined`/`null`/`NaN` can leak into captions (e.g., `{n}` unreplaced, missing `who`, a sponsor name from an out-of-range index); a quiet run may never call `award/say/stat`; real-time waits (idle 180 s, beat thresholds, 15 s fallbacks) never trigger inside the virtual-time budget, so late systems (ending, idle, lap reset, sock) go untested and ship broken. Mitigation: hard caps listed in section 15, a `safeText()` pass that throws away any string containing the forbidden words before display, award/say/stat on the first click, and the `api.selftest` time scaling (Decision 5) so the whole run reaches beat 10, the ending, and lap 2 within a 400-step fuzz run; verify by temporarily logging fired beats while running `node tools/selftest.js snail-marathon --steps 400` and checking that `stat laps >= 1` shows in the result.

---

## 18. DEFINITION OF DONE (for the builder)
- `node tools/lint.js games/snail-marathon.js` passes; `node tools/selftest.js snail-marathon --steps 400 --seed 1` and `--seed 7` pass.
- Opens with `index.html?dev=snail-marathon`: cork pistol pop and the intro line within 3 s; first click moves 1 px and opens the loupe; the finish line off-screen pennant reads a real number; the Gary chip reads `GARY +1`.
- At 360px and 1400px: no horizontal scroll, SLITHER reachable, canvas <= 300px tall, booth in side column at >= 900px.
- >= 100 distinct lines from section 13 are present in the file; >= 6 achievements (13 declared, 8 secret); idle (30/90/180 s) and spam (12/18/30) behaviours work; the ending and Lap 2 sequence run end to end.
