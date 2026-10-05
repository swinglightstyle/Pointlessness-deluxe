# DESIGN BRIEF: RUBBER DUCK THERAPY (id `duck-therapy`)

Final brief by the showrunner. Builder: read SPEC.md and VOICE.md first, then build `games/duck-therapy.js` from this file alone. Where this brief and SPEC.md conflict, SPEC.md wins. Every line of text in section 9 is final and verbatim: copy it, do not improve it, do not explain it. All text in this brief is plain ASCII; in the shipped file write the specials as JS escapes if you like (`●` dot glyph, `▬` dash glyph, `♥` heart). Visible running text writes the motif as `7 1/2` (never the single fraction glyph).

---

## 1. CONCEPT

You sit on a tiny couch facing a rubber duck in an armchair. You choose a problem from a tray of sticky notes (or type your own) and explain it to the duck. The duck cannot talk. So you squeeze it, in rhythm, and a Certified* Interpreter subtitles every squeak with confident clinical wisdom that is wrong in a very consistent direction. In other words, you are doing the duck's speaking for it, the duck takes the credit, and Management bills for it. Over about ten minutes (55 counsels in 10 sessions, each hour one counsel shorter than the last) a real therapeutic relationship forms: rapport, transference, a breakthrough, the duck setting boundaries by scooting its armchair away, the duck confessing its own problems, aftercare, a group session in which the Interpreter admits he has never spoken duck, and a graduation. Then Management says "Session 1 of 1. Please sit." and the duck says "Welcome back."

Tagline: `Explain it to the duck. The duck has twelve words and is using them all.`

