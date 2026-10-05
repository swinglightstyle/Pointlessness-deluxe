# DESIGN BRIEF: The Department of Complaints  (module id `complaints-dept`)

Builder: you need only SPEC.md, VOICE.md and this file. Output: ONE file `games/complaints-dept.js` (<= ~1800 lines, vanilla JS, classic script, no external anything). This brief merges three pitches (call them Pitch 1 "Building", Pitch 2 "Brenda", Pitch 3 "Matcher") and cuts what is not buildable. Where this brief and a pitch disagree, this brief wins. Where this brief is silent, follow SPEC.md section 5.

Priority tags: **[MUST]** build it. **[SHOULD]** build it unless over the line budget. **[COULD]** first thing to drop if you run out of lines (see section 19 for the cut order).

## 0. Registration and conventions

- `id: 'complaints-dept'`, `title: 'The Department of Complaints'`, `tagline: 'Your complaint is important to us in a way we cannot file.'`, `icon: '🗂️'`, `category: 'department'`, `unlockCost: 0`, `tags: ['typing','bureaucracy','ladder']`.
- `api.setTitle('Department of Complaints (Window 4)')`.
- All CSS classes `m-complaints-dept-*` (write the full prefix literally in the CSS string so `tools/lint.js` can see it; in JS use a tiny helper `const k = s => 'm-complaints-dept-' + s`). All stats `complaints-dept.*`. All achievements `complaints-dept.*`. Flags: `complaints-dept.rockMet`, `complaints-dept.sockSeen`, plus the shared `metGerald` (read and set).
- Module lines may also be contributed to global categories with `P.addLines` (ticker / moduleEnter / moduleExit, see 16.12).
- **Token convention (important):** the engine substitutes `{player}` `{meh}` `{module}` `{count}` `{item}` inside `api.line()` output. Nearly all text in this module is NOT read through `api.line()`; it lives in inline arrays served by the module's own shuffle bags. Module-side tokens in this brief use PERCENT tokens: `%QQ` (the player's quote already wrapped in straight double quotes), `%NUM`, `%FIRST`, `%WORDS`, `%CHARS`, `%LONGEST`, `%TIME`, `%PLAYER`, `%CASE`, `%OLDCASE`, `%OLDQQ`, `%OLDREASON`, `%FOOD`, `%NAME`, `%ECOUNT`, `%CLAUSE`, `%CTITLE`, `%N`, `%ANSWER`, `%EMOJI`. A tiny `fill(str, map)` replaces `%[A-Z]+` and, as a safety net, replaces any leftover `%TOKEN` with an empty string and collapses double spaces. Never ship an unreplaced token (Risk 3).
- Spelling: American (color, favor, reorganization). Straight quotes only. Lines in this brief that contain a single quote are given in plain text; wrap them in JS double-quoted strings.
- Lines may be trimmed by a few words to fit a UI box but must not be softened or "improved". Deadpan is the point.

## 1. Concept

You are a Valued Employee who has come to the Department of Complaints to type a complaint. A rubber stamp the size of a toddler rejects it for a reason so specific it feels legally binding, and the reason is computed from what you actually typed (word count, punctuation, a word you used, how fast you typed it) and quotes a fragment of your own words back at you as a legal citation. Every rejection comes with an ESCALATE button. Escalating sends the same complaint up a visible 13-rung building of ever-less-plausible supervisors. **Every rung is a different tiny physical interaction** (choose a desk, pull a ticket, retype an apology that rewrites itself, wear a hat, wait out a rock). The top rung is a Rock. The Rock rules. A smaller rock then rejects the Rock. The Department hands you a certificate for exhausting a process that has not been exhausted, the clerk says "Next.", and a small rock now sits on the counter that nobody will acknowledge. The building quietly gains rungs every lap. There is no way to win; the player is never wrong and never right; every complaint is treated like a bridge collapse.

Arc (VOICE.md rule 3): normal (Brenda, a clean stamp) -> weird (the ladder reveals itself, desks, tickets) -> bureaucratically unhinged (committee of one, mirror, weather vane, stapler union) -> strangely touching (Brenda off the clock after the Rock) -> back to normal like nothing happened ("Next.").

## 2. Cast (use sparingly, rarer is funnier)

