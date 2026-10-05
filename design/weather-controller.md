# DESIGN BRIEF: Weather Controller (`weather-controller`)

Final brief by the showrunner. It merges three writers' pitches (Clifford/ghost-marker pitch = the spine; the receipts/Weather-Events pitch; the Bryony/PIP pitch). A builder who reads only SPEC.md, VOICE.md and this file can build the whole module into `games/weather-controller.js` (single file, <= ~1800 lines, vanilla JS, no external assets).

Module registration values:

- id `weather-controller`, title `Weather Controller`, icon `🌦️`, category `game`, unlockCost `0`, tags `['skill','sky','control']`
- tagline: `Move the sliders. The sky has noted this and will be doing something else.`
- `api.setTitle('The Meteorological Command Console, Mk. 7 1/2')`
- CSS prefix `m-weather-controller-`, injected with `P.injectCSS(css, 'css-weather-controller')`
- Stat / flag / achievement prefix `weather-controller.` (the one intentionally shared flag is `sockSeen`; flags READ are `metGerald` and `dennis.promoted`, never written)
- Line categories: `m:weather-controller:<group>` (see section 17; read via `api.line` / `api.sayRandom`, plus a local `fill()` for module tokens)

---

## 0. Concept in four sentences

You are handed a gorgeous cream-and-mustard control console wired to a cheerful little village sky: four sliders, a temperature dial, a fog lever, one huge DO NOTHING button. Every control has a hollow **GHOST MARKER** showing what the weather is ACTUALLY doing, and the ghost politely steps away from wherever you put the real thumb. A TV presenter, **Clifford Isobar** (Chief of Weather, self-appointed), claims credit for everything the sky does (before, during and after), and physically grows with his ego until he bursts out of his TV frame; meanwhile the only thing that truly affects anything is a stream of named, incident-numbered **butterflies**, and nobody will admit it. After about 10 minutes you are handed a Certificate of Dominion over Weather (Provisional), the sliders reset to 7 1/2, Clifford is back in his tie saying "As I was saying", and the game continues as if nothing happened.

The joke engine is exactly one rule: **nothing ever moves toward what you asked for** (it moves toward the opposite, or toward its own Plan), **and a man on television says that was him.** Everything else is toys, bureaucracy and escalation around that rule.

---

## 1. Decisions: what was kept, merged, cut

KEPT (Clifford pitch, the spine): the Sky Window + console layout; ghost markers with the hop-away dodge and its 0.05 Meh; the alignment-event release skill and combo counter; the Agenda of named Plans (Sulk, Gentle Menace, Wardrobe Change...) and the truthful Diary strip; the temperature dial with word readout and laps; the fog lever that springs back and its 10 s hold secret; DO NOTHING; named butterflies as real buttons with net, jar, landing and occupying sliders, the 12 s unchallenged BIG EVENT; credit dispute and the Ego stages (mug, plaque, second monitor, bursts out); request form with stamp; Colin (Umbrella) is dry; Dennis; the Missing Sock; Gerald cameo; Causality Ledger SVG; pre-emptive credit with a 4-3-2-1 countdown; Weather's formal letters in a paper tray; Elsewhere (the one place the sliders work perfectly); the 7 1/2 sacred secret; the Listening idle secret; Whiplash spam; Gordon III; the Single Drop; the not-ending with certificate; the permanent callbacks.

KEPT (receipts pitch): the **PAPER TRAY** with stamped receipts that escalate (Noted, Noted with Concern, Noted and Filed Under Weather, Noted by a Committee of One, Noted, Noted. Please Stop.); the sticky note on SUN ("Do not touch. It is already doing its best.") with the sky starting as hail; Control Rating gag folded into the Obedience readout; Confidence fixed at 100%; Credit Taken passing 100% ("Credit now exceeds weather"); the 20 Butterfly Effect captions in chyron style; the sock-flying and Dennis lines; the Indoor Front rare event; the Restraining Cloud (DO NOTHING spam) with a fee and a nap; the "That was a coincidence" receipt; Season 2 slider renames; Weather's one-line all-caps sky bubble (NO. NOT TODAY.); the 3-minute idle postcard "Wish you were controlling"; Clifford's whisper "Please do not tell the weather".

KEPT (PIP pitch): the **"WHAT YOU ASKED FOR" picture-in-picture**: a small second canvas showing the sky your sliders describe, drawn by the same function as the real sky (the joke is literally two skies); pre-dated forecast timestamps in Clifford's chyron ("issued 4 seconds ago" ... "issued in 1987, in pencil"); Clifford forecasting then editing history ("History has been updated."); Cumulus Rex is CUT but his "we value your input and will be circling it" survives as a Weather letter; the sandwich, the butterfly strike and the UNDO WEATHER button are CUT.

CUT (weak or unbuildable in one file): Bryony and Fenella as separate presenters (Clifford is the only presenter; their best lines were moved onto him); the 36-event weather deck (replaced by 14 Plans plus the 20 butterfly effects); Intent Meter and its TOO HOPEFUL override (kept only as a denial reason); Perfect Zero secret; ASK NICELY field; Citizen Request cards (the Request Form does their job); the feTurbulence heatwave filter (replaced by a CSS wobble class); resize-rotates-the-map (replaced by one resize line); typing 'umbrella'; second jar; HR files; the dial doing real laps of physics; the "Elsewhere twice ends the game" rule; the right-hand Elsewhere tab-like view (Elsewhere is a scene mode, not a separate view).

Constraint notes: no real brands, no pop culture. Everything random goes through `api.rand/randInt/pick/shuffle/chance`; time through `api.now()`; all timers via `api.*`. Colin, Dennis, Pamela, Gordon and Pauline-style names are invented people; nobody is mocked.

---

## 2. Cast and voice

- **Clifford Isobar**, Chief of Weather (Self-Appointed). Smug, glowing, entirely sincere. Speaks through the in-module **chyron** (aria-live polite, the lower third of his TV) AND, throttled, through `api.say(text, {who:'Clifford Isobar', mood:'smug'|'proud'|'confused'|'panic'|'disappointed', priority:0})` (at most one api.say from him per 6 s; priority 1 for ego stages and the ending). His secret: he is frightened the sky works without him. It does.
- **Weather**. Never seen except as a tiny cumulus gentleman in a top hat (secret) and as the ghost markers. Speaks in (a) the all-caps sky bubble (NO.), (b) formal letters in the Tray, signed `Weather (Confident)`, (c) the Diary. Warm, courteous, completely unrelated.
- **Management** (`api.say` default who). Corporate narrator; also reads the rare quiet beats. Very occasionally admits it is nice here.
- **Butterfly Desk** (`api.say(text, {who:'Butterfly Desk'})`). A bureaucratic department of one clipboard. Treats every butterfly as an incident.
- **Colin (Umbrella)**. Walks the village on a loop. Always dry. Never speaks. Has a private cloud later. Gets exactly one drop.
- **Dennis (Plant)**. Window box. Thrives. Unimpressed.
- **Sandra from Compliance**. Never seen, cited. Reassigns labels, flags storms, countersigns nothing.
- **Gerald (VP of Spuds)**. Cameo (cloud shaped like a potato) only if `metGerald`.
- **The Missing Sock**. Hangs on the washing line from beat B3. A butterfly takes it. It returns. Sets flag `sockSeen`.
- **Gordon III**. Rare enormous butterfly with a monocle (1 in 40).
- **Tuesday**. Looming, never appears.

Module tokens (the engine only fills `{player} {meh} {count}`; this module fills its own with `fill()`, and must fill ALL before display): `{name}` butterfly name, `{inc}` incident number, `{slider}` slider display label, `{n}` count, `{a}` actual weather value, `{word}` dial word, `{pct}` credit percent, `{thing}` weather word, `{other}` second weather word, `{time}` diary time. `fill = (s, v) => s.replace(/\{(\w+)\}/g, (m, k) => (k in v ? String(v[k]) : ''))`. Never use `$` replacement strings; player text (the form Reason) is only ever shown through `textContent`.

---

## 3. Screen layout (works 360px to 1400px)

```
.m-weather-controller-app    root child, flex column, gap 10px, cream dotted-paper bg
  .m-weather-controller-top   row on >=720px: [ sky (flex 68%) | side column (flex 32%) ]; stacked on narrow
    .m-weather-controller-sky   position:relative; aspect-ratio 16/9; max-height 46vh; min-height 200px; overflow:hidden; 3px #2b2118 border; radius 14px; sticker shadow 4px 4px 0 #2b2118
        canvas.m-weather-controller-cv      the Sky Window: ALL scene art (sky gradient, sun face, parallax clouds, rain, snow, fog, lightning, hill, house, window box, Dennis, washing line, sock, Colin, effect sprites)
        .m-weather-controller-pip           bottom-left, 26% width, dotted frame, label "WHAT YOU ASKED FOR", contains canvas.m-weather-controller-pipcv (same draw fn, REQUESTED state, no town)
        .m-weather-controller-bubble        sky bubble, huge hand-lettered all-caps Weather statement (hidden unless speaking; textContent; aria-live off, the same text is also mirrored in the diary-free log)
        .m-weather-controller-note          lilac sticky note top-left: the current Plan name (e.g. "Gentle Menace"), paper-flip on change
        .m-weather-controller-fx            overlay for certificate curtain, stamps, flash tint, dim, queue sign, fog veil (pointer-events none except the certificate buttons)
    .m-weather-controller-side
        .m-weather-controller-tv        Clifford's TV (see 18) with chyron + sub-line + ego meter
        .m-weather-controller-diary     "Weather's Diary" strip (hidden until B3): <= 8 rows
        .m-weather-controller-ledger    Causality Ledger SVG (hidden until B5)
  .m-weather-controller-console    3 columns on >=720px (sliders | dial + lever | jar + buttons); one column on narrow
    col 1: 4 .m-weather-controller-row (SUN, RAIN, WIND, CLOUD): label, emoji, <input type=range min=0 max=15 step=0.5>, ghost marker, readout
    col 2: temperature dial (SVG) with word readout + laps; fog lever
    col 3: Butterfly Jar, DO NOTHING (giant, coral), REQUEST FORM button (hidden until B3), paper Tray (<= 4 slips)
    form: .m-weather-controller-form (inline, hidden attribute until opened): select Preferred Weather, select Urgency, text Reason, Submit, Cancel
  .m-weather-controller-led     LED strip footer: Confidence 100% | Obedience 0.0% | Butterflies at Large n | Credit Claimed n | Alignments n
  .m-weather-controller-flies   absolute layer over the whole app: butterfly <button>s (pointer-events none on the layer, auto on buttons), the net-swing sprite, Restraining Cloud
  .m-weather-controller-certificate  overlay (hidden) for the ending
```

- Design for <= ~60 static DOM nodes in the console (ghost markers, rows) and <= ~180 in the whole app; dynamic nodes are capped (butterflies 7, jar emoji 12, Tray slips 4, diary rows 8, receipts counted in Tray, countdown reuses the chyron).
- At <= 480px: TV shrinks to a 96px chip row above the sky (chyron one line, ego meter hidden), PIP becomes a 72px corner badge, sliders full width, thumbs 44px, the Diary is a collapsed `<details>`, Ledger hidden under a "Ledger" toggle, console columns stack, DO NOTHING is 120px.
- Console is wrapped in one element so it can be made `inert` for "on hold" and the Listening freeze.

---

## 4. Data model

### Channels
`CH = ['sun','rain','wind','cloud']` plus `temp` (dial) and `fog` (lever). All values are numbers in 0..15 (step 0.5 for sliders; the dial and lever are quantised to 0.5 when read). Start request values `R`: sun 15, rain 3, wind 5, cloud 9, temp 7.5, fog 0. (SUN begins at max so the first screenshot is the joke: SUN slider at 15 with a sticky note, the sky is grey hail, the PIP is blazing sun.)

State per channel: `R[ch]` (request, thumb), `A[ch]` (actual, ghost), `T[ch]` (target), `hopCooldown[ch]`, `ghostVel`.

### Actual weather model (implement exactly)
```
mirror(R)  = 15 - R
T[ch]      = lerp(Plan[ch], mirror(R[ch]), mirrorW)          // nothing ever pulls toward +R
mirrorW    = 0.60 before B4, 0.40 in B4..B6, 0.30 from B7    // contrary at first so the sky visibly does the opposite
rate k     = 0.55 /s (x1.6 from B5, "Weather Whim speeds up")
A += (T - A) * (1 - exp(-k*dt)) + wobble                      // wobble = 0.9*sin(t*0.9+phase_ch)*dt*... small amplitude so A drifts THROUGH the thumb sometimes
```
A is clamped 0..15 and never NaN (dt clamped 0.1, phases initialised).

