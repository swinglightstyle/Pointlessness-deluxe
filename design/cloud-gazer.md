# DESIGN BRIEF: Professional Cloud Gazer (`cloud-gazer`)

Final brief by the showrunner. It merges three writers' pitches. A builder who reads only SPEC.md, VOICE.md and this file can build the whole module into `games/cloud-gazer.js` (single file, <= ~1800 lines, vanilla JS, no external assets).

Module registration values:

- id `cloud-gazer`, title `Professional Cloud Gazer`, icon `☁️`, category `game`, unlockCost `0`, tags `['relaxing','graded','sky']`
- tagline: `Look up. Be wrong. Get a certificate for it.`
- CSS prefix `m-cloud-gazer-`, injected with `P.injectCSS(css, 'css-cloud-gazer')`
- Stat/flag/achievement prefix `cloud-gazer.`

---

## 0. Concept in four sentences

A calm, slightly unwell afternoon sky. You tag each drifting cloud with what it resembles and say how certain you are on a 1-5 **Certainty dial**. Chief Examiner **Pruitt** of the Board of Cloud Standards (Subcommittee on Fluff) grades every tag by **dissent**: confident labels get D+, hedged labels get B+, and he tells you which. The clouds keep morphing so your ink runs, you can squint and tilt your head to see better (and worse), one cloud comes to resemble you, and after 60 labels or 9 minutes you are Certified (Provisional), the chairs are swapped, and everything resets as if nothing happened, except one very small cloud now sits next to Pruitt's coffee.

The joke engine is exactly one rule: **Pruitt disagrees with how sure you are.** Everything else is dressing, escalation and bureaucracy around that rule.

---

## 1. Decisions: what was kept, merged, cut

KEPT (from the Pruitt pitch, the spine): Certainty dial and dissent grading; Resemblance % that is only cosmetic; stamps and margin notes; "See me." counter; Technically Correct Ledger shelf; morph and ink run; Squint with 6 s allowance and floaters; Head Tilt with alt keywords; the cloud that resembles you; Notary Cloud (every 5th label); Unlabelled Cloud trailing the cursor; Certificate; Chair Swap; long idle "Examiner out"; spam micro-clouds merging into STOP; total inversion secret; label-the-Examiner secret; moustache cloud; Gerald and Sock cameos.

KEPT (from the Fenwick-Marsh pitch): the Pass Mark of 7 1/2 motif (as "pass mark for resemblance is 7 1/2 percent"); the Ledger of Former Opinions (our **Register** drawer) that Pruitt reads from at bad moments; "a cloud returns wearing your label"; "Retired to the Archive"; window-resize "the weather has been reflowed"; labels 'rain', 'sky', 'management', 'storm' as small easter eggs; the Gerald line "I have always been a little bit weather".

KEPT (from the Halloran-Vane pitch): A-minus is mentioned fondly and never awarded (stamp smudges to B-plus: "Ink issue"); "The cloud has not apologized" running gag and its payoff; Rabbit quota (Sandra); Trainee Pell (second examiner, timid grades); rank ladder (cosmetic, every 10 labels); Official Sunbeam; backward cloud; "Session 2 of 1"; Window Sommelier.

CUT (unbuildable or weak): Gaze Quality ring; Rival Gazer D. Plant ghost cursor (Dennis is a line only); right-drag tilt; two-finger "Look Over There"; Resemblance Futures ticker; mergers/divorces of clouds; Appeals Tribunal of ghost clouds; corkboard of rotating rules (replaced by one "Notice" line on the desk); the Investigation 99% bar; Submit-with-no-cloud-selected; inline-next-to-cloud text input (replaced by ONE docked form, see 3); the CSS-div cloud renderer (canvas only); per-pose alt silhouettes (the alt reading is simply the same shape seen rotated, plus an alt keyword list); the Pruitt/Halloran naming conflict (Examiner is **Pruitt**, male, "Examiner Pruitt"; Trainee Pell is the junior).

Constraint notes: no real brands (no Wi-Fi chip; the chip is "Router"), no pop culture. Everything random goes through `api.rand/randInt/pick/shuffle/chance`; time through `api.now()`; all timers via `api.*`.

---

## 2. Cast and voice

- **Examiner Pruitt** (the Examiner). Dry, wounded, scrupulous. Speaks through the in-module bubble next to his portrait AND `api.say(text, {who:'Examiner Pruitt', mood, priority})` (see speak() in 19). Never cruel. His secret: he has never been right and keeps coming back for that reason.
- **Trainee Pell**. Emoji intern with a lanyard (🧑‍💼 badge). Timid grades. Enters 2:30, leaves at the first You-cloud, returns after the first reset with a desk.
- **Management**: only a handful of lines through `api.say(text, {who:'Management'})` at mount, big events and the ending.
- **Sandra from Compliance**: never seen, always cited. Signs the relabel fee. Countersigns the notary. Flags words.
- **Gerald (VP of Spuds)**, **The Missing Sock**, **Dennis (Plant)** as cameos only. The Toaster and The Stapler stay offstage. Tuesday looms (one line).

Token conventions for module-local lines (the engine only substitutes `{player}` `{meh}` `{count}` for `api.line`; this module fills its own tokens in its `fill()` helper, and must fill ALL of them before display):

`{label}` the player's label (sanitized, truncated to 28 chars), `{grade}`, `{R}` resemblance percent, `{n}` a count, `{time}` mm:ss of an old filing, `{pose}` the word for the cloud's current pose, `{rank}`, `{player}` `api.player.name`, `{deg}` tilt degrees. Replace tokens with a function replacer (`s.replace(/\{(\w+)\}/g, (m,k)=> k in vars ? String(vars[k]) : '')`), never with `$` patterns in the replacement string, because labels are player text.

---

## 3. Screen layout (single column, works 360px to 1400px)

```
.m-cloud-gazer-app (root child, flex column, gap 8px)
  .m-cloud-gazer-hint            one line: "Click a cloud. Say what it resembles." (grows later, see 10)
  .m-cloud-gazer-sky             position:relative; aspect-ratio 16/10; min-height 300px; max-height 560px; overflow hidden; 3px #2b2a33 border, 14px radius, sticker shadow
      canvas.m-cloud-gazer-cv    fills the sky; ALL clouds, sun, stars, birds, floaters, micro-clouds, gradient drawn here
      svg.m-cloud-gazer-strings  full-size overlay; one <path> per tag string (pointer-events none)
      div.m-cloud-gazer-btns     overlay holding one real <button> per cloud (transparent, sized to the cloud box); DOM order = sorted by x
      div.m-cloud-gazer-tags     overlay holding the tag <button>s (tabindex -1; clicking one reopens the form on that cloud)
      div.m-cloud-gazer-fx       stamps, margin notes, dim layer, curtain for certificate, "OUT OF DATE" stamps
  .m-cloud-gazer-form            real <form>: label input (maxlength 28, placeholder "It resembles..."), Certainty pips (5 <button type=button role=radio>), "File It" submit, "Cancel"; chips row below (<= 5 buttons)
  .m-cloud-gazer-controls        Head Tilt <input type=range min=-180 max=180 step=15> with live label, Squint (hold) button, Appeal button, Register toggle
  .m-cloud-gazer-desk            96px strip (56px at <= 480px): Pruitt SVG portrait + speech bubble (aria-live="polite"), clipboard (current grade, resemblance %, margin note), Register drawer button, Ledger shelf (books), rank badge, coffee, notice line, wind readout
```

- ONE docked form for mouse, touch and keyboard (no inline input next to the cloud). It sits directly under the sky, above the desk, so a phone keyboard never covers the sky controls. The form is hidden (`hidden` attribute, not removed) when no cloud is selected. While you type, the cloud's tag shows a live preview.
- Everything inside `.m-cloud-gazer-sky` that is a clickable DOM element (tags, buttons) is positioned with `transform: translate(x px, y px)` using screen coordinates computed by the same function used to draw the canvas (see 19, Rotation).
- At <= 480px: desk strip 56px, Pruitt becomes a 40px emoji badge (🧐), Ledger shelf hidden until tapped (tap Pruitt badge toggles a small popover with shelf, register and rank), notice line hidden, chips wrap 2 per row, pips are 44px tap targets.
- The Register drawer is a popover panel (cap 30 entries, FIFO) listing former labels: `{time} {label} ({grade})`. It is the "Ledger of Former Opinions".

---

## 4. Data model

### Clouds

A cloud is an object: `{id, x, y (world coords), vx (px/s, 8..25), scale S (58..92 px), pose (target pose key), puffs[9] {cur:[dx,dy,r], jit:[jx,jy], phase}, label|null (the tag: {text, certainty, poseAtLabel, grade, inkRun, relabelsFree, filedAt}), kind: 'normal'|'you'|'gerald'|'sock'|'moustache'|'micro'|'returned'|'chair', morphT (seconds until next morph), morphProg (0..1), alpha}`.

- Exactly **9 puffs** per cloud, always (the You-cloud has a 10th hand puff that waves). All poses are 9 puffs, which makes lerp-morphing trivial. Poses with fewer visual features repeat puffs.
- 4 clouds at start; target population 4 to 7; a new cloud spawns about every 6 s when below target (spawn at x = -margin, y mostly in the visible band); clouds leaving the right edge are **Retired** (stat `cloud-gazer.retired`, filed to Archive count, cap 50 entries, oldest dropped). Archive is not shown except through lines and the count in the Register popover.
- Drift 8-25 px/s left to right (scaled by the idle-slowdown factor).
- Rendered puff position: `pose[i]*S + jit[i]*S*(1 - 0.65*squintEase) + wobble`, where `wobble = (sin(now/1000 + phase)*0.04*S, cos(now/1300 + phase)*0.04*S)`, `jit` is a fixed random vector of magnitude 0.15..0.35 per puff (the "fog" that makes shapes hard to read), and `cur` lerps toward `pose[i]` over 12 s when a morph fires. Reduced motion: no wobble, morph snaps in a 4 s stepped lerp, drift at 1/4 speed.

### Poses (9 shapes + 'you'): puff = `[dx, dy, r]` in units of S, y down; tune by eye with the shot tool

