# DESIGN BRIEF: Seven and a Half (`seven-and-half`)

Final merged brief (showrunner). A builder who reads only SPEC.md, VOICE.md and this file can build the module. Output file: `games/seven-and-half.js` (single file, <= ~1800 lines, vanilla JS, classic script, no network, no external assets). Every line in section 10 is final and verbatim. `{tokens}` are SPEC tokens; the builder passes pre-formatted STRINGS (e.g. `count: '2 1/2'`, `count: '24'`). Lines never contain the words null / undefined / NaN; format every number through one helper (`fmtN(x)` -> `'7'`, `'6 1/2'`, `'1/2'`) that guards non-finite input.

## 0. Decisions made while merging the three pitches (do not re-litigate)

- **Spine = pitch 1** (felt table viewed from above, Dennis in a pot with the HALF in a clothes-peg clip, Sandra's stackable Amendment Engine, the Half Loan false victory, 13-hand Match, Match 2 "Management remembers you"). It is the funniest and its novelty (rules that change how your hands and cursor must behave) is the point.
- **From pitch 2:** the 20-step "Request for Half" refusal chain (merged INTO the TUG mechanic, one counter, shown in the header as `Requests for Half: N`), "OFFER a card to Dennis" (kept as the Gift secret, now also a legal way to shed a card), the Photocopier/spam "Please" card, the clerical-error rare event (half dealt to you by mistake), the "hospitality" and "thriving" tone, the Stapler grievance, Dennis's header readout.
- **From pitch 3:** deadpan "ruling: both parties are present", the Missing Sock postcard (micro-event), the Toaster half-slice (micro-event), the "Hand 7 1/2" final-hand header, the rulebook "drawer" gag for Amendment 10 (as an interim amendment line), the staring contest is CUT (a separate module `staring-contest` already exists).
- **CUT as unbuildable or weak in one file:** 4 suits and the 27-card deck (deck is just 1-7); number keys 1-7 to request a card by name; the Toaster discard slot and re-roll; Roman-numeral/feelings card faces; Gerald dealing a hand; Dennis hat as a separate CSS asset (the paper crown at 10 gifts is the hat); the second Dennis seat only exists as a tiny 'Reserve' cactus on wide screens (one div); a canvas seismograph (the meter is an inline SVG semicircle); tournament bracket / trophy / Tuesday-card beats; the table "folding up"; real `new Date().getDay()` Tuesday check (never use Date); persistent "season" decks (3/4 card, 7/8 card); per-hand 12-line drop of hand-count stutter.
- **Dennis never wins and never has exactly 7 1/2** by honest play (his total is `28 - yourTotal` + 1/2, which is 7 1/2 only if you hold 21, impossible because you bust at 8). The FURNITURE ruling stays in the ruling bag as pure absurdity. Pitch 1's "Dennis holds exactly 7 1/2 almost every hand" is cut.
- **There is no way to win.** The only 7 1/2 the player ever holds is borrowed or mistaken (Half Loan, Clerical Error, Stillness, Finale), lasts a few seconds, and is struck from the record on screen.

Category `game`, `unlockCost: 0`, icon `🃏` (Emoji 0.6), title `Seven and a Half`, tagline `Exactly 7 1/2. The half is with the other player.`, tags `['cards','rules','dennis']`. Avoid 🪴 (Emoji 13): Dennis is a CSS pot + `🌿`/`🌱` emoji scaled 4x with a drop shadow. Safe emoji: 🃏 🌿 🌱 🔔 📎 🧾 🥔 🍞 ✉️ 😞 📌 🔒.

---------------------------------------------------------------------

## 1. Concept

You sit across a mint-felt table from Dennis the Lobby Plant and play Seven and a Half. The deck is the numbers 1 to 7 (seven real cards). You hit or stand, trying to land on exactly 7 1/2 without going over (bust = 8 or more). The only half card is clipped to Dennis's front leaf, face up, forever (`HELD BY D. PLANT`). Every hand you can build is a whole number, so you are permanently 1/2 short and the readout says so, flatly: `YOU: 6   (7 1/2 requires a 1/2. See Dennis.)`. Dennis never reacts, never wins, never loses. The ruling on every hand is "filed" in some creative way. Between hands **Sandra from Compliance** (a yellow slip, never seen, only cited) serves an **Amendment** that physically changes how your hands and cursor must behave (hold to ask, hold still, drag leftwards, labels swap, the room spins), and the amendments stack (max 3 in force). Management narrates every hand like a championship.

Tone: VOICE.md in full. Total sincerity. Never explain a joke.

---------------------------------------------------------------------

## 2. Exact interactions and controls

Every action has mouse, touch and keyboard paths. All controls are real `<button>`s (deck, bell, cut, binder tab, cards in hand, Dennis, the HALF, badge, slip buttons). Keyboard shortcuts are handled by ONE `api.on(document,'keydown',...)` handler that ignores events with ctrl/meta/alt, ignores targets that are input/textarea/select/contenteditable, and never uses `B` or the grave accent (reserved by the engine). Shortcut map:

| Key | Action |
|---|---|
| `H` | the action currently labelled HIT (see Label Exchange; physically it triggers the same function as the deck control) |
| `S` | the action currently labelled STAND (same as the bell control) |
| `C` | CUT |
| `D` | POKE DENNIS |
| `T` | TUG THE HALF (400 ms stretch animation) |
| `I` | initial the open slip (hold or mash) |
| `O` | OFFER: gift the focused / last card in your hand to Dennis |
| `R` | open/close the Rules Binder; `Left`/`Right` flip pages when open; `Esc` closes |
| `Space` / `Enter` | native button activation; also fast-forwards the REVEAL (see 3) and skips a ceremony line |

Typing `please` (buffer of last 6 key letters, only when no text control is focused) fires the Please secret (8.3). Keys also count as "movement" under Amendment 4 (see 4.4).

### 2.1 HIT
- **Mouse:** click the deck, or press on the deck and drag; a ghost card follows the pointer and a release after >= 40 px of travel counts as a "drop" (anywhere is a valid drop; Management allows it). Release speed (px/s over the last ~100 ms of pointer samples) is stored as `dropSpeed`; drop direction `dx` (left = negative) is stored.
- **Touch:** tap the deck (tap = click), or drag as above. A long press (>= 0.8 s) is a hold.
- **Keyboard:** `H`, or Enter/Space with the deck button focused. Under Sincerity hold the key 0.8 s (keydown starts the ring, keyup before full refuses).
- The deck is a real `<button>` containing a visual stack of up to 7 cards (box-shadow offsets, 1px each). Under it sits a dashed half-height slot labelled `LAST CARD: RESERVED`.
- Every hit: `pop` sfx, card slides from the deck to the hand (CSS transform transition 220 ms, computed from `getBoundingClientRect` of deck and hand so it works 360-1400 px; never trust coordinates inside a rotated table without recomputing), readout flips (CSS 3D rotateY 280 ms). Dennis silently takes one face-down card into his next leaf clip (fan of up to 4 leaf clips; later cards stack under the 4th).
- Deck empty and player hits: the card "bounces" off the RESERVED slot (shake), line from bag `halfSlot`, no card, no award. Spam rules in 7.

### 2.2 STAND
Click/tap the bell (`🔔` in a coral circular button, >= 48 px), or `S`. Stand ends PLAY. A tiny paper flag on the tray is NOT built (cut).

### 2.3 CUT
`CUT` button next to the deck, `C`, or drag horizontally across the deck >= 60 px. The top half of the stack lifts and re-stacks; the reserved half-slot always shuffles itself back underneath with a `schloop` (`whoosh` sfx + 120 ms translate). Re-shuffles the remaining deck with `api.shuffle`. Pays +0.5 Meh, **capped at 1 payout per hand** (further cuts are a "harmless fidget"; still counts `.cuts`).

### 2.4 POKE DENNIS
Click/tap Dennis's pot or leaves, or `D`. The leaves are inert. The Reaction Meter stays at 0.0; Management logs "a leaf". Pokes are also the "request permission" input under Amendment 3. Hovering the pointer on Dennis for 7.5 s fires the Stare line (8.7).

### 2.5 TUG THE HALF (= Request for Half)
Press-drag on the HALF card in Dennis's clip: it stretches elastically (spring computed in `api.requestAnimationFrame` with the timestamp argument, delta-time based, damping 0.82, displacement capped ~90 px) and snaps back with a ruler-twang (`bloop` sfx). Keyboard `T` triggers a 400 ms stretch animation. The half can never be taken. Each tug increments `tugs` and the header's `Requests for Half`, and says the next line of the escalating refusal chain (section 10.N). The spring loop only runs while displaced (never a permanent rAF).

### 2.6 OFFER (gift) a card to Dennis
Drag a card from your hand onto Dennis (pointer drag with a ghost, drop-test against Dennis's rect), or focus a hand card and press `O`. Dennis clips it with a leaf (the leaf rotates 1 px), your total drops by the card's value, his pile grows by one. Any time in PLAY. `gifts++`. 5 gifts in a match: bribe line. 10 gifts (lifetime, saved): a small paper crown (CSS triangle div) on Dennis for the rest of the session (kept in `api.save`). The Reaction Meter stays 0.0. Offering counts toward the "Plenipotentiary" achievement (cumulative 7).

### 2.7 INITIAL an amendment (the Scribbler)
A yellow slip slides in with `AMENDED` stamped on it (scale 2.2 -> 1 with an ink-ring burst) and a dashed initials line (an inline SVG pad). The player scribbles by pointer-dragging over the pad (an SVG `<path>` built from pointer events, **capped at 300 points per slip**, `stroke-linecap: round`, ink colour) until the progress ring fills (path length >= 220 SVG units per line). Keyboard: **hold or mash `I`** (each keydown repeat or press adds 45 units). Hand 2-5 need 1 line, hands 6-9 need 2 lines, hands 10-13 need 3 lines (Match >= 3: always 1). Under `api.selftest`: 1 line, and the line needs 40 units. After the last line fills: Sandra's bigger initials appear over yours (an enlarged `S.C.` in the corner), line from bag `initials`, `+0.2 Meh`, `.initials++`, slip flies to the binder.
- **`Proceed Uninitialled` button** skips it: `-0.2 Meh` (awarded as `api.award(-0.2,...)`, never below 0), one extra snippy `uninitialled` line, the amendment is enforced anyway.
- The slip never blocks the game for more than the time it takes to click one button; it never covers Dennis or the deck.
- From hand 9 a second **Rider** slip (cosmetic, one-line, bag `rider`) arrives with the amendment and also needs initials (1 line) or skipping; riders have no mechanical effect.

### 2.8 RULES BINDER
A lilac tab on the right edge (button `Rules Binder`, or `R`). Opens a panel: a flip-through list of every amendment so far (one per page; **cap 13 pages**), with strike-throughs for repealed ones and contradicting entries ("see also Amendment 3"). Left/Right arrows or on-screen `<` `>` tabs flip. The binder tab gets visibly thicker with each amendment (stacked box-shadows, **capped at 12 layers**). Opening it on page 12 (flip to the 12th page) unlocks `seven-and-half.archivist` if not yet earned. At hand 12-13 every page is stamped `REPEALED` except one (see 4.11).

### 2.9 LEDGER
Collapsible clipboard on the left (mustard ruled paper, **12 lines max**, oldest dropped). Each filed hand adds one line: `H7  YOU 6  DENNIS 22 1/2  FILED`. Header: `Won 0, Lost 0, Pending N` (N = hands filed this match, max 13; `Pending` increments only).

### 2.10 Other interactive bits
- **Dennis's lanyard badge** (a small div): click 7 times in a session to flip it (rotateY) - secret 8.6.
- The wall clock (always 7:30) and the Reaction Meter are decorative; clicking the clock: line from bag `clock`.
- `Proceed Uninitialled`, `<` `>` binder page buttons, Match-end `Begin Match N` is NOT a button (the next match starts by itself).

### 2.11 Layout controls on narrow screens
Under 560 px: stack vertically (wall strip with clock and meter side by side, Dennis, deck + hand, bell/cut row, then a two-tab drawer `Ledger | Binder` full-width). Touch targets >= 44 px. Card width `clamp(48px, 12vw, 84px)`; cards in hand overlap by 40%.

---------------------------------------------------------------------

## 3. Hand state machine

Match = **13 hands**. Hand `h` (2..13) serves Amendment `h-1` (the 12 amendments of section 4). Hand 1 is the plain game.

```
MATCH START -> AMEND (hand >= 2) -> PLAY -> [LOAN] -> REVEAL -> RULING -> FILE -> next hand
hand 13: AMEND(none; All Repealed) -> FINALE -> MATCH START (matches++)
```

Every phase transition increments `phaseId`; **every timer callback created for a phase must check `phaseId === captured && phase === expectedPhase`**; all phase timers are stored and cleared in `endPhase()` (they are `api.setTimeout`, so also cleared on destroy). Typical hand length: 25-40 s.

0. **AMEND** (hand >= 2): `AMENDED` slip arrives from the binder; Management reads the intro line, Sandra's clause is shown (and spoken at `priority 1`, `who:'Sandra'`); player initials or skips; the amendment becomes in force (a flag) and the Rules in force counter updates. Hand 1 has no slip: it is the plain game, and the first joke fires at mount with NO input (welcome line 1 at t=0; lines 2 and 3 follow at ~6 s and ~12 s only if the player has done nothing).
1. **CUT**: not a separate phase; the `C` action is available during PLAY. Under Amendment 2 it is mandatory before the first hit.
2. **PLAY**: the player hits/stands under active amendments. Bust at total >= 8: readout shows `BUST` and the bell flashes; the hand **does not end instantly**: it auto-stands 3.0 s after the last input (each further hit resets that timer; hits after a bust are allowed and each draws a "busting further" quip). Also the PLAY phase hosts the idle ladder and spam logic (7).
3. **LOAN** (only in hands 8-12, once per match, if the player STANDS on exactly 7): offer slip (`Form 7/2`), the half-signature ritual, VICTORY CONFIRMED for exactly 3.0 s, NON-BINDING, half walks back. Then proceeds to REVEAL (4.8 / section 5).
4. **REVEAL**: Dennis's cards flip one at a time (350 ms apart; click or Space/Enter fast-forwards to 80 ms). Dennis drains the rest of the deck (all remaining deck cards, plus any gifted cards, plus copies are NOT his) and shows his honest total, e.g. `24 1/2` (= `28 - yourTotal` + 1/2 when no copies/potato were involved; compute from the actual card values, never from the formula). The HALF is always counted last, with a drumroll (3x `tick` sfx then a tier-dependent sound). Reveal lines/stamps escalate by hand (sections 6.1 and 10.J). The Reaction Meter needle does not move.
5. **RULING**: the Ruling stamp slams (rotated -6..+6 degrees, cheap shake keyframe, `stamp` sfx): drawn from a shuffle bag of 14 stamps (never the same twice in a row), with Sandra's absurd reason (section 10.K). Never "win" or "lose". Awards `+1` for standing, `+2` for the hand filed.
6. **FILE**: the hand's cards shrink into a ledger line (cap 12), ledger says `Won 0, Lost 0, Pending N`. 1.2 s later the next hand begins (hand counter increments, vignette notch per 5 hands filed, capped 12%).

`FINALE` (hand 13) is in section 9.

---------------------------------------------------------------------

## 4. The Amendment Engine (the novelty)

At most **3** amendments are in force at once (`inForce` array of amendment ids). Adding a 4th drops the OLDEST with a repeal joke (bag `repeal`, `{count}` = its number) and a cross-out in the binder. Each amendment is a small object `{id, n, title, apply(), remove()}` toggling a flag; the rest of the code only reads flags (`A.sincerity`, `A.cut`, `A.silence`, `A.movement`, `A.alpha`, `A.gentle`, `A.swapped`, `A.labels`, `A.rounded`, `A.left`). All amendments are cosmetic or fixed-by-hands: none can make winning possible.

### 4.0 `requestHit(source, meta)`: THE single chokepoint
Every hit input (click, drag-drop, hold-complete, keyboard, auto-movement, idle auto-deal) calls this one function. Order of checks:
1. `phase === 'PLAY'` else ignore; debounce: ignore if the same `source` fired < 90 ms ago (guards pointerup+click double-fire, see Risks).
2. Deck empty -> half-slot bounce (and photocopier logic, 7.2). Stop.
3. `A.cut` and no cut done this hand -> deck shows `CUT ME` sticky, shake, line `cutMe`. Stop.
4. `source !== 'movement' && source !== 'idle'`: `A.silence` and no consent token -> shake, line `silenceNeedConsent`. Stop. (Consumes the token on success.)
5. Sincerity: only applies to sources `click/key/touch` (not movement/idle). Holds are handled by the input layer; `requestHit` receives `meta.held >= 0.8*K s` or is refused. A "please" free hit bypasses once per hand.
6. `A.left` and source is a drag: `dir = A.swapped ? +1 : -1`; `dx` against the dir -> card "flops back" (animate 300 ms), line `leftFlop`, no card. A click/key/tap under `A.left`: allowed but "frowned upon" (frown emoji `😞` on the deck for 1.2 s, `-0.2 Meh`, line `leftFrown`).
7. Draw: top of deck (or Gerald/Eighth/copy card, 8). Update hand, Dennis takes one face-down. Gentle check after drawing if source was a drag: `dropSpeed > 900` (px/s) -> slam.
8. Award `+0.3`, `.hits++`, say hit line, check bust, check spam counters.

Routing for Label Exchange: the deck control calls `A.labels && swapped ? requestStand : requestHit`, the bell the opposite; keys `H`/`S` route through the same mapping. `swapped` flips after every successful use (hit or stand) and an `aria-live` message announces "Labels exchanged. HIT is now ...".

### 4.1 Sincerity (Amendment 1, hand 2)
HIT needs a press-and-hold of 0.8 s on the control currently carrying HIT. A ring (conic-gradient or SVG circle) fills around the deck. Release early: the card "refuses" (shake, line `sincerityNo`, no card). Complete: card dealt at the moment the ring fills (when no drag), line `sincerityYes` (rarely). Keyboard: hold `H` or Space. Touch: long press. A bare `click` with no preceding pointerdown/keydown (assistive tech, and the fuzzer) starts an auto-ring of 0.8 s that deals the card when full. Under `api.selftest` the hold is 0.1 s.

### 4.2 The Cut (Amendment 2, hand 3)
One CUT per hand is required before the first hit is accepted. Deck shows a `CUT ME` sticky note until done.

### 4.3 Silence Is Consent (Amendment 3, hand 4)
Before each hit, poke Dennis (click or `D`). A thin `Silence` bar under his pot fills over 1.5 s (0.3 s under selftest) while NOTHING happens; poking again resets it (line `silenceInterrupt`). When full a green tick appears and exactly one card is unlocked (consent token, consumed on use, expires at the end of the hand). Management commentates the wait like a sporting event (line `silenceWait`, said at 0.5 s into the wait). The comedy is waiting on a plant's non-reaction.

### 4.4 Unauthorised Movement (Amendment 4, hand 5)
Pointer speed sampled in `pointermove` (distance/dt between samples) > 700 px/s, evaluated with a 150 ms debounce, deals you a card automatically (`source:'movement'`): max 1 per second, never the HALF, never outside PLAY, never while a slip or the binder is open, never when the deck is empty (then it says `halfSlot`). Keyboard players: any key other than `S`, `H`, `C`, `D`, `T`, `I`, `R`, `O` counts as movement. Touch: any `touchmove` over 12 px/s counts. STAND under this amendment requires **holding still for 2.0 s** (0.4 s under selftest): the bell shows a still-ring; pressing it (or `S`) starts the ring; a qualifying movement resets the ring AND deals a card; ring full -> stand executes. Line `stillness` while it fills. The player discovers that doing nothing is the most skilful move in the game.
- **First conflict (Amendment 1 or 3 together with 4):** the binder gets its first contradiction and Sandra rules "you must do both, politely" (bag `conflict`).

### 4.5 Alphabetised Under Z (Amendment 5, hand 6)
At each hand start under this flag the deck order is the alphabetical order of the number names: `five, four, one, seven, six, three, two` (top = five) and cards show their word under the numeral. Predictable, which feels like a cheat code; the HALF is filed under Z "for zero point five, the only Z". Sandra then comments on the feeling of control (bag `alpha`, said after the second hit of the first hand it is in force).

### 4.6 Gentle Placement (Amendment 6, hand 7)
Drag release speed over 900 px/s is a slam: tiny shockwave ring, `buzz` sfx, a noise-complaint form floats in (a floater, see caps), `-0.5 Meh`, `.slams++`, line `slam`. Placing gently (drag release <= 900 px/s) pays `+0.4 Meh`, counts toward `.gentle` (cumulative stat for the Chancellor achievement); keyboard and tap are automatically gentle (they do not pay the +0.4 and do not count).

### 4.7 Seats Swapped (Amendment 7, hand 8)
The table spins (700 ms; implement as: add a layout class that moves Dennis to the bottom and the hand/deck to the top via flex `order`/`column-reverse`, wrapped in a 700 ms keyframe that rotates the table through 180 degrees with a counter-rotation on text so labels stay legible; reduced motion = 200 ms cross-fade, no rotation). You sit in the pot; Dennis sits in your chair. The drag direction for A.left mirrors. The HALF, "always in the other player's hand", hops across the table on tiny paper legs (the shared `walkHalf()` helper, section 11) to whoever is opposite you. The Reaction Meter flips upside down (CSS class, stays 0.0). Removing the amendment spins the table back.

### 4.8 Label Exchange (Amendment 8, hand 9)
After every use the HIT and STAND labels swap (and the keys H/S follow the label). Announced via the `aria-live` strip. Implementation in 4.0. Cosmetic: `Hit (Pending Review)` suffix from the spam grievance is applied to the HIT label text, not the button.

### 4.9 Rounded for Clarity (Amendment 9, hand 10)
Readout shows the total rounded to the nearest 10 (`YOU: 10`, `YOU: 0`): `Math.round(total/10)*10`. Pure presentation; busts still happen at the true 8 and the BUST banner still appears.

### 4.10 Left-Handed Only (Amendment 10, hand 11)
See 4.0 step 6. `frown` emoji on the deck for taps/keys. Right drags drop the card back with a hurt little flop.

### 4.11 Repeal (Amendment 11, hand 12)
Everything in force is repealed except ONE: **the amendment (1-10) under which the player made the most hits this match** (ties -> 3, Silence Is Consent, then 7, then 1; tracked in an array `hitsUnder[id]`). It becomes the only one in force even if it had dropped off earlier (Sandra "is fond of it"). The binder is stamped `REPEALED` over every page except that one.

### 4.12 All Repealed (Amendment 12, hand 13)
Everything is repealed, including itself. The deck shrinks to "a deck of 2 for stakeholder alignment" (a 7 and the half slot). The screen goes soft and quiet (warm overlay, mix-blend-mode multiply, `rgba(255,170,90,0.12)`, fading in over 20 s, sfx muted for the finale except the fanfare). This is the last hand of Match 1 (section 9).

### 4.13 Safety against soft-locks
If the player makes **no successful hit or stand for 40 s** during PLAY while any gate is in force, Sandra "waives the amendments for this hand" (line `waive`): all gates clear (flags remain listed in the binder but `gateWaived = true`) so a stuck player (mouse-only with Label Exchange + Movement + Silence) always gets out. In `api.selftest` this fires after 8 s. Under Movement, STAND can also complete after the 40 s waiver. This is invisible to normal play.

---------------------------------------------------------------------

## 5. The Half Loan (false victory, hand 8 onward, once per match)

Trigger: in hands 8-12, the player STANDS on exactly 7 and `loanUsed` is false for the match. A stamped offer slides in (line `loanOffer`, Sandra): `Half-Card Lending Policy: complete Form 7/2 (seven signatures and a half) to borrow the half.`
1. **Form 7/2 ritual (~15 s)**: the same Scribbler UI with 7 signature lines and a half line (the half line needs half the path length). Under selftest: 2 signatures + the half line. Progress line `loanProgress` after each. `Proceed Uninitialled` is NOT offered here (the loan is optional: a `Decline the Half` button exists and says the line `loanDecline`, no penalty).
2. **The Lend**: the half walks across the table into your hand (`walkHalf()`). Total reads `7 1/2` (the hand readout flips to gold). Lights, `fanfare` sfx, `api.confetti`, banner `VICTORY CONFIRMED` for **exactly 3 s** (use a managed timer, stop with the banner); `+20 Meh` (single `api.award(20, ...)`, never above 50), `.loans++`. The achievement `seven-and-half.keeper` (secret) unlocks when the banner reaches its full 3 s.
3. **The Void**: Sandra's `NON-BINDING` stamp slams across the banner (strikethrough), the half walks back to Dennis, ruling is `VOID`, line "retroactively and with warmth". The hand continues to REVEAL as a stood-on-7 (the player's total is 7 again). The player may "request the form again" (a `Request Form 7/2` button appears next hand? NO: it is a line only: you may, it does not help; the button is not built).

---------------------------------------------------------------------

## 6. Escalation timeline (target ~8 minutes for Match 1 with hurried play, ~10 with ceremony)

| Time | Hand | Beat |
|---|---|---|
| 0:00-0:30 | 1 | The plain hand. Welcome lines fire with no input. Hit a couple of cards, readout `YOU: 6 (7 1/2 requires a 1/2. See Dennis.)`. Stand. Dennis's cards flip, the HALF last with a drumroll that is slightly too proud. Meter 0.0. |
| 0:30-1:00 | 1-2 | RULING stamp `FILED`; `Won 0, Lost 0, Pending 1`. Slip: Amendment 1 (Sincerity). First tug teaches the elastic snap. |
| 1:00-1:30 | 3 | The Cut. A second tug yields a new line. Meter "recalibrated" (label changes), still 0.0, with pride. |
| 1:30-2:10 | 4 | Silence Is Consent. Management narrates silence like a sporting event. First pacing micro-event: the clock jumps to 7:30 (it was 7:30). |
| 2:10-3:00 | 5 | Unauthorised Movement. Binder's first contradiction. By 3:00 five mechanics met. Reveal stamp `AS FORETOLD` (tier 2). |
| 3:00-4:00 | 6, 7 | Alphabetised Under Z, then Gentle Placement. Meter becomes PREMIUM 0.00. A potato card may appear after hand 4 (callback). |
| 4:00-5:00 | 8 | Seats Swapped. Table spins; the half walks; meter upside down. Half Loan becomes available. |
| 5:00-6:30 | 8-9 | The Half Loan (if the player stands on 7). Label Exchange. From hand 9 Sandra serves two slips (amendment + rider). Stapler cameo at hand 9. |
| 6:30-8:30 | 10-12 | Rounded, Left-Handed, Repeal. Three amendments conflict. Ledger reads `Pending 11`. Sandra amends her own amendments. The player is, by now, weirdly good at this. |
| 8:30-10:00 | 13 | All Repealed. Final Hand "scheduled for Tuesday". Not-ending (section 9). |

### 6.1 Reveal ritual tiers (Running Gag 1: THE HALF REVEAL)
- Hand 1: drumroll (3-4 `tick`s) + a `tada`-style sound that is "slightly too proud"; line from `revealT1`.
- Hands 2-4: tiny fanfare + a stamp `AS FORETOLD` on the half; lines `revealT2`.
- Hands 5-8: miniature parade (two confetti pieces via `api.confetti(x,y,2)`) and a bored `yes`; lines `revealT3`.
- Hands 9-12: Management only mutters `(The half is with Dennis.)`; a sticky note saying `yes` replaces the stamp; lines `revealT4`.
- Hand 13: reveal skipped, "we all know where it is".

### 6.2 Dennis Reaction Meter (Running Gag 2)
Wall gauge, inline SVG semicircle, needle at 0.0. Labels: `DENNIS REACTION (CALIBRATED 2009)` -> after hand 3 `DENNIS REACTION (RECALIBRATED)` (line `meter3`) -> after hand 6 `DENNIS REACTION (PREMIUM)` reading `0.00` (line `meter6`) -> upside down while seats are swapped (line `meter7`). Poking, tugging, gifting, the false victory: it never moves. In the finale the needle ticks to 0.1 and back (a 600 ms CSS transition) and Sandra files it under "draft"; this awards the secret achievement `seven-and-half.leaf`.

### 6.3 Amendment tax and the binder (Running Gag 3)
Slip form by hand: hands 2-3 a polite sticky note; 4-6 a stamped memo; 7-9 a folded form; 10-13 a binder tab. Initials lines per 2.7. By hand 9 two slips at once. Amendments contradict and are resolved with "you must do both, politely". By the end every page is REPEALED but one. Callback: at Match 2 the first slip is the old Amendment 1 returning, dusted and slightly smug.

---------------------------------------------------------------------

## 7. Idle and spam behaviour

### 7.1 Pacing governor (no dead 20 seconds)
`K = api.selftest ? 0.2 : 1`. If the player takes no action for `20K` seconds in any non-REVEAL phase, a **micro-event** from a shuffle bag fires, then every `~20K` s thereafter (never two in a row alike). Bag (lines in 10.V): the wall clock jumps to 7:30 and back to 7:30; a draft rustles Dennis's leaf ("not a reaction"); the deck sighs (deck shakes 1px); the Rules Binder grows a tab (+1 stacked shadow, capped); a `FUN FACT` ribbon runs across the table rim (CSS marquee on a div, removed after 8 s); Management announces a ten-second warning for a deadline that does not exist (a fake `10..1` countdown chip, removed); Sandra stamps something upside down (a floater); a postcard from the Missing Sock (floater); the Toaster offers a half-slice (floater line only). Occasionally (30%) Sandra serves an **interim amendment** (one cosmetic line, bag `interim`, no mechanics).

### 7.2 Spam
- **Hit spam (the Photocopier, Secret 2):** >= 9 deck/H presses (any outcome, including refusals) within 3 s. Sandra wheels in a photocopier (CSS box with a moving light bar); the deck is replaced for 4 s by a single card reading `Please` (the deck is unclickable; presses during it are free 0.5 Meh fee at most once), then refills for the hand with up to 20 **copies** drawn as `5 (copy)` etc. (random value 1-7 via `api.randInt`, CSS blur 0.5px to 2px growing with each copy, grayscale, diagonal `COPY` watermark via `repeating-linear-gradient`), "worth approximately 5". Deck Exhaustion Fee: `-1 Meh` per copy drawn, capped at `-10` per event and never below 0. Copies use their true value in sums. After 20 copies: the copier jams, `OUT OF TONER (7 1/2)` sign, deck empty. `.photocopies++` once per event. `seven-and-half.convention` secret achievement on the first event.
- **At 25 hit presses in 2 s:** the Stapler files a grievance (`buzz` sfx), the HIT label gets the suffix `(Pending Review)` for the rest of the hand (still works).
- **Other-control spam:** >= 14 presses total in 3 s on non-deck controls (poke/tug/cut/bell): a one-per-10 s Over-Enthusiasm Surcharge (`-0.5 Meh`) with line `spamOther`; pokes and tugs still escalate normally. Pokes: 77 lifetime pokes -> the "we should talk" line (`.pokes` stat).

### 7.3 Long idle (Secret 1, THE STILLNESS) - PLAY phase only, measured from the last user input (pointer, key, touch)
- **45 s (`4 s` under selftest):** the deck deals you a card on its own (source `idle`, `+0` Meh, line `idleDeal`).
- **90 s (`8 s` selftest):** the HALF unclips, climbs down on paper legs and sits next to your cards; the readout shows `7 1/2`; a tiny sign appears: `DO NOT MOVE`; line `stillHalf`.
- **If you then stay absolutely still for 20 more seconds (`2 s` selftest) - no pointer movement, key, or touch:** the half stays; achievement `seven-and-half.stillness` (secret, reward 15 via the achievement `reward` field; do NOT also call `award`). The readout stays `7 1/2` until any input.
- **Any input** while the half is out makes it flee: it trips over the felt, runs back to Dennis; line `stillFlee`: "...It will say it did not." The hand then continues normally (the total returns to the real whole number).
- The 90 s ladder and the idle deal reset with every real input. The 20 s micro-events fire independently before 45 s.

### 7.4 Hidden tab / resize / blur
`document.hidden` (via `api.on(document,'visibilitychange')`) pauses nothing important (all timers are managed). On return from hidden for >= 30 s, line `welcomeBack`. Resizing below 560 px during PLAY: line `resizeNarrow` once per session (the table does not fold). Widening past 1200 px shows the 'Reserve' cactus seat (one div, never acts) with line `resizeWide` once.

---------------------------------------------------------------------

## 8. Secrets and rare events

1. **THE STILLNESS** (7.3). Achievement `seven-and-half.stillness`.
2. **THE PHOTOCOPIER** (7.2). Achievement `seven-and-half.convention`. Stat `.photocopies`.
3. **THE PLEASE:** typing `please` (key buffer) makes the HALF straighten in its clip and Dennis's pot rotate exactly 1 degree for 3 s; Management declares politeness "detected and acknowledged and given no further consideration". During a hand with Sincerity in force it grants ONE free sincere hit that hand (bypasses the hold). 3 times in one match: the HALF turns face-down for the rest of the hand "out of modesty" (CSS flip). Meter does not move. Achievement `seven-and-half.please` (secret) on the first detection.
4. **THE EIGHTH CARD** (rare, roughly 1 in 30 hits, never hand 1, never finale, at most once per hand): a blank card `8 (RUMOUR)` with a pulsing question mark and a thin red RUMOUR strip. Value = `max(1, 8 - total)` (so it always busts you to exactly 8+; compute it, never hard-code). If the player stands on it: ruling `INVESTIGATION` and Sandra interviews the 8 for 4 s in a chat bubble ("It was not me. I was in the other deck."); the 8 dissolves and becomes a ghost outline in the ledger. The 8 is removed from the deck for the hand.
5. **THE GIFT** (2.6) at 5 / 10 gifts. The paper crown stays for the session (`api.save`).
6. **THE BADGE:** click Dennis's lanyard badge 7 times in one session: it flips. Back reads `Employee of the Month: every month since 2011` and `Reaction Level: none (approved)`. Line `badge`.
7. **HOVER AND STARE:** pointer resting on Dennis for 7.5 s: his leaf casts a slow shadow toward the player, the table dims 7.5% for a moment, line `stare`. Nothing else happens.
8. **THE CLERICAL ERROR** (rare, 1 in 300 per hit once the session has made >= 7 hits, not in finale): the half is dealt to the player by mistake: the tray shows exactly `7 1/2`, the table goes silent, Management gets 3 s of unrestrained joy with confetti, a fanfare starts; then Sandra enters with a stamp `CORRECTION`; the half flies back (`walkHalf`) and the fanfare is cut mid-note (`api.sfx` has no stop: queue one short note and stop calling). `7.5 Meh` through the achievement reward only. Achievement `seven-and-half.clerical` (secret). Lines `clerical`. The hand then continues with the player's true total.
9. **THE LEAF HAS SPOKEN:** the finale meter tick (6.2 and 9). Achievement `seven-and-half.leaf` (secret).
10. **STAND WITH NO CARDS:** stand with an empty hand: special `Confident. Wrong. Confident.` stamp (`ZERO HANDS PLAYED`) instead of the normal ruling bag; line `standZero`. (No pin or counter.)
11. **MATCH-KEEPING:** `api.save` holds `matches` (matches begun, lifetime) and `crown` (bool). On mount, `matches = saved + 1`; `seven-and-half.matches` stat is `inc`ed per match begun. Match 1 shows the welcome lines; Match 2+ shows the seasoned bag (10.U) and greets by `{player}`.

---------------------------------------------------------------------

## 9. The not-ending (hand 13 FINALE)

1. Hand 13 is announced as `THE FINAL HAND, scheduled for Tuesday` (line `finalAnnounce`). Header reads `Hand 7 1/2`. Amendments all repealed (4.12). Room lights soften toward 7:30 pm (the overlay). The deck is 2 items: a 7 and the reserved half-slot. Management gets sincere and slightly lonely about "the good old amendments" (line `lonely`).
2. The player draws the 7 (hit) and stands. If the player stands without drawing, or idles 25 s (`5 s` selftest), the 7 is dealt on their behalf and they stand "in the interest of the ending" (line `finalAuto`). Tug and poke still work and have lines (staple variants, etc.).
3. Dennis, motionless, slides the HALF across the table to the player by means of a single leaf-and-a-gust-of-draught (the half travels with `walkHalf` and a small wind-swirl CSS animation); the Reaction Meter needle ticks to 0.1 and back; Sandra immediately files it under "draft" (line `meterDraft`); achievement `seven-and-half.leaf`.
4. The player's hand reads `7 1/2`. Confetti (`api.confetti` large), big sustained fanfare (`fanfare` + `tada`), banner `VICTORY CONFIRMED`, `+20 Meh` (`api.award(20)`). Management reads: `You have won. Winning has been removed from the game as of this sentence.`
5. Sandra's stamp `NON-BINDING` strikes the banner. A **Certificate of Victory** prints with a signature line and the note `pending counter-signature of S. from Compliance, who is on a break since 2011`. The Certificate is pinned (`📌`) on the wall next to the clock (still 7:30). Max 3 certificates pinned (older ones removed). The half walks back to Dennis, who has not moved the entire time.
6. The ledger reads `Won 0, Lost 0, Pending 13`. Management says, quietly and sincerely, that this has been the best hand of a long career and that it would be "a privilege to do it again" (lines `finalLoneliness`).
7. **Match 2 begins immediately**: the plain hand again (no amendments), Dennis in his pot, the HALF in its clip, meter 0.0, hand counter back to 1. New thing: Management greets you by name (`{player}`) and says the Match 2 line. In hand 2 of Match 2 the first slip is Amendment 1 returning "dusted and slightly smug" (CSS dust speckle + line `smug1`). `matches` is saved and `.matches++`. There is NO achievement for finishing Match 1.
8. Match 3+: seasoned lines; explanations are skipped (slip shows only the first sentence), initials lines capped at 1, pacing windows 10% shorter, and Management says "Match 3 skips the explanations".

---------------------------------------------------------------------

## 10. LINES (final, verbatim). Bags are shuffle bags: never the same line twice in a row.

Register them with `P.addLines('m:seven-and-half:<bag>', [...])` and speak via `api.sayRandom('m:seven-and-half:<bag>', {mood, who, count})`, or keep inline arrays with a tiny bag helper (a category that is spoken but not filled gives lint warnings). `who` is `'Management'` unless marked `S:` (Sandra, `who:'Sandra'`, said as a quoted memo) or `G:` (Gerald). Most lines are <= 140 chars. Specific facts are final: Dennis (Plant), the clock at 7:30, `Form 7/2`, `Form 7 1/2-H`, `Tuesday`, Rule 7 1/2(b)(iii), 2:14 PM, 2009, 2011.

### A. WELCOME (hand 1, Match 1; played IN ORDER at 0 s, ~6 s, ~12 s; skip the rest when the player acts)
- Welcome to Seven and a Half. Reach exactly 7 1/2 without going over. The 1/2 is with Dennis. Dennis is aware of nothing.
- The deck holds the numbers 1 through 7. The half is also a number. It is simply not in the deck. It is with Dennis.
- Dennis (Plant) will be your opponent. Dennis has been in the building longer than the building has.

### B. FIRST HIT (once per match)
- First card: a {count}. It will be remembered as the first one, which is the only thing it has going for it.

### C. HIT (per card value, used ~60% of the time when the value line is not in the last 3 lines)
- 1: A 1. The smallest whole number. Management respects its commitment to modesty.
- 2: A 2. A tidy 2. It has its coat and everything.
- 3: A 3. It is exactly as many as three. Per policy.
- 4: A 4. A fine 4. Management has no notes on this 4.
- 5: A 5. It sat very still as you drew it, like a card that has been told there will be photographs.
- 6: A 6. Bold. The 6 has been circled on a chart that does not exist.
- 7: A 7. You have reached for the top of the deck and the top of the deck has reached for you. It is fine.
- **Generic HIT bag** (the other ~40%):
- You hit. Dennis did not. Dennis has the half and therefore no need to.
- Another card. The deck says nothing, which is how decks consent.
- You have chosen to hit. The deck has chosen to be a deck.
- The card has been dealt. Management has circled back to it and found it present.
- **Busting further** (hits after a bust, bag `bustMore`):
- You are busting further. Management respects the commitment.
- More cards have joined the bust. It is now a gathering.
- That card went nowhere useful. It has been given a lanyard.

### D. READOUT
- (Spoken once per hand, when the total is 5 or more) You are {count} short of 7 1/2. Management has checked the table for a whole number that fits. There isn't one.
- Nobody has ever held 7 1/2. We checked twice and once with a ruler.
- Totals so far: whole. Totals to come: also whole. Management is not saying anything by this.
- (Static text under the readout, always, from the first card) (7 1/2 requires a 1/2. See Dennis.)

### E. STAND
- You have stood. Standing is a legitimate strategy and also what chairs are for.
- Standing on {count}. Dennis will now take all remaining cards, as is his right and his only move.
- The bell has been rung. The bell is pleased. The bell would like you to know it had no choice.
- You stand on {count}. The table appreciates the posture.
- (`standZero`, stand with no cards) You have stood on nothing. Confident. Wrong. Confident.

### F. SO CLOSE (stand on exactly 7; `+3 Meh`, confetti, `ding` sfx; the missing half is a tiny dotted outline)
- You have 7. Please admire the dotted outline of the missing half. It is very tasteful.
- Standing on 7. This is the closest anyone can be, officially. Sandra is drafting the void.
- Seven. One half short of the only number that matters. Confetti has been authorised and will be revoked.

### G. BUST
- Bust. You went over 7 1/2 by {count}. A bust is simply a hand that has outgrown its container.
- Your cards have been asked to leave the table in an orderly fashion. They are outside, chatting.
- You busted. Dennis did not gloat. Dennis cannot gloat, and has not since he was a seed.
- Bust. Sandra has classified this as 'a lot of 1/2'.
- Over by {count}. The overage has been rounded down to a feeling.

### H. HALF SLOT (`halfSlot`: hit with an empty deck; drop on `HALF GOES HERE`)
- The last slot is RESERVED. The card bounced off it. The slot has been told it was not personal.
- The deck has one slot left. The slot is for the half. The half is with Dennis. The slot is for show.
- There are no more cards. There is a dashed rectangle. It has opinions about being asked.
- HALF GOES HERE. That is a 5. It is not the half. The slot has noticed.
- The slot has rejected your card with courtesy and without reading it.

### I. REVEAL (generic, one per hand) and per-tier half reveal
- Dennis has turned his cards. He has done this without moving. Management cannot explain how.
- Dennis has {count} and a half. Dennis does not react. Dennis is, to be fair, a plant.
- Dennis Reaction Meter: 0.0. Sandra has asked for it to be recalibrated. It has been. It now says 0.0 with pride.
- `revealT1` And there it is. The half. Last card, in Dennis's hand, as is customary. (drumroll, slightly too proud)
- `revealT2` The half. Again. Management is moved in a limited and scheduled way.
- `revealT2` The half. Last, in Dennis's hand. A tiny fanfare has been played by someone who would rather not be named.
- `revealT3` The half has been revealed. A parade was held. It was two pieces of confetti and a yes.
- `revealT3` Two confetti. One yes. The parade has dispersed.
- `revealT4` (The half is with Dennis.)
- `revealT4` (The half is with Dennis. This has been a station announcement.)
- `revealT4` (Half: Dennis.)

### J. RULING (stamp text, then Sandra's reason; bag of 14 stamps, never twice in a row)
- FILED: Ruling: filed. Under 'Hands, Played, Outcome Unrelated To'.
- CARRIED TO TUESDAY: Ruling: carried forward to Tuesday. Tuesday has been notified and is looming.
- ADJOURNED: Ruling: adjourned. Nobody present has the authority to un-adjourn it.
- VOID: Ruling: void, retroactively and with warmth.
- NON-BINDING: Ruling: non-binding. The hand has been asked to consider itself a suggestion.
- FURNITURE: Ruling: furniture. Plants are not eligible. Neither are chairs. The chairs have not complained.
- PRESENT: Ruling: both parties are present. Present is as high as the scale goes.
- NO CONTEST: Ruling: no contest. Dennis was unable to contest, on account of being a plant.
- INCONCLUSIVE: Ruling: inconclusive, with a lean toward 'sure'.
- PENDING SINCE 2:14 PM: Ruling: pending since 2:14 PM. Please enjoy the pending.
- UNDER REVIEW: Ruling: under review by a committee of one. The committee is leaning back in its chair.
- NOTED: Ruling: noted. It has been noted that it was noted.
- CLOSER (UNOFFICIAL): Ruling: you were closer. 'Closer' is not a word Sandra has been issued.
- SMUDGE: Ruling: smudge. Sandra has declared the whole table a smudge and asked everyone to step back from it.
- (INVESTIGATION, Eighth Card only): Ruling: investigation. A card that does not exist has been asked to attend.
- (ZERO HANDS PLAYED, stand-with-no-cards only): Ruling: zero hands played. Sandra has stamped nothing with total confidence.
- After the stamp, Management may say (bag `nobody`):
- Nobody won. Nobody lost. The result is a perfectly round zero.
- The result has been filed. It has been filed under 'Result'. There is no other folder.
- Won 0. Lost 0. Pending is having a very good time.

### K. LEDGER
- Ledger: Won 0, Lost 0, Pending {count}. Pending is having its best quarter.
- Pending {count}. Pending has been promoted to a role it was not interviewed for.
- The ledger has run out of lines. The oldest hand has been asked to retire. It has taken a pen.

### L. TUG / REQUEST FOR HALF (the 20-step chain, in order, `tugs` = 1..20; then the `post20` bag; `{count}` = the tug number as a string)
1. You pulled the half. The half pulled back. It is on a leaf clip rated for 'a lot'.
2. The half has snapped back to Dennis with a tiny ruler sound. Dennis did not react. One leaf did, a bit. That is not a reaction.
3. Please do not touch the half. It has not been told about you.
4. Request for half denied. Reason on file: the half is with the other player.
5. You asked again. The answer is the same size.
6. Request {count} noted. The half is still with Dennis, who is still a plant.
7. Form 7 1/2-H (Request for Half) has been stamped, filed, and handed to Dennis, who is holding the half.
8. We would love to help. We would also love to be on a beach. Neither is currently available.
9. The half has been described to us as 'thriving'. Management has no further detail and has asked for none.
10. Management has asked Dennis on your behalf. Dennis said nothing. This is how Dennis says no.
11. Request {count}. A commemorative rope has been placed around the half. The rope is for show. Dennis has the half.
12. You have asked {count} times. The half has been told. It is on sabbatical, in a clip, in a pot.
13. The half has unionised. It has one demand, and the demand is to stay.
14. A marching band has been rented. It plays one note. The note is regret.
15. Sandra has stamped your request with a stamp that says 'we hear you', which is a different stamp from 'yes'.
16. The half is 'considering a sabbatical from considering'. Management has no update.
17. Request {count}. Dennis has been asked to look up. He looked up in the way a plant looks up, which is always.
18. Please stop tugging. The clip has begun to write a statement.
19. The half has been tugged {count} times and has asked for a moment. It was granted a moment. It was Dennis's.
20. Twenty requests. The half is with Dennis. Management would like to say this is the last time it will say so. It will not be.
- `post20`: Request {count}. The answer is on file. The file is in Dennis.
- `post20`: Still Dennis.
- `post20`: Request {count} acknowledged. A rope has been added to the commemorative rope.
- `staple` (after the Stapler cameo, replaces the chain): The half has been stapled. It did not consent. It did not object. It is a half.
- `staple`: A staple is a very serious kind of clip.
- `staple`: Tugging a stapled half is, technically, a form of filing.
- `safety` (if tugs >= 10 when the Stapler arrives): The staple has been presented as 'a safety measure', following your {count} tugs. Management thanks you for informing the policy.
- `callbackTugs` (Management quoting the player's own count back, once, at tug 7): You have asked 7 times. The half is still with Dennis, who is still a plant.

### M. POKE DENNIS (bag) and GIFT
- You touched Dennis's leaf. Dennis has been touched. He is thriving. The leaf has been logged as 'a leaf'.
- Dennis was poked. The Reaction Meter was checked. It reads 0.0 and looks well rested.
- You told Dennis 'good hand'. Dennis heard it with leaves.
- A leaf moved. Management investigated. It was the air conditioning, which has given its side of the story.
- Dennis has been addressed {count} times. Dennis has been counted. Dennis has noted nothing.
- (at 77 lifetime pokes) Dennis, we should talk. Dennis has no response, as before.
- GIFT: You have offered Dennis a {count}. Dennis accepts the {count}. He did not look up. He cannot look up. It is a quality.
- GIFT: Dennis has been dealt another card. His hand grows. His posture does not.
- GIFT (5 in a match): Dennis has been bribed. Dennis accepted. Dennis is not a changed plant.
- GIFT (10 lifetime): Dennis has been given a very small paper crown. He neither accepted it nor declined it. It stayed.
- GIFT (cumulative 7): Seven cards offered. Seven cards accepted. No thanks were given, in the traditional way.

### N. CUT
- The deck has been cut. The half-slot slid back underneath with a small schloop. It does that.
- Cut. The top half lifted and re-stacked. Management felt something, briefly, in the region of its stapler.
- A fidget, officially filed as a cut. The deck has asked that it not be called a fidget.
- `cutMe` (deck sticky): The deck wants to be cut before it will talk to you.

### O. AMENDMENTS (slip text, `who:'Sandra'`; also the binder pages. Hand h serves Amendment h-1)
1. AMENDMENT 1: Cards must be asked for sincerely. Hold the deck until it believes you.
2. AMENDMENT 2: The deck shall be cut before each hand, by hand, by an adult. The deck has been informed.
3. AMENDMENT 3: Silence is consent. Request permission from Dennis before each card. His silence is on file as a yes.
4. AMENDMENT 4: Any unauthorised movement counts as a hit. This is an amendment about you.
5. AMENDMENT 5: The deck is now alphabetised. The half is filed under Z, for zero point five, the only Z.
6. AMENDMENT 6: Cards must be placed gently. A slam is a noise, a noise is a complaint, a complaint is a form.
7. AMENDMENT 7: Seats are swapped. You are Dennis. Dennis is you. The half, per rule, is with the other player.
8. AMENDMENT 8: HIT and STAND shall exchange labels after each use, in the interest of fairness to the buttons.
9. AMENDMENT 9: Totals are rounded to the nearest 10 for clarity. Your 7 is now a 10. Congratulations on the promotion.
10. AMENDMENT 10: Hits are accepted from the left only. From the right is a different game.
11. AMENDMENT 11: Amendments 1 through 10 are repealed except one, which Sandra is fond of.
12. AMENDMENT 12: All amendments are repealed, including this one. Please re-read in a month.

### P. AMENDMENT INTRO (Management, before the slip, `intro` bag)
- A slip has arrived. It says AMENDED. It is not the first thing to say AMENDED today.
- Sandra has amended the rules between hands. There was no between. There is now.
- Please initial each amendment. Unsigned amendments are still enforced, but with a certain tone.
- A new amendment has been served. It arrived faster than the last one. It will arrive faster next time.
- (hand 9+) Two slips. Sandra is working ahead.

### Q. INITIALS / UNINITIALLED / REPEAL (when the oldest drops) / CONFLICT / INTERIM / RIDER
- `initials` Sandra has initialled your initials. Sandra has initialled over your initials. Hers are bigger.
- `initials` Initialled. Your initials look like a cardiogram that has made peace.
- `initials` Initials accepted. They have been filed in a drawer labelled 'Initials, Miscellaneous'.
- `uninitialled` You have proceeded uninitialled. Noted. Noted, in a font.
- `uninitialled` Uninitialled. The amendment is enforced anyway, with a certain tone. The tone is 'sure'.
- `uninitialled` Sandra has noted the lack of initials and has initialled the lack.
- `repeal` Amendment {count} has been repealed. It is going to spend more time with its clauses.
- `repeal` Amendment {count} dropped off the list. It left a small stain in the shape of a paragraph.
- `repeal` Amendment {count} has retired. A cake was ordered. The cake was an amendment.
- `repeal` Amendment {count} is repealed, retroactively and in spirit. The spirit is Dennis.
- `repeal` Amendment {count} has been repealed by a vote of one. The one is Sandra and she is not available for comment.
- `conflict` Amendment 1 says hold. Amendment 4 says movement is a hit. Sandra rules you must do both, politely.
- `conflict` Amendments conflict. Sandra rules that both apply, and that the conflict is a feature of the amendments.
- `conflict` Two amendments disagree. Sandra has asked them to see the binder.
- `conflict` Hold-to-ask and left-handed and rounded totals are now in force. Sandra says it is a lifestyle.
- `interim` Interim amendment: the word 'card' is now pronounced 'carp'. This is not enforced. It is recorded.
- `interim` Interim amendment: the table may be looked at, but not appreciated, until further notice.
- `interim` Interim amendment: nobody may say '7 1/2' out loud. Too late. It has been said.
- `interim` Interim amendment: cards held at an angle of 7 1/2 degrees. The angle is not enforced. The angle is recorded.
- `interim` Interim amendment: Amendment 10 never happened. Please do not look for it. It is in a drawer.
- `interim` Interim amendment: the colour yellow has been reclassified as a mood.
- `rider` RIDER: The dealer must be thanked. The dealer is the deck. The deck is pleased.
- `rider` RIDER: Sandra may be cited, but not seen. This has always been the case.
- `rider` RIDER: Rule 7 1/2(b)(iii) does not apply to Rule 7 1/2(b)(iii).
- `rider` RIDER: Amendments 1 through 6 are hereby 'noted'.
- `waive` Sandra has waived the amendments for this hand. She has done so in a tone that will be remembered.

### R. AMENDMENT-SPECIFIC REACTIONS
- `sincerityNo` Released early. The deck does not believe you. The deck has been lied to by experts.
- `sincerityNo` The card refused. It wants more eye contact with the ring.
- `sincerityNo` Sincerity not detected. Please try again, but with feeling.
- `sincerityYes` The deck believes you. It does not know why.
- `silenceWait` Waiting for Dennis's silence. 1... 2... still silence. Management has not seen silence this strong since the all-hands.
- `silenceInterrupt` You interrupted his consent. Dennis is non-committal in a way that now needs to start from the top.
- `silenceYes` Consent obtained. Dennis was silent throughout. It is the best silence on file.
- `silenceNeedConsent` The deck has asked whether Dennis agrees. Dennis has not been asked. Please ask Dennis.
- `moveDeal` Unauthorised movement detected. A card has been dealt to you for your trouble.
- `moveDeal` You moved. The deck counted that as a yes.
- `stillness` Hold still. Hold still. This is the hardest move in the game and you are the only person in the world who is doing it.
- `stillnessDone` You have stood still. Management has never been so moved, and has not moved.
- `alpha` The deck is now alphabetised. The next card is five. Management would like to say it feels in control.
- `alpha` You know the next card. It is a rare feeling. Sandra has noticed the feeling and will comment.
- `alphaSandra` S: Control detected. Control has been scheduled for a review.
- `slam` That was a slam. A noise complaint has been filed against a card. The card is unable to respond.
- `gentleYes` Placed gently. The card has written a short letter of thanks. It is one line. It says 'thanks'.
- `seats` You are now the plant. Dennis is now you. Management would like to say it can tell the difference, and is checking.
- `seatsHalf` The half has hopped across the table on tiny paper legs. It did not look back. It has no back.
- `labels` Labels exchanged. HIT is now STAND. STAND is now HIT. The buttons have never been so well informed.
- `labels` Labels swapped. The H key and the S key have also swapped. They were not consulted.
- `rounded` Your total is rounded to the nearest 10. The 1 is now 0. The 7 is now 10. The bust is still real.
- `leftFlop` From the right is a different game. The card has flopped back, hurt.
- `leftFrown` A tap. Frowned upon. The deck has made a face.
- `repealOne` Everything but one has been repealed. The binder has been stamped REPEALED. One page has been spared and is trying not to look smug.
- `allRepealed` All amendments are repealed, including the one that repealed them. Management has a feeling about this and it is not on the agenda.
- `finalAnnounce` THE FINAL HAND, scheduled for Tuesday. It is not Tuesday. It is never currently Tuesday.
- `deckOfTwo` The deck has shrunk to 2 for stakeholder alignment: a 7 and the reserved slot. The room has gone soft.
- `lonely` Management would like to say it misses the good old amendments. Management has said it. Management will now stand there.

### S. METER, STAPLER AND CAMEOS
- `meter3` The Dennis Reaction Meter has been recalibrated. It still reads 0.0. It now reads it with new pride.
- `meter6` The meter is now PREMIUM and reads 0.00. It has two zeroes, and nobody asked for the second.
- `meter7` The meter is upside down. It reads 0.0 upside down. It is the same number from every side, which is the point of Dennis.
- `meterDraft` The needle ticked to 0.1 and back. Sandra has filed it under 'draft'.
- `stapler` The Stapler has been retained by Dennis to staple the half to his hand. The fee is 2 Meh and 'acknowledgement'.
- `stapler` STAPLER, UNION REP: one clack. One staple. The half has not moved. The staple has opinions.
- `tuesday` The final hand has been scheduled for Tuesday. It is not Tuesday. It is never currently Tuesday.
- `gerald` Gerald has been dealt in. Gerald did not ask to be.
- `gerald` G: A potato does not hit. A potato is hit. I hold that this is the whole game.
- `geraldCard` G. (VP SPUDS) is worth a considerable amount, in a way Management would rather not quantify.
- `potato` Potato Card (Unidentified). It is worth 3. Management does not know the potato. The potato knows Management.
- `toast` The 4 has returned from the toaster, lightly toasted. It is a warmer 4. It speaks only in toast.

### T. LOAN
- `loanOffer` S: Half-Card Lending Policy: Dennis may lend the half upon completion of Form 7/2, which has seven signatures and a half.
- `loanProgress` Signature {count} of 7. The half-signature is last, and it is a signature that stopped early on purpose.
- `loanDecline` The loan has been declined. Dennis has taken it well. Dennis takes everything well. It is his whole thing.
- `loanLend` 7 AND A HALF. You have 7 1/2. This has never happened. Please hold the moment. Please do not move.
- `loanVoid` S: NON-BINDING. The loan has been recalled. The half returns to Dennis. It walks away in what has been described as a brisk manner.
- `loanVoid` You have won, technically, under Rule 4(b). Rule 4(b) has been repealed. By you. Just now. By winning.
- `loanVoid` Ruling: void, retroactively and with warmth. You may request the form again. You may. It will not help.

### U. FINALE AND MATCHES
- `finalSlide` Final hand. You have 7. Dennis slides you the half. You have 7 1/2.
- `finalWin` You have won. Winning has been removed from the game as of this sentence.
- `finalCert` S: Certificate of Victory: pending counter-signature of S. from Compliance, who is on a break. The break began in 2011.
- `finalAuto` The 7 has been dealt on your behalf. You have stood on it. Management does this in the interest of the ending.
- `finalLoneliness` This has been the best hand of a long career. Management would consider it a privilege to do it again.
- `finalLoneliness` Dennis did not move the entire time. A single leaf drifted. Sandra says it was a draft. Sandra has filed the draft under 'draft'.
- `match2` We will now begin Match 2. It is identical to Match 1, except that you know things, and this is considered worse.
- `match3` Match {count}. Management will skip the explanations. Nobody has ever missed them.
- `smug1` S: Amendment 1 returns, dusted and slightly smug. It missed you.
- `seasoned` Welcome back, {player}. Management remembers you. Management has a folder.
- `seasoned` Welcome back, {player}. The half is with Dennis. This is the only update.
- `seasoned` Dennis has been here the whole time. He did not ask for credit.
- `seasoned` Match {count}. The deck has been rehearsing. It is no better.

### V. PACING, IDLE, STILLNESS (the micro-event bag and the secret ladder)
- `micro` The clock has jumped to 7:30. It was 7:30. It has jumped back to 7:30 with the same confidence.
- `micro` A draft has rustled Dennis's leaf. This is explicitly not a reaction.
- `micro` The deck has sighed. It is not a complaint. It is a deck being a deck near a person.
- `micro` The Rules Binder has grown a tab. Nobody asked it to. It looks pleased.
- `micro` FUN FACT: A 7 and a 1/2 is a 7 and a 1/2. Dennis has the 1/2. This has been a fun fact.
- `micro` FUN FACT: The longest hand ever played here lasted 14 minutes. It was a hand of waiting for a hand.
- `micro` FUN FACT: Dennis has never lost a hand. Dennis has never been in one.
- `micro` Ten-second warning. For a deadline that does not exist. Management finds it gives everyone a sense of purpose.
- `micro` Sandra has stamped something upside down. It was already filed. It is now filed upside down.
- `micro` A postcard has arrived from the Missing Sock. It says 'Wish you were here'. It is not clear who is meant.
- `micro` The Toaster has offered the table a half-slice. Sandra declined on a technicality: the half is warm.
- `idle45` Nothing has happened for 45 seconds. Dennis has been in this state for years and is flourishing. Learn from Dennis.
- `idleDeal` The deck has taken the initiative and dealt you a {count}. It has been waiting a long time and wanted to help.
- `stillHalf` The half has stepped onto your side of the table. Please do not move. Please do not breathe in a way that moves.
- `stillHold` The half is sitting next to your cards. You hold 7 1/2. It is trembling. Management is trembling. Please remain a statue.
- `stillWin` You have been still for 20 seconds. The half has stayed. It is the most that has ever been asked of anyone.
- `stillFlee` You moved. The half has fled. It tripped on the felt. It will say it did not.
- `welcomeBack` Welcome back. While you were away, Dennis was dealt nothing. He is as he was. Everyone is pleased to be where they were.

### W. SPAM
- `spamHit` That is a lot of cards. The deck is out. Sandra is photocopying more. Please do not look at the copier.
- `spamCopy` Here is a copy of a {count}. It is worth approximately {count} and a bit blurry around the edges.
- `spamFee` Deck Exhaustion Fee: 1 Meh per card. Management is sorry and also invoicing.
- `spamFast` {count} cards in 3 seconds. Dennis has been dealt a smaller hand than this in his whole life as a flower.
- `spamJam` The copier has jammed. OUT OF TONER (7 1/2). Management apologises to the toner.
- `spamPlease` Please. The deck is not a bell and you are not a hotel.
- `spamGrievance` The Stapler has filed a grievance. HIT is now 'Hit (Pending Review)'. It still works. This is for the record.
- `spamOther` Please slow down. The bell is not a doorbell, and Management is not home.
- `spamOther` Over-Enthusiasm Surcharge: 0.5 Meh. The deck has taken it as a tip.

### X. SECRETS
- `please` The word 'please' has been detected. The half has straightened. Nothing has been done about it. This is the compliment.
- `pleaseHit` One sincere hit has been granted, on account of manners. The deck has asked that this not become a habit.
- `please3` Politeness has been detected three times. The half has turned face-down out of modesty. The Reaction Meter does not move.
- `eighth` There is no 8. It has been reported.
- `eighth` 8 (RUMOUR). It is worth whatever you need. You need to stop. It has stopped you.
- `eighthTalk` S: Interviewing the 8. 'It was not me. I was in the other deck.'
- `eighthGone` The 8 has dissolved. A ghost outline remains in the ledger, as a courtesy.
- `badge` It is a very good badge. He wears it well. He has never been seen to wear anything else.
- `stare` Dennis is considering. He was considering a different player. Nobody knows which.
- `clerical` CLERICAL ERROR. The half has been dealt to you. You hold exactly 7 1/2. Management has no procedure for this.
- `clerical` Everyone remain calm. Nobody say '7 1/2' out loud. Too late.
- `clerical` Correction: the half has been returned to Dennis, who was not told it had left. Everyone is pleased to be where they were.
- `resizeNarrow` The table is not that wide. The table has never been that wide.
- `resizeWide` A second seat has been unfolded. It holds a very small cactus labelled 'Reserve'. It will not be playing.
- `clock` The clock says 7:30. It has said 7:30 since the clock was hung. It is very sure.
- `poster` THE HALF IS WITH DENNIS. (wall poster, also the first tooltip)

Builder checklist for text: all lines above are distinct (about 260 lines, including the 12 amendment texts and the 20-step tug chain). The builder may add a few extra variants but must keep these verbatim. `{count}` appears only where shown; always pass a string.

---------------------------------------------------------------------

## 11. Achievements (ids prefixed `seven-and-half.`; declare via `P.addAchievements` in the file; >= 6, 5 secret)

| id | name | desc | icon | secret | reward |
|---|---|---|---|---|---|
| `seven-and-half.first` | Grand Exalted Participant of the Seven and a Half Accord | File your first hand. Dennis did not notice. You are enrolled regardless. | 🃏 | no | 3 |
| `seven-and-half.almost` | Grand Marshal of the Order of the Almost | Stand on exactly 7. The half is not available. Reward: a dotted outline. | 🔔 | no | 5 |
| `seven-and-half.laureate` | Esteemed Laureate of the Seventh and Final Half | Witness the half revealed in Dennis's hand 10 times. The ceremony remains hopeful. | 🌿 | no | 5 (check: `halves >= 10`) |
| `seven-and-half.archivist` | Supreme Archivist of Amendments | Initial 12 amendments, or open the Rules Binder to page 12. Sandra's initials are always larger than yours. | 🧾 | no | 5 (check: `initials >= 12`; also manual on page 12) |
| `seven-and-half.gentle` | Chancellor of Cards Placed Gently | Place 20 cards without a single slam under Gentle Placement. The cards have written a very short letter of thanks. | 📌 | no | 4 (check: `gentle >= 20`) |
| `seven-and-half.request` | Knight Commander of the Request for Half (Form 7 1/2-H) | Request the half 21 times. The half has been informed that it is wanted. It declined. | 📎 | no | 4 (check: `tugs >= 21`) |
| `seven-and-half.gifts` | Plenipotentiary to the Court of Dennis | Offer 7 cards to Dennis. He accepted all 7 and did not say thank you, in the traditional way. | 🌱 | no | 4 (check: `gifts >= 7`) |
| `seven-and-half.keeper` | Hereditary Keeper of the Half (Non-Binding) | SECRET. Complete Form 7/2 and hold 7 1/2 for the full 3 seconds before it is voided. | 🔔 | yes | 10 |
| `seven-and-half.stillness` | Archduke of Absolute Stillness | SECRET. Remain perfectly still and let the half sit beside your hand. You did nothing, and the half noticed. | 🌿 | yes | 15 |
| `seven-and-half.clerical` | The Clerical Error of the Century | SECRET. Receive the half by mistake and hold exactly 7 1/2 for three full seconds. Then give it back. | 🃏 | yes | 7.5 |
| `seven-and-half.leaf` | The Leaf Has Spoken | SECRET. Witness the meter tick to 0.1. It has been filed under 'draft'. | 🌱 | yes | 5 |
| `seven-and-half.convention` | Grand Marshal of the Hitting Convention | SECRET. Make the deck run out. The deck was only holding 7 cards. It has filed a grievance. | 🧾 | yes | 5 |
| `seven-and-half.please` | Most Courteous Petitioner | SECRET. Say please. It was detected. It has been given no further consideration. | 🌿 | yes | 3 |

`check(stats, flags)` functions read the module-prefixed stats (cheap, no side effects). Manual unlock via `api.achieve(id)` for the secrets and `first`, `almost`. Do NOT create an achievement for finishing a match.

---------------------------------------------------------------------

## 12. Meh economy and stats

Rewards: hit +0.3, cut +0.5 (1 payout/hand), initial +0.2, stand +1, hand filed +2, stand on 7 +3, gentle placement +0.4, false victory +20 (once per match), finale +20, never above 50 per action. Fees (all `api.award(-x, reason)`, never below 0): uninitialled -0.2, slam -0.5, left-handed tap -0.2, spam surcharge -0.5, photocopy -1 per copy (cap -10 per event), Stapler fee -2 (one-off per match). Secret/achievement Meh comes ONLY through the achievement `reward` (do not also `award` the same amount).

Stats (all prefixed `seven-and-half.`; stay far under 300 names): `hands`, `hits`, `stands`, `busts`, `sevens`, `halves` (reveals witnessed), `initials`, `pokes`, `tugs`, `cuts`, `slams`, `gentle`, `loans`, `gifts`, `photocopies`, `matches`, `eighths`, `clerical`. `api.stat.inc` at every action; `.max` where useful.

Flags: reads `metGerald` (shared) and the stats `toaster-debate.arguments` / `toaster-debate.slices` (read-only via `api.stat.get`, 0 if unset).

---------------------------------------------------------------------

## 13. Visual design (PALETTE tokens as CSS variables on the module root `.m-seven-and-half-root`, matching the Lobby)

- Cream paper `#FFF6E0` module background with a faint dotted texture (radial-gradient dots, 14px spacing). Ink `#2B2A33` for every 3px outline and all text. Mint felt `#8FD9B6` for the table with a darker rim `#5FB890` and a subtle `repeating-radial-gradient` weave. Coral `#FF8A7A` for card backs and the bell trim. Mustard `#F2C14E` for Sandra's slips and the ledger paper. Lilac `#B8A1E3` for the binder tab and stamps. Sticker shadow: `box-shadow: 4px 4px 0 #2B2A33`. System rounded fonts only (`ui-rounded, system-ui, "Segoe UI", sans-serif` with heavy weights). Text colours meet WCAG AA; on felt use cream text with an ink outline (`text-shadow`).
- **Layout (desktop 700-1100 px):** wall strip on top (poster `THE HALF IS WITH DENNIS` taped crooked, clock fixed at 7:30 with a plaque "states this with confidence", the Reaction Meter inline SVG semicircle with needle at 0.0, the pinned certificates after the finale); header chips: `Hand N`, `Rules in force: N`, `Requests for Half: N`, `Dennis Reaction: 0.0`; below, the felt table: Dennis top centre in a pot (`🌿` ~4x with `filter: drop-shadow`, CSS terracotta pot, CSS lanyard and badge div with `rotateY` back face), leaf clips fanned on an arc, the HALF in a clothes-peg clip (two rectangles and a pin) with a plate under it `HELD BY D. PLANT`; the HALF card is literally half height with a perforated dashed bottom edge and the big `½`; the deck bottom-left of centre (box-shadow stack) with the dashed half-height `LAST CARD: RESERVED` slot beneath; your hand along the bottom (overlap 40% on narrow screens); the `HALF GOES HERE` dashed half-height slot on your side (it rejects every dropped card); bell to the right of the hand; CUT beside the deck; binder tab on the right edge (expands into a panel); ledger clipboard drawer on the left.
- **Cards:** `#FFFDF5` with a 3px ink outline and 10px radius; big heavy rounded numeral, CSS-grid pips (n dots) for 1-7. Subtle perpetual 1.5deg wobble (off under reduced motion). Flip: `transform-style: preserve-3d; rotateY(180deg)` over 280 ms. Toasted 4: brown `linear-gradient` edge shadow. Photocopy: blur + grayscale + diagonal `COPY` watermark. Eighth Card: blank face, pulsing `?`, thin red `RUMOUR` strip. Potato card: `🥔` with a CSS tiny tie, label `G. (VP SPUDS)` if `metGerald`, else `Potato Card (Unidentified)`; value 3.
- **Effects:** elastic half tug (rAF spring, damping 0.82); seat swap 700 ms; slip slides from the binder with translate+rotate keyframes, `AMENDED` stamp scale 2.2 -> 1 with an ink-ring burst; scribble = inline SVG `<path>`, round caps, 300-point cap; ruling stamps rotated -6..+6 deg with a shake; the loan/seat/stillness walk = a card on tiny legs (two CSS rectangles, 2-step walk animation) moving by a CSS transition; "lights soften toward 7:30 pm" = warm overlay fading in over 20 s (and out over 20 s at Match 2); a faint vignette darkens a notch per 5 hands filed, capped 12%.
- **Reduced motion** (`prefers-reduced-motion` and the engine's `.pm-reduce-motion` body class): flips become fades, the seat swap is a cross-fade with no rotation, wobble and sway stop, confetti is a single call with small `n`, the table dims instead of shaking.
- **Aria:** the main narrative strip (Management's latest line, the readout, the ruling) is `aria-live="polite"` and mirrored into a visually-hidden live region (Label Exchange announces here). Every control is a real `<button>` with an `aria-label`.

---------------------------------------------------------------------

## 14. Implementation hints (vanilla JS, single file, <= 1800 lines)

- **Header comment** `/* POINTLESS module: seven-and-half */`, IIFE, `'use strict'`, `const P = window.POINTLESS; const C = 'm-seven-and-half-';` Use `P.injectCSS(css, 'css-seven-and-half')`. Every selector must contain `.m-seven-and-half-`, keyframes prefixed `m-seven-and-half-`. No `@font-face`.
- **Line budget guide** (to stay <= 1800): CSS ~230, line banks ~330 (single-line strings), achievements ~20, state + helpers ~120, hit/stand engine ~220, amendment objects ~260, scribbler ~110, reveal/ruling/ledger ~160, loan/finale ~140, secrets/idle/spam ~140, binder/ledger UI ~90. Do not exceed; write long CSS compactly. If space runs short cut, in this order: Eighth Card, Gerald/toasted-4 cameos, hover-stare, wide-screen cactus, the second (rider) slip.
- **Time factor:** `const K = api.selftest ? 0.2 : 1;` multiply every ceremony/animation/idle duration by `K` (reveal 350 ms/card, slip, ruling, loan, finale) so the 400-step fuzz (steps ~6-40 virtual ms apart, ~10 virtual s total plus a 62 s idle) actually progresses through hands and amendments. Under `api.selftest`: initials 1 line / 40 units; Sincerity hold 0.1 s; silence 0.3 s; still-ring 0.4 s; stillness ladder 4 s / 8 s / +2 s; waiver 8 s; loan 2 signatures + half. Bare clicks without a pointerdown/keydown preceding them (what the fuzzer and assistive tech send) must still progress the game (see 4.1).
- **One state object** `S = {match, hand, phase, phaseId, deck[], hand[], dennisPile[], inForce[], hitsUnder:{}, cutsThisHand, consent, lastInputAt, tugs, pokes, gifts, loanUsed, ...}` and a single `render()` for readout/counters. Avoid scattered DOM mutation; keep element refs in one `R` object.
- **Helpers:** `bag(key)` returns the next line from a shuffle bag built with `api.shuffle` that never repeats the previous line (or just use `api.sayRandom` with the `m:seven-and-half:<bag>` category, which already does). `say(key, opts)` wraps `api.sayRandom`. `later(fn, ms)` = `api.setTimeout(()=>{ if (phaseId===id) fn(); }, ms*K)` capturing `phaseId`. `fmtN` for 7 1/2 formatting. `walkHalf(fromEl, toEl, ms, cb)` is the ONE helper used by the seat swap, the loan, the stillness visit, the clerical error and the finale (a legged card clone animated with CSS transitions between the two elements' current rects).
- **Floaters** (forms, stamps, postcards, noise complaints): `<= 8` on screen; before adding, remove the oldest. Cap ledger 12, binder 13 pages, scribble 300 points per slip, confetti calls small. Rebuild lists instead of appending forever; every fade-out removes the node on `transitionend` or via an `api.setTimeout`.
- **Dragging:** use pointer events on the deck/hand cards with `setPointerCapture` inside try/catch; also support `pointercancel`. Compute `dropSpeed` from the last 3 pointer samples (store `{x,y,t:api.now()}`), not from `event.timeStamp` mixed with `Date`. Never use `Date.now`; use `api.now()`.
- **Keyboard:** register one `api.on(document,'keydown', onKey)`, one `api.on(document,'keyup', onKeyUp)` for the hold keys, one `api.on(root,'pointermove', onMove)` for the Movement detector (cheap math only; throttle to the 150 ms debounce), plus `api.on(window,'resize', onResize)` and `api.on(document,'visibilitychange', onVis)`. No listeners or timers at file load (only in `mount`). `destroy()` is optional because everything is managed, but remove any appended body children (there must be none).
- **Seat swap:** do it with class toggles (`m-seven-and-half-swapped`) and keep `getBoundingClientRect()`-based animation code orientation-agnostic (deck/hand coordinates are recomputed each deal, after the 700 ms transition).
- **Meter and clock** are decorative SVG/CSS. Clock text is always `7:30`.
- **Safe numbers:** `YOU: n` uses `Number.isFinite`; Dennis total sums real card values (including copies' true values) and never `NaN`; `fmtN` falls back to `0`.
- **Accessibility of the Scribbler:** also a `Skip` and the `I` key path; the pad is a `<button>`-wrapped SVG so Tab/Enter works (Enter on the pad adds 45 units).
- **Matches:** `matches = api.save.get('matches', 0) + 1` at mount; `api.save.set('matches', matches)`; `api.stat.inc('seven-and-half.matches')`. `crown` saved on the 10th gift (lifetime counter in save, separate from the match counter).
- **First joke within 10 s:** line A1 at t=0 via `api.say` (priority 1) and the static gags (poster, clock, plate, meter label) are visible immediately.
- Run `node tools/lint.js games/seven-and-half.js`, `node tools/selftest.js seven-and-half`, then with `--real`, and `node tools/shot.js seven-and-half --width 360`.

---------------------------------------------------------------------

## 15. Risks: the 5 most likely implementation bugs

1. **Double-fired and mis-routed hits** (pointerdown/pointerup + click + keyboard Space/Enter native click + drag-release + hold-ring completion all firing `requestHit`; Label Exchange routing HIT to the bell). Cure: ONE chokepoint `requestHit(source, meta)` with a 90 ms per-source debounce, `phase === 'PLAY'` guard, a `handledAt` timestamp so the click that follows a completed hold/drag is swallowed, `keydown` `preventDefault` for Space/Enter on the deck while Sincerity is active, and label routing computed from `swapped` in exactly one `deckAction()/bellAction()` pair.
2. **Stale timers firing in the wrong phase** (reveal timers surviving into the next hand, the 3 s VICTORY CONFIRMED timer, auto-stand after bust, the stillness ladder continuing after STAND, micro-events during REVEAL, Match 2 starting while a certificate animation is running, the rAF spring never stopping). Cure: `phaseId` capture on every callback, `endPhase()` clearing a per-phase timer list, all timers via `api.setTimeout`, the idle ladder reset on every input and only armed in PLAY, and a `matchId` check on finale callbacks.
3. **Amendment gate soft-locks and runaway auto-deals** (Sincerity + Silence + Movement + Label Exchange stacked; Movement dealing cards from every fuzzed `pointermove`, during slips/binder/REVEAL, past the bust, or emptying the deck; Silence token never granted because the Dennis click is also a movement). Cure: gates are evaluated in the fixed order of 4.0, Movement is rate-limited (1/s, 150 ms debounce, PLAY-only, slip/binder closed, deck non-empty), the 40 s waiver (8 s selftest) always clears everything, and every gate has a unit-visible indicator (ring, sticky, bar) so the state is never invisible.
4. **Seat-swap rotation breaking coordinates and legibility** (drag direction and hit-testing under a rotated/ordered table, `walkHalf` aiming at stale rects, counter-rotation missing on some labels, the half walking to the wrong side after a mid-walk swap, text upside down on the narrow layout). Cure: swap via flex-order/class + a short decorative keyframe (not a persistent `rotate(180deg)` on interactive elements), recompute rects after `transitionend` (or 700 ms*K), mirror only the single `dir` constant for A.left, and make `walkHalf` cancel/complete any in-flight walk first.
5. **Unbounded DOM, `NaN` text and leaks** (slips, stamps, floaters, ledger lines, binder pages, copies, scribble points, confetti nodes growing; a total of `undefined` after the Eighth Card/copy/potato; `7 1/2` formatting giving `NaN`; `setPointerCapture` throwing `NotFoundError` in real browsers without an active pointer; amendment objects holding listeners past destroy). Cure: the caps in section 14, `fmtN`/`Number.isFinite` on every displayed number, try/catch around pointer capture, `api.on`/`api.onEvent` only, a remove-on-fade policy for every temporary node, and a final `selftest --steps 600` and `--real` run before handing over.
