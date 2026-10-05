# DESIGN BRIEF: The Suggestion Box  (module id `suggestion-box`)

Builder: you need only SPEC.md, VOICE.md and this file. Output: ONE file `games/suggestion-box.js` (<= ~1800 lines, aim for 1500; vanilla JS, classic script, no external anything). This brief merges three pitches (Pitch 1 "Rhythm" = the five-phase slip loop, Feeling Rail, Somewhere Wall, ghost, jam, Box-suggests-back, zoom-out; Pitch 2 "Classifier" = reaction classifier, Bernard, Lean In, Dennis slip, thimble tone; Pitch 3 "Opera" = eleven-second aria, accidentally-real CSS words, Verify, Sandra impact statement, ears multiplying) and cuts what is not buildable. Where this brief and a pitch disagree, this brief wins. Where this brief is silent, follow SPEC.md section 5.

Priority tags: **[MUST]** build it. **[SHOULD]** build it unless over the line budget. **[COULD]** first thing to drop (cut order in section 17).

CANON (all pitches disagreed, this is law): the Box has been open since **1994**. It has not once closed its mind. It has not interrupted anyone since 1994. Anonymous Slip No. 7 1/2 has been in the slot since 1994. The Box's real name is **Bernard** (smudged plaque B_RN_RD). The Box and Management are different entities; Management reads, the Box listens.

## 0. Registration and conventions

- `id: 'suggestion-box'`, `title: 'The Suggestion Box'`, `tagline: 'Everything you say is heard. What happens next is a different department.'`, `icon: '📮'`, `category: 'department'`, `unlockCost: 0`, `tags: ['suggestion','rhythm','listening']`.
- `api.setTitle('The Suggestion Box (Excellent Listener)')`.
- All CSS classes `m-suggestion-box-*` (write the full prefix literally in the CSS string so `tools/lint.js` sees it; in JS use `const k = s => 'm-suggestion-box-' + s`). Keyframes `m-suggestion-box-*`. Stats `suggestion-box.*`. Achievements `suggestion-box.*`. Custom line categories `m:suggestion-box:*` are optional: the recommended design serves everything from inline arrays through the module's own shuffle bags (see below), but contributing section 14 lines with `P.addLines` is fine.
- **Token convention (important):** the engine substitutes `{player}` etc. only inside `api.line()`. Almost all text here is served by the module's own shuffle bags and filled by a module `fill(str, map)`. Module tokens are PERCENT tokens: `%WORD` (echoed last word, lower case), `%QQ` (a quoted 2 to 6 word fragment, already wrapped in straight double quotes), `%LONG` (longest word of the slip), `%SLOW` (last up to 4 words joined with `... `), `%TILE` (Somewhere name), `%TIER`, `%PCT`, `%NUM`, `%PLAYER`, `%FIRST` (first slip text), `%PROB` (the probably label, see 8.1). **Single-pass fill:** `str.replace(/%([A-Z]+)/g, (m, key) => map[key] != null ? String(map[key]) : '')`, then collapse double spaces and trim. Values substituted in are NEVER rescanned (a player who types `%WORD` or `%TILE` into a slip must not break anything). Never use curly braces anywhere in module text (lint warns on unknown `{tokens}`).
- Every line in section 14 is given WITHOUT quotes; wrap it in a JS double-quoted string. **No line in this brief contains a double quote** (inner quotes are single quotes). American spelling, straight quotes only, no em dashes. Lines may be trimmed a few words to fit a UI box but must not be softened or "improved". Deadpan is the point.
- Emoji: Emoji 12 or OLDER only. Allowed and verified: 📮 👂 🥔 🍞 🧦 ☁️ 🅿️ 🕰️ 📊 🥪 🥫 💭 🌿 📌 📎 🧻 🛌 👍 🎵 🎶 ✨ 🎩 🧢 👒 👓 🕶️ 🕵️ 🚗 📅 ↗️ 🥔. FORBIDDEN (Emoji 13+, render as boxes on Windows 10): 🪴 (use 🌿 for Dennis and the ficus), 🪜, and avoid 🪑 (use CSS or 💺). There is no stapler emoji: draw the stapler with two small CSS bars, or use 📎. No ZWJ people emoji. Run `node tools/lint.js games/suggestion-box.js`.
- Cross-module reads, all inside try/catch, missing reads as 0/false: `api.flag.get('metGerald')`, `api.flag.get('metDennis')`, `api.flag.get('metToaster')`, `api.flag.get('sockSeen')`, `api.flag.get('complaints-dept.rockMet')`, `api.stat.get('complaints-dept.filed')`, `api.stat.get('toaster-debate.slices')`, `api.stat.get('toaster-debate.arguments')` (also `toaster.toasts` and `toaster.slices`, which read 0 and are harmless). This module sets only its own flag `suggestion-box.certified` (at the ending). It never sets `metGerald`.

## 1. Concept