Pillars (cut anything that does not serve one of these):
1. **Rhythm is the verb.** One button (the duck), two durations (dot, dash). The duck's 12-word vocabulary is a pattern book the player cracks by experiment. Nothing teaches it; the drawer only rewards curiosity.
2. **The Interpreter takes the credit.** Every squeak is subtitled. The subtitles drift: plausible, personal, wordy and contradictory, then a confession (he took a mail course, 7 1/2 lessons, passed 7), then ONE correct translation ("Thank you.") at the discharge, which he is visibly unprepared for.
3. **The hour shrinks.** Session N lasts max(1, 11 - N) counsels: 10, 9, 8 ... 2, 1. The last session is "the Nod". After the Discharge the hour is restored ("It was never gone. It was just very short.").
4. **The bread is not a metaphor.** Running gag, escalating to a literal loaf on the shelf, an invoice billed in bread, and a certificate printed on bread.
5. **Arc** (VOICE.md): normal, weird, bureaucratically unhinged, strangely touching (the duck's confessions, "Honest.", "Thank you."), back to normal like nothing happened. Nobody winks. The duck is a professional.

### What was kept from the three pitches, and what was cut

KEPT from pitch 1 (the structural spine): the squeeze rhythm verb and the Approved Vocabulary of 12 patterns with the Pattern Drawer; the secret 13th word (seven dots, then a half dot) and the painted door; sticky-note Problem Tray plus typed problems (chips hop to the beak, the duck "hears" the longest word and Management mangles it); the Reflection Pool of reversed-noun bubbles with Deep Reflections every 25th; the shrinking hour and the confidently wrong clock; the Echo (phone with 3 lamps, then the duck asking questions in beak flashes); the Boundary (armchair scoots, you drag it back); niche pokes (beak, Dennis, clock, diploma, clipboard, loaf); Duck Notes; the bread gag; Overtime Protocol and Security; the BACK IN 5 idle chain; the discharge, tiny duck on the shelf forever, and the loop with "Welcome back."

KEPT from pitch 2: the Interpreter (CERTIFIED*, footnote "*by mail") and his three-stage drift and confession; the itemized invoice that always totals 0 Meh, paid by squeezing the duck once; the torn page 7 1/2 of Pond Quarterly gaining a fragment each session and completing as "You were doing fine."; the Tuesday flinch ladder (decline, flicker, duck leaves with a note, returns in a knitted hat); Role Reversal (the duck confesses: the drain, the shelf, nobody asks how it is); the Interpreter subtitling YOU ("what you really meant"); the Group Session (11 ducks in a nodding wave, Dennis in the circle); typing exactly "quack" lets the Interpreter go; the exit survey of five buttons all labelled Quack; the narrow-window "loveseat" merge; the "7 1/2" standing ovation; the correct "Thank you." at the end.

KEPT from pitch 3: the Nod button whose reply delay grows by 0.1 s per use ("Understood." to nothing at 40); the rubber-ring flat duck is NOT kept, but "Dear Pond, today someone said: ..." diary entries are (in the not-ending); the wide-window auditorium with the word EVENTUALLY; the Change-Subject-before-subject joke is folded into the empty-Enter "bold opening".

CUT (weak, redundant, or unbuildable in one vanilla file): the 11-Permitted-Words budget and "Words Remaining" counter (it contradicts the 12-word vocabulary); the Wisdom Allowance of 7 1/2 blocks (it contradicts the shrinking hour); the Feelings Dial (the Tuesday ladder covers its jokes); the separate Waiting Room scene (page 7 1/2 lives on the invoice card instead); the Second Duck rival therapist; the chat transcript and Duck Fee economy; the flat rubber-ring spam transformation; the duck's final speech built from permitted words; the canvas anything; per-word sound melodies; the 3-minute pure-rhythm "fluent" mode (replaced by a simple 180 second Interpreter leave of absence).

---

## 2. REGISTRATION AND IDENTIFIERS

```js
P.registerModule({ id:'duck-therapy', title:'Rubber Duck Therapy',
  tagline:'Explain it to the duck. The duck has twelve words and is using them all.',
  icon:'🦆',  // duck emoji (Emoji 3, safe). If you want a fallback glyph in the lobby use the hatching chick (Emoji 1)
  category:'game', unlockCost:0, tags:['rhythm','therapy','duck'], mount })
```
`api.setTitle('Rubber Duck Therapy (Room 7 1/2)')`.

- Stats (all prefixed `duck-therapy.`): `squeezes` (every press), `counsels`, `sessions` (completed), `bubbles` (popped), `calls` (answered), `boops`, `overtime`, `discharges`; extras: `tuesdays`, `nods`, `words` (distinct words discovered, set via `max`), `chair` (successful pull-backs), `rest` (inc by 10 for each rest award, meaning seconds of rest provided), `loops`.
- Flags (cross-module-friendly): `duck-therapy.discharged` (true after the first Discharge), `duck-therapy.tinyDuck` (true once the tiny duck is owned). Read-only cross-module checks: flag `metGerald`, stats `pet-rock.entered`, `toaster-debate.entered`, `potato-interview.entered`.
- CSS: every class `m-duck-therapy-*`; CSS custom properties `--dt-*`; keyframes `m-duck-therapy-*`; inject with id `css-duck-therapy`.
- Module-side text tokens (replaced by one `fill(text)` function before display; never ship a raw `%X`): `%NOUN` the current case noun phrase, `%NAME` the player's name (the word "Dennis" during Sessions 3 and 4, 40 percent of the time), `%N` a number (context), `%REV` the reversed case noun, `%DIP` the current diploma name. `fill()` must replace `%NOUN` and `%NAME` BEFORE `%N`, and finally replace any remaining `%[A-Z]+` with `the matter`. Lines passed to `api.say` may also use SPEC tokens `{player}` and `{count}`.
- All timing via `api.now()` (never `event.timeStamp`: under the fuzz harness virtual time they disagree).
- All sound only through `api.sfx`: `blip` dot squeak, `honk` dash squeak, `boing` release squish, `pop` bubbles, `tick` clock per counsel, `bell` session end, `ding` correct echo, `buzz` missed call, `sad` Overtime wheeze and the Tuesday flinch, `stamp` invoice stamp, `whoosh` duck hides, `tada` the 7 1/2 secret and the Discharge, `fanfare` left to the engine achievements. Throttle: never more than one sfx per 70 ms (except `bell`, `tada`).

---

## 3. LAYOUT (single screen, no tabs)

Everything lives in one wrapper `div.m-duck-therapy-room` inside `root`. CSS grid with named areas; DOM order is the TAB ORDER (the grid places things visually), so build the DOM in this order: status strip, duck, cushion (input then Nod button), tray notes, pool bubbles, drawer, phone, wall pokes (diploma, clock, Dennis, clipboard, shelf, door).

```
+-------------------------------------------------------------------------------+
| WALL (top ~38%): diploma | shelf (loaf, tiny duck, Security, page 7 1/2) | clock |
|   painted door slot (hidden) | Dennis the plant | desk: clipboard + phone        |
+-------------------------------------------------------------------------------+
| STATUS STRIP: Session N of 1 | Hour pips (10 dots) | Alliance: LABEL |           |
|   0.7 Insight (target: none) | Wellness: 7% +/- 7% | Hearts (from S4)           |
+---------------+-----------------------------------------+---------------------+
| COUCH CUSHION | RUG (ellipse)                           | REFLECTION POOL     |
| (mint) holds  |  armchair (coral) + the duck (button)   | (tall bathtub strip |
| the text      |  thought line (dots and dashes) above   |  bubbles rise)      |
| input + Nod   |  chips hop from the cushion to the beak |                     |
+---------------+-----------------------------------------+---------------------+
| SUBTITLES (aria-live polite): duck speech bubble, then INTERPRETER (CERTIFIED*) |
+-------------------------------------------------------------------------------+
| PROBLEM TRAY: 5 sticky notes (rotated) | PATTERN DRAWER (native <details>)     |
+-------------------------------------------------------------------------------+
```

Wall details:
- **Diploma** (left, framed, lilac plaque): shows `%DIP` (the diploma name changes every session, section 9.15); Session 1 reads "Dr. (being finalised)".
- **Wrong clock** (SVG): the face has a "7 1/2" where the 6 should be. Minute hand angle = (47 + 5 * counselsThisSession) minutes; hour hand parked at roughly 4:47. It always looks confident. It resets to :47 when the bell rings. Clicking it makes Management state a time estimate in prose (9.14).
- **Dennis** (emoji plant, 56 px, with a leaf wobble keyframe). The potted-plant emoji is Emoji 13: do NOT use it. Use the herb emoji (Emoji 1).
- **Painted door slot**: hidden until the 7 1/2 secret fires; then a small door painted on the wall between the clock and Dennis (a real `<button>`).
- **Desk** (right of the wall): the clipboard of Duck Notes (a `<button>`) and the landline phone (a `<button>`, installed visibly from Session 3; before that the desk shows an empty phone-shaped rectangle with a sticky note "PHONE: COMING (SANDRA)").
- **Shelf** (center-left): empty until things arrive: the loaf (from Session 5), the Security duck (after 40 Overtimes), the tiny rubber duck (after the Discharge, permanent), pinned page 7 1/2 of Pond Quarterly (after the Discharge, permanent). In Session 9 the shelf items are arranged "like a small shrine" (add class for a tiny cloth runner and a candle-less candle: just a rectangle).

Narrow layout (below about 560 px of root width): single column; the Reflection Pool collapses to a horizontal strip above the duck (bubbles rise right to left instead, same code with a flag); the cushion sits below the duck; the tray scrolls horizontally (`overflow-x:auto`) with 44 px+ notes; the drawer is full width. Below 420 px of root width: the "loveseat" merge (section 10). At 360 px nothing may scroll horizontally except the tray.

---

## 4. CONTROLS AND THE SQUEEZE (exact)

### 4.1 The duck is a real button
`<button class="m-duck-therapy-duck" type="button" aria-label="Squeeze the duck">`, tabIndex 0, `touch-action:none`, `user-select:none`, `contextmenu` prevented. Contains the inline SVG duck (section 8).

PRESS: `pointerdown` (primary button only), or `keydown` of Space/Enter with `!e.repeat` (call `preventDefault` for Space and Enter to stop the page scrolling and the synthetic click). On press: record `pressStart = api.now()`, play `blip`, add `m-duck-therapy-held` class, start a short rAF loop that drives `--dt-squish` from hold time (0 to 1 over 450 ms) and flips the provisional symbol from dot to dash when the hold crosses 220 ms (play `honk` once at that moment). Pointer capture via `try { duck.setPointerCapture(e.pointerId) } catch (_) {}`.

RELEASE: `pointerup`, `pointercancel`, `lostpointercapture`, `keyup` of Space/Enter, window `blur`, and `visibilitychange` to hidden ALL release a held press (the ones that are not real releases cancel nothing, they just end the press and count it). On release: `dur = api.now() - pressStart`; symbol = DOT if `dur < 220` else DASH; play `boing` (throttled); remove the held class (the CSS spring brings the squish back). A press held 4000 ms or more auto-releases as a DASH (the hug, line in 9.12, once per session).

A `click` event on the duck is IGNORED unless `e.detail === 0` and no press ended within the last 350 ms (assistive tech activation); in that case count one DOT. This prevents the harness's synthesized Enter (keydown plus click) and mouse (down, up, click) from double counting.

### 4.2 Bursts
A burst is up to 8 symbols. Each release (a) appends `{type:'S'|'L', dur, onset, gapBefore}` (`gapBefore` = onset minus the previous release time, or null for the first), (b) restarts the 1100 ms close timer (`api.setTimeout`); a new press clears the timer (a long hold must never close the burst). At the 8th symbol the burst closes on that release without waiting. The thought line above the duck shows the symbols as a row of dot and dash glyphs while the burst is open, and fades 600 ms after it closes. A faint ring around the duck shrinks over the 1100 ms so the player sees the listening window.

### 4.3 What happens when a burst closes: `resolveBurst(symbols)` (in this order)
1. If a scene other than play is active, route it (invoice payment, share mode, discharge: squeak only, see section 6.2).
2. If an Echo event is active (phone, duck question, check-in): hand the burst to the echo handler (5.7). It is not a counsel.
3. If the duck is limp (Overtime) or away: ignore (no counsel); the squeak still plays as a wheeze.
4. Secret 13th: exactly 8 symbols, the first seven `S` each with `gapBefore >= 150` (steady tapping, so mashing never triggers it), and the 8th has `dur < 90` and `gapBefore < 140` (the "half dot"). See section 10.
5. The Knock: exactly 5 symbols `S S L S S` and `gapBefore` of the 4th symbol between 550 and 1050 ms. See section 10.
6. Look up the pattern string (`S`/`L` joined) in the vocabulary (5.1). Hit: the duck's word. Miss: a mumble.
7. Run `counsel(wordOrMumble)` (5.4).

### 4.4 Complete key map (listeners attached with `api.on`)
- Duck focused: Space or Enter = squeeze (press on keydown, release on keyup).
- Keys `1` to `5`: pick the matching sticky note, ONLY when no text field is focused and the scene is play.
- `N`: Nod (when no text field is focused).
- Cushion input focused: Enter submits the problem; Up arrow recalls your previous problem (the duck reacts to a recycled problem; 9.5); Escape clears the field.
- Notes, bubbles, drawer summary, phone, wall pokes, door: native buttons (Enter and Space activate).
- Phone button during a ring: Enter/click = decline (goes to voicemail).
- "Pull chair closer" button (visible from Session 5) is the keyboard route to the Boundary (5.8).
- Tab order as in section 3. Visible focus rings on every control (3px mustard outline offset 2px).

### 4.5 Touch
Pointer events only; every target at least 44 px; no hover-only content; long press on the duck does not open a context menu.

---

## 5. SYSTEMS

### 5.1 The Approved Vocabulary (exact patterns, `S` = dot, `L` = dash)

| pattern | word | glyph shown | length |
|---|---|---|---|
| S | Hm. | dot | 1 |
| SS | Mm-hm. | dot dot | 2 |
| SSS | Quack. | dot dot dot | 3 |
| L | Quaaack. | dash | 1 |
| SL | Water. | dot dash | 2 |
| LS | Bread. | dash dot | 2 |
| LL | Both. | dash dash | 2 |
| SSL | Later. | dot dot dash | 3 |
| SLS | Again. | dot dash dot | 3 |
| LSS | Sure. | dash dot dot | 3 |
| LLS | Float. | dash dash dot | 3 |
| SLL | Ask the pond. | dot dash dash | 3 |

Secret 13th (NOT in the drawer): seven dots then a half dot: the duck says `Seven and a half.` After the Discharge the loop adds a 14th line, `Welcome back.`, which the duck says unprompted (9.17); it is shown as an extra drawer card only in the loop.

Every other pattern is a MUMBLE: the duck's displayed word is drawn from a shuffle bag `Mrrk. Brk. Qk? Hnk. Wrrk.` and the Interpreter line comes from the mumble bag (9.4). A mumble still pays the counsel reward.

PATTERN DRAWER (`<details class="m-duck-therapy-drawer">`, summary "Pattern Drawer (12 words, 0 known)" updating live): 12 slot cards. Undiscovered slots read `?`. After the 4th counsel of the save, two random undiscovered slots become "? (suspected)" and show hollow circles, one per symbol of the pattern, as a bait hint (never the dot/dash type). A discovered slot shows the glyph row, the word, and its one-line flavor note (9.3). Drawer open state is only a convenience; never force it open except the Knock.

### 5.2 Cases: sticky notes and typed problems
CASE = `{text, noun, left}`. The case noun fills `%NOUN` in translations. A case lasts 3 counsels (`left` goes 3, 2, 1, 0); at 0 the noun becomes `the matter` and the tray pulses once as a hint to pick a new one. The case never blocks squeezing.

PICK A NOTE: click, tap, or keys 1-5. The note slides to the duck (CSS transition on transform from the note's rect to the duck's, 400 ms, then it is removed), the duck leans in (class), the noun is set, a new note replaces it in the tray (slide-in). Management says one `pick` line (9.5). At mount the first note ("I think I am bad at Mondays...") is auto-picked after 2500 ms so the first squeeze has a noun and the very first joke needs no cleverness.

The tray always shows 5 notes from the CURRENT tier bag (9.5): Tier 1 for Sessions 1-2, Tier 2 for 3-4, Tier 3 for 5-6, Tier 4 for 7-8, Tier 5 for 9-10. Notes marked (pink) are duck-origin problems (pink sticky); from Session 3 at least one pink note is always on the tray. Rotations of the notes: -3, 2, -1, 3, -2 degrees. Never the same note twice in a row; no duplicates on the tray.

TYPED PROBLEMS: the cushion input appears glowing from counsel 3 of Session 1 ("You may now say your own problem." as its placeholder and a Management line), but is functional from the start (type early and it simply works, the glow arrives later). `maxlength=140`, placeholder before the unlock: `Describe your problem (max 140 characters, per policy)`. On Enter:
- Trim. Echo only through `textContent`, truncated to 40 characters, never into an attribute. Keep the last 8 typed problems (trimmed to 40 chars) in `diary` (save).
- EMPTY Enter is "a bold opening" and counts as a case with noun `the silence` (9.5).
- Split into words (cap 12). Each word becomes a chip (`span`, max 14 characters displayed) that hops from the cushion to the duck's beak one at a time, 140 ms apart, the duck blinking once per word. Chips are removed 700 ms after their hop ends. Never more than 12 live chips.
- The duck "hears" the LONGEST word. Management announces a clinical focus that mangles it (`mangle(word)`, below). Case noun = the mangled phrase. Case = `{text: typed, noun, left: 3}`.
- Then run the word triggers in 10.4 before the normal flow (some pre-empt it).

`mangle(w)`: lowercase `w`, strip characters that are not letters, digits or a hyphen, cut to 14 characters, empty becomes `matter`. Pick one of six templates (index = (hash(w) + caseCount) % 6, never the same index twice in a row): `the {w} situation` / `{w} (the other one)` / `{w}-adjacent matters` / `a possibly different {w}` / `{w}, or a word near it` / `Sandra's version of {w}`.

`%REV`: the case noun with a leading `the ` removed, lowercased, letters and spaces only, cut to 14 characters, reversed. If the result is empty use `rettam`. (deadline becomes enildaed.)

### 5.3 Translation pipeline (the Interpreter strip)
The strip is labelled `INTERPRETER (CERTIFIED*)` with a microscopic footnote `*by mail` (8 px, 12 px on hover or focus). Text appears with a stepped CSS clip-path wipe, but you set `textContent` immediately (so aria-live and tests see it). Delay between the duck's speech bubble and the translation: 600 ms.

Choice order for each counsel's translation:
(a) a special-case trigger (10.4): exact `quack`, `7 1/2`, a repeated problem, a one-word problem, a problem over 100 characters, `tuesday`, `sock`, `help`, `i give up`, `duck`, `bread`;
(b) the word's phase pool: phase A for Sessions 1-2, phase B for 3-5, phase C for 6-8, phase D (generic, post-confession) for 9-10; mumbles use the mumble pool; the Seven and a half has its own line;
(c) every pool is a shuffle bag per (word, phase) so the same line never repeats back to back; when a bag empties, reshuffle and make sure its first item is not the one just used.
The Interpreter is "let go" by typing `quack` (10.4); during his leave the strip shows `(no subtitles)` and the duck's speech bubble carries the word alone.

When the Interpreter is subtitling YOU (Session 8 only) see 5.12.

### 5.4 The counsel (what one resolved burst does)
In order: `stat counsels`, `stat squeezes` already counted per press; advance `counselInSession`; clock +5 minutes (move the minute hand, `tick` sfx); the duck's speech bubble shows its word (letter-spacing animation; a `Quaaack` has its `aaa` in a span with scaleX growth); 600 ms later the Interpreter line; release one bubble into the Pool (5.5); decrement `case.left`; first-time word handling (drawer slot fills, `stat words` max, +1 Meh, Management discovery line priority 1); award +0.1 Meh (`+0.5` for the very first counsel ever, tracked by save `squeezed`), reason `counsel`; every 4th counsel say one ambient line (9.6, priority 0); run any scheduled Echo event for this counsel number (5.7); when `counselInSession` equals the session length, end the session (5.6). Also scoot the chair by one step (5.8) from Session 5. The 1-in-40 `Honestly?` rare event is evaluated here (10.5).

### 5.5 Reflection Pool
Every counsel releases ONE bubble (button, `aria-label` = `Reflection: ` + reversed noun, text via `textContent`) carrying the reversed noun in 11 px text. Bubbles rise at 30-60 px per second (delta-time rAF; a per-bubble random speed), wobble with two sine terms, and cap at 14 live bubbles (when the cap would be exceeded the OLDEST pops itself silently and pays nothing; a bubble that rises past the top also vanishes silently). Click, tap, or Enter/Space on a focused bubble pops it: `pop` sfx, +0.1 Meh (`bubble`), `stat bubbles`, a small ring animation, and Management says a pop line (9.7) only for the first pop and then every 10th pop. EVERY 25TH released bubble (by `stat counsels` modulo 25) is a DEEP REFLECTION: 1.6x size, conic-gradient shimmer, pays +1 Meh and shows a one-liner from the Deep Reflection pool (9.7) as a speech-bubble toast next to the pool (also via `api.say`, priority 1). The snore bubble (Idle, section 11) is a special bubble worth +3 Meh.

### 5.6 The Hour (loop structure)
Session N (1 to 10) lasts `max(1, 11 - N)` counsels. The Hour pips show 10 dots: the first L are "this hour" (lit as counsels pass), the rest are crossed out. The Alliance label by session: 1 INTAKE, 2 RAPPORT, 3 TRANSFERENCE, 4 BREAKTHROUGH, 5 BOUNDARIES, 6 DISCLOSURE, 7 AFTERCARE, 8 PROJECTION, 9 GROUP, 10 TERMINATION; after the Discharge ALUMNI for the scene, then INTAKE again in the loop (and nothing else about it has changed). Wellness gauge always reads `N% +/- N%` where the margin equals the value and is never above 99.9: `w = min(99.9, 7 + 0.4 * sessionsDone + 0.05 * counselsInSession)`, shown with one decimal only if not an integer; at the Discharge it briefly reads `100% +/- 100%`, then the duck turns it back to 7%. Insight = `0.1 * sessionsDone` shown as `0.7 Insight (target: none)`. The status strip also shows `Session N of 1`.

SESSION END (`endSession()`), about 5-12 seconds, input locked except paying and skipping:
1. `bell` sfx, the clock hands spin once and land on :47, Management says one bell line (9.8; Session 1 has its own line).
2. The Invoice card prints (receipt paper, monospace, zig-zag bottom via CSS mask or a repeating gradient) line by line, 450 ms per line: the session's item line (9.9), then one `Overtime, 3 bread` line per Overtime that happened this session (cap 4 shown), then `Total: 0 Meh. Billed in bread.` (from Session 5: `billed in bread (the loaf)`). Below it a torn strip: `Pond Quarterly, Issue 4 (1987), page 7 1/2:` plus the newest fragment (9.10).
3. A button `Next Patient` and the prompt "Squeeze the duck once to pay." A press on the duck pays: stamp `PAID` rotated -6 degrees, `stamp` sfx, line "Paid. The duck will not remember this. The duck remembers everything." (achievement `invoice`). `Next Patient` or a 12 s timeout skips it with a `PENDING POND` stamp instead.
4. The Duck Note is written (clipboard scribbles; 9.11), `stat sessions`, +5 Meh (`session end`), Insight +0.1, session number +1 (save), the next session intro (9.1) and its changes.
After Session 10 comes the Discharge (section 12), not Session 11.

### 5.7 The Echo (second rhythm verb, introduced in Session 3)
One engine for three event kinds: `phone`, `duckask`, `checkin`. `startEcho({kind, caller?})`.
- It starts 1500 ms after a counsel's translation appears. It clears any open burst. While active, closed bursts are consumed by it (never counsels).
- `phone`: the phone shakes and 3 lamps flash the pattern (dot lamp on 180 ms, dash lamp on 540 ms, 260 ms gap, 600 ms lead-in), the caller's name shown on a tiny sticky label. `duckask`: the duck's beak flashes the same pattern (beak open class) and the thought line shows `?`. Pattern length 3 until Session 6, 4 from Session 6; symbols random `S`/`L` with at least one of each.
- The player has 8000 ms after the flash ends. Success: `symbols` equal in length and in type, and each inter-onset interval within `tol` of the shown interval (shown IOI after a symbol = its lamp time + 260 ms). `tol` starts at 0.45 and widens to 0.8 after two consecutive misses (reset on a success). Up to 2 attempts; a wrong attempt gives a soft nudge ("Not quite. The duck is listening harder.").
- Success on `phone`: `ding`, caller cameo line (9.13), +2 Meh, `stat calls`, achievement `call`. Failure or timeout or decline (click the phone): `buzz`, a voicemail line (9.13). Success on `duckask`: `ding`, +1 heart (half heart steps, cosmetic gauge `Hearts N / 7 1/2`), the duck line (9.13). Failure: the duck line for a miss. `checkin`: the duck asks "How are you?" (Interpreter strip), 6000 ms window, ANY closed burst counts, always "Honest." (9.13); no failure state; +0.5 Meh.
- Schedule (after which counsel of the session; never the last counsel; see the table in section 6): S3 phone after c3 (Sandra); S4 duckask after c2, phone after c5 (The Stapler); S5 duckask after c2, phone after c4 (Gerald if flag `metGerald` is true or `potato-interview.entered` > 0, else The Toaster if `toaster-debate.entered` > 0, else The Stapler); S6 duckask after c1; S7 checkin after c1, phone after c3 (The Missing Sock); S8 checkin after c1, phone after c2 (The Pond). The phone also rings for typing `gerald` (10.4) from Session 3.

### 5.8 The Boundary (introduced in Session 5, the tactile verb)
The armchair has a horizontal offset `chairX` (0 = by the couch, `maxX` = about 35 percent of the rug width on desktop, 22 percent on narrow). `awayTarget` starts at 0 each session.
- After every counsel from Session 5: `awayTarget = min(maxX, awayTarget + 14)` (that is the "4 cm"); also creeps +1.5 px per second while the player is not dragging. Each frame, when not dragging, `chairX += (awayTarget - chairX) * min(1, dt * 4)`.
- DRAG: pointerdown on the armchair body (not the duck) starts a drag. A pointerdown on the DUCK that moves more than 8 px horizontally before release CANCELS the press (discard the symbol, end the squish, no burst entry, no sfx) and becomes a chair drag with the same pointer. While dragging, `chairX = clamp(startX + dx, 0, maxX)`; on release `awayTarget = chairX` and `stat chair` +1 if the drag moved the chair at least 20 px closer. The chair can never leave the rug or the room.
- The chair never gets farther than `maxX`. At `maxX` for the first time per session: "edge" line (9.12). When `chairX <= 16` (very close): once per 15 s, +0.2 Meh and a `Personal space.` line. 
- Button `Pull chair closer`: `awayTarget = max(0, awayTarget - 40)`, line from the chair pool.
- At each session start the couch and armchair "slide back" (awayTarget 0).

### 5.9 The Nod (always-available small verb from Session 2)
A small button `Nod` on the cushion. Press: after a delay of `400 + 100 * min(nodsLifetime, 40)` ms (so 0.4 s, 0.5 s, 0.6 s, ... capped at 4400 ms) the duck nods back (CSS class for 500 ms), always slightly wrong: the nod is a degree off, which is just a rotation of 6 degrees the wrong way. Up to 3 nods may be pending. `stat nods` +1 (also persisted as `nods` in save). Lines at the 10th ("The duck is nodding in the middle of its own reply."), 20th (achievement `nods`, "The duck has nodded at something you said 5 minutes ago. Management apologises on its behalf.") and 40th (the duck's head tilts all the way over: "Understood." to nothing). +0.05 Meh per nod, capped at 1 Meh per session.

### 5.10 Share mode (Session 6, Role Reversal)
Counsels 1-2 of Session 6 are normal (the duck asks a question after c1). After counsel 2, the duck says "I would like to share." (9.15). The tray is replaced by the Share panel: the duck's confession `i` (1 to 3) in a pink card and three buttons: `Nod (Supportive)`, `Nod (Skeptical)`, `Hm.`. EACH button press is one counsel of the session (counsels 3, 4 and 5), shows the response line, then the next confession, and +0.5 Meh. Squeezing the duck in this mode is only a squeak (the duck is "sharing"). After the third response the session ends (invoice item: `Reverse session (no charge, surcharge applies)`). Achievement `listener` on completion.

### 5.11 The Group (Session 9)
At the start of Session 9 a ring of 11 small duck emoji sits around the rug (pointer-events none), each with a nodding keyframe `animation-delay: calc(var(--i) * 140ms)` so the nods make a wave; the wave drifts out of sync over the session by increasing each duck's animation-duration slightly via `--drift`. Dennis (the herb emoji) is the duck at index 7. The ring is cap 11 elements and is removed when the session ends. Counsel 1 triggers the Interpreter confession (9.16); the diploma fills in; the shelf shrine class turns on.

### 5.12 Session 8 (Projection): the Interpreter subtitles YOU
After a note is picked or a problem typed in Session 8, the strip also shows `YOU (UNINTERPRETED)` with what you said rendered as `Quack.`, followed by the Interpreter's "what you really meant" line (9.15 pool). Lovingly wrong, sometimes painfully right. No new input.

### 5.13 Niche pokes (every pixel is clickable)
- **Beak** (small hit area, a real button inside the duck SVG wrapper, `aria-label="Boop the beak"`): +0.05 Meh, `stat boops`, `pop` sfx; the 10th boop makes the duck say `Please.` (Interpreter strip); the 20th boop gives the "one more" line; achievement `boop` at 10.
- **Dennis** (button): lines in 9.14.
- **Wrong clock** (button): time estimate lines in 9.14.
- **Diploma** (button): lines in 9.14.
- **Clipboard** (button): before the first session ends: the locked line. After: opens the newest Duck Note popover (SVG scribble path that never matches the text; stroke-dasharray animation so it looks written in real time). Clicking again cycles older notes (cap 10).
- **Loaf** from Session 5 (button on the shelf with a laminated tag `NOT A METAPHOR (confirmed)`), tiny duck, Security duck, pinned page: lines in 9.14.
- **Painted door** (secret): section 10.
- **The duck's body** is the squeeze button. Everything else decorative is `aria-hidden`.

### 5.14 The `away` state (one owner)
Several features hide the duck: the Tuesday ladder, the BACK IN 5 idle gag, the corner count (spam of problems), and the transference `duck` under-the-couch gag. There is exactly ONE function `setAway(reason, ms, noteText)` and one `awayToken`; it hides the armchair duck (class), shows the note on the couch if given, plays `whoosh`, and a managed timeout restores it only if `awayToken` still matches. Calling `setAway` while away replaces the old state. Overtime (limp) is a separate flag but may not overlap away.

---

## 6. STATE MACHINE AND ESCALATION TIMELINE

### 6.1 Scenes
`scene` is one of: `play`, `invoice` (session end), `share` (Session 6 confession panel), `door` (7 1/2 corridor), `discharge` (ceremony), `survey`, `reset`. Only `play` and `share` accept counsels. Every deferred callback captures `epoch` (incremented on every scene change) and returns early if it has changed (this is the cure for stale timers firing in the wrong scene). Overlays inside the room are absolutely positioned and `aria-hidden` when not active.

### 6.2 What a squeeze does outside `play`
`invoice`: pays the invoice (once). `share`: squeak only. `door`, `discharge`, `survey`, `reset`: squeak only, no symbols.

### 6.3 Escalation by session (nominal pacing about 45-60 seconds per session early, then faster; whole arc about 9-10 minutes for a player who never idles)

| S | counsels | Alliance | What is new and what happens |
|---|---|---|---|
| 1 | 10 | INTAKE | The greeting trio. Duck already seated. Note 1 auto-picked at 2.5 s. Pulsing hint "Squeeze" on the duck. First squeeze: `Hm.` or a mumble, +0.5 Meh, drawer slot 1 flips. Pool bubbles from counsel 1 (pop them: second verb inside a minute). After counsel 4: two "suspected" drawer slots. Counsel 3: the cushion input glows ("You may now say your own problem."). First real misread arrives with the first typed problem; first Duck Note at the end: "Patient seems tired." Diploma "(being finalised)". Invoice 1 and page 7 1/2 fragment 1. Duck wears a tiny clipboard. |
| 2 | 9 | RAPPORT | The duck's eyes now follow your cursor. The Nod button arrives. The clipboard is now readable. Interpreter drift phase A continues (plausible). Diploma name changes. Alliance line. |
| 3 | 8 | TRANSFERENCE | Tiny round glasses on the duck. The duck calls you Dennis (translations use "Dennis" for %NAME 40 percent of the time in S3-S4). A pink sticky note arrives: "I am worried that the duck is worried about me." The PHONE is installed. First ring after c3: Sandra. Interpreter phase B (personal asides, the Interpreter slips). Bread claim 3 ("Sandra will not discuss it"). |
| 4 | 7 | BREAKTHROUGH | Management: "the hour has been optimized". The duck asks questions in beak flashes after c2 (hearts). After c4: BREAKTHROUGH, the duck says `Float. Float. Float.` (automatic, +2 Meh). Phone after c5 (The Stapler). |
| 5 | 6 | BOUNDARIES | The armchair scoots; drag it back. The loaf appears on the shelf with the laminated tag. The invoice becomes "billed in bread (the loaf)". A note slides under the door once per save for Gerald if flagged (9.13). Duck asks after c2. Phone after c4. Duck wears nothing new. |
| 6 | 5 | DISCLOSURE | The hour has been streamlined. A tiny lanyard on the duck. Interpreter phase C (wordier, contradictory). Counsel 1 duck question. After counsel 2: Share mode for counsels 3-5 (the duck's confessions). Phone silent (the duck "needs the line free"). |
| 7 | 4 | AFTERCARE | Check-in ("How are you?") after c1; the Missing Sock calls from a beach after c3. Duck Notes now read about you reading them. |
| 8 | 3 | PROJECTION | The Interpreter subtitles YOU (5.12). Check-in after c1; the pond calls after c2. |
| 9 | 2 | GROUP | Eleven ducks and Dennis arrive in a circle, nodding out of sync. Counsel 1: the Interpreter confesses he has never spoken duck. The diploma finally fills in: `Dr. {player}, Ph.Q., Cured of Nothing`. The shelf is arranged like a small shrine (loaf, tiny duck if owned, Security if called, hat). Interpreter phase D. "the hour has been reduced to a gesture". |
| 10 | 1 | TERMINATION | The Nod. One counsel: whatever you squeeze, the duck says `That's our time.` (the Interpreter: `That's our time.`), the bell rings. Notes become drawings of you as a duck. |
| D | - | ALUMNI | The Discharge (section 12). |
| Loop | 10 | INTAKE | `Session 1 of 1. Please sit.` The hour restored. First sticky note is Mondays again. The duck says its loop first line (9.17). The tiny duck remains. |

Clipboard rule: clicking the clipboard before Session 1 ends gives the locked line; from Session 2 it works.

---

## 7. ECONOMY, STATS, FLAGS, SAVE

REWARDS (all tiny, none matter; every award has a reason string; say so out loud now and then):
- First counsel ever +0.5; every counsel +0.1 (reason `counsel`); a word discovered for the first time +1; a bubble +0.1; Deep Reflection +1; answered call +2; check-in +0.5; duck question answered +1; chair closeness +0.2 (max once per 15 s); each nod +0.05 (max 1 per session); each boop +0.05 (max 1 per session); a Share-mode press +0.5; session end +5; Discharge +25; the snore bubble +3; the Knock free slot (no Meh, a free slot) or +1 if all are known; Rest (after 90 s idle, every further 10 s) +0.1; Breakthrough +2. Never call `api.award` with a negative value in this module: the Overtime "3 bread" is flavor text only and costs nothing. ACHIEVEMENT rewards (section 13) are paid by the engine ON TOP of the awards above, so do not also `api.award` the same amount: the 13th word (7.5), the door (7.5) and typing `quack` (25) are paid ONLY by their achievements (`seven`, `corridor`, `fluent`); the Discharge pays its +25 award plus the `discharge` achievement reward.

STATS: see section 2. Use `api.stat.inc` at each action; `api.stat.max('duck-therapy.words', n)`.

SAVE (`api.save`, keys, all JSON, strings clipped to 40 chars): `slots` (array of 12 booleans), `s13` (bool), `session` (1..10), `loop` (0..), `tiny` (bool), `security` (bool), `tues` (0..9), `hat` (bool, the Tuesday hat), `frag` (0..6, fragments collected), `diary` (array of up to 8 typed problems, 40 chars each), `nods` (number, cap 9999), `squeezed` (bool), `gerald` (bool, Gerald's note delivered), `knock` (bool), `hearts` (0..7.5). On mount, restore `session` to the start of that session (counselInSession 0), re-derive shelf items, accessories (clipboard S1+, glasses S3+, lanyard S6+), and the diploma name. A fresh save starts at Session 1.

Cross-module reads happen once per mount and once per session start.

---

## 8. VISUAL DESIGN

Match the Lobby: cream, thick dark outlines, sticker shadows, system fonts only. Palette (define as `--dt-*` on the room wrapper):
- Wall `#fff3d6` with a faint dotted-paper texture (radial-gradient dots at 6% opacity), wainscot band `#f2d9a8`.
- Duck yellow `#ffd23f`, darker shade `#f0b400`, beak and feet `#ff8a1f`.
- Armchair coral `#e9715f` with mustard `#e8b84a` trim; couch cushion mint `#8fd9b6`.
- Pool water `#6ad0e0` with highlight `#bff2f7`.
- Wall plaque and Interpreter strip lilac `#c7b3ee`; cream cards `#fff6e0`; invoice receipt `#fffdf4`; waiting-beige for the 7 1/2 corridor `#ebdcc0`.
- Ink `#2a2233`. Thick 3px outlines and `4px 4px 0` offset shadows on everything. Stamps in `#d4352a`.

THE DUCK: one inline SVG (viewBox `0 0 120 120`): body ellipse, head circle, beak as a path with two nostril dots, wing path, two eyes (white eyeball plus a pupil circle). Pupils move with CSS variables `--ex`, `--ey` (range -1..1, `transform: translate(calc(var(--ex) * 3px), calc(var(--ey) * 3px))`), updated by a throttled `pointermove` on the root (at most one update per 60 ms by `api.now()`); from Session 2 only (Session 1 the eyes look straight ahead). Squash and stretch: the wrapper uses `transform: scale(calc(1 + var(--dt-sx)), calc(1 - var(--dt-sy)))` with `transform-origin: 50% 100%`; `--dt-sy` and `--dt-sx` follow hold time while held; on release a spring `cubic-bezier(.3,1.8,.5,1)` 220 ms transition brings them back. A DASH squish is longer and lower. Slow bob keyframe (disabled under reduced motion). Eyes blink via a 3.2-5 s keyframe.
Accessories are CSS-only add-ons toggled by classes: tiny clipboard (S1+), round glasses (S3+), lanyard (S6+), mortarboard made of two CSS shapes (Discharge), knitted hat (after the 4th Tuesday), Security's tiny serious hat.
Moods (class on the duck): neutral, listening, thinking, flinch, limp, asleep, hiding, thrilled. Limp = scale to 60 percent height and a droop.

ARMCHAIR: coral rectangle with rounded back, mustard trim, two arms; the duck sits in it; `--dt-chair-x` translates it.

COUCH CUSHION: mint rounded rectangle; the input is the "pillow". The Nod button sits beside it.

REFLECTION POOL: tall rounded tub with gloss gradient (two layered linear-gradients), water line wobble keyframe. Bubbles: absolutely positioned buttons with radial-gradient highlights; Deep Reflections 1.6x with a conic shimmer.

PHONE: chunky landline (rounded rectangle body, a handset bar with `border-radius:20px`, three round lamps). Ringing: the whole phone shakes with a small rotate keyframe (off under reduced motion), lamps flash the pattern. A tiny sticky label shows the caller's name (Sandra, Gerald, The Stapler, The Missing Sock, The Toaster, The Pond).

CLIPBOARD NOTE POPOVER: clipboard drawn with divs; SVG scribble (a zigzag path from the seeded RNG with animated `stroke-dasharray`); below it the text, plus the small print `Transcribed by Management. The scribble above does not match. This has been transcribed as a style.`

INVOICE: receipt-paper card, zig-zag bottom edge from a conic-gradient mask, prints line by line; rotated stamp `PAID` or `PENDING POND`.

LIGHTING: the Tuesday dim is a fixed-inside-root overlay at opacity 0.04 with a slow fade (for the remainder of the session); sepia for the corridor is a `filter: sepia(.9)` on the room wrapper during that scene; confetti ONLY for the Discharge and the 7 1/2 event, via `api.confetti`.

SPECIAL SCENES: Corridor (7 1/2): the room wrapper swaps to a narrow beige corridor with a tiny bench; a small clock reads 7:30; the duck sits on the bench. Auditorium (root wider than 1200 px): a spotlight cone, a dark wall, the word EVENTUALLY painted on it. Loveseat (root below 420 px): the couch and armchair merge into one block and the duck takes most of the width.

REDUCED MOTION: no bobbing, bubbles drift linearly without wobble, no screen shake, the phone does not shake (lamps still flash), the dizzy spin becomes a fade.

SIZE BUDGET: element budget at rest under 260 nodes; live bubbles 14; chips 12; notes 10 popover pages; invoice rows 6; group ring 11; thought line 8. No canvas.

---

## 9. FINAL CONTENT (verbatim)

How to read this section: each `###` heading names a pool (use as a JS array or a map). Items prefixed `-` are single lines. Tokens: `%NOUN %NAME %N %REV %DIP` (module-side, via `fill()`), `{player}` `{count}` (SPEC tokens, only in lines given to `api.say`). `(S)` = who speaks: Management is `api.say` with `{mood, priority}` (use priority 1 for firsts, secrets and session beats, 0 for ambient); Interpreter is the strip; Duck is the speech bubble. Straight quotes only; escape apostrophes in JS. Never show a raw token.

### 9.1 Opening and session intros (Management)

Opening, said in order at mount, 3.5 s apart (skip the rest as soon as the player squeezes), moods neutral then proud:
- Welcome to Rubber Duck Therapy. Session 1 of 1. Please sit. The duck is already seated, which is a power move.
- The duck has been trained in 12 words. Management has been trained in all of them. This is called a partnership.
- Choose a problem from the tray. Then squeeze the duck. The duck will respond with wisdom, which is a word.
- Tap for a short squeak. Hold for a long one. The duck can tell the difference and has told no one.

Returning (save session above 1, not a loop):
- Session {count} of 1. Please sit. The duck remembers you, in the way a duck remembers, which is mostly the bread.

Returning in a loop (save loop above 0):
- Session 1 of 1. Please sit. We have been over this; it is a lot more over now.

Session intros (said when the session starts, priority 1; S1 uses the opening instead):
- (S2) Alliance update: RAPPORT. The duck has stopped looking at the clock and is now looking at a spot near the clock.
- (S3) TRANSFERENCE has begun. The duck believes you are its mother, its manager, or a very large duck.
- (S3, after its first counsel) The duck just called you Dennis. Dennis is a plant. The duck is blending patients.
- (S4) Session 4. The hour has been optimized. It is 7 counsels, which is a number with confidence.
- (S5) BOUNDARIES: the duck says it is 'stepping back for healthy boundaries.' The step was four centimetres.
- (S6) Session 6. The hour has been streamlined. It is 5 counsels, and a lanyard.
- (S7) Session 7. AFTERCARE. The duck will be checking in on you. Please be ready to be checked.
- (S8) Session 8. PROJECTION. The Interpreter will now be subtitling you. Please do not read the subtitles.
- (S9) Session 9. The hour has been reduced to a gesture. The gesture is two counsels. A group is present.
- (S10) Session 10. The hour is a nod. One counsel. Please make it a good one.

### 9.2 Word discovery lines (Management, once per word per save, priority 1, +1 Meh)
- (Hm.) The duck says 'Hm.' This is the duck's way of saying 'tell me more' or 'I have left the room.' Both are clinically valid.
- (Mm-hm.) 'Mm-hm.' The duck is validating your feelings and, possibly, a parking ticket.
- (Quack.) 'Quack.' Have you tried not having %NOUN? The duck does not offer solutions. The duck offers Quack.
- (Quaaack.) A long one. That is the duck's sad voice. It is about %NOUN. It is also about something in 2011.
- (Water.) 'Water.' Duck wisdom holds that every problem eventually becomes water. Management has not verified this.
- (Bread.) 'Bread.' It is not a metaphor. It is also not not a metaphor. Sandra has asked us to leave it there.
- (Both.) 'Both.' The duck has resolved your dilemma by declining to choose. This is the most senior answer available.
- (Later.) 'Later.' The duck has scheduled %NOUN for Later. Later is a real place and Management has a key.
- (Again.) 'Again.' The duck would like you to explain it a second time, as if the first were a rehearsal for this.
- (Sure.) 'Sure.' A very flat Sure. The kind people say to be done. The duck is a professional and is also done.
- (Float.) 'Float.' You are not sinking. You are simply floating at a lower float.
- (Ask the pond.) 'Ask the pond.' Management has contacted the pond. The pond is not taking calls but is taking notes.
- (all 12 known, once) The duck has been through all 12 words with you. The duck says 'Quack.' and signs your map.

### 9.3 Drawer flavor notes (shown on a discovered slot card)
- Hm.: Means 'tell me more' or 'I have left the room'.
- Mm-hm.: Validates feelings. Occasionally parking tickets.
- Quack.: Not a solution. A Quack.
- Quaaack.: The sad voice. Long. About 2011.
- Water.: Every problem, eventually.
- Bread.: Not a metaphor. Not not.
- Both.: A senior answer.
- Later.: A real place. Management has a key.
- Again.: A rehearsal for this.
- Sure.: The kind people say to be done.
- Float.: A lower float.
- Ask the pond.: The pond is taking notes.
- (loop only, extra card) Welcome back.: Not in the approved vocabulary. Retroactively approved.

### 9.4 Translations (Interpreter strip; `%NOUN %NAME`)

Phase A = Sessions 1-2 (almost plausible). Phase B = Sessions 3-5 (personal asides). Phase C = Sessions 6-8 (wordy, contradicting itself, doubting). Pick from the (word, phase) shuffle bag. Phase D (Sessions 9-10, after the confession) is generic, below.

#### Hm. (S)
- A1: Tell me more about %NOUN.
- A2: The duck is holding space for %NOUN. The space is about the size of a duck.
- B1: Tell me more about %NOUN. And, separately, your sister. I was not asked about your sister.
- B2: The duck is listening, %NAME. I know because it is the same listening it does at the pond, which is also nothing.
- C1: Earlier I said the duck wanted to hear more about %NOUN. I meant it had left the room. I am told both are clinically valid, though not by the duck.
- C2: That was a Hm of exactly one syllable, which I will now render as 41 words so that you feel properly attended to, %NAME, and so that I do.

#### Mm-hm. (SS)
- A1: Your feelings are valid. Not all of them. Four of them.
- A2: The duck agrees about %NOUN. It has agreed with worse.
- B1: The duck agrees about %NOUN. It would also like to agree about something in 2011. Please do not ask me which.
- B2: Mm-hm means yes, %NAME. Or it means the elevator has arrived. I have only ever been in one elevator.
- C1: The duck agrees with you about %NOUN. Previously I said it agreed. I was wrong. It was agreeing supportively, which is different from agreeing.
- C2: A very rich Mm-hm. I will translate it as 'continue', 'stop', and 'was that the kettle'. Please choose the one with your name on it.

#### Quack. (SSS)
- A1: Have you tried not having %NOUN?
- A2: The duck has considered %NOUN and finds it, on balance, a quack.
- B1: Have you tried not having %NOUN? The duck has. It reports mixed results and a rash.
- B2: Quack. It is about %NOUN. It is also a little about how you hold your shoulders, %NAME. I noticed. The duck noticed first.
- C1: Quack. Translation: have you tried having %NOUN, but more slowly? No, strike that. Have you tried it with the lights on? Strike that too. Quack.
- C2: Quack means quack. I have been paid to say more than that and I am doing my best with the spaces.

#### Quaaack. (L)
- A1: Hold that thought, then put it down somewhere you will not find it.
- A2: The duck is sad about %NOUN. The duck is also sad about a towel. It will not say which towel.
- B1: That is the sad voice. It is about %NOUN. It is also about your mother, which I was not asked about, and which I am billing separately.
- B2: Quaaack. Grief, but low-stakes. The kind you have for a sock. I should say that I do not know the sock. I know of it.
- C1: The duck is sad about %NOUN. Correction, the duck is tired of %NOUN. Correction, the duck is sad about being tired. Correction, I am sad. Please disregard.
- C2: Quaaack, which in duck is a very long quack, and in English is a very long pause with the duck's face on it.

#### Water. (SL)
- A1: Water. The duck suggests letting %NOUN flow, or at least go downhill.
- A2: The duck has seen %NOUN dry, and says it was a lot of effort for the same result.
- B1: The duck says water, %NAME. It means %NOUN will be water soon. It also means the duck is thirsty. It has a very particular thirst.
- B2: Water. A deep word. The duck last said it on a Wednesday in a different century and was right then too.
- C1: Water, meaning flow, or float, or the thing in the tray. In the earlier session I said it meant go with the flow. It meant the tray. The tray is the flow.
- C2: I am confident Water was a compliment about %NOUN. I am also confident it was a request for a refill. Both refills are in the pond.

#### Bread. (LS)
- A1: Bread. The duck recommends a slice for %NOUN, untoasted. The Toaster has not been consulted and is hurt.
- A2: The duck recommends bread for all problems except bread.
- B1: Bread, %NAME. As in the loaf. As in the one on the shelf. I was told not to point at the shelf.
- B2: Bread is the answer to %NOUN. Bread is the answer to most things. The question has not been disclosed to me.
- C1: Bread. I said earlier it was not a metaphor. I now believe it is a metaphor for bread, which is a metaphor for me.
- C2: Bread. Two syllables of duck, one syllable of English, and no syllables of anything I was trained in.

#### Both. (LL)
- A1: Both. For %NOUN, the duck chooses the position in the middle, which is a position.
- A2: Both. The duck has been to three conferences on this and the finding was Both.
- B1: Both, %NAME. Both is a strong word. It is how the duck gets through the day. It is also how I do.
- B2: Both. The duck means both of the things you are thinking about %NOUN, and the third thing, which is nearby.
- C1: Both. Which is to say either, or neither, or the thing that was both neither and either while I was not looking. Please do not ask which.
- C2: Both. I would like it on record that I translated this one correctly, in the sense that I said something, and it was long.

#### Later. (SSL)
- A1: Later. Not today, and not never. Never is a different bird.
- A2: The duck has marked %NOUN as a Later. A Later is a Nothing with a calendar invite.
- B1: Later, %NAME. It is a gentle Later, not a rude one. The rude one wears a hat. I will not discuss the hat.
- B2: Later. The duck has put %NOUN in a drawer marked Later. The drawer is, at this time, the pond.
- C1: Later, meaning after, meaning not now, meaning the thing the duck does with its eyes when someone says 'quick question'.
- C2: Later. I previously translated this as never. That was an error on my part. It is a Later, which is worse, because it is true.

#### Again. (SLS)
- A1: Again. The duck would like %NOUN from the top, with the feeling this time.
- A2: Again. The duck is not bored. The duck is thorough.
- B1: Again, %NAME. Say %NOUN again. The duck is paying attention to the way you say 'again' in your head.
- B2: Again. The duck wants it from the top, with feeling, and with your hands away from your face.
- C1: Again. Or, as I say in duck, Again. Or, as I said in an earlier session, Do not do that again. I will go with the one that sounds kinder.
- C2: The duck would like to hear it again. I would like to hear anything again. Do you know I have only ever been to 7 sessions.

#### Sure. (LSS)
- A1: Sure. The duck means it the way a sign means 'Employees Must Wash Hands'.
- A2: A Sure about %NOUN. It is not enthusiastic. It is accurate.
- B1: Sure, %NAME. I will say that is a Sure with eyebrows. I have never seen the eyebrows. I believe in them.
- B2: Sure. It sounded like yes. It sounded like a door. I am required to say it sounded like %NOUN being forgiven. It did not.
- C1: Sure. In the earlier session I translated Sure as certainly. It was not. It was Sure as in whatever helps you cross the road.
- C2: Sure. A short one. I will use the extra time to say that I believe in you, %NAME, in a way that I cannot defend.

#### Float. (LLS)
- A1: Float. The duck suggests %NOUN will also float, if you stop holding it under.
- A2: The duck says you are doing fine, in the sense that you are still on top of the water.
- B1: Float, %NAME. It means you are doing fine. It also means the tub has a leak. These can both be true.
- B2: Float. The duck has seen the bottom of %NOUN. It is not very far down. It is mostly towel.
- C1: Float. Earlier I said sink, but supportively. I would now like to say float, but unsupportively, so that we are even.
- C2: Float. As in stay on top of things, or on top of a bath, or on top of a Tuesday. I will not say which. I am afraid of Tuesday.

#### Ask the pond. (SLL)
- A1: The duck advises you to ask the pond about %NOUN. The pond has no phone.
- A2: Ask the pond. Management has already tried. The pond considered %NOUN and gave a small ripple.
- B1: Ask the pond, %NAME. The pond was not available for comment on %NOUN, but did send a ripple. It was a good ripple.
- B2: Ask the pond. It knows more than the duck, which knows more than me, which knows about 7 of the 7 1/2 lessons.
- C1: Ask the pond. The pond has said it was never consulted. It has asked me who told you that. I said a duck. It has gone quiet.
- C2: Ask the pond. I have asked the pond on your behalf. It said Hm. The pond is a better interpreter than I am and I have told it so.

#### Phase D (Sessions 9-10, generic, after the confession)
- D1: I do not know what that meant. I would like to say it meant something kind, %NAME, and I would like that to be true.
- D2: The duck said a word. I have understood nothing. I am leaving the subtitle as a hand gesture.
- D3: Ask the pond. I am the pond now. I am a pond with a certificate.
- D4: I believe the duck said something about %NOUN. I believe the duck said it with love. I believe a lot of things in the mail.
- D5: I have no translation. I have a feeling. The feeling is that you are doing fine.
- D6: Something about %NOUN. Something about floating. Something about a pond. Honestly, you carry on.

#### Mumbles (unknown pattern; the duck's bubble shows Mrrk. Brk. Qk? Hnk. or Wrrk.)
- The duck did not recognize that pattern. The duck nodded anyway, in the manner of a person at a wedding.
- That pattern is not in the approved vocabulary. The duck made a face that is also not in the approved vocabulary.
- The duck has said something. I did not catch it. I have nodded on its behalf.
- A mumble. The duck is saving the real word for a better time. The better time will be billed.
- I am told that was 'a sentence'. I am unable to confirm what kind.
- The duck produced a sound that I will translate as 'point taken, but not by me'.
- Noted. The duck often says things in the order it thinks of them, which is a method.
- That sounded like a word, but only the way a cough sounds like a word.

#### Seven and a half (the secret 13th word)
- (Duck) Seven and a half.
- (Interpreter) Seven and a half. I have no translation. I was not trained in a thirteenth word. I have stepped out to look at the wall.

#### Breakthrough (Session 4, after counsel 4; automatic)
- (Duck bubble, three in a row, 700 ms apart) Float. Float. Float.
- (Management) BREAKTHROUGH: the duck said three words in a row. They were 'Float. Float. Float.' Management cried a little in the filing room.
- (Management) Management will be processing this in the filing room. Please do not enter the filing room. It is processing back.
- (Interpreter) Float. Float. Float. I have no commentary. I have been asked to hold my commentary for the filing room.

### 9.5 Problems: sticky notes, pick lines, typed lines

TIER 1 (Sessions 1-2). Format `note text | noun`:
- I think I am bad at Mondays. I am not sure which Monday. | Mondays   (ALWAYS note 1; auto-picked at mount)
- My inbox has 4,112 unread messages and I have started to feel watched by it. | the inbox
- I keep rehearsing conversations in the shower. The other person is always the shower. | the shower
- I said 'you too' to a waiter who told me to enjoy my meal. He was not eating. | the waiter
- I have 61 browser tabs open and I am afraid of the one with the sound. | the tabs
- I was told this was a 'quick sync' eleven days ago. | the sync
- I am always the second person to say goodbye on a call. Nobody is first. | goodbyes
- I bought a plant to feel responsible and it is thriving. I feel worse. | the plant

TIER 2 (Sessions 3-4):
- (pink) I am worried that the duck is worried about me. | the worry
- I think my calendar is sentient and it has chosen a Tuesday. | the calendar
- Every elevator I enter becomes quiet. I did not do anything. That is the problem. | the elevator
- I laughed at a meeting for 4 seconds longer than the joke. The joke has since left the company. | the laugh
- I have a drawer where I put things I am not ready to throw away. It is now a room. | the drawer
- I keep apologizing to chairs. | chairs
- I was promoted to a role with no description. I am very good at it. | the role
- (pink) The duck says it is fine. The duck is not a good liar. The duck is a duck. | the duck's fine
- My lunch has been in the fridge so long it has a mailing address. | the lunch

TIER 3 (Sessions 5-6):
- I put bread in my pocket in 2019 and I would like to talk about the pocket. | the pocket
- A sock introduced itself as my manager. I did not hire it. It has already left. | the sock
- (pink) I am afraid of the drain. Nobody talks about the drain. | the drain
- I have outgrown my own opinions and they will not move out. | the opinions
- I was asked to 'circle back' and I have been circling since March. I have not seen back. | the circle
- I am a person who says 'let's table that' and then literally buys a table. | the table
- Sandra approved my leave request and then declined the leave. | the leave
- The wrong clock and I have started to agree. | the clock

TIER 4 (Sessions 7-8):
- I have been fine for so long that I am no longer sure what it was covering. | the fine
- I held the door for someone who was not going through it. We both pretended. | the door
- I am proud of something and I cannot remember what, which is worse. | the pride
- (pink) Nobody asks how the duck is. I am asking for the duck. | how the duck is
- I think I have been in this room before. I think the room remembers. | the room
- I have so many goals and none of them are the right shape. | the goals
- I stayed 7 1/2 minutes after the meeting ended, in case it started again. | the meeting
- I want to rest but I want to be seen resting, which is not rest. | the rest

TIER 5 (Sessions 9-10 and as the loop re-uses Tier 1 again, because the loop begins with Mondays):
- I keep saying 'per my last message' to people who have not sent one. | the message
- I have been told I am doing well by a duck. I am unsure what to do with this. | the praise
- I would like to complain about the complaint, which was fine. | the complaint
- I keep waiting for a sign and I keep getting signs that say BACK IN 5. | the sign
- I was in therapy with a duck and now I am in therapy with a toy. The toy has a license. | the license

PICK lines (Management, priority 0, one per pick, no immediate repeat):
- Case accepted. The duck has pulled the note toward itself with one wing and a sense of procedure.
- The note has been filed under Problems, subheading You.
- The duck leans in. It has read the note. It has read it twice and agreed with it once.
- A sticky note has been received. It is still a little sticky. So is the problem.
- The duck is now in possession of %NOUN. Possession is nine tenths of therapy.
- Noted. The duck has placed %NOUN on its lap, where it will be ignored with great respect.
- The problem has been delivered. The duck has not opened it. The duck has held it up to the light.
- Your problem is valid. It is also a problem. Both of these things can be true, per policy.

TYPED: Management on the cushion unlock (counsel 3, Session 1, priority 1):
- You may now say your own problem. The duck will hear the longest word and do its best with that.

TYPED clinical focus lines (Management, after the chips hop; `%NOUN` is the mangled phrase):
- Clinical focus identified: %NOUN. The duck did not choose this focus. The duck was shown it.
- The duck heard one word: %NOUN. It chose to believe that was the whole problem.
- Management has identified the clinical focus as %NOUN. Management is 70 percent sure. The remaining 30 percent is Sandra.
- The duck has been given your problem and has returned with %NOUN. It is a different problem. It is very confident about it.
- Focus: %NOUN. This is not what you said. This is what the duck was paid to hear.
- The longest word has been taken into evidence. It was %NOUN, more or less.

CASE expiry (Management, priority 0, once when `left` hits 0):
- The duck has stopped listening to %NOUN and is now thinking about lunch.

EMPTY Enter (Interpreter): A bold opening. The duck respects a client who begins with nothing.
RECYCLED via Up arrow (Interpreter): A recycled problem. The duck has seen it before. It is like a coat the duck has hung up and not worn.

### 9.6 Ambient pool (Management, priority 0, one every 4th counsel, shuffle bag)
- The hour is 50 minutes. Each counsel advances the clock 5 minutes, which takes about 7 seconds. Time is compressed for your convenience.
- You have gained 0.1 Insight. Insight is measured in Meh, but heavier.
- Wellness is %N% plus or minus %N%. We are very confident the real number is somewhere in there.
- Session note: patient explained a problem. Duck said a word. Both parties are better by 0.0 units, within the margin of error.
- Management reminds you that anything you say to the duck stays with the duck. The duck is waterproof.
- The duck is a licensed professional. License No. 7 1/2, issued by a pond.
- Sandra from Compliance has flagged this session as 'insufficient boundaries'. The flag is duck-shaped.
- Sandra from Compliance has flagged this session as 'excessive boundaries'. She will not say how to fix either.
- The silence is therapeutic. We are billing for it.
- Please do not squeeze the duck during a breakthrough. This is a clinical recommendation and also a rule on the sign.
- The clock says it is a quarter to something. The something is confidential.
- The duck has a 5 PM. The duck has had a 5 PM since before you arrived.
- The room is quiet in the way of a room that has been listening to a rubber duck for some time.
- Callback pool (use only when true): (loop above 0) The duck has seen you before. It says it has not. It is wearing the face of a duck who has seen you before. / (Interpreter let go earlier this session) The Interpreter is on leave. The duck is doing its own subtitles, which are also quacks.

### 9.7 Pool lines (Management)
- (first pop ever, priority 1) A reflection. Reversed, as is customary.
- (every 10th pop, shuffle bag) Popped. It said '%REV' on the way out. It was true in both directions.
- (pop pool) Another reflection, popped. The pool has noted your attendance.
- (pop pool) A bubble is a thought with a thin skin. You have been thorough.
- (pop pool) Reflection popped. The word inside was yours, backward. It looked relieved.
- (pop pool) That was one of yours. Management recognised the handwriting.
- (pop pool) The pool is 7 1/2 percent calmer. This has been filed under Weather.

DEEP REFLECTIONS (priority 1, `+1 Meh`, also shown beside the pool):
- Deep Reflection: 'You are doing the thing you always do, but this time in a chair.' Management is moved, and also billed.
- Deep Reflection: 'The thing you are avoiding is also avoiding you. It is a very polite stand-off.'
- Deep Reflection: 'You are not behind. You are on a different schedule, set by a clock that is wrong with confidence.'
- Deep Reflection: 'Nobody has been keeping score. That includes Management, which keeps everything else.'
- Deep Reflection: 'You said I am fine, and the pond heard I am fine. The pond is a bad listener, but a consistent one.'
- Deep Reflection: 'Somewhere a duck is being squeezed by someone with a problem. It is this duck. It is you.'
- Deep Reflection: 'It is possible to be both tired and early. The duck is.'
- Deep Reflection: 'The reflection is reversed. The truth is not. It is merely standing on its head to be agreeable.'

### 9.8 Bell lines (Management, session end, priority 1)
- (S1) That's our time. The duck would like to bill you in bread, which is not a currency and has therefore been accepted.
- The bell has rung. The clock says :47, confidently, as it did before, and as it will after.
- That's our time. The hour has ended. The hour has not been informed of this.
- Session over. You were present for all of it, which the duck has noted in a very small hand.
- Time. The duck has put down its clipboard and picked it up again to look busy.
- That's our time. Please take your feelings with you. Anything left behind will be donated to the pond.
- The bell. The clock. The invoice. In that order, per policy, and for no reason.

### 9.9 Invoice item per session (S1 to S10), then the footer
- 1: Pond access, 7 1/2 cm
- 2: Emotional weather, light
- 3: Use of the word 'journey', 1 unit
- 4: Loan of one feeling, returned damp
- 5: Healthy boundaries, 4 cm
- 6: Reverse session (no charge, surcharge applies)
- 7: Waiting, plus waiting
- 8: Being seen (approximate)
- 9: Group rate, 11 ducks, 1 couch
- 10: The Nod, 1 (one)
- Overtime line (one per Overtime that session, max 4 shown): Overtime, 3 bread
- Footer S1-S4: Total: 0 Meh. Billed in bread.
- Footer S5 onward: Total: 0 Meh. Billed in bread (the loaf).
- Pay prompt: Squeeze the duck once to pay.
- Paid: Paid. The duck will not remember this. The duck remembers everything.
- Skipped stamp: PENDING POND. Paid stamp: PAID.
- The torn strip label: Pond Quarterly, Issue 4 (1987), page 7 1/2:

### 9.10 Pond Quarterly page 7 1/2 fragments (one per listed session end, collected in save `frag`)
- (S1) ...stir gently and do not look at it...
- (S2) ...a letter to the editor, signed 'Not a Duck'...
- (S3) 7 1/2 across: a feeling (5)
- (S4) ...half a recipe for 'nothing, serves one'...
- (S6) ...if the pond asks, say you were fine...
- (S8) ...turn the page. There is no page. That is the page...
- (the Discharge, the full page, pinned to the wall forever) You were doing fine.
- (the pinned page, click) Page 7 1/2 of Pond Quarterly. It reads: You were doing fine. There is a coffee ring on it, shaped like a duck.
- (the pinned page, click, second line) The page has been pinned. It is not a metaphor. It is just a page, and it is kind.

### 9.11 Duck Notes (the clipboard; Management transcribes the scribble, always wrongly)
- (S1) Patient seems tired.
- (S2) Patient seems like a patient.
- (S3) Patient seems to be reading these notes.
- (S4) Patient, please stop reading these notes.
- (S5) Patient has found the bread. Patient is being very brave about the bread.
- (S6) Patient was told to nod. Patient nodded. Both parties are unsure who was helped.
- (S7) Patient is doing the thing where they say fine. The duck is also doing the thing.
- (S8) A drawing of a duck, with your name on it, in a very small hat.
- (S9) A drawing of a duck, with your name on it, now holding a very small clipboard.
- (S10) A drawing of you as a duck, in a hat, nodding. It is very good. It is the best thing in the file.
- (the Discharge) {player}   then on the next line   P.S. Bread.   (written once, in a careful, loving hand; render this note in a handwritten italic and no scribble)
- Locked (clipboard before Session 1 ends): Notes are not available to patients. This is a policy. Sandra wrote it. Sandra's notes are not available to Sandra.
- Opened (Management, first open per session): The clipboard has opened. The scribble does not match the words. The words do not match the patient.
- Popover small print: Transcribed by Management. The scribble above does not match. This has been transcribed as a style.

### 9.12 Spam, hug, boundary, boop and nod lines

OVERTIME (9 presses within 2000 ms; Management, priority 1, shuffle bag, one per event):
- Please stop squeezing the duck. That was nine squeezes in two seconds. That is not therapy, that is an accordion.
- Overtime has been applied. You owe the duck 3 bread. Management will accept the cash equivalent of 3 bread, which is not cash.
- The duck has gone limp. This is a professional technique called Compliance.
- The duck has sighed. A rubber duck sighing is not possible. Management would like you to stop making it possible.
- (recover, after 6 s) The duck has recovered. It would like it noted that it was never unwell, merely off the clock.
- (Security, at 40 Overtimes) Security has been called. Security is a smaller duck in a very serious hat.
- (Security, toast) Management would like to raise a toast to the Lord High Warden of Overtime. The toast is 5 Meh. It is warm.
- (Security hat tilt, on 4 presses within 1 s while Security is on the shelf) Security tilted its hat. It has seen what you did.

CORNER COUNT (8 problems picked or submitted within 3 s; the duck hides for 6 s via `setAway`):
- The duck can process one problem at a time. You submitted 12. It has gone to the corner to count.
- (sign on the couch) Back in 5 minutes. (and when it returns) It has been 5 minutes.
- (click the cushion while it is away) Please. Respect my cushion.

HUG (a press of 4 s or more, once per session, Management priority 0):
- That was a hug. The duck has filed it as a hug and does not know what to do with its wings.

BOOPS:
- (first boop of the session, Management) The beak has been booped. The beak was not consulted.
- (10th boop, Interpreter) Please.
- (20th boop, Management) Please do not boop the beak. The beak is a professional beak. ... Well. One more.

NODS (see 5.9):
- (10th) The duck is nodding in the middle of its own reply.
- (20th) The duck has nodded at something you said 5 minutes ago. Management apologises on its behalf.
- (40th) The duck's head has tilted all the way over. 'Understood.' it says, to nothing.

BOUNDARY (shown at most every 3rd scoot, shuffle bag):
- The duck has set a healthy boundary. It is four centimetres. It is a lot of rug.
- The duck is 4 cm further away. It says this is for you.
- The chair has moved. The chair says it did not move. The chair is very calm about it.
- The duck has taken one step back and one step inward, and the net is a feeling.
- (edge) The duck has reached the edge of the rug. Beyond this is a skirting board. The duck has made peace with the skirting board.
- (close, once per 15 s) Personal space. The duck has said the words, quietly, in the tone of a person at a bus stop.
- (Pull chair closer) Chair moved closer. The duck has noted the gesture and is already making plans.

### 9.13 Echo: callers, voicemail, duck questions, check-in

RING (Management, pool, priority 1):
- The duck's phone is ringing in a pattern. Management suspects the pattern is a message. Management suspects everything.
- The phone is ringing. The lamps are telling you something. The lamps have never told anyone anything before.
- Incoming. The phone has flashed three lamps at you in an order. This is either a call or a very small disco.
- Nudge after a wrong attempt: Not quite. The duck is listening harder.
- Decline (click the phone): The call has been declined. It will go to voicemail, which is a hat.

ANSWERED (generic, then the caller's line; both Management; +2 Meh):
- You echoed the ring perfectly. The duck has picked up and said 'Quack.' The caller is satisfied. Callers always are.
- (Sandra, Session 3) It is Sandra from Compliance. She says the duck knows 12 words and she counted 13. She will not say which. She counted twice.
- (Sandra, if the 13th word is already learned) It is Sandra from Compliance. She says the duck now knows 13 words. She was told 12. She would like to know which is which. She will not say.
- (The Stapler) The Stapler is on the line. He wants the duck to recognize him as a licensed therapist. The duck recognizes him as a stapler. Talks have stalled.
- (Gerald) Gerald (VP of Spuds) has submitted a problem: 'I am a potato and I am not sure what I am for.' The duck says 'Quack.' Gerald calls it profound. Gerald is correct.
- (The Toaster) The Toaster is on the line. It says 'Toast.' The duck says 'Bread.' They are not speaking now, but they are both holding the line.
- (The Missing Sock) A very faint call. 'I am fine,' says the Missing Sock. 'It is lovely here. Where is here.' The line goes to a beach.
- (The Pond) The pond is calling. It says it is not taking calls. It is calling to say that.

VOICEMAIL (missed, declined or timed out; shuffle bag; `buzz`):
- You missed the call. The caller left a voicemail that is just the sound of someone deciding not to leave a voicemail.
- Voicemail: a long breath, a small cough, and then the sound of a stapler being politely put down.
- Voicemail: 'I will call back when I have something to say.' It is dated Tuesday.
- Voicemail: 'It's nothing important.' Then, after a pause: 'It is a little important.' Then the line goes.

DUCK QUESTIONS (the duck's beak flashes; Management line then the outcome):
- The duck is asking you something. It is asking with its beak. Please answer in duck.
- A question, from the duck. This is new. The duck has never asked anything before, apart from for bread.
- The duck has a question. It will be asking it once, in the manner of someone who has practiced.
- Answered (pool): The duck asked a question. You answered it in duck. That is the therapeutic alliance, and it is also a heart.
- Answered (pool): You answered. The duck blinked once, which in duck is a standing ovation.
- Answered (pool): Correct, as far as the duck can tell. The duck cannot tell very far.
- Answered (pool): The duck has accepted your answer. The duck has not said it was a good one. The duck has said it was an answer.
- Missed (pool): The duck accepts that. The duck has been misheard before. It was a Tuesday.
- Missed (pool): The duck wrote 'close' on its clipboard. It is a very small clipboard. Close is a very small word.
- Missed (pool): That was not the answer, but it was an answer. The duck is choosing to find it interesting.
- Hearts label: Alliance hearts N / 7 1/2 (cosmetic).

CHECK-IN (Sessions 7 and 8; the duck asks, 6 s window):
- (Interpreter, the duck's question) How are you?
- (Management, after any burst) Honest. Whatever you squeezed, the duck wrote 'Honest.' The duck did not look at the pattern. The duck has seen enough.
- (Management, timeout) The duck wrote 'Honest' anyway. The duck did not wait for the pattern. The duck has seen enough.

CAMEOS (once per save each, Management priority 1):
- (Gerald, Session 5 after counsel 1, if flag metGerald or potato-interview.entered above 0) A note has slid under the door. It reads: 'To the duck, from Gerald: what is a potato for.' The duck quacks once.
- (Gerald, 4 s later) Gerald's reply, relayed by Management: 'Profound. I will be needing that in writing.'
- (pet-rock.entered above 0, Session 2 after counsel 4) A pebble has been found on the couch. It has been logged as a patient. It has not spoken. It is the best-behaved patient.

### 9.14 Pokes (wall and shelf)
CLOCK (Management, shuffle bag):
- This is the wrong clock. It says 4:47 PM on a Tuesday and has said so since the Tuesday began. It is very sure.
- Management estimates the time as 'around now, give or take a lunch'.
- The clock says it is a quarter to something. The something is confidential.
- Current time: 4:47, plus %N minutes of therapy. The clock is confident. The clock has never been audited.
- It is exactly this o'clock.
- Time is a flat circle. This clock is a flat circle that is also wrong.
- The clock has a 7 1/2 on it where the 6 should be. Nobody has asked. Nobody should.
- It is the hour. It is a different hour than it was. We are not discussing which.
- The clock advanced five minutes while you looked at it. It would like you to stop looking at it.

DENNIS (Management, shuffle bag):
- Dennis (Plant) thrives. Dennis (Plant) has attended 4,100 sessions and has not said a word. Dennis (Plant) is the most successful patient.
- Dennis (Plant) has been watered. This was not part of the session. It was part of Dennis.
- Dennis (Plant) leans toward the window and away from the duck. The leaf wobbles. Management has made a note of the wobble.
- The duck called you Dennis. Dennis would like it known that he is not you and not available.
- Dennis (Plant) is not impressed. Dennis (Plant) has never been impressed. This is, in the end, why he is trusted.

DIPLOMA (Management, shuffle bag; `%DIP` is the current name from 9.15):
- The diploma says: Dr. %DIP. The duck did not order this diploma. The duck framed it anyway.
- Diploma status: being finalised. It has been finalising since the Tuesday began.
- The diploma is lilac, which Management is told is a qualification.
- The seal on the diploma is a drawn circle. It has been stamped by a pond.

LOAF (from Session 5):
- (appears, Management, priority 1) A loaf of bread has appeared on the shelf with a laminated tag: NOT A METAPHOR (confirmed). Dennis donated it. We are not discussing the bread.
- (click) The loaf is warm in a way that is not possible. It has been told.
- (click) The loaf is not a metaphor. The loaf would like to be left out of this.
- (click) You pressed the bread. The bread has been pressed before. The bread has opinions about it.

SHELF:
- (tiny duck) The tiny duck is on the shelf. It is looking at you. It is rubber, and it is sure.
- (tiny duck, second) The tiny duck has been here for a very long time. It arrived this afternoon.
- (Security) Security is monitoring the session. Security has no authority and a very good hat.
- (Session 9 shrine, once) The shelf has been arranged like a small shrine. Nobody arranged it. The shelf arranged itself, in a spirit of respect.

BREAD CLAIMS (Management, the first Bread. of each session, priority 0):
- (S1) uses the discovery line in 9.2.
- (S2) 'Bread.' Also not not a metaphor.
- (S3) 'Bread.' Sandra will not discuss it.
- (S4) 'Bread.' The invoice is billed in bread. The bread is not on the invoice. The bread is the invoice.
- (S5 and later) 'Bread.' The loaf has been consulted. The loaf has no comment.
- (loop) 'Bread.' We are not discussing the bread.

### 9.15 Diploma names, Projection and Role Reversal

DIPLOMA NAME (`%DIP`), by session (the plaque prints `Dr. ` plus the name; S1 prints `Dr. (being finalised)`):
- S1 (being finalised)  S2 Duck, Ph.Q.  S3 Dennis, Ph.Q.  S4 Float, Ph.Q.  S5 Bread, Ph.Q. (Not A Metaphor)  S6 Sandra, Ph.Q. (Pending Sandra)  S7 Sock, Ph.Q. (On A Journey)  S8 Dr., Ph.Q.  S9 and S10 {player}, Ph.Q., Cured of Nothing
- (S9, on fill, Management, priority 1) The diploma has been finalised. It reads: Dr. {player}, Ph.Q., Cured of Nothing. The duck did not write it. The duck ordered the frame.

PROJECTION (Session 8; strip shows `YOU (UNINTERPRETED): Quack.` then one of these, shuffle bag, Interpreter):
- What you really meant: I would like someone to ask how it went.
- What you really meant: please stop asking me to be fine in a meeting.
- What you really meant: it is not the thing, it is the thing next to the thing.
- What you really meant: you would like to be handed something heavy and told it is lighter than it looks.
- What you really meant: a sandwich. Possibly several sandwiches.
- What you really meant: the problem is the weather and the weather is you. This is a compliment.
- What you really meant: you are tired in a way that sleep is not equipped for.
- What you really meant: you would like to be right about one thing today, and that thing is the bread.
- What you really meant: I am doing my best, and my best has a very small hat.
- What you really meant: you wish the duck would nod first.

ROLE REVERSAL (Session 6):
- (Management, after counsel 2) The duck would like to share. The duck has never shared. It is made of the sharing material, but that was a long time ago.
- Confession 1 (Interpreter): I am afraid of the drain. Nobody talks about the drain. It is right there.
- Confession 2 (Interpreter): In the bath I float. At home I am just on a shelf. Please do not fix this. Just hold it.
- Confession 3 (Interpreter): People tell me their problems all day. Nobody asks if I am okay. Do not answer that. I am okay.
- Response, Nod (Supportive), alternate: The duck looks at you for a long moment. It has not been nodded at like that before. It is not sure what the rules are.
- Response, Nod (Supportive), alternate: The duck says thank you in a way that is mostly its eyes. The Interpreter has declined to subtitle it, as a courtesy.
- Response, Nod (Skeptical), alternate: The duck takes the skeptical nod well. It says, 'Fair.' Then it says, 'That was fair.' Then it looks at the drain.
- Response, Nod (Skeptical), alternate: A skeptical nod. The duck has been nodded at skeptically by experts. It finds yours refreshing.
- Response, Hm., alternate: 'Hm.' The duck recognises its own word, used by someone else. It is a little moved. It is also a little offended.
- Response, Hm., alternate: You said Hm. The duck has written it down, in case it is a word it can borrow.
- (Management, after the third response) Management thanks you for being a good listener. You are now a Level 1 Listener. There is no Level 2.

### 9.16 The Group (Session 9)
- (Management, session start after the intro) Group Session: 11 ducks, 1 couch. Nobody has shared yet. Everyone is wearing the same smile.
- (Management, after counsel 1) A duck in the back raises a wing. It is not a question. It is a general feeling of wanting to be called on.
- (Management, with it) Dennis (Plant) has joined the circle. Dennis (Plant) is the only one making eye contact. Dennis (Plant) has no eyes.
- (Interpreter, counsel 1, replaces the translation) I should say, I have never spoken duck. I took the course by mail. It was 7 1/2 lessons. I passed 7.
- (Interpreter, 4 s later) Everything I have told you is true in spirit. The spirit is mostly bread.
- (Management, after) The Interpreter has disclosed a credential. Management has noted it and filed it where credentials go, which is a drawer, which is a pond.

### 9.17 Loop and bread
After the Discharge (sequence, 2.5 s apart; each is a line, `reset` scene):
- Management: Session 1 of 1. Please sit.
- Management: The hour has been restored. It was never gone. It was just very short.
- Duck bubble: Welcome back.   (the loop first line, see below)
- Management: The duck said one word that was not in the vocabulary: 'Welcome back.' Management has retroactively approved it and will be speaking to the duck about it.
- Duck bubble: Bread.
- Management: We are not discussing the bread.
- Management: Nothing in the Alliance gauge has changed. The tiny duck remains.

LOOP FIRST LINE (the duck's very first speech in loop k, k = 1, 2, ...; exactly one word longer each loop): take the base list `Welcome back`, `again`, `still`, `anyway`, `regardless`, `somehow`, `Bread`; the line is `Welcome back` plus (k-1) following words joined with ', ' plus a final period, capped at the full list (loop 1: Welcome back. / loop 2: Welcome back, again. / loop 3: Welcome back, again, still. ... / loop 7 and beyond: Welcome back, again, still, anyway, regardless, somehow, Bread.).

### 9.18 Global lines to register (small, via `P.addLines`)
- moduleEnter: Room 7 1/2 is now in session. The duck has been seated since before you arrived.
- moduleEnter: You have entered Rubber Duck Therapy. Please sit. The couch is a suggestion and also a rule.
- moduleExit: You left Rubber Duck Therapy mid-hour. The duck has not been hurt. The duck has written 'was not hurt' fourteen times.
- moduleExit: Session ended by the patient. The duck has billed for the remainder, in bread.
- ticker: Rubber duck confirms it is a licensed professional. License issued by a pond. Pond declines to comment.
- ticker: Wellness at 7%, plus or minus 7%, officials say. Officials are confident.
- ticker: Local clock reads 4:47, as it has since the Tuesday began. It stands by this.
- ticker: Interpreter (Certified*) denies speaking duck. Interpreter says the course was by mail.
- tip: Tip: the duck has 12 words. Management has counted 13. Sandra has counted twice.
- tip: Tip: tap for a short squeak, hold for a long one. The duck can tell the difference and has told no one.
- poster: POSTER: THERAPY IS WHAT HAPPENS WHEN YOU SQUEEZE. Room 7 1/2.

---

## 10. SECRETS AND RARE EVENTS

Every secret has a reaction line (Management, priority 1) and, where listed, a secret achievement.

### 10.1 The Seven and a Half (the 13th word)
DETECT: a closed burst of exactly 8 symbols; symbols 1 to 7 are dots, each (from the 2nd on) with `gapBefore >= 150` ms; symbol 8 is the "half dot": `dur < 90` ms and `gapBefore < 140` ms. Evaluate BEFORE the vocabulary lookup.
EFFECT: the duck says `Seven and a half.` (bubble), the Interpreter line from 9.4, `tada`, save `s13 = true`, achievement `seven` (its 7.5 Meh reward is the payment), and the PAINTED DOOR appears on the wall between the clock and Dennis (a real button, `aria-label="Painted door"`); Management: "Seven and a half. A small door has appeared in the wall between the clock and the plant. It is painted on. It is also open." The word never appears in the drawer. Doing it again just replays the speech and the door stays.
THE DOOR (click, tap or Enter): `scene = door` for 7500 ms (1200 ms under `api.selftest`): the room goes sepia (class), the wrapper shows the narrow beige corridor with a tiny bench, the duck sits on it, a small clock chimes 7:30 (`bell`), Management says "We do not go there." The first visit unlocks achievement `corridor` (its 7.5 Meh reward is the payment); later visits pay nothing. At the end Management: "You have returned from the corridor. The duck was on a bench. The bench is not on the floor plan."

### 10.2 The Knock
DETECT: exactly 5 symbols `S S L S S` and `gapBefore` of the 4th symbol between 550 and 1050 ms (a longer breath before the last two). Evaluate after 10.1, before the vocabulary.
EFFECT: Management: "Two taps on the wall, from the other side of the desk. 'Who is there?' No one. 'Come in.'" The Interpreter: "(the drawer has opened itself)". The Pattern Drawer opens and one random undiscovered slot is filled for free (counts as a discovery without the +1 Meh); if all are known, +1 Meh. Achievement `knock` (first time). Not a counsel.

### 10.3 The Tuesday ladder (typing the word `tuesday` in any case as part of a TYPED problem; picking a sticky note never triggers it; counted in save `tues`, stat `tuesdays`)
1st: the Interpreter declines ("The Interpreter has declined to translate. The Interpreter has asked for the afternoon off."), the duck covers its eyes with one wing, the room dims by 4 percent for the rest of the session, `sad`. Management: "You said Tuesday. The lights have dimmed by 4 percent. The duck has asked that we not use that word again."
2nd: the lights flicker (a 1.2 s keyframe), the duck flinches. Management: "Tuesday again. The lights flickered. Sandra has been informed. Sandra has asked which Tuesday."
3rd: the duck leaves (`setAway('tuesday', 8000, 'Back soon. Gone to look at the pond.')`). Management: "The duck has left a note on the couch. It says: 'Back soon. Gone to look at the pond.' The duck is, as far as Management can tell, at the pond."
4th: the duck returns wearing a tiny knitted hat (save `hat`, permanent) and says nothing. Interpreter: "(the duck says nothing)". Management: "The duck has returned wearing a tiny knitted hat. It has said nothing. It has said it in a hat." Achievement `tuesday`.
5th and later: the duck covers its eyes and the Interpreter says: "The duck has covered its eyes. It is a policy."
Each Tuesday still counts as a case (noun `the Tuesday`) EXCEPT the 3rd (the duck is away). Typing Tuesday never breaks the flow; the problem simply gets stranger.

### 10.4 Word triggers in typed problems (case-insensitive, checked in this order after sanitising; the first match wins unless noted)
1. exact text `quack` (whole trimmed input): FLUENT IN DUCK. Duck bubble: `Quack!` (this is the ONLY exclamation mark in the module). Management: "The duck understood you. Nobody has understood the duck before. The Interpreter has been shown out with severance of 7 1/2 breadcrumbs. The strip is blank. It is a loss nobody asked for." The strip shows `(no subtitles)` for 180 seconds of play (`api.now()` based, not paused by scenes). Achievement `fluent` (its 25 Meh reward is the payment, once per save). When he returns: Interpreter: "I was in the pond. It was fine." and Management: "The Interpreter has returned, tired, with a tiny briefcase." (a small CSS briefcase appears next to the strip until the next session ends).
2. contains `tuesday`: the ladder (10.3).
3. contains `gerald`: from Session 3 the phone rings with Gerald (an Echo `phone` event with caller Gerald, started 1500 ms later). Before Session 3: Management: "Gerald is not on the approved list of callers. The phone has not yet been installed. Gerald has been told." Does NOT set flag `metGerald`.
4. contains `duck`: Management: "You said 'duck.' The duck has gone under the couch. This is transference, or it is you." (`setAway('couch', 4000)`). Still a normal case.
5. contains `bread`: Interpreter: "The duck would like it noted that it did not say that first." Still a case.
6. contains `sock`: Interpreter, once per session: "The duck knows where the sock is. The duck is not able to say. This is a professional boundary." Achievement `sock` the first time.
7. contains `7 1/2` or `7.5` or `7 and a half`: the duck flaps on its tray for 2 s (a CSS class). Management: "The duck cannot stand. The ovation has been attempted for 2 seconds and filed as 'technically'."
8. exactly `help`: Interpreter: "The duck is the help."
9. contains `i give up`: Management: "Management has gently arrived and asked the duck to take five. The duck does not have a five."
10. contains `moist`: Management: "Sandra has flagged that word. She would not say why. She has flagged the flag."
11. the same trimmed text submitted 3 times in a row: Interpreter: "You are rehearsing."
12. length over 100: Interpreter: "The duck got to the second word and drifted. It would like to hear the rest on a different day."
13. a single word (and none of the above): Interpreter: "Bold. Concise. The kind of problem that has a name and a pension."
14. empty: "a bold opening" (9.5).
Triggers 4 to 10 and 12 to 13 do not stop the regular typed flow (chips, mangled noun, case set). Triggers 1, 2 (3rd), and 3 consume it.
SANITISE typed text BEFORE any use: remove control characters, `%`, `{` and `}`; collapse whitespace; truncate to 140 stored, 40 displayed. This stops the player (or the fuzzer) from injecting tokens into `fill()` or into SPEC token expansion.

### 10.5 Rare lines
- `Honestly?`: one counsel in 40 (checked by `api.chance(0.025)`, never in Sessions 1-2, never twice in a row, never on the last counsel of a session): the duck's bubble says `Honestly?` and then nothing; the Interpreter strip stays blank. Management: "Off script. The duck said 'Honestly?' and then nothing. Sandra has been informed." 4 s later: "Sandra asks which word."
- Sandra callback: from Session 3, if the 13th word is learned and the phone rings for Sandra, her line changes (9.13).
- The duck says the player's first-ever typed problem back at the wrong moment: in Sessions 5 to 8, once per session, on the 2nd counsel, the Interpreter prefixes: `Regarding '%TEXT': you were also like this in Session 1.` where `%TEXT` is `diary[0]` (clipped to 40, sanitised, via `textContent`); skip if the diary is empty.

### 10.6 The window and the tab
- Root width under 420 px (checked on `resize` and in the slow tick; no ResizeObserver): the LOVESEAT merge. Management once per mount: "The room has been downsized. The couch and the armchair have merged. The duck is now sitting on your lap, professionally." and the Interpreter once: "This is a lot. The duck did not expect this much of you." Class on the room (the couch and armchair become one block).
- Root width over 1200 px: the AUDITORIUM. A spotlight cone and the word EVENTUALLY on the wall. Management once per mount: "The room has been upgraded. It is an auditorium. The audience is also the duck."
- Tab hidden and shown again after 3 s or more of hidden time (by `api.now()`): Management: "You left in the middle of a session. The duck noticed. The duck was not hurt. The duck has written 'was not hurt' fourteen times." Pause the idle ladder while hidden.

### 10.7 Callbacks (there must be at least 3 working; here are 12)
1. Bread: not a metaphor (S1), also not not (S2), Sandra will not discuss it (S3), the invoice (S4), the loaf with the tag (S5), the certificate (Discharge), the first word after Welcome back (loop).
2. The Interpreter: plausible, personal, wordy, confession (S9), one correct translation ("Thank you."), the leave of absence and the briefcase.
3. The shrinking hour: announced, optimized, streamlined, reduced to a gesture, a nod, restored.
4. The Duck Notes escalating to drawings of you as a duck, then your name and "P.S. Bread."
5. Page 7 1/2 of Pond Quarterly completing as "You were doing fine."
6. Dennis the plant: pokes, the transference, the group circle, the diploma name.
7. Tuesday: the ladder and the knitted hat, and the Interpreter being afraid of it (Float, phase C).
8. The duck's diary: your earlier typed problems read back at the reset.
9. Cross-module: Gerald's note (flag `metGerald` or `potato-interview.entered`), the Toaster's call (`toaster-debate.entered`), the pebble patient (`pet-rock.entered`).
10. The tiny duck on the shelf survives reloads and loops; the Security duck and the hat likewise.
11. The Missing Sock calls from a beach (S7) and is the topic of one sticky note (S5); typing sock gets the professional boundary.
12. The duck's greeting changes by exactly one word every loop.

---

## 11. IDLE AND SPAM

### 11.1 Idle (BACK IN 5)
Idle time = `api.now()` minus the last INPUT, where inputs are `pointerdown`, `keydown` and `keyup` on the module (mouse movement alone does not count as input). Scene changes (invoice, door, discharge) also reset the clock so ceremonies never count as idle. The ladder runs only in `play` scenes and pauses while the tab is hidden. Under `api.selftest` divide every threshold by 30 so the fuzz run's 62 virtual seconds reach the top.

- 20 s: the duck waits professionally. (Management, priority 0, once per episode) "The duck waits professionally. It does not check the clock, which is wrong anyway."
- 45 s: Management: "The duck would like it noted that the silence is billable, at the standard rate, which is bread."
- 90 s: the duck puts out a small sign BACK IN 5 and the armchair looks empty: the duck is visibly BEHIND the chair, eating a sandwich (the sandwich emoji, Emoji 5, is fine). Management: "The duck has put out a small sign: BACK IN 5. The duck is, if you look carefully, behind the chair. Eating." From here on, every further 10 s of idle pays +0.1 Meh (`rest`, `stat rest`, a floating line "Minutes of Rest Provided: %N" in the strip with %N the whole minutes so far) up to 30 awards per episode.
- 150 s: the duck is asleep (mood asleep, eyes closed, a snore bubble). Management: "The duck has fallen asleep. Legally, a sleeping duck is the same as a therapist who is listening very hard." A SNORE BUBBLE (a special bubble in the Pool labelled `Zz`) drifts up and pops for +3 Meh once per sleep (achievement `snore`).
- 240 s: a note lies on the empty armchair. Management: "The duck has left a note: 'Gone to the pond. Think about what you said.' You did not say anything. The duck is aware." The Interpreter: "You did not have to say anything. This was the session." Achievement `idle`.
- RETURN (a `pointermove` of at least 12 px, or any input, after the 90 s step): the duck snaps upright and pretends nothing happened. Interpreter: "The duck says it was not waiting. It was waiting. It is a professional." Management: "The duck snapped upright and pretended nothing had happened. Nothing had. That is the whole trick." If the return comes after 150 s or more: the Interpreter says instead "I was healing you." The ladder resets.

### 11.2 Spam
- THE OVERTIME PROTOCOL: keep a sliding window of the last 12 press timestamps (`pointerdown` and `keydown`). The 9th press within 2000 ms triggers Overtime: the pending burst is discarded, the duck goes limp (class, 60 percent height), `sad`, Management says a line from the OVERTIME bag (9.12), `stat overtime`, the invoice gets an `Overtime, 3 bread` row (flavor only, no Meh is taken). For 6000 ms presses make a tired wheeze (`sad`, at most one per 700 ms), do not enter bursts, and do not count toward the window. After 6 s the duck recovers (recover line). At the 40th lifetime Overtime: Security arrives on the shelf permanently (save `security`), Management says the Security lines and toasts the Lord High Warden of Overtime (achievement `warden`, secret). While Security is on the shelf its hat tilts (a 400 ms class) when 4 presses land within 1000 ms.
- THE CORNER COUNT: 8 problems picked or submitted within 3000 ms: the duck goes to the corner (`setAway('corner', 6000, 'Back in 5 minutes')`); a sign says it has been 5 minutes on return; clicking the cushion while away says "Please. Respect my cushion."
- NODS: capped by the pending queue of 3 and 1 Meh per session. BOOPS: 1 Meh per session. BUBBLES: capped at 14; popping spam is harmless (0.1 each, 12 per second maximum by throttle).
- Presses are cheap but the sound is not: the SFX throttle is one sound per 70 ms; the thought line caps at 8 symbols; the squeeze never creates DOM except the symbol spans (cap 8) and a timed ripple (reuse one element).

---

## 12. THE NOT-ENDING (Session 10 end, about minute 9 to 10)

After the Nod (Session 10, counsel 1): `bell`, the Invoice card for Session 10 prints and is paid or skipped as usual (the Duck Note about the drawing of you appears), then `scene = discharge` begins. The whole ceremony is automatic and takes about 35 seconds (about 8 under `api.selftest`: scale every wait by 0.2). Squeezing the duck during it is only a squeak.

1. THE STAND: Management: "The duck has stood up for the first time. The armchair has tipped forward. The duck would like it noted that this is a waddle and not a walk." The armchair tips (CSS rotate), the duck waddles to the centre of the rug.
2. THE HAT: Management: "A mortarboard has landed on the duck. Nobody threw it. It was always going to land." (two CSS shapes drop onto its head).
3. THE READING (mood proud, `duration` 9000): "{player}, having completed 55 counsels across 10 sessions of decreasing length, you are hereby discharged, cured of Nothing, with all the rights and privileges thereof, which are none." (use the SPEC token `{player}` at the start of the line.) `tada`, `api.confetti`, +25 Meh (`discharge`), `stat discharges`, `stat sessions` already counted, achievement `discharge`, flag `duck-therapy.discharged` set.
4. THE CERTIFICATE: a card printed on bread (crust border, a warm bread-colour gradient, the title CERTIFICATE OF DISCHARGE, the player's name, `Condition: unspecified, but resolved`, `Signed: a single webbed footprint`, `Printed on: bread`). Management: "Discharge. You have been cured of Nothing. This certificate is printed on bread. Please do not eat the certificate. Please do eat the certificate." Then: "Congratulations. You have reached the end of the game. The game continues."
5. THE WELLNESS BLIP: the gauge reads `100% +/- 100%` for 3 s, then the duck gently turns it back to `7% +/- 7%` (an animated snap). Management: "Wellness: 100% plus or minus 100%. The duck has gently turned it back to 7%. The duck knows what it is doing. The duck is a professional."
6. THE TINY DUCK: Management: "The duck has given you a tiny rubber duck of your own. It is on the shelf. It will stay there. It is looking at you." The tiny duck lands on the shelf (save `tiny`, flag `duck-therapy.tinyDuck`), permanently across sessions, loops and reloads.
7. THE TRANSLATION: the duck says one quack. The Interpreter, for the first and only time, translates it correctly: `Thank you.` His strip shakes and then shows `Please disregard my feelings.` Management: "The Interpreter has translated one quack correctly. Management has asked that it not be done again."
8. THE LAST NOTE AND THE PAGE: the clipboard shows the final note (your name, then P.S. Bread., 9.11). The torn page 7 1/2 completes as `You were doing fine.` and is pinned on the wall permanently (save `frag = 7`, the pinned page).
9. THE EXIT SURVEY (`scene = survey`): a card with the question "Exit Survey, Question 1: 'How was your session?' Options: Quack, Quack, Quack, Quack, Quack." and five buttons, all labelled `Quack`. Each press: "Thank you. Your feedback has been quacked." (Management) and a `blip`. It ends when all five have been pressed, or on the `Next Patient` button, or 8 s after the last press, or 12 s after it appeared if never pressed (1 s under `api.selftest`).
10. THE DIARY: Management reads up to the 3 most recent diary entries, 3 s apart (priority 0), each as: `From the duck's diary: 'Dear Pond, today someone said: %TEXT. I did not solve it. I am proud.'` (`%TEXT` is the sanitised entry; via `textContent`/`api.say` only). With an empty diary: `From the duck's diary: 'Dear Pond, today someone said nothing. I did not solve it. I am proud.'`
11. THE RESET (`scene = reset`): the lights dip (an overlay, 600 ms), the couch and armchair slide back, the mortarboard is removed, `session = 1`, `loop += 1`, counsels reset, the sticky note is Mondays again (note 1 auto-picked), the cushion input is pre-filled with the first problem you ever typed (if any; sanitised). Then 9.17's sequence: "Session 1 of 1. Please sit." / "The hour has been restored. It was never gone. It was just very short." / the duck's loop first line (it says `Welcome back.` in loop 1) / the retroactive approval / `Bread.` and "We are not discussing the bread." / "Nothing in the Alliance gauge has changed. The tiny duck remains." The Alliance label reads INTAKE again. The `Welcome back.` card joins the drawer as an extra slot.

What persists forever: the tiny duck, the pinned page, the 13th word, the Security duck and the knitted hat if earned, the diary, the Nod count, the vocabulary slots, the loop count. What does not: session progress (it resets to 1), the dim, the case, the chair position.
LOOP VARIATIONS: in a loop the Interpreter's confession (Session 9) is replaced by "I would like to repeat that I have never spoken duck. I have since taken a second course. It was also by mail." The once-per-save cameos do not repeat. The BREAD CLAIMS in a loop use "We are not discussing the bread." The status strip shows `Session N of 1` as ever.
There is no way to win, no way to finish, and the duck is delighted to see you again.

---

## 13. ACHIEVEMENTS (ids prefixed `duck-therapy.`; 20 here, 10 secret; icons are Emoji 12 or older)

| id | name | desc | secret | reward | trigger |
|---|---|---|---|---|---|
| duck-therapy.first | Doctor of Squeak (Honorary, Unaccredited, Framed) | Squeeze the duck for the first time. The squeeze has been filed under 'Therapy'. | no | 1 | the first resolved burst |
| duck-therapy.hour | Chancellor of the Fifty-Minute Hour (Fifty Seconds) | Finish Session 1. The hour was not the length it claimed, but the bell was convincing. | no | 2 | end of Session 1 |
| duck-therapy.invoice | Supreme Chancellor of Billable Minutes | Pay your first invoice by squeezing the duck exactly once. | no | 2 | the first PAID stamp |
| duck-therapy.bubbles | Archbishop of Reflections, Reversed Division | Pop 100 bubbles in the Reflection Pool. They were your own words, backward, and you are a person who has now popped them. | no | 3 | `check`: stat bubbles >= 100 |
| duck-therapy.vocab | Supreme Cartographer of the Twelve Words | Discover all 12 patterns in the Approved Vocabulary. The duck says 'Quack.' and signs your map. | no | 5 | all 12 slots known |
| duck-therapy.call | Grand Switchboard Operator of Nothing in Particular | Answer your first call by echoing the ring. | no | 3 | the first answered phone |
| duck-therapy.chair | Lord Chamberlain of Personal Space | Drag the armchair back toward the couch 20 times. It will have left again by the time you read this. | no | 3 | `check`: stat chair >= 20 |
| duck-therapy.nods | Duke of the Delayed Nod | Nod at the duck 20 times. The duck is still processing the first one. | no | 3 | the 20th nod |
| duck-therapy.boop | Knight of the Tenth Boop | Boop the beak 10 times. The beak says Please. | no | 2 | the 10th boop |
| duck-therapy.listener | Order of the Level 1 Listener | Get through the duck's confessions in Session 6. There is no Level 2. | no | 3 | the end of the Share mode |
| duck-therapy.discharge | Grand Marshal of Session One of One | Be discharged, cured of Nothing, with all the rights and privileges thereof, which are none. | no | 10 | the Discharge reading |
| duck-therapy.loop | Alumnus of Session 1 of 1, Second Printing | Be welcomed back. The duck says nothing in the Alliance has changed. | no | 5 | the loop reset sequence |
| duck-therapy.seven | Seven-and-a-Half Star General of the Inner Duck | Find the thirteenth word. You were told there were twelve. Sandra counted twice. | yes | 7.5 | secret 10.1 |
| duck-therapy.corridor | Visitor to the Corridor, Briefly | Go through the painted door. We do not go there. | yes | 7.5 | the first door visit |
| duck-therapy.idle | Emeritus Patient Zero of Having Gone Out for a Sandwich | Leave the duck alone for 240 seconds. The duck held the space. The duck did not wait. The duck waited. | yes | 5 | the 240 s step |
| duck-therapy.snore | Lullaby Laureate of the Reflection Pool | Pop the duck's snore. It was a small one. It was also yours. | yes | 2 | the snore bubble popped |
| duck-therapy.warden | Lord High Warden of Overtime | Squeeze the duck 9 times in 2 seconds, forty times, until Security arrives. The achievement is the toast. | yes | 5 | the 40th Overtime |
| duck-therapy.tuesday | Keeper of the Knitted Hat | Say the word the duck asked you not to say, four times, and be given a hat. | yes | 4 | the 4th Tuesday |
| duck-therapy.knock | Admitted, Having Knocked | Tap the pattern on the wall. The wall answered. The wall said come in. | yes | 3 | secret 10.2 |
| duck-therapy.fluent | Chief Mourner of the Interpreter (Severance: 7 1/2 Breadcrumbs) | Type quack. The duck understood. The Interpreter has been shown out. | yes | 25 | trigger 10.4.1 |

Optionally also `duck-therapy.sock` (secret, 2): "Custodian of the Sock's Silence", desc "Mention a sock to the duck. The duck knows where it is."
Use `api.achieve(id)` (idempotent) except the two `check` ones. Icons suggestions (Emoji 12 or older): duck `🦆`, bell, receipt, map, telephone, couch, nodding (a plain bust glyph), door, sock `🧦`, yarn `🧶`, shield, bread `🍞`. Do NOT use the bubbles emoji (Emoji 14) or the potted plant (Emoji 13).

---

## 14. IMPLEMENTATION HINTS

### 14.0 Showrunner decisions where the pitches disagreed
- WHO translates: the Interpreter strip does (pitch 2), Management only comments with `api.say` (pitch 1 had Management translate). This gives the Interpreter an arc and keeps the narrator from being drowned in 55 translations.
- The hour shrinks (pitch 1); the Wisdom Allowance and the 11 Permitted Words are cut.
- The ending is pitch 1's (`Welcome back.`, the tiny duck, 10 counsels again) plus pitch 2's `Thank you.` translation, survey and page 7 1/2. `Tuesday.` is NOT the last word; Tuesday is its own ladder.
- The Interpreter's "let go" lasts 180 s of play, not forever, so a joke cannot soft-lock the module.
- The 13th word is the Seven and a half (secret); `Welcome back.` is a loop-only extra word.
- One exclamation mark in the whole module: `Quack!`.

### 14.1 File skeleton (single file, <= 1800 lines; keep data on long lines, code short)
```
/* POINTLESS module: duck-therapy */
(function(){ 'use strict'; const P = window.POINTLESS;
  P.injectCSS(CSS, 'css-duck-therapy');           // all selectors contain .m-duck-therapy-
  P.addAchievements([...20...]); P.addLines('moduleEnter', [...]) /* 9.18 */;
  // DATA: VOCAB[12], TRANS[word][phase][], MUMBLE[], D[], TIERS[5][], PICK[], FOCUS[], AMBIENT[], DEEP[], POP[],
  //       BELL[], INVOICE[10], FRAG[], NOTES[10], CALLERS{}, VM[], PROJ[], ... (all of section 9)
  P.registerModule({ id:'duck-therapy', ..., mount(root, api){ ... return { destroy(){} }; } });
})();
```
Inside `mount`: state object `S` (session, counselInSession, case, symbols, burst, press, scene, epoch, echo, away, overtimeUntil, chairX, awayTarget, idle, flags) -> `build()` (DOM via `api.el`) -> `paint*()` (status strip, pips, wellness, clock, shelf) -> verbs (`onPressStart/onPressEnd/closeBurst/resolveBurst/counsel`) -> systems (`startSession/endSession/startEcho/setAway/discharge`) -> one rAF loop `frame(ts, dt)` (pool bubbles, chair easing, squish while held, group wobble not needed because CSS) + ONE `api.setInterval(500)` slow tick (idle ladder, echo timeouts, Interpreter leave, resize check, rest awards) -> `return {destroy}` that only saves (api clears everything else).

Build order (each step leaves a valid, playable file): 1) CSS, data tables, registration, room DOM with a static duck; 2) squeeze verb and burst classifier, vocabulary, thought line, subtitles; 3) tray, typed problems, chips, `fill`; 4) pool and bubbles; 5) hour, sessions, invoice, notes; 6) achievements, awards, save; 7) echo; 8) chair; 9) share mode, group; 10) secrets, idle, spam; 11) discharge and loop; 12) polish.

