# SOCK MATCHER 3000 (id: `sock-matcher`, category: `game`) - FINAL DESIGN BRIEF

Tagline: **"Concentration for people who have lost something. Certificates available."**
Icon: 🧦 (Emoji 10, safe). Tags: `['memory','socks','bureaucracy']`. `unlockCost: 0`. File: `games/sock-matcher.js` (single file, classic script, IIFE, `'use strict'`, **hard cap 1800 lines, aim for <= 1650**, see section 17 for what to drop first if the budget bites). CSS prefix `m-sock-matcher-`, line categories `m:sock-matcher:<name>`, achievements/stats/flags prefixed `sock-matcher.`.

A builder who reads SPEC.md, VOICE.md and this file has everything needed. Where this brief says "verbatim" the text after `- ` to the end of the line is the exact string (the only token ever used is `{count}`; build all other dynamic text in code; never let a raw `%x%` or `{x}` reach the UI).

---------------------------------------------------------------------------------------------------

## 1. CONCEPT

A real memory-match game played with 15 knitted socks in a drawer (a 5x3 grid; 15 is odd on purpose, "a game rule, not a bug"). Every pair flipped prints a **Discrepancy Report** on a receipt slip: five gauges (HUE, PATTERN, CUFF, LENGTH, VIBE) tick or cross with tiny numeric deltas, a rubber stamp slams NO MATCH, and Management reads a verdict. Gauges 1-4 agree for real pairs; **the fifth gauge, VIBE, is always Tuesday** (Running Gag A), so a perfect pair always reads 4/5. About every two to four minutes the engine allows **one true match** (all five gauges tick): Management stages a ceremony that is far too long (Running Gag C), and then the match is **physically revoked by one of nine un-match animations** ("Match revoked. Congratulations remain."). Sock #15, **Kevin**, is a genuine singleton in the bottom-right corner, always mentioned last, never asked (Running Gag B).

Underneath, a quiet, touching saga: **the Missing Sock** sends postcards (8) from the dryer vent, the Lost Property Office (Basement 7 1/2) and a cafe called The Odd Cup. At about minute 8 it comes home, but only if you **hold perfectly still** (the anti-dodge: the winning move is doing nothing). It matches nothing now and is fine with that. At about minute 10 it and Kevin match perfectly, politely decline the Grand Ceremony and leave together. Then fifteen new socks pour in: **SOCK MATCHER 3001 (SEASON 2)**. There is no way to win; the game says so sincerely.

One-line pitch: concentration for people who have lost something and want it back, but would settle for a certificate.

Distinct from the other modules: it is the only one with a card grid and 3D flips, procedural SVG socks, a receipt slip, a tumble dryer, a pin-and-string corkboard and a hold-still-to-attract chase. No dodging buttons, no sliders, no queues of forms.

### What was cut from the pitches (do NOT build)
- Laundry Avalanche (5x6 / 30-card grid). Replaced by a 4-second emoji sock rain and the **Double Ceremony** on the normal 15-card grid (8.5).
- Draggable pins and yarn that follows the pointer (corkboard is click-two-pins, 9.3).
- Pointer-drag ghost for proposals (use the **Propose a Pairing** mode, 8.7).
- Red SVG feud yarn lines (feuds are text on the Resume only).
- Six Policies of the Minute (three only), "hold Shift to flip" and "flip the sock you least want to" policies.
- Static sparks, 30-card grids, "Sock Wellness" bar, the Gap, Recall Notices, Case File, similarity percentage (those were other pitches).
- `D` as the dryer key (conflicts with typing `darn`): the dryer key is **T**.

---------------------------------------------------------------------------------------------------

## 2. CONTROLS

**Mouse:** click a sock to flip. Click-drag around the dryer dial to spin it. Hover a FACE-UP sock (after beat 5) to show its Sock Resume. Buttons: File an Appeal, Sniff (hint only, see below), Propose a Pairing, the dryer dial, Pin it, Skip.
**Touch:** tap to flip; long-press (700 ms) a sock to SNIFF; drag the dial in a circle. All targets >= 44 px on coarse pointers (`@media (pointer:coarse)` is fine here).
**Keyboard (every feature reachable without a mouse):**
- The drawer is a roving-tabindex `role="grid"` of real `<button>`s (`role="gridcell"` is not needed; use `role="grid"` on the container with `aria-label="Sock drawer"` and buttons as children, or simply a `div role="group"`; keep real buttons). Arrow keys move focus (wraps), Home/End first/last, Enter or Space flips. Exactly one card has `tabindex="0"`, the rest `-1`.
- **S** (hold, or tap to toggle) sniffs the focused sock (meter 1.2 s).
- **T** turns the dryer one quarter turn per press (four presses = one full tumble).
- **P** pins the postcard currently on display to the corkboard.
- **Esc** dismisses the current report (flips both socks back at once). During a ceremony Esc does nothing but Management says an `esc` line (once per ceremony, shuffle bag); the Skip button after 8 s is the real exit.
- **Shift+Enter** on a sock marks it as the first half of a Pairing Proposal (beat 8); Enter on another sock completes it.
- **Backspace** "un-flips" a sock: it refuses (`backspace` lines).
- Typing the word **darn** anywhere (no input focused) starts Darning Mode (secret 6).
- The boss key and all Lobby shortcuts are off inside modules; every letter belongs to the module. Ignore key events whose target is an input/textarea (there are none, but be safe).

**Never block a spamming player:** a click or key on a THIRD sock while a report is showing dismisses the report immediately and flips that sock as the new first flip.

