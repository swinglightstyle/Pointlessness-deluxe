# DESIGN BRIEF: TINY BUREAUCRACY  (module id: `tiny-bureaucracy`)

File to build: `games/tiny-bureaucracy.js` (single file, classic script, <= ~1800 lines, obeys SPEC.md section 5 and VOICE.md). Category `game`, icon `🗂️`, tagline `Every form requires a form. The forms are very proud of you.`, tags `['desk','forms','stamping']`, unlockCost `0`.

This brief merges three writer pitches. Kept: the **Stack** (push into a form to attach a deeper form, breadcrumb, depth), the **Signature On File** drift gauge, **Sandra's flags + door light**, the **Queue + Stamp Window**, **Triplicate press**, **the loop back to F-1 via drawer 7 1/2 (Dennis)**, the **Restructure (27B/6) lull**, the **Audit of yourself -> Form F-0** ending, **Dolores**, **Gerald / Toaster / Stapler / Kevin** cameos. Cut as unbuildable or weak in one file: verlet pen chain, date wheel, scrolling fine-print pane with a running button, hole punch/chad, shredder-scrap corkboard, fold/staple/re-staple, form-is-a-map, fire drill, 60-field shuffle bag, drag-to-tray for copies (copies auto-route), hand-puppet clerk SVG, mutators beyond three, 3x3 drag-and-drop cabinet (replaced by a click-the-drawer picker), cursor-becomes-stamp spam variant. If the line budget gets tight, cut in this order: stapler, Kevin, F-3F fold, toast cameo, mutators, queue backwards-jumps (never cut: stack, tube, stamps, signature, queue, press, loop, audit, ending).

---

## 1. CONCEPT

You are Valued Employee, seated at one small desk in the **Department of Preliminary Matters**. To get the next form you must fill in the form that requests it; many forms demand an **attachment** that is itself a deeper form. You type, tick, sign, slam a stamp, hold to press carbon, take a ticket, knock on Sandra's door, and shoot paper through a pneumatic tube. Every approval gets a fanfare scaled to nothing. Management is moved by your throughput. The module is a **desk toy first, a joke delivery system second**: every verb is physical and gets a new twist roughly every 60 to 90 seconds.

First joke fires on mount with zero input (within 1 second): Management says intro line T1; the wall clock reads 7:30 with total confidence; Sandra's door light is off but the IN/OUT sign says IN; the first form `F-1 (Application to Begin)` is already on the desk with ONE field (Name); an `APPROVED` stamp and the tube are waiting.

Arc (VOICE.md): normal -> weird -> bureaucratically unhinged -> strangely touching (Restructure) -> back to normal like nothing happened (F-0 and F-1 again, slightly more hopeful).

There is no win. Meh payouts are tiny.

---

## 2. SCREEN LAYOUT

Single root `div.m-tiny-bureaucracy-desk`, CSS grid, 4 zones:

1. **TOP STRIP** (row): left **Sandra's Door** (120x180 max; frosted panel + a backlight div whose opacity = light state; hanging IN/OUT sign that always says IN; a `Knock` hit-area, a real `<button aria-label="Knock on Sandra's door">`); middle **Wall Clock** (CSS circle, two hands set to 7:30, a second hand that ticks slightly backwards; caption on hover/title: nothing); right **Queue Display** (dark panel, tiny caps `NOW SERVING`, big monospace coral digits with glow; below it `YOUR NUMBER`; a small `Take a Number` button and a small `Dolores` silhouette button appear when unlocked).
2. **BREADCRUMB BAR**: chips `F-1 > R-2 > R-3 ...`. Cap 6 visible chips: when longer show `F-1 > ... > R-7 1/2` (first, an ellipsis chip, last 4). Plus a text `Depth: N` (uses depth label, see 6.3). Chips are non-interactive spans (not focus targets).
3. **DESK** (3 columns above 900px: IN-TRAY | ACTIVE FORM | OUT-TRAY/TUBE; between 520 and 900px trays go under the form; below 520px full width, door/clock/queue shrink into one row, stamp rack becomes a horizontal scroll strip):
   - IN-TRAY (left): 1-4 paper edges (CSS), count badge.
   - ACTIVE FORM (centre): manila paper, header line (form number + title), 1-7 fields, optional attach slot, optional signature widget, optional stamp box, footer `Page 1 of 1`. A pile of 0-3 shrunken parent forms sits visibly left/behind it (pseudo-elements, rotated 0.4-1.2deg, offset 3px).
   - TUBE (right): brass tube mouth, button `File in Tube`, an SVG pipe with a capsule that travels when filing; puffs at the mouth.
   - In later beats the **Press Pad**, **Stamp Window** (queue) and **Filing Cabinet** appear (see sections 5 and 6).
4. **BOTTOM RACK**: stamp rack (buttons `1..5`), ink pad (shows ink level), then footer line: `Depth: N | Forms Filed: N | Sandra Flags Open: N`. Above everything bottom-most: the **Clerk's Strip** (`aria-live="polite"`, one line, no typewriter) where stamp/field reactions go (see 3.9) so Management (api.say) is not flooded.

Sandra's sticky flags stick to the form's edge (max 4 shown, see 5.10). Total DOM budget about 250 nodes at any time.

---

## 3. EXACT INTERACTIONS AND CONTROLS

Every control is a real `<button>`/`<input>`/`<select>` (aria-labels on icon buttons). Touch targets >= 44px tall. Focus ring 3px mustard, 2px offset. No hover-only UI. No `alert/confirm/prompt`.

### 3.1 Keyboard summary
`Tab/Shift+Tab` fields; `Enter` in a text field = next field; **Enter on the last field = Stamp + File with the selected stamp** (short flourish); `1`-`5` pick a stamp (only if focus is not in a text input/select); `Space` (when focus is NOT in an input/textarea/select/button) slams the selected stamp straight (0 degrees); `F` file in tube; `K` knock; `Q` answer the queue window; `Esc` pops out of the current form if depth > 1 (inline prompt `Are you sure? That is a form.` with two buttons `Yes (a form)` / `No (also a form)`; closing it with Esc again = No). Letter shortcuts ignored when typing in an input or when modifier keys are held. All key handlers via `api.on(root or window,'keydown', ...)`, ignoring events where `e.target` is outside the module.

### 3.2 Text fields (type A)
Real `<input type="text" maxlength="60">`. Absurd constraint labels with live hints that update as you type (never block typing, just display the verdict):
- `Surname (4 characters max)`: hint `4 of 4 characters used` / `7 of 4. The Brevity Act is 9 pages.` Form is still acceptable (see rule 3.8); only a *Correction Form roll* is influenced.
- `Occupation (must not be a noun)`: hint always `Checking... still a noun.` after 1.2s, deadpan.
- `Mother's maiden name (maiden optional)`.
- `Name` (autocomplete suggestion chips: `Valued Employee` and `{api.player.name}`; one tap fills; also a `<datalist>` is fine).
- `Date of this form (any date, on a Wednesday)`: plain text input with a placeholder `Wednesday`.
Typing the exact word `sandra` (any case, as a whole word or contained) in ANY field triggers the NAME TRAP (section 9). Typing nothing is always valid.

### 3.3 Reason dropdown (type B)
A real `<select>` labelled `Reason for request`. Options (all valid, no effect, each choice gives a unique reaction from a shuffle bag, never the same in a row): `Because`, `Because (see above)`, `Because (see below)`, `Because, per Sandra`, `Technically`, `To be determined`. Reaction goes to the Clerk's Strip (lines in section 8.4).

### 3.4 Contradictory checkboxes (type C)
Three real checkboxes: `I am the person named above`, `I am not the person named above`, `I am technically the person named above`. Ticking one un-ticks nothing. A 4th box `See above` appears (inserted, tickable) only once two are ticked. Verdict (shown as a small tag on the form, evaluated at filing): none of the first two ticked = fine; both ticked = `Rejected for being both` (-> Correction Form roll forced, see 3.8); `technically` ticked = fine, 12 percent chance of a Clerk's Strip sigh line.

### 3.5 Signature widget (type E) - from Beat 4
One 240x80 `<canvas>` reused for the whole module (CSS width 100%, max 240px; internal size 240x80, handle devicePixelRatio by NOT scaling: keep 240x80 and let CSS scale; map pointer coords by `(clientX - rect.left) * (240 / rect.width)`). `touch-action: none`. Pointer events with `setPointerCapture`. Dotted baseline. The One On File is drawn faintly underneath in lilac (once it exists). Buttons: `Clear`, `Sign by typing` (renders the typed name as a deterministic scribble polyline, see 11.4). A drift gauge (div with gradient + a marker, label `Drift: 38%`) sits below.
- The FIRST signature the player ever completes is stored via `api.save.set('sigOnFile', points)` as `The One On File` (up to 64 points, coords rounded to 1 decimal). Management reacts (line S1).
- Later signatures: compute drift (section 11.4). `< 45` accepted. `>= 45`: a **Signature Variance Explanation Form** (free; one tickbox `I was feeling different`) is issued as a correction frame (see 3.8). A signature that is a dot or empty counts as drift 100.
- Signing is optional on forms where the field is absent. On forms where present, an unsigned form is returned as a Correction Form (single `Sign here` widget).