**Plan** = the current entry of the Agenda: a pre-shuffled queue of the 14 Plans (section 5.2); each runs for its `dur` seconds (divide by 1.5 from B5). The Diary lists the current and next 2 Plans truthfully. **Plan picker rejects** any Plan that is within 1.5 units of `R` on 3 or more of the 4 slider channels (then takes the next in the queue), so the sky can never settle on what you asked for. `Obedience` readout is always `0.0%` except the alignment flash, Elsewhere and the Listening.

### Scene derived from A
Sun brightness `A.sun`, cloud cover `A.cloud`, rain intensity `A.rain` (snow when `A.temp <= 3` and rain > 1; hail look when `A.temp` 3..5 and rain > 9), wind `A.wind` (cloud drift speed, rain slant, flag/laundry/sock sway), fog `A.fog` (veil alpha), heat shimmer class when `A.temp >= 12`, frost class when `A.temp <= 2.5`. Lightning when `A.rain > 11 && A.cloud > 10` (2 s cooldown; reduced-motion = still tint).

### Stats, flags, saves
Stats (all via `api.stat.inc`): `weather-controller.sliderMoves` (settled slider releases), `.ghostHops`, `.alignments`, `.butterfliesCaught`, `.butterfliesIgnored`, `.disputes`, `.stamps`, `.doNothings`, `.fogHolds`, `.thrashes` (whiplash events), `.requests` (receipts printed), `.credits` (Clifford claims), `.letters`, `.elsewhere`, `.loops`, `.shoos`, `.singleDrops`, `.restraining`, `.listening`. `api.stat.max('weather-controller.bestCombo', n)`.

Flags: `sockSeen` = true from B3 (shared on purpose); `weather-controller.gordon3` = true after Gordon III's first visit; `weather-controller.loops` = completed loops (also stat).

`api.save` (module-scoped): `{loops, bestCombo, moves:{sun,rain,wind,cloud,dial,fog}, gordonSeen}`; on mount read with defaults, validate every number with `Number.isFinite`. If `loops >= 1` the welcome uses the `welcomeBack` line. Management may comment on the player's **favourite channel** (largest `moves`) once per session at about 4:00 (line `favourite`).

---

## 5. Controls (all must work with mouse, touch and keyboard)

