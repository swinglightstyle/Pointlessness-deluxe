# DESIGN BRIEF: WAIT FOR IT(TM) (id `wait-for-it`, category `game`)

File to build: `games/wait-for-it.js` (single file, vanilla JS, <= ~1800 lines, obey SPEC.md section 5 and VOICE.md).
Registration: `id:'wait-for-it'`, `title:'Wait For It(TM)'`, `tagline:'The bar is loading. You are also loading. Please do not look at either.'`, `icon:'⏳'` (U+23F3, Emoji 1), `category:'game'`, `unlockCost:0`, `tags:['patience','progress','bureaucracy']`.
CSS prefix `m-wait-for-it-`. Stat, achievement, flag and save prefixes `wait-for-it.`. Line categories (if any engine categories are used) `m:wait-for-it:*`; the brief assumes the module keeps its OWN shuffle bags (see 13.3) so no `addLines` is required.

This brief merges three pitches. SPINE = pitch 1 (the bar is shy: ATTENTION is the input; unwatched is fast, watched is slow; the receipt of numbered Impatience Notices; the 37.5 stall; the Cancel trap; the nines; the sincere trophy that immediately installs itself at 0 percent). BORROWED from pitch 2: the Lost Percents are named and filed in a memorial strip (Doreen, Gordon...), Gerald (the queue potato) rolls out to present the trophy, press-and-hold "sit with the bar" secret, the checkpoint floor ("Safe Harbour") so a clicker still makes progress, the pity rule so nobody is stuck forever, the loading-tip carousel. BORROWED from pitch 3: ETA "about about about" multiplier, hum/idle party feel, Reprise numbering (Season N). CUT as unbuildable or weak: Gregory-the-face eyes, the skipped 13 percent and typing "13" (two number gags compete with 37.5; 37.5 is THE number), the Estimator abacus character (the ETA is a text engine only), Sub-bar Argument and the random-event bag of 12 (replaced by a few rare events), Real Hundred (the nines already do "so close"), Reprise rule-swaps 3-7 (Season 2 gets exactly the changes listed in section 10), the Stapler sticky-notes, the Toaster slide (the toast appears only as the rare "It was the toast" event), the Staring Contest painting callback, Pat the Finish Line (Snail Marathon already owns him), Form Gate signature buttons (the Cancel trap already owns "forms").

---

## 0. DECISIONS THE BUILDER MUST NOT SECOND-GUESS

1. Progress is ONE float `S` (0..100, never below 0) plus a derived value `q` once `S >= 99` (section 4.6). Everything on screen is a function of `S`, `beat`, `season` and a handful of flags.
2. ONE simulation clock `sim` (seconds). Every duration in this brief ("7.5 s", "10 s curtain", "25 s tidy") is in SIM seconds. Under `api.selftest`, `SPEED = 20` (sim runs 20x real time) so a full 9.5 minute run plays in about 30 virtual seconds; otherwise `SPEED = 1`. There is NO other time scaling and NO per-feature `T()` helper: only `simDt = realDt * SPEED`. Exceptions that use REAL milliseconds from `api.now()` because they measure human behaviour: the click-rate window for spam (3000 ms), the press-and-hold timers (2 s, 7.5 s, 30 s), the `lastInput` recency for "watched" (4 s measured in SIM seconds is fine and keeps it consistent; use sim for it).
3. The bar never reaches 100 by player action alone being "good": it reaches 100 because time passes. A player who does nothing finishes at about 9:30 sim. A player who hovers the whole time gets there much later but the PITY rule (4.4) guarantees an end. A clicker is slowed but never stuck (checkpoint floor).
4. The `beat` (1..10) never decreases ("beats never un-escalate").
5. All narration goes through ONE helper `say(who, text, opts)`: (a) substitute module tokens, written in SQUARE brackets so the linter does not flag them: `[player] [n] [gain] [x] [pct] [lost] [secs] [season] [count]` (use `api.player.name`; never leave a token unfilled, never print `NaN`, `undefined`, `null`, `[object Object]`); (b) in season >= 2 prefix lines whose `who` is `Management` with `Revised: ` (not the sincere ceremony lines, not Gerald, not the Notice receipts); (c) append to the module's own caption strip (aria-live polite, last 8 lines kept); (d) forward to `api.say(text, {who, mood, priority})` at most once per 2.5 real seconds (priority 2 always forwarded). Dropped forwards still reach the caption strip. `api.say` returns false on duplicates; ignore the return value.
6. No `Date`, no `Math.random` (use `api.rand`, `api.pick`, `api.shuffle`, `api.chance`), no raw timers (`api.setTimeout/setInterval/requestAnimationFrame` only), no `innerHTML`, no ES modules, no `fetch`. Never `api.exit()` during mount or from a timer shortly after.
7. Gary is ALWAYS exactly one position ahead of the player in the queue. Gerald is number 5, Gary is number 6, the player is number 7. (Pitch 1 said Gerald was 6; that collided with Gary being exactly 1 ahead. This is the resolution.)
8. The ONLY sincere lines in the game are the ending lines (Gerald's speech and Management's two plain lines) plus the shy-bar thank-yous. Nothing is a joke for six seconds after the plaque finishes typing. Keep every other line deadpan.
9. The module NEVER says Game Over, never has an instant loss, and nothing is "clicked for points".

---

## 1. CONCEPT

A fake installer window holds one progress bar. The bar is already at 1 percent. You wait. The bar is SHY: the more you watch it (cursor over the window, keyboard focus on it, touching the screen, reading its Details) the slower it goes; look away (move the cursor to the margin, press the "Look away" curtain button, switch tabs, or just sit back) and it hurries. So the winning move, sitting back and doing nothing, is also the boring-looking one, and the temptation to hover is the whole mechanic. Clicking the bar is IMPATIENCE: the bar rewinds on a VHS-style 400 ms rewind, a named Lost Percent is filed in a memorial strip, and a numbered, escalating, self-superseding Impatience Notice is printed on a thermal receipt strip beside the bar. There is a Cancel button that is a three-layer trap, a bar that waits for a bar, a queue to wait in (with Gerald the potato, Gary, and something small and red), a percent readout that mutates into elevenths and Tuesdays, an ETA that is confidently wrong in smaller and smaller hesitations, a bar that admits it is nervous, and a run of nines where every new nine takes twice as long.

At about 9:30 sim, S reaches 100. A single chime. The ETA reads "Now" for the first and only time. A tiny sincere trophy rises. Gerald presents it. Management drops the voice for two plain lines. Then, with no transition: "Installing trophy. 0 percent. Please wait." and Season 2 begins at 1 percent. The task was never defined: the bar was Step 1 of 1,204.

Difference from siblings (do not duplicate): Snail Marathon is a click clicker, Staring Contest ends a round on any movement, The Button is one input with 100+ outputs, Tiny Bureaucracy is forms. Here the input is ATTENTION and the reward for doing nothing is speed, not judgement. No sibling has a hover/watch economy.

Tone: "cheerful dysfunctional intranet" installer. First joke within 10 s with zero input. Arc: plain bar -> the bar is shy -> bureaucratically unhinged (Cancel, forms, queue, tidying) -> units mutate -> strangely touching (the nervous bar, the sincere trophy) -> back to normal like nothing happened (Season 2).

---

## 2. CAST

- **Management** - the voice (api.say default). Corporate, passive-aggressive, over-invested.
- **Bar** - the bar speaks in first person, shy, polite, a little frightened of being looked at. Speaker label `Bar`. Shown in a small speech bubble above the bar's right end AND in the caption strip.
- **Gerald** - potato, Vice President of Spuds, queue number 5, presents the trophy. Reads `api.flag.get('metGerald')`; sets `api.flag.set('metGerald', true)`. Speaks once per mount in the queue (beat 6) and once in the ceremony.
- **Gary** - snail, queue number 6, always exactly 1 ahead of you, cannot explain it. If `api.stat.get('snail-marathon.pixels') > 0`, one extra line ("Gary says it is a contract").
- **The small red thing** - joins the back of the queue (callback to The Button). Clicking it says "also do not press". It never counts as impatience. If `api.stat.get('the-button.presses') > 0` the line uses the count.
- **Sandra from Compliance** - never seen, only cited (stall reviewer, tip, typed word).
- **Dennis (Plant)** - only cited as "something else to look at" (alternative to the bar).
- **Tuesday** - only looming (units beat, typed word).

---

## 3. REGISTRATION, ACHIEVEMENTS, STATS, SAVE

### 3.1 Achievements (all ids prefixed `wait-for-it.`; reward is paid by the engine, so do NOT also `api.award` the same amount)

| id | name | desc | secret | reward | how |
|---|---|---|---|---|---|
| wait-for-it.minute | Grand Magister of the First Minute | Wait 60 seconds without clicking the bar. Management has framed your 60 seconds. The frame is empty. The seconds are in a drawer. | no | 1 | 60 sim s since last bar click, any time |
| wait-for-it.rewinds | Honorary Fellow of the Rewind Society (Retroactive) | Be rewound 5 times. Each rewind has a notice. Each notice is slightly more formal than the one before it, and one is half a notice. | no | 2 | stat rewinds >= 5 (use `check`) |
| wait-for-it.dark | Archduke of Progress Made in the Dark | Look away for 20 seconds and come back to find the bar has advanced. It wishes to be thanked and also not mentioned. | no | 2 | return from Absent (>= 20 s, section 4.3) with a lump > 0 |
| wait-for-it.cancel | Sworn Officer of the Cancellation Committee (Keep Waiting) | Cancel waiting all the way through Form 27B/6. Waiting was rescheduled. You were thanked. | no | 1 | finish the 3-layer Cancel trap once |
| wait-for-it.trophy | Supreme Laureate of the Small Trophy | Reach 100 percent and receive the Trophy. It is small and perfectly sincere. It is, at this time, installing. | no | 10 | ceremony |
| wait-for-it.party | Lord Chamberlain of the Unattended Party | Do nothing for 180 seconds and attend the bar's tiny party. There is one balloon. It is a good balloon. | YES | 5 | party event (8.2) |
| wait-for-it.witness | Sole Witness of the 37.5 | Watch an entire 7.5 second stall at 37.5 percent without clicking. The bar gave you ticket 7 1/2. It is for nothing and is numbered. | YES | 7.5 | stall witness (8.4) |
| wait-for-it.cascade | Framed Recipient of the Certificate of Impatience | Click the bar 15 times in 3 seconds. The bar rewound, you were cooled off for 7 1/2 seconds, and Management apologised, mostly to itself. | YES | 1 | spam cascade (8.3) |
| wait-for-it.hand | Founding Holder of the Bar's Hand | Press and hold the bar for 30 seconds. The bar said one true thing. It is not entered in the notices. | YES | 3 | hold 30 s (8.5) |
| wait-for-it.toast | Witness of the Toast | Be present when the bar asked if you smelled something. It was the toast. It is always the toast. | YES | 2 | rare event (8.6) |

