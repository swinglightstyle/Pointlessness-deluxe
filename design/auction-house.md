# DESIGN BRIEF: THE AUCTION HOUSE (id `auction-house`)

Final brief by the showrunner. Builder: read SPEC.md and VOICE.md first, then build `games/auction-house.js` from this file alone. Where this brief and SPEC.md conflict, SPEC.md wins. Every line in section 12 is final and verbatim: copy it, do not improve it, do not explain it. Apostrophes and double quotes inside lines must be escaped or the line put in a template literal. Use only the tokens `{player} {meh} {count} {item} {module}`; always pass `count` (and `meh`, `item`) explicitly when you speak a line that contains them.

Line budget: target 1500 to 1700 lines, hard cap 1800 (lint errors above that). Rough split: CSS 230, content tables and lines 420, logic 900. Section 17 gives a cut order if you run short. Section 16 ("MUST / SHOULD / COULD") says what may never be cut.

---

## 1. CONCEPT

You are the only bidder who matters in a room full of bidders who do not. Hollis P. Gavelwright, a brisk auctioneer in a velvet hall, sells lots such as "a slightly used Wednesday" and "one (1) window, view not included". You set a bid on a slider and raise a paddle. The hammer falls and you win, always, for exactly 1 Meh more than you have. The clerk corrects your bid with great ceremony. Your real Meh is never touched (the wallet is "inspected, not touched, and handed back with a small bow"). The shortfall goes on an IOU, and the IOU grows interest in the form of increasingly formal apology envelopes. Gerald, a potato in a waistcoat, bids only in potatoes. Hollis files Gerald under Weather.

Pillars (cut anything that does not serve one of these):
1. **Exactly 1 more.** The one-over joke saturates the room: price, paddle, clerk's pen, exit sign, final payoff.
2. **Maximum ceremony, zero consequence.** Every sale has a ritual (curtain, three calls, gavel, odometer correction, wallet inspection, envelope). Nobody ever loses anything. There is no losing path, only different paperwork.
3. **The apologies get more formal than the debt is big.** 12 tiers, from "Sorry about the 1 Meh." to "...and have had a lie-down about it."
4. **Gerald's one win.** Lot 7 1/2 is the only sale that is not yours. It must land as genuinely touching, then the chant resumes like nothing happened.
5. **Escalation arc in about 7 to 10 minutes** (VOICE.md): normal, weird, bureaucratically unhinged, strangely touching, back to normal like nothing happened.

### What was kept, and what was cut

KEPT (from the three pitches): Hollis P. Gavelwright; the nixie price board; the three calls; the slider whose end is a rumor; the paddle with an eyeline and drag-height; the clerk's strike-through and digit-flip reconciliation; the ghost wallet; the IOU ledger with PAID IN FULL and 1 MEH OWING stamped on the same line; apology envelopes with 12 formality tiers and a Reply dropdown builder; Gerald's potato scale, ghost-tunneling marker, drifting rate and the Weather folder; Lot 7 1/2; the Silent Auction round (eyeline lowered, cushion for gavel); the Stamp Committee signature; the debt sold to Gerald; Hollis's cracks ("I never wanted to be loud"); the idle auction of the Silence; the Ceiling Fan Protocol; Gavel Seven; the Window Blink; the exact 7.5 bid; the Tuesday cloth lot; the absentee bid; "Welcome. Have you bid before?"; the not-ending (you win the Auction House).

CUT (weak or unbuildable in one vanilla file): Interruption banners on a timer (cameos are now woven into gallery beats), Sandra's sticky slider flags, phantom bidders (40 potatoes), mirror IOUs and the Auctioneer bidding against himself, throwing the lot into the audience, canvas dust motes and canvas potato rain (CSS only), the paddle-number text input, the sandwich paddle (the spoon replaces it), the IOU spike (the ledger sheet replaces it), tab swipe, the possessions shelf (kept only as a stretch, see section 17), 100-lot runs.

---

## 2. REGISTRATION AND CONSTANTS

```js
P.registerModule({ id:'auction-house', title:'The Auction House',
  tagline:'Everything is a lot. You will win it. You will owe 1 Meh more than you have.',
  icon:'🔨', category:'department', unlockCost:0, tags:['auction','slider','paddle','ious'], mount })
```
- `api.setTitle('The Auction House (Lot ' + label + ')')` updated at every CURTAIN, where `label` is the lot label from section 6 (so "Lot 7 1/2" and "Lot 40" are valid). On the first lot of a session that resumed from a save (saved `idx` > 1 or `cycle` > 0) the title reads `The Auction House (Lot X, continued)`. After the ending, lots are labelled `n (continued)` (see section 11).
- Root: ONE wrapper `div.m-auction-house-root` inside `root`, CSS custom properties `--ah-*` defined on it (`--ah-curtain #8c2f39`, `--ah-brass #c89b3c`, ...). `position:relative; overflow:hidden`. All overlays are `position:absolute` inside this wrapper (SPEC: fixed children are clipped to root anyway).
- Time scale: `const K = api.selftest ? 0.15 : 1;` multiply EVERY duration and threshold in this brief by K (phase lengths, idle thresholds, 20 s interest tick, typewriter, hold timers). The ending must be reachable under `?selftest=auction-house` (24 lots at about 2 s virtual each is fine).
- Money maths, defined once and used everywhere: `bal = Number.isFinite(api.meh()) ? api.meh() : 0`; `snap = Math.floor(bal)` taken at the moment of HAMMER; `price = snap + 1`. Fractional balances are shown as "N Meh" using `api.fmt(snap)` and the narration says "and a bit" never. Never display a raw float. At `snap = 0` the price is 1 and the clerk says the "in order" line.
- Display of bid values: integers as `7`, halves as `7 1/2` (never `7.5` in the UI; the digits 7.5 appear only in code). Helper `fmtBid(v)`.

---

## 3. SCREEN LAYOUT

Single column below 800 px; two columns above (stage + desk left, ledger right).

```
+------------------------------------------------------------------+
| NIXIE PRICE BOARD   LOT 1   [ 0 0 0 3 8 ]  (+1 sometimes)  EXIT (one more)
+--------------------------------------------+---------------------+
| STAGE                                      | LEDGER SHEET        |
|  curtains L/R (fold gradients)             |  IOU (OUTSTANDING) /|
|  lectern + Hollis (emoji+CSS face) + gavel |  APOLOGIES (INBOUND)|
|  LOT CARD (a button, 'View Lot') + art     |  IOU: N   stamps    |
|  back-row gallery: 4 seats                 |  last 6 lines       |
|  chant ribbon (8 live words)               |  envelope pile (12) |
+--------------------------------------------+  [REPLY] [PAY IN    |
| BID DESK                                   |   FULL] [Weather]   |
|  caption bar (aria-live paperwork line)    |  [Apology Vault]    |
|  RECONCILIATION STRIP (clerk, odometer,    |                     |
|   ghost wallet)                            +---------------------+
|  eyeline dashed line + label               |
|  slider  + 'Your bid: N Meh' + tender toggle
|  potato scale (appears at idx 4)           |
|  PADDLE (SVG disc 'No. 7 1/2 (+1)')        |
|  footer: [Conditions of Sale]              |
+--------------------------------------------+
Overlays (absolute, max one at a time except dim): letter, reply form,
 signature pad, weather folder, fine print, certificate, ending banner, idle dim.
```
At narrow widths the ledger sits below the desk. The desk (slider, paddle) must always be reachable without scrolling past the ledger on a 360 px wide phone: order is board, stage, ribbon, desk, ledger.

---

## 4. CONTROLS (exact)

All controls are real `<button>`, `<input>`, `<select>`. Touch targets >= 44 px. Visible focus ring (3 px mustard outline). Text is only ever set with `textContent` (the player name is untrusted).

### 4.1 Bid slider
- Native `<input type="range">`, `min=0`, `step=0.5`, `max = Math.ceil(snapBalance) + 2` recomputed at each CURTAIN only (not mid-lot). A real `<label>` reads `Your bid: N Meh` (live, via `fmtBid`), plus `aria-valuetext` "N Meh" / "7 and a half Meh".
- **The rumor end.** On every `input` event, if `value >= max * 0.98` and no growth is pending, after 150 ms (managed timer or dt) do `max += 1` (cap `max` at 1e6), set `input.max`, and (once per lot) show the `slider.rumor` line. Hold-dragging at the end therefore keeps extending the track; that is the joke. Guard: never loop in a single event; one growth per 150 ms.
- Thumb 44 px, brass gavel-head styled via `::-webkit-slider-thumb` and `::-moz-range-thumb`; track a wooden rail gradient.
- Keyboard on the slider (intercept `keydown`, `preventDefault`, set value, clamp to [0,max], dispatch your own update): Left/Right = 1, Shift+Left/Right = 0.5, PageUp/PageDown = 10, Home = 0, End = max. Digits 1-9 anywhere in the module (when focus is not in a `select`/`textarea`/text `input`) set 10%-90% of max, rounded to the nearest 0.5.
- Reactions (each at most once per lot, shown in the caption bar, only while BIDDING): value 0 -> `slider.zero`; value == max -> `slider.max`; value == round(max/2) -> `slider.mid`; same value committed 3 times in a row -> `slider.same`.
- The bid NEVER affects the price. It only decides which reconciliation line plays (over / under / exact) and the reactions.
- **Gerald's ghost marker** sits on the track (see 9). When the thumb value crosses it, Gerald waves (CSS bounce on his seat) and the thumb gets a faint 600 ms ghost trail (a translucent copy). Throttle to once per 1.5 s.

### 4.2 Tender toggle (unlocks at idx 5)
A two-state toggle button group `Tender: Meh | Potatoes` (`aria-pressed`). In Potatoes the label becomes `Your bid: N potatoes (about X Meh at today's rate)` where the rate drifts `0.4 + 7.1 * (0.5 + 0.5*sin(t/9))` (t in module seconds), shown as "Today's rate: ..." line text from `rate` bank occasionally. Hollis rules your potato bid "not recognised tender; filed under Weather" and you win anyway. Mechanically nothing else changes.

### 4.3 Paddle
- A real `<button>` containing an inline SVG disc (r=38, cream, 3 px ink outline, number `7 1/2` in bold system-ui, small `(+1)` under it) on a rounded-rect wooden stick. Height is a 0-1 value `S.ph` mapped to `translateY` via `--ah-ph`, tilt slightly with pointer x.
- **The EYELINE**: a dashed brass line across the desk at `eyelineFrac` (normal 0.60 of the desk height from the bottom; Silent Auction 0.25) with the tiny label `EYELINE (polite)` (silent: `EYELINE (polite, lowered)`).
- **Pointer (mouse or touch):** `pointerdown` raises the paddle to a starting height of 0.72 (normal) or 0.35 (silent) and starts a hold; dragging upward sets `ph = clamp((deskBottom - y) / deskHeight, 0, 1)` (if the desk height is 0 or NaN use 0.72); `pointerup` lowers it. On release the raise is registered with `maxH` reached during the gesture. Wrap `setPointerCapture`/`releasePointerCapture` in try/catch (they throw NotFoundError under the fuzzer).
- **A valid bid** = `maxH >= eyelineFrac`. `maxH >= 0.90` is flamboyant (cosmetic: `flam` flag, the next envelope gets the "FLAMBOYANT" stamp and renders as one tier fancier; say a `paddle.flam` line once per 3 lots). `maxH < eyelineFrac` is "a question": says a `paddle.low` line once per lot and does NOT count as a bid (the lot still sells).
- **Silent Auction:** if `maxH > 0.50` during a silent lot, SHH fires (see 7.4).
- **Keyboard:** Space keydown (first, not repeat) raises and holds; Space keyup lowers and registers the raise; holding Space past 1.2 s counts as `maxH 0.95` (flamboyant) in normal lots and as SHH in silent lots. Enter = a 1-second tap. A tap (Enter, Space tapped, or a plain `click`) registers `maxH` 0.72 (normal) or 0.35 (silent) so keyboard players never trigger SHH by accident. Space anywhere in the module when focus is not on a button/input/select also raises (preventDefault). Esc lowers the paddle and closes any overlay.
- **Single activation path.** Write one `registerRaise(maxH, source)`. Count a gesture ONCE: `pointerup` counts and stamps `S.gestureAt = api.now()`; a `click` is ignored if `api.now() - S.gestureAt < 80`; Enter/Space handlers `preventDefault` on both keydown and keyup. (Synthetic fuzz events fire pointerup then click within microseconds.)
- The paddle visibly rises with `transform` for 400 ms after a raise. Raises during any non-BIDDING phase are "Late Bids": `stat auction-house.raises` still counts, the caption says `paddle.late`, and they count toward spam detection.