### 5.1 Sliders (SUN, RAIN, WIND, CLOUD)
- Real `<input type=range min=0 max=15 step=0.5>` (free arrow keys, Home/End, PageUp/PageDown, touch drag). Arrow = native 0.5 step; the module adds: default arrow 1.0, Shift 0.5 (implement by handling `keydown` for ArrowLeft/Right/Up/Down on the input, `preventDefault`, set value manually and fire the same path as `input`). Tab through all controls in DOM order. Keys `1`..`4` focus a slider when no text field has focus.
- Custom styling: `appearance:none`; notched mint track with tick labels `0`, `7 1/2` (slightly larger tick with a tiny star), `15`; chunky coral thumb 30px (44px at `(pointer:coarse)`); emoji icon on the thumb track side (sun, rain cloud, tornado, cloud), `::-webkit-slider-thumb` and `::-moz-range-thumb` styled together.
- **Ghost marker** per row: an absolutely positioned child of the row, `left: calc(var(--tw)/2 + (100% - var(--tw)) * var(--g))` with `--g = A/15`, `--tw` = thumb width, `transition: left .25s` (disabled on hop; the hop uses a CSS class `m-weather-controller-hop` with squash/stretch keyframes ~280 ms). Hollow ring, dashed outline, tiny cloud face (inline SVG, 1 node group), opacity .85, `pointer-events:none`. Beneath it a one-line **readout** `"{Mood}, {Degree}"` (e.g. "Sulking, Moderately"): Mood = current Plan mood (Sulking / Smug / Busy / Wardrobe Change); Degree by A: <3 Barely, <6 Mildly, <9 Moderately, <12 Considerably, else Aggressively.
- **Settled release** (the thing that earns Meh, prints a receipt, triggers Weather's reply): see 5.5.

### 5.2 The 14 Plans (Agenda). `{name, mood, dur(s), sun, rain, wind, cloud, fog, temp}`
1. Sulk, Sulking, 14: sun 1, rain 4, wind 2, cloud 13, fog 5, temp 5  (**forced first Plan**)
2. Gentle Menace, Smug, 12: 4, 9, 6, 10, 3, 6
3. Wardrobe Change, Wardrobe Change, 8: 10, 0, 12, 3, 0, 13  (sky palette flips every 2 s during it)
4. Horizontal, Busy, 12: 5, 12, 15, 8, 0, 4
5. Pretend It Is March, Smug, 15: 6, 7, 11, 7, 2, 3
6. Hold The Rain Until Colin Looks Away, Busy, 18: 8, 14, 3, 11, 1, 7  (rain particles only spawn while Colin is off-screen)
7. Spirited Breeze With A Mortgage, Busy, 10: 7, 2, 13, 6, 0, 8
8. Fog, But Make It Personal, Sulking, 14: 2, 3, 0, 9, 15, 6
9. Moderate Sunshine With Notes, Smug, 12: 12, 1, 4, 5, 0, 11  (also the DO NOTHING plan)
10. Drizzle Of Opinion, Sulking, 11: 3, 6, 5, 12, 4, 5
11. Out Of Season, Wardrobe Change, 10: 4, 6, 8, 8, 3, 1  (snow in the village; "it snows out of season once a minute")
12. Sunbeam, Singular, Smug, 9: 9, 0, 1, 14, 0, 9  (one sunbeam through a full-cover cloud)
13. Mild Thursday, Busy, 10: 7, 3, 7, 7, 1, 7.5
14. Busy Until Tuesday, Busy, 20: 5, 5, 5, 5, 5, 5

The Diary shows `hh:mm - Plan Name.` rows with a fake clock that starts at 4:17 and advances by the Plan durations (real time, but always wrong with confidence, e.g. rows are separated by 16 "minutes"); the last row is always the line `Busy until Tuesday.` Players can read upcoming Plans and ride them, never beat them.

### 5.3 Ghost dodge
- When the player's **movement closes the gap** (an `input` event where `|A - Rnew| < 1.2` AND `|A - Rnew| < |A - Rold|`), the ghost hops 3..6 units away from the thumb (flip direction if it would leave 0..15), unless `hopCooldown[ch] > 0` (0.9 s). Ghost drifting into a still thumb does NOT trigger a hop. From beat B4 ("sliders become suggestions"): hovering the pointer within 1.2 units of the ghost's x on the row ALSO triggers a hop (pointermove on the row, same cooldown).
- A hop: set `A` to the new value instantly (the CSS class animates the visual), `api.sfx('boing')` (rate-limit 4/s), `ghostHops++`, `api.award(0.05)` capped at 1 Meh per rolling minute, confidence flicker `100.0%`.
- Every 8th hop in a minute Management says a `ghost` line; hop quota exhausted line once.
- The dial's ghost (a tick ring on the rim at `A.temp`) **never dodges** (a line explains it is too dizzy).

### 5.4 Alignment events (the micro skill)
- On a settled release: if `|A[ch] - R[ch]| < 0.4` -> **ALIGNMENT EVENT**: LED Obedience flashes `100.0%` (mint, bold) for 0.6 s, `api.sfx('ding')`, `api.confetti` small, `api.award(2)`, `alignments++`, `combo++` (`Alignments: n` readout), a Management `alignment` line, Clifford claims it. 0.6 s later Weather **reconsiders**: ghost hops away 5+ units, Obedience crashes to `0.0%`, `api.sfx('sad')`, a `reconsider` line.
- Release means: `pointerup`/`pointercancel` on a slider that had `pointerdown`; for keyboard, the `change` event if the last value change was not pointer driven, or Space/Enter pressed on a focused slider (the "Lock In" press, which does not change the value and is documented in the hint line).
- Combo decays: -1 per 20 s without an alignment ("Weather gets annoyed"); `bestCombo` saved.
- Technique: hold the thumb still, wait for the ghost to drift through (read the Diary to predict), release. Because mirror pull sends A to `15-R`, parking R near 7 1/2 raises the odds.
- B2 helper: if no alignment has happened by T=110 s, the director "gifts" one: the ghost of the last touched slider glides to within 0.2 of its thumb and holds 1.4 s (a hint line fires: "Something is approaching your slider. It is agreement. Please act normal.").
- After B7 an alignment receipt reads `THAT WAS A COINCIDENCE. THE WEATHER REGRETS THE LACK OF PROFESSIONALISM.`

### 5.5 Settled release: what always happens
`sliderMoves++`, `api.award(0.1)` (rate-limited to once per 600 ms), `moves[ch]++`, a **receipt** slip prints in the Tray (350 ms after the last input event on that control), Weather replies with the sky bubble in 30% of releases (max one per 12 s), a Management channel line (shuffle bag per channel, at most one Management reaction per 3 s), the sun/sky visibly goes somewhere unrelated, Clifford claims credit within 1.2 s (70%).
Special: the FIRST ever release when SUN R is >= 14: Clifford says line `brilliantCall` ("Brilliant call. I'd have done the same.").

### 5.6 Temperature dial
- Inline SVG dial: circle rim (mustard), 31 tick marks, a needle, a hollow ring on the rim for the ghost at `A.temp`. `role="slider" tabindex=0 aria-valuemin=0 aria-valuemax=15 aria-valuenow aria-valuetext={word}`. Pointer events with `setPointerCapture` wrapped in try/catch; drag in circles; angle from `atan2` of pointer vs dial centre; **unwrap** each move delta into (-180,180] and accumulate into an unbounded `theta` so it free-spins. `value = ((theta mod 360)+360)%360 / 360 * 15`, quantised to 0.5. `laps = floor(abs(theta)/360)` shown as `Laps: {n}, none of them useful` (changes the text at laps 1, 5, 14: "Laps: 14, none of them useful"). Arrow keys: +-1.0 (Shift 0.5), `T` focuses it.
- Readout is WORDS, not degrees: `DIAL_WORDS[floor(value/15*12)]` clamped to 0..11 = ['Frozen Solid','Brisk, By Law','Fresh','Cool-ish','Pleasantly','Mild','Moderately','Technically Warm','Warm, With Notes','Very','Soup','Soup (Concerned)']. (7.5 -> index 6, 'Moderately'.)
- The dial only affects the dial's channel `temp` in the weather model (same mirror rule) and the scene's heat/frost; it counts as a "move" for spam and `moves.dial`.

### 5.7 Fog lever
- Vertical track + draggable knob (also a real `<button>`-like element `role="slider" aria-orientation="vertical" tabindex=0`). Drag down (0..15 over the track length), springs back on release with a `whoosh` and a CSS bounce transition. Keyboard: holding Space or ArrowDown pulls it down (ignore `e.repeat`), releasing the key lets go; Esc releases.
- R.fog = lever depth. Mirror rule applies (pull the lever and the fog LEAVES; release it and the fog returns).
- Holding the lever below 60% depth for 10 s continuously triggers THE FOG HOLD secret (section 13.4). `fogHolds++` per qualifying hold.

### 5.8 DO NOTHING
- Giant round coral button with hand-lettered label, pressed state (translateY, shadow collapse). Press: the sky goes gorgeous immediately (force Plan 9 "Moderate Sunshine With Notes" for 12 s, Diary row added retroactively: `{time} - Moderate Sunshine With Notes (scheduled retroactively).`), Clifford credits "restraint", `doNothings++`, `api.award(0.1)`, `api.sfx('bloop')`.
- 3 presses in a row with no other control touched in between: "Management Approves Of Nothing" line, +0.5 Meh bonus, achievement `weather-controller.nothing` (reward 3).
- **Spam**: 12 presses in 5 s triggers the Restraining Cloud (13.2).

### 5.9 Request Form (button appears at B3)
- Inline form: `<select>` Preferred Weather (`Sunshine`, `Light Drizzle`, `Wind (Left Side Only)`, `Fog`, `Snow (In Season)`, `Hail (Ceremonial)`, `A Bit Of Both`, `Tuesday`), `<select>` Urgency (`1` `2` `3` `4` `5` `6` `7` `7 1/2`), Reason `<input type=text maxlength=60>` (optional), Submit, Cancel. Esc closes.
- Submit: a rubber STAMP slams onto the form (CSS scale/rotate drop, ink-bleed text-shadow, `api.sfx('stamp')`) reading `DENIED` plus a reason from the shuffle bag; **every 7th submit** reads `APPROVED (Retroactively, effective last Thursday.)`. If Reason is non-empty the denial quotes it back: `DENIED (Reason on file: "{text}". The reason has been placed next to the other reasons.)` via `textContent`. Costs nothing, `api.award(0.3)`, `stamps++`. Weather does something unrelated and Clifford claims the stamp. Request **#77** triggers the Indoor Front (13.5). The form must `preventDefault()` on submit.

### 5.10 Butterflies and the Net (the real cause of everything)
- Every 14..22 s (8..12 s from B7) one named butterfly spawns at a random screen edge of the Sky Window and wanders on a sinusoidal path (delta-time based, `speed = 70 + 6*min(T/60,10)` px/s base, wander amplitude 40 px, frequency 1.3 Hz). Caps by beat: B1 1, B2 2, B4 2 ("two at once"), B6 4, B7 6, never above 7.
- Each is `<button class="m-weather-controller-fly" aria-label="Butterfly {name}, incident {inc}">` containing a 🦋 whose wings flap via CSS `scaleX` keyframes (0.2<->1, ~12 Hz; reduced motion: static). Hit area >= 48px. In DOM order = order of arrival so Tab visits them; `N` swings the net at the nearest butterfly.
- **CLICK / TAP / N = swing the Net**: a 🥅 sprite sweeps a short arc (CSS animation 320 ms, `whoosh`), then if the butterfly is in flight it is **caught** (`butterfliesCaught++`, `api.award(1)`, `api.sfx('pop')`, jar gets a butterfly emoji (cap 12), the Butterfly Desk says a `caught` line, and ONE Butterfly Effect Event plays (shuffle bag of the 20 in section 12; the sky visibly plays it, the chyron prints its caption), Clifford claims it, the jar label updates `Jar: {n} butterflies, 1 alibi`).
- **UNCAUGHT**: at age ~6 s a butterfly flies to a free slider thumb and **LANDS**: that slider is **occupied** for the remaining time (until age 12 s): the input is `disabled`, label shows `OCCUPIED - on break`, the thumb wiggles. Clicking a landed butterfly **shoos** it (it flies off, no catch, no event, `shoos++`, 0.2 Meh, the slider is freed).
- At age 12 s an unchallenged butterfly triggers a **BIG EVENT** (thunderstorm with panic sun face, or a wind burst that sends the laundry and hats flying) that Clifford instantly claims; `butterfliesIgnored++`; it flies off. Both choices (catch or ignore) are equally pointless and equally entertaining.
- Rate limits: butterflies in flight/landed <= 7; net swings during **stress leave** (13.2) do nothing and show the pillow sprite.
- Rare: 1 in 40 spawns is **Gordon III** (12.4). From T >= 480 s exactly one special **Reginald** spawns for the Elsewhere beat (B8).

### 5.11 Credit Dispute (Clifford)
- Click/tap Clifford's TV, or press `C`. He blinks (CSS), the chyron shows `CONSIDERING...` 0.8 s, then he claims credit for the dispute (`disputes` line). `disputes++`, `api.award(0.2)`, Ego += 2. 10 disputes = achievement `weather-controller.co-author` (reward 5).
- **Ego meter** (a small bar under the chyron): `Ego` = claims + 2*disputes, floored by beat and capped by beat (see 11); stages at **20** (mug), **40** (plaque), **60** (second monitor), **80** (bursts out of the TV frame over the Sky Window, still in a tie). Clifford's scale = `1 + ego*0.0175` (CSS `scale`, max 2.4 at 80; clamp to the layout on narrow screens) plus accessory SVG layers. At the **ending** Ego resets to 0 ("As I was saying") but Credit Claimed carries over.

### 5.12 Keyboard and touch summary
Mouse: drag sliders / dial / lever, click butterflies, Clifford and buttons. Touch: same via pointer events (`touch-action:none` on dial, lever, and range inputs' tracks), 44px thumbs on coarse pointers, 48px butterflies. Keys: Tab everything; arrows adjust the focused slider/dial (default 1.0, Shift 0.5); `1`-`4` focus a slider; `T` dial; `N` net the nearest butterfly; `C` dispute credit; `R` open the Request Form (when unlocked); Space/Enter press focused buttons and "Lock In" on a focused slider; Esc releases the lever and closes the form. All global-ish keys are ignored while an `input`/`select`/`textarea` has focus and during modal states. `aria-live="polite"` on the chyron and a visually hidden live region mirroring Management-style captions that appear only in canvas (Plan name, effect captions).

---

## 6. LED strip, readouts and permanent numbers

`Confidence: 100%` NEVER dips. Variants: `100%` at start; `100.0%` after any ghost hop; `100% (+/-0%)` after 60 s with no alignment; `Confidence: yes` at the ending. `Obedience: 0.0%` always, except `100.0%` flashes (alignment 0.6 s, The Listening, Elsewhere `100% (holding)`). `Butterflies at Large: n` (live count). `Credit Claimed: {n}` until n >= 14 then `{n} ({pct}% of weather)` where `pct = round(n*7.5)`; at pct >= 1000 it reads `Credit now exceeds weather`. `Alignments: n` appears at B2 (decays, see 5.4). All text built with `textContent`, numbers via `Math.round`, never NaN.

---

## 7. Receipts and the Tray

Paper Tray = up to **4** slips (FIFO, oldest fades). A slip is a narrow cream strip with a perforated edge (CSS radial-gradient) that slides out with a small stamp animation. Used for receipts, Weather letters, postcards, Gordon's apology. Receipt format: `REQUEST #{n} RECEIVED. {Channel} {to}, previously {from}. Status: {status}` where `n` is zero-padded to 4 (`0041`), `{Channel}` is the slider's **icon channel name**, and status escalates with `requests`: 1-4 `Noted.`, 5-9 `Noted with Concern.`, 10-14 `Noted and Filed Under Weather.`, 15-24 `Noted by a Committee of One.`, 25-39 `Noted.`, 40+ `Noted. Please Stop.` Alternate templates in 17.8. Receipt #0001 is special at the ending (it prints again).

---

## 8. The chyron and Clifford

Chyron: `CLIFFORD ISOBAR, CHIEF OF WEATHER (SELF-APPOINTED)` as the permanent title bar, one line of speech beneath it, and a **sub-line** that cycles `Credit claimed today: {n}` and the pre-dated issue time: B0-B2 `Forecast issued 4 seconds ago`; B3 `Forecast issued yesterday`; B4 `Forecast issued last Tuesday`; B5 `Forecast issued in March (the other one)`; B6 `Forecast issued in 1987, in pencil`; B7 `Forecast issued before you opened this`. Mood faces (6, SVG swap): smug, proud, confused, mid-blink, panic, tired. A pointer-arm swings toward the sky on every claim (CSS rotate, reduced motion: none).

**Forecast mechanic (from B3):** every ~45 s Clifford shows `FORECAST: {text}` for 12 s (text = the OPPOSITE of what the Diary says is coming); when it expires the actual weather does the other thing, he edits the chyron to match with a strike-through animation and Management says `History has been updated.`

**Pre-emptive credit (from B6):** every ~35 s the chyron runs a literal countdown `IN 4... 3... 2... 1...` (`api.sfx('tick')` each second), predicting a weather word `{thing}`; at 0 the world plays a DIFFERENT effect (`{other}`), and he claims credit for both and for the surprise.

Credit claim rate: tier 1 (B0-B2) post-hoc "as I predicted"; tier 2 (B3-B5) causal "as I caused"; tier 3 (B6+) pre-emptive and for the dispute, for your Meh, for your leaving, and for the ending.

---

## 9. Special visual-comedy bits in the scene

- **Colin (Umbrella)**: 12-node stick figure with a red SVG umbrella walks the ground in a loop (about 40 s per pass, exits and re-enters). Rain/snow/hail particles are deflected around his umbrella radius (`dx` pushed outward); wind pauses (his cloak does not move) when he passes. Once between T=100 and T=150 s he **puts the umbrella down** for 2 s: all weather advancement and particles freeze (`S.freezeUntil`), then he picks it up and the weather resumes. From B7 a small private cloud (with a face) follows him 24 px above; it rains beside him, never on him.
- **Dennis (Plant)**: a small green SVG plant in the window box (appears B4); in a blizzard or storm he gets visibly perkier (scale 1.15) and a tiny `unimpressed` brow.
- **Washing line + Missing Sock**: a line across the front of the house; the 🧦 sock hangs on it from B3 (flaps with `A.wind`; when `A.wind >= 14` it lifts off and flies across the sky, a `STILL ON A JOURNEY` stamp flashes, then it returns at the next calm). Sets flag `sockSeen`.
- **Sun** has a face: smug (default), confused (cloud > 12), panic (storm). **Clouds** are grouped circles; big ones have faces. **Snow** falls in "out of season" bursts once a minute; the Sky Window frame frosts or shimmers with temperature.

---

## 10. State machine

`S.mode` is the single source of truth for what overrides the normal game: `play`, `listening`, `hold` (whiplash), `fogged`, `elsewhere`, `drop` (single drop), `cert` (certificate + ceremony), `reset`. Only `play` and `elsewhere` accept normal controls (Elsewhere has its own rules). Priority: `cert/reset` > `drop` > `hold` > `fogged` > `listening` > `elsewhere` > `play`. Entering a mode records `S.modeUntil` (virtual `api.now()` timestamp) and the director tick (not chained timeouts) leaves it. Every mode entry calls `clearOverlays()` first, which restores: console `inert` off, greyed classes off, fog veil off, queue sign off, title reset (`api.setTitle` to the normal title), pillow/net restored, Restraining Cloud removed, listening ghost snap released. `destroy()` also runs it.

---

## 11. Escalation timeline (the director)

Director clock `T` (seconds). It advances by `dt * TS` where `TS = api.selftest ? 60 : 1`, only while the tab is visible and `S.mode` is `play`/`elsewhere` (so idle, hold and ceremony do not eat beats). Run `directorTick()` on `api.setInterval(250)`. Use `at(sec, key, fn)` one-shots with a `fired` map reset per loop. Idle/Spam thresholds use REAL `api.now()` (not scaled).

| Beat | T (s) | Name | What arrives |
|---|---|---|---|
| B0 | 0 | Ignored With Confidence | Sky is hail. SUN thumb at 15, sticky note on SUN ("Do not touch. It is already doing its best."), PIP shows sunshine. Management welcome at t=0. Clifford at t=3 s credits the sun (it is hail). Plan 1 Sulk. Ghosts and dodge are the toy. Colin strolls across, perfectly dry. Receipts start on the first release. 12 s no-input nudge, 30 s second nudge. |
| B1 | 45 | The First Butterfly | **Pamela** (incident 3304) arrives with a Butterfly Desk caption; the Net unlocks (hint "Click the butterfly. Do not describe it as a solution."); jar appears; first catch plays the first Butterfly Effect (comma hail), Clifford says it was his hail. 14-22 s cadence after. Cap 1. |
| B2 | 90 | Alignment | Combo counter + Weather Mood tag appear. First accidental alignment introduced (gifted at 110 s if none). Cap 2 butterflies. Colin keeps being dry; between 100-150 s Colin lowers his umbrella (freeze). |
| B3 | 150 | Paperwork | REQUEST FORM button + stamp. Weather's Diary strip. Clifford's first **Forecast** (and the "History has been updated" edit). Missing Sock appears on the washing line (`sockSeen` flag). Sandra is first cited. |
| B4 | 210 | Sliders Become Suggestions | Labels: `SUN (Advisory)`, `RAIN (Aspirational)`, WIND stays WIND "out of tradition", CLOUD becomes `CLOUD (Pending)`. Ghosts also run when merely hovered. TWO butterflies at once; one lands and locks a slider. **Ego floor 20** (mug). Dennis (Plant) appears. mirrorW 0.40. |
| B5 | 270 | Causality Ledger | SVG flow diagram appears and fills node by node with each event (Butterfly -> Weather -> Clifford -> Credit -> Butterfly); it forms a loop and Clifford is credited for the loop. Weather Whim speeds up (k x1.6, Plan durations / 1.5). **Slider labels shuffle every 25 s** ("reassigned per Sandra"; labels move, emoji icons and mapping do not). Credit shows as a percent. **Ego floor 40** (plaque). |
| B6 | 330 | Pre-emptive Credit | Clifford claims credit BEFORE events with the literal 4-3-2-1 countdown. **Ego floor 60** (second monitor). Cap 4 butterflies. |
| B7 | 390 | Weather Writes Back | Weather's formal letters (stamped `REPLY ALL`, signed `Weather (Confident)`) land in the Tray every ~40 s. Colin gets a private cloud. **Ego floor 80**: Clifford **bursts out of the TV** over the Sky Window. Up to 6 butterflies; Gordon III possible. Gerald potato cloud if `metGerald`. mirrorW 0.30. Alignment receipts use the COINCIDENCE text. |
| B8 | 480 | Elsewhere | Reginald (a glowing butterfly) appears; when it lands on the CLOUD slider (auto at T=495) or is caught, **ELSEWHERE** mode starts (section 12.1). Lasts 55 s of director time. |
| B9 | end of Elsewhere | Back To Normal Like Nothing Happened | Elsewhere fades; sliders reset to 7.5; ghosts reappear; Clifford shrinks back into his tie and TV ("As I was saying."); Diary starts a new page. 15 s later the Certificate (section 14). |

**Ego bounds per beat** (so Clifford's growth follows the timeline even if the player spams disputes): `egoCap` = 19 before B4, 39 in B4, 59 in B5, 79 in B6, 100 from B7; `egoFloor` = 0, 20 (B4), 40 (B5), 60 (B6), 80 (B7). When a cap blocks a gain, a one-off Management line (`egoCap`) says Sandra capped it.

**Selftest/compatibility:** under `api.selftest` the director's `TS = 60` so the whole 10 minutes (and 1-2 loops) is exercised in ~10 s of virtual time; Elsewhere, ceremony and the single drop must therefore be robust to re-entry. The Management welcome and one `api.award` fire in the first 100 ms of every mount so a click-only fuzz still awards and says something.

---

## 12. Special actors and events

### 12.1 Elsewhere (B8)
Triggered as above. `S.mode = 'elsewhere'`: the canvas draws a quiet golden field with one scarecrow and a wooden fence (no town); the PIP is hidden; the console stays live; **here and only here the sliders work PERFECTLY and instantly**: `A = R` for every channel each frame, the ghost sits exactly on the thumb (solid ring, not hollow), LED Obedience reads `100% (holding)` and does not crash; the DO NOTHING button also works perfectly (and visibly does nothing). Clifford is silent for the first time (chyron: `[Clifford is watching. He has nothing to claim.]`, mood tired). No butterflies spawn. Colin appears at the fence and waves (canvas). Management speaks four times, sparsely. Slider releases pay 0.2 Meh (max 12/min). Sound: `bell` on arrival. `elsewhere++`, achievement `weather-controller.elsewhere` (reward 8) on first visit. Exit: fade (200 ms CSS), sliders `value=7.5` and `R=7.5`, ghosts hop to new positions, Clifford shrinks, `As I was saying.`

### 12.2 Whiplash (spam) and Restraining Cloud and Net stress leave: see 13.
### 12.3 Colin, Dennis, Sock: see 9.
### 12.4 Gordon III (1 in 40 butterflies, never during Elsewhere)
An enormous butterfly with a monocle (emoji 🦋 at 2.2x with a CSS monocle ring). He cannot be caught (the net swings; he tips his monocle graciously and Management says `Gordon III cannot be caught. He has a lawyer, and it is a cloud.`). He lands on the washing line, takes the 🧦, apologises to the player in a **letter in the Tray** (line `gordon3letter`), and flies off; Clifford immediately claims Gordon's work. The sock stays missing until the ceremony, where Gordon III returns it. Sets `weather-controller.gordon3`, achievement `weather-controller.gordon3` (secret, reward 10). If Gordon III never came, the ceremony gives the sock a small salute instead.

### 12.5 The Single Drop (rare)
Once per ~12 minutes of play time (rolled at each 60 s of director time after T=180 with chance 1/12, never twice per session) OR in the ceremony: a single raindrop falls on Colin. `S.mode='drop'` for 7.5 s: sliders `inert`, a `bell` note, Colin looks up and smiles (canvas), **Management and Clifford say nothing at all for 6 seconds** (suppress api.say and chyron updates), then Management: `Please continue.` Achievement `weather-controller.single-drop` (secret, reward 7.5). `singleDrops++`.

### 12.6 Butterfly Effect Events (a shuffle bag of 20; one per catch). Captions print in the chyron AND as a Butterfly Desk say. `sprite` tells the builder what to draw (all small canvas routines with a 4-9 s lifetime, max 3 concurrent):

1. `commaHail` | A butterfly in the jar has caused hail shaped like commas. Experts are pausing. | comma-shaped hail (draw `,` glyphs falling)
2. `teacup` | A hurricane has formed inside Colin's teacup. Colin is not holding a teacup. It is nearby. | spinning swirl in a small cup near Colin
3. `clipboard` | A single cloud has formed in the shape of a clipboard. It is on its way to a meeting. | one cloud drawn as a clipboard
4. `pigeon` | Localised drizzle over one pigeon. The pigeon has been informed. | tiny rain cone over a 🐦 emoji
5. `flag` | A butterfly landed on the flag. The flag now has opinions. | flag wobbles, a `?` bubble
6. `sunlap` | The sun has taken a lap. It would like you to know it is fit. | sun orbits the sky once
7. `beigeRainbow` | A rainbow has appeared. It is beige. It is not for you, and not not for you. | arc in beige/tan
8. `laundry` | A tornado of laundry has formed over the washing line. Nobody has lost anything. Everyone has lost something. | spinning 👕 emoji funnel
9. `upSnow` | Snow is falling up. Clifford calls this forward-looking precipitation. | snow particles drift upward
10. `noonMoon` | The moon has appeared at noon. It has a doctor's note. | moon disc in the daytime sky
11. `elevenDrops` | Rain has arrived in a quantity of exactly 11 drops. It was counted twice. | exactly 11 falling drops
12. `shades` | Sunshine, now with sunglasses. The sun has declined to say why. | sun face wears shades
13. `lawyerCloud` | A cloud has appeared that is another cloud's lawyer. Terms are being discussed. | two clouds, one with a tie
14. `fogFlag` | A fog bank has formed. It has a flag on it. The flag is claiming the fog. | fog patch with a flag
15. `rockStorm` | A storm has formed over the third rock on the hill. Not the second. The second has been asked to relax. | dark cloud + lightning over a rock
16. `snowflake` | A snowflake has landed on the sun and stayed. Neither has said anything. | one flake on the sun disc
17. `wobble` | The whole sky has gone wobbly. Weather says it is "warming up." It has not said for what. | CSS wobble class on the canvas for 5 s (reduced-motion: tint)
18. `hat` | A hat has left a head in a completely different county. The wind has sent a postcard. | 🎩 emoji sails across the sky
19. `cloudSwap` | A cloud has resigned. It has been replaced by a smaller cloud. The smaller cloud says it is the same cloud. | a cloud shrinks and swaps
20. `sunriseAgain` | The sun has risen a second time, in case you missed it. You did not miss it. | sun dips and rises

If the caption contains Colin, Colin glances up and stays dry.

---

## 13. Secrets, rare events, idle and spam

### 13.1 LONG IDLE: The Listening (45 s of NO input; inputs include `pointerdown`, `pointermove`, `keydown`, `wheel`, `input`)
`S.mode='listening'` for 20 s. Weather realises you stopped and, to impress you, **perfectly matches your last slider values**: ghosts glide to sit exactly on the thumbs, Obedience reads `100.0%` and HOLDS, Clifford has nothing to claim and sits in confused silence, then claims the silence (`And now, silence. I take credit for that too.` after 10 s). The moment you touch anything: Weather (sky bubble) `I WAS LISTENING THE WHOLE TIME.`, the ghosts bolt (hop away), Obedience crashes to `0.0%`. Achievement `weather-controller.listening` (secret, reward 10). Further idle: at 2:00 idle Clifford whispers the `whisper` lines; at 3:00 idle a **postcard** slip lands in the Tray: `Wish you were controlling.` / `Weather (Confident)`. Nothing is added to the DOM beyond Tray slips (cap 4).

### 13.2 SPAM
- **Whiplash**: 20+ slider/dial `input` events in 5 s (ring buffer, prune to 5 s) -> **WEATHER WHIPLASH**: for 2 s the scene flashes sun, rain, snow, fog, thunder (override palette per 400 ms; reduced motion: a single still tint), Clifford appears in a **neck brace** (white collar rect on his SVG, line `neckbrace`), the Request Form (if present) auto-fills `DENIED (Reason: Please stop.)`, and you are **put on hold for 8 s**: console `inert`, controls greyed, a sign `ON HOLD` with a queue number that ticks `7 1/2` down toward `7` (`7.5, 7.4 ... 7.0` over 8 s), hold music is rain (`api.sfx('bloop')` every 0.7 s), then `You are now caller number 7.` `thrashes++`, achievement `weather-controller.whiplash` (secret, reward 7.5).
- **Net spam**: 15 net swings in 5 s -> the net goes on **stress leave for 15 s**: the swing sprite becomes a tiny pillow (💤 chip with aria-label "tiny pillow"), swings do nothing, butterflies keep landing. Line `netleave`.
- **DO NOTHING spam**: 12 presses in 5 s -> the **Restraining Cloud**: a small grey, politely inflated cloud hovers ~3 button-widths from the DO NOTHING button (inside `.m-weather-controller-flies`), a 0.5 Meh fee (`api.award(-0.5)`), and a 5 s **nap** (fade to dusk, a snoring 💤 cloud, controls still usable). `restraining++`, achievement `weather-controller.restraining` (secret, reward 5).
- **Form spam**: submitting 10 times in 8 s: the stamp is `DENIED (Reason: Please stop.)` every time and Management files a fee line; no mode change.
- Generic spam at any control: Management line `spam` once per 20 s.

### 13.3 THE SACRED SEVEN-AND-A-HALF
Set the four sliders AND the dial to exactly 7.5 at once (checked ONLY on user input events, never programmatic; only after at least 3 settled releases this loop; 30 s cooldown). The sky parts, **Weather appears as a tiny gentleman in a top hat made of cumulus** who tips his cloud, the ghosts all sit politely on the thumbs, the screen text reads `A Perfectly Pleasant Day, Technically.`, music-box `tada`, **+7.5 Meh**, 4 s of true calm (mode `listening`-style freeze of the model at A=R for 4 s, console not inert), then he leaves ("in a very good hat"). Achievement `weather-controller.seven-and-a-half` (secret, reward 7.5).

### 13.4 THE FOG HOLD
Hold the Fog lever down (below 60%) for 10 s: `S.mode='fogged'` 8 s. The console fogs over to a nearly opaque white veil with only Management's voice and Clifford's disembodied voice (`This is my best work.`); you can only find controls by Tab (the veil is `pointer-events:none`, the controls remain focusable; focus rings stay visible). After 8 s the fog lifts and the module title bar (via `api.setTitle`) reads `Fog Controller` for 3 s, then silently corrects itself back with no comment (a Management line is allowed only AFTER, "No one saw anything."). `fogHolds++`, achievement `weather-controller.fog` (secret, reward 7.5).

### 13.5 The Indoor Front (rare)
1 in 77 chance on any butterfly catch, or guaranteed on Request #77: for 12 s the weather happens inside the console: rain drops overlay the console (CSS), the Tray slips get a blur, sliders tilt 2 degrees, and each slider **snaps to a random value** on release. Management `indoor` line. Awards 1 Meh. Auto-clears (mode-free; timestamp expiry).

### 13.6 Gordon III, Single Drop, Elsewhere: see 12.

### 13.7 Reaction hooks (small and cheap)
- Tab hidden then shown: Management `returned` line (once per 30 s).
- Window resize (5+ resizes in 3 s): `The weather has been reflowed. It is not mad about it.`
- Holding every control still for 25 s while Clifford is claiming: Clifford claims the stillness.
- `metGerald`: B7 potato cloud and Gerald's one line (17.12). `dennis.promoted` read: if true, Dennis wears a tiny lanyard (draw a rect) and Management says `Dennis (Plant), already promoted, was unavailable for comment.`

---

## 14. The not-ending (the Ceremony that is not an ending)

At the end of B9 (+15 s) or sooner if `T >= 585`: `S.mode='cert'`. The console is `inert`; a full-module **certificate** slides in: `CERTIFICATE OF DOMINION OVER WEATHER (PROVISIONAL)`. Beneath it: `{player}` `has controlled the weather 0 times, observed it {n} times, and been observed by it {n} times, which is considered a draw.` (`n` = total input events this loop + 7, via `api.fmt`; both numbers identical), with a faux signature `Weather (Confident)` and the line `Countersignature required from Weather. Weather is out.`

A **7 1/2-second ceremony** plays: confetti (`api.confetti` x2), music-box `tada`, the tiny cumulus gentleman tips his cloud, **Colin gets his single raindrop** (same beat as 12.5 but compressed: no 6 s silence here, only a one-second hush), **Gordon III returns the sock** (if he took it; else the sock is saluted), Clifford says the `endingClifford` line, Management reads the `endingMgmt` line. `achievement weather-controller.ceremony` (reward 10), `loops++`, save.

Then the certificate **slides off screen**. Sliders `R`/`value` reset to 7.5 (and the dial to 7.5), the ghosts hop back to NEW positions, the sky is the same sunny village as minute zero (but the sock is back on the line, Gordon is a permanent callback, one drop remains on Colin as a tiny damp spot), Clifford is back in his tie and TV frame saying **"As I was saying."** and the first line of the module is spoken again with one word changed:

`Welcome to the Meteorological Command Console, Mk. 7 1/2. Please set the weather to your preference. The weather will take it from there, and then take it elsewhere. Again.`

A small button **`Season 2: Same Weather`** appears and does exactly what you would expect: it renames the sliders (SUN becomes `Mood of the Sun`, RAIN `Opinion of the Ground`, WIND `Hat Policy`, CLOUD `Doubt`), awards 2 Meh, and Management says the `season2` line. The first butterfly of the new loop is Pamela, "exactly where she was" (line `pamelaAgain`). Receipt #0001 prints again with `Noted.` (callback). The loop restarts the director at T=0 with `fired` cleared; loop counters and Credit Claimed carry forward; Ego resets; Obedience throughout remains 0.0%. On later loops use the `loop2` variants of the Management certificate line (they are now "provisional in bulk"). Meh payouts and stats continue.

---

## 15. Economy (all tiny; nothing matters)

| Event | Meh |
|---|---|
| Settled slider release | 0.1 (max once per 600 ms) |
| Ghost hop | 0.05 (cap 1 per rolling minute) |
| Alignment event | 2 |
| Butterfly caught | 1 |
| Butterfly shooed | 0.2 |
| Credit dispute | 0.2 |
| DO NOTHING (single) | 0.1 |
| DO NOTHING x3 in a row | +0.5 bonus |
| Request stamp | 0.3 |
| Elsewhere slider release | 0.2 (max 12 per minute) |
| Indoor Front | 1 |
| Season 2 button | 2 |
| Sacred 7 1/2 | 7.5 |
| Listening | 3 |
| Whiplash fee refund / Restraining fee | -0.5 (fee) |
| Ceremony | 5 |

---

## 16. Achievements (declare all with `P.addAchievements`; ids prefixed `weather-controller.`; >= 6, >= 2 secret)

| id | name | desc | icon | secret | reward |
|---|---|---|---|---|---|
| `weather-controller.first-move` | Supreme Archon of Atmospheric Intent | Move a slider. The sky has noted that you are the sort of person who moves sliders. | 🎚️ | no | 2 |
| `weather-controller.first-catch` | Grand Lepidopterist-in-Chief of the Realm | Catch your first butterfly. It was Pamela. Pamela had a family and a Tuesday. | 🦋 | no | 3 |
| `weather-controller.alignment` | Obeyed Once, Briefly, By Accident, Per Recorded Minutes | Trigger an Alignment Event: release a slider exactly where Weather happened to be. 0.6 seconds of dominion, no refunds. | 🎯 | no | 4 |
| `weather-controller.co-author` | Co-Author of Clifford Isobar's Entire Life's Work | Dispute Clifford's credit 10 times. He has put you down as a contributing editor. | 📺 | no | 5 |
| `weather-controller.nothing` | Management Approves Of Nothing | Press DO NOTHING three times in a row. The certificate is blank, which is the point. | 🔴 | no | 3 |
| `weather-controller.elsewhere` | Resident of Elsewhere (Visiting) | Reach Elsewhere, where the sliders work and nobody is home. | 🌾 | no | 8 |
| `weather-controller.ceremony` | Weather Controller of the Year (Provisional) | Receive the Certificate of Dominion. Countersignature pending. Weather is out. | 🏆 | no | 10 |
| `weather-controller.seven-and-a-half` | Warden of the Perfect Seven-and-a-Half | SECRET: Put every slider and the dial at exactly 7.5 at the same time. The weather tipped its cloud at you. | 🎩 | yes | 7.5 |
| `weather-controller.listening` | Patron Saint of the Unwatched Sky | SECRET: Do nothing for 45 seconds and discover that Weather was perfectly well-behaved the whole time you were not looking. | 🌤️ | yes | 10 |
| `weather-controller.whiplash` | Whiplash Laureate and Keeper of the Neck Brace | SECRET: Spam the controls until Weather puts you on hold. Clifford was issued a brace and credit; you were issued a queue number. | ⛈️ | yes | 7.5 |
| `weather-controller.fog` | Chief Fog Controller (Briefly Corrected) | SECRET: Hold the Fog lever for 10 seconds. The title bar made a mistake and fixed it. | 🌫️ | yes | 7.5 |
| `weather-controller.gordon3` | Keeper of Gordon III's Apology | SECRET: Meet Gordon III. He is terribly sorry about the weather. Do not tell Clifford. | 🧦 | yes | 10 |
| `weather-controller.single-drop` | Witness to One Drop, Colin's Counsel | SECRET: Be present when it rained on Colin. It was the best day of his life. | ☂️ | yes | 7.5 |
| `weather-controller.restraining` | Cloudy With A Chance Of Restraining Order | SECRET: Press DO NOTHING until the weather asks for space, and a snack. | 🌥️ | yes | 5 |

(All icons are Emoji 12 or older. Run `node tools/lint.js games/weather-controller.js` to confirm.)

---

## 17. Lines (verbatim; this is the script). Each bullet is one line. Add every group with `P.addLines('m:weather-controller:<group>', [...])` (or keep in module arrays with `bag()`), spoken by the named `who`. `[mood]` is the `api.say` mood. Tokens in braces are filled by `fill()`. Total: 200+ lines.

### 17.1 Opening and nudges (group `open`)
- [neutral] (Management, at mount) Welcome to the Meteorological Command Console, Mk. 7 1/2. Please set the weather to your preference. The weather will take it from there, and then take it somewhere else.
- [neutral] (Management, +1.5 s) The sky is currently hail. This is not a problem. This is a baseline.
- [smug] (Clifford, +3 s) Good morning. I have set today's weather. You may adjust it. I will take credit for the adjustments.
- [neutral] (Management, +6 s) Your predecessor has moved on to a better climate, we are told.
- [confused] (nudge, 12 s no input) Management suggests moving a slider. Management cannot say why. Management is not the weather.
- [neutral] (nudge, 30 s no input) The sun slider has a sticky note on it. The sticky note is not Management's. Management respects the sticky note.
- [neutral] (welcomeBack, loops >= 1 in save) Welcome back to the Command Console. The weather did not miss you, and has put that in writing.
- UI strings: sticky note `Do not touch. It is already doing its best.`; hint line `Move a slider. Chase the ring. The ring is the weather. The weather is elsewhere.`; Lock In hint `Press Space on a slider to lock it in.`

### 17.2 First reactions and the baseline (group `first`)
- [smug] (Clifford, first SUN release at >= 14, `brilliantCall`) Brilliant call. I'd have done the same.
- [neutral] (Management) Your input has been received, logged, and politely ignored by the sky. This is considered a successful interaction.
- [neutral] Obedience is currently 0.0%. Management considers this a strong baseline.
- [neutral] Your Obedience score has risen from 0.0% to 0.0%. Look at that trajectory.
- [neutral] The ghost marker shows what the weather is actually doing. It does not care where you are.

### 17.3 Channel reactions (Management; shuffle bag per channel; one per 3 s max)
group `sun`:
- [confused] You have raised the sun. The sun has noted this and lowered itself, with confidence.
- [neutral] Sun requested. The sun has asked who is asking.
- [neutral] The sun has been lowered by request. Nobody requested that. It is still a request.
group `rain`:
- [neutral] Rain has been requested. A small cloud has taken it personally.
- [neutral] You have asked for rain. The weather has issued a statement: "Rain is for people who ask politely."
- [neutral] Rain set. The ground has been told. The ground has not replied.
group `wind`:
- [neutral] You have moved the Wind slider. Somewhere, a hat has accepted its fate.
- [neutral] Wind requested at {n} out of 15. Wind is at {a} and has no comment.
- [neutral] You raised the wind. A sock somewhere has begun its journey.
group `cloud`:
- [neutral] Cloud has been adjusted. The clouds have formed a committee to discuss it.
- [neutral] You requested more cloud. The sky requested less you.
- [neutral] Cloud cover set. The cover has been lifted by an unknown party.
group `dial`:
- [neutral] Temperature set to "{word}." The thermometer has asked for a second opinion.
- [neutral] You turned the dial. The dial turned back, slightly, out of loyalty to the dial.
- [neutral] Laps: {n}. None of them were useful. All of them were noted.
group `lever`:
- [neutral] You pulled the lever. Fog has left. You released the lever. Fog has returned, holding a cup.
- [neutral] The fog has been pulled. It has returned. It has brought friends.
- [neutral] Fog lever released. The lever has gone back to where levers go.
group `ghost` (rare, ghost-hop streaks):
- [neutral] The weather has stepped away from your slider. This is not personal. It is directional.
- [neutral] You are chasing the weather. The weather is running a short distance, then looking back.
- [neutral] Management notes the marker has moved away from you. Management would like to say it is mutual.
- [neutral] The dial's ghost has declined to dodge. It is too dizzy. It is also on the weather's side.
- [neutral] Ghost hop quota for this minute has been reached. The ghosts are resting. They will resume ignoring you shortly.
- [neutral] Please do not shout at the clouds. They are salaried.

### 17.4 Alignment (group `align`) and reconsidering (group `reconsider`)
align:
- [proud] ALIGNMENT EVENT: Weather and your slider agreed for 0.4 seconds. Please do not make eye contact.
- [proud] Obedience at 100.0% for one-third of a second. Management is moved. Management is also unable to stay moved.
- [proud] You have been obeyed. It was an accident. It is on record as an accident.
- [proud] Weather and Valued Employee agree. A record has been made. It has been put in a drawer, then a different drawer.
- [neutral] Alignments: {n}. Weather considers each one a coincidence and a misunderstanding, in that order.
- [confused] Something has happened. It was brief. It involved agreement. Please treat it as weather.
- [neutral] (combo >= 3) Combo is not a policy term. Management is using it anyway.
- [confused] (B2 gift hint) Something is approaching your slider. It is agreement. Please act normal.
reconsider:
- [disappointed] Weather has reconsidered. It had it right the first time, which was wrong.
- [disappointed] Obedience is 0.0% again. It has been 0.0% the whole time, apart from the bit.
- [disappointed] The weather left the room. It says it was never there.
- [disappointed] Weather has withdrawn its agreement, citing "new weather."
- [neutral] The ghost has bolted. Management did not see a ghost. Management saw a procedure.
Clifford on alignment:
- [smug] As I arranged. You were merely there.
- [proud] I'd like to thank the slider for being in the right place, under my direction.
Receipt text after B7: `THAT WAS A COINCIDENCE. THE WEATHER REGRETS THE LACK OF PROFESSIONALISM.`

### 17.5 Clifford claims credit (Clifford; group `credit1` post-hoc B0-B2, `credit2` causal B3-B5, `credit3` pre-emptive B6+)
credit1:
- [smug] As I predicted, a moment ago, in my head.
- [smug] Rain this afternoon, as forecast by me, just now.
- [smug] Many viewers ask how I arranged the drizzle. I did it with my eyebrows.
- [smug] I'd like to thank the high-pressure system for its support, and for working under me.
- [proud] Credit for that rainbow goes to me, some light, and the water. In that order.
- [smug] Sunshine tomorrow. I have already taken credit, so please don't.
credit2:
- [smug] As I caused, and as I am now explaining.
- [smug] That wasn't a tornado. It was a spirited breeze with a mortgage. Mine.
- [proud] Some say one man cannot control the weather. Those people are not on television.
- [smug] Viewers at home, that was me. Viewers at work, also me.
- [confused] I'm told the clouds moved themselves. I'm told many things. I did that.
- [smug] I called this one. I called it three seconds after it happened, which counts.
- [proud] I would like to thank myself for the wind. It has been a team effort, and I am the team.
credit3 (pre-emptive; `{thing}` `{other}` filled from the countdown):
- [smug] In four seconds it will {thing}, and I will have meant it.
- [smug] It has done something else. I meant that as well, and I would like the surprise credited separately.
- [proud] Forecast: whatever happens next. Confidence: total. Credit: already filed.
- [smug] I forecast {thing}. The sky delivered {other}. I contain both.
- [smug] That was not what I said. It is what I will have said. Please check the tape, which I am editing.
- [proud] Your Meh is mine in spirit. I have taken credit for the fact that you are here.
- [proud] Thank you for leaving. I arranged that.
Clifford on people and things:
- [smug] Colin is dry because I allowed it. Colin has not thanked me. Colin will.
- [proud] Credit for the butterfly goes to me. The butterfly has not been told.
- [smug] I take credit for Dennis. Dennis has not responded. That is how a plant says thank you.
Chyron sub-line templates: `Credit claimed today: {n}`

### 17.6 Disputes and Ego (Clifford; group `dispute`, `ego`)
dispute:
- [smug] Interesting point. I'll take credit for the disagreement.
- [smug] Noted. Your dispute has been filed under things I started.
- [confused] I considered your objection for a long time, and found it was mine.
- [proud] A viewer disputes my credit. Another triumph of the format.
- [smug] Disputed. Resolved. Credited. All three were me.
- [proud] A dispute is just an endorsement with extra steps. Thank you.
- [tired] I'm told I'm not the weather. I'm told that every Tuesday.
- [proud] (disputes >= 10) You have disputed me {n} times. I have put you down as a contributing editor.
ego:
- [smug] (Ego 20) Clifford has acquired a mug. It says "I DID THAT". Nobody gave it to him.
- [proud] (Ego 40) A plaque has appeared. It reads "Clifford Isobar, Chief of Weather." The plaque is aware it is not a document.
- [proud] (Ego 60, Clifford) I have grown. Not in importance. Fine, in importance.
- [confused] (Ego 60, Management) Clifford has a second monitor. It is showing the first monitor, taking credit.
- [panic] (Ego 80) Clifford has left the frame. He is in the sky. He is still in a tie.
- [neutral] (egoCap) The Ego Meter has been capped by Sandra at {n} for this quarter. Clifford has appealed. Clifford won the appeal. Clifford was the appellant.
- [smug] (after ending) As I was saying.

### 17.7 Weather speaks (group `skybubble`, all caps, appears in the sky bubble, max one per 12 s)
- NO.
- NOT TODAY.
- I HEARD YOU. I CHOSE THIS.
- THANK YOU FOR YOUR INPUT. I HAVE BEEN WEATHER FOR A LONG TIME.
- REQUEST RECEIVED. PROCEEDING WITH SOMETHING ELSE.
- NOTED. FILED UNDER NOTED.
- I HAVE OTHER PLANS. THEY ARE LISTED UNDER PLANS.
- WEATHER CONFIDENCE: 100%. WEATHER ACCURACY: NOT APPLICABLE.
- YOUR INPUT HAS BEEN PLACED NEXT TO THE OTHER INPUT.
- I WILL SEE YOU IN THE FALL SEASON OF SEVEN AND A HALF.
- I WAS LISTENING THE WHOLE TIME. (only after the Listening)

### 17.8 Receipts (group `receipt`) and the status ladder
Statuses (by count, 7.1 above): `Noted.` / `Noted with Concern.` / `Noted and Filed Under Weather.` / `Noted by a Committee of One.` / `Noted.` / `Noted. Please Stop.`
Alternate receipt templates (shuffle bag with the main one):
- REQUEST #{n} RECEIVED. You asked for less {thing}. {thing} has asked for a second opinion. Status: {status}
- REQUEST #{n}: {Channel} {to}. The weather has been informed and is considering its options. Status: {status}
- REQUEST #{n} RECEIVED. Please allow 7 1/2 working skies for processing. Status: {status}
Postcard: `Wish you were controlling.` (signed `Weather (Confident)`)
Management on receipts (rare): [neutral] Your request has been stamped, sealed and gently ignored. [neutral] Request {n} is in the tray labelled "Later".

### 17.9 Butterfly Desk (group `bfly`, who: 'Butterfly Desk')
arrival:
- [neutral] (first, Pamela) Pamela has entered the sky. Incident 3304. Everything that happens next will be her fault, and Clifford's.
- [neutral] {name} has entered the sky. Incident {inc}. {name} is aware of nothing and is proceeding.
- [neutral] Incident {inc}. {name} is in the air and has not been briefed.
- [neutral] {name} has arrived. The weather has been told. The weather has acted like it was not.
- [neutral] (net unlock) A net has been unlocked. It is a net. Please do not describe it as a solution.
landed:
- [neutral] {name} has landed on the {slider} slider. {name} is unaware this is a slider. {name} is unaware of most things, and still lands.
- [neutral] {name} has landed on {slider}. The slider is on break. It has been issued a lanyard.
- [neutral] (Management) A butterfly has sat on the Wind slider for 6 seconds. This is being classed as wind management.
- UI strings: label `OCCUPIED - on break`; shoo hint `Click to shoo.`
caught:
- [neutral] {name} has been caught. {name} denies everything, in butterfly.
- [neutral] {name} is in the jar. The jar has a view. {name} has asked for a different view.
- [neutral] Jar contents: {n} butterflies, 1 alibi.
- [neutral] {name} was caught, then caught again, by the same net. The net is exhausted.
- [neutral] Incident {inc}. {name} flapped near a hat. There were consequences, mostly to the hat.
- UI: `Jar: {n} butterflies, 1 alibi`
ignored (BIG EVENT):
- [panic] (storm) {name} was left unchallenged for 12 seconds. This has been classed as an invitation. A thunderstorm has occurred.
- [panic] (wind burst) A burst of wind has crossed the village. Every hat has been invited to leave. Several accepted.
- [neutral] The effect occurred 40 seconds before the butterfly flapped. Causality has been asked to wait outside.
- [proud] (Clifford after big event) A thunderstorm. Not requested. Mine. Retroactively, in capitals.
shoo:
- [neutral] {name} has been shooed. {name} has gone to tell the others.
- [neutral] The butterfly has left the slider. The slider has asked for a moment.
Names pool (pick in a shuffle bag; first ever is `Pamela`; Reginald is reserved for B8; Gordon III is the rare one): Pamela, Gordon, Gordon II, Brenda, Little Gordon, Philippa, Gordon (No Relation), Susan, Kevin, Reginald. Incident numbers start at 3304 and increase by `randInt(1, 9)`.
net spam: see 17.15.

### 17.10 Colin, Dennis, Sock, Sandra, Gerald (groups `colin`, `cast`)
colin:
- [neutral] Colin (Umbrella) remains dry. The sky has made an exception for Colin. No one asked Colin.
- [neutral] Colin has put his umbrella down. The weather paused. Colin picked it back up. The weather resumed.
- [neutral] Colin has acquired a private cloud. It is not raining on Colin. It is raining near Colin, in his honour.
- [neutral] Colin walks past again. He is still dry. This is the fourth time and the sky does not seem tired.
- [neutral] Colin has appeared at the fence. He waves. There is nobody to wave at. He waves at you.
- [neutral] Colin is dry in a blizzard. Colin has not noticed the blizzard. The blizzard has noticed Colin.
cast:
- [neutral] (B4) Dennis (Plant) has appeared in the window box. He is thriving under all conditions. He did not request any weather.
- [neutral] (storm) Dennis (Plant) is thriving in a blizzard that Weather has directed at him. Dennis is unimpressed by yours.
- [neutral] (dennis.promoted) Dennis (Plant), already promoted, was unavailable for comment.
- [neutral] (B3) A sock is on the washing line. It is not part of a pair. It is drying, presumably after a journey.
- [neutral] (wind >= 14) The sock has requested we do not follow it.
- [neutral] (B3) Sandra from Compliance has flagged the word "weather." Sandra has not said which one.
- [neutral] Rain may only fall in dry months, and dry months may only be requested by the Rain department. Per Sandra.
- [neutral] Sandra has flagged the storm. The storm flagged Sandra back. It was a downpour.
- [neutral] (labels shuffled) Sliders have been reassigned per Sandra. Sandra declined to say to what.
- [neutral] (B4 relabel) SUN is now 'SUN (Advisory)'. RAIN is now 'RAIN (Aspirational)'. WIND remains WIND, out of tradition.
- [neutral] (B4 relabel) Sandra has rebranded the sliders under a synergy initiative. The weather has not been told.

### 17.11 DO NOTHING (group `nothing`)
- [proud] You pressed the DO NOTHING button. The weather has become gorgeous. It was going to anyway.
- [smug] (Clifford) This is what we call restraint. I have been practising it.
- [neutral] Nothing has been done. The result is the best weather of the day. Management has questions, then has deleted them.
- [proud] (x3 in a row) Management Approves Of Nothing. A certificate has been prepared. It is blank, which is the point.
- [proud] (x5+) You are doing nothing at a professional level.
- [smug] (Clifford) I take full credit for the nothing. I thought of it first.
- [neutral] Weather has been gorgeous for 12 seconds. It would like it noted that this was its idea.

### 17.12 Request Form and stamps (group `stamp`), forecasts (group `forecast`), cameos (group `gerald`)
stamp (denial reasons, shuffle bag):
- DENIED (Weather is busy. Weather is outside. Weather is always outside.)
- DENIED (Form 27B/6 required. See Form 27B/7, destroyed in 1998.)
- DENIED (Reason: it is a bit much.)
- DENIED (Reason: too hopeful.)
- DENIED (Sandra has flagged the word "preferred.")
- DENIED (Request filed under Weather. Weather has recused itself.)
- DENIED (Urgency noted. Urgency has been asked to calm down.)
- DENIED (The sky is not accepting requests this quarter.)
- DENIED (Pending a decision on whether this is a request.)
- DENIED (Reason: signed in the wrong colour of weather.)
- DENIED (Reason on file: "{text}". The reason has been placed next to the other reasons.)  (only when the player wrote one)
- DENIED (Reason: Please stop.)  (spam and whiplash)
- APPROVED (Retroactively, effective last Thursday.)  (every 7th)
Management after a stamp:
- [neutral] Your request is number 7 1/2 in the queue. The queue is also weather.
- [neutral] Request {n} has been stamped, sealed and gently ignored.
- [confused] Your request has been approved retroactively. The weather had already done that, on Thursday, without you.
forecast (Clifford; `FORECAST: {text}` for 12 s then edited):
- [smug] Tomorrow will be a lot like earlier, with a chance of earlier. Confidence: total.
- [smug] Expect a ninety percent chance of weather and a ten percent chance of something I will take credit for later.
- [smug] Overnight lows will be quite low, as lows tend to be. This is meteorology.
- [smug] A band of showers will pass through your afternoon and then continue through your afternoon.
- [smug] Carry an umbrella of moderate commitment. Do not open it unless you mean it.
- [smug] Tonight: dark, with a chance of later.
- [neutral] (Management after the edit) History has been updated.
- [confused] (Management) A forecast is not a promise. A promise is not a forecast. Clifford is both.
gerald (only if `metGerald`; B7):
- [neutral] (Management) A cloud in the shape of a potato has been observed. Management has no comment. Management is standing.
- [proud] (Gerald, `who:'Gerald'`) The sky is only a very large ceiling. One must respect the roof.
- [smug] (Clifford) I take credit for Gerald. Gerald has not responded. That is his way of saying thank you.

### 17.13 Causality Ledger (group `ledger`)
- [neutral] A diagram has appeared. It shows how a butterfly causes weather, which causes Clifford, which causes credit, which causes the butterfly. Management finds it reassuring.
- [confused] The diagram now has a loop. Clifford has been credited for the loop.
- [proud] (Clifford) The loop is mine. I would like to thank the loop, which has been in my family for years.
- Node labels: `Butterfly`, `Weather`, `Clifford`, `Credit`; loop label `(see Butterfly)`.

### 17.14 Weather writes back (group `letter`; each letter is a Tray slip stamped REPLY ALL, signed `Weather (Confident)`; Management reads the first line aloud)
- Dear Valued Employee, thank you for your slider. After careful review, the sky is not accepting requests this quarter.
- We value your input. We have placed it in the weather. Please check the weather.
- Dear Valued Employee, we regret that your request cannot be met. It was met once, by accident, and we have taken steps.
- Counter-proposal: you stop moving the sliders and we continue not listening. Please sign in the usual place.
- Following your 9:14 request, Weather has done something. We cannot say what. It is done.
- Dear Valued Employee, rain has been scheduled for a time we will not be telling you. This is for your protection.
- We have received your complaint about the weather. It has been forwarded to the weather.
- Please note that the sky has no obligation to be above you. It is a courtesy. Please do not make it a habit.
- Dear Valued Employee, we value your input and will be circling it.
- (gordon3letter) Dear Valued Employee, terribly sorry about the weather. It is entirely my fault. Please do not tell Clifford. Yours, Gordon III.
Management on letters: [neutral] A letter has arrived from Weather. It is polite. It is also a refusal. Please keep both. / [confused] The letter has been stamped REPLY ALL. It has been sent to everyone who is not Weather.

### 17.15 Spam, idle, secrets (groups `idle`, `spam`, `secret`)
idle:
- [neutral] Weather has noticed you have stopped. Weather is behaving perfectly in the hope that you are watching.
- [confused] (Weather, sky bubble at Listening start) I CAN HEAR YOU NOT DOING ANYTHING. I WOULD LIKE TO MATCH IT.
- [neutral] (Management) Weather has matched your last values exactly. This is called The Listening. It is not in the manual. It is in the walls.
- [proud] (Management) Obedience is 100.0% and holding. Management has not been told how to feel. Management is feeling it anyway.
- [tired] (Clifford, 10 s into Listening) And now, silence. I take credit for that too.
- [neutral] (Management, on touch) The ghosts have bolted. They had been seated for twenty seconds, which is a record.
- [tired] (Clifford, 2:00 idle, whisper) Is it just us? I made all of this up.
- [tired] (Clifford, 2:00 idle, whisper) Please do not tell the weather.
- [neutral] (Management, 3:00 idle) A postcard has arrived from the weather. It is addressed to you. It is from just outside.
spam (whiplash):
- [panic] Please stop. The weather is dizzy, and so is the person who explains it.
- [panic] Weather whiplash detected. Clifford has been issued a neck brace, and credit.
- [neutral] You have been placed on hold. Your call is important to us in a way we cannot articulate.
- [neutral] You are caller number 7 1/2. Hold music is rain, then a different rain.
- [tired] (Clifford, brace) I'm fine. The brace is a statement. The statement is mine.
- [neutral] You are now caller number 7. Thank you for holding. Please keep holding.
spam (net stress leave):
- [neutral] The net has filed for stress leave. HR will contact it when it is better.
- [neutral] The net has been replaced with a tiny pillow for 15 seconds. The pillow is not a net. The pillow is trying.
- [neutral] The net returns, citing "a restful fortnight."
spam (DO NOTHING):
- [neutral] The weather has filed for space. A Restraining Cloud has been issued, 3 metres from the button, politely inflated.
- [neutral] The weather has asked for space, and a snack.
- [neutral] A fee of 0.5 Meh has been charged for Excessive Optimism, and a nap.
- [tired] The sky is going to dusk. A cloud is snoring. Please do not wake the cloud.
secret (sacred 7 1/2, group `sacred`):
- [proud] A Perfectly Pleasant Day, Technically.
- [proud] (Weather, `who:'Weather'`) Good day. I am not here. This is a courtesy.
- [confused] All five controls are at 7 1/2. The weather has tipped its cloud. Management has no policy for this and is making one.
- [smug] (Clifford) I arranged it. I'd like that noted. I'd like it noted twice.
- [neutral] He has left. He was never here. He was in a very good hat.
secret (fog hold, group `fog`):
- [neutral] The fog is thick enough to be policy. Please walk toward the sound of Management.
- [smug] (Clifford, disembodied) You can no longer see anything. This is my best work.
- [neutral] Visibility is now a matter of personal belief. Controls may be located by Tab.
- [neutral] The fog is lifting. It will be back. It has a key.
- [neutral] (after the title reverts) No one saw anything.
- UI: title bar `Fog Controller` for 3 s.
indoor:
- [panic] It has begun to rain indoors. Please do not look at the ceiling. Looking is optional but noted.
- [neutral] The sliders are wet and have formed their own views.
- [neutral] The indoor front has moved outdoors. It says it was only visiting.
single drop:
- (silence 6 s) [neutral] Please continue.
resize/returned:
- [neutral] The weather has been reflowed. It is not mad about it.
- [neutral] Welcome back. The weather held its breath. This is not a thing weather does.
ambient (play one when 25 s pass with no claim; shuffle bag):
- [neutral] Weather confidence: 100%. Weather accuracy: not applicable.
- [neutral] Weather has stepped away from its desk. The desk is outside. It is raining on the desk.
- [neutral] Weather has decided to be a bit of both, which is neither.
- [neutral] The Diary lists Weather's plans. The weather has asked that you not read the Diary. It has not asked very hard.
- [neutral] Tuesday has been mentioned in the forecast. Management would like to be moved to another sky.
- [neutral] Weather has read your slider with interest and will be declining it.
- [neutral] Management notes your favourite slider is {slider}. Management has not told {slider}. Management does not want it to get ideas.  (group `favourite`, once per session)

### 17.16 Elsewhere (group `elsewhere`)
- [neutral] (Butterfly Desk) Reginald has landed on the Cloud slider. Reginald is not aware of what he has done. Reginald is holding a door.
- [neutral] A door has opened. The door is a field. Please step in.
- [proud] Your sliders are working perfectly in Elsewhere. No one is in Elsewhere. This is considered a success.
- [neutral] There is a scarecrow. The scarecrow has not been briefed either.
- [neutral] Colin has appeared at the fence and waved. He is dry. It is not raining here. He is dry anyway, out of habit.
- [neutral] Management would like to say something. Management is not going to. It is nice here.
- UI: chyron `[Clifford is watching. He has nothing to claim.]`; LED `Obedience 100% (holding)`
return:
- [neutral] Elsewhere has been closed for the season. All sliders have been reset to 7 1/2 for your safety.
- [smug] (Clifford) As I was saying.
- [neutral] Back to normal. Nothing happened. Please do not mention it to the weather.

### 17.17 Ending and after (groups `endingMgmt`, `endingClifford`, `season2`, `pamelaAgain`, `loop2`)
- [proud] (endingMgmt) Congratulations. The weather has been controlled. It would like to say it had help, and that the help was nobody.
- [neutral] (endingMgmt) A Certificate of Dominion over Weather (Provisional) has been issued. Countersignature required from Weather. Weather is out.
- [proud] (endingMgmt) You controlled the weather 0 times, observed it {n} times, and were observed by it {n} times, which is considered a draw.
- [smug] (endingClifford) Forecast for tomorrow: today, but later. I have taken credit for later.
- [proud] (endingClifford) I would like to thank the weather, which has done what I told it to. I told it afterwards.
- [neutral] (ceremony, Gordon III) Gordon III has returned the sock. He was not asked to. He has written to say so.
- [neutral] (ceremony, no Gordon) The sock has been honoured. It does not know why. It is a sock.
- [neutral] (ceremony) The weather has tipped its cloud. It is a very small cloud. It is tipped regardless.
- [neutral] (season2) Season 2 has begun. The sliders have new names. The sky has the same name. It has not read the new names.
- [confused] (pamelaAgain) Pamela has arrived. She is exactly where she was. Incident 3304, again, now with a second incident number: 3304 (b).
- [neutral] (loop2) Certificate (Provisional) number {n}. They are now provisional in bulk.
- Chyron/UI strings: `CERTIFICATE OF DOMINION OVER WEATHER (PROVISIONAL)`, `Season 2: Same Weather`, `A Perfectly Pleasant Day, Technically.`, `ON HOLD`, `OCCUPIED - on break`, `REPLY ALL`, `STILL ON A JOURNEY`, `CONSIDERING...`, `WHAT YOU ASKED FOR`, `Weather's Diary`.

---

## 18. Visual design

PALETTE (cheerful dysfunctional intranet, matches the Lobby): cream console `#fbf3df` with a faint dotted-paper texture (`radial-gradient` dots), 3px outlines `#2b2118`, sticker shadows `4px 4px 0 #2b2118`. Sky gradients: sun lemon `#fff3a8` to powder blue `#bfe6f5`; cloud lilac `#cdb9f2`; rain slate-mint `#9fbdb4`; fog overlay `#f4f1ea` with alpha; storm slate `#6b7b95` to `#3b4560`; dusk coral `#ff9c8b`. Accents: mint `#7fd9b0` slider fills, coral `#ff7a6b` thumbs and the DO NOTHING button, mustard `#f2b933` lever and dial rim, lilac `#b79cf2` the Plan sticky note and TV bezel. Dark theme not required; the module is its own cream world (inherit nothing from the Lobby besides fonts).

SKY WINDOW (one canvas, delta-time from the rAF timestamp): `drawSky(ctx, S, w, h, opts)` is ONE function used twice: for the real sky with `S = actual` and the full scene (town, Colin, Dennis, sock, effects), and for the PIP with `S = requested` (mirrorless) at 1/4 scale, `opts.pip = true` (no town, no particles beyond ~8 deterministic streaks). Layers: gradient from sun/cloud; sun disc with a face (smug / confused / panic) and a rotating ray ring; 3-7 parallax cloud blobs made of overlapping circles with faces on the big ones (pre-baked offscreen shapes optional); rain streaks (short lines, skewed by wind, cap 140 particles); snow dots (cap 100); hail as small ice squares; fog as layered semi-transparent radial gradients; lightning as a white flash plus zigzag path (reduced motion: still tint); a hill, a small house with a window box (Dennis), a washing line (sock), Colin (12-node stick figure + red SVG-style umbrella drawn with canvas arcs), effect sprites. Heat shimmer = a CSS class on the canvas (`translateY(.5px)` wobble animation) and frost = white-blue inset box-shadow class on the frame.

CLIFFORD (inline SVG in a PiP TV bezel with scanlines via CSS repeating-linear-gradient): head, hair, tie, blazer; 6 mood faces; pointer-arm; lower-third chyron. Ego stages are CSS `transform: scale()` plus accessory SVG layers: mug, plaque, second monitor, then `z-index` within the module root and `overflow:visible` on the TV so he bursts over the Sky Window (the module root clips, so he cannot cover the Lobby UI).

CONSOLE: native range inputs restyled (see 5.1); the dial is SVG (circle, 31 ticks, mustard needle, hollow ghost ring); the lever is a vertical track with a draggable knob and a bounce-back CSS transition; DO NOTHING is a huge round coral button with a hand-lettered label and a satisfying press; the Butterfly Jar is a CSS glass jar (border-radius, glossy white `::before` highlight) holding up to 12 butterfly emoji tumbling at the bottom; the Request Form slides in as a clipboard with a paper-clip `::before`; the STAMP is a rotated bordered label with a drop animation and a faint ink bleed (text-shadow blur). The Tray slips are cream strips with perforated edges. LED strip uses a monospace 7-segment-like font stack and flashes mint on alignment.

EMOJI used (all Emoji 12 or older): 🦋 ☁️ ☀️ 🌧️ ⛈️ ❄️ 🌪️ 🌫️ 🌈 ☂️ 🧦 🥅 💤 🎩 👕 🐦 🌾. SOUND (api.sfx only): `boing` ghost hop, `whoosh` net swing and lever, `pop` catch, `bloop` butterfly arrival / DO NOTHING / hold music, `ding` alignment, `sad` reconsider, `stamp` request, `tick` countdown, `tada` sacred 7 1/2 and ceremony, `bell` Elsewhere arrival and the single drop, `buzz` denial and whiplash, `fanfare` (engine-owned achievements).

REDUCED MOTION (`root.closest('.pm-reduce-motion') || matchMedia('(prefers-reduced-motion: reduce)').matches`): no screen shake, no lightning flash (still tint), ghost hops are instant (no squash), butterfly wings static and wander replaced by slow bobs, effects become static emoji with captions, wobble becomes a colour change, countdown stays text.

---

## 19. Implementation hints (so the file stays under ~1800 lines)

**File layout** (rough line budget): 1) header, `P.injectCSS` (about 220 lines); 2) data: PLANS, EFFECTS, LINES, NAMES, DIAL_WORDS (about 330 lines, keep arrays flat and compact); 3) helpers `fill`, `bag(arr)` (shuffle-bag via `api.shuffle`, never repeating across a refill), `clamp`, `lerp`, `fin(x, d)` (finite or default), `sanitize` (60); 4) state object `S` (50); 5) DOM build with `api.el` (200); 6) weather model + Plans + Diary (130); 7) draw functions (260); 8) input: sliders, ghosts, alignment, dial, lever, DO NOTHING (240); 9) butterflies, net, jar, effects (200); 10) Clifford, credit, ego, forecast, countdown, ledger (160); 11) Tray, form, stamp, letters (110); 12) director + modes + secrets + idle/spam (250); 13) ending and reset (110); 14) destroy and registration (40).

