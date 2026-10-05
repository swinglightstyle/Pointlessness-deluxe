# DESIGN BRIEF: THE TYPING POOL  (module id: `typing-pool`)

File to build: `games/typing-pool.js` (single file, classic script, <= ~1800 lines, obeys SPEC.md section 5 and VOICE.md). Register with: id `typing-pool`, title `The Typing Pool`, tagline `Type exactly as shown. Be scored exactly as unshown.`, icon `⌨️`, category `department`, unlockCost `0`, tags `['typing','memos','committee']`. In `mount` call `api.setTitle('Typing Pool (Desk 7 1/2)')`. Dev URL: `index.html?dev=typing-pool`, fuzz: `node tools/selftest.js typing-pool`.

This brief merges three writer pitches. It is self-contained: a builder who reads SPEC.md, VOICE.md and this file can build the whole module. All text in sections 9 and 10 is VERBATIM and final (the builder may fix a typo, never rewrite a joke). Placeholders are written `%like_this%` (NOT braces, because SPEC lint flags unknown `{tokens}`); replace them with a helper `fill(str, {typo: 'teh'})` doing `split('%typo%').join(value)` BEFORE calling `api.say` / showing text.

---

## 0. THE ONE-PARAGRAPH VERSION

You are the Typist at Desk 7 1/2 of a literal typing pool (water, ducks, other typists on floats). A memo sits on a typewriter in faint grey ghost ink. You overtype it, character by character, on a real typewriter model: errors do not block you (they pile up in coral), Enter is the carriage return, the bell rings at column 30, correction tape is a limited 40 mm roll. When the last line is returned the paper is yanked out and a SCORE SLIP prints. Then a COMMITTEE re-scores the slip with rubber stamps, each stamp crossing out the last number and giving a reason, and the final stamp is ALWAYS `FINAL (PROVISIONAL): 7 1/2`, whatever you typed, forever, and nobody ever confirms why. Around that: a union-mandated stapler pause where staying still is the only way to earn Meh, a typing-pool that physically rises with every memo you file, memos that start quoting your own typos back at you as official terminology, memos that start replying to each other, memos from the Toaster, a plant and the Pool itself, and at about minute 10 a sincere, five-carriage apology from the Stapler. Then the first memo returns, word for word (plus six words), and it was the apology all along.

First joke with zero input: a score slip is ALREADY hanging from the machine reading `SCORE: 9.1 (PENDING, PREVIOUSLY)`, memo 1 is already on the paper (`Dear Valued Employee, This letter confirms receipt of your previous letter, which confirmed receipt of this one.`), and at second 3 the carriage bell rings by itself.

---

## 1. WHAT WAS KEPT AND CUT (so the builder does not resurrect cut ideas)

KEPT: overtype-the-ghost core loop with per-keystroke strike feel; 34-column lines, carriage return, margin bell at column 30, Premature Return, Pile-On; 40 mm correction tape with the 12 s "request more tape" lockout; score slip then stamped re-scores that always end at 7 1/2; Appeal (0.5 Meh fee); Committee growing from One to Three (Clive, Marguerite, Mr. Gray) plus the Subcommittee for Second Opinions, Meta-scoring and the Subcommittee of 7 1/2; changing score units ending in 7 1/2; Disagreement Index fixed at 7 1/2%; the pre-printed `9.1 (PENDING, PREVIOUSLY)` slip and the self-ringing bell; Union-Mandated Stapler Pause (waiting pays, typing is scab typing); Approved Variants (your worst typo becomes terminology) and the Ratified Typo secret; Re: chain collapsing to `Re^9`; the A/B reply memo with colored margin tabs; Sandra's tracked changes and flags ahead of the caret; the rising pool with a duck/lifeguard/tie/WET FLOOR schedule; cc: line that gains an absurd recipient each memo; the Attachment paperclip gag; cameo memos (Gerald, Toaster, Dennis, Fax Room, Missing Sock, Sandra red-line, Pool); Pauline's idle takeover ladder; typebar tangle on spam with untangle clicks and a duck rescue; Perfect Memo suspicion, Blind Memo; paste/escape/eraser gags; DICTAPHONE/AUTOTYPE fallback for keyboard-less touch players; the lasagna Wrong Memo; the Stapler's apology in five carriages; the not-ending loop.

CUT as weak or unbuildable in one vanilla file (do not build): a literal second sheet of paper / two-paper tab mode (the A/B conversation lives on ONE sheet with colored margin tabs); per-word span optimization (we render per LINE with run-grouped spans, see 5.2); Letter of the Day; typewriter-on-vacation shifted-keys mode; ribbon-fade click minigame; Dispute Wall corkboard; voicemail scoring; feTurbulence stamp edges; draggable carriage lever; 5-desk pool layout; memos-on-holiday memos; live re-wrap of the memo when the window narrows (the narrow-window gag is cosmetic only); "Erasure Fee" on backspace; 40x40x40 memo pools (we ship the smaller pools in section 9 and the generator still never repeats a combination back to back).

If the line budget gets tight, cut in this order: Sandra flags (keep tracked changes), carbon copy rare event, Blind Memo, post-it rotation, lamp flicker, Employee-of-the-Month frame, sock/fax filler memos, typebar fan animation (keep key press), Dictaphone HOLD (keep tap). NEVER cut: typing core, return/bell/tape, slip + stamps + 7 1/2, appeal, stapler pause, pool rise, approved variants, cc line, idle ladder, spam tangle, apology, the not-ending loop.

---

## 2. SCREEN LAYOUT

Root: `div.m-typing-pool-wrap` (`position:relative; overflow:hidden; min-height:420px; container-type:inline-size`), cream background `#FFF6DC` with a faint dotted texture. Content is a CSS grid; the **water layer and ducks** are absolutely positioned decoration with `pointer-events:none` (except the four typist float BUTTONS and the duck, which are real buttons inside a static pool strip).

```
+----------------------------------------------------------------------------------+
| [desk plate: TYPIST - DESK 7 1/2 | Typist (Probationary)]   [post-it]   [lamp]     |
+--------------------------------------------------+-------------------------------+
|  MEMORANDUM paper (cream, ruled, ghost ink)      |  SCORE SLIP (thermal strip)   |
|   TO / FROM / RE / MEMO NO.                      |   SPEED / ACCURACY / POSTURE  |
|   line 1 ................ [A] ....... (bell)     |   FIRST SCORE                 |
|   line 2 ....                                    |   [stamps pile, max 6]        |
|   ...                                            |   final line                  |
|   cc: Dennis (Plant)           [paperclip]       +-------------------------------+
|  status line (aria-live) under paper             |  COMMITTEE bench (3 emoji     |
|  [tape roll SVG 40mm]  [margin BELL button]      |   heads) + Disagreement Index |
+--------------------------------------------------+  OUTBOX tray (count) | ALSO   |
|  TYPEWRITER SVG (platen, 26 keys, 7 type bars)   |  Stapler banner (when active) |
+--------------------------------------------------+-------------------------------+
| [RETURN lever] [TAPE] [BELL] [DICTAPHONE] [FILE AS IS] [APPEAL] [STAMP IT YOURSELF] |
+----------------------------------------------------------------------------------+
| POOL STRIP: water base, floats with 4 typists, ducks, lifeguard chair, WET FLOOR   |
+----------------------------------------------------------------------------------+
(rising water = absolute layer anchored bottom, height = pool level % of root)
```

- Desktop (>= 720px wide): two columns, paper + typewriter left (about 64%), slip/committee/outbox right (36%).
- 520-720px: single column in this order: paper, typewriter, buttons row, slip, committee, outbox.
- Under 520px: paper full width, buttons become a wrapping row of >= 44px buttons, typewriter SVG type bars hidden (`display:none` on the fan), pool strip shrinks to 48px, committee collapses to a single line.
- Paper font: `'Courier New', Courier, monospace`, size via container query units so 34 columns always fit: `font-size: clamp(11px, 3.1cqw, 16px)` on the paper (fallback fixed 13px). 34 columns never wrap (`white-space:pre`).
- Every control is a real `<button>` (aria-label on icon-only ones), >= 44px tall on coarse pointers, 3px `#264a8c` focus ring with 2px offset. No hover-only UI.
- DOM budget: under 700 elements total. The paper uses run-grouped spans (5.2), so the memo costs about 60 nodes, not 400.
- One `div[role=status][aria-live=polite]` under the paper, `.m-typing-pool-strip`, is the "Management strip": all the small situational reactions go here (so `api.say` is not flooded); stamp results are repeated here in plain text.

CSS class prefix is `m-typing-pool-` everywhere (including `@keyframes m-typing-pool-...`, and reduced-motion selectors like `.pm-reduce-motion .m-typing-pool-water`).

---

## 3. CONTROLS AND EXACT INTERACTIONS

### 3.1 The one input element
A real `<input type="text" class="m-typing-pool-in" aria-label="Typewriter keyboard">`, `font-size:16px` (no mobile zoom), `autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false"`, positioned absolutely over the paper body (`opacity:.01`, NOT display:none, NOT visibility:hidden), child of `.m-typing-pool-paperwrap` so `:focus-within` draws the paper's focus ring. Auto-focus on mount and on any pointer click on the paper or typewriter. After a MOUSE/TOUCH click (event.detail > 0) on any action button, return focus to the input; after a KEYBOARD activation (detail 0) leave focus on the button so keyboard users can navigate.

The input value is a SENTINEL: keep `input.value = '​'` (zero-width space) with the caret at the end, reset after every handled event. Two input paths, no duplication:

1. `keydown` (desktop): ignore if `e.ctrlKey || e.altKey || e.metaKey` (never preventDefault those; Ctrl+Z gets its gag, see 3.7). If `e.key.length === 1` (printable, incl. space): `preventDefault()` and call `typeChar(e.key, 'you')`. `Enter`: `preventDefault()`, `doReturn()`. `Backspace`: `preventDefault()`, `doTape()`. `Escape`: `onEscape()`. `Tab`: native. `Process`/`Dead`/`Unidentified`/`isComposing`: do nothing here (the input path handles it).
2. `input` event (mobile soft keyboards, IME, fuzz harness): `v = input.value`. If `v` does not contain the sentinel and is empty -> `doTape()` (soft Backspace). Else `ins = v.split('​').join('')`; for each char of `ins` (cap 40 per event) call `typeChar(c,'you')`. Finally reset `input.value = '​'`.
3. A document-level `keydown` (via `api.on(document,...)`): if the event target is `body`/`html` or a non-interactive element inside root, no modifiers, and the key is printable/Enter/Backspace/Escape, focus the input and run the same keydown handler. Never hijack keys when the target is a `button`, `select`, `a`, or another input. Ignore the grave accent (the engine's boss key).
4. `paste` / `drop` / `cut` on the input AND on the paper: `preventDefault()` and run the paste gag bag (section 10, `paste`). Attempts counted in `api.save` (`paste`), never a failure state.

### 3.2 Keys and buttons
| Control | Does |
|---|---|
| Printable key / tap | Types the next character. Right = ink, wrong = coral. NOTHING BLOCKS: a wrong character still advances the caret (like a real typewriter). |
| Enter / **RETURN** (brass lever button) | Carriage return (see 3.4). During SLIP/VERDICT/BETWEEN it skips ahead to the next memo. |
| Backspace / **TAPE** button | Correction tape (see 3.5). |
| Esc | "Lift your hands" (section 11, Escape). No state change. 7 presses in 4 s closes the lid. |
| **BELL** (real button at the right margin) | Dings the bell by hand (3.6). |
| **DICTAPHONE (UNSUPERVISED)** | Touch fallback (3.8). Tap = next 3 characters; hold repeats. |
| **FILE AS IS** | Appears after memo 1 is done. Submits the memo immediately, skipping all remaining text (counts as skipped). Also the guaranteed way out of any memo. |
| **APPEAL** | Appears on the slip after memo 2's verdict (4.1). |
| **STAMP IT YOURSELF** | Appears from story memo 11 (section 8). |
| Paperclip (pinned to the paper corner) | The Attachment gag (3.9). |
| Outbox tray | Opens/closes the read-only archive of the last 6 memos (3.10). |
| Pool typists / duck | Click for one line each (3.11). |

### 3.3 Typing a character: `typeChar(c, src)`  (src = 'you' | 'pauline' | 'dict')
Let `L = lines[cur]`, `col = typed[cur].length`.
- Guard: phases other than TYPING/IDLE (see 6) -> if `src==='you'` and phase is SLIP/VERDICT/BETWEEN: call `skipToNextMemo()` then type the character into the new memo; if phase is LID/ENDING-lock: drop it.
- First key of a memo: phase IDLE -> TYPING, record `startedAt = api.now()`.
- If `col < L.t.length`: append `c` to `typed[cur]` and `srcs[cur]`. Correct if `c === L.t[col]`, else wrong. Correct -> `api.sfx('tick')` (throttled: max one per 45 ms); wrong -> `api.sfx('blip')` (throttled 80 ms). Key press animation (3.12). Carriage nudge: `--m-typing-pool-nudge` = `-(col+1)px` (accumulates, max -34px).
- If `col === 30 && L.t.length >= 31`: ring the margin bell (3.6) automatically (`api.sfx('bell')`, `bellCount++`, stat).
- If `col >= L.t.length`: PILE-ON. `pile[cur]++` (cap 20). Render an ink smear at the last column (`▒`). Counts as one error. Strip line from `pile` bag the first time per line.
- After every change call `renderLine(cur)` only.
- Spam window bookkeeping (section 12).

### 3.4 Carriage return: `doReturn()`
- Always legal. If `col >= L.t.length` (line complete, with or without pile): clean return. `api.sfx('ding')`. If `pile[cur] > 0` also play a whip-slide (carriage transition class) and the pile line from `pile` bag. First clean return ever: achievement `typing-pool.first`. If the line had zero errors: `cleanLines++`, strip line from `cleanLine` bag (1 in 3).
- If `col < L.t.length`: PREMATURE RETURN. The rest of the line is marked skipped (grey with red strike), `skipped += (len - col)`, a small red tick appears in the margin, `api.sfx('buzz')` is NOT used (too harsh): use `api.sfx('boing')` (the clunk). Strip line from `premature` bag (first one ever is the fixed line). `prematureCount++`.
- Then `cur++`. Carriage slides back: `translateX` transition with a spring overshoot, `cubic-bezier(.2,1.6,.4,1)`, 500 ms (selftest 60 ms) and the nudge resets to 0. If `cur >= lines.length`: `finishMemo()`.
- Enter spam: 8 Enters in 2 s -> JAM (section 12).

### 3.5 Correction tape: `doTape()`
- Roll starts at 40 mm each session lap and is shown as an SVG spiral circle whose inner radius grows as tape thins, plus a small number `NN mm`.
- If the current line has typed characters and tape > 0: remove the last typed char (it goes back to ghost), `tape--`, flash a white strip over that character for 450 ms (a `taped` class on the run, cleared by ONE managed timeout that is reset each time), `api.sfx('pop')`. First tape use ever: fixed explanation line (`tape` bag, line 1). Every 8th use a strip line.
- If `col === 0`: nothing is removed; strip line `tapeCol0`.
- If tape reaches 0: Backspace "files a request": TAPE button disabled showing a progress ring for 12 s (selftest 1.5 s); during that Backspace does nothing except the strip line `tapeWait`. A toast says `Form 27B/%form%` where `form` = `6 + tapeForms` (tapeForms is saved and increments per request, so the first is 27B/6 and the second 27B/7; when `form` is 7 use the special `tapeEmpty` line 3). When the ring ends the roll refills to 40 mm and strip line `tapeRefill`. Achievement `typing-pool.tape` when the lockout is first completed.
- 40 consecutive Backspaces with NO typed character in between: Eraser Guild secret (section 11).

### 3.6 Margin bell
Rings (sfx `bell`, bell SVG shakes with a CSS keyframe, `bellCount++`, `api.stat.inc('typing-pool.bell')`) when the caret reaches column 30 of a line with >= 31 characters. First ring ever: `bellFirst` line. At 50 total rings (saved): plaque line and achievement. Clicking the BELL button dings by hand (`api.sfx('ding')`, strip line from `bellClick` bag). 12 clicks within 6 s: BELL FATIGUE: the ding becomes a wooden `tonk` (use `api.sfx('honk')`, the button label changes to `BELL (WOOD)` for 20 s) and the fatigue line fires once.

### 3.7 Other keys
- Tab: normal focus navigation.
- Ctrl+Z (event passes through the keydown guard): strip line `Undo is not a department. Please direct your regrets to the Regrets Desk, which is a drawer.` (verbatim in `misc` bag). Do not preventDefault.
- Typing the word `sandra` (case-insensitive, rolling 6-character buffer of what you typed) -> Name Trap (section 11).
- Typing `gerald` or `potato` during a stapler pause -> Potato Protocol (section 8.3).

### 3.8 DICTAPHONE (touch / keyboard-less fallback)
A real button. Tap: types the next 3 characters of the target at once via `typeChar(c,'dict')`, each with a 15 percent chance of being a deliberate typo (the correct letter replaced by a neighbouring letter). Hold (pointerdown for > 400 ms): repeats 3 characters every 300 ms with `api.setInterval`. Auto-release on `pointerup`, `pointercancel`, `blur`, `lostpointercapture` and `visibilitychange` hidden; hard cap 20 s of hold (then the cap line fires and it releases). Dictated characters render in lilac ink. Any dictated character in a memo changes that memo's slip: SPEED reads `Dictated: n/a` and a slip line `Assisted. Disqualified. Invited to the party.` prints. Dictated memos pay 0.1 Meh only. First use ever: `dict` bag line 1. Never use `setPointerCapture` outside try/catch.

### 3.9 Attachment paperclip
A 📎 button pinned to the paper corner (aria-label `Open attachment`). Click shows the next line from the `attachment` bag in order (a small popover inside the paper area, auto-closes after 4 s or on next click; one element only). After the last ordered line it picks randomly from the final three. While the apology memo (e) is on the paper, the paperclip opens to a CSS heart and the `attachmentHeart` line. Generated memos often say `Please find attached the attachment`, so the gag is typed hundreds of times.

### 3.10 Outbox and archive
Finished memos stack in a CSS tray on the right: stacked sheet divs capped at 12 visible layers, count shown as a number. The tray is a button; click toggles the archive panel, a read-only list of the LAST 6 memos as you typed them: stored as run arrays (`[{t:'text', bad:true|false}]`, merged runs, cap 400 chars per memo) and rendered with one span per run. Keep exactly 6 entries (shift the oldest). Never render archive entries into more than 6 x 40 nodes. Beside the Outbox are an `IN` tray note and a third tray labelled `ALSO` (decor).

### 3.11 Pool clicks
Four typists on floats (Pauline 👩, Marjorie 🧓, Bernard 👨, Dennis (Plant) 🌿) are real buttons; each click makes that typist wave (CSS keyframe) and says the NEXT unused line from the `typist` list (8 lines, once each, shared across the four; Pauline always gets lines 1 and 5 if still unused, Marjorie 6, Dennis 7). After all 8 are used, the `typistDone` line. The duck(s) are one button: `duck` bag. Lines go to the strip (not `api.say`) except line 5-7 which use `api.say`.

### 3.12 Typewriter feel
- Typewriter SVG: body, platen roller with ridges, 26 round letter keys in three QWERTY rows plus a space bar, a fan of 7 type bars (7 curved paths), and a brass lever. On each keystroke the matching key presses down for ~80 ms and one type bar (round-robin index) swings up for ~70 ms. DO NOT use a timer per key: restart the animation by alternating between two keyframe names (`style.animationName = flip ? 'm-typing-pool-kdA' : 'm-typing-pool-kdB'`), both ending in the resting pose with `animation-fill-mode:none`. Cap the whole thing at 12 animations per second (reuse the sfx throttle).
- Typed ink: correct = solid ink `#2B2230` with `text-shadow:0 0 1px` (faint spread) and a 90 ms drop of 1px with overshoot; wrong = coral `#C23B2A`, wavy underline, 2px wobble animation, the EXPECTED letter still shown with the typed (wrong) letter as a tiny superscript (`data-t` attribute and `::after`). Ghost (todo) = `#7a7366`. Dictated/Pauline ink = lilac `#7b5fc4`. Caret = a blinking mustard block (`steps(1)` blink).
- `prefers-reduced-motion` / body class `pm-reduce-motion` (read via `root.closest('.pm-reduce-motion')`): no wobble, no bob, water static, stamps fade in instead of thunking, no carriage slide.

---

## 4. THE SCORE SLIP, THE COMMITTEE, AND THE 7 1/2

### 4.1 Verdict flow after the last line is returned
1. State SLIP: paper whooshes up and out (`api.sfx('whoosh')`, 400 ms). The slip prints from its slot with a translateY ease, line by line: `SPEED`, `ACCURACY`, `POSTURE`, `FIRST SCORE` (about 1.2 s total; selftest 100 ms).
2. State VERDICT: stamps thunk onto the slip one at a time, every 900 ms (selftest 100 ms). Each stamp is a rotated rectangle with a double border and `mix-blend-mode:multiply`, uppercase 800 weight. Landing = scale 1.4 -> 1 in 120 ms plus a 2px shake of the slip only. Each stamp strikes through the previous number (an animated line that grows across it) and writes a new one with a stated reason. `api.sfx('stamp')` per stamp; `api.sfx('sad')` if the number went down, `api.sfx('fanfare')` if it went up (first stamp only), none on the final.
3. The final stamp is ALWAYS `FINAL (PROVISIONAL): 7 1/2` (plus the unit, 4.4). It is never confirmed, never explained. This is the central secret of the module.
4. After the final stamp: buttons appear, `APPEAL` (from memo 2 on) and `NEXT MEMO`. If the player does nothing for 9 s (selftest 600 ms) the next memo rolls in automatically. Pressing Enter or any printable key at any time during SLIP/VERDICT/BETWEEN skips the animation and rolls the next memo in immediately (the printable key is then typed into the new memo). State BETWEEN: next memo rolls in 600 ms (selftest 60 ms).
5. The slip keeps at most 6 stamps in the DOM (older ones fade to 0.2 opacity then are removed).
6. Results are also written in plain text into the aria-live strip: `Score 6.8 for enthusiasm. Score 8.2 for restraint. Final: 7 1/2.`

### 4.2 Scoring math (integers/one decimal only, never NaN)
- `total` = sum of target line lengths (>= 1). `bad` = wrong characters. `skip` = skipped (premature or FILE AS IS). `pile` = pile-on characters.
- `correct = max(0, total - bad - skip)`; `acc = clamp(round(100 * (correct - pile) / total), 0, 100)`.
- `elapsed = max(1, seconds from first keystroke to completion)`; `wpm = clamp(round((correct/5) / (elapsed/60)), 0, 199)`.
- First score: if this is the first memo of lap 1, ALWAYS `9.1` (it was pre-printed on the hanging slip; Management says so). Otherwise `first = clamp(round1(acc*0.07 + min(wpm,100)*0.03), 0.1, 9.9)`. If `acc === 100 && pile === 0 && skip === 0` (a perfect memo) the first-score line reads `SUSPICIOUSLY GOOD (VOID)` instead of a number and perfect handling applies (section 11). If total typed is zero (empty submit), `first = 0.0` and the first stamp reason is `RE-SCORED UPWARD FOR ATTENDANCE`.
- Dictated memo: SPEED line = `Dictated: n/a`. Pauline-completed memo: SPEED = `Typed by Pauline`.
- POSTURE always `Reasonable (not measured)`.
- Number formatting: one helper `n1(x)` = `(isFinite(x) ? x : 0).toFixed(1)`.

### 4.3 Stamp sequences (by story stage, see section 8)
Numbers for non-final stamps: pick from `[1.4, 2.3, 3.4, 4.1, 5.6, 6.8, 8.2, 8.8, 9.4, 9.9]` via a shuffle bag, never equal to the previous number, never within 1.0 of it, never 7.5. Reason words come from the `reasons` bag (stamp text is `RE-SCORED FOR <WORD>`), no immediate repeats.
- Story memos 1-3 (Committee of One): 3 stamps: reason, reason, FINAL. (Memo 1 uses fixed `6.8 / ENTHUSIASM` then `8.2 / RESTRAINT`, both fixed, so the first time reads as a quirk.)
- Story memos 4-8 (Committee of Three): 5 stamps: `CLIVE (TONE)` number, `MARGUERITE (PUNCTUALITY)` = the PREVIOUS memo's first score (or 6.0 if none), `MR. GRAY` = no number, a shrug emoji 😐 and the word `ABSTAINS`, `SUBCOMMITTEE FOR SECOND OPINIONS` = any number that disagrees with whatever is on top, then FINAL. Stamp captions come from the `committee3` bag.
- Story memos 9-12 (Meta): 4 stamps: `COMMITTEE` number, `COMMITTEE ON COMMITTEE SCORING` number, `SUBCOMMITTEE OF 7 1/2` (a tiny list: seven names and a half-name, see `meta` bag), then FINAL. From story memo 11 the STAMP IT YOURSELF button lets the player land one extra stamp that always reads 7 1/2.
- Hush memo and Apology: special (sections 8 and 13).
- Volume 2 and later: 2 stamps: a kind reason from the `kindReasons` bag, then FINAL.
- 7 clean lines in one memo: the final stamp reads `RE-SCORED TO 7 1/2, WITH FEELING`. Perfect memo: reason `RE-SCORED FOR MAKING THE OTHERS LOOK BAD`.
- `Disagreement Index: 7 1/2%` is a permanent small label under the committee bench. It never changes.

### 4.4 Units
From story memo 5, the final stamp's unit changes each memo (cycling a shuffle bag, never the same twice in a row): `out of 10`, `Gallons`, `Bureaucratic Units`, `Hours of Notice`, `Fractions of Tuesday`, `(unit: Thursday)`, `typos per Tuesday`, `Meh-per-minute (not Meh)`. The final stamp text is always `FINAL (PROVISIONAL): 7 1/2 <unit>`. When the unit first changes, Management says `unitChange` line 1. From story memo 8 on, a second line every ~4 memos from `unitChange`. Units never affect the number.

### 4.5 Appeal
Button `APPEAL` on the slip after the final stamp. Pressing it: `api.award(-0.5, 'Appeal Fee')`, `api.sfx('pop')`, `appeals++` (saved), and a NEW stamp lands over the old final: text from the `appealStamp` bag, number always `7 1/2`, a line from the `appeal` bag (counted: 1st fixed, 4th the hat line, 7th the elevator line). Short cooldown of 600 ms. Appeals are capped only by patience: on the 7th and every 7th after, the `appeal7` line; 12 appeal clicks in 4 s is spam (section 12). Achievement `typing-pool.appeal` at 7 appeals.

### 4.6 Self-stamp
From story memo 11, `STAMP IT YOURSELF` lands the player's own stamp (a mint stamp reading `YOUR STAMP`) on the slip. It always reads 7 1/2. Free, pays 0.1 Meh, `selfStamp` bag line. Limited to once per memo by the button disabling (re-enabled on the next memo).

---

## 5. THE MEMO MODEL

### 5.1 Data
```
memo = { id, ord, subject, from, who, noscore, special, segs:[{who:'-'|'A'|'B', text}], marks:[charIdx], variantFooter:bool }
lines = flatten(memo.segs.map(seg => wrap(seg.text, COLS).map(t => ({t, who: seg.who}))))   // COLS = 34
state S.cur = { cur:0 (line index), typed:['' per line], srcs:['' per line], pile:[0 per line], skip:[0 per line], startedAt, autotyped:bool }
```
`wrap(text, cols)`: greedy by words; spaces consumed at a break are dropped (the RETURN replaces the space); lines never have trailing spaces; a word longer than `cols` is hard-broken at `cols`; never produce an empty line. Cap each memo at 300 characters of body plus the cc line (total <= 420). Reject (re-roll) any generated memo over 300 body characters. Text charset is ASCII only. All memo text avoids the words `null`, `undefined`, `NaN`.

Header on the paper (not typed, never part of the target): `MEMORANDUM`, `TO: %name%`, `FROM: <from>`, `RE: <subject>` and `MEMO NO.: <n or 7 1/2>`. `%name%` = `api.player.name` restricted to ASCII letters/space/./'/-, max 14 chars, else `Valued Employee`. `RE:` subject = chain prefix + `Receipt` (or the memo's own subject): ordinal 1 -> `Receipt`; ordinal 2..8 -> `Re: ` repeated (ordinal-1) times then `Receipt`; ordinal >= 9 -> `Re^<ordinal-1>: Receipt`. The collapse to `Re^9` is a Management moment (`reChain` bag). The `%re%` placeholder in memo text equals that prefix string (without `Receipt`).

