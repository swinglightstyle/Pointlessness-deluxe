# DESIGN BRIEF: INTERVIEW A POTATO (id `potato-interview`)

Final brief by the showrunner. Builder: read SPEC.md and VOICE.md first, then build `games/potato-interview.js` from this file alone. Where this brief and SPEC.md conflict, SPEC.md wins. Every line of dialogue in section 8 is final and verbatim; copy it, do not improve it, do not explain it.

---

## 1. CONCEPT

You are the sole interviewer at a firm with exactly one open position and an inexhaustible supply of potatoes. You ask questions off a clipboard, you hold Space to create an Awkward Silence until a potato confesses something, you stamp a form that has no No box (it has a secret, tiny No box), and then you press HIRE, DO NOT HIRE or NEED MORE TIME. Whatever you press, the stamp says HIRED AS SENIOR VICE SPUD. The entire game is the gap between your careful, rigorous evaluation and the lanyard being placed around a tuber's neck.

Pillars (cut anything that does not serve one of these):
1. **The stamp always wins.** Maximum ceremony, zero consequence. The ceremony is the joy; it gets bigger, and the title gets longer, every hire.
2. **Silence is the best verb.** Holding Space is the pointless mechanic that reveals itself as the main one.
3. **The queue never moves.** Door sign says QUEUE: 4 forever. NEXT: GERALD is always next until he is already in the chair.
4. **Escalation arc in about 9 to 10 minutes** (VOICE.md): normal, weird, bureaucratically unhinged, strangely touching, back to normal like nothing happened.
5. **Sincerity.** Nobody winks. The potatoes are professionals.

Module registration:

```js
P.registerModule({ id:'potato-interview', title:'Interview a Potato',
  tagline:'Rigorous hiring. Every candidate is hired as Senior Vice Spud.',
  icon:'🥔', category:'game', unlockCost:0, tags:['interview','clipboard','potato'], mount })
```
`api.setTitle('Interview a Potato (Form 27B/6)')`.

### What was kept from the pitches, and what was cut

KEPT: the Awkward Silence hold gauge (2s sweat, 4s small confession, 7s enormous confession, 10s Silence Overflow job offer); three-question interviews; Strong Yes / Yes (Technically) / Yes (Warmly) stamp boxes plus the secret 6px No box; the single Gut Feeling slider with the 7 1/2 magnetic notch that always totals "Outstanding"; the squint lens over fine print; the lanyard / badge / offer letter ceremony; Queue: 4 and NEXT: GERALD signs; headcount wall; coffee rings; Sandra's sticky notes and the 11 eyes policy; Toaster, Dennis, Sweet Potato, Missing Sock, Geoffrey the rock; the panel interview; the sprouting clipboard; the idle reversal ("the potato interviews YOU"); the spam mash with a lawyer potato; the not-ending.

CUT (unbuildable or weak in one vanilla file): four separate sliders (now one), canvas applause and canvas potato rain, SVG org-chart tree with animated dashed arrow, the rotating-room secret, the 7 1/2th half-wall candidate, wet sponge as a built-in (it is a one-off gag, kept as a stretch), a draggable/flippable resume card, separate Think-About-It and Need-More-Time controls (merged into one button).

---

## 2. SCREEN LAYOUT

Everything lives in one wrapper `div.m-potato-interview-root` inside `root`. CSS custom properties are defined on that wrapper (names `--pi-*`).

```
+---------------------------------------------------------------+
| HEADCOUNT WALL  [🥔][🥔][🥔] ... +N more, mostly Barry         |  thin strip, top
+---------------------------------------+-----------------------+
| STAGE (58%)                           | CLIPBOARD (42%)       |
|  wall: poster, clock 4:17, DOOR+SIGN  |  Form 27B/6 header    |
|  chair (too big) + candidate SVG      |  3 question cards     |
|  speech bubble (aria-live)            |  answer-quality stamp |
|  silence gauge (vertical, chair side) |  EVALUATION FORM:     |
|  STARE button                         |   [Strong Yes] [Yes T]|
|  Dennis in the corner (decor plant)   |   [Yes W]  (tiny: No) |
|  nametag button                       |   Gut Feeling slider  |
|                                       |  DECIDE: HIRE | DO NOT|
|                                       |   HIRE | NEED MORE TIME|
+---------------------------------------+-----------------------+
| RESUME SCROLL (full width): lines unroll one per answer; fine print under lens |
+---------------------------------------------------------------+
| HR COMPLIANCE STRIP: Verdict stamp | Workforce Synergy meter | Positions |
|  Filled / Open | Fit Score | Time-to-Hire | Quarterly Spud Headcount |
+---------------------------------------------------------------+
Overlays (absolute inside root): offer letter, ending certificate, Sock flip header,
 idle-reversal, falling sticky notes layer. Max one overlay at a time.
```

Responsive:
- Below 700px root width: stack stage over clipboard; clipboard question cards become a horizontal scroll row (`overflow-x:auto; scroll-snap-type:x mandatory`); resume collapses to a strip showing the last 3 lines with a "R" toggle button; the STARE button becomes a large floating thumb target (min 72px circle, bottom-right of the root, `position:sticky`/fixed inside root).
- Measure `root.getBoundingClientRect().width` (not window width) for all breakpoints. Must work 360px to 1400px.

Components in detail:

**Door (top-right of stage).** A button `.m-potato-interview-door` containing a peephole with an eye that blinks every 7.5s, and a sign with two text areas: line A `QUEUE: 4` (rewritten by thresholds, section 8.9) and line B `NEXT: GERALD (...)`. Each time line B changes the old text is shown crossed out, smaller, above the new one (keep at most the last 2 crossed-out lines). Clicking the door knocks: `sfx('tick')` and Management says the knock line (8.9). Header label above the door: `WAITING ROOM (7 1/2 potatoes)`.

**Chair.** Pure CSS: a back (rounded rect), a seat (rect), two legs, drawn about 1.5x too large for the candidate, so the candidate sits low in it. The candidate SVG is centred on the seat.

**Candidate.** Inline SVG (built via `innerHTML` on a container, NO xmlns attribute, see Risks). Face: two eyes whose pupils follow the pointer; a mouth `div` with `border-radius` that morphs between smile, line and "o" via a CSS class; surface "eye spots" (small dark circles) count = candidate.eyes and are what Sandra counts. A tiny cardboard tie (clip-path triangle) for Gerald. A lanyard overlay element (initially hidden; Barry starts with one reading HIRED).

**Nametag.** A rotated laminated `button` pinned with a gradient safety-pin. Click or Enter opens a one-line "spec sheet" in the bubble: `Eyes: {eyes} (confirmed). Starch: sufficient. Gravitas: pending.` Reward 0.

**Gauge.** Vertical flex bar beside the chair, fill height bound to hold seconds / max (10, or 14 in panel mode). Tick marks at 2, 4, 7, 10. The outline pulses when a threshold is crossed. While staring: clipboard gets `.m-potato-interview-still` (all card wander animations paused), and the pointer cursor over the stage becomes an eye (`cursor:` using an inline SVG data URI is allowed since it is not a network URL; fall back to `cursor:crosshair`; do not rely on emoji cursors).

**Clipboard.** Dark brown board `#6b4a2b`, jagged silver bulldog clip made with `clip-path: polygon(...)`, manila paper `#f1dfa7` with ruled-line gradient. Header: `INTERVIEW FORM 27B/6 (Request for Form 27B/7)`. A coffee-ring layer sits behind the cards (section 13).

**Resume scroll.** Strip with spiral holes (radial-gradient dots) on the left edge and a ruled-line background. First visible: one-line summary `{name}, {kind}. Resume length: {inches} inches.` Each answer or confession appends one line, with a max-height transition. Max 14 visible lines; older lines collapse into one item `... and {n} more years`. Fine print block at the bottom (section 9.5). A `R` toggle button expands to full height.

**HR Compliance Strip.** Verdict stamp slot (decorative button, clicking slams a harmless stamp, see spam), Workforce Synergy meter, `POSITIONS FILLED: {k}` (climbs, lifetime hires) next to `POSITIONS OPEN: 1` (never changes), Candidate Fit Score (`{random 40-99} {unit}`; unit rotates: fit-points, cubits of fit, fit in the abstract, fits, units of fit (approx)), `TIME-TO-HIRE: -{d} days` (d grows as seconds pass; always negative), `QUARTERLY SPUD HEADCOUNT: {4119 + 61*hires}`.

---

## 3. THE FIVE VERBS AND EXACT CONTROLS

### Verb 1: ASK
- Three question cards on the clipboard, each a real `<button>` with a key chip `1`, `2`, `3` and a random rotation of +/-2 degrees.
- Questions come from the 22-question shuffle bag (section 8.3) with no repeats within a candidate (re-shuffle only if a candidate has been asked all 22).
- Click, tap, Enter, or press `1`/`2`/`3`. The card rips off (CSS tear-off, 350ms, `sfx('whoosh')`), a paper slip showing the question text is slapped on the candidate's forehead for about 1.2s, a coffee ring is left at the slot, the slot refills from the bag, and the candidate answers in the speech bubble (typewriter, about 28ms per character; any new ask or click on the bubble completes the previous typing instantly).
- Each ask reveals the next resume line (candidate has 3 scripted lines, then infinite lines from the generic pool).
- After each answer an ANSWER QUALITY margin stamp prints (`sfx('tick')`): one of the Satisfactory variants (8.5). Never anything but Satisfactory.
- Awards: +0.3 Meh per ask (`api.award(0.3)`), +0.1 per answer-quality stamp (counted as a stamp via stat).
- Asking after the third answer is allowed forever (see spam tiers). The decision buttons simply start pulsing after three inputs.