Icons (Emoji <= 12 only): minute 🕰️, rewinds ⏪, dark 🌙, cancel 📋, trophy 🏆, party 🎈, witness 🎟️, cascade 🧾, hand ✋, toast 🍞. Five secrets (>= 2 required).

### 3.2 Stats (`api.stat.inc/max`, keep to this short list; name budget is 300 but use ~16)

`wait-for-it.clicks` (bar impatience clicks), `.rewinds`, `.fidgets`, `.unwatched_seconds` (add whole seconds in batches of 10 to limit calls), `.absences`, `.stalls_witnessed`, `.surges` (look-away/unwatched surges announced), `.parties`, `.tickets` (Take a Number), `.cancels`, `.trophies`, `.seasons`, `.notices`, `.holds`, `.spam` (cascades), `.events` (rare events), `.child_clicks`. Use `api.stat.max('wait-for-it.bestUnwatched', secs)` for the longest continuous unwatched stretch.

### 3.3 Save (`api.save.get/set`, all JSON, small): `season` (int, default 1), `trophies` (int, default 0, cap 5 shown), `noticeNo` (int, default 0: the last printed notice number), `bestUnwatched` (number), `metGeraldSeen` (bool, module-local; the shared flag is `metGerald`). Write on season change, on trophy, and in `destroy()` (`api.save.set` is a no-op after destroy, so write in `destroy()` BEFORE returning; it is allowed in destroy itself).

### 3.4 Meh economy (session total under about 25 Meh, plus achievements)

- +0.1 per full 10 sim s of continuous UNWATCHED time (reset by any watched tick). Reason `'looking away'`.
- +0.2 per full 30 sim s of zero input of any kind (reset on any pointer/key/touch). Reason `'nothing'`.
- +0.1 per full minute of Absent (tab hidden or pointer out of the window 5+ s). Reason `'absence'`.
- Serenity bonus +0.5 (tidying beat, 7.2).
- Impatience fee `api.award(-0.1, 'impatience')` on every 5th bar click; spam fee `api.award(-0.5, 'cooling-off fee')` once per cascade.
- Hold 7.5 s: +0.5 (`'sitting'`).
- All big payouts come from achievement rewards. Call `api.award` at least every ~20 s of play for a patient player (the 10 s unwatched drip does this) and on every rewind (the fee on every 5th). Selftest FAILS a module with zero awards or zero says: both are guaranteed in the first 20 virtual seconds by the unwatched drip (selftest SPEED makes 10 sim s = 0.5 real s) and the 1.2 s opening line.

---

## 4. THE MODEL

### 4.1 State (suggested names)

```
S (0..100), maxS (monotonic max, for floors/beat), beat (1..10), season, active (sim seconds the module has been visible and mounted),
sim (sim clock), lastInput (sim time of last pointerdown/touch/key), lastBarClick (sim), streak (impatience streak), streakAt (sim of last impatience),
watched (bool, recomputed every tick), overWindow, overBar, inRoot, outSince, hiddenSince (api.now ms), darkBank (0..12), curtainUntil (sim, 0 = none),
stall {id:0|1|2, until, reasonShown, hovered:true, clicksAtStart, done1, done2}, tidy {acc, checkUntil, failed},
dep {childP, thirdP, resolved, t0}, q (nines), ceremony {step, t0} or null, hush (sim until which no jokes), faster {until}, spam {cooldownUntil, active},
notices[], memorial[], log[], queue state, ticket, shelf trophies (from save), etaIdx/etaNext, tipNext, bags {}.
```

### 4.2 Attention factor (ONE function, evaluated every tick)

```
watched = (curtainUntil <= sim) && (overWindow || barFocused || (sim - lastInput) < 4 || detailsOpen)
```
- `curtainUntil > sim` (the Look away curtain is up) OVERRIDES everything: unwatched, even if the cursor is over the window.
- `overWindow` is set by `pointerenter`/`mouseenter` on the installer window element and cleared on `pointerleave`/`mouseleave`. Any `pointermove` inside the window also sets it (self-heals if a leave event is missed).
- `lastInput` is updated by `pointerdown`/`touchstart`/`keydown` inside root (and on bar focus). Mouse MOVES do not update it (hovering is handled by `overWindow`). Touch players: a touch makes the bar "watched" for 4 s.
- Factor: `unwatched = 1.0`; `watched = 0.35` in beats 1-7; `watched = 0.20` in beats 8-9 (nervous bar, nines).
- `faster` typed word: factor is forced to 0.5 for 30 sim s ("That is what faster means here"), replacing the factor, not stacking.
- PITY: `if (active > 900) factor = max(factor, 0.6)`; `if (active > 1500) factor = max(factor, 1.0)`. One line from Management the first time pity applies: "The bar feels bad about the delay and has decided to hurry." (once per mount.)
- Regard gauge (cosmetic): `regard += (watched ? 1 : -1) * simDt / 3`, clamped 0..1.

### 4.3 Absent (dark progress)

Absent = tab hidden (`visibilitychange`), OR the pointer has left the root element and stayed out for 5+ sim s (`inRoot` false). A fresh mount with no pointer seen is NOT absent (it is just unwatched). While Absent, `darkBank += 1.4 * simDt` capped at 12. While the tab is hidden rAF stops, so compute the bank on return from real elapsed: `bank = min(12, 1.4 * realSecondsHidden)`. On return (visible again, or pointer back in root): apply `lump = darkBank` through `advance(lump)` (stall/clamp rules apply), reset the bank, and say "Welcome back" (line S5) with `[gain]` = the lump formatted to one decimal. If the absence lasted >= 20 s (real for hidden, sim for pointer-out) and lump > 0: `api.achieve('wait-for-it.dark')`, stat `.absences` +1. Absent minute payouts: +0.1 per full absent minute.

### 4.4 Rates and pacing (S per sim second at factor 1.0)

| beat | S band | base rate | notes |
|---|---|---|---|
| 1 | 0-12 | 0.30 | starts at S = 1 |
| 2 | 12-26 | 0.35 | |
| 3 | 26-37.5 | 0.36 | stall at 37.5 for 7.5 s |
| 4 | 37.5-50 | 0.30 | tidying drops S by 3 about every 25 s unobserved |
| 5 | 50 | 0 | dependency hold; child bar drives; jump +7.5 on agreement |
| 6 | ~57.5-70 | 0.23 | second stall (7.5 s) when `S >= 62` |
| 7 | 70-84 | 0.233 | units mutate |
| 8 | 84-95 | 0.157 | the nervous bar |
| 9a | 95-99 | 0.10 | |
| 9b | 99 -> 99.999 | nines | section 4.6 |

Undisturbed this lands: 12 at 0:40, 26 at 1:20, 37.5 at ~1:55 (stall to 2:00), 50 at ~3:00, agreement at ~3:50, 70 at ~4:52, 84 at ~5:52, 95 at ~7:02, 99 at ~7:42, 99.999 and completion at ~9:27. Close enough; the exact second is not load-bearing.

`advance(dS)` is THE ONLY place S increases. It must: (a) cap a single call at the next hard stop: if `!stall.done1 && S < 37.5 && S+dS >= 37.5` set `S = 37.5` and `startStall(1)`; (b) if `beat >= 6 && !stall.done2 && S >= 62` start stall 2 in place (no clamp); (c) never take S to `>= 99` from anything except the nines integrator unless S was already `>= 99`: clamp to 99.0 (so lumps cannot skip the nines); (d) never exceed 99.999 (completion is `q >= 3`); (e) update `maxS`. All checks happen inside sub-steps (4.5), so a big `dt` can never skip a boundary.

### 4.5 The tick

One `api.requestAnimationFrame` loop. `realDt = clamp((ts - lastTs)/1000, 0, 0.25)`; `simDt = realDt * SPEED`; run `while (rem > 0) { h = min(rem, 0.25); step(h); rem -= h }` (so SPEED 20 still resolves stalls and band crossings in 0.25 s sub-steps). The loop also advances the sim scheduler (`after(sec, fn)`: a small array of `{t, fn}` processed in order, capped at 40 entries; used for rewinds, curtain end, stall end, cooling-off, ceremony steps, queue bobs, chip fades) so there are NO api.setTimeout calls except: the 1.2 s opening line, and nothing else. A render function writes DOM only when a string/style actually changed (cache last values). `step(h)` order: sim += h; active += h; recompute watched; advance S if allowed (not stalled, not in beat 5, not ceremony, not cascade/cooling-off); tidying; dependency; queue timers; ETA/tip timers; idle ladder; meh drips; beat check. The title bar text (`api.setTitle('Wait For It(TM) - 47%')`, integer percent) updates every 5 sim s only.

### 4.6 The nines (beat 9b)

Once `S >= 99`, switch to `q = -log10(100 - S)` (so `S = 99.0 -> q = 0`, `99.9 -> q = 1`, `99.99 -> q = 2`, `99.999 -> q = 3`). Integrate `dq = factor * h / (15 * 2^q)`; `S = 100 - 10^(-q)`. Each new nine takes twice as long as the last (15 s, 30 s, 60 s unwatched = 105 s). `q >= 3` -> completion. READOUT DECIMALS: `d = max(1, floor(q))` and the digits are TRUNCATED, never rounded (`Math.floor(S * 10^d) / 10^d` then `toFixed(d)`), so it can never display `100.0` before completion. At `q >= 2.97` (the last moment) the readout shows `37.5` for exactly one rendered frame (a flag consumed by the next render), Management says line X6 once, then completion fires. Impatience in the nines: `S = min(S, 99.0)` and `q = 0` (the nines are lost, the 99 is kept): mild and devastating. In 9a (S 95..99) impatience uses the normal rule with floor 95.

### 4.7 Impatience (the lecture)

A click on the bar (pointer click or keyboard-synthesised click, same `onclick` path; see 5.1) is IMPATIENCE unless the ceremony, a cooling-off wait, or a Look away curtain is active (then it is absorbed: line, no penalty).