### 5.2 Rendering (the performance decision)
Do NOT make a span per character. Each line is a `div.m-typing-pool-line` (`white-space:pre`, `data-who`) whose children are RUNS: `renderLine(i)` clears the line and appends run-grouped spans for: typed chars (`ok` or `bad` or lilac source ink), then the caret span (only on the current line), then the ghost remainder (grouped by decoration: plain ghost, `mark` asterisk word, Sandra-changed word, Sandra-flagged word), then a skipped remainder (`skip` style) if the line was returned early, then a pile span (`▒` x min(pile,4)) and the ghost return glyph `↵` when `col >= length`. A wrong char is one span of its own (so it can carry `data-t`). Because every typed char (right or wrong) occupies exactly one monospace cell and we always render the EXPECTED character for it, the typed layer and the ghost remainder flow together in one inline sequence with no overlay. `renderLine` is called only for the changed line. Whole-memo `renderAll()` only on memo start.

Line decoration attributes: `data-who="A|B"` shows a colored margin tab (A = mint, B = lilac) via `::before`; the line holding the caret gets `.m-typing-pool-cur` and for A/B memos a highlighter glow in that speaker's color. `data-was="confirms"` shows a small red `Sandra: struck "confirms"` label above the line via `::before` (the changed word itself is red in the line).

### 5.3 Errors and Approved Variants
At memo completion compute, per line, word ranges from the TARGET (split on spaces). For each word: `badChars` = wrong or skipped characters inside its range. The memo's WORST WORD is the one with the most bad chars (ties: earliest). Its VARIANT is `typed[line].slice(start, end)` if (a) the stripped letters-only version has length 3..12, (b) it differs from the target word case-insensitively, (c) the target word is letters-only after stripping punctuation, (d) it is not an empty string. Keep `typos[]` (plain strings, newest last, no duplicates, cap 20) in `api.save`. `lastTypo` = most recent. `%typo%` always resolves to `lastTypo`, fallback `teh`, and is sanitized to `[A-Za-z]` max 12 chars. Also record `varCount[right + '|' + wrong]` (cap 20 keys; one increment per memo). When one pair reaches 3 (three different memos) the typo is RATIFIED (section 11): `ratified[right] = wrong` (cap 6 pairs). From then on every memo built replaces whole-word case-insensitive occurrences of `right` by `wrong` (preserve a leading capital) BEFORE wrapping.

### 5.4 Memo supply (the story, then the generator)
A `story` pointer walks the fixed list in section 8 / section 9. A story memo is served only when its minimum active-play-seconds for the lap is met (`lapSec >= minSec`, where `lapSec` only counts seconds in which the player acted in the last 20 s; selftest: `minSec * 0.02`). If the player is faster than the schedule, the next memo is a GENERATED filler memo (generator below), so the story arrives on time and nobody can sprint to the apology. The story pointer advances only when a story memo is finished (or FILE AS IS).

Generator: `opener + ' ' + body + ' ' + signoff` (+ cc line unless the memo suppresses it), picked from the pools in section 9 with shuffle bags, rejecting combinations that repeat the previous opener, body or signoff. From story memo 6 on, 35 percent of bodies are replaced by a variant-quote body (only if `typos.length > 0`). In Volume 2+ half the bodies/signoffs come from the kind pools. The cc line grows (section 9.3). `ord` = lap memo ordinal (1-based).

### 5.5 Sandra's tracked changes (story memo 7+, never in memos 9, 10, 13+, 14-19)
When a line is returned: 55 percent chance (35 percent in Volume 2+, max 2 per memo) to mutate ONE future line `j >= cur + 2` that has zero typed characters: pick a word of 4+ letters in it, replace it with a word from `trackedWords` (below) such that the new line is still <= COLS characters, set `lines[j].t`, set `lines[j].was = oldWord`, mark the new word's range as `changed` (red), `renderLine(j)`, strip line from `sandra` bag. Never mutate a line the caret has touched, never change line count. 25 percent of events instead FLAG a word (amber, with a small 🚩 after it): at memo completion, if the flagged word was typed exactly, show the noncompliance line (once per memo). Tracked words: `kindly`, `moist`, `herewith`, `warmly`, `forthwith`, `hereby`, `thereof`, `promptly`, `ficus`, `per policy`.

### 5.6 Blind memo
Rare (section 11). 2 seconds after the memo starts (or at the first keystroke if sooner) add class `.m-typing-pool-blind` to the paper: ghost remainder runs become `color:transparent`, wrong spans hide their expected character (`color:transparent`, keep the red underline and the typed superscript). Enter always finishes. The slip says `The memo has been compared to the same memo, and found to match the memo.`

---

## 6. STATE MACHINE (every timed state has a hard cap; Enter always moves on; no dead ends)

`phase` is one of:
- `IDLE`: memo shown, no key yet. (First keystroke -> TYPING.)
- `TYPING`: typing. (Return on the last line, or FILE AS IS -> `finishMemo()` -> SLIP.)
- `SLIP`: paper out, slip printing (1.2 s; skip with Enter/typing).
- `VERDICT`: stamps landing (every 900 ms; hard cap 8 s total; skip with Enter/typing).
- `BETWEEN`: next memo rolling in (600 ms). Next memo also auto-starts 9 s after the final stamp.
- Overlays/flags that are NOT phases (they can happen during TYPING): `pause` (stapler), `jam` (tangle), `ghost` (Pauline typing), `blind`, `dictHeld`, `lid` (Escape x7: ignore all input for 7.5 s), `hush` (quiet memo).
- `ENDING`: the apology/certificate/return sequence (section 13). Still driven by the same TYPING/SLIP/VERDICT phases with special content; never blocks Enter.

Race guard (important): every memo gets a monotonically increasing `serial`. Every managed timeout/interval created by a memo's stamp sequence, slip printing, auto-advance, pause, Pauline etc. captures `const my = serial` and returns immediately if `my !== serial` or `api.destroyed`. `skipToNextMemo()` increments `serial` and clears the stamp timers (keep their ids in an array and `api.clearTimeout` them).

Persist (`api.save`): `lap`, `story`, `lapMemos`, `memosTotal`, `typos[]`, `varCount{}`, `ratified{}`, `bellCount`, `appeals`, `tapeForms`, `pasteCount`, `ccN`, `played` (total active seconds), `sandraTrap` (bool), `seen{}` (cameo guards). Write on every memo finish and in `destroy`. Under `?selftest` the save is fresh each run.

---

## 7. THE POOL AND THE DESK (decor that reacts)

- One rAF loop via `api.requestAnimationFrame` with delta time (never frame-count): water wave band offset += dt * speed; floats and ducks bob on a sine (`y = sin(t*freq + phase) * 3px`). Skip updates when `document.hidden`. In reduced motion draw once and stop.
- Water rise: after each finished memo `lvl = min(24, lapMemos * 2.4)` (percent of root height) so the ceiling of 24 percent is reached at memo 10. The rise layer is animated with a CSS height transition (700 ms). Management says `2.4 percent`. When `lvl >= 8` the bottom 20 percent of the paper gets a damp overlay (`::after` radial/linear water-stain gradient plus `opacity:.85`; NO `filter: blur` on large areas, it is slow). At `lvl === 24` the water touches the desk edge.
- Pool schedule by finished lap memo number `k`:
  - k=1: one duck. Calm. (initial state)
  - k=2: the Employee-of-the-Month frame (a 🖼️ with a duck in it) hangs on the desk wall.
  - k=3: lifeguard duck on a CSS chair holding a whistle it does not blow.
  - k=4: a second duck.
  - k=5: a duck in a tie (CSS tie triangle).
  - k=7: ⚠️ WET FLOOR sign floats in; the desk lamp flickers once (CSS opacity keyframe).
  - k=9: the frame floats away (translate off to the right, 4 s).
  - k=10: the water is at the desk; the ducks climb to the desk edge and face the paper; the frame returns (floats back in).
  - Each change fires its Management/strip line from the `poolStage` list (section 10).
- Typists on floats (4 emoji people on rectangle floats with tiny SVG typewriters) bob out of phase; they `still` (no bob) during the Hush memo and for 4 s during the ending hold (the only time the ducks stop).
- Small details (cheap, delightful): desk plate with the evolving title (10.34); a post-it that changes its text every 3 memos (10.36); a coffee ring on the desk that moves 1px each memo; a union newsletter line under the desk lamp, one per stoppage (10.18). All decor is non-interactive (plain text/CSS) except the four typists, the duck, the outbox tray and the paperclip, which are real buttons.

---

## 8. ESCALATION: THE STORY TIMELINE (about 10 minutes at a typical pace)

Target minutes are for orientation; the real gate is `story` order + `minSec` (active seconds into the lap). `ord` increments for every memo (including fillers).

| # | Story memo | minSec | What is new that the player meets |
|---|---|---|---|
| 1 | THE RECEIPT (memo 1 text) | 0 | Pre-printed slip hangs (`SCORE: 9.1 (PENDING, PREVIOUSLY)`), bell rings by itself at 3 s, first key = `A bold opening`, slip says 9.1 (fixed), 3 stamps, FINAL 7 1/2 reads as a quirk, one duck. |
| 2 | FURTHER TO | 40 | The Re-Score is established; APPEAL button appears after this verdict; FILE AS IS appears. Tape/bell/premature/pile explained by whenever-they-first-happen lines (event-driven, not gated). |
| 3 | THE ENCLOSURE | 90 | cc: line begins (`cc: Dennis (Plant)`); paperclip gag becomes visible; lifeguard duck. **Stapler pauses unlock** (first pause 25 s into this memo). |
| 4 | RECIEVE (deliberate typo, shown with an asterisk) | 140 | **Committee of Three** (Clive, Marguerite, Mr. Gray, Subcommittee). Footer `(typed exactly as shown)`. |
| 5 | RE: RE: RECEIPT | 190 | **Units start changing**; the Re: chain; duck in a tie. |
| 6 | YOUR TYPO, QUOTED | 240 | **Approved Variants**: the memo quotes `%typo%` back at you; Terminology Adopted slip line; pool typists whisper it; Blind Memo and the lasagna can start appearing in fillers. |
| 7 | A REPLIES TO B | 290 | **A/B reply memo** with colored margin tabs; **Sandra's tracked changes** begin; WET FLOOR; lamp flickers. |
| 8 | GERALD / A POTATO (UNMET) | 340 | Cameo memo; Gerald is not scored; `Re^9` collapse likely here; Subcommittee on Variants quotes a variant of a variant (subject line in capitals). |
| 9 | THE TOASTER | 390 | **Meta-scoring** begins; units go fully absurd; frame floats away. |
| 10 | DENNIS (PLANT) | 430 | One-word memo. cc line is longer than the memo. |
| 11 | SANDRA'S RED-LINE | 470 | Red-lined memo typed as marked up (including 'moist'); **STAMP IT YOURSELF** appears. |
| 12 | THE POOL WRITES | 510 | Memo from the Pool itself; if fax-machine stat > 0 a Fax Room memo is injected as 12b; if flag sockSeen a Sock status memo is injected as 12c (each once ever). Water reaches the desk at 24 percent. |
| 13 | NO SCORE. JUST TYPE. (HUSH) | 550 | THE QUIET PART: committee recesses, pool stops, slip prints `No score. Just type.`, bell rings once softly. No stapler pause, no tracked changes, no cc, no fee, rewards unchanged in size. |
| 14-18 | THE STAPLER'S APOLOGY a, b, c, d, e | 590 | Five short carriages, one paragraph each, each ends with a soft bell and the strip line `Received.` No scoring. |
| 19 | THE CERTIFICATE | immediate | Typed certificate. See section 13. |
| 20 | MEMO 1 RETURNS (memo 14 in the old numbering) | immediate | The loop. See section 13. |

After memo 20: **Volume 2** begins (lap 2): the story pointer is parked; every memo is generated; every mechanic is live but gentler (section 13). There is no further story.

### 8.1 Stapler pause (story memo 3 on)
A stapler (inline SVG: two rounded rects and a spring) slides into the stapler banner area with a union-red ribbon: `UNION-MANDATED PAUSE. DO NOT TYPE FOR 7 1/2 SECONDS. THIS IS NOT A TEST. THIS IS A STAPLER.` A ring (SVG circle with `stroke-dashoffset`) counts down 7.5 s (selftest 1.5 s). Rules:
- Schedule: at most one per memo, only mid-memo (>= 20 characters typed and >= 2 lines remaining), not during blind/hush/apology/ending/slip/jam, first one 25 s into memo 3, later ones 30-50 s apart (Volume 2+: 60-90 s). Pause ends early only if the memo ends.
- Waiting quietly (no keystroke, Enter, Backspace, tape, dictate, Pauline) for the full 7.5 s: `api.award(0.5, 'Union-Mandated Silence')`, `waited++`, a `stapler` thanks line from the `staplerThanks` bag, a union newsletter line under the lamp. 3 successful waits: achievement `typing-pool.stapler`.
- Typing during the pause is SCAB TYPING: the characters are still typed (nothing blocks), the first scab keystroke fines `api.award(-0.5, 'Scab Typing')`, `api.sfx('sad')` (sad trombone), a line from `staplerScab`; the pause continues but no payout. One fine per pause.
- Management line when it appears: the `staplerBanner` say (once per pause via the banner text; say only the first time and then every 4th pause).