- **Brenda**: Intake Clerk at **Window 4**, which is a crayon drawing of a window. Always mid-sandwich. Pitch 2's Brenda merged with Pitch 3's Window 4. Emoji clerk `🧑‍💼` in a booth behind a translucent glass pane. After the Rock she is "Brenda, Acting Rock".
- **Management** (`api.say` default speaker): the narrator, with the engine's bubble. Brenda, Desmond and others speak with `api.say(text,{who:'Brenda'})`. Gerald with `{who:'Gerald'}`.
- **Sandra from Compliance**: never seen, always cited. Appears as clause numbers and a counter "Sandra Has Cited: N".
- **Gerald**, VP of Spuds (rung 7). **The Toaster** (cameo slip). **Dennis the Lobby Plant** (Hat's reference). **The Stapler** (rung 10, union rep). **Tuesday** (never appears; rung 12 invite). **The Missing Sock** (postcard). **The Rock** (rung 13).
- Desmond: Senior Intake Clerk. Gerald's Nephew: the Intern (nameless, always unsure).

## 3. Screen layout and DOM map [MUST]

Root `div.m-complaints-dept-root` (the `root` passed in gets this class on a child wrapper). CSS grid, two columns above 760px (main 62% / side 38%), stacked below 760px. Needs to work at 360px with zero horizontal scroll.

```
.m-complaints-dept-root   (data-rung="1..N", data-lap="1..", data-compact="0|1", data-phase="intake|ceremony|slip|rung|rock|cert|...")
  svg defs (one inline <svg width=0 height=0> with filter #cd-rough, feTurbulence; < 30 lines)
  .m-complaints-dept-banner        (resize banner / siren sign / policy notices; role=status)
  .m-complaints-dept-grid
    .m-complaints-dept-main
      .m-complaints-dept-diorama   (Intake window: Window 4 drawing, glass pane, Brenda, sandwich, bell button, stamp arm, laminated sign, small rock from lap 2)
      .m-complaints-dept-stage     (aria-live="polite": the ONE current screen: form | ceremony | slip | rung screen | rock | certificate)
      .m-complaints-dept-trail     (Paper Trail: last 6 slips, older folded into "Previous Disappointments (N)")
    .m-complaints-dept-side
      .m-complaints-dept-building  (the 13+ floor cross-section ladder with elevator marker; compact breadcrumb strip on narrow)
      .m-complaints-dept-meter     (Satisfaction Index thermometer + unit label)
      .m-complaints-dept-sandra    ("Sandra Has Cited: N")
      .m-complaints-dept-binder    ("Reasons Collected X of Y", cosmetic)
      .m-complaints-dept-drawer    (Case File drawer button 🗂️ + max-height collapsible list, ring buffer of 40 index cards)
      .m-complaints-dept-shredder  (trap door at the bottom of the stage: appears during withdraw and bulk shred)
```

- The building is a vertical stack of floors (flex column-reverse): floor 1 at the bottom, the Rock on top under a tarp silhouette. Unreached floors are dark windows labelled `???`; reached floors are lit (stepped flicker keyframe) and show their name and emoji. The elevator is a small `🧾` tab that moves between floors via `top` transition (no offset-path; keep it simple). The first escalate triggers the **Ladder Reveal**: whole building does a 700ms dolly-zoom (`transform: scale(1.0 -> 1.08 -> 1)` plus a 3deg tilt and back) while all floors fade in as dark windows.
- From lap 2 a cosmetic "Floor 7 1/2 (Roof Annex)" slot is added above the Rock tier with the label "Elevator: a rumor".
- DOM caps: paper trail <= 6 visible slips; Case File ring buffer 40 (rendered lazily when the drawer opens, newest first); building floors <= 20; confetti only via `api.confetti`.

## 4. Controls [MUST]

Everything is a real `<button>`, `<textarea>`, `<input>`. Visible coral focus rings. Tap targets >= 48px on touch.

| Input | Effect |
|---|---|
| Type in the textarea | Live "Word Count Under Review" ticker. |
| Enter in the textarea | Submit. Shift+Enter inserts a newline. Ctrl+Enter also submits. |
| Click "SUBMIT FOR PROCESSING" / "FILE IT" button | Submit (empty is allowed, see 6.1). |
| Space (or click / tap anywhere on the ceremony strip) during the ceremony | Skip it. Only when focus is not inside a text control. Costs the "Skipped Ceremony Surcharge". |
| Escape | In INTAKE with text: clears the textarea. In every other phase except the Rock countdown: **withdraws** the complaint to the shredder ("Withdrawn With Love", 6.12). Closes the Case File drawer first if open. |
| ESCALATE button (focused by default when a slip prints; Enter/Space activates it) | Appeal to a higher authority: go up one rung. Hotkey `E` (not while typing). |
| FILE ANOTHER | New case: ladder resets to rung 1, textarea cleared and focused, case number +1. |
| ACCEPT REJECTION (NOT AVAILABLE) | The decoy gag (section 8, Gag 2). |
| Stars 1-5 (buttons, keys 1-5, arrow keys inside the star group) | Survey on every slip (6.9). Digits only active on the slip screen and not while typing. |
| `R` (not typing) | Management reads the latest slip aloud, flatly, via `api.say`. |
| Rung screens | Each has real buttons; number keys 1-9 choose options where a rung lists several (always also buttons). |
| Bell button (🔔 on the counter) | Brenda answers with a different line (section 7, rung 1). |
| Small rock on the counter (from lap 2) | Click it (Secret 4). |
| Pointer moves / arrow keys / drag over the Weather Vane | Spin it (rung 9). |

Do not add `drag-and-drop` anywhere; Pitch 1's "drag the complaint onto a desk" is replaced by clicking a desk (a keyboard player and the fuzz harness must be able to finish every rung).

## 5. State machine, ladder and timeline [MUST]

### 5.1 Phases

`INTAKE -> CEREMONY -> SLIP -> (ESCALATE) -> RUNG -> SLIP -> ... -> ROCK -> CERT -> RESET -> INTAKE`

Plus side states: `ACCEPT` (rare acceptance overlay), `MANAGER` (special rung), `SHRED` (withdraw), `COOLING` (inputs disabled 4s), `ROCKCOMPLAINT` (lap 5), `PRINTING` (certificate button).

- Maintain `S = { phase, runId, pos, lap, caseNo, text, ... }`. Every phase change does `S.runId++` and clears all per-phase timers (keep them in an array `S.timers` created with `api.setTimeout`). EVERY async callback starts with `if (id !== S.runId) return;` (Risk 1).
- `ladder` is an array of rung ids. `S.pos` is the current index (0 based). ESCALATE: `pos++`, enter `RUNG(ladder[pos])`. The rung calls `done(result)` exactly once (guard with a `finished` boolean) -> builds the slip -> `SLIP`.
- Rung 1 (Brenda) is the only rung with the full intake form and ceremony. Rungs 2+ have their own interaction as the ceremony, then a short (0.8s) stamp slam, then the slip.
- Every rung **auto-resolves after 20 seconds with no input**: Management says "The supervisor has ruled by default." and it calls `done()` with a default ruling. Under `api.selftest` use 3 seconds. Every timer is reset by any pointerdown or keydown inside the module, but the 20s auto-resolve is a hard cap per rung entry of 45s regardless of activity (so random clicking cannot stall a rung forever).
- The ladder base (13 rungs) and inserted rungs:

| pos | id | Name | Interaction |
|---|---|---|---|
| 1 | `brenda` | Intake Clerk Brenda, Window 4 | type, ceremony, stamp |
| 2 | `desmond` | Senior Intake Clerk Desmond | three identical desks |
| 3 | `queue` | Supervising Senior Intake Clerk | take a number, let people go ahead |
| 4 | `contrition` | Assistant to the Regional Assistant | Typing Test of Contrition |
| 5 | `intern` | Gerald's Nephew (Intern) | the intern asks YOU |
| 6 | `committee` | The Committee of One | invite chairs |
| 7 | `gerald` | Gerald, Vice President of Spuds | complaint read aloud |
| 8 | `mirror` | A Mirror Facing a Mirror | click 8 frames deep |
| 9 | `vane` | The Complaints Appeals Weather Vane | your mouse is the wind |
| 10 | `stapler` | The Stapler's Union Rep | staple the complaint |
| 11 | `hat` | The Ombudsman Who Is Also a Hat | wear the hat |
| 12 | `tuesday` | Tuesday's Assistant | write "the day after Monday" |
| 13 | `rock` | THE ROCK | wait out 7.5 seconds |

- **Lap insertions** (applied at RESET): lap 2 inserts `half` ("Rung 7 1/2: The Complaints Department's Own Complaints Department") between `gerald` and `mirror`. Lap 3 inserts `bigrock` ("A Bigger Rock") immediately before `rock`. Lap 4 inserts `cloudrock` ("A Rock That Is Technically A Cloud") immediately before `rock`. Laps 5 and up insert nothing new except `Rock No. N` is not needed: lap 5 triggers the Rock's own complaint (section 9, S10); laps 6+ simply repeat the full ladder with one more "Acting" on Brenda and a larger counter rock. The `rock` id always stays last. Rung numbering shown in the UI is the array index + 1, except `half` which displays "7 1/2". `bigrock`, `cloudrock` and `rock` share the Rock handler with different parameters (countdown 7.5s / 10s / 7.5s, different text; selftest 1s).

### 5.2 Pacing timeline (a normal reader, about 10 minutes for lap 1)

| time | beat | what happens |
|---|---|---|
| 0:00-0:10 | Beat 1, The Counter | At 0:01 Management says line A1 (first joke, zero input). At 0:03 Brenda stamps a blank form "REJECTED (PRE-EMPTIVE)" in the diorama on her own. Management A2 and A3 follow. Placeholder cycles. |
| 0:10-0:45 | Beat 2, First Rejection | Player types anything, ceremony plays, the first reason is always the mild one ("insufficiently blue") unless a special trigger fires. ESCALATE appears with a small orchestral sting (`api.sfx('tada')` quiet is fine, or `bell`). |
| 0:45-1:30 | Beat 3, Ladder Reveal | First escalate: dolly-zoom, ladder appears. Desmond, the three desks. Sandra's counter first appears (first citation). Satisfaction Index first appears at 7 1/2. |
| 1:30-2:30 | Beat 4, The Queue | Take-a-number. Let people go ahead (medal at 3). Brenda's sandwich first changes around here. |
| 2:30-3:30 | Beat 5, Contrition | The apology that rewrites itself. Rejected for being substantially similar. |
| 3:30-4:30 | Beat 6, Intern | The intern asks YOU. The kindest rejection. Toaster cameo if triggered. Rejections start quoting earlier cases (quote-back tier B). |
| 4:30-5:30 | Beat 7, Committee and Gerald | Chairs fill with recusing objects. Gerald (screen goes sepia). |
| 5:30-6:45 | Beat 8, Mirror and Vane | Nested frames; the vane rules by your mouse. |
| 6:45-8:00 | Beat 9, Stapler, Hat, Tuesday | Metaphysical rejections; the Hat references Dennis; the lights flicker once and everyone freezes for exactly one second. |
| 8:00-9:30 | Beat 10, The Rock | Hush. Background ambience falls silent (no sfx). 7.5-second countdown. The Rock has heard you. A smaller rock stamps REJECTED. Both rocks look away. |
| 9:30-10:00 | Beat 11, Strangely Touching and Reset | The Rock refers you to Brenda ("Acting Rock"). Brenda's one unscripted line. Certificate. "Next." Reset to the counter. A small rock is on the counter. |

## 6. Core flow details

### 6.1 INTAKE [MUST]

- Card styled as a carbon-copy form with a faux perforated left edge, header **FORM C-1 (COMPLAINT, GENERAL, NOT SPECIFIC)**, a `Grievance No. 000001` line (zero padded 6 digits; suffix `/R{lap}` from lap 2, e.g. `000014/R2`), a handwritten margin note from Brenda (italic, rotated -2deg, rotates per case from list 16.2), a real `<textarea maxlength="200" rows="4">`, a live ticker, and a big `SUBMIT FOR PROCESSING` button.
- Placeholder cycles every 6s through the placeholders in 16.2.
- **Ticker** ("Word Count Under Review"): shows the characters as "Sentiments", with 2 deducted per exclamation mark, and rotates its unit every 3s through: `N words`, `N characters`, `N.N grievances` (chars/40, one decimal), `N Sentiments (minus X for exclamation marks)`, `N.N sighs` (chars/25). Never show negative numbers.
- **Empty submission is allowed**: it enters the Void Pool (reasons 16.5, "empty" bank), the ceremony runs 6s instead of ~3.5s (an extra stamp), and awards 1 Meh instead of 0.5. A text of only whitespace counts as empty.
- Record for the matcher: `firstInputAt` (first `input` event after the form was shown or last cleared), `submittedAt`, plus whether the text arrived as a single large paste (an `input` event that added >10 chars at once counts as "instant", as if fast).
- Idle timer for the secrets (section 10) runs only in INTAKE.
- Submitting also pushes a timestamp to the spam window (section 10).

### 6.2 CEREMONY [MUST] (about 3.5s; 6s empty; 0.6s under `api.selftest`)

Stage shows a conveyor strip (repeating-linear-gradient belt, manila folder emoji sliding) and a progress bar. Sequence, with the stage captions and Management commentary from 16.3:

1. t=0: complaint slides into the tube (whoosh), a clerk hand (`🤚` in a sleeve, CSS) picks it up. Caption 1.
2. Classification: a one-line slot reel shows a Category and Subcategory pair cycling, lands on one (16.3).
3. Three ceremonial stamps hit in sequence (`api.sfx('stamp')` each, 2px shake on the module root using transform, 120ms).
4. Progress bar fills at deliberately wrong speeds, **stalls at 99%, then jumps to 41%**. Fake stage label cycles ("Verifying the verifier...", etc.).
5. The rejection slip prints.
- **Skip**: Space or click on the strip skips to step 5. A "Skipped Ceremony Surcharge" note appears: Management 16.3 skip line. Awards 0 (display "0 Meh").
- **Expedite**: any other key or click during the ceremony adds an "Expedite Fee: 1 paper clip, deducted from nothing." note only (no extra stage; keep it cheap).
- Reduced motion: bar fills linearly, stamps become opacity fades, no shake.

### 6.3 The slip [MUST]

A thermal receipt card (monospace, jagged top and bottom edges, prints with a `clip-path: inset(0 0 100% 0) -> inset(0)` steps animation, 0.8s). Fixed sections (each slip assembles these, in order, as separate lines in the slip body):

1. **Stamp** variant graphic: `REJECTED` (default), `REJECTED (AGAIN)` (reason repeat or lap >=2), `REJECTED (WITH LOVE)` (intern, shredder, or Brenda's apology slip), `DECLINED, WARMLY` (rungs 5-7), `NOPE (OFFICIAL)` (rung 9+), `REJECTED (PRE-EMPTIVE)` (diorama only), `ACCEPTED (UNOFFICIALLY)` (idle secret), `APPROVED` (rare acceptance), `ACCEPTED IN ERROR (ERROR ACCEPTED)`. Stamp color is stamp red except rung 2's blue ink (stamp blue `#2b4fb3`, "insufficiently blue" joke) and the acceptance green.
2. **Greeting** (who rejected you): e.g. `Brenda, Window 4:` (16.4, `greet[rungId]`).
3. **Primary reason**: rungs 1-4 take it from the matcher (6.4). Rungs 5-13 take a hand-written ruling from the rung (section 7).
4. **Quote-back / clause line** (6.6): always present on rungs 1-12, absent at the Rock (the Rock quotes nothing).
5. **Remedy** (16.6 remedy bank): on rungs 1-4 always; on later rungs 40% of the time.
6. **Sign-off** (shrinks, Gag 4): see 8.4.
7. **Footer**: `Rejected for reason N of N+1.` (Gag 1, 8.1).
8. **Controls**: a small `Amend complaint` textarea (collapsed `<details>`, prefilled with the current text; edits are used by the next rung's matcher), the ESCALATE button, FILE ANOTHER, the decoy button, the survey stars.

On print: `api.sfx('stamp')`, 2px shake, `api.award(0.5)` ("Rejection Participation Payment"; 1 for empty, 0 if the slip is a Rush Hour duplicate), stat updates, add to Case File and Paper Trail, Management slip line (16.3 bag, about every 2nd slip).

### 6.4 The reason matcher [MUST]

Pure function `analyze(text, ctx)` returns a feature object. `pickReason(features, ctx)` chooses a line. All banks are served by shuffle bags (`bag(arr)` returns a function that deals each element once in a shuffled order, then reshuffles) so a line never repeats until its bank is exhausted. Lines are never served twice in a row across banks.

**Features** (compute lazily from `t = text.trim()`, `lower = t.toLowerCase()`):

| key | detection |
|---|---|
| `empty` | `t.length === 0` |
| `tiny` | `1 <= t.length <= 3` |
| `short` | exactly one word (and length > 3) |
| `long` | `t.length >= 170` |
| `caps` | at least 4 letters and >= 60% of letters uppercase |
| `lower` | length >= 8 and no uppercase letters |
| `bang` | contains `!` |
| `question` | contains `?` |
| `interrobang` | contains both `?` and `!` |
| `please` | `/\bplease\b/` |
| `digits` | contains a digit; `%NUM` = first number run; `bignum` if that number > 100 |
| `emoji` | `/\p{Extended_Pictographic}/u` (guard in try/catch, fallback: any char code > 0x2000 outside basic punctuation) |
| `name` | a capitalized word that is not the first word and not "I"; `%NAME` = that word |
| `food` | any of: toast bread cheese pizza soup pasta sandwich coffee tea cake soup egg eggs rice pie salad lunch dinner breakfast; `%FOOD` = the word |
| `mgmt` | `management` |
| `rock` | `\brock\b` |
| `complaintWord` | `complaint` |
| `meta` | contains any of: `department`, `reject`, `rejected`, `rejection`, `stamp`, `ladder`, `this game`, `complaint department` |
| `sandra` | `sandra` (special: 9, Secret 6) |
| `toast` | `toast` or `toaster` |
| `sock` | `\bsock` |
| `plant` | `\bplant` or `dennis` |
| `stapler` | `stapler` or `staple` |
| `gerald` | `gerald` or `potato` or `spud` |
| `tuesday` | `tuesday` |
| `brenda` | `brenda` |
| `refund` | `refund` |
| `manager` | `manager` (not the exact special phrase) |
| `broken` | `broken` or `broke` |
| `wait` | `wait` or `slow` or `queue` |
| `late` | `\blate\b` |
| `cold` | `\bcold\b` |
| `rude` | `rude` |
| `hate` | `hate` |
| `noise` | `noise` or `loud` |
| `weather` | `weather` or `rain` |
| `meeting` | `meeting` |
| `obvious` | one of ridiculous unacceptable terrible awful worst outrageous disgraceful; the word becomes the clause quote |
| `iStart` | first word is `I` or `I'm` or `I've` |
| `haiku` | exactly 3 non-empty lines |
| `repeatLetters` | a letter repeated 3+ times in a row |
| `ecount` | count of letter e >= 12; `%ECOUNT` |
| `repeat` | normalized text equals the previous complaint's text (case file) |
| `echo` | text contains `rejected.` or starts with `rejected` or shares a 6-word run with the last reason |
| `fast` | `submittedAt - firstInputAt < 2000` or the text was an instant paste |
| `slow` | `submittedAt - firstInputAt > 90000` |
| `numerology` (always available) | `%WORDS` count: prime, even or odd variants |
| `firstLetter` (always) | `%FIRST` first letter of text, uppercase |
| `finalPunct` (always) | ends with `.` -> fullstop line; no terminal `.!?` -> no-fullstop line |
| `clock` (always) | `%TIME` local `HH:MM` from `new Date()` (allowed; display only) |
| `longestWord` (always) | longest word, `%LONGEST` |
| `chars` (always) | `%CHARS` |

**Selection order** (first match whose bank still has a not-recently-used line and whose key is not the same as the previous slip's key):

0. **Specials** (not reasons, they run whole scenes): exact text `rock` (case-insensitive, trimmed) at pos < 13 -> Secret 3 acceptance. Exact `I want to speak to the manager` (any casing, trailing punctuation ignored) -> Secret 8 (The Manager). Word `sandra` -> Secret 6. Rare acceptance (1 in 200, or exactly the 100th complaint) -> Secret 3. Special checks run BEFORE the ceremony so the ceremony can be replaced.
1. The first slip of the whole save (`filed === 1` and no special): forced to the mild line `Rejected. Submitted in ink that is, per the stamp pad, insufficiently blue.`
2. Keyword features in this priority: `echo, repeat, meta, empty, mgmt, rock, toast, sock, gerald, plant, stapler, tuesday, brenda, refund, manager, interrobang, caps, bang, question, please, digits(bignum first), emoji, tiny, short, long, fast, slow, obvious, name, food, broken, wait, late, cold, rude, hate, noise, weather, meeting, iStart, haiku, repeatLetters, ecount, complaintWord, lower`.
3. If nothing from step 2 is available: 50% a line from a random "always" feature (numerology, firstLetter, finalPunct, clock, longestWord, chars), 50% a line from the generic bag (16.5.1 `G`, 36 lines in 12 defect types).
4. When the generic bag is exhausted it reshuffles and every line is served with the prefix swapped: `Rejected.` becomes `Rejected, again, for a reason you have previously been given and which is still good.` and so on. Implement as `line.replace(/^Rejected\. /, 'Rejected, again. As before: ')`.
5. Track every distinct reason line served in `S.reasonsSeen` (a Set, saved by index). The Binder shows `Reasons Collected X of Y` where Y = total distinct reason strings across all banks + 1. When X reaches Y-1, the next slip is the final reason `Collecting reasons is not a valid grievance.` and the achievement `complaints-dept.reasons25` is separate (25 distinct).

**Meta complaints** (`meta` feature): maintain `S.metaDepth` (persists per session, reset on lap end). Each meta slip increments it and serves reason `metaDepth` from bank `meta` (16.5.2, seven lines, the 7th and later repeat the last). Render a breadcrumb under the slip: `Departments > Complaints about > Complaints about Complaints > ...`; each depth adds one `> Complaints about` hop up to depth 5; depth 6 and up shows `Departments > ... > Ground Floor (the floor above the floor above)`. At depth 7 award the achievement `complaints-dept.meta7` and Management says the loan-from-the-future line. Stat `complaints-dept.metaComplaints`.

### 6.5 Clause generator (Sandra, Gag 1) [MUST]

`S.sandra` counts every clause cited (one per slip; none for acceptance slips). Citation text by count, showing in the clause line and the Sandra counter widget `Sandra Has Cited: N`:

| count | `%CLAUSE` |
|---|---|
| 1 | `Clause 14(c)` |
| 2 | `Clause 3, which requires complaints to be both filed and unfiled` |
| 3 | `Clause 14(c)(ii)` |
| 4-6 | `Clause 14(c)(ii)(a)` |
| 7-9 | `Clause 14(c)(ii)(a)(iv) bis` |
| 10 | `Clause 14(c)(ii)(a)(iv) bis, which is the opposite of Clause 3. Both clauses are in force` (Management then says G7) |
| 11-24 | `Clause 14(c)(ii)(a)(iv) bis, as amended Tuesday` |
| 25 | `Clause 14(c)(ii)(a)(iv) bis, as amended Tuesday, which cites %PLAYER by name` (achievement `complaints-dept.sandra25`, award 5) |
| 26+ | `Clause 14(c)(ii)(a)(iv) bis, as amended Tuesday, as it applies to %PLAYER, who has been cited so often it is now a clause` |

`%CTITLE` is dealt from a bag of clause titles (16.7). At the Rock the only clause is `Clause 1. Clause 1 says: 'Clause 1.'` and the counter still ticks.

### 6.6 Quote-back (Gag 3) [MUST]

`extractQuote(text, features)` returns a 2-5 word fragment of the player's text, no leading/trailing punctuation, max 40 chars (truncate with no ellipsis). Prefer the window around the matched keyword if there is one; else a random window of 3 words; for a one-word text use that word; for empty text there is no quote. `%QQ` is the fragment wrapped in straight double quotes. Store each slip's quote in the Case File card.

The clause line template escalates with `S.sandra` and Case File size (all use the current `%CLAUSE`, `%CTITLE`):

- **Tier A** (sandra 1-4): `Your phrase %QQ falls under %CLAUSE, %CTITLE.`
- **Tier B** (5-9 and at least 3 case file entries): `As you stated on Case %OLDCASE, %OLDQQ. This is relevant under %CLAUSE, %CTITLE, and so is the fact that you stated it.`
- **Tier C** (10-17): `The Department previously stated, %OLDREASON This has not changed. It has been stamped again for emphasis. See %CLAUSE.` (`%OLDREASON` = an old reason with the leading "Rejected." removed, cut to 90 chars, wrapped in double quotes)
- **Tier D** (18+): `On Case %OLDCASE the Department quoted you saying %OLDQQ. You have now said %QQ. That is a quote of a quote under %CLAUSE, %CTITLE.`
- Empty complaint (any tier): `Your complaint, quoted in full, reads: "". The Department found it clear. See %CLAUSE.`
- If there is no suitable old case yet, fall back to Tier A.
- The Rock quotes nothing and simply holds the paper.

### 6.7 Case File [SHOULD]

Ring buffer `S.cases` (cap 40) of `{no, rung, text(<=200), reason(<=160), quote}`. Drawer button `🗂️ Case File (N)` toggles a max-height transition list, newest first, each an index card showing case number, rung name, quote. Callbacks (tier B-D above) read from here.

### 6.8 Meter: Satisfaction Index [SHOULD]

A vertical thermometer (`div` with gradient fill, height from a CSS variable). `S.index` starts at 7.5, displayed as `7 1/2` when within 0.05 of 7.5 else one decimal. Every slip it moves **in the wrong direction**: it goes UP by a random 0.1-0.4 on a rejection (so higher = more rejected, labeled as satisfaction anyway) and DOWN by 0.3 on a "rung's whim" acceptance (Moist deferral, Brenda's draft, acceptance). After a survey rating `n`, `S.index += (7.5 - S.index) * 0.5` (converges toward 7 1/2 regardless of the rating; the message says it was averaged). The unit label changes each lap: lap 1 `degrees of Satisfaction`, 2 `Satisfactions per Hour`, 3 `Sats`, 4 `Smiles`, 5 `Gerald`, then cycling `Tuesdays`, `Brendas`, `Meh-adjacent units`. On lap 5 completion, see the not-ending (14.4): index settles at exactly 0 and a plaque appears. [COULD: a 120x30 canvas sparkline of the last 20 values with a dashed line at 7.5.]

### 6.9 Survey [SHOULD]

After each slip prints, a one-line `How satisfied were you with this rejection?` with five star buttons (`★`). Clicking star `n` (or key `n`): `api.award(0.1)`, `api.stat.inc('complaints-dept.surveys')`, response line from 16.8, stars lock. ESCALATE or FILE ANOTHER without rating: line `We have chosen 3 for you.` shown once in the next slip's body (small text), no award.

### 6.10 Awards and stats table [MUST]

| event | award | stats |
|---|---|---|
| rejection received | 0.5 ("+0.5 Meh (rounded up to 0.5)" printed by Management on every 5th) | `filed`, `rejected`, `stamps` |
| empty complaint | 1 | same plus `emptyFiled` |
| rung climbed (escalate) | 1 | `rungs`; `api.stat.max('complaints-dept.maxRung', pos+1)` |
| lap completed | 5 | `laps` |
| decoy chased (each dodge) | 0.1 | `decoy` |
| survey star | 0.1 | `surveys` |
| first Rock audience ever | 25 | `rock`, flag `complaints-dept.rockMet` |
| later Rock audiences | 5 | `rock` |
| Let a person go ahead | 0.1 | `letAhead` |
| Moist deferral | 1 | `moist` |
| Skipped ceremony | 0 | none |
| Rush Hour Surcharge | -0.5 (engine clamps at 0) | `surcharge` |
| shortest/longest complaint | none | `shortestComplaint` (set when smaller, ignoring empty), `longestComplaint` (`api.stat.max`) |
| meta complaint | 0.5 extra | `metaComplaints` |
| Brenda's sandwich half | 1 | `brendaSandwiches` (also inc'd on every bell tap that names a sandwich) |
| withdrawn to the shredder | 0.1 | `withdrawn`, `shredded` for bulk |
| Sandra cited | none | `sandraCitations` |

Secret awards are in section 9. Never award more than 50 Meh in one event.

### 6.11 Persistence [MUST]

`api.save.set('v', { highestRung, filed, reasons: [indexes], firstComplaint, laps, sockSeen, rockMet, brendaHalf, decoyStage })` after each slip and rung, wrapped in a try/catch helper. `firstComplaint` (the very first non-empty complaint ever filed on this save, cut to 120 chars) is what the Rock reads back. If no `firstComplaint` exists (all empty so far), the Rock reads back the placeholder text `I would like to complain about...`.

### 6.12 Withdraw to the shredder (Escape) [SHOULD]

Escape during SLIP, RUNG, CEREMONY (not ROCK countdown, not ACCEPT overlay): the stage drops through a trap door at the bottom (CSS translateY + clip) into the shredder, tiny confetti (`api.confetti`, 8 pieces), `api.award(0.1)`, `api.stat.inc('complaints-dept.withdrawn')`, Management line 16.3 "withdraw", the case is filed under `Withdrawn With Love` (a card in the Case File with that rung name), and the module returns to INTAKE at rung 1 with the lap unchanged.

## 7. THE LADDER, rung by rung [MUST unless noted]

Each rung section gives: arrival line (spoken with `api.say`, `who` set), the interaction (exact), the ruling lines (hand-written for rungs 5+; rungs 1-4 use the matcher), the stamp variant and anything special. All rungs: Management also speaks the slip line occasionally, never both a rung line and a Management line within 2.5s of each other.

### Rung 1: Intake Clerk Brenda, Window 4 (the counter)

- Diorama: Window 4 is a CSS crayon drawing of a window (wobbly border via irregular `border-radius`, mustard counter). Brenda `🧑‍💼` in a booth behind a translucent glass pane with a reflection gradient, a blinking eyelid div (CSS keyframe, 4s), a 🥪 on the counter, a 🔔 bell button, a stamp arm.
- At t=3s with zero input Brenda stamps a blank form on the diorama: `REJECTED (PRE-EMPTIVE)` (CSS animation, stamp sfx, small shake). This is the "joke before you do anything clever".
- **Window 4 detail growth** by `S.windowUses` (persistent; +1 per rejection at rung 1): uses 3: curtain; 6: a tiny cat `🐈`; 10: a smaller drawing of Window 4 inside Window 4; 15: the sign line 7.1.w15 and a window complaint rejected. Each growth: Management speaks the matching line (7.1).
- **Bell**: click gives a rotating response. Every 4th slip Brenda's sandwich changes to the next in 7.1's list. After lap 4, at the start of each lap she offers half (7.1 offer). Accept: `It's just bread.`, chime (`api.sfx('bell')`), +1 Meh, stat `brendaSandwiches`, achievement `complaints-dept.halfsandwich`.
- Rejection: the matcher (6.4). Greeting `Brenda, Window 4:`.

Lines 7.1 (verbatim):
- Arrival/greeting: `Window 4. Please hold the form level.`
- Sandwich cycle (each sandwich appears the 1st time at the shown count of slips and thereafter cycles): `Brenda's sandwich is ham. She would like the Department to know the ham has been in the fridge since Q2. She is not scared. She is committed.` / `Brenda's sandwich is egg salad. The egg salad has opinions. Brenda has asked it to keep them to itself.` / `Brenda's sandwich is cheese. It has a history. She has not read the history. She respects it.` / `Brenda's sandwich is a wrap. She insists it is a sandwich. Nobody has asked.` / `Brenda's sandwich is two slices of bread being supportive.` / `Brenda's sandwich is tuna, with ambitions.` / `Brenda's sandwich is jam, and only jam, with dignity.` / `Brenda's sandwich is a sandwich she cannot identify. She is eating it anyway. It is going well.`
- Bell responses (bag): `Brenda: 'The bell is for emergencies. This is not an emergency. This is, however, a bell.'` / `Brenda: 'Window 4. Please take a number.' You have no number. 'Then take this one. It is 7 1/2. Nobody wanted it.'` / `Brenda: 'Ding. I heard it. I hear everything. I act on some of it.'` / `Brenda: 'If you ring it again I will have to file the bell.'`
- Window growth: `Window 4 now has a curtain. It was drawn on. It is also drawn.` / `Window 4 now has a tiny cat. The cat is also a drawing and has no comment.` / `Window 4 now contains a smaller drawing of Window 4. That window has a smaller Brenda. She is also eating.` / w15: `We have been informed that Window 4 is 'not a window'. The Department disagrees and has filed a window complaint.` then slip: `Rejected. The window complaint has been rejected. It is a drawing of a complaint, and also of a window.`
- Offer (lap 4+): `Brenda offers you half her sandwich. It is a gesture. It is also half.` Buttons `Accept half` / `Decline`. Accept: `It's just bread.` Decline: `Brenda nods. She has been declined by better.`
- Acting titles: lap 2 `Brenda, Acting Rock`; lap 3 `Brenda, Acting Acting Rock`; lap 4 `Brenda, Acting Acting Acting Rock`; each further lap adds one more `Acting`. Shown on the nameplate in the diorama.

### Rung 2: Senior Intake Clerk Desmond (Beat 3, the Ladder Reveal)

- On first ever escalation per mount: the building dolly-zoom plays.
- Screen: Desmond (🧑‍💼 with a lanyard, wearing a lanyard drawn as a CSS line) behind THREE IDENTICAL DESKS, three big buttons `Desk A`, `Desk B`, `Desk A (2)`. Keys 1-3. Click any (all wrong). Also show a decorative Grievance Gauge (an SVG needle that wobbles around "wrong amount of aggrieved").
- Rejection primary reason = matcher (first rung where the clause line becomes a running gag). Stamp blue ink.
- Arrival: `Senior Intake Clerk Desmond. I am Senior. I am also Intake. I am mostly Clerk.`
- Per desk (first sentence of the slip body, then the matcher reason): `Desk A is the wrong desk by a margin of 11 cm.` / `Desk B is the wrong desk by a margin of 4 1/2 inches.` / `Desk A (2) is the wrong desk by exactly one desk.`
- Then: `Desmond has reviewed your complaint for 11 seconds, which he describes as a personal best.` and `Desmond rejects you for being the wrong amount of aggrieved. Please be 14 percent more aggrieved and resubmit during Lent.` (deal these two as the slip greeting / sign-off flavor in order).
- Satisfaction Index first appears here at 7 1/2 and Management says: `The Satisfaction Index has appeared. It was always at 7 1/2. It has simply not been introduced.`

### Rung 3: Supervising Senior Intake Clerk (Beat 4, the Queue)

- Screen: a ticket dispenser button `Take a ticket`. Clicking prints a ticket `YOUR NUMBER: 7 1/2` (always 7 1/2). A board `NOW SERVING: 7 1/2`. A queue of 5 emoji people (`🧍` `🧑‍🦳` `🧑‍🍳` `🧑‍🎓` `🧑‍🔧`) each with a small button `Let them go ahead`; each use removes that person with a little slide and delays your call by 1.2s (hidden `letAhead` counter, stat `complaints-dept.letAhead`, +0.1 Meh). Your number is called after 6 seconds of waiting (selftest 1.5s) plus delays, or immediately if you press `Wait` (a button). Cap total wait at 14s.
- Letting 3 ahead: toast and Management line: `Customer Courtesy Medal (Not A Medal) awarded. It is a sticker of a medal. The sticker is also on break.` and achievement `complaints-dept.queue` (award 2).
- Board ticker lines (cycled when waiting): `NOW SERVING: 7 1/2.` / `NOW SERVING: 7 1/2.` / `NOW SERVING: still 7 1/2.`
- Lines: arrival `Supervising Senior Intake Clerk. Please take a number. Please then take another.` Take: `You are number 7 1/2 in the queue. This is an honor, and also a fraction.` Called: `Your number has been called. The number was 7 1/2. You are 7 1/2. You may now be rejected.` Go-ahead lines (bag): `Person %N went ahead of you. They did not say thank you. They did not need to. They did.` / `Person %N went ahead. You have been moved back by exactly one person's worth of dignity.` / `Person %N went ahead and has already been rejected. They were very grateful about it.` / `Person %N went ahead. The Department notes your courtesy. The Department will use it against you.`
- Greeting/flavor: `The Supervising Senior Intake Clerk apologizes on behalf of the Senior Intake Clerk. The Senior Intake Clerk does not apologize back.`
- Primary reason: matcher.

### Rung 4: Assistant to the Regional Assistant (Beat 5, the Typing Test of Contrition)

- Screen: a prompt `Please retype the following apology to the complaint (not the complainant):` then a target sentence in a bordered box `I am sorry to the complaint, which has done nothing wrong.` and a single-line `<input>`. A timer bar labeled `Time Remaining: (varies)`.
- **Every `input` event the target sentence changes by exactly one word** (replace word at index `i % words`, `i` increments, from the word table below). The timer limit starts at 9s (selftest 3s) and gets +1s or -1s (random, clamped to 5-12s) on every keystroke so it visibly shifts. The player can never finish. When the timer ends, whatever was typed is "accepted as substantially similar". If the input is empty at the end, the slip says the apology was accepted as substantially similar to nothing.
- Word replacement table (cycle in order, replacing the word at that index): `sorry->regretful`, `complaint->grievance`, `nothing->very little`, `wrong->incorrect`, `which->that`, `apology->sentiment`, `am->remain`, `to->toward`.
- Lines: arrival `I am the Assistant to the Regional Assistant. The Regional Assistant is on holiday, and I am on his holiday.` Result: `Your apology has been accepted as substantially similar, and rejected for being substantially similar.` / `The Department has a quota of similarity and you are now over it.` / `The Assistant says: 'I am acting on behalf of someone who is on holiday. It is a very good holiday. I have been told.'`
- Primary reason: matcher. Stat bump `complaints-dept.contrition`.

### Rung 5: Gerald's Nephew, the Intern (Beat 6)

- The tables turn: the Intern is unsure and asks YOU. Three buttons `Reject`, `Reject`, `Reject` styled in three different font families (`Georgia, serif`; `ui-monospace, monospace`; `cursive`). Keys 1-3. Whatever is picked, he nods gravely.
- Lines: arrival `Hi. I am Gerald's nephew. I am an intern. I have a question and it is about you.` After choice: `Right. That is what I would have said.` Whisper: `Gerald's nephew whispers: 'Please do not tell my uncle I asked a person.'`
- Rulings (primary, bag): `Rejected, but I want you to know I read all of it. And I felt it in my lanyard.` / `Rejected. I did read it twice. The second time was for me.` / `Rejected. This is the kindest rejection the Department offers, and I am the only one authorized to offer it, and I am not authorized.`
- Stamp `REJECTED (WITH LOVE)`.
- **Toaster cameo** [SHOULD]: if the complaint matches `toast`, OR `api.stat.get('toaster.toasts') > 0`, OR `api.stat.get('toaster.slices') > 0` (each read in try/catch; missing stats read as 0), a slip slides under the door. Show a toast-shaped card: `Re: complaint. Toast. (Warm.)` The Department treats it as an official ruling of Toast. Greeting becomes: `The Toaster has replied: 'Warm. Complaint. Noted. Crisp.'` The ruling: `Rejected. You are insufficiently toasted.` `api.sfx('sad')`. Stat `complaints-dept.toasterSlips`.
- Quote-back tier B starts being available here.

### Rung 6: The Committee of One (Beat 7)

- Screen: a long SVG oval table with 12 chair buttons around it (circles). Chair 1 is occupied by the Committee (🧑‍💼 gavel). Chairs 2-12 empty. A gavel-dial text: `Votes: 1 against, 0 abstaining` -> `0 against, 1 abstaining` -> `The Committee has recused itself.` (a text row that updates on timers, 2s each).
- Clicking an empty chair (or keys 1-9, plus buttons) invites an object, in this order of emoji: `🪴` `🕰️` `👻` `📊` `🧦` `🍞` `☂️` `📎` `🪑`. Each recuses immediately (pop sfx, the emoji fades). After 5 invited the committee `achieves quorum` and rejects for exceeding quorum. Hard cap: if nothing is clicked for 20s, auto-resolve.
- **Resize secret**: when the root is compact (<500px wide), chair 12 is disabled and labeled `Chair 12 is in the bathroom.` with the line `Chair 12 is in the bathroom. The Committee has noted this and kept going.`
- Lines: arrival `The Committee of One will now come to order. The Committee is in order. The Committee is disorder-adjacent.` Per invite (by emoji): plant `The plant has been invited. The plant recuses itself. The plant is, however, thriving.` / clock `The clock has been invited. The clock recuses itself at 4:17, which it states is correct.` / ghost `The ghost has been invited. The ghost recuses itself and passes through the motion.` / spreadsheet `The spreadsheet has been invited. The spreadsheet recuses itself and sends a second spreadsheet.` / sock `The sock has been invited. The sock recuses itself. It has not been seen since, and is presumed on a journey.` / bread `The slice of bread has been invited. It recuses itself warmly.` / umbrella `The umbrella has been invited. It recuses itself, and then, out of principle, opens.` / paperclip `The paper clip has been invited. It is holding things together and cannot attend.` / chair `The chair has been invited. It is a chair. It has declined to sit in itself.`
- Rulings (primary, bag): `The Committee has achieved quorum and, as a result, must reject for exceeding quorum.` / `The Committee of One has voted. The Committee of One abstained from himself. Motion tabled; the table is also on break.` / `The Committee recuses itself. The vote is therefore unanimous, and nobody is happy.`
- Stamp `DECLINED, WARMLY`.

### Rung 7: Gerald, Vice President of Spuds (the sepia rung)

- The whole module gets a sepia filter + vignette (`filter: sepia(.7)` on `.m-complaints-dept-stage`, CSS only). The "music drops": call no sfx on this rung and Management stays quiet for 3s after arrival.
- Gerald (🥔 with a tiny CSS monocle) speaks. If `api.flag.get('metGerald')` is true he says the callback; else he says the introduction line and `api.flag.set('metGerald', true)`. Either way sets the flag and achieves `complaints-dept.gerald` (award 3).
- Screen: the player's complaint (their actual text, or `(blank)` if empty) is displayed in a framed card and Gerald "reads it aloud": a line-by-line typewriter of `%QQ` fragments from the complaint (use the quote and the full text split on punctuation, max 3 lines) in 1.2s each, then the ruling. One button appears at the end: `Nod gravely` (key 1) which finishes the rung. Auto-resolve after 20s still applies.
- Lines: first time `Gerald, Vice President of Spuds, regrets to inform you that he is a potato. Do not tell the others I came down from the vegetable drawer.` Met before: `We have met. I do not recall it. That is what makes it a meeting.` And one wrong detail (bag): `You were taller.` / `You had a hat. I remember the hat. You did not have a hat.` / `You were a Thursday, I believe.` Reading line after the complaint: `Every grievance, he says, is a potato that has not yet been mashed.` Rulings (bag): `Your complaint is sound. Sound travels poorly through mashed forms.` / `Rejected for insufficient starch.` / `I am sorry. I am sorry that I am sorry. That second sorry was starchy.` Closing apology worse: `Gerald apologizes. The apology is somehow worse. It is warm and it has eyes.`
- Stamp `DECLINED, WARMLY`. Quote-back clause line is still present.

### Rung 7 1/2 (lap 2 insertion): The Complaints Department's Own Complaints Department

- Screen: a tiny second form with a one-line `<input>` labelled `Complain about the Complaints Department` and a button `FILE COMPLAINT ABOUT THIS COMPLAINT`. Clicking (empty ok) triggers the nested-folder breadcrumb (meta depth +1) and the ruling.
- Arrival: `Rung 7 1/2. The building has quietly added a rung. It was not there. It was always there. Both are in force.`
- Ruling: `Rejected. A complaint about the complaint process must be filed with itself. It has been. It is pending, with itself.` / `Both complaints have been forwarded to each other. They have not been introduced.` / `The Complaints Department's Own Complaints Department has reviewed the Complaints Department. It would like to be left alone with its feelings.`

### Rung 8: A Mirror Facing a Mirror (Beat 8)

- Screen: the complaint shown in a bordered frame inside a frame inside a frame; nested divs with a CSS custom property `--d` per level (`transform: scale(.8)`, `opacity: calc(1 - var(--d) * .1)`), rendered progressively: depth 1 on arrival, +1 level per click on the INNERMOST frame (a real `<button>` the whole frame area), 8 levels maximum. Each click zooms in (the viewport frame scales) and reveals a different line. DOM cap: at most 8 nested frames; only the innermost is a button (others `pointer-events:none`). Auto-resolve at 20s.
- Lines by depth: 1 `Rejected by me, who is also you.` / 2 `Rejected by me, who is also you, who is also the reason.` / 3 `Rejected by the reflection of the reflection of the rejection.` / 4 `The Mirror has been recursive since 1998. It is considered a manager.` / 5 `The Mirror considers your complaint. The Mirror considers the Mirror considering your complaint.` / 6 `At this depth the complaint is the size of a thought and has the same legal standing.` / 7 `Almost there. There is no there. There is almost.` / 8 (bottom, a tiny clerk `🧑‍💼` holding a tiny complaint) `Hm.`
- Arrival: `The Mirror will see you now. The Mirror has seen you. The Mirror will see you now again.`
- The Mirror's final slip: primary reason = line for depth reached (bottom for 8; if the rung auto-resolved at depth d use line d). Stamp `NOPE (OFFICIAL)`. Callback: `Hm.` is the same word the Rock files on lap 5.

### Rung 9: The Complaints Appeals Weather Vane (Beat 8)

- Screen: an SVG arrow on a post inside a "wind zone" box. Spin: `pointermove` inside the box adds `|dx|+|dy|` to a wind budget (capped) and rotates the vane; arrow keys (Left/Right) rotate it too, and there are two buttons `Blow left` / `Blow right` for touch and keyboard; dragging in a circle works on touch because pointermove while pointer is down adds the same budget. The arrow uses `transition: transform 600ms cubic-bezier(.34,1.56,.64,1)` for the spring overshoot.
- Once the wind budget passes 400 units (selftest 40) the vane starts settling; it settles 2s later on a direction. Also settle on a timer 14s (selftest 3s) after arrival regardless. Direction: `N` / `NE` / `E` / `Pending` weighted 24/24/24/24 and **`Moist` at 4% (and always on the 13th, 26th... visit of this rung)**; `Moist` is the only ruling that is not a rejection.
- Lines: arrival `The Weather Vane rules by wind. The wind is you. Please be consistent.` Rulings: N `The vane points North. North is rejected. North has been informed.` / NE `The vane points North-East. The Department rejects North-East on behalf of both of its halves.` / E `The vane points East. East is where the Department was before it moved.` / Pending `The vane reads Pending. The ruling is pending. It is also pending a ruling on pending.` / Moist `The Weather Vane has ruled: Moist. This is a Deferral to a Future Climate. It is not a rejection. It is a damp maybe.` Moist awards 1 Meh, no REJECTED stamp, a mint stamp `DEFERRED (MOIST)`, index goes down. Stat `moist`.
- Stamp `NOPE (OFFICIAL)` otherwise.

### Rung 10: The Stapler's Union Rep (Beat 9)

- Screen: a stylized mustard-brown rounded-rect SVG stapler with eyes, a list of demands (`3 breaks`, `a pay review`, `to be stapled to nothing, ever`), the complaint paper card, and a big button `Staple the complaint`. Each click adds a staple glyph to the paper (cap shown at 6) and plays a `pop`. A button `Submit stapled complaint` ends the rung (key 1). Auto-resolve at 20s.
- Lines: arrival `The Stapler's Union Rep will hear your complaint after the following demands: 3 breaks, a pay review, and to be stapled to nothing, ever.` Rulings by staple count: 0 `The Stapler's Union Rep rejects your complaint as under-stapled (0). It would like 2 staples, dental coverage, and a longer lunch.` / 1 `Under-stapled (1). The Union is moved. The Union is also still 1 staple short, which is a matter for the Union.` / 2 `Two staples. The Union notes this is the number it asked for. It rejects the complaint for being what it asked for.` / 3+ `Over-stapled. The complaint is now more staple than complaint. This is a union victory and also a rejection.` Prime gag line (shown at 7 staples): `The Union asks that prime numbers of staples be paid. Seven is prime. Seven is owed seven.`
- Stamp `NOPE (OFFICIAL)`.

### Rung 11: The Ombudsman Who Is Also a Hat (Beat 9)

- Screen: a coat stand with a 🎩 and a tiny `🪴` Dennis in the corner (clickable). Button `Put the hat on` (key 1). Once worn, the hat emoji follows the pointer inside the stage (a `position:absolute` span positioned by `pointermove` clamped to the stage; for keyboard/touch users it sits on a `🙂` avatar and is labeled "worn"). After 3s of wearing, the Hat rules.
- Dennis click (optional): `Dennis (Plant) has been consulted. Dennis (Plant) did not respond. This is the most professional response to date and the Department has taken notes.`
- Lines: arrival `The Ombudsman is a hat. The hat is on a coat stand. Please put the hat on.` Worn: `The Hat is on. The Hat has noted that you are the head. This is a career advancement for you.` Hat speaks in tips (bag, one per second of wearing): `For references see Dennis (Plant), the only employee who has never been the subject of a complaint, because he has never moved.` / `Tip: a hat is a ruling you can wear.` / `Tip: always keep your head level and your complaint covered.` Rulings (bag): `The Hat has ruled. The Hat does not answer to the head it is on.` / `The Hat has taken your complaint seriously. The Hat has also taken it to the hat rack. It will be reviewed.` / `The Ombudsman rejects you by being a hat. This is an honest answer and also a fashion.`
- Stamp `NOPE (OFFICIAL)`.

### Rung 12: Tuesday's Assistant (Beat 9, the Flicker)

- Screen: a yellow Post-it card `I cannot say the word. Please write the day after Monday.` A single-line `<input>` and `Submit` button. Whatever the player types is rejected "for being a day". After submit, the building shadow looms (a CSS dark gradient sweeping across the stage), **the lights flicker once** (stage opacity 1 -> .4 -> 1 in 400ms) and a wall clock reads `Tuesday (Approx.)`; **everything freezes for exactly 1 second** (all stage inputs `disabled` and Management quiet for 1s; selftest still 1s). Then the invite (below), then the slip.
- Calendar invite card (shown on this rung's slip, in the body): `Tuesday has declined to attend, but has marked you Tentative.` Attendees: `The Stapler: Required (accepted)` / `The Rock: Optional (no response, filed as a strong no)`. If `api.stat.get('shop.bought') > 0` Sandra adds a footnote: `Purchases are not complaints but they are not not complaints.`
- Lines: arrival `I am Tuesday's Assistant. I cannot say the word. I can say 'the day after Monday', which is not the word. Please write it.` Rulings: `Rejected. %ANSWER is a day.` / `Rejected. %ANSWER is not a day, which is also a defect. It would be a day if it tried.` / `Tuesday's Assistant cannot say the day. Tuesday's Assistant has written it on a Post-it and then eaten the Post-it.` (If the answer is empty use `nothing`; if the answer is long cut to 30 chars; sanitize `%ANSWER` against `%` characters.)
- Sets `api.stat.inc('complaints-dept.tuesdays')`.

### Rung 13: THE ROCK (Beat 10)

- The stage fades to a flat grey spotlight (radial-gradient), the building collapses to a single pebble marker (transform), ambient sfx is silent, Management stays silent for the whole countdown. Arrival (a whisper line, shown small in the stage, not via the loud bubble): `[Quiet.]`
- The Rock: an irregular blob div (`border-radius: 60% 40% 55% 45% / 50% 60% 40% 50%`), slate `#6f6a64` with radial-gradient shading, a soft shadow ellipse, no face (until Secret 4). A countdown of 7.5 seconds (`api.selftest`: 1s) with a rising-hum feel: `api.sfx('tick')` scheduled at decreasing intervals (1s, .8s, .6s, .45s, .3s, .2s, .15s...) and a text that reads only `The Rock is considering: %QQ` (here %QQ is the saved first complaint wrapped in double quotes). Skipping is impossible (this is the one thing nobody can skip). Escape does nothing here.
- Then: `The Rock has heard you.` (stage text). A smaller rock slides in, stamps `REJECTED` on the Rock's ruling (stamp sfx, shake), both rocks look away (rotate 25deg each, CSS). Then slip lines (hand-written): `The Rock has no further questions. The Rock never had any questions. That is why it is the Rock.` / `A smaller rock has stamped REJECTED on the Rock's ruling. Both rocks are looking away.` / `We have run out of reasons. We are using the ones we have.` Footer: `Rejected for reason N of N.` (n of n) and no sign-off (just the stamp). Clause line: `Clause 1. Clause 1 says: 'Clause 1.'` and no quote.
- Awards: first ever `api.award(25)` + line `The Rock has no budget but would like you to know it is tangible.` + grey-dot confetti (call `api.confetti` with a small n and then add nothing custom; or render ~20 grey dot spans that fade, then remove). Later visits 5. Achievement `complaints-dept.rock` (award 10). Flag `complaints-dept.rockMet`.
- **Secret 9 lives here** (7 clicks on the Rock; see section 9).
- After the slip, the ESCALATE button reads `ESCALATE (TO BRENDA)`. Pressing it: Management/Brenda lines 7.13 and then the CERT screen (14.1).
- Lines 7.13: `The Rock has referred you to Brenda. Brenda is now Acting Rock. Brenda does not feel acting is the right word.` and Brenda off the clock (lap 1 only; later laps use `Brenda: 'You know.'`): `Brenda: 'I only ever wanted somebody to complain about something I could fix.'` Then she stamps you REJECTED (WITH LOVE) with a visible small smile (the stamp variant plus a tiny `🙂` appears for one second on Brenda's face).

### Rung 14 (lap 3): A Bigger Rock / Rung 15 (lap 4): A Rock That Is Technically A Cloud

- Same handler as the Rock. Bigger Rock: the blob is 1.5x, countdown 10s (selftest 1s), line `This Rock is bigger. The Department has rated it 'technically more'.` Ruling: `The Bigger Rock has considered your complaint at greater length. Length was the only difference.`
- Cloud: a white-grey blob with a fuzzy edge (`filter: blur(1px)`), countdown 7.5s, lines `A Rock That Is Technically A Cloud. The Department checked. The Department is not sure what it checked.` Ruling: `The Cloud has considered your complaint. The Cloud has rained on it. This is a ruling.`
- No Floor 7 1/2 changes. They award 5 each (not 25), do not re-run the first-Rock achievement.

## 8. Running gags (cross-cutting)

### 8.1 Gag 1: Sandra's Clause Counter
Section 6.5. Visible counter. The 10th citation is the contradiction; the 25th cites the player; the Rock's Clause 1 pays it off. `Sandra Has Cited: N`. Callback line at citation 10: `Management: That is the opposite of Clause 3. Both clauses are in force.` At most once every 8 slips, Management adds Sandra's flag line: `Sandra has flagged this. Sandra has also unflagged this. Sandra has asked that we stop calling it a flag and start calling it a feeling.` And a 1-in-20 secret roll on any slip: a note on the slip in handwriting `Please do not stamp me. -S`.

### 8.2 Gag 2: The Decoy `ACCEPT REJECTION (NOT AVAILABLE)` button
A small outlined button on every slip. Its behavior depends on `S.decoyStage = min(4, floor(slipsPrinted / 4))` (persisted), and on `lap >= 5`:

| stage | behavior (desktop, pointerType 'mouse') | touch and keyboard |
|---|---|---|
| 0 | `pointerenter` makes it dodge: translate to a random spot within the slip (clamped to the stage, 90px max). Up to 6 dodges per slip, each awards 0.1 Meh ("decoy chased"). After 6 it stays still and says it is tired. | Tapping or pressing says it is on break (line below), no dodge. |
| 1 | It hides behind the slip (z-index below, peeking out 12px at the bottom edge). Clicking the peek says line. | same |
| 2 | It sits in the corner of the stage wearing a tiny `🎩`. | same |
| 3 | It is asleep `😴`; clicking makes `zzz` float and says `Shh.` | same |
| 4 | It is replaced by a note `NOTE: ACCEPT REJECTION has gone to Floor 7 1/2 to find itself. Back in 5 (years).` | n/a |
| lap >= 5 (all slips on the Rock rung) | It is a `🪨` button. | n/a |

- **Keyboard trap**: if the decoy receives keyboard focus (focus event after a Tab, not a click; guard with a `:focus-visible` check or "last input was keyboard"), once per slip it says `Accept? ACCEPT? I have never accepted anything. I thought this was a stress test.` and awards 0.1 Meh. Counts toward stat `complaints-dept.decoy`. Stage 4's note is not focusable, so at stage 4 the trap is available only through the hidden accessible fallback: keep a visually hidden focusable `button` labeled `ACCEPT REJECTION (NOT AVAILABLE)` always present for keyboard users, which says the same line and awards the same 0.1.
- Lines: dodge `The button has moved. It was not told you were coming.` / dodge `The button is not available. It is not also unavailable. It is the other thing.` / tired `The button has stopped dodging. It would like you to know that is not the same as accepting.` / hide `The button is behind the slip. It says it is doing its job from there.` / hat `The button is wearing a tiny hat. This is not relevant to anything. It is, however, very tiny.` / sleep `The button is asleep. Please do not wake it. It has not accepted anything all day.` / break `ACCEPT REJECTION is on its break. It is on the break that comes after the break.` / rock `The button is a rock now. It declines to be pressed. It declines it flatly.`
- **Payoff**: during the lap-5 Rock complaint (section 9, S10) the decoy becomes live for the first and only time (14.4).

### 8.3 Gag 3: The Case File Quote-Back
Section 6.6. Final payoff: at the Rock it quotes nothing; on the CERT screen Brenda reads the player's first complaint of the lap aloud in full, flatly, and says `Noted.` ("the only time anything is noted properly"). If the lap's first complaint was empty she reads: `(blank)` and then `Noted.`

### 8.4 Gag 4: The Shrinking Apology
Every slip ends with a sign-off whose length depends on the rung: rungs 1-3 `We apologize for the inconvenience of being right.`, rungs 4-6 `We apologize for being right.`, rungs 7-9 `Apologies.`, rungs 10-12 `.` (a single dot), the Rock none (just the stamp). Resets to the full sentence each new case and each lap.

### 8.5 Gag 5: Reason Counter
Footer `Rejected for reason N of N+1.` where N = number of distinct reasons seen (so the last reason is never reached). At the Rock `Rejected for reason N of N.` After the first Rock until the lap resets, footers read `Rejected for reason 0 of 0.` with a `title` tooltip `Technically complete.` Callback (Brenda, once, after lap 2): `You have exactly one reason left. It is: no.`

### 8.6 Gag 6: Primes and 7 1/2
Section 6.4's numerology bank keeps returning, wrongly: Sandra declares 7 1/2 words a prime (in the Sandra footnote line), the Stapler asks that primes be paid (rung 10), the Rock requires exactly 7 1/2 words; the textarea on lap 5 allows half a word (a `0.5` word counter displays on the ticker at exactly 7 words typed plus a trailing partial word, joke only). Minimal: just the numerology reasons and the Stapler line; the rest is [COULD].

## 9. Secrets and rare events (at least 3 required; here are 11)

**S1. Long idle at the counter** (see section 10).

**S2. Spam** (see section 10).

**S3. The Accepted Complaint** [SHOULD]. Trigger: text exactly `rock` (case-insensitive) at pos < 13 (deterministic); or 1 in 200 per processed complaint (`api.chance(1/200)`); or exactly the 100th complaint ever filed. Sequence: ceremony runs, then a huge green `APPROVED` stamp lands, confetti (`api.confetti`), `api.sfx('fanfare')`, the ladder flickers, Management panics: `Alert. A complaint has been accepted. Clearing the area. Please remain seated and do not be resolved.` After 5 seconds: a second stamp `ACCEPTED IN ERROR (ERROR ACCEPTED)` and the reveal `Update: the accepted complaint belonged to someone else. It was a complaint about a rock. You have been thanked for helping the other complainant.` Awards 10 Meh; achievement `complaints-dept.accepted` (award 5). The slip it prints has no reason and no citation; after it you ESCALATE normally (the same rung).

**S4. The Small Rock on the Counter** [SHOULD]. Appears at the start of lap 2 and stays. Click it 7 times (7 and a half is impossible). Click responses (bag, one each): `Brenda: 'I do not see a rock.'` / `Brenda has not acknowledged the rock. The rock has not acknowledged Brenda. It is mutual.` / `The rock is on the counter. The counter is on the floor. The floor has not been consulted.` / `Brenda: 'It has always been there. It has not.'` / `The clerk has declined to acknowledge a rock. The clerk has been told it is a stress test.` / `Brenda is looking at the ceiling with great concentration.` At the 7th click: the rock opens one eye (a CSS face appears: an eye div blinking open), Brenda faints (`🧑‍💼` rotates and drops, `😵` swap for 2s, line `Brenda has fainted. This is a first, and also a floor.`), and the Rock itself speaks the only line it ever has: `It is Tuesday.` (`api.say(...,{who:'The Rock'})`), the lights go out for one second (a full-stage dark overlay 1s, input still works), then everything resumes. Hidden achievement `complaints-dept.tuesdayrock` (award 10). The rock then appears slightly larger each lap (scale 1 + lap*0.12) and on every floor's corner as a tiny passenger (CSS pseudo-element, cosmetic). Stat `complaints-dept.rockclicks`.

**S5. Resize** [SHOULD]. Listen with `api.on(window,'resize',...)` (and run once at mount) and read `root.clientWidth`: `< 500` sets `data-compact="1"` (the building collapses into the breadcrumb strip, the Committee's chair 12 goes to the bathroom). Show the banner `The building has compressed. Please keep your arms inside the building.` once per mount. `<= 360` shows the banner `The department cannot be this small. The department is this small.` and achieves `complaints-dept.tiny` (award 2). `window.innerWidth > 1200` shows once: `Complaint is too wide. We process portrait grievances only.`

**S6. Legendary word: Sandra** [MUST, cheap]. Typing the word `sandra` in any complaint (any rung) replaces the ceremony with: all clerks stop and look at the camera (diorama emojis swap to `👀` for 3s, glass pane dims), the stage text `Sandra Has Entered The Chat.`, Brenda `has put down her sandwich, which has never happened.`, **3 seconds of silence** (no sfx, Management quiet), then Management says quietly `Please do not do that.` The slip's primary reason is replaced with: `Sandra has read this. Sandra will not be commenting. Sandra has commented.` Achievement `complaints-dept.sandra` (secret, award 3). Stat `complaints-dept.sandraSummoned`.

**S7. Meta complaint breadcrumbs** (6.4). Achievement at depth 7.

**S8. The Manager** [COULD]. Exact complaint `I want to speak to the manager` (any casing, trailing punctuation ignored). The stage shows an empty office chair `🪑` with a coffee ring (`☕` smudge) and a note `Back in 5 (years).` The stamp thuds on its own. The Manager rejects by not being there. A button `Wait` runs a fast-forward calendar animation (a flipping `YEAR 1 .. YEAR 5` strip, 8s; selftest 1s). Then the chair is occupied by Management itself: `This is awkward. I am the voice. I cannot also be the manager. Please complain to me later.` Award 3; secret achievement `complaints-dept.manager`. The slip is a normal one for that rung afterward.

**S9. The Rock Interrogation** [SHOULD]. On the Rock rung (any of the three rock handlers), clicking the Rock exactly 7 times with each gap <= 1 second makes it roll a quarter turn (CSS rotate 90deg) revealing a sticky note on its underside: `I would like to formally complain about being a rock.` Management: `The Department has accepted the Rock's complaint for filing, and rejected it for being 'a complaint from a rock, which is outside our jurisdiction, which is the ground.'` Awards 20; secret achievement `complaints-dept.stones` (award 5). Stat `stones`. Only once per mount.

**S10. The Rock's Own Complaint** [SHOULD]. On lap 5, after the Rock rung's slip and before the CERT, the Rock files a complaint. the complaint text is exactly `Hm.` (the same word the Mirror's tiny clerk says), printed on a read-only intake form. The player must process it: a dropdown (`<select>`) of six equally valid reasons (`Too small`, `Too final`, `Not a word`, `Is a word`, `Is a rock`, `Already upheld`) and a button `Reject it`. Whichever is chosen (auto-chosen after 20s, selftest 3s), the Rock accepts the rejection with a slight, deeply sincere nod. **The decoy button goes live for the first and only time** and the Rock presses it: trumpet (`api.sfx('fanfare')`), `api.confetti`, line `The Rock has accepted the rejection. It is the first thing in the history of the Department to accept anything.` Then Brenda flatly: `We have a Rock problem. Please take a number.` Awards 30; secret achievement `complaints-dept.dame` (award 5, "Honorary Dame of the Rock"). Stat `rockPeace`. After this the lap ends normally and the Satisfaction Index settles at exactly 0 with the plaque (14.4).

**S11. Cross-module cameos** (all degrade silently):
- Gerald (rung 7) uses `metGerald` both ways.
- Toaster slip at rung 5 (see there). `api.stat.get` reads wrapped in try/catch; missing stats count as 0.
- Dennis (Plant) is the Hat's reference (rung 11) and a corner emoji.
- The Missing Sock (once per save, only the first time a complaint matches `sock`, or `api.flag.get('pet-rock.sockSeen')` or `api.flag.get('sockSeen')` is true, whichever first): after the rejection slip a postcard card appears in the Paper Trail: `Postcard: 'Wish you were here. I am not where you think I am. The weather is Tuesday-ish.'` plus a Lost Complaints bin with one sock: `Lost Complaints bin: one sock. Label: Property of Nobody (Presumed On A Journey). The clerk has rejected the sock's claim to be a complaint. The sock continues its journey.` Sets `complaints-dept.sockSeen` and the shared flag `sockSeen` (set to true).
- Gift Shop (`shop.bought`) footnote at rung 12.

## 10. Idle and spam behavior [MUST]

### 10.1 Idle (INTAKE only, measured with `api.now()`; any `keydown` or `pointerdown` resets to zero; mouse movement does not)

| idle | event |
|---|---|
| 45s | Brenda stops stamping and rejects things on her own, one every 7s while idle: line I1..I4 in order. |
| 90s | I5. She types her own complaint at the counter, line by line (typewriter in the diorama). |
| 150s | I6: she slides the draft under the glass at you; a single button `Reject it` appears on the stage. Clicking it stamps the draft `ACCEPTED (UNOFFICIALLY)`, awards 15 Meh, `api.confetti` small, secret achievement `complaints-dept.kindest`. |
| 180s | I7: a tiny, handwritten, sincere note slides under the glass. `Thank you for not complaining. Nobody ever doesn't.` Secret achievement `complaints-dept.silent` (award 10) if no input since 45s. |
| 240s | The laminated sign flips `BACK IN 1 HOUR (PROVISIONAL)` with a wall clock face whose hands run backwards (CSS). |
| 600s | The top-of-building Rock moves 1px (a `transform: translateX(1px)`), `tick` sfx, and the all-staff memo I8 appears in the banner. Secret achievement `complaints-dept.observed` (award 10). |

Any input after these restores normal service: the note is stamped `WITHDRAWN` retroactively with the line I9 (once), the draft disappears, the sign flips back, the idle ladder restarts from 0. Idle events cannot fire outside INTAKE.

Lines (verbatim):
- I1 `Brenda has rejected the weather. The weather has not been informed.`
- I2 `Brenda has rejected the ceiling. The ceiling has accepted this, in the way ceilings do.`
- I3 `Brenda has rejected her own lunch. It was ham. It will be fine.`
- I4 `Brenda has rejected a passing bird. The bird was a small emoji and a larger concept.`
- I5 `Brenda has filed a complaint in your name about being left waiting. She has rejected it herself for lacking a complainant. You have been copied in.`
- I5b (the draft text she types) `To whom it may concern: I have been at Window 4 since the previous Window 4. Nobody has complained about anything I could fix.`
- I6 `Brenda has slid something under the glass. It is not a complaint. It is a draft. It is addressed to you.`
- I6b (after Reject it) `ACCEPTED (UNOFFICIALLY). Brenda has been rejected by you, very kindly, and has accepted it. This is the kindest thing anyone has ever done at Window 4.`
- I7 `A note has been slid under the glass: 'Thank you for not complaining. Nobody ever doesn't.'`
- I7b (sign) `BACK IN 1 HOUR (PROVISIONAL)`
- I8 `Memo to all staff: do not look at the Rock.`
- I9 `The note has been stamped WITHDRAWN, retroactively. It was sincere. This has been noted.`
- Management idle lines in INTAKE (once each, at 20s and 70s): `Management has noticed the pause. Management would like to remind you that pauses are also processed.` / `Please be advised: the complaint is not going to type itself. It has asked. It does not have hands.`

### 10.2 Spam

Maintain `S.spam = []` of `api.now()` timestamps pushed on every submit, escalate, FILE ANOTHER and withdraw action (prune entries older than 60s).

- **Tier 1, Rush Hour**: >= 5 actions within 8s. The building shakes (reuses the 2px shake class for 600ms), a CSS siren roof light (`🚨` with a red radial-gradient pulse) shows, `api.sfx('buzz')`, a laminated sign flips to `DUE TO VOLUME WE ARE REJECTING ALL INCOMING VOLUME`, Management M-S1, a "Rush Hour Surcharge" of -0.5 Meh is levied (`api.award(-0.5)`, clamps to 0), the surge ticket prints `YOUR NUMBER: 4,112 / NOW SERVING: 3`. The clerk wheels in a second identical clerk, and one more clerk per further spam action up to 5 identical clerks (diorama shows N `🧑‍💼` in a row with staggered CSS animation delays) rejecting in chorus. The slip for a spam burst is a single combined slip `Rejected, collectively, with feeling.` (no other reason, no clause). Duration of the state: until 6s pass with no actions.
- **Tier 2, The Warm Stamp**: >= 8 actions within 5s. Stamp overheats: the arm smokes (a few `💨` spans), the stamp turns red, a small fan SVG spins (`rotate` keyframe), Management M-S2, the peas line, `COOLING` phase for 4s (selftest 0.8s): all inputs `disabled`, a progress bar labeled `Cooling (fictitious)`. The next slip afterward is written entirely in Brenda's apologetic handwriting (cursive font, body replaced by `Sorry about the stamp. It has had a day. -B`) and awards 2 extra Meh. Achievement `complaints-dept.volume` (secret, award 2).
- **Tier 3, Security and Shred**: >= 20 actions within 60s. A single unimpressed man on an office chair (a `🧍` emoji stacked over a `🪑` emoji) rolls in from the left (CSS translateX over 1.4s), looks at you for 4 seconds, files a Form (a tiny card appears), and rolls out; `api.award(0.1)` with Management line M-S3 (volume). If spam continues after that (another 8 actions in 8s) the shredder trap door opens in welcome and every pending complaint is shredded to confetti (`api.confetti`, `api.stat.inc('complaints-dept.shredded')`), with `Withdrawn In Bulk, With Love.` and Management `Sigh. [Sigh acknowledged.]`
- Spam lines (verbatim):
  - M-S1 `Alert. Volume detected. The Department has been informed that it is a department.`
  - M-S1b `Rush Hour Surcharge: -0.5 Meh. Per policy. The policy was written just now, by the rush.`
  - M-S1c `Brenda has wheeled in a second Brenda. The second Brenda is identical and also eating.`
  - M-S1d `The now-serving board has been on 3 since the morning of the reorganization.`
  - M-S2 `Emergency Stamp Cooling Protocol. The stamp is warm. The stamp has been stamping since 6 AM and is considering its options.`
  - M-S2b `Brenda has gently placed a bag of frozen peas on the stamp. The peas are not a permanent solution. They are, however, peas.`
  - M-S3 `A man on an office chair has rolled in from the left. He looks at you for 4 seconds. He files a Form. He rolls out.`
  - M-S3b `Please stop. The stamp is a mechanical arm. It has no opinion, but it is leaning.`
  - M-S3c `Rate limit exceeded. A Rejection Fee of 1 paper clip has been deducted from nothing. The paper clip is grateful to have been mentioned.`
  - Combined slip: `Rejected, collectively, with feeling.`

Under `?selftest`, the fuzz harness will trigger spam tiers constantly. All three tiers must be safe to re-enter, must clean up on `destroy`, and must be rate-limited so they do not stack (one tier at a time; cooldown 10s selftest 2s).

## 11. Behavior when the player does the wrong thing (robustness) [MUST]

- Double submit (Enter + click) is ignored while `S.phase !== 'INTAKE'`.
- ESCALATE pressed twice in a row is ignored by the phase guard.
- Pressing digits/E/R/Space inside a text control must not trigger hotkeys.
- If `api.exit()` or destroy fires mid-ceremony, all timers die (managed APIs only), no DOM access afterwards.
- The textarea is `maxlength=200`, text longer than that cannot exist, but the `long` feature is >= 170.
- Pasting a rejection is the `echo` feature, not a crash.
- Empty or whitespace-only complaints never produce `%QQ` tokens (use the empty clause line).
- Rungs 4 and 12 contain text inputs and so disable the global hotkeys while focused.
- Hidden tab: no special handling needed; all timers are managed; the idle ladder uses `api.now()` deltas, not tick counters, so a hidden tab does not "catch up" and fire five idle stages at once (fire at most one idle stage per timer wake).

## 12. Achievements [MUST: >= 6 with >= 2 secret; here are 18]

`P.addAchievements([...])` with ids prefixed `complaints-dept.`; `icon` a relevant emoji; `reward` 1-10 Meh (small).

| id | name | desc | secret | reward |
|---|---|---|---|---|
| `first` | Grand Order of the Rejected Slip, First Class (Laminated) | Receive your first rejection. It is a sign of belonging and also a form. | no | 1 |
| `gerald` | Escalator Of The Realm, Third Class | Escalate to rung 7 and meet Gerald, who is quietly unimpressed by your ambition. | no | 3 |
| `rock` | The Ultimate Appellant of the Rock-Based Judiciary | Appeal a complaint all the way to the Rock. The elevator was a rumor; you took the stairs of hope. | no | 10 |
| `queue` | Knight Commander of the Queue (Honorary, Pending Quorum) | Let 3 people go ahead of you at Supervising Senior Intake. Nobody was keeping track. | no | 2 |
| `sandra25` | Grand Marshal of Clause 14(c)(ii)(a)(iv) bis, as Amended Tuesday | Be cited by Sandra from Compliance 25 times. Sandra thanks you. Sandra has not thanked you. | no | 5 |
| `reasons25` | Master of Procedure, Honorary, Retroactively | Collect 25 different rejection reasons in the Binder, none of which will ever help you. | no | 5 |
| `rejected50` | Archduke of Archived Annoyance | Have 50 complaints rejected. The Department honors consistency, specifically its own. | no | 5 |
| `meta7` | Chief Archivist of the Folder Within The Folder | Complain about complaints about complaints, 7 folders deep. The form has taken out a loan. | no | 5 |
| `halfsandwich` | Half A Sandwich, Whole Heart | Accept half of Brenda's sandwich. It is just bread. It was never just bread. | no | 3 |
| `knighthood` | Knight Commander of the Resubmission | Complete 3 laps. The Rock has taken note. The Rock has not taken anything else. | no | 8 |
| `silent` | The Silent Majority Of One (Quorum Pending) | SECRET. Idle at the counter for 3 minutes without complaining. A clerk is moved. | yes | 10 |
| `kindest` | The Kindest Thing Anyone Ever Did At Window 4 | SECRET. Sit idle long enough that Brenda writes her own complaint, then accept it (unofficially). | yes | 5 |
| `accepted` | The Accepted One (Revoked Pending Appeal) | SECRET. Have a complaint accepted by the Department. This is not supposed to be possible. | yes | 5 |
| `tuesdayrock` | It Is Tuesday (Officially) | SECRET. Click the small rock 7 times. 7 and a half was not available. | yes | 10 |
| `stones` | Grievance Of The Stones | SECRET. Find what the Rock has been meaning to complain about. | yes | 5 |
| `dame` | Honorary Dame of the Rock | SECRET. Reject the Rock's own complaint. Whichever reason you pick is a good one. | yes | 5 |
| `observed` | Grand Duchess of Doing Nothing Under Observation | SECRET. Idle in the Department for 10 minutes while the Rock does something. Do not look at the Rock. | yes | 10 |
| `sandra` | Sandra Has Entered The Chat | SECRET. Type the name. Do not do that. | yes | 3 |
| `volume` | Overwhelmed (Departmentally) | SECRET. Submit complaints so quickly the stamp needs peas. | yes | 2 |
| `manager` | Back In 5 (Years) | SECRET. Ask for the manager. Wait. | yes | 3 |
| `tiny` | The Department Is This Small | SECRET. Shrink the window until the Department admits it. | yes | 2 |

`check(stats, flags)` may be used for `rejected50` (`stats['complaints-dept.rejected'] >= 50`), `sandra25` (`stats['complaints-dept.sandraCitations'] >= 25`), `knighthood` (`stats['complaints-dept.laps'] >= 3`), `first` (`stats['complaints-dept.rejected'] >= 1`); others unlocked manually with `api.achieve`.

## 13. Stats and flags (all prefixed)

`complaints-dept.filed .rejected .escalated .rungs .maxRung .rock .stamps .surveys .metaComplaints .shortestComplaint .longestComplaint .brendaSandwiches .laps .letAhead .decoy .accepted .shredded .withdrawn .sandraCitations .sandraSummoned .moist .contrition .toasterSlips .tuesdays .rockclicks .stones .rockPeace .emptyFiled .surcharge`. Flags: `complaints-dept.rockMet`, `complaints-dept.sockSeen`, shared `metGerald`, shared `sockSeen`.

## 14. THE ENDING THAT IS NOT AN ENDING

### 14.1 Certificate [MUST]

After the Rock slip and ESCALATE (TO BRENDA): the stage becomes a full-width certificate scrolling in from the bottom (CSS translateY, 1.2s, `api.sfx('tada')` plus `api.confetti`). Contents (verbatim):

- Title `CERTIFICATE OF COMPLETED COMPLAINT`
- Body `You have exhausted the complaint process. The complaint process has not been exhausted; it has only paused to catch its breath.`
- Line `Awarded to %PLAYER in recognition of having been told no by a hat, a mirror, a stapler, and a boulder.`
- Signatures row: `Gerald (V.P. of Spuds)`, `Sandra (see footnote)`, `The Toaster (toast)`, `Dennis (not present)`, `The Stapler`, `Tuesday (tentative)`. Footnote: `Sandra's footnote: 'See footnote.'`
- Gold SVG seal (a circle with scalloped edge made of a `<polygon>` or repeating conic gradient, text `OFFICIAL (UNOFFICIAL)`); the signature line is a doodle of a sandwich `🥪`.
- A `Print Certificate` button. Pressing it replaces its label with `Printing...` for **12 seconds** (selftest 1.5s), then `Printer out of Tuesday.` (button stays disabled with that text).
- Management speaks, after 2s: `Congratulations. You have exhausted the entire chain of command. Your complaint has now been fully and finally rejected, at every level, by everyone, including a rock. This concludes the process.` After 5s: `The process has not concluded. It has only paused to catch its breath.`
- Brenda reads the player's first complaint of the lap aloud in full, flatly, then says `Noted.` (the Gag 3 payoff).
- After the Print flow finishes OR after 25 seconds OR when the player presses the button `Continue (Not Required)` (always present), the certificate is stamped `REJECTED` (a stamp lands over it) and the RESET begins.

### 14.2 RESET [MUST]

On reset: `S.lap++`, `S.pos = 0`, `S.caseNo++`, `api.award(5)` (lap), `api.stat.inc('complaints-dept.laps')`, apply lap insertions (5.1), the unit label changes (6.8), the diorama shows Brenda's new title, the small rock appears on the counter (lap 2+), the Roof Annex "Floor 7 1/2" appears in the building, `S.metaDepth = 0`, shuffle-bag state is kept (no reason repeats), the sign-off shrinks reset. Brenda looks up and says `Next.` and immediately stamps `REJECTED (PRE-EMPTIVE)` in the diorama for the next complaint before the player types, exactly as at the start. Management adds almost to itself: `It is nice that somebody came.`

### 14.3 What persists and changes per lap

- Lap 2: small rock on the counter; Rung 7 1/2 exists; titles `Brenda, Acting Rock`; unit `Satisfactions per Hour`.
- Lap 3: A Bigger Rock; `Acting Acting`; unit `Sats`. Achievement `knighthood` is granted on completing lap 3.
- Lap 4: A Rock That Is Technically A Cloud; Brenda offers half a sandwich every lap from here.
- Lap 5: the Rock's complaint (S10); unit `Gerald`.
- Lap 6+: one more `Acting` per lap, the counter rock 12% larger per lap, one more sandwich detail, and one rarer reason added (add `Rejected. This reason has never been used before and will be unusable by tomorrow.` as lap-6+ reason; each further lap re-enables a previously used reason, rephrased with the `again` prefix). The loop never repeats within 3 minutes because the matcher, the vane, and the bags vary every pass.

### 14.4 Lap 5 closing

After S10: Satisfaction Index settles at exactly 0 (animate thermometer down), and a small plaque appears under the meter: `Satisfaction: not the point. The point: not the point.` The module continues forever. It is impossible to win and impossible to be bored for more than three minutes, because every rung is a new thing to physically do and every lap swaps in a new unit of measurement.

## 15. Visual design [MUST]

**Palette** (CSS custom properties on `.m-complaints-dept-root`): cream paper `--cd-paper:#fbf3df`; manila folder `#e8d29a`; ink outline `#2a2118` (3px on everything, sticker shadow `4px 4px 0 #2a2118`); stamp red `#c4332b`; stamp blue `#2b4fb3` (used only for ink: rung 2's slip); mint `#9fdcc0` (approved-looking decoys, survey, Moist stamp, acceptance); mustard `#e9b43c` (counter, ranks, lit rung); coral `#ff7a68` (escalate buttons, focus rings); lilac `#c9b6e8` (upper floors); slate rock `#6f6a64` with highlight `#a39d96`. Faint dotted-paper texture on the root via `radial-gradient(#0000001a 1px, transparent 1px)` with `background-size: 12px 12px`.

**Floor tints**: set `--cd-floor` per `data-rung`: rungs 1-4 beige fluorescent (`#f3e7c0`), 5-8 shifting through `#e6dcd0` to lilac, 9-12 lilac `#d9ccef`, Rock rungs a hush of grey `#b9b6b2`. The stage background transitions to the floor tint (CSS transition 600ms).

**Typography**: system fonts only. Forms and slips use `ui-monospace, 'Cascadia Mono', Consolas, monospace`. Headers use chunky `system-ui` bold. The margin note uses italic.

**Diorama (CSS/SVG)**: Window 4 is a crayon-drawn window (wobbly irregular border-radius), Brenda `🧑‍💼` large (font-size 4rem) behind a translucent pane (`background: linear-gradient(115deg, #fff4 0 30%, #fff1 30% 100%)`), a mustard counter bar, a 🥪 tiny, a bell 🔔 button, nameplate (`Brenda, Intake Clerk` plus titles), the stamp arm (a rotated `🤚` in a sleeve rectangle). At 140px tall on screens < 640px.

**Stamp**: a div with `transform: rotate(-7deg)`, inset border, uppercase `letter-spacing:.12em` text, `mix-blend-mode: multiply`, `filter: url(#cd-rough)` for the worn edge (guard: if `filter: url()` fails there is no failure, just no worn look), landing animation `scale(1.7) -> scale(1)` with a small bounce (cubic-bezier) and the root shake: a keyframe on `.m-complaints-dept-root` using transform translate +/-2px for 120ms. Variants listed in 6.3.

**Slip**: thermal receipt, jagged edges via `mask: conic-gradient(from -45deg at bottom, #0000, #000 1deg 89deg, #0000 90deg) 50%/12px 100%` (or a simple `repeating-linear-gradient` triangle fringe via `::after`), monospace, `box-shadow: 4px 4px 0 #2a2118` omitted on masked elements (use `filter: drop-shadow(4px 4px 0 #2a2118)` on the parent instead), prints with `clip-path`. Cap line width with `max-width: 100%` and `overflow-wrap: anywhere`.

**Conveyor strip** (ceremony): a 36px tall repeating-linear-gradient belt (`animation: background-position`), manila folder emoji sliding, the progress bar beneath it.

**Building**: floors are flex rows (pill-shaped, 3px outlines). Windows are small `div`s with `box-shadow` that flicker (stepped keyframes) when lit. The Rock tarp is a lumpy silhouette `div`. The elevator tab 🧾 moves. Past floors fade to a ghost outline. Narrow (<500px): the building becomes a single breadcrumb pill `Rung 3 of 13: Supervising Senior Intake Clerk` with a peek of the next floor as `??? (dark)`.

**Committee table**: inline SVG oval with 12 chair circles (the circles are `<g role="button" tabindex="0">` or real positioned buttons over the SVG; positioned buttons are more reliable for the fuzz harness: prefer 12 absolutely positioned `<button>` circles over an SVG ellipse).

**Rock**: blob div, no face. `Secret 4` eye: a div with `border-radius:50%` that animates `height: 2px -> 14px`.

**Mirror**: nested divs with `--d` custom property (set inline per level, 0-7).

**Weather vane**: inline SVG arrow, `transform: rotate(var(--a))` with spring cubic-bezier transition.

**Thermometer**: `div` with `linear-gradient(to top, #ff7a68, #e9b43c)`, height from `--fill` (percent = index/15 clamped 0..1).

**Sound mapping**: `stamp` every REJECTED; `whoosh` on escalate and ceremony slide; `ding` or `bell` on the bell button and on Brenda's sandwich half; `tick` on queue board updates and the Rock countdown; `pop` on chair invites and staples; `buzz` for siren; `sad` for the Toaster slip; `boing` when the decoy dodges; `honk` once when the hat goes on; `fanfare` for acceptance and the Rock's complaint; `tada` for the certificate and a lap; `bloop` when the Weather Vane yields Moist.

**Reduced motion**: read `matchMedia('(prefers-reduced-motion: reduce)')` once; stamps and shakes become opacity fades; ceremony becomes a plain text progress line; the elevator becomes a text label; the Mirror still works (static); the Rock countdown still runs (it is a timer, not an animation).

**Accessibility**: the stage region has `aria-live="polite"`; the slip text is a real `<div role="status">` with the reason as the first line; all controls are real buttons with visible focus rings in coral; the decoy button has an accessible name `ACCEPT REJECTION (NOT AVAILABLE)`; never convey anything only by color.

## 16. THE CONTENT BANKS (all final jokes, verbatim)

Everything below is deadpan. Do not add exclamation marks. Lines are verbatim; only the `%TOKEN`s change. Count: well over 100 distinct lines (the reasons alone are 130+).

### 16.1 Management / opening and global module lines (A)
- A1 `Please take a number. We have 0. Please take it anyway.`
- A2 `Welcome to the Department of Complaints. Your complaint is important to us in a way we cannot file.`
- A3 `We have not read your complaint. We have, however, rejected it in advance, to save time.`
- A4 `Please hold the form level. Please hold the form. The form has asked you to hold it.`
- A5 `The Department of Complaints is open. It has been open since the previous opening.`

### 16.2 Intake text
Placeholders (cycle, shuffle bag): `Describe your grievance in the pluperfect.` / `Describe your grievance. Be specific. Not that specific.` / `I would like to complain about...` / `Begin typing. We will know.` / `State your grievance. State it again, in the correct tense.`

Margin notes from Brenda (rotate per case): `Margin note, Brenda: ink is optional. Blue is not.` / `Margin note, Brenda: please do not press so hard. It is a screen.` / `Margin note, Brenda: the form is also a feeling. Handle with care.` / `Margin note, Brenda: I will read at least 30 percent of this.` / `Margin note, Brenda: if you are in a hurry, the form is not.`

Form header: `FORM C-1 (COMPLAINT, GENERAL, NOT SPECIFIC)`. Submit button: `SUBMIT FOR PROCESSING`. Counter label: `Word Count Under Review`.

### 16.3 Ceremony captions and Management commentary (B)
Fake stage captions (progress bar label, cycle in order, repeat if needed): `Verifying the verifier...` / `Notarizing the notary...` / `Calibrating the stamp...` / `Consulting the Binder. The Binder is consulting back.` / `Warming the stamp pad to a feeling...` / `Asking the ink for a second opinion...`

Slot reel (Category, Subcategory pairs; the reel lands on one at random): `Category 4 (Retired), Subcategory Sigh` / `Category 11, Subcategory Mild Feeling` / `Category 9(c), Subcategory Sat On A Cat` / `Category 2, Subcategory Technically` / `Category 7 1/2, Subcategory Tuesday-Adjacent` / `Category 14, Subcategory Please See Category 14`

Stage commentary (Management, one per stage): 1 `Brenda is reading your complaint aloud. She is getting about 30 percent of it, and most of that percent is the word 'the'.` / 2 `Classifying. The reel has landed. It was not told what it landed on.` / 3 `The stamp has been summoned. The stamp was not told what it is stamping.` / 4 `Printing your rejection. The printer is dot-matrix and emotionally unavailable.` / 5 (after the slip) `We value your feedback. We value it the way a hat values a head: loosely.`

Receipt and tone gauge: `Grievance No. %CASE received. Receiving is the easy part. Please do not get attached.` / `Estimated resolution: never (provisional). The word provisional is carrying a great deal of weight here.` / `Tone Assessment: Aggrieved (Mild). You may be Aggrieved (Standard) on Thursday.`

Skip and expedite: `Skipped Ceremony Surcharge: 0 Meh. The ceremony would like you to know it noticed.` / `Expedite Fee: 1 paper clip, deducted from nothing.`

Escalate (bag): `Appeal granted the right to be appealed, which is a different right from the right to win an appeal.` / `The elevator is a rumor, so your complaint has been sent by hope.` / `Your complaint has been escalated. It is now somebody else's feeling.` / `Sending your complaint up. Gravity has been informed and has no objection.` / `Escalation costs nothing. This is also what it is worth.` / `Your complaint has been issued a lanyard and sent upstairs.`

After a rejection (Management bag, about every 2nd slip): `You have been awarded 0.5 Meh for your rejection. A rejection is a kind of attendance.` / `Management has reviewed your complaint and has chosen the word 'noted' because it is the shortest way to say nothing.` / `Your Case File has been updated. Your Case File would like to be left alone with its feelings.` / `Satisfaction Index: moving in the correct direction, per policy. The correct direction is the other one.` / `That rejection was processed in 4.2 seconds, which is a personal best for the stamp.` / `+0.5 Meh (rounded up to 0.5).` / `Your complaint was rejected with maximum pomp and minimum consequence. This is the house style.` / `Good news: the rejection is final. Better news: nothing is final. Both are in force.` / `Rejections are filed under 'Experience'. We have a lot of Experience. Nobody can find it.` / `Please remember: a rejection is not a no. It is a no with paperwork.` / `Rejection received. Please hold it gently. It has been through a lot of rungs.` / `A rejection has been placed in your tray. The tray has been placed in a drawer. The drawer has been placed in a feeling.`

Withdraw / shredder: `Shredder alert: your complaint has been withdrawn with love. It went peacefully.` / `Your complaint has been filed under 'Withdrawn With Love'. It had a lovely time.` / `Your complaint has gone through the trap door. The trap door says it was not a big deal. It was a medium deal.`

Survey responses (16.8): `Thank you. Your feedback of %N has been averaged with 7 1/2 stars from a previous respondent, who was a lamp.` / `Thank you. Your %N has been shared with the lamp. The lamp has no comment, but is glowing.` / `Thank you. Your %N has been entered in the Survey of Surveys, which has been out of stars since 1998.` / `We have chosen 3 for you.`

### 16.4 Greetings by rung (slip header)
`Brenda, Window 4:` / `Senior Intake Clerk Desmond:` / `Supervising Senior Intake Clerk:` / `Assistant to the Regional Assistant:` / `Gerald's Nephew (Intern):` / `The Committee of One:` / `Gerald, VP of Spuds:` / `Rung 7 1/2:` / `The Mirror:` / `The Weather Vane:` / `The Stapler's Union Rep:` / `The Hat:` / `Tuesday's Assistant:` / `The Rock:` / `The Bigger Rock:` / `The Cloud (Technically A Rock):`

### 16.5 Reason banks (the matcher's content)

#### 16.5.1 `G`: generic bag (36 lines, 12 defect types: Timing, Format, Jurisdiction, Signature, Wrong Color, Wrong Person, Too Accurate, Already Resolved, Not Yet Happened, Classified, Physically Impossible, Existential)
Timing:
1. `Rejected. Filed 4 minutes before the Window opened. The Window has since opened, rendering your complaint stale and the Window embarrassed.`
2. `Rejected. You complained on a day that is not a complaint day. Complaint days are Tuesdays, which are not available.`
3. `Rejected. Your complaint arrived 11 seconds after the deadline. The deadline was announced 11 seconds after it passed.`

Format:
4. `Rejected. Written in the present continuous. This office accepts only the pluperfect.`
5. `Rejected. The complaint is in the wrong typeface. We use Comic Procedure. You appear to have used Procedure Comic.`
6. `Rejected. Filed in triplicate, but only the second copy was ever written. The first and third are pending.`

Jurisdiction:
7. `Rejected. This matter falls under the Department of Matters, which has no jurisdiction over matters.`
8. `Rejected. You appear to be making a complaint. That is the work of the Department of Complaints, which is where you are, so we must decline.`

Signature:
9. `Rejected. No signature was found. A signature was found, but it was not yours. It was rather good.`
10. `Rejected. Your signature is legible, which is a defect. Please resubmit with a signature nobody can read, including you.`

Wrong Color:
11. `Rejected. Submitted in ink that is, per the stamp pad, insufficiently blue.` (this is also the forced first-ever line)
12. `Rejected. The complaint is the wrong shade of cream. We accept Cream 4 and Cream 6. This is Cream 5, a cream nobody ordered.`
13. `Rejected. Your grievance is mostly red. Grievances must be filed in a color that is neither warm nor cool. We call it Department.`

Wrong Person:
14. `Rejected. This complaint is addressed to you. You are not the person who has the problem; you are the person who is aware of it.`
15. `Rejected. The complaint should have been filed by your cousin. We have a form for that. It is a form for your cousin.`

Too Accurate:
16. `Rejected. Your complaint is correct, which is not a valid ground for a complaint.`
17. `Rejected. Category 4 was retired in 1994 after it became too accurate. Yours is Category 4.`
18. `Rejected. The complaint is so precise that it constitutes a finding. Findings are filed by Findings.`

Already Resolved:
19. `Rejected. Your complaint has already been resolved. It was resolved by being filed. Please see: this.`
20. `Rejected. The problem you describe was fixed yesterday. We do not know by whom. We are told it was fixed with a sense of calm.`
21. `Rejected. Resolved in your favor, then rejected on appeal, before you filed. The system is very fast when it wants to be.`

Not Yet Happened:
22. `Rejected. You describe an event that has not happened yet. The Department accepts grievances in the past tense, or Thursday.`
23. `Rejected. Your complaint is premature. Please experience the problem more fully and then return.`

Classified:
24. `Rejected. The subject of your complaint is classified. We cannot say what it is. We can say it is a good one.`
25. `Rejected. Parts of your complaint have been redacted. All of the parts. The redaction is rather elegant.`

Physically Impossible:
26. `Rejected. Your complaint requires the Department to be in two places. We are in one place, and it is a corridor.`
27. `Rejected. The remedy you imply requires a Tuesday that has never existed. We checked, in person, at some expense.`
28. `Rejected. The paper your complaint is written on weighs 4 grams more than the paper it describes. Please send a lighter grievance.`

Existential:
29. `Rejected. A complaint presupposes a complainant. We could not locate one. We located a person who was nearby.`
30. `Rejected. If we accepted this, the Department would have nothing to reject, and then what would we be.`
31. `Rejected. Your complaint is the right size to be a feeling. Feelings are routed to Floor 7 1/2, which is not yet built.`

Extras:
32. `Rejected. Complaint exceeds the maximum permitted number of sentiments by 0.5.`
33. `Rejected. Stamp unavailable. The stamp is on its break. The break has been extended pending a hearing on the stamp.`
34. `Rejected. Reference 7 1/2 is not a whole number and cannot be processed by anyone with fingers.`
35. `Rejected. Your complaint is in a font we could not see. That is the font's fault, but the form is yours.`
36. `Rejected. The complaint has been rejected pre-emptively, and this is the formal paperwork for that. Please keep it somewhere dry.`

#### 16.5.2 Feature banks (each an array; deal with `bag()`)

`caps`:
- `Rejected. Your capitals exceed the permitted 6 decibels per paragraph. Please lower your case.`
- `Rejected. The Department has a quiet policy and a loud policy, and today is the quiet one.`
- `Rejected. Your complaint arrived shouting. Shouting complaints are heard in the Quiet Room, which is quiet because it is closed.`

`lower`:
- `Rejected. Entirely lowercase. The Department classifies this as a whisper. Whispers will be heard at a later date, to be decided by whisper.`
- `Rejected. Not one capital letter. Complaints must begin with authority, and also several other places.`

`bang`:
- `Rejected. Exclamation mark detected. Exclamation marks must be filed separately, in triplicate, by the exclamation.`
- `Rejected. Our quota for exclamation marks is zero. Sandra has been counting. Sandra counts with her whole heart.`
- `Rejected. Your exclamation mark has been deducted from your Sentiments. It was not enough to cover the exclamation mark.`

`question`:
- `Rejected. Complaints may not be asked as questions. Your question mark has been left unanswered. Please answer it yourself and resubmit.`
- `Rejected. A question is an Inquiry. Inquiries are handled by the Department of Answers, which has none.`
- `Rejected. We do not answer questions. We have answered this one by rejecting it, which is a sort of answer.`

`interrobang`:
- `Rejected. The interrobang is licensed to exactly one person, and she is on leave until further punctuation.`
- `Rejected. A question mark and an exclamation mark were found together. They have been separated for their own safety.`

`please`:
- `Rejected. You said please. Please is a request, not a complaint. Requests are handled by the Department of Requests, which has been closed since lunch.`
- `Rejected. Politeness detected. This is a complaint, not a favor. Please complain more rudely, within the guidelines for rudeness (see Annex R).`

`digits`:
- `Rejected. Your complaint contains the number %NUM. Numbers above 7 1/2 require a signature from a number.`
- `Rejected. Digits are reserved for Accounts. We have replaced yours with the words 'a number of'.`
- `Rejected. A number appears in your complaint. All numbers must be declared at the border. The border is a mat.`

`bignum` (number > 100):
- `Rejected. %NUM is a large number. Large numbers must be accompanied by a smaller number, as a chaperone.`

`tiny`:
- `Rejected. Complaint too short. Please resubmit with at least 4 characters, none of which may be the number 4.`

`short` (one word):
- `Rejected. A single word. Single words must be accompanied by a second word as a chaperone.`
- `Rejected. The complaint is too short to be a complaint and too long to be a sigh.`

`long`:
- `Rejected. Over 200 characters. Also under the minimum of 201. We regret the inconvenience of this arithmetic.`
- `Rejected. Your complaint is too long. Please resubmit with fewer words, in the order you originally intended, at 11:47 on a day of your choosing.`

`empty` (the Void Pool):
- `Rejected. Your complaint is about nothing. Nothing is the jurisdiction of the Department of Nothing, on Floor 7 1/2. They are expecting you.`
- `Rejected. We have read your complaint in full. It was a very restful read. Rejected on grounds of restfulness.`
- `Rejected. An empty complaint has been filed. The Department has filed an empty rejection in reply. Both are on file. Neither is a mistake.`
- `Rejected. The void has been consulted. The void declined to comment and asked to be put on file.`
- `Rejected. Nothing detected. Nothing is permitted in the building only by appointment, and nothing has none.`

`repeat`:
- `Rejected. This is the same complaint as before. Complaints may not be recycled; they may only be reincarnated, and this one has not died yet.`
- `Rejected. This complaint has already been rejected. It was very good at it.`
- `Rejected. Resubmission requires Form 3/Resubmission, which was rejected as a duplicate.`

`echo`:
- `Rejected. You have pasted our rejection back at us. This is allowed. It is also rejected.`
- `Rejected. We recognize this text. It is ours. We would like it back, and then we would like to reject it again.`

`emoji`:
- `Rejected. The complaint contains an emoji. Emoji may only be filed in the Department of Faces.`
- `Rejected. A small picture was found in your complaint. It has been returned to the picture's family.`

`fast`:
- `Rejected. Typed too quickly. The complaint must be given time to feel things.`

`slow`:
- `Rejected. Typed too slowly. By the time you finished, the problem had retired.`

`mgmt`:
- `Rejected. The complaint mentions Management. Management is not a valid subject of complaint and is, in any case, listening.`
- `Rejected. You have named Management. Management has been informed and would like to speak to you about being named.`

`rock`:
- `Rejected. Complaint mentions a rock. Rocks are covered by an entirely different, higher building.`
- `Rejected. The Department cannot hear complaints about rocks. We are told the rock has heard worse.`

`complaintWord`:
- `Rejected. You have used the word 'complaint' in a complaint. This is a recursive grievance and must be filed with itself.`
- `Rejected. The word 'complaint' is on the Approved Words list as a compliment.`

`obvious`:
- `Rejected. Your use of the phrase %QQ falls under Clause 14(c)(ii)(a), Statements of the Obvious.`
- `Rejected. The word %QQ is on the Approved Words list as a compliment.`

`name`:
- `Rejected. The complaint names %NAME. %NAME has been notified and has declined to be a party. %NAME sends polite and legally meaningless regards.`

`food`:
- `Rejected. You have mentioned %FOOD. Brenda has noted this. Brenda would like to be left with the %FOOD.`
- `Rejected. Complaints about food may be made only on an empty stomach, and we have checked yours.`

`broken`:
- `Rejected. The item you describe as broken has been reclassified as 'differently assembled'. No remedy exists for items that are differently assembled.`

`wait`:
- `Rejected. You complain of a wait of unspecified length. We can only process waits of known length. Please wait and measure.`

`late`:
- `Rejected. You describe something as late. It was on time for a different time. We have asked it which.`

`cold`:
- `Rejected. Complaints about cold must be filed at 18 degrees or below. It is currently 21. You are too warm to be cold.`

`rude`:
- `Rejected. The clerk you describe as rude has been verified as 'efficiently warm'. Rudeness is measured in clerk-degrees. This clerk scored 4.`

`hate`:
- `Rejected. 'Hate' is a strong word and the Department only has a weak form for it. Form 12/Weak is at Window 2, which is out of 12/Weak.`

`noise`:
- `Rejected. The noise you describe has been investigated. It was found to be the sound of an investigation.`

`weather`:
- `Rejected. The Department has no authority over weather. The weather has no authority over the Department. The two have an understanding.`

`meeting`:
- `Rejected. Your complaint about a meeting has been scheduled as a meeting. Please bring the complaint.`

`iStart`:
- `Rejected. You began with 'I'. Grievances must be filed by a committee of at least 3. You are a committee of 1. Please borrow 2 people and a quorum.`

`haiku`:
- `Rejected. Your haiku is correct in syllables and incorrect in feeling. The Department accepts only grievances that scan.`

`repeatLetters`:
- `Rejected. Your complaint contains a letter repeated more than the letter's contract allows. Please contact the letter.`

`ecount`:
- `Rejected. Your complaint contains the letter 'e' an unusually high %ECOUNT times. Please contact the letter.`

`toast`:
- `Rejected. Your complaint mentions toast. The Toaster has been consulted and is not available for comment. The Toaster is toast.`

`sock`:
- `Rejected. Your complaint contains a sock. We are legally unable to comment on the sock, though we hope it is somewhere nice.`

`plant`:
- `Rejected. The Department cannot accept complaints about plants. Dennis has asked that we stress this is not about Dennis.`

`stapler`:
- `Rejected. You are complaining about the stapler. The stapler is a union representative and has asked that you address your complaint to its jaw.`

`gerald`:
- `Rejected. Gerald is a Vice President and cannot be complained about. He can, however, be complained near.`

`tuesday`:
- `Rejected. Your complaint about Tuesday has been redirected to Tuesday. Tuesday has not replied. Tuesday never does.`

`brenda`:
- `Rejected. You have named Brenda. Brenda has asked that you complain to the sandwich instead. It has fewer feelings.`

`refund`:
- `Rejected. You wrote 'refund'. The Refund Desk is on the third floor, which is the second floor, which is closed.`

`manager`:
- `Rejected. You have requested a manager. Our managers are all in a meeting about requests for managers. It has been 11 years. It is going well.`

`meta` (by depth, 1-7, the 7th and later repeat):
1. `Rejected. You have complained about the Department. This has been filed under Departments, Complaints about, Resolved (by being filed).`
2. `Rejected. You have complained about complaining about the Department. This has been filed under Complaints about Complaints.`
3. `Rejected. A complaint about a complaint about a complaint. The folder is now a tree. The tree is not a plant. Dennis has been informed.`
4. `Rejected. The folder labeled Complaints about Complaints about Complaints about Complaints has itself been the subject of a complaint.`
5. `Rejected. The nesting depth has exceeded the nesting depth. The folders have been moved to a larger folder, which is also a folder.`
6. `Rejected. At this depth the label wraps. It now reads: Ground Floor (the floor above the floor above).`
7. `Rejected. At depth 7 the form has taken out a loan from the future to make room. The future has asked for the form back.`

**Always features:**

`numerology`:
- prime: `Rejected. Your complaint has %WORDS words. Section 9(c) accepts only a prime number of words. %WORDS is prime. Section 9(d) rejects unregistered primes.`
- even: `Rejected. Your complaint has %WORDS words, which is even. We process odd-numbered grievances only. Management makes no claim about the other sense of odd.`
- odd: `Rejected. Your complaint has %WORDS words, which is odd. We process even grievances only. Resubmit with one extra word. We will not tell you which.`

`firstLetter`:
- `Rejected. Your complaint begins with the letter '%FIRST'. Today we accept any letter except '%FIRST'. Yesterday it was the reverse.`

`finalPunct`:
- fullstop: `Rejected. Full stop detected. A full stop implies finality. The Department cannot accept anything final until after the reorganization.`
- none: `Rejected. No full stop. A complaint without a full stop is a rumor, and rumors go to Rumors, Room 12.`

`clock`:
- `Rejected. Filed at %TIME. Complaints are accepted between 9:00 and 9:00. This includes a lunch of twenty-four hours.`

`longestWord`:
- `Rejected. The word '%LONGEST' is not on the approved vocabulary list. The list has one word on it. It is 'noted'.`

`chars`:
- `Rejected. %CHARS characters, including spaces. Spaces are classified as Not Complaint and must be filed separately, at Window 3, which is also a drawing.`

**Special reasons:**
- Legendary word `sandra`: `Sandra has read this. Sandra will not be commenting. Sandra has commented.`
- Rock-complaint (Sandra's S6 replaced slip uses the line above).
- Final reason after all collected: `Collecting reasons is not a valid grievance.`
- Lap 6+ rare reason: `Rejected. This reason has never been used before and will be unusable by tomorrow.`
- Combined spam slip: `Rejected, collectively, with feeling.`
- Brenda's apologetic slip (Warm Stamp): `Sorry about the stamp. It has had a day. -B`

### 16.6 Remedy bank (impossible remedies, shown as `Remedy: ...`)
- `Remedy: please resubmit this complaint before you submitted it.`
- `Remedy: obtain Form 27B/7 (destroyed 1998) and attach it to Form 27B/6.`
- `Remedy: have the problem occur to someone who is allowed to have it.`
- `Remedy: return to Window 4 by way of Window 4.`
- `Remedy: stand 11 cm to the left of where you are standing. We will know.`
- `Remedy: wait for the reorganization to finish. It has been scheduled for the reorganization.`
- `Remedy: be a different complainant, ideally one with a stamp.`
- `Remedy: write the complaint again, in the order it happened to the other person.`
- `Remedy: seek advice from the Department of Advice, which will refer you here.`
- `Remedy: stop having the problem, in triplicate.`

### 16.7 Clause titles (`%CTITLE`, bag)
`Statements of the Obvious` / `Adjectives, Excessive` / `Verbs, Unreasonable` / `Feelings, Unfiled` / `Punctuation, Hopeful` / `Grievances, Provisional` / `Capitals, Presumptuous` / `Nouns of Assembly` / `Opinions, Unaccompanied` / `Sighs, Written`

### 16.8 Sign-offs
Full `We apologize for the inconvenience of being right.` / short `We apologize for being right.` / tiny `Apologies.` / dot `.` / Rock none.

### 16.9 Management reactions to weird behavior (misc)
- Reaction to a very fast complaint (< 1s): `That was very fast. The complaint did not have time to be written. It has been rejected for being unwritten.`
- Reaction to a very long idle at the slip: `Your rejection has been waiting. It has begun to feel unwanted. Please escalate it, or at least say something kind.`
- Reaction to pressing ESCALATE three times in under 3s: `Please be patient. The building is only so tall.`
- Reaction to ACCEPT decoy trap: see 8.2.
- When the player clicks a floor in the building: `You may not skip ahead. You may, however, look ahead.`
- Reaction to clicking Window 4: `Window 4 is a drawing. Please do not knock on a drawing. It is rude, and also it has no door.`
- When the player first sees the thermometer rise: `Satisfaction Index: up 0.3 degrees. Per policy, this is the wrong direction, and so the right one.`

### 16.10 Meh and awards narration
- Fractional award note: `You have been awarded 0.5 Meh for your rejection. A rejection is a kind of attendance.`
- Lap award: `Lap complete. 5 Meh. The elevator is still a rumor. You took the stairs of hope.`

### 16.11 Brenda sandwich and Rock lines
Already in 7.1 and 7.13.

### 16.12 Global lines contributed via `P.addLines` (each category 3-6 lines)
`ticker`:
- `POINTLESS NEWS: Department of Complaints reports record rejection rate. The rate was rejected.`
- `POINTLESS NEWS: A rock has been promoted. The promotion was rejected by a smaller rock.`
- `POINTLESS NEWS: Window 4 acquires a tiny cat. The cat is a drawing and has asked for nothing.`
- `POINTLESS NEWS: Sandra from Compliance has cited someone. Sandra will not say who. Sandra has said who.`
- `POINTLESS NEWS: Brenda's sandwich 'going well', says Brenda.`
- `POINTLESS NEWS: Floor 7 1/2 confirmed. Floor 7 1/2 declined to comment on whether it exists.`

`moduleEnter` (read by the lobby when entering any module; the module may also say these itself on mount): 
- `You are entering the Department of Complaints. Please have your grievance ready, in the pluperfect.`
- `Brenda has seen you coming. Brenda has already rejected you. It was for your convenience.`

`moduleExit`:
- `You have left the Department of Complaints. Your complaint remains, pending.`
- `Brenda waves. She has never waved. It was a small adjustment of the sandwich.`
- `Exit noted. Exit rejected. Exit permitted, on a technicality.`

## 17. Implementation hints [MUST read]

- **File skeleton** (in order): header comment `/* POINTLESS module: complaints-dept */` -> IIFE -> constants and content banks (as plain arrays) -> helpers (`bag`, `fill`, `analyze`, `extractQuote`, `clauseFor`, `fmtHalf`) -> `P.injectCSS(...)` -> `P.addAchievements` -> `P.addLines` -> `P.registerModule({ ..., mount(root, api){...} })`. All mutable state lives inside `mount` (so remounting 20 times is clean); the content banks and CSS are module-level and immutable. Bags must be created inside `mount` (state per mount) from the module-level arrays.
- **Phase machine**: write `go(phase, data)` that increments `S.runId`, clears per-phase timers, renders the stage by phase. Use a single `render*()` function per phase that builds DOM with `api.el` into the stage and replaces its children (so DOM never grows). Keep the Paper Trail via `unshift` and `slice(0,6)`.
- **Timers**: never use window `setTimeout/setInterval`. Use `api.setTimeout/api.setInterval`. Create a local `later(ms, fn)` that wraps `api.setTimeout`, pushes the id into `S.timers`, and checks `id !== S.runId` on firing. Idle uses one `api.setInterval(tick, 1000)` that reads `api.now()` deltas (not counters) and fires at most one idle stage per tick.
- **Listeners**: `api.on(root, 'keydown', ...)` (for hotkeys; ignore if `e.target` is `INPUT/TEXTAREA/SELECT` unless the key is Enter/Escape in the textarea; ignore ctrl/meta/alt except Ctrl+Enter), `api.on(root, 'pointerdown', resetIdle)`, `api.on(window, 'resize', onResize)`. The vane uses `api.on(zone, 'pointermove', ...)`.
- **Selftest shortening**: define `const T = api.selftest ? 0.1 : 1` and multiply the ceremony, rung autos, queue wait, Rock countdown, Printing, Cooling, idle thresholds (use `/30` under selftest for the 45/90/150/180s idle stages so the harness can see them; the 600s Rock memo is skipped under selftest), manager calendar etc. Keep the 20s auto-resolve at 3s.
- **Fuzz friendliness**: every phase needs a visible interactive element at all times: INTAKE has the textarea and Submit; CEREMONY has the strip button; SLIP has ESCALATE; rungs have their buttons; ROCK has the Rock (clickable) and the CERT screen has the Continue button. Phases where inputs are disabled (COOLING, Tuesday freeze, Rock countdown) are time-bounded and `disabled` is cleared on phase change. A random click on a rung button should always advance or at least be harmless; random clicks on the decoy should never throw.
- **Awards cadence**: `api.award` on every slip, `api.say` on every phase change (priority 0, except specials priority 1-2), `api.stat.inc` on every action. The harness fails a module that never awards or never speaks, so the first slip must award and say.
- **Say discipline**: never queue more than 2 `api.say` calls within a second. Use `duration` for the long Brenda/Gerald lines (about 5000ms). Use `{who:'Brenda'}`, `{who:'Gerald'}`, `{who:'The Rock'}`, `{mood:'panic'}` for the acceptance and spam alerts, `{mood:'smug'}` for the decoy, `{mood:'confused'}` for the Mirror, `{mood:'proud'}` for the certificate, `{mood:'disappointed'}` for the Rock.
- **Matcher code sketch** (keep it this small):

```js
function analyze(raw, ctx) {
  const t = raw.trim(), lower = t.toLowerCase();
  const words = t ? t.split(/\s+/) : [];
  const letters = t.replace(/[^a-z]/gi, '');
  const upper = letters.replace(/[^A-Z]/g, '').length;
  return {
    t, lower, words, n: words.length, chars: t.length,
    empty: !t, tiny: t.length > 0 && t.length <= 3, short: words.length === 1 && t.length > 3,
    caps: letters.length >= 4 && upper / letters.length >= 0.6,
    lowerOnly: t.length >= 8 && t === lower,
    bang: /!/.test(t), question: /\?/.test(t),
    // ...every key in 6.4 ...
  };
}
```
  and `pickReason(f, ctx)` iterates the priority array: `for (const key of ORDER) if (f[key] && BANKS[key] && key !== ctx.lastKey) return {key, text: BANKS[key].next()}`; then the 50/50 fallback. Always run `fill()` on the final string. `isPrime(n)` is a 6-line loop.
- **Quote extraction**: `const toks = t.split(/\s+/); const i = hit >= 0 ? Math.max(0, hit - 1) : api.randInt(0, Math.max(0, toks.length - 3)); const frag = toks.slice(i, i + (toks.length > 5 ? 3 : toks.length)).join(' ').replace(/^[^\w']+|[^\w'.!?]+$/g, '').slice(0, 40);`; if `frag` is empty return `''` and the line template falls back to the empty clause line. Wrap with `"` + frag + `"`.
- **Decoy placement**: absolutely positioned inside the slip container (`position:relative; overflow:hidden`) so a dodge cannot create page scroll; compute the offset with `api.randInt` clamped to `container.clientWidth - btn.offsetWidth`.
- **Stamp animation**: add a class and remove it on `animationend` (also with a 600ms fallback timeout via `later`) so reduced-motion and hidden tabs never leave a stuck state.
- **SVG filter id**: `cd-rough` must be inside the root's own inline SVG; when the module remounts the old root is gone, so no duplicate-id conflict. Skip the filter if `api.selftest`.
- **Emoji detection**: `new RegExp('\\p{Extended_Pictographic}','u')` inside try/catch (older engines throw); fallback test `/[←-⯿\uD83C-\uDBFF]/`.
- **Ladder rendering**: derive floors from the `ladder` array each time the position changes (cap 20). Do not mutate the base array in place; the lap insertion creates a new array with `splice` on a copy.
- **Saving**: wrap `api.save.get/set` in try/catch helpers (`loadSave()` merges onto defaults, and unknown keys are ignored).
- **Lint reminders**: no bare `setTimeout`, no `fetch`, no `eval`, no `alert/confirm/prompt`, no `http(s)://` text, no `window.open`, no `import `. Forbidden visible strings: `NaN`, `undefined`, `null`, `[object Object]` (none of the lines above contain them; do not print a `null` object field; `fmtHalf` must always return a string).
- **Line budget** (<= 1800 lines): content banks about 450 (long single-line strings are fine), CSS about 230, engine core about 330, rungs about 520, secrets and idle and spam about 220. Verify with `node tools/lint.js games/complaints-dept.js`.

## 18. Risks: the 5 most likely implementation bugs

1. **Stale timers and double-fire in the phase machine.** Ceremony timers firing after a skip, Escape or destroy; ESCALATE and the rung's auto-resolve both calling `done()`; a rung's `done()` called twice (click + auto at the same instant); idle timers firing while not in INTAKE. Mitigation: `S.runId` guard on every callback, a `finished` flag per rung, `S.phase` checks on all button handlers, all timers managed and cleared on phase change and in `destroy`. Test by pressing Enter+click, Space, and Escape at random moments (the fuzz harness will).
2. **Keyboard hotkeys colliding with typing and focus.** `E`, `R`, digits 1-9, Space and Escape intercepted while typing in the textarea or in rung 4 and rung 12 inputs; Space skipping the ceremony also activating a focused button; Enter submitting when the textarea is empty and focus has moved; digit keys picking rung options while the intern rung is not active. Mitigation: one central `keydown` handler that checks `e.target.closest('input,textarea,select')` first and the current phase second; hotkeys only in explicit phases; never `preventDefault` on keys the browser needs inside a text control.
3. **Matcher and token bugs producing ugly text.** `%QQ` or `%NUM` unreplaced in a line; `NaN` word counts; empty complaints producing an empty quote (`""` that reads as a bug); `extractQuote` returning stray punctuation; the same line twice in a row; shuffle bags that throw when a bank is empty or run out mid-pick; `\p{Extended_Pictographic}` crashing on regex compile; prime check on 0/1; leaking the literal words `null`/`undefined`; `%` characters typed by the player breaking `fill()` (sanitize `%` in the player's quote and answers before substitution). Mitigation: a `fill()` safety net, unit-check `analyze` with `''`, `'a'`, `'HELLO!!'`, `'?!'`, a 200-char paste, emoji-only text, and text containing `%QQ`, and test that every bank line has only known tokens by scanning at mount in `?selftest` mode (log nothing, just drop unknown tokens).
4. **Fuzz-harness failures: DOM growth, leaks, and unreachable rungs.** The Paper Trail, Case File, Mirror frames, confetti spans, grey-dot spans, staples, passenger-rock decorations or siren clones accumulating without a cap; intervals created by idle/spam/vane/queue surviving destroy; a rung that random clicks can never finish (the vane needs thousands of pointer events, the queue needs a button, Tuesday's input needs a submit) so the harness dead-ends; the 20s auto-resolve being too long for virtual time. Mitigation: cap every list (6 / 40 / 8 / 20), re-render by replacing children, every rung has an `auto` timer (3s under selftest) and at least one button that completes it, every interval via `api.setInterval`, and a final check that `root.querySelectorAll('*').length` stays flat across laps by running `node tools/selftest.js complaints-dept --steps 1500 --seed 7`.
5. **Layout and CSS-prefix problems at 360px.** Horizontal scroll from the Committee table, the nested Mirror frames, the building ladder or the dodging decoy button positioned outside the slip; z-index leaks (siren, hat follower, dark overlay) escaping the module; `position: fixed` follower for the hat covering the Lobby; class names missing the `m-complaints-dept-` prefix (the lint tool rejects them; a short JS helper that builds names at runtime can hide a missing prefix from the lint but not from reviewers: keep the CSS selectors literal); `mix-blend-mode` and `mask` looking flat on cream in some browsers; the stamp filter making text unreadable. Mitigation: root `overflow-x: hidden` inside the module, every absolutely positioned child constrained to a `position:relative; overflow:hidden` container, the hat follower is `position:absolute` inside the stage, a screenshot at 360 and 1400 via `node tools/shot.js complaints-dept --width 360` before declaring done.

Honorable mentions (do these too): lap insertion indexing (mutating the ladder array while rung ids are held by index); the 7-click Rock detection forgetting to reset its timer; `api.award` called with a negative number outside the surcharge (engine clamps, but the floating "-0.5" text must still read fine); persistence of `decoyStage` and `firstComplaint` surviving a corrupted save.

## 19. Cut order if you run out of lines (and what was already cut)

Drop in this order, keeping the module whole: (1) canvas sparkline, (2) Secret 8 The Manager, (3) the "half a word" textarea gag (Gag 6 beyond the Stapler line and numerology), (4) Dennis corner click and Rung 11's hat-follows-pointer (keep the button and the three tips), (5) the Case File drawer UI (keep the ring buffer for callbacks), (6) Tier 3 spam (security man), (7) Secret 5 `>1200` wide line, (8) Mirror zoom animation (keep the 8 depth lines), (9) survey stars (keep the response line on a single Skip). Never cut: the matcher with quote-back, Sandra's counter, the 13 rungs with their interactions (each can be a minimal version of the interaction), the Rock countdown, the certificate and "Next.", the idle and spam hooks, the decoy, and at least 6 achievements with 2 secret.

Already cut from the pitches (do not build): dragging the complaint paper onto desks (replaced by clicking), the long-press stamp, device-tilt input for the Weather Vane (use pointer and keys), the Moon rung and its "tap the sun" fast-forward, the Suggestion Box rung, the Jar of Buttons rung, the 14th "The Manager" as a permanent rung (it is only a special scene), a procedural Committee reshuffle of the ladder each lap (the ladder only gains rungs), true `offset-path` elevator animation, per-letter typewriter slip printing (the slip prints with a clip-path reveal instead), Pitch 1's fully separate Satisfaction units per rung (units change per lap only), and the "Rush Hour Surcharge" as a real negative balance (the engine clamps at 0, so it is a joke only).