**One loop**: `api.requestAnimationFrame` with `dt = min(0.1, (ts - last)/1000)` (and `dt = 0` on the first frame), skip drawing when `document.hidden` or the canvas has width/height < 2; cap at about 30 fps. All timers `api.setTimeout/api.setInterval`; for periodic events use timestamp checks in the director tick (`S.until[...]`) instead of chaining `setTimeout`s, so `destroy`, idle and the ceremony cannot orphan callbacks. Guard every callback with `if (S.dead) return;` (set in `destroy`).

**Ghost layout**: use CSS custom property `--g` per row (set with `row.style.setProperty('--g', String(A/15))` only when it changed by > 0.002) so no layout reads occur per frame. The thumb width `--tw` is read once from CSS (30/44px) in a media query; do not measure the thumb.

**Pointer events**: sliders: `pointerdown` marks `S.drag[ch]=true`; `input` while dragging drives the dodge test; `pointerup/pointercancel/lostpointercapture` and `blur` end the drag and fire the settled-release path once (`S.drag[ch]=false`, guard double-fire with a `releasedAt` timestamp: a `change` event from the same pointer interaction within 80 ms is ignored). Keyboard: `keydown` handled (arrows, Space/Enter Lock In) with `preventDefault` only when handled; a keyboard-driven release is the debounced settle (350 ms after last key) or Space/Enter.