### 8.2 Hush memo (story 13)
When the Hush memo starts: float bobbing stops (`still`), the committee bench greys, Management is silent for 6 s (no `api.say`), then ONE line (`hush` bag line 1). The bell rings once softly (use `api.sfx('ding')`) at the first keystroke and is the only sound for the whole memo (no tick/blip sfx during hush: mute the typing sfx via a flag). The slip prints only `No score. Just type.` and NO stamps. `api.award(1, 'Typed Quietly')`.

### 8.3 Potato Protocol (secret, once per session)
While a stapler pause is active, if the rolling 12-character buffer of typed characters contains `gerald`: extend the pause to 15 s (ring restarts), the `staplerGerald` line, and Gerald dictates a memo next (a 3-word memo `Spuds. Wherever. Slightly.`, as the next memo regardless of story, signed `G.`, unscored, the committee scores his thumbprint at 7 1/2). If the buffer contains `potato`: the stapler bows silently once, `api.award(5, 'Silent Bow')`, `staplerBow` line, achievement `typing-pool.potato`. Both only fire once per mount (in-memory flag). Typing during the pause still counts as scab typing for the fine (the secret pays more than it costs).

---

## 9. MEMO BANK (VERBATIM)

Placeholders: `%name%`, `%typo%`, `%sib%` (a sanitized snippet of your last completed sentence from the previous memo, `[A-Za-z ,.'-]`, max 40 chars, fallback `we write to confirm that we are writing`), `%re%` (the Re: chain prefix, e.g. `Re: Re:`; may be empty), `%cc%`, `%n%`. Fixed memo `from` values are given in brackets. The `[subject]` is the RE line if different from the chain.

### 9.1 Fixed story memos
1. [from Management] `Dear Valued Employee, This letter confirms receipt of your previous letter, which confirmed receipt of this one.`
2. [from Management] `Further to our letter confirming receipt of your letter, please accept this letter confirming that we have accepted it. No further action is required. We have taken it from here.`
3. [from Management] `Please find attached the attachment referred to in earlier correspondence. If the attachment is not attached, please consider it detached. We regret nothing, but we have noted it.`
4. [from the Spelling Subcommittee, deliberate typo word `recieve` marked with a coral asterisk] `We recieve your concerns with interest. Your concerns will be reviewed by the person who reviews concerns, who is on leave, and who will return when the concerns do.`
5. [from Management, subject = chain] `%re% Receipt. In reply to your reply, we wish to reply that your reply has been received. Please see the memo you are about to type for further replies.`
6. [from the Register of Regrets] `It has come to our attention that you wrote '%typo%'. We too regret '%typo%'. It has been added to the Register of Regrets, between 'the wallpaper' and 'Thursday'.`
7. [two voices; three segments A, B, A] A: `Memo A to Memo B. About Memo 14: I have not read it. I am told it is excellent.` B: `Memo B to Memo A. Thank you for your reply to my reply to your reply. I look forward to replying.` A: `Memo A to Memo B. You said: '%sib%'. I have filed that under Tuesday.`
8a. [from Gerald, if flag `metGerald`] `To the Pool, from Gerald, Vice President of Spuds: Typing is just nudging the future with tiny sticks. I am a potato and I have never been wrong, apart from in the past.` (slip: `Not scored. Gerald is a potato.`)
8b. [from A Potato (Unmet), if not metGerald] `To the Pool: Spuds. Wherever. Slightly. Signed, A Potato (Unmet).` (slip: `Not scored. A potato has not been scored.`)
9. [from the Toaster] `Toast. Toast toast. Toast toast toast toast. Toast.` (no cc; do not correct the toast)
10. [from Dennis (Plant)] `To whom it may concern: Fine. Sincerely, Dennis (Plant)` (no cc)
11. [from Sandra, Compliance] `Dear Employee, This memo has been marked up. Please type it as marked up, including the markup, including 'moist'. Sandra, Compliance.` (no cc; the word `moist` is shown red)
12. [from the Pool] `To the Typing Pool, from the Pool: I have been very patient. I am at your knees. This is not a threat. It is a depth.`
12b. [from the Fax Room, Unit 7 1/2; only if `api.stat.get('fax-machine.sent') > 0`; once ever] `We have received nothing from you. We have received it in triplicate. Please file this with the other nothing.`
12c. [from the Missing Sock; only if flag `sockSeen`; once ever] `Status update: still travelling. Expected back on a date to be confirmed by Tuesday. Please do not wait up.`
13. [Hush; from nobody] `This memo contains no score. Please type it at the speed you would like. It will be here when you are finished. It has nowhere to be.`
14a. [apology, from the Stapler (Union Rep.)] `Dear Everyone I Have Ever Stapled, I am writing to apologise. I was not myself in 2019. I was, to be fair, a stapler.`
14b. `I know what I did to the quarterly report. It was the third staple. I knew it then. I did it anyway, with feeling.`
14c. `To the Hole Punch: your holes were bigger. I was not threatened. I was a little threatened. To the Tape: it is not your fault that you are sticky.`
14d. `I have held a great many things together. I never held anything together on purpose until you started typing. I only have one move. This is the move.`
14e. `I am sorry. I am here. I will continue to staple. This is not an ending. It is a fastening. Please type this exactly as shown. Yours, in two pieces, The Stapler.` If flag `metStapler` is set, append: ` I withdraw Demands 1 through 6. Demand 6 in particular. I would like to be consulted. I realise I am being consulted.`
19. [Certificate] `CERTIFICATE OF COMPLETION OF THE TYPING POOL. This certificate is also a memo. Please type it. Signed, the Committee, three times, in three places, at once.`
20. [Return, from Management, `cc: Dennis (Plant)` ONLY] `Dear Valued Employee, This letter confirms receipt of your previous letter, which confirmed receipt of this one, and was a very kind one.`
Volume 2 first memo (kinder, no typo): `Dear Valued Employee, This letter confirms receipt of your previous letter, which confirmed receipt of this one. We hope you are well.`

### 9.2 Rare and special memos
- Lasagna (the Wrong Memo; generator only, 1 in 50 memos, never before lap ordinal 6; once per 50; no cc): `Dear Colleague, Please preheat the oven to 190 degrees and confirm receipt. Combine the sauce, the pasta and the committee's patience. Bake until it is no longer a concept.` (from `Nobody`; Management says `lasagna` line 1; typing it with zero errors: line 2, `api.award(7.5, 'Lasagna Accepted')`, achievement `typing-pool.lasagna`).
- Missing Person (served next after an 8 minute idle): `Valued Employee has not typed since the last memo. If found, please type.`
- Carbon copy (1 in 12 generated memos): a thin carbon sheet peeks from behind the paper showing one of the `carbon` lines (decor only).
- Sandra's trap slip line, Get Well card text, Pauline's slip: see sections 10 and 11.

### 9.3 Generator pools
Openers (14): `Dear Valued Employee,` / `Dear Colleague,` / `To whom it may concern,` / `Further to my last memo,` / `Per my previous message,` / `Following our non-meeting,` / `Dear Desk 7 1/2,` / `To the typist,` / `Re: the matter at hand,` / `Dear Sir, Madam, or Pool,` / `Circling back to nowhere in particular,` / `Going forward, and also sideways,` / `Please be advised,` / `Greetings from Facilities (a ficus),`

Bodies (19; 17 and 18 only when `typos.length > 0` and story >= 6):
1. `this memo confirms receipt of your previous memo, which has confirmed receipt of this memo.`
2. `we write to confirm that the attachment is attached to the attachment, which is attached.`
3. `no further action is required. Further action has already been taken, by nobody, at 4:17 PM.`
4. `the meeting that could have been an email has been rescheduled to be a memo.`
5. `your concerns have been received, reviewed by the committee, and returned to you in a better mood.`
6. `Please find enclosed the enclosure. The enclosure has been enclosed in the memo you are typing.`
7. `the third ficus has been consulted. It had no objection and no comment, which is how it likes to work.`
8. `the carbon copy of this memo is more confident than the original. Please do not tell the original.`
9. `we regret to inform you that nothing is wrong. We are told this is the good kind of regret.`
10. `all staff are reminded that Tuesday is coming, and that it is not a drill. It has never been a drill.`
11. `the 7 1/2th floor remains where it was. Please stop asking whether it moved.`
12. `the Committee has reviewed the review of the review and is delighted to report that it agrees with itself.`
13. `kindly disregard the previous memo, except for the part where it said to disregard it.`
14. `the stapler would like it noted that it has received your memo and has not yet forgiven it.`
15. `the Pool is fine. The Pool has asked us to say it is fine. We have said it.`
16. `a spare Form 27B/6 has been left in the tray. It is the one that requests Form 27B/7, which no longer exists.`
17. `Per the Approved Variant (%typo%), we write to confirm %typo% receipt of your prior communication.`
18. `See Variant 3 (%typo%), which is now binding precedent. The precedent has been framed.`
19. `this memo has been marked as read. It has been marked as read by the person who wrote it.`

Sign-offs (14): `Warm regards, Management.` / `Yours in good order, the Typing Pool.` / `Sincerely, a committee of one.` / `Respectfully, and in triplicate, Desk 7 1/2.` / `With enthusiasm (restrained), Management.` / `Regards, The Office of Previous Letters.` / `Cordially, Facilities (the ficus).` / `Best wishes, and a lasting mild concern, Management.` / `Yours until Tuesday, the Subcommittee.` / `Thanks in advance, and in retrospect, Management.` / `Kind regards, The Stapler (Union Rep.)` / `Please advise. Please do not advise. Management.` / `Faithfully, The Memo You Are Typing.` / `Over and out, and back in, Management.`

Kind bodies (Volume 2+): `we hope you are well. We have no reason to ask. We are asking anyway.` / `thank you for typing. We mean the typing, and also the rest of it.` / `this memo is short because nothing is wrong. We checked twice.` / `the pool is calm. The ducks send their regards. One of them sent two.`
Kind sign-offs: `With warmth, Management.` / `Fondly, the Pool.` / `Gently, The Stapler.` / `Yours, and glad of it, Desk 7 1/2.`