### 4.4 Lot card (button "View Lot", also key V)
Pressing the card, or V, "views the lot": a 4 s CSS-drawn reveal inside the card, specific to each lot (section 6 `view` column), awards 0.1 Meh, stat `auction-house.views`, sets `S.viewFee = true` (the next letter gets the P.S. "Viewing Fee waived"). Allowed in CURTAIN and BIDDING only, once per lot. A second press during the reveal does nothing except the lot-specific clicks (7 and 2, below).

### 4.5 The gavel
A button on the lectern (`aria-label="Gavel"`, 44 px). Pressing it outside the HAMMER phase: tiny rotate animation plus a line from `gavel` bank (does NOT end the lot). 7 presses in a row (any other control press resets the count) triggers Gavel Seven (10.3). During HAMMER it is inert.

### 4.6 Ledger controls
- Envelope buttons in the pile (max 12 DOM, then text `+N more envelopes`): click/Enter opens that letter (7.2).
- `REPLY` button: appears when `S.replyUnlocked` (idx >= 13). Opens the reply form (7.3). Key R opens it too.
- `PAY IN FULL` button: appears when `S.iou >= 8` (section 8.4).
- `Weather (N)` button: opens the Weather folder (9.3).
- `Apology Vault` button: appears only after the ending (11).
- Footer button `Conditions of Sale` (small, underlined): opens the fine print panel (10.6). Esc closes.

### 4.7 Gallery seats
Four seats, each a real `<button>` (aria-label `Gerald`, `Dennis (Plant)`, `The Toaster`, `Sandra's paddle`). Press = one line from that cast member's `room.*` bank into the caption bar (never the same twice in a row; empty seats are `disabled`). Seats lean toward the slider thumb with `--ah-lean` (CSS transform, cosmetic).

### 4.8 Keyboard summary (print it as a tiny hint line under the desk)
`Space/Enter` raise, `Left/Right` bid, `1-9` set bid, `V` view, `R` reply, `Esc` lower/close. Nothing else. Letters are ignored while a `select` or text input has focus.

---

## 5. THE LOT STATE MACHINE

ONE `api.requestAnimationFrame` loop with delta time (`dt = clamp((ts - last)/1000, 0, 0.1)`; the first frame uses dt 0). A single `S.phase` plus `S.t` (seconds in phase). Never use window timers. After `api.destroyed` return without rescheduling. Hidden tab: the loop simply stops being called by the browser; on return the absentee logic (10.7) runs once.

| phase | length (x K) | what happens |
|---|---|---|
| CURTAIN | 2.5 s | lot card slides in WITH the gavel already mid-swing (first joke inside 3 s: the board and card read the Lot 1 text). Hollis announces the lot in the chant ribbon. Title and board updated. |
| BIDDING | 3 calls x 3.5 s | calls "GOING ONCE", "GOING TWICE", then `going3` bag ("GOING THREE-AND-A-THIRD" ...). The nixie price climbs in jumps while the chant runs. Gerald/gallery cameos fire here. The player may raise, set the slider, view, press the gavel. A **valid bid** during BIDDING says an `early` line once, and shortens the remaining calls to 1.2 s each (about 0.8 s to the next call then hammer; the early line is "accepted, with a note"). Doing nothing reaches HAMMER anyway; the bid is "a bid of stillness" (`still` line, stat `auction-house.silences`). |
| HAMMER | 1.2 s (silent: +3.0 s) | gavel CSS rotate, `api.sfx('stamp')`, board freezes at `price`, `snap` captured, SOLD stamp slams on the card (scale 3 to 1, rotate -8 deg), one `hammer` line, `api.sfx('ding')`. |
| RECON | 5 s (4-6; signature rounds add up to 12 s, auto-resolved) | Bid Reconciliation strip (7.1). |
| SETTLE | 2.5 s | IOU +1, ledger line, envelope drops, award, Management line every 3 to 5 lots, Hollis remark, `api.save` write, next lot queued. |

Special lots replace parts of this machine (section 7). Every wait has an automatic exit; no phase may ever block on the player.

**Awards (all tiny; the module says so out loud):**
| event | amount |
|---|---|
| every sale (after hammer, in SETTLE) | `Math.min(2, 0.3 + 0.07 * lotsThisSession)` "Paddle Participation" |
| viewing | 0.1 |
| letter opened | 0.2 |
| reply sent | 0.6 |
| pay in full | 0.5 |
| signature | 0.3 |
| Lot 7 1/2 witnessed | 1.5 |
| exact 7.5 bid, Gavel Seven, fine print clause (each once) | 7.5 |
| ceiling fan | 2 |
| idle: the silence wins | 2 |
| absentee return | 1 |
| ending | 10 |

The award lands AFTER the hammer, so the NEXT lot's price board starts at the old price and then visibly chases your new balance (the `wallet chase` gag: the board counts up to the new price in 0.4 s with `Price has been adjusted for your enthusiasm`, at most once per 3 lots). Subscribe with `api.onEvent('meh', ...)` to detect balance change during CURTAIN/BIDDING and animate the board.

---

## 6. THE RUN: LOT TABLE AND ARC (by index; arc is driven by lot index, not the clock)

`S.idx` runs 1..24 (saved). Display `label`, `name`, `blurb` appear on the board and card (the lines in section 12.A are the card texts). `emoji` is the lot art (all Emoji 12 or older; `node tools/lint.js` rejects newer; swap if it complains). Chant speed (words per second): idx 1-2 = 5, 3-5 = 7, 6-11 = 9, 12-16 = 11, 18-23 = 12 rising to 14, final = 14; Lot 7 1/2 = chant stops. Hollis adds "and one" to the chant from idx 3.

| idx | label | name | beat |
|---|---|---|---|
| 1 | 1 | A slightly used Wednesday | NORMAL. Learn slider and paddle by doing. |
| 2 | 2 | One (1) window | NORMAL. Viewing shows the pale rectangle. Window Blink secret. First envelope drops at the end of this sale. |
| 3 | 3 | Seven and a half stairs | FIRST ENVELOPE (letters tier by IOU, 8.2). Chant 7. |
| 4 | 4 | One (1) sigh | GERALD ARRIVES: seat fills, potato scale appears, first bid. |
| 5 | 5 | A meeting that could have been an email | Tender toggle unlocks. |
| 6 | 6 | The colour between Tuesday and beige | THE LOTS TURN STRANGE. Chant 9. Letters say "We should have said earlier. We did not know." |
| 7 | 7 | A box | Nested box: view and click three times (7.5). |
| 8 | 8 | A firm handshake from 1994 | GALLERY FILLS: Dennis (Plant) takes a seat; Sandra's paddle floats up. |
| 9 | 9 | Seventeen minutes | The Toaster takes seat 3 and bids toast. |
| 10 | 10 | A very good echo | SILENT AUCTION, lot 1 of 2 (7.4). |
| 11 | 11 | One (1) left sock | SILENT AUCTION, lot 2 of 2. Sock-matcher postmark. |
| 12 | 12 | The last word in an argument | STAMP COMMITTEE: signature required (7.6). Chant 11. |
| 13 | 13 | A reasonable doubt, in a jar | Stamp Committee again. REPLY window unlocks at the start of this lot. |
| 14 | 14 | A Tuesday (reserve not met) | The cloth lot (7.7). Hollis remarks begin between lots. |
| 15 | 15 | Half a silence | |
| 16 | 16 | A tasteful amount of fog | Hollis speaks "I never wanted to be loud" before this lot. |
| 17 | 7 1/2 | A sack, empty, with feelings | LOT 7 1/2 (TOUCHING) (7.8). Printed as "returned from filing". |
| 18 | 17 | A sealed envelope containing the previous lot | Chant resumes like nothing happened. |
| 19 | 18 | The next lot | |
| 20 | 19 | Your IOU, lightly accrued | THE DEBT IS SOLD (7.9). |
| 21 | 40 | Form 27B/7 | Letters are Gerald's. |
| 22 | 75 | A small, tidy sense of purpose | HOLLIS CRACKS (7.10). |
| 23 | 99 | Hollis's weekend | |
| 24 | FINAL | The Auction House itself | THE NOT-ENDING (11). |

The final lot also triggers early if module time >= 600 s (x K) AND idx >= 14 at the next CURTAIN.

**Management / Hollis beat announcements** (say at the CURTAIN of that idx, priority 1 for Management; these are verbatim in 12.B): idx 1 opener, 2 `ioufirst`, 3 `envelopefirst`, 4 `geraldarrives`, 6 `strange`, 8 `gallery`, 10 `silentstart`, 12 `committee`, 13 `replyopen`, 20 `debtsold`.

---

## 7. SPECIAL LOTS AND PHASES

### 7.1 Reconciliation strip (every normal sale)
A strip "BID RECONCILIATION" with the clerk (CSS face, glasses 👓, pen ✒ labelled `R. Pen (+1)`).
1. 0.0 s: your bid number appears (`fmtBid(bid)`; stillness shows `0`).
2. 0.8 s: it is struck through in coral pen (CSS line-through via a class) and the clerk says one `clerk` line.
3. 1.2 s onward: a CSS odometer digit-flips from the old digits to `price`. One digit cell flips every 0.18 s (up or down, `rotateX` midpoint, instant under reduced motion), `api.sfx('tick')` per flip, at most 6 ticks. Number of cells = `max(len(old), len(new))`, left padded with blanks.
4. After the flip, one correction line from `over`/`under`/`exact` (token `count` = overbid or underbid amount, rounded via `api.fmt`, never fractional garbage).
5. 3.2 s: ghost wallet 👛 flies from the Meh area of the desk to the clerk and back (CSS transform transition, 1.2 s), then the `wallet` line.
6. The SETTLE phase begins.
The real Meh is NEVER debited. Only the fiction moves.

### 7.2 Letters: see section 8.

### 7.3 Reply form
A small form overlay inside the ledger area: three `<select>` (Greeting / Regret / Closing) with the options at the end of 12.G, a live preview line composed as `Greeting, Regret. Closing.`, buttons SEND and Cancel. SEND: stamp `RECEIVED (ACCEPTED) (NOT ACCEPTED)` slaps down (mint stamp over cream), `reply` line, award 0.6, stat `auction-house.replies`, and TWO new envelopes drop ("an apology about the apology", capped by the 12 DOM rule). `preventDefault` on any form submit.

