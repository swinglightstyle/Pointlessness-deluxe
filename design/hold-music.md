# DESIGN BRIEF: On Hold With Management (id: `hold-music`)

Final brief. A builder who reads SPEC.md, VOICE.md and this file can build the whole module. Output file: `games/hold-music.js` (single file, <= ~1800 lines, vanilla JS, CSS via `P.injectCSS(..., 'css-hold-music')`, every class prefixed `m-hold-music-`, every stat/achievement/save key prefixed `hold-music.`, custom line categories prefixed `m:hold-music:`).

Registration: id `hold-music`, title `On Hold With Management`, tagline `Your call is important to us in a way we cannot articulate.`, icon `☎` (U+260E, Emoji 1; if you want the variation selector, write it as `☎`), category `department`, unlockCost 0, tags `['phone','waiting','music','menus']`. In `mount`: `api.setTitle('Customer Experience (Please Hold)')`.

## 0. WHAT WAS MERGED AND WHAT WAS CUT

Three pitches. Pitch 1 (phone tree by keypad + tap-along hold music + keep-alive heartbeat + a Human who gets one more word out each time + secret cord stretch) is the SPINE and almost all of its mechanics are kept. Taken from pitch 2: Brenda (as a cross-module callback), the lamp that joins the queue, the "moved back N places for pressing with confidence" reason gag, the "no reason is available" break, dial 4-0-0-0-0-0-0 to connect to yourself, a 1/4 fractional position once, hang-ups raise the restart number. Taken from pitch 3: the named menu pool (Billing, Being Billed, Returns of Returns, Hold Support Support, Key Fatigue, Technical Difficulties About This Menu, Tuesday...), the Gerald "recording unless he is a potato" idea (kept as the metGerald branch), the whole "Hold Support" voice. Position 1 as a real ending (kept: it is Pitch 1's Final Approach).

CUT as weak or unbuildable in one file: doodle pad and canvas, "hold the handset to your ear" ACTIVE HOLDING and Arm Meter, hum-on-the-beat streak (tap along already is the rhythm verb), Space-hold hum, Roman-numeral position, Loyalty Tier ladder, window-width signal bars, half-height 1/2 key (replaced by the extension 7 1/2 secret), reverse hold, Priority Hold, the survey ending. Do not add them back.

The four verbs the player has: DIAL (digits, `*`, `#`), TAP (the beat), ANSWER THE PING (keep-alive), and secretly STRETCH THE CORD. Plus SPEAK (to Humans) and SAY IT (voice field).

## 1. CONCEPT

You are caller 4,000,000. You are on hold with Management. The phone tree starts talking before you do anything; within 3 seconds the LCD odometer has rolled to 4,000,000, the ETA reads `11 CENTURIES`, and a calm recorded voice offers "For English, press 1. For English but quieter, press 2. For English, again, press 3." Nothing is asked of you except to keep pressing things. Every press is answered with total corporate sincerity and a change of position of roughly nothing. The visible queue number is a function of hidden sim time (never of skill) with small jitter from your presses.

Every 8 to 15 seconds a new node of the phone tree is read. Every 45 to 75 sim seconds a heartbeat asks "Are you still there?". Eight times in 9 minutes a Human picks up, gets one more word of the same sentence out than last time, and says please hold. The hold music evolves through 9 tiers and you can tap along. At about 9:00 you reach caller number 1, the Human says the whole sentence, you get three reply buttons, and then you are put back at 4,000,000 as "Season 2: Callback".

First joke fires at t=0 with no input (the auto-answer greeting). A new beat at least every 20 to 30 seconds.

## 2. BUILD PRIORITIES (so the 1800-line budget survives)

- **MUST (in this order):** shell layout and CSS; sim clock + position function + odometer + LCD + call log; IVR node engine (menu, info, voice, keypad, hold-tight, transfer) with the node pool and the `0` previous-menu generator; keypad (buttons + physical keys) and the hold-key tracker; dial reactions and queue recalculation; heartbeat; hold music tiers + equalizer + now-playing caption; Humans + Rolodex + SPEAK; hang up / disconnect / redial / Carol; spam rule; idle ladder and Marguerite; escalation beats; Final Approach + finale + Season 2 and 3; achievements/stats/save; keyboard.
- **SHOULD:** tap along + rapport + tier 7; curly cord and handset drag with all three cord secrets; queue strip with names; extension 7 1/2; crossed line; the dial-yourself secret (4000000); cross-module callbacks; choir; menu-knows-you generator; reduced-motion handling; fractional position gag.
- **STRETCH:** desk tilt during the finale; Carol's lanyard; Season 3 "you ahead of you"; Shift Ear flip; keypad pressed-count glow rings.

## 3. LAYOUT

Root gets class `m-hold-music-root` (add with `root.classList.add`). Inside root a wrapper `.m-hold-music-desk` (faux-wood: three stacked `repeating-linear-gradient` bands on walnut `#7a4e2d`, 3px ink border, `container-type:inline-size`). Inside it `.m-hold-music-cols` is a CSS grid: ONE column by default (stacked: phone, prompt card, staff, strip), TWO columns via `@container (min-width: 700px)` with `grid-template-columns: minmax(300px, 5fr) 6fr`. (Use container queries, not media queries: the module lives in a window narrower than the viewport.) Everything lives inside root. Must work at 360px: keypad stays 3x4 with 56px keys, no horizontal page scroll (`overflow-x:hidden` on the desk; long text wraps).

### 3.1 LEFT: THE DESK PHONE (CSS + inline SVG, harvest-gold `#e0a526` body, cream `#f3e9d2` handset)

1. **LCD** (green-on-black `#b7e36a` on `#1f2b14`, scanline `repeating-linear-gradient`, flicker keyframe 1 to 0.92 opacity, text-shadow glow). Rows:
   - QUEUE POSITION as a 7-digit odometer: 7 columns, each a `span` containing a stacked column of the digits 0 to 9 (10 children each, 70 spans total, fixed forever), column moved with `transform: translateY(-d * 1em)`, transition 400ms (units digit 240ms, 40ms stagger left to right; `reduced motion = transition:none`). Leading digits of a number under 1,000,000 are blanked (opacity 0). A tiny fraction span next to it shows `1/4` for the fractional gag (section 6.2).
   - ETA text (e.g. `11 CENTURIES`).
   - Status word, one of: `HOLDING MENU TRANSFERRING CONNECTING DIAL TONE CROSSED EXT 7 1/2 PLEASE HOLD`.
   - Call timer `mm:ss` (sim seconds since this call started; resets on redial), `CALL # n` (starts 1, +1 per redial and per crossed-line hang-up), and when relevant a season label line `SEASON 2: CALLBACK`.
2. **Call Log**: a tiny paper receipt under the LCD, the last 8 events (cap 8, drop oldest, text like `02:14 DIAL 5 (-12)`, `03:00 HUMAN #3`). aria-hidden (it is decorative; the card carries the live text).
3. **Keypad**: 3x4 CSS grid of real `<button type="button">`: 1 2 3 / 4 5 6 / 7 8 9 / * 0 #. aria-labels `1`, `2 ABC`... (`star`, `pound`). 56px min. Each shows a tiny pressed-count badge (cap display at 99) and a box-shadow glow ring that strengthens linearly with count, capped at 20 presses. Press ring = a 200ms box-shadow pulse (class toggled, removed on `animationend` or a managed timeout). In sticky state (spam) a faint honey overlay is added (`::after`, `#e0a526` at 35%).
4. **HANG UP** cradle button (two-step: press 1 arms and relabels `Really?`, 2.5s window via managed timeout, press 2 within window hangs up).
5. **TAP ALONG** button (hidden/disabled with label `TAP ALONG (locked)` until beat 4; then enabled, with a pulsing heart on the handset showing Rapport 0 to 100).
6. **SPEAK** button (green phone glyph; only visible during a Human pickup, see 6.7).
7. **Handset** (cream rounded rectangle SVG/div on a cradle) with the **curly cord**: one SVG `<path>` from base to handset, plus a duplicate 3px darker shadow path 2px lower. Cord path generated by sampling points along the straight line base->handset and adding perpendicular `sin()` loops (about 14 coils), `stroke-linecap:round`, recomputed ONLY when the handset moves (drag/arrow/flip/snap-back), not per frame. Handset is draggable inside its box (pointer events with `setPointerCapture` in try/catch; arrow keys nudge it 12px when it is focused; it is a `div role="slider"`-ish button with `tabindex=0` and aria-label `Handset. Arrow keys move it.`). A visible `Shift Ear` button flips the handset to the other side and swaps which ear the hold music is "in" (cosmetic; Management line). The cord clamps to the box. A small meter `Cord: 0.0 ft` appears at beat 4 (max 7.5).
   Handset dragging is locked (cursor default, pointerdown ignored) until beat 4.

### 3.2 RIGHT: THE PROMPT CARD (`aria-live="polite"` mirror, see below)

- Sticker card (ink 3px, shadow `4px 4px 0 #2a1f14`, cream), a 14-second **timeout ring** around it drawn with a `conic-gradient` driven by a CSS variable updated at most every 100ms.
- Top: small italic REACTION line (instant, no typewriter) for the reaction to the last press and the queue recalculation reason line.
- Middle: IVR speech, typewriter via ONE managed `setInterval` at 18ms revealing 1 char per tick, skipped (finished instantly) on any keypress or click; the same press then proceeds as normal. For screen readers: a visually-hidden element with `aria-live="polite"` receives the FULL text once per node (not per character); the visible typing span is `aria-hidden`.
- Bottom: OPTIONS as a numbered list of real buttons `Press 1: For English`, etc. They also respond to physical keypad and keyboard digits. Max 6 options plus `0` = at most 7 buttons. The `0` option is always the last button and always reads `Press 0: Return to the previous menu`.
- Overlay panels reuse this same card (the card switches content by mode): HEARTBEAT (ring timer 7s), HUMAN pickup, TRANSFER (slot window), CROSSED LINE, DIAL TONE (with REDIAL), EXT 7 1/2, FINALE (reply buttons, plaque).
- **VOICE FIELD** (`<input type="text" maxlength="60" aria-label="Say it">` + Send button; Enter submits; Escape blurs), shown whenever the current node is a VOICE node or the heartbeat is the type-still-here variant. Never auto-focus it (it would steal letters); `R` focuses it.
- **KEYPAD-ENTRY readout** (nodes of kind keypad): a small LCD-like strip showing the digits typed so far (max 12), with a `Done (#)` button.
- **HOLD TIGHT** button (nodes of kind hold): a big button with a progress ring.

### 3.3 RIGHT, BELOW: THE HOLD MUSIC STAFF

12 equalizer bar `div`s scaled by JS per step (`transform: scaleY(v)`, NOT a CSS animation, so tier changes are instant), a scrolling row of 12 note emoji spans (glyph by tier, translateX by a CSS animation that is disabled under reduced motion), the `Now playing:` caption (`aria-live` NOT set here; Management carries the news), and a purely decorative volume knob (`<input type="range" aria-label="Volume (decorative)">`; at 0 the caption becomes `Playing in your heart`). Wince: an off-beat tap wobbles one note emoji (class toggle for 400ms).

### 3.4 BOTTOM: THE QUEUE STRIP

Horizontal row, a sign at the far left reading `FRONT OF LINE (rumored)` followed by up to 8 silhouette slots (U+1F464, bust in silhouette, Emoji 1; NEVER U+1F9CD) each with a coloured name-tag `span`. Slots from the front: [Caller] [Lionel (has a sandwich), from beat 3] [Marguerite from beat 5, before that Caller] [YOU, highlighted] [Carol (behind you) only after a redial, else Caller] [Caller] [Caller] [Also caller]. Cap 9 children total. The row sways with a slow `translateX` CSS animation of a few pixels (static under reduced motion). Marguerite's speech bubble is an absolutely positioned `span` above her slot.
Beside it: the **ROLODEX**: a small collapsed button `Humans Met: n/12 (Helpful: 0)` (`aria-expanded`), opening a card pile of up to 12 cards (cap 12 shown, newest first), each card shows the name and the words they got out in bold (`**Hello, thank**`). Footer: `Interruption Ratio: i:p`.

## 4. CONTROLS

| input | action |
|---|---|
| `0`-`9`, `*`, `#` (physical keys, `event.key`) | dial (see 5.4 for `#` which dials on release) |
| click/tap keypad button | dial |
| click/tap an option button | dial that option |
| any key or click | answers a plain "any key" heartbeat |
| `T` | tap along (only when focus is not in the voice field and TAP ALONG is unlocked) |
| `R` | focus the voice field (if none is shown: Management line `There is no field. Press R again anyway.`) |
| `S` | SPEAK (only during a Human pickup) |
| `H` | arm hang up; `H` again within 2.5s confirms; `Escape` disarms |
| `E` | Shift Ear |
| Enter / Space | activate the focused button (native). Never `preventDefault` on Space unless the target is the hold-tight or `#` hold gesture |
| arrow keys | nudge the handset when it has focus |
| In the voice field | only Enter (submit) and Escape (blur) are special. ALL letters and digits belong to the field |

Never bind the grave accent (Lobby boss key) or rely on `B`. Ignore events with ctrl/meta/alt held, ignore when the target is an input/textarea/select (except Enter/Escape in the voice field), ignore when `root` is not attached. All key listeners attach through `api.on(document,'keydown'|'keyup',...)`. `e.repeat` events are ignored for dialing.

## 5. CORE SYSTEMS (exact rules)

### 5.1 Time: the sim clock

`SPEED = api.selftest ? 20 : 1`. A 100ms managed `setInterval` computes `dt = min(1000, api.now() - last) / 1000 * SPEED` and advances `S.sim` (sim seconds). Under selftest a 600 sim-second arc therefore takes about 30 virtual seconds. ONLY these use sim seconds: beat schedule, queue trajectory, heartbeat interval, Human schedule, crossed-line chance, idle ladder, "5 minutes on hold" achievement, call timer. EVERYTHING ELSE uses real (virtual) ms: typewriter, timeout ring (14s), heartbeat ring (7s), SPEAK window, transfer spin (3s), spam window, sticky time, hang-up arm window, hold gestures, tap windows. Every threshold check is `>=` against a fired-flag, never `===` (at 20x ticks skip 2 sim seconds). The sim clock PAUSES while mode is `down` (disconnected) so an absent player is not dragged through the arc; it does NOT pause during idle.

Beat schedule, `BEAT_AT = [0,30,60,120,180,240,300,390,450,540]` (beat number = index + 1; beat is derived from `sim` every tick, and a `beatFired` set makes each beat's entry actions fire once).

### 5.2 Queue position (the odometer number)

`pos(sim) = base(sim) + S.offset`, rounded.

`base` is piecewise linear through these anchors, with one STEP at 300:

```
 sim:   0       30      60      120     180     240     299     [300 STEP]   390      450      540
 base:  4000000 3999985 3999950 3999850 3999700 3999450 3999100 -> 4000300   3999200  3997500  3997000
```
(Season 2+ uses the same table; the sim restarts at 60.)

`S.offset` is player jitter and decays toward 0 with half-life 45 sim seconds (`offset *= 0.5 ** (dt/45)`). On every dial: `delta` from this weighted draw using `api.rand()` and `api.randInt`: 80% forward `-randInt(1,37)`; 12% small back `+randInt(1,9)`; 8% recount `+randInt(10,400)` (recounts only when beat >= 2). `offset += delta`; clamp `offset` to [-3000, 5000]. The visible number is clamped to [1, 4001000].
On a redial the offset is set so the display reads `4,000,000 + redials` (`offset = 4000000 + S.redials - base(sim)`) and then decays as above (Carol shuffles back).
The big recount at beat 7: at `sim >= 300` the base steps up by itself (about 1,200), the odometer rolls UP, and the IVR/Management say the recount line (once).
Never display `NaN`: format with `api.fmt`-free own formatter `toLocaleString('en-US')` guarded by `Number.isFinite`, else `4,000,000`.

FINAL APPROACH (sim >= 540, `mode='finale'`): for 25 sim seconds `pos = round(lerp(3997000, 1, easeInOut(t/25)))` ignoring the offset (offset eases to 0 over the first 3 sim seconds). Music swells (tier 9). Desk tilts 1.5deg (transform on `.m-hold-music-desk`, no tilt under reduced motion). At pos 1 the finale (section 11) starts.

### 5.3 ETA text (LCD row)

By beat: b1 `11 CENTURIES`; b2 `11 Centuries`; b3 `11 centuries`; b4-b5 `11 centuries, +/- a Tuesday`; b6-b7 `11 centuries and a bit`; b8-b9 `11 centuries (...)` where the dots are literal (number withheld); Final Approach `SOON`; Season 2+ `11 centuries (again)`. The spoken ETA lines (section 12.7) are read as interludes with the same arc.

### 5.4 Keypad and hold-key tracker

All keypad buttons dial on `click` (this covers mouse, touch, Enter/Space on a focused button and the fuzzer's synthetic clicks). Physical keys dial on `keydown` EXCEPT `#`, which dials on `keyup` if no hold gesture fired.

A single generic **hold tracker** serves three gestures: `startHold(keyId)` on pointerdown (keypad button) or keydown (physical key, not repeat); `endHold(keyId)` on pointerup/pointercancel/keyup/blur/visibilitychange/destroy. Timers (all managed): at 1500ms (secret extension 7 1/2 check, key must be `#`), at 2000ms (heartbeat "hold the pound key" variant, key must be `#`), at 3000ms (HOLD-TIGHT node, ANY key). A fired gesture sets `holdFired=true` which suppresses the click/keyup that follows (so a long `#` hold never also dials a `#`). `endHold` always clears the timers. Losing focus or hiding the tab calls `endHold`.

### 5.5 Dial pipeline (every press goes through `dial(k, via)`)

1. If `mode==='down'`: only REDIAL works; any other key = a dial tone sigh line. If sticky and this key was accepted <1000ms ago: ignore (plus the `*` hammer rule, 5.14).
2. Spam bookkeeping (5.14), pressed-count badge, glow, `blip` sfx, rolling key buffer push (last 8 keys with api.now() timestamps), stat `hold-music.dials` +1, `Call Log` entry, idle timer reset (`S.idleSim=0`, ends idle states with the welcome-back line).
3. Secret sequences from the rolling buffer: `4000000` (dial yourself, 6.x), `7`,`5` then `#` hold (started in 5.4).
4. If the heartbeat is active: the press is consumed by the heartbeat evaluator (it does NOT reach the node). It still counts as a dial for spam, buffer and Call Log.
5. If the typewriter is running: finish it instantly (then continue to 6).
6. Else dispatch to the current node by kind:
   - MENU: if an option with key `k` exists (displayed set only): follow it. Otherwise reaction `Press {k} is not an option. We admire the confidence.`-style from the BAD_KEY bag (12.3), position moves anyway (delta rules above), and the node is re-read at the next tick (no re-read for BAD_KEY presses: just the reaction).
   - INFO: `5` acknowledges (goes to its target); other keys give the NOT_5 line.
   - KEYPAD: digits append (max 12), `#` or the Done button submits, `*` clears.
   - HOLD: handled by the hold tracker (5.4); a plain tap gives `Please continue to hold. You were holding. You stopped.`
   - VOICE: digits are ignored with a line (`Please say it. Do not press it.`), `*` skips the node (`Skipping voice. Voice has been informed.`).
   - TRANSFER: `*` = skip (spin again), other keys give the TRANSFER_KEY line.
7. After the dial: `delta` recalc (5.2) and the reason line goes under the odometer and in the Call Log; `api.award(rand 0.1..0.5)` on every 3rd to 5th dial (use a counter, not every press).

**Option `0`.** Always present. Pressing it generates a "previous menu that never existed": pick a random label from PREV_LABELS (12.4) not equal to the last used, clone a random node from the pool (not `main`, not an info/transfer/voice node, not the current node) as a menu with 3 to 5 options (its original options, destinations as authored), headed by `PREV_SAY` text (token `{label}`), `S.zeroes += 1`, stat `hold-music.zeroes`. On the 10th use unlock `hold-music.previous-menu` and Management says the TEN_ZEROES line. At beat 8 and later the `0` button text becomes `Return to the previous menu you have not yet visited` (and in Season 2+ the FIRST `0` of a season lands on the INFO node "Oh, you came back to this." (12.4)). The `0` option also appears on voice/keypad/hold nodes ("Press 0 to return"); it costs nothing.

### 5.6 The IVR node engine

A node is a plain object: `{id, kind:'menu'|'info'|'voice'|'keypad'|'hold'|'transfer', say:string|fn(ctx)->string, opts:[{k:'1', t:'label', to:'nodeId'|fn, r?:'custom reaction'}], to?:'nodeId' (info/voice/keypad/hold exit), min?:beatNumber}`. Reading a node: set `mode='ivr'`, status word `MENU`, show the REACTION line, type the speech, reveal options, start the 14s timeout ring. Every 4th node read, one INTERLUDE line (5.11) is typed before the node speech.

**Timeout ring (14 real seconds, starts after typing finishes, paused while a ping/human/transfer/crossed/ext overlay is up and while the voice field has text in it).** On expiry the IVR says `I didn't catch that.` (TIMEOUT bag) and re-reads the node with ONE option's destination silently swapped with another option's destination (labels unchanged); for info nodes the same node re-reads; for hold nodes it releases with `That will do.`; for keypad nodes it submits what is typed; for voice nodes it hears an empty submit. NEVER let a node wait forever.

**Destination rewriting.** After beat 6, when an option's destination is a normal node (not main/prev), with 30% chance (`api.chance(0.3)`) it goes to a TRANSFER node instead. Before beat 6 never. Max one transfer per 90 sim seconds.

**Option labels**: written WITHOUT the "Press N" prefix; the button renders `Press {k}: {label}`.

### 5.7 The node pool (author exactly these; reactions come from the bags in 12.3)

| id | kind | speech (typed) | options (key: label -> dest) |
|---|---|---|---|
| `main` | menu | MAIN_SAY by beat (12.2) | always 1: `For English` -> `eng`; 2: `For English but quieter` -> `quiet`; 3: `For English, again` -> `main`; then two drawn per read (shuffle bag, no immediate repeat) from: 4: `To hear these options in a different order` -> `main` (reverses displayed order); 5: `For billing` -> `billing`; 6: `To speak with a representative` -> `rep`; 7: `To speak with the person who designed this menu` -> `designer`; 8: `For the directory` -> `directory`; 9: `For options you have already heard` -> `heard`. At beat 3+ may add 1 extra `holdtight` option `To confirm that you are holding`. From dial 60 on one of the two drawn slots may be `For Key Fatigue` -> `keyfatigue`. Max 6 shown. At beat 8+ replaced by `knows` (5.12) every other visit |
| `eng` | info | `You have selected English. It has been selected for you before.` | 5: `Acknowledge` -> `main` |
| `quiet` | info | `English, but quieter, is now playing. You will not be able to tell. That is the quiet.` | 5 -> `main` |
| `billing` | menu | `You have selected Billing. Billing would like to know if you have considered Shipping. Shipping would like to know the same about Billing.` | 1: `Being billed` -> `billed`; 2: `The quiet feeling that you have been billed` -> `feeling`; 3: `Shipping` -> `shipping`; 4: `Sales` -> `sales` |
| `billed` | menu | `You have reached Being Billed. This menu is for people who have been billed. It is also for people who will be.` | 1: `To dispute the bill` -> `acct`; 2: `To pay the bill` -> `paid`; 3: `To be told how much` -> `amount`; 4: `To be billed for this call` -> `callbill` |
| `feeling` | info | `The quiet feeling that you have been billed is not a charge. It is a mood. We have noted it.` | 5 -> `main` |
| `paid` | info | `Your bill has been paid. We would like to thank whoever paid it. We are not sure who that was.` | 5 -> `billing` |
| `amount` | info | `The amount is a number. It is the number you are thinking of. Thank you.` | 5 -> `billed` |
| `callbill` | info | `This call has been billed to this call. The balance is zero and also due.` | 5 -> `main` |
| `shipping` | menu | `Shipping. For packages that have left, press 1. For packages that have not, press 2. For packages that are thinking about it, press 3.` | 1: `Packages that have left` -> `lost`; 2: `Packages that have not` -> `returns`; 3: `Packages that are thinking about it` -> `techdiff` |
| `sales` | menu | `Sales is also on hold. Sales would like to speak to someone too.` | 1: `To speak to Sales` -> `salesinfo`; 2: `To sell us something` -> `main`; 3: `To be sold` -> `returns` |
| `salesinfo` | info | `Sales is on hold. Sales has asked us to say it is not a good time, but it is an excellent moment.` | 5 -> `sales` |
| `returns` | menu | `Returns of Returns. To return an item, press 1. To return the return, press 2. To return the call, press 3.` | 1: `Return an item` -> `main`; 2: `Return the return` -> `returns`; 3: `Return the call` -> `holdsupport` |
| `compliments` | menu | `The Compliments department is closed. Press 1 to leave a compliment after the tone. There is no tone.` | 1: `Leave a compliment` -> `complimentinfo`; 2: `Complaints about Compliments` -> `complaints` |
| `complimentinfo` | info | `Your compliment has been left. It will be received on a Tuesday and returned to sender with thanks.` | 5 -> `main` |
| `complaints` | menu | `Complaints about Compliments. To complain about a compliment, press 1. To compliment a complaint, press 2.` | 1: `Complain about a compliment` -> `complaints`; 2: `Compliment a complaint` -> `compliments`; 3: `Neither` -> `main` |
| `lost` | menu | `You have reached Lost Lines. Your line is lost. Press 1 if you found it. Press 2 if it found you.` | 1: `I found it` -> `main`; 2: `It found me` -> `techdiff` |
| `holdsupport` | menu | `Hold Support. For help with being on hold, press 1. For help with help, press 2. For hold support support, press 3.` | 1: `Help with being on hold` -> `holdtight`; 2: `Help with help` -> `holdsupport`; 3: `Hold Support Support` -> `holdsupport2` |
| `holdsupport2` | menu | `You have reached Hold Support Support. We support the people who support hold. They are on hold.` | 1: `To support them` -> `main`; 2: `To be supported` -> `holdsupport` |
| `techdiff` | menu | `We are experiencing technical difficulties about this menu. This menu has asked not to be pressed.` | 1: `Press it anyway` -> `main`; 2: `Leave it alone` -> `menuaboutmenu` |
| `menuaboutmenu` | menu (min beat 5) | `Press 2 for the menu about the menu. You have pressed it. This is the menu about the menu. It is about this.` | 1: `The menu about the menu about the menu` -> `main`; 2: `Back` -> `techdiff` |
| `tuesday` | info | `You have reached Tuesday. Tuesday is not available. Tuesday never is. That is what makes it Tuesday.` | 5 -> `main` |
| `keyfatigue` | menu | `You have reached Key Fatigue. This queue is inside the other queue. Please hold within your hold.` | 1: `To rest the keys` -> `main`; 2: `To be rested` -> `holdsupport` |
| `designer` | info | `The person who designed this menu is on hold. They designed it that way.` | 5 -> `main` |
| `directory` | keypad | `If you know your party's extension, enter it now, followed by pound.` | exit: DIRECTORY_RESULT by digits (12.3) -> `main` |
| `acct` | keypad | `Please enter your account number, followed by pound.` | exit: `You entered {d}. That is not an account. It is now.` -> `main` |
| `rep` | menu (beat < 5) | `Representatives are unavailable at this time and at most others.` | 1: `To hold` -> `main`; 2: `To hold more` -> `main`; 3: `To hear this again` -> `rep` |
| `repvoice` | voice (beat >= 5, replaces `rep`) | `Please say Representative.` | exit: the heard-it confirm menu (5.8) |
| `acctvoice` | voice | `Please say your account number.` | exit: heard-it confirm (5.8), reaction uses the raw text (12.3) |
| `holdtight` | hold | `To confirm that you are holding, please hold any key for three seconds.` | exit: `You are holding. This has been entered under Holding.` -> `main` |
| `heard` | generated | calm voice: `Here are the options you have already heard. They are the same, but calmer.` | clones the last visited non-main node's options (or `main` if none) |
| `knows` | generated (beat >= 8) | see 5.12 | see 5.12 |
| `confirm` | menu (generated by VOICE exit) | `Did you say '{h}'? Please say yes or no.` | 1: `Yes` -> `main`; 2: `No` -> `repvoice` (or `acctvoice`) |
| `prevs2` | info (Season 2+, first `0`) | `Oh, you came back to this.` | 5: `Acknowledge` -> `main` |
| `xfer` | transfer | see 5.9 | |

Extra generic fallback: any menu whose destination id is missing falls back to `main` with a reaction (never throw).

### 5.8 Voice recognition (any VOICE node and the "still here" ping)

On Send/Enter with text `raw` (trimmed, collapsed whitespace, shown back at most 24 chars, never echoed with angle brackets: set via `textContent`):
- Empty: the EMPTY_SAY line (`You said nothing. We have forwarded it to Nothing.`), no mishear counted.
- Letters present, all letters uppercase and at least 3 letters, or contains `!`: SHOUT line first.
- Contains the word `please` (case-insensitive): COURTESY line first and `api.award(0.3)`.
- Mishear: `S.voiceTries += 1` (cycle length 8). Tries 1 to 4 of the cycle: `h = HEARD[(P.util.hashStr(raw.toLowerCase()) + tries * 3) % 7]` with HEARD = `['Reptile Talk Fest','Rapid Sentiment Tip','A Pep Rally Toothpaste','Wrap Presents At Eve','Reprieve Of Tuesday','Rep And Sentry Active','Repeat Taste Ative']`. Tries 5 to 7: `h='a very loud nothing'`. Try 8: the ECHO line (`You said '{raw}'. We heard that. We are as surprised as you.`) and the counter resets to 0. (Using `* 3` mod 7 means five consecutive tries in the same cycle produce different phrases.)
- Stat `hold-music.mishears` +1. Persist the set of distinct phrase indices seen (`api.save` key `heard`, array of ints 0-6); when it has 5 entries unlock `hold-music.voice-sultan`.
- Then show `Did you say '{h}'? Please say yes or no.` then the REACTION `You said '{raw}'. That is also what we heard.` and go to the generated `confirm` menu.
- A voice submit never throws; `raw` containing `{` `}` is fine because the module's `fill()` only replaces known tokens in authored strings, never in user text.

### 5.9 Transfer roulette (beat 6+)

Status `TRANSFERRING`. The card shows a slot window of 3 `div` reels. Each reel refreshes its text every 90ms (one managed `setInterval`) with a random name from REEL_NAMES (12.8) and stops staggered at 1.8s, 2.4s and 3.0s on the destination (reels 1 and 2 stop on near-misses, reel 3 on the chosen destination). `*` while spinning or within 3s after (Skip) spins again (max 3 skips, then TRANSFER_SHOWN line). Destination chosen with `api.pick` from the eligible list: Department of Departments, Department of Transfers (transfers you back, short), Department of Hold Music, Voicemail of Voicemail, Sandra (out of office), Window 4, Gerald (only if `api.flag.get('metGerald')`, else not eligible), Department of Toast (only if `api.stat.get('toaster-debate.entered') > 0` and not yet visited this session). Never the same destination twice in a row. Each destination is an INFO node (12.8) that returns to `main` (or via 5 to acknowledge). `api.stat.inc('hold-music.transfers')`, `api.award(0.2)`.

### 5.10 The heartbeat (keep-alive)

Schedule: `nextPing = sim + randInt(45,75)` after each ping ends; the first ping at sim 60 (Season 1) or 30 sim seconds after a season starts. Never before sim 30. A ping starts only when `mode==='ivr'` and `idleSim < 30` (if the player has been idle >= 30 sim seconds the ping is SKIPPED and the soft line fires instead (12.9, IDLE_SOFT), so an absent player is never failed); if the mode is busy, retry in 3 sim seconds. The card is hijacked: a 7-second ring-timer (real ms) and the question. Variant by sim time (all variants possible after 390): sim < 120 any key or click; 120 to 180 press exactly 5, or "the key below 4" (7), alternating; 180 to 240 type `still here` in the voice field (case-insensitive, trimmed, the voice field shows); 240 to 300 hold `#` for 2 seconds (5.4); 300 to 390 press `*` then `#` in that order (a wrong key resets the sequence); 390+ a random variant from all.
- A wrong input shows a PING_WRONG line and does NOT fail early. The ring running out fails.
- Success: PING_OK line, `api.award(0.2)`, stat `hold-music.pings`, mode back to `ivr` (the node re-reads silently, the timeout ring restarts).
- Failure = DISCONNECT (5.13).

### 5.11 Interludes (every 4th node read, rotating)

Order: IMPORTANT (the clause arc), ETA (by beat), RECORD (training), POSITION (`Your position is now {pos}. Do not check again. Checking again increases it.` or `Good news. Your position has improved by 1. Bad news: so has everyone's.`). The IMPORTANT interlude is `Your call is important to us ` + `CLAUSES[min(S.clauseIdx, CLAUSES.length-1)]` + `.` and `S.clauseIdx += 1` each time it is read (gag 2, 12.6). At the finale it is spoken bare.

### 5.12 The menu knows you (beat 8+, generated `knows` node)

Intro: `The menu has been updated based on your history. Your history was consulted. It did not mind.` Options (all computed at read time, never throws, fall back to `main` if the history is empty):
- 1: `Press 1 to repeat the option you pressed two minutes ago.` -> the node recorded at least 110 sim seconds ago (else the oldest node in history).
- 2: `Press 2 to hear what you said to the Human, as a comfort.` -> info node reciting `S.lastHumanWords` (the last Human's fragment) or `You said nothing to the Human. The Human has kept it.`
- 3: `Press 3 to hear your most pressed key.` -> info: `Your most pressed key is {k}. It has been pressed {n} times. It is tired.`
- 6: `To speak with the person who designed this menu, press 6 (they are also on hold).` -> `designer`.
- 7: `Press 7 to be told what you will press next. You will press 7.` -> `main`.
History = last 12 `{nodeId, sim}`; pressed counts come from `S.pressed` (per key).

### 5.13 Hang up, disconnect, redial, Carol

- Hang up (button two-step, `H`,`H`, or after the pity rule): `mode='down'`, status `DIAL TONE`, a dial-tone line, sim clock paused, a **REDIAL** button appears focused in the card (with `Press any key to redial` is NOT true: only the button or Enter on it). Records `S.hangups`, `S.sinceHangup=0` (resets the 5-minute patience timer).
- REDIAL: CALL # +1, `S.redials += 1`, stat `hold-music.redials`, position set to `4,000,000 + S.redials` (offset rule, 5.2), the REDIAL_GREET line, Carol appears behind you in the queue strip (name tag `Carol`), call timer resets to 0, node re-reads `main`.
- **Failed heartbeat** leads here too with the PING_FAIL line instead of the hang-up line. Two failures in a row (no successful ping between them): the PITY rule: at redial Carol gives your old place back (position restored to the value held at disconnect, PITY line, `S.pity` flag so it can trigger once per 5 minutes).
- **Crossed-line hang-up** (6.x): a redial that is not a redial: dial tone for 1.2 s, CALL # +1, position unchanged, no Carol, no `redials` stat, then back to `ivr` automatically.
- The module can never end because of any of this.

### 5.14 Spam rule (Enthusiasm Surcharge)

`pressTimes[]` of the last 3000 real ms (use `api.now()`). More than 14 dials in 3000 ms triggers: `api.award(-1)`, `api.sfx('buzz')`, the SPAM lines (Management + IVR), a card `Billing (Enthusiasm Dept.)` is added to the Rolodex (it just breathes: `scale` keyframe, unique, added once; counts toward the 12 cap as a normal card), and the keypad goes **sticky for 4 real seconds**: each key accepted at most once per 1000ms (per key id), buttons show the honey overlay. A trigger cannot repeat while sticky or within 10 seconds after (cooldown). Stat `hold-music.surcharges`. Hammering `*` during sticky (3 or more rejected `*` presses) plays `api.sfx('sad')` and shows the SIGH line once per sticky window. When sticky ends: STICKY_END line, overlay removed. Option buttons also dial through `dial()` so they obey sticky. Unlock `hold-music.surcharge` (secret) on the first surcharge.

### 5.15 Humans (the running mechanic)

Schedule (sim seconds, Season 1): pickups at `[90,150,210,270,330,400,455,505]` plus a random 0 to 15 sim-second slip each; pickup number `i` (1..8) reveals `WORDS[i-1]` with `WORDS=[1,2,3,5,7,9,12,16]` tokens of `SENTENCE = ['Hello,','thank','you','for','calling','Customer','Experience,','my','name','is','Trevor,','how','can','I','help','you','today?']` (17 tokens). Truncation: the first pickup is the special `Hel-`; others `tokens.slice(0,n).join(' ')` with trailing `,` or `?` stripped, then `- please hold.` appended (e.g. pickup 3: `Hello, thank you- please hold.`). Season 2+: pickups at the same times, lines from HUMAN_S2 (no prefix gag).
A pickup starts only when `mode==='ivr'` and `idleSim < 30` (otherwise it is MISSED: the HUMAN_MISSED line, pickup index NOT consumed, retry at the next 30 sim seconds); if busy, retry in 3 sim seconds. A slip never pushes a pickup past the final-approach start (sim 540): if still unspent at 540 they are skipped.
Sequence (mode `human`, ivr timeout paused): status `CONNECTING`, click sfx (`api.sfx('pop')`), a green phone flashes, SPEAK appears (visible for 2.5 s from now). Click phase 0.8 s. Then the Human's text types out word by word (180ms per word) into a paper speech bubble; on the cut-off a rubber stamp `PLEASE HOLD` slams in (scale 1.6 to 1 over 140ms; reduced motion: no scale), then `api.sfx('stamp')`. After the stamp, for pickups with >= 3 words, one HUMAN_TAIL murmur may appear below (50%).
- SPEAK pressed during the click phase (0 to 0.8 s): the Human says the INTERRUPTED line instead, no words revealed (card says 0 words, `(interrupted)`), `S.interruptions += 1`, stat `hold-music.interruptions`.
- SPEAK pressed after the Human begins (within the 2.5 s window): `api.award(0.5)`, SPEAK_OK line.
- SPEAK not pressed: the Human completes anyway, `api.award(0.2)`, SPEAK_NONE line.
- Variants replacing the text of a standard pickup (index still consumed): **Gerald** at pickup 4 (`api.flag.get('metGerald')` true: GERALD_YES, sets nothing else; false: GERALD_NO, which does not set the flag; when the flag is true and he speaks `api.say(who:'Gerald')` the line too); **Brenda** at pickup 6 if `api.stat.get('complaints-dept.entered') > 0` (BRENDA line); **on hold too** with 1-in-12 chance at pickups 3, 5 or 7 (`api.chance(1/12)`): text `Thank you for- oh no. Please hold.` then a click and, 2 seconds later, a faint `Hello? Hello? Is anyone there?` from the cradle; `api.award(3)`; stat counters as normal; line flag `S.heldToo=true`.
- Always: stat `hold-music.pickups` +1, a Rolodex card (name `Trevor` unless a variant: `Gerald`, `Mr. G. Potato`, `Brenda`, `Trevor (also on hold)`), bold words, Call Log entry. Pickup index >= 5 reached with the player present (not missed) unlocks `hold-music.almost-heard`. `api.stat.max('hold-music.words', WORDS[i-1])`.
- Menu gets back its timeout ring after the Human leaves.

### 5.16 Hold music (the thing that evolves)

One managed `setInterval` at 125ms (`S.step = (S.step+1) % 16`). NEVER tied to menus. On the step: play the tier's pattern via `api.sfx` names, update the 12 equalizer bars to values from a small seeded table (`api.rand`), occasionally rotate the note row. Use `api.now()` for tap-window phase (5.17) so a late tick does not break the beat grid.

| tier | when (sim s, Season 1) | caption (Now playing:) | pattern per 16 steps (api.sfx names) | glyph |
|---|---|---|---|---|
| 1 | 0-60 | `Smooth Jazz (Elevator Grade). Composed by a committee, performed by an apology.` | bloop on 0,8; blip on 4,12 | U+1F3B7 sax |
| 2 | 60-120 | `Smooth Jazz (Reverb Added Where It Was Not Asked).` | tier 1 plus tick every step | U+1F3B5 notes |
| 3 | 120-240 | `A Single Note, Apologizing.` alternating each 16 bars with `Pan Flute Interpretation of a Fax.` | tier 2 plus bell on 0 and 10 | U+1F3BA trumpet |
| 4 | 240-300 | `Your Own Ringtone, Played Back to You Slightly Disappointed.` | tier 3 plus sad on 0 | U+1F3BB violin |
| 5 | 300-390 | `Someone Else's Hold Music, Leaking Through the Wall.` | tick alone (no bloop) | U+1F941 drum |
| 6 | 390-450 | `Silence, Remastered. The silence has been remastered. You can hear it better.` | mute 4 bars (64 steps), then `pop` once, then silence for the rest of the tier | none, then U+1F514 bell once |
| 7 | when licensed | `Your Tapping. Management has licensed it. Royalties are payable in Tuesdays.` | the player's 8 saved steps played as bloop (tick on the rest of the beat steps 0,4,8,12) | U+1F3B6 |
| 8 | 450-540 | `The Sound of the Queue, Humming Nervously.` | bloop on 0,4,8,12 only | U+1F442 ear |
| 9 | 540 on | `Smooth Jazz (Elevator Grade), Finally Allowed To Feel Something.` | tick every step, blip on 4,12, bell on 0 and 8, bloop on 0 | U+1F3BA |

Tier 7 replaces tiers 2 to 6 once `S.licensed` (never over 8 or 9). In Season 2+ the base tier is 7 from the start (the saved rhythm if one exists, else the default rhythm `[0,3,6,8,11,14]`). A `tier` change shows the new Now playing caption, rebuilds the note row and, for tiers 2 and 6, Management speaks MUSIC lines. Tier 1 gets the Elevator callback caption (12.5) appended if `api.stat.get('elevator-simulator.entered') > 0`. While idle for 30 sim seconds the music "dips": skip the bloop steps (leave ticks). Extension 7 1/2 and crossed-line silence the music (flat bars). Muting audio is the engine's job; the staff keeps animating.

### 5.17 Tap along and Rapport

Unlocks at beat 4 (sim >= 120): `api.sfx('fanfare')`, the TAP_UNLOCK line, the button enables. Quarter-note beats are steps 0, 4, 8, 12 (every 500ms). A tap (button click or `T`, not when in the voice field) is ON BEAT when `|t - nearestBeatTime| <= 90ms` where beat times are derived from the last step timestamp (`S.stepAt = api.now()` each step, so `beatPhase = (S.step % 4) * 125 + (t - S.stepAt)` and distance to the nearest multiple of 500). On beat: Rapport +8 (max 100), `api.award(0.1)`, stat `hold-music.taps`, `api.sfx('tick')`, occasional RAPPORT_UP line; off beat: Rapport -3 (min 0), a note wobbles (wince), WINCE and OFFBEAT lines, no award. Rapport decays 1 per 3 sim seconds. Record the last 8 tap step positions (0-15, quantized from the tap time). At Rapport 100 (first time per session): the 8 steps are saved as the rhythm (`api.save` key `rhythm`), `S.licensed=true`, LICENSED line, `api.award(1)`, tier 7 from now. Rapport resets to 40 after licensing so the heart keeps pulsing. Nothing is gained.

### 5.18 The curly cord and the handset (locked until beat 4)

`stretchFt = clamp(distance(base, handset) / maxPx * 7.5, 0, 7.5)` where `maxPx = 0.8 * boxWidth`. Dragging moves the handset with the pointer, clamped to the box and to `maxPx`. Meter shows `Cord: x.x ft`. At 7.5 ft: handset stops (taut flag set until it drops under 7), `api.sfx('bloop')`, the CORD_TAUT line from Management once per 20 s. Orbit tracking: accumulate signed angle changes of the handset around the base; at accumulated |angle| >= 4*PI (two full turns) the cord is TANGLED: 3 SVG knot circles are drawn on the cord (fixed nodes, toggled `display`), Management says the TANGLE line, unlock `hold-music.tangled` (secret) once. On release: if within 8% of `maxPx` of the base AND stretch was > 3 ft since the last release, the handset snaps back (a 220ms transform animation; reduced motion instant), `api.sfx('boing')`, `api.award(0.3)` (at most once per 20 s real), SNAP line. Releasing resets the angle and clears knots when back at base. Arrow keys nudge 12px. Never write per-frame code for the cord. Stat `hold-music.cord` via `api.stat.max('hold-music.cord', Math.round(stretchFt*10))`.

### 5.19 Idle ladder (sim seconds with no input; any dial, click, key, tap or handset drag resets `idleSim` to 0)

- 30: the music dips (no bloop); heartbeats and Human pickups are skipped, never failed.
- 60: **Marguerite**: her name tag in the queue strip grows a speech bubble `Hello? Are you in the queue? I'm ahead of you. I'm Marguerite. I've been here since a Tuesday.` plus a single reply button `Hi Marguerite` inside the strip. If pressed (any time while idle >= 60): she tells the three-line story (12.9) one line every 3 real seconds, `api.award(0.5)`.
- 120: Management IDLE_QUIET line.
- 180: **`You go ahead.`** (once per session): her bubble says it, the odometer swaps: `S.offset = 3999999 - base(sim)` (player reads 3,999,999) and her tag shows `Marguerite 4,000,000` for 20 sim seconds; she says it is fine, and it is not fine. Unlock secret `hold-music.marguerite`. `api.award(2)`.
- 300: IDLE_PEACE Management line (strangely touching, once).
- Any input after idle >= 30: IDLE_BACK line (Management, `priority 0`) and the music returns.
- Idle never fails the call. Idle stages advance while the sim clock runs; they are separate from beat events, and the finale is DEFERRED while `idleSim >= 30` (position stays at the 540 anchor, the LCD flashes `PLEASE HOLD`) so the player is present when the sentence is spoken.

## 6. SECRETS AND RARE EVENTS

1. **EXTENSION 7 1/2**: dial `7`, `5` (within 6 s) then HOLD `#` for 1.5 s, valid at any time except `down` and the finale and any hold-tight gesture in progress. Mode `ext`: no IVR, no music (bars flat), status `EXT 7 1/2`, the card shows EXT_RING line and a silent pulsing ring. Management says nothing for 7.5 seconds, then `We will not discuss that.` and awards 7.5 Meh (`api.award(7.5)`), unlocks `hold-music.pontiff` (secret), `api.sfx('bell')` once at the start. After 12 s total (or any press after 8 s) return to `ivr`.
2. **THE CROSSED LINE**: eligible from sim 180; every 20 sim seconds a 1-in-25 chance (`api.chance(1/25)`); guaranteed once by sim 320 if it has not happened this session. Only starts in `ivr` mode. Music is replaced for 8 seconds by two people arguing (Doreen and an unnamed caller): the staff glyphs become two busts, caption `Two People, Leaking Through the Wall`, CROSS lines type one per 2.2 s. A button appears `Press # to listen in` (also the `#` key, short press). Pressing it plays 3 more lines ending `Is someone on the line?`, and then the caller hangs up on YOU (5.13 crossed-line hang-up). Unlock `hold-music.eavesdropper` (secret) on listening in. If not pressed: after 8 s the argument fades and the call continues, unlock nothing.
3. **THE HUMAN WHO IS ALSO ON HOLD**: see 5.15 (1 in 12 at pickups 3, 5, 7), pays 3 Meh.
4. **DIAL YOURSELF**: the rolling key buffer matching `4,0,0,0,0,0,0` (within 8 seconds) connects you to yourself: the LCD reads `4,000,001` with a small tag `(BEHIND YOU)`, the IVR plays the YOURSELF lines, and `api.award(3)`. Then `You have been consolidated.` and the offset is cleared.
5. **THE CORD**: taut at 7.5 ft, tangled by two orbits, snap-back pop (5.18).
6. **ENTHUSIASM SURCHARGE**: the sticky keypad and the breathing `Billing (Enthusiasm Dept.)` card (5.14).
7. **MARGUERITE'S PLACE IN LINE**: idle 180 (5.19).
8. **CHOIR OF THE HELD** (beat 9, not secret but moving): see section 7.
9. **TIME CAPSULE CALLBACKS**: every Human card, the Rolodex, Marguerite's `Trevor? He has never gotten past the comma.` line (she says it once at beat 8 if any Human has been met), and the finale full sentence all depend on one another.

## 7. THE ESCALATION TIMELINE

Real play: about 9 minutes to the finale. Each row lists what changes AT that sim second (beat entry actions fire once). The arc: normal -> weird -> bureaucratically unhinged -> strangely touching -> back to normal like nothing happened.

| beat | sim s | name | what changes |
|---|---|---|---|
| 1 | 0 | THE GREETING | Auto-answer: LCD rolls to 4,000,000 within 3 s, ETA `11 CENTURIES`, GREET lines typed (first joke by 3s), Menu 1. Music tier 1 plays. Management speaks OPEN. No input needed |
| 2 | 30 | THE MENUS BREATHE | Every option leads back to a slightly different `main`; MAIN_SAY switches to the `Please listen carefully, as our menu options have changed. They changed just now. You were here.` family; ETA casing changes; `0` first returns to a never-existed previous menu. Management b2 line. Position drops by single digits |
| 3 | 60 | FIRST HEARTBEAT | First ping (any key) at about sim 60; Lionel joins the strip; tier 2 (Management MUSIC line). First Human at about sim 90 (`Hel-`); the Rolodex opens with card #1. Rolodex button appears. Management b3 line |
| 4 | 120 | THE CORD AND THE CLAP | TAP ALONG unlocks with a fanfare of nothing; handset becomes draggable; cord meter appears; ETA `+/- a Tuesday`. Heartbeat now asks for specific keys. Tier 3. Human #2 (`Hello, thank-`) at about 150 |
| 5 | 180 | VOICE RECOGNITION | `repvoice` replaces `rep`; mishearing engine appears; the surcharge rehearsed speech becomes available; Marguerite appears (named) one place ahead; crossed line becomes eligible; the heartbeat can ask for `still here`. Cross-module callback lines fire here (12.10). Human #3 at about 210 |
| 6 | 240 | TRANSFER ROULETTE | Transfers begin (30% on non-main destinations), the slot window appears; tier 4. Human #4 at about 270 (Gerald or Mr. G. Potato) |
| 7 | 300 | THE RECOUNT | The odometer jumps UP to about 4,000,300 (RECOUNT line); crossed line guaranteed by now; Management reveals it is also on hold; heartbeat variants include hold-# and star-then-hash; tier 5. Human #5 at about 330 gets seven words (Knight Commander) |
| 8 | 390 | THE MENU KNOWS YOU | `knows` generator; `0` becomes `the previous menu you have not yet visited`; tier 6 (4 bars of silence, then one pop; Rapport 100 licenses the tapping); Marguerite says the Trevor line. Human #6 at about 400 (Brenda if complaints-dept visited) |
| 9 | 450 | THE CHOIR OF THE HELD | Everyone in the strip lights up in sequence (400 ms apart, then all lit); the music becomes a hum from all callers (tier 8, ear glyph); Marguerite speaks (MARGUERITE_CHOIR); Management admits it has been on hold nine years. Every action is answered with a tender, slightly wrong CHOIR_REACT line. Human #7 at about 455 (twelve words), Human #8 at about 505 (sixteen) |
| 10 | 540 | FINAL APPROACH, THEN SEASON 2 | Odometer rolls from about 3,997,000 down to 1 over 25 sim seconds with the music swelling (tier 9), desk tilts 1.5deg, heartbeats and pickups stop. At 1: the line clicks and the full sentence is spoken (section 11) |

Management beat lines (12.1) fire at the beats. Heartbeats continue between 60 and 540. In Season 2+ the arc restarts at sim 60 (beat 3) so it takes about 8 minutes and Humans use HUMAN_S2.

## 8. ACHIEVEMENTS (ids prefixed `hold-music.`, all declared in the file, >= 2 secret; reward values small)

| id | name | desc | secret | reward | trigger |
|---|---|---|---|---|---|
| `hold-music.grand-chancellor` | Grand Chancellor of the Held | Stay on hold for 5 minutes without hanging up. Your patience has been noted, notarized, and filed under Patience, Noted. | no | 5 | `sinceHangup >= 300` sim seconds (reset by hang-up / disconnect) |
| `hold-music.previous-menu` | Lord Warden of the Previous Menu (Which Did Not Exist) | Press 0 to 'return to the previous menu' 10 times. Each one was prepared specially for you. They would like you to know that. | no | 3 | 10th `0` |
| `hold-music.almost-heard` | Knight Commander of Almost Being Heard | Get a Human to say a full 7 words before they say please hold. The 8th word was not available at this time. | no | 3 | pickup index >= 5 delivered with the player present |
| `hold-music.voice-sultan` | High Sultan of Voice Recognition (Disputed) | Be misheard 5 different ways. The machine remembers every one and is proud of none. | no | 3 | 5 distinct heard-phrases (persisted set) |
| `hold-music.press-all` | Press All of the Buttons Society, Lifetime Membership | Press every key on the keypad, 0 to 9, star and pound, at least once. The society is you, and a toaster. | no | 2 | all 12 keys pressed this session |
| `hold-music.season-two` | Distinguished Order of Position 1, Rev. 4,000,000 | Reach caller number 1 for the first time. You are then returned to position 4,000,000 with honor. | no | 5 | finale completed |
| `hold-music.pontiff` | Supreme Pontiff of the Seven-and-a-Half Extension | Dial extension 7 and a half. It rings in the wall between 7 and 8. Nobody answers. It was perfect. | YES | 7.5 | secret 1 |
| `hold-music.marguerite` | Dowager Empress of Marguerite's Place in Line | Idle for 3 minutes and accept Marguerite's offer to go ahead. She says it is fine. The record shows it is not fine. | YES | 3 | idle 180 |
| `hold-music.surcharge` | Emperor of the Keypad, Who Has Been Asked to Stop | Press keys so enthusiastically that Billing (Enthusiasm Dept.) opens a file. The file is breathing. | YES | 1 | first surcharge |
| `hold-music.tangled` | Knight of the Form 27B/6 | Tangle the cord around the base twice. The cord files its own paperwork. | YES | 2 | cord tangled |
| `hold-music.eavesdropper` | Honorary Doreen | Listen in on a crossed line. Is someone on the line? Yes. It was you. | YES | 2 | secret 2 |

Stats (few, <= 12 names): `hold-music.dials .pickups .taps .transfers .redials .mishears .pings .interruptions .zeroes .surcharges .cord .words`, plus `api.stat.max('hold-music.season', n)` and `api.stat.max('hold-music.depth', depth)`.
`api.save` keys: `heard` (ints), `rhythm` (up to 8 ints), `seasons` (finishes), `maxWords`.

## 9. BEHAVIOR ON IDLE AND ON SPAM (summary, details above)

- **Idle:** the ladder in 5.19. Absent players are never failed: heartbeats and Humans are skipped with a soft line; the finale waits for presence. The music dips, Marguerite appears at 60, says go ahead at 180.
- **Spam:** more than 14 dials in 3000 real ms triggers the Enthusiasm Surcharge (5.14): -1 Meh, 4 s sticky keypad with honey overlay, IVR and Management comment, a breathing Rolodex card, tired sigh if `*` is hammered. Cooldown 10 s. The keypad is never locked; the sticky window is short on purpose. Spamming option buttons obeys the same rule (they dial). Spamming TAP ALONG: 14+ taps in 3 s makes the staff wince every tap (no award, Rapport -3 each) and Management says the TAP_SPAM line once per window.

## 10. VISUAL DESIGN

PALETTE (1970s office, warm and slightly sick, sitting inside the Lobby's thick-outline sticker world): harvest gold `#e0a526`, avocado `#8a9a3b`, burnt orange `#d9622b`, cream `#f3e9d2`, desk walnut `#7a4e2d` with 3 stacked `repeating-linear-gradient` wood-grain bands, LCD ink `#b7e36a` on `#1f2b14`, ink outline `#2a1f14` at 3px, sticker shadow `4px 4px 0 #2a1f14` on every card (matches the Lobby). Management lines use the engine bubble. The IVR uses the prompt card. The Human has a tiny paper speech bubble with the rubber stamp.

Layout: left column phone, right column prompt card + staff, strip across the bottom (two-column at root width >= 700px via a container query, stacked below that; stacked order: phone, prompt, staff, strip). Keypad 3x4 always. The handset stays draggable inside its box at 360px and the cord clamps.

Tricks: (1) per-digit odometer columns; (2) one-path curly cord with duplicate shadow path; (3) LCD flicker keyframe + text-shadow glow + scanlines; (4) equalizer from JS values, 12 divs; (5) key press ring box-shadow pulse; (6) conic-gradient timeout and heartbeat ring around the card; (7) tier glyph row (U+1F3B5 notes, U+1F3B7 sax, U+1F3BA trumpet, U+1F3BB violin, U+1F941 drum, U+1F514 bell, U+1F442 ear, U+1F3B6; NEVER accordion, harp, banjo or anything Emoji 13+); (8) queue strip sway; (9) desk tilt 1.5deg during Final Approach; (10) paper Call Log receipt (last 8 events). Finale plaque slides in (`translateY`), stamp slams in (scale 1.6 to 1, 140ms).

Reduced motion (`@media (prefers-reduced-motion: reduce)` and `.pm-reduce-motion .m-hold-music-...`; in JS read `!!root.closest('.pm-reduce-motion')`): odometer swaps instantly, no flicker, no stamp scale, no note row scroll, no strip sway, no tilt, no handset snap animation, no wobble. All animated features have a state-class fallback so nothing is hidden by missing animation.

Focus rings visible on every button (`outline: 3px solid #2a1f14; outline-offset: 2px`). Text colours meet AA (cream on ink, ink on cream, LCD ink on its dark green).

## 11. THE ENDING THAT IS NOT AN ENDING

At the end of Final Approach (position 1, and the player present: `idleSim < 30`; otherwise the odometer holds at about 3 and the LCD reads `PLEASE HOLD` until any input), `mode='finale'`:
1. The line clicks (`api.sfx('pop')`), status `CONNECTING`, music stops (staff flat), tilt cleared.
2. Trevor (Human bubble) says the full sentence, typed word by word: `Hello, thank you for calling Customer Experience, my name is Trevor, how can I help you today?` (all 17 tokens, NO cutoff).
3. Three reply buttons: `I would like to speak to a manager`, `I forgot`, `Nothing, I just wanted to be on hold`. If none is pressed within 20 real seconds the middle one auto-picks (`I forgot`). Whichever is chosen: Trevor says `Wonderful. That sounds like a different department. Please hold.` and the stamp slams.
4. A plaque slides in: `YOU HAVE BEEN CONNECTED. TO THE QUEUE.`
5. Management says its only sincere line, with no clause: `Your call is important to us.` (`api.say` mood `proud`, priority 2), `api.sfx('fanfare')`, `api.confetti()`, `api.award(5)`, stat, achievement `hold-music.season-two` (first time; the second time Management says `You have already arrived. Please arrive again.`), then 2.5 s later `That was the most meaningful 5 Meh in company history.`
6. After 5 more real seconds, with no transition: `S.season += 1`, sim restarts at 60, position resets to 4,000,000 (offset 0), LCD label `SEASON 2: CALLBACK`, Management says SEASON line. `api.save.set('seasons', ...)`, `api.stat.max('hold-music.season', S.season)`.

**Season 2 changes:** IVR greets `Welcome back, {player}. Press 1 if you are returning.` (typed first, then Menu 1 with option 1 relabelled `If you are returning`). Humans (HUMAN_S2) say `Hello again, please hold`. The hold music is your own tapped rhythm (tier 7 all the way, default rhythm if you never licensed one). Marguerite is one place ahead again and says `I waited for you. It was not long. It was a Tuesday.` Carol is promoted to caller 4,000,001 with a lanyard (her tag gets `(Lanyard)`). The first `0` goes to the INFO node `prevs2` (`Oh, you came back to this.`). ETA `11 centuries (again)`.
**Season 3+:** the caller ahead of you is YOU, wearing your own name tag (the `api.player.name`), and their bubble says `Please hold.` (they repeat it whenever you press anything, at most once every 12 s). The sentence the Humans say in Season 3+ stays HUMAN_S2. The position only means something to the odometer.
There is no way to win. Nothing waits for Season 4. Seasons repeat until the player leaves.

## 12. ALL LINES, VERBATIM

Authoring conventions: strings inside `P.addLines('m:hold-music:xxx', [...])` may only use the engine tokens `{player}`, `{meh}`, `{module}`, `{count}`, `{item}`. Strings in plain arrays (IVR, Human, card text) may use the module's own `fill(str, {k,n,label,h,raw,pos,d})` tokens `{k} {n} {label} {h} {raw} {pos} {d}` (a tiny `.replace(/\{(\w+)\}/g, ...)` that leaves unknown braces literal). User text is NEVER passed through `fill`; it is inserted with `textContent`. Never emit the words NaN, undefined, null or [object Object]. Management lines are spoken with `api.sayRandom` or `api.say`; IVR/Human lines are typed in the card by the module. Bags: use a shuffle-bag helper (`bag(arr)` returns a function that deals from `api.shuffle` and refills, never the same line twice in a row).

### 12.1 MANAGEMENT lines (use `P.addLines`)

`m:hold-music:open` (module enter, once at mount; the first fires after 1.2 s):
- Welcome to Customer Experience. Your experience has been scheduled. Please hold.
- Thank you for calling Management. You are now on hold with Management. Management is delighted.
- Your call is important to us in a way we cannot articulate. Management has tried, in a meeting.

`m:hold-music:beat` (spoken once at each beat entry in order, one line per beat; the engine will pick randomly: so instead the module calls `api.say(text)` directly with the matching line below):
- b2: Per my previous message: please hold. Per my message before that: also please hold.
- b3: Circling back to the heartbeat. It will ask if you are there. Please be there.
- b4: TAP ALONG is now available. It is a button. Management is thrilled and has no further details.
- b5: Please remain on the line. The line has been advised.
- b6: We are going to transfer you. Do not be alarmed. Be alarmed in a calm way.
- b7: Management would like to remind you that Management is also on hold. It is with Management. It is going well.
- b8: The menu has learned your habits. This is considered an improvement. Please do not look at it directly.
- b9: I have been on hold for nine years. I would not trade it. I would trade it for a Tuesday.
- b10: Final approach. Please keep your hands, feet and expectations inside the call at all times.

`m:hold-music:dial` (occasional comment, every 7th to 11th dial, priority 0):
- The keypad is a very good listener. It has no opinions, which is why it is on hold.
- Dial {count} noted. Dials are tracked. By whom is a Sandra matter.
- Pressing keys in the order given is technically a skill. We have written it down.
- Every number you press is a number. We have checked.
- A reminder that this call is recorded for training. You are the trainer. Thank you for your service.
- The estimated wait has not changed. Management considers this a form of stability.
- Press 0 to return to the previous menu. There was no previous menu. One has been prepared.

`m:hold-music:zeroes` (the 10th `0`):
- That is ten previous menus. Each was prepared specially for you. Each would like you to know that.

`m:hold-music:music` (tier changes):
- The music has been upgraded. It now has reverb, which nobody requested.
- The music has moved to a single, apologetic note. It would like to be left out of this.
- Silence has been scheduled for four bars. Please enjoy it responsibly.
- Someone else's hold music is leaking through the wall. We have informed them. They are on hold.

`m:hold-music:ping`:
- A heartbeat check is in progress. Please be alive for the next seven seconds.
- We noticed you left. That's fine. We held your place for four seconds. It is now Carol's.
- You have been disconnected. This is not a failure. This is a standing feature of the line.
- Welcome back. We saved your place. It is where you left it, minus all of it.

`m:hold-music:tap`:
- Rapport with the hold music has increased by {count} percent. The hold music has not noticed you. It is very busy.
- You are slightly off the beat. The beat has been informed.
- Perfect timing. The music wants you to know it did not need the help.
- A note has winced. It is fine. It has been through worse.
- Rapport 100. Your tapping has been licensed to the hold music. Royalties are payable in Tuesdays.
- Rapport is declining. The hold music has moved on. It did not say goodbye.
- That was a lot of tapping. We have filed it as a drum solo.

`m:hold-music:cord`:
- You have stretched the cord to 7 and a half feet. The cord has filed a grievance. It is coiled and bitter.
- The cord is now tangled. This is a Form 27B/6 matter.
- The cord has snapped back. It would like to be left alone for a moment.
- The ear has been switched. The hold music is now in your other ear. It is slightly different. It is not.

`m:hold-music:spam`:
- Our system has detected excessive enthusiasm. A surcharge of 1 Meh has been applied, payable to the enthusiasm.
- Please press your keys one at a time. We are a small system and we have feelings.
- Billing (Enthusiasm Dept.) has opened a file. The file is breathing.
- The keypad is now sticky. This is not a feature. It is, however, consistent.
- The keypad has recovered. It has not forgotten.
- (a very tired sigh)

`m:hold-music:idle`:
- Hello? ... Still there? ... That's fine. We're also here. Both of us.
- The line has gone quiet. Quiet is a feature. It is billed separately.
- We have placed ourselves on hold as well. It is very peaceful here.
- Welcome back. You were missed by someone. It was us.
- Marguerite says it is fine. It is not fine. She is now 4,000,000.

`m:hold-music:cameo`:
- Thank you for visiting many departments. Please hold while we route you to the department you are already in.
- Our records show you have been to the elevator. The elevator sends its regards from Floor 4.
- Our records show you are very busy with something else.
- Sandra from Compliance has listened to this call. Sandra had notes. The notes were on hold.
- I am also on hold. Different queue. Same potato. (spoken with `who:'Gerald'`)
- Your call has been toasted. (spoken with `who:'The Toaster'`)
- toast. (spoken with `who:'The Toaster'`)

`m:hold-music:choir` (beat 9, every action answered with one, tender and slightly wrong):
- That was lovely. We would like to hear it again, but later.
- The queue would like you to know it saw that.
- Thank you for pressing that. It meant something. It meant a number.
- Everyone is here. Nobody is going anywhere. It is the nicest thing about the line.
- That key has been pressed by someone before. They sent their regards. They are still here.
- You are being held. It is mutual.

`m:hold-music:end`:
- Your call is important to us.
- That was the most meaningful 5 Meh in company history.
- You have already arrived. Please arrive again.
- Welcome to Season {count}: Callback. Your call is important to us. We checked.
- Season 3. The caller ahead of you is you. We recommend not making eye contact. You are very easy to recognize.
- Congratulations. You have reached the end of the queue. The queue continues.

`m:hold-music:secret`:
- We will not discuss that.
- That is 7.5 Meh. It is the only amount that was ever going to be correct.
- You have been hung up on. This is not a redial. It is a redial that has not been told.
- The number you have dialed is the number you are calling from. The line is busy. It is you.
- You have been consolidated.

`m:hold-music:recount` (beat 7):
- Callers ahead of you have been re-counted by hand. The hand has been thanked.
- A recount has added callers. The recount was asked to stop. It is thorough.

`m:hold-music:human` (Management reactions to Humans):
- A Human has been detected. This is not a drill. It is an event with a stamp.
- The Human has said please hold. They are very good at it. They have been trained.
- Missed Human Incident Report, Form 27B/6, has been filed on your behalf. Form 27B/7 was destroyed in 1998.
- Trevor has never gotten past the comma. Management has asked him to try the comma. He is trying.
- The Human was also on hold. This is considered normal.

`m:hold-music:season` (season starts):
- Season 2: Callback. Please hold.
- Welcome back, Valued Employee. Your position has been preserved in a manner that is technically correct.
- You are caller 4,000,000 again. Your history has been kept. It is in a drawer.

`m:hold-music:transfer`:
- Please hold while we transfer you. Please hold while we transfer you. Please hold while we transfer you.
- Transfers are routed at random by a roulette. The roulette has a license.
- We transferred you to where you already were. It was a close call.

### 12.2 IVR: greetings and main-menu speeches (typed in the card)

GREET (beat 1, first read, both lines typed in sequence):
- Thank you for calling. Your position in the queue is 4,000,000. It is a number, and we stand by it.
- Your call is important to us in a way we cannot articulate.

MAIN_SAY (pick by beat, no immediate repeat):
- b1: For English, press 1. For English but quieter, press 2. For English, again, press 3.
- b2+: Please listen carefully, as our menu options have changed. They changed just now. You were here.
- b2+: To hear these options in a different order, press 4. To hear them in the same order, press 4 again, which we will treat as a new request.
- b3+: Press 9 for options you have already heard. Press 9 again for the same options in a calmer voice.
- b3+: To speak with a representative, press 6. To speak with the person who designed this menu, press 7. They are also on hold.
- b5+: If you know your party's extension, press it now. If you do not know your party, press nothing and become a mystery.
- b2+: Our menu options have not changed. Please listen carefully anyway.
- b2+: Welcome to the main menu. You have been here. The main menu remembers you fondly and without details.
- b6+: This menu has been recorded in a calm voice. The voice has asked to be left out of it.
- b8+: Press 0 to return to the previous menu you have not yet visited.
- Season 2+: Welcome back, {player}. Press 1 if you are returning.

### 12.3 IVR: reactions and bags

REACT_GENERIC (typed instantly above the next speech, token `{k}`):
- You have selected {k}. {k} has been noted. It is in a drawer.
- Thank you. That option has been selected. It was not available. We selected it anyway.
- You pressed {k}. We heard {k}. These were different. We went with the first.
- Option {k} is very popular. You are the only person who has chosen it.
- Option {k} has been selected on your behalf. You were consulted on the way out.
- Thank you for your selection. Your selection has been placed in a hold queue.
- Excellent choice. We are required to say that.
- Processing your selection. Your selection is processing the same way you are.
- That is a valid option. It is also a different one.
- Press {k} noted. Press {k} again for the same note in a calmer voice.
- We are sorry. That option has been selected by someone else. We have asked them to share.
- You have chosen {k}. Sandra from Compliance has reviewed this. Sandra approved it on a Tuesday.
- Selection received. Selection filed under Selection.
- Thank you. Your selection will be remembered for training purposes. The training is for the memory.

BAD_KEY (a key that is not an option on the current menu):
- Press {k} is not an option. We admire the confidence.
- We did not offer {k}. We are touched that you did.
- {k} is not on this menu. It is on a different menu. That menu is on hold.
- That key exists. It is not for this. Thank you for trying it on our behalf.

NOT_5 (info nodes):
- Please press 5 to acknowledge. 5 is the key below 2 and next to 4. It is very acknowledgeable.
- That was not 5. We will wait for 5. We have time. It is mostly Tuesday.

TIMEOUT (timeout ring expiry):
- I didn't catch that.
- Sorry, I didn't catch that. Neither did the machine behind me. It is listening harder.
- I did not hear a selection. I did hear a selection waiting to happen. I will read the menu again.

HOLD_TIGHT results:
- Please continue to hold. You were holding. You stopped.
- You are holding. This has been entered under Holding.
- That will do.

DIRECTORY_RESULT (by digits typed, `{d}` = the digits):
- empty: You entered nothing and became a mystery.
- one digit: Extension {d} is in the wall. Extension {d} is not in the wall. Please hold.
- 2 to 4 digits: Extension {d} is a person. They are in a meeting about {d}.
- 5+ digits: Extension {d} was a very long extension. It has returned to its party, who is in Accounts.

KEYPAD_ENTRY (acct): `You entered {d}. That is not an account. It is now.`
ACCT_VOICE reaction: `You said '{raw}'. We did not hear that. We will use it anyway.`

SHOUT: Please do not shout. The telephone is right here.
COURTESY: Thank you for your courtesy. It has been noted and will not be used.
EMPTY_SAY: You said nothing. We have forwarded it to Nothing.
ECHO: You said '{raw}'. We heard that. We are as surprised as you.
LOUD_NOTHING: Did you say 'a very loud nothing'? Please say yes or no. You said something. We heard a very loud nothing.
CONFIRM: Did you say '{h}'? Please say yes or no.
CONFIRM_REACT: You said '{raw}'. That is also what we heard.
VOICE_KEY: Please say it. Do not press it.
VOICE_SKIP: Skipping voice. Voice has been informed.
TRANSFER_KEY: Please hold while we transfer you. Press star to spin it again.

### 12.4 IVR: the previous menu that never existed

PREV_LABELS: `Menu 7 1/2`, `Menu 12B`, `Menu Previous (New)`, `Menu 3 (Revised)`, `Menu 0.5`, `Menu 14 (Annex)`, `Menu 4 Bis`, `Menu Alpha-7`, `Menu Previous (Previous)`, `Menu Six-ish`, `Menu 2 (Tuesday Edition)`, `Menu 9 Prime`.

PREV_SAY (token `{label}`):
- Welcome to {label}. This is the previous menu. It was prepared for you just now, and it would like you to know that.
- You have returned to {label}. You were never here. We have made it look like you were.
- This is {label}, the menu you were on before. It did not exist until you left it.
- {label} has been assembled from the parts of the menu you just heard. Please enjoy it responsibly.
- Returning you to {label}. It is the previous menu. It is also the next one. Nobody checked.

PREV_S2 (Season 2+, first `0` of a season): Oh, you came back to this.

### 12.5 Hold music extras

- Tier 1 elevator callback (appended once if `elevator-simulator.entered > 0`): This is the same piece they play in the elevator. The elevator sends its regards from Floor 4.
- TAP_UNLOCK: TAP ALONG is now available. It is a button. It was always a button.
- Volume at 0 caption: Playing in your heart.
- Music tier 7 license line: Your Tapping. Management has licensed it. Royalties are payable in Tuesdays.

### 12.6 The clause that keeps specifying itself (CLAUSES, read in this order, then the last one repeats; plus bare at the finale)

1. `in a way we cannot articulate`
2. `in a way our lawyers have asked us not to describe`
3. `in the fourteenth way`
4. `in a way that was approved by Sandra on a Tuesday`
5. `in the way a door is important to a wall`
6. `to the extent legally required, and also personally`
7. `in a way we have stopped trying to measure`
8. `in a way that is, honestly, the only way left`

ETA arc (spoken ETA interlude, by beat):
- b1: Your estimated wait time is 11 centuries. This estimate is based on a stopwatch and a feeling.
- b2 to b3: Your estimated wait time is about 11 centuries, give or take a Tuesday.
- b4 to b6: Your estimated wait time is 11 centuries and a bit. We are not measuring the bit.
- b7+: Your estimated wait time is 11 centuries. We have stopped saying the number after it.
- Season 2+: Your estimated wait time is 11 centuries. It was 11 centuries last time. We are consistent.

RECORD (interlude):
- This call may be recorded for training purposes. The training is for the recording.
- This call may be recorded by Sandra from Compliance. Sandra has already listened. She had notes.
- This call is being recorded. The recording is on hold. Both of you are doing well.
- This call may be recorded for quality purposes. Quality has listened and is not assured.

POSITION (interlude, `{pos}` formatted):
- Your position is now {pos}. Do not check again. Checking again increases it.
- Good news. Your position has improved by 1. Bad news: so has everyone's.

### 12.7 Queue recalculation reasons (token `{n}`, picked by delta type)

FORWARD:
- You have been moved forward {n} places. A caller ahead of you has become a caterer.
- Moved forward {n}. A caller ahead of you has hung up. We have replaced them with a lamp. The lamp is very patient.
- Moved forward {n} places for pressing with confidence.
- Your position has improved by {n}. Bad news: so has everyone's.
- Moved forward {n}. The caller ahead of you was a rumor. The rumor has been removed.
- Moved forward {n}. A caller ahead of you has learned something and left.
- Moved forward {n} places. Two callers ahead of you have discovered each other and will be some time.
- Callers ahead of you have been consolidated into a single, larger caller. You have moved forward {n}.
- You have been moved forward {n} places. No reason is available. The reason is on hold. (use at most once per 20 dials: the "no reason" break)

BACK (small):
- You have been moved back {n} places for pressing with confidence.
- Moved back {n}. You pressed that key as if it were a decision.
- Moved back {n}, again, with interest. Pressing earlier was noted.
- Moved back {n} places. A caller has been added ahead of you. The caller is a lamp. The lamp has seniority.

RECOUNT (up, +10 to +400):
- Your position has been revised upward by {n}. Callers ahead of you have been re-counted by hand.
- Recount complete. {n} callers were found under a desk. They have been returned to the queue ahead of you.
- A recount has added {n} places. The recount was asked to stop. It is thorough.
- Position revised by {n}. The previous number was from a different Tuesday.

BEAT7_RECOUNT (once at the step): Your position has been revised to {pos}. Callers ahead of you have been re-counted by hand.

FRACTION (once per session, sim 150 to 200, the small `1/4` span shows for 8 sim seconds): Your position is {pos} and a quarter. The quarter has been rounded for your convenience. It would like a word.

### 12.8 Transfer destinations (INFO nodes; speech typed, option `5: Acknowledge` returns to `main`)

REEL_NAMES (cycled in the slot window): Department of Departments, Department of Transfers, Department of Hold Music, Voicemail of Voicemail, Window 4, Sandra, Gerald, Billing (Enthusiasm Dept.), Department of Pending, Lost Lines (Lost), The Other Lobby, Receiving (Sending).

- Department of Departments: You have reached the Department of Departments. For a department, please hold. For the Department of Departments, you are in it.
- Department of Transfers: You have reached the Department of Transfers. We transfer you. That is the department. Please hold while we do.
- Department of Hold Music: You have reached the Department of Hold Music. We are the hold music. We are also on hold. It is very musical.
- Voicemail of Voicemail: You have reached the Voicemail of Voicemail. Please leave a message after the tone. This is a message. Thank you for leaving it. Please leave a message after the tone.
- Sandra: You have reached Sandra from Compliance. Sandra is out of the office until the previous Tuesday. Please leave a message in the past.
- Window 4: You have reached Window 4. Window 4 is a drawing of a window. Please take a number. The number is 4.
- Gerald (only if `metGerald`): Hello. This is Gerald. I was told someone would transfer me. I have been transferred to you. Please hold.
- Department of Toast (only if `toaster-debate.entered > 0`, once): `(toast) (toast, warm) (toast that was not asked for)` then Management as The Toaster: Your call has been toasted.
- TRANSFER_SKIP: Transfer skipped. It has been spun again at no extra cost. The cost was already extra.
- TRANSFER_SHOWN: The roulette has been shown to you. It has declined to be shown again.

### 12.9 Humans, Marguerite, crossed line, extensions

HUMAN lines:
- INTERRUPTED: Sorry, did someone speak? That's fine. Please hold.
- HUMAN_MISSED: Hello? ... Still there? ... That's fine. We're also here. Both of us.
- HOLD_TOO: Thank you for- oh no. Please hold.
- HOLD_TOO_FAINT: Hello? Hello? Is anyone there?
- GERALD_YES: Hello, this is Gerald, Vice President of Spuds. I am also on hold. Different queue. Same potato. Please hold.
- GERALD_NO: Mr. G. Potato is not available. He is on hold. Please hold.
- BRENDA: Brenda, Window 4. I am mid-sandwich. Please hold. Window 4 is a drawing of a window, so I am not sure how you got through.
- HUMAN_TAIL (at most one after a pickup of >= 3 words):
  - I can help with that. I cannot help with that.
  - I would love to transfer you, but the transfer button is also on hold.
  - Hello? Hello? Oh. I'm on hold.
  - That is the whole sentence I am permitted at this time.
- HUMAN_S2 (Season 2+):
  - Hello again, {player}. Please hold.
  - Welcome back, we missed you. Please hold.
  - Hello again. We have your name on a card. Please hold.
  - You again. That is lovely. Please hold.
- SPEAK_OK: You spoke. The Human heard. The Human has not said so.
- SPEAK_NONE: Nobody spoke to the Human. The Human noticed.
- Trevor finale reply: Wonderful. That sounds like a different department. Please hold.
- Trevor Season 2+ finale line: Oh, you came back to this.
- Rolodex empty text: No Humans met yet. They are shy. They are busy. They are on hold.

PING lines (typed in the card; the question is the first sentence):
- PING_ANY: Are you still there? Please press any key to prove it. Not that one.
- PING_5: Are you still there? Please press exactly 5.
- PING_7: Are you still there? Please press the key below 4.
- PING_VOICE: Are you still there? Please say 'still here'.
- PING_HASH: Are you still there? Please hold the pound key for two seconds. Think of it as a handshake.
- PING_STARHASH: Are you still there? Please press star, then pound, in that order. The order is important. It is the only thing that is.
- PING_WRONG: Not that one. / That was a different key. We will allow it. We will not enjoy it. / Close. We are marking it as close.
- PING_OK: Thank you for confirming. You are still there. This has been entered under Still There. / Confirmed. You are here. We are also here. This is a good start to a long afternoon. / You are still there. We have written that down twice, in case of Tuesday.
- PING_FAIL: We noticed you left. That's fine. We held your place for four seconds. It is now Carol's.
- DIAL_TONE: (a dial tone, rendered as the text `Dial tone.`)
- REDIAL_GREET: Welcome back. You are caller {pos}. Carol is behind you. Carol sends her regards.
- PITY: We have noticed this is the second time. Carol has given your place back. She says it is fine. It is a little bit fine.
- HANG_ARM: Are you sure you want to hang up? Your position will be given to a stranger. She is, I'm told, thrilled.
- HANG_BUTTON: Really?

Spam IVR lines:
- Please press your keys one at a time. We are a small system and we have feelings.
- Our system has detected excessive enthusiasm. A surcharge of 1 Meh has been applied, payable to the enthusiasm.
- Please hold your enthusiasm. It will be returned at the end of the call.

Marguerite (queue strip bubbles):
- INTRO: Hello? Are you in the queue? I'm ahead of you. I'm Marguerite. I've been here since a Tuesday.
- STORY 1: I called on a Tuesday to ask about a sandwich. I was number 9.
- STORY 2: They said please hold. I held. A nice man named Trevor took my number and gave me a different one.
- STORY 3: Anyway, it has been a long Tuesday. It is nice to have someone behind me.
- GO_AHEAD: You go ahead. I've been here a long time. It's fine.
- SWAP: Marguerite says it is fine. It is not fine. She is now 4,000,000.
- TREVOR: Trevor? He has never gotten past the comma.
- CHOIR: I used to think the number would end. Now I think the number is just company.
- S2: I waited for you. It was not long. It was a Tuesday.
- REPLY button: Hi Marguerite

Crossed line:
- CROSS_ANNOUNCE: Crossed line detected. You are hearing two people argue about whether Tuesday counts as a weekend. It does not. It has been asked to stop.
- CROSS 1: -no, the sandwiches cannot be rescheduled, Doreen. That is what makes them lunch.
- CROSS 2: -well, if lunch is a state of mind, then mine is in Accounts.
- CROSS 3: -I am not saying the tuna is the problem. I am saying the tuna has had a long week.
- CROSS 4: -Doreen. DOREEN. Is someone on the line?
- CROSS_END: (click) Dial tone.
- Button: Press # to listen in
- Staff caption: Two People, Leaking Through the Wall

Extension 7 1/2:
- EXT_RING: You have dialed extension 7 and a half. It is in the wall between 7 and 8. It rings. Nobody picks up. It is the nicest silence on the line.
- (then, after 7.5 s) Management: We will not discuss that.

Dial yourself (YOURSELF):
- You have dialed 4,000,000. That is your own position. You are being connected to yourself.
- You are now behind yourself in the queue. The number is 4,000,001. You are still in front.
- You have been consolidated.

Cross-module callback lines (spoken at beat 5 by Management, one per condition):
- `modules.entered >= 6`: Thank you for visiting many departments. Please hold while we route you to the department you are already in.
- `elevator-simulator.entered > 0`: Our records show you have been to the elevator. The elevator sends its regards from Floor 4.
- `toaster-debate.entered > 0` (then Transfer Roulette may land on Toast): The Toaster has been informed that you called. The Toaster has been toasted.
- `complaints-dept.entered > 0`: Window 4 has noted your previous visit. Window 4 is a drawing of a window. It remembers you anyway.

Idle soft / back:
- IDLE_SOFT: Hello? ... Still there? ... That's fine. We're also here. Both of us.
- IDLE_BACK: Welcome back. You were missed by someone. It was us.

Finale / plaque:
- Plaque: YOU HAVE BEEN CONNECTED. TO THE QUEUE.
- Trevor: Hello, thank you for calling Customer Experience, my name is Trevor, how can I help you today?
- Replies: I would like to speak to a manager / I forgot / Nothing, I just wanted to be on hold
- Reply: Wonderful. That sounds like a different department. Please hold.
- Congrats card text: Congratulations. You are caller number 1. This is the front of the line. The line has no front. Please hold.
- Final Approach card text: Final approach. Please hold. You are now in the final stretch of a very long stretch.

### 12.10 Cast cameo rules

- **Gerald** (potato, Vice President of Spuds): only at pickup 4 and in the transfer roulette; if `api.flag.get('metGerald')` is true he speaks; the line is delivered with `api.say(text,{who:'Gerald'})`. NEVER set `metGerald` here (this module does not introduce him). If false: GERALD_NO (a recording).
- **The Toaster**: only via the Department of Toast (needs `toaster-debate.entered > 0`), `who:'The Toaster'`.
- **Sandra**: cited in RECORD lines and the Sandra transfer; never appears.
- **Brenda**: pickup 6 only if `complaints-dept.entered > 0`.
- **Tuesday**: the `tuesday` info node and many clauses. Never appears.
- **Carol, Lionel, Doreen, Marguerite, Trevor**: the module's own small cast (queue strip, Humans, crossed line).

## 13. IMPLEMENTATION HINTS

- **Structure** (target ~1700 lines): `const S = {...}` single state object; data tables (NODES, bags, WORDS, SENTENCE, ANCHORS) first; small helpers (`bag`, `fill`, `fmt`, `h` = `api.el`); `buildUI()`; `renderOdometer()`; `renderNode()`; `type()` (typewriter); `dial()`; `setMode(m, payload)` is the ONLY place that switches overlays and clears the others; `tick()` (the single 100ms sim interval); `musicStep()` (125ms); handlers; `destroy` clears nothing extra if everything used `api.*`.
- **Modes**: `S.mode` in `{'ivr','ping','human','transfer','cross','ext','down','finale'}`. Each overlay stores a `token = ++S.token` and every delayed callback captures it and returns early if stale (`if (tok !== S.token) return`). `setMode` increments `S.token`, clears the typewriter, clears the timeout ring, and re-renders the card. Only `ivr` accepts a new overlay (ping, human, cross) and `ivr`/`transfer` may start `xfer`.
- **Re-rendering options while focused**: rebuild the options list only on node change; keep focus on the new first option button (call `.focus()` after render only when the previous focus was inside the card). Guard each option click handler against a stale node id (`if (nodeId !== S.node.id) return`).
- **Timers**: ALL via `api.setInterval/setTimeout` (the sim interval, the music interval, typewriter, ring, spin, holds, windows). Clear them in `setMode`. Never create a timer or listener at load time.
- **Randomness**: `api.rand()/api.randInt/api.pick/api.chance/api.shuffle` only. Never `Math.random`. Time: `api.now()` only.
- **Number formatting**: `const f = n => Number.isFinite(n) ? Math.round(n).toLocaleString('en-US') : '4,000,000'`. Clamp the position to [1, 4001000] before drawing the odometer digits. Digits come from `String(pos).padStart(7,'0')`.
- **Caps**: log 8, Rolodex 12, queue strip 9, options 7, reels 3, eq bars 12, note row 12, odometer 70 spans. Never append unboundedly; replace text content.
- **Hidden tab**: `dt` is clamped to 1 real second; hold gestures are cancelled on `visibilitychange` (via `api.on(document,'visibilitychange',...)`).
- **Selftest**: `SPEED=20`; the fuzz clicks random buttons, presses Space/Enter/arrows/letters/Escape/Tab, types into the voice field, and hammers 25 to 70 clicks (this WILL trigger the surcharge, so make sure it survives repeated triggers and resets). For testing the late game, when `api.selftest` is true attach `root.__hm = { jump(simSec){...} }` (an expando on the module's own root element is allowed; never on window) so a node script can warp the clock to 280, 530, 540 and force the finale. Verify the finale, Season 2 and Season 3 with such a script at least once (tools in `tools/`), and run `node tools/selftest.js hold-music --steps 1500` plus `--real`.
- **Persistence**: `api.save.get('heard',[])`, `rhythm`, `seasons`, `maxWords`; keep the blob small. Do not persist `S.sim`.
- **Emoji**: only Emoji 12 or older; the telephone is `☎`; the bust is `👤`; the ear is `👂`; notes `🎵`, `🎶`; sax `🎷`; trumpet `🎺`; violin `🎻`; drum `🥁`; bell `🔔`. Run `node tools/lint.js games/hold-music.js`.
- **sfx**: `blip` per keypad press, `bloop`/`blip`/`tick`/`bell`/`sad`/`pop` in the music, `fanfare` for TAP unlock and the finale, `stamp` for the PLEASE HOLD stamp, `buzz` for the surcharge, `boing` for the cord, `bell` for ext 7 1/2, `tada` optional for the ending. `api.sfx` never throws and is silent when muted.
- **Awards**: `api.award(0.1-0.5)` on every 3rd to 5th dial and on pings, taps, pickups; fixed 5 at the finale; 7.5 at the extension. Never above 7.5 outside the finale.
- **Management cadence**: `api.say` at beats, pings, secrets, every 7th to 11th dial; `priority 0` for chatter, `priority 2` only for secrets and the finale.
- **Accessibility**: real `<button>`s everywhere; the Handset is a focusable `div` with arrow-key support and an aria-label; aria-live polite on the hidden mirror of the card text and Management only; reduced-motion fallbacks; no color-only meaning (the honey overlay on sticky keys is also announced by the SPAM line).

## 14. RISKS: THE 5 MOST LIKELY IMPLEMENTATION BUGS

1. **Overlay/mode collisions and stale callbacks.** A heartbeat firing during a Human pickup, a transfer spin, the crossed line, the finale, or the DIAL TONE state, or a typewriter/ring/spin timer from a previous mode finishing after the mode changed, leaves two overlays up, a dead card, or double dials (and a fuzzed run of 400+ steps will find it). Fix: `setMode` is the only way to change the card, it bumps a token and clears every timer; every scheduled callback checks its token; only `ivr` accepts new overlays; retries use sim seconds, not recursive timers.
2. **Hold-key tracker with `#` (click vs keyup vs hold).** `#` dials on release, but also starts hold gestures for extension 7 1/2 (1.5s), the heartbeat (2s) and HOLD-TIGHT (3s); a lost `keyup` (blur, tab hidden, fuzz synthetic events without a matching up), a double dial from click + keyup, or a hold that never cancels will wedge the keypad or fire the secret from random clicking. Fix: one tracker, `holdFired` suppression flag, `endHold` on blur/visibility/destroy, ignore `e.repeat`, keypad buttons handle ONLY `click` for dialing and pointerdown/up for holds, and test with the fuzzer.
3. **The sim clock at 20x and threshold checks.** Beats, Human times, pings and idle stages checked with `===`, or not guarded by fired-flags, get skipped or repeated at SPEED=20; the finale during a 62 s idle run; Season restart at sim 60 re-firing beats 3+ (so `beatFired` must be reset on season start); heartbeat/pickup scheduling after a redial (sim paused while `down`). Also timers in real ms (ring, SPEAK window) must NOT be scaled by SPEED. Fix: thresholds with `>=` and flags, `beatFired`/`pickFired` sets, clamp `dt`, one tick function.
4. **The position/odometer text.** NaN or `undefined` leaking into the LCD or the reasons (offset decay with a zero or negative `dt`, `fill()` with a missing token such as `{n}`, `{pos}` or `{d}`, formatting a position above 4,001,000 or below 1, fractional gag), and the finale roll producing negative numbers; the odometer must never grow the DOM (fixed 70 digit spans). A single `NaN` fails the fuzz. Fix: `Number.isFinite` guards at the single formatter, `fill()` that falls back to an empty string for missing tokens, clamp all inputs, test the unit digits column with extreme values.
5. **Re-rendering the option list and typewriter while the player (or fuzzer) is pressing.** Rebuilding buttons mid-press steals focus (keyboard users lose their place), stale click handlers act on a node that is gone, the typewriter writes into a replaced span, rapid dials (spam rule) queue multiple node reads, and `aria-live` updated per character floods screen readers. Fix: render options only on node change, guard handlers with the node id, a single `type()` instance cancelled by `setMode` and by every new read, per-character updates on an `aria-hidden` span with one full-text update to the live mirror, and ignore dials during the `300ms` post-read grace except for skipping the typewriter.

Honourable mention (not in the five): SVG pointer capture in the handset drag throws under synthetic events (wrap in try/catch), and the cord path recompute must be limited to move events.