cc line (appended as its own segment with `who:'-'`, from story memo 3 on, except memos flagged no-cc): ordered recipients, one more added per cc'd memo (`ccN`), joined by `; ` and prefixed `cc: `: `Dennis (Plant)` / `the Committee` / `Memo 4` / `the idea of a filing cabinet` / `a draught` / `Tuesday` / `the one who typed this` / `the stapler's lawyer, who is a stapler` / `Gerald (VP of Spuds)` / `Sandra` / `the Pool` / `the third ficus`. Always `Dennis (Plant)` first; once the joined line would exceed 100 characters keep Dennis, then an ellipsis recipient `... and others`, then the newest 3. In Volume 2 and the Return memo the cc line resets to `cc: Dennis (Plant)` alone (and from there grows again).

---

## 10. LINES (VERBATIM). Register as `P.addLines('m:typing-pool:<key>', [...])` and read with `api.line('m:typing-pool:<key>')` / `api.sayRandom`. A line marked (say) goes to `api.say`; (strip) goes to the Management strip under the paper. `%x%` placeholders are filled by the module. Moods: pick `proud`/`smug` for scores, `confused` for oddities, `panic` for jam/spam, `disappointed` for idle, `neutral` otherwise. Narrator `who` is Management unless noted.

### 10.1 `greet` (say, on mount; first-ever mount uses line 1 at 800 ms)
1. Welcome to the Typing Pool. Please copy each memo exactly as shown. Any deviation will be recorded as creativity.
2. Your desk is Desk 7 1/2. The typist before you left a note. The note says 'it's fine'. It has been typed up as a memo.
3. Welcome back. You have filed %n% memos. The Typing Pool has filed you as 'ongoing'.
4. The Typing Pool has operated continuously since a time that was later reclassified.
5. Please note that nobody will read your memos, and that a committee will score them.
6. Gerald has asked after your typing. Gerald does not type. Gerald asks after things.
7. This is Volume %n%. It is the same pool. It has been told it is warmer.

### 10.2 `bellSelf` (second 3, bell rings by itself; say line 1 and strip line 2)
1. The carriage bell has rung. Nothing prompted it. The bell reserves the right.
2. The bell is on time. The bell has always been on time.

### 10.3 `firstKey`
1. A bold opening. The first key is always the one that matters least. (say, memo 1 only)
2. Typing has commenced. The commencing has been noted. (say, first key of each later lap)

### 10.4 `typo` (strip; shown on a wrong character with a 10 s cooldown; the first typo ever is `typoFirst`)
1. A deviation has been recorded. It has been recorded as creativity.
2. The memo has noticed. The memo is being brave about it.
3. That letter was not in the memo. It was in you.
4. Error logged. The error has been given a desk.
5. Wrong key. The key has been informed and is thinking about it.
6. A typo. The typo would like to be considered a variant.
7. Noted. Not corrected. Nothing is ever corrected here, only noted.
8. You have typed a letter that does not exist in this memo. It has been welcomed in.
`typoFirst` (say): Your first typo has been received. It will be quoted back to you later, with affection.

### 10.5 `premature` (strip)
First ever (fixed): Premature Return. The carriage clunked, and was surprised at itself.
1. Premature Return. The carriage has filed a complaint.
2. You pressed Enter before the margin. The rest of that line has been left to its own devices.
3. The carriage went back early. It is now waiting for you at the start of the next line.
4. Premature Return logged. Form 27B/6 has been prepared. It is the one that requests Form 27B/7.

### 10.6 `pile` (strip)
1. You continued typing past the margin. The last column has become an ink opinion.
2. Pile-On. The final column is now a heap, and the heap has views.
3. The margin was a suggestion. You have taken it as one.
`pileClear` (strip, on Enter after a pile): The carriage whip-slid back through the pile. The pile will be remembered as dense.

### 10.7 `tape`, `tapeCol0`, `tapeWait`, `tapeEmpty`, `tapeRefill`
`tape` (strip/say): 
1. That is Correction Tape. It is a limited, nonrenewable, renewable resource. (say, first ever)
2. Tape applied. The mistake is now a white rectangle with a past.
3. Corrected. Please do not look under the correction.
4. 1 mm of tape spent. Tape is measured in millimetres and in feelings.
`tapeCol0` (strip): The carriage cannot be un-returned. The carriage has asked not to discuss it.
`tapeWait` (strip):
1. Backspace is on hold. It is in a queue. The queue is behind a stapler.
2. Tape has been requested. Please do not backspace for 12 seconds. This is not a punishment. It is a queue.
`tapeEmpty` (say, when the roll hits 0; fill %form%):
1. Your request for additional tape has been received. Form 27B/%form% has been completed on your behalf.
2. The tape has been requested, approved, lost, requested and approved. Form 27B/%form%.
3. Form 27B/7 has been requested. Form 27B/7 was destroyed in 1998. A replacement has been requested. (only when form is 7)
`tapeRefill` (say):
1. Correction Tape refilled. You may now be wrong again, with confidence.
2. 40 mm of tape has arrived. It was not requested. It was, however, approved.

### 10.8 `cleanLine` (strip, 1 in 3 clean lines) and `bellFirst`, `bellClick`, `bellFatigue`, `bellPlaque`
`cleanLine`:
1. Clean line. A small gold star has been awarded and mislaid.
2. Line returned in good order. The order has been noted.
3. A line without error. The committee has been told and is, for now, calm.
4. Clean. Please keep it to a minimum.
`bellFirst` (say): The bell rang at column 30. Management would like it noted that Management rang it.
`bellMargin` (strip, now and then): Ding. This is the bell. You may now return the carriage, or you may continue to have your own feelings about it.
`bellClick` (strip):
1. The bell has been rung by hand. It would like it noted that it rang at column 30 earlier, officially.
2. Ding. The bell takes credit for that.
3. You rang the bell. It was not requested. It has been received.
`bellFatigue` (say): Bell Fatigue. The bell has become a tonk. The label says wood.
`bellPlaque` (say): The margin bell has rung 50 times. It has been issued a plaque, engraved with a bell and the words 'Ding, officially.'

### 10.9 `memoDone` (say after each slip, one per memo, filtered by milestones first)
Milestones (fixed, checked by lap memo count `k`):
- k=1: Your first score is 9.1. It was 9.1 before you started. It will be reviewed.
- k=3: Three memos. The pool has been told. The pool is not saying anything.
- k=5: Five memos. You are now Typist (Probationary, Still). This is a promotion.
- k=10: Ten memos. An honour has been submitted for you. It is being approved by a committee that disagrees.
- k=20: Twenty memos. The Typing Pool has run out of ways to say twenty.
- k=50: Fifty memos. The typewriter would like it noted that it has not once complained. It has noted this itself.
Generic bag:
1. Memo filed. The memo has been received by an outbox that is mostly sentiment.
2. Another memo. The Typing Pool is, in a technical sense, thriving.
3. Filed under Tuesday. Tuesday has not been consulted.
4. The memo has been placed in the Outbox, which is the Inbox, seen from the other side.
5. Your throughput has been noted by a person who is not here.
6. That memo is now history. A short one, with a header.
7. You have typed %n% characters this session. Management cannot confirm which ones.
8. Congratulations on completing a memo. Congratulations on the memo that follows.
Speed/accuracy lines (say, occasionally, use `%wpm%`/`%acc%`):
- wpm >= 60: You typed at a rate the pool is calling ambitious and the ducks are calling alarming.
- wpm < 20: You typed at a rate the pool is calling leisurely and the ducks are calling a swim.
- acc <= 85: Your accuracy is %acc% percent. The remainder has been asked to wait in the hall.
- any: Posture was not measured. It was, however, noted.

### 10.10 `slipFoot` (small print at the bottom of each slip, rotating)
1. This score replaces all previous scores. It also replaces itself on request.
2. Retain this slip for your records. The records are the slip.
3. Score valid for one reading. Please read quickly.
4. Final score: 7 1/2. Final final score: 7 1/2, subject to appeal. Appeals are welcome. They will also be 7 1/2.
5. Posture was not measured. It was, however, noted.

### 10.11 `reasons` (stamp reasons; render as RE-SCORED FOR + the uppercase words)
tone / enthusiasm / restraint / weather / alleged enthusiasm (allegation withdrawn) / posture (not measured) / having a plant / being the same as last time / a phase of the moon that was not consulted / capital letters (general) / a feeling in the room / being exactly as expected, which was not
Fixed first memo stamps: `RE-SCORED FOR ENTHUSIASM` (6.8) then `RE-SCORED FOR RESTRAINT` (8.2).
`kindReasons` (Volume 2+): Fine. We have said fine. / Acceptable, in a warm way. / Good. We mean good. / Kind of you. / Noted, fondly.
Special stamps: `RECEIVED` (a smug mint stamp on the very first slip), `SUSPICIOUSLY GOOD (VOID)`, `RE-SCORED FOR MAKING THE OTHERS LOOK BAD`, `RE-SCORED TO 7 1/2, WITH FEELING`, `RE-SCORED UPWARD FOR ATTENDANCE`, `NOT SCORED. GERALD IS A POTATO.`, `YOUR STAMP`.
`material` (say, once, story 9+): A 7 1/2 has been re-scored to '7 and 1/2' and declared a material improvement.

### 10.12 `committee1` (say, story 1-3, rotating) 
1. The Committee of One has reviewed your first score and found it excessive.
2. The Committee of One had not read the memo. The Committee of One had read the score.
3. Score revised downward for typing too well, which the Committee found showy.
4. Score revised upward for typing too poorly, which the Committee admires in a way it declines to describe.

### 10.13 `committee3` (say/strip, story 4-8, rotating; stamp captions are in the stamps)
1. The Committee has met. Clive gave you 8.8. Marguerite gave you 1.4. Mr. Gray gave you a look, which has been scored 5.1.
2. Clive believes your tone was 'enthusiastically beige'. Score adjusted accordingly.
3. Marguerite has docked 12 points for punctuality. She has docked it from last Tuesday's memo. It was not hers to dock.
4. Mr. Gray has abstained. He abstains from most things. He is thought to be either a very calm person or a coat.
5. The Subcommittee for Second Opinions disagrees with the above, without having read it.
6. Clive and Marguerite are no longer speaking. Marguerite has issued a score through the Subcommittee, which is not a person.
7. The Subcommittee concurs, and is uneasy. (story 8 only, once)
8. The Disagreement Index has been measured. It is 7 1/2 percent. It was 7 1/2 percent last time.

### 10.14 `meta` (story 9+; the Subcommittee list is rendered on the slip as small print)
1. The Committee on Committee Scoring has scored the Committee. The Committee scored 7 1/2. The Committee has asked for a recount.
2. The Subcommittee of 7 1/2: Ash, Birch, Cope, Dunmore, Eales, Fenn, Gower, and the front half of Mr. Hale.
3. A third committee has been convened to review the second committee, which reviewed the first, which was a hat.
4. The Committee has considered your score and is pleased to disagree with it.
5. After a recess of 7 1/2 minutes the Committee has arrived at a number it also arrived at last time.
6. The Subcommittee on Scoring would like to remind you that the Committee on Subcommittees exists.

### 10.15 `appeal` and `appealStamp`
`appeal` (strip/say; 1st fixed, then the bag):
1. Appeal received and placed in the tray marked 'Received'.
2. Appeal Fee: 0.5 Meh. The fee has been paid to a drawer.
3. Appeal upheld. Appeal also denied. Score: 7 1/2.
4. The Appeals Panel is the Committee, wearing a different hat. The hat is a form.
5. The Appeals Panel is the Committee, wearing a hood. The hood is also a form.
6. The Appeals Panel is the Committee wearing a hat the Committee is not wearing.
`appeal7` (say, 7th and every 7th): You have appealed 7 times. A new Appeals Panel has been formed to appeal the Appeals Panel. It meets in the elevator, between floors.
`appealStamp`: APPEAL: UPHELD (ALSO DENIED) / APPEAL: HEARD (LOUDLY) / APPEAL: REFERRED TO THE HAT / APPEAL: SAME AS LAST TIME / APPEAL: UPHELD IN PART, SPECIFICALLY THE PART THAT WAS HELD
`selfStamp` (strip): 
1. You have stamped the score yourself. It has landed on 7 1/2. Management has never seen a stamp so sure.
2. Self-scoring is permitted. The result is not.

### 10.16 `unitChange` (say)
1. Gallons are the official unit at this time.
2. One Bureaucratic Unit is the effort required to find another Bureaucratic Unit.
3. Hours of Notice. Notice of what is a matter for the committee.
4. Fractions of Tuesday. Tuesday has been informed.
5. The unit is Thursday. Thursday has not been told.

### 10.17 `reChain` and `reply`
`reChain`:
1. The subject line is now longer than the memo. The memo is thinking about it.
2. Re^9. The Re: count has collapsed to a tidy superscript. It is still counting.
3. Re: Re: Re: Re: Receipt. This is a lot of replying to a thing nobody sent.
`reply` (say, story 7):
1. The memos have started replying to each other. This is within tolerance. The tolerance is the memos.
2. Memo A has replied to Memo B. Memo B has replied to Memo A. You are the medium. Please do not interrupt.
3. Thank you for your response to my response to your response. I look forward to responding. (strip, after a B line)

### 10.18 `staplerBanner`, `staplerThanks`, `staplerScab`, `staplerGerald`, `staplerBow`, `union`
`staplerBanner` (banner text, see 8.1): UNION-MANDATED PAUSE. DO NOT TYPE FOR 7 1/2 SECONDS. THIS IS NOT A TEST. THIS IS A STAPLER.
`staplerThanks` (say, who The Stapler):
1. Thank you for your silence. It was staple-adjacent.
2. Silence noted. Silence logged. Silence stapled to the file.
3. The stapler thanks you. It has paid you 0.5 Meh and a look.
`staplerScab` (say, who The Stapler):
1. That is scab typing. I have a form for that. The form is a staple.
2. Scab typing detected. I am not angry. I am stapled.
3. Fine: 0.5 Meh. Please spend it on tape.
`staplerMgmt` (say, occasionally):
1. The stapler is a valued stakeholder. The stapler has asked me to stop saying 'valued'.
2. Every 7 1/2 seconds of pause represents a memo that did not get typed. Every memo that did not get typed was fine.
`staplerGerald` (say): The pause has been extended to 15 seconds. Gerald is dictating from his chair.
`staplerBow` (say, as Management; the stapler itself bows silently and says nothing): The stapler has bowed. It has never bowed before. It has awarded you 5 Meh and a moment.
`union` (small line under the lamp, one per stoppage):
1. STAPLE AND CLIP QUARTERLY: Stoppage no. %n%. Morale holds at 7 1/2.
2. UNION NEWSLETTER: Today's pause was won by sitting still, a tactic previously unavailable.
3. UNION NEWSLETTER: Demand 6 remains Demand 6.
4. UNION NEWSLETTER: The break room has not been built. It has been drawn.
5. UNION NEWSLETTER: A hole punch attended in solidarity and left a number of holes.
6. UNION NEWSLETTER: Tape has joined as an observer. It is sticking around.

### 10.19 `variant`
1. Your spelling of '%typo%' has been formally adopted by the Pool. It is now the Pool's spelling. You are welcome.
2. The Spelling Subcommittee has ratified '%typo%', 3 votes to 3 votes and a ficus.
3. The word '%typo%' is now policy. It was typed by you. We are deeply grateful, and slightly worried.
4. Please do not correct the Approved Variant. Correcting it would be a second typo, but a worse one.
5. We will no longer correct '%typo%'. We have grown fond of it.
6. See Variant 3 (%typo%).
7. The Subcommittee on Variants has quoted a variant of a variant. The subject line is now your most embarrassing typo, in capitals.
`variantSlip` (slip line): TERMINOLOGY ADOPTED: %typo%
`ratified` (say): The correct spelling has been struck from the memos. It took it well. It has been given a desk.
Certificate text: THIS SPELLING HAS BEEN RATIFIED.

### 10.20 `poolStage` (strip or say per memo, k = lap memo number; also `poolRise` each memo)
- k=1: There is one duck. It has not been introduced.
- k=2: Employee of the Month: a duck. The frame is a recent development.
- k=3: A lifeguard duck has arrived. It has a whistle. It does not blow it. It simply holds it.
- k=4: A second duck has joined. They have exchanged a look, and a pamphlet.
- k=5: A duck in a tie has joined the pool. The tie was not asked for. The tie has been approved.
- k=7: A WET FLOOR sign has been placed in the pool. It has been re-scored to 7 1/2. The desk lamp has flickered and declined to explain.
- k=9: The Employee of the Month frame has floated away. It is expected back.
- k=10: The water has reached the desk. The ducks have come to the desk. They are waiting for the memo.
`poolRise` (strip):
1. The water level has risen 2.4 percent. This is a pool.
2. Please hold your memos above the waterline. The waterline is a recent development.
3. The pool is 11 percent pool. The rest is typing.
4. Typing continues under any water conditions. This is policy and also a hope.
5. The Stapler has asked whether the pool is a stakeholder. The pool has not responded. It is a pool.
`typist` (the 8 click lines, once each; strip or say per 3.11):
1. I am typing a letter to confirm that I am afloat.
2. My float has a brand-new typewriter and a leak. The leak has a name.
3. I have been in the pool since Q3. I do not remember getting in.
4. The water is not a metaphor. The water is also a metaphor.
5. Pauline has typed 'the' 14 times in a row. She says it is a warm-up. It has been a warm-up since March.
6. Marjorie has left her desk. Her typing continues. This is within policy and also within the walls.
7. Dennis (Plant) has typed 4,000 words. All of them are 'sunlight'. The Committee has scored it 100, and also 0.
8. I would like it noted that I am not wet. I am simply adjacent to a great deal of water.
`typistDone` (strip): The typist has nothing further to say. The typist has waved. It was a good wave.
`typistVariant` (strip, if a typo exists, replaces line 2 once): My float has a brand-new typewriter and a leak. The leak is called '%typo%'.
`duck` (strip): Quack. / Quack. (Translated by Management: 'Quack'.) / The duck has expressed no view. It is thought to have one.

### 10.21 `sandra` (strip)
1. Sandra from Compliance has struck a word. The reason is on file. The file is a sandwich.
2. Tracked Change (Sandra): 'confirms' is now 'respectfully acknowledges'. Reason: contradictory to policy 14, which does not exist.
3. Tracked Change (Sandra): 'Dear' is now 'Warmly Beloved Valued'. Compliance has made it warmer, as required by the cold.
4. Sandra has flagged the word 'the'. The reason is on file. The file is a sandwich.
`sandraNoncompliance`: Sandra has noted your noncompliance. Sandra has not noted anything else.
`sandraTrapSlip`: SANDRA FROM COMPLIANCE HAS FLAGGED THIS. NO FURTHER ACTION. PLEASE SEE ATTACHED.
`sandraTrapSay`: You have typed the name. We do not type the name. We type 'Please see attached.'

### 10.22 `cameo` (say; each once per session via `seen{}`)
- Toaster (memo 9): The toaster has sent a memo. It is made of one word. Please type it with care.
- Toaster slip: The toaster's memo scored 7 1/2. The toaster has asked that this be recorded as toast.
- Toaster follow-up (a minute later, strip, who The Toaster): Toast.
- Toaster Management: The Toaster has been moved to tears. The tears were toasted.
- Toaster if flag `metToaster`: The toaster remembers you. It remembers everyone. It remembers them lightly.
- Gerald (met): Gerald has typed 0 characters and scored 7 1/2. Gerald has asked that this be recorded as a tuber of record.
- Gerald (unmet): We have not been introduced. Please type him anyway.
- Dennis: Dennis (Plant) has been cc'd on every memo, none of which he has read, all of which he has thrived on.
- Dennis follow-up: The memo from Dennis says 'Fine.' Dennis is not impressed. Dennis has never been impressed.
- Fax: The Pool typists have looked up. The Fax Room is apparently very loud.
- Sock: The Missing Sock has filed an update. It is 'still travelling'. Management is proud of its commitment.
- Pool memo: The Pool has written to you. The Pool has never written before. It has never needed to.
- Sandra red-line: Sandra has marked up the memo. Please type the markup. The markup is also marked up.

### 10.23 `hush`
1. This memo has nowhere to be. Neither, at this time, have we. (say after the 6 s silence)
2. No score. Just type. (slip text)
3. The Committee has recessed. The Pool has stopped. Nobody is scoring anything. (strip)
4. The bell has rung once, softly. It is the first time it has rung sincerely. (strip)
5. The clock has stopped. It was right for the first time. It will not be consulted. (strip, after)

### 10.24 `apology`
- After carriages a-d (strip): Received.
- After carriage e (say): The Committee has met to score the apology. The Committee has agreed with itself, which has not happened before, and has asked that the score be left blank.
- (say, once): The stapler's demands were Fewer staples, A summer holiday on the third shelf, and A break room that is a drawer. It would like to withdraw all of them.
- Slip: NOT SCORED. SOME THINGS ARE NOT.
- Management after: Received.
- Stapler (say, who The Stapler, toast-sized): Thank you for typing me.
`attachmentHeart` (paperclip popover): Please find attached my regret.

### 10.25 `ending` (see section 13 for placement)
1. The stamps have hesitated. They have never done that. They are, as one, landing.
2. This has been the final memo. It has been received. (say, plain, mood neutral)
3. The tray has emptied. The water has drained, with a gurgle that sounds like a person agreeing.
4. Confirming receipt of your previous letter. It was the apology. It has been received. Please proceed.
5. Score pending (previously 9.1). The previously has been located. It was this one. It was always this one.
6. The Typing Pool has been renamed the Typing Pool (Annex). The annex is the pool. The pool is a metaphor that has now been extended to the roof.
7. Congratulations on completing a memo. Congratulations on the memo that follows. Congratulations on the next one.
8. Management records your continued typing as 'dedication of the highest ceremonial order'.
9. Certificate: CERTIFICATE OF COMPLETION OF THE TYPING POOL. This certificate is also a memo. Please type it.
10. Slip: Adjusted: 9.1 (agrees; please resubmit)
11. Trophy slip: RANK: TYPIST GRADE 7 1/2 (PROVISIONAL, FOREVER). (immediately stamped RE-SCORED FOR BEING A TROPHY, 7 1/2)
`volume2` (strip, short kind slips): Fine. We have said fine. / Fine, and warm. / The Committee is unusually relaxed. / We have nothing to add, and have added it.
`staplerCard` (say, who The Stapler, every 10th memo of Volume 2+): Still here. Still holding. / I held a thing together today. It was a memo. It was fine. / No demands. Just a staple. / I have been thinking about the pool. The pool is fine.

### 10.26 `idle` (see section 12)
- 20 s (strip + say): The carriage bell rings by itself. That was not me. That was the bell. The bell is lonely.
- 45 s (say): You have stopped typing. The Pool has noticed. Pauline has taken over your memo. She is typing like you. She is also typing like Pauline.
- 60 s (the slip prints this on its own): Dear Valued Employee, we are writing to confirm that you are still there.
- 90 s (say): The memo has your handwriting. It does not have your commitment.
- 90 s slip line: Completed by Pauline. Assisted. Disqualified. Invited to the party.
- 180 s (say): The Pool typists have formed a circle. They are typing a get-well card to you. You are not unwell. They are covering all bases.
- Get Well card text (a small card overlay): GET WELL SOON. We are not sure what. Signed, everyone. (Dennis signed with a leaf.)
- 480 s (say): The Pool has filed a Missing Person memo about you. It is next. Please type it when you are found.
- Return after idle >= 45 s (say): Welcome back. The chair remembers.
- Tab hidden then shown (strip, once per 60 s): You were missed in a way we are required to log.

### 10.27 `spam` (see section 12)
1. The typebars have tangled in a tight knot. That is a lot of letters in a very short space. (say)
2. Keystroke Overage Fee: 0.5 Meh. Please type at a rate befitting a typewriter, not a weather event. (say)
3. The typebars have clashed in the air. They are tangled like a conversation about parking. (strip)
4. Tick. (strip, untangle click 1) / Tick. One fewer opinion. (click 2) / Tick. The knot has noticed. (click 3)
5. Untangled. Management sighs a tired sigh. It is the good kind. (say, when you untangle it yourself)
6. A duck has untied the knot with its beak. It asked for nothing. It was paid in nothing. (say, duck rescue)
7. You are typing faster than the machine can be said to type. The machine would like to be a smaller part of this. (strip, 10+ chars per second warning)
8. The carriage has returned so many times it has filed for a transfer. (strip, Enter spam)
9. The ink pad has run dry. The stamp now stamps in a faint ink-adjacent water. (strip, stamp/appeal/self-stamp spam)
10. The Appeals Subcommittee has appealed itself. We will let you know. (strip, appeal spam)

### 10.28 `paste` (by attempt count: 1, 2, 3, 7th triggers the fee; later attempts cycle 4-6)
1. Pasting is a form of typing the Pool cannot verify. Please type your pasting.
2. Pasting is not typing. Typing is typing. Please type the paste, in your own time, with your own fingers, as the Handbook intended.
3. A paste has been intercepted. It has been held in a small room and asked questions.
4. The paste has been returned to sender. The sender has been returned to the paste.
5. Cut is not a department. (on cut)
6. Dropping things on the paper is a job for Facilities. Facilities is a ficus. (on drop)
7. Paste Fee: 0.1 Meh. A receipt for the fee costs 0.1 Meh and must be typed. The receipt is short. It contains the word 'receipt'.
`pasteSlip` (7th, a mini slip): Pasting is a type of typing. We know. We are still not letting you.

### 10.29 `escape` (press 1..6 each one line; the 7th is the lid)
1. Escape pressed. Your hands have been lifted. They have been returned.
2. The Escape key is a decorative key. It decorates the keyboard.
3. Escape noted. There is nowhere to escape to. There is a pool.
4. Escape pressed twice more. Management has noticed the more.
5. Break Abuse. The break has been abused. It was not a good break.
6. The Typing Pool is not a place you escape from. It is a place you swim in.
7th press: the lid closes. A sign: BACK IN 7 1/2 MINUTES. For 7.5 s (selftest 1 s) the module shows an empty desk with the ducks, input ignored. Then: Welcome back. Nothing happened.

### 10.30 `eraser`, `perfect`, `blind`, `lasagna`
`eraser` (say, once ever): The Eraser Guild notes that you have backspaced 40 times without typing. The paper has been worn through to the desk. The desk has been informed.
`eraserHole` (a small hole shows text on the desk): The real memo is underneath. It is the same memo.
`perfect` (say):
1. A memo free of errors has been detected. The committee is concerned.
2. Perfection has been reported to Perfection, which has asked to be taken off the list.
3. Three perfect memos in a row. A small sign has appeared over your desk: PLEASE DO NOT BE THE BEST.
`blind` (say): Blind Memo. The ghost text will leave in 2 seconds. Please type from memory. The memory is provided by the Pool. It is, in fairness, a pool.
`blindSlip`: The memo has been compared to the same memo, and found to match the memo.
`lasagna` (say): 1. This memo is for the Kitchen. We do not have a Kitchen. 2. The lasagna has been accepted. It was not in the Pool's jurisdiction. It never has been.

### 10.31 `narrow` (when the module root is under 420px wide, once per session)
1. The memo has reflowed. The margins are now a feeling. (say)
2. The margins are now a feeling. (a sticky margin note on the paper)
3. The Stapler has sent a card of sympathy. It says sorry about the margins. It is stapled shut. (strip)

### 10.32 `dict` (Dictaphone)
1. The Dictaphone is a pool typist with a clipboard. She types what she hears. She hears you slightly wrong. (say, first use)
2. Dictation Received (Not Understood). (strip, on memo finish if dictated)
3. The Dictaphone has been held for 20 seconds. It has asked for a break and been issued a smaller one. (strip, hold cap)

### 10.33 `attachment` (paperclip, in order)
1. The attachment is in the other attachment.
2. The paperclip is attached to the memo and is therefore the attachment.
3. Opening the attachment. The folder is empty. The emptiness is attached.
4. You are holding the attachment. It is the one you are holding.
5. See attached.
6. The attachment has been detached for its own good.

### 10.34 `plate` (desk plate title by total memos filed; never reaches a final one)
0: Typist (Probationary) / 3: Typist (Probationary, Still) / 6: Typist (Probationary, Still, Noted) / 10: Typist (Probationary, Still, Noted, Noted Again) / 15: Associate Typist (Probationary, Still, Noted, Noted Again, Pending) / every further 10 memos append the next of: Ongoing, Provisionally Permanent, Acting, Formerly, Allegedly, Reportedly (cycling). After the loop ending (lap >= 2) the plate base is Typist (Probationary, Eternal) and the same suffix rule continues.

### 10.35 `carbon` (the carbon sheet peeking behind the paper, 1 in 12 generated memos)
1. Well done. Truly. (carbon copy)
2. Between us, that was lovely.
3. You are doing fine. Please do not tell the committee I said.
4. I like your typing. I like it as a person.

### 10.36 `postit` (changes every 3 memos)
Remember to remember / Ask about the ficus / Tuesday? / Buy toast (for a friend) / 7 1/2 is a number / The pool is fine / Water is a stakeholder / Call the stapler. Do not call the stapler

### 10.37 `misc`
- Ctrl+Z (strip): Undo is not a department. Please direct your regrets to the Regrets Desk, which is a drawer.
- File As Is (strip): The memo has been filed as is. As is is a valid state. It is the one the memo is in.
- Empty submit (strip): An empty memo has been received. It has been scored. The Committee has been generous.
- Management on the first slip (say): Your first score is 9.1. It was 9.1 before you started. It will be reviewed.
- The Typing Pool (fallback `nothing`): Nothing has happened. This has been noted by several people.
- Tab key (strip): Tab key noted. An Indent Request has been drafted and filed in a room with no door.
- Window title / aria: Typing Pool (Desk 7 1/2)

Count check: this section plus 9 contains well over 200 distinct line-like strings (SPEC needs >= 80 distinct, >= 3 callbacks, >= 3 secrets).

---

## 11. SECRETS AND RARE EVENTS

1. **Eternal Custodian of the Self-Typing Silence** (secret achievement `typing-pool.idle`): see section 12 idle ladder; unlocks at 90 s idle.
2. **Overlord of the Ribbon Tangle** (secret `typing-pool.spam`): see section 12; unlocks when YOU untangle (not the duck).
3. **Please Do Not Be the Best** (secret `typing-pool.perfect`): 3 memos in a row with zero errors (acc 100, no pile, no skip). The first perfect memo prints `SUSPICIOUSLY GOOD (VOID)`; the 3rd shows the sign PLEASE DO NOT BE THE BEST over the desk and queues a guaranteed BLIND MEMO as the next generated filler (the story memo is delayed by one filler).
4. **The Ratified Typo / Imperial Majesty of the Unrequested Spelling** (secret `typing-pool.variant`): the same wrong spelling of the same word on 3 different memos. A small certificate unfurls (a CSS scroll with a seal and ribbon): `THIS SPELLING HAS BEEN RATIFIED.` The correct spelling is struck from future memos (5.3).
5. **The Potato Protocol** (secret `typing-pool.potato`): see 8.3. Once per session.
6. **Sandra's Name Trap**: typing `sandra` (any case, 6-character rolling buffer): the typewriter types `Please see attached.` by itself in ghost lilac under your text for 4 s (decor, does not touch the memo), `sandraTrapSay` fires, and THIS memo's slip is replaced by the slip `SANDRA FROM COMPLIANCE HAS FLAGGED THIS. NO FURTHER ACTION. PLEASE SEE ATTACHED.` and the committee scores the slip, not you (a normal stamp sequence runs). Once per save (`sandraTrap`).
7. **The Eraser Guild**: 40 Backspaces (tape button or key) in a row with no typed character in between: the `eraser` line (once ever) and a small hole through the paper to the desk showing `eraserHole`. No award.
8. **The Escape key**: section 10.29; 7 presses within 4 s closes the lid for 7.5 s. Secret achievement `typing-pool.escape`.
9. **The Narrow Memo**: root under 420px wide (`root.clientWidth` checked from an `api.on(window,'resize', ...)` handler and once at mount): section 10.31, once per session.
10. **Blind Memo**: from lap ordinal 6, 1 in 18 generated memos, and guaranteed after 3 perfect in a row.
11. **The Wrong Memo (lasagna)**: 1 in 50 generated memos, never before ordinal 6. Secret achievement `typing-pool.lasagna`.
12. **Carbon Copy**: 1 in 12 generated memos shows a kinder line peeking from behind the paper.
13. **Paste escalation** (10.28): 7th attempt charges 0.1 Meh and prints the slip. Attempts are saved.
14. **Cameo guards**: each cameo memo and its follow-up appears once (guard with `seen{}` in `api.save`), and never in the same memo as another cameo.

---

## 12. BEHAVIOR ON IDLE AND ON SPAM

### 12.1 Idle ladder
`lastAct` = last time of any key, pointer press or button click inside the root. `idleSec = (now - lastAct)/1000`. In selftest multiply every threshold by 0.1 (20 s -> 2 s, 90 s -> 9 s, 480 s -> 48 s, all within the fuzz 62 s window) and check with one `api.setInterval(..., 1000)`. Each rung fires once per idle stretch and resets when the player acts.
- 20 s: the bell rings by itself (`api.sfx('bell')`, bell shakes). Strip + say the 20 s line.
- 45 s: PAULINE takes over: the remaining characters of the current memo auto-type in lilac ink at 5 characters per second via `api.setInterval` (not `setTimeout` chains), with one deliberate typo in about every 40 characters, signed `(typed by Pauline)` on the slip. Any player key/click stops her mid-character immediately (the carriage stays warm). If Pauline reaches the end she does NOT return the carriage for the last line (she cannot); at 90 s idle the memo is filed under your name with a final of 7 1/2 and the 90 s lines. Ghost typing awards `api.award(0.1, 'Typed By Pauline')` once per session. She never types during a stapler pause, jam, lid, slip, or ending special memo.
- 60 s: the slip slot prints by itself `Dear Valued Employee, we are writing to confirm that you are still there.` (a standalone slip, not a verdict).
- 90 s: achievement `typing-pool.idle`; memo finished and filed under your name.
- 180 s: the four pool typists form a circle (CSS reposition) and a get-well card overlay appears (10.26). It dismisses on any input.
- 480 s: the Missing Person memo is queued as the next memo and Management announces it.
- Returning from >= 45 s idle: `Welcome back. The chair remembers.`
- Hidden tab: pause the Pauline interval and the active-seconds counter; on return the once-per-60 s strip line.

### 12.2 Spam ladder
Track timestamps in small arrays (cap 80) for: typed characters, Enters, and clicks on {BELL, RETURN, TAPE, APPEAL, STAMP IT YOURSELF, FILE AS IS, paperclip}.
- Characters: >= 28 in the last 2 s (14 per second) OR Enters >= 8 in 2 s OR >= 12 control clicks in 4 s: JAM (once; 20 s cooldown after it clears).
- JAM: an SVG tangle (the 7 type bars rotated to the same angle with a shaky transform) appears over the typewriter with THREE glowing loops (real buttons, aria-label `Untangle loop 1/2/3`). `api.award(-0.5, 'Keystroke Overage Fee')`, `api.sfx('buzz')`, `spam` lines 1-3, `jams++`. Typing STILL WORKS during a jam. Clicking a loop plays `api.sfx('tick')` and the next tick line; after the 3rd click the tangle clears, line 5, achievement `typing-pool.spam`, `untangled++`. If nobody clicks for 15 s (selftest 2 s) a duck unties it (line 6, no achievement). The overlay never covers the RETURN/Exit controls: place it over the typewriter graphic only.
- Per-item spam lines: Enter spam (line 8), bell spam (Bell Fatigue, 3.6), stamp/appeal/self-stamp spam (lines 9 and 10, plus the stamp becomes a faint `ink-adjacent` fade for the next 5 s).
- 10+ characters per second (not yet a jam): strip line 7, once per 20 s.
- Never let spam detection fire on a legitimate 120 wpm typist: 120 wpm is only 10 chars per second, well under 14.

### 12.3 Weird-order handling
- Submitting an empty memo (FILE AS IS or Enter x N with nothing typed) is a valid memo: first score `0.0`, first stamp `RE-SCORED UPWARD FOR ATTENDANCE`, final 7 1/2, pays 0.1 Meh.
- Typing before the first memo is shown: impossible (memo 1 is on the paper from mount).
- Resize: the paper never re-wraps mid-memo; only the narrow gag.
- Enter on a focused button activates the button (never hijacked).
- Tab visibility: see idle.

---

## 13. THE NOT-ENDING (step by step)

Trigger: memo 14e (the apology) is finished. All of this runs inside `phase = ENDING` (still honoring Enter-to-advance and the 9 s auto-advance on non-typed parts).
1. Apology carriages (14a-14e): each carriage is its own 'memo' with a header `APOLOGY n/5`, no cc, no stapler pause, no tracked changes, no stamps. Each carriage ends with the soft bell and the strip line `Received.` Pay 0.5 Meh each, carriage e pays 2. The paperclip heart shows on carriage e. The achievement `typing-pool.apology` unlocks when carriage e is finished.
2. The slip prints `NOT SCORED. SOME THINGS ARE NOT.` Management does not speak for 3 s.
3. The stamps HESITATE: for the first time they all land at the same time, in the same place, with a single very quiet thunk (use `api.sfx('stamp')` once): `FINAL (PROVISIONAL): 7 1/2`. Show `ending` line 1 as a strip line.
4. The pool typists and ducks stop bobbing for 4 s (the only time). Management plain, no mood: `This has been the final memo. It has been received.`
5. A certificate unfurls (CSS scroll): `CERTIFICATE OF COMPLETION OF THE TYPING POOL. This certificate is also a memo. Please type it.` The certificate IS the next memo (story 19, 9.1). The slip prints `7 1/2` once more.
6. The tray empties (outbox sheet count animates to 0), the water drains with a gurgle (lvl -> 0 over 3 s, `api.sfx('whoosh')`), the pool is renamed (ending line 6, the plate and the title bar read `Typing Pool (Annex)` from now on: `api.setTitle('Typing Pool (Annex)')`), `lap++`, `lapMemos = 0`, `story` parked, `ccN = 0`.
7. Memo 20 returns: the first memo of the session, word for word, plus six words (`and was a very kind one`, exact text in 9.1 item 20) and `cc: Dennis (Plant)` alone. Management says ending line 4.
8. You type it. At the exact second you press Enter on its last line, the bell rings once by itself (`api.sfx('bell')`), as it did at second 3 of the very first minute.
9. The pre-printed slip that has hung from the machine since the first second finally resolves: its middle line prints `SCORE: 9.1 (RESOLVED: IT WAS THIS ONE)`. Ending line 5. The committee stamps `Adjusted: 9.1 (agrees; please resubmit)` (ending line 10), then FINAL 7 1/2 as ever.
10. The Stapler, now in the corner, says in toast-sized type: `Thank you for typing me.` A trophy slip prints and is immediately re-scored (ending line 11). Achievement `typing-pool.loop`.
11. The desk plate reads `Typist (Probationary, Eternal)`. The next memo is Volume 2's first memo (9.1, `We hope you are well.`), the committee is unusually relaxed (`kindReasons`), the score is 7 1/2, and the module never finishes: memos keep arriving from the generator, the bell keeps ringing at column 30, the stapler pauses keep coming (gentler), the cc line grows again, the pool rises again. After the first Volume 2 memo, once, Management says ending line 8 ('dedication of the highest ceremonial order').
There is no win state. There is no way to finish. A very good chance the player is still typing at minute 11 out of sheer stubbornness, which Management records as above.

---

## 14. ACHIEVEMENTS (ids prefixed `typing-pool.`; >= 6, >= 2 secret; this gives 16, 7 secret)

Rewards are tiny (0.5 to 7.5 Meh). `check(stats)` achievements use module stats; the rest call `api.achieve(id)`.
1. `typing-pool.first` | The Grand Order of the First Carriage Return | Return the carriage for the very first time. The bell is rung in your honour. By the bell. | 🔔 | reward 1 | manual on first clean return
2. `typing-pool.ten` | Laureate of Lateral Keystrokes (Honorary, Pending) | Finish 10 memos. The honour has been submitted for approval, where it is being approved by a committee that disagrees. | 📝 | reward 2 | check `typing-pool.memos >= 10`
3. `typing-pool.sevenhalf` | Supreme Arbiter of the Seven-and-a-Half Percent | Receive a final score of 7 1/2 five times. Note: you were never going to receive anything else. | 🏆 | reward 2 | check `typing-pool.finals >= 5`
4. `typing-pool.tape` | Knight Commander of the Corrected Correction | Use up an entire roll of correction tape and request another. The request has been received. | 📎 | reward 2 | manual when the 12 s lockout first ends
5. `typing-pool.bell` | Knight Commander of the Margin Bell | Hear the bell ring 50 times. It rang for every one. It would like a seat. | 🔔 | reward 3 | check `typing-pool.bell >= 50`
6. `typing-pool.appeal` | Doctor of Disagreement (Honoris, Then Dishonoris) | Appeal 7 times and be told 7 1/2 each time, with feeling. | 📜 | reward 3 | check `typing-pool.appeals >= 7`
7. `typing-pool.stapler` | Honorary Member of the Union of Silence | Wait out 3 union-mandated pauses without typing. The stapler has noticed your stillness and does not know what to do with it. | 🏅 | reward 3 | check `typing-pool.waited >= 3`
8. `typing-pool.apology` | Eternal Custodian of the Stapler's Feelings | Type the stapler's apology in full. The stapler has asked that you not make a fuss, and has made one. | 🌿 | reward 5 | manual
9. `typing-pool.loop` | Typist (Probationary, Eternal) | Reach the end of the memos and begin them again. This is not an ending. It is an inbox. | 🦆 | reward 7.5 | manual at ending step 10
10. `typing-pool.variant` | Imperial Majesty of the Unrequested Spelling (SECRET) | Get a typo ratified as an official Approved Variant by the Spelling Subcommittee. | 📝 | secret | reward 5
11. `typing-pool.idle` | Eternal Custodian of the Self-Typing Silence (SECRET) | Leave the typewriter alone for 90 seconds and witness it typing to itself. | 🕰️ | secret | reward 3
12. `typing-pool.spam` | Overlord of the Ribbon Tangle (SECRET) | Tangle the typebars by mashing keys, then untangle them yourself instead of waiting for a duck. | ⌨️ | secret | reward 3
13. `typing-pool.perfect` | Please Do Not Be the Best (SECRET) | Type 3 memos in a row without a single error. The committee is shaken. A sign has been put up. | 🧐 | secret | reward 3
14. `typing-pool.potato` | Silent Bow Recipient (Potato Division) (SECRET) | Type 'potato' during a union-mandated pause. The stapler has bowed. It has never bowed before. | 🥔 | secret | reward 5
15. `typing-pool.escape` | Back in 7 1/2 Minutes (Not Back) (SECRET) | Press Escape 7 times and close the lid on the Typing Pool. Nothing happened. | 🕰️ | secret | reward 3
16. `typing-pool.lasagna` | Chancellor of the Wrong Kitchen (SECRET) | Type the lasagna memo without a single error. It was not in the Pool's jurisdiction. It never has been. | 🍞 | secret | reward 7.5

---

## 15. ECONOMY, STATS, SAVE

- `api.award(n, reason)` per finished memo: `pay = clamp(0.3 + 0.1*cleanLines + min(1.5, chars/150), 0.1, 3)` rounded to 2 decimals (the committee's re-score NEVER changes it). Dictated: 0.1. Hush: 1. Apology carriages: 0.5 each, carriage e: 2. Clean line bonus is included in the formula above (0.1 per clean line). Stapler wait: +0.5. Scab fine: -0.5. Jam fee: -0.5. Appeal fee: -0.5. Paste fee: -0.1. Self-stamp: +0.1. Pauline ghost: +0.1 once. Potato bow: +5. Lasagna perfect: +7.5. The engine never lets the balance go negative.
- Stats (`api.stat.inc` etc., all prefixed `typing-pool.`): `memos`, `chars`, `cleanLines`, `errors`, `bell`, `premature`, `piles`, `tapeUses`, `tapeRolls`, `appeals`, `finals`, `pauses`, `waited`, `scab`, `paste`, `jams`, `untangled`, `variants`, `ratified`, `perfect`, `pauline`, `apology`, `laps`, `escapes`, `sandra`, `dictated`, `selfStamps`. (At most about 30 names, well under the 300 cap.)
- Flags read: `metGerald`, `metToaster`, `metStapler`, `metDennis`, `sockSeen` (all shared engine flags). Stats read: `fax-machine.sent`, `tiny-bureaucracy.stamps` (optional extra Management callback, see 16). Flags written: `typing-pool.ratified` (bool), `typing-pool.loops` (count, for other modules to read), nothing else.
- All reads of other modules' stats are `>= 1`-style checks with `api.stat.get` (returns 0 when unset).

---

## 16. CALLBACKS CHECKLIST (SPEC wants >= 3)

Cross-module: `metGerald` -> memo 8a (else 8b, `A Potato (Unmet)`); `metToaster` -> toaster extra line; `metStapler` -> the apology's withdrawn demands; `sockSeen` -> memo 12c; `fax-machine.sent >= 1` -> memo 12b; `metDennis` -> Dennis's memo gets the `cameo` Dennis line 1 in addition; `tiny-bureaucracy.stamps >= 1` -> the Subcommittee for Second Opinions also stamps `AS ALSO STAMPED ELSEWHERE` once (optional, only if lines budget allows).
Internal: memo 1 returns word for word (plus the 6 kind words); the first typo is quoted in memo 6 and again in the strip under the Return memo (`P.S. %typo%`); `Memo 3 has noticed` (appears as a strip line when story memo 7 begins: `Memo 3 has noticed.`); the bell rings by itself at second 3 and at the last Enter; the 7 1/2 returns as the pause length (7.5 s), the stamp, the Disagreement Index, the subcommittee, the floor, the unit; Dennis is cc'd first on every memo forever.

---

## 17. VISUAL DESIGN

Palette (cheerful dysfunctional intranet): cream `#FFF6DC` (module bg), paper `#FFFDF4`, ink `#2B2230` (3px outlines on everything, sticker shadow `4px 4px 0 #2B2230`), desk mustard-brown `#C98A3B` with a subtle wood grain (`repeating-linear-gradient`), mint `#7FD6B2` (received, A tab, self stamp), coral `#FF7A66` (stamps, ribbon) and darker `#C23B2A` for wrong-character text (contrast), lilac `#B9A6F0` (committee, B tab) and `#7b5fc4` for Pauline/dictated ink, mustard `#F2C14E` (bell, brass lever, caret), typewriter body slate-mint `#7FB8A6`, water `#6EC9E8` with a lighter wave band `#A8E6F5`, gold `#F2C230`. Fonts: `'Courier New', Courier, monospace` for paper/slip; `'Trebuchet MS','Segoe UI',system-ui` bold for headers and stamps. No external assets.