CUT LIST if the file nears 1800 lines (cut in this order, never cut section 9 jokes of the first three sessions): the 5-button survey (end at the diary), the group ring (keep the lines), the knitted hat and corridor visuals (keep the lines), the Projection pool, IOI timing in the echo (keep type matching), the chair drag (keep the `Pull chair closer` button and the scoot), the Hearts gauge.

### 14.2 Helpers worth writing first
- `bag(arr)` shuffle-bag returning `next()`; reshuffle when empty and swap the first item if it equals the last returned. One bag per pool (word-phase bags created lazily in a map).
- `fill(text, extra)`: replace `%NOUN`, `%NAME`, `%REV`, `%DIP`, `%TEXT` (from `extra`), then `%N` (not followed by a capital letter), then any leftover `%[A-Z]+` with `the matter`.
- `clean(text)`: the sanitiser in 10.4. `num(x, d)`: `Number.isFinite(x) ? x : d` for every number that reaches the DOM (no NaN, ever).
- `say(text, o)`: `api.say(fill(text), o)` plus a guard so lines are never empty. `sub(text)`: sets the Interpreter strip text via `textContent` and restarts the wipe class (force reflow by reading `offsetWidth`).
- `go(sceneName)`: sets `scene`, increments `epoch`, clears the burst timer and open symbols, resets the idle clock.
- `later(ms, fn)`: `const e = S.epoch; return api.setTimeout(() => { if (e === S.epoch) fn(); }, ms)`; use it for every ceremony step.
- `slow(ms)`: `api.selftest ? ms * 0.2 : ms` for ceremony waits; idle thresholds divide by 30 in selftest.
- `cap(listEl, n)`: removes the oldest children beyond `n`.