1. `streak` resets to 0 if `sim - streakAt > 20`. `drop = min(6, 2 + 0.5 * streak)`; then `streak++`, `streakAt = sim`.
2. Floor: `floorS = 10 * floor(maxS / 10)` (the last Safe Harbour), and in beat 9 `floorS = max(floorS, 95)`. `newS = max(floorS, S - drop)`; `actual = S - newS`. If `actual < 0.05`: say line SH ("Safe Harbour"), no chip. In the nines see 4.6.
3. Rewind visual 400 ms (`steps(8)` fill transition + scanline overlay + a 2 px chromatic text-shadow flicker on the readout; instant under reduced motion). If the click happens while a stall is active, S still drops but the stall timer is unaffected and the witness secret fails (8.4).
4. Print an Impatience Notice (section 11.4) on the receipt. `noticeNo` increments (save). Receipt keeps 5 notices in the DOM.
5. If `actual >= 0.05`: file a Lost Percent chip `[Name] ([actual to 1 decimal])` in the memorial strip (cycling name list: Doreen, Gordon, Marguerite, Keith, Bernadette, Clive, Philippa, Norman, Yvette, Terence, Bartholomew, Ingrid; cap 12 chips; the oldest fades out). Occasionally (every 4th) Management adds the memorial line (11.5).
6. Stats: `clicks`, `rewinds` (only when actual >= 0.05), `notices`. Every 5th click: `api.award(-0.1, 'impatience')` and `sfx('buzz')`.
7. Stall interaction: none. Child bar interaction (beat 5): see 7.4.
8. Spam: section 8.3.

### 4.8 Fidget

Any other `keydown` that is not Tab/Shift/Ctrl/Alt/Meta, not `e.repeat`, not in an INPUT/TEXTAREA/SELECT, and not Space/Enter on a BUTTON (those activate the button natively) is a FIDGET: count it, update `lastInput`, no rewind. Lectures at fidget 1 (F1), 3 (F2), 10 (F10) and 25 (F25); otherwise silent (rate limit one fidget line per 8 sim s). Fidgets delay the queue (7.5). Typed words (section 8.7) are read from the same keydown handler.

---

## 5. CONTROLS

### 5.1 The bar (one real `<button>`)

`<button class="m-wait-for-it-bar" aria-label="Progress bar. Please do not click.">` containing the track and fill. Mouse/touch: `click` = impatience. Keyboard: Tab to it = watched (first focus line); Space/Enter = a native click event = impatience (one path only: use `onclick`; do NOT also handle Space/Enter keydown on the bar, or you will double count; the `detail === 0` synthetic click is fine). Press and hold (pointer/touch only): see 8.5. Release before 2 s = the normal click fires. Release after 2 s: the click is suppressed (`heldLong` flag set on pointerup with a 400 ms real-time expiry checked in `onclick`) and it is NOT impatience.

### 5.2 Other controls (all real buttons; none hurt; none are impatience)

- **Details** (always): toggles the Details log. OPENING IT COUNTS AS WATCHED ("the bar is jealous of Details"). Log cap 40 lines, newest at the bottom, scrolls itself; it narrates sprocket steps (11.8). Pulses from beat 3.
- **Look away (10 s)**: a large pill (min-height 44 px) that appears at beat 2. Draws a soft cream curtain over the whole installer window for 10 sim s. During the curtain: unwatched, bar clicks absorbed ("You are looking away. Please continue not looking."), any click on the curtain is absorbed the same way. At curtain end, if the bar gained >= 1 percent during it, announce a surge (S4) and award +0.1; stat `.surges`.
- **Cancel**: appears at `active >= 130` (about 2:10) or beat >= 4. Opens the 3-layer trap (7.2).
- **Run in background**: appears at `active >= 155` (about 2:35) or beat >= 4. One use per mount (7.3).
- **Skip**: appears at `active >= 390` (about 6:30) or beat >= 8, labelled `Skip (not available in your region)`; pressing it says line U6, shakes the button, nothing else.
- **Take a Number**: appears at beat 6; prints a ticket (7.5).
- **Survey slider** (`<input type="range">`): appears at beat 7 (7.6).
- The three tiny round buttons in the title bar are `aria-hidden` divs that do nothing.

### 5.3 Touch

Any touch within 4 s = watched. The Look away pill is the touch way to be unwatched (44 px). All buttons >= 44 px tall at <= 480 px.

### 5.4 Typed words

Rolling 12-character lowercase buffer from keydown (letters only, ignore modifiers and inputs): `faster`, `patience`, `sandra`, `tuesday`, `please` (section 8.7).

---

## 6. ESCALATION TIMELINE (the beats)

Beat advance rules (monotonic, evaluated every tick; `active` counts only while the tab is visible):

| beat | name | advances to next when | time-based fallback |
|---|---|---|---|
| 1 | THE PLAIN BAR | S >= 12 | active >= 60 |
| 2 | THE BAR IS SHY | S >= 26 | active >= 120 |
| 3 | DETAILS AND THE STALL | S >= 37.5 and stall 1 finished | active >= 190 |
| 4 | TIDYING AND THE TRAP | S >= 50 | active >= 260 |
| 5 | THE BAR WITH A DEPENDENCY | dependency resolves (7.4) | 75 sim s after beat 5 starts |
| 6 | THE QUEUE | S >= 70 | active >= 380 |
| 7 | UNITS MUTATE | S >= 84 | none (S only) |
| 8 | THE BAR IS NERVOUS | S >= 95 | none |
| 9 | THE NINES | completion (q >= 3) | none |
| 10 | THE COMPLETION THAT IS NOT | ceremony ends -> Season N+1, beat = 1 | none |

(Time-based fallbacks exist so a clicker, who keeps losing S, still sees the jokes. They are capped at beat 7; beats 8-10 are earned by S only.)

### Beat 1, 0:00-0:40. THE PLAIN BAR (S 0-12)
- 1.2 s after mount (one `api.setTimeout`): line A1 (first joke, zero input). The bar is already at 1 percent. Task title "Preparing to prepare".
- 3 s sim: the ETA starts churning (4.5 s to 7 s between changes, never in a monotone direction; see 11.2).
- 10 s sim with zero input so far: line A6.
- A deadpan loading-tip carousel under the bar changes every 12 sim s from a shuffle bag (11.3).
- First impatience click prints Notice No. 1.
- Task titles by beat (also changed on the beat boundary): 1 Preparing to prepare; 2 Configuring the configuration; 3 Reticulating 7 1/2 splines; 4 Thinking about thinking; 5 Waiting for the thing that is waiting for this; 6 Queueing; 7 Converting percent to elevenths; 8 Almost almost; 9 Almost almost almost; 10 Complete (Provisional); ceremony Installing trophy.

### Beat 2, 0:40-1:20. THE BAR IS SHY (S 12-26)
- Hovering visibly slows it (sweat droplet appears on the bar while watched), discovered by accident, then confirmed by Management (S1, S3, S8). The Regard gauge appears. The Look away pill appears. Marquee shimmer begins (beats 2-4). The first time the player is watched for 8 continuous sim s: line S3. The first time the player goes unwatched after being watched for 8+ s: line S4 (once).
- The Bar speaks (S2) the first time the pointer enters the window after beat 2 starts.

### Beat 3, 1:20-2:00. DETAILS AND THE STALL (S 26-37.5)
- Details pulses and its log starts narrating (11.8). Sandra is cited as the reviewer in one of the stall reasons.
- STALL 1: at exactly 37.5 percent for exactly 7.5 sim s (see 7.1).

### Beat 4, 2:00-2:50. TIDYING AND THE TRAP (S 37.5-50)
- Tidying (7.2). Cancel appears (about 2:10) and is the 3-layer trap (7.2b). Run in background appears at about 2:35 and spawns the decoy (7.3).

### Beat 5, 2:50-3:40. THE BAR WITH A DEPENDENCY (S 50, held)
- Dependency (7.4): a nested child bar, a third bar waiting for the parent. About 3:35 they agree to be patient with each other and both jump 7.5 points. Clicking the child restarts only the child.

### Beat 6, 3:40-4:40. THE QUEUE (S ~58-70)
- Queue (7.5): "You are number 7 in line to wait." Emoji queue strip (cap 12). Gerald (5), Gary (6, exactly 1 ahead). Take a Number prints ticket 7 1/2. A second stall at 37.5 shows up "in a different file" (7.1). The small red thing joins the back.

### Beat 7, 4:40-5:40. UNITS MUTATE (S 70-84)
- Readout units mutate (7.6): elevenths (S 70-76), Tuesdays (76-80), "enough" (80-84). The ETA reads in Tuesdays. Survey slider appears. Bar fill shifts through lilac then mustard. The Skip button appears (not available).

### Beat 8, 5:40-6:50. THE BAR IS NERVOUS (S 84-95)
- Strangely touching (7.7). Readout returns to percent "like nothing happened". Watched factor 0.20. Looking away is rewarded with a visible surge and a thank-you. Golden-hour tint begins. Nothing in this beat is a joke except the very last line.

### Beat 9, 6:50-8:30+. THE NINES (S 95 -> 99.999)
- Section 4.6. Golden hour deepens. Impatience costs the nines.

### Beat 10. THE COMPLETION THAT IS NOT: section 10.

---

## 7. MECHANICS IN DETAIL

### 7.1 The 37.5 stall (RUNNING GAG 2)

Stall 1: the first time S reaches 37.5 per season (and per mount). `S` is frozen at exactly 37.5 for 7.5 sim s. The right edge of the fill gets a tiny pulsing coral dot, the ETA reads `Estimated time remaining: calculating. The calculator is also stalled.`, the task title is unchanged. On start: line ST0 (Bar) then ST1 (Management) then one reason from the bag of 6 (11.6), spoken 1.5 s apart. Season >= 2: the stall "sleeps through its own reason" (11.6 ST-S2) instead of announcing one.

Stall 2 (beat 6, `S >= 62`): 7.5 s, S frozen in place, line ST2 ("in a different file"). The ETA reads `Estimated time remaining: your number.` Details log gets `Log | A stall at 37.5 percent has been filed in a different file.`

Callbacks of the number: the one-frame `37.5` flicker at q >= 2.97 (4.6); the Season 2 trophy plaque carries a tiny `37.5` in its corner that nobody explains.