Slip: thermal-receipt strip (white, zigzag bottom edge via `repeating-conic-gradient`), monospace, prints in with a `translateY` ease. Stamps: rotated rectangles with a double border, `mix-blend-mode:multiply`, coral or lilac, text uppercase 800 weight; thunk = scale 1.4 -> 1 in 120 ms + 2px shake on the slip. Strike-through of the previous number = a pseudo-element line animating `scaleX` 0 -> 1 (or an SVG `stroke-dasharray`).

Paper details: faint ruled lines (`repeating-linear-gradient`), a thin carbon sheet peeking behind (decor), a coffee ring (radial-gradient ring) that moves 1px per memo, the damp overlay at lvl >= 8, the memo header. Ghost return glyph `↵` at the end of each line; a tiny brass bell icon at the right margin (the BELL button).

Typewriter SVG: inline, ~40-50 elements, viewBox about `0 0 360 150`; keys are circles + one letter each; type bars are 7 curved `path`s with `transform-origin` at their base (`transform-box:fill-box`); the brass lever is the RETURN button (a real `<button>` styled brass).

Pool: static strip at the bottom (water base with two overlaid repeating-radial waves moved by the rAF loop, floats = rounded rectangles, typists = emoji 👩 🧓 👨 🌿 above a tiny SVG typewriter on each float) + the rising layer (translucent water, `pointer-events:none`). Safe emoji only (SPEC lint, Emoji 12 or older): ⌨️ 📝 📎 🔔 🦆 🥔 🍞 🌿 🧐 🤨 😐 🏊 ⚠️ 🏆 📜 🕰️ 🖼️ 🚩 🏅. DO NOT use 🪴 🥲 🫠 or any Emoji 13+. The stapler is drawn in SVG (two rounded rects and a spring); the committee are 🧐 (Clive), 🤨 (Marguerite), 😐 (Mr. Gray) on lilac chairs with speech chips.