### Verb 2: STARE (the Awkward Silence)
- Hold Space, or press and hold the stage/potato (pointer events), or hold the on-screen STARE button (touch). One unified hold state (see Risks #1). Space never scrolls the page: `preventDefault` on Space keydown/keyup inside the module (announce with `aria-keyshortcuts="Space"`).
- Gauge fills 1 unit per second. Thresholds fire once per hold:
  - 2s: SWEAT. SVG teardrops appear on the potato (CSS keyframe fall). Management sweat line.
  - 4s: SMALL confession from the candidate's pool (counts as an input and reveals a resume line).
  - 7s: ENORMOUS confession.
  - 10s (14s in panel mode): SILENCE OVERFLOW. `api.award(5)` the first time per candidate (1 Meh after), `sfx('ding')`, gauge empties with a flash, the potato offers YOU a job. Stat `potato-interview.silence10`, achievement `potato-interview.silence`. If the player keeps holding, at 1s into the new fill Management says the 11-second line.
- Releasing before the overflow cashes out `0.2 Meh per second held` (floor to 0.1) and says the release line, but only if held 0.5s or more (shorter is a tap and does nothing).
- Reduced motion: no sweat fall animation, droplets just appear.
- Dennis and the Toaster use the same hold with their own confession pools. The Unnamed Potato confesses at 4s and 7s too.

### Verb 3: SQUINT
- Hover (pointer) or long-press (touch, 400ms) over the resume's fine print: a circular lens follows the pointer and reveals the fine print under it (duplicate text layer with `clip-path: circle(38px at var(--lx) var(--ly))`; the base layer is near-invisible 7px text; the duplicate is `aria-hidden`, the base is readable by screen readers).
- Keyboard: `Q` squints for 1 second per press (flash-reveals the fine print, adds 1s to the squint counter).
- Squint time accumulates while the lens is over the fine print. First 3s on a given resume pays 0.5 Meh once per resume. 20s total in one session fires the secret (section 9.5).
- Persist in `api.save`: the set of fine-print line indexes that the lens has passed (line index = floor((lensY - printTop) / lineHeight)).

### Verb 4: SCORE
- After each answer the Evaluation Form lights up: three real buttons with checkbox look:
  `Strong Yes (Spud)` key `S`, `Yes (Technically)` key `T`, `Yes (Warmly)` key `W`.
- Clicking stamps it with a thunk (`sfx('stamp')`, 160ms screen shake class on the stage, ink-splat element, 0.5 Meh the first stamp per answer, counted as stamp). One stamp per answer; extra stamps on the same answer give the "already stamped" line and 0 Meh. Unscored answers are fine; Management scores them for you only at decision time.
- The **No box**: a fourth 6px-type box labelled `No` at the very bottom of the form, a real button, faded, key `N`. See secrets.
- **Gut Feeling slider** (appears on the clipboard at candidate 3, with Sandra's first clause): one `<input type="range" min="-3" max="11" step="0.5">` labelled `Gut Feeling Index (scale: -3 to 11; 10 is not the top)`. Arrow keys work when it is focused. **Magnetic notch at 7 1/2**: when the value enters 6.5 to 8.5 it snaps to 7.5, `sfx('tick')`, and a `stuck` flag is set; while stuck, input values within 7.5 +/- 1.5 are forced back to 7.5; the value only leaves once it differs from 7.5 by 1.5 or more (setting `.value` programmatically does not fire `input`, so no loop). The total label under it always reads `Total: Outstanding`, and reads `Total: Outstanding (Provisional)` when the value is 10 or above. Value 11 once: achievement `potato-interview.rubric`. Scores are accepted without comment (the label never says anything else).

### Verb 5: DECIDE
Three real buttons, always enabled (pulsing after three inputs):
- `HIRE` (key `H`) and `DO NOT HIRE` (key `D`): both run the same ceremony. DO NOT HIRE additionally plays the lanyard in reverse for one frame (it rises and drops again), then the stamp, then an HR apology line.
- `NEED MORE TIME` (key `X`, hold): has an hourglass that spins and looks disabled (`aria-disabled="true"`, NOT the `disabled` attribute so it can be held). A plain click says the disabled line. A 5-second hold (pointer or `X` held) fills a thought-bubble; at 5s Management says the thought line, +0.5 Meh, and the candidate is hired with the title parenthetical `(Pending)`. Releasing early says the indecision line with the held seconds to one decimal.
- Pressing `H` or `D` with zero inputs so far triggers the secret `potato-interview.efficient` (section 9).

### Complete key map (listener attached via `api.on(document, 'keydown'/'keyup')`)
Ignore events with ctrl/alt/meta, ignore `e.repeat` except where noted, ignore when target is an `input[type=text]` (there are none, but be safe) and let the range input keep its own arrow keys.

| key | action |
|---|---|
| 1 2 3 | ask card 1/2/3 (also pick Sock options and answer Yes buttons in flip and mutual modes) |
| 0 | ask Q-Ø (when that card exists) |
| Space (hold) | stare; during CEREMONY it skips the pleasantries (logged "a missed pleasantry"); never both |
| S / T / W | stamp the form (Strong Yes / Technically / Warmly) |
| N | the secret No box |
| H / D | hire / do not hire |
| X (hold) | need more time (5s hold) |
| Q | squint 1s |
| R | toggle full resume |
| M x3 within 2s | secret Mash |
| Enter | dismiss offer letter / confirm fanfare / activate focused button (native) |
| Esc | close any open overlay or sheet; otherwise do nothing |
| Tab | walks every button; all controls are real buttons |

Do NOT bind `B` (Lobby boss key) and never bind Esc to exit (the Lobby window has an Exit button).

---

## 4. STATE MACHINE

Single variable `phase`, plus an integer `epoch` incremented on every phase change. Every deferred callback (`api.setTimeout`, typewriter, ceremony steps) captures `const e = epoch` and returns immediately if `e !== epoch` (this is the main anti-race tool; see Risks #2).

| phase | meaning | enter from | leaves to |
|---|---|---|---|
| `boot` | mount, build DOM, welcome line | mount | `enter` |
| `enter` | candidate rolls in (translateX plus rotate 360, 600ms), intro lines fire | boot, `exit`, flip, ending | `ask` |
| `ask` | main loop: ask, stare, score, squint; decision buttons live | `enter` | `ceremony`, `mash`, `asleep`, `reverse` |
| `ceremony` | stamp slam, lanyard drop, badge print, letter, confetti (about 4.5s, Space/click/Enter skips) | `ask`, `mash` | `exit` |
| `exit` | candidate walks off right, badge pinned on wall, counters update, next candidate chosen | `ceremony` | `enter`, `flip`, `ending` |
| `flip` | Missing Sock interviews the player (after candidate 9) | `exit` | `enter` |
| `ending` | blank clipboard, final card, fanfare overlay (once per session) | `exit` | `enter` |
| `mash` | question-fatigue collapse (about 3s) | `ask` | `ceremony` |
| `asleep` | idle 180s: candidate asleep, sprouting | `ask`(idle) | `ask` (click wakes) or `mutual` |
| `reverse` | idle 90s: potato interviews you (3 silent questions) | `ask`(idle) | `ask` (any input) |
| `mutual` | idle 300s: gentle Yes-button interview | `asleep` | `ask` |

Any input (pointerdown, keydown) exits `reverse` immediately with no penalty line other than the ones below. Idle phases only start from `ask` (never during ceremony, flip or ending). Stare hold is only valid in `ask` (release and reset when phase changes).

Session counters: `n` = candidates this mount (1-based, includes the current one), `hs` = hires this session. Lifetime counters (save): `total`, `hires`.

---

## 5. ROSTER AND ESCALATION (keyed to `n`, nominal times at about 40 seconds per candidate)

Pace guide: 3 questions about 12s, one stare about 8s, scoring 4s, decision and ceremony 8s, walk-on/off 6s. First joke at second 3 (Barry's HIRED lanyard). A new beat at least every candidate. If 600s of play elapse before `n` reaches 10, set `endingDue = true` and trigger the ending after the next ceremony.

| n | time | candidate | what is new |
|---|---|---|---|
| 1 | 0:00 | **Barry**, Russet (7 eyes) | Rolls in already wearing a lanyard reading HIRED. Card 1 is pre-ticked: `Are you a potato? (Y)`. If no input by 8s Management auto-asks Q1 to model the verb. Barry answers "Mm." (Management transcribes it). After his 2nd input Management says the Stare line and the STARE button pulses. Barry's confessions: 4s rolled off a table, 7s on the table now. First 10s overflow: Barry offers you a job. First hire: huge ceremony, "position filled, remains open." |
| 2 | 1:20 | **Marjorie T. Russet** (9 eyes) | The pattern. Management: Everyone is hired, the interview is for morale. NEXT: GERALD gets its first intervention (fire drill). |
| 3 | 2:00 | **Dale (Yukon Gold)** (5 eyes) | Nametag reads GERALD crossed out, DALE (he volunteered). Pauses 2.5s before every answer ("executive presence"). The Gut Feeling slider slides onto the clipboard with Sandra's clause 1 and the 7 1/2 notch. |
| 4 | 2:45 | **The Toaster** (cameo, 0 eyes) | Answers every question "Toast." Hired as Senior Vice Spud of Honesty. The Toaster's stare overflow ejects a toast off the top of the stage. |
| 5 | 3:25 | **Philomena Fingerling** (11 eyes) | Sandra's eye contact policy replaces card 3 with `Please make eye contact with each of the candidate's 11 eyes.` Click all 11 eye spots (each blinks back, +1 Meh total on completion). A 12th faint eye then appears at the bottom; clicking it triggers the "it knows" line. |
| 6 | 4:20 | **Colleen (Fingerling) and Desmond (Yukon Gold)** (6 and 8 eyes) | Panel interview: two small potatoes share the chair; a `Direct Question: [Colleen] [Desmond]` toggle appears; click the potato you mean (default: last clicked). They cross-reference each other. Staring max is 14s; combined overflow = joint offer to share your job. Both are hired (Positions Filled +2, Positions Open stays 1). |
| 7 | 5:15 | **GERALD**, Vice President of Spuds | Seated before you could look; name tag `GERALD (NEXT)`. Cardboard tie. Every answer is profound and slightly wrong (also spoken via `api.say(...,{who:'Gerald'})`). Sets `api.flag.set('metGerald', true)`. Door sign becomes `NEXT: GERALD (HE IS HERE, HE WAS ALWAYS HERE)` permanently. Resume +7 1/2 inches per return. |
| 8 | 6:00 | **Reginald (Sweet Potato)**, orange | Sandra's clause: not technically a potato. THE CLIPBOARD SPROUTS (from now on, permanently): cards wander, some questions are rewritten by the clipboard, the clipboard asks YOU a card (Q-Ø) answerable by Yes or Yes. Guaranteed sweet potato here; after the ending a 1/20 chance, guaranteed if none seen for 12 candidates. |
| 9 | 6:50 | **Dennis (Plant)** | No eyes, no mouth. Every ask yields green silence (Exceptional Listening); Dennis scores himself Strong Yes automatically after the first ask; stare is the only real way he "speaks" (rustles, translated). Hiring him pays a 5 Meh cameo. |
| flip | 7:30 | **The Missing Sock** interviews YOU | After candidate 9's ceremony. Three questions, three options each, all "Perfect." Your resume is read out from your actual stats. Lights flicker at the word Tuesday. +5 Meh. You are hired as Senior Vice Valued Employee. |
| 10 | 8:15 | **The Unnamed Potato** (small) | No name, no resume. Says "..." to everything. Quiet confessions. Resume: `Wanted to be asked.` The ceremony is soft (no screen shake, a quiet tick). Strangely touching, then... |
| end | 9:00 | the not-ending | Section 11. Then the cycle continues with procedural candidates forever. |

After the ending: procedural candidates (section 5.1). Gerald returns when `n % 7 === 0` (so n=14, 21, ...), always interviewing for the job he has. The clipboard stays sprouted. 1 in 15 candidates is a Rock, group-candidates (trench coat, plus-one, hat) appear 1 in 8, and the Sweet Potato 1 in 20 (guaranteed after 12 candidates without one).

### 5.1 Candidate data shape and procedural compositor

```js
// scripted candidate
{ id, name, kind, eyes, fill, skin, resume:[l1,l2,l3], ref:'soil', intro:[lines], pool:[answers]|null,
  quirk:{prefix:'', suffix:'', delay:0}, small:[...], big:[...], over:[...], hired:[...], review:'...' }
```
Procedural: name = first + optional middle initial + kind in parens, from these bags:
- first: Brenda, Dolores, Walt, Ottoline, Gus, Maud, Clive, Bernadette, Trevor, Ignatius, Tilly, Norbert, Winifred, Hector, Sir Reginald Tuber the Third, Karen's Potato, A Different Gerald.
- kind: Russet, Yukon Gold, Fingerling, Red Bliss, Purple, Unclear. Colours: russet `#a47148`, yukon `#d9b36a`, red `#b5524a`, purple `#8b6bb1`, fingerling `#c99b64`, unclear `#9a9a7a`. Never repeat the previous name or kind adjacently.
- eyes: random 3 to 9 (Philomena is the only 11).
- quirk bag: `{delay:2500}` (pauses), `{prefix:'The tuber would say: '}`, `{prefix:'Per my previous message: '}`, `{suffix:' (whispered)'}`, `{prefix:'*sigh* '}`, none x2.
- resume: 3 lines from the resume pool (8.4) without repeats within a candidate, plus the reference line.
- answers: from the question's own two generic answers (8.3), modified by quirk; `pool` candidates ignore the question and draw from `pool` (shuffle bag).
- confessions: generic pools (8.6).

---

## 6. ECONOMY, STATS, FLAGS, SAVE

Meh (always tiny): ask 0.3, answer-quality stamp 0.1, score stamp 0.5 (first per answer), stare release 0.2 per second, Silence Overflow 5 (then 1), hire 2, eye contact complete 1, squint 3s 0.5 (once per resume), Dennis cameo 5, Sock flip 5, wake the sleeper 1, mutual 10, think-about-it hold 0.5, Haste Fee -0.1, Spam Fee -2 (`api.award(-2)`, never below 0 per engine), achievements per their `reward`.

Stats (all prefixed): `potato-interview.interviews` (candidates started), `.questions` (asks), `.answers`, `.hires`, `.stamps`, `.stares` (holds >= 0.5s), `.silence10`, `.gerald` (Gerald visits), `.mashes`, `.eyes`, `.squint` (seconds), `.rocks`, `.sweet`, `.sock`, `.sleeps`.

Flags: `metGerald` (shared, set true when Gerald appears; on entry if already true, Management says the metGerald line 8.1); read `plantClicked` (if true, Dennis wears a tiny tie in his scene); `potato-interview.mutual`.

`api.save` (`key 'v1'`, one JSON object, always read with defaults):
```js
{ v:1, hired:[{n:'Barry',h:3,t:'Senior Vice Spud'}], /* last 60 names */
  total:0, hires:0, fine:[], sessions:0, sorry:false, sponge:false, rocks:0, sweet:0, soilNote:false }
```
Wall renders the persisted `hired` (last 24 drawn) at mount, so the org chart quietly keeps growing across sessions. Progress beats are keyed to session `n`, never to lifetime `total`, so replaying always starts with Barry. Long-tail callbacks (queue sign, parentheticals, soil reference) are keyed to lifetime `hires`/`total`.

---

## 7. VISUAL DESIGN

Style: cheerful dysfunctional intranet. Thick `3px solid #2a1d12` outlines, `4px 4px 0 #2a1d12` sticker shadows, no gradients except the ruled-paper lines, the metal clip and the squint lens; system fonts; one cursive stack `'Segoe Script','Comic Sans MS',cursive` for handwriting (Gerald's card, Sandra's notes, margin notes).

Palette tokens on `.m-potato-interview-root`:
`--pi-paper:#fff6e0; --pi-wall:#fbf1dc; --pi-felt:#8fd3b6; --pi-wood:#c68b59; --pi-wood-d:#8a5a34; --pi-board:#6b4a2b; --pi-manila:#f1dfa7; --pi-ink:#2a1d12; --pi-mustard:#e6b422; --pi-coral:#f07f6e; --pi-lilac:#bda7e0; --pi-mint:#a8dcc0; --pi-russet:#a47148; --pi-russet-d:#8a5f33; --pi-spot:#6b4423; --pi-yukon:#d9b36a; --pi-red:#b5524a; --pi-purple:#8b6bb1; --pi-sweet:#e58b3a; --pi-rock:#8d8a86; --pi-stamp-green:#2f9e6e; --pi-stamp-red:#c8433b`. Management speech elements elsewhere are lilac. Compliance (Sandra) notes: yellow sticky `#fff3a3` rotated 4 degrees with cursive text, lilac border. Provide `@media (prefers-color-scheme)`: none (the Lobby is cream).

Potato SVG: `viewBox="0 0 200 170"`, body path
`M100 12 C160 6 192 52 184 98 C176 146 130 164 96 162 C52 160 10 138 14 90 C18 44 50 16 100 12Z`, fill from candidate, 3px outline, an inner lighter ellipse highlight, hand-placed blemish circles (deterministic from name hash). Eyes: two white ellipses with dark pupils (pupils offset toward the pointer, clamped to 5px, updated via `api.requestAnimationFrame` only while the pointer moved in the last second; disabled under reduced motion). Mouth div: `.m-potato-interview-mouth--smile|line|o|sweat`. Sweet Potato: same SVG, `--pi-sweet`. Rock: gray lumpy body, no face, two tiny dots only. Mash heap: a bowl (div, border-radius 0 0 50% 50%) with a lumpy heap above (three overlapping circles), droplets. Dennis: SVG pot (rect trapezoid) and 5 leaf paths (scaleY sway animation), no eyes. Toaster: CSS rounded rect, two slots, a toast emoji that pops (`translateY`). Sock: the sock emoji at 6rem. Group-candidate overlays: trench coat emoji over the potato, hat emoji on top, a tiny second potato attached (plus-one).

Ceremony visuals:
- Verdict stamp: bordered `4px dashed` block, text `HIRED` large with `AS SENIOR VICE SPUD` smaller, parenthetical smaller still, rotated random -8 to 8 degrees, slammed with a keyframe scaling 2.4 down to 1 in 160ms, `mix-blend-mode: multiply`, with the 2-frame stage shake (reduced motion: no shake).
- Lanyard: a mustard strip dropping from the top of the stage onto the candidate, `animation: ... 700ms cubic-bezier(.2,1.6,.4,1)` overshoot (reduced motion: plain fade in).
- Badge: clipped `height` transition with a perforated top edge (repeating dashed border), text `SENIOR VICE SPUD`, the extra word line (8.7), `*See badge.` footnote from `hs >= 8`. The badge scales `--badge-scale: 1 + 0.05*hs` (cap 1.7) so by the ending it is bigger than the potato.
- Offer letter: paper overlay with a gold foil seal (`conic-gradient` circle, allowed), an SVG hand-drawn signature path, 6px legal footer. Dismiss with Enter, click or Space; auto-dismiss at 5s.
- Confetti: `api.confetti()` with small n (24) per hire.

Coffee rings: absolutely positioned ring divs (`border:6px solid rgba(110,70,30,.35); border-radius:50%; box-shadow: inset 0 0 0 2px rgba(110,70,30,.25)`) in a layer behind the cards, one per asked card, positions from the slot rect plus jitter, cap 14 (oldest removed). From ring 6 they get face-like placement (two eye rings, a mouth arc) and captions (8.12) printed inside small rings; at the ending a line of text `PLEASE HIRE ME` appears in the same brown at the bottom of the clipboard.

Sprouting clipboard (from n=8): each card gets two CSS pseudo-element eyes (`::before`, `::after` dots) and a tendril (`::after` thin line), plus a slow wander keyframe (`translate +/-5px, rotate +/-3deg, 7 to 11s`, three variants) with `animation-play-state: paused` on `:hover`, `:focus-visible`, `:active` and when `.m-potato-interview-still`. Reduced motion: no wander.

Wall potato badges: 22px emoji inside a `button`, under each a 3px coloured bar (hat/lanyard colour, from a 8-colour list); max 24 drawn; tag `+{n} more, mostly Barry`. Clicking one shows its review line in the bubble (and `api.say` priority 0 at most once per 5s).

Dennis corner plant (decor, bottom-left of the stage): a thriving CSS plant that never reacts, except one leaf wiggles when any achievement unlocks in this module; clicking him says nothing (the Lobby plant handles that). If `plantClicked` is true he wears a tiny tie.

---

## 8. FINAL CONTENT (verbatim)

Notation: `{name}` candidate name, `{p}` player name (`api.player.name`), `{n}` count, `{s}` seconds, `{k}` count. Fill with your own helper; unknown tokens become empty string (never the word undefined). Strings are in double quotes with single quotes inside.

### 8.1 Opening and entry
```js
const OPEN = [
"Welcome, Valued Employee. You are today's sole interviewer. Today's candidates are potatoes. Please remain impartial about starch.",
"Your pen is on loan from Sandra. Please sign nothing with it. She will know.",
"Your 9:00 is here. Barry has been here since 8:14. He is wearing a lanyard that says HIRED. We have not discussed it."];
const RETURN = [
"Welcome back, {p}. Barry has been waiting. Barry is applying for the job he already has.",
"Welcome back. Management kept your chair warm. The chair has questions.",
"Welcome back. The position is open. The position has always been open. It was only being polite."];
const MET_GERALD = "Gerald has asked that we not acknowledge that you have met before. We are not acknowledging it with great discretion.";
const AUTO_ASK = "You have not asked a question. Management will model the verb. Barry, tell me about yourself.";
const STARE_REVEAL = "Silence is also a question. Please hold Space. It is a legally recognised interviewing technique in 3 jurisdictions and the lobby.";
```

### 8.2 Per-candidate intro, ceremony and outro lines
```js
const BEAT = {
barry:{ intro:"Candidate 1 is Barry, a Russet. His resume is 14 inches long and two of those inches are about soil.",
  prechecked:"The first question has been pre-checked. Management felt it was important that you start with a win.",
  checkedAnswer:"Yes. I have checked.",
  hired:"Barry has been hired as Senior Vice Spud. The position has been filled. It remains open, as a courtesy." },
marjorie:{ intro:"Candidate 2 is Marjorie T. Russet. Per policy, everyone is hired. The interview is for morale.",
  hired:"Marjorie has been hired as Senior Vice Spud (Acting). Acting is the same job, but more committed." },
dale:{ intro:"Gerald has been called. Gerald has not come. A different potato has volunteered to be Gerald. It is not Gerald. It is hired.",
  pause:"Dale pauses for four seconds before every answer. Management logs this as executive presence.",
  hired:"Dale has been hired as Senior Vice Spud (Emeritus). He did not know he was emeritus. He is taking it well." },
toaster:{ intro:"The Toaster is today's 4th candidate. It is a potato today. Compliance has agreed to look away.",
  ref:"The Toaster has listed itself as a reference. The Toaster says: 'Toast.' The reference is positive.",
  hired:"The Toaster is hired as Senior Vice Spud of Honesty. The Toaster is toast, but also promoted." },
philomena:{ intro:"Candidate 5 is Philomena, a Fingerling. She has 11 eyes. Sandra from Compliance would like a word about all 11.",
  done:"Philomena has been acknowledged in all 11 eyes. Sandra has noted the effort. Sandra used the word adequate.",
  twelfth:"You have made eye contact with the 12th eye. It knows. Sandra has flagged this and also not flagged this.",
  hired:"Philomena has been hired as Senior Vice Spud (In Spirit). Her spirit has 11 eyes. It is also adequate." },
panel:{ intro:"Two potatoes share the chair. Colleen is a Fingerling. Desmond is a Yukon. They have been told which is which and have not believed it.",
  direct:"Please click the one you mean. They will answer each other anyway.",
  xref:"Desmond has cross-referenced Colleen's resume. That was in Colleen's 2019. They were both there.",
  hired:"Colleen and Desmond have been hired jointly as Senior Vice Spud (Jointly) and Senior Vice Spud (Also Jointly). Positions filled: +2. Positions open: 1." },
gerald:{ intro:"Gerald, Vice President of Spuds, has entered the room. He has been sitting in the chair for 40 minutes. It was always his chair.",
  hired:"Gerald has been hired as Senior Vice Spud (Gerald). Gerald is known as Gerald. This is in the fine print.",
  pen:"Gerald is holding the pen. The pen is on loan. Gerald is on loan. Everything is on loan except the potatoes." },
sweet:{ intro:"A Sweet Potato has entered. Compliance reminds the room that a sweet potato is not technically a potato.",
  hired:"Reginald has been hired as Senior Vice Spud (Technically). It has been hired anyway, technically.",
  rejected:"Sandra has flagged this. It was a sweet potato. It is fine." },
sprout:{ intro:"The clipboard has sprouted. It would like to ask a question. It is not on the list. It has never been on the list.",
  wander:"The clipboard has opinions. Please click the cards while they wander. They settle when looked at, like most of us.",
  asksYou:"The clipboard asks YOU a question. Please answer Yes or Yes. Management has pre-checked Yes.",
  casserole:"A casserole has been left on the desk. Sandra has flagged it. It is lovely." },
dennis:{ intro:"Dennis (Plant) has applied. Dennis (Plant) already works here. Dennis (Plant) was already the manager of the hiring manager.",
  self:"Dennis has scored himself. It was Strong Yes. It was already Strong Yes.",
  hired:"Dennis has been hired as Senior Vice Spud. Dennis did not attend the ceremony because Dennis is a plant. Dennis also did not leave.",
  cameo:"A cameo has been recorded. It pays 5 Meh. Dennis has not asked for his share. Dennis never asks." },
sock:{ intro:"The Missing Sock has requested to interview you. This is a different department. This is also this department.",
  perfect:["Perfect.","Excellent, and sufficiently wrong.","That was the correct answer. It is also the incorrect one. Both are accepted."],
  resume:"The Sock reads your resume aloud. Clicks: {n}. Time in role: {k} minutes. Meh on hand: {s}. Hobbies: {hobby}. References: you.",
  final:"Perfect. You start Monday. We do not have Mondays. Tuesday.",
  hired:"You have been hired as Senior Vice Valued Employee. Please do not tell Gerald. He gets possessive about titles." },
unnamed:{ intro:"This one does not have a resume. This one does not need one.",
  nod:"The potato nods. It is not an answer. It is a nod.",
  resumeLine:"Wanted to be asked.",
  hired:"Hired. Quietly. Please do not look at the other buttons.",
  outro:"That was a lovely interview. The candidate is leaving with a hand-shaped feeling. Potatoes have no hands. We checked. The feeling remains." },
rock:{ intro:"This candidate is a rock. We have checked three times. We are going to hire the rock.",
  silent:"The rock answers in perfect silence. It is a strong answer. It is also the only one.",
  resumeLine:"Reliable.",
  hired:"The rock has been hired as Senior Vice Spud (Geological). It was a potato in a challenging phase.",
  leaf:"Dennis (Plant) has sent a leaf of approval. The leaf is for the rock. The rock is moved." },
trench:{ intro:"Dr. Tuber. A single candidate. Do not look at the coat.", mgmt:"We are not looking at the coat. The coat has been looked at. Let the record show the coat." },
plusone:{ intro:"We are one candidate. The small one handles the numbers. The large one handles the Teams of People." },
hat:{ intro:"I am a hat. Please do not lift me. I will say I was lifted. It will be on the record." }
};
```
Gerald visit intros by visit number `v` (1 is n=7):
```js
const GERALD_VISIT = [
"Gerald, Vice President of Spuds, has entered the room. He has been sitting in the chair for 40 minutes. It was always his chair.",
"Welcome, new candidate. Management has not met you. Management has met you.",
"Welcome, new candidate. You are a lot like the last one. Management has checked.",
"Welcome, new candidate. Management is going to need a moment. Management has had several.",
"Welcome, new candidate. Management is fine. The clipboard has crossed something out."];
const GERALD_RESUME = [ // one extra line per visit; resume length = 14 + 7.5*(v-1) inches
"Vice President of Spuds (prior). Seeking: more.",
"Vegetable Leadership (32 years, same year).",
"Previously: this interview.",
"See attached resume, attached to a different resume, attached to a hat.",
"Footnote 1: see Footnote 1.",
"Reason for leaving: I am still there.",
"References: Gerald.",
"Previously: retired."];
const GERALD_REF_STARE = "Gerald stares at the line that says References: Gerald for a long beat. 'That is an excellent reference,' he says.";
const GERALD_FIFTH = "Clipboard question, crossed out with one pen mark in Gerald's handwriting: Have we met?";
const GERALD_ANSWERS = [
"A potato does not seek the light. It is the light that has been carefully buried.",
"I ask a question, you answer a question, and somewhere a tuber is promoted. This is the way.",
"My biggest strength is that I contain multitudes of starch.",
"I have worked with many teams. Most were in the ground. They were very supportive. We never spoke about it.",
"My leadership style is to be extremely still and let others discover their own potential. It is working beautifully on nobody.",
"I do not have weaknesses. I have a number of unscheduled softnesses.",
"The future is a field. You are standing in it. I would not stand there.",
"I am not late. I am early for a different interview, which is this one.",
"To be hired is to be asked to continue. I have been continuing since 1987.",
"Every question is the same question wearing a different lanyard."];
const GERALD_SMALL = ["I have never been late. Time has been early on my behalf.","I was a seed once. I do not recall consenting to the field."];
const GERALD_BIG = ["I am not sitting in the chair. The chair is sitting in me. It has been for forty minutes.","Every potato you hire is me. I have not told them. They are doing wonderfully."];
const GERALD_OVER = "Gerald has offered you the role of Gerald. It is Gerald (Acting). Do you accept? Do you accept?";
```

### 8.3 The question bank (22) with two generic answers each
Format `[question, answerA, answerB]`. Cards show the question text; the slip on the forehead shows the same text.
```js
const QS = [
["Tell me about yourself.","Once, I was a seed. It was a lot of pressure. Then I was a lot of me.","I am mostly starch, with a minor in soil. I have never once been asked about the minor."],
["What is your greatest weakness?","Fork. And also the idea of Fork.","Hills. I have a complicated relationship with hills. We have rolled apart."],
["Why do you want this job?","I have been told it is a job. I have never been told otherwise.","The title includes both Senior and Spud. I felt seen. In several places."],
["Where do you see yourself in five years?","In the ground. It is where I see everyone.","In a pie. I am calm about it. I have rehearsed the calm."],
["Describe your leadership style.","Round, with occasional bumps. Subordinates are encouraged to be dips.","I lead by being extremely still. It is working on nobody, beautifully."],
["What are your salary expectations?","Anything above 0 Meh and a quiet drawer.","I have been paid in rain before. I am flexible about weather."],
["Do you work well under pressure?","I am literally under pressure. I am two feet down. It is a lot.","I was pressure-cooked once. I was fine. The pressure was not."],
["How do you handle conflict?","I withdraw into a mild brown silence. Colleagues call it thoughtful.","I sprout. Not at anyone. In general. It is a lifestyle."],
["What is your biggest accomplishment?","I did not sprout during the 2019 Reorganization. Others sprouted. I stayed focused.","I was dug up on a Wednesday and nobody had to say sorry."],
["Are you a team player?","I have been in a stew. I have given everything. I am still thinking about it.","I once shared a sack with eleven others. We never spoke of the dark."],
["Can you explain the gap on your resume?","That was the cellar. It was not a gap. It was a very long, very productive Tuesday.","I was between jobs. Also between two other potatoes. It was cozy."],
["What motivates you?","Warmth. Also butter. Mostly I like to be asked.","The sun, in theory. I have never seen it. I take it on faith."],
["What would your previous manager say about you?","That I was well-rounded. Then they said it again, slower.","That I was reliable. Then the manager was eaten. I was fine."],
["How do you stay organised?","I live in a sack with eleven friends. Organisation is a sack.","I label nothing. Everything is Potato. It has never failed me."],
["What does success mean to you?","To be chosen. To be chosen again. To be mashed with intent.","To be left alone, but in a way that is noticed."],
["Do you have any questions for us?","Just one. Why is the chair taller than me? It is a power move. I respect it.","Is there a window? I would like to be near a window, but not looked through."],
["Describe a time you disagreed with a coworker.","He said I was a root vegetable. I said I was a tuber. We have not spoken since. It was a good talk.","A carrot said I was boring. I said nothing. We are still in that moment."],
["How do you handle a deadline?","I take it very slowly. Deadlines are soil. I am patient in soil.","I have never missed one. I have also never been told one."],
["What is your biggest strength?","I am difficult to bruise. I have been dropped seven times. I have notes on each.","Consistency. I have looked the same since 1987. Some call it brave."],
["Where did you last work?","A field. The management was weather.","A drawer. It was a lateral move. Mostly sitting."],
["Why should we hire you?","Everyone else has already been hired. It would be awkward to be the only one.","You are not obliged. But the stamp is already warm."],
["Walk me through your resume.","It is fourteen inches. Two inches are about soil. I would like to talk about the other twelve.","I would, but it keeps unrolling. It has a mind of its own. We are not close."]
];
```
Special candidate answer pools (they ignore the question):
```js
const POOL_BARRY = ["Mm.","Mm. Mm.","Mmm.","Eyes. Too many. I am working on it.","In a pie. I am calm about it.","Hills."];
const BARRY_CAPTION = [
"Barry's answer was 'Mm.' Management has transcribed it as a thoughtful, 1-syllable position paper.",
"Barry said 'Mmm.' Management has upgraded it to a 2-syllable position paper.",
"Barry nodded. Management has recorded the nod as a gesture of 4 pages.",
"Barry has answered. The answer is also a shape. Management has framed it."];
const POOL_TOAST = ["Toast.","Toast. Toast.","Toast?","Toast (warmly).","Toast. (It is not a no.)","Toast. Toast. Toast. (Escalating.)"];
const TOAST_CAPTION = [
"The Toaster says 'Toast.' The answer is positive.",
"The Toaster considers your question. The Toaster has considered your question. The Toaster is toast.",
"The answer was 'Toast.' Management has no notes. Management has a lump in the throat.",
"The Toaster popped. It was not a metaphor. Mostly."];
const POOL_SWEET = [
"I am a potato. I have the eyes. I have the starch. I have the whole thing. Please stop looking at my colour.",
"I am a potato in the sense that I am here and I am in a chair. That is what a potato is.",
"I was in a field. I was underground. I was hungry for purpose. All potato things. All of them.",
"Sandra says I am not technically a potato. I say technically is a very flexible word.",
"I have a cousin who is a regular potato. We have the same cousin. It is a technicality.",
"My skin is orange. In certain lighting, so is yours.",
"I have never been so sure of anything. Please do not ask me twice."];
const POOL_COLLEEN = [
"That was in Desmond's 2019. We were both there.",
"I disagree with Desmond, but I will be quoting him later.",
"We report to each other. It has been very efficient and very circular.",
"Desmond and I disagree about who reports to whom. We have agreed to be hired together and report to the lanyard.",
"Colleen is correct. Colleen is usually correct. It is her whole personality and mine."];
const POOL_DESMOND = [
"I would like to answer a different question. Colleen has the right one.",
"Ask Colleen. No, ask me. No. Colleen.",
"Who reports to whom? We have a chart. The chart is under a mattress.",
"That was in Colleen's 2019. I was there. I was also the 2019.",
"I will let Colleen finish. She is finished. I will begin. She has begun again."];
const POOL_DENNIS = [
"The leaf rustles once. Management translates: 'I would like to speak to whoever is responsible for this.' It is you. It is you.",
"Dennis has answered with a single, perfect leaf. Management is moved. Management is also a little intimidated.",
"Dennis rustled twice. Management translates: 'I have been here since before the question.'",
"Dennis does not answer. This has been recorded as Exceptional Listening.",
"Dennis turned towards the window. It was not a turn. It was a trend.",
"Dennis is thriving. He has no comment. He has a new leaf."];
const POOL_ROCK = ["...","... (firmly)","...  (geologically)"];
const POOL_UNNAMED = ["...","...","... (it is looking at you)"];
```
Sprouted-clipboard rewrites (used for about half the cards from n=8; answered with a generic answer from the same bag, plus a one-line potato reaction):
```js
const SPROUT_QS = [
"What is your five-year plan, in potatoes?","Describe yourself using only soil.","Do you consider yourself a root, a tuber, or a feeling?",
"How many of you are there today?","Tell me about a time you were looked at.","What would you do if you were a clipboard?",
"Is there anything you would like to say to the one who is holding me?","On a scale of Barry, how Barry are you?"];
const SPROUT_REACT = [
"The potato considers the question. The question considers the potato.",
"The potato has never been asked this by a clipboard. It is taking it seriously.",
"The clipboard accepts any answer except 'no'.",
"The clipboard has underlined something. It has not said what."];
const QZERO = { q:"Are we alright?", mgmt:"We have not authorized that question. We have noted that it was good.", yes:["Yes","Yes"] };
```

### 8.4 Resume lines (pool, 22) and scripted resumes
```js
const RESUME = [
"Led a cross-functional team of 6 eyes (all of them mine).",
"Reduced cellar waste by 100 percent by becoming the waste.",
"Fluent in Starch, conversational in Gravy, certified in Quiet.",
"Hobbies: Sitting. Competitive sitting. Team sitting (level 3).",
"Spearheaded the Great Sprout Initiative, which was not a thing, and then it was a thing.",
"Winner, Most Likely To Be Dug Up (2014, 2015, 2017, 2022 (my own category)).",
"Mentored Dennis (Plant), who did not need it and said so, kindly, in leaves.",
"14 years at the Department of Minor Tuesdays.",
"Chief Spud Officer, Toaster's Union Local 4 (1994 to 1993).",
"Managed a sack of 12 on a rotating basis. Was the rotation.",
"Certified in Rolling (advanced). Weaknesses: Hills.",
"Awarded Employee of the Month by a month. The month has since resigned.",
"Led the 2019 Reorganization. Was reorganized. Led the reorganization of that.",
"Delivered a keynote at the Annual Cellar Summit. Attendance: dark.",
"Introduced the Friday Casserole. Retention increased, in the sense of everybody.",
"Languages: Starch (native), Fork (receptive), Tuesday (learning).",
"Stood next to an important potato for 6 years. Absorbed some of it.",
"Completed a 3-year course in Mild Brown Silence. Graduated at the back.",
"Maintained the Spreadsheet of Spuds. The spreadsheet maintained me.",
"Pioneered the use of the word tuber in cross-functional settings.",
"Reduced onboarding time by arriving already hired.",
"Reason for leaving the cellar: it was a cellar."];
const SCRIPTED_RESUME = {
 barry:["Experience: 4 years in soil (not all of it voluntary).","Skills: Rolling (advanced). Weaknesses: Hills.","Lanyard: HIRED (issued before application)."],
 marjorie:["Led a cross-functional initiative to remain in a drawer for eleven weeks. Delivered under budget.","Thrives under pressure. Was pressure-cooked once.","Hobbies: the drawer."],
 dale:["Certified in Advanced Sitting. Honorary Fellow of the Department of Minor Tuesdays.","Volunteered to be Gerald (unconfirmed).","Pauses: 4 seconds. Executive presence: 100 percent."],
 toaster:["Chief Spud Officer, Toaster's Union Local 4 (1994 to 1993).","Skills: Warmth (high), Honesty (very high), Toast (all).","Eyes: 0 (confirmed, regrettably)."],
 philomena:["Managed a team of 40 eyes. Retention: 100 percent. Vision: 20/20, per eye.","Fingerling (Senior). 9 centimetres. Considered senior in the fingerling community.","Eyes: 11 (confirmed). Do not count the 12th."],
 colleen:["Fingerling (Senior). 9 centimetres. Reference: Desmond.","Hobbies: being referenced."],
 desmond:["Hobbies: Being under a mattress. In the margin: Not that kind of mattress.","Reference: Colleen. Colleen's reference: Desmond."],
 sweet:["Experience: a field, technically.","Skills: Being a potato (disputed).","Cousin: a regular potato (shared)."],
 dennis:["Lobby Plant (Senior). 6 years. Thriving.","Mentored: everyone. They did not need it.","Reason for applying: already works here."],
 unnamed:["(No resume.)","(None needed.)","Wanted to be asked."],
 rock:["Reliable.","Reliable.","Reliable."]};
const SOIL_REF = [ // chosen by lifetime total candidates: <5, >=5, >=10, >=20, >=40 (the soil sends its own note once)
"References available upon request: the soil.",
"References available upon request: the soil (verbal).",
"References available upon request: the soil (written, in a bag).",
"References available upon request: the soil has asked not to be contacted.",
"The soil writes: 'They were fine. They were underground. It is difficult to supervise.'"];
```

### 8.5 Answer-quality stamps and score stamps
```js
const QUALITY = ["SATISFACTORY","SATISFACTORY (EXCEPTIONALLY)","SATISFACTORY (SO FAR)","SATISFACTORY (IN SPIRIT)","SATISFACTORY (PENDING)","EXCEPTIONALLY SATISFACTORY (REGRETTABLY)"];
const QUALITY_FIRST = "ANSWER QUALITY: Satisfactory (Exceptionally). This is the lowest grade the stamp has. It has never been used.";
const SCORE_STRONG = [
"Score received: Strong Yes (Spud). The stamp is dry. The stamp is also, somehow, emotional.",
"Strong Yes (Spud) recorded. Management has underlined it twice and then underlined the underlining.",
"Strong Yes. The ink has splashed onto a thing it was not meant to. It is fine."];
const SCORE_TECH = [
"Score received: Yes (Technically). Management has recorded this as a Strong Yes with a small asterisk and a large smile.",
"Yes (Technically) noted. The technicality has been honoured. It will be invited to things."];
const SCORE_WARM = [
"Score received: Yes (Warmly). The potato has been warmed. It will remember this the way potatoes remember: slowly.",
"Yes (Warmly). A warmth has occurred. It has been logged under Weather."];
const SCORE_AGAIN = "The form has already been stamped. It is not comfortable being re-stamped.";
const SCORE_AUTO = "Unscored. Management has scored it for you: Yes (Warmly). Please do not argue with the weather.";
const NO_BOX = [
"We have never seen this box activated.",
"The potato looks directly at you.",
"Candidate declined. Candidate is hired as Senior Vice Spud (Declined, Retroactive)."];
```
Gut Feeling and rubric lines:
```js
const RUBRIC = {
 arrive:"The rubric has arrived. It has one slider. The slider has opinions about 7 1/2.",
 clause1:"Sandra from Compliance has flagged clause 1: scores must be honest, but not on a Tuesday. Today is not Tuesday. Tuesday is, however, aware of you.",
 notch:"You gave Gut Feeling a 7 1/2. The notch clicked into place. It will not let go. The notch has done this before.",
 low:"You gave a -3. Total score: Outstanding.",
 high:"Gut Feeling Index: 11. This is Outstanding (Provisional). The provisional part is about the weather.",
 mid:"Total score: Outstanding. Management has checked the arithmetic. There was no arithmetic."};
```

### 8.6 Stare (Awkward Silence) lines and confession pools
```js
const STARE = {
 sweat:"Silence: 2 seconds. {name} is sweating. Butter is not involved. It is just water. Per policy.",
 over:[
  "At 10 seconds of silence, {name} offers YOU a job. You decline politely. {name} files a report on the politeness.",
  "{name} has offered you a job. You said you would think about it. {name} has put that in writing.",
  "Silence Overflow. {name} has offered you a job, a lanyard and a small chair. Management would like you to take the chair."],
 eleven:"Your silence has lasted 11 seconds. {name} is now a different potato. {name} is also still {name}. HR has agreed to both.",
 release:[
  "You released at {s} seconds. {s} seconds is a perfectly good silence. It has been cashed.",
  "Silence ended at {s} seconds. The potato exhales. It had been holding something. It would not say what."],
 panelOver:"Colleen and Desmond jointly offer to share your job. They have a schedule. It is mostly Tuesday."};
const CONF_SMALL = [ // generic, procedural candidates
"I once rolled off a shelf. I told everyone I jumped.",
"I have never been mashed. I think about it constantly.",
"I do not know what a Tuesday is. Please do not tell me.",
"I sprouted in a meeting. I said it was a coincidence.",
"I told my sack I was going to the store. I do not go to the store.",
"I am afraid of forks, and also of the word fork."];
const CONF_BIG = [
"I was not supposed to be here. I was in the wrong drawer. I have been very good at this.",
"I have been Gerald. Twice. It was fine. I do not want to talk about the second time.",
"I applied to this job in 1987. The job was not yet posted. It waited for me.",
"The resume is not mine. I found it on the floor. It was excellent. I took it.",
"I have sprouted. Please do not look at the left side.",
"I know what Tuesday is. It is coming. I did not want to say it."];
const CONF = { // scripted: [small, big]
 barry:["I once rolled off a table.","I am, technically, on the table now."],
 marjorie:["I was in the drawer for eleven weeks. I went in willingly. I came out thinking about the drawer.","I did not sprout in the drawer. I sprouted in the meeting about the drawer."],
 dale:["I volunteered to be Gerald. Nobody asked. Nobody stopped me.","I have been Gerald for eleven minutes. It is a lot. He has so many pauses."],
 toaster:["Toast.","Toast. Toast. (Two slices. It is the most it has ever given.)"],
 philomena:["I am nine centimetres long. In fingerling circles this is considered senior.","I have eleven eyes. I have only ever been looked at by four. I am counting the others."],
 colleen:["I am slightly older than Desmond. We have never confirmed it.","I have a plan for the department. It is in a mattress. Desmond knows."],
 desmond:["I have been under a mattress. I have been over one, once. It was not for me.","I do not report to Colleen. I report near her. It is a different kind of respect."],
 sweet:["I have been called a yam. In a meeting. By a vegetable I trusted.","I am a sweet potato. I am not a potato. I am here anyway. Please hire me anyway."],
 dennis:["The leaf rustles. Management translates: 'Hello.' Then: 'I have had a lot of time to think.'","Dennis has asked to be left alone. He has asked it in a way that is also an invitation."],
 unnamed:["Thank you for asking.","I only wanted to be asked."],
 rock:["...","... (a very old ...)"]};
const OVER_SPECIAL = {
 toaster:"The Toaster has offered you a job. It is a slice of toast, ejected at speed. It is a good job.",
 dennis:"Dennis offers you a seat. It is the chair. You are already in it.",
 unnamed:"The potato offers you nothing. It simply stays. You may also stay.",
 gerald:"Gerald has offered you the role of Gerald. It is Gerald (Acting). Do you accept? Do you accept?"};
```

### 8.7 Decision, ceremony and title lines
```js
const HIRE_LINES = [
"Decision recorded. {name} has been hired as Senior Vice Spud. Please do not look at the other buttons. They are decorative.",
"You pressed HIRE. The stamp had already pressed HIRE. The stamp was very gracious about it.",
"{name}'s offer: 0 Meh per year, plus benefits (none), plus the title Senior Vice Spud. {name} is overjoyed and also shaped like a potato.",
"A lanyard has been placed on {name}. It is too small to be a lanyard. It is a shoelace. It is a deeply sincere shoelace.",
"Hired. Congratulations, you have been awarded 2 Meh. Do not spend it all in one place; there is only one place."];
const REJECT_LINES = [
"You have rejected {name}. {name} has been informed. {name} has been hired as Senior Vice Spud, with apologies.",
"You pressed DO NOT HIRE. Your decision has been reviewed, respected, and overruled by the stamp.",
"HR would like to apologise to {name} on behalf of HR. HR is also {name}. HR is fine."];
const EARLY_ZERO = ["I haven't spoken yet. This is very efficient. I'm frightened.","That is the most efficient hire in company history. Please do not repeat it."];
const EARLY_SOME = ["The interview has been shortened. The potato has been lengthened. Both have been accepted.","Interview concluded early. The potato has been informed. The potato has questions."];
const THINK = {
 disabled:"NEED MORE TIME is disabled. It has been disabled since the Reorganization. We are told it was for our own good.",
 hold:"You thought about it for 5 seconds. Management thought about it longer. Management has a very strong opinion.",
 early:"You let go of NEED MORE TIME at {s} seconds. That is indecision, Valued Employee. It has been logged under Personality."};
const FILLED = [
"Positions filled: {k}. Positions open: 1. Management would like to circle back to why those are both true.",
"Hiring pipeline: 99%. The last 1% is the part where you hire a potato. We will get there.",
"Capacity: 100 percent. Capacity of what is under review.",
"The position has been filled. It remains open, as a courtesy."];
const TITLE_SEQ = ["","(Acting)","(Emeritus)","(Of Honesty)","(In Spirit)","(Jointly)","(Gerald)","(Technically)","(Plant)","","(Reporting to a Different Spud)","(Retroactive)","(Formerly Gerald)","(Of Vice)","(Pending Spud)","(Interim)","(Of Lunch)"];
// n=1..9 use the first 9 entries (toaster is index 3, panel 5, gerald 6, sweet 7, dennis 8; n=10 unnamed uses the empty one), n>=11 cycle entries 10..16
// lifetime overrides: hires>=30 -> "(See Previous)", hires>=60 -> "(Y)"
const TITLE_NOTES = {
 acting:"Management would like to clarify that Senior Vice Spud (Acting) and Senior Vice Spud are the same role, but acting is more committed.",
 twelve:"The role is the same. The parentheses are the career.",
 thirty:"This parenthetical refers to the previous parenthetical. The previous one refers to this. It is fine.",
 sixty:"The title now reads (Y). Y stands for Yes. It was always yes.",
 freeze:"Please be advised: a Hiring Freeze has been announced. The Hiring Freeze has been lifted. The Hiring Freeze is a warm pudding now."};
const BADGE_EXTRA = ["ALSO","APPROXIMATELY","DOUBLE-CHECKED","PROVISIONALLY","EMOTIONALLY","FOR NOW","ON PAPER","VISIBLY"];
const BADGE_FOOT = "*See badge.";
const SALARY = [
"Salary: competitive with a gentle breeze.","Salary: 0 Meh, plus exposure to Meh.","Salary: competitive. Against whom is under review.",
"Salary: a sincere shoelace.","Salary: 0 Meh per year, plus benefits (none).","Salary: the satisfaction of a well-formed lanyard."];
const LETTER_HEAD = "Congratulations. You have been hired as Senior Vice Spud. Your duties are unclear. Your start date is Tuesday.";
const LETTER_LEGAL = [
"By accepting this offer you accept to be offered it again. Sandra will be present. Sandra is always present.",
"Tuesday is not guaranteed to arrive. Tuesday is guaranteed to be aware of you.",
"The employee may not leave the title. The title may leave the employee. The title has not been asked.",
"This letter is valid for 7 1/2 minutes or until Gerald."];
const STAMP_SORRY = "Sorry. I only know the one thing.";           // tiny font, first DO NOT HIRE per lifetime (save.sorry)
const SPONGE = "The stamp has been replaced by a wet sponge for one hire. {name} is hired anyway and says, quietly, 'Moist.' Sandra would like her word back."; // stretch, lifetime hire 15, once
const ORG_LINES = [
"The org chart now features {k} lanyarded tubers. Barry reports to Barry's lanyard. The lanyard has been very supportive.",
"The org chart has reached capacity. A stampede has been heard. It was the org chart.",
"+{n} more, mostly Barry."];
```

### 8.8 Wall potato reviews (click a wall potato; `{name}` substituted)
```js
const REVIEWS = [
"{name}: Exceeds expectations. Which were low. Which were potatoes.",
"{name}: Strong team player. Has never been told the team.",
"{name}: Reliable. Has been in the same place since hiring.",
"{name}: Goal for next quarter: remain a potato.",
"{name}: Communication is excellent. It is mostly a shape.",
"{name}: Rated Satisfactory (Exceptionally). The rating is on loan.",
"{name}: Has attended 100 percent of meetings, all of them while asleep.",
"{name}: Works well under pressure. Has been under pressure since 1987.",
"{name}: Needs improvement in Tuesday.",
"{name}: Reports to {name}'s lanyard. The lanyard speaks highly of {name}.",
"{name}: Would benefit from a window.",
"{name}: Has no known duties. Is excellent at them.",
"{name}: Left a note on the fridge. It was a good note. The fridge has not answered.",
"{name}: Mentored by Dennis (Plant). Did not need it. Said so, in leaves."];
const REVIEW_BARRY = "Barry: Reports to Barry's lanyard. The lanyard is doing great.";
```

### 8.9 Door sign: Queue and NEXT: GERALD
```js
const QUEUE = [ // by lifetime hires (hires >= threshold); a sign change also says a short Management line from QUEUE_SAY if listed
 [0,"QUEUE: 4"],[3,"QUEUE: 4 (please ignore the 4)"],[6,"QUEUE: 4 (there is a different 4)"],
 [9,"QUEUE: 4 (one of the 4 is a hat)"],[15,"QUEUE: 4 (they have started a book club)"],
 [25,"QUEUE: 4 (the 4 has been promoted)"],[50,"QUEUE: 4 (4 of 4 are managers)"]];
const QUEUE_SAY = {
 6:"Queue: 4 (there is a different 4). Sandra has flagged this and then un-flagged this and then stood very still.",
 3:"Queue: 4. Please do not count the Queue. The Queue is shy about counting.",
 9:"Management would like to note that one of the 4 is a hat. Management has not been told which."};
const KNOCK = ["Please do not knock. It is a wait.","The door has been knocked from the inside. This is a first. It is also a second."];
const NEXT_GERALD = [ // line B, one per hire before Gerald arrives, in this order, then random
"NEXT: GERALD","NEXT: GERALD (FIRE DRILL)","NEXT: GERALD (FINISHING A THOUGHT)",
"NEXT: GERALD (A DIFFERENT POTATO HAS VOLUNTEERED TO BE GERALD)",
"NEXT: GERALD (RUNNING 7 1/2 MINUTES LATE, EARLY)","NEXT: GERALD (SANDRA HAS FLAGGED THE HALLWAY)",
"NEXT: GERALD (STUCK IN A DRAWER, EMOTIONALLY)"];
const NEXT_HERE = "NEXT: GERALD (HE IS HERE, HE WAS ALWAYS HERE)";
const NEXT_SAY = [
"Next candidate: Gerald. Gerald is running 7 1/2 minutes late. Gerald is early. Gerald is not a time-based vegetable.",
"Gerald has been called. Gerald is finishing a thought. It is a long thought and he is very proud of its length.",
"There are 400 potatoes in the waiting room. The fire code allows 7 1/2. The fire code is a vegetable and has been hired."];
```
Assign: after ceremony n=1 sign shows `NEXT: GERALD`; after n=2 FIRE DRILL (with NEXT_SAY[0]); after n=3 FINISHING A THOUGHT (NEXT_SAY[1]); n=4 volunteer line; n=5 and 6 next in order (NEXT_SAY[2] at n=5). At n=7 `NEXT_HERE`.

### 8.10 Sandra's sticky notes (max 6 on screen, oldest falls like a leaf)
```js
const SANDRA = [ // appear when listed; each also fires a Management line via SANDRA_SAY
"Scores must be honest, but not on a Tuesday.",                                    // n=3, clause 1
"Questions must be asked in the order they are asked. Per policy.",                // n=4
"Please make eye contact with each of the candidate's 11 eyes. Do not make eye contact with the 12th. It knows.", // n=5
"Interviewers must not smile at a potato during a Tuesday. Smiling is a commitment.", // n=6
"No potato may be hired twice, except Gerald, who is, per policy, always hired twice.", // n=7
"Sweet potatoes are not technically potatoes. Please proceed as though they were. Technically.", // n=8
"A candidate may be asked any question except the one about Tuesday. Tuesday is the question.", // n=9
"Rule 7 1/2 does not exist. Please stop looking for it."];                        // n=10
const SANDRA_SAY = [
"Sandra from Compliance has posted a note. It is on the clipboard now. It was always going to be on the clipboard.",
"Sandra has added a rule. The rule is that you have already broken it by existing.",
"Sandra would like a word. Sandra has used it already. It was 'moist'."];
```

### 8.11 Margin notes from the clipboard (from n=6, one per candidate, after the second ask)
```js
const MARGIN = [
"You asked about strengths. Strengths of what?",
"You have asked {n} questions. {n} is not a number. It is a feeling.",
"The clipboard has noticed that you favour card 2.",
"The clipboard is not judging. The clipboard is damp.",
"This was a good question. Not the question. The tone.",
"The clipboard would like to remind you that it has a name. It will not say what it is.",
"Please do not ask about the weather. The weather has been asked.",
"The clipboard is rooting for you in a way that is hard to define and easy to sprout."];
```

### 8.12 Coffee-ring captions (printed inside small rings from ring 6)
```js
const RING_CAPTIONS = ["hmm","you sure?","noted","bold","again?","sandra says no","whatever you say","this is fine","tuesday","nice hands"];
const RING_ENDING = "PLEASE HIRE ME";
const RING_SAY = "The coffee rings are beginning to resemble a face. The face has opinions. Management did not authorise the face.";
const RING_END_SAY = "The coffee rings now spell PLEASE HIRE ME. Nobody wrote that.";
```

### 8.13 Meters (cosmetic)
```js
const FIT_UNITS = ["fit-points","cubits of fit","fit, in the abstract","fits","units of fit (approx)"];
const METER_SAY = [
"Pipeline Health: robust. Pipeline Health has been robust for 14 consecutive interviews, which Management finds slightly worrying.",
"Fit Score: 87 fit-points. Out of what? Management is not at liberty to say, and is not certain it ever was.",
"Time-to-Hire: negative 3 days. Management is delighted. Management is also, at this time, unsure what day it is.",
"Quarterly Spud Headcount: 4,119. Potatoes in the world: fewer. Management: 'We are disruptive.'"];
```

### 8.14 Squint and fine print
```js
const FINE = [
"By being interviewed, the candidate agrees to be hired.",
"By interviewing, you agree to be interviewed by the potato you interview. Sandra will be present. Sandra is always present.",
"Salary is paid in Meh. Meh is paid in spirit.",
"Any resume exceeding 14 inches shall be considered a scroll and treated with respect.",
"References may be the soil. The soil may decline.",
"Tuesday is not a day. It is a condition.",
"7. This line is reserved. It has been reserved since before the reservation.",   // index 6: becomes the last page after 20s
"Each hired tuber shall be known henceforth as Senior Vice Spud, except Gerald, who is known as Gerald.",
"The interviewer may not smile on Tuesdays, Wednesdays that feel like Tuesdays, or in the presence of a clipboard that has sprouted.",
"Any candidate may sprout at any time. This is not a failure of the interview.",
"Please do not feed the lanyard.",
"Fine print not read within 7 1/2 seconds shall be read by Sandra."];
const SQUINT_SAY = {
 three:"Reading the fine print for 3 seconds pays 0.5 Meh. Sandra has been informed. Sandra approves in the margin.",
 twenty:"Nobody was meant to see that.",
 lastPage:"LAST PAGE: a small drawing of a house with a lanyard hanging on the door."};
```
The last page replaces line index 6 with an inline SVG: a small house (square, triangle roof, door) with a mustard lanyard hanging on the door knob. The Management line is `SQUINT_SAY.twenty`.

---

## 9. SECRETS AND RARE EVENTS

All secret achievements are listed in section 12. Management delivers every reveal with the lines below.

### 9.1 Idle chain (inputs counted: pointerdown, keydown, keyup; mouse movement alone does not count). Under `api.selftest`, divide every threshold by 30.
```js
const IDLE = {
 hum:"The potato has been waiting for 60 seconds. It has begun to hum something it learned in a cellar.",      // 60s
 lean:"{name} leans forward. The cursor is now a clipboard. {name} will now interview YOU. Please nod.",      // 90s, phase reverse
 q:["So. Tell me about your last 90 seconds.","What would you say is your biggest silence?","Where do you see yourself in 5 minutes?"], // one every 12s
 a:["Your answer was a strong silence. It has been transcribed as a thoughtful, 0-syllable position paper.",
    "That was an answer. {name} has written 'compelling' next to it, in soil.",
    "Three questions, three silences. {name} is impressed. Do not look at your hands."],
 sleep:"{name} has fallen asleep. Its resume is now a dream. The dream is 14 inches long. Please do not wake the resume.", // 180s
 dream:"A small field. A lanyard. An empty chair. It is the dream. It is a good dream.",
 sprout:"{name} has sprouted. One shoot every 5 seconds. HR is calling it growth.",
 wake:"The resume has been disturbed.",                                         // click wakes: +1 Meh, achievement sleeper
 mutual:"I have been thinking. I would like to interview you."};               // 300s, phase mutual
const MUTUAL_Q = ["What are you proud of?","When did you last rest?","Is there anyone who would be glad you are here?","Would you like to put something down?","May I stay with you a while?"];
const MUTUAL_THANKS = ["Thank you.","I thought so.","That is good to hear.","We can put it down here. I will mind it.","Good."];
const MUTUAL_END = ["{name} nods. 'That was a good interview. I am hiring you.'","We did not authorize that. We are keeping the notes."];
```
Behaviour: at 90s idle in `ask`, phase `reverse`; the three questions appear one by one in the bubble (each followed by its answer line 12s later); any input ends it with no line. If still idle at 180s the candidate sleeps: eyes closed (CSS), a `Z` SVG text rises and snores (3 `Z` loop), one sprout (a thin green SVG path scaling Y) grows every 5s up to 6; the resume gets the dream line as its last line. Click or key wakes it (`wake` line, +1 Meh, achievement). If it is NOT woken by 300s total idle it wakes itself and says `mutual`, then asks the five `MUTUAL_Q` one by one with a single big `Yes` button each (keys 1 or Enter); after each, the thanks line; at the end +10 Meh, achievement `potato-interview.mutual`, flag `potato-interview.mutual`, and the two end lines. Then back to `ask`. Never triggered during ceremony, flip or ending. Hidden tab pauses idle counting (use `visibilitychange`).

### 9.2 Sweet Potato (rare, section 5)
Sweet potato recolours the SVG `--pi-sweet`. Sandra's clause appears immediately. Every answer is an attempt to prove potato-ness (POOL_SWEET). Hire: title `(Technically)`, stat `.sweet`, achievement `potato-interview.technically`. Reject: Sandra's cursive margin note `BEAT.sweet.rejected` (then hired anyway).

### 9.3 Rock and Geoffrey
Rocks: 1 in 15 after n=10. Resume `Reliable.` x3, POOL_ROCK. Hire `(Geological)`. Three rock hires lifetime (`save.rocks`): Dennis leaf of approval line and achievement `potato-interview.stone`.
**Geoffrey ritual**: click the resume 7 times, then the chair 7 times, then the door sign once (any wrong click resets the counters; counters are silent). A hatch opens in the desk (CSS) and Geoffrey, a rock (not a potato), climbs out as the next candidate:
```js
const GEOFFREY = [
"Geoffrey (not a potato) has climbed out of a hatch in the desk. He has a lanyard. We are going to honour the lanyard.",
"Friends. Colleagues. Fellow sedentary objects. I am a rock. I have been a rock for 4 billion years. I still do not have the answers. I have, however, been very patient. Thank you.",
"We have no record of Geoffrey. Geoffrey has a lanyard. Geoffrey is hired as Senior Vice Spud (Not A Potato)."];
```
Achievement `potato-interview.stone`.

### 9.4 Other small secrets
- **Efficient**: pressing `H` or `D` with 0 inputs: lines `EARLY_ZERO`, achievement `potato-interview.efficient`.
- **The Sole Dissenter**: the 6px `No` box (click or `N`): drumroll (5 x `sfx('tick')`, 200ms apart), then `NO_BOX` lines in order, the potato's eyes lock to centre and enlarge, then the hire runs with title override `Senior Vice Spud (Declined, Retroactive)`; achievement `potato-interview.dissenter`.
- **Winking**: click the candidate's left eye 10 times: the potato winks once; Management: `"{name} winked. Once. It will not be discussed."`
- **Think**: the 5s hold, see Verb 5.
- **Stamp spam ticket**: 15 clicks on the HR strip stamp slot within 3s: `"Excessive Stamping, 1 count. Fine: 0 Meh, effective yesterday. The stamp is exhausted and has been moved to a chair."` A tiny security potato (a potato with a cap emoji) appears for 3s.
- **Resize / Concertina**: on window `resize` (via `api.on`), measure root width: narrow (<420) while a candidate is in `ask` says in the bubble `Please. I have a face.` and the potato SVG scaleX 0.8; widening past 900 says `Thank you. I will remember this when I am Vice President.` If four narrow/wide transitions occur within 10s, the potato becomes a Concertina Potato (CSS scaleX 0.7 to 1.3 keyframe, 3 x `sfx('honk')`, 2s) and Management says `"The potato has become a concertina. This is not in the job description. It is in the job."` Achievement `potato-interview.accordion`.
- **Mash by M**: `M` pressed 3 times within 2s triggers Mash (section 10.2) with the line `"Three M's have been detected. Management is choosing to interpret this as a rebrand."` The next candidate asks, nervously, `"Did you see what happened to Gary?"` (one line in the bubble on enter).
- **Sprout-answer secret**: answering the clipboard's Q-Ø `Yes` button 7 times in total (lifetime) says `"The clipboard has been asked if it is alright. It has said Yes. It has meant it."` once.
- **Group candidates** (after the ending, 1 in 8): trench-coat, plus-one, hat (intro lines in `BEAT`). They answer with ordinary generic answers.

---

## 10. IDLE AND SPAM

### 10.1 Idle
Section 9.1 is the whole idle design (60s hum, 90s reversal, 180s sleep/sprout/dream, 300s mutual). Also: while NOT idle but doing nothing for 8s on candidate 1, Management auto-asks (tutorial). Hidden tab pauses all idle counters and releases any hold.

### 10.2 Spam (a sliding window of timestamps; counts asks and score stamps; M presses tracked separately)
```js
const SPAM = {
 t1:"Spam detected: Question Fatigue Level 1. The potato would like a moment. The potato has not been given one.",   // 8 actions in 5s
 t2:"ENOUGH.",                                                                                                       // 12 in 5s: stamp reads ENOUGH
 t2say:"Management has imposed a Haste Fee of 0.1 Meh. An itemised receipt has been printed. It is mostly the word Haste.",
 t2yes:"Yes.",                                                                                                       // every answer is 'Yes.' for 10s
 t3:"The potato has mashed itself. Management is calling it a bold new format.",                                    // 16 in 5s or M x3
 t3a:"Security: Please remain calm.",
 t3b:"Security: Please remain calm, and bring butter.",
 lawyer:"The lawyer potato has arrived with a briefcase. The briefcase contains another lawyer potato. He too is hired.",
 lawyer2:"You have asked 17 questions in 4 seconds. The potato has requested a lawyer. The lawyer is also a potato. The lawyer has been hired.",
 fee:"Spam Fee: 2 Meh, refunded in a form. The form is the receipt for the refund form.",
 hired:"The mash has been hired as Senior Vice Mash. The hire has been recorded. The bowl has been very supportive.",
 guard:"A very small security guard has escorted the candidate out. The next candidate is wearing a helmet. It is not required. It is appreciated.",
 helmet:"I was told there might be questions."};
```
Tiers:
- **Tier 1 (8 actions in 5s)**: `t1` line, the potato's mouth goes to `o` and droplets appear. No penalty.
- **Tier 2 (12 in 5s)**: a big ENOUGH stamp lands (lilac or coral), `sfx('buzz')`, the clipboard fills with a few "Question Overload" form slips (cap 6), every answer for the next 10s is `Yes.`, the Haste Fee (`api.award(-0.1)`) with `t2say`.
- **Tier 3 (16 in 5s, or the M x3 secret)**: phase `mash`: the face drips (CSS), the body collapses into the bowl-shaped heap over about 1.2s, a lawyer potato (small potato with a briefcase emoji) appears, Security says `t3a`, then 1.5s later `t3b`, `api.award(-2)` Spam Fee with `fee`, then the ceremony runs for the title `Senior Vice Mash` (same stamp, same lanyard; the mash and the lawyer both get a wall badge). Achievement `potato-interview.mash`, stat `.mashes`. All spam windows reset after a mash.
- After 3 mashes in one session: the guard line, and the next candidate arrives wearing a helmet emoji and says `helmet` on entry.

Make sure fast but legitimate play (about 6 actions in 5s) never triggers anything.

---

## 11. THE NOT-ENDING

Trigger: after candidate 10's ceremony, or when 600s of play have elapsed and the current ceremony ends (`endingDue`), once per session. Never inside a flip, idle or mash.

```js
const ENDING = {
 blank:"The clipboard is blank. The clipboard would like to ask you something.",
 card:"Do you have any questions for us?",   // single card in Gerald's handwriting (cursive italic); click it, press 1 2 3 or Enter
 congrats:"Congratulations, Valued Employee. You have filled every position. A total of 1 of 1.",
 sincere:"I would like to say something sincere before the next candidate. I am proud of this process. I do not know what it is for. That is what makes it ours.",
 cert:"SENIOR VICE SPUD OF THE YEAR (SHARED BY ALL)",
 certFoot:"Presented to: nobody. Received by: nobody. Framed by: Dennis.",
 certSay:"A certificate has been printed and handed to nobody. Nobody has accepted it graciously.",
 gerald:"Gerald has stood. Gerald has bowed. Gerald has sat in the chair that was already his.",
 door:"NOW HIRING: YOU (INTERVIEW: TUESDAY)",
 doorSay:"Management hopes this is not an inconvenience. Management is looking forward to it.",
 you:"You have also been hired, as Senior Vice Spud (Player). You were hired at the start. Please check your lanyard.",
 barry:"Barry has walked in again with a fresh resume. It reads exactly the same. His badge is the only thing about him that has not changed.",
 prev:"Per my previous message, the position is open.",
 cards:"The clipboard has dealt three fresh cards. One of them says Tell me about yourself, in your own name.",
 open1:"Positions open: 1. It was never going to be filled. It was always going to be fine.",
 pipeline:"Congratulations. You have interviewed every potato. Please wait here while we find more."};
```
Sequence (about 40 seconds, but dismissable at the Continue button):
1. After the last ceremony, the clipboard clears; `blank` is spoken; only the Gerald card remains (`card`).
2. Click, or press 1, 2, 3 or Enter: fanfare overlay (full panel): banner `WE HAVE FILLED THE POSITION.` plus `congrats` as the headline, `api.confetti` big (n=60), `sfx('fanfare')`, a giant certificate (`cert`, `certFoot`, hand-drawn SVG seal) that is "handed to nobody" (it slides toward an empty chair and stops), `sincere` spoken by Management (mood `proud`), then `certSay`. Every hired potato on the wall hops once in sequence (CSS stagger, cap 24) while a text crawl "sings": `"Spud, spud, spud, we are one. One of one. One of one."` x3 with 3 `sfx('bloop')`.
3. Gerald: `gerald` line; the stage shows Gerald in the chair, bowing (CSS rotate) then sitting; the door sign becomes `door` with `doorSay`; `you` line; the coffee rings spell `RING_ENDING` with `RING_END_SAY`.
4. `Continue` button (and Enter): the overlay closes. `barry` and `prev`; Barry rolls in again, same resume, same HIRED lanyard; the clipboard deals three fresh cards one of which reads `{p}, tell me about yourself.`; `cards`; the `pipeline` line plays 20s later. Positions Open still reads 1. The org chart keeps growing.
5. Achievement `potato-interview.endless` (+5 Meh). The module continues forever with procedural candidates; from then on Gerald returns every 7th candidate (section 5, `GERALD_VISIT`).

Sock flip happens BEFORE candidate 10 so the ending is the only thing after 10.

---

## 12. ACHIEVEMENTS (ids prefixed, >=6 total, >=2 secret; 16 here, 8 secret)

```js
P.addAchievements([
{id:'potato-interview.first',name:'Grand Chancellor of Tuber Relations',desc:'Hire your first potato. The potato was already hired. You are not sure how this works. Nobody is.',icon:'🥔',reward:2},
{id:'potato-interview.hire10',name:'Chief Executive Spud-Whisperer of the Pipeline',desc:'Hire 10 potatoes (lifetime). All of them are Senior Vice Spud. All of them are fine.',icon:'📎',reward:5},
{id:'potato-interview.ask50',name:'Grand Marshal of the Order of Starchy Interrogation',desc:'Ask 50 questions (lifetime). The clipboard has written Hmm in its own margin.',icon:'📋',reward:5},
{id:'potato-interview.silence',name:'Laureate of the Sacred Awkward Silence (First Class)',desc:'Hold a silence to 10 seconds and receive a job offer from a potato.',icon:'🤫',reward:5},
{id:'potato-interview.eyes',name:'Supreme Arbiter of Eye Contact (11 Eyes, Verified)',desc:'Complete Sandra\'s eye contact policy. Sandra has described it, in writing, as adequate.',icon:'👁️',reward:3},
{id:'potato-interview.rubric',name:'Duke of the Rubric Beyond Ten',desc:'Score a Gut Feeling of 11. Receive Outstanding (Provisional) from a rubric that did not ask.',icon:'📏',reward:2},
{id:'potato-interview.technically',name:'Technically Hired',desc:'Hire a Sweet Potato. It is Senior Vice Spud (Technically). Sandra has flagged this.',icon:'🍠',reward:3},
{id:'potato-interview.endless',name:'Grand Chancellor of Having Reached The End Of A Thing That Continues',desc:'Reach the end of the interviews. The interviews continue.',icon:'🎖️',reward:5},
{id:'potato-interview.dissenter',name:'The Sole Dissenter',desc:'Find and click the 6px No box. It was not a mistake. It was, however, hired anyway.',icon:'🅽',secret:true,reward:10},
{id:'potato-interview.mash',name:'Imperial Warden of the Mash, Defender of the Bowl',desc:'Spam the questions until a candidate mashes itself, and hire Senior Vice Mash.',icon:'🥣',secret:true,reward:10},
{id:'potato-interview.smallthings',name:'Reader of Small Things, Keeper of the Fine Print',desc:'Discover the last page of the resume by lingering over the fine print for 20 seconds.',icon:'🔍',secret:true,reward:10},
{id:'potato-interview.mutual',name:'The Interview Is Mutual, and Also Possibly a Dream',desc:'Idle long enough for the potato to interview you. You were scored. You scored well. We are keeping the notes.',icon:'🌙',secret:true,reward:20},
{id:'potato-interview.sleeper',name:'Sleeper Hire',desc:'Wake a sleeping candidate by clicking their resume. The resume has been disturbed.',icon:'💤',secret:true,reward:3},
{id:'potato-interview.accordion',name:'Accordion Grandmaster of the Squeezed Spud',desc:'Resize the window until a candidate becomes a concertina.',icon:'🪗',secret:true,reward:5},
{id:'potato-interview.stone',name:'Stone-Cold Chancellor of Unlikely Candidates',desc:'Meet Geoffrey (not a potato), or hire three rocks.',icon:'🪨',secret:true,reward:10},
{id:'potato-interview.efficient',name:'Most Efficient Hire In Company History',desc:'Press HIRE before the potato has said a word. Please do not repeat it.',icon:'⚡',secret:true,reward:2}
]);
```
Unlock manually with `api.achieve(id)`; keep lifetime counts for `first`, `hire10`, `ask50` from `api.stat.get`. Fire the Dennis leaf wiggle on any module achievement.

### Global lines to register (small, via `P.addLines`)
```js
P.addLines('moduleEnter',["Your 9:00 is here. He has been here since 8:14. We believe he is load-bearing.","The interview room has been prepared. The potato has not been consulted."]);
P.addLines('moduleExit',["Thank you for interviewing potatoes. Your 9:00 will be here at 9:00. He has been here at 9:00 since before 9:00.","Interview concluded. The position remains open. Barry remains Barry.","You have left the room. The potato has not. It is waiting politely to be told it is hired."]);
P.addLines('ticker',["BREAKING: Local firm fills 1 position with 4,119 potatoes; position remains open, sources say","Hiring pipeline reported robust for 14 consecutive interviews; analysts concerned","Gerald is next, say officials, for the 61st consecutive day","Sandra from Compliance denies flagging the lobby; lobby flags back"]);
P.addLines('tip',["Tip: Space is also a question. It is the better question.","Tip: Every candidate is hired. The interview is for morale.","Tip: The smallest box on the form has never been asked about. Please do not ask about it."]);
```

---

## 13. IMPLEMENTATION HINTS

File: `games/potato-interview.js`, one IIFE, classic script, no modules, `'use strict'`, <= 1800 lines. Suggested budget: data about 380 lines (pack 3 to 4 strings per source line, and keep the content in plain arrays), CSS about 220 lines in one template string via `P.injectCSS(css,'css-potato-interview')`, logic about 1000 lines.

Suggested internal structure: `mount(root, api)` creates `S` (state object: phase, epoch, n, hs, cand, asked[], inputs, scored, spamTimes[], idleSec, hold{}, squintSec, ring[], save), then helpers in this order: `fill`, `bag(arr)`, `M(text,mood,pri)` (wraps `api.say`), DOM build, `render*` functions, candidate factory, `startCandidate`, `ask`, `answer`, `stareStart/stareEnd/stareTick`, `score`, `decide`, `ceremony`, `exitCandidate`, `flip`, `ending`, idle ticker, spam, secrets, key handler, `destroy`.

- **Bags.** Local `bag(arr)` returning an object with `.next()`; shuffle a COPY with `api.shuffle(arr.slice())` and use the returned array if it returns one, otherwise the copy (check `core/` to see whether `api.shuffle` is in place). Never repeat the same line twice in a row. Use `api.rand/pick/chance` only (deterministic under `?seed`); never `Math.random`.
- **Timers.** Only `api.setTimeout/setInterval/requestAnimationFrame` and `api.on`. One 1s `api.setInterval` for idle, time-to-hire and thresholds; one rAF only for the stare gauge/eye-tracking while active. The `epoch` guard pattern: `const e=S.epoch; api.setTimeout(()=>{ if(e!==S.epoch) return; ... }, ms)`.
- **Typewriter.** Reuse one bubble element; `api.setInterval` ticking 1-2 chars; completing instantly on next ask/click/selftest/reduced-motion. `aria-live="polite"` on the bubble and on a visually-hidden `div.m-potato-interview-log` that receives the last Management line.
- **Hold machine.** One `hold = {src:new Set(), t0:0, on:false, fired:0}`; `holdStart(src)` and `holdEnd(src)` with sources `'space'`, `'ptr'`, `'btn'`, `'think'`. Release on `blur`, `visibilitychange` hidden, phase change and `destroy`. `try{ el.setPointerCapture(e.pointerId) }catch(_){}` always.
- **SVG without a namespace string.** Build all SVG by `container.innerHTML = '<svg viewBox=...>...</svg>'`. Never write the SVG namespace URL (lint forbids `http://` outside comments) and never use `createElementNS` with it.
- **Cursor.** Use CSS `cursor: crosshair` or a small `data:image/svg+xml` cursor with percent-encoded SVG; no http URLs.
- **Reduced motion.** `const RM = !!(window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches)` read once; plus a CSS `@media (prefers-reduced-motion: reduce)` block removing the lanyard overshoot, card wander, eye tracking, sway, sweat fall and screen shake; the ceremony becomes a static badge reveal.
- **Selftest.** `api.selftest` true: typewriter instant, ceremony 300ms, offer-letter auto-dismiss 300ms, idle thresholds / 30, Dale's pause 0, Sock and ending still reachable by fuzz (every overlay needs a visible button the fuzz can click; the Gerald card, Continue button, Yes buttons, Sock options, letter).
- **Lint-safe naming.** Do not name any identifier or write any string containing `alert(`, `confirm(`, `prompt(`, `eval(`, `fetch(`, `import ` or `new Function` (rename helpers like `reconfirm`, `prefetch`; use `ask`, `decide`). No `window.open`, no `http(s)://`.
- **Text safety.** Never produce the strings NaN, undefined, null or [object Object] in visible text. This includes ordinary words: avoid writing words that contain `null` (such as nullify, annulled) in any line. Format numbers with `api.fmt` or `.toFixed(1)` after checking `isFinite`. After `fill()`, collapse double spaces.
- **DOM caps.** Rings 14, sticky notes 6, wall badges 24 drawn (persist 60 names), resume 14 visible lines plus a collapsed summary, bubble 1 recycled element, overlay slips 6, falling-leaf particles 12, confetti via the engine only. Target under 400 nodes at rest.
- **Persistence.** `api.save.get('v1', DEFAULT)` merged over defaults, validated on read (arrays capped, numbers finite). Write at each hire, each fine-print line, each rock/sweet, on destroy.
- **Awards.** Call `api.award` on every action that has a reward above; say something via `api.say` at least every candidate beat; `api.stat.inc` on every key action (selftest FAILS if zero awards, says or stats).
- **First-paint.** The first Management line fires within 1s of mount; Barry rolls in at 3s with his lanyard.
- **Panel mode.** Keep candidate `kind:'panel'` with `parts:[colleen,desmond]`; clicking a part sets `S.target`; both parts render as two smaller SVGs; hiring pushes two wall badges and adds 2 to `hires`.
- **Gut Feeling slider** is a native `input[type=range]`: label it, and read its value with `Number()`.
- **Stamp slam shake** is a class on the stage toggled for 160ms (removed in `api.setTimeout`).
- **Door sign.** Keep the last two crossed-out strings in an array of max 2.

---

## 14. RISKS (the 5 most likely bugs)

1. **Hold/stare lifecycle bugs.** The fuzz harness fires synthetic `PointerEvent`s that have no active pointer, so `setPointerCapture` throws; Space can be pressed with no matching keyup; focus loss, tab hide, phase change or `destroy` mid-hold can leave the gauge stuck or run two holds at once (Space plus pointer plus button). Mitigation: one unified `hold` state with a source set, try/catch around capture, release on blur/hidden/phase change/destroy, ignore `repeat` keydowns, and never pay out twice.
2. **Stale async callbacks and timer leaks.** Ceremony, typewriter, idle reversal, flip and ending are all multi-step timeouts; if a step fires after the candidate changed or the module was destroyed, you get wrong text on the wrong potato or errors after destroy (selftest checks both, and checks leaked timers). Mitigation: the `epoch` guard in every callback, only managed timers, nothing creates timers after `destroy`, and an exclusive `phase` check at the top of every handler.
3. **Unbounded DOM / list growth and double-rendered state.** Coffee rings, sticky notes, resume lines, wall badges, falling leaves and overlay slips accumulate every candidate, and fuzzing runs thousands of asks. Mitigation: hard caps and a `trim()` after every append, a recycled bubble, the 14-line resume summary item, the 24-drawn wall with `+N more, mostly Barry`, and rebuild-from-state renders rather than append-only.
4. **Forbidden strings and token leaks in visible text.** Unfilled `{name}`/`{s}`/`{k}`/`{n}` tokens, `NaN` from division by zero in the gauge or time counters, the word undefined from missing candidate fields, and ordinary words that contain `null` all fail the selftest and read badly. Mitigation: a single `fill()` with an empty-string fallback, guarded numeric formatting, defaults on every candidate field (eyes, kind, name), a wide candidate factory test, and a final grep of the file for the forbidden substrings.
5. **Key handling collisions.** Space as Stare collides with native button activation (focused button also fires click on Space keyup) and page scroll; digit keys collide with the focused range input and with the flip/mutual Yes buttons; `M x3`, `X` hold, `H`/`D` hotkeys can fire while an overlay is open or during ceremony; the Lobby listens for `B`. Mitigation: `preventDefault` Space only inside the module, buttons are activated by Enter and click, a single dispatcher that checks `phase` and open overlay first, ignore modifier combos and repeats, never bind `B` or Esc-to-exit, and test each hotkey in every phase.

Also watch: the 7 1/2 notch snapping infinitely (never dispatch `input` programmatically), SVG built with `createElementNS` and a namespace URL (lint fails), and CSS class names not prefixed `m-potato-interview-` (lint fails).

---

## 15. ACCEPTANCE CHECKLIST

- `node tools/lint.js games/potato-interview.js` clean; `node tools/selftest.js potato-interview` PASS with seeds 1, 2, 3 and `--steps 1500`.
- Within 3s Barry rolls in with a HIRED lanyard; within 10s Management has spoken twice.
- Every one of the first ten candidates, the Sock flip, the ending, the idle chain, the mash and the secret achievements can be reached by a human in order.
- 100+ distinct lines present (this file has about 400 strings); at least 3 callbacks (Queue sign, soil reference, NEXT: GERALD, title parentheses, Barry's lanyard returning); 8 secret achievements.
- The stamp reads HIRED AS SENIOR VICE SPUD regardless of the button pressed, and Positions Open stays 1 forever.
- Works at 360px (stacked layout, floating STARE thumb button) and 1400px; keyboard-only play works; reduced motion removes the big animations.