### 7.2 Tidying (beat 4) and the Cancel trap

Tidying: only in beat 4. Accumulate `tidy.acc += h` only while UNWATCHED. At 25 sim s: `S = max(floorS, S - 3)` (no notice, no chip; the bar visibly walks back over about 1 s), line T1/T2/T3 (bag), `tidy.checkUntil = sim + 4`, `tidy.failed = false`, reset acc. In `step`, if `sim < tidy.checkUntil && watched` then `tidy.failed = true`. At `checkUntil`: if not failed, `api.award(0.5, 'serenity')` and line T4s. Tidying never goes below the Safe Harbour floor.

Cancel trap (7.2b): clicking Cancel opens an inline lilac dialog card (not a modal, no focus trap needed; role="dialog" `aria-label`): Layer 1: "Are you sure you want to cancel waiting?" with `Yes (Keep Waiting)` and `No (Keep Waiting)`. Both go to Layer 2: "Cancelling waiting requires Form 27B/6. Please wait while Form 27B/6 loads." with a small bar labelled `Form 27B/6` that sits at 0% (it twitches between 0.0 and 0.0 for 3 sim s). Then Layer 3: Management line C4 and the card closes ("Waiting has been rescheduled for now"). Stat `.cancels`; the first complete pass awards achievement `wait-for-it.cancel`. Pressing Cancel again later: C5 then (3rd+) C6. Opening the dialog counts as watched (the bar can see you are reading). All dialog buttons are real buttons. Cancel never disappears; it never does anything.

### 7.3 Run in background (about 2:35)

One use per mount. Pressing it: the main bar stays; a mini-bar appears pinned in the window's top-right corner mirroring S and labelled `Waiting (background)`; a full-size decoy bar appears under the main bar labelled `Waiting (second location)` that mirrors `S * 0.9 + a slow wobble` and is purely cosmetic. Lines B1, B2, B3. The decoy has a button-looking body; clicking it says B5 and does nothing (not impatience). The button then reads `Run in background (done)` and is disabled. (The mini-bar and decoy are driven by the same render function; no extra tick.)

### 7.4 The dependency (beat 5)

Entering beat 5: S is held (rate 0). The window gains a nested CHILD bar (same component, scaled 70%, with a hand-drawn bracket border) labelled `Child (waiting for parent)`, and a THIRD bar labelled `Third (waiting for parent)` (cosmetic, mirrors the child at 0.5x). Child fills at `child += 100/45 * factor * h` per sim s (so hovering slows it too). Lines D1, D3. When child >= 100 OR 75 sim s have passed in beat 5 (fallback; about 3:35 undisturbed): "agreement": D4, `advance(7.5)` bypassing the beat 5 hold, `sfx('fanfare')`, stat `.surges`+0 (no), hide child and third bars, beat = 6. Clicking the child bar (it is a real button, `aria-label="Child bar. Please do not click."`): child restarts at 0, `S = max(floorS, S - 0.5)`, no notice, no chip, stat `.child_clicks`, lines D5/D6 (bag), and it does NOT count toward spam and does NOT feed the streak.

### 7.5 The queue (beat 6)

A strip of emoji cells (cap 12; each cell a `<span>` with a title attribute, bob 1 px on a sine of `sim`): positions front to back: `🪑`, `🪑`, `🪑`, `🧦` (title "presumed on a journey"), `🥔` (Gerald, number 5), `🐌` (Gary, number 6), `🙂` (you, number 7). At beat 6 start, line Q1. Gerald speaks once: Q2a if `metGerald` is true else Q2b (and set `metGerald`). Gary: Q3, and if `snail-marathon.pixels > 0` also Q3b. At about +30 sim s a cell tagged `½` cuts in between Gary and you (Q4; the strip then reads "7 1/2"). At about +45 s a `🔴` joins the back (Q5); it is a real button (`aria-label="Something small and red. Please do not press."`); pressing it says `The Button | Also do not press.` (if `the-button.presses > 0` add the count variant Q5b) and is never impatience.
The queue "advances" only while nobody fidgets: every 20 fidget-free sim s the strip slides one place forward, then back after 2 s with a Q6 line (bag Q6/Q7). A fidget during the slide: line Q8 once per 20 s.
Take a Number: a button (beat 6+). Pressing prints a thermal ticket element (one at a time, replaced each press) reading `NUMBER 7 1/2`; line T-A first time, T-B afterwards; stat `.tickets`. The ticket is a decoration; never counts as a click on the bar.

### 7.6 Units mutate (beat 7) and the survey

Readout bands during beat 7 only: S 70-76: `[x] elevenths` where `x = (S * 0.11).toFixed(1)` and the ETA reads in Tuesdays; S 76-80: `[x] Tuesdays` where `x = (S / 20).toFixed(1)`; S 80-84: `[pct] enough` where pct = integer S. Each band announces itself once (U1, U2, U3). At beat 8 the readout returns to percent and Management says U7. The fill colour shifts mint -> lilac (S 70-80) -> mustard (80-84+), via a CSS variable `--fill`. Survey: at beat 7 a slider labelled `How long have you been waiting?` with end labels `a bit` and `since the harvest`; on `change` Management says U4 (first time) or U5 (later), at most once per 15 sim s; nothing is stored. The Skip button appears (about 6:30 or beat 8).

### 7.7 The nervous bar (beat 8) and golden hour

Lines V1..V7 (11.9) play in order at S 84, 86.5, 89, 91, 93, 94, 94.9 (one each). Watched factor 0.20. If the player goes unwatched for 20 continuous sim s in this beat: V5 surge line, `api.award(0.3, 'thanks')` once per mount, stat `.surges`. The golden-hour overlay (`linear-gradient(rgba(242,185,59,.35), rgba(255,122,102,.18))`, `pointer-events:none`) fades in over 3 s at the start of beat 8 and holds. The last V line is the only joke.

---

## 8. IDLE, SPAM, SECRETS, RARE EVENTS

### 8.1 Thresholds (sim seconds of ZERO input; any pointerdown/key/touch resets; mouse moves do not reset)

- 10 s with no input ever: A6.
- 30 s: line I30 + `api.award(0.2, 'nothing')` (and then every further full 30 s, 0.2).
- 60 s: line I60. Achievement `wait-for-it.minute` is separate (60 s since last BAR click).
- 120 s: line I120 with `[gain]` = percent progress made in the last 120 sim s (S now minus S 120 s ago, floored at 0, one decimal). The bar is "caught blushing" (a CSS blush on the track for 4 s).
- 180 s: THE UNATTENDED PARTY (8.2).

### 8.2 The unattended party (SECRET, `wait-for-it.party`)

At 180 sim s of zero input and tab visible: bunting (a repeating-conic-gradient triangle row) fades in along the top of the window, ONE balloon emoji `🎈` drifts up from the bar, three soft sfx (`bloop` at 0, 1.5, 3 s of party time), lines I180 then PA1. Stat `.parties`, achievement. ANY input freezes the party mid-air like statues (CSS `animation-play-state: paused`, balloon stays where it is) and the bar says PA2 ("Nothing was happening"); the bunting then fades out over 2 s. The party can happen once per mount (flag).

### 8.3 SPAM, the rewind cascade (SECRET, `wait-for-it.cascade`)

Trigger: >= 15 BAR clicks within 3000 REAL ms (a list of `api.now()` stamps). Not retriggerable during the cascade or its cooldown (60 sim s). Sequence:
1. `preS = S`; freeze S. For 3 sim s the DISPLAYED fill rewinds to 0 in a spectacular tape-rewind (stepped transition, scanlines, flicker) while 4-6 Notices print in rapid fire (Z4 with consecutive numbers, only 5 survive in the DOM anyway) and line Z1.
2. Mandatory 7 1/2 second COOLING-OFF WAIT: a cream curtain, a soft hum (`sfx('tick')` three times spaced), a tiny hold-music waveform (an inline SVG polyline that scrolls), line Z2. All bar clicks absorbed: first absorbed click says Z5, later ones are silent.
3. Management issues the Certificate of Impatience (a small framed card element with a flourish, shown for 6 sim s; line Z3), `api.achieve('wait-for-it.cascade')`, `api.award(-0.5, 'cooling-off fee')` once, `sfx('error')`.
4. Restore: `S = max(floorS, preS - 7.5)`; the fill animates back up over 1 s; line Z6; stat `.spam`.
Fuzz note: the fuzzer fires bursts of 25-70 clicks; the cascade absorbs the rest. The cascade must never leave `S` NaN, below 0, or the bar permanently frozen (a failsafe timer in the scheduler: if the cascade has lasted > 20 sim s, force step 4).

### 8.4 THE STALL WITNESS (SECRET, `wait-for-it.witness`)

If during the ENTIRE 7.5 s of stall 1 the pointer is over the bar (or the bar has keyboard focus) AND `clicks` did not change AND the curtain is not up: at stall end the bar apologises (line WI), the Details log prints a stall ticket (log line WI-L), `api.achieve('wait-for-it.witness')` (pays 7.5), stat `.stalls_witnessed`. First time per season only.

### 8.5 SIT WITH THE BAR (SECRET, `wait-for-it.hand`)

Pointer/touch press on the bar and HOLD without releasing (movement past 12 px or leaving the bar cancels). Measured in real ms from `api.now()` in the tick. 2 s: line H2. 7.5 s: line H75 and `api.award(0.5, 'sitting')`. 30 s: the bar speaks (line H30, the one true thing), achievement, stat `.holds`. Release after >= 2 s is NOT impatience. Holding does not speed the bar (it counts as watched, so it slows it), it just gets thanked. Release after a 30 s hold: line H-REL.

### 8.6 Rare events and secrets (one roll per sim second, beat >= 2, not during ceremony/hush)

- THE TOAST: probability `1/2400` per sim second (about 1 in 40 per minute), at most once per mount. The bar says `Do you smell something?`, a very small `💨` drifts across the bar for 4 s, then `It was the toast.` and a tiny `🍞` appears at the bar's right end and fades. Achievement `wait-for-it.toast`, stat `.events`.
- COZY: if `root.clientWidth < 420` (check on mount and on `resize` via `api.on(window,'resize')`, once per mount): the bar says line CZ. Stat `.events`.
- Surprise absence line: the pointer leaves the window (root) for 5+ s: line AB1 once per mount.
- MANAGEMENT CAN BE CAUGHT: rolling `sandra` line, etc. (8.7).

### 8.7 Typed words