**Dial**: on `pointermove` with capture compute `a = atan2(y - cy, x - cx) * 180/PI`; `d = a - lastA; if (d > 180) d -= 360; if (d < -180) d += 360; theta += d; lastA = a;`. Guard `rect.width` 0. Value derivation as in 5.6.

**Occupied sliders**: set `input.disabled = true` and also `aria-disabled`; if the user was mid-drag, reset `S.drag` and `releasePointerCapture` in try/catch. Landed butterflies read the input's rect each ~250 ms to follow layout changes.

**Butterfly model**: `{id, name, inc, x, y, t, age, state:'fly'|'land'|'leave', ch|null, btn}`; position `x += cos(heading)*speed*dt`, `heading += sin(t*freq)*turn*dt`; keep inside the Sky Window bounds with a soft turn; `landed` snaps to the thumb. Buttons are repositioned with `style.transform = translate(x px, y px)` (no layout thrash). On remove: `btn.remove()` and, if it had focus, move focus to the Net hint element (or body via `root`) rather than dropping it.

**Net swing sprite**: ONE reusable element (not one per swing); restart its CSS animation by toggling a class with a forced reflow-free approach (`removeAttribute` + `api.setTimeout(...,16)`), never rely on `animationend` (it does not fire under reduced motion or a hidden tab); set `api.setTimeout(hide, 340)`.

