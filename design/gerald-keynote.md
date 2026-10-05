# DESIGN BRIEF: GERALD'S KEYNOTE (id `gerald-keynote`)

Final brief by the showrunner. Builder: read SPEC.md and VOICE.md first, then build `games/gerald-keynote.js` from this file alone. Where this brief and SPEC.md conflict, SPEC.md wins. Every line of dialogue in section 15 is final and verbatim: copy it, do not improve it, do not explain it. Code is cheap, text is the product: keep the code terse and spend the line budget on jokes.

---

## 1. CONCEPT

You are the slide clicker for Gerald, Vice President of Spuds, a potato of enormous gravitas whose deck contains only titles. The whole game is a rhythm game about waiting for a man to finish being moved. A slide appears, Gerald types out one profound, slightly wrong sentence, and a thin **Readiness Ring** around your big mustard CLICKER fills up. Click too soon and Gerald says "I was not finished being moved." Click in the golden band and he is moved, which he logs. Click late and he improvises. Slide 7 1/2 is always reached, always blank, and applauded by a single stapler, which over time unionises. There is no score to beat and no end to reach; the closest thing to progress is a stapler's growing labour demands.

Pillars (cut anything that does not serve one of these):
1. **Waiting is the verb.** The ring teaches itself by colour (coral / mint / gold / grey). No tutorial wall.
2. **Never punish.** Rushing never loses anything; it only produces a better joke. Late is a second comedy track some players will choose on purpose.
3. **7 1/2 is sacred.** The number 7 1/2 and the clack never change, no matter what else does.
4. **The deck is infinite.** Deck 1 ends, the Stapler gives a keynote, Deck 2 begins "Revised", and 7 1/2 is still there.
5. **Sincerity.** Gerald and Management never wink. The staplers are professionals.
6. **Arc** (VOICE.md): normal, weird, bureaucratically unhinged (Sandra, the union), strangely touching (Q&A, the field, "Thank you for clicking"), then back to normal like nothing happened.

First joke at 0 seconds: the lights come up on Gerald, who clears his throat (`api.sfx('honk')`) and says "Synergy, Roughly." before the player has touched anything.

### What was kept from the three pitches, and what was cut

KEPT: pitch 1's Readiness Ring with three-plus-one zones (the core loop); pitch 1's named slide transitions, idle ladder, laser pointer with per-word riffs, data-free chart furniture, Sandra's flags and the redacted slide, the stapler escalation, Q&A with Brenda/Stapler/Dennis, the clicker-battery beat, the foam clicker spam fiasco, the Staircase of Halves, the Sprout and Spud Jr., One Real Slide, and the whole ending (Thank You, Questions?, Reprise, Stapler keynote, Deck 2 with a new Slide 1). From pitch 2: the MINUTES pad with escalating "Owner:" lines (cheap, strong running gag), the "Gerald asks YOU for a word" chips, the retrospective that reads your real counters, the typo rare event, the house lights / audience leaving / "Welcome. I don't believe we've met." beat, the "of 7 1/2" counter, long idle tiers (nap, "Back in 5"). From pitch 3: the 7 1/2 recurring cadence idea, Tuesday as a slide that refuses to be advanced, the clock stuck at 7:30, "Time Remaining: Yes", the title bar `Gerald_Keynote_FINAL_v7_REAL.ppt`, the fractional-slide numbering gag.

CUT (unbuildable or weak in one vanilla file): laser dwell on Management's bubble (that bubble lives outside the module root and the module must not touch it); pitch 2's water break (the foam clicker is the funnier lockout); pitch 2's fire drill; pitch 3's "keeps its place across sessions" resume (see persistence, section 2); pitch 1's 30-clicks-in-8-seconds fire alarm tier; separate "Moved gauge" thermometer; pitch 2's slide counter that blurs; the stapler's 14 demands list (replaced by 4 rotating demand notes); Stapler "visit 20" (replaced by the ending); any sprite more complex than CSS blobs and emoji.

### Priority tiers (cut from the bottom if the file passes ~1650 lines)

- **P0 (must ship):** ring + zones + advance(); deck table with the 7 1/2 cadence; Gerald, Clicker, slide, bubble; Minutes pad; Meh/stat/achievement wiring; stapler claps; idle ladder (note, mind-advance, question, Field, coat); spam fiasco + foam clicker; Back handling; Thank You / Questions? / Reprise / Stapler keynote / Deck 2; all achievements; all lines in section 15.
- **P1:** laser + word dwell riffs; chart furniture; Sandra flags; Role-reversal chips; Retrospective slide; Employee of the Quarter + battery; Tuesday slide; applause rating; narrow-window lines.
- **P2 (cut first):** Sprout / Spud Jr.; One Real Slide; typo; Toast transition; Staircase of Halves; Stapler Speaks; redacted slide; deep idle tiers (nap, Back in 5); sticky-note window mode; F key; Escape lines; clicking Gerald.

---

## 2. REGISTRATION, CONVENTIONS, PERSISTENCE

```js
P.registerModule({ id:'gerald-keynote', title:"Gerald's Keynote",
  tagline:'Click when Gerald is ready. Gerald is rarely ready.',
  icon:'🥔', category:'game', unlockCost:0, tags:['clicker','presentation','timing'], mount })
```
- `api.setTitle('Gerald_Keynote_FINAL_v7_REAL.ppt')`.
- CSS: every class `m-gerald-keynote-*`, keyframes `m-gerald-keynote-*`, injected with `P.injectCSS(css, 'css-gerald-keynote')`. Reduced motion: both `@media (prefers-reduced-motion:reduce)` and `.pm-reduce-motion .m-gerald-keynote-*` (the engine sets the body class; reading it is fine, writing it is not).
- Stats (use only these, max ~14 names): `gerald-keynote.slides`, `.moved`, `.rushed`, `.improvs`, `.halves` (7 1/2 family visits), `.laser` (word riffs), `.spam` (fiascos), `.claps`, `.backs`, `.decks` (decks completed), `.flags` (Sandra flags dismissed), `.charts` (furniture clicks), `.late` (late advances), `.chips`.
- Flags: `metGerald` (shared; set true on first slide), `gerald-keynote.presented` (set true on first slide), `metStapler` (shared; set after the first clap), `metDennis` (shared; set when Dennis is first addressed), `gerald-keynote.sprout` (true once a Spud Jr. was ever born).
- Persistence (`api.save`): `{ decks, lifetimeSlides, lifetimeMoved, spudJr }` only. On mount, if `lifetimeSlides > 0` Management says the welcome-back line (L1 row). The deck always restarts at slide 1 (no resume; it would make the opening joke fail). Save on a managed interval every 10s and in `destroy()`; wrap in try/catch semantics by trusting `api.save` (it already does).
- Line categories: hold the bulk of text in local arrays with a local `bag(arr)` (shuffle bag: no immediate repeat, refills when empty). Also declare ONE category `P.addLines('m:gerald-keynote:mgmt', [...])` with the Management "general" bag (L2 below) and speak it with `api.sayRandom('m:gerald-keynote:mgmt', {mood:'neutral'})` so the lint rule about declared categories is satisfied. Never use unknown `{tokens}`: for Gerald's bubble use `%p` for the player name and `%w` for a word, substituted by your own code; for lines spoken through `api.say` you may use `{player}`.
- Voice channels. **Bubble** = Gerald's speech bubble inside the module (typed text, aria-live polite). **Narrator** = `api.say(text, {who, mood, priority})` (the global Management panel). Rules: slide sentences, rush cut-offs, idle improv, the Field, Q&A answers, 7 1/2 silences-then-lines, ending speeches go to the **bubble**. Management lines always go to the **narrator** (`who:'Management'`). Moved lines, laser riffs, chart/furniture reactions, Sandra reactions, Spud Jr. announcements go to the **narrator** with `who:'Gerald'`. Stapler lines go to the narrator with `who:'Stapler'` (also as a sticky note where marked). Routine chatter is priority 0; beats are priority 1; the ending and big secrets are priority 2. Never say more than one routine line per 1.5s (a tiny `lastSayT` guard on the loop clock).
- Emoji: only Emoji 12 or older. Safe set used in this module: 🥔 🌿 🙂 📎 🍞 🧦 🔴 🌾 🎈 ➗ 🏅 🚩 📝 🥪 🌱 🔁 ✨ ⏩ ⏱️ 📄. Never use the chair, plant-pot, ladder or any 2021+ emoji.
- Never write `Date.now`, `Math.random`, `setTimeout` (use `api.*`), `innerHTML` with dynamic text, `location`, `console.*`.

---

## 3. SCREEN LAYOUT

Everything lives in one wrapper `div.m-gerald-keynote-root` inside `root`, with CSS custom properties `--gk-*`. Breakpoints are measured from `root.getBoundingClientRect().width` (polled, see section 17), never the window.

```
+----------------------------------------------------------------------+
| BANNER: SPUDS DIVISION QUARTERLY ALL-HANDS (MANDATORY)      [clock]   |  data-lz="ceiling"
+---------------------------------------------------+------------------+
| PROJECTOR (tiny box, top-centre)                   | MINUTES pad      |
|   beam (clip-path trapezoid, pale yellow 20%)      |  lilac header    |
| +-----------------------------------------------+  |  last 5 items    |
| | SLIDE 16:9, thick outline, sticker shadow     |  |  (oldest struck) |
| |  counter top-left: "SLIDE 7 1/2 OF 7 1/2"     |  |                  |
| |  title (Georgia bold), per-word spans          |  | LECTERN PLACARD  |
| |  furniture (chart) / sticky notes / flags      |  |  TIMES GERALD    |
| |  footer: SPUDS DIVISION, CONFIDENTIAL-ISH,     |  |  HAS BEEN MOVED  |
| |          slide N                               |  |  SLIDES PRESENTED|
| |  caption (bottom-right): Transition: Wipe ...  |  |  APPLAUSE RATING |
| +-----------------------------------------------+  +------------------+
|  laser dot lives inside the slide frame                              |
+---------------------------------------------------+------------------+
| GERALD at lectern (left) + speech bubble | CLICKER 112px + RING     |
|  face classes, lanyard, tie, arms        | metronome-potato above   |
|                                          | readiness caption below  |
|                                          | battery icon (beat 9)    |
+----------------------------------------------------------------------+
| AUDIENCE strip: Dennis | Brenda (row 3) | Stapler(s) ... (cap 12)    |
+----------------------------------------------------------------------+
Overlays (inside root, one at a time): fiasco flipbook, field/sepia scene, Q&A cards,
 stapler-keynote curtain, blackout (B key), house-lights, Back in 5.
```
- Wall decor (CSS only): a clock whose hands are at 7:30 and is described by `aria-label="clock (wrong, confidently)"`; a framed picture of a potato titled `Founder`.
- Below 700px root width: single column. Order: slide, Gerald + Clicker side by side, audience strip as icons only, Minutes collapses to the last 2 items, placard collapses to two lines. Clicker 96px, never below 72px tap target on the slide-adjacent buttons. No horizontal scroll at 360px.
- Below 400px root width: sticky-note mode (section 12.8).
- `min-height: 420px` is provided by the engine; the stage must be fully usable at 420px height without inner scroll on desktop widths.

