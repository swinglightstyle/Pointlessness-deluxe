# DESIGN BRIEF: Argue With a Toaster  (module id `toaster-debate`)

Final brief by the showrunner. Builder: read SPEC.md and VOICE.md first, then build `games/toaster-debate.js` (single file, <= ~1700 lines, classic script, no modules, no network). Everything you need is below. Where this brief says "verbatim", copy the string exactly (fix only JS quoting). Do not ask questions; where something is unspecified, decide sensibly and keep it small.

Registry values:
- id `toaster-debate`, title `Argue With a Toaster`, icon `🍞`, category `game`, unlockCost `0`, tags `['debate','reading','timing']`
- tagline (verbatim): `Persuade an appliance. It has heard worse.`
- CSS prefix `m-toaster-debate-`; CSS injected with id `css-toaster-debate`; stats prefixed `toaster-debate.`; achievements prefixed `toaster-debate.`; flags prefixed `toaster-debate.` except the shared read-only `metGerald`.

What was kept and cut from the pitches:
- KEPT (pitch 1 spine): 3x3 toast reading, premise + tone + hold-to-deliver sincerity ring, mid-sentence pops that cut the speech, fragments worth more when they end on a loaded word, the 1.2s catch window, the Archive shelf, Slice 4 running gag, Sandra's policy-of-the-minute, burn-ring citing, two-slice rounds, Gerald's potato, closing statement box, single crumb, role reversal, the one-frame 99%.
- KEPT (pitch 2): Pop Ledger with escalating causes and Auditor Pop the crumb (lanyard, hat, promotion), Positions are folded into the six Motions, the golden slice that flashes 100% and is "reversed", the word BAGEL secret, the Fire-Marshal-Crumb spam payoff, "We regret the joy."
- KEPT (pitch 3): the Toast Interpreter (Temp) who is fired and rehired, the framed crumb, Defrost setting after spam, "Certificate of Almost".
- CUT as unbuildable or redundant: 7x7 burn grids with SVG turbulence, a second Sincerity dial, a Conviction bar (the sincerity ring replaces it), the giant background second toaster, music, a Toast Lexicon sidebar, the Counter-Slice word spelling, Persuasion Review Board forms, deep multi-level card trees. The "Position" system is merged into Motions. Sound is `api.sfx` only.

---

## 1. Concept

You are a Valued Employee assigned to persuade a toaster of a Motion. Nobody says what. The toaster only answers with toast: one slice per reply, a 3x3 browning pattern the player reads like tea leaves. Management translates every slice with total confidence. You build an argument (Premise + Tone), hold a button to deliver it while the toaster, on its own clock, may pop mid-sentence and launch a slice you can catch. A persuasion meter climbs fast, slows, and creeps toward 99% without ever reaching it. At about 9:30 of play the motion "carries", the meter touches 99% for exactly one frame, Management says "We did not see that", the toaster asks for a turn (60s role reversal), and the whole thing resets, very slightly warmer. The toaster is honest, tragic and warm and is never persuaded. The point of the game is that there is no point; the joy is in reading the toast, timing the holds, and Management's unearned confidence.

One-sentence loop (8-14 seconds): read the slice, pick a premise, pick a tone, hold to speak, release in the Sincere band (or get popped), read the next slice.

---

## 2. Screen layout (top to bottom; one column at 360px, toaster and tray side by side above ~700px)

1. MOTION BANNER: `Motion N: ...` (text from section 12). Amended roughly every 2 minutes of play. A lilac SANDRA MEMO strip can drop in directly under it.
2. STAGE (the diorama):
   - the TOASTER (inline SVG or CSS, centre): chrome body, two slots, lever on the right (translateY +14px while toasting), two coil bars per slot that glow dark -> coral -> mustard, a dial face on the front with two dot eyes and a slot mouth (the lever is the mouth). Mood = eyebrow tilt: doubt (up), hurt (down), content (flat).
   - the SLICE TRAY (right of toaster, below it at <700px): the current slice as a 3x3 grid inside a bread-silhouette clip-path, with marks. Beneath it a one-line CAPTION element (`aria-live="polite"`) used for cell captions.
   - the SPEECH TAB: a small speech bubble above a tiny player avatar (emoji `🧑‍💼` is fine; plain `🙂` allowed) at the bottom-left of the stage. Words print here one at a time while holding.
   - Auditor Pop (a 14px crumb element with CSS lanyard/hat) sits on the counter edge once pop #22 has happened.
   - the framed crumb (tiny, appears after the first not-ending).
3. PERSUASION METER: long rounded bar with a raw -> golden -> dark gradient fill, a fixed 99% line at the right end with a hinged little sign `ESCROW`, a fixed-width monospace readout `Persuaded: 31%`, and a 10px footnote `the final 1% is held in escrow`. The footnote becomes a button after 100 delivered arguments (section 13).
4. ARGUMENT RACK: 4 premise cards (paper cards, -2..+2 degree random tilt via a CSS custom property, folded-corner pseudo-element, number-key badge, small branch label), a row of 4 TONE pills (hidden until after the first delivery), and the huge SAY IT WITH FEELING button (mustard, conic-gradient sincerity ring around it).
5. THE POP LEDGER and counters: a small line `Pops: N` (click opens the ledger panel listing the last 12 causes).
6. TOAST ARCHIVE SHELF along the bottom: flex row of 24px thumbnails (cap 40; oldest drop off with a tiny thud, shown as a 120ms shake plus `api.sfx('tick')`); each has a `title` attribute (`Slice 12, Wistful, answered`). Slice 4 renders with a pin and a yellow sticky note when present. A faint Gerald silhouette appears at the shelf end if he has not been met and the amicus beat fired.

Use real `<button>` elements for cards, tones, speak, slice cells (when focusable), shelf toggle, ledger, footnote, memo dismissal. 44px minimum touch targets. Management lines and the Interpreter caption use `aria-live="polite"` (api.say already does for Management; give your own caption/memo regions `aria-live` too).

---

## 3. Controls (all must work; keyboard-only play fully supported)

| input | action |
|---|---|
| click/tap a premise card, or key `1`-`4`, or Left/Right arrows to move a roving highlight and Enter to choose | select premise (does NOT deliver) |
| click/tap tone pill, or keys `Q` `W` `E` `R` | select tone Gentle / Firm / Wistful / Legal |
| press-and-hold the big button (pointerdown/up, `touch-action:none`, `setPointerCapture`), or hold `Space` / `Enter` | deliver: ring fills, words print |
| click/tap the airborne slice, or tap anywhere on the stage while airborne, or press `Space` or `C` while airborne | catch |
| hover/tap/focus a slice cell; arrow keys move between cells when the slice has focus | highlight cell and show caption; Enter on a cell with a burn ring = cite it |
| `T` | open/close Toast Archive panel (larger view of up to 40 slices, with tags) |
| `M` | toggle Management "terse" mode (decorative: Management lines get a leading `Terse: ` and drop the second sentence) |
| `A` | open the "Address the toaster in your own words" box (available from beat B7, section 9; before that, `A` makes Management say "That option has not been issued yet.") |
| `Esc` | close any panel / the Form 27B/6 dialog / the address box |

Rules:
- While a slice is airborne, Space/Enter-keydown means CATCH, not speak. Speaking is possible again when the airborne window ends (1.2s). `C` always means catch.
- Ignore `keydown` where `e.repeat` is true. Call `preventDefault()` on Space/Enter keydown AND keyup when the focus is anywhere inside the module root (so a focused button does not also fire a click on keyup). If the target is an `<input>`/`<textarea>` do not intercept anything.
- If the player releases Space while focus is on a card, it still ends the hold (listen on `document` via `api.on`).
- If a hold is never released (fuzz, lost keyup, blur, pointercancel, visibilitychange): auto-release at 2.6s of hold. Also release on `blur`/`visibilitychange`.
- Hold with no premise selected: auto-select card 1 (the pulsing card in round 1). Tone defaults to the last used (Gentle at start). A very short tap counts as a valid, mumbled delivery.
- Never block the player. No state is a dead end; "locked" input windows (ending sequence) max 14s and show a skip-free ceremony, not a spinner.

---

## 4. The mechanics, exactly

### 4.1 Toast reading (the real game)

A SLICE is `{ id, mood, cells:[9 ints 0..4], marks:[...], branch, tags }`. Browning values: 0 raw `#F6E7BE`, 1 pale `#E8C98A`, 2 golden `#D29A44`, 3 dark `#8A4F1E`, 4 charcoal `#2A1A10`. Cells index 0..8 left-to-right, top-to-bottom.

Moods and base patterns (jitter: pick up to 2 cells, never the centre for hurt and curious, change by +1 or -1, clamp 0..4):

| mood | meaning | base cells |
|---|---|---|
| doubt | mostly pale | `1 1 0 / 1 0 1 / 0 1 1` |
| hurt | dark centre | `2 2 2 / 2 4 2 / 2 2 2` |
| polite | even golden (the best, most common good state) | `2 2 2 / 2 2 2 / 2 2 2` |
| goon | dark top row means "go on" | `3 3 3 / 2 2 2 / 2 2 2` |
| heard | charcoal everywhere means "I have heard this one" | `4 4 4 / 4 3 4 / 4 4 4` |
| curious | checker | `2 1 2 / 1 3 1 / 2 1 2` |
| warm | warming gradient left to right | `1 2 3 / 1 2 3 / 1 2 3` |
| tired | dark fading pale at bottom | `3 3 3 / 3 3 3 / 2 1 0` |
| wistful | scattered pale | `1 0 1 / 0 1 0 / 1 0 1` |

Warmth upgrade: a persisted `warmth` (0..0.4) lerps ramp colours toward the next ramp colour by `warmth` (so the "same" pale slice is very slightly golden after each not-ending). Never explained.

Marks (0-2 per slice, each is a tiny absolutely-positioned element inside a cell): crumb dot, burn ring (a conic-gradient ring with dark rim; only after beat B3, 35% of slices, records its cell index), butter smear (soft translucent mustard rounded rect, rare), sock scorch (tiny L-shaped charcoal path on cell 6 = lowest-left; see S6 in section 13).

