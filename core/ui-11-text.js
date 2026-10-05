/* POINTLESS ui 11: built-in copy for the Lobby.
 * LB.builtin   - fallback pools for registry categories (only added to P.lines when a content pack left a category thin).
 * LB.text      - Lobby chrome lines (screen greetings, easter eggs, purchase refusals ...), used with shuffle bags.
 * Everything the Lobby SHOWS comes from the registry first (content packs plug in); these keep nothing ever empty. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const LB = P.ui.L;

  LB.builtin = {
    greeting: [
      'Welcome back, {player}. Your absence was noted, filed, and politely ignored.',
      'Good news, {player}: nothing has happened since you left.',
      'Ah, {player}. The lobby is open, as it has been, and will be, in a general way.',
      'Welcome. Please remain seated at your desk, which is the whole world.',
      'Hello, {player}. Today\'s productivity target is "present". You are ahead of schedule.',
      'It is {player}. Management had a feeling someone would show up. It was a good feeling.'
    ],
    idle: [
      'Management is not watching. Management is simply facing in your direction.',
      'Per my previous silence: take your time. There is no time to take.',
      'Still here? Wonderful. Management has no notes, only a general warmth.',
      'The Lobby hums. It has hummed since it was built. Nobody has asked it to stop.',
      'If you are waiting for something to happen, it already has, quietly, off to the left.',
      'A reminder that you are valued. The amount is not specified, but it is non-zero. Possibly.'
    ],
    ticker: [
      'BREAKING: Employee does nothing for eleventh consecutive minute; Management "cautiously delighted"',
      'Third ficus reports record growth; first ficus declines to comment',
      'Weather: Indoors. Expect ceilings.',
      'Sports: Office chairs lose to gravity again, in straight sets',
      'Finance: Meh holds steady at Meh; analysts describe the situation as "situated"',
      'Local stapler files grievance over "unreasonable staples"; hearing set for Tuesday',
      'Traffic: the hallway is clear, and has been, for reasons nobody has examined',
      'Missing Sock sighted in Accounts; Accounts denies everything, correctly',
      'Elevator reaches floor 7 1/2, reports "it was there all along"',
      'Printer completes job nobody sent; job described as "heartfelt"',
      'Breakroom microwave beeps 3 times; fourth beep postponed pending review',
      'Sandra from Compliance issues statement. Statement flagged by Sandra.'
    ],
    poster: [
      'SYNERGY: because "togetherness" was already taken',
      'PERSEVERANCE: an elevator stuck between floors is still technically in the building',
      'INITIATIVE: someone else will do it, and eventually that someone is you',
      'ALIGNMENT: all arrows point the same way, mostly toward lunch',
      'EXCELLENCE: 7 1/2 out of 10 customers surveyed would not be surprised',
      'LEADERSHIP: walk in front, but not too far, and glance back often',
      'TEAMWORK: Together Everyone Achieves Meh',
      'INTEGRITY: doing the right thing, on a laminated card, in a drawer',
      'FOCUS: a single dot, carefully selected from many dots'
    ],
    notice: [
      'REMINDER: Mandatory Fun begins at 3:00 PM and ends when it has been mandatory enough.',
      'The suggestion box has listened. It has no comment, which is a comment.',
      'Lost: one sock. If found, do not approach. Say "we understand" and walk backward.',
      'Dennis (Plant) will water himself on Thursday. Please do not help.',
      'Floor 7 1/2 is closed for being a rumor.',
      'Cake in the breakroom (it is a picture of cake). Please enjoy responsibly.',
      'The printer has been told to calm down. The printer disagrees.',
      'Staff photos Friday. The ficus will be in front. It has earned it.',
      'NOTICE: this notice is a notice about notices. Further notices to follow.'
    ],
    plantStatus: [
      'Dennis (Plant) is thriving. Dennis (Plant) has not asked how you are.',
      'Dennis (Plant) leans toward the window. A decision has been made.',
      'Dennis (Plant) has been promoted. Dennis did not attend the ceremony because Dennis is a plant.',
      'Dennis (Plant) photosynthesizes at you, but with restraint.',
      'Dennis (Plant) has a new leaf. He says it is "not a big deal". It is.',
      'Dennis (Plant) is the only competent employee in the building. He knows.',
      'Dennis (Plant) rustles. There is no wind. It was a comment.',
      'Dennis (Plant) has been in this lobby for 11 years and has opinions about 9 of them.'
    ],
    fortune: [
      'You will soon find what you were not looking for. It will not be useful.',
      'A great opportunity approaches. It is walking. It is not in a hurry.',
      'Someone is thinking about you. They are a stapler, but it counts.',
      'Today is a good day to circle back to a place you never visited.',
      'Your lucky number is 7 1/2. Your lucky shape is the rest of it.',
      'You will receive good news on Tuesday. Tuesday is not coming. Plan accordingly.',
      'A small decision will have no consequences. Make it with confidence.',
      'The answer you seek is in the third ficus. The question is also in the third ficus.',
      'Fortune favors the prepared, or the very early, or Gerald.',
      'You will be invited to a meeting about you. You will not be there. It will go well.'
    ],
    lobbyEvent: [
      'A clock on the wall strikes a time it believes to be correct.',
      'Somewhere in the building, a printer completes a job nobody sent.',
      'The elevator opens on nothing, then closes politely.',
      'A distant phone rings 7 1/2 times and decides not to be answered.',
      'Dennis (Plant) rotates a leaf toward you. You are being considered.',
      'A memo drifts across the lobby and lands face-down, as memos do.',
      'The vending machine dispenses a snack nobody ordered. It is called Opportunity.',
      'A door you have never seen is briefly open. It closes with a sound like "later".'
    ],
    tip: [
      'Tip: every button is a button. This has been true since the beginning.',
      'Tip: press B if someone walks past. Someone will walk past.',
      'Tip: Meh is not a currency you can spend wisely. Try anyway.',
      'Tip: press / to search. Searching is a form of hope.',
      'Tip: Surprise Me picks a department for you. You will be surprised, per policy.',
      'Tip: clicking the clock does not fix the clock. Clicking is still encouraged.',
      'Tip: the Terms of Service are long and the Accept button is shy. These facts are related.',
      'Tip: the Trophy Cabinet is never full and never empty. This is called balance.'
    ],
    lockedTease: [
      '{module} is behind a door. The door is polite but firm.',
      'Behind this door: something. Probably. The door has not been consulted.',
      '{module} is locked, not hiding. There is a difference, and a form.',
      'Access to {module} requires Meh and a feeling of readiness (Meh only, in practice).',
      '{module} is available to those who have paid the nothing it costs.',
      'The lock on {module} is decorative. It is also real. It has been both since Tuesday.'
    ],
    error404: [
      'Page not found. It was last seen near the third ficus.',
      'That does not exist. We checked twice, once out loud.',
      'No results. The results have been asked to come back later.',
      'Nothing matches. This is the most accurate search result the lobby has ever produced.',
      'We looked everywhere, then somewhere, then the other place. Nothing.'
    ],
    farewell: [
      'Goodbye, {player}. Your seat will be kept warm by a heated seat.',
      'Thank you for your time. We have no use for it, but we appreciate it.',
      'You are leaving. The lobby will carry on, mostly out of habit.',
      'Clocking out. Your 0 hours have been logged with great care.',
      'See you soon. "Soon" is a unit of time here, roughly 7 1/2 minutes.'
    ],
    loading: [
      'Loading the loading screen. Please stand by for standing by.',
      'Reticulating nothing. This will take about as long as it takes.',
      'Consulting the committee of one. The committee is thinking about lunch.',
      'Warming up the surprise. It should be at room temperature.',
      'Sandra is reviewing your fun. Please hold.',
      'Shuffling the departments. They are already shuffled. Shuffling the shuffle.'
    ],
    creditsLine: [
      'Directed by a meeting that could have been nothing',
      'Catering provided by Gerald, who is a potato',
      'Safety supervision by Sandra from Compliance (remotely, from a different building)',
      'Sound design by a stapler, in a minor key',
      'Additional footnotes by the footnote department of one',
      'Quality assurance by the third ficus',
      'Floor 7 1/2 provided by a rumor',
      'No Meh was harmed in the making of this Meh'
    ],
    patchNote: [
      'Fixed a bug where nothing happened. Now it happens more reliably.',
      'Improved performance of things that were already fine.',
      'Replaced a sad button with a happier button. It is the same button.',
      'Dennis (Plant) now appears in fewer places. He has been informed.',
      'Tuesday has been postponed. It is still coming.',
      'Corrected the spelling of "Meh". It was already correct. It is now correcter.',
      'Added 0 new features and removed 0 old features. Net change: a feeling.',
      'Fixed an issue where the clock was right. This was reported by the clock.',
      'The Missing Sock remains missing. "Missing" has been updated to "travelling".',
      'Reduced loading times by loading less. We are very proud.'
    ]
  };

  /* Add built-ins to the registry for any category a content pack left thin. Called at Lobby mount (after all content loaded). */
  LB.ensureLines = function (min) {
    min = min || 6;
    Object.keys(LB.builtin).forEach(function (cat) {
      const have = (P.lines[cat] || []).length;
      if (have < min) P.addLines(cat, LB.builtin[cat]);
    });
  };

  LB.text = {
    subtitles: [
      'Intranet Portal v7 1/2',
      'Now With More Nothing',
      'A Division of Itself',
      'Your Meh Matters (To Us, Specifically)',
      'Mandatory Fun, Voluntarily Provided',
      'Please Do Not Feed The Metrics',
      'Synergy, But Smaller',
      'Established Tuesday',
      'The Lobby Will Be With You Shortly',
      'Proudly Accountable To A Committee Of One',
      'Open Every Day Except The Ones We Forgot',
      'Please Wipe Your Expectations',
      'Home Of The 7 1/2 Hour Work Day',
      'Terms And Conditions Apply To Terms'
    ],
    screenOpen: {
      shop: ['Welcome to the Gift Shop of Nothing. Everything is exactly as useful as it looks.', 'The Gift Shop is open. It has been open since before the building. Please mind the nothing.'],
      trophies: ['The Trophy Cabinet. Every trophy was won fairly, for reasons that were also fair.', 'Please do not tap the glass. The trophies have been through enough.'],
      stats: ['Statistics Nobody Asked For, compiled for you with care and a pencil.', 'These numbers are accurate. Their relevance has not been audited.'],
      settings: ['Settings. Some of these do something. Management will not say which, because suspense is also a setting.', 'Welcome to Settings (Decorative). The word in brackets is doing a lot of work.'],
      ascend: ['Ascension is available. You will arrive in the same place, only humming.', 'Ascending: a way to go up without going anywhere. Highly recommended by people who have ascended.'],
      tos: ['The Terms of Service. We have read them. Not all of them. Some of them read us.', 'Please scroll responsibly. The Accept button is somewhere at the end, and it has feelings.'],
      credits: ['Roll the credits. They are longer than the game, as per the contract.', 'Everyone who contributed is listed. Some of them contributed by being listed.'],
      patchnotes: ['Patch Notes. Every change has been made carefully, and some have been noticed.', 'Here is what changed. Not much did. We changed it thoroughly.'],
      about: ['The Employee Handbook. It is short because the job is.', 'Welcome to the handbook. Page 1 is page 7 1/2. Please begin there.'],
      diagnostics: ['Diagnostics. If this list is empty, Management is suspicious. If it is not, Management is worried.', 'The maintenance closet is open. Please do not touch the wires, which are just labels.'],
      savetools: ['Save tools. Your progress is a small piece of text, and it is yours to carry.', 'Export, import, or erase everything. Each is a form of closure.'],
      farewell: ['Clocking out is a big step. Please make it a small one.']
    },
    shopPoor: [
      'You are short by {count} Meh for {item}. The cashier has gone to see about it.',
      '{item} costs {count} Meh more than you have. Management respects the gap.',
      'Insufficient Meh for {item}. The till made a sound like a polite cough.',
      'Not yet. {item} will wait for you. It has nowhere else to be.',
      'The register shows {count} Meh missing. It was last seen near your pocket.'
    ],
    unlockPoor: [
      'You are short by {count} Meh. The door has noticed, and is being gracious.',
      'Not enough Meh. {count} more and the door will consider considering.',
      'Locked. The lock asks that you return with {count} more Meh and a better attitude.'
    ],
    unlockOk: [
      '{module} has been unlocked. The door was open the whole time. It says it needed the money.',
      'Access granted to {module}. A small ceremony took place without you.',
      '{module} is yours to enter. Please wipe your expectations at the door.'
    ],
    surprise: [
      'Selecting a department at random. The random is very official.',
      'Surprise incoming. Management has no idea either, which is the surprise.',
      'Consulting the surprise. It prefers not to be consulted.'
    ],
    surpriseNone: [
      'Nothing is unlocked to be surprised by. Unlock something and try again. That is the surprise.',
      'No departments are open. Surprise: it is the lobby, again.'
    ],
    logoMilestones: {
      3: 'You have clicked the logo 3 times. The logo has noticed and is trying to look natural.',
      5: 'Five clicks. The logo is not a button. It is, however, a good sport.',
      7: 'Seven clicks. A 7 1/2th is traditionally not requested.',
      10: 'Ten clicks. The logo has been promoted to Brand. Brands do not have to be clicked, but are.'
    },
    mehMilestones: {
      3: 'Your Meh is not a button. It is a number, and numbers are sensitive.',
      7: 'Seven clicks on the Meh. It has not gone up. It has gone inward.'
    },
    plantMilestones: {
      5: 'Dennis (Plant) has been poked five times. He has formed an opinion.',
      10: 'Ten pokes. Dennis (Plant) is not impressed. Dennis has never been impressed.',
      25: 'Twenty-five pokes. A leaf has been quietly filed under "Incidents".',
      50: 'Fifty pokes. Dennis (Plant) has produced a flower. It is out of spite. It is beautiful.'
    },
    clockLines: [
      'The clock now reads a different wrong time. It says it has never been more certain.',
      'You adjusted the clock. The clock has adjusted you back, by 7 1/2 minutes.',
      'The clock is correct somewhere. That somewhere has been notified.',
      'The clock says it is always 4:17. It is not wrong. It is committed.',
      'The clock requests that you stop checking it. It will tell you when.',
      'The wall clock chimes 13 times. Nobody in the building has the energy to correct it.',
      'You have fixed the clock. It has been broken again, professionally.'
    ],
    mehClickLines: ['A reminder that the Meh counter is a counter, not a button.'],
    konami: [
      'BONUS MODE ACTIVATED. There is no bonus. The mode is the bonus. Enjoy the mode.',
      'Cheat code accepted. You have cheated at nothing, and won it.'
    ],
    potato: [
      'Gerald (Vice President of Spuds) has entered the lobby. Gerald has not left the shelf. Gerald is everywhere.',
      'You said the word. Gerald heard. Gerald is a potato, and has the gravitas of several.'
    ],
    bossBack: [
      'Welcome back. Management did not see anything. Management has excellent peripheral vision.',
      'The spreadsheet has been closed. It will carry on without you. It has done so before.',
      'That looked productive. Please continue to look that way, but at the lobby.'
    ],
    bossIn: [
      'Quick, look busy. Management is doing so already.'
    ],
    fortuneOut: ['Your fortune is printing. It is going to be correct, eventually.', 'The dispenser considers your question. The dispenser has a slip for that.'],
    settingsName: [
      'Name updated. Management will use it, with the warmth of someone reading it off a card.',
      'You are now {player}. Everyone has been told, in a single confusing memo.',
      '{player}. A good name. It is on the list of names that are good.'
    ],
    welcomeSkip: [
      'Orientation skipped. Skipping orientation is also orientation. You have passed.',
      'Welcome, {player}. You may begin at any time, and also at no time.'
    ],
    corruptNotice: 'Your save file could not be read. It has been placed in a drawer, and a fresh one has been issued. Management regrets nothing, but is thinking about it.',
    saveFailNotice: 'The last save did not reach the disk: browser storage is full or has been blocked. Your progress is safe in this tab only. Management suggests Settings > Save tools > Export, which is a way of carrying it out by hand.',
  memoryNotice: 'Saving is unavailable in this browser. Your progress lives in this tab and will leave with it. Please say goodbye to it nicely.'
  };
})();