| key | keywords (substring match, case-insensitive) | alt keywords (when |tilt| is 60..120) | puffs |
|---|---|---|---|
| rabbit | rabbit, bunny, hare | mountain, hill, peak | [-.65,.30,.45] [-.15,.35,.50] [.35,.30,.45] [.75,-.05,.33] [.68,-.50,.14] [.68,-.78,.12] [.88,-.55,.13] [-1.0,.20,.20] [-.30,-.05,.35] |
| ship | ship, boat, sail, vessel | wedge, ramp, pizza | [-.8,.35,.30] [-.4,.40,.35] [0,.42,.38] [.4,.40,.35] [.8,.30,.30] [-.05,-.05,.38] [0,-.5,.30] [0,-.85,.20] [.25,-.95,.12] |
| mitten | mitten, glove, hand | hat, fin, wing | [0,0,.55] [0,-.5,.45] [0,-.88,.30] [-.45,.05,.40] [.45,.05,.40] [.8,0,.25] [.98,-.22,.16] [-.2,.6,.32] [.2,.6,.32] |
| potato | potato, spud, tater | rock, pebble, boulder | [-.7,.1,.38] [-.3,-.15,.45] [.2,-.2,.46] [.65,0,.40] [.8,.35,.28] [.35,.4,.42] [-.15,.42,.42] [-.6,.4,.30] [.05,.1,.50] |
| loaf | loaf, bread, toast | bridge, bench, ledge | [-.8,.2,.30] [-.4,-.05,.38] [0,-.15,.40] [.4,-.05,.38] [.8,.2,.30] [-.4,.4,.33] [0,.45,.35] [.4,.4,.33] [0,.15,.40] |
| castle | castle, tower, fort | comb, fork, rake | [-.8,.3,.30] [-.8,-.15,.25] [-.8,-.5,.20] [.8,.3,.30] [.8,-.15,.25] [.8,-.5,.20] [0,.35,.45] [0,-.1,.40] [0,-.55,.22] |
| whale | whale, fish, dolphin | wave, dragon | [-.95,-.45,.22] [-.8,-.1,.30] [-.4,.15,.42] [.05,.2,.50] [.5,.15,.45] [.85,.25,.30] [.3,-.45,.14] [.3,-.7,.10] [.1,.5,.35] |
| teapot | teapot, kettle, pot | elephant, trumpet | [0,.2,.55] [-.45,.25,.40] [.45,.25,.40] [0,-.35,.30] [0,-.65,.14] [.9,0,.20] [1.1,-.25,.13] [-.95,.1,.20] [-1,-.2,.15] |
| blob | blob, amoeba, jelly | pancake, puddle | [0,0,.55] [-.5,.1,.40] [.5,.1,.40] [-.25,-.4,.38] [.3,-.4,.38] [-.3,.45,.35] [.3,.45,.35] [0,.15,.50] [0,-.1,.50] |
| sock (special, never labellable) | | | [-.5,-1.0,.25] [-.5,-.7,.30] [-.5,-.3,.32] [-.5,.1,.36] [-.2,.5,.34] [.2,.55,.34] [.6,.5,.30] [.9,.45,.22] [-.75,.4,.25] |
| you (special) | | | head [0,-.5,.38] [-.25,-.6,.22] [.25,-.6,.22]; neck [0,-.1,.20]; shoulders [-.55,.3,.40] [.55,.3,.40] [0,.35,.45] [-.95,.6,.30] [.95,.6,.30]; plus eyes (two dark circles r .05 at (-.15,-.55) and (.15,-.55)), a one-pixel smile arc, and a 10th puff "hand" orbiting (.95,.1) that waves |

"cloud" is not a keyword of any pose: it is the Technically Correct label (see 6). 'Pruitt silhouette' (secret) = the 'you' shape plus two ring glasses and a bow tie triangle.

### Stats, flags, saves

Stats (all `api.stat.*`): `cloud-gazer.labels`, `.technicallyCorrect`, `.squintSeconds` (integer seconds), `.tiltMax` (max abs degrees, `api.stat.max`), `.seeMeNotes`, `.appeals`, `.inkRuns`, `.youClouds`, `.hedged` (labels at certainty <= 2), `.bold` (certainty 5), `.retired`, `.morphs`, `.relabels`, `.rabbits`, `.socks`, `.spam`, `.idles`, `.inversions`, `.certified`, `.swaps`, `.floaters`, `.dog`.

Flags: `cloud-gazer.gerald` (true once the Gerald cloud was labelled), `cloud-gazer.sockSeen` (true when the Sock crossed), `cloud-gazer.certified` (true once Certified), `cloud-gazer.inverted`. Read shared `metGerald` (never set it).

`api.save`: `{firstLabel: string|null, cycles: int (completed resets), certified: bool, rankIdx: int, ledgerBooks: int, registers: [{t,label,grade}] (cap 30)}`. On a remount with `certified` true the intro lines swap to the "returning" set (section 17.1) and the Ledger shelf is already visible.

---

## 5. Controls

| action | mouse | touch | keyboard |
|---|---|---|---|
| select a cloud | click it (canvas hit test: any puff circle within +4px) | tap it | Tab to its transparent `<button>` (aria-label `Cloud 3 of 5, drifting, resembles nothing yet` / `... currently labelled '{label}'`), Enter |
| N: next unlabelled cloud | n/a | n/a | N (not while typing) selects the next unlabelled cloud and focuses its button |
| open/close form | opens on select; Esc or Cancel closes | same | Enter opens, Esc closes |
| type label | input in the docked form (maxlength 28) | same, keyboard docked above desk | same |
| Certainty | click a pip; mouse wheel over the pips; ArrowUp/ArrowDown inside the input | big pips | ArrowUp/ArrowDown while the input is focused, or Tab to the pips and Left/Right |
| submit | Enter or "File It" | the keyboard Go key or the button | Enter |
| chips | click a chip: fills the input (does not submit) | same, 44px | Tab, Enter |
| Squint (once unlocked) | hold the Squint button, or press-and-hold empty sky for 400ms | long-press empty sky 400ms or hold the button | hold Space (not while the input is focused) |
| Head Tilt (once unlocked) | mouse wheel over EMPTY sky tilts 5 degrees per tick (wheel over the pips changes Certainty instead), or the slider | the Head Tilt slider | Q = -15, E = +15 |
| Appeal | button (enabled after a grading, once per graded cloud) | same | same |
| Register | toggle button | same | same |
| Countersign (notary) | click the glowing leftmost cloud | tap | its button + Enter |

Rules for the key handler (single `keydown`/`keyup` pair registered via `api.on(document, ...)` and guarded):

- Ignore the whole handler if `e.target` is an `input`, `textarea`, `select`, or contenteditable, EXCEPT Escape, and ArrowUp/ArrowDown in the label input (Certainty).
- Space always means Squint when handled (call `preventDefault` so a focused cloud button does not also fire a click). Keyup of Space, `blur`, `visibilitychange`, and `pointercancel` ALL release Squint (no stuck squint).
- Q/E only tilt when not in an input and no modifier keys.
- Pre-unlock behaviour: pressing Space/Q/E before the unlock gets a line (17.7) instead of an effect. The 3rd attempt on a locked ability unlocks it early ("Fine.").
- Every input event updates `lastInputAt` (idle detection) and the spam ring buffer.

Reduced motion (`matchMedia('(prefers-reduced-motion: reduce)')`): no morph wobble, no reticle spin, no screen shake, stamps just appear, drift at 25%.

---

## 6. Labelling and grading (the whole joke; implement exactly)

On submit with a selected cloud (not kind 'sock' or 'micro'):