`faster`: factor forced to 0.5 for 30 sim s, line W1 (a `faster` toast chip "Faster" in the status area for the duration). `patience`: line W2. `sandra`: line W3. `tuesday`: line W4. `please`: once per mount, line W5. Each word has a 20 sim s cooldown.

---

## 9. STATE MACHINES (summary)

- Mount: load save (`season`, `trophies`, `noticeNo`), seed receipt empty, S = 1, beat 1, bar title "Preparing to prepare", status line. Season >= 2: track width 70%, `Revised:` prefix, notice numbering continues, shelf shows saved trophies.
- Normal run: `RUN` -> (stall) `STALLED` -> `RUN` -> ... -> `HOLD` (beat 5) -> `RUN` -> `NINES` -> `CEREMONY` -> season++ -> `RUN`.
- Overlays that pre-empt input: `CURTAIN` (Look away), `CASCADE` (8.3), `CEREMONY`. While one is active the bar absorbs clicks (no penalty).
- Destroy: save, nothing else (api clears timers/listeners). The harness destroys and remounts mid-run: every piece of state lives in the closure, so a remount is clean. Do not store anything in module-level variables except constants.

---

## 10. THE NOT-ENDING (section "CEREMONY") AND SEASON 2+

Trigger: `q >= 3` (S >= 99.999) in the nines (after the 37.5 one-frame flicker), OR the selftest hatch (13.4). `S = 100`, `ceremony = {step:0, t0:sim}`. Steps on the sim scheduler (all in sim seconds from t0):

- **t0**: single chime `sfx('bell')`; the ETA reads `Estimated time remaining: Now.` (the only time); the fill turns into a ribbon (mustard, no stripes); the percent readout shows `100.0`; the whole window holds for 1.0 s of hush (stripes frozen, no tip changes). The hatch under selftest does the same.
- **t0+1.0**: a tiny CSS trophy (36 px) rises from the bar on its pedestal; the plaque types `WAITED.` letter by letter (2 chars per sim 0.15 s). Line E1 (Management, priority 2, mood proud).
- **t0+3.5**: Gerald's emoji (`🥔` with a ribbon and a tiny hat made of CSS) leaves the queue strip and slides to the trophy (CSS translateX over 1.2 s; instant under reduced motion). `api.flag.set('metGerald', true)`. Gerald's speech E2 (Gerald, priority 2): "To wait is to be a potato in time. Eventually you are mashed into destiny. Well done. Hold the trophy." Management is SILENT for the full speech (hush).
- **t0+8**: Management drops the voice. Line E3 (priority 2, mood proud): "You waited. That is the whole accomplishment. Thank you for it." `api.confetti(undefined, undefined, 20)` once (modest). `api.achieve('wait-for-it.trophy')` (pays 10). `api.stat.inc('wait-for-it.trophies')`, save `trophies = min(5, trophies + 1)`.
- **t0+11**: Management line E4 (priority 2): "The trophy is small. It is real. Management has no joke here and would like to be allowed to be proud."
- **t0+11 .. t0+17**: NO JOKES for six seconds: `hush = sim + 6`; the tip carousel, ETA churn, events and every other say() except the above are suppressed (caption strip too).
- **t0+17**: with no transition: line E6 "Installing trophy. 0 percent. Please wait." A second, thinner bar appears under the main bar labelled `Installing trophy` at 0%. The ETA reads `Estimated time remaining: Now (previous).`. Task title "Installing trophy".
- **t0+21**: line E7 (Lost Percents invited back, all 0.3: relabel every memorial chip `Name (0.3)`).
- **t0+25**: SEASON N+1: `season++` (save), stat `.seasons`, the trophy moves to the shelf (cap 5; each new season adds a sibling, label on the plaque No. 1, No. 2, ...), `S = 1`, `maxS = 1`, `beat = 1`, `q = 0`, stalls re-armed, child/third/decoy bars removed, `hush` ends, track width animates to 70% (season 2+), Management line E8, then (if `noticeNo < 12`) set `noticeNo = 12` so the next notice is No. 13; line E12; line E10 (Gary is exactly 1 position ahead of the trophy; a tiny `🐌` chip appears beside the shelf trophy). The footer fine print changes from `Step 1 of 1,204` to `Step 2 of 1,204. The bar has been told you are good at this.` (and so on: Step N+1 of 1,204). The window title bar still reads `Wait For It(TM) - 1%`.
- Season 2+ changes (EXACTLY these; the module never explains them): the bar is 0.7x as long (visual width only; the wait is not shorter); every Management line is prefixed `Revised: `; the 37.5 stall sleeps through its own reason; Gary is exactly 1 position ahead of the trophy; Notice numbering continues from 13; the first notice of the season is the Notice of Appreciation (11.4 NA); the trophy plaque in the corner has a tiny `37.5`; the memorial strip keeps its chips (still named); the ETA starts at `about 2 minutes` again with full faith.
- Clicks during the ceremony: absorbed. Line CE ("Not now. The trophy is being sincere.") the first time per ceremony.
- The module never says Game Over. There is no exit prompt. The permanent footer reads the Step counter; the final line the player ever sees is the Step line.

---

## 11. ALL LINES (verbatim; speaker | text; tokens in square brackets are filled by the module)

Pools marked (BAG) use a shuffle bag (never the same line twice in a row; refill and reshuffle when empty). 11.1-11.10 total well over 130 distinct lines.

### 11.1 Opening and the plain bar

```
A1  Management | Please wait. The wait has been scheduled for you personally. It is not a rush job.
A2  Management | Preparing to prepare. Estimated time remaining: about 2 minutes. The estimate was made by someone optimistic.
A3  Management | Your wait has been given its own bar. It is a very good bar. It has never been asked to do anything fast.
A4  Management | The bar is already at 1 percent. This is not progress. This is a head start, and head starts are not discussed.
A5  Management | This is the entire game. A bar will load. Your job is to be somewhere nearby while it does.
A6  Management | Nothing has happened yet. Management considers this a good start and would like it noted.
```
A1 plays at 1.2 s; A5 follows 6 s later if nothing has been clicked; A4 fires when S first crosses 1.5 (A2 is the status line text the first time the ETA churns).

### 11.2 The ETA engine (BAG, cycles every 4.5-7 sim s; the prefix is added by the module: `Estimated time remaining: `)

```
ETA1   about 2 minutes.
ETA2   1 minute.
ETA3   4 minutes.
ETA4   please disregard that.
ETA5   one lunch.
ETA6   a pleasant amount.
ETA7   17 minutes, give or take a Tuesday.
ETA8   calculating. Calculating how to calculate. Calculating is 12 percent done.
ETA9   7 1/2 minutes, in every direction.
ETA10  less than the time you have already spent wondering.
ETA11  a short while. It is a longer while than that.
ETA12  3 minutes, 51 seconds, give or take a lunch.
ETA13  4 minutes. Updated: still 4 minutes. It has been 1 minute. We are not discussing this.
ETA14  unknown. This is the most accurate estimate yet and Management is proud of it.
ETA15  about about 5 minutes.
```
Beat-specific overrides (replace the bag while true): stall 1: `calculating. The calculator is also stalled.`; stall 2 / beat 6: `your number.`; beat 7: `2 Tuesdays, but only the quiet ones.` / `one and a half Tuesdays.` (alternate); beat 8: `it depends on whether you are looking.`; nines: `about 5 seconds.` then `about about 5 seconds.` and the word `about` gains one each repeat (cap 12): this is RUNNING GAG 1's Zeno payoff; completion: `Now.`; ceremony after: `Now (previous).`; season 2+: starts again at ETA1 with full faith.

The ETA text node changes with a short odometer roll (a CSS slide, instant under reduced motion). Never decrease monotonically: the bag shuffles so any ordering is allowed.

### 11.3 Loading tips (BAG, every 12 sim s, shown under the bar as `Loading tip: ...`)

```
TP1   Loading tip: the bar is also loading a tip. You are reading it. The tip is that you are reading it.
TP2   Loading tip: for best results, wait. For worst results, also wait. Results may vary by less than that.
TP3   Loading tip: a watched bar does not boil. Nobody has checked whether it loads.
TP4   Loading tip: if the bar says 99 percent, it is lying slightly, in a friendly way.
TP5   Loading tip: Dennis (Plant) has never clicked a progress bar. Dennis is doing fine.
TP6   Loading tip: waiting is the only task that gets easier the less you do it.
TP7   Loading tip: 7 1/2 percent of all waiting is spent wondering how much is left.
TP8   Loading tip: please do not stare at the tip. The tip is shy too.
TP9   Loading tip: Sandra from Compliance recommends blinking at a normal speed. Sandra has not said what normal is.
TP10  Loading tip: the bar was trained on thousands of other bars and learned only patience.
```

### 11.4 Impatience Notices (printed on the receipt; the module prints `Notice No. <label> | <text>`; label is `7 1/2` for notice number 7 only)

Chosen by `noticeNo` (lifetime) after increment, so No. 1 is the first ever:

```
N1   Notice No. 1 | You clicked the bar. The bar has been clicked before and it did not help then either. Progress reduced by [lost] percent.
N2   Notice No. 2 | Clicking does not make a bar faster. It makes the bar go back and think about what it did.
N3   Notice No. 3 (supersedes No. 2, which was about lunch) | Please wait without checking that you are waiting.
N4   Notice No. 4 | A watched bar does not boil, and it does not load. Please look at something else. Please look at it less.
N5   Notice No. 5 | The bar has been rewound [lost] percent. The [lost] percent has not been lost. It is being held in the memorial strip for safekeeping.
N6   Notice No. 6 | Impatience has been detected, logged and filed under 'Understandable'. The bar has gone back anyway. Policy.
N7   Notice No. 7 1/2 | This notice is a half notice. It is as much notice as we could spare.
N8   Notice No. 8 | Per Notice No. 3, please wait without checking. Per Notice No. 8, please stop reading Notice No. 3.
N9   Notice No. 9 | You have clicked the bar 9 times. The bar would like a word. The word is 'please'.
N10  Notice No. 10 | Notice No. 10 is a courtesy copy of Notice No. 9, with the word 'please' underlined by a different person.
N11  Notice No. 11 | The bar has asked to see the notices. It has read them. It says it understands. It does not understand.
N12  Notice No. 12 (final) | We will no longer notify you of impatience. Please consider yourself notified.
```
After No. 12 (BAG, label `Notice No. [n] (Revised)`):
```
NR1  Notice No. [n] (Revised) | You have been notified. The previous notification remains in force.
NR2  Notice No. [n] (Revised) | Impatience noted. The note is in a drawer with the other notes, gently.
NR3  Notice No. [n] (Revised) | The bar has been rewound again. It is getting good at it. Nobody is proud.
NR4  Notice No. [n] (Revised) | This notice was issued in error. The error was issued correctly.
NR5  Notice No. [n] (Revised) | Please see Notice No. 3, which is about lunch, and has been superseded.
NR6  Notice No. [n] (Revised) | Impatience is not a crime. It is an administrative event with a receipt.
NA   Notice of Appreciation | All previous notices are withdrawn. You did very well, in the sense that you came back.
```
Receipt-only extras: `Z4  Notice No. [n] | Notice. Notice. Notice. Notice. Notice.` (cascade rapid fire). NA prints as the first receipt entry of every Season >= 2 (before any click).