### 14.3 The squeeze, in detail
- State: `press = null | {t0, id, dash, cancelled, source}`. ONE function `endPress(reason)` is the only way to end a press and it is idempotent (`if (!press) return`). Wire it to `pointerup`, `pointercancel`, `lostpointercapture`, `keyup`, root `pointerleave` ONLY when not captured, window blur (`api.on(window,'blur')`) and `visibilitychange`. The drag-cancel path calls `endPress('drag')`, which discards the symbol (no `symbols.push`, no sfx, no award).
- `pointerdown`: ignore if `e.button` is not 0 (or if `e.pointerType === 'mouse' && e.buttons !== 1`); if a press is already live, ignore. Space and Enter keydown: `if (e.repeat) return; e.preventDefault();` call the same `startPress('key')`.
- `closeBurst()` runs from the timer (managed) or at the 8th symbol; it copies and empties `symbols` BEFORE resolving so a reentrant press cannot corrupt the array.
- The thought line: `thought.textContent` is built from the symbols (cap 8); the provisional symbol of the live press is appended with a class; clear it 600 ms after closing.
- `--dt-squish` is set on the duck wrapper's style from the rAF loop only while a press is live; on release set it to 0 and let the CSS transition spring it back. Under reduced motion skip the spring but keep the class changes.
- `touch-action:none` is on the duck AND the armchair; the `contextmenu` event is prevented on both.