1. **Sanitize**: strip control characters, collapse whitespace, trim, cap at 28 code points. Keep `raw` for lowercase checks. Empty is allowed.
2. **Special routes first** (each short-circuits normal grading but still awards and still counts as a label, except where stated):
   - cloud kind `you` and label matches `/examiner|pruitt/i`: the Examiner secret (section 13.4).
   - cloud kind `you`: grade `B`, fixed, any text; Pruitt line from group 17.9.
   - cloud kind `gerald`: Gerald cameo (17.11), grade `Pending`, sets `cloud-gazer.gerald`.
   - cloud kind `moustache`: grade `Disputed`, +6 Meh (17.12).
   - empty label: grade `Pending`, Pruitt "for courage" line, award 0.1.
   - label contains `moist`: grade `Moist` (Sandra's grade).
3. **Normal pipeline**:
   - `R` (Resemblance, integer 0-94, never 100): if the label (lowercased) contains a keyword of the cloud's current `pose` then `R = 70 + randInt(0,24)`; else if |tilt| is within 60..120 and it contains an alt keyword of that pose then `R = 70 + randInt(0,24)` (and if |tilt| in 85..95 and pose is rabbit and word is mountain/hill/peak, that is the Sovereign Tilt achievement); else `R = hash(label) % 41`, plus 5 if the label is 5..12 chars, plus 8 if squint was held at submit. `hash` = djb2 over the lowercased trimmed label, `>>> 0`.
   - R is shown only as "Resemblance: {R}%" on the clipboard and in a line; it sets the Meh award: `award = 0.1 + R/40`.
   - **Grade by dissent.** Scale (index 0..11): `F D- D D+ C- C C+ B- B B+ A- A`. Base index by Certainty pips: 5 pips -> 3 (D+); 4 -> 5 (C); 3 -> 6 (C+); 2 -> 8 (B); 1 -> 9 (B+). Add jitter: `randInt(-1,1)` with 50% chance of 0. Clamp to 0..10.
   - If the result is 10 (A-minus): the stamp lands as `A-` then 700 ms later it smudges (CSS blur + rotate) into `B+` and the margin note reads "Ink issue." This is the A-minus gag; A-minus is never recorded. Final grade stored is `B+`.
   - `R < 5` overrides everything: grade `A`, anti-climax lines (17.3).
   - 1 in 12 normal gradings come back `Pending` instead (rare, "the grade I am proudest of").
   - If Certainty <= 2 the margin note is "You hedged." (always). Certainty 5 note pool is "Noted." and the like (17.14).
4. **Same label twice in a row** (case-insensitive): Pruitt notes it ("the Examiner notices"); the grade still re-rolls. **Chip reuse**: a label chosen from chips counts a reuse and Pruitt mocks it once every 3 reuses.
5. **Technically Correct**: `/^(a |the )?cloud$/i` on the trimmed label. Always accepted, "technically correct" demeaned, `technicallyCorrect++`, +1 Ledger book (shelf draws up to 12 books; name tag at 10; audit at 25; the Ledger gets an A with stamp at 50, see 17.4).
6. **Dog**: 3rd label containing the word dog this mount triggers "the dog is tired" (17.5).
7. **Rabbit quota** (introduced by Sandra at beat 6, from 3:30): labels containing rabbit/bunny/hare count against "2 per hour" (an hour is 3 minutes of play); the clipboard shows `Rabbits issued this hour: n/2`. At 2/2 any further rabbit label gets the "disappointed hare" line, same grade pipeline.
8. **Award and ceremony**: `api.award(award, 'filing')`; stamp ceremony +0.1 Meh; stat increments; Pruitt speaks at least once per label (the grade line). `api.sfx('stamp')` on the stamp, `blip` on tag placement, `tick` on pip changes.
9. **Notary**: every 5th filing arms the notary requirement (see 12.5).
10. **Every 10th filing**: rank promotion (17.16) with a 1 s ceremony and `api.sfx('tada')`, +1.5 Meh (lines in 17.13).
11. **Appeal** (button, once per graded cloud): `appeals++`, +0.3 Meh, Pruitt: "Appeal received. Appeal upheld, with enthusiasm. Original grade unchanged. Please do not thank me." The Examiner never changes the grade.
12. **Wrong label rare event**: 1 in 40 normal filings, the cloud itself speaks: a lowercase speech bubble from the cloud reads `actually i am a cloud`; Pruitt is visibly pleased for exactly one second (portrait goes smug 1000 ms) and retracts it (17.12). No achievement; +1 Meh.

The stamp: ink red `#d9453d` rounded rectangle with the grade in a heavy font, **misregistered** 3px offset ghost in `#ff6b5e` at 60% opacity, animation 120 ms scale 1.8 -> 1 and rotate 4deg, screen shake 80 ms on the sky (not under reduced motion), `api.sfx('stamp')`. It lands over the tag and fades out after 3 s. **The first stamp of the session always lands mirrored and on the wrong side of the paper**: apply `transform: scaleX(-1)` and offset 30px left, and Pruitt says "The first stamp always lands on the wrong side of the paper. It is a tradition, and it has no other function."

---

## 7. Margin notes and the "See me." ladder

After each grading there is a lilac (#b79ae6, handwriting-style italic) note on the clipboard. Guaranteed on the 3rd grading, then about 35% of gradings. Each "See me." increments `seeMeNotes` and the on-clipboard counter `See me: n`. The note text escalates with the counter (use the highest rung reached):

| counter | note text |
|---|---|
| 1-3 | `See me.` |
| 4-6 | `See me. (Room 7 1/2. Room 7 1/2 is a cloud. Bring a coat.)` |
| 7-9 | `See me. (Office hours are Thursdays, 3:00 to 3:00.)` |
| 10-14 | `See me. (This is double-booked with your other See me. Attend both. They are at once.)` |
| 15-19 | `See me. (The room is a cloud. The cloud is the room. I am in the cloud.)` |
| 20+ | `You may now see me. I am here. This is it.` |

Other notes (no counter): the 14 notes in 17.14.

---

## 8. Morph and ink run

- Each cloud has `morphT` = randInt(20,40) seconds. At 0 it picks a new pose (different from its current one), sets `morphProg` 0, puffs lerp over 12 s, then re-arms `morphT`. `stat morphs++`.
- When a labelled cloud's pose differs from `label.poseAtLabel` and `morphProg >= 0.5` and the tag is not yet `inkRun`: the tag gets class `inkrun` (CSS: `filter: blur(1.2px)`, letters lose contrast, a 6px drip pseudo-element animates downward), Pruitt stamps **OUT OF DATE** (smaller stamp, same animation), line from 17.6, `inkRuns++`, `api.sfx('bloop')`.
- **Relabel**: click the tag or select the cloud again. The first relabel per cloud is free; later relabels cost 0.1 Meh payable "to Sandra" (`api.award(-0.1)`, Pruitt line). The previous label moves to the Register (cap 30, FIFO). Relabelling a cloud 3 times in total: Pruitt "legally a different cloud" line.
- Relabelling an inked cloud awards a "Continuity Bonus" +0.3 Meh.
- Returned clouds: a Retired labelled cloud's label can come back (1 in 8 spawns when the Archive holds a labelled entry, after beat 8): the cloud arrives wearing that old tag (kind `returned`, new random pose), Pruitt 17.12.

---

## 9. Squint (hold) and floaters

Unlocked at 2:30 (beat 5), or after 3 early attempts.

- Hold Space / the Squint button / press-and-hold on empty sky for 400 ms. `squintEase` goes 0 -> 1 over 0.4 s (and back on release). The cloud layer is drawn with `ctx.filter = 'blur(3px)'` if `'filter' in ctx` else the canvas gets CSS `filter: blur(3px)` (set/unset on the canvas). The sky also darkens by 8% (overlay div opacity). Puff jitter is reduced by 65% (see Rendering), so shapes become readable.
- `squintSeconds` ticks once per held second (`api.stat.inc` each full second, no fractional stats).
- Pruitt allows **6 seconds** of continuous squint. At 7 s "squint debt" starts: up to 12 **floaters** (tiny translucent lilac `#b79ae6` dots, 3-7 px, drifting slowly across the screen in screen space) fade in. Clicking a floater labels it ("not our department", 17.7) and the floater pops. On release floaters fade over 3 s and are cleared.
- A squint held at submit time gives the +8 to the cosmetic R.
- `api.sfx('tick')` repeating each second while held (a held "tick").
- Each squint release: Pruitt "You released the squint. The cloud resumed being weather." (only after the first few; use the shuffle bag).

---

## 10. Head Tilt

Unlocked at 3:30 (beat 6), or after 3 early attempts. Hint line grows to include it.

- `tiltTarget` in degrees, in the range (-180, 180]. Q: -15, E: +15; wheel over empty sky: +/-5 per tick (sign by wheel direction); slider: any multiple of 15. Pressing past 180 wraps to -165 (full inversion is 180). The displayed `tilt` lerps toward `tiltTarget` along the shortest arc at about 180 deg/s.
- The whole scene rotates **inside the canvas draw** (not CSS), see 19. Tags, buttons and the desk stay upright because they are positioned in screen space with the same transform.
- The slider label reads `Head Tilt: {deg} degrees`; at 180 (|tilt| >= 170) it reads `Sky (Floor)`.
- `tiltMax` = `api.stat.max('cloud-gazer.tiltMax', abs)`.
- Alt keywords apply when |tilt| is in 60..120 (and in R, see 6).
- **Total Inversion secret**: |tilt| >= 170 held for 10 s (13.3).
- Pruitt "tilts in solidarity" at the first |tilt| >= 45: his portrait rotates 20 degrees for 1.5 s and returns (17.8).

---

## 11. Escalation timeline (the director)

The director runs from a single **beat clock** in seconds (`beatT`), driven by one managed interval at 250 ms (`api.setInterval`). The clock pauses while: the Examiner-out event is active, the certificate/chair swap is active, the micro-cloud event is active, and the tab is hidden. In `api.selftest` mode, multiply elapsed time by 8 (so beats fire during fuzz) and divide idle thresholds by 6.

Each beat has a start time AND a fallback so a player who does nothing still gets the jokes (beats advance by clock; some also trigger earlier on label counts). Use a `fired` set so every one-shot fires exactly once per mount.

| beat | time | trigger and content |
|---|---|---|
| B1 Calm | 0:00 | Sky fades in, 4 clouds. Line A1 immediately (the first joke fires at 0 s without any input, in the speech bubble and via `api.say`). Management mount line at ~2 s. A2 at 4 s, A3 at 9 s. If nothing clicked by 14 s one cloud pulses (scale 1.0 -> 1.06) and Pruitt says the nudge line. First sfx: soft `blip`. |
| B2 The Dissent | 0:20 | After the first filing the chips appear. By the 3rd filing, Pruitt explains the dissent in his own words (17.2): confidence is punished, hedging is rewarded. "See me." first appears on the 3rd grading (counter 1). The Certainty dial is now the real game. |
| B3 The Ledger | 1:00 | The Ledger shelf appears on the desk (also on the first 'cloud' label if earlier). Register drawer unlocked: Pruitt reads one former opinion aloud at an inopportune moment (17.15). 3 or more labels = he can also use the Register lines. |
| B4 Morph and Ink Run | 1:40 | First morph guaranteed at 1:45 (pick a labelled cloud if any, else any cloud). The first ink run produces OUT OF DATE and "the sky is unreliable" lines (17.6). The hint line gains nothing; the sky is now unreliable and Pruitt says that is policy, not the sky. |
| B5 Squint | 2:30 | Squint unlocks. Pruitt introduces the Squint Allowance (6 s). Hint becomes "Click a cloud. Say what it resembles. Hold Space to squint." Trainee Pell enters: from now on after ~40% of gradings Pell adds a timid second grade (17.16). |
| B6 Head Tilt | 3:30 | Tilt unlocks (hint gains "Q/E to tilt."). Pruitt tilts in solidarity at first tilt. Sandra's rabbit quota begins (clipboard line). Pell advances to 'probably'. Gerald cloud is guaranteed to appear between 3:30 and 4:15 if it has not spawned randomly (rare spawn odds 1 in 30 after that). Sandra citations begin (17.10). |
| B7 The Cloud That Resembles You | 4:30 | The You-cloud (kind `you`) drifts in, waves slowly, tag reads `{player}`. Pruitt panics politely (17.9). Management panic line. Pell leaves the room. A single bar of calm music-box tones (`tick`,`blip`,`bell` pattern at 200 ms spacing). `youClouds++`. It retires after 40 s or 15 s after being graded; another comes every 60-90 s afterwards. |
| B8 Bureaucratic Unhinging | 5:30 | Notary Cloud rule goes live. Wind readout begins. Form 27B/6 line. Promotion joke. Weather events (each once): backward cloud (8 s), Official Sunbeam, the Rabbit Dim (a forced unlabelled rabbit-pose cloud appears and the sky dims for 5 s). Returned-cloud spawns allowed. Missing Sock guaranteed between 5:30 and 7:00 if not yet seen (afterwards 1 in 40 per spawn, max once per mount). Moustache cloud 1 in 100 per spawn from the start. |
| B9 Strangely Touching | 7:00 | The Unlabelled Cloud starts trailing the cursor (see 12.6). Pruitt's loneliness leaks (17.19). At 7:30 the sun swells and glows; nobody labels it; Pruitt stays silent for 6 s; the module stops all `api.sfx` for 4 s (a `quietUntil` timestamp). At 8:00 the sun sets (it rolls its eyes) and **night mode** begins: dusk-lilac gradient, 6 stars, labelled `dots` by default (17.19). |
| B10 Certification | 9:00 or 60 filings (whichever first) | Certificate, then Chair Swap, then the Reset (section 14). |

After the first full cycle (after the reset), the director enters **loop mode**: every 45-90 s it picks one random event from {a You-cloud, a morph, a backward cloud, a sunbeam, a returned cloud, a Sandra citation, a wind update, an ambient line}. Recertification (60 filings) repeats a shortened ceremony (no chair swap): the certificate for 6 s, "Recertified. Valid until the next cloud." Then the Meh keep arriving in small amounts.

---

## 12. Special clouds and recurring bits

12.1 **The You-cloud** (kind `you`). Built from the 'you' pose. Tag auto-reads `{player}` (not editable). It waves slowly (the 10th "hand" puff orbits around +/-25 degrees). Labelling it gives grade `B` whatever you write; Pruitt says so (17.9). Each wave triggers a line the first three times. Typing `examiner` or `pruitt` (case-insensitive, substring) is the secret in 13.4.

12.2 **Gerald cloud** (kind `gerald`). Pose potato, locked (no morph), tinted brown `#b08a5a` with `globalCompositeOperation='multiply'` over the white fill (or simply a brown fill alpha 0.35 pass). When labelled, Gerald speaks via `api.say(..., {who:'Gerald'})` (17.11). If `api.flag.get('metGerald')` is true, Pruitt greets him by name and gets nervous (17.11 B lines). Sets `cloud-gazer.gerald`.

12.3 **The Missing Sock** (kind `sock`). Sock pose, lavender `#b79ae6`-tinted fill, a dotted trail behind it (3 px dots every 40 px, fading), crosses the whole sky at double speed (about 50 px/s), cannot be labelled, never returns. On crossing: Pruitt "on a journey" (17.11), sets `cloud-gazer.sockSeen`, `socks++`. Clicking the sock (hit test passes) gives "That is not a label. That is an observation." and the secret achievement `cloud-gazer.sock`. If it is never clicked: "Nobody saw that." when it exits.

12.4 **The Moustache cloud** (kind `moustache`). A normal cloud with a small dark curly moustache (two small arcs) drawn at its centroid, and a hidden Certificate of Authenticity Pruitt refuses to read. 1 in 100 per spawn. Labelling with any text: grade `Disputed`, +6 Meh, achievement `cloud-gazer.moustache`.

12.5 **The Notary Cloud** (leftmost cloud, from beat 8). Every 5th filing arms it: the current leftmost cloud gets a mustard dashed ring and a tiny tag `NOTARY` and the clipboard line `Countersignature needed`. Click it (or its button + Enter) to countersign: Pruitt "Countersignature received. The notary cloud said nothing..." (17.10), +0.5 Meh. The requirement expires after 20 s ("Sandra waived it") so it can never soft-lock; labelling is never blocked meanwhile. The notary tag never speaks. Re-resolve "leftmost" each frame, not once.

12.6 **The Unlabelled Cloud** (from 7:00). A 14px-wide cloud of 3 puffs, screen-space, lerping toward the pointer position (offset +18,+18, easing 0.08/frame; with no pointer yet it floats near the desk). It is drawn on top of everything. Clicking it or any attempt to tag it makes a tag appear for 600 ms then fall (a CSS fall animation) and Pruitt insists "There is no cloud there." Callbacks (each once): it dodges stamps (shifts 30px when a stamp lands), it gets between the player and the sun at 7:30, it is the last thing in the sky during the reset, and if the pointer is still for 20 s it lands on the desk next to Pruitt's coffee and resembles him (a 3-puff cloud with two tiny round glasses). After the first reset it permanently sits next to the coffee and ALSO keeps trailing the cursor ("everyone is fine with it").

12.7 **Birds**. Every 90 s three 🐦 emoji cross the sky left to right (screen-space, canvas `fillText` or DOM). Pruitt "Not clouds. Ornithology's." once, then silent.

12.8 **The sun** (always present, decor): a circle with a faint rolling-eyed face at the top right. Clicking it: "The sun is not eligible. It is on the other side of paperwork." Never labellable.

12.9 **Rank sash** (cosmetic): rank advances every 10 filings; stored in `rankIdx`. Ladder (wraps): `Amateur Looker-Up`, `Junior Overcast Associate`, `Senior Nimbus Technician`, `Cirrus Compliance Lead`, `Deputy Examiner of Fluff`, `Principal Interpreter of the Visible`, then `Amateur Looker-Up (Seasoned)` and the ladder repeats with no further suffix change. Rank badge on the desk shows the current rank. Rank gives nothing.

12.10 **Notice line** (desk, replaces the corkboard): one line that rotates every 90 s: `Notice: Rabbits are limited to two per hour.` / `Notice: Cumulus is Latin. Please use 'fluff'.` / `Notice: The Examiner's coffee is not a cloud.` / `Notice: Section 9 is closed for Section 9.` / `Notice: Wind is measured. It does not mind.`

---

## 13. Secrets and rare events

13.1 **LONG IDLE.** Idle = no pointer move/click/key for a period, counted only while the tab is visible.
- **60 s**: Pruitt labels the silence (17.18), clouds slow to 20% speed (lerp the speed factor), and a tiny cloud floats up from the desk and "spells nothing" (a small speech cloud with `...`).
- **120 s**: Pruitt enters the silence in the Register with grade Pending.
- **180 s**: the Examiner steps out. Portrait replaced by an empty chair, a sign reads `EXAMINER OUT: RESEMBLES LUNCH`, every cloud on screen is auto-graded `A` (small tags read `A`, "they know"), a cloud shaped like you sits in his chair (mini You-pose on the desk). `idles++`, +12 Meh once, achievement `cloud-gazer.longlook` (secret). The first input afterwards ends it: Pruitt re-enters and says "I was never gone. I was examining the carpet." and the beat clock resumes.

13.2 **SPAM.** If the ring buffer of cloud-clicks and filings has 9 or more entries inside 4 s (any combination), and not within 90 s of the last spam event:
- `api.award(-0.2, 'Rapid Labelling Surcharge')`, `api.sfx('bell')`, Pruitt rings the Security bell (17.20), `spam++`.
- Normal clouds drift off (stop spawning), the form closes, and **40 micro-clouds** (perfect single circles, radius 10-16, white outline) fill the sky from random edges. Clicking a micro-cloud pops a transient tag (floating text, 1.5 s, not a persistent DOM tag) that says `a cloud` and a tiny sfx; micro-clouds are never graded.
- After **20 s** the micro-clouds lerp into one huge word **STOP** (use a hardcoded 5x7 bitmap font for S, T, O, P; each lit pixel is a target for one micro-cloud; if fewer than 40 lit pixels, tile; if more, the extra circles are skipped) and Pruitt gets out a ruler (17.20). After 8 more seconds the event ends, normal clouds resume, +4 Meh, achievement `cloud-gazer.rapid` (secret).

13.3 **TOTAL INVERSION.** |tilt| >= 170 held for 10 s (the beat clock keeps running). Effects: clouds are labelled `lawns` in the render (tag text overridden visually only), the sun is drawn below the horizon line like a low lamp, the desk sign reads `Lower Examiner`, the slider reads `Sky (Floor)`, Pruitt refuses to discuss it (17.8). `inversions++`, +8 Meh once (`cloud-gazer.inverted` flag), achievement `cloud-gazer.inverted` (secret).

13.4 **LABEL THE EXAMINER.** When a You-cloud is on screen and the label contains `examiner` or `pruitt` (case-insensitive): Pruitt freezes (portrait stops blinking), the stamp comes down very slowly (1.6 s ease-in) reading `PENDING`, he takes two moments (two 1 s pauses with the bubble showing `...`), every cloud briefly adopts the Pruitt silhouette (a 4 s lerp to the you-shape with glasses, then back), he grades `A, Pending, indefinitely` and whispers "It does." (17.9). +15 Meh, achievement `cloud-gazer.examiner` (secret).

13.5 **Window resize.** On resize: Pruitt says the weather has been reflowed (17.21), and clouds are drawn squashed (scale Y 0.45) easing back over 600 ms. Below 500 px: "made smaller" line. Above 1000 px: stretch with a `boing`. 10 resizes in 20 s: the Window Sommelier line.

13.6 **Weather words.** Labels `storm`, `rain`, `weather`: a single raindrop falls onto the input (CSS), a thunderless flash (50 ms white overlay at 30% opacity), Pruitt's umbrella line (17.5). `management`: a clipboard-shaped cloud for 3 s (pose blob drawn as a rectangle of 6 puffs is fine) and Management says "I was not prepared for this." `sky`: Pruitt flinches. `gerald` when metGerald is false: the "who?" line.

13.7 **Repeat 'dog'** x3: the dog is tired (17.5). **'cloud'** is the Ledger gag (17.4).

13.8 **Moist.** Sandra's grade (see 6).

---

## 14. The not-ending (Certificate, Chair Swap, Reset)

Trigger: 60 filings in total, OR beat clock 9:00. Both can only fire once per cycle. If a modal event (idle-out, spam, inversion) is active, wait for it to end.

1. **Hush.** Music box slows: stop spawning, clouds drift to a halt, sfx `tick` at 400 ms spacing for 3 beats. Pruitt rises for the first time: the portrait stands up (CSS translateY -12px and scale 1.1).
2. **Certificate.** A paper card unrolls over the sky (CSS `scaleY` 0 -> 1 from top, 700 ms): double border, gold conic-gradient seal (rotated), title `CERTIFIED PROFESSIONAL CLOUD GAZER (PROVISIONAL)`, line `Signed: Examiner Pruitt. Countersigned: the notary cloud. Stamped: the Unlabelled Cloud.`, small print `Valid until the next cloud.` `api.sfx('fanfare')`, `api.confetti()`, and a toast `confetti`. Each confetti piece is "labelled confetti" (line only). +25 Meh (`api.award(25, 'Certification')`), achievement `cloud-gazer.certified`, `certified++`, flag `cloud-gazer.certified`, save `certified:true`. A "Continue" real button appears after 3 s (also Enter).
3. **Chair Swap** (first cycle only). The desk sign now reads `{player}, Chief Examiner`. Pruitt's portrait moves to the lower-left corner, small, in the player's old seat. Three clouds drift in, each carrying a tag by Pruitt in a small voice. The interface becomes: a big coral **DISAGREE** button (center), a small gray **AGREE** button (disabled), and a tiny **See me** note button.
   - Round 1: Pruitt labels the cloud `A rabbit.` Player presses DISAGREE. Pruitt: `Thank you.` +0.5 Meh. Rounds 2, 3, 4 with labels `A teapot.`, `A whale, I think.`, `A loaf. Possibly a loaf.` and thanks lines from 17.23.
   - Round 5: the You-cloud drifts in; Pruitt labels it `Rain.` The AGREE button becomes enabled and large. DISAGREE still works (he says "Thank you." and tags it again, up to 3 times, then quietly "Rain." and waits). Pressing **AGREE** does nothing except give him a very small, very quiet moment: the sound drops out for 4 s, he says nothing, then "Oh. Thank you." Fallback: if neither button is pressed for 90 s, Management says "The Examiner agrees with himself. This is allowed." and the swap ends.
   - At any time the **See me** button: Pruitt arrives immediately wearing a coat (🧥 emoji over the portrait, sticks for the rest of the mount), "I came as quickly as the coat allowed." Ends the swap early (jumps to Reset). Achievement `cloud-gazer.seeme` (secret), +5 Meh.
   - `swaps++`, achievement `cloud-gazer.swap` on finishing round 5 or via See me.
4. **Reset**, as if nothing happened. Curtain cut, the sky is the calm opening: 4 clouds, Pruitt back on the desk, certificate filed "under Provisional" (a tiny `Provisional` folder icon on the desk). Pruitt: "Recertification begins now." Management: "Session 2 of 1. Circling back to the sky." The **first cloud you ever labelled returns**, wearing your first-ever label (from `save.firstLabel`; if there is none, the label `rabbit`), graded one letter higher than before (cap at B+; if it was already B+ it stays B+), and Pruitt: "The cloud has apologized. Not in words." The Unlabelled Cloud now sits next to the coffee, resembling him, "and nobody says so." Pell has a desk (cycle lines 17.24). `cycles++` and the beat clock goes to loop mode. The tagline on the hint line changes to `Session {n} of 1`.
5. The game continues, there is no win state, the Meh keep arriving in small amounts. Subsequent recertifications repeat step 2 (shorter) and the Pell nameplate gag.

---

## 15. Economy

| source | Meh |
|---|---|
| a filing | `0.1 + R/40` (max about 2.45) |
| stamp ceremony | +0.1 |
| Appeal | +0.3 |
| relabel after ink run (Continuity) | +0.3 |
| rank promotion | +1.5 |
| notary countersign | +0.5 |
| squint released after >= 3 s | +0.1 (once per squint) |
| Gerald cloud | +1 |
| Moustache cloud | +6 |
| wrong-label rare event | +1 |
| Missing Sock click | +2 |
| Examiner secret | +15 |
| Long idle (180 s) | +12 |
| Spam event (after STOP) | +4 (after a -0.2 surcharge up front) |
| Total inversion | +8 |
| Certificate | +25 |
| Chair swap round | +0.5 each, +5 for See me |
| relabel fee (after the free one) | -0.1 |

Always call `api.award(n, 'short reason')`; use a small floor of 0.05. Call `api.say` at least once per label (through `speak()`). Stats increments listed in 4.

---

## 16. Achievements (declare all with `P.addAchievements`; ids prefixed `cloud-gazer.`)

| id | name | desc | icon | secret | reward | unlock |
|---|---|---|---|---|---|---|
| cloud-gazer.first | The Inaugural Utterance of the Entire Sky | Label your first cloud. Pruitt has already disagreed with it. | ☁️ | no | 2 | first filing |
| cloud-gazer.hedger | Chancellor of Maybe | Hedge on 10 filings (2 pips or fewer). Pruitt marked every one up and said so. | 🤷 | no | 5 | `check: s['cloud-gazer.hedged']>=10` |
| cloud-gazer.bold | Duke of Unearned Confidence | Be certain (5 pips) on 10 filings. The Board has noted the pips. | 🗣️ | no | 5 | `check: s['cloud-gazer.bold']>=10` |
| cloud-gazer.technical | Archduke of the Technically Correct | Label 10 clouds 'a cloud'. The Ledger now owns a shelf and a grudge. | 📚 | no | 5 | `check: s['cloud-gazer.technicallyCorrect']>=10` |
| cloud-gazer.squinter | Supreme Squinter of the Seventh Eyelid | Squint for a combined 60 seconds. Your eyes are in a union now. | 😑 | no | 5 | `check: s['cloud-gazer.squintSeconds']>=60` |
| cloud-gazer.tilt90 | Sovereign Tilt of the Northern Neck | Tilt to 90 degrees and label a mountain that was a rabbit. | 🏔️ | no | 5 | manual |
| cloud-gazer.gerald | Weather, Slightly | Label the potato cloud and be quoted by a vice president. | 🥔 | no | 3 | manual |
| cloud-gazer.certified | Certified (Provisional) | Receive the certificate. Valid until the next cloud. | 📜 | no | 10 | manual |
| cloud-gazer.swap | Disagreed With, Gracefully | Finish the Chair Swap. He was thanked for being wrong. | 🪑 | no | 5 | manual |
| cloud-gazer.inverted | Grand Marshal of the Upside Down Heavens | Hold the sky at 180 degrees for 10 seconds. The floor has no comment. | 🙃 | YES | 8 | manual |
| cloud-gazer.examiner | Lord Protector of the Resemblance That Dare Not Speak Its Name | Label the cloud that resembles you as the Examiner. He took two moments. | 🧐 | YES | 15 | manual |
| cloud-gazer.longlook | The Long Look | Idle for 3 minutes and receive the grade 'Present' (all clouds: A). | 🪑 | YES | 12 | manual |
| cloud-gazer.rapid | Rapid Resemblance Syndrome | File or click nine times in four seconds. The sky has called Security. | 🔔 | YES | 4 | manual |
| cloud-gazer.sock | Nobody Saw That | Click the Missing Sock. Unaccounted for, thoroughly witnessed, officially denied. | 🧦 | YES | 8 | manual |
| cloud-gazer.moustache | Authentic (Disputed) | Label the cloud with the moustache. The certificate remains unread. | 🥸 | YES | 6 | manual |
| cloud-gazer.seeme | Room 7 1/2 | Finally write 'See me'. He came in a coat. | 🧥 | YES | 5 | manual |

That is 16 achievements, 7 secret.

---

## 17. Lines (verbatim; this is the script). Each bullet is one line. 17.x groups map to the situations above.

Speak every Pruitt line with `speak(line, {mood, priority})`. Lines with `{tokens}` must be filled before display. "Pick" means a shuffle bag per group (never the same line twice in a row; never `Math.random`).

### 17.1 Opening, nudges, returning (B1)
- "Welcome to the Cloud Examination Hall. Please sit. Please look up. Please resemble nothing in particular."
- "I am Examiner Pruitt. I have examined 41,006 clouds and agreed with none of them. Select one."
- "Name what it resembles, state how certain you are, and I will disagree, in writing, on the appropriate form."
- "That one is waiting. It has been waiting since before it was a cloud."
- Management at mount: "Cloud Gazing is a professional role, Valued Employee. The hours are whenever clouds are."
- Returning (certified save): "Welcome back. Recertification is in progress. It has been in progress since you left."
- Returning: "I kept your seat. It is the same seat. It has been leaning."
- First stamp of the session (mirrored): "The first stamp always lands on the wrong side of the paper. It is a tradition, and it has no other function."

### 17.2 The Dissent explained (B2) and rules of the game
- "You are beginning to understand that confidence is punished. This is the policy. The policy is not a threat. It is a weather."
- "The Certainty dial is the real examination. The clouds are decoration. Please do not tell the clouds."
- "Everyone who is certain gets a D. Everyone who hedges gets a B. Nobody has ever compared notes. I like it that way."
- "I do not grade the cloud. I grade how sure you are about the cloud. The cloud is sure about nothing and has been a fine example."
- "Pass mark for resemblance is 7 1/2 percent. You passed. You failed the grade. These are separate forms."

### 17.3 Grades, by Certainty (use `{label}`, `{grade}`, `{R}`)
5 pips (bold):
- "'{label}.' Accepted. Graded {grade}. Confidence is not a qualification."
- "'{label}!' You said it like a fact. Graded {grade}. Facts are the Board's department."
- "You were certain. That is the first mistake and the one I enjoy most. {grade}."
- "'{label}.' Five pips of certainty. I have lowered the grade to {grade} out of respect for the pips."
- "A bold '{label}'. The Board takes boldness seriously and has graded it {grade}."
- "Certainty at the maximum. Grade: {grade}. The sky was not consulted."
4 pips:
- "'{label}.' Four pips. A lean toward certainty. Graded {grade}. I lean the other way."
- "I see '{label}', and I see you mean it, mostly. Graded {grade}, mostly."
- "'{label}.' Firm, but not firm enough to be admirable. {grade}."
3 pips:
- "'{label}.' Three pips. The exact middle of a feeling. Graded {grade}, for the middle."
- "You are halfway sure of '{label}'. So is the cloud, about itself. {grade}."
- "Graded {grade}. The middle is where the paperwork lives."
2 pips:
- "'{label}.' Two pips. A cautious label. Graded {grade}. I disagree with all of the caution."
- "'Maybe {label}' is a position. It has been graded {grade}, and it is not a position I can defend."
- "You hedged. It was noted. It was marked up to {grade}."
1 pip:
- "'{label}.' Accepted. Graded {grade}. The hedging was brave. I disagree with all of it."
- "One pip. You barely said it. {grade}. This is how I like my gazers: tentative, and wrong."
- "'{label}?' Graded {grade}. You hedged. The Board rewards hedging the way the weather rewards umbrellas."
- "A whisper of a label. {grade}. I have lowered my disagreement to a murmur."
Follow-ons (append one after the main line about 40% of the time, or use alone as the margin read-aloud):
- "Your label '{label}' has been entered in the Register of Things Clouds Look Like, under 'Disputed'."
- "Entered as Exhibit 4. There is no Exhibit 3. There never was."
- "A resemblance to '{label}' has been logged under Footwear (Hypothetical), Drawer 7 1/2."
- "I have taken '{label}' home for the weekend. I will return it on Monday, slightly worse."
- "The cloud has been informed of '{label}'. It continues to be the sky."
Resemblance reads (use as the clipboard sub-line and sometimes spoken):
- High R (>= 70): "Resemblance: {R}%. Remarkable. It is almost as if you looked. Graded {grade}, for looking."
- Mid/low R: "Resemblance: {R}%. Pass mark 7 1/2. You have passed. Please do not feel anything about it."
- Anti-climax (R < 5): "Resemblance: {R}%. Grade: A. I have no further comment, which is the comment."
- A-minus smudge: "The stamp read A-minus for 0.4 seconds. Ink issue. B-plus. I once saw an A-minus. It was a different cloud."
- Pending (rare): "Grade: Pending. It is the grade I am proudest of."
- Moist: "'Moist.' Sandra has issued a grade of her own. It is 'Moist'. I did not authorise this and I cannot unsee it."
- Empty label: "An empty label. Graded Pending, for courage. I have framed it. The frame is also empty."
- Repeat label: "'{label}' again. I notice that you believe in it. Graded {grade}, differently."
- Chip reuse: "'{label}', from the chips. Reuse is tracked. Reuse is mocked. Reuse is mine."
- Long label (>= 20 chars): "That is a very specific label. Clouds do not respect specificity. I admire you, privately."
- Label with a digit: "A label with a number in it. Cloud 7 1/2 does not exist. Accepted anyway, regrettably."
- ALL CAPS label: "All capitals. The cloud has been shouted at. It is now slightly damp."
- Squinted at submit: "You squinted. Squinting is leading the witness. The witness is a cloud."
- Fast filing (2nd filing within 4 s): "I will need you to slow down. The clouds can see you writing."
- Ceremony stamp subtitle (tiny, under the stamp, shuffle): "Initial here. Not there. Here." / "Filed. Not read." / "Stamped in good ink, bad faith."

### 17.4 Technically correct and the Ledger
- "A cloud, you say. Technically correct, the lowest form of correct. It has been placed in the Ledger."
- "'Cloud.' Correct. Unacceptable. Filed under Things That Cannot Be Argued With, which is the room I argue in."
- "Cloud. Again. The Ledger has taken a second book. The shelf is concerned about its load rating."
- At 10 uses: "That is the 10th time you have said 'cloud'. The Ledger now has its own shelf. The shelf has a name tag."
- At 25 uses: "Sandra from Compliance has audited the Ledger. It contains 25 clouds. Sandra is satisfied and does not know why."
- At 50 uses: "The Ledger has been awarded the grade you never got: an A. It has been stamped. The Ledger is thrilled."
- Shelf name tag text (draw on the shelf at 10): `LEDGER (TECHNICALLY)`.

### 17.5 Easter-egg labels
- dog (3rd): "'Dog.' Third time this session. The dog is tired. Please give the dog the afternoon off."
- dog (4th+): "The dog has filed for leave. It was approved. He is still here, out of loyalty."
- rain: "'Rain.' The cloud has been asked to rain on request. It has declined. It has a form for that."
- storm/weather: "That is not what we meant by weather."
- storm/weather (umbrella): "I have opened an umbrella indoors. Please strike that. It was a tradition."
- sky: "'Sky.' I would like to sit down. I am sitting down. I would like to sit down further."
- management (Management says): "I was not prepared for this."
- management (Pruitt): "Management has been labelled a very large clipboard. Management has asked not to be shown the cloud."
- gerald (unmet): "Who? Gerald has not been introduced to the sky. Please book a meeting."
- Rabbit quota (each rabbit label): "Rabbit issued: {n} of 2 this hour. The hour is measured by the Hall clock, which is a cloud."
- Quota reached: "Quota reached. By policy that cloud is a 'disappointed hare'. I will not say why. It knows."
- Sandra on rabbits: "Sandra from Compliance has limited rabbits to two per hour. This is not a rule about rabbits. It is a rule about the number two."
- Rabbit Dim: "A rabbit-shaped cloud has passed unlabelled. I have put out the lights in protest."
- Rabbit Dim (return): "The lights have been restored. The rabbit has not been informed. It was never going to be."

### 17.6 Morph and ink run
- "Label '{label}' has run. Ink and cumulus do not bond. Please relabel at the counter, which is a drawer."
- "The cloud has changed its mind about being a {pose}. You have not. This is called stubbornness and it is on my list."
- "Revocation Notice 14/R: your '{label}' has become something else. Please surrender the '{label}'."
- "The cloud has not apologized."
- "The cloud has not apologized. A form exists. It is Form 31-A. The cloud has not read it."
- "Relabel fee: 0.1 Meh, payable to Sandra, who has not asked for it and will not mention it."
- "The first relabel is free. It is the only free thing in the building. It was an oversight."
- "Policy states the cloud is entitled to change. The policy does not say who stands next to it when it does."
- "The sky is unreliable. This is not the sky's fault. It is policy. It is also the sky's fault. Both are on file."
- "Relabelled. Continuity restored. The cloud will outlive it by about forty seconds."
- Third relabel: "You have relabelled this cloud three times. It is now legally a different cloud, with the same lawyer."
- First morph (no label yet): "A cloud has changed shape unprompted. I have not seen anyone do that without a form."

### 17.7 Squint
- Unlock: "Squint Allowance is now in effect: six seconds. Hold Space. I have timed six seconds personally."
- "Squinting is permitted for up to six seconds. After six seconds it is just a face you are making."
- "You have squinted for 7 seconds. Your eyes have filed a grievance against the rest of you."
- "Those are floaters. Floaters belong to Optometry. We do not label other departments' work."
- Floater click: "That is a floater. It is not our department. It is not anyone's department. It has been drifting since 1987."
- Release: "You released the squint. The cloud resumed being weather. It seems relieved."
- Combined 60 s: "Combined squint time: 60 seconds. Your eyes now have a union. The union has a representative. It is also your eyes."
- Early attempt 1: "Squinting is not yet permitted. It is scheduled. Please look at the schedule with both eyes."
- Early attempt 2: "Squinting has been requested twice. It is in the queue. The queue is a squint."
- Early attempt 3: "Fine. Squint Allowance granted early. This will be noted in a note."

### 17.8 Head tilt and inversion
- Unlock: "Head Tilt is now authorised. Q and E. Fifteen degrees each. I have measured the degrees personally."
- "Tilting your head is allowed. Tilting it in a way that makes me tilt mine is Section 9, and I am not discussing Section 9."
- "At 90 degrees the rabbit is a mountain. At 91 degrees it is a rabbit that has given up."
- Solidarity: "I tilted my head in solidarity. I have retracted it. Please strike it from the record. It is a record of my neck."
- Mountain: "A mountain. It was a rabbit. It is a mountain now because you are sideways. Both of you are correct, which I resent."
- "You are at {deg} degrees. I can still read you. I am sideways too, politely."
- Early attempt 1: "Head Tilt is Section 9. Not yet. Please hold your head at the angle it came in."
- Early attempt 3: "Fine. Head Tilt granted early. I am noting your neck."
- Inversion (start): "Upside down, the sky is the floor. The Examiner would like to not discuss the floor."
- Inversion (10 s): "The clouds are now lawns, on the ceiling. The sun hangs below like a low lamp. I am the Lower Examiner. I will not be discussing it."
- Inversion (end): "The sky is the floor. The floor has no comment."
- Slider label at 180: "Sky (Floor)".

### 17.9 The cloud that resembles you (B7) and the Examiner secret
- "That cloud resembles you. I want to be clear that it is not you. It is, however, your posture."
- Management (panic): "Please do not make eye contact with the weather. It makes the weather self-conscious and it rains."
- "The cloud resembling you has been graded. B. You did not ask. You will be told when you ask."
- "I have been asked to inform you that the cloud is waving. It has not been authorized to wave."
- "The cloud has waved again. I have not waved. I would like that noted."
- "It resembles {player}. I have taken a moment. I would like another. I will not be needing the second."
- Labelling the You-cloud: "'{label}'. Accepted. Graded B. It would have been B whatever you wrote. I checked. I wrote it first."
- Pell leaves: "Trainee Pell has left the room. He said he needed some air. There is only air."
- Pell leaves (Pruitt, quiet): "Mr. Pell is welcome to return. It would require him to have left."
- Examiner secret (freeze): "..."
- Examiner secret (1): "You said the cloud resembles me. I have taken a moment. It does. I have taken another moment."
- Examiner secret (2): "Label rejected: 'Examiner'. Label accepted: 'Examiner (Disputed)'. Grade: A, Pending, indefinitely."
- Examiner secret (whisper): "It does."
- Examiner secret (silhouette): "Every cloud in the sky has briefly adopted my silhouette. I did not authorise it. I did not stop it."

### 17.10 Bureaucracy (B6 Sandra, B8 Unhinging)
- "Sandra from Compliance has flagged 'cumulus' as too confident and also Latin. Please use 'fluff'."
- "Sandra has ruled that clouds may resemble anything except Sandra. This is not a rule. It is a request."
- "Sandra has flagged 'obviously'. It was not in your label. She flagged it anyway, in advance."
- "Sandra from Compliance countersigns the notary cloud. She does so from a distance, and by implication."
- "New policy: every 5th label must be countersigned by the notary cloud, leftmost. It does not speak. It never has."
- "Countersignature received. The notary cloud said nothing in a firm and legally binding way."
- "The countersignature window has closed. Sandra waived it. She waived it the way a flag waves, without being asked."
- "Per Form 27B/6 (Cloud Resemblance Addendum), you must state your Certainty in good faith. I will then take the other side."
- "Wind is now being measured. Wind is 11 miles per hour in the direction of 'away'."
- "Wind update: 11 miles per hour, 'away'. It has not changed. It is thorough."
- "Congratulations. You have been promoted from Cloud Gazer (Trainee) to Cloud Gazer (Trainee, Senior)."
- "I have double-booked your 'See me' notes. Please attend both. They are at once."
- "A cloud has drifted backward for 8 seconds. I take it personally. It had been going so well."
- "An Official Sunbeam has been issued. Please do not look directly at the paperwork."
- "A cloud has returned with your label. It is not the same cloud. It insists it is."
- "The Archive of Cloud Retirement has received another cloud. It is the next cloud."
- Retired: "Cloud {n} has been Retired to the Archive of Cloud Retirement, which is the next cloud."

### 17.11 Cameos: Gerald, the Sock, Dennis
- "A cloud shaped like a potato. Gerald, VP of Spuds, notes: 'Cloud is potato that has given up on ground.' Not endorsed."
- Gerald says (`who:'Gerald'`): "A cloud is a potato that has given up on the ground. I respect the decision. I have not made it myself."
- Gerald says (alt): "I have always been a little bit weather."
- Gerald (metGerald): "Vice President of Spuds. I did not realise he was precipitation."
- Gerald (metGerald, nervous): "Gerald. A pleasure. Please do not look at my grades. They are not there. They are pending."
- Gerald submitted label: "Gerald has submitted a label from the lobby: 'Me.' Graded A. I have never been more afraid."
- Sock: "A cloud shaped like a sock has crossed the sky. It did not stop. It had somewhere to be."
- Sock: "The sock-cloud is not eligible for labelling. It is on a journey. Please look away respectfully."
- Sock (nobody clicked): "Nobody saw that."
- Sock (clicked): "That is not a label. That is an observation. It has been filed under 'Nobody Saw That'."
- Sock (Management): "The Missing Sock has been sighted. Unaccounted for. Presumed on a journey. The journey has been updated."
- Dennis: "Dennis (Plant) has been consulted regarding clouds. Dennis (Plant) said nothing and grew."
- Dennis (Leaf): "A plant has labelled every cloud 'Leaf'. I am told this is the correct order of things."

### 17.12 Moustache, returned, wrong-label, rare
- Moustache: "This cloud is wearing a moustache. I have a certificate of authenticity for it. I will not read the certificate. Disputed."
- Moustache (after): "The certificate has been returned to its drawer. The drawer is breathing."
- Wrong label: cloud bubble `actually i am a cloud`
- Wrong label (Pruitt, one second): "I would like to say that was correct. I will say it once. It is said."
- Returned cloud: "A cloud has returned with your label. It is not the same cloud. It insists it is."
- Sun click: "The sun is not eligible. It is on the other side of paperwork."
- Birds: "Not clouds. Ornithology's."

### 17.13 Rank promotions (every 10 filings)
- "Rank achieved: {rank}. Benefits include a lanyard and the sensation of being looked down on from above."
- "Rank achieved: {rank}. Your jurisdiction is fluff. It has always been fluff."
- "Rank achieved: {rank}. This confers nothing. It confers it ceremonially, with a trumpet blip."
- "Rank achieved: {rank}. You may now disagree with me. I will not hear it. It is a privilege."
- Top: "Rank achieved: Principal Interpreter of the Visible. The next rank is 'Amateur Looker-Up (Seasoned)'. Thank you for your service."

### 17.14 Margin notes (short, lilac)
`You hedged.` / `Noted.` / `See me.` / `Wrong in a promising way.` / `Neater than the cloud.` / `Who taught you to look?` / `Initial here. Not there. Here.` / `This is a note about the other note.` / `Pending my feelings.` / `Check the Register.` / `A cloud would have hesitated.` / `Ink issue.` / `Disputed. Warmly.` / `Is this a Tuesday?`

### 17.15 Register reads (the Ledger of Former Opinions)
- "At {time} you said '{label}'. It was not {label}. It was never {label}."
- "The Register holds {n} of your former opinions. They are in a drawer. The drawer is not on your side, but it is not against you."
- "I am going to read you the label you submitted at {time}. '{label}.' It was not that. I have it in writing."
- "Your first opinion in this Hall was '{label}'. I have kept it. I am not sure why. It is not a good opinion."
- Register overflow: "The Register is full. The oldest opinion has been let go, with severance of 0 Meh and a sincere nod."

### 17.16 Trainee Pell (from 2:30 until the first You-cloud; again after the reset)
Level 0 (timid):
- "Trainee Pell: Maybe a B? I could be wrong. I am usually wrong. It is why I was hired."
- "Trainee Pell: Perhaps B-minus? If that is allowed? I will check if it is allowed."
Level 1 (3:30):
- "Trainee Pell: Probably a B. I have a feeling. I have had it for almost a minute."
- "Trainee Pell: Respectfully, a C-plus. I am not sure. I am a little sure."
Level 2 (after the first reset):
- "Trainee Pell: A B. Definitely. I checked twice, and the second time I agreed."
- "Trainee Pell: I am overturning that. Please do not tell me I cannot."
Pruitt retorts:
- "Examiner Pruitt suggests that Trainee Pell might be a draft."
- "Trainee Pell is not a policy. Trainee Pell is a lanyard with a person in it."
- "Trainee Pell dreams of giving an A-minus. I have a form for dreams. It is in the drawer with the A-minus."
Promotions:
- "Trainee Pell has been promoted from 'maybe' to 'probably'. He is not ready."
- "Trainee Pell has been promoted from 'probably' to 'definitely'. He is less ready."

### 17.17 Ambient and idle fillers (play one when 25 s pass without a filing; shuffle bag)
- "A cloud has passed. It did not stop. It had somewhere to be. All clouds do."
- "I have examined 41,006 clouds. This one makes 41,007. I will not be keeping count. I am."
- "A flock of birds has crossed. Not clouds. Ornithology's."
- "The sky is large. Management would like to confirm that this is within policy."
- "The Examiner is not angry. The Examiner is calibrated."
- "GPA: weather. It has always been weather."
- "Tuesday is at 4:17 PM today. I will not say more. I will be indoors."
- "Please do not tilt your head yet. I can see that you are thinking about it."
- "A cloud has the shape of an opinion. I did not say whose."
- "The coffee has been cold since 2:15 PM. I do not mind. It is a quiet cold."
- "I have been looking up for a very long time. It is, I am told, the job."

### 17.18 Idle (13.1)
- 60 s: "You have not moved in 60 seconds. I have labelled the silence. It resembles a Tuesday."
- 60 s (2): "Still here? So am I. Neither of us is doing the clouds any good."
- 60 s (clouds): "The clouds have slowed to a fifth of their speed. They are being polite."
- 120 s: "The silence has been entered in the Register. Its grade is Pending."
- 180 s: "The Examiner has stepped out for 'a moment' (4 minutes). In the interim all clouds are graded A. They know."
- 180 s sign: `EXAMINER OUT: RESEMBLES LUNCH`
- 180 s (Management): "Valued Employee, you are being resembled in the Examiner's chair. This is not forbidden. It is simply not done."
- Return: "I was never gone. I was examining the carpet."

### 17.19 Strangely touching (B9)
- "Between us: I have never been right. It is the only reason I keep coming back."
- "I used to label clouds myself. Everything I said was 'rain'. They stopped letting me near them."
- "I think when I said 'rain' I meant 'come inside'. It is a long way to say a short thing."
- "The Unlabelled Cloud is back. There is no cloud there. It is following you and I am not going to say so."
- Click the Unlabelled: "There is no cloud there."
- Its tag falls: "The tag has fallen off. Tags do that around nothing."
- Sun: "The sun has come out. Nobody is going to label it. That is the rule and it is a kind one."
- Sun (after 6 s of silence): "Thank you for not labelling it. It has had a long day, being the sun."
- Sun sets: "The sun has set. It rolled its eyes on the way down. I did not see that."
- Night: "It is night. The stars are 'dots' by default. I did not choose it. I would have chosen worse."
- Star click: "Dots. They are dots. They are doing their best."
- Unlabelled lands on the desk: "There is a very small cloud next to my coffee. It resembles me. I would prefer not to be resembled. I will allow it."

### 17.20 Spam (13.2)
- Surcharge: "Rapid Labelling Surcharge: 0.2 Meh. Please slow down. The clouds can feel you coming."
- "Nine labels in four seconds. I have called Security. Security is a smaller Examiner."
- "Please stop. The sky is not a form. I have checked. It has no boxes."
- "Forty micro-clouds. Each is a perfect circle. This is the cloud's way of asking you to stop."
- Micro tag: "a cloud"
- "They are merging. They are forming a word. I do not like the word."
- "STOP. Capital letters. Eight feet tall. I have gotten out a ruler."
- "I have measured the word. It is nine units of STOP. I will be filing it."
- End: "The sky has returned to ordinary. Please understand that I was not frightened. I was thorough."

### 17.21 Resize
- "The weather has been reflowed. Please re-inspect your clouds for squishing."
- "The sky has been made smaller. Nobody asked it."
- "The sky has been stretched. It boinged. That is the correct response."
- Sommelier (10 resizes): "The window is a modest vintage, with notes of scrollbar and regret. Drink now."

### 17.22 Certificate and the not-ending (B10, 14)
- "You are hereby Certified: Professional Cloud Gazer (Provisional). Recertification begins immediately."
- Certificate small print: "Valid until the next cloud."
- "Confetti has been issued. Each piece has been labelled 'confetti'. They agreed."
- "Examination complete. Please remain seated for the next examination, which is this one."
- Management: "Congratulations on reaching the horizon, which is just where the sky was already."
- Chair swap: "Chair swap. You are now the Examiner. I will say what the cloud resembles. Please disagree. Take your time. It is the only time."
- Reset: "Recertification begins now."
- Reset: "Welcome. Please begin."
- Reset (Management): "Session 2 of 1. Circling back to the sky."
- Reset: "Nothing happened. I have been told to say so. I have said it, and it is true in the way that matters to the filing."
- Reset: "The cloud has apologized. Not in words."
- Reset: "Please note the small cloud by my coffee. There is no small cloud by my coffee."
- Reset (to you): "I was going to give you an A, then I remembered who I am."
- Loop (generic, recertification): "Recertified. Valid until the next cloud."
- Hint after reset: "Session {n} of 1."

### 17.23 Chair Swap
Pruitt's labels: `A rabbit.` / `A teapot.` / `A whale, I think.` / `A loaf. Possibly a loaf.` / `Rain.`
Thanks (shuffle, to each DISAGREE):
- "Thank you."
- "Thank you. I was certain."
- "Thank you. I had hoped you would."
- "Thank you. That is the nicest thing I have been told today. It is also the only thing."
- "Thank you. I will write it down."
- After AGREE: "Oh. Thank you."
- After AGREE (narration, in the bubble): "You agreed. The button did nothing. He looked at it for a long time."
- To the first disagree (once, in the bubble as narration): "'A rabbit,' says the former Examiner. You disagreed. He thanked you for that. He wrote it down."
- See me coat: "I came as quickly as the coat allowed."
- Fallback (Management): "The Examiner agrees with himself. This is allowed."

### 17.24 After the reset: Pell's desk cycle (one per recertification, in order, then repeat)
- "Trainee Pell has been given a desk."
- "Trainee Pell has been given a plant. The plant is not Dennis. Dennis has been informed."
- "Trainee Pell's nameplate reads Pell."
- "Trainee Pell's nameplate now reads Examiner (Acting). The Examiner has said nothing."
- "Trainee Pell's nameplate reads Pell again. Everyone is relieved. Pell is the most relieved."

### 17.25 UI strings (fixed)
- Hint: `Click a cloud. Say what it resembles.` (beat 5 appends ` Hold Space to squint.`, beat 6 appends ` Q/E to tilt.`)
- Buttons: `File It`, `Cancel`, `Squint (hold)`, `Appeal`, `Register`, `DISAGREE`, `AGREE`, `See me`, `Continue`
- Chips: shuffle bag defaults `Rabbit`, `Sock`, `Regret`, `Old Man Sandwich`, `Router`, `Tuesday`; thereafter the player's own labels, most used first (max 5 shown)
- Placeholder: `It resembles...`; Certainty label: `Certainty`
- Pips tooltip: `1: Perhaps` `2: Maybe` `3: Probably` `4: Quite` `5: Absolutely`
- Clipboard: `Grade: {grade}`, `Resemblance: {R}%`, `See me: {n}`, `Rabbits issued this hour: {n}/2`, `Countersignature needed`, `GPA: weather`
- Stamps: `OUT OF DATE`, `PENDING`, `DISPUTED`, `MOIST`, `NOT OUR DEPARTMENT`
- Desk: `Wind: 11 mph toward away`; rank badge text; sign `EXAMINER OUT: RESEMBLES LUNCH`; `Lower Examiner`; `{player}, Chief Examiner`

Line count check for the builder: sections 17.1-17.24 hold well over 130 distinct lines; the file must include at least 100 of them verbatim plus all the margin notes. Register them as a plain JS object of arrays in the module file (not via `P.addLines`), except add a handful to the `moduleEnter`/`moduleExit`/`tip` categories via `P.addLines` (three lines each, in the Management voice) to help the Lobby:
- moduleEnter: "{player}, Cloud Gazing is open. The clouds have already been looked at; please look at them again."; "The Examination Hall has a chair for you. It is warm. Nobody will say why."
- moduleExit: "You have left the Cloud Examination Hall. Pruitt has disagreed with your departure, in writing."; "The sky will keep. It always does. It has nowhere else to be."
- tip: "Tip: Pruitt rewards a hedge. Pruitt has never been told this about himself."; "Tip: The first relabel of a cloud is free. It is an oversight and it has been there for years."

---

## 18. Visual design

**Palette** (CSS custom properties on the module's `.m-cloud-gazer-app`):
- sky top `#8fd3f4`, horizon `#fff1c9` (a warm, slightly unwell afternoon); dusk lilac for night `#b79ae6` -> `#4a3f7a`
- outline `#2b2a33` at 3px (clouds, tags, buttons, desk), sticker shadow `3px 3px 0 #2b2a33`
- cloud `#ffffff`, underside `#fdeec6`
- tag paper mustard `#f2b632`, pen text coral `#ff6b5e`
- grade stamp ink red `#d9453d` with `#ff6b5e` misregistered ghost
- desk wood `#b5834a`, mint ruler `#7fd8b5`, lilac `#b79ae6` for margin notes, floaters, Pell
- paper `#fffdf4` with a faint radial-gradient dot texture; sky also has a 4% dotted-paper overlay
- fonts: `ui-rounded, 'Trebuchet MS', system-ui, sans-serif` for UI; `Georgia, 'Times New Roman', serif` italic for Pruitt's handwriting and margin notes. System fonts only.

**Cloud rendering (Canvas 2D, per frame, per cloud)**:
1. Pass 1: for each puff, `arc(x, y, r + 3)` filled `#2b2a33` (a single merged outline, no SVG goo filter).
2. Pass 2: for each puff `arc(x, y, r)` filled `#ffffff`.
3. Pass 3: an inner cream underside: for each puff a lower arc in `#fdeec6` (clip not needed; draw an arc segment from 0.15PI to 0.85PI with line width r*0.25 inside the puff).
Kind overrides: gerald brown tint pass; sock lavender fill and dotted trail; moustache curly dark arcs; you-cloud 2 eye circles and a smile arc and the waving hand; micro-clouds a single circle with outline; chair kind the same as normal.
Squint: `ctx.filter = 'blur(3px)'` around the clouds draw only, with a CSS fallback on the canvas.
Gradient and stars drawn inside the same rotated transform so the sky flips with the head.

**Sky details**: a sun with a faint rolling-eyed face (two dots with pupils drifting to the top) never labelled; 3 birds every 90 s; the Examiner's coffee steam as a 3-frame CSS animation on the desk (steps()); night mode after the 8:00 sunset (6 stars, drawn as 4-point sparkles, labelled `dots`).

**Pruitt's portrait (inline SVG 64x64 viewBox)**: round face `#f4d9b5`, round glasses with lens glare (white arcs), a tiny bow tie (coral triangle pair), one raised eyebrow (a rotate transform on one brow path), small mouth path. Moods via a `data-mood` attribute switching eyebrow rotation, mouth and eye size: `neutral`, `smug`, `shaken` (wide eyes), `quiet` (eyes half-closed), `out` (chair). Add a blink every ~5 s (managed timeout; stops during the Examiner secret freeze). On <= 480px replace with a 40px 🧐 badge.

**Tags**: mustard paper, coral pen text in a handwriting font, 2px outline, a thin SVG string path (quadratic curve) from the cloud anchor (top of the cloud) to the tag; tags are real `<button>` elements; text truncated to 14 chars with an ellipsis (full text in `title`). Ink run: `filter: blur(1.2px)`, text opacity 0.7, 6 px drip pseudo-element sliding down 14 px over 1.4 s.

**Desk** (96px): Pruitt portrait left (with the speech bubble tail pointing up-right into the sky), the clipboard in the middle (paper card, current grade huge, resemblance, see-me counter, rabbit quota, countersign line), right side a row of: Register drawer button, Ledger shelf (up to 12 tiny colored books; name tag at 10), rank badge, coffee cup with steam. Wood `#b5834a` with a mint ruler strip along the top edge.

**Head tilt**: handled in canvas, see 19. The tilt slider is under the sky and is the touch alternative.

**Reduced motion**: no wobble (static puff offsets), no screen shake, no portrait solidarity tilt, drift at 1/4 speed, stamps appear instantly.

**Accessibility**: each cloud a real `<button>` (aria-label as in 5); the form is a real `<form>` with a labelled input; the speech bubble is `aria-live="polite"`; focus rings 3px mint `#7fd8b5`; every chip and pip a real button; a visually hidden `<span>` mirrors the clipboard state.

---

## 19. Implementation hints (so the file stays under ~1800 lines)

**File layout** (rough line budget): 1) header, `P.injectCSS` (about 170 lines); 2) data: POSES, KEYWORDS, LINES (about 380 lines; long lines are fine, keep the arrays flat); 3) helpers `hash`, `fill`, `bag(arr)` (shuffle-bag), `clamp`, `lerp`, `sanitize`, `grade tables` (60); 4) state object `S` (40); 5) DOM build with `api.el` (150); 6) cloud model, spawn, retire (120); 7) draw loop (200); 8) input handlers and hit testing (150); 9) labelling, grading, stamps, notes (180); 10) director/beats (200); 11) special events: idle, spam, inversion, resize, secrets (200); 12) ending: certificate, chair swap, reset (150); 13) destroy and registration (40).