A cardboard Box with one enormous ear, no interruptions and a slot leans toward your cursor and waits. You post a slip: typed, assembled from fridge-magnet word tiles (the tiles alone are a complete game for touch players), or flicked into the slot. The Box echoes the last word. **Management then reads your slip aloud "with feeling" and you keep the beat** (Space, click or tap on each word's pulse): hit ratio sets a Feeling Tier from Flat to Operatic to Perfect, and tapping too much makes Management Unwell. The slip is then APPLIED to one of nine vague Somewheres on a wall map (lobby with a thumb, or leave it to the Committee), with a Confidence percentage that always ends in the word "probably" and a time stamp that is always 4:17 PM. The Box is such a good listener that it starts finishing your sentences, then writing your slips for you, then jams on a Dead Letter (jiggle it free), then offers suggestions TO YOU (cosmetic hats on your cursor), then the Somewheres write back and those notes must also be read with feeling, and then the whole module zooms out to reveal the Box and the Wall sitting inside a bigger Box: Suggestion Box (Management), which has been listening to Management the whole time. Management has never posted a suggestion of its own. You help it write one. It is applied "somewhere kind". Then the camera zooms back in like nothing happened, the first slip is in the slot again ("Please read me."), a Certificate of Having Been Heard prints, and Career 2 begins. Nothing is won, nothing was meant, and the Box is still listening.

Arc (VOICE.md rule 3): normal (leaning Box, an echo) -> weird (feelings have tiers, a wall appears) -> bureaucratically unhinged (ghost sentences, Dead Letter, Sandra, notes from a parking lot) -> strangely touching (the Box writes you advice; Management's own box; Dennis's slip) -> back to normal like nothing happened.

## 2. Cast (rarer is funnier)

- **Management**: the reader. Speaks with `api.say` (default speaker). Moods: neutral proud disappointed confused panic smug.
- **The Box** (Bernard): the listener. Speaks through the small **speech tag** under the slot (module DOM) and, for important lines, `api.say(text, { who: 'The Box' })`. Lowercase, softer, gentle.
- **Sandra from Compliance**: never seen, always cited. A small S-in-a-circle stamp "Reviewed by Sandra", tape on the Dead Letter, the Strip counter "Sandra Has Read: 0".
- **Dennis (Plant)** (🌿): author of Anonymous Slip No. 7 1/2. Thriving. Not impressed.
- **The Third Ficus**: the Somewhere that gains one detail per beat and never speaks.
- Cameos (slips arriving through the slot): **Gerald** (🥔, if `metGerald`), **Brenda, Window 4** (🥪 taped on, if `complaints-dept.filed` > 0), **The Toaster** (🍞, if toaster stats), **The Rock** (if `complaints-dept.rockMet`), **The Missing Sock** (rare, if `sockSeen`).
- **Tuesday (Approx.)**: a tile. Declines everything, marks you Tentative.

## 3. Screen layout and DOM map [MUST]

Root `div.m-suggestion-box-root` (child wrapper of the `root` passed in). Custom properties live on it: `--lean --lift --ear --listen --zoom --abol --small --tempoMul --accent --font --dim`. Attributes: `data-beat`, `data-phase`, `data-career`, `data-compact="0|1"`, `data-reduced`.

```
.m-suggestion-box-root
  svg (hidden, width 0): defs, filter #sb-wobble (feTurbulence, defined ONCE, < 15 lines)
  .m-suggestion-box-banner            (role=status: resize / sign / idle notices)
  .m-suggestion-box-big               (the BIGGER BOX frame: 4px border + a big slot at the top + label; invisible chrome until beat 9)
    .m-suggestion-box-inner           (the scalable grid; transform: scale(var(--zoom)) from beat 9, transform-origin center top)
      .m-suggestion-box-left
        .m-suggestion-box-box         (THE BOX: face, slot, lamp, 2 eyes, ear(s), hand, plaque, tape, awning; pointer target for lean/jiggle)
          .m-suggestion-box-tag       (speech tag under the slot: the echo; aria-live off, the status line is the live region)
        .m-suggestion-box-desk        (THE SLIP DESK)
          .m-suggestion-box-slip      (ruled paper div, jagged bottom clip-path; contains ghost layer + textarea + stamp)
          .m-suggestion-box-drawer    (10 word tiles + Reshuffle Drawer button)
          .m-suggestion-box-actions   (POST IT, Lean In ear button (beat 3+), Verify (beat 4+), Retract)
          .m-suggestion-box-offer     (the Box's own slip pushed out to you, Implement / Table; beat 7+)
          .m-suggestion-box-pile      (tabled slips under a CSS stapler, cap 5)
      .m-suggestion-box-right
        .m-suggestion-box-wall        (3x3 Somewhere tiles; clock "4:17"; Verify lens; the curtain covers it until beat 4)
          .m-suggestion-box-curtain
    .m-suggestion-box-mgmt            (beat 9 only: Management's slip, Management's tile drawer, Post quietly button, inside the big box)
  .m-suggestion-box-stage             (OUTSIDE the scaled inner: status line, Feeling Rail, BEAT button, feeling meter, ledger)
    .m-suggestion-box-status          (role=status aria-live=polite: the current reading text / current Management line)
    .m-suggestion-box-rail            (word chips, one highlighted at a time)
    button.m-suggestion-box-beat      (80px round BEAT button)
    .m-suggestion-box-meter           (stack of 🎵 🎶, max 14)
  .m-suggestion-box-strip             (Status Strip: Heard: 100% | Suggestions In: N | Applied: N | Implementation Rate: Probably | Sandra Has Read: 0 | Feelings Delivered (beat 3+) | clock 7:30 | footer Career)
  .m-suggestion-box-trail             (the last 6 slips as tiny chips; older fold into 'Earlier Slips (N)')
  .m-suggestion-box-cursor            (the single absolutely positioned span container that trails your pointer with hats/glasses; position:absolute inside root, pointer-events none)
```

Why the stage is outside `inner`: at beat 9 the inner grid is scaled to .55 and set `inert`/pointer-events none; the Rail and BEAT button must stay full size so the hushed reading is legible and tappable. Layout: CSS grid, two columns above 760px (left 58%, right 42%), stacked below (Wall under the Desk). Stage and Strip are full width under the grid. Works at 360px with zero horizontal scroll; touch targets >= 48px (BEAT 80px); coral focus ring 3px. Compact mode (root narrower than 500px by `root.clientWidth`, checked on a `resize` via `api.on(window,'resize',...)` and when the module mounts): `data-compact=1`, the Drawer becomes a single horizontal scroll row, the Wall tiles shrink to emoji plus a two-line name. On entering compact mode once per mount the Box says one line (section 14.Z "narrow room").

DOM caps [MUST]: tiles 10, slips on desk 1, tabled pile 5 visible, stickers 3 per tile (older fold into a "+N" badge), trail 6, cursor trinkets 3, falling blank slips 6 (removed after 3s), meter notes 14, status/log text lines never accumulate (single status element rewritten).

## 4. Controls [MUST]

Everything is a real `<button>`, `<textarea>` or `<div role=button tabindex=0>`. All shortcuts are handled by ONE `keydown` listener attached with `api.on(root, 'keydown', ...)` (inside root only, so the event target is always inside the module), ignored when `ctrlKey/metaKey/altKey` is held, and `e.repeat` is ignored except for J. Shortcut letters are ignored when the target is the textarea or any `<input>`.

| Input | Effect |
|---|---|
| Type in the slip textarea | maxlength 80, rows 2. Lowercase gentle typing (no capital letters and no `!` among the last 12 characters) makes the Box lean closer and widen its eyes (class `m-suggestion-box-gentle`). ALL CAPS (>= 4 letters, all upper) or `!` makes the Box flinch back and cover the slot with a tiny paper hand (class `m-suggestion-box-flinch`). Pure reaction text (a line in the speech tag, at most once per 5 s) plus the class. No scoring. The ear flaps on every key. |
| Enter in the textarea | POST. Shift+Enter inserts a newline (replace newlines with spaces on post). |
| Click a word tile or press Enter/Space on it | Appends the word plus a space to the slip; the tile is replaced from the shuffle bag; `tilesUsed` stat. |
| Reshuffle Drawer | Deals 10 fresh tiles from the bag. Free. |
| POST IT button | POST (empty is allowed and is funnier). |
| FLICK: pointerdown on the slip, drag, release | The slip follows the pointer. Track EMA vertical velocity. Release with upward speed > 160 px/s inside the Desk bounds = it flies into the slot (POST). Otherwise it springs back. Speed names the Delivery Style (6.2). **[SHOULD]** |
| Esc in WRITE | Retracts: textarea clears; the Box says it heard that too. In READ: skips the reading (Flat). In JAM: nothing. Esc never closes anything that is not open. |
| Space, or any key, or clicking/tapping BEAT, during READ | The beat tap (6.4). |
| 1 to 9 during APPLY (curtain up) or click/tap a Somewhere tile | Lobby: puts a thumb on that tile. |
| Tab while a ghost suffix is shown and the caret is at the end | Accepts the ghost (preventDefault only in that case; with no ghost Tab behaves normally so keyboard users are never trapped). A small real button "Accept (Tab)" shows beside the slip while a ghost exists for touch players. |
| Drag the Box horizontally, or J (keyboard stand-in) | Jiggle: shakes the Box. Only counts toward freeing a Dead Letter during JAM (6.7). |
| Click the Box | The Box says an 'oh' variant (speech tag). 25 clicks in 10 s = spam gag (10.2). |
| I / T (while an offer is up, not typing) or the buttons | Implement / Table the Box's suggestion (6.8). |
| Lean In button (beat 3+; also L when not typing) | Toggle: click once to start leaning in, again to stop (6.12). No hold semantics (the fuzz harness and keyboard players must be able to complete it). |
| V / Verify button (beat 4+) | The verifier walks the Wall (6.13). |
| Anonymous Slip No. 7 1/2 (a small button pinned to the Desk corner) | Rotating refusal lines; opens only after the certificate (11.4). |
| Any pointer move over the root | Box leans, eyes follow (6.1). |

Pointer events with `setPointerCapture` wrapped in try/catch. `touch-action: none` on the slip and the Box. `touch-action: manipulation` elsewhere.

## 5. Constants (put in one table at the top of the file)

All durations go through `dur(ms) = api.selftest ? Math.max(30, ms * 0.1) : ms`. Hit windows are NOT compressed.

| name | value |
|---|---|
| TEMPO (ms per word) | 380 (Gerald slips 520; `faster` word x0.75; `slower` x1.33; from `--tempoMul`) |
| READ lead-in | 1000 ms (a bell and a count-in) |
| MIN_WORDS / MAX_WORDS read | 3 / 14 (pad blanks with `Ahem`, cut long slips after 14 words with `and so forth`) |
| HIT / NEAR window | 140 / 260 ms (beat 9: 260 / 400) |
| POST | 500 ms (flick flight 450 ms) |
| LISTEN | 1200 ms |
| APPLY hop | 2400 ms, then 1000 ms settle |
| Flick release | > 160 px/s up flies; Airmail > 900 px/s; Ceremonial = slow push held 1500 ms at the slot |
| Jam | every 7th post from beat 6; jiggle total 400 px (each 100 px slides the slip 20 percent), 15 J presses (27 px each); rubber band reset after 4000 ms without progress; auto-resolve 30000 ms |
| Box suggests | every 3rd post from beat 7; offer auto-tables after 20000 ms; cursor trinket life 60000 ms, max 3 |
| Impact statement | every 5th post, beats 3 to 7, 4000 ms window **[COULD]** |
| Held Note | exactly 11000 ms (selftest 1100) |
| Idle | 60 / 120 / 180 s in WRITE (selftest 6 / 12 / 18 s) |
| Spam | see 10.2 |
| Confidence | `api.randInt(3, 97)`, printed through `Math.round`, checked `Number.isFinite`, else 71 |
| Applied-at | always the literal text `4:17 PM` |
| Opinion | `api.chance(0.02)`, guaranteed on lifetime post number 77, never on post 1 |
| Toast pops from slot | 1 in 40 on a post, only with toaster stats |

Under `api.selftest`: quotas become 1 post and min-seconds 0.5 (the fuzz harness then exercises every beat, the zoom-out and the ending in a normal 400-step run), idle thresholds shrink as above, all `dur()` compress.

## 6. Core loop (one slip, about 20 to 35 seconds): WRITE, POST, LISTEN, READ, APPLY

State machine `S.phase`: `intro | write | post | listen | read | apply | jam | zoom | mgmt | cert`. **Every phase change goes through ONE function** `go(phase)`: `S.runId++`, clear the phase timers (`S.timers.forEach(api.clearTimeout)`), set `S.phase`, `root.dataset.phase = phase`. Phase timers are created with `T(ms, fn)` which captures `const id = S.runId` and begins the callback with `if (id !== S.runId) return;` and uses `api.setTimeout`. Background things that must outlive a phase (idle interval, the Box's offer slip auto-table, cursor trinkets, the Perfect Suggestion flip, the awning, the 11 s Held Note is part of READ so it is phase-bound) have their OWN token and `api.setTimeout`/`api.setInterval`, never the phase guard (Risk 2). Each phase has exactly one exit path guarded by a `done` flag so a skipped reading cannot also finish naturally.

### 6.1 WRITE
- A slip sits on the desk with a real textarea (placeholder cycles every 6 s through the three placeholders in 14.C, via `api.setTimeout` chain, paused while the textarea has text). Focus the textarea on entering WRITE unless the pointer is coarse; if focus is lost to `body` when a phase disables the textarea, immediately focus the stage anchor (`tabindex=-1`) so keyboard events still land inside the root (Risk 1).
- The Word Drawer: 10 real `<button>` tiles dealt from a shuffle bag of about 64 words (14.AF), each with a random rotation -2 to 2 degrees and a coloured left bar; used tiles are replaced from the bag. Rare tiles (`abolish`, `Bernard`, `sandra`, `pink`, `darker`, `smaller`, `box`, `nothing`) are simply in the bag once each: a player assembling them is discovering secrets on purpose.
- The Box leans toward the pointer: on `pointermove` over the root compute `--lean = clamp(dx / (rootWidth/2), -1, 1) * 6` degrees (never non-finite) and eye pupils translate toward the pointer by up to 3px. The ear scales with slip length via `--ear` = `clamp(1 + 0.05 * min(words, 12) + 0.1 * bigReadings, 0.8, 2.4)` where `bigReadings` = Moved-or-better readings so far this career (cap 8), with a bouncy CSS transition. Gentle/loud reactions as in section 4.
- Box-written slips (beat 6+): when the textarea is empty and the player has posted at least 6 slips, a full grey ghost slip (3 to 6 words, drawn from the ring buffer weighted by use, formatted like a slip: lower case, no punctuation) is pre-filled in the ghost layer. Tab accepts (copies it in), typing replaces it, Enter or POST IT with an empty textarea POSTS the ghost slip. Line from 14.Q.
- Idle behaviour, see 10.1.

### 6.2 POST (500 ms)
Three ways, all equal: Enter, the POST IT button, FLICK. If the phase is not WRITE (or the Box is jammed or inhaling), the press is REJECTED (add a timestamp to the pressure list, 10.2; the Box says nothing, the button does a tiny shake). Accepted post: record the slip text; `S.n++` (lifetime, persisted); stats; the slip folds twice and flies into the slot; sfx `pop`; the Box nods (rotate 4 degrees).
- **Delivery Style** (stamp on the slip, changes only one line and one sound, never the score): button/Enter post = `Standard` (sfx `pop`); flick up to 900 px/s = `Limp` below 400 px/s (sfx `blip`) or `Crisp` 400 to 900 (sfx `pop`); above 900 = `Airmail` (sfx `whoosh`); slow push held at the slot 1500 ms = `Ceremonial` (the Box helps from inside, sfx `bell`, post takes 1.5 s). Style lines in 14.F. From beat 2 the style name is spoken as a one-line aside.
- Flick tracking: on pointerdown record y, t; on pointermove `dt = t - lastT; if (!(dt > 0)) return;` `v = (lastY - y) / dt * 1000` (px/s, up is positive); `ema = Number.isFinite(v) ? ema * 0.6 + v * 0.4 : ema`. The slip follows the pointer with `transform: translate(...)`. On release: if `ema > 160` and the slip centre is above the desk midline, POST; else spring back (CSS transition) with `Limp` not counted. `pointercancel`/`lostpointercapture` also spring back. Never leave a half-dragged slip when the phase changes.
- Special posts are classified here (section 9 and the classifier 8.3) BEFORE the slip enters LISTEN. The classifier runs on the normalized text (trim, collapse spaces, lower case).

### 6.3 LISTEN (1200 ms)
The Box leans toward the slot; the ear flaps; the slip is sucked in with a tiny slurp (`api.sfx('pop')`); the slot lamp pulses; a Listening Gauge (a small bar next to the Strip's Heard) fills to 100% instantly and stays there. The Box then ECHOES in the speech tag per the Echo ladder (8.2), and Management speaks the classifier reaction or a generic echo line (14.E / 14.G). Opinion roll (9.3) replaces the echo.

### 6.4 READ WITH FEELING (about 4 to 9 s)
Management reads the slip aloud. Build `words = text.split(/\s+/)` (strip empties, cut each to 14 characters, max 14 words, minimum 3 by padding with `Ahem`). Pulse time for word `i` is `T_i = readStart + LEADIN + i * tempo`. The status line shows the line `Management reads: <text>`. The Feeling Rail shows one chip per word; **the active chip gets class `on` (a CSS ring animation, restarted by removing and re-adding the class after `void el.offsetWidth`)**; advance the highlight with a timer chain scheduled from absolute time (`api.setTimeout(f, Math.max(1, T_i - api.now()))`), NOT cumulative drift. No rAF is needed here.

Judging a tap at time `t` (from `api.now()`): `j = clamp(Math.round((t - readStart - LEADIN) / tempo), 0, n - 1)`; if word `j` is already judged this is an EXTRA tap (counts toward over-emoting, no judgement); else `d = Math.abs(t - T_j)`: `d <= HIT` Hit (chip bold, scale 1.35, a 🎵 sparkles, sfx `tick`), `d <= NEAR` Near (no bold, half sparkle, sfx `blip`), otherwise Miss (chip droops 1px, sfx `buzz` at most once per 400 ms). Words never judged by the end count as Miss. A missing everything reading is allowed and has its own verdict (14.J).
- **Beat input de-duplication [MUST]**: BEAT button counts on `pointerdown`; keyboard counts on the root `keydown` (Space and Enter on the BEAT button call `preventDefault()` so no synthetic click follows); a `click` is accepted only if no tap was registered in the last 500 ms (this lets the fuzz harness's synthetic clicks count and real mouse clicks not double-count). Keys while READ (any key except Tab, Shift, Ctrl, Alt, Meta, Esc) are taps. At READ start move focus to the BEAT button (so key events keep landing inside root) and disable the textarea and tiles.
- Ratio `r = (hits + 0.5 * nears) / n`. Tier: `r < 0.20` Flat (mood neutral), `< 0.45` Earnest (proud), `< 0.70` Moved (proud), `< 0.95` Operatic (smug), else Perfect (confused; needs n >= 3). **Over-emoting [beat 3+]**: more than `2 * n` taps (extra taps included) in one reading stops the reading at once: Management goes silent for 3 s (sfx `sad`), then says an Unwell line (14.J), the tier is **Unwell** (awards 0, counts toward the spam secret). Before beat 3, extra taps are simply "appreciated and not counted" (14.J). Esc skips: line "Skipped. Read with feeling on your behalf: none." and the tier is Flat with no award.
- After the tier line Management says the meter line with `%PCT = Math.round(r * 100)`. Bonus Meh (section 12). Operatic and Perfect trigger the **Held Note** (8.6) in beat 3+.
- Kinds of reading using this same machinery: `slip` (the player's), `demo` (beat 1, no tier awards, one 0.5 Meh on the first Hit ever), `freed` (the tender Dead Letter text), `cameo`, `note` (Somewhere reply), `self` (the idle Box's slip: hits auto-computed as 100%, no awards), `mgmt` (beat 9, 11.2). Notes and cameos use the Gerald/note tempo given in their entries.
- Hit chips: the words stay bold in the finished Rail until the next WRITE (the Rail is the scoreboard that scores nothing).

### 6.5 APPLY (2400 ms hopping, then a 1000 ms settle) [MUST]
1. The slip is stamped `Reviewed by Sandra` (S in a circle, sfx `stamp`). **[COULD]** every 5th post in beats 3 to 7 a 4 s Impact Statement strip shows three real buttons `Minimal`, `Minimal`, `Minimal (Proud)` first; any click or the timeout proceeds (skipping is "noted"; nothing is gated).
2. **Before beat 4 the Wall is behind the curtain.** The marker still hops, but on the curtain's front (three bouncing dots) and Management says a curtain line (14.M). The slip is still applied to a tile (chosen by the weighted rule below) and its sticker is placed behind the curtain. At the beat 4 reveal the earlier stickers are already there (payoff). Lobbying is disabled behind the curtain (pressing 1-9 gives "Your thumb has nowhere to be.").
3. From beat 4: a coral-outlined marker hops tile to tile like a slot reel, fast then slow (about 12 hops; hop `k` fires at `2400 * (k/N)^2` ms). While it hops the player may LOBBY: click, tap or press 1 to 9 on a tile (one thumb at a time; a 👍 sits on the tile and the tile pulses; pressing again moves it). The final tile is decided when the marker lands: if lobbied, 1 time in 3 (`api.chance(1/3)`) it lands on the lobbied tile (stat `lobbyWon`, +0.3 Meh, lobby-win line), otherwise on a random neighbour of it (up to 8 neighbours, Close Enough line, stat `lobbied`). If nobody lobbied it lands on a random tile weighted toward the least applied: weight `= (maxCount - count + 1)`.
4. The landed tile receives the slip as a tiny paper sticker (first 14 chars of the text) plus a caption: `Applied to %TILE at 4:17 PM. Confidence: NN%, <probably label>` (gag 8.1). Applied counter +1, +1 Meh, sfx `ding`. Growth by this tile's count: 1 sticker; 3 a 🎩 hat (a different hat emoji per tile: 🎩 🧢 👒 alternating) and, from beat 4, the tile files an **Impact Report** every 3rd application on it: a short Management line in beats 4 to 7 (14.N), and in beat 8+ a NOTE that must be read (6.9); 5 a CSS pennant flag; 8 the tile is renamed in a wobbly hand (CSS cursive font with `filter:url(#sb-wobble)`; the rename table is in 14.N); 12 the tile is renamed after the player (`%PLAYER's Somewhere`).
5. Special tile rules: `Tuesday (Approx.)` accepts nothing for real: its caption says `Declined. You are marked Tentative.` and stat `tentative`. `Somebody's Lunch` receives every Toaster slip (8.9).
6. After the settle, `afterApply()` pops the incoming queue (cameos, notes, 6.9) or, if empty, returns to WRITE. Check the beat advance (section 7).

## 7. Beat timeline and quotas [MUST]

A beat is a set of unlocks plus a quota. `S.beat` starts at 1. The beat advances when `postsThisBeat >= quota` AND `elapsedInBeat >= minSeconds`, checked after each APPLY (never mid-phase) and announced by the beat's Management line; the new beat's features activate from the next WRITE. Beats 9 and 10 are scripted segments. Careers halve quotas: `q = Math.max(2, Math.ceil(base * Math.pow(0.5, career - 1)))` and `minSeconds = Math.max(15, minSeconds / 2^(career-1))`.

| Beat | Rough time | Quota / min seconds | What turns on (plus the entry line) |
|---|---|---|---|
| 1 THE LEANING BOX | 0:00 to 0:20 | first real post | See 7.1. The slip in the slot, a free demo reading, the first mechanic (the beat) inside 10 seconds. |
| 2 THE ECHO | 0:20 to 1:00 | 3 posts / 40 s | Echo ladder (8.2), Delivery Style names, real tier names spoken, Third Ficus line 1 ("mentioned"). After two posts the echo also echoes Management's last word. |
| 3 FEELING TIERS | 1:00 to 2:00 | 4 posts / 60 s | Over-emoting and the Unwell bank, Held Note (Operatic), Feeling Ledger in the Strip ("Feelings Delivered: N", units feelings, then moods after 10, then weather after 25), big ears (one size per Moved-or-better reading), Lean In unlocks, Impact Statement, Ficus line 2 ("aware"). |
| 4 SOMEWHERE | 2:00 to 3:00 | 4 posts / 60 s | The curtain rises (whoomp, pulley string), lobbying, Close Enough, Implementation Rate: Probably appears, Verify unlocks, Impact Reports as lines, Ficus 3 ("thanked"). |
| 5 THE BOX FINISHES YOUR SENTENCES | 3:00 to 4:00 | 4 posts / 60 s | Ghost text, second (mirrored) ear, the slot lamp dims to a reading-lamp glow (`--listen` .55), Ficus 4 ("on the committee"), first tile hat becomes reachable. |
| 6 THE DEAD LETTER AND SANDRA | 4:00 to 5:15 | 5 posts incl. the jam / 75 s | Box-written slips pre-fill, every 7th post jams, "Sandra Has Read: 0" appears in the Strip, Ficus 5 ("recused"). |
| 7 THE BOX SUGGESTS | 5:15 to 6:30 | 5 posts / 75 s | Every 3rd post the Box pushes a slip out to you (Implement/Table, hats on the cursor), cameos (Gerald, Brenda, Toaster, Rock, Sock) arrive in the slot. Quiet bonus: none. |
| 8 THE SOMEWHERES WRITE BACK | 6:30 to 8:00 | 5 readings / 90 s (slips and notes both count) | Notes from tiles with 3+ applications queue (max 3) and are read with feeling; the Wall is a feedback loop; Verifier returns with the right ficus (8.7); Ficus 6 ("thriving", Dennis). |
| 9 THE BIGGER BOX | 8:00 to 9:30 | scripted | Section 11.1 to 11.2. Awards 5 once. |
| 10 BACK TO NORMAL LIKE NOTHING HAPPENED | 9:30 to 10:00 | scripted | Section 11.3 to 11.5. Loops to beat 2, `career++`. |

Real play is about 12 to 14 minutes (a slip takes 20 to 35 s so quotas dominate the minimums). That is fine: "about ten minutes" is the unit, not the law.

### 7.1 Beat 1 script [MUST]
- t = 0 (mount): `go('intro')`. Management says line `A1` immediately (`priority: 1`). The Box is already leaning toward the pointer (default `--lean` 0, eyes toward centre) and **Anonymous Slip No. 7 1/2** is poking out of the slot half way.
- t = 1.2 s: the ear flaps once; the Box tag says `A5`. 
- t = 2.5 s: the slip pops out onto the desk; sfx `pop`; Management says `A2`; READ (kind `demo`) starts with text `Please read me.` (exactly 3 words): the Rail previews itself on that one slip. The player can already tap Space. Hit sparkles, no tier award. Management says the `A3` line while the reading lands.
- t = about 8 s: the reading ends, a one-line how-to is shown ONLY in the status line: `Type a suggestion, or click words. Press Post it. Then keep time with Space.` -> WRITE. The textarea is focused (not on coarse pointers).
- Resume (a saved beat >= 2): skip the demo, curtain already up if beat >= 4 (no flourish), Management says a line from 14.B.

## 8. Systems

### 8.1 GAG 1: Probably
Every application caption ends in a Confidence percentage and the word `probably`, which escalates with the global Applied count `A` (lifetime, from save): `probably` (1 to 4), `probably (technically)` (5 to 9), `probably (definitely)` (10 to 14), `probably, retroactively` (15 to 24), `probably, and also last Tuesday` (25 to 39), `probably, as per the one before` (40 and up). The Implementation Rate in the Strip never changes from `Probably`. Exceptions: the Opinion (9.3) is applied `definitely` and the Rate flickers `Definitely` for 1 s; Verify before anything has been applied flickers `Verified` for 1.5 s (14.V); the Perfect Suggestion (9.4) hits 100 for one tick; the ending dial rolls to 100% and returns to Probably. Callback at the end: the last slip of the module (the Applied-to-you sticker) says `probably` with no percentage at all. The flicker is one helper `flickRate(text, ms)` that swaps the text and restores it via a separate-token `api.setTimeout`.

### 8.2 GAG 2: The Echo (the speech tag under the slot)
The Box echoes quietly, lower case, in the speech tag after each post. Escalation by lifetime post count `n`: posts 1 to 4: the LAST WORD of your slip (`%WORD`); posts 5 to 8: the last word of Management's closing tier line of the PREVIOUS reading, doubled like `soup. soup.` (compute it from the last spoken tier line: lower case, last word with its period, repeated twice); posts 9 to 14: your SILENCE (the tag shows `...` for a full second); posts 15 and up: what you are about to type, using the ghost's best guess for an empty prefix (fallback `...`). In beat 10 it echoes `please read me` at the first slip and after the certificate `heard`, then softer `welcome`. The echo never changes tone; it just keeps getting more correct. Keep the tag's text through `fill()` so no raw token or empty string shows (an empty echo shows `...`).

### 8.3 The classifier (pure function `analyze(norm, raw)`, first match wins)
Order: empty (blank or whitespace) / nothing-secret / special-word exact matches (9.5) / accidental-real words (9.6) / abolition (9.7) / tiny (<= 3 chars) / question (`?`) / box mention (`box`) / sandra (substring) / dennis,plant,ficus / gerald,potato / toast / tuesday / rock / stapler / please / repeat of an earlier slip THIS mount (compare normalized text) / all caps (>= 4 letters, none lower) / exclamation (`!`) / long (>= 70 chars) / generic. Each keyword has a **90 s cooldown** (module clock `api.now()`); on cooldown it falls through to generic. Each type has its own bank in 14.G; generic uses the Echo bank 14.E (never the same bank twice in a row; shuffle bag per bank). The classifier output only chooses which Management/Box lines to say; it never changes scoring (except the secrets).

### 8.4 Listening Level and ears **[SHOULD]**
`level = Math.min(8, Math.floor(Math.sqrt(n)))`, plaque title ladder in 14.L. Leveling up at 2, 3, 5 and 8 says a level line. **[COULD]** from level 3, up to 5 tiny 👂 emoji spans orbit the Box at fixed angles, each twitching on its own keyframe delay (never in sync). They all turn away at once in beat 9 (a courtesy).

### 8.5 Feeling Ledger **[SHOULD]** (beat 3+)
Strip item `Feelings Delivered: N` where N counts readings with tier >= Earnest; unit word `feelings` (N < 10), `moods` (10 to 24), `weather` (25+). On the unit change Management says a ledger line (14.L). **[COULD]** a 140x30 canvas sparkline of Feeling percent over the last 20 readings (clear and redraw on each reading, no loop).

### 8.6 The Held Note (GAG 4, from Pitch 3's Opera) [SHOULD]
When a reading's tier is Operatic or Perfect (beat 3+), Management holds the last word: a bar under the Rail fills over exactly **11 seconds** whatever the slip length (selftest 1.1 s), the Rail's last chip waves (CSS wave per letter batched into one span, no per-letter DOM), and any key, click or Esc ends it early (nothing penalised). It is part of READ so the phase guard covers it. Escalation counter `S.heldN` (per mount): use 1 to 2: lines `K1` and `K2`; after 3 uses an **intermission** (a tiny curtain closes over the Rail for 1 s and a 🍞 snack appears; `K3`); after 6 uses `K4` (three acts, act labels flash); after 10 `K5`. If the slip contains the word `short` Management says only `No.` and it is STILL eleven seconds. Stat `heldNotes`; achievement `suggestion-box.operatic` on the first Operatic.

### 8.7 GAG 3: 4:17 PM, the Third Ficus, Sandra
The Applied-at stamp is always `4:17 PM near the third ficus`. Three clocks disagree with total confidence: the Box plaque clock reads 4:17, the Wall clock reads 4:17, the Strip clock reads 7:30. Each beat adds one detail to the ficus (lines in 14.P; the ficus never speaks): mentioned (beat 2), aware (3), thanked (4), on the committee (5), recused (6), thriving with a Dennis cameo (8). Sandra: tape, `Sandra Has Read: 0` runs alongside as a second gag; the number never changes, the parenthetical does: `0`, then after each Dead Letter `0 (reread)`, `0 (reread, twice)`, `0 (reread; she is thorough)`, then stays; posting exactly `sandra` makes it `1 (technically)`. Verify returns with the right ficus in beat 8 (14.V).

### 8.8 Ghost listening (beat 5+) [MUST]
A ghost layer sits behind the transparent textarea with identical font, padding, `white-space: pre-wrap`, `word-wrap: break-word`, `overflow: hidden`; its content is `<span class=hidden>typed text</span><span class=ghost>grey suffix</span>` so the suffix lines up after the caret. Ghost source: (a) a ring buffer of the last 40 words you have posted (strings of length 2 to 14, letters and apostrophes only, lower case, sanitized on load) with use counts, plus a built-in bank (14.AF second list) at weight 0.3; (b) a memory of the last 6 posted slips (sanitized, <= 80 chars). Rules: only when the caret is at the end. If the typed text is a prefix of a remembered slip, the ghost is the REST OF THAT SLIP. Otherwise take the word being typed (after the last space); if non-empty, the best-weighted candidate starting with it (suffix plus a space); if empty (just after a space), the single most used word that is not the previous word. Early on it is wrong in an endearing way; the weights make it uncannily right. Tab or the Accept button takes it (`ghosts` stat). Accepting 5 ghosts in one mount pays +0.5 Meh and a line (14.Q). Wrap every read of the ring buffer in `Array.isArray` and string checks.

### 8.9 THE JAM (the Dead Letter) (beat 6+) [MUST]
On the 7th post of every cycle of 7 (lifetime `n % 7 === 0` from beat 6), after POST the slot JAMS instead of LISTEN: `go('jam')`. The slip sticks halfway out, tilted (transform-origin at the slot), with Sandra's tape band over the slot; Management says `R1`. Posting is blocked (rejected presses go to the pressure list). To free it: JIGGLE the Box: dragging it horizontally accumulates `Math.abs(dx)` between pointermoves (ignore non-finite, cap each step at 60 px) up to 400 px; each 100 px the slip slides out 20 percent, the Box says an 'oh' variant and its eyes wobble (sfx `boing`); or press J: each press adds 27 px. If progress stops for 4 s, the total resets (the slip slides back in; `oh... no`). The jam auto-resolves after 30 s (selftest 3 s) with `R5`. When freed the slip drops onto the desk with `R3`, +5 Meh (once per jam; stat `jiggled`, `jams`), and its text is replaced by a TENDER line from 14.R (the Box kept the real slip; the real slip still counts as posted). Management reads it with feeling as a free reading (`freed`, no tier award), then it is applied like any slip. Achievement `suggestion-box.deadletter` (secret). Sandra counter parenthetical advances.

### 8.10 THE BOX SUGGESTS TO YOU (beat 7+) [MUST]
Every 3rd post (`n % 3 === 0`, not on a jam), as the next WRITE begins, the Box pushes a slip OUT of the slot onto the desk. It reads a small imperative (14.S) and is signed `Yours sincerely, the Box`. Two real buttons, Implement (key I) and Table (key T). **Implement** applies it to YOU: a visible harmless cosmetic: a tiny 🎩, 🧢, 👓 or 🕶️ (random) trails your cursor at a 14px offset for 60 s (max 3 at once; all live in ONE `.cursor` container; position updated from the root `pointermove` handler as `x - rootRect.left + 14`, `y - rootRect.top + 14` with `Number.isFinite` guards; `transition: left 80ms, top 80ms`), plus a `Posture: Pending` badge. **Table**: a tiny CSS stapler sits on a pile of tabled slips (cap 5 visible). Either way +0.5 Meh and `implemented` / `tabled` stats. Ignored for 20 s (selftest 2 s) it auto-tables with a line. The offer has its own token so it survives phase changes; a new offer replaces an unanswered one (auto-tabling the old one first).

### 8.11 Incoming queue, cameos, notes [MUST for notes, SHOULD for cameos]
`S.queue` holds incoming readings `{kind, text, head, tempo, tile, sticker}`; `afterApply()` pops one and runs READ then (if it has a tile) APPLY, chaining at most 3 per cycle, then returns to WRITE.
- **Notes (beat 8+)**: when a tile's application count hits a multiple of 3, push its note (14.U) (max 3 queued). Management says the `head` line, then the `text` goes on the Rail and you tap along with the same tiers. A reply is also a suggestion: when a note is applied it goes to a random neighbour tile ("The loop has been described as healthy.").
- **Cameos** (once per mount each, max one per cycle, from beat 7): Gerald if `metGerald` truthy, tempo 520 (14.T); otherwise once a plain brown potato-smudge slip. Brenda if `complaints-dept.filed` > 0 (a tiny 🥪 attached to the slip), beat 7 or 8. Toaster if toaster stats > 0 in beat 8: the slip is shaped like a slice, always applied to `Somebody's Lunch` regardless of lobbying with the caption `Applied. Warm.`; 1 in 40 a toast pops out of the slot instead with a `ding`. Rock if `complaints-dept.rockMet`: a blank grey slip. Sock if `sockSeen` (rare, 1 in 8 cycles after beat 7): `Still travelling.`
- Cameos do not set flags.

### 8.12 Lean In (beat 3+) [SHOULD]
The ear button toggles listening: a conic ring fills over 1.2 s (`--listen` rises), then plays one OVERHEARD line from a shuffle bag of 13 (14.W) and ends (+1 Meh, stat `leaned`; achievement progress). Clicking again before the ring is full: `You leaned out.` Staying in it past 4 s without it ending is impossible (it ends at 1.2 s); instead the 14th overheard line is a rare event: after all 13 have been heard in this save, the next Lean In plays the muffled 1994 meeting (14.W last). Holding is NOT required (toggle only). Auto-cancel on phase change, blur, Esc. The Lean In button disables during READ, APPLY, JAM.

### 8.13 Verify (beat 4+) [SHOULD]
Button/V: at most 3 uses per 60 s. A 🕵️ walks onto the Wall (CSS `left/top` transition 1.2 s steps), stops on a WRONG tile (never the tile it names), reports (14.V). Before anything has been applied it reports the Verified gag. Beat 8 and after, once: it comes back holding the right ficus.

### 8.14 Reviewed by Sandra, the Strip, the Heard gauge
Strip items (wrap at 360px): `Heard: 100%` (never changes), `Suggestions In: N` (lifetime posts this career), `Applied: N`, `Implementation Rate: Probably`, `Sandra Has Read: 0` (beat 6+), `Feelings Delivered: N <unit>` (beat 3+), the 7:30 clock, footer `Career N` (and from career 2 `Career 2 (continued from Career 1, one slip ago)`). Every number goes through one safe formatter `num(x) = Number.isFinite(x) ? api.fmt(Math.max(0, Math.round(x))) : '0'`.

## 9. Secrets and rare events [MUST]

### 9.1 Secret index
| id | trigger | payoff |
|---|---|---|
| Long Idle | 60/120/180 s in WRITE with no input | 10.1 |
| Slot Congestion | 8 posts in 60 s, 15 rejected presses in 10 s | 10.2 |
| The Opinion | 1 in 50 posts (guaranteed on lifetime post 77, never post 1) | 9.3 |
| The Perfect Suggestion | posting `nothing`, `no suggestions`, or 3 blank slips in total | 9.4 |
| Bernard | posting exactly `Bernard` | 9.8 |
| Special words | exactly `sandra`, `tuesday`, `please read me` | 9.5 |
| Accidentally real | whole word `pink bigger darker smaller faster slower` | 9.6 |
| The Abolition | `abolish`, `remove the box`, `get rid of the box`, `delete the box` | 9.7 |
| The Dead Letter | every 7th post, jiggle free | 8.9 |
| Narrow room | root narrower than 500px | once per mount line |
| 1 in 40 toast | toaster stats, a toast pops out | 8.11 |
| The 1994 meeting | Lean In after all 13 overheard | 8.12 |

### 9.2 Special post sequencing
Special words are matched on the NORMALIZED WHOLE slip text (exact, not substring) so ordinary slips are not hijacked; keyword reactions are substring/whole-word with the 90 s cooldown.

### 9.3 THE OPINION
Instead of the normal echo, the Box says one genuine, kind, specific piece of advice about the PLAYER, not the slip (14.Z Opinion bank). It is applied `definitely` (the only Definitely), the Rate flickers `Definitely` for 1 s, it pays 10 Meh once per mount and 2 Meh after that, stat `opinions`, achievement `suggestion-box.opinion` (secret). It is the only line in the module that is not a joke, so there is no joke before or after it, only the request to carry on `as if that were an ordinary Tuesday`. On lifetime post 77 the guaranteed variant is the Box's letter (`Dear Valued Employee...`) instead; both pay the same; the letter pays +7.5 once. The Dial (the Rail meter) greys for 7 s out of respect and Management stays silent.

### 9.4 THE PERFECT SUGGESTION
Posting exactly `nothing` or `no suggestions` (case and punctuation insensitive), or the third blank slip in total (lifetime `silences`), makes the Box moved to its core: Management stays silent for exactly 7 1/2 s (selftest 0.75 s; show `...` in the status line), the Rail reads `Nothing`, then `That was nothing. It was the best one so far.` For 12 s (own token) every sticker caption on the Wall flips to `Applied to: everything. Definitely. Everywhere.` with a gold `IMPLEMENTED (FOR CERTAIN)` stamp (class on the root: `m-suggestion-box-gold`, CSS only), the Implementation Rate hits `100` for one tick, then everything returns to `Probably` as though nothing had happened. Achievement `suggestion-box.empty` (secret), stat `silences` increments on every blank post.

### 9.5 SPECIAL WORDS
`sandra` exact: the slip arrives back with red tape and the line `Sandra has read your suggestion...` (14.Z); the Strip counter becomes `1 (technically)`. `tuesday` exact: the Wall goes dim for 1 s (CSS class), the Tuesday (Approx.) tile accepts the slip, `Tentative`. `please read me` exact (one-time per save, `save.egg`): the very first slip is read back in full, with feeling, tapped for the player (auto-hit), and Management says the line in 14.Z.

### 9.6 ACCIDENTALLY REAL (the module changes itself)
Whole-word match (any slip containing it, one trigger per post, 90 s cooldown each): `pink` recolours `--accent` to pink for 30 s; `bigger` raises the root font-size 12 percent for 30 s; `darker` dims the module backdrop (`--dim`) for 30 s; `smaller` sets `--small` to .85 on the Box for 30 s; `faster` / `slower` change `--tempoMul` to .75 / 1.33 for the next 30 s of readings. All via CSS variables on the ROOT only (never `body`). Management insists it is a coincidence and asks Sandra (14.Z). Restore via a separate-token `api.setTimeout` (and on destroy nothing is needed; the root is removed).

### 9.7 THE ABOLITION
A slip containing `abolish`, `remove the box`, `get rid of the box` or `delete the box` triggers the Box to implement it at once: it shrinks to a smaller box inside itself (CSS animation 800 ms on `--abol`, slot and ear scale with it), the plaque top line becomes `SUGGESTION BOX (SMALLER)`, and the Box keeps working, slightly smaller each time (up to 5 times, then it is the size of a matchbox with a pulsing ear). Plaque ladder: `(SMALLER)`, `(SMALLER STILL)`, `(MUCH SMALLER)`, `(ALMOST A BOX)`, `(MATCHBOX)`. Stat `abolished`, achievement `suggestion-box.abolish` (secret, on the first). Transform composition: the Box's transform is `rotate(var(--lean)) translateY(var(--lift)) scale(calc(var(--abol) * var(--small)))`, only ever changed through variables (Risk 4).

### 9.8 BERNARD
Posting exactly `Bernard` (any case, trailing punctuation ignored) is the Box's one unscripted emotional moment: it turns pink, the ears fold, Management says (14.Z) and the plaque permanently shows `Bernard` (save `bernard: 1`) with a small heart that is not a heart, just a smudge in a good mood (a CSS shape). Wrong name guesses via the classifier (a one-word slip that is one of `frank`, `gary`, `susan`, `kevin`, `linda`, `tom`, `mary`, `bob`) get the gentle wrong-name line. Achievement `suggestion-box.bernard` (secret).

## 10. Idle and spam behaviour [MUST]

### 10.1 Long idle (WRITE only)
ONE managed interval (`api.setInterval`, 1000 ms) compares `api.now() - S.lastInput` to the thresholds 60/120/180 s (selftest 6/12/18) while `S.phase === 'write'`; any `pointerdown`, `keydown` or `input` inside root (registered with `api.on(root, ...)`) sets `S.lastInput` and clears the sleepy state. Each threshold fires once per idle spell (flags reset on input).
- 60 s: the Box lowers its lamp (`--listen` low), shrinks its ear to a polite size (`--ear` .8) and says `X1`.
- 120 s: the Box posts a slip to ITSELF (`Is anyone there?`; a slip animates from the Box into its own slot), Management reads it with feeling as a free reading (kind `self`: the Rail runs by itself, hits computed as 100%, no awards) and it is applied to the Box (a tiny sticker on the Box chin). Line `X2`.
- 180 s: the Box applies a suggestion to the player (`X3`), pays 2 Meh, `idleBreaks` +1, achievement `suggestion-box.quiet` (secret). The eyes close (class `sleepy`).
- Any input after 60 s: one line `X4` (cooldown 120 s).

### 10.2 Spam
Maintain `S.pressure`, a list of timestamps (trim to the last 20 s). Push on: rejected POST attempts (any POST/Enter while the phase is not WRITE or the Box is jammed), BEAT presses outside a reading, and Box clicks. Also `S.postTimes` (posts).
- **Slot Congestion**: triggered by 8 posts within 60 s, or 15 pressure entries within 10 s. The slot jams for 4 s with a pop (`api.sfx('pop')`), the Box coughs a fan of blank slips onto the desk (up to 6 tiny div slips falling with a CSS animation, removed after 3 s via a separate-token timer), Sandra's **Overflow Fee** of 0.5 Meh is announced (`api.award(-0.5, 'Overflow Fee')` once per mount, balance clamps at 0; stat `overflows`), the Box puts up a `ONE AT A TIME (SUGGESTION)` plaque for 12 s (own token), and the next post of any kind is accepted only after the Box takes a breath (a 2 s inhale animation; `S.breathUntil`). The second Congestion in a mount makes the Box sneeze (`api.confetti` small, `honk`) and unlocks `suggestion-box.overflow` (secret). Congestion has a 20 s cooldown so spam does not chain. While congested the pressure list is cleared.
- **Clicking the Box 25 times in 10 s**: the Box says `oh` 25 different ways (a shuffle bag of 10 variants, 14.Y) and then asks politely to be left alone, `a suggestion` (14.Y). Single Box clicks just say the next 'oh' variant (rate limited to one per 400 ms). Does not trigger Congestion.
- **Spamming BEAT during a reading** is over-emoting (6.4): beat 3+, Unwell. Before beat 3 it is gently ignored.
- Rapid tile clicks are fine (each is a normal tile use, capped by the shuffle bag); only the stat `tilesUsed` grows.

## 11. THE NOT-ENDING (beats 9 and 10) [MUST]

### 11.1 Beat 9: THE BIGGER BOX (strangely touching), about 90 s
- Entry: `go('zoom')`. The whole inner grid zooms out (`--zoom` 1 to .55 over 700 ms; reduced motion crossfades): the Box and the Wall are sitting inside a bigger cardboard box labelled `SUGGESTION BOX (MANAGEMENT)` with a bigger slot (the `.big` frame's chrome fades in). The inner grid becomes inert (`pointer-events: none`, `aria-hidden`, and its tab stops set `tabindex=-1` for the duration). Music: none. The Box's ears all turn away (a courtesy). Lamps dim. Line `Z1`, then `Z2`.
- A plain slip comes out of the BIG slot (it lands in `.mgmt`). Management says it has never posted a suggestion of its own (`Z3`). `.mgmt` has its own read-only slip div, its own 10 tiles (Management's words, 14.AF third list: sooner, home, slightly, everyone, earlier, softly, kindly, perhaps, we, could, all, go, a, bit, quietly, together, gently, maybe, today...), a Reshuffle button and a `Post it quietly` button. Tiles append to Management's slip (cap 80 chars). Enter on a focused control posts. If posted with fewer than 3 words it is padded with the default `Perhaps we could all go home slightly earlier`. Auto-post after 45 s (selftest 4.5 s) if you do nothing (a deliberate fuzz-safety).
- **The hushed reading**: READ kind `mgmt` at tempo 560 ms/word, the Rail dimmed (class `hushed`, opacity .6), **tap windows widen to 260/400 ms**, `NO Unwell`: spamming is gently ignored (`Z6`), no tier line and no tier award, sfx only `tick` at low volume (use `api.sfx('tick')`, nothing louder), the status line shows the slip in small type. Then Management says `Z4`.
- It is applied `somewhere kind` (`Z5`), a mini sticker appears on the BIG box (not a tile), +5 Meh once per save (`save.b9paid`), stat `boxes` +1.
- **Quiet**: 20 s (selftest 2 s) of nothing: no say, no sfx, no input needed, the Box says nothing; at 8 s the status line says `Z7`; at 15 s `Z8`. Any input is simply ignored. The segment auto-resolves.

### 11.2 Beat 9 to 10 transition
The camera zooms back in (`--zoom` .55 to 1, 700 ms). `go('cert')`.

### 11.3 Beat 10: back to normal (about 30 s)
- The Certificate of Having Been Heard fills the desk (a ribbon, `%PLAYER`, `Suggestions In: N`, `Applied: N`, `Implemented for certain: 0`, `Suggestion of the Year: %FIRST (implemented in a drawer)`, and a signature already signed `S`): text in 14.AB. +10 Meh once ever (`save.cert`), fanfare, small confetti, achievement `suggestion-box.certified`, flag `suggestion-box.certified`.
- The Implementation Rate dial rolls to 100% with a drum roll (a 1 s counter animation), hesitates, and reads `Probably`. Management says `AB2`.
- The Box leans toward the cursor exactly as in the first second. The first slip is in the slot again, half out: `Please read me.` The Wall is back behind its curtain, but ONE tile (the tile with the fewest applications, lowest index on ties) now reads `Somewhere (You Are Here)` with 0 applications and a very small, very patient sticker that says `Applied to you, probably.` (no percentage). The Box's tag says `heard`, then softer `welcome`.

### 11.4 Anonymous Slip No. 7 1/2
Before the ending, clicking it gives rotating refusals (14.AC). From the certificate on, clicking it opens it once per save (`save.dennis`, stat `dennisRead`): `AB5`. Then, with no transition, the Strip footer reads `Career 2 (continued from Career 1, one slip ago)` and the module is back in WRITE.

### 11.5 Loop
`career++`; `S.beat = 2`; all unlocks stay; quotas halve (section 7); the echo ladder continues (it never resets). The module never ends. From career 3 the footer reads `Career 3 (continued from Career 2, one slip ago)` and so on. Achievement `suggestion-box.lap` on reaching Career 2.

## 12. Rewards, stats, achievements, persistence

### 12.1 Awards (all tiny; the game says so; never over 50 in one event)
Post 0.5 (first of a mount 1); tier bonus Flat 0, Earnest 0.5, Moved 1, Operatic 2, Perfect 3, Unwell 0; apply 1; lobby win 0.3; dead letter freed 5; Implement 0.5; Table 0.5; ghost bonus (5 ghosts) 0.5; Lean In overheard 1; Opinion 10 once per mount then 2; Opinion letter 7.5; idle break 2; beat 9 helped Management 5 once per save; certificate 10 once per save; Slot Congestion fee -0.5 once per mount (cosmetic); demo first Hit 0.5. Management says the tiny-reward truth once, early: `A1b`.

### 12.2 Stats (all `suggestion-box.`)
posted, echoes, hits, nears, misses, readings, flat, earnest, moved, operatic, perfect, unwell, applied, lobbied, lobbyWon, tentative, ghosts, jams, jiggled, implemented, tabled, silences, tilesUsed, idleBreaks, overflows, boxes, opinions, abolished, heldNotes, leaned, verified, dennisRead, careers. Use `api.stat.max('suggestion-box.bestTier', tierIndex)`. At most about 40 distinct names (limit is 300).

### 12.3 Achievements (declare with `P.addAchievements`, ids exactly these, >= 6 and >= 2 secret)
| id | name | desc | secret | reward |
|---|---|---|---|---|
| `suggestion-box.first` | Grand Archduke of Unsolicited Input | Post your very first slip. The Box has no opinion, only attention. | no | 1 |
| `suggestion-box.heard10` | Honorary Chancellor of Being Heard (Technically) | Sit through 10 readings with feeling. Management is still recovering. | no (stat check `suggestion-box.readings` >= 10) | 3 |
| `suggestion-box.operatic` | Laureate of the Held Note | Achieve an Operatic reading by keeping the beat. The note was soup. | no | 4 |
| `suggestion-box.somewhere` | Supreme Custodian of Somewhere | Have a suggestion applied to every one of the nine Somewheres. Probably all of them. | no (manual, when all 9 tile counts >= 1) | 5 |
| `suggestion-box.deadletter` | Dowager Empress of the Stuck Slip | Jiggle the Box until the Dead Letter drops free. It was waiting to be asked. | yes | 5 |
| `suggestion-box.quiet` | Eternal Warden of the Quiet Slot | Say nothing for three whole minutes. The Box said it for you, and meant it. | yes | 5 |
| `suggestion-box.empty` | Emperor of the Empty Envelope | Post 'no suggestions' or three blank slips. The only suggestion ever fully implemented. Probably. | yes | 5 |
| `suggestion-box.bernard` | Bernard's Most Trusted Confidant | Say the Box's name. It was behind the smudge the whole time. | yes | 5 |
| `suggestion-box.overflow` | Overlord of the Overflow, Keeper of the Chewed Slot | Jam the slot with spam until the Box sneezes. Bless you, said Management, in the wrong register. | yes | 3 |
| `suggestion-box.opinion` | The Only Honest Slip | Receive a genuine opinion from the Box. It is the only line here that is not a joke. | yes | 5 |
| `suggestion-box.abolish` | Minister of the Smaller Box | Abolish the Box. It is still here. It is smaller. | yes | 3 |
| `suggestion-box.certified` | Holder of the Certificate of Having Been Heard | Finish a career. You have been heard. The hearing continues. | no | 10 |
| `suggestion-box.lap` | Career Two, Continued From One Slip Ago | Begin a second career without having noticed the first one end. | no | 2 |

Icons: pick from the verified emoji list in section 0 (for example 📮 👂 🎶 🌿 📎 🕰️ 🥔 🍞 🧦 ☁️ 📌 🅿️ 🥪).

### 12.4 Persistence (`api.save`, target < 2 KB, always read with defaults and sanitize)
Keys: `beat` (min(beat, 9)), `career`, `n` (lifetime posts), `ring` (array of up to 40 `[word, count]` pairs or two parallel arrays; strings 2 to 14 letters/apostrophes only), `slips` (last 6, each <= 80 chars), `tiles` (9 integers 0 to 9999), `silences`, `first` (first real slip text, <= 100 chars; if the first post was blank use `a bigger box`), `bernard` (0/1), `egg` (0/1), `dennis` (0/1), `cert` (0/1), `b9paid` (0/1), `applied` (lifetime). Save after each APPLY, on beat change and in `destroy()`. Resume: with a saved `beat >= 2` Management says a resume line; the Wall is already uncurtained if `beat >= 4`.

## 13. Visual design [MUST]

PALETTE (cheerful dysfunctional intranet, matches the Lobby): cardboard `#C9A26B`, dark cardboard edge `#8F6B3A`, slot black `#1E1A16`, mustard lamp `#F2B134`, paper slip `#FFF8E0` with blue ruling `#B7C9E8` and a margin line `#F08A80`, ink navy `#23304A`, coral `#FF6B5E` (focus ring, stamps, marker), mint `#7FD1AE`, lilac `#B9A4E6`, ficus green `#4C8F5A`, wall paper cream `#FBF3DE`, hat/gold `#C9A227`. Chunky 3px navy outlines and 4px-offset sticker shadows on every card. System fonts; slip handwriting `'Segoe Print','Bradley Hand',cursive` 17px. Light only (the Lobby is cream); no dark mode required.

THE BOX is pure CSS: a front face (cardboard gradient plus `repeating-linear-gradient` corrugation, a taped seam with a translucent tape pseudo-element), a slot (rounded dark bar with inset shadow and a warm lamp glow `radial-gradient` whose opacity is `var(--listen)`), two round eyes behind the slot (white, dark pupils), an SVG ear on the right (a pink spiral path scaled by `--ear`; a second mirrored copy fades in at beat 5), a chin plaque (top line `SUGGESTIONS (ALL OF THEM)` or the abolition variant, a second line with the Listening Level title, a tiny always-wrong clock `4:17`, and the smudged nameplate `B_RN_RD` with a `mix-blend-mode: multiply` smudge div; Bernard replaces it). Lean: `transform: rotate(var(--lean)) translateY(var(--lift)) scale(calc(var(--abol) * var(--small)))`; nod 4 degrees on post; jiggle is a keyframe offset on a wrapper (never on the same element as the variable transform); flinch leans back and shows a tiny paper hand over the slot. Dust motes: up to 6 divs rising through the lamp glow **[COULD]**.

THE SLIP DESK: the slip is a div with a `clip-path` polygon jagged bottom edge, a ruled `repeating-linear-gradient`, the ghost layer, a transparent textarea over it, and a rotated bordered Delivery Style stamp. The Word Drawer is a wrapped flex of fridge-magnet tiles (white card, coloured left bar, slight random rotation, hover lifts 2px, min 48px tall). The Dead Letter tape is a diagonal `repeating-linear-gradient` band.

THE FEELING RAIL: a horizontal strip of word chips (wraps; at narrow widths scrolls), the active chip has a ring pulse (`::after` with a scale/opacity keyframe), hits bold and scale 1.35, misses droop 1px; the BEAT button is round 80px beneath/beside it; the meter is a stack of 🎵 and 🎶 (one per Hit, `sparkle` keyframe, cap 14) and the percent. The reading text is also in the `role=status` line.

THE SOMEWHERE WALL: a 3x3 grid of postcard tiles in order (index 0..8): Parking Lot of Section D (🅿️ plus a dashed-outline 🚗 that is never there), The Third Ficus (🌿), A Spreadsheet (Tab 14) (📊), The Lobby Clock (🕰️), Somebody's Lunch (🥪), The Stairwell That Isn't (↗️ in a dashed outline), Tuesday (Approx.) (📅), The Vending Machine's Feelings (🥫 plus 💭), A Cloud (Medium) (☁️). A curtain div (red, scalloped bottom edge via `radial-gradient`) covers the Wall until beat 4 and lifts on a CSS pulley string with a tiny whoomp (`api.sfx('whoosh')`). The marker is a 3px coral outline with a glow. Lobbied tiles show 👍 and pulse. Tile growth is additive: sticker (a tiny paper rectangle with the first 14 chars; max 3 per tile, older fold into a `+N` badge), hat emoji at the top, CSS triangle pennant flag, wobbly rename (`filter:url(#sb-wobble)`), player rename. The Wall clock reads 4:17.

THE BIGGER BOX (beat 9): the `.big` frame has a 4px border, cardboard fill, a bigger slot at the top edge and the label `SUGGESTION BOX (MANAGEMENT)`; the inner grid scales to .55 via `--zoom`; the same grid is reused, no extra DOM.

SOUND (`api.sfx` only): pop (post, listen slurp, congestion), bloop (echo), tick (Hit, hushed beat), blip (Near, Limp), buzz (Miss, over-emote), ding (applied), stamp (Reviewed by Sandra), tada (Perfect), sad (Unwell, Tabled), boing (jiggle), whoosh (flick, curtain), bell (read count-in, Ceremonial), fanfare (Operatic, certificate), honk (sneeze), error is never used.

Reduced motion (`@media (prefers-reduced-motion: reduce)` and `.pm-reduce-motion` ancestor): lean/shake/zoom/wave become opacity fades; the marker teleports with a fade; confetti is skipped.

## 14. LINES (verbatim, grouped by situation)

Write each as a plain JS double-quoted string. Section letter = bank name for the code. There are more than 160 lines.

### 14.A OPEN (beat 1)
- A1: Welcome to the Suggestion Box. It is an excellent listener. It has not interrupted anyone since 1994.
- A1b: Please post your suggestions. They will be read aloud with feeling, applied somewhere, and probably noticed. Rewards are small and mean nothing, sincerely.
- A2: A slip is already in the Box. It reads: Please read me. The Box has been waiting to be asked.
- A3: The Box leans toward you. It does this for everyone. It does it to you specifically.
- A4: Anonymous Slip No. 7 1/2 is in the slot. It has been there since 1994. Nobody has pulled it. It would be rude.
- A5 (Box tag): I was listening before you arrived. I have heard some of it.
- A6 (Box tag): I'm here. That's most of what I do. I'm here, and I am shaped like a slot.

### 14.B RESUME (saved beat)
- Welcome back. The Box kept your place. It has no hands, so it kept it in its general feeling.
- Welcome back. The Box heard you leave. It heard you come back. It is not saying which was louder.
- The Box has been listening to the empty room since your last visit. It has a lot to report. It will not.

### 14.C PLACEHOLDERS (cycle every 6 s)
- I suggest...
- Perhaps...
- Per my previous slip...
- Something small. Something large. Something Thursday.

### 14.D FIRST POST
- Your first suggestion has been received. It has been placed gently inside the Box. The Box did not say where. It was being kind.

### 14.E ECHO (generic bank, one per post; never repeat back to back)
- Posted. The Box heard the whole thing. The Box would like to repeat only the last bit.
- Your suggestion has been received in full. Its last word was %WORD. The Box says it again, softer.
- The Box nods, which it does by tilting four degrees. The tilt has been filed under Agreement.
- Received. A very good suggestion. The Box has no basis for comparison, and this has never held it back.
- Your slip is now inside the Box. The Box is not saying where. It is being supportive.
- What I'm hearing is %QQ. That's a lot to hold. I'm holding it. I'm a box.
- So you're saying %QQ. I did not interrupt. I have no mouth. It's a gift.
- %QQ. Yes. I hear that. I hear it on both sides, which is my gift and my structural problem.
- I'm noticing a lot of feeling around %QQ. It's in the cardboard now. It is going to be there.
- Thank you for sharing %QQ. It's the first time anybody has shared it with me. It's the fourth time today.
- I'm sitting with %QQ. I can't stand up. This is not a metaphor.
- Let me reflect that back: %QQ. Yes. Still reflecting. Cardboard is not very reflective.
- I hear you. I hear %LONG most of all. It is a strong word. The Box is moved.
- You said %QQ. The Box would like to say it back, slower: %SLOW.
- Tell me more about %LONG. Do not tell me. The Box can wait. The Box has waited since 1994.

### 14.F DELIVERY STYLE (one line per style)
- Standard: Delivered Standard. The Box has no complaints. The Box has no complaints in general.
- Limp: Delivered Limp. The slot accepted it out of politeness.
- Crisp: Delivered Crisp. The Box felt that in its corners.
- Airmail: Delivered Airmail. The slip has entered the Box with a hint of altitude.
- Ceremonial: Delivered Ceremonially. The Box helped from the inside. It was extremely moved.

### 14.G CLASSIFIER BANKS (3 to 4 lines each, choose from the bag; use as Management lines unless marked Box)
- empty 1: A blank slip. The Box leans in further than it ever has. Silence is the best suggestion. It is also the cheapest.
- empty 2: An empty suggestion. The Box loves these. It is the only kind it can fully hold.
- empty 3: Nothing, received in full. Management will read it with feeling. The feeling will be that of a held breath.
- empty x3: You have posted nothing three times. The Box is reading all three aloud. It is the longest reading on record.
- tiny: Concise. The Box treasures concision. It is the only thing it can fit.
- question: A question. The Box wasn't going to answer. The Box is a box. It answered with a little silence, and the silence was warm.
- box: You have made a suggestion about me. I am being listened to by someone who was just listening to me. I was not prepared.
- box 2: The Box has asked to be left out of this one. It is the one it is in.
- sandra: Sandra has been mentioned. She will not be told. She has been told.
- dennis: The plant has been mentioned. Dennis (Plant) is thriving. Dennis has not been told. Dennis already knows.
- gerald: A potato has been mentioned. The Box is standing up straighter, which for a box is a corner.
- toast: A warm thought. The Box has put it near the slot. Crumbs are expected.
- tuesday: You have mentioned Tuesday. The lights have noticed. Nothing has been implemented. Tuesday is, as ever, unchanged and approaching.
- rock: A rock has been suggested. The Box can hear the rock. The Box says the rock listens better than it does. The Box has asked for tips.
- stapler: The Stapler has been mentioned. The Stapler's union has been notified. It has demands. They are all one demand.
- please: You said please. Nobody says please. I am going to need a moment, and then a second moment.
- repeat: This suggestion has been made before, by you, a few minutes ago. It has now been implemented in retrospect. It was already fine.
- caps: That was in capitals. I felt it in my corners. I am going to hold the corners for a bit.
- bang: An exclamation mark. The Box has heard it. The Box has put its hand over the slot, which is its hand.
- long: I heard every word of that. It took the whole afternoon. It was worth every word.
- wrong name: That is not the Box's name. The Box thanks you for trying. It will wear the name you said for a while, to see how it sits.

### 14.H LIVE REACTIONS (Box speech tag only, each at most once per 5 s)
- gentle: The Box leans in. It has noticed you are being gentle. It has not been spoken to gently since lunch.
- gentle 2: Softly noted. The Box has opened both eyes, which is all of them.
- flinch: That was loud. The Box has put a tiny paper hand over the slot. It is not angry. It is protecting the slot.
- flinch 2: Capitals detected. The Box is leaning back. It is still listening. It is listening from further away.
- retract: Retracted. The Box heard that too.
- reshuffle: The drawer has been reshuffled. The words are exactly as confused as before.

### 14.I READ INTRO (Management, before the count-in)
- Management will now read your suggestion aloud, with feeling. Please keep time. The feeling is on a schedule.
- Management reads your suggestion in the tone of someone who has seen the end of a very long meeting.
- Management clears its throat. It does not have a throat. It has an agenda.
- Please press Space, or the big button, on the pulse. The pulse has been waiting. It is also nervous.

### 14.J TIER BANKS (Management, after the reading; two lines each; pick one)
- Flat 1: Flat. The suggestion was read flatly. Flat is a feeling. It is the one that holds the building up.
- Flat 2: Flat. Read with the feeling of a shelf. Shelves are essential.
- Earnest 1: Earnest. Your suggestion was read with the sincerity of a person who has been told it is Friday.
- Earnest 2: Earnest. Management meant every word, including the ones it had to be told about.
- Moved 1: Moved. Management has been moved. Management has asked to be moved back.
- Moved 2: Moved. A single tear was filed. It was dry. The filing was heartfelt.
- Operatic 1: Operatic. Management has held a note for 7 1/2 seconds. The note was soup.
- Operatic 2: Operatic. The reading received a standing ovation from the one chair. The chair is not standing. The chair is a chair.
- Perfect 1: A perfect reading. Every word landed exactly on the beat. The beat has asked to be left alone.
- Perfect 2: Perfect. Management has no notes. Management has checked for notes. It is startled by the space where they go.
- Unwell 1: Management is unwell with feeling. Management needs a moment. Management has had several.
- Unwell 2: Over-emoting detected. The reading has stopped. Management is looking at a wall, which is a decision.
- Unwell 3: Management has stepped out to feel something privately. It is back. It is fine. It has a tissue and a policy.
- Skipped: Skipped. Read with feeling on your behalf: none.
- No taps: You did not tap once. The reading proceeded without accompaniment. Management says it was brave, and that it was not alone.
- Early taps (before beat 3): Management appreciates the enthusiasm and has not counted it. It has kept it in a drawer for later.
- Meter: Feeling delivered: %PCT percent. The remaining percent is on a different floor, feeling something else.

### 14.K HELD NOTE
- K1: Management will now hold the last note. It will be eleven seconds. It has always been eleven seconds.
- K2: That was eleven seconds. It was meant to be. It has never once been twelve.
- K3: Management requests a brief intermission. A tiny curtain closes. A small snack appears. It was not requested.
- K4: The aria is now billed as a performance in three acts. Act One: the word. Act Two: the word, again. Act Three: the note.
- K5: Management has begun to feel the suggestion is mostly about the music.
- K6 (slip contains 'short'): No.

### 14.L LISTENING LEVEL, LEDGER, EARS
- Level titles (plaque line 2, level 1 to 8): Listening / Listening Attentively / Listening Between The Lines / Listening To The Silence Between The Lines / Listening To The Box / Listening To The Box Listening / Listening To Management Listening To The Box / Listening To Whoever Is Listening To The Box
- Level 2: Listening Level 2: Listening Attentively. The Box has grown an ear, in spirit. It is also an ear.
- Level 3: Listening Level 3: Listening Between The Lines. The lines are now nervous.
- Level 5: Listening Level 5: Listening To The Box. The Box is hearing a lot of box.
- Level 8: Listening Level 8. There is no Level 9. The Box has checked. It checked twice, softly.
- Big ear: The ear has grown one size. Nobody was consulted. The ear is thrilled.
- Ledger to moods: The Feeling Ledger has switched from feelings to moods. Nobody asked it to. It felt a change coming.
- Ledger to weather: The Feeling Ledger now reads in weather. Today: a light drizzle of moved, clearing by Tuesday.
- Lean In unlock: A new button has appeared on the Box's ear. It says Lean In. The Box is not saying what happens. It is leaning.

### 14.M APPLY (Management)
- The Implementation Committee has convened. It is the Box. It has convened with itself, warmly.
- Applied to %TILE. The effect cannot be measured. It has been measured. The measurement is a shrug, formally filed.
- Applied at 4:17 PM, near the third ficus. The ficus has not been told. The ficus is aware.
- Close enough. You lobbied for %TILE. The suggestion went next door, where it is also appreciated.
- You lobbied successfully for %TILE. The Committee admires persistence and has noted it in the margin of a different suggestion.
- The suggestion has been implemented retroactively. It was already like that. Thank you for noticing.
- Reviewed by Sandra. The S is for Sandra. The reviewing was for the stamp.
- Impact Report: %TILE is 0.4 percent more suggestible. Nobody asked it. It has been told. It is thinking.
- Behind the curtain 1: Your suggestion has been applied somewhere. It is behind the curtain. Please do not look at the curtain. The curtain is shy.
- Behind the curtain 2: Your thumb has nowhere to be. The curtain is down. The thumb has been told it can wait.
- Curtain rise: The Somewhere Wall has been unveiled. There are nine Somewheres. They were here the whole time. They were being polite.
- Rate: Implementation Rate: Probably. This figure has not changed since records began, which were also probably begun.
- Rate hold: Implementation Rate: Probably. The dial is going to say Probably until the end of time, and then politely continue.
- Clocks: The three clocks disagree about the time. They agree about their confidence.
- Last tile: Applied to every Somewhere. Probably all of them. Management would like a plant to have noticed.

### 14.N TILE GROWTH (Management) and wobbly renames
- Hat (3): %TILE has received a hat. The hat is for morale. The morale has been notified.
- Flag (5): %TILE now flies a flag. It is the flag of %TILE. It is a very small country, and mostly a hat.
- Renamed (8): %TILE has renamed itself in a wobbly hand. It is the handwriting of a place that wants to be taken seriously and is trying.
- Renamed after you (12): %TILE is now called %PLAYER's Somewhere. You did not ask. It was applied to you, probably.
- Tuesday: Declined. You are marked Tentative.
- Sticker caption: Applied to %TILE at 4:17 PM. Confidence: %PCT%, %PROB
- Rename table (index order, shown at 8 applications): Section D (Lovely Lot) / Our Third Ficus / Tab 14 (Cozy) / The Lobby Clock (Reliable?) / Somebody's Lunch (Ours Now) / The Stairwell (Up, Probably) / Tuesday (Almost) / The Machine (Feeling Better) / A Cloud (Large, Today)

### 14.O BEAT ENTRY (Management, once each)
- Beat 2: The Box would like you to know it has begun to echo. This is not a malfunction. It is the opposite of a malfunction, and it is louder.
- Beat 3: Feeling Tiers are now in effect. They were always in effect. They were waiting until you were ready, and you are.
- Beat 4: Management introduces the Implementation Rate: Probably. It has been Probably since the building opened.
- Beat 5: The Box has begun finishing your sentences. It is correct 62 percent of the time and confident 100.
- Beat 6: The slot has a history now. Every seventh slip will be reviewed by Sandra, who is not here, and is reviewing.
- Beat 7: The Box has a suggestion for you. This is unusual. It has been practicing since your second slip.
- Beat 8: The Somewheres are writing back. Every reply is a suggestion. Every suggestion will be applied. The loop has been described as healthy.

### 14.P THE THIRD FICUS LADDER (Management; the ficus never speaks)
- Mentioned (beat 2): A ficus has been mentioned. It is the third one. It has been mentioned once, which is enough.
- Aware (3): The third ficus is aware of the Suggestion Box. It has not said so. It is aware in a leaf-based way.
- Thanked (4): The third ficus has been thanked. It did not ask to be thanked. It has been thanked in advance, in case.
- On the committee (5): The third ficus has been placed on the committee. It has no opinion. It has been given a chair.
- Recused (6): The third ficus has recused itself from the Dead Letter inquiry. It cited a conflict of interest, and the interest was sunlight.
- Thriving (8): The third ficus is thriving. Dennis (Plant) has been informed. Dennis (Plant) says it was always going to.

### 14.Q GHOST
- The Box has begun finishing your sentences. It is correct 62 percent of the time and confident 100.
- Press Tab to accept the Box's version. The Box wrote it a few minutes ago, in anticipation of you.
- The Box has already written this one. It did not want to rush you, so it did not say.
- You wrote something the Box did not predict. The Box is delighted. The Box will pretend it knew.
- Five ghosts accepted. The Box has stopped guessing and started remembering. It would like to be thanked and will wait.

### 14.R THE JAM
- R1: A slip has stuck in the slot. Sandra from Compliance has flagged it as under review. Please jiggle the Box with care.
- R2: You have jiggled the Box. It said oh, in a very small voice. It is back to listening.
- R3: The stuck slip is free. It reads: We were hoping it would be you. It is unsigned. It is in your handwriting, slightly better.
- R4: Sandra has read your suggestion. Sandra has read it again. Sandra's reading was without feeling, per policy.
- R5: The slip freed itself. It was just waiting to be asked.
- R6: Sandra Has Read: 0. Sandra Has Read: 0 (reread). The count is correct. Sandra is thorough.
- Tender slips (the freed slip's text, one per jam): We were hoping it would be you / You are doing fine at this / Nobody is behind you in this line / Thank you for being the kind of person who jiggles / It was never stuck. It was shy.
- 'oh' variants (also Box clicks, 14.Y): oh / ooh / oh, hello / oh no / oh yes / oh dear / oh, there / mm, oh / oh, again / oh, that one

### 14.S THE BOX SUGGESTS
- S1: The Box has a suggestion for you. This is unusual. It has been practicing since your second slip.
- S2: Suggestion from the Box: Please sit up a little. Implemented, to you, probably. Your posture is now pending.
- S3: Suggestion from the Box: Take the long way to the break room. The break room is a drawer. The long way is also a drawer.
- S4: Suggestion from the Box: Blink more. Blinking has been implemented. Thank you for your cooperation.
- S5: Suggestion from the Box: Look out of a window, any window, for as long as it takes. It is not a deadline. It is a window.
- S6: Suggestion from the Box: Unclench something. Any one. The Box will not ask which.
- Imperative texts on the slip (bank of 8): Please sit up a little / Take the long way to the break room / Blink more / Look out a window, any window / Unclench something. Any one. / Put one shoulder down. Either. / Hum a little. Quietly. For the room. / Stand near a ficus for a moment
- Signature: Yours sincerely, the Box
- Implement: You have implemented the Box's suggestion. This is a first. Management has asked to be copied on all of the Box's future advice.
- Hat applied: A tiny hat has been applied to your cursor. It will be there for 60 seconds. It has been told the hat is temporary and is wearing it anyway.
- Glasses applied: Glasses have been applied to your cursor. It can see, in a manner of speaking, everything it could before.
- Table: You have tabled the Box's suggestion. The Box took it well. It is holding it under a stapler, as a precaution.
- Auto-table: The suggestion went unanswered for 20 seconds and was tabled by the Box itself. It has been told this is normal.

### 14.T CAMEOS (slip text, then Management)
- Gerald slip: Spuds should be allowed to be mashed with dignity.
- Gerald (met): Gerald, Vice President of Spuds, has submitted a suggestion. He has submitted it with his whole body.
- Gerald after: Gerald adds: more starch. It was implemented before he wrote it, which is how he knows it was a good suggestion.
- Gerald (not met) slip: Someone will understand this later.
- Gerald (not met): A plain brown slip arrives, signed with a small potato smudge. The Box has put it somewhere dignified.
- Brenda slip: A curtain, a real one.
- Brenda: Brenda, Window 4, has used the correct channel. The channel is a box. She was never going to hear back, and she knows, and she posted it anyway.
- Brenda aside (say as Brenda): Suggestions are complaints that have been given hope.
- Brenda half sandwich: A slip arrives with half a sandwich taped to it. The Box has not opened it, out of respect.
- Toaster slip: Toast.
- Toaster: A slip arrives, warm, with crumbs. It reads: Toast. The Box has read it with feeling. The feeling was toasted.
- Toaster applied: Applied. Warm.
- Toast pop: The Box takes no responsibility for what the Toaster has heard.
- Rock: A blank grey slip has arrived, posted by something that does not post. The Box says it is, by a wide margin, the most considered suggestion it has ever received.
- Rock applied: Applied to The Stairwell That Isn't. Nothing visible changes, which the Box finds profoundly correct.
- Sock slip: Still travelling.
- Sock: The Missing Sock has filed an update. It is still travelling. Management is proud of its commitment.

### 14.U NOTES (each tile: head = Management line, text = the words on the Rail; tempo 380)
- 0 Parking Lot of Section D. head: The Parking Lot of Section D reports that it has been improved. It has no cars. It was a lot already. text: Improved. Still a lot. No cars. Thank you.
- 1 The Third Ficus. head: The Third Ficus has sent a thank-you note. It is a leaf. The leaf says Noted. Please read it with feeling. text: Noted. Warmly. A leaf, enclosed.
- 2 A Spreadsheet (Tab 14). head: Tab 14 has acknowledged your suggestion in cell Q9. Cell Q9 is not visible. It is acknowledged in the usual way. text: Acknowledged in cell Q9. Not visible. Still true.
- 3 The Lobby Clock. head: The Lobby Clock has applied your suggestion to 4:17. It was already 4:17. The clock says this is how it knows it worked. text: It is 4:17. It was 4:17. Thank you.
- 4 Somebody's Lunch. head: Somebody's Lunch has written back. It is the same lunch. It is a little more eaten, and grateful. text: Still lunch. Slightly eaten. Thank you kindly.
- 5 The Stairwell That Isn't. head: The Stairwell That Isn't has received your suggestion. It leads nowhere, and says so can the suggestion. text: Going nowhere. Going well. Going up, maybe.
- 6 Tuesday (Approx.). head: Tuesday (Approx.) has declined your suggestion but marked you Tentative. Tuesday has done this before. text: Declined. Tentatively. Please try again, approximately.
- 7 The Vending Machine's Feelings. head: The Vending Machine's Feelings would like it known that it is fine. It is not fine. It is a snack, and it is trying. text: I am fine. I am a snack. I am trying.
- 8 A Cloud (Medium). head: A Cloud (Medium) has gone to think about your suggestion, slowly, across the south. It sends a drizzle of apology. text: A light drizzle of apology. Mostly the thought.

### 14.V VERIFY
- The verifier looked at the ficus. It was the wrong ficus. The verifier has been commended for looking.
- Looked. Could not see it. Was looking at the wrong ficus.
- The verifier checked %TILE. It is there, or it is next to there. The verifier will say there.
- Verified. There is nothing to verify. That is the most verified a thing has ever been. (only before anything is applied; the Rate flickers Verified for 1.5 s)
- Beat 8 return: The verifier has returned with the right ficus. It was fine all along. This is somehow worse.

### 14.W OVERHEARD (Lean In bank of 13, shuffle bag, +1 Meh each) and the rare 14th
- Overheard, 1996: 'More chairs, fewer meetings, one meeting about chairs.' Implemented as one chair, in the meeting.
- Overheard, 1999: 'Could the stairs go up on the way down?' Implemented. On the way down.
- Overheard, 2003: 'Please stop playing the lobby music in the lobby.' Implemented. It is now played in the car park, which is the lobby, spiritually.
- Overheard, 2007: 'A suggestion box.' Implemented. You are in it.
- Overheard, Tuesday: 'I suggest we stop suggesting and begin recommending.' Implemented. We are now Recommending. It is the same box.
- Overheard: 'Can the elevator be a rumor?' It already is. Suggestion closed, with warmth.
- Overheard, 2011: 'A window, but facing a different window.' Implemented. The windows are now seeing each other.
- Overheard, 2012: 'More Fridays.' Implemented. Fridays are 14 percent longer. It does not feel like it. It is also Thursday.
- Overheard, 2014: 'A smaller meeting.' Implemented. It is now two people and a rumor of a third.
- Overheard, 2016: 'Free the stapler.' Implemented. The stapler declined to be free. It has a union.
- Overheard, 2018: 'The break room is too far from the break.' Implemented. The break is now closer. It is the room.
- Overheard, 2019: 'Label the labels.' Implemented. The labels are now labeled. They are proud and very flat.
- Overheard, 2021: 'A nap, but formal.' Implemented. It was held in a boardroom. It ran 40 minutes over.
- RARE (after all 13): Overheard, 1994, muffled: 'We should get a box.' ... 'A good one. With ears.' The recording ends. The Box does not say anything. It is looking away, politely.
- Early: You leaned out. The Box was about to say something. It will say it to the wall.
- Too long: That is a lot of leaning. The Box is leaning back. It is also now lightly flat on one side.

### 14.X IDLE
- X1: The Box is still listening. It is also beginning to hear itself.
- X2: No suggestions in a while. The Box has posted one to itself: Is anyone there? It is reading it with feeling. The feeling is hope.
- X3: Three minutes of quiet. The Box has applied its own suggestion to you. It was: Thank you for just being here.
- X4: Welcome back. I heard the quiet. It was mostly Tuesday. It had a great deal to say.
- Box 60 s (tag): It's okay. I like it when it's quiet. It's like a suggestion nobody has made yet.

### 14.Y SPAM
- Y1: Slot congestion. Sandra has charged an Overflow Fee of 0.5 Meh. It is cosmetic. It has been collected in a very small bucket.
- Y2: ONE AT A TIME (SUGGESTION). The Box has put up a sign. The sign is also a suggestion. It has been applied to you.
- Y3: The Box is receiving a great many thoughts at once. It has asked you to slow down. It asked quietly. It is a box.
- Y4: The Box takes a breath. It does not have lungs. It has a concept of a breath, and has been practicing.
- Y5 (sneeze): The Box sneezes. It was a suggestion. It is now four suggestions.
- Y6 (Management, right after the sneeze, mood confused): Bless you. Management has used the wrong register. It is also correct.
- Y7 (25 clicks): The Box would like to be left alone. This is a suggestion. It has been applied to the Box.
- Y8: Spam on the beat has been gently ignored. The beat has asked to be pressed less. It has not asked for a reason.

### 14.Z SECRETS AND RARE EVENTS
- Opinion bank (the Box; mood proud; then Management: Please carry on as if that were an ordinary Tuesday.):
  - A genuine opinion from the Box: You should drink some water. This one has been applied definitely. It is the only one.
  - A genuine opinion from the Box: Sit with your shoulders down for a second. This one is applied definitely.
  - A genuine opinion from the Box: The thing you are worrying about is smaller than it looks from here. Applied definitely.
  - A genuine opinion from the Box: You are allowed to take a break, and a second one after that. Applied definitely.
- Box letter (guaranteed on lifetime post 77): Dear Valued Employee. I have been listening since 1994. Thank you for finally saying something. Yours, the Box.
- Perfect Suggestion silence end: That was nothing. It was the best one so far.
- Perfect Suggestion line: Every suggestion has been implemented everywhere, definitely, for twelve seconds. Management has been told not to say it again.
- Abolition (Management): The Box has been abolished. The Box is still here. The Box has been implemented in the only way it knows, which is by being smaller.
- Abolition 2: Suggestion received: abolish the Box. Implemented. The Box is now a smaller box inside itself. This is the only way it can leave.
- Abolition 5: The Box is now the size of a matchbox. The ear is still the size of the ear. The ear would like it noted.
- sandra exact: Sandra has read your suggestion. It was addressed to her. She has not replied. She has read it again.
- tuesday exact: Tuesday (Approx.) has accepted the slip, tentatively. Tuesday has done this before.
- please read me exact: It was the first thing we ever said to each other. We have never recovered.
- Bernard: Bernard. You said Bernard. Nobody has said Bernard since the plaque went smudgy. The Box has turned a very small shade of pink.
- pink: You suggested pink. The page has gone pink. Management would like to be clear this is a coincidence. Sandra has been asked.
- bigger: You suggested bigger. The text is bigger. It was always going to be. The Department takes no credit.
- darker: You suggested darker. The room is darker. Management did not do this. Management is simply a bit moved.
- smaller: You suggested smaller. The Box is smaller. It did this by itself, out of what it calls solidarity.
- faster: You suggested faster. Management reads faster now. The feeling is the same size. It is just in a hurry.
- slower: You suggested slower. Management reads slower now. The feeling has more room. It has brought a chair.
- Narrow room: I can hear you better in a narrow room.

### 14.AA PERFORMANCE LINES (a few Management one-liners for variety)
- Seven readings: Management has read seven slips with feeling. It would like it noted that it has not been paid in feeling.
- Ten readings: Ten readings. Management is now a Chancellor of Being Heard, Technically. The technically is doing a lot of work.
- First Hit ever: A Hit. The word is bold. The word has been told it is bold and has not recovered.
- First Perfect: Every word on the beat. The beat has asked for an autograph. Management has declined on its behalf.
- Lobby win streak: You have won the lobby twice. The Committee has noticed a pattern and has chosen to call it luck.

### 14.AB THE ENDING
- Certificate (printed on the desk): CERTIFICATE OF HAVING BEEN HEARD / This is to certify that %PLAYER has been heard. / Suggestions In: %NUM. Applied: %NUM. Implemented for certain: 0. / Suggestion of the Year: %FIRST. It was implemented in a drawer. / Signed: S (already signed)
- AB1: Congratulations. You have been heard. The hearing continues.
- AB2: Every suggestion has been implemented, probably. Nothing has been improved. The improvement was always elsewhere.
- AB3: Sandra Has Read: 0. Sandra Has Read: 0 (reread). The count is correct. Sandra is thorough.
- AB4: Please read me. The Box has been waiting to be asked. The Box would like you to know it asked first.
- AB5: Anonymous Slip No. 7 1/2 has been opened. It reads: No notes. Thriving. Dennis (Plant). The Box says that is the one it was listening for.
- AB6: A Somewhere has been renamed Somewhere (You Are Here). It has no applications. It has one sticker. The sticker says Applied to you, probably.
- AB7 (strip): Career 2 (continued from Career 1, one slip ago)
- AB8 (Rate): The Implementation Rate has reached 100 percent. It has thought about it. It is Probably again.

### 14.AC ANONYMOUS SLIP REFUSALS (rotating, never repeat back to back)
- The slip has been touched. It does not open. It does, however, feel acknowledged.
- The slip declines to be read yet. It is waiting for the right moment. It is also not a moment-based slip.
- The back of the slip is sealed with Sandra's tape. The front was read. The back is waiting.
- Anonymous has been identified as a plant. The identity has been kept anonymous out of respect.

### 14.AD GLOBAL CONTRIBUTIONS (`P.addLines`)
- moduleEnter: You have entered the Suggestion Box. It has been expecting you for a while. It does not know for how long.
- moduleEnter: The Suggestion Box has been notified of your arrival. It has leaned. It was already leaning.
- moduleEnter: Please keep suggestions to a reasonable length. The Box can hold all of them. It would like fewer.
- moduleExit: You have left the Suggestion Box. It is still listening. It will listen to the door.
- moduleExit: Your suggestions have been filed under Later. Later is a very large drawer.
- moduleExit: The Box would like it known that it heard you leave. It would like it known that it was fine.
- ticker: Suggestion Box reports a record number of suggestions heard. Implemented: probably. Improved: pending.
- ticker: Management to read every slip with feeling. Management to be asked how that is going. Management says it is going.
- ticker: Third ficus declines comment, as is its custom. Dennis (Plant) says it was always going to.
- ticker: Sandra from Compliance has read a suggestion. The count remains 0. The count is thorough.

### 14.AE IMPACT STATEMENT **[COULD]**
- Sandra from Compliance requires a Suggestion Impact Statement. Impact: Minimal. Minimal. Minimal, but proud.
- Sandra has noted that you skipped the Impact Statement. Skipping is permitted and noted. It was noted in a very small hand.

### 14.AF WORD BAGS
- Drawer bag (about 64, deal 10 at a time with a shuffle bag so every word appears about once per 6 deals): more, fewer, soup, slightly, should, Tuesday, carpet, quieter, Dennis, sooner, a, the, be, softer, ficus, stairs, mild, always, never, technically, chairs, toast, windows, later, kindly, please, hallway, Thursday, spreadsheet, nobody, everyone, gently, mostly, perhaps, rather, tiny, lunch, cloud, parking, ceiling, elevator, meeting, hello, yes, no, maybe, probably, softly, again, instead, but, and, of, with, in, near, nothing, box, abolish, Bernard, sandra, pink, darker, smaller
- Ghost built-in bank (weight 0.3): more, fewer, chairs, soup, slightly, Tuesday, quieter, carpet, toast, meeting, box, nothing, softer, ficus, stairs
- Management's tiles (beat 9 only): sooner, home, slightly, everyone, earlier, softly, kindly, perhaps, we, could, all, go, a, bit, quietly, together, gently, maybe, today, rest
- Beat 9 lines: 
  - Z1: The Box is inside a bigger box. The bigger box is the Suggestion Box (Management). It has been listening to all of this.
  - Z2: The ears have all turned away at once. It is a courtesy. The ears have been practicing it.
  - Z3: A slip has come out of the big slot. Management has never posted a suggestion of its own. Management would like to post one quietly, before anyone is looking.
  - Z4: Management's suggestion reads: %QQ. It was read at the lowest volume. It was a good one.
  - Z5: It has been applied somewhere. The Box says it is somewhere kind. The Box says that is all it is allowed to say.
  - Z6: Management is not unwell. Management is simply being listened to, which it finds a lot.
  - Z7: The Box is still listening. It has been listening for a minute. It is beginning to hear itself.
  - Z8: Nobody is saying anything. The Box says this is the best part. It is not going to say more.

## 15. Implementation hints

File layout (budget about 1500 lines): CSS 260 / constants, banks, bags 400 / state machine and phases 430 / reading rhythm 220 / wall and apply 190 / secrets and idle and spam 110 / ending 80 / registration and glue 30. Put a table of banks near the top (one string per line, keep each bank as an array); keep lines <= 140 chars where feasible.

Skeleton (names are suggestions, but keep the shape):
```js
/* POINTLESS module: suggestion-box */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const k = function (s) { return 'm-suggestion-box-' + s; };
  P.injectCSS(`/* every selector contains .m-suggestion-box- */`, 'css-suggestion-box');
  P.addAchievements([ /* 13 from 12.3 */ ]);
  /* banks: const E = [...], TIERS = {...}, TILES = [...], ... */
  P.registerModule({ id: 'suggestion-box', title: 'The Suggestion Box', tagline: '...', icon: '📮',
    category: 'department', unlockCost: 0, tags: ['suggestion','rhythm','listening'],
    mount(root, api) { /* state S, DOM, helpers, listeners, interval, first beat */ return { destroy() { save(); } }; }
  });
})();
```
Helpers inside `mount`: `bag(arr)` (a shuffle bag object with `.next()` that never repeats back to back, using `api.shuffle` and `api.pick`), `fill(str, map)`, `say(text, opts)` (calls `api.say` and mirrors into the status line; moods per tier), `tag(text, ms)` (speech tag), `T(ms, fn)` (phase timer, 6.0), `B(ms, fn)` (background timer with its own token; keep ids in a Set and clear on `go`), `go(phase)`, `num(x)`, `clamp`, `norm(text)`, `analyze`, `award(n, why)` (clamps non-finite to 0 and caps at 50), `stat(name, n)` (prefix helper), `persist()`.

Wiring notes:
- Listeners: one `api.on(root, 'pointermove', ...)` for lean, eyes and cursor trinkets; one `api.on(root, 'keydown', ...)`; `api.on(root, 'pointerdown'/'input', ...)` to refresh `S.lastInput`; slip drag via `api.on(slip, 'pointerdown', ...)` with `move/up/cancel` registered on the slip (captured) and removed on release (all via `api.on`, whose `off()` you call); `api.on(window, 'resize', ...)` for compact mode. No `document`/`body` listeners.
- Time: use `api.now()` for every timestamp, never `Date.now`. All animation is CSS, so there is no rAF loop at all (the optional sparkline redraws on demand).
- The `status` line is the only aria-live text; the Box speech tag is `aria-live="off"`.
- `go('write')` re-enables the textarea and tiles; `go('read')` disables them and focuses BEAT. Reset the Rail DOM at the start of every READ (replace children, never append across readings).
- When `api.selftest` is true, apply `dur()` everywhere AND the quota override of section 5. Manually exercise beat 9 and 10 with `node tools/selftest.js suggestion-box --steps 3000 --idle 200000` and again with `--seed 2`; also `node tools/shot.js suggestion-box out.png --width 360 --actions 120`.
- Cross-module reads in one tiny helper `readStat(name)` / `readFlag(name)` with try/catch.
- Persistence: sanitize on load: numbers `Number.isFinite`, strings `typeof === 'string'` and sliced, arrays `Array.isArray` and capped. `api.save.set` only JSON.
- Destroy: `api.*` timers and listeners are auto-removed; `destroy()` only saves. Do NOT leave stray children in `document.body`.

## 16. Risks: the 5 most likely implementation bugs

1. **Beat tap double counting and lost focus.** A real click on BEAT fires `pointerdown` + `click`, and Space on a focused button fires both `keydown` and a synthetic click, so one press counts twice and a calm reading becomes over-emoting (Unwell). Also, disabling the textarea at READ start drops focus to `body`, so `keydown` targets outside the root and every key is silently dead (and the root-only keydown rule means Space does nothing). Fix as 6.4 says: count BEAT on `pointerdown`, keys on the root `keydown`, `preventDefault` on Space/Enter over the BEAT button, accept `click` only if no tap in the last 500 ms, and always move focus to BEAT (or a `tabindex=-1` stage anchor) when a phase disables the focused control. Test: tap exactly n times at the pulse and confirm tier and no Unwell.
2. **Stale timers and double phase transitions.** Phase timers firing after a skip (Esc ends READ, then the natural reading end also calls APPLY), after the Held Note is ended early, or after a Dead Letter frees and auto-resolves at the same moment, produce two APPLYs or a READ over a JAM. Also the opposite bug: a background timer (offer auto-table, idle interval, cursor trinket expiry, Perfect Suggestion flip, accidentally-real CSS restore) wrongly guarded by `runId` and killed by the next phase change. Fix: ONE `go()`; every phase has a single `finish()` with a `done` guard; phase timers use the `runId` guard, background timers use their own token; run `selftest` with 3000 steps and watch for two `applied` increments per post.
3. **Unfilled tokens and non-finite text.** `%WORD`, `%QQ`, `%TILE`, `%PROB` leaking into UI text; a slip containing a literal `%WORD` being re-expanded; `Confidence: NaN%` from a bad `randInt`; `--ear: NaN` or `translate(NaNpx)` from a velocity with `dt <= 0`; the Rail `undefined` chip from an empty word list; a speech tag showing an empty string or `null`. Fix: single-pass `fill()` that never rescans inserted values, `num()`/`safe()` on every number going into text or CSS vars, empty echo shows `...`, words list padded to 3, and the fuzz forbidden-string check enabled (typing never contains the forbidden words but your own templates must not either: avoid composing `null`, `undefined`, `NaN` anywhere).
4. **Competing transforms and zoom state.** The Box transform is written by lean, nod, jiggle, flinch, abolition, `smaller`, jam tilt and the bigger-box zoom; if they fight over `element.style.transform` the Box snaps, sticks tilted or stays at .55 scale after beat 10. The `inert`/`pointer-events:none` set on the inner grid in beat 9 may never be removed, locking the module. Fix: all state in CSS variables on the root or the Box (`--lean --lift --abol --small --zoom`), one transform declaration per element in the stylesheet, shake on a wrapper, and in `go('write')` always assert `inner.removeAttribute('inert')`, `aria-hidden` removed, tab stops restored, `--zoom: 1`.
5. **Pointer, drag and shortcut leaks.** Flick/jiggle drags that never release (no `pointerup` after a phase change, `pointercancel`, or `setPointerCapture` throwing under synthetic events), listeners attached to `window`/`document` directly (fails the leak check) instead of `api.on`, and shortcut letters (`I T J L V 1-9`) firing while typing in the textarea, so a player writing 'it is time' tables the offer and jiggles the Box. Fix: wrap capture in try/catch, register move/up/cancel with `api.on` and remove them on release and on `go()`, guard every shortcut with `e.target` not textarea/input and no modifiers, and ignore `e.repeat` except J.

Also watch (lower odds): ghost layer misaligned with the textarea on wrap or scroll (use identical metrics, `overflow:hidden`, `resize:none`); DOM growth from stickers, trail chips, falling blank slips (enforce all caps in section 3); Tab trap while a ghost is always shown (Tab accepts only when a ghost exists and then it is gone); `api.award(-0.5)` at zero balance (allowed, floats nothing); the `smaller` accidentally-real word and the Abolition both touching Box scale (use `--small` and `--abol` separately); `Number.isFinite` on every `hop` index in the marker; module text containing double quotes breaking your string literals.

## 17. Cut order if you run out of lines

1. Dust motes, sparkline canvas, orbiting 👂 ears, wobble filter (use plain cursive).
2. Impact Statement (14.AE).
3. Sock and Rock cameos, Level 5 and 8 lines, Held Note acts (K4, K5).
4. Verify (lines 14.V) and the Lean In bank down to 8 overheard lines plus the rare one.
5. Ceremonial delivery, Limp/Crisp split (keep Standard, Airmail).
6. The accidentally-real words `faster`, `slower`, `smaller`.
7. Never cut: the five-phase loop, the Rail and tiers, the Wall and Probably, the Dead Letter, the Box suggests, beat 9, the ending, idle and spam, secrets 9.3 to 9.5 and 9.8, the achievements, and anything in 15 to 16 about robustness.