### 11.5 Rewinds, Safe Harbour and the memorial (BAG, spoken after rewinds at most 1 in 3, never during a stall line)

```
RW1  Management | Rewinding. The bar is walking backwards, politely, so as not to turn its back on you.
RW2  Management | The bar has gone back [lost] percent to think about what it did. It did nothing. It is thinking anyway.
RW3  Management | Lost percent: [name] ([lost]). [name] will be missed. A chip has been placed in the memorial strip, in a very small font.
RW4  Management | The memorial strip now holds [count] percents. Gordon is always listed as 'missed in the 40s', regardless.
SH   Management | The bar has reached a Safe Harbour. It will go back no further. Sandra has put a small chair there.
```
RW3 uses the name just filed. Every memorial chip is a gray rounded chip `Name (x.x)`; a ribbon above reads `In memoriam (percents)`.

### 11.6 The shy bar, Regard, look away

```
S1   Management | The bar is shy. Bars move at the speed of how little they are watched. This is on page 2 of the brochure.
S2   Bar | I can feel you looking. It is fine. It is just that I am a bar and this is how I load.
S3   Management | A cursor has rested on the bar for 8 seconds. The bar has slowed down in a gesture of modesty.
S4   Management | You looked away and the bar did [gain] percent in a rush. It would like you to believe it was always going to.
S5   Management | Welcome back. In your absence the bar made [gain] percent of progress. It wishes to be known as 'self-motivated'.
S6   Bar | Please go and do something else. I will be done by the time you come back, or I will not.
S7   Management | The Regard gauge measures how much the bar feels looked at. It is cosmetic. The bar says it is not.
S8   Management | A watched bar fills in exactly as much as it feels like. The difference is that it knows.
LA1  Management | You have looked away on purpose. This is the nicest thing anyone has done for the bar this week.
LA2  Management | You are looking away. Please continue not looking. A curtain has been provided.
LA3  Bar | You are back. I was not doing anything. I was only doing a lot.
AB1  Management | The cursor has left the building. The bar is not saying anything. The bar is saving it up.
PI   Management | The bar feels bad about the delay and has decided to hurry. It will deny this.
```
S1 fires when beat 2 starts (once). S7 when the Regard gauge first appears. S2 / S6 as noted in beat 2. LA1 when the curtain goes up the first time. LA3 at curtain end.

### 11.7 Tidying, stall, reasons, witness

```
T1   Management | The bar is going backwards for a moment. This is called tidying. It will be back.
T2   Bar | I just remembered I left something at 41 percent. Please do not follow me.
T3   Management | The bar has gone back to check on something. It does not say what. It was the stove.
T4   Management | Tidying complete. The bar is 3 percent tidier and, it says, 3 percent less itself.
T4s  Management | You stayed away through the tidying. The bar did not have to be brave. Serenity bonus: 0.5 Meh.

ST0  Bar | 37.5 percent. I need a moment. It is not a long moment. It is a precise one.
ST1  Management | The bar has stalled at 37.5 percent, as scheduled. The stall is on the calendar. Your attendance is optional.
RS1  Management | Reason for stall: waiting for a signature. The signature is also loading.
RS2  Management | Reason for stall: Sandra is reviewing the percentage. Sandra says 37.5 'looks fine, but not in a way I can sign'.
RS3  Management | Reason for stall: a very small fire drill, inside the bar. Everyone has left the bar. Everyone is back.
RS4  Management | Reason for stall: 37 has finished and 38 has not started. They are both on break.
RS5  Management | Reason for stall: Dennis (Plant) was asked to look at the bar and has declined, politely, by being a plant.
RS6  Management | Reason for stall: a decimal is being carried across the room by two people who have not met.
ST2  Management | The bar has stalled at 37.5 percent again, in a different file. Please do not ask which file. The file does not know either.
STS  Management | The stall is sleeping through its own reason. It will be along. It has been told.   (season >= 2 replacement for RS1-RS6)
WI   Bar | You watched the whole stall. Nobody has ever done that. Please accept this ticket. It is for nothing and numbered 7 1/2.
WIL  Log | Stall ticket 7 1/2 issued to [player]. Admit one. Valid for nothing.
```
RS lines: one from a bag of six per stall 1 (never repeats across stalls in a mount).

### 11.8 Details log (BAG, one line every 4-8 sim s while open or while beat >= 3; cap 40; the log prefixes with a mm:ss stamp)

```
LG1   Aligning the 7 1/2 sprockets... done (again).
LG2   Warming up the warm-up... warm.
LG3   Asking the previous step how it is... it is fine, it says.
LG4   Reticulating a spline. The spline was already reticulated. Reticulating it back.
LG5   Defragmenting 14 seconds (two found under the sofa).
LG6   Buffering anticipation (3.5 GB). Available in small, medium, and 'any moment now'.
LG7   Polishing the middle. The middle is now very shiny. Nobody is looking at it.
LG8   Unpacking 'soon' (flat-packed, one screw missing).
LG9   Locating It... It is behind a more important It.
LG10  Sandra has the file. Sandra is on a Tuesday.
LG11  Consulting the other bar. The other bar is consulting a different bar.
LG12  Counting to 37.5. This takes longer than it sounds and exactly as long as it looks.
DT1   Management | Details is open. The bar can see that you are reading about it. It is flattered, and slower.
```
DT1 once per mount, the first time Details opens.

### 11.9 Cancel, background, dependency

```
C1   Management | Cancel is now available. Cancel will ask if you are sure. Cancel has a lot of questions.
C2   Dialog | Are you sure you want to cancel waiting?
C2a  (button) Yes (Keep Waiting)
C2b  (button) No (Keep Waiting)
C3   Dialog | Cancelling waiting requires Form 27B/6. Please wait while Form 27B/6 loads.
C4   Management | Waiting has not been cancelled. It has been rescheduled for now.
C5   Management | You have cancelled again. Waiting has been rescheduled for slightly later now.
C6   Management | Waiting has been cancelled so many times it has become a hobby. The hobby is also waiting.
B1   Management | The wait is running in the background. It has been moved to a smaller bar in the corner. It is the same bar, but braver.
B2   Management | You are now waiting in two places. This is not recommended and is, as of today, a policy.
B3   Management | The second bar advances in lockstep with the first. Only one of them counts. Management will not say which, for morale.
B4   Bar | The decoy is doing very well. Please do not tell it that it is the decoy.
B5   Management | Bringing the decoy to the front is not available. The decoy has a good job where it is.
D1   Management | The bar is waiting for another bar. The other bar is waiting for this bar. They have agreed to be patient with each other.
D2   Bar | I cannot start until the one below me finishes. The one below me cannot start until I finish. We are very close.
D3   Management | A third bar has appeared. It is waiting for the parent. It does not know why. It was told it would find out.
D4   Management | The bars have agreed to be patient with each other. Both have jumped 7 1/2 percent. This is called synergy and it is not repeatable.
D5   Management | You have restarted the child bar. Only the child. The parent did not feel it, but it noticed the draught.
D6   Child Bar | I was at 80. I am at 0. I would say it was fine, but I am a child bar and I am not allowed to say that.
```
D5/D6 alternate (BAG) on child clicks; D2 once at beat 5 +10 sim s.

### 11.10 Queue, ticket, red thing

```
Q1   Management | You are number 7 in line to wait. Please do not wait ahead of your turn.
Q2a  Gerald | Ah, [player]. We have met. I have been waiting longer than last time.
Q2b  Gerald | I am Gerald, Vice President of Spuds. I am number 5. It is a good number to be near.
Q2c  Gerald | A potato is simply a patient chip. I have been waiting since the harvest. It is going well.
Q3   Management | Gary is in the queue, exactly 1 position ahead of you. Gary is not able to explain this.
Q3b  Management | Gary says it is a contract. Gary has not said which contract.
Q4   Management | You are now number 7 1/2 in line. Someone has cut in at the half. We asked them to leave. They are a fraction.
Q5   Management | Something small and red has joined the back of the queue. It has been asked not to be pressed. It has agreed, with a sigh.
Q5b  The Button | Also do not press. I have been pressed [count] times and it is a lot, for a button.
Q5c  The Button | Also do not press.
Q6   Management | The queue has advanced one place. It then regretted it and went back.
Q7   Management | The queue advances only while nobody fidgets. Please sit like a person with nothing in their pockets.
Q8   Management | Fidgeting detected. The queue has moved back one place to give you room.
TA   Management | Please take a number. Your number is 7 1/2. We ran out of whole numbers on Tuesday.
TB   Management | You have taken another number. It is 7 1/2 as well. Numbers are a very small club here.
```
Q2c is Gerald's second queue line (only if the player stays in beat 6 for 20 more sim s). Q5b only when `the-button.presses > 0`, else Q5c.

### 11.11 Units and the survey (beat 7)

```
U1   Management | Progress is now measured in elevenths. You are [x] elevenths of the way there. Eleven was the number we had.
U2   Management | The bar is now at [x] Tuesdays. We are not saying a Tuesday of what.
U3   Management | Percent has been retired after long service. The bar is now measured in enough. It is [pct] percent enough.
U4   Survey | How long have you been waiting? Please answer from 'a bit' to 'since the harvest'. Thank you. Your answer has been waited on.
U5   Management | Your survey answer has been placed in the queue. You are number 7 1/2 in the queue for answers.
U6   Management | Skip is available. Skip is not available in your region. Your region has been informed.
U7   Management | Percent is back from leave. It sends its best and says nothing happened.
```