**Rotation (the single most important bug magnet).** Do not CSS-rotate. Keep one pair of helper functions and use them for EVERYTHING (draw, hit-test, tag position, button overlays, string paths, floaters):

```js
// world (wx,wy) -> screen (sx,sy); cx,cy = sky center in CSS px; a = tilt radians
function toScreen(wx, wy) { const dx = wx - W/2, dy = wy - H/2; return [cx + dx*Math.cos(a) - dy*Math.sin(a), cy + dx*Math.sin(a) + dy*Math.cos(a)]; }
function toWorld(sx, sy)  { const dx = sx - cx, dy = sy - cy; return [W/2 + dx*Math.cos(-a) - dy*Math.sin(-a), H/2 + dx*Math.sin(-a) + dy*Math.cos(-a)]; }
```

- The world is a square of side `D = hypot(W,H)` centered on the sky center (so rotating never reveals empty corners); clouds live in that world; spawn at world x = -120 (left edge of the world), retire at `D+120`. 85% of spawns get a y inside the visible band (the central H of D).
- In `draw()`: `ctx.save(); ctx.translate(cx,cy); ctx.rotate(a); ctx.translate(-D/2,-D/2); ...draw gradient, stars, sun, clouds in world coords...; ctx.restore();` then draw screen-space things (floaters, Unlabelled Cloud, birds, micro-HUD) with no rotation.
- DPR: `canvas.width = round(cssW*dpr)`, `canvas.height = round(cssH*dpr)`, `ctx.setTransform(dpr,0,0,dpr,0,0)`, `dpr = Math.min(2, devicePixelRatio||1)`. Pointer coordinates from `getBoundingClientRect()`; never mix backing-store pixels and CSS pixels. Re-measure on `resize` and on `ResizeObserver` (via `api.on(window,'resize')` plus a guard).
- Hit test = `toWorld(pointer)` then for each cloud front-to-back test every puff (distance < r + 4). Cloud buttons: place a `S*2.6` square at `toScreen(cloud.x,cloud.y)`.
- Tags are DOM at `toScreen(anchor)`; they never rotate. The SVG strings are updated in the same loop.