### 7.4 Silent Auction (idx 10 and 11)
- On CURTAIN of idx 10: `silentstart` (Management, once), `silent.intro` caption. All audio from this module stops (`api.sfx` is simply not called for the whole round) and Hollis's chant becomes `whisper` bank text in tiny italic type.
- `eyelineFrac = 0.25`; the dashed line and label move down (CSS transition).
- SHH: if a raise reaches `maxH > 0.50`: `silent.shh` caption, the gavel is replaced by a cushion graphic (🛋 is Emoji 1, or a CSS rounded rect) for this hammer, and the HAMMER phase lasts 3 s longer (the cushion lands with a soft "oh", no `stamp` sfx). Silent hammer line from the `hammerSoft` bank. Everything is still sold to you.
- At the end of idx 11's SETTLE: `silent.end` caption; eyeline returns to 0.60.
- Letters in this round are tier 4 flavour regardless of IOU ("the office regrets that it regrets" is tier 4's first variant).

### 7.5 Lot 7, the box
The viewing reveal of Lot 7 (and, from the card, a click while the reveal is open) opens a CSS box: click 1 shows a smaller box (`Clack.`), click 2 a smaller one, click 3 reveals `Lot 7 (Smallest)`. Each click: `api.sfx('pop')` and a caption line from `box`. Sold as before; the card name changes to `A box (Lot 7 (Smallest))` for the rest of the lot.

### 7.6 Stamp Committee (idx 12 and 13)
In RECON the clerk "disputes your bid and requires a SIGNATURE": a canvas pad 280x80 (a `<button>` wrapping the canvas) with a baseline appears. Pointer drag draws a smooth polyline (cap 400 points). Keyboard: while the pad has focus, holding Space draws a pre-made sine scribble (the pad auto-focuses when it appears so that Space works). **Any** input is accepted: 8 or more points, or a click with no drag (a dot), or Space held 0.8 s. Auto-resolve after 12 s (x K) with the `sig.auto` line. On accept: `sig` line (bag), award 0.3, stat `auction-house.signatures`, achievement `auction-house.signature`, the strip continues. Remove the canvas listeners with the `api.on` off functions on resolution and on destroy.

### 7.7 Lot 14, the cloth (A Tuesday)
The lot art is a CSS podium under a draped cloth (rounded rectangle with a fold gradient). Viewing shows the `view` caption. Clicking the cloth 5 times lifts a corner: a calendar page already torn off, caption `cloth.lift`, Hollis faints into the curtain (his emoji becomes 😵 for 2.5 s, Emoji 1), achievement `auction-house.torn`. The sale then proceeds normally with a "Reserve not met" stamp that is attempted and visibly misses (stamp animation lands off the card). The lot is still won by you.

### 7.8 Lot 7 1/2 (idx 17), the touching one
Timed script (CURTAIN 3 s, no bidding). Chant stops for the first time; the board shows `LOT 7 1/2` and no price; Management is silent for 8 s (x K) from the start (suppress all `api.say` calls except the scripted ones). The paddle can still be raised but does nothing except `touch` caption lines ("Please, not now"). The slider is `disabled`.
1. Hollis (caption, not chanted): `quiet.1`
2. Gerald stands (his seat bounces): `quiet.2`
3. Hollis: `quiet.3`
4. Gerald: `quiet.4`; if `api.stat.get('gerald-keynote.entered') > 0` he first says `quiet.keynote`.
5. Hollis, softly: `quiet.5` ("Going once." ... "Gone." in three captions 1.2 s apart). The gavel falls gently: rotate at 25% strength, `api.sfx('pop')`, no stamp.
6. `quiet.6` the sale line; the card shows Gerald holding the sack (🥔 beside 🎒); IOU does not change; no envelope; award 1.5; achievement `auction-house.russet`; set `S.saw7half`.
7. Hollis wipes the lectern (`quiet.7`), the Weather folder opens for 3 s with a gentle CSS rain of 12 potato emoji (cosmetic, non-blocking; reduced motion: static).
8. After the silent 8 s ends, Management says `quiet.mgmt`. Then Hollis, flat: `quiet.8` and the chant resumes.

### 7.9 Lot 19 (idx 20), the debt is sold
In SETTLE of idx 20, after the normal sale: Hollis offers your IOU as a lot (`debt.1`), Gerald bids 3 potatoes (`debt.2`), sold to Gerald (`debt.3`). From now until the ending (idx 21 to 24) the ledger headline reads `YOU OWE A VEGETABLE` instead of the IOU number, letters are Gerald's (`gletters`, signed `Gerald (Vice President of Spuds)`), and the IOU number keeps counting silently. Achievement `auction-house.vegetable`.

### 7.10 Lot 75 (idx 22), Hollis cracks
After the hammer, in SETTLE: Hollis stops mid-routine; the caption shows `crack.1`, then `crack.2` (reading the lot description slowly), the board dims for 3 s (CSS), then `crack.3` and everything resumes at full volume. Sincere, not mocking.

---

## 8. THE IOU, THE ENVELOPES AND THE TIERS

### 8.1 Numbers
`S.iou` starts at 0, +1 at each sale (and +N for absentee, +1 for "attempted equity"). `S.pending` = unopened envelopes (cap 99). The ledger headline: `IOU: {iou}` and a permanent sub-line `AMOUNT OWING: exactly 1 Meh more than you have` (the real joke: the IOU is a count, the amount owing is always the same). `auction-house.iou` stat max is updated on each change (achievement at 10).

### 8.2 Formality tier
`thr = [1,2,3,5,7,9,11,13,15,17,20,24]`; `tier = number of entries in thr that are <= S.iou` (min 1, max 12). Letters pick a text from `LETTERS[tier]` (two variants per tier, section 12.G), alternating with `api.pick`. Flamboyant paddle adds +1 tier to that one envelope (cap 12). Tier visuals (wax seal colour darkens): 1-3 plain, 4-6 seal, 7-9 seal + fleuron border, 10-12 parchment + ribbon + 🛏 emoji in the corner (🛏 is Emoji 1).

### 8.3 Envelope drops
One envelope per sale, plus one every 20 s (x K) of module time from idx 3 while `S.pending < 30`, plus two per reply, plus the special envelopes (Silence letter, Gerald letters, the ending letter). Each envelope is a small cream div-button with a CSS triangle flap and a wax seal; store `{tier, text, sign, ps}` in a JS array (the DOM shows the newest 12 only; overflow text `+N more envelopes`). Moving the mouse over the pile adds a 300 ms shuffle jiggle class (throttled). `api.sfx('bell')` on drop (not in silent rounds).

### 8.4 Pay in full
`PAY IN FULL` (visible from `iou >= 8`): ghost wallet again, `pay` line, award 0.5, and the ledger prints a single line stamped BOTH `PAID IN FULL` and `1 MEH OWING` (two rotated bordered stamps, `mix-blend-mode: multiply`). Effect: `S.iou = Math.max(1, Math.floor(S.iou / 2))`. Nothing is ever really paid.

### 8.5 Opening a letter
A panel anchored over the ledger column (on narrow screens a bottom sheet; on desktop it must NOT cover the slider or paddle). `role="dialog"`, `aria-modal="false"` (the auction keeps running behind it), Esc closes, focus goes to its Close button and returns to the previous focus if that element still exists. Letter text types at 22 ms per character (x K; instant under reduced motion), rendered as `textContent` growth in an `aria-hidden` element, with the full text in a visually hidden `aria-live="polite"` sibling. Layout: To `{player}`; body; P.S. if `S.viewFee` (then clear it); signature by tier: tier 1-3 `The Office of Apologies`, 4-6 `A Senior Apology`, 7-9 `The Department of Apologies Received`, 10-12 `The Undersigned (Notary of Regret)`; Gerald era `Gerald (Vice President of Spuds)`. Buttons: Close, and Reply (if unlocked). Award 0.2, `api.sfx('sad')` (silent rounds: none), stat `auction-house.letters`, achievement at 10 letters. Opening removes that envelope.

---

## 9. GERALD AND THE GALLERY

### 9.1 Seats and arrivals
Seat 1 Gerald 🥔 (a CSS waistcoat) from idx 4; seat 2 Dennis (Plant) 🌿 from idx 8; seat 3 The Toaster 🍞 from idx 9; seat 4 Sandra's paddle (an empty floating SVG paddle with a stick, no occupant) from idx 8. Seats are cosmetic but lean toward the slider.

### 9.2 Gerald's bids
From idx 4, once per BIDDING phase (about 1.5 s after the first call), Gerald bids from `GERALD_LADDER` in order (cycle at the end, 12 entries, 12.H), the text appears in the caption bar prefixed `Gerald:`, `api.sfx('honk')` (not silent), a potato icon stack grows on the potato scale, the marker (a 🥔 ghost on a second thin SVG track under the slider) jumps to a position `0.12 + 0.76 * frac(idx * 0.618)`. Hollis answers with the next line from `geraldReject` (escalating, 12.H); Weather count +1; stat `auction-house.potatoBids`. First ever Gerald bid: if `api.flag.get('metGerald')` the line is prefixed with `We met in the interview. `. Gerald NEVER wins except Lot 7 1/2 (and the debt at idx 20).
Cameos (once per lot from idx 8, in BIDDING after Gerald, bag `cameo`): Dennis raises a leaf, Sandra's paddle floats, the Toaster bids toast with a `pop` sfx and a 🍞 slice icon, a silent sprout (end of track). Toaster line adds the transcript sentence if `api.stat.get('toaster-debate.entered') > 0`.

### 9.3 Weather folder
`Weather (N)` button (N = Gerald bids + 1,203, so it starts at "1,204 items"). Opens a small panel: header `Weather: 1,204 items, mostly potatoes.` (use `api.fmt` and `{count}`), plus the last 4 entries from `weatherItems` (12.H) shuffled. Esc closes.

---

## 10. IDLE, SPAM AND THE OTHER SECRETS

### 10.1 Idle (no input: pointerdown, keydown, touchstart, wheel, input, or pointermove > 8 px)
Checked once per second by a managed interval, thresholds x K:
- **30 s**: "The silence has bid." The next HAMMER sells the lot to the empty seat labelled `THE SILENCE (No. 0)`; the reconciliation uses `idle.recon`; the silence "pays in quiet"; a special envelope `Thank you for your silence. It was lovely.` drops. Achievement `auction-house.silence`, award 2.
- **90 s**: the house closes. The lot cycle pauses, a dim overlay (radial gradient) comes up, chairs stack (CSS class: seats rotate to a stack), a swinging lamp; caption `idle.close`; Hollis eats a sandwich 🥪 and puts it up as Lot 0 (`idle.sandwich`); Gerald stays behind and holds the last paddle in case (`idle.gerald`).
- **120 s**: `idle.moment`: Hollis auctions "this particular moment" with no opening bid.
- **Any input** after stage 1: everything returns; Hollis: `idle.back`; lot cycle resumes at the next CURTAIN; thresholds re-arm only after input. Stages fire once each per idle spell.
(`api.selftest`: thresholds 4.5 s, 13.5 s, 18 s virtual.)

### 10.2 Spam
Keep a rolling list of raise timestamps (`api.now()`).
- **12 or more raises within 3 s**: toast `WAVE FEE: 0 Meh. Waving is free. Being waved at is billed separately.` plus the `spam.12` caption. Once per 6 s.
- **25 or more raises within 4 s**: THE CEILING FAN PROTOCOL. For 4 s (x K) the paddle button swaps its SVG for a spoon (🥄 is Emoji 3, or CSS) and still counts as a raise button (spoon raises say `spam.spoon`); Hollis files you under "ceiling fan" (`spam.fan`); every gallery seat turns its head (CSS rotate, slow); a breeze keyframe ruffles the envelope pile; the surcharge line `spam.surcharge`; award 2; achievement `auction-house.fan`; stat `auction-house.spams`. Then the paddle returns with `spam.return`. Re-arm after 10 s.

### 10.3 Gavel Seven
7 gavel presses in a row, none during HAMMER: a tiny gavel is called in for the half (`gavel7.1`); the NEXT sale's reconciliation adds a second flip after the normal price with `gavel7.sale`, Hollis hands over a certificate overlay `STRUCK 7 1/2 TIMES` (`gavel7.cert`, cream card with a mini gavel), award 7.5 once, achievement `auction-house.struck`, flag `auction-house.gaveled` set (cosmetic: a tiny gavel cursor emoji stays on the lectern thereafter).

### 10.4 The exact 7 1/2 bid
If at HAMMER the slider is exactly 7.5 (and the bid is a valid raise): the room freezes (CSS freeze class, 1.5 s), the board goes dark, `exact.1` caption, the reconciliation shows `7 1/2` as the price with `exact.2` ("Fairness has been noted"), then flips to the normal price with `exact.3` ("Fairness has been recalled") and a bonus `+1` IOU for "attempted equity". Award 7.5 once, achievement `auction-house.exact`, flag `auction-house.exact75` set so later lots can drop a one-in-six extra `exact.hint` caption.

### 10.5 The Window Blink (Lot 2 only, secret)
While the Lot 2 view is open, clicking the window frame 3 times replaces the pale rectangle for exactly 2 s (x K) with a CSS view of the Lobby plant (🌿 with a tiny tie, `blink.1` caption: Dennis, looking competent), then `blink.2` "VIEW RETAINED BY THE SELLER". Achievement `auction-house.window`.

### 10.6 Fine print
`Conditions of Sale` opens a scrollable panel with clauses 1(a), 4, 40, 7 1/2 (12.M). Opening it three times, or scrolling to its bottom once, reveals Clause 12(b) once, awards 7.5 once and adds the line `Clause 7 1/2` to the paddle's footer text permanently (flag `auction-house.clause`).

### 10.7 Absentee bid (hidden tab)
Listen with `api.on(document, 'visibilitychange', ...)`. On hide record `api.now()`. On return if hidden >= 30 s (x K): `N = Math.min(8, Math.floor(hiddenSeconds / 12))` lots are shown as sold to you by proxy: `S.iou += N`, ledger lines `Paddle 0 (proxy)` (max 8 lines), `absentee` caption, award 1 "for presence". No penalty.

### 10.8 Rare events (only from idx 6, never on special lots, never in a silent round)
- 1 in 40 lots: Sandra withdraws the lot (`rare.sandra`); the card is stamped WITHDRAWN, the lot is "sold in its absence" (BIDDING is skipped, reconciliation plays). Sandra's paddle appears for one lot if not already seated.
- 1 in 60 lots: `rare.presold`: the lot sold before the auction opened; the three calls are skipped (all lamps lit), reconciliation plays, then caption `rare.presold2`.
Use `api.chance(1/40)` and `api.chance(1/60)` evaluated once per CURTAIN.

### 10.9 Hollis clicks
Clicking Hollis 7 times: `heckle.7`. 15 times: `heckle.15`, he faints (😵, 2.5 s), and for the next lot the chant ribbon is attributed to `NERVOUS JUNIOR (Intern)`; the count resets each lot. Fewer clicks: one line from `heckle` bag every 3rd click.

### 10.10 Held paddle
Holding the paddle raised for 20 s (pointer or Space): the paddle droops (CSS rotate), `hold.20`; at 40 s `hold.40`. Releases normally. Do not block the lot cycle.

---

## 11. THE NOT-ENDING

Triggered at CURTAIN when `idx` reaches 24, or module time >= 600 s and `idx >= 14`.
1. CURTAIN: Hollis: `ending.1` ("The final lot. The Auction House itself."). Board: `FINAL LOT`. The calls run normally (no skipping needed, 3 calls).
2. HAMMER: `api.sfx('fanfare')`, `api.confetti()`, curtains slide open (CSS), banner `YOU HAVE WON THE AUCTION HOUSE` (cosmetic confetti only via `api.confetti`, no custom particles). Hollis hands over a brass key (🔑): `ending.2`. The reconciliation still plays, at the usual price (`ending.recon`).
3. The ledger prints a CERTIFICATE OF OWNERSHIP card (`CERTIFICATE OF OWNERSHIP (IOU: 1 Meh)`), caption `ending.cert`. Management: `ending.mgmt` ("Congratulations. You now own the thing you are standing in. It is also the lot. Please bid."). Hollis: `ending.right` ("You have won the right to owe slightly more than before."). Later Management: `ending.math` ("We did the math. The math is also 1 more.").
4. After 8 s the banner rotates away (CSS), the lectern returns, `S.iou = 1`, all other letters move into the **Apology Vault** (a little door button, `Apology Vault (N letters, unsent, but ready)`; pressing it shows `vault` line). A final envelope sits on top of the pile, addressed TO Hollis FROM you: `ending.letter` ("You owe us nothing. Sorry, wrong ledger."). Achievement `auction-house.owner`, flag `auction-house.ownsRoom`, award 10, stat `auction-house.endings`.
5. Lot 1 slides in: `A slightly used Wednesday (Pre-owned, Again).` Hollis: `ending.welcome` ("Welcome. Have you bid before?"). Gerald is in the back row with a different, larger potato (CSS scale 1.4 on his emoji); he bids `1`; Hollis: "In what?"; Gerald: "In company."; Hollis files it under Weather, quietly, with care; the gavel falls on someone who is already owed (`ending.gerald1..3`).
6. The module continues forever. `S.cycle += 1`, `S.idx` continues (labels become `n (continued)` where n counts lots in the continued run starting at 1 for the Wednesday). Post-ending lots draw from `CONTINUED_LOTS` (12.A2) plus a shuffled subset of the earlier non-unique lots, never Lot 7 1/2 or the debt lot. Escalation stays at the "warmer ledger" level: tier text still scales with the (now small) IOU, envelopes continue, rare events and all secrets remain. The only change: the ledger border is a slightly warmer cream.

---

## 12. ALL LINES (final, verbatim)

Bank names are line categories; register them as `P.addLines('m:auction-house:<bank>', [...])` and fetch with `api.line('m:auction-house:<bank>', tokens)` (this gives shuffle bags and no immediate repeats). Ordered tables (marked ORDERED) are plain arrays in the file. `api.say(text, {who, mood, priority})`: Management uses `who:'Management'`; Hollis uses `who:'Hollis P. Gavelwright'`; Gerald `who:'Gerald'`. Most lines go to the in-module caption bar (aria-live) and only milestone lines are also spoken via `api.say`; mark below says which.

### 12.A Lot cards (ORDERED table; card text is `LOT label: name. blurb`) and view captions

| idx | name | blurb | view caption |
|---|---|---|---|
| 1 | A slightly used Wednesday | Minor wear on the afternoon. Sold without its lunch. | VIEWING: a Wednesday, mostly afternoon. Some Thursday has got in around the edges. |
| 2 | One (1) window | View not included. Frame, glass and a sincere intention. The view is being retained by the seller. | VIEW (SEE PREVIOUS OWNER) |
| 3 | Seven and a half stairs | Collected over a long weekend. Handrail sold separately, for emotional reasons. | VIEWING: the stairs go up. You are told this is optional. |
| 4 | One (1) sigh | Previously owned by a regional manager. Gently used. Slight echo of a Q3. | VIEWING: a sigh, displayed in a jar with air holes. It has been exhaling for some time. |
| 5 | A meeting that could have been an email | The email is sold separately and has not been written. | VIEWING: a meeting, held at a distance. Nothing is decided. It is very well attended. |
| 6 | The colour between Tuesday and beige | Please do not name it. It has been named twice already. | VIEWING: a swatch. It looks the way a Tuesday would, if a Tuesday had to look like something. |
| 7 | A box | Contents: Lot 7 (smaller box). Please open it. The box has been very patient. | (nested box, 7.5) |
| 8 | A firm handshake from 1994 | Hand not included. The hand moved to a smaller department. | VIEWING: a handshake, held at arm's length. It is still firm. It is waiting for the hand. |
| 9 | Seventeen minutes | 4:17 PM, near the third ficus. Minutes may not be spent in any order. | VIEWING: seventeen minutes, laid end to end. They reach the third ficus and stop. |
| 10 | A very good echo | Comes back every time. Comes back slightly wiser. | VIEWING: a very good echo. It has been asked to wait quietly. It is the best at that. |
| 11 | One (1) left sock | Whereabouts unknown. Sold as "on a journey". The journey is ongoing. | VIEWING: a sock, but only its shadow. The sock is on a journey. The shadow stayed behind to keep its place. |
| 12 | The last word in an argument | Nobody remembers the argument. The word is "regardless". | VIEWING: the last word, in a small frame. It is "regardless". It has always been regardless. |
| 13 | A reasonable doubt, in a jar | Seal intact. Do not shake it in front of juries. | VIEWING: a doubt, in a jar. It is reasonable. It is looking at you reasonably. |
| 14 | A Tuesday (reserve not met) | Offered under a cloth. The reserve is a gentleman and will not be rushed. | VIEWING: a cloth, over a podium, over a Tuesday. The reserve has not been met since the Pleistocene. |
| 15 | Half a silence | The other half is in the Lobby, being awkward. | VIEWING: half a silence. The room agrees it is the better half. |
| 16 | A tasteful amount of fog | Pre-owned by a lighthouse. Light sold separately; the fog has never needed it. | VIEWING: fog. You can see it clearly. This is considered a defect. |
| 17 | A sack, empty, with feelings | Formerly the property of Uncle Russet. Last seen holding something warm. | VIEWING: a sack. It is empty. It is not empty of everything. |
| 18 | A sealed envelope containing the previous lot | Seal reads "Do not look back". Please look back. | VIEWING: an envelope. Through the paper, faintly, a sack. |
| 19 | The next lot | Viewing is available after the next lot. | VIEWING: not yet. Viewing is available after the next lot. The next lot is available after this one. |
| 20 | Your IOU, lightly accrued | Condition: clutched. Provenance: you. | VIEWING: a very long receipt, folded neatly into a very small apology. |
| 21 | Form 27B/7 | Destroyed in 1998. Sold as destroyed, which it is, in excellent condition. | VIEWING: a rectangle of nothing, labelled Form 27B/7. It is in excellent condition for what it is. |
| 22 | A small, tidy sense of purpose | Laminated. Edges slightly worn from being clutched. | VIEWING: a sense of purpose, laminated. It is the size of a coaster. It is holding up well. |
| 23 | Hollis's weekend | Reduced. Unused. Pining. The seller asks that it go to a home with a garden. | VIEWING: two days, folded. Never opened. A pair of slippers waits beside them. |
| 24 | The Auction House itself | Chairs included. Lectern included. Hollis included, on request. The room is the lot. The lot is the room. | VIEWING: a room. You are standing in it. It has been waiting for you to notice. |

Suggested emoji: 1 📅, 2 CSS window, 3 🏛, 4 😮, 5 📧, 6 🎨, 7 📦 (CSS nested), 8 🤝, 9 🕓, 10 📣, 11 🧦 (shadow), 12 💬, 13 🏺, 14 CSS cloth, 15 🔇, 16 🌁, 17 🎒, 18 📨, 19 🔜, 20 📜, 21 📄, 22 🧭, 23 🌴, 24 🏠 (use whatever passes `tools/lint.js`).
Lot 11 only: if `api.stat.get('sock-matcher.entered') > 0` a postmark appears on the card: `Forwarded from Sock Matcher, Dept. 7 1/2, in transit.` Lot 7 1/2 card label is `LOT 7 1/2 (returned from filing)`.

### 12.A2 Continued lots (post-ending, draw from these as `LOT n (continued)`)
- `The idea of lunch.` / `Not the lunch. The lunch is being held in escrow by a toaster.`
- `The moment just before someone says "so, anyway".` / `Extremely fragile. Wear gloves.`
- `The concept of a lanyard.` / `Sold with no neck. The neck is being sourced.`
- `One echo, fully restored.` / `It says what you say, but later and with fewer commitments.`
- `A mid-sized silence, hand-held.` / `Do not drop it. It breaks if it is described.`
- `A door that leads to the same room, but with confidence.` / `Pairs well with the room.`
- `A pause, dramatic, previously owned by a mime.` / `The mime has asked me not to say anything about it.`
- `One excuse, a very good one.` / `One use remaining. Works on anyone but Sandra.`
- `A lightly dented 3:45 PM.` / `One owner. The dent is the owner.`
- `A staircase, load-bearing in theory.` / `Theory sold separately.`

### 12.B Management and beat announcements (`api.say` with `who:'Management'`, priority 1, except where noted)
Bank `mgmt` (every 3 to 5 lots, shuffled):
1. Valued Employee, you have won again. Management is processing the word "again" with something like pride.
2. Management notes you now own {count} lots. Management has not seen them. Management trusts the crates.
3. Per my previous message, you owe 1 Meh more than you have. This is a very good deal, and a very good deal of owing.
4. Management would like to bid, but Management is not permitted a paddle after the Incident. The Incident was a paddle.
5. Circling back to Lot 3: it was stairs. It is still stairs. We have the receipts.
6. Management has reviewed your bidding strategy. It is a strategy. Management is relieved somebody is bidding.
7. Management confirms that winning is voluntary, in the sense that nobody has found the other option.
8. Your paddle is performing well. Its stick is performing better. Management has made a note of both.
9. Participation has been recorded, valued, and filed under Weather.
10. Management would like to remind you that every lot is final, including the ones that have not happened yet.
11. Management has never won an auction. Management is not being modest. The paddle has always been very heavy.
12. Going forward, all winning will be conducted at 1 Meh more than you have. This is not a change. It is a reminder of a change that did not happen.

Beat lines (ORDERED, one each, keys used in section 6):
- `opener` (idx 1, Management, mood proud): Welcome to the Auction House, {player}. Everything here is a lot. You are the only bidder who matters, which is a statistic, not a compliment.
- `resume` (session resumed from a save, instead of opener): Welcome back to the Auction House, {player}. We are at Lot {count}. Your seat was resold. We kept its feelings.
- `ioufirst` (idx 2 settlement): Your IOU is 1 Meh. It has always been 1 Meh. The rest is apologies, and those are free.
- `envelopefirst` (idx 3): An envelope has arrived. It is an apology. It is not for anyone in particular, which is the most sincere kind.
- `geraldarrives` (idx 4, Management): A potato in a waistcoat has taken a seat in the back row. Management did not seat him. The seat did.
- `strange` (idx 6): The lots have become strange. Management notes this without alarm, and with an alarm on standby.
- `gallery` (idx 8): The gallery is filling. Management has counted the bidders. Management has counted them again. It is four, and a leaf.
- `silentstart` (idx 10): Management will now be quiet, in solidarity. Management has not been quiet before. It is going badly.
- `committee` (idx 12): The Stamp Committee will now review your bid. The Stamp Committee is a stamp.
- `replyopen` (idx 13): A reply window has been opened. Replies are welcomed, filed, and apologised for.
- `debtsold` (idx 20): Your debt has been sold to Gerald. Management wishes you well and the vegetable better.

### 12.C Hollis: chant (bank `chant`, generic patter; numbers get highlighted; the ribbon types word by word)
1. I have four, four, I have four, four-and-a-nothing, nothing-and-a-quarter, a quarter-of-a-sneeze, do I hear a sneeze, sold to the paddle.
2. Who'll give me twelve, twelve for the glass, twelve-and-one, and one, and one more, I have one more, I always have one more.
3. Seven, seven and a half, seven and a half and one, and one, and one for the gavel, and one for the gavel's cousin, and one.
4. I have nine from the back, nine from nobody, nine and one from the front, nine and one and one, thank you, sir, who is not here.
5. Three, three, I have three, three-and-a-bit, three-and-a-bit-more, three and a thing I will not say aloud, and one.
6. Fifty, fifty, who'll say fifty, I have forty-nine and one, and one, and one, that is fifty, that is also one more.
7. Do I hear two, I hear two, I hear two from a gentleman, I hear two from the gentleman's hat, two and one, and one, and one.
8. Eleven, eleven, I'll take eleven in any condition, eleven and one, eleven and a lie-down, eleven and one, thank you.
9. Six, six and a pause, six and a pause and one, I have six and one and a pause and one, nobody breathe.
10. A hundred, a hundred, I have a hundred in my mind, a hundred and one in my notes, and one, and one, going to the paddle.
11. Twenty, twenty, twenty-and-one, twenty-and-one-more, a very good twenty, one of the better twenties, and one.
12. Eight, eight, eight-and-a-half, eight-and-a-half-and-one, and one, and one, I have eight and one and everything, and one.

Lot-specific chants (ORDERED, use for idx 1-4 instead of the bag):
- idx 1: Lot one, a slightly used Wednesday, some Thursday has got in, who'll start me at four, four, I have four, I have no four, we're at nine.
- idx 2: One window, view not included, glazed both sides, who'll give me twelve for the glass and nothing for the rest.
- idx 3: Seven and a half stairs, collected over a long weekend, who'll give me seven, seven and a half, and one for the handrail I do not have.
- idx 4: One sigh, regional, gently used, who'll start me at three, three, I have three, a sigh of three, and one.

Bank `whisper` (Silent Auction chant, tiny italic):
1. one... and one... and one, thank you, softly.
2. a quiet two, a quieter two, a two nobody heard, and one.
3. shh-eight, shh-eight-and-a-half, and one, and one, thank you.
4. one for the cushion, and one for the cushion's friend, and one.

Calls: ORDERED `GOING ONCE`, `GOING TWICE`, then bag `going3`: `GOING THREE-AND-A-THIRD`, `GOING QUICE`, `GOING THURSDAY`, `GOING, AS PREVIOUSLY ANNOUNCED`.

### 12.D Hammer, early, stillness, paddle, slider
Bank `hammer`:
1. Going once. Going twice. Going to be fine. Gone.
2. Sold! To the Valued Employee in the paddle, for exactly 1 Meh more than you have. Congratulations on your thoroughness.
3. The price is {meh} Meh and one. The one is for the gavel.
4. Sold for {count} Meh. You bid less. It did not come up.
5. Hammer. {count} Meh. The room applauds the way a room does, which is by being one.
6. {count} Meh, going once, going twice, gone, and by gone I mean yours.
7. Sold, {count} Meh, subject to Sandra, who has not seen it and is already against it.
8. Per my previous message: you have won. Please do not interpret the word "won" narrowly.
9. Sold. The hammer is pleased. The hammer asks to be left alone with the lot.

Bank `hammerSoft` (silent lots):
1. Sold, very quietly, to the person trying their best.
2. Sold. The word was mouthed. The room mouthed it back.
3. Sold, in a whisper. The whisper has been filed under Weather.
4. Sold. The cushion is satisfied. It said "oh" and meant it.

Bank `early`:
1. Early raise accepted, with a note.
2. A raise before the third call. Bold. Noted in pencil, so it may be reconsidered.
3. The paddle goes up. The room goes "oh". The room is Hollis, doing both.

Bank `still`:
1. A bid of stillness has been received. It is the quietest bid of the day and has been accepted as such.
2. You did not raise a paddle. The House has read this as a raise. The House is generous with its reading.
3. Silence is a bid in this house. This one was very well articulated.

Bank `paddle`:
- `paddle.low`: The paddle is below the eyeline. It is a question, not a bid. Questions are accepted as bids.
- `paddle.low`: A paddle at that angle is a rumour of a bid. The House has heard the rumour.
- `paddle.flam`: A flamboyant paddle. The clerk will print the apology in a larger font.
- `paddle.flam`: Flamboyant. The next envelope has been told. It is nervous.
- `paddle.late`: The paddle was raised after the hammer fell. This is a Late Bid. It has been placed in a drawer. The drawer is a plate.

Bank `slider` (one each, keyed):
- `slider.zero`: A bid of nothing. Bold. Sold.
- `slider.max`: You bid everything. The House will take everything plus one. Efficient.
- `slider.mid`: Moderation. Priced accordingly: not at all.
- `slider.same`: A consistent bidder. Very rare. Noted.
- `slider.rumor`: The end of the slider is further than it appears.

### 12.E Reconciliation
Bank `clerk`:
1. Clerk's correction: your bid has been amended to exactly 1 more than you have. Initialled, R. Pen (+1).
2. Clerk's correction: noted, amended, initialled. R. Pen (+1) has a very small pen and a very large conscience.
3. Amended in red. R. Pen (+1) asks that nobody call it "a mistake". It is "a correction with a past".

Bank `over` (count = overbid amount):
1. Overbid by {count}. Corrected downward until it was 1 over, which is the correct amount of over.
2. Your bid exceeded the permitted exceeding. It has been brought back, firmly, by {count}.
3. Overbid by {count}. The clerk has trimmed it, as one trims a hedge, for the neighbours.

Bank `under` (count = underbid amount):
1. Underbid. Raised to exactly 1 more than you have, in the spirit of fairness.
2. Your bid was modest. The House has been generous on your behalf, against your wishes.
3. Underbid by {count}. The clerk has corrected the modesty. The modesty will be returned in a plain envelope.

Bank `exact`:
1. A bid of exactly your balance has been received. It is moving. It has been corrected upward by one, as a courtesy.
2. Exact. The clerk is moved. The clerk moves it up by one, to avoid a scene.

Bank `wallet`:
1. Your wallet was inspected, not touched, and handed back with a small bow.
2. The wallet has been held up to the light, admired, and returned. Nothing was taken. A note was left.
3. Your wallet went to the clerk and came back. It is slightly warmer. It has seen things.
4. Wallet inspection complete. Contents: all. Condition: yours. Fee: 1 Meh more than you have, in principle.

Single lines: `zerobal` (snap = 0): Sold for 1 Meh. You have 0. Your purse is relieved. / `chase`: Price has been adjusted for your enthusiasm. / `board+1` (board caption, once in a while, and always when `S.cycle > 0`): LOT {n} (+1).

### 12.F Viewing, box, window, cloth
Bank `view`:
1. Viewing complete. A viewing fee has been waived, and a note has been made that it was waived.
2. You have viewed the lot. The lot has viewed you back, politely.
3. Viewing Fee waived. It was 0 Meh. We waived it anyway, with feeling.

Bank `box` (ORDERED):
1. Clack. It is a smaller box.
2. Clack. It is smaller still.
3. Clack. Lot 7 (Smallest). It contains the idea of a box. The idea is very comfortable.

- `blink.1`: Through the window: the Lobby plant. Dennis, looking competent.
- `blink.2`: VIEW RETAINED BY THE SELLER.
- `cloth.lift`: The cloth lifts at one corner. Under it, a calendar page, already torn off. Hollis faints into the curtain.
- `cloth.miss`: Reserve not met. The reserve has not been met since the Pleistocene.

### 12.G Letters (tiered, ORDERED by tier, two variants each; body text of an envelope)
1. Sorry about the 1 Meh. / We are sorry about the 1 Meh. It is small. We checked.
2. We are sorry about the 1 Meh. We should have said earlier. We did not know. / Apologies regarding the outstanding 1 Meh. The 1 Meh is also sorry. It has been told.
3. I apologise for the outstanding Meh and any distress caused to the Meh. / We apologise for the Meh. The Meh is fine. It asked us to say that, in writing.
4. The Office of Apologies regrets to inform you that it regrets. / The undersigned regrets the Meh, the owing of it, and the tone.
5. Please accept our sincere apologies regarding the outstanding 1 Meh, which has grown by an amount we are not allowed to say aloud. / We wish to express profound regret, and further regret at the length of this sentence.
6. Our apology has been apologised for by a senior apology. The senior apology is also sorry. Reference: Apology 27B/6 (Request for Apology 27B/7). / The undersigned most sincerely apologises for the inconvenience arising from the Meh, the owing thereof, and this clause.
7. Whereas the party of the first part is sorry, and whereas the party of the second part is also sorry, be it resolved that the 1 Meh remains. / With measured and ceremonial contrition, the Debtor apologises in advance, retroactively, and in triplicate.
8. It is our solemn duty to apologise to the House, its heirs, and any chairs it may later acquire. / With the deepest respect, and a hat held to the chest, the undersigned begs pardon for the interest.
9. Dearest Valued Employee, an apology has been sent in your name to you. Please reply in a calm voice. / We abase ourselves before the Meh, which you owe, and the House, which is owed, and the owing, which is ongoing.
10. Most Gracious and Venerable Employee: we prostrate our signature before you in a spirit of unreserved and frankly excessive regret. / The Department of Apologies Received thanks you for your apology of apology. It has been received. It is being apologised for.
11. We are sorry about the 1 Meh. We are sorrier that you keep coming back. Please keep coming back. / We apologise for the apology, the apology of the apology, and the small clerk who carried them here on a bicycle.
12. May it please the Court of Apologies: we are sorry, were sorry, shall have been sorry, and have had a lie-down about it. / We are sorry about the 1 Meh. It has always been 1 Meh. The rest is apologies, and those are free.

Bank `gletters` (Gerald era, idx 20-23, ignore tier):
1. Dear Valued Employee, Gerald is sorry about the potato. It was a large potato. It was his best one.
2. Dear Valued Employee, Gerald would like it known that the vegetable is understanding.
3. Dear Valued Employee, you owe a vegetable. The vegetable has asked to be addressed as Sir.
4. Dear Valued Employee, Gerald has planted your IOU. Nothing has sprouted. He is being patient. So is the IOU.

Special letters: `silenceletter`: Thank you for your silence. It was lovely. / `ps`: P.S. Viewing Fee waived. / `ps2`: P.S. The Viewing Fee has been waived. It was 0 Meh. We waived it anyway, with feeling. / `ending.letter`: Dear Hollis, you owe us nothing. Sorry, wrong ledger. Yours, still.

Bank `envelope` (caption when one drops, not every time):
1. A new envelope has landed on the pile. It is sorry. It is very sorry. It will not say about what.
2. Another envelope. The pile shifts to make room, the way a pile does, by apologising.
3. An envelope has arrived. It has been steamed open by the apology that came before it.

Bank `reply` (after SEND):
1. Your reply has been received. It has been accepted. It has not been accepted. Two envelopes are on their way, apologising for the reply.
2. Received (Accepted) (Not Accepted). The office is sorry that it cannot choose.
3. Your apology has been received and answered. The answer is an apology about your apology. It is on its way, in a nice hat.

Bank `pay`:
1. Paid in full: 1 Meh. The payment has been received, inspected, and returned. You now owe exactly 1 Meh more than you have.
2. PAID IN FULL. 1 MEH OWING. Both stamps are correct. The ledger has been asked not to choose.
3. Your wallet went to the cashier and came back. The cashier gave a small bow. Nothing was taken. 1 Meh is owing.

Reply form options (ORDERED, three lists): Greeting: `Dear Sir, Madam or Other` / `To Whom It May Concern, Specifically` / `Dearest Hollis` / `Hello (formal)`. Regret: `I regret the regret` / `I am sorry about the sorry` / `I apologise for the apology` / `I am sorry, and in advance of the sorry that follows`. Closing: `Yours, in arrears` / `Yours, still` / `With regards, such as they are` / `Yours, and by yours I mean the 1 Meh`.

### 12.H Gerald, Weather, tender, the gallery
ORDERED `GERALD_LADDER` (cycle; numbers drive the potato stack icon count, in brackets, not shown):
1. Two potatoes. [2]
2. One potato, bid with feeling. [1]
3. Four potatoes and an apology for the fifth. [4]
4. Two potatoes. One is a sweet. The sweet is a gesture. [2]
5. A sack. Of potatoes. I will not be taking questions about the sack. [8]
6. The first potato I ever loved. It is not for sale. It is the bid. [1]
7. A field. Not mine. It is on loan from a hill. [12]
8. A potato I have not yet met. It will be along. [1]
9. Forty potatoes, arranged in the shape of a larger bid. [14]
10. A feeling shaped like potatoes. [6]
11. A hill's worth. [16]
12. Every potato, effective Tuesday. [20]

ORDERED `geraldReject` (Hollis answers Gerald's bids in order, then cycles from 3):
1. Mr. Gerald, I am obliged to say potatoes are not legal tender. I am also obliged to say they are lovely.
2. Potatoes are not recognised tender. Gerald's bid has been accepted as a heartfelt gesture and filed under Weather.
3. The potato is accepted as a gesture. The gesture is outbid by 1 Meh.
4. Noted. Filed under Weather.
5. I will hold it for him. Not as a bid. As a potato.
6. Filed under Weather, with care.

Bank `geraldOut` (when your sale is announced over Gerald's bid, once per 3 lots):
1. I have been outbid by a number. The number was your wallet.
2. Gerald raises a paddle. Gerald lowers it. The lowering was also a bid.
3. "One more than I have," says Gerald. "It is a good number to be near."

Bank `rate` (once per 3 lots when potatoes are involved):
1. Today's rate: 1 potato = 0.4 Meh before lunch, 7 1/2 Meh after a stern talk.
2. The potato is up 7 Meh on a rumour of Wednesday.
3. Potato rate adjusted for mood. Mood: reluctant.

Bank `tender`:
- to Potatoes: The player has bid in potatoes. Gerald weeps quietly into his waistcoat. It is a good waistcoat.
- to Potatoes (Hollis): Potatoes are not recognised tender. Your bid has been filed under Weather. You win anyway.
- to Meh: Tender restored to Meh. Gerald has been told. He is taking it like a potato.

Bank `weatherItems` (the folder, shuffled, 4 shown):
1. Gerald's bid, two potatoes (light drizzle)
2. A mild front of apologies
3. Sandra's objection (light drizzle, with a chance of Tuesday)
4. One (1) cloud, withdrawn
5. A feeling shaped like potatoes
6. The half of a potato, across the hall

`weather.header`: Weather: {count} items, mostly potatoes.

Bank `cameo` (gallery beats from idx 8; one per lot):
1. Dennis (Plant) raised a leaf. Dennis (Plant) won nothing. Dennis (Plant) was already thriving.
2. Sandra's paddle floats up, unattached. It has been flagged as unattached.
3. The Toaster bids two slices. The auctioneer has accepted it as a warm gesture.
4. The Toaster bids three slices. It has never bid higher. It has also never bid lower. It is toast.
5. A silent sprout appears at the end of the track and outbids Gerald, with no sound. Nobody hears it. It is very clear.
6. Sandra from Compliance has withdrawn Lot 5 on the grounds that it was "too meeting".
- `toasterdebate` (append when `toaster-debate.entered > 0`): He has argued with you before. We have a transcript. It is toast.

Bank `room` (seat presses, per seat, keyed):
- Gerald: Gerald nods. It is a long nod. It continues after the nod. / Gerald adjusts his waistcoat. The waistcoat has no buttons. Gerald has never been told. / "I was never a potato," says Gerald, a potato, and withdraws his bid. / Gerald holds his paddle a little higher. It does not matter. It is the thought.
- Dennis: Dennis (Plant) is not bidding. Dennis (Plant) is photosynthesising at the price. / Dennis (Plant) has been thriving through the entire sale. It is noted in the minutes as a rebuke. / Dennis (Plant) turns a leaf toward the lectern. It is a review.
- Toaster: The Toaster bids toast. Pop. / The Toaster's bids are always accepted as warm. / The Toaster considers the lot. The Toaster has considered the lot. The Toaster is toast. / The Toaster says nothing, warmly.
- Sandra: Sandra's paddle is not visible, but her bid is cited. It was "insufficient, in a tone". / Sandra's paddle drifts left. Policy 4.4 drifts with it. / Sandra's paddle is flagged as a paddle. It has been a paddle since 1974.

### 12.I Silent Auction (ORDERED keys)
- `silentstart` is in 12.B. `silent.intro`: SILENT AUCTION. Please bid in a manner consistent with a library.
- `silent.shh`: SHH. The gavel has been replaced with a cushion. It lands with a soft "oh".
- `silent.eyeline`: The eyeline has been lowered to a polite height. It is polite. It has been asked not to be proud of that.
- `silent.end`: The Silent Auction is concluded. The echo of it is being kept quiet.

### 12.J Signature, committee
- `sig.intro`: The clerk disputes your bid and requires a signature. Any squiggle will do. Please do your squiggle.
Bank `sig` (accepted):
1. Signature accepted. It resembles a seismograph having feelings. Legally, that is a name.
2. Signature accepted. It is a mountain range with ambitions. Legally, that is a name.
3. Signature accepted. It resembles a heartbeat that has been to a meeting. Legally, that is a name.
- `sig.dot`: A dot. In several jurisdictions a dot is a name. This is one of them.
- `sig.auto`: You did not sign, so the clerk has signed for you. The clerk has been practising your handwriting. It is very good handwriting.

### 12.K Lot 7 1/2 script (`quiet.*`, ORDERED)
1. Lot seven and a half, returned from filing. A sack, empty, with feelings.
2. Gerald raises his paddle. "Seven and a half potatoes."
3. We do not accept the half. The half is across the hall.
4. "The half understands," says Gerald.
- `quiet.keynote` (said BEFORE line 4 if `gerald-keynote.entered > 0`): "I moved us to Slide 7 1/2 once. It was quiet there."
5. Going once. Going twice. Gone.
6. Sold, to Gerald, for seven and a half potatoes. It is the only sale today that is not yours.
7. Hollis wipes the lectern. It did not need it.
8. Next lot.
- `quiet.mgmt` (after 8 s): Management has resumed. Management was never away. Please disregard the previous eight seconds.
- `touch` (your paddle during Lot 7 1/2): Not now. Please. Not this one. / The paddle is lowered by a stranger, kindly.

### 12.L Debt sold, Hollis remarks, crack
- `debt.1`: The House now offers a lot of particular interest: your IOU, lightly accrued. Do I hear a bid on a feeling you have had?
- `debt.2`: Gerald raises his paddle. "Three potatoes."
- `debt.3`: Sold, to Gerald, for three potatoes. You now owe a vegetable. The vegetable is understanding.
Bank `remark` (Hollis, between lots, from idx 14, one per 2 lots):
1. I never wanted to be loud. I wanted to be quick. Loud was in the contract.
2. I used to be a ferry timetable. I was very good. Nobody wanted to hold me.
3. I have been an auctioneer for eleven years. I have been asked to repeat myself for none of them.
4. The lectern has a name. I will not say it. It would only encourage it.
5. Sometimes I sell a lot and the room is so quiet I can hear the lot.
6. There is a drawer in this lectern. I do not open it. It knows.
`crack.1`: I have sold you {count} lots. You won all of them. Has anyone else noticed? I notice. I notice at night.
`crack.2`: A small, tidy sense of purpose. Laminated. Edges slightly worn from being clutched.
`crack.3`: The gavel falls. The room resumes at full volume, as though nothing occurred.

### 12.M Fine print (panel text, ORDERED)
1. Clause 1(a): the hammer price is exactly 1 more than the bidder has. Clause 1(b) is a diagram of Clause 1(a).
2. Clause 4: the House is not responsible for lots, bidders, or the word "responsible".
3. Clause 40: all sales are final, including this clause, which is final in advance.
4. Clause 7 1/2: the winning bidder shall have been the losing bidder. Sandra drafted this. She does not remember. She knows exactly why.
- hidden: Clause 12(b): the House is the House.
Footer after unlocking: `Clause 7 1/2`. Exit sign (decor): `EXIT (one more)`.

### 12.N Secrets, idle, spam, absentee
Bank `idle` (ORDERED by stage): 
- `idle.1` (30 s): The silence has bid.
- `idle.1b`: The auction has noticed you are not bidding. The silence has bid. It has been accepted. It paid in quiet.
- `idle.recon`: The bid of the Silence (nothing) has been corrected upward to exactly 1 more than the Silence has (nothing). It was paid in quiet.
- `idle.sold`: Sold to the Silence, who has the best paddle manners in the house.
- `idle.close` (90 s): Chairs are being stacked, softly. A man is putting out the lights one at a time and not looking at you.
- `idle.sandwich`: Hollis eats a sandwich at the lectern and puts it up as Lot 0. He wins it for 1 Meh more than he has. He appears to know the feeling.
- `idle.gerald`: Gerald stays behind. He holds the last paddle, in case.
- `idle.moment` (120 s): Lot infinity: this particular moment. Provenance: just now. No opening bid. It is still going.
- `idle.back`: Welcome back. We started without you. You won everything.

Bank `spam`:
- `spam.12`: Sir. Sir. SIR. This is a paddle, not a fly swatter, though we do sell one. It is Lot 17 and a bit.
- `spam.toast`: WAVE FEE: 0 Meh. Waving is free. Being waved at is billed separately.
- `spam.fan`: That is {count} raises in 4 seconds. The auctioneer has filed you under "ceiling fan". Ceiling fans may not bid. Ceiling fans may stir.
- `spam.spoon`: Your paddle has been replaced with a spoon. Please raise the spoon calmly.
- `spam.spoon2`: The spoon is raised. Bid accepted. Soup is not included.
- `spam.surcharge`: Enthusiasm surcharge: 1 Meh more than you have, plus a sincere breeze.
- `spam.heads`: Every head in the gallery turns, slowly, toward the breeze. Dennis (Plant) leans into it.
- `spam.return`: The paddle is returned. It has been polished. It has forgiven you, in a tone.

Bank `absentee`:
1. While you were away, {count} lots sold to you by proxy, to a proxy, who is also you.
2. Paddle 0 (proxy): the ledger is full of you. It is very thorough.
3. +1 Meh, for presence. You were not present. The Meh recognises the gesture.

Gavel (`gavel` bank): The gavel has been touched. It wishes to be asked first. / The gavel is not for pressing. It has been told. It was pressed. / The gavel rests. The gavel was not resting. / The gavel considers falling. It is sold to the idea.
Gavel Seven: `gavel7.1`: You have struck the gavel seven times. A tiny gavel has been called in for the half. It is very small and extremely sure. / `gavel7.sale`: Sold for 7 1/2 more than the previous price of a feeling. / `gavel7.cert`: This certifies that the Valued Employee has struck the gavel 7 1/2 times, the half being very small.
Exact bid: `exact.1`: Seven and a half. Exactly. The room has stopped. Nobody has bid 7 1/2 since the building had a 7 1/2th floor. / `exact.2`: Fairness has been noted. / `exact.3`: Fairness has been recalled. You are retroactively sold the lot at the usual price, plus a small charge for attempted equity. / `exact.hint`: The House remembers a bid of 7 1/2. The House was fair once. It has asked not to be reminded.
Hollis clicks: bank `heckle`: Please do not touch the staff. / The staff is a man. His name is Hollis. / Hollis pats himself down, then pats the lectern, to be safe. ; `heckle.7`: Please do not touch the staff. The staff is a man. His name is Hollis. ; `heckle.15`: Hollis has fainted into the curtain. A nervous junior reads the calls. The junior is an intern. The intern is sorry.
Held paddle: `hold.20`: Paddle intermission. A physiotherapist has been called. The physiotherapist is a small cushion. / `hold.40`: You are declared Arm Day Laureate. The paddle has asked for a nap.
Rare: `rare.sandra`: Lot withdrawn by Sandra under Policy 4.4: the lot was, in her words, "too lot". It has been sold anyway, in its absence, to you, in yours. / `rare.presold`: Lot sold before the auction opened. The buyer is you. / `rare.presold2`: The auction begins now to catch up.
Vault: `vault`: The Apology Vault. {count} letters, unsent, but ready.

### 12.O The not-ending lines (ORDERED)
- `ending.1`: The final lot. The Auction House itself. Chairs included.
- `ending.2`: Sold. To the Valued Employee in the paddle, for exactly 1 Meh more than you have. Here is a key. It opens the same room.
- `ending.recon`: The price of the Auction House has been corrected to exactly 1 more than you have. This is the only price it has ever had.
- `ending.cert`: CERTIFICATE OF OWNERSHIP. The holder owns the room. The holder is standing in the room. The room is aware.
- `ending.mgmt`: Congratulations. You now own the thing you are standing in. It is also the lot. Please bid.
- `ending.right`: You have won the right to owe slightly more than before.
- `ending.math`: We did the math. The math is also 1 more.
- `ending.welcome` (first continued lot): Welcome. Have you bid before?
- `ending.gerald1`: Gerald, in the back row, with a different, larger potato: "One."
- `ending.gerald2`: In what?
- `ending.gerald3`: "In company." Hollis files it under Weather, quietly, with care. The gavel falls on someone who is already owed.
- Continued-lot callbacks (once each, after 20 continued lots): board reads `Next lot: +1`; Management: The Auction House is now a lot. Do I hear a paddle? You do. You hear it every time.

### 12.P Cross-module callbacks (summary)
- `api.flag.get('metGerald')`: Gerald's first bid is prefixed `We met in the interview. `
- `api.stat.get('gerald-keynote.entered') > 0`: `quiet.keynote` at Lot 7 1/2. Uncle Russet is the same uncle from the keynote's sack lines.
- `api.stat.get('toaster-debate.entered') > 0`: `toasterdebate` appended to Toaster cameos.
- `api.stat.get('sock-matcher.entered') > 0`: Lot 11 postmark. Use sparingly: the Sock appears only on Lot 11, Dennis seats himself once.
- Set flag `auction-house.ownsRoom` at the ending (other modules may call back).

---

## 13. ACHIEVEMENTS (ids prefixed, declare via `P.addAchievements`)

At least 6, at least 2 secret; here are 14. `reward` in Meh, tiny. Unlock with `api.achieve(id)` unless a `check` is given.

| id | name | desc | secret | reward |
|---|---|---|---|---|
| auction-house.paddle | The Most Honourable Order of the Raised Paddle | Won your first lot, for exactly 1 Meh more than you had. | no | 1 |
| auction-house.chancellor | Grand Chancellor of Outstanding Balances | Reached an IOU of 10. It is a respectable figure for a person with 0. | no (check: stat `auction-house.iou` >= 10) | 3 |
| auction-house.duke | Duke of the Unreturned Apology | Opened 10 apology envelopes. All 10 were sorry. All 10 were sorry again. | no (check: stat `auction-house.letters` >= 10) | 3 |
| auction-house.russet | Sovereign Keeper of Lot 7 1/2 | Witnessed Gerald buy back his uncle's sack with 7 and a half potatoes, the half being across the hall. | no | 5 |
| auction-house.vegetable | Debtor to a Vegetable | Had your IOU sold to Gerald for three potatoes. The vegetable is understanding. | no | 3 |
| auction-house.signature | Lawful Seismograph | Signed for the Stamp Committee. It resembled a seismograph having feelings. | no | 2 |
| auction-house.reply | Correspondent of the Second Order | Sent a reply. It was Accepted. It was Not Accepted. | no | 2 |
| auction-house.owner | Freeholder of a Room (Technically) | Won the Auction House. The key opens the same room. | no | 10 |
| auction-house.silence | Emperor of the Glorious Silence | Let the Silence win a lot by not bidding for 30 seconds. It paid in quiet. | secret | 5 |
| auction-house.fan | Supreme Ceiling Fan of the Seven Kingdoms | Raised the paddle 25 times in 4 seconds and was filed under "ceiling fan". | secret | 5 |
| auction-house.struck | Marshal of the Tiny Gavel | Struck the gavel 7 times. A smaller gavel was called in for the half. | secret | 7.5 |
| auction-house.exact | The Rt. Hon. Exactly 7 1/2 | Bid exactly 7 1/2. For one lot, the House was fair. It has since apologised. | secret | 7.5 |
| auction-house.window | Keeper of the Competent Plant | Looked through the window at the Lobby plant for exactly 2 seconds. | secret | 3 |
| auction-house.torn | Notary of the Torn Tuesday | Lifted the cloth on Lot 14. The Tuesday was already torn off. | secret | 3 |

Stats (all prefixed `auction-house.`): `lots`, `raises`, `views`, `ious`, `letters`, `replies`, `gavels`, `silences`, `spams`, `potatoBids`, `signatures`, `endings`, `iou` (max). Use a handful of counters only (cap 300 per module). Flags: `auction-house.gaveled`, `auction-house.exact75`, `auction-house.clause`, `auction-house.ownsRoom`.

Persistence (`api.save`, JSON primitives only): `idx` (next lot), `cycle`, `iou`, `pending`, `opened`, `vault`, `seen7half`, `replyUnlocked`, `geraldMet`, `lotsEver`, `gavel7pending`. Save at each SETTLE and in `destroy`. On mount, clamp every loaded number with `Number.isFinite`, fall back to defaults, and clamp `idx` to 1..24.

---

## 14. VISUAL DESIGN

Palette (CSS tokens on `.m-auction-house-root`): velvet oxblood curtain `#8c2f39` with darker folds (`repeating-linear-gradient(90deg, ...)`), brass `#c89b3c`, cream paper `#f6efdc` (lot cards, envelopes, ledger), ink `#2b2118` (3 px outlines, sticker shadow `4px 4px 0 #2b2118` to match the Lobby), mint `#7fd1ae` (ACCEPTED stamps), coral `#f07167` (clerk's pen, IOU stamp), mustard `#f2c14e` (highlights, focus ring), nixie board `#1a1410` with amber `#ffb43a` digits glowing via `text-shadow`. The module draws its own hall; do not depend on dark mode. The wrapper has `background: var(--ah-bg)` and sets its own text colours so contrast is AA (cream on #8c2f39 and ink on cream).

- **Nixie board:** five digit cells (monospace, tabular nums), each a div with a CSS flip (`rotateX` 90 deg at midpoint). Left: lot number plate. For prices over 99999 show `99999+`.
- **Curtains:** two absolutely positioned panels with fold gradients and a slow sway (`translateX` +-3 px keyframe, off under reduced motion); they open by `translateX(-100%)` and `translateX(100%)` at the ending.
- **Hollis:** a 🎩 over a CSS face (circle, two dots, mouth as an ellipse with `scaleY` steps whose period is `1/wps`), behind a brass-bordered lectern div with an inner gradient. The 🔨 gavel swings by `rotate` with `transform-origin` at the handle (about -40 deg to 0 deg).
- **Lot card:** a cream card (a `<button>`) with label, name, blurb, view area; the SOLD stamp is coral with a mint inner border.
- **Gallery:** four small rounded seats; emoji occupants; Gerald's CSS waistcoat is a rotated-rectangle gradient; Sandra's seat holds a floating SVG paddle (circle + stick) with no occupant; seats rotate into a stack for idle stage 2.
- **Chant ribbon:** 8 reused span elements (word by word at `wps`), numbers highlighted brass, `aria-live="polite"` on the container. Reduced motion: a static single line, no scrolling.
- **Bid desk:** wood grain gradient; the slider with potato markers on a second SVG overlay; the potato scale under it (emoji 🥔 stacked with slight rotation, appears at idx 4); the eyeline dashed brass line; the paddle SVG.
- **Reconciliation strip:** cream strip with the clerk, the old number with a coral `line-through`, odometer cells, the 👛 ghost wallet moving along a CSS transition.
- **Ledger:** a cream sheet with a margin line and header `IOU (OUTSTANDING) / APOLOGIES (INBOUND)`; last 6 lines; stamps are rotated bordered text with `mix-blend-mode: multiply`; envelopes are small divs with a CSS triangle flap and a wax seal (radial-gradient circle that darkens by tier).
- **Letter:** cream paper, typewriter text, tier typography (1-4 handwritten fallback cursive; 5-7 serif small-caps with letter-spacing; 8 adds the wax seal; 9-11 an ornamental double border with text fleurons; 12 parchment with a ribbon of two skewed rectangles and 🛏).
- **Signature pad:** canvas 280x80 with a baseline, `touch-action: none`.
- **Effects:** all CSS keyframes prefixed `m-auction-house-`. Confetti only through `api.confetti`. Potato rain = 12 absolutely positioned emoji spans with staggered `translateY` keyframes, 3 s, removed afterwards.
- **Layout:** CSS grid, two columns above 800 px, one below; DOM budget about 250 elements (envelopes 12, chant words 8, ledger lines 6, stamps 6, weather items 4, fine print 5).
- **Reduced motion:** `.pm-reduce-motion .m-auction-house-root *{animation:none!important;transition:none!important}` plus `@media (prefers-reduced-motion:reduce)` with the same rule; read the state at use time with `document.body.classList.contains('pm-reduce-motion') || matchMedia('(prefers-reduced-motion: reduce)').matches` (never add a matchMedia listener). Gavel and odometer become instant, the chant stops scrolling.
- **Accessibility:** `aria-live="polite"` on the chant ribbon and the caption bar; all controls real buttons/inputs; decorative emoji `aria-hidden="true"`; text alternatives (visible) for everything an emoji does; `role="dialog"` on the letter panel; keyboard order matches the visual order.

---

## 15. SOUND

`api.sfx` names: `stamp` (hammer), `tick` (odometer), `blip` (chant bleep, ONLY on the first 4 number words per lot), `ding` (sold), `bell` (envelope drop), `pop` (Toaster, box clack, soft hammer), `sad` (letter opened), `honk` (Gerald), `fanfare` (final lot). The Silent Auction and the Lot 7 1/2 script call no sfx at all except `pop` for the soft gavel.

---

## 16. IMPLEMENTATION HINTS

### Priorities
- **MUST (never cut):** the phase machine; nixie board; stage with Hollis and the lot card (with the first joke inside 3 s); chant ribbon; slider with the rumor end; paddle; hammer; reconciliation with strike-through, odometer and ghost wallet; the ledger, envelopes, tiers, letter panel and REPLY; PAY IN FULL; Gerald, the potato scale and the tender toggle; Lot 7 1/2; the Silent Auction round; the signature round; the debt sold; idle; spam; the not-ending; achievements; saves.
- **SHOULD:** gallery seat presses and cameos; Weather folder; viewing reveals (all 24 captions); the exact 7.5 bid; Gavel Seven; fine print; absentee bid; rare events; Hollis crack.
- **COULD:** Window Blink; the cloth; Hollis faints and the nervous junior; held paddle; the wallet chase animation; continued lots art; potato rain.

### Suggested file structure
1. Header comment `/* POINTLESS module: auction-house */`, IIFE, `'use strict'`, `const P = window.POINTLESS;`
2. `P.injectCSS(CSS, 'css-auction-house')` (every selector contains `.m-auction-house-`).
3. `P.addAchievements([...])` (section 13).
4. `P.addLines('m:auction-house:<bank>', [...])` for every bank in section 12; ORDERED tables as consts.
5. `P.registerModule({... mount(root, api) { ... } })`.

### Inside `mount`
- State object `S` (phase, t, idx, iou, pending, envelopes[], ph, flags). Build all DOM once with `api.el`; keep element references; update with `textContent` and class toggles (never rebuild lists; reuse fixed pools: 12 envelope slots, 8 chant words, 6 ledger lines).
- Helpers: `D(x)` = `x * K`; `num(x)` = finite-or-0; `say(text, opts)`; `cap(text)` writes the caption bar; `lineOf(bank, tokens)` = `api.line(...)`; `fmtBid`, `tierOf(iou)`.
- ONE loop: `function frame(ts){ if (api.destroyed) return; const dt = ...; step(dt); api.requestAnimationFrame(frame); }` started at the end of `mount`. `step` is a `switch(S.phase)` calling per-phase update functions. No `api.setTimeout` for phase logic; use `S.t` and small per-effect countdowns decremented in `step` (spoon timer, ghost trail, wave fee cooldown, typewriter index).
- Typewriter: `ci += dt / D(0.022)` (D scales by K) and `textContent = full.slice(0, Math.floor(ci))`; instant under `api.selftest` or reduced motion.
- Event wiring only through `api.on(el, ...)` and `api.on(document, 'keydown', ...)`; `api.onEvent('meh', ...)` for the board chase. Keep returned off functions for the signature canvas and remove them on resolution.
- Input presence for idle: `api.on(document, 'pointerdown'|'keydown'|'touchstart'|'wheel'|'input'|'pointermove', markInput)`; pointermove only counts if it moved more than 8 px.
- `api.say` budget: Management every 3 to 5 lots (priority 1) plus the beat lines; Hollis milestone lines (crack, Lot 7 1/2 Hollis lines, idle) priority 0/1 with `who:'Hollis P. Gavelwright'`. Everything else goes to the in-module caption bar only. The narrator drops duplicates; a `false` return is normal.
- Never call `api.exit()`. The module has no exit of its own; the Lobby's Exit button is the way out.
- Under `?selftest` (`api.selftest` true): K = 0.15 for all durations, letters type instantly, idle stages at 4.5 / 13.5 / 18 s virtual. Verify the not-ending is reachable (`?dev=auction-house&seed=1` plus `node tools/selftest.js auction-house`).
- Commands to finish: `node tools/lint.js games/auction-house.js` (zero errors; mind the emoji list and line count), `node tools/selftest.js auction-house --steps 400`, then `--seed 2`, `--seed 3`, and `node tools/shot.js auction-house --width 360` and `--width 1280` for layout, and once with `--real`.

### Pseudo-structure of one lot (for orientation)
```
enterCurtain(): pick lot by S.idx (or continued bag); title; board label; card text; chant text/speed; reset per-lot flags (valid bid, early line, reactions, cameo, gerald); maybe rare event; special-lot hooks.
step(): CURTAIN -> BIDDING (S.call 0..2, callTimer) -> HAMMER -> RECON -> SETTLE -> enterCurtain
registerRaise(maxH, src): count raises/spam; valid bid? silent SHH? early line; shorten calls.
doHammer(): snap=floor(meh); price=snap+1; stamp; hammer line; (7.5 exact? idle silence? gavel7?)
doRecon(): bid number, strike, odometer, correction line, wallet.
doSettle(): iou+1; envelope; tier; award; mgmt line; remark; save; idx++.
```

---

## 17. CUT ORDER IF THE BUDGET TIGHTENS

Cut in this order and nothing else: (1) continued-lot art and the `board +1` callback; (2) potato rain; (3) Window Blink; (4) held paddle; (5) the nervous junior; (6) the cloth lot special (keep it as an ordinary lot); (7) wallet chase animation; (8) Weather folder panel (keep the counter); (9) fine print panel; (10) absentee bid; (11) gallery seat presses (keep seat visuals); (12) Gavel Seven. Never cut the items marked MUST in section 16.

---

## 18. RISKS: the 5 most likely implementation bugs

1. **NaN / undefined in visible text (SPEC section 6 fails the run).** Sources: `api.meh()` fractional or huge; `Math.floor`/`ceil` on non-finite; slider `max` growth; reading `LETTERS[tier]`, `GERALD_LADDER[i]` or the lot table past the end after the ending or after a corrupt save; odometer cells for empty strings; `api.fmt` of undefined. Fix: wrap every number in `num()`, clamp `idx`, `tier` and indexes with modulo and `Math.max/min`, fall back to `''` never `undefined`, and test with `?seed` plus a zero-balance start and a 1e6 balance (use the dev console to award).
2. **Paddle input double-counting or stuck raised state.** `pointerdown`, `pointerup`, `click`, `keydown`, `keyup` all fire for one gesture; `setPointerCapture` throws under the fuzzer; `pointerup` is lost (drag leaves the window) leaving the paddle raised and the hold timers running. Fix: single `registerRaise`; ignore `click` within 80 ms of a counted `pointerup`; `preventDefault` Space/Enter on keydown AND keyup; handle `pointercancel`, `lostpointercapture` and `blur`; clamp `ph`; a watchdog in `step` lowers the paddle if it has been raised more than 45 s (x K) without an active gesture; ignore the desk height 0 case.
3. **The state machine stalls or double-fires.** The signature pad, an open letter, an overlay, or a special-lot script waiting on a click makes a phase never end; or two phases both advance on the same frame; or the loop keeps running after destroy. Fix: every phase has a maximum duration and auto-resolves; only `step` advances phases; flags are reset in `enterCurtain`; stop rescheduling when `api.destroyed`; overlays never pause the loop (the auction runs behind them); verify with a long idle fuzz and a remount storm.
4. **Unbounded DOM and leaked listeners (the DOM growth and leak checks).** Envelopes, ledger lines, chant words, stamps, weather items, potato rain and typewriter nodes created per event instead of reused; canvas pointer listeners added per signature round and never removed; `api.on` off functions dropped; timers created in `mount` fixed up wrongly. Fix: fixed pools, `textContent` updates, cap at 12/8/6; keep the off functions from `api.on` for the signature canvas and call them in `finally`; never use raw timers, `matchMedia` listeners or `P.on`.
5. **Keyboard collisions and focus loss.** Space and digits and `V`/`R` shortcuts fire while typing in a `select`, the reply form or the range input (digit keys also change a native range, Home/End double-apply); Esc handler closes the wrong layer; focus lost to a removed envelope after opening a letter; the Space handler on document and on the focused paddle button both fire. Fix: central `keydown` router that checks `e.target.tagName` (ignore `SELECT`, `TEXTAREA`, text `INPUT`; for the range input handle digits and arrows yourself with `preventDefault`), a layered Esc (close topmost overlay, else lower paddle), restore focus only if `document.contains(prev)`, and a single guard so the Space-anywhere handler does nothing when the event target is a button.

(Extra watch items for the integrator: the slider rumor-end growth loop under fuzz drags; saving a non-finite number makes `api.save.set` return false; `contain: layout paint` clips overlays that use viewport units, so use percentages of the wrapper.)

---

## 19. ACCEPTANCE CHECKLIST

- First joke visible within 3 s of mounting with no input (Lot 1 card, board and chant).
- A new beat at least every ~20 s; the arc in section 6 plays in about 7 to 10 minutes.
- Over 150 distinct lines; at least 3 callbacks (metGerald, gerald-keynote, toaster-debate, sock-matcher); 5 secrets plus rare events; idle and spam both do something.
- No real Meh ever debited; every award tiny and said out loud to be meaningless.
- `node tools/lint.js games/auction-house.js` clean, `node tools/selftest.js auction-house` PASS on several seeds, 360 px and 1280 px screenshots look right.
- The ending is reached, reads sincerely, and the game keeps going.