### 14.4 Echo details
`S.echo = {kind, pattern:[{t:'S'|'L'}...], shownIOI:[...], deadline, attempts, caller, token}`. Flash with a chain of `later()` calls (lamp on, lamp off) so a scene change cancels it. At the first closed burst after the flash ends (or earlier if the player is eager: accept bursts any time after the lead-in begins, but only evaluate the closed one), compare: same length, same types, IOI check `Math.abs(p - s) <= tol * s` for each consecutive pair of onsets. `tol` lives in `S.tol` (0.45, 0.8 after two misses, reset on success). If the burst is shorter than the pattern but could still be the start of the answer, wait (do not count an attempt until the burst closes by timer or length). Deadline: `S.echo.deadline = api.now() + 8000` checked by the slow tick. Clear `S.echo` on every scene change.

### 14.5 Boundaries and the pool
- The chair element gets `style.setProperty('--dt-chair-x', px)` once per frame only when the value changed by more than 0.2 px. `maxX = Math.max(0, rug.clientWidth * (narrow ? 0.22 : 0.35))` recomputed on resize, clamped; `chairX` is clamped on every write. A `NaN` here moves the duck off-screen forever, so route all writes through `num()`.
- Bubbles: `{el, x, y, vy, ph, deep, rev, born}` in an array; `y` decreases by `vy * dt`, `x` wobbles; in the horizontal narrow mode swap axes via a flag. Pop = `api.stat.inc` + `el.remove()` + splice. The array and the DOM are only mutated inside `frame()` or the pop handler, never from two places without the splice.

