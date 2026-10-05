# DESIGN BRIEF: Fax Machine Frenzy  (module id `fax-machine`)

Final brief by the showrunner. Builder: read SPEC.md and VOICE.md first, then build `games/fax-machine.js` (single file, <= ~1700 lines, classic script, no modules, no network). Everything you need is below. Where this brief says "verbatim", copy the string exactly (fix only JS quoting). Do not ask questions; where something is unspecified, decide sensibly and keep it small.

Registry values:
- id `fax-machine`, title `Fax Machine Frenzy`, icon `📠`, category `game`, unlockCost `0`, tags `['fax','retro','correspondence']`
- tagline (verbatim): `Send nothing to no one. Receive everything from nobody.`
- window title: `api.setTitle('Fax Room (Unit 7 1/2)')`
- CSS prefix `m-fax-machine-`; CSS injected with id `css-fax-machine`; stats prefixed `fax-machine.`; achievements prefixed `fax-machine.`; flags prefixed `fax-machine.` except the shared read-only `metGerald`.
- Module-private lines live in JS arrays and are spoken with `api.say(text,{who,mood,priority})` (so no `m:fax-machine:` line categories are needed). Global lines (section 12) go through `P.addLines`.

What was kept and cut from the three pitches:
- KEPT (pitch 1 spine): the three rotating verbs SEND / RECEIVE / FILE; the self-printed TEST PAGE as the zero-input first joke; thermal paper that curls unless you hold it flat (the physical heart of the module); tear along the perforation; 25-second thermal fade and the Binder as the only way to keep a fax; the four-pulse handshake tap that cannot be failed; five-outcome shuffle bag after every send; Sandra's mandatory fields (a slider that snaps back, a checkbox that has already ticked itself, a red lamp that goes green); the jam (crumple-smoothing minigame that always succeeds); crosstalk (two faxes at once); Nobody's growing letterhead; the dotted-line drawings; Wrong Number + "Forward to No One"; the Toaster/Gerald cameos; the ending where the machine faxes itself ("CONNECTED (BOTH PARTIES: YOU)"), FINAL NOTICE, "Re: Final Notice", and the reset with "SOMEBODY (provisional)".
- KEPT (pitch 2): the Sender ID that resolves one letter per beat (`------` to `NOBODY`), URGENCY INFLATION (six tiers on the URGENT stamp), the STATUS drift on every report, RE: matching (what you choose on the RE drum shapes what Nobody says back), the quiet beat ("THE OTHER END HAS HUNG UP. THE OTHER END IS STILL ON THE LINE. BOTH ARE TRUE."), your own first fax coming back "in transit", the rare happy-machine photograph and the sock smudge, the service sticker ("Last serviced: next Thursday"), the "all stamps" secret, the Warm Line idle ladder, the Rapid Dialing Surcharge.
- KEPT (pitch 3): the word CONFIRMED running gag (a four-step chain), "Nobody, Senior / on vacation / retired and replaced by a younger Nobody" lines, the handset gag ("...hello?" / "Sorry, wrong machine"), Y/Y button idle prompt, the "Landscape mode engaged" narrow-width joke, the "Page scaled to fit: 3%" rapid-resize joke, the special dial numbers (0, 911, 276).
- CUT as unbuildable or redundant: the 3-lane rhythm spectrogram (the four-pulse scope replaces it), Speed Dial, Broadcast, the broom and the Floor pile, redaction marker, the Delay dial, Heat meter, Backlog meter and rank titles, the "Other Machine 555-0100" subplot (Nobody IS the other machine), upside-down feeding, prophecy and 1987 faxes, the EXISTENTIAL LED, SVG turbulence filters, a free-text RE: input (a drum is safer for fuzz and for keyboard shortcuts), pages-of-handwriting font matching the player's name (replaced by a plain cursive class from beat 7), the spike. Sound is `api.sfx` only.

---

## 1. Concept

You operate the only fax machine in a building with no other offices. You send urgent, confidential memos to Nobody. Nobody has been expecting you since 1994. The machine prints its own test page before you touch anything ("If you can read this, the test has not failed."). You dial any number, slam a few rubber stamps, press SEND, tap along to a modem handshake that cannot be failed, and receive a Transmission Report that always says OK and always tallies the recipients differently ("0 recipients, 1 hat"). About a minute in the machine RINGS. Nobody is faxing back. The paper is thermal and curled: you must hold it flat to read it, tear it, and file it in the binder before the ink fades in 25 seconds. Over ten minutes Nobody's faxes quote your RE: lines, get warmer, ask you questions, and resolve their own sender ID one letter at a time (`------`, `N-----`, ... `NOBODY`). At about 9 minutes your very first fax comes back "in transit" and Nobody asks for your number ("Not the one you dial. The one you are."). The number printed on the machine's own label is already in the dial. Send it and the machine calls itself. There is no way to win; the faxes continue, a little shorter and a little kinder.

One-sentence loop (6-20 seconds, rotating, so no 20 seconds feel the same): dial, stamp, SEND and tap the handshake; then when it rings, hold the paper flat to read it, tear it, and file it before it fades.

The three verbs are SEND (dial, RE, stamps, handshake), RECEIVE (hold flat, tear), FILE (binder). The player is "Valued Employee" (or their chosen name; read `api.player.name` for paper text, and let `api.say` substitute `{player}` for Management lines).

---

## 2. Screen layout and components

Desktop (>= 760px root width): CSS grid, two columns. Left 62% is THE MACHINE; right 38% is the PAPER column (roll, tray, binder). Under 760px they stack in this order: LCD + scope, keypad row, cover sheet, paper roll, binder, out-tray. Under 480px root width a `compact` class applies (the keypad stays 4x3 at >= 44px keys; the sheet text shrinks) and Management says the Landscape line once per crossing (line T3).

THE MACHINE (a beige rounded-rectangle with a 3px dark outline and a hard `4px 4px 0` sticker shadow; real `<button>`s everywhere):

1. TOP BAND: status LED row (READY mint, RING coral, BUSY mustard, JAM coral blink; `aria-hidden` dots with a text label each), a label plate `FAX ROOM UNIT 7 1/2   555-0107` (the machine's own number: this plate is the ending's secret), and a tiny SERVICE STICKER button (`Last serviced: next Thursday.`, see S9).
2. LCD (amber-green, `aria-live="polite"`, `role="status"`): line 1 is status text (<= 3 wrapped lines, `min-height:3.6em`), line 2 is the dial display (digits in a monospace "7-segment look" with `text-shadow: 0 0 6px`), plus a small page counter `PAGE 1 OF 1` right-aligned. Faint scanline overlay (`repeating-linear-gradient` 2px).
3. SCOPE: one `<canvas>` 320x90 internal pixels (CSS width 100%, `aspect-ratio: 320/90`, `touch-action:none`) used for the handshake, the page scan and (in the ending) the two matching waves. A real `<button>` labelled `TAP` sits directly under it (the keyboard and touch way to hit pulses).
4. COVER SHEET (the OUTGOING FEEDER, a clipboard card): `TO:` (mirrors the dial digits, or `NOBODY (MAIN)` placeholder in grey), `RE:` (the drum, see 4.2), `PAGE x OF y` (running gag), a stamp layer (absolute, up to 6 tilted stamps), a Sandra clause area (rows appear from beat 4), and the PAGES stepper `- 1 +`.
5. STAMP RACK: four rubber stamps (buttons) `URGENT` (its label inflates, see 5.4), `CONFIDENTIAL`, `PLEASE DISREGARD`, `DRAFT OF A DRAFT`, plus a fifth `SEEN` that slides in after the 3rd send.
6. KEYPAD: 12 buttons `1 2 3 / 4 5 6 / 7 8 9 / 1/2 0 C` (`1/2` appends the half key, `C` clears). Dove-grey keys, cream numerals, pressed state `translateY(2px)`. Keys pulse (`m-fax-machine-pulse`) until the first dial and again after 15s idle.
7. BIG BUTTONS: SEND (green, huge), and a small `HANDSET` (a 📞 emoji button on a cradle, gag only).
8. PAPER ROLL (right column top): the OUT-SLOT where received faxes emerge (up to 3 live sheets, newest on top, crosstalk sheets overlap by a 14px offset and 2 degree rotation). Each sheet is described in 4.8.
9. OUT-TRAY (right, middle): up to 4 transmission-report strips and fee/notice strips (newest first, oldest drops with a `tick`). Click a strip to tear it (`+0.1 Meh`, once per strip).
10. BINDER (right, bottom): a filing binder with a count `FILED: 12` and a button to open the drawer (key H). The drawer lists up to 20 filed faxes as one-line previews (click one to expand its text; ink opacity shows the frozen ink level). Oldest rolls off with the `shredded by wind` line.
11. A scoreboard line under the LCD, always labelled `Fax Productivity Index (Unitless)` and showing `Sent 4 / Received 2 / Filed 1` (all integers; Management celebrates every integer).
12. An UNJAM overlay appears over the cover sheet only while jammed (the paper accordion plus buttons, see 4.7).

Real `<button>` elements for: keypad keys, drum, stamps, stepper, SEND, TAP, handset, sheet action buttons (TEAR / FILE / FORWARD), binder toggle, jam buttons, service sticker, Y/Y idle buttons. Sheets are focusable (`tabindex=0`, `role="group"`, `aria-label` e.g. `Incoming fax from NOBODY. Hold Space or G to flatten.`). All targets >= 44px on coarse pointers. Visible focus rings (`outline: 3px solid #264a8c; outline-offset: 2px`).

---

## 3. Controls (all must work; keyboard-only play fully supported)

| input | action |
|---|---|
| click/tap keypad key, or keys `0`-`9` | dial a digit (max 12 characters shown); `api.sfx('tick')` |
| key `/` or `.` or the `1/2` key | dial the half key (the char `½`) |
| `Backspace` | delete one character; `Esc` or the `C` key clears all |
| click/tap the drum, or `]` / `[` | roll the RE: drum forward / back |
| click/tap a stamp, or keys `Z` `X` `C` `V` `N` (URGENT, CONFIDENTIAL, PLEASE DISREGARD, DRAFT OF A DRAFT, SEEN) | toggle that stamp on the sheet (`api.sfx('stamp')`; re-click removes) |
| `-` / `+` stepper buttons (or `Minus` / `Equal` keys) | pages 1..5 (cosmetic, changes scan time) |
| SEND button, or `Enter` | start transmission (see 4.3). While the handshake is running `Enter` taps instead |
| TAP button, `Space`, `Enter`, or click/tap the scope canvas | tap a handshake pulse (only while the handshake runs) |
| press and hold a sheet (pointerdown ... up), or hold `Space`, or hold `G` | flatten the ACTIVE sheet (see 4.8); release curls it back |
| drag a held sheet down 70px, or press `T`, or the sheet's TEAR button | tear the active printed sheet off the roll |
| `F`, or the sheet's FILE button, or drag a torn sheet onto the binder | file the active sheet (tears it first if needed) |
| `W`, or the FORWARD TO NO ONE button on a wrong-number fax | forward it (always works) |
| `H` or the binder button | open/close the drawer |
| `J` (or the jam panel buttons) | jam: first press opens the lid, next three presses smooth the paper |
| click the handset | lift/replace the handset (gag lines) |
| `Esc` while the drawer is open | close the drawer |

Rules:
- Ignore `keydown` where `e.repeat` is true, except for hold keys (they only START on the first non-repeat keydown). Ignore any key with ctrl/alt/meta held. The Lobby owns letters only in the Lobby; inside this module every letter belongs to the module (the boss key is the grave accent, which the module never uses).
- SPACE OWNERSHIP RULE: Space is "hold flat" EXCEPT (a) during the handshake it is a pulse tap, and (b) when a real `<button>` that is NOT a sheet has keyboard focus (`el.matches(':focus-visible')`), where Space activates that button natively (do not `preventDefault`). `G` is always "hold flat", so keyboard players on a focused button still have a hold key. After a mouse/touch click on a button, call `btn.blur()` so Space goes back to meaning "hold flat". `Enter` is "SEND" EXCEPT when a button has focus (native click) and except during the handshake (tap).
- For Space/Enter/G handled by the module, call `preventDefault()` on both keydown and keyup so a focused button does not also click and the page does not scroll. Never intercept keys while the event target is an `<input>` (the Sandra slider/checkbox): in that case do nothing.
- If a hold is never released (fuzz, lost keyup, `blur`, `visibilitychange` hidden, `pointercancel`, `lostpointercapture`): auto-release at 15s of hold and on those events. `setPointerCapture` in try/catch.
- Never block the player: no state is a dead end. SEND while the line is busy shows a joke and is queued ONCE (held, not lost). Every timed state has a hard cap (jam 30s, handshake 3.2s, ending ceremony <= 25s).
- While you hold a sheet with the mouse you are not pressing SEND with the same pointer (that falls out naturally); keyboard players can hold Space and press Enter at once. This is a feature; say nothing.