Management translates every slice in one line from the TRANSLATIONS table (section 11.B), starting with `The toast reads:`; lines are consistent with the pattern (that is how the player learns the language; there is no tutorial and the key is never shown). Pick a line from the slice's mood by shuffle bag, not pure random.

Cell captions (hover/focus/tap): `<Position>: <value caption>`; positions `Top-left, Top-centre, Top-right, Middle-left, Centre, Middle-right, Bottom-left, Bottom-centre, Bottom-right`; value captions from section 11.C (pick by bag). Show in the caption element; only call `api.say` for the first cell inspected ever and then at most once per 8 cells (priority 0) so Management is not flooded.

### 4.2 Premise (card hand)

A shuffle bag of the 42 premises in section 10 (never repeat within a bag; when the bag empties reshuffle, never the same card twice in a row across the seam). The hand is 4 cards; playing a card replaces that slot from the bag. Each premise has `branch` (Fairness, Feelings, Physics, Law, Tuesday, Regret) and `fav` (two moods it best answers). Affinity is hidden and discoverable: `aff = fav.includes(slice.mood) ? 1 : 0.25`.

Branch links (the toaster follows the branch of the premise you played): Feelings -> Regret -> Tuesday -> Physics -> Law -> Fairness -> Feelings, plus cross links Fairness<->Tuesday and Physics<->Regret. Each branch owns a mood bag for the reply slice:

| branch | reply mood bag |
|---|---|
| Fairness | polite, doubt, goon |
| Feelings | warm, hurt, wistful |
| Physics | curious, tired, polite |
| Law | heard, doubt, goon |
| Tuesday | hurt, wistful, tired |
| Regret | hurt, warm, heard |

Reply mood: if the delivery quality `q >= 0.85`, 55% chance to answer with `polite` or `warm`; otherwise draw from the branch bag (bag, not pure random). The reply's `branch` (used for the next preferred tone and for Management's branch line) = the played premise's branch, or with 40% chance a linked branch.

### 4.3 Tone

Tones: Gentle (dove emoji `🕊️`), Firm (`✊`), Wistful (`🕯️`), Legal (`⚖️`). The toaster has a hidden preferred tone per branch that rotates every 3 deliveries through [Gentle, Wistful, Legal, Firm] offset by a branch index. `toneMult = tone === preferred ? 1.3 : 0.85 + 0.15*rand()`. It is never wrong, only slightly different (range 0.85..1.3). A tone banned by Sandra's current memo multiplies by 0.5 (never blocks input).

The tone row slides in after the first delivery (before that, tone is fixed Gentle and the row is `display:none`), as if Management had been saving it.

### 4.4 Deliver (hold) and the sincerity ring

Hold start sets `holdStart = api.now()`. Ring fill = `min(1, t/2.6)` clockwise; band edges in seconds: Mumble `0..0.9`, Sincere `0.9..1.8`, Rambling `1.8..2.6` (auto-release at 2.6). Ring arc colours: Mumble coral, Sincere mint, Rambling lilac, with small band labels `Mumble`, `Sincere`, `Rambling` next to it. Band multipliers `bandMult`: Mumble 0.4, Sincere 1.0, Rambling 0.65.

The spoken line is the chosen premise's text split on spaces. It prints at a premise-relative rate so the FULL sentence completes at 1.3s (the middle of Sincere): `rate = words / 1.3` words/second; revealed words = `floor(t * rate)` capped at the total. So: releasing early is a self-inflicted fragment; releasing in Sincere speaks the whole sentence; holding to Rambling repeats nothing but costs quality (the bubble appends ", and, honestly," at 1.9s and ", as I was saying," at 2.3s). The player can see exactly where a pop will cut them off.

A small speech tab (bottom of the stage) shows `Tone: Firm` plus the printed words.

### 4.5 Quality, score and the meter

```
q = (0.40 + 0.45*aff) * toneMult * bandMult          // full sentence
fragment: q = 0.45 * toneMult * (loadedEnd ? 2.0 : 1.0) * (poppedByToaster ? 1.2 : 1.0)
q = clamp(q, 0.05, 1.4)
```
Loaded words (lowercase, strip punctuation): `never always home tuesday warm`. A fragment is "loaded" if its LAST printed word is in the list. Players learn to stage fragments by releasing right after `home` etc. Special overrides: first delivery of the cycle always `q = 0.55` and (if released in Sincere) the reply is a golden `polite` slice and the meter shows >= 31% (see 4.5 table below); the B8 single crumb round makes only Wistful count (q 1.0 for Wistful, 0.3 otherwise); the B3 citing bonus adds `+0.3` score; Slice 4 replies are answered with flat `q = 0.5` (nobody knows why).

`score += q` (fractional, only ever increases; the total stat `toaster-debate.arguments` counts deliveries).

```
meter = 99 - 99 * 0.52 ** score
gap   = 99 * 0.52 ** score
```
Roughly: score 0.55 -> ~31%, score 2 -> ~73%, score 6 -> ~98.0... check numerically while building; the intended feel is "50% at about 1:00, 80% at 2:30, 90% at 3:30, 96% at 5:00, 98.7% at 6:30, 98.99 at 8:00, 98.9999991 at 9:30". If your pace differs, scale `q` by a single `PACE` constant (default 1.0) rather than changing the formula; the not-ending (B9) also snaps score to 28.4 at its trigger, which yields `98.9999991`.

Readout decimals `d`: `m < 60 -> 0`; `m < 90 -> 1`; `m < 98 -> 2`; else `d = clamp(ceil(-log10(gap)), 2, 7)`. Display `floor(m * 10^d)/10^d` as a fixed string with exactly `d` decimals (guard float error: compute via the gap, e.g. `shown = 99 - ceil(gap*10^d)/10^d` then `toFixed(d)`). The readout MUST NEVER display 99 / 99.000 / 100 except the one-frame gags (4.9, section 13). Hard clamp the string to `98.9999991` as the maximum ever shown. Fixed-width monospace so adding decimals never shifts the layout (give it `min-width:13ch`). Label: `Persuaded: <shown>%`.

When `d` grows past its previous maximum, `api.stat.max('toaster-debate.decimals', d)`.

Persuasion Update: every 10 deliveries Management reads a number line (section 11.G), always lower than expected.

### 4.6 The pop (the inopportune part)