### 11.12 The nervous bar (beat 8) and the nines (beat 9)

```
V1   Bar | I am nervous when you watch me. I did not want to say that. I just did. It is out.
V2   Management | The bar has asked to be left alone for exactly 20 seconds. Dennis (Plant) is available to look at instead. He does not mind.
V3   Bar | Thank you for looking away. I did not do anything. I am saying that, but I did a little.
V4   Management | The bar is not slow. It is shy. The staff have been retrained to say that.
V5   Management | The bar has surged [gain] percent while unobserved. It is thanking you in a way that does not involve being seen.
V6   Bar | It is getting warm in here. That is not the bar. That is the time of day we have decided it is.
V7   Management | That lasted 7 1/2 sentences. Normal service has resumed. Nothing happened. It was very good.

X1   Management | The bar is at 99 percent. It will be at 99.9 percent shortly. Then 99.99. We have run out of nines and ordered more.
X2   Management | Each new nine takes twice as long as the last. This is a rule. Nobody here made it.
X3   Bar | I am so close. I am always so close. This is the nicest I have ever been to anything.
X4   Management | Impatience at this stage costs you the nines but not the 99. It is mild and it is devastating. Please sit.
X5   Management | The decimal point has requested a chair.
X6   Management | For one frame the readout said 37.5. It was just checking. It is fine.
X7   Management | It is too close for this. Please put the mouse down and think about something far away.
```
X1 at q=0 first time, X2 at q=1, X3 at q=2 first time, X4 after the first impatience in the nines, X5 at q=2.5, X7 at q=2.8, X6 at the flicker.

### 11.13 Ending and Season 2+

