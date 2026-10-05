# DESIGN BRIEF: SPREADSHEET OF MEANING (id `spreadsheet-meaning`)

Final brief by the showrunner. Builder: read SPEC.md and VOICE.md first, then build `games/spreadsheet-meaning.js` (ONE file, target 1500-1750 lines, hard cap 1800) from this file alone. Where this brief and SPEC.md conflict, SPEC.md wins. Every line of dialogue and every data pool in sections 5, 12 and 13 is final and verbatim: copy it, do not improve it, do not explain it. Do not ask anyone anything; where something is unspecified, decide sensibly.

---

## 1. CONCEPT

You open a real, tiny, working spreadsheet called `Meaning_Q3_DRAFT(2).xlsx`. You type formulas and the sheet answers with total sincerity: `=FEEL(B2)` returns "mildly", `=SUM(B2:B5)` returns "enough", `=2+2` returns "4 (technically)". The chart plots Nothing against Also Nothing with a correlation of 1.00. The pivot table is a literal table on a brass hinge and, if you spam it, becomes a ceiling fan. A fake half-height row 7 1/2 sits between rows 7 and 8 and you can arrow into it. The Totals row is the quiet existential experience: select it, the sheet dims, a grey line types itself, and you must hold perfectly still for 5 seconds or the total stops mid-word.

The player's job is to enter formulas and watch the sheet respond. The Meaning Total in H1 is 7 1/2 whatever you do. A "Quarter Close" bar fills over about 9 to 11 minutes; at 100% Management announces the close, a Close Workbook dialog offers Yes / No / Maybe / Cancel (all four do the same thing), confetti falls for nothing, and the workbook reopens as Q4 exactly as it was at 0:00 except the half row is a little more confident. Q5 is on a different sheet.

Pillars (cut anything that does not serve one):
1. **A real toy.** Typing, selecting, dragging, formulas, undo, all genuinely work. The joke is that every result is a feeling.
2. **Every action gets a specific, different reaction** (shuffle bags per verb). Errors are the reward, never the failure.
3. **Holding still is the best verb** (the Quiet Total). It is played straight, then gently punctured.
4. **7 1/2 is the thing Management quietly protects.** Quirk, then rule, then devotion.
5. **Escalation arc in about 10 minutes** (VOICE.md): normal, weird, bureaucratically unhinged, strangely touching, back to normal like nothing happened.

Registration:
```js
P.registerModule({ id:'spreadsheet-meaning', title:'Spreadsheet of Meaning',
  tagline:'Every cell returns a feeling. The totals row is looking at you.',
  icon:'📊', category:'game', unlockCost:0, tags:['spreadsheet','formulas','feelings'], mount })
```
`api.setTitle('Meaning_Q3_DRAFT(2).xlsx - Spreadsheet of Meaning')` (the filename part changes per quarter, see 14; keep under about 60 characters).

### What was kept from the three pitches, and what was cut

KEPT: the real grid with a real fake row 7 1/2 and a TOTAL row; the hand-written recursive-descent parser; feelings as results (40-word bag, deterministic hash plus a 30 s "drift"); `=TUESDAY()` as a permanent autocomplete suggestion (pitch 3); the always-4:17 clock; fill handle with degraded photocopies; autocorrect as a character (Management Suggests); Sandra's escalating comments; the hinged pivot that becomes a ceiling fan on spam; Chart of Nothing with googly eyes and drifting dots; the Quiet Total hold-still beat with 12 quiet lines; macro with Past You ghost cursor (always 7 1/2 s); undo that undoes Thursday; Holding Hands circular references; Dennis at Z999; Gerald, Toaster, Missing Sock; autosave of absence idle ladder; overheat on spam; the Close Workbook not-ending with Q4/Q5 loop; the Report/Quarter Close bar; Anonymous Moth and Anonymous Tuesday as a small cameo; the `#OK` merge after the first close.

CUT (unbuildable or weak in one vanilla file): real transposition of the main grid (pivot is its own tab/panel instead), HTML5 drag and drop of pivot fields (click a field chip to move it), a chart as a separate sheet tab (it is a collapsible tile above the grid so cells can be dragged onto it), SMIL animation, canvas, composed-feeling generator (replaced by the 40-word bag plus 6 rare gold feelings), the `+` add-sheet tab as anything but a tiny stretch gag, the VLOOKUP/COUNTIF fidelity (they return fixed jokes), a real worksheet-calc dependency graph (re-evaluate every visible formula cell on every change, there are at most about 112 cells), conditional-formatting policy panel (folded into the Format button).

---

## 2. SCREEN LAYOUT

Everything lives in one wrapper `div.m-spreadsheet-meaning-wb` inside `root` (a bordered "workbook window"). CSS custom properties are defined on that wrapper (names `--sm-*`). Top to bottom:

```
+-------------------------------------------------------------------------+
| TITLE STRIP  (o)(o)(o)  Meaning_Q3_DRAFT(2).xlsx        Autosave: Saving...|
+-------------------------------------------------------------------------+
| RIBBON (chunky buttons, revealed in order, wrap on narrow)               |
| [Recalc] [Undo][Redo] [Chart] [Format][Sort by Vibes] [Pivot] [Rec][Stop][Play] [Close Workbook] |
+-------------------------------------------------------------------------+
| NAME BOX (input, 64px) | fx | FORMULA INPUT                  [Formula] |
| FX CHIP ROW (horizontal scroll)  =FEEL(  =SUM(  =IF(  =HOPE()  ...       |
| (autocomplete dropdown floats under the formula input)                   |
+-------------------------------------------------------------------------+
| CHART TILE (collapsible, hidden until unlocked, 150-190px, inline SVG)   |
+-------------------------------------------------------------------------+
| GRID WRAPPER (overflow:auto inside itself; sticky col headers + gutter)  |
|      A     B     C     D     E     F     G     H                         |
|  1  Purpose Target Actual Feeling Variance Lunch MeaningTotal 7 1/2      |
|  2  ...                                                                  |
|  7  ...                                                                  |
| 7 1/2 (half-height row, tilted hand-written label)                       |
|  8..12                                                                   |
| 13  TOTAL row (sage, thick top border)                                   |
|  (overlays inside wrapper: ghost cursor, heart, Dennis panel, fan, lock) |
+-------------------------------------------------------------------------+
| QUIET FOOTER STRIP (row under grid): the Quiet Total line types here     |
+-------------------------------------------------------------------------+
| SHEET TABS: [Sheet1] [Feelings] [Pivot] [Sheet 7 1/2]     (newest bounces)|
+-------------------------------------------------------------------------+
| STATUS BAR: Ready | Count/Sum/Average | Completeness: 61% | Q3 | Day |    |
|  4:17 :SS | Quarter Close ===---- 37% | People viewing: 1 | fan icon       |
+-------------------------------------------------------------------------+
Overlays (absolute inside root, max one modal at a time): Close Workbook dialog,
audit/certificate card, Sandra all-comments panel, overheat progress bar.
The Sandra bubble is ONE reused absolutely positioned div inside root (no body appends).
```

Responsive (measure `root.getBoundingClientRect().width`, not window width, plus CSS container-ish media queries on the wrapper where plain `@media` is enough):
- 360px: ribbon wraps to 2 lines (or scrolls horizontally), name box above the formula input, chip row scrolls horizontally, grid scrolls horizontally INSIDE its own wrapper (cell width 72px, sticky gutter + sticky header), status bar wraps to 2 rows. A `Formula` button (visible on `(pointer:coarse)` or width < 700) toggles the chip row so a phone player never needs a keyboard shortcut. All ribbon buttons, chips, tabs and the fill handle hit area are >= 40px on coarse pointers (fill handle is 10px visually inside a 40px transparent hit area on coarse pointers).
- Desktop: cell width 92px, row height 30px; half row 16px; total row 34px.

DOM budget: grid is built ONCE (header 8 + gutter 14 + 8x14 = 112 cells plus a few) and updated by `textContent`/class patching only; chart dots capped at 12 live; comment triangles are classes on existing cells; Feelings tab is built lazily on first open (40 buttons); autocomplete is one reused element. Target under 450 elements in the root at rest.

---

## 3. DATA MODEL, GRID AND CONTROLS

### 3.1 Sheets and addresses
- Columns A..H. Rows are `ROWS = [1,2,3,4,5,6,7,7.5,8,9,10,11,12]` plus the TOTAL row `13`. Address strings: `"C2"`, half row `"C7.5"` (shown to players as `C7 1/2`; the gutter label reads `7 1/2`), total row `"C13"`. Outside the grid, `Z999` is Dennis (8.4).
- State: `sheets = { s1: {raw:{addr:string}}, s75: {raw:{...}} }`. A cell is raw text (what the player typed) and a cached evaluated result `{t, v, disp, tip}` (`t` = 'num' | 'str' | 'feel' | 'err' | 'empty' | 'sum'). Re-evaluate all visible formula cells after any commit, recalc or drift tick (cheap).
- Selection: `sel = {a, r}` anchor and range end (single cell if equal), arrow keys move `sel`, Shift+arrow/drag extends a rectangle. Name box (an `<input>`, also a Go To: type `Z999` or `C7.5` and Enter) shows the address (half row shown as `7 1/2` style, e.g. `C7 1/2`).
- Roving tabindex: exactly one gridcell has `tabindex=0` (the selected one), others -1. `role=grid` > `role=row` > `role=gridcell|columnheader|rowheader`. Cells are `<div>`s with `cursor:pointer` (so the fuzz harness clicks them). `aria-label` on each cell is patched on change ("B2, 7" or "D2, mildly"); never put `undefined`/`null`/`NaN` in a label.

### 3.2 Pre-filled Sheet1 (at mount and after every quarter reset)