Reduced motion: no wobble, no bob, no carriage slide, stamps fade in, water static. Focus rings 3px `#264a8c`. aria: input `aria-label="Typewriter keyboard"`, strip `role="status" aria-live="polite"`, all icon buttons labelled, the pause banner text sits in an `aria-live="polite"` region (not `role="alert"`, which is too noisy).

---

## 18. IMPLEMENTATION HINTS

### 18.1 Architecture of the single file (suggested order)
1. Header comment, constants (`COLS=34`, `TAPE=40`, timing table, bags), `P.injectCSS`, `P.addAchievements`, `P.addLines` (one call per key in section 10), then `P.registerModule({... mount(root, api) { ... } })`.
2. Inside `mount`: `T = api.selftest ? 0.1 : 1` (time scale), state `S`, DOM build with `api.el` (no innerHTML), handlers, loops, return `{ destroy() { save } }`.
3. Functions: `fill`, `n1`, `clamp`, `wrap`, `buildMemo(entry)`, `serveNextMemo()`, `renderAll`, `renderLine`, `typeChar`, `doReturn`, `doTape`, `ringBell`, `finishMemo`, `computeScore`, `buildStamps`, `printSlip`, `runStamps`, `skipToNextMemo`, `appeal`, `selfStamp`, `maybePause`, `startPause`, `endPause`, `maybeTrackedChange`, `variantsFromMemo`, `ratify`, `poolUpdate`, `rafLoop`, `idleTick`, `spamCheck`, `jam`, `untangle`, `onEscape`, `lidClose`, `pauline`, `dictate`, `ending steps`, `save`.
4. All timers via `api.setTimeout/setInterval/requestAnimationFrame`; all listeners via `api.on` (including document and window); engine events via `api.onEvent`. No timers/listeners at file load (only inside `mount`). No `api.exit()` in mount. No `<form>`.