---

## 4. The mechanics, exactly

### 4.1 Dial and special numbers

- The dial buffer is a string of up to 12 chars from `0-9` and `½`. LCD line 2 shows it (or `_ _ _ _ _ _ _` placeholders when empty). `digits = buffer` stripped of `½`.
- ANY buffer is valid. Wrong number is not a thing. An empty buffer dials `NOBODY (MAIN)` with lines B6/B7. LCD annotation after 7 or more digits: `NOBODY (EXT. <digits>)`; fewer than 7 digits (and not special) gets line B5.
- Special numbers (compare the normalised buffer; leading zeros for the self number are not stripped):

| buffer | result |
|---|---|
| `0` | Operator: line B8; prints a one-line fax (Operator), no Meh bonus |
| `911` | line B9; prints a one-line fax |
| `276` | prints a fax: `FORM 27B/6 (REQUEST FOR FORM 27B/7)`, line B10 |
| `7½0` | Seventh-and-a-Half Floor: one-time special fax (S3), achievement `fax-machine.wrong_number` |
| `5550107` | SELF-DIAL (S4); in beat 9 it is the ENDING instead (section 10) |

- A redial (same buffer sent twice in a row) uses line B4. The first number and first RE dialled are stored (`firstTo`, `firstRe`; `firstTo` may be the empty string, stored as `''`) for the ending.
- The dial buffer is NOT cleared by SEND (REDIAL is just pressing SEND again); `C`/Esc clears.

### 4.2 Cover sheet: RE drum, stamps, pages, Sandra's fields

RE DRUM. A rotating label button. Each entry has `text` and `key`. Roll order is the unlock order. The first entry is selected at start.
- Base (beat 0): `Re: Your Fax` (yourfax), `Re: Re:` (rere), `Re: (blank)` (blank), `Re: Q3 Nothing Review` (q3), `Re: The Memo` (memo).
- Unlocked at beat 3: `Re: Weather` (weather). Beat 5: `Re: Toast` (toast), `Re: Socks` (socks). Beat 6: `Re: Yes` (yes), `Re: I Am Here` (here), `Re: Who` (who).
- Each unlock is announced with line B12. The drum animates a quick `translateY` flip (150ms; instant under reduced motion). The selected `key` is read at SEND time and stored in `S.lastRe` (text + key).

STAMPS. Toggle semantics: up to 6 stamp marks on the sheet; clicking a stamp that is on removes it; clicking a stamp that is off adds it with a random tilt (-4..6 degrees via `api.rand`, stored in a CSS variable `--tilt`), a `thunk` (translateY + scale keyframe, 180ms) and a small ink splat (radial-gradient pseudo-element, `mix-blend-mode: multiply`). Stamp inks: red `#c0392b` for URGENT and PLEASE DISREGARD, navy `#264a8c` for CONFIDENTIAL, DRAFT OF A DRAFT and SEEN. The stamp rack buttons show `aria-pressed`. Stamps are cleared from the sheet when SEND succeeds (the sheet is "consumed") and the sheet is replaced by a fresh one.
- 4 or more stamps on the sheet at once: the Maximum Priority line (B13); once per send, an extra mark `COMPLIANCE ACKNOWLEDGES RECEIPT` lands on the sheet (line B14), which does not count toward the six.
- All five stamps at once (URGENT, CONFIDENTIAL, PLEASE DISREGARD, DRAFT OF A DRAFT, SEEN): secret S6.
- URGENCY INFLATION: the URGENT stamp's label and the marks it leaves follow the tier (5.4), tied to total sends.
- Management reacts to each stamp placed (bag per stamp, lines B11), at most once per 3 stamps (priority 0).

PAGES stepper: `PAGES: n`, 1..5. `scanSec = 1.2 + 0.6*(n-1)` seconds.

THE PAGE COUNTER (running gag, 5.2): the cover sheet and every received fax carry `PAGE x OF y`, driven by the beat table.

SANDRA'S FIELDS (from beat 4). Three physical widgets are added under the cover sheet one at a time (at beat 4, at the 2nd send after beat 4, at the 4th send after beat 4). Each addition is announced with lines I1-I3. Each is a REAL input and never blocks sending.
1. `Reason for Confidentiality`: a ticked checkbox-style chip (`<button>` `aria-pressed="true"`) whose label reads `SANDRA`; clicking does nothing but make it nod (class bounce).
2. `Confidentiality Level (1 to 7 1/2)`: `<input type="range" min="1" max="7.5" step="0.5">`; whenever it changes, after 600ms (managed timeout) it snaps back to 7.5 and shows line I4 (a bag; not more than once per 6s).
3. `Number of Pages Including This Sentence`: `<input type="checkbox" checked>`; on `change` it re-checks itself after 400ms (managed timeout) with line I5 once per 6s.
- RED LAMP: while any Sandra field exists, pressing SEND first shows LCD `COMPLIANCE REVIEW (SANDRA)...` with a red lamp for 1000ms (in selftest 300ms), then it turns green and says `APPROVED (SANDRA)`; the pipeline continues. The lamp is purely visual and delays nothing else (line I6, once per 5 sends).
- From beat 4, 1 in 4 cover sheets carries a decorative stamp `REVIEWED BY S. (REVIEW PENDING)` (a faint lilac stamp, not counted).

### 4.3 SEND pipeline and the line state machine

`S.line` is the single source of truth for the telephone line. States: `IDLE`, `SENDING` (sub-phases FEED -> SHAKE -> SCAN -> REPORT), `JAMMED`, `RECEIVING` (a ring and the print of an incoming fax, until the last line is printed), `BUSY` (spam cooldown, 6s), `ENDING` (ceremony, section 10), `HUSH` (the quiet beat, no rings, still sendable).

Each sequence started by SEND or by a ring carries an `epoch` number (`S.epoch++` at its start; every managed timeout and rAF callback of the sequence checks `epoch === S.epoch` and aborts if stale). Pressing Esc does NOT cancel a transmission (Esc only clears the dial). Destroy sets `S.dead = true` and every callback checks it.

SEND pressed:
1. If `S.line === 'BUSY'` or `'ENDING'`: LCD `LINE BUSY` plus a joke from lines E-busy; do nothing else (counts toward spam).
2. If `S.line === 'SENDING'` or `'JAMMED'` or `'RECEIVING'`: one pending send is queued (`S.queuedSend = true`); LCD `BUSY: HOLDING YOUR FAX`; a second press while queued only makes a line (E-busy). The queued send starts automatically when the line returns to IDLE.
3. Else start: `S.line = 'SENDING'`, read the dial buffer, stamp list, RE and pages into `S.cur`. Lines: dialing line (B1-B3, redial B4). LCD `DIALING <number>...`.
4. FEED (450ms, selftest 140ms): the cover sheet slides up into the feeder (CSS translate + opacity), `api.sfx('whoosh')`.
5. SHAKE (handshake, 3.2s, selftest 1.0s): see 4.4.
6. SCAN: the sheet scans past the scan-bar on the canvas for `scanSec` seconds (selftest x0.3), LCD `SENDING PAGE i OF n (OF 0 ATTACHED)` stepping once per page. From beat 5, a jam may interrupt here (4.7).
7. REPORT (600ms): the TRANSMISSION REPORT strip prints into the out-tray (4.5), `api.sfx('ding')`. Rewards: `api.award(0.5, 'send')` (+0.3 for a perfect handshake, `api.award(0.3,'clean line')`); `api.stat.inc('fax-machine.sent')`; stat `fax-machine.handshakes`/`.perfect` as needed. Then the surprise bag (4.6). A fresh cover sheet appears (stamps cleared, RE kept, dial kept). `S.line = 'IDLE'`; the ring scheduler (4.8) is told a send happened.

Under `api.selftest` multiply all these durations by 0.3.

### 4.4 The handshake (the timing minigame that cannot be failed)

- The scope canvas draws a scrolling sine-plus-noise waveform and four pulse markers (small bright vertical ticks with a ring) travelling right to left toward a fixed HIT LINE at x = 60. Pulse arrival times (seconds from handshake start): `0.8, 1.4, 2.0, 2.6`. Total duration 3.2s. Draw with delta-time from the rAF timestamp argument.
- The LCD cycles onomatopoeia (bag C1) while it runs.
- A tap (Space/Enter/TAP/click canvas) counts as a HIT for the nearest un-hit pulse if `|tapTime - pulseTime| <= 0.22s` (window x1.6 under reduced motion), else it is a MISS (a small static burst on the canvas, soft `buzz`). Each pulse resolves when it is hit or when 0.22s past its time. Hits play a rising `bloop` (pitch cannot be changed, so use `bloop` for hits and `blip` for the 4th), misses play `buzz` at most once per handshake.
- `hits` in 0..4. `perfect = hits === 4`. Static streaks on the scanned page = `(4 - hits)` clusters of 3 thin semi-transparent bars (drawn on the canvas during the scan, and also a faint `--static` overlay on the report strip). Result lines C2 (perfect), C3 (sloppy), C4 (no taps at all). It always connects: LCD `HANDSHAKE: 100% (OF WHAT WAS ATTEMPTED)`.
- Consequence is cosmetic and Management says so (C2 line 2).
- In the ending the same canvas draws two sine waves that start 3 radians out of phase and converge to identical over the 3.2s (section 10); taps still count but do nothing.
- The first time ever (stat `fax-machine.sent === 0` at start) Management explains: line C5.

### 4.5 Transmission Report (running gag 5.1)

A paper strip in the out-tray with these lines (the number is `NOBODY (MAIN)` for an empty dial, else `<digits as typed>`):
```
TRANSMISSION REPORT
TO: <number>        PAGES: <n>
RECIPIENTS: <tally>
STATUS: OK (<paren>)
DURATION: <D>
```
- `<tally>` comes from the tally sequence (E-tally): sends 1-5 in order, send 6 is the break (`1 (NOBODY, SILENTLY, ONCE)`; Management says nothing at all), then a shuffle bag of the later tallies. Ending self-send always uses the final tally. Tally sequence index persists in `api.save` (`tallyN`).
- `<paren>` is by beat (5.3). `<D>` is from lines E-dur (bag).
- The surprise bag (4.6) can swap the report for a variant.
- A strip can be torn by click (reward `0.1`), after which it is removed from the tray; strips never exceed 4 in DOM.

### 4.6 The Randomizer of Surprise (after every send)

A shuffle bag of five outcomes (never the same twice in a row across the seam): (a) normal OK report; (b) a different department received it (report line `RECEIVED BY: <dept>` from E-dept); (c) the sheet comes back: a second strip `RETURN TO SENDER` (E-return); (d) an out-of-schedule fax from Nobody arrives in 2s (schedule a ring with the ring scheduler, only if fewer than 3 live sheets and the scheduler allows it, otherwise treat as (a)); (e) Sandra adds a mandatory line to the cover sheet (before beat 4 treat as (a); from beat 4 it makes the next Sandra field appear early if one remains, otherwise just a Sandra memo line I7). Each outcome calls `api.sayRandom`-style a line from E-send (priority 0) unless the report is the silent send-6 break.

### 4.7 The jam (physical comedy; always resolves)

Enabled from beat 5, never in the first 3 sends, never twice in a row, probability 1/6 per send, rolled when the SCAN phase starts. The line goes `JAMMED`, JAM LED blinks, the cover sheet is replaced by a paper ACCORDION (five stacked divs with alternating `skewY(-6deg/6deg)` and a shadow). The jam panel shows:
1. Button `OPEN LID` (key J). Pressing it opens the lid: line J2.
2. Button `SMOOTH THE PAPER` (a crumpled corner element; click it, or drag it back and forth, or press Enter when it is focused, or press J): needs 3 successful smooths after the lid is open. Each smooth: lines J4 (k=1, 2). The third resolves it.
3. The lid closes itself, the line J5 plays, the pipeline resumes from the SCAN phase. `api.stat.inc('fax-machine.jams')`, `api.award(1,'jam')`.
- Wrong order (smooth before the lid is open): line bag J3 (6 lines), costs nothing.
- Hard cap: auto-clears after 30s (selftest 6s) with line J6. In all cases the sequence continues.
- A ring that arrives while jammed waits (the line is `JAMMED`); it fires after the jam resolves.