A hidden pop timer is drawn from a shuffle bag `[4,5,6,7,8,9,10,12]` seconds, counted in play time. When it expires the pop is ARMED. An armed pop fires during the next HOLD at a moment inside the window `0.35s..1.3s` of the hold, chosen as follows (the "worst moment" rule, also the gag that it lands on "but"):
- If the sentence contains `but` or `however`, with probability `0.5` (first 2 pops) rising to `0.8` (pop #4 onward) the pop time is just before the word after `but`/`however` is revealed, i.e. the cut word is `but`/`however` (the printed fragment ends on `but` or `however`, trailing dash `-`).
- Else if the sentence contains a loaded word and `rand() < 0.4`, cut on that loaded word.
- Else cut at a random word index between 30% and 80% of the sentence.
If the armed pop is not delivered because the player releases before the cut time, the pop stays armed and fires on the next hold. If the pop has been armed for more than 14s with no hold, it fires anyway in READY as a "candid pop" (no speech cut; still launches a slice; Ledger entry; Management says the Idle-Pop line 11.H8).
The very first pop is guaranteed on the delivery after the third delivery (or after 60s of play) so teaching is by doing; it is cut on `but`.

A pop mid-sentence has three simultaneous effects:
(a) the spoken line is cut at that word and shown as a fragment: `Bread has no say in this either, but-` (append `-`);
(b) a slice launches from the toaster on a quadratic arc (CSS custom properties `--dx`, `--dy`, ~1.2s). The slice is a clickable button. Catch it by click/tap/Space/C within 1.2s: `api.award(1, 'catch')`, `api.stat.inc('toaster-debate.catches')`, thumbnail goes neatly on the shelf, `api.sfx('bloop')`. A miss: it lands on the floor face down, `api.stat.inc('toaster-debate.misses')`, Management calls it "a candid slice" and files it on the shelf as a RARER reading (the miss slice is a `candid` slice with a special chance of a butter smear);
(c) the fragment is judged on its own (4.5).
After the airborne window the toaster still replies to the delivered fragment in the normal way (lever, glow, ding, reply slice) so the loop never stalls. Pops never change the meter directly (only via `q`); "the meter is incapable of caring".

Every pop is logged to the POP LEDGER (cap 60 stored, show last 12) with a rotating escalating cause from 11.H; `api.stat.inc('toaster-debate.pops')`. Auditor Pop appears at pop #22 ("Auditor Pop attends"), gets a lanyard at #40, a hat at #70, and is promoted to Senior Crumb at #100 with a small ceremony (mini confetti, `api.sfx('tada')`, 8 Meh via achievement or one-off `api.award(8)`).

Stutter after spam shortens the next 6 pop timers to 0.7s (section 17).

### 4.7 The toaster replies (the toast beat)

Sequence (about 2.2s total): lever lowers (700ms CSS), coils glow orange -> red -> mustard (1.1s transition), `api.sfx('ding')`, the reply slice rises 80px with a cubic-bezier overshoot and settles, Management translates (typewriter; the engine's `api.say`), the Archive receives a thumbnail. The toaster's face tilts to match the mood. Occasionally the reply is a RETURN of Slice 4 (section 12 gag G3). Each reply increments `toaster-debate.slices`.

Reduced motion: flights become instant fades, the toaster does not breathe/shake, smoke is a static grey cloud, confetti is replaced by a static line of text.

### 4.8 Rewards (tiny; always call api.award)

- delivered argument: `0.2`, plus `0.4` more for a Sincere release (so 0.6)
- catch `1`; loaded fragment `2`; Quartet `5`; Butter event repeat `3`; achievements carry their own reward (secrets 12) so do not also call award for those
- stats: `toaster-debate.arguments .pops .catches .misses .fragments .slices .decimals .sock_sightings .cycles .shouts` (use `.shouts` for spam count if you like) plus `.cites .quartets .butter .idle_max` as you wish
- every delivered argument: at least one `api.say`/sayRandom or caption change (never silent)

### 4.9 The rare golden slice

1 in 200 deliveries (seeded via `api.chance(1/200)`; also forced once if the player reaches 100 deliveries without seeing one): a perfect `polite` slice with no marks and a glint (CSS shine), `api.sfx('fanfare')`, the readout flashes `100%` for exactly 0.3s with confetti, the toaster pops a clean `YES` made of browning (a 3x3 with centre column and middle row at 2 -> reads as a plus; Management reads it as YES), Management weeps once and then reverses it with the line "Clerical error. Reversed. We regret the joy." The slice stays on the shelf laminated (class with a glossy overlay). Achievement `toaster-debate.golden` (secret, 12 Meh).

---

## 5. State machine

States: `BOOT -> READY -> HOLDING -> (POPPED | DELIVERED) -> TOASTING -> REPLY -> READY`. Overlays/modes that run on top of that loop:
- `AIRBORNE` (1.2s, only after POPPED): the slice flies; Space/C/click catch.
- `DOUBLE` (two reply slices on the tray; player must answer one; section 9 B5).
- `CLOSING` (address box open; B7).
- `CRUMB` (B8 single crumb round).
- `AMICUS` (potato overlay on the tray for 12s; B6).
- `CARRY` (B9 not-ending ceremony, input locked up to 14s).
- `REVERSAL` (60s role reversal, section 15).
- `STUTTER` (post-spam; section 17).
- `IDLE0..3` (idle ladder; section 16).

Rules: only READY accepts premise/tone/hold (selection is allowed in other states; selection while TOASTING/REPLY is queued for READY). Beats (section 9) fire only on the transition into READY (never mid-hold). A single `tick()` managed interval at 50ms updates ring, words and timers, using `api.now()` deltas. Keep a `playSeconds` clock that only advances while the player has acted in the last 20s (idle time does not count toward beats).

Boot (first joke without input, within 3s): mount renders the Motion 1 banner; at 1.2s the toaster pops a perfectly pale `doubt` slice (jittered normally; it is NOT Slice 4, Slice 4 is the 4th slice popped, see G3 in section 12), Management reads it, premise card 1 pulses. Mount must not throw if `api.save` returns garbage; defend all reads.

---

## 6. Escalation timeline (play-time gating; each beat needs BOTH minimum play seconds AND minimum deliveries, fires at the next READY, once per cycle)

Tune for `api.selftest`: multiply all minimum seconds by 0.25 so beats get exercised under fuzz. In cycle 2+ multiply by 0.6 and shuffle B3..B8 (still one at a time, 60-90s apart).

| beat | min play s | min deliveries | what happens |
|---|---|---|---|
| B0 FIRST SLICE | 0 | 0 | Motion 1 banner. Pale slice pops at 1.2s with no input. Management reads it. One card pulses. Meter 0%. |
| B1 TONE ARRIVES | after delivery 1 | 1 | Tone row slides in. First Sincere release gives the golden `polite` reply and meter jumps to >= 31%. Management is cautiously optimistic. This is the high-water mark of confidence. |
| B2 FIRST POP | 60 | 3 | First guaranteed pop mid-sentence on `but`. Management: "We call that a fragment. It is worth more than a sentence." Catch window teaches itself. Meter passes 50% and slows visibly. Pop Ledger line 1. |
| B3 REBUTTAL BY CITATION | 105 | 6 | Slices now sometimes bear a burn ring on one cell. Clicking (or Enter on) a ringed cell cites it back (`You said this yourself, here, at {mm:ss}`); +0.3 score once per slice. Citing the same ring twice = "badgering the toast": Sandra enters the chat (a memo, gag). |
| B4 SANDRA'S POLICY | 150 | 8 | Memo banners begin (section 11.K): one ban at a time, 45s each, replaced by a contradictory memo. Meter ~80%. Management proposes amending the motion to include "a general willingness" (Motion 2). |
| B5 TWO SLICES | 210 | 12 | 25% of replies afterwards pop BOTH slots: two slices, different moods (one pale/doubt-ish, one dark/hurt-ish), shown side by side. The player clicks the one to answer (keys Left/Right + Enter; auto-answers the left one after 10s with a line). The unanswered one goes to the shelf with a tiny "unanswered" tag (class + title). Meter ~90.1%. |
| B6 THE AMICUS | 300 | 20 | Gerald files an amicus brief: a potato drops onto the tray area and cannot be dismissed for 12s (the slice underneath is hidden; Management still translates it). If `api.flag.get('metGerald')` is true use the "metGerald" lines; otherwise "A potato of some kind tried to file something. It has been told to go through the lobby." and a faint silhouette stays on the shelf. Meter ~96.4%; digits begin to appear. Sets `toaster-debate.seenGerald`. |
| B7 CLOSING STATEMENT | 390 | 28 | Address box appears with `You may now address the toaster in your own words.` One typed statement is required for the next round (can be a single character); Enter delivers; length maps to a slice width and a label: <= 19 chars "a haiku", 20..119 "a statement", >= 120 "a hostage situation". Score `+0.4 + min(len,200)/400`. Meter ~98.7%; a second decimal appears. |
| B8 THE SINGLE CRUMB | 480 | 36 | Quiet round. No sfx for the whole round, Management types slowly with a visible pause, the toaster pops one slice with one crumb in the exact centre and everything else raw. Wistful is the only tone that works (q 1.0 vs 0.3). Meter ~98.99%. |
| B9 MOTION CARRIES (IT DOES NOT) | 540 | 45 | Snap score to 28.4 with a 2s climb. Fanfare. "Motion carried." / "subject to ratification". One-frame 99%. Reversed confetti. Role reversal (60s). Reset (sections 14 and 15). |

Motions amend every ~2 minutes of play and at B4 (see 12): the banner text changes with a small "amended" stamp (`api.sfx('stamp')`).

---

## 7. Visual design

Palette (matches the lobby): cream `#FFF4DC` with faint dotted-paper texture (radial-gradient dots at 3% opacity); dark outline `#2B2118`, 3px borders, sticker shadow `4px 4px 0 #2B2118`; mint `#8ED9B6` (Management panel, meter background); coral `#FF7A66` (pop moments, warnings, smoke alarm); mustard `#F2B63D` (toast gold, glow); lilac `#B9A4F0` (Sandra's memos, quiet moments); chrome gradient `#C9CED6 -> #8E96A3`; toast ramp as in 4.1.

Toaster: rounded chrome rectangle, thick dark outline, two dark inset slots, lever (coral) on the right, dial face with two dot eyes and a slot mouth. Idle breathe: scaleY 1.00 -> 1.015 over 4s (disabled under reduced motion). Coils glow via CSS transition and box-shadow bloom. Pop: keyframe with `cubic-bezier(.2,1.6,.4,1)` overshoot, rises 80px, rotates 3 degrees, settles. Airborne slice follows a quadratic path via `--dx`/`--dy` custom properties with separate X and Y animations of ~1.2s (X linear, Y ease-out then ease-in).

Slice: CSS grid 3x3 inside a bread silhouette (`clip-path: path()` or `polygon` with a rounded top via `border-radius` on the container and `overflow:hidden`; the simplest compliant approach is a rounded-top container, 14px inner padding, crust border 4px `#B8742A`). Each cell is a button-like element (`tabindex=0` on the cell grid with roving focus; or 9 real buttons) with `background: radial-gradient(...)` over the ramp colour for a hand-toasted look. Focus/hover outlines the cell.

Meter: gradient raw -> golden -> dark; the fill shows a tiny crinkle animation (background-position shift). Right end is a fixed `99%` line with a small hinged `ESCROW` sign.

Rack: cards tilt; tone pills chunky; speak button huge with a conic-gradient ring; ring bands drawn with CSS `conic-gradient(coral 0 35%, mint 35% 70%, lilac 70% 100%)` as a track plus an overlay mask whose angle is driven by a custom property `--fill` (set in the tick). Keep the ring simple (a conic-gradient ring with a circle cutout using `radial-gradient` mask).

Smoke: 6 absolutely positioned blurred radial-gradient circles that rise (opacity animation). Smoke alarm: tiny inline SVG disc with a blink. Slice rain: up to 12 elements, random `--dx`, gravity-like keyframes, removed on `animationend` (and by a fallback managed timeout).

Compact edition: when `root.clientWidth < 420` (checked on mount and on resize via `api.on(window,'resize',...)`) the toaster gets a knitted cozy (class) and Management apologises once per crossing with the compact-edition line (11.P).

Reversed confetti: ~24 span pieces. Phase 1 falls (CSS animation), `animationend` -> add a class that plays the same keyframes with `animation-direction: reverse` (they climb back up into the ceiling) -> remove. Under reduced motion show text only.

Role reversal rotation: the RACK (not the whole root) gets `transform: rotate(180deg)` for the 60 seconds (class), removed at the end; buttons stay fully clickable and keyboard reachable. Skip the rotation under reduced motion (use an explanatory label instead).

---

## 8. Sandra, Gerald, and the cast (appearance rules)

- Sandra never appears, only memos (lilac strip with a stamp), always `Per policy.`, cites `Section 12/7.5` (toast smoke). Her bans apply to one tone at a time or one premise branch at a time; banned item gets a strikethrough label and `x0.5` quality if used (never blocked).
- Gerald only through the amicus beat and, if met, one extra sighting (he mashes the toaster handle with feeling at the carry).
- Dennis (Plant) cameos in smoke, miss, and idle lines. Tuesday is invoked, never seen. The Stapler appears only as a filed amicus line. The Missing Sock appears as a rare mark.

---

## 9. Phases of Management behaviour

Management speaks on every delivery (translation, branch line or tone line). Use `api.say(text,{mood,who,priority})`: translation priority 0, pops priority 1, secrets and ceremony priority 2. Do not exceed ~3 Management utterances per 10s; collapse by priority.

---

## 10. The 42 premises (verbatim; branch / fav moods)

Display each with a tiny branch label. Word counts of 7-11 words are intentional (they fit the 1.3s print window).

FAIRNESS
1. `Bread has no say in this either, but it came anyway.` | doubt, polite
2. `Everyone I know has been toasted, and always forgave it.` | hurt, warm
3. `Nobody asked the bread, and nobody asked you.` | tired, heard
4. `A fair argument is only warm until someone checks.` | polite, curious
5. `You pop for everyone, however nobody pops for you.` | hurt, tired
6. `Both of us were assembled in a factory somewhere.` | curious, wistful
7. `I would split the last slice with you, honestly.` | warm, goon

FEELINGS
8. `Setting 3 is a feeling, not a number.` | doubt, curious
9. `You were made to be warm, not to be right.` | hurt, wistful
10. `I think you pop because you care too much.` | hurt, tired
11. `It is allowed to feel brown on the inside.` | wistful, doubt
12. `Warm is the first thing anyone remembers about home.` | warm, wistful
13. `I am not here to win, but I am here.` | goon, heard
14. `Some days a toaster just needs to be told.` | tired, hurt

PHYSICS
15. `Heat goes in, bread comes out, and nobody says thanks.` | tired, polite
16. `Crumbs are just the universe showing its working.` | curious, goon
17. `Every slot has the same width, however different the slices.` | polite, curious
18. `Toast is bread that finally understood what warm meant.` | warm, wistful
19. `A coil is only a very long way of caring.` | hurt, warm
20. `Gravity always brings the toast back down, but gently.` | heard, tired
21. `If you stop glowing, the bread does not stop trying.` | hurt, wistful

LAW
22. `Section 12/7.5 says nothing about toasters, which is encouraging.` | doubt, polite
23. `In my own defence, I am also on a form.` | heard, doubt
24. `Precedent suggests a toaster is innocent until buttered.` | curious, polite
25. `The right to remain warm shall not be infringed.` | hurt, goon
26. `I would like it noted, however, that you listened.` | polite, warm
27. `Objection overruled, but sustained in spirit, in the kitchen.` | tired, heard
28. `This is not legal advice, only a hand on your lever.` | wistful, hurt

TUESDAY
29. `Nobody is ready for Tuesday, and that is allowed.` | hurt, wistful
30. `I was warm once, but nobody wrote it down.` | wistful, tired
31. `It is always Tuesday somewhere, and somewhere is fine.` | heard, polite
32. `Even Tuesday has to go home eventually.` | warm, hurt
33. `You will never be late for Tuesday, only early.` | doubt, curious
34. `Wednesday is mostly a place, however Tuesday is a mood.` | curious, goon
35. `I would sit with you on Tuesday, honestly.` | warm, goon

REGRET
36. `I regret the crumbs, but I would do it again.` | hurt, heard
37. `Nobody remembers the first slice, only the burnt one.` | wistful, tired
38. `You never asked to be a toaster, and neither did I.` | heard, hurt
39. `I once raised my voice at a muffin, however briefly.` | doubt, polite
40. `Home is where the last slice goes.` | warm, wistful
41. `We could have talked sooner, but the lever was stiff.` | tired, wistful
42. `I am sorry about the Tuesday thing. We never discussed it.` | hurt, heard

The "but"/"however" words in these premises are what the pop targets (running gag G2).

---

## 11. LINES (verbatim). Replace `{player}` etc. with `api.line` tokens where noted; custom tokens `{n}`, `{mood}`, `{cell}`, `{word}`, `{mmss}`, `{pct}` must be replaced by YOUR code with `String.replace` before calling `api.say` (the engine only substitutes `{player} {meh} {module} {count} {item}`).

Pick lines by shuffle bag; never the same line twice in a row. Register global categories where listed (section 18) and keep module-private lines in module arrays.

### A. Boot, motions, banner
A1. `Motion 1: The toaster shall consider setting 3.`
A2. `The toaster has considered it. The toaster has set it to 4.`
A3. `Welcome to the debate. Your side is: Persuade. The toaster's side is: Toast. Management is neutral and has already picked.`
A4. `The first slice is in the tray. Please read it. You will not be told how.`
A5. `One of the cards is pulsing. Management has no opinion about the pulsing card, only an interest.`
A6. `Motion 2: The toaster shall consider a general willingness.`
A7. `Motion 3: The toaster shall consider Wednesday a place.`
A8. `Motion 4: The toaster shall consider the number 7 1/2, technically, fine.`
A9. `Motion 5: The toaster shall consider the floor mostly floor.`
A10. `Motion 6: The toaster shall consider Tuesday, kindly.`
A11. `Motion amended. The previous motion has been placed on a shelf with the other motion.`

### B. Translations by mood (3 each; all start `The toast reads:`)
doubt:
- `The toast reads: a pale slice, with the confidence of someone who has not seen a calendar.`
- `The toast reads: mostly pale. This means doubt, which Management is told is a kind of weather.`
- `The toast reads: pale, pale, then a raw patch. The toaster has questions and has chosen to ask them quietly.`
hurt:
- `The toast reads: a dark centre. That is hurt. Management has been hurt in the centre before and recommends a cardigan.`
- `The toast reads: charred at the middle, golden around it. The toaster is brave on the outside and has opinions inside.`
- `The toast reads: the middle of this slice would like to be left alone. The edges would like you to stay.`
polite:
- `The toast reads: even golden, no comment. This is the toaster's way of saying nothing, which it says beautifully.`
- `The toast reads: even golden. This is polite agreement. It is not agreement. It is also not nothing.`
- `The toast reads: evenly golden, edge to edge. The toaster is being kind in a way that is difficult to appeal.`
goon:
- `The toast reads: a dark top row. That is 'go on'. Please go on. Management would also like you to go on.`
- `The toast reads: dark at the top, golden below. The toaster is leaning forward, which toasters cannot do.`
- `The toast reads: the top row is charred and attentive. You are being asked to continue by a line of burnt bread.`
heard:
- `The toast reads: charcoal. Management is told this means 'I have heard this one before.' Management has not heard it before.`
- `The toast reads: charcoal, edge to edge. It has heard this one. It heard it fondly, in a different decade.`
- `The toast reads: black as a Monday and twice as courteous. The toaster has been here before and brought a snack.`
curious:
- `The toast reads: a checkerboard. The toaster is weighing it. Management has asked if the weighing is a good one.`
- `The toast reads: alternating gold and pale. That is curiosity. It could also be a crossword.`
- `The toast reads: a chequer pattern with a dark middle. The toaster would like more information and has no way to ask.`
warm:
- `The toast reads: pale on the left, golden in the middle, dark on the right. It is warming to you, left to right, as if reading.`
- `The toast reads: a slow gradient to the right. Management reads this as 'warmth, building'. The toaster reads it as bread.`
- `The toast reads: darker toward the edge you would shake hands with. This is the toaster being welcoming in a sideways manner.`
tired:
- `The toast reads: dark at the top, pale at the bottom. The toaster has done this one thousands of times and nobody said thanks.`
- `The toast reads: fading downward. It is tired. Management has promised to pass this on to the department of passing things on.`
- `The toast reads: a heavy top and an unfinished bottom. The toaster is tired, and has politely been so since 2011.`
wistful:
- `The toast reads: scattered pale dots. The toaster is thinking about something that is not in the room.`
- `The toast reads: a few brave pale patches in a field of raw. Wistful. It is the toaster's most private reading.`
- `The toast reads: dots, with space. It is remembering a kitchen. We are not following it.`

### C. Cell captions (value captions; combined as `<Position>: <caption>`)
raw: `a raw patch, uncommitted.` / `a raw corner, still deciding.` / `untouched, and proud of it.`
pale: `a small, brave pale.` / `pale, with the confidence of a first day.` / `a pale that has not been consulted.`
golden: `a golden, doing its best.` / `golden, and it knows.` / `a golden. Management would frame it.`
dark: `a dark. It has been through something.` / `a dark that would like a moment.` / `dark, quietly, at length.`
charcoal: `charcoal. It has heard this one.` / `charcoal, with no further comment.` / `a charcoal. It is not angry. It is simply charcoal.`

### D. Tone selection flavour (8: two per tone; shown in the speech tab and occasionally spoken)
- Gentle: `Gentle. The toaster has relaxed one coil.`
- Gentle: `Gentle. Management lowers its voice by what it estimates to be 6%.`
- Firm: `Firm. The toaster has noticed the furniture.`
- Firm: `Firm. Please note that firm is a tone, not a posture.`
- Wistful: `Wistful. Management has switched on a small candle that is not a fire hazard.`
- Wistful: `Wistful. A window somewhere has begun to look out of itself.`
- Legal: `Legal. The toaster has asked for counsel and been given a spoon.`
- Legal: `Legal. This will be handled by a committee of one, who is also you.`

### E. Branch reply lines (what the toaster does when you play a premise; 3 per branch; Management narrates)
Fairness:
- `Fairness. The toaster pops a slice and adjusts nothing. It was already adjusted.`
- `Fairness. Management has weighed the toast against the bread. The scales are crumbs.`
- `Fairness. The toaster has been fair to everyone, in the order they were bread.`
Feelings:
- `Feelings. The toaster pops softly, as one pops when meaning it.`
- `Feelings. Management has asked the room to feel something at a reasonable volume.`
- `Feelings. The toaster has been feeling since 7:40 this morning and would like it noted.`
Physics:
- `Physics. The toaster pops according to the available laws and, at the last second, a couple of its own.`
- `Physics. Heat has been applied. Heat is pleased to have been asked.`
- `Physics. The slice has risen by exactly the amount slices rise. This is a comfort and a limit.`
Law:
- `Law. The toaster pops a slice that is technically admissible. Management has stamped it.`
- `Law. Section 12/7.5 has been cited, by nobody, with feeling.`
- `Law. The toast is entered into evidence. The evidence is warm.`
Tuesday:
- `Tuesday. The toaster pops a slice and then, very slightly, apologises for the draft.`
- `Tuesday. The room has gone a Tuesday colour. It is not on the chart.`
- `Tuesday. Nobody has mentioned Tuesday directly. Everyone is standing differently.`
Regret:
- `Regret. The toaster pops a slice shaped, by accident, like a thing it almost said.`
- `Regret. Management would like to put on record that it also, once, did a thing.`
- `Regret. The slice is warm, and sorry, and not available for comment.`

### F. Never-the-same-banter on delivery quality
F1. `You were in the Sincere band. Management heard it and would like it known that Management heard it.`
F2. `Mumble. Management could not hear it and has recorded this as 'moving'.`
F3. `Rambling. The toaster let you finish. It has been let finish before, and also knows what that costs.`
F4. `That was a Sincere delivery, which is a thing we can measure and therefore do.`
F5. `Mumbled. The toaster leaned in, which toasters cannot do, and has been put on a list.`
F6. `That ran long. The toaster appreciates thoroughness, in the same way it appreciates weather.`

### G. Persuasion Updates and number commentary
Milestone lines (use the first matching, once each, then rotate):
- `Persuasion is at 31%. Management is cautiously optimistic, which is a mood Management has had once before, in 2011.`
- `Persuasion is at 62%. That is the largest number we have ever seen next to the word 'toaster'.`
- `Persuasion is at 80%. Management has drafted a party for 99% and has put it in a drawer marked 'Parties (Provisional)'.`
- `Persuasion is at 90.1%. The digits have begun to multiply. Management finds this exciting in a quiet room.`
- `Persuasion is at 98.99%. We could round up. We will not.`
- `Persuasion is at 98.9999991%. The remaining distance is smaller than the toaster's opinion of it.`
Every-10-deliveries Persuasion Update (token `{pct}` = the displayed percentage, `{count}` = deliveries; always "lower than expected"):
- `Persuasion Update: {pct}%. Management expected a higher number and has asked the number to explain itself.`
- `Persuasion Update: {pct}%. This is the number. Management had a different number in mind and has moved on, slowly.`
- `You have delivered {count} arguments. Management has delivered {count} updates. They have been placed in the same drawer.`
- `Persuasion Update: {pct}%. The toaster is pleased with the number in ways it cannot express and did not try.`
- `Persuasion Update: {pct}%. Per my previous update, it is also {pct}%.`
Escrow lines:
- `The final 1% is held in escrow by the same person who holds the toaster's.`
- `99% is a perfectly respectable place to live.`

### H. Pops (cut-off, ledger, 'but' tracking, idle-pop)
H1 cut-off lines (shown after a mid-sentence pop; `{word}` = the last printed word):
- `Fragment: '{word}-'. That is the most compelling sentence we have heard. It has no ending, which is its strength.`
- `You were cut off mid-argument. The toaster did not mean it. The toaster is a toaster, and meaning things is not one of its settings.`
- `The toaster popped. Your point was good. Your point is now on the floor, or about to be.`
- `You were cut off at '{word}'. The sentence has been placed in a small urn.`
- `We call that a fragment. It is worth more than a sentence.`
- `Management has finished your sentence for you: 'and that is why we have chairs.'`
H2 Pop Ledger causes (verbatim; escalate in this order, then shuffle; `{n}` = pop number):
- `Pop #{n}. Cause: Gravity (Dept. of).`
- `Pop #{n}. Cause: a Tuesday-shaped draft near the third ficus.`
- `Pop #{n}. Cause: Sandra's Memo 14, which has not yet been written.`
- `Pop #{n}. Cause: the number 4, which is Sandra's concern, not ours.`
- `Pop #{n}. Cause: a spring with a grudge.`
- `Pop #{n}. Cause: Mercury, being in a grain.`
- `Pop #{n}. Cause: the Wi-Fi. The toaster does not have Wi-Fi. It has a feeling about Wi-Fi.`
- `Pop #{n}. Cause: the toaster felt your argument was going too well.`
- `Pop #{n}. Cause: Dennis, by example.`
- `Pop #{n}. Cause: a crumb in the third coil, which has been invited to speak.`
- `Pop #{n}. Cause: Auditor Pop himself, who has not been seen to do it.`
- `Pop #{n}. Cause: unknown. The ledger has been asked to be cautious.`
H3 the "but" counter (use whenever the cut word is `but`/`however`; `{n}` = running count of such cut-offs; escalate):
- `Pop #3, cut off at 'but'.`
- `Cut off at 'but' again. Management is not saying anything. Management has written it down.`
- `The toaster has now interrupted you at 'however' {n} times. It is a pattern; it is a feeling; it is not a number.`
- `Please state your point. The toaster will arrive at the word 'but' shortly.`
- `Pre-announced pop: the toaster has the word 'but' booked for 14:07 and is reportedly looking forward to it.`
H4 candid pop (armed pop fired while READY, no sentence to cut):
- `The toaster has popped on no argument. Management reads this as the strongest statement of the hour.`
- `A pop with nobody mid-sentence. The toaster is practising.`
- `The toaster pops with nothing in it, and then looks at the nothing. Management has called it a draft of a point.`
H5 Auditor Pop:
- `Auditor Pop attends pop #22. Auditor Pop does not speak. Auditor Pop is, technically, a crumb.`
- `Auditor Pop has been issued a lanyard. The lanyard is the size of Auditor Pop.`
- `Auditor Pop has been given a hat. It is the first hat. It will not be the last.`
- `At pop #100 Management holds a small ceremony. Auditor Pop is promoted to Senior Crumb. There are no refreshments. There are crumbs.`

### I. Catch and miss
I1 catch:
- `Caught! You caught the slice. It is warm. It is also, technically, the toaster's. Please place it in the Archive, not your mouth.`
- `Slice caught. Management reminds you the five-second rule also applies to dignity.`
- `Caught. The slice is warm, slightly proud, and now yours. It is evidence. Do not eat the evidence.`
- `A clean catch. The toaster has pretended not to watch.`
I2 miss:
- `You missed the slice. It is on the floor. Dennis (Plant) saw everything and is composed about it.`
- `A candid slice. It landed on the floor, face down. Management has declared this the most honest slice of the day.`
- `Missed. The Five-Second Rule begins now. Management has begun counting out loud, slowly, like a sheriff.`
- `The slice is on the floor. Per Sandra's memo it is now 'a floor slice,' a separate legal category with its own small funeral.`
I3 streaks:
- `Ten catches. The slices have asked to be left out of future ceremonies.`
- `Five misses. The floor has begun to feel it has a role.`

### J. Fragments
- `Loaded fragment. '{word}' is a word with weight, and you left it at the edge of a cliff. That is an artistic choice.`
- `That ended on '{word}'. The toaster has gone quiet in a way it does not do for 'bread'.`
- `A fragment on '{word}'. Management has asked everyone present to look at the middle distance.`
- `Fragment received. It is worth more than a sentence, which is the wrong way round, and also the way it is.`
- `You stopped on '{word}'. The toaster is thinking about it. The toaster has nothing else, except time.`

### K. Sandra: memos and chat entry
Memos (each a ban for 45s; the `ban` is applied internally; the text is verbatim; the strip also shows `Per policy.`):
- `Effective now, Firm is not a tone. Please be Gentle in a firm manner.` (ban Firm)
- `Effective now, Gentle is not a tone. Please be Firm in a way that is not so firm.` (ban Gentle)
- `Effective now, Legal is not a tone. It is a hat.` (ban Legal)
- `Effective now, Wistful is a feeling and will not be accepted as a tone. It will be accepted as a feeling.` (ban Wistful)
- `Effective now, Fairness is no longer a branch. It has been moved to Wednesday.` (ban premise branch Fairness)
- `Effective now, Regret is not to be discussed before lunch. It is, however, always lunch somewhere.` (ban Regret)
- `Effective now, the word 'because' has been withdrawn. You may argue freely, provided it is for no reason.` (ban Law)
- `Sandra has rescinded the memo about the memo. She has reissued the memo about the memo about the memo.` (no ban; swaps in one random previous ban)
Chat-entry (badgering or the word 'sandra'):
- `You cite the same ring again. This is called badgering the toast. Sandra from Compliance has entered the chat and opened a window.`
- `Sandra has found the word 'sandra' and would like to have a word. She has used it already. It was 'toast'.`
- `Sandra has attended the smoke. Sandra has said only 'Per policy' and gone back to wherever Sandra goes.`
Smoke clause: `Per Section 12/7.5, the toaster is not to smoke without a note from the bread.`

### L. Slice 4 (gag G3)
L1 returns (in the order of annotation level; the toaster returns the canonical pale slice at irregular intervals, unannounced, as if it were a point it was making):
- `Slice 4 has returned. It has been annotated in red by Sandra: 'Per policy.'`
- `Slice 4 again. There is now a thumbprint on it. Gerald has been asked and has said nothing, deeply.`
- `Slice 4 is back. Someone has drawn a small sock on it. We are not following it.`
- `Slice 4. A tiny coffee ring has appeared. The toaster does not drink coffee. The toaster was in the room.`
- `Slice 4 now bears a sticky note reading 'ask Tuesday'. Tuesday has not been asked. Tuesday is, technically, available.`
- `Slice 4 has more annotations than slice. The toaster regards it as its strongest argument. No one has explained why.`
- `Archive note: Slice 4 has returned to the tray. It has been annotated by Sandra, then by Gerald, then by something we cannot identify.`
- `The toaster plays Slice 4. Management translates: 'Slice 4.' That is the whole argument. It has been the whole argument for nine minutes.`
L2 Slice 4 response flavour (when the player answers it):
- `You answered Slice 4. There is no known method. The toaster accepts it.`
- `Slice 4 has been considered. It was considered before. It will be considered again.`

### M. Two slices, amicus, closing statement, single crumb
Two slices:
- `Two slices have popped. One is pale. One is dark. They have different opinions. Please answer one, and the other will remember.`
- `You answered the dark slice. The pale slice has been placed on the shelf marked 'Unanswered'. It is not angry. It is pale.`
- `You answered the pale slice. The dark slice has been placed on the shelf marked 'Unanswered'. It is not angry. It is dark, which is a separate thing.`
- `You took too long. Management has answered the left slice on your behalf. The right slice will remember this.`
Amicus (met / not met):
- `Gerald has filed an amicus brief. It is a potato, it is on the stage, and it has been there since before the toaster.`
- `Gerald has no standing and a great deal of presence.`
- `Gerald: 'I too have been mashed. I understood it at the time. The toaster is correct, in a different way.'`
- `The potato has left. It has left a warm place on the stage, which the toaster has asked to have framed.`
- `A potato of some kind tried to file something. It has been told to go through the lobby.`
Closing statement:
- `You may now address the toaster in your own words.`
- `Closing statement received: {n} characters. The toaster calls this 'a haiku with the excess trimmed.'` (<= 19)
- `Closing statement received: {n} characters. The toaster has accepted it as a statement and filed it under 'statements'.` (20..119)
- `Closing statement received: {n} characters. The toaster has popped three slices in a row and then turned itself to Defrost. This is a hostage situation.` (>= 120)
- `Closing statement entered before an opening statement. The toaster has decided to treat this as jazz.` (if the player had never delivered; use the 'jazz' line otherwise unused)
Single crumb (B8):
- `Management has stopped talking. The toaster has stopped popping. For five seconds the room contains a toaster and you.`
- `The toast reads: one crumb, centre. Management is unable to translate this and would like a moment.`
- `The toast reads: I have never been asked what I think.`
- `The toast reads: I am not angry. I am, I think, a toaster. That is a different thing. Management is moved and cannot say why.`

### N. The not-ending: carry, ceremony, role reversal
- `Motion carried.`
- `Motion carried. Subject to ratification. Ratification is subject to Tuesday.`
- `DING.` (flashes full-width for one frame together with the 99% readout)
- `We did not see that.`
- `Motion not carried. Motion has been carried, and then placed on a shelf. We regret to inform you the shelf is the meter.`
- `The toast reads: Good point, {player}.` (translation of the golden slice that says, in browning, 'Good point.')
- `The toaster would now like a turn.`
- `The toaster would now like to persuade YOU. This is called a 'role reversal' and it is not in your contract.`
- `Role reversal: your tone buttons are now the toaster's cards. The meter has been mirrored. It does not point at the toaster.`
- `Toaster's argument: 'Slice 4.' It is the whole argument.`
- `The toaster has agreed with you completely, subject to a cap of 99%. This is called 'a deal' and it is slightly illegal.`
- `At the end of the minute both meters read exactly 98.9999991%. A tie, of a kind, between two parties who have agreed on almost everything.`
- `Debate adjourned. Debate resumes immediately. The adjournment was a courtesy.`
- `You ended the motion. The motion has begun again. It is Motion 1. It is warmer.`
- `Persuasion is at {pct}%. We did not do that. It was already there.` (first reading of cycle 2+)
- `A certificate has printed from the crumb tray: 'Certificate of Almost'. It has been framed next to the framed crumb.`
Reversal: toaster 'arguments' (a slice plus a Management translation; the player picks Pale / Golden / Dark as a reply):
- `Toaster's argument 1: a pale slice. Management reads it as 'But have you considered the alternative.' It has not.`
- `Toaster's argument 2: a dark slice. Management reads it as 'I have heard this one, and I am still listening.'`
- `Toaster's argument 3: a golden slice. Management reads it as 'You are very good at this. I am very good at this.'`
- `Toaster's argument 4: a charcoal slice. Management reads it as 'Perhaps we are both in the wrong job.'`
- `Toaster's argument 5: a single crumb. Management reads it as 'I would like to be asked.'`
- `Toaster's argument 6: a slice with a faint sock-shaped scorch. Management says only 'No.'`
Reversal outcomes (player picks a shade):
- `You answered Pale. The toaster nodded, on the inside.`
- `You answered Golden. The toaster has relaxed in a way that cannot be shown on a toaster.`
- `You answered Dark. The toaster has added it to the pile. The pile is warm.`
- `You answered nothing. The toaster accepts silence as Golden. It has been waiting its whole life.`

### O. Idle, spam, secrets, resize, rare
Idle:
- `Are you still there?` (the slice pops pale and slowly lowers, as a person adjusting a hat; Management reads it softly; at 90s)
- `The toast reads: Do you want to talk about it?` (150s)
- `The toaster toasts one perfect slice of nothing. Management reads it as 'a letter, unsent, addressed to you.'` (4 min)
- `The motion has been quietly edited. It now reads: 'The toaster shall consider you.'` (7 min; the banner text changes)
- `We did not discuss that.` (on returning input after idle; the motion is restored)
- `The Considerate Silence has been observed. The toaster is awaiting your reply. It has all night.`
Spam (also the Management reaction to premise mashing):
- `The toaster has been spoken at {n} times in 3 seconds. It has begun to stutter. Management has opened a window for 'air'.`
- `The toaster has lost its composure and is now popping toast as a cry for help. Sandra is on her way from a different floor.`
- `Smoke alarm 7. Sandra has attended. Sandra has said only 'Per policy' and gone back to wherever Sandra goes.`
- `Incident filed: Smoke Alarm 7. The meter has dropped by 0.0001%. Out of kindness, the meter has been restored.`
- `The Fire Marshal Crumb has attended with a clipboard, read the Pop Ledger, nodded once, and left.`
- `Defrost setting engaged. Your argument will be heard at room temperature.`
- `Card Handling Incident filed. The cards have been shuffled for their own good, and are shuffled a bit differently now.`
Secrets and rare:
- `The Four Tones Convention (Mild) has convened. The toaster has popped a four-slice quartet, which it does not have the slots for, and four notes.` (Quartet)
- `The toast reads: a face, in butter. The toaster has signed it, in burn marks, backwards: {player}. This is not a reading. This is a signature.` (Butter event)
- `The toaster has gone completely silent. A cold draft is detected. We do not use that word in the counter area.` (Bagel; then slices `SORRY?` then, quieter, `BAGEL?`)
- `The toaster pops a very small slice that reads WHO?` (crumpet)
- `The toaster has popped a slice of a potato. Management has not asked for this. Management has been told.` (typed 'gerald')
- `The toaster has unplugged itself and plugged itself back in two seconds later, as if nothing happened.` (typed 'tuesday')
- `The toaster pops a slice shaped, by chance, like a small sock. No. We are not following it.` (sock sighting 1)
- `The sock again. We have started a file. The file is also not following it.` (sock sighting 2)
- `The sock a third time. The toaster has been waiting for you to notice, in the manner of a toaster.` (sock sighting 3, unlocks the achievement)
- `This is the compact edition of the toaster. It has been fitted with a cosy. Management apologises for the toaster being more private.` (resize < 420px)
- `The toaster has been returned to its full width. It would like to talk about the cosy.` (resize back up)
- `Clerical error. Reversed. We regret the joy.` (golden slice)
- `Form 27B/6, Request to Release the Final Percent, has been submitted. The Submit button has already been submitted.` (footnote form)

### P. Misc
- `Management has translated the toast 7 and a half times. The half is the one it is not sure about.`
- `Management: 'Per my previous slice, the toast has been clear. It has also been toast.'`
- `The toaster makes a small ding. You have never been so sure of anything and so wrong about it.`
- `You have won the argument. The argument has not noticed. It is in another room, being lost.`
- `Achievement threshold: 99%. Please note this threshold is a round number and the toaster is not.`
- `The Interpreter (Temp) has been dismissed for translating 'burnt' as 'I forgive you'. The Interpreter has since been rehired.`
- `Interpreter, regarding a blank slice: 'Eloquent.'`
- `The Crumb Tray has been emptied without asking. One crumb has been kept in a tiny frame.`
- `Toggle noted. Management has switched to 'terse' mode. Terse.` (M key on)
- `Terse off. Management resumes full sentences and the associated warmth.` (M key off)
- `Dennis (Plant) has been told about the toaster. Dennis (Plant) has no comment and several leaves.`

Count check: the groups above total well over 200 distinct lines. Use them all; do not invent shorter filler.

---

## 12. Running gags (rules)

G1. THE METER THAT IS NEVER 99. Decimals appear as the player closes in (4.5); any 99% achievement is listed as 'Pending'; at 98.99% Management says `We could round up. We will not.`; the footnote `the final 1% is held in escrow` becomes a real `<button>` after 100 delivered arguments (stat `toaster-debate.arguments >= 100`) and opens Form 27B/6; in the ending the readout reads `99%` for exactly one frame.
G2. THE POP ALWAYS LANDS ON "BUT". See 4.6 and H3. Track `butCuts`; at 3 and from then on Management says the H3 lines; from pop #6 the pre-announce line fires occasionally before a hold (when a pop is armed).
G3. SLICE 4. The 4th slice popped in a cycle is the canonical SLICE4 `1 1 1 / 1 0 1 / 1 1 1` with a pin in the Archive. From slice #12 onward, every 8-14 deliveries (random) the toaster's REPLY is SLICE4 instead of the normal reply, unannounced (Management translates as in L1). Each return adds one annotation (overlay elements drawn on the slice: Sandra's red margin text `Per policy`, a thumbprint, a drawn sock, a tiny coffee ring, a sticky note `ask Tuesday`; beyond 5, additional doodles). At 10 minutes of play it has more annotations than slice. The reply to a Slice 4 return is scored `q = 0.5` regardless of premise/tone.

CALLBACKS (>= 3): Gerald (flag `metGerald`, beat B6; sets `toaster-debate.seenGerald`), Sandra (memos, 'sandra' typed, badgering), the Missing Sock (rare scorch, S6 in section 13). Also Dennis (smoke/miss/idle), Tuesday (fear, `tuesday` typed), the Stapler (one-off amicus line at B6: `The Stapler has submitted an amicus brief. It is one page and it is stapled to itself.` use only if Gerald was met, else skip), Auditor Pop.

---

## 13. SECRETS and RARE EVENTS (all must exist)

S1. THE LONG IDLE (the Unspoken Slice). Idle clock resets on any pointer/key input. 20s: Management one-liner `Are you still there?` is NOT used here; use only: 90s Are-you-still-there slice; 150s Do-you-want-to-talk slice; 4 min the blank slice of nothing (a slice with all cells 0 and no marks), achievement `toaster-debate.silence` (reward 12); 7 min the banner motion becomes `Motion 1: The toaster shall consider you.` Returning input restores everything with `We did not discuss that.`
S2. SPAM (Smoke Alarm 7). See section 17.
S3. THE QUARTET. Deliver all four tones in a row inside one motion with no pop between (any order): `api.award(5)`, `api.stat.inc('toaster-debate.quartets')`, the toaster pops four small slices (in a row, staggered 120ms, with `api.sfx('blip')`... four blips with rising ordering using `api.setTimeout`), four-note jingle, achievement `toaster-debate.quartet` (secret). Tone history resets after each motion change and after each pop.
S4. THE BUTTER EVENT (1 in 77 slices; or when the player types the word `butter` anywhere): a reply slice appears with butter-smear marks arranged as a face and the player's name burned on it backwards (render `api.player.name` in a span with `transform: scaleX(-1)`), Management says it is a signature, `api.stat.inc('toaster-debate.butter')`, achievement `toaster-debate.butter` (secret); repeats award 3.
S5. THE WORD BAGEL (typed anywhere or in the address box, any case, via a rolling 12-char key buffer on `keydown`): the toaster goes completely silent; a cold draft animation plays (blue tint overlay, `mix-blend-mode:multiply`, frost border) for 3s; the meter readout shows `0.0%` for those 3s (the only time it may drop); then it returns, "wounded", and the toaster pops `SORRY?` then `BAGEL?`. Achievement `toaster-debate.bagel` (secret). Other typed words: `crumpet` -> a tiny slice reading WHO?; `gerald` -> a potato slice; `tuesday` -> the toaster unplugs and replugs; `sandra` -> memo line (K); `butter` -> S4.
S6. THE SOCK. Once per session, random after slice #25..60, a reply slice has a faint sock scorch on cell 6 and Management says only `No. We are not following it.`; each sighting `api.stat.inc('toaster-debate.sock_sightings')`; 3 sightings (cumulative stat) unlock `toaster-debate.sock` (secret).
S7. THE GOLDEN SLICE (4.9), `toaster-debate.golden` (secret).
S8. RESIZE. Under 420px root width: compact edition with a knitted cozy; back up: the cozy line.

---

## 14. The not-ending (B9, exact order)

1. Lock inputs. Score climbs to 28.4 over 2s, the readout adds decimals as it climbs; `api.sfx('fanfare')`.
2. Management (trembling, slower typewriter): `Motion carried.`
3. For exactly one frame (use two consecutive `api.requestAnimationFrame` callbacks): the readout shows `Persuaded: 99%`, the screen flashes a `DING` banner, the toaster dings (`api.sfx('ding')`), confetti falls.
4. Next frame: the readout returns to `98.9999991%`; the confetti reverses (climbs back into the ceiling); Management: `We did not see that. Ratification is subject to Tuesday.`
5. The toaster pops a single golden slice (all cells 2 with a dark flick), which says, in browning, 'Good point.' Management translates as `The toast reads: Good point, {player}.` then adds `The toaster would now like a turn.` Achievements `toaster-debate.carried` unlock.
6. ROLE REVERSAL for 60 seconds (section 15).
7. At the end of the minute both meters read exactly `98.9999991%`; Management declares the tie line (section N). A framed certificate `Certificate of Almost` appears in the crumb tray area (small, decorative) and the framed crumb joins the counter.
8. RESET: stage resets to Motion 1: `The toaster shall consider setting 3.` The first pale slice pops exactly as in beat 1 but `warmth += 0.04` (cap 0.4, saved via `api.save`, never mentioned). The Archive keeps every slice. `toaster-debate.cycles` +1. The meter restarts at `0.3%` (cycle >= 2) with `Persuasion is at {pct}%. We did not do that. It was already there.` The player's meter, if you look closely, has already begun to creep again. Cycle 2+ shortens gates (section 6). If the player asks the toaster about anything (any further use of the address box) it will say only `ding` (the box's reply slice is a plain pale slice and Management reads `The toaster says: ding.`).

---

## 15. ROLE REVERSAL (60s, 6 rounds of 10s)

- The rack gets the 180-degree rotation class (skip under reduced motion). The tone buttons are replaced by three shade buttons `Pale`, `Golden`, `Dark` (they are the toaster's cards now) and the premise cards are hidden; the big button is relabelled `PICK A SHADE` and acts as the confirm (or just click a shade directly).
- Each round: the toaster 'argues' with a slice (the six `Toaster's argument` lines N, in order) and a mirrored meter labelled `Persuasion of Valued Employee` (separate readout; scripted values after each round: `41%`, `77%`, `93.1%`, `98.2%`, `98.99%`, `98.9999991%`).
- The player picks a shade; if no input in 10s the round auto-picks Golden with the silence line. Management reads the outcome line (N).
- Meter ends at exactly the same `98.9999991%` as the player's main meter (the tie). Total length ~60s; inputs never locked beyond 10s.
- Rewards: `api.award(1)` per round; `api.award(5)` at the tie ("fanfare for nothing").

---

## 16. IDLE behaviour (summary table)

| idle | what happens |
|---|---|
| 15s | the pulsing card re-pulses (visual only) |
| 90s | pale slice `Are you still there?`, lowered slowly (like adjusting a hat) |
| 150s | `The toast reads: Do you want to talk about it?` |
| 4 min | blank slice (all 0), `a letter, unsent` line, achievement `toaster-debate.silence` |
| 7 min | the motion banner becomes `Motion 1: The toaster shall consider you.` |
| any input after idle | `We did not discuss that.` and everything is restored; the next slice is a pure relief slice (even `polite`, no marks) |

Idle never counts toward `playSeconds`. Do not leave the module in a state where timers pile up: one 1s managed interval checks idle.

---

## 17. SPAM behaviour

SPEAK mash: if the speak button/keys are pressed (distinct pointerdown or keydown without repeat) more than 6 times in 3 seconds: the toaster stutters (STUTTER state for 6s): the next 6 pop timers are 0.7s; up to 12 slices rain into the stage (cap 12 DOM nodes, removed on animationend and by a 2.5s fallback timeout); the CSS smoke cloud rises (6 elements); the smoke alarm SVG appears and blinks; Management files `Incident: Smoke Alarm 7`; Sandra attends (memo); the readout flickers `-0.0001%` for 1s then is restored "out of kindness" (the real score is unchanged); `api.sfx('buzz')`; the Fire Marshal Crumb sprite appears with a clipboard for 3s then leaves; `api.stat.inc('toaster-debate.shouts')`; achievement `toaster-debate.smoke` (secret). Cooldown 90s: during cooldown Management says only the Defrost line if mashing continues. After the incident the toaster is in Defrost for 20s: replies are 'damp' slices (all cells 1 and a water-droplet mark), Management translates each as `The toast reads: moist.` (the Interpreter temp's only word).

CARD mash: more than 8 premise selections in 3s -> the hand reshuffles with a flutter animation and Management files a Card Handling Incident (K/O line); no penalty.

Everything else spammy (random clicks, drag, resize, visibilitychange): ignored gracefully, no errors, no unbounded DOM.

---

## 18. Achievements (module file; ids prefixed `toaster-debate.`; >= 6 with >= 2 secret; the `reward` field is in Meh)

| id | name | desc | icon | secret | reward |
|---|---|---|---|---|---|
| toaster-debate.first | Grand Marshal of the Persuasion Corps (Honorary) | Deliver your first argument. The Corps has no other members. The title is yours; the Corps is also you. | 🎖️ | false | 3 |
| toaster-debate.interrupted | The Order of the Interrupted Sentence, First Class | Be cut off mid-sentence by a pop, 5 times. The sentences have been placed in a small urn. | ⚱️ | false | 5 |
| toaster-debate.catcher | Supreme Chancellor of the Catch Window | Catch 10 airborne slices. The Chancellor's robes are made of crumbs and are not machine washable. | 🧤 | false | 6 |
| toaster-debate.final_percent | Archduke of the Final Percent | Reach 98.9999% persuasion. The remaining 0.0001% has been placed on indefinite leave. | 📈 | false | 8 |
| toaster-debate.ledger | Archduke of the Pop Ledger | Record 25 pops in a session. Auditor Pop has been told. Auditor Pop has no reaction and a lanyard. | 📒 | false | 4 |
| toaster-debate.carried | Motion Carried (Subject to Ratification) | Reach the end of the argument. The argument has not ended. It has been placed on a shelf. | 🗂️ | false | 10 |
| toaster-debate.silence | The Considerate Silence | SECRET. Sit in silence until the toaster offers to talk. The toaster is awaiting your reply. It has all night. | 🤫 | true | 12 |
| toaster-debate.butter | Signed in Butter | SECRET. Receive a slice with your own name burned onto it. It is not a reading, it is a signature. Please do not frame it, it is warm. | 🧈 | true | 12 |
| toaster-debate.quartet | The Four Tones Convention (Mild) | SECRET. Deliver all four tones in one motion without a pop. The toaster has no fourth slot and has performed one anyway. | 🎼 | true | 12 |
| toaster-debate.smoke | Grand Marshal of the Unnecessary Fire Drill | SECRET. Make the toaster stutter by speaking at it more than six times in three seconds. The alarm has since apologised. | 🚨 | true | 12 |
| toaster-debate.bagel | Apologist to the Entire Concept of Bread | SECRET. Say the word. We will not say the word. The toaster is no longer quite so warm. | 🥯 | true | 12 |
| toaster-debate.sock | Sock-Adjacent (Pending) | SECRET. See the faint scorch three times. We are not following it. | 🧦 | true | 12 |
| toaster-debate.golden | Toast Whisperer Emeritus of the Eastern Counter | SECRET. Receive the Golden Slice. The slice has been laminated. The laminate has been laminated. | ✨ | true | 12 |

Unlock with `api.achieve` at the point of the event (stats via `api.stat.get` for thresholds: interrupted = `toaster-debate.pops` fragments cut off count, catcher = catches, ledger = session pops). Do NOT rely on `check` callbacks.

---

## 19. Registered global content (`P.addLines`, so the lobby can reference the module)

Register under existing categories (use these verbatim):
- `moduleEnter`: `You have entered the Debate Chamber. Please do not touch the toaster. It will be offended and then it will forgive you.` / `The toaster has agreed to hear you out. It has agreed to nothing else, forever.` / `You are about to argue with an appliance. Management has seen worse conversations at the water cooler.` / `Please make your argument. The toaster is warming up and has already begun to listen.`
- `moduleExit`: `You have left the debate. The motion has been placed on a shelf with the other motions.` / `You left in the middle of an argument. The toaster has a feeling about this, and no mouth.` / `The toaster has not been persuaded. It has, however, been warm to you. Please do not confuse the two.` / `You have left the toaster. The toaster says 'ding'. It is the only word it has and it means it.`
- `ticker`: `TOASTER STILL NOT PERSUADED; SOURCES CLOSE TO THE TOASTER SAY 'DING'` / `PERSUASION METER REPORTED AT 98.9999991%; REMAINING DISTANCE DESCRIBED AS 'LEGAL'` / `SLICE 4 SIGHTED AGAIN; ANNOTATIONS NOW OUTNUMBER SLICE` / `AUDITOR POP PROMOTED TO SENIOR CRUMB; NO COMMENT FROM CRUMBS` / `SANDRA FROM COMPLIANCE ISSUES MEMO ON MEMO; MEMO ON MEMO ISSUES MEMO` / `TOAST BREAKING: THE TOASTER SAYS 'GOOD POINT'; MANAGEMENT HAS TRANSLATED IT AS 'GOOD POINT'`
- `tip`: `Tip: the toaster pops at the word 'but'. This is not a rule. It is a pattern. It is a feeling.` / `Tip: a fragment that ends on a warm word is worth more than a whole sentence.` / `Tip: do not say the name of the round bread-adjacent food with the hole. We will not say it either.`
- `lobbyEvent`: `The toaster has been spoken to for 14 minutes and remains warm. Management has called it 'a draw'.` / `Gerald has been seen outside the Debate Chamber with a certificate. It is addressed to a different potato.` / `Dennis (Plant) has been told about the toaster. Dennis (Plant) has no comment and several leaves.`
- `plantStatus`: `Dennis (Plant) has watered the toaster. The toaster is damp and quietly furious.` / `Dennis (Plant) has been moved closer to the Debate Chamber. He has asked for this and been given it.`
- `lockedTease`: not needed (cost 0). Skip.

Optionally register decorative settings: `{ id:'toaster-debate.setting3', label:'Toaster Setting', type:'slider', min:1, max:7, default:3, responses:[...] }` with 3-4 absurd responses of your own. Not required.

---

## 20. Persistence (`api.save`)

Keys: `warmth` (number 0..0.4), `cycles` (int), `best` (best score), `archive` (array up to 40 compact items: `{p:'<9 digit string>', t:'tone letter', m:'mood', a:0|1 answered, u:0|1 unanswered}`), `sock` (sighting count mirror), `framedCrumb` (bool), `ledgerCount` (pop count carried over so Auditor Pop's lanyard/hat persist across sessions; the session Pop Ledger itself shows only the current session). Wrap every read: validate types and clamp; corrupt data -> defaults, never throw. Write on change, not per frame.

---

## 21. Implementation hints

- File skeleton: IIFE; `const P = window.POINTLESS;` data tables (premises, moods, translations, lines); `P.injectCSS`, `P.addAchievements`, `P.addLines` (global categories), `P.registerModule`. In `mount(root, api)`: build DOM with `api.el`, create a `S` state object, wire inputs via `api.on`, run `api.setInterval(tick, 50)`; `destroy()` clears nothing extra if you only used managed timers but also removes the document key listener (it is managed) and clears references.
- RNG: use `api.rand/randInt/pick/shuffle/chance` only. Implement `makeBag(arr)` returning `next()` that reshuffles on empty and avoids repeating the last item across the seam.
- Slices: render with a function `renderSlice(slice, opts)` that returns an element (used for the stage slice, shelf thumbnails at 24px via a CSS size class, and the archive panel). Keep a `slice.id` counter. Marks as child elements with `position:absolute`. Thumbnails are the same grid at tiny size with `pointer-events:none`.
- Word reveal: `words = text.split(' ')`, `rate = words.length / 1.3`; revealed index `i = Math.min(words.length, Math.floor(t * rate))`; the spoken fragment is `words.slice(0,i).join(' ')`. Pop cut time for target word index `k` (the word to be cut AT, meaning revealed words = k+1): `tCut = (k+1)/rate - 0.02`; ensure `0.35 <= tCut <= 1.3`; if the target is outside that window clamp into it.
- A pop mid-hold must end the HOLDING state at `tCut`, not at release: end the hold immediately, show the fragment with a trailing `-`, ignore the pointer/key release that follows.
- Catch: the airborne slice element is a `<button>`; mark the state `airborne = {until: api.now()+1200}`; on catch remove and add to shelf; at `until` auto-miss with the floor animation. Make sure a catch via Space does not also start a hold.
- Sandra bans: keep `S.ban = {type:'tone'|'branch', value, until}`; the banned element gets a class with a strikethrough; multiplier applied in quality; never disable the button.
- Meter: keep a single `score` number; `refreshMeter()` computes `gap`, `m`, `d`, string; test `d` bounds and the display clamp with a few unit calls under `node` during self-verification (call the pure function in a small throwaway script if you like).
- Typed words: a rolling buffer (last 12 lowercase letters) updated on `keydown` when `e.key.length === 1`; check `endsWith` for each secret word. Do this both for the document and inside the address box.
- Idle: `S.lastInput = api.now()` updated by a single `pointerdown`/`keydown`/`pointermove` listener; the 1s interval checks thresholds.
- Beats: `S.beatIndex`, `S.playSeconds`, `S.deliveries`; check at READY only; one function `maybeFireBeat()`.
- Reduced motion: read `matchMedia('(prefers-reduced-motion: reduce)').matches` inside try/catch and also `document.body.classList.contains('reduce-motion')` in try/catch (the engine setting may use such a class); either true => reduced.
- Keep each `api.say` under ~140 chars where possible; long lines (translations) are fine because they are the joke. Use `who:'Management'` by default, `who:'Sandra'` for memos, `who:'Gerald'` for his line, `who:'Toaster'` for the single-word replies (`ding`).
- For text injected into the DOM use `textContent` or `api.el` (never `innerHTML` with player-typed text). Escape the player's typed closing statement by only counting its length and echoing it via `textContent`.
- Meh pacing: with 0.2-0.6 per delivery plus the odd catch/fragment, a ten-minute session pays about 40-60 Meh. This is intended.
- Selftest: with `api.selftest` multiply beat gates by 0.25, shorten the role reversal rounds to 1.2s, and cap holds so fuzz never deadlocks. Never use `NaN`/`undefined` text: guard every template.

---

## 22. Risks: the 5 most likely implementation bugs

1. SPACE/ENTER DOUBLE-FIRE AND STUCK HOLDS. A focused `<button>` plus a global key handler can start a hold and also fire a click on keyup; `e.repeat` events can restart the hold; a lost `keyup` (fuzz, tab switch, focus change) leaves the ring filling forever. Fix: `preventDefault` on keydown and keyup for Space/Enter inside the root, ignore `e.repeat`, a hard auto-release at 2.6s, and release on `blur`/`visibilitychange`/`pointercancel`. Also keep Space = catch only while a slice is airborne.
2. THE POP VS THE RELEASE RACE. The pop ends the hold at `tCut`; then the user's release arrives and delivers a second argument or throws on null state. Fix: the pop clears the hold object and sets state POPPED; release handlers must check `S.state === 'HOLDING'`. Same for a catch click that arrives after the airborne window closes: guard on `S.airborne` and clear it exactly once; `animationend` handlers must be idempotent and capped (use fallback managed timeouts, not only events).
3. METER MATH AND DISPLAY. The readout could reach `99`, show `NaN`/`Infinity` if `score` is undefined, jitter between decimals, or round up to `99.0`/`98.99999999`. Fix: pure `fmtMeter(score)` with guards, the `d` formula, `floor` via the gap method, a hard clamp string `98.9999991`, fixed-width monospace, and a unit check at score values 0, 0.55, 2, 6, 14, 20, 28.4, 40, 1000, NaN. Remember the readout is only ever allowed to show 99/100/0.0 in the explicit gags and must restore on a timer even if the module is destroyed (use managed timers only).
4. TIMERS AND LISTENERS LEAKING ACROSS REMOUNT/DESTROY. Raw `setTimeout` for flights/confetti, a raw `window` key listener, `requestAnimationFrame` for the one-frame 99%, or a CSS `animationend` that fires after destroy and touches a detached node. Fix: only `api.*` timers/listeners; the one-frame gag uses `api.requestAnimationFrame` twice; every DOM write is guarded by an `S.dead` flag set in `destroy()`; the shelf, ledger, memos, rain, confetti and archive are all capped (<= 40 thumbnails, <= 12 rain nodes, <= 24 confetti, <= 60 ledger rows stored / 12 shown).
5. BEAT ORDERING AND OVERLAPPING MODES. Two beats or modes firing at once (amicus potato during a two-slice round, an idle slice during the closing box, the carry during a hold, Sandra's memo during reversal, spam stutter during the crumb round) leave the UI in an unrecoverable half-state, or the not-ending triggers twice. Fix: one `S.mode` variable, beats only fire from READY, `S.mode !== 'NORMAL'` blocks other beats and idle slices, a `S.carryDone` guard so B9 triggers once per cycle, and `cycle`-aware gates. Also guard against `api.say` flooding by priority and cooldowns.

(Honourable mentions: `api.say` token substitution leaving `{n}`/`{word}` visible; typing `butter` hitting the lobby's boss key `B` outside inputs, which the engine owns, so prefer to document it in the address box and in a hidden always-available way only where it cannot collide; premise text containing `but` inside words like `butter` or `buttered` - match whole words only when finding the pop target, except `buttered` in premise 24 which is intentionally not a `but` target.)