**Particles**: pooled arrays with fixed caps (rain 140, snow 100); spawn positions avoid a thin column around Colin's umbrella (`abs(x - colinX) < 30`) so he stays dry for free.

**Plan engine**: `Agenda` is `api.shuffle(PLANS.slice(1))` with Plan 1 first; when it empties reshuffle (never the same Plan back to back). The Diary derives its rows from the queue (current + next 2 + the `Busy until Tuesday.` closing row) so it is truthful.

**Director + modes**: see sections 10 and 11. The director owns Ego floors/caps, beat one-shots (`at()`), butterfly cadence, label shuffling (every 25 s from B5), forecasts, countdowns, letters, Single Drop roll, Elsewhere, ceremony, and the loop reset (`resetLoop()` clears `fired`, particles, effects, Tray, slips, diary rows, Ego, butterflies; keeps loops, credit count, jar contents are cleared to avoid DOM growth, Season-2 labels stay).

**Selftest compatibility**: `api.selftest` -> `TS = 60`. Idle uses real `api.now()` so the harness's 62 s idle window triggers the Listening (45 s) and the 2:00 whisper may not fire (fine). Under `?selftest` skip long sleeps but keep behaviour identical. Make sure random clicks anywhere (including the canvas, the Tray, the certificate) cannot break a mode.

