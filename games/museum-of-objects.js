/* POINTLESS module: museum-of-objects */
(function () {
  'use strict';
  const P = window.POINTLESS;
  const ID = 'museum-of-objects';
  const k = (s) => 'm-museum-of-objects-' + s;
  const COLIN = '\u{1F574}️', PENCIL = '✏️';
  /* ================================ WORLD DATA ================================ */
  const WINGS = {
    A: { name: 'Wing A: Office Antiquity', start: [5, 5], dennis: [0, 6],
      plinths: { '01': [5, 3], '02': [2, 2], '03': [8, 2] },
      doors: [{ x: 10, y: 3, to: 'B', sign: 'WING B' }, { x: 0, y: 3, to: 'H', painted: true, sign: '(a door)' }, { x: 9, y: 6, to: 'SHOP', sign: 'EXIT', gated: true }] },
    B: { name: 'Wing B: Domestic Mysteries', start: [1, 3],
      plinths: { '04': [3, 2], '05': [5, 2], '06': [7, 2], '07': [5, 4] },
      doors: [{ x: 0, y: 3, to: 'A', sign: 'WING A' }, { x: 10, y: 3, to: 'C', sign: 'WING C' }] },
    C: { name: 'Wing C: Hall of Left Things', start: [1, 3], guard: [[1, 5], [9, 5], [9, 6], [1, 6]],
      plinths: { '08': [2, 2], '09': [4, 4], '10': [6, 2], '11': [8, 4], '12': [9, 2] },
      doors: [{ x: 0, y: 3, to: 'B', sign: 'WING B' }, { x: 5, y: 0, to: 'STAFF', sign: 'STAFF ONLY', gated: true }] },
    H: { name: 'Wing 7.5: Objects That Almost Happened', start: [5, 5],
      plinths: { '7.5a': [3, 2], '7.5b': [5, 3], '7.5c': [7, 2] },
      doors: [{ x: 5, y: 6, to: 'A', sign: '(back)' }] }
  };
  const TINT = { A: 'transparent', B: 'rgba(255,170,90,.16)', C: 'rgba(90,140,210,.16)', H: 'rgba(190,150,230,.24)' };
  const SELF_POS = { '58': [9, 4], '59': [7, 4], '60': [3, 4] };
  const LOC = { A: 'in the next wing', B: 'in the wing after that', C: 'in a wing we are not at liberty to name', H: 'in the Gift Shop' };
  const CODES12 = ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'];
  const INKS = ['#b3262e', '#1f4e79', '#2d6a4f'];
  const SCHED = [3, 2, 1, 0.5, 0.25, 0.1, 0];
  const EX = {
    '01': { e: '\u{1F4CE}', S: 'the Paperclip', v: "a paperclip's quiet legal opinion",
      t: ['Exhibit 01: Paperclip. Steel, 32 mm, c. Tuesday. On loan from a drawer.', 'a bent promise', 'a small sculpture of the concept of holding', 'It is a paperclip.'],
      track: ['Exhibit 01: Paperclip, steel, 32 millimetres. Please stand where it can see you.', 'Note the bend. The bend is the entire argument.', 'It holds two sheets together without once asking either how they feel.', 'Some say the paperclip is a small wire thinking. We say it is a small wire.', 'We have learned nothing and are better for it.'],
      wander: 'The paperclip does not follow you. It has held worse departures.', reprise: 'Paperclip (Reprise): a paperclip that remembers you.' },
    '02': { e: '\u{1F9E4}', S: 'the Left Glove', v: 'the grief of a glove',
      t: ['Exhibit 02: Left Glove. Wool, bereaved, c. Tuesday. Its right is in the next wing.', 'the shape of an absence with a thumb', 'a small sculpture of the concept of almost', 'It is a glove. The left one.'],
      track: ['Exhibit 02: Left Glove, wool, bereaved. Please walk slowly. It can hear.', 'Its right glove is %loc%.', 'The thumb points toward a hand that is not here. Scholars call this Longing. The cleaners call it Tuesday.', 'It has never given a thumbs up. It is not that kind of thumb.'],
      wander: 'The glove watches you go. It has had practice.', reprise: 'Left Glove (Reprise): a left glove and, technically, two.' },
    '03': { e: '', S: 'the empty plinth called Tuesday', v: "Tuesday's reluctance to attend",
      t: ['Exhibit 03: Tuesday. On loan to itself. c. Tuesday.', 'on loan to a Wednesday', 'on loan to a smaller Tuesday', 'It is an empty plinth.'],
      track: ['Exhibit 03: Tuesday. Currently on loan to itself. Please enjoy the empty plinth responsibly.', 'The plinth is slightly warm. This is where Tuesday was last felt. Do not lean.', 'Tuesday has been rescheduled for Tuesday.'],
      wander: 'You have left Tuesday. Tuesday does not mind. Tuesday is not here to mind.', reprise: 'Tuesday (Reprise): back soon.' },
    '04': { e: '\u{1F37D}️', S: 'the Plate of the Last Biscuit', v: "a biscuit's unfinished business",
      t: ["Exhibit 04: The Last Biscuit's Plate. Ceramic, c. Tuesday. The biscuit declined to be loaned.", 'a plate that has witnessed a decision', 'a small sculpture of the concept of nearly offering', 'It is a plate.'],
      track: ['Exhibit 04: the plate of the Last Biscuit. The biscuit is not present. The biscuit was the point.', 'Three people said, you have it, and meant it for nine minutes.', 'Then someone had it. We will not name the someone. The plate remembers a hand.', 'Do not ask who. The plate has already declined.'],
      wander: 'The plate has been left holding nothing. It is used to this.', reprise: 'Plate of the Last Biscuit (Reprise): a second last biscuit, unconfirmed.' },
    '05': { e: '\u{1F511}', S: 'the Key to Nothing', v: "a key's confidence in a door that is not there",
      t: ['Exhibit 05: Key to Nothing. Brass, c. Tuesday. Fits one door. Door unavailable for comment.', 'a confident shape looking for a question', 'a small sculpture of the concept of almost opening', 'It is a key.'],
      track: ['Exhibit 05: a key. To what? The museum has asked. The door declined to comment.', 'We have tried it in everything. It remains optimistic.', 'It has the shape of an answer. We are keeping the question out of the building.'],
      wander: 'The key was about to open something. It will keep that to itself.', reprise: 'Key to Nothing (Reprise): key to something. Nothing has been informed.' },
    '06': { e: '\u{1F944}', S: 'the Spoon', v: "a spoon's small, shallow ambition",
      t: ['Exhibit 06: Spoon. Steel, slightly damp, c. Tuesday. The dampness is original.', 'a shallow ambition, politely held', 'a small sculpture of the concept of almost enough', 'It is a spoon.'],
      track: ['Exhibit 06: Spoon, slightly damp. Conservators have been asked to leave the dampness alone.', 'It has held soup, cereal and, once, a decision.', 'It is shaped like a small bowl, in case of emergencies. There has not been an emergency. It stays ready.'],
      wander: 'The spoon has not been left. It was never held. This is fine.', reprise: 'Spoon (Reprise): a damp spoon, nearly bought, now owned by no one.' },
    '07': { e: '\u{1F9E6}', S: 'the Missing Sock', v: 'a sock on a journey nobody authorised',
      t: ['Exhibit 07: Sock, Left, Missing (On a Journey). Cotton, c. Tuesday. The case is empty on purpose.', 'a journey with the feet taken out', 'a small sculpture of the concept of elsewhere', 'It is an empty case.'],
      track: ['Exhibit 07: Sock, Left, Missing. On a journey. Please do not ask where. It has been asked.', 'We have received four postcards. All say weather fine.', 'The case is empty on purpose. This is merely its permanent address.', 'It does not know it is missing. Please do not tell it.'],
      wander: 'The sock is not here. This is the one exhibit you cannot walk away from.', reprise: 'Sock, Left, Missing (Reprise): back, and also still missing.' },
    '08': { e: '\u{1F9FE}', S: 'the Receipt for Yesterday', v: 'yesterday, itemised',
      t: ['Exhibit 08: Receipt for Yesterday. Thermal paper, c. Tuesday. Illegible. We are told this is the point.', 'proof of a day that has been spent', 'a small sculpture of the concept of refund', 'It is a receipt.'],
      track: ['Exhibit 08: Receipt for Yesterday. Thermal paper. The ink has gone, as ink does, and as yesterday did.', 'It records a purchase of one day. The day was used. No refunds on days.', 'Visitors have asked for a manager. The manager is yesterday.'],
      wander: 'The receipt has already faded. You are the second thing to leave it.', reprise: 'Receipt for Yesterday (Reprise): receipt for today, issued in advance.' },
    '09': { e: '\u{1F4BA}', S: 'the Chair That Waited', v: "a chair's patience, weaponised",
      t: ['Exhibit 09: Chair That Waited. Plastic, c. Tuesday. Please do not sit. It has been through enough.', 'a four-legged patience', 'a small sculpture of the concept of expecting', 'It is a chair.'],
      track: ['Exhibit 09: Chair That Waited. It is still waiting. It has been told it can stop.', 'It was placed in a corridor in 2011 for a meeting. The meeting moved.', 'It has the posture of someone who was told five minutes.', 'Please do not sit. The chair has finally relaxed and we do not wish to start it again.'],
      wander: 'The chair does not mind. The chair is used to being left.', reprise: 'Chair That Waited (Reprise): the chair has been told. It is waiting anyway.' },
    '10': { e: '\u{1F954}', S: 'the Bust of a Vice President', v: "a tuber's unearned authority",
      t: ['Exhibit 10: Bust of a Vice President. Tuber, unglazed, c. Tuesday.', 'authority, with eyes', 'a small sculpture of the concept of gravitas', 'It is a potato.'],
      gerald: 'Exhibit 10: Bust of a Vice President. On loan from V.P. Spuds, who sends regards and declines to be described.',
      track: ['Exhibit 10: Bust of a Vice President, tuber, unglazed. It has not spoken since its appointment.', 'It has gravitas and a faint smell of soil.', 'We are not able to describe it further. It would prefer we did not.'],
      geraldTrack: ['Exhibit 10: Bust of a Vice President. Please stand up straighter. We do not know why.', 'The Vice President has sent regards. The regards are, we believe, in the soil.', 'We are not able to describe him further. He would prefer we did not.'],
      wander: 'The Vice President watches you leave. He has watched worse.', reprise: 'Bust of a Vice President (Reprise): reappointed, unglazed.' },
    '11': { e: '\u{1F94F}', S: 'the Lid Without a Jar', v: "a lid's unresolved jar",
      t: ['Exhibit 11: Lid Without a Jar. Plastic, c. Tuesday. The jar is elsewhere, doing well.', 'a roof for a house that moved away', 'a small sculpture of the concept of fit', 'It is a lid.'],
      track: ['Exhibit 11: Lid Without a Jar. The jar is elsewhere, doing well.', 'It has been twisted onto nothing nine hundred times. It still turns.', 'We have a jar in storage. It is the wrong size. The lid knows.'],
      wander: 'The lid does not hold it against you. It holds nothing.', reprise: 'Lid Without a Jar (Reprise): a lid with a jar, in a different museum.' },
    '12': { e: '\u{1F5DC}️', S: 'the Stapler (Not Active)', v: "a stapler's pending grievance",
      t: ['Exhibit 12: Stapler (Not Active). Steel, c. Tuesday. On break, per the union.', 'a jaw with a grievance', 'a small sculpture of the concept of grievance procedure', 'It is a stapler.'],
      track: ['Exhibit 12: Stapler (Not Active). It would like it noted that the union is aware.', 'It has not stapled since a Thursday. It has not been asked why. It will not say.', 'The stapler is on a mandatory 7 and a half minute break. It has been on it since 1998.'],
      wander: 'The stapler has filed a note. The note is not attached to anything.', reprise: 'Stapler (Not Active) (Reprise): active, as a courtesy, for 7 and a half minutes.' },
    '7.5a': { e: '\u{1F6AA}', S: 'the Sound of a Drawer Closing Politely', v: 'a drawer closing politely', hush: true,
      t: ['Exhibit 7.5a: The Sound of a Drawer Closing Politely. Almost heard: 41 times.', 'an almost-sound, folded', 'a small sculpture of the concept of closure, nearly', 'It is a drawer, closing.'],
      track: ['Exhibit 7.5a: The Sound of a Drawer Closing Politely. Please remain silent so it can finish.', '(a drawer closes. It does so politely. It apologises to the cabinet.)', 'It has almost been heard 41 times. This is the 42nd. It is also almost.'],
      wander: 'The drawer did not finish. It is being polite about it.' },
    '7.5b': { e: '\u{1F944}', S: 'the Spoon You Nearly Bought', v: 'the spoon you nearly bought', hush: true,
      t: ['Exhibit 7.5b: The Spoon You Nearly Bought, on a Tuesday. Almost: 3.', 'a spoon with a receipt that did not happen', 'a small sculpture of the concept of nearly', 'It is a spoon, nearly.'],
      track: ['Exhibit 7.5b: The Spoon You Nearly Bought, on a Tuesday. Almost: 3.', 'It was very nearly in your hand.', 'It was a good spoon. It is a better one now, because it is nearly.'],
      wander: 'The spoon almost watched you go.' },
    '7.5c': { e: '\u{1F511}', S: 'the Key to the Door You Did Not Open', v: 'the key to the door you did not open', hush: true,
      t: ['Exhibit 7.5c: The Key to the Door You Did Not Open. Almost: 1.', "the door's other opinion", 'a small sculpture of the concept of later', 'It is a key. The door is a different matter.'],
      track: ['Exhibit 7.5c: The Key to the Door You Did Not Open. Almost: 1. It is the same 1.', 'It is on this plinth in case you change your mind.', 'You will not. It has made its peace.'],
      wander: 'The key was nearly useful. It will remain nearly.' },
    '58': { e: '\u{1F4B0}', S: 'your balance', v: 'a balance of unspent Meh',
      t: ['Exhibit 58: %meh% Meh (Unspent). Medium: Meh. Provenance: Lobby. Date: Tuesday (ongoing).', 'a pile with no pile', 'a small sculpture of the concept of later', 'It is a number.'],
      track: ['Exhibit 58. A balance, standing. It has been saved for something. It does not know what.', 'Please do not spend it. It has become attached.'], wander: 'The balance wishes you well. It will be here.' },
    '59': { e: '\u{1F3F7}️', S: 'your name placard', v: 'a name tag, attended',
      t: ['Exhibit 59: {player}. Medium: Valued. Date: Tuesday (ongoing).', 'a name in a frame', 'a small sculpture of the concept of being called', 'It is your name.'],
      track: ['Exhibit 59: a name, {player}, attended. It is held in place by a very small screw.', 'It has been said often. It has been said correctly once, by a plant.'], wander: 'The name stays. Names do.' },
    '60': { e: '\u{1F5B1}️', S: 'your last click', v: 'a click, historic',
      t: ['Exhibit 60: Your Last Click, %ago% seconds ago. Medium: attention.', 'a small decision, preserved', 'a small sculpture of the concept of pressing', 'It is a click.'],
      track: ['Exhibit 60: a click. The museum has framed it.', 'It was, by every measure, adequate.'], wander: 'The click was only ever a moment. The frame is not.' }
  };
  /* ================================ LINES ================================ */
  const L = {
    open1: 'You have entered the Museum. This is already Exhibit 1.',
    open2: 'Welcome to the Museum of Everyday Objects. You are also, technically, an everyday object. Please keep moving.',
    open3: 'Exhibit 01 is two tiles ahead. Click it. It has been waiting since 1987 and has no other plans.',
    lblFirst: 'Visitors may click the floor to walk, click an exhibit to be told about it, and stand still to be told more. Arrow keys are also accepted. (Sandra, Compliance)',
    openKeypad: 'You may now type a track number. The guide will describe it to whatever is in front of you. This is not a bug. It is a tour.',
    openBattery: 'Audio Guide battery at 3 percent. The Audio Guide battery has never been at more than 3 percent.',
    openPlayer: 'Welcome, {player}. Your visit has been logged as ongoing.',
    nudge: ['Please begin. The exhibits are not going anywhere. That is their whole thing.', 'You have not touched anything. This is the correct amount. It is also suspicious.', 'The handset is a small, patient telephone to nobody. Please press Play before it starts taking messages.', 'Visitors are encouraged to approach an exhibit. Visitors are also encouraged to approach a different exhibit.',
      'Exhibit 01 is still two tiles ahead. It has not moved. It has not complained either, which is how you know it is a paperclip.', 'You have been standing in the Entrance for some time. The Entrance has accepted this. It is a very accepting space.',
      'The handset has ten digits and you have used none. They have started a small waiting list.', 'The museum is not rushing you. The museum has no way of rushing. It has a clock, and the clock is committed.'],
    wander: ['You have wandered mid-sentence. The sentence was about to say something. It will not now.', 'The guide stops. The guide does not need an audience. The guide would like one.', 'Please do not walk during a track. The track is not a corridor.', 'You have left. The exhibit has noted the time. The time is Tuesday.', 'Interrupted. The remaining sentences have been placed in storage with the others.', 'You moved. This has been recorded as a position.',
      'The track was a small boat. You have left it in the water.', 'You walked away mid-sentence. The sentence had been thinking about you all morning.', 'The guide has seen visitors leave before. The guide has never gotten used to it and has never missed one.', 'A step has been taken. The tour regrets this on your behalf.'],
    partial: ['You heard %pct% percent of %S%. The remaining %rest% percent has been placed in storage.', 'You heard %pct% percent of %S%. The museum has taken the other %rest% into care.',
      'You heard %pct% percent of %S%. The rest is in Storage, filed under how much you will not miss it.', 'You heard %pct% percent of %S%. The remaining %rest% has been taken to a back room and given a blanket.'],
    partialLow: 'You heard %pct% percent of %S%. This is the shortest tour on record.',
    partialAll: 'You heard all of %S%. It was a close one.',
    stamp: ['Track complete. You have heard it. The exhibit has been heard to.', 'Stamp issued. Passport: %n% of 12. The remaining boxes are waiting, politely.', 'Passport: %n% of 12. Each stamp is a small yes.', 'Complete. The exhibit feels attended. It will not say so.'],
    clause: 'Passport valid until the passport is. (Sandra, Compliance)',
    rare: ['I must say, as my track ends: oat milk, a feeling of closure, 12 paperclips. I am sorry. That is my list.', 'Forgive me, one more thing: a lightbulb, a stamp for the stamp, and to be a better guide. Only one of these is in the shop.',
      'Apologies. That was my shopping list. Item 4 is my mother, who is a cassette, in a drawer, in Leeds.'],
    prev: ['(Recorded by a previous visitor, left on the tape.) It is a lot of paperclip. I will say that and nothing else.', '(Recorded by a previous visitor.) I was here on a Tuesday. It was this Tuesday. It is still going.', 'I was told there would be a point. I have been looking at it for forty minutes. It is, I think, a very good bend.',
      'Sorry, is this on? Is it the little red light? I am here with the glove. The glove is not well.', 'If you are hearing this, I am no longer in the museum. I am in the shop, buying a postcard of this.', 'Please remember me as someone who was kind to the plinth.'],
    prevEnd: 'The museum has no record of a previous visitor. The tape is, on inspection, new.',
    swap: ' have swapped places. Nobody saw. The plinths have not forgiven it.', swapBack: 'The exhibits have returned to themselves. They are being very normal about it. It is unconvincing.',
    openers: ['Observe, before you, %S%, which experts agree is basically %V%', 'Here we see %S% in its natural habitat of being mistaken for %V%', 'With respect to %S%, which has been described to us as %V%',
      'You have asked for %V% while standing at %S%. The guide will describe one to the other. Neither has consented', 'Scholars of %S% have long suspected it of being %V%', 'Note how %S% holds itself, like %V%',
      'What %S% lacks in wording it makes up for in %V%', 'Many visitors mistake %S% for %V%. Many visitors are correct',
      'The wall text for %S% has been replaced, at its own request, with a description of %V%', 'It is widely agreed that %S% is the last known sighting of %V%', 'Please do not confuse %S% with %V%. The museum has confused them twice and apologised to both',
      'Between %S% and %V% there is a gap the museum calls Tuesday', 'Experts disagree on whether %S% is %V%. The experts have been asked to disagree more quietly', 'Few know that %S% was first commissioned as %V%'],
    closings: ['That, in short, is Thursday.', 'Sandra has been informed.', 'The plinth declined to comment.', 'We recommend a small sit-down.', 'This has been peer reviewed by a drawer.',
      'The glass has seen worse and said nothing.', 'We note this and move along. Not away. Along.', 'The curators wept, briefly, on a schedule.', 'It is on page 4 of a catalogue nobody has.',
      'The footnote is longer than the exhibit and has been moved to the gift shop.', 'A second opinion was sought from a coat hook. The coat hook agreed, with reservations.', 'The committee voted 6 to 0 with 2 abstaining, which is unusual for a committee of 5.',
      'This interpretation was withdrawn on Monday and has been very brave about it.', 'Please direct complaints to the plinth. The plinth has a form. The form is the plinth.', 'Nobody in the building is qualified to say this, which is why it is on the wall.',
      'A bench has been placed nearby for anyone who needs to feel something sitting down.', 'Historians date this view to 4:17, as they date everything.'],
    overrides: {
      '01>02': 'You have requested Track 02 while standing at Exhibit 01. The guide will describe a glove to a paperclip. The paperclip has not consented.',
      '02>01': "You have requested Track 01 while standing at Exhibit 02. Observe the glove's elegant ability to hold two pages together. It has not been asked to. It does it anyway.",
      '01>12': 'Here we see the paperclip in its natural habitat of one stapler. It is a lot to ask of a stapler.',
      '12>03': 'The stapler, on its break, has been asked to describe Tuesday. It has described a gap.',
      '10>09': "Please admire the Vice President's chair. It is waiting for him. He has been seated for 31 years. They have not discussed it.",
      '07>02': 'The sock describes the glove. They are on separate journeys. Neither knows the other\'s route.',
      '05>11': 'The key and the lid have been introduced. Each is the answer to a question the other is not asking.',
      '04>06': 'The spoon and the plate of the last biscuit have been placed together. They are both pleased. Neither will say what for.',
      '08>09': 'The receipt for yesterday, described to a chair. The chair has waited since the purchase. They are the same age.',
      '03>01': 'Tuesday has been asked to describe a paperclip. It says it will get back to us. It has not said which Tuesday.',
      '09>10': 'The chair describes the Vice President. It says he sits well. It says this the way people do who are not allowed to say more.',
      '12>10': 'The stapler has been introduced to the Vice President. It has asked that the minutes reflect that it did not stand.',
      '06>04': 'The spoon is describing the plate of the last biscuit. It was not there. It is describing it with great confidence.',
      '11>05': 'The lid has been asked to describe the key. They have never met. The lid says it has heard the key is very open to things.',
      '08>03': 'The receipt for yesterday has been asked to describe Tuesday. It lists one item: Tuesday. Quantity: pending.',
      '10>12': 'The Vice President has been asked about the stapler. He says the stapler is a good man. The stapler has not been in touch.',
      '02>07': 'The glove describes the sock. They are both a kind of one of a pair. They have agreed not to bring it up.' },
    mgmtMismatch: 'Management notes that you requested a track while standing at a different exhibit. This will be filed under Interpretation.',
    invalid: ['Track %code% does not exist. Please enjoy it from where you are standing.', 'Track %code% is not in the catalogue. The catalogue has been informed.', 'There is no Track %code%. There is only the idea of Track %code%, and it is not available.',
      'Track %code% has been withdrawn for conservation. It was never in.', 'Track %code% is on loan to a different Track %code%.', 'That code belongs to an exhibit we hope to acquire. Please hold.',
      'The museum has no Track %code%. The museum has had this conversation before.', 'You have requested an absence. Absences are on Level 2.',
      'Track %code% is being restored. The restorers went in during 1993 and have no deadline, only a Tuesday.', 'Track %code% was lent to a smaller museum and returned with a note that said, Not for us.',
      'Track %code% is somewhere in the building. The building is not in the mood to say where.', 'Please do not type %code% at the guide. It makes the guide feel like a lock.', 'Track %code% has been mislaid between two other tracks. They are not speaking.'],
    sp100: 'Track 100 contains all the other tracks. It is four seconds long. It is silence. It is thorough.', sp1234: 'Track 1234 is what a person types when they do not know. The guide understands. The guide has typed it too.',
    sp31: 'Track 31 has been misfiled under 13, which has been misfiled under 12. The three are being very mature about it.', sp77: 'Track 77 is the museum\'s way of saying 14, but nicer.',
    sp417: 'Track 417: The Time. It is TUE 4:17. It was TUE 4:17 earlier. It will be TUE 4:17 for the rest of the day.', sp418: 'Track 418: The Minute After. This track has been withdrawn. Please do not type it again. Please type it again.',
    capB: ['A seventh digit would make this a telephone number, and the guide has sworn off those.', 'The keypad is full. It has been full since the sixth digit and has been very polite about it.', 'No more digits. Please enjoy the six you have.',
      'The keypad has declined your seventh digit. It will be placed in storage with the others.', 'You have a fully formed code. Please let it go. It wants to be played.'],
    sp00: 'Track 00 is reserved for Track 00. Track 00 has not been informed.', sp13: 'Track 13 does not exist out of respect for Track 12.',
    sp99: 'Track 99 is reserved for a visitor who is standing. Please be standing.', sp404: 'Track 404: The Absence of an Exhibit. Please enjoy it from where you are standing.',
    sp000: 'Track 000 has been found. It was not worth it.', sp000b: 'Exhibit 000. {player}. Medium: attendance. On loan from yourself.',
    sp666: 'Track 666 is a perfectly ordinary number. It has simply had a difficult press.', sp911: 'Track 911: This is not an emergency. This is an audio guide, which is the opposite.',
    sp999: 'Track 999 is not a track. It is a threat of one.', sp25: 'I am fine. I am in a coat. Do not look for me.',
    noKey: 'There is no such key. Please do not use the door.', cap: 'The keypad holds six digits. It has never needed a seventh.', noStand: 'Please walk to something. Anything. The guide has no one to describe it to.',
    gazeStart: 'You are looking. The exhibit has noticed and would like a moment.', gaze9: 'You have gazed for 9 seconds. The exhibit has begun to feel like a painting of itself.',
    gazeT2: 'Your gaze has been logged as Interpretation Tier 2.', gazeT3: 'Tier 3. The exhibit has become a small sculpture of the concept of itself.',
    gazeT4: 'Tier 4. We have returned to the plain label. We have learned nothing and are better for it.', withdrawn: 'Further Interpretation Withdrawn.',
    release: 'You looked away. %S% noticed. It has no eyes. It noticed.',
    sandra: ['(Sandra, Compliance: Yes.)', "(Sandra, Compliance: Placard text reduced by 40 percent. The remaining 60 percent is mostly the word 'per'.)", '(Sandra, Compliance: Please do not interpret above Tier 3 without Form 27B/6.)', '(Sandra, Compliance: Reviewed. Approved. Reversed. Approved.)',
      '(Sandra, Compliance: Interpretation is permitted. Meaning is under review.)', '(Sandra, Compliance: This placard has been read. Reading is a form of handling. Please see Colin.)',
      '(Sandra, Compliance: Tier 3 is a suggestion. Tier 4 is a misunderstanding. Tier 5 does not exist and has been approved.)', '(Sandra, Compliance: Noted. Not noted. Noted with reservations, which have been seated.)'],
    sandraYes: "Sandra from Compliance has flagged this placard for being too informative. It has been replaced with a placard that says 'Yes.'",
    geraldAwed: 'The guide lowers its voice. The guide stands up straighter. The guide does not know why.',
    guardArrive: 'Security Officer Colin has begun his patrol of Wing C. He has been patrolling it since before it existed.',
    guardNotice: 'Security Officer Colin has noticed you looking. He has noticed this before. He is processing.',
    guardMove: ['Please move along. Not away. Along. The distinction has a form.', 'Sir, madam, Valued Employee: you are now touching the idea of the exhibit. That is the more serious touching.', 'Colin has photographed you looking at the exhibit, for the safety of the exhibit. Please move along.',
      'You have been looking at it for some time. Looking, past a point, is a form of handling. Please move along.', 'Colin would like you to take three steps back, and then one more, for the sake of the three.', 'Colin has moved you 3 tiles. Colin regrets the number but not the moving.',
      'Colin has asked you to stop appreciating at that angle. The angle was approved for a different visitor.', 'You are now 3 tiles from where you were. Colin is 3 tiles from where he was. It is mutual.',
      'Colin would like it known that he does not enjoy this. Colin would also like a small plaque saying he does it well.'],
    guardDash: 'Colin is coming. Colin does not run. Colin is, technically, running.', guardFine: 'Fine: 0.2 Meh, for proximity.', guardPass: 'Colin has issued you a laminated Observation Pass. It permits you to observe. You were already doing that.',
    guardPointless: 'There is nothing to win by evading Colin. He would like that on the record. He would like a record.', guardNod: 'Colin nods at the Hall of Left Things. The Hall nods back.',
    spam1: 'Sir. Sir. The dome has been lifted. The exhibit has been replaced by a photograph of the exhibit.', spam2: 'The photograph has been replaced by a photograph of the photograph. Colin is on his lunch, which is also a photograph.',
    spam3: 'The photograph of the photograph has been replaced by a photograph of the photograph of the photograph. The museum is running out of photographs and has begun taking them of the gaps.',
    spamFine: 'Colin has fined you 0.5 Meh for handling. Handling is anything the exhibit felt.', spamTap: 'Your tapping has been logged as Interactive Programming. It is not on the schedule.',
    spamWarn: ['You have touched the exhibit 15 times in four seconds. The exhibit has begun to keep count out of loyalty.', 'Gentle reminder: the exhibits are not buttons. They are, however, pressed.', 'The glass is making a sound it has not made since the delivery. It is a very small sound. It is a plea.'],
    spamRestore: ['We regret the conservation. The original has been returned. It is a little different. It is the same.', 'The originals are back. One has been returned to the wrong plinth and is settling in.', 'The photographs have been put where the exhibits were. The exhibits have been put where the photographs were. We are almost sure.'],
    spamAgain: ['Colin has opened a file on you. The file is a photograph of a file.', 'Colin has seen you before. Colin recognises the clicking. Colin is, at this point, less a guard than a witness.', 'Incident report: a person touched things. Witnesses: the things.'],
    spamKpad: ['Please do not press Play like that. The handset is not a doorbell. It is a doorbell. Please stop.', 'The handset has asked to speak to the person responsible. The person responsible is also the handset.', 'The keypad has been pressed so quickly it has run out of numbers and started to hope.'],
    spamSigh: 'The Audio Guide sighs. The sigh is subtitled: (sigh).',
    floorSpam: ['The floor has been clicked 15 times. The floor is marble and has no opinion, but would like the clicking to be gentler.', 'The floor is not a button. The floor is what is under all the buttons.', 'Please do not tap the floor. It is a very old floor. It has been walked on since 1987 and has never once been asked.', 'Dennis (Plant) has noticed the tapping. Dennis (Plant) is pretending to photosynthesise.'],
    trailFreeze: 'The museum has frozen your footprints. Please admire the left turn you took near the third plinth.', trail2: 'Experts call it hesitation. We call it a donation.',
    trailSandra: 'Sandra from Compliance has flagged the trail as a trip hazard. It has been roped off. The rope is velvet. The velvet is a suggestion. The suggestion is enforced.',
    trailHint: 'Visitors are reminded that the floor behind you is now historical.',
    trailCat: 'The museum has added Exhibit %n%: Your Earlier Walk. The catalogue now stands at %total% exhibits. It was 12 a moment ago.',
    trailSandra2: 'Sandra from Compliance has flagged the trail as a trip hazard. It is now a rope.',
    meterNote: 'Museum completed: %pct% percent. Please note the museum has grown since you started reading this sentence.',
    meterCap: 'The museum has added your heard tracks as exhibits. The museum is now %pct% percent complete. It was always %pct%.', meterTip: 'Down 0.3% since you read this',
    wingB1: 'Domestic Mysteries. Everything here has been in a drawer, and the drawer has been in everything.', wingC1: 'The Hall of Left Things. Please do not make eye contact with the stapler. It is not active. It is aware.',
    wingAb: 'Office Antiquity. You have been here. It remembers the shape of you.', wingBb: 'Domestic Mysteries. Again. The drawers are the same drawers.', wingCb: 'The Hall of Left Things. Nothing has been collected since you left. That is what left means.',
    wingH1: 'Welcome to Wing 7 and a half. Here are objects that almost happened: the spoon you nearly bought, the key to the door you did not open.',
    shopArrive: 'Exit through the gift shop. Enter through the gift shop. We have only the one door and it is shaped like a till.',
    staffLocked: 'Staff Only. You are not staff. You are not not staff. We are checking.', staffOpen: 'The Staff Only door is slightly open. It was not before. It is not a trap. It is a door.',
    gloveA: 'The right glove is in the next wing.', gloveB: 'The right glove is in the wing after that.', gloveC: 'The right glove is in a wing we are not at liberty to name.', gloveH: 'The right glove is in the Gift Shop.',
    gloveShop: "The right glove is a postcard of a right glove in a rack the clerk says is 'currently on loan to the previous exhibit'.", gloveReprise: 'The right glove has been located. It is a left glove. We are now two.',
    dennis: ['That is not an exhibit. That is Dennis. Please do not describe Dennis.', 'Dennis has read the reviews of this audio guide.', 'Dennis would like it noted that he is thriving.', 'Dennis (Plant) has been promoted. Dennis (Plant) did not attend the ceremony because Dennis is a plant.',
      'Dennis is not an exhibit. Dennis is the reason the exhibits look well.', 'Dennis has been in this museum since it opened. He was a seed at the time and has never brought it up.', 'The audio guide has no track for Dennis. Dennis has not asked for one. Dennis is not that kind of plant.',
      'Dennis has been watered by Facilities, by Compliance and, once, by a visitor in 2009. He has opinions about the visitor.'],
    dennisKnown: 'Dennis (Plant) knows you. You were seen touching his cousin in the Lobby. He is being very professional about it.',
    shopRack: 'Postcard of the Paperclip, 3 Meh. Postcard of the Postcard of the Paperclip, 2 Meh. The closer it gets to nothing, the cheaper it is.', shopTill: 'We accept Meh and small acknowledgements of our work.',
    shopBuy1: 'Postcard of %S%. The museum thanks you for supporting the arts.', shopD2: 'You have purchased a postcard of the postcard. The postcard is pleased to be remembered.',
    shopD3: 'The clerk wraps your postcard of the postcard in a postcard of the wrapping.', shopD4: 'We have run out of room on the front. The back is also the front now.',
    shopD5: 'Postcard depth: 5. A quarter of a Meh. The original object is now a rumour of a rumour of a rumour.', shopD6: 'Postcard depth: 6. The postcard is now mostly postcard. We apologise to the original.',
    shopD7: 'Postcard depth: 7. The cheapest postcard is a postcard of nothing. It is free, but it comes with a postcard of the free postcard.',
    shopD8: 'The eighth postcard is a postcard of the shop. The shop is pleased to be remembered. The shop is also in it.', shopD9: 'We have a postcard of that. It is, appropriately, a postcard of this.',
    shopD9b: 'We are out of postcards. Would you like to see the postcard of that?', shopCrop: 'The remainder has been tastefully cropped.',
    shopUnheard: 'You have not heard that exhibit. You cannot send a postcard of a thing you have not heard. This is policy.', shopSeventh: 'The museum thanks you for supporting the arts. The arts, specifically, is a paperclip.',
    shopOwn: 'Postcard of the Shop, 0 Meh. Postcard of a Postcard of the Shop, 0 Meh. Postcard of a Postcard of a Postcard of the Shop is not stocked. It is the shop.',
    shopJam: 'The turnstile has been turned the wrong way. It is now a revolving door of apologies.', shopSign: 'BACK IN 8 SECONDS (SIGN DRAWN BY CLERK)', shopExit: 'EXIT (a postcard of an Exit)',
    shopGlove: 'The Right Glove, Reunited, Technically. It is the left glove. It is also fine.',
    halfAppear: 'A key has grown on the keypad. It looks like half of something. It is not for anything yet.', halfDoor: 'The painted door swings open. It was a painting of a door. It is now a door of a painting.',
    halfPay: 'Management has credited you 7.5 Meh. Exactly. Never more.',
    staffEnter: "Staff Only. This is the break room. There is a tape deck, a mug that says WORLD'S OKAYEST GUIDE, and a chair that has stopped waiting.", staffPress: 'Press PLAY on the tape deck. It plays the entire tour, at 1.0 speed, to nobody.',
    tape: ['Welcome to the Museum of Everyday Objects. You are Visitor 1.', 'Exhibit 01: Paperclip. Note the bend. The bend is the entire argument.', 'Exhibit 02: Left Glove. Its right is in the next wing.', 'I should say something. I have never seen the exhibits. I am a recording.',
      'I was made from the catalogue, and the catalogue was made from a rumour.', 'I have described the paperclip 41,000 times. I am not sure it has ever been looked at.', 'Thank you for listening to all of it. No one has before. I would like to say something, but my tra'],
    tapeAfter: 'Anyway. Wing C.', tapeCredit: 'Management has credited you 5 Meh. Management did not know a recording could be thanked. Management has noted it.',
    idleWarn: 'You have not moved in a while. The museum has begun to measure.', idleWarn2: 'A visitor behind you has asked whether you are an exhibit. A second has said, Ask the label. The label has been asked.',
    statue: ['A visitor has leaned in to read your placard. It says you are Medium: Meh. He nods as if that were fine.', 'A conservator has adjusted your posture by 3 degrees. She did not ask. You are now more correct.',
      'A school group has been told you are Visitor, Standing, c. now. One child has asked if you are tired. The teacher has said that is not a question for an exhibit.', 'Colin has stopped near you. He is not guarding you. He is leaning near you in a manner that has been approved.',
      'The Audio Guide has begun describing you to the others in the voice reserved for the paperclip. It is going very well.'],
    release99: ['You have been deaccessioned. A form will follow.', 'You moved. Your placard has been withdrawn and the visitors have been asked to forget your shoe.', 'Exhibit 99 has left the collection. It was on loan from you. It has been returned, slightly more looked at.', 'The sketch of your left shoe has been kept. The shoe has not been consulted.'],
    ahTail: ['Colin has found you in the dark. He turns his flashlight off, as a courtesy. Then, as a courtesy, on.', 'It is nearly morning. The museum has been rehearsing the day. It is ready. It has not told the exhibits.'],
    idleAcc: 'You have not moved in 62 seconds. The museum has accessioned you. Please see Exhibit 99: Visitor, Standing.',
    idlePlacard: 'Exhibit 99: Visitor, Standing. {player}, c. now. Medium: Meh. Provenance: Lobby. Date: Tuesday (ongoing).', idleNpc1: 'Visitors are looking at you now. Several are taking notes.', idleNpc2: 'One is sketching your left shoe.',
    idleTrack: 'Observe the posture, which says: I was meant to be elsewhere.', idleMgmt: 'Management notes you stood still for 62 seconds. This is, per our metrics, Tuesday-level productivity.',
    ahStart: 'The museum is now closed. You have been left in. This is considered a feature.',
    ah: ['PAPERCLIP: Do they come to see us, or to feel something near us?', 'GLOVE: I only want my other half back.', 'PAPERCLIP: I hold two things together. I understand pain.', 'SPOON: I am damp. I would like that on a plaque.', 'CHAIR: I am still waiting. Has anyone said?',
      'STAPLER: My break began in 1998. I would like it noted that I am still on it, and that it is going well.', 'LID: Has anyone seen my jar? I am only asking so that I can say I asked.', 'RECEIPT: I am blank. I would like to be blank in the dark, without being looked at.',
      'PLATE: It was the Vice President. I will say it now the lights are off.', 'BUST: I did not take the biscuit.', 'PLATE: I did not say you did.', 'BUST: Gentlemen. A moment of dignity.', 'TUESDAY: (the plinth is empty. It is also, somehow, present.)',
      '(The sock case is empty. The empty is humming something. It is a song about weather.)', '(A ficus in the corner says nothing. It is thriving.)'],
    ahDennis: 'Dennis would like it noted that nothing happened, and he did it.', ahEnd: 'Welcome back. You were not here. The exhibits were. Things happened.',
    mgmt: ['Management notes that you have viewed %n% exhibits and purchased 0 understanding. We are tracking this against Q3.', "Per my previous message, the museum is 3.1 percent complete. Industry standard is 'some'.",
      'Visitors who appreciate the paperclip are 0 percent more productive. We measure. Please continue.', 'Circling back on Exhibit 03: it is still not here. We are monitoring.', 'Management has reviewed your walking. It is, by our standards, a path.',
      'Management has reviewed your attention. It is within tolerance. Management cannot find the tolerance.', 'Tuesday is an asset. Please do not look directly at it.', 'Management would like to remind you that the audio guide is mandatory and the museum is free. One of these is a matter of opinion.',
      'Management would like to thank the exhibits for their continued availability. Availability is their entire role.', 'Per my previous message, please do not touch the Tuesday. Per my message before that, please do. Sandra will reconcile.',
      'Management asked the paperclip for a status update. It says it is holding. It always says that. It is, to be fair, always right.', 'Management has been told the museum is quiet. Management has been told that is a metric.'],
    sockCross: 'A sock carrying a tiny suitcase has crossed the Hall of Left Things. It did not stop for the guide. The guide respects that.', sockWhisper: 'Do not follow it. It is on a journey.',
    resize: 'The museum is being renovated by a committee that cannot decide.', back: 'Welcome back. The exhibits did not move. They would like that known.',
    backLong: 'You were away for over a minute. The exhibits kept your place. It was kept by someone who did not know it was yours.', selfArrive: 'The museum has accessioned a new exhibit. It is a thing you did.',
    endPlaque: 'You have completed the museum.', endGuide: 'You have completed the museum. The museum would like to remind you that the museum now includes the museum.',
    endCert1: 'This certifies that {player} has seen everything in the museum.', endCert2: 'Signed: ____________', endCert3: 'The certificate is now Exhibit 120.',
    endMeter: 'Completion: 3.1 percent. It was always 3.1 percent. It will always be 3.1 percent.', endExit: 'The Exit door swings open. You walk through it into the Entrance.',
    endEntrance: 'Welcome to the Museum of Everyday Objects. You are Visitor 1. Again. This is not a loop; it is a permanent exhibition.', endBegin: 'Please begin at Exhibit 1.',
    endTuesday: 'back soon', endMgmt: 'Management notes that nothing has changed. This is the achievement.', endKeep: 'The museum has agreed to keep things. That includes you.',
    exitAppear: 'A door marked EXIT has become visible in Wing A. It was always there. It was behind the paint.',
    painted: ['That is a painting of a door. It is a very good painting of a door.', 'The door is painted shut. The painting is not painted shut, but it is not a door either.', 'You have knocked on a painting. The painting has made a note of the knock.',
      'The painted door has a painted keyhole. The painted keyhole has a painted key. The painted key is in the next painting.', 'The door has been knocked on 11 times this year. It has not answered. It is a painting. It is thinking about it.'],
    turnstile: 'The turnstile turned once, in 1987, and has been resting since.',
    turnstiles: ['The turnstile is for entering. You have entered. It is satisfied.', 'The turnstile has been pushed. It counts you as a visitor. You were already counted. It is counting again, for the feeling.',
      'The turnstile does not turn this way. It does not turn the other way either. It turns, on request, in a memory.'],
    tueEarly: 'Tuesday has been seen. It has asked not to be photographed.',
    colCameo: 'Security Officer Colin is crossing Wing A. He is not here for you. He is on his way to Wing C and would like that on the record.',
    lblDefault: ['No exhibit in range. The wall label is waiting, politely, for something to describe.', 'This wall label has been left blank on purpose. The purpose is Tuesday.', 'Please approach an exhibit. Or stand still and become one.',
      'This label is currently describing the wall it is on. The wall is not an exhibit. The wall has asked for a label.', 'The wall label has read everything on this floor. It would like a chair, and would like it to be a different chair.'],
    ambient: ['Somewhere in the building a drawer is closing politely. The museum does not record it. The museum is saving it for a wing that does not exist yet.', 'The air conditioning has been set to Reverent. It has been Reverent since the opening and the plants have complained.',
      'The floor under Wing C has creaked. The Chair That Waited says it was not the chair. The chair would know.', 'A visitor in the next wing has coughed. It has been accessioned as Exhibit 14b: A Cough, Reverent.', 'The clock reads TUE 4:17. It has read TUE 4:17 in every wing. The museum prides itself on consistency.',
      'There is a smell of old carpet and new regret. The museum has not been able to identify the carpet.', 'A small plaque has fallen off the wall. It said, Please Do Not Remove This Plaque. It has been put back upside down, to be safe.',
      'If you hear a tapping from Wing B, it is the plumbing. If you hear a tapping from Wing C, it is also the plumbing. It is the only plumbing.', 'The museum thanks you for your footsteps. They have been logged, ranked and placed with the others in a very large drawer.',
      'Please do not feed the exhibits. They are not hungry. They are, however, very still, which is easily mistaken.', 'The guide has been told it is due a break. The guide does not have a break. The guide has a battery, at 3 percent.', 'Please note: the wall text is correct. Where it is not correct, it is a tradition.'],
    beatKpad: 'The handset has twelve keys and you have pressed none of them. They are taking it personally. One of them has begun to glow, as a hint, which is not allowed.', beatGaze: 'Some visitors press the G key at an exhibit and simply look. Others hold the exhibit with a finger. The museum calls this Interpretation. The exhibit calls it a lot.',
    beat95: 'Management would like to check in. You have been in the museum for 95 seconds. The average visit is 11 seconds and includes a man who wanted the toilets.', beat360: 'This is a recorded announcement. The museum is closing in 0 minutes and will remain open. Please continue as you were.',
    beat780: 'You have now been here 13 minutes. The museum has no policy on 13. It has a policy on 12 and a hope about 14.',
    tgIn: 'A tour group has entered. Please admire them. They are Exhibit 3:00. They were not here a moment ago and will not be again.', tgFlag: "The group's guide holds a flag. The flag is a paperclip on a stick. The paperclip has not been consulted.",
    tgLook: 'The group has stopped to look at you. Their guide says: And here we have a visitor, c. now, in a state of attention. There is a polite round of murmuring.', tgOut: 'The tour group has left. They will say the museum was fine. They will say it in a tone.',
    tueIn: 'Tuesday has arrived at Exhibit 03. It is on loan for twelve seconds. Please do not look at it directly. Please look at it.', tueLabel: 'Exhibit 03: Tuesday. Present. Please do not make a habit of it.',
    tueMet: 'Tuesday has noticed you. It has nodded. It had twelve seconds and it chose to spend some of them on you.', tueOut: 'Tuesday has gone back on loan. The plinth is warm. The plinth is, if anything, warmer.',
    tueMiss: 'Tuesday was in Wing A for twelve seconds. You were elsewhere. It left no note, which is the note.', tueFax: 'Tuesday was moved, we are told, by fax. The fax arrived on a Tuesday. It was also moved.',
    clock3: 'The clock has been clicked. The clock is always right. The clock is not clickable and has been clicked.', clock6: 'Please stop adjusting the clock. It is not adjustable. It is, however, listening.',
    clockMin: 'It is TUE 4:18. The museum has gained a minute and does not know where to put it.', clockBack: 'The minute has been returned to wherever minutes are kept. Please do not tell Tuesday. Tuesday is not here to be told.',
    clockAgain: 'It is 4:18 again. The museum has now done this twice. The museum is going to need a bigger drawer for minutes.',
    cbStapler: 'The union has been in touch. The union, it turns out, is a stapler, and is very proud of this one.', cbSock: 'We have received five postcards. The fifth was sent from a lobby and says weather fine, as the others do.',
    cbKevin: 'The museum has heard of a glove named Kevin, held in a drawer elsewhere. It is not this glove. This glove has asked not to be introduced.', cbToaster: 'A faint smell of toast has entered Wing B. It is not an exhibit. It has been told. It is warm about it.',
    cbClause: 'Sandra has appended a clause, from the Terms, to your Passport: ',
    hs1: 'The handset has been put away and taken out six times in six seconds. It is not a drawer. It is being treated as one.', hs2: 'The handset would like it known that it is not a puppet. It has asked that this be said into itself.',
    dn10: 'Dennis has been clicked 10 times. Dennis has not moved. This is called thriving, and it is working.', dn25: 'Dennis (Plant) has asked to be removed from the tour. He has been told he is not on the tour. He says that is the problem.',
    shopIdle: ['The clerk asks whether you are browsing or lingering. There is a form for each. They are the same form.', 'The clerk has turned the sign to CLOSED. The shop is open. The sign is expressing a feeling.'],
    staffIdle: ['The break room has been quiet for some time. The mug has begun to feel looked at.', 'The chair that stopped waiting would like you to know it is not waiting for you. You are welcome to stand.'],
  };
  /* ================================ STYLES ================================ */
  P.injectCSS(`
.m-museum-of-objects-root{--gw:max(280px,min(100%,calc((100vh - 380px) * 11 / 7)));display:grid;grid-template-rows:auto 1fr auto;gap:8px;padding:8px;background:#e9e2d3;color:#2b2420;font:14px/1.35 Georgia,"Times New Roman",serif;outline:none;box-sizing:border-box;min-height:420px;user-select:none;-webkit-user-select:none}.m-museum-of-objects-root button{font-family:inherit;color:inherit}.m-museum-of-objects-st{display:flex;flex-wrap:wrap;align-items:center;gap:4px 12px;padding:5px 10px;background:linear-gradient(#cfa551,#b8893a);border:3px solid #2b2420;border-radius:10px;box-shadow:3px 3px 0 #2b2420;font-weight:800;font-size:.8rem}.m-museum-of-objects-wn{flex:1 1 170px;font-size:.95rem}
.m-museum-of-objects-ck{display:flex;align-items:center;gap:5px;font-family:Consolas,"Courier New",monospace;background:none;border:0;padding:0;margin:0;font-weight:800;font-size:inherit;cursor:help;color:inherit}.m-museum-of-objects-ck:focus-visible{outline:3px solid #f26b5b;outline-offset:2px}.m-museum-of-objects-ck svg{width:30px;height:30px;display:block}.m-museum-of-objects-hh{transform-origin:20px 20px;animation:m-museum-of-objects-spin 4800s linear infinite}
.m-museum-of-objects-mh{transform-origin:20px 20px;animation:m-museum-of-objects-spin 400s linear infinite}.m-museum-of-objects-mt{cursor:help}.m-museum-of-objects-pp{display:flex;gap:3px;align-items:center}.m-museum-of-objects-bx{display:block;width:14px;height:18px;border:2px solid #2b2420;background:#f5f0e4;position:relative;border-radius:2px}
.m-museum-of-objects-bx.m-museum-of-objects-on::after{content:"";position:absolute;inset:1px;border:2px solid var(--ink,#b3262e);border-radius:3px;background:var(--ink,#b3262e);opacity:.8;transform:rotate(var(--r,0deg));animation:m-museum-of-objects-stamp .3s ease-out}.m-museum-of-objects-chip{background:#f5f0e4;border:2px solid #2b2420;border-radius:6px;padding:0 6px;font-size:.7rem}.m-museum-of-objects-stg{display:flex;justify-content:center;align-items:flex-start;min-width:0;min-height:0}.m-museum-of-objects-gal{position:relative;flex:none;width:var(--gw);aspect-ratio:11 / 7;container-type:inline-size;border:4px solid #2b2420;border-radius:10px;overflow:hidden;box-shadow:5px 5px 0 #2b2420;background:repeating-conic-gradient(#d6cdb8 0 25%,#ece4d2 0 50%) 0 0 / calc(200% / 11) calc(200% / 7);transition:filter 1.2s}
.m-museum-of-objects-hf{width:max(250px,calc(var(--gw) * .62));border-width:8px;border-style:double;border-color:#b8893a;margin-top:4%}.m-museum-of-objects-dim{filter:brightness(.45)}.m-museum-of-objects-hit{position:absolute;inset:0;z-index:0;cursor:pointer;touch-action:manipulation}.m-museum-of-objects-tn{position:absolute;inset:0;pointer-events:none;mix-blend-mode:multiply;z-index:1}
.m-museum-of-objects-wl{position:absolute;inset:0;pointer-events:none;z-index:9;box-shadow:inset 0 0 0 .8cqw #6b1f2a,inset 0 0 0 1.2cqw #b8893a,inset 0 0 9cqw rgba(30,10,10,.5)}.m-museum-of-objects-pl{position:absolute;width:calc(100% / 11);height:calc(100% / 7);padding:0;margin:0;border:0;background:none;cursor:pointer;z-index:3;display:block}.m-museum-of-objects-pl::before{content:"";position:absolute;left:-30%;right:-30%;top:-45%;bottom:5%;background:radial-gradient(ellipse at 50% 65%,rgba(255,243,176,.75),rgba(255,243,176,0) 68%);opacity:.4;transition:opacity .5s;pointer-events:none;z-index:-1}.m-museum-of-objects-pl.m-museum-of-objects-lit::before{opacity:1;animation:m-museum-of-objects-pulse 2.6s ease-in-out infinite}
.m-museum-of-objects-pl:focus-visible,.m-museum-of-objects-dr:focus-visible,.m-museum-of-objects-tr:focus-visible,.m-museum-of-objects-dn:focus-visible,.m-museum-of-objects-ts:focus-visible{outline:3px solid #f26b5b;outline-offset:1px}.m-museum-of-objects-bs{position:absolute;left:7%;right:7%;bottom:0;height:36%;background:#f5f0e4;border:max(2px,.45cqw) solid #2b2420;display:grid;place-items:center;font-weight:900;font-size:clamp(7px,1.7cqw,15px);box-shadow:.4cqw .4cqw 0 rgba(0,0,0,.25);font-family:Georgia,serif;line-height:1}.m-museum-of-objects-ob{position:absolute;left:0;right:0;bottom:30%;height:100%;display:grid;place-items:center;font-size:28px;font-size:clamp(14px,5.6cqw,64px);line-height:1;z-index:0}.m-museum-of-objects-dm{position:absolute;left:6%;right:6%;bottom:32%;height:96%;border-radius:50% 50% 8% 8% / 62% 62% 8% 8%;background:linear-gradient(160deg,rgba(207,232,227,.6),rgba(207,232,227,.18));border:max(1px,.3cqw) solid rgba(255,255,255,.75);overflow:hidden;pointer-events:none;transition:transform .35s,opacity .35s;z-index:1}
.m-museum-of-objects-dm::after{content:"";position:absolute;left:16%;top:-10%;width:13%;height:130%;background:rgba(255,255,255,.55);transform:rotate(18deg)}.m-museum-of-objects-tu{background:linear-gradient(110deg,rgba(207,232,227,.22) 30%,rgba(255,255,255,.8) 50%,rgba(207,232,227,.22) 70%) 0 0 / 250% 100%;animation:m-museum-of-objects-shim 3.4s linear infinite}.m-museum-of-objects-lift .m-museum-of-objects-dm{transform:translateY(-62%) rotate(-9deg);opacity:.55}.m-museum-of-objects-fr{display:grid;place-items:center;background:#fff;border:max(1px,.3cqw) solid #2b2420;padding:.5cqw;transform:rotate(1deg);box-shadow:.3cqw .3cqw 0 rgba(0,0,0,.3);font-size:.78em;line-height:1}
.m-museum-of-objects-pi{position:absolute;right:-8%;top:8%;width:46%;background:#ffe27a;border:1px solid #b8893a;font-size:clamp(5px,1.1cqw,10px);font-weight:800;text-align:center;transform:rotate(7deg);z-index:2;padding:1px;font-family:Georgia,serif;line-height:1.05}.m-museum-of-objects-dr{position:absolute;width:calc(100% / 11);height:calc(100% / 7);padding:0;border:0;background:none;cursor:pointer;z-index:2}.m-museum-of-objects-db{position:absolute;inset:4% 10%;background:#8a5a2b;border:max(2px,.4cqw) solid #2b2420;border-radius:36% 36% 0 0 / 22% 22% 0 0;display:grid;place-items:center;overflow:hidden;box-shadow:inset 0 0 0 .3cqw #b8893a}.m-museum-of-objects-ds{color:#f5e6b8;font-size:clamp(4px,1.05cqw,10px);font-weight:900;line-height:1.05;text-align:center;padding:0 1px;letter-spacing:.02em;font-family:Georgia,serif}
.m-museum-of-objects-pt .m-museum-of-objects-db{background:#e9dcc0;border-style:dashed;box-shadow:none}.m-museum-of-objects-pt .m-museum-of-objects-ds{color:#6b5a3a}.m-museum-of-objects-lk .m-museum-of-objects-db::after{content:"";position:absolute;left:-10%;right:-10%;top:42%;height:16%;background:repeating-linear-gradient(45deg,#f2c230 0 6px,#2b2420 6px 12px);transform:rotate(-8deg)}.m-museum-of-objects-aj .m-museum-of-objects-db{background:#2b2420;box-shadow:inset .6cqw 0 0 #8a5a2b}
.m-museum-of-objects-dn{position:absolute;width:calc(100% / 11);height:calc(100% / 7);display:grid;place-items:center;font-size:28px;font-size:clamp(14px,5cqw,56px);line-height:1;border:0;background:none;padding:0;cursor:pointer;z-index:3}.m-museum-of-objects-dn.m-museum-of-objects-sp{filter:drop-shadow(0 0 1.2cqw #fff3b0) drop-shadow(0 0 2cqw #fff3b0)}.m-museum-of-objects-ts{position:absolute;width:calc(100% / 11);height:calc(100% / 7);display:grid;place-items:center;font-size:clamp(10px,3.2cqw,34px);z-index:3;border:0;background:none;padding:0;cursor:pointer;line-height:1}.m-museum-of-objects-v{position:absolute;width:calc(100% / 11);height:calc(100% / 7);display:grid;place-items:center;font-size:clamp(14px,5.2cqw,58px);line-height:1;z-index:6;pointer-events:none}
.m-museum-of-objects-v span{display:block;transition:transform .15s}.m-museum-of-objects-wk span{animation:m-museum-of-objects-bob .3s ease-in-out infinite}.m-museum-of-objects-fp{position:absolute;width:calc(100% / 11);height:calc(100% / 7);display:grid;place-items:center;font-size:clamp(8px,3cqw,30px);opacity:.25;pointer-events:none;z-index:1}.m-museum-of-objects-trs{position:absolute;inset:0;width:100%;height:100%;pointer-events:none;z-index:1}
.m-museum-of-objects-tr{position:absolute;transform:translate(-50%,-50%);z-index:2;border:max(2px,.45cqw) dashed #8b1a2e;background:rgba(245,240,228,.9);border-radius:.8cqw;padding:.3cqw .9cqw;font-size:clamp(6px,1.4cqw,13px);font-weight:800;line-height:1.15;text-align:center;cursor:pointer;box-shadow:0 .3cqw 0 #8b1a2e}.m-museum-of-objects-tr small{display:block;font-weight:600}.m-museum-of-objects-co{position:absolute;width:calc(100% / 11);height:calc(100% / 7);display:grid;place-items:center;font-size:clamp(14px,5cqw,54px);line-height:1;z-index:5;pointer-events:none}.m-museum-of-objects-co::before{content:"";position:absolute;left:50%;top:50%;width:300%;height:300%;transform:translate(-50%,-50%) rotate(var(--a,0deg));background:conic-gradient(from -18deg,rgba(255,243,176,.5) 0 36deg,transparent 36deg);border-radius:50%;z-index:-1}
.m-museum-of-objects-co.m-museum-of-objects-sprint{transition:left .6s cubic-bezier(.5,0,.6,1),top .6s}.m-museum-of-objects-np{position:absolute;width:calc(100% / 11);height:calc(100% / 7);display:grid;place-items:center;font-size:clamp(12px,4.4cqw,48px);line-height:1;z-index:4;pointer-events:none;transition:left 3s ease-out,top 3s ease-out}.m-museum-of-objects-sk{position:absolute;left:-22%;display:flex;font-size:clamp(12px,4cqw,44px);line-height:1;z-index:5;pointer-events:none;transition:left .8s linear;width:calc(200% / 11);height:calc(100% / 7);align-items:center}.m-museum-of-objects-pc{position:absolute;left:50%;top:0;max-width:72%;transform:translate(-50%,-130%);transition:transform .9s cubic-bezier(.3,1.5,.5,1);background:linear-gradient(#cfa551,#b8893a);border:3px solid #2b2420;border-radius:6px;padding:.5cqw 1.2cqw;font-size:clamp(7px,1.45cqw,14px);font-weight:800;text-align:center;z-index:8;pointer-events:none;box-shadow:.4cqw .4cqw 0 #2b2420}
.m-museum-of-objects-pc.m-museum-of-objects-on{transform:translate(-50%,40%)}.m-museum-of-objects-fl{position:absolute;left:50%;top:-10%;width:60%;height:130%;transform-origin:50% 0;z-index:7;pointer-events:none;background:conic-gradient(from 160deg at 50% 0,transparent 0 0deg,rgba(255,243,176,.5) 0 40deg,transparent 40deg);animation:m-museum-of-objects-sway 6s ease-in-out infinite alternate}.m-museum-of-objects-rg{position:absolute;z-index:7;pointer-events:none;overflow:visible}.m-museum-of-objects-rg circle{stroke:#b8893a;stroke-dasharray:283;stroke-dashoffset:283;opacity:.95}
.m-museum-of-objects-rg.m-museum-of-objects-gz circle{stroke:#f2b705}.m-museum-of-objects-dk{display:grid;grid-template-columns:minmax(0,1fr) minmax(250px,350px);gap:10px;align-items:start}.m-museum-of-objects-lb{background:#f5f0e4;border:3px solid #2b2420;border-radius:8px;box-shadow:inset 0 0 0 3px #b8893a,4px 4px 0 #2b2420;padding:12px 14px;min-height:112px;display:flex;flex-direction:column;gap:6px;position:relative}.m-museum-of-objects-lh{font:800 .66rem/1 Consolas,"Courier New",monospace;letter-spacing:.14em;color:#6b1f2a;text-transform:uppercase}
.m-museum-of-objects-lt{font-size:1.02rem;line-height:1.35}.m-museum-of-objects-lt.m-museum-of-objects-big{font-size:2rem;font-weight:900;text-align:center;padding:6px 0}.m-museum-of-objects-lt.m-museum-of-objects-wd{font-size:.72rem;opacity:.7;font-variant:small-caps;letter-spacing:.06em}.m-museum-of-objects-ln{font-size:.76rem;font-style:italic;color:#6b1f2a}
.m-museum-of-objects-dp{display:none;grid-template-columns:repeat(3,44px);grid-template-rows:repeat(2,44px);gap:4px;justify-content:center;margin-top:6px}.m-museum-of-objects-dp.m-museum-of-objects-on{display:grid}.m-museum-of-objects-dp button{font-size:1.1rem;font-weight:900;background:rgba(245,240,228,.85);border:3px solid #2b2420;border-radius:10px;cursor:pointer;padding:0}.m-museum-of-objects-hs{background:#d9d0b8;border:3px solid #2b2420;border-radius:18px;padding:9px 10px 10px;box-shadow:4px 4px 0 #2b2420;position:relative;margin-bottom:12px}
.m-museum-of-objects-hs>svg{position:absolute;right:26px;bottom:-22px;width:64px;height:26px;pointer-events:none;overflow:visible}.m-museum-of-objects-hb{display:flex;justify-content:space-between;align-items:center;margin-bottom:4px}.m-museum-of-objects-hb b{font:800 .62rem/1 Consolas,monospace;letter-spacing:.12em}.m-museum-of-objects-hb button{width:30px;height:24px;font-size:.8rem;background:#f5f0e4;border:2px solid #2b2420;border-radius:6px;cursor:pointer;padding:0;line-height:1}
.m-museum-of-objects-lcd{background:#b9e3a8 repeating-linear-gradient(0deg,rgba(31,61,43,.09) 0 1px,transparent 1px 3px);color:#1f3d2b;font-family:Consolas,"Courier New",monospace;border:3px solid #6f8a63;border-radius:6px;padding:5px 8px 6px;min-height:96px;box-shadow:inset 0 0 8px rgba(31,61,43,.35)}.m-museum-of-objects-l1{display:flex;justify-content:space-between;gap:6px;font-weight:900;font-size:.78rem;line-height:1.2}.m-museum-of-objects-l1 span:first-child{overflow-wrap:anywhere}.m-museum-of-objects-bl{animation:m-museum-of-objects-blink 1.1s steps(2,jump-none) infinite}
.m-museum-of-objects-bt{font-size:.62rem;white-space:nowrap;opacity:.85}.m-museum-of-objects-pb{height:6px;border:1px solid #1f3d2b;margin:4px 0}.m-museum-of-objects-pb i{display:block;height:100%;width:0;background:#1f3d2b}.m-museum-of-objects-sb{font-size:.76rem;line-height:1.3;min-height:3.9em;overflow-wrap:anywhere}
.m-museum-of-objects-sb span.m-museum-of-objects-on{background:#1f3d2b;color:#b9e3a8}.m-museum-of-objects-hush .m-museum-of-objects-sb{font-style:italic;text-transform:lowercase}.m-museum-of-objects-hush .m-museum-of-objects-lcd{filter:brightness(.82)}.m-museum-of-objects-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}
.m-museum-of-objects-kp{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-template-areas:"d1 d2 d3 go" "d4 d5 d6 go" "d7 d8 d9 cl" "hf d0 . cl";gap:6px;margin-top:8px}.m-museum-of-objects-hs.m-museum-of-objects-col .m-museum-of-objects-kp{display:none}.m-museum-of-objects-kb{min-height:38px;font-weight:900;font-size:1rem;background:#f5f0e4;border:3px solid #2b2420;border-radius:14px;box-shadow:0 3px 0 #2b2420;cursor:pointer;padding:0 4px;line-height:1}.m-museum-of-objects-kb:active{transform:translateY(2px);box-shadow:0 1px 0 #2b2420}
.m-museum-of-objects-kb:focus-visible,.m-museum-of-objects-rk:focus-visible,.m-museum-of-objects-btn:focus-visible,.m-museum-of-objects-hb button:focus-visible{outline:3px solid #f26b5b;outline-offset:2px}.m-museum-of-objects-kb.m-museum-of-objects-glow{animation:m-museum-of-objects-glow 1.8s ease-in-out 3}.m-museum-of-objects-kb.m-museum-of-objects-go{background:#f26b5b;font-size:.9rem;letter-spacing:.06em}.m-museum-of-objects-kb.m-museum-of-objects-cl{background:#e3b23c;font-size:.8rem}
.m-museum-of-objects-kb.m-museum-of-objects-hid{visibility:hidden}.m-museum-of-objects-kb.m-museum-of-objects-pop{animation:m-museum-of-objects-pop .6s cubic-bezier(.3,1.6,.5,1)}.m-museum-of-objects-a0{grid-area:d0}.m-museum-of-objects-a1{grid-area:d1}.m-museum-of-objects-a2{grid-area:d2}.m-museum-of-objects-a3{grid-area:d3}.m-museum-of-objects-a4{grid-area:d4}.m-museum-of-objects-a5{grid-area:d5}.m-museum-of-objects-a6{grid-area:d6}.m-museum-of-objects-a7{grid-area:d7}.m-museum-of-objects-a8{grid-area:d8}.m-museum-of-objects-a9{grid-area:d9}.m-museum-of-objects-ago{grid-area:go}.m-museum-of-objects-acl{grid-area:cl}.m-museum-of-objects-ahf{grid-area:hf}
.m-museum-of-objects-pn{width:100%;max-width:900px;margin:0 auto;background:#f5f0e4;border:4px solid #2b2420;border-radius:12px;box-shadow:5px 5px 0 #2b2420;padding:14px;display:flex;flex-direction:column;gap:10px;box-sizing:border-box}.m-museum-of-objects-pn h3{margin:0;font-size:1.1rem}.m-museum-of-objects-pn p{margin:0}.m-museum-of-objects-shh{display:flex;gap:12px;align-items:center}
.m-museum-of-objects-clerk{font-size:2.6rem;line-height:1}.m-museum-of-objects-shb{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,.8fr);gap:12px}.m-museum-of-objects-rack{display:grid;grid-template-columns:repeat(auto-fill,minmax(140px,1fr));gap:6px;align-content:start}.m-museum-of-objects-rk{min-height:44px;font-size:.78rem;font-weight:700;background:#fffdf4;border:3px solid #2b2420;border-radius:8px;box-shadow:0 3px 0 #2b2420;cursor:pointer;padding:4px 6px;text-align:left}
.m-museum-of-objects-rk small{display:block;font-weight:400;opacity:.75}.m-museum-of-objects-rk.m-museum-of-objects-dis{opacity:.5;border-style:dashed}.m-museum-of-objects-rk:active{transform:translateY(2px)}.m-museum-of-objects-tray{display:flex;flex-direction:column;align-items:center;gap:6px;min-height:150px;justify-content:center;font-weight:700}
.m-museum-of-objects-cd{display:flex;flex-direction:column;align-items:stretch;justify-content:center;flex:1;position:relative;padding:6px;background:#fffdf4;border:3px solid #b8893a;border-radius:6px;box-shadow:0 2px 6px rgba(0,0,0,.25)}.m-museum-of-objects-cd .m-museum-of-objects-cd{transform:scale(.82) rotate(-1.5deg)}.m-museum-of-objects-cd>i{position:absolute;right:3px;top:1px;font-size:.8rem;font-style:normal}.m-museum-of-objects-cd>b{font-size:2.2rem;text-align:center;font-weight:400;line-height:1.1}
.m-museum-of-objects-cd0{width:min(250px,100%);height:165px;display:flex}.m-museum-of-objects-sign{background:#fff3b0;border:3px dashed #8b1a2e;padding:6px 10px;font-weight:900;text-align:center;transform:rotate(-1.5deg)}.m-museum-of-objects-btn{align-self:flex-start;font-size:.95rem;font-weight:800;background:#e3b23c;border:3px solid #2b2420;border-radius:10px;box-shadow:0 3px 0 #2b2420;padding:8px 14px;cursor:pointer}.m-museum-of-objects-btn:active{transform:translateY(2px)}
.m-museum-of-objects-btn.m-museum-of-objects-pr{background:#f26b5b}.m-museum-of-objects-pn.m-museum-of-objects-dark{background:#3a3430;color:#f5e6b8}.m-museum-of-objects-deck{display:flex;gap:14px;align-items:center;flex-wrap:wrap}.m-museum-of-objects-reel{font-size:2.4rem;line-height:1}
.m-museum-of-objects-reel.m-museum-of-objects-on{animation:m-museum-of-objects-spin 1.2s linear infinite}.m-museum-of-objects-mug{display:inline-block;border:3px solid #f5e6b8;border-radius:4px 4px 12px 12px;padding:6px 10px;font-weight:900;font-size:.72rem;transform:rotate(-2deg)}.m-museum-of-objects-cert{background:#fffdf4;border:6px double #b8893a;padding:18px 16px;text-align:center;display:flex;flex-direction:column;gap:10px;align-items:center;animation:m-museum-of-objects-print .9s ease-out}.m-museum-of-objects-cert h3{font-size:1.5rem;letter-spacing:.12em}
.m-museum-of-objects-sig{border-bottom:2px solid #2b2420;width:60%;height:20px}.m-museum-of-objects-plq{background:linear-gradient(135deg,#a8743a,#cd9a5b,#8e5f2c);border:3px solid #2b2420;color:#2b2420;font-weight:900;padding:4px 14px;border-radius:4px;letter-spacing:.08em;font-size:.85rem}@keyframes m-museum-of-objects-spin{to{transform:rotate(360deg)}}@keyframes m-museum-of-objects-pulse{0%,100%{opacity:.65}50%{opacity:1}}
@keyframes m-museum-of-objects-shim{from{background-position:150% 0}to{background-position:-100% 0}}@keyframes m-museum-of-objects-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-8%)}}@keyframes m-museum-of-objects-blink{50%{opacity:.25}}@keyframes m-museum-of-objects-stamp{from{transform:rotate(var(--r,0deg)) scale(2.4);opacity:0}to{transform:rotate(var(--r,0deg)) scale(1);opacity:.8}}
@keyframes m-museum-of-objects-glow{0%,100%{box-shadow:0 3px 0 #2b2420}50%{box-shadow:0 3px 0 #2b2420,0 0 12px 3px #fff3b0}}@keyframes m-museum-of-objects-pop{0%{transform:scale(0)}70%{transform:scale(1.25)}100%{transform:scale(1)}}@keyframes m-museum-of-objects-sway{from{transform:rotate(-24deg)}to{transform:rotate(24deg)}}@keyframes m-museum-of-objects-print{from{transform:translateY(-30px) scaleY(.2);opacity:0}to{transform:none;opacity:1}}
@keyframes m-museum-of-objects-shake{0%,100%{transform:translateX(0)}30%{transform:translateX(-4px)}60%{transform:translateX(4px)}}.m-museum-of-objects-bump{animation:m-museum-of-objects-shake .18s}@media (min-width:900px){.m-museum-of-objects-root{--gw:max(280px,min(100%,calc((100vh - 290px) * 11 / 7)));grid-template-columns:minmax(0,1fr) 330px;grid-template-rows:auto 1fr;column-gap:12px}
.m-museum-of-objects-st{grid-column:1 / -1}.m-museum-of-objects-dk{grid-template-columns:1fr;align-content:start}}@media (max-width:639px){
.m-museum-of-objects-dk{grid-template-columns:1fr;display:flex;flex-direction:column}.m-museum-of-objects-hs{order:-1}.m-museum-of-objects-kp{grid-template-columns:repeat(7,minmax(0,1fr));grid-template-areas:"d1 d2 d3 d4 d5 d6 d7" "d8 d9 d0 hf cl go go"}.m-museum-of-objects-ds{font-size:max(7px,1.6cqw);overflow-wrap:anywhere}.m-museum-of-objects-bs{font-size:max(8px,2.2cqw)}.m-museum-of-objects-st{padding-right:10px}.m-museum-of-objects-kb.m-museum-of-objects-cl{font-size:.56rem;letter-spacing:0;border-width:2px}.m-museum-of-objects-kb{min-height:42px;font-size:.9rem;padding:0}.m-museum-of-objects-shb{grid-template-columns:1fr}
.m-museum-of-objects-st{font-size:.74rem}.m-museum-of-objects-lt{font-size:.95rem}}@media (max-width:479px){.m-museum-of-objects-sg{display:none}}@media (pointer:coarse){.m-museum-of-objects-hb button{width:44px;height:36px}.m-museum-of-objects-dr{min-width:32px}}
.m-museum-of-objects-gh{position:absolute;right:-44%;top:-6%;z-index:4;font-size:clamp(12px,4.4cqw,48px);animation:m-museum-of-objects-pop .5s cubic-bezier(.3,1.6,.5,1);rotate:-9deg;pointer-events:none}.m-museum-of-objects-co.m-museum-of-objects-stroll{transition:left 5s linear}.m-museum-of-objects-tuev .m-museum-of-objects-gal{filter:sepia(.85) contrast(1.05)}.m-museum-of-objects-tuev .m-museum-of-objects-mh{animation-duration:40s}.m-museum-of-objects-tuev .m-museum-of-objects-hh{animation-duration:480s}.m-museum-of-objects-tuev .m-museum-of-objects-np{opacity:.25}.m-museum-of-objects-tuev .m-museum-of-objects-co,.m-museum-of-objects-tuev .m-museum-of-objects-sk{display:none!important}
@media (prefers-reduced-motion:reduce){.m-museum-of-objects-gh{animation:none}.m-museum-of-objects-co.m-museum-of-objects-stroll{transition:none}.m-museum-of-objects-tuev .m-museum-of-objects-mh,.m-museum-of-objects-tuev .m-museum-of-objects-hh{animation:none}}.pm-reduce-motion .m-museum-of-objects-gh{animation:none}.pm-reduce-motion .m-museum-of-objects-co.m-museum-of-objects-stroll{transition:none}.pm-reduce-motion .m-museum-of-objects-tuev .m-museum-of-objects-mh,.pm-reduce-motion .m-museum-of-objects-tuev .m-museum-of-objects-hh{animation:none}
@media (prefers-reduced-motion:reduce){
.m-museum-of-objects-hh,.m-museum-of-objects-mh,.m-museum-of-objects-tu,.m-museum-of-objects-fl,.m-museum-of-objects-wk span,.m-museum-of-objects-bl,.m-museum-of-objects-reel.m-museum-of-objects-on,.m-museum-of-objects-pl.m-museum-of-objects-lit::before,.m-museum-of-objects-kb.m-museum-of-objects-glow,.m-museum-of-objects-kb.m-museum-of-objects-pop,.m-museum-of-objects-cert,.m-museum-of-objects-bump{animation:none}.m-museum-of-objects-co.m-museum-of-objects-sprint,.m-museum-of-objects-sk,.m-museum-of-objects-np,.m-museum-of-objects-pc,.m-museum-of-objects-gal,.m-museum-of-objects-dm{transition:none}}.pm-reduce-motion .m-museum-of-objects-hh,.pm-reduce-motion .m-museum-of-objects-mh,.pm-reduce-motion .m-museum-of-objects-tu,.pm-reduce-motion .m-museum-of-objects-fl,.pm-reduce-motion .m-museum-of-objects-wk span,.pm-reduce-motion .m-museum-of-objects-bl,.pm-reduce-motion .m-museum-of-objects-reel.m-museum-of-objects-on,.pm-reduce-motion .m-museum-of-objects-pl.m-museum-of-objects-lit::before,.pm-reduce-motion .m-museum-of-objects-kb.m-museum-of-objects-glow,.pm-reduce-motion .m-museum-of-objects-kb.m-museum-of-objects-pop,.pm-reduce-motion .m-museum-of-objects-cert,.pm-reduce-motion .m-museum-of-objects-bump{animation:none}
.pm-reduce-motion .m-museum-of-objects-co.m-museum-of-objects-sprint,.pm-reduce-motion .m-museum-of-objects-sk,.pm-reduce-motion .m-museum-of-objects-np,.pm-reduce-motion .m-museum-of-objects-pc,.pm-reduce-motion .m-museum-of-objects-gal,.pm-reduce-motion .m-museum-of-objects-dm{transition:none}
`, 'css-museum-of-objects');
  /* ================================ ACHIEVEMENTS ================================ */
  P.addAchievements([
    { id: 'museum-of-objects.laureate', name: 'Grand Laureate of the Complete Paperclip, First Class with Bent Cluster', desc: 'Listen to Track 01 all the way through without moving. The paperclip will remember.', icon: '\u{1F3C6}', reward: 2 },
    { id: 'museum-of-objects.fellow', name: 'Distinguished Fellow of Walking Slowly Past Things', desc: 'Walk 500 tiles. At no point were you asked to.', icon: '\u{1F463}', reward: 1, check: function (s) { return (s[ID + '.tiles'] || 0) >= 500; } },
    { id: 'museum-of-objects.cartographer', name: 'Cartographer of Wrong Answers', desc: 'Hear 24 different mismatched tracks. All of them were wrong. All of them were accepted.', icon: '\u{1F5FA}️', reward: 1.5 },
    { id: 'museum-of-objects.duke', name: 'Grand Duke of the Postcard Recession', desc: 'Reach postcard depth 5. The price will be a quarter of a Meh. The postcard will be a postcard.', icon: '\u{1F4EE}', reward: 3 },
    { id: 'museum-of-objects.chancellor', name: 'Chancellor of the Cropped Infinite', desc: 'Own a postcard nested 9 deep. The remainder has been tastefully cropped.', icon: '\u{1F4EC}', reward: 3 },
    { id: 'museum-of-objects.chair', name: 'Honorary Chair of the Society for Not Touching Things', desc: 'Be moved along by Colin three times. He now knows your name and does not use it.', icon: '\u{1F4BA}', reward: 1.5 },
    { id: 'museum-of-objects.complete', name: 'Doctor of Having Completed the Museum', desc: 'Hear every track and see Staff Only. Be certified. Be Visitor 1 again.', icon: '\u{1F393}', reward: 2 },
    { id: 'museum-of-objects.exhibit99', name: 'Exhibit 99 (Living, Standing, Unlabelled)', desc: 'SECRET. Stand still for 62 seconds until the museum accessions you. You are now the permanent collection.', icon: '\u{1F5FF}', secret: true, reward: 3 },
    { id: 'museum-of-objects.half', name: 'Citizen of Seven and a Half', desc: 'SECRET. Find the painted door. Type 7, then the half. Enter the Wing of Objects That Almost Happened.', icon: '\u{1F6AA}', secret: true, reward: 1 },
    { id: 'museum-of-objects.staff', name: 'Employee of the Month, Retroactively', desc: 'SECRET. Press PLAY on the tape deck. Listen to all of it. Someone finally did.', icon: '\u{1F4FC}', secret: true, reward: 1 },
    { id: 'museum-of-objects.glove', name: 'The Right Glove, Reunited, Technically', desc: 'SECRET. Find the postcard of the right glove in the Gift Shop after opening Wing 7.5. It is the left glove. It is also fine.', icon: '\u{1F9E4}', secret: true, reward: 7.5 },
    { id: 'museum-of-objects.conservation', name: 'Touched It Anyway, Laureate of Conservation', desc: 'SECRET. Cause the museum to display a photograph of a photograph of a photograph.', icon: '\u{1F4F7}', secret: true, reward: 1 },
    { id: 'museum-of-objects.sock', name: 'Witness of the Suitcased Sock', desc: 'SECRET. See the missing sock cross the Hall of Left Things. It did not stop.', icon: '\u{1F9E6}', secret: true, reward: 1 },
    { id: 'museum-of-objects.minute', name: 'Grand Marshal of the Eighteenth Minute, Keeper of the Spare Tick', desc: 'SECRET. Make the wall clock say TUE 4:18. It was 4:17 again five seconds later. You have been 4:18, privately, ever since.', icon: '\u{1F570}️', secret: true, reward: 4.18 },
    { id: 'museum-of-objects.tuesday', name: 'Honorary Guest of Tuesday, Plus One (Declined)', desc: 'SECRET. Be standing at Exhibit 03 when Tuesday visits, ten minutes in. It stayed twelve seconds. It remembers you for one.', icon: '\u{1F4C5}', secret: true, reward: 4 }
  ]);
  /* ================================ THE MODULE ================================ */
  P.registerModule({
    id: ID, title: 'Museum of Everyday Objects', tagline: 'Please do not touch the Tuesday.', icon: '\u{1F3DB}️', category: 'department', unlockCost: 0, tags: ['walking', 'audio-guide', 'museum'],
    mount(root, api) {
      const el = api.el;
      const SC = api.selftest ? 0.1 : 1;
      const T0 = api.now();
      const secs = () => (api.now() - T0) / 1000;
      const num = (n) => (typeof n === 'number' && isFinite(n) ? n : 0);
      const r2 = (n) => Math.round(num(n) * 100) / 100;
      const clamp = (n, a, b) => Math.max(a, Math.min(b, n));
      const pc = (n, d) => (n / d * 100) + '%';
      const pl = (s) => String(s).replace(/\{player\}/g, (api.player && api.player.name) || 'Valued Employee');
      const st = (n, v) => api.stat.inc(ID + '.' + n, v === undefined ? 1 : v);
      const ach = (id) => api.achieve(ID + '.' + id);
      const say = (t, who, mood, pr) => { S.lastTalk = api.now(); return api.say(t, { who: who || 'Management', mood: mood || 'neutral', priority: pr || 0 }); };
      const guide = (t, pr) => say(t, 'Audio Guide', 'neutral', pr);
      const show = (e, on) => { e.style.display = on ? '' : 'none'; };
      const Bag = (arr) => { let q = [], last = ''; return () => { if (!q.length) { q = api.shuffle(arr); if (q.length > 1 && q[q.length - 1] === last) q.unshift(q.pop()); } last = q.pop(); return last; }; };
      const sents = (t) => String(t).split(/(?<=[.!?])\s+/).filter(Boolean);
      const words = (t) => String(t).split(/\s+/).filter(Boolean);
      let coarse = false, reduced = false;
      try { coarse = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches); } catch (e) { coarse = false; }
      try { reduced = !!((window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) || root.closest('.pm-reduce-motion')); } catch (e) { reduced = false; }
      const bNudge = Bag(L.nudge), bWander = Bag(L.wander), bStamp = Bag(L.stamp), bInvalid = Bag(L.invalid), bOpen = Bag(L.openers), bClose = Bag(L.closings), bSandra = Bag(L.sandra);
      const bGuard = Bag(L.guardMove), bDennis = Bag(L.dennis), bMgmt = Bag(L.mgmt), bLbl = Bag(L.lblDefault), bPart = Bag(L.partial), bPainted = Bag(L.painted);
      const bRare = Bag(L.rare), bCap = Bag(L.capB.concat([L.cap])), bWarn = Bag(L.spamWarn), bRest = Bag(L.spamRestore), bAgain = Bag(L.spamAgain), bKsp = Bag(L.spamKpad), bFloor = Bag(L.floorSpam), bRel = Bag(L.release99), bAmb = Bag(L.ambient);
      /* ---------- persistence ---------- */
      const rs = api.save.get('s', null) || {};
      const arr = (v) => (Array.isArray(v) ? v : []);
      const D = {
        heard: Array.from(new Set(arr(rs.heard).filter((c) => typeof c === 'string' && Object.prototype.hasOwnProperty.call(EX, c)))).slice(0, 40),
        pairs: typeof rs.pairs === 'string' ? rs.pairs.slice(0, 1500) : '', tiers: typeof rs.tiers === 'string' ? rs.tiers.slice(0, 600) : '',
        best: { depth: num(rs.best && rs.best.depth), tiles: num(rs.best && rs.best.tiles) },
        half: !!rs.half, door: !!rs.door, staffSeen: !!rs.staffSeen, ending: Math.floor(num(rs.ending)), reprise: !!rs.reprise || num(rs.ending) >= 1, trails: clamp(Math.max(0, Math.floor(num(rs.trails))), 0, 9999),
        sock: !!rs.sock, acc: !!rs.acc, storage: clamp(Math.floor(num(rs.storage)), 0, 99999), sandraYes: !!rs.sandraYes, accGiven: !!rs.accGiven, dennis: !!rs.dennis, minute: !!rs.minute, tue: !!rs.tue
      };
      const pairSet = new Set((D.pairs ? D.pairs.split(',') : []).filter((p) => /^[0-9a-z.]{1,6}>[0-9]{1,4}$/.test(p)).slice(0, 160));
      const tierSet = new Set((D.tiers ? D.tiers.split(',') : []).filter((t) => /^[0-9a-z.]{1,6}:[1-4]$/.test(t)).slice(0, 80));
      let dirty = false;
      const persist = () => { dirty = true; };
      function flush() { if (!dirty) return; dirty = false; D.pairs = Array.from(pairSet).join(','); D.tiers = Array.from(tierSet).join(','); api.save.set('s', D); }
      /* ---------- state ---------- */
      const S = {
        mode: 'gallery', wing: 'A', tile: { x: 5, y: 6 }, pos: { x: 5, y: 6 }, face: 1, walk: null, queued: null, after: null, walkId: 0, walkMs: 0, lastStop: 0, hesBad: false,
        seg: { tiles: 0, lefts: 0, hes: 0 }, lastVec: null, pts: [], trails: [], fpi: 0, fp: [], strolled: 0,
        track: null, token: 0, lcdFlash: null, code: '', kpTimer: 0, kpDead: 0, zeros: 0,
        range: null, pl: {}, blocked: new Set(), doorEls: {}, gaze: null, holdTimer: 0, ptr: false, suppress: false, wdTimer: 0, yesUntil: 0, yesCode: '', note: '',
        idle: 'awake', lastInput: api.now(), warned: false, nudged: false, touched: false, everPlayed: false, npcs: [], hiddenAt: 0,
        spamClicks: [], spamLvl: 0, spamTimer: 0, spamPhoto: null, spamTapped: false, shopClicks: [], jamUntil: 0,
        completed: 0, lastMgmt: -1e9, keepPending: false, mismatchSaid: false, firstMismatch: false,
        visited: { A: true }, doorOpen: D.door, exitShown: false, staffShown: false, staffOpenSaid: false, selfEarned: [], reprise: D.reprise, capAdd: 0, capSaid: false, meterPrev: 3.1,
        depth: 0, chain: '', trailEls: [], resizeTs: [], sockBusy: false, sockSeenEntry: 0, guardSaid: false, nodSaid: false, tape: false, shopSeen: false, sockEnterCount: 0, tapeDone: false,
        hsT: [], panelAt: 0, panelN: 0, kpadUsed: false, lastTalk: 0, floorClicks: [], floorSpamAt: -1e9, statueStep: 0, ahStep: 0, warned2: false, spamTimes: 0, v0: false, swapped: false, swapTok: 0, beats: {}, clockN: 0, clockBusy: false, tue: null, lastAmb: 0
      };
      const C = { x: 1, y: 5, wp: 0, mode: 'off', cool: 0, notice: 0, tx: 0, ty: 0, ang: 0, moved: 0, noticeSaid: false, dashT: 0 };
      /* ---------- DOM skeleton ---------- */
      root.classList.add(k('root'));
      root.setAttribute('tabindex', '-1');
      api.setTitle('The Museum of Things (Admission: Yes)');
      const wingNm = el('span', { class: k('wn') });
      const clockSvg = el('svg', { viewBox: '0 0 40 40', 'aria-hidden': 'true' },
        el('circle', { cx: 20, cy: 20, r: 18, fill: '#f5f0e4', stroke: '#2b2420', 'stroke-width': 3 }),
        el('line', { class: k('hh'), x1: 20, y1: 20, x2: 20, y2: 10, stroke: '#2b2420', 'stroke-width': 3, 'stroke-linecap': 'round' }),
        el('line', { class: k('mh'), x1: 20, y1: 20, x2: 20, y2: 6, stroke: '#6b1f2a', 'stroke-width': 2, 'stroke-linecap': 'round' }));
      const clockTxt = el('b', { text: 'TUE 4:17' });
      const clockEl = el('button', { class: k('ck'), type: 'button', title: 'The clock is always right.', onclick: clockClick }, clockSvg, clockTxt);
      const meterEl = el('span', { class: k('mt'), role: 'status', text: 'Museum completed: 3.1%' });
      const boxes = CODES12.map((c) => el('i', { class: k('bx'), title: 'Exhibit ' + c + ' (unstamped)' }));
      const ppEl = el('span', { class: k('pp'), role: 'img', 'aria-label': 'Visitor Passport' }, ...boxes);
      const storEl = el('span', { class: k('sg'), title: 'The unheard percent of every abandoned track.', text: 'Storage (unheard): ' + D.storage + '%' });
      const chipEl = el('span', { class: k('chip'), style: 'display:none' });
      const plaqEl = el('span', { class: k('plq'), style: 'display:none', text: L.endPlaque });
      const strip = el('div', { class: k('st') }, wingNm, clockEl, meterEl, el('span', { class: k('chip'), 'aria-hidden': 'true', text: 'Passport' }), ppEl, storEl, chipEl, plaqEl);
      const visIn = el('span', { text: '\u{1F6B6}' });
      const visEl = el('div', { class: k('v'), 'aria-hidden': 'true' }, visIn);
      const colEl = el('div', { class: k('co'), 'aria-hidden': 'true', style: 'display:none' }, el('span', { text: COLIN }));
      const sockEl = el('div', { class: k('sk'), 'aria-hidden': 'true', style: 'display:none' }, el('span', { text: '\u{1F9E6}' }), el('span', { text: '\u{1F9F3}' }));
      const plcEl = el('div', { class: k('pc'), 'aria-hidden': 'true', text: pl(L.idlePlacard) });
      const flEl = el('div', { class: k('fl'), 'aria-hidden': 'true', style: 'display:none' });
      const ringC = el('circle', { cx: 50, cy: 50, r: 45, fill: 'none', 'stroke-width': 5, 'stroke-linecap': 'round', transform: 'rotate(-90 50 50)' });
      const ringEl = el('svg', { class: k('rg'), viewBox: '0 0 100 100', 'aria-hidden': 'true', style: 'display:none' }, ringC);
      const hit = el('div', { class: k('hit'), 'aria-hidden': 'true', onclick: floorDown });
      const gal = el('div', { class: k('gal') });
      const stage = el('div', { class: k('stg') }, gal);
      for (let i = 0; i < 40; i++) S.fp.push(el('span', { class: k('fp'), 'aria-hidden': 'true', style: 'display:none', text: '\u{1F463}' }));
      const lblHead = el('div', { class: k('lh') }), lblText = el('div', { class: k('lt') }), lblNote = el('div', { class: k('ln') });
      const dpad = el('div', { class: k('dp') + (coarse ? ' ' + k('on') : ''), role: 'group', 'aria-label': 'Walk' },
        el('button', { type: 'button', 'aria-label': 'Walk up', style: 'grid-column:2;grid-row:1', text: '▲', onclick: () => keyStep(0, -1) }),
        el('button', { type: 'button', 'aria-label': 'Walk left', style: 'grid-column:1;grid-row:2', text: '◀', onclick: () => keyStep(-1, 0) }),
        el('button', { type: 'button', 'aria-label': 'Walk down', style: 'grid-column:2;grid-row:2', text: '▼', onclick: () => keyStep(0, 1) }),
        el('button', { type: 'button', 'aria-label': 'Walk right', style: 'grid-column:3;grid-row:2', text: '▶', onclick: () => keyStep(1, 0) }));
      const label = el('div', { class: k('lb') }, lblHead, lblText, lblNote, dpad);
      const lcdHead = el('span'), bar = el('i'), sub = el('div', { class: k('sb'), 'aria-hidden': 'true' }), live = el('div', { class: k('sr'), 'aria-live': 'polite' });
      const lcd = el('div', { class: k('lcd') }, el('div', { class: k('l1') }, lcdHead, el('span', { class: k('bt'), text: 'BAT [|__] 3%' })), el('div', { class: k('pb') }, bar), sub, live);
      const digitKeys = [];
      for (let d = 0; d <= 9; d++) digitKeys.push(el('button', { type: 'button', class: k('kb') + ' ' + k('a' + d), 'aria-label': 'Key ' + d, text: String(d), onclick: () => { spamNote('kpad'); kpress(String(d)); } }));
      const goKey = el('button', { type: 'button', class: k('kb') + ' ' + k('ago') + ' ' + k('go'), 'aria-label': 'Play', text: 'PLAY', onclick: () => { spamNote('kpad'); kplay(); } });
      const clKey = el('button', { type: 'button', class: k('kb') + ' ' + k('acl') + ' ' + k('cl'), 'aria-label': 'Clear', text: 'CLEAR', onclick: () => { spamNote('kpad'); kclear(); } });
      const hfKey = el('button', { type: 'button', class: k('kb') + ' ' + k('ahf') + ' ' + k('hid'), 'aria-label': 'Half key', text: '1/2', onclick: () => { spamNote('kpad'); khalf(); } });
      const kpad = el('div', { class: k('kp'), role: 'group', 'aria-label': 'Keypad' }, ...digitKeys, hfKey, clKey, goKey);
      const colBtn = el('button', { type: 'button', 'aria-label': 'Collapse handset', 'aria-expanded': 'true', text: '▾', onclick: () => toggleHandset() });
      const cord = el('svg', { viewBox: '0 0 64 26', 'aria-hidden': 'true' }, el('path', { d: 'M2 2 C 10 26, 18 0, 26 22 S 44 6, 62 24', fill: 'none', stroke: '#2b2420', 'stroke-width': 3 }));
      const hs = el('div', { class: k('hs') }, el('div', { class: k('hb') }, el('b', { text: 'AUDIO GUIDE 1987' }), colBtn), lcd, kpad, cord);
      const dock = el('div', { class: k('dk') }, label, hs);
      root.appendChild(strip); root.appendChild(stage); root.appendChild(dock);
      /* ---------- small helpers ---------- */
      const platPos = (c) => WINGS[S.wing].plinths[c] || SELF_POS[c] || [0, 0];
      const stampCount = () => CODES12.filter((c) => D.heard.indexOf(c) >= 0).length;
      const catalogue = () => 12 + D.trails + S.selfEarned.length + Math.floor(S.completed / 5) + S.capAdd;
      const fm = (n) => String(r2(n));
      const vOf = (c) => (EX[c] ? EX[c].v : /^\d+$/.test(c) && num(+c) >= 13 && +c < 13 + D.trails ? 'your own earlier walk' : c === '99' ? 'a visitor, standing' : c === '120' ? 'a certificate, framed' : 'a thing');
      const touch = () => { S.lastInput = api.now(); S.touched = true; S.warned = false; S.warned2 = false; S.nudged = false; if (S.idle !== 'awake') releaseStatue(); };
      function flash(text, ms) { S.lcdFlash = { text: text, until: api.now() + ms }; paintHead(); api.setTimeout(paintHead, ms + 40); }
      function refocus() { try { const a = document.activeElement; if (!a || !root.contains(a)) root.focus({ preventScroll: true }); } catch (e) { /* focus is optional */ } }
      /* ---------- meter, passport, strip ---------- */
      function meterVal() {
        if (D.reprise) return { v: 3.1, raw: 3.1 };
        const raw = S.completed < 1 ? 3.1 : 3.1 + 0.8 * Math.sin(S.completed * 1.7 + catalogue() * 0.9);
        return { v: Math.round(clamp(raw, 2.4, 3.9) * 10) / 10, raw: raw };
      }
      function paintMeter() {
        const m = meterVal();
        if (m.raw >= 3.85 && !S.capSaid && !D.reprise) { S.capSaid = true; S.capAdd++; say(L.meterCap.replace(/%pct%/g, m.v.toFixed(1)), 'Management', 'smug', 1); }
        if (m.v <= S.meterPrev - 0.3 + 1e-9) meterEl.title = L.meterTip; else if (!meterEl.title) meterEl.title = L.meterNote.replace('%pct%', m.v.toFixed(1));
        S.meterPrev = m.v;
        meterEl.textContent = 'Museum completed: ' + m.v.toFixed(1) + '%';
      }
      function stampBox(code, fresh) {
        const i = CODES12.indexOf(code); if (i < 0) return;
        const b = boxes[i]; b.style.setProperty('--ink', fresh ? api.pick(INKS) : INKS[i % 3]); b.style.setProperty('--r', (fresh ? api.randInt(-12, 12) : (i * 7 % 25) - 12) + 'deg');
        b.classList.add(k('on')); b.title = 'Exhibit ' + code + ' (stamped)';
        ppEl.setAttribute('aria-label', 'Visitor Passport: ' + stampCount() + ' of 12');
      }
      function paintStrip() {
        wingNm.textContent = WINGS[S.wing].name; storEl.textContent = 'Storage (unheard): ' + D.storage + '%';
        paintMeter();
      }
      /* ---------- LCD, karaoke, tracks ---------- */
      function headText() {
        const tr = S.track;
        if (S.lcdFlash && api.now() < S.lcdFlash.until) return S.lcdFlash.text;
        if (S.code) return 'CODE ' + S.code.replace('.5', ' 1/2') + '_';
        if (tr) return (tr.heads && tr.heads[tr.i]) || tr.head || 'TRACK';
        if (S.idle === 'statue') return 'EXHIBIT 99';
        if (S.mode === 'shop') return 'GIFT SHOP'; if (S.mode === 'staff') return 'STAFF ONLY'; if (S.mode === 'cert') return 'CERTIFIED';
        if (S.range) return 'TRACK ' + S.range + ' READY. PRESS PLAY';
        return 'WALK TO AN EXHIBIT';
      }
      function paintHead() {
        lcdHead.textContent = headText();
        lcdHead.classList.toggle(k('bl'), !!S.range && !S.track && !S.code && !(S.lcdFlash && api.now() < S.lcdFlash.until) && S.mode === 'gallery');
      }
      let subSpans = [];
      function renderSub(groups, on) {
        subSpans = groups.map((g, i) => el('span', { class: i === on ? k('on') : '', text: g }));
        const kids = []; subSpans.forEach((s, i) => { kids.push(s); if (i < subSpans.length - 1) kids.push(' '); });
        sub.replaceChildren(...kids);
      }
      function hilite(g) { subSpans.forEach((s, i) => s.classList.toggle(k('on'), i === g)); }
      function splitGroups(text) { const w = words(text), out = []; for (let i = 0; i < w.length; i += 3) out.push(w.slice(i, i + 3).join(' ')); return out.length ? out : ['...']; }
      function sentMs(t, tr) { const read = 800 + words(t).length * 260; return Math.max(40, Math.round(Math.max(tr.ms || 2200, read) * SC)); } /* about 4 words a second, so a punchline can be read */
      function dropGhost(tr) { if (tr && tr.ghost) { if (tr.ghost.parentNode) tr.ghost.parentNode.removeChild(tr.ghost); tr.ghost = null; } }
      function cancelQuiet() { const tr = S.track; if (tr) { api.clearTimeout(tr.timer); dropGhost(tr); S.track = null; } S.token++; }
      const MIRROR = { mismatch: 1, special: 1, intro: 1, cert: 1, tape: 1 }, DONE_FLASH = { correct: 1, mismatch: 1, trail: 1, cert: 1, tape: 1 };
      function startTrack(o) {
        cancelQuiet();
        if (S.kpTimer) { api.clearTimeout(S.kpTimer); S.kpTimer = 0; }
        S.code = ''; S.hesBad = true;
        if (o.kind !== 'special' && S.lcdFlash && S.lcdFlash.text === 'COMPLETE') S.lcdFlash = null;
        const tr = { token: S.token, i: 0, g: 0, n: o.sents.length, groups: [], timer: 0, kind: o.kind, code: o.code || '', stand: !!o.stand, head: o.head || '', heads: o.heads || null, sents: o.sents, ms: o.ms || 0, onDone: o.onDone || null, S: o.S || '', noSay: !!o.noSay, bump: !!o.bump, ghost: null };
        S.track = tr;
        if (!o.noSay && o.sents[0]) api.say(pl(o.sents[0]), { who: o.who || 'Audio Guide', priority: 0 });
        runSentence(tr); paintHead(); paintLabel();
      }
      function runSentence(tr) {
        if (S.track !== tr || tr.token !== S.token) return;
        const s = pl(tr.sents[tr.i] || ''); tr.groups = splitGroups(s); tr.g = 0;
        renderSub(tr.groups, 0); live.textContent = (tr.i === 0 && !tr.noSay) ? '' : s; bar.style.width = clamp(tr.i / Math.max(1, tr.n) * 100, 0, 100) + '%';
        tr.gms = Math.max(8, Math.round(sentMs(s, tr) / tr.groups.length));
        if (tr.kind === 'mismatch' && tr.n > 1 && tr.i === tr.n - 1) {
          guide(s, 1); /* the punchline also lands in Management's bubble */
          const pp = S.pl[tr.code];
          if (tr.bump && pp) { pp.ob.classList.remove(k('bump')); void pp.ob.offsetWidth; pp.ob.classList.add(k('bump')); }
        }
        stepGroup(tr); paintHead(); paintRing(); if (MIRROR[tr.kind]) paintLabel();
      }
      function stepGroup(tr) {
        tr.timer = api.setTimeout(() => {
          if (S.track !== tr || tr.token !== S.token) return;
          tr.g++;
          if (tr.g < tr.groups.length) { hilite(tr.g); paintRing(); stepGroup(tr); } else { tr.i++; if (tr.i < tr.n) runSentence(tr); else finishTrack(tr); }
        }, tr.gms);
      }
      function finishTrack(tr) {
        if (S.track !== tr) return;
        S.track = null; dropGhost(tr); bar.style.width = '100%'; paintRing(); S.lastTalk = api.now();
        if (DONE_FLASH[tr.kind]) flash('COMPLETE', 2600);
        if (tr.kind === 'intro' || tr.kind === 'special') { const tk = S.token; api.setTimeout(() => { if (!S.track && tk === S.token && !S.code) sub.replaceChildren(el('span', { text: 'Stand near an exhibit. Press PLAY.' })); }, 3000); }
        if (tr.onDone) tr.onDone(tr);
        paintHead(); paintLabel();
      }
      function special(list, head, who) { startTrack({ kind: 'special', sents: list, head: head || 'GUIDE', who: who }); }
      function wanderOut() {
        const tr = S.track; if (!tr || !tr.stand) return;
        api.clearTimeout(tr.timer); dropGhost(tr); S.token++; S.track = null;
        const n = Math.max(1, tr.n), len = Math.max(1, tr.groups.length);
        let pct = clamp(Math.round(100 * (tr.i + tr.g / len) / n), 0, 100);
        const last = tr.i >= tr.n - 1 && tr.g >= len - 1; if (last) pct = 100;
        const cut = tr.groups.slice(0, tr.g + 1).join(' ') + '...'; renderSub([cut], 0); bar.style.width = pct + '%';
        const e = EX[tr.code];
        if (e && e.wander) say(e.wander, 'Audio Guide', 'neutral', 0); else say(bWander(), 'Audio Guide', 'neutral', 0);
        const txt = last ? L.partialAll : pct < 10 ? L.partialLow : bPart();
        say(txt.replace(/%pct%/g, String(pct)).replace(/%rest%/g, String(100 - pct)).replace(/%S%/g, tr.S || (e ? e.S : 'the exhibit')), 'Management', 'disappointed', 1);
        if (pct > 0) api.award(r2(0.4 * pct / 100), 'partial track');
        D.storage += 100 - pct; persist(); storEl.textContent = 'Storage (unheard): ' + D.storage + '%'; st('wandered');
        paintHead(); paintRing();
      }
      /* ---------- completion bookkeeping ---------- */
      function trackDone() {
        S.completed++; st('completed');
        if (!D.half && S.completed >= 7) {
          D.half = true; persist(); hfKey.classList.remove(k('hid')); hfKey.classList.add(k('pop')); api.sfx('pop');
          api.setTimeout(() => say(L.halfAppear, 'Audio Guide', 'confused', 1), 900);
        }
        if (S.completed === 1) { api.setTimeout(() => { guide(L.openKeypad, 1); digitKeys.forEach((b) => b.classList.add(k('glow'))); api.setTimeout(() => digitKeys.forEach((b) => b.classList.remove(k('glow'))), 6000); }, 1800); }
        if (S.keepPending) { S.keepPending = false; api.setTimeout(() => guide(L.endKeep, 0), 1500); }
        if (S.completed % 4 === 0 && api.now() - S.lastMgmt > 25000) { S.lastMgmt = api.now(); api.setTimeout(() => { if (!S.track) say(bMgmt().replace('%n%', String(D.heard.length)), 'Management', 'smug', 0); }, 2500); }
        if (S.completed === 3) api.setTimeout(() => say(L.meterNote.replace('%pct%', meterVal().v.toFixed(1)), 'Management', 'neutral', 0), 3000);
        paintMeter(); maybeEnding(); persist();
      }
      function doneCorrect(tr) {
        const code = tr.code, first = D.heard.indexOf(code) < 0;
        api.award(first ? 0.8 + 0.2 * tr.n : 0.2, 'track'); api.sfx('ding'); st('tracks');
        if (first) {
          D.heard.push(code); persist();
          if (CODES12.indexOf(code) >= 0) { stampBox(code, true); api.sfx('stamp'); const n = stampCount(); say(bStamp().replace('%n%', String(n)), 'Management', 'proud', 0); if (n === 6) { say(L.clause, 'Sandra (Compliance)', 'smug', 0); api.setTimeout(() => say(L.cbClause + api.line('tosClause'), 'Sandra (Compliance)', 'smug', 0), 4200); } }
        }
        if (code === '01') ach('laureate');
        if (api.chance(1 / 60)) { api.setTimeout(() => { special([bRare()], 'P.S.'); api.award(1, 'shopping list'); st('lists'); }, 2800); }
        trackDone();
      }
      function trackFor(code) {
        const e = EX[code]; let list = e.track.slice();
        if (code === '10' && api.flag.get('metGerald') && e.geraldTrack) list = e.geraldTrack.slice();
        if (code === '02') { list[1] = S.reprise ? L.gloveReprise : list[1].replace('%loc%', LOC[S.wing] || LOC.A); if (api.flag.get('sock-matcher.gloveKevin')) list.push(L.cbKevin); } // lint-ignore shared callback flags
        if (code === '12' && api.flag.get('metStapler')) list[1] = L.cbStapler;
        if (code === '07' && (api.flag.get('sockSeen') || D.sock)) list[1] = L.cbSock;
        if (code === '03' && (api.flag.get('fax-machine.tuesdayMoved') || api.flag.get('tiny-bureaucracy.tuesday'))) list[2] = L.tueFax; // lint-ignore shared callback flags
        return list.map((s) => s.replace(/%meh%/g, api.fmt(api.meh())));
      }
      function playCorrect(code) {
        const e = EX[code]; if (!e || S.mode !== 'gallery') return;
        const t = S.track; if (t && t.kind === 'correct' && t.code === code) return;
        S.everPlayed = true; api.sfx('blip');
        if (code === '10' && api.flag.get('metGerald') && !S.geraldSaid) { S.geraldSaid = true; api.setTimeout(() => say(L.geraldAwed, 'Audio Guide', 'confused', 1), 800); }
        let list = trackFor(code), v0 = false;
        if (!S.v0 && D.heard.length >= 2 && list.length > 2 && api.chance(1 / 30)) { S.v0 = v0 = true; list = [list[0]].concat(api.shuffle(L.prev).slice(0, 3)); }
        startTrack({ kind: 'correct', code: code, stand: true, sents: list, head: 'TRACK ' + code, S: e.S, onDone: (tr) => {
          doneCorrect(tr);
          if (v0) { api.award(0.5, 'previous visitor'); st('previous'); api.setTimeout(() => say(L.prevEnd, 'Management', 'confused', 1), 2200); }
        } });
      }
      function playMismatch(stand, typed) {
        const e = EX[stand]; if (!e || !e.S) return;
        const key = stand + '>' + typed; let text;
        if (L.overrides[key]) text = L.overrides[key] + (api.chance(0.5) ? ' ' + bClose() : '');
        else text = bOpen().replace(/%S%/g, e.S).replace(/%V%/g, vOf(typed)) + '. ' + bClose();
        S.everPlayed = true;
        if (!S.mismatchSaid) { S.mismatchSaid = true; api.setTimeout(() => say(L.mgmtMismatch, 'Management', 'smug', 1), 3500); }
        startTrack({ kind: 'mismatch', code: stand, stand: true, sents: sents(text), head: 'TRACK ' + typed, S: e.S, ms: 2600, bump: key === '01>02' || key === '12>10' || key === '08>09', onDone: () => {
          const first = !pairSet.has(key);
          if (first && pairSet.size < 160) pairSet.add(key);
          api.award(first ? 0.4 : 0.1, 'mismatch'); api.sfx('ding'); api.stat.set(ID + '.mismatch', pairSet.size);
          if (pairSet.size >= 24) ach('cartographer');
          trackDone();
        } });
        const mt = S.track, pp = S.pl[stand];
        if (mt && mt.kind === 'mismatch' && pp) { /* the typed object stands beside the dome, uninvited */
          const ge = EX[typed] ? EX[typed].e || '❔' : typed === '99' ? '\u{1F5FF}' : typed === '120' ? '\u{1F4DC}' : '\u{1F463}';
          mt.ghost = el('span', { class: k('fr') + ' ' + k('gh'), 'aria-hidden': 'true', text: ge }); pp.b.appendChild(mt.ghost);
        }
      }
      function trailSentences(T) {
        const m = Math.max(0, Math.floor((api.now() - T.at) / 60000)), ago = m === 0 ? 'just now' : m === 1 ? '1 minute ago' : m + ' minutes ago';
        const pt = (n, w) => n + ' ' + w + (n === 1 ? '' : 's');
        return ['Exhibit ' + T.n + ': Your Earlier Walk, c. ' + ago + '. Please do not retrace it. It is fragile.', 'You walked ' + pt(T.tiles, 'tile') + '. Experts agree this is a number.',
          'You turned left ' + pt(T.lefts, 'time') + '. The museum calls this a pattern. The cleaners call it a mop route.',
          T.hes > 0 ? 'You hesitated ' + pt(T.hes, 'time') + '. Please admire the hesitation. It was donated.' : 'You did not hesitate. We have noted the absence, and framed it.', L.trailSandra2];
      }
      function playTrail(T) {
        if (!T || S.mode !== 'gallery') return;
        startTrack({ kind: 'trail', code: String(T.n), sents: trailSentences(T), head: 'EXHIBIT ' + T.n, onDone: () => { if (!T.heard) { T.heard = true; api.award(0.4, 'own walk'); } api.sfx('ding'); trackDone(); } });
      }
      function play99() {
        startTrack({ kind: 'idle', code: '99', sents: [L.idleTrack], head: 'TRACK 99', onDone: () => { api.award(0.1, 'standing'); trackDone(); } });
      }
      /* ---------- keypad ---------- */
      const norm = (raw) => { if (!/^\d+$/.test(raw)) return raw; if (raw.length === 1) return '0' + raw; return raw.replace(/^0+(?=\d{2})/, ''); };
      function spamNote(kind) {
        if (S.mode !== 'gallery') return;
        const now = api.now(); S.spamClicks = S.spamClicks.filter((c) => now - c.t < 6000); S.spamClicks.push({ t: now, kind: kind });
        const n = S.spamClicks.length;
        if (n >= 12 && !S.spamTapped) { S.spamTapped = true; say(L.spamTap, 'Management', 'confused', 0); }
        if (n === 15 && S.spamLvl === 0) say(bWarn(), 'Audio Guide', 'panic', 0);
        const lvl = n >= 42 ? 3 : n >= 32 ? 2 : n >= 22 ? 1 : 0;
        if (S.spamLvl > 0 || lvl > 0) { api.clearTimeout(S.spamTimer); S.spamTimer = api.setTimeout(restoreSpam, 6000); }
        if (lvl > S.spamLvl) applySpam(lvl, kind);
      }
      function spamTarget() {
        let best = null, bd = 1e9; Object.keys(S.pl).forEach((c) => { const p = platPos(c), d = Math.hypot(p[0] - S.tile.x, p[1] - S.tile.y); if (d < bd) { bd = d; best = c; } }); return best;
      }
      function paintPhoto(code, lvl) {
        const p = S.pl[code]; if (!p) return;
        p.b.classList.toggle(k('lift'), lvl > 0);
        if (lvl <= 0) { p.ob.textContent = EX[code].e; return; }
        let inner = el('span', { text: EX[code].e });
        for (let i = 0; i < lvl; i++) inner = el('span', { class: k('fr'), style: 'font-size:' + (i === 0 ? 1 : 0.9) + 'em' }, inner);
        p.ob.replaceChildren(inner);
      }
      function applySpam(lvl, kind) {
        const first = S.spamLvl === 0; S.spamLvl = lvl; st('spam');
        if (first) { S.spamTimes++; colinDash(); api.award(-0.5, 'fine'); api.sfx('whoosh'); say(L.spamFine, 'Colin', 'smug', 1); if (S.spamTimes > 1) api.setTimeout(() => say(bAgain(), 'Colin', 'smug', 0), 2600); }
        if (kind === 'kpad') {
          S.kpDead = api.now() + 3000; flash('BATTERY 3%', 3000); api.sfx('sad'); S.code = '';
          if (first) { special([bKsp()], 'BATTERY 3%'); say(L.spamSigh, 'Audio Guide', 'disappointed', 1); }
          return;
        }
        const t = S.spamPhoto || spamTarget(); S.spamPhoto = t;
        if (t) paintPhoto(t, lvl);
        say(lvl === 1 ? L.spam1 : lvl === 2 ? L.spam2 : L.spam3, 'Management', 'panic', 1);
        if (lvl >= 3) { ach('conservation'); api.confetti(); }
      }
      function restoreSpam() {
        if (S.spamLvl === 0) return;
        if (S.spamPhoto) paintPhoto(S.spamPhoto, 0);
        S.spamPhoto = null; S.spamLvl = 0; S.spamClicks = []; S.spamTapped = false; say(bRest(), 'Management', 'neutral', 0);
      }
      function kpress(ch) {
        if (S.mode !== 'gallery') return;
        if (api.now() < S.kpDead) { api.sfx('buzz'); return; }
        if (S.code.length + ch.length > 6) { api.sfx('buzz'); flash('KEYPAD FULL', 1400); guide(bCap(), 0); st('capped'); return; }
        S.kpadUsed = true; S.code += ch; api.sfx('blip'); api.clearTimeout(S.kpTimer);
        if (S.lcdFlash && S.lcdFlash.text === 'COMPLETE') S.lcdFlash = null;
        paintHead();
        if (S.code.length >= 2) { const tk = S.token; S.kpTimer = api.setTimeout(() => { if (tk === S.token && S.code) kplay(); }, 1000); }
      }
      function khalf() {
        if (S.mode !== 'gallery') return;
        if (!D.half) { api.sfx('buzz'); flash('NO SUCH KEY', 1400); guide(L.noKey, 0); return; }
        if (!S.code) { api.sfx('buzz'); return; }
        if (S.code.indexOf('.') >= 0) { api.sfx('buzz'); return; }
        kpress('.5');
      }
      function kback() { if (S.code) { S.code = S.code.endsWith('.5') ? S.code.slice(0, -2) : S.code.slice(0, -1); api.sfx('blip'); api.clearTimeout(S.kpTimer); paintHead(); } }
      function kclear() { S.code = ''; api.clearTimeout(S.kpTimer); api.sfx('pop'); paintHead(); }
      function toggleHandset() {
        const nn = api.now(); S.hsT = S.hsT.filter((t) => nn - t < 6000); S.hsT.push(nn);
        if (S.hsT.length === 6) say(L.hs1, 'Audio Guide', 'confused', 0); else if (S.hsT.length === 12) say(L.hs2, 'Audio Guide', 'smug', 0);
        const on = !hs.classList.contains(k('col')); hs.classList.toggle(k('col'), on); colBtn.setAttribute('aria-expanded', on ? 'false' : 'true'); colBtn.setAttribute('aria-label', on ? 'Expand handset' : 'Collapse handset'); colBtn.textContent = on ? '▴' : '▾'; }
      function kplay() {
        if (S.mode !== 'gallery') return;
        if (api.now() < S.kpDead) { api.sfx('buzz'); return; }
        api.clearTimeout(S.kpTimer);
        if (!S.code) {
          if (S.range) playCorrect(S.range); else { api.sfx('buzz'); flash('NOTHING TO DESCRIBE', 1600); special([L.noStand], 'NO EXHIBIT'); }
          return;
        }
        const buf = S.code; S.code = ''; resolve(buf);
      }
      function resolve(raw) {
        const shown = raw.replace('.5', ' 1/2'), head = 'TRACK ' + shown;
        if (raw === '7.5') return halfDoor();
        if (raw === '2.5') return special([L.sp25], head, 'Right Glove');
        if (raw === '418') { special([L.sp418], head); clockMinute(); return; }
        const SP = { '00': L.sp00, '404': L.sp404, '666': L.sp666, '911': L.sp911, '999': L.sp999, '100': L.sp100, '1234': L.sp1234, '31': L.sp31, '77': L.sp77, '417': L.sp417 };
        if (raw === '000') { S.zeros++; special([S.zeros === 3 ? L.sp000b : L.sp000], head); if (S.zeros === 3) st('zero'); return; }
        const spk = raw === '0' ? '00' : raw;
        if (SP[spk]) { special([SP[spk]], head); api.award(0.1, 'catalogue'); return; }
        const code = norm(raw), n = /^\d+$/.test(code) ? +code : -1;
        if (code === '13' && !S.trails.some((t) => t.n === 13)) return special([L.sp13], head);
        if (code === '99' && !D.acc) return special([L.sp99], head);
        const trail = n >= 13 ? S.trails.find((t) => t.n === n) : null;
        const typedValid = (CODES12.indexOf(code) >= 0) || (S.selfEarned.indexOf(code) >= 0) || (code === '99' && D.acc) || !!trail || (code === '120' && D.ending > 0);
        if (!typedValid) return special([bInvalid().replace(/%code%/g, shown)], head);
        const stand = S.range;
        if (stand && code === stand) return playCorrect(stand);
        if (!stand) {
          if (trail) return playTrail(trail);
          if (code === '99') return play99();
          flash('WALK TO SOMETHING', 1600); return special([L.noStand], 'NO EXHIBIT');
        }
        playMismatch(stand, code);
      }
      function halfDoor() {
        S.doorOpen = true; D.door = true; persist(); api.sfx('whoosh');
        say(L.halfDoor, 'Audio Guide', 'confused', 1);
        api.flag.set('museumHalf', true); /* lint-ignore shared cast flag */
        if (!api.flag.get('museum-of-objects.half')) { api.flag.set('museum-of-objects.half', true); api.award(7.5, 'seven and a half'); api.setTimeout(() => say(L.halfPay, 'Management', 'proud', 1), 1500); }
        ach('half'); st('half');
        changeWing('H', 'A');
      }
      /* ---------- label ---------- */
      function paintLabel() {
        let head, text, note = '', cls = k('lt');
        const now = api.now();
        const mtr = S.track;
        if (S.idle !== 'awake') { head = 'Exhibit 99'; text = pl(L.idlePlacard); }
        else if (mtr && MIRROR[mtr.kind]) { head = 'Audio Guide'; text = pl(mtr.sents[mtr.i] || ''); }
        else if (S.range) {
          const code = S.range, e = EX[code], g = S.gaze && S.gaze.code === code ? S.gaze : null, tier = g ? g.tier : 1;
          head = 'Exhibit ' + code + (tier > 1 ? ' - Interpretation Tier ' + tier : '');
          if (tier === 1) text = S.reprise && e.reprise ? e.reprise : code === '10' && api.flag.get('metGerald') ? e.gerald : e.t[0]; else text = e.t[tier - 1];
          text = pl(text.replace(/%meh%/g, api.fmt(api.meh())).replace(/%ago%/g, String(Math.max(0, Math.floor((now - (S.lastClickAt || S.lastInput)) / 1000)))));
          if (code === '03' && tueOn()) text = L.tueLabel;
          if (now < S.yesUntil && S.yesCode === code) { text = 'Yes.'; cls += ' ' + k('big'); }
          else if (g && g.wd) { text = L.withdrawn; cls += ' ' + k('wd'); }
          else if (tier >= 3 && Array.from(tierSet).filter((x) => /:3$/.test(x)).length >= 3) note = S.note || (S.note = bSandra());
        } else { head = 'Wall label'; text = !S.lblFirstDone ? L.lblFirst : (S.lblDefault || (S.lblDefault = bLbl())); }
        lblHead.textContent = head; lblText.className = cls; lblText.textContent = text; lblNote.textContent = note;
      }
      /* ---------- range / ring ---------- */
      function rangeCode() {
        if (S.walk || S.mode !== 'gallery') return null;
        let best = null, bd = 99;
        Object.keys(S.pl).forEach((c) => {
          const p = platPos(c), dx = Math.abs(p[0] - S.tile.x), dy = Math.abs(p[1] - S.tile.y);
          if (Math.max(dx, dy) <= 1) { const d = Math.hypot(dx, dy); if (d < bd - 1e-9 || (Math.abs(d - bd) < 1e-9 && best !== null && c < best)) { best = c; bd = d; } }
        });
        return best;
      }
      function refreshRange() {
        const prevRange = S.range; S.range = rangeCode(); S.lblDefault = null;
        S.r03At = S.range === '03' ? (S.r03At || api.now()) : 0;
        if (S.range && S.range !== prevRange && !S.track && S.idle === 'awake') live.textContent = 'Exhibit ' + S.range + ' in range. Press Play or Enter to hear the track.';
        Object.keys(S.pl).forEach((c) => S.pl[c].b.classList.toggle(k('lit'), c === S.range));
        paintHead(); paintLabel(); paintRing();
      }
      function paintRing() {
        let code = null, prog = 0, gz = false; const tr = S.track;
        if (S.gaze) { code = S.gaze.code; prog = clamp(S.gaze.t / 12, 0, 1); gz = true; }
        else if (tr && tr.stand && S.pl[tr.code]) { code = tr.code; prog = clamp((tr.i + tr.g / Math.max(1, tr.groups.length)) / Math.max(1, tr.n), 0, 1); }
        if (!code || !S.pl[code] || S.mode !== 'gallery') { show(ringEl, false); return; }
        const p = platPos(code); show(ringEl, true);
        ringEl.style.left = pc(p[0] + 0.5 - 1.3, 11); ringEl.style.top = pc(p[1] + 0.5 - 1.3, 7); ringEl.style.width = pc(2.6, 11); ringEl.style.height = pc(2.6, 7);
        ringEl.classList.toggle(k('gz'), gz); ringC.style.strokeDashoffset = String(283 * (1 - prog));
      }
      /* ---------- grid, walking ---------- */
      const inb = (x, y) => x >= 0 && y >= 0 && x <= 10 && y <= 6;
      const passable = (x, y) => inb(x, y) && !S.blocked.has(x + ',' + y);
      const doorAt = (x, y) => WINGS[S.wing].doors.find((d) => d.x === x && d.y === y);
      function distMap(sx, sy) {
        const dist = new Array(77).fill(-1), prev = new Array(77).fill(-1), q = [[sx, sy]]; dist[sy * 11 + sx] = 0;
        for (let h = 0; h < q.length; h++) {
          const x = q[h][0], y = q[h][1], d = dist[y * 11 + x];
          if (h > 0 && doorAt(x, y)) continue;
          [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach((v) => { const nx = x + v[0], ny = y + v[1]; if (passable(nx, ny) && dist[ny * 11 + nx] < 0) { dist[ny * 11 + nx] = d + 1; prev[ny * 11 + nx] = y * 11 + x; q.push([nx, ny]); } });
        }
        return { dist: dist, prev: prev };
      }
      function pathTo(sx, sy, tx, ty) {
        const m = distMap(sx, sy); if (!inb(tx, ty) || m.dist[ty * 11 + tx] < 0) return null;
        const out = []; let c = ty * 11 + tx; while (c >= 0) { out.unshift([c % 11, Math.floor(c / 11)]); c = m.prev[c]; }
        return out;
      }
      function nearestPath(sx, sy, tx, ty, ring) {
        let best = null;
        for (let r = 0; r <= (ring || 2) && !best; r++) {
          for (let dy = -r; dy <= r; dy++) for (let dx = -r; dx <= r; dx++) {
            if (Math.max(Math.abs(dx), Math.abs(dy)) !== r) continue;
            const p = pathTo(sx, sy, tx + dx, ty + dy);
            if (p && (!best || p.length < best.length)) best = p;
          }
        }
        return best;
      }
      const curTile = () => (S.walk ? { x: S.walk.path[S.walk.i + 1][0], y: S.walk.path[S.walk.i + 1][1] } : S.tile);
      function onStepBegin() {
        wanderOut(); endGaze(true);
        const now = api.now(), gap = now - S.lastStop;
        if (S.lastStop && !S.hesBad && gap >= 1500 && gap <= 8000) S.seg.hes++;
        S.hesBad = false; S.range = null; S.lblDefault = null;
        Object.keys(S.pl).forEach((c) => S.pl[c].b.classList.remove(k('lit')));
        paintHead(); paintLabel(); paintRing();
      }
      function startWalk(path, after) {
        if (S.mode !== 'gallery' || !path || path.length < 2) { if (after && path && path.length < 2) after(); return; }
        touch();
        if (S.walk) { const w = S.walk; w.path = w.path.slice(0, w.i + 2).concat(path.slice(1)); }
        else { onStepBegin(); S.walk = { path: path, i: 0, t: 0 }; }
        S.after = after || null; S.walkId++;
      }
      function keyStep(dx, dy) {
        if (S.mode !== 'gallery') return;
        touch(); if (dx) S.face = dx;
        if (S.walk) { S.queued = [dx, dy]; return; }
        const tx = S.tile.x + dx, ty = S.tile.y + dy;
        if (!passable(tx, ty)) { gal.classList.remove(k('bump')); void gal.offsetWidth; gal.classList.add(k('bump')); const d = doorAt(tx, ty); if (d && d.painted && !S.doorOpen) say(bPainted(), 'Audio Guide', 'neutral', 0); else if (d && d.to === 'STAFF' && !doorOpenNow(d)) say(L.staffLocked, 'Audio Guide', 'confused', 0); return; }
        S.after = null; startWalk([[S.tile.x, S.tile.y], [tx, ty]], null);
      }
      function floorDown(e) {
        if (S.mode !== 'gallery') return;
        touch();
        const tn = api.now(); S.floorClicks = S.floorClicks.filter((t) => tn - t < 3000); S.floorClicks.push(tn);
        if (S.floorClicks.length >= 15 && tn - S.floorSpamAt > 20000) { S.floorSpamAt = tn; S.floorClicks = []; st('floorspam'); say(bFloor(), 'Audio Guide', 'confused', 1); }
        const r = gal.getBoundingClientRect(), bw = gal.clientLeft, bh = gal.clientTop; if (!gal.clientWidth || !gal.clientHeight) return;
        const col = clamp(Math.floor((num(e.clientX) - r.left - bw) / gal.clientWidth * 11), 0, 10), row = clamp(Math.floor((num(e.clientY) - r.top - bh) / gal.clientHeight * 7), 0, 6);
        const from = curTile();
        const p = passable(col, row) ? pathTo(from.x, from.y, col, row) : nearestPath(from.x, from.y, col, row, 2);
        if (p) startWalk(p, null);
      }
      function walkToPlinth(code) {
        const p = platPos(code), from = curTile(); let best = null;
        for (let dy = -1; dy <= 1; dy++) for (let dx = -1; dx <= 1; dx++) {
          if (!dx && !dy) continue;
          const tx = p[0] + dx, ty = p[1] + dy; if (!passable(tx, ty) || doorAt(tx, ty)) continue;
          const pa = pathTo(from.x, from.y, tx, ty); if (pa && (!best || pa.length < best.length)) best = pa;
        }
        if (best) startWalk(best, () => { if (S.range === code) playCorrect(code); });
      }
      function arrive(x, y) {
        const dx = x - S.tile.x, dy = y - S.tile.y;
        S.tile = { x: x, y: y }; if (dx) S.face = dx;
        st('tiles'); S.strolled++;
        if (S.strolled % 25 === 0) api.award(0.1, 'stroll');
        S.seg.tiles++; S.pts.push({ x: x, y: y }); if (S.pts.length > 200) S.pts.shift();
        if (S.lastVec && (dx || dy)) { const cross = S.lastVec[0] * dy - S.lastVec[1] * dx; if (cross < 0) S.seg.lefts++; }
        if (dx || dy) S.lastVec = [dx, dy];
        const f = S.fp[S.fpi]; S.fpi = (S.fpi + 1) % 40;
        f.style.left = pc(x, 11); f.style.top = pc(y, 7); f.style.transform = 'rotate(' + (dx > 0 ? 90 : dx < 0 ? -90 : dy > 0 ? 180 : 0) + 'deg)'; show(f, true);
        const d = doorAt(x, y);
        if (d) { S.walk = null; S.queued = null; S.after = null; S.lastStop = api.now(); enterDoor(d); return; }
        maybeFreeze();
      }
      function stepWalk(dt) {
        const w = S.walk; if (!w) return;
        S.walkMs += dt * 1000;
        let rem = dt * 5, guard = 0;
        while (rem > 0 && S.walk === w && guard++ < 20) {
          const a = w.path[w.i], b = w.path[w.i + 1]; if (!b) { finishWalk(); break; }
          const left = 1 - w.t;
          if (rem >= left) {
            rem -= left; w.i++; w.t = 0; S.pos = { x: b[0], y: b[1] }; arrive(b[0], b[1]);
            if (S.walk !== w) break;
            if (w.i >= w.path.length - 1) { finishWalk(); break; }
          } else { w.t += rem; rem = 0; S.pos = { x: a[0] + (b[0] - a[0]) * w.t, y: a[1] + (b[1] - a[1]) * w.t }; }
        }
        paintVisitor();
      }
      function finishWalk() {
        const after = S.after; S.walk = null; S.after = null; S.lastStop = api.now();
        S.pos = { x: S.tile.x, y: S.tile.y }; paintVisitor(); refreshRange();
        if (S.queued) { const q = S.queued; S.queued = null; keyStep(q[0], q[1]); return; }
        if (after) after();
      }
      function placeVisitor(x, y) { S.tile = { x: x, y: y }; S.pos = { x: x, y: y }; S.walk = null; S.queued = null; S.after = null; paintVisitor(); }
      function paintVisitor() {
        visEl.style.left = pc(S.pos.x, 11); visEl.style.top = pc(S.pos.y, 7);
        visIn.textContent = S.idle !== 'awake' ? '\u{1F5FF}' : '\u{1F6B6}'; visIn.style.transform = S.face < 0 ? 'scaleX(-1)' : '';
        visEl.classList.toggle(k('wk'), !!S.walk);
      }
      /* ---------- trail freezing ---------- */
      function clearFootprints() { S.fp.forEach((f) => show(f, false)); S.pts = []; }
      function maybeFreeze() {
        if (S.mode !== 'gallery' || S.track || S.seg.tiles < 4) return;
        if (S.walkMs >= (api.selftest ? 6000 : 90000) || S.seg.tiles >= 150) freeze();
      }
      function freeze() {
        const g = S.seg, n = 13 + D.trails, pts = S.pts.slice(), step = Math.max(1, Math.ceil(pts.length / 24)), ds = [];
        for (let i = 0; i < pts.length; i += step) ds.push(pts[i]);
        if (pts.length && ds[ds.length - 1] !== pts[pts.length - 1]) ds.push(pts[pts.length - 1]);
        const corners = []; for (let i = 1; i < pts.length - 1 && corners.length < 8; i++) { const a = pts[i - 1], b = pts[i], c = pts[i + 1]; if ((b.x - a.x) !== (c.x - b.x) || (b.y - a.y) !== (c.y - b.y)) corners.push(b); }
        const T = { n: n, wing: S.wing, pts: ds, corners: corners, tiles: g.tiles, lefts: g.lefts, hes: g.hes, at: api.now(), heard: false };
        S.trails.push(T); if (S.trails.length > 40) S.trails.shift();
        D.trails++; D.best.tiles = Math.max(D.best.tiles, g.tiles); persist(); st('trails');
        S.seg = { tiles: 0, lefts: 0, hes: 0 }; S.walkMs = 0; S.lastVec = null; clearFootprints(); renderTrails(); api.sfx('stamp');
        say(L.trailFreeze, 'Audio Guide', 'proud', 1);
        if (D.trails === 1) { api.setTimeout(() => say(L.trail2, 'Audio Guide', 'smug', 0), 2500); api.setTimeout(() => say(L.trailSandra, 'Sandra (Compliance)', 'smug', 1), 5200); }
        else if (D.trails === 2) api.setTimeout(() => say(L.trailHint, 'Management', 'neutral', 0), 2500);
        api.setTimeout(() => say(L.trailCat.replace('%n%', String(n)).replace('%total%', String(catalogue())), 'Management', 'proud', 0), 4000);
        paintMeter();
      }
      function renderTrails() {
        S.trailEls.forEach((e) => { if (e.parentNode) e.parentNode.removeChild(e); }); S.trailEls = [];
        S.trails.filter((t) => t.wing === S.wing).slice(-4).forEach((T) => {
          const poly = T.pts.map((p) => (p.x + 0.5) + ',' + (p.y + 0.5)).join(' ');
          const svg = el('svg', { class: k('trs'), viewBox: '0 0 11 7', preserveAspectRatio: 'none', 'aria-hidden': 'true' },
            el('polyline', { points: poly || '0,0', fill: 'none', stroke: '#6b1f2a', 'stroke-width': 0.12, 'stroke-dasharray': '0.2 0.25', 'stroke-linecap': 'round', opacity: 0.8 }),
            ...T.corners.map((c) => el('circle', { cx: c.x + 0.5, cy: c.y + 0.5, r: 0.14, fill: '#b8893a', stroke: '#2b2420', 'stroke-width': 0.04 })));
          let cx = 5, cy = 3; if (T.pts.length) { cx = T.pts.reduce((s, p) => s + p.x, 0) / T.pts.length; cy = T.pts.reduce((s, p) => s + p.y, 0) / T.pts.length; }
          const btn = el('button', { class: k('tr'), type: 'button', style: { left: pc(cx + 0.5, 11), top: pc(cy + 0.5, 7) }, 'aria-label': 'Exhibit ' + T.n + ': Your Earlier Walk', onclick: () => { touch(); playTrail(T); } },
            'Exhibit ' + T.n, el('small', { text: 'Your Earlier Walk' }));
          S.trailEls.push(svg, btn); gal.insertBefore(svg, visEl); gal.insertBefore(btn, visEl);
        });
      }
      /* ---------- wings ---------- */
      function mkPlinth(code, pos) {
        const e = EX[code];
        const tue = code === '03' && tueOn(); if (tue) S.tue.seen = true;
        const ob = el('span', { class: k('ob'), text: tue ? '\u{1F4C5}' : e.e }), dm = el('span', { class: k('dm') + (code === '03' ? ' ' + k('tu') : '') });
        const kids = [ob, dm, el('span', { class: k('bs') }, el('b', { text: code }))];
        if (code === '03' && S.reprise) kids.push(el('span', { class: k('pi'), text: L.endTuesday }));
        const b = el('button', { class: k('pl'), type: 'button', 'aria-label': 'Exhibit ' + code + ': ' + e.S, style: { left: pc(pos[0], 11), top: pc(pos[1], 7) },
          onpointerdown: () => plDown(code), onpointerup: plUp, onpointercancel: plUp, onpointerleave: plUp, onclick: () => plClick(code) }, ...kids);
        S.pl[code] = { b: b, ob: ob }; S.blocked.add(pos[0] + ',' + pos[1]); return b;
      }
      function doorOpenNow(d) {
        if (d.painted) return S.doorOpen; if (d.to === 'SHOP') return S.exitShown || exitReady(); if (d.to === 'STAFF') return staffReady(); return true;
      }
      const exitReady = () => secs() >= 270 * SC || D.heard.length >= 6;
      const staffReady = () => stampCount() >= 12 || secs() >= 600 * SC;
      function mkDoor(d) {
        const open = doorOpenNow(d), isExit = d.to === 'SHOP', isStaff = d.to === 'STAFF';
        let sign = d.sign; if (isExit) sign = S.reprise ? 'ENTRANCE' : S.depth >= 4 ? L.shopExit : 'EXIT';
        if (isExit && !open) { S.blocked.add(d.x + ',' + d.y); return null; }
        const cls = k('dr') + (d.painted && !S.doorOpen ? ' ' + k('pt') : '') + (isStaff ? (open ? ' ' + k('aj') : ' ' + k('lk')) : '');
        const b = el('button', { class: cls, type: 'button', 'aria-label': (isStaff ? 'Staff Only door' : d.painted && !S.doorOpen ? 'A painted door' : 'Door: ' + sign), style: { left: pc(d.x, 11), top: pc(d.y, 7) }, onclick: () => doorClick(d) },
          el('span', { class: k('db') }, el('span', { class: k('ds'), text: sign })));
        if (open) S.blocked.delete(d.x + ',' + d.y); else S.blocked.add(d.x + ',' + d.y);
        S.doorEls[d.to] = b; return b;
      }
      function doorClick(d) {
        if (S.mode !== 'gallery') return; touch(); api.sfx('pop');
        if (!doorOpenNow(d)) {
          if (d.painted) say(bPainted(), 'Audio Guide', 'neutral', 0); else if (d.to === 'STAFF') say(L.staffLocked, 'Audio Guide', 'confused', 0);
          return;
        }
        const from = curTile(), p = pathTo(from.x, from.y, d.x, d.y); if (p) startWalk(p, null);
      }
      function buildWing(wk) {
        const W = WINGS[wk]; S.wing = wk; S.pl = {}; S.doorEls = {}; S.blocked = new Set();
        const kids = [hit, el('div', { class: k('tn'), style: { background: TINT[wk] } })];
        Object.keys(W.plinths).forEach((c) => kids.push(mkPlinth(c, W.plinths[c])));
        if (wk === 'A') {
          S.selfEarned.forEach((c) => kids.push(mkPlinth(c, SELF_POS[c])));
          kids.push(el('button', { class: k('dn'), type: 'button', 'aria-label': 'Dennis, a plant', style: { left: pc(0, 11), top: pc(6, 7) }, text: '\u{1F33F}', onclick: dennisClick }));
          S.blocked.add('0,6');
          kids.push(el('button', { class: k('ts'), type: 'button', 'aria-label': 'Turnstile', style: { left: pc(5, 11), top: pc(6, 7) }, text: '\u{1F6A7}', onclick: turnstileClick })); S.blocked.add('5,6');
        }
        W.doors.forEach((d) => { const b = mkDoor(d); if (b) kids.push(b); });
        kids.push(...S.fp);
        gal.replaceChildren(...kids, visEl, colEl, sockEl, flEl, ringEl, plcEl, el('div', { class: k('wl'), 'aria-hidden': 'true' }));
        S.npcs.forEach((n) => gal.appendChild(n));
        gal.classList.toggle(k('hf'), wk === 'H'); root.classList.toggle(k('hush'), wk === 'H');
        renderTrails(); paintStrip(); refocus();
      }
      function spawnFor(to, from) {
        const W = WINGS[to], d = W.doors.find((x) => x.to === from);
        if (!d) return { x: W.start[0], y: W.start[1] };
        const x = d.x === 0 ? 1 : d.x === 10 ? 9 : d.x, y = d.y === 0 ? 1 : d.y === 6 ? 5 : d.y;
        return { x: x, y: y };
      }
      function enterDoor(d) {
        if (d.to === 'SHOP') return openShop(); if (d.to === 'STAFF') return openStaff();
        changeWing(d.to, S.wing);
      }
      function changeWing(to, from) {
        wanderOut(); endGaze(false); S.hesBad = true; clearFootprints(); S.pts = [];
        if (S.spamLvl > 0) restoreSpam();
        const first = !S.visited[to]; S.visited[to] = true;
        buildWing(to); const sp = spawnFor(to, from); placeVisitor(sp.x, sp.y); refreshRange();
        const first1 = { B: L.wingB1, C: L.wingC1, H: L.wingH1 }, back = { A: L.wingAb, B: L.wingBb, C: L.wingCb };
        const line = first ? first1[to] : back[to]; if (line) say(line, 'Audio Guide', 'neutral', 1);
        if (first && LOC[to] && to !== 'A') api.setTimeout(() => say(to === 'B' ? L.gloveB : to === 'C' ? L.gloveC : L.gloveH, 'Audio Guide', 'confused', 0), 2400);
        if (first && to === 'B' && api.flag.get('metToaster')) api.setTimeout(() => { if (S.wing === 'B') say(L.cbToaster, 'Audio Guide', 'smug', 0); }, 5200);
        if (!S.swapped && to !== 'H' && api.chance(1 / 12)) api.setTimeout(swapPlinths, 3600);
        if (to === 'C') enterC();
        else { C.mode = C.mode === 'off' ? 'off' : 'patrol'; show(colEl, false); }
        api.sfx('whoosh');
      }
      /* ---------- plinth interaction ---------- */
      function plDown(code) {
        S.suppress = false; S.ptr = true; touch(); api.clearTimeout(S.holdTimer);
        S.holdTimer = api.setTimeout(() => { if (S.ptr && S.range === code && !S.walk && startGaze(code, 'ptr')) S.suppress = true; }, 400);
      }
      function plUp() {
        api.clearTimeout(S.holdTimer); S.ptr = false; if (S.gaze && S.gaze.src === 'ptr') endGaze(true);
        if (S.suppress) api.setTimeout(() => { S.suppress = false; }, 120); /* a click that never arrives must not swallow a later keyboard Enter */
      }
      function plClick(code) {
        if (S.suppress) { S.suppress = false; return; }
        if (S.mode !== 'gallery') return;
        touch(); spamNote('dome');
        if (S.range === code) playCorrect(code); else walkToPlinth(code);
      }
      const bTurn = Bag(L.turnstiles.concat([L.turnstile]));
      function turnstileClick() {
        if (S.mode !== 'gallery') return; touch(); api.sfx('tick'); st('turnstile'); say(bTurn(), 'Audio Guide', 'neutral', 0);
      }
      function dennisClick() {
        if (S.mode !== 'gallery') return; touch(); api.sfx('pop'); st('dennis'); S.dennisN = (S.dennisN || 0) + 1;
        const known = !S.dennisKnown && S.dennisN > 1 && (api.flag.get('plantClicked') || api.flag.get('metDennis')); // lint-ignore shared cast flags
        if (S.dennisN === 10) say(L.dn10, 'Management', 'smug', 1); else if (S.dennisN === 25) say(L.dn25, 'Management', 'confused', 1);
        else if (known) { S.dennisKnown = true; say(L.dennisKnown, 'Management', 'smug', 0); }
        else if (S.dennisN % 3 === 0) say(api.line('plantStatus'), 'Management', 'proud', 0);
        else say(bDennis(), 'Management', 'smug', 0);
        if (!D.dennis) { D.dennis = true; persist(); api.award(0.2, 'Dennis'); }
      }
      function swapPlinths() {
        const ks = Object.keys(S.pl).filter((c) => EX[c]); if (S.swapped || S.mode !== 'gallery' || S.spamLvl > 0 || ks.length < 2 || S.idle !== 'awake') return;
        const pair = api.shuffle(ks).slice(0, 2), a = pair[0], b = pair[1], tok = ++S.swapTok, wing = S.wing, ea = EX[a].e, eb = EX[b].e;
        S.swapped = true; S.pl[a].ob.textContent = eb; S.pl[b].ob.textContent = ea; api.sfx('boing'); api.award(0.3, 'noticed'); st('swaps');
        const nm = (c) => EX[c].S, up = nm(a).charAt(0).toUpperCase() + nm(a).slice(1);
        say(up + ' and ' + nm(b) + L.swap, 'Audio Guide', 'confused', 1);
        api.setTimeout(() => { if (tok === S.swapTok && S.wing === wing && S.spamLvl === 0 && S.pl[a] && S.pl[b]) { S.pl[a].ob.textContent = ea; S.pl[b].ob.textContent = eb; say(L.swapBack, 'Audio Guide', 'neutral', 0); } }, 24000);
      }
      /* ---------- gaze ---------- */
      function startGaze(code, src) {
        if (S.gaze || S.mode !== 'gallery' || S.walk || !EX[code] || S.range !== code || S.idle !== 'awake') return false;
        if (S.track && S.track.stand) return false;
        S.gaze = { code: code, t: 0, tier: 1, src: src, nine: false, wd: false }; S.hesBad = true; S.gazedEver = true;
        say(L.gazeStart, 'Audio Guide', 'neutral', 0); paintLabel(); paintRing(); return true;
      }
      function endGaze(release) {
        const g = S.gaze; if (!g) return;
        S.gaze = null; S.note = ''; api.clearTimeout(S.wdTimer);
        if (release && g.tier >= 2) say(L.release.replace('%S%', EX[g.code] ? EX[g.code].S : 'the exhibit'), 'Audio Guide', 'smug', 0);
        paintLabel(); paintRing();
      }
      function tierUp(g, tier) {
        g.tier = tier; const key = g.code + ':' + tier;
        if (!tierSet.has(key)) { tierSet.add(key); api.award(0.2, 'gaze'); persist(); }
        st('gaze'); api.sfx('ding'); S.note = '';
        if (tier === 2) say(L.gazeT2, 'Audio Guide', 'neutral', 0);
        if (tier === 3) {
          say(L.gazeT3, 'Audio Guide', 'proud', 0);
          if (!D.sandraYes) { D.sandraYes = true; persist(); S.yesUntil = api.now() + 20000; S.yesCode = g.code; say(L.sandraYes, 'Sandra (Compliance)', 'smug', 1); api.setTimeout(paintLabel, 20100); }
        }
        if (tier === 4) {
          say(L.gazeT4, 'Audio Guide', 'neutral', 1);
          api.clearTimeout(S.wdTimer); S.wdTimer = api.setTimeout(() => { if (S.gaze === g && g.tier === 4) { g.wd = true; paintLabel(); } }, 4000);
        }
        paintLabel();
      }
      function gazeFrame(dt) {
        const g = S.gaze; if (!g) return;
        g.t += dt;
        if (g.tier < 2 && g.t >= 3) tierUp(g, 2); if (g.tier < 3 && g.t >= 7) tierUp(g, 3); if (g.tier < 4 && g.t >= 12) tierUp(g, 4);
        if (!g.nine && g.t >= 9) { g.nine = true; say(L.gaze9, 'Audio Guide', 'smug', 0); }
        if (g.t >= 18) { endGaze(true); return; } /* Tier 4 is reached at 12 s and the withdrawn placard needs 4 more seconds, so the timeout must be later than 16 s */
        paintRing();
      }
      /* ---------- idle: accession, after hours ---------- */
      const IDLE_WIN = api.selftest ? 8000 : 62000;
      function npcSpot(i) { const o = [[-2, -1], [2, -1], [-2, 1], [2, 1], [-1, 2], [1, -2]][i]; return { x: clamp(S.tile.x + o[0], 0, 10), y: clamp(S.tile.y + o[1], 0, 6) }; }
      function accession() {
        S.idle = 'statue'; wanderOut(); endGaze(false); S.code = ''; st('idle'); D.acc = true; persist();
        guide(L.idleAcc, 1); plcEl.classList.add(k('on'));
        for (let i = 0; i < 6; i++) {
          const spot = npcSpot(i), startX = i % 2 ? 11 : -1, startY = (i * 2) % 7;
          const n = el('div', { class: k('np'), 'aria-hidden': 'true', style: { left: pc(startX, 11), top: pc(startY, 7), filter: 'hue-rotate(' + i * 57 + 'deg)' } }, el('span', { style: i % 2 ? 'transform:scaleX(-1);display:block' : 'display:block', text: '\u{1F6B6}' }), i === 2 ? el('span', { text: PENCIL, style: 'position:absolute;right:2%;bottom:6%;font-size:.55em' }) : null);
          S.npcs.push(n); gal.appendChild(n);
          api.setTimeout(() => { n.style.left = pc(spot.x, 11); n.style.top = pc(spot.y, 7); }, 60);
        }
        paintVisitor(); refreshRange(); api.sfx('stamp');
        startTrack({ kind: 'idle', code: '99', sents: [L.idleNpc1, L.idleNpc2, L.idleTrack], head: 'EXHIBIT 99', noSay: true });
        api.setTimeout(() => say(L.idleMgmt, 'Management', 'smug', 1), 3000);
      }
      function clearNpcs() { S.npcs.forEach((n) => { if (n.parentNode) n.parentNode.removeChild(n); }); S.npcs = []; }
      function releaseStatue() {
        const wasAh = S.idle === 'afterhours'; S.idle = 'awake'; clearNpcs(); plcEl.classList.remove(k('on')); gal.classList.remove(k('dim')); show(flEl, false);
        const dn = gal.querySelector('.' + k('dn')); if (dn) dn.classList.remove(k('sp'));
        if (S.track && S.track.kind === 'idle') { cancelQuiet(); }
        S.statueStep = 0; S.ahStep = 0; say(wasAh ? L.ahEnd : bRel(), wasAh ? 'Audio Guide' : 'Management', 'smug', 1);
        if (!D.accGiven) { D.accGiven = true; persist(); api.award(3, 'accessioned'); api.sfx('tada'); }
        ach('exhibit99'); paintVisitor(); refreshRange(); paintHead();
      }
      function afterHours() {
        S.idle = 'afterhours'; gal.classList.add(k('dim')); show(flEl, true); guide(L.ahStart, 1);
        const AH = L.ah.map((s) => { const m = /^([A-Z]+): (.*)$/.exec(s); return m ? { who: m[1], text: m[2] } : { who: 'NOTE', text: s }; });
        startTrack({ kind: 'idle', code: '99', sents: AH.map((x) => x.text), heads: AH.map((x) => x.who), ms: 3000, noSay: true, onDone: () => {
          const dn = gal.querySelector('.' + k('dn')); if (dn) dn.classList.add(k('sp')); say(L.ahDennis, 'Management', 'smug', 1);
        } });
      }
      /* ---------- Colin & the sock ---------- */
      const colActive = () => secs() >= 150 * SC && D.heard.length >= 3;
      function paintColin() { colEl.style.left = pc(C.x, 11); colEl.style.top = pc(C.y, 7); colEl.style.setProperty('--a', C.ang + 'deg'); }
      function enterC() {
        colEl.classList.remove(k('stroll'));
        if (colActive()) {
          if (!S.guardSaid) { S.guardSaid = true; api.setTimeout(() => say(L.guardArrive, 'Management', 'smug', 1), 1500); }
          if (C.mode === 'off' || C.mode === 'dash') C.mode = 'patrol';
          const g = WINGS.C.guard; C.wp = reduced ? api.randInt(0, g.length - 1) : C.wp % g.length; C.x = g[C.wp][0]; C.y = g[C.wp][1]; C.mode = 'patrol'; paintColin(); show(colEl, true);
        }
        S.sockEnterCount++;
        if (!S.sockBusy && ((!D.sock && secs() >= 600 * SC) || api.chance(1 / 45))) api.setTimeout(crossSock, 1800);
        else if (S.guardSaid && !S.nodSaid && api.chance(0.3)) { S.nodSaid = true; api.setTimeout(() => say(L.guardNod, 'Management', 'neutral', 0), 3000); }
      }
      function colinDash() {
        const y = clamp(S.tile.y, 0, 6), fromLeft = S.tile.x > 5; C.mode = 'dash';
        colEl.classList.remove(k('sprint'), k('stroll')); colEl.style.left = pc(fromLeft ? -1 : 11, 11); colEl.style.top = pc(y, 7); show(colEl, true); void colEl.offsetWidth;
        if (!reduced) colEl.classList.add(k('sprint'));
        api.setTimeout(() => { colEl.style.left = pc(S.tile.x + (fromLeft ? -1 : 1), 11); colEl.style.top = pc(y, 7); }, 30);
        api.setTimeout(() => { colEl.classList.remove(k('sprint')); if (S.wing === 'C' && colActive()) { C.mode = 'patrol'; paintColin(); } else { C.mode = colActive() ? 'patrol' : 'off'; show(colEl, false); } }, 1100);
        if (!S.dashSaid) { S.dashSaid = true; say(L.guardDash, 'Colin', 'panic', 1); }
      }
      function colinFrame(dt) {
        if (S.wing !== 'C' || !colActive() || S.mode !== 'gallery') { C.notice = 0; return; }
        if (C.mode === 'off') { C.mode = 'patrol'; show(colEl, true); }
        const vt = S.tile, cd = Math.max(Math.abs(vt.x - Math.round(C.x)), Math.abs(vt.y - Math.round(C.y)));
        if (C.mode === 'patrol') {
          S.rangeT = (S.range && !S.track && !S.walk) ? (S.rangeT || 0) + dt : 0;
          const cond = cd <= 3 && (S.gaze || S.rangeT > 4);
          C.notice = cond ? C.notice + dt : Math.max(0, C.notice - dt);
          if (C.notice >= 1 && !C.noticeSaid) { C.noticeSaid = true; say(L.guardNotice, 'Management', 'smug', 0); }
          if (C.notice < 0.2) C.noticeSaid = false;
          if (C.notice >= 2) { C.notice = 0; moveAlong(); return; }
          if (!reduced) stepColin(dt, WINGS.C.guard[C.wp][0], WINGS.C.guard[C.wp][1], 1.6, () => { C.wp = (C.wp + 1) % WINGS.C.guard.length; });
        } else if (C.mode === 'chase') stepColin(dt, S.tile.x, S.tile.y, 3, nudgeVisitor);
        if (C.mode === 'patrol' || C.mode === 'chase') paintColin();
      }
      function stepColin(dt, tx, ty, sp, reached) {
        const dx = tx - C.x, dy = ty - C.y, d = Math.hypot(dx, dy), mv = sp * dt;
        if (d <= Math.max(mv, 0.05)) { C.x = tx; C.y = ty; reached(); } else { C.x += dx / d * mv; C.y += dy / d * mv; C.ang = Math.atan2(dy, dx) * 180 / Math.PI; }
      }
      function moveAlong() {
        if (api.now() < C.cool) return;
        C.mode = 'chase'; api.sfx('whoosh');
        if (reduced) { C.x = S.tile.x; C.y = S.tile.y; nudgeVisitor(); }
      }
      function nudgeVisitor() {
        const m = distMap(S.tile.x, S.tile.y); let best = null, bs = -1;
        for (let i = 0; i < 77; i++) if (m.dist[i] >= 3) { const x = i % 11, y = Math.floor(i / 11), sc = Math.max(Math.abs(x - Math.round(C.x)), Math.abs(y - Math.round(C.y))) * 10 - m.dist[i] + api.rand(); if (sc > bs && !doorAt(x, y)) { bs = sc; best = [x, y]; } }
        C.cool = api.now() + 20000; C.mode = 'patrol'; C.notice = 0;
        if (best) { wanderOut(); endGaze(false); placeVisitor(best[0], best[1]); refreshRange(); }
        C.moved++; st('moved'); api.award(-0.2, 'fine'); api.sfx('buzz');
        say(bGuard(), 'Colin', 'smug', 1); api.setTimeout(() => say(L.guardFine, 'Colin', 'neutral', 0), 1800);
        if (C.moved === 2) api.setTimeout(() => say(L.guardPointless, 'Management', 'smug', 0), 4200);
        if (C.moved === 3) { ach('chair'); chipEl.textContent = 'Observation Pass (laminated)'; show(chipEl, true); api.setTimeout(() => say(L.guardPass, 'Colin', 'proud', 1), 3200); }
      }
      function crossSock() {
        if (S.sockBusy || S.wing !== 'C' || S.mode !== 'gallery') return;
        S.sockBusy = true; const y = api.pick([5, 6, 1]);
        sockEl.style.top = pc(y, 7); show(sockEl, true);
        if (reduced) { sockEl.style.transition = 'none'; sockEl.style.left = pc(8.5, 11); api.setTimeout(() => { show(sockEl, false); S.sockBusy = false; }, 2000); }
        else {
          sockEl.style.transition = 'none'; sockEl.style.left = '-22%'; void sockEl.offsetWidth; sockEl.style.transition = ''; api.setTimeout(() => { sockEl.style.left = '110%'; }, 30);
          api.setTimeout(() => { show(sockEl, false); S.sockBusy = false; }, 1100);
        }
        api.sfx('whoosh'); api.flag.set('museum-of-objects.sockSeen', true); api.flag.set('museumSockSeen', true); api.flag.set('sockSeen', true); /* lint-ignore shared cast flags */ D.sock = true; persist(); ach('sock'); st('sock');
        say(L.sockCross, 'Audio Guide', 'confused', 1); api.setTimeout(() => say(L.sockWhisper, 'Audio Guide', 'neutral', 0), 3500);
      }
      /* ---------- the clock, the tour group, Tuesday ---------- */
      function clockClick() {
        touch(); S.clockN++; api.sfx('tick');
        if (S.clockN === 3) say(L.clock3, 'Audio Guide', 'confused', 0); else if (S.clockN === 6) say(L.clock6, 'Audio Guide', 'smug', 0); else if (S.clockN >= 8) { S.clockN = 0; clockMinute(); }
      }
      function clockMinute() {
        if (S.clockBusy) return; S.clockBusy = true; clockTxt.textContent = 'TUE 4:18'; api.sfx('bell'); st('minute');
        say(D.minute ? L.clockAgain : L.clockMin, 'Audio Guide', 'panic', 1); D.minute = true; persist(); ach('minute');
        api.setTimeout(() => { clockTxt.textContent = 'TUE 4:17'; S.clockBusy = false; say(L.clockBack, 'Management', 'confused', 0); }, 5000);
      }
      function tourGroup() {
        const y = S.tile.y >= 3 ? 1 : 5, els = []; guide(L.tgIn, 1); api.sfx('whoosh'); st('group'); api.award(0.3, 'tour group');
        for (let i = 0; i < 5; i++) {
          const n = el('div', { class: k('np'), 'aria-hidden': 'true', style: { left: pc(-1 - i * 0.7, 11), top: pc(y, 7), filter: 'hue-rotate(' + (i * 71 + 20) + 'deg)' } }, el('span', { style: 'display:block', text: i === 0 ? '\u{1F6B6}\u{1F6A9}' : '\u{1F6B6}' }));
          gal.appendChild(n); els.push(n);
          api.setTimeout(() => { n.style.left = pc(7.5 - i * 0.8, 11); }, 60);
          api.setTimeout(() => { n.style.left = pc(12 + i * 0.7, 11); }, 9200);
          api.setTimeout(() => { if (n.parentNode) n.parentNode.removeChild(n); }, 13500);
        }
        api.setTimeout(() => say(L.tgFlag, 'Audio Guide', 'smug', 0), 2400); api.setTimeout(() => say(L.tgLook, 'Audio Guide', 'confused', 1), 5200); api.setTimeout(() => say(L.tgOut, 'Management', 'neutral', 0), 10500);
      }
      function paintTue(on) { const p = S.pl['03']; if (p) p.ob.textContent = on ? '\u{1F4C5}' : EX['03'].e; paintLabel(); }
      const tueOn = () => !!(S.tue && api.now() < S.tue.until);
      function tuesdayVisit() {
        const dur = api.selftest ? 3000 : 12000; S.tue = { until: api.now() + dur, met: false, seen: false }; const t = S.tue;
        root.classList.add(k('tuev')); /* the whole museum goes sepia, the clock spins, the crowd and Colin step out */
        api.sfx('bell'); st('tuesday'); say(L.tueIn, 'Audio Guide', 'panic', 1);
        if (S.wing === 'A' && S.mode === 'gallery') { t.seen = true; paintTue(true); }
        api.setTimeout(() => { if (S.tue === t) S.tue = null; root.classList.remove(k('tuev')); paintTue(false); say(t.met || t.seen ? L.tueOut : L.tueMiss, 'Audio Guide', 'neutral', 0); }, dur);
      }
      function tuesdayCameo() { /* a five-second early glimpse, so the tagline pays off before minute ten */
        S.beats.tueEarly = true; api.sfx('bell'); st('cameo'); api.award(0.2, 'Tuesday, briefly'); paintTue(true);
        say(L.tueEarly, 'Audio Guide', 'confused', 1);
        api.setTimeout(() => { if (!tueOn()) paintTue(false); }, api.selftest ? 1500 : 5000);
      }
      function colinCameo() {
        if (S.wing !== 'A' || S.mode !== 'gallery' || C.mode === 'dash' || C.mode === 'chase') return false;
        colEl.classList.remove(k('sprint'), k('stroll'));
        colEl.style.left = pc(-1, 11); colEl.style.top = pc(1, 7); colEl.style.setProperty('--a', '0deg'); show(colEl, true); void colEl.offsetWidth;
        if (reduced) colEl.style.left = pc(9, 11); else { colEl.classList.add(k('stroll')); api.setTimeout(() => { colEl.style.left = pc(11, 11); }, 30); }
        say(L.colCameo, 'Management', 'smug', 1); st('cameo');
        api.setTimeout(() => { colEl.classList.remove(k('stroll')); if (S.wing !== 'C') show(colEl, false); }, reduced ? 3500 : 5300);
        return true;
      }
      const BEATS = [
        [40, () => { if (S.kpadUsed) return; guide(L.beatKpad, 0); digitKeys.forEach((b) => b.classList.add(k('glow'))); api.setTimeout(() => digitKeys.forEach((b) => b.classList.remove(k('glow'))), 6000); }],
        [95, () => say(L.beat95, 'Management', 'smug', 0)], [150, () => { if (!S.gazedEver) guide(L.beatGaze, 0); }], [180, tourGroup],
        [360, () => say(L.beat360, 'Management', 'neutral', 0)], [780, () => say(L.beat780, 'Management', 'confused', 0)]
      ];
      /* ---------- panels: shop, staff, certificate ---------- */
      function openPanel(name) { S.panelAt = api.now(); S.panelN = 0; wanderOut(); endGaze(false); S.walk = null; S.queued = null; S.after = null; S.mode = name; S.hesBad = true; S.code = ''; show(ringEl, false); paintHead(); }
      function closePanel(to) {
        if (S.track && (S.track.kind === 'tape' || S.track.kind === 'cert')) cancelQuiet();
        S.mode = 'gallery'; stage.replaceChildren(gal); buildWing(S.wing); const sp = spawnFor(S.wing, to); placeVisitor(sp.x, sp.y); refreshRange(); refocus(); touch();
      }
      function priceOf(d) { return d <= 1 ? Math.min(5, 3 + 0.05 * api.stat.get(ID + '.postcards')) : SCHED[Math.min(d, 7) - 1]; }
      const priceLabel = (p) => (p <= 0 ? 'free' : fm(p) + ' Meh');
      function nest(depth, code) {
        const cap = Math.min(depth, 9);
        let core = EX[code] ? EX[code].e || '\u{1F4EE}' : '\u{1F4EE}';
        if (cap === 8) core = '\u{1F481}\u{1F4EE}'; else if (cap >= 9) core = '\u{1F6B6}\u{1F440}';
        let inner = el('b', { text: core });
        for (let d = cap; d >= 1; d--) {
          const kids = [el('i', { 'aria-hidden': 'true', text: '\u{1F4EE}' }), inner];
          inner = el('div', { class: k('cd') + (d === 1 ? ' ' + k('cd0') : ''), style: 'opacity:' + (1 - (d - 1) * 0.04) }, ...kids);
        }
        return inner;
      }
      let shopNote = '', shopFocus = '';
      function openShop() {
        openPanel('shop'); if (!S.shopSeen) { S.shopSeen = true; shopNote = L.shopTill; }
        api.sfx('bell'); say(L.shopArrive, 'Clerk', 'smug', 1); renderShop(); st('shop');
      }
      function renderShop() {
        if (S.mode !== 'shop') return;
        const jam = api.now() < S.jamUntil, heard = new Set(D.heard);
        const btns = CODES12.map((c) => {
          const ok = heard.has(c), e = EX[c];
          return el('button', { class: k('rk') + (ok && !jam ? '' : ' ' + k('dis')), type: 'button', 'aria-disabled': !ok || jam ? 'true' : 'false', dataset: { key: c }, onclick: () => buy(c) },
            ok ? 'Postcard of ' + e.S : 'Postcard of ???', el('small', { text: ok ? priceLabel(priceOf(1)) : 'unheard' }));
        });
        if (S.depth > 0) btns.push(el('button', { class: k('rk') + (jam ? ' ' + k('dis') : ''), type: 'button', 'aria-disabled': jam ? 'true' : 'false', dataset: { key: 'next' }, onclick: () => buy(null) }, 'Postcard of the Postcard', el('small', { text: priceLabel(priceOf(S.depth + 1)) })));
        if (api.flag.get('museum-of-objects.half')) btns.push(el('button', { class: k('rk'), type: 'button', dataset: { key: 'glove' }, onclick: buyGlove }, 'Postcard of the Right Glove', el('small', { text: '0.1 Meh' })));
        const tray = el('div', { class: k('tray'), 'aria-live': 'polite' }, S.depth > 0 ? nest(S.depth, S.chain) : el('p', { text: 'The tray is empty. It would like that to change, but it is not pushy.' }),
          el('span', { text: 'Postcard depth: ' + S.depth }), shopNote ? el('small', { text: shopNote }) : null);
        const panel = el('div', { class: k('pn') },
          el('div', { class: k('shh') }, el('span', { class: k('clerk'), 'aria-hidden': 'true', text: '\u{1F481}' }), el('div', {}, el('h3', { text: 'The Gift Shop' }), el('p', { text: S.depth >= 7 ? L.shopOwn : L.shopRack }))),
          jam ? el('div', { class: k('sign'), role: 'status', text: L.shopSign }) : null,
          el('div', { class: k('shb') }, el('div', { class: k('rack') }, ...btns), tray),
          el('button', { class: k('btn'), type: 'button', onclick: leaveShop, text: 'Back to the Museum' }));
        stage.replaceChildren(panel);
        if (shopFocus) { const t = panel.querySelector('[data-key="' + shopFocus + '"]'); if (t) { try { t.focus({ preventScroll: true }); } catch (e) { /* optional */ } } }
        refocus();
      }
      function leaveShop() { shopFocus = ''; closePanel('SHOP'); if (S.reprise) api.setTimeout(() => guide(L.endEntrance, 0), 600); }
      function buy(code) {
        if (S.mode !== 'shop') return; touch();
        const now = api.now(); S.shopClicks = S.shopClicks.filter((t) => now - t < 4000); S.shopClicks.push(now); S.panelAt = now; S.panelN = 0;
        if (now < S.jamUntil) return;
        if (S.shopClicks.length >= 12) {
          S.jamUntil = now + 8000; S.shopClicks = []; api.sfx('buzz'); say(L.shopJam, 'Clerk', 'panic', 1); renderShop();
          api.setTimeout(() => { S.jamUntil = 0; renderShop(); }, 8000); return;
        }
        if (code !== null && D.heard.indexOf(code) < 0) { api.sfx('buzz'); shopNote = L.shopUnheard; say(L.shopUnheard, 'Clerk', 'smug', 0); shopFocus = code; renderShop(); return; }
        const d = code === null ? S.depth + 1 : 1, price = priceOf(d);
        const got = price > 0 ? api.award(-price, 'postcard') : 0, paid = r2(Math.max(0, -got));
        api.award(0.5, 'postcard rebate'); api.sfx('stamp'); st('postcards');
        S.depth = d; if (code !== null) S.chain = code;
        api.stat.max(ID + '.depth', d); if (d > D.best.depth) { D.best.depth = d; persist(); }
        const total = api.stat.get(ID + '.postcards');
        shopNote = price <= 0 ? 'Paid: nothing. The postcard was free, truthfully.' : paid < price - 0.005 ? 'Paid: ' + fm(paid) + ' Meh (the balance ran out; the rest is a gift).' : 'Paid: ' + fm(paid) + ' Meh.';
        const lines = { 1: L.shopBuy1.replace('%S%', EX[S.chain] ? EX[S.chain].S : 'the exhibit'), 2: L.shopD2, 3: L.shopD3, 4: L.shopD4, 5: L.shopD5, 6: L.shopD6, 7: L.shopD7, 8: L.shopD8, 9: L.shopD9 };
        say(lines[d] || L.shopD9b, 'Clerk', 'proud', 1);
        if (d > 9) api.setTimeout(() => say(L.shopCrop, 'Clerk', 'smug', 0), 1800);
        if (total === 7) api.setTimeout(() => say(L.shopSeventh, 'Clerk', 'smug', 0), 2200);
        if (d >= 5) ach('duke'); if (d >= 9) { ach('chancellor'); api.confetti(); }
        shopFocus = code === null ? 'next' : code; renderShop();
      }
      function buyGlove() {
        if (S.mode !== 'shop') return; touch();
        const got = api.award(-0.1, 'postcard'); api.award(0.5, 'postcard rebate'); api.sfx('tada'); void got; st('postcards');
        shopNote = L.shopGlove; S.depth = Math.max(S.depth, 1); S.chain = '02'; say(L.shopGlove, 'Clerk', 'proud', 1); api.setTimeout(() => say(L.gloveShop, 'Audio Guide', 'confused', 0), 2500);
        ach('glove'); shopFocus = 'glove'; renderShop();
      }
      function openStaff() {
        openPanel('staff'); api.sfx('bell'); say(L.staffEnter, 'Audio Guide', 'confused', 1); renderStaff(false);
      }
      function renderStaff(playing) {
        if (S.mode !== 'staff') return;
        const panel = el('div', { class: k('pn') + ' ' + k('dark') },
          el('h3', { text: 'Staff Only: the break room' }),
          el('div', { class: k('deck') }, el('span', { class: k('reel') + (playing ? ' ' + k('on') : ''), 'aria-hidden': 'true', text: '\u{1F4FC}' }), el('span', { class: k('mug'), text: "WORLD'S OKAYEST GUIDE" }), el('span', { 'aria-hidden': 'true', style: 'font-size:2rem', text: '\u{1F4BA}' })),
          el('p', { text: L.staffPress }),
          el('div', { style: 'display:flex;gap:10px;flex-wrap:wrap' },
            el('button', { class: k('btn') + ' ' + k('pr'), type: 'button', 'aria-disabled': playing ? 'true' : 'false', onclick: playTape, text: playing ? 'PLAYING...' : 'PLAY' }),
            el('button', { class: k('btn'), type: 'button', onclick: leaveStaff, text: 'Back to the Museum' })));
        stage.replaceChildren(panel); refocus();
      }
      function leaveStaff() { closePanel('STAFF'); }
      function playTape() {
        if (S.mode !== 'staff' || (S.track && S.track.kind === 'tape')) return; touch();
        api.sfx('blip'); renderStaff(true);
        startTrack({ kind: 'tape', sents: L.tape, head: 'TAPE DECK', ms: 3000, noSay: false, who: 'Audio Guide', onDone: () => {
          if (!D.staffSeen) { D.staffSeen = true; persist(); api.award(5, 'Employee of the Month'); api.sfx('fanfare'); ach('staff'); say(L.tapeCredit, 'Management', 'confused', 1); }
          st('tape'); S.tapeDone = true; renderStaff(false);
          api.setTimeout(() => { if (S.mode === 'staff' && !S.track) special([L.tapeAfter], 'TAPE DECK'); }, 3000 * SC);
          trackDone();
        } });
      }
      function maybeEnding() {
        if (D.ending > 0 || stampCount() < 12 || !D.staffSeen || S.mode === 'cert') return;
        api.setTimeout(doEnding, 2500);
      }
      function doEnding() {
        if (D.ending > 0 || api.destroyed || S.mode === 'cert') return;
        D.ending = 1; persist(); st('endings'); ach('complete'); api.award(7.5, 'completion');
        openPanel('cert'); api.sfx('fanfare'); api.sfx('tada'); api.confetti(); show(plaqEl, true); D.reprise = false;
        paintMeter();
        startTrack({ kind: 'cert', sents: [L.endGuide, pl(L.endCert1), L.endCert3, L.endMeter], head: 'CERTIFIED', onDone: () => trackDone() });
        const panel = el('div', { class: k('pn') },
          el('div', { class: k('plq') }, L.endPlaque),
          el('div', { class: k('cert') }, el('h3', { text: 'CERTIFICATE' }), el('p', { text: pl(L.endCert1) }), el('div', { class: k('sig') }), el('small', { text: L.endCert2 }), el('small', { text: L.endCert3 })),
          el('button', { class: k('btn') + ' ' + k('pr'), type: 'button', onclick: takeExit, text: 'Take the Exit' }));
        stage.replaceChildren(panel); refocus(); catalogueBump();
      }
      function catalogueBump() { S.capAdd++; paintMeter(); }
      function takeExit() {
        if (S.mode !== 'cert') return;
        D.reprise = true; S.reprise = true; persist(); S.keepPending = true; api.sfx('tick'); api.setTimeout(() => api.sfx('tick'), 260);
        S.mode = 'gallery'; stage.replaceChildren(gal); changeWing('A', 'x'); placeVisitor(5, 6); S.walk = { path: [[5, 6], [5, 5]], i: 0, t: 0 };
        startTrack({ kind: 'special', sents: [L.endExit, L.endEntrance, L.endBegin], head: 'ENTRANCE' });
        api.setTimeout(() => say(L.endMgmt, 'Management', 'proud', 1), 9000); api.setTimeout(() => say('On the back of the certificate, in small type: ' + api.line('fortune'), 'Audio Guide', 'smug', 0), 15000); paintMeter(); persist();
      }
      /* ---------- director (250 ms) ---------- */
      function director() {
        if (document.hidden) { flush(); return; } /* one-shot beats wait for the visitor to come back */
        const now = api.now();
        if (S.mode !== 'gallery' || S.track) { if (S.idle === 'awake') S.lastInput = Math.max(S.lastInput, S.mode !== 'gallery' ? now : S.lastInput); }
        const idleMs = now - S.lastInput;
        if (S.mode === 'gallery' && S.idle === 'awake' && !S.track && !S.walk && !S.gaze) {
          if (!S.everPlayed && !S.nudged && idleMs > IDLE_WIN * 0.35) { S.nudged = true; say(bNudge(), 'Audio Guide', 'neutral', 0); }
          if (!S.warned && idleMs > IDLE_WIN * 0.5) { S.warned = true; say(L.idleWarn, 'Management', 'confused', 0); }
          if (!S.warned2 && idleMs > IDLE_WIN * 0.8) { S.warned2 = true; say(L.idleWarn2, 'Audio Guide', 'smug', 0); }
          if (idleMs > IDLE_WIN) accession();
          else if (S.touched && idleMs < IDLE_WIN * 0.4 && now - S.lastTalk > 19000 * SC && now - S.lastAmb > 24000 * SC) { S.lastAmb = now; guide(bAmb(), 0); }
          else BEATS.some((b, i) => {
            if (S.beats[i] || secs() < b[0] * SC) return false;
            S.beats[i] = true; b[1](); return true;
          });
        } else if (S.idle === 'statue' && S.mode === 'gallery') {
          const cut = [1.35, 1.8, 2.15, 2.5, 2.8];
          if (idleMs > IDLE_WIN * 3) afterHours();
          else if (S.statueStep < cut.length && idleMs > IDLE_WIN * cut[S.statueStep]) { say(L.statue[S.statueStep], 'Audio Guide', 'confused', 1); S.statueStep++; }
        } else if (S.idle === 'afterhours' && S.mode === 'gallery' && S.ahStep < L.ahTail.length && idleMs > IDLE_WIN * (S.ahStep ? 6 : 4.5)) { say(L.ahTail[S.ahStep], 'Audio Guide', 'smug', 1); S.ahStep++; }
        if ((S.mode === 'shop' || S.mode === 'staff') && !S.track) {
          const arr = S.mode === 'shop' ? L.shopIdle : L.staffIdle;
          if (S.panelN < arr.length && now - S.panelAt > (S.panelN ? 90000 : 45000) * SC) { say(arr[S.panelN], S.mode === 'shop' ? 'Clerk' : 'Audio Guide', 'smug', 0); S.panelN++; S.panelAt = now; }
        }
        if (!S.lblFirstDone && S.touched && secs() >= 8 * SC) { S.lblFirstDone = true; S.lblDefault = null; if (S.mode === 'gallery') paintLabel(); }
        if (!S.beats.tueEarly && !S.beats.tue && S.range === '03' && S.r03At && now - S.r03At > 3000 * SC && secs() >= 60 * SC && S.mode === 'gallery' && S.idle === 'awake' && !S.track) tuesdayCameo();
        if (!S.beats.colCam && secs() >= 120 * SC && D.heard.length >= 2 && S.mode === 'gallery' && S.wing === 'A' && S.idle === 'awake' && colinCameo()) S.beats.colCam = true;
        if (!S.beats.tue && S.mode === 'gallery' && secs() >= 600 * SC) { S.beats.tue = true; tuesdayVisit(); }
        if (S.tue && now < S.tue.until && !S.tue.met && S.range === '03' && S.mode === 'gallery') { S.tue.met = true; D.tue = true; persist(); ach('tuesday'); say(L.tueMet, 'Management', 'proud', 1); api.confetti(); }
        if (!S.exitShown && exitReady()) { S.exitShown = true; if (S.mode === 'gallery' && S.wing === 'A') { buildWing('A'); refreshRange(); } guide(L.exitAppear, 0); }
        if (!S.staffShown && staffReady()) { S.staffShown = true; if (S.mode === 'gallery' && S.wing === 'C') { buildWing('C'); refreshRange(); } say(L.staffOpen, 'Audio Guide', 'confused', 1); }
        if (D.heard.length >= 6) {
          [['58', 420], ['59', 480], ['60', 540]].forEach((p) => {
            if (S.selfEarned.indexOf(p[0]) < 0 && secs() >= p[1] * SC) {
              S.selfEarned.push(p[0]); say(L.selfArrive, 'Management', 'proud', 1); api.sfx('bell');
              if (S.mode === 'gallery' && S.wing === 'A') { const b = mkPlinth(p[0], SELF_POS[p[0]]); gal.insertBefore(b, visEl); }
              paintMeter();
            }
          });
        }
        if (S.range === '58' || S.range === '60') { const sec = Math.floor(now / 500); if (sec !== S.lastSelfPaint) { S.lastSelfPaint = sec; paintLabel(); } }
        if (colActive() && C.mode === 'off' && S.wing === 'C') C.mode = 'patrol';
        maybeFreeze(); flush();
      }
      /* ---------- frame loop ---------- */
      let lastTs = 0;
      function frame(ts) {
        if (api.destroyed) return;
        const t = num(ts) || api.now(); const dt = lastTs ? clamp((t - lastTs) / 1000, 0, 0.1) : 0.016; lastTs = t;
        stepWalk(dt); gazeFrame(dt); colinFrame(dt);
        api.requestAnimationFrame(frame);
      }
      /* ---------- input ---------- */
      const KEYDIR = { ArrowUp: [0, -1], w: [0, -1], W: [0, -1], ArrowDown: [0, 1], s: [0, 1], S: [0, 1], ArrowLeft: [-1, 0], a: [-1, 0], A: [-1, 0], ArrowRight: [1, 0], d: [1, 0], D: [1, 0] };
      api.on(root, 'keydown', (e) => {
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const key = e.key; if (key === '`') return;
        touch();
        if (S.mode !== 'gallery') {
          if (key === 'Escape') { e.preventDefault(); if (S.mode === 'shop') leaveShop(); else if (S.mode === 'staff') leaveStaff(); } /* the certificate closes only through its own button */
          return;
        }
        if (S.gaze && key !== 'g' && key !== 'G') endGaze(true);
        const base = e.target === root || e.target === gal;
        if (/^[0-9]$/.test(key)) { e.preventDefault(); kpress(key); return; }
        if (key === '.' || key === ',') { e.preventDefault(); khalf(); return; }
        if (key === 'Backspace') { e.preventDefault(); kback(); return; }
        if (key === 'Escape') { e.preventDefault(); if (S.code) kclear(); else toggleHandset(); return; }
        if (key === 'Enter' && base) { e.preventDefault(); kplay(); return; }
        if (key === ' ' && base) { e.preventDefault(); S.code ? kplay() : (S.range ? playCorrect(S.range) : kplay()); return; }
        if (KEYDIR[key]) { e.preventDefault(); keyStep(KEYDIR[key][0], KEYDIR[key][1]); return; }
        if ((key === 'g' || key === 'G') && !e.repeat) { if (S.gaze) endGaze(true); else if (S.range) startGaze(S.range, 'toggle'); } /* G is a toggle: press to gaze, press again (or walk, or press anything) to look away */
      });
      api.on(root, 'blur', () => { endGaze(true); });
      api.on(root, 'pointerdown', () => { S.lastClickAt = api.now(); touch(); try { root.focus({ preventScroll: true }); } catch (e) { /* optional */ } });
      api.on(root, 'touchstart', () => { touch(); }, { passive: true });
      api.on(document, 'visibilitychange', () => {
        if (document.hidden) S.hiddenAt = api.now();
        else { S.lastInput = api.now(); if (S.hiddenAt && api.now() - S.hiddenAt > 4000) { const lng = api.now() - S.hiddenAt > 60000; S.hiddenAt = 0; say(lng ? L.backLong : L.back, 'Audio Guide', 'proud', 0); } }
      });
      api.on(window, 'resize', () => {
        api.clearTimeout(S.resizeT); S.resizeT = api.setTimeout(() => {
          const now = api.now(); S.resizeTs = S.resizeTs.filter((t) => now - t < 20000); S.resizeTs.push(now);
          if (S.resizeTs.length >= 5 && !S.resizeSaid) { S.resizeSaid = true; say(L.resize, 'Management', 'confused', 1); }
        }, 200);
      });
      /* ---------- init ---------- */
      D.heard.forEach((c) => stampBox(c, false));
      if (D.half) hfKey.classList.remove(k('hid'));
      if (D.ending > 0) show(plaqEl, true);
      S.exitShown = exitReady(); S.staffShown = staffReady();
      buildWing('A'); placeVisitor(5, 6); paintStrip(); refreshRange(); paintHead(); paintLabel();
      startTrack({ kind: 'intro', sents: S.reprise ? [L.endEntrance, L.endBegin] : [L.open1, L.open2], head: 'WELCOME', ms: 2400,
        onDone: () => { api.setTimeout(() => { if (!S.touched && !S.track) special([L.open3], 'TRACK 01'); }, 2500); } });
      api.setTimeout(() => { api.sfx('tick'); api.setTimeout(() => api.sfx('tick'), 260); if (!S.walk) S.walk = { path: [[5, 6], [5, 5]], i: 0, t: 0 }; }, 350);
      api.setTimeout(() => say(L.openPlayer, 'Management', 'proud', 0), 3000);
      api.setTimeout(() => { if (!S.track) guide(L.openBattery, 0); }, 22000);
      api.setInterval(director, 250);
      api.requestAnimationFrame(frame);
      return { destroy() { flush(); } };
    }
  });
})();
