/* POINTLESS ui 12: the Lobby's own trophies and a few starter Gift Shop items (ids prefixed "lobby.").
 * Content packs add the rest; these make sure the Cabinet and the Shop work (and can be tested) on day one. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const earnedAll = function (s) { return (s['meh.earned'] || 0) + (s['meh.passive'] || 0); };

  P.addAchievements([
    { id: 'lobby.welcome', name: 'Orientation Attended', desc: 'Complete (or skip) orientation. Skipping counts. Everything counts.', icon: '🎓', reward: 1 },
    { id: 'lobby.first-buy', name: 'Consumer of Nothing', desc: 'Buy one (1) item from the Gift Shop of Nothing.', icon: '🛍️', reward: 2,
      check: function (s) { return (s['shop.bought'] || 0) >= 1; } },
    { id: 'lobby.ten-buys', name: 'Collector of Nothing, Lightly', desc: 'Buy 10 things. They do not need to be different things.', icon: '🧺', reward: 5,
      check: function (s) { return (s['shop.bought'] || 0) >= 10; } },
    { id: 'lobby.unlock', name: 'Open Door Policy', desc: 'Unlock a locked department. The door was never locked, emotionally.', icon: '🔓', reward: 3,
      check: function (s) { return (s['modules.unlocked'] || 0) >= 1; } },
    { id: 'lobby.ascend', name: 'Same Place, Humming', desc: 'Ascend once. Arrive exactly where you started, slightly more humming.', icon: '⬆️', reward: 10,
      check: function (s) { return (s.ascensions || 0) >= 1; } },
    { id: 'lobby.surprise', name: 'Surprise (As Scheduled)', desc: 'Press Surprise Me. The surprise will arrive on time.', icon: '🎲', reward: 1,
      check: function (s) { return (s['lobby.surprises'] || 0) >= 1; } },
    { id: 'lobby.meh100', name: 'A Hundred Meh Richer', desc: 'Earn 100 Meh in total. Spend it carefully, or not.', icon: '💵', reward: 2,
      check: function (s) { return earnedAll(s) >= 100; } },
    { id: 'lobby.meh1000', name: 'Four Digits of Nothing', desc: 'Earn 1,000 Meh in total.', icon: '💰', reward: 5,
      check: function (s) { return earnedAll(s) >= 1000; } },
    { id: 'lobby.meh10000', name: 'Five Digits, One Feeling', desc: 'Earn 10,000 Meh in total. The feeling is "adequate".', icon: '🏦', reward: 10,
      check: function (s) { return earnedAll(s) >= 10000; } },
    { id: 'lobby.refund', name: 'Refund Processed (0 Meh)', desc: 'Complete the Gift Shop refund process. The refund is 0 Meh. The process is real.', icon: '🧾', reward: 7.5 },
    { id: 'lobby.fortunes', name: 'Fortunate, Per Policy', desc: 'Collect 7 fortunes from the Fortune Dispenser.', icon: '🥠', reward: 3,
      check: function (s) { return (s['lobby.fortunes'] || 0) >= 7; } },
    { id: 'lobby.returner', name: 'Frequent Returner', desc: 'Return to the Lobby 25 times. It always notices.', icon: '🚪', reward: 3,
      check: function (s) { return (s['lobby.visits'] || 0) >= 25; } },
    { id: 'lobby.stats', name: 'Numbers Person', desc: 'Look at the Statistics Nobody Asked For. Somebody has now asked.', icon: '📊', reward: 1 },
    { id: 'lobby.settings', name: 'Tinkerer', desc: 'Change a decorative setting. Management has noticed, and feels fine about it.', icon: '🎛️', reward: 1 },
    { id: 'lobby.name', name: 'Named and Filed', desc: 'Choose your own name. It has been filed under "Names".', icon: '🎫', reward: 1 },
    { id: 'lobby.dennis', name: 'Dennis Is Not Impressed', desc: 'Poke Dennis (Plant) 10 times.', icon: '🌿', secret: true, reward: 3,
      check: function (s) { return (s['lobby.plantPokes'] || 0) >= 10; } },
    { id: 'lobby.dennis-flower', name: 'Dennis Has Noticed You', desc: 'Poke Dennis (Plant) 50 times. He grows a flower, out of spite.', icon: '🌸', secret: true, reward: 7.5,
      check: function (s) { return (s['lobby.plantPokes'] || 0) >= 50; } },
    { id: 'lobby.logo', name: 'Brand Awareness', desc: 'Click the logo 10 times. The logo is aware.', icon: '🏷️', secret: true, reward: 3,
      check: function (s) { return (s['lobby.logoClicks'] || 0) >= 10; } },
    { id: 'lobby.clock', name: 'Punctual, Elsewhere', desc: 'Adjust the wrong clock 7 times. It is wrong with more confidence now.', icon: '🕰️', secret: true, reward: 3,
      check: function (s) { return (s['lobby.clockClicks'] || 0) >= 7; } },
    { id: 'lobby.konami', name: 'Cheat Code (For Nothing)', desc: 'Enter an ancient sequence of arrows. Receive the ancient reward of nothing.', icon: '🎮', secret: true, reward: 10 },
    { id: 'lobby.boss', name: 'Looks Busy', desc: 'Hide from Management with the boss key. Management is relieved, and also hiding.', icon: '📈', secret: true, reward: 2,
      check: function (s) { return (s['lobby.bossKeys'] || 0) >= 1; } },
    { id: 'lobby.tos', name: 'I Agree (Eventually)', desc: 'Catch the shy Accept button and accept the Terms of Service.', icon: '📜', secret: true, reward: 7.5 },
    { id: 'lobby.tos-bottom', name: 'Fine Print Enthusiast', desc: 'Scroll the Terms of Service all the way to the bottom. It does end. Somewhere.', icon: '🔍', secret: true, reward: 3 },
    { id: 'lobby.credits', name: 'Stayed for the Credits', desc: 'Watch the credits to their very end. The game continues.', icon: '🎬', secret: true, reward: 7.5 },
    { id: 'lobby.reset', name: 'Fresh Start (Same Start)', desc: 'Erase everything, thoroughly, in five steps. Begin again, nearly.', icon: '🧼', secret: true, reward: 1 },
    { id: 'lobby.potato', name: 'Gerald Is Summoned', desc: 'Say the word. Gerald, Vice President of Spuds, hears everything.', icon: '🥔', secret: true, reward: 3 },
    { id: 'lobby.meh-counter', name: 'Counter Offer', desc: 'Click the Meh counter 7 times. It is not a button, but it has been very patient.', icon: '🔢', secret: true, reward: 2,
      check: function (s) { return (s['lobby.mehClicks'] || 0) >= 7; } },
    { id: 'lobby.empty-search', name: 'The Search For Nothing', desc: 'Search for something that is not there, three times. Nothing, found thrice.', icon: '🔭', secret: true, reward: 2,
      check: function (s) { return (s['lobby.emptySearches'] || 0) >= 3; } },
    { id: 'lobby.farewell', name: 'Clocked Out, Briefly', desc: 'Clock out of the Lobby, then change your mind. Nobody left.', icon: '👋', secret: true, reward: 2 }
  ]);

  P.addShopItems([
    { id: 'lobby.receipt', name: 'A Receipt For This Receipt', desc: 'Proof that you have proof. Accepted at all participating nowhere.', price: 3, icon: '🧾', category: 'junk', repeatable: true, priceGrowth: 1.1,
      flavor: ['The receipt has been receipted. A small stamp says "NOTED".', 'You now own documentation of documentation. Management is moved, and slightly out of breath.'] },
    { id: 'lobby.air', name: 'Premium Air (Sealed)', desc: 'The same air as before, but now it is yours. Do not open. Do not not open.', price: 8, icon: '🥫', category: 'consumable', repeatable: true, priceGrowth: 1.25,
      flavor: ['You are the proud owner of air. It is the same air. It is, however, now in a jar.', 'The jar has been sealed with a warm feeling and a sticker that says 7 1/2.'] },
    { id: 'lobby.laminate', name: 'Laminated Nothing', desc: 'A sheet of nothing, protected against the elements and also against meaning.', price: 12, icon: '📄', category: 'junk', repeatable: true, priceGrowth: 1.2,
      flavor: ['It is laminated. It is nothing. It is wipe-clean, and has never been dirty.', 'The nothing has been sealed in plastic for its protection. It is thriving.'] },
    { id: 'lobby.sepia', name: 'Sepia Mode (Looks Like Nostalgia)', desc: 'The lobby, remembered fondly. Toggle it any time you miss a time that never happened.', price: 15, icon: '📜', category: 'cosmetic',
      effect: { css: 'body{background-color:#ecd7a8 !important}' },
      flavor: ['The lobby now looks like a photograph of itself. Warm, slightly yellow, legally distinct.', 'Sepia mode is on. You will remember this as the good old days. These are them.'] },
    { id: 'lobby.tiny-hat', name: 'Tiny Hat for the Meh Counter', desc: 'Dignity for a number. The hat does not stay on during large sums.', price: 25, icon: '🎩', category: 'cosmetic',
      effect: { bodyClass: 'lbx-hat' },
      flavor: ['The Meh counter is wearing a tiny hat. It looks confident. It looks like it has a meeting.', 'A hat has been fitted. The counter did not ask for it, but has not removed it.'] },
    { id: 'lobby.signature', name: "Sandra's Signature (Photocopy)", desc: 'It is a copy of a signature. It is not valid. It is, however, very well signed.', price: 40, icon: '🖊️', category: 'junk',
      flavor: ['Sandra from Compliance has signed this. Sandra has also signed a note saying she has not.', 'You now hold a photocopy of approval. It is approved, in copy.'] },
    { id: 'lobby.serif', name: 'Distinguished Font', desc: 'Everything is the same, only now it wears a suit of serifs. Toggle freely.', price: 60, icon: '🖋️', category: 'cosmetic',
      effect: { css: ':root{--pm-font:Georgia,"Times New Roman",Times,serif !important}' },
      flavor: ['The lobby has been set in a serif typeface. It is now a firm, and everyone is a partner.', 'The words now have little feet. They are excited to be going places, but only on the page.'] },
    { id: 'lobby.hum', name: 'Ambient Hum (Visual)', desc: 'The logo hums softly, in a way you can see. You may stop hearing it. You may start seeing it.', price: 90, icon: '〰️', category: 'cosmetic',
      effect: { bodyClass: 'lbx-hum' },
      flavor: ['The logo has begun to hum. It was always humming. It has now been given permission to show it.', 'A gentle visual hum has been installed. It is quieter than silence and slightly louder than that.'] }
  ]);
})();