| | A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|---|
| 1 | Purpose | Target | Actual | Feeling | Variance | Lunch | Meaning Total | `7 1/2` (protected, see below) |
| 2 | Morale | 7 | `=HOPE()` (flickers, settles on #PENDING) | `=FEEL(C2)` | a gentle shrug | | | |
| 3 | Synergy | 3 | `=HOPE()` | `=FEEL(C3)` | | | | |
| 4 | Tuesday | 0 | `=HOPE()` | `=FEEL(C4)` | | | (G4 is Gerald's cell, see 12) | |
| 5 | Socks | 8 | 7 1/2 (text) | `=FEEL(C5)` | one missing | | | |
| 7 1/2 | filed under 7 1/2 | | | | | | | |
| 13 TOTAL | `Σ` (the Quiet Total cell, see 7.8) | B13..G13: `=SUM` of the column above (a verdict word, see 5.3) | | | | | | H13: `7 1/2` |

Row 1 is the header row (lilac-tinted text). Row gutter reads `1 2 3 4 5 6 7 7 1/2 8 9 10 11 12 13`. In Q4 and later, C1 reads `slightly more` (see 14).

**H1 (the Meaning cell) is protected.** Whatever you commit into it is shown for 600 ms, then it snaps back to `7 1/2` with the line from `m:spreadsheet-meaning:meaning`. Delete on H1 gives the H1 delete line. H13 is also always `7 1/2`.

### 3.3 Controls (module-scoped via `api.on` on `root`, never window/body)

Mouse: click selects (mustard sticker outline plus 3px ink shadow); drag across cells = range select; double-click or F2 = edit in the cell; the formula bar is a real `<input>` and edits the selected cell too; click the red-triangle corner of a commented cell = "Sandra has seen that you have seen this."

| Key | Action |
|---|---|
| Arrows | move selection. Down from row 7 lands on row 7 1/2, then row 8 (up reverses). Clamp at edges. |
| Shift+Arrows | extend range |
| Enter | commit edit and move down; when not editing, starts edit (F2 same) |
| Tab / Shift+Tab | commit and move right / left (when the autocomplete dropdown is open, Tab ACCEPTS the highlighted suggestion instead) |
| Shift+Enter | commit and move up |
| Esc | cancel edit; if not editing, collapse range to single cell |
| any printable key (no Ctrl/Alt) on a selected cell | start editing with that character as the initial value (do not lose the first character; set the editor value in the keydown, then `preventDefault`) |
| Delete / Backspace (not editing) | clear selected cells; cell protests (delete bag) |
| F9 or Ribbon Recalc | recalculate feelings: bump `driftTick`, fan-of-cards flicker, 0.2 Meh |
| Ctrl+Z / Undo button | see 7.9 |
| Ctrl+End | jump to Z999 (Dennis panel, 8.4) |
| Ctrl+Home | jump to A1 |
| Home / End | column A / column H of the current row |
| Ctrl+S | `Saved? Possibly.` line (misc bag) |
| Ctrl+C / Ctrl+V | no clipboard API at all: say the paste line; V pastes the last copied raw string via an in-memory variable |

Touch: tap = select, second tap on the same cell = edit; `Formula` button shows the chip row; chips insert text at the caret of the formula input and focus it; long-press (400 ms) arms the fill handle; the grid wrapper scrolls horizontally inside itself (`touch-action: pan-x pan-y` on the wrapper; `touch-action:none` on the fill handle and the Σ cell).

Commit pipeline (one function `commit(addr, raw, opts)`):
1. push `{sheet, addr, prev}` on the undo stack (cap 40);
2. apply autocorrect (7.2) if raw is plain text;
3. store raw; re-evaluate; classify the result verb: `number | text | formula | feel | error`;
4. pick the reaction from that verb's shuffle bag (never the same line twice in a row); award per section 9 with the soft ceiling; stat counters; then secrets/rare checks (11); then patch the DOM.
Reveals never depend on `api.say` being accepted (the narrator coalesces): do the UI change first, the speech second.

### 3.4 Modes (exclusive `mode` variable; reset on destroy)
`normal | editing | quiet | locked (overheat 3 s) | playing (ghost macro) | dialog (close workbook) | dennis (Z999 panel)`. Input per mode: `editing` routes keys to the editor; `quiet` cancels on movement/keys (7.8); `locked` ignores clicks/keys on the grid (visually only; clicks still no-op safely); `dialog` traps keys inside the dialog (Esc = Cancel, which does the same as all the others); `dennis` Esc or the Back button returns. Starting a modal from another mode (e.g. the close dialog while quiet or locked) must first cleanly end the old mode.

---

## 4. FORMULA ENGINE (no eval, no `new Function`)

Hand-written tokenizer plus recursive descent, about 140 lines.

Grammar:
```
expr  := cmp
cmp   := add ( ('='|'<>'|'<'|'>'|'<='|'>=') add )?
add   := mul ( ('+'|'-'|'&') mul )*
mul   := unary ( ('*'|'/') unary )*
unary := '-' unary | primary
primary := NUMBER | STRING | REF (':' REF)? | NAME '(' [expr (',' expr)*] ')' | '(' expr ')'
```
Strings accept both `"x"` and `'x'`. `REF` = `/^[A-H][0-9]{1,2}(\.5)?$/i` (the half row is `C7.5`). Anything else after `=` that is a bare word is an unknown name. Evaluation depth capped at 40; a `visiting` set per evaluation detects circular references.

Value kinds: number; string; range (array of values); error object `{err:'#MEH!'}`. Empty cell = empty string with flag empty. Never produce `NaN`, `Infinity`, `undefined` or `null` in any display: pass every number through `fmtNum(n)` which returns `'7 1/2'` for 7.5, `'0'` for non-finite, and rounds to at most 2 decimals.

### 4.1 Display rules
- Plain number typed in a cell: shown as `fmtNum`. (Typed numbers over 7.5 get the grey "Cheerful (Grey)" tint only in Format "Mood" mode, see 7.3.)
- Formula that is pure arithmetic on numbers (`=2+2`, `=B2*3`): shows `N (technically)`. Exactly `=42`: shows `Close. Try 42.5.` Exactly `=1+1`: shows `2, with feelings`. Result 7.5 anywhere shows `7 1/2`.
- Plain text: shown as typed (after autocorrect).
- Every result cell gets `title` = full result text, plus extra tooltip for SUM (`Sum: 18 (the cell would not say)` where the true sum is computed and shown via `fmtNum`).
- Long text is clipped with an ellipsis; typing over 80 characters spills visually into neighbouring cells (`overflow:visible` on that cell for this case) with the overflow line (12).

### 4.2 Function table (case-insensitive; unknown name = `#NAME?`)

| Function | Returns |
|---|---|
| `FEEL(x)` | a word from the 40-word FEELINGS bag at index `hash(addr + '|' + String(rawOfArg) + '|' + driftTick) % 40` (deterministic until a drift or F9). Empty cell, range or no argument: `#FEEL!`. Counts toward the "formulas that return a feeling" tally. |
| `SUM(range...)` | a VERDICT word (5.3), always, never the number. Tooltip carries the true sum. Empty range: `#PURPOSE?`. |
| `AVERAGE(...)` | `average-ish` |
| `MAX(...)` | `Tuesday` |
| `COUNT(range)` | `N (some of them)` where N = ceil(non-empty cells / 2) |
| `COUNTIF(range,"x")` | `plenty (7 1/2)` |
| `IF(a,b,c)` | `b / c` (both branches, as text) and the line `we are not choosing` (if lines) |
| `VLOOKUP(...)` | `It was in the other room` |
| `TODAY()` | `Tuesday` |
| `NOW()` | `recently` |
| `RAND()` | `7 1/2` |
| `SQRT(x)` | negative: `a reasonable concern`; else `about N (give or take)` |
| `ROUND(x)` | `mm`. Special case: first argument is a call to MEANING (inspect the AST): `8`, plus the "eight" line (11.3). |
| `HOPE()` | `#PENDING` (a plain text result, not an error) |
| `DREAD()` | `Thursday, probably` |
| `TOAST()` | `toast` (Toaster cameo, 12) |
| `GERALD()` | `potato` if flag `metGerald` is set, else `#NAME?` |
| `SOCK()` | `#N/A-WELL` (shown as an error-styled mood) |
| `DENNIS()` | `+0.3 cm` and adds one real ascending point to the open chart (Dennis series) |
| `BOSS()` | `Management is the sheet` (tooltip: `Management is not in the sheet. Management is the sheet.`) |
| `TUESDAY()` | `You came` (the running-gag payoff, 12; sets `tuesdayTyped`) |
| `MEANING()` | secret, see 11.3 |
| `YOU()` | the player's name, ONLY after Sheet 7 1/2 has unlocked (Beat 9 or MEANING); before that `#YOU!` |

### 4.3 Errors (custom, mood-coded; the error is the reward)

| Code | Trigger | Dictionary line on FIRST appearance (say, mood confused, then a small "stamp" animation on the cell) |
|---|---|---|
| `#FEEL!` | FEEL of an empty cell, range or nothing | see `errdef` below |
| `#MEH!` | unparseable syntax (`=+`, unmatched paren), arithmetic on text | |
| `#PURPOSE?` | arithmetic that touches an empty cell, or SUM of an empty range | |
| `#NAME?` | unknown function or bare word. ALWAYS attributed to Gerald (a tiny 🥔 in the cell) | |
| `#DIV/OH` | division by zero | |
| `#TUESDAY!` | after Beat 7, any formula that references a cell in row 4. Row 4 (the Tuesday row) is permanently emptied at Beat 7 and shows `(bracing)`; typing into it is accepted but displays `(bracing)`. | |
| `#YOU!` | `=YOU()` before Sheet 7 1/2 exists | |
| `#N/A-WELL` | `=SOCK()` | |

`#OK`: after the first Close Workbook (cycle >= 1) every error code in the sheet displays as a calm green `#OK`. It is the most worrying thing on the sheet (cheap: a root class that swaps the displayed string and colour).

### 4.4 Circular references: Holding Hands
If evaluation revisits a cell on the `visiting` stack, do NOT show an error. Mark every cell in the cycle: display `(holding hands)`, add a CSS class that leans the cells toward each other (small rotate keyframe, +/-3deg), and show ONE heart overlay between the first two cells of the cycle (`♥ n`, n ticks up by 1 per second, capped at 99). A self-reference (`=A1` typed in A1) is the one-cell version (the cell hugs itself, `(holding itself)`). A three-cell ring uses the "triangle" line. First time: +5 Meh and the secret achievement (11.4). If the player later edits one of the cells so the loop breaks, the hearts stop.

---

## 5. FEELINGS AND WORD BAGS (data, verbatim)

### 5.1 FEELINGS (40, in this order)
```
mildly | adjacent | a bit Thursday | cautiously damp | unreasonably fine | pre-nostalgic
provisionally warm | load-bearing | quietly overdue | almost lunch | officially pending | slightly more
mostly stairs | fondly lukewarm | rounded down | wistful (estimate) | approximately 40% | after hours
nearly on time | politely hopeful | laminated | mid-sentence | vaguely Wednesday | tenderly beige
one sock short | sincerely adequate | in transit | on loan | a little ahead of itself | Tuesday-adjacent
per policy | unfiled | gently unresolved | thoroughly maybe | a bit much, spiritually | stapled
near the third ficus | almost a feeling | in a good folder | suspiciously fine
```
The Feelings tab (8.1) lists all 40; clicking one writes it as plain text into the selected cell.

### 5.2 RARE FEELINGS (gold, 6): 1 in 60 FEEL commits (use `api.chance`)
`Mild Parallel Nostalgia` | `Pre-emptive Gratitude` | `Retroactive Optimism` | `Hindsight (Forward-Looking)` | `The Specific Warmth of a Laminated Sign` | `Hope, Rounded Down`. The cell glows gold (gold gradient, 4 s), comment bubble text `Please do not tell the other cells.`, pays 5 Meh, sfx `tada`, then silently reverts to the normal hashed feeling. This is a rare event, NOT an achievement path.

### 5.3 VERDICTS (SUM results, 7)
`enough` | `not quite` | `a lot, spiritually` | `roughly Thursday` | `sufficient (emotionally)` | `more than last time` | `a respectable amount of some` — chosen by `hash(addr + raw + driftTick) % 7`.

---

## 6. BUILD TIERS

Priority tiers so the builder can cut from the bottom if the file nears 1800 lines: **CORE** (grid, engine, feelings, commit reactions, formula bar, chip row, autocomplete, undo, recalc, totals row, scheduler, close/Q4, idle, overheat, achievements) > **LAYER 2** (fill handle, autocorrect, chart tile, pivot panel, comments, Format and Sort, Dennis) > **STRETCH** (macro/ghost cursor, Sheet 7 1/2 mirror sheet, Moth cameo, `+` hat tab, Q5 grey quarter). If cutting, cut in the order: hat tab, Moth cameo, macro, Format mood tints (keep the button), Q5 special.

---

## 7. SUBSYSTEMS (each a different physical verb; revealed in sequence, never all visible at once)

### 7.1 FILL HANDLE (LAYER 2; unlocked Beat 3)
A 10px mustard square at the bottom-right corner of the selected cell (single-cell or range), bobbing arrow hint on first reveal. Drag down/right with pointer events (`setPointerCapture` inside try/catch because the fuzz stubs it). Each cell passed ticks (`api.sfx('tick')`) and previews its predicted value; release commits and pays 0.1 Meh per cell (cap 3). Prediction rules:
- numbers: continue the step (default +1) and insert `7 1/2` when the series steps from 7 to 8 (`4,5,6,7,7 1/2,8`);
- text: degraded photocopies, copy 1 `x (probably)`, copy 2 `x (allegedly)`, copy 3 `x (rumor)`, further copies `x (rumor of a rumor)`;
- formulas: copy with relative references shifted (regex shift of `[A-H]\d+`);
- a source of `hunger` continues `slightly more hunger`, `noticeably more hunger`.
Management reacts to drag length (short <= 2, long >= 7, past row 12). Reset drag state on the next `pointerdown`, `pointercancel`, `lostpointercapture` and `visibilitychange` so a drag with no `pointerup` can never stick.

### 7.2 AUTOCORRECT: "Management Suggests" (LAYER 2; Beat 3)
On commit of plain text (not formulas), a red wavy "Management Suggests" underline marks swapped words in the cell display; clicking the underlined cell text (or the tiny `Accept` / `Ignore` pair that appears in the status bar for 5 s) shows the Accept/Ignore lines; BOTH do the same thing and both pay 0.1 Meh. Escalation by number of autocorrects so far (word list is case-insensitive, whole-word):
1. 1st autocorrect: `teh` -> `the` (helpful). If the player never types `teh`, the first commit of ANY text containing `the` or `teh` triggers it; otherwise the first autocorrect is applied to a fixed word: `recieve` -> `receive`.
2. 2nd: `the` -> `teh` (not helpful).
3. then `profit` -> `feelings`, `synergy` -> `synergy (sadder)`, `meeting` -> `nap`, and whenever the committed text contains the player's name (`api.player.name`), it is replaced by `Valued Employee (Draft)`.
4. From Beat 9 on: autocorrect corrects MANAGEMENT's own lines: the module speaks `Please advice on the status of Tuesday.` (module hard-codes the swapped spelling) followed 2 s later by the "I did not authorise" line.

### 7.3 FORMAT AND SORT BY VIBES (LAYER 2; Beat 5)
- `Format` cycles three modes on click: `Mood` (cells with a feeling get lilac or mustard by hash parity; numbers over 7.5 go warm grey and display `(Cheerful (Grey))` in the tooltip; the Dennis cell is beige), `Beige (Dennis)` (everything beige), `Off`. Pays 0.2 Meh per change, lines from `fmt`.
- `Sort by Vibes`: rows 2-5 cells translate through a shuffled order (CSS transform + transition, about 600 ms), then slide back to the original order. Landing verdict in the status bar and say: "already optimal" (lines). Pure visual FLIP; the data never moves. Respect reduced motion (skip the slide, show the verdict).

### 7.4 CHART OF NOTHING (LAYER 2; Beat 4)
A collapsible tile docked above the grid, opened by the `Chart` ribbon button. Inline SVG, `viewBox 0 0 360 170`, scales to width.
- Axes: X labelled `Nothing`, Y labelled `Also Nothing`, gridlines, X ticks `0 2 4 6 7 [7 1/2] 8 10` where the `7 1/2` label sits on a second text row so nothing overlaps; NOTHING is ever plotted at 7 1/2.
- Title: a real `<input>` (default `Untitled Chart`). Renaming it for the first time pays 0.5 Meh and says the title line. The `Revenue From Staring` / `Hope Over Time (Time Not Provided)` / `Nothing vs. Nothing (Q?)` titles are generated when the player clicks the small `retitle` button (cycle).
- Legend: `Series 1 (absent)`, later `Toast` (after `=TOAST()`, the only series that is present), later `Dennis (Plant)` (after Dennis, labelled `Competent`, a short rising line).
- Chart type buttons (4 real buttons): `Bar of Nothing` (bars of height 0 with labels `0 (proud)`), `Line of Nothing` (a line along the axis, already behind the axis), `Pie of Nothing` (one slice, label `Nothing 100%`), `Donut` (the hole is the data). Always a dashed trendline labelled `Trend: eventually (R-squared: sure)` and a correlation readout `Correlation: 1.00`.
- Adding data: drag a selected range onto the chart tile (on `pointerup`, test whether the pointer is within the tile's `getBoundingClientRect`), OR click the `Use selection` button (touch friendly). The eyes (two circles with pupils offset toward the pointer on `pointermove`) look at the data and the chart declines it: each cell adds one dot (`<circle>`) that drifts up-right and exits stage left of the plot (delta-time via `api.requestAnimationFrame` timestamps, max 12 live, recycle). Pays 0.3 Meh per add (cap one award per 2 s). First successful add: achievement `chart`.
- Hovering a bar or point shows the tooltip `(nothing, nothing)`.
- Chart tile closed by the `Chart` button again or its own collapse button.

### 7.5 PIVOT (LAYER 2; Beat 6)
A separate sheet tab `Pivot` (see 8.1) showing a small 3x3 table card mounted on a brass hinge pin (`radial-gradient` circle) with `perspective` on the wrapper and `transform-origin: left center`.
- Click the table: it swings (`rotateY(90deg)` for 280 ms, swap row/column headers at the midpoint with `api.setTimeout`, back to 0 for 280 ms). Management announces a pivot line. Pays 0.3 Meh for the first 8 pivots, then 0.1.
- Field chips `Morale`, `Synergy`, `Tuesday` and two wells `Rows` / `Columns`: clicking a chip moves it to the other well (this is the no-drag fallback; the table headers are derived from which chips are in which well).
- Counter pill: `Pivots: n` (a rule is cited: a table may pivot at most 7 1/2 times). At n = 7 and n = 8 the special lines fire.
- SPAM (8 clicks within 2 s): the table becomes a CEILING FAN: four rotated rounded rectangles rotating on `api.requestAnimationFrame` (delta-time), cells sway (`translateX` keyframes, rate-limited class), a `Cooled: N cells (none were warm)` counter ticks up once per second. Management: the fan line. Another 8-click burst turns it back (the fan "keeps turning out of habit" for 3 s). Under reduced motion show a still fan. Pivot spam also feeds the overheat tracker (9.3).

### 7.6 MACRO RECORDER (STRETCH; Beat 7)
Ribbon group `Record` `Stop` `Play`. Record stores up to 12 events `{type:'visit'|'commit', addr, text}` (only real player actions). Play: a ghost cursor (SVG arrow, opacity .5, tiny `Past You` label in 10px caps) is positioned over cells with CSS transitions, replays the events evenly spaced so the whole playback takes EXACTLY 7500 ms regardless of length (750 ms when `api.selftest`); one digit in each replayed commit is wrong (first digit character +1 mod 10; no digits = unchanged). After playback the ghost drops `thank you (Past You)` into H12 (an 8th action that was not yours). Playing with an empty recording: the ghost sits and trembles for 7 1/2 s ("very carefully"). Pays 1 Meh per playback (at most once per 30 s). Playback commits go through the same pipeline flagged `ghost` (no reaction spam; no Meh).

### 7.7 SANDRA'S COMMENTS (LAYER 2; first on C2 at Beat 5, then about every 6th commit)
Red triangle in the cell corner (`::after` border trick). Hover, focus, select or tap shows the one reused bubble with that cell's comment; mouse-leave hides it (touch: auto-hide after 4 s). Max 10 commented cells at once (FIFO recycle: the oldest triangle disappears). Comment text is taken from the 16-line pool in order (counter), looping from line 9 after line 16. Pays 0.2 Meh the first time each comment is read. Clicking the triangle corner says the Sandra-seen line. Typing `sandra` triggers the review secret (11.5).

### 7.8 THE TOTALS ROW: QUIET TOTAL (CORE; becomes selectable at Beat 8)
Before Beat 8 row 13 is visible but the Σ cell (A13) is inert (clicking it says "not yet"); B13..G13 are ordinary read-only cells showing the column verdicts.
When the Σ cell is selected (click, tap or arrow key):
1. `mode='quiet'`; add root class `m-spreadsheet-meaning-dim` (`filter: brightness(.82) saturate(.6)`, gridlines fade by lowering a CSS var, 600 ms transition); ambient `api.sfx('tick')` every 2 s (spaced `setTimeout`s, slower each time).
2. Pick the next UNHEARD line of the 12 (in order of the pool 12.1; once all 12 are heard, loop with ` (again)` appended). A single small grey line types into the footer strip under the grid with a managed interval (`interval = min(60, 4400/len)` ms per character so it finishes at about 4.4 s). Under it a thin progress underline fills linearly over the hold time.
3. HOLD STILL: hold time 5000 ms (1000 ms when `api.selftest`). The line is cancelled mid-word by: `pointermove` that travels more than 6px from the baseline (baseline = pointer position at the first `pointermove` after the quiet starts, so the click that selected it does not count), any `keydown` (ignore keys for 250 ms after the quiet starts, so the arrow key that arrived at the cell does not cancel itself), a `wheel`/scroll of the grid wrapper, or selecting another cell. On cancel: the line is replaced by the next interrupt line from the interrupt bag (12.1), the dim lifts, Management says one soft `quietint` line.
4. On success: soft `api.sfx('bell')`, +1 Meh (+5 extra the very first time), counter `Quiet Totals: n/12` in the footer strip, `quietdone` line from Management who "comes back softer". Management does NOT speak (no `api.say`) from the moment the quiet starts until it ends.
5. Persist which lines were heard (indices) in `api.save` (`quiet:[..]`). When all 12 are heard: achievement `quiet` and the last-line special.
6. The `:17` secret (11.2) is checked at the moment of selection.
7. Reduced motion: the dimming becomes a stepwise opacity change (no transition) and no breathing.

### 7.9 UNDO STACK (CORE; Undo/Redo appear at Beat 2)
Ctrl+Z / `Undo` reverts the last commit. From the 4th undo in a session on, it also "undoes one thing you did not do": the status-bar pill `Day: Thursday` changes to `Day: (undone)` for 4 s then returns as `Day: Thursday (restored, probably)`, and the Thursday line plays. After 10 undos: the button becomes disabled-looking (`aria-disabled`, still focusable, still answers) and says "Nothing left to undo." `Redo` is a button that does nothing and is sad about it (redo bag). Undo only reverts a commit if the stack is non-empty; otherwise `Undo: undid nothing, firmly.` (misc).

### 7.10 RECALCULATE AND OVERHEAT (CORE)
F9 / Recalc bumps `driftTick` (re-rolls every FEEL/SUM result), flickers the cells with a fan-of-cards animation (CSS class 300 ms), pays 0.2 Meh. A 30 s managed `setInterval` (3 s when `api.selftest`) also bumps `driftTick` ("feelings DRIFT"), flickering cells for 300 ms. See 9.3 for the spam fuse.

### 7.11 STATUS BAR (CORE)
Left: `Ready` rotating (`Ready`, `Ready (ish)`, `Ready, spiritually`, `Calculating...`). Center: for a multi-cell selection, `Count: 6  Sum: mild  Average: Tuesday` (Sum and Average as feelings via the same hash, Count a real number). `Autosave:` indicator with a CSS spinner cycling copy every 20 s: `Saving...` / `Still saving...` / `Saving, with feeling...` / `Saving (it's going well)...` / `Saving to a place...`. `Completeness: 61%` (see 9.2). `Q3`. `Day: Thursday` (see 7.9). Clock `4:17` followed by a tiny `:SS` that shows `elapsed seconds mod 60` of module time (this is how players can find the :17 secret); the clock's `title` reads `4:17 and always has been. The minute is 17 seconds long.` and clicking it says the clock line. `Quarter Close ====---- n%` (the real ending bar, see 14). `People viewing: 1` (grows with the Moth/Tuesday cameo).

### 7.12 SHEET TABS (CORE)
`Sheet1` (always), `Feelings` (Beat 2: lookup list of the 40 feelings, click copies to the selected cell on Sheet1), `Pivot` (Beat 6), `Sheet 7 1/2` (Beat 9, or early via `=MEANING()`; a mirror sheet, 8.2). The newest tab bounces once when it appears. Tabs are real `<button role=tab>`s. Stretch: a `+` tab that adds `Sheet2` (`Sheet1 with a hat`: it shows Sheet1's data with a 🎩 badge, max 2 extras; the hat line).

---

## 8. TAB CONTENTS

### 8.1 Feelings tab
A wrapped list of 40 buttons (feeling text). Clicking one writes it into the selected Sheet1 cell as plain text through the commit pipeline (verb: `text`), switches back to Sheet1, and says a feeling line. Built lazily on first open.

### 8.2 Sheet 7 1/2 (mirror sheet)
The same grid component with its own state `sheets.s75`. Initial content: A1 `=YOU()` (shows the player's name), B1 `your formulas in column B`, B2..B6 the player's last 5 committed formulas copied as plain text (updated each time the tab opens), C1 `already known`, H13 `Σ: present`. Editable like any sheet. Its status bar line reads `Ready, spiritually`. It has a tooltip on the tab: `Return to Sheet1 whenever you like. Sheet1 will be there. Sheet1 is always there. It is the most committed of the sheets.` Opening it for the first time pays 10 Meh (once) via the `cartographer` flow only if it was reached through MEANING; otherwise 5 Meh (once).

### 8.3 Pivot tab
See 7.5.

### 8.4 Dennis panel (Ctrl+End, Name box `Z999`, or the Dennis hint chip)
An overlay inside the grid wrapper (name box shows `Z999`). A beige SVG chart titled `Dennis (Plant): Q3 Height`: a single line that really rises 0.3 cm per minute of real play time (`dennisSec` persisted in `api.save`; height = 3.8 + dennisSec/60*0.3 cm, shown to 1 decimal; each cycle adds 0.1 cm "a hair taller"). A tick `+0.3 cm` floats up each real minute while the panel is open. Esc or `Back` returns. Entering sets flag `spreadsheet-meaning.dennis`. Pays 0.5 Meh the first time per session and says the Dennis lines.

---

## 9. ECONOMY, SCHEDULER, SPAM

### 9.1 Awards (tiny, via `api.award`)
| Action | Meh |
|---|---|
| number/text commit | 0.2 |
| formula commit | 0.5 (returns a feeling 0.6; returns an error 0.8) |
| soft ceiling | commit rewards are multiplied by `clamp(1 - minuteCommitMeh/8, 0.1, 1)`, where `minuteCommitMeh` is a rolling 60 s sum, so spam is worth less |
| recalc/F9 | 0.2 (at most once per 1.5 s) |
| fill release | 0.1 per cell, cap 3 |
| chart add | 0.3 (cap one award per 2 s); first rename of the chart title 0.5 |
| pivot | 0.3 (first 8), then 0.1 |
| Sort / Format | 0.3 / 0.2 |
| comment first read | 0.2 |
| macro playback | 1 (once per 30 s) |
| Quiet Total complete | 1 (+5 the first time) |
| Dennis first visit | 0.5 |
| rare gold feeling / Found Sock | 5 |
| first circular ref | 5 |
| =MEANING() first time | 5 (plus the achievement) |
| autosave of absence | 7.5 (via the achievement) |
| Close Workbook cycle | 10 once per cycle (never more than 50 per cycle in total) |
| overheat fee | `api.award(-3)` |

### 9.2 Stats and flags
Stats (a few only): `spreadsheet-meaning.commits`, `.formulas`, `.feelings` (formulas that returned a feeling), `.errors`, `.recalcs`, `.pivots`, `.charts`, `.quiet`, `.undos`, `.fills`, `.closes`. Use `api.stat.inc` / `.max`.
Flags: `spreadsheet-meaning.dennis` (set on Z999 visit), `spreadsheet-meaning.meaning` (MEANING found), shared `metGerald` (set when Gerald is met), `toasterMet` (set on first `=TOAST()`), `sockSeen` (set when the Found Sock appears). Read-only defensive checks (wrap in try/catch, treat missing as falsy): `bossKeyUsed`.
Save (`api.save`): `{dennisSec, quiet:[indices heard], best:{cycle}}` only. Everything else is per session; the sheet always starts at Q3 so the first joke always lands.
`Completeness: 61%`: a text that wobbles between 59% and 61% (changes every 7 s); when an action would push it to 62% it shows `62%` for 800 ms and then "rounds itself back down" to 61%. It never exceeds 61% for more than a moment.

### 9.3 Spam fuse (OVERHEAT)
Track timestamps (`api.now()`) in small rolling arrays: F9/recalc presses, pivot clicks, Enter commits, clicks on the same cell.
- 25 recalcs in 10 s, OR 8 pivot clicks in 2 s, OR 30 Enters in 5 s, OR any combination reaching 12 events in 3 s: the workbook OVERHEATS. A fan icon grows in the status bar and spins; cells sway (class); a progress bar labelled `Calculating... (the calculation is no)` fills for 3 seconds (400 ms when `api.selftest`) during which the grid ignores clicks (visually: dimmed, `pointer-events:none` on the wrapper; handlers also check `mode==='locked'`); `api.award(-3)` (the Calculation Fee, floating "-3 Meh"); lines. Pivot spam specifically converts the pivot to the ceiling fan (7.5). After the lock: recover line, one `Ready`.
- Second overheat within 60 s: Management says the Sheet request line and `api.setTitle('Sheet (Not Responding, But Feeling It)')` for the rest of that quarter; a third time in the session: `api.setTitle('Sheet')` for the rest of the session and a line saying it cannot be convinced otherwise. (`api.setTitle` only, never `document.title`.)
- Same cell clicked 15 times in 3 s: no overheat, the cell files a Complaint (`m:spreadsheet-meaning:complaint`, token `{item}` is the cell address), cell gets a small `!` badge for 3 s.

---

## 10. ESCALATION: THE TIMELINE AND THE BEAT SCHEDULER

A managed 1 s `api.setInterval` runs `tick()`. Define `TS = api.selftest ? 0.1 : 1`. Elapsed `t` (seconds of module life, mock time) and `actions` (commits + fills + chart/pivot/sort/format/macro/undo/recalc/quiet completions) are tracked. A MAJOR beat `n` fires when `(t >= tMin*TS OR actions >= aMin)` AND at least 8 s (0.8 s under `api.selftest`) have passed since the last reveal of any kind; beats fire in order, one at a time. A MICRO reveal fires from the micro pool (10.2) whenever 20 s (2 s under `api.selftest`) pass since the last reveal of any kind and a major beat is not yet due: so there is never a state with nothing new to touch inside 3 minutes, and fast and slow players both get new things.

### 10.1 Major beats

| # | tMin (s) / aMin | Reveal (UI first, then the line) | Management line (fixed text, section 12.2 `beat`) |
|---|---|---|---|
| 0 | 0 | Mount: root fades in; Management line 1 at 0.4 s; C2 types `=HOPE()` at 60 ms/char from 1.2 s, holds 600 ms, settles on `#PENDING` (sfx `tick`); at 3 s the half row 7 1/2 shimmers once ("new in the building"); row-numbers line at 5 s; filename line at 9 s. First click/edit available from 0. | intro 1-3 |
| 1 | 12 / 2 | Formula bar hint chips slide in (`=FEEL( =SUM( =IF(`); Recalc button; typing `=` opens autocomplete (always lists TUESDAY first) | B1 |
| 2 | 30 / 5 | `Feelings` tab appears (bounce); Undo / Redo buttons appear; chips add `=HOPE() =TODAY()`; first `#FEEL!` is easy to hit | B2 |
| 3 | 60 / 9 | Fill handle (wiggle); autocorrect begins; `Completeness: 61%` appears | B3 |
| 4 | 100 / 14 | `Chart` ribbon button (pulses); chart tile can open | B4 |
| 5 | 140 / 18 | `Format` and `Sort by Vibes`; Sandra's first comment on C2; Ctrl+End hint chip (Dennis) | B5 |
| 6 | 200 / 24 | `Pivot` tab appears | B6 |
| 7 | 260 / 30 | `Tuesday` row goes permanently empty (`(bracing)`), `#TUESDAY!` unlocked; Macro buttons; chips add `=TOAST() =GERALD() =SOCK()`; Sandra's comments begin commenting on each other; `=TOAST()` answers | B7 (two lines) |
| 8 | 340 / 38 | The Σ cell becomes selectable (glows); chip `=MEANING()` appears; Management's tone softens | B8 |
| 9 | 450 / 50 | `Sheet 7 1/2` tab appears; `=YOU()` works; autocorrect corrects Management; "People viewing: 2" (Moth) | B9 (two lines) |
| 10 | quarter close (14) | Close Workbook | B10 |

If a player reaches Beat 10's condition early (quiet heard >= 6 and >= 3 subsystems used from {fill, chart, pivot, macro, quiet, sort}) the Quarter Close bar is accelerated (14).

### 10.2 Micro pool (each fires at most once per quarter, in a shuffled order; skip entries whose prerequisites are not yet unlocked; each is a UI change plus a line)
1. Hint: `=` autocomplete and TUESDAY (tuesday bag line).
2. Management asks for a number between 1 and 10 (`ambient` line).
3. Gerald cameo (G4 shows a shy brown dot; clicking G4 meets Gerald, 12).
4. The Missing Sock sighting line (F6 gets a 🧦 for 3 s; sets `sockSeen`).
5. Dennis hint (Ctrl+End).
6. Boss key cameo (fires only once t >= 120 s).
7. Completeness line (wobble gag).
8. Freeze Panes line (row 1 shows a ❄ for 6 s).
9. Merged A1 and B1 line (A1 and B1 flash briefly).
10. Find and Replace line.
11. Moth cursor cameo (needs Beat 9): People viewing 2, a lilac SVG arrow with a name tag `Anonymous Moth` drifts in loops over column B, lands, types `you good?` into the status bar chip one letter at a time, leaves; then `People viewing: 3` and `Anonymous Tuesday` appears as a faint cursor in column G that does nothing and stays until the quarter ends.

### 10.3 What stays after the reset
After a quarter reset everything unlocked stays unlocked (no tutorial again). Only the 10.2 micro pool refills, and the major-beat lines are replaced by the Q-reprise lines (14).

---

## 11. SECRETS AND RARE EVENTS

11.1 **AUTOSAVE OF ABSENCE (long idle ladder).** Any `pointerdown`, `pointermove`, `keydown`, `wheel` resets the idle clock. Thresholds in seconds (multiply by 0.3 when `api.selftest`, so they all fit in the fuzz harness's 62 s idle): 30 s: the selection moves one cell to the right "to see if anyone is there" (line). 60 s: status bar shows `Autosave: saved your absence (1.2 KB)` and A1 starts typing `=ARE_YOU_STILL_THERE()` one character at a time inside the cell display, then deletes it as if embarrassed (the raw value of A1 is NOT changed; this is a display overlay on the cell). 90 s: Management stops talking (the humming line, last thing it says). 180 s: gridlines fade out, the Σ cell reads `(sum of waiting)`, the Past You ghost cursor sits in the bottom-right corner and waves once, achievement `absence` (+7.5 Meh), second idle line. Any input at any point: the ghost shyly leaves, gridlines return, Management says the "did not see anything" line. Idle at the Σ cell (after quiet complete): the sum adds ` and you` to itself.

11.2 **THE :17 MINUTE (top secret, 50 Meh once).** If the player selects the Σ cell while the status-bar clock's tiny seconds read `:17` (i.e. `floor(elapsedSeconds) % 60 === 17`), the quiet line is replaced with the special line (12.1) and the achievement `minute` pays out. The clock `title` and the Management hint after quiet #6 (`secret` bag) are the only clues.

11.3 **`=MEANING()`.** Typing it into any cell returns `see Sheet 7 1/2`, unlocks the Sheet 7 1/2 tab immediately (and `=YOU()`), the half row gains a thin gold border, flag `spreadsheet-meaning.meaning`. Management goes silent for 3 s then says the "not supposed to find that" line. Pays 5 Meh once and unlocks `cartographer`. Typing `=MEANING()` a second time returns `7 1/2` and nothing else. `=ROUND(MEANING(),0)` (any ROUND wrapping MEANING) shows `8` and says the "eight" line (we do not have an 8).

11.4 **HOLDING HANDS (circular reference).** First time pays 5 Meh once and unlocks achievement `hands`. A tiny stamp appears in the status bar after the first: a spinning circular arrow (`↻`) that rereads the first circular line when clicked. After three F9 recalcs while the loop exists, the family lines (`family` bag) arrive one per recalc.

11.5 **`sandra` typed in any cell.** The cell shows `🔒 under review` for 6 s (then reverts to showing `sandra`), Management says the Compliance line, and the Sandra all-comments panel appears for 6 s listing every current comment (max 10). Achievement `sandra` (secret).

11.6 **RARE EVENTS.** (a) Found Sock: 1 in 150 commits replaces a random visible non-header cell display with 🧦 for 3 s (`Found. Was never lost. Was in row 7 1/2 the whole time.`), pays 5 Meh, sets `sockSeen`. (b) Rare gold feeling: 1 in 60 FEEL commits (5.2). (c) Ctrl+End to Z999 and Dennis ticks. (d) The first `#NAME?` ever: the Gerald stamp. (e) Typing `gerald` as a cell value: cell turns beige, status bar reads `Gerald has joined the document (Read Only, With Gravitas)`, Gerald speaks (12), `metGerald` set. (f) 1 in 40 chance on an error commit that the error code is stamped in a different colour (purely cosmetic).

11.7 **THE MOTH/TUESDAY (stretch).** See 10.2 item 11. Leaving it for idle: after the 120 s idle mark the Moth leaves a comment `warm` on B2 (a Sandra-style triangle with text `Anonymous Moth: warm`).

---

## 12. ALL TEXT: LINES, POOLS AND CAMEOS (final, verbatim)

Register: `P.addLines('m:spreadsheet-meaning:<cat>', [...])` for every category that is spoken with `api.sayRandom('m:spreadsheet-meaning:<cat>')`; the other groups are fixed sequences in plain arrays spoken with `api.say`. Tokens used: `{player}`, `{count}`, `{item}` only (override via `api.sayRandom(cat, {count: n})`). Choose `mood` by situation: errors `confused`; autocorrect and fanfares `smug`/`proud`; overheat `panic`; interrupted quiet and idle `disappointed`; everything else `neutral`. Priority: reactions 0, beats and cameos 1, secrets 2. Quote lines in JS with double quotes or template literals; the lines themselves contain straight single quotes only (no double quotes).

### 12.1 DATA POOLS (shown in cells and panels, not by Management)

**Sandra comments (16, in order; the bubble text is exactly this):**
1. `Sandra: Please do not quote the number above. The number above was a draft of the number below.`
2. `Sandra: Please do not feel in the shared columns.`
3. `Sandra: Per policy 4.2, a cell may contain at most one regret.`
4. `Sandra: Technically this cell is empty. Technically so is everything. Please be consistent.`
5. `Sandra: Column D may only be felt on alternate Fridays, and never during a Q.`
6. `Sandra: This cell exceeds the recommended number of feelings (1).`
7. `Sandra: See my previous comment, which I have not yet made.`
8. `Sandra: Policy 4.2 is superseded by policy 4.1, which has not been written. Please follow both.`
9. `Sandra: Resolved. (Unresolved.) (Resolved again, but quietly.)`
10. `Sandra: I disagree with the comment to my left. I am the comment to my left.`
11. `Sandra: See Form 27B/6, clause 7 1/2, subclause 'see clause 7 1/2'.`
12. `Sandra: I would like to withdraw this comment. It has already been circulated.`
13. `Sandra: Comment on Sandra's comment: noted.`
14. `Sandra: Sandra has flagged Sandra.`
15. `Sandra: Sandra has not responded.`
16. `Sandra: Sandra has flagged that.`
Corner click: `Sandra has seen that you have seen this.` Moth comment: `Anonymous Moth: warm`. Certificate (14): `Sandra: approved. Sandra: but see attached.` (There is no attachment. There never is.)

**Quiet Totals (12, in order; typed one at a time into the footer strip):**
1. `Every cell here is a small room. You are visiting. The rooms are glad of the company.`
2. `= The sum of all the above is the sum of all the above. You are still here. That is also included.`
3. `= Everything has been counted. What is left over is the part that was counting.`
4. `= (empty). The total is empty in a full way. Please do not tell the other cells.`
5. `The sum is 7 1/2. The 1/2 is the part that is still deciding.`
6. `Total pairs of socks: 7 1/2. One is missing. The rest are not worried. They are, a little.`
7. `= 7 1/2. We recalculated. We recalculated again. It is a stubborn number.`
8. `The sheet has been adding for a long time. It would like you to know it did not mind.`
9. `A total is only a place where the counting agrees to stop. Thank you for stopping with it.`
10. `Tuesday is in here too. It has been counted. It is being very quiet about it.`
11. `Please note: you were included in this sum before you arrived. The sum is not surprised.`
12. `Nothing was added. Everything was kept. Thank you for being the total.`
Special `:17` line (replaces whichever would play): `Hello. You found the minute. The minute is 17 seconds long and always has been.`
Interrupt bag (cycle): `You moved. The total has stopped.` | `You moved. The total has stopped. It was just getting to the part about the stairs.` | `You moved. The total has stopped mid-word. It will pick the word up again later, if it is still there.`
Looping suffix after all 12: ` (again)`.

**Status and label strings:** `Autosave: saved your absence (1.2 KB)` | `Completeness: 61%` | `Gerald has joined the document (Read Only, With Gravitas)` | `Calculating... (the calculation is no)` | `Quiet Totals: n/12` | `(sum of waiting)` | `(holding hands)` | `(bracing)` | `Quarter Close ... n%` | `Quarter Close (Draft 2) 0.0%` | `Q5 is on a different sheet` | `Cooled: N cells (none were warm)` | `Sort by Vibes: already optimal` | `Format: Mood / Beige (Dennis) / Off` | `Day: Thursday` | `Day: (undone)` | `Day: Thursday (restored, probably)`.

### 12.2 MANAGEMENT LINES BY SITUATION

**intro (fixed, in order, spoken at 0.4 s, 5 s, 9 s):**
1. `Welcome to Q3 Meaning Projections. Please enter your meaning in the highlighted cell. It is highlighted in the sense that I looked at it.`
2. `Row numbers read 6, 7, 7 1/2, 8. This is correct. Please do not count along.`
3. `I have taken the liberty of opening Meaning_Q3_DRAFT(2).xlsx. It is not final. It is not meaning. It is, however, xlsx.`

**beat (fixed, B1..B10; B7, B9 have two lines, the second 3 s later):**
- B1 `The formula bar has been quietly judging. It has decided to be supportive. Try =FEEL(B2).`
- B2 `A Feelings tab has appeared. Click one to hand it to a cell. Cells are not allowed to refuse.`
- B3 `The fill handle has appeared. Drag it. Autofill predicts the next value. It has been right before. It has not been right lately.`
- B4 `Insert Chart is now available. It plots Nothing against Also Nothing. Both axes were very brave about it.`
- B5 `Format and Sort by Vibes have been added to the ribbon. Sandra has left a comment on C2. It is polite. For now.`
- B6 `A Pivot tab has appeared. It pivots. That is its entire job. It has asked to be taken seriously.`
- B7a `Tuesday has been removed from the data. It is not missing. It is bracing.`
- B7b `Macro Recorder is now available. Everything you do will be done again, slightly later, by someone who is also you.`
- B8 `The Totals row is ready. Please prepare yourself in whatever way you prefer.`
- B9a `Sheet 7 1/2 has appeared at the bottom. No one made it. It has formulas. It has fewer than you would hope.`
- B9b `On Sheet 7 1/2, cell A1 reads =YOU(). It returned {player}. It calculated that instantly. It had been waiting.`
- B10 `It is time to close Q3.`

**num** (committing a number, bag of 8): 
`Cell updated. Nothing else happened, carefully.` | `Finance asked for a number. This is a number. Finance has not been told it is this one.` | `A number. It has been accepted as a number, technically.` | `You have entered a number. The cell did the rest, which was nothing, with care.` | `Number accepted. It will be returned to you in a different tone of voice.` | `That is a number in a cell. Per policy, both are now responsible for each other.` | `Please enter a number between 1 and 10. Any number is fine. Per policy, 7 1/2 will be selected for you.` | `Noted. The number has been put somewhere safe. The somewhere is the cell you typed it in.`

**txt** (plain text, bag of 8): 
`Text accepted. The cell has no notes, and several.` | `That is a word. It has been placed in a cell and told to wait.` | `A label. Labels are how the spreadsheet knows you were here.` | `Cell updated. The word is now load-bearing.` | `You wrote it down. Writing it down is half of doing it. The other half is Tuesday.` | `Entered. Management has read it twice and understood it once.` | `The cell says it will treat that word with respect and a small amount of suspicion.` | `A cell has been filled with a word. The cell would like to be consulted about the next one.`

**fx** (formula accepted, bag of 8): 
`Formula accepted. It took 0.003 seconds and a small amount of courage.` | `I have reviewed your formula. It is a formula. I have no further notes, and I have several.` | `Your formula has been accepted by a committee of one. The committee is the cell.` | `That formula was calculated with total sincerity and slightly less accuracy.` | `Your formula was cleverer than the spreadsheet. The spreadsheet has asked for a moment and a slightly larger font.` | `Calculated. The answer is in the cell. The cell is not sure it was the question.` | `A formula. The spreadsheet has not been trusted this much since the intern left.` | `=2+2 returned 4 (technically). Nobody asked. The cell wanted to be sure.`
(The last line is also the specific reaction to an arithmetic formula.)

**feel** (formula returned a feeling, bag of 6): 
`Finance asked for a number. Finance has been given a feeling.` | `Feeling recorded. It is 4.3 percent different from the last one. We cannot tell you which 4.3 percent.` | `That feeling has been logged against Q3. Q3 did not ask for it. Q3 is accepting it anyway.` | `A feeling has been returned. Please do not rely on it before lunch.` | `The feeling is provisional. All feelings are. This one has a sticker saying so.` | `=FEEL(B2) returned 'mildly'. Finance has been given 'mildly'.`

**sumv** (SUM verdict, bag of 3): `=SUM returned a verdict instead of a number. The auditors will want that as a number. The auditors are in a meeting about numbers.` | `Sum calculated. The cell would not say what it was. It said it was 'enough'.` | `The true sum is in the tooltip. The cell has asked you not to look. Look anyway.`

**del** (delete, bag of 6): 
`Delete pressed. The cell has asked to keep its dignity and a small amount of context.` | `Cleared. The cell is now a blank that is trying its best.` | `Deleted. The cell wants you to know it was fine with it. It was not fine with it.` | `The cell is empty now. It has described the feeling as 'airy'.` | `That cell has been emptied. Sandra has been notified in case it was one of hers.` | `Gone. A cell, like a Tuesday, does not stay empty for long.`
H1 delete / edit (bag `meaning`, 4): `Meaning (H1) cannot be deleted. It has been 7 1/2 since before the spreadsheet.` | `Meaning total: 7 1/2. Previous total: 7 1/2. Variance: a gentle shrug.` | `You rounded the meaning to something else. It has been put back. It was very polite about it.` | `H1 has been restored to 7 1/2. H1 does not hold it against you. H1 holds almost nothing.`

**errdef** (dictionary entry, spoken the FIRST time each code appears, one per code):
- `#FEEL!` `#FEEL! (n.) The formula expected a feeling and was handed a Tuesday.`
- `#MEH!` `#MEH! (n.) Not an error. A mood with a cell reference.`
- `#PURPOSE?` `#PURPOSE? (n.) A cell asking what it is for. Please check back in Q5.`
- `#NAME?` `#NAME? (n.) That is Gerald. A name is a name.` (the Gerald line; the cell shows a small 🥔)
- `#DIV/OH` `#DIV/OH (n.) The sound a cell makes when divided by nothing. This is how nothing gets smaller.`
- `#TUESDAY!` `#TUESDAY! (n.) Tuesday has been detected. Remain calm and keep your cursor visible.`
- `#YOU!` `#YOU! (n.) A formula that refers to the one reading it. It is not ready. Neither, to be fair, are you.`
- `#N/A-WELL` `#N/A-WELL (n.) Not applicable, but we thought about you. Last seen: row 4, with purpose.`

**errmore** (repeat error, bag of 5): `Another error. The sheet considers this an act of trust.` | `That one was an error with good intentions. They are the worst kind and the best kind.` | `The formula has failed in a way Finance has described as 'colourful'.` | `Error recorded. It has been framed. The frame is also an error.` | `The error is not your fault. It is not the sheet's fault. It is Sandra's, probably.`
**namegerald** (repeat `#NAME?`, bag of 4): `#NAME? That is Gerald. He has declined to comment, as is customary for a potato of his standing.` | `#NAME? Gerald, VP of Spuds, would like it noted that a function, like a potato, is mostly water and a little bit of hope.` | `#NAME? Gerald again. He is in the cell now. He fits. It is a snug cell.` | `#NAME? Gerald has asked that the formula be returned to him, without comment, and with gravy.`

**tuesday** (autocomplete gag; fires on the 1st dropdown open, then every 6th open, then every 3rd after 24 formulas):
`Autocomplete suggests =TUESDAY(). You did not type a T.` | `Autocomplete suggests =TUESDAY(). It has suggested this {count} times. It is not taking notes.` | `Autocomplete suggests =TUESDAY(), withdraws it, then suggests it again, quieter.` | `Autocomplete is now suggesting things from next Tuesday. They look fine. They are slightly more tired.`
Payoff (on committing `=TUESDAY()`, spoken once): `=TUESDAY() returned 'You came'. Autocomplete will not be suggesting it again. Autocomplete is, quietly, done.` After that the dropdown never lists TUESDAY except once, quietly, 10 minutes later (at t >= 600 s): `Autocomplete suggests =TUESDAY(). Just the once. It did not expect you to need it.`

**fill** (fill release, bag of 6): `Fill handle dragged {count} cells. Each cell would like to say it felt something. Collectively they felt 'seen'.` | `Autofill predicts the next value is 'hunger'. It has been right before. It has not been right lately.` | `A short drag. The fill handle is not offended. It is a short handle.` | `That was a long drag. The fill handle would like a minute and some water.` | `Cell {item} now contains the rumor of a feeling. The rumor is unconfirmed. It is widely repeated.` | `You dragged past row 12. Row 13 is the Total. The Total is not for dragging into. It is for sitting with.`
(For `{item}` pass the last filled address.)

**ac** (autocorrect, in order of first occurrence, then random from the bag): 
1 `Autocorrect changed 'teh' to 'the'. Helpfully.` | 2 `Autocorrect changed 'the' to 'teh'. Autocorrect is going through something.` | 3 `Autocorrect replaced 'profit' with 'feelings'. This is within its authority under Policy 7 1/2.` | `Autocorrect changed 'synergy' to 'synergy (sadder)'. It looked at it for a while first.` | `Autocorrect replaced 'meeting' with 'nap'. Management has not been consulted and approves.` | `Autocorrect replaced your name with 'Valued Employee (Draft)'. This is a promotion, in a draft.`
Accept: `Accepted. Ignoring it would have done exactly the same. Management admires the commitment.` Ignore: `Ignored. The suggestion has been applied anyway, out of respect.`
Management's self-correction (fixed pair, Beat 9 onward, once): `Please advice on the status of Tuesday.` then 2 s later `I did not authorise that edit. I authorised that edit.`

**recalc** (F9, bag of 4): `Recalculating. Feelings are now 4.3 percent different. We cannot tell you which 4.3 percent.` | `Feelings recalculated. Several of them were relieved. Several of them were Thursday.` | `Recalculated. The feelings are the same feelings, with a fresh coat of confidence.` | `You pressed F9 {count} times. Your feelings have been recalculated more often than is recommended for feelings.` (the last only after 10 presses, with `{count}`)

**hands** (circular reference): first `Circular reference: A1 depends on B1 and B1 depends on A1. They are holding each other up. Nobody is moving them.` | later bag: `Circular reference detected. Management says this is how the company is run.` | `A cell has referred to itself. It is, in fairness, the cell it knows best.` | `Three cells are holding hands in a ring. Reference is going around. It is having a lovely time.` | `The hearts are at {count}. Nobody is counting. Everybody is counting.`
**family** (one per recalc after 3, in order): `A1 and B1 have had a child. It is called C1. It depends on both and is in therapy.` | `D1 is C1's therapist. D1 is also in therapy.` | `E1 is a houseplant. It has been added to the family for morale.` | `F1 has declared the family 'Q2'. The family has not been consulted.` | `Sandra on the loop: 'Cute. Delete by Friday.' Sandra on the loop, later: 'Please do not delete anyone.'`

**cmt** (Management, on Sandra events): `Sandra has left a comment. It is on the cell. It is also, in a way, on you.` | `A red triangle has appeared. Sandra says it is a formatting choice. Sandra has never made one.` | `Sandra has commented on a comment. The comment has not been told.` | `Sandra's comments now disagree with each other. Management has asked them to do it in a meeting.`

**chart** (bags and fixed): `Chart inserted. X axis: Nothing. Y axis: Also Nothing. Both axes were very brave about it.` (open) | `Your chart shows an upward trend of 0 over 0. This is the steepest 0 on record.` | `Correlation: 1.00. Nothing against Nothing has never been this well matched. Management is moved.` | `The chart has looked at your data. It has declined it, warmly. The eyes have not been told to look away.` | `Series 1 has left the chart. It is fine. It said it was going to the kitchen.` | `Bar of Nothing: every bar is 0 (proud). The bars have asked not to be compared to each other.` | `Line of Nothing: the line is drawn along the axis, which is already behind the axis. It is thorough.` | `Pie of Nothing: one slice, 100%, labelled 'Nothing'. The slice is delighted to be included.` | `Donut of Nothing: the hole is the data. The donut is a supporting character.` | `Trend: eventually. R-squared: sure. This is the best confidence interval we have ever had.` | `The X axis has a tick labelled 7 1/2. Nothing is plotted there. It is the most respected tick.` | `Chart title is now '{player}'s Nothing, Revised'. It is a good title. It will outlive the chart.` (first rename) | `New chart title: Revenue From Staring. Projected Q4: more staring.` | `Hope Over Time (Time Not Provided). The x-axis has taken the afternoon off.` | `The Toaster has appeared in the legend as a series called 'Toast'. It is, unlike every other series, present.` | `Dennis (Plant) has been added to the legend. He is the only series going up. He is labelled 'Competent'.`

**pivot** (bag of 4 + fixed): `PivotTable created. It pivoted. It pivoted again. We had asked it to pivot to video. It pivoted to cells.` | `Rows and columns have swapped. Everyone is exactly where they were, except they are over there.` | `A strategic pivot to cells. Management has been saying 'pivot' since 9:02 AM and has not turned once.` | `Pivot count: {count}. Per Sandra, a table may pivot a maximum of 7 1/2 times before it must be consulted.` | at 7: `Pivot 7. The table is half a pivot away from being consulted. Nobody knows what half a pivot looks like.` | at 8: `Pivot 8. That was the half. The table was consulted. It said 'pivot'.` | fan: `The pivot table is now a ceiling fan. We did not authorise this. The room is 0.2 degrees cooler. We are keeping it.` | fan stop: `The fan has been turned off. It continues to turn out of habit. This is called momentum, or loyalty.` | at 20: `20 pivots. The table has requested a statue. It has been denied. It has been offered a very nice plaque.`

**sort**: `Sort by Vibes complete. The rows are in exactly the order they were in. This was the optimal order.` | `Sorted again. Already optimal. The rows would like to be left alone to be optimal.` | `The rows went on a short journey and came back. Nobody was changed. Everybody has stories.`
**fmt**: `Conditional formatting applied. Cells turn lilac when sad, mustard when expecting something, and beige when they are Dennis.` | `Everything is beige now. Dennis has been informed. Dennis is delighted in the manner of a plant.` | `Formatting removed. The cells are plain again. They look like cells. They are somewhat relieved.` | `Cell C3 was too happy and has been formatted. It has asked to be called 'Cheerful (Grey)'.`

**macro**: record `Macro recording started. Everything you do will be done again, slightly later, by someone who is also you.` | stop `Macro recorded. It will repeat your last {count} actions exactly, with slight differences. Nobody will notice but the macro.` | done `Macro playback finished in 7 1/2 seconds. It did exactly what you did. It looked less sure.` | empty `Playing an empty macro. 7 1/2 seconds of nothing, very carefully. Please do not interrupt it.` | thanks `Past You has left a note in H12. It says 'thank you'. It is not in your handwriting. It is not in anyone's.`

**undo** (bag of 4): `Undo complete. Management has restored the previous state. The previous state wants you to know it was fine.` | `Undone. The cell has gone back to what it was. It is having a moment about it.` | `Undo complete. Undo also undid something you did not do. It was Thursday. Thursday is fine.` (from the 4th undo) | `Nothing left to undo. Redo has nothing to redo. They have agreed to be coworkers about it.` (after 10)
**redo** (bag of 3): `Redo has been pressed. Redo has thought about it. Redo is not able to, at this time.` | `Redo does nothing. It has done nothing with great sincerity since Q1.` | `Redo is sad about it. It would like you to know that it tried, in spirit.`

**quiet (Management, Σ cell)**: select `Totals row selected. Please hold still. This one is quiet.` | interrupted bag (one after an interrupt): `Moving. Noted. The totals row will try again when you have calmed down.` | `The total is not upset. The total is holding the word for you.` | `That is fine. Totals are patient, unlike lunches.` | done bag (after a successful hold): `Thank you for holding still. I needed that.` | `That was a total. It was also a feeling. Management will count it as both.` | `Management would like to say something, and has decided that the something was already said.` | `That is {count} of 12 quiet totals. Nobody is keeping score. The cell is, a little.` | after #6: `Fun fact: the minute is 17 seconds long. Please do not use this.` (secret hint, once) | all 12: `You have heard all twelve. The totals row would like to thank you personally and has not been able to find your desk.`

**idle (fixed ladder)**: 30 s `The cursor has moved one cell to the right to see if anyone is there.` | 60 s `You have been inactive for 60 seconds. Autosave has saved your absence. It is 1.2 KB and surprisingly detailed.` | A1 typing `Cell A1 has started typing by itself. It says =ARE_YOU_STILL_THERE(). Please do not answer. It is not a formula.` | 90 s `Management has stopped talking so you can hear the spreadsheet. It is humming. It is in a key. The key is under the mat.` | 180 s `Autosave has saved your absence twice. It would like it noted that the second one was quieter.` | return `We did not see anything. We are very good at that.`

**spam**: overheat `The workbook is overheating. A fan icon has appeared. A fee of 3 Meh has been assessed for using the fan.` | fee `Calculation fee: 3 Meh. The fee is for the calculation. The calculation was 'no'.` | recover `The workbook is responding again. It would like to be left on 'Ready' for a bit. It has earned a 'Ready'.` | second `The workbook has filed a formal request to be called 'Sheet'. The request has been approved by the workbook.` | third `The workbook is now called Sheet. It has been convinced of this. It cannot be convinced otherwise.` | fan `We did not approve this fan. We are keeping it.`
**complaint** (bag of 3, `{item}` = address): `Cell {item} has raised a concern about being clicked. The concern has been filed under 'Tuesday'.` | `Cell {item} would like it noted that it is only one cell. It has been noted. It was the first thing on the list.` | `Cell {item} has asked to be left alone for a moment. It has asked politely. It has asked 14 times.`

**cam** (cameos): 
- Dennis: first visit `Dennis (Plant) has the only chart with real data. It goes up. It is not a metaphor. It is a plant.` | `Dennis exceeded his target. He did not attend the review. He is a plant.` | tick `+0.3 cm. Dennis grew while you were reading this. He did not mention it.`
- Gerald (Gerald speaks via `api.say(..., {who:'Gerald'})`): first meeting `A cell, like a potato, is mostly water and a little bit of hope.` | if `metGerald` already set `A cell is just a very small cellar. I have lived in worse.` | Management on `gerald` typed: `Gerald (VP of Spuds) has joined the document. He has read it. He is not impressed. He is a potato.`
- Toaster: first `=TOAST() returned 'toast'. The Toaster has asked to be listed under Contributors. It is already listed under Bread.` | repeat `The Toaster has contributed a value of toast. It is the best entry in the column, and also the only one that is warm.` | if `toasterMet` set before `The Toaster recognises you. It says 'toast'. It has said it warmly.`
- Sock: `=SOCK() returned #N/A-WELL: not applicable, but we thought about you. Last seen: row 4, with purpose.` | sighting `The Missing Sock has been spotted in F6. It is on a journey. It is not a budget item.` | found `Found. Was never lost. Was in row 7 1/2 the whole time.` | Socks line in the sheet: `7 1/2 socks, one missing.`
- Boss key: `This is not the other spreadsheet, Quarterly_Report_FINAL_v7_REAL.xlsx. That one is for looking busy. This one is for being busy about nothing.` plus if `bossKeyUsed` is truthy a second line 3 s later `v7 is still in the Lobby. It saw things.`
- Meaning/Half row: selecting the half row `Row 7 1/2 selected. It is half a row. It has full responsibilities.` | typing in the half row `Content filed under Row 7 1/2. Please see Form 27B/6 (Request for Form 27B/7).` | first arrow-in `Row 7 1/2 has been requested since 1998. It has still not been installed, yet here it is.`
- Other micro lines (`ambient` bag, 8): `Please enter a number between 1 and 10. Any number is fine. Per policy, 7 1/2 will be selected for you.` | `Completeness is at 61%. It rounds itself back down when it feels ambitious.` | `Freeze Panes engaged. Row 1 is frozen. It has been told it can thaw when ready. It is not ready.` | `Merged A1 and B1. They are now one cell with two jobs and a single bad day.` | `Find and Replace: found 'meaning' 0 times, replaced 'meaning' 0 times. Replaced it confidently.` | `Workbook saved. The workbook wishes to be known as 'Meaning_Q3_DRAFT(2) (3) (final)'.` | `Tuesday column: empty. It has been empty since the module began. It is bracing.` | `Your formula has been reviewed by a cell that does not trust formulas. It enjoyed yours.`
- Moth cameo: `A cursor is moving in B2. You are not moving it. Nobody is moving it. Anonymous Moth has joined the sheet.` | `Anonymous Moth is typing... Anonymous Moth wrote: 'you good?'` | `Anonymous Moth has left. They flagged B2 as 'warm'. B2 has not been the same, in a good way.` | `People viewing: 3. Anonymous Tuesday has joined. Please act normal. Please be on a different day.`
- Clock click: `The clock reads 4:17. It has read 4:17 since the building opened. It is confident.` | Q button click: `Q3 is current. Q4 is coming. Q5 is on a different sheet.` | Save: `Saved? Possibly. Autosave would like to comment, and then has not.` | Copy/paste: `Copied a feeling. Pasting it will make it weaker, as with all feelings.` | `Pasted. The feeling is weaker now, as with all feelings that have been copied.` | Ctrl+Z empty: `Undo: undid nothing, firmly.` | hat tab: `Sheet2 is Sheet1 with a hat. The hat is not in any of the cells. It is in the spirit.`
- Overflow (>80 chars in one cell): `Cell {item} has been asked to hold this. It is holding this. It would like help.`
- Fill/Half-row placeholder, formula bar placeholder: `type a formula, or a feeling, or a Tuesday`.

### 12.3 SECRET AND ENDING LINES
**secret**: `=MEANING()` first (after 3 s of silence) `You were not supposed to find that. It is empty. It is very well organised.` | second `=MEANING()` `7 1/2.` (cell text only, no line) | `=ROUND(MEANING(),0)` `We do not have an 8. Management is looking for one.` | `sandra` typed `Sandra from Compliance has opened this cell for review. The cell is locked and has asked for a lawyer.` | `:17` achievement toast text in the achievement desc. | `You rounded the meaning to 8. Management has stamped it 'Provisional' and put it in a drawer.`
**close** (fixed sequence): 
1. `It is time to close Q3.`
2. dialog title `Save changes to Meaning_Q3_DRAFT(2).xlsx before closing?` buttons `Yes` `No` `Maybe` `Cancel`
3. any button: `Close workbook? Save changes? Yes, No, Maybe, Cancel. All four have been chosen. The workbook stays open.`
4. audit card (slides in): `Irregularities found: 9. Eight are cells. The ninth is the vibe. Meaning: 7 1/2. Variance: a gentle shrug.` (with signature row: `Management` | `Sandra: approved. Sandra: but see attached.` | `Gerald 🥔 (potato stamp)` | `Autosave (a tiny spinner)`)
5. `Congratulations. You have closed the quarter. The quarter has been opened again so you can close it better.`
6. reset line: `Everything has been saved. The workbook is closed. The workbook is open. The workbook was never not open. Welcome back.`
**q** (quarter reprises, fixed): 
- Q4 welcome `Welcome back to Q4 Meaning Projections. Please enter your meaning in the highlighted cell. It is still highlighted in the sense that I looked at it.`
- Q4 row `Q4 begins. Row 1 reads Purpose, Target, Actual. Actual now says 'slightly more'. Do not look into it.`
- Q4 extra `Please disregard the preceding minutes. Autosave has not saved them.`
- Q5 `Q5 is on a different sheet.` then `Sheet 7 3/4 has appeared. It has been waiting for Q5 the whole time. It is not a quarter. It is a feeling about one.`
- Q6 / Q7 `Q{count} begins. It is the same quarter. It is slightly more confident about it.`
- Q7 1/2 `Q7 1/2 begins. There will be no Q8. Q7 1/2 has asked to be the quarter, from now on.`

---

## 13. ACHIEVEMENTS (ids prefixed `spreadsheet-meaning.`; 11 total, 6 secret)

Declare with `P.addAchievements([...])`; unlock with `api.achieve(id)`. Icons: Emoji 12 or older only.

| id | name | desc | icon | secret | reward |
|---|---|---|---|---|---|
| `spreadsheet-meaning.first` | Grand Magnus Opus of Cell A1 | Enter your first value into any cell. The cell has been waiting for this since the Bronze Age. | 📊 | no | 1 |
| `spreadsheet-meaning.feelings` | Fellow of the Royal Society of Formulas That Return Feelings | Commit 10 formulas that return a feeling. The Society has no members. You are the first. It has a chair. | 🪑 | no | 2 |
| `spreadsheet-meaning.chart` | Master Architect of the Chart of Nothing Against Nothing | Insert a chart and drag a range of cells onto it. Watch it decline. A moment of solidarity. | 📉 | no | 2 |
| `spreadsheet-meaning.pivot` | Pivotal Figure in the History of Pivoting | Pivot the table 20 times. The table has requested a statue. It has been denied. It has been offered a very nice plaque. | 🌀 | no | 3 |
| `spreadsheet-meaning.close` | Chief Closer of Q3, Pending | Close the quarter. The quarter has been opened again so you can close it better. | 📕 | no | 5 |
| `spreadsheet-meaning.quiet` | Keeper of the Quiet Total | Hold perfectly still through all 12 quiet totals in the Totals row. Nobody moved. The numbers noticed. | 🤫 | yes | 15 |
| `spreadsheet-meaning.absence` | Autosave of Absence, First Class | Leave the spreadsheet alone for 180 seconds and let it save your absence. It saved it twice. | ⏳ | yes | 7.5 |
| `spreadsheet-meaning.cartographer` | Cartographer of the Half-Row | Type =MEANING() and follow it to Sheet 7 1/2. It is empty. It is very well organised. | 🗺 | yes | 10 |
| `spreadsheet-meaning.hands` | Supreme Knight of the Circular Reference | Cause a circular reference. Management says this is how the company is run. | 🤝 | yes | 5 |
| `spreadsheet-meaning.sandra` | Subject of a Compliance Review, Pending | Type 'sandra' into a cell. The cell asked for a lawyer. The lawyer is also a cell. | 🔒 | yes | 5 |
| `spreadsheet-meaning.minute` | Keeper of the Seventeen-Second Minute | Select the Totals cell exactly when the clock's seconds read :17. The minute is 17 seconds long. It always has been. | 🕐 | yes | 50 |

(If an icon fails the lint's Emoji 12 check, swap it for a plain old one such as 📊, 📌 or ⭐.)

---

## 14. THE NOT-ENDING: YEAR-END CLOSE THAT IS NOT AN END

The `Quarter Close` bar (status bar, thin striped bar) fills by `p = min(1, t/(660*TS) + 0.003*actions)` (`t` in seconds). It reaches 100% at about minute 9 to 11 for a normal player. It is accelerated (p set to 1 within 10 s) when quiet heard >= 6 AND >= 3 subsystems used from {fill, chart, pivot, macro, quiet, sort} AND t >= 480*TS. While `mode` is `quiet`, `locked` or `dialog`, do not fire; wait until `normal`.

When p reaches 1: sequence (all managed timers, each step guarded so it cannot run twice):
1. Management beat B10 line; the `Close Workbook` ribbon button appears and pulses; after 4 s the Close dialog opens automatically (in-page dialog inside root, focus trapped, `role=dialog`, `aria-modal`; no `confirm()`).
2. Four real buttons: `Yes`, `No`, `Maybe`, `Cancel`. All four do exactly the same thing. Esc is Cancel. The dialog text is the line 12.3 close-2; the first press says close-3.
3. A one-paragraph audit card slides in (12.3 close-4) with the signature row; fanfare (`api.sfx('fanfare')`), confetti for nothing (`api.confetti`), then the sincere congratulations (close-5). Pays 10 Meh, achievement `close` (first cycle).
4. The workbook "closes" with a fold animation (a scaleY transition on the wrapper; skip under reduced motion), there is one full second of a perfectly blank screen with only `Sheet1` written very small in the middle and one `tick`, and then the workbook is back OPEN in exactly its opening state (same prefill, ribbon and tabs still unlocked, 3.2 data) except:
   - quarter `cycle += 1`; the status bar quarter reads Q4 (then Q5, Q6, Q7, `Q7 1/2` forever); `Quarter Close (Draft N) 0.0%` with N = cycle + 2 up to `7 1/2` (then it politely stays at 7 1/2); the filename becomes `Meaning_Q4_DRAFT(3).xlsx` etc. (and the title bar updates through `api.setTitle`);
   - C1 reads `slightly more`; the half row 7 1/2 has a border 1px thicker (cap 4px);
   - every error in the sheet now displays as `#OK` in green;
   - Autosum-style note: cell H9 reads `Σ: we are ok`;
   - Dennis's line is a hair taller (`+0.1 cm` per cycle on the Dennis chart);
   - the intro line is Q4 welcome (12.3), the first line of Management is exactly the same as at 0:00 except one word and the clause changed; then the Q4 row line;
   - the Moth, if it appeared, is seen in column G at the opening frame (a faint lilac cursor, explained by nobody).
5. At Q5 (cycle 2): the quarter pill turns grey and reads `Q5`, the status bar says `Q5 is on a different sheet`, and the tabs get a new tab `Sheet 7 3/4`; selecting it shows Sheet1's data with a `Ready` status (same as the hat tab).
6. Everything works exactly as at 0:00 again. The cycle repeats forever; there is no fail state and no final score; payouts per full cycle total less than 50 Meh.

---

## 15. VISUAL DESIGN

Palette tokens (all colours defined once as CSS custom properties on `.m-spreadsheet-meaning-wb`): cream paper `--sm-paper:#FFF6E0` (faint dotted texture via a radial-gradient), ink `--sm-ink:#2B2A33` (3px outlines, sticker shadows `4px 4px 0 var(--sm-ink)`), cell lines `--sm-line:#E3D5B8`, column header lilac `--sm-lilac:#CDB8F0`, row gutter mustard-light `--sm-mustard-l:#F6D98A`, formula bar mint `--sm-mint:#BFEBD7`, selection mustard `--sm-mustard:#F2B53C`, errors coral `--sm-coral:#FF7A66` with a wavy underline (`text-decoration: underline wavy`), totals row sage `--sm-sage:#BFD8B8`, mood tints `--sm-t-lilac:#D9CBF5` `--sm-t-must:#F8DE8C` `--sm-t-beige:#E8D7B5`, grey `--sm-grey:#CFC8BA`, gold gradient `#FFD76A` to `#FFF1B0`, quiet text `#4A4854` on cream (keep WCAG AA; never fade text below 4.5:1, fade the gridlines instead). Fonts: cells `ui-monospace, Consolas, monospace`; ribbon/bubbles `ui-rounded, 'Trebuchet MS', 'Segoe UI', system-ui, sans-serif`; `font-variant-numeric: tabular-nums`.

Visual rules: thick 3px ink outlines on the window, ribbon buttons (chunky, rounded, 2px offset shadow that drops on `:active`), dialogs and tabs (folder-tab shape via rounded top corners, active tab cream, newest tab bounces). Slightly lived-in: cell widths jitter by +/-3px using a CSS variable per column. Cell focus ring: 3px lilac outline with offset on keyboard focus (visible). The selected cell: mustard outline with a 3px ink sticker shadow and the fill handle. Half row: 16px tall, tilted hand-written `7 1/2` gutter label (`transform: rotate(-4deg)`), a faint sparkle (a CSS gradient, not an emoji). Row 13: sage background, thick top border.

Techniques (no canvas needed): CSS grid for the sheet (`grid-template-columns: 36px repeat(8, var(--sm-w))`, rows `28px repeat(7,30px) 16px repeat(5,30px) 34px` plus header); selected-cell marching ants (4 `linear-gradient` backgrounds animating `background-position`, disable under reduced motion); calculating shimmer (three dots via `::after` with staggered opacity keyframes) on a cell for 300 ms after commit; red comment triangle `::after` with the border trick; Sandra bubble is one absolutely positioned div reused (never appended to `body`); pivot hinge `perspective` + `transform-origin: left center`; ceiling fan four rotated rounded rectangles on `api.requestAnimationFrame` (delta-time from the timestamp argument); chart is inline SVG built with `api.el('svg', ...)` (SVG tags are supported by `api.el`); dots animate with transforms; eyes follow `pointermove`; sort uses FLIP transforms; Holding Hands cells use a tiny `rotate` keyframe plus one heart overlay; Quiet dimming is a root class with `filter`; Not-Responding/overheat is a grey-green wash with a 40px CSS hourglass (two borders and a rotating pseudo-element) and a swaying grid; ghost cursor and Moth are inline SVG arrows (opacity .5, 10px caps label). Emoji used (all Emoji 12 or older): 📊 🧦 🥔 🌿 🍞 🔒 🎩 ⏳ ❄ ♥ ↻. Use a plain CSS gradient for any sparkle (no new emoji).

Reduced motion (`@media (prefers-reduced-motion: reduce)` plus a root class check via `api.root.closest`, or by reading the body class `pm-reduce-motion` through `getComputedStyle`; safest: also provide `.pm-reduce-motion &` selectors): pivot becomes an instant crossfade, no swing blur, no fan spin (show a still fan), no cell sway, no marching ants, quiet dimming is a stepwise opacity change, sort skips the slide, the fold animation at close is skipped (still shows the one blank second).

Accessibility: `role=grid` structure, roving tabindex, real `<button>`s for ribbon/chips/tabs/dialog, `aria-live="polite"` on a mirror strip that echoes Management's latest line and the status text, `aria-label` on every cell, visible focus rings, `aria-disabled` rather than `disabled` on the exhausted Undo, labels on the name box and formula input, chips are focusable.

---

## 16. IMPLEMENTATION HINTS

File layout (suggested order, with line budgets): header + `P.injectCSS` (about 130 lines of dense one-line rules; write full `.m-spreadsheet-meaning-` class names in CSS or generate via a template literal that `tools/lint.js` accepts; run `node tools/lint.js games/spreadsheet-meaning.js` after the first version and keep to the style that passes) | achievements and `P.addLines` calls (about 160) | tokenizer/parser/evaluator (about 150) | state, commit, undo, reactions, awards (about 220) | grid render and selection/keyboard/editor/formula bar/autocomplete (about 330) | subsystems in tier order (about 500) | scheduler, idle, spam, ending (about 160). Total about 1650. Put data arrays on single lines where possible. If the file exceeds about 1700 lines, cut STRETCH items first (section 6 tiers).

Build the grid ONCE: store cell elements in a map `cells[addr]`; `render()` only patches `textContent`, `className`, `title`, `aria-label` of changed cells. Never `innerHTML` for player-controlled text (set `textContent`). Single reused editor `<input>` positioned absolutely over the selected cell (also covers the 16px half row); the formula bar and editor stay in sync.

Time: use `api.now()` for elapsed; never `Date.now`/`performance.now`. All timers via `api.setTimeout`/`api.setInterval`; the 1 s scheduler tick is one `api.setInterval`. `api.selftest` scale constants: `TS = 0.1` (beats, close bar), `QUIET_HOLD = 1000`, idle thresholds x0.3, macro playback 750 ms, overheat lock 400 ms, drift interval 3000 ms.

Selftest (fuzz) expectations: the harness clicks random interactive elements (cells need `cursor:pointer`), types into inputs, spams 25-70 clicks on one element, double-clicks, drags, resizes, destroys and remounts the module mid-run, then runs a 20x remount storm. Requirements: no timers at load, no raw timers, no `console.error`/`warn`, no window/body/head tampering, no `alert/confirm/prompt`, no forbidden strings in any visible text, `aria-label`, `title`, input value or narrator line (`NaN`, `undefined`, `null`, `[object Object]`); at least a handful of `api.award`, `api.say`, `api.stat.*` calls; DOM must not grow past 5x. Test commands: `node tools/selftest.js spreadsheet-meaning`, then `--real`, then `node tools/shot.js spreadsheet-meaning --width 360` and at 1100 wide; read the PNGs.

Use `api.sayRandom('m:spreadsheet-meaning:<cat>', opts)` for every bag (the shuffle bag prevents immediate repeats) and `api.say` for fixed text. For Gerald use `{who:'Gerald'}`. `api.award` takes small values; a negative award for the fee.

---

## 17. RISKS: THE 5 MOST LIKELY IMPLEMENTATION BUGS

1. **Parser and evaluator leaking `NaN`/`undefined`/`null` or recursing forever.** Circular references, `x/0`, empty ranges, arithmetic on text, `SUM` of nothing, `fmtNum` on non-finite values, `null` ranges in the status-bar Count/Sum/Average, cell `aria-label` and `title` built from a missing result. Fix: depth cap 40 plus a `visiting` set, a single `fmtNum`, every display string passes through a `safe(s)` that returns `''` for non-string/number and strips the three forbidden words, evaluation wrapped in try/catch that returns the `#MEH!` mood. Test with `=A1` in A1, `=B1`/`=A1` loops, `=1/0`, `=SUM()`, `=`, `=((`, 100-character junk, `=FEEL(Z99)`.
2. **Stuck modes and half-finished gestures after fuzz input.** A drag with no `pointerup`, a Quiet Total that never finishes or never cancels (baseline pointer, 250 ms key grace), the overheat lock never releasing, the editor open on a cell that re-rendered, a dialog opening while `quiet` or `locked` is active, ghost-macro playback overlapping a new quarter. Fix: one `mode` variable with explicit enter/exit functions; every exit clears its timers and classes; reset all gesture state on `pointerdown`, `pointercancel`, `lostpointercapture`, `visibilitychange`, and in `destroy`; the close sequence waits for `mode==='normal'` and each step is idempotent.
3. **DOM and timer growth, and the leak detector.** Chart dots, Sandra triangles/bubbles, hearts, fan blades, confetti/float nodes, the Feelings list, the all-comments panel, autocomplete items, per-keystroke editor nodes. Raw `setTimeout` from module code (including inside helpers defined at load time) FAILS the run; creating anything at load time also fails. Fix: cap every list (dots 12, comments 10), reuse single elements, build lazily inside `mount`, never touch `window.setTimeout`, test remount x20.
4. **Editing and focus handling.** The first typed character getting lost when typing starts an edit; Enter/Tab/Esc and Shift variants; Tab with the autocomplete open; roving `tabindex` desync after selection changes; the editor and the formula bar overwriting each other; arrow navigation through the half row 7.5 (order 7, 7.5, 8, and `Home`/`End`/`Ctrl+End`); `Ctrl+Z` inside an `<input>` (must be intercepted so it does not do the native text undo); Space/Enter on a focused non-button cell (fuzz synthesises clicks); `keydown` on the name box accidentally moving the grid. Fix: a single `handleKey(e)` on root that checks `e.target` first (input vs cell), commit/cancel as the only routes out of editing, and a selftest of ten random keystroke sequences you run by hand.
5. **Scheduler and reset bugs.** Beats firing twice, out of order, or never (a beat whose `say` was dropped by the narrator because it never gated the UI reveal); the major beat and the micro pool colliding; the quarter reset not restoring the prefill (shared object references, undo stack and comments surviving the reset, the Moth/hearts overlays left behind); `TS` not applied consistently so the close sequence never happens in the fuzz run; the 50 Meh/cycle ceiling being exceeded; titles changed through anything other than `api.setTitle`. Fix: the beat table is data (array of `{n, t, a, fn}`), `lastReveal` is a single timestamp, `fired` is a Set, every `fn` is idempotent; `reset()` rebuilds `sheets.s1` from a clone of `PREFILL`; clear all overlays and timers in `reset()` and in `destroy()`.

---

## 18. FINAL CHECKLIST FOR THE BUILDER

- First joke within 10 s with no input (C2 types `=HOPE()` and settles on `#PENDING`, Management speaks, half row shimmers).
- Every commit has an instant specific reaction from a verb bag; a new reveal at least every 20 s.
- Core verbs: select, edit, commit, formula, fill, chart drag, pivot click/spam, macro, comment hover, quiet hold, undo, F9.
- >= 6 achievements with >= 2 secret (this brief has 11/6); >= 3 callbacks (Dennis, Gerald, Toaster, Sock, Boss key); >= 3 secrets/rare events; one long-idle behaviour (the ladder); one rapid-spam behaviour (overheat); the not-ending (close and Q4/Q5).
- `Meaning Total (H1)` is always 7 1/2. The workbook is always open. Tuesday is bracing.