### 4.8 RECEIVE: rings, sheets, hold-to-flatten, tear, fade (the heart)

Ring scheduler (play time only counts when the player has acted in the last 20s, see 5):
- The first ring is part of beat 2. After that, `S.nextRingAt` (play seconds) is set after every send to `now + rand(12,25)` and after every ring to `now + rand(14,30)` for beats 2-5, `rand(10,22)` for beats 6+. At beat 6+ each ring has a 35% chance to be a DOUBLE (two faxes at once: crosstalk). At most 3 live sheets exist; if the cap is reached the ring is skipped and rescheduled (the oldest live sheet is also retired as in the cap line, E-cap).
- A ring happens only when the line is `IDLE` (or defers up to 8s: LCD `INCOMING (HOLDING)`; if still not idle, retry every second). Not during `HUSH` or `ENDING`.
- Ring sequence: `S.line = 'RECEIVING'`, LED RING blinks, the machine gets the shake class for 1200ms (disabled under reduced motion: a border-colour pulse instead), the handset jiggles, LCD `RING. IT IS FOR YOU.` (bag F-lcd), `api.sfx('bell')` three times at 0, 450, 900ms (managed timers). At 1300ms the sheet starts printing out of the slot. The line returns to `IDLE` after the LAST printed line of the last sheet in the ring.
- Beat 8 (the Touching Part) replaces the three bells with a single slow `bell` and a longer gap ("the ring tone becomes slower and more tentative").

Composing what arrives (`composeFax()`), in this priority order, every incoming fax:
1. A scripted fax at the head of `S.script` queue (beat milestone faxes; see 5.5), if the beat has queued one.
2. A cameo (section S7) if the beat allows it and it has not fired in this save.
3. A rare event roll (beat >= 4 only, and not while hush): wrong number 1/12 (never twice in a row), paper low 1/30, happy machine 1/60, sock smudge 1/45 (once per save). One roll partitioned across the four.
4. A RE-matched reply: if the player's last RE key has lines in `RE_REPLIES[key]` (section 6.H) and a 55% chance (always at beats 3 and 6 for freshness), use that key's shuffle bag; otherwise a tier bag (A for beats 2-3, B for 4-5, C for 6-7, D for 8+). Stamps matter: if the last sent fax had >= 1 stamp, 30% of the time the reply is the CONFIRMED chain step instead (5.6).
5. After the first ending (lap >= 2) use the LAP bag instead of tiers (shorter, kinder).
The fax body is always `{re}`-substituted by your own `String.replace` (`{re}` = last RE text without the leading `Re: `, or `(blank)` if none yet) and the sender header is built from 5.3.

SHEET anatomy (each live sheet is one `div.m-fax-machine-sheet` with `--curl` (0..1), `--ink` (0..1) custom properties):
- header: `FROM: <sender>`, optional letterhead line, `TO: YOU (PROBABLY)`, `PAGE x OF y`;
- body: the text, soft-wrapped; printed LINE BY LINE (one line per 280ms, selftest 90ms) with `api.sfx('tick')` for each line (at most 8 ticks per sheet); the sheet container grows as lines are printed (animated `max-height` or clip-path);
- footer: perforation (`repeating-radial-gradient` dotted line), the fax's id `FAX #<n>` and the machine's own number `555-0107` (printed at the top of every fax header as `FROM-LINE 555-0107` in small type: that is the number the ending needs; always print it);
- action row of real buttons: `TEAR` (visible while on the roll and fully printed), `FILE` (visible once torn), and `FORWARD TO NO ONE` (only on wrong numbers).

THERMAL CURL (the physical rule): every sheet is born with `--curl: 1` (fully curled: `transform: perspective(500px) rotateX(calc(var(--curl)*62deg)) scaleY(calc(1 - var(--curl)*0.55))`, `transform-origin: top`, `filter: blur(calc(var(--curl)*3px))`, text unreadable). While the sheet is HELD (pointer down on it, or Space / `G` for the ACTIVE sheet) its curl target is 0; on release the target is 1. One rAF loop (managed) moves `curl` toward the target with an exponential ease (`curl += (target - curl) * min(1, dt*9)`; release uses `dt*5` and a small spring wobble when not reduced motion); writes `--curl` to the style only when it changed by > 0.004. Under reduced motion curl snaps to the target. A sheet is LEGIBLE when `curl < 0.25`; legible time accumulates `S.flatSec` (and `api.stat.inc('fax-machine.flatSeconds')` per whole second). While held, ink fade still runs. Releasing plays `api.sfx('tick')` (the tiny spring sound).

ACTIVE SHEET: the most recently pointer-pressed, hovered (pointerenter), focused or printed sheet; defaults to the newest. Space/G flatten only the active sheet (crosstalk makes you juggle by clicking or Tabbing between sheets). Removal of a sheet clears `S.active` if it pointed to it.

TEAR: only for a sheet that is on the roll and fully printed. Triggers: dragging the held sheet downward past 70px (from pointerdown), `T`, or the TEAR button. Result: tearing noise (`api.sfx('pop')`), the sheet detaches and slides into the TORN row below the roll; a small paper-flag stub stays on the machine (a 12px div, capped at 3). `api.award(0.2,'tear')`, `api.stat.inc('fax-machine.torn')`, bag line F-tear. Tearing a sheet twice is impossible (state flag).

FILE: a torn sheet can be filed by dragging it onto the binder (pointer drag with a `elementFromPoint` check, or HTML5-free simple pointer logic), pressing `F`, or its FILE button. `F` on an untorn printed sheet tears then files in one go. Filing: the sheet leaves the DOM, the binder count increases, a tab stamp appears, the fax is stored as a compact record in the drawer (cap 20, oldest rolls off with line F-roll), `api.award(1,'file')`, `api.stat.inc('fax-machine.filed')`, line F-file, filed ink value is frozen at its current `--ink`.

THERMAL FADE: each sheet has `ink = 1` at the end of printing and then loses `dt / FADE` per second while it is on the roll or in the torn row (`FADE = 25` seconds; selftest 9; the Toaster cameo uses `35`; crosstalk sheets get a random multiplier 0.8..1.3 on the rate). `--ink` sets the opacity of the print layer. Fade is ACTIVE only from fax #3 onward (fax #1 and #2 do not fade; fax #3 triggers line F-fade1). At `ink <= 0` the sheet is "retired as blank paper": `api.award(0.1,'blank')`, `api.stat.inc('fax-machine.blank')`, line F-blank, it leaves the DOM after 1.5s. At the single kindness fax in beat 8 (5.5) fade is disabled for that sheet.

CAP: at most 3 live sheets (roll + torn row). If a new fax would exceed that, the oldest live sheet is retired immediately (line F-cap).

WRONG NUMBER sheets show a FORWARD TO NO ONE button (and `W` works): `api.award(1.5,'forward')`, `api.stat.inc('fax-machine.forwarded')`, line M-fwd, achievement `fax-machine.wrong_number`. A wrong number can still be torn and filed instead.

### 4.9 The Binder

Count of filed faxes (`api.stat.get('fax-machine.filed')`) is shown. The drawer lists the last 20 filed records `{id, from, re, text(first 60 chars), ink}` newest first; clicking a row expands its full text beneath it (a `<div>`, capped length 400 chars). No re-flatten rule (cut). The binder shows a tab stamp per 5 filed faxes (cosmetic tabs, up to 6).

### 4.10 Rewards and stats (tiny; always call api.award)

- send 0.5, perfect handshake +0.3, tear 0.2, file 1, blank retired 0.1, forward wrong number 1.5, jam cleared 1, report torn 0.1, Y/Y answer 1, first reply ever 5 (the first fax printed at beat 2), self-dial secret 7.5 (once), quiet beat 0.1 (once), final ceremony 10, lap bonus 2 per later lap, spam fee -0.25 (`api.award(-0.25,'fee')`, the engine floors the balance at 0).
- stats (all prefixed `fax-machine.`): `sent received torn filed blank forwarded jams handshakes perfect flatSeconds busy laps selfdial handset idle_max`. Use few counters (SPEC limit 300 names).
- Every action produces a reaction (a LCD change or a Management line); never silent. Management speaks at most ~3 times per 10s; use priority 0 for chatter, 1 for events, 2 for secrets/ceremony.

---

## 5. State, beats and running gags

### 5.1 State

`S` holds: `line`, `epoch`, `dial`, `stamps[]`, `reIdx`, `pages`, `cur`, `queuedSend`, `sheets[]`, `active`, `held` (sheet or null), `beat`, `lap`, `sent`, `received`, `filed`, `playSec`, `lastInput`, `idleStage`, `hush`, `script[]` (queued scripted faxes), `done` (set of ids of scripted faxes already printed; persisted), `bags`, `dead`.

`playSec` (play time) advances only while the player acted within the last 20s (`S.lastInput` updated by any `pointerdown`/`keydown`/`pointermove` listener on the root and document, via `api.on`). Idle time never counts toward beats.

A managed 1s interval (`tick1`) advances `playSec`, drives the idle ladder (section 8), checks the beat gates (`maybeFireBeat()`, only when `S.line === 'IDLE'` and `S.mode` is not busy), checks the ring scheduler, and refreshes the scoreboard. A managed rAF loop handles curl, fade, canvas and the print animations. Beats fire only from `IDLE`.

Under `api.selftest`: beat minimum SECONDS x0.25, beat minimum sends/received counts x0.4 (rounded up, min 1), print and handshake x0.3, fade 9s, quiet beat 4s, idle ladder 8/14/20/30/40s, jam auto-clear 6s, ending ceremony x0.3. In lap >= 2 gates are x0.5 (x0.25 in selftest).

### 5.2 Page counter (RUNNING GAG 1: PAGE X OF Y)

`PAGE <x> OF <y>` on the cover sheet and every received fax header/footer, by beat:
- beat 0-3: `1 OF 1`; beat 4: `2 OF 1`; beat 5: `1 OF 7 1/2`; beat 6: `2 OF 7 1/2`; beat 7: `OF PAGES` (printed as `PAGE  OF PAGES`); beat 8: `1 OF YES`; beat 9 and the ending: `1 OF 1` with NO commentary (callback: Management says nothing); lap >= 2: `1 OF 1`.
The LCD page counter right-aligned mirrors it. Never explain it.

### 5.3 Report status drift, sender ID and letterhead (RUNNING GAGS 2 and 3)

STATUS paren by beat: 0-2 `TO NOBODY`; 3 `TO NOBODY, WARMLY`; 4-5 `TO NOBODY, IN FULL`; 6 `TO NOBODY, TECHNICALLY`; 7 `TO SOMEBODY, IN ERROR`; 8 `TO NOBODY, GENTLY`; 9 and the ending report and lap >= 2 `TO YOU`. After the ending `TO YOU` is the only status the machine ever prints again.