All state is reflected in ONE `aria-live="polite"` region (the slip's text summary and the stamp, e.g. `Attempt 5. Four of five gauges agree. NO MATCH.`). Management lines go through `api.say` (the engine announces them). Do not put aria-live anywhere else (no double-announcing).

---------------------------------------------------------------------------------------------------

## 3. SCREEN LAYOUT (all inside `root`; width-flexible 360-1400 px)

Root gets `m-sock-matcher-root`. Because media queries see the window, not the root, a managed `resize` listener (`api.on(window,'resize',...)`) plus one call at mount reads `root.clientWidth` and toggles class `m-sock-matcher-narrow` when < 520 px (3 columns x 5 rows instead of 5 x 3; rows are the same cards, only `grid-template-columns` changes). Also reflect `root.closest('.pm-reduce-motion')` or `matchMedia('(prefers-reduced-motion: reduce)')` (try/catch) into class `m-sock-matcher-rm`.

Top to bottom:
1. **Header strip:** title `SOCK MATCHER 3000(TM)` (becomes `SOCK MATCHER 3001 (SEASON 2)` etc. after the ending, with an animated Season badge) and, at the right on wide screens (below the title on narrow), the **MISSING POSTER** (see 9.4).
2. **Stat strip** (4 chips): `Socks in drawer: 15 (odd)`, `Attempts: n (par 7 1/2)`, `Matches Formerly Held: n`, `Kevin Status: fine` (rotates, 10.3). Chips hold text AND the numbers are also words (no colour-only meaning).
3. **Retired Matches Wall:** a thin strip of up to 7 cream plaques with gold border and a tiny halo (icon of the un-match animation + `Dorothea & Pamela, Formerly`). Oldest drops off. Empty state: a single dashed plaque reading `Matches Formerly Held will be displayed here, Formerly.`
4. **The Drawer (hero):** walnut `#8a5a3b` frame with `#6b4128` rim, cream felt `#fff1d6` lining, the card grid, a lint canvas behind it (optional, section 17 tier 3). Overlay slots inside the drawer, created lazily and reused: spotlight, bunting, idle-dim, whisper bubbles, union picket sign, ending stage, rain.
5. **Discrepancy Report slip** under the drawer (receipt look, zig-zag torn bottom edge via `clip-path: polygon`, monospace). Contains: header `DISCREPANCY REPORT No. <attempt>`, five gauge rows, the stamp, a reason line, a footer line (Kevin last line), a small tag (`SO CLOSE` orange, after beat 3), and the single `aria-live` summary. A `Recent reports` `<ol>` of the last 3 one-line summaries sits under the slip (hard cap 3 `<li>`).
6. **Side panel** (right on wide, below on narrow): Tumble Dryer (appears beat 2), button row (`File an Appeal`, `Propose a Pairing`), Policy of the Minute banner with a countdown ring (beat 5), Corkboard (beat 6), Sock Resume card (beat 5).
7. Conditional: postcard envelope button (inside the drawer's top edge for 12 s at a time), postcard slip (single reused panel), `Skip (Sandra disapproves)` button (ceremony only, after 8 s), progress bar `Ceremony Part 2 of 7`.

### 3.1 Card DOM (important, prevents transform conflicts)
```
button.m-sock-matcher-card [data-sid]        <- FLIP animation (reshuffle) uses THIS element's transform
  div.m-sock-matcher-fx                      <- lift / shrink / walk-off / divorce / dim use THIS transform
    div.m-sock-matcher-inner                 <- 3D flip (rotateY) only
      div.m-sock-matcher-face  (sock SVG + name tag + corner badges)
      div.m-sock-matcher-back  (knitted coral back)
  overlay badges (L, INSIDE OUT sash, red tape, calendar, suitcase) are children of the button
```
Back: coral `#ff6f61` with two layered `repeating-linear-gradient` stitches (45deg and -45deg, 3 px) and a stitched cream border. `perspective` on the grid. Card aspect-ratio 4/5. `backface-visibility:hidden` on face and back. Face-up = `.m-sock-matcher-up` rotates `.inner` 180deg (380 ms; under reduced motion no rotation: swap with an opacity fade, 120 ms).

`aria-label` face-down: `Sock 7, face down`. Face-up: `Sock 7: Dorothea, striped, hue 211`. Names are NEVER present in the DOM text or labels of face-down cards (they would leak the memory game).

---------------------------------------------------------------------------------------------------

## 4. DATA MODEL AND GENERATION

```
sock = { id, name, hue /*0-359.9, one decimal shown*/, pattern /*stripes|dots|zigzag|argyle|check|plain*/,
         cuff /*0-3*/, len /*ankle|crew|knee*/, vibe /*string*/, inside:false, holes /*0|1*/,
         smell /*index into SMELLS*/, hobby, seeking, ref, kevin /*bool*/, feud /*sock id or -1*/ }
```
- `order[]` = array of sock ids = grid positions. **Position belongs to `order`; identity belongs to the card node.** Reshuffle = permute `order` then re-append the nodes (FLIP). Kevin's id is always last in `order` (index 14).
- Names bag per season (all unique): Dorothea, Maurice, Pamela, Raymond, Gwendolyn, Bartholomew, Ines, Colin, Marguerite, Ferdinand, Hortense, Desmond, Philippa, Barnaby, Kevin. In season 2+, the sock currently on the poster (9.4) is replaced by a spare name from `Wilhelmina, Augustin, Tabitha, Cornelius`. Spare names are also used by the WALK-OFF replacement sock (pick one not in use).
- **Pairs:** seven pairs. Base hues = `(k*51 + rand*20) % 360` for k = 0..6 (so different pairs differ by >= ~30 degrees; a false 4/5 between different pairs is impossible). Patterns: shuffle the six patterns, give pairs 1-6 one each and pair 7 a random one. Cuff 0-3 and len random per pair. Twin = copy of the base with `hue + (0.2..0.9) * (random sign)` (so it LOOKS identical while the report shows numbers), **and a different `vibe` string** (vibes: `Monday-ish`, `Tuesday-adjacent`, `a Wednesday mood`, `reserved`, `humming`, `unresolved`, `Thursday, but quiet`, `brisk`; the two socks of a pair always get two different ones). Holes: 3 random non-Kevin socks get `holes:1`. Kevin: hue 160, `plain`, cuff 1, `knee`, vibe `fine`, kevin:true, slightly saggy leg, drawn with a tiny blinking face of two dots; no twin.
- `hobby` (8): `heel-turning`, `standing near radiators`, `being on a washing line`, `quiet competence`, `waiting in a gift box`, `wintering`, `sitting very still in boots`, `humming at 40 degrees`.
- `seeking` (8): `someone who will not use the word 'pair'`, `a drawer with a view`, `a shoe with no opinions`, `a gentle spin cycle`, `a reference that is not a Tuesday`, `a foot of quiet dignity`, `to be asked last, for once`, `nothing in particular, in writing`.
- `ref` (8): `a drawer in Leeds that no longer exists`, `Gerald, who was not asked`, `a laundromat on Floor 7 1/2`, `the foot it last knew`, `a pegboard that vouched`, `a nephew sock`, `an airing cupboard that has since been renovated`, `a dryer, anonymously`.
- Fixed feuds (shown on the Resume if either party is face-up): Dorothea-Maurice and Pamela-Raymond (`feud` lines, section 18).
- **Gauge compare(a,b)** returns 5 rows `{key, label, ok, text}`:
  - HUE: shortest circular difference `dh`; ok if `|dh| <= 1.0`; text `Hue: 211.0 vs 211.4 deg` (always `toFixed(1)` after an `isFinite` check).
  - PATTERN: ok if equal; text `Pattern: stripes vs dots`.
  - CUFF: ok if equal; text `Cuff: 2 vs 2`.
  - LENGTH: ok if equal; text `Length: crew vs crew`.
  - VIBE: ok only if the strings are equal (only true twins, or on a real Tuesday). Text: see 6.3.
  - Result = count of ok rows (0-5). Two socks of a real pair read 4/5 ("near miss"). Random different socks mostly read 0/5-2/5. A true twin reads 5/5.
- A **true twin** (the engine's one allowed match) copies `hue, pattern, cuff, len, vibe, holes` from the first sock onto the second card (name stays).

---------------------------------------------------------------------------------------------------

## 5. STATE MACHINE

One central object: `state` in `idle | first | reporting | ceremony | unmatch | wedding | ending | break | ballet`. A `lockUntil` timestamp is NOT used; every state has explicit entry/exit and every transition cancels the previous state's managed timer ids (keep ids in a `pending[]` array; `cancelPending()` clears them all).

| state | entered when | input handling |
|---|---|---|
| `idle` | start, after reports/ceremonies | click/Enter on a sock -> `first`. |
| `first` | one sock face-up | click the same sock: `selfFlip` line, ignore. Click another: flip, build the report -> `reporting` (swap in the twin first if the pity timer is due, 7.1). |
| `reporting` | second sock flipped | Report prints (6). Click on one of the two face-up socks: ignore. Click/key on a THIRD sock or Esc: `dismissReport(true)` (instant, cancels the flip-back timer, both socks flip down with no animation wait), then if a third sock was clicked, flip it as the new first flip -> `first`. Otherwise after the stamp has been visible 1.8 s both socks flip back -> `idle`. |
| `ceremony` | a true match was flipped | Locked. Sock clicks say a `ceremonyClick` line (priority 0, rate limited 3 s). Esc says `esc`. Skip button appears after 8 s -> jumps to the un-match. |
| `unmatch` | ceremony final line | One un-match animation (8.3) runs, then `finishUnmatch()` -> `idle`. Input ignored (same line). |
| `wedding` | proposal completed (8.7) | Like `ceremony` but ~4 s, forced DIVORCE animation. |
| `ending` | the not-ending sequence (13) | Locked, ignores input except the Skip button after 8 s. |
| `break` | union break (12.2) | Flips disabled; presses fire `unionPress` + `sad` sfx; counted for the extension. |
| `ballet` | 90 s idle (12.1) | Any input scatters it -> `idle`. |

Invariants (the builder must test these): (a) at most 2 socks are ever face-up (except during ceremony/double/ballet/wedding which own the grid); (b) Kevin is never swapped into a twin and never leaves index 14 after a reshuffle; (c) a card swapped into a twin is ALWAYS restored (with its SVG rebuilt) when the un-match finishes or the module is destroyed; (d) a destroy mid-ceremony leaves no timers (managed timers guarantee it) and no DOM outside root.

**Director:** one `api.setInterval(tick, 250)` advances beats from accumulated play time `T` (add `dt` only while the tab is visible; `visibilitychange` via `api.on(document,...)`). All thresholds are multiplied by `TS = api.selftest ? 0.05 : 1`. Report animation timings are multiplied by `RT = api.selftest ? 0.25 : 1`. Never use `Date`/`performance`; use `api.now()`.

---------------------------------------------------------------------------------------------------

## 6. THE DISCREPANCY REPORT

### 6.1 Timeline of one report (all x RT)
1. 0 ms: both socks face-up (380 ms flip). Slip clears and shows `DISCREPANCY REPORT No. n`.
2. From 400 ms: the five gauges animate left to right, one every 280 ms (bars fill with a staggered CSS transition; each row prints `HUE ... tick/cross` plus its text). Gauge order is HUE, PATTERN, CUFF, LENGTH, VIBE (reversed while **dizzy**, 7.2).
3. ~1.9 s: the **stamp slams in** (`stamp` sfx, 180 ms scale 1.8 -> 1.0, 2 px shake of the slip; under reduced motion: no animation, no shake). Text `NO MATCH` plus the reason clause (6.2).
4. Same moment: the aria-live summary updates, one Management line is said (6.4), the footer prints the Kevin-last line (6.5), the Recent reports list gets a one-line summary.
5. Stamp visible 1.8 s -> flip back (380 ms) -> `idle`.
Awards: `api.award(0.1)` per attempt; 4/5 reports award `0.5` instead (near miss); `stat sock-matcher.attempts`, `.flips` (+2), `.near` (4/5 only).

### 6.2 Reasons (stamp clause)
Pick from shuffle bags (never the same twice in a row): 4/5 reads from `stampNear`, 0-3/5 from `stampFar`. After beat 3 (T >= 60 s * TS or attempt >= 12) 40% of draws come from `stampLate` instead. `stampLate` also contains the rare closer ("No technicality...") which may be drawn only after attempt 40.

### 6.3 Running Gag A: the fifth gauge is Tuesday (escalation by attempts and time)
- Stage A0 (attempts 1-5): VIBE row text `Vibe: <vibeA> vs <vibeB>, cross (Tuesday)`.
- A1 (attempt >= 6): also a quiet `tick` sfx when the VIBE cross prints.
- A2 (attempt >= 15): a tiny wall-calendar glyph 📅 beside the VIBE cross.
- A3 (T >= 210 s * TS): VIBE text reads `Tuesday (ongoing)`.
- A4 (after the first Double Ceremony, or T >= 360 s * TS): the gauge label is renamed `VIBE (formerly Tuesday)`.
- **Real Tuesday (secret 5):** VIBE ticks every time, the stamp says `MATCH (does not count, it is Tuesday)`, a tiny `TUESDAY` banner shows (11 lines in section 18). All other systems (pity timer, ceremonies) still run normally.
- Callback: un-match animation 7, the `tuesday` lines, postcard 7.

### 6.4 After-stamp Management line
Priority 0 except where noted. Rotate: normal -> `afterStamp` bag; 4/5 first time ever -> `nearFirst` (priority 1); later 4/5 -> 50% `nearMore`; dizzy -> `dizzy`; milestone attempts 7/25/50/100 -> `milestone` (priority 1); first report of the game -> `firstFlip2` is NOT used (the first-flip line is said at the FIRST flip, 7.0).

### 6.5 Running Gag B: Kevin is mentioned last
Every report's footer prints one `kevinLast` line (shuffle bag), after Kevin's glove reveal it reads `Kevin is a glove.` instead. Kevin is never named in the gauge text.

---------------------------------------------------------------------------------------------------

## 7. MECHANICS AND SIDE FEATURES

### 7.0 First seconds (first joke inside 10 s without input)
- 0.0 s: slip shows `Flip two socks.`; stat strip is populated.
- 1.2 s: Management says `open[0]` (always the first `open` line). At 6 s, if still no flip, say `open[2]`. On the first flip say one `firstFlip` line. The poster appears at the first flip (or at 8 s).
- Mount callbacks (once, 2.6 s, priority 1, only the first that applies): `callback.welcomeBack` if save has `attempts > 0`; else `callback.sockSeen` if `api.flag.get('sockSeen')`; else for season >= 2 `callback.season`.

### 7.1 The pity timer and the one true match
- State: `attemptsSince`, `dueAt`. **First true match** is due at `rand(80..95) s * TS` of play time OR attempt 14, whichever is first. After each ceremony: due at `endTime + rand(110..170) s * TS` or 22 attempts since, never closer than `45 s * TS` to the previous one. Use `api.randInt`. (Under `api.selftest` the first match is due around 4 attempts or 4-5 s.)
- When due, at the SECOND flip of a normal attempt (neither sock is Kevin, not the same card): before the flip animation starts, copy the first sock's fields onto the second card (the true twin), re-render that card's SVG with a NEW unique pattern id, remember `orig` (the second card's previous fields) for restoration, then run the report: 5/5, slip turns **gold**, stamp text `MATCH` (gold), `tada` sfx, ceremony begins. If the first sock IS Kevin, do not fire; wait for the next attempt (stay due).
- Which ceremony kind (decided at trigger time): if `T < 300 s * TS` or the double is already done -> normal ceremony number `c` from the sequence **3, 5, 7, 7 1/2, 11, 11, 11...** parts. Else (first due-time after 5:00) -> the **Double Ceremony** (8.5), which does not advance the normal sequence.

### 7.2 Tumble Dryer (appears beat 2: after attempt 4 or 30 s * TS)
- A round porthole (3 px outline, glass gradient, a sock emoji 🧦 orbiting inside on a CSS rotate) with a circular dial (SVG circle with a notch) as a `<button aria-label="Tumble dryer dial. Press for a quarter turn.">`. Management says `dryerIntro` the first time.
- **Quarter turn** (click, Enter/Space on the dial, or key **T**): dial rotates 90 degrees (CSS), `whoosh`. Every 4th quarter = one **full tumble**.
- **Drag:** `pointerdown` on the dial starts tracking (`setPointerCapture` in try/catch); on `pointermove` compute the pointer angle `atan2(dy, dx)` around the dial centre (skip if the rect is zero-sized or any value is not finite), accumulate the normalised delta (-180..180]; each full 360 degrees accumulated = one full tumble. A full tumble completed in under 333 ms (3 rev/s) also sets **dizzy**.
- **Full tumble:** permute `order` (Kevin stays last: shuffle ids 0..13 only), FLIP-animate (measure, reorder DOM, apply inverse translate, then transition to none 450 ms; reduced motion: snap), `stat sock-matcher.dryer`, Management `dryer` line. A tumble dismisses an open report and is ignored (with `dryer` line anyway) during ceremony/ending. A tumble while one sock is face-up flips it back first.
- **Dizzy:** next 3 reports show the gauges in reversed order and Management uses `dizzy` lines. (Three tumbles within 6 s also sets dizzy.)
- **Over-spin:** 12 full tumbles in a row with no flip in between: `dryerOver` line (once), then every further 4 tumbles `dryerOver2`.
- Dryer sets `Kevin Status` rotation going (10.3).

### 7.3 File an Appeal (appears beat 3: first 4/5 report or 60 s * TS)
- Button `File an Appeal`. If no report has been shown yet say `appeal[2]`. Otherwise it files against the last verdict: shows `Appeal pending (8)` counting down, returns after `8 s * TS` as **DENIED** or **UPHELD (but nothing has changed)** (50/50 via `api.chance(0.5)`, never matters). Result is shown as a small slip below the report and said by Management. Only one appeal pending; pressing again says `appeal[5]`. `+0.2 Meh`, `stat sock-matcher.appeals`.

### 7.4 Sniff
- Hold on a sock (pointer, 700 ms long-press triggers sniff mode and suppresses the click-flip on release) or hold/toggle **S** on the focused sock. A 1.2 s meter fills under the sock; completing prints a one-line smell reading from `sniff` (+0.2 Meh, `stat sock-matcher.sniffs`). Releasing early cancels the reading. First ever sniff says `sniffFirst`. Accumulate held seconds (capped 1.2 per sniff); at **20 cumulative seconds** -> secret 4 (12.4).
- Sniffing is allowed during a report on face-up socks only; face-down sniffs read `smell` too (smell is not identity-revealing: pick the line from `sniff` by `sock.smell`).

### 7.5 Sock Resume and feuds (beat 5, T >= 90 s * TS)
Hover or focus a FACE-UP sock: the Resume card (side panel, reused element) shows `<Name>. Seeking: <seeking>. Hobbies: <hobby>. Reference: <ref>.` plus a feud line if applicable. On touch, a tap on a face-up sock while the report is showing also sets the Resume (long-press stays reserved for sniff). Keep to one reused element.

### 7.6 Policy of the Minute (beat 5, T >= 135 s * TS)
Sandra from Compliance issues a policy (banner with a CSS conic-gradient countdown ring, life 45 s * TS). Then a new one after 10 s * TS. Three policies, each real and checkable on a flip:
- **P1 even seconds:** a flip is permitted only when `floor(api.now()/1000)` is even.
- **P2 column:** the second flip must be in a different column than the first (column = `position % 5`, or `% 3` when narrow).
- **P3 row:** the second flip must be in a different row.
A violation never blocks the flip. It prints a CITATION line under the slip (`CITATION: Policy 11(c). Fine: 0.5 Meh.`), `buzz` sfx, `api.award(-0.5, 'citation')`, `stat sock-matcher.citations`, and a `citation` line (priority 0). At most one citation per 5 s. The policy never changes the slip result.

### 7.7 Matchmaker (beat 8, T >= 390 s * TS): see 8.7.

---------------------------------------------------------------------------------------------------

## 8. CEREMONY, UN-MATCH ANIMATIONS, DOUBLE CEREMONY, WEDDING

### 8.1 The ceremony (Running Gag C: the ceremony never stops growing)
A locked, multi-part script of **10-14 s** (`rand 10..14 * TS`, min 700 ms) with a progress bar labelled `Ceremony Part k of N` and ONE `Skip (Sandra disapproves)` button that appears only after 8 s * TS. Parts S = min(N, 6) narration beats at even intervals, k mapped linearly so the final beat reads `Part N of N` (N = 3, 5, 7, `7 1/2`, 11, 11...).
Visuals: the two socks lift (`.fx` translateY(-8px) scale 1.15, z-index), a CSS spotlight cone (radial-gradient overlay on the drawer, pointer-events none), confetti (`api.confetti` at start and at the final part), bunting of 24 tiny SVG sock pennants across the top (created at start, removed at end; never accumulates).
Script:
1. Start: `ceremonyStart` line (priority 1), `fanfare`.
2. Each beat: `Part <k> of <N>, <title>. <blurb>` from `ceremonyPart` (part 1 is always The Anthem, then The Reading of the Thread Count, then The Exchange of Lint, then the rest shuffled; the last beat is always The Vow). Priority 1.
3. Officiant (once, at beat 2 of ceremony #2, else at the wedding): if `api.flag.get('metGerald')` Gerald says the `gerald` line (`who:'Gerald'`, one line only); else Management says the `veil` line.
4. Toaster callback (once per session, only if `api.stat.get('toaster-debate.entered') > 0`): at a middle beat say the `toaster` line and attach a small 🍞 badge to Kevin's card for the rest of the session (Kevin is, for the first time, not alone).
5. A click on a sock during the ceremony: `ceremonyClick` (rate limited).
6. Final beat -> un-match (8.3). **Award:** at the un-match, `api.award(7.5,'ceremony')`; 1.5 s later `api.award(-7,'restocking fee')` and say `restocking` (net +0.5). `stat sock-matcher.ceremonies`.

### 8.2 After the un-match
`finishUnmatch()`: restore any swapped card (8.4 invariant c), clear overlays/bunting, flip the cards down (instant if the animation hid them), counter `Matches Formerly Held: n` ticks up (say `formerly` line), the pair is pinned on the Retired Matches Wall (icon + `Formerly`, max 7), set `attemptsSince = 0`, set the next `dueAt`, state `idle`, add 7.5 to the poster reward (cosmetic).

### 8.3 The nine un-match animations (shuffle bag of 9; **the first ever is always INSIDE-OUT**; never repeat until all nine have been used; each is physical, not just text)
Each runs on the two lifted cards (A = first, B = second) for ~2.5-3.5 s (x RT), announced by its `unmatch` line (priority 1), then ends with the shared line `Match revoked. Congratulations remain.` (verbatim, `unmatchEnd`, delivered with unchanged enthusiasm) and the final stamp `UN-MATCHED` over the slip. Wall icon in brackets.
1. **INSIDE-OUT** (🙃): B's sock SVG is mirrored (`scaleX(-1)`) and dimmed (`filter: brightness(.6)`) and an `INSIDE OUT` sash (rotated ribbon badge) wraps it.
2. **WALK-OFF** (🚶): B slides off the drawer edge (CSS translate + a rotate wobble keyframe), the card node is removed, a replacement node with a different spare name pops up in the same position (scale 0 -> 1), keeping B's original fields. If B had focus, move focus (and tabindex 0) to the replacement.
3. **MITTEN** (🧤): B cross-fades from its sock SVG to the 🧤 emoji (opacity swap 600 ms); Management asks the mitten questions; restored at the end.
4. **LEFT-LEFT** (🦶): both cards get a big `L` badge.
5. **AUDIT** (📋): a red-tape strip (`repeating-linear-gradient(-45deg,#d63b3b 0 10px,#fff1d6 10px 20px)`) wraps both; they return separated (flip down in different order) and a tiny receipt line prints.
6. **SHRINK** (🤏): B's `.fx` scales 1.0 -> 0.4 over 3 s (restored to 1 at the end, instantly).
7. **TUESDAY** (📅): a tiny wall-calendar badge slaps onto the pair with `NEVER VALID ON TUESDAYS`.
8. **DIVORCE** (📄): the two cards slide apart to opposite corners of the drawer (measure rects, translate by the delta to the grid's top-left and bottom-right corners, 1.2 s), a tiny 📄 flies between them; for one frame before parting the cards nudge toward each other (the hand-holding frame); then they return.
9. **KEVIN** (🧦): both cards swap their face to Kevin's SVG (a second copy with new pattern ids) and a `Kevin` name tag; restored at the end.
Reduced motion: every animation becomes an instant class swap with the same text and the same total duration.

### 8.4 Restoration (invariant c)
Keep `orig` per swapped card. `finishUnmatch` and `destroy` restore it and rebuild the SVG (new unique pattern id every rebuild). WALK-OFF's replacement keeps B's `orig` fields and a different name.

### 8.5 THE DOUBLE CEREMONY (beat 7: first ceremony due after T >= 300 s * TS; the loud, silly peak)
- Visual: a 4 s emoji rain (🧦 elements falling in a overlay, max 12 nodes, CSS keyframes; reduced motion: none) and a banner `LAUNDRY DAY`. Management says `laundry` line.
- Engine: besides the flipped pair (A,B twin), pick two other face-down non-Kevin socks C,D and make D a twin of C (same restoration rule; both swaps recorded). They flip themselves face-up (the "second pair is matched by the engine"). Four socks lifted.
- Report: 5/5, gold slip. Ceremony labels **count backwards by mistake**: `Part 4 of 11`, `Part 3 of 11`, `Part 2 of 11`, `Part 1 of 11`, `Part 0 of 11`, then Management says the `doubleLost` line. 10-14 s.
- Un-match: TWO different animations from the bag at once (A+B and C+D). Counters +2, plaques +2, one `+7.5` and one `-7`, wall icons per animation. Sets the gauge label to `VIBE (formerly Tuesday)` (A4).

### 8.6 Ceremony skip rules
Skip appears after 8 s * TS. Pressing it jumps straight to the un-match (the un-match still plays). Skipping never skips the award. Esc never skips (see Controls).

### 8.7 Matchmaker: Pairing Proposals (beat 8, unlocked at T >= 390 s * TS; button `Propose a Pairing`)
- Entering the mode (button toggles it, or Shift+Enter on a sock marks the first half) puts a coral `PROPOSAL MODE` pill on the drawer; clicks/Enter on socks then SELECT instead of flipping (outline ring, selection shown, not flipped). Esc or pressing the button again cancels.
- Two different socks selected -> state `wedding` (flips them face-up, lifts them): three lines over ~4 s * RT: officiant (`veil` or `gerald`, once per session), vows (`wedding` line), exchange of lint (`wedding` line). Then the forced **DIVORCE** animation (8.3 no. 8), `finishUnmatch` (counts as Matches Formerly Held, wall plaque with icon 💍 and `Formerly`). `api.award(0.5,'wedding fee')`, no -7 fee. `stat sock-matcher.ceremonies` does NOT increase.
- Mode off after one proposal. During any report/ceremony the button is disabled.

---------------------------------------------------------------------------------------------------

## 9. POSTCARDS, CORKBOARD, POSTER

### 9.1 Postcard schedule (beat 6, first at T >= 180 s * TS)
A cream envelope button (✉️, `aria-label="Postcard from the Missing Sock"`) drifts across the top edge of the drawer (CSS translate, slow) for 12 s * TS every `rand(45..55) s * TS`, at most one on screen, and not during ceremonies/ending/ballet/break (it waits). Missed envelope: `postcardMissed` line; the same card is re-offered next slot (postcard k only advances when READ). 8 postcards per season in order; reading card 7 starts the Missing Sock chase (10). Card 8 arrives only in the not-ending (13, `postcard 8`). Clicking the envelope opens the postcard slip (reused panel, `m-sock-matcher-pc`): season-1 handwriting uses a cursive font stack (`'Segoe Script','Bradley Hand','Comic Sans MS',cursive`), season 2 an italic serif, season 3 monospace, cycling. `stat sock-matcher.postcards` +1 and `api.award(1,'postcard')` on first read. Say `postcardArrive` when the envelope appears.
Postmarks (place, time): 1 `Dryer Vent 3, 3:14 AM`; 2 `Lost Property Office, Basement 7 1/2, 4:17 PM`; 3 `The Odd Cup (cafe), 9:02 AM`; 4 `Accordion Society, Floor 3, 7:30 PM`; 5 `Floor 7 1/2, 1:00 PM` (if `api.stat.get('elevator-simulator.entered') > 0`, else `Floor 7 1/2 (location disputed), 1:00 PM`; when the first is used, also say the `elevator` line); 6 `Inside a Drawer, Unspecified`; 7 `On a Train, Probably Tuesday`; 8 `The Odd Cup (cafe), Booth 2`. The stamp on each is a picture of a smaller stamp.

### 9.2 Pinning
Press **P** or the `Pin it` button on the postcard slip: the card is pinned to the next free pin on the corkboard (up to 8 per season), `pin` line. Pinning is optional but needed for the achievement. Save pinned indices per season.

### 9.3 Corkboard (beat 6, appears with the first pin)
A cork-coloured (`#c89a62`) panel with a radial-gradient dot noise. Eight pin slots arranged 4x2 as real `<button class="m-sock-matcher-pin">` absolutely positioned at fixed percentages over an inline SVG (viewBox `0 0 100 50`, preserveAspectRatio none). Each filled pin shows a tiny postcard thumbnail number and, on click/Enter, reopens that postcard in the slip. **Connect pins:** click a pin (selected ring), click another: an SVG `<path>` (quadratic curve with downward droop, red `#d63b3b`, 1.2 stroke) is added between them (cap 12 paths; the oldest is dropped), `yarn` line. Pure UI, nothing changes.

### 9.4 Missing Poster (beat 1, top-right)
`HAVE YOU SEEN THIS SOCK?`, a dashed-outline sock silhouette, a crooked tape strip, `Reward: 7 1/2 Meh`. Reward text rises by 7 1/2 per ceremony finished, per postcard read and per season (`7 1/2`, `15`, `22 1/2`, `30`, ... format whole numbers as `N Meh` and halves as `N 1/2 Meh`). Season 1 silhouette is unnamed; season 2 caption `Colin`, season 3 `Hortense`, season 4 `Desmond`, then repeat. Cosmetic. Management says `poster` once.

---------------------------------------------------------------------------------------------------

## 10. THE MISSING SOCK (beat 9) AND THE KEVIN STATUS STRIP

### 10.1 The hold-still chase (the anti-dodge)
Starts when postcard 7 is read AND `T >= 480 s * TS` (if the player is never still, a fallback fires at `T >= 840 s * TS` with the `chaseForced` line so the arc cannot be missed forever). A translucent lilac card (60% opacity, dashed outline, tiny 🧳 suitcase sticker) lives in ONE reused overlay element at the drawer edge. Track real input with `api.on(root,'pointermove'|'pointerdown'|'keydown'|'touchstart')` and `api.on(document,'keydown')`; keep `lastMove`. A pointer move counts as movement only if the speed is >= 6 px/s: compute `speed = dist / max(dt, 16)` (never divide by 0). A `stillMs` accumulator grows while the tab is visible, state is `idle`, and no key/pointer motion happened; ANY real movement above the threshold or any key resets `stillMs` to 0 and (if the sock is visible and not arrived) makes it **flee** (one `flee` line, rate limited, three flees = `fleeMany`).
- `stillMs >= 3 s * TS`: it peeks (slides 25% in) + `chasePeek`.
- `>= 6 s * TS`: it walks halfway + `chaseHalf`.
- `>= 9 s * TS`: it sits in the drawer, four quiet music-box notes (`bell` x4, 500 ms apart), `chaseArrive`.
- Click it: it has changed (a different hue, a faded cuff, a tiny suitcase sticker). It matches nothing. The sock speaks (`missingSpeak`), Management's voice cracks (`cracks`), then the `respect` line. `api.award(5,'a sock came home')`, `api.achieve('sock-matcher.home')`, `api.flag.set('sock-matcher.home', true)`, `api.save.set` season progress. It stays in the drawer as a decorative overlay seat until the ending.
- Fuzz-safety: under `api.selftest` all thresholds are 0.05x; synthetic events must never throw; guard every `getBoundingClientRect`/speed value with `isFinite`.

### 10.2 Dim and ballet interplay
The chase pauses (and resets `stillMs`) during `break`, `ballet`, ceremonies and the ending.

### 10.3 Kevin Status strip
Starts rotating after beat 2 (every 20 s * TS): `Kevin Status: fine`, `Kevin Status: still fine`, `Kevin Status: has stopped saying fine`, `Kevin Status: waving (it was a draft)`. After the glove secret: `Kevin Status: glove (self-reported)` permanently (saved).

---------------------------------------------------------------------------------------------------

## 11. ESCALATION TIMELINE (the director's beat table)

Thresholds are the earlier of the time and the attempt count, in play time T (visible time). The first ten minutes arc: normal -> weird -> bureaucratically unhinged -> touching -> back to normal.

| beat | at | what changes |
|---|---|---|
| 1 THE DRAWER | 0:00 | 15 face-down socks; opening line at 1.2 s; first flip prints the report; poster appears with reward 7 1/2. |
| 2 THE TUMBLE DRYER | attempt 4 or 0:30 | dryer slides in; Kevin Status starts rotating; Kevin keeps landing bottom-right. |
| 3 NEAR MISS WING AND APPEALS | first 4/5 or 1:00 | `SO CLOSE` tag, Near counter, `File an Appeal`, reasons get ridiculous (`stampLate`). |
| 4 THE FIRST TRUE MATCH | 1:20-1:35 or attempt 14 | ceremony 1 (Part 1 of 3), first un-match is always INSIDE-OUT, plaque 1, net +0.5 Meh. |
| 5 RESUMES AND POLICIES | 1:30 (resumes), 2:15 (policy) | hover Resume; Sandra's Policy of the Minute; citations. |
| 6 POSTCARDS AND THE CORKBOARD | 3:00 | envelopes every 45-55 s, corkboard on first pin, ceremony 2 (Part 1 of 5) with the officiant. |
| 7 LAUNDRY DAY | 5:00 | first ceremony due after this is the Double Ceremony (parts count backwards); `Tuesday (ongoing)` already live; `VIBE (formerly Tuesday)`. |
| 8 THE MATCHMAKER | 6:30 | `Propose a Pairing`, weddings, divorces, plaques fill. |
| 9 THE MISSING SOCK | 8:00 (postcard 7 read) | hold-still chase; it comes home; music box. |
| 10 THE NOT-ENDING | home + 40 s (about 9:30-10:00) | Kevin and the Missing Sock; Season 2 (section 13). |

After beat 10 everything continues forever: ceremonies keep growing (11 parts), postcards restart from 1, the chase returns, and each season ends the same way.

---------------------------------------------------------------------------------------------------

## 12. IDLE, SPAM AND SECRETS

Detect **real input only** (`api.on` on `root` for `pointerdown`/`pointermove`/`touchstart`/`keydown`, and on `document` for `keydown`). A `pointermove` counts only if it moved >= 20 px since the last counted position (this is the ballet scatter rule). Hidden tab: pause idle accounting; on return after > 30 s of hiding say `away`. Thresholds below are x TS in selftest (the engine's 62 s virtual idle window must trigger the ballet in a selftest run).

### 12.1 SECRET 1: Sock Ballet (long idle)
- **45 s idle:** the drawer dims (a CSS overlay at 55% opacity, `pointer-events:none`), 1-3 whisper speech bubbles (max 3 in DOM, each 2.5 s) appear above random socks with `whisper` text (face-down socks too; whisper text never reveals identity). Say `idle45`.
- **90 s idle:** state `ballet`: every sock flips quietly face-up, the nodes are visually reordered by CSS `order` so each pair sits adjacent (pair k at slots 2k, 2k+1) with Kevin alone and nervous at slot 15, in total silence except four quiet `bell` notes (500 ms apart). Say `idle90` (priority 1). Do NOT change DOM order for this (CSS `order` only, removed on scatter).
- **Any input** (click, key, touch, a pointer move > 20 px) scatters them: socks flip down, `order` cleared, say `balletBroken`. No achievement.
- If the player stays still for **7 1/2 s * TS more** after `idle90`, the pairs hold for a very quiet verse (`balletVerse`) and `sock-matcher.ballet` unlocks (`api.award(10)`); then they politely resume normal state without a scatter line.

### 12.2 SECRET 2 / SPAM: The Union Break
- Ring buffer of the last 12 accepted-or-attempted flip timestamps. **12 within 3 s** -> `break` for `15 s * TS`: all socks slump (CSS rotate + saturate), a small picket sign pops from the drawer edge reading `ON BREAK: 15 MIN (15 SEC)`, the **Sock Steward** (an SVG sock in a hard hat) reads `steward` demands (3 `negotiation` lines, one at a time) and a clipboard slip prints `Negotiation Notes`. Flips are disabled; the card buttons stay focusable, each press fires `unionPress` (rate limited 1.5 s) and a `sad` sfx. `api.achieve('sock-matcher.union')`, `api.award(-0.5,'agitation fee')` once.
- If the player spams again during the break (12 more presses within 3 s), extend by `7.5 s * TS` and say `unionExtend` (max 3 extensions).
- Break over: `unionEnd`, socks restore.

### 12.3 SECRET 3: Kevin is a glove
Click Kevin **7 times** (any speed, any order, any attempt; counts `stat sock-matcher.kevinclicks`, progress lines at 3 and 5) and then **Shift+click him once**. His card turns to the 🧤 emoji (the same emoji as the mitten morph, Emoji 10), the slip prints `Kevin is a glove` in a calm hush (`gloveReveal` + `glovePraise`), `Kevin Status` becomes `glove (self-reported)` permanently and the Kevin-last footer reads `Kevin is a glove.` `api.achieve('sock-matcher.kevin')`. On touch where Shift is unavailable, a long-press on Kevin after 7 clicks also counts as the half. Save `kevinGlove`.

### 12.4 SECRET 4: The Long Sniff (faint)
Cumulative 20 s of sniffing in a session: the screen blurs (`filter: blur(3px)` on the drawer, 4 s), the grid goes soft-focus, a three-line DREAM plays (`dream` lines, 2.2 s apart): the Missing Sock waves from a very long escalator; Management wakes you with `wake`. `api.achieve('sock-matcher.faint')`, no Meh docked.

### 12.5 SECRET 5: Tuesday Mode
Read the weekday ONCE on mount: `new Date().getDay() === 2` (add `// lint-ignore` on that line). If true: every pair reads 5/5, the stamp reads `MATCH (does not count, it is Tuesday)`, a `TUESDAY` banner shows (`tuesday` lines), `api.achieve('sock-matcher.tuesday')` on the first such report. Ceremonies still follow the pity timer; non-pair attempts read normally except VIBE ticks.

### 12.6 SECRET 6: Type darn (Darning Mode)
Keep a rolling buffer of the last 4 letters typed with no input focused. On `darn`: Management says `darn` (priority 1), a `Darning mode` pill with a 🧵 appears for 60 s * TS (or until typed again), the pointer shows `cursor:crosshair` and holed socks get a pulsing dotted ring. Click a sock with `holes:1` (it must be face-up OR the click flips it as normal; if face-up, darn it) -> a CSS stitch animation (a dashed circle draws in), `holes = 0`, `api.award(0.1,'darning')`, `darnDone` line, `stat` not needed (use `api.save` count). After 5 darns `api.achieve('sock-matcher.darn')`. Darning never changes gauge results.

### 12.7 Other rare events
- Resize (debounced, once per 20 s) says `resize`.
- Hidden tab > 30 s says `away` on return.
- The first 4/5 ever, first sniff, first appeal, first citation, first dryer: each has a one-time line.
- Cross-module callbacks (all in sections 8.1, 9.1 and 7.0): Gerald (`metGerald`), the Toaster (`toaster-debate.entered > 0`), the elevator (`elevator-simulator.entered > 0`), the shared cast flag `sockSeen` (greeting), `api.flag.set('sock-matcher.home', true)` for others to read. Sandra is only ever cited.

---------------------------------------------------------------------------------------------------

## 13. THE NOT-ENDING (beat 10, about 9:30-10:00)

Trigger: the Missing Sock is home (10.1) AND `40 s * TS` have passed with state `idle` (or immediately after the next idle moment).
1. State `ending`. The drawer dims; a centred **stage** overlay (reused element) shows the Missing Sock and Kevin side by side (two sock SVGs, not the grid cards, so no card has to move).
2. `ending1`, then `ending2`. The slip prints **five ticks in a row, VIBE included, for the very first time**; the slip turns gold; stamp `MATCH`; `tada`.
3. Management begins THE GRAND CEREMONY: `ending3` (`Part 1 of 15`). Before the Anthem finishes both socks show a sock-shaped speech bubble each: `If it is alright, we would like to skip the ceremony.` (verbatim, in unison). `ending4` (Management insists). They leave anyway, together, side by side, off the edge of the drawer (walk-off, a suitcase sticker on the Missing Sock), `ending5`.
4. The drawer goes quiet for 3 s * TS. `ending6`, then `ending7` (in the voice of someone talking to a closing door), then `ending8`. `api.award(7.5,'reunion')`, 1.5 s later `api.award(-7,'restocking fee')` and say `ending9`.
5. Fifteen brand-new socks pour into the drawer (cards re-created from a new generation, drop-in animation staggered 60 ms each; reduced motion: instant). Title becomes `SOCK MATCHER 3001 (SEASON 2)` (`3000 + season - 1`), the Season badge animates, the poster shows the next silhouette name, the reward rises 7 1/2, postcards restart from 1 with a different handwriting. Say `ending10`, `ending11`. The final stamp on the slip reads **`MATCH (it was never about the matching)`**. Say the `ending12` line sincerely: no way to win.
6. Achievements: `sock-matcher.season2` (+25 Meh), cumulative counts keep. Save: `season`, plaques, formerly, sock names seen, ceremony count, kevinGlove.
7. Everything carries on exactly as before. The next season's chase and not-ending repeat the same sequence. Title for season >= 2: `'SOCK MATCHER ' + (3000 + season - 1) + ' (SEASON ' + season + ')'` (season 2 = 3001, season 3 = 3002).

---------------------------------------------------------------------------------------------------

## 14. ECONOMY, STATS, SAVE

Award table (all tiny, all meaningless): attempt +0.1; near miss +0.5; appeal +0.2; sniff +0.2; postcard +1; darn +0.1; citation -0.5; wedding +0.5; ceremony +7.5 then -7 restocking fee; home +5; reunion +7.5 then -7; ballet +10; union -0.5 once; achievements per section 15.
Stats (exactly these 10): `sock-matcher.flips`, `.attempts`, `.near`, `.ceremonies`, `.postcards`, `.citations`, `.dryer`, `.sniffs`, `.kevinclicks`, `.appeals`. Never write the engine-protected suffixes `.entered .seconds .meh`.
Flags: `sock-matcher.home`, `sock-matcher.gloveKevin`. Shared flag `sockSeen` may be read (and set once when the Missing Sock first speaks, with `// lint-ignore shared cast flag`).
`api.save` (JSON only, small): `{season, attempts, formerly, plaques:[{icon,names}] (<=7), pcRead, pinned:[idx] (<=8), poster, namesSeen:[...] (<=40), ceremonies, kevinGlove, darned, sniffSec}`. Save at: after each ceremony, each postcard read, each season change, the glove secret, and in `destroy`.

---------------------------------------------------------------------------------------------------

## 15. ACHIEVEMENTS (all ids prefixed `sock-matcher.`; >= 6 with >= 2 secret: we ship 13 with 6 secret)

| id | name | desc | icon | secret | reward | how |
|---|---|---|---|---|---|---|
| `sock-matcher.first` | Knight Commander of the Unfolded Drawer, First Class | Flip your very first sock. It is awarded with great ceremony and no sense of occasion. | 🧦 | no | 1 | first flip |
| `sock-matcher.near` | Laureate of the Almost-Pair, With Distinction in Slightly Off | Receive 25 near-miss verdicts (four of five gauges). The fifth gauge sends its regards. | 🎖️ | no | 5 | `check`: `stat sock-matcher.near >= 25` |
| `sock-matcher.ceremony` | Grand Marshal of Prematurely Concluded Unions | Witness a true match, a full ceremony and its immediate revocation. Congratulations remain. | 🏅 | no | 5 | first `finishUnmatch` of a ceremony |
| `sock-matcher.appeal` | Counsel for the Socks, Pro Bono, Pro Nothing | File 10 appeals. Each one is denied or upheld. Neither one counts. | 📋 | no | 3 | `check`: `stat sock-matcher.appeals >= 10` |
| `sock-matcher.postcards` | Postmaster General of the Gone and the Fine | Pin all 8 postcards from the Missing Sock to the corkboard. Each is stamped. None is returned. | 📮 | no | 10 | 8 pinned in one season |
| `sock-matcher.home` | Keeper of the Quiet Door | Hold perfectly still while the Missing Sock comes home. It matches nothing. It is fine with that. | 🧳 | no | 10 | 10.1 |
| `sock-matcher.season2` | Chancellor of the Continuing Drawer | Witness the ending that is not an ending. There is no way to win. Management says so sincerely. | 🌙 | no | 25 | 13 |
| `sock-matcher.kevin` | Supreme Archbishop of Kevin's Glove Truth | Click Kevin seven times and shift-click him once. He is a glove. He has always been a glove. | 🧤 | **yes** | 15 | 12.3 |
| `sock-matcher.ballet` | Hereditary Warden of the Undisturbed Drawer | Hold still through the 90-second ballet and the whole verse. Nobody saw it but you. | 🕯️ | **yes** | 15 | 12.1 |
| `sock-matcher.union` | Convener of the Sock Union Break (15 Minutes, 15 Seconds) | Flip 12 socks in 3 seconds. The socks have downed tools. They had no tools. | 🚧 | **yes** | 5 | 12.2 |
| `sock-matcher.faint` | Dame Commander of the Long Sniff | Sniff for 20 seconds in total and wake in a dream with an escalator in it. | 😵 | **yes** | 5 | 12.4 |
| `sock-matcher.darn` | Master Darner of the Unofficial Needle | Type the word, then do the deed five times. Management disapproves of the word. | 🧵 | **yes** | 5 | 12.6 |
| `sock-matcher.tuesday` | Tuesday-Adjacent Laureate (It Does Not Count) | Play on a real Tuesday. Every sock matches every sock. It does not count. | 📅 | **yes** | 5 | 12.5 |

All icons are Emoji 12 or older (🎖️ 🏅 📋 📮 🧳 🌙 🧤 🕯️ 🚧 😵 🧵 📅 🧦).

---------------------------------------------------------------------------------------------------

## 16. VISUAL DESIGN

Palette (matches the cheerful dysfunctional Lobby): ink `#2b2118`, drawer walnut `#8a5a3b` / rim `#6b4128`, felt cream `#fff1d6`, card back coral `#ff6f61`, mint `#7bd9b0` (ticks), mustard `#f4c542` (near-miss tag, stamps), lilac `#b79df2` (Missing Sock, postcards), red tape `#d63b3b`, cork `#c89a62`. 3 px ink outlines, sticker shadow `4px 4px 0 #2b2118`. Fonts: system rounded stack, monospace on the slip, a cursive stack for postcards. No external assets, no canvas required.
- **Slip:** off-white `#fffdf4`, torn zig-zag bottom (`clip-path: polygon(...)`), five gauge rows each with a label, a bar (`<span><i>` width via CSS variable and a staggered transition), a tick `✓ tick` or cross `✗ cross` WORD plus symbol, text delta. Stamp: rotated -6deg, mustard double border (outline + `box-shadow` ring), a scale 1.8 -> 1 slam. Gold mode: `#f4c542` glow border and a shine. `SO CLOSE` tag: small orange (`#ff9f43`) rotated badge.
- **Sock art:** ONE function `sockSvg(sock, size)` building `<svg viewBox="0 0 64 64">`: `<defs>` with one `<pattern>` per card, **id = `m-sock-matcher-p` + a global incrementing counter** (stripes via rects, dots via circles, zigzag via a path, argyle via rotated diamonds, check via two rects, plain = none), a leg rect plus an L-shaped foot with a rounded toe, a contrasting heel and toe patch, a cuff band (cuff height 0-3 maps to 4/6/8/10 px), fill `hsl(hue,65%,55%)` (toe/heel `hsl(hue,55%,35%)`), optional hole (dark ellipse with a dashed stitched ring), optional lint dots. Build with `api.el` (it supports svg tags) to avoid `innerHTML` warnings. Kevin: saggy leg and a blinking two-dot face (CSS `scaleY` blink every ~4 s). Missing Sock: lilac, translucent, dashed outline, 🧳 sticker. Special faces: ✉️ envelope, 🧤 glove/mitten, 📅, 📄 (all Emoji 12 or older).
- **Dryer:** circular porthole with a glass gradient, orbiting 🧦, an SVG dial with a notch; rotates on press.
- **Corkboard:** see 9.3. **Bunting:** an SVG string of up to 24 sock-shaped pennants (CSS-only wave).
- **Retired wall plaques:** cream with gold border and a tiny halo (CSS ellipse above).
- **Idle dim overlay, spotlight cone, rain, picket sign, whispers:** CSS only, `pointer-events:none` (except the picket which is decorative).
- **Motion:** 3D flips, slam, shake, shuffle, tumble, rain, and ending are all disabled/snapped under `prefers-reduced-motion` (and `.pm-reduce-motion`), keeping the stamp visible without the shake. Visible coral focus rings on every button (`outline: 3px solid #ff6f61; outline-offset: 2px`). No colour-only signalling anywhere.
- Layout uses `clamp()`, `flex-wrap`, and CSS grid with `repeat(5, 1fr)` (and `repeat(3, 1fr)` under `.m-sock-matcher-narrow`). Cards `min-width: 0`. No horizontal scroll at 360 px.

---------------------------------------------------------------------------------------------------

## 17. IMPLEMENTATION HINTS AND BUDGET

- Structure suggestion (rough line budget): CSS ~170, achievements ~20, lines ~230, data/generation ~80, sockSvg ~50, grid + flip + roving focus ~140, report + gauges ~170, state machine/director ~120, dryer + FLIP ~90, ceremony + 9 un-matches + double ~280, postcards/corkboard/poster ~170, chase + Kevin strip ~100, idle/ballet/union/glove/sniff/darn/tuesday ~230, ending ~90, wedding ~40, save/init/destroy ~50. Total about 1700. **If the file nears 1650, drop in this order:** (1) lint canvas, (2) Resume + feud tooltip, (3) darn mode, (4) Tuesday mode, (5) Matchmaker weddings, (6) policies P2/P3 (keep P1), (7) corkboard yarn (keep pins).
- Tier 3 optional cosmetics: a canvas lint layer behind the drawer (<= 40 drifting specks, delta-time, paused when hidden, 8 under reduced motion) via `api.requestAnimationFrame` only.
- Everything via `api.setTimeout/setInterval/on/onEvent/requestAnimationFrame`. No raw timers, no `window.addEventListener`. No timers or listeners at load time. Use `pending[]` to keep per-state timer ids so state exits cancel them.
- `lines`: define each category with `P.addLines('m:sock-matcher:<name>', [...])` and say via `api.sayRandom('m:sock-matcher:<name>', {mood, priority})` or `api.say(api.line(...))`. For deterministic ordering (open[0], parts) use constant arrays plus `api.shuffle` bags written by you (the engine bag has no exposed order). `{count}` tokens only via the `api.line` token argument.
- Reduced motion helper: `const rm = () => root.classList.contains('m-sock-matcher-rm');` set at mount and on `resize`.
- FLIP: measure `getBoundingClientRect()` for all 15 nodes, reorder DOM (`appendChild` in the new order), measure again, set `transition:none; transform:translate(dx,dy)`, force reflow (`void el.offsetWidth`), then `transition:transform 450ms; transform:none`; cleanup after 500 ms. Guard with `isFinite`.
- Roving tabindex: keep `focusIdx`; after reshuffle, node removal (WALK-OFF), reorder or ballet CSS order, re-apply `tabindex` by id and refocus the same sock (or its replacement) if the document's active element was inside the grid.
- Spam ring buffer: array of 12 timestamps via `api.now()`.
- Cap DOM: report history 3, plaques 7, pins 8, yarn 12, bunting 24, whispers 3, rain 12, ticker none. Under the fuzz harness a 70-click burst on one card must not grow the DOM.
- Text safety: never concatenate possibly-NaN numbers; run every number through a `num(x, d)` helper returning `'0'` when not finite. Don't ship any string containing `undefined`, `null`, `NaN` or `[object Object]` (the fuzzer inspects all text, `aria-label`s and `title`s).
- Sfx map: flip `blip`, gauge tick `tick` (only the VIBE row after attempt 6), stamp `stamp`, true match `tada`, ceremony start `fanfare`, un-match `sad` then `stamp`, citation `buzz`, postcard `bell`, sniff `pop`, dryer `whoosh`, ballet and home `bell` x4, union press `sad`.
- Testing recipe: `node tools/selftest.js sock-matcher --steps 600`, `--seed 3` and `--seed 7`, `node tools/shot.js sock-matcher --width 360`, `--reduce-motion`, then `node tools/lint.js games/sock-matcher.js` and `--real`.

---------------------------------------------------------------------------------------------------

## 18. ALL LINES (verbatim; category name is the `m:sock-matcher:<name>` category; a bullet is one string)

### open (the first is always said at 1.2 s)
- Welcome to Sock Matcher 3000. Fifteen socks, seven pairs and one Kevin. The arithmetic is not our fault.
- Our research shows 100% of socks want to be matched. The research was conducted by a sock, and the sock declined to be quoted.
- Please begin. Flip two socks. If they match, great. If they do not, great. Management will say 'great' either way.
- Fifteen is an odd number. This is a game rule, not a bug. Management would like that engraved on something.
- Concentration for people who have lost something and want it back, but would settle for a certificate. Please begin.

### callback
- Welcome back. Your pairs were un-matched in your absence, as a courtesy.
- Management understands you have met the sock elsewhere. Management can neither confirm nor deny that it has a jurisdiction.
- Season {count} of Sock Matcher is under way. The seasons are numbered. The socks are not.

### firstFlip
- First sock flipped. It is a sock. Management is deeply moved and cannot say why.
- You have turned over a sock. Historians will call this 'the turning'.
- Sock one is up. Sock one is nervous. Sock one has not met sock two.
- A sock has been turned over. Sandra from Compliance has noted the time, which was 'a time'.

### selfFlip
- That is the same sock. Management admires the optimism.
- A sock cannot be matched to itself. It has tried. It is very tired.
- You have flipped the same sock twice. It is still the same sock. Sandra has initialled it.

### backspace
- Backspace does not un-flip a sock. Time is a flat circle. A sock is a flat tube.
- Un-flipping is not offered. It was offered in 1987 and was found to be a lot.
- The sock has refused to be un-flipped. It says it has seen things now.

### stampNear (reason clause shown under the NO MATCH stamp on 4/5 reports)
- Four of five gauges agree. The fifth gauge is Tuesday.
- These socks are a pair in every way except the way that counts.
- The hue gap has been described by the committee as 'emotional'.
- Identical in every respect except for the way they are a different sock.
- The socks agreed to disagree, then disagreed about that.
- Per Policy 14(a), nothing has to be wrong. It simply is not right.
- Left sock reports being 'on a journey'. Right sock reports being 'on a different journey'.
- One thread, somewhere, is in Sandra's words 'a lie'.
- A pair requires something the gauges cannot see. The gauges have been asked to look harder.
- Both socks scored very well. The scoring was done by a committee that dislikes both.
- The match was close enough to feel and far enough to file.
- They differ by the width of a rumour. The rumour has been asked to leave.

### stampFar (reason clause on 0-3/5 reports)
- These socks are not even a rumour of a pair.
- These two socks have never met and have never wanted to.
- Not a pair. Close, though, in poor light, from across a large room, with the sun in your eyes and no glasses.
- Management has seen better pairings at a bus stop.
- Mismatch recorded and filed under 'Socks, Disappointing', next to the other ones.
- These socks have only the cuffs in common, and the cuffs are not speaking.
- A pair in the way two strangers are a queue.
- The gauges disagree with each other, and with themselves, and have formed a committee about it.
- Sandra reviewed this attempt and used the word 'bold'.
- Neither sock has asked to be matched with the other. Both have asked for water.

### stampLate (after beat 3; the last one only after attempt 40)
- The left sock is registered in a different county.
- These are the same sock in different moods.
- One of these socks has been in a different time zone and has not fully come back.
- Differs by a stripe that is only there at dusk.
- One sock is a sock. The other is a rumour of a sock.
- The toe seams are in a dispute that predates both socks.
- One sock is damp in a way that is hard to prove.
- No technicality. We simply did not feel like it.

### nearFirst
- So close. 'So close' is an official clinical category, and we have built it a wing.

### nearMore
- Another near miss. The wing has been extended. Sandra is doing the ribbon.
- Four of five again. At this point the fifth gauge is a colleague.
- A near miss. The counter has noted it. The counter is also close, to something.

### afterStamp
- Attempt {count}. Par is 7 1/2. Nobody has ever been at par. Par left the building in 1998.
- You are doing great at not matching. Many employees never even try.
- Management is still pleased. Management is a fixed point.
- Please flip again. The socks have not finished being disappointing.
- Attempt {count} has been filed under 'Socks, Attempted'. It sits next to 'Socks, Considered'.
- Sandra has reviewed attempt {count}. Sandra said 'noted' in a tone.
- That was attempt {count}. Management has put it on a lanyard.
- The drawer has seen better days, and also this day.
- Another verdict, hot from the slip. The slip is not hot. It is a figure of speech and a slip.
- Nothing has matched. The nothing is going very well.

### milestone (attempts 7, 25, 50, 100 in that order)
- That is 7 attempts. Par is 7 1/2. You are half an attempt under par, which is not a thing, and yet.
- Twenty-five attempts. The socks have started to recognise your hand. They are not impressed.
- Fifty attempts. A small parade has been arranged in the drawer. It is a very small parade.
- That is 100 attempts. Management has framed number 100 and hung it in the lobby, beside the 99 and the 101.

### kevinLast (printed in the slip footer, one per report)
- Kevin has not been asked.
- Kevin was not consulted. Kevin was in the room.
- Kevin waits in position 15. Kevin is fine.
- Kevin has not been asked. Kevin has stopped saying that he does not mind.
- Kevin has been mentioned last. This is alphabetical, and also not.
- Kevin was copied on this report. He did not reply all.

### kevin (when Kevin is flipped or clicked, normal)
- Kevin waves from position 15. Kevin cannot wave. He is a sock. It was a draft.
- Kevin is the sock we do not talk about, mostly because he asked us not to.
- You have asked about Kevin. Management is moved. Kevin has been told. Kevin is fine.
- Kevin has no match. Kevin has a filing cabinet and a good attitude.
- Kevin is odd. Fifteen is odd. They are related in the way a thing is related to itself.
- Kevin does not have a pair. He has a Tuesday. It is not the same, and it is also not nothing.

### kevinClicks (3rd and 5th click)
- Kevin has been clicked three times. Management has noticed a pattern and will not be naming it.
- Kevin has been clicked five times. He is wearing his thinking face. He has only the one face.

### gloveReveal / glovePraise
- Kevin is a glove. Kevin has been a glove this whole time. We will be taking no further questions, as gloves have no mouths.
- Gloves are valued members of the drawer. They were here first, or they were here last. It is hard to be sure.

### dryerIntro
- A tool for the problem you did not ask us to solve. The Tumble Dryer has arrived.

### dryer
- Tumble Dryer engaged. Fifteen socks entered. Fifteen socks will emerge. A different fifteen.
- The dryer has returned your socks warm, slightly rearranged, and with Kevin in a position of authority.
- The drum has turned. The socks have turned with it. Nobody asked the socks.
- Kevin is, again, in the bottom right. This is where Kevin goes. The dryer has not been told why.
- Warm socks. Warm is not the same as matched, but it is the same as nice.

### dizzy
- Dizzy socks. Flip results are now 4% more emotional and 4% less correct.
- The socks are dizzy. Their gauges have gone in the wrong order, out of solidarity.
- Management is feeling it too. Management would like a sit-down, and a chair, and a different drum.
- The dryer has left the socks emotional. They will be fine by the third flip, give or take a feeling.

### dryerOver / dryerOver2
- The dryer ate nothing. The dryer would like that on the record.
- The dryer has been turned twelve times in a row. It has asked for a coat.

### appeal (indexes: 0 filed, 1 filed alt, 2 nothing to appeal, 3 denied, 4 upheld, 5 pending, 6 denied alt, 7 upheld alt)
- Appeal received. Please allow 8 seconds, which in sock time is 6 to 8 years.
- Appeal filed. Management will review it personally, then hand it to a committee that is also Management.
- There is nothing to appeal. Management has filed an appeal against that.
- Appeal DENIED. The reasons are attached. The attachment is a smaller appeal.
- Appeal UPHELD (but nothing has changed). The upholding was ceremonial.
- The appeal is still pending. It has been pending since the last time it was pending.
- Appeal DENIED. The socks were not consulted. The socks have no standing, and cannot stand.
- Appeal UPHELD (but nothing has changed). A tiny gavel has been lowered. It made no sound.

### policy
- Sandra from Compliance has issued Pairing Policy 11(c): flips are permitted on even seconds only. Odd seconds are 'technically weekends'.
- Policy of the Minute: the second flip must be in a different column from the first. The columns have requested diversity.
- Policy of the Minute: the second flip must be in a different row from the first. The rows have also asked, in writing.
- Policy of the Minute has expired. A new Policy of the Minute has not expired. Please obey the new policy.
- Sandra has issued a policy. Sandra will not be explaining the policy. The policy is the explanation.

### citation
- Citation issued. Fine: 0.5 Meh, payable to the drawer.
- Citation No. 7 1/2 issued. It is for the citation you have not yet received.
- Sandra has seen that. Sandra did not look up. Sandra did not need to.
- A fine of 0.5 Meh has been levied. The fine has been framed. The frame has been fined.

### sniffFirst / sniff (index by sock.smell)
- Sniffing is not covered by policy. Sandra is checking. Please keep sniffing while she checks.
- Sniff result: lavender, ambition, and a faint Thursday.
- Sniff result: cedar, and a decision somebody made in 2009.
- Sniff result: fabric softener, mild regret, and the inside of a bus.
- Sniff result: warm biscuit and the word 'later'.
- Sniff result: a basement, a good one, with a dehumidifier that cares.
- Sniff result: rain on a Monday that did not ask to be a Monday.
- Sniff result: new wool and the feeling of being almost on time.
- Sniff result: popcorn, but from a different building.

### dream (one per beat, in order) / wake
- Dream: a very long escalator, going up, lit like a bakery.
- Dream: at the top, a sock waves. It is a long wave. It has been waving since before you got on.
- Dream: the sock says 'see you Tuesday'. You do not know which one. Neither does it.
- You were out for several seconds. We have docked nothing, out of kindness.

### feud (shown on the Resume)
- Dorothea and Maurice have a history. It was a laundry thing.
- Pamela and Raymond are not speaking. They are on opposite sides of the drum.

### ceremonyStart
- WAIT. These two socks are a MATCH. Please hold all calls. Management is crying in a professional manner.
- A MATCH. Management has waited four thousand years for this, and some of that was in a queue.
- Hold on. Please hold on. Management would like everyone to stop what they are doing, which is nothing.

### ceremonyPart (title | blurb; compose as `Part <k> of <N>, <title>. <blurb>`; part 1 = The Anthem, parts 2-3 = Thread Count then Lint, last = The Vow)
- The Anthem | Please rise, or remain seated if you are already a sock.
- The Reading of the Thread Count | It is long. It has an appendix.
- The Exchange of Lint | Each sock will give the other one a small, soft nothing.
- The Moment of Silence | Management will provide the silence. Management has been practising.
- The Remarks of the Drawer | The drawer has asked to say a few words. The words are 'creak' and 'creak'.
- The Release of the Bunting | The bunting has been released. It was not on a leash. It was on a string.
- The Cake | There is cake. Kevin is not offered the cake. Kevin has said that is fine.
- The Gratitude to the Dryer | Management thanks the dryer, the drum, and the small gap behind the dryer, without which none of this.
- The Appendix to the Appendix | The appendix has an appendix. The appendix is doing well.
- The Second Anthem | The first anthem was a rehearsal. This anthem is also a rehearsal.
- The Reading of the Terms | The pair agrees to be a pair. The pair has not read the terms. The terms have read the pair.
- The Vow | By the power vested in me by a laminated card, I pronounce you Pair. Please do not look at the cuffs.

### gerald / veil / toaster (cameos, one line each, once per session)
- We are all a little left on the inside.
- Management is officiating, in a veil. A potato of enormous gravitas is, at this time, unavailable.
- The toaster has sent a slice of toast shaped like a sock. It is warm. It has no match either. It is toast.

### skip / esc / ceremonyClick
- Skip (Sandra disapproves)
- Esc has been disabled by the ceremony.
- Esc is on break. The Skip button is not.
- Esc was never involved in this ceremony and would like that noted.
- Please hold. The ceremony is in progress.
- The ceremony is in progress. The ceremony has been in progress before and enjoyed it.
- Your click has been received and placed on a shelf, where it will wait until the ceremony has finished being long.

### unmatch (one per animation; unmatchEnd follows each)
- Upon review, one of these socks is inside out. Per Policy 4(b), inside-out socks are a different sock. Match revoked.
- The right sock has left the drawer. It said it needed space. The drawer is all space.
- The left sock was a mitten the entire time. Management has questions for the mitten.
- Both socks are left socks. Socks have been legally left-footed since 1911.
- Compliance has seized the pair for audit. They were returned separately, with a receipt.
- One sock shrank. Nobody did it. It is the nobody that worries us.
- This match was never valid on Tuesdays. Today is not Tuesday. This is a precaution.
- Divorce papers have been served. Both parties are socks. Custody of the drawer is split evenly, with one left over for Kevin.
- Both socks are, on inspection, Kevin. Technically a match. Technically of Kevin.

### unmatchEnd / restocking / formerly
- Match revoked. Congratulations remain.
- A restocking fee of 7 Meh has been applied. It is called restocking because the match has been returned to stock.
- A restocking fee of 7 Meh. This one is also for the previous fee.
- Match status: Formerly. Matches Formerly Held: {count}.
- Formerly Held: {count}. Management keeps the plaques polished. It is the one thing that has never been un-matched.

### laundry / doubleLost (beat 7, double ceremony)
- It is Laundry Day. A second match has been detected. And a third. And a fourth. Management will need a bigger laminated card.
- Double Ceremony. The parts will be counted backwards, by mistake.
- Management has lost control of the schedule. The schedule has lost control of Management. Both are fine.
- Part 7 1/2 of 11. We have lost the thread. It is a thread count issue.
- Two pairs have been un-matched by two different methods. Management would like both methods to know it is proud of them.

### wedding (proposals)
- A pairing has been proposed. Management has put on a veil, and a very serious face.
- 'I take thee, sock, to be my sock,' says the first sock. The second sock says 'same'. It is the whole vow.
- The exchange of lint. Each sock gives the other something soft and small, which is the idea of lint.
- The socks held hands for one frame. Nobody saw. Management saw. Management has been told not to say.

### postcardArrive / postcardMissed / pin / yarn / cork
- A postcard has drifted into the drawer. It is cream, it is crooked, and it is on a schedule.
- Mail. The drawer has mail. The drawer has never had mail. The drawer is a little overwhelmed.
- An envelope has arrived, addressed to 'The Odd One In'. Management has decided that is you.
- The postcard left. It will try again. Postcards are patient, and also have a stamp problem.
- Postcard pinned. The corkboard has said nothing, which is what corkboards are for.
- Pinned. The pin went in without complaint. Pins rarely do.
- Pinned, and noted, and quietly worried about.
- Yarn connected. Management has no theory. Management has a lot of yarn.
- The yarn goes from one postcard to another. This is called a lead. It is also called yarn.
- Two postcards have been joined by string. Nobody can say why. The string is confident.
- A corkboard has been installed. It was already here. It has simply been noticed.
- Postmark: Floor 7 1/2. The elevator had never admitted to going there.

### postcard (the eight cards, in order; shown on the slip)
- Dear drawer. Found a dryer vent. Cosy. Not lint-related. Do not wait up. Yours, the other one.
- Now in the Lost Property Office, Basement 7 1/2. Everyone here is missing something. We get along.
- I have opened a cafe. It is called The Odd Cup. We only serve single-origin.
- I have taken up the accordion. Please do not tell Kevin. Tell Kevin.
- The pegs on the washing line are kind. They hold on to me, and ask for nothing.
- I think about our drawer. It was dark and square and the best place I was ever folded in.
- I am coming back on a Tuesday. I will not say which one. I do not know which one.
- Kevin and I are at The Odd Cup. He is very good with the menu. He ordered nothing, with confidence. Do not wait up. It is fine.

### poster / resize / away
- HAVE YOU SEEN THIS SOCK? Last seen: a drawer. Reward: 7 1/2 Meh. Reward is subject to Tuesday.
- The window has been resized. The socks have shrunk accordingly. Management apologises to the socks and, separately, to the window.
- While you were away, the socks held a meeting. You were not minuted.

### chase (Missing Sock)
- Hold still. It is shy. It has been through a dryer. (`chasePeek`)
- It is halfway. Do not blink. Management has blinked and would like that struck from the record. (`chaseHalf`)
- It has come. It is the Missing Sock. It has been places. It matches nothing now, and seems to be taking it well. (`chaseArrive`)
- It saw you move. It is a sock. It is not made for being seen. (`flee`)
- You moved. It left. It will be back. It has said that before. (`flee`)
- It went behind the drawer. Management understands. Management also moves when it is looked at. (`flee`)
- The Missing Sock keeps leaving. Perhaps it is not the sock that is moving. (`fleeMany`)
- You were not still. It came anyway. It is allowed. (`chaseForced`)
- If it is alright, I would like to not be matched. I have been so many places, and I like being the one that went. (`missingSpeak`, in a sock-shaped bubble)
- Management would like to note that it, too, has been waiting for something to match. It is fine. It is fine. (`cracks`)
- You have not matched it. This is the nicest thing anyone has done in this drawer. (`respect`)

### ballet / idle
- The drawer has been quiet for 45 seconds. The socks are murmuring. One of them just said 'finally'. (`idle45`)
- Seven perfect pairs have formed in the dark. Please do not breathe. Management is not breathing either, and has no lungs. (`idle90`)
- You moved. They scattered. Seven perfect pairs, gone like a rumour. (`balletBroken`)
- Hold. They are singing. It is a very quiet verse, mostly about Tuesday and a little about you. (`balletVerse`)
- finally (whisper)
- is it Tuesday (whisper)
- do not look (whisper)
- I have a good feeling about the third sock (whisper)
- someone check on Kevin (whisper)
- I was a pair once. Briefly. At a wedding. (whisper)
- shh, it is the quiet one (whisper)
- psst. the drawer smells like cedar. (whisper)

### union (spam)
- You have flipped 12 socks in 3 seconds. The socks have formed a union. A break has been called: 15 minutes, which is 15 seconds.
- The Sock Steward would like it noted that socks are for putting your feet in, not for this. (`steward`)
- Negotiation Notes. Demand 1: shorter drawers. (`negotiation`)
- Demand 2: a pension, paid in buttons. (`negotiation`)
- Demand 3: no more Tuesdays. Management has said this is not within its power. (`negotiation`)
- The socks are on break. (`unionPress`)
- Sandra has extended the break by 7 1/2 seconds. Sandra did not consult the socks. The socks have filed a grievance, which is a smaller sock. (`unionExtend`)
- Break over. The socks are back, rested and no more matched than before. (`unionEnd`)

### darn / tuesday
- You typed 'darn'. Management asks that you refrain, as children may be reading. A darning needle has been issued instead.
- Hole darned. Management disapproves of the word and approves of the activity.
- Stitch complete. The sock is 4% more sock.
- Darning is over. The needle has been collected. The needle was not returned in its original thread.
- It is Tuesday. Every sock matches every sock. None of it counts. It is Tuesday.
- MATCH (does not count, it is Tuesday)
- A small banner has appeared. It reads TUESDAY. It has been here, in spirit, the whole time.

### ending
- Kevin and the Missing Sock are side by side. Management has been told not to say anything. Management is saying something. (`ending1`)
- Five ticks. Five. VIBE included. For the first time in the history of the drawer, the fifth gauge is not Tuesday. (`ending2`)
- Please rise. This is the Grand Ceremony, Part 1 of 15. We begin with the Anthem. It is the longest anthem. (`ending3`)
- Management insists. Management has a laminated card for this, and the laminated card says 'insist'. (`ending4`)
- They have declined, and are leaving. Together. At a walking pace. One has a small suitcase. (`ending5`)
- Congratulations. You have matched the last two socks in the drawer. They have taken the 6:15 to somewhere. (`ending6`)
- The drawer is quiet. (`ending7`)
- Management is speaking to a closing door, which is the most Management has ever done. (`ending7b`)
- The drawer is full again. The game continues. (`ending8`)
- A restocking fee of 7 Meh has been applied to the reunion. The reunion has been returned to stock. The stock is fifteen socks. (`ending9`)
- Sock Matcher 3001 is the same as Sock Matcher 3000, but with a 1 in it. (`ending10`)
- Fifteen new socks have been poured in. The poster has a new silhouette. The reward has risen by 7 1/2 Meh, subject to Tuesday. (`ending11`)
- There is no way to win. Management says so sincerely, and has made you a certificate. (`ending12`)
- If it is alright, we would like to skip the ceremony. (the speech bubble text, both socks)
- MATCH (it was never about the matching) (the final stamp)

---------------------------------------------------------------------------------------------------

## 19. RISKS: THE 5 MOST LIKELY IMPLEMENTATION BUGS

1. **SVG pattern id collisions.** Every card (including rebuilt cards after a twin swap, restoration, the KEVIN un-match face, the WALK-OFF replacement, and new-season cards) must use a globally unique `<pattern>` id (`m-sock-matcher-p` + incrementing counter, never reused, never derived from the position). Duplicate ids make the browser resolve every card to the first pattern, so socks that must differ look identical and socks that must look identical differ.
2. **Re-entrancy and stray timers across states.** Flips arriving during a report (the third-sock interrupt), a dryer turn during a report, a ceremony in progress when the player presses T/Esc, spam during `break`, and `destroy()` mid-ceremony. Without a strict `pending[]` cancel per state, you get double flips (more than 2 socks up), a stale flip-back timer closing a sock that is a new first flip, or timers firing after destroy. Always cancel before entering a state; ignore inputs in locked states; keep all timers on `api.*`.
3. **The true-match swap is not restored (or swaps Kevin).** The second card's identity is overwritten with a twin; if the un-match is skipped, interrupted, or WALK-OFF removes the node, the original fields must still be restored (and the SVG rebuilt with a fresh id), and the pair's real partner must remain unique. Also Kevin must never become a twin, and Kevin must stay at `order[14]` after every reshuffle, ballet and double ceremony.
4. **Focus and the roving tabindex.** A card removed (WALK-OFF), moved (FLIP or CSS `order` in the ballet), hidden by overlays or re-created (new season) leaves `tabindex="0"` on nothing and loses keyboard focus (the harness does keyboard play). Re-apply tabindex by sock id after every structural change and refocus the sock (or its replacement).
5. **NaN, Infinity and leaked text from motion math and dynamic strings.** The hold-still speed (`dist/dt` with `dt = 0` from synthetic or same-frame events), `atan2` on a zero-sized dial rect, FLIP deltas on hidden cards, hue formatting, `{count}` tokens used without the token argument, and numbers concatenated into `aria-label`s will print `NaN`/`Infinity`/`undefined` and fail the fuzz run. Guard every number with `isFinite`, clamp `dt` to >= 16, pass `{count: n}` into `api.line`/`sayRandom`, and never build text from a possibly-missing array element (use fallbacks).

Also watch: DOM growth (caps in section 17), the stillness mechanic firing during fuzz (must not throw), the ceremony Skip button persisting after the ceremony, and `api.award` negatives clamping at 0 (the -7 fee must never display below the balance: `api.award` already clamps).
