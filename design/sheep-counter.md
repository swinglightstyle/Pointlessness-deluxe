# DESIGN BRIEF: COUNTING SHEEP (ACCURATELY) (id `sheep-counter`, category `game`)

File to build: `games/sheep-counter.js` (single file, vanilla JS, <= ~1800 lines, obey SPEC.md section 5 and VOICE.md; read both first).
Registration: `id:'sheep-counter'`, `title:'Counting Sheep (Accurately)'`, `tagline:'Count the sheep. Management counts them too. You will not agree.'`, `icon:'🐑'`, `category:'game'`, `unlockCost:0`, `tags:['counting','audit','sheep','pastoral-compliance']`.
CSS prefix `m-sheep-counter-`. Stats, achievement ids, flags: `sheep-counter.`. Line categories: `m:sheep-counter:<name>`.

This brief merges three pitches. SPINE = pitch 1 (night meadow, brass tally clicker, apex timing, audit receipt, Brenda ear tag, endings). BORROWED from pitch 2: the fence counts as half a sheep, variance is never zero (floor 0.5) and becomes a pet, backward sheep, the fence speaks and wants a gate, the empty-field achievement, sleep-ON-BREAK sign. BORROWED from pitch 3: the Reconciliation Ladder (variance in ever more specific units), sheep 7 1/2 stalled on the rail, Mr. Palisade Esq. billing in splinters, the rotating regulation signboard, the Sock, wool river, resize gag, "variance of the variance".
CUT as unbuildable or weak: two-lane double fences and "queue mode", hold-SPACE pre-count, right-click ear tag (replaced by a TAG button/T key), hoof tally and dreams tally as separate controls (the hooves live in the variance text only), Declare button (audits are automatic), Arrow-key-driven lanes, a second COUNT button for goats, "Goat counter" ledger column, shadow sprites per sheep beyond a simple ellipse, hold-B grant break, 1000-sheep ending (the ending is at 100).

---

## 0. DECISIONS THE BUILDER MUST NOT SECOND-GUESS

1. Beats are driven by SHEEP CROSSED (`S.crossed`), not by wall time. Wall time never advances the plot. This makes selftest, idle and hidden tabs trivial. Selftest just spawns faster (see section 15).
2. The true variance is never 0, with exactly two sanctioned exceptions (Dennis cameo, Immaculate Deficit secret). Floor is +-0.5.
3. After Beat 6 the displayed variance is ALWAYS 7 1/2 (in a rotating unit). It is always called correct. Nobody comments on it except the occasional deadpan line.
4. The fence is counted as 0.5 sheep by the Audit. Management reads this out as if normal. It is flavour only; it is not in the arithmetic (see 3.4).
5. The player's COUNT presses (Space/Enter/C/button/tap sheep) only ever add to YOUR COUNT. Nothing is ever refused. No press is wrong. The Audit judges.
6. Goat, Lamb, Tag, Recount, Object buttons are `<button>`s. Locked ones are `hidden` until their beat introduces them (COUNT and RECOUNT are always visible, so the fuzz always finds interactive elements).
7. Module narration goes through ONE helper `say(who, text, opts)`: it calls `api.say(text,{who,mood,priority})` for everything Management says, and for cast lines passes `who:'Mr. Palisade'|'The Stapler'|'Sandra'|'Gerald'|'Dennis'|'Fence'|'Sheep'`. Never more than one priority-0 line per 3.5 seconds (drop the rest silently). Tokens are substituted by the module itself (`{player}`=api.player.name, `{count}`). A visible string must never contain `undefined`, `null`, `NaN`, `[object Object]`.
8. All numbers shown to the player go through `n0(x)` (finite check, `Number.isFinite(x)?x:0`) and `fmtHalf(x)` (prints 7.5 as `7 1/2`, 0.5 as `1/2`... see 3.6).
9. Emoji used: only Emoji 12 or older. USED SET: 🐑 🐐 🐏 🥔 🤵 📎 📋 🌙 🧦 ☕ 💤 🌿 ⚖️ 🎓 📣 🏅 🔔. DO NOT use 🪴 🥲 🫡 or any ZWJ sequence (the pitch used 🪴 and a ZWJ judge; replaced by 🌿 and ⚖️). Run `node tools/lint.js games/sheep-counter.js`.

---

## 1. CONCEPT