SENDER ID (the header's `FROM:` of every incoming fax) by beat: 2 `------`; 3 `N-----`; 4 `NO----`; 5 `NOB---`; 6 `NOBO--`; 7 `NOBOD-`; 8 `NOBODY`; 9 `NOBODY` (and the returned first fax says `NOBODY (YOU)`); lap >= 2 `SOMEBODY (provisional)` from the first fax. Resolved IDs are kept on every old sheet (the drawer shows them, so the player can scroll the drawer and watch the name arrive). Management never mentions the letters until the returned first fax, then says only `It was a very long hallway.`

LETTERHEAD (second header line, grows with beat): beat 6 `Ext. 0`; beat 7 `Dept. of Elsewhere, Ext. 0`; beat 8 `Dept. of Elsewhere, Lunch Pending`; beat 9 none; lap >= 2 none.

### 5.4 Urgency inflation (RUNNING GAG 4)

The URGENT stamp's label and mark text follow the tier, `tier = number of thresholds passed` with thresholds at total sends `3, 6, 10, 15, 21`:
`URGENT` -> `VERY URGENT` -> `URGENT URGENT` -> `URGENT, BUT SITTING DOWN` -> `RETIRED URGENT` -> `URGENT (PLEASANT)`.
Each new tier is announced by one line (B15-B19) and a small corner sticker on the cover sheet shows `URGENCY TIER n OF 6`. After the final tier, `URGENT (PLEASANT)` shows up in some replies (tier A bag line). The SEEN stamp arrives after the 3rd send (line B20).

### 5.5 Escalation timeline (each beat needs minimum PLAY seconds AND minimum counts; fires once at the next `IDLE`; persisted)

| beat | name | min play s | min sent | min received | what happens |
|---|---|---|---|---|---|
| B0 | WARM-UP | 0 | 0 | 0 | 0.4s: Management A3. 1.5s: the machine prints its own TEST PAGE (no input; `S.line='RECEIVING'` for the print; the sheet is the first live sheet, NOT counted as a received fax, never fades, can be flattened/torn/filed like any other). Management rates it A4. Cover sheet is in the feeder, TO blank. Keypad keys pulse. 7s: A5. |
| B1 | FIRST SEND | after first send | 1 | 0 | The first send explains the handshake (C5). The first report prints OK with `RECIPIENTS: 0 (1 SATISFIED)`. Fanfare for a blank page (line E1). Not a gate; B1 begins when `sent >= 1`. |
| B2 | THE RING | 55 | 1 | 0 | (or at 100s with no sends: Management nudges then rings anyway) The first ring. Scripted fax S1: `Got your fax. Thank you.` Header `FROM: ------`. Sender ID stage 0. Management F-first lines (panics quietly). Player discovers hold-to-flatten. First reply ever pays 5 Meh. |
| B3 | FAXING BACK | 100 | 2 | 1 | Replies now quote the player's last RE and answer it (RE_REPLIES). Scripted fax S2 (RE echo). Thermal fade is introduced (fax #3). Filing is introduced (the binder pulses once). Drum gains `Re: Weather`. STATUS goes `WARMLY`. Sender `N-----`. Management starts a fax-per-hour metric (line B21). |
| B4 | SANDRA ADDS A FIELD | 150 | 4 | 2 | Sandra's fields appear one at a time (4.2). Page counter misbehaves (`PAGE 2 OF 1`). Rare events begin (wrong number etc.). Sender `NO----`. |
| B5 | THE JAM | 215 | 6 | 3 | Jams enabled (4.7). Page counter `1 OF 7 1/2`. Drum gains `Re: Toast` and `Re: Socks`. Sender `NOB---`. A spam-fee notice may arrive. |
| B6 | CROSSTALK AND LETTERHEAD | 280 | 8 | 4 | Doubles (35% of rings): two sheets at once, each fading at its own rate. Letterhead `Ext. 0`. Nobody now asks QUESTIONS (tier C bag). Drum gains `Re: Yes`, `Re: I Am Here`, `Re: Who`. Sender `NOBO--`. |
| B7 | CAMEOS AND WRONG NUMBERS | 350 | 10 | 6 | Cameos (S7: Toaster, Gerald, Rock, Sandra) interrupt, one every ~40s of play, each once per save; wrong numbers common (1/8 instead of 1/12). The paper print style becomes cursive (`--fax-font`). Letterhead `Dept. of Elsewhere, Ext. 0`. Sender `NOBOD-`. |
| B8 | THE QUIET AND THE TOUCHING | 440 | 12 | 8 | `HUSH` for 20s (selftest 4s): no rings, sfx suppressed (own flag), LCD text Q1, Management silent 6s then says Q2. +0.1 Meh once. Then, 20s apart: drawing fax 1 (Q3), drawing fax 2 (Q4), the sentence fax (Q5, which does NOT fade). Ring tone slow. Management stops tracking the metric for 20s (Q6). Page counter `1 OF YES`. Sender `NOBODY`. Letterhead `Dept. of Elsewhere, Lunch Pending`. |
| B9 | THE ASK | 520 | 14 | 10 | After the B8 sequence ends. Scripted fax R1: your own first fax returns (`FROM: NOBODY (YOU)`). 8s later R2: the ask. Then the dial is pre-filled with `5550107`, the SEND button pulses. Sending it = THE ENDING (section 10). Sending other numbers is allowed (it re-prefills after the report, a soft nudge). Management says nothing about the page count. |

Beat announcements: on entering a beat Management speaks the line named in section 6.O (priority 1) except B1, B9. Beats are persisted (`S.beat`); a beat may only advance by one; `maybeFireBeat` checks the next beat only.

### 5.6 The CONFIRMED chain (RUNNING GAG 5)

A chain of replies to STAMPED faxes (30% chance when the last send had >= 1 stamp, from beat 3): step 1 `Confirmed.` -> step 2 `Confirmed (again).` -> step 3 `[CONFIRMED]` (a big stamp, no text) -> step 4 `We confirm the previous confirmation. Please confirm the confirmation.` -> then the chain is exhausted and never repeats, except the ending lap line `Confirmed. Continue.` (callback). The chain index persists in the save.

### 5.7 Callbacks (>= 3)

Gerald (flag `metGerald`, S7), the Toaster (stat `toaster-debate.arguments` or `toaster-debate.slices` > 0, S7), the Rock (stat `pet-rock.actions` > 0, S7), Sandra (fields, stamps, the Please see attached fax), Dennis the Lobby Plant (the service sticker hatch note, the floor-plan ficus, idle lines), Tuesday (invoked in lines, never seen), the Missing Sock (rare sock smudge fax). Read stats/flags inside try/catch; missing reads as 0/false.

---

## 6. LINES (verbatim). Pick by shuffle bag; never the same line twice in a row.

Tokens: the engine substitutes `{player} {meh} {module} {count} {item}` in `api.say`. Custom tokens `{n} {num} {re} {dept} {pct} {k} {name}` MUST be replaced by your code with `String.replace` before calling `api.say` or writing DOM text. Text on paper uses `api.player.name` directly (never rely on engine substitution for DOM text). Management (`who:'Management'`) is the speaker unless stated. LCD means the LCD element, not a say.

### A. Boot, test page, idle LCD, resume
A1. LCD: `READY. NO ONE.`
A2. paper (test page): `TEST PAGE. If you can read this, the test has not failed. If you cannot, please fax us.`
A3. `Welcome to Fax Machine Frenzy. Please send something to no one. Per policy, no one is expecting it.`
A4. `The machine has printed its own test page. Management rates it 9 out of 10. The missing point is modesty.`
A5. `Dial a number. Any number. Send it.`
A6. `The room smells faintly of toner and Tuesday. Management stopped noticing in 2009, which is a skill.`
A7. (15s with no input, once) `The keys are lit because they would like to be pressed. Management has no stake in this. Management has a very small stake.`
A8. Resume bag: `Resuming at beat {n}. The machine kept your place. It kept it warm.` / `Welcome back to the Fax Room. The faxes have been waiting, in the sense that faxes wait.` / `The line has been held open for you since last time. It was not busy. It was waiting.`
A9. LCD idle rotation every 12s while IDLE and the dial is empty: `TONER: 100% (OF NOTHING)` / `PAPER: 1 ROLL (LOOPED)` / `COVER SHEET: PRESENT. CONTENT: PENDING.` / `READY. NO ONE.` / `LINE IS BUSY BEING CALM`

### B. Dialing, stamps, urgency tiers, drum, Maximum Priority
B1. `Dialing {num}. This number is not in service. It is, however, in our hearts, and on a list.`
B2. `Dialing {num}. That number belongs to nobody. Nobody has been notified.`
B3. `Dialing {num}. The number is valid in every sense except the ones that matter.`
B4. (redial) `Redial detected. Same number, same nobody. Management admires your commitment to one empty direction.`
B5. (fewer than 7 digits) `That is a short number. Nobody has accepted it as a long one.`
B6. (empty dial) LCD `DIALING NOBODY (MAIN)...` and say `You dialed nothing. It connected.`
B7. (lap >= 2, empty dial) `You dialed nothing. Somebody picked up, provisionally.`
B8. (dial `0`) `You have reached the Operator. The operator is Nobody. Nobody is on break. Nobody is always on break. It is the whole job.`
B9. (dial `911`) `Your emergency has been noted, faxed and filed under Tuesday.`
B10. (dial `276`) `Form 27B/6 has been printed. It is a Request for Form 27B/7, which was destroyed in 1998.`
B11. Stamp bags:
- URGENT: `Stamp applied: URGENT. Urgency level: 'moderate, in a hurry'. Please do not hurry.`
- CONFIDENTIAL: `Stamp applied: CONFIDENTIAL. The contents are confidential even from the contents.`
- PLEASE DISREGARD: `Stamp applied: PLEASE DISREGARD. Disregarding now. It is going well.`
- DRAFT OF A DRAFT: `Stamp applied: DRAFT OF A DRAFT. A final version is expected when the stationery cupboard finishes thinking.`
- SEEN: `Stamp applied: SEEN. This has been seen. By whom has been seen to.`
- removed: `Un-stamped. The ink has gone back to the pad. The pad is relieved and slightly stained.`
B12. (drum unlock) `The drum has gained a subject: {re}. The drum did not ask for it and is touched.`
B13. (4+ stamps) `Four stamps declare this fax Maximum Priority. It will be ignored the same as the rest.`
B14. `A stamp has landed that you did not pick. It reads COMPLIANCE ACKNOWLEDGES RECEIPT. It is, per Sandra, mandatory.`
B15. (tier 1) `URGENT has been renamed VERY URGENT, to keep it from feeling ordinary.`
B16. (tier 2) `VERY URGENT has been renamed URGENT URGENT. Nobody asked it how it felt.`
B17. (tier 3) `URGENT URGENT has been renamed URGENT, BUT SITTING DOWN. The urgency has taken a chair. It is still going somewhere, in the way a person on a bench is.`
B18. (tier 4) `URGENT, BUT SITTING DOWN has been renamed RETIRED URGENT. The urgency has retired to a small seaside memo. It sends postcards. They are also urgent, retired.`
B19. (tier 5) `RETIRED URGENT has been renamed URGENT (PLEASANT). Nobody said so. It simply stopped being in a hurry.`
B20. (SEEN arrives, after 3rd send) `A new stamp has arrived. It says SEEN. It was seen arriving.`
B21. (beat 3) `Management has begun tracking faxes per hour. The first reading is 'some'. The second reading is also some.`

### C. Handshake
C1. LCD onomatopoeia bag: `kssshhh-BEEP-dee-dee-dee` / `WEEE-ooo-krrk-KSHH` / `bwong... bwong... KSSH` / `ee-AWW-ee-AWW-kshh` / `NEGOTIATING 14400 BPS OF POLITENESS`
C2. (4 of 4) `Perfect handshake. Both machines are proud. One of them is you.` then (a second say, priority 0, 1.5s later) `Clean line. The scan will be crisp. This changes nothing, and Management says so.`
C3. (1-3 hits) `Sloppy handshake. Static added. Nobody will notice, which is the best kind of static.` / `The line has noted your grip. It describes it as firm, and slightly screechy.`
C4. (0 taps) `You did not shake. The machines shook for you. They were very polite about it.`
C5. (first ever send) `The handshake is the part where two machines agree on something. Please model agreement.`
C6. (extra bag, shown while shaking, one per handshake) `The machines are negotiating. One of them is a machine. The other is a pause.` / `Negotiating baud. Offered: 9,600. Countered: 'yes'. Settled at 'vibes'.`

### D. LCD during send
D1. LCD: `SENDING PAGE {k} OF {n} (OF 0 ATTACHED)` (page 1) and `SENDING PAGE {k} OF {n}` (others)
D2. LCD: `TRANSMISSION OK (TO NOBODY)` (plain; the paren follows the beat drift)

### E. Send outcomes, report parts, busy, spam fee
E1. (first send only) `Your first fax has been transmitted. Delivery to 0 of 0 recipients: a perfect score, per policy.`
E-send bag (after each report):
- `Your fax has left the building. The building has no record of it. The building is fine.`
- `TRANSMISSION OK. Pages sent: {n}. Pages received: 0. Satisfaction: pending.`
- `Recipient: NOBODY. Status: Delivered. Signed for by: a draft.`
- `Your fax has been delivered to an empty chair in Accounting. The chair signed.`
- `Page 1 of 1 is crossing the telephone wire. It is wearing a small coat.`
- `Transmission complete. Efficiency: 100%. The denominator is Nobody.`
- `Per my previous fax, which I did not send: well done.`
- `Transmission report for the transmission report: OK.`
E-tally (paper, in order for sends 1-5): `0 (1 SATISFIED)` / `0 (2 CONCERNED)` / `0 (1 HAT)` / `0 (THE WHOLE FLOOR)` / `0 (A DRAFT, BRIEFLY)`; send 6 (the break): `1 (NOBODY, SILENTLY, ONCE)`; later bag: `0 (1 PLANT)` / `0 (3 CHAIRS)` / `0 (A FEELING)` / `0 (THE CEILING, ATTENTIVE)` / `0 (TUESDAY, PROVISIONALLY)` / `0 (1 STAPLER, AS UNION REP)`; the ending self-send: `0 (1 YOU)`.
E-dur (paper bag): `00:00:07.5. THE .5 IS THE PART WE ENJOYED.` / `00:00:03.0. A FIGURE ACCURATE TO THE SECOND AND TO NO OTHER.` / `00:00:09.5. THE LINE ASKS THAT YOU DO NOT TIME IT.` / `00:00:00.0 (ELAPSED), 00:00:05.0 (EXPERIENCED).`
E-dept (RECEIVED BY, paper bag): `ACCOUNTS (ANNEX)` / `VOICEMAIL (7 1/2)` / `COMPLAINTS (REVERSED)` / `FACILITIES (EVENTUALLY)` / `THE DEPARTMENT OF PASSING THINGS ON`
E-return (second strip): `RETURN TO SENDER. RETURNED BY: NO ONE. REASON: UNDELIVERABLE BECAUSE IT WAS ALREADY THERE.` / `RETURN TO SENDER. RETURNED BY: NO ONE, WITH CARE.` / `RETURN TO SENDER. REASON: THE ADDRESS WAS FOUND, AND IT WAS YOU.`
E-busy: `LINE BUSY. The line is busy with your previous fax, which it is still thinking about.` / `BUSY. The line is occupied by a fax telling another fax to hold.` / `Busy signal. Please hold. Please do not hold. Please hold the idea of holding.`
E-cap: `The roll is full. The oldest fax has been retired to make room, in a ceremony of one.`
E-fee1 (spam fee, first): `That is a great many faxes in 3 seconds. The machine is flattered and also lightly on fire (metaphorically, per Sandra).`
E-fee2 (repeat): `The fee has been faxed to nobody, who has framed it.`
E-fee-strip (paper): `EXCESSIVE FAXING DEPT. POLICY 14(b): RAPID DIALING SURCHARGE 0.25 MEH. THE SURCHARGE WAS CHARGED UNDER POLICY 14(b), WHICH IS ONE SENTENCE.`
E-fee-reply (a small strip 2s later): `STOP. THANK YOU.` with Management line `The machine faxed the pile of your faxes to Nobody as one page. Nobody replied, 'Stop. Thank you.' in that order.`
E-cool: `The machine is resting. It would like to be remembered as someone who rested.`

### F. Receive, flatten, tear, file, fade
F-lcd (ring bag): `RING. IT IS FOR YOU.` / `RING. RING. IT IS ALWAYS FOR YOU.` / `INCOMING FAX FROM UNKNOWN` / `RING. IT IS NOBODY. PLEASE HOLD.`
F-first (beat 2, spoken in this order, 3s apart): `Incoming fax from UNKNOWN. Please hold the paper flat. It remembers being a roll.` / `Someone is faxing back. We do not know who. We asked the fax, and the fax printed 'someone'.` / `We have never received anything. We do not have a procedure for this. We are writing one.`
F-flat bag (first time you flatten, then at most once per 8 holds): `You are holding a piece of paper flat. Per the data, no one has ever done this so sincerely.` / `The paper wants to be a scroll again. You are asking it to reconsider. It is reconsidering.` / `Thermal paper. It was a roll. It has plans to be a roll again. You are in the way of the plans.` / `Flat. The words have stopped swimming. They had been practising.`
F-tear bag: `Torn along the perforation. The perforation had dreams. They are now two separate dreams.` / `You tore it along the dotted line like a person who has made a decision.` / `It separated with the sound of a very small decision.` / `The dotted line was a suggestion. It is now a rule. It would like to be consulted before the next one.`
F-file bag: `You have filed a fax into the binder. The binder is delighted, in the way binders are.` / `Filed. The ink has stopped fading. It was relieved to be asked.` / `Filed under Nobody. Cross-referenced under Nobody, Other.`
F-roll (drawer overflow): `A fax has rolled off the end of the binder. It has been shredded by wind. There is no wind. It was thorough.`
F-fade1 (fax #3 prints): `Thermal paper fades in 25 seconds. Per Sandra, so does everything else; this is simply the first to say so.`
F-blank bag: `A blank fax: the best kind to receive.` / `Retired as blank paper. It served the building for 25 seconds, quietly, and without a pension.` / `The ink has gone. The message, however, was already gone. This is just the paper catching up.`
F-first-reply (on the first scripted fax S1 tear or after 6s): `You have received your first fax. It is 5 Meh. It was sent by nobody, who has never been so generous.`

### G. Jam (J-lines)
J1. (start, also LCD `PAPER JAM`) `Paper jam. Please open the lid, smooth the paper, and let the lid close itself. Management will not say in which order.`
J2. (lid opened) `Step 1: open the lid. The lid opened itself and would like the credit.`
J3. (wrong order bag) `You smoothed the paper before opening the lid. The paper declined. The paper has principles.` / `The paper is behind a lid. Please consider the lid. The lid has considered you.` / `You are patting a closed lid. It is a nice lid. It is not the jam.` / `Smoothing noted. Nothing was smoothed. Management admires the intent.` / `The jam is on the other side of the lid, like most problems.` / `A diagram is attached. The diagram is also jammed.`
J4. (smooth 1 / smooth 2) `One smooth. The paper has gone from crumpled to a more optimistic crumple.` / `Two smooths. The paper has stopped sulking and started merely resting.`
J5. (resolved) `Paper jam resolved: the paper declined, then accepted.` and, the first time ever, `Jam cleared. It was a 7 1/2 page jam. We have never had a half page before. It was gentle.`
J6. (auto-clear) `The jam resolved itself. It said it needed a moment. It has had one.`

### H. What Nobody sends back
H0. Scripted S1 (beat 2): `Got your fax. Thank you.` signed `(signature illegible, or absent)`.
H0b. Scripted S2 (beat 3): `RE: {re}. Your RE line was '{re}'. We found it clear. We found it extremely clear.`
RE_REPLIES (shuffle bag per key; 2-3 lines; the key is the drum entry's key):
- yourfax: `Re: your fax. We were not expecting it, but we kept a chair open just in case.` / `Received your fax. It was the most honest thing we have been sent this quarter.` / `Your fax arrived. We have read it three times and found it the same each time. This is a compliment.`
- rere: `Re: Re: Re: (blank). I concur with the blank. I have concurred with many blanks.` / `Re: Re: Re: Re: we are now several Res deep. Please send a rescue.` / `RE: RE: RE: this is the deepest we have been together.`
- blank: `Yours was blank. So was ours. We have matched.` / `Thank you for the blank. It was the right size for what we meant to say.`
- q3: `Q3 Nothing Review: nothing was reviewed with great rigor. The rigor has been filed. The filing is nothing too.` / `Re: Q3 Nothing Review. We exceeded expectations by having none. Please advise on Q4.` / `Q3 results: nothing, up 0%, which is the best 0% we have had.`
- memo: `To: All Staff. Re: The Memo. The memo is attached. The memo is this memo.` / `Re: The Memo. We have read the memo. The memo was about reading the memo. It went well.` / `The Memo has been circulated. It returned unread, which is how we know it was circulated.`
- weather: `The weather here is beige. Please fax us yours. We will match it.` / `Thank you for the weather. It matched. We had been worried it would not.` / `Re: Weather. We have no windows. We have your report, and it is plenty.`
- toast: `Re: Toast. We have none. We have the idea of toast, which is slightly warm and does not need a plug.` / `Re: Toast. Nobody is partial to a crumpet. Nobody has never said so.`
- socks: `Re: Socks. We have one. It has been on a journey. We do not follow it.` / `Re: Socks. We counted ours. It is an odd number. We have chosen to find this restful.`
- yes: `Re: Yes. We were not asking, and your answer was perfect.` / `You said yes. We have placed it on a shelf next to our other yes. It is a small shelf.`
- here: `Re: I Am Here. We know. We have been writing it on the back of other faxes.` / `You are here. We are here. The machine is also here. It is crowded and nobody minds.`
- who: `Re: Who. We were afraid you would ask. We are Nobody. It is a long story and it is also short.` / `Who is a good question. We have drafted an answer. It is attached. It is the question.`

TIER bags (generic Nobody replies):
- A (beats 2-3): `Please stop sending. Please keep sending. I have not decided how I feel, and the machine has already printed.` / `We received yours. We are replying with ours. Ours is also yours, if you look at it right.` / `Please disregard our previous fax. Please also disregard this one. Please regard the one after.` / `URGENT (PLEASANT). No action required. We just like to hear the machine.`
- B (beats 4-5): `Note: there is a second Nobody. We are not on speaking terms. We are on fax terms.` / `I read your cover sheet three times. It was the most honest thing I have been sent this quarter.` / `The tray holds 0 faxes and 14 feelings. We are only equipped to count one of those.` / `Nobody is on vacation until your fax is no longer relevant. Please fax their assistant, Nobody Else.` / `Nobody has been promoted to Nobody, Senior. Salary unchanged. Salary was nobody's.`
- C (beats 6-7, questions): `Do you also hear the little screech before it starts? We look forward to it. Please do not tell anyone.` / `What is your favourite page? We will not judge. We will file it.` / `Is the room where you are also beige? We would like to compare beiges.` / `Nobody has retired. A new Nobody has been hired. The new Nobody is identical and slightly younger.` / `Please state your lunch. We have recorded ours. Our hobby is collecting dial tones.` / `Have you ever sent a fax and then felt it arrive? We have. It felt like a small yes.`
- D (beats 8-9): `The weather is still beige. It has a little yellow in it now. We think it is you.` / `We tried to fax you the sound of the sea. It came out as a grey stripe. We think that is right.` / `Do you also hear the other machines at night? They are only talking about toner.` / `We have started leaving the line open on purpose. It is not a mistake. It is a window.` / `Nobody, Acting Regional Nobody, signing off. Warmly. Technically.`
- LAP (after the first ending, shorter): `Hello again.` / `Still here.` / `Page 1 of 1. Warm.` / `Nice to receive you.` / `We saved your chair.` / `Same number. Different you. Welcome.` / `It is still Tuesday somewhere. We have fixed it for you.`
- Quiet bag (mirror of text on paper, optional): none.

### I. Sandra
I1. `Sandra from Compliance has added a field. The field is 'Reason for Confidentiality'. Sandra has also filled it in. It says 'Sandra'.`
I2. `Sandra from Compliance has added a second field: Confidentiality Level, 1 to 7 1/2. NOTICE: Level 7 1/2 may only be sent on Wednesdays, which are a rumor. -- S., Compliance`
I3. `Sandra has added a third field: 'Number of Pages Including This Sentence'. It has ticked itself. It does that now.`
I4. (slider snap bag) `Level adjusted to 7 1/2. Level 7 1/2 was already the level. It simply had not been told.` / `The Confidentiality Level has returned to 7 1/2 by itself. It is a homing level.`
I5. (checkbox) `The box was ticked. You unticked it. It has ticked itself. Both of you have done your best.`
I6. (red lamp) `The red lamp has turned green by itself. Compliance calls this 'a review'.`
I7. (Sandra memo, outcome e) `Per Sandra: cover sheets must be covered. A cover sheet for the cover sheet is under review. Per policy.`
I8. (reviewed stamp, once per save) `REVIEWED BY S. (REVIEW PENDING). The review is pending. The review has been pending since Tuesday, which was a rumor.`

### J. Cameos, rare events, secret faxes (verbatim fax text; Management's reaction in brackets)
M-toaster (paper, `FROM: THE TOASTER`; pre-browned edge gradient; fades 10s slower): `Warm. Still warm. Yes.` [Management: `A fax has arrived from the Toaster. It is slightly browned. Please do not eat the fax.`]
M-gerald-met (`FROM: THE VEGETABLE DRAWER`, date line `DATED: WHENEVER THE SOIL IS READY`, signed with an X in a potato-shaped smudge): `A fax is a letter that has been told to hurry. I was told to hurry once. I became a fry.` [Management says nothing (Gerald is never mentioned by Management here)]
M-gerald-unmet (`FROM: V.P. OF SPUDS`, a mostly blank page with a faint potato smudge): `Per my eyes, I have seen everything. Per my skin, I have sent nothing. Sign here: O.` [Management: `A potato of some kind has sent something. It has been told to go through the lobby.`]
M-rock (`FROM: (A ROCK)`, a grey thumbprint CSS blob): `(a grey thumbprint. The range of emotion is wide. No further questions.)` [Management: `A fax has arrived from a rock. We have chosen to read it as optimistic.`]
M-sandra (`FROM: COMPLIANCE`, different font, footer `ATTACHMENTS: 0 (PENDING REVIEW)`): `Please see attached.` [Management: `Sandra has sent a fax. It says 'Please see attached.' Nothing is attached. We are seeing it very carefully.`]
M-wrong bag (wrong number; header `FROM: ----`; footer `NOT FOR YOU. PROBABLY.`): `Please send 400 hotel pillows to Suite 7 1/2. Deliver by the third Thursday.` / `To the Dentist of Wednesday: your 3:15 has rescheduled itself. It is now my 3:15. We are both a little worried.` / `Re: the goat. The goat is fine. Please stop calling the goat.` / `Table for 11 at the lighthouse, name of Pruitt, allergic to the word 'brisk'.`
M-wrong-say: `WRONG NUMBER. This fax is clearly meant for someone else. Management has located no Suite 7 1/2. Management has located the pillows.`
M-fwd bag: `Forwarded to the correct recipient: the void, which signed.` / `Forwarded to No One. No One has accepted and sent a thank-you in the form of nothing.`
M-paperlow (header `PAPER LOW.`, last word of every line missing): `Dear Valued Employee, we write to say how much we have enjoyed the` / `Please accept this fax as a small token of our regard for the` / `We remain, as always, entirely and completely yours, with the utmost` / `P.S. The last line of every sentence is missing. We have not noticed because we are` / `Sincerely, Nobody (Un` [Management: `PAPER LOW. The paper is fine. It is the words that are running out.`]; achievement `fax-machine.unfinished` (the line `Unfinished Se` is the joke) fires when this sheet has been legible for 2s.
M-happy (CSS-drawn smiling fax machine with a small CSS plant, no text): [Management says nothing; show a toast-less silence. After 4s only the LCD says `RECEIVED. WE DO NOT KNOW WHY EITHER.`]
M-sock (a sock-shaped smudge, text): `A fax of a sock-shaped smudge, slightly south-west of where it should be. Presumed on a journey.` [Management: `No. We are not following it.`]
M-floor (the 7 1/2 floor plan, below) and M-selffax (S4) are in section 7.

### K. Idle (see section 8 for timings)
K1. 75s: strip in the out-tray: `THE LINE IS STILL A LINE.`
K2. 90s fax (quiet ring, small font): `Are you still there? The line is open. I am also open. -- Nobody`
K3. 150s: LCD `ARE YOU STILL THERE? (Y/Y)` with two buttons both labelled `Y`; plus a fax: an SVG dotted empty chair captioned `Fax of an empty chair.`; answering Y (either) pays 1 Meh with `Welcome back. Nothing happened while you were gone. We did it carefully.`
K4. 240s: the keypad lights one key at a time as if someone were dialing you: 5, 5, 5, 0, 1, 0, 7 (each lit 700ms), then dark.
K5. 300s: the machine faxes itself `ROOM (EMPTY, ACCURATE)` (a CSS-drawn empty beige room with a chair). It stops there; the idle behaviour never grows further.
K6. (input after idle) `Per my previous silence: welcome back.` (bag with the Y/Y line).

### L. Spam extras
L1. LCD scroll: `BUSY BUSY BUSY (PLEASE ADMIRE)`
L2. (handset bag, each lift) `You lifted the handset. The line is dead. The line has been dead since 1996. It is doing fine.` / `Handset again. There is breathing. It is the machine's. It is also, a little, your own. Please put it back.` / `The handset is warm. It has been held a great deal today. It has no complaints.`
L3. (30 handset lifts, once ever, `who:'Handset'`) `...hello?` then 2s later `Sorry, wrong machine.`

### M. Quiet beat and the touching (B8)
Q1. LCD: `THE OTHER END HAS HUNG UP. THE OTHER END IS STILL ON THE LINE. BOTH ARE TRUE.`
Q2. (after 6s of Management silence) `The lines are quiet. That is allowed. Management is also quiet. Management has never done this in front of anyone.`
Q3. drawing fax 1 (SVG dotted fax machine): caption on paper `I have drawn you a fax machine. It is not good. It has your whole heart in it, though, in dotted lines.`
Q4. drawing fax 2 (SVG dotted empty chair from behind): caption `Fax of an empty chair, sent from the other end. The chair is yours. Do not read into it. Read into it.`
Q5. the sentence fax (does not fade): `It is nice to have a number to send to.`
Q6. `Management has stopped tracking the metric. Management is just here.`

### N. The ending lines (see section 10 for order)
R1 (returned first fax, header `FROM: NOBODY (YOU)`): paper body is `TO: {name}   RE: {re}   STAMPS: {n}` (use the real first send: `firstTo` or `NOBODY (MAIN)`, the first RE text, and the number of first stamps) followed by `IN TRANSIT: {n} MINUTES. IT WAS A LONG HALLWAY.` Management on its arrival: `It was a very long hallway.` (spoken only after the player taps the header, which is a button on this one sheet; if never tapped, spoken after 10s).
R2 (the ask): `May I have your number? Not the one you dial. The one you are.`
R3 (during the self-fax, LCD): `CONNECTED (BOTH PARTIES: YOU)`
R4 (FINAL NOTICE): `This correspondence is now concluded. Please see attached for the continuation.`
R5 (Management, grand speech, with confetti): `Congratulations. This is the first completed correspondence in the history of the building. Management has framed the moment, and the frame is also the moment.`
R6 (second fax, Management says NOTHING): `Re: Final Notice. I wrote it as soon as I sent it. I did not want it to be final. Neither did the fax.`
R7 (report, paper): `TRANSMISSION COMPLETE. 0 ERRORS. RECIPIENTS: 0 (1 YOU). STATUS: OK (TO YOU).`
R8 (after 6s of silence, Management): `Congratulations. You have reached the end of the faxes. The faxes continue.`
R9 (the reset test page, warmer): `TEST PAGE. If you can read this, the test has not failed. It has been a pleasure to be tested.`
R10 (LCD after reset): `READY. NO ONE.` with a smaller line 2 `REDIAL: {num}` (the first number ever dialled, or `NOBODY (MAIN)`), and `TO: {name}` shown when the dial is empty.
R11 (Self-dial, before beat 9, S4): see section 7.
R12 (lap >= 2 test page): the R9 text every lap start.

### O. Beat announcements (priority 1, spoken on entering the beat unless noted)
O2. `Incoming fax from UNKNOWN. Please hold the paper flat. It remembers being a roll.` (this is F-first, not repeated)
O3. `Nobody's replies now quote your RE: line. Management did not ask for this and has asked to be informed of the outcome.`
O4. `Sandra from Compliance has been informed that there is a form. Sandra has informed the form.`
O5. `Maintenance reports that jams are now enabled. Maintenance has been jammed since 2011. It is fine.`
O6. `Two faxes are now possible at the same time. The line has said it will try, and has asked everyone to be gentle.`
O7. `Visitors may arrive at the machine. They are welcome. Please do not feed them. They are faxes.`
O8. (B8 start) the LCD line Q1 and silence.
O9. (B9, none; the player sees R1 print.)
T1. (module enter via lobby) global lines (section 12).
T2. (Resize under 480, once per crossing) `Landscape mode engaged. Please tilt your head. Management is tilting theirs.`
T3. (resize back up) `The machine is back to a normal width. It would like it noted that it enjoyed being compact.`
T4. (5 resizes within 5s, once per session) `Page scaled to fit: 3%. The fax is now a stamp. The stamp is addressed to Nobody.` and the NEXT printed fax is a postage stamp (CSS `scale(.12)`, readable on hover/hold at scale 0.5 for tolerance).
T5. (service sticker 7th click, S9) `Technician: Technically.`

Count check: this section has well over 150 distinct lines. Use them all.

---

## 7. SECRETS and RARE EVENTS (all must exist)

S1. THE LONG IDLE (the Warm Line, section 8). Achievement `fax-machine.patient` at 90s (the machine rings by itself, very quietly, in a smaller font).
S2. SPAM (Rapid Dialing Surcharge, section 9). Achievement `fax-machine.excess`.
S3. DIAL `7½0`: connects to the Seventh-and-a-Half Floor. LCD `CONNECTING TO THE SEVENTH-AND-A-HALF FLOOR...`; Management: `Connecting to the Seventh-and-a-Half Floor. It has been waiting. It has no phone. It has you.` Then a one-time fax (floor plan as monospace rows): `7 1/2 FLOOR PLAN` / `[ CORRIDOR .................. ]` / `[ FICUS (THRIVING) ]` / `[ DOOR MARKED: LATER ]` and Management: `The floor plan is a corridor, a ficus, and a door marked LATER. The ficus is Dennis's cousin. They do not speak. They photosynthesise in parallel.` Awards achievement `fax-machine.wrong_number`; `api.award(2)` once.
S4. DIAL YOUR OWN NUMBER `5550107` (the one printed on every fax) BEFORE beat 9: the SELF-FAX LOOP. The machine answers before it rings: `You have dialed your own number. The machine answered before it rang, to save everyone the awkwardness.` The report reads `RECIPIENTS: 0 (1 YOU)` and `STATUS: OK (TO YOU, FROM YOU, IN TRANSIT FOR ZERO SECONDS, WHICH IS THE LONGEST ONE)`. Then the machine prints a copy of what you sent, then a copy of the copy, up to 7 times (1.6s apart, `api.sfx('tick')` each; the copies are small sheets in the roll that use the three-sheet cap by retiring the oldest), each copy a little more faded (`--ink` start 0.9, 0.8 ... ) and a little more affectionate, taken from this bag in order: `Received.` / `Received, and kept.` / `Received, and glad.` / `Received, and warm.` / `Received. Hello.` / `Received. Hello, you.` / `Received. Stay.` Pays 7.5 Meh once (the first time); achievement `fax-machine.wrong_number` (once).
S5. RARE EVENT, THE WRONG NUMBER (1 in 12 incoming at beat >= 4, never twice in a row; 1 in 8 from beat 7): a fax clearly meant for someone else (M-wrong). FORWARD TO NO ONE appears; using it grants 1.5 Meh and the forward line. Another rare event: PAPER LOW (M-paperlow; achievement `fax-machine.unfinished`); the happy photograph (M-happy, 1 in 60, silent); the sock smudge (M-sock, 1 in 45, once per save).
S6. ALL FIVE STAMPS on one sheet at SEND time (needs the SEEN stamp): Management `The page is now only stamps. It has gone through the other side of paperwork.` The reply to that fax is a sheet of the single word `RECEIVED.` repeated on every line (use 7 lines) until the paper "runs out" (last line `RECEI`). The machine then refuses to print Reports for 20 seconds with LCD `REPORT IS RESTING`. Achievement `fax-machine.stamps`.
S7. CAMEOS (beat 7+, one every ~40s of play, each once per save; stored in `api.save` `cameo`): Toaster (if `api.stat.get('toaster-debate.arguments') > 0 || api.stat.get('toaster-debate.slices') > 0`), Gerald (if `api.flag.get('metGerald')` the full line, otherwise the generic `V.P. of Spuds` smudge), the Rock (if `api.stat.get('pet-rock.actions') > 0`), Sandra (always safe; a fax in a different font). A cameo that is not eligible is skipped silently. Toaster fax: pre-browned edge (a CSS gradient on the sheet's edge), fades 10s slower, and when held flat a toast-coloured stripe slowly rises ("pops up like a slice") over 2s.
S8. THE RARE HAPPY MACHINE and THE SOCK (see S5).
S9. THE SERVICE STICKER: a tiny button on the back of the machine `Last serviced: next Thursday.` (the label is visible in its `title` too). Click it 7 times: a hatch opens in the machine top showing one printed line on the inside of a paper core, `Technician: Technically.` (T5); achievement `fax-machine.technically`; the 7th click's `api.award(3)` once.
S10. THE HANDSET: lifting the handset 30 times (stat `fax-machine.handset`) once ever yields the L3 lines.
S11. RESIZE: narrower than 480px root width (compact) says T2; widening says T3 (once per crossing, never more often than every 10s). Five size changes within 5s: T4.
S12. THE UNFINISHED SE: reading the paper-low fax (legible 2s total) unlocks `fax-machine.unfinished`.
S13. BEAT 8 KINDNESS: the sentence fax (Q5) does not fade. It is "a kindness". Do not tell the player.

---

## 8. IDLE behaviour (summary table; idle never counts toward play time)

Idle clock `S.lastInput = api.now()` resets on any pointer or key input on the root or document. A managed 1s interval checks thresholds (use the selftest column under `api.selftest`; the fuzz harness idles for 62 virtual seconds at 60% of the steps).

| idle (real / selftest) | what happens |
|---|---|
| 15s / 5s | the keypad keys re-pulse (visual) and, once per session, line A7 |
| 75s / 8s | `THE LINE IS STILL A LINE.` strip in the out-tray (K1) |
| 90s / 14s | the machine rings by itself, quietly (single `bell`, small font on the paper, shake class absent): K2; unlock `fax-machine.patient`; the line state is IDLE -> RECEIVING for the print only |
| 150s / 20s | LCD `ARE YOU STILL THERE? (Y/Y)` and two buttons `Y` `Y` appear under the LCD; an empty-chair fax prints (K3). Answering pays 1 Meh and hides the buttons. Ignore: nothing bad happens |
| 240s / 30s | the keypad lights 5,5,5,0,1,0,7 one key at a time (K4); any input cancels it |
| 300s / 40s | the machine faxes itself `ROOM (EMPTY, ACCURATE)` (K5) and stops; `fax-machine.idle_max` stat max |
| any input after 90s idle | one of K6 / the Y/Y welcome line; everything restores; the next incoming fax is a plain tier-A reply (no rare event) |

Idle never creates more than one sheet per stage; the live-sheet cap still applies. One 1s managed interval for idle, no per-stage timers.

## 9. SPAM behaviour

SEND/KEYPAD mash: count `SEND` activations and keypad presses with timestamps (`api.now()`); if SEND is pressed 8 or more times within 3s, OR keypad is pressed 25 or more times within 3s: `S.line = 'BUSY'` for 6s (selftest 1.5s): LED BUSY on, LCD `BUSY BUSY BUSY (PLEASE ADMIRE)` (L1), the feeder accordions into a paper concertina that bursts out of the tray (up to 12 small sheet divs, `animation` with `--dx`/`--r`, removed on `animationend` and by a 3.5s fallback `api.setTimeout`, never more than 12 in the DOM), `api.sfx('sad')`, a fee of 0.25 Meh (`api.award(-0.25,'fee')`; never below 0 by engine) billed by a fee strip (E-fee-strip) with Management E-fee1; a repeat uses E-fee2 instead and the same strip; `api.stat.inc('fax-machine.busy')`; 2s later the E-fee-reply strip prints. Achievement `fax-machine.excess` (secret). Cooldown 6s: during it SEND is ignored with line E-cool at most once; keypad still dials but does not count toward a new spam.
Handset spam: 30 lifts (S10).
Everything else spammy (random clicks, drags, resizes, visibility changes, stamp mashing, keyboard mashing): ignored gracefully, no errors, no unbounded DOM.

---

## 10. The not-ending (exact order; must be impossible to double-trigger; `S.endingDone` per lap)

Trigger: in beat 9, SEND pressed with the dial buffer equal to `5550107` (outside beat 9 this is the S4 self-fax loop). Everything below runs under `S.line = 'ENDING'` (input is not locked; the player can still dial, stamp and read; only SEND is ignored with a gentle line), total <= 25s (selftest x0.3).

1. HANDSHAKE (two overlapping waves finally matching): the canvas draws two sine waves that start 3 radians out of phase and converge to identical over 3.2s; LCD `CONNECTED (BOTH PARTIES: YOU)` (R3) when they match; `api.sfx('fanfare')`.
2. The machine prints the FINAL NOTICE (R4) as a received sheet with `FROM: NOBODY (YOU)`.
3. `api.confetti()`, `api.sfx('tada')`, Management R5, `api.award(10,'final')` and `api.achieve('fax-machine.final')`. Stat `fax-machine.selfdial` +1.
4. +5s: the second fax R6 prints. Management says NOTHING (the joke). Page counter reads `1 OF 1` with no commentary.
5. +4s: the report strip R7 prints. +6s of silence, then Management R8.
6. +4s: the machine resets: the LCD dims for 600ms (class), flickers (class, skipped under reduced motion) and shows `READY. NO ONE.` (R10). The dial buffer clears; with an empty dial the LCD shows `TO: {NAME}` (the player's own name where the number was) and `REDIAL: {num}`; the FROM line (the sheet header's own `FROM:` on cover sheets) reads `SOMEBODY (provisional)`. Toner reads `TONER: 100%`. Beat banner restarts at B1 with `lap += 1` (persisted), `S.sent` and `S.received` stay as totals but gates are x0.5.
7. +3s: the original test page prints again (R9, "slightly warmer": a pale-yellow edge on the paper and the new text).
8. Lap behaviour: sender ID is `SOMEBODY (provisional)` from the first fax; replies come from the LAP bag, truncated to the first sentence from lap 3 on; STATUS is always `TO YOU`; the ring interval is 20-40s; beats do not re-run (scripted faxes stay done; unlocks stay); each lap-start pays `api.award(2,'lap')`. The page counter is `1 OF 1`. Self-dial in lap >= 2 gives the S4 loop (no extra Meh) and Management `Dialing your own number. Connected. Faxing: you. Received: you. Both parties are surprisingly pleased.` It remains impossible to win and impossible to be done: Management never says well done without also saying `for nothing`; nothing in the HUD ever shows "complete".
9. Nothing is reset except the beat banner and the dial; sound and unlocks are kept.

---

## 11. Visual design

Palette (cream "cheerful dysfunctional intranet" Lobby look, office-beige machine): machine plastic `#d8d0b8`, darker shell `#b9b095`, outline and text `#3a3226` (3px outlines), sticker shadow `4px 4px 0 #3a3226`; LCD background `#26331a` with text `#c7d94a` and `text-shadow: 0 0 6px #c7d94a`, scanline overlay (`repeating-linear-gradient(0deg, rgba(0,0,0,.18) 0 1px, transparent 1px 2px)`); keypad keys dove grey `#8d8a80` with cream numerals `#fbf7ea`; thermal paper `#f6f3e6` with a faint pale-yellow edge (`box-shadow: inset 0 0 0 2px #f2e9b8`), print ink `#2d3d52` (the print layer colour; fade is opacity); accent LEDs coral `#e8664a` (RING, JAM), mint `#5bbf9a` (READY, OK ink `#5bbf9a` on reports), mustard `#e2b43a` (BUSY, cutter nothing); stamps classic red `#c0392b` and navy `#264a8c`, rotated -4..6 degrees with `mix-blend-mode: multiply`; lilac `#9a8cc7` for Sandra stamps and fields; the SEND button green `#4fae6a`; the desk background cream `#fff4dc` with dotted-paper texture. All text must pass AA (cream on dark, `#3a3226` on paper).

Typography: monospace (`ui-monospace, Consolas, "Courier New", monospace`) for LCD, paper and reports, letter-spacing 0.4px; chunky rounded system sans (`"Trebuchet MS", system-ui, sans-serif`, weight 800) for buttons and labels. Fax pages use mixed case plus ALL CAPS for headers and stamps. From beat 7 `--fax-font` changes to `"Segoe Script", "Bradley Hand", cursive` (warmer, "slightly handwritten").

TRICKS (all CSS / emoji / SVG / canvas):
1. Thermal curl: `.m-fax-machine-sheet` with `transform: perspective(500px) rotateX(calc(var(--curl)*62deg)) scaleY(calc(1 - var(--curl)*0.55)); filter: blur(calc(var(--curl)*3px)); transform-origin: top;` and a pseudo-element cylinder highlight (`linear-gradient(90deg, rgba(0,0,0,.18), transparent 30%, transparent 70%, rgba(0,0,0,.12))`).
2. Perforation: a repeating radial-gradient dotted line along the bottom edge (`radial-gradient(circle, #3a3226 1.2px, transparent 1.6px) 0 0/10px 6px repeat-x`).
3. Thermal fade: the print layer's `opacity: var(--ink)`; filed sheets keep the frozen value.
4. Canvas scope: polyline waveform (sine + a little noise) scrolling left, four pulse markers, scan bar over the sent page drawn as a bright horizontal line with a light-trail gradient; static streaks as thin semi-transparent bars.
5. Static streaks on report strips: 1px-tall absolutely positioned bars `mix-blend-mode: multiply` (count `4 - hits`).
6. Paper accordion for the jam: five divs, alternating `skewY(-6deg)` and `skewY(6deg)`, shadows.
7. Stamps: buttons with `border: 3px double`, `text-shadow`, a thunk keyframe (`translateY(-6px) scale(1.15)` to rest), an ink splat pseudo-element (radial-gradient, multiply).
8. Ring: the machine body gets a 3-frame `transform: translate(-3px,0) rotate(-0.6deg)` keyframe; the 📞 jiggles; LED blink; reduced motion switches to a border-colour pulse.
9. Drawings: inline SVG with `stroke-dasharray: 3 4` outlines of a fax machine and an empty chair.
10. The happy machine: two CSS boxes, two dot eyes, a curved border smile, a small CSS leaf.
11. Concertina burst: up to 12 `div.m-fax-machine-conc` with `--dx` `--r` custom properties.
12. Emoji (Emoji 12 or older only): 📠 📞 🗂️ 📄 ☎ ✂ 🧻. No newer glyphs. The lint tool errors on any newer emoji.
13. `prefers-reduced-motion` and the engine's reduce-motion body class: read both in try/catch (`matchMedia('(prefers-reduced-motion: reduce)').matches` and `document.body.classList.contains('pm-reduce-motion')`); either true means curl snaps, no machine shake, no scroll animation on the scope (the waveform is drawn static with a single frame update every 200ms), no concertina animation (the sheets just appear).
14. Responsive: `container`-free; use media queries on the root via a `compact` class set from `root.clientWidth` (< 480) checked on mount and on `resize` via `api.on(window,'resize',...)`; also use CSS grid with `grid-template-columns: minmax(0,1.6fr) minmax(0,1fr)` above a 760px width class `wide` set by the same JS (media queries cannot be emulated by the fuzz harness).

---

## 12. Registered global content (`P.addLines`, so the lobby can reference the module)

Register under existing categories (verbatim):
- `moduleEnter`: `You have entered the Fax Room. Please send something to no one. Per policy, no one is expecting it.` / `The fax machine has been READY for eleven years. It would like to be used before it forgets how.` / `Welcome to Unit 7 1/2. The machine is warm. The machine is also, for reasons it has not shared, listening.` / `You are about to send a fax to Nobody. Nobody has been notified, and has put on a nice hat.`
- `moduleExit`: `You have left the Fax Room. The machine is still READY. It is always READY. It has been told it can stop.` / `You left while the line was open. The line is fine. The line is patient.` / `The fax has not been received by anyone. This is a perfect delivery record, and has been framed.` / `You left a fax unfiled. It will fade in 25 seconds, which is a short and honest time.`
- `ticker`: `FAX MACHINE REPORTS 0 RECIPIENTS, 1 SATISFIED; SOURCES CLOSE TO THE MACHINE DESCRIBE THE SATISFACTION AS 'LOUD'` / `NOBODY, SENIOR, ANNOUNCES RETIREMENT; REPLACED BY IDENTICAL, SLIGHTLY YOUNGER NOBODY` / `SANDRA FROM COMPLIANCE ADDS FIELD TO FORM; FIELD CONFIRMS IT HAS ALWAYS BEEN THERE` / `PAGE 2 OF 1 REPORTED; OFFICIALS URGE CALM AND A SECOND PAGE` / `TONER LOW REPORTED TO BE A STATE OF MIND; TONER DESCRIBES ITSELF AS 'FINE'` / `FAX FROM NOBODY ASKS FOR NUMBER; MACHINE ANSWERS WITH ITS OWN; BOTH PARTIES: YOU`
- `tip`: `Tip: thermal paper wants to be a scroll. Hold it flat and it will tell you everything, briefly.` / `Tip: any number connects. The number 7 1/2 0 connects somewhere else.` / `Tip: the machine has its own number printed on every fax. It has been there the whole time.`
- `lobbyEvent`: `The fax machine has sent 400 pages to nobody and received 31. Management calls this a healthy ratio.` / `Gerald has been seen outside the Fax Room with a manila envelope. It is empty. It is, he says, 'a gesture'.` / `Dennis (Plant) has been faxed. Dennis (Plant) has not replied. Dennis (Plant) has several leaves and a policy.`
- `plantStatus`: `Dennis (Plant) has been placed near the fax machine. He is receiving nothing, and thriving.` / `Dennis (Plant) has filed a fax. It is a drawing of a leaf. It is the best filing in the building.`
- `lockedTease`: not needed (cost 0).
Optionally register decorative settings: `{ id:'fax-machine.setting14k', label:'Fax Baud Rate', type:'select', options:['9600','14400','Vibes'], default:'Vibes', responses:[...] }` with 3-4 absurd responses of your own. Not required.

---

## 13. Achievements (module file; ids prefixed `fax-machine.`; >= 6 with >= 2 secret; `reward` in Meh)

| id | name | desc | icon | secret | reward |
|---|---|---|---|---|---|
| fax-machine.first | Grand Marshal of the Transmitted Void (Third Class) | Send your first fax to nobody. It is received by nobody and treated like a military victory. | 🎖️ | false | 3 |
| fax-machine.archivist | Supreme Archivist of the Curled Scroll | File 12 faxes in the binder. The binder is moved. The binder will not say so. | 🗂️ | false | 6 |
| fax-machine.page_one | Knight Commander of Page One of One | Send 25 faxes. Page 1 of 1 stands behind you, but only just. | 📄 | false | 6 |
| fax-machine.flat | Laureate of Holding Things Flat | Hold thermal paper flat for a combined 60 seconds. Per the data, you are the first to try. | 📃 | false | 5 |
| fax-machine.handshake | Keeper of the Hallowed Handshake | Land all four pulses in 5 handshakes. The line has noted your grip. | 🤝 | false | 5 |
| fax-machine.unjammed | Archdeacon of the Unjammed | Clear 3 paper jams. At least one was in the right order, probably. | 🔧 | false | 5 |
| fax-machine.final | Emperor of the Final Page (Page 2 of 1) | Send the last fax of the session to the only number that was ever yours. It was received before it was sent. | 🏁 | false | 10 |
| fax-machine.patient | The Order of the Patient Dial Tone | SECRET. Idle for 90 seconds and let the machine ring on its own. Awarded for waiting for no reason. | ⏳ | true | 12 |
| fax-machine.wrong_number | The Fax Who Faxed Himself, Emperor of the Wrong Number | SECRET. Dial your own number, or 7 1/2 0, or forward a wrong-number fax to no one. A little exhausting to say. | 🔁 | true | 12 |
| fax-machine.excess | Duke of Dialing in Excess | SECRET. Overload the machine with a great many faxes in three seconds. A fountain of paper was involved. | 🧯 | true | 12 |
| fax-machine.unfinished | The Holy Order of Unfinished Se | SECRET. Read a fax that has run out of the words it was saying. It ended where the paper did. | ✂ | true | 12 |
| fax-machine.stamps | Archduke of the Page That Is Only Stamps | SECRET. Put all five stamps on one sheet. The page has gone through the other side of paperwork. | 🔖 | true | 12 |
| fax-machine.technically | Technician, Technically | SECRET. Click the service sticker until the machine admits something. It was last serviced next Thursday. | 🔩 | true | 12 |

Unlock with `api.achieve` at the point of the event; do not rely on `check` callbacks. Use stat reads (`api.stat.get`) for thresholds: `sent >= 25`, `filed >= 12`, `flatSeconds >= 60`, `perfect >= 5`, `jams (cleared) >= 3`. `fax-machine.first` fires on the first send; do not also call `api.award` for achievement rewards.

---

## 14. Persistence (`api.save`)

Keys (wrap every read: validate types and clamp; corrupt data gives defaults, never throws; write on change, never per frame; a single `persist()` function debounced to at most once per 2s plus on destroy):
`v:1`, `beat` (0..9), `lap` (int >= 1), `playSec` (int), `sent`, `received`, `filed` (ints), `done` (array of scripted ids, max 20), `firstTo` (string, <= 12), `firstRe` (string, <= 40), `firstStamps` (int 0..6), `cameo` (object of booleans: toaster, gerald, rock, sandra), `seen` (object: floor, sock, selffax, handset), `confChain` (0..4), `tallyN` (int), `warmth` (not used), `drum` (array of unlocked RE keys, max 12), `urgencyTier` (derived; do not store), `sandraRows` (0..3).
Remount resumes at that beat with line A8 (and the scripted faxes already `done` do not repeat). The in-session binder drawer is rebuilt from the save: `archive` (array up to 20 compact `{f, re, t, k}` items). Store `sent/received/filed` also as engine stats via `api.stat` (these are the truth for achievements).

---

## 15. Implementation hints

- File skeleton: IIFE; `const P = window.POINTLESS;` data tables (drum, stamps, replies, tally, tiers, lines); `P.injectCSS`, `P.addAchievements`, `P.addLines`, `P.registerModule`. In `mount(root, api)`: build DOM with `api.el`, create `S`, wire inputs via `api.on`, start `api.setInterval(tick1, 1000)` and one rAF loop (`api.requestAnimationFrame` re-arms itself; guard `S.dead`). `destroy()` sets `S.dead = true`, clears references (all other cleanup is managed).
- RNG: `api.rand/randInt/pick/shuffle/chance` only. Implement `makeBag(arr)` returning `next()` that reshuffles on empty and avoids repeating the last item across the seam. Beats, bags and the surprise bag are the same helper.
- Time: `api.now()` for deltas; rAF timestamp argument for animation dt (clamp dt to 0..0.1 so hidden tabs never jump). Never `Date.now`/`performance.now`.
- Canvas: size once with `canvas.width = 320; canvas.height = 90`; draw only while something animates (handshake, scan, ending) plus a redraw on idle at most every 200ms; guard `ctx` null; guard `dt` NaN. Do not use `devicePixelRatio` tricks (keep it simple and crisp with `image-rendering: auto`).
- Sheet text print: build `lines = wrap(text, 30)`; reveal one line per 280ms (selftest 90ms) with managed timeouts (epoch-checked). Each sheet owns at most 8 timers; clear on removal via an array of ids.
- Pointer: sheets use `pointerdown` (capture in try/catch, `e.preventDefault()`), `pointermove` for the drag-down tear (`dy > 70`), `pointerup`/`pointercancel`/`lostpointercapture` release. Sheets get `touch-action: none` and `user-select: none`.
- Active sheet: `S.active` updated on `pointerenter`/`focus`/`pointerdown` and on print; cleared when the sheet is removed.
- Spam trackers: arrays of timestamps trimmed to the last 3s; check on each SEND and keypad press.
- Idle: `S.lastInput` from a single listener on `pointerdown`/`keydown`/`pointermove` (root and document via `api.on`).
- Beats: `S.beat`, `S.playSec`, `S.sent`, `S.received`, `S.filed`; one function `maybeFireBeat()`; beats persist; do not advance more than one beat per check.
- Narrow layout: a `compact` class set from `root.clientWidth` on mount and on `resize` via `api.on(window,'resize',...)`.
- Reduced motion: read both signals in try/catch; skip shakes, curl easing and the waveform scroll; show static states.
- For text injected into the DOM use `textContent` or `api.el` (never `innerHTML` with any dynamic text). Player-name text on paper comes from `api.player.name` (sanitised by the engine).
- Meh pacing: with the rewards above, ten minutes pays about 40-60 Meh. This is intended.
- Selftest: with `api.selftest` apply the x0.3 and x0.25 factors (5.1). Never let `NaN`/`undefined`/`null` reach text: guard every template (`String(x == null ? '' : x)`), use fallback strings for `firstTo`/`firstRe`/`re` when empty, and never print the words `null` or `undefined` in jokes (note: the word "Nobody" is fine).
- Lint: all classes start `m-fax-machine-`; keyframes prefixed `m-fax-machine-`; no `innerHTML`; no raw timers; no `alert`; every `P.injectCSS` selector contains `.m-fax-machine-`; at least 6 achievements, 2 secret (13 here); the file must stay <= 1800 lines (target ~1650). If space is tight, cut in this order: Sandra's range slider, the happy machine, the Y/Y buttons, the concertina animation.

---

## 16. Risks: the 5 most likely implementation bugs

1. SPACE/ENTER/G OWNERSHIP AND STUCK HOLDS. Space means flatten, handshake tap, native button activation (only on a focus-visible non-sheet button) and page scroll all at once; Enter means SEND, handshake tap and native click. A focused SEND button plus a global key handler fires both; a lost `keyup`/`pointerup` (fuzz, tab switch, blur) leaves a sheet flat forever and `flatSec` accruing; Space on a button after a mouse click activates it instead of flattening. Fix: the ownership rule in section 3, `blur()` buttons after pointer clicks, `preventDefault` on keydown AND keyup for owned keys, ignore `e.repeat`, 15s auto-release, and release on `blur`/`visibilitychange`/`pointercancel`/`lostpointercapture`; unit-check that `S.held` is cleared on every sheet removal.
2. THE LINE STATE MACHINE AND STALE SEQUENCES. SEND, rings, jam, spam busy, the quiet beat and the ending overlap (a ring arriving mid-handshake, a queued SEND firing during a jam, Esc/spam during the scan, the ending triggered twice, a destroy mid-sequence). Fix: one `S.line`, an `S.epoch` token that every managed callback of a sequence checks (and increments to cancel), a single `finishSend()`, `S.queuedSend` held at most once, caps on every wait (jam 30s, busy 6s, ring defer 8s), `S.endingDone` guard, and `S.dead` checks everywhere. Test by mashing SEND, J, T, F and Esc together.
3. SHEET LIFECYCLE, CURL/FADE LOOP AND DOM CAPS. A sheet is removed while held, while being torn or while its print timers are pending; `S.active` points at a detached node; the fade loop retires a sheet twice; `--curl` and `--ink` write every frame; the 3-sheet cap, 4-strip tray, 20-row drawer and 12-sheet concertina are not enforced under spam; rAF keeps running after destroy. Fix: a single `removeSheet(s)` that clears timers, `S.held`, `S.active`, and marks `s.dead`; guard every callback on `s.dead`; write CSS variables only on change; enforce caps in one `trimCaps()`; use managed rAF only.
4. BEATS, SCRIPTED FAXES AND PERSISTENCE. Beats firing twice or out of order, scripted faxes lost when the cap retires them or printed twice after a remount, the B8 quiet overlapping a ring or the idle ladder (an idle fax in HUSH), the B9 ask duplicating, lap resets clobbering `done`, and corrupt save data throwing at mount. Fix: `maybeFireBeat()` only from IDLE and only for the next beat, scripted faxes in a queue with `done` ids saved at print time (not at queue time), a `S.hush`/`S.line` check in the ring scheduler and idle ladder, a per-lap `S.endingDone`, and a defensive `loadSave()` that validates every field.
5. CANVAS TIMING AND TEXT TEMPLATING. Pulse positions and hit windows drift when the rAF `dt` is 0 or `NaN` (first frame, `api.requestAnimationFrame` under selftest runs on a 16ms timer so `dt` may be exact 0.016), a tap uses `api.now()` while pulses use the rAF timestamp, the two-wave ending uses an unclamped phase; and templates leak tokens (`{re}`, `{num}`, `{name}` shown literally, `undefined` when `firstTo`/`firstRe` is empty or a drum entry is missing, `NaN` for `PAGE x OF y` or the scoreboard). Fix: one `S.t` handshake clock advanced by clamped `dt` for both pulses and tap judgement, a pure `judgeTap(t)` function, `Math.max(0, dt) || 0.016` guards, a single `fill(text, vars)` helper that replaces every token and falls back to safe strings, and a final regex check in dev that no `{[a-z]+}` or the forbidden words remain in any DOM text.

(Honourable mentions: `Space` page-scroll when the root is scrollable; the `1/2` key char `½` sneaking into `parseInt`; the drum cycling off the end when entries unlock mid-cycle; the Sandra range input's `change` vs `input` events under fuzz typing; `api.say` flooding by priority and cooldowns; the Toaster/Rock cameo reading stats that are always 0 under `?dev` (that is fine, skip silently); the shake class left on after a destroy; the `HANDSET` emoji button needing a text fallback for AA.)