**Content safety**: every string from the player (form Reason) goes through `textContent`; `fill()` returns `''` for unknown tokens (and collapse double spaces); LED numbers via `fin(x, 0)`; no `undefined`/`NaN` ever reaches `aria-valuenow`, `aria-valuetext`, `title` or text; `api.say` is never called with an empty string. The 6 s hush in the Single Drop is implemented by a `S.hushUntil` check inside `mgmt()` and `cliff()`.

**Say routing**: `mgmt(text, o)` -> `api.say(text, {who:'Management', mood, priority})`; `cliff(text, o)` -> sets the chyron text (<= 140 chars, `textContent`) AND throttled `api.say(..., {who:'Clifford Isobar'})`; `desk(text)` -> `api.say(..., {who:'Butterfly Desk'})` plus the chyron caption; `weather(text)` -> the sky bubble and, rarely, `api.say(.., {who:'Weather'})`. Keep priority 0 for chatter, 1 for beat arrivals, 2 only for the single drop's "Please continue." and the ceremony.

**Performance**: <= 140 rain + 100 snow particles, <= 7 butterflies, <= 3 concurrent effects, draw each layer with batched paths, `ctx.save/restore` sparingly; the PIP redraws only every 4th frame; set `imageSmoothingEnabled` untouched; `dpr = min(2, devicePixelRatio || 1)`; canvas size updates on `resize` only (via `api.on(window,'resize')` plus a width check in the director tick).

