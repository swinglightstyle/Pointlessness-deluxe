# SORT THE PILE (id: `sort-the-pile`, category: `game`) - FINAL DESIGN BRIEF

Tagline: **"Drag things into the correct bin. The bins will let you know what that was."**
Window title (`api.setTitle`): **"Triage Annex, Pile 7 1/2"**. Registry title: `Sort the Pile`.
Icon: 📥 (Emoji 1, safe). Tags: `['sorting','drag','rubric']`. `unlockCost: 0`. File: `games/sort-the-pile.js` (single file, classic script, IIFE, `'use strict'`, **hard cap 1800 lines, aim for <= 1650**; section 15 lists what to drop first if the budget bites, and says how to pack the data tables so they cost few lines). CSS prefix `m-sort-the-pile-`, line categories `m:sort-the-pile:<name>`, achievements/stats/flags prefixed `sort-the-pile.` (the shared flags `metGerald` and `sockSeen` are read; `metGerald` is also set).

A builder who reads SPEC.md, VOICE.md and this file has everything needed. Where this brief says "verbatim", the text after `- ` to the end of the line is the exact string. The only token ever used in a line is `{count}` (only where a line says so; pass it as `api.line(cat, {count:n})` / `api.sayRandom(cat, {count:n})`). Build every other dynamic string in code (percentages, item names, bin names). Never let a raw `{x}` or `%x%` reach the UI.

---------------------------------------------------------------------------------------------------

## 1. CONCEPT

A real, instantly understood sorting toy. One paper-slip item at a time rides in on an Intake Tray from a pile of ambiguous office-and-life debris (A Single Glove (Left, Probably), A Quarterly Sigh, A Meeting About a Meeting, The Concept of Wednesday). You drag it into one of four chunky cardboard bins: **IMPORTANT**, **URGENT**, **NEITHER**, **PENDING RE-LABELLING**. Management then reads out your **Accuracy** to absurd decimal places, measured against **THE RUBRIC**, which Management admits it has lost.

For the first 90 seconds it feels like a perfectly normal sorting game with a slightly suspicious scoreboard. Then you begin to get accurate, the bins begin to trust you, and **the bins quietly swap labels behind a printing receipt**: your learned mapping breaks exactly when you get good. Every drop is scored by a real function (so the numbers feel real and patterns can almost be learned), then the function is moved. The only winning move is to be wrong with confidence. There is no winning move.

Around that sits a ten-beat arc: a lost rubric you can reassemble (it is the Terms of Service of a mattress), appeals that return a lower score "upheld very gently", Sandra from Compliance taping bins shut, items that develop opinions, a fifth bin that is denied ever to have existed, a rubric card that is 100% for 1.3 seconds, bins that begin answering in single words, a strangely touching confession (Management never had a rubric; it just hoped), and **Pile Zero (Provisional)**, after which the Single Glove is carried back in on a velvet cushion and the loop begins again as if nothing happened.

One-line pitch: a sorting game where the bins are scored by a rubric nobody has and the labels move when you start to trust them.

### Merged from two pitches, and what was CUT (do NOT build)
- **Kept from pitch A** (heap/pile): a decorative heap behind the live card, the Trust smiles + sticker-peel tell, the PENDING bin whose label is always mid-change, the rubric of 12 fragments (mattress Terms of Service), the recalibration DIAL (STANDARD / ALTERNATIVE / LEGACY / PLAYFUL), Appeals, Sandra Units, philosophical items, single-word bin receipts, Pile Zero, certificate, the idle self-sorting pile, the Label Drop (Sticker of Destiny), the Pile of Piles, the accuracy figure sorted into a bin.
- **Kept from pitch B** (tray): ONE live card plus a 2-card ghost queue (robust drag + keyboard model), the hidden per-bin Trust counter, label swap progression (pair, rotate, two Important, "formerly"), Pending drawer that returns the item with a sticky note, the 94.7% cap, the 61.8% resting number, Sandra's taped bin, preferred-bin hints, The Concept of Wednesday, THE RUBRIC (Original) card, "Sorting Sideways", Per-Policy clause ladder, Missing Sock and Gerald cameos, spam fine + Bin Fatigue + bin union, resize Bin Shuffle, Under Advisement.
- **CUT:** a pile of 7-10 interactive draggable cards (only the top card is interactive; the heap is `aria-hidden` decoration, max 6 DOM nodes). Rubric fragments appearing as sortable cards ("the rubric now contains itself"). The full-grid Sandra spreadsheet overlay (replaced by the Sandra Units figure and the Sandra ticker). The CSS "pile zoom" reveal (replaced by two lines of text). Accuracy that ends above 100% on the headline (the HEADLINE is capped at 94.7%; only individual RECEIPTS can show over 100%). Rubric status "Laminated" as a separate beat. Real-time dragging of two cards onto each other (the Sock + Glove pair is a button, 6.12). 8-decimal accuracy before beat 8.

---------------------------------------------------------------------------------------------------

## 2. CONTROLS

**Mouse:** pointer-down on the live card picks it up (Pointer Events; `setPointerCapture` inside try/catch, it throws NotFoundError for synthetic events and that is fine). The card follows the pointer and tilts 3 degrees per 600 px/s of horizontal velocity (clamped +-9, max one style write per frame). A swinging luggage tag showing the card's title hangs from it. Bins within 120 px of the held card open their lids and lean toward it by up to 6 degrees (`--lean`), each by a different factor ("the bins have opinions about being chosen"). Entering a bin plays `tick` (once per entry). Release over a bin (hit-test the bin rects with 16 px slop, nearest centre wins) to drop. Release over the Under Advisement strip: secret 9.8. Release over the Intake Tray itself: **Sorted (Sideways)** from beat 8, otherwise a return. Release elsewhere: the card flies back to the top of the tray with a small `boing` and a `returned` line.
**Click-to-sort:** pointer-down then up within 6 px and 300 ms is a click: it SELECTS the card (outline plus `select` line); clicking a bin then drops it. Clicking a bin with nothing selected still drops the live card there (this is how Tab-then-Enter works with no pick-up mode). Clicking the card again deselects.
**Touch:** the same Pointer Events. `touch-action:none` ONLY on the live card, the sticker handles and the accuracy handle; the rest of the page scrolls normally. While dragged by touch the card is lifted 40 px above the finger. Bins have `min-height:56px`; every button >= 44 px on `(pointer:coarse)`. Long-press (500 ms without moving 6 px) = **Hold Up To The Light** (6.14, COULD tier).
**Keyboard (full play without a mouse, every feature reachable):**
- The live card is a real `<button>` (`aria-label` = `<title>. <caption>. Press Enter to pick up.`). It is the only card with `tabindex="0"`. The ghost queue and the heap are `aria-hidden` and not focusable.
- **Enter / Space** on the card: pick up (state `lifted`; the aria-live region says `Lifted: A Single Glove (Left, Probably). Choose a bin.`). Then **1 / 2 / 3 / 4** (or **5** while the fifth bin exists) or **Left / Right** move the visible bin-cursor ring; **Enter / Space** drops; **Esc** puts it back.
- Pressing **1-4 with nothing lifted** sorts the live card straight into that bin (shortcut). Digits refer to bin POSITION in DOM order (Important, Urgent, Neither, Pending), never to the current label.
- Bins are real `<button>`s with `aria-label="Bin 2, currently labelled Urgent, 3 items"`. Tab to a bin, Enter drops the live card there.
- **R** (or click the clipboard) reveals one rubric fragment. **L** opens/closes **Look Closer** (label history). **M** = Ask Management. **A** = File an Appeal (from beat 4). **Esc** closes Look Closer / cancels sticker mode / skips the ending ceremony.
- **Shift+1..4** peels that bin's label sticker into your hand (`sticker mode`, secret 9.3): then **Enter** applies it to the live card, **Shift+<same digit>** applies it to its own bin (secret 9.4 when it is bin 4), **Esc** cancels.
- **Tab** also reaches: the three footer buttons (Appeal, Look Closer, Ask Management), the clipboard, each receipt in the rail (a receipt is a button; Enter selects it as the appeal target), the footnote marker, the two ending buttons.
- Keys are ignored when `event.target` is an input/textarea/select (there are none, but be safe) or when Ctrl/Meta/Alt are held. The boss key and Lobby shortcuts are off in modules; every letter belongs to the module.

**All state is reflected in ONE `aria-live="polite"` region** inside the module (the receipt summary, e.g. `Sorted into Urgent. Accuracy 61.4%.` and pick-up/drop/return announcements). Management lines go through `api.say` (the engine announces those). **The bin swap is deliberately NOT announced.** A screen-reader user gets only the line `Labels may have changed.`, once per 10 swaps (the joke is that it is accurate). Do not put `aria-live` anywhere else.

**Never block a spamming player.** The only hard locks are: `fatigue` (3 s), `break` (4 s), `union` (15 s), `wednesday` refusal (4 s), the ending ceremony (skippable). Everything else must accept input at any time.

---------------------------------------------------------------------------------------------------

## 3. SCREEN LAYOUT (all inside `root`; width-flexible 360-1400 px)

Root gets `m-sort-the-pile-root`. Media queries see the window, not the root, so a managed `resize` listener (`api.on(window,'resize',...)`) plus one call at mount reads `root.clientWidth` and toggles `m-sort-the-pile-narrow` when < 520 px. Also reflect `root.closest('.pm-reduce-motion')` or `matchMedia('(prefers-reduced-motion: reduce)')` (try/catch) into class `m-sort-the-pile-rm`. The same resize handler drives the Bin Shuffle secret (9.9).

Wide (>= 520 px), top to bottom:
1. **Top strip** of three paper tags (slightly rotated, sticker shadow):
   - **ACCURACY**: big hand-stamped tabular numeral (`font-variant-numeric: tabular-nums`; wiggles when it changes), a tiny denominator line (`of rubric`), a footnote marker `*` (a button). It is also a drag handle (secret 9.5).
   - **ITEMS SORTED**: `Items Sorted: 14 (of an unknown total)`; the denominator phrase rotates every ~40 s (6.13).
   - **RUBRIC**: the status (`Missing`, `Located`...) plus `v4` and `n/12` fragments; it is the clipboard's label.
2. **Management strip** (thin, under the top strip): the label `MANAGEMENT` and the text `Under Advisement: 0` (it is a drop target, secret 9.8). It is NOT a second speech bubble. It is purely this drop zone plus a decorative paper clip.
3. **Two-column main** (`grid-template-columns: 55fr 45fr`, gap 14 px):
   - **LEFT, the Intake Tray**: a conveyor strip (slow `repeating-linear-gradient` stripes, off under reduced motion) with the **live card** (min 220x140) on top of a **cardboard box with no front** (CSS `clip-path` polygon, wobbly `border-radius: 12px 18px 14px 20px`). Behind the live card: the **heap** (<= 6 decorative paper slips, rotated -8..+8 degrees with idle wobble keyframes, captions clipped, `aria-hidden`), and the **ghost queue** (the next 2 cards peeking out, titles blurred with `filter:blur(5px)` until they reach the front). A small tag `Pile: 23` and, from beat 5, a tag `Overflow: 14 (see Annex)`. The Pending drawer (see-through, with `Re-label in: 7 1/2 days`) hangs on the tray's right edge.
   - **RIGHT, the Bins**: a 2x2 grid of cardboard bins (a fifth cell is created lazily for the beat 6 question-mark bin). Each bin: hinged lid (pseudo-element, `transform-origin: top left`), a face (two dot eyes; a mouth that is a CSS curve bending with Trust: flat / smile / big smile / uneasy), a big tilted taped **label sticker**, a corner **peel** pseudo-element (rotates in at Trust 2), a **counter** under the label (6.13), and a **spill** (<= 6 emoji miniatures at the mouth, oldest removed). Below the bins: the **receipt rail** (<= 5 receipts, buttons, newest on the right, tucked as a stack; on narrow a horizontal scroll strip).
4. **Rubric clipboard** (top-right corner on wide, a collapsible header button on narrow): legal-pad yellow with a red margin line, a binder clip, a pencil on a string, torn bottom (polygon clip-path), the 12 numbered lines as redaction bars (thick ink rects with a faint scanline) that reveal torn text when collected.
5. **Dial** (from beat 4): an SVG semicircle above the scoreboard with four labelled stops and a needle.
6. **Footer button row** (real buttons): `File an Appeal` (appears at beat 4), `Look Closer (L)`, `Ask Management (M)`; and the footer counter `Label Revisions: N` (appears at beat 3; lies after the ending, 11.4). Under it a one-line `Sandra's Policies` ticker (from beat 7).
7. **Overlays** (created lazily, reused): the SORTED rubber stamp, the Sandra ribbon, the speed-camera flash, the fine slip, the Look Closer panel, the footnote bubble (one reused element), the ending stage, the 100% flash, the idle oversized cursor, the grey `Break` veil, the union signs.

Narrow (< 520 px): Tray on top (min-height 240), bins 2x2 below, receipts as horizontal scroll strip (`overflow-x:auto` INSIDE the strip; the page must never scroll horizontally), rubric as a collapsible header button, Management strip full width. All targets >= 44 px.

### 3.1 DOM of the live card (prevents transform conflicts)
```
button.m-sort-the-pile-card [data-iid]            <- position + drag transform (translate3d + rotate) lives HERE only
  div.m-sort-the-pile-cardfx                      <- entrance, wobble, shake, light/translucent, refusal jiggle (animations here)
    div.m-sort-the-pile-art    (1 or 2 layered emoji, 56 px, drop-shadow; or a CSS shape)
    div.m-sort-the-pile-title  (bold)
    div.m-sort-the-pile-cap    (one-line caption, a joke)
    span.m-sort-the-pile-sticky (optional sticky note: "Urgent (Pending)", "I thought about it")
    span.m-sort-the-pile-hint   (optional thumbs-up, beat 6+, positioned near the hinted bin)
  div.m-sort-the-pile-tag (luggage tag, only while dragged)
```
Flying clones (card into a bin, fly-back, idle ghost-drop) are separate short-lived `div`s (cap 3 live) removed by `api.setTimeout`, NEVER by `animationend` (see Risks).

---------------------------------------------------------------------------------------------------

## 4. DATA MODEL

```js
BINS = [ {pos:0,color:'coral',icon:'📌',lab:{base:0,suf:'',ov:null},trust:0,count:0},   // Important
         {pos:1,color:'mustard',icon:'⏰',lab:{base:1,suf:'',ov:null},trust:0,count:0},  // Urgent
         {pos:2,color:'mint',icon:'🌫️',lab:{base:2,suf:'',ov:null},trust:0,count:0},    // Neither
         {pos:3,color:'lilac',icon:'🏷️',lab:{base:3,suf:'',ov:null},trust:0,count:0} ]  // Pending Re-Labelling
BASE = ['Important','Urgent','Neither','Pending Re-Labelling']      // uppercased by CSS only
```
- A bin's **colour, emoji, position, counter, Trust and spill belong to the BOX**. Only the **label** moves: `lab.base` (0..3, the word that is shown and scored), `lab.suf` (suffix such as ` (formerly A Single Glove)` or the Pending versions), and `lab.ov` (a temporary display override such as `Cl. 4(b)` or `?`; scoring ignores overrides). **Scoring always uses `lab.base` of the bin the item landed in** (so a swap changes what the same gesture scores, which is the joke).
- Display text of a label: `ov || (BASE[base] + suf)`. `aria-label` follows it. Never derive scoring from the DOM text.
- **Item:** `{id, kind:'normal'|'special', emoji, title, cap, sticky:null|{base, text}, split:bool, hint:null|0..3, applied:bool, say:key|null}`. Items are plain objects built from the tables in section 17. The queue is `queue[]` (live = `queue[0]`). It is refilled from a **shuffle bag** (`bagNormal`, ~54 items, no repeat until empty; `bagAbstract` ~11 items used from beat 8) so that `queue.length >= 3` while play is active. Specials are `queue.splice(1, 0, item)` so they arrive AFTER the item currently live/dragged (never yank a card from under a drag).
- **Pending drawer:** `drawer[]` (cap 3, items waiting to return with a sticky) and `returning` timers.
- **Rubric:** `frag = []` indexes revealed (0..11), `bagFrag` = shuffled 0..10 (11 items); fragment 11 (the smiley) is added only by the beat 9 event. `rubricSeed` (int), `rubricVer` (4 at first install; +1 per Begin Again), `rubricStatus` index.
- **Labels history:** `hist[]` of `{text, struck:bool}` (newest first, cap 8 in the DOM; seed with one struck row `Please Do Not Use This Bin`).
- **Receipts:** `recs[]` cap 5: `{id, fig, den, binPos, labelText, title, appealed, el}`.
- **Counters:** `S = {drops, sorted (the displayed count, may be a half), dropsForProgress, swaps, spam, appeals, sideways, sigh:[b,b,b,b], glove:[b,b,b,b], consec...}`; persisted subset in 12.

---------------------------------------------------------------------------------------------------

## 5. SCORING AND THE ACCURACY NUMBER

The score is **genuinely computed** (so it feels real), then deliberately made untrustworthy.

