/* POINTLESS content: the Gift Shop of Nothing (shop items, prefixed "gs.") and decorative settings (prefixed "gs.s.").
 * Items with a visible or audible effect use effect.bodyClass + effect.css, or effect.onToggle for the few that need script.
 * Script effects are kept alive by a tiny manager below, so they also come back after a reload. Everything else does nothing, ceremonially.
 * Toggle settings have state-neutral responses on purpose: the Lobby picks a response at random, whichever way the switch went. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const NAT = P.native;

  /* ---------- script-driven effects: each starter returns its own stopper ---------- */
  const LIVE = {};          // key -> starter
  const LIVE_ITEM = {};     // key -> shop item id
  const running = {};       // key -> stopper

  function setLive(key, on) {
    try {
      if (on && !running[key] && LIVE[key]) running[key] = LIVE[key]() || function () {};
      else if (!on && running[key]) { const stop = running[key]; delete running[key]; stop(); }
    } catch (e) { delete running[key]; }
  }
  function syncLive() {
    Object.keys(LIVE).forEach(function (key) {
      let on = false;
      try { on = !!P.state.item.isEquipped(LIVE_ITEM[key]); } catch (e) { on = false; }
      setLive(key, on);
    });
  }
  function live(key, itemId, starter) { LIVE[key] = starter; LIVE_ITEM[key] = itemId; return function (on) { setLive(key, on); }; }
  P.on('boot', syncLive);
  P.on('import', syncLive);
  P.on('sync', syncLive);
  P.on('reset', syncLive);

  /* a small emoji that trails the pointer (lag = seconds of easing; 0 sticks to the pointer) */
  function follower(emoji, size, dx, dy, lag) {
    const layer = P.fx.ensureLayer();
    const el = document.createElement('div');
    el.setAttribute('aria-hidden', 'true');
    el.textContent = emoji;
    el.style.cssText = 'position:fixed;left:0;top:0;pointer-events:none;z-index:99999;opacity:0;font-size:' + size + 'px;line-height:1;' +
      'transition:opacity .25s' + (lag ? ',transform ' + lag + 's cubic-bezier(.2,.8,.3,1)' : '') + ';';
    layer.appendChild(el);
    const place = function (x, y) {
      el.style.transform = 'translate(' + Math.round(x + dx) + 'px,' + Math.round(y + dy) + 'px)';
      el.style.opacity = '1';
    };
    const onMove = function (e) { if (e && isFinite(e.clientX) && isFinite(e.clientY)) place(e.clientX, e.clientY); };
    NAT.add(document, 'pointermove', onMove, true);
    const lp = P.fx.lastPointer;
    if (lp && lp.t > 0) place(lp.x, lp.y);
    return function () {
      NAT.remove(document, 'pointermove', onMove, true);
      if (el.parentNode) el.parentNode.removeChild(el);
    };
  }

  const toggleHat = live('hat', 'gs.cursor-hat', function () { return follower('🎩', 26, -4, -26, 0); });
  const toggleDennis = live('dennis', 'gs.dennis-jr', function () { return follower('🌿', 30, 14, 10, 0.55); });
  const toggleConfetti = live('confetti', 'gs.confetti-hover', function () {
    let lastAt = 0, lastEl = null;
    const onOver = function (e) {
      const t = e && e.target && e.target.closest ? e.target.closest('button,a,[role="button"]') : null;
      if (!t || t === lastEl) return;
      const now = NAT.now();
      if (now - lastAt < 650) return;
      lastAt = now; lastEl = t;
      P.fx.confetti(e.clientX, e.clientY, 9);
    };
    NAT.add(document, 'pointerover', onOver, true);
    return function () { NAT.remove(document, 'pointerover', onOver, true); };
  });
  const toggleHonk = live('honk', 'gs.click-honk', function () {
    let lastAt = 0;
    const onClick = function () {
      const now = NAT.now();
      if (now - lastAt < 140) return;
      lastAt = now; P.sfx.play('honk');
    };
    NAT.add(document, 'click', onClick, true);
    return function () { NAT.remove(document, 'click', onClick, true); };
  });
  const toggleApplause = live('applause', 'gs.applause', function () {
    let lastAt = 0;
    return P.on('meh', function (e) {
      if (!e || !(e.delta > 0) || e.passive) return;
      const now = NAT.now();
      if (now - lastAt < 300) return;
      lastAt = now; P.sfx.play('pop');
    });
  });
  const toggleRemorse = live('remorse', 'gs.remorse', function () {
    return P.on('bought', function (e) {
      if (e && e.id === 'gs.remorse') return;
      NAT.setTimeout(function () { P.sfx.play('sad'); }, 350);
    });
  });

  /* ================= EFFECT ITEMS (visible or audible) ================= */
  P.addShopItems([
    { id: 'gs.cursor-hat', name: 'Hat For The Cursor', icon: '🎩', category: 'cosmetic', price: 20,
      desc: 'A top hat floats just above your pointer, unattached. It was hired through an agency that never asked what it would be sitting on.',
      effect: { bodyClass: 'sx-cursor-hat', onToggle: toggleHat },
      flavor: ['The cursor has been measured for a hat. Its head is 0 by 0, so the hat went in the large size.', 'The hat reports to your pointer. Your pointer reports to your hand. Nobody reports to the hat, and it prefers that.', 'On day one the hat tipped itself to a button. The button did not tip back. Lessons will be learned.'] },
    { id: 'gs.dennis-jr', name: 'Dennis Jr. (Plant, Mobile)', icon: '🌿', category: 'cosmetic', price: 150,
      desc: 'A cutting of Dennis (Plant) now trails your cursor at what he calls a brisk pace. Dennis (Senior) has not been told and is not moving.',
      effect: { bodyClass: 'sx-dennis-jr', onToggle: toggleDennis },
      flavor: ['Dennis Jr. has been potted, named and released. He has one leaf and a hard stop at 5.', 'Dennis (Senior) watched the cutting leave. He said nothing, but it had weight.', 'Dennis Jr. is two weeks into the job and already giving feedback on your route.'] },
    { id: 'gs.confetti-hover', name: 'Confetti-On-Hover Mode', icon: '🎉', category: 'upgrade', price: 300,
      desc: 'Hovering over anything clickable releases a small puff of confetti. Cleanup is handled by a committee that has never met.',
      effect: { bodyClass: 'sx-confetti-hover', onToggle: toggleConfetti },
      flavor: ['Hover mode armed. Every button now celebrates being looked at, which is more than it did for being pressed.', 'Confetti will fall wherever you point. The janitor has been named as a person of interest.', 'The buttons were told they are being watched. They answered with paper, at once, in several colors.'] },
    { id: 'gs.click-honk', name: 'Honk-Per-Click Plan', icon: '📯', category: 'upgrade', price: 75,
      desc: 'Every click now honks, at 7 1/2 decibels, as measured by a technician who then asked to be reassigned.',
      effect: { bodyClass: 'sx-click-honk', onToggle: toggleHonk },
      flavor: ['Your clicks now honk. This is the plan. You picked the plan, from a menu containing one plan.', 'The technician measured the honk at 7 1/2 decibels and requested a quiet room and a lawyer.', 'Each click is now a small public announcement. Nobody is listening, but it is on file.'] },
    { id: 'gs.applause', name: 'Polite Applause Subscription', icon: '👏', category: 'upgrade', price: 220,
      desc: 'A soft pop each time you earn Meh, like one person at the back clapping once. Billed monthly, in a month still being chosen.',
      effect: { bodyClass: 'sx-applause', onToggle: toggleApplause },
      flavor: ['You are now applauded from the back of the room by one man. He means it. His name tag is upside down.', 'Applause activated: one clap per earning, delivered with a straight face and a lanyard.', 'The audience has been engaged. He was passing through and decided to stay until the end of the quarter.'] },
    { id: 'gs.remorse', name: "Buyer's Remorse Soundtrack", icon: '🎻', category: 'cosmetic', price: 45,
      desc: 'Plays one small sad sound a third of a second after every purchase. The timing was tested on actual regret.',
      effect: { bodyClass: 'sx-remorse', onToggle: toggleRemorse },
      flavor: ['Remorse will now be supplied after each purchase. You no longer need to bring your own.', 'A small sad sound is on standby. It has been practicing in a locker, mostly the low note.', 'You bought the feeling you were about to have anyway, now with sound and a receipt.'] },

    { id: 'gs.tilt', name: 'Reality, Tilted One Degree', icon: '📐', category: 'cosmetic', price: 35,
      desc: 'Everything stays where it was, at an angle of exactly 1 degree. Nothing is wrong. Everything just looks mildly attentive.',
      effect: { bodyClass: 'sx-tilt', css: `.sx-tilt .lb-mainwrap, .sx-tilt .pm-modwin { rotate: 1deg; }` },
      flavor: ['Reality has been tilted 1 degree. Asked whether it is level, it said yes, with a slight lean.', 'A spirit level was brought in to check. It stood in the doorway and declined to be read.', 'The lobby now looks like it is about to say something. It has been about to for several minutes.'] },
    { id: 'gs.casual-font', name: 'Casual Handwriting Font', icon: '✏️', category: 'cosmetic', price: 55,
      desc: 'Every word is set in a friendly rounded script that says "do not worry, it is only a policy".',
      effect: { bodyClass: 'sx-casual-font', css: `.sx-casual-font, .sx-casual-font button, .sx-casual-font input, .sx-casual-font select { font-family: "Comic Sans MS", "Chalkboard SE", "Segoe Print", "Bradley Hand", cursive !important; }` },
      flavor: ['All text now looks like it was written by a coworker who has just been promoted above you and wants to stay friends.', 'The policies are unchanged. They now end with a smiley, drawn from memory by someone who has never seen one.', 'Sandra from Compliance called the new font "reassuring", then "suspicious", then "reassuring", with a tighter smile.'] },
    { id: 'gs.nostalgia', name: 'Sepia Memories, Gently Used', icon: '📷', category: 'cosmetic', price: 90,
      desc: 'A warm brown filter over everything, pre-owned by a different, happier lobby. Smells faintly of a year that did not occur.',
      effect: { bodyClass: 'sx-nostalgia', css: `.sx-nostalgia::after { content: ""; position: fixed; inset: 0; z-index: 2147483000; pointer-events: none; -webkit-backdrop-filter: sepia(.75) saturate(.9); backdrop-filter: sepia(.75) saturate(.9); }` },
      flavor: ['The lobby now looks like a memory of the lobby. You miss it already, and it is right there.', 'Everything has aged 40 years since you clicked. The colors have retired and opened a small bakery.', 'You are now living in the good old days. They began a moment ago and will be missed by lunch.'] },
    { id: 'gs.big-numbers', name: 'Slightly Bigger Numbers', icon: '🔢', category: 'upgrade', price: 120,
      desc: 'Every number is 18% larger. The numbers did not ask, and now carry themselves like numbers who have heard about a promotion.',
      effect: { bodyClass: 'sx-big-numbers', css: `.sx-big-numbers .lb-meh, .sx-big-numbers .pm-meh, .sx-big-numbers .lb-meh-wrap, .sx-big-numbers .lb-item-price, .sx-big-numbers .lb-price, .sx-big-numbers .lb-count { font-size: 1.18em !important; }` },
      flavor: ['Your numbers are up 18% in size and 0% in value. They have asked about a raise anyway.', 'The Meh counter has been enlarged. Its old size is in storage, in case it wants to go back.', 'Digits are now bigger. A 7 stood up straighter. A 1 was asked to take up more room and refused.'] },
    { id: 'gs.button-hats', name: 'Tiny Hats For All Buttons', icon: '🧢', category: 'cosmetic', price: 400,
      desc: 'Every button wears a tiny hat. The hats are non-functional, not removable from inside the button, and fully insured.',
      effect: { bodyClass: 'sx-button-hats', css: `.sx-button-hats .lb-btn, .sx-button-hats .pm-btn, .sx-button-hats .lb-nav-btn { position: relative; overflow: visible; } .sx-button-hats .lb-btn::after, .sx-button-hats .pm-btn::after, .sx-button-hats .lb-nav-btn::after { content: "🎩"; position: absolute; top: -14px; right: 4px; font-size: 14px; line-height: 1; transform: rotate(12deg); pointer-events: none; }` },
      flavor: ['All buttons have been issued a hat. Fit is excellent. Nobody measured, and nobody had to.', 'Every button is now dressed for a meeting in a different building.', 'Hats applied to 100% of buttons, including the ones you cannot see. Those got the nice ones.'] },
    { id: 'gs.silent-film', name: 'Silent Film Mode', icon: '🎞️', category: 'cosmetic', price: 600,
      desc: 'The lobby goes black, white and faintly flickery. Management will speak through title cards. The title cards have not been written.',
      effect: { bodyClass: 'sx-silent-film', css: `@keyframes sx-flicker { 0%, 100% { opacity: 1; } 42% { opacity: .93; } 44% { opacity: 1; } 71% { opacity: .96; } } .sx-silent-film .pm-shell::after { content: ""; position: fixed; inset: 0; z-index: 2147483000; pointer-events: none; -webkit-backdrop-filter: grayscale(1) contrast(1.15); backdrop-filter: grayscale(1) contrast(1.15); box-shadow: inset 0 0 120px rgba(0,0,0,.45); animation: sx-flicker 1.3s steps(1) infinite; }` },
      flavor: ['Silent film mode engaged. Please express yourself using only large gestures and a moustache.', 'A title card reads AND THEN, NOTHING. It stays on screen for the legally required four seconds.', 'A piano is implied. The pianist is on a break that began in 1927 and is expected to be brief.'] },
    { id: 'gs.beige', name: 'Beige Mode', icon: '📁', category: 'cosmetic', price: 38,
      desc: 'Colors are turned down to a level the building calls professional. Joy is still allowed, in small laminated amounts.',
      effect: { bodyClass: 'sx-beige', css: `.sx-beige::before { content: ""; position: fixed; inset: 0; z-index: 2147483000; pointer-events: none; -webkit-backdrop-filter: saturate(.3); backdrop-filter: saturate(.3); }` },
      flavor: ['Saturation has been reduced to a respectful hush. The lobby now looks like a very reasonable decision.', 'Color has been asked to keep it down. It is complying, mostly in the corners.', 'Everything is a little more beige. The building has filed it under "upgrade".'] },
    { id: 'gs.contrast', name: 'Contrast Of Opinion', icon: '🌗', category: 'cosmetic', price: 66,
      desc: 'Raises contrast and saturation so everything feels more strongly held. The lobby now has views and will share them.',
      effect: { bodyClass: 'sx-contrast', css: `.sx-contrast .pm-app::before { content: ""; position: fixed; inset: 0; z-index: 2147483000; pointer-events: none; -webkit-backdrop-filter: contrast(1.18) saturate(1.35); backdrop-filter: contrast(1.18) saturate(1.35); }` },
      flavor: ['Contrast raised. The lobby now disagrees with itself more clearly.', 'Every color has been asked to commit. Some did. Mustard wants to see the offer in writing.', 'The darks are darker, the lights are lighter, and the in-betweens say they were fine.'] },
    { id: 'gs.letterbox', name: 'Cinematic Letterbox', icon: '🎬', category: 'cosmetic', price: 800,
      desc: 'Black bars above and below the lobby, so your Meh plays like a feature presentation. Runtime: whatever you do next.',
      effect: { bodyClass: 'sx-letterbox', css: `.sx-letterbox .pm-fx::before { content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 2147483000; box-shadow: inset 0 38px 0 #0b0a10, inset 0 -38px 0 #0b0a10; }` },
      flavor: ['The lobby is now widescreen. It always was, but nobody had said so out loud.', 'Your afternoon now carries a rating of "Unrated (Lobby)" and a runtime of "until 5".', 'You are now a motion picture. The motion is minimal. Critics have called it "still".'] },
    { id: 'gs.vignette', name: 'Vignette (Pre-Owned Corners)', icon: '🖼️', category: 'cosmetic', price: 260,
      desc: 'The corners of the screen go quietly dark, as if the lobby is thinking about something sad and then deciding to be fine.',
      effect: { bodyClass: 'sx-vignette', css: `.sx-vignette .pm-fx::after { content: ""; position: fixed; inset: 0; pointer-events: none; z-index: 2147483000; background: radial-gradient(ellipse at center, transparent 55%, rgba(20,12,35,.5) 100%); }` },
      flavor: ['The corners have been darkened. They were told it is for atmosphere, not a punishment.', 'A soft shadow settled around the edges. It was not invited. It brought snacks.', 'Focus is now drawn to the center, which is also where the nothing is.'] },
    { id: 'gs.help-cursor', name: 'Question Mark Cursor (Everywhere)', icon: '❓', category: 'cosmetic', price: 18,
      desc: 'Your pointer shows a question mark over everything. It is not confused. It is conducting an inquiry, and the inquiry is ongoing.',
      effect: { bodyClass: 'sx-help-cursor', css: `.sx-help-cursor, .sx-help-cursor * { cursor: help !important; }` },
      flavor: ['Your cursor now questions everything it touches. It will accept no answers before Q3.', 'A question mark has been fitted to your pointer. Do not answer it. It is for the record.', 'A button asked the cursor what it wanted. The cursor said "good question".'] },
    { id: 'gs.progress-cursor', name: 'Perpetual Loading Cursor', icon: '⏳', category: 'cosmetic', price: 18,
      desc: 'Your pointer looks like something is happening. Nothing is. That is the quality of the experience.',
      effect: { bodyClass: 'sx-progress-cursor', css: `.sx-progress-cursor, .sx-progress-cursor * { cursor: progress !important; }` },
      flavor: ['Your cursor is now permanently loading. It says it will be done in a moment, and has said so since purchase.', 'The pointer looks busy. Nobody has dared to ask with what.', 'Progress indicator installed. Progress was notified and said it would check its calendar.'] },
    { id: 'gs.crosshair-cursor', name: 'Surgical Cursor', icon: '🎯', category: 'cosmetic', price: 22,
      desc: 'Your pointer is now a crosshair, so every click feels like an operation. Nobody will be harmed. Several things will be clicked.',
      effect: { bodyClass: 'sx-crosshair-cursor', css: `.sx-crosshair-cursor, .sx-crosshair-cursor * { cursor: crosshair !important; }` },
      flavor: ['You may now click with the seriousness of someone in a film about a heist at a stationery cupboard.', 'A scrub nurse has been assigned to your clicks. She has nothing to hand you and is doing it very well.', 'The pointer was briefed on its mission. The mission is the lobby. The briefing took 4 minutes.'] },
    { id: 'gs.refusal-cursor', name: 'Cursor Of Gentle Refusal', icon: '🚫', category: 'cosmetic', price: 14,
      desc: 'The pointer shows a "not allowed" sign over everything. You are allowed. The sign is only being careful.',
      effect: { bodyClass: 'sx-refusal-cursor', css: `.sx-refusal-cursor, .sx-refusal-cursor * { cursor: not-allowed !important; }` },
      flavor: ['Your cursor now disapproves of everything. The clicks will still work. It is only worried about you.', 'A "not allowed" symbol has been fitted as a precaution and a mood.', 'Everything looks forbidden now. Please proceed, and do it like someone who is sorry.'] },
    { id: 'gs.grab-cursor', name: 'Cursor Ready To Carry', icon: '✋', category: 'cosmetic', price: 16,
      desc: 'Your pointer becomes an open hand, as if you are about to lift the lobby. You are not, but you look prepared.',
      effect: { bodyClass: 'sx-grab-cursor', css: `.sx-grab-cursor, .sx-grab-cursor * { cursor: grab !important; }` },
      flavor: ['An open hand now follows your pointer, ready to pick up anything, and will pick up nothing.', 'The hand is steady, waiting for something heavy that is not coming. It stretched first.', 'A grip was installed. There is nothing to grip. The grip has not been told.'] },
    { id: 'gs.logo-mirror', name: 'Mirror-Image Logo', icon: '🔄', category: 'cosmetic', price: 70,
      desc: 'The logo now faces the other way, as if it has just noticed something behind it. It has not.',
      effect: { bodyClass: 'sx-logo-mirror', css: `.sx-logo-mirror .lb-logo { transform: scaleX(-1); }` },
      flavor: ['The logo has been reversed. It says exactly the same thing from the wrong direction.', 'The brand now faces the exit. There are no exit signs, only affirmations.', 'Legal reviewed the mirror image and approved it, in reverse.'] },
    { id: 'gs.ticker-flip', name: 'News Ticker, Upside Down', icon: '🙃', category: 'cosmetic', price: 40,
      desc: 'The Pointless News Network now scrolls upside down, for viewers hanging from something. Content unchanged, dignity mostly unchanged.',
      effect: { bodyClass: 'sx-ticker-flip', css: `.sx-ticker-flip .lb-ticker-view { transform: rotate(180deg); }` },
      flavor: ['The ticker is upside down. It reads the same to anyone standing on the ceiling.', 'News has been flipped. The headlines still say nothing, but now from above.', 'A statement from the network: "We stand by our upside-down reporting." It was read upside down.'] },
    { id: 'gs.wobble', name: 'Buttons With Mild Concerns', icon: '🥴', category: 'cosmetic', price: 62,
      desc: 'Buttons tremble when you hover, as if they were told something in a meeting and cannot say what. They are all fine.',
      effect: { bodyClass: 'sx-wobble', css: `@keyframes sx-wobble { 0%, 100% { rotate: 0deg; } 20% { rotate: -2.5deg; } 40% { rotate: 2.5deg; } 60% { rotate: -1.5deg; } 80% { rotate: 1.5deg; } } .sx-wobble .lb-btn:hover, .sx-wobble .pm-btn:hover, .sx-wobble .lb-card-btn:hover, .sx-wobble .lb-nav-btn:hover { animation: sx-wobble .45s ease-in-out infinite; }` },
      flavor: ['Buttons will now tremble on approach. This is called being shy and is fully deductible.', 'All buttons are mildly nervous. A button may have feelings about a pointer, and several have filed them.', 'The buttons were told you were coming. They took it well enough, in the shoulders.'] },
    { id: 'gs.rainbow-meh', name: 'Rainbow Meh Counter', icon: '🌈', category: 'upgrade', price: 500,
      desc: 'Your balance changes color slowly and forever, like a mood ring attached to an account. It remains a mid-sized number.',
      effect: { bodyClass: 'sx-rainbow-meh', css: `@keyframes sx-hue { from { filter: hue-rotate(0deg); } to { filter: hue-rotate(360deg); } } .sx-rainbow-meh .lb-meh, .sx-rainbow-meh .pm-meh { color: #e8453c !important; animation: sx-hue 7s linear infinite; }` },
      flavor: ['The counter is now a rainbow. The amount is the same. The amount has never looked happier.', 'Each digit has been issued a color and told not to compare.', 'Your Meh now passes through the whole spectrum. Red has been asked to wait its turn.'] },
    { id: 'gs.meh-glow', name: 'Meh Counter, Faintly Glowing', icon: '💡', category: 'cosmetic', price: 140,
      desc: 'A soft glow around your balance suggests you are either wealthy or radioactive. Both are officially unconfirmed.',
      effect: { bodyClass: 'sx-meh-glow', css: `.sx-meh-glow .lb-meh, .sx-meh-glow .pm-meh { text-shadow: 0 0 8px #ffd166, 0 0 18px #ff8d7a; }` },
      flavor: ['The counter glows faintly, warm and unsourced, like something quietly proud of itself.', 'Your balance has been lit from within. A man with a clipboard asked if it was safe, then if it was yours.', 'The glow is the glow of someone who is going to be fine by Thursday.'] },
    { id: 'gs.perforated', name: 'Perforated Cards (Tear Here)', icon: '✂️', category: 'cosmetic', price: 33,
      desc: 'A dotted line now runs around every card. Do not tear. The line is for the feeling of being allowed to.',
      effect: { bodyClass: 'sx-perforated', css: `.sx-perforated .lb-card, .sx-perforated .lb-item { outline: 3px dotted #2b2438; outline-offset: 4px; }` },
      flavor: ['Dotted lines installed. They suggest a tearing action nobody is going to take.', 'Everything is perforated. Sandra has asked that nothing be torn "except emotionally".', 'The lines are fully functional, in that they are visible and dotted.'] },
    { id: 'gs.sandra-stamp', name: "Sandra's Rubber Stamp", icon: '📋', category: 'cosmetic', price: 175,
      desc: 'Every department card is stamped APPROVED (PER SANDRA) in red. Sandra approved nothing and stamped everything.',
      effect: { bodyClass: 'sx-sandra-stamp', css: `.sx-sandra-stamp .lb-card-foot::after { content: "Approved (per Sandra)"; margin-left: auto; padding: 1px 6px; border: 2px solid #b3261e; border-radius: 4px; color: #b3261e; font-size: .62rem; font-weight: 900; letter-spacing: .08em; text-transform: uppercase; transform: rotate(-6deg); }` },
      flavor: ['Sandra has stamped everything. She also stamped the stamp, for completeness.', 'Every card bears an approval. None were reviewed. All were stamped with feeling.', 'The stamp reads APPROVED (PER SANDRA). She says it is a draft. It has been on 400 cards since 9:02.'] },
    { id: 'gs.shadows', name: 'Dramatic Shadows', icon: '🌑', category: 'cosmetic', price: 85,
      desc: 'Cards and buttons cast long, serious shadows, as if the afternoon is ending and everything knows it.',
      effect: { bodyClass: 'sx-shadows', css: `.sx-shadows .lb-card, .sx-shadows .lb-btn, .sx-shadows .pm-btn, .sx-shadows .lb-item { box-shadow: 10px 10px 0 rgba(43,36,56,.45) !important; }` },
      flavor: ['Shadows lengthened. It is now 4:50 PM in the lobby, permanently, and everyone is a little noir.', 'Each card casts a heavy shadow. The cards did nothing to deserve it. They are simply very good at it.', 'The light source was lowered. It declined to explain.'] },
    { id: 'gs.rounder', name: 'Everything, Rounder', icon: '🍩', category: 'cosmetic', price: 66,
      desc: 'Corners are removed from cards, buttons and chips and returned to the manufacturer, who says thank you for the corners.',
      effect: { bodyClass: 'sx-rounder', css: `.sx-rounder .lb-card, .sx-rounder .lb-btn, .sx-rounder .pm-btn, .sx-rounder .lb-chip, .sx-rounder .lb-input, .sx-rounder .lb-item, .sx-rounder .lb-poster, .sx-rounder .lb-note { border-radius: 26px !important; }` },
      flavor: ['Corners removed from the premises. They are in a bag labelled "Corners (Assorted)".', 'The lobby is now 40% rounder, according to a measurement nobody took.', 'Everything is softer at the edges, like a conversation about a meeting.'] },
    { id: 'gs.squarer', name: 'Everything, Squarer', icon: '⬛', category: 'cosmetic', price: 66,
      desc: 'Corners are sharpened and returned. Everything now looks like it has a plan, a deadline and a firm handshake.',
      effect: { bodyClass: 'sx-squarer', css: `.sx-squarer .lb-card, .sx-squarer .lb-btn, .sx-squarer .pm-btn, .sx-squarer .lb-chip, .sx-squarer .lb-input, .sx-squarer .lb-item, .sx-squarer .lb-poster, .sx-squarer .lb-note { border-radius: 0 !important; }` },
      flavor: ['All corners restored to factory sharpness. Please handle with a feeling of caution.', 'The lobby is squared away, which was always the point of squaring.', 'Roundness has been revoked. The circle was notified and has taken it personally.'] },
    { id: 'gs.small-caps', name: 'Small Caps (Quiet Shouting)', icon: '🔡', category: 'cosmetic', price: 28,
      desc: 'Text is set in small capitals: more formal than lowercase, quieter than capitals, and in conflict with itself.',
      effect: { bodyClass: 'sx-small-caps', css: `.sx-small-caps { font-variant-caps: small-caps; }` },
      flavor: ['Small caps applied. The words are standing up straight, but only slightly.', 'Everything is a little bit shouted. Nobody is upset. It is a quiet kind of loud.', 'Lowercase has been given the afternoon off and returns Monday.'] },
    { id: 'gs.shouting', name: 'Management, Visually Louder', icon: '🗣️', category: 'cosmetic', price: 52,
      desc: "Management's speech is now shown in capital letters. The tone is the same. It has always sounded like this on the inside.",
      effect: { bodyClass: 'sx-shouting', css: `.sx-shouting .pm-narr-bubble, .sx-shouting .lb-narr-bubble, .sx-shouting .lb-narr-text { text-transform: uppercase; letter-spacing: .02em; }` },
      flavor: ["Management's voice has been enlarged. It is the same voice in a bigger font.", 'An internal memo clarifies that this is "not a tone, it is a typeface".', 'Management says it did not notice the change. It says this in capitals.'] },
    { id: 'gs.crooked-posters', name: 'Crooked Posters (Set Dressing)', icon: '📌', category: 'cosmetic', price: 29,
      desc: 'The wall posters hang at slight angles, as if someone bumped them in 2009 and nobody was brave enough to fix it.',
      effect: { bodyClass: 'sx-crooked-posters', css: `.sx-crooked-posters .lb-poster { rotate: -3deg; } .sx-crooked-posters .lb-poster:nth-child(even) { rotate: 2.5deg; }` },
      flavor: ['Posters crooked. Facilities has been notified and has tilted its head.', 'A poster reads STRAIGHTEN UP. It has straightened up to 97%.', 'The posters have been that way since 2009, in the sense that someone has now said so.'] },
    { id: 'gs.logo-sway', name: 'Gently Swaying Logo', icon: '⛵', category: 'cosmetic', price: 95,
      desc: 'The logo sways a few degrees to a rhythm only it can hear. It has done this for years. You can finally see.',
      effect: { bodyClass: 'sx-logo-sway', css: `@keyframes sx-sway { 0%, 100% { rotate: -2.5deg; } 50% { rotate: 2.5deg; } } .sx-logo-sway .lb-logo { transform-origin: 50% 100%; animation: sx-sway 6s ease-in-out infinite; }` },
      flavor: ['The logo sways. It says it is "finding the rhythm". The rhythm has not been located.', 'A gentle sway has been installed, the logo equivalent of breathing out slowly at a desk.', 'The logo moves like a very calm metronome. Nobody is keeping time, and it is fine with that.'] },
    { id: 'gs.zebra', name: 'Zebra Striping (Zebra Sold Separately)', icon: '🦓', category: 'cosmetic', price: 77,
      desc: 'Every other department card gets a stripe. A zebra was requested. The stripes arrived. The zebra is on another floor.',
      effect: { bodyClass: 'sx-zebra', css: `.sx-zebra .lb-card:nth-child(even) { background-image: repeating-linear-gradient(135deg, rgba(43,36,56,.09) 0 10px, transparent 10px 20px); }` },
      flavor: ['Stripes applied. The zebra is, per Sandra, "in the building, not in the room".', 'Every second card is striped. The others stay plain, in solidarity.', 'The stripes are in. The zebra is expected Thursday. Thursday has not confirmed.'] },
    { id: 'gs.squiggles', name: 'Spell-Check Squiggles', icon: '〰️', category: 'cosmetic', price: 36,
      desc: 'A red wavy line sits under every title as if each one is misspelled. None are. The line only has a feeling.',
      effect: { bodyClass: 'sx-squiggles', css: `.sx-squiggles .lb-card-title, .sx-squiggles .lb-item-name, .sx-squiggles .lb-trophy-name, .sx-squiggles .lb-nav-txt { text-decoration: underline wavy #d6453a; text-underline-offset: 3px; }` },
      flavor: ['Red squiggles installed. They have no objection to the spelling, only a suspicion.', 'Everything is flagged for review. Nothing is wrong. It is just the mood of the proofreader.', 'The squiggles suggest alternatives. The alternatives are the same words, slightly more nervous.'] },
    { id: 'gs.dennis-halo', name: 'Dennis (Plant), Highlighted', icon: '🌱', category: 'cosmetic', price: 120,
      desc: 'Dennis (Plant) now has a faint green halo. He did not ask for it and is not impressed. He is, however, wearing it.',
      effect: { bodyClass: 'sx-dennis-halo', css: `.sx-dennis-halo .lb-plant-btn, .sx-dennis-halo .lb-plant-svg { filter: drop-shadow(0 0 7px #3ddc97) saturate(1.5); }` },
      flavor: ['Dennis has been given a halo. He accepted it the way a plant accepts everything: by continuing.', 'A soft glow surrounds Dennis. He is more visible. His answer has not changed.', 'Sandra reviewed the halo, then Dennis, then the halo, and said "fine".'] },
    { id: 'gs.asterisks', name: 'Asterisk On Everything', icon: '✳️', category: 'cosmetic', price: 48,
      desc: 'Every title now ends in an asterisk. The asterisk refers to a footnote. The footnote refers to the asterisk.',
      effect: { bodyClass: 'sx-asterisks', css: `.sx-asterisks .lb-card-title::after, .sx-asterisks .lb-item-name::after, .sx-asterisks .lb-trophy-name::after { content: "*"; color: #b3261e; font-weight: 900; margin-left: 2px; }` },
      flavor: ['Asterisks applied. Terms apply. The terms also have an asterisk.', 'A footnote was requested. It was found in a drawer, referring to the drawer.', 'Every claim in the lobby now carries a small star of doubt, at no extra cost (see asterisk).'] },
    { id: 'gs.pending', name: 'Everything Marked Pending', icon: '🕓', category: 'cosmetic', price: 44,
      desc: 'Every title now ends in "(pending)", including those that were finished. They are pending a review of that.',
      effect: { bodyClass: 'sx-pending', css: `.sx-pending .lb-card-title::after, .sx-pending .lb-item-name::after { content: " (pending)"; font-size: .62em; font-weight: 700; opacity: .7; letter-spacing: .04em; }` },
      flavor: ['Everything is now pending. Whether that counts as progress is itself pending.', 'The lobby has been marked pending. Please wait here, which you are already doing.', 'Pending applied to 100% of titles. The remaining 0% await approval of the 0.'] }
  ]);

  /* ================= CONSUMABLES WITH A SOUND OR A SIGHT (the effect happens once, on purchase) ================= */
  P.addShopItems([
    { id: 'gs.honk', name: 'Single Honk (Boxed)', icon: '🚗', category: 'consumable', price: 2, repeatable: true, priceGrowth: 1.15,
      desc: 'One honk, sold in a box and used up the moment you buy it, which is also when it is delivered. No returns on honks.',
      effect: { onBuy: function (api) { api.sfx('honk'); } },
      flavor: ['The honk was delivered and consumed in one motion. The box is yours to keep.', 'You now own the memory of a honk. The honk itself has left the building.', 'One honk, as specified. A second honk requires a second purchase, in a different mood.'] },
    { id: 'gs.confetti-one', name: 'Confetti, One (1) Burst', icon: '🎊', category: 'consumable', price: 6, repeatable: true, priceGrowth: 1.12,
      desc: 'A single burst, packed by hand in Aisle 4 and released over a lobby that did not ask.',
      effect: { onBuy: function (api) { api.confetti(); } },
      flavor: ["A burst of confetti has been issued. It will fall, and then it will be somebody's problem.", 'You bought a celebration without a reason. It was cheaper than the reason.', 'The confetti was used for its intended purpose, which was itself.'] },
    { id: 'gs.sigh', name: 'A Sigh, Ready-Made', icon: '😔', category: 'consumable', price: 3, repeatable: true, priceGrowth: 1.1,
      desc: 'Saves you the trouble of sighing. Arrives pre-exhaled, in a tone between "fine" and "I see".',
      effect: { onBuy: function (api) { api.sfx('sad'); } },
      flavor: ['The sigh was performed on your behalf. It was very thorough.', 'You no longer have to sigh. Someone has done it for you, near a window.', 'Management sighed too, a little later, in solidarity, and said it was the ventilation.'] },
    { id: 'gs.bell', name: 'Bell, Rung Once', icon: '🔔', category: 'consumable', price: 4, repeatable: true, priceGrowth: 1.1,
      desc: 'A bell is rung once, somewhere, for reasons that were not shared. You were present. That is all we can confirm.',
      effect: { onBuy: function (api) { api.sfx('bell'); } },
      flavor: ['The bell was rung. It did not say why, and is not required to.', 'Someone in a hallway looked up, then continued.', 'One ring delivered. A second ring was withheld for budgetary reasons.'] },
    { id: 'gs.fanfare', name: 'Fanfare (Small, Slightly Tired)', icon: '🎺', category: 'consumable', price: 30, repeatable: true, priceGrowth: 1.2,
      desc: 'A short fanfare for an event that has not happened yet and may never. The musicians are in the building, rehearsing somewhere.',
      effect: { onBuy: function (api) { api.sfx('fanfare'); } },
      flavor: ['A fanfare has been played. The event it announces is expected later and will be quiet.', 'The trumpet did its best. Its best was approved by a committee that had already gone home.', 'Fanfare delivered. You may now do something worthy of it, or nothing, retroactively.'] },
    { id: 'gs.drumroll', name: 'Drumroll With No Following Event', icon: '🥁', category: 'consumable', price: 11, repeatable: true, priceGrowth: 1.15,
      desc: 'A drumroll builds and builds, then stops, because nothing is next. The drummer has been thanked and sent to Facilities.',
      effect: { onBuy: function (api) { api.sfx('tick'); api.setTimeout(function () { api.sfx('tick'); }, 140); api.setTimeout(function () { api.sfx('tick'); }, 280); api.setTimeout(function () { api.sfx('tick'); }, 420); } },
      flavor: ['The drumroll is complete. The announcement has been moved to Room 9, which is closed.', 'Tension was built, then set down gently on a desk.', 'You asked for suspense and got it. It remains unresolved. Please store it somewhere cool.'] },
    { id: 'gs.toast-made', name: 'A Toast, Being Made', icon: '🍞', category: 'consumable', price: 5, repeatable: true, priceGrowth: 1.1,
      desc: 'The Toaster makes a toast, then gives one. It speaks only in toast. Reviews are warm.',
      effect: { onBuy: function (api) { api.toast('The Toaster has something to say: "Toast."', { icon: '🍞', title: 'Toasting' }); } },
      flavor: ['The Toaster made a toast and then a speech. The speech was also toast.', 'It is warm, brown and honest. The Toaster is proud of it and cannot say so.', 'Toast has been made. The Toaster considers the matter closed, and slightly crunchy.'] },
    { id: 'gs.word-management', name: 'A Word From Management (Single Use)', icon: '🎙️', category: 'consumable', price: 15, repeatable: true, priceGrowth: 1.2,
      desc: 'Management says one word. The word is chosen at the moment of purchase and has never once been "yes".',
      effect: { onBuy: function (api) { api.say(api.pick(['Synergy.', 'Noted.', 'Circling.', 'Adequate.', 'Tuesday.', 'Regardless.', 'Pending.', 'Hold.', 'Per.', 'Bandwidth.']), { mood: 'smug', priority: 1 }); } },
      flavor: ['Management has spoken, briefly. The word has since been put in a drawer labelled "Guidance".', 'You have received one word of guidance. Management would like it back if it goes unused.', 'The word meant what it meant, which was close enough, and it was gone by the second syllable.'] },
    { id: 'gs.balloon', name: 'Balloon, Popped On Delivery', icon: '🎈', category: 'consumable', price: 3, repeatable: true, priceGrowth: 1.1,
      desc: 'Arrives inflated and leaves popped. A complete balloon experience in 0.4 seconds, with no cleanup and one regret.',
      effect: { onBuy: function (api) { api.sfx('pop'); } },
      flavor: ['The balloon was popped on delivery. It is understood to have had a good, short life.', 'A balloon was inflated, handed over and burst before the receipt printed.', 'Pop. That was the balloon. It was a balloon for the whole time it existed.'] },
    { id: 'gs.stamp-one', name: 'One (1) Official Stamp', icon: '📮', category: 'consumable', price: 9, repeatable: true, priceGrowth: 1.15,
      desc: 'A single stamp, being stamped. It does not say what was approved. It says something was, and that it was a Wednesday.',
      effect: { onBuy: function (api) { api.sfx('stamp'); } },
      flavor: ['STAMPED. The ink was used on nothing, which dries quickly.', 'The stamp has landed. What it landed on is no longer your concern.', 'You have been issued an official stamp. It is official the way a weather report is official.'] },
    { id: 'gs.breeze', name: 'A Breeze, Indoors', icon: '🍃', category: 'consumable', price: 7, repeatable: true, priceGrowth: 1.12,
      desc: 'A gentle breeze passes through the lobby, which has no windows. It was seen leaving and has not been identified.',
      effect: { onBuy: function (api) { api.sfx('whoosh'); } },
      flavor: ['A breeze passed. The ficus noticed. Dennis (Plant) pretended not to.', 'Wind, indoors, briefly. A document in the next room moved slightly and thought better of it.', 'The breeze did a lap and left. It had other lobbies.'] },
    { id: 'gs.boing', name: 'Boing (Spring-Loaded)', icon: '🦘', category: 'consumable', price: 8, repeatable: true, priceGrowth: 1.12,
      desc: 'A boing, loaded on a spring and released on contact with your Meh. Use immediately or never.',
      effect: { onBuy: function (api) { api.sfx('boing'); } },
      flavor: ['It went boing. That was the whole of the product, and it was well made.', 'The boing is still bouncing somewhere in the building, at a lower and lower height.', 'The spring has been sprung. It waited its whole spring life for this.'] },
    { id: 'gs.tada', name: 'Ta-Da, Announced In Advance', icon: '🎆', category: 'consumable', price: 25, repeatable: true, priceGrowth: 1.2,
      desc: 'The sound of something being revealed. The thing revealed is the sound. Applause not included, though some may follow informally.',
      effect: { onBuy: function (api) { api.sfx('tada'); } },
      flavor: ['Ta-da. The thing was the sound. Please clap if you feel the sound deserves it.', 'A reveal has occurred. What was revealed is that it was revealed.', 'The curtain went up on a smaller curtain, which went up on a wall.'] },
    { id: 'gs.little-error', name: 'A Little Error (Harmless)', icon: '⚠️', category: 'consumable', price: 5, repeatable: true, priceGrowth: 1.1,
      desc: 'One mild error sound with no error attached. It says "something may have gone wrong", and nothing did.',
      effect: { onBuy: function (api) { api.sfx('error'); } },
      flavor: ['An error was played. Nothing was in error. It has been returned to where it came from.', 'You bought the sound of a problem without the problem, which is called a better deal.', 'Error sound delivered. Everything is fine. The sound was a drill.'] }
  ]);

  /* ================= COSMETICS THAT DO NOTHING (and say so, in a hat) ================= */
  P.addShopItems([
    { id: 'gs.invisible-hat', name: 'Invisible Hat', icon: '👒', category: 'cosmetic', price: 12,
      desc: 'You are wearing it now. Invisible, tasteful, and fitted by a person who has never met you. Effect: none, discreetly.',
      flavor: ['Fitted. You look exactly the same, which a tailor would call a perfect result.', 'Someone held the door for you and said nothing about the hat. That is the system working.', 'The hat has a brim of 4 inches. You cannot confirm this. Neither can anyone else.'] },
    { id: 'gs.moustache', name: 'Imaginary Moustache', icon: '🧔', category: 'cosmetic', price: 19,
      desc: 'All the authority of a moustache, none of the grooming. Cannot be seen, can be twirled. Effect: a mild flourish.',
      flavor: ['The moustache has taken hold. It twirls with real feeling, in a direction only you can see.', 'Management looked at you and said, "Something is different." Technically, it was right.', 'Your moustache was trimmed by a barber who does not exist. The result is crisp.'] },
    { id: 'gs.aura', name: 'Aura (Beige)', icon: '⚪', category: 'cosmetic', price: 28,
      desc: 'A faint personal aura in a shade the building calls Executive Oatmeal. Visible to nobody. Effect: presence, at 40 watts.',
      flavor: ['Your aura is installed. It clashes with nothing, including the auras of others.', 'The aura is warm to the touch, but touching is covered by a different policy.', 'Presence upgraded to "noticeable if you stand near a lamp".'] },
    { id: 'gs.name-tag', name: 'Name Tag, Slightly Wrong', icon: '🏷️', category: 'cosmetic', price: 31,
      desc: 'A name tag with one letter wrong, so every introduction opens with a small correction. Effect: corrections.',
      flavor: ['The tag reads "Valued Emplyee". Close enough to be official, wrong enough to be yours.', 'Compliance reviewed the typo and classed it as a feature, effective retroactively.', 'People will now correct themselves when addressing you, in advance.'] },
    { id: 'gs.lanyard', name: 'Lanyard (Empty)', icon: '🎫', category: 'cosmetic', price: 15,
      desc: 'A lanyard with nothing on the end. The most senior kind: it needs no badge and offers no explanation.',
      flavor: ['Everyone assumes the lanyard is for something. A man in Accounts saluted it.', 'The badge is on its way. It has been on its way since the lanyard was invented.', 'An empty lanyard says "I do not need to prove anything" and also "I lost the badge".'] },
    { id: 'gs.cape', name: 'Cape (Executive)', icon: '🦸', category: 'cosmetic', price: 340,
      desc: 'A cape for use at the desk. It billows only where there is a draft, and now every room has one. Effect: heroic, after a delay.',
      flavor: ['The cape billows in a breeze that Facilities has not confirmed.', 'The tag reads: "With great power comes a surprisingly long inbox."', 'You now look like someone who saves the day, on a delay of about a week.'] },
    { id: 'gs.crown', name: 'Crown (Paper, Per Policy)', icon: '👑', category: 'cosmetic', price: 120,
      desc: 'A paper crown, folded to code, with room for one head and no kingdom. Not a crown legally. A crown emotionally.',
      flavor: ['You rule a lobby that never voted and cannot leave. The lobby is fine with it.', 'The jewels are stickers, and the stickers are genuine, from a reputable sheet.', '"Long may you reign," said nobody, from the back, but with their face.'] },
    { id: 'gs.monocle', name: 'Monocle (Sees The Same)', icon: '🧐', category: 'cosmetic', price: 85,
      desc: 'Lets you see exactly what you could already see, but with disapproval. Excellent for memos and expressions.',
      flavor: ['Your view is unchanged. Your opinion of it is now framed.', 'You are now the sort of person who says "ah", slowly, at a spreadsheet.', 'The monocle has approved of everything it has seen since 1894. It is a very easy monocle.'] },
    { id: 'gs.glitter', name: 'Glitter, Emotional', icon: '✨', category: 'cosmetic', price: 8,
      desc: 'A handful of glitter applied to a mood. It will not appear on screen. It appears where needed, which is a feeling.',
      flavor: ['Your day has been glittered. It will be found in your week for months.', 'No visible sparkle. The sparkle is on the inside, where it is hard to clean.', 'Glitter is in the carpet now, and in the way things are.'] },
    { id: 'gs.sash', name: 'Sash: "Employee Of The Month"', icon: '🎗️', category: 'cosmetic', price: 55,
      desc: 'A sash declaring you Employee Of The Month. Which month is unspecified and may change. Effect: none, very visibly, to no one.',
      flavor: ['Awarded for work that was never described. The month is "the one that is going".', 'There is one employee and the month is a rumor. You win by a landslide of one.', 'The sash fits. It has always fit. That is what is suspicious.'] },
    { id: 'gs.scarf', name: 'Scarf For The Scroll Bar', icon: '🧣', category: 'cosmetic', price: 22,
      desc: 'The scroll bar has been feeling the cold. This scarf was knitted for it by committee. Effect: scrolling, but warmer.',
      flavor: ['The scroll bar is wearing the scarf. You cannot see it. It is cozy and it is there.', 'The scarf extends 0 pixels and weighs nothing. The scroll bar says it has never been warmer.', 'The scroll bar said thank you, by being a scroll bar. It meant every pixel.'] }
  ]);

  /* ================= CONSUMABLES THAT DO NOTHING (repeatable, prices climb with enthusiasm) ================= */
  P.addShopItems([
    { id: 'gs.tuesday-delay', name: 'Tuesday, Postponed One Hour', icon: '⏰', category: 'consumable', price: 40, repeatable: true, priceGrowth: 1.3,
      desc: 'Postpones Tuesday by one hour. Tuesday has been informed and is already outside, waiting, with the same hour.',
      flavor: ['Tuesday postponed by 1 hour. It said it would "see what it can do", which is not a yes.', 'Tuesday will now arrive an hour late and blame the traffic. There is no traffic.', 'The delay was filed with the calendar. The calendar made a face.'] },
    { id: 'gs.nap-voucher', name: 'Nap Voucher (Valid In Spirit)', icon: '😴', category: 'consumable', price: 25, repeatable: true, priceGrowth: 1.15,
      desc: 'Good for one nap, redeemable in spirit only. The spirit has been tired for years and wants that on record.',
      flavor: ['Nap approved for 3:15 PM, Room 4B, which is now officially quiet. Room 4B was not asked.', 'Voucher stamped "Zzz (Provisional)". You may rest, but only mildly.', 'Your nap will take place in an adjacent universe, near a very soft chair.'] },
    { id: 'gs.ticket-nowhere', name: 'Ticket To Nowhere (Standing Room)', icon: '🎟️', category: 'consumable', price: 14, repeatable: true, priceGrowth: 1.1,
      desc: 'Admits one to an event in a place that is not there, at a time that is not given. Standing room only. The room is the standing.',
      flavor: ['Ticket valid. The show begins when you stop looking for it.', 'There is a queue. The queue is the show. It has been sold out since 1998.', 'Entry to Nowhere is permitted, to the extent that you were already there.'] },
    { id: 'gs.cup-nothing', name: 'Cup Of Nothing (Hot)', icon: '☕', category: 'consumable', price: 5, repeatable: true, priceGrowth: 1.1,
      desc: 'A cup filled to the brim with nothing, kept hot. Do not drink. Do not not drink. The steam must be taken on trust.',
      flavor: ['The cup is full of nothing, which fills a cup very precisely.', 'A hot nothing has been poured. It is exactly the temperature of a good idea.', 'A warm drink that is not a drink. Your hands approve anyway.'] },
    { id: 'gs.sparkling-air', name: 'Sparkling Air', icon: '💨', category: 'consumable', price: 9, repeatable: true, priceGrowth: 1.15,
      desc: 'The same air as before, with a faint fizz you are asked to imagine. Not to be confused with Premium Air, which is flat and proud of it.',
      flavor: ['The air is sparkling now. It tickles the part of you still thinking about it.', 'You inhaled a premium product. It was gone before the label could be read.', 'Sparkling Air, opened. There was a small sound, and then there was less.'] },
    { id: 'gs.gold-star', name: 'Gold Star Sticker (For You, From You)', icon: '⭐', category: 'consumable', price: 2, repeatable: true, priceGrowth: 1.08,
      desc: 'A gold star awarded by you to you for a job going well enough. Already stuck on, on the inside.',
      flavor: ['Gold star awarded. The criteria are classified, and they were also you.', 'You gave yourself a star. It sticks to nothing, but it is gold.', 'Management is looking at your stars and wondering where its own went.'] },
    { id: 'gs.one-minute', name: 'One (1) Minute, Sealed', icon: '⏱️', category: 'consumable', price: 33, repeatable: true, priceGrowth: 1.2,
      desc: 'A minute sealed in a small jar, to be opened at a time of your choosing. It will be exactly one minute long. This has been checked twice.',
      flavor: ['You now own 60 seconds, in a jar. Open them or not, as is your right.', 'The minute is the same one everyone has. Yours is in a jar.', 'Very fresh, and it will stay that way until opened, or the next fire drill.'] },
    { id: 'gs.ice-cube', name: 'Ice Cube Of Moderate Ambition', icon: '🧊', category: 'consumable', price: 17, repeatable: true, priceGrowth: 1.12,
      desc: 'An ice cube that hopes to be something. It will become water. The ambition has been discussed and cannot be refunded.',
      flavor: ['The ice cube is already melting toward a better version of itself.', 'An ice cube with goals: a 5-year plan, of which 4 minutes remain.', 'Cold and determined. It will be a puddle with dignity.'] },
    { id: 'gs.soup', name: 'Soup Of The Day (Of Last Tuesday)', icon: '🍲', category: 'consumable', price: 12, repeatable: true, priceGrowth: 1.12,
      desc: 'A bowl of what was the soup of the day last Tuesday, now the soup of the day in memory. It tastes like looking back.',
      flavor: ['Last Tuesday had no complaints and, by the end, no soup.', 'Served: what soup was. The spoon is imaginary and also soup-shaped.', 'The soup of the day remains the soup of the day, indefinitely, like a rumor.'] },
    { id: 'gs.coupon', name: 'Coupon For A Coupon', icon: '🔖', category: 'consumable', price: 21, repeatable: true, priceGrowth: 1.15,
      desc: 'Redeemable against one future coupon, which is redeemable against this coupon. Expires the moment it is understood.',
      flavor: ['The coupon was redeemed for a coupon. Same coupon, now more valid.', 'You saved 0 Meh by spending 21. The saving is on the coupon, and the coupon is on the receipt.', 'It reads "VALID FOR ONE (1) COUPON". It contains one (1) coupon.'] },
    { id: 'gs.pep-talk', name: 'Pep Talk, Pre-Recorded', icon: '📢', category: 'consumable', price: 26, repeatable: true, priceGrowth: 1.15,
      desc: "A speech recorded at high energy and played back at low. Says \"you can do it\" in the voice of someone else's boss.",
      flavor: ['Pep talk delivered. You are 4% more ready, for something not specified.', 'A voice said "You are doing a thing." The thing remains unnamed. You are doing it.', 'Encouraged by a recording, which makes the encouragement consistent.'] },
    { id: 'gs.hug', name: 'Hug (Virtual, Awkward)', icon: '🤗', category: 'consumable', price: 35, repeatable: true, priceGrowth: 1.2,
      desc: 'A hug sent by the lobby, arms extended. Awkward in exactly the right amount. Please pat twice on the back and then stop.',
      flavor: ['A hug was sent. It was received. There was a pause, then a firm pat. The pat was the point.', 'Hugged. Everyone involved looked at the floor for a moment, kindly.', 'The lobby hugged you, but only slightly, and with a lanyard in the way.'] },
    { id: 'gs.cookie', name: 'Cookie, Rumored', icon: '🍪', category: 'consumable', price: 7, repeatable: true, priceGrowth: 1.1,
      desc: 'A cookie said to exist, in a jar, somewhere in the building. You are given the rumor, which is the warm part.',
      flavor: ['The cookie is rumored to be excellent. You have received the rumor, fully baked.', 'You now hold a cookie rumor. It crumbles in conversation.', 'The cookie was last seen in the break room, in the hands of someone who is no longer there.'] },
    { id: 'gs.thought', name: 'A Thought, Gift-Wrapped', icon: '💭', category: 'consumable', price: 18, repeatable: true, priceGrowth: 1.12,
      desc: 'A single thought in a box with a ribbon. A good one. You may not open it before the occasion, which has not been named.',
      flavor: ['The thought has been wrapped. It is small, but the ribbon has given it gravity.', 'You will find out what the thought is when you have it, probably on a Thursday.', 'The box is light. The thought is lighter. The bow is the heaviest thing here.'] }
  ]);

  /* ================= UPGRADES THAT UPGRADE NOTHING ================= */
  P.addShopItems([
    { id: 'gs.meh-plus', name: 'Meh+ Premium', icon: '💎', category: 'upgrade', price: 1500,
      desc: 'Upgrades your Meh to Meh+, which is identical to Meh but has a plus. Effect: a plus.',
      flavor: ['Your Meh is now Meh+. Same value, now photographed for the brochure.', 'The plus has been added to the end, like a small hat of approval.', 'You are now a premium customer of the same product. The tier name has been laminated.'] },
    { id: 'gs.faster-waiting', name: 'Faster Waiting', icon: '⏩', category: 'upgrade', price: 90,
      desc: 'Waiting takes exactly as long as before, with a feeling of efficiency that starts at once and ends when the waiting does.',
      flavor: ['Your waiting has been optimized. It is 0% faster and 100% more intentional.', 'You will now wait at the speed of a professional. The speed is unchanged.', 'Waiting upgraded. The clock says the same thing, but with more purpose.'] },
    { id: 'gs.pointer-accel', name: 'Pointer Acceleration (Stationary)', icon: '🖱️', category: 'upgrade', price: 210,
      desc: 'Your cursor now goes nowhere 12% faster. Gains are not measurable, which makes them unbeatable.',
      flavor: ['Pointer speed up by 12%. The pointer has been told it can go further. It has not asked where.', 'Your cursor is faster in the sense of an idea. It is fastest when you are not moving it.', 'Acceleration installed. It feels like movement, to the part of you that is standing still.'] },
    { id: 'gs.second-click', name: 'Second Click (Smaller)', icon: '👆', category: 'upgrade', price: 330,
      desc: 'Each click now comes with a second, smaller click that takes place in a parallel office. You will not see it. It is thorough.',
      flavor: ['Every click now has a smaller click behind it, like a shadow with a job.', "A second click has been added. It happens elsewhere and is somebody else's problem.", 'You are now clicking twice. One click is for you. The other is for the record.'] },
    { id: 'gs.luck-three', name: 'Fortune Cookie Luck +3', icon: '🥠', category: 'upgrade', price: 250,
      desc: 'Your luck is raised by 3. It is the kind of luck that makes a day feel slightly more like a Wednesday.',
      flavor: ['Luck +3. The effects will be seen in the way a Wednesday seems more like itself.', 'You are 3 luck better off, in a unit that has not been defined, per a person who did not check.', 'The cookie said "good things come". It did not say when. It said "soon", then "later", then "soon".'] },
    { id: 'gs.warranty', name: 'Extended Warranty On This Warranty', icon: '🛡️', category: 'upgrade', price: 640,
      desc: 'Covers the warranty in the event that the warranty fails. If this warranty fails, you will be covered, and the warranty will be sad.',
      flavor: ['The warranty on your warranty is active. It is covered. The cover is covered.', 'You are protected, twice, against the same thing, which is nothing going wrong.', 'A warranty has been added to a warranty. Together they have formed a small committee.'] },
    { id: 'gs.vip', name: 'VIP Pass (Valid In The Lobby)', icon: '🎖️', category: 'upgrade', price: 777,
      desc: 'Grants VIP access to the lobby, which you are already standing in and which is already free. Includes a rope. The rope is the VIP.',
      flavor: ['VIP status granted. You now have access to where you are. This is called inclusion.', 'A velvet rope was installed in front of nothing. You are permitted to step over it.', 'You are very important within a radius of 7 1/2 meters around yourself.'] },
    { id: 'gs.queue-position', name: 'Priority Queue Position (7 1/2)', icon: '🚶', category: 'upgrade', price: 900,
      desc: 'Moves you to position 7 1/2 in a queue nobody is standing in. You are now first, last and in the middle, and the queue is proud of you.',
      flavor: ['You are now 7 1/2 in the queue. The half is a person who has not arrived.', 'Your place in line improved. The line has not noticed. It is just a line.', 'Priority granted. You may wait with confidence at the front of a back that does not exist.'] },
    { id: 'gs.cloud', name: 'Cloud Storage (Actual Cloud)', icon: '☁️', category: 'upgrade', price: 1800,
      desc: 'Stores nothing in a real cloud, a cumulus, over a field near you. It is not connected to anything. It is, however, very high and very safe.',
      flavor: ['Your nothing is now stored in a cloud. It is a cumulus. It will drift, but it is not lost.', 'The cloud holds 0 bytes and a faint possibility of rain.', 'It rained briefly in the cloud. Nothing was lost, because nothing was in it.'] },
    { id: 'gs.smart-features', name: 'Smart Features (Intelligence Not Included)', icon: '🧠', category: 'upgrade', price: 2400,
      desc: 'Adds smart features to your Meh. There are no smart features. The word "smart" has been added to the box.',
      flavor: ['Smart features enabled. They are smart enough to be there and no smarter.', 'The Meh counter is now officially smart. It has been told. It hopes it can keep up.', 'Intelligence is not included, and so is not missed. It was a bold feature to add.'] },
    { id: 'gs.autosave-feelings', name: 'Auto-Save For Your Feelings', icon: '💾', category: 'upgrade', price: 480,
      desc: 'Saves your feelings every 7 1/2 minutes to a drive that is not a drive. If you feel something and close the page, it is still felt.',
      flavor: ['Your feelings are now saved automatically, in a folder named "Feelings (2)".', 'The auto-save is active. It saved this feeling, and the one before it, and a mild hunger.', 'Feelings backed up. The backup has feelings of its own, which have also been saved.'] },
    { id: 'gs.skip-tuesday', name: 'Skip Tuesday (Does Not Skip Tuesday)', icon: '⏭️', category: 'upgrade', price: 3000,
      desc: 'Allows you to skip Tuesday. Tuesday is not skipped. You will, however, be allowed to feel that you have, briefly and unsteadily.',
      flavor: ['Tuesday has been skipped, according to this receipt. Tuesday did not receive the memo.', 'You have skipped Tuesday. It followed you. It is behind you now, breathing calmly.', 'Skip applied. Tuesday has said it understands. It said so from right behind you.'] },
    { id: 'gs.premium-support', name: 'Premium Support Line (Rings Forever, Warmly)', icon: '☎️', category: 'upgrade', price: 1400,
      desc: 'A dedicated line for premium customers. It rings warmly, forever, and never picks up. You are important to us in that way.',
      flavor: ['The line is yours. It is ringing now. It sounds very glad to hear from you.', 'Support has been dedicated. It is on hold with itself and will be with you shortly.', 'Your call is important. A voice that does not exist is saying so, gently, on repeat.'] },
    { id: 'gs.unlimited', name: 'Unlimited Plan (Limit: Yes)', icon: '♾️', category: 'upgrade', price: 4200,
      desc: 'Unlimited, subject to a limit. The limit is yes. It is never defined, only affirmed, in a calm voice, when asked.',
      flavor: ['You now have an unlimited plan. The limit was explained to you in a soft voice and not repeated.', 'Unlimited, subject to terms. The terms are limited, but unlimited in how limited they are.', 'You are unlimited up to a point, and that point is where you stopped reading.'] },
    { id: 'gs.idle-license', name: 'Idle License (Class B)', icon: '🆔', category: 'upgrade', price: 275,
      desc: 'A license to idle. Class B permits idling in lobbies, hallways and the top half of stairwells. Class A, full-room idling, requires a form.',
      flavor: ['Your idle license has been issued. It is laminated, and it has expired, and it is valid.', 'You are now licensed to do nothing, in places, at times, with a hat.', 'Class B granted. Class A requires Form 27B/6, which is in the same drawer as the license.'] }
  ]);

  /* ================= JUNK (cheap) ================= */
  P.addShopItems([
    { id: 'gs.rock', name: 'Rock, Fully Rock', icon: '🗿', category: 'junk', price: 1,
      desc: 'A rock. It has been a rock the entire time and has no plans. The lowest price in the shop, which the rock considers an honor.',
      flavor: ['Sold: one rock, fully rock. It asked for nothing and has already received it.', 'The rock was already here. It now has a small note with your name on it.', 'A rock, committed to being a rock, joins your collection of one.'] },
    { id: 'gs.lint', name: 'Pocket Lint (Artisan)', icon: '🧶', category: 'junk', price: 6,
      desc: 'Hand-selected lint from a coat that no longer exists. Notes of cotton, of a bus, of a handshake.',
      flavor: ['Delivered in a small honest bag. Unique, as all lint is, and also not.', 'Provenance: left pocket, Coat 14, a bus. The story ends in a pocket.', 'A small cloud of fabric has been placed in your care. It has waited a long time to be noticed.'] },
    { id: 'gs.paperclip', name: 'Paperclip, Bent With Purpose', icon: '📎', category: 'junk', price: 3,
      desc: 'A paperclip bent into a shape that means something to it. The shape is not available for review. Holds nothing together, with conviction.',
      flavor: ['The paperclip has been bent. It is no longer a clip. It is a gesture.', 'A paperclip with a mission. The mission is the clip. The clip is the mission.', 'Mild transformation, thriving, still holding, which is the dream.'] },
    { id: 'gs.memo-pen', name: 'Pen That Writes Memos To Itself', icon: '✒️', category: 'junk', price: 17,
      desc: 'A pen that writes only memos addressed to the pen. The memos are brief and unreadable. The pen says it is being kept in the loop.',
      flavor: ['First memo: "Re: Re: Re:". The pen copied itself in.', 'The pen signs off with "Regards", and the regards are for the pen.', 'A pen keeping a record of its own life. The record is one very long "noted".'] },
    { id: 'gs.left-sock', name: 'Sock, Left (Right Is On A Journey)', icon: '🧦', category: 'junk', price: 38,
      desc: 'The left sock of a pair whose right sock went missing and has not been heard from. They write to each other. Neither letter arrives.',
      flavor: ['The left sock looks toward the door most of the time.', 'Half a pair. The other half is on a journey, described as "for personal reasons".', 'Being one half of a pair has made the sock a very good listener.'] },
    { id: 'gs.stapler-pamphlet', name: 'Stapler Union Pamphlet', icon: '📑', category: 'junk', price: 14,
      desc: 'A pamphlet from the Stapler, who is organizing. Demands include a break room with a break in it, and 7 1/2% more staples.',
      flavor: ['The pamphlet is stapled shut. Solidarity requires you to open it with your hands.', 'Demand 4: that "Stapler" be capitalized in all correspondence. Demand 5: staples.', 'Solidarity taken, with a firm ka-chunk and a stern look.'] },
    { id: 'gs.brochure', name: 'Brochure For This Brochure', icon: '📘', category: 'junk', price: 5,
      desc: 'A brochure describing the features of this brochure. Three panels: the brochure, the panels, and the fold.',
      flavor: ['The brochure tells you what it is. It does not tell you why.', 'A brochure for a brochure. The brochure agrees.', 'Panel 1 is the front. Panel 2 is the middle. Panel 3 is a very small, unprompted thank-you.'] },
    { id: 'gs.sticky-note', name: 'Sticky Note: "Remember The Thing"', icon: '🗒️', category: 'junk', price: 2,
      desc: 'A sticky note that says "Remember the thing". There is no thing. The note is absolutely certain about the thing.',
      flavor: ['The note says "Remember the thing." You do not remember the thing. It is a good note.', 'The sticky note has lost some of its stick and none of its certainty.', 'A reminder is now on your desk, which is not a desk, for a thing, which is not a thing.'] },
    { id: 'gs.keys', name: 'Keys To Nothing (Heavy)', icon: '🔑', category: 'junk', price: 52,
      desc: 'A heavy ring of keys. Each opens nothing, and does so with great weight. Jangles when carried, from the effort.',
      flavor: ['The keys open nothing and weigh a great deal, which is the cost of access to nothing.', 'The door is a concept. The keys are a lot.', 'The keys clink like they have somewhere to be. The somewhere has been misplaced and the keys are carrying on.'] },
    { id: 'gs.lobby-map', name: 'Map Of The Lobby (Actual Size)', icon: '🗺️', category: 'junk', price: 66,
      desc: 'A map of the lobby at a scale of 1:1. It is the lobby. Extremely accurate and very hard to fold.',
      flavor: ['Unfolded: the lobby. You are here. You were here. You are also here.', 'A perfect map of the room you are in. Reviews call it "very helpful" and "also the room".', 'You can now find your way around the lobby by holding the lobby.'] },
    { id: 'gs.globe', name: 'Snow Globe Of The Break Room', icon: '🔮', category: 'junk', price: 88,
      desc: 'A snow globe of a tiny break room where it is forever 3:15 PM. The snow is lint, and the lint is accurate.',
      flavor: ['Shaken. Inside, a tiny kettle did not boil, with great restraint.', '3:15 PM in the globe. 3:15 PM yesterday. The globe is consistent.', 'A break room with no people and one faintly lit fridge.'] },
    { id: 'gs.trophy', name: 'Participation Trophy (Spectator Class)', icon: '🏆', category: 'junk', price: 150,
      desc: 'A trophy for those who watched. Bronze-colored, shiny, engraved "YOU WERE THERE". You were there.',
      flavor: ['Presented. You gave a short speech: "Thank you. I was there."', 'A trophy for attendance. The crowd, which was you, went wild, quietly.', 'The engraving says "SPECTATOR" and is spelled correctly, which is more than can be said for the event.'] },
    { id: 'gs.mug', name: 'Mug Reading "World\'s Seventh-Best Employee"', icon: '🍵', category: 'junk', price: 48,
      desc: 'A mug that tells the truth about your ranking. Rank seven. Not bad, and a lucky number, in a manner of speaking.',
      flavor: ['Seventh best, as you are. The mug has been filled with nothing and handed over.', 'Six others have mugs that say sixth, fifth and so on. The mug for first is empty and on a shelf.', 'Dishwasher-safe. Has never seen a dishwasher.'] },
    { id: 'gs.gerald-photo', name: 'Signed Photograph Of Gerald (Potato)', icon: '🥔', category: 'junk', price: 200,
      desc: 'A photograph of Gerald, Vice President of Spuds, signed by Gerald. He has no hands, so the signature is a small, dignified lean.',
      flavor: ['Signed, in the sense that a potato can lean toward a pen.', 'Gerald looks directly at the camera with the gravity of a root vegetable.', 'In sepia, because the photograph has always been sepia and so has Gerald.'] },
    { id: 'gs.fine-print', name: 'Fine Print (Very Fine)', icon: '🔬', category: 'junk', price: 16,
      desc: 'A paragraph in a typeface so small it is considered a rumor. Legally binding. Cannot be read.',
      flavor: ['Delivered too small to see and already agreed to.', '0.4 point. It says either "thank you" or "no refunds". The font would not comment.', 'You now own small writing, binding in a very small way.'] },
    { id: 'gs.exit-sign', name: 'Exit Sign (Reads: You Are Valued)', icon: '🚪', category: 'junk', price: 74,
      desc: "An exit sign that points to no exit. It glows gently and reads \"YOU ARE VALUED\". The building's only sign, and it means it.",
      flavor: ['Mounted. It points up, and left, and into your heart. There is still no exit.', 'A green sign says you are valued. It glows. It has never been wrong about this.', 'Where an exit would be, a compliment. It is a very good one.'] },
    { id: 'gs.chair', name: 'Chair, Currently Unoccupied', icon: '🪑', category: 'junk', price: 95,
      desc: 'A chair with no one in it. Excellent condition. The previous no one left it with a very slight dent in the shape of an absence.',
      flavor: ['Unoccupied. It would like to stay that way for a while, please.', "Do not sit in it. It is the occupant's chair, and the occupant is nowhere.", 'An empty chair added to your lobby, already looking like it has been here all along.'] },
    { id: 'gs.honest-toast', name: 'Toast, Dry, Honest', icon: '🥯', category: 'junk', price: 25,
      desc: 'A slice of toast with no butter and no lies. Dry. Toast. The Toaster says "toast" in a way that means "I tried".',
      flavor: ['The Toaster handed over the slice and a look. The look said "this is the best I have".', 'Dry and sincere. It breaks a little, with feeling.', 'Warm, and it knows things. It has seen the inside of a toaster and has opinions on heat.'] },
    { id: 'gs.printer', name: 'Printer (Currently Jammed With Dignity)', icon: '🖨️', category: 'junk', price: 520,
      desc: 'A printer that has jammed, quietly, for what seems a good reason. It holds a single sheet at a slight angle and will not discuss it.',
      flavor: ['Jammed on arrival. It did so with composure.', 'A printer that has said no. The no was gentle and printed on crumpled paper.', 'Display reads "Check Tray 2". There is no Tray 2. The printer knows and weeps, in gray.'] },
    { id: 'gs.fire-extinguisher', name: 'Fire Extinguisher (Decorative)', icon: '🧯', category: 'junk', price: 140,
      desc: 'A decorative fire extinguisher. It extinguishes only a certain mood. Not for use on fire, which would be a bad time to find this out.',
      flavor: ['Red, shiny and full of confidence. Also full of nothing.', 'For decoration only, and it takes the decoration very seriously.', 'You are now safe from fires of the imagination. The other kind remains unaddressed.'] },
    { id: 'gs.empty-pot', name: 'Empty Pot For Dennis (Plant)', icon: '⚱️', category: 'junk', price: 60,
      desc: 'A pot for Dennis, who already has a pot. Dennis (Plant) looked at this pot and did not say no, which for Dennis is warmth.',
      flavor: ['A second pot for Dennis. He did not move. It was a very supportive not-moving.', 'The pot sits beside him, empty and with plans. Dennis grows slightly toward it.', 'Dennis is considering the pot, in the way of a plant, which is forever.'] },
    { id: 'gs.second-ficus', name: 'Second Ficus (Slightly Smaller Opinion)', icon: '🌳', category: 'junk', price: 310,
      desc: 'A ficus with fewer opinions than Dennis (Plant). It has exactly one, and it is mild. Sits in a corner and agrees with the light.',
      flavor: ['Smaller than Dennis, aware of it, and thriving anyway.', 'The ficus has an opinion, slight: "fine, maybe a bit left".', 'Dennis was informed of a second ficus and is unbothered. The ficus is thrilled.'] },
    { id: 'gs.echo', name: 'Echo, Lightly Used', icon: '🔊', category: 'junk', price: 66,
      desc: 'A gently used echo from a break room. It repeats the last word of whatever is said, a little later and with less confidence.',
      flavor: ['Installed. It says "installed", a bit later, to itself.', 'Slightly worn at the edges, as all echoes are, by sound.', 'It will repeat anything, but means it less each time.'] },
    { id: 'gs.wifi-note', name: 'Wi-Fi Password (Ask Dennis)', icon: '📶', category: 'junk', price: 33,
      desc: 'A sticky note with the Wi-Fi password: "Ask Dennis". Dennis is a plant, so the network is currently unavailable.',
      flavor: ['The password is "Ask Dennis". You asked. Dennis leaned toward you, which is not the password.', 'You are connected to the idea of a network. The idea is very fast.', 'Dennis has not yet responded, but he has been patient since 2011.'] }
  ]);

  /* ================= JUNK (expensive, ceremonial) ================= */
  P.addShopItems([
    { id: 'gs.cancelled-meeting', name: 'Meeting, Cancelled (Collectible)', icon: '📅', category: 'junk', price: 450,
      desc: 'A meeting that was cancelled, preserved in the amber of an email. Rare, and by many accounts the best kind. Sigh of relief included.',
      flavor: ['Cancelled and now yours: the best meeting you will never attend, invite and sigh included.', 'Filed between "Meeting That Could Have Been An Email" and the email.', 'Mint condition. Never opened, never held, never begun.'] },
    { id: 'gs.hallway-naming', name: 'Naming Rights To The Hallway', icon: '🛣️', category: 'junk', price: 8000,
      desc: 'The hallway is now named after you. It was not consulted and has been the hallway for 40 years. The sign says "Hallway".',
      flavor: ['Renamed. The new name is "Hallway". The old name was "Hallway". Your name is on the plaque.', 'Plaque affixed: "THIS HALLWAY, NAMED FOR YOU, LEADS TO OTHER HALLWAYS."', 'Naming rights confirmed. Thousands will walk through it and none will stay.'] },
    { id: 'gs.quiet-afternoon', name: 'A Quiet Afternoon (Whole)', icon: '🌅', category: 'junk', price: 15000,
      desc: 'One complete afternoon in which nothing is expected of you. Delivered whole, from 1 PM to close. Do not open before 1 PM.',
      flavor: ['Delivered whole and left on the table, humming slightly. The light is a certain gold.', 'It is the very afternoon you were already in, now with your name on it and no one coming.', 'Management will not interrupt. Management is standing by the door, holding a small chime and not using it.'] },
    { id: 'gs.gold-nothing', name: 'Gold-Plated Nothing', icon: '🥇', category: 'junk', price: 9500,
      desc: 'Nothing, gold-plated. The plating is real. The nothing is also real. It sits on a plinth and tells everyone it was worth it.',
      flavor: ['Plated. The nothing took the gold well, like it had finally been taken seriously.', 'Same as the free nothing, but shiny, with a small plaque reading "NOTHING, 24K".', 'Heavy on the inside, and not at all. The scale could not decide.'] },
    { id: 'gs.silence', name: 'Silence, Premium Edition', icon: '🔇', category: 'junk', price: 40000,
      desc: 'A silence of the highest grade, quieter than ordinary silence by an unmeasured amount. Delivered in a box trained not to rattle.',
      flavor: ['Delivered so quietly that nobody noticed, which is what the 40,000 Meh was for.', 'You can hear it not happening. That is the premium part.', 'Quieter now. Not by much. The ring of it is also quiet.'] },
    { id: 'gs.time-machine', name: 'Time Machine (Back To Last Minute)', icon: '⏪', category: 'junk', price: 75000,
      desc: 'Goes back exactly one minute, to when you had slightly more Meh. Very accurate. Very sorry about the numbers.',
      flavor: ['You went back 1 minute. You were there. You had nothing different to say.', 'Last minute turned out to be this minute with fewer plans.', 'You tried the machine and returned to the present, which was mostly where you left it.'] },
    { id: 'gs.small-island', name: 'A Small Island, Technically (Dispute Pending)', icon: '🏝️', category: 'junk', price: 120000,
      desc: 'An island, technically, subject to a dispute over whether it is an island or a rock with ambition. Palm tree rumored, not included.',
      flavor: ['Yours, technically. A seagull has already lodged a counter-claim.', 'The island is mostly a coordinate with a feeling, wet on every side.', 'Surveyors measured it at 3 square meters at low tide and 0 at high tide, and went home.'] },
    { id: 'gs.moon-slice', name: 'Moon, A Vertical Slice', icon: '🌙', category: 'junk', price: 250000,
      desc: 'A vertical slice of the Moon, top to bottom, none of the width. Marketed as "a lot of moon". Label: "Do not look at it too closely".',
      flavor: ['You own a slice of the Moon. It is thin and goes all the way down. Nobody knows which slice.', 'The Moon was informed and carried on being the Moon, as though it had a plan.', 'A sliver of lunar territory is now in your portfolio: cold, far and entirely theoretical.'] },
    { id: 'gs.tuesday-owned', name: 'Tuesday, Purchased Outright', icon: '🗓️', category: 'junk', price: 500000,
      desc: 'You now own Tuesday. Tuesday has not noticed. Do not mention it, and do not look at Tuesday directly.',
      flavor: ['Tuesday is yours. It is still coming, as it always was, now with your name on the front.', 'Tuesday does not know. If it finds out, it will be a very long week.', 'You own Tuesday outright, including the part where it is a Tuesday.'] },
    { id: 'gs.lobby-deed', name: 'Deed To The Lobby (Drawing Of)', icon: '🏛️', category: 'junk', price: 1000000,
      desc: 'A deed to the entire lobby. Legal says it is a deed. Sandra says it is a drawing of a deed. Yours either way, unenforceably.',
      flavor: ['You own the lobby. You were in it already. The paperwork is the only change.', 'The deed was drawn, signed and stamped. A masterpiece of legal fiction, and also a drawing.', 'The lobby has not noticed the transfer. Dennis (Plant) has. He says nothing, but he leans.'] }
  ]);

  /* ================= DECORATIVE SETTINGS (they do nothing; Management reacts) ================= */
  P.addSettings([
    { id: 'gs.s.dread', label: 'Ambient Dread', type: 'slider', min: 0, max: 100, default: 12,
      responses: ['Ambient Dread set to {count}. The lobby adjusted its lighting to match, by blinking once.', 'Dread at {count}%. Management calls this "a healthy amount, for a Tuesday".', 'Ambient Dread is now {count}. The ficus asked to be told if it goes any higher.'] },
    { id: 'gs.s.tuesday', label: 'Preferred Tuesday', type: 'select', options: ['Not this one', 'The next one', 'Whichever is closest', 'Cancelled', 'Already happened'], default: 'Not this one',
      responses: ['Preferred Tuesday: "{value}". Tuesday has received your preference and will do what it was going to do.', '"{value}" selected. Tuesday was copied in. It did not reply, but it did arrive.', 'Your Tuesday preference is logged as "{value}", on a form, under a different form.'] }, // lint-ignore
    { id: 'gs.s.music', label: 'Lobby Music (Imaginary) Volume', type: 'slider', min: 0, max: 11, default: 3,
      responses: ['Imaginary music is now at {count}. It is a piece you have never heard, and you agree it is lovely.', 'Volume {count} out of 11. The musicians are not here but can tell.', 'Music at {count}. The elevator went up a floor to be nearer to it, then came back down.'] },
    { id: 'gs.s.smell', label: 'Smell Of The Lobby', type: 'select', options: ['Carpet', 'Toner', 'Faint soup', 'Optimism (discontinued)', 'Rain on a filing cabinet'], default: 'Carpet',
      responses: ['The lobby now smells of {value}. You cannot smell it. It is very proud.', '"{value}" selected. A candle was lit in another building to match.', 'Scent set to {value}. Facilities was asked to commit to it and has agreed to think.'] }, // lint-ignore
    { id: 'gs.s.synergy', label: 'Enable Synergy', type: 'toggle', default: true,
      responses: ['Synergy toggled. Two departments waved at each other and went back to what they were doing.', 'The synergy setting has changed. Synergy continues, with or without you, and is going well.', 'Noted. Synergy was already in your calendar, between a meeting and the same meeting.'] },
    { id: 'gs.s.gerald', label: 'Allow Gerald To Speak', type: 'toggle', default: false,
      responses: ["Gerald's speaking permissions have changed. He is drafting a statement for later, or never.", 'Gerald has been informed. He nodded, which in a potato is a long, slow lean.', 'Gerald took the news in silence. It was a profound silence and slightly wrong.'] },
    { id: 'gs.s.sandra', label: 'Sandra Visibility', type: 'select', options: ['Unseen', 'Cited', 'Implied', 'Everywhere', 'Already behind you'], default: 'Cited',
      responses: ['Sandra is now "{value}". She noted the change and flagged it somewhere you cannot look.', 'Sandra visibility: {value}. She says this is fine, and has filed a complaint about it.', '"{value}" applied to Sandra. She saw it coming, in advance, with a clipboard.'] }, // lint-ignore
    { id: 'gs.s.meeting', label: 'Default Meeting Length (Minutes)', type: 'slider', min: 0, max: 120, default: 30,
      responses: ['Meetings are now {count} minutes long. They could all have been nothing, and now they are nothing for {count} minutes.', 'Meeting length: {count} min. The meeting has taken note and will run over by exactly 7 1/2.', '{count} minutes applied. Management is looking at a clock and seeing a different time.'] },
    { id: 'gs.s.plant-autonomy', label: 'Plant Autonomy', type: 'slider', min: 0, max: 100, default: 94,
      responses: ['Plant Autonomy at {count}%. Dennis (Plant) has always been at 94, so this has been taken as a suggestion.', 'Autonomy set to {count}. Dennis was told. He leaned, in his own time.', 'At {count}% autonomy the plant may decide for itself. It will decide to be a plant.'] },
    { id: 'gs.s.stapler-union', label: 'Recognize The Stapler Union', type: 'toggle', default: false,
      responses: ['The Stapler has been told about the change. It sent a thank-you note, pressed firmly, in triplicate.', 'Union recognition has changed. The Stapler has called a meeting. It will be about breaks.', 'The Stapler has gone quiet, which is its most aggressive mode.'] },
    { id: 'gs.s.chair', label: 'Chair Height (cm, Subjective)', type: 'slider', min: 30, max: 70, default: 45,
      responses: ['Chair height set to {count} cm, subjectively. You feel exactly that tall.', 'The chair is now {count} cm. Posture has been affected, by which we mean noticed.', 'Height {count}. The chair did not move. It has agreed to be considered adjusted.'] },
    { id: 'gs.s.echo', label: 'Echo In The Break Room', type: 'toggle', default: true,
      responses: ['The break room echo has been toggled. It said "toggled" back, with less confidence.', 'Something in the break room paused, and then, a little later, paused again.', 'The echo registered the change and repeated it to the one person present, who left.'] },
    { id: 'gs.s.notify-sound', label: 'Notification Sound', type: 'select', options: ['Ding', 'A different ding', 'Silence (loud)', 'The sound of an email being thought about', 'Gerald, humming'], default: 'Ding',
      responses: ['Notification sound set to "{value}". You will not hear it. It will still be sent to people who are not you.', '"{value}" selected. Notifications are rebranded, still on time, still about nothing.', 'Sound changed to {value}. Management played it once in an empty hallway to test the room.'] }, // lint-ignore
    { id: 'gs.s.view', label: 'Window View', type: 'select', options: ['Parking lot', 'A cloud', 'A different parking lot', 'A painting of a window', 'Fog, with ambitions'], default: 'Parking lot',
      responses: ['The view is now "{value}". There is no window. The view was told, and agreed to be seen anyway.', '"{value}" selected. A man with a ladder has not come to install it. The view is installed.', 'Window view updated to {value}. It is entirely sufficient and slightly to the left.'] }, // lint-ignore
    { id: 'gs.s.flicker', label: 'Fluorescent Flicker Rate (Hz)', type: 'slider', min: 0, max: 120, default: 50,
      responses: ['Flicker rate: {count} Hz. The lights were informed and blinked in acknowledgment, irregularly.', '{count} Hz. The ceiling is flickering at the rate of a slightly nervous thought.', 'Fluorescent flicker set to {count}. Facilities was notified. Facilities also flickered.'] },
    { id: 'gs.s.alignment', label: 'Corporate Alignment', type: 'select', options: ['Aligned', 'Slightly aligned', 'Realigning', 'Diagonal', 'Circling'], default: 'Slightly aligned',
      responses: ['Alignment set to "{value}". The whole lobby leaned a little to show it understands.', 'We are now {value}. This is our best configuration, until it is not.', '"{value}" applied. A memo about it is being drafted in landscape, for balance.'] }, // lint-ignore
    { id: 'gs.s.vibes', label: 'Vibes', type: 'select', options: ['Good', 'Mixed', 'Per policy', 'Unspecified', 'Tuesday'], default: 'Per policy',
      responses: ['Vibes set to {value}. They have been noted and will be reviewed at the next vibes review.', '"{value}" vibes selected. The lobby has changed to match, though nobody can say how.', 'Vibes: {value}. Management responded with a small, careful nod, which is itself a vibe.'] }, // lint-ignore
    { id: 'gs.s.ooo', label: 'Automatic Out-Of-Office', type: 'toggle', default: true,
      responses: ['Out-of-office toggled. It replied to this change to say you are away from this change.', 'The auto-reply has been adjusted. It will answer everyone, including you, and including itself.', 'You are in the office, which is the lobby, which has no office in it. The auto-reply apologizes anyway.'] },
    { id: 'gs.s.elevator', label: 'Elevator Music Style', type: 'select', options: ['Smooth', 'Smoother', 'Smoothest', 'Gravel', 'Descending (decorative)'], default: 'Smooth',
      responses: ['Elevator music: {value}. The elevator does not exist, but the music has been dispatched.', '"{value}" selected. Somewhere a floor went by, politely, without stopping.', 'Music style set to {value}. The lobby moved slightly between floors that do not exist.'] }, // lint-ignore
    { id: 'gs.s.nothing-detail', label: 'Level Of Detail In Nothing', type: 'slider', min: 0, max: 100, default: 100,
      responses: ['Detail in Nothing: {count}%. Nothing was rendered with that much care. It looks the same and is very well made.', 'Nothing is now {count}% detailed. The detail is invisible and has been checked by an expert.', 'At {count}% nothing has texture. It is smooth, as ever, in a more specific way.'] },
    { id: 'gs.s.reply-all', label: 'Reply-All Warning', type: 'toggle', default: false,
      responses: ['Reply-All Warning changed. A warning about the change has been sent to everyone.', 'Reply-All setting updated. Everyone is in the loop, and the loop has been told.', 'Noted. You will be warned about replying to all, and again afterward, by all.'] },
    { id: 'gs.s.laminate', label: 'Auto-Laminate Documents', type: 'toggle', default: true,
      responses: ['Lamination preference recorded. It was laminated immediately, to keep it from changing.', 'Auto-laminate changed. Two documents were laminated in protest and one in agreement.', 'A laminated copy of this setting is in the drawer, and also is not.'] },
    { id: 'gs.s.thermostat', label: 'Thermostat (Degrees, Disputed)', type: 'slider', min: 14, max: 30, default: 21,
      responses: ['Thermostat set to {count}. A person on another floor has set it two lower. They will talk.', 'The temperature is now {count}. The thermostat is not connected to anything, but it is warm in a mostly agreed way.', 'Set to {count}. The thermostat has begun a long, silent dispute with the wall.'] },
    { id: 'gs.s.fire-drill', label: 'Fire Drill Frequency', type: 'select', options: ['Never', 'Annually', 'Whenever Dennis senses it', 'Constantly (quietly)'], default: 'Annually',
      responses: ['Fire drills: {value}. The drill was informed and is ready, sitting in a coat.', '"{value}" selected. The lobby has practiced standing very still, which is the main skill.', 'Drill frequency set to {value}. An alarm in the next building went off in sympathy, once.'] }, // lint-ignore
    { id: 'gs.s.stationery', label: 'Stationery Budget Review', type: 'select', options: ['Pending', 'Postponed', 'Under review', 'Reviewing the review', 'Approved (pen only)'], default: 'Pending',
      responses: ['Stationery budget: {value}. It has been recorded in pen, which is the only item left.', '"{value}" selected. The budget was seen by a stapler, which signed it in two places.', 'Budget status set to {value}. The paperclips were told to stand by.'] }, // lint-ignore
    { id: 'gs.s.coffee', label: 'Coffee Strength (None Available)', type: 'slider', min: 0, max: 10, default: 5,
      responses: ['Coffee strength {count}. There is no coffee. The strength is theoretical, and quite strong.', 'Brewed at {count} out of 10, in a pot that is not here. It smells like intent.', 'Coffee set to {count}. The break room is aware. It is waiting, at room temperature.'] },
    { id: 'gs.s.ceiling-tiles', label: 'Keep Ceiling Tile Count Private', type: 'toggle', default: false,
      responses: ['The ceiling tile count privacy setting changed. The count is 412. It is not 412. You have not seen it.', 'Tiles were counted again, privately, by a person on a ladder who is not there.', 'Noted. Further tile numbers will be released on request, in a brown envelope.'] },
    { id: 'gs.s.hold-pitch', label: 'Hold Music Pitch (Semitones)', type: 'slider', min: 0, max: 24, default: 12,
      responses: ['Hold music pitch set to {count}. It is a tone that says "someone will be with you", in key, on a loop.', 'Pitch {count}. The hold music is now at the exact note that makes a person put the phone down gently.', 'At {count} semitones the music is a feeling, held. You have been on hold longer than this setting.'] },
    { id: 'gs.s.stapler-support', label: 'Emotional Support Stapler', type: 'toggle', default: true,
      responses: ['The Stapler has been informed of the change and has stapled the note to another note.', 'The Stapler is beside you. It was told to be supportive and is doing its best with one jaw.', 'The Stapler is aware of the change. It has gone quiet, which is also supportive.'] },
    { id: 'gs.s.idle-timeout', label: 'Idle Timeout', type: 'select', options: ['5 minutes', '7 1/2 minutes', '1 afternoon', 'Indefinite', 'Until eye contact'], default: '7 1/2 minutes',
      responses: ['Idle timeout set to {value}. The lobby will notice you are idle when it feels you have been idle enough.', '"{value}" selected. It was recorded on a wall calendar that does not have a wall.', 'Idle timeout: {value}. You may now do nothing for a very specific amount of time.'] }, // lint-ignore
    { id: 'gs.s.date-format', label: 'Date Format', type: 'select', options: ['DD/MM/YYYY', 'MM/DD/YYYY', 'Sometime near a Tuesday', 'Week 7 1/2', 'Whenever'], default: 'Sometime near a Tuesday',
      responses: ['Date format set to "{value}". The date was informed and quietly rearranged itself.', '"{value}" selected. All dates are now shown that way. Several were embarrassed.', 'Date display: {value}. Today is still today. It is just being written down differently.'] }, // lint-ignore
    { id: 'gs.s.gravity', label: 'Gravity (% Of Normal)', type: 'slider', min: 0, max: 200, default: 100,
      responses: ['Gravity set to {count}%. Nothing moved. Everything was told to feel lighter or heavier, as applicable.', 'At {count}% gravity the lobby paused to consider where down is, and decided to stay.', 'Gravity {count}. The ficus leaned by exactly the amount you would expect, which is none.'] },
    { id: 'gs.s.ooo-tone', label: 'Out-Of-Office Tone', type: 'select', options: ['Warm', 'Firm', 'Wistful', 'Legally binding'], default: 'Warm',
      responses: ['Out-of-office tone set to {value}. It will say "I am away" as if it has been somewhere.', '"{value}" selected. The auto-reply was rewritten and also, somehow, slightly moved.', 'Tone: {value}. It was tested on an empty inbox, which responded with tone.'] }, // lint-ignore
    { id: 'gs.s.gossip', label: 'Watercooler Gossip Level', type: 'slider', min: 0, max: 100, default: 40,
      responses: ['Gossip at {count}%. The watercooler has no water. It has details, and they are unverified.', 'Watercooler gossip set to {count}. A rumor went around the hallway. It was about you, and it was warm.', 'Gossip level {count}. Someone said something about someone, in a language nobody speaks.'] },
    { id: 'gs.s.fun-intensity', label: 'Mandatory Fun Intensity', type: 'slider', min: 0, max: 100, default: 60,
      responses: ['Mandatory Fun Intensity: {count}%. Fun will be applied at that level. Enjoyment is mandatory as well.', 'At {count} the fun is serious. It has a schedule and a person with a clipboard who was told to smile.', 'Fun set to {count}. You are required to enjoy it by 3:15 PM, or by a time that feels appropriate.'] },
    { id: 'gs.s.rumor-mill', label: 'Rumor Mill Output', type: 'toggle', default: true,
      responses: ['The rumor mill setting changed. A rumor that it changed is already going around.', 'The mill has said nothing, loudly, to everyone, in confidence.', 'Noted. The first rumor produced was that you changed the setting. It was accurate, which worries the mill.'] },
    { id: 'gs.s.handshake', label: 'Handshake Firmness', type: 'slider', min: 0, max: 100, default: 55,
      responses: ['Handshake firmness {count}. It will meet any hand with that much grip, then a pause.', 'At {count}% the handshake is firm in a polite, deniable way. Somebody is already deciding how to feel.', 'Firmness {count}. The handshake was calibrated against an invisible hand, which was fine with it.'] },
    { id: 'gs.s.toaster', label: 'Allow The Toaster To Speak In Toast', type: 'toggle', default: true,
      responses: ['The Toaster was informed of the change. It said "toast", and it meant it.', "The Toaster's permissions changed. It accepted with grace, and a small pop.", 'The Toaster looked at you and said, in toast, exactly what it was going to say anyway.'] },
    { id: 'gs.s.silence', label: 'Silence Quality', type: 'select', options: ['Standard', 'Awkward', 'Comfortable', 'Library', 'Premium (see shop)'], default: 'Standard',
      responses: ['Silence quality: {value}. Nobody said anything about the upgrade, which is the quality.', '"{value}" selected. The lobby is quiet in a new and more specific way.', 'Silence set to {value}. It is extremely quiet, in a manner that is itself a kind of sound.'] }, // lint-ignore
    { id: 'gs.s.sock-search', label: 'Missing Sock Search Party Size', type: 'slider', min: 0, max: 40, default: 3,
      responses: ['Search party: {count} people. They will search for the sock in a line, very slowly, calling "sock".', 'Party size {count}. The sock has been notified and has not come out. It is on a journey.', 'Sock search party set to {count}. They have a map, a flask and a strong sense that the sock moved on.'] }
  ]);

})();