### 14.6 Testing and lint (run from the project root, in this order, until all green)
- `node tools/lint.js games/duck-therapy.js` (0 errors; read the warnings).
- `node tools/selftest.js duck-therapy --steps 800` and with `--seed 2 --steps 1500`, then `--idle 30000`, then once with `--real`.
- `node tools/shot.js duck-therapy reports/shots/duck-therapy-a.png --actions 30` and again with `--width 360 --height 800` and `--width 1300`, `--reduce-motion`; LOOK at the PNGs (Read tool) for overlap, a clipped duck, the pool strip at 360 px, and no horizontal scroll.
- Under the fuzz harness the secrets are unlikely to fire by chance: to exercise them temporarily lower constants (never ship the lowered values), or rely on code review for the secret paths and the discharge. The fuzz DOES click the door, notes, drawer, phone, bubbles, Nod, boops, beak, clipboard, survey buttons, and random keys and drags; every one of those must be safe in every scene.
- `?selftest` shortens all long waits via `api.selftest` (idle, invoice timeout, door, discharge, survey); do not let any of them be longer than 2 s of virtual time there except the 180 s Interpreter leave (it may expire naturally).

### 14.7 Things the lint and the fuzz are known to complain about
No `Date.now`, no `Math.random` (use `api.rand`, `api.chance`, `api.pick`, `api.shuffle`, `api.randInt`); no raw `setTimeout`, `setInterval`, `requestAnimationFrame`; no `addEventListener` on `window` or `document` (use `api.on`); no `innerHTML` (use `api.el` and `textContent`); no `<form>` (handle Enter on the input yourself: `keydown` with `preventDefault`); no `location`, `window.open`, links with an `href`; no body or head mutation; no timers or listeners at load; class names in `P.injectCSS` all start `m-duck-therapy-`; keyframes `m-duck-therapy-*`; icons Emoji 12 or older; at least 80 distinct line-like strings (this brief has several hundred); `api.el` attribute rules: `true` is a bare attribute, `aria-*` booleans become strings; children that are `NaN` are rendered and FAIL the run.