### Palette (tokens)
cream paper `#fdf3dc`, ink `#2b2118`, hall teal `#12343b` (background of the lecture hall), projector-beam `#fff6c8` at 20% opacity, mustard `#e9b44c` (Clicker, banner), coral `#ef6f5e` (Rushed band, Sandra's flags, laser dot), mint `#8fd5a6` (Fine band), gold `#f4c542` (Moved band), lilac `#b9a6e8` (Q&A, Minutes header, stapler union notes), Gerald skin `#c9954f` with spots `#a67433`, stapler red `#c0392b`, screen white `#fdfbf2`, slide-7-1/2 stark white `#ffffff`. Thick 3px ink outlines, sticker shadow `4px 4px 0 ink` on slide, cards, notes. Rounded system fonts for UI; `Georgia, serif` bold for slide titles at `clamp(26px, 5.4vw, 60px)` with `overflow-wrap:anywhere`, so long recursive titles fit. Contrast: all UI text >= 4.5:1.

### Gerald (CSS only)
- Body: big oval `border-radius: 50% 50% 46% 54%`, gradient `#d6a560 -> #c9954f`, ink outline. 6 to 8 spot circles (`#a67433`). Two eye-dots on a face; the face morphs by class on the wrapper: `neutral`, `moved` (two tear drops fall from the eyes, a small sparkle on the lanyard), `rushed` (eyes wide, a tiny hand-oval waving), `improv` (eyebrows up), `panic` (eyes huge, sweat bead), `sleep` (eyes lines, body leaning 12 degrees), `field` (lanyard off, body slightly smaller, sepia stays on the stage only).
- Lanyard: a rotated mustard stripe from the neck with a card reading `GERALD, VP SPUDS`. A tie: a small rotated square plus a narrow triangle. Tiny arms are rotated divs; they have no hands, which matters for the ending.
- Breathing: Gerald's body does a 1.04 scale bob whose duration is the ring length, so the player can feel the tempo (this is "Gerald will indicate readiness by breathing"). Set the animation duration as a CSS variable once per slide; never restart the animation each frame.
- Eyes follow the laser dot when it is on the slide (translate the pupils up to 3px). That is the Beat 3 gag and the eyes are a laser target (`data-lz="eyes"`).
- Lectern: a trapezoid in front of Gerald. Placard on it: `TIMES GERALD HAS BEEN MOVED: n` (hidden until the first Moved) and `SLIDES PRESENTED: n`, and the Applause Rating line (never the words "Keynote Score").

### The Clicker and the Readiness Ring
- A real `<button class="m-gerald-keynote-clicker" type="button">` 112px (96px narrow), mustard, 3px outline, label `CLICK`. A thumb-press animation (`scale(.92)` on `:active`, plus a class pulse for keyboard). Tiny red LED top-left, turns mint while Fine/Moved.
- The ring is an inline SVG around the button with `viewBox="0 0 120 120"` and **`pathLength="100"` on every circle** so dash lengths are percentages. Four circles with `transform="rotate(-90 60 60)"`, `r=54`, `stroke-width=6`, `fill=none`:
  1. three static band arcs (always visible, dim): coral from 0 to 51.85, mint from 51.85 to 74.07, gold from 74.07 to 100 (these are 0-70%, 70-100%, 100-135% of progress mapped onto the full circle; `f = min(p,1.35)/1.35 * 100`);
  2. a bright progress circle with `stroke-dasharray: f 100` whose colour follows the zone (coral, mint, gold, grey when Late);
  3. a thin ink outline.
  Update `stroke-dasharray` each frame only if the rounded `f` changed (avoid layout churn).
- Under the Clicker, a one-line readiness caption (no tutorial wall): `Gerald is feeling it.` (Rushed), `Gerald is nearly there.` (Fine), `Gerald is ready.` (Moved), `Gerald has waited.` (Late). On slide 7 1/2: `Hold for applause.`
- A tiny metronome-potato (emoji 🥔 at 22px, CSS sway) sits above the ring; sway duration = the ring length / 2.
- Battery icon (beat 9 onward, section 9.7) sits at the Clicker's top-right corner.
- FOAM CLICKER (spam secret): a pastel-pink squishy button (`border-radius:50%`, inset `box-shadow`) that replaces the Clicker for 10 seconds, with a floppy `transform: scaleY()` squash on press.

### The Slide
- 16:9 (`aspect-ratio:16/9`), `#fdfbf2` with a subtle radial vignette to `#efe9d4`, thick outline, sticker shadow. The counter at top-left reads `SLIDE {label} OF 7 1/2` always (including `SLIDE 212 OF 7 1/2`). Footer on every slide: `SPUDS DIVISION, CONFIDENTIAL-ISH, slide N` with N in italic Georgia (the label, e.g. `7 1/2`). Slide 7 1/2 is a stark white slide with only the footer and a counter present (no title; a barely visible `7 1/2` at 6% opacity in the middle is allowed).
- Titles are split into per-word `<span data-lz="word" class="m-gerald-keynote-w">` elements (laser targets). Cap 14 words; beyond that put the remainder in one span.
- Transitions (a CSS class on the slide for 350ms, plus a tiny caption `Transition: <name>`): `Dissolve (Mild)`, `Wipe (Regretful)`, `Flip (Gently)`, `Spin (Cannot Be Un-Spun)` (a 4 degree tilt that settles), `Zoom (Toward Gerald)`, `Fade (Vaguely)`; rare `Toast (Rare)` (1 in about 60 transitions: the slide pops up from below like toast, a bread emoji beside the caption, line L-Toast). Pick from a shuffle bag. Moved advances show no named transition (Gerald is welling up instead). Reduced motion: every transition becomes a 150ms opacity fade, and judder is dropped.
- Sticky notes (improv): yellow `#fff2a8`, rotated -3 to 4 degrees, drop shadow, **max 3 on screen**, oldest peels off (fade + remove). Sandra's flags: red tape-like banners `#ef6f5e`, rotated -2 degrees, initials `S.C.`, clickable, **max 2 on screen**.
- Furniture templates (all CSS, no data): bar chart (5 divs of semi-random heights, no axes, label `Growth (Directional)`), one-slice pie (`conic-gradient`, 100%, label `Other`), single-circle Venn (label `Overlap: Pending`), org chart (4 circles in a ring with clockwise arrows, label `Reporting Lines`), pyramid with one level (a triangle, label `Floor`), arrows pointing every direction at once, stock-photo placeholder (grey box, smiling emoji 🙂, caption `Handshake`), the Tuesday slide (plain, lilac, with a clock face stuck at 7:30), the redacted slide, a blank bullet slide.

### Audience strip
- Dennis (Plant): a green `🌿` on a name card; he leans (CSS rotate 8 degrees) toward the light whenever a Moved lands, which is his only applause. Row 1.
- Brenda (Row 3): a small `🙂` that nods on a slow CSS keyframe, unconnected to anything.
- The Stapler: two rounded rectangles (body and head with a hinge, `transform-origin` at the hinge) in `#c0392b` with a tiny paper mouth. The head rotates about 18 degrees on a clap and the body squashes hard (`scaleY(.8)` for 120ms). It is a real `<button>` (`aria-label="Stapler (union rep)"`). More staplers are cloned CSS elements (**cap 12**). Extras: a nameplate `REP.` (a tiny label), a tiny tie, lanyards for the section (each `STAPLER`).
- Clicking an audience member (not part of the flow) gives one line (section 15, L-Audience).

---

## 4. CONTROLS

| Input | Action |
|---|---|
| Click the CLICKER | `advance('clicker')` |
| Click the Slide itself (not on a word, chart, flag, bar or sticky) | `advance('slide')` |
| Space / Enter / Right Arrow / Page Down | advance, ignoring `e.repeat` |
| Left Arrow / Page Up / Backspace | `back()` |
| B or `.` (period) | toggle blackout; Gerald keeps talking to the dark |
| F | toggle "fullscreen": slide scales 5%; first time: line L-F |
| L (hold) + arrow keys | nudge the laser dot (keyboard laser) |
| Escape | does nothing, Gerald notices (L-Escape) |
| Pointer move over the slide | laser dot follows (60ms smoothing) |
| Touch: tap Clicker (min 72px) or tap slide | advance |
| Touch: swipe left / right on slide (dx >= 48px, mostly horizontal) | forward / back |
| Touch: long-press (400ms) on slide, then drag | laser |
| Click Gerald | wave, one line (L-Audience) |
| Click the Stapler 7 times while on a 7 1/2 | the Stapler Speaks (section 12.6) |
| Q&A: the three question cards; also the CLICKER answers the next unanswered one | answers |

Keyboard rules (these prevent the number one bug in section 18): attach ONE `api.on(document, 'keydown', ...)`. If `e.target` is inside a `<button>`, an `<a>` or a `[role=button]`, **do not** handle Space/Enter (the native click handles it). Handle Space/Enter/arrows/PageDown/letters otherwise, and call `preventDefault()` for Space and PageDown only when you handle them (so the page does not scroll). Arrow keys while L is held move the laser, not the slide. Ignore all keys with `ctrlKey`, `metaKey` or `altKey`.

Click rules: every nested interactive element on the slide (word spans, chart bars, flags, redaction bars, role-reversal chips, sticky notes, Q&A cards) calls `e.stopPropagation()` so it never also triggers the slide's own advance. A click that ends a swipe (moved > 12px) never advances.

---

## 5. CORE LOOP: THE READINESS RING (exact rules)

### Per-slide timing
- When a slide is presented, set `slideT = 0`. Gerald types his sentence at **35 characters per second** (typewriter, delta-time accumulation). `typeDur = len / 35` (sentences are 40 to 150 chars, so 1.2 to 4.3s).
- Ring length `L` (seconds): `L = clamp(typeDur + 0.6 + jitter, 1.8, 5.0) + cautious`, where `jitter = api.rand()*1.0 - 0.2` (this is "Gerald's mood tempo"). Exceptions: slide 1 of every deck: `L = 4.8` (generous first click); slide 7 1/2 family: `L = 5.0` (and no sentence); Tuesday: `L = 3.5`; `Questions?` and Q&A moments: ring is decorative.
- `cautious`: +0.4 seconds per Rushed click since the last advance (cap +2.0); it is added to the next slide's L and then cleared. This is "Gerald is now cautious".
- Progress `p = slideT / L`. Zones:
  - **RUSHED** `p < 0.70` (coral)
  - **FINE** `0.70 <= p < 1.00` (mint)
  - **MOVED** `1.00 <= p < 1.35` (gold, "Applause Window")
  - **LATE** `p >= 1.35` (grey)
- Typical L = 4s gives Fine from 2.8 to 4.0s and Moved from 4.0 to 5.4s: wide enough to hit by accident, narrow enough to chase. The player learns it by feel in about 40 seconds.

### advance(source) (single guarded entry; every input funnels here)
```
advance(source):
  if mode != 'play' -> route to the mode handler (Q&A, foam, field return, tuesday...) and return
  spam bookkeeping first (section 11), BEFORE the re-entry guard
  if (clock - lastAdvanceT < 0.12) return           // re-entry guard (double event, key + click)
  zone = zoneOf(p)
  idle.reset()                                       // every real input resets quiet time
  if zone == RUSHED:  rush()      ; return           // no advance
  if zone == FINE:    present next slide; award 0.5; named transition
  if zone == MOVED:   moved()  ; present next slide; award 1.5; tally++; Gerald wells up
  if zone == LATE:    present next slide; award 0.1; stat late; no penalty
  lastAdvanceT = clock
```
Slide 7 1/2 modifies this (section 6.3) and Tuesday modifies it (section 9.5).

### rush() (never loses anything)
- Slide does not advance. The slide judders (`translateX` keyframes, 300ms). Gerald's face class `rushed` for 700ms. `api.sfx('buzz')`. Counter `rushed++`, `api.stat.inc('gerald-keynote.rushed')`, `cautious += 0.4` (cap 2.0).
- The sentence typing stops: if the sentence is not yet complete, the bubble shows the typed fragment cut mid-word plus a wet little "hm" (`fragment + '-- hm'`), then 150ms later the rush line (section 15, R rows, chosen by the cumulative `rushed` count: exact rows for the 1st, 2nd, 3rd, 4th, 5th, 8th, 10th, 12th, 20th; every other rush uses the rotating short bag R-bag). If the sentence was already complete, skip the cut and show the rush line after it. No Meh.
- The ring does NOT reset, so the player can just wait and click again. The cut fragment goes into the Minutes with a dash (section 7).
- Every 5th rush after the 5th also gets the Management "skipped line" (L-Rush-skip) once per slide.
- Rush lines go to the bubble. Awards: none.

### moved()
- Narrator (`who:'Gerald'`, priority 1 on milestones, 0 otherwise) says a Moved line: exact rows for the 1st, 3rd, 7th, 20th, then the Moved bag; from the 5th Moved in a row of perfect timings, rows use the "reverse" structure (M-reverse rows). `api.sfx('bell')`. Two tear drops fall (CSS, 900ms), a sparkle on the lanyard, Dennis leans.
- Tally: placard `TIMES GERALD HAS BEEN MOVED: n` (appears at the first Moved). Confetti (`api.confetti()`) only on Moved 10, 25, 50 and on the 7 1/2 clap burst (6 pieces, section 6.3); at 100 the Management piano line.
- `movedStreak++` (consecutive Moved advances; any Rush or Fine or Late resets it). Streak 5 triggers a one-time Gerald line (L-Streak) and the shake of the placard.
- Perfect cadence also has `gerald-keynote.golden` progress (achievement 5 Moved total).
- The Sprout rare event rolls here (section 12.1).

### Late: the idle ladder is in section 10.

### After every advance
`api.stat.inc('gerald-keynote.slides')`, update the placard and the Applause Rating, push the Minutes item for the slide just left (or the fragment), and apply this slide's special handler (section 6 and 9).

---

## 6. THE DECK

### 6.1 Numbering and the 7 1/2 cadence
- The deck is a table of **content slides** numbered 1 to 36 plus inserted **7 1/2 slides**. Each slide has a `label` (string), `title`, `sentence` (or null), optional `gfx`, optional `special`.
- A **7 1/2 slide is inserted after content slides 7, 12, 17, 22, 27, 32** (six visits per deck). The label is always the string `7 1/2` and the neighbours keep counting around it (`... 12`, `7 1/2`, `13 ...`). Management comments on the return (L-7.5-return). The slide counter after slide 7 reads `SLIDE 8 OF 7 1/2`, and Management says L-counter-lie once, at the first arrival of slide 8.
- `halfVisit` (session counter, not reset by decks) counts 7 1/2 family visits and drives the Stapler escalation (section 8).

### 6.2 Deck 1 table (final)
Handwritten content slides (titles verbatim; the sentence for each is in section 15, S rows, keyed by title):

| # | Title | Notes |
|---|---|---|
| 1 | Synergy, Roughly | L=4.8; unprompted opening; metGerald callback |
| 2 | Q3: A Retrospective on Q2's Prospective Q4 | |
| 3 | Our Values (Pending) | |
| 4 | Growth, Directionally | |
| 5 | The Journey Is Also a Destination | Management laser hint at start |
| 6 | Stakeholders: A Brief History of Standing | |
| 7 | Alignment: Where Are the Walls | then **7 1/2** (visit 1) |
| 8 | Leveraging the Leverage | gfx: arrows |
| 9 | Learnings We Have Had Before | Sandra flag appears for the first time |
| 10 | Bandwidth, But Emotionally | gfx: bars |
| 11 | Pivot (Gentle) | Sandra's contradictory flag |
| 12 | Next Steps: Steps | gfx: pyramid; then **7 1/2** (visit 2) |
| 13 | Q6: A Retrospective on Q5's Retrospective on Q4's Prospective Q7 | recursive title |
| 14 | Low-Hanging Fruit: A Cautionary Tale | gfx: photo |
| 15 | The Org Chart (A Circle) | gfx: org |
| 16 | Where Our Efforts Went | gfx: pie (one slice, `Other`) |
| 17 | Stakeholder Overlap | gfx: venn; then **7 1/2** (visit 3, first union note) |
| 18 | [REDACTED] | the redacted slide (section 9.3) |
| 19 | Q9: A Retrospective on the Retrospective on the Retrospective, Prospectively. | |
| 20, 21 | generated | |
| 22 | Gerald Has Lost His Place | role reversal chips (section 9.4); then **7 1/2** (visit 4) |
| 23 | generated | |
| 24 | Q3: A Retrospective on Your Clicking | reads real counters (section 9.6) |
| 25 | generated | |
| 26 | Next Steps: Tuesday | the refusing slide (section 9.5) |
| 27 | generated | then **7 1/2** (visit 5, second stapler) |
| 28 | generated | |
| 29 | Employee of the Quarter (Quarter Redacted) | the clicker slide, battery starts (section 9.7) |
| 30, 31 | generated | |
| 32 | generated | then **7 1/2** (visit 6) |
| 33, 34, 35 | generated | battery low and recharge here |
| 36 | Thank You | `api.sfx('fanfare')` + `api.confetti()`; then Questions? (section 13) |

- Generated slides: title from the 30-title bank (section 15, T rows) or the two generators, never repeating until the bank is exhausted. Generators: **Recursive** `Q{n}: A {Retrospective|Prospective} on Q{n-1}'s {Prospective|Retrospective} Q{n+1}` where n is the slide label number (use at most one in four generated slides), and **Recombine** `{Adj} {Noun} ({Qualifier})` with Adj in [Synergistic, Directional, Provisional, Adjacent, Aspirational, Lateral, Interim, Ambient], Noun in [Alignment, Headwinds, Bandwidth, Learnings, Deliverables, Stakeholders, Optics, Runway, Silos, Ownership], Qualifier in [Pending, Gentle, Draft, Roughly, Per Policy, Technically, Revised, Unapproved, Tuesday-Adjacent]. Sentence for a generated slide: from the Gerald sentence bag (section 15, G-bag), shuffle-bagged. `gfx` for generated slides: random from [bars, pie, venn, org, pyramid, arrows, photo, none, none], never the same as the previous slide.
- Deck 1 is about 36 content slides + 6 halves + Thank You/Questions?/Reprise = about 45 screens, or 5 to 6 minutes at a steady pace and 8 to 10 minutes if the player lasers, idles and does Q&A. The pitches' "10 minutes" is aspirational; slide counts are the truth.
- Title length: any title over 70 chars gets a smaller `font-size` class.

### 6.3 Slide 7 1/2 (the anchor of the game)
- The slide goes blank and white. Counter spins to `7 1/2` (CSS rotateX flip). Management says the arrival line (first visit: L-7.5-arrival; later: L-7.5-return). `api.sfx('pop')`. Gerald says NOTHING (face `moved`, eyes closed). Ring `L = 5.0`, a pure silence ring. The Clicker label caption: `Hold for applause.` The rule "do not click before Gerald is finished being moved" still applies: **Rushed clicks (p < 0.70) are ignored** with the 7 1/2 rush bag (no `cautious` penalty).
- The clap happens at **p = 1.0** (or immediately on a Fine click, after which the slide advances 500ms later so the clap animation is seen). On the clap: `api.sfx('tick')` (visit 1) or a staggered burst of ticks (visit 2 and later, one per visible stapler up to 4, 90ms apart; plus one `api.sfx('stamp')` on the first), the stapler squash, a floating word `clack`, `api.award(7.5, '7 1/2')` (it is 7.5 because it is 7.5), `halves++`, `claps += staplerCount`, and a tiny confetti burst on every visit (`api.confetti(x, y, 6)`, one piece per stapler up to 6, `api.sfx('tada')` only on visit 1).
- The Applause Window still exists after the clap (Moved band, +1.5 on a Moved advance, Gerald says the 7 1/2 silent-moved line).
- The first visit sets `metStapler` after the first clap and fires the metStapler callback (section 15). Achievement `gerald-keynote.sacredblank` on the first clap.
- Sandra approves 7 1/2 from visit 2 on (a green `APPROVED S.C.` stamp, narrator line L-Sandra-approves-7.5).
- The line after the clap: first visit Gerald (bubble, 1s after the clap): L-7.5-gerald. Moved on the blank: L-7.5-moved.
- Going **Back** from 7 1/2 is special: section 6.5.

### 6.4 Back (ArrowLeft / PageUp / Backspace)
- `backs++`, `api.stat.inc('gerald-keynote.backs')`. Maintain `history[]` (the actual slides shown, capped 40). Back pops one entry and shows that slide with no award, a `Flip (Gently)` transition, ring restarts with `L = typeDur + 0.6`. Gerald says L-Back (first time per deck: "We do not go back. Except now. Briefly. As a treat."; later presses: the short rotation). Going back from slide 8 lands on the previous **7 1/2** (it is in the history); it never lands on 7 unless the Staircase secret is opened.
- Back on slide 1 (empty history): the "no slide 0" line. The 7th Back press in a session: Management line L-Back-7.
- Back during modes other than `play`: ignored.

### 6.5 Staircase of Halves (secret, P2)
- On any 7-family slide, Back presses are counted in `halfBack`. Presses 1 and 2 do not navigate: Gerald says the 7 1/2 refusals (L-Stair-refuse). The 3rd press opens the staircase: the slide becomes `7 1/4`, then each further Back: `7 1/8`, `7 1/16`. All are blank; each has a Moved-less ring of 3.5s and the stapler claps a quieter clap (`scale` of the animation and the floating word shrink; `tick` plays once; award `0.75`). At `7 1/16` another Back shows L-Stair-floor. **Forward** from the staircase climbs back (`7 1/16 -> 7 1/8 -> 7 1/4 -> 7 1/2`), then continues normally (never reaches 7). Achievement `gerald-keynote.zeno`. `halfBack` resets when the player advances off the 7-family.

### 6.6 Deck 2 and beyond
- After the ending (section 13) `deckNo++`, `stat decks++`, `save.decks`. Deck N starts with a new first slide labelled `Slide 1` (title: `Revision {N}: The Same Keynote, Revised`), then the old slide 1 becomes label `1 1/2` (title `Synergy, Roughly (Revised)`), then an extra `1 1/2 1/2` slide (title `An Introduction to the Introduction of the Slide Before This One`), then content slides 2 to 36 as before.
- Titles of the handwritten slides 1 to 15 get ` (Revised)` appended from Deck 2 on; their sentences are the same (it is the same keynote). Management line L-Deck2-revised fires once at slide 3. Q&A uses the Deck-2 alternates (section 15). Deck 3 and later reuse the Deck-2 material.
- Everything running (staplers, tally, sprout, Spud Jr., rating, battery, `halfVisit`) carries forward. The Applause Rating units keep changing.

---

## 7. THE MINUTES PAD (running gag 3)

- A yellow legal-pad div with ruled lines (`repeating-linear-gradient`), a lilac header `MINUTES (taken by Management)`. **Exactly 5 row elements** (reuse them; never grow). Rows read `{n}. {snippet}  | Owner: {owner}`.
- A row is added for every slide you leave: snippet = the first 40 characters of Gerald's sentence that was fully or partly typed, with `...` if truncated. Interrupted fragments get a trailing em-dash `--` and the note `Item cut short. Item moved.` in place of the owner. Fine/Moved/Late advances after a complete sentence use the owner rotation below. Special slides (7 1/2): `{n}. (none)  | Owner: the stapler`.
- Owner rotation by item number: items 1 to 3 `unassigned`; 4 to 6 `the committee of one`; 7 to 9 `Dennis (Plant)`; 10 to 12 `the draft Gerald was afraid of`; 13 and up `Tuesday` (then cycle from the top, stepping through the list every 3 items).
- The oldest visible row is shown with a perfectly straight strike-through; when a sixth arrives, remove the first row.
- Footnote row (permanent, small): `Action items are carried forward until they are carried.`
- Item 1 is always the first slide's sentence (`Friends, we gather today because gathering is the first step of having gathered.`) and is remembered for the retrospective callback (section 9.6) even after it scrolls out.

---

## 8. THE STAPLER AND THE AUDIENCE (running gag 1)

Escalation by `halfVisit` (the 7 1/2 family visit count for the session; section 15 has the lines):

| Visit | What changes |
|---|---|
| 1 | One stapler claps once. First-visit Management lines. `metStapler` set. |
| 2 | Claps, then nods (head tilt). Sandra approves 7 1/2. |
| 3 | The Stapler passes Gerald a union note (a lilac sticky note on the slide: the first demand). Management: "has now applauded three times, considers itself a regular". |
| 4 | Nameplate `REP.` and a tiny tie appear. Management line L-Stapler-4. |
| 5 | A second stapler is seated. |
| 6 | Both clap, out of sync (syncopation line). |
| 7 | Management encore line (a single staple fired into the air; CSS dot flies up and fades). |
| 8 | A delegation of 4 sits in row 1; the demands note appears (15 minute break, quieter room, clapping as work). Gerald responds inside his sentence on the next slide (G-union-response). |
| 9 to 11 | Rotating demand notes (D-bag); staplers fill up to 8. |
| 12 | The stapler section: 11 staplers with tiny lanyards (cap 12 total); the section line. |
| 13+ | 12 staplers (cap). Claps are louder: two `stamp` sfx. No further changes; the number 7 1/2 and the clack never change. |

- Stapler count `staplerCount(visit)`: 1,1,1,1,2,2,2,4,5,6,8,11, then 12.
- Dennis leans toward the light on every Moved. Brenda nods continuously. Neither is ever required to respond to anything.
- **Secret 12.5: the Stapler takes a coat** at long idle (section 10). **Secret 12.6: the Stapler Speaks.**

---

## 9. SLIDE FURNITURE AND SPECIAL SLIDES

### 9.1 Clickable furniture (P1)
- Charts appear on the slides marked in the table and on generated slides. Clicking a chart element: shows a line (narrator, `who:'Gerald'`, priority 0), `api.award(0.1)`, `api.stat.inc('gerald-keynote.charts')`, never advances, cannot be rushed, and calls `stopPropagation`. Bars: the first bar click in a session uses CH-bar-first, then the bars bag. Pie, Venn, org, pyramid, arrows, photo: one line from their own bag (CH rows). A shuffle bag per element type.

### 9.2 Sandra's flags (P1)
- From slide 9 on. Flags appear on slide arrival: slide 9 always gets the Slide-9 flag, slide 11 always gets the contradictory flag, other slides get one with probability 0.4 (from the S-flag bag), max 2 on screen. Click a flag to dismiss it: +0.2 Meh, `flags++`, a dismissal line from the SD bag (narrator, priority 0, rotating). Dismiss 5 total: achievement `gerald-keynote.sandra`. A flag text is the whole content (banner, rotated -2 degrees, initials `S.C.`).
- Sandra is never seen. She only appears in flags, in the confiscation, and in the approval stamp on 7 1/2.

### 9.3 The redacted slide (P2, slide 18)
- The title is three black bars (`<button>` elements, accessible label `redacted word`). Click each bar to reveal text: bar 1 `Strategy (redacted)`, bar 2 `[REDACTED] (redacted)`, bar 3 `(see Sandra)`. Each reveal: +0.2 Meh, one Gerald line (RD rows, narrator). After all three, the Management Sandra line. Clicking the slide (not a bar) advances normally. The bars never block the ring.

### 9.4 Gerald Has Lost His Place (P1, slide 22): role reversal
- Gerald's sentence is the intro line (R-intro). Three chip buttons appear on the slide: `Roughly`, `Mostly`, `Technically`. Clicking one: +0.5 Meh, `chips++`, Gerald (bubble) says that word's line, then 1.2s later `Thank you for drafting me.`; the title bar briefly reads `Gerald` (call `api.setTitle('Gerald')`, then restore `Gerald_Keynote_FINAL_v7_REAL.ppt` after 4s with a managed timeout). Chips are optional: advancing without picking makes Gerald say L-Roles-skip. Choosing a chip does not advance.

### 9.5 Next Steps: Tuesday (P1, slide 26)
- A plain lilac slide, ominous, a clock face stuck at 7:30. Ring 3.5s. Valid advances (Fine, Moved or Late; not Rushed) are **refused** the first 7 times (3 times from Deck 2 on): each refusal shows the next T-refuse line, awards 0.1, judders gently, and resets the ring to 0 (the Moved band still pays 1.5 once). The 8th valid click (4th in Deck 2+) says L-Tuesday-relent and advances. Back works. This never traps the player and never blocks Deck progress.

### 9.6 The Retrospective (P1, slide 24)
- Title `Q3: A Retrospective on Your Clicking`. The sentence is built from real counters (all coerced with `|0`): `In this keynote you clicked %s times. Of these, %m were moving and %r were premature. I have a sticker.` with `%s` = slides presented this session, `%m` = Moved count, `%r` = rushed count. Then 2.5s later Management reads Item 1: L-Retro-item1. The Applause Rating is read out at the same time. Never print NaN: guard each counter with `(Number(x)|0)`.

### 9.7 Employee of the Quarter and the battery (P1, slide 29)
- The slide shows a polaroid frame whose "profile photo" is a mustard circle that mirrors the Clicker (CSS). Gerald's sentence: E-sentence. From this slide on a battery icon is at the corner of the Clicker. `battery = 100`; each **successful advance** subtracts 12 down to a floor of 4. At 4 Gerald says E-panic (bubble, face `panic`) and Management E-battery. Further advances show 3, 2, 1 then "recharge by applause": battery jumps to 100, Management E-recharge, `api.sfx('ding')`, a stapler claps (CSS only, no Meh). Reaching 4 happens around the end of Deck 1. It never reaches 0. Hidden during the ending.
- On this slide, if the player's advance is Moved, Gerald says the touching line E-click-thanks once per deck.

---

## 10. IDLE LADDER AND LONG IDLE (behavior on idle)

`quiet` = seconds since the last real player input, accumulated from the **clamped delta-time loop** (not `api.now`), so a hidden tab does not count and the fuzz harness behaves. Under `api.selftest` multiply every threshold below by **0.1** (`IS = api.selftest ? 0.1 : 1`), so the 62-virtual-second fuzz idle reaches every tier. Quiet resets on any input (click, key, laser move, swipe).

| quiet | Event |
|---|---|
| `quiet >= 7s * IS` AND the ring has completed (p >= 1.0); all later tiers use `quiet` alone and never reset when the mind-advance restarts the ring | **Improv note**: Gerald (bubble) improvises one line from the I7 bag, and a sticky note slaps onto the slide (max 3, oldest peels; text from the sticky bag N-bag). Every further 12s * IS does it again, never more than 3 notes on screen. Face `improv`. `improvs++`, `api.stat.inc('gerald-keynote.improvs')`. |
| 15s * IS | **Mind advance** (once per idle session): Gerald walks out from behind the lectern (CSS translate), the slide shrinks, and he advances the slide himself. No award, no Moved, no Minutes row beyond `Owner: the room`. Management L-Mind. The ring restarts, but the idle clock does NOT reset (the idle ladder continues). |
| 30s * IS | **Gerald asks the room a question and answers it** (I30 bag). |
| 60s * IS | **THE FIELD** (secret): the stage fades to sepia (CSS filter on the slide and hall only, not the whole root), a field gradient and a distant crooked fence appear behind Gerald, he removes the lanyard (face `field`). Management L-Field-intro, then Gerald (bubble) speaks 4 sentences, one every 4s * IS: F1 to F4. Achievement `gerald-keynote.field`, +10 Meh, once per session. |
| 120s * IS | The lights dim. Stapler whisper (ST narrator): "Are we still on?" Management L-Coat. The first stapler puts on a coat and quietly exits the room (hidden). |
| 180s * IS | Gerald falls asleep standing, leaning (face `sleep`); the stapler (if home) reads titles aloud (L-Nap). (P2) |
| 360s * IS | Slide reads `Back in 5`; after another 60s * IS it reads `Back in 5 (Q3)`. The stapler sits on the lectern. (P2) |

**On the next input after the Field or any later tier** (the "return"): the scene restores in 400ms, the stapler is back hanging up its coat: ST line L-Coat-return, Gerald L-Return (once). A return after the 360s tier awards `gerald-keynote.waited` and Management L-Waited. Every return gets one routine Meh award of 0.5. The return click itself is consumed (it does not also advance), so the ring is intact.

Idle during modes other than `play`: Q&A, the ending beats and the Tuesday slide freeze the ladder at stage 0 (no stage fires). Idle in `foam` or `fiasco` is impossible (they time out). The idle clock is paused while `document.hidden`.

---

## 11. SPAM (behavior on rapid clicking)

- Spam buffer: timestamps (on the loop clock) of every advance attempt (click, key, slide click, swipe), counted **before** the re-entry guard and regardless of zone. Keep at most 16 entries.
- **Trigger: 8 or more attempts within 3.0 seconds, and not within 20 seconds of the last fiasco.** Then `mode = 'fiasco'`, `spam++`, `api.stat.inc('gerald-keynote.spam')`.
- Fiasco (3 seconds, loop-driven): the slide becomes a flipbook that cycles titles at about 14 per second (43 titles total, from the title bank plus counters) while the counter number blurs; Gerald (bubble) says `I was not finished being moved.` three times with the font size growing each repeat (20px, 28px, 40px); `api.sfx('whoosh')`; Management L-Fiasco. Rush and advance logic are suspended; the ring is paused.
- Then **Sandra confiscates the clicker** (`api.sfx('sad')`, Management L-Confiscate). The Clicker is replaced for **10 seconds** by the FOAM CLICKER (`mode = 'foam'`). Each foam press (click or key): +0.1 Meh, `api.sfx('boing')`, a squeak word floats (`squeak`, `squeek`, `sqk`), the foam squashes. No slide advances. Every 3rd press Gerald (narrator, priority 0) says a foam line from the FM bag. Achievement `gerald-keynote.foam` on entering foam.
- After 10s: Sandra returns the clicker (L-Sandra-returns), the real Clicker returns, `mode = 'play'`, the slide that was under the flipbook is shown again, spam buffer cleared, ring restarts at p = 0.
- Second fiasco in a session: Management L-Fiasco-2; third and later: L-Fiasco-3.
- Spam inside other modes: Q&A cards and chips are not spam-sensitive; rapid clicks in Q&A advance to the next unanswered question and then say the "questions first" line; no fiasco in Q&A, the ending or the stapler keynote.
- Hammering the foam: keep the squeak floaters capped (max 6 live) and reuse nodes.

---

## 12. SECRETS AND RARE EVENTS

12.1 **THE SPROUT** (rare, P2): 1 in 25 Moved advances, or 1 in 80 slide advances (`api.chance`), only on a normal slide, once per session. A tiny sprout grows from Gerald's head; narrator S-sprout. Over the next 5 slides it grows (CSS stage 1 to 5, a line at stages 2 and 4: S-sprout-stage). Achievement `gerald-keynote.sprout` at stage 1. If the player hits 3 more Moved after the sprout, it becomes a tiny Gerald, **SPUD JR.**, who sits on the lectern. From then on Spud Jr. shows a small bubble that repeats the **last three words of Gerald's previous sentence, one slide late** (Spud Jr. persists until the module closes; store `save.spudJr` as true so it is mentioned in the welcome-back line, not re-born). Narrator S-spudjr on birth.

12.2 **ONE REAL SLIDE** (rare, P2): 1 in 60 slide advances on normal slides, once per deck. Slide titled `A Bullet Point` with exactly one bullet, and the bullet is blank. Counter reads `SLIDE {n} (Candidly) OF 7 1/2`. Gerald L-Real. No award.

12.3 **THE TYPO** (rare, P2): 1 in 60 normal slides: swap two adjacent letters inside the title's longest word (title state only, never the stored table). Gerald L-Typo; award 0.7 Meh; the typo is logged in the Minutes with a gold sticker (a `*`).

12.4 **THE FOURTH WALL IS NOT A WALL** (P1): when the polled root width first goes under 600px: Management L-Narrow. When it goes under 400px: sticky-note mode (see 12.8). Pressing F: slide scale 1.05 and Gerald L-F once. Each of these lines fires once per session (use a Set, with 20s cooldown when the width flaps).

12.5 **THE STAPLER TAKES A COAT**: section 10 (120s tier).

12.6 **THE STAPLER SPEAKS** (P2): while on a 7 1/2 family slide, click the stapler 7 times. The music stops (nothing to do: silence), the stapler stands on its hinge (body rotates upright), and four speech lines appear over 4s each in the bubble position with `who:'Stapler'` mirrored through the narrator at priority 2: SP1 to SP4. Awards 7.5 Meh and achievement `gerald-keynote.stapler`. Clicks 1 to 6 give the Stapler-click bag lines with no award. After the speech the stapler sits back down.

12.7 **THE STAIRCASE OF HALVES**: section 6.5.

12.8 **STICKY-NOTE MODE** (P2): under 400px root width the projector becomes a yellow square (rotate -3 degrees, a tape strip, title only, no footer) and Gerald presents to it. Management L-Sticky once. Achievement `gerald-keynote.sticky`. It does not change the ring or controls.

12.9 **THE FOAM CLICKER**: section 11. **THE FIELD**: section 10. **THE BACK-ON-SLIDE-1**: section 6.4.

12.10 **SANDRA CITES SECTIONS** (callback 2): see S-flag bag.

12.11 **TOAST TRANSITION** (rare, P2): see section 3 (1 in 60 transitions).

12.12 **CLICK GERALD**: Gerald waves (CSS) and the slide goes dark for one second; line L-Gerald-self (P2).

12.13 **ESCAPE**: 1st press L-Escape-1; 5th press L-Escape-5 (counter on the loop; P2).

12.14 **B KEY**: blackout overlay; on the first press per session Gerald (narrator) L-Black. While black, clicks still advance and the ring still runs.

---

## 13. Q&A, THE REPRISE, THE STAPLER'S KEYNOTE, AND THE NOT-ENDING

All four stages are `mode`s with explicit exits so nothing can wedge.

1. **Thank You** (content slide 36): fanfare (`api.sfx('fanfare')`), `api.confetti()`, Gerald line E-thanks (bubble), Management L-Thanks (applause for "one stapler and a plant" or whatever the rating currently is). Ring plays normally. The next valid advance goes to Questions?.
2. **Questions?** (`mode = 'qa'`): Management L-QA-intro. Three question cards (buttons) appear under the slide: `Brenda (Row 3)`, `The Stapler`, `Dennis (Plant)`. Each, once, in **any order**: shows the question (text from the Q&A rows), Gerald (bubble) gives his answer line, `api.award(0.5)`, `chips`-like stat `gerald-keynote.chips++`. Brenda's answer ("Next question,") also: the ring goes golden by itself (play the Moved effect, tally++, bell, tears) and Management says L-Brenda-after. The CLICKER also answers the next unanswered question in the order Brenda, Stapler, Dennis; a click after all three are answered is `advance` (below). A click on a card or the Clicker spaced under 300ms is debounced. After the third answered question, Gerald says L-Before-I-go, `mode` returns to `play`, and the next slide is the Reprise.
3. **Thank You (Reprise)**: content slide; Management L-Reprise. The player must click again (normal ring rules; the Late zone is allowed). At the click: `mode = 'staplerkeynote'`.
4. **The Stapler's keynote** (timed, loop-driven, about 11 seconds): Management L-Stapler-floor; the Stapler walks to the lectern (Gerald slides left); the slide is blank and labelled `7 1/2, but mine.`; the stapler (narrator + bubble) speaks ST-keynote; Gerald, who has no hands, applauds with a single soft thud of his body against the lectern (CSS bump, `api.sfx('bloop')`, a tiny `thud` word); Gerald (bubble) says E-merely-moved; `api.award(7.5)`; achievements `gerald-keynote.reprise`. Then Management says the final line L-Final.
5. **The not-ending**: house lights (an overlay dims the stage to 40% for 3s), the audience leaves one by one (every audience member except Dennis and one stapler fades out over 1.5s), the stapler claps slowly, once every 2s, alone, three times (`tick`), then total dark for 3s (a black overlay), the stapler stops. Lights up, the audience returns (fade 0.6s), Gerald says G-welcome (bubble): `Welcome. I don't believe we've met.` Deck 2 starts (section 6.6). Management L-Deck2. The Minutes pad is wiped clean except `1. Synergy is when two things happen near each other  | Owner: Dennis (Plant)`.
6. `mode` always returns to `play`. There is no way to win; the rating just changes units; the player can leave at any point, and `destroy()` says no last words (it cannot) but the **exit line** is performed if the module is destroyed while Gerald is typing: do nothing, silently (the engine has `moduleExit` lines). Instead: the last sentence Gerald was typing is stored in `api.save` and shown as the very first Minutes row on the next visit as `0. {fragment}--  Item cut short. Item moved.` (this is "Gerald says one last sentence mid-slide because he was not finished being moved", implemented as a callback to the previous session). Keep this tiny (2 lines of code) or cut it.

Stats: after the Stapler keynote `stat decks++`, `save.decks = deckNo`. Achievement `gerald-keynote.reprise` also fires on the Final line.

---

## 14. ESCALATION TIMELINE (beats are triggered by slide index and counts, not by wall-clock minutes)

| Beat | Trigger | What happens |
|---|---|---|
| 1. The Spud at the Lectern | mount to slide 2 | Lights up (600ms). At t=0.4s honk and Gerald: `Synergy, Roughly.` At 1.6s the slide-1 sentence types out (L=4.8). At ~3.5s Management explains the clicker. First Fine advance: first named transition. |
| 2. The First Rush | slides 2 to 6 | Tempo varies per slide. First rush gets the 1st-rush line. The placard appears at the first Moved; Management hint L-Ring-hint at the first Moved. By slide 5 the player has felt all zones. |
| 3. The Red Dot | slide 5 | Management: `If you have a red dot, use it.` Laser follows the mouse; Gerald's eyes follow it; first word dwell (Roughly). |
| 4. Slide 7 1/2 | after slide 7 | The anchor. Blank, silent, one clap. |
| 5. The Deck Gets Graphics | slides 8 to 17 | Charts appear; recursive titles; chart clicks rewarded with readings. |
| 6. Sandra Has Notes | slides 9 to 19 | Flags, the contradictory flag, the redacted slide. |
| 7. The Stapler Unionises | 7 1/2 visits 3 to 8 | Union notes, second stapler, delegation. Gerald responds inside a sentence. Improv notes get weirder (river, road, Tuesday). |
| 8. Q&A, the Touching Part | after Thank You | Three questions; the happiness question; the room goes quiet for a potato. |
| 9. The Clicker Gets a Slide | slides 22 to 35 | Role reversal, retrospective, Tuesday, Employee of the Quarter, battery. |
| 10. The Ending That Is Not An Ending | after Thank You in Deck 1 | Reprise, the Stapler's keynote, house lights, Deck 2: "Welcome. I don't believe we've met." |

A new beat or reaction fires at least every ~20 seconds because something is always in the pipeline: a slide, a flag, a chart, a Minutes row, an audience member, an idle tier.

Improv bag weirdness: after the 2nd improv of the session, or after slide 17, use the weird improv bag (I7-weird) instead of the warm one (I7-warm).

---

## 15. LINES (FINAL, VERBATIM)

Prefixes: `G/b` = Gerald in the bubble, `G/n` = Gerald through the narrator (`who:'Gerald'`), `M` = Management narrator, `ST` = Stapler, `BR` = Brenda, `DN` = Dennis, `S.C.` = Sandra's banner text. `%p` = player name, `%w` = word, `%n`/`%s`/`%m`/`%r` = numbers (builder substitutes). Quotes are the line text. Each row marked (bag) is a shuffle bag.

### L1. Opening and explaining (no tutorial wall)
1. G/b, t=0.4s (after honk): "Synergy, Roughly."
2. M, t=3.5s: "You are the clicker. Gerald will indicate readiness by breathing."
3. M, mount (first line, if lifetimeSlides is 0): "Today's keynote is mandatory. Attendance is optional. Interest is being tracked by a committee of one."
4. M, mount (if lifetimeSlides > 0): "Welcome back. The deck has been kept warm. It has opinions about that."
5. G/b preface to slide 1 sentence, only if flag metGerald was already set: "We have met. I was less moved then."
6. M, if metGerald not set before: "Gerald has not met you, which is a standard of intimacy we are aiming for."
7. M, at the first Moved: "The ring is a suggestion. Per policy, so is Gerald."
8. M, slide 5: "If you have a red dot, use it."
9. M, first arrival of slide 8: "Slide 8 of 7 1/2. Management has checked the arithmetic. The arithmetic has asked for a minute."
10. M, slide 3 of Deck 2: "Gerald has revised the slides. The sentences have not noticed."

### L2. Management general bag (also registered as `m:gerald-keynote:mgmt`), spoken every 25 to 40s of play when nothing else is happening
11. "Per my previous slide, please advance."
12. "Gerald's keynote is rated 9.7 out of 7 1/2 by the audience of one stapler. Management considers this a mandate."
13. "The deck contains no content. The deck contains content-adjacent titles. This is an important distinction at the Q3 retro."
14. "Dennis (Plant) has taken notes. They are photosynthesis. They are not impressed."
15. "Dennis (Plant) has attended the keynote. Dennis (Plant) has not applauded. Dennis is a plant, and also a critic."
16. "Brenda in Row 3 has nodded. It was the third nod. It was not at anything."
17. "Management would like it noted that nobody has asked what Gerald is Vice President of. It is Spuds. It has always been Spuds."
18. "Audience satisfaction currently sits at {rating}." (use the live Applause Rating string)
19. "The projector is on. The projector has not been asked what it thinks."

### L3. Slide sentences (S rows: the sentence for each handwritten slide; G/b)
20. Slide 1, Synergy, Roughly: "Friends, we gather today because gathering is the first step of having gathered."
21. Slide 2, Q3: "Q3 looked back at Q2, which was looking forward at Q4. It was the most anyone has ever looked."
22. Slide 3, Our Values: "Our values are listed below, once someone decides what they are. Until then, please enjoy the bullets."
23. Slide 4, Growth: "Growth is simply the soil's way of saying, 'I have been up to something.'"
24. Slide 5, Journey: "A journey is a destination that has not stopped moving. A destination is a journey that sat down."
25. Slide 6, Stakeholders: "A stakeholder is anyone who has stood near a stake. By that definition we are all deeply held."
26. Slide 7, Alignment: "Alignment means everything faces one direction. I have checked. Everything is facing the door."
27. Slide 8, Leveraging: "To leverage a lever is to admit you cannot lift the lever yourself. I admit it. I am a potato."
28. Slide 9, Learnings: "We have learned this before. We learned it so well we forgot, which is how you know it took."
29. Slide 10, Bandwidth: "Bandwidth is how much of you is free on a Thursday. I have 14 percent. It is mostly sighing."
30. Slide 11, Pivot: "We will pivot gently, so as not to wake the strategy."
31. Slide 12, Next Steps: "Step one is step two's neighbour. Step three is a rumour. We will meet at the rumour."
32. Slide 13, Q6 recursive: "Q6 looked back at Q5, which looked back at Q4, which was looking forward at Q7. Nobody has ever seen so much calendar."
33. Slide 14, Low-Hanging Fruit: "Low-hanging fruit teaches us that all of nature is within reach of a tall enough regret."
34. Slide 15, Org Chart: "Everyone reports to the person on their left. Brenda reports to the room. The room reports to Tuesday."
35. Slide 16, Where Our Efforts Went: "As you can see, 100 percent of our efforts went to 'Other.' We are proud of Other."
36. Slide 17, Stakeholder Overlap: "The circle overlaps with itself. This is where all great partnerships begin."
37. Slide 19, Q9: "Q9 is a retrospective of a retrospective of a retrospective. It is mostly looking, and it is prospectively tired."
38. Slide 22, Gerald Has Lost His Place: "I seem to have lost my place. You have it, I think. Say a word. Any word. Make it a good one."
39. Slide 24, Retrospective: (built from counters) "In this keynote you clicked %s times. Of these, %m were moving and %r were premature. I have a sticker."
40. Slide 29, Employee of the Quarter: "Without the clicker, a presentation is just a man talking. With the clicker, it is a man talking, and being moved at."
41. Slide 36, Thank You: "Thank you. Questions? There are none. I am deeply moved by the none."
42. Deck 2 slide `Slide 1` (title `Revision N: The Same Keynote, Revised`): "I added this slide because the old first slide felt unsupported. It had nothing under it."
43. Deck 2 slide `1 1/2 1/2`: "This slide introduces the introduction to the slide before it. The slide before it is thrilled."
44. Tuesday slide first sentence is T-refuse row 1 (below).
45. The union response sentence, appended to the sentence of the first normal slide after visit 8 (and each later union note): "I hear you, stapler. We are working on a room with fewer clacks."

### L3b. G-bag: Gerald sentences for generated slides (shuffle bag, G/b)
46. "Every great potato was once a smaller potato who was told to trust the process. The process was the dirt."
47. "Growth is simply being bigger than you were, which I recommend, in moderation, on Thursdays."
48. "Transparency means you can see through us, which is why we have installed a wall."
49. "Leadership is knowing which way is forward, and then asking someone to hold the door."
50. "Disrupt the market gently, the way one disrupts a sleeping sandwich."
51. "The cloud is just someone else's potato cellar."
52. "Our north star is far off and a little dim, but it has never once been late."
53. "Let us circle back to the beginning, which we have not left, which is the benefit of circling."
54. "Efficiency is doing nothing faster. Quarter by quarter, we are nearly there."
55. "A spud is a decision the ground made quietly."
56. "We must listen to the data. The data is sitting very still, which is a kind of speaking."
57. "Every journey of a thousand slides begins with a click, and also a spreadsheet."
58. "I have a vision. It is, per policy, a slightly blurry vision. We call this focus."
59. "Success is not a destination. It is a very long corridor with a vending machine at the end."
60. "Do not fear the pivot. Fear the person who calls it a pirouette."
61. "Our Q4 projections are best described as a sincere weather."
62. "We are not behind schedule. The schedule is ahead of us, and getting shy."
63. "Revenue is merely the sound a wallet makes when it is looking at something."
64. "Today we are going to unlock the potential of the word unlock."
65. "The wind is not against us. It is simply in front of us, and we are inconveniently walking."
66. "A lesson is just a mistake that has been given a lanyard."
67. "Our bandwidth is wide but shallow, like a puddle with ambitions."
68. "We will dive deep. For safety, we will dive deeply in the shallow end."
69. "The next step is the one after this one. I have been walking toward it for nineteen years."
70. "Low-hanging fruit is a metaphor. We have no fruit. We have, as you can see, spuds."

### L3c. T rows: the 30-title bank for generated slides
Titles: "Headwinds, Warmly", "Learnings (Draft)", "Deliverables: A Gentle Reminder", "The Roadmap Is Also a Road", "Optics, Closely", "Ownership of Ownership", "Silos: A Love Story", "Runway (Pending Runway)", "Deep Dive (Shallow End)", "Pain Points, Painlessly", "Quick Wins, Slowly", "A Sincere Weather Forecast", "Stakeholders, Continued", "Mission, Vision, Lunch", "Core Competencies (Non-Core)", "Our Culture Is Also Culture", "Touch Base: Light Contact Only", "Moving the Needle (Gently)", "Circle Back to the Slide We Skipped", "Bandwidth: A Follow-Up to Bandwidth", "Parking Lot (Items)", "The Ask (Not Asked)", "Value Proposition: Value", "Growth Hacking: Not Recommended", "Synergy, Continued Roughly", "Agenda: Items 1 to 7 1/2", "Next Steps: A Preview of Steps", "Takeaways: Please Return", "Offline Conversation (Online)", "Alignment: Revisited, Again".

### L4. Rush lines (G/b; by cumulative rushed count r)
71. r=1: "I was not finished being moved."
72. r=2: "Please. The last sentence was still landing. There was a person under it."
73. r=3: "I was not finished being moved. I was barely begun. I had my hand on the feeling."
74. r=4: "You have clicked past a thought. It was a good one. The minutes will miss it."
75. r=5: "That is five times. Sandra is keeping a tally in the margin. The margin has asked for a break."
76. r=8: "I was not finished being moved, and now I am moved in a new direction, which is away."
77. r=10: "Friend. I am a vegetable. I take time to feel. It is called 'baking.'"
78. r=12: "I am moved. You may proceed. I will be moved again afterward, at no cost to the department."
79. r=20 (M narrator): "Gerald has been interrupted 20 times. He has described this as 'a rhythm'. He has not described it kindly."
80. R-bag (every other rush, G/b): "I was not finished being moved." / "I was mid-sentence. I was mid-feeling. I am now mid-both." / "Please. The sentence was still arriving. It had its coat on." / "You have gone ahead of the feeling. The feeling is not a runner."
81. L-Rush-skip (M, narrator, once per slide on rush 5 and later): "The slide you rushed past had a second sentence. It was a good one. It is in the soil now."
82. 7 1/2 rush bag (G/b): "Gerald is being moved by the blank. He has asked for the full five seconds." / "The blank is still arriving." / "Please hold for applause. It is a hold, not a request."

### L5. Moved lines (G/n)
83. 1st: "Perfect. I felt that in my eyes, which are technically the sprouts."
84. 3rd: "Moved: 3. Gerald would like it noted that he is a man who has been moved three times, under oath."
85. 7th: "You clicked exactly as the feeling peaked. Have we met? We have not. It felt like it."
86. 20th (M): "Gerald has been moved 20 times. HR has asked whether he needs 'a seat, or a field.'"
87. 100th (M): "Gerald has been moved 100 times. Management reports this is more times than a piano at a family reunion."
88. Moved bag: "I am moved. Thank you for waiting." / "You waited exactly one beat. That is the whole job. I did not know it was a job." / "That landed. I felt it land. It had a small suitcase." / "Moved. Logged. Filed under 'moist, but with dignity'." / "Again, perfectly. I would like to thank the committee of one."
89. Reverse bag (after 5 consecutive Moved): "I was finished being moved, and then I was moved again." / "I was finished being moved. I am now finished being finished." / "I was finished being moved. Please hold your applause at the door."
90. Streak 5 (G/b, once): "That is five in a row. That one was right. I am not comfortable."
91. 10th (M): "Moved: 10. HR has been informed. HR has not been moved."
92. L-Pause (G/b, once per deck, if the Moved lands on the slide right after a 7 1/2): "I have never had a clicker who waited. I would like you to know this is noticed."

### L6. Slide 7 1/2 (visits)
93. L-7.5-arrival (M, visit 1): "Slide 7 1/2. It is blank. It is the best slide in the deck, and also the other one."
94. L-7.5-return (M, bag, visits 2+): "Slide 7 1/2 has returned. It was never gone. It was just between things." / "Slide 7 1/2 again. It is not repeating. It is returning." / "Slide 7 1/2 does not appear in the table of contents. It appears in the minutes."
95. Visit 1 clap (M): "A single stapler applauds. It is a very full applause. It is one stapler wide."
96. Visit 2 (M): "The stapler claps once, then nods. This is its entire range, and it is magnificent."
97. L-7.5-gerald (G/b, visit 1, after clap): "I do not know what is on this slide. I think that is what we are all afraid of. Next."
98. L-7.5-moved (G/b, bag): "No notes." / "I am moved by the blank. I did not know it could do that."
99. Visit 3 (M): "The stapler has applauded Slide 7 1/2 three times now. It considers itself a regular."
100. Visit 3 union note (ST, sticky + narrator): "One clap per slide is a standing ovation, for a stapler. We would like that in writing."
101. Visit 4 L-Stapler-4 (M): "The stapler's applause is described by Management as 'warm, metallic, and legally binding'."
102. Visit 5 (M): "A second stapler has joined the front row. Neither is willing to say who invited whom."
103. Visit 6 (M): "The two staplers clap out of sync. This is being called syncopation. Nobody has been told."
104. Visit 7 (M): "Nobody asked for an encore. There is an encore. It is a single staple, fired into the air."
105. Visit 8 (ST, sticky + narrator): "Demands: a 15 minute break, a quieter room, and for the clapping to be classified as work."
106. Visit 9 to 11 demand notes (ST, D-bag): "Demand 4: a chair. Demand 5: to be called 'Stapler' and not 'the stapler'." / "Demand 6: a coat, for the long silences." / "Demand 7: that the word 'staple' be used only as a compliment."
107. Visit 12 (M): "The stapler section is now 11 strong. They are all wearing lanyards. The lanyards read STAPLER."
108. L-Sandra-approves-7.5 (M, visits 2+): "Sandra from Compliance has approved Slide 7 1/2. It was the only slide with nothing to redact."
109. metStapler callback (M, after the first clap, if flag metStapler was already set): "The Stapler is representing the staples. The staples are not here. The Stapler has brought a folding chair."
110. metStapler (M, if not set before): "You and the Stapler have now met. This is on the record."
111. Visit 13+ (M, once): "The staplers are watching Slide 7 1/2 with cautious pride. The pride is not cautious. The caution is for the pride."

### L7. Laser (G/n unless noted)
112. Roughly: "Yes. Thank you for pointing at 'Roughly.' Nobody has ever pointed at roughly."
113. Synergy: "You are pointing at 'Synergy.' I can feel it. It is warm. It has been waiting."
114. Retrospective: "'Retrospective' is a word that points at itself. You have simply joined in."
115. Journey: "You have pointed at 'Journey.' It is the only word on this slide that has packed."
116. Alignment: "The dot is on 'Alignment.' Everything is now facing the dot."
117. Bandwidth: "'Bandwidth.' I have 14 percent. The dot has taken some of it."
118. Pivot: "You are pointing at 'Pivot.' Please be gentle. It is mid-turn."
119. Steps: "'Steps.' There are none. There is only the idea of a foot."
120. Values: "Our 'Values' are pending. The dot is a good place for them to wait."
121. Tuesday: "Do not point at Tuesday. It will notice."
122. Leverage: "You have pointed at 'Leverage.' It is lifting nothing, and proud of that."
123. Growth: "'Growth.' The dot is bigger now. This is the system working."
124. Fruit: "The dot is on 'Fruit.' It is hanging low. It is not being collected."
125. Generic word bag (%w): "The dot rests on '%w.' '%w' has not been rested on before." / "'%w.' A bold place to point." / "You have chosen '%w.' Sandra will want to know why." / "Pointing at '%w' is a form of reading. I support it." / "I see you looking at '%w.' I was looking at it too, privately."
126. Circling (the dot re-enters one word 4 times in 10s): "The dot has circled '%w' four times. I am concerned for the dot."
127. Dot leaves the slide for 2s (after dwelling on it): "The edge of the slide. There is nothing out there. I have been."
128. Ceiling (banner, `data-lz="ceiling"`): "Ah. The budget."
129. Gerald's eyes, first time: "Please point at me more generally. I am not a data point. I am a data potato."
130. Gerald's eyes, 2nd and later: "I would like to be pointed at in a more general way."
131. Stapler: (ST) "I am not a word. I am a union."
132. Dennis: (DN) "Dennis (Plant) has been pointed at. Dennis (Plant) is thriving and unavailable."

### L8. Chart furniture (G/n, +0.1 Meh)
133. Bar, first click of the session: "This bar is Directional. The other bar is also Directional, in a different direction. Hence, growth."
134. Bar bag: "This bar is Pending." / "This bar has been asked to represent Q3. It has agreed, reluctantly." / "Up, up, and then sideways. Sideways is a direction. I was told it was a trend." / "This bar is the same as the last bar, but taller in spirit."
135. Pie: "As you can see, 100 percent of our efforts went to 'Other.' We are proud of Other."
136. Venn: "Overlap: Pending. The circle has been asked to overlap with something. It is willing."
137. Org: "The arrows go clockwise. This is called a reporting line, and also a circle."
138. Pyramid: "The pyramid has one floor. It is a very stable pyramid. The floor is also the roof."
139. Arrows: "The arrows all point somewhere with great confidence. None of them have met."
140. Photo: "A stock photo of a handshake. Both hands are paid by the hour."

### L9. Sandra
141. S.C. flag, slide 9: "Slide 9 is potentially a slide. Please remove the slideness."
142. S.C. flag, slide 11: "Slide 11 is too brief and also too long. Please make it the same length as a sigh."
143. S-flag bag (S.C. banners): "Per Section 9.4(b), subparagraph 'moist': please remove the moisture." / "This slide has been flagged as 'a lot'. Sandra has not said which part." / "Slide rated 'adequately upright'." / "Please do not use the word 'synergy' unless it is in a cage." / "Not approved. Not rejected. Please hold at 'maybe', in triplicate." / "The title is 3 words too long and 1 word too short. See attached. Nothing is attached." / "Section 12.1: Slides shall not look at one another."
144. SD bag (dismissal, M narrator priority 0): "Sandra's flag has been dismissed. Sandra has been notified. She has flagged the dismissal." / "Flag removed. A smaller flag has been placed where the flag was." / "Flag dismissed. Sandra would like it known that it was a good flag."
145. RD rows (redacted slide, G/n): bar 1: "This word is now less redacted. It is still mostly a thought." bar 2: "The second word is a different kind of redacted. It is redacted from the inside." bar 3: "A black bar. Bold. This slide is now a rectangle, and I have never felt more represented."
146. Redacted finish (M): "Sandra from Compliance has redacted 'Synergy'. Sandra has also redacted 'redacted'."

### L10. Tuesday
147. T-refuse 1 (G/b): "Next Steps: Tuesday. We do not advance past Tuesday. It is not a slide. It is the room."
148. T-refuse 2 (G/b): "Please. The clicker has been told. The clicker has not been consulted."
149. T-refuse 3 (G/b): "Tuesday does not move. We move around it, like a river around a very patient rock."
150. T-refuse 4 (M): "The click has been received. Tuesday has declined to be advanced. This is within its rights."
151. T-refuse 5 (G/b): "Every deck has one slide it cannot leave. Ours is also on the agenda."
152. T-refuse 6 (G/b): "Sandra has asked me not to say what happens on Tuesday. I have not been told. That is how I know it is bad."
153. T-relent (G/b): "Tuesday has allowed us to proceed. It was never about us."

### L11. Role reversal and the clicker slide
154. Roughly: "Roughly. Yes. The most honest word in business, and the only one with a shape."
155. Technically: "Technically. The word that makes a lie shake hands with a fact."
156. Mostly: "Mostly. A word that has never once finished a sentence, and has been promoted four times."
157. After any word: "Thank you for drafting me."
158. L-Roles-skip (G/b, advance without picking): "Very well. I will use my own word. It is 'Tuesday'."
159. L-Retro-item1 (M): "Management has read out Item 1: 'Friends, we gather today because gathering is the first step of having gathered.' Still open."
160. E-panic (G/b at battery 4): "Do not stop. If it dies I must speak without slides, and I have never done that, on purpose."
161. E-battery (M): "Clicker battery: 4 percent. Management recommends applause."
162. E-recharge (M): "Clicker recharged by applause. The applause was a stapler. It was enough."
163. E-click-thanks (G/b, once per deck on a Moved on slide 29): "Thank you for clicking. Nobody has ever clicked for me. They always just talk."
164. E-presenter (M, slide 30, once per deck): "You were the presenter all along, {player}. I was merely the part that spoke."

### L12. Idle (section 10)
165. I7-warm (G/b): "While we wait, I will improvise. A river is just a road that gave up on being dry." / "I have no slide for this, so I will describe one. It is mostly arrows, and all of them are sure." / "Take your time. I am improvising, which is a presentation with the safety off." / "Let us all take a moment to remember what we were just about to say."
166. I7-weird (G/b, later): "I would like to talk about my childhood. It was a sack. It was a good sack." / "My uncle Russet used to say never stand where a draft can find you. He was wrong about the draft and right about standing." / "The silence you are experiencing is a pause for impact. The impact is on its way. It took the stairs." / "In the absence of a slide, I will simply be very serious at you." / "Tuesday is a river. We are all standing on the bank, holding a lanyard."
167. N-bag (sticky note text, short): "A river is a road that gave up on being dry." / "Tuesday is a river." / "This slide is mostly arrows. All sure." / "Ask me about the sack." / "The impact took the stairs." / "Per policy, a pause." / "Do not feed the synergy." / "I have 14 percent. It is sighing." / "Be serious at them." / "Q4: a sincere weather."
168. L-Mind (M): "Gerald has advanced the slide with his mind. The slide did not consent. It has been noted."
169. I30 (G/b): "The clicker is merely a symbol. I am the clicker. I am also holding the clicker." / "This part is unscripted. I will speak plainly. I will not enjoy it, and neither will the plant." / "Are there any questions? Good question. The answer is yes, and also Thursday."
170. L-Field-intro (M): "Gerald has taken off the lanyard. He would like to speak, as himself, about a field."
171. F1 (G/b): "When I was a small spud there was a field."
172. F2 (G/b): "It had a crooked fence, and the fence had no opinions."
173. F3 (G/b): "I have not been back. The field has not asked."
174. F4 (G/b): "The field is still there. That is the whole slide."
175. L-Return (G/b): "Ah, you are back. The deck moved on without us. This is what the deck wanted."
176. L-Coat (M): "The stapler has put on a coat. It is unclear which coat."
177. Stapler whisper (ST): "Are we still on?"
178. L-Coat-return (ST): "I was only gone for a minute. It felt like a slide."
179. L-Nap (M): "Gerald has fallen asleep standing up. The stapler is reading the titles aloud in a small voice."
180. Back in 5 (slide title): "Back in 5" then "Back in 5 (Q3)"
181. L-Waited (M): "The stapler took the podium in your absence. It is doing fine. It is not giving it back."

### L13. Spam and the foam clicker
182. L-Fiasco (M): "FAST-FORWARD DETECTED. 43 slides in 3 seconds. Gerald is a man on a train that is also a slide deck."
183. Flipbook line (G/b, shown in the growing font): "I was not finished being moved."
184. L-Confiscate (M): "Sandra from Compliance has confiscated the clicker. You have been issued a foam clicker. It is foam."
185. FM bag (G/n, every 3rd foam press): "Click. Nothing. Click. Nothing. I have never seen a man not advance so well." / "The foam clicker advances nothing with total commitment." / "I am in awe. The slide is exactly as it was. It is a gift."
186. L-Sandra-returns (M): "Sandra from Compliance has returned the clicker. It is warm. Do not ask."
187. L-Fiasco-2 (M): "The fast-forward has happened again. Sandra has stopped saying 'again' and now simply sighs in subparagraphs."
188. L-Fiasco-3 (M): "Sandra from Compliance has issued the foam clicker a lanyard. The foam clicker is now senior to you."
189. Squeak words (floats): "squeak", "squeek", "sqk"

### L14. Back, Escape, B, F, narrow, misc
190. L-Back first per deck (G/n): "We do not go back. Except now. Briefly. As a treat."
191. L-Back bag (G/n): "We do not go back. We go around." / "Back is a direction we are only visiting."
192. Back on slide 1 (G/n): "There is no slide 0. There was. It was cut for time, and also for love."
193. L-Back-7 (M): "The previous-slide button has been pressed 7 times. It has been moved to the previous-previous slide."
194. L-Stair-refuse 1 (G/b): "There is nothing behind 7 1/2 that you want to see."
195. L-Stair-refuse 2 (G/b): "The stapler is leaning on the door. It is only being supportive."
196. L-Stair-open (G/b, third press): "Zeno would have loved this keynote. Zeno has not arrived yet."
197. Slide 7 1/4 (M): "Slide 7 1/4. Blank. The stapler claps for a quarter of a clap."
198. Slide 7 1/8 (M): "Slide 7 1/8. The clack is now a rumour."
199. Slide 7 1/16 (M): "Slide 7 1/16. The clack is below the threshold of hearing. It is still applause. It is the best applause."
200. L-Stair-floor (G/b): "I cannot halve it further. The slide is tired, and so is the paper."
201. L-Escape-1 (M): "Escape has been pressed. Escape does nothing in this keynote. It was never given a job."
202. L-Escape-5 (G/n): "I do not accept your escape."
203. L-Black (G/n, to the dark): "The slide is gone. The speech has not noticed. The black is my best audience."
204. L-F (G/n): "This is as full as it gets."
205. L-Narrow (M): "The room has become narrower. Gerald adjusts his posture to be the shape of a phone."
206. L-Sticky (G/n): "The projector has been reduced to a sticky note. I will present to the sticky note. It has never interrupted me."
207. L-Gerald-self (G/n, clicking Gerald): "Please do not be alarmed. I was giving myself a moment."
208. L-Audience: clicking Brenda (M): "Brenda nods. She would nod at anything. She is saving it for something." Clicking Dennis (DN): "Dennis (Plant) has been touched. Dennis (Plant) has filed this." Clicking the Stapler outside 7 1/2 (ST): "I am not on duty. I am on a break I have not yet been given."
209. L-Toast (M, Toast transition): "The Toaster: 'It was ready when it was ready.'"
210. Stapler-click bag, clicks 1 to 6 on a 7 1/2 (ST): "Please do not press the union." / "I am a representative. I am represented by being pressed." / "That is click {n}. I am counting. It is my only hobby." (use the click count, never NaN)

### L15. Rare events and the Sprout
211. S-sprout (G/n, on spawn): "That is my emotional growth. It is growing roughly."
212. S-sprout-stage (M, stage 2): "The sprout has grown a second leaf. It is not a leaf. It is a feeling with chlorophyll."
213. S-sprout-stage (M, stage 4): "The sprout has opinions now. They are mostly about light."
214. S-spudjr (M, on birth): "The sprout has become a tiny Gerald. His name is SPUD JR. He has Gerald's lanyard and Gerald's problems."
215. L-Real (G/b): "I have nothing to add. This is the most honest slide in the deck."
216. L-Typo (G/b): "Excellent. A deliberate error. This is how you know it's authentic."
217. Stapler Speaks (SP1 to SP4): "I have clapped for 30 years." / "I would like it known that I never once clapped for the money." / "I clap once because once is all the hinge allows." / "Please tell the others I was brave. They will say I was merely bolted down."
218. Dwell on slide edge etc. covered in L7.

### L16. Applause Rating (cosmetic units; shown on the placard and read by Management)
Moved count m: 0 to 4: "1 stapler and a plant"; 5 to 9: "2 staplers, a plant, and some interest"; 10 to 19: "4 staplers, one plant, and an unexplained sock"; 20 to 34: "a respectable hush"; 35 to 59: "a standing ovation, seated"; 60 to 99: "7 1/2 staplers (one is a stapler's idea of a stapler)"; 100 or more: "a piano at a family reunion". Management announces the unit change (priority 1) the first time each unit is reached: "Applause is now measured in {unit}. Management is not sure who approved this."

### L17. Q&A, Reprise, ending
219. L-Thanks (M): "Applause for Gerald: {rating}. Management considers this an ovation."
220. L-QA-intro (M): "Questions? Three have arrived in the box. The box is a very good listener."
221. Brenda asks (card text): "Are you happy, Gerald?"  Gerald (G/b): "Next question," (and does not look at anyone).
222. L-Brenda-after (M): "The room is very quiet for a potato."
223. Stapler asks: "What is the plan for the break?"  Gerald (G/b): "The plan is a pause with a plan-shaped hole in it."
224. Dennis asks: [silence] (card text: "...")  Gerald (G/b): "A good point. Well observed. Dennis, you are a plant, but you are right."
225. Deck 2+ alternates: Brenda: "Are you still happy, Gerald?" -> "Ask me in Deck 3." Stapler: "Did you read our demands?" -> "I read them with my whole potato." Dennis: "..." (a longer silence) -> "Dennis has said it better than I could. Dennis has said nothing, at length."
226. L-QA-chaser (G/b, extra clicker clicks in Q&A with no cards left or after answers): "Questions first, please. I have a system."
227. L-Before-I-go (G/b): "Thank you. Before I go, one more slide."
228. L-Reprise (M): "Thank you for attending. Thank you for staying. The reprise was not on the agenda and is now the agenda."
229. L-Stapler-floor (M): "The Stapler has asked for the floor. The floor has agreed. The floor is, technically, the lectern."
230. ST-keynote: "My keynote has one slide. It is blank. It took me 40 years to make it this empty."
231. Thud (M): "Gerald, who has no hands, applauds with a single soft thud of his body against the lectern."
232. E-merely-moved (G/b): "I was merely moved."
233. L-Final (M, every deck): "Congratulations. You have completed the keynote. The keynote has not completed you."
234. G-welcome (G/b, deck start): "Welcome. I don't believe we've met."
235. L-Deck2 (M): "Revision 2. Gerald has added a slide before slide 1. It is called 'Slide 1.' The old slide 1 is now 1 1/2."
236. L-Deck3+ (M): "Revision {n}. The same keynote, revised again. Slide 7 1/2 is, as always, still there."
237. Last Minutes row after the not-ending (pad text): "Item 1: Synergy is when two things happen near each other. Owner: Dennis (Plant)."

(Total distinct lines above: well over 120 including the bag members.)

---

## 16. CALLBACKS AND RUNNING GAGS (summary for the builder)

- **Cross-module:** `metGerald` (read at slide 1, set on first slide), `metStapler` (read and set at the first clap), `metDennis` (set when Dennis is first addressed: Q&A card or clicking him), Dennis (Plant) as a global cast member, Sandra from Compliance (cited only), Tuesday (a slide that refuses), The Toaster (rare transition).
- **Running gag 1: the single stapler** (section 8). **Running gag 2: "I was not finished being moved"**: mutates by rush count, reverses on perfect timings, becomes the foam-clicker flipbook, is gently echoed by Brenda's "Next question,"; and the placard TIMES GERALD HAS BEEN MOVED. **Running gag 3: the Minutes pad and the unassigned action items**, plus recursive titles and the "of 7 1/2" counter.
- **Internal callbacks:** Item 1 read back at the retrospective; Spud Jr. repeats Gerald; the union note is answered inside Gerald's sentence; Sandra approves 7 1/2 because it has nothing to redact; Brenda, Dennis and the Stapler return in Q&A; Deck 2's `Slide 1` pushes the old slide 1 to 1 1/2.

---

## 17. ACHIEVEMENTS (`P.addAchievements`; all ids prefixed `gerald-keynote.`)

At least 6, at least 2 secret (here 15 with 7 secret). Use `check` for count-based ones; `api.achieve(id)` for events.

| id | name | desc | icon | secret | reward | trigger |
|---|---|---|---|---|---|---|
| `gerald-keynote.forward` | Grand Master of the Forward Motion (Seventh Degree) | Advance 10 slides. Gerald presents the certificate: it is a slide that says 'Certificate.' | ⏩ | no | 2 | check `slides >= 10` |
| `gerald-keynote.golden` | Supreme Minister of the Golden Moment | Land 5 Moved clicks. Gerald is moved. So are the staplers. | ✨ | no | 3 | check `moved >= 5` |
| `gerald-keynote.impatience` | Hereditary Archduke of Impatience | Rush Gerald 10 times. He was not finished being moved on any of those occasions. | ⏱️ | no | 2 | check `rushed >= 10` |
| `gerald-keynote.sacredblank` | Keeper of the Sacred Blank | Reach Slide 7 1/2 for the first time and hear a single stapler applaud. | 📄 | no | 7.5 | first clap |
| `gerald-keynote.laser` | Laureate of the Laser Arts, Red-Dot Division | Hold the laser pointer on 5 different words in a single presentation. Gerald thanks you for pointing at roughly. | 🔴 | no | 3 | 5 different words riffed in a session |
| `gerald-keynote.sandra` | Compliant With Sandra, Provisionally | Dismiss 5 of Sandra's flags. She has flagged the dismissals. | 🚩 | no | 3 | check `flags >= 5` |
| `gerald-keynote.employee` | Employee of the Quarter (Quarter Redacted) | Be presented with your own slide. Without you it is just a man talking. | 🏅 | no | 5 | arriving at slide 29 |
| `gerald-keynote.reprise` | Congratulations (The Keynote Has Not Completed You) | Reach the end of the keynote, which is a loop. | 🔁 | no | 5 | the Final line |
| `gerald-keynote.field` | Doctor Emeritus of the Pause (Honorary, Unaccredited) | SECRET. Do nothing for 60 seconds, and let Gerald speak about a field. | 🌾 | yes | 7.5 | the Field tier |
| `gerald-keynote.foam` | Confiscated Clicker Laureate, First Class (Foam) | SECRET. Click so fast that Sandra from Compliance issues you a foam clicker. | 🎈 | yes | 5 | entering foam |
| `gerald-keynote.zeno` | Zeno, Patron Saint of Almost Applause | SECRET. Go back past 7 1/2 and keep going. The applause gets quieter and no less sincere. | ➗ | yes | 7.5 | reaching 7 1/16 |
| `gerald-keynote.stapler` | Senior Fellow of the Single Clap | SECRET. Press the stapler seven times on a blank slide and hear its speech. | 📎 | yes | 7.5 | the Stapler Speaks |
| `gerald-keynote.sprout` | Custodian of Emotional Growth (Roughly) | SECRET. Move Gerald so deeply that something grows. | 🌱 | yes | 5 | the Sprout |
| `gerald-keynote.waited` | The Man Who Waited For A Potato | SECRET. Stay idle through the sandwich, the nap and 'Back in 5 (Q3)'. | 🥪 | yes | 10 | returning after the 360s tier |
| `gerald-keynote.sticky` | Emperor of the Sticky Note | SECRET. Shrink the room until the projector is a sticky note, and keep presenting. | 📝 | yes | 3 | sticky-note mode |

(The 360s tier is scaled by 0.1 under selftest. The sandwich is the 180s tier's flavour: Gerald returns holding a sandwich in the L-Waited narration if you want a callback; optional.)

---

## 18. IMPLEMENTATION HINTS

### 18.1 One loop, one clock
- A single `api.requestAnimationFrame` loop (re-requested each frame) drives: typewriter, ring progress, idle clock, spam buffer ageing, fiasco and foam timers, the Q&A and ending sequences, laser dwell, battery, Sprout stage timers. State is one object: `{ mode, deckNo, idx, slide, slideT, L, typed, typing, cautious, quiet, idleStage, clock, lastAdvanceT, halfVisit, rushed, moved, movedStreak, spamBuf[], ... }`.
- `dt = clamp((ts - lastTs) / 1000, 0, 0.1)`; if `ts` is not finite or `lastTs` is null use `0.016`. Advance `clock += dt` and use ONLY `clock` for timing (never `api.now()`, never `Date`). A hidden tab sends big gaps; the clamp makes the module simply pause. Under `?selftest` and `?shot`, rAF is a 16ms timer; the same code works.
- Short one-off delays (a transition class removal, the clap's 500ms advance delay, tear drops) can use `api.setTimeout`. Every `mode` that needs a timeout exit uses the loop clock (an `until` time), not a bare timer, so destroy and remount cannot leave a stuck mode.
- Idle thresholds use the `IS = api.selftest ? 0.1 : 1` multiplier (section 10).

### 18.2 State machine
`mode` is one of: `'play'`, `'fiasco'` (3s), `'foam'` (10s), `'field'` (idle tiers in progress; any input returns), `'qa'`, `'staplerkeynote'` (timed), `'ending'` (timed sequence), `'tuesday'` is NOT a mode (it is a slide flag inside `play`). Every non-`play` mode has either a timed exit or an input that exits it. `advance()` routes by mode first. Add a `mode` assertion helper that logs nothing and just self-heals: if a non-play mode has outlived `until + 5s`, force `play`.

### 18.3 DOM discipline (fuzz fails on unbounded growth)
- The slide is rebuilt per slide (replace children). Word spans max 14. Sticky notes max 3, flags max 2, Minutes rows exactly 5, staplers max 12, floating words (`clack`, `squeak`, `thud`) max 6 live (reuse), tally log array max 40 entries, laser: ONE dot element, never trails. Charts are static templates. Spud Jr.'s bubble and the sprout are single elements. No `innerHTML` with dynamic text; static SVG fragments (the ring, the clock face) may use `innerHTML` with NO `xmlns` attribute (lint warns only), or build them with `api.el('svg', ...)`.
- `api.el` text via `text:` attribute or text children. Apostrophes in titles and lines are fine in `textContent`.

### 18.4 Laser and word dwell
- Dot: absolutely positioned in the slide frame; move it from `pointermove` on the slide (clamp to the frame) with `transition: transform 60ms linear`. Touch: a 400ms long-press (managed timeout, cancelled on pointermove > 10px or pointerup) summons it and then drags it; keyboard: hold L and use arrows (8px per press).
- Dwell check at 10 Hz inside the loop (not every frame): `document.elementFromPoint(clientX, clientY)` (guard for `null` and for elements outside the root), find the nearest `[data-lz]`. Accumulate `dwell += dt` while the target is unchanged; at 1.2s fire the riff once, then cooldown 8s for the same target. Stats: `gerald-keynote.laser++` per riff. Track a `Set` of words riffed this session for the achievement (5 different words). A re-entry counter per word within 10s feeds the "circled four times" line. Targets: `word`, `eyes`, `stapler`, `dennis`, `ceiling`. The laser never gates or costs anything.
- Gerald's eyes follow the dot: translate the pupils (clamped 3px) in the 10 Hz block.

### 18.5 Swipe and long-press
Use pointer events on the slide: `pointerdown` stores `x, y, t`; `pointerup` computes `dx, dy`. If `|dx| >= 48` and `|dx| > 1.5*|dy|`, treat as a swipe (forward for left swipe, back for right swipe) and set a `suppressClick` flag for 350ms so the following synthetic `click` does not also advance. If the press lasted >= 400ms and the laser appeared, do not advance either.

### 18.6 Shuffle bags
`function bag(arr)` returns `{next(){...}}`: refill from `api.shuffle(arr)` when empty, and if the first item of a refill equals the last returned, swap it with the second. One bag per category (rush bag, moved bag, each chart type, sentence bag, title bank, improv bags, sticky bag, transitions). Exact-row lines (the 1st/3rd/7th Moved, rush by count) are looked up first; the bag is the fallback.

### 18.7 Narrator and lint
- Respect the `api.say` coalescing: priority 0 chatter is allowed to be dropped. Do not depend on a spoken line having been shown (the beat must not rely on `say` returning true).
- Guard `lastSayT` so routine lines are at least 1.5 loop seconds apart. Beats use priority 1 and 2.
- Strings with `{...}` tokens must be one of `{player} {meh} {module} {count} {item}`; the `{rating}` and `{n}` placeholders in this brief are builder-substituted before the call (lint flags unknown tokens). Build all dynamic text with `String(...)` guards so no `NaN`, `undefined`, `null`, or `[object Object]` can reach the UI (the fuzz checks every `say`, the bubble, the Minutes pad and floats).
- Required by the harness: at least one `api.award`, one `api.say`, one `api.stat.inc`, >= 6 achievements with >= 2 `secret:true`, >= 80 distinct line-like strings, no `api.exit()`, no timers or listeners at file load, no `api.on` on `window` or `document` without going through `api` (use `api.on(document, 'keydown', ...)` and `api.on(window, 'resize', ...)`), no `P.on`, no observers.
- Always-award rule: Gerald finishing a sentence on his own (not cut) awards `0.1` Meh. This guarantees engagement with the engine even in a fuzz run that never lands a Fine click.

### 18.8 Resizing without observers
Poll `root.getBoundingClientRect().width` four times a second inside the loop (not every frame) and toggle classes `m-gerald-keynote-narrow` (< 700), `m-gerald-keynote-tiny` (< 400, sticky-note mode). Also call the same check from `api.on(window, 'resize', ...)`. Narrow and sticky announcements have a once-per-session Set and a 20s cooldown. CSS also has plain `@media` fallbacks for width, but the root-width classes are authoritative.

### 18.9 Destroy and remount
Return `{ destroy() }` that saves `{decks, lifetimeSlides, lifetimeMoved, spudJr}`. Everything else is `api.*` managed. Remounting 20 times with clicks in each must be clean: no module-level mutable state (put every variable inside `mount`).

### 18.10 Dev and test loop
`node tools/lint.js games/gerald-keynote.js`, then `node tools/selftest.js gerald-keynote --steps 400`, then `--steps 1200 --idle 62000`, then `--seed 7`, then `--real`, then `node tools/shot.js gerald-keynote --actions 40` and `--width 360`. Also try `--reduce-motion`. A "full-session" smoke test via `?actions=300` must reach the Q&A (add no test hooks to production code; use many `--actions`).

---

## 19. RISKS: THE 5 MOST LIKELY IMPLEMENTATION BUGS

1. **Double and triple advancing.** Space/Enter on the focused Clicker fires a native click AND your document keydown; a click on a chart bar, flag, chip, sticky note or redaction bar bubbles to the slide's own click handler; a swipe ends in a synthetic click; fuzz bursts send 25 to 70 clicks at one element. Result: slides skip, the 7 1/2 clap is missed, the Tuesday count jumps, Q&A answers two cards at once. Fix: one funnel `advance(source)` with a 0.12s loop-clock re-entry guard; skip Space/Enter in the keydown handler when the target is a button; `stopPropagation` on every nested interactive; a `suppressClick` flag after a swipe or long-press; Q&A cards debounced 300ms. Test: hold Space on the focused Clicker and confirm exactly one advance per press.
2. **A stuck mode.** Fiasco, foam, field, Q&A, the Stapler keynote and the ending are modes with timers; a destroy or remount mid-mode, a hidden tab, or a click arriving during a mode switch can leave the Clicker doing nothing forever (the player thinks it is broken). Fix: every mode has a loop-clock `until` or an input exit; `advance()` routes by mode and every mode handler ends in `play`; a self-heal that forces `play` if a mode outlives its `until` by 5s; the ending is a list of timed steps driven by the loop, not nested `setTimeout`s; keep the foam Clicker and the real Clicker as one element with a class switch so focus is never lost. Test with `--idle 62000` and bursts.
3. **Delta-time and idle clock errors, including NaN in text.** Using `api.now()` or the rAF timestamp directly breaks idle under the fuzz harness and with hidden tabs; a first frame with `lastTs = null` gives `NaN`; the retrospective sentence and the Applause Rating can print `NaN` or `undefined` (counters not yet defined, `%s` unreplaced). A `NaN` in any visible text FAILS the fuzz. Fix: `dt = clamp(...)` with a finite fallback, one `clock` for everything, `IS` multiplier for selftest, `(Number(x)|0)` for every interpolated number, a single `fmtLine(template, vars)` helper that throws away any template containing an unfilled `%x`/`{x}`, and a final guard that replaces a non-finite number with `0`.
4. **Unbounded DOM and leaked listeners.** Per-slide rebuilds that append instead of replace, word spans, sticky notes, flags, floating words, Minutes rows, staplers and confetti-like nodes can grow past the 5x rule in a 1200-step fuzz; a raw `document.addEventListener` / `window.setTimeout` or an observer left connected fails the leak check; `document.elementFromPoint` and `getBoundingClientRect` polling must not create timers. Fix: fixed-size pools (5 Minutes rows, 3 notes, 2 flags, 12 staplers, 6 floaters, one dot), `replaceChildren` for the slide, everything through `api.on` / `api.setTimeout`, no observers (poll the root width), per-mount (not module-level) state. Test: `selftest --steps 1200` and read `nodes` growth plus `leaks`.
5. **The ring timing and the 7 1/2 invariants.** Off-by-one zone boundaries, `L` recomputed mid-slide, `cautious` applied twice, the typewriter finishing after the ring (the sentence is cut when the ring completes), the clap firing twice (once at p = 1.0 and again on a Fine click), the 7 1/2 insertion landing after slide 7 but not after 12, 17, 22, 27, 32, history/Back landing on 7 instead of 7 1/2, the staircase revealing a numbered slide, and the label arithmetic (`7 1/2` strings versus numbers) breaking the counter or the footers. Fix: compute `L` once at slide presentation and store it; the zone function `zoneOf(p)` is the only place with thresholds (0.70, 1.00, 1.35); a `clapDone` flag per 7 1/2 slide; the deck is generated into an array of slide objects (with `label` strings) up front per deck, with halves inserted by index rule, and `history[]` stores slide objects, not numbers; unit-test the generator mentally with: length, the labels after 7, 12, 17, 22, 27, 32, deck 2 labels (`Slide 1`, `1 1/2`, `1 1/2 1/2`, `2`...).

Also watch: laser dwell firing while the pointer is outside the root (`elementFromPoint` returning another element), prefers-reduced-motion paths that skip a transition class and leave a stale class on the slide, `api.setTitle` restored after the module is destroyed (use the managed timeout), and long-title overflow in the slide, the Minutes pad and the footer at 360px.

---

## 20. BUILD CHECKLIST

1. Lines first: arrays for every bag above (section 15), then achievements, then CSS, then the ring/advance/deck core, then P0 modes, then P1, then P2.
2. Budget: aim for about 1500 lines, hard cap 1800 (SPEC). The jokes are about 380 lines of text; the rest must be tight. Drop P2 first.
3. Verify with the tools in section 18.10. Both `lint.js` (zero errors) and `selftest.js` (PASS) are required; fix every warning that is not a deliberate `lint-ignore`.
4. Do not add or change engine files. Do not touch other modules.
5. Final state: the first joke at 0s, a new beat at least every 20s, an idle event at 7s, a spam event at 8 clicks in 3 seconds, a long-idle secret at 60s, and a not-ending that restarts as Deck 2 with Management's last line each deck: "Congratulations. You have completed the keynote. The keynote has not completed you."