### 18.2 Timing table (normal / selftest)
| thing | normal | selftest |
|---|---|---|
| carriage return anim | 500 ms | 60 ms |
| slip print | 1200 ms | 100 ms |
| stamp interval | 900 ms | 100 ms |
| between memos | 600 ms | 60 ms |
| auto next memo | 9000 ms | 600 ms |
| stapler pause | 7500 ms | 1500 ms |
| first pause in memo 3 | 25 s | 1.5 s |
| tape lockout | 12000 ms | 1500 ms |
| jam duck rescue | 15000 ms | 2000 ms |
| idle thresholds | 20/45/60/90/180/480 s | x0.1 |
| story `minSec` | table | x0.02 |
| Escape lid | 7500 ms | 1000 ms |
Memos never take less than a couple of fuzz steps: the fuzz presses Enter, clicks FILE AS IS, taps DICTAPHONE and types into the input, so many memos finish in a run and the story advances.

### 18.3 Engine and lint compliance reminders
- sfx names allowed: `blip bloop ding honk boing sad fanfare error stamp pop whoosh tick tada bell buzz`. Mapping used here: correct char `tick`, wrong char `blip`, return `ding`, premature return `boing`, margin bell `bell`, tape `pop`, stamp `stamp`, score down `sad`, score up `fanfare`, paper out `whoosh`, jam `buzz`, scab typing `sad`, achievement `tada` (engine does it), bell fatigue `honk`.
- No `Date.now`, `Math.random`, `performance.now`, `document.body`, `document.title`, `localStorage`, `console.*`, `innerHTML`, `fetch`, `alert`. Use `api.now()`, `api.rand()`, `api.save`. Read the reduce-motion body class via `root.closest('.pm-reduce-motion')`.
- `api.stat.*` names prefixed `typing-pool.`; achievements and flags prefixed `typing-pool.` (except the shared flags you only READ).
- Every visible string: no `NaN`, `undefined`, `null`, `[object Object]`. Guard every number with `isFinite`. `%token%` placeholders must all be filled before display (`fill()` with fallbacks). `api.say` lines must not contain braces.
- `api.say` rate: the narrator coalesces priority 0 chatter, so use `priority:1` for key beat lines (score, stapler, cameos, secrets, ending) and put the small stuff in the strip.
- DOM caps: slip stamps <= 6, outbox sheets <= 12 (count is a number), archive 6 entries, toasts few, strip is ONE element whose text is replaced, newsletter ONE line, post-it ONE element.
- Quality gates before shipping: `node tools/lint.js games/typing-pool.js`, `node tools/selftest.js typing-pool`, `node tools/selftest.js typing-pool --real`, and `node tools/shot.js typing-pool --width 360` plus `--width 1280` (check the paper fits 34 columns at 360px).

### 18.4 A few load-bearing algorithms (pseudo-code)
```
wrap(text, cols): words = text.split(' '); line=''; out=[];
  for w of words: while (w.length > cols) { if (line) {out.push(line); line='';} out.push(w.slice(0,cols)); w=w.slice(cols); }
  if (!line) line = w; else if ((line + ' ' + w).length <= cols) line += ' ' + w; else { out.push(line); line = w; }
  if (line) out.push(line); return out;

computeScore(): see 4.2. Always guard: total = Math.max(1,total); elapsed = Math.max(1, (now - startedAt)/1000); every output through clamp/isFinite.

worstWord(): iterate lines; for each target word range [s,e): bad = count of i in [s,e) where typed[line][i] !== target[i] (typed shorter counts as bad).

spamCheck(kind): push now; drop entries older than the window; compare counts; if (!jam && now > jamCooldown) startJam().

startPause(): if (!eligible()) return; pauseUntil = now + 7500*T; scab=false; show banner; ring animation CSS (duration var); my=serial; api.setTimeout(endPause, 7500*T) (guard serial and phase).
  keystroke while pauseUntil > now: if (!scab) { scab = true; fine; }
  endPause(): if (!scab) { pay; thanks; waited++ } hide banner.
```

---

## 19. RISKS: THE 5 MOST LIKELY IMPLEMENTATION BUGS

1. **Double or lost typing from the two input paths.** Desktop `keydown` and mobile/IME `input` must never both type the same key, and soft-keyboard Backspace on an empty field produces no event. Mitigation: `preventDefault()` on every printable `keydown` (so `input` does not fire), the zero-width sentinel value so a soft Backspace is an `input` event with an empty value, reset the sentinel after every handled event, cap characters per `input` event (40), and keep the on-screen RETURN and TAPE buttons as guaranteed touch paths. Test by dispatching both real-looking keydown events and a bare `input` event with arbitrary text (the fuzz does the latter).
2. **Target-text mutation misaligning the typed index.** Sandra's tracked changes, ratified spellings and `%typo%`/`%sib%` substitution all change text that was already wrapped. If a line is changed after a character has been typed, or the memo exceeds the cap, or a substituted string contains characters outside the charset, typed indices no longer match and scoring/caret rendering breaks. Mitigation: apply ratified/typo substitutions BEFORE `wrap()`, sanitize every substituted string, re-check the 300-character cap, only mutate a line with zero typed characters and `j >= cur + 2`, never change the line count, and cap changes per memo.
3. **State-machine races and stale timers.** Stamp timers, slip printing, the 9 s auto-advance, the stapler pause, Pauline's interval and the Dictaphone hold can fire after the memo has moved on (double next-memo, stamps from the previous memo painting on the new slip, pause ending in the wrong memo), or Enter during SLIP could advance twice. Mitigation: the memo `serial` guard on every callback, keep timer ids in arrays and clear them in `skipToNextMemo()`, one `phase` variable checked at the top of every handler, and make `skipToNextMemo()` idempotent. Release Dictaphone/Pauline on pointerup/pointercancel/blur/visibilitychange.
4. **Numbers and strings leaking `NaN` / `undefined` / `null`.** Empty memos (`total` 0), `elapsed` 0, a missing `%typo%`, `typos[]` empty, `api.player.name` with non-ASCII characters, `unit` bag exhausted, `lines[cur]` undefined after the last line, or `toFixed` on a non-finite value all produce forbidden text and fail the fuzz run. Mitigation: `clamp`/`n1` helpers everywhere, `fill()` with explicit fallbacks, `Math.max(1, ...)` denominators, never index `lines[cur]` without checking `cur < lines.length`, and keep the `unit`/`reason` bags as shuffle bags that refill.
5. **Performance, DOM growth and false-positive spam.** Re-rendering the whole memo per keystroke, a per-character span for 400 characters, an unbounded outbox/archive/stamp list, a rAF loop that keeps running after destroy, or a jam overlay that covers real controls will blow the 700-node budget or the fuzz leak checks; and a spam detector tuned too low will jam a legitimate fast typist. Mitigation: `renderLine(i)` only, run-grouped spans, hard caps (6 stamps, 12 sheets, 6 archive entries), all loops via `api.requestAnimationFrame`/`api.setInterval`, the jam overlay placed over the typewriter graphic only, thresholds exactly as in 12.2 (28 chars in 2 s), and run `?selftest=typing-pool` plus the remount storm before shipping.

(Also watch: the hidden input losing focus after button clicks, the Escape lid swallowing input forever if its timer is cleared, and the container-query font size making 34 columns overflow at 360px.)

---

## 20. DEFINITION OF DONE

- Opens with `?dev=typing-pool`: memo 1 on the paper, hanging slip visible, bell rings at 3 s, first key says `A bold opening`.
- 3 stamps then `FINAL (PROVISIONAL): 7 1/2` on every memo, forever; appeal works; units change from memo 5; committee of three from memo 4; meta from memo 9.
- Stapler pause pays for silence and fines scab typing; approved variants quote your typo from memo 6; cc line grows; pool rises 2.4 percent per memo up to 24 percent; the apology plays in five carriages; the loop returns to memo 1 and the module never ends.
- Idle ladder, spam tangle, paste/escape/eraser/sandra/potato/lasagna/blind/perfect secrets all reachable.
- >= 6 achievements declared with >= 2 secret (16 and 7 here), >= 80 lines (200+ here), >= 3 callbacks.
- `node tools/lint.js`, `node tools/selftest.js typing-pool` (and `--real`) pass; no console.error; no forbidden strings; 360px layout holds 34 columns without horizontal scroll.
