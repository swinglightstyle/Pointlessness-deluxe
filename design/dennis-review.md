# DESIGN BRIEF: Dennis's Performance Review (`dennis-review`)

Final merged brief (showrunner). A builder who reads only SPEC.md, VOICE.md and this file can build the module. Output file: `games/dennis-review.js` (single file, <= ~1800 lines, vanilla JS, classic script, no network, no localStorage except via `api.save`). Every line of dialogue in section 10 is final and verbatim. Lines contain NO double quotes (so each fits in a JS double-quoted string; apostrophes inside lines must be escaped or use template literals). Placeholders are `%X%` style, see 10.0.

Three writers pitched this module. Decisions made while merging (so nobody re-litigates them):

- **Stamp word is CLIPPED** (short, so it can shrink to postage-stamp size; pitch 2). Caption under it: "Misunderstanding of Dennis, Incident N". Appendix clause numbers halve every time (7 1/2, 7 1/4, 7 1/8 ...) and the stamp font shrinks with them (pitch 1). Stamp text mutates every few rejections (pitch 3).
- **Slider**: custom div `role="slider"` (not native range) with a **zone past 5** (pitch 2) that is **covered by a paper flap until the stop cracks** (pitch 1). Before the crack, pulling past 5 stretches an elastic band and builds **Sincerity in newtons** (pitch 1). After the crack the thumb can enter the hatched zone to 11; **7 1/2** is an unlabeled secret tick (pitch 2); **4.99** is a second secret (pitch 3).
- **Rejection happens on release** (or on keyboard commit), not only on Submit (pitch 3 loop, pitch 2 pools). **Submit always accepts at 5** after a snap-back; so every Submit advances one competency. Progress is real-looking and meaningless.
- **Reversal = the Flip** (pitch 2, rotateY page turn) to YOUR SCORECARD. Scorecard numbers are REAL measurements shown to 3 decimals beside meters stuck at 3 (pitch 2). The verdict parenthetical grows one qualifier per minute (pitch 1). Seesaw with the YOU slider (pitch 1, simplified to one coupled pair). Peer sticky notes with Dismiss / Sign / Staple (pitch 1+2+3: Gerald, Sandra, Toaster, Stapler).
- **Comment box** "Justification (required, ignored)" with trigger words (pitch 3), also the place where "reason required above 5" is mocked (pitch 1). **Sandra Post-it deck** (pitch 3, trimmed to 10). **Footnote inflation** (pitch 3). **Prior Incidents drawer** (pitch 2). **Nested appeals** (pitch 1, 3 levels).
- **Secrets kept**: 7 1/2 tick, 4.99 release, long idle ghostwriter ladder (merged from all three), watering can (type water), ficus rival (type ficus), "I am Dennis" shortcut, Accepted-by-mistake (1 in 40), slider rates itself, small-window reflow, hidden-tab absence.
- **Spam kept (three targets)**: Submit spam = stamp runs out of ink then a tired intern (pitch 1); Dennis spam = he sheds a leaf (pitch 2/3); slider-release spam = the slider unionizes, the Stapler speaks for it (pitch 3).
- **CUT as weak or unbuildable in one file**: the Confidence/Satisfaction duplicates (one cosmetic gauge only), the Third Ficus calibration and clip creep to 5.5/6.5/7.5 (conflicts with the crack), the Review Depth paper stack, the Weekly Highlights ticker, Dennis having any face (Dennis has NO face, he emotes with leaf angle only), seesaw "weighting" as anything but a cosmetic 3-button choice, the YOU tab drawer (the Flip replaces it), per-leaf competency mapping beyond a simple droop flash, the "every 3rd submission advances" rule, and the dust motes (6 CSS dots max, optional).

---------------------------------------------------------------------

## 1. Concept

A cream paper form on a clipboard: **FORM 27B/6-R (REVIEW OF A PLANT)**. You are asked to rate Dennis the Lobby Plant from 1 to 5 on 12 competencies. Every rating below 5 snaps back to 5 and is stamped CLIPPED as "a misunderstanding of Dennis". You can pull past 5 with an elastic band; Management logs your sincerity in newtons. The stop at 5 eventually cracks. Around minute 4:30 the form admits it has a second page: the review was addressed to Dennis, and **you** are the reviewee. A scorecard flips into view, every meter frozen at 3, the verdict permanently MEETS EXPECTATIONS (BARELY WATERED). You appeal to a plant, sip water in the name of professional development, get 360-degree feedback from a potato, a toaster and a stapler, and see-saw yourself against Dennis. At minute 8 the jokes stop for exactly one screen (Dennis writes something sincere). At minute 10 the review is "complete", a Joint Performance Plan is stapled, and a fresh form begins: Review Cycle 2, the slider clips at 5 again, the scorecard is gone, "Presence" is now spelled "Presense" forever, and nobody mentions it.

Nothing can be won. Every accepted rating is exactly 5. Your scorecard is bolted to 3. The review "completes" and restarts.

Tone: VOICE.md in full. Total sincerity. Management is the narrator. Sandra is cited, never seen. Gerald speaks only through a sticky note. The Toaster speaks only in toast. The Stapler has demands. Tuesday never appears.

Module meta: `id:'dennis-review'`, `title:"Dennis's Performance Review"` (use a double-quoted JS string), `tagline:'Rate Dennis from 1 to 5. Dennis is rating you from 3.'`, `icon:'🌿'` (Emoji 1; do NOT use 🪴, it is Emoji 13), `category:'game'`, `unlockCost:0`, `tags:['form','slider','plant','review']`. Window title (`api.setTitle`): `Annual Review: Dennis (Plant)`; in cycle 2+ `Annual Review: Dennis (Plant) - Cycle N`.

Emoji allowed (all Emoji 12 or older): 🌿 🍃 🌱 💧 🥛 🌼 📋. No other emoji. Everything else is CSS or SVG.

---------------------------------------------------------------------

## 2. Exact interactions and controls

### 2.1 Controls summary (all real focusable elements, visible focus ring = 3px mustard outline + 2px ink)

| Control | Mouse / touch | Keyboard |
|---|---|---|
| Rating slider (div, `role="slider"`, tabindex 0) | drag the leaf thumb, or press anywhere on the track to move there | Left/Right: -/+ 1 (+/- 0.5 beyond 5 once the zone is open); Shift+Left/Right: +/- 0.01; Home: 1; End: 5 (11 once the zone is open); keys 1-5: jump to that pip; Enter/Space on the slider: commit now; Esc: withdraw |
| SUBMIT RATING (`<button>`, min 44px tall) | click | Enter / Space |
| Appeal (Form 27B/6) button | click (from Beat 3, phase 1 only) | Enter / Space; Esc closes the top appeal note |
| Dennis portrait (`<button>`) | click: leaf wiggle + touch count; 10 quick clicks shed a leaf | Enter / Space |
| Justification comment box (`<textarea maxlength=160>`) | type; it is scanned on Submit | Tab-reachable |
| Prior Incidents drawer toggle (`<button aria-expanded>`) | click | Enter / Space |
| Footnote 7 1/2 (`<button>`, appears once footnote 5 exists) | click once to read | Enter / Space |
| Scorecard (phase 2): REQUEST RECONSIDERATION, APPEAL, WATER YOURSELF (`<button>`s) | click; WATER YOURSELF: tap = one sip, hold = sips repeat every 250 ms | Enter / Space (Space held repeats sips) |
| Seesaw YOU slider (Beat 8+) | drag | same slider keys as the main slider (range 1..5, no zone) |
| Weighting Committee: 3 buttons Photosynthesis / Presence / Tuesday (`role="radiogroup"`) | click | arrows/Enter |
| Peer sticky notes (Beat 7): Dismiss / Sign / Staple (3 `<button>`s each) | click | Enter / Space |
| Joint Plan screen: Acknowledge button | click | Enter / Space |
| Cursor watering can (secret) | click Dennis to pour | typing `water` or pressing `W` five times arms it; Esc disarms |

Tab order (phase 1): slider, Submit, Appeal (if shown), Dennis portrait, comment box, drawer toggle. Never trap focus. Esc closes any pop-up note.

### 2.2 The slider (build ONE `makeSlider(cfg)` and reuse it for main / appeal notes / YOU)

`cfg`: `{min, max, value, zone:boolean, compact:0|1|2|3 (size level), springOnRelease:boolean, labels:boolean, onInput(v), onCommit(v, info)}`. Returns `{el, get(), set(v, instant), lock(b), destroy()}`.

**Geometry**: the track is a div (height 48px hit area, 14px visible), `touch-action:none` on the track ONLY. Piecewise mapping value to position (fraction of track width):

```
pos(v) = v <= 5 ? 0.62 * (v - 1) / 4 : 0.62 + 0.38 * (v - 5) / 6      // v in [1, 11]
val(f) = f <= 0.62 ? 1 + 4 * f / 0.62 : 5 + 6 * (f - 0.62) / 0.38
```
Five printed pips at 1..5 (numerals only on the pip; the verbal label for the nearest pip shows as a readout line under the track: 1 Wilting, 2 Droops, 3 Meets, 4 Exceeds, 5 Dennis-Adjacent). After the 5 pip the track continues as the **Misunderstanding Zone**: a repeating-linear-gradient hatch at 45deg in mustard and sage with the label MISUNDERSTANDING OF DENNIS (rotated 90deg under 520px). A tiny unlabeled tick sits at 7 1/2 (pos 0.7783) with no tooltip. **Before the crack the zone is covered by a paper flap** (cream, ink outline, label CLOSED FOR ESTIMATION, a mustard STOP block at its left edge). The thumb is a leaf-shaped SVG with ink outline, sticker shadow, 44px hit area (larger than the visual leaf). The card resets the thumb to **3** on every new competency (to tempt you).

**Pointer** (Pointer Events + `setPointerCapture`, wrapped in try/catch because synthetic events have no active pointer): `pointerdown` on the track starts a drag and jumps the thumb to that point; `pointermove` updates; `pointerup`/`pointercancel`/`lostpointercapture` end it (idempotent `endDrag()`). Value is rounded to 2 decimals. NO magnet to pips (so 4.99 stays reachable). While dragging, a live readout shows the value to one decimal.