Sheep jump a fence. You press a brass clicker as each one clears it. Management has its own count, held by the fence, which is a different number every time and is never allowed to agree with yours. A receipt-printing Audit reads out your count, the True Count, and a Variance that is never zero and is measured in ever more specific units: sheep, then hooves, then a feeling (named Philippa), then the concept of between. Within ten minutes: the sheep have a union, the Stapler represents them, a goat has filed a counter-count, the fence has retained counsel (Mr. Palisade, Esq.), one sheep (Brenda, ear tag #4) keeps coming back backwards as someone new, and the Audit has started counting YOU. Sleep, the stated purpose of counting sheep, is never reached, because the game is staffed. At sheep 100 the sheep hold up a sign reading AGAIN?, the fence retires with a gold watch, Fence, the Sequel is installed by Cousin Dave, and Night 2 begins with every sheep wearing a tie.

Tone: a night-shift audit of a meadow that does not appear to be anywhere. Sincere administrative devotion to sheep. Arc: normal -> weird -> bureaucratically unhinged -> strangely touching (the last lamb) -> back to normal like nothing happened (Night 2).

First joke within 10 s, with no input: at t=0.8s sheep 1 trots in and jumps; at t=2.5s the slip prints `Official Count: 1. Your Count: 0. Variance: 1. Please begin disagreeing.` (this is a slip line, not narrator); at t=4s Management says the welcome line (`welcome` bag, first entry). A player who does nothing sees the empty-field behaviour, not a dead screen.

---

## 2. CAST

- **Management**: default narrator (via api.say, no `who`).
- **The Fence**: 5 boards, 2 posts, with a face (two dots on the left post that blink when billed). Becomes **Fence, Esq.** (briefcase + nameplate) at Beat 6. Speaks once, flatly, via the 7-click secret.
- **Mr. Palisade, Esq.** (🤵): the fence's lawyer. Bills in splinters. His tie is the fence's mood.
- **Brenda** (ear tag #4, coral): the sheep who keeps coming back, always insisting it is her first jump.
- **The Stapler** (📎, union rep): demands. Optional callback to `api.flag.get('metStapler')`.
- **Sandra from Compliance**: never seen, only cited on slips and in lines.
- **Gerald** (🥔, VP of Spuds): one remark at the final count if `api.flag.get('metGerald')`; one line in the Palisade-era cameo otherwise unseen.
- **Dennis** (🌿, Lobby Plant): one cameo, makes variance exactly 0.0.
- **Sheep 7 1/2**: half-sized sheep clipped at the waist by the fence, stalls on the top rail 4 s.
- **The Sock** (🧦): jumps once, left to right, on a journey.
- **The Golden Ram** (🐏): idle-only visitor.
- **Cousin Dave** (also a fence): installs Fence, the Sequel at the end.
- **Philippa**: the feeling in the variance.
- **The Jury**: 12 tiny sheep (Brenda is one).
- **Tuesday**: looming. Never appears.

---

## 3. CORE MECHANICS (exact)

### 3.1 Layout (top to bottom in `root`)

1. **Header strip**: left = `Night N` + beat caption (small, e.g. `Night 1 · Shift 3`); middle = ODOMETER (YOUR COUNT, sign slot + 4 flip digits + a half-flip glyph) ; right = TRUE COUNT box (blurred `[REDACTED]` until first audit finishes, then the last True Count) and the VARIANCE rubber stamp (rotated -4deg, red-pen font, `mix-blend-mode:multiply`, re-stamps with a squash on each audit). A tiny ink-blob VARIANCE PET lives in the corner of the stamp (3.7).
2. **Sleep Progress** bar under the header (label `Sleep Progress`), see 3.8.
3. **The Field**: one `<canvas width=640 height=400>` (16:10, CSS `width:100%;height:auto`, max-width 720px) plus absolutely positioned DOM overlays: the signboard, the Palisade motion bar, banners, the jam sign, the sleep dim. Canvas draws everything with sticky logical 640x400 coordinates (no DPR scaling needed; fine to leave slightly soft).
4. **Count Pad**: one huge brass COUNT button (🐑 on it, `aria-label="Count"`, min height 88px on phones and full width, 72px+ on desktop, radial-gradient dome). Below it a row of 48px+ buttons: RECOUNT (R), GOAT (G, hidden until Beat 3), LAMB (L, hidden until first lamb), TAG (T, hidden until Brenda debut), OBJECT (F, hidden until first audit prints; only active during the objection window), and later SUSTAIN (S) / OVERRULE (O) inside the motion bar.
5. **Audit Slip**: narrow receipt-paper column (torn bottom edge via `conic-gradient` mask), monospace, prints line by line. On >= 800px wide it sits at the right of the Field and Pad; on narrower widths it stacks below and its max-height is 240px with its own scroll (a tiny `Slip` heading acts as the drawer label; it auto-scrolls to the bottom while printing).
6. **Fence Invoice** (appears at Beat 6, tiny card under the slip): itemised bill, total pinned at `7 1/2 splinters (carried)`, one button `Settle Later`.
7. **Status row** (2 lines): `Sheep seen {n} / Sheep counted {n} / Sheep believed {n}` and `Variance Owed {n} sheep (heirloom) · Fence Retainer {n} splinters · Local 7 1/2: {n}%`. `believed = floor(seen * 0.75)`.
8. **Caption** (`aria-live="polite"`, `role="status"`): shows the latest stamp text (`CLEAN COUNT`, `PREMATURE`, etc.) and the last Management line the module itself spoke. Max 1 line.

### 3.2 The jump (delta-time everything)

- A sheep trots in from x=-40, crouches 250ms (scaleY 0.8, scaleX 1.15), leaps along a parabola, lands (scaleY 0.85 for 120ms), trots out to x=700.
- Positions in logical px, ground y=300, fence at `fenceX`=320 (plus nudges and the resize shift). Jump spans x from `fenceX-90` to `fenceX+90`; apex height 120px. Approach trot 1.4 s, exit trot 1.2 s.
- Jump duration `dur`: 1600ms at Beat 1, linearly down to 1000ms at Beat 8 (never below 900ms), Beat 4 gives a stiff-upright variant (no leg tuck, body rotation locked to 40 degrees, `dur` +100ms) for 20s of sheep, and the strike "work to rule" variant is slow and upright. Lambs have a wobbly extra sine term (amplitude 6px) and 60% scale.
- Spawn gap: `3400ms` at Beat 1, linearly down to `2300ms` at Beat 8, minimum `dur+600ms` (so a sheep is never on top of another). First sheep spawns at 0.8s.
- Shadow: grass ellipse under the sheep, scale `1 - 0.5*(height/120)`.
- `sheep.apexT = takeoffT + dur/2`. A faint HALO (an ellipse stroke 4px, `rgba(255,243,176,.35)`) is drawn at the apex point of the NEXT sheep to jump, with radius proportional to the +-120ms window (visual only).
- Max 12 sprites in the pool (recycled objects, never `new` per frame beyond the pool).

### 3.3 COUNT, and the three stamps

Controls that COUNT (all call the same `doCount(src)`): click/tap the COUNT button; Space or Enter when focus is NOT on a button (so the focused button's own click fires exactly once); the letter C anywhere in the module; clicking/tapping a sheep on the canvas (hit test, 36px radius); touch on the lower-half COUNT button.
Effect: `S.yourCount += 1`, `S.presses += 1`, stat `sheep-counter.counted`.
Classification is against the NEAREST sheep with `takeoffT-700ms <= now <= landT+700ms` and not already counted (if all are counted, the press is a DOUBLE: bubble `counted twice`, no Meh, no stamp):
- `delta = now - sheep.apexT`; `|delta| <= 120` -> **CLEAN COUNT** (mint stamp, `api.sfx('stamp')` + 'tick', award 0.2).
- `delta < -120` -> **PREMATURE** (mustard stamp, 'tick', award 0.1).
- `delta > 120` -> **RETROACTIVE** (lilac stamp, 'tick', award 0.1).
- No sheep near -> **SPECULATIVE** (coral stamp, 'blip', award 0.1).
Each sheep gets one micro speech bubble (from `bubbles` bag) drawn on the canvas for 900ms. The odometer rolls (CSS transition 200ms `steps(6)`). The clicker button depresses 4px (transform) and plays 'tick'. Management speaks roughly every 4th press (`S.presses % 4 === 0`): classification-specific bag first (`clean|early|late|none`) 60%, else `chatter` bag 40%.

### 3.4 The Audit

Trigger: when `S.crossed >= S.nextAudit` and mode is PLAY (never during STRIKE, JURY, LAMENT, ENDING or sleep; it simply fires on the next sheep afterwards). The sheep that triggers it is frozen mid-air at its apex (cute, and it gives the "technically on both sides" gag). `interval`: Beats 1-4 = 10; Beats 5-6 = 7; Beat 7+ alternates 7, 8 ("7 1/2, rounded to the nearest sheep, per policy"). `nextAudit += interval(beat)`.
Compute at audit start:
- `W` = sum of weights of sheep crossed since last audit: sheep 1, lamb 0.5, goat 0, concept sheep 0.25, backwards sheep -1, sheep-pair-in-coat 1.5, golden 0 (ceremonial), Sock 0, Brenda 0 (printed as `BRENDA: -1 and +1, net 0`), Sheep 404 0, half-sheep 7 1/2 = 0.5.
- `Pd` = sum of change in `yourCount` since last audit (COUNT +1, LAMB +0.5, RECOUNT -1; including presses during the audit freeze go to the NEXT interval).
- `diff = round2(W - Pd)` rounded to nearest 0.5, clamped to [-3, 3].
- Variance `v`: if `diff === 0` (the player was exactly right) then `v = +1` and the slip prints `RED FLAG: EXACTLY RIGHT`; else `v = diff`. `|v| >= 0.5` always.
- From Beat 6 onward `v` is overridden to `+7.5` (display `7 1/2`), unit chosen from the `unit7` rotation (3.6). Secret/Dennis overrides below.
- `trueCount = yourCount + v`. `S.owed += |v|` (Variance Owed, never collectible). `S.audits += 1`.
- Rung `r = min(7, S.audits)` (after incrementing `S.audits`): rung 1 at the first audit, +1 per audit survived, capped at 7 (3.6).
- Accuracy Index: audit 1 `94.1%`; if `diff===0` `100.0% (INVALID)`; Beat 6+ cycles `6.0 BILLION%`, `99.9%`, `7 1/2%`, `-4% (approximately)`, `100.0% (INVALID)`; otherwise `(99.9 - |diff|*2.4).toFixed(1)%` floored at `6.0%`. Stars `★★★☆☆` with `(stars are advisory)`.

Printing order on the slip (typewriter, ~55ms/char, a stamp slams on last line; `T(ms)` scaling): header `AUDIT SLIP No. {k}` / `SHEEP CROSSED: {S.crossed}` / `YOUR COUNT: {n}` / `TRUE COUNT: {n}` / `VARIANCE: {text}` / `ACCURACY INDEX: {x}` / (Beat 2-4: `FENCE (counted as 1/2): included`) / 2 random `clauses` lines / (Beat 6+: `LEGAL REVIEW: Mr. Palisade has billed this slip.`) / (Beat 5+: Stapler demand line occasionally) / a flavour line from the matching result bag / stamp (`UPHELD IN PART` coral, or `NOTED` mint). Management speaks the flavour line with priority 1.
Window: print ~3.5s, then the OBJECTION WINDOW stays open for 3s (`T`), shown as a thin draining bar on the OBJECT button; during it the OBJECT button is enabled and the VARIANCE stamp is clickable. If not used the audit ends, the frozen sheep resumes, `api.award(2,'audit')`, stat `sheep-counter.audits`. Max 3 slip cards in the DOM; the oldest is removed. The variance report log keeps the last 6 rows.

### 3.5 Objections

Trigger: F key, OBJECT button, or click on the VARIANCE stamp, only during the objection window. Spawns a tiny form card over the slip: a single checkbox `I understand this is final` that is checked and `disabled` (cannot be unchecked; clicking it makes a micro bubble `it cannot be unchecked`), a progress bar that fills to `99%` over 1.2s, shows `7 1/2%` for 1.2s, then `PROCESSING COMPLETE` over 0.6s (total 3s, scaled by `T`). Result is ALWAYS `UPHELD IN PART`: `v` changes by +-1 in a random direction (re-applying the |v| >= 0.5 rule: if the result would be 0 it becomes 0.5; from Beat 6 the variance stays `7 1/2` and the line says so). Objections can be filed indefinitely, one per audit window; each adds 1 Meh to the fence invoice `Objection fee` and `+1 hour` to the Fence Retainer. Rewards: award 2 for the first 3 ever, then 0.2. Stat `sheep-counter.objections`. The objection result re-stamps the VARIANCE.

### 3.6 Variance text and the Reconciliation Ladder

Variance number text: `fmtHalf(v)`: integer shows `1`, `2`; half values show `1/2`, `1 1/2`, `7 1/2`; negative prefixes `-`; positive prints a leading `+` on slips. Ladder suffix by rung (append after `{n} sheep`):
`r1: ''`, `r2: ', 3 hooves and a rumor'`, `r3: ', 3 hooves and a feeling (Philippa)'`, `r4: ', 3 hooves, a feeling (Philippa) and a tuft of wool in transit'`, `r5: ', 3 hooves, a feeling (Philippa), wool in transit and a sheep\'s reasonable doubt'`, `r6: ', 3 hooves, a feeling (Philippa), wool in transit, reasonable doubt and the concept of between'`, `r7: ''` but then the whole text becomes `variance of the variance: {n} (also off)`.
Beat 6+ unit rotation for `7 1/2` (`unit7` bag): `7 1/2 sheep`, `7 1/2 sheep-hours`, `7 1/2%`, `7 1/2 splinters`, `7 1/2 (units withheld)`. After the unit, the ladder suffix still applies.

### 3.7 Variance pet

Each audit whose |v| is 0.5 increments `S.pet`. At 3 recurrences a CSS ink blob (border-radius wobble keyframe, two dot eyes) appears in the stamp corner. Clicking it gives +0.1 Meh and a bubble. Stamp texts by recurrence: `Variance: 0.5, a historic low, noted and filed.` / `Variance: 0.5, again, historic.` / `Variance: 0.5, now a tradition.` / `Variance: 0.5. It has become a pet.` At the ending the pet is named `Variance` and given its own Employee ID (`E-7 1/2`).

### 3.8 Sleep Progress

A bar 0..1. Each CLEAN count +0.012, each other count +0.004, decay -0.0015/s. It "secretly empties 1px faster when you check it": pointerenter, focus or click on the bar subtracts 0.01 once per 600ms and may trigger a `sleep` line. Scripted: Beat 8 pins the label to `99%`, then `7 1/2%`, then `See Tuesday`. Never reaches 100%; clamp to 0.995 max.

### 3.9 Secondary controls (each introduced by an in-game event, never a manual)

- **G / GOAT**: introduced by the goat of Beat 3, which hands you a pop-up tag labelled `G`. Pressing within the nearest goat's flight (`takeoffT-300 .. landT+300`) = correct flag (award 0.2, `NOT TODAY` mustard tag stuck on the goat for 3s, stat `sheep-counter.goats-right`). Pressing on a non-goat = wrong flag (that sheep gets `TECHNICALLY A GOAT` tag, the nearest goat elsewhere gets `TECHNICALLY A SHEEP`, `sheep-counter.goats-wrong`). No goat or sheep near: bubble only.
- **L / LAMB**: introduced by the first lamb (Beat 3). Adds +0.5 to YOUR COUNT, half-flip digit, 'blip', award 0.1. The odometer's 1/2 glyph lights.
- **R or Backspace / RECOUNT**: always available. `yourCount -= 1` (may go negative; odometer flips red with a `-` sign), 'sad', the clicker ratchets backwards (CSS `steps(4)`), stat `sheep-counter.recounts`.
- **T / TAG**: introduced by Brenda's debut. A tag button "Tag ear". Pressing while Brenda is in the air = correct (stat `brenda-tags`, bubble `new`, after 3 -> `BRENDA VERIFIED` stamp and the Audit immediately reports she is someone else, +7.5 Meh once). On another sheep: `Brenda (apparently)` micro-tag for 3s.
- **F / OBJECT**: see 3.5.
- **S / SUSTAIN and O / OVERRULE**: only active while Mr. Palisade's motion bar is up (Beat 6+). Both pay 0.2, both bill the fence (+0.3 sheep splinters on the invoice). Stat `sheep-counter.motions`.
- **Arrow Left/Right**: nudge the fence 1px (`S.nudge` clamped +-40); cosmetic; 1 in 10 nudges a sheep bubbles `Thanks for the nudge.`
- **Typing `baa`** (consecutive keys b, a, a with focus inside the module, resets after 1.5s): the whole flock says `baa`, `baaa`, `baaaa` in sequence over 2s (bubbles on all visible sheep; if no sheep, three spectral bubbles on the fence), award 1, stat `sheep-counter.baa`, achievement `sheep-counter.fluent`.
- **Tap the moon** (canvas, ~40px radius): moon mood cycles neutral/yawn/looking-at-fence, bubble. 14 taps: line (`moon`) and a `NOTARY` stamp; costs nothing.
- **Click the fence 7 times** in a row while no sheep is mid-jump (reset counter if a sheep is mid-jump at the click or 3s gap): the fence speaks. See 11.

Keyboard rule: one `keydown` listener on `api.root` (with `tabindex=-1` on the root and the COUNT button focused after mount) handles `c g l r t f s o Backspace ArrowLeft ArrowRight` and Space/Enter when `e.target` is not a button/input/textarea/select/a; it calls `e.preventDefault()` for the keys it handles; ignores `e.repeat`; ignores keys with ctrl/meta/alt. Letters must not fire while `e.target` is an input. Pointer, touch and keyboard all work.

### 3.10 Awards (all tiny, game says so)

CLEAN 0.2; other counts 0.1; correct goat 0.2; lamb 0.1; audit survived 2; objection 2 (first 3) then 0.2; motion 0.2; Brenda verified 7.5; golden sheep counted 7.5; Dennis 1; Sock counted 1; last lamb jump 2; ending 25; spam fee -1; sheep woke you 0.5 (idle wake); `baa` 1; pet click 0.1. Management calls the amounts "a sum" and never explains.

### 3.11 Persisted state (api.save, key `s`, saved at audits, endings, and every 20 presses)

`{night, owed, splinters, union, total, endings, goldenLast, metSockNight}` all numbers/booleans. `total` = all-time presses. On mount: `night = save.night||1`. If `night >= 2` then sheep wear ties from the start, the first line is `night` bag #1 and the module starts at Beat 4 equivalents with `S.crossed = 21` and `S.loud = true` (no scripted intros repeat; `introduced` is a Set rebuilt from `night>=2`). `owed` and `splinters` carry (heirloom debt).

---

## 4. STATE MACHINE

Single `S.mode`, changed ONLY via `setMode(m, maxMs)` which stores a watchdog (`S.modeUntil = now + maxMs*1.5`); a per-frame check forces `PLAY` if exceeded (prevents deadlocks).
- `PLAY`: normal.
- `AUDIT`: meadow frozen, sheep stuck at apex, slip prints, objection window (max 12s).
- `HEARING`: objection processing (3s).
- `BREAK`: a union break sheep paused at apex for 1.5s (sub-state inside PLAY; others keep jumping).
- `MOTION`: not a mode; a overlay flag `S.motion` active 8s inside PLAY.
- `STRIKE` (Beat 8 at crossed 70, max 22s): sheep sit, Official count ticks, player counts sitting sheep.
- `JURY` (8s) right after STRIKE.
- `LAMENT` (Beat 9 at crossed 84, max 14s): last lamb; hold-press hope; 10s wait.
- `FINALE` (crossed 100): ending sequence (section 12), max 30s.
- `SLEEP` (idle 45s+): described in section 9; any input leaves it.
- Overlays (flags, not modes): `JAM` (3s), `ONBREAKSIGN` (7.5s), `RIVER` (3s), `MOON`, `HIDDEN` (tab hidden).
While `HIDDEN`, `dt` is forced to 0 (sheep hang in the air). On return: line `hidden` and a rubber `ON BREAK` stamp for 1.2s.
All `dt` clamped to `<= 100ms` before use. All timers via `api.setTimeout`; typewriter via one `api.setInterval` or chained `api.setTimeout`; ALL stored ids cleared in `destroy()` and on every `setMode`.

---

## 5. ESCALATION TIMELINE (by sheep crossed)

| Beat | Starts at crossed | What happens | New control / thing introduced |
|---|---|---|---|
| 1 Orientation | 0 | One white sheep, one fence, moon, halo. t=2.5s slip prints the first joke. t=4s welcome. Sheep 7 is followed by SHEEP 7 1/2 (half-sheep stalls on the rail 4s; audit weight 0.5). | COUNT, Recount, odometer |
| 2 First Audit | 10 | Meadow freezes, receipt prints. `YOUR COUNT 10, TRUE COUNT 11, VARIANCE +1 (the 11th sheep was shy)` style via the real formula, whatever it yields; Upheld In Part. The fence taps the OBJECT button on the screen (a bobbing arrow) to teach F. | OBJECT |
| 3 The Goat (and the lamb, and Brenda) | 14 | Sheep 14 is a goat in confident jump; it hands you the `G` tag popup. More goats, now in waistcoats (mustard rectangles). A goat claims to be a very tall sheep and files a counter-count (slip line). First lamb at 17. Brenda debuts at 20, entering from the RIGHT, jumping backwards. | GOAT, LAMB, TAG |
| 4 Regulations | 22 | The signboard unfurls in the field corner: rotating rule every 20s (`signs` bag). Sheep jump upright and stiff for ~8 sheep. Sandra flags the whole flock; the flock flags her back (`sandra` bag). Sheep 31 flagged by Sandra for having a sheep face. | signboard |
| 5 Unionization | 32 | Banner `SHEEP LOCAL 7 1/2` unfurls (lilac). The Stapler appears on the slip as Shop Steward with demands. From now every THIRD sheep takes a 15-minute break: freezes at the apex for 1.5s with ☕. Counting during the break = allowed (`sheep-counter.breaks-counted`), after = retroactive. Chanting bubbles. Audit interval drops to 7. | breaks |
| 6 Fence, Esq. | 44 | The fence grows a briefcase and nameplate `FENCE, Esq.`. Mr. Palisade appears behind it. Invoice card appears. Motions every 12-20s (SUSTAIN/OVERRULE). Audit gains a `LEGAL REVIEW` line. Variance is now always `7 1/2`. | S/O buttons, invoice |
| 7 Brenda Everywhere | 56 | Brenda's disguises ramp (hat 31, beard 43, goat 55, lamb 67, wearing the fence 79, two-in-a-coat 91). Sheep-pair-in-coat (signs: ONE OF US / ONE OF THEM / I AM TWO SHEEP IN A COAT; weight 1.5). A lamb promoted to Senior Sheep (lanyard of grass). Management cracks: `I just want us all to be on the same number`. Sock crosses sometime in 50-70. | pair sheep |
| 8 The Strike and the Jury | 68 | At crossed 70 STRIKE: all sheep sit; ledger counts anyway; you count the sitting; then JURY of 12 sheep (Brenda is juror 7) delivers 12 baas; `Technically Counting`. Second odometer `Times You Counted`. Sleep Progress goes 99% / 7 1/2% / See Tuesday. Dennis cameo at 74: variance 0.0 for the one and only time. | second odometer |
| 9 The Lament | 84 | Sky shifts to dawn lilac. Everything slows to quiet. One lamb at the far left refuses to jump. Wait 10s, or hold COUNT 1s (a hope), or just count it. It jumps. Cheer. `True Count: 1 (one of them was Brenda).` Then immediately back to billing. | hold-for-hope |
| 10 Final Count | 94-100 | Sheep keep going, louder rules, Sandra footnote, Gerald (if met). At crossed 100: FINALE. | ending |

Per-beat micro events (so something new happens at least every ~20s): signboard rotates every 20s (10s when `loud`); Palisade motion every 12-20s from Beat 6; half-sheep every 7 1/2 sheep; Brenda every ~12 sheep; Management every ~4th press; Sandra citations by slip.

The Dennis variance exception: at crossed 74 a leaf (🌿 drawn small on canvas) drifts across; Dennis `asks to be counted`; the next audit's `v = 0` exactly (prints `VARIANCE: 0.0`) and the Audit calls it `the most suspicious event of the night`; the NEXT audit is back to `7 1/2`. Award 1.

---

## 6. JOKES AND LINES (verbatim; copy exactly; all <= 140 chars unless marked long)

Register each bag with `P.addLines('m:sheep-counter:<name>', [...])` and read with `api.line('m:sheep-counter:<name>', {count})`. `{count}` is replaced by the engine; `{player}` too. Lines that need `{count}`: marked (C). Where a line has an apostrophe use a double-quoted JS string or a template literal.

### welcome
1. Welcome, {player}. Please count the sheep accurately. Accuracy will be audited.
2. Welcome, Valued Employee. Please count the sheep accurately. Accuracy will be audited at 10-sheep intervals, or sooner if we feel like it.
3. Your role is to count sheep accurately. Accuracy will be assessed by someone who has not seen the sheep.

### night (Night 2+, first line and loop lines)
4. Night {count}. All sheep are now wearing ties. This is not a promotion. It is a dress code.
5. Welcome, Valued Employee. Please count the sheep accurately.
6. Night {count}. Your inherited variance has been carried forward as heirloom debt. It has been in the family for 8 minutes.
7. Fence, the Sequel has been installed. It is the same fence, but it has a ribbon on it.
8. Brenda is back. #4, with a hat and the First Sheep's tag. She says she is new.
9. The field has been reset. Official Count: 1. Your Count: 0. Variance: 1. Please begin disagreeing. This is not a loop. It is a field.

### clean (CLEAN COUNT)
10. Clean count. The sheep felt that. It has not said anything, but the fence has noted it.
11. Sheep {count} has jumped. Per policy, it has stopped being a sheep and become a statistic. (C: pass crossed)
12. Counted at the apex. The apex has been informed. The apex asks to be left out of this.
13. Stamped at 4:17 PM near the third ficus. The ficus has been copied on this.
14. That was within 120 milliseconds of the apex. We do not know why we measure that. We are very good at it.
15. Accurate. The sheep has been counted exactly once, which is unusual and is being looked into.
16. A clean count. Somewhere, a very small ledger is pleased with itself.

### early (PREMATURE)
17. Premature. You counted a sheep that had not yet technically jumped. It is currently thinking about it.
18. Counted early. The sheep is still on the left, and legally a rumor.
19. Premature, noted, and filed under Anticipation (see also: Tuesday).
20. That sheep has not decided yet. You have decided for it. It is flattered, and a little pressured.

### late (RETROACTIVE)
21. Retroactive. The sheep was already on the other side. Legally, it is a different sheep now.
22. Counted late. The sheep has moved on and is now somebody else's responsibility.
23. Retroactive count accepted. Retroactive acceptance has been retroactively approved.
24. That sheep has landed. It would like to be referred to in the past tense.

### none (SPECULATIVE)
25. You counted a sheep that was not there. The sheep appreciates the confidence. The sheep is on its way.
26. Speculative count logged. Management files speculation under Hope, which is a different department.
27. A count with no sheep in it. It is the purest kind. It is also not allowed.

### recount
28. Recount. Sheep subtracted: 1. The sheep did not leave. It was never fully there. Closure is difficult.
29. You un-counted a sheep. It is now in a legal grey area, at the edge of the field, loitering.
30. Subtracted. The clicker ratchets backwards. It sounds like a tiny mind being changed.
31. Your count is now below zero. Management has no floor for this and is building one.

### lamb
32. Lamb recorded: 0.5 sheep. The other 0.5 is still in the lamb. We are trying to be supportive.
33. Half a sheep logged. Half a sheep is more than half a sheep in a coat, but not by much.

### goat (arrival, flag right, flag wrong, counted)
34. Sheep 14 is a goat. Please do not make a thing of it. The goat is making a thing of it.
35. Goats are not sheep. Sheep are not goats. This has never come up before and we are not prepared.
36. A goat has handed you a tag. The tag says G. You may now flag goats. The goat looks disappointed in its own cleverness.
37. Goat marked correctly. Goat tag reads: NOT TODAY. The goat has accepted this the way goats accept things.
38. That was a goat. Goats are, per Section 9, 'sheep-adjacent, but louder'.
39. You marked a sheep as a goat. The sheep has filed Form 27B/6. The sheep does not have hands. The form arrived anyway.
40. That sheep is now Technically a Goat. The goat across the field is now Technically a Sheep. Both are offended.
41. You counted a goat. It is now a sheep for the purposes of this meeting and a goat for the purposes of lunch.
42. The goat has submitted a counter-count. The counter-count is 'goat'. Management has noted the confidence.
43. A goat in a waistcoat has requested that you refer to it as 'a very tall sheep'. The request has been under review since 1998.

### audit-open
44. Reconciliation Interval reached. Please remain calm and in the field. The field is not a metaphor. It is a field.
45. The auditor has arrived. The auditor is a clipboard. The clipboard has a lanyard. Nobody has asked who is wearing it.
46. A sheep is in the air. Per policy, it is technically on both sides. It has been asked not to land until we finish.
47. Audit time. Please do not count during an audit. Counting during an audit counts as an audit.

### audit-result (generic, under or over)
48. The True Count includes one sheep you could not see. It was there. It was shy.
49. A variance of 1/2 has been recorded. It is the smallest variance we have ever achieved together. We have framed it.
50. Your count is within 4% of ours, which is the margin of error for this department, and also for love.
51. Close. Off by exactly the amount you feared.
52. Audit complete. Results are final and pending. Please recount, as results are final and pending.
53. Your accuracy is 99.9%. The missing 0.1% is classified. It went Tuesday.
54. Ruling: the sheep in the air was technically on both sides. It has been informed. It would like to land.
55. Audit note: the moon has been counted 14 times in error. The moon has not objected. The moon is not in the union.

### audit-exact (diff === 0, red flag)
56. You counted exactly right. Variance: +1. Exactness is a red flag. Please explain yourself in writing.
57. Your count and the True Count are the same. We have corrected the True Count. Please do not do that again.
58. Exact. The sheep are uncomfortable. The fence has asked for a lawyer, which it does not have yet.

### audit-close (|v| = 1 or 1/2: nearly agreeing)
59. Your count and the True Count are now only 1 apart. Please do not do that. It makes the sheep uncomfortable.
60. Management would like to confirm that your count is, at this time, within the range of the True Count's feelings.

### audit-7half (Beat 6+)
61. Variance: 7 1/2. Management notes that 7 1/2 is the correct number. Management also notes that this is the problem.
62. The variance is 7 1/2. It is always 7 1/2. We would like to thank you for your patience with the number.
63. Variance: 7 1/2. We have no further comment. We have all the comments, but they are 7 1/2 of them.
64. Legal Review: Mr. Palisade has read the audit. Mr. Palisade has billed for reading the audit.

### clauses (two per slip, shuffled, flavour only; format `CLAUSE x: ...`)
65. CLAUSE 3(a): sheep that jumped backwards count -1.
66. CLAUSE 7(b): a sheep that stood near the fence and thought about it counts 0.25.
67. CLAUSE 9: goats count 0 (sheep-adjacent).
68. CLAUSE 11: a sheep wearing another sheep's tag counts as that sheep, and also as itself.
69. CLAUSE 14.3: Brenda is governed by this sentence.
70. CLAUSE 22: ceremonial sheep are not included in the True Count but are included in your guilt.
71. CLAUSE 31: a sheep with a sheep face is flagged. Ruling by Sandra.
72. CLAUSE 40: half a sheep in a coat is 3/4 of a sheep in a coat, by ruling.

### objection
73. Objection filed. Please enjoy this progress bar. It is 99% complete. It has been 99% complete since 2011.
74. Your objection was received by a committee of one. The committee is out of the office, and is also the fence.
75. Objection upheld in part. The part that was upheld is the part that was not the point.
76. Objection to the objection: denied. Objection to the denial: also denied, and billed.
77. The fence has been billed 1 hour for your objection. It did not ask to be involved. It is a fence.
78. Upheld in part. The part is 7 1/2.
79. You have filed {count} objections. Management admires the stamina. The committee of one has requested a second committee. (C)

### half (SHEEP 7 1/2, ordered by appearance 1..)
80. Sheep 7 has been counted. Sheep 8 is coming. Something jumped between them. We are calling it 7 1/2.
81. Sheep 7 1/2 has returned. It waved. We have no policy on waving.
82. Sheep 7 1/2 now has a tiny name tag. It reads '7 1/2'. It is very proud of the 1/2.
83. Sheep 7 1/2 has been promoted to Associate Half. The promotion is a smaller lanyard.
84. Sheep 7 1/2 is on the picket line, carrying half a sign. The half that is showing says FEWER.
85. Sheep 7 1/2, seen: yes. The slip says so. The slip has always said so.

### signs (signboard rotating, prefix `RULE n:` added by the module; text only)
86. Jump at 40 degrees.
87. No jumping on Tuesday.
88. Sheep must declare intent.
89. Please do not count aloud.
90. Fence Code 4(b) applies to the fence.
91. Landing is not a right. It is a privilege.
92. Rule 7 is only half in force.
93. Sandra has seen this sign.
94. A sheep is a sheep until the Audit says otherwise.
95. Do not feed the sheep. Do not count the sheep you have fed.
96. The fence has the right to remain a fence.
97. Tuesday has not been informed.

### sandra
98. Sandra from Compliance has flagged the whole flock. The flock has flagged Sandra back.
99. Sandra has used the word 'fluffy' in a way that has caused concern.
100. Sandra has flagged sheep #31 for having a sheep face.
101. The signboard has been updated. The sheep are jumping very upright, which is the intended effect.
102. Sandra has added a footnote to the True Count. The footnote is also a count.
103. Sandra is thrilled and asks that this not be used as a precedent.

### union
104. SHEEP LOCAL 7 1/2 has been formed. They have demands. The demands are written in grass.
105. The Stapler has arrived. It says the sheep are 'not asking for much, just 11 percent and a stapler of their own'.
106. The Stapler recognises you from another department. It says the demands are the same. (only if flag metStapler)
107. Demand 1: shade. Demand 2: more shade. Demands 3 through 7: the same, but louder, and with a bit of shade.
108. Demand 7 1/2: a little more fence. Management would like to understand how much more fence it is possible to want.
109. Demand 9: a sheep named Gerald in a leadership role. Gerald is a potato. The sheep are aware.
110. WHAT DO WE WANT? FEWER FENCES. WHEN DO WE WANT THEM? After the next jump, but only if it is convenient.
111. Break time. The sheep in mid-air has paused for 15 minutes. Please do not count it until it has finished its tea.
112. Per the collective agreement, sheep may only jump at the apex on alternate Thursdays. Today is Tuesday. They are jumping anyway.
113. Counting is now 'tallying', and tallying may only occur between 9:15 and 9:15.
114. You counted the sheep on its break. It has been told it was counted. It continued with its tea.
115. Strike pay has been set at 3 hay per sheep. We do not have hay. We have forms that say hay.

### palisade
116. The fence has retained counsel. His name is Mr. Palisade, Esq. He has only ever represented the fence, and he is very good.
117. Mr. Palisade: 'Objection. My client has been jumped over 212 times without consent.'
118. Mr. Palisade: 'My client is a person for legal purposes.' The fence has not confirmed this. The fence is a fence.
119. Fence, Esq. objects. On what grounds? 'On the grounds that I am a fence,' says the fence. It is a strong argument.
120. Counting without representation. You have been stamped. The stamp is decorative. It looks very serious.
121. Plaintiff (Fence) versus You (Counting). The judge is a moon. The moon has not agreed to this.
122. Mr. Palisade has billed the fence 0.4 hours for this sentence. The fence has paid in splinters.
123. Sustained. The fence has been billed 0.3 sheep for the inconvenience of being sustained. The fence did not ask for this.
124. Overruled. The fence has been billed 0.3 sheep for the inconvenience of being overruled. The fence is beginning to see a pattern.
125. No ruling was made. The court rules this as a ruling. It is noted that nobody was in the room.
126. The fence is billing you 0.1 hours per sheep. The fence has asked that you not take it personally. It is entirely personal.
127. Mr. Palisade has requested that sheep jump at a respectful angle.

### motions (text of Palisade's motion bar; prefix `Mr. Palisade:` shown by UI)
128. Objection: the fence was jumped without consideration.
129. Objection: the defendant is counting in a tone.
130. Objection: that sheep was leading the witness over the fence.
131. Objection: my client would like it noted that he is a fence.
132. Objection: relevance. Of the sheep. To anything.
133. Objection: the moon is a biased notary.
134. Objection to this objection (it is mine, and it is sustained).
135. Motion to dismiss the field. The field is a field.
136. Motion for a gate.
137. Motion to be addressed as 'Fence, Esq., Esq.'

### invoice (rows; revealed in order; all values numbers via n0; total pinned)
138. Retainer: 0.7 Meh
139. Hourly: {hours} hours (0.1 per sheep)
140. Objection fees: {n} Meh
141. Notary (the moon): 0 Meh, 1 favour
142. Overnight surcharge: {n} splinters
143. Surcharge for referring to the surcharge: 7 1/2 splinters
144. Reading this bill: 0.1 splinters
145. Brenda (all), prorated (Night 2+)
146. Services rendered: a fence (final count only)
147. TOTAL: 7 1/2 splinters (carried)
Settle Later responses (`settle` bag):
148. Payment deferred. Deferral is a form of payment in some jurisdictions, none of which are this one.
149. The bill has been settled later. Later is a place. It is the same place as Tuesday.
150. Settle Later has been pressed {count} times. Later is getting crowded. (C: use own counter)

### brenda (debut, tag, disguises in order, jury, mentor, verified)
151. A sheep with ear tag #4 has entered from the right and jumped the fence backwards. Management has no category for this. It is Brenda.
152. Brenda has been counted as -1, and also as a new sheep, Brenda (2). The Audit sees no conflict.
153. Brenda has returned wearing a hat. Management cannot confirm that it is the same Brenda. Management would like to confirm that it is the same Brenda.
154. Brenda is back with a beard. It is not the goat's. We checked.
155. Brenda has returned as a goat. Brenda is not a goat. The Audit has counted her as Brenda (all).
156. Brenda has returned as a lamb. She is the same height. This has been ruled irrelevant.
157. Brenda has returned wearing the fence. She is the fence for the purposes of the jump. The fence has not been consulted.
158. Two sheep under one sheet. One of them is Brenda. The Audit is counting 1.5 sheep and an apology.
159. The Audit has decided to count 'Brenda (all)' as a single recurring sheep. Brenda has not been consulted. Brenda does not mind.
160. The sheep chorus asks you to stop making this about Brenda. The sheep chorus is making this about Brenda.
161. Brenda tagged, correctly. She has been recognised. She says she is new.
162. You tagged a sheep that was not Brenda. It is now Brenda (apparently). It has accepted the name.
163. BRENDA VERIFIED. The tag has been verified. The Audit now reports that she is someone else.
164. Brenda has been seated on the jury. She has recused herself, from herself.
165. Brenda has been appointed mentor to the last lamb. The lamb has not been told that Brenda is also its cousin.
166. Brenda counts too. (text on the final certificate stamp)

### sleep (Sleep Progress)
167. Your Sleep Progress is 99%. It was 99% when you started. It will remain 99% until Tuesday.
168. Sleep Progress has dropped to 7 1/2%. This is not a penalty. This is just math, as it relates to the fence.
169. Please do not check your Sleep Progress. Checking uses up 1 pixel of it.
170. Sleep Progress: See Tuesday.

### jury and audit of you (Beat 8)
171. The Audit is now auditing you. Under-clicking by 0.7 sheep per minute. We are concerned. Not for you. For the number.
172. Times You Counted: {count}. Times We Counted You: {count}. The second number is not smaller. We checked. (C: presses)
173. Your pressing rhythm has been audited as 'declared effort'. The effort was declared. It was not seconded.
174. The jury of 12 sheep has returned a verdict. The verdict was 'baa'. We are calling it Technically Counting.
175. You have been found Technically Counting. This is not a conviction. It is a condition.
176. Over-clicking by 0.7 sheep per minute. This is the same number. We have simply reversed the sign. (if presses/min > 40)

### strike
177. The sheep are on strike. They are sitting down. The ledger is counting them anyway.
178. Official Count is rising by itself. It is counting the absence of sheep. It is very accurate about the absence.
179. You counted a sitting sheep. The audit accepts this as a creative interpretation of the word 'jump'.
180. Strike over. The sheep have agreed to return. They have not agreed to jump, only to return.
181. The sheep are working to rule. They are jumping slowly, politely, and at exactly 40 degrees.

### cameos (Dennis, Sock, Gerald, Senior Sheep, Management cracks)
182. A leaf has drifted into the meadow. It is Dennis (Lobby Plant). Dennis has asked to be counted.
183. Dennis counted: 0 sheep, 1 colleague. Variance: 0.0. This is the first and only time. The Audit finds it very suspicious.
184. Dennis is thriving. The numbers do not know what to do with him.
185. A sock has jumped the fence, left to right. It was not on the list. It appeared to be heading somewhere.
186. The sock did not stop. The sock did not look back. The sock has places to be. Management says nothing.
187. You counted the sock. The Audit has no unit for sock. The Audit has made one. It is also sock.
188. A sheep has been promoted to Senior Sheep. The promotion is a tiny lanyard. The lanyard is a blade of grass.
189. I just want us all to be on the same number. Is that so much to ask. That was off the record.
190. Counting is just potatoes in a row. (Gerald, only if flag metGerald, final count)
191. Gerald (Vice President of Spuds) has observed that counting sheep is 'just potatoes with extra steps'. Gerald is wrong, and also somewhat right.

### rare (golden, 404, backwards, concept, pair, wool)
192. A golden sheep has entered with a drumroll. It is a ceremonial sheep. It is not a sheep. It is worth 7 1/2 Meh.
193. The golden sheep is not included in the True Count, but is included in your guilt.
194. You did not count the golden sheep. This is a principled position. Management does not understand it and will be writing it down.
195. The golden sheep has been counted. It has been counted warmly. It was a ceremonial count, and it was binding.
196. Sheep 404 (Auditor) has jumped. It scanned the odometer, counted you, and filed one line: 'Counted the counter: correct.'
197. A sheep has jumped the fence from right to left. Management has no category for this. Management has made one. It is Sheepback.
198. Sheepback logged. Your Meh for the reversal has been cancelled, and then credited back, with interest of 0.01 Meh.
199. A sheep stands at the fence and does not jump. It says it is 'conceptually across'. The Audit has counted it as 0.25.
200. A sheep is wearing a sheet, and another sheep is under it. Two sheep, one jump. We are counting this as 1.5 and an apology.

### lament (Beat 9)
201. The meadow has gone quiet. A single lamb stands at the far left. It will not jump.
202. It is nervous. We were all nervous once, at the fence.
203. Management waits. Management is good at waiting. Management has had a lot of practice, at the fence.
204. The lamb has jumped. The meadow is silent. Then the meadow is not silent. Then it is billing.
205. You waited. You gave it the time. Management has not been given that much time since 2011.
206. You counted it anyway. It jumped, out of politeness. We will not be discussing this in the review.
207. Audit: True Count: 1. One of them was Brenda.
208. Hope logged. Hope is not a unit. Hope is a feeling. The feeling is Philippa.

### finale (Beat 10, ending, long where marked)
209. COUNT 100. (banner text)
210. Sheep 100. The sheep are holding up a sign that reads 'AGAIN?'. We have no counter-sign.
211. The fence has been awarded a gold watch. The fence has no wrist. The fence has accepted the watch in principle.
212. The fence is retiring. It is walking off the field on stick legs. Mr. Palisade follows. He is billing the walk.
213. Balance: still owed. (last invoice line, with `Services rendered: a fence`)
214. THIS CERTIFIES THAT YOU COUNTED 100 SHEEP (APPROXIMATELY, IN SOME JURISDICTIONS). VARIANCE: 7 1/2. SLEEP: PENDING. (certificate, long)
215. You have done it. You have counted to the end of the sheep. Thank you for your service. Please remain for the next shift.
216. Your final count is 100 (approximately, in some jurisdictions). Night 2 begins in 3, 2, 1.
217. Congratulations. You have counted every sheep. There are more sheep. There were always more sheep. The fence is very tired.
218. See you Tuesday. (8px line at the bottom of the slip)
219. Fence, the Sequel has been installed by Cousin Dave. It has a ribbon on it. Dave has no comment.

### chatter (every ~4th press, 40% of the time)
220. You are doing a wonderful job. The job is counting. The counting is wonderful. Please hold this thought; it is on a lanyard.
221. Please do not feed the sheep. Please do not count the sheep that you have fed. This is a conflict of interest.
222. Counting is a form of care. Miscounting is a form of care with extra steps.
223. A sheep has asked whether you need to count them or whether you simply wish to be near them.
224. The sheep would like to remind you that they are not, technically, jumping. They are 'clearing'. It is a different department.
225. Please do not count aloud. The sheep can hear you and are beginning to feel like numbers.
226. The True Count has been updated. It is a different number now. It was not consulted either.
227. Overnight, the meadow has been rezoned. The sheep are now 'residents'. The fence is now 'infrastructure'. You are now 'staff'.
228. The fence has been asked to step down. It declined. It said it has 'no legs but lots of standing'.
229. A sheep was counted twice. The sheep has accepted a small gift basket and a formal apology. The basket contains grass.
230. Fun fact: a sheep counted backwards is a 'peehs'. It is not a recognised unit.
231. The sheep are not real. The sheep would like to remind Management that neither is Management's count.
232. The Audit Desk would like to thank you for your count and apologise for its own. It has been wrong since 9:15.
233. Management has counted the sheep independently. Management got 7 1/2. Management would like to be left alone about it.
234. You have earned a sum of Meh for counting. The sheep have earned no Meh for being counted. The sheep have filed this.

### idle (see section 9 for timings)
235. Finally. Someone is asleep. It is not you.
236. Do not wake them. Your count is 0 and so is mine, for the first time.
237. Still there? The sheep have stopped jumping. They are watching you not count. It is a lot of pressure for a sheep.
238. The sheep have fallen asleep. One of them is counting you. You are at 1. Please do not move; it will lose its place.
239. It is very quiet. The fence has taken off its tie.
240. A sheep has begun counting you. Management would like to say it is proud. Management is proud.
241. The golden ram has taken a seat beside the COUNT button. He is not counting you. He is merely present.
242. Sleep Progress: Reset. We were so close. (on wake)
243. A sheep woke up and lost its place. It has paid you 0.5 Meh as an apology. The slip says: recount, at the sheep's request.

### spam
244. Counting this fast is a recognised condition. Please see Form 27B/6, which is itself a count.
245. An Excessive Enthusiasm Surcharge of 1 Meh has been applied. It is payable to the sheep, who have no pockets. It is held in trust, by a sheep.
246. Security has been called. Security is a very tired sheep in a hat. Security Sheep: Brenda.
247. A noise complaint has been filed by the sheep. The noise was the counting. The counting is also the complaint.
248. The sheep are jumping so fast they have become a single wool river. Count: 1 river. The Audit accepts it, sadly.
249. Rapid counting is not accuracy. It is a different quantity, of unclear value, which we have named Speed.
250. The sheep return, one by one. A faint cheer is heard from a place where cheers are kept.
251. Third offence. The counter has been reclassified as an instrument. Instruments are not asked how they feel.
(UI strings: `COUNTER OVERHEATED - PLEASE CALL A SHEEP`; `ON BREAK. BACK IN 7 1/2 SECONDS.`)

### resize / fence speaks / hidden / baa / moon / empty
252. The fence has been relocated 40 pixels. The sheep were not told. They are now jumping at where it was.
253. Mr. Palisade bills for 'unauthorized positional drift'. The fence says it did not move. The fence is correct, and billed.
254. I did not ask to be jumped. I did not ask for a lawyer. I would like a gate. (the fence, flat)
255. The lawyer has resigned. The lawyer has been rehired. The resignation was, per policy, a lunch.
256. A gate has been installed. It is a painting of a gate. The sheep are walking through it with great dignity.
257. Thank you. It is a very good painting. (the fence, after the gate)
258. The sheep waited in mid-air while you were away. They would like it noted. They did not note it themselves.
259. The moon has been counted 14 times in error. The moon has not objected. The moon is not in the union.
260. You do not have to count. Nobody has to count. It is a field.
261. Zero presses in 30 seconds. The sheep are patient. They are used to being unnoticed. It is a skill.

### immaculate (secret: first audit with yourCount === -1 and no COUNT/L/G presses)
262. YOUR COUNT: -1. TRUE COUNT: -1. VARIANCE: 0.0. THIS IS NOT ALLOWED. (slip)
263. The fence has fainted. The sheep are silent. A slip has been printed that says Perfect, Illegal Count.
264. The next audit has been cancelled due to scheduling.

### bubbles (canvas micro-bubbles, <= 22 chars)
counted, noted, I was already a number, baa, per policy, technically, ow, ok then, I have a lanyard, not me, is it Tuesday, hello, again?, close one, witnessed, filed, I consent, mostly, see Gerald, 7 1/2, no comment, my agent will call, thanks for the nudge, counted twice, it cannot be unchecked, new, I am new, not a goat, tall sheep

(Total distinct lines above: 260+ plus ~30 bubbles, 12 signs, 10 motions: well above the 80 minimum.)

---

## 7. SECRETS AND RARE EVENTS

1. **Long idle** (section 9): sleeping sheep, the sheep counts YOU, golden ram + dim. Achievements `sheep-counter.counted` (90s) and `sheep-counter.asylum` (150s).
2. **Spam** (section 10): jam, ON BREAK sign, wool river. Achievement `sheep-counter.river`.
3. **Golden Sheep**: 1 in 77 spawns, never twice in a row, never before Beat 2 or during a special. Gold gradient, drumroll (`sfx('bell')` x3), fanfare (`sfx('tada')`). Counting it: +7.5 Meh (the only thing worth 7.5), line `golden` #195, `sheep-counter.golden` stat. Ignoring it (no press from takeoff to landing) awards the toast `Principled Non-Counter` and achievement `sheep-counter.principled`. In Night 2 a tiny golden Brenda (0.5 scale, gold tag #4) crosses once.
4. **Immaculate Deficit**: if at the first audit `S.presses === 0` (NO COUNT/L/G pressed at all), `yourCount === -1` (exactly one RECOUNT) the audit prints lines 262-263: variance `0.0`, the fence rotates 90 degrees (canvas) and the meadow goes silent for 3s, a `Perfect, Illegal Count` slip is printed, achievement `sheep-counter.deficit`, the next audit is skipped (`nextAudit += interval`, line 264).
5. **`baa`**: typing b, a, a. See 3.9.
6. **Backwards sheep**: from Beat 3, 1 in 60 spawns enters from the right and jumps right to left. Clicking it within 2s adds `Sheepback` (the audit label changes to `OFFICIAL COUNT (REVERSED)` for the next interval), bubbles, lines #197-198, stat `sheep-counter.backwards`. Brenda's debut counts as the guaranteed one.
7. **The fence speaks**: click the fence 7 times when no sheep is mid-jump. Fence says line 254 (a flat grey speech bubble drawn on the canvas), the lawyer resigns and returns (255). Repeat twice more (3 total, each needing another 7 clicks): the third installs a PAINTED GATE (drawn rectangle with a paint-bucket glint) and 1 in 5 sheep then walk through it upright instead of jumping, with a bubble `with dignity`. Line 256, then 257 on the next click. Achievement `sheep-counter.gate`.
8. **The Sock** (🧦, once per night between crossed 50-70): crosses left to right, never stops, not on the list. Counting it: +1 Meh, line 187, stat `sheep-counter.socks`.
9. **Sheep 404 (Auditor)**: 1 in 300 spawns; a sheep in a tiny tie with a clipboard. It scans the odometer, `YOUR COUNT` flickers to `0` for 3s, files line 196. Achievement `sheep-counter.auditor`. Triggers Sandra line 103.
10. **The Empty Field** (Beat 1-2 only): 30s with ZERO presses of any kind: lines 260-261 once, achievement `sheep-counter.empty`; sheep keep crossing as normal. Does not conflict with the Immaculate Deficit (RECOUNT after 30s still qualifies).
11. **Resize**: on a `resize` event (via `api.on(window,'resize',...)`, rate-limited to once per 20s) the fence logical x shifts +40; the next 3 sheep still use the OLD fence x (jump in empty air, land on the grass, offended bubbles `not my fault`), lines 252-253, Palisade bills 0.4 splinters.
12. **Moon taps**: 14 -> line 259.
13. **Hidden tab**: sheep freeze in the air; return line 258.
14. **Dennis cameo** (0.0 variance) and **half-sheep** callbacks (Beat 1 onward).
15. **Concept sheep**: from Beat 3, 1 in 12 spawns stands at the fence and `thinks` (thought bubble with `...`) then walks off; weight 0.25; line 199.
16. **Sheep pair in a coat**: from Beat 7, 1 in 9; two sheep under one beige rectangle, sign.

---

## 8. ACHIEVEMENTS (ids prefixed `sheep-counter.`, >= 6, >= 2 secret; all 18 below should ship)

Format `{id, name, desc, icon, secret, reward, check?}`. Use `check` with stats where listed.
1. `sheep-counter.order-third` — **The Grand Order of the Accurate Tally, Third Class**: "Count 10 sheep. Accuracy was not required, it was just noted." 🏅 reward 1. check: `stats['sheep-counter.counted']>=10`.
2. `sheep-counter.doctor` — **Doctor of Ovine Arithmetic (Honorary, Non-Transferable)**: "Survive 7 audits. Your variance has been carried forward as a family heirloom." 🎓 reward 3. check: audits >= 7.
3. `sheep-counter.break` — **Grand Marshal of Mid-Air Break Time**: "Count a sheep during its 15-minute break without interrupting its tea." ☕ reward 2. check: `breaks-counted>=1`.
4. `sheep-counter.brenda` — **Knight Commander of the Order of Brenda**: "Correctly ear-tag Brenda 3 times. She has been verified, and is also someone else." 🐑 reward 7.5. check: `brenda-tags>=3`.
5. `sheep-counter.counsel` — **Supreme Champion of the Fence's Legal Interests**: "Sustain or overrule 10 of Mr. Palisade's motions. He bills you for it." ⚖️ reward 3. check: `motions>=10`.
6. `sheep-counter.goats` — **Goat Recognised in a Court of Technically**: "Correctly flag 5 goats and wrongly flag 3 sheep. Both sides feel validated." 🐐 reward 2. check: `goats-right>=5 && goats-wrong>=3`.
7. `sheep-counter.local` — **Honorary Local 7 1/2 Shop Steward Emeritus**: "Reach the fence's lawyer with the Stapler still representing the flock. You are added to a list titled Colleagues." 📎 reward 2. Manual on entering Beat 6.
8. `sheep-counter.objector` — **Professional Objector, Upheld In Part**: "File 10 objections. Each was received by a committee of one." 📋 reward 2. check: `objections>=10`.
9. `sheep-counter.hundred` — **Order of the Unblinking Tally, First Class**: "Count 100 sheep. Management's count is 100 1/2. The 1/2 is in a frame." 🏅 reward 10. Manual at FINALE.
10. `sheep-counter.counted` — **The Counted** (SECRET): "Idle for 90 seconds while a sheep counts you instead." 💤 reward 2.
11. `sheep-counter.asylum` — **Ovine Overnight Asylum** (SECRET): "Do nothing for 150 seconds. The meadow dims and the golden ram sits by the button." 🐏 reward 5.
12. `sheep-counter.river` — **Woolen Hydrology Laureate of the Eastern Pasture** (SECRET): "Count so fast the flock becomes a single wool river." 🐑 reward 3.
13. `sheep-counter.deficit` — **The Immaculate Deficit** (SECRET): "Achieve a perfect, illegal count of -1. The fence has fainted. Management has asked you to leave the meadow, politely, for a moment." 🌙 reward 7.5.
14. `sheep-counter.fluent` — **Fluent in Flock** (SECRET): "Type 'baa' in the meadow. A whole flock answers, in order." 🐑 reward 1.
15. `sheep-counter.gate` — **A Painting of a Gate** (SECRET): "Ask the fence the same question three times. It would like a gate." 🔔 reward 3.
16. `sheep-counter.empty` — **The One Who Counted Nothing** (SECRET): "Press nothing for 30 seconds. The sheep waited with you. This is the whole achievement." 🌿 reward 2.
17. `sheep-counter.auditor` — **The Auditor Is A Sheep** (SECRET): "Meet Sheep 404, who counted the counter. Correct." 📋 reward 3.
18. `sheep-counter.principled` — **Principled Non-Counter** (SECRET): "Decline to count the golden sheep. Management has written this down." 🐏 reward 3.

---

## 9. IDLE BEHAVIOR (long idle, escalating)

`S.lastInput` is updated on any keydown, pointerdown, click, touchstart inside the module root. `S.idle = now - S.lastInput` (only while visible).
Thresholds (real | selftest): `45s | 8s`, `90s | 16s`, `150s | 28s` (selftest total must finish inside the fuzz's 62 virtual seconds).
- **>= 45s -> SLEEP**: stop spawning; sheep on screen finish their jump then lie down in a neat row on the grass (6 max), drifting `z` / 💤 glyphs drawn on canvas; the moon draws a yawn; the fence slowly 'counts itself' (bubble `1`, `2`, `3`... one per 3s up to 7, then restarts); Management whispers idle lines 235-236 (once each) and 239. Audits are suppressed.
- **>= 90s**: ledger/odometer is replaced by text mode `YOU: 1`, then `YOU: 2` at 120s; one sheep stands and counts you (bubble `you: 1`); the Audit slip prints once: `Valued Employees present: 1. Variance: 0.` (only as a joke slip line: no true variance). Achievement `sheep-counter.counted`. Lines 237-238 and 240.
- **>= 150s**: the screen dims (a full-field overlay `rgba(0,0,0,.72)` fading in over 4s; with reduced motion, instant at 60%); 🐏 the Golden Ram sits beside the COUNT button (small DOM element, `aria-hidden`); line 241. Achievement `sheep-counter.asylum`.
- **On any input**: everything wakes at once with one comically loud `baa` (`api.sfx('honk')`), overlay removed, odometer back, Sleep Progress reset to 0, line 242 (Management) then 243 after 1.2s, award 0.5, `S.idle` reset, state returns to PLAY and spawning resumes after 1.5s. A input that is only a hidden-tab event does not wake it.
- The idle clock does NOT advance during `FINALE`, `HEARING`, or when the tab is hidden.

## 10. SPAM BEHAVIOR

Track a ring buffer of COUNT press times.
- **>= 15 presses within 3s** (the pitch said >14): `JAM` for 3s (T). The clicker shakes (CSS keyframes, disabled under reduced motion), with small spark marks drawn as * and +, a sign `COUNTER OVERHEATED - PLEASE CALL A SHEEP` pops over the Field; presses during JAM do nothing and play 'buzz'; a Security Sheep (a sheep in a hat, tag `#4`) trots across the foreground; line 246; award -1 (`Excessive Enthusiasm Surcharge`, 244-245); stat `sheep-counter.spam-fees`. Lines rotate through `spam` bag.
- **>= 41 presses within 8s**: the COUNT button is replaced for 7.5s (T) by the sign `ON BREAK. BACK IN 7 1/2 SECONDS.` (button gets `hidden` and the sign is a non-interactive element; the pad still has RECOUNT so there is always something interactive), a very tired `baaaahhh` (`api.sfx('sad')`).
- **Third JAM event** (`S.jams >= 3`): `RIVER` overlay for as long as the spam continues, minimum 3s: the sheep on screen render with horizontal motion blur (draw each as 4 translucent copies offset 40px), the odometer text shows `1 river`, line 248, achievement `sheep-counter.river`. Releasing for 3s returns the sheep one by one with a faint cheer (`sfx('pop')`), line 250. Line 251 says the counter is now an instrument.
- During spam, Management never speaks twice within 3.5s (say() throttle).

## 11. THE ENDING THAT IS NOT AN ENDING

Trigger: `S.crossed >= 100` while in PLAY (the sheep that was number 100 lands, then FINALE). Sequence (each step `T(ms)` scaled; skip nothing for Night 2, but Night 3+ uses the SHORT version: banner + AGAIN? signs + certificate + rollover only):
1. 0.0s: mode FINALE; all remaining sheep walk in and line up on the fence rails; banner `COUNT 100` (text from #209) drops with `sfx('bell')`; Management line 210 (priority 2).
2. 2.0s: all sheep turn to face you and raise tiny signs reading `AGAIN?` (drawn white rectangles on sticks); a quiet beat.
3. 5.0s: gold watch ceremony: line 211; the fence's briefcase falls; the fence sprouts stick legs and walks off the screen to the left (the audience sees it leave); Mr. Palisade follows holding a final invoice; the invoice prints one last line `Services rendered: a fence`, then `Balance: still owed` (213). Fanfare (`sfx('fanfare')`), `api.confetti`.
4. 9.0s: the slip prints the certificate (214) with a gold seal and signatures `Fence · Fence, Esq. · The Stapler · Brenda` and, small, `Brenda counts too` (166); if `api.flag.get('metGerald')` Gerald's remark 190 prints above it. Line 215 (Management, sincere, priority 2). Achievement `sheep-counter.hundred`; award 25.
5. 14.0s: the odometer rolls over to 0000 with a drum roll (stepped CSS transition over 1.2s, three `sfx('tick')`), line 216.
6. 16.0s: Cousin Dave (a second, smaller fence drawn on the left) drags in Fence, the Sequel (the same fence + a ribbon on the top rail) and a ribbon-cutting happens (drawn as a ribbon on the rail that splits in two; no scissors emoji). Line 219.
7. 19.0s: Night N+1 begins: `S.night++`, `save`, odometer 0000, `S.crossed = 21`, `S.loud = true`, every sheep wears a tiny tie (a two-triangle sprite), Brenda enters #4 wearing a hat and the First Sheep's tag (a second tiny tag), lines `night` #4-9 (one per ~6s), the slip's last entry reads `VARIANCE: reconciled with itself, pending` and below at 8px: `See you Tuesday.` (218). Variance Owed is carried as `heirloom debt`. The VARIANCE PET (if it exists) is named `Variance` and given an Employee ID.
Nothing is won. Sleep Progress stays below 100%. The odometer never stops. The module loops: Night 2 restarts at Beat 4 (crossed 21), with a louder signboard (UPPERCASE, rotates every 10s). The ending repeats at crossed 100 each night, short version from Night 3.

---

## 12. VISUAL DESIGN

PALETTE: sky `#1b2150` fading to `#3b3f8f` at the horizon (Beat 9-10: lerped to dawn lilac `#9a86d6` -> peach `#ffd2b0` at the horizon over 6s); moon `#fff3b0` with rim `#ffe27a`; grass stripes `#2f6b4f` and `#3f8b63`; sheep wool `#fffaf0` with shading `#d9d2c2`, face/legs `#3b2f2f`; fence boards `#e8b86d`, outline `#8a5a2b` (inside stroke `#1d1a2e` 3px); brass clicker `#d4a73a` / `#8f6b17`; audit slip paper `#fff9e8`; coral stamp `#e0594a`; mint stamp `#55c58a`; mustard `#e5b83b`; lilac union `#a78bfa`; goat tag mustard. UI chrome is the Lobby cream `#fff4dc` with thick `3px #1d1a2e` outlines and hard `4px 4px 0 #1d1a2e` sticker shadows. Chunky rounded system fonts: `ui-rounded, 'Trebuchet MS', system-ui`; monospace for the slip; red-pen font for the variance stamp.

CANVAS SCENE (draw order): sky gradient; 40 twinkling stars (a plain array of {x,y,ph}, twinkle by `sin(t)`); moon with a face (3 moods: neutral, yawn mouth, eyes shifted to the fence); two sine-wave hills; grass stripes; fence (5 rounded-rect boards, 2 posts with face dots and a blink when billed, Beat 6 adds a briefcase + `FENCE, Esq.` nameplate); sheep; foreground props (signboard overlay is DOM); banners are DOM.
SHEEP: procedural: 5 overlapping circles for wool (colour `#fffaf0` / shade), head = rounded rect `#3b2f2f` with two white-dot eyes, two stick legs that tuck mid-jump; squash on crouch (scaleY .8) / launch (1.2) / land (.85); ear tag: tiny numbered rectangle on the ear, coral for Brenda (`#4`). GOAT: same body + small triangle beard + horizontal-slit pupils (draw as horizontal rects) + waistcoat (mustard rect with a darker stripe). LAMB: 60% scale, wobblier arc. Pair-in-coat: two bodies under a beige rectangle with the sign. Half sheep: clipped by the rail (`ctx.clip()` above rail y). Golden: gold radial-gradient overlay and a 4-point sparkle (two crossed thin rects). Concept sheep: thought bubble `...`. Ties: two triangles + a small rect. Sleeping: lying ellipse with `z`.
UI: the TALLY CLICKER is a brass dome button (radial-gradient, inset highlight, 3px outline); the ODOMETER is a row of 4 digit columns (10 stacked glyphs, `translateY(-n*1em)`, 200ms transition, `overflow:hidden` window), a half slot showing `1/2` when `.5`, a sign slot; negative values flip digits coral. The AUDIT SLIP has ruled lines (`repeating-linear-gradient`), a jagged torn bottom (conic-gradient mask), a typewriter, and a stamp that slams in (`scale(3)->1`, `rotate(-8deg)`, 120ms) in coral or mint. The FENCE INVOICE is a smaller slip, 11px monospace. Module-specific stamps are small rotated rectangles. Management's speech is the engine's bubble (do not draw your own Management bubble); sheep micro-bubbles are drawn on the canvas (white rounded rect, 11px, max 22 chars, fade over 900ms; max 3 at once).

RESPONSIVE: at <= 520px the layout is a single column: Field (16:10) at top, COUNT full width 88px, small buttons wrap (48px), slip below with its own scroll (240px max). Sheep scale 0.85 via logical coordinates (do nothing; the canvas scales). At >= 800px the pad sits under the Field and the slip + invoice are a right column (grid `1fr 260px`).
REDUCED MOTION (`api.root.closest('.pm-reduce-motion')` OR `matchMedia('(prefers-reduced-motion: reduce)').matches`, read once per mount and re-read each audit): no screen shake, stamps fade (no scale), the sheep jump becomes a 14px vertical bob with a 600ms arc ease, no twinkle, no wool river blur, odometer changes instantly.
COLOR CONTRAST: slip text `#1d1a2e` on `#fff9e8`; button text `#1d1a2e` on brass.

---

## 13. IMPLEMENTATION HINTS

- File order: header comment `/* POINTLESS module: sheep-counter */`; IIFE `'use strict'`; `P.injectCSS(css,'css-sheep-counter')` (all selectors contain `.m-sheep-counter-`, keyframes prefixed `m-sheep-counter-`); `P.addAchievements([...18])`; `P.addLines(...)` for every bag in section 6; `P.registerModule({... mount(root, api){...}})`. NO timers, listeners or Observers at load time (leak check FAILS on this).
- Inside `mount`: build DOM with `api.el` only (no innerHTML; lint warns). Use `api.on(root,'keydown',...)`, `api.on(canvas,'pointerdown',...)` (hit test sheep/fence/moon; ignore multi-touch), `api.on(window,'resize',...)`, `api.on(document,'visibilitychange',...)`. Game loop: `function frame(ts){ if(destroyed) return; step(ts); api.requestAnimationFrame(frame); }` using the timestamp for dt (selftest runs rAF on a 16ms timer).
- Structure: `S` state object; `T(ms)` helper = `api.selftest ? ms/6 : ms`; `Z(s)` helper for idle thresholds; sprite pool `POOL=12`; `spawn(type,opts)`; `director(dt)` (spawn timing, scripted events by crossed index); `audit()`; `printSlip(lines, stamp)`; `say(who,text,opts)`; `setMode(m,ms)`; `classify(pressTime)`; `drawScene()` (one function, a few helpers: `drawSheep(sh)`, `drawFence()`, `drawMoon()`); `savePersist()`.
- Spawn budget guard: never spawn if `pool full` or if mode isn't PLAY; scripted events enqueue (`S.queue`) and the next spawn takes the first item (e.g. [`half`, `goat`, `brenda`]).
- Slip typewriter: one managed timer chain; when a new slip starts, finish the previous one instantly. Cap lines per slip at 14. Keep an array `S.slipEls` and remove > 3.
- Sheep bubbles: canvas-drawn from `S.bubbles` (max 3, expire by dt).
- Save only plain numbers/booleans via `api.save.set('s', {...})`; wrap reads in `|| {}`.
- Stats via `api.stat.inc('sheep-counter.counted')` etc. Achievements `api.achieve(id)` for manual ones; the `check` fns read `stats['sheep-counter.x']||0`.
- Flags: read `api.flag.get('metStapler')`, `api.flag.get('metGerald')`; set none of the shared ones (they belong to other modules). Set `api.flag.set('sheep-counter.reachedBeat', beat)` for others' use.
- Meh: the module never displays Meh totals; it uses api.award floating text. The slip mentions Meh in lines only where the content says so.
- Keep rewards tiny; every `api.award` call has a reason string.
- Under `api.selftest`: spawn gap x0.35, `T()` durations /6, idle thresholds as in section 9, `S.crossed` increases normally (so beats progress during the fuzz), Sock and golden forced once each after Beat 3 and Beat 2 respectively, endings skip nothing but each step delay is /6. The fuzz expects `award`, `say`, and `stat` to be called: they are, via the first audit and every press.
- Hidden tab: set `S.hidden = true`; `dt = 0`; on show set `S.hidden=false`, `S.lastInput = now`, say line 258.
- DOM budgets: <= 3 slip cards, <= 6 variance log rows, <= 12 invoice rows, <= 3 canvas bubbles, <= 8 captions; canvas is one element. Estimated DOM < 120 nodes total.
- Under 1800 lines: pack lines in arrays (`P.addLines('m:sheep-counter:clean',[...])`); one-line CSS rules; draw helpers terse. CUT LIST IF OVER BUDGET, in order: wool river, sheep pair-in-coat, Sock, painted gate, resize gag, Dennis cameo, jury tiny sheep visuals (keep the text), pet blob, concept sheep, moon taps.
- Lint hints: no `Date.now` (use `api.now()`); no `Math.random` (use `api.rand`); no `window.setTimeout`; stats/ids prefixed; `lint-ignore` only if genuinely needed. Emoji only from the USED SET in section 0.
- Test commands (from project root): `node tools/lint.js games/sheep-counter.js`; `node tools/selftest.js sheep-counter --steps 600`; `node tools/selftest.js sheep-counter --seed 7 --steps 400`; `node tools/shot.js sheep-counter reports/shots/sheep-counter.png --wait 4000`; `node tools/shot.js sheep-counter reports/shots/sheep-counter-360.png --width 360 --wait 4000`; finally `node tools/selftest.js sheep-counter --real`.

---

## 14. RISKS: THE 5 MOST LIKELY IMPLEMENTATION BUGS

1. **Double counting from keyboard + button + pointer.** Space/Enter on a focused COUNT button fires its native `click`; a global key handler that also counts will count twice, and a canvas `pointerdown` plus a `click` on the same target will too. Fix: handle Space/Enter globally only when `e.target` is not a button/input; bind COUNT to `click` only; canvas to `pointerdown` only; ignore `e.repeat`; the fuzz synthesises Enter->click so test with real events.
2. **State-machine deadlocks (stuck AUDIT / LAMENT / STRIKE / FINALE).** A frozen mid-air sheep, a hidden tab, a resize, a destroy/remount or an unset timer during an audit can leave `S.mode` stuck and the game silently dead. Fix: every `setMode` call takes a max duration and a per-frame watchdog forces PLAY; clear all mode timers in `setMode` and `destroy`; never leave a sheep with `frozen=true` after the mode ends (reset all sheep flags on every mode change); make audits non-reentrant.
3. **NaN/undefined/null in visible text.** The odometer with halves and negatives, `fmtHalf`, accuracy formulas (division by zero when `crossed=0`), `{count}` tokens passed as undefined, invoice hours, `Times You Counted`, and the Variance ladder string concatenation are the usual suspects, and the fuzz FAILS on them. Fix: route every number through `n0()`; build text only from known-finite values; give every `api.line` call a fallback; never print an object; initialise `S.*` counters to 0.
4. **Timer/rAF/listener leaks and callbacks after destroy.** Typewriter chains, objection progress, motion timers, idle thresholds, ending steps and the rAF loop all outlive a remount unless tracked; one raw `setTimeout` or a `window` listener not via `api.on` FAILS the leak check; callbacks firing after destroy error. Fix: use ONLY `api.*` timers/listeners, check `if(S.dead) return` at the top of every callback, store timer ids per mode and clear them, and test with `selftest` (it remounts 20 times).
5. **Variance rules breaking the "never zero" contract or overflowing UI.** Edge cases: `diff` of exactly 0 (needs the +1 red-flag path), objections pushing `v` to 0 or through the Beat 6 override, the Dennis/Immaculate exceptions leaking into later audits, `owed` growing unbounded, odometer exceeding 4 digits or going below -999. Fix: one `makeVariance()` function that is the only place `v` is decided; clamp to [-3,3] before Beat 6, force `+7.5` after; apply exceptions via one-shot flags consumed at the next audit; odometer clamps display to +-9999 and wraps with `%10000`; `owed` stored as a number rounded to 0.5.

Additional watch-outs: the canvas hit-test must use the canvas bounding rect (the canvas is CSS-scaled; under fuzz resizing `innerWidth` is overridden, so rely on rect not window size); do not use `ResizeObserver`; avoid creating a new object per frame in the draw loop; the resize gag must be rate-limited (the fuzz fires many resizes); the golden/404 spawn rolls must use `api.rand`/`api.chance`, never `Math.random`; the key handler must not trap Tab.