**Frame loop**: one `api.requestAnimationFrame` loop, `dt` clamped to 0.1 s, skip drawing when `document.hidden`, cap at about 30 fps (`if (now - last < 30) return`). All timers are `api.setTimeout/api.setInterval` (even stamp removal and CSS-class timeouts). Remount 20x must leave nothing behind.

**speak(text, opts)**: updates the in-module bubble (cap the text at 160 chars, `textContent`), toggles portrait mood, and calls `api.say(text, {who:'Examiner Pruitt', mood: opts.mood||'neutral', priority: opts.priority||0})` for every call whose priority >= 1 and for every 2nd lower-priority call (Lobby narrator panel should not drown). Always `try/catch`-free but guard that `text` is a non-empty string. `mgmt(text, opts)` is `api.say(text, {who:'Management', ...})`.

**Shuffle bags**: `bag(arr)` returns a function that cycles a shuffled copy via `api.shuffle`, re-shuffling when empty and never repeating the last element across a refill. One bag per line group. Use `api.line('moduleEnter')` etc. only for the Lobby categories.

**Beat director**: one `directorTick()` on `api.setInterval(250)`. State: `beatT`, `fired:{}`, `paused` flags. Write helper `at(sec, key, fn)` that runs `fn` once when `beatT >= sec` and `!fired[key]`. Use label-count shortcuts for beats B2 and B3. Never schedule long chains of `setTimeout`s for events; instead stamp `S.eventUntil` timestamps and test them in the tick, so destroy/idle/ending cannot orphan callbacks.