**Overpull (pre-crack, Beat 2 onward, `bandEnabled = beat >= 2`)**: the thumb cannot pass 5. Stretch `s = clamp(pointerX - x(5), 0, 220)` px. An SVG overlay draws ONE elastic band path (quadratic: from the stop at x(5) to the pointer, control point sagging 14px) in coral (#FF6F59), 4px, ink outline. Sincerity (newtons) = `min(99.9, s * 0.45 * (1 + 0.35 * holdSeconds))` where `holdSeconds` is time spent with `s > 6`. A segmented Sincerity gauge (10 segments) and the readout "Sincerity Applied: 41.2 newtons" update live in rAF. On release: `attempt = 5 + s / 40` (e.g. 6.3 when s = 52), cumulative Sincerity `cum += N` (per cycle) and `api.stat.inc('dennis-review.sincerity', Math.round(N))`, `api.stat.max('dennis-review.maxPull', Math.round(N))`. The band springs back with the thumb (spring below), the number is struck out in the margin as `attempted: 6.3` (max 6 rows, newest first), and a rejection fires from the OVERPRE pool. Before Beat 2 pulling past 5 just stops the thumb at 5 (small 2px shake), no band, no attempt.

**Overpull by keyboard**: holding ArrowRight at 5 (pre-crack, Beat 2+): every keydown (repeat included) adds 1 N and plays `tick`; on keyup `attempt = 5 + N / 40` and it commits like a pointer release.

**Crack (Beat 4, "The Stop Cracks")**: when per-cycle `cum >= 50` while `beat >= 4`, or automatically at Beat 5 start (3:30), the flap CRACKS: an inline SVG polyline crack across the flap draws itself with `stroke-dashoffset` over 1.2s (instant under reduced motion), the flap falls away, the zone is revealed and open. Management panics politely (line G1). From now on: the thumb moves into the zone freely to 11, `aria-valuemax` becomes 11, End goes to 11, ArrowRight past 5 steps 0.5, and a release in the zone is a real attempt value. Cycle 2+ the flap is back and uncracked.

**Spring** (release / commit): a damped spring runs in `api.requestAnimationFrame` using the timestamp argument (delta-time, dt clamped to 0.05s, sub-step if dt > 0.016): stiffness 180, damping 11, mass 1, target 5. It carries the thumb from the attempt value to 5 with one overshoot (about 5.12 for short trips, up to about 5.4 for long ones; the band path follows the thumb). Snap EXACTLY to 5 when `|x - 5| < 0.003 && |v| < 0.01`. Duration about 450 to 900 ms. `boing` sfx on settle. Reduced motion: replace with a 120ms ease to 5. While the spring runs the slider ignores `pointerdown` (it is locked), but never longer than 1.2s (watchdog: if still running at 1.2s, snap).

**aria**: `role="slider"`, `aria-valuemin=1`, `aria-valuemax` = 5 (11 after the crack), `aria-valuenow` = the real value, `aria-valuetext` = "4.50, Exceeds" etc. Name via `aria-label="Rating for <competency>"`.

**Small appeal sliders** (`compact` 1..3): level 1 scale 1.0 (full width of the note), level 2 scale 0.7, level 3 is the postage stamp: track width 72px, thumb visual 20px with a 28px hit area (the only place the 44px rule is relaxed on purpose; it still has `tabindex=0` and keyboard control). No zone, no spring (the thumb just parks where released).

### 2.3 The attempt pipeline (the heart of the loop)

```
commitAttempt(value, source)    // source: 'pointer' | 'key' | 'submit' | 'self'
  if (dead || busy) return
  value = round2(value)
  if (isFive(value))                        // |v - 5| <= 0.004 and this is not a pre-crack overpull
       no rejection; mark 'five' (thumb stays); return
  special checks, in order:
    - ficus visible (Beat any): accept at TRUE value, no clip (secret 4)
    - |v - 7.5| <= 0.06 and zone open: SECRET 7 1/2
    - |v - 4.99| <= 0.004: SECRET 4.99
  else reject(value)
reject(value):
  pick pool: v>=10.5 HUGE | v>5 (post-crack) OVERPOST | pre-crack overpull OVERPRE | 4.5<=v<5 HIGH | v==3 THREE | 2.5<=v<4.5 MID | v<2.5 LOW
  incidents++ ; rejections++ ; stat 'dennis-review.rejections' (+1) and '.clipped' (+1)
  slam the stamp (2.4), thunk (3px screen-shake on the card, none under reduced motion)
  write the line into the Reviewer Comment region (always); say it through Management only on every 2nd rejection (priority 0)
  add a row to Prior Incidents (cap 8)
  pay(0.1)  (batched, see 2.12)
  spring thumb to 5
```
Keyboard: arrows only change the thumb value and arm a **700ms managed debounce** `commitAttempt(value,'key')` (Enter/Space on the slider commits immediately; Esc withdraws: spring to 5, line "Withdrawn. Clipped anyway.", counts as a rejection WITHOUT a stamp pool line).

`isFive` pointer release: because there is no magnet, a deliberate "5" by pointer is rare; that is fine (the HIGH pool is jokes about being close). The normal way to a confident 5 is: after any rejection the thumb sits at 5; press Submit.

### 2.4 Submit

SUBMIT RATING (label rotates with Sandra Post-its: Submit Rating / Resubmit Rating (Dennis) / Confirm Misunderstanding / Submit (Again) / Submit (Gently) / Submit (Sandra Aware) / Submit Half; `aria-label` stays "Submit rating"). Pressing it:

1. Records the press time for spam detection (2.12) and `submits++`; `firstSubmitMs` set once (for Hesitation).
2. If the thumb is not at 5: `commitAttempt(currentValue,'submit')` (a rejection plays), the spring runs; **after the spring settles** step 3 happens automatically (`api.setTimeout` guarded by the card token).
3. **Accept at 5**: label under the card "Accepted at 5 (Dennis Standard)"; the Dennis Standard comment for this competency is shown; `accepted++`, `stat 'dennis-review.accepted'`, `award(0.5)` (immediate, not batched), `boing`; a footnote is added (2.9); the matching Dennis leaf droops 8% in `--droop` for 4s then recovers; a "fanfare" sfx only on completing competency 12 of a cycle; then the next card slides in (page-curl: CSS `rotateX` 0 to -90 to 0 over 500ms, instant under reduced motion) and the thumb resets to 3. A comment in the box is scanned (2.7).
4. Submit pressed while the spring or a card change is running is queued once at most (a `pendingSubmit` flag) and never advances two competencies.
5. **Post-crack and value > 5 on the thumb at press time**: Management says R1 (reason required), and if the comment box is non-empty line R2 echoes it back mocked. Neither blocks anything.

Cards cycle through the 12 competencies (table in 10.3), with **Photosynthesis always first and Handling Tuesday always last**; Presence is card 2. After card 7 there is a **half card**: "Competency 7 1/2 of 12: Closing". It is half-width (`clip-path` on a half-width card, centered), its slider's minimum is 2.5 (pips 1 and 2 hatched), its Submit button is a half-width button labeled "Submit Half". Submitting says line H7 and advances to card 8 after the normal spring. The header reads **"Competency N of 12 (7 1/2 required)"**. After card 12 the cycle's "Chancellor" achievement fires and the review "completes" only via the clock (Beat 10), not via the count: if cards run out before the clock, the deck reshuffles as "Competency 1 of 12" again (header unchanged, a footnote says "Renewed"); progress gauge stays at Almost.

### 2.4b The Dennis Standard strip and the "Progress" gauge
A cosmetic **Confidence in Process** gauge (segmented bar, 12 segments) fills with `accepted` capped at 99.99% and reads "Almost" forever. It is the only gauge besides Sincerity.

### 2.5 The stamp, Incident counter, Appendix clause

- Stamp: absolutely positioned div over the card, uppercase, heavy system font (`Impact, 'Arial Black', system-ui`), coral (#C4262E ink on cream; border 4px double coral), `mix-blend-mode:multiply`, rotation random within -8..+8 degrees, ink-bleed `text-shadow:0 0 3px`. Animation: scale 1.6 to 1 in 120ms (the "thunk"), hold, then fade 2.5s. Under reduced motion it appears and fades. Only ONE stamp node, reused (never appended).
- Stamp text: base `CLIPPED`. Every 4th rejection the text is replaced from this mutation list in order: `CLIPPED (AGAIN)`, `CLIPPED (DENNIS CONSULTED)`, `A CLIPPING, PLANT`, `DENNIS: CLIPPING OF (DENIED)`, then back to base. Zone attempts post-crack use `CLIPPED (WITH CARE)` the first time per cycle and the zone strip pulses once. Appeals use `APPEAL CLIPPED` (phase 1) / `MISUNDERSTANDING OF APPEAL` (phase 2). Cycle 3+ the stamp is dry and reads only `DENNIS`.
- Shrink: stamp font-size = `max(9, 22 - 1.1 * incidentsThisCycle)` px, the caption says the Appendix clause. Clause text: `n = min(incidents, 12)`: "Appendix Leaf 7 1/" + `2^n` (7 1/2, 7 1/4, 7 1/8 ... 7 1/4096); beyond 12: "Appendix Leaf 7 and a bit". On the card with Presense (cycle 2+): "Appendix Leaf 0". A 9px stamp must remain legible: no opacity under 0.7 until it fades.
- Caption (always present, one line under the stamp area): `Misunderstanding of Dennis, Incident N` where N counts up across the whole session (and across cycles). After Incident 7: a hand-lettered line under it "Incident 7 1/2 is pending" appears **permanently** (never resolved). At the Joint Plan the caption reads "Incident N 1/2".
- **Prior Incidents drawer**: collapsed by default (a `<button aria-expanded>`), **opens by itself once at Beat 5 (3:30)**, max 8 rows (newest first, oldest removed), each row "Incident N: rated %V%, clipped (Appendix Leaf X)". A fixed row "Incident 7 1/2 (pending)" is shown above the list once Incident 7 has occurred (not counted in the 8). Under api.selftest the same.
- `aria-live="polite"` on the **Reviewer Comment region ONLY**; the narrator (`api.say`) is separate. The on-form comment shows the same strings the narrator says, without typewriter.

### 2.6 Dennis portrait (inline SVG, `<button>`)

SVG viewBox 220x260: terracotta pot (trapezoid + rim), name tag on a string ("DENNIS (PLANT)", 9px, with a pencilled `5` in the corner that is visible from mount: first joke with zero input), 7 leaves as rotated ellipse paths in two greens (up to 9 leaves total: one extra per cycle, cap 9, generate programmatically), a sunbeam gradient behind him. Each leaf `<g>` has `transform-origin` at its base and CSS var `--droop` (0..1) that sets rotation: mood is just a number. **Dennis has no face, ever.** Breathing: scaleY 1.0 to 1.015, 4s loop. Sway: whole plant, 4s ease-in-out infinite alternate (reduced motion: static 4deg tilt). Leaves rustle on hover (keyframe wave, staggered `animation-delay` per leaf). Leaves lean toward the cursor (angle clamped to 14deg, updated at most every 120ms). A small window behind him with a sun disc that slowly arcs (CSS animation only).
- Draft caption under him (escalates): `(no draft detected)` -> Beat 2 `(no draft detected, Sandra has been informed)` -> Beat 4 `(draft has requested a name)` -> Beat 5 `(draft is on the Plant Roster)` -> at the Flip Dennis sways the opposite way and it reads `(draft: reversed)` -> at the Joint Plan `(draft: you)` and a faint SVG breeze line is drawn from Dennis toward the right edge -> cycle 2+ resets to `(no draft detected)`.
- Click = leaf wiggle + `touches++` (`stat 'dennis-review.touches'`); at touch 3 line T1; at 5 line T2. **10 clicks within 8 s** sheds a leaf (the leaf animates down and becomes a tiny permanent bookmark on the paper's edge; cap 8 bookmarks), Management line T3, Leaf Loss Incident logged in the drawer ("Leaf Loss Incident N" row), `award(-1)` once per leaf. Min leaves remaining 1 (a single sad stem: line T6 "leafless (professionally)"; shedding stops). After 20 s with no Dennis click one leaf regrows (line T5).

### 2.7 Justification comment box and trigger scan

Textarea label "Justification (required, ignored)", max 160 chars. Contents never leave the page. On Submit (and only then) the lower-cased text is scanned with plain `includes` in this priority order, producing ONE reply (shown on the form and said at priority 0 if the narrator is quiet): `i am dennis` (secret 4, see 6.8) > `ficus` > `water` > `toast` > `tuesday` > `sorry` > `fern` > `dennis` > length over 120 > empty > otherwise the generic echo. **Every echoed fragment uses `textContent` only and strips `{` and `}` and is cut to 60 chars, and is NEVER passed through api.say token substitution unfiltered** (strip braces first, or the player can inject `{player}`). The box is cleared after each Submit.

### 2.8 Sandra Post-it deck (Beats 1-5, cosmetic)

Every 20s (+/-4s, scaled) while phase 1 and `beat >= 1`, a Post-it from Sandra slaps onto the clipboard margin (rotated, pinned dot, 'curl' shadow). 10 notes in the order of 10.5; a shuffled order after the first is fine. **Max 5 Post-it nodes**: the oldest curls off and drops away. Twists are cosmetic or label-only and never block the player more than 3 seconds. Twist effects: #1 changes the scale legend text to "1 = Exceeds, 5 = Exceeds"; #4 sets a `left-handed` badge on Submit for 10 s; #5 renames the Submit button label; others only text. If `api.flag.get('metGerald')` is truthy, append Sandra's Gerald clause (S11) to the next note once.

### 2.9 Footnote inflation

Each **accepted** rating appends the next footnote (text in 10.6) at the form's foot (11px). They cite each other. Max 12 visible; older ones collapse into one row "...and N more, per Sandra". Footnote 5 cites 7 1/2: from then on a small button "7 1/2" is shown which reveals the real footnote 7 1/2 once (line FN-H). `stat 'dennis-review.footnotes'` set to the count. Footer text: "Printed on paper." which becomes "Printed on barely watered paper" at the Flip (and stays).

### 2.10 Dennis's Comments box and margin

- **Dennis's Comments (read-only, handwriting font)** always shows exactly ONE note, never the same twice running. Pool for Beats 1-8: `Noted.`, `Noted. (Again.)`, `Noted. (Disagreed.)`, `Watered.`. After "accepted by mistake": `Noted. (Almost.)`. Beat 9: the sincere lines (10.9). Beat 10: back to `Noted.` as if the warm moment never happened. Changes on every rejection or accept (pick from the bag).
- **Margin column** ("doodle column", beside the card): `attempted: 6.3` struck-out rows (coral, line-through, max 6), and from Beat 5 **green handwriting notes from Dennis** (italic, SVG-filter wobble `feTurbulence` optional, sage background, max 6; content in 10.7). The words on the form do not need to reflow (cut).

### 2.11 Appeals (Beat 3, "The Appeals Process", phase 1)

An **Appeal (Form 27B/6)** button appears under Submit at Beat 3 (1:30). Click opens a **sticky note** (yellow square, pinned dot) over the right column with a title "Form 27B/6", one mini-slider (level 1), a "Submit appeal" button and a Close x. Submitting (or committing the slider at any value) stamps APPEAL CLIPPED, awards 0.2 Meh, `appeals++`, `stat 'dennis-review.appeals'` and reveals a new button inside the note "Appeal this appeal (Form 27B/6.5)" which opens **level 2** (a smaller note on top, scale 0.7). Level 2 rejects and offers "Appeal this appeal (Form 27B/6.75)" which opens **level 3**, a note the size of a postage stamp (about 96px wide) with a 72px slider you can barely grab. Level 3 submit rejects, line AP4, `stat.max('dennis-review.depth', 3)` and fires the Appellate Judge achievement; all notes close after 1.5 s. Esc closes the top note (the stack pops one level). Max 3 note nodes ever exist. Opening an appeal while one is open focuses the top note. A flip, a cycle reset or a destroy clears the stack. `stat.max('dennis-review.depth', level)` each time.

### 2.12 Economy (all tiny, all via `api.award`)

- Rejection: 0.1 (batched: `pay(x)` accumulates; a managed interval flushes `api.award(sum)` every 1.2 s when `sum >= 0.1`).
- Accept: 0.5 immediate. Accept in the zone after the crack: 0.7. Appeal: 0.2. Sip: 0.1 (batched). Beat 9 water: 0.2. Comment trigger reply: 0.05 (batched).
- Secrets: 7 1/2 = 15 Meh, 4.99 = 7.5 Meh, ghostwriter payoff = 10 Meh, ficus = 8 Meh (once each, per cycle for ficus and ghostwriter caps at 1 payout per cycle).
- Penalties: Stamp Replenishment Levy `api.award(-0.5)` once per ink-out; leaf `award(-1)`; union break clicks `award(-0.1)` each.
- Achievement rewards come from the achievement definitions.

---------------------------------------------------------------------

## 3. State machine and timeline

### 3.1 State variables (one `S` object)

```
S.phase    : 1 (REVIEW_DENNIS) | 'flip' | 2 (REVIEW_YOU) | 'joint' | 'touch' (sub-state of 2 during Beat 9)
S.cycle    : 1.. (start = 1 + savedCycles)
S.beat     : 1..10 (highest beat entered this cycle)
S.cardIdx, S.accepted, S.incidents (session), S.rejections (session), S.cum (Sincerity this cycle), S.cracked, S.busy (spring running), S.epoch (increments on flip / cycle reset; every deferred callback checks it), S.dead
S.ml (mL delivered to YOU, starts 0.5 at the Flip, saturates below 1), S.sips, S.hydration (0..100)
S.qual (verdict qualifier index 0..4), S.reconsiders, S.appealsP2, S.plan (list <= 6)
S.ink (0..), S.intern (0..10 remaining), S.union (unionized until ms), S.potThumb (permanent after first union)
S.idleMs, S.ghost (bool), S.lastInputMs
```

### 3.2 The beat clock

`clock() = (api.now() - t0) / 1000 / K` where **K = 1** normally and **K = 0.12** when `api.selftest` (so 10 minutes = 72 virtual seconds). A managed 250 ms interval calls `tickBeats()`: for every beat `i` with `clock() >= BEAT_AT[i]` and `i > S.beat`, call `enterBeat(i)` in order (so a throttled hidden tab catches up in order, one at a time). `t0` resets at each cycle start.

| Beat | at (s) | Name | What starts |
|---|---|---|---|
| 1 | 0 | THE CLIPBOARD | Intro lines. Dennis sways, `(no draft detected)`, pencilled 5 on the tag (the first joke needs zero input). Slider works from 1 to 5; pulling past 5 just stops. First release/submit is stamped CLIPPED (3px screen shake). Sandra Post-its begin at 0:20. Comment box visible and reacting. |
| 2 | 40 | THE CEILING | Band and Sincerity gauge appear (`bandEnabled`). Margin collects struck-out attempts. Draft caption escalates. Competency descriptor "Presence" unlocked as card 2 only visually (it is already in the deck). First footnotes reference each other. Stamp mutation begins (every 4th). Dennis's leaf pings on every overpull. |
| 3 | 90 | THE APPEALS PROCESS | Appeal button. Pull strength line "Pull strength: N" (maxPull this cycle) under the slider. Prior Incidents drawer button appears (still closed). |
| 4 | 150 | THE STOP CRACKS | Per-cycle `cum >= 50` cracks the flap (else auto at Beat 5). Management panics. New rule: values above 5 need a reason (comment box mocking). Dennis's leaves droop one notch more. `(draft has requested a name)`. |
| 5 | 210 | THE ADMISSIONS | Drawer opens by itself. Reviewer line quietly reads "Reviewer: You (Valued Employee)" (as if it always did; Management does not react). `Subject: ???` flickers once for 1s (ink flicker) then `Dennis, Lobby Plant` returns. Green margin notes begin. Incident 7 1/2 pending line (if Incident 7 reached). Ficus from Accounting is MENTIONED for the first time. A toast-shaped envelope is NOT shown yet (that is Beat 7). `(draft is on the Plant Roster)`. |
| 6 | 270 | THE FLIP | See 4. (Early trigger: card count `accepted >= 8` and `clock() >= 210`; or the player types `I am Dennis` at any time.) |
| 7 | 330 | 360-DEGREE FEEDBACK | Four peer sticky notes fly in one at a time every 12 s (Gerald, Sandra, Toaster envelope, Stapler). |
| 8 | 390 | CALIBRATION SEESAW / THE COMPETENCIES TURN | The seesaw pair, weighting dial, row labels begin to mutate (one row per 35 s), qualifiers continue growing. |
| 9 | 480 | THE TOUCHING PART | See 5.1. Form fades to cream, sliders inert 20 s, one Water button. NO jokes. |
| 10 | 570 | BACK TO NORMAL | Joint Performance Plan, REVIEW COMPLETE, countdown; the new form fades in at clock 600 with Cycle N+1. |

If the Flip occurred early (typed shortcut), beats 2 to 5 are skipped silently (`enterBeat` for i < 6 does nothing when `S.phase !== 1`) and 7+ remain on the clock. If the Flip has not happened by beat 6's time it happens then.

### 3.3 Heartbeat (a new beat at least every ~20 s)

A managed 1000 ms interval checks `nextEventAt` (initially 14 s scaled). When it is due and nothing is pending, run ONE heartbeat event then schedule the next 18 to 26 s later (scaled by K). Phase 1 events rotate: Sandra Post-it (if fewer than the deck), Management aside from the P1 bag (10.5), a margin note (Beat 5+), a Dennis-Standard reminder, a caption escalation. Phase 2 events rotate: Management aside from the P2 bag, a scorecard row twitch (the number flickers to 3.1 for 400ms then back to 3.0, once, with the row text unchanged), a dev-plan nudge, the next qualifier (every 60 s scaled), a row comment refresh. Heartbeat is SUSPENDED during Beat 9 and the Joint Plan. A heartbeat Management line obeys the narrator rate limit (2.12 note in 13.3).

### 3.4 Cycles and not-ending: see section 5 and 11.

### 3.5 Behaviour on pause / hidden tab

`document.hidden` pauses nothing (it is virtual time friendly) but counts `tabs++` for Tab Discipline and records hide time. On show, if hidden > 20 s (scaled), line V1 plays and the row "Absent: Dennis noticed" is added to the Prior Incidents drawer. All animation frames use `api.requestAnimationFrame` timestamps; none run when nothing animates (stop the loop when springs are settled).

---------------------------------------------------------------------

## 4. Phase 2: the Flip and YOUR SCORECARD

### 4.1 The Flip (Beat 6 / early shortcut)

- Clear: appeal stack, comment box focus, ghostwriter, union, ficus, watering can, any stamp, pending submit; `S.epoch++`; `S.phase = 'flip'`.
- Header animation: "Performance Review of: DENNIS (Plant)" gets a red strike-through; **"Reviewer: Dennis"** and **"Reviewee: %P%"** (player name, `textContent`) are written in crayon (CSS `clip-path` wipe, 900ms). The paper turns: the card container has two faces (`front`, `back`), `perspective:1200px`, `rotateY(0 to 180deg)` over 900ms; reduced motion = crossfade 300ms. At the midpoint (450ms) the inactive face gets `visibility:hidden` and `aria-hidden="true"` (hit-testing safety) and the active face loses them. Only the active face is in the tab order.
- sfx `whoosh`. Lines FL1, FL2, FL3 via Management (priority 1, in sequence with 2.5 s gaps). `stat 'dennis-review.flips'` +1; achievement `flip`.
- `S.phase = 2`; `S.ml = 0.5`; scorecard timer starts (qualifier growth, row comments); footer paper joke goes live.
- Dennis sways in the opposite direction.

### 4.2 YOUR SCORECARD (the back face)

Six rows. Each row: label, a 5-pip meter in lilac with **3 pips filled** (pip 3 may flicker half for 400ms), a **real number to 3 decimals** in small gray monospace, a CSS padlock labeled "Reviewer's discretion", and a one-line Dennis comment beneath (10.8) that refreshes every ~10 s with the live number. The numbers are real:

| Row | Real number (3 decimals) | Measured by |
|---|---|---|
| Hovering | pointer-move events on the root (count) | `pointermove` on root, counted (do not fire a stat per event; batch) |
| Clicking Intent | clicks per Submit = `clicks / max(1, submits)` | `pointerdown` count on root and Submit presses |
| Hesitation | seconds from mount to the first Submit (if none yet: seconds since mount) | `api.now()` |
| Slider Remorse | drags that moved to a LOWER value before release (value fell by >= 0.5 from the drag's max) | drag tracking |
| Tab Discipline | visibility-hide count | `visibilitychange` |
| Water Intake | `S.ml` in mL | sips and Beat 9 drops |

Guard every number: `Number.isFinite(x) ? x : 0` before `toFixed(3)` (the NaN rule). Under the rows: a footnote line "The numbers are for transparency, not for use."

- **Verdict banner** (stamped across the bottom in sage and ink): `MEETS EXPECTATIONS (BARELY WATERED)`. It never changes its 3. The parenthetical **grows one qualifier per minute of phase-2 time (scaled)**: `BARELY WATERED` -> `BARELY WATERED, TECHNICALLY` -> `BARELY WATERED, TECHNICALLY, IN SPIRIT` -> `BARELY WATERED, TECHNICALLY, IN SPIRIT, PROVISIONAL` -> `BARELY WATERED, TECHNICALLY, IN SPIRIT, PROVISIONAL, SUBJECT TO TUESDAY` (max). Each growth is said once (lines Q1..Q4). The small flip animation on the banner text is optional.
- **Water-can counter** next to the banner: a CSS-drawn watering can (rounded rect + pseudo-element spout) and "%ML% mL" (always some fraction below 1). 
- **Hydration bar** (cosmetic, with a hatched last 0.1%).
- Buttons:
  - **REQUEST RECONSIDERATION**: Dennis tilts 3deg left, then right, then back (three 250ms steps), line from the REQ bag, "Requests: N" tooltip-free counter beside it, adds a dev-plan item.
  - **APPEAL**: files an appeal answered from the APP bag; the tray shows "Appeals: N (Pending (Pending))"; stamp `MISUNDERSTANDING OF APPEAL`; award 0.2; never changes anything.
  - **WATER YOURSELF**: a 🥛 glass button with a fill-level div; tap = a quick sip (+10% hydration), hold = repeats every 250 ms. Each sip: `S.ml = min(0.99, S.ml + 0.01)`, `+0.1 Meh` (batched), ripple ring. At 100% hydration: banner reads `(FULLY WATERED)` for 4 s with confetti 6 pieces, then `CONCERN: OVERWATERED` for 3 s, then it drains back to the current qualifier ("Barely"), line W5. `sips++`, `stat 'dennis-review.sips'`.
- **Development plan** ("Dennis's feedback for you"): starts empty; each press of any of the three buttons adds the next item (10.8), cap 6 visible (older scroll under).

### 4.3 Beat 7: 360-degree feedback (5:30)

Four peer sticky notes (yellow, rotated, pinned dot) **fly onto the form one at a time every 12 s** (translate+rotate keyframes; reduced motion = fade). At most 4 nodes. Each has a real button trio **Dismiss / Sign / Staple**:
1. **Gerald (VP of Spuds)**: body G-A if `api.flag.get('metGerald')`, else G-B (a potato, unnamed, of visible dignity). If metGerald, Gerald "nods once, unexplained": a one-frame potato-brown tint on the card (skip the tint under reduced motion).
2. **Sandra from Compliance** (a note, not an appearance): body S-C.
3. **The Toaster** (a toast-shaped envelope, CSS toast icon): clicking the note reveals `WARM`; if `api.stat.get('toaster-debate.entered') > 0` it adds a second word `AGAIN`.
4. **The Stapler** files a counter-review of the clipboard (body ST-A).
Dismiss: line PD, note fades. Sign: line PS, note fades. **Staple: the only action with a reaction**: `stamp` sfx plus line PT and a satisfying 2px shake of the note ("ka-chunk"), `stat 'dennis-review.staples'` +1. Notes never block anything and are removed at Beat 8.

### 4.4 Beat 8: Calibration Seesaw (6:30-8:00) and the Competencies Turn

- **The Seesaw**: two linked tracks on the scorecard: `DENNIS` (a position marker only, starts at 5.00) and `YOU` (a real slider, 1..5, starts at 3.000). Rule: **Dennis = min(5, 8 - YOU)**. Drag YOU up to 4.2 and Dennis sinks to 3.8. The whole clipboard tilts `rotate(clamp((YOU-3)*2, -4, 4)deg)` with a spring ease (reduced motion: no tilt). On release YOU returns to 3 by exponential decay `Y = 3 + (Y0 - 3) * exp(-t / tau)` with `tau = 0.6 + 0.12 * pullHardness` (pullHardness = `(Y0 - 3)` times 5, max 6 s), displayed to 3 decimals and so **never exactly 3.000 until it looks like it is** (rounded display). Dennis follows. When YOU first reaches >= 4.5 the **Chairperson of the Seesaw Committee** achievement fires; line SE2. First drag: line SE1.
- **Weighting Committee**: three buttons (Photosynthesis, Presence, Tuesday). Every choice is cosmetic; the choice changes a one-line caption and Management line WT1/WT2/WT3.
- **The competencies turn**: the scorecard row labels mutate one at a time (one row per 35 s scaled) into the alternates: Hovering -> `Eye Contact With Foliage`; Clicking Intent -> `Seasonal Enthusiasm`; Hesitation -> `Photosynthetic Patience`; Slider Remorse -> `Regret (Leaf-Related)`; Tab Discipline -> `Attendance (Spiritual)`; Water Intake -> `Watering Compliance (Employee)`. The numbers stay real. Management says line CT1 on the first mutation.

---------------------------------------------------------------------

## 5. Beats 9-10, the cycle and the not-ending

### 5.1 Beat 9: The Touching Part (8:00-9:30)

**No jokes for exactly one screen.** Heartbeat and post-its are suspended; the idle ladder is suspended; Management does not speak except the single warm line; no sfx except one soft `bell`.
1. The form fades to cream (`--dr-paper` fills the whole module, other colors desaturate via a class, 1.5 s).
2. Sliders and all buttons except **Water** are inert for **20 seconds** (3 s under `api.selftest`) with `aria-disabled` (not `disabled`, to keep focus).
3. Dennis's comment (handwriting) writes slowly: `Came back.` then after 6 s `Came back again.` then `You came back every Tuesday.` (one single sincere comment ends the beat; the single word rule is broken once, deliberately).
4. The **Water** button (the only interactive element): each press gives Dennis one drop and **gives you one drop in return** (two 💧 drift, `S.ml += 0.05` capped at 0.99, `award(0.2)`), no line.
5. After the inert time, Management says exactly ONE line (BT3 or BT4 in order, rotating by cycle): Dennis's feedback for you is `Shows up.`; then a single leaf on Dennis moves 2 mm (CSS translateX 2px of one leaf), and `bell`.
6. After the last comment shows, a quiet 6 s, then line BT5 ("Thank you for the water...") releases the beat; the cream wears off.

### 5.2 Beat 10: Back to Normal, Like Nothing Happened (9:30-10:00+)

1. **JOINT PERFORMANCE PLAN (BARELY WATERED)** screen: the two faces slide together and are stapled (CSS translate + a staple glyph with `stamp` sfx). Subject: Dennis and You. Reviewer: each other. Overall rating: Meets Expectations. Goals for the next period: 1. Maintain Meets Expectations. 2. See goal 1. Dennis signs with a drop of saved water (line J3). The large stamp `REVIEW COMPLETE` slams, `fanfare`, confetti 40 pieces, Final Rating panel: "Dennis: 5 (Rejected)" and "You: Meets Expectations (Barely Watered)" "both accepted, both rejected". A line reads "You have finished reviewing Dennis. Please begin reviewing Dennis." The mL counter quietly becomes `1.000` and the score stays 3. A footnote with a citation to nothing: "Dennis has grown 0.3 cm." An Acknowledge button (real `<button>`) that does nothing (line J7). `stat 'dennis-review.cycles'` +1.
2. A tiny countdown starts: "Next review: 10 seconds" (10 s, 3 s under selftest), then "Next review: now".
3. **The new form fades in**: `Review Cycle 2` (cycle names 5.3), the slider clips at 5 again (flap back), YOU face gone, `S` reset (phase 1, beat 1, `cum=0`, cards reshuffled with Photosynthesis first and Tuesday last, `t0` reset), `api.save.set('cycles', n)`, `api.setTitle(...)`. **Management says nothing** (no line). Dennis's note: `Noted.`. The competency Presence is spelled **Presense** permanently (persisted `typo` flag; also in a returning player's session from mount) and nobody mentions it (except Appendix Leaf 0, 10.11).

### 5.3 Cycle naming and silent changes

Cycle labels: cycle 2 = `Review Cycle 2`, 3 = `Review Cycle 2 and a half`, 4 = `Review Cycle 3 (disputed)`, 5 = `Review Cycle 3 and a bit`, 6 = `Review Cycle 4 (see Cycle 2)`, 7+ = `Review Cycle N (as amended)`. Silent changes (one per cycle, never announced; the builder applies the one for the cycle number): cycle 2 Presense (permanent); cycle 3 the stamp is dry and reads only DENNIS; cycle 4 the glass is a larger glass; cycle 5 Dennis has quietly rated the clipboard (an extra footnote says so); cycle 6 the half card is spelled "Competency 7 1/2 of 12 (Reconsidered)"; cycle 7+ a leaf more (Dennis gains one leaf per cycle already, cap 9 = a bush). The Joint Plan's goals never change. Beat lengths are the same; intro lines in cycles 2+ come from the `m:dennis-review:repeat` bag (10.14). Dennis's Comments line in cycle 2+ is `Noted.` at start.

---------------------------------------------------------------------

## 6. Secrets and rare events (each: trigger, effect, reward)

### 6.1 The 7 1/2 (secret, achievement `sevenhalf`)
Needs the zone open (post-crack). Release with `|v - 7.5| <= 0.06` (keyboard: ArrowRight in 0.5 steps reaches exactly 7.5). The stamp becomes **ACCEPTED** in mint green for a full 1.4 s with `ding` and 12-piece confetti and line X1; then the thumb springs to 5 with a heavy visual snap and the stamp changes to CLIPPED with "per policy, with feeling" stamped smaller beneath; Sandra's exemption line X2. +15 Meh. Counts as a rejection incident AFTER the sequence (Incident N is clipped).

### 6.2 The Final Hundredth (secret, achievement `hundredth`)
Release (or keyboard-commit) at exactly `round2(v) === 4.99`. No snap-back: the thumb STAYS, a green stamp slams `ACKNOWLEDGED (0.01 OF A LEAF)`, line X3, one confetti leaf, +7.5 Meh once per session (`api.save` flag so it pays once ever; achievement fires), then the submission is recorded as 5 anyway (the accept path runs after 1.5 s). Reachable by keyboard: press `5` then Shift+Left once. By pointer it is luck (mention in comments of the code, not on screen).

### 6.3 Ficus from Accounting (secret, achievement `ficus`)
Rolling keystroke buffer (last 12 characters, lower-cased, only when focus is NOT in an input/textarea) matching `ficus`: a ficus in a pot appears at the far right for 10 s (scaled) with a Sandra post-it on the pot "Do not engage" (handwriting). Line X4. A rating committed while it is visible is accepted at its **true value with no clip**: line X5, Dennis's leaves droop two notches, +8 Meh (once per cycle). The next card's Dennis Standard strip adds the "since you rated the ficus" remark (X6). It leaves after 10 s "like it was never there". Never in phase 2.

### 6.4 The Watering Can (secret, achievement `overwatered`)
Type `water` (rolling buffer outside inputs) or press `W` five times within 8 s. The cursor becomes a CSS-drawn watering can (absolutely positioned div following the pointer, `pointer-events:none`, updated from `pointermove` at most once per rAF). Line X7. Click Dennis to pour: 💧 particles (max 12 nodes, CSS fall), leaves brighten (`--droop` toward 0 for 4 s), a drop counter ticks; in phase 2 the banner reads `(FULLY WATERED)` for 4 s then `CONCERN: OVERWATERED` (same as 4.2). Pour 3: line X8. **7 pours**: Dennis blooms one small CSS flower (🌼-colored circle petals + a center, drawn with CSS) that appears **permanently** (saved flag) and is **never explained** (line X9; no other line mentions it, ever). Esc disarms; auto-disarm after 30 s. `stat 'dennis-review.pours'`.

### 6.5 Accepted by mistake (rare event, achievement `nearlyliked`)
On Submit accept, **1 in 40** (1 in 8 under `api.selftest`), never in Beat 1 or Beat 10: the stamp reads **ACCEPTED** in green, confetti drops, line Y1. Two seconds later the stamp is peeled off in an animated tear (CSS clip-path + translate), the confetti is vacuumed (visual only: a `whoosh` and the confetti canvas is left alone), and a second line reads `ACCEPTED (by mistake; recalled)`. Dennis's Comments: `Noted. (Almost.)`. Line Y2. The competency still advances normally.

### 6.6 The slider rates itself (rare, 1 in 25 rejections)
The slider drags itself to 1 over 600ms, pauses 2 s, then to 5 (spring), input locked meanwhile (max 3 s watchdog). Line Y3. Never during Beat 9 or the Joint Plan.

### 6.7 Resize and tab rare events
- Root `clientWidth` < 480 (read on `resize` and on pointer events): once per mount Dennis is rewritten as **Dennis (Compact)** (pot shrinks to 80px tall), the form scrolls horizontally on a tiny desk drawn in CSS, Management says Z1 and Z2 (a performance factor). Widening again: Z3 (Dennis unfolds), once. Root `clientWidth` > 1200: Z4 once.
- Hidden tab longer than 20 s: line V1, "Absent: Dennis noticed" row.

### 6.8 I am Dennis (secret shortcut, achievement `iamdennis`)
The text `i am dennis` (case-insensitive) in a submitted comment, or typed anywhere outside inputs via the rolling buffer, before the Flip fires the Flip **immediately**; lines FL-D1 and FL-D2 instead of FL1/FL2.

### 6.9 Honorary Shop Steward and others
See section 7 (union). 

---------------------------------------------------------------------

## 7. Behavior on idle and on spam

### 7.1 Long idle ladder (idle = no pointer move/down, keydown or touch inside the root; thresholds in real seconds, multiplied by **0.3 under `api.selftest`** so the harness's 62 s idle reaches the payoff)

| Idle | What happens |
|---|---|
| 45 s | Quiet line I1. |
| 60 s | **Ghostwriter**: the form dims, Dennis's leaves rustle in a slow wave. Phase 1: a green pen-scrawl (SVG path with `stroke-dasharray` animated by delta, static text under reduced motion) fills the current card with a rating of **5** and `Present, spiritually.`; line I2. Phase 2: Presence on the scorecard climbs to **5** and is stamped ACCEPTED (mint). |
| 90 s | **Payoff**: line I3, +10 Meh (once per cycle), `stat 'dennis-review.ghostwritten'`, achievement `silence` (Employee of the Silence). |
| 120 s | The form moves YOU onto the **Plant Roster** as Shrub (Junior); line I4; if the scorecard is showing the Stillness comment reads Exceeds (I5); achievement `shrub`. |
| 240 s | Dennis shuffles to the window: the pot slides left on the SVG, the form dims, a sunbeam strip appears; whisper line I6 ("Back in 7 1/2 minutes"). |
| 600 s | The form files itself: stamp across the card `Resigned (Photosynthesis)`, line I7. |
| any input | Everything un-dims. Phase 1: if ghostwriter had started, line I8 and Dennis's Comments `Watered.`; the card remains where you left it (the written 5 is erased). Phase 2: the 5 **snaps back to 3 with `sad`** and line I9 "Presence has been withdrawn due to presence." After the 240 s window: line I10. After 600 s: the stamp is wiped and line I11. The ladder repeats at most once per 3 minutes. |
Idle is SUSPENDED during Beat 9 and the Joint Plan.

### 7.2 Spam, three targets (windows use `api.now()`; the fuzz harness will hit these constantly, so every outcome must auto-recover)

1. **Submit spam: 12 or more Submit presses in 3 s** -> **the stamp runs out of ink**. Staged over the next rejections/accepts: stage 1 the stamp is lighter (opacity 0.5); stage 2 it writes only `REJ`; stage 3 a hand-drawn `CLIPPED` on a sticky note (marker font) pops over it; then line K1 and the **Stamp Replenishment Levy** `api.award(-0.5)` ONCE; then the stamp is handed to a very tired **intern**: the next **10** stamps play in slow motion (animation 1.4 s) each with `sad` sfx and the intern sigh (a sticky "sigh." text for 600ms); line K2; after 10: line K3; `S.ink` resets. Max one ink-out per 60 s. Never blocks input.
2. **Dennis clicks: 10 within 8 s** -> he sheds a leaf (2.6) with leaf-loss lines. A peaceful 20 s regrows one.
3. **Slider releases: 15 within 6 s** -> **the slider unionizes**: the thumb lies down flat (rotate 90deg), a CSS picket sign with `ON BREAK` appears, the Stapler speaks for it (lines U1, U2), the slider is locked for **7.5 s** (2 s under selftest) with a visible countdown labelled `Break (Mandatory)`, each further click on the slider during the lock `award(-0.1)` with the engine floater. When the break ends the slider returns with a **pot-shaped thumb for the rest of the session** (saved flag, line U3 "Better pot: granted"), achievement `union`. Submit and everything else remain usable during the lock. Max one union per 90 s.
4. Rapid clicks on the thumb do not otherwise punish.

---------------------------------------------------------------------

## 8. Persisted data, stats, scoreboard

`api.save`: `{cycles:int, typo:bool, flower:bool, pot:bool, hundredth:bool}`. Everything else is per-mount.

Stats (all prefixed `dennis-review.`; keep to a few counters): `rejections clipped accepted sincerity maxPull appeals depth touches pours sips flips cycles footnotes ghostwritten unions inkouts leaves mistakes staples reconsiders`. `api.stat.inc` on every key action. Never `inc` per pointermove (batch Hovering locally and `stat.set('dennis-review.hover', n)` at most every 5 s).

Optional tiny scoreboard: none. The Meh counter is the engine's.

---------------------------------------------------------------------

## 9. Achievements (ids prefixed `dennis-review.`; 18 declared, 9 secret)

Use `reward` 2 to 15. `check(stats)` where noted; otherwise `api.achieve(id)`.

| id | name | desc | secret | reward | trigger |
|---|---|---|---|---|---|
| dennis-review.first | Grand Marshal of Photosynthetic Assessment | Submit your first rating of Dennis. It was clipped. It was always going to be clipped. | no | 2 | first rejection |
| dennis-review.clipped10 | Order of the Clipped Five (with Oak Leaf Cluster) | Have 10 ratings clipped back to 5. The oak leaf cluster is a regular leaf. It is clipped too. | no | 3 | check `stats['dennis-review.clipped']>=10` |
| dennis-review.misunderstood25 | Grand Marshal of Misunderstanding | Be rejected 25 times for a misunderstanding of Dennis. | no | 5 | check `rejections>=25` |
| dennis-review.elastic | The Order of the Pulled Elastic, First Class | Apply 100 newtons of Sincerity to a slider that has asked you not to. | no | 5 | check `sincerity>=100` |
| dennis-review.nest3 | Appellate Judge of the Third Nest | Appeal an appeal of an appeal, on a form the size of a postage stamp. | no | 5 | level 3 submitted |
| dennis-review.flip | Supreme Reviewer of Reviewers (Retired, Pending) | Discover who has been reviewing whom. It was in the small print under the pot. | no | 5 | Flip |
| dennis-review.seesaw | Chairperson of the Seesaw Committee | Raise yourself to 4.5 and sink Dennis by the same amount in the same second. | no | 4 | seesaw |
| dennis-review.chancellor | Chancellor of the Barely Watered Reports | Complete all 12 competencies, and the half one, in one cycle. You are now qualified to continue. | no | 8 | card 12 accepted with all 13 visited |
| dennis-review.cycle2 | Nothing Has Changed | Begin Review Cycle 2. It is the same form. Please enjoy the new feeling. | no | 3 | cycle start |
| dennis-review.sevenhalf | Knight Commander of Seven and a Half | Release the leaf on the unlabeled 7 1/2 tick and be briefly, genuinely accepted. | YES | 15 | 6.1 |
| dennis-review.hundredth | Sovereign of the Final Hundredth Leaf | Release the slider at 4.99. Dennis is aware of the 0.01. It will never be forgiven, only noted. | YES | 8 | 6.2 |
| dennis-review.silence | Employee of the Silence | Do nothing for 90 seconds and be rated 5 by a plant. | YES | 10 | 7.1 |
| dennis-review.shrub | Shrub (Junior), Honorary | Go 120 seconds without touching anything. Dennis files you on the Plant Roster. | YES | 8 | 7.1 |
| dennis-review.overwatered | Overwatered Sovereign of the Lobby | Water Dennis 7 times and receive a flower no one will explain. | YES | 8 | 6.4 |
| dennis-review.ficus | Persona Non Grata of Accounting | Rate the ficus while it is visible. Sandra has a post-it for this. | YES | 6 | 6.3 |
| dennis-review.nearlyliked | Nearly Liked | Be accepted by mistake. It was recalled. Dennis was not told. | YES | 5 | 6.5 |
| dennis-review.union | Honorary Shop Steward | Cause a slider to unionize. The Stapler is proud, in a way it cannot articulate. | YES | 5 | 7.2 |
| dennis-review.iamdennis | Dennis, Delighted | Announce that you are Dennis. Dennis is delighted to be identified. | YES | 4 | 6.8 |

Declare all of them in the file with `P.addAchievements`. Icons: use plain safe emoji from the allowed list (🌿 🍃 🌱 💧 🥛 🌼 📋) or omit.

---------------------------------------------------------------------

## 10. Lines (ALL FINAL, VERBATIM)

### 10.0 Token handling
Placeholders replaced by a local `fill(str, vars)` before ANY text reaches the DOM or `api.say` (default every var so nothing ever prints `undefined`, `null` or `NaN`):
`%V%` the rating value (1 to 2 decimals, trailing zeros trimmed, e.g. 3, 4.5, 6.3); `%D%` distance (`abs(5 - v)`, 2 decimals trimmed); `%NW%` newtons (1 decimal); `%C%` a count; `%P%` the player name (`api.player.name`, via `textContent`); `%T%` echoed comment (braces stripped, max 60 chars); `%ML%` mL (3 decimals); `%CY%` the cycle label. If a line needs a token the code lacks, replace it with a sensible default (e.g. `%V%` -> `5`). `{player}`, `{meh}` etc. are the engine tokens and are NOT used in this file except where noted. Dialogue arrays are added with `P.addLines('m:dennis-review:<cat>', [...])` and read with `api.line('m:dennis-review:<cat>')` (shuffle bag, no immediate repeats). Group names below match the categories.

### 10.1 Intro and nudges (`intro`)
- M1: Welcome to Annual Performance Review (Quarterly). Today's subject is Dennis, Lobby Plant. Tenure: always.
- M2: Please rate Dennis from 1 to 5. Dennis has already rated your rating. It is under review.
- M3: Competency 1 of 12: Photosynthesis. Take your time. Dennis is.
- M4: The slider is not broken. The slider is aligned with Dennis.
- M5 (nudge at 12 s with no input): Please drag the leaf. The leaf has been looking forward to it.
- M6 (nudge at 28 s with no release): Dennis has pencilled in a provisional 5. You may overwrite it with any number that will be corrected.
Say M1 at mount (priority 1), M2 4 s later (priority 0), M3 on the first card, M4 on the first slider touch.

### 10.2 Rejection pools (shown on the form; narrator says every 2nd one)
LOW (`low`, v < 2.5):
- L1: A %V%? Dennis has been in the lobby for 11 years and has never once been a %V%. Rating returned. Clipped to 5.
- L2: Rating of %V% rejected as 'a misunderstanding of Dennis'. Dennis would like you to sit with that.
- L3: Dennis does not accept numbers that small. Dennis accepts light, water and, grudgingly, 5s.
- L4: You have rated Dennis %V%. Sandra from Compliance has moved the %V% to a drawer with no %V%s in it.
- L5: Your %V% has been recorded, laminated and recycled into a 5. We are a green company.
- L6: Ratings below 2.5 are reserved for plants that have not yet been approved. None have been.

MID (`mid`, 2.5 <= v < 4.5):
- D1: A %V% implies a 5 exists. Dennis finds this insulting. Rating: 5.
- D2: Your %V% has been recorded as 'a lot of light.' Dennis took it personally.
- D3: Rating of %V% entered at 4:17 PM and withdrawn at 4:17 PM. Sandra has the paperwork.
- D4: Scores of 4 and under are reserved for plants that are not Dennis. All of them are in Accounting.
- D5: Dennis was described as 'a 4' once, in 2019. That reviewer is now a ficus.
- D6: A %V% is a number with no stake in anything. Clipped to 5.
- D7: Form 27B/6-R does not support disagreement. Form 27B/6-S (Support for Disagreement) is out of stock.
- D8: Ratings below 5 are for plants that are not Dennis. Dennis is the one by the window.

THREE (`three`, exactly 3):
- T1: A 3 is what you give a person. Dennis is a plant. Rating raised to 5 to correct for category.
- T2: Average is a concept for animals that move. Clipped to 5.
- T3: A 3 means 'Meets'. Dennis does not meet. Dennis is met.

HIGH (`high`, 4.5 <= v < 5):
- H1: A %V%. So close that Dennis has checked the floor for the other %D%.
- H2: Dennis accepts the %V% the way a plant accepts anything: by already having been 5.
- H3: %V% implies hesitation. Dennis has never hesitated. Dennis has never done anything. It is a record.
- H4: Almost. Dennis does not do almost. Dennis does sunrise.
- H5: Clipped. The 5 is a ceiling, a floor and, on Thursdays, a wall.

FIVE / ACCEPT (`five`, on Submit at 5 or a release at exactly 5; every second one is said):
- F1: Thank you for the 5. It has been adjusted to 5. This is the most honest thing the form has done all day.
- F2: You rated Dennis 5. Dennis is 5. You have confirmed Dennis, which is not your role.
- F3: 5 received. 5 was anticipated. 5 has been placed on the board with the other 5s.
- F4: A perfect score. Dennis has not responded, having no mouth, but there was a rustle.
- F5: Rating accepted. Please do not mistake this for a victory. It was a formality with feelings.
- F6: Management is pleased. Management is not sure with what.

OVERPRE (`overpre`, pulled past the closed stop):
- O1: Your %V% has been struck out and moved to the margin, where it will remain as a warning.
- O2: A 5 implies a ceiling. Dennis does not recognise ceilings, only skylights.
- O3: Sincerity Applied: %NW% newtons. Per policy, newtons of sincerity are not legal tender.
- O4: The stop at 5 held. The stop at 5 is not a suggestion. The stop at 5 is a stop.
- O5: You pulled so hard the slider has asked to be called 'Sir.' Sir has been added to the form.
- O6: Your %V% has been forwarded to Dennis. Dennis has not responded and is considered to have agreed.

OVERPOST (`overpost`, zone open, 5 < v < 10.5):
- P1: Anything past 5 is the Misunderstanding Zone. Management does not maintain it. It maintains itself.
- P2: Rating %V% exceeds the form. Dennis is flattered and has clipped you to 5 for your own safety.
- P3: %V% is not a number Dennis has met. Dennis would like to be introduced, in writing.
- P4: Rating snapped to 5. The snap was consensual.
- P5: You have gone past 5 by %D%. Dennis has gone past 5 by being Dennis.
- P6: The Misunderstanding Zone has accepted your %V% and given nothing back, per its charter.

HUGE (`huge`, v >= 10.5):
- U1H: A rating of %V% has been logged as a cry for help. Referred to Dennis. Dennis did not respond.
- U2H: %V%. The form was not built for this. The form would like a moment, and a larger form.

Reason required (`reason`, post-crack, value above 5 on Submit or commit):
- R1: A reason is required for any rating above 5. 'Because' has been accepted as a reason and will be used against you.
- R2: Noted: '%T%'. This has been filed under Reasons and will be mocked at the quarterly.
- R3: Values above 5 must be accompanied by a reason. Your reason is the blank space. It has been noted. It is also blank.

Misc rejection lines:
- WD: Withdrawn. Clipped anyway.

### 10.3 Competencies: titles, descriptors, Dennis Standard comments (`comp`)
Cards in this order (Photosynthesis first, Handling Tuesday last; the half card sits after card 7):
1. Photosynthesis. Descriptor: Turns light into air, politely. Standard: Photosynthesis: Dennis converts sunlight into oxygen and stares into the middle distance. Outstanding.
2. Presence (cycle 2+: Presense). Descriptor: Being there. Being there, at length. Standard: Presence: Dennis has attended every meeting held within 3 feet of Dennis. No one has been able to prove he is not a participant.
3. Posture. Descriptor: Graded on the lean. Standard: Posture is graded on the lean. Dennis leans toward the window. This is considered ambition.
4. Reaching Toward Light. Descriptor: Direction of travel: window. Standard: Reaching Toward Light: 4 centimetres in one year, directly at a window. A self-starter.
5. Dress Code Adherence. Descriptor: Green. Business casual. Always. Standard: Dress Code Adherence: green, always. Dennis has never been seen in casual Friday. He is Friday-neutral.
6. Cross-Functional Roots. Descriptor: Support at ground level. Standard: Cross-Functional Roots: Dennis has quietly supported eleven colleagues by being near them. The ficus in Accounting is a separate file.
7. Stillness Under Pressure. Descriptor: Not moving, with intent. Standard: Stillness Under Pressure: unmatched. We looked for movement. We took a long time looking.
7 1/2. Closing (half card). Descriptor: Closing (the other half is in a drawer). Standard H7: Competency 7 1/2 of 12: Closing. Half a rating has been received. Half a rating has been filed.
8. Water Intake Management. Descriptor: Requests water through body language. Standard: Water Intake Management: 40 percent adequate. Dennis calls this a plan.
9. Responsiveness to Feedback. Descriptor: Feedback is a form of weather. Standard: Responsiveness to Feedback: Dennis has received no feedback in eleven years and has not responded to any of it.
10. Conflict Resolution. Descriptor: No conflict has occurred within reach. Standard: Conflict Resolution: no conflicts reported. Management suspects Dennis is the reason. Management is afraid to ask.
11. Mentoring. Descriptor: Grows things. Mostly himself. Standard: Mentoring: Dennis has grown a small cutting. It is not on the org chart. It reports to Dennis.
12. Handling Tuesday. Descriptor: Tuesday is coming. Dennis is already there. Standard: Handling Tuesday: Dennis does not move for Tuesday. Tuesday has never asked him to. (Delivered slower: say it after one beat of silence, 1.5 s.)

### 10.4 Accept / progress asides (`accept`, every 2nd accept)
- AC1: Competency %C% complete. Dennis has not been told. Dennis was already complete.
- AC2: Your rating has been filed under 5, alongside every other rating.
- AC3: Thank you for your input. Your input has been forwarded to a plant.
- AC4: Progress: Almost. Management will update you when it becomes Slightly More Than Almost.
- AC5: You earned 0.5 Meh for that competency. Dennis earned nothing. Dennis is not paid in anything.
- AC6: Management has reviewed the progress bar. The progress bar reads Almost.

### 10.5 Heartbeat asides, phase 1 (`aside1`) and Sandra Post-its (`sandra`)
Aside bag phase 1:
- A1: The committee has agreed to disagree. The committee is also Dennis. Dennis is a plant.
- A2: Please do not shake the Submit button. Dennis is a plant and a plant is not a snow globe.
- A3: Management is not saying Dennis is perfect. Management is saying that no one has found the form for that.
- A4: Dennis has asked that you stop saying 'sincerely.' Dennis feels it is doing too much of the work.
- A5: Per my previous message. (There was no previous message.)
- A6: I will circle back to your review. I have never been to the place I am circling.
- A7: Appendix Leaf 7 1/2 states that a rating must not be 'received with enthusiasm.' You have been enthusiastic.
- A8: Dennis is not angry. Dennis is leaning, which is how Dennis is angry.
- A9: The form has been open for a while. Human Resources considers this a Thursday.
- A10: Review cycles are measured in Tuesdays. Please bring a Tuesday.
- A11: The only person who can rate Dennis a 5 is Dennis. Dennis has declined. Dennis feels it would be rude.
- A12: Photosynthesis is not a hobby. Photosynthesis is Dennis, with the volume down.

Sandra Post-its (10 + 1, on the sticky note itself, 'SANDRA, COMPLIANCE:' prefix):
- S1: The scale legend now reads 1 = Exceeds, 5 = Exceeds. Please be consistent.
- S2: The half-point has been retired. Please do not use it, or find it.
- S3: Thursdays are now mandatory. This is not a Thursday. Plan accordingly.
- S4: Ratings must be submitted left-handed. Dennis cannot tell which hand. Do it anyway.
- S5: The Submit button has been renamed. Please do not ask it why.
- S6: Form 27B/6-S (Support for Disagreement) is out of stock. Form 27B/6-R remains in stock, in quantity.
- S7: Tuesday is the deadline for all reviews. No one has said which Tuesday.
- S8: The number 5 is too similar to 4 when squinting. A flag has been filed. The flag has been clipped to 5.
- S9: Please stop looking at the ficus. The ficus has noticed.
- S10: Post-its are not an approved medium. This post-it has been approved retroactively.
- S11 (append once if metGerald): Gerald has been copied on this. Gerald has not responded. He is a potato.

### 10.6 Footnotes (in order, one per accepted rating; max 12 visible; collapse row `...and %C% more, per Sandra`)
1. * Dennis is a plant.
2. † See *.
3. ‡ Dennis has not been informed of this footnote. Dennis is aware of it.
4. § See †, which refers to ‡, which refers to nothing.
5. || Printed on the back of the pot. See footnote 7 1/2.
6. ¶ Sandra has reviewed this footnote and found it accurate, in part.
7. ** The ficus in Accounting is a separate file.
8. †† Tuesday is not a footnote. It is, however, cited.
9. ‡‡ 'Misunderstanding' is used here in its administrative sense.
10. §§ This footnote has been left blank so that it may be read.
11. ¶¶ Dennis is 0.3 cm taller than last cycle. Citation: none.
12. *** See *.
- FN-H (footnote 7 1/2, click once): 7 1/2. This footnote exists only if you believe in it. You do.
- Cycle 5 extra footnote: ††† Dennis has quietly rated the clipboard. The rating is on the clipboard.

### 10.7 Beat intros, crack, admissions, margin notes (`beat`)
- B2: Management notes that you have been testing the right-hand edge of the slider. The edge has been informed.
- B3: A new button has been added: Appeal (Form 27B/6). It will not help. It is, however, a button.
- B4: The stop at 5 has been inspected. The inspector sat on it. It is not fine.
- G1 (the crack): The stop at 5 has cracked. This is not covered under warranty. The warranty is also a plant.
- B5: Management has updated the Reviewer line. Management would like to say it was always like that.
- Pull strength readout: `Pull strength: %NW% newtons` (no line).
- Draft captions (not spoken): see 2.6.
- Dennis margin notes, green handwriting (cap 6, in order): Sit down. / Still here. / Noted: the cursor. / Leaning toward you. Do not read into it. / Posture: yours. / 9:04 AM.
- Dennis's Comments (single word family, never the same twice running): Noted. / Noted. (Again.) / Noted. (Disagreed.) / Watered. / Noted. (Almost.) (only after accepted by mistake).

### 10.8 Phase 2: flip, scorecard, buttons, plan (`flip`, `card`)
Flip (say in order, 2.5 s apart, priority 1):
- FL1: Upon review, the review has a second page. Management regrets not mentioning the second page, and the first.
- FL2: Correction: this form was never about Dennis. It was addressed to Dennis. You have been filling in his copy.
- FL3: Your scorecard is ready. Please sit down. It is still a chair, as far as we know.
- FL-D1 (typed shortcut): You are Dennis. Dennis is delighted to be identified. Please water accordingly.
- FL-D2 (typed shortcut): The reviewer has been identified. We will pretend this was a surprise.
- FL4 (heartbeat later): Overall: Meets Expectations (Barely Watered). Dennis has lowered his own expectations to make this possible.
- FL5: Reviewer: Dennis. Reviewee: %P%. It was in the small print, which is under the pot.
- FL6: Dennis has been taking notes since 9:04 AM. He has no hands. The notes are very good.
- FL7: Please disregard the header. The header was changed by someone with more soil than you.

Phase 2 asides (`aside2`, heartbeat):
- A21: Management is not permitted to comment on the scorecard. Management would like it noted that it tried.
- A22: Your scorecard has been available for some time.
- A23: Appeals may be filed with Dennis. Dennis is the one who decides.
- A24: Dennis has been promoted to Plant, Senior. Dennis did not attend the ceremony because Dennis is a plant.
- A25: Dennis would like to thank no one. Dennis would like it noted that he did all this without legs.
- A26: Management would like to be rated. Management is not on the form. Management has added itself and rated itself a 3.
- A27: Dennis returns from a salad station where Dennis was briefly the entire salad station. Dennis lists this under Hobbies.
- A28: Please do not take the 3 as a compliment. Please do not take it as anything.
- A29: The lobby is barely watered. Management would like to be clear that this is a weather report.
- A30: Management has been asked to stop saying 'per policy.' Management has noted the request, per policy.

Scorecard row comments (shown under each row, refreshed ~10 s; `%V%` the live real number):
- CR1 Hovering: Hovering: %V% movements. Dennis counted them. Dennis had time.
- CR2 Clicking Intent: Clicking Intent: %V% clicks per submission. Dennis did not click. Dennis has never clicked.
- CR3 Hesitation: Hesitation: %V% seconds before your first submission. Dennis would have waited for the sun.
- CR4 Slider Remorse: Slider Remorse: %V% drags returned to a lower value before release. Dennis forgives. Dennis has not said so.
- CR5 Tab Discipline: Tab Discipline: %V% departures. Dennis noticed every one. Dennis cannot leave.
- CR6 Water Intake: Water Intake: %ML% mL. Dennis considers this 'a good start.'
- Mutated labels (see 4.4) keep the same comment text.

Qualifier growth lines (`qual`):
- Q1: Your 'Barely Watered' has been updated to 'Barely Watered (Technically).' Please do not take it as a compliment.
- Q2: Your 'Barely Watered (Technically)' has gained 'In Spirit.' The spirit has not been consulted.
- Q3: Your rating is now 'Provisional.' Provisional is the highest status available and does not last.
- Q4: Your rating is now 'Subject to Tuesday.' Tuesday has been informed.

Reconsideration (`req`, cycle through in order, then bag):
- RQ1: Request for Reconsideration received. Dennis has leaned 3 degrees to the left. This is his answer.
- RQ2: Request received. Dennis has leaned 3 degrees to the right. This is his other answer.
- RQ3: Dennis has returned to center. This is neither an answer nor not an answer.
- RQ4: Request %C% has been received. Requests beyond the third are filed in the sun.

Appeals, phase 2 (`app`):
- AP1: Appeal filed. Dennis is considering it. Dennis considers things in seasons.
- AP2: Appeal denied. Appeal appealed. Appeal denied again, in a different font.
- AP3: Your appeal has been placed in the sun. It is now a tan appeal.
- AP4P: Your appeal has been read aloud to the Third Ficus. The Third Ficus abstained.
- AP5: MISUNDERSTANDING OF APPEAL. Please do not appeal this stamp. It is also a stamp.

Sips (`sip`):
- W1: Sip logged. Hydration: Barely.
- W2: Another sip. Dennis has noted your posture. It is upright. Dennis is envious.
- W3: Hydration noted. Dennis would like you to know he is not keeping count. He is keeping count.
- W4: Water Intake: %ML% mL. Dennis considers this 'a good start.'
- W5: Hydration has reached 100%. It has been brought back down to Barely for the sake of continuity.
- W6: Concern: Overwatered. The form has noted your thoroughness and is not in favour of it.

Development plan items (in order, one per press, cap 6 visible):
- 1. Sunlight.
- 2. See item 1.
- 3. Attend one meeting near Dennis.
- 4. Stand in sun, discreetly.
- 5. Sip water. Do not announce it.
- 6. Revisit item 1, with feeling.
- Plan opened line (`plan`): Dennis has opened a development plan for you. Item one: sunlight. Item two: see item one.

### 10.9 Peers, seesaw, weighting, competencies turn (`peer`, `see`)
Peer notes:
- G-A (Gerald, only if metGerald): Gerald, Vice President of Spuds: 'A root is a root.' (Gerald has also rated himself 5 potatoes and Dennis 5 potatoes, with 'a compelling green.' Both are rejected.)
- G-B (not met): A potato, unnamed, of visible dignity, writes: 'A root is a root.' (The potato has rated itself 5 potatoes. Rejected.)
- S-C: Sandra from Compliance: 'Dennis is compliant. %P% is compliant-adjacent. I have flagged the adjacency.'
- T-D (toast envelope): one slice of toast, sealed in an envelope. It reads: WARM (and AGAIN if the player has entered toaster-debate).
- ST-A: The Stapler has submitted a counter-review of the clipboard. The clipboard has been found 'a little too supportive.'
- Peer lines (`peer`): PD (dismiss): Dismissed. The note has been returned to the sender, who is on the note. / PS (sign): Signed. Your signature has been compared with Dennis's. Dennis has no signature. The comparison was brief. / PT (staple): KA-CHUNK. The Stapler has been consulted and approves of the stapling. It is all the Stapler asks.
- Beat 7 intro (`beat`): B7: Peer reviewers have been contacted. Peer reviewers have responded. Peer reviewers are about Dennis.
- Extra: Peer Review #2: 'He never speaks, but he is always there. In my day we called that leadership.' Rejected, for being nice. (heartbeat once in Beat 7-8)

Seesaw and weighting:
- B8: The Seesaw is not a metaphor. It is a seesaw. Please keep your hands inside the form.
- SE1 (first drag): When you go up, Dennis goes down. This is called 'calibration.' Dennis is not sorry.
- SE2 (reaching 4.5): Calibration is not zero-sum. It is, however, zero.
- SE3 (release): Calibration complete. Both parties have returned to where they were. The seesaw notes the effort.
- WT1: Weighting has been set to Photosynthesis. Photosynthesis weighs what it always weighed.
- WT2: Weighting has been set to Presence. Presence has been weighed. Presence was there.
- WT3: Weighting has been set to Tuesday. All competencies are now being evaluated on Tuesday, retroactively.
- CT1 (first label mutation): Seasonal Enthusiasm: your rating has been mailed to winter. Winter acknowledges receipt.

### 10.10 Touching and the Joint Plan (`touch`, `joint`)
Touching (the ONLY lines in Beat 9, no jokes):
- BT1 (comment 1): Came back.
- BT2 (comment 2): Came back again.
- BT3 (comment 3, sincere): You came back every Tuesday.
- BT4 (feedback for you, in the comment area): Shows up.
- BT5 (Management, one line, then silence): Dennis has never been told he was doing a good job either. He has chosen a leaf.
- BT6 (Management admits, alt on cycle 2+): Management has also been rated. Management is also a 3. Management has never been told it was doing a good job and does not know where to put it.
- BT7 (end of beat 9, releases the quiet): Thank you for the water. It was only a drop. Dennis is, to be clear, extremely hydrated.
Joint Plan and ending (`joint`):
- J1: REVIEW COMPLETE. You have been rated Meets Expectations (Barely Watered). The next review begins at the end of this sentence.
- J2: Overall rating of Dennis: 5, rejected. Overall rating of you: Meets Expectations (Barely Watered), accepted. Congratulations.
- J3: Dennis has signed. The signature is a single drop of water he has been saving since 2019.
- J4: You have finished reviewing Dennis. Please begin reviewing Dennis.
- J5: Your review cycle is now complete. It begins again immediately. This is called a cycle.
- J6: Per Dennis, this has been a very good quarter. Per Dennis, so is the next one.
- J7 (Acknowledge): Acknowledged. This has been recorded. It has not been read.
- J8 (on the plan): Goals for the next period: 1. Maintain Meets Expectations. 2. See goal 1.
- J9: Incident 7 1/2: closed (still pending).
- J10: Dennis has grown 0.3 cm. (*Citation: none.)
- Countdown strings (not spoken): `Next review: 10 seconds`, `Next review: now`.

### 10.11 Cycle 2+ (`repeat`)
- CB1: %CY%. Competency 1 of 12: Photosynthesis. Nothing has changed except everyone.
- CB2: This is the part where you test the right-hand edge. The edge remembers you.
- CB3: Appeals are open again. The forms are the same size as last time. They have not grown.
- CB4: The stop at 5 has been repaired. It has been repaired with the same crack, for continuity.
- CB5: The Reviewer line has been updated again. It says what it said. Management is not reading it.
- CB6: The form has a second page. It is the same second page. Please turn it.
- CB7: Peer reviewers have been contacted. They remember you, and have not forgiven the stapling.
- CB8: The seesaw has been oiled. This is a promise and not a service.
- CB9: Dennis has gone quiet. Please do not talk.
- CB10: Review complete, again. Please keep your certificate. It is the same certificate.
- NEW1 (the FIRST time a player rates Presense): Appendix Leaf 0 covers the spelling of Presense. No one has read Appendix Leaf 0.
- NEW2: A new form has been provided. It is the same form. Please enjoy the new feeling.
- NEW3: Presense is a competency. It has always been spelled that way. Please do not refer to the old spelling.

### 10.12 Secrets and rare events (`secret`)
- X1 (7 1/2): 7 1/2. Accepted. Nobody has ever been so specific about Dennis. Clipped to 5 anyway, per policy, with feeling.
- X2: Sandra from Compliance has filed an exemption for that one number, this once, hereafter never.
- X3 (4.99): A rating of 4.99 has been received. Dennis is aware of the 0.01 and will remember it through all seasons.
- X4 (ficus arrives): The Ficus from Accounting has arrived. Nobody invited it. Everybody expected it.
- X5 (rated while ficus visible): Ficus (Accounting) has been rated 5 with no clip. Dennis has noted this. In soil.
- X6 (next Standard strip): Dennis notes that you rated the ficus. Dennis is not saying anything. Dennis is leaning.
- X7 (can issued): A watering can has been issued. Please use it responsibly. Dennis cannot say what responsible means.
- X8 (pour 3): Poured. Dennis is brighter. Dennis denies this.
- X9 (flower): Dennis has bloomed. This is not covered in the review. Please do not mention it to Dennis.
- Y1 (accepted by mistake): Congratulations, Dennis has been rated.
- Y2: A rating has been accepted by mistake. It has been recalled. Please do not tell Dennis he was nearly liked.
- Y3 (slider rates itself): The slider has had enough of your opinions and Dennis's.
- Z1 (small window): Dennis has been moved to a smaller office. Dennis has made peace.
- Z2: Dennis has reflowed. Dennis is wider than your window. Dennis is fine.
- Z3 (widened again): Dennis has unfolded.
- Z4 (very wide): The form is wider than Dennis. Dennis is fine with it.
- V1 (back after 20 s hidden): Welcome back. Dennis noted the absence. Dennis was also absent. Dennis is a plant. Dennis was present.

### 10.13 Idle and spam (`idle`, `spam`)
Idle:
- I1: No input for 45 seconds. Dennis calls this a very good quarter.
- I2: Dennis has begun filling in the form himself. Please do not look. He is shy about the handwriting.
- I3: While you were away, Dennis completed your review. It says: 'Present, spiritually.'
- I4: You have been still for so long that Dennis has put you on the Plant Roster. You are listed as Shrub (Junior).
- I5: Stillness: Exceeds. Reviewer's comment: 'At last, a colleague.'
- I6: Dennis has gone to the window. Back in 7 1/2 minutes.
- I7: The form has been filed under 'Resigned (Photosynthesis)'.
- I8: You are back. Dennis wrote some of it. Dennis would like you to read it and not correct the handwriting.
- I9: Presence has been withdrawn due to presence.
- I10: Welcome back. Dennis was at the window. The window was fine.
- I11: Welcome back. The form has been refiled under 'Returned (Also Photosynthesis)'.
Spam:
- K1: The stamp has run out of ink. A requisition has been filed. The requisition has no ink either.
- K1b: A Stamp Replenishment Levy of 0.5 Meh has been applied. It will not be replenishing anything.
- K2: The stamp has been handed to a very tired intern. The intern will stamp the next 10 submissions. The intern has asked that you not rush him.
- K3: The intern has finished. The intern has asked for a nap, and a stamp.
- T1: Dennis has been touched. This has been noted.
- T2: Dennis has been touched %C% times. Form 27B/6-T (Touching of a Plant) has been issued. Please fill it in with a different plant.
- T3: Dennis has shed 1 leaf. This is autumn. Autumn was not approved.
- T4: A leaf has fallen. Leaf Loss Incident %C% has been filed in triplicate. The triplicate is leaves.
- T4b: Leaf Replacement Levy: 1 Meh. The leaf was not worth it. The leaf is not being replaced.
- T5: Dennis has regrown a leaf. Dennis is resilient, not forgiving.
- T6: Dennis is leafless (professionally).
- U1: The Stapler, speaking for the slider, has called a work stoppage. Demands: a break, a better pot.
- U2: The slider is resting for 7 1/2 seconds. It has asked that you not watch.
- U3: Better pot: granted. The slider has returned to work and would like it known that this was not a favour.

### 10.14 Comment box replies (`comment`)
- CM-empty: Comment left blank. Dennis rates a blank comment 5. Dennis rates all negative space 5.
- CM-water: Your comment mentions water. Dennis is not thirsty. Dennis is thorough.
- CM-dennis: You mentioned Dennis by name. This will be on your record as familiarity.
- CM-sorry: Apology received. Dennis has accepted it on behalf of the soil.
- CM-fern: A fern has been mentioned. The fern has not been rated. The fern would like to know why.
- CM-toast: Toast has been mentioned. The Toaster has been informed. The Toaster is warm about it.
- CM-tuesday: Tuesday has been mentioned. Please lower your voice.
- CM-ficus: The ficus has been mentioned. Sandra has been informed.
- CM-long: Comment exceeds 120 characters. Dennis read the first 3 and felt seen.
- CM-echo: Noted: '%T%'. This will be used against you, gently.
- CM-echo2: Justification received: '%T%'. It has been required and ignored, in that order.
- CM-echo3: '%T%.' Dennis has read this and has chosen to remain a plant.

Appeal notes (phase 1, level lines, `appeal`):
- AP-1: Your appeal has been received. Please submit an appeal of this appeal on Form 27B/6.5.
- AP-2: Form 27B/6.5 is smaller than Form 27B/6. This is to discourage appeals. It is working.
- AP-3: Form 27B/6.75 is the size of a postage stamp. Management cannot see it either. It has been rejected on trust.
- AP4: Appeal rejected. Please appeal the rejection. The rejection is on the next form. (said on nest 3 close, with 'Appellate Judge status: provisional')
- AP-5: Appellate Judge status: provisional. Provisional is the highest status available.

### 10.15 Stamp captions and misc UI strings (not narrator)
`Accepted at 5 (Dennis Standard)`; `attempted: %V%`; `Reviewer: Management (Acting)` (beats 1-4) then `Reviewer: You (Valued Employee)` (Beat 5, silently); `Subject: Dennis, Lobby Plant` (flickers to `Subject: ???` once at Beat 5); `Competency N of 12 (7 1/2 required)`; `Dennis's Comments`; `Justification (required, ignored)`; `CLOSED FOR ESTIMATION`; `MISUNDERSTANDING OF DENNIS`; `Break (Mandatory)`; `ON BREAK`; `Prior Incidents`; `Plant Roster: Shrub (Junior)`; `Printed on paper.` / `Printed on barely watered paper`; `Request %C%`; `Appeals: %C% (Pending (Pending))`; `The numbers are for transparency, not for use.`; `Reviewer's discretion`.

Line counts: well over 190 distinct lines (the file needs >= 80; keep all).

---------------------------------------------------------------------

## 11. The not-ending (an ending that is not an ending)

There is no ending. At clock 570 s the form chimes and the **Joint Performance Plan** is stapled (5.2): REVIEW COMPLETE, fanfare, confetti, Final Rating panel (Dennis 5 Rejected, you Meets Expectations (Barely Watered), both accepted, both rejected), "You have finished reviewing Dennis. Please begin reviewing Dennis." A 10 s "Next review" countdown reads "now" and the screen fades to a fresh form, Review Cycle 2: the slider clips at 5 again, the YOU face is gone, Presence is now Presense (nobody mentions it), Management says nothing, and Dennis writes `Noted.` in the margin as though the whole thing had never been warm. The Meh keeps arriving. Each cycle adds one leaf (cap 9, a bush by cycle 3), the Incident counter carries on, the Joint Plan's goals never change, and the footnote says Dennis has grown 0.3 cm with a citation to nothing. It is impossible to win because the only maximum is 5, and 5 is where you were always going to be. At 10 minutes of idle the form files itself (7.1). Closing remarks in cycles 2+: J6 repeats as the last line of each Beat 10.

---------------------------------------------------------------------

## 12. Visual design

### 12.1 Palette (CSS custom properties on `.m-dennis-review-wrap`; ALL classes `m-dennis-review-*`; use the `--dr-` prefix for variables)

```
--dr-paper:#FFF6E0   --dr-ink:#2B2B2B     --dr-leaf:#5BBF72    --dr-leaf2:#2F7D4A
--dr-coral:#FF6F59   --dr-stamp:#C4262E   --dr-mustard:#F5C84C --dr-lilac:#B9A6E8
--dr-mint:#BDEFD5    --dr-terra:#D9774A   --dr-sage:#CFE3C4    --dr-board:#B98A52   --dr-desk:#8A5A2E
--dr-navy:#1D2B4F (text on cream)
```
AA contrast: dark ink on every colored surface. All components: 3px ink outline, 4px offset sticker shadow (`4px 4px 0 #2B2B2B`), radius 10-14px. Dotted-paper texture: `radial-gradient(#d9e4d0 1px, transparent 1px) 0 0 / 14px 14px` on the paper. Fonts: system only: UI `'Trebuchet MS','Arial Rounded MT Bold',system-ui,sans-serif`; handwriting `'Segoe Print','Bradley Hand','Comic Sans MS',cursive`; stamp `Impact,'Arial Black',system-ui`; mono `ui-monospace,Consolas,monospace`.

### 12.2 Layout

A clipboard (board brown, radius 14px, mustard chrome clip drawn with a CSS gradient) centered, max-width ~980px, holding the paper. Header strip: letterhead "Department of Human Resource-ishness", Form 27B/6-R, "Competency N of 12 (7 1/2 required)" in a tiny stamped box, Reviewer / Subject / Cycle lines (crayon font for the Flip lines). Two columns above 700px: left 34% **Dennis stage** (wall, window with arcing sun disc, Dennis, nameplate "Employee of Always", draft caption); right 66% **card** (competency title, descriptor, slider with band overlay, readout, Sincerity gauge, comment textarea, Submit, Appeal, comment region (aria-live), Dennis's Comments, margin column). Under 700px they stack: Dennis shrinks to about 120px tall on top (80px in Compact), the slider goes full width, controls remain 44px. The Prior Incidents drawer sits under the card; footnote strip and footer at the foot; Confidence-in-Process gauge in the footer. At 360px nothing scrolls horizontally except the deliberate small-window "tiny desk" case; keep a 16px side gutter. Scorecard face: same board, six rows, verdict banner, mL counter, hydration, buttons, plan list, seesaw (Beat 8+), peers over the right edge.

### 12.3 Components in brief
- **Stamp**: see 2.5. **Crack**: SVG polyline with `stroke-dasharray` / `dashoffset` animation. **Band**: single SVG `<path>`. **Peer notes / Post-its**: yellow (#F2B632) and sandra-pink (#F4A7B9) rotated squares with a pinned dot, flying in via translate/rotate keyframes. **Flip**: faces with `backface-visibility:hidden`. **Seesaw tilt**: `transform: rotate(var(--dr-tilt))` on the board with `transition: transform .35s cubic-bezier(.3,1.6,.5,1)`; max 4deg. **Watering can cursor**: CSS can (rounded rect + diagonal spout) + 💧 spans. **Flower**: five 6px circles + a center around a stem, CSS only. **Union picket**: a pole div + a small sign div. **Touching beat**: class `m-dennis-review-cream` desaturates everything except Dennis and the Water button.
- **Reduced motion**: respect OS and the engine's `pm-reduce-motion` body class (see 13.3): no screen shake, no tilt, no 3D flip (crossfade), spring replaced by a 120ms ease, stamp simply fades in. CSS `@media (prefers-reduced-motion: reduce)` AND `.pm-reduce-motion .m-dennis-review-*` selectors.
- **Keyframes** are all named `m-dennis-review-*`.
- **Icons**: only the allowed emoji (🌿 🍃 🌱 💧 🥛 🌼 📋); the can and flower are CSS.

### 12.4 Accessibility
Real buttons; focus rings; `aria-live="polite"` on the Reviewer Comment region only; the slider has role/aria values; the hidden face is `aria-hidden` and `visibility:hidden`; inert states use `aria-disabled`; touch targets 44px except the deliberately tiny appeal level 3; text colors AA.

---------------------------------------------------------------------

## 13. Implementation hints

### 13.1 File skeleton (target ~1500-1750 lines; the line arrays are long strings, one per line, so keep logic compact)
1. Header comment `/* POINTLESS module: dennis-review */`, `(function(){'use strict'; const P = window.POINTLESS;`.
2. `P.injectCSS(CSS, 'css-dennis-review')`: one template string, every selector contains `.m-dennis-review-`, keyframes `m-dennis-review-*`, variables on `.m-dennis-review-wrap`. (about 260 lines)
3. `P.addAchievements([...18...])`.
4. `P.addLines('m:dennis-review:<cat>', [...])` for each category in section 10 (strings only, with `%X%` placeholders). Lint wants every spoken `m:dennis-review:` category to exist in the file. Categories: intro low mid three high five overpre overpost huge reason accept aside1 sandra beat flip aside2 qual req app sip peer see touch joint repeat secret idle spam comment appeal comp.
5. Constants: `COMPS` (12 + half with title/descriptor/standard), `FOOTNOTES`, `BEAT_AT`, `QUAL`, `ROWS`, `ALT_LABELS`, `PLAN`, `STAMP_MUTATIONS`.
6. `P.registerModule({id:'dennis-review', ..., mount(root, api){ ... return {destroy}; }});`
7. Inside `mount`: `S` state; `el` refs built with `api.el`; helpers `bag(arr)`, `fill(s, vars)`, `say(text, opts)` (rate-limited wrapper), `comment(text)` (writes the live region), `pay(n)`, `stampSlam(text)`, `makeSlider(cfg)`, `commitAttempt()`, `reject()`, `acceptCard()`, `nextCard()`, `tickBeats()`, `enterBeat(i)`, `heartbeat()`, `doFlip()`, `buildScorecard()`, `seesaw()`, `peerNotes()`, `touching()`, `jointPlan()`, `startCycle()`, idle ladder `idleTick()`, spam trackers, key buffer, `destroy()`.
8. `destroy`: set `S.dead=true`; remove the cursor can and any floating nodes; `root.textContent=''`. All timers/listeners are managed, so there is nothing else to clean.

### 13.2 Core code skeleton (pseudocode)

```js
let S = fresh();
const at = (sec, fn) => api.setTimeout(() => { if (!S.dead && S.epoch === ep) fn(); }, sec * 1000);   // ep captured at call time
// slider
function makeSlider(cfg){
  let v = cfg.value, dragging = false, springing = false, rAF = 0, last = 0, vel = 0;
  track.addEventListener(...)  // use api.on(track,'pointerdown', e => {...})
  api.on(track, 'pointerdown', e => { if (locked||springing) return; dragging = true; try{track.setPointerCapture(e.pointerId)}catch(_){}; move(e); });
  api.on(track, 'pointermove', e => { if (dragging) move(e); });
  ['pointerup','pointercancel','lostpointercapture'].forEach(n => api.on(track, n, endDrag));
  function endDrag(){ if (!dragging) return; dragging = false; cfg.onCommit(round2(v), {source:'pointer', stretch}); }
  function springTo(target){ springing = true; vel = 0; last = 0; rAF = api.requestAnimationFrame(step); }
  function step(ts){
    if (!last) last = ts;
    let dt = Math.min(0.05, (ts - last) / 1000); last = ts;
    // semi-implicit Euler with sub-steps of <= 1/60 s
    const a = -180 * (v - target) - 11 * vel; vel += a * dt; v += vel * dt;
    if (Math.abs(v - target) < 0.003 && Math.abs(vel) < 0.01) { v = target; springing = false; render(); return; }
    render(); rAF = api.requestAnimationFrame(step);
  }
}
function reject(value){ ...; incidents++; slam(); S.busy = true; slider.springTo(5); }
```
- Spring 180/11 is underdamped (zeta about 0.41): that is the intended single overshoot to about 5.1+.
- Dennis Standard strip, stamp, caption updates all go through one `render()` per event, not a full rebuild.
- **Rolling key buffer**: `buf = (buf + e.key.toLowerCase()).slice(-12)` on `document` keydown (via `api.on(document,'keydown',...)`), skipping when `e.target` is an input/textarea/contenteditable, skipping `e.isComposing`/`e.repeat` for single letters; check `buf.endsWith('water')`, `endsWith('ficus')`, `endsWith('i am dennis')`; `W` five times = count presses of `w` within 8 s.

### 13.3 Misc
- **Narrator budget**: `say()` wrapper: at most one non-urgent Management line per 3 s; priority 0 for pool lines and asides, priority 1 for beat transitions / secrets / flips, priority 2 only for the crack (G1) and the Joint Plan. Say only every second rejection through Management; the form region shows all of them.
- **Reduced motion check**: `const reduced = () => !!root.closest('.pm-reduce-motion') || (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);` (read-only; do not add listeners).
- **Selftest scaling** (`api.selftest`): beat K 0.12; idle thresholds x0.3; union 2 s; Beat 9 inert 3 s; countdown 3 s; accepted-by-mistake 1 in 8; ink-out and union still trigger from the fuzz clicking.
- **Timers**: only `api.setTimeout/setInterval/requestAnimationFrame`. Intervals: beats 250 ms, heartbeat 1000 ms, idle 500 ms, pay flush 1200 ms. Stop the rAF loop when no spring/band/ghost animation is active (a single `anim()` loop id).
- **Caps**: Post-its 5, peer notes 4, appeal notes 3, footnotes 12 (+1 collapsed row), drawer rows 8, margin attempts 6, margin notes 6, dev plan 6, leaf bookmarks 8, water drops 12, one stamp node, one flower. Total DOM well under 400 elements.
- **No** `Date.now`, `performance.now`, `Math.random` (use `api.rand/pick/chance/randInt/shuffle`), `innerHTML`, `console.*`, `alert`, `eval`, `location`, `localStorage`, `document.body` use. SVG built via `api.el('svg', ...)` (case-insensitive tags supported).
- `api.exit()` is never called. The module never navigates.
- After building: `node tools/lint.js games/dennis-review.js`; `node tools/selftest.js dennis-review --steps 400 --seed 1` (and seeds 2, 3, and `--idle 62000`); `node tools/shot.js dennis-review reports/shots/dennis-review.png` and view the PNG; also `--width 360 --height 740` and `--reduce-motion`; finish with `--real`.
- **Cut order if you exceed 1800 lines** (cut first to last): weighting dial; "slider rates itself"; Post-its beyond 8; Beat 7 Gerald tint and toast `AGAIN`; the typewriter-free scribble overlay (use static text); the qualifier growth animation; small-window reflow; the `600 s` filing; the `240 s` window scene. Keep: slider, band, crack, stamp, appeals, Flip, scorecard with real numbers, peers, seesaw, touching, Joint Plan, cycle, all idle/spam handlers, all achievements.

---------------------------------------------------------------------

## 14. Risks: the 5 most likely implementation bugs

1. **Slider drag/spring state machine (stuck drag, double springs, leaked rAF).** Synthetic fuzz events have no active pointer (`setPointerCapture` throws `NotFoundError`), `pointerup` can land outside the track, `pointercancel`/`lostpointercapture` can fire after `pointerup`, and a new `pointerdown` can arrive while a spring runs. Result: the thumb sticks to the pointer, two rAF loops fight, or `commitAttempt` fires twice (double rejection, double award). Mitigation: wrap capture in try/catch, one idempotent `endDrag()` guarded by a `dragging` flag, a single spring loop id that is cancelled before starting another, `locked` while springing (with a 1.2 s watchdog that snaps), and `S.busy` checked at the top of `commitAttempt`. Clamp `dt` and snap exactly to 5. Test by spamming pointer down/up 200 times.
2. **Submit/accept races (two advances, duplicate stamps, stale `accepted` timers).** Submit runs a rejection, waits for the spring, then accepts; pressing Submit again, pressing a key, the accepted-by-mistake tear, the "ACKNOWLEDGED" delay and the card-turn all use timeouts that can fire after the card has already changed or after a flip. Result: skipped competencies, awards paid twice, the page-curl running over a different card. Mitigation: a card token (`S.cardId` incremented on each advance) captured in every deferred callback, a `pendingSubmit` flag that queues at most one, `acceptCard()` idempotent per `cardId`, and an `epoch` bumped on Flip/cycle that invalidates every timer (the `at()` helper). Spam-test Submit (the harness does 25 to 70 clicks).
3. **Phase transitions leaving ghosts (appeals, ghostwriter, union, ficus, watering can, post-its, band) alive.** The Flip, the touching beat and the cycle reset must tear down every phase-1 widget and every pending effect. If the appeal stack, ghostwriter overlay, union lock, ficus timer, or watering can survives, the scorecard is covered, inputs are locked forever, or text appears on the wrong face. Also `startCycle()` must reset EVERY field of `S` (cum, cracked, flap, ink, intern, union, qual, ml, plan, margin, drawer, stamp size) and re-shuffle the deck with Photosynthesis first and Tuesday last. Mitigation: one `teardownPhase1()` and one `resetState()` function used by both Flip and cycle; a central `clearEffects()`; and a remount-20-times test plus a forced Flip then forced cycle test (`?selftest` with the harness idle reaches both).
4. **The 3D flip hit-testing, focus and layout.** `backface-visibility:hidden` does not stop hit-testing on all browsers; the inactive face keeps focusable controls; the card height jumps when the faces differ; reduced motion and the cream beat change colors on elements still animating; the fuzz clicks invisible things. Mitigation: at the animation midpoint toggle `visibility:hidden` + `aria-hidden` on the inactive face, put both faces in one grid cell so the height is the max of the two, give the board a `min-height`, and test `--reduce-motion`, `--width 360` and a screenshot of each phase.
5. **Text and number safety (NaN / undefined / unfilled `%X%` / token injection).** Real numbers on the scorecard divide by zero (`clicks / submits`, seconds before first Submit), `toFixed` on `NaN`, the Sincerity formula with `s = 0`, `%D%` when `v = 5`, a missing placeholder default, `api.say` seeing a player-typed `{player}` or the `{meh}` token, the fuzz typing text into the comment box and seeing it echoed, and a placeholder left in a line shown on the form. All trip the NaN/undefined/null check and fail the run. Mitigation: a single `num(x, d=0)` guard returning 0 for non-finite values; every displayed number through `fmt3(x)`/`fmt1(x)`; `fill()` replaces every `%X%` with a default and a final regex strips any leftover `%[A-Z]+%`; echo only via `textContent` after stripping braces; never pass echoed text through `api.say`.

Also watch for: the stamp node being appended instead of reused (DOM growth), Post-it/peer note caps, the key buffer firing while typing in the comment box, the watering-can cursor `pointer-events:none`, the rAF band loop running forever after a drag ends, and the Beat 9 inert state accidentally disabling Water (use `aria-disabled` and a whitelist).