---

## 15. RISKS (the 5 most likely implementation bugs)

1. **Stuck or doubled presses.** A pointer capture lost to `pointercancel`, a blur, a hidden tab, a drag-cancel, or the harness's synthesized sequence (`pointerdown`, `pointerup`, then a `click`; or `keydown` Enter then a `click`) leaves a press "held" forever or counts one squeeze twice. Symptom: the duck stays squashed, the burst never closes, Overtime fires from one click. Cure: a single idempotent `endPress(reason)`; ignore `click` except the `detail === 0` assistive path; never start a second press while one is live; test a 5 s hold, a drag off the duck, and Enter spam with the keyboard.
2. **Stale timers and scene races.** The 1100 ms burst timer, the 8 s echo window, the 6 s Overtime, the away state (Tuesday, BACK IN 5, corner, couch), the Interpreter's 180 s leave and the ceremony chains all fire in a scene that has since changed (session end during an echo, a door visit during the corner count, the discharge during an invoice), leaving the duck hidden, a flag stuck, or input dead. Cure: `epoch` plus `later()` for every deferred callback, `go()` clearing the burst, ONE `setAway` with a token, and no scene ever relying on another scene's timer.
3. **Text and number safety.** A raw `%NOUN`, an empty noun reversed into nothing, the player's own `%` or `{` `}` being re-expanded by `fill()` or by SPEC token substitution, a missing table entry past Session 10 or in loop 12 (`undefined`), or a `NaN` in the clock, the wellness, the chair or the Hour pips. The fuzz types random strings and the forbidden-words check reads the whole root, `aria-label`s, and every `api.say`. Cure: `clean()` before storing or showing any typed text, `fill()` with a final leftover sweep, `num()` for numbers, defaults for every table lookup (`TIERS[tier] || TIERS[0]`, `FRAG[i] || FRAG[FRAG.length-1]`), `textContent` only.
4. **Unbounded DOM and leaks.** Bubbles (cap 14), chips (cap 12), the thought line (8), invoice rows (6), notes popover pages (10), the group ring (11, must be removed at the session end), repeated Share and Discharge scenes, and the rAF loop must all stay bounded across 20 remounts and a 1500-step fuzz; the always-on rAF loop must stop on destroy (use `api.requestAnimationFrame` and check `api.destroyed`); `destroy()` itself must not throw.
5. **Rhythm thresholds colliding with the other verbs.** The 8 px drag-cancel on the duck fights the squeeze (a shaky tap cancels it; use 8 px of HORIZONTAL travel and only from Session 5 on); mashing accidentally triggers the half-dot secret (hence the 150 ms steadiness rule on dots 1-7) or Overtime plus a full burst at the 9th press; the Echo's timing tolerance is too strict and sessions 3 to 8 feel unfair (hence `tol` widens after two misses and a decline is always one click); the closing delay of 1100 ms makes the first reply feel slow (show the shrinking listening ring, and play the speech bubble the instant the burst closes).