**Idle / spam**: `lastInputAt = api.now()` on `pointerdown`, `pointermove`, `keydown`, `wheel`, `input`. Idle level computed from `api.now() - lastInputAt` in the director tick (skip when `document.hidden`). Spam ring buffer `actions[]` pruned to the last 4 s each time you push; trigger at length >= 9.

**State machine for modal events**: `S.mode` in `{'play','away','spam','cert','swap','reset'}`. Only `play` accepts normal filing and director beats. Entering a mode closes the form and clears the selection; leaving restores `play`. Priorities: `cert/swap/reset` > `spam` > `away`. Inversion is not a mode (a flag on top of play).

**Selftest compatibility**: `api.selftest` multiplies beat clock by 8 and divides idle thresholds by 6; all random clicks/typing/keys must be safe; the module must produce >= 1 award, >= 1 say, >= 1 stat call within the first 100 steps (guaranteed by the A1 line at mount and by awards on any filing; also award 0.05 Meh for the first selection of a cloud in each cloud's life so even click-only fuzz awards).

**Content safety**: every string displayed from player text goes through `textContent`. Never concatenate `undefined`/`null`; grade index always clamped; token fill returns `''` (then collapse double spaces) for unknown tokens. Check for `NaN` in positions (guard `dt`, divide-by-zero in `toScreen` when `W` is 0 during layout).

**Fonts/emoji**: system only. Pruitt's 🧐 badge, birds 🐦, coat 🧥, Pell 🧑‍💼 (use a plain emoji, no ZWJ-dependent layouts; if you worry, use 🧑 only).

**Performance**: at most 7 normal clouds plus 40 micro-clouds plus 12 floaters; draw all with single paths per pass. If `ctx.filter` is unsupported fall back to CSS blur on the canvas (set a class on the sky). Tags <= 8 DOM nodes.

---

## 20. Risks: the five most likely bugs

1. **Rotation maths out of sync** between the canvas draw, hit-testing, the tag/button/string overlays and DPR scaling. Symptoms: clicks land on the wrong cloud when tilted, tags float away at 45 degrees, blurry or offset canvas on high-DPI. Mitigation: one `toScreen/toWorld` pair used everywhere, CSS pixels only, test at tilt 0, 45, 90, 180 and at dpr 1 and 2 with the shot tool.
2. **Key handling collisions**: Space/Q/E/N firing while typing in the label input; Space also clicking a focused button; Squint stuck on after `keyup` is lost (blur, tab switch, touch cancel). Mitigation: the target guard in section 5, `preventDefault` on Space only when handled, and release Squint on `keyup`, `blur`, `visibilitychange` and `pointercancel`.
3. **Leaks and orphans on destroy/remount** (fuzz harness fails): rAF loop or intervals started with `window.*`, `setTimeout` for stamp removal or ink drips, listeners on `document`/`window`, pointer capture, a `ResizeObserver` never disconnected. Mitigation: only `api.*` timers and `api.on`; an `alive` flag checked at the top of every callback; clear DOM in `destroy`; no chained timeouts, use `eventUntil` timestamps.
4. **Text-injection and token bugs**: unfilled `{label}`/`{n}`, `undefined`/`NaN` in the UI (empty label, emoji label, grade index out of range, negative hash, `$&` in replacement strings), a label of `{player}` or `</div>` being interpreted. Mitigation: a single `fill()` with a function replacer, `textContent` everywhere, grade clamp, `hash >>> 0`, and a mini self-check run in `?dev` that scans `root.textContent` for the forbidden strings.
5. **Director/modal-event soft locks and double-fires**: Examiner-out vs spam vs certificate vs inversion overlapping; certificate firing every tick at 60 labels; notary requirement never cleared; form open when the ending starts; micro-cloud event leaving input disabled; second mount reading stale save. Mitigation: `S.mode` state machine, `fired` one-shots, expiry timestamps for every requirement (notary 20 s, swap fallback 90 s), force-close the form on mode change, and cap/validate saved data on mount.

Also watch: `ctx.filter` cost and fallback; DOM growth (cap tags, register, toasts, floaters); reduced-motion paths; 360px layout (desk collapse, pip tap targets); and the 1800-line budget (keep line data flat and compact).

---

## 21. Acceptance checklist (the builder verifies with `node tools/selftest.js cloud-gazer` and `tools/shot.js`)

- First joke (A1) appears within 1 s of mount with no input; Management line within 3 s.
- Filing a label shows tag, stamp, grade line, clipboard grade and awards Meh within 2 s.
- 5 pips grades D-range, 1 pip grades B-range (with jitter), A-minus smudges to B+, R < 5 gives A.
- 'cloud' adds a Ledger book; 10 uses shows the name tag; shelf cap 12 books drawn.
- Morph causes OUT OF DATE; first relabel free, later costs 0.1.
- Squint blurs, Space is safe in the input, floaters after 6 s, release clears in 3 s.
- Q/E rotate the sky, tags and desk stay upright, slider works, 180 degrees reads "Sky (Floor)".
- You-cloud appears by 4:30 (or after the director fast-forward in selftest), tag shows the player name, Examiner secret works.
- Idle 60/180, spam 9-in-4s, inversion 10 s, resize, moustache, sock, Gerald all reachable.
- 60 labels or 9:00 triggers the certificate, chair swap (DISAGREE, AGREE, See me), and the reset with the first label returning; the game then continues.
- At 360px and 1400px it is usable; no errors, no `NaN/undefined/null/[object Object]`, no unbounded DOM, no leaks after destroy.