**Verification**: `node tools/selftest.js weather-controller --steps 600`, `node tools/lint.js games/weather-controller.js`, `node tools/shot.js weather-controller --width 1280`, `--width 360`, `--reduce-motion`, and `--actions 80`; read the PNGs and fix layout. Then `node tools/selftest.js weather-controller --real`.

---

## 20. Risks: the five most likely bugs

1. **Range-input event semantics break alignment, release and locking.** `pointerup`, `change` and keyboard `keydown` all describe "release" in different ways: alignment awarded twice, never awarded for keyboard, or a drag stuck in `S.drag[ch]=true` when a butterfly lands (`disabled` mid-drag swallows `pointerup`) or when pointer capture is lost. Mitigation: one `settle(ch, source)` function with a `releasedAt` guard, reset `S.drag` on `pointercancel/lostpointercapture/blur/disabled`, treat Space/Enter on the input as an explicit "Lock In", and test each path (mouse, touch, arrows, Space) with the fuzz harness.
2. **Numeric hazards: NaN/Infinity in the model and dial.** `dt = 0` on the first frame, `dt` huge after tab switches, `exp()` of a bad `k`, `atan2` unwrap errors when the pointer crosses the +/-180 boundary, a dial centre read as 0 width when hidden at 360px, or `--g` set to `NaN`; any of these shows `NaN` in the LED/readouts (the fuzz harness FAILS on it) or throws in `createRadialGradient`. Mitigation: `fin()` guards on every derived number, `dt` clamp, skip drawing when w/h < 2, unwrap the angle deltas, and `A`, `R`, `T` clamped each frame.
3. **Mode soft-locks and overlapping overrides.** Whiplash during the certificate, the Single Drop during Elsewhere, the Fog Hold while on hold, the Listening when the tab becomes hidden: leaving the console `inert`, the title stuck on `Fog Controller`, the net stuck on pillow, a Restraining Cloud orphaned, or the director paused forever. Mitigation: the single `S.mode` with priorities and expiry timestamps (never chained `setTimeout`), `clearOverlays()` on every mode entry/exit and in `destroy`, and force-close the form when a mode starts.
4. **Leaks, orphans and DOM growth from butterflies, effects and spam.** Butterfly buttons not removed when they time out or on `resetLoop`, `animationend` listeners that never fire, a focused butterfly removed (focus lost), 70-click bursts creating dozens of net sprites/slips/jar emoji, timers surviving `destroy` (fuzz fails with leaks), unbounded Tray/Diary/jar. Mitigation: hard caps (7 butterflies, 12 jar emoji, 4 slips, 8 diary rows, pooled particles), one reusable net sprite, only `api.*` timers and `api.on`, an `S.dead` guard, and `destroy()` that removes the flies layer and clears everything.
5. **Text and token bugs.** Unfilled `{name}` `{inc}` `{slider}` `{n}` in lines, the form Reason injected as HTML or containing `{player}`, `$&` in a replacement string, an empty `api.say`, or Credit percent showing `NaN%`; also the `null`/`undefined` strings fail the fuzz run if they reach any surface (aria-label of a butterfly, `title`, `textContent`). Mitigation: one `fill()` with a function replacer and a final pass that rejects any string still containing `{`, `textContent` everywhere (never `innerHTML`), all numbers through `fin()`, and an in-`?dev` self-check that scans `root.textContent` and aria attributes for the forbidden words.

Also watch: the 1800-line budget (keep line data flat), the `?selftest` beat clock (`TS = 60`) so every beat and the ending are exercised, the 360px layout (TV chip, PIP badge, 44px thumbs), reduced-motion paths, and the PIP/real-sky parity (same function, different state).

---

## 21. Acceptance checklist

- First joke visible at mount with no input (hail sky, SUN at max with a sticky note, PIP in full sunshine); Management welcome and Clifford's credit at t=3 s; at least one `api.award`, one `api.say` and one `api.stat.inc` within the first 100 steps of the fuzz.
- Dragging a slider toward its ghost makes the ghost hop (boing, +0.05 Meh, capped); holding still while the ghost crosses and releasing within 0.4 yields an ALIGNMENT EVENT (100.0% flash 0.6 s, ding, confetti, +2 Meh) followed by the reconsider.
- Pamela appears by 45 s; clicking or pressing N catches her; the jar and the first effect play; an uncaught butterfly lands, locks a slider (`OCCUPIED - on break`) and can be shooed; at 12 s an unchallenged one produces a BIG EVENT.
- Clifford claims credit within 1.2 s; `C` / click disputes; the Ego stages (mug, plaque, second monitor, bursts out) follow the beat floors; the countdown 4-3-2-1 runs from B6.
- The Request Form appears at B3, stamps DENIED (reason bag), every 7th APPROVED (Retroactively); request #77 triggers the Indoor Front.
- The dial uses words and laps; the lever springs back; holding it 10 s triggers the Fog Hold; the title bar reads `Fog Controller` for 3 s then corrects.
- DO NOTHING x3 awards the bonus; 12 in 5 s summons the Restraining Cloud.
- 45 s idle triggers The Listening; 20+ slider/dial inputs in 5 s triggers Whiplash with the 8 s hold; 15 net swings in 5 s triggers stress leave.
- All five controls at exactly 7.5 triggers the Sacred 7 1/2; Gordon III and the Single Drop are reachable (use `?seed`/dev hooks via the selftest clock).
- Elsewhere runs for 55 s of director time with perfect obedience, then the sliders reset and Clifford says `As I was saying.`; the Certificate, the 7 1/2 s ceremony, the reset and `Season 2: Same Weather` work, and the game continues.
- At 360px and 1400px it is usable; `node tools/selftest.js weather-controller` PASSES; no `NaN/undefined/null/[object Object]`; no unbounded DOM; no leaks after destroy; >= 80 line-like strings, >= 6 achievements with >= 2 secret (this brief declares 14, 7 secret); Emoji <= 12 only; <= ~1800 lines.