```
E1   Management | Your wait is complete. Please remain seated. A small trophy is on its way. It is sincere.
E2   Gerald | To wait is to be a potato in time. Eventually you are mashed into destiny. Well done. Hold the trophy.
E3   Management | You waited. That is the whole accomplishment. Thank you for it.
E4   Management | The trophy is small. It is real. Management has no joke here and would like to be allowed to be proud.
E5   Plaque | WAITED.
E6   Management | Installing trophy. 0 percent. Please wait.
E7   Management | The Lost Percents have been invited to the ceremony. They are late. They are all 0.3.
E8   Management | Welcome to Season [season]. Everything is the same, but shorter, and the wait is not.
E10  Management | Gary is exactly 1 position ahead of the trophy. Gary did not wait for it. Gary is just there.
E11  Management | The trophy has been given a sibling. The sibling is also sincere.
E12  Management | Your Impatience Notices continue at No. 13. Numbers have not stopped.
E13  Management | The plaque has a tiny 37.5 in the corner. We have been asked not to explain it. We were not going to.
E14  Management | Step 2 of 1,204. The bar has been told you are good at this.
CE   Management | Not now. The trophy is being sincere.
```
E8 gets the `Revised: ` prefix like all Management lines in season >= 2 (the module's own `say` rule); E3/E4 are never prefixed (set `opts.sincere = true` to skip the prefix). E11 from season 3 on. E13 once ever (first Season 2).

### 11.14 Spam cascade

```
Z1   Management | Rapid impatience detected. The bar is being rewound faster than we are equipped to supervise.
Z2   Management | A Cooling-Off Wait of 7 1/2 seconds has begun. It will not be spent. It will only be waited.
Z3   Management | A Certificate of Impatience has been issued. It is framed. It is also an apology, from us, to you.
Z5   Management | During the Cooling-Off Wait all clicks are absorbed. The bar says thank you for the clicks. It kept none.
Z6   Management | The bar has been restored to roughly where it was, minus 7 1/2. The 7 1/2 went to the Cooling-Off Wait, which was hungry.
```

### 11.15 Idle, party, fidget, typed words, hold, rare events

```
I30  Management | 30 seconds without input. This has been entered in the ledger under Nothing, Admirable.
I60  Management | You have not moved for 60 seconds. The bar has noticed. It is trying not to make it weird.
I120 Management | 120 seconds of stillness. Progress made while nobody looked: [gain] percent. The bar would like this to stay between us.
I180 Management | Nobody is watching. The bar is throwing a very small party. There is one balloon. It is a good balloon.
PA1  Management | The bunting was put up by no one. It is very well put up.
PA2  Bar | Nothing was happening. Please disregard the balloon.

F1   Management | You pressed a key. The bar has not been asked to take dictation. It is flattered anyway.
F2   Management | Fidgeting detected. The bar can hear the drumming. It describes the rhythm as 'a good rhythm for something that is not progress'.
F10  Management | That is 10 fidgets. The bar has begun to hum along. It is in a different key.
F25  Management | 25 fidgets. Management has written 'restless' on a very small card and put it in a drawer.

W1   Management | You typed 'faster'. The bar has slowed down to be safe. That is what faster means here.
W2   Bar | You typed 'patience'. The bar says show it, do not type it. Then it says, actually, typing is fine.
W3   Management | Sandra from Compliance has been told you typed her name. Sandra says she is 'not here, but flattered'.
W4   Management | You typed 'tuesday'. It is not here yet. It has been seen near the horizon. Please remain calm.
W5   Bar | Thank you for saying please. Nobody says please to a bar. The bar will remember. The bar remembers nothing. It will remember this.

H2   Management | You are sitting with the bar. Management has never seen this before. Management has seen it in a film.
H75  Management | 7 1/2 seconds. The bar is thanking you for the company. It is not refundable.
H30  Bar | Nobody has ever held me. I thought I was only meant to be looked at.
HR   Management | You have let go. The bar is fine. The bar is not fine. The bar will tell no one.

TO1  Bar | Do you smell something?
TO2  Bar | It was the toast.
CZ   Bar | The window has been measured. The bar is now cozy.
KB   Management | Keyboard. Considerate. The bar notes you have not clicked. The bar notes everything.
```
KB: the first time the bar receives keyboard focus (once per mount).

---

## 12. VISUAL DESIGN

**Palette (matches the Lobby; all as tokens on `.m-wait-for-it-root` / the module wrapper):** cream `#FFF4DC` background with a faint dotted-paper texture (`radial-gradient(#2b211822 1px, transparent 1.5px) 0 0/14px 14px`), ink `#2B2118` for 3px outlines and `4px 4px 0` sticker shadows, mint `#9BE0C4` bar fill (darker mint `#6CC7A4` stripe), coral `#FF7A66` impatience/rewinds/stall dot/Cancel, mustard `#F2B93B` trophy/golden hour/Skip, lilac `#C3A6F0` dialogs and nested bars, sky `#BFE3F2` queue strip, track `#FFFDF5`. Fonts: `ui-rounded, 'Trebuchet MS', system-ui, sans-serif`; numbers in `ui-monospace, Consolas, monospace` with `font-variant-numeric: tabular-nums`. Text always ink on cream/white; no low-contrast grey on cream (AA).

**Layout** (single column at <= 899 px, no horizontal scroll at 360 px; two columns at >= 900 px: the window left, receipt + shelf + memorial right):
1. The installer window: beveled box (3px ink, radius 14px, sticker shadow). Title bar with three tiny round `aria-hidden` buttons and the task title text. Under it:
2. Status/ETA/readout block: big monospace percent readout (right), ETA line (small, italic) under the task title, tip line under that.
3. THE BAR: a `<button>`, height 44px, border 3px ink, radius 24px, recessed track, fill driven by CSS var `--p` (transform: scaleX on ONE element, `transform-origin: left`; never animate width). The fill uses `repeating-linear-gradient(-45deg, mint 0 14px, darker 14px 28px)` with animated `background-position` (frozen under reduced motion), a segmented look via a mask, a marquee shimmer block (beats 2-4), a coral pulsing dot at the right edge during stalls, a CSS sweat droplet while watched. A speech bubble for the Bar (pointer-events none, aria-hidden since the caption strip carries it).
4. Beat-gated extras: child bar and third bar (beat 5, scaled 70%, hand-drawn bracket border), decoy + mini-bar (after Run in background), queue strip (sky background, emoji cells), survey slider, Form 27B/6 mini bar inside the Cancel dialog.
5. Controls row: Details, Cancel, Run in background, Look away (10 s), Take a Number, Skip. Real buttons, min 44px tall on narrow screens, focus ring a dashed mustard outline.
6. The RECEIPT: thermal-paper strip beside the bar (below it on mobile), cream-white `#FFFEF8`, zigzag top and bottom edges via `conic-gradient` tricks, monospace 12px, prints the Impatience Notices with a 250 ms paper-feed animation (translateY from -100%), max 5 notices in the DOM, a `Ticket` slot under it for Take a Number.
7. Regard gauge: a tiny cosmetic arc/bar `Regard` beside the Look away pill (beat 2+).
8. Memorial strip: ribbon `In memoriam (percents)` and up to 12 small gray rounded chips; newest drops from the bar tip with a small bounce; oldest fade out.
9. Trophy shelf at the bottom: a plank with up to 5 trophy slots (36px each, label `No. 1`, `No. 2` ...), `Trophies of Waiting` label.
10. Caption strip (`role="status"`, `aria-live="polite"`): the module's own last 8 lines, plus the footer line `Step 1 of 1,204` and a 10px fine print: `Impatience may result in a notice. Patience may result in a trophy. Neither is guaranteed.`

**The trophy (pure CSS, 36px, never bigger):** a cup from two border-radius shapes (a half-circle bowl + a short stem) and two arc handles (border-only radius pieces), mustard gradient, a conic-gradient glint rotating slowly, on a small ink pedestal with a cream plaque that types `WAITED.` letter by letter. A one-pixel sparkle on the rim every 7.5 s (a CSS animation with `animation-delay`). Season 2+ plaque has a tiny `37.5` in its corner (font-size 5px, `aria-hidden`).

**Other tricks (all CSS/inline SVG/emoji, no canvas required):**
- Rewind: fill shrinks with `steps(8)` easing over 400 ms, a scanline overlay (`repeating-linear-gradient(0deg, rgba(0,0,0,.12) 0 2px, transparent 2px 4px)`) and a 2px chromatic offset text-shadow flicker on the readout.
- Look away curtain: a soft cream div over the window, `opacity` transition 400 ms, `pointer-events:auto`, text `looking away...` in the middle.
- Golden hour: a `position:absolute; inset:0; pointer-events:none` overlay with the gradient above, opacity transition 3 s, beats 8+ (and during the ceremony).
- Party: bunting from a `repeating-conic-gradient` triangle row; one balloon emoji with a CSS float keyframe; `animation-play-state: paused` on freeze.
- Queue emoji bob 1px on a sine (driven by one CSS keyframe per cell with `animation-delay`, not per-frame JS).
- Hold-music waveform in the cooling-off: a tiny inline SVG `<polyline>` that scrolls via CSS.
- Gerald: the potato emoji `🥔` (Emoji 3) with a CSS ribbon and a tiny CSS hat, slides in with `transform: translateX`.
- Reduced motion: honour both `@media (prefers-reduced-motion: reduce)` AND the engine class (`.pm-reduce-motion` on body): write selectors `.pm-reduce-motion .m-wait-for-it-fill{...}` as well as the media query. In JS check `root.closest('.pm-reduce-motion')`.
- Dark-mode/contrast safe: the module owns its cream background; text is ink.
- Emoji used (all <= Emoji 12): ⏳ 🏆 🕰️ ⏪ 🌙 📋 🎈 🎟️ 🧾 ✋ 🍞 🥔 🐌 🧦 🔴 🪑 🙂 💨. Run `node tools/lint.js games/wait-for-it.js` to confirm (🪑 is Emoji 12, the newest allowed).

DOM caps (hard): receipt 5, memorial 12, log 40, queue 12, shelf 5, caption 8, floating chips 6, scheduler 40.

---

## 13. IMPLEMENTATION HINTS

### 13.1 Structure of the file (aim for about 1300-1600 lines)

1. Header comment `/* POINTLESS module: wait-for-it */`, IIFE, `'use strict'`, `const P = window.POINTLESS`.
2. `P.injectCSS(..., 'css-wait-for-it')` (all selectors contain `.m-wait-for-it-`; keyframes prefixed `m-wait-for-it-`).
3. `P.addAchievements([...])` (section 3.1; `check` functions only for `rewinds`).
4. Constant tables: LINES (section 11, object keyed by id), BAGS definitions, RATES, BEAT thresholds, TITLES, NAMES.
5. `P.registerModule({... mount(root, api) { ... } })`. Everything stateful is inside `mount`.
6. Inside mount, in order: state vars; `el = api.el`; build DOM once; helpers (`say`, `bag`, `fmtPct`, `advance`, `scheduler.after`); handlers; `api.on(...)` registrations; start the rAF loop; return `{ destroy() { save } }`.

### 13.2 Event wiring (all through `api.on`, nothing at file load)

- `pointerenter/pointerleave/mouseenter/mouseleave/pointermove` on the window element -> `overWindow`; `pointermove/pointerenter` on root -> `inRoot = true`; `pointerleave/mouseleave` on root -> `inRoot=false; outSince=sim`.
- `pointerdown/touchstart` on root (capture) -> `lastInput = sim`, reset idle counters, freeze the party if running, remove the caught-blushing.
- `keydown` on `document` via `api.on(document, 'keydown', ...)` (allowed; the harness checks removal) -> fidget/typed-words/lastInput; ignore targets that are INPUT/TEXTAREA/SELECT; ignore Space/Enter when the target is a BUTTON.
- `focusin/focusout` on the bar -> `barFocused`; first focus -> line KB.
- `document` `visibilitychange` via `api.on(document, 'visibilitychange', ...)`: hidden -> `hiddenSince = api.now()`; visible -> compute `away = (api.now() - hiddenSince)/1000`, bank = `min(12, 1.4 * away)`, apply lump, achievement if away >= 20 and lump > 0, `api.stat.inc('wait-for-it.absences')`. If `hiddenSince` is 0 ignore.
- `resize` on window via `api.on(window, 'resize', ...)` -> cozy check.

### 13.3 Shuffle bags

`function makeBag(arr) { let b = []; let last = ''; return function () { if (!b.length) { b = api.shuffle(arr); if (b[b.length-1] === last && b.length > 1) { b.unshift(b.pop()); } } last = b.pop(); return last; }; }` (api.shuffle returns a NEW array; do not mutate the constant). Bags needed: ETA, tips, notices-after-12, log, rewind chatter, stall reasons (6, no repeat within a mount), tidy, child-click, queue-regret, fidget.

### 13.4 Selftest accommodations (`api.selftest === true`)

- `SPEED = 20`; first joke at 1.2 s real; idle ladder uses the same sim thresholds (30/60/120/180 sim s are 1.5/3/6/9 virtual s) so a 62-virtual-second idle exercises every idle line and the party (`?idle=62000`).
- A ONE-TIME hatch so the fuzz run exercises the ending: if virtual real-elapsed since mount > 35 s and `beat < 9`, set `S = max(S, 95)` (once); if > 55 s and the ceremony has not started, set `q = 3` / start the ceremony (once). The hatch must set flags so a remount (the harness remounts at 50%) does not repeat it incorrectly.
- Under selftest the fuzz presses random keys and clicks 25-70 times in bursts: the cascade WILL fire repeatedly; make sure cooldown and failsafe work.

### 13.5 Performance and fuzz safety

- Cache DOM nodes; write text/style only when changed; use `textContent`, never `innerHTML`.
- Receipt, log, memorial, caption, queue, shelf use `while (list.children.length > CAP) list.removeChild(list.firstChild)`.
- Remount 20x: no module-level mutable state; the scheduler array lives in the closure; do not call `api.exit()` anywhere.
- Never format a non-finite number: ONE `num(v, d)` helper returns `'0.0'` for non-finite input and the readout uses it.
- All narrated text goes through `say`, which strips nothing but guards tokens: a missing token value is replaced by an empty string only for `[gain]`-style numbers (use `'0'`); a final regex `/\[[a-z]+\]/` check in `say` replaces any leftover token with an empty string and never lets one reach the DOM.

### 13.6 If the line budget bites (cut in this order; the rest is load-bearing)

1. Decoy + mini-bar (7.3; keep the button and the lines B1/B2).
2. Survey slider (7.6; keep the readout units).
3. Regard gauge (cosmetic).
4. Typed words other than `faster` and `patience`.
5. The cozy and toast rare events (keep the toast; it is an achievement).
6. The Form 27B/6 mini bar inside the Cancel dialog (keep the text-only version).
Never cut: the attention factor, the stall, notices + receipt + memorial, Cancel trap text, dependency, queue with Gerald/Gary, nines, ceremony, season 2, idle ladder, spam cascade, hold.

---

## 14. RISKS: THE 5 MOST LIKELY IMPLEMENTATION BUGS

1. **Time-step skipping boundaries.** With `SPEED = 20` and rAF throttled (or real hidden-tab gaps), one frame can advance S by several points and jump over 37.5, the stall-2 trigger, band edges, or the nines threshold. Fix: sub-step the sim in <= 0.25 s slices AND make every threshold a crossing check inside `advance()` (clamp to the threshold, then start the event), never `S === 37.5`. Also: lump progress from absences must go through `advance()` and must not skip the stall or the nines.
2. **Click path double-counting or suppression.** The bar is a `<button>` that receives pointer clicks, keyboard Space/Enter native clicks, fuzz-synthesised clicks, press-and-hold, and the spam counter. If both `keydown` and `click` handlers react to Enter, every key press counts twice; if the hold-suppression flag never clears, the next real click is silently eaten. Fix: ONE `onclick` handler counts impatience; hold uses pointer events only, sets `heldLong` with a 400 ms real-time expiry, clears it on the next pointerdown; keyboard hold is not supported. Absorbed clicks (curtain, cascade, ceremony) must also not extend the spam window.
3. **Readout rounding to `100.0` / `NaN` text.** `toFixed` rounds, so 99.96 shows `100.0` before completion, and `Math.pow(10, -q)` with a bad `q` or `Math.log10(0)` yields `Infinity`/`NaN`, which the selftest treats as a failure anywhere in visible text, aria labels, the title bar or Management's lines. Fix: truncate digits (section 4.6), guard `q` to `[0, 3]`, run every number through `num()`, and give the title bar an integer-only formatter that clamps at 99 until completion.
4. **Stuck or inconsistent overlay states.** Curtain, cooling-off, cascade, hush, party and ceremony each pre-empt input. If any overlay's end event is on a scheduler entry that gets dropped by the 40-entry cap, or a destroy/remount lands mid-state, the bar can stay frozen, "watched" can stick true (a missed `pointerleave`), or clicks can be absorbed forever. Fix: store `until` timestamps in state and have `step()` clear expired overlays itself (the scheduler is only for sugar), add the 20 sim s cascade failsafe, make `overWindow` self-heal on `pointermove`, never cap the scheduler by dropping fn entries that carry state changes (cap only decorative ones), and remember that everything must be re-creatable from a fresh mount because the harness destroys and remounts mid-run.
5. **Pacing that never ends or an ending that never fires.** A hover-only player at factor 0.35 (0.20 in beats 8-9) can take 30+ minutes, a clicker can ping-pong between Safe Harbours, and the nines integral can stall if `q` is clamped wrongly after impatience. Fix: the PITY rule, the checkpoint floor (`10 * floor(maxS/10)`), `maxS` monotonic, beat time-fallbacks (to beat 7 only), `q >= 3` as the one completion test evaluated every step, and the selftest hatch (13.4) so the fuzz harness always exercises the ceremony and the Season 2 reset (check that season 2's `Revised:` prefix and the 0.7x width do not break anything, and that a second ceremony in the same mount works).

---

## 15. BUILD CHECKLIST (the builder verifies before reporting)

- `node tools/lint.js games/wait-for-it.js` clean (>= 80 line-like strings, 10 achievements with 5 secrets, no emoji over Emoji 12, no raw timers, no `window.` listeners).
- `node tools/selftest.js wait-for-it` PASS at 400 steps for seeds 1, 2 and 3; also `--steps 1500`; also `--real`.
- `node tools/shot.js wait-for-it --width 360` and at 1280: no horizontal scroll at 360, receipt below the bar, buttons >= 44px, readout does not overflow even at `99.99` (use clamp() on the readout font-size).
- Manual-by-script sanity (tools only): confirm S advances unwatched and slows when `overWindow`, stall holds at exactly 37.5 for 7.5 sim s, a 15-click burst triggers the cascade and ends with `S = preS - 7.5`, the ceremony reaches Season 2 with `Revised:` prefixes and `Notice No. 13`.
- First joke audible/visible inside 10 s; a new thing every ~20 s of play; no `console.error`; no leftover timers after destroy.