### 3.6 The stamp rack (type F)
Rack of stamp buttons, unlocked progressively: `APPROVED`(1, mint, always), `RECEIVED`(2, blue, Beat 2), `PENDING`(3, mustard, Beat 2), `SEEN`(4, lilac, Beat 4), `HMM`(5, coral, after the queue Stamp Window is answered at Beat 5). Cosmetic unlockables on slot 5/6 later: `S in a circle` (Sandra's Signature, from BLANK secret), `QUACK` duck (from spam, temporary).
- Selecting (click/tap/`1`-`5`) arms the stamp; the armed stamp is a floating element that follows the pointer over the form area (mouse only; touch: tap a stamp to arm it then tap the form).
- **Tilt**: smoothed horizontal pointer velocity `vx` (px per ms, EMA, guard dt <= 0 and non-finite) -> `tilt = clamp(vx * 22, -20, 20)` degrees applied as CSS rotation on the floating stamp. Reduced motion: tilt applies statically, no transitions.
- **Click on the form** slams it: scale-down animation (200ms), `api.sfx('stamp')`, an ink splat (a div with `mix-blend-mode: multiply`, rotation = tilt, plus an SVG `feTurbulence`+`feDisplacementMap` filter defined ONCE in a hidden `<svg>` in root). Mark persisted on the form as `{name, tilt}` (max 1 mark per form counted; extra marks are only decorative, cap 6 DOM marks per form). Tolerance **7.5 degrees**: `abs(tilt) <= 7.5` is straight; otherwise crooked.
- **Keyboard/touch placement**: `Space` stamps the form straight (tilt 0). Straight keyboard stamps are `suspicious` 1 time in 4: Clerk's Strip line plus a fake fee line ("0.5 Meh") that does not deduct anything. Touch tap placement uses `tilt = random in [-6, 6]` so it is never crooked on touch.
- **Ink pad**: from Beat 6 it holds 6 stamps' worth of ink. When dry the next slam leaves a pale `...` ghost mark and the clerk line `ink-dry`. Click the pad **3 times within 1.5s** to re-ink (tiny rhythm; each click a `tick` sfx; third a `pop`); press-and-hold the pad for 1s also re-inks. The ghost mark counts as a stamp (never blocks anything).

### 3.7 The tube (filing)
`File in Tube` button, `F` key, or clicking the tube mouth, or dragging the form onto the tube is optional (nice to have: pointer-drag of the form header; not required). Pressing it:
1. If the active frame has an unfilled **attach slot**: shake the slot, Clerk's Strip line `incomplete`, abort.
2. Otherwise lock the desk (`filing=true`), play `whoosh`, animate the SVG capsule along the pipe (travel 1000-3000ms depending on beat; Beat 1: 600ms; selftest: 50ms), evaluate the form (3.8), then deliver the result (approved or correction form) into the in-tray with a `pop`.
Tube clicks during `filing` are ignored (but still counted for spam, section 10).

### 3.8 Evaluation (the whole judging system)
Evaluate at tube arrival. Everything is lenient so the player is never stuck:
- No stamp placed: `Returned: unstamped` -> Correction Form `C-1 (Please Apply a Stamp)`, ONE stamp box.
- Stamp crooked (`abs(tilt) > 7.5`): `Returned: crooked` -> Correction Form `C-2 (Request to Be Straighter)`, one tickbox `I will be straighter`.
- Both identity boxes ticked: `Returned: both` -> Correction Form `C-3 (Which One Are You)`, one tickbox `Yes`.
- Signature on form but drift >= 45: Variance Form (3.5).
- Otherwise a flat **1 in 9** roll (`api.chance(1/9)`, never twice in a row, never in Beat 1 or on a Correction Form): `Returned for being complete` -> Correction Form `C-4 (Request for Something Missing)` with the Because dropdown only.
- **Safety valve**: if `rejectStreak >= 1`, force approve (no chained rejections beyond one). A correction form that is itself stamped crooked is still accepted.
- Approved: award Meh by table in 7.2; stats; if frame is a child (depth > 1) it **pops** back to parent (6.2); if top-level, advance sequence (next F form).
A correction form is a frame replacing the in-tray form at the SAME depth; approving it resumes the original (the original keeps its entered field values, stamp, and signature).

### 3.9 Clerk's Strip vs Management
Field/stamp/dropdown/knock reactions go to the **Clerk's Strip** (`aria-live="polite"`, local text, 1 line, set directly, not api.say). **Management** (`api.say`) speaks at: mount/intro, every approval of a *beat milestone*, every pop, every beat change, secrets, rare events, flags and the ending, and roughly every 3rd ordinary filing (shuffle bag of `approve` lines). Rate-limit api.say to >= 1500ms between non-priority calls (priority 1-2 bypass). Use `api.sayRandom`-like local shuffle bags driven by `api.rand`.

---

## 4. STATE MACHINE AND ESCALATION TIMELINE

Ten beats, driven by `beat` (0..9). A beat advances when **`filingsInBeat >= quota` AND `beatSeconds >= minSeconds`** (selftest: minSeconds 0, but still needs the quota). If the player idles through a beat, nothing advances (idle events fire instead). `beatSeconds` counted by the master tick. Careers 2+ use `quota = ceil(quota/2)`, `minSeconds = minSeconds/2`, and keep all unlocks.

`filingsInBeat` counts approvals (including approved children and approved correction forms), not rejections.

| # | Beat (target time) | quota | min s | New this beat |
|---|---|---|---|---|
| 1 | THE FRONT DESK (0:00-0:30) | 2 | 25 | F-1 (Name only), APPROVED stamp, tube (600ms), fanfare for a name. After the 1st approval the in-tray delivers `F-1A (Application to Continue)`. |
| 2 | FIELDS GET OPINIONS (0:30-1:00) | 3 | 30 | Forms get 3 fields: surname(4), Because dropdown, contradictory checkboxes. RECEIVED/PENDING stamps. Mouse tilt; crooked -> correction. Reaction bags. |
| 3 | THE STACK (1:00-1:45) | 4 | 40 | First `Attach proof of Form R-2` slot. Push/pop, breadcrumb, depth. Tube capsule 1-3s. Pop at depth 3 gets the paperclip fanfare. First Sandra flag lands; door light switches on. Max depth 3. |
| 4 | THE SIGNATURE ON FILE (1:45-2:30) | 4 | 40 | Signature canvas, The One On File, drift gauge, Variance form, SEEN stamp, **Knock** unlocked (nobody answers), flag Respond micro-form. Max depth 4. |
| 5 | THE QUEUE (2:30-3:30) | 4 | 50 | Take a Number, queue display lights, wandering NOW SERVING, Stamp Window (4s), HMM stamp, Dolores. Max depth 4. |
| 6 | TRIPLICATE (3:30-4:30) | 4 | 50 | Press Pad (hold), three copies, desk tear, ink pad dries, door light longer with pink copy. Burnt-toast joke arrives only at depth>=6 (Beat 7). Max depth 5. |
| 7 | DEPTH (4:30-5:30) | 4 | 50 | Titles nest (`Request for Request for Request for Form R-8`). Depth reaches 8, labelled `7 1/2` (see 6.3), with its own tiny desk look, stamp name `7 1/2` skin, and wall clock caption. Gerald countersign at depth 7. Stapler appears with demands. Toaster cameo (once per session at depth >= 6). Max depth 8. |
| 8 | THE ARCHIVE LOOPS BACK (5:30-7:00) | 3 | 60 | Depth 9: `R-9` requests proof of `F-1`. Filing Cabinet appears. Retrieve F-1 from drawer 7 1/2 (Dennis). Attach it. It does not pop everything: F-1 now needs proof of `R-9`. Management acknowledges the cycle with dignity, then the stack unwinds (6.5). |
| 9 | THE RESTRUCTURE (7:00-8:30) | 3 | 60 | Every form renamed `27B/6`, desk rotated 3deg, Sandra's handwriting font, `NOW SERVING = your number minus 0`, door open a crack. Flags turn kind. A 20-second lull (no sfx, no awards, no spoken Management lines, soft CSS). Dennis promoted. |
| 10 | THE AUDIT (8:30-10:00) | 2 | 50 | Audit of Valued Employee form with all your pre-filled stats. Stamp yourself APPROVED. Then Form F-0 (Request to Have Never Begun), Name only -> the not-ending (section 12). |

Beat transitions: `api.say` a `beatStart` line (section 8.3), `api.sfx('bell')`, a CSS `beat banner` flash in the Clerk's Strip. Unlocks occur at beat start (never mid-form: the next generated form includes them). State saved (`beat`, career) via `api.save` at each beat start so a remount resumes at that beat with the line `resume`.

Master states: `idle` (waiting for input) -> `stamping` (armed) -> `filing` (tube locked) -> `delivering`; overlay modes `pressing`, `queueWindow`, `cabinet`, `quietLull`, `closed` (office closed), `ending`. An overlay never blocks Esc/`K`/knock/flags except `ending` and `cabinet` (which has an explicit `Close drawer` button).

---

## 5. MECHANICS BY FEATURE

### 5.1 Form templates (generate, do not hand-write 40 forms)
A table of **14 templates** `{id, title, kind, fields[], tier}` chosen by beat tier; a form picks its fields from the field types learned so far (3 to 7 fields from Beat 2 on) using a shuffle bag that never repeats the same field twice in a row. Templates (title text; `{n}` = form number; `{m}` = the next):
1. `F-1 Application to Begin` (Name)
2. `F-1A Application to Continue` (Name, Because)
3. `F-1B Application to Proceed Cautiously` (Surname4, Because, checkboxes)
4. `R-{n} Request for R-{m}` (generic request: 3-5 fields, attach slot)
5. `R-{n} Request for Request for R-{m}` (nested title, Beat 7+)
6. `S-1 Signature Variance Explanation Form` (one tickbox)
7. `C-1..C-4` correction forms (see 3.8)
8. `K-9 Notice of Knock` (Beat 4 knock when 7th: only secret)
9. `D-1 Desk Repair Request` (one tickbox `The desk has been repaired by this tickbox`)
10. `H-12 Request for Gentler Treatment` (spam, one tickbox)
11. `T-1 Triplicate Declaration` (fields + Press Pad)
12. `G-1 Countersignature (Vice President)` (Gerald slot)
13. `A-1 Audit of Valued Employee` (read-only pre-filled list + stamp)
14. `F-0 Request to Have Never Begun` (Name)
Form numbers: top-level sequence `F-1, F-1A, F-1B, F-2, F-2A...`; child forms `R-{depth}`. The **number text is always passed through a formatter** (never raw NaN).

### 5.2 Footers (running gag)
Footer text by context (set per frame): default `Page 1 of 1`; depth>=3 `Page 1 of 1 (continued on page 1 of 1)`; depth 5 `Page 5 of 1`; depth 7 `Page 7 of 1`; depth 8 (`7 1/2`) `Page 1 of 7 1/2`; the loop frame `Page 1 of 1 (final)`; Restructure `Page 27B of 6`; and after the first career `Page 1 of 1 (continued from 1 of 1, one career ago)`; with the ending sequence the F-1 footer reads `Page 1 of 1 (continued from 1 of 1, 10 minutes ago)` once.

### 5.3 Mutators (cheap, 3 only, careers 2+ and Beat 7)
At most one active per form: `Left-handed day` (CSS `direction` flip of the stamp rack and tube side; hint line), `Everything is in green ink` (CSS color filter on form ink), `The Window is closed for lunch` (tube delayed by +2s with a sign). Announced via Clerk's Strip. Pure CSS classes.

### 5.4 Sandra's flags (type J)
Sticky notes (pill buttons with a folded-corner CSS) stuck to the form/desk edge. Each flag has Sandra-voiced text (section 8.9). A flag appears: first at Beat 3 (`Please see attached.`), thereafter with probability 1 per ~35s while Beat >= 3 (max 12 stored, up to 4 DOM pills). Clicking `Respond` opens a micro-form: ONE tickbox `Noted`; ticking gives 0.5 Meh, `flags_answered`++, door light duration -1s (min 1s). A flag not answered within 40s expires into the fringe: `flags_ignored`++, `lightSeconds`+1s (max 20s). Open flags yield a yellow fringe around the desk (inset box-shadow strength = min(open, 12); NOT DOM nodes). Flags are **optional always**. Footer: `Sandra Flags Open: N`.
**Door light rule (gag)**: the door light shows for `clamp(3 + ignored - answered, 1, 20)` seconds on each trigger (flag arrival, knock, copy under door); callback: in the final minute it flickers once at the exact moment you stamp F-0.
**Beat 9 flags (kind)**: for the whole Restructure beat flags are replaced by the sincere lines in 8.12; they cannot be ignored (no fringe).
**Attachment callback**: at Beat 7 or later the next flag has an attachment, showing either the earlier blank form (if any blank submitted) or the `Noted` tickbox; line in 8.9.

### 5.5 The door and knock (from Beat 4)
`K` or click the door: a CSS knock shake (disabled for reduced motion), `api.sfx('tick')`, `knocks`++, Clerk's Strip line from the knock bag; door never answers. Light pulses per 5.4. Knock secret in section 9.

### 5.6 The queue (Beat 5)
`Take a Number` (button, or the `T` key): issues `YOUR NUMBER 41`. Display NOW SERVING follows the scripted wander `['38','39','38','39','40','46 1/2','40','41']` advancing every 6-10s (api.randInt; selftest: whole queue compresses to ~2s total) and dwells on `40` a beat longer. **Gag invariant**: whenever the display shows a regular number it is **always your number minus 1** except when it deliberately wanders (the table above is the "wander"); between steps it sits at N-1. When it reaches `41` (=N) for the first time, **the Stamp Window lights** (a lit window button `Window 7: Number 41`) for **4000ms** (shortened only to a minimum 2500ms in selftest); `Q` or a click answers. Answer -> the clerk hands over the HMM stamp (unlocks slot 5) and an unreadable receipt (a lilac scrap with scribble text; clicking it shows line `receipt`). Miss it -> `YOUR NUMBER` becomes `old + 71` (112), display jumps to `old + 70`, a second window call happens ~20s later lasting **6s** (guaranteed gentleness; missing that too just gives 71 more and a third call is a 10s window; never an ending). The queue never blocks other mechanics; it is a pressure valve not a timeout. Dolores button (a 28px grey silhouette) appears next to the display at Beat 5: clicking cycles her 8 lines (8.7). Reduced-motion: digits snap.
Callback (audit): the audit form asks `Queue number (the number of the queue you are in)`.
At the very end: NOW SERVING equals your number for exactly 1s then the window closes `Back at 7:30` (section 12).

### 5.7 Triplicate and the Press Pad (Beat 6)
Some forms (from Beat 6; 1 in 2 generated forms and every `T-1`) have three sheets (white, yellow `#FFF29A`, pink `#FFC9D4`, 6px offsets). Fill the top; then **hold** the `PRESS FIRMLY` pad: pointerdown / Space / long-press fill a conic-gradient ring over **1.2s** via `api.requestAnimationFrame` (progress = elapsed/1200, clamp 0..1.3). Release inside the **green band 0.55 to 0.80**: clean transfer (carbon bleed overlay opacity high), `clean_press` stat. Release below: faint copies (carbon opacity low) - fine. Above 0.80 (still holding past ~0.9s): **tears through the desk**: `desk tear` sound (`buzz`), `D-1 Desk Repair Request` issued as a free correction frame. **Safety**: auto-release at 1.56s, on `pointerup`, `pointercancel`, `lostpointercapture`, window `blur`, and `keyup`; ignore pointerdown while `pressing`.
After release the sheets auto-route (animation, no drag): top copy slides to the Out-Tray (this is what the tube files), middle copy **slides up and under Sandra's door** (door light pulse), bottom copy fades into a pocket icon with the line `pocket`. A press is required once per triplicate form before filing (if unpressed: strip line `unpressed`, abort).
Stat `tiny-bureaucracy.copies`.

### 5.8 Filing cabinet (Beat 8)
A button `Filing Cabinet` appears on the desk during Beat 8 (and permanently afterwards, cosmetic). Opening it shows a 3x3 grid of drawer buttons labelled `A B C D E F G H` plus a half-height `7 1/2` drawer between two others (rows: `A B C / D 7 1/2 E / F G H`; 9 buttons). Clicking a wrong drawer: a line from 8.10 (shuffle). Clicking `7 1/2`: the drawer slides out (translateY) and shows `🪴 Dennis (Plant), thriving` and a folder `F-1 (your original)`; the folder displays the very name you typed on your first F-1 (`api.save` stored `firstName`). Buttons `Take F-1` and `Close drawer`. Taking F-1 attaches it to the loop frame (6.5). Cabinet open state is an overlay with focus trap off but Esc closes.

### 5.9 Gerald (cameo with a mechanic), Toaster, Stapler, Dennis
- **Gerald (Beat 7, depth 7 only)**: the frame includes a `G-1 Countersignature` slot (a button `Countersign (Vice President)`). If `api.flag.get('metGerald')` truthy: click -> a potato-shaped smudge appears (an SVG potato blob, `🥔` allowed here only) and Gerald says `NOT NOT APPROVED` via `api.say({who:'Gerald'})`. If not met: the slot reads `Countersignature required from a Vice President you have not met. Gerald is available in another department. He is, as always, a potato.` and the click puts the form `to the back of the in-tray` (a 3s delay with count `Waiting behind 4 forms`, then continues; nothing else happens).
- **Toaster (once per session, when a form is filed at depth >= 6)**: the tube returns `🍞` toast with a burnt form reading `I am sorry about Tuesday.` Click eats it: +0.5 Meh, line `toast-eaten`. It disappears on its own after 20s. Flag: `api.flag.set('toasterMet', true)` is NOT set here; only read for Dolores ask. Optional.
- **Stapler (Beat 7+, cosmetic union rep)**: a `📎`-adjacent `Stapler` button on the desk. Each click cycles 6 demands (8.8). After 6, clicking `Sign` hands over a staple-shaped certificate worth 0 Meh and the line `stapler-signed`.
- **Dennis**: lives in drawer 7 1/2; at Beat 9 `Dennis (Plant) has been promoted ... did not attend the ceremony` (8.12); a tiny `🪴` sits on the desk edge afterwards (cosmetic).

### 5.10 Cap list
Breadcrumb 6 chips; flags stored 12, DOM 4; archive/forms-filed log ring buffer 30 (shown in the audit and in a collapsible `Forms Filed` details; max 30 DOM rows); ticket/receipt scraps 3; stamp marks 6 per form; toasts via api.toast not DOM; Dolores one element; stack pile visuals 3.

---

## 6. THE STACK (central mechanic)

### 6.1 Data
```
stack = [ frame, frame, ... ]       // stack[0] is top-level F-n, stack[last] is active
frame = { id, num:'R-3', title, tpl, fields:[{type,val,...}], attach:{slot:true, child:null}, stamp:{name,tilt}|null,
          sig:poly|null, pressed:false, kind:'normal'|'correction'|'loop', depth }
```
Never mutate DOM-state as source of truth; read values from `frame.fields` (inputs write back on `input`).

### 6.2 Push and pop
Clicking the attach slot (button `Attach proof of Form R-N (Request for R-M)`; keyboard Enter/Space) **pushes** a child frame: the current form slides left and shrinks onto the visible pile (CSS transform, 250ms; reduced motion fade), the child slides in (`whoosh`). Depth +1; `depth_max` stat (`api.stat.max`). Finishing the child (approved at the tube) **pops**: the child form disappears into the parent's slot as a 📎 (rotated -20deg) with title chip, parent slides back. At depth >= 3 the pop is celebrated with a paperclip fanfare (`api.sfx('fanfare')`, small confetti, Management line `pop`). `Esc` pops without completing only via the inline prompt (3.1): an abandoned child is discarded and the parent's slot reopens (no award; line `abandon`).
- The **bottom form is never reachable**: there is no action that removes `stack[0]` except the F-0 reset or a loop unwind.
- **Depth can never be zero** except through the non-ending reset (12) in which the desk rebuilds a fresh stack of depth 1 in the same function that clears the old.
- While `filing` is true, push/pop/Esc are ignored (guard against double-pop).

### 6.3 Depth label
`depthLabel(d)`: `d<=7 -> String(d)`, `d==8 -> '7 1/2'`, `d==9 -> '9'`. (The line `Nobody knows where 8 went.` fires when the label jumps from `7 1/2` to `9`.) Chip number for real depth 8 is `R-7 1/2`.

### 6.4 Target depth by beat
Max chain depth for new child requests: Beat3 3, Beat4 4, Beat5 4, Beat6 5, Beat7 8, Beat8 9, Beats9-10: depth 1 (no stack; every form is a `27B/6`, see 9.2). A child frame has its own attach slot with probability `0.65` if `depth < maxDepth` (so the chain is not forced to the max every time; but **Beat 7 and Beat 8 force the first chain of the beat to the maximum** so the milestones are reached).

### 6.5 The loop (Beat 8)
The first forced chain reaches `R-9`, whose slot reads `Attach proof of Form F-1 (Application to Begin)`. Clicking it opens the Filing Cabinet (5.8) instead of pushing. After `Take F-1`: the slot fills with the original F-1 (showing the first name). F-1 now displays a red `Requires proof of Form R-9` note (a slot that points to a frame already on the stack: clicking shows `The cycle` Management line) and a single tickbox `The cycle is acknowledged` (Space operable). Ticking it: Management acknowledges with dignity (8.10), then the stack **unwinds** automatically: every frame pops with a `tick` and a 200ms delay (a staggered `setTimeout` chain via api.setTimeout; guard each with a token), +5 Meh at the end (`api.award(5,'The Cycle')`), depth ends at 1, loop reward fanfare + achievement. Unwinding must be safe to interrupt (destroy/remount; Esc ignored).

---

## 7. AWARDS, STATS, PERSISTENCE

### 7.1 Awards
Tiny. Every filing awards; stat per verb.

### 7.2 Table
- approved top-level form: `0.1 + beat*0.1` (max ~1.0)
- approved child form (pop): `0.4 + depth*0.2` (max ~2.2)
- deep return (pop at depth >= 6): `5` flat (`reason: 'Deep Return'`), once per such pop
- Correction form approved: 0.2
- clean press: 0.5; flag answered: 0.5; Dolores clicked first time per session: 0.1; toast eaten 0.5; Sandra note answered (idle): 0.5
- loop unwind: 5; audit approved: 3; F-0 approved: 10 (ending); career end bonus 3
- fees: `-` none ever actually deduct except one cosmetic joke fee; `api.award(-0.3, 'Stamp Fee')` once per session at the first suspicious stamp (still fine; never below 0).

### 7.3 Stats (all prefixed `tiny-bureaucracy.`)
`forms` filed approved, `stamps`, `crooked`, `knocks`, `tickets`, `windows_answered`, `windows_missed`, `signatures`, `copies`, `clean_press`, `flags_answered`, `flags_ignored`, `depth_max` (max), `blank`, `quacks`, `careers`, `dolores`, `toast`, `corrections`, `rejections`.

### 7.4 Persistence via `api.save`
`beat` (resume), `career`, `firstName`, `sigOnFile` (poly), `knocks`, `blanks`, `flagsIgnored`, `flagsAnswered`, `kevin` (bool), `sandraStamp` (bool), `toastSeen` (session only, not saved), `loopDone` (bool). Always read with defaults and sanitize (arrays of finite numbers only). Never save more than ~2KB.

---

## 8. ALL LINES, VERBATIM (final; 160+)

Use local shuffle bags (no immediate repeat). Tokens `{player}` etc. substituted by api where used with `api.say`; for local-strip lines substitute `{player}` manually with `api.player.name`. Numbers inside lines are literal. "Management" says all `api.say` lines unless noted.

### 8.1 Intro and mount (api.say)
- T1: `Welcome to the Department of Preliminary Matters. Please take a form. Please take a seat. The seat is a drawing.`
- T2: `To request a form, you must first complete a form. This is not a loop. A loop would have been approved.`
- T3: `Your desk is exactly the size of your responsibilities. Please do not look under it. That is also a form.`
- resume: `Welcome back, {player}. We held your place. We held it in a drawer, under Dennis.`
- Clerk's Strip on mount: `Form F-1 (Application to Begin). One field. Name.`

### 8.2 Approve (Management; used about every 3rd ordinary filing)
- `Form F-1 (Application to Begin) has been approved. You may now apply to continue, using Form F-1A, which you must first request.`
- `Approved. The stamp landed at 4 degrees, which is within tolerance, which is also a form.`
- `Form 27B/6 has been approved. Form 27B/7 was destroyed in 1998. Form 27B/7 and a half is on lunch.`
- `Approved. Your throughput has moved Management. Management has asked to be moved back.`
- `That form was approved at a pace we can only describe as a pace.`
- `Approved. The paperwork is complete. A different paperwork has begun, in sympathy.`
- `Your filing has been received, read, mislaid and located. In that order, in under a minute.`
- `Another one approved. The tube is trembling, which it does when it is proud.`
- `The form has been approved on the strength of having been a form.`
- `Approved. The approval has been filed. The filing has been approved. We are a close team.`
- First F-1 only: `Grand Chancellor of the Preliminary Paperwork. That is your title now. The title is also a form.`

### 8.3 Beat starts (Management, once each, priority 1)
1. `Beat 1`: `A simple form. One field. The form is the simplest thing in the building, which is saying very little, loudly.`
2. `Beat 2`: `The forms now have opinions. Please do not take them personally. They have not met you.`
3. `Beat 3`: `Some forms now require an attachment. The attachment is a form. It requires an attachment. Mind the paperwork.`
4. `Beat 4`: `Signatures are now compared. Please sign as you did before. Do not think about it. We will know.`
5. `Beat 5`: `A queue has been opened. Numbers are free. Waiting is billed in Meh, after the fact, in cash, which we do not accept.`
6. `Beat 6`: `Carbon paper has arrived. Please press firmly. The desk has been informed that it may be pressed through.`
7. `Beat 7`: `Depth has been approved. Please go deeper. The surface has filed a request to be reached.`
8. `Beat 8`: `The archive is open. Everything you ever filed is in it, with a thin film of affection.`
9. `Beat 9`: `The office has been restructured. Everything is where it was, but called something else, and nobody is happier.`
10. `Beat 10`: `An audit of Valued Employee has begun. The auditor is Valued Employee. Please be honest with Valued Employee.`

### 8.4 Fields, dropdown, checkboxes (Clerk's Strip)
Field labels/hints:
- `Surname (4 characters maximum, per the Brevity Act, which is 9 pages).`
- `Occupation (must not be a noun).`
- `Checking... still a noun.`
- `Mother's maiden name (maiden optional).`
- `Date: any date after issue, before issue, and on a Wednesday. Wednesdays are determined by the clock, which is confident.`
- `4 of 4 characters used. Exactly as brief as we hoped.`
- `{n} of 4 characters. The Brevity Act is 9 pages and you are in breach of page 3.`
Reason dropdown reactions (shuffle):
- `Because has been accepted. Because is not a reason. Because is a conjunction. Conjunctions are handled by Window 11.`
- `Because (see above). Above is also Because. We went and looked.`
- `Because (see below). Below is the floor. The floor has been consulted.`
- `Because, per Sandra. Sandra has been asked. Sandra has not been in.`
- `Technically. A technicality has been generated and filed under Technically.`
- `To be determined. A committee of one has been scheduled to determine it, on a Tuesday.`
Checkbox reactions:
- `You are, and are not, the person named above. Both have been noted. Neither will be told.`
- `Technically is accepted. Technically is always accepted. It is why we have it.`
- `A 4th box has appeared: See above. We could not stop it. It was already there.`
- `You ticked a box that says you are not you. We admire the candour. It has been rejected for being too candid.`
- sigh (12 percent): `The clerk has sighed. It was a very small sigh, with a lot of policy in it.`
Text constraint callbacks:
- `Your name is correct but too confident. Please resubmit with less certainty.`
- `Autocomplete suggests Valued Employee. Autocomplete has always known.`
- `Noted at length.`
- `Noted briefly.`
- `Noted, with concern.`

### 8.5 Stamps (Clerk's Strip), crooked, suspicious, ink
- `The stamp says APPROVED. The ink says it is thinking about it.`
- `RECEIVED. Not read. Not understood. Received, though. In full.`
- `PENDING. Pending what is pending. The pending is currently pending.`
- `SEEN. Seen by whom is a matter for the person who saw it.`
- `HMM. Nobody has ever been able to explain the HMM stamp. It has simply always been correct.`
- `Crooked by {n} degrees. Crooked stamps are only valid on Thursdays, and this was Thursday for about a second.`
- `The stamp is crooked. Compliance calls this character. Sandra calls it a Tuesday matter.`
- `A perfectly straight stamp. Suspicious. Please account for the straightness.`
- `A stamp-handling fee of 0.5 Meh has been charged. A receipt for the 0.5 Meh costs 0.5 Meh and requires a form.`
- `The ink pad is dry. Please moisten it with a colleague's ink pad. You have no colleagues. Please acquire one.`
- `Ink pad re-inked. The ink has been told it is back and is pretending not to mind.`
- `The ghost of a stamp has been left on the form. It is valid. Ghosts are, in fact, licensed.`
- `No stamp. A form without a stamp is just a hope with margins.`

### 8.6 Tube
- `Your form has entered the pneumatic tube. Estimated arrival: soon, then later, then Thursday.`
- `The tube is thinking. It has asked for a moment. It has been given several.`
- `The tube returns your form, slightly warm, marked SEEN. It is not clear by whom. The tube is not saying.`
- `Returned: unstamped. The form has been returned for being a form without a stamp.`
- `Returned for being complete. Complete forms make the other forms feel unfinished.`
- `Rejected for unclear handwriting. Your form was typed. The handwriting was unclear in a way we cannot discuss.`
- `The form is incomplete. Please complete the form. The form is the thing that is incomplete.`
- `Rejected. Your name is correct but too confident.`
- `The tube has filed a request for a smaller form. It was approved. The tube is pleased.`

### 8.7 Stack, depth and Dolores
Stack (Management/Strip):
- `Attach proof of Form R-2 (Request for R-3). You are now 2 forms deep. Mind the paperwork.`
- `Depth 3. You have been issued a paperclip. The paperclip is the only thing that was ever attached.`
- `Depth 5. You are five requests from the surface. The surface has filed a request to be reached.`
- `Depth 7 and a half. Nobody knows what the half is. It has its own desk.`
- `Nobody knows where 8 went.`
- `Page 7 of 1. That is not a typo. That is a page count.`
- `Form titles now nest: Request for Request for Request for Form R-8. Please read it aloud once, for the room.`
- `You have returned to depth 1. The surface was where you left it, slightly smaller.`
- `You are sure? That is a form. Please file it.`
- `The abandoned form has been abandoned. It would like a word. The word is 'later'.`
- `The wall clock in depth 7 1/2 reads 7:30. Hours and minutes. Both. It is the only clock that is also a form.`
Dolores (8 lines, cycles in order, then repeats the last):
- `Dolores: I have been here since before the numbers were numbers. I am not at the front. I am near it.`
- `Dolores: They called my number in 2011. I was in the bathroom. I came out in 2019.`
- `Dolores: Do not skip ahead of me. I will notice. I will say nothing. You will feel it.`
- `Dolores: The magazine is from 1998. It contains one article, and the article is this queue.`
- `Dolores: I have forgotten what the form was for. I remain very committed to the queue.`
- `Dolores: You are quite good at this. I am not supposed to say. I have said it quietly.`
- `Dolores: If your number comes up, answer. I always say that. It has never come up.`
- `Dolores: I have forgotten the form. I will wait for the next one.`
- If `toasterMet`: `Dolores asks the toaster for a form. The toaster pops up a warm slice marked Form 1.`

### 8.8 Stapler demands (cycle)
- `Stapler: Demand 1. Fewer staples. More recognition.`
- `Stapler: Demand 2. A summer holiday on the third shelf.`
- `Stapler: Demand 3. A break room that is a drawer.`
- `Stapler: Demand 4. That forms be stapled upper left, in recognition of service.`
- `Stapler: Demand 5. A seat on the Committee of One, in a non-voting capacity.`
- `Stapler: Demand 6. Whatever this is, we would like to be consulted. Sign here.`
- signed: `The stapler has been issued a certificate. The certificate is staple-shaped. It is worth 0 Meh. The stapler is thrilled.`
- `A rumour is going around the office that the stapler is unionizing.`

### 8.9 Sandra (flags, door, knocks, notes, name trap)
Flags (shuffle; the first is always the first one):
- `Please see attached.` (the first flag; nothing attached)
- `Sandra from Compliance has flagged this. The flag reads 'Please see attached.' Nothing is attached. That is the flag.`
- `Per Sandra: pens must be the colour of pens.`
- `Per Sandra: initials in blue, except on Thursdays, which are blue by definition.`
- `Sandra has flagged your flag. Your flag is now the same size as the original flag. She requests parity.`
- `Flagged for being filled in. Flagged for not being empty.`
- `Per Sandra: stamps are to be crooked in the manner of straight ones.`
- `Per Sandra: this form is acceptable except where it is not.`
- `Sandra's note: 'Pens must be the colour of pens.' The note is in an unrecognised colour.`
- `Per Sandra: the rule about sticky notes is a sticky note.`
- `Sandra is IN. Sandra is not in for you. The sign has been reviewed by Sandra.`
- `Per Sandra: disregard any note signed Sandra, including this one, which is signed S.`
- Attachment callback (Beat 7+): `Please see attached. There is an attachment this time. It is the thing you ticked before. It says Noted.`
- Attachment callback (if blanks > 0): `Please see attached. The attachment is the blank form from earlier. It is, on reflection, the best thing here.`
Knock bag (Clerk's Strip):
- `You knocked. The door did not answer. The door has been added to Form K-9 as a witness.`
- `Knock logged. Sandra's calendar shows Focus Time from 2009 until a date to be confirmed.`
- `The light behind the frosted glass is on. Nobody has been in the room. The light is working very hard.`
- `You knocked in a rhythm. The rhythm has been filed under Rhythms.`
- `Knock {n} of an unspecified number. The number is Sandra's.`
Door/sign lines: `The IN/OUT sign reads IN. It reads IN for everyone else, specifically.` and `The door is open a crack. Please do not look through the crack. The crack is a form.` (Beat 9).
Flag response: `Noted. Thank you. The flag is noted. The flag is delighted to be noted.`; ignored expiry: `A flag has gone yellow at the edges. It has joined the fringe.`
Name trap (section 9): see there.

### 8.10 Signature, queue, cabinet, loop
Signature:
- S1 (first signature): `Signature stored. The One On File is you, a moment ago, being optimistic.`
- `Your signature differs from the one on file by {n} percent. The one on file was you, a moment ago, being optimistic.`
- `Signature accepted. It resembles a nervous heart monitor, which is within policy.`
- `Please sign exactly as before. Do not think about how you signed before. We will know.`
- `Signature Variance Explanation Form issued. One tickbox. The box says: I was feeling different.`
- `The typed signature has been scribbled on your behalf. It is a more confident you. Please be less like it.`
- `Drift {n} percent. You have changed as a person by {n} percent since we last checked. Congratulations, or condolences.`
Queue:
- `Please take a number. Numbers are free. Waiting is billed in Meh, after the fact, in cash, which we do not accept.`
- `Now serving 40. You are 41. A nice, reachable number, held at a respectful distance.`
- `Now serving 46 1/2. The display has gone to a place nobody was asked about.`
- `Number 41 to Window 7. Number 41 to Window 7. Number 41 has been 41 for some time now.`
- `Number 41 has left the building. You are now number 112. Number 41 has sent its regards.`
- `The clerk gives you the HMM stamp and a receipt. The receipt is written in an unreadable hand that is very much your own.`
- `receipt:` `The receipt reads: This is a receipt for a receipt. Please retain the receipt for the receipt.`
Press:
- `Press firmly. Three copies: one for us, one for the other us, one for you. You may not keep yours.`
- `The copies are faint. They have been told they are faint. They are taking it hard.`
- `You have pressed through all three copies and into the desk. The desk would like a form.`
- `The pink copy has slid under Sandra's door. The light stays on a little longer, as if reading.`
- `The pocket copy has gone. Management says it was not yours to keep. Management is wearing a coat with a new pocket.`
Depth and cabinet:
- `Form R-9 requires proof of Form F-1. You are Form F-1. You have been in the building since the beginning.`
- `Drawer 7 1/2 contains one (1) Dennis (Plant), thriving. Please do not file Dennis. Dennis is the only filed thing.`
- `Your original Form F-1 has been retrieved. It is exactly as you left it, and slightly more hopeful.`
- `Wrong drawer. This contains a stapler's grievance, a sock (not yours) and the concept of Thursday.`
- `Drawer C is empty. It has been empty for so long that it is now an office.`
- `Drawer H contains only the letter G. The letter G is in the wrong drawer.`
- `Drawer A contains Form A-1, Request for Drawer A. It is a very good drawer.`
- `Drawer E contains a single raised eyebrow. We do not know whose. We have catalogued it.`
- `The cycle: F-1 now requires proof of R-9, which requires proof of F-1. The cycle has been acknowledged with great dignity. It was handed a very small trophy.`
- Gerald: `Gerald has stamped the form NOT NOT APPROVED. Gerald has considered the matter at length. Gerald is a potato.`
- Gerald (not met): `Countersignature required from a Vice President you have not met. Gerald is available in another department. He is, as always, a potato.`
- Toast: `The tube has delivered toast. A form is burnt into it. It reads: I am sorry about Tuesday.` and eaten: `That was a form. It has been digested. This is the most efficient filing we have ever done.`

### 8.11 Not-ending / audit
- `Audit form: Name: {player}. Signature: on file. Knocks on door: {n}. Answers received: 0. Feelings: noted.`
- `Audit: Flags ignored: {n}. Flags answered: {n}. Sandra has noticed both. Sandra has noticed that you noticed.`
- `Audit: Queue number (the number of the queue you are in): 41.`
- `You have stamped yourself APPROVED. The stamp is slightly crooked. This is within tolerance. It is also you.`
- `Valued Employee has been found broadly consistent, with 38 percent signature drift.`
- `Form F-0 (Request to Have Never Begun) has been approved. You are now at Form F-1. Welcome. Please take a form.`
- `Careers Completed: {n}. A certificate has been issued. The certificate requires a form to confirm it is a certificate.`
- `Certificate of Completion (Incomplete). Signed S. in handwriting that nobody is allowed to look at too long.`
- Window sign: `Back at 7:30`.
- Post-reset: `Form F-1 (Application to Begin). The same form. A little more hopeful. The footer says: continued from 1 of 1, one career ago.`
- Door note: `Back soon.`
- Closing Management: `Congratulations. You have reached the end of the forms. The forms continue.`
- Rumour: `There is, however, a very thin new rumour that the stapler is unionizing.`

### 8.12 Restructure (Beat 9), sincere, quiet
- `The office has been restructured. Everything is where it was, but called something else, and nobody is happier.`
- `Form 27B/6 has been approved. Form 27B/7 was destroyed in 1998. A clerk has apologised for this, in person, to the wall.`
- `Page 27B of 6.`
- `Sandra: Take a break. The forms are not going anywhere. That is the problem with them. S.`
- `Sandra: You are doing fine. The forms don't have to be. S.`
- `Sandra: Please do not file this note. It is a note. S.`
- `Dennis (Plant) has been promoted to Senior Form Handler. Dennis (Plant) did not attend the ceremony because Dennis is a plant.`
- `NOW SERVING: {n}. Your number is {n}. The difference is zero. We are not sure what to do with a difference of zero.`
- Lull marker (Clerk's Strip, once the 20s lull begins): `The stamps have gone quiet for a little while. That is allowed.`
- Lull end: `The stamps are back. They were never gone. They were resting.`

### 8.13 Idle, spam, secrets, misc
- idle note: `Are you still there? -- S.`
- idle note clicked: `You are the first person to answer one of Sandra's notes. Please do not file this.`
- idle closed: `The office has closed for the day. You are the day. The lights are on for you only.`
- idle return: `You returned. The office had not noticed. The office is delighted, and says nothing, which is how it shows it.`
- spam overheat: `Please slow down. The forms are very important and cannot all be equally important at the same speed.`
- spam duck: `The stamp rack has overheated and been confiscated. A rubber duck has been issued. It stamps QUACK.`
- duck approved: `Duck approval is valid until Friday.`
- H-12 floating form: `Form H-12 (Request for Gentler Treatment). One tickbox: I will be gentler.`
- gentler ticked: `Thank you. The stamp has been told. It says it is willing to try again, with a different attitude.`
- stamp back: `The stamp has returned by itself. It says it wanted to.`
- blank form lines: `A blank form. Finally, a form that asks for nothing.` / `Blank form number {n}. Sandra's door light has flickered for one (1) second.` / `Sandra has signed it. Sandra has never signed anything.` / `We will not be discussing this.`
- knocker: `That was a knock. We heard it too. We have decided to say nothing.`
- knocker repeat: `The door does not answer again. The knock count has been capped at 7 1/2, quietly, by someone with a pen.`
- name trap: `CONFLICT OF INTEREST. You are not Sandra. Sandra has been notified. Sandra does not mind. Sandra minds.` then after 3s: `The form has been approved anyway. A conflict dividend of 1 Meh has been issued.`
- resize narrow: `Your window has narrowed. The form has been folded to fit and is now in three. A form in three is a different form: F-3F.`
- resize wide: `The form has been unfolded. It has been unfolded into the same form, which is not the same form.`
- form zero: `Form Zero has been approved. Those forms never happened. We are so relieved. We did not enjoy them.`
- Kevin: `A pink clerk has adopted the pink copy. His name is Kevin. Kevin has a tiny desk. Kevin was here.`

(Counting every bullet above: well over 160 distinct lines.)

---

## 9. SECRETS AND RARE EVENTS

1. **Blank page (secret achievement)**: submit a completely blank form (every field empty, stamp optional) at the tube **7 times in total** (stat `blank`, persisted across sessions). Each time Sandra's door light pulses 1s. On the 7th: the door opens 7.5cm (CSS), a blank form slips out signed `S.`, the module goes quiet for 6s (no sfx, no awards), then Management says `We will not be discussing this.` Unlocks the cosmetic stamp `S in a circle` (slot 6) and `tiny-bureaucracy.blank-page`. A "blank form" in Beat 1 (the one-field Name form) counts when Name is empty. (An empty form is always approved - emptiness is never a rejection.)
2. **Knocker (secret achievement)**: knock 7 times then once more with Shift held (a half-knock, count shows `7 1/2`). The door answers with one soft knock (a CSS jiggle; `api.sfx('tick')` quiet). Management line. Further knocks: no answer; the count caps at 7 1/2 on the audit form.
3. **Name trap**: Name `Sandra` (any case) in any field -> stern sticky note + after 3s the form is approved anyway with 1 Meh; once per form.
4. **Resize secret**: root width < 500px while a normal form is active -> the form folds into **three CSS panels** (a column-count/grid change) and the header becomes `F-3F` (same fields rearranged, plus a header tag; no mechanical change) and the line; widening again unfolds it with the second line. Debounce via `api.on(window,'resize')` + `api.setTimeout` 150ms.
5. **Form Zero** (rare event): 1 in 50 approvals (never in Beat 1, 2, never twice in a row): a titleless blank form appears. Filing it empty is auto-approved and 'deletes' the last 3 forms (a sound, the forms-filed counter in the footer decrements by up to 3 but not below 0 and the stat is not decremented). Pressing `U` within 5s undoes it ("Requests Form U" line). Otherwise line.
6. **Kevin (secret)**: press the Press Pad and release in the faint zone (below 0.55) **three times in a row** -> the pink clerk adopts the copy and Kevin is adopted (Kevin appears as a pink corner on later triplicate forms reading `Kevin was here`; persisted as `kevin`). Achievement `tiny-bureaucracy.pink-question`.
7. **Toast cameo** (see 5.9), **Gerald**, **Dennis**, **Stapler** (see 5.9).
8. **Door crack**: during the Restructure the door is open a crack; clicking it gives a line (8.12) and 0 Meh.
9. **Dolores first**: at the very end of the ending Dolores is at the front (8.7 last line).
All secrets pay at most 10 Meh.

---

## 10. BEHAVIOR ON IDLE AND SPAM

**Idle** (no pointerdown/keydown/input in root for the time, ticked by the master `api.setInterval(250)`):
- **45s idle**: the desk goes quiet (the in-tray count stops ticking), a note slides out from under Sandra's door and across the floor onto the desk (CSS translate keyframes, 3 steps): `Are you still there? -- S.` Clicking it: +0.5 Meh, the line. Only one per idle stretch; selftest: 4s.
- **3 minutes idle**: the office **closes for the day**: root gets a dim filter class (`filter: brightness(.55) sepia(.3)` on the desk), the door sign flips to OUT, a janitor's mop emoji slides across the bottom (CSS animation, 1 element), Management says the closing line. Any input removes it and plays the return line; `tiny-bureaucracy.last-employee` achievement (not secret) on return.
- All idle timers reset by any input; unlimited repeats are guarded by a flag.

**Spam**: track timestamps of stamp slams and tube clicks in rolling windows. **12+ stamp slams in 3000ms OR 20+ tube clicks in 3000ms** (selftest-friendly thresholds identical):
- the stamp rack overheats (CSS shake, `api.sfx('buzz')`), the armed stamp is **confiscated for 7500ms**, the rack shows a rubber duck stamp (`QUACK`, cheerful yellow) that is accepted by the tube as APPROVED (the line `Duck approval is valid until Friday.`), and a floating `H-12` form (one tickbox `I will be gentler`) appears. Ticking it restores the stamp early and gives 0.5 Meh and the line. Dismissing/ignoring does nothing; the stamp returns by itself after 7.5s. During confiscation, stamping the form with the duck counts as a stamp. Do not re-trigger while confiscated; stamp the cooldown for 10s after restore. Stat `quacks`; secret achievement `tiny-bureaucracy.duck`.
- Also: master rate limit on `api.say` (3.9), and the tube ignores clicks during `filing`.

---

## 11. IMPLEMENTATION HINTS

### 11.1 Architecture (build order, each step leaves a valid, playable file)
1. Skeleton: IIFE, `P.injectCSS`, `P.addAchievements`, `P.registerModule`, `mount` returning `{destroy}`; helper `H` (shuffle-bag factory, `fmt`, `clamp`, `safeNum`).
2. State object `S` (single source of truth) + `render()` that rebuilds the form DOM from `frame` (keep it under ~40 nodes); input handlers write back to the model.
3. F-1 + APPROVED stamp + tube + approval -> next form (P0 playable). 
4. Fields, dropdown, checkboxes, tilt stamp, correction forms (P0).
5. Stack/push/pop/breadcrumb/depth (P0).
6. Signature + knock + flags (P1).
7. Queue + window + Dolores (P1). Press pad + triplicate + ink pad (P1).
8. Depth beat additions, cabinet + loop (P1), Restructure + audit + ending (P1).
9. Secrets/idle/spam (P1), cameos (P2), mutators and F-3F (P2).
Master tick: **one** `api.setInterval(tick, 250)` for beatSeconds, idle checks, queue stepping, flag spawn, door light expiry, spam windows; avoid many small intervals. Use `api.setTimeout` for one-offs but tag callbacks with a `token` (`S.token++` on remount/frame change) and bail out if stale.

### 11.2 Selftest handling
`api.selftest`: shrink tube to 50ms, queue to ~2s, Stamp Window to 2500ms, idle thresholds to 4s/9s, `minSeconds` to 0, press time unchanged but auto-release in 400ms. The fuzz clicks randomly: **every state must be survivable** (stuck overlays closed by Esc or button; cabinet has a `Close drawer` button).

### 11.3 Visual/CSS conventions
Prefix `m-tiny-bureaucracy-`. Use thick 3px outlines `#2A2A3C` and sticker shadows `4px 4px 0 #2A2A3C`. Animations use transform/opacity only. Reduced motion: stamp slam becomes fade, capsule teleports with fade, no door shake, no tilt animation (static tilt still applied to marks). Respect `prefers-reduced-motion` with `matchMedia` read once (guarded) in addition to a CSS media query.

### 11.4 Signature drift (exact formula)
Normalize each polyline to points in a 240x80 box. Features: `len` (sum of segment lengths), `w` and `h` of the bbox, `n` point count (after downsampling to <= 64 by index stride). `drift% = 100 * mean( |len-L0|/max(L0,1), |w-W0|/max(W0,1), |h-H0|/max(H0,1), |n-N0|/max(N0,1) )`, each term clamped to [0,2], result clamped to [0,100], rounded to integer. If current n < 3 -> drift = 100. If the one on file has `L0 < 10` it is replaced by the new signature (no divide-by-zero). Gauge shows `Drift: NN%`. **Never** display NaN: wrap with `Number.isFinite` else 100.
Sign-by-typing: for each character code `c` produce 6 points `x = i*10 + 6*sin(c + k)`, `y = 40 + 18*sin(c*0.7 + k*1.3)`, deterministic per name.

### 11.5 Persistence helpers
`load()` reads each key with sanitized defaults; `sigOnFile` must be `Array.isArray` of `[x,y]` with finite numbers (else null).

### 11.6 Careers, the not-ending reset
`resetCareer()` sets `S.stack = [newFrame('F-1')]`, `S.beat = 0` (career 2+ quotas halved), clears flags/tickets/queue/overlays, **keeps** `sigOnFile`, `careers++`, `knocks/blank` counters (persistent), keeps unlocked stamps, and renders. Never leaves `S.stack` empty; do the swap in one assignment.

### 11.7 DOM and perf
Nodes <= ~250. Re-render the form region only; keep other regions mounted. Use `textContent` always (never `innerHTML` with user text).

---

## 12. THE NOT-ENDING (after Beat 10, roughly the 10th minute)

1. Beat 10 audit form `A-1` appears with pre-filled lines (name, signature on file thumbnail, knocks, flags ignored, queue number). You stamp yourself APPROVED (any stamp). Fanfare (`api.sfx('fanfare')`).
2. A hush (2 seconds, no sfx). Form `F-0 (Request to Have Never Begun)` is delivered; it asks for ONE field: Name. Type any name (or nothing).
3. On filing: the fanfare is enormous: `api.sfx('tada')`, `api.confetti(undefined, undefined, 120)`, door light flickers once at the exact moment of the stamp, the wall clock shows 7:30, queue display shows `YOUR NUMBER = NOW SERVING` for exactly one second, then a **certificate** appears: `Certificate of Completion (Incomplete)` signed `S.`, and the front desk window closes with a sign `Back at 7:30`.
4. Then a single `tick` from the in-tray, a sheet arrives: `Form F-1 (Application to Begin)`. `Careers Completed: N+1` appears in the footer line, `Depth: 1`. Footer on F-1 reads `Page 1 of 1 (continued from 1 of 1, one career ago)`. A tiny note on Sandra's door: `Back soon.` Management closing line. The achievement `tiny-bureaucracy.career` fires. Rumour line fires once.
5. The player may do it all again: quotas halved (careers 2+), one mutator each beat, Meh still tiny. No victory because there was no goal.

---

## 13. ACHIEVEMENTS (declare in the file via `P.addAchievements`)

| id | name | desc | secret | reward | trigger |
|---|---|---|---|---|---|
| `tiny-bureaucracy.first-form` | Grand Chancellor of the Preliminary Paperwork | Get Form F-1 (Application to Begin) approved. This is the first thing anyone does, and our proudest. | no | 2 | first approval |
| `tiny-bureaucracy.triplicate` | Knight Commander of the Triplicate Realm | Complete one triplicate with a clean press in the green band. The pink copy is held in your honour. | no | 3 | clean press |
| `tiny-bureaucracy.waited` | Eternal Warden of the Ninth Circle of Waiting | Have your queue number called and answer the Stamp Window in time. You are 41. You have always been 41. | no | 3 | window answered |
| `tiny-bureaucracy.depth-seven-half` | Archduke of Depth Seven and a Half | Reach request depth 7 1/2. Nobody knows what the half is. You are standing in it. | no | 3 | depth_max >= 8 |
| `tiny-bureaucracy.cycle` | Dignified Participant in the Cycle | Attach your original F-1 and acknowledge that it requires proof of the form requiring it. | no | 4 | loop acknowledged |
| `tiny-bureaucracy.career` | Eternal Provisional Laureate of the Final Form, Which Is the First Form | Complete F-0 (Request to Have Never Begun) and be handed Form F-1. | no | 10 | ending |
| `tiny-bureaucracy.blank-page` | Sovereign Emperor of the Blank Page | SECRET. Submit seven blank forms and receive the only signature Sandra has ever given. We will not be discussing this. | yes | 10 | blank x7 |
| `tiny-bureaucracy.knuckle` | Supreme Bruised Knuckle of the Locked Door | SECRET. Knock seven times, then once more with your Shift key. The door knocks back, and then says nothing, as is policy. | yes | 10 | 7+shift |
| `tiny-bureaucracy.duck` | Overfull of Ink | SECRET. Stamp so fast the stamp is confiscated and a duck is issued. Duck approval is valid until Friday. | yes | 5 | spam |
| `tiny-bureaucracy.pink-question` | The Pink Question | SECRET. Release the press faintly three times in a row. A pink clerk named Kevin adopts the copy. | yes | 5 | Kevin |
| `tiny-bureaucracy.last-employee` | Last Employee Standing | Leave the office for 3 minutes, then return to find it had closed for the day. You are the day. | no | 3 | idle 3 min |

---

## 14. VISUAL DESIGN

Palette (Lobby family: cheerful dysfunctional intranet): page cream `#FFF4DC` with a faint dotted-paper radial-gradient; desk wood `repeating-linear-gradient(90deg,#C8935A 0 14px,#BC8650 14px 28px)` with a 3px dark outline; paper manila `#F3E3B3` with ruled blue-grey lines (`repeating-linear-gradient(transparent 0 21px, #aab 21px 22px)`); ink `#2A2A3C`; mint `#A8E6CF` (approved), coral `#FF7F7F` (queue digits, HMM), mustard `#F2C14E` (flags, focus rings), lilac `#C9B6E8` (Sandra's door glow, SEEN, The One On File, anything Sandra-ish), yellow copy `#FFF29A`, pink copy `#FFC9D4`, blue stamp `#5B7BD5`.

Tricks (CSS/SVG/canvas only):
1. Paper pile: three pseudo-sheets behind the form (rotate 0.4-1.2deg, offset 3px); push/pop animations with `cubic-bezier(.2,.9,.2,1.1)`.
2. Stamp: double border (4px solid + inset outline), 900-weight uppercase, rotation = tilt, `mix-blend-mode: multiply`, opacity .85, SVG roughen filter (feTurbulence baseFrequency .04, feDisplacementMap scale 3), splat ring with a radial-gradient scale-up.
3. Tube: inline SVG path pipe; the capsule moves by animating `stroke-dashoffset` / using `getPointAtLength` with a progress from `api.requestAnimationFrame`; puff circles at the mouth.
4. Sandra's door: 120x180 CSS rectangle, frosted gradient panel, backlight div (lilac glow, opacity state), IN/OUT sign on a CSS nail; Sandra is NEVER drawn, not even as a shadow. Notes under the door: 3-frame translate keyframes. Door crack (Beat 9): a vertical lilac slit.
5. Queue display: dark rounded panel, tiny caps label, big monospace coral digits with `text-shadow` glow; digits roll with a two-frame translateY.
6. Signature canvas: 240x80 with a dotted baseline, The One On File drawn faintly in lilac beneath, a gradient drift gauge.
7. Triplicate: three papers white/yellow/pink offset 6px with a carbon-smudge overlay whose opacity tracks press progress; Press Pad is a rounded button with a conic-gradient ring and a green band marker.
8. Filing cabinet: CSS grid of drawers with brass pill handles, a half-height `7 1/2` drawer; slide with translateY.
9. Wall clock: CSS circle with two hands rotated to 7:30 and a second hand ticking backwards.
10. Breadcrumb chips: small rounded tabs, collapse after 6.
Emoji are props only (stamps are text; paperclip 📎 rotated -20deg; Dennis 🪴; toast 🍞; Gerald 🥔 only for his smudge; tube funnel overlay). Restructure: `transform: rotate(3deg)` on the desk, handwriting-ish font stack `'Segoe Print','Bradley Hand','Comic Sans MS',cursive`, softer cream, warmer light. Responsive: 3 columns above 900px; trays under the form 520-900px; below 520px full width form, door/clock/queue in one row (shrunk), stamp rack a horizontal scroll strip of 44px+ buttons; everything works at 360px.

---

## 15. RISKS: THE 5 MOST LIKELY IMPLEMENTATION BUGS

1. **Stack push/pop desync and double-pop.** The DOM is rebuilt from frames; if a pop fires twice (tube click spam, Esc during `filing`, the loop unwind timers overlapping, destroy mid-unwind) the stack can empty (depth 0, `stack[0]` undefined) or the parent loses typed field values. Mitigation: `filing`/`unwinding` guards, `S.token` on every timer, read from `frame.fields` not the DOM, a `ensureStack()` that rebuilds F-1 if `stack.length === 0`, and a unit-like assertion in selftest (never render with empty stack).
2. **Pointer-hold and stamp follower leaks.** The Press Pad and the floating stamp rely on pointer events that never complete under fuzz (no `pointerup`, `pointercancel`, window blur). A stuck press never ends and the stamp follower keeps rotating from NaN velocity (dt = 0). Mitigation: auto-release at 1.56s and on `lostpointercapture`/`blur`/`keyup`, guard `dt <= 0` and `Number.isFinite`, one follower element reused (never cloned), listeners via `api.on`.
3. **Stale timers and overlapping events after remount/frame change.** The tube arrival, queue steps, Stamp Window expiry, door light, idle note and quiet-lull callbacks capture old frames/state. After `destroy` or a remount they fire into a dead DOM, throw, or mutate the new state (duplicate approvals, two Stamp Windows, two lulls). Mitigation: a single master tick, every deferred callback checks `token` and `S.dead`, one-shot timers store handles in `S.timers` and clear on state change.
4. **Soft locks (no legal action available).** Examples: stamp confiscated with the duck unavailable; an attach slot pointing to a frame that cannot be pushed (depth cap); cabinet overlay with focus/Esc not wired; the Restructure lull disabling the tube; a correction form that rejects again; beat quota never reachable because the new beat's required feature failed to unlock. Mitigation: validate that every state has an enabled path, correction forms always approve at `rejectStreak >= 1`, overlays always have a Close button, a watchdog that after 90s without a filing silently converts the active form to a plain one-field F form.
5. **Signature canvas and drift math.** Pointer-to-canvas coordinates break under CSS scaling, narrow layouts and the desk's 3deg rotation (so the stroke lands in the wrong place); zero-length strokes (a fuzz click) cause divide-by-zero / NaN in drift and the gauge, and corrupt `sigOnFile` in `api.save`. Mitigation: map through `getBoundingClientRect` and scale factors, treat n < 3 as drift 100, `Number.isFinite` guards everywhere including the gauge text, replace a degenerate stored signature, cap stored points at 64 and sanitize on load.

(Honorable mentions: unbounded DOM from flags/marks/logs; `NaN`/`undefined` in form numbers (always format through a function); letter shortcuts firing while typing in inputs; `api.say` flooding.)