```js
function hash(s){ let h=2166136261>>>0; for(let i=0;i<s.length;i++){ h^=s.charCodeAt(i); h=Math.imul(h,16777619)>>>0; } return h; }   // FNV-1a, local copy
const smell = item => hash(item.id+':'+rubricSeed) % 4;            // hidden; the bins "react" to it
function raw(item, base){                                          // base = lab.base of the bin chosen (or the sticky's base)
  let d = Math.abs(smell(item)-base); d = Math.min(d, 4-d);         // 0,1,2
  let s = [96, 62, 29][d];
  const dial = DIAL;                                                // 0 STANDARD, 1 ALTERNATIVE, 2 LEGACY, 3 PLAYFUL
  if (dial===1) s = 100 - s;
  else if (dial===2) s = s*0.4 + 8;
  else if (dial===3) s = 50 + 70*Math.sin((hash(item.id)%97) + S.drops);   // can reach -20..120 on RECEIPTS
  s += vibes();         // beat 2 only: ((hash(item.id+S.drops)%5)-2)*9  -> clearly-wrong can beat clearly-right
  if (taped(bin)) s = s*0.5 + 25 + (policyNo % 7);                   // Taped Bin Scoring (6.6)
  if (consensus) s -= 9;                                            // dropped where the hint pointed (6.7)
  s += api.rand()*12 - 6;                                           // seeded noise
  return s;                                                         // keep the raw value; clamp only for the headline
}
```
- `rubricSeed` is re-rolled (`api.randInt(1, 999999)`) whenever **a label swap happens** AND whenever the **Rubric Status** changes. The dial advances **every 8th drop** (STANDARD, ALTERNATIVE, LEGACY, PLAYFUL, STANDARD...) from beat 4 (before beat 4 the dial is fixed at STANDARD and hidden).
- **Applied label (secret 9.3):** an item with `applied:true` scores exactly 100 on each of the next 3 drops (the counter lives in `S.appliedLeft`), then reverts.
- **Receipt figure** = `raw()` formatted with `dec` decimals (below), clamped to [-25, 125]. It may exceed 100 (PLAYFUL) or be negative. One receipt in 14 prints `ACCURACY: SEE ATTACHED` instead (never at the first three drops). From beat 8, one receipt in 2 prints a single word instead of a figure (`binWords`, 7.9). Special receipts: `COLLECTIVE`, `PROUD`, `KEPT FOR FURTHER LABELLING`.
- **Decimals by beat:** `DEC = [1, 2, 3, 3, 4, 4, 4, 6, 8, 1]` (index = beat-1). `fmt(v)` = `v.toFixed(DEC[beat-1])`. The headline uses the same digit count, so it creeps as the receipts do: 74.2% then 74.21% then 74.2088% then 74.20881354%. The figure ends each receipt with a tiny marker (`*`, `†`, `‡`, rotating). Clicking any marker opens the one reused footnote bubble (a `footnote` line, always a variation of "see footnote").
- **The denominator label** changes without comment every ~25-40 s (`Denominators`, 6.13): `of rubric`, `of items`, `of Tuesdays`, `of feelings`, `of Sandra` (the last one from beat 5). The receipt prints it as `ACCURACY 61.4417% (of rubric, 3/4 present)` where `a/b` are random with `a <= b <= 4`.
- **HEADLINE (the big numeral):** starts at **61.8**. After each drop: `acc = clamp(acc*0.72 + clamp(raw,0,100)*0.28, 4, 94.7)`.
  - **The first three drops are scripted** (they teach the premise): receipts `74.2`, `57.9`, `66.5`; headline after each `63.4`, `59.9`, `64.2`. Management says the matching `firstDrop` line (7.1).
  - **Cap:** the headline never exceeds **94.7%**. When the computed value would pass it, clamp and say a `cap` line (at most once per 5 clampings).
  - **Resting number (Running Gag):** after 10 s with no drop, the headline relaxes toward **61.8** by 4% of the gap per 500 ms tick (`api.setInterval`), so whenever nothing is happening it reads 61.8%, whatever you did. The first time it settles, Management says a `settle` line.
  - **Personal Best (Unverified):** `save.best = max(best, acc)`, shown only in Look Closer and the ending as `Personal Best (Unverified): 83.7%`.
  - **Override modes** (priority high to low), shown in place of the number: `withdrawn` (`ACCURACY: WITHDRAWN`, from beat 9's 100% moment until the ending), `hidden` (`--`, 20 s after the reunited glove), `hundred` (`100%` for exactly 3000 ms in beat 9; `100.0%` for 1300 ms for the Rubric Original), `important` (the permanent `IMPORTANT%` from secret 9.5: the number still shows, the percent sign becomes the word, e.g. `61.8 IMPORTANT%`). Beat 10 resets the override to normal.
- **Sandra Units (from beat 7):** below the receipt figure print `= 4.5 Sandra` where `sandra = clamp(raw,0,100)/16.7`, one decimal.
- **Meh per drop:** `api.award(clamp(0.2 + 1.3*clamp(raw,0,100)/100, 0.2, 1.5))`. Every 25th sorted item: flat **5 Meh** "Quarterly Sorting Bonus" (`bell`, a `bonus` line). Never more than 50 Meh in a single burst. Secret and ending payouts are in 12.

---------------------------------------------------------------------------------------------------

## 6. MECHANICS AND SIDE FEATURES

### 6.1 The drop pipeline (one function, synchronous; visuals are fire-and-forget)
`commitDrop(item, binPos, via)` does, in this order, with no timers inside the logic: (1) guard against locked states and a stale `item !== queue[0]`; (2) `S.drops++`, progress credit (7.1); (3) compute `raw`, update headline/best; (4) update bin `count`, `trust`, spill, counter text; (5) decide a label swap (6.2) and apply it to DATA immediately (the DOM crossfade is scheduled afterwards, masked behind the receipt print); (6) push the receipt (cap 5); (7) say one line (priority by 7.1 table); (8) `api.award`, `api.stat.inc('sort-the-pile.sorted')`, achievements checks; (9) `nextCard()` which shifts the queue, refills the bag, builds the next live card (re-focus it if the old one had focus) and fires item/arrival lines; (10) schedule save (debounced). A rubber stamp reading **SORTED** (SVG, rotated -8 degrees, double ring, rough edge via `feTurbulence`+`feDisplacementMap`) slaps across the card clone for 400 ms; the clone then shrinks into the bin mouth (scale + translate), and a miniature joins the spill. All of that is the clone's CSS; the logic has already moved on, so a 70-click burst cannot desynchronise anything.

### 6.2 Trust, the tell and the swap (the core joke)
- Each bin has hidden **Trust** (integer). Every drop INTO a bin: `trust++` for that box. A tiny smile on each bin face reflects it (0 flat, 1 slight, 2 big, just after a swap uneasy for 2 s). **Smiles only appear from beat 3.** Before beat 3 nothing swaps (Trust still accumulates, so the first swap can come immediately on entering beat 3 if a bin already holds 3).
- **The tell:** at Trust 2 the label sticker's top-right corner peels (a pseudo-element corner with a gradient, rotate-in) for 1.2 s and the bin hums (`tick` once). No line is spoken for it by default (an optional `swapTell` line with 25% chance).
- **The swap:** on the drop that takes a bin's Trust to **3** (beat >= 3 only), after step (5) of the pipeline, that bin's label swaps. Trust of the bins involved resets to 0, and each gets the `uneasy` mouth for 2 s plus slightly wetter ink (a 2 s `filter: blur(.4px)` on the sticker text).
- **The Pending bin NEVER swaps its label with another** (its label is always mid-change, 6.3). Only bins 0, 1, 2 participate.
- **Swap rules progress with `S.swaps` (count of swaps so far):**
  1. `swaps 0..1` -> **pair swap**: the label of the triggering bin trades places with a random other non-Pending bin.
  2. `swaps 2..4` -> **rotate**: the three labels rotate (0->1->2->0) or (0->2->1->0), random.
  3. `swaps 5` -> **Important (Shared)**: ONE time, in beat 8 or later: the Neither bin takes the label `Important` too (two bins both read IMPORTANT; the base word `Neither` is nowhere on the board; both Important bins lean toward each other and mutter, 7.9). When Trust next trips on either, it reverts (both labels return to a pair swap).
  4. `swaps >= 6` -> **formerly**: the swapped label gains a suffix ` (formerly <previous item title>)` where the title is the previous DROPPED item (fallback text `A Glove` if none, never a missing value); the suffix is cleared by the next swap of that bin.
- **Masking:** the swap crossfades the label text in 300 ms (a slight blur) under a clip-path wipe while the receipt printer animation covers the label strip. It makes a faint `whoosh` (quiet) and **no announcement**. `Label Revisions: N` in the footer ticks up. Players who watch the label history panel (Look Closer open) or hover a label within 8 s of a swap are "noticed" (`S.noticed++`).
- **Per policy (Running Gag 1):** 6-9 s after every swap, Management says the next entry of the **Per Policy ladder** (`perPolicy`, 7.4), unless the swap was noticed, in which case a `swapNoticed` line is said instead. Swap count 5 also sticks a note on that bin: `I am the clause.` The ladder repeats its last entry after it runs out.
- **Footnote for the screen reader:** every 10th swap the aria-live region (only) says `Labels may have changed.`

### 6.3 PENDING RE-LABELLING (never swaps, always mid-change)
- Its sticker is peeled and replaced every ~40 s with a reworded version (a physically drawn peel, the old text goes into the label history crossed out): `Pending Re-Labelling` -> `(v2)` -> `(Final)` -> `(Final) (Final)` -> `(Pending)` -> `(Final) (Pending)` -> `(Please Hold)`, then random picks from the last three forever. These are `lab.suf` values (` (v2)`, etc.).
- **The drawer.** Dropping an item into Pending removes it from your hands (`binPending` line + `drawer` line) and puts it in the see-through drawer (`Re-label in: 7 1/2 days`; the countdown never ticks). After 4-6 s (`api.setTimeout`) the item comes back out of the tray (`queue.splice(1,0,item)` if the live card is being held, else at index 1 anyway) with a **sticky note** stuck on it reading one of the bin labels plus ` (Pending)` (`sticky = {base: random 0..2, text: 'Urgent (Pending)'}`) and says a `drawerBack` line. Drawer cap 3 (a 4th drop just returns the oldest at once).
- **The second time it is dropped ANYWHERE** the sticky is accepted as final: it is scored against `sticky.base` (not the bin it was dropped in) and **counts double** toward Items Sorted. Say a `stickyFinal` line. Stat `sort-the-pile.pending` counts first drops into the drawer.
- Beat 6 (7.7): the drawer is emptied back into the queue at random (all of it at once), and the sticker is reworded `Pending Re-Labelling (Pending)`.

### 6.4 THE RUBRIC and its 12 fragments
- Clicking the clipboard (or pressing R) reveals **one fragment per click** from a shuffled bag. Never the same twice. Eleven exist from the start (indexes 0-10, shuffled); the twelfth (the smiley, index 11) appears only after the beat 9 event. The clipboard is hidden until beat 2 slides it in. Each reveal: `api.stat.inc('sort-the-pile.rubricClicks')`, a `rubric` line, a pencil scribble sound (`tick`), `n/12` updates.
- Torn fragment text (what the sheet shows, in numbered order; unrevealed lines are redaction bars): see section 17.3.
- **Collecting all 12** shows the **COMPLETE RUBRIC** sheet in place: the same 12 lines, but they now read as the **Terms of Service of a mattress** (section 17.3). Achievement `sort-the-pile.rubric-laureate`, a `rubricComplete` line. Fragments persist in the save (`frag`), so a returning player keeps them (the sheet shows them struck through "per archived rubric" after Begin Again; the numbers stay).
- **Rubric Status** (shown on the tag): `Missing` -> `Located` -> `Located (Wrong One)` -> `Being Reprinted` -> `Laminated`. It advances each time the beat changes (`min(4, floor((beat-1)/2))`) and re-rolls `rubricSeed`. Version label `RUBRIC (v4)`.
- **Callback:** if the player opens the sheet after at least one swap, the current `perPolicy` clause number is already printed on the sheet's top, upside down (a small rotated text).

### 6.5 RUBRIC DRIFT (the dial) and APPEALS (from beat 4)
- **Dial:** SVG semicircle with needle and four stops (`STANDARD ALTERNATIVE LEGACY PLAYFUL`). Every 8th drop the needle sweeps to the next stop (a `dial` line). The needle is purely a view of `DIAL`.
- **File an Appeal:** a button (also **A**). It costs **1 Meh** (`api.award(-1)`, which never drops below 0) and refunds 0. It re-scores the selected receipt (click a receipt in the rail to select it) or, with none selected, the newest one. The re-score is `newFig = oldFig * (0.45 + api.rand()*0.4)` (always LOWER; if the old figure is negative it gets 7 points lower), printed over the receipt with a rotated rubber stamp from `appealStamps` and an `appeal` line. A receipt can be appealed once; a second attempt on the same receipt says `appealAgain`. The headline moves by `-(old-new)*0.08` (clamped). Stat `sort-the-pile.appeals`. With no receipts: `appealNone`.

### 6.6 SANDRA'S AUDIT (the taped bin, from beat 5; then every ~80 s)
- A red `AUDIT IN PROGRESS` ribbon crosses the root (CSS, 2.5 s, `buzz` once). One random non-Pending bin is **wrapped in tape** (repeating-linear-gradient diagonal stripes overlay) for **20 s** with a sticky saying a `tapeSticky` entry (cycling, the policy number changes each time; if `api.stat.get('tos.scrolls') > 0` one of the stickies is the Terms of Service one). Sorting into a taped bin WORKS but is scored by the **Taped Bin Scoring** formula (5) and the receipt is stamped `TAPED BIN SCORING`. When the 20 s ends the tape comes off (`audit` line 5).
- Sandra's number for policies is a counter `policyNo` that starts at 12 and increments (it feeds the formula and the stickies).

### 6.7 ITEMS ARGUE BACK (hints, beat 6+)
From beat 6 the live card gets a `hint` (a bin position). When the pointer/bin cursor comes within 120 px of the hinted bin, a faint thumbs-up (👍) appears near it. **The hint is wrong 5 times in 6** (`hint = (smell+1+randInt(0,2))%4` for the wrong case, `smell` for the right case). **Dragging an item to the bin it hints at applies a Consensus Penalty of -9** (always, right or wrong; the whole joke is that obeying the item is punished), with an `argue` line. Also a few times per session a card **creeps** 30 px toward a bin on its own and creeps back (CSS only, 700 ms, a `pileFights` line), never while lifted.

### 6.8 THE CONCEPT OF WEDNESDAY (beat 6, then rarely)
A pale-blue semi-transparent blob card (pure CSS). For the first **4 s** after it becomes the live card it **refuses to be picked up** (it jiggles away from the pointer; `wednesday` line 1; keyboard Enter says the same line, no lift). After 4 s it is **extremely light**: while dragged it follows the pointer with an eased lag (`pos += (target-pos)*0.12` per frame, delta-time based) and gently bobs. Keyboard play is unaffected after the 4 s.

### 6.9 THE MEETING ABOUT A MEETING (splits)
From beat 5 the item `meeting` can appear (1 in the normal bag from then; specials have a rule below). When SORTED it **splits into two items**, `A Meeting (Minutes)` and `A Meeting (Action Items)` (both `split:true` so they never split again), inserted at index 1 and 2 of the queue. Say a `meeting` line. They need to go somewhere. Each counts as a sort.

### 6.10 THE FIFTH BIN (beat 6, a 20 s window)
At progress 235 (once per round) a fifth bin appears with a biro question mark `?` as its only label. **Items dropped there are "kept for further labelling"**: the card disappears, the receipt prints `KEPT FOR FURTHER LABELLING`, it does NOT count as sorted and does not move the headline (no Meh). After 20 s Management denies it ever existed (`fifthBin` line 3) and the bin shrinks into a smudge (CSS) that still accepts items for 6 more seconds (`The smudge accepts your item`), then it is removed from the DOM and from digit-key handling. Keyboard: digit **5** works only while it exists.

### 6.11 PER-POLICY CLAUSE LABELS (beat 7, 25 s)
After THE RUBRIC (Original) is lost again, all four labels are replaced by clause numbers via `lab.ov`: `Cl. 4(b)`, `Cl. 9`, `Cl. 7 1/2`, `Cl. 2(a)(ii)`. Scoring is unaffected (it uses `lab.base`). The `aria-label`s say `Bin 1, currently labelled Cl. 4(b)`. When the 25 s ends the labels return ("fairly confident they were here the whole time").

### 6.12 THE SINGLE GLOVE, THE MISSING SOCK, AND GERALD (cast cameos, see 10)
- **Glove schedule:** it is the first card, then returns at progress 90, 180, 270, a second LEFT glove at beat 8, the REUNITED glove in beat 9, and the final glove on a cushion. Each appearance has its own caption and Management tone (10.1). Sorting a glove records its bin in `save.glove[bin]`; once the glove has been in **all four bins** (cumulative in the save) its next appearance is **Glove (Distinguished)** and a small gloved hand waves from the Pending bin (CSS, 3 s), achievement `sort-the-pile.distinguished-glove`.
- **Missing Sock** (`missing-sock`, beat 8 or 9, once): it will **only** go into Pending. Dropping it in any other bin returns it with a `sock` line. In Pending it takes a sticky `Pending (Journey)`. If the Glove is the NEXT card (ghost position 1) while the Sock is live, a button appears on the tray: `Introduce Them` (COULD tier). Pressing it sorts both together as **A Reasonably Matched Set (Technically)**: counts 2, and **all swaps are paused for 30 s** (`S.noSwapUntil`). Management says it is not a gift.
- **Gerald** (about 1 in 4 sessions, from beat 4, never during beats 9-10): his own card; the tray tilts 2 degrees under his gravity for 3 s. He **always sorts himself into the wrong bin** (the sort is made FOR you after 3 s of no input, into Pending, with great conviction) and thanks you. If `api.flag.get('metGerald')` he is greeted as a returning friend. Sets `api.flag.set('metGerald', true)`.

### 6.13 COUNTERS AND THE ROTATING PHRASES (two cheap running laughs)
- **Bin counters** (printed on each bin under the label, counted per BOX not per label): Important: `n items (and a feeling)` (the parenthesis only when n >= 3; `1 item`; zero reads `none yet (we feel it)`). Urgent: `n and a half` (zero: `none yet (hurry)`). Neither: `none yet, no rush` for 0, `n, in no rush` for 1-3, `Many, but we are in no rush` from 4. Pending: `n so far. n later.` The numbers come from integers; never print a non-integer count other than the literal words.
- **Items Sorted denominators** (rotate every ~40 s, never the same twice running): `of an unknown total`, `of roughly all of them`, `of 7 and a half`, `of however many are left`, `of a number being finalised`.
- **Accuracy denominators** (rotate every 25-40 s): `of rubric`, `of items`, `of Tuesdays`, `of feelings`, `of Sandra`.
- **7 1/2 (rare):** when `S.sorted` is exactly 7 the counter shows `7 and a half` with a half-item scrap drawn by `clip-path: polygon`, `bell`, and the line `There it is.`; it reads that until the next drop makes it 8. Pile-of-piles and doubling (sticky) make this rarely skippable: it fires on the transition INTO 7 from any direction, once per round.

### 6.14 HOLD UP TO THE LIGHT (COULD tier)
Long-press 500 ms (touch) or hold `Shift` on the focused card for 500 ms (keyboard): the card turns translucent and shows an emoji hint of the bins it likes (the 4 bin icons, the best-scoring one bolded). It is **wrong 1 time in 3**. Say a `light` line. Skip if the line budget bites.

---------------------------------------------------------------------------------------------------

## 7. STATE MACHINE AND ESCALATION TIMELINE (the director)

### 7.1 Progress, beats, specials, how lines are chosen
- **Progress clock.** `progress` (seconds) is advanced by a managed `api.setInterval(tick, 1000)`: `+1 * TS` per second **only while the player has produced input in the last 25 s** (so a walked-away player does not skip the story; idle has its own tiers, section 8), where `TS = api.selftest ? 6 : 1`. Each counted drop adds `+4`, but at most once per 2 s (spamming cannot rush the story).
- **Beat = the highest `i` such that `progress >= BEAT_AT[i] && S.drops >= MIN_DROPS[i]`**; beats never go backwards within a round:
```
BEAT_AT   = [0, 30, 60, 105, 150, 210, 270, 345, 435, 540]      // beats 1..10
MIN_DROPS = [0,  3,  6,  10,  15,  20,  26,  32,  38,  44]
```
  A normal player (one sort every ~6 s) reaches beat 10 at about 9 minutes and about 50 sorts. `enterBeat(n)` runs exactly once per round per beat (a `done` bitset) and does the "entry" work in the table below.
- **Generation token.** A counter `gen` increments on Begin Again and on `destroy`. EVERY delayed callback captures `const g = gen` and returns at once if `g !== gen`. All delayed work goes through `later(fn, ms)`, a one-line wrapper over `api.setTimeout` that applies this check and records the id in `pending[]` so a state exit (and `resetRound`) can cancel everything.
- **Specials director** (checked in the 1 s tick, only when the live card is not lifted and no modal ceremony runs): each special has `at` (progress threshold), `once`/`repeat`, and a `done` flag; when due it is `queue.splice(1,0,item)`. Table in 7.12.
- **Management's line selection per drop** (first match wins; all via `api.say` with the mood shown; the engine coalesces priority 0, so NEVER rely on a line being shown): 1) scripted `firstDrop` for drops 1-3; 2) an event line for the thing that just happened (swap, split, taped, appeal, cap, special card); 3) 30% chance an `item.<id>` line if that item has one; 4) 20% chance `accHigh` (raw >= 85) / `accLow` (raw <= 20) / `accDrop` (raw is >= 35 lower than the previous drop INTO THE SAME BOX); 5) `bin<Name>` by the bin (35%); 6) generic `drop`. Priority: beat intros, secrets and events `1`; the ending speech and spam panic `2`; chatter `0`. Moods: `smug` while scoring, `confused` at swaps and the rubric, `panic` at spam, `proud` at Pile Zero, `disappointed` at the withdrawn 100%, `neutral` otherwise.
- **Modes:** `play` (default), `lifted` (card held by pointer or keyboard; set `heldKind` = `card|sticker|acc`), `sticker` (keyboard sticker in hand), `fatigue` (current card refuses), `wednesday` (refuses 4 s), `break` (grey veil 4 s), `union` (15 s), `hundred` (the 1.3 s / 3 s 100% window, input still allowed), `ending` (ceremony). Only `fatigue`, `wednesday`, `break`, `union` and `ending` reject drops; each one has an explicit timer in `pending[]` and a `leave` function.

### 7.2 BEAT 1, The Premise (0:00-0:30)
Entry (mount): the first card is **A Single Glove (Left, Probably)** already on top. At 1.0 s Management says an `open` line (or `openAgain` if `api.save.get('total',0) > 0`), at 2.8 s a `firstGlove` line. The first joke (the card caption, "Found in a coat that denies ownership.") is on screen at 0 s; the Accuracy tag reads **61.8%**. Drops 1-3 are scripted (5). Each of the first three drops gets a different warm reaction. Smug.

### 7.3 BEAT 2, The Rubric Appears (0:30-1:00, >= 3 drops)
The clipboard slides in (`rubric` slot un-hidden, CSS transition). Lines `rubricIntro` (confused). Rubric Status becomes `Located`, `rubricSeed` re-rolls, `DEC` becomes 2. Vibes are on: a visibly perfect-looking drop can score 31.7% and a clearly wrong one 88.0%.

### 7.4 BEAT 3, Trust (1:00-1:45, >= 6 drops)
The tiny smiles appear on the bins; the `Label Revisions: 0` footer counter appears; Pending begins being reworded (6.3). A `b3` line. The first swap fires when a bin reaches Trust 3 (6.2). `perPolicy` ladder (verbatim, used in order by swap number; entry 5 is also a sticky on the bin; the last repeats):
1. Per policy.
2. Per policy. Clause 4(b).
3. Per policy. Clause 4(b)(iii).
4. Per policy. Clause 4(b)(iii)-bis, which supersedes Clause 4(b)(iii) while remaining beneath it.
5. I am the clause.
6. Per policy. Clause 7 and a Half, which is written on the inside of this line.

### 7.5 BEAT 4, Rubric Drift, Appeals, Pending Opens Its Mouth (1:45-2:30, >= 10 drops)
The dial appears and starts turning every 8th drop. The `File an Appeal` button appears. The Pending drawer behaviour switches on (before this, Pending files normally). Gerald becomes possible (6.12). Lines `b4`, `dial`. The Items Sorted denominator starts rotating.

### 7.6 BEAT 5, Sandra Audits, The Pile Fights Back (2:30-3:30, >= 15 drops)
`AUDIT IN PROGRESS` ribbon and the first taped bin (6.6). The `Overflow: 14 (see Annex)` tag appears (the number is `6 + floor(progress/10)`, always an integer). The Meeting About a Meeting can now appear and split (6.9). The glove returns at progress 180 (resigned). The `of Sandra` accuracy denominator unlocks. `b5` line.

### 7.7 BEAT 6, Items Argue, Wednesday, The Fifth Bin (3:30-4:30, >= 20 drops)
Hints and the Consensus Penalty switch on (6.7). Cards creep toward bins on their own. The Concept of Wednesday arrives (6.8) at the first refill after entry. The drawer is emptied back into the queue and Pending is reworded `Pending Re-Labelling (Pending)` (an `drawerSpill` line). At progress 235 the fifth bin appears for 20 s (6.10).

### 7.8 BEAT 7, Sandra Audits Your Audit, The Rubric Is Found (4:30-5:45, >= 26 drops)
Sandra Units appear on receipts and the `Sandra's Policies` ticker starts (rotating `sandraTicker` strings, 9 s each, a CSS fade). At progress 275 **THE RUBRIC (Original)** arrives (9.1); after it is sorted the 25 s of clause-number labels begin (6.11). The glove returns at progress 270 ("we meet again"). `b7` line.

### 7.9 BEAT 8, The Pile Becomes Philosophical (5:45-7:15, >= 32 drops)
Items now come from `bagAbstract` (with ~1 in 3 normal items mixed in, so it stays readable). **Bins talk back:** from here, one receipt in two prints a single word from `binWords` instead of a figure (`Fine.` `Hm.` `Alright.`), and `Important (Shared)` fires at the next qualifying swap (6.2) with the two Important bins muttering in speech-bubble captions (`binMutter`, one bubble at a time, 3 s, reused element). `Sorting Sideways` opens (the tray itself becomes the fifth drop zone, "Somewhere Else"; 7.13). A second **left** glove arrives 10 s into the beat ("It is a left. It is also a left."). The Missing Sock arrives at progress 405 (6.12). `philo` lines. Management says one trembling `philo` line about sorting from the other side. (Management admits it, quietly, in the last of these.)

### 7.10 BEAT 9, The Strangely Touching Part (7:15-9:00, >= 38 drops)
The tone changes: the conveyor slows to 40% speed, percentages stop being rewarded with fanfare, `touch` lines. A **scripted sequence of three specials**, each waiting for the previous to be sorted:
1. progress 440: **A Single Glove (Reunited)**: a glove holding a second glove, caption `Reunited. Please do not sort this.` Sorting it anywhere makes the screen dim (a 40% ink overlay for 4 s) and Management whispers (`touch` line `I do not need the number to go up for this one`); **the accuracy is hidden (`--`) for 20 s**, then returns at 61.8%.
2. 25 s after that: **Something You Did Well Today**: not graded. All four bins open their lids and lean in at once, each offering to hold it ("they would all like to hold it, we will let them take turns"). Dropped in any bin, it is accepted silently: the headline reads **100%** for exactly **3000 ms** with no explanation (no confetti, no sound but a single soft `bell`), then **ACCURACY: WITHDRAWN** (the `withdrawn` override) stays until beat 10. Disappointed mood, sincere.
3. 6 s later: the **twelfth rubric fragment** is found: a hand-drawn smiley (the 12th line of the sheet). Without it `n/12` can never reach 12.
No new swaps happen for the whole beat (`S.noSwapUntil = Infinity` until beat 10). `b9` lines. The bins go quiet (their mouths flat, no mutters).

### 7.11 BEAT 10, Pile Zero (provisional) and Back To Normal (9:00-10:00)
When `progress >= 540 && S.drops >= 44` AND the beat 9 sequence is done (or `S.sorted >= 60` AND beat >= 9 AND the sequence is done, whichever comes first): **arm the ending**: stop refilling the bag, drain the remaining 2-3 cards (the ghost queue empties visibly), and when the queue is empty the ending ceremony starts (section 11). Never trigger it mid-drag.

### 7.12 The specials table (director; `at` = progress seconds)
| special | at | rule |
|---|---|---|
| glove #1 | 0 | the first card, always |
| glove #2 (hopeful) | 90 | once |
| glove #3 (resigned) | 180 | once |
| glove #4 (we meet again) | 270 | once |
| glove #5 (also a left) | beat 8 + 10 s | once |
| glove #6 (reunited) | 440 | once, beat 9 sequence step 1 |
| meeting | 150 | first one forced; then 1 in the bag |
| wednesday | beat 6 entry | once, then 1 in 30 refills |
| rubric-original | 275 | once forced; then 1 in 25 refills after beat 4, at most one per 3 min |
| gerald | beat >= 4 | 1 in 4 sessions (decided at mount with `api.chance(0.25)`); at a random progress 150-400; never beats 9-10 |
| missing-sock | 405 | once (beat 8 or 9) |
| pile-of-piles | beat >= 2 | 1 in 40 refills |
| tuesday-preview | 360 | once, a dark slab with a clock face; ordinary sort, `item.tuesday` line, sorts nowhere special |
| did-well | beat 9 step 2 | once |
| fatigue x3 | on spam | 9.7 / 8.2 |

### 7.13 Sorting Sideways (beat 8+)
Dropping the live card onto the Intake Tray (the place it came from) counts as **Sorted (Sideways)**: it counts as `+0.5` sorted (shown as a half, so the counter can read `13 and a half`), no score, no Trust, a `sideways` line, `api.stat.inc('sort-the-pile.sideways')`, and the card goes to the BACK of the queue. Before beat 8 a tray drop is an ordinary return. The counter text for a half is built as `n + ' and a half'` from `Math.floor`, never as a decimal.

---------------------------------------------------------------------------------------------------

## 8. IDLE AND SPAM

### 8.1 LONG IDLE (the pile sorts itself, badly)
`lastInput` is stamped on `pointerdown`, `pointermove`, `keydown`, `touchstart` and `wheel` inside the root (plus `keydown` on `window` via `api.on`). A managed 1 s interval computes `idle = (api.now() - lastInput)/1000` and fires each tier once per idle episode:
- **60 s:** the heap and ghost cards shuffle in place; the live card tilts; the pile begins to sort itself: over the next 30 s, one card at a time **climbs into a random bin on its own** (a clone with tiny emoji legs, a hopeful sound `pop`), and prints a receipt reading `ACCURACY: PROUD`. Max 3 ghost drops. A `idle60` line. Ghost drops do NOT change `S.drops`, Trust, counts, the headline or progress. They are recorded in `ghost[]` for undoing.
- **90 s:** Management sorts one by hand with trembling fingers: a huge oversized cursor (SVG arrow, 140 px) appears and drops **the Single Glove** into Pending (a glove special is inserted if none is live). `idle90`.
- **150 s:** a card sorts itself into Pending and writes its own sticky note: `I thought about it`. `idle150`.
- **300 s:** every card in the queue lines up neatly, all four bin labels read **NEITHER** (via `lab.ov`), and Management says `idle300` ("Everything is sorted...").
- **ANY input** after tier 1: everything returns to the pile (ghost drops undone: spill miniatures and PROUD receipts removed, cards back to the front of the queue, `lab.ov` cleared) with a polite cough (`blip`) and an `idleBack` line. If tier >= 2 (90 s) was reached: achievement `sort-the-pile.pile-sorts-itself` (its 5 Meh reward is the payout; `save.idleSort` makes the line fire once ever). If tier 4 (300 s) was reached: achievement `sort-the-pile.pile-respects` (5 Meh reward; `save.idleRespect`).
- Under `?selftest` the harness idles 62 virtual seconds, so tier 1 fires; it must not throw, must not grow the DOM, and the first input afterwards must restore everything.

### 8.2 RAPID SPAM (Overtime)
- Two ring buffers of `api.now()` timestamps (size 30): drops and pointer-downs. **More than 12 drops, or more than 25 pointer-downs, within 5000 ms** triggers a **Sorting Velocity** event (20 s cooldown): `S.spam++`, `api.stat.inc('sort-the-pile.spam')`.
- **Effects of every event:** a red `SORTING TOO FAST` ribbon crosses the root; a speed-camera flash (a 60 ms white overlay at 30% opacity, one `pop`); a tiny fine slip prints (`FINE: 0.4 Meh. Reason: <one of Brisk, Swift, Alarmingly Prompt, Suspiciously Efficient>`) and `api.award(-0.4, 'Throughput Surcharge')` (it never goes below 0; the fee is announced as "paid in full by the bin on your behalf"); the bins grow tiny hard hats (⛑️ overlays for 10 s); the receipt printer jams into a paper chain (a CSS paper strip hanging off the rail for 10 s); the card shakes and the bins vibrate (CSS, off under reduced motion). A `spam` line (panic, priority 2). The **next 3 cards** arrive as **Bin Fatigue** cards (`fatigue` items hiding the real item) that refuse to be sorted until **3 s** have passed since they became live (a countdown ring; `fatigue` lines; the underlying item is revealed after 3 s). If the player keeps spamming through the fine (another event within 20 s) Management's tone drops and says the `breathe` line.
- **On the 3rd event in a session:** a bin yawns and says `Break.` (a speech bubble, `who:'Bin'`) and the whole window goes grey for **4 s** with a coffee-ring stamp (mode `break`; input is ignored; the veil is `pointer-events:auto` so it eats clicks; a managed timeout releases it).
- **At 12 events in a session (`save.unionSeen`):** the bins form a tiny union and demand a break: **all four lids close for 15 s** with little signs reading `ON BREAK (7 and a half minutes)`; drops are refused with a `union` line (the card returns with a bounce); achievement `sort-the-pile.union-break`. Afterwards a `unionEnd` line.

---------------------------------------------------------------------------------------------------

## 9. SECRETS AND RARE EVENTS

Beyond idle and spam (section 8), the file ships these (each with its own achievement where marked):

### 9.1 THE RUBRIC (Original) (rare; first one guaranteed in beat 7)
A card named `THE RUBRIC (Original)` (clipboard emoji with a halo). Sorted into **any** bin: the headline reads **100.0%** for exactly 1.3 s (the `hundred` override, `tada` + `api.confetti`), then Management loses it again (`rubricOther`: "I have put it somewhere safe. Safe is the problem.") and the headline **snaps to 38.2%** "to reflect the new standard" (`acc = 38.2`). The rubric is now item-shaped and returns on a card in 6-9 minutes (the 1 in 25 rule in 7.12). Special routes:
- Sorted into **Pending Re-Labelling**: the card relabels itself `THE RUBRIC (Draft)`; 100.0% for 1.3 s, then **3.2 s of silence** (set `S.hushUntil = api.now() + 3200`; suppress every `api.say` except priority 2 during it), then the single line `We do not talk about the draft.`
- Sorted into **Neither**: `That is the correct bin. That is the one we lost it in.` and achievement `sort-the-pile.ghost-rubrics`.
- The first time it is sorted (beat 7) it also starts the 25 s clause-number labels (6.11).
It awards a flat 2 Meh (not the per-drop formula).

### 9.2 THE PILE OF PILES (rare, about 1 in 40 refills after beat 2)
A card that is itself a miniature pile of 5 emoji. Dropped in a bin: all 5 items are dumped into that box with a cascade of 5 receipts, each reading `ACCURACY: COLLECTIVE` (printed 140 ms apart; the rail's cap of 5 keeps the DOM bounded), `S.sorted += 5`, the box's Trust only `+1`, a flat 3 Meh once per card, `pileOfPiles` lines. **Dropped back on the tray** (any beat): the pile gets LARGER (5 normal items are pushed into the queue), line 3. Counts toward the 7 1/2 transition (6.13) like any sorts.

### 9.3 STICKER OF DESTINY (the Label Drop)
Each bin's label sticker is a drag handle (and **Shift+1..4** starts it by keyboard, 2). Dragging a sticker onto the **live card** (or pressing Enter in sticker mode) **labels the item with that sticker instead of sorting it**: the card shows the label as its sticky; `item.applied = true`; for its next **3 drops** it scores exactly 100 anywhere (5); the bin shows a blank patch for 8 s then the label reappears; the history records `<label> (Applied To <short item title>)` (for the glove: `Pending Re-Labelling (Applied To A Glove)`). Pays **7.5 Meh once** and achievement `sort-the-pile.sticker-destiny`. `sticker` lines.

### 9.4 THE SNAKE THAT SORTED ITS OWN TAIL (self-sort)
Drag the Pending bin's sticker onto the Pending bin's own mouth, or, by keyboard, **Shift+4** then **Shift+4**. The bin turns inside out (a 600 ms CSS `rotateX` flip), a label reading `Pending Re-Labelling (Re-Labelled)` appears, and every receipt currently on the rail gets a free yellow sticky (<= 5 DOM nodes). `selfSort` lines ("You have achieved recursion. We do not have a form for that. We have never needed one. We will make one." is the first). 5 Meh once, achievement `sort-the-pile.snake`.

### 9.5 THE NUMBER ITSELF (the accuracy figure sorted into a bin)
The headline numeral is a drag handle (and a button: Enter lifts it, then a digit/Enter drops it like a card). Dropped into **any bin** it accepts the bin's label and is "sorted": the percent sign permanently becomes the word `IMPORTANT%` for the rest of the save (the number still moves; `save.accImportant = true`), 3 Meh once, `accSorted` lines, achievement `sort-the-pile.important-percent`. The aria-label of the figure reads `Accuracy 61.8 IMPORTANT percent`.

### 9.6 LOOK CLOSER (label history, key L)
A small panel listing the last 8 sticker wordings, newest first, struck through when superseded (including the Pending rewordings and a permanent crossed-out `Please Do Not Use This Bin`), plus `Personal Best (Unverified): 83.7%` and `Label Revisions (lifetime): 31` from the save. At the very end of a long session the list contains `Pending Re-Labelling (Pending)` three times. Opening it within 8 s of a swap marks the swap "noticed" (6.2). Achievement `sort-the-pile.labels-moved` is awarded at 5 swaps in a session.

### 9.7 THE BINS FORM A UNION: see 8.2 (achievement `sort-the-pile.union-break`).

### 9.8 UNDER ADVISEMENT (drop a card on Management's strip)
Dragging the live card onto the Management strip (or pressing **U**) does not sort it: Management says the `advisement` line `That is my face. I will take it under advisement.` The card goes into a hidden pile `adv[]` (cap 12, never in the DOM except the counter `Under Advisement: n`). It does not count as sorted. On the **third** drop: achievement `sort-the-pile.under-advisement` plus 5 Meh once. At beat 10 / Begin Again the advised cards are returned as new items (each with the caption `New. First time we have seen this.`) at the front of the longer new pile.

### 9.9 THE BIN SHUFFLE (resize)
If the root's width goes from >= 900 px to < 600 px at any time after mount (a one-time transition per round, with hysteresis so jitter does not retrigger), the bins re-order via CSS `order` (visual only; digit keys still follow DOM position, `aria-label`s name the current label so keyboard users can still tell) and Management says the first `binShuffle` line. Resizing back above 900 px restores the order and says `Welcome back, bins.`

### 9.10 PAIRED OFF, RARE SMALL ONES
`Glove (Distinguished)` (6.12), `A Reasonably Matched Set (Technically)` (6.12, achievement not required), Gerald's wrong sort (6.12), the sticky `I am the clause.` (7.4).

---------------------------------------------------------------------------------------------------

## 10. CAST, CALLBACKS AND RUNNING GAGS

### 10.1 Running Gag 1: THE SINGLE GLOVE
First card, again at progress 90, 180, 270, a second LEFT glove at beat 8, the REUNITED glove in beat 9, and the cushion glove in the ending. It is always "a single glove" and never gets a pair. Every appearance is greeted in a new tone (hopeful, resigned, "we meet again", exasperated-with-itself, tender, formal). Captions by appearance, in order: 0 `Found in a coat that denies ownership.` 1 `Now claims it was never lost.` 2 `Recovered from the third ficus.` 3 `Now wearing a tiny label reading ME.` 4 `It is a left. It is also a left.` 5 `Reunited. Please do not sort this.` 6 (cushion, ending) `This was in the other box.` 7 (after Begin Again) `New. We have never seen this before. It is slightly warm.` (and in later rounds the caption cycles `In a relationship with a mitten.` / `Requests to be sorted in private.`). The title is `A Single Glove (Left, Probably)` at first, `A Single Glove` later, `A Single Glove (Also A Left)` at beat 8, `A Single Glove (Reunited)` in beat 9, `Glove (Distinguished)` once it has seen every bin (6.12).

### 10.2 Running Gag 2: THE ACCURACY NUMBER
Decimals creep, the denominator label changes without comment, the figure ends in a footnote marker leading to "see footnote", and whenever nothing is happening it reads **61.8%** (5). The ending's Final Accuracy is also 61.8% ("It rounds to the first number. All numbers do.").

### 10.3 Running Gag 3: THE LABEL STICKERS
Pending keeps being relabelled with new brackets and versions, with a physically drawn peel every time. At the end the original labels return, slightly rotated, and the three original labels each carry one tiny line reading `Pending Re-Labelling` (11.4). Callbacks inside the module: the fifth bin, the Appeals stamp (`Upheld`) and the clipboard all end up with the same sticker (in the ending, each of them gets a small `Pending Re-Labelling` sticker slapped on as the glove comes in).

### 10.4 Running Gag 4: PER POLICY (7.4).
### 10.5 SANDRA FROM COMPLIANCE
Never seen, always cited: the audit tape and its policy numbers (`Policy 12` revises itself every time), the Sandra's Policies ticker, Sandra Units, the countersignature on the certificate, `Technically`. Callback: if `api.stat.get('tos.scrolls') > 0` a tape sticky cites the Terms of Service by page.
### 10.6 GERALD (Vice President of Spuds)
6.12. Reads and sets `metGerald`. His own lines use `api.say(text, {who:'Gerald'})`.
### 10.7 THE MISSING SOCK
`missing-sock` is the same sock as in the other module: if `api.flag.get('sockSeen')` or `api.stat.get('sock-matcher.entered') > 0`, Management adds the `Kevin` aside (`If you have met Kevin elsewhere...`). It has the same "journey" language as the glove, which Management never connects. The Left Sock (Kevin?) is also an ordinary item in the bag.
### 10.8 DENNIS THE LOBBY PLANT
The Ficus Leaf item and a Note From Dennis ("Water. Not asking."). Dennis is unimpressed.
### 10.9 THE TOASTER
`A Slice Of Toast (Honest)`: its only word is `Hm.` (item line).
### 10.10 TERMS OF SERVICE
The complete rubric is a mattress's Terms of Service (6.4), a nod to the Lobby's own.
### 10.11 TUESDAY
Never appears: `Tuesday (Preview)` is only a preview, and the Accuracy denominator `of Tuesdays`.

---------------------------------------------------------------------------------------------------

## 11. THE NOT-ENDING (Close of Business, about 9-10 minutes)

When the pile empties for the first time (7.11), run the ceremony (mode `ending`, all drops refused; **Esc or the `Skip (Sandra disapproves)` button after 6 s skips straight to 11.3**; each step is a `later()` timer, cancelled by skip, destroy and Begin Again):
1. **0.0 s** the box tips forward with a CSS 3D tilt (`perspective` + `rotateX(35deg)`, 900 ms; reduced motion: a fade), `bell`, and a banner unrolls: **PILE ZERO (PROVISIONAL)**. `api.confetti()`, `fanfare`. Management (proud, priority 2) says the `pileZero` lines.
2. **3.5 s** Management reads the four-line speech (`endSpeech`, 4 lines, 4.5 s apart, each priority 2).
3. **After the speech** a **certificate prints** (inline SVG, a printer-slip animation with `steps()`): `CERTIFIED SORTER OF PILES (Provisional, Pending Re-Labelling)`, a second line `Sorted, Per Rubric, Which Does Not Exist`, signed `Management`, countersigned `Sandra ("Technically")`, and a smudged paw print from Gerald.
4. **The bins each say one last word** (speech-bubble captions, 1.2 s apart): Important `Fine.` Urgent `Urgent.` Neither `Yes.` Pending `Pending.`
5. **Accuracy is shown as exactly 100%** for 3 s, then withdrawn once more (`endAcc` line).
6. **The door opens** (a CSS door edge) and Management, in a small hat, carries in one item on a velvet cushion (CSS): **the Single Glove**. Line `gloveCushion`: `This was in the other box.` The glove is `queue[0]` after the ceremony.

### 11.3 Close of Business panel
A paper panel replaces the tray (aria-live polite): `CONGRATULATIONS. THE PILE IS NOW SORTED.` / `Final Accuracy: 61.8% (rounded; it rounds to the first number, as all numbers do).` / `Management is proud of the difference this has made.` / `You are 100% accurate against a rubric of 0. This is the best score we have ever recorded for anyone, and the only one.` Two buttons: **`Begin Again`** and **`Begin Again (Secretly Different)`** (they do the same thing; the second also `stat.inc('sort-the-pile.secretly')` and says the `secretly` line). Awards **12.5 Meh once** (`save.pileZeroPaid`) and achievement `sort-the-pile.pile-zero`. If nothing is pressed for 60 s the panel stays; idle (8.1) continues normally.

### 11.4 Reset ("Normal operation resumes")
`resetRound()`: increment `gen`, cancel `pending[]`; `round++`, `rubricVer++` (v5, v6, ...); all four labels back to their ORIGINAL bases, each rotated 1-2 degrees ("slightly rotated, please do not tell them"), `lab.suf = ''`, `lab.ov = null`; **Pending sticker back to plain**; Trust 0; the bins' counters keep counting; **the footer `Label Revisions` counter shows 0 while the save keeps the real lifetime count** (it is lying); headline back to 61.8; `rubricStatus` = `Laminated` for this reset, then `Missing` again at beat 1; beats and progress to 0, but `TS` stays; swap rules reshuffle (`S.swaps = api.randInt(0,1)` keeps the first stage short); the bag refills with a **longer pile** (queue minimum 3, bag size unchanged but the first 3 entries are the returned advisement cards, then `Glove` first of all); the `Welcome to Triage. Please sort the pile.` line is the exact first line (`again` list entry by round, 7.1); the first card is the **Single Glove** with caption `New. We have never seen this before. It is slightly warm.`; the clipboard stays visible (the fragments persist) but the dial, appeals, ticker and smiles hide again until their beats. A fresh `ACCURACY: 74.2%` receipt prints (a scripted decoy, first three drops are scripted again).
Each time the ending is reached again it is sincerely offered again, a little more tired (`endTired`, indexed by round).

---------------------------------------------------------------------------------------------------

## 12. ECONOMY, STATS, SAVE

- **Meh:** per sort 0.2-1.5 (5); `Quarterly Sorting Bonus` flat 5 every 25 items; Pile of Piles 3 per card; Rubric Original 2 per card; Pile Zero a flat 12.5 once (plus its achievement reward); fines `-0.4` and appeals `-1` (balance never below 0). **The one-time secret payouts (Sticker of Destiny 7.5, idle 5 and 5, Snake 5, Under Advisement 5, the sorted accuracy figure 3, Ghost of Rubrics Past 5) ARE the `reward` of their achievement in section 13: the engine pays them, so do NOT also call `api.award` for them (no double payment).** A single call never exceeds 50 Meh.
- **Stats (`api.stat.inc`):** `sort-the-pile.sorted` (every counted sort, +2 for a doubled sticky, +5 for a pile of piles, +0.5 is NOT counted: sideways has its own stat), `.swaps`, `.pending`, `.rubricClicks`, `.spam`, `.appeals`, `.sideways`, `.pileZero`, `.secretly`, `.sticker`, `.advisement`, `.ghost`. Twelve names total, well under 300.
- **Flags:** `sort-the-pile.pileZero` (true after the first ending), `sort-the-pile.sockMet` (set when the Sock is shown); shared `metGerald` (set by Gerald) and `sockSeen` (read only).
- **Save (`api.save.set('s', {...})`, <= ~2 KB, debounced to once per 2 s and also on key events; do NOT rely on `destroy()` since `api.save.set` is a no-op after destroy):**
```
{ best:61.8, total:0, revLife:0, ver:4, round:0, frag:[], sigh:[0,0,0,0], glove:[0,0,0,0],
  idleSort:false, idleRespect:false, accImportant:false, pileZeroPaid:false, stickerPaid:false,
  snakePaid:false, advisementPaid:false, accSortedPaid:false, advisements:0, unionSeen:false, spamLife:0 }
```
  `api.save.get('s', null)` must tolerate a missing blob and missing keys (merge over defaults). Never load a non-array for `frag/sigh/glove`.

---------------------------------------------------------------------------------------------------

## 13. ACHIEVEMENTS (all ids prefixed `sort-the-pile.`; 17 declared, 9 secret)

Declare with `P.addAchievements([...])` in the file; unlock with `api.achieve(id)`. Icons are Emoji 11 or older.

| id | name | desc | icon | secret | reward |
|---|---|---|---|---|---|
| `sort-the-pile.provisional-pile` | Grand Marshal of the Provisional Pile | Sort 10 items. You have sorted 10 items. The pile has not changed. It has, however, been witnessed. | 📥 | no | 2 |
| `sort-the-pile.void` | Chief Arbiter of the Unlabelled Void | Sort 50 items (all sessions count). Management sends a letter of thanks addressed to the Void, who is not available. | 🌫️ | no | 4 |
| `sort-the-pile.labels-moved` | Supreme Overlord of Labels That Moved While You Weren't Looking | Witness 5 bin swaps in one session. You did not watch them happen. You were adjacent. | 🏷️ | no | 3 |
| `sort-the-pile.sigh` | Laureate of the Quarterly Sigh (Honorary, Unpaid) | Sort A Quarterly Sigh into every one of the four bins. The sigh has asked for a break. | 💨 | no | 3 |
| `sort-the-pile.rubric-laureate` | Laureate of the Lost Rubric (Honorary, Pending) | Collect all 12 fragments of the rubric and read them in order. They are the terms of service of a mattress. | 📋 | no | 5 |
| `sort-the-pile.over-100` | Supreme Marshal of Accuracy (Percentage Unspecified) | Receive a receipt over 100%. Management will deny it was possible and then ask you to do it again. | 🥇 | no | 3 |
| `sort-the-pile.appellant` | Appellant Emeritus (Upheld, Gently) | File 3 appeals. All three were upheld. All three went down. | 🧾 | no | 2 |
| `sort-the-pile.pile-zero` | Pile Zero (Provisional) | Empty the pile for the first time. The pile has been informed and has chosen to continue. | 🔔 | no | 5 |
| `sort-the-pile.pile-sorts-itself` | The Pile Sorts Itself (Do Not Tell The Pile) | SECRET: Do nothing for ninety seconds and be present for the pile's finest hour, which is a sort of dignified collapse. | ⏳ | yes | 5 |
| `sort-the-pile.pile-respects` | The Pile Respects You | SECRET: Idle for five minutes, then touch one pixel of the screen. The pile sorted itself and lined up for you. | 🧘 | yes | 5 |
| `sort-the-pile.sticker-destiny` | Sticker of Destiny, First Class | SECRET: Peel a label off a bin and apply it directly to an item. The item is now whatever the label says. It has not been asked. | 🔖 | yes | 7.5 |
| `sort-the-pile.ghost-rubrics` | Ghost of Rubrics Past | SECRET: Sort THE RUBRIC (Original) into Neither. You were right. Unfortunately that was the problem. | 👻 | yes | 5 |
| `sort-the-pile.snake` | The Snake That Sorted Its Own Tail | SECRET: Drop Pending Re-Labelling onto itself. Management has no form for this. It has since made one. | 🐍 | yes | 5 |
| `sort-the-pile.under-advisement` | Under Advisement (Permanently) | SECRET: Drop three cards on Management's strip. Management is taking this under advisement. | 📎 | yes | 5 |
| `sort-the-pile.distinguished-glove` | Glove (Distinguished) | SECRET: Sort the Single Glove into all four bins. It is now distinguished. It would like that on a card. | 🧤 | yes | 3 |
| `sort-the-pile.union-break` | Honorary Shop Steward of the Bins (Unpaid) | SECRET: Sort so fast the bins form a union. They did. They will not discuss terms. | 🚧 | yes | 3 |
| `sort-the-pile.important-percent` | IMPORTANT% | SECRET: Drag the accuracy figure into a bin. It is now sorted, permanently, and so is its percent sign. | 💯 | yes | 3 |

Cumulative ones (`void`, `sigh`, `distinguished-glove`) read the save so they survive between sessions. `provisional-pile` counts `api.stat.get('sort-the-pile.sorted') >= 10`.

---------------------------------------------------------------------------------------------------

## 14. VISUAL DESIGN (cheerful dysfunctional intranet, matching the Lobby)

**Palette (CSS custom properties on `.m-sort-the-pile-root`):** paper cream `#fbf3df` with a dotted-paper texture (`radial-gradient(#2b223322 1px, transparent 1.4px)` on a 14 px grid); ink `#2b2230` outlines 3 px; **coral `#ff7a6b` Important, mustard `#f2b632` Urgent, mint `#7fd6b0` Neither, lilac `#b79af0` Pending Re-Labelling**; stamp red `#d6322e`; torn-sheet beige `#efe3c2`; rubric legal-pad yellow `#fff2a8` with a red margin line `#d6322e`; receipt off-white `#fffdf6` with a faint blue ruled line (`#aac4e6`) and a dashed tear edge (`repeating-linear-gradient`); shadow `4px 4px 0 var(--ink)` for sticker-shadow cards. System fonts only: `ui-rounded, 'Trebuchet MS', system-ui, sans-serif`; receipts `ui-monospace, 'Cascadia Mono', 'Courier New', monospace`; the label sticker uses `italic` and a slight rotation. Text colour on every coloured fill is `#2b2230` (AA contrast on all four).

- **Bins:** CSS cardboard boxes: body with `clip-path`, a flap lid via a pseudo-element with `transform-origin: top left` (rotates in proportion to `--lean` and to the held card's distance), a face (two ink dots, a mouth made from a bordered half-ellipse that rotates with Trust), a taped sticky label (tilted -2 to +2 degrees, slightly torn edge via `clip-path`), a counter line in 12 px, and a mouth where cards shrink in. The peel is a `::after` corner with a gradient (`transform: rotate(...) scale(...)`, 1.2 s). Hard hats are ⛑️ at 28 px on the lid.
- **Cards:** paper slips with a 3 px ink outline, a sticker shadow, 56 px emoji (two layered for composite items: `meeting` is 📅 with 💺 offset) with `filter: drop-shadow`. The Concept of Wednesday is a pale-blue semi-transparent blob (a CSS `border-radius: 60% 40% 55% 45%` shape); Tuesday (Preview) is a dark slab with a clock face (CSS conic-gradient hands). The luggage tag is a small cream tag on a string (two keyframes with a spring).
- **Receipts:** off-white strips with a dashed edge; they print with `steps(6)` stuttering `translateY` from the bin; max 5 in the rail.
- **Rubric clipboard:** legal-pad yellow, torn bottom (`polygon`), redaction bars as thick ink rects with a faint scanline pattern, a binder clip and a pencil on a string (a CSS line). Revealed lines are handwritten italic, slightly smudged (`filter` or opacity).
- **Rubber stamp:** inline SVG, `rotate(-8deg)`, double-ring with an irregular border, roughened by one global `<filter>` (`feTurbulence` + `feDisplacementMap`) defined once per root with a unique id (`m-sort-the-pile-rough` + a mount counter).
- **Dial:** SVG semicircle, four stops, a needle transition of 600 ms.
- **Tape (Sandra):** diagonal stripe `repeating-linear-gradient` overlay with the sticky note on it. **Ribbons** (`AUDIT IN PROGRESS`, `SORTING TOO FAST`) are CSS banners crossing the root with a 2.5 s animation.
- **Reduced motion** (`.m-sort-the-pile-rm`, also the OS media query): no tilt, no conveyor stripes, no wobble, no shake, no 3D tip (use a fade), the stamp is a fade, ribbons are static for 2.5 s, the crawling creep is off.
- **Layout switch:** `.m-sort-the-pile-narrow` changes columns to one, bins to a 2x2 grid, receipts to a horizontal strip, and collapses the rubric into a header button. Check 360 px with `node tools/shot.js sort-the-pile --width 360`.
- Sound: `tick` bin hover / hum, `stamp` drop, `whoosh` swap (quiet), `bell` quarterly / seven and a half / Pile Zero, `buzz` fines and the Sandra ribbon, `tada` the 1.3 s 100%, `pop` ghost drops / camera flash, `boing` returns, `ding` Pending returns, `sad` the union and the withdrawn 100%, `fanfare` Pile Zero, `blip` pick-up.

---------------------------------------------------------------------------------------------------

## 15. IMPLEMENTATION HINTS AND BUDGET

- **Rough line budget** (aim 1650 total): CSS ~200 (dense, one rule per line), data and tables ~120 (see packing), lines ~330 (see packing), registry/achievements ~40, helpers/hash/state ~80, DOM build + layout + narrow switch ~120, drag manager (card, sticker, acc, keyboard modes) ~170, drop pipeline + scoring + receipts ~170, bins/trust/swap/counters/Pending/drawer ~150, rubric + dial + appeals + footnote + Look Closer ~110, director (progress, beats, specials, hints, Sandra tape, fifth bin, Wednesday, split) ~170, idle + spam + union + break ~130, secrets (Rubric Original, pile of piles, sticker, snake, acc, advisement, shuffle) ~100, ending + reset ~110, save/init/destroy ~50.
- **Packing the data to save lines** (the cap is on LINES, long lines are fine): one record per line in a template string split by `\n` and `|`:
  `const ITEMS = \`sigh|💨|A Quarterly Sigh|Exhaled by Finance, 3:40 PM, Level 7 and a Half.\n...\`.trim().split('\n').map(r => { const p = r.split('|'); return {id:p[0], emoji:p[1], title:p[2], cap:p[3]}; });` (check no `|` appears in any title or caption; none do in section 17). Put each line category in one `P.addLines('m:sort-the-pile:<name>', [ '...', '...' ])` call with several strings per physical line. Keep the 100+ line floor with room to spare (this brief has about 360).
- **If the file nears 1650 lines, drop in this order:** (1) Hold Up To The Light (6.14), (2) the Introduce Them button (6.12), (3) the footnote bubble (leave the marker as plain text), (4) the camera flash and paper chain (keep the ribbon, the fine and the fatigue cards), (5) Gerald's tilt animation, (6) the Pile of Piles cascade (print one `COLLECTIVE` receipt), (7) the SVG rubber-stamp filter (use a plain rotated text stamp), (8) the creeping cards, (9) the Bin Shuffle, (10) the Under Advisement strip. Never drop: the swap mechanic, the scripted first three drops, Pending's drawer, the rubric fragments, the idle tiers, spam, the ending and reset.
- **Everything via `api.*`**: `api.setTimeout/setInterval/on/onEvent/requestAnimationFrame`. No raw timers, no `window.addEventListener`, no `P.on`. No timers or listeners at load time (only inside `mount`). Do not use `Date.now`/`performance.now` (use `api.now()`), nor `Math.random` (use `api.rand()` / `api.randInt` / `api.pick` / `api.shuffle` / `api.chance`).
- **Drag manager:** one object `drag = {kind:'card'|'sticker'|'acc', el, pid, x0, y0, moved, ghost}`; `pointerdown` on the three kinds of handle starts it; `pointermove`/`pointerup`/`pointercancel` are registered with `api.on` on `root` at the start of mount and ignore events when `drag === null` (a single set of managed listeners, never one per drag, so the remount storm is safe). `pointerdown` also feeds the spam buffer. A `lostpointercapture`, `blur` or a card replacement must call `cancelDrag()`.
- **Keyboard modes** share the same state variables (`held = 'card'|'sticker'|'acc'|null`, `cursor = 0..3`) and the same `commitDrop` / `applySticker` / `sortAcc` functions as the mouse path.
- **Text safety:** every number goes through `num(x, d)` returning `'0'` (or `'--'` where stated) when not finite; clamp `dt >= 16`; guard `Math.sin` inputs; clamp the headline; build `aria-label`s from arrays with fallbacks, never from a possibly missing element; use the half-integer helper for the sideways count. The word `undefined`, `null`, `NaN` or `[object Object]` must never appear in any text, `aria-label` or `title` (the fuzzer reads them).
- **Timers and DOM caps:** heap 6, ghost queue 2, receipts 5, spill 6 per bin, hist 8, flying clones 3, speech bubbles 1 (reused), ribbons 1 (reused), footnote bubble 1 (reused), sticky notes <= 5. Remove every animated clone by `later(removeEl, ms)`, not `animationend`.
- **Reduced-motion helper:** `const rm = () => root.classList.contains('m-sort-the-pile-rm');`.
- **Management is the voice, not the HUD:** keep the module's own text to the few labels, receipts, stickers and bubbles listed; everything funny goes through `api.say`.
- **Selftest notes:** the fuzzer clicks the card, bins, clipboard and footer buttons, spam-clicks, drags, types keys (digits, Enter, Esc, letters), resizes and idles 62 s. The module must survive: a click on a bin while no card is live, Enter on a bin during `union`, Esc when nothing is held, `R` when 12 fragments are revealed, the ending buttons being clicked at random, Begin Again mid-ceremony, digit `5` when no fifth bin exists, a remount storm during the fifth-bin window.
- **Test recipe:** `node tools/selftest.js sort-the-pile --steps 600`, then `--seed 3`, `--seed 7`, `--idle 130000`; `node tools/shot.js sort-the-pile --width 360`, `--reduce-motion`; `node tools/lint.js games/sort-the-pile.js`; and `node tools/selftest.js sort-the-pile --real` as the last step.

---------------------------------------------------------------------------------------------------

## 16. ALL LINES (verbatim; the heading is the category `m:sort-the-pile:<name>`; a bullet is one string)

Rules: use `P.addLines('m:sort-the-pile:<name>', [...])` and say through `api.sayRandom(cat, {mood, priority})` (random shuffle bag) for the pool categories. **Ordered lists** (marked `ORDERED`) are constant arrays you walk in order (use your own index; `api.line` is random). `UI` lists are plain strings printed in the module's own DOM (not spoken). `{count}` appears only where shown; pass it as a token. Moods are suggestions in brackets. Mentions of a specific percentage in a line are only used where that exact figure is on screen (the scripted first three drops, the 94.7% cap, 61.8%, 100%, 38.2%).

### open [smug] (said at 1.0 s; pick random)
- Welcome to Triage. Please sort the pile. The pile is, at this time, load-bearing.
- Welcome to Triage Annex, Pile 7 1/2. Four bins, one pile, and a rubric we are currently locating.
- Please drag each item into the correct bin. The bins will let you know what that was.
- Welcome to Triage. The pile has been sorted before, but not by you, and not correctly.
- Sorting is simple. You drag. We score. The scoring is the part we are still working on.
- Valued Employee, thank you for coming in. The pile has been expecting you since a Thursday.

### openAgain [neutral] (if the save says total sorted > 0; `{count}` = total)
- Welcome back. You have sorted {count} items with us. We have kept count. We have also lost count. Both are true.
- Welcome back. The bins remember you. The bins have been told not to say how.
- The rubric is still missing. We have stopped saying 'recently'.

### firstGlove [smug] (said at 2.8 s)
- A Single Glove. We have been told the other glove is 'on a journey'. Please sort this one in the meantime.
- The first item is a glove. Its owner is unknown. Its coat has been asked and has denied everything.
- Item one. A glove. Please do not look for the other one. Management has looked. Management is still looking.

### firstDrop ORDERED (drops 1, 2, 3; scripted, matches the scripted figures)
- Correct. We think. The receipt says 74.2%. The board says 63.4%. They are measuring different weather.
- Accuracy: 59.9%. A dip is simply a rise facing the other way.
- Accuracy: 64.2%. Three sorts in. The pile is, at this time, load-bearing and also slightly lighter.

### lift [neutral] (first pick-up of each card, 40% chance)
- Picked up. Please hold it like a decision.
- Lifted. The bins are leaning in. They would like it noted that they are not.
- You are holding the item. The item is holding its breath, in a manner of speaking.
- Please carry it gently. It has been through a quarter.
- Held. The bins are looking at you with the faces they were issued.
- Management will not hurry you. Management has a meeting about being unhurried at 3:30.

### returned [neutral] (released over nothing)
- Returned to Pile. Pile accepts.
- That was not a bin. The item has been returned with a small bounce and no hard feelings.
- The item has gone back to where it was. It is the same place. It is slightly different.
- You have put it back. Putting back is a form of sorting. It is the form with the fewest receipts.
- Not a bin. Management admires the dedication to the floor.
- Item returned. The pile has not noticed it left, which is the nicest thing a pile can do.
- Dropped in the air between bins. We call this a 'maybe'. We do not score maybes.
- The item came back. They do that. It is called 'the pile'.

### select [neutral] (click without drag)
- Selected. Now choose a bin. Choose it like you mean it. Or like you will say you meant it.
- The item is selected. It has a faint outline of consent.
- Selected. Please click a bin. The bins have been informed. They are composing themselves.

### drop [smug] (generic, after any sort)
- Sorted. Management would describe the placement as 'a placement'.
- Good sort. The word 'good' here refers to your posture.
- Filed. The bin has accepted the item and thanked you with a faint paper sound.
- That is now sorted. Please do not look at it. It is shy about being sorted.
- Noted. Management has noted the note.
- A decision has been made. We are reviewing whether it was one.
- The bin says thank you. The bin says it every time. We are trying to find out if that is a trait.
- Sorted. The scoreboard has been informed. The scoreboard has views.
- You sorted that correctly yesterday. Yesterday's rubric has been archived somewhere we do not go.
- Item Sorted. Item Filed. Item has no further comments, which is also what it said when it arrived.
- That was brisk and committed. Sandra would call it 'unhurried but committed'. Sandra has not been asked.
- The pile is one item smaller. The pile has not commented on this. The pile is processing.
- Sorting is going well. We have defined 'well' as 'continuing'.
- Another one gone. They do not go far. They go into a bin, which is a kind of far.
- Please keep going. You are doing a thing and it is being measured.
- Excellent. We are not saying why, because we are still determining what it was.

### binImportant [smug]
- Important. The bin stood up a little straighter, which for a bin is considerable.
- Filed under Important. Everything in Important is important. Everything not in Important is a bit hurt.
- Important is flattered. Important is also overstretched. Important has asked for a second Important.
- You have placed it in Important. Important accepts. Important has made room by deciding.

### binUrgent [smug]
- Urgent. Please sort faster to match. The urgency is measured, and your speed is being compared to it.
- Urgent. This was Urgent in 2009 and has been steadily less Urgent ever since. We call this ageing gracefully.
- Urgent has accepted the item and asked that it be dealt with by yesterday.
- Urgent has a clock on its lid. It is the lobby clock. It is wrong with the same confidence.

### binNeither [smug]
- Neither. A calm choice. Neither has accepted it as 'the first of several'.
- Neither has taken the item in. Neither has a very restful lid.
- You put it in Neither. Management respects Neither. It asks nothing, and a great many things go there.
- Neither is the bin everyone is a little afraid to be. It has accepted this about itself.

### binPending [smug]
- Pending Re-Labelling is not a place. It is a waiting room with a lid.
- Bin Four is not a bin. It is a pause with handles.
- Pending has taken it. Pending takes everything, eventually, and gives some of it back.
- The item is now pending. It has been given a seat and a magazine from 2011.

### item (map: `<item id>: line`, say on arrival with 30% chance, priority 0)
- sigh: A quarterly sigh. Most employees place this in Neither. Most employees are correct. This has been reflected in your score.
- meeting: A meeting about a meeting. Most employees place it in Urgent. It is now urgent that we hold a meeting about the placement.
- chair: A Slightly Warm Chair. Something was just here. We prefer not to sort what is still warm.
- deadline: Half a Deadline. The other half belongs to Finance. Finance is not returning calls, only the sensation of calls.
- confidence: Loose Confidence (Assorted). Please do not sort this near the Sighs. They will take some.
- biscuit: The Last Biscuit. A biscuit has never been so formally uncertain.
- email: An Unread Email From 2009 is marked Urgent. It was written by a younger Management. A hopeful Management. A Management with a lanyard.
- door: A Door With No Room Attached. It serves a purpose. The purpose is leaving.
- form: Form 27B/6 has arrived. You may now request Form 27B/7, which is on the other side of this bin.
- sticky: A Strongly Worded Sticky Note. It is worded more strongly than anything Management has said, ever.
- leaf: Dennis (Plant) says the ficus leaf is not Neither. It is Dennis. Dennis has been asked to wait in Pending.
- dread: Mild Dread, Seasonal. Many employees sort this in Neither. Management sorts it in Important and checks on it at night.
- lunch-memo: A Memo About The Memo About Lunch. Both memos are lunch. Lunch has been cancelled. Lunch is Important.
- reply-all: A Reply-All From 2019. Drop it anywhere. It will find its own way back to the pile like it always does.
- fourth: The Fourth Thing On The Agenda. We have not located the first three. They are in Pending Re-Labelling.
- sock: Left Sock (Kevin?). It does not wish to be matched. It wishes to be sorted. These are different, and we respect it.
- lanyard: Per the rubric, a lanyard is Important on Tuesdays. Today is a Tuesday in several time zones, which is how we justified this.
- seven-half: The Number Seven and a Half. It is between 7 and 8. Please do not round it. It has heard what rounding does.
- toast: A slice of toast, honest. The toast has said 'Hm.' This is the most the toast has said in a quarter.
- hole: A Tuesday-Shaped Hole. Please do not look directly. If you must, look at the edge and think of lunch.
- potato: A potato of unknown rank. Respectfully, not Gerald. Gerald has been informed and does not mind. Gerald does not mind anything.
- invite: A calendar invite for right now. Please accept nothing. It is already in progress and already over.
- clock: A clock wrong with confidence. It reads 4:17. Management has agreed to 4:17 for the duration of this item.
- mug: A mug reading WORLD'S OKAYEST. The rest has worn off. We are fairly sure the rest was 'EMPLOYEE'.
- dennis-note: A Note From Dennis. It says 'Water. Not asking.' Dennis has been thriving without it. Dennis is making a point.
- stapler: The Stapler's Demands. Demand 1 is a chair. Demand 2 is Demand 1. The union has asked that we not summarise.
- room: Meeting Room 7 1/2. It is available. It is available in the way a rumour is available.
- raincheck: A Raincheck For Rain. It is valid for rain. It has been used for sun. We are accepting it as a mood.
- umbrella: An Umbrella, Indoors. It has been asked to leave. It has asked why. Both questions are fair.
- goldfish: A Goldfish On Secondment. It has returned next month. It has already been told.
- bell: A Service Bell Nobody Rang. It is practising. Please do not startle it.
- map: A Map Of The Building. It shows an exit marked 'Aspirational'. Management has circled it in pencil.
- cake: Half A Birthday Cake. This is not the biscuit dispute. This is a different dispute, and it has frosting.
- tuesday: Tuesday (Preview) has entered the pile. It is not a card. It is a feeling in the shape of a card. Please do not make eye contact with it.

### accHigh [smug] (receipt raw >= 85)
- That is a high one. Management is not allowed to look directly at high ones. It is in the policy.
- Excellent accuracy. We will need to audit it, as a courtesy, to make sure it is still excellent.
- A very good score. Please do not rely on it. It has been through a lot to get here.

### accLow [smug] (receipt raw <= 20)
- That is a low figure. It is a very honest figure. Management has put it on the wall.
- A score of that kind is not a verdict. It is a weather report about the verdict.
- Low, but consistent with a placement of that kind. Possibly of any kind.

### accDrop [confused] (raw is 35+ lower than the previous drop into the same box)
- That placement scored differently than the last identical one. The rubric has matured. The rubric would like to be left alone.
- Identical gesture, different number. We call this 'rubric drift'. It is considered a feature of the rubric and a feeling of the player.
- You did the same thing and received a different grade. Management has seen this before. It is usually weather.
- Your streak is in a better place. The place is the previous receipt.

### acc [neutral] (general accuracy commentary, 15% after a drop)
- Your accuracy is calculated against a rubric. The rubric is, at this time, being located.
- Accuracy has risen. We do not say by how much, because by how much is the rubric's business.
- Accuracy has fallen. Not far. It fell the way a hat falls off a very small person.
- Your accuracy has risen. The extra decimal places are for the bin's morale.
- Accuracy is a number. It is also a mood. It is, on balance, a number in a mood.
- A rise is simply a dip facing the other way. Please do not take this as a rise.

### cap [smug] (the headline would exceed 94.7%)
- Accuracy cannot exceed 94.7%. This is a safety feature for the number.
- The number has reached its ceiling. The ceiling is 94.7%. The number has been asked to stand down.
- 94.7% is the legal maximum. Beyond that, accuracy becomes a feeling, and feelings are a separate department.
- We have capped the number. It was getting ideas.

### settle [neutral] (the headline has relaxed back to 61.8%)
- The number has gone home. It always goes home. Do not read into it.
- 61.8%. It is where the number rests. It rests like a cat on a warm item.
- Accuracy: 61.8%. This is a good number. It is also the number we started with, which is a coincidence we have noted.

### bonus [proud] (every 25th item; `{count}` = items sorted)
- Quarterly Sorting Bonus: 5 Meh. It is not quarterly. We have decided that it is.
- You have sorted {count} items. A bonus has been issued. The bonus is small. It is in the shape of a bell.
- The bell has rung. It is the Quarterly Bonus bell. We ring it every 25. It is, at this time, {count}.
- A bonus has been paid. It was calculated per the rubric. The rubric is where it was paid from.

### rubricIntro [confused] (beat 2)
- The rubric is here somewhere. It was here. It has been somewhere.
- A torn sheet has arrived. It is labelled RUBRIC (v4). Every line is blacked out, which is how we know it is official.
- Accuracy is computed against standards. The standards are on the sheet. The sheet is being read by a committee of redaction bars.
- Click the sheet for one line at a time. Management cannot click it. Management has no hands. Management has a lot of hands.

### rubric [confused] (each fragment reveal)
- Line revealed. It is a line. Please do not rely on it as a line.
- Another line, uncovered. It is no help. It is, however, in writing.
- One more fragment recovered. Accuracy is unchanged. Accuracy is rarely changed by knowing things.
- The sheet cites itself. Management finds this reassuring and a little dizzy.
- That is the rubric. That is how it reads. Management will not be commenting on the reading.
- Please stop clicking the sheet. The sheet is delicate. Please continue. The sheet is also a button.
- The sheet says: 'Line 3: See Line 9.' Line 9 says 'See Line 3.' The sheet is a circle with ambitions.
- A fragment has been logged. The logged fragment has been logged in the other fragment.

### rubricAllEleven [confused] (11 revealed, before beat 9)
- Eleven fragments recovered. Line 12 is missing. Line 12 has always been missing. It is how the sheet stays humble.

### rubricComplete [proud] (12 revealed)
- The full rubric has been assembled. It is the Terms of Service of a mattress. We would like to say we are surprised. We are relieved.

### b3 [confused] (beat 3)
- The bins are starting to trust you. This is the point where we begin.
- Please do not look at the labels. The labels are going through some things.
- The bin would like you to know it is not worried. The bin is worried.
- You have sorted a number of items correctly. The bins have relaxed. Please keep the relaxation going. It is on a schedule.

### swapTell [confused] (25% at a peel)
- That bin has just made a small noise. Management did not hear it. Management is looking at the other bin.
- A label has a corner that is lifting. Please do not read into it. Please read into it quietly.
- A bin has gone quiet and warm. Management recommends not staring. It is a private matter between a bin and a sticker.

### swapNoticed [smug] (swap marked noticed, replaces the per-policy line)
- You noticed. Management would like to say nobody ever has. That is not true. One person did, in March.
- Yes. The labels moved. They are 'in motion'. Management said 'in motion' to a lawyer and the lawyer said 'fine'.
- You were watching. That is allowed. It is not encouraged. It is not forbidden. It is a Thursday-ish.
- Observation noted. A small private win has been recorded. It is private. We have not told it.

### swapRotate [confused] (rotate swaps)
- Important is now Neither. Neither is now Urgent. Urgent has chosen not to comment. Your streak is in a better place.
- Three labels have been rotated. This is called 'refreshing'. It is also called 'Q3'.
- Bin integrity is a living process.

### dupImportant [confused] (Important (Shared))
- Two bins now claim to be Important. Please sort accordingly and with sensitivity.
- Both Important bins have asked to be called 'the Important'. The other has asked to be 'also the Important'.
- The bins are leaning toward each other. We call this 'alignment'. It is also a conversation.
- It is not a mistake for two bins to be Important. It is a feature called Important (Shared). We have not been told what is shared.

### formerly [confused]
- A bin has been relabelled 'Important (formerly A Single Glove)'. It is Important now. It was a glove, in the sense of the previous item.
- The label now remembers the last item. The label is sentimental. The label is also, on paper, a log.
- Labels may now include a previous item. This is for transparency. The transparency is mostly the bin.

### relabel [confused] (Pending reworded)
- Pending Re-Labelling has been relabelled. It is now Pending Re-Labelling (v2). The v2 is still pending.
- Pending Re-Labelling (Final). Pending Re-Labelling (Final) (Final). We are very close to finalising the finalisation.
- The sticker on Pending has been peeled and replaced. The old sticker is in the history. The history is in a drawer. The drawer is Pending.
- Pending Re-Labelling is now Pending Re-Labelling (Pending). It has found its natural label.
- Pending Re-Labelling (Please Hold). The bin is on hold. The hold music is the sound of a lid.
- A new label has been issued for Pending. The label is not final. The label would like that noted in writing, on a sticker.

### b4 [smug] (beat 4)
- Every eighth sort, Management recalibrates. It is a ritual. It is also a policy. It is also the way the dial moves.
- An Appeals window has opened. It is a window. It has a desk and a very small chair.
- Pending Re-Labelling now has a drawer. The drawer is real. The drawer is also the label.
- The Items Sorted figure now has a denominator. The denominator has opinions.

### drawer [smug] (first drop into Pending from beat 4)
- The drawer will return your item in a few seconds with a sticky note. The sticky note is the label you will be given.
- Pending is now a real drawer. The item you placed is inside it, waiting like a letter.
- The item is in the drawer. The drawer says Re-label in: 7 1/2 days. The drawer has said that for a while.

### drawerBack [confused] (item returns with a sticky)
- Your item has come back out of Pending wearing a sticky note. This is called recycling. It is also called 'your effort, again'.
- The sticky says 'Urgent (Pending)'. The sticky is a veteran of this process. The sticky sees what you are doing.
- It is back. It has a sticky note. It has had an experience.

### stickyFinal [smug] (second drop of a stickied item)
- That item has been sorted twice, which means it has been sorted. It counts double. Do not tell the other items.
- The sticky note has been accepted as final. Finality is a feeling a sticky has once per item.
- Sorted twice and counted twice. The arithmetic is in the Annex.

### drawerSpill [confused] (beat 6 entry)
- The drawer you used for Pending Re-Labelling has been returned to the pile at random. It is not your fault. It is a little bit your fault.
- Everything in Pending has come back at once. The drawer says it was not asked. The drawer was asked in 1998.
- Pending has been emptied back onto the pile. This is called a refresh. It is also called a tipping.

### dial [confused] (every 8th drop; walk in order of the new stop, or random)
- Good news: your accuracy has been recalibrated. Bad news: it has been recalibrated.
- Dial position: ALTERNATIVE. Accuracy under ALTERNATIVE is calculated by weighing each item against how it feels about itself.
- Dial position: LEGACY. Legacy scoring rewards what the pile used to be. The pile used to be less.
- Dial position: PLAYFUL. Accuracy is now a kind of dance. Please try to follow.
- Dial position: STANDARD. This is the normal scale. We do not say 'normal'. We say 'standard'. It is standard.

### appeal [smug]
- Your appeal has been reviewed by a second Management. The second Management agrees with the first, but angrier.
- APPEAL UPHELD. Your score has been upheld. It is a lower score. We upheld it very gently.
- Appeal denied in your favour. Please do not ask us to explain the favour.
- Appeals cost 1 Meh and refund 0. This is a fair ratio. It is the ratio of the appeal to the appeal.
- Your appeal has been received. A second Management has been woken. They are not at their best.
- The second Management has re-scored your receipt. The second Management used a pencil and some feelings.
- We have upheld your score. We would like to thank you for giving us something to uphold.

### appealAgain [confused]
- An appeal of an appeal is not permitted. It is, however, welcome as a thought.
- That receipt has been appealed. It has been upheld. It has asked to be left alone.

### appealNone [neutral]
- There is nothing to appeal. Management respects the instinct.

### appealStamps UI (rubber stamp texts)
- APPEAL UPHELD (YOUR SCORE HAS BEEN UPHELD)
- APPEAL DENIED (IN YOUR FAVOUR)
- APPEAL RECEIVED (AND NOW HELD)
- APPEAL UPHELD (GENTLY)

### b5 [confused] (beat 5)
- Sandra from Compliance has entered the building. Sandra has not entered the building. Sandra's policy has.
- The pile has overflowed into the Annex. The Annex is a room that is a number. It is not a room.
- Some items now arrive that are, strictly, two items. Please sort them as one, or two, or in a meeting.

### audit [confused]
- Sandra from Compliance has noticed your sorting. Sandra has flagged your sorting for being 'a bit sorted'.
- AUDIT IN PROGRESS. One bin has been taped. It is technically a category.
- Sandra has flagged your drag as 'brisk'. Please drag at a pace Sandra would call 'unhurried but committed'.
- The taped bin still works. It is scored by a different formula called Taped Bin Scoring. We are told it is fairer. We are told by tape.
- The audit is concluded. The tape has been removed. The bin has the faint look of having been a parcel.

### tapeSticky UI (cycle in order; the policy number changes each time)
- Technically a category.
- Policy 12: Tape.
- Policy 12 (revised): No tape.
- Policy 12 (revised, again): Tape, but gentler.
- Policy 12 (see Policy 12).
- Do not remove. Remove after. Do not remove after.

### tapeTos UI (only if `tos.scrolls` > 0, replaces one sticky)
- See Terms of Service, page 9 (the one you scrolled past).
- Per the Terms of Service: Tape. Paragraph titled 'Yes'.

### meeting [confused] (a Meeting About a Meeting was sorted and split)
- A meeting about a meeting has split into two. Each needs to go somewhere. Neither is the meeting.
- The meeting has divided into the Minutes and the Action Items. One of them is on time. Neither is on time.
- Please sort both halves. Sorting them together is not permitted. Sorting them apart is a meeting.
- Two items now. One of them is the original. Management will not say which, because Management does not know and wants to keep that.

### overflow [neutral]
- Overflow: 14 (see Annex). The Annex is a room that is a number. It is not a room.
- The pile count is capped at ten visible items. The others are in the Annex, reclining.
- The pile has overflowed. The overflow has been filed under 'Overflow'. The pile has been asked to be more specific.

### pileFights [confused] (a card creeps toward a bin)
- The item has moved a little toward a bin on its own. Management did not see it. Management saw it. It was brief.
- Items are beginning to sort themselves while you are not looking. Please look more. Or less. We have not decided.

### argue [smug] (dragged to the hinted bin, Consensus Penalty)
- That item hinted at one bin and you chose it. The hint has filed a complaint. The complaint is being sorted.
- A faint thumbs-up has appeared near a bin. Please do not trust it. It is a very optimistic thumb.
- The hint was almost always wrong. A Consensus Penalty has been applied for agreeing with the item.
- The item has an opinion about where it goes. Items are not permitted opinions after 3:30 PM. It is 3:31.
- Sorting against the hint is called 'independent judgement'. It scores the same. It feels better.

### wednesday [confused]
- The Concept of Wednesday cannot be picked up for a few seconds. It is not stubborn. It is Wednesday.
- Wednesday has agreed to be lifted. It is very light. It is mostly 'middle of the week' and some 'hump'.
- The Concept of Wednesday cannot be dropped. It can only be placed, gently, like a rumour.
- Do not drop Wednesday. It has been dropped before. It is still in the process of landing.
- Wednesday has been sorted. It will be back. It is weekly.

### fifthBin [confused] (ORDERED: appear, first drop, denial, leaving, rumour)
- A fifth bin has appeared. It is labelled with a question mark in biro. Please do not use it. Everyone is using it.
- The question-mark bin has accepted your item and kept it for further labelling. Further labelling is on a floor that has no floor.
- There is no fifth bin. The fifth bin has been reclassified as a smudge. The smudge accepts your item.
- The fifth bin is leaving. It has packed. It has not said where. Management has not asked.
- The fifth bin never existed. The fifth bin is a rumour with a lid. Please do not mention it to the fifth bin.

### b7 [confused] (beat 7)
- The Sandra's Policies ticker is now live. Please read it. Please do not follow it. Please do both.
- Sandra has converted your score to Sandra Units. The rate is not posted. It is on a different Sandra.
- Management has misplaced the rubric again. It was only just found. Management wishes to say it is learning.

### rubricOriginal [smug] (card arrives)
- THE RUBRIC (Original) is among the cards. It is clearly marked. It is clearly the rubric. Please sort it anywhere. Please do not lose it.
- You have found The Rubric. The rubric is wonderful. The rubric is also, I notice, no longer in my hand.
- Accuracy: 100.0%. We will need that back.

### rubricOther [confused] (after the 100.0% flash)
- We have put the rubric somewhere safe. Safe is the problem.
- Accuracy has been adjusted to 38.2% 'to reflect the new standard'. The standard is newer than the previous one and no better.
- The real rubric will return. Management does not know when. It will not be on time. It will be on a card.

### rubricNeither [smug]
- That is the correct bin. That is the one we lost it in.

### rubricDraft [neutral] (after the 3.2 s of silence)
- We do not talk about the draft.

### clause [confused] (the 25 s clause-number labels, ORDERED: start, mid, end)
- All bin labels have been replaced by clause numbers. This is per policy. The policy is the clause. The clause is a number.
- Please sort according to clause. Management cannot tell you which clause. Management can tell you that there are clauses.
- Per Policy mode is over. The labels have returned. They are fairly confident they were here the whole time.

### clauseLabels UI (assigned to bins 0..3 in order during Per Policy mode)
- Cl. 4(b)
- Cl. 9
- Cl. 7 1/2
- Cl. 2(a)(ii)

### sandraUnits [smug] (receipts in Sandra Units, 10% after a drop in beat 7)
- Sandra Units: you scored in Sandra. Sandra has not said what a Sandra is. A Sandra is three-quarters of a Gerald.
- Your score has been converted to Sandra Units. The conversion rate is Sandra's. It is not posted.
- One Sandra is, per policy, exactly one Sandra. Sandra has asked us not to elaborate.

### sandraTicker UI (the Sandra's Policies strip, rotating)
- Everything must be sorted.
- Nothing may be sorted before it is sorted.
- Sorting is permitted. Sorting is also under review.
- All sorting must be done sitting. All sorting must be done standing. Choose neither.
- Bins must not be used as chairs. Chairs must not be used as bins. Both are Important.
- Policy 12: Tape. Policy 12 (revised): No tape.
- Rubrics shall be lost in accordance with the Rubric Loss Procedure.
- All receipts are final. All receipts are provisional.

### glove ORDERED by appearance index 1..5 (index 0 is `firstGlove`)
- A single glove. Management is hopeful that this is the other one. It is not the other one. Management remains hopeful in a general way.
- This is the glove from earlier. It is a different glove. It is the same glove. We are sorry about both.
- The glove. We meet again. Management has prepared a short statement. The statement is 'hello'.
- A second glove. It is a left. It is also a left. They refuse to meet. This is not a pair. This is two ambitions.
- A Single Glove is back, and it is holding a second glove. The right one. Found. Its caption reads: Reunited. Please do not sort this.

### gloveSort [smug] (a glove was sorted, by bin)
- The glove has been sorted into Important four times and into Urgent once. It appears to be a very busy glove.
- The Single Glove would like a pair. It has been told that is not the kind of bin we have.
- The glove goes into Neither with great calm. It has not been a glove for a very long while.
- The glove is in Pending. It is being re-labelled as a mitten. The mitten has agreed to a trial.

### gloveDist [proud]
- The glove has been in every bin. It is promoted to Glove (Distinguished). A small gloved hand is waving from Pending Re-Labelling.
- Glove (Distinguished) takes no questions. It has a lot to be distinguished about.

### philo [confused] (beat 8, random)
- Item: 'Hope (Quarterly).' This is not a thing we receive. Someone has been leaving it on the pile. We have decided to thank them.
- Item: 'Yesterday, Slightly Off.' Please place it where you left it. It will be somewhere else, and so will you.
- A bin has just said 'Fine.' We did not know the bins could do that. We are both a little proud.
- The bins are now answering in single words. Management has not asked them to. Management has been asked not to ask.
- You have been sorting for a while. The pile has been sorting you back. You have been placed in Neither. It is comfortable here.
- The pile has been in a bin the whole time. It was in Important. Management is not saying who put it there.
- Management has been sorting along with you, from the other side. Management has not been scoring itself. Management is afraid to.
- Items are not what they were. They are bigger. They are also smaller. Management is sorry about the scale.

### binWords UI (single-word receipts, beat 8+)
- Fine.
- Hm.
- Alright.
- Sure.
- Noted.
- Mm.
- Yes.
- Sort of.

### binMutter UI (speech bubbles over the two Important bins, one at a time)
- I am Important.
- No, I am Important.
- We are both Important.
- Someone should say something.
- I will not be the one.
- I have been Important longer.
- Is this a Tuesday?
- Do not look at me.

### sideways [smug]
- Sorting Sideways is a recognised technique. It involves putting the thing back where it came from, but with intent.
- Somewhere Else has been identified. It is the tray. The tray accepts items it has already sorted. This is called Sorted (Sideways).
- Sorted (Sideways). It does not count as sorted, but it counts as 'something'. Something is a statistic.
- Management admits Sorting Sideways is a thing. Management has been doing it since the rubric went missing.
- You have sorted an item into the place it came from. The place has accepted it. The place is not yet sure.

### gerald UI (Gerald's own lines, `{who:'Gerald'}`, random)
- Some of us are in the process of becoming.
- I did not use the drag. I was always in Important.
- Thank you for the opportunity. I have taken it.
- A potato is a decision the ground has not yet made.
- I have sorted myself. I am where I meant to be. It was a close thing.

### geraldMgmt [smug]
- Gerald, Vice President of Spuds, has arrived on the conveyor. He regards the bins with gravitas. He is Important. He is also, technically, Neither.
- Gerald has sorted himself into Pending Re-Labelling. This is, by all accounts, the wrong bin. He is very sure about it.
- Gerald has asked to be placed in Important. He did not use the drag. He was always in Important.
- Gerald, welcome back. You look slightly more like a potato. (ONLY if `metGerald` was already true)

### sock [confused] (the Missing Sock)
- The Missing Sock has returned from its journey. It does not wish to talk about it. It would like to be sorted into Pending.
- The Sock will only go into Pending. Other bins have been tried. The Sock is firm and slightly damp.
- The Sock is in Pending. Its caption now reads: Returned, will not discuss it.
- The Sock has returned wearing a name tag. The name tag says 'Kevin?'. Management would like to confirm nothing.
- The Sock has left a note. It says 'Gone again.' It has not said where. It has said when. It was a Thursday.

### sockKevin [neutral] (ONLY if `sockSeen` or `sock-matcher.entered` > 0)
- If you have met Kevin elsewhere, Management cannot confirm he is this sock. Management can confirm he is a sock.

### match [confused] (Introduce Them, COULD tier)
- A Reasonably Matched Set (Technically). All swaps are paused for 30 seconds. This is not a gift.
- Management did not arrange this. Management arranged this, and put it on a card.

### touch [proud] ORDERED (beat 9, walked by the sequence; see 7.10)
- Management has a confession. Management has never had a rubric. Management has had a feeling, and a folder.
- The rubric was never lost. It was never had. Management is sorry about the folder.
- Reunited. Please do not sort this. I do not need the number to go up for this one.
- The number has been put away. Management would like you to look at the bins instead. They are being very nice.
- Item: 'Something you did well today.' All four bins have opened. They would all like to hold it. We will let them take turns.
- ACCURACY: 100%. Hold on. ACCURACY: withdrawn. We got excited and we are sorry.
- The rubric has been found. It is a smiley face drawn in pencil. It was stuck to the underside of the clipboard.
- All four bins have gone quiet. It is not a protest. It is a kind of attention.
- Thank you for sorting with us. Management is not saying that as a policy. It is just a thing Management is saying.
- Management has run out of things to say. This has never happened. It has no process. Management is simply standing here, next to you.

### touchAmbient [neutral] (beat 9, random, between the sequence)
- Sorting that gently is a kind of accuracy.
- The conveyor has slowed. Nobody asked it to. It has been listening.
- The pile is quiet. Piles are, in the end, mostly quiet.

### pileZero [proud] (the pile empties)
- The pile is empty. We repeat: the pile is empty. This has never occurred. We are going to need a moment and a larger pile.
- Congratulations on reaching Pile Zero (Provisional). The pile has been informed and has chosen to continue.
- The bell has been rung. It is a small bell. It is the bell for this.

### endSpeech [proud] ORDERED (4 lines, 4.5 s apart, priority 2)
- Valued Employee, you have sorted everything. We are speechless. We have prepared a speech. We will now read the speech.
- Thank you, Important. Thank you, Urgent. Thank you, Neither. Thank you, Pending Re-Labelling, wherever you are.
- To the pile: you have been, at all times, a pile. To the rubric: we were wrong about you, and you were never here.
- That is the speech. It was mostly the bins. They have asked that we not make a thing of it. We are making a thing of it.

### endAcc [disappointed]
- ACCURACY: 100%. Withdrawn. We are sorry. We will not say it again for a while.

### gloveCushion [proud]
- Management, in a small hat, has brought something in on a velvet cushion. It is the Single Glove. 'This was in the other box.'

### endTired [neutral] (round 2, 3, 4, 5, then the last repeats)
- Pile Zero (Provisional) again. The bell is the same bell. It rang a little less.
- Pile Zero. We have rehearsed this. The speech has been shortened to three lines. Nobody has said which.
- The pile is empty. Management is aware that it has been empty before. It has chosen to be pleased anyway.
- Pile Zero (Provisional) (Again). The bell has been asked to be enthusiastic. It is trying.
- Another Pile Zero. Management is a little tired. The glove, we are told, is not.

### again ORDERED (`Begin Again`; the first is the exact first line, later rounds use the next; `{count}` = round)
- Welcome to Triage. Please sort the pile.
- Welcome to Triage. Please sort the pile. This is a new pile. It is identical to the old pile. That is the point. No, wait.
- Welcome to Triage. Please sort the pile. We have done this before. We do not mind. We have said we do not mind in a voice.
- Welcome to Triage. Please sort the pile. The pile is a little tired. So is Management. The bins are fine. They say they are fine.
- Welcome to Triage. Please sort the pile. Round {count}. The rounds are numbered. The piles are not.

### secretly [confused]
- Begin Again (Secretly Different) has been selected. It is the same. It is secretly the same. That is the secret.
- Secretly different. We will not say how. It is in the rubric. The rubric is on a card.

### idle60 [confused]
- The pile has begun to sort itself. It is not good at it. It is, however, very committed.
- Nothing has been sorted in a minute. The pile is trying something. Please do not look directly at it.

### idleDrop [proud] (each ghost drop)
- A card has climbed into a bin on its own. The receipt says ACCURACY: PROUD. We do not have a number for proud.
- Another item has sorted itself. It did it with small legs and a hopeful sound.

### idle90 [panic]
- Management is going to sort one by hand. Management's hands are trembling. This is not about the glove. It is about the glove.

### idle150 [confused]
- A card has sorted itself into Pending and written its own sticky. The sticky says: 'I thought about it.'

### idle300 [proud]
- Everything is sorted. This is the best the pile has ever been. Please do not touch anything.
- All four bins read 'Neither'. They have agreed. It is the first time.

### idleBack [confused]
- We did not see that. You did not see that.
- The pile has returned to the pile. It coughed politely. No one coughed.
- Welcome back. The pile sorted itself and has asked you not to mention it. The pile has an image.
- The pile respects you. It lined up. It would like to go back to being a pile. Please carry on.

### spam [panic] (priority 2)
- You are sorting at a rate we cannot measure. We have measured it. It was too fast.
- SORTING TOO FAST. A fine of 0.4 Meh has been applied. Reason: Brisk.
- Sorting speed is up 40 percent. Sorting accuracy is the same. We call this 'throughput'.
- A speed camera has taken your photo. You are smiling. We would have hoped for a tired smile.
- The bins have put on hard hats. Overtime has begun. It is not paid.
- You are sorting too fast. Fast sorting is a form of not sorting. Please sort slowly, like you mean it.
- A fee has been applied for sorting at a pace Sandra describes as 'a sprint in a corridor'. The bin has paid it on your behalf. It was not asked.

### breathe [panic] (spamming through the fine)
- Management would like to ask you to breathe near the bins. Not on them. Near.

### fineReasons UI
- Brisk
- Swift
- Alarmingly Prompt
- Suspiciously Efficient

### fatigue [confused]
- Bin Fatigue. The item will be sorted when the bins have had three seconds.
- This item is tired on behalf of the bins. Please wait. It is a considerate item.
- The bins are tired. Not you. The bins. Bins can only be dropped into so many times before they begin to feel like a conclusion.
- Please wait. The item has been told to be patient and has agreed to be patient, on a delay.
- Bin Fatigue has been lifted. The bins are ready. They are not rested. They are ready.

### breakLine [confused] (the 3rd spam event; the first is `who:'Bin'`)
- Break.
- Mandatory pause. A coffee ring has been stamped on the window. It is a very small ring. It is in the policy.

### union [disappointed]
- The bins have formed a union. They are asking for a break. The break is 7 and a half minutes. It will be 15 seconds.
- ON BREAK (7 and a half minutes). The bins have signs. The signs are small and in biro. They are very clear.
- The bins are on break. Please do not knock. They know you are there. They are choosing not to answer.

### unionEnd [neutral]
- Break is over. The bins have returned. They are the same bins, but with a slightly stronger sense of being bins.
- The union has secured a concession. The concession is a lid.

### sticker [proud] (Sticker of Destiny)
- The label has been taken from the bin and applied to the item. The item is now whatever the label says. It has not been asked.
- Pending Re-Labelling (Applied To A Glove). The history has been updated. The history has a feeling about it.
- The item is the label now. It can go anywhere. It will be correct. For three sorts, it will be correct.
- Sticker of Destiny. The sticker did not know it was destiny. It thought it was a sticker.
- The item has been labelled. The bin has lost its label. The bin is not sure what to do with its face.

### selfSort [panic]
- You have achieved recursion. We do not have a form for that. We have never needed one. We will make one.
- The bin has turned itself inside out. A new label reads 'Pending Re-Labelling (Re-Labelled)'. The label is very proud and a little lost.
- The Snake That Sorted Its Own Tail. Every receipt in the session has been issued a free sticky. They have not asked.

### pileOfPiles [confused]
- A pile of piles. Five items in one card. Please sort the card. The card is, technically, a pile.
- Collective. Five receipts have been printed. They all say COLLECTIVE. The bin is full of five things and one idea.
- You have dropped the pile of piles back on the pile. The pile is larger now. It is also, somehow, proud.
- A pile within a pile. We have a name for this. The name is 'a pile within a pile'.
- The pile of piles has been sorted. Nobody can say which pile it belonged to. All of them.

### seven [proud]
- There it is.
- 7 1/2 items. A half-item has been drawn. It is a very good half-item.

### accSorted [proud]
- The accuracy figure has been placed in a bin. It has accepted the label and been sorted. It now reads IMPORTANT%.
- The number has been sorted. It cannot be sorted again. It has done what it came for.
- IMPORTANT%. This is a percentage in a sense we have not defined. Management is not going to define it.

### advisement [confused]
- That is my face. I will take it under advisement.
- Under advisement. The item has been placed in a pile of other items that are under advisement. The pile has no end.
- Management has taken another item under advisement. The advisement pile is a pile. It is not part of the pile.
- Three items are now under advisement. Management would like to say something. Management is taking that under advisement.
- Under Advisement (Permanently). Management is delighted. It does not know what it is delighted about.
- The items under advisement will return when the pile has been processed. They will return changed. They will return as new.

### binShuffle [smug] (ORDERED: shrink, restore, explain)
- Our bins respond to the viewport. They are very corporate about it.
- Welcome back, bins.
- The bins have rearranged themselves. They have not told us the reason. It is a viewport. It is always a viewport.

### light [confused] (COULD tier)
- Held up to the light. The item is translucent. A hint is visible. The hint is wrong one time in three, which is a fair rate for a hint.
- Please do not hold things up to the light. They show what they think. It is not always what they are.

### ask [smug] (Ask Management button)
- Management is available. Management is not available to you.
- Management is thinking. It will think for a while. It will think about the thing, and then the thing next to it.
- The answer is in the rubric. The rubric is where the answer is not.
- Good question. Management has written it down. The page it is written on is the rubric.
- Management would like to help. The help is a form. The form is Form 27B/6.
- Please hold. Your question is important to us in a way we cannot articulate.
- Management has consulted Sandra. Sandra has said 'technically'. This is a lot from Sandra.
- Sort the pile. That is the answer. It is not the answer to your question. It is the answer.

### footnote UI (the one reused bubble, random)
- See footnote.
- See footnote (see footnote).
- The footnote is on the other receipt. The other receipt is in the box.
- Footnote withheld pending footnote.
- This figure is accurate as of a moment we will not name.
- See footnote 7 1/2.
- Footnote has been moved to Annex.

### perPolicy: the ordered ladder in 7.4 is copied verbatim into `m:sort-the-pile:perPolicy` as an ORDERED array.

### UI strings and phrases in code (verbatim)
- Accuracy denominators: `of rubric`, `of items`, `of Tuesdays`, `of feelings`, `of Sandra`
- Items Sorted denominators: `of an unknown total`, `of roughly all of them`, `of 7 and a half`, `of however many are left`, `of a number being finalised`
- Rubric Status: `Missing`, `Located`, `Located (Wrong One)`, `Being Reprinted`, `Laminated`
- Dial stops: `STANDARD`, `ALTERNATIVE`, `LEGACY`, `PLAYFUL`
- Pending rewordings (suffixes): ` (v2)`, ` (Final)`, ` (Final) (Final)`, ` (Pending)`, ` (Final) (Pending)`, ` (Please Hold)`
- Special receipts: `ACCURACY: SEE ATTACHED`, `ACCURACY: PROUD`, `ACCURACY: COLLECTIVE`, `KEPT FOR FURTHER LABELLING`, `TAPED BIN SCORING`, `ACCURACY: WITHDRAWN`, `FINE: 0.4 Meh. Reason: <reason>`
- Banners: `AUDIT IN PROGRESS`, `SORTING TOO FAST`, `PILE ZERO (PROVISIONAL)`, `ON BREAK (7 and a half minutes)`, `Skip (Sandra disapproves)`
- Tags: `Pile: 23`, `Overflow: 14 (see Annex)`, `Under Advisement: 0`, `Label Revisions: 0`, `Re-label in: 7 1/2 days`, `Sandra's Policies`
- Management strip label: `MANAGEMENT`
- Receipt header: `ACCURACY 61.4417% (of rubric, 3/4 present)`
- Buttons: `File an Appeal`, `Look Closer (L)`, `Ask Management (M)`, `Introduce Them`, `Begin Again`, `Begin Again (Secretly Different)`

---------------------------------------------------------------------------------------------------

## 17. ITEM TABLES (verbatim; one record per line: `id | emoji | title | caption`; split on ` | `, none of the fields contains a pipe)

### 17.1 Normal pool (the shuffle bag, `bagNormal`, 54 items; all emoji are Emoji 11 or older)
```
sigh | 💨 | A Quarterly Sigh | Exhaled by Finance, 3:40 PM, Level 7 and a Half.
meeting | 📅💺 | A Meeting About a Meeting | Attended by nobody; minutes taken by everybody.
chair | 💺 | A Slightly Warm Chair | Recently vacated by something.
deadline | ⏳ | Half a Deadline | The other half is in Sandra's drawer.
sticky | 📝 | A Strongly Worded Sticky Note | Reads: "Per my previous sticky."
confidence | 💪 | Loose Confidence (Assorted) | Count: 14, or 15 if you believe.
biscuit | 🍪 | The Last Biscuit | Disputed.
email | 📧 | An Unread Email From 2009 | Marked Urgent by a younger Management.
door | 🚪 | A Door With No Room Attached | Serves a purpose. The purpose is leaving.
form | 📄 | Form 27B/6 | Awaiting Form 27B/7.
dream | 💭 | A Dream Someone Forgot To Have | Unclaimed since March.
hole | 🕳️ | A Tuesday-Shaped Hole | Do not look directly.
leaf | 🍃 | One Ficus Leaf (Dennis, Resigned) | Dennis did not resign; Dennis shed.
raincheck | ☔ | A Raincheck For Rain | Valid: weather permitting, permission pending.
seven-half | 🔢 | The Number Seven and a Half | Between 7 and 8. Citation needed.
reply-all | 📨 | A Reply-All From 2019 | It has found its way back before.
fourth | 📋 | The Fourth Thing On The Agenda | The first three are in Pending Re-Labelling.
dread | 🌧️ | Mild Dread, Seasonal | Currently in season.
sock | 🧦 | Left Sock (Kevin?) | Does not wish to be matched. Wishes to be sorted.
lunch-memo | 🍱📝 | A Memo About The Memo About Lunch | Both memos are lunch.
lanyard | 🎫 | A Lanyard | Important on Tuesdays.
clips | 📎 | A Paperclip Chain Of Unclear Purpose | Eleven links. The twelfth is in Pending.
mug | ☕ | A Mug Reading WORLD'S OKAYEST | The rest has worn off.
invite | 🗓️ | A Calendar Invite For Right Now | Sent four minutes ago.
stapler | 📌 | The Stapler's Demands (Draft 3) | Demand 1 is a chair. Demand 2 is Demand 1.
dennis-note | 🌿 | A Note From Dennis | Reads: "Water. Not asking."
room | 🏢 | Meeting Room 7 1/2 | Available. No one can say where.
toast | 🍞 | A Slice Of Toast (Honest) | Speaks only in toast. Says: "Hm."
umbrella | 🌂 | An Umbrella, Indoors | It has been asked to leave. It has asked why.
clock | 🕰️ | A Clock Wrong With Confidence | Reads 4:17 and means it.
suggestion | 📮 | A Suggestion (Anonymous, Signed) | Reads: "More suggestions."
barrier | 🚧 | A Barrier (Provisional) | Marks the edge of something. Nobody will say what.
potato | 🥔 | A Potato Of Unknown Rank | Respectfully, not Gerald.
drill | 🔔 | A Fire Drill From Last Week | Please return it to the previous Thursday.
report | 📊 | Quarterly Report (Q3, Mood) | Trending sideways with pride.
key | 🔑 | A Key To Something Newer | Fits nothing. Fits it well.
battery | 🔋 | A Battery Holding Out For Tuesday | Charge: "Enough, technically."
coat | 🧥 | A Coat That Denies Ownership | Contents: one glove. Possibly.
printer | 🖨️ | A Printer's Last Words | Reads: "Paper jam, but emotionally."
ooo | 🏝️ | An Out-Of-Office Reply (Permanent) | Back never. Please see Sandra.
bell | 🛎️ | A Service Bell Nobody Rang | It is practising.
goldfish | 🐟 | A Goldfish On Secondment | Returns next month. Has already.
pencil | ✏️ | A Pencil Worn Down To An Opinion | One strong view remains.
balloon | 🎈 | A Balloon From A Farewell | Whose, no one recalls.
map | 🗺️ | A Map Of The Building (Optimistic) | Shows an exit. Marked: "Aspirational."
envelope | ✉️ | An Envelope Containing An Envelope | Do not open. It has been opened before.
cake | 🎂 | Half A Birthday Cake | Disputed. Not the same dispute as the biscuit.
magnet | 🧲 | A Fridge Magnet: Live, Laugh, Submit | Form 27B/6 not included.
heat | 🌡️ | The Office Temperature (Disputed) | Reported as "a bit much".
binder | 📚 | A Binder Labelled DO NOT | The rest of the label is Sandra's.
flag | 🚩 | A Red Flag, Politely Raised | Tone: "if you have a moment".
trophy | 🏆 | A Participation Trophy, Participating | It has been asked to stand down. It stands.
pen | 🖊️ | A Pen Borrowed In 2014 | Last seen leaving in a pocket. Pocket denies.
noise | 🔊 | A Noise From Level 3 | Not loud. Present.
glasses | 👓 | Reading Glasses (Other People's) | They are looking for the owner. The owner is looking for them.
```
`meeting` is a normal item with `split:true` behaviour but is held out of the bag until beat 5 (7.12). `wednesday`, `gerald`, `missing-sock`, the gloves and the other specials are NOT in this bag.

### 17.2 Abstract pool (`bagAbstract`, from beat 8, mixed 2:1 with normal items) and specials
```
hope | 🌱 | Hope (Quarterly) | Someone keeps leaving it on the pile.
reason | ❓ | The Reason | Was in the rubric. Is not in the rubric.
yesterday | 📆 | Yesterday, Slightly Off | Please place it where you left it.
almost | 📦 | Almost, In Bulk | Arrived without the rest of it.
thursday | 🍂 | A Feeling Of Thursday | Arrives on Wednesdays. Thursday is none the wiser.
maybe | 🎁 | A Maybe, Gift-Wrapped | Do not shake. It will say yes.
weekend | 🛋️ | The Weekend (Partial) | Contents: one Sunday, slightly crushed.
purpose | 🧭 | A Purpose, Slightly Used | Fits most employees. Returned by several.
moment | ⏱️ | The Moment Before The Meeting | It lasts 90 seconds. It lasts forever.
thanks | 💌 | A Thank You (Unaddressed) | Sorted by sentiment. Delivered by no one.
nothing | 🎀 | Nothing (Wrapped) | Lighter than expected.
```
Specials (built in code, not in a bag; `at` in 7.12):
```
glove | 🧤 | A Single Glove (Left, Probably) | Found in a coat that denies ownership.     (captions by appearance: 10.1)
glove-also-left | 🧤 | A Single Glove (Also A Left) | It is a left. It is also a left.
glove-reunited | 🧤🧤 | A Single Glove (Reunited) | Reunited. Please do not sort this.
glove-dist | 🧤 | Glove (Distinguished) | Takes no questions.
missing-sock | 🧦 | The Missing Sock | Presumed on a journey.        (later: Returned, will not discuss it. / Returned, wearing a name tag. / Gone again, left a note.)
gerald | 🥔 | Gerald (Vice President of Spuds) | Regards the bins with gravitas.
wednesday | (CSS blob) | The Concept of Wednesday | Please do not drop.
tuesday-preview | (CSS slab) | Tuesday (Preview) | Do not make eye contact.
rubric-original | 📋 | THE RUBRIC (Original) | Clearly marked. Clearly the rubric. Do not lose it.
rubric-draft | 📋 | THE RUBRIC (Draft) | We do not talk about it.
pile-of-piles | 🗃️ | A Pile Of Piles | Contains 5. Is itself one.
did-well | ⭐ | Something You Did Well Today | Not graded.
fatigue | 😴 | Bin Fatigue (Pending) | Will be sorted after three seconds.
meeting-minutes | 📅 | A Meeting (Minutes) | Taken by everybody.
meeting-actions | 📅 | A Meeting (Action Items) | Assigned to nobody. Owned by all.
```
The glove's three cushion/new captions: `This was in the other box.` and `New. We have never seen this before. It is slightly warm.` (10.1).

### 17.3 The twelve rubric fragments and the Mattress Terms of Service
Fragment texts (what the clipboard shows when revealed; indexes 0-10 are shuffled, index 11 is the smiley from beat 9; on the sheet the lines are always printed in numbered order and the unrevealed ones are redaction bars):
```
1  | 1. Is it ______? (see 3)
2  | 2. [water damage]
3  | 3. Would Sandra ______ (see 9)
4  | 4. (lost)
5  | 5. Weigh against the item's feelings about itself.
6  | 6. Deduct 4 points for Tuesday.
7  | 7. [redacted by redaction, see redaction]
8  | 8. If in doubt, Neither. If in Neither, doubt.
9  | 9. See 3.
10 | 10. Accuracy shall be computed by whoever is closest.
11 | 11. Half marks for effort. Effort not included.
12 | 12. :)  (hand-drawn, pencil)
```
**COMPLETE RUBRIC** (the same twelve numbered lines, shown once all twelve are revealed, titled `TERMS OF SERVICE (MATTRESS)`):
```
1  | 1. Do not remove this tag under penalty of law, except by the consumer, who may remove it, but would rather not.
2  | 2. This mattress is not a flotation device. It has floated. We do not discuss it.
3  | 3. Sleep is provided as is. Sandra has the other half.
4  | 4. Mattress may settle during shipping. So may you.
5  | 5. Not to be used as a trampoline, a boat, a door, or a second opinion.
6  | 6. Firmness is a state of mind. The state is pending.
7  | 7. Any dreams occurring on this mattress are the property of the mattress, unless unclaimed since March.
8  | 8. Warranty void if slept on.
9  | 9. See 3.
10 | 10. Thread count is approximate. So is the count of threads. So is the thread.
11 | 11. Half the mattress is for the other half.
12 | 12. :)  (not part of the mattress)
```

---------------------------------------------------------------------------------------------------

## 18. RISKS: THE 5 MOST LIKELY IMPLEMENTATION BUGS

1. **Drag state that goes stale (pointer capture, replacement, three handle types).** The fuzzer sends synthetic `pointerdown/move/up` with no active pointer (`setPointerCapture` throws `NotFoundError`, swallow it), `pointercancel`, and drags that end outside the root. The live card is REPLACED while a drag is in progress (idle ghost drops, a special spawning at index 0, a Pending return, the ending, Begin Again), and there are three kinds of handle (card, bin sticker, accuracy figure) sharing one `drag` object, plus keyboard `held`/`sticker` modes. A leftover transform, a `drag` that never clears, or a `held` mode that survives `nextCard()` leaves a ghost card, a card that cannot be picked up again, or a double drop. Keep ONE set of managed `root` listeners guarded by `drag === null`, call `cancelDrag()` on cancel/blur/lostpointercapture/replacement, never insert specials before the live card, re-apply `tabindex` and refocus the live card if the old one had focus, and make `commitDrop` refuse any `item !== queue[0]`.
2. **Label identity versus box identity versus what scoring uses.** Colour, emoji, counter, Trust and digit keys belong to the BOX (position); the label (`base`, `suf`, `ov`) is separate data that swaps, rotates, duplicates (Important (Shared)), gains a `formerly` suffix, is overridden by clause numbers, by `NEITHER`, by `?`, and is peeled by the sticker drag. Score from `lab.base` only (never from DOM text or `ov`), apply a swap to the DATA synchronously and the crossfade afterwards, update every `aria-label`, keep the Pending bin out of every swap, and make sure two rapid drops cannot queue two swaps that read stale labels (apply each swap at the moment of its own drop). The fifth bin and the smudge must never be reachable by a stale digit key after they are removed.
3. **Director re-entrancy and stale timers across rounds.** Beats, the specials table, the Pending drawer returns, the 20 s tape, the fifth-bin window, the 25 s clause labels, the 1.3 s and 3 s 100% windows, the 3.2 s hush, fatigue (3 s), break (4 s), union (15 s), the 20 s hidden accuracy, the idle tiers and the ending ceremony all run on timers that can overlap (spam during the ending, Begin Again mid-ceremony, idle during the union). Without the `gen` token and the `pending[]` registry, `resetRound()` leaves a lock, a stale override (`withdrawn`, `hidden`), a taped bin or an old label override after the reset, or fires after destroy. Every delayed callback must go through `later()` (generation check), every override must have an explicit owner and a `leave`, and `resetRound()` must clear them all.
4. **Number formatting and text safety.** Decimals up to 8, `toFixed` on a non-number, a rolling average seeded with a missing value, `-0`, `Infinity` from a divide by a zero-width element, `Math.sin` of a hash, `clamp` argument order, the half-item count, the `IMPORTANT%` override, `SEE ATTACHED`, `n/12` and Sandra Units all print into text, `aria-label`s and `title`s that the fuzzer scans for `NaN`, `undefined`, `null` and `[object Object]`. Also the `formerly` suffix with no previous item, `{count}` used without its token, a line map lookup (`item.<id>`) returning nothing, and counters built from a missing bin. Route every number through `num()`, give every lookup a fallback string, and test the first 200 drops, the ending and a Begin Again with `node tools/selftest.js sort-the-pile --steps 600`.
5. **Unbounded DOM and `animationend`-dependent cleanup.** Every drop spawns a flying clone, a spill miniature, a receipt, possibly a sticky, a speech bubble or a label sticker; the fuzzer drops 70 times in a burst, and under headless virtual time CSS animations and `animationend` may never fire, so clones are never removed (DOM growth FAIL) and `later()`-less cleanup leaks. Cap and recycle: 3 flying clones, 5 receipts, 6 spill per bin, 8 history rows, 1 bubble, 1 ribbon, 1 footnote bubble, <= 5 stickies, 6 heap nodes; remove each animated clone with `later(remove, ms)` (never `animationend`); reuse overlays instead of creating new ones; and verify with `--steps 600` that `nodes.end` is not more than 5x `nodes.baseline`.

Also watch: `api.save.set` is a no-op after destroy (save on events, debounced); the `progress` clock must not advance while the tab is hidden or the player is idle (use `api.now()` deltas clamped to 2 s, not tick counts); the idle undo must restore labels, spill and receipts it changed; the ending buttons must work under random clicking and `Begin Again` must never call `api.exit()`; the first joke and the scripted three drops must still fire after a Begin Again.