---

## 16. ACCEPTANCE CHECKLIST (the builder confirms each)

- [ ] `node tools/lint.js games/duck-therapy.js` has 0 errors; `node tools/selftest.js duck-therapy` PASSES at 400, 800 and 1500 steps and with `--real`; the `?selftest=lobby` run still enters the module without errors.
- [ ] First joke in 10 seconds with no input (opening trio, note auto-picked, hint pulse). A squeeze produces a translation 1.1 to 2 s later. Each of the 12 patterns is discoverable and fills its drawer slot; unknown patterns mumble; the 13th word, the Knock and the door work.
- [ ] Sessions 1 to 10 have lengths 10, 9, ..., 1; the bell, invoice (paid by squeezing), Duck Note and page fragment fire; the Alliance label, diploma name, accessories and shelf items follow the table in 6.3.
- [ ] Echo events happen in Sessions 3 to 8 as scheduled (phone and duck questions and check-ins); share mode runs in Session 6; the Group arrives in Session 9; the Nod ends Session 10.
- [ ] The Discharge, the tiny duck (survives reload), the loop and `Welcome back.` work; the loop first line grows by one word each loop; the diary reads back.
- [ ] At least 20 achievements are declared with 10 secret; idle (all five steps), spam (Overtime, Security, corner count), Tuesday ladder, word triggers and window oddities are implemented; at least 3 callbacks work (there are 12).
- [ ] Narrow (360 px) and wide (1300 px) screenshots look intentional; Tab order matches 4.4; reduced motion is respected; no `NaN`, `undefined`, `null` or raw `%X` anywhere; the rubber duck never leaves the room.
