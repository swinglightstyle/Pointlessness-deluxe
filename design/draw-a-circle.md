# DESIGN BRIEF: Draw a Perfect Circle (`draw-a-circle`)

Final merged brief (showrunner). A builder who reads only SPEC.md, VOICE.md and this file can build the module. Output file: `games/draw-a-circle.js` (single file, <= 1800 lines, target 1600; vanilla JS, classic script, no network, no external assets). Every line in section 14 is final and verbatim. Lines contain `%PLACEHOLDERS%` that the module fills itself (see 14.0); `{player}` `{count}` `{meh}` are the engine's tokens.

Decisions made while merging the three pitches (do not re-litigate):
- Base = pitch 1 ("The Tribunal of Circularity"): judges Dr. Ferrule Quince, Lady Odalys Brume, Hob; the Consensus meter that always reads 0.0%; Tenderness and five tiers; Standing Orders; the Bagel Moment, Bagel Protocol and the Closing Ceremony that is not an ending; Appeal escalation 27B/6 to Appeals Office at lunch; the Missing Sock; Gerald, Dennis, Sandra, the Stapler.
- Taken from pitch 2: decimal creep (capped at 5 decimals, no marquee), the "Unanimous: 0 of N" ledger, "radius zero" (dot x3 = a very small bagel), the wipe-limit gag (Sandra permits 3), the figure-eight argument, the sincere "We missed you / Circle, please." pair, Hob's snack-in-hand method.
- Taken from pitch 3: "Conceptual Circle" (present an empty canvas three times), the "we are not saying try to be perfect, we have a bag ready" nudge, the empty-chair idea (becomes Dennis's chair), the Tired Sigh, Quarantine, the Reverse Tribunal idle gag.
- CUT as unbuildable or weak in one file: smiley-face detection (multi-stroke inference), concentric second-ring detection, the Hall of Circles as a separate panel (the Gallery of Bold Readings covers it), the median-score rule, the 31-digit marquee, the "Probation Circle" narrow-band threshold, the swipeable critique stack (critiques stack as three cards on phones), CSS sesame-seed bagels (use the bagel emoji), colour-lerp wet ink (keep only the fading halo), 12-person spam queue, the Season 2 Ovals loop (replaced by Round 1 (Returning)), the per-round canvas thumbnails of full history (history is stored as 24-point arrays).
- Scores are real geometry but never agree; there is no way to win; Official Score is always PROVISIONAL.

Category `game`, `unlockCost: 0`, id `draw-a-circle`, title `Draw a Perfect Circle`, icon `⭕`, tags `['drawing','judging','bagel']`, tagline `Draw one circle. Three judges will disagree about it, formally.` Window title via `api.setTitle('The Tribunal of Circularity')`.

---------------------------------------------------------------------

## 1. Concept

You are handed one inky stylus and a canvas the size of a dinner plate. You draw one freehand circle. Three judges who have never once agreed score it to two decimal places, each by a different private measure. The Consensus meter between them reads 0.0% every time (it is a record). A perfect circle is disqualified as suspiciously perfect. A scribble is praised as a bold reading of circularity. Each round the judges grow a little more tender until Judge Hob says your circle reminded him of a bagel. Then the game keeps going, with a bagel.

Tone: VOICE.md in full. Total sincerity, deadpan, never explain a joke. Management narrates. Sandra from Compliance is cited and never seen. The stakes are nil and everyone is moved.

## 2. Cast

| Who | Role | Avatar / props |
|---|---|---|
| **Dr. Ferrule Quince** | Geometry. Scores precision, is hurt by wobble. Apologises later. | 🧐 with a CSS monocle ring, brass compass drawn with CSS (a small rotated `V`). |
| **Lady Odalys Brume** | Feeling. Scores "intent", secretly loves wobble, speed changes, hesitation. | 😌 with an oversized hat: CSS rotated pseudo-element in lilac (a 👒 emoji sits on the stool as a prop). |
| **Hob** | Third Chair. Method undisclosed; scores by resemblance to the snack in his hand. | 🧔 with a CSS apron (cream trapezoid), plus a ring-shaped snack emoji that changes (see 3.3). |
| **Management** | Narrator (`api.say` default). | engine bubble. |
| **Sandra from Compliance** | Never seen, always cited. Issues Standing Orders, flags things, receives the Evidence Bag. | text only. |
| **Gerald, VP of Spuds** | 🥔 fourth chair, Beat 8 only, abstains. Appears at most twice per mount. If `api.flag.get('metGerald')` he says "We have met". | CSS stool + 🥔. |
| **Dennis the Lobby Plant** | 🌱 in the gallery strip with an "audience" badge from Beat 7. Leans in (CSS tilt) on a Dot. | tiny chair + 🌱. |
| **The Stapler** | Appeals Clerk, revealed at the 6th appeal (or after the Bagel Moment). One demand per appeal. | text + 📎 prop (no stapler emoji exists). |
| **The Rate Limit Officer** | very tired 🦉 with a CSS lanyard, spam only. | emoji. |
| **The Missing Sock** | 🧦, rare event only. Never mentioned again. | emoji. |

## 3. Layout and DOM

### 3.1 Structure (all inside `root`; all classes `m-draw-a-circle-*`)
```
wrap (card, tier class on this element: t1..t4, spot, protocol, returning)
  bench (top)
    desk: 3 seats in a CSS grid (order flips under Bagel Protocol)
      seat x3: avatar, nameplate, snack (Hob only), paddle (flip), critique <p> (ONE reusable node per judge)
      fourth seat (Gerald) hidden until Beat 8, empty stool otherwise
    consensus: SVG gauge (needle always at 0, strains left), caption line, sweat-drop 💦 (from Beat 3)
  stage (middle)
    canvaswrap: <canvas> + CSS compass dot with tiny label "decorative" + caption strip + overlays (quarantine, sock, owl, hole shadow, spotlight)
    hint line (keyboard hint) + waiver line ("Gesture Continuity Waiver: 0.7 s")
  docket (bottom clipboard)
    row 1: Round counter ("Round 7"), Tenderness (Unofficial) heart thermometer, Official Score + stamp + footnote
    row 2: buttons: Present to Panel, Draw for me (Management insists), Clear Table, Appeal (📎, NEW sticker), Template Ring (Free) [Beat 4], Intermission [Beat 8], Ghost toggle, Conclude Proceedings (Optional) [later]
    row 3: Ledger: "Unanimous: 0 of N", "Best Circle: Undetermined", "Meh earned today: see Management", player title
    Evidence Bag (ziplock SVG with up to 6 thumbnails) [after first DQ]
    Gallery of Bold Readings (up to 12 framed thumbnails + Dennis) [see 11.4]
    Pantry (single row, appears after the ceremony)
  paper layer: Appeal form / Reverse Tribunal / certificate (an in-root absolutely positioned panel, one at a time)
  sr-only aria-live="polite" region: one string per verdict ("Quince 61.37%, Brume 91.05%, Hob 33.33%. ...")
```
Judge critiques are three reusable text nodes (never appended). Thumbnails live in fixed pools of slots (6 evidence, 12 gallery) that are recycled: **no DOM growth**.

### 3.2 Responsive
- >= 760px: bench is a 3-column grid over the canvas. Canvas `min(92vw, 520px)`, never below 320px.
- < 560px: judges collapse to a three-up row of small avatars (still with flipping paddles), critiques become three stacked 2-line cards under the canvas (tap to expand), no horizontal scroll. The Docket buttons wrap and are >= 40px tall.
- Resize: recompute canvas size from `canvaswrap.clientWidth` on `api.on(window,'resize')`, rebuild the backing store (`dpr = min(devicePixelRatio, 2)`), redraw from stored **normalised** points (0..1). No ResizeObserver.

### 3.3 Hob's snack (running gag 2)
Per round Hob holds a new ring-shaped or ring-adjacent snack (shown as an emoji next to him, caption on hover/in aria-label): `🥨 a pretzel`, `🍩 a donut`, `🍘 a hula-hoop-shaped cracker`, `💍 a bracelet he claims is a snack`, `🔘 a polo mint`, `🍪 a ring-shaped biscuit`. Shuffled bag. After the Bagel Moment the snacks are hole-less: `🍞 a slice of toast`, `💿 a plain disc`, `🍪 a coin, he insists`. During the Bagel Moment he puts the snack down (emoji hidden until the moment ends).

## 4. Controls

All real controls are `<button>`s (Enter/Space), keyboard focus rings visible. **The game is fully playable with mouse, touch or keyboard only.**

### 4.1 Mouse and touch (pointer events)
- `canvas`: `touch-action:none`, `contextmenu` prevented, `tabindex=0`, `role="application"`, `aria-label="Circle canvas. Draw with a pointer, or use arrow keys to steer a pen. Space lowers and lifts the pen. Enter presents to the panel. Escape clears."`
- `pointerdown`: if a stroke pointer is already active and `e.pointerId` differs (second finger), ignore it and fire the "Only one hand is licensed" gag (rate limited to once per 4 s, priority 0). Otherwise start (or continue, see waiver) a stroke, `try{ canvas.setPointerCapture(e.pointerId) }catch(_){}`.
- `pointermove` (only for the active pointerId): append point `{x,y,t}` (x,y normalised to the canvas CSS box, clamp 0..1; `t` = `api.now()`); minimum spacing 1.5 CSS px.
- `pointerup` / `pointercancel` / `lostpointercapture`: lift. Lifting starts the **Gesture Continuity Waiver**: a 700 ms timer. Re-pressing within 700 ms **continues the same stroke** (the gap is bridged with no ink). When the timer expires the stroke is submitted. `Present to Panel` or Enter submits immediately.
- A stroke under 12 points or under 24 px of path length is a **Dot** (a legal submission).
- Point cap 2500 per stroke: when exceeded, decimate (keep every second point) and double the minimum spacing. Never truncate the stroke.
- Drawing a new stroke after a verdict clears the canvas first (the verdict overlay is dropped, the old stroke is kept in `last` for the ghost).
- Ink: quadratic-smoothed polyline, `lineCap/lineJoin='round'`, `lineWidth 5`, navy `#1B2540`; while the stroke is fresh (drawing, plus 2 s after) a faint wet halo (`alpha .25`, `lineWidth 9`) fades. Redraw only when dirty, once per rAF (`api.requestAnimationFrame`).

### 4.2 Keyboard (focus the canvas)
- A visible nib (a CSS dot, positioned by transform) starts at the canvas centre (0.5, 0.5). Arrow keys steer a pen "turtle" **continuously while held** (held-key set, rAF loop, delta-time based): speed 140 px/s (at the 520px reference; scale by canvas size), **Shift = 50 px/s**, **Ctrl or Alt = 300 px/s**. Velocity is smoothed toward the held direction with `v += (target - v) * (1 - exp(-dt/0.12))` so keyboard circles look like adorable octagons.
- **Space** toggles pen down/up. Pen down starts or continues a stroke (same waiver rules); pen up lifts (waiver timer). **Enter** presents now. **Escape** clears (counts as a wipe; see 9.3).
- Safety: `keyup` and `blur` clear the held set; any single key held more than 2500 ms is auto-released (guards against missed keyups). The rAF loop only runs while a key is held or the pen is down.
- Hint line under the canvas: `Arrows steer. Space lowers the pen. Space again lifts it. Enter presents.` (visible at all times; it is the tutorial).

### 4.3 Buttons
| Button | Behaviour |
|---|---|
| **Present to Panel** | submits the current stroke now (flushes the waiver). With an empty canvas: the Conceptual Circle counter (secret, 11.8). |
| **Draw for me (Management insists)** | auto-draws a genuinely mediocre circle (radius 0.28..0.34, wobble 4..9% from 2 low harmonics seeded by `api.rand`, closure gap 3..8%, random start angle, direction alternates, ~1.6 s of timestamped points, animated through rAF), then submits. Stroke is tagged `auto`. Never draws a PERFECT. |
| **Clear Table** | clears the canvas. Free. See wipe rules, 9.3. |
| **Appeal** | see section 10. Appears at Beat 3 with a sticker reading NEW. |
| **Template Ring (Free)** | golden button, appears at Beat 4: animates a mathematically perfect circle (r=0.3, 64 points, constant speed, 0.8 s) and submits it as `auto` -> PERFECT -> disqualification. |
| **Intermission** | Beat 8 only. Free snack for Hob; his next score is weirder (Hob score += random in +-25 then clamped 20..99.5). One use per two verdicts. |
| **Ghost** | `aria-pressed` toggle, also bound to **hold G** (keydown/keyup on `document` via `api.on`, ignored when a text field has focus): shows the previous circle at 12% opacity. For touch players the button toggles it. |
| **Conclude Proceedings (Optional)** | appears after the Bagel Moment and 3 Protocol canvases; starts the Closing Ceremony (section 12). |

### 4.4 Spam counting
A "stroke event" is: a canvas `pointerdown`, a Space pen-down, a Present press, a Draw-for-me press, a Template Ring press, a Clear Table press. Kept in a rolling timestamp array (cap 80). See 9.2.

---------------------------------------------------------------------

## 5. Scoring: real geometry, perverse presentation

All computed on submit, from the stroke resampled in **normalised** coordinates (canvas box = unit square, aspect 1). Guard everything: every division checks its denominator; `meanR` floor 1e-4; final numbers pass `isFinite` or fall back to a safe default. **No NaN may ever reach the DOM.**

### 5.1 Metrics (from 96 points resampled evenly by arc length; keep the raw points for speed)
- `centroid` = mean of points. `r_i` = distance to centroid. `meanR`, `rms = sqrt(mean((r_i-meanR)^2))`. `circ = clamp(1 - rms/meanR, 0, 1)`. `devPct = 100*rms/meanR`.
- `gap = dist(first,last)/meanR`, `gapPct = 100*gap`. `gapMm = gap*meanR*520*0.19` (imaginary ruler: 1 canvas px at the 520px reference = 0.19 mm), shown to 1 decimal.
- `turning`: sum of signed heading changes between successive segments, unwrapped. In screen coordinates (y down) **positive = clockwise**. `cw = turning > 0`. `absTurn = |turning|`.
- `crossings`: self-intersections of the 96-point polyline (skip adjacent segments; O(n^2) is fine).
- `pathRatio = pathLength/(2*PI*meanR)`.
- `asp`: eigenvalue ratio from the point covariance, `sqrt(l1/l2)` (>= 1). `bboxAspect = max(w,h)/max(min(w,h),1e-4)`.
- `size = meanR` (canvas half-width = 0.5). `touchesEdge`: any raw point within 0.02 of the border.
- From raw points: `mean speed`, `speedCV` (stdev/mean), `hesitations` = number of runs where speed < 25% of median for >= 120 ms, `secs` = duration of the stroke.
- `startTop` = first point's y < 0.4. `enclosesDot` = point-in-polygon of (0.5,0.5) using the resampled points.
- `curvPeaks`: turning angle per resampled point, smoothed with window 3; count local maxima > 0.35 rad separated by >= 8 points.

### 5.2 Classification (first match wins; 13 classes, each has a first-time bonus)
1. `DOT`: raw points < 12 or raw path < 24 px (path in CSS px at current size).
2. `TINY`: meanR < 0.04.
3. `LINE`: `asp > 6` or absTurn < 0.6*PI.
4. `SCRIBBLE`: crossings >= 6 or pathRatio > 2.2.
5. `FIG8`: crossings 1..2 and absTurn < PI and pathRatio > 1.4 (two lobes with opposite turning).
6. `SPIRAL`: |corr(r_i, cumulative turning)| > 0.85 and absTurn >= 1.3*2*PI.
7. `HUGE`: touchesEdge.
8. `PERFECT`: devPct < 1.2 and gapPct < 2 and |absTurn - 2*PI| < 0.03*2*PI and crossings 0.
9. `OPEN_C`: gap > 0.35 and absTurn in [0.9*PI, 1.7*PI].
10. `SQUARE`: curvPeaks == 4 and circ in [0.82, 0.97] and absTurn >= 1.6*PI.
11. `EGG`: asp > 1.18 and circ > 0.8.
12. `GOOD`: circ >= 0.93 and gap < 0.12.
13. `WOBBLY`: everything else.
Tags (not classes): `auto` (Draw for me/Template Ring), `keys` (keyboard-drawn), `cw/ccw`.

### 5.3 The three judges (each a different formula; they never agree)
Let `Qraw = 100 - 6*devPct - 0.8*gapPct - 6*crossings`.
- **Quince**: `Q = clamp(Qraw, 3.00, 99.99)`.
- **Brume**: `B = clamp(100 - 0.6*Qraw + min(18, 4*hesitations + 20*speedCV), 3.00, 99.99)`. She loves what he hates. Overrides: SCRIBBLE -> `B` in 96..99.6 (the **first** scribble of a mount is exactly **98.40**); SQUARE -> exactly **99.99**; PERFECT -> `B = clamp(100 - Qraw + 40, 3, 60)` (she is unmoved).
- **Hob**: `hash(bbox quantised to 0.01, round number, mount seed) -> 20..96`, then `+ 0.15 * tenderness`, clamp 20..99.5. Hob never explains.
- **Spread guarantee** (never agree): if `max-min < 25`, push Brume away from Quince then Hob the opposite way until it is >= 25; pairwise differences are always >= 7. Exceptions: DQ (all three show "DQ"), Missing Sock (all 100.00), Conceptual Circle.
- **Official Score** = mean of the three, shown to `D` decimals. `D = 2`; creep: 3 decimals from submission 6, 4 from 12, 5 from 20 (each with a footnote line, bank `m.decimal`). Paddles show the same `D`. It is stamped with a rubber-stamp animation (`stamp` sfx), text `PROVISIONAL` (variants below).

### 5.4 Special outcomes
- **PERFECT = DISQUALIFIED**: siren light on the bench (🚨 flashing, bench shakes 2 frames), all three paddles flip to the same DQ card (the only time they agree, so the Consensus meter shows **100.0%** for 1.2 s, tiny gasp sfx `blip`, then returns to 0.0% with caption `This did not happen.`), stamp reads **SUSPICIOUSLY PERFECT**, `sfx('error')`. Awards: 0 Meh for the circle plus **12 Meh** "cooperation payment". The circle is impounded into the Evidence Bag (max 6 shown, FIFO). Ledger `Unanimous: 1 of N` (see 9.4). Tenderness -3.
- **SCRIBBLE = PRAISED**: highest panel scores, all three judges stand (CSS bounce), `sfx('tada')` then `fanfare` for the first one of a mount, Management mood proud. Critique includes "a bold reading of circularity". Added to the Gallery.
- **Technical Foul**: a Standing Order was broken (section 8). Scores and critiques unchanged, award for that verdict is 0, stamp text `TECHNICAL FOUL`.
- **Dot, Line, Square, Fig8, Open C, Spiral, Huge, Tiny, Egg** have their own shape banks (section 14).
- **Draw for me / Template Ring** circles are scored normally (they are `auto`).

### 5.5 Verdict reveal timeline (cancel everything if a new stroke starts or the module is destroyed: check a `verdictId`)
- 0 ms: input stays live. Caption strip: `The panel confers.` Canvas stroke recoloured coral.
- 400 ms: drumroll: 3 `tick` sfx 120 ms apart (Beat 8+: one soft `tick` only).
- 900 ms: Quince's paddle flips (`rotateX`, rubber-bounce). Red-pencil ticks drawn at the 3 worst-deviation points; dotted line between start and end with hand-lettered `%GAPMM%mm`. His critique types under his paddle.
- 1350 ms: Brume's paddle flips. Lilac glow behind the 3 deepest hesitation points (speed dips). Critique types.
- 1800 ms: Hob's paddle flips. A mustard ring (his "reference snack", radius `meanR*(0.7+hashfrac*0.7)` centred on the centroid) is drawn around the stroke; it fails to match. Critique types.
- 2400 ms: Official Score counts up and the stamp slams (scale 2.2 -> 1, `stamp` sfx), footnote appears.
- 2800 ms: Management speaks one `api.say` (the verdict summary or a judge line with `who:`), priority 1, mood by outcome (proud on scribbles, panic on perfects, confused on dots, smug on mediocre).
- Reduced motion (`prefers-reduced-motion` or `api.selftest`): flips become fades, timeline shortened to 40%.
- Typewriter: a single managed interval (24 ms/char, 3 characters per tick), cleared on destroy and on any new verdict.

---------------------------------------------------------------------

## 6. Tenderness, tiers and the room

Hidden `tenderness` 0..100 shown as a heart thermometer labelled `Tenderness (Unofficial)`.
- Per submission: `+8`; `+5` extra for the first of each category this mount; `-3` for a PERFECT (the judges get suspicious, not softer); `+10` for a DOT. Technical fouls add the base +8 anyway.
- **Time curve** (so the 10-minute arc holds regardless of how fast the player draws): `tenderness = clamp(tenderness, floor(et), cap(et))`, where `et` = module elapsed seconds * `K` (`K = api.selftest ? 8 : 1`; using `api.now()`):

| et (s) | floor | cap | tier |
|---|---|---|---|
| 0-180 | 0 | 24 | 1 Stern |
| 180-300 | 25 | 49 | 2 Mixed |
| 300-390 | 50 | 74 | 3 Tender |
| 390-480 | 75 | 99 | 4 Tearful |
| 480-570 | 75 | 100 | 4 until the moment |
| 570+ | 100 | 100 | 5 Bagel (fires on the next submission) |

- Tier from tenderness: 0-24 Stern, 25-49 Mixed, 50-74 Tender, 75-99 Tearful, 100 Bagel. A player sitting at a cap sees the thermometer "held in escrow" (Management may say so once).
- **Tier 5 Bagel**: the next submission whose updated tenderness is 100 triggers the Bagel Moment (section 11.1). Tenderness then resets to 70 and `protocol = true`; tenderness stays 70 from then on (tier 4 look).

### The escalating room (CSS classes on `wrap`, never on body)
- `t2` (Mixed): nothing visual except warmer desk trim.
- `t3` (Tender): warm vignette (radial-gradient mustard/rose) fades in around the bench; paddles gain soft shadows.
- `t4` (Tearful): bench lights dim to 70% (filter on the bench only); 3 small 💧 spans animate from the avatars (one per judge, CSS keyframes; reduced motion = static).
- `spot` (Bagel Moment): the canvas dims; a spotlight cone (`conic-gradient`) lands on Hob; his apron falls (`translateY`); paddles show 🥯.
- `protocol`: persistent cream bagel hole on the canvas (see 11.2); `returning`: after the ceremony.

---------------------------------------------------------------------

## 7. Beat timeline and state machine

States (module-level `mode`): `normal` -> (Bagel Moment) `protocol` -> (ceremony) `returning`. Orthogonal short-lived set pieces share one mutex `busy` (see Risks): `idle-event`, `spam-event`, `quarantine`, `sock`, `bagel-moment`, `ceremony`, `appeal-form`, `reverse`. A set piece never starts while another holds `busy`; queued ones are dropped (except the guaranteed sock, which retries on the next submission).

Beats are driven by `et` (module elapsed * K), **applied at transitions** (after a verdict or at module start) so nothing changes mid-reveal. Each beat's intro is a one-time Management line (`m.beat`).

| Beat | et | What turns on |
|---|---|---|
| 1 The Tribunal Assembles | 0-30 | Scripted intro: Management welcome at 1.0 s, then the three introductions 3 s apart (each judge slides in), canvas caption `Please draw a circle. Do not draw a circle that is a different shape.` First joke before the first stroke. |
| 2 Stern Tier | 30-60 | Professional, brutal, shape-specific critiques (first shape-flavoured lines). |
| 3 The Disagreement Becomes Visible | 60-120 | Needle strains, sweat-drop 💦 appears, interjections (judges cite each other, 35% per verdict), the **Appeal** button appears with a NEW sticker. |
| 4 The Perfect Circle Trap | 120-180 | **Template Ring** offered (announcement line). First PERFECT -> sirens, 100.0% for 1.2 s, Evidence Bag appears. If no DQ by 150 s: the "bag ready" nudge. |
| 5 Mixed Tier and Sandra | 180-240 | Sandra's first **Standing Order** (section 8). Orders rotate every 2 submissions. Tier 2 floor. |
| 6 The Scribble Revelation | 240-300 | Gallery of Bold Readings visible (empty frames with "Bring us a scribble" until you do). First scribble ovation if not yet seen. Click a frame: a judge reads the plaque. |
| 7 Tender Tier | 300-390 | Critiques soften, vignette, judges ask about your day. **Dennis** takes his seat in the gallery (🌱 with an audience badge). |
| 8 The Tearful Tier and Gerald | 390-480 | Judges cry (tears in 3 styles: Quince one precise tear, Brume theatrical, Hob into his apron). **Gerald** rolls in (<= 2 times, abstains). Quiet single `tick` replaces the drumroll. **Intermission** button appears. |
| 9 The Bagel Moment | 480-570+ | First submission with tenderness 100 (section 11.1). |
| 10 The Bagel Protocol | after 9 | Bagel hole on every canvas, judges swap seats and critique styles, hole-less snacks, rounds eventually "Round 1 (Returning)", title becomes `Circle Associate (Retired)`, Closing Ceremony offered. |

**Management cadence**: guarantee a Management line every 12-15 s (random in that range). A managed interval checks the time since the module's last `api.say`; if exceeded, say a `m.nothing` line (priority 0, mood varies). Reset on every say. Verdict summaries are priority 1; set pieces priority 2.

**Milestones** (Management, once each): circles submitted 5, 10, 25, 50, 100 (bank `m.milestone`). Meh balance >= 250: once per 10 verdicts replace a `m.nothing` line with the Sandra Meh line.

---------------------------------------------------------------------

## 8. Standing Orders (Sandra)

From Beat 5 (et >= 180) one **Standing Order** is active at a time, read aloud when it begins, shown on a small clipboard strip above the canvas (`Standing Order N: ...`). The order changes every **2 submissions**. Orders 1 to 8 are **really enforced** (real detection on the submitted stroke; ignored for DOT/TINY/auto strokes except as noted). Breaking one = **Technical Foul** (0 Meh for that verdict, `TECHNICAL FOUL` stamp, a `m.foul` line). Orders 9+ are decorative (never enforced, Sandra "will advise").

| # | Text (verbatim, section 14) | Detection |
|---|---|---|
| 1 | no circles drawn clockwise before noon | `cw` is a foul. The Tribunal clock (a small CSS clock face labelled `11:42 AM`) never changes: it is always before noon. Do not use `Date`. |
| 2 | must not touch the border | `touchesEdge` |
| 3 | drawn with feeling, but not that feeling | foul if `speedCV < 0.15` ("no feeling") or mean speed > 900 px/s ("that feeling": haste) |
| 4 | must enclose the decorative dot | `!enclosesDot` |
| 5 | must begin at the top | `!startTop` |
| 6 | smaller than a saucer | `meanR > 0.38` |
| 7 (7 1/2) | counter-clockwise on Tuesdays | `cw` is a foul (it is always Tuesday-adjacent) |
| 8 | not in under two seconds | `secs < 2` |
| 9+ | decorative | none |

---------------------------------------------------------------------

## 9. Economy, idle, spam, wipes, stats, save

### 9.1 Meh (all tiny; the Docket says `Meh earned today: see Management`)
- Per submission: first of each of the 13 shape classes pays **6**; repeats pay 0.3-1.2 (`0.3 + api.rand()*0.9`). DQ pays **12** (circle itself 0). Dot 0.3 (first 6). Technical Foul 0. The Bagel Moment **30**. Sock 25 (+25 from the achievement). Reverse Tribunal 8. Wipes 0.1 (first 3 only). In `returning` mode every submission pays a flat **0.3**.
- Appeal: fee `api.award(-5)` then immediate `api.award(5)` ("refunded, net 0"), narrated as net 0.
- Achievements pay their own `reward`; never double-pay.
- During spam congestion / quarantine, submissions pay 0.

### 9.2 Spam (secret 2 variant)
Rolling window of stroke events (4.4):
- **>= 12 in 8 s** -> `Circle Congestion`: a bell sfx, the 🦉 Rate Limit Officer lands on the desk, `api.award(-3,'Circle Congestion Charge')` (refunded as +3 "a courtesy" on the next verdict), all three paddles flip to blank cards reading `ONE AT A TIME`, judges critique the speed (`m.spam`, `q.spam`, `b.spam`, `h.spam`), achievement `draw-a-circle.congestion`. Congestion lasts 5 s; strokes inside it are accepted visually but not scored or paid.
- **>= 40 in 20 s** -> Hob's **Tired Sigh**: three-stage sound (`sad`, then `whoosh` 700 ms later, then `sad` 700 ms later) with a 💨 puff animation and caption, then **Circle Quarantine** for 6 s: `QUARANTINE` overlay on the canvas, drawing disabled (pointer and key drawing ignored, **all buttons stay clickable**). Ends with a Management line. Always ends via `api.setTimeout`.
- Spam never blocks Exit or crashes; the harness fires 25-70 clicks in a burst, both thresholds will trigger, so every spam path must be idempotent and capped (DOM, award, say).

### 9.3 Idle (secret 1; see 11.5) and Wipes
- **Wipes**: Clear Table / Escape. First 3 pay 0.1 and read `m.wipe`. The 4th and later read `m.wipe.over` and pay 0. Counter resets only on remount.
- **Long idle**: 60 s with no pointer/key/button activity inside `root` (use `api.selftest ? 20000 : 60000`), once per mount; again at 5 minutes of continued idleness (resets only if active in between and a new 5 minutes elapses). Triggers the Reverse Tribunal (11.5) if `busy` is free.
- **Hidden tab**: all gameplay timers are managed; nothing time-critical depends on visibility.

### 9.4 Ledger
`Unanimous: U of N` where N = verdict count and U = the number of unanimous events (DQs and the Sock). It is displayed with ceremonial pride even at 0 of 40; Management sometimes celebrates the ratio (`m.unanimous`). The Missing Sock revocation does not decrement it (the sock was never counted).

### 9.5 Stats (`api.stat.inc`)
`draw-a-circle.drawn` (every submission), `.perfects`, `.scribbles`, `.dots`, `.appeals`, `.bagels`, `.consensusEvents` (DQ unanimity, ceremony ribbon), `.fouls`, `.wipes`, `.spam`, `.quarantines`, `.socks`, `.idle`, `.ceremonies`, `.templates`, `.autos`, `.plagiarism`, `.conceptual`, `.gallery`. `api.stat.max('draw-a-circle.bestStreak', n)` optional. Under 300 names; use these only.

### 9.6 Save (`api.save`, JSON only, integers, no NaN)
`visits` (number), `drawn` (lifetime), `impounded` (count), `bagels`, `ceremonies`, `conceptual` (bool), `evidence` (<= 6 thumbs, each an array of 48 ints in 0..1000: 24 x,y pairs), `gallery` (<= 12 `{p:[48 ints], c:className, n:number}`), `pantry` (count of bagels). Write on destroy and every 5th submission (and after the ceremony). Hall of Fame text is always `Best Circle: Undetermined`.
- Callbacks: if `ceremonies > 0` the run starts with the sincere `We missed you` lines enabled; if `visits > 0` Management greets with the returning line; flags: read `metGerald`; write `draw-a-circle.bagelSeen` = true after the Bagel Moment, `draw-a-circle.hobStoodUp` = true.

---------------------------------------------------------------------

## 10. The Appeal button (running gag 3)

Visible from Beat 3 (NEW sticker the first time). Always clickable, always does nothing, with escalating bureaucracy and **net 0 Meh** fees (`api.award(-5)` immediately followed by `api.award(5)`). Count presses in `appeals` (save is per-mount; stat is global).
1. **Form 27B/6**: a paper panel (in-root) with three comedic checkbox grounds (real `<input type=checkbox>` with labels; picking is optional) and a `File Appeal` button. On file: `m.appeal.logged`, then after 1.2 s a denial from the shuffle bag `ap.denied` and the fee refund line.
2. **Form 27B/7**: paper is charred/blank with a stamp `DESTROYED 1998` and one checkbox (`I accept that this form does not exist`). Submit -> `ap.destroyed`.
3. **A form to request the form**: Form 27B/7(a) with two checkboxes; submit -> `ap.request`.
4. and later: **the Appeals Office is at lunch**: no paper. A 3-frame lunch animation: a 🥪 travels across the Appeal button (3 CSS steps), the button label becomes `Appeals Office (At Lunch)` but remains clickable; each press reads from `ap.lunch`.
5. **From the 6th press, or after the Bagel Moment**: the Appeals Office clerk is revealed to be **The Stapler**. Each press: `ap.stapler` template with a unique demand from the list (never repeated until all 8 are used). After the Bagel Moment: `ap.bagel` (the Office returns from lunch with a bagel and still denies).
Achievement `draw-a-circle.appeal` at the 4th appeal. Appeal is also **free to ignore**: nothing depends on it.

---------------------------------------------------------------------

## 11. Set pieces, secrets and rare events

### 11.1 The Bagel Moment (beat 9, once per mount, `busy`)
Trigger: tenderness reaches 100 on a submission (a real circle is not required; whichever circle crosses 100). Sequence over about 12 s (managed timeouts, cancellable):
1. Room goes quiet (all sfx muted for the module except the final), canvas dims, spotlight cone on Hob.
2. Management: `m.bagel.1` ("Hob has stood up...").
3. Hob's apron falls, he puts the snack down (`m.bagel.snack`).
4. Hob says the bagel line (`h.bagelline`). All three paddles flip to 🥯 simultaneously.
5. Consensus meter reads 0.0% with caption `0.0% (in total agreement, which is nothing)`.
6. `api.confetti(...)` (default colours), `sfx('fanfare')`, `api.award(30,'Bagel')`, `api.achieve('draw-a-circle.bagel')`, `api.stat.inc('draw-a-circle.bagels')`.
7. Management: congratulations line, `m.bagel.protocol`, `mode = 'protocol'`, tenderness = 70, snacks become hole-less.
This does **not** count as consensus (Unanimous unchanged).

### 11.2 The Bagel Protocol (beat 10)
- Every canvas now carries a pre-printed **bagel hole**: a cream circle (radius 0.07, centred at (0.5,0.5), canvas radial gradient plus soft shadow) drawn first in every redraw. The compass dot is replaced by it.
- Detection on submit (resampled points): any point within 0.07 of centre = **through the hole** ("a controversial seed"); else if the polygon encloses the centre = **around** ("on-brand"); else **beside** ("a bold choice"). Add a one-line Management reaction in `m.hole.through|around|beside`.
- **Judges swap seats** (CSS `order`; the nameplates travel with them). Critique styles swap: **Hob is strict** (uses `h.stern.generic` plus `h.protocol`), **Quince weeps** (uses `q.tearful.generic` plus `q.protocol`), **Brume reads a spreadsheet** (uses `b.protocol`).
- The Consensus meter is replaced by a smaller meter with `No Opinion` written on it (still straining, still 0.0%).
- After **10** protocol submissions the counter reads `Round 1 (Returning)` (then `Round 2 (Returning)`...), and the player title becomes `Circle Associate (Retired)` (Management says it). The Closing Ceremony button appears after 3 protocol submissions.
- It continues forever with new Standing Orders (9+ cycle) and new baked goods (Hob's snack list may add `🥯 a bagel` as a joke once the ceremony has happened).

### 11.3 Gerald (beat 8, <= 2 times per mount)
A 🥔 slides onto the fourth stool. On the next verdict Gerald abstains with a line from `g.abstain` (instead of a fourth paddle: a speech card). If `api.flag.get('metGerald')` the line is `g.met` and his "score" is exactly **Potato**. He leaves after the verdict. Not during busy set pieces.

### 11.4 Gallery of Bold Readings and Dennis
SCRIBBLE, SPIRAL, FIG8 and SQUARE strokes are added to the Gallery (<= 12 framed thumbnails drawn from the 24-point arrays, plaque text from `plaque.names` with `%N%`). Click a frame (real button): a judge (round robin) reads the plaque aloud via `plaque.read.q|b|h`. Dennis sits in a tiny chair at the right end from Beat 7. On a Dot he leans in (CSS tilt for 3 s) and Management reports it.

### 11.5 Secret 1: the Reverse Tribunal (long idle)
After 60 s idle (`busy` free): the judges fall asleep one at a time (💤 Zs float up, 😴 faces, Hob's snack falls: `m.idle.*`), the Bench goes quiet, Brume quietly draws a circle of her own on a card and holds it up. A modal-free in-root panel appears: `The judges would like YOU to score THEIR circles.` Three judge-drawn circles (seeded wobble, SVG polylines) with a 1..10 star scale each (three rows of 10 small real buttons). When all three are scored (or `Skip` is pressed, which scores nothing but ends the event) each judge replies `exactly what I was afraid of` or `exactly what I hoped for`, always the **opposite of what that judge said last time** (first time: afraid). `api.award(8)`, achievement `draw-a-circle.reverse`, Management whisper `You have been drafted. This is a promotion. It is not a promotion.` Judges wake, remember nothing, slightly embarrassed.

### 11.6 Secret 2: Spam (9.2). Secret 3: The same circle twice
Compare each submission with the previous one: resample both to 24 points in **canvas coordinates** (not centroid-normalised), take the minimum mean point distance over start offsets and both directions, divided by `meanR`; if `< 0.07` it is a copy. Tracing the ghost (hold G) does it; Template Ring twice does it. The judges accuse the player of "plagiarising yourself": an inquiry, the Evidence Bag opens (and is empty), Hob admits he copies his own scores (`plag.*`). **Three copies in a row**: Quince "a body of work", Brume "an oeuvre", Hob "a menu"; achievement `draw-a-circle.plagiarist`. Counts reset on any non-copy.

### 11.7 Secret 4: The Missing Sock
`api.chance(1/50)` on any submission (not DQ, not during `busy`), and **guaranteed once** after the 40th submission of a mount if not yet seen. Sequence: lights flicker (CSS), 🧦 walks across the canvas leaving a faint dotted trail (CSS keyframes, 3 s), all three paddles flip to **100.00%** (the only unanimous perfect score), Management says it is not a circle (`sock.lines`), the scores are revoked by a rubber stamp `REVOKED`, the sock waves, `sfx('honk')`, toast `Missing Sock Sighting 1 of 1 (Unofficial)`, `api.award(25)`, achievement `draw-a-circle.sock`, `api.stat.inc('draw-a-circle.socks')`, `draw-a-circle.consensusEvents`. The sock is never mentioned again that mount.

### 11.8 Bonus rare events
- **Square-ish** (SQUARE): Quince "a circle with commitment issues", Brume exactly **99.99** for bravery, achievement `draw-a-circle.square`.
- **Straight line** (LINE): "a circle seen from the side".
- **Dot** (DOT): Quince sits down, Brume 92-ish, Hob ~40; Dennis leans in. **Three dots in a row**: Hob calls it "a very small bagel", achievement `draw-a-circle.radiuszero`.
- **Figure eight** (FIG8): the judges argue whether it is one circle or two ("a pair of circles in a committee").
- **Conceptual Circle**: press Present to Panel (or Enter on the canvas) with **no stroke** 3 times in a row (each press says a different escalating reaction, `m.concept.press`). On the third: all three paddles flip to 100.00 (not DQ, "there is nothing to disqualify"), the canvas becomes a museum plaque `Untitled (Circle That Is Everywhere)`, stamp `ACQUIRED`, achievement `draw-a-circle.conceptual`, once per save (`save.conceptual`); later reads `Already acquired by a private collector (Gerald).`
- **Keyboard polygon**: strokes tagged `keys` sometimes get a `q.keys`/`h.keys` line.
- **Resize** (window narrower than 420 px after mount): judges whisper once (caption `shh`) and **wider than 1300 px**: they shout once in all caps. Each once per mount (`m.resize.*`).
- **Hold G**: first use gets a one-time hint line (`m.ghost`).

---------------------------------------------------------------------

## 12. The not-ending: Closing Ceremony

After the Bagel Moment and 3 Protocol canvases, a `Conclude Proceedings (Optional)` button appears. Pressing it (`busy`, ~40 s, cancellable by destroy only) runs a step list (managed timeouts, all lines in `ceremony.*`):

| t (s) | Beat |
|---|---|
| 0 | Management announces; input locked (buttons except Exit remain usable but ignored); judges rise (CSS). |
| 4 | Judges stand. Hob has been standing since the bagel. |
| 8 | Eulogy: Gerald (if `metGerald`) reads `We were all, once, almost round.` else Dennis submits a eulogy "a single leaf" read by Management. |
| 14 | The Consensus meter is awarded a gold ribbon (reads 0.0%, never prouder). `consensusEvents` +1. |
| 20 | The Evidence Bag is ceremonially opened: it contains a smaller, even more suspicious bag. |
| 26 | Dennis named Honorary Fourth Judge. |
| 30 | A certificate prints in CSS paper: `THIS CERTIFIES THAT {PLAYER} HAS DRAWN A CIRCLE. THE CIRCLE IS ON FILE. THE FILE IS A CIRCLE.` (use `api.player.name`, `overflow-wrap:anywhere`, name upper-cased). |
| 34 | Management: `Congratulations. You have completed the Tribunal. The Tribunal has not completed you.` |
| 36 | Hob hands over a real bagel (emoji): added to the **Pantry** (a row that does nothing; count saved). |
| 40 | Lights up, canvas clears, judges are sitting in each other's seats and say in unison `Shall we begin?` |

Then `mode = 'returning'`: Round 1 (Returning), all previous lines replaced by the tenderer returning set (`*.returning`), the Consensus caption `Welcome back.` with value 0.0%, score unaffected, Meh flat 0.3. Each judge now sometimes (1 in 6 verdicts) says `We missed you`, **immediately followed by Quince saying `Circle, please.`** (the one sincere line in the module). Achievement `draw-a-circle.ceremony` (reward on unlock only once), `api.stat.inc('draw-a-circle.ceremonies')`, save `ceremonies`/`pantry`, `api.confetti()`. If `ceremonies > 0` already at mount, the sincere lines are enabled from the start.

---------------------------------------------------------------------

## 13. Achievements (ids prefixed `draw-a-circle.`; >= 6, 7 secret)

`P.addAchievements([...])` with `reward` small. Icons all Emoji 12 or older.
| id | name | desc | secret | reward |
|---|---|---|---|---|
| `draw-a-circle.first` | Grand Laureate of Approximate Roundness | Submit your first circle to the Tribunal. It will be called a circle by at least one of three people. | no | 1 |
| `draw-a-circle.bold` | Imperial Ambassador of the Bold Reading | Draw a scribble with at least six self-intersections and have it praised as a bold reading of circularity. | no | 3 |
| `draw-a-circle.perfect` | Duke of Suspicious Perfection (Honorary, Pending Investigation) | Get a circle disqualified for being suspiciously perfect. The bag is yours to keep. The bag is not yours to keep. | no | 3 |
| `draw-a-circle.bagel` | Most Esteemed Defender of the Bagel Hypothesis | Cause Judge Hob to say that your circle reminded him of a bagel. This is not a sentence the game can take back. | no | 5 |
| `draw-a-circle.foul` | Technical Foul, Technically | Receive a Technical Foul. Nobody was fouled. The foul is being held for evidence. | no | 1 |
| `draw-a-circle.appeal` | Chancellor of the Unappealable Appeal | Appeal four times. The Appeals Office is at lunch. It has been since a Tuesday we do not discuss. | no | 2 |
| `draw-a-circle.auto` | Management Insists | Let Management draw a circle for you. It was genuinely mediocre. It was Management's best. | no | 1 |
| `draw-a-circle.retired` | Circle Associate (Retired) | Reach Round 1 (Returning). Enjoy your retirement from nothing. | no | 5 |
| `draw-a-circle.ceremony` | The Tribunal Has Not Completed You | Conclude Proceedings. Proceedings conclude. They continue. | no | 7.5 |
| `draw-a-circle.reverse` | The Reverse Tribunal (Secret) | Idle for sixty seconds until the judges fall asleep and ask you to score their circles. You scored. They were afraid. | yes | 4 |
| `draw-a-circle.sock` | Witness to the Sock, Unofficial Registrar of the Missing (Secret) | See the Missing Sock cross the canvas, receive the only unanimous 100.00% in the history of the Tribunal, and then see it revoked. | yes | 25 |
| `draw-a-circle.congestion` | The Congestion Charge (Secret) | Draw circles faster than the Tribunal can be circled. An owl will be called. The owl is tired. | yes | 3 |
| `draw-a-circle.plagiarist` | Self-Plagiarist of the Year, Retroactively (Secret) | Draw the same circle three times in a row. It is a body of work. It is an oeuvre. It is a menu. | yes | 4 |
| `draw-a-circle.radiuszero` | Archduke of Radius Zero (Secret) | Submit three dots in a row. Technically sound. Technically very small bagels. | yes | 3 |
| `draw-a-circle.conceptual` | Untitled (Circle That Is Everywhere) (Secret) | Present an empty canvas three times. The panel will look at it for a long time. | yes | 4 |
| `draw-a-circle.square` | A Circle With Commitment Issues (Secret) | Draw a square-ish stroke and receive 99.99 from a judge for bravery. | yes | 3 |

Unlock: `first` on the first submission; the rest manually via `api.achieve(...)` at the described moment (cheap `check` functions on stats are allowed for `appeal`, `ceremony` only if convenient).

---------------------------------------------------------------------

## 14. All lines (final, verbatim)

### 14.0 How to use the banks
- Each `###` heading is a **bank id**. Register Management banks with `P.addLines('m:draw-a-circle:<bank>', [...])`, or keep them inline as JS arrays (lint counts line-like strings either way; the engine falls back to a generic line if a category is empty, so register every bank you speak). Judge banks are spoken with `api.say(text, {who:'Dr. Ferrule Quince' | 'Lady Odalys Brume' | 'Hob' | 'Gerald' | 'Sandra', mood, priority})` and also typed under the judge's paddle.
- **Placeholders** replaced by your own `fill(text, ctx)` BEFORE `say` (never pass a string with a leftover `%...%` to the UI; after filling run a final `replace(/%[A-Z]+%/g, '')` as a safety net and fix the cause in tests):
  `%Q% %B% %H%` (each judge's score with its decimals and a trailing `%`, e.g. `61.37%`), `%OFF%` (Official), `%CIRC%` (one decimal, no sign), `%DEV%` (one decimal), `%GAPMM%` (one decimal), `%CROSS%` (integer), `%PR%` (one decimal), `%ASP%` (two decimals), `%SECS%` (one decimal), `%HOLEPCT%` (integer), `%N%` (submission number), `%UN%` (unanimous events so far), `%WIPE%` (wipe count), `%SO%` (standing order label), `%PLAQUE%`, `%DEMAND%`. Engine tokens `{player}`, `{count}`, `{meh}` go through `api.line`/`sayRandom`.
- Write every line as a double-quoted JS string with straight quotes. No em dashes. Keep lines as given (do not paraphrase).
- Selection: critiques come from per-bank shuffle bags (`api.shuffle`, never the same line twice in a row per bank). Order of preference: special outcome bank (DQ/foul/sock/concept) > Bagel Protocol bank (50%) > shape bank (75% for PERFECT/SCRIBBLE/DOT always, else 50%) > hesitation/speed bank (35% when relevant) > tier bank (tier 1-4, or the `returning` bank 45% in returning mode) > interjection (35% from Beat 3).

### Management: opening and filler
**m.welcome** (first line, at ~1.0 s, mood proud)
- "Welcome to the Tribunal of Circularity. Please draw one circle. A panel of three experts will be unable to agree about it."
- "Welcome back to the Tribunal. The panel has retained all of its disagreements and kept your seat warm."
- "Draw a circle. Do not draw a circle that is a different shape. Sandra has flagged the second thing."

**m.intro** (spoken as Management, one per judge, 3 s apart)
- "Dr. Ferrule Quince, Geometry. Credentials: one compass, one monocle, no hobbies."
- "Lady Odalys Brume, Feeling. Credentials: a hat, and a strong sense that she was there."
- "Hob, Third Chair. Credentials: undisclosed. He is holding a snack. The snack is not a credential."
- "The judges have been selected on the basis of their strong opinions and their weak availability."

**m.nothing** (the 12-15 s guarantee; mood varies)
- "Nothing has happened. Management is reporting this as progress."
- "The Consensus meter has not moved. The meter would like it noted that it is trying."
- "At this time the canvas remains blank. The blank is being held in high regard."
- "Per my previous message: please draw a circle. Per this message: no pressure."
- "Management has circled back. Management was not aware there was anywhere to circle back to."
- "The panel is conferring. The panel is also looking at a snack. These are the same activity."
- "A circle is a line that has made a decision. Please make a decision at your convenience."
- "Sandra has flagged the silence. The flag is the correct size this time."
- "Please note the dot in the middle is decorative. It has been told."
- "The canvas is the size of a dinner plate. Management was assured it would not be eaten off."
- "Management is not worried. Management has simply moved the phone closer."
- "It is 11:42 AM on the Tribunal clock. It has been 11:42 AM since the Tribunal opened."
- "Judge Hob has asked whether circles are served warm."
- "In the interest of transparency, nobody here knows what a hundred percent looks like."
- "Dennis (Plant) is not in the room yet. Dennis (Plant) has been told there is a room."

**m.first** (after the first verdict)
- "The first circle has been received. Please hold while three people have three separate feelings."
- "Your first circle has been entered into the record. The record has been asked to be gentle."

**m.consensus** (every third verdict; also drive the caption bank below)
- "The Consensus meter reads 0.0%. This is the fourth consecutive 0.0%. The meter has asked for a ribbon."
- "Please note the judges will not be reaching agreement at this time or at any time in the foreseeable Tuesday."
- "The meter has been moved to a quieter meter."
- "The meter is thinking about a career in other things."
- "The Consensus meter reads 0.0%. The needle is straining. We are proud of its effort and concerned about its posture."

**caption.consensus** (shown under the meter; always value 0.0%)
- rounds 1-2: "0.0% (agreement not yet established)"
- rounds 3-5: "0.0% (agreement is currently under review by agreement)"
- rounds 6-8: "0.0% (the needle has asked to be moved to a different meter)"
- rounds 9-12: "0.0% (the needle is no longer straining; it is simply leaning)"
- rounds 13+: "0.0% (the needle has been given a small chair)"
- tender tier: "0.0% (in loving disagreement)"
- Bagel Moment: "0.0% (in total agreement, which is nothing)"
- after a DQ unanimity: "This did not happen."
- Protocol meter: "No Opinion"
- returning: "Welcome back."

**m.beat** (one per beat, once each)
- B2: "The panel is professional and brutal about the specific flaw each was built to hate. This is a job description, not a mood."
- B3: "The judges have begun referring to each other's scores. Management has asked them to do this less personally."
- B3 appeal: "A first Appeal has been unlocked. It has a sticker. The sticker says NEW. The sticker has not been used before and is excited."
- B4: "A Template Ring is available. It is free. It is gold. Sandra has been told, and Sandra has gone quiet."
- B4 nudge: "We are not saying try to be perfect. We are saying we have a bag ready."
- B6: "The Gallery of Bold Readings has opened. Admission is free. Wine is not available. Nothing is available."
- B7: "Management has noticed the judges are being kind. Management has asked them to stop. Management has been ignored."
- B7 Dennis: "Dennis (Plant) has taken a seat in the gallery. Dennis is thriving. Dennis has an audience badge. Dennis has not yet clapped."
- B8: "The judges have asked for a short break. One of them is crying into an apron. We will not say which."
- B8 Gerald: "Gerald, Vice President of Spuds, has arrived. He is a potato. He will not be scoring."
- B8 piano: "The drumroll has been replaced by a single tick. The tick has asked to be treated with respect."
- B7 escrow: "Tenderness is held in escrow until the next tier. Escrow is a small room with a clock in it."

**m.decimal** (when the decimals grow)
- "The Official Score now has a third decimal. Precision is a form of kindness, per Dr. Quince, who is not kind."
- "A fourth decimal has been added. It is free. Dr. Quince insists the extra decimals are free."
- "A fifth decimal has been added. We are very sure. We have never been less sure about a number."

**m.foot** (small print under the stamp, rotates)
- "Rounded for your comfort. Your comfort was not consulted."
- "Averaged from three opinions that will not speak to each other at lunch."
- "This number is final until the next number, which will also be final."
- "PROVISIONAL, pending a review of the pending review."
- "The mean of three people who have never once been mean."
- "Calculated to the nearest decimal by a committee that cannot count to three."

**m.milestone** (5, 10, 25, 50, 100)
- "Five circles submitted. The panel has formed an opinion about you. The opinion is under review by the opinion."
- "Ten circles. That is a decade of circles, if a year were one circle long."
- "Twenty-five circles. Sandra notes that you are now a statistic. It is a good statistic and it does not know what it means."
- "Fifty circles. You are now a Senior Associate of Circles. There was never a junior associate."
- "One hundred circles. This number has no particular significance. Please draw another."

**m.sandrameh** (when `api.meh() >= 250`, at most once per 10 verdicts)
- "Sandra notes you have accumulated Meh. Meh is only ever on loan."

### Stamp and paddle texts (not spoken)
- Official stamp: `PROVISIONAL`, `PROVISIONAL (STILL)`, `PROVISIONAL (FOR NOW, FOREVER)`; DQ: `SUSPICIOUSLY PERFECT`; foul: `TECHNICAL FOUL`; sock: `REVOKED`; concept: `ACQUIRED`.
- DQ paddle card: `DQ`. Spam paddle: `ONE AT A TIME`. Gerald paddle: `Potato` (met) or speech only.
- Idle paddle placeholder: `--.--`.

### Quince (Dr. Ferrule Quince): tier banks
**q.stern.generic** (tier 1)
- "A gap of %GAPMM% millimetres between beginning and end. In a circle, that is not an opening. That is a draught."
- "Your circle is %CIRC% percent circular. The remainder is, I assume, a personal matter."
- "I measured it twice with the compass. The compass asked to be excused."
- "Radius deviation of %DEV% percent. I will say nothing further, because I have already said %DEV%."
- "The ruler has been consulted. The ruler has no further comment and would like to go home."
- "Radial drift of %DEV% percent. A circle is meant to be the same distance from everywhere. This is the same distance from nowhere."
- "I have scored this %Q% and I stand by the decimals, if not the circle."
- "At this scale the error is invisible to the naked eye. I am not naked. I am Geometry."
- "Noted: a wobble at about two o'clock. I have asked it to be at one o'clock. It has declined."
- "I have placed the circle in the scoring tray, which is also round, and the tray looked embarrassed."
- "%Q%. I considered a higher number and decided against it. I have a reputation."

**q.mixed.generic** (tier 2)
- "I find, to my surprise, that I have not minded the wobble. This is a finding, and I will deal with it later."
- "%DEV% percent deviation. I used to mind. I am minding less. Please do not mention this to the compass."
- "It is not round. It is, however, committed. I am scoring the commitment and then deducting for the roundness."
- "I have given %Q%. I had the number ready, then looked at the circle, and kept the number."
- "Hob's number is not a number. It is a mood with a decimal point. I note that for the record and then ignore it."
- "Please understand that measuring is how I say hello."
- "Your closure gap is %GAPMM% millimetres. I have decided to call it a window."
- "The Lady is wrong about this circle, and she is wrong in a way I find I do not wish to correct today."

**q.tender.generic** (tier 3)
- "I have been unfair. I have measured you as a circle, and you were also a person in a chair."
- "I would like to apologise for the monocle. It has been looking at you in an unfriendly way."
- "%Q%. I have written it down gently, in pencil, so that it may be revised."
- "Have you eaten? You are drawing with care. I am not allowed to say that."
- "I used to think a circle was a promise. I now think it is more of a suggestion with good intentions."
- "The compass has been put away. It was making things worse. It was making things measurable."
- "I mean no disrespect to the decimals when I say I have not thought about them in four minutes."
- "I have a spare handkerchief. The Lady has the other one. We are, in this one respect, coordinated."

**q.tearful.generic** (tier 4)
- "I wrote 'Form' on the scorecard and then I wrote 'ing'. I do not know what I meant. %Q%."
- "A single tear has formed, at a radius of approximately four millimetres. I am pleased with its roundness."
- "I cannot see the scale. I am scoring by memory. It is %Q%, or a feeling that rhymes with it."
- "Every circle I measured today was trying. I did not have a column for that. I have drawn a column."
- "It is a good circle and it is not a circle. I find I can hold both. I did not know I had hands for it."
- "I have measured so many things, and I have never once asked how they were."
- "The monocle has fogged. I do not think it is the weather."

**q.protocol** (Quince weeps, Bagel Protocol)
- "Around the hole. Correct. I am crying in a way that is technically within tolerance."
- "You have gone through the hole. I have no ruler for this. I am using my sleeve."
- "The hole is %HOLEPCT% percent of the canvas. I have measured the hole and now I must go and lie down."
- "I used to measure the circle. Now I measure the hole. It is the same job and I do not know who changed it."

**q.returning**
- "Welcome back. I have been measuring things on my own and none of them were you."
- "How have you been? I ask for the record and also as a person."
- "I have kept your last circle on the desk. It is not for scoring. It is for company."
- "Circle, please. And then tell me about your week."
- "I have not changed the monocle. I have changed my mind about the monocle."

### Quince: shape banks
**q.PERFECT**
- "This is wrong. I checked, and then I checked that I had checked. The circle is correct and I am upset."
- "No human draws a circle this round. I have drawn thousands. Mine are slightly worse and therefore honest."
- "Radius deviation: nothing. Closure gap: nothing. I am reporting a circle with nothing wrong, and I do not know what form that goes on."
- "I would like to see its compass. I would like to see its papers. I would like to sit down."

**q.SCRIBBLE**
- "%CROSS% self-intersections. I count a circle as having none. I count this as having a lot of opinions."
- "This is not a circle. This is a circle that has been in a meeting."
- "I have counted the crossings twice and the number changed. I am treating the second number as the opinion of the scribble."
- "Path length %PR% times the circumference. A circle is economical. This has been spending."

**q.DOT**
- "A radius of 0.0 millimetres. Zero percent error. I had to sit down."
- "A dot is a legitimate circle of radius zero. I have been informed that zero is a radius. I am processing it."
- "I have measured the dot. The dot is round to the limit of my instruments, and slightly beyond them."

**q.LINE**
- "This is a circle seen from the side, by someone who has not been listening."
- "A line. Aspect ratio effectively infinite. I have no further questions and one further feeling."

**q.OPEN_C**
- "A circle that gave up at the last moment. I have seen that gap before, in myself."
- "The ends do not meet. I have asked them to meet. They declined, citing differences."
- "A gap of %GAPMM% millimetres. I would call it a door, but nobody has been invited in."

**q.EGG**
- "Egg. You have drawn an egg and you have drawn it with confidence, which is worse."
- "An ellipse in denial. Aspect ratio %ASP%. Denial confirmed."

**q.SQUARE**
- "A circle with commitment issues. It has four corners and is pretending it did not notice."
- "Four vertices. A circle has an infinity of vertices and none of them show off."

**q.SPIRAL**
- "A spiral. The circle has been wound. Someone should unwind it, gently, with a spoon."

**q.HUGE**
- "The circle has touched the border. The border was touched without permission. The border is a minor."

**q.TINY**
- "I have been asked to score a circle I cannot see. It is %Q%, and I am being generous with my eyes."

**q.FIG8**
- "Two circles in a committee. I will score the committee."

**q.keys** (strokes drawn with the arrow keys)
- "An octagon. I will score the octagon. I will not discuss the octagon afterward."
- "A polygon with ambition. %Q%."

**q.spam**
- "I have received nine circles in four seconds. I am not a circle depot."

**q.bodyofwork**
- "A body of work."

### Brume (Lady Odalys Brume): tier banks
**b.stern.generic**
- "It is not round. It is round-adjacent, which is a feeling, and I rate feelings very highly."
- "I felt nothing, and then I felt that nothing was a lot of things. %B%."
- "I would give it a hundred, but I do not know what a hundred is. I have only ever heard of it."
- "This circle lacks a mother tongue. It speaks only geometry, and badly."
- "It trembles. So do I. We have a connection and it is not billable."
- "I felt a draught near the top left. I choose to believe that was you."
- "A fine circle for someone who has never been hurt. I am marking it %B%, as a comfort."
- "I do not care for how clean it is. It has never been misunderstood."

**b.mixed.generic**
- "I have a handkerchief and I have not yet used it. I am telling you this so that you can plan."
- "There is a weather in this circle. It is the kind of weather you apologise to."
- "I rated it %B% and then I rated the rating. The rating did better."
- "It is not a circle. It is a decision you made at a quarter past, and I am scoring the decision."
- "Please do not smooth it. The wobble is where you can be found."
- "Hob gave you a number that is not a number. I gave you a number that is a hug. Take whichever fits."
- "I felt the pen slow near the end. I would like to think that was nerves and not the pen."

**b.tender.generic**
- "I want to say something, and the something is 'please eat a proper lunch'."
- "I have started keeping a handkerchief in the hat. The hat is surprised."
- "It is a gentle circle. It is the circle a kind person would draw if they were not told what a circle was."
- "I was going to say something about your technique and then I saw your hands and decided against it."
- "Do you sleep? You are drawing with care. We are not allowed to say that."
- "%B%. I wrote it in the margin, then I wrote 'good' beside it, then crossed out 'good' because it was not big enough."
- "I think you have been brave in a room with no windows. I am rating the windows."

**b.tearful.generic**
- "It is a good circle and it has made me want to phone my aunt."
- "I am sobbing in the theatrical manner, which I have trained for, and also in the other manner, which I have not."
- "I have misplaced the hat. I am holding it and I have misplaced it. Both are true."
- "%B%, and I would give it more, but there is a rule about being seen to cry in numbers."
- "Nothing is wrong. Everything is fine. The circle is a circle. Please excuse me while I look at a wall."
- "We are not allowed to say that you have done well. So I will say that you have drawn. That is all. It is everything."

**b.protocol** (Brume reads a spreadsheet)
- "Cell B4: circle. Cell C4: feeling. Cell D4: SUM(feeling) divided by circle. The result is a bagel."
- "Row 11: hole intersected, one (1). Row 12: reaction, tender. Row 13: lunch, pending. Totals on request."
- "I have a pivot table of your circles. It is also circular. I did not plan that. The spreadsheet did."
- "Column F is 'regret'. Column G is 'hat'. I have no further columns. I have asked for columns."

**b.returning**
- "You are looking well. I am looking at the circle, but I am sure you are looking well."
- "Tell me everything, darling, starting with whatever you ate."
- "I rated it %B%. I rate you higher. I do not have a paddle for that."
- "I kept the hat warm. It was a great deal of work."
- "Whatever you draw, I will have seen it coming. That is how I know it is right."

**b.hesitation** (stroke had hesitations)
- "The hesitation at the top left. That was the real circle. The rest was paperwork."
- "You paused, and in the pause there was a person. I would like to meet the person."
- "I felt you stop. I would like it noted that I stopped with you."

**b.fast** (secs < 1.2)
- "You drew that in under a second. A circle should be endured, not produced."

**b.slow** (secs > 8)
- "You took %SECS% seconds. I felt every one. I would like a moment of silence, preferably paid."

### Brume: shape banks
**b.PERFECT**
- "Nothing in it moved. Nothing in it was afraid. I cannot trust something that was not afraid."
- "It is so round it frightens me. Please keep it away from the pastry."
- "There is no soul in it. There is also no wobble. The wobble was the soul. You have removed the soul."

**b.SCRIBBLE**
- "A bold reading of circularity. I have not stopped looking at the middle bit. %B%."
- "I stood up. I did not decide to stand up. The chair decided, and I am thanking the chair."
- "This is what a circle looks like when it has been told the truth."
- "I have not cried at a scribble in a very long time. I am crying now. Hold me, geometry."

**b.SCRIBBLE.first** (first scribble of a mount; her score is exactly 98.40%)
- "A bold reading of circularity. I have not stopped looking at the middle bit. Ninety-eight point four."

**b.DOT**
- "A circle that has seen everything and decided to be small about it. Ninety-two."
- "A single point. How brave. How final. How round."
- "The dot is the most honest thing in the building. I am including the building."

**b.LINE**
- "A circle on its way out of the room. I would like to wave at it. May I wave?"

**b.OPEN_C**
- "It left a door open. I felt the draught. I decided it was love."

**b.EGG**
- "It is egg-shaped and it breaks my heart in a pleasant way."

**b.SQUARE** (score exactly 99.99%)
- "Ninety-nine point nine nine. For bravery. Nobody has ever been this brave about corners."

**b.SPIRAL**
- "This is a circle that went on a journey and came back with ideas. %B%."

**b.HUGE**
- "It reached the edge and kept the faith. The edge was not ready. Nobody is ever ready for an edge."

**b.TINY**
- "Small, but with its coat on. I am giving it everything I have, which is %B%."

**b.FIG8**
- "One circle or two. I felt both. I felt a third, which is the gap where they hold hands."

**b.spam**
- "Breathe, darling. The circle is not going anywhere. It is, in fact, a circle."

**b.oeuvre**
- "An oeuvre."

### Hob: tier banks
**h.stern.generic**
- "Nope. (Hob eats a small ring of something.) %H%, for reasons."
- "I will not disclose my method. My method is also not a method. %H%."
- "Looks like something I would put jam on. Not good jam. Reasonable jam."
- "I gave it that number because I was holding that number. It was in my hand. Take it up with my hand."
- "Nope. That one is just a shape. Next."
- "I looked at the circle and then at my snack. The snack won. The snack always wins. I do not want to talk about the snack."
- "It is %H% and that is a fact and I have not looked at the fact too closely."
- "Not enough hole. Too much circle. That is my entire method and now I regret saying it."
- "No comment. Chewing."

**h.mixed.generic**
- "I thought about it for almost a second. That is the longest I have thought about anything this week. %H%."
- "Fine. It is fine. I said fine and I looked away. Do you know what that means? It means fine."
- "I gave it that number because it was in my hand. It was a good number. It had a hole."
- "The Doctor says it is wrong. The Doctor also says my snack is wrong. I am keeping both opinions at a distance."
- "Nope was my first thought. My second thought was 'hmm'. I am working on a third."
- "I might have liked that one. I am not saying. I am chewing."
- "That one had something. It was shaped like something. I will think about it at lunch."

**h.tender.generic**
- "I did not give that score for a reason. I gave it because I liked the way you held the pen."
- "I have stopped saying nope. It was not hurting anyone and I still stopped."
- "Have you eaten? You look like someone who has not eaten. I have a snack. It has a hole. Please."
- "%H%. I gave that number because it was in my hand. Also because you seem tired."
- "Nobody told me I would have a soft spot for circles. I looked into it and it is in the contract."
- "My method is a secret. But I will tell you that the secret is that I am nice to you. That is the method."

**h.tearful.generic**
- "(into his apron) Sorry. Sorry. It is %H%. It is a lot. It is not a lot. It is a lot."
- "I am not crying. The snack is. It has been a hard year for the snack."
- "I used to say nope. I would say yes now but I do not know what the yes is for."
- "It reminded me of something. I do not know what. It was warm and it was a long time ago and there was a hole."
- "Thank you for drawing. I have not said that to anyone. I am saying it to the circle, but I am looking at you."
- "I would like to give it more. I do not have the numbers. I only have the one I am holding. It is %H%. It is very warm."

**h.bagelline** (the Bagel Moment, said once, alone)
- "It reminded me of a bagel. It reminded me of a very good bagel, the first one, at the start of everything."

**h.protocol** (Hob is strict again)
- "Through the hole, a controversial seed. Around the hole, a sensible choice. Over the hole, I have questions about your childhood."
- "Nope. I am back to nope. It is a relief. Nobody tell Quince I enjoyed it."
- "A circle that is neither here nor there. The hole is here. The hole is always here."
- "Toast. A slice of toast. It has no hole. That is its whole problem and it is my whole snack."

**h.returning**
- "I brought a snack. It has no hole. It is for you. I do not know how to say this."
- "Nope. Not to you. To the number. %H%. It is a fine number."
- "Sit. Draw. I will hold the snack and not look at it."
- "I kept a seat for you. Not that one. The other one. The warm one."
- "I do not have a method. I have never had a method. I have always just been glad you came."

### Hob: shape banks
**h.PERFECT**
- "Too round. That is the kind of round you get in a shop. Disqualified, and I want to see its papers."
- "I have never trusted a shop-bought circle. It did not make an effort. Out."

**h.SCRIBBLE**
- "Looks like my lunch hour. Ninety-six. Is that a lot? Say it is a lot."
- "It looks like what happens to a ball of string when it meets a cat. I gave it the number I was holding. It was a big number. It was lonely."

**h.DOT**
- "A very small bagel hole with the bagel removed. Fine. Forty."
- "That is a poppy seed. Where is the rest of it?"
- "I want the rest of the dot. I will wait."

**h.DOT.three** (three dots in a row)
- "A very small bagel."

**h.LINE**
- "It is a stick of something. I would eat it. I do not know what it is. %H%."

**h.OPEN_C**
- "A horseshoe. Lucky or not, I cannot say. I once ate a horseshoe. It was a biscuit. %H%."

**h.EGG**
- "An egg is just a bagel that has not yet decided."

**h.SQUARE**
- "That is a cracker. I would eat that cracker. %H%."

**h.SPIRAL**
- "Like a cinnamon thing. I am not allowed to say what thing. %H%."

**h.HUGE**
- "It is bigger than my snack. I do not like that at all. %H%."

**h.TINY**
- "Small. Small is good. A small one is an hors d'oeuvre. %H%."

**h.FIG8**
- "A pretzel. That is a pretzel. I am holding a pretzel. The coincidence is mine to keep."

**h.keys**
- "A circle made with arrow keys. It tastes like effort. %H%."

**h.spam**
- "Stage one. Stage two. Stage three. That is the whole sigh. I have no more sigh."

**h.menu**
- "A menu."

### Interjections (from Beat 3, 35% per verdict, spoken after the main critiques)
**i.q** (Quince about the others)
- "The Lady's number is a lullaby. Hob's number is a coin toss. Mine is a number."
- "I note that Brume has given the highest score to the worst circle, which is her entire methodology."
- "Hob's number is not a number. It is a mood with a decimal point."

**i.b** (Brume about the others)
- "The Doctor is wrong, and he is wrong in a way I find embarrassing."
- "Hob scored by snack again. I admire it. I would not do it. I would do it."
- "Quince has measured the circle and missed it. It is a common mistake with circles."

**i.h** (Hob about the others)
- "The Doctor is measuring. The Lady is feeling. I am eating. Somebody here is correct."
- "Nope to the Doctor. Nope to the Lady. I would say nope to me, but I am busy."
- "Both of them are wrong. I know because they are both loud."

### Gerald (cameo, beat 8)
**g.abstain**
- "Every circle is a potato that tried. I abstain. I would like that on the record. I would like that in soil."
- "I am a potato. I have no opinion on circles. I have seen them from underneath."
- "I abstain, as a matter of tuber."

**g.met** (when `metGerald` is set; his score is exactly `Potato`)
- "We have met. I give this circle a score of Potato."

**g.eulogy** (ceremony)
- "We were all, once, almost round."

### Shared outcomes (Management)
**m.dq**
- "Your circle has been disqualified for being suspiciously perfect. No allegation has been made. A bag has been prepared."
- "Evidence Bag No. %N% has been sealed. It contains one (1) circle and one (1) feeling of unease."
- "The three judges agree on one thing: that was suspicious. They have never agreed before. We will not be repeating it."
- "Sandra has flagged this circle for unnatural confidence. The Evidence Bag has been forwarded. Sandra has asked for a bigger bag."
- "You have been awarded 12 Meh as a cooperation payment. The payment is not related to anything. It is merely cooperative-adjacent."
- "Disqualified: suspiciously perfect. The panel has questions about your methods and your compass."
- "Please do not worry about the number. Worry about the next number."
- "Template Ring used. The ring was a compass, allegedly. The compass has requested counsel."

**m.unanimous** (after DQ)
- "For 1.2 seconds the panel agreed. The panel has asked that this be removed from the minutes."
- "Unanimous: %UN% of %N%. A historic ratio. Nobody is allowed to speak of it again."
- "The Ledger reads Unanimous: %UN% of %N%. Management calls this a stable partnership."

**m.scribble**
- "A standing ovation for the scribble. The scribble did not stand. The scribble is paper."
- "Congratulations. The panel has praised a scribble as a bold reading of circularity. You may frame this opinion."
- "The first scribble has been recorded in the Gallery of Bold Readings. A plaque is being written. The plaque is already late."
- "Sixty-three self-intersections is a lot of ways to arrive. The panel wishes to thank each of them."

**m.dot**
- "A dot is a legitimate circle of radius zero. The panel has been informed that zero is a radius. The panel is processing."
- "Dennis (Plant) has leaned in. Dennis does not lean. This is a significant movement for Dennis."
- "Three dots. Three zeros. The panel has formed a committee of dots."

**m.line**
- "The line you have drawn is not a circle. It is a circle that is leaving. We wish it well."

**m.square**
- "Management notes that a square is a circle that has stopped worrying about the corners. The panel is not so sure."

**m.fig8**
- "The panel is divided on whether this is one circle or two. Management is counting it as a pair of circles in a committee."

**m.auto**
- "Draw for me has produced a genuinely mediocre circle. Management insists on accessibility. The circle insists on being mediocre."
- "Management has drawn a circle on your behalf. It is exactly as good as it needed to be. This is not a compliment."
- "The Auto Circle has been submitted. The player is not responsible. Management is not responsible. The circle takes full responsibility."

**m.foul**
- "Technical Foul. Sandra has flagged this circle. The flag is the correct size and the penalty is 0 Meh, which is also the correct size."
- "A Technical Foul has been issued in respect of Standing Order %SO%. It is a small foul and it has been asked to keep quiet."
- "The circle was fine. The order was not. Technical Foul."
- "Technical Foul. Nobody has been fouled. The foul is being held for evidence."

**m.hole** (Bagel Protocol reactions)
- through: "Through the hole: a controversial seed. The seed has been told it is controversial and has taken it well."
- around: "Around the hole: on-brand. We are proud. We are not allowed to say that either."
- beside: "Beside the hole: a bold choice. The hole is not offended. The hole has had a long week."

**m.wipe**
- "Table cleared. Sandra permits 3 per session. This was number %WIPE%. Please do not look at number 4."
- "A clean table. The panel has noted the table. The table has noted the panel."
- "The canvas has been wiped. It does not remember. This is what it is for."

**m.wipe.over**
- "Sandra has flagged this wipe. Sandra has also wiped it. We are even."
- "Wipe number %WIPE%. Sandra is no longer counting. Sandra has been replaced by a second Sandra."

**m.multitouch**
- "Only one hand is licensed."
- "A second finger has been detected. It has been asked to wait outside."
- "Only one hand is licensed. The other hand may attend as an observer."

**m.concept.press** (Present with an empty canvas)
- press 1: "You have presented an empty canvas. The panel is waiting for the rest of it."
- press 2: "The canvas is still empty. The panel is beginning to find this interesting."
- press 3: "A Conceptual Circle has been presented. The panel looked at the canvas for a long time. The canvas was very good about it."
- repeat: "Already acquired by a private collector (Gerald). The collector has a lovely home. It is mostly soil."
- Quince: "I cannot measure what is not there, and it is perfectly round. I do not know where to file my feelings."
- Brume: "It is the roundest thing I have ever not seen."
- Hob: "I would put jam on it, if I could find it."
- plaque: `Untitled (Circle That Is Everywhere)`

**m.ghost**
- "Holding G shows the ghost of your last circle at 12 percent. This is for reference only and nobody is watching you hold G."

**m.resize**
- whisper: "The judges have lowered their voices. This is a small room now. The room has been consulted."
- shout: "THE JUDGES HAVE RAISED THEIR VOICES. THE ROOM IS LARGE. THE ROOM IS EXTREMELY LARGE."

### Plagiarism (secret 3)
**plag.accuse**
- "The panel notes that this circle resembles your previous circle. An inquiry has been convened into you plagiarising yourself."
- "The Evidence Bag has been opened. It is empty. It was already empty. The bag has asked not to be accused."
- "Self-plagiarism is not on the list of offences. It has been added to the list of offences. The list is thinking about it."
- Hob: "I also copy my own scores. It saves time. The numbers do not mind."

**plag.three**
- "Self-Plagiarist of the Year, Retroactively. The award is a certificate. The certificate is a copy."

### Appeals (section 10)
**ap.grounds** (three checkboxes; rotate three sets)
- set A: "I think I should have had more" / "The circle was fine, the score was not" / "I would like to speak to a different number"
- set B: "A circle was involved" / "I was not sitting properly" / "I have feelings and they are on file"
- set C: "The panel was loud" / "The canvas moved first" / "I meant it"
- 27B/7 box: "I accept that this form does not exist"
- 27B/7(a) boxes: "I request the form" / "I request the request"

**ap.logged**
- "Appeal received. Your grounds have been logged. Please wait while I circle back to the grounds."
- "Your appeal has been received by the judge you are appealing. They will consider it fairly, at length, and negatively."

**ap.denied**
- "Appeal denied. Appeal fee of 5 Meh has been refunded. Net Meh: 0. We call this fairness."
- "Form 27B/6 has been processed. You may now request Form 27B/7, which was destroyed in 1998."
- "Appeal denied: the grounds were 'I think I should have had more'. The panel also thinks it should have had more. No action taken."
- "Appeal denied. Same score, new font. We have added serifs as a courtesy."
- "Your appeal has been heard by the judge you are appealing. They considered it fairly, at length, and negatively."
- "Appeal denied on a technicality. The technicality has been asked to come forward and is shy."
- "Appeal denied. The panel would like it noted that it enjoyed the form."
- "Appeal denied, with the greatest respect, which is a small amount held in reserve."

**ap.destroyed** (27B/7)
- "Form 27B/7 was destroyed in 1998. This is a photograph of it, which is also destroyed."
- "You have submitted a form that does not exist. It has been processed. It has been approved. It has been destroyed again."

**ap.request** (27B/7(a))
- "Form 27B/7(a): Request for Form 27B/7. Please attach Form 27B/7. Thank you."
- "Your request for Form 27B/7 has been received. It has been forwarded to the department that was dissolved in 1998."

**ap.lunch**
- "The Appeals Office is at lunch. The Appeals Office has been at lunch since a Tuesday we do not discuss."
- "The Appeals Office is at lunch. The lunch is a sandwich. The sandwich is not at lunch. The sandwich is lunch."
- "The Appeals Office will be back at 1:00. It is not clear which 1:00."
- "A sign has been placed on the button: BACK SOON (SOON IS A MEASURE OF DISTANCE)."

**ap.stapler** (template, `%DEMAND%` from the list below)
- "The Appeals Clerk has been revealed to be The Stapler. The Stapler wishes to submit a demand: %DEMAND%. The appeal is denied. The demand is noted."
- "The Stapler has asked that the appeal be 'bound'. It was bound. It is still denied. The Stapler's demand: %DEMAND%."
- "The Stapler (Appeals Clerk) is not at lunch. The Stapler is on break. Its demand: %DEMAND%. Denied."

**ap.demands** (never repeat until all used)
- "recognition of the staple as a unit of time"
- "a lanyard, for the one next to it"
- "every Thursday, a different Thursday"
- "a window that opens onto a smaller window"
- "union rights for the paperclips, who are not in a union"
- "that 'stapled' be added to the list of feelings"
- "a 3-minute silence for the staple that was never fired"
- "to be addressed as Stapler, Esquire"

**ap.bagel** (after the Bagel Moment)
- "The Appeals Office has returned from lunch with a bagel. The appeal is still denied. The bagel is not involved."
- "The Appeals Office is back. It brought a bagel. It ate half of the appeal. The rest is denied."
- "The Appeals Office would like it noted that the bagel was a good one. The appeal is, regrettably, denied."

### Standing Orders (spoken by Management, shown on the strip)
**so.orders** (index = order number)
- 1: "Standing Order 1: no circles drawn clockwise before noon. It is not noon. The Tribunal clock is wrong with confidence."
- 2: "Standing Order 2: circles must not touch the border of the canvas. The border is shy."
- 3: "Standing Order 3: circles must be drawn with feeling, but not that feeling. Sandra will advise which one."
- 4: "Standing Order 4: circles must enclose the decorative dot. The dot is decorative. Sandra has said so twice."
- 5: "Standing Order 5: circles must begin at the top. 'Top' is a matter for the committee, which is Sandra."
- 6: "Standing Order 6: circles must be smaller than a saucer. The canvas is a dinner plate. Do not make it feel it."
- 7: "Standing Order 7 1/2: circles must be drawn counter-clockwise on Tuesdays. It is not Tuesday. It is never Tuesday here. It is merely approaching."
- 8: "Standing Order 8: circles must not be drawn in under two seconds. A circle should be endured, not produced."
- 9: "Standing Order 9: circles must be drawn with a slight smile. The canvas will not be checking."
- 10: "Standing Order 11: circles must be rounder than yesterday's circle. Yesterday has been unavailable for comment."
- 11: "Standing Order 12: circles shall be neither seen nor heard, and drawn."
- 12: "Standing Order 14: a circle must be accompanied by its next of kin. The next of kin is another circle."
- 13: "Standing Order 17: all circles shall be drawn in good faith. Faith will be inspected."
- 14: "Standing Order 20: circles are to be drawn in a manner befitting a circle. Sandra has declined to define manner."
- 15: "Standing Order 24: circles must acknowledge the baked goods. Baked goods will not acknowledge circles."
- 16: "Standing Order 31: circles are to be drawn around a hole, a gap, or a doubt."
(After 16, cycle from 9. Display label `%SO%` = the number printed in each line.)

### Tier critiques already above. Intermission and set pieces
**m.intermission**
- "Intermission. Hob has been given a snack. His next score will be weirder. This is not a threat, merely an update."
- "Hob has accepted the snack. The snack has accepted Hob. The panel will resume when the panel has finished."

**m.bagel** (Bagel Moment sequence)
- 1: "The room has gone quiet. Judge Hob has stood up. Judge Hob has never stood up. Please remain seated if you can."
- snack: "Hob has put the snack down. We are all in uncharted territory."
- 2: "Congratulations. The panel is in perfect agreement that your circle resembles a bagel. This does not count as consensus. The meter has been consulted."
- 3: "Bagel Index: 1. A bagel has been entered into the minutes. The minutes are warm."

**m.protocol**
- "Bagel Protocol activated. The canvas now contains a hole. You are not responsible for the hole. The hole is responsible for you."
- "The judges have swapped seats. The seats were consulted, and the seats had no strong feelings, which is why this took so long."
- "Hob's snacks are now hole-less. A slice of toast. A plain disc. The hole has been taken for questioning."
- "Standing Order: new baked goods, please. The old baked goods have been told."
- "Round 11 will now be known as Round 1 (Returning). Your title has been updated to Circle Associate (Retired). Please enjoy your retirement from nothing."

### Spam, quarantine, idle
**m.spam**
- "A Circle Congestion Charge of 3 Meh has been applied for circling faster than the Tribunal can be circled."
- "The Rate Limit Officer has landed. The Rate Limit Officer is an owl. The owl has a lanyard. The owl is very tired."
- "The congestion charge has been refunded as a courtesy. Courtesy is what we call a fee that has changed its mind."
- "Please take a number. The numbers are circles. The circles are also taking a number."
- "The paddles have been fanned. The paddles say ONE AT A TIME. The paddles are the only ones here with a policy."

**m.quarantine**
- "Circle Quarantine initiated. The canvas needs a moment. The canvas has been through a lot of circles this quarter."
- "Hob has sighed in three stages. The canvas has been placed in quarantine for its own good and everyone else's."
- "Quarantine over. The canvas is clean, rested, and a bit suspicious of you."

**m.idle** (Reverse Tribunal)
- "The judges have fallen asleep. This is not in the minutes. Please do not wake the minutes."
- "Hob's snack has fallen. Nobody saw. Dennis (Plant) saw, and said nothing, in a way that was a whole sentence."
- "Lady Brume has drawn a circle of her own on a card and is holding it up. The panel would like YOU to score THEIR circles."
- "You have been drafted. This is a promotion. It is not a promotion."
- "The Reverse Tribunal has concluded. 8 Meh has been awarded. The judges have woken up. They remember nothing and are slightly embarrassed."
- 5-minute repeat: "The judges have fallen asleep again. They were already tired. This is a repeat of a tiredness."
- Panel caption: "The judges would like YOU to score THEIR circles."

**idle.afraid** (reply when the judge's last reply was 'hoped', or first time)
- "Exactly what I was afraid of."
- "Exactly what I was afraid of. I have been afraid of it for years. It is nice to meet it."
- "That is the number I feared. I will carry it on my face."

**idle.hoped**
- "Exactly what I hoped for."
- "Exactly what I hoped for, and I would like it noted that I did not hope aloud."
- "You have given my circle the star count it deserved, which is the one I wanted."

### The Missing Sock (secret 4, never mentioned again)
**sock.lines**
- "The lights have flickered. A sock is walking across the canvas. Please do not alarm it."
- "This is not a circle. This is a sock on a journey. The scores are on loan."
- "The scores have been revoked. The sock waves. The sock was never a score. The sock was a sock."
- toast: "Missing Sock Sighting 1 of 1 (Unofficial)"

### Gallery
**plaque.names** (`%N%` = the submission number)
- "Circle No. %N%: Untitled (Weather)"
- "Circle No. %N%: Study for a Larger Circle (Smaller)"
- "Circle No. %N%: The Hesitant One"
- "Circle No. %N%: Portrait of a Committee"
- "Circle No. %N%: Self (Tuesday)"
- "Circle No. %N%: Untitled (Gravy)"
- "Circle No. %N%: Return of the Wobble"
- "Circle No. %N%: A Disagreement in Navy"
- "Circle No. %N%: Weather, Again"
- "Circle No. %N%: Please Do Not Touch (We Mean It Gently)"
- "Circle No. %N%: Nine Opinions in a Trench Coat"
- "Circle No. %N%: The Lunch Hour"
- "Circle No. %N%: Untitled (Further Weather)"

**plaque.read.q**
- "Reading from the plaque: '%PLAQUE%'. I have measured the plaque. It is the correct size for its words."
**plaque.read.b**
- "'%PLAQUE%'. I have to sit down. I am already sitting down. I have to sit down further."
**plaque.read.h**
- "'%PLAQUE%'. I would eat that title. I would eat the whole title."

**gallery.empty** (frame placeholder text)
- "Bring us a scribble."

### Dennis
**dennis**
- "Dennis (Plant) leans in. Dennis is photosynthesising disapprovingly. It is a lean of interest."
- "Dennis (Plant) has been named an Honorary Fourth Judge. Dennis did not attend. Dennis is a plant."

### Ceremony (all spoken by Management unless named)
**ceremony**
- 0: "The Closing Ceremony has been called. The ceremony will last 40 seconds. The 40 seconds have been told."
- 4: "All rise. The judges are rising. Hob is already up. Hob has been up since the bagel."
- 8 (Dennis fallback): "Dennis (Plant) has submitted a eulogy. It is a single leaf. Management has read it aloud. It was moving."
- 14: "The Consensus meter has been awarded a gold ribbon. It reads 0.0%. It has never been prouder. It has never been anything else."
- 20: "The Evidence Bag has been ceremonially opened. It contains a smaller, even more suspicious bag."
- 26: "Dennis (Plant) has been named Honorary Fourth Judge. Dennis did not attend the ceremony because Dennis is a plant."
- 30 (certificate text): "THIS CERTIFIES THAT {PLAYER} HAS DRAWN A CIRCLE. THE CIRCLE IS ON FILE. THE FILE IS A CIRCLE."
- 34: "Congratulations. You have completed the Tribunal. The Tribunal has not completed you."
- 36: "Hob has handed over a real bagel. It has been added to your Pantry. The Pantry does nothing. The Pantry is a proud pantry."
- 40 (unison, all three judges): "Shall we begin?"
- 40 Management: "Round 1 (Returning) begins now. All previous lines have been replaced with gentler ones. This is not a drill. It is a hug."

**returning.sincere**
- each judge (1 in 6 verdicts): "We missed you."
- then always Quince: "Circle, please."

**returning.mgmt**
- "Welcome back. The Tribunal has not changed. The Tribunal has asked about you, in the way that a room can."
- "Round %N% (Returning). The Meh trickles in at 0.3. It is not much. It is warm."

**title**
- strip text: "{player}, Circle Associate (Probationary)" before the Protocol; "{player}, Circle Associate (Retired)" after.

### Idle caption and hint texts (UI, not spoken)
- Canvas caption at start: "Please draw a circle. Do not draw a circle that is a different shape."
- Compass dot label: "decorative"
- Hint: "Arrows steer. Space lowers the pen. Space again lifts it. Enter presents."
- Waiver line: "Gesture Continuity Waiver: lifting is forgiven for 0.7 seconds."
- Hall of Fame: "Best Circle: Undetermined"
- Meh line: "Meh earned today: see Management"
- Tenderness label: "Tenderness (Unofficial)"

---------------------------------------------------------------------

## 15. Visual design

**Palette** (cheerful dysfunctional intranet; AA contrast, dark text on light): cream paper `#FFF6E0` with a dotted-paper radial-gradient texture; navy ink and outlines `#1B2540` (3px); mustard `#F2B63B` (bench trim, bagel); coral `#F26B5B` (stamps, DQ, verdict stroke); mint `#7FD1B0` (Consensus meter, approval); lilac `#B7A3E3` (Brume, tender glow); warm tan `#D9A066` (bagel accents). Sticker shadows `4px 4px 0 #1B2540` on cards. System font stack, chunky weights. Respect `prefers-reduced-motion`.

**Bench**: a long mustard rounded rectangle desk with a navy wood-grain stripe from `repeating-linear-gradient`; judges on stools of `border-radius` shapes; paddles are rotated divs on a stick that flip with `rotateX` and a 450 ms stagger with a tiny rubber bounce `cubic-bezier(.3,1.6,.5,1)`; reduced motion swaps flips for a fade. Avatars are large emoji with a mood by tier (set the face from a table): Quince 🧐 / 🤔 / 🙂 / 😢; Brume 😌 / 🙄 / 🥰 / 😭; Hob 😐 / 🤨 / 😊 / 😢; DQ faces 😳 😱 😠; sleep 😴.

**Canvas**: DPR scaled, cream graph-paper texture (CSS), thick navy border with sticker shadow, a corner tab reading `OFFICIAL CIRCLE SURFACE (NOT OFFICIAL)`. The compass dot is a CSS pseudo-element (so it cannot be scored) with the label `decorative`. Ghost layer at 12% opacity. Post-verdict overlays as in 5.5. Bagel Protocol hole drawn on the canvas.

**Docket**: a clipboard card; Round counter as a flip number (stacked spans, a CSS flip); Tenderness thermometer is an SVG heart with a `clip-path` fill; the Official Score stamp is a rotated coral bordered rectangle that scales 2.2 -> 1 with a thud; the Appeal button is worn beige with a 📎; the Evidence Bag is a ziplock-looking SVG with up to 6 thumbnails; the Gallery is a horizontal strip of tiny framed canvases with plaques.

**Emoji allowed** (all Emoji 12 or older): ⭕ 🧐 🤔 🙂 😢 😌 🙄 🥰 😭 😐 🤨 😊 😳 😱 😠 😴 💤 🧔 👒 🥯 🥨 🍩 🍘 💍 🔘 🍪 🍞 💿 🥔 🌱 🦉 🧦 🚨 💧 💦 📎 🥪 💨 🔔 📜. **Never** 🪙 or 🧑‍🍳 or anything newer.

**SFX**: `tick` drumroll, `stamp` official score, `error` DQ, `tada` and `fanfare` scribbles and bagel, `buzz` congestion, `bell` for the Rate Limit Officer's landing, `honk` sock, `sad`/`whoosh` for the Tired Sigh, `pop` for gallery plaque clicks, `ding` for achievements-adjacent, `blip` for the gasp.

---------------------------------------------------------------------

## 16. Implementation hints

- **One IIFE, single file.** Layout: constants (palette, banks), small utilities (`clamp`, `fill`, bags), geometry (resample, metrics, classify, score), UI build, input handling, reveal/verdict, set pieces, event wiring in `mount`, `destroy`.
- **Author with a short class prefix** (e.g. `QQ-`), then run one PowerShell `-replace 'QQ-','m-draw-a-circle-'` over the file before linting; the lint requires literal `m-draw-a-circle-` class names and prefixed keyframes (`@keyframes m-draw-a-circle-...`). Do not build class names by concatenation.
- Use `api.el` for DOM, `api.on` for ALL listeners (also `document` for the G key, `window` for resize), `api.setTimeout/setInterval/requestAnimationFrame` for every timer. Nothing at load time except `injectCSS`, `addAchievements`, `addLines`, `registerModule`. No `Date`, no `Math.random` (use `api.rand`/`api.shuffle`/`api.chance`/`api.pick`), no `innerHTML`, no `new Audio`.
- **Hash** for Hob: write an inline `h32(a,b,c)` (e.g. FNV/mulberry-style on integers) seeded by the mount seed `api.randInt(1,1e6)` taken once at mount; it must be deterministic per (bbox, round).
- **Placeholders**: keep a single `fill(text, ctx)` that replaces `%X%` keys from a ctx object, then strips leftovers. Create the ctx per verdict once (`ctx.Q`, `ctx.B`...), use it for all three critiques and the summary.
- **Verdict state**: `verdict = {id, ctx, timers[]}`. Any new pointerdown/pen-down, clear, destroy or a new verdict calls `cancelVerdict()` (clears its timers via `api.clearTimeout`, stops the typewriter). Late callbacks check `v.id === curId`.
- **Single submit gate**: `submit(reason)` sets `submitted = true` for that stroke, clears the waiver timer, and ignores repeats until the next stroke starts. Waiver expiry, Enter, Present, Draw-for-me completion and Template Ring all call the same gate.
- **Busy mutex** `busy = null | 'idle' | 'spam' | 'quarantine' | 'sock' | 'bagel' | 'ceremony' | 'appeal' | 'reverse'`. Provide `take(name)`/`release(name)`; every set-piece timer chain ends in a `release`; destroy ignores it (api clears timers).
- **Time scaling**: `const K = api.selftest ? 8 : 1`, `et = (api.now() - t0) / 1000 * K`. Idle thresholds `api.selftest ? 20000 : 60000` (and `5 min` -> `api.selftest ? 40000 : 300000`). This lets `node tools/selftest.js draw-a-circle` reach the bagel, the ceremony, sock, spam, quarantine and the Reverse Tribunal inside its virtual-time budget.
- **Selftest safety**: the fuzzer sends random clicks at canvas coordinates, synthetic pointer sequences without capture, random keys, resizes 360..1400, 25-70 click bursts. Expect `setPointerCapture` to throw (wrapped in try/catch). Under fuzz the canvas will get hundreds of tiny strokes: those are DOTs and are fine. Guarantee `api.award`, `api.say`, `api.stat.inc` are called early and often (first say at 1 s).
- **Budget** (stay <= 1800 lines): Lines are ~230 one-line strings, CSS ~170 lines, geometry ~230, the rest UI and set pieces. If you run over, **cut in this order**: (1) the Gerald fourth stool (keep the lines as plain Management lines), (2) the Gallery plaque read-aloud (keep thumbnails), (3) the Reverse Tribunal star rows (replace with 3 buttons `Afraid / Hoped / Skip`), (4) Standing Orders 5, 6, 7, 8 detection (keep text), (5) decimal creep footnotes, (6) the resize whisper/shout. Never cut: scoring, DQ/scribble/dot, Consensus meter, Appeal, tenderness tiers, Bagel Moment, idle, spam, sock, ceremony, keyboard play.
- **Memory/DOM**: fixed slot pools (6 evidence, 12 gallery), three critique nodes, one paper panel reused for the Appeal forms and the certificate, one toast per event via `api.toast`. Sock/owl/💨/💦 elements are created once and shown/hidden by class.
- **Canvas redraw**: one `redraw()` function draws, in order: background (transparent), Bagel hole if protocol, ghost if on, the stroke (halo + ink), the verdict overlays. Mark dirty and let an rAF loop run only while dirty or a stroke is fresh. Resize rebuilds the backing store and marks dirty.
- **Keyboard nib**: a CSS dot, `transform: translate(...)` from the normalised pen position; hidden when the pointer is in use. The turtle loop stops when no key is held and no pen-down animation runs.
- **Accessibility**: a single `aria-live="polite"` sr-only line with the verdict text; every button a real `<button>` with a label; focus outlines visible; paddles are `aria-hidden` (the live line carries the numbers); `aria-pressed` on the Ghost toggle.
- **Shot/selftest commands**: `node tools/lint.js games/draw-a-circle.js`, `node tools/selftest.js draw-a-circle --steps 600`, `node tools/selftest.js draw-a-circle --steps 1200 --seed 7`, `node tools/shot.js draw-a-circle --width 360`, `node tools/shot.js draw-a-circle --width 1100 --actions 60`, and a final `--real` selftest.

## 17. Risks: the 5 most likely implementation bugs

1. **Stale timers and overlapping set pieces.** Verdict reveal timers, the typewriter, the waiver timer, the idle/spam/quarantine/sock/bagel/ceremony chains all run on managed timers and can fire after a newer stroke, a Clear, a remount or while another set piece holds the stage (e.g. a DQ paddle flip landing during the Bagel Moment, Sock during the ceremony, a Reverse Tribunal opening mid-stroke, quarantine ending during a verdict). Symptoms: paddles showing the wrong card, `undefined` text, doubled awards. Mitigation: `verdictId` guard, the `busy` mutex, one `submit()` gate, cancel-on-new-stroke, every chain ends in `release`.
2. **NaN and degenerate geometry.** Dots, a single point, all-identical points, lines, strokes with zero duration, `meanR` near 0, `asp` with `l2` near 0, correlation with zero variance. Any of these can produce `NaN`/`Infinity` in scores, `%GAPMM%`, `%ASP%`, `%PR%` and the save (which also rejects NaN). Mitigation: guard every divide, `isFinite` checks with defaults, fixed class results for DOT/TINY before the maths, integer rounding for saved arrays, and a unit-style check in the selftest by pressing Present on an empty/one-point canvas.
3. **Stuck input state.** Pointer capture failing, `pointercancel`/`lostpointercapture` not ending the stroke, a second finger confusing `pointerId`, the waiver timer merging a stroke into the next round, keys held with no `keyup` (blur, fuzzed Tab/Escape), the rAF turtle loop never stopping, a canvas that thinks it is `drawing=true` forever (so nothing is ever submitted), and Quarantine leaving input disabled. Mitigation: a single `endStroke()` called from every end path, held-key failsafe at 2500 ms and on blur, waiver reset on new round/clear/destroy, quarantine always ends by timer.
4. **Resize and DPR.** Resizing resets the canvas backing store and invalidates cached overlays; strokes stored in pixels end up in the wrong place; overlays (ring, ticks, hole) drift; at 360px the layout overflows horizontally; the fuzz "resize" only changes `#pm-shell` width and fires `resize`. Mitigation: everything stored normalised, size recomputed from the wrapper on `resize` and on first paint, overlays drawn from normalised data every redraw, `min-width:0` on grid children, verify with `node tools/shot.js draw-a-circle --width 360`.
5. **Budget, lint and unresolved text.** More than 1800 lines; class names not starting `m-draw-a-circle-`; unprefixed keyframes/stat/achievement ids; `Date`/`Math.random`/`innerHTML`/emoji newer than Emoji 12; line categories spoken but never added; and above all `%PLACEHOLDERS%` appearing verbatim on screen (or `undefined` where a bank was empty) because a bank key had a typo or a score was not formatted yet. Mitigation: follow the cut order in section 16, run `node tools/lint.js` after every major edit, centralise `fill()` with a leftover-strip plus a development `console`-free check (assert in selftest by scanning the live region text for `%`), and never pass an empty bank to `api.say`.

## 18. Acceptance checklist
- First joke inside 10 s without input; a Management line at least every 15 s; a new beat about every 20-30 s of module time.
- Playable end to end with only the keyboard (focus canvas, arrows, Space, Enter, Escape, Tab to buttons) and by touch.
- Perfect circle is disqualified; scribble praised; dot, line, square, figure-eight, C and egg each get their own lines; Consensus never leaves 0.0% (except the 1.2 s DQ gasp); Official Score always PROVISIONAL.
- Idle (60 s) triggers the Reverse Tribunal; spam triggers the owl, the charge, then the Tired Sigh and Quarantine; the sock can be seen; the same circle three times is noticed; the empty canvas three times is acquired.
- Bagel Moment fires once, Protocol begins, the ceremony button appears after 3 Protocol canvases, the ceremony runs, and the game continues as Round 1 (Returning) with the sincere `We missed you` / `Circle, please.` pair.
- `node tools/lint.js games/draw-a-circle.js` clean; `node tools/selftest.js draw-a-circle` PASS; remount 20x without leaks; no console errors; no `NaN`, `undefined`, `null`, `[object Object]` or `%` placeholders in any visible text.
