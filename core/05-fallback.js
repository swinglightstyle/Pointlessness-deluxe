/* POINTLESS core 05: fallback lines. Used ONLY when a category has no lines at all
 * (content packs in content/*.js are the real source of comedy). Kept short on purpose. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  P.fallbackLines = {
    greeting: [
      'Welcome back, {player}. Your absence was noted, filed, and politely ignored.',
      'Good news, {player}: nothing has happened since you left.'
    ],
    idle: [
      'Management is not watching. Management is simply facing in your direction.',
      'Per my previous silence: take your time, {player}. There is no time to take.'
    ],
    award: [
      'You have earned a small amount of Meh. It has been processed by a committee of one.',
      '{meh} Meh on hand. A figure of no importance, accurately reported.'
    ],
    bigAward: [
      'That was a lot of Meh, {player}. We are going to need a larger nothing to put it in.',
      'A notable sum. Sandra from Compliance has been informed and has no comment.'
    ],
    nothing: [
      'Management has nothing to say about this, and is saying it with confidence.',
      'Nothing happened. The nothing has been documented.'
    ],
    buy: [
      'Purchase complete. The item is now yours in the way that a cloud is yours.',
      '{item} acquired. Please do not use it for anything.'
    ],
    hubReturn: [
      'Welcome back to the lobby. It is exactly as you left it, minus the dust.',
      'You have returned from {module}. Nobody noticed you were gone, which is a compliment.'
    ],
    moduleEnter: [
      'Now entering {module}. Please keep your expectations inside the vehicle.',
      '{module} has been told you are coming. It is trying to look busy.'
    ],
    moduleExit: [
      'You have left {module}. It will carry on without you, mostly out of habit.',
      'Exit recorded. {module} has been reminded that it is a valued part of nothing.'
    ],
    farewell: [
      'Goodbye, {player}. Your seat will be kept warm by a heated seat.',
      'Thank you for your time. We have no use for it, but we appreciate it.'
    ],
    achievement: [
      'A trophy has been issued. It is made of a feeling.',
      'Achievement unlocked. No door was behind it.'
    ],
    error404: [
      'Page not found. It was last seen near the third ficus.',
      'That does not exist. We checked twice, once out loud.'
    ],
    tip: [
      'Tip: every button is a button. This has been true since the beginning.',
      'Tip: Meh is not a currency you can spend wisely. Try anyway.'
    ],
    lockedTease: [
      '{module} is locked. It is not hiding. It is simply unavailable in a dramatic way.',
      'Behind this door: something. Probably. The door has not been consulted.'
    ],
    ticker: [
      'BREAKING: Local employee does nothing, does it well, receives no notice',
      'Third ficus reports record growth; first ficus declines to comment'
    ],
    fortune: [
      'You will soon find what you were not looking for. It will not be useful.',
      'A great opportunity approaches. It is walking. It is not in a hurry.'
    ],
    tosClause: [
      '7.1/2 The user agrees that the agreement agrees with the user.',
      '12(c) All Meh is held in trust by a trust that has not been told.'
    ],
    creditsLine: [
      'Directed by a meeting that could have been nothing',
      'Catering provided by Gerald, who is a potato'
    ],
    patchNote: [
      'Fixed a bug where nothing happened. Now it happens more reliably.',
      'Improved performance of things that were already fine.'
    ],
    loading: [
      'Loading the loading screen. Please stand by for standing by.',
      'Reticulating nothing. This will take about as long as it takes.'
    ],
    poster: [
      'SYNERGY: because "togetherness" was already taken',
      'TEAMWORK: Together Everyone Achieves Meh'
    ],
    plantStatus: [
      'Dennis (Plant) is thriving. Dennis (Plant) has not asked how you are.',
      'Dennis (Plant) leans toward the window. A decision has been made.'
    ],
    notice: [
      'NOTICE: the notice board is down for maintenance. This is the maintenance notice.',
      'REMINDER: Mandatory Fun begins at 3:00 PM and ends when it has been mandatory enough.'
    ],
    lobbyEvent: [
      'A clock on the wall strikes a time it believes to be correct.',
      'Somewhere in the building, a printer completes a job nobody sent.'
    ]
  };
})();
