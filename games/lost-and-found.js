/* POINTLESS module: lost-and-found */
(function () {
  'use strict';
  const P = window.POINTLESS;

  /* ---------- helpers ---------- */
  const PFX = 'm-lost-and-found-';
  const k = (s) => String(s).split(' ').map((x) => PFX + x).join(' ');
  const num = (x) => (Number.isFinite(+x) ? +x : 0);
  const clean = (s) => String(s == null ? '' : s).replace(/[\u0000-\u001f\u007f​-‏‪-‮{}%$<>\\]/g, '').replace(/\s+/g, ' ').trim().slice(0, 40);
  const TK = /\$(THING|SHELF|MATCH|ITEM|TIME|NAME|LABEL|COUNT|DEPTH|PAD|N|A)\b/g;
  const fill = (s, m) => { m = m || {}; return String(s == null ? '' : s).replace(TK, (_, t) => (m[t] == null ? '' : String(m[t]))).replace(/\$[A-Z]+\b/g, '').replace(/\s{2,}/g, ' ').trim(); };
  const nth = (n) => { n = Math.floor(num(n)); const m = n % 100; return n + ((m >= 11 && m <= 13) ? 'th' : ({ 1: 'st', 2: 'nd', 3: 'rd' }[n % 10] || 'th')); };
  const half = (n) => { n = Math.round(num(n) * 2) / 2; return n % 1 ? Math.floor(n).toLocaleString('en-US') + ' 1/2' : n.toLocaleString('en-US'); };
  const pad4 = (n) => String(Math.max(0, Math.min(99999, Math.floor(num(n))))).padStart(4, '0');
  const clamp = (x, a, b) => Math.max(a, Math.min(b, num(x)));
  const upper = (s) => String(s).toUpperCase();
  const Bag = (api, arr) => { let q = [], last; return { next() { if (!arr.length) return ''; if (!q.length) { q = api.shuffle(arr); if (q.length > 1 && q[q.length - 1] === last) q.unshift(q.pop()); } last = q.pop(); return last; } }; };
  const shelfNo = (n) => (n <= 7 ? String(n) : n === 8 ? '7 1/2' : String(n - 1));

  /* ---------- data ---------- */
  const KINDS = {
    ticket: { e: '🎫', tint: 'cream', anim: 'pulse', re: /^(?:my |the )?ticket$/ }, nothing: { e: '❓', tint: 'lilac', anim: 'sag', re: /\b(?:nothing|empty|none)\b/ }, keys: { e: '🔑', tint: 'salmon', anim: 'shake', re: /\bkeys?\b/ },
    umbrella: { e: '🌂', tint: 'salmon', anim: 'drip', re: /umbrella|brolly/ }, phone: { e: '📞', tint: 'salmon', anim: 'shake', re: /phone|mobile/ }, glasses: { e: '👓', tint: 'salmon', anim: 'pulse', re: /glasses|specs|spectacles/ },
    wallet: { e: '👛', tint: 'salmon', anim: 'sag', re: /wallet|purse/ }, watch: { e: '⏰', tint: 'mustard', anim: 'spin', re: /\b(?:watch|clock)\b/ }, time: { e: '⏰', tint: 'mustard', anim: 'spin', re: /time|minutes|hours|\bdays?\b|tuesday|monday|weekend|appointment/ },
    mind: { e: '💡', tint: 'lilac', anim: 'float', re: /mind|marbles|thought|thread|plot|sentence|\bbus\b/ }, pet: { e: '🐱', tint: 'salmon', anim: 'pulse', re: /\b(?:cat|dog|hamster|pets?)\b/ }, sock: { e: '🧦', tint: 'salmon', anim: 'float', re: /sock|glove/ },
    direction: { e: '🧭', tint: 'lilac', anim: 'spin', re: /direction|\bway\b|\blost\b/ }, patience: { e: '🙂', tint: 'lilac', anim: 'float', re: /patience|temper|\bhope\b|faith|mood/ }, hat: { e: '🎩', tint: 'salmon', anim: 'pulse', re: /\b(?:hat|cap)\b/ },
    bag: { e: '🧳', tint: 'salmon', anim: 'sag', re: /\b(?:bag|case|luggage)\b/ }, self: { e: '🙂', tint: 'mint', anim: 'pulse', re: /\b(?:me|myself|my place|place in line|name)\b/ }, generic: { e: '🎫', tint: 'cream', anim: 'pulse' }
  };
  const KORDER = ['ticket', 'nothing', 'keys', 'umbrella', 'phone', 'glasses', 'wallet', 'watch', 'time', 'mind', 'pet', 'sock', 'direction', 'patience', 'hat', 'bag', 'self'];
  const kindOf = (low) => { if (!low) return 'nothing'; for (let i = 0; i < KORDER.length; i++) if (KINDS[KORDER[i]].re.test(low)) return KORDER[i]; return 'generic'; };
  const itemOf = (raw, kind) => {
    const s = raw.replace(/^(?:my|the|a|an|one|some|our|your)\s+/i, '').trim() || raw, w = s.split(/\s+/), last = w[w.length - 1] || '';
    const pl = /s$/i.test(last) && !/ss$/i.test(last) && w.length <= 3 && kind !== 'nothing' && kind !== 'self' && kind !== 'watch';
    return (pl ? 'ONE (1) SET OF ' : 'ONE (1) ') + upper(s).slice(0, 40);
  };
  const thingOf = (raw) => raw.replace(/^(?:my|the|a|an|one|some|our|your)\s+/i, '').trim().toLowerCase() || raw.toLowerCase() || 'nothing';
  const unOne = (s) => String(s).replace(/^one \(1\) /i, '');
  const okEmoji = (x) => (typeof x === 'string' && /[←-⯿\uD83C-\uD83E]/.test(x) && !/[A-Za-z0-9]/.test(x) ? Array.from(x).slice(0, 2).join('') : '🎫');
  const FOOT0 = 'THIS TICKET IS THE ITEM. DO NOT LOSE IT. IT IS NOT A TICKET FOR THE ITEM.';
  const FOOT = ['THIS TICKET IS THE ITEM. (REVISED.)', 'THIS TICKET HAS BEEN THE ITEM SINCE LF-0003. DO NOT LOSE IT.', 'THE ITEM IS THIS TICKET. THIS HAS BEEN APPROVED BY THE TICKET.', 'THIS TICKET IS THE ITEM. THE ITEM IS ON ITS WAY TO BECOMING A TICKET.',
    'DO NOT LOSE IT. IT IS NOT A TICKET FOR THE ITEM. WE HAVE STOPPED CHECKING.', 'THE ITEM IS CURRENTLY THIS TICKET. SUBJECT TO THURSDAY.', 'THIS TICKET IS THE ITEM, ALLEGEDLY. SANDRA HAS NOT OBJECTED.'];
  const QE = ['👵', '🧔', '👨', '👩', '🧑', '👴'];
  const FT = [['bell', 'flag.bell'], ['dennis', 'flag.dennis'], ['pad', 'flag.pad'], ['printer', 'flag.printer'], ['wendell', 'flag.wendell'], ['board', 'flag.board']];
  const title = (t) => {
    const d = Math.min(99999, Math.max(0, Math.floor(num(t.depth)))), it = t.item || 'ONE (1) NOTHING', b = t.thing || 'nothing';
    if (d === 0) return it;
    if (d <= 4) return it + ' (TICKET'.repeat(d) + ')'.repeat(d);
    if (d <= 6 || d >= 9) return 'TICKET to the ' + nth(d) + ' (' + b + ')';
    return 'the idea of ' + b + ', presented as a ticket (' + nth(d) + ')';
  };
  const SCEN = [
    ['🧤', 'One (1) left glove, belonging to a right hand. The hand has not been in.'], ['🔑', 'A set of keys to a door that has since been renovated into a different door.'], ['🌂', 'An umbrella, lost on a sunny day, handed in on a sunny day. It is waiting for rain with great dignity.'], ['📅', 'One (1) Tuesday. Found in a coat pocket. Unclaimed. Has a library fine.'], ['💡', 'One (1) very good idea, lost in the shower, 2009. It was shaped like a lightbulb. It has stopped glowing.'], ['🧥', 'A cardigan with a whole personality in the pocket. Not ours. We have read the personality. It is fine.'], ['📛', 'A lanyard. The badge is blank. The owner is described on the form as "a presence".'], ['🐕', 'A child\'s drawing of a dog, labelled DOG. The dog is not on the premises. The drawing is quite sure.'], ['🔘', 'Eleven unrelated buttons in a jar labelled Mostly Coat.'],
    ['🔖', 'A bookmark still holding someone\'s place in a book that was returned in 2003. The place has not been.'], ['🗝', 'A tiny brass key marked DRAWER. The drawer is marked KEY. They have never met.'], ['🚲', 'A bicycle bell rung once in 1998 and still faintly ringing, on a shelf, in the dark, in good faith.'], ['🎩', 'A hat that fits nobody and therefore everybody. Nobody has volunteered to be everybody.'], ['📦', 'One argument, slightly used, still in the box it was won in.'], ['❓', 'A Reasonable Doubt (opened). Do not shake.'], ['🍊', 'One (1) Sunday afternoon. Found on a bench. Smells of oranges and nothing happening.'], ['🧵', 'The thread of a conversation. We have pulled it. We regret pulling it.'], ['🙂', 'A good mood, still wearing its tag. Do not put on in front of colleagues.'],
    ['⏰', 'A watch showing 4:17. It has been told what time it is. It is not listening.'], ['📌', 'Someone\'s place in line, folded small. It is still in the line, slightly behind.'], ['🔦', 'A torch, switched on, in daylight, in the lost property of a different lost property.'], ['🥄', 'One (1) spoon, lost at a wedding, found at a different wedding. It has taken to weddings.'], ['🧭', 'A sense of direction, handed in by a man who is now somewhere else with great confidence.'], ['🥔', 'One potato, labelled GERALD\'S, in a bag labelled NOT GERALD\'S. The labels have agreed to disagree.'], ['👓', 'Reading glasses, still reading. They are on page 211. Nobody has told them the book ended.'], ['📞', 'A phone with one number saved: Home (lost). It has been dialled seven and a half times. It rings in a different house.'], ['🧳', 'A suitcase packed for a trip cancelled during the packing. Inside: 11 socks, 1 hope, 0 shoes.'],
    ['📎', 'A single paperclip. It was holding something together. The something has gone. The paperclip is still holding.'], ['👛', 'A purse containing exact change for a bus that no longer runs. It is waiting for the exact bus.'], ['🐱', 'A framed photograph of a cat, taken from an angle that suggests the cat was in charge of the camera. Unclaimed. Respected.'], ['📋', 'A clipboard with nothing on it and a pen on a string. The pen is also lost. It is attached. It is, technically, found.']
  ].map((a) => ({ e: a[0], t: a[1], kind: 'sc' }));
  const GHOST = { e: '👻', t: 'Lot 7 1/2: Under a cloth. Described by nobody. Claimed by nobody. Warm.', kind: 'ghost' };
  const CHIPS = ['keys', 'umbrella', 'a glove', 'my phone', 'glasses', 'my wallet', 'a hat', 'a cat', 'eleven minutes', 'my patience', 'my train of thought', 'my sense of direction',
    'a Tuesday', 'the end of the sentence', 'my place in line', 'my plot', 'a bus', 'my temper', 'my name', 'half a thought', 'the thread', 'nothing', 'I do not know', 'whatever it was I came in for'];
  const PLACEH = ['Keys? Umbrella? A feeling?', 'Describe what you lost. Or do not. Nothing is also a thing.', 'What have you lost? Take your time. It is 4:17.',
    'Type it here. Draw it there. The pencil is on a string.', 'A sock? A Tuesday? Do not tell me. Tell the box.', 'Say it. Draw it. Or stand there. Standing is also a form.'];
  const STAMPS = [
    Array.from({ length: 13 }, (_, i) => [Math.cos(i * Math.PI / 6), Math.sin(i * Math.PI / 6)]),
    [[-1, -1], [1, -1], [1, 1], [-1, 1], [-1, -1]], [[0, -1], [1, 1], [-1, 1], [0, -1]],
    Array.from({ length: 10 }, (_, i) => [i / 4.5 - 1, 0.5 * Math.sin(i * 1.4)]),
    [[-1, -1], [1, 1], [0, 0], [1, -1], [-1, 1]], [[0, 0], [0.12, 0], [0, 0.12]]
  ];
  const MB = {
    nothing: ['Nothing (Pristine)'], face: ['A Face, Lost in 1998'], spiral: ['One Sunday Afternoon, Slightly Used', 'A Train of Thought, Terminus Unknown'], doubt: ['A Reasonable Doubt', 'A Very Thorough Misunderstanding'], cross: ['Keys to Something Smaller', 'A Plus Sign, On Loan'], hat: ['A Hat, Probably Yours', 'A Halo, Returned Slightly Used'], thread: ['The Thread of a Conversation', 'A Queue, Single File'], thin: ['An Apology (Unclaimed Since 1994)', 'A Horizon, Unaccompanied'], umb: ['One (1) Umbrella, Hypothetical', 'A Brolly, Conceptually'], mood: ['A Good Mood (Opened)', 'Several Small Reasons'],
    pen: ['A Pen That Was Always Someone Else\'s', 'The Middle of Something'], maybe: ['Something Shaped Like a Maybe', 'A Left-Handed Moment', 'The Rest of the Sentence']
  };
  const CLAUSES = ['This ticket is not the item. This ticket is the item.', 'Lost items may not be un-lost on Tuesdays.', 'The holder may not lose the ticket. If lost, see clause 1.',
    'The Department is not responsible for the Department.', 'Clause 4 has been lost. Please describe Clause 4.', 'Clause 6 is Clause 1, but warmer.',
    'Sandra has read this and nodded, which is a signature.', 'If you are reading this you have found something. Please return it.',
    'There is no Clause 9. There is a gap where Clause 9 would be. The gap is kept.'];
  const EXTRAS = ['Clause 10 is the same as Clause 9, with more gap.', 'See reverse. You are on the reverse. See obverse.', 'Fine print: the print is fine. The ticket is also fine. Nobody has checked the other one.',
    'Clause 11: see Clause 10. Clause 10: see Clause 11. Both have been seen.', 'Fine print: the Department is not a department. It is a window. The window is on loan.', 'Clause 13 is lucky. It has therefore been hidden for its own safety.',
    'Sandra has initialled this clause. The initials belong to a different Sandra. Compliance has two. They do not speak.'];
  const AMEND = ['KEPT FOREVER', 'KEPT FOREVER (UNTIL THURSDAY)', 'KEPT FOREVER (SUBJECT TO REVIEW)', 'KEPT FOREVER, WHICH IS A LONG TIME, WE CHECKED', 'KEPT FOREVER (RENEWED)',
    'KEPT FOREVER, PLUS TUESDAY', 'KEPT FOREVER (7 1/2 YEARS, ROUNDED UP)', 'KEPT, WHICH IS THE SAME WORD'];
  const USE = {
    keys: ['The ticket jingles. It has unlocked the counter. The counter was not locked. It is now locked about it.', 'Your keys (ticket) have been used. They opened nothing and made a very convincing sound doing it.', 'The keys (ticket) are the right keys for the wrong day. The day has been told.'], umbrella: ['The ticket has opened. It is raining on the ticket only. The ticket is dry. The rain is disappointed.', 'The umbrella (ticket) opens. It is indoors. Three customers look at it. One makes a note of the superstition.', 'The umbrella (ticket) has been used for its purpose. Its purpose was to be taken out and not returned.'], phone: ['Your phone (ticket) is ringing. It is the Lost & Found calling about your phone. They have not found it. They are the phone.', 'Your phone (ticket) has no signal. It has no phone. It has a very strong sense of having been called.', 'You hold the phone (ticket) to your ear. A voice like a form says, softly: Please hold.'], glasses: ['You are now wearing your glasses (ticket). You can see clearly that you are holding a ticket.', 'The glasses (ticket) make everything slightly clearer and slightly more of a ticket.', 'You look through the glasses (ticket). The counter is a counter, in detail. It was already a counter. Now it knows.'], wallet: ['Your wallet (ticket) contains 0 Meh and a photograph of a smaller wallet. The smaller wallet looks proud.', 'You open the wallet (ticket). Inside is a receipt for the wallet. The receipt has a wallet. It is smaller.', 'The wallet (ticket) is empty in a way that feels earned.'], watch: ['Your watch (ticket) reads 4:17. This is not a guess. It was asked once and has been sure ever since.', 'Your watch (ticket) ticks. It ticks in the time it was lost in, which is now a little behind and very dignified.'], time: ['The ticket is punctual to a time that has moved. It stands where the time was, holding the door.', 'You use the time (ticket). It passes. It passes the way things pass here: toward the counter, slowly, with a form.'], mind: ['Your train of thought (ticket) has arrived at a station. It is the same station. It has been here the whole time.', 'You follow your train of thought (ticket). It goes nowhere in particular, very promptly.', 'Your thought (ticket) is back. It has said what it was going to say. It was ah. That was all of it.'], pet: ['Your pet (ticket) is not a pet. It has been fed a ticket. Both are thriving.', 'The pet (ticket) has been walked. It went around the counter once and came back smelling slightly different.', 'The pet (ticket) is asleep on a ticket. They are the same ticket. Neither minds.'],
    sock: ['Your sock (ticket) is half of a pair. The other half is also a ticket and is, per records, on a journey.', 'The sock (ticket) has been put on. It is on a hand. It is on a foot. It has not been decided which.', 'You hold your sock (ticket) up. It matches nothing. It is thrilled.'], direction: ['Your sense of direction (ticket) points firmly at the clerk. It has never been so accurate.', 'Your sense of direction (ticket) points at the exit. There is no exit. It points at an affirmation. It is sure.', 'The direction (ticket) turns, thinks, and turns back. It is the most progress it has made since 2014.'], patience: ['Your patience (ticket) is made of waiting. It is the most patient thing in the building, including Dennis (Plant).', 'You have used your patience (ticket). It is slightly less patient. It says so, quietly, in the margin.'], nothing: ['Nothing (ticket). It is blank. It is very heavy. Please sign for it. We have nothing to sign with.', 'You use nothing (ticket). It works perfectly. It has been working for years. Nobody noticed. That is how you know.', 'Nothing (ticket) held to the ear. You hear the sea. It is not the sea. It is a very large empty room, and it is full.'], ticket: ['Your ticket (ticket). It is the ticket. It was always the ticket. It has been the ticket the entire time.', 'You use your ticket. It looks at itself in your hand. It does not like what it sees, which is a ticket.', 'The ticket has been used to remember the ticket. It remembers. It remembers itself. It is all it has ever done.'], hat: ['The ticket is on your head now. It fits. Several people look at it. Nobody says anything. This is how hats work.', 'The hat (ticket) has been tipped to a customer. The customer tipped theirs back. Neither of you had a hat. It was very sincere.'], bag: ['The ticket is a bag. It contains a smaller bag, which contains the idea of what you had in it.', 'You open the bag (ticket). It is full of bag. Only bag. It is the one thing it was always going to hold.'], self: ['The ticket introduces itself. It is you. It says it has been looking for you everywhere, and it is a little out of breath.', 'You use yourself (ticket). It is the first time. It feels about as expected, and then slightly warmer.', 'The ticket has been handed a ticket of itself. It has said thank you. It meant it. It has the best manners in the building.'], generic: ['You used your $THING (ticket). It worked the only way a ticket works: you were asked to wait.', 'Your $THING (ticket) has been used. The result is a faint feeling of having been helped. It is the only result the Department produces.', 'You use your $THING (ticket). It does what it can. It does it politely, and then it sits.']
  };
  const USE_SFX = { keys: 'tick', umbrella: 'pop', phone: 'bell', watch: 'tick', time: 'tick', wallet: 'bloop', nothing: 'sad' };
  const SWATCH = ['Damp', 'Sort Of', 'Thursday', 'Beige-ish', 'Loud', 'Technically'];
  const SWL = ['Damp. Yes. Damp is a colour in this office. It sits between taupe and apologetic.', 'Sort Of. A bold choice. Sort Of is the colour of most decisions made here.',
    'Thursday. Rare. I have only ever lost one Thursday and it was mine.', 'Beige-ish. The -ish is doing a lot of the work. We have given the -ish its own desk.',
    'Loud. Written down in capitals so that it can be heard from the back.', 'Technically. Technically is a colour if you are technically a colour. It has been noted.'];
  const POCK = [
    { id: 'lint', e: '📎', label: 'Pocket Lint', kept: 'Gordon (pocket lint)' }, { id: 'meh', e: '🟡', label: '1 Meh', kept: 'one (1) Meh' }, { id: 'rcpt', e: '📋', label: 'A Receipt For The Receipt', kept: 'a Receipt For The Receipt' }, { id: 'half', e: '💡', label: 'Half A Thought', kept: 'half a thought' }, { id: 'pencil', e: '✏', label: 'Your Pencil', kept: 'your pencil' }, { id: 'name', e: '📛', label: 'Your Name (on loan)', kept: 'your name' }
  ];
  const TAGT = {
    tk: 'Shelf Space $SHELF: $ITEM. Kept since 4:17 PM. Not claimed. Not claimable. Not thinking about you, but kept.', lint: 'Shelf Space $SHELF: Gordon (pocket lint). Kept since 4:17 PM. Likes the dark.', meh: 'Shelf Space $SHELF: One (1) Meh, on a small velvet cushion. Number 1. Not a unit of anything.', rcpt: 'Shelf Space $SHELF: Receipt for the Receipt. Original receipt: lost. Receipt for it: this.', half: 'Shelf Space $SHELF: Half a thought. Other half: sent a letter. Awaiting reply.', pencil: 'Shelf Space $SHELF: One pencil, on loan, from itself. Tied to nothing.', name: 'Shelf Space $SHELF: A name, framed. Previously: $NAME. Currently: You.', bell: 'Shelf Space $SHELF: One (1) bell. Kept. Knocking is on the shelf, next to Gordon.', lot: 'Lot 7 1/2: Described blind. Kept since before you came in.',
    you: 'Lot 0: One Valued Employee, name on loan, unclaimed.'
  };
  const KEEP_KINDS = ['tk', 'lint', 'meh', 'rcpt', 'half', 'pencil', 'name', 'bell', 'lot', 'you'];
  const STOOL = [
    ['I lost the plot.', 'Ticket. It is the plot. Hand it over slowly. Do not spoil it.'], ['I lost a bus.', 'Ticket. It is the bus. On the ticket it is number 7 1/2.'], ['I lost my train of thought.', 'Ticket. It left from Platform 4 1/2. We are not looking into it.'], ['I lost the keys to the car I lost.', 'Ticket. Ticket. It is a very small queue of keys.'], ['I lost my temper.', 'Ticket. It is the temper. It has been calm since.'], ['I lost my place in line.', 'Ticket. It is the place. It is slightly behind.'], ['I lost my sense of occasion.', 'Ticket. It is the occasion. It was last Thursday and it went well.'], ['I lost the thread.', 'Ticket. Pull it gently. Everything it is attached to is also a ticket.'],
    ['I lost a whole afternoon.', 'Ticket. It is the afternoon. It is 4:17. It has been 4:17 for most of it.'], ['I lost the will to queue.', 'Ticket. It is the will. You are already in the queue. It was the queue that lost you.']
  ];
  const XMOD = [
    { id: 'sock', e: '🧦', t: 'One (1) sock, on a journey. Reference: Lost Property, Window 7 1/2 (that is here). We did not see it come in. It sends regards.', th: 'One (1) sock, Home (kept). It matches nothing now and is fine with that.', yes: 'We have a form for it. The form is lilac. The sock has signed it.' }, { id: 'toast', e: '🍞', t: 'One (1) slice of toast, warm. Unclaimed. Vouched for by itself.', yes: 'It was handed in, in a good mood, and has been warm ever since. We do not ask how.' }, { id: 'sandwich', e: '🥪', t: 'One (1) half sandwich, labelled BRENDA. The other half has been in a meeting since March.', yes: 'It is half a sandwich. It is a whole complaint. They are kept together.' },
    { id: 'rock', e: '🥌', t: 'One (1) rock, calm. Handed in by a very senior complaint. Kept with respect.', yes: 'It said nothing. It was the most helpful thing in the building.' }
  ];

  /* ---------- the matcher (pure) ---------- */
  const dist = (a, b, c, d) => Math.hypot(c - a, d - b);
  function features(st) {
    const f = { n: st.length, ink: 0, loops: 0, s: [], x0: 1e9, y0: 1e9, x1: -1e9, y1: -1e9, center: 0 };
    st.forEach((p) => {
      const n = p.length / 2; let len = 0, turn = 0, area = 0, ax = 1e9, ay = 1e9, bx = -1e9, by = -1e9;
      for (let i = 0; i < n; i++) {
        const x = p[2 * i], y = p[2 * i + 1];
        ax = Math.min(ax, x); bx = Math.max(bx, x); ay = Math.min(ay, y); by = Math.max(by, y);
        if (i) { len += dist(p[2 * i - 2], p[2 * i - 1], x, y); area += p[2 * i - 2] * y - x * p[2 * i - 1]; }
        if (i >= 2) { const ux = p[2 * i - 2] - p[2 * i - 4], uy = p[2 * i - 1] - p[2 * i - 3], vx = x - p[2 * i - 2], vy = y - p[2 * i - 1]; turn += Math.atan2(ux * vy - uy * vx, ux * vx + uy * vy); }
      }
      area = Math.abs(area + p[2 * n - 2] * p[1] - p[0] * p[2 * n - 1]) / 2;
      const chord = dist(p[0], p[1], p[2 * n - 2], p[2 * n - 1]), closed = len > 40 && n >= 6 && chord < 18;
      f.s.push({ len, chord, n, closed, straight: len ? chord / len : 0, spiral: Math.abs(turn) >= 3 * Math.PI, round: len ? 4 * Math.PI * area / (len * len) : 0, ax, ay, bx, by, cx: (ax + bx) / 2, cy: (ay + by) / 2 });
      f.ink += len; if (closed) f.loops++;
      f.x0 = Math.min(f.x0, ax); f.y0 = Math.min(f.y0, ay); f.x1 = Math.max(f.x1, bx); f.y1 = Math.max(f.y1, by);
    });
    const w = f.x1 - f.x0, h = f.y1 - f.y0; let tot = 0, inn = 0;
    st.forEach((p) => { for (let i = 0; i < p.length; i += 2) { tot++; if (p[i] >= f.x0 + .3 * w && p[i] <= f.x0 + .7 * w && p[i + 1] >= f.y0 + .3 * h && p[i + 1] <= f.y0 + .7 * h) inn++; } });
    f.w = w; f.h = h; f.aspect = w / Math.max(h, 1); f.center = tot ? inn / tot : 0;
    return f;
  }
  function classify(st) {
    if (!st.length) return 'nothing';
    const f = features(st), S = f.s, cl = S.filter((s) => s.closed);
    if (cl.length === 1 && cl[0].round > 0.7) {
      const L = cl[0], h = L.by - L.ay;
      const eyes = S.filter((s) => s.len < 8 && s.cx > L.ax && s.cx < L.bx && s.cy > L.ay && s.cy < L.ay + .6 * h).length;
      const mouth = S.some((s) => !s.closed && s.len > 14 && s.cx > L.ax && s.cx < L.bx && s.cy >= L.ay + .4 * h && s.cy <= L.by);
      if (eyes >= 2 && mouth) return 'face';
    }
    if (S.some((s) => s.spiral)) return 'spiral';
    if (f.n > 25) return 'doubt';
    if (f.n === 2 && S.every((s) => s.straight > .8 && s.len > 25)) {
      const a = S[0], b = S[1], pd = 10;
      if (a.cx >= b.ax - pd && a.cx <= b.bx + pd && a.cy >= b.ay - pd && a.cy <= b.by + pd && b.cx >= a.ax - pd && b.cx <= a.bx + pd && b.cy >= a.ay - pd && b.cy <= a.by + pd) return 'cross';
    }
    if (f.n === 1 && f.loops === 1) return 'hat';
    if (f.n === 1 && S[0].straight > .9 && S[0].len > 150) return 'thread';
    if ((f.aspect > 3 || f.aspect < .33) && f.n <= 3) return 'thin';
    if (f.n >= 2 && f.n <= 4) return 'umb';
    if (f.n >= 8 && f.ink / f.n < 35) return 'mood';
    if (f.center > .6) return 'pen';
    return 'maybe';
  }
  const toPoly = (st) => {
    const ok = st.filter((s) => s && s.length >= 4); if (!ok.length) return null;
    let src = ok; if (src.length > 20) { const o = []; for (let i = 0; i < 20; i++) o.push(src[Math.floor(i * src.length / 20)]); src = o; }
    let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9, tot = 0;
    src.forEach((p) => { for (let i = 0; i < p.length; i += 2) { x0 = Math.min(x0, p[i]); x1 = Math.max(x1, p[i]); y0 = Math.min(y0, p[i + 1]); y1 = Math.max(y1, p[i + 1]); } tot += p.length / 2; });
    const sc = 99 / Math.max(x1 - x0, y1 - y0, 1);
    const out = src.map((p) => {
      const n = p.length / 2, keep = tot > 40 ? Math.max(2, Math.floor(40 * n / tot)) : n, q = [];
      for (let j = 0; j < keep; j++) { const i = keep === 1 ? 0 : Math.round(j * (n - 1) / (keep - 1)); q.push(Math.round(clamp((p[2 * i] - x0) * sc, 0, 99)), Math.round(clamp((p[2 * i + 1] - y0) * sc, 0, 99))); }
      return q;
    });
    let n = out.reduce((a, p) => a + p.length / 2, 0), g = 0;
    while (n > 40 && g++ < 200) { let bi = 0; out.forEach((p, i) => { if (p.length > out[bi].length) bi = i; }); const p = out[bi]; if (p.length <= 4) { out.pop(); } else { p.splice(p.length - 4, 2); } n = out.reduce((a, q) => a + q.length / 2, 0); }
    return out.length ? out : null;
  };
  const sanePoly = (p) => {
    if (!Array.isArray(p)) return null; let n = 0; const out = [];
    for (let i = 0; i < p.length && i < 40; i++) {
      const s = p[i]; if (!Array.isArray(s) || s.length < 4) continue;
      const q = []; for (let j = 0; j + 1 < s.length && n < 40; j += 2) { q.push(Math.round(clamp(s[j], 0, 99)), Math.round(clamp(s[j + 1], 0, 99))); n++; }
      if (q.length >= 4) out.push(q);
    }
    return out.length ? out : null;
  };
  function drawDoodle(ctx, st, w, h, o) {
    o = o || {}; if (!ctx) return; if (!o.noclear) ctx.clearRect(0, 0, w, h); if (!st || !st.length) return;
    let s = w / (o.box || 280), ox = 0, oy = 0;
    if (o.fit) {
      let x0 = 1e9, y0 = 1e9, x1 = -1e9, y1 = -1e9;
      st.forEach((p) => { for (let i = 0; i < p.length; i += 2) { x0 = Math.min(x0, p[i]); x1 = Math.max(x1, p[i]); y0 = Math.min(y0, p[i + 1]); y1 = Math.max(y1, p[i + 1]); } });
      const bw = Math.max(1, x1 - x0), bh = Math.max(1, y1 - y0); s = Math.min((w - 6) / bw, (h - 6) / bh, 5);
      ox = (w - bw * s) / 2 - x0 * s; oy = (h - bh * s) / 2 - y0 * s;
    }
    ctx.lineCap = 'round'; ctx.lineJoin = 'round'; ctx.strokeStyle = '#2b2118';
    st.forEach((p, i) => {
      const soft = i < (o.soft || 0); ctx.lineWidth = soft ? 4 : (o.lw || 2); ctx.globalAlpha = soft ? .55 : 1; ctx.beginPath();
      for (let j = 0; j + 1 < p.length; j += 2) { const X = p[j] * s + ox, Y = p[j + 1] * s + oy; if (j) ctx.lineTo(X, Y); else ctx.moveTo(X, Y); }
      if (p.length < 4) ctx.lineTo(p[0] * s + ox + .1, p[1] * s + oy);
      ctx.stroke();
    });
    ctx.globalAlpha = 1;
  }

  /* ---------- achievements ---------- */
  P.addAchievements([
    { id: 'lost-and-found.first', name: 'Grand Marshal of Descriptions That Almost Resemble Something', desc: 'Report your first loss. The ticket is the item. Wendell says it is a very good likeness of a ticket.', icon: '🎫', secret: false, reward: 2 }, { id: 'lost-and-found.ficus', name: 'Laureate of Tuesday, 4:17 PM, Near the Third Ficus', desc: 'Have 4:17 PM written on ten of your tickets. The ficus sends its regards. There are three ficuses. It is not clear which one is sending.', icon: '⏰', secret: false, reward: 5 }, { id: 'lost-and-found.thing', name: 'Chancellor of the Ticket That Is the Thing, Hereditary', desc: 'Receive 10 tickets that are the item. Not one item has been returned. The board reads 0 of 7 1/2 and is very pleased with its consistency.', icon: '📋', secret: false, reward: 5 }, { id: 'lost-and-found.letgo', name: 'Archduchess of Letting Go (Eventually, After A Bit)', desc: 'Let go of your first ticket. It is kept forever, which is a clause, and the clause is also kept.', icon: '📦', secret: false, reward: 2 },
    { id: 'lost-and-found.kept8', name: 'Archduke of Surrendered Things, Kept in Perpetuity', desc: 'Let go of 8 things. All are kept. The shelf has a velvet rope and a feeling.', icon: '🗝', secret: false, reward: 5 }, { id: 'lost-and-found.collection', name: 'High Chancellor of the Permanent Collection', desc: 'Have 12 items kept forever on the shelf. The shelf did not ask for them. It has accepted them with a rattle.', icon: '🧳', secret: false, reward: 5 }, { id: 'lost-and-found.nested', name: 'Lord Protector of the Ticket That Is a Ticket (Ticket)', desc: 'Hold a ticket three tickets deep. It is your thing. It is your thing\'s thing\'s thing.', icon: '🎫', secret: false, reward: 3 }, { id: 'lost-and-found.line', name: 'Supreme Handler of Tickets That Are Not the Item', desc: 'Give a ticket to a customer. They thanked you for the item. Wendell would like it noted it was not the item.', icon: '🙂', secret: false, reward: 3 },
    { id: 'lost-and-found.pullback', name: 'Pontiff of the Pull-Back', desc: 'Witness the Lost & Found sitting on a shelf in a larger Lost & Found. Is this yours? It is. It was.', icon: '🔦', secret: false, reward: 3 }, { id: 'lost-and-found.stool', name: 'Warden of the Borrowed Stool', desc: 'Hand out three tickets from behind the counter. All three fonts were correct.', icon: '🧓', secret: false, reward: 3 }, { id: 'lost-and-found.blind', name: 'Blind Surveyor of Lot 7 1/2', desc: 'Describe Lot 7 1/2 through a curtain. It was your first drawing. You are late to it.', icon: '👻', secret: false, reward: 3 }, { id: 'lost-and-found.keeping', name: 'Custodian of Everything That Remains', desc: 'Reach the end of Lost & Found. Nothing has been found. The counter is open.', icon: '📌', secret: false, reward: 10 },
    { id: 'lost-and-found.night', name: 'Warden of the Night Shift Queue and Its Tiny Tickets', desc: 'At the end of a very long afternoon the lost things leave the shelf, in single file. They are looking for someone. They carry a ticket.', icon: '🎫', secret: true, reward: 10 }, { id: 'lost-and-found.lot0', name: 'Dame Commander of Lot 0 (One Valued Employee, Name on Loan)', desc: 'Lot 0 is a very small lot. It holds one Valued Employee, name on loan. It has been waiting a long time on a low shelf.', icon: '👤', secret: true, reward: 10 }, { id: 'lost-and-found.smile', name: 'Restorer of a Face Lost in 1998', desc: 'A clerk lost a face in 1998. It was never opened. Perhaps draw something that looks back at him.', icon: '🙂', secret: true, reward: 5 }, { id: 'lost-and-found.bell', name: 'Imperial Warden of the Bell That Is Lost In Plain Sight', desc: 'The bell has been reported lost. It is right there. It is lost in plain sight, which is the hardest kind, and it does not like to be rushed.', icon: '🔔', secret: true, reward: 5 },
    { id: 'lost-and-found.leaf', name: 'Keeper of the Found Leaf (Foliage, Not An Item)', desc: 'Something falls off a thriving plant and is found for exactly one second. A recount is held. Gravity is thanked.', icon: '🌿', secret: true, reward: 3 }, { id: 'lost-and-found.paradox', name: 'Sovereign of the Ticket That Is Also Held', desc: 'A ticket is held. A ticket is lost. These are not two things. They are one thing in a bad mood.', icon: '🎫', secret: true, reward: 3 }, { id: 'lost-and-found.coat', name: 'Hereditary Custodian of the Cloakroom of 1974 (Coat Not Included)', desc: 'A Thursday, a cloakroom, a ticket numbered 0417. The clerk has never said. For exactly one moment, he stops.', icon: '🧥', secret: true, reward: 10 }, { id: 'lost-and-found.flagged', name: 'Flagged for Resembling Something (Pending Review of the Review)', desc: 'Sandra from Compliance has visited. She stamped everything that could be stamped. You were present, which counts as consent.', icon: '🚩', secret: true, reward: 5 },
    { id: 'lost-and-found.review', name: 'Sole Member and Chair of the Wendell Performance Review Committee', desc: 'Attend the ten-minute review. His consistency was Outstanding, with concerns. Your attendance was noted on a file, which is a ticket.', icon: '📋', secret: false, reward: 5 }
  ]);

  /* ---------- lines (prefix-free; the speaker is chosen where the line is spoken) ---------- */
  const LN = {
    open: ["Welcome to Lost & Found. Please describe what you have lost. We will describe it back to you, with feeling.", "Window 7 1/2 is open. It has been open since a Tuesday. Nobody can say which.", "We have found nothing since 1974. This is a record, and also a confession.", "Window 7 1/2 welcomes you. Window 7 does not. Window 8 has never been seen."], 'open.sign': ["The sign has been turned over. It is the same sign, now slightly behind.", "LOST: your place in line. FOUND: a different place, slightly behind. Management considers this a swap.", "The sign has two sides. One of them is lying. Both are laminated."],
    'open.gerald': ["Gerald (Vice President of Spuds) has left a note on the counter. It says 'hat'. Please do not ask which hat. He has asked already."], again: ["You again. Your things are where you left them, which is where you lost them.", "Again you. Please take a ticket. It is for the ticket.", "You, in retrospect. Please describe what you have lost. We have the time. It is 4:17.", "Someone has handed these in. They look like you, but better rested."],
    welcomeBack: ["Welcome back. Your {count} items are doing fine. They have not been moved. They have not asked about you.", "Your {count} items held a small meeting while you were out. Nothing was decided. The minutes were taken, and then lost."], wake: ["I was not asleep. I was resting my eyes on the inside of my eyelids. It is a recognised pay grade.", "Name? Never mind. You have the look of someone whose umbrella is in another county.", "Draw it, or say it, or both. Do not tell me what it is. I will tell you what it is. That is the service.", "Mm? Yes? I was in the middle of losing my place. It was going well."],
    warm: ["I was not asleep. I was resting my eyes. They are happier than they were.", "Name? Never mind. You have the look of someone who gave a clerk back his face."], noinput: ["You were about to say something. I have written down the thing you were about to say. It is on the ticket. It is the thing.", "I watched you not say it. I took it down. Do not read the ticket. It will make you say it."],
    bell: ["Ding. I heard it. I hear everything. I misplace some of it.", "The bell is for emergencies. This is not an emergency. This is, however, a bell.", "Yes. Hello. I am awake. I am facing the other way, but awake.", "That was a B-flat. Or a complaint. They are filed together.", "I rang that bell for forty years. It rang me back, twice.", "Please do not ring the bell at the shelf. The shelf takes it personally.", "The bell is brass. The brass has been reported lost. What you are ringing is the report.", "Careful. One ring is for service. Two is for Sandra, and she is already in the building.", "You rang. I answered. That is a transaction, and I am not authorised to do it twice.", "The bell has a pitch. I have never found it. It is on the shelf with the rest."], 'bell.five': ["That is five. I have started a file called Rings. It is thin and it is yours."], 'bell.ten': ["That is ten. The file is now a folder. The folder has a tab. The tab says Rings (Yours)."],
    'bell.spam': ["Twelve rings in three seconds. The bell has been reported lost. It is right there. It is lost in plain sight, which is the hardest kind.", "The bell has been rung to exhaustion. It has asked to be filed. HR describes this as a first.", "Twelve rings. The bell would like to speak to someone about its hours."], 'bell.filed': ["The bell has been filed as Ticket 0101. Please ring the ticket. It rings in paper.", "Ticket 0101: BELL (LOST). Condition: ringing, in principle."],
    'bell.paper': ['Ding.', 'Ding, in a smaller font.', 'Ding. It is a ticket. It is doing its best.'], 'bell.back': ["The bell has been found. It was never lost. It was filed. The distinction is Sandra's.", "The bell is back. It was filed under B, for Bell, and also for Back."], 'bell.kept': ["The bell has been Kept. Please knock. Knocking is on the shelf, next to Gordon."],
    'bell.knock': ["Knock. Yes. Come in. There is no in. Come anyway.", "Two knocks. I will assume that is a code. I do not know the code. Come in.", "Knock. It is a quiet bell. It has opinions about being a knock.", "Knock. I heard it. It is on the shelf next to Gordon, so I hear it twice."], report: ["Mm. Yes. I have seen this. I have not seen this. It is the same feeling.", "Please wait here. I will go and be somewhere else for a while. It is the whole service.", "Noted. It will be described to you shortly. Please do not describe it to yourself in the meantime.", "That is a very specific loss. I have a very general shelf. We will meet in the middle.", "Writing that down. The pen is on a string. The string is on a hook. The hook is on a Tuesday.", "Received. Your loss has been given a number. Your number has been given a chair. Please wait for the chair.", "We had one of those in 1983. It was found. That is why we do not talk about 1983.", "Right. Hold that thought. No, do not hold it, that is how it got lost."],
    'report.empty': ["You have lost nothing. Nothing is very popular. I have a ticket for it. The ticket is nothing, pristine.", "Nothing. A classic. We have never been short of it. It is the one thing in stock."], rummage: ['shuffling', 'sighing at a box', 'reading a label out loud', 'climbing the ladder to look at the ladder', 'consulting a larger ladder', 'apologising to a shelf', 'finding a different thing and keeping it', 'dusting a box that belongs to nobody', 'counting the shelves and arriving at a different number', 'whispering a name at a hatstand'],
    'search.start': ["The room has gone dark. This is part of the search. So is the lamp. You have the lamp. Please do not drop the lamp.", "The lamp is on. The room is not. Please begin. Management will be over here, not helping.", "Search commencing. The shelf has been informed. It has made no preparations.", "Please keep your voice down. The shelf is concentrating, and so is the dark.", "The lamp has been issued to you. You are responsible for it. It is responsible for nothing.", "The lamp has a cord. The cord is not plugged in. The lamp is on anyway. Please do not ask it how."], 'search.hold': ["Hold the lamp steady. If the shelf moves, it is because the floor moved. If the floor moved, it is because I did.", "Left a bit. No, the other left. A little more left. That is the shelf, it is moving, do not tell it.", "I can hear you looking. It is a soft sound, like a coat being thought about.", "Anything lit is, technically, found. Please do not light anything you do not intend to keep.", "Warmer. No. Cooler. No, that was a draught. We have a lot of draughts. They are filed under Weather (Indoor)."],
    'search.none': ["I saw you not looking. It is a skill. I have seen it done by professionals.", "You did not look at anything. The shelf is relieved. It had tidied."], 'search.trust': ["The process thanks you. The process is not a person. It is, however, standing by the door.", "The process is grateful. It had worried it was only being tolerated."],
    'search.back': ["There. I have returned. It was a long way to the shelf and a longer way back.", "I am back. I would like it noted that the shelf is higher than it was.", "Back. The ladder and I are no longer speaking. We will resume on Monday."], yes: ["Noted. It is now yours, and still theirs. It has been placed between you in the form of a form.", "Yours. Of course. Please sign here. Not there. The other here.", "Mm. Yes. It has your look about it. It has everyone's look about it. That is the secret of a good lost thing.", "Yours, then. Wonderful. It has been waiting. I will not say where.", "Everything is somebody's until it is on the shelf. Then it is the shelf's. Please sign."],
    no: ["Noted. It goes back. It has now been lost twice, which is how you can tell it is serious.", "Of course. No. It was a long shot. The shelf is nothing but long shots.", "Not yours. It does not take it personally. It takes everything else personally.", "No. Understood. It goes back on the shelf, slightly more lost than before. That is what no does."], ticket: ["There it is. Your $THING. It is the ticket. It is slightly damp, which is how we know.", "Ticket $N issued. The ticket is your $THING. Please do not lose it. We have no ticket for that.", "I do not give you a ticket for it. I give you it. It happens to be a ticket. It was the only size we had.", "Please do not fold your $THING. It is a ticket. Folding is a different form, and it is closed.", "Your $THING, ticket $N. Do not bend it. Do not read it back to yourself. It gets nervous.", "There. Your $THING. It is a ticket. I say it twice because nobody hears it the first time."],
    'ticket.first': ["Congratulations. A fanfare has been arranged for a cardboard rectangle.", "Congratulations on your first ticket. It is also your first item. It is the only item. It is thriving."], 'ticket.mgmt': ["Items returned to owner: 0. Tickets issued to owner: $N. The owner is thrilled, we assume.", "Your claim was processed by someone who has also lost something, which makes them thorough.", "Per policy, a thing is lost only until it is reported. After that it is Pending, a status with its own chair.", "Your ticket has been countersigned by Dennis (Plant), who has not read it and has never once been wrong."],
    smudge: ["Smudged. Yes. That is more descriptive. Smudging is a recognised form of detail.", "Smudged. Excellent. A smudge is a drawing that has had a long day.", "That is a smudge. I will log it as detail. I will log the detail as smudge. It balances."], 'pad.backspace': ["Erasing is Form 12. Form 12 is the SMUDGE. It is the only eraser. It is a bit of a mess.", "There is no Backspace. There is only forward, and also the SMUDGE."],
    'pad.twang': ["Please do not stretch the string. The string was here first.", "The pencil is tied to the counter. The counter has never once let go of it.", "The string is taut. The string has made its position clear. It is the string."], esc: ["You have already lost it. The Department thanks you for trying to un-lose it.", "Escape noted. There is no escape. There is a door, but it is marked Staff, and I am staff.", "You pressed Escape. The ticket has been told. It is not going anywhere. It is paper."],
    holding: ["Hold. Hold. Management is not looking. Management is looking at the other thing.", "It is tugging. That is normal. It has been in your hand a while and has views.", "Almost. A little more forever. Just the last bit of it.", "The ticket is warm. That is you. It has borrowed some.", "Do not look at it. Look at the shelf. The shelf is looking at you already.", "Please keep your hand steady. A shaking hand is a returned hand, and we have no form for returned.", "It is getting lighter. It is not. It only wants you to think it is. Hold."], 'letgo.done': ["You have let go of your $THING. It is on Shelf Space $SHELF, between a trumpet mouthpiece and a mood.", "Kept. The ticket is on the shelf now. It remembers you. It has been told to be discreet.", "Kept. It has been given a small cardboard box and a label. The label says $THING. The box is thrilled.", "Your $THING is Kept. We have a place for it. It is between the other places and a draught.", "Kept. It has gone to join the others. It did not look back. It cannot; it is flat.", "Your $THING is on Shelf Space $SHELF now. The shelf was told it was an honour. It took it as a warning."],
    'letgo.early': ["You let go early. The ticket held on a bit. Hesitation noted and filed under Almost.", "Release noted. Not completed. The ticket has put its hand back in your pocket.", "You let go of the letting go. The ticket looked at you. It is not angry. It is a ticket."], 'letgo.plaque': ["A plaque has been fitted. A three-note fanfare has been played for a cardboard rectangle. Management is not sorry."],
    'letgo.clause': ["Items you give up are kept. Forever. This is not a figure of speech. It is Clause 9, and Clause 9 has also been kept.", "Kept items cannot be returned. This is not a rule. It is a feeling the shelf has."], 'letgo.sandra': ["Sandra has amended Forever. Forever is now subject to review. Review is scheduled for Forever.", "Sandra has flagged Lost & Found for losing things. Sandra has flagged Found for finding nothing. Clause 14(c) bis.", "Sandra has asked whether Forever includes weekends. Forever has not replied. Forever is checking."],
    keptCount: ["Kept Items: {count}. Nothing in the building has ever left it. This is considered a success.", "Returned to Owner: 0 of 7 1/2. Management is proud of the consistency.", "Kept Items: {count}. That is a collection. A collection is just a loss with a wall.", "The shelf now holds {count} things. It has asked for a bigger shelf. It has been told it is the bigger shelf."], light: ["You hold your $THING (ticket) to the light. It is exactly as translucent as it needs to be and not one thing more.", "Held to the light the ticket reads: 'This is not the thing. It is the thing. It is not.' The watermark is a keyhole, and a very small ficus.", "Against the light it is a ticket. Against the lamp it is also a ticket. Against the dark it is warm.", "You can see through it to the other side of the counter. I am there. I wave with the other hand.", "There is a watermark. It is of you, holding the ticket up to the light. It was made before you came in."],
    'light.mine': ["That is the third time. It has stopped being a ticket and become a word. The word is Mine. It will pass."], lastseen: ["You said 9:40. I have written 4:17. Nine-forty is not a time we recognise on this floor.", "The third ficus is one of three ficuses. Which one is the third is a matter for the ficuses.", "Whatever you slid it to, it is 4:17. The slider is for your comfort. It is not connected to anything.", "The slider has been consulted and has voted for 4:17. It was not permitted to abstain."],
    'lastseen.first': ["4:17 stays 4:17 on every ticket from now on. This is not a policy. It is a time."], 'lastseen.ask': ["When did you last have it? The slider is under the ticket. Slide it to whenever. I will write down what I was going to write down anyway."], ficus5: ["4:17, near the third ficus. That is the fifth time. It is a pattern. It is also a ficus."], ficus10: ["That is ten. The ficus has been informed. It leaned slightly, which in a ficus is a speech."],
    ficus15: ["The ficus is now the fifth ficus of three. We have discussed it. The ficus has not."], ficus20: ["The ficus is also lost. It was found in a different building, standing near its own spot."], ficus30: ["Thirty. The ficus now answers to Dennis. Dennis (Plant) has not objected, and has not noticed."],
    'clause.cite': ["Clause 1 has been cited. Clause 1 is pleased to be cited.", "Kept under Clause 6, warmly.", "Clause 9 is, as ever, not here. Management has checked.", "Clause 4 has been cited. Clause 4 was lost. It is shy in rooms now and is being allowed to stand near the door.", "Clause 6 has been cited. It was not Clause 1, and Clause 1 is hurt."], 'return.yes1': ["Is this yours? It was handed in. By you. Last Thursday, 4:17 PM, near the third ficus.", "Is this yours? It came in on Tuesday. You handed it in. You were wearing the same face then."],
    'return.describe': ["Claim it by describing it. Describe it fully. You have described it fully before. That is the problem.", "Describe it again, from scratch. Do not use the word ticket. Use any other word. It is the only word we have."], 'return.claimed': ["You have claimed your $THING. You have been issued a ticket for your $THING. It is your $THING (ticket) (ticket). This is the correct depth."],
    'return.no': ["Not yours. Noted. It goes back, kept again, with additional forever.", "Not yours. Noted. It goes back, kept again. It is starting to feel like a pattern, and the shelf does not like patterns."], 'nest.1': ["A ticket for the ticket. The ticket for the ticket is, I regret to say, the ticket."], 'nest.2': ["A ticket for the ticket for the ticket. We are ahead of schedule."],
    'nest.3': ["Three deep. The ticket has a ticket, which has a ticket, which is holding a ticket for the first one. It is a family."], 'nest.4': ["It is smaller. Everything is smaller. I did not authorise the scale."], 'nest.5': ["At this depth the ticket is the idea of a ticket. The idea is on the shelf. The shelf is in the idea."], 'nest.6': ["Six. The ticket is now mostly its own paperwork."],
    'nest.7': ["You have claimed a ticket for a ticket seven times. Seven and a half would require the missing half."], 'nest.8': ["Eight. Seven and a half was passed without ceremony. I would like it noted that I noticed."], 'nest.9': ["We are past the end of the numbering. The numbering has been informed. It has taken it well."],
    'sandra.small': ["Sandra has flagged this ticket for being small.", "Sandra has measured the ticket with a ruler she keeps for this. The ruler is also small."], 'sandra.flag': ["Sandra has flagged the flag.", "Sandra has flagged the flag. The flag is pleased to have been noticed.", "Sandra has requested the ticket be returned to full size. She has not said whose."],
    redeem: ["Redeemed. We have returned your $THING in the form in which it was lost: a ticket.", "The ticket has been redeemed for a ticket for the ticket. We apologise for the continuity.", "Please present the ticket to claim your ticket's ticket. I have seen this before. I have seen it in a mirror.", "Redeemed. The ticket has been exchanged for itself, which is the only currency it trusts."], 'redeem.none': ["Redeem what? We have printed a ticket for The Intention To Redeem. It is a normal ticket. It may be given up.", "Redeem what? You are not holding anything. Please hold something. I will accept a posture."],
    'line.ask': ["Has anyone found a $THING? Grey. Ordinary.", "I am looking for a $THING. I would know it if I saw it. I would also know it if I did not.", "I think I lost a $THING here. It would be the one you lost earlier. I had the same one.", "Excuse me. I am looking for a $THING. It is the last one. I have looked everywhere it is not.", "Hello. Have you got a $THING? Small. Valued. Returned to me once, in a dream, by a Tuesday."], 'line.canned': ["I am looking for an umbrella, grey, ordinary. I have been looking since the rain. It is a different rain.", "I have lost the end of the sentence. I begin the sentence again. I do not find it. I am much more fluent.", "Excuse me. Has a train of thought come in? It was going somewhere.", "I have lost my appetite for the afternoon. Has it been handed in? It would be brown and slightly apologetic."],
    'line.object': ["Tickets are not the item.", "Tickets are not the item. I say this to everyone. Everyone nods and takes the ticket."], 'line.objectReply': ["Thank you for my item.", "That is not what I said."],
    'line.thanks': ["Thank you. It is exactly what I lost. It is a ticket. It is exactly what I lost.", "Splendid. I will keep it forever. I have been told that is a clause.", "That is the first time I have been given something and told what it is. I am delighted.", "Thank you. It is exactly the right size. I have been told it is a ticket and I choose to be moved."], 'line.sigh': ["Of course. I will go to the back. The back is where I live.", "I understand. I will return. I have been returning for some time.", "Fine. I will wait. I have been waiting for something since 2011. It may be this."],
    'line.leave': ["A customer sighs and goes to the back of a line that has only a back.", "A customer has given up and left. The line has noticed. The line says nothing. The line is very good at this."], 'hobbs.ask': ["I would like to report a loss. I have lost a $THING. They sound like yours.", "I wish to report a loss. It is a $THING. It is, if I may say so, uncanny, and I do not say so lightly."],
    'hobbs.ticket': ["Yes, we have your $THING. It is kept. A ticket has been issued. I could not tell you whose."], 'gerald.ask': ["I lost a hat here. I did not wear it. I would like it back. It was very much mine.", "I have come about the hat. It was a tuber hat. It is a long story with eyes in it."], 'gerald.reply': ["It is in the Permanent Collection. It is kept forever."],
    'gerald.thanks': ["Splendid. That is the first time I have been told where it is."], 'audit.start': ["Audit in progress. Sandra's inspectors have arrived. They have clipboards. The clipboards have clipboards."], 'audit.disagree': ["The figures disagree with each other. They have agreed to disagree. Sandra has not agreed.", "These are not last time's figures. Sandra says they were never the same figures. Sandra says this is fine."],
    'audit.prophecy': ["The ticket machine has printed a ticket for something you have not lost yet. $ITEM, 8:45 PM, ready for collection."], 'audit.smug': ["As predicted. Please do not look at me like that. It was printed before you had it. That is not my doing. That is the machine's."],
    'audit.over': ["The audit is over. The figures have been filed. They are lost.", "The audit is over. The figures have been filed under Lost, which is a perfectly good category for a figure."], 'pullback.lost': ["The Lost & Found has been lost. A notice has been posted on the counter. The notice has also been lost, and is inside the counter."],
    'pullback.half': ["A half has been found. The other half is looking for it. Lost Today has increased by 7 1/2. This is not a mistake. It is a rounding."], 'pullback.is': ["Is this yours?"], 'pullback.whole': ["Is this yours? It is. It is the whole room. Please keep it on your person."],
    'pullback.after': ["We were never that far back. It has been struck from the minutes, and the minutes have been struck."], 'pocket.intro': ["Your pockets have filled with things you have. You are encouraged to be rid of them."], 'pocket.ask': ["Please surrender an item. It will be Kept. Kept is a promise. Kept is also a shelf."], 'pocket.lint': ["Surrendered: pocket lint. Kept, forever. We have named it Gordon. Gordon has a tag."],
    'pocket.meh': ["Surrendered: one (1) Meh. Kept, forever. It has been given a small velvet cushion and a number."], 'pocket.rcpt': ["Surrendered: a Receipt For The Receipt. Kept, forever. The receipt receipt is in the drawer with the first one. They are friends."], 'pocket.half': ["Surrendered: half a thought. Kept, forever. The other half has been sent a letter."], 'pocket.pencil': ["Surrendered: your pencil. Kept, forever. You may keep drawing. It will be on loan, from itself."],
    'pocket.name': ["Surrendered: your name. It is on the shelf, in a small frame. We will call you 'You'. It is warmer than it sounds."], 'lot0.say': ["You have surrendered everything. That makes you Lost Property. Lot 0: One Valued Employee, name on loan, unclaimed. Please sit on the shelf."], 'lot0.next': ["You were on the shelf. You are free to go. Please note you are Kept."], 'heavy.1': ["I lost a ticket once. 1974. A coat, a cloakroom, a Thursday."],
    'heavy.2': ["I did not get the coat back. I got this job. It was in the same building."], 'heavy.3': ["People think this place is about finding. It is about somewhere for lost things to be kept, so they are not lost somewhere worse."], 'heavy.again': ["I can start again. I am good at starting again."], 'stool.start': ["You are behind the counter now. There is no ceremony. There is a stool. The stool is yours."],
    'stool.thanks': ["Thank you. It is warm. It was warm when I lost it.", "I will keep it forever, which I understand is a clause.", "Thank you. I will tell nobody where I got it. I will tell everybody I got it."], 'stool.first': ["Oh. Oh, thank you. I have been looking for this since the Spring Reorganisation."], 'stool.georgia': ["Georgia. A serious ticket. It has gravity. It will outlive us."], 'stool.mono': ["Monospace. A ticket that does its taxes."],
    'stool.cursive': ["Cursive. A ticket with feelings. It has written you a note on the back."], 'stool.end': ["That is enough. I will have the stool back. It remembers me. Thank you for holding it. The seat is warm, which is the work."], 'blind.start': ["Lot 7 1/2 cannot be described by looking. Please draw it blind. We will know if you peek. We will not do anything about it."], 'blind.cloth': ["The cloth has been cinched. The pad is behind the curtain. The pencil is not."],
    'blind.peek': ["I saw that. I did not see anything. It is a skill."], 'blind.reveal': ["Close. It is your first drawing. It was handed in at 0:03 by someone who looked like you, but better rested."], 'blind.revealNone': ["It is your first drawing. You did not draw. It was an excellent likeness."], 'blind.compare': ["The line between them wobbles. That is the distance. It is not far. It is not near either."],
    'blind.claim': ["Lot 7 1/2 cannot be claimed. It can only be Kept. It has been Kept since before you came in. You are late to it."], 'blind.done': ["Lot 7 1/2 has been described. It was described by the one person who should not have. Congratulations."], 'idle.nudge': ["Take your time. It is 4:17. It will be 4:17 for as long as you need.", "Is there anything else? There is not. I am only asking. It is how I stay awake.", "Mm. Still here. Good. I was beginning to think you had become a ticket.", "I will wait. I am excellent at it. It is half the job. The other half is also waiting."],
    'idle.45': ["Wendell has fallen asleep on the bell. The bell is not ringing. The bell is being very brave.", "Wendell has dozed off with one hand on the stamp. It is not stamping. It is thinking about it, quietly, in its sleep.", "No input detected. Management notes that you are still here, which is a different thing from being present.", "Wendell is dreaming of a queue. It is the same queue. It is shorter in the dream."], 'idle.snore': ["Mm. Not the blue one. The other blue one.", "Two umbrellas. Two. Not one and a picture of one.", "...forty-one thousand two hundred and seven...", "Clause nine. Clause nine. Where have you gone.", "Is this yours. Is this. Is.", "Do not stamp the cat. It has not been lost.", "It was 4:16. I am nearly sure it was 4:16.", "Sandra. The hat is not a hat. It is a hat. Sandra. Sandra."],
    'idle.90': ["The lost things have come down from the shelf. They are queueing at the counter. Each holds a small ticket. Each reads: Lost: you.", "It is very late in the afternoon. The unclaimed things have left the shelf in single file. They carry tickets. They carry them carefully. They are carrying you."], 'idle.claimed': ["Someone has claimed you. It was you. The fee is 0 Meh. The fee was lost, and has been kept.", "You have been claimed. You were an easy match. You were the only one still waiting."],
    'idle.found': ["Found: you. Condition: here. Kept: nobody has said.", "Found today: 1 (you). The board has not been updated. It said 0 and is staying with 0, out of loyalty."], 'spam.fee': ["Rapid reports are not permitted. Sandra has authorised a fee of 0.5 Meh, which is 0.5 Meh we found down the back of the chair.", "You are filing faster than we lose. This is a first, and a fire hazard.", "A rapid-report fee of 0.5 Meh has been applied. Sandra has stood down. Sandra was not aware she was up."],
    'spam.more': ["Overflow. A bin labelled MORE has been brought. It takes the next three without comment. It will print you a receipt for More (3).", "Put it in the bin. The bin does not read. The bin does not judge. The bin will issue a ticket for the bin."], 'spam.sigh': ["Mm. Mm. Mm. That is a great many mms. Let us have one mm per customer.", "That is a lot of clicking. I will make a note of it in the book. The book is mostly this.", "Please pace yourself. The counter can only be loved at so many times an afternoon.", "A very tired sigh comes from behind the counter, in a cardigan."],
    'spam.back': ["Window 7 1/2 will be Back in 15 minutes. (15 seconds.) The difference is a rounding. The sign has been updated.", "The counter is closed for a short, specific rest. Please do not tap the glass. There is no glass. It is the principle."], 'spam.stamp': ["Back. The counter is open. I was in the back. The back is large and has no walls.", "I am back. I was sitting in the back, where the other chair is. It was quiet. It was beautifully quiet."],
    'smile.face': ["That is my face. I lost it in 1998. It was never opened. It is a ticket now. It is in my pocket. Thank you."], 'paradox.1': ["You have reported your ticket lost. You are holding your ticket. These are not two things. They are one thing in a bad mood."], 'paradox.3': ["That is not a ticket. That is a position."], 'coin.found': ["Found today: 1. One (1) Meh, on the floor. Please keep it where it can be found."],
    'coin.fee': ["That is a handling fee. 1 Meh. Please do not take it personally; it was found personally."], 'coin.recount': ["Recount: it was a fee. Found today: 0."], 'word.found': ["You cannot lose a found. Please lose something first. The Department has renamed itself Lost & Lost. It suits it."], 'word.wendell': ["You have lost Wendell. A ticket has been issued. He is in it. Back in 7 1/2 minutes, says the sign, which is wrong by seven."],
    'word.wendellBack': ["Back. I was in the ticket. It is roomier than it looks."], 'word.everything': ["Everything. A bold choice. It has been put in the ticket. It is a very big ticket. It fits in your hand. That is the ticket's whole trick."], 'word.refill': ["Kept (again). It all came back. It was a very short trip."], 'word.nothing3': ["Nothing again. This ticket is blank on both sides. It is the fullest ticket in the building."],
    'word.toast': ["The Toaster was in. It said nothing. It left a slice on the counter, still warm. The slice reads: I understand. It is the warmest ticket we hold."], 'word.sock': ["Half of a pair. We had one come through, once, on its way somewhere better. It left a forwarding address. The address is another sock."],
    'coat.1': ["A coat. You said coat. I will stop for a moment. Please do not tell Management that I stopped."], 'coat.2': ["Grey. Wool. A button gone from the left pocket. In the right, a ticket, numbered 0417. That was the Thursday."], 'coat.3': ["Do not worry. I am not going to say. I have never said. I kept the ticket. It is the one thing I still have of it."], 'coat.4': ["Management has noticed nothing. Management is looking at the other wall. It is a good wall. It has no coats on it."],
    'coat.again': ["A coat. Again. I am all right. It is a coat. It is on the ticket. It is the ticket."], 'leaf.found': ["Found: one (1) leaf. Found by gravity. Gravity has been thanked."], 'leaf.recount': ["Recount: a leaf is a leaf, not an item. Counted as foliage."],
    dennis: ["Dennis (Plant) has been consulted. Dennis (Plant) did not respond. This is the most professional answer the counter has ever had.", "Dennis (Plant) was asked to comment. He leaned toward the window, which is the only comment he has ever made.", "Dennis (Plant) is thriving. He has been told he is the only competent employee. He has taken it in his stride.", "Dennis (Plant) has been touched today. Dennis (Plant) has not been touched since August. He will not discuss it."], 'dennis.15': ["Fifteen. Dennis (Plant) has filed a grievance with the Stapler. The Stapler has seconded it."], 'dennis.30': ["Thirty. Dennis (Plant) has been moved to a sunnier spot and has not noticed, and goes on thriving, out of spite."],
    'dennis.50': ["Fifty. Dennis (Plant) has been given a small plaque. It says Thank You For Your Patience. He is a plant. He has a lot of it."], hundred: ["You have filed 100 reports. Wendell has run out of ticket paper and will issue the next ticket on the back of a ticket. It is the same ticket, from the other side."],
    firstthing: ["You have been looking for this since before you knew."], 'resize.narrow': ["The counter is narrow today. Wendell has been asked to lean. He is leaning with commitment.", "Space is tight. The shelves have drawn in their elbows. Nobody has said who started it."], 'resize.wide': ["The other items are back. They did not say where they were.", "The counter has widened. Wendell has stopped leaning and would like it noted that he was not leaning."], 'keeping.start': ["Roll call of the Permanent Shelf. Each item will be read aloud. None will be returned."],
    'keeping.ladder': ["I shall now read the shelf. Please stand. Or sit. The shelf does not mind."], 'keeping.item': ["Kept: $LABEL.", "Kept: $LABEL. Present.", "Kept: $LABEL. It has been here the whole time.", "Kept: $LABEL. It has nowhere to be."], 'keeping.more': ["And $COUNT more, all Kept. Kept is a very long list when read slowly."], 'keeping.end': ["That is everything. It is not a lot. It is not a little. It is the exact amount."],
    'final.ask': ["I lost something once. At 4:17. I do not remember what. The ficus was a nice colour. Will you draw it for me?"], 'final.after': ["It is a ticket. It is the thing. Thank you. I will keep it. I keep everything. It is the job, and also the problem."], 'final.pocket': ["It is in my pocket. It is warm. Let us not discuss it."], 'final.board': ["Returned to Owner: 0 of 7 1/2. Management is proud of the consistency."],
    'final.congrats': ["Congratulations. You have reached the end of Lost & Found. Nothing has been found. The counter is open."], 'final.aside': ["There is no way to win. This was a completely fair outcome for a lost-and-found."], 'final.next': ["Next."], 'final.ask2': ["What have you lost?"],
    pa: ["Attention staff: the third ficus has requested a quieter Tuesday. Tuesday has been informed.", "Reminder: Mandatory Fun begins at 4:17. Attendance is optional. Fun is not.", "The staff fridge has been cleaned. It has been returned to the staff. The staff did not want it.", "Would the owner of a grey umbrella please come to Window 7 1/2. It is the one that says it is yours.", "There is a Tuesday in the stairwell. It is not ours. It is visibly not ours. Please do not feed it.", "Facilities advise that the clock is correct. It was correct yesterday as well. We apologise for the consistency.", "A small, lost voice has been heard in Aisle 3. It was asked to identify itself. It said 'ah'.", "Sandra from Compliance would like to remind all staff to be compliant. She has not specified with what.", "Today is Tuesday. This has been checked against a different Tuesday and found to be accurate.", "Please remember to take your personal items when leaving. Please also remember to leave them. It is a policy and a trap.", "A parcel has arrived for Window 7 1/2. It is addressed to 'Whoever Lost It'. It is warm.", "The lift is out of order. It is also out of the building. It has gone to find a smaller building and is not answering.", "Staff are reminded that this building has no exit signs, only affirmations. Today's affirmation: You are probably here.", "Dennis (Plant) has been moved six inches to the left. He has been moved back. The six inches are in a drawer.", "The canteen is serving a soup of the day. The day has not been disclosed. It is lost, and also soup.", "A reminder that nothing on the shelf is yours until you have lost it. After that it is still not yours. It is, however, on the shelf.", "The Stapler would like to remind everyone that it is in the room. That is all. It would like that noted.", "Please do not tap on the stock room glass. There is no glass. The tapping is audible. It is upsetting the shelf.", "The suggestion box has been emptied. It had suggestions. It is thinking about them.", "Lost Property would like to remind you that Lost Property is a service, not a place. It is also a place."], 'mid3.start': ["You have been here three minutes. By policy, that is long enough to need a break and not long enough to deserve one. A compromise has been reached.", "Three minutes. Mandatory Fun has been scheduled. Fun will find you. Please remain where you are."],
    'mid3.stretch': ["Please stretch toward the thing you lost. Hold for 7 1/2 seconds. If you cannot reach it, that is the stretch."], 'mid3.wendell': ["I am to hand you a break. It is a ticket. It is for the break. I am not allowed to say what is on it. It says 'break'."], 'mid3.end': ["Break complete. You have been refreshed to a standard agreed in advance. The agreement has been lost."],
    'rev.start': ["You have been here ten minutes. Wendell has been here forty years. It is time for his review. Please remain at the counter. You are a stakeholder."], 'rev.1': ["Metric 1, Items returned to owner: 0 of 7 1/2. Rating: Consistent. Consistency is the only metric that is not on fire."], 'rev.2': ["Metric 2, Punctuality: 4:17, every day. Rating: Exceptional. He has never been late to a time that does not move."],
    'rev.3': ["Metric 3, Warmth: he has kept 41,206 things safe in the dark and spoken to none of them. Rating: Outstanding, with concerns."], 'rev.4': ["Metric 4, Initiative: in 1988 he located a pencil and tied it down. The pencil has had no further incidents."], 'rev.5': ["I would like to say a few words. I will say them to the ficus. The ficus is paying attention. It has not been asked to."],
    'rev.end': ["Wendell has been given a 0.5% raise, paid in 7 1/2 tickets. He has accepted. He has put them with the others. Your attendance is noted on your file, which is a ticket."], 'rare.sandra': ["Sandra from Compliance has glanced at your ticket. A Sandra glance is binding for 7 1/2 minutes.", "Your ticket has been reviewed by Sandra. She had one note. The note was a small nod.", "Sandra stamped your ticket in passing, on her way to a different problem. She has left you the problem. It is shaped like a ticket."],
    'rare.phone1': ["The phone behind the counter is ringing. It is a phone. Nobody has ever seen it plugged in."], 'rare.phone2': ["Lost Property. Yes. No. Yes, it is. No, we do not have that. Yes, I will hold."], 'rare.phone3': ["Wrong number. It was the cloakroom. They wanted the coat. I told them I am working on it."], 'rare.phone4': ["No ticket has been issued for the call. It was not lost. It was, however, brief."],
    'rare.stapler': ["The Stapler (union rep) has placed a notice on the counter. It lists three demands. The first is a lunch break. The second and third are also lunch.", "The Stapler would like it noted that no ticket has been fastened to anything today. It would like this recognised as a service.", "The Stapler has withdrawn its demands. The Stapler has resubmitted its demands. They are the same. The Stapler is rested."], 'ticket.late': ["Your $THING. A ticket. I have stopped saying the rest. You know the rest. We both know the rest.", "Ticket $N. It is your $THING. I used to explain. It is a long shift.", "There. Your $THING. I am not going to say what it is. It rhymes with ticket. It is one.", "$THING, ticket $N. Take it. Hold it. We will both look at it and say nothing, which is the form.", "Your $THING. I have run out of ways to describe a ticket. I have started on the other side of it.", "Here. Your $THING. I did not say the line. I would like credit for the line I did not say."],
    'slot.idle': ["Mm. Not that one. It has views.", "Mm. Careful. Everything on that shelf is on first-name terms with a draught.", "Do not wake the shelf. It is the only one of us who is resting.", "That one is Kept. It is in the middle of being Kept. Please do not interrupt.", "I will look at that after I wake up. I am not asleep. I will look at it after.", "Mm. Yes. That is on the shelf. It is on all the shelves. It is a very thorough shelf."], 'slot.tue': ["Do not touch the Tuesday.", "Not the Tuesday. It has a fine, and it has a feeling about the fine."],
    'search.skip': ["No lamp this time. I know where it is. I know where everything is. It is not where it was.", "I will find that by feel. I have found things by feel since the lamp's second bulb.", "The lamp is in a drawer. It is having a rest. So am I. I will do it in the dark, like a professional.", "I do not need the lamp. I have a very good memory of the dark."], 'queue.4': ["There is a line behind you now. It is polite. It is also a line."], 'queue.8': ["The line has reached the plant. Dennis (Plant) has asked for it to stop. Nobody has told it."],
    'queue.you': ["The last person in the line is holding a ticket. It reads LOST: $LABEL. It is you. You are, as usual, behind yourself."], 'queue.look': ["The whole line has turned to look at you. They are not unkind. They are in a line, and you are the front of it."], 'flag.start': ["Sandra from Compliance has entered the building. She is not visible. She is stamping, and will continue."], 'flag.bell': ["The bell has been flagged for resembling a bell."],
    'flag.knock': ["The knock has been flagged for resembling a bell that was Kept. It asked to be reminded it is a knock. It was flagged for asking."], 'flag.dennis': ["Dennis (Plant) has been flagged for thriving without a permit. He has not noticed. He is thriving."], 'flag.pad': ["The drawing pad has been flagged for being blank. Sandra describes this as a lot to be seen doing."],
    'flag.printer': ["The printer has been flagged for printing. It was doing what it was for. Sandra has seen that before."], 'flag.wendell': ["Wendell has been flagged. He asked for what. Sandra said: for asking."], 'flag.board': ["The board has been flagged for being correct at the wrong time. Sandra has written 'at the wrong time' in the margin."],
    'flag.swat': ["A flag has been swatted. Sandra has noted the swatting. The note has been flagged.", "You swatted a flag. It has been replaced by a smaller flag, which is also yours."], 'flag.end': ["Sandra has stamped the whole window and written Reviewed across it. It is the first thing she has finished since 2011."], 'flag.after': ["The stamp is dry. It will not come off, because it was never on. Management considers this Sandra's finest work."]
  };
  Object.keys(LN).forEach((c) => { P.addLines('m:lost-and-found:' + c, LN[c]); });

  P.injectCSS(`
.m-lost-and-found-room{--ink:#2b2118;--teal:#2f5d62;--pine:#c98f4f;--lip:#8a5a2b;--brass:#d8a631;--ticket:#ffd9c7;--glow:#fff2a8;--dark:#1f2b2e;--stamp:#d63b3b;--mint:#7bd9b0;--lilac:#b79df2;--gold:#f4c542;--cream:#fff6dc;position:relative;min-height:420px;padding:10px 10px 14px;color:var(--ink);overflow-x:hidden;font:500 .92rem/1.35 ui-rounded,'Trebuchet MS',system-ui,sans-serif;background:radial-gradient(rgba(255,255,255,.08) 1.2px,transparent 1.7px) 0 0/16px 16px,var(--teal)} .m-lost-and-found-room *{box-sizing:border-box} .m-lost-and-found-room [hidden]{display:none!important} .m-lost-and-found-scene{position:relative;z-index:1;display:flex;flex-direction:column;gap:12px;max-width:1100px;margin:0 auto;transform-origin:50% 55%;transition:transform 2s ease-in-out} .m-lost-and-found-pullb .m-lost-and-found-scene{transform:scale(.35)} .m-lost-and-found-room :focus-visible{outline:3px solid #ff6f61;outline-offset:2px} .m-lost-and-found-dimmed .m-lost-and-found-scene{filter:brightness(.82)} .m-lost-and-found-board{position:relative;display:flex;gap:12px;align-items:stretch;padding-top:20px} .m-lost-and-found-chains{position:absolute;left:0;right:0;top:0;height:22px;display:flex;justify-content:space-around;padding:0 18%} .m-lost-and-found-chain{width:8px;height:100%;background:repeating-linear-gradient(180deg,#9aa0a3 0 6px,#5d6366 6px 9px);border-radius:3px} .m-lost-and-found-sign{flex:1.3;min-height:76px;perspective:700px} .m-lost-and-found-signin{position:relative;width:100%;height:100%;min-height:76px;transform-style:preserve-3d;transition:transform 1s} .m-lost-and-found-signin.m-lost-and-found-flip{transform:rotateX(180deg)} .m-lost-and-found-sface{position:absolute;inset:0;display:grid;place-items:center;padding:6px 12px;text-align:center;font-weight:900;font-size:1.02rem;letter-spacing:.03em;background:#f6e7c1;border:3px solid var(--ink);border-radius:8px;box-shadow:4px 4px 0 var(--ink);backface-visibility:hidden;-webkit-backface-visibility:hidden} .m-lost-and-found-sback{transform:rotateX(180deg);background:var(--ticket);font-size:.8rem} .m-lost-and-found-rm .m-lost-and-found-signin.m-lost-and-found-flip{transform:none}
.m-lost-and-found-rm .m-lost-and-found-sface{backface-visibility:visible;-webkit-backface-visibility:visible} .m-lost-and-found-rm .m-lost-and-found-sback{transform:none;opacity:0} .m-lost-and-found-rm .m-lost-and-found-flip .m-lost-and-found-sback{opacity:1} .m-lost-and-found-rm .m-lost-and-found-flip .m-lost-and-found-sfront{opacity:0} .m-lost-and-found-fboard{flex:1.5;display:grid;grid-template-columns:repeat(4,1fr);gap:6px;padding:8px;background:var(--dark);border:3px solid var(--brass);border-radius:8px;box-shadow:4px 4px 0 var(--ink)} .m-lost-and-found-cell{display:flex;flex-direction:column;gap:2px;min-width:0;text-align:center} .m-lost-and-found-ck{font-size:.66rem;font-weight:800;letter-spacing:.06em;color:var(--brass)} .m-lost-and-found-cv{font:900 1.15rem/1.1 ui-monospace,Consolas,monospace;color:var(--glow);background:#101a1c;border-radius:4px;padding:4px 2px;overflow-wrap:break-word} .m-lost-and-found-flipc{animation:m-lost-and-found-flipc .45s ease-out} .m-lost-and-found-stock{border:3px solid var(--ink);border-radius:10px;background:var(--dark);box-shadow:4px 4px 0 var(--ink);overflow:hidden} .m-lost-and-found-frame{position:relative;padding:10px;min-height:170px;background:linear-gradient(#27393c,#1f2b2e);overflow:hidden} .m-lost-and-found-grid{position:relative;z-index:1;display:grid;grid-template-columns:repeat(5,1fr);gap:8px} .m-lost-and-found-narrow .m-lost-and-found-grid{grid-template-columns:repeat(3,1fr)} .m-lost-and-found-slot{position:relative;height:54px;padding:0;font-size:26px;line-height:1;color:#fff;background:#2f4448;border:2px solid #101a1c;border-radius:6px;cursor:pointer;transition:background .15s,box-shadow .15s} .m-lost-and-found-slot.m-lost-and-found-lit{background:#4b655d;box-shadow:inset 0 0 0 2px var(--glow),0 0 10px rgba(255,242,168,.5)}
.m-lost-and-found-slot.m-lost-and-found-mine{background:#fff1d6;border:2px dashed var(--lip)} .m-lost-and-found-se{display:block} .m-lost-and-found-sn{position:absolute;left:3px;top:2px;padding:1px 4px;border-radius:3px;background:var(--brass);color:var(--ink);font:900 10px/1.1 ui-monospace,Consolas,monospace} .m-lost-and-found-lampov{position:absolute;inset:0;z-index:3;pointer-events:none;background:radial-gradient(circle at var(--lx,50%) var(--ly,50%),transparent 0,transparent 62px,rgba(10,16,18,.92) 140px)} .m-lost-and-found-lampov.m-lost-and-found-dim{background:rgba(10,16,18,.35)} .m-lost-and-found-swallow .m-lost-and-found-grid{animation:m-lost-and-found-swallow 2s ease-in-out} .m-lost-and-found-motes{position:absolute;inset:0;z-index:2;pointer-events:none} .m-lost-and-found-mote{position:absolute;width:4px;height:4px;border-radius:50%;background:#fff6c8;opacity:.45;animation:m-lost-and-found-dr0 9s ease-in-out infinite} .m-lost-and-found-mote.m-lost-and-found-m1{animation-name:m-lost-and-found-dr1;animation-duration:12s} .m-lost-and-found-ladder{position:absolute;bottom:0;left:50%;width:34px;height:100%;z-index:2;pointer-events:none;opacity:0;transform:translateX(var(--lax,0px));transition:transform .4s,opacity .4s} .m-lost-and-found-dark .m-lost-and-found-ladder{opacity:.85} .m-lost-and-found-rail{position:absolute;top:0;bottom:0;width:4px;background:var(--lip)} .m-lost-and-found-rl{left:3px}.m-lost-and-found-rr{right:3px} .m-lost-and-found-rung{position:absolute;left:3px;right:3px;height:3px;background:var(--pine)} .m-lost-and-found-tagcard{display:flex;flex-direction:column;gap:6px;min-height:62px;padding:8px 12px 20px;background:#f6e7c1;border-top:3px solid var(--ink)} .m-lost-and-found-tagtxt{font:700 .88rem/1.3 'Segoe Print','Bradley Hand',cursive;overflow-wrap:anywhere}
.m-lost-and-found-ask{display:flex;flex-wrap:wrap;gap:6px;align-items:center} .m-lost-and-found-askq{font-weight:900} .m-lost-and-found-clerk{position:relative;z-index:2;display:grid;grid-template-columns:1fr auto 1fr;align-items:end;gap:8px;margin-top:-26px} .m-lost-and-found-narrow .m-lost-and-found-clerk{grid-template-columns:auto 1fr auto} .m-lost-and-found-cl{position:relative;display:flex;align-items:flex-end;min-height:60px} .m-lost-and-found-cc{position:relative;display:flex;justify-content:center} .m-lost-and-found-cr{display:flex;gap:12px;align-items:flex-end;justify-content:flex-end} .m-lost-and-found-wend{position:relative;width:150px;height:118px;transition:transform .5s,opacity .5s} .m-lost-and-found-whead{position:absolute;left:50%;top:0;transform:translateX(-50%);font-size:64px;line-height:1} .m-lost-and-found-cardi{position:absolute;left:50%;bottom:0;width:100px;height:54px;transform:translateX(-50%);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:7px;background:#a85d3f;border:3px solid var(--ink);border-radius:32px 32px 6px 6px} .m-lost-and-found-cardi::before{content:'';position:absolute;top:-4px;left:50%;width:34px;height:16px;transform:translateX(-50%);background:#f4ead2;border:3px solid var(--ink);border-radius:0 0 18px 18px} .m-lost-and-found-cbtn{width:9px;height:9px;border-radius:50%;background:#f2e3c3;border:2px solid var(--ink)} .m-lost-and-found-loupe{position:absolute;left:calc(50% + 6px);top:2px;width:20px;height:20px;border:3px solid #6b4a24;border-radius:50%;background:rgba(190,225,255,.5)} .m-lost-and-found-wchain{position:absolute;left:50%;top:52px;width:62px;height:22px;transform:translateX(-50%);border:2px solid var(--lip);border-top:0;border-radius:0 0 40px 40px} .m-lost-and-found-wgrin{display:none;position:absolute;left:50%;top:46px;width:24px;height:10px;transform:translateX(-50%);border-bottom:3px dashed var(--ink);border-radius:0 0 20px 20px} .m-lost-and-found-grin .m-lost-and-found-wgrin{display:block}
.m-lost-and-found-zzz{position:absolute;right:6px;top:-8px;font-weight:900;font-size:1.5rem;color:var(--glow);opacity:0} .m-lost-and-found-asleep{transform:translateY(10px) rotate(8deg);opacity:.9} .m-lost-and-found-asleep .m-lost-and-found-zzz{opacity:1;animation:m-lost-and-found-zz 2.2s ease-in-out infinite} .m-lost-and-found-away{transform:translateX(-150%);opacity:0} .m-lost-and-found-climb{transform:translateY(-10px) scale(.96)} .m-lost-and-found-stool{transform:translateX(150%) scale(.9)} .m-lost-and-found-intick{opacity:0;transform:scale(.4)} .m-lost-and-found-lean{transform:rotate(-7deg)} .m-lost-and-found-wpocket{position:absolute;left:28px;bottom:16px;z-index:2;width:30px;height:21px;overflow:hidden;font-size:15px;line-height:21px;text-align:center;background:#fff1d6;border:2px solid var(--ink);border-radius:3px} .m-lost-and-found-wpocket .m-lost-and-found-thumb{width:100%;height:100%;border:0} .m-lost-and-found-bubs{position:absolute;left:62%;top:-8px;z-index:4;width:min(230px,42vw);display:flex;flex-direction:column;gap:4px;pointer-events:none} .m-lost-and-found-narrow .m-lost-and-found-bubs{display:none} .m-lost-and-found-bub{padding:4px 9px;font-size:.76rem;font-weight:700;background:#fff;border:2px solid var(--ink);border-radius:10px;box-shadow:2px 2px 0 var(--ink);animation:m-lost-and-found-pop .25s ease-out} .m-lost-and-found-back7{position:absolute;left:50%;bottom:4px;transform:translateX(-50%);white-space:nowrap;padding:2px 8px;font-size:.68rem;font-weight:900;background:#f9e29a;border:3px solid var(--ink)} .m-lost-and-found-bell{width:58px;height:58px;padding:0;font-size:34px;line-height:1;background:var(--brass);border:3px solid var(--ink);border-radius:50%;box-shadow:3px 3px 0 var(--ink);cursor:pointer} .m-lost-and-found-bell:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}
.m-lost-and-found-rang{animation:m-lost-and-found-ring .4s ease-out} .m-lost-and-found-bell.m-lost-and-found-paper{background:#f4ead2;filter:grayscale(1);border-style:dashed;transform:rotate(-8deg) scaleX(.85)} .m-lost-and-found-knock{width:100%;height:46px;padding:0;opacity:.28;cursor:pointer;background:var(--glow);border:3px solid var(--ink);border-radius:8px} .m-lost-and-found-knock:hover,.m-lost-and-found-knock:focus-visible{opacity:.85} .m-lost-and-found-dennis{display:flex;flex-direction:column;align-items:center;padding:0;background:none;border:0;cursor:pointer} .m-lost-and-found-dleaf{font-size:38px;line-height:1;margin-bottom:-10px;transform-origin:50% 100%;animation:m-lost-and-found-sway 4s ease-in-out infinite} .m-lost-and-found-pot{position:relative;width:44px;height:26px;background:#c4673a;border:3px solid var(--ink);border-radius:2px 2px 10px 10px} .m-lost-and-found-printer{position:relative;width:74px;height:36px;background:var(--brass);border:3px solid var(--ink);border-radius:6px;box-shadow:3px 3px 0 var(--ink)} .m-lost-and-found-pslot{position:absolute;left:10px;right:22px;top:14px;height:6px;background:var(--ink);border-radius:3px} .m-lost-and-found-plamp{position:absolute;right:6px;top:6px;width:9px;height:9px;border-radius:50%;background:#7a2a2a} .m-lost-and-found-blink .m-lost-and-found-plamp{animation:m-lost-and-found-blink .15s steps(2) 6} .m-lost-and-found-counter{position:relative;display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1.25fr) minmax(0,.8fr);gap:12px;padding:14px 12px 12px;background:repeating-linear-gradient(90deg,rgba(0,0,0,.05) 0 2px,transparent 2px 10px),var(--pine);border:3px solid var(--ink);border-top:12px solid var(--lip);border-radius:12px 12px 4px 4px;box-shadow:4px 4px 0 var(--ink)} .m-lost-and-found-stack .m-lost-and-found-counter{grid-template-columns:minmax(0,1fr)} .m-lost-and-found-zone{min-width:0;display:flex;flex-direction:column;gap:8px} .m-lost-and-found-clip{position:relative;display:flex;flex-direction:column;gap:8px;padding:14px 10px 10px;background:#fffaf0;border:3px solid var(--ink);border-radius:8px;box-shadow:3px 3px 0 var(--ink)} .m-lost-and-found-clip::before{content:'';position:absolute;top:-10px;left:50%;width:56px;height:14px;transform:translateX(-50%);background:var(--brass);border:3px solid var(--ink);border-radius:4px}
.m-lost-and-found-lab{font-weight:900;font-size:.82rem} .m-lost-and-found-inp{width:100%;min-height:42px;padding:6px 10px;font:600 1rem system-ui,sans-serif;color:var(--ink);background:#fff;border:3px solid var(--ink);border-radius:8px} .m-lost-and-found-chips{display:flex;flex-wrap:wrap;gap:6px} .m-lost-and-found-chip{min-height:32px;padding:3px 10px;font:800 .76rem system-ui,sans-serif;color:var(--ink);background:#e3d8fb;border:2px solid var(--ink);border-radius:99px;box-shadow:2px 2px 0 var(--ink);cursor:pointer} .m-lost-and-found-chip:active{transform:translate(1px,1px);box-shadow:1px 1px 0 var(--ink)} .m-lost-and-found-chip:disabled{opacity:.55;cursor:default} .m-lost-and-found-padw{position:relative;width:280px;max-width:100%;aspect-ratio:280/240;margin:0 auto;transition:width .45s} .m-lost-and-found-pad{position:absolute;left:0;top:0;width:100%;height:83.333%;touch-action:none;cursor:crosshair;background:#fffdf3 repeating-linear-gradient(0deg,transparent 0 17px,rgba(60,110,160,.13) 17px 18px);box-shadow:0 0 0 3px var(--ink)} .m-lost-and-found-tether{position:absolute;left:0;top:0;width:100%;height:100%;z-index:3;pointer-events:none;overflow:visible} .m-lost-and-found-retov{position:absolute;left:0;top:0;width:100%;height:83.333%;z-index:2;pointer-events:none;border:3px dashed var(--stamp);background:linear-gradient(90deg,transparent calc(84% - 1px),rgba(214,59,59,.5) calc(84% - 1px) 84%,rgba(214,59,59,.1) 84%)} .m-lost-and-found-blindm::after{content:'THE CLOTH IS DOWN';position:absolute;left:0;top:0;width:100%;height:83.333%;z-index:2;display:grid;place-items:center;pointer-events:none;color:#fff;font-weight:900;letter-spacing:.1em;background:repeating-linear-gradient(45deg,#6a4f8a 0 8px,#7b5f9e 8px 16px);opacity:.93} .m-lost-and-found-pnote{position:absolute;left:4px;top:4px;z-index:2;padding:0 6px;font:italic 700 .7rem system-ui,sans-serif;background:#fff;border:1px solid var(--ink)} .m-lost-and-found-prow{display:flex;gap:8px;align-items:center;justify-content:space-between} .m-lost-and-found-hint{font-size:.8rem;font-style:italic;font-weight:700} .m-lost-and-found-btn{min-height:38px;padding:0 12px;font:800 .82rem system-ui,sans-serif;color:var(--ink);background:#fff;border:3px solid var(--ink);border-radius:12px;box-shadow:3px 3px 0 var(--ink);cursor:pointer} .m-lost-and-found-btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}
.m-lost-and-found-btn:disabled{opacity:.55;cursor:default} .m-lost-and-found-rbtn{min-height:50px;font-size:1.05rem;letter-spacing:.04em;background:#ff8d7a;box-shadow:4px 4px 0 var(--ink)} .m-lost-and-found-smudge{background:#e3d8fb;min-height:34px} .m-lost-and-found-stc2{display:flex;gap:10px;align-items:center;padding:10px;background:#fffaf0;border:3px solid var(--ink);border-radius:8px;box-shadow:3px 3px 0 var(--ink)} .m-lost-and-found-stc{font-size:44px;line-height:1} .m-lost-and-found-stt{margin:0;font:700 .95rem 'Segoe Print','Bradley Hand',cursive} .m-lost-and-found-strow{display:flex;flex-direction:column;gap:8px} .m-lost-and-found-stb{min-height:48px;font-size:1.05rem;background:#fff1d6} .m-lost-and-found-wallclock{padding:6px 10px;background:#fff;border:3px solid var(--ink);border-radius:8px;font-weight:800;font-size:.8rem} .m-lost-and-found-clk{font:900 1.1rem ui-monospace,Consolas,monospace} .m-lost-and-found-clkn{font-size:.7rem;font-weight:600} .m-lost-and-found-tpanel{display:flex;flex-direction:column;gap:8px;padding:10px;background:#fffaf0;border:3px solid var(--ink);border-radius:8px;box-shadow:3px 3px 0 var(--ink)} .m-lost-and-found-tempty{padding:18px 10px;text-align:center;font-weight:700;border:3px dashed #8a5a2b;border-radius:8px;background:#fff1d6} .m-lost-and-found-tk{position:relative;margin:0 6px 4px 6px;padding:8px 40px 8px 18px;border:3px solid var(--ink);border-radius:6px;font:600 .74rem/1.35 ui-monospace,Consolas,monospace;cursor:pointer;transition:transform .2s} .m-lost-and-found-tk::after{content:'';position:absolute;left:-8px;top:0;bottom:0;width:10px;background:radial-gradient(circle at 5px 50%,#fffaf0 4px,transparent 4.6px) 0 0/10px 14px repeat-y;pointer-events:none} .m-lost-and-found-tint-salmon{background:#ffd9c7}.m-lost-and-found-tint-lilac{background:#e3d8fb}.m-lost-and-found-tint-mustard{background:#f9e29a}.m-lost-and-found-tint-mint{background:#c4f1dd}.m-lost-and-found-tint-cream{background:#fff1d6}
.m-lost-and-found-l1{box-shadow:4px 4px 0 -1px #f3cdbb,4px 4px 0 1px var(--ink)} .m-lost-and-found-l2{box-shadow:4px 4px 0 -1px #f3cdbb,4px 4px 0 1px var(--ink),8px 8px 0 -1px #ecc2ad,8px 8px 0 1px var(--ink)} .m-lost-and-found-l3{box-shadow:4px 4px 0 -1px #f3cdbb,4px 4px 0 1px var(--ink),8px 8px 0 -1px #ecc2ad,8px 8px 0 1px var(--ink),12px 12px 0 -1px #e5b8a2,12px 12px 0 1px var(--ink)} .m-lost-and-found-holo{position:absolute;left:0;top:0;bottom:0;width:8px;background:conic-gradient(from 0deg,#ff6f61,#f4c542,#7bd9b0,#b79df2,#ff6f61);opacity:.6} .m-lost-and-found-tk .m-lost-and-found-tback,.m-lost-and-found-tk.m-lost-and-found-rev .m-lost-and-found-tfront{display:none} .m-lost-and-found-tk.m-lost-and-found-rev .m-lost-and-found-tback{display:block;min-height:80px} .m-lost-and-found-thead{font-weight:900;letter-spacing:.08em;font-size:.72rem;border-bottom:2px solid var(--ink);padding-bottom:3px;margin-bottom:6px} .m-lost-and-found-tmain{display:flex;gap:10px;align-items:flex-start} .m-lost-and-found-thumb{width:64px;height:46px;flex:none;background:#fff;border:2px solid var(--ink)} .m-lost-and-found-tem{flex:none;width:64px;text-align:center;font-size:40px;line-height:46px} .m-lost-and-found-rg1{display:grid;place-items:center;width:52px;height:38px;margin:4px 6px;border:2px solid var(--ink);background:#fff1d6} .m-lost-and-found-rg2{display:grid;place-items:center;width:34px;height:24px;border:2px solid var(--ink);background:var(--ticket);font-size:13px;line-height:1} .m-lost-and-found-tinfo{min-width:0} .m-lost-and-found-tl{overflow-wrap:anywhere} .m-lost-and-found-tk2{font-weight:900} .m-lost-and-found-titem{font-weight:900;font-size:.8rem}
.m-lost-and-found-tnote{margin:3px 0;font:italic 700 .72rem 'Segoe Print','Bradley Hand',cursive;color:#3d4f8a;overflow-wrap:anywhere} .m-lost-and-found-tfoot{margin-top:6px;padding-top:4px;border-top:1px dashed var(--ink);font-size:.68rem;font-weight:800;letter-spacing:.03em} .m-lost-and-found-tclause{margin:4px 0;font:600 .85rem/1.35 Georgia,serif} .m-lost-and-found-stub{position:absolute;right:0;top:0;bottom:0;width:32px;display:grid;place-items:center;border-left:3px dashed var(--ink);writing-mode:vertical-rl;font:800 .78rem Georgia,serif;letter-spacing:.14em} .m-lost-and-found-stub2{right:34px;border-left-style:solid;opacity:.6} .m-lost-and-found-wm{position:absolute;right:52px;top:50%;font-size:96px;line-height:1;opacity:0;transform:translateY(-50%);pointer-events:none;transition:opacity .3s} .m-lost-and-found-an-lit .m-lost-and-found-wm{opacity:.9} .m-lost-and-found-an-lit{animation:m-lost-and-found-glint 2s} .m-lost-and-found-an-mine::before{content:'Mine.';position:absolute;inset:0;z-index:3;display:grid;place-items:center;background:#fff1d6;border-radius:3px;font:900 2rem Georgia,serif} .m-lost-and-found-rain{position:absolute;inset:0;opacity:0;overflow:hidden;pointer-events:none;background:repeating-linear-gradient(100deg,transparent 0 6px,rgba(70,120,200,.5) 6px 7px)} .m-lost-and-found-an-drip .m-lost-and-found-rain{opacity:1;animation:m-lost-and-found-rain .5s linear infinite} .m-lost-and-found-an-shake{animation:m-lost-and-found-shake .5s 2} .m-lost-and-found-an-spin{animation:m-lost-and-found-spin 1.2s ease-in-out} .m-lost-and-found-an-sag{animation:m-lost-and-found-sag 1.2s ease-in-out} .m-lost-and-found-an-float{animation:m-lost-and-found-float 1.2s ease-in-out} .m-lost-and-found-an-pulse{animation:m-lost-and-found-pulse .6s ease-in-out 2}
.m-lost-and-found-printing{animation:m-lost-and-found-reveal .9s ease-out} .m-lost-and-found-fly{transition:transform .4s,opacity .4s;transform:translateY(240px) scale(.3)!important;opacity:0} .m-lost-and-found-claimed{position:absolute;right:46px;bottom:8px;padding:0 8px;transform:rotate(-12deg);color:var(--stamp);border:3px double var(--stamp);font-weight:900;letter-spacing:.1em;opacity:.85} .m-lost-and-found-verbs{display:flex;flex-wrap:wrap;gap:6px} .m-lost-and-found-vb{min-height:40px;font-size:.74rem} .m-lost-and-found-v-let.m-lost-and-found-ringing,.m-lost-and-found-surr.m-lost-and-found-ringing{background:conic-gradient(var(--mint) calc(var(--p,0) * 1%),#fff 0)} .m-lost-and-found-ls{display:flex;flex-direction:column;gap:2px} .m-lost-and-found-lsl{font-size:.74rem;font-weight:800} .m-lost-and-found-slider{width:100%} .m-lost-and-found-sws{display:flex;flex-wrap:wrap;gap:5px} .m-lost-and-found-sw{min-height:30px;padding:0 9px;font-size:.7rem;box-shadow:2px 2px 0 var(--ink);border-width:2px} .m-lost-and-found-tray{display:flex;flex-wrap:wrap;gap:6px;transition:transform .5s} .m-lost-and-found-tray.m-lost-and-found-sag{transform:rotate(-2deg) translateY(6px)} .m-lost-and-found-tchip{display:inline-flex;gap:4px;align-items:center;max-width:100%;min-height:32px;padding:2px 8px;font:800 .7rem system-ui,sans-serif;color:var(--ink);background:#fff1d6;border:2px solid var(--ink);border-radius:8px;cursor:pointer} .m-lost-and-found-tchip.m-lost-and-found-on{background:#ffd166;box-shadow:2px 2px 0 var(--ink)} .m-lost-and-found-tcl{max-width:150px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.m-lost-and-found-prevb{align-self:flex-start;min-height:28px;font-size:.7rem;border-width:2px;box-shadow:2px 2px 0 var(--ink)} .m-lost-and-found-prevl{max-height:92px;margin:0;padding:4px 4px 4px 18px;overflow:auto;font-size:.7rem;font-weight:600;background:#fff;border:2px solid var(--ink);border-radius:6px} .m-lost-and-found-pbar{display:flex;flex-wrap:wrap;gap:6px} .m-lost-and-found-pbb{background:#ffd166} .m-lost-and-found-auditp{display:flex;flex-direction:column;gap:5px;padding:10px;background:#fffaf0;border:3px solid var(--ink);border-radius:8px;box-shadow:3px 3px 0 var(--ink)} .m-lost-and-found-clips{font-size:34px;letter-spacing:6px} .m-lost-and-found-fig{margin:0;padding:2px 6px;font:800 .8rem ui-monospace,Consolas,monospace;background:#fff;border:2px solid var(--ink);border-radius:4px} .m-lost-and-found-slip{padding:6px 8px;font:800 .75rem ui-monospace,Consolas,monospace;background:#fff1d6;border:2px dashed var(--ink)} .m-lost-and-found-reveal{display:flex;flex-direction:column;gap:6px;padding:10px;background:#fffaf0;border:3px solid var(--ink);border-radius:8px;box-shadow:3px 3px 0 var(--ink)} .m-lost-and-found-rrow{display:flex;align-items:center;justify-content:center;gap:4px} .m-lost-and-found-rcard{display:flex;flex-direction:column;align-items:center;gap:3px;min-width:0} .m-lost-and-found-rcl{font-size:.68rem;font-weight:800;text-align:center} .m-lost-and-found-rcan{max-width:100%;background:#fff;border:2px solid var(--ink)} .m-lost-and-found-wob{width:46px;height:20px;flex:none;overflow:visible} .m-lost-and-found-stampk{position:absolute;left:50%;top:38%;z-index:6;max-width:80%;padding:6px 16px;transform:translate(-50%,-50%) rotate(-6deg);pointer-events:none;text-align:center;font:900 1.2rem system-ui,sans-serif;letter-spacing:.05em;color:#14634a;background:rgba(123,217,176,.9);border:4px double #14634a} .m-lost-and-found-slam{animation:m-lost-and-found-slam .35s ease-out}
.m-lost-and-found-pockets{display:grid;grid-template-columns:repeat(3,1fr);gap:6px} .m-lost-and-found-pk{min-height:48px;padding:0;font-size:24px;line-height:1} .m-lost-and-found-pk.m-lost-and-found-on{background:#ffd166} .m-lost-and-found-pk.m-lost-and-found-gone{opacity:.35} .m-lost-and-found-surr{min-height:44px} .m-lost-and-found-letter{position:relative;height:50px;display:grid;place-items:center;background:var(--brass);border:3px solid var(--ink);border-radius:6px;box-shadow:3px 3px 0 var(--ink)} .m-lost-and-found-lett{font-weight:900;letter-spacing:.2em;font-size:.8rem} .m-lost-and-found-flap{position:absolute;left:12%;right:12%;top:8px;height:7px;background:var(--ink);border-radius:3px;transform-origin:50% 0} .m-lost-and-found-flap.m-lost-and-found-thunk{animation:m-lost-and-found-thunk .45s ease-out} .m-lost-and-found-custbox{display:flex;flex-direction:column;gap:6px;padding:8px;background:#fffaf0;border:3px solid var(--ink);border-radius:8px;box-shadow:3px 3px 0 var(--ink)} .m-lost-and-found-chead{display:flex;align-items:center;gap:8px} .m-lost-and-found-ce{font-size:38px;line-height:1} .m-lost-and-found-cwait{font-size:22px;opacity:.3;filter:grayscale(1)} .m-lost-and-found-ct{margin:0;padding:6px 8px;font-size:.78rem;font-weight:700;background:#fff;border:2px solid var(--ink);border-radius:10px} .m-lost-and-found-crow{display:flex;flex-wrap:wrap;gap:6px} .m-lost-and-found-chand{background:#c4f1dd;font-size:.72rem;min-height:36px}
.m-lost-and-found-cno{font-size:.72rem;min-height:36px} .m-lost-and-found-back15{position:absolute;left:50%;top:48%;z-index:7;max-width:90%;padding:8px 14px;transform:translate(-50%,-50%) rotate(-3deg);pointer-events:none;text-align:center;font-weight:900;font-size:.9rem;background:#f9e29a;border:4px solid var(--ink);box-shadow:4px 4px 0 var(--ink)} .m-lost-and-found-bin{position:absolute;right:14px;bottom:150px;z-index:6;padding:12px 18px;pointer-events:none;background:#b9b4a6;border:3px solid var(--ink);border-radius:4px 4px 12px 12px;box-shadow:3px 3px 0 var(--ink);animation:m-lost-and-found-pop .3s} .m-lost-and-found-binl{font-weight:900;letter-spacing:.12em} .m-lost-and-found-binb{animation:m-lost-and-found-binb .5s} .m-lost-and-found-shelf{padding:8px 10px 6px;background:var(--lilac);border:4px solid var(--gold);border-radius:8px;box-shadow:0 0 0 3px var(--ink),4px 4px 0 3px var(--ink)} .m-lost-and-found-shelfh{display:flex;flex-wrap:wrap;gap:8px;align-items:baseline;margin-bottom:4px} .m-lost-and-found-shelft{font-weight:900;letter-spacing:.1em;font-size:.82rem} .m-lost-and-found-shelfs{font-size:.7rem;font-style:italic} .m-lost-and-found-scan{display:block;width:100%;height:64px;background:rgba(255,255,255,.28);border-radius:4px} .m-lost-and-found-shelfl{max-height:96px;margin:6px 0 0;padding:0;overflow:auto;list-style:none;font:600 .72rem/1.3 system-ui,sans-serif} .m-lost-and-found-shi{padding:2px 4px;border-bottom:1px dotted rgba(43,33,24,.4)} .m-lost-and-found-shi.m-lost-and-found-hi{background:var(--glow);font-weight:800} .m-lost-and-found-cap{min-height:2.7em;margin:2px 4px 0;font-weight:700;font-size:.9rem;color:var(--cream)} .m-lost-and-found-foot{margin:0 4px;font-size:.7rem;color:var(--cream);opacity:.85} .m-lost-and-found-night{position:absolute;inset:0;z-index:20;display:flex;flex-wrap:wrap;gap:10px;align-items:flex-end;justify-content:center;padding:0 12px 30%;pointer-events:none;background:radial-gradient(circle at 50% 55%,transparent 15%,rgba(6,10,14,.8) 90%)}
.m-lost-and-found-nc{display:flex;flex-direction:column;align-items:center;max-width:130px;padding:4px 8px;font-size:.7rem;font-weight:800;text-align:center;background:#fff1d6;border:3px solid var(--ink);border-radius:8px;animation:m-lost-and-found-fall 1.4s steps(7) both} .m-lost-and-found-found .m-lost-and-found-nc{background:#c4f1dd} .m-lost-and-found-nce{font-size:26px;line-height:1.1} .m-lost-and-found-cert{position:absolute;inset:0;z-index:30;display:grid;place-items:center;padding:12px;background:rgba(10,16,18,.55)} .m-lost-and-found-certc{max-width:420px;padding:18px 22px;text-align:center;background:#fff7e0;border:6px double #b8860b;box-shadow:6px 6px 0 var(--ink);font-family:Georgia,serif} .m-lost-and-found-certh{margin:0 0 8px;font-size:1.05rem;letter-spacing:.06em;color:#7a5a08} .m-lost-and-found-certp{margin:6px 0;font-size:.9rem} .m-lost-and-found-certs{margin:10px 0;font:italic 700 1.2rem 'Segoe Print','Bradley Hand',cursive} .m-lost-and-found-certb{background:#ffd166} .m-lost-and-found-pbf{position:absolute;inset:0;z-index:0;overflow:hidden;animation:m-lost-and-found-fadein 1.6s ease-out} .m-lost-and-found-pbshelf{position:absolute;left:3%;right:3%;top:5%;height:34%;border:8px solid var(--gold);background:repeating-linear-gradient(90deg,var(--lilac) 0 70px,#9b82da 70px 74px)} .m-lost-and-found-pbcounter{position:absolute;left:0;right:0;bottom:0;height:24%;background:var(--pine);border-top:16px solid var(--lip)} .m-lost-and-found-pbw{position:absolute;left:50%;bottom:20%;transform:translateX(-50%);font-size:170px;line-height:1} .m-lost-and-found-pbsign{position:absolute;left:50%;top:1%;transform:translateX(-50%);padding:4px 24px;font-weight:900;font-size:1.6rem;background:#f6e7c1;border:4px solid var(--ink)} .m-lost-and-found-stack .m-lost-and-found-fboard{grid-template-columns:repeat(2,1fr)} .m-lost-and-found-pbask{position:absolute;left:50%;bottom:3%;z-index:8;display:flex;flex-wrap:wrap;gap:8px;justify-content:center;transform:translateX(-50%)} @media (max-width:760px){.m-lost-and-found-fboard{grid-template-columns:repeat(2,1fr)}} @media (pointer:coarse){.m-lost-and-found-btn,.m-lost-and-found-chip,.m-lost-and-found-tchip,.m-lost-and-found-pk,.m-lost-and-found-sw{min-height:44px}}
@media (prefers-reduced-motion:reduce){.m-lost-and-found-room *{animation:none!important;transition:none!important}} .m-lost-and-found-rm *{animation:none!important;transition:none!important} @keyframes m-lost-and-found-reveal{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(0)}} @keyframes m-lost-and-found-flipc{from{transform:rotateX(90deg)}to{transform:none}} @keyframes m-lost-and-found-ring{0%{transform:rotate(0)}25%{transform:rotate(-18deg)}60%{transform:rotate(14deg)}100%{transform:rotate(0)}} @keyframes m-lost-and-found-pop{from{transform:scale(.7);opacity:0}to{transform:none;opacity:1}} @keyframes m-lost-and-found-zz{0%,100%{transform:translateY(0);opacity:.4}50%{transform:translateY(-8px);opacity:1}} @keyframes m-lost-and-found-sway{0%,100%{transform:rotate(-3deg)}50%{transform:rotate(3deg)}} @keyframes m-lost-and-found-blink{from{background:#ff4a4a}to{background:#7a2a2a}} @keyframes m-lost-and-found-dr0{0%,100%{transform:translate(0,0)}50%{transform:translate(18px,-14px)}} @keyframes m-lost-and-found-dr1{0%,100%{transform:translate(0,0)}50%{transform:translate(-22px,10px)}} @keyframes m-lost-and-found-shake{0%,100%{transform:translateX(0)}20%{transform:translateX(-5px) rotate(-1deg)}40%{transform:translateX(5px) rotate(1deg)}60%{transform:translateX(-4px)}80%{transform:translateX(4px)}} @keyframes m-lost-and-found-spin{from{transform:rotateY(0)}to{transform:rotateY(360deg)}} @keyframes m-lost-and-found-sag{0%,100%{transform:none}50%{transform:translateY(8px) rotate(-2deg)}} @keyframes m-lost-and-found-float{0%,100%{transform:none}50%{transform:translateY(-8px)}} @keyframes m-lost-and-found-pulse{0%,100%{transform:scale(1)}50%{transform:scale(1.045)}}
@keyframes m-lost-and-found-glint{0%{filter:brightness(1)}30%{filter:brightness(1.35) saturate(1.3)}100%{filter:brightness(1)}} @keyframes m-lost-and-found-rain{from{background-position:0 0}to{background-position:-8px 14px}} @keyframes m-lost-and-found-slam{from{transform:translate(-50%,-50%) rotate(-6deg) scale(1.9);opacity:0}to{transform:translate(-50%,-50%) rotate(-6deg) scale(1);opacity:1}} @keyframes m-lost-and-found-thunk{0%{transform:scaleY(1)}30%{transform:scaleY(2.2)}100%{transform:scaleY(1)}} @keyframes m-lost-and-found-fall{from{transform:translateY(-120px);opacity:0}to{transform:none;opacity:1}} @keyframes m-lost-and-found-fadein{from{opacity:0}to{opacity:1}} @keyframes m-lost-and-found-binb{0%{transform:translateY(0)}30%{transform:translateY(5px) scale(1.06)}100%{transform:none}} @keyframes m-lost-and-found-swallow{0%{transform:none;opacity:1}45%{transform:translateY(140px) scale(.2);opacity:0}70%{transform:translateY(140px) scale(.2);opacity:0}100%{transform:none;opacity:1}}
.m-lost-and-found-slot[aria-disabled="true"]{cursor:default} .m-lost-and-found-calm{min-height:0} .m-lost-and-found-calm .m-lost-and-found-slot:nth-child(n+6){display:none} .m-lost-and-found-narrow .m-lost-and-found-calm .m-lost-and-found-slot:nth-child(n+4){display:none} .m-lost-and-found-slot.m-lost-and-found-wig{animation:m-lost-and-found-wig .7s ease-in-out} .m-lost-and-found-slot.m-lost-and-found-poked{background:#4b655d;box-shadow:inset 0 0 0 2px var(--glow)}
.m-lost-and-found-vb,.m-lost-and-found-surr{touch-action:manipulation;-webkit-user-select:none;user-select:none;-webkit-touch-callout:none} .m-lost-and-found-frame.m-lost-and-found-dark{touch-action:none} .m-lost-and-found-narrow .m-lost-and-found-wend{width:110px} .m-lost-and-found-narrow .m-lost-and-found-cr{gap:6px;flex-wrap:wrap} .m-lost-and-found-narrow .m-lost-and-found-printer{width:56px} .m-lost-and-found-narrow .m-lost-and-found-cv{font-size:.95rem} .m-lost-and-found-narrow .m-lost-and-found-cap{margin-top:-4px}
.m-lost-and-found-queue{display:flex;align-items:flex-end;gap:4px;min-height:40px;padding:2px 8px;overflow:hidden;background:rgba(0,0,0,.18);border-radius:8px} .m-lost-and-found-qlab{flex:none;align-self:center;margin-right:4px;font-size:.7rem;font-weight:800;letter-spacing:.06em;color:var(--cream)} .m-lost-and-found-qm{flex:none;display:flex;flex-direction:column;align-items:center;font-size:21px;line-height:1.05} .m-lost-and-found-qm i{font-style:normal;font-size:11px} .m-lost-and-found-qm b{max-width:92px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;padding:0 4px;font:800 .62rem system-ui,sans-serif;color:var(--ink);background:var(--ticket);border:1px solid var(--ink);border-radius:3px} .m-lost-and-found-qm.m-lost-and-found-qin{animation:m-lost-and-found-pop .4s ease-out} .m-lost-and-found-look .m-lost-and-found-qe{display:inline-block;transform:scaleX(-1);animation:m-lost-and-found-hop .5s ease-out}
.m-lost-and-found-flags{position:absolute;inset:0;z-index:25;pointer-events:none} .m-lost-and-found-flag{position:absolute;padding:3px 9px;pointer-events:auto;cursor:pointer;transform:translate(-50%,-50%) rotate(var(--r,-9deg));font:900 .9rem system-ui,sans-serif;letter-spacing:.12em;color:var(--stamp);background:rgba(255,246,220,.9);border:4px double var(--stamp);animation:m-lost-and-found-fslam .35s ease-out both} .m-lost-and-found-reviewed{position:absolute;left:50%;top:38%;z-index:26;padding:6px 26px;pointer-events:none;transform:translate(-50%,-50%) rotate(-8deg);font:900 clamp(1.5rem,8vw,3.2rem) Georgia,serif;letter-spacing:.18em;color:var(--stamp);background:rgba(255,246,220,.3);border:8px double var(--stamp);animation:m-lost-and-found-fslam .45s ease-out both}
@keyframes m-lost-and-found-fslam{from{transform:translate(-50%,-50%) rotate(var(--r,-8deg)) scale(2.4);opacity:0}to{transform:translate(-50%,-50%) rotate(var(--r,-8deg)) scale(1);opacity:1}} @keyframes m-lost-and-found-wig{0%,100%{transform:none}20%{transform:rotate(-10deg)}40%{transform:rotate(9deg)}60%{transform:rotate(-6deg)}80%{transform:rotate(4deg)}} @keyframes m-lost-and-found-hop{0%{transform:scaleX(-1) translateY(0)}40%{transform:scaleX(-1) translateY(-7px)}100%{transform:scaleX(-1)}}
`, 'css-lost-and-found');

  P.registerModule({
    id: 'lost-and-found',
    title: 'Lost & Found (Mostly Lost)',
    tagline: 'Describe what you lost. We will give you it. It is a ticket.',
    icon: '🎫',
    category: 'department',
    unlockCost: 0,
    tags: ['drawing', 'tickets', 'keeping'],
    mount(root, api) {
      const el = api.el;
      const dv = (c, ...kids) => el('div', { class: k(c) }, ...kids);
      const sp = (c, ...kids) => el('span', { class: k(c) }, ...kids);
      const bt = (c, label, fn, extra) => el('button', Object.assign({ class: k('btn ' + c), type: 'button' }, fn ? { onclick: fn } : {}, extra || {}), label);
      const K_ = api.selftest ? 0.3 : 1, IDLE1 = 45000 * K_, IDLE2 = 90000 * K_, STILL = 7500 * K_;
      const D = (ms, st) => (api.selftest ? (st != null ? st : Math.max(60, ms * 0.05)) : ms);
      const PW = 280, PH = 200, AX = 140, AY = 232;
      const stat = (n, v) => api.stat.inc('lost-and-found.' + n, v == null ? 1 : v);
      const award = (n, why) => api.award(n, why);
      const rd = (f, d) => { try { return f(); } catch (_) { return d; } };

      /* ---------- the save ---------- */
      const V = (() => {
        let b; try { b = api.save.get('v', {}); } catch (_) { b = {}; } if (!b || typeof b !== 'object') b = {};
        const I = (x) => Math.max(0, Math.min(1e9, Math.floor(num(x))));
        const kept = (Array.isArray(b.kept) ? b.kept : []).slice(-60).filter((e) => e && typeof e === 'object').map((e) => {
          const o = { t: clean(e.t) || 'nothing', e: okEmoji(e.e), k: KEEP_KINDS.indexOf(e.k) >= 0 ? e.k : 'tk', n: I(e.n), d: Math.min(99999, I(e.d)), a: I(e.a) };
          const p = sanePoly(e.p); if (p) o.p = p; if (e.s) o.s = 1; return o;
        });
        const f = b.first && typeof b.first === 'object' ? { t: clean(b.first.t), p: sanePoly(b.first.p) } : null;
        return { sessions: I(b.sessions) + 1, loops: I(b.loops), total: I(b.total), kept, annex: I(b.annex), first: f && (f.t || f.p) ? f : null, smile: !!b.smile, lot0: !!b.lot0, ficus: I(b.ficus), clauses: Math.min(9, I(b.clauses)), no: Math.min(99999, I(b.no)) };
      })();
      const FAST = V.loops > 0 || V.total >= 20;
      const th = (n) => { let x = api.selftest ? Math.ceil(n / 3) : n; if (FAST) x = Math.ceil(x / 2); return Math.max(1, x); };

      /* ---------- session state ---------- */
      const S = {
        phase: 'counter', runId: 0, timers: [], wd: null, mode: 'report', reports: 0, tickets: 0, lost: 0, beat: {}, busy: false, epi: false,
        tray: [], sel: null, prev: [], flipped: false, ret: null, strokes: [], cur: null, pen: { x: 140, y: 100 }, smudged: false, smN: 0, padScale: 1, taut: false, twang: 0, twPh: 0, twAt: 0, twCap: 0, padDirty: true, penDirty: true,
        firstDoodle: null, kept: V.kept, annex: V.annex, keptTotal: 0, gone: {}, pSel: -1, youName: false, borrowed: false, clauseSeen: V.clauses, lights: 0, flips: 0, bellTimes: [], bellTotal: 0, reportTimes: [],
        t0: api.now(), lastInput: api.now(), anyIn: false, awake: false, napping: false, nightPaid: false, nightFlip: false, rel: null, relDown: 0, relUp: 0, search: null, lamp: null, searches: 0, cust: null,
        sandra: 0, paperBell: false, bellKept: false, hits: {}, locked: false, more: 0, dennis: 0, nothingN: 0, paradoxRun: 0, geraldDone: false, hobbsDone: false, noinput: false, misAt: api.now() + 25000,
        found: '0', narrow: false, wasNarrow: false, narLine: -1e9, mp: null, peekUntil: 0, peeks: 0, intick: false, gave: 0, pockN: 0, spamFee: false, lastCite: 0, lot0: false, lastThing: '', stage: 0, noIn12: false
      };
      Object.assign(S, { rareAt: api.now(), m3: 0, m10: 0, m5: 0, m5At: 0, m3At: 0, tk1: 0, q: [], qn: 0, youIn: false, pokes: 0, nudged: false, snoreAt: 0, paAt: api.now() + 35000 * K_, coatDone: false, stRows: STOOL });
      const R = {};

      /* ---------- small utilities ---------- */
      const later = (ms, fn) => api.setTimeout(() => { if (!api.destroyed) fn(); }, ms);
      const after = (ms, fn) => { const id = S.runId; const t = api.setTimeout(() => { if (id !== S.runId || api.destroyed) return; fn(); }, ms); S.timers.push(t); return t; };
      const bag = {}; const bagOf = (name, arr) => (bag[name] = bag[name] || Bag(api, arr));
      const RM = () => { try { if (root.closest && root.closest('.pm-reduce-motion')) return true; return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (_) { return false; } };
      const flash = (node, cls, ms) => { if (!node) return; const c = k(cls); node.classList.remove(c); void node.offsetWidth; node.classList.add(c); later(ms || 600, () => node.classList.remove(c)); };
      function tok(x) {
        const t = S.sel;
        return Object.assign({ THING: t ? t.thing : (S.lastThing || 'nothing'), N: t ? pad4(t.no) : pad4(V.no), SHELF: shelfNo(S.annex + S.kept.length + 1), MATCH: (t && t.match) || '', ITEM: t ? title(t) : '', TIME: '4:17 PM',
          NAME: S.youName ? 'You' : (clean(api.player && api.player.name) || 'Valued Employee'), A: 0, LABEL: '', COUNT: S.kept.length, DEPTH: t ? t.depth : 0 }, x || {});
      }
      function bubble(t) {
        if (!R.bubs) return; const b = dv('bub', t); R.bubs.appendChild(b);
        while (R.bubs.children.length > 2) R.bubs.removeChild(R.bubs.firstChild);
        later(4000, () => { if (b.parentNode) b.parentNode.removeChild(b); });
      }
      function say(text, who, mood, pri) {
        const t = fill(text, tok()); if (!t) return false; who = who || 'Management';
        if (who === 'Wendell' && t.length <= 110) { bubble(t); if (S.narrow && R.cap) R.cap.textContent = t; }
        return api.say(t, { who, mood: mood || 'neutral', priority: pri || 0 });
      }
      const L = (cat, x) => fill(api.line('m:lost-and-found:' + cat, x && x.count != null ? { count: x.count } : undefined), tok(x));
      const sayR = (cat, who, x, mood, pri) => say(L(cat, x), who, mood, pri);
      const cap = (t) => { R.cap.textContent = fill(t, tok()); };
      const TAG0 = 'The stock room is dark and asleep. Tap a shelf to see what it is keeping, or describe what you lost below.', TAG1 = 'Describe what you lost below. Type it, draw it, or tap a shelf. Nothing is also a thing.';
      const CAP0 = 'Window 7 1/2. Please wait. The clerk is resting his eyes. He will be with you shortly, in a sense.', CAP1 = 'Window 7 1/2. The clerk is awake. He would like it noted that he was only resting.';
      const sfx = (n) => api.sfx(n);

      /* ---------- DOM ---------- */
      R.sfront = sp('sface sfront', 'LOST & FOUND (MOSTLY LOST)');
      R.sback = sp('sface sback', 'LOST: YOUR PLACE IN LINE. FOUND: A DIFFERENT PLACE, SLIGHTLY BEHIND.');
      R.signin = dv('signin', R.sfront, R.sback);
      const cell = (key, lab, val) => { R['c_' + key] = sp('cv', val); return dv('cell', sp('ck', lab), R['c_' + key]); };
      R.board = el('div', { class: k('board'), title: 'FOUND TODAY 0: confirmed by Sandra. See Clause 9(a).' }, dv('chains', sp('chain'), sp('chain')),
        dv('sign', R.signin), dv('fboard', cell('lost', 'LOST TODAY', '0'), cell('found', 'FOUND TODAY', '0'), cell('kept', 'KEPT FOREVER', '41,206'), cell('ret', 'RETURNED TO OWNER:', '0 of 7 1/2')));
      R.slots = [];
      for (let i = 0; i < 15; i++) {
        R.slots.push(el('button', { class: k('slot'), type: 'button', 'aria-disabled': 'true', 'aria-label': 'Shelf space ' + (i + 1), onclick: () => examine(i), onfocus: () => focusSlot(i) }, sp('se', ''), sp('sn', String(i + 1))));
      }
      R.grid = dv('grid', ...R.slots);
      R.lampov = dv('lampov dim');
      R.motes = dv('motes', ...Array.from({ length: 10 }, (_, i) => el('i', { class: k('mote m' + (i % 2)), style: { left: (6 + i * 9.3) % 96 + '%', top: (12 + (i * 37) % 70) + '%', animationDelay: (-i * 0.9) + 's' } })));
      R.ladder = dv('ladder', sp('rail rl'), sp('rail rr'), ...Array.from({ length: 6 }, (_, i) => el('i', { class: k('rung'), style: { top: (10 + i * 15) + '%' } })));
      R.frame = dv('frame', R.grid, R.motes, R.ladder, R.lampov);
      R.tagtxt = sp('tagtxt', TAG0);
      R.ask = dv('ask'); R.ask.hidden = true;
      R.tagcard = dv('tagcard', R.tagtxt, R.ask);
      R.stock = dv('stock', R.frame, R.tagcard);

      R.bell = el('button', { class: k('bell'), type: 'button', 'aria-label': 'Ring the bell (B)', onclick: () => ring() }, '🔔');
      R.knock = el('button', { class: k('knock'), type: 'button', 'aria-label': 'Knock on the counter', hidden: true, onclick: () => knock() }, '✊');
      R.dennis = el('button', { class: k('dennis'), type: 'button', 'aria-label': 'Dennis (Plant)', onclick: () => dennis() }, sp('dleaf', '🌿'), dv('pot'));
      R.printer = dv('printer', sp('plamp'), dv('pslot'));
      R.wpocket = dv('wpocket'); R.wpocket.hidden = true;
      R.wend = dv('wend asleep', sp('whead', '🧓'), dv('cardi', sp('cbtn'), sp('cbtn')), dv('loupe'), dv('wchain'), dv('wgrin'), sp('zzz', 'z'), R.wpocket);
      R.bubs = dv('bubs');
      R.back7 = dv('back7', 'BACK IN 7 1/2 MINUTES'); R.back7.hidden = true;
      R.clerk = dv('clerk', dv('cl', R.bell, R.knock), dv('cc', R.wend, R.bubs, R.back7), dv('cr', R.dennis, R.printer));

      /* the form */
      R.inp = el('input', { class: k('inp'), type: 'text', maxlength: 40, placeholder: PLACEH[0], 'aria-label': 'What have you lost?', autocomplete: 'off', spellcheck: false });
      R.chips = Array.from({ length: 5 }, (_, i) => el('button', { class: k('chip'), type: 'button', onclick: act('chip', () => chipGo(i)) }, ''));
      R.chipRow = dv('chips', ...R.chips);
      R.pad = el('canvas', { class: k('pad'), width: PW, height: PH, tabindex: 0, role: 'application', 'aria-label': 'Drawing pad, arrow keys move the pencil, Space lowers it' });
      R.path = el('path', { d: 'M140 232 Q140 232 140 100', fill: 'none', stroke: '#2b2118', 'stroke-width': 2, 'stroke-linecap': 'round' });
      R.tip = el('circle', { cx: 140, cy: 100, r: 3.5, fill: '#2b2118' });
      R.svg = el('svg', { class: k('tether'), viewBox: '0 0 280 240', 'aria-hidden': 'true' }, R.path, el('circle', { cx: 140, cy: 232, r: 4, fill: '#d8a631', stroke: '#2b2118', 'stroke-width': 1.5 }), R.tip);
      R.retov = dv('retov'); R.retov.hidden = true;
      R.pnote = sp('pnote', 'Borrowed pencil (on loan, from itself)'); R.pnote.hidden = true;
      R.padw = dv('padw', R.pad, R.svg, R.retov, R.pnote);
      R.smudge = bt('smudge', 'SMUDGE', () => smudge());
      R.hint = sp('hint', 'Draw it here. The pencil is tied to the counter, so it will not go far.');
      R.rbtn = bt('rbtn', 'REPORT LOSS', act('report', () => submit()));
      R.zform = dv('zone zform', dv('clip', el('label', { class: k('lab'), htmlFor: 'lf-inp' }, 'What have you lost? (type it, or draw it, or both)'), R.inp, R.chipRow, R.padw, dv('prow', R.smudge, R.hint), R.rbtn));
      R.inp.id = 'lf-inp';
      /* the stool panel (replaces the form during the stool beat) */
      R.stCust = sp('stc', '🧑'); R.stText = el('p', { class: k('stt') }, ''); R.stRow = dv('strow');
      ['Georgia', 'monospace', 'cursive'].forEach((f, i) => R.stRow.appendChild(bt('stb', 'Ticket (' + f + ')', () => stoolPick(i), { style: { fontFamily: f === 'Georgia' ? 'Georgia, serif' : f === 'monospace' ? 'ui-monospace, Consolas, monospace' : '"Segoe Print","Bradley Hand",cursive' } })));
      R.stoolp = dv('zone stoolp', dv('stc2', R.stCust, R.stText), R.stRow, dv('wallclock', 'Wall clock: ', sp('clk', '4:17'), sp('clkn', ' (it has been 4:17 since the stool)')));
      R.stoolp.hidden = true;

      /* the ticket panel */
      R.tbox = dv('tbox');
      const verb = (cls, label, fn) => bt('vb ' + cls, label, fn);
      R.vUse = verb('v-use', 'USE (U)', act('use', () => use())); R.vLight = verb('v-light', 'HOLD UP TO THE LIGHT (H)', act('light', () => light())); R.vFlip = verb('v-flip', 'FLIP (F)', act('flip', () => flip()));
      R.vRedeem = verb('v-red', 'REDEEM (R)', act('redeem', () => redeem())); R.vLet = bt('vb v-let', 'LET GO (L)', null); R.vGive = verb('v-give', 'GIVE (G)', act('give', () => give()));
      R.verbs = dv('verbs', R.vUse, R.vLight, R.vFlip, R.vRedeem, R.vLet, R.vGive);
      R.slider = el('input', { class: k('slider'), type: 'range', min: 0, max: 23, value: 9, 'aria-label': 'When did you last have it? Hour of the day', onchange: () => commitSeen() });
      R.ls = dv('ls', sp('lsl', 'When did you last have it?'), R.slider);
      R.sws = dv('sws', ...SWATCH.map((s, i) => bt('sw', s, () => swatch(i))));
      R.tray = dv('tray');
      R.prevb = bt('prevb', 'Previous Losses (0)', () => { R.prevl.hidden = !R.prevl.hidden; renderPrev(); });
      R.prevl = el('ul', { class: k('prevl') }); R.prevl.hidden = true;
      R.tpanel = dv('tpanel', R.tbox, R.verbs, R.ls, R.sws, R.tray, R.prevb, R.prevl);
      R.pbar = dv('pbar'); R.pbar.hidden = true;
      R.audit = dv('auditp'); R.audit.hidden = true;
      R.reveal = dv('reveal'); R.reveal.hidden = true;
      R.ztick = dv('zone ztick', R.pbar, R.tpanel, R.audit, R.reveal);
      R.stampEl = dv('stampk'); R.stampEl.hidden = true;

      /* pockets, customers, letterbox */
      R.pk = POCK.map((p, i) => bt('pk', sp('pke', p.e), () => selPocket(i), { 'aria-label': p.label }));
      R.pockets = dv('pockets', ...R.pk);
      R.surr = bt('surr', 'SURRENDER (S)', null);
      R.flap = dv('flap'); R.letter = dv('letter', sp('lett', 'KEPT'), R.flap);
      R.cEmoji = sp('ce', '🧑'); R.cText = el('p', { class: k('ct') }, ''); R.cHand = bt('chand', 'Hand over my ticket', act('give', () => give())); R.cNo = bt('cno', 'Not today', () => notToday());
      R.cWait = sp('cwait', '👤 👤');
      R.custbox = dv('custbox', dv('chead', R.cEmoji, R.cWait), R.cText, dv('crow', R.cHand, R.cNo)); R.custbox.hidden = true;
      R.zright = dv('zone zright', R.custbox, R.pockets, R.surr, R.letter);
      R.counter = dv('counter', R.zform, R.stoolp, R.ztick, R.zright, R.stampEl);
      R.back15 = dv('back15', 'WINDOW 7 1/2 WILL BE BACK IN 15 MINUTES (15 SECONDS)'); R.back15.hidden = true;
      R.bin = dv('bin', sp('binl', 'MORE')); R.bin.hidden = true;

      /* the Permanent Shelf */
      R.scan = el('canvas', { class: k('scan'), width: 600, height: 64, 'aria-hidden': 'true' });
      R.shelfl = el('ul', { class: k('shelfl') });
      R.shelf = dv('shelf', dv('shelfh', sp('shelft', 'THE PERMANENT SHELF'), sp('shelfs', '(the museum of you)')), R.scan, R.shelfl);
      R.cap = el('p', { class: k('cap'), 'aria-live': 'polite' }, CAP0);
      R.foot = el('small', { class: k('foot') }, '');
      R.queue = el('div', { class: k('queue'), 'aria-hidden': 'true' }); R.queue.hidden = true; R.flags = dv('flags');
      R.scene = dv('scene', R.board, R.stock, R.clerk, R.counter, R.queue, R.back15, R.bin, R.shelf, R.cap, R.foot, R.flags);
      R.night = dv('night'); R.night.hidden = true;
      R.cert = dv('cert'); R.cert.hidden = true;
      root.classList.add(k('room'));
      root.appendChild(R.scene); root.appendChild(R.night); root.appendChild(R.cert);

      /* ---------- input, spam guards, phases ---------- */
      function act(key, fn) { return function (e) { if (S.locked) return; noteIn(); if (hit(key)) return; fn(e); }; }
      function hit(key) {
        const t = api.now(), a = (S.hits[key] || []).filter((x) => t - x < 3000); a.push(t); S.hits[key] = a;
        if (a.length === 9) sayR('spam.sigh', 'Wendell', null, 'disappointed');
        if (a.length >= 14) { lockout(); return true; } return false;
      }
      function lockout() {
        if (S.locked) return; S.locked = true; S.hits = {}; cancelRelease(); R.back15.hidden = false; refresh(); sayR('spam.back', 'Management', null, 'panic', 2);
        later(D(15000, 1000), () => { S.locked = false; R.back15.hidden = true; refresh(); sayR('spam.stamp', 'Wendell'); });
      }
      function noteIn() {
        const t = api.now(); S.lastInput = t; S.anyIn = true; S.nudged = false; if (S.wd) S.wd.last = t;
        if (S.napping) { S.napping = false; paintWendell(); }
        if (S.phase === 'night') endNight(true);
      }
      function paintWendell() {
        const ph = S.phase, c = R.wend.classList;
        const st = S.intick ? 'intick' : ph === 'rummage' ? 'away' : (ph === 'search' || ph === 'keeping') ? 'climb' : ph === 'stool' ? 'stool' : (!S.awake || ph === 'night' || S.napping) ? 'asleep' : 'awake';
        ['asleep', 'awake', 'away', 'climb', 'stool', 'intick'].forEach((n) => c.toggle(k(n), n === st));
        c.toggle(k('grin'), V.smile); c.toggle(k('lean'), !!S.narrow);
      }
      function wake() {
        if (S.awake) return; S.awake = true; paintWendell(); sfx('blip');
        if (R.tagtxt.textContent === TAG0) R.tagtxt.textContent = TAG1; if (R.cap.textContent === CAP0) R.cap.textContent = CAP1;
        if (V.lot0 && !S.lot0Said) { S.lot0Said = true; sayR('lot0.next', 'Wendell'); } else sayR(V.smile ? 'warm' : 'wake', 'Wendell');
      }
      const cellTxt = {};
      function setCell(key, text) { const n = R['c_' + key]; if (!n || cellTxt[key] === text) return; cellTxt[key] = text; n.textContent = text; if (!RM()) flash(n, 'flipc', 450); }
      function paintBoard() {
        setCell('lost', half(S.lost)); setCell('found', S.found); setCell('kept', api.fmt(41206 + S.kept.length + S.annex));
        const f = 'Kept Items: ' + S.kept.length + '. Nothing in the building has ever left it.'; if (R.foot.textContent !== f) R.foot.textContent = f;
      }
      const flipSign = (back) => R.signin.classList.toggle(k('flip'), !!back);
      const setFront = (t) => { R.sfront.textContent = t; };
      function armWd(fn) { const t = api.now(); S.wd = fn ? { fn, t0: t, last: t } : null; }
      function setPhase(name, onIdle) {
        S.runId++; S.timers.forEach((t) => api.clearTimeout(t)); S.timers = [];
        endStroke(); cancelRelease(); hidePbar(); S.phase = name; armWd(onIdle);
        if (name === 'counter' && S.mode === 'return' && !onIdle) armWd(retDefault);
        refresh();
      }
      function refresh() {
        const ph = S.phase, m = S.mode, ctr = ph === 'counter', g = (n) => S.reports >= th(n), has = !!S.sel, ok = ctr && !S.locked;
        root.dataset.phase = ph; paintWendell(); paintBoard();
        const canSub = (ctr || ph === 'blind' || (ph === 'final' && m === 'wendell')) && !S.locked;
        R.zform.hidden = ph === 'stool'; R.stoolp.hidden = ph !== 'stool';
        R.rbtn.disabled = !canSub; const rl = m === 'return' ? 'DESCRIBE IT AGAIN' : m === 'blind' ? 'DROP THE CLOTH' : m === 'wendell' ? 'HAND IT OVER' : 'REPORT LOSS'; if (R.rbtn.textContent !== rl) R.rbtn.textContent = rl;
        R.inp.hidden = m === 'blind' || m === 'wendell'; R.inp.disabled = !ok;
        R.chipRow.hidden = m !== 'report'; R.chips.forEach((c) => { c.disabled = !ok; });
        R.smudge.disabled = !canSub; R.smudge.hidden = m === 'blind'; R.hint.hidden = m === 'blind';
        R.padw.classList.toggle(k('blindm'), m === 'blind'); R.retov.hidden = m !== 'return'; R.pnote.hidden = !S.borrowed; padSize();
        [[R.vUse, has], [R.vLight, has], [R.vFlip, has && g(2)], [R.vRedeem, g(3)], [R.vLet, has && g(4)], [R.vGive, has && !!S.cust && !S.cust.auto]].forEach((a) => { a[0].hidden = !a[1]; a[0].disabled = !ok; });
        R.ls.hidden = !(has && g(3) && ctr); R.sws.hidden = !(has && g(3) && ctr);
        R.pockets.hidden = R.surr.hidden = !g(8);
        R.pk.forEach((b, i) => { const gone = !!S.gone[POCK[i].id]; b.hidden = i >= S.pockN; b.disabled = gone || !ok; b.classList.toggle(k('on'), i === S.pSel); b.classList.toggle(k('gone'), gone); b.setAttribute('aria-pressed', String(i === S.pSel)); });
        R.surr.disabled = !ok || !POCK.slice(0, S.pockN).some((p) => !S.gone[p.id]);
        R.custbox.hidden = !S.cust || ph === 'stool'; if (S.cust) R.cHand.hidden = !has || !!S.cust.auto;
        if (S.cust && has) R.cHand.textContent = 'Hand over my ' + S.sel.thing;
        R.cNo.hidden = !S.cust || !!S.cust.auto;
        R.slots.forEach((b) => { b.setAttribute('aria-disabled', String(!(ph === 'search' || ok))); });
        R.lampov.classList.toggle(k('dim'), ph !== 'search'); R.frame.classList.toggle(k('dark'), ph === 'search'); R.frame.classList.toggle(k('calm'), ph !== 'search');
        R.tray.classList.toggle(k('sag'), has && !!S.sel.heavy);
        R.bell.hidden = S.bellKept; R.knock.hidden = !S.bellKept; R.bell.classList.toggle(k('paper'), S.paperBell);
        R.back7.hidden = !S.intick;
        R.tpanel.hidden = ph === 'audit' || !!S.reveal; R.audit.hidden = ph !== 'audit'; R.reveal.hidden = !S.reveal;
        root.classList.toggle(k('dimmed'), ph === 'final' || ph === 'night');
      }
      let lastW = 0;
      function padSize() { const w = Math.round(PW * S.padScale); if (w !== lastW) { lastW = w; R.padw.style.width = w + 'px'; } }

      /* ---------- the pad (drawing, the tether) ---------- */
      const scl = () => { const r = R.pad.getBoundingClientRect(); return r.width > 20 ? r.width / PW : S.padScale; };
      const radius = () => 185 / Math.max(0.2, scl()) * (S.borrowed ? 0.8 : 1);
      function clampPt(x, y) {
        x = num(x); y = num(y); const dx = x - AX, dy = y - AY, d = Math.hypot(dx, dy), rr = radius(); let cl = false;
        if (d > rr) { x = AX + dx * rr / d; y = AY + dy * rr / d; cl = true; }
        return { x: Math.round(clamp(x, 0, PW)), y: Math.round(clamp(y, 0, PH)), cl };
      }
      const ptsCount = () => S.strokes.reduce((a, s) => a + s.length / 2, 0);
      function capStrokes() {
        while (S.strokes.length > 60) { const f = S.strokes.shift(); if (f === S.cur) S.cur = null; }
        let n = ptsCount(), g = 0;
        while (n > 4000 && g++ < 4000) { const s = S.strokes[0]; if (!s) break; if (s.length > 8 && s !== S.cur) S.strokes[0] = s.filter((_, i) => ((i >> 1) & 1) === 0); else { const f = S.strokes.shift(); if (f === S.cur) S.cur = null; } n = ptsCount(); }
        S.smN = Math.min(S.smN, S.strokes.length); S.padDirty = true;
      }
      function tautNote(cl) {
        if (cl && (!S.taut || api.now() - S.twAt > 250)) {
          S.twang = 6; S.twAt = api.now(); sfx('tick');
          if (api.now() - S.twCap > 6000) { S.twCap = api.now(); cap(L('pad.twang')); }
        }
        S.taut = cl;
      }
      function beginStroke(x, y, src) {
        endStroke(); const c = clampPt(x, y); S.cur = [c.x, c.y]; S.curSrc = src; S.strokes.push(S.cur); S.pen.x = c.x; S.pen.y = c.y; tautNote(c.cl); capStrokes(); S.penDirty = true;
      }
      function movePen(x, y, src) {
        const c = clampPt(x, y); S.pen.x = c.x; S.pen.y = c.y; tautNote(c.cl); S.penDirty = true;
        if (S.cur && S.curSrc === src) { const n = S.cur.length; if (!n || dist(S.cur[n - 2], S.cur[n - 1], c.x, c.y) >= 2) { S.cur.push(c.x, c.y); capStrokes(); } }
      }
      function endStroke() {
        const s = S.cur; if (!s) return; S.cur = null;
        let len = 0; for (let i = 2; i < s.length; i += 2) len += dist(s[i - 2], s[i - 1], s[i], s[i + 1]);
        if (len < 4) { const x = s[0], y = s[1]; s.length = 0; s.push(x, y, Math.min(PW, x + 1), y, x, Math.min(PH, y + 1)); }
        if (S.mode === 'blind') { S.peekUntil = api.now() + 300; S.peeks++; if (S.peeks === 2) sayR('blind.peek', 'Wendell'); }
        S.padDirty = true;
      }
      function padDraw() { try { drawDoodle(R.pad.getContext('2d'), S.strokes, PW, PH, { soft: S.smN }); } catch (_) {} S.padDirty = false; }
      const padOk = () => S.phase === 'counter' || S.phase === 'blind' || S.phase === 'final';
      function stampAt(i) {
        endStroke(); const flat = [];
        STAMPS[i].forEach((p) => flat.push(Math.round(clamp(S.pen.x + p[0] * 8, 0, PW)), Math.round(clamp(S.pen.y + p[1] * 8, 0, PH))));
        S.strokes.push(flat); capStrokes(); sfx('tick');
      }
      function smudge() {
        if (!padOk()) return; noteIn();
        if (!S.strokes.length) { cap('There is nothing to smudge. It is already as smudged as nothing gets.'); return; }
        S.strokes.forEach((s) => { for (let i = 0; i < s.length; i++) s[i] = Math.round(clamp(s[i] + (api.rand() * 6 - 3), 0, i % 2 ? PH : PW)); });
        S.smudged = true; S.smN = S.strokes.length; S.padDirty = true; sfx('pop');
        if (!S.smudgePaid) { S.smudgePaid = true; award(0.1, 'a smudge'); } stat('smudges'); sayR('smudge', 'Wendell');
      }
      const padPos = (e) => { const r = R.pad.getBoundingClientRect(); return r.width > 0 && r.height > 0 ? [(e.clientX - r.left) * (PW / r.width), (e.clientY - r.top) * (PH / r.height)] : [140, 100]; };
      function padKey(e) {
        const key = e.key, st = e.shiftKey ? 1 : 4; let used = true;
        if (e.ctrlKey || e.altKey || e.metaKey) return;
        if (key === 'ArrowLeft') movePen(S.pen.x - st, S.pen.y, 'key'); else if (key === 'ArrowRight') movePen(S.pen.x + st, S.pen.y, 'key');
        else if (key === 'ArrowUp') movePen(S.pen.x, S.pen.y - st, 'key'); else if (key === 'ArrowDown') movePen(S.pen.x, S.pen.y + st, 'key');
        else if (key === ' ') { if (!e.repeat && padOk()) { if (S.cur) endStroke(); else beginStroke(S.pen.x, S.pen.y, 'key'); } }
        else if (key === 'Enter') { if (!e.repeat) enterGo(); }
        else if (key === 'Backspace') { sfx('buzz'); sayR('pad.backspace', 'Wendell'); }
        else if (/^[1-6]$/.test(key)) { if (padOk()) stampAt(+key - 1); }
        else used = false;
        if (used) { e.preventDefault(); e.stopPropagation(); noteIn(); }
      }

      /* ---------- reports and tickets ---------- */
      const mkTicket = (o) => Object.assign({ no: 0, raw: '', p: null, depth: 0, time: '', clauseText: '', heavy: false, colour: '', match: null, kind: 'generic', thing: 'nothing', item: 'ONE (1) NOTHING' }, o);
      function rotateChips() {
        const nA = Math.min(5, 1 + Math.floor(S.reports / 3)), pick = [], cB = bagOf('cc', CHIPS.slice(0, 10)), aB = bagOf('ca', CHIPS.slice(10)); let g = 0;
        while (pick.length < 5 && g++ < 60) { const t = pick.length < 5 - nA ? cB.next() : aB.next(); if (t && pick.indexOf(t) < 0) pick.push(t); }
        R.chips.forEach((c, i) => { c.textContent = pick[i] || 'keys'; });
      }
      function chipGo(i) { if (S.phase !== 'counter' || S.mode !== 'report') return; R.inp.value = R.chips[i].textContent; submit(true); }
      function buildTicket(raw, chip) {
        const st = S.strokes.filter((s) => s.length >= 4), has = st.length > 0, low = raw.toLowerCase(), bucket = has ? classify(st) : 'nothing';
        const match = has ? bagOf('m' + bucket, MB[bucket]).next() : null;
        const t = mkTicket({ raw, p: toPoly(st), match, smud: S.smudged, face: bucket === 'face' });
        if (low === 'i do not know') Object.assign(t, { item: 'THE THING YOU WERE ABOUT TO SAY', thing: 'thing you were about to say', kind: 'generic' });
        else if (raw) { t.kind = kindOf(low); t.item = itemOf(raw, t.kind); t.thing = thingOf(raw); }
        else if (has) { t.kind = 'generic'; t.item = upper(match); t.thing = match.toLowerCase().replace(/^(?:a|an|the|one \(1\))\s+/, ''); }
        else { t.kind = 'nothing'; t.thing = 'nothing'; }
        if (t.kind === 'nothing' && !has) { t.heavy = true; t.item = 'ONE (1) NOTHING (PRISTINE)'; }
        if (t.kind === 'nothing' && !has && ++S.nothingN === 3) { t.b2 = true; t.item = 'ONE (1) NOTHING (BOTH SIDES)'; }
        if (t.kind === 'ticket') { t.paradox = true; t.depth = (S.sel ? S.sel.depth : 0) + 1; }
        if (t.face) { t.nopush = true; t.thing = 'face, lost in 1998'; }
        return t;
      }
      function coatSecret() {
        if (S.coatDone) { sayR('coat.again', 'Wendell'); return; }
        S.coatDone = true; sfx('sad'); sayR('coat.1', 'Wendell', null, 'confused', 1); later(3600, () => sayR('coat.2', 'Wendell', null, 'neutral', 1)); later(7200, () => sayR('coat.3', 'Wendell', null, 'neutral', 1));
        later(11000, () => { sayR('coat.4', 'Management', null, 'neutral', 1); award(5, 'a coat'); api.flag.set('lost-and-found.coat', true); api.achieve('lost-and-found.coat'); api.confetti(); sfx('tada'); });
      }
      function specials(low, tk) {
        if (/\bfound\b/.test(low)) { sayR('word.found', 'Wendell'); setFront('LOST & LOST'); S.found = '-'; paintBoard(); later(30000, () => { setFront('LOST & FOUND (MOSTLY LOST)'); S.found = '0'; paintBoard(); }); }
        else if (/\bwendell\b|\bthe clerk\b/.test(low)) { S.intick = true; sayR('word.wendell', 'Wendell'); refresh(); later(D(7500, 1000), () => { S.intick = false; refresh(); sayR('word.wendellBack', 'Wendell'); }); }
        else if (/\beverything\b/.test(low)) { flash(R.stock, 'swallow', 2000); sayR('word.everything', 'Wendell'); later(2000, () => sayR('word.refill', 'Wendell')); }
        else if (/\bcoat\b|cloakroom|1974/.test(low)) coatSecret();
        else if (/\btoast\b|\bbread\b/.test(low) && rd(() => api.stat.get('toaster-debate.entered') > 0, false)) sayR('word.toast', 'Wendell', null, 'proud');
        else if (tk && tk.kind === 'sock' && rd(() => !!api.flag.get('sockSeen') || api.stat.get('sock-matcher.entered') > 0, false)) sayR('word.sock', 'Wendell');
      }
      function enterGo() { if (S.locked) return; noteIn(); if (!hit('report')) submit(); }
      function submit(chip) {
        if (S.locked) return; const ph = S.phase;
        if (ph === 'blind') return blindDrop();
        if (ph === 'final') return finalHand();
        if (ph !== 'counter') return;
        wake(); if (S.mode === 'return') return retSubmit();
        const raw = clean(R.inp.value), low = raw.toLowerCase(), now = api.now();
        S.reportTimes = S.reportTimes.filter((x) => now - x < 10000); S.reportTimes.push(now);
        if (S.more > 0) return moreBin();
        S.reports++; V.total++; stat('reports'); S.lost++; award(chip ? 0.3 : 0.5, 'a report');
        const t = buildTicket(raw, chip); S.lastThing = t.thing;
        if (S.prophecy) { const hitP = low === S.prophecy.toLowerCase(); S.prophecy = ''; if (hitP) later(1500, () => sayR('audit.smug', 'Wendell', null, 'smug')); }
        if (!S.firstDoodle && t.p) S.firstDoodle = t.p.map((p) => p.slice());
        if (!V.first) V.first = { t: clean(raw || t.match || 'nothing'), p: t.p ? sanePoly(t.p) : null };
        if (V.total === 100) { sayR('hundred', 'Management', null, 'proud', 1); award(7.5, 'the 100th report'); t.rev = true; }
        if (S.reportTimes.length >= 8 && !S.moreDone) { S.moreDone = true; S.more = 3; R.bin.hidden = false; award(-0.5, 'a rapid report fee'); sayR('spam.fee', 'Management', null, 'disappointed', 2); sayR('spam.more', 'Wendell', null, null, 1); }
        R.inp.value = ''; S.strokes = []; S.cur = null; S.smudged = false; S.smN = 0; S.smudgePaid = false; S.padDirty = true; S.penDirty = true; rotateChips();
        sayR(t.heavy ? 'report.empty' : 'report', 'Wendell'); specials(low, t);
        if (t.paradox) { S.paradoxRun++; sayR('paradox.1', 'Wendell'); if (S.paradoxRun === 3) later(1400, () => sayR('paradox.3', 'Wendell')); award(1, 'a ticket held while reported'); api.achieve('lost-and-found.paradox'); } else S.paradoxRun = 0;
        if (t.b2) later(1200, () => sayR('word.nothing3', 'Wendell'));
        if (S.reports === 1) rummage(t); else if (S.reports === 3 || S.reports === 5) { sayR('search.skip', 'Wendell'); rummage(t); } else startSearch(t);
      }
      function moreBin() {
        S.more--; R.inp.value = ''; S.strokes = []; S.cur = null; S.padDirty = true; sfx('pop'); flash(R.bin, 'binb', 500);
        if (S.more <= 0) { cap('Received: MORE (3). Not itemized. Kept.'); later(2500, () => { R.bin.hidden = true; }); }
      }
      function rummage(t, then) {
        const go = then || print; setPhase('rummage', () => go(t));
        bubble('Wendell is ' + L('rummage') + '.'); [0, 400, 800, 1200, 1600].forEach((d, i) => after(D(d, d / 10), () => sfx(['blip', 'bloop', 'pop'][i % 3])));
        after(D(api.randInt(1500, 2500), 150), () => go(t));
      }
      function pushTray(t) {
        S.tray.unshift(t);
        while (S.tray.length > 6) { const o = S.tray.pop(); S.prev.unshift('LF-' + pad4(o.no) + ' ' + title(o)); }
        if (S.prev.length > 20) S.prev.length = 20;
      }
      /* the Line behind you: one more customer per ticket, and by the end the last one in it is you */
      function renderQueue() {
        const q = S.q.slice(-8), nm = clean(api.player && api.player.name) || 'Valued Employee'; R.queue.textContent = ''; R.queue.hidden = !S.qn;
        if (!S.qn) return; R.queue.appendChild(sp('qlab', 'THE LINE (' + S.qn + ')'));
        q.forEach((m) => R.queue.appendChild(el('span', { class: k('qm' + (m.fresh ? ' qin' : '')), title: 'Holding: ' + m.th }, sp('qe', m.e), el('i', {}, m.it)))); S.q.forEach((m) => { m.fresh = false; });
        if (S.youIn) R.queue.appendChild(el('span', { class: k('qm'), title: nm + ', holding a ticket' }, sp('qe', '🙂'), el('b', {}, 'LOST: ' + (clean(V.first && V.first.t) || 'nothing').slice(0, 16))));
      }
      function queueAdd(t) {
        if (t.nopush || t.system || !R.queue) return;
        S.qn++; S.q.push({ e: bagOf('qe', QE).next(), it: (KINDS[t.kind] || KINDS.generic).e, th: clean(t.thing) || 'nothing', fresh: true }); if (S.q.length > 8) S.q.shift();
        if (!S.youIn && S.reports >= th(12)) { S.youIn = true; later(2600, () => sayR('queue.you', 'Management', { LABEL: clean(V.first && V.first.t) || 'nothing' }, 'smug', 1)); }
        else if (S.qn === 4) later(1800, () => sayR('queue.4', 'Management')); else if (S.qn === 8) later(1800, () => sayR('queue.8', 'Management'));
        renderQueue();
      }
      function ensureClause(t) {
        if (t.clauseText) return; const n = S.clauseSeen;
        if (n < 9) { t.clauseText = CLAUSES[n]; S.clauseSeen = n + 1; } else t.clauseText = bagOf('extras', EXTRAS).next();
      }
      function print(t, o) {
        o = o || {}; setPhase('counter');
        if (!t.no) t.no = V.no = Math.min(99999, V.no + 1);
        t.depth = Math.min(99999, Math.max(0, Math.floor(num(t.depth))));
        if (o.replace) { const i = S.tray.indexOf(o.replace); if (i >= 0) S.tray[i] = t; else pushTray(t); } else if (!t.nopush) pushTray(t);
        if (!t.nopush) { S.sel = t; S.flipped = !!t.rev; if (t.rev) ensureClause(t); }
        S.tickets++; stat('tickets'); sfx('whoosh'); later(260, () => sfx('stamp')); flash(R.printer, 'blink', 900);
        if (!t.foot && !t.nopush && !t.system && S.tickets >= 5) t.foot = bagOf('foot', FOOT).next();
        queueAdd(t);
        if (S.reports >= th(3) && !t.time && !t.nopush && !t.system) setTime(t);
        renderTray(); renderTicket(true); refresh();
        cap('Ticket LF-' + pad4(t.no) + '. Item: ' + title(t) + '.');
        if (S.tickets === 1) {
          sfx('fanfare'); api.confetti(undefined, undefined, 14); award(0.5, 'a first ticket'); sayR('ticket.first', 'Management', null, 'proud', 1); api.achieve('lost-and-found.first');
        }
        if (!o.quiet) sayR(S.tickets >= 6 && S.tickets <= 10 ? 'ticket.late' : 'ticket', 'Wendell');
        if (S.tickets % 4 === 0) sayR('ticket.mgmt', 'Management');
        if (api.stat.get('lost-and-found.tickets') >= 10) api.achieve('lost-and-found.thing');
        if (t.face) faceSecret(t);
        if (t.depth >= 3) api.achieve('lost-and-found.nested');
        if (S.reports === th(3) && !S.askedSeen) { S.askedSeen = true; sayR('lastseen.ask', 'Wendell'); }
        persist(); updatePockets(); afterTicket(); if (!o.quiet || !t.system) rareEvent();
        after(2000, maybeBeat);
      }
      function faceSecret(t) {
        sayR('smile.face', 'Wendell', null, 'proud', 1); V.smile = true; api.flag.set('lost-and-found.smile', true); award(5, 'a face'); api.achieve('lost-and-found.smile'); api.confetti(); sfx('tada');
        S.pocketTicket = t; R.wpocket.hidden = false; R.wpocket.textContent = ''; if (t.p) R.wpocket.appendChild(thumb(t.p)); else R.wpocket.textContent = '🙂'; refresh();
      }

      /* ---------- rendering the ticket and tray ---------- */
      const ficusTxt = () => (V.ficus < 5 ? 'the third ficus' : V.ficus < 10 ? 'the fifth ficus (of three)' : 'the ficus that is also lost');
      function thumb(p) {
        const c = el('canvas', { class: k('thumb'), width: 64, height: 46, 'aria-hidden': 'true' });
        try { drawDoodle(c.getContext('2d'), p, 64, 46, { fit: true, box: 100 }); } catch (_) { /* no canvas */ }
        return c;
      }
      function renderTicket(printing) {
        const t = S.sel; R.tbox.textContent = ''; S.tkEl = null;
        if (!t) { R.tbox.appendChild(dv('tempty', 'No ticket at the moment. The counter is open. Please describe what you have lost.')); return; }
        const kd = KINDS[t.kind] || KINDS.generic;
        const th_ = t.p ? thumb(t.p) : sp('tem', t.paradox ? sp('rg1', sp('rg2', '🎫')) : kd.e);
        const front = dv('tfront', dv('thead', 'CLAIM TICKET No. ' + pad4(t.no)),
          dv('tmain', th_, dv('tinfo', dv('tl', sp('tk2', 'ITEM: '), sp('titem', title(t))),
            t.match ? el('p', { class: k('tnote') }, 'Wendell has written in the margin: reads as ' + (t.smud ? 'Smudged, and Therefore ' : '') + t.match + '.') : null,
            dv('tl', 'CONDITION: lost (excellent)'), dv('tl', 'LAST SEEN: ' + (t.time ? 'Tuesday, ' + t.time + ', near ' + ficusTxt() : 'not stated')), t.colour ? dv('tl', 'COLOUR: ' + t.colour) : null)),
          dv('tfoot', t.foot || FOOT0));
        const back = dv('tback', dv('thead', 'FINE PRINT'), t.b2 ? null : el('p', { class: k('tclause') }, t.clauseText || '...'));
        const tk = el('div', { class: k('tk tint-' + kd.tint + ' l' + Math.min(3, t.depth) + (S.flipped ? ' rev' : '') + (t.heavy ? ' heavy' : '') + (printing ? ' printing' : '')), tabindex: 0, role: 'button', 'aria-label': 'Claim ticket ' + pad4(t.no) + ', ' + clean(t.thing) + '. Enter or Space flips it.',
          onclick: () => { if (S.reports >= th(2) && S.phase === 'counter') flip(); }, onkeydown: (e) => { if ((e.key === 'Enter' || e.key === ' ') && S.reports >= th(2) && S.phase === 'counter') { e.preventDefault(); e.stopPropagation(); flip(); } } },
          dv('holo'), front, back, dv('stub', 'LF-' + pad4(t.no)), t.paradox ? dv('stub stub2', 'LF-' + pad4(t.no)) : null, sp('wm', kd.e), dv('rain'), t.claimed ? sp('claimed', 'CLAIMED') : null);
        S.tkEl = tk; R.tbox.appendChild(tk);
      }
      function renderTray() {
        const ae = document.activeElement, fi = ae && R.tray.contains(ae) ? Array.prototype.indexOf.call(R.tray.children, ae) : -1;
        R.tray.textContent = '';
        S.tray.forEach((t) => R.tray.appendChild(el('button', { class: k('tchip' + (t === S.sel ? ' on' : '')), type: 'button', 'aria-pressed': t === S.sel, onclick: () => selectTicket(t) },
          sp('tce', (KINDS[t.kind] || KINDS.generic).e), sp('tcl', (t.chipLabel || title(t)).slice(0, 28)))));
        if (fi >= 0 && R.tray.children[fi]) R.tray.children[fi].focus();
        R.prevb.textContent = 'Previous Losses (' + S.prev.length + ')'; R.prevb.hidden = !S.prev.length;
        if (!S.prev.length) R.prevl.hidden = true; else if (!R.prevl.hidden) renderPrev();
      }
      function renderPrev() { R.prevl.textContent = ''; S.prev.slice(0, 20).forEach((s) => R.prevl.appendChild(el('li', { text: s }))); }
      function selectTicket(t) {
        if (S.phase !== 'counter' || S.tray.indexOf(t) < 0) return; cancelRelease(); S.sel = t; S.flipped = false; renderTray(); renderTicket(); refresh(); sfx('tick'); cap('Ticket LF-' + pad4(t.no) + ' selected. Item: ' + title(t) + '.');
      }

      /* ---------- ticket verbs ---------- */
      function anim(name, ms) { const n = S.tkEl; if (!n) return; const c = k('an-' + name); n.classList.remove(c); void n.offsetWidth; n.classList.add(c); later(ms || 1200, () => n.classList.remove(c)); }
      function use() {
        const t = S.sel; if (!t || S.phase !== 'counter') return; const kd = KINDS[t.kind] || KINDS.generic; anim(kd.anim, 1200);
        if (t.kind === 'keys') { sfx('tick'); later(120, () => sfx('tick')); later(240, () => sfx('tick')); } else sfx(USE_SFX[t.kind] || 'blip');
        const ul = USE[t.kind] || USE.generic, line = fill(bagOf('use' + t.kind, ul).next(), tok()); cap(line); say(line, 'Wendell'); award(0.1, 'using a ticket'); stat('uses');
      }
      function light() {
        const t = S.sel; if (!t || S.phase !== 'counter') return; S.lights++; stat('lights'); anim('lit', 2000); sfx('pop'); award(0.1, 'holding it to the light');
        if (S.lights === 3) { [0, 450, 900].forEach((d) => later(d, () => sfx('bell'))); anim('mine', 2000); sayR('light.mine', 'Wendell'); } else { const l = L('light'); cap(l); say(l, 'Wendell'); }
      }
      function flip() {
        const t = S.sel; if (!t || S.phase !== 'counter') return; S.flipped = !S.flipped; if (S.flipped) ensureClause(t);
        sfx('tick'); renderTicket(); S.flips++; stat('flips'); award(0.05, 'the fine print');
        if (S.flipped) cap(t.b2 ? 'The back of the ticket is blank. So is the front, in spirit.' : 'Fine print: ' + t.clauseText);
        if (S.flips % 3 === 0) sayR('clause.cite', 'Management');
      }
      function redeem() {
        if (S.phase !== 'counter' || S.mode !== 'report' || S.reports < th(3)) return; const t = S.sel;
        if (!t) { sayR('redeem.none', 'Wendell'); rummage(mkTicket({ item: 'THE INTENTION TO REDEEM', thing: 'intention to redeem', system: false }), (n) => print(n)); return; }
        stat('redeemed'); award(0.2, 'a redemption');
        const n = Object.assign({}, t, { no: 0, depth: Math.min(99999, t.depth + 1), claimed: true, clauseText: '', rev: false, chipLabel: '', p: t.p, time: t.time });
        sayR('redeem', 'Wendell'); api.stat.max('lost-and-found.depthmax', n.depth);
        rummage(n, (x) => print(x, { replace: t, quiet: true }));
      }
      function setTime(t) {
        if (t.time) return ''; t.time = '4:17 PM'; stat('fourseventeen'); V.ficus++;
        if (api.stat.get('lost-and-found.fourseventeen') === 1) sayR('lastseen.first', 'Management');
        const f = V.ficus, key = { 5: 'ficus5', 10: 'ficus10', 15: 'ficus15', 20: 'ficus20', 30: 'ficus30' }[f] || '';
        if (key) sayR(key, 'Wendell'); if (api.stat.get('lost-and-found.fourseventeen') >= 10) api.achieve('lost-and-found.ficus'); return key;
      }
      function commitSeen() {
        const t = S.sel; if (!t || t.slid || S.phase !== 'counter') return; noteIn(); t.slid = true; const key = setTime(t); award(0.2, 'a last seen'); sfx('stamp');
        if (!key) sayR('lastseen', 'Wendell'); renderTicket(); cap('Last seen: Tuesday, 4:17 PM, near ' + ficusTxt() + '.');
      }
      function swatch(i) {
        const t = S.sel; if (!t || S.phase !== 'counter') return; const first = !t.colour; t.colour = SWATCH[i]; renderTicket(); sfx('pop'); say(SWL[i], 'Wendell'); if (first) award(0.1, 'a colour');
      }

      /* ---------- the lamp search ---------- */
      const labelOf = (e) => { const p = POCK.filter((x) => x.id === e.k)[0]; return p ? p.kept : e.k === 'bell' ? 'the bell' : e.k === 'lot' ? 'Lot 7 1/2' : e.k === 'you' ? 'Lot 0' : e.t; };
      function setSlots(items) { items.forEach((it, i) => { const b = R.slots[i]; if (!b) return; b.firstChild.textContent = it.e; b.classList.toggle(k('mine'), it.kind === 'mine'); }); S.layout = items; }
      function measure() {
        const fr = R.frame.getBoundingClientRect(); S.fw = fr.width || 600; S.fh = fr.height || 200;
        const cols = S.narrow ? 3 : 5, rows = Math.ceil(15 / cols);
        S.cells = R.slots.map((b, i) => { const r = b.getBoundingClientRect(); return r.width ? { x: r.left - fr.left + r.width / 2, y: r.top - fr.top + r.height / 2 } : { x: ((i % cols) + 0.5) / cols * S.fw, y: (Math.floor(i / cols) + 0.5) / rows * S.fh }; });
      }
      function pickItems() {
        const out = [], used = {}, add = (it) => { if (it && !used[it.t] && out.length < 14) { used[it.t] = 1; out.push(it); } };
        if (S.reports >= th(6) && S.kept.length) {
          const pool = api.shuffle(S.kept), n = Math.min(pool.length, api.chance(0.5) ? 2 : 1);
          for (let i = 0; i < n; i++) add({ e: pool[i].e, t: 'Handed in by you, last Thursday, 4:17 PM, near the third ficus. Described as: ' + labelOf(pool[i]) + '.', kind: 'mine', entry: pool[i] });
        }
        if (!S.coinDone && (S.searches === 8 || api.chance(1 / 77))) add({ e: '🟡', t: 'One (1) Meh, found. On the floor. Technically nobody\'s.', kind: 'coin' });
        if (V.sessions > 1 && V.first && api.chance(1 / 12)) add({ e: '🎫', t: 'Someone else\'s: ' + (V.first.t || 'nothing') + '. Handed in a long time ago. Not yours. Almost certainly yours.', kind: 'first' });
        const home = rd(() => !!api.flag.get('sock-matcher.home'), false);
        const on = { sock: rd(() => !!api.flag.get('sockSeen') || home || api.stat.get('sock-matcher.entered') > 0, false), toast: rd(() => api.stat.get('toaster-debate.entered') > 0, false),
          sandwich: rd(() => api.stat.get('complaints-dept.entered') > 0, false), rock: rd(() => !!api.flag.get('complaints-dept.rockMet'), false) };
        XMOD.forEach((x) => { if (on[x.id]) add({ e: x.e, t: (x.id === 'sock' && home) ? x.th : x.t, kind: 'x', yes: x.yes, sad: x.id === 'toast' }); });
        const sb = bagOf('sc', SCEN); let g = 0; while (out.length < 14 && g++ < 200) add(sb.next());
        out.push(GHOST); return api.shuffle(out);
      }
      function startSearch(t) {
        S.searches++; setPhase('search', () => endSearch(t, true));
        const items = pickItems(); S.search = { t, items, ex: {}, paid: 0, ask: -1, near: -2, cap: 0 };
        setSlots(items); measure(); S.lamp = { x: S.fw / 2, y: S.fh / 2, tx: S.fw / 2, ty: S.fh / 2, px: -99, py: -99 }; S.cellIdx = 7;
        R.ask.hidden = true; R.tagtxt.textContent = 'The room has gone dark. Move the lamp. Click a thing to ask whether it is yours. Arrow keys and Enter work too. Y or N answers.';
        sayR('search.start', 'Management', null, 'neutral', 1); after(2500, () => sayR('search.hold', 'Wendell'));
        after(D(6000, 1500), () => endSearch(t, false)); showPbar([['I trust the process', () => endSearch(t, true)]]);
      }
      function focusSlot(i) { if (S.phase === 'search' && S.lamp && S.cells && S.cells[i]) { S.lamp.tx = S.cells[i].x; S.lamp.ty = S.cells[i].y; S.cellIdx = i; } }
      function peek(i) {
        const it = S.layout && S.layout[i], b = R.slots[i]; if (!it || !b || S.locked || S.phase !== 'counter') return; noteIn(); if (hit('slot')) return;
        R.tagtxt.textContent = it.t; cap(it.t); sfx('blip'); stat('pokes'); S.pokes++; if (S.pokes <= 3) award(0.1, 'poking the shelf');
        if (it.kind === 'ghost') { flash(b, 'wig', 700); return; }
        flash(b, 'poked', 700); sayR(it.e === '📅' ? 'slot.tue' : 'slot.idle', 'Wendell', null, 'neutral');
      }
      function examine(i) {
        if (S.phase === 'counter') { peek(i); return; }
        const s = S.search; if (S.phase !== 'search' || !s || !s.items[i]) return; noteIn(); s.ask = i; focusSlot(i);
        const lit = R.slots[i].classList.contains(k('lit')); R.tagtxt.textContent = lit ? s.items[i].t : 'It is dark. This is part of the search.';
        R.ask.textContent = ''; R.ask.appendChild(sp('askq', 'Is this yours?')); R.ask.appendChild(bt('askb', 'Yes, that is mine', () => answer(true))); R.ask.appendChild(bt('askb', 'No (that is also mine)', () => answer(false)));
        R.ask.hidden = false; sfx('blip');
        try { const a = document.activeElement; if (!a || a.tagName === 'BODY' || R.slots.indexOf(a) >= 0) R.ask.querySelector('button').focus(); } catch (_) { /* no focus */ }
      }
      function answer(yes) {
        const s = S.search; if (S.phase !== 'search' || !s || s.ask < 0) return; const i = s.ask, it = s.items[i]; s.ask = -1; R.ask.hidden = true; noteIn();
        if (!s.ex[i]) { s.ex[i] = 1; stat('examined'); if (s.paid < 3) { s.paid++; award(0.2, 'a look'); } }
        if (it.kind === 'mine') {
          if (yes) { startReturn(it.entry); after(1500, () => endSearch(s.t, false)); } else { it.entry.a = Math.min(99999, it.entry.a + 1); persist(); stampKept('KEPT FOREVER (CARRIED OVER)'); sayR('return.no', 'Wendell'); }
        } else if (it.kind === 'first') {
          if (yes) { sayR('firstthing', 'Wendell'); startReturn({ t: V.first.t || 'nothing', e: '🎫', k: 'tk', n: 0, d: 0, a: 0, p: V.first.p || null }); after(1500, () => endSearch(s.t, false)); } else sayR('no', 'Wendell');
        } else if (it.kind === 'coin') coinFound();
        else if (it.kind === 'x') { if (it.sad) sfx('sad'); say(it.yes, 'Wendell'); }
        else sayR(yes ? 'yes' : 'no', 'Wendell');
      }
      function coinFound() {
        S.coinDone = true; S.found = '1'; paintBoard(); award(1, 'a coin'); sfx('ding'); sayR('coin.found', 'Management');
        later(1500, () => { award(-1, 'a handling fee'); sayR('coin.fee', 'Wendell'); S.found = '0'; paintBoard(); later(1500, () => sayR('coin.recount', 'Management')); });
      }
      function endSearch(t, trust) {
        const s = S.search; if (S.phase !== 'search' || !s) return; const any = Object.keys(s.ex).length > 0;
        S.search = null; S.lamp = null; R.ask.hidden = true; R.slots.forEach((b) => b.classList.remove(k('lit'))); R.tagtxt.textContent = 'The lamp has been put away. It is a very good lamp.';
        setPhase('rummage', () => print(t));
        if (trust) sayR('search.trust', 'Wendell'); else if (!any) sayR('search.none', 'Wendell');
        after(D(700, 120), () => { sayR('search.back', 'Wendell'); print(t); });
      }
      function searchKey(e) {
        const key = e.key; if (!S.search) return false; const cols = S.narrow ? 3 : 5; let i = S.cellIdx == null ? 7 : S.cellIdx;
        if (key === 'ArrowLeft') i--; else if (key === 'ArrowRight') i++; else if (key === 'ArrowUp') i -= cols; else if (key === 'ArrowDown') i += cols; else if (key === 'Home') i = 0; else if (key === 'End') i = 14;
        else if (key === 'Enter') { if (e.target && e.target.tagName === 'BUTTON') return false; examine(S.cellIdx == null ? 7 : S.cellIdx); e.preventDefault(); return true; }
        else return false;
        i = Math.round(clamp(i, 0, 14)); S.cellIdx = i; focusSlot(i); e.preventDefault(); return true;
      }
      function tickLamp(dt) {
        const l = S.lamp; if (S.phase !== 'search' || !l || !S.search) return;
        const f = RM() ? 1 : 1 - Math.exp(-14 * dt); l.x += (l.tx - l.x) * f; l.y += (l.ty - l.y) * f;
        if (Math.abs(l.x - l.px) < 0.4 && Math.abs(l.y - l.py) < 0.4) return; l.px = l.x; l.py = l.y;
        R.lampov.style.setProperty('--lx', l.x.toFixed(1) + 'px'); R.lampov.style.setProperty('--ly', l.y.toFixed(1) + 'px'); R.ladder.style.setProperty('--lax', (l.x - S.fw / 2).toFixed(1) + 'px');
        let best = -1, bd = 1e9;
        S.cells.forEach((c, i) => { const d = Math.hypot(c.x - l.x, c.y - l.y), lit = d < 90; R.slots[i].classList.toggle(k('lit'), lit); if (lit && d < bd) { bd = d; best = i; } });
        const s = S.search;
        if (best !== s.near) {
          s.near = best;
          if (s.ask < 0) R.tagtxt.textContent = best >= 0 ? s.items[best].t : 'Nothing in the light. Keep moving the lamp.';
          if (best >= 0 && api.now() - s.cap > 600) { s.cap = api.now(); cap('Shelf Space ' + (best + 1) + '. ' + s.items[best].t); }
        }
      }

      /* ---------- phase bar (buttons that belong to one phase only) ---------- */
      function showPbar(list) { R.pbar.textContent = ''; list.forEach((a) => R.pbar.appendChild(bt('pbb', a[0], a[1]))); R.pbar.hidden = !list.length; }
      const hidePbar = () => { R.pbar.textContent = ''; R.pbar.hidden = true; };

      /* ---------- LET GO / SURRENDER (hold to release) ---------- */
      function relTarget(kind) {
        if (kind === 'ticket') { const t = S.sel; return t && S.tray.indexOf(t) >= 0 && S.reports >= th(4) ? t : null; }
        let p = POCK[S.pSel]; if (!p || S.pSel >= S.pockN || S.gone[p.id]) { p = POCK.slice(0, S.pockN).filter((x) => !S.gone[x.id])[0]; if (p) S.pSel = POCK.indexOf(p); }
        return p || null;
      }
      function relDown(kind) {
        const t = api.now(); S.relDown = t; noteIn(); if (S.locked || S.phase !== 'counter') return;
        if (hit('rel' + kind)) return;
        if (S.rel) { if (S.rel.mode === 'auto') cancelRelease('tap'); return; }
        const tg = relTarget(kind); if (!tg) return;
        let dur = kind === 'pocket' ? 1 : tg.heavy ? 3 : 1.5; if (kind === 'ticket') dur += tg.depth; dur = Math.min(7.5, dur);
        if (api.selftest) dur = kind === 'ticket' && tg.heavy ? 0.5 : 0.3;
        S.rel = { kind, mode: 'hold', t: 0, dur, target: tg, dead: false, down: t, said: 0, story: -1, storyTxt: '' };
        R.tagtxt.textContent = 'Hold to let go. It will tug. This is normal.';
      }
      function relUp(kind) {
        S.relUp = api.now(); const r = S.rel; if (!r || r.dead || r.kind !== kind) return;
        if (r.mode === 'hold') { if (api.now() - r.down < 250) r.mode = 'auto'; else cancelRelease('early'); }
      }
      const relClick = (kind) => { if (api.now() - Math.max(S.relDown, S.relUp) > 400) { relDown(kind); relUp(kind); } };
      function bindHold(btn, kind) {
        api.on(btn, 'pointerdown', (e) => { if (e.button > 0) return; try { btn.setPointerCapture(e.pointerId); } catch (_) { /* synthetic pointer */ } relDown(kind); });
        api.on(btn, 'contextmenu', (e) => e.preventDefault()); api.on(btn, 'pointerup', () => relUp(kind)); api.on(btn, 'pointercancel', () => cancelRelease('cancel'));
        api.on(btn, 'blur', () => { if (S.rel && S.rel.mode === 'hold') cancelRelease('cancel'); });
        api.on(btn, 'keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); if (!e.repeat) relDown(kind); } });
        api.on(btn, 'keyup', (e) => { if (e.key === 'Enter' || e.key === ' ') relUp(kind); });
        api.on(btn, 'click', () => relClick(kind));
      }
      function setRing(r, p) {
        const b = r.kind === 'pocket' ? R.surr : R.vLet; b.style.setProperty('--p', String(Math.round(p * 1000) / 10)); b.classList.toggle(k('ringing'), p > 0);
        if (r.kind === 'ticket' && S.tkEl) S.tkEl.style.transform = p > 0 && !RM() && !r.dead ? 'translateX(' + (Math.sin(r.t * 45) * (1 - p) * 4).toFixed(2) + 'px)' : '';
      }
      function cancelRelease(reason) {
        const r = S.rel; if (!r) return; S.rel = null; r.dead = true; setRing(r, 0);
        if (reason === 'early') {
          if (r.target && r.target.heavy) { if (r.storyTxt) R.tagtxt.textContent = r.storyTxt.slice(0, Math.max(8, Math.floor(r.storyTxt.length * 0.55))).trim() + ' —'; sayR('heavy.again', 'Wendell'); } else sayR('letgo.early', 'Wendell', null, 'disappointed');
        }
      }
      function tickRel(dt) {
        const r = S.rel; if (!r || r.dead) return; r.t += dt; const p = Math.min(1, r.t / r.dur); setRing(r, p);
        if (r.kind === 'ticket' && r.target.heavy) {
          const s = Math.min(2, Math.floor(p * 3)); if (s !== r.story) { r.story = s; r.storyTxt = L('heavy.' + (s + 1)); R.tagtxt.textContent = r.storyTxt; bubble(r.storyTxt); if (s === 0) cap(r.storyTxt); }
        } else {
          const st = p >= 0.8 ? 3 : p >= 0.55 ? 2 : p >= 0.25 ? 1 : 0;
          if (st > r.said) { r.said = st; const l = L('holding'); R.tagtxt.textContent = l; if (st === 2) say(l, 'Wendell'); else bubble(l); }
        }
        if (p >= 1) completeRelease();
      }
      function completeRelease() {
        const r = S.rel; if (!r || r.dead) return; S.rel = null; r.dead = true; setRing(r, 0);
        if (r.kind === 'ticket') keepTicket(r.target); else keepPocket(r.target);
      }

      /* ---------- keeping things: the shelf ---------- */
      function persist() {
        try {
          const b = { sessions: V.sessions, loops: V.loops, total: V.total, annex: S.annex, smile: V.smile, lot0: V.lot0, ficus: V.ficus, clauses: Math.min(9, S.clauseSeen), no: V.no,
            kept: S.kept.slice(-60).map((e) => { const o = { t: String(e.t).slice(0, 40), e: Array.from(String(e.e)).slice(0, 2).join(''), k: e.k, n: num(e.n), d: num(e.d), a: num(e.a) }; if (e.p) o.p = e.p; if (e.s) o.s = 1; return o; }) };
          if (V.first) b.first = { t: V.first.t, p: V.first.p || null };
          return api.save.set('v', b);
        } catch (_) { return false; }
      }
      function pushKept(e) {
        S.kept.push(e); if (S.kept.length > 60) { S.kept.shift(); S.annex++; }
        S.keptTotal++; api.stat.max('lost-and-found.keptmax', S.kept.length); persist(); drawShelf(); renderShelfList(); paintBoard();
        if (api.stat.get('lost-and-found.kept') >= 8) api.achieve('lost-and-found.kept8');
        if (S.kept.length >= 12) api.achieve('lost-and-found.collection');
        return S.annex + S.kept.length;
      }
      function stampKept(text) {
        R.stampEl.textContent = text || AMEND[Math.min(8, Math.max(1, S.keptTotal)) - 1]; R.stampEl.hidden = false; flash(R.stampEl, 'slam', 900);
        later(1600, () => { R.stampEl.hidden = true; });
      }
      function tagText(e, pos) {
        return fill(TAGT[e.k] || TAGT.tk, { SHELF: shelfNo(pos), ITEM: upper(e.t), NAME: clean(api.player && api.player.name) || 'Valued Employee' }) + (e.a ? ' (kept again, with additional forever)' : '') + (e.s ? ' Hobbs: ticket issued.' : '');
      }
      function renderShelfList() {
        R.shelfl.textContent = '';
        for (let i = S.kept.length - 1, c = 0; i >= 0 && c < 40; i--, c++) R.shelfl.appendChild(el('li', { class: k('shi' + (S.hi === i ? ' hi' : '')), text: tagText(S.kept[i], S.annex + i + 1) }));
        if (!S.kept.length) R.shelfl.appendChild(el('li', { class: k('shi'), text: 'Nothing is kept yet. The shelf is patient. The shelf has a velvet rope and no one to put it round.' }));
      }
      function drawShelf() {
        const c = R.scan, w = Math.max(200, Math.floor(R.shelf.clientWidth - 12) || 600); if (c.width !== w) c.width = w;
        let ctx = null; try { ctx = c.getContext('2d'); } catch (_) { /* none */ } if (!ctx) return;
        ctx.clearRect(0, 0, w, 64);
        const list = S.kept, n = list.length, vis = Math.min(24, Math.max(1, Math.floor((w - 150) / 46)), n), start = n - vis;
        for (let j = 0; j < vis; j++) {
          const e = list[start + j], hi = S.hi === start + j;
          ctx.save(); ctx.translate(8 + j * 46, 17); if (hi) { ctx.translate(-3, -2); ctx.scale(1.15, 1.15); }
          ctx.fillStyle = '#d6b27a'; ctx.strokeStyle = hi ? '#d63b3b' : '#2b2118'; ctx.lineWidth = hi ? 3 : 2; ctx.fillRect(0, 0, 40, 30); ctx.strokeRect(0, 0, 40, 30);
          if (e.p) drawDoodle(ctx, e.p, 40, 30, { fit: true, box: 100, lw: 1.5, noclear: true }); else { ctx.font = '18px "Segoe UI Emoji", system-ui, sans-serif'; ctx.textAlign = 'center'; ctx.textBaseline = 'middle'; ctx.fillStyle = '#2b2118'; ctx.fillText(e.e, 20, 16); }
          ctx.restore();
        }
        ctx.fillStyle = '#2b2118'; ctx.textBaseline = 'middle'; ctx.font = 'bold 13px system-ui, sans-serif';
        if (!n) { ctx.textAlign = 'left'; let tx = 'Nothing kept yet. Hold LET GO on a ticket.'; if (ctx.measureText(tx).width > w - 20) tx = 'Nothing kept yet.'; ctx.fillText(tx, 10, 32); return; }
        const more = S.annex + (n - vis); if (more > 0) { ctx.textAlign = 'right'; ctx.fillText('The Annex (+' + api.fmt(more) + ')', w - 8, 32); }
      }
      function keepTicket(t) {
        const i = S.tray.indexOf(t); if (i < 0) return; S.tray.splice(i, 1);
        const old = S.sel === t ? S.tkEl : null; if (S.sel === t) { S.sel = S.tray[0] || null; S.flipped = false; }
        const e = { t: t.thing, e: (KINDS[t.kind] || KINDS.generic).e, k: 'tk', n: t.no, d: t.depth, a: 0 }; if (t.p) e.p = t.p;
        stat('kept'); S.tk1++; const pos = pushKept(e), n = S.keptTotal; award(1, 'kept forever'); sfx('stamp'); later(200, () => sfx('bloop')); flash(R.flap, 'thunk', 500); stampKept();
        if (old) old.classList.add(k('fly')); later(RM() ? 50 : 420, () => { renderTray(); renderTicket(); refresh(); }); renderTray(); refresh();
        if (t.heavy) say(L('heavy.3'), 'Wendell'); else sayR('letgo.done', 'Wendell', { SHELF: shelfNo(pos), THING: t.thing });
        if (S.tk1 === 1) {
          api.achieve('lost-and-found.letgo'); [0, 150, 300].forEach((d) => later(d, () => sfx('ding'))); sayR('letgo.plaque', 'Management', null, 'proud', 1); later(3000, () => sayR('letgo.clause', 'Wendell'));
        } else if (!t.heavy) {
          if (n % 3 === 0) sayR('keptCount', 'Management', { count: S.kept.length, COUNT: S.kept.length }); else if (n === 2 || n % 5 === 0) sayR('letgo.sandra', 'Management');
        }
      }
      function keepPocket(p) {
        if (S.gone[p.id]) return; S.gone[p.id] = true; S.pSel = -1;
        stat('kept'); const pos = pushKept({ t: p.kept, e: p.e, k: p.id, n: 0, d: 0, a: 0 }); sfx('stamp'); later(200, () => sfx('bloop')); flash(R.flap, 'thunk', 500); stampKept();
        if (p.id === 'meh') award(-1, 'a Meh, kept'); else award(0.5, 'kept forever');
        sayR('pocket.' + p.id, 'Wendell', { SHELF: shelfNo(pos) }); if (p.id === 'pencil') S.borrowed = true; if (p.id === 'name') S.youName = true;
        if (POCK.every((q) => S.gone[q.id])) { later(1800, lot0); }
        refresh();
      }
      function lot0() {
        if (S.lot0) return; S.lot0 = true; pushKept({ t: 'one valued employee', e: '👤', k: 'you', n: 0, d: 0, a: 0 }); V.lot0 = true; api.flag.set('lost-and-found.lot0', true);
        award(5, 'Lot 0'); api.achieve('lost-and-found.lot0'); sayR('lot0.say', 'Wendell', null, 'proud', 1); api.confetti(); sfx('tada'); persist();
      }
      function updatePockets() {
        if (S.reports < th(8)) return; const filled = Math.min(6, S.reports - th(8) + 1);
        if (filled > S.pockN) {
          const was = S.pockN; S.pockN = filled; cap('Your pockets now hold: ' + POCK[filled - 1].label + '.');
          if (!was) { sayR('pocket.intro', 'Management', null, 'neutral', 1); after(1800, () => sayR('pocket.ask', 'Wendell')); } refresh();
        }
      }
      function selPocket(i) { if (i >= S.pockN || S.gone[POCK[i].id] || S.phase !== 'counter') return; S.pSel = i; refresh(); sfx('tick'); cap('Selected: ' + POCK[i].label + '. Hold SURRENDER to give it up. It will be Kept.'); }

      /* ---------- the return: describing a kept thing again ---------- */
      function startReturn(entry) {
        S.mode = 'return'; S.ret = entry; S.padScale = clamp(Math.pow(0.88, Math.min(60, entry.d + 1)), 96 / 280, 1);
        R.inp.placeholder = 'Describe it fully. You have described it fully before.'; sayR('return.yes1', 'Wendell', null, 'confused', 1); sayR('return.describe', 'Wendell'); armWd(retDefault); refresh();
      }
      function cancelReturn() {
        if (S.mode !== 'return') return; S.mode = 'report'; S.ret = null; S.padScale = 1; R.inp.placeholder = PLACEH[0];
        if (S.phase === 'counter') armWd(null); refresh(); cap('Escape returns it. It was never really out.');
      }
      function retDefault() { if (S.mode === 'return' && S.phase === 'counter') retSubmit(); }
      function retSubmit() {
        const e = S.ret; if (!e) { S.mode = 'report'; return; }
        const d = Math.min(99999, e.d + 1), st = S.strokes.filter((s) => s.length >= 4);
        S.reports++; V.total++; stat('reports'); S.lost++; award(Math.min(25, 0.3 * d), 'a description, again'); api.stat.max('lost-and-found.depthmax', d);
        if (V.total === 100) { sayR('hundred', 'Management', null, 'proud', 1); award(7.5, 'the 100th report'); }
        const base = unOne(e.t), th2 = base.toLowerCase(), t = mkTicket({ thing: base, item: 'ONE (1) ' + upper(base), kind: kindOf(th2), depth: d, p: toPoly(st) || e.p || null, claimed: true });
        e.a = Math.min(99999, e.a + 1); S.mode = 'report'; S.ret = null; S.padScale = 1; R.inp.placeholder = PLACEH[0]; R.inp.value = ''; S.strokes = []; S.cur = null; S.smudged = false; S.smN = 0; S.padDirty = true; S.lastThing = base; rotateChips();
        const key = { 1: 'nest.1', 2: 'nest.2', 3: 'nest.3', 4: 'nest.4', 5: 'nest.5', 6: 'nest.6', 7: 'nest.7', 8: 'nest.8', 9: 'nest.9' }[d];
        sayR(key || 'return.claimed', 'Wendell', { THING: base }); if (d >= 3) api.achieve('lost-and-found.nested');
        if (d >= 4) { S.sandra++; sayR(S.sandra % 2 ? 'sandra.small' : 'sandra.flag', 'Management'); }
        print(t, { quiet: true });
      }

      /* ---------- the Line (customers) ---------- */
      function showCust(emoji, text) { R.cEmoji.textContent = emoji; R.cText.textContent = text; R.custbox.hidden = false; }
      function dismissCust() { S.cust = null; R.custbox.hidden = true; refresh(); }
      function afterTicket() {
        if (S.cust && !S.cust.auto) { S.cust.age++; if (S.cust.age >= 3) { dismissCust(); cap(L('line.leave')); } }
        if (S.reports >= th(5) && S.kept.length >= 1 && !S.cust && S.reports > (S.custCool || 0) && (!S.epi || api.chance(0.4)) && api.chance(0.8)) spawnCust();
      }
      function autoCust(emoji, text, who, steps, done) {
        const c = S.cust = { auto: true, age: 0 }; showCust(emoji, text); say(text, who); refresh();
        steps.forEach((s, i) => later(2200 * (i + 1), () => { if (S.cust === c) { if (s[1] !== 'Wendell') R.cText.textContent = L(s[0]); sayR(s[0], s[1]); } }));
        later(2200 * (steps.length + 1), () => { if (S.cust === c) { dismissCust(); if (done) done(); } });
      }
      function spawnCust() {
        if (S.phase !== 'counter') return;
        if (!S.geraldDone && rd(() => !!api.flag.get('metGerald'), false)) { S.geraldDone = true; autoCust('🥔', L('gerald.ask'), 'Gerald', [['gerald.reply', 'Wendell'], ['gerald.thanks', 'Gerald']]); return; }
        if (S.kept.length >= 3 && !S.hobbsDone && api.chance(0.35)) {
          S.hobbsDone = true; const e = api.pick(S.kept), thing = labelOf(e);
          autoCust('🧔', L('hobbs.ask', { THING: thing }), 'Customer', [['hobbs.ticket', 'Wendell']], () => { e.s = 1; persist(); renderShelfList(); award(0.5, 'a ticket for Hobbs'); });
          return;
        }
        const pool = S.kept.map((e) => labelOf(e)).concat(S.tray.filter((t) => t !== S.sel).map((t) => t.thing)), x = pool.length ? api.pick(pool) : '';
        const text = x ? L('line.ask', { THING: x }) : L('line.canned'); S.cust = { auto: false, age: 0, thing: x };
        showCust(bagOf('ce', ['👵', '🧔', '👨', '👩', '🧑']).next(), text); say(text, 'Customer'); sfx('blip'); refresh();
      }
      function give() {
        const t = S.sel, c = S.cust; if (!t || !c || c.auto || S.phase !== 'counter') return;
        const i = S.tray.indexOf(t); if (i < 0) return; S.tray.splice(i, 1); S.sel = S.tray[0] || null; S.flipped = false; S.gave++; c.auto = true;
        stat('given'); award(2, 'a ticket, given away'); api.achieve('lost-and-found.line'); sfx('ding'); say(L('line.object'), 'Wendell');
        const thx = L('line.thanks'); R.cText.textContent = thx; say(thx, 'Customer');
        if (S.gave === 1) later(2200, () => { say(LN['line.objectReply'][0], 'Customer'); later(1600, () => say(LN['line.objectReply'][1], 'Wendell')); });
        renderTray(); renderTicket(); refresh(); later(1800, () => { if (S.cust === c) dismissCust(); });
      }
      function notToday() {
        const c = S.cust; if (!c || c.auto) return; const l = L('line.sigh'); say(l, 'Customer'); S.custCool = S.reports + 1; sfx('tick'); dismissCust(); cap(l);
      }

      /* ---------- beats: the director's table ---------- */
      function maybeBeat() {
        if (api.destroyed || S.phase !== 'counter' || S.busy || S.epi || S.mode !== 'report' || S.rel) return; const r = S.reports, B = S.beat;
        if (!B.audit) { if (r >= th(6)) startAudit(); return; }
        if (!B.stool) { if (r >= th(10)) startStool(); return; }
        if (!B.blind) { if (r >= th(12)) startBlind(); return; }
        if (!B.keep && r >= th(14)) startKeeping();
      }
      /* the audit */
      const FIG = ['Items on shelf', 'Items lost', 'Items found', 'Items kept', 'Items not lost'];
      function auditTick() {
        if (!S.figs) return; const f = S.figs;
        f[0].textContent = FIG[0] + ': ' + api.randInt(120, 330); f[1].textContent = FIG[1] + ': ' + api.randInt(90, 410); f[2].textContent = FIG[2] + ': 0';
        f[3].textContent = FIG[3] + ': ' + api.randInt(60, 280); f[4].textContent = FIG[4] + ': -7 1/2'; after(700, auditTick);
      }
      function startAudit() {
        S.busy = true; S.beat.audit = 1; setPhase('audit', endAudit); sayR('audit.start', 'Management', null, 'neutral', 1); sfx('bell');
        S.figs = FIG.map(() => el('p', { class: k('fig') }, ''));
        const pool = CHIPS.filter((c) => c !== 'nothing' && c !== 'I do not know' && c.length < 24), chip = api.pick(pool) || 'keys', nm = upper(chip.replace(/^(?:my|the|a|an|one|some)\s+/i, ''));
        S.prophecy = chip; R.inp.value = chip; const slip = dv('slip', 'ONE (1) ' + nm + ', 8:45 PM, ready for collection');
        R.audit.textContent = ''; R.audit.appendChild(dv('clips', sp('clipe', '📋'), sp('clipe', '📋'))); S.figs.forEach((f) => R.audit.appendChild(f)); R.audit.appendChild(slip);
        R.audit.appendChild(bt('pbb', 'Dispute the figures', () => endAudit())); auditTick();
        after(1800, () => sayR('audit.disagree', 'Management')); after(D(4500, 300), () => sayR('audit.prophecy', 'Management', { ITEM: nm }, 'smug'));
        after(D(12000, 800), endAudit);
      }
      function endAudit() {
        if (S.phase !== 'audit') return; S.figs = null; award(0.3, 'an audit'); sayR('audit.over', 'Management'); startPullback();
      }
      /* the pull-back */
      function startPullback() {
        S.beat.pull = 1; setPhase('pullback', endPull); sayR('pullback.lost', 'Management', null, 'confused', 1);
        S.lost += 7.5; S.found = '1/2'; paintBoard(); later(D(12000, 1000), () => { S.found = '0'; paintBoard(); });
        after(D(1500, 100), () => sayR('pullback.half', 'Management'));
        after(D(2800, 200), () => {
          R.pbf = dv('pbf', dv('pbshelf'), dv('pbcounter'), sp('pbw', '🧓'), dv('pbsign', 'LOST & FOUND')); root.insertBefore(R.pbf, R.scene); root.classList.add(k('pullb')); sfx('whoosh');
        });
        after(D(5400, 500), () => { sayR('pullback.is', 'Wendell'); showPbar([['Yes (it is)', () => endPull()], ['No (it is also)', () => endPull()]]);
          if (R.pbf) R.pbf.appendChild(dv('pbask', bt('pbb', 'Yes (it is)', () => endPull()), bt('pbb', 'No (it is also)', () => endPull()))); });
        after(D(8400, 900), endPull);
      }
      function endPull() {
        if (S.phase !== 'pullback') return; root.classList.remove(k('pullb')); if (R.pbf && R.pbf.parentNode) R.pbf.parentNode.removeChild(R.pbf); R.pbf = null;
        S.busy = false; setPhase('counter'); sayR('pullback.after', 'Wendell'); sayR('pullback.whole', 'Management'); award(1, 'a pull-back'); api.achieve('lost-and-found.pullback'); sfx('tada');
      }
      /* the stool */
      function startStool() {
        S.busy = true; S.beat.stool = 1; S.stoolN = 0; S.stBusy = false; S.stRows = api.shuffle(STOOL); setPhase('stool', () => stoolPick(0)); sayR('stool.start', 'Wendell', null, 'neutral', 1); stoolNext();
      }
      function stoolNext() {
        const i = S.stoolN, row = S.stRows[i % S.stRows.length]; R.stCust.textContent = bagOf('sce', ['🧑', '👵', '👴', '👨', '👩', '🧔']).next(); R.stText.textContent = row[0];
        say(row[0], 'Customer'); after(1400, () => say(row[1], 'Wendell')); armWd(() => stoolPick(0));
      }
      function stoolPick(i) {
        if (S.phase !== 'stool' || S.stBusy) return; S.stBusy = true; noteIn(); sayR(['stool.georgia', 'stool.mono', 'stool.cursive'][i], 'Wendell'); sfx('stamp');
        const thx = S.stoolN === 0 ? L('stool.first') : L('stool.thanks'); R.stText.textContent = thx; say(thx, 'Customer'); award(0.2, 'a ticket from the stool'); stat('staffed'); S.stoolN++; S.wd = null;
        after(D(1800, 250), () => { S.stBusy = false; if (S.stoolN >= 3) endStool(); else stoolNext(); });
      }
      function endStool() {
        if (S.phase !== 'stool') return; S.busy = false; setPhase('counter'); sayR('stool.end', 'Wendell', null, 'proud', 1); api.achieve('lost-and-found.stool'); award(1, 'the stool'); sfx('tada');
      }
      /* Lot 7 1/2 */
      function startBlind() {
        S.busy = true; S.beat.blind = 1; S.mode = 'blind'; S.peeks = 0; S.strokes = []; S.cur = null; S.padDirty = true; setPhase('blind', blindDrop);
        sayR('blind.start', 'Wendell', null, 'neutral', 1); after(2600, () => sayR('blind.cloth', 'Management'));
      }
      function blindDrop() {
        if (S.phase !== 'blind') return; endStroke(); const st = S.strokes.filter((s) => s.length >= 4), poly = toPoly(st), first = S.firstDoodle || (V.first && V.first.p) || null;
        award(2, 'a blind drawing'); stat('blind'); S.mode = 'report'; S.strokes = []; S.cur = null; S.padDirty = true; S.reveal = true; setPhase('reveal', endReveal); sfx('whoosh');
        const mk = (p) => { const c = el('canvas', { class: k('rcan'), width: 120, height: 90, 'aria-hidden': 'true' }); try { drawDoodle(c.getContext('2d'), p || [], 120, 90, { fit: true, box: 100 }); } catch (_) { /* none */ } return c; };
        R.wob = el('path', { d: 'M0 10 L100 10', fill: 'none', stroke: '#d63b3b', 'stroke-width': 2 });
        R.reveal.textContent = ''; R.reveal.appendChild(dv('rrow', dv('rcard', sp('rcl', 'Your first drawing'), mk(first)), el('svg', { class: k('wob'), viewBox: '0 0 100 20', 'aria-hidden': 'true' }, R.wob), dv('rcard', sp('rcl', 'Lot 7 1/2'), mk(poly))));
        refresh(); sayR(first ? 'blind.reveal' : 'blind.revealNone', 'Wendell', null, 'smug', 1); after(D(1800, 200), () => sayR('blind.compare', 'Wendell')); after(D(3200, 300), () => sayR('blind.claim', 'Wendell'));
        const e = { t: 'lot 7 1/2', e: '👻', k: 'lot', n: 0, d: 0, a: 0 }; if (poly) e.p = poly; pushKept(e); api.achieve('lost-and-found.blind'); after(D(4000, 500), endReveal);
      }
      function endReveal() {
        if (S.phase !== 'reveal') return; S.reveal = false; S.busy = false; R.wob = null; setPhase('counter'); sayR('blind.done', 'Management');
      }
      function tickWob(dt) {
        if (!S.reveal || !R.wob) return; S.wobT = (S.wobT || 0) + dt; let d = '';
        for (let x = 0; x <= 100; x += 10) d += (x ? ' L' : 'M') + x + ' ' + (10 + (RM() ? 0 : 6 * Math.sin(S.wobT * 3 + x * 0.25))).toFixed(1);
        R.wob.setAttribute('d', d);
      }
      /* the Keeping (the ending that is not an ending) */
      function startKeeping() {
        S.busy = true; S.beat.keep = 1; setPhase('keeping', finishRoll); sayR('keeping.start', 'Management', null, 'neutral', 1); after(1800, () => sayR('keeping.ladder', 'Wendell'));
        const n = S.kept.length; let items;
        if (n >= 3) items = S.kept.slice(-20).reverse().map((e) => ({ label: labelOf(e), idx: S.kept.indexOf(e) }));
        else items = api.shuffle(SCEN).slice(0, 3).map((x) => ({ label: x.t.split(/[.,]/)[0], idx: -1 }));
        S.roll = { items, extra: Math.max(0, n - 20), i: 0 }; after(D(2600, 400), rollNext);
      }
      function rollNext() {
        const r = S.roll; if (!r) return;
        if (r.i >= r.items.length) { if (r.extra > 0) sayR('keeping.more', 'Wendell', { COUNT: api.fmt(r.extra) }); finishRoll(); return; }
        const it = r.items[r.i++]; S.hi = it.idx; drawShelf(); renderShelfList(); sayR('keeping.item', 'Wendell', { LABEL: it.label }); sfx('tick');
        if (r.i === (api.selftest ? 2 : 8)) showPbar([['Skip the roll call', () => finishRoll()]]);
        after(D(1200, 100), rollNext);
      }
      function finishRoll() {
        if (S.phase !== 'keeping' || !S.roll) return; S.roll = null; S.hi = -1; drawShelf(); renderShelfList(); hidePbar(); sayR('keeping.end', 'Wendell'); award(5, 'a roll call'); stat('rollcalls');
        after(D(1800, 200), startFinal);
      }
      function startFinal() {
        setPhase('final', finalHand); S.mode = 'wendell'; S.padScale = 1; S.strokes = []; S.cur = null; S.padDirty = true; S.penDirty = true; sayR('final.ask', 'Wendell', null, 'neutral', 1); refresh();
      }
      function finalHand() {
        if (S.phase !== 'final' || S.mode !== 'wendell') return; endStroke(); const p = toPoly(S.strokes.filter((s) => s.length >= 4)); S.mode = 'report'; S.strokes = []; S.cur = null; S.padDirty = true; armWd(null); refresh();
        after(D(3000, 300), () => {
          const no = V.no = Math.min(99999, V.no + 1); sfx('whoosh'); later(260, () => sfx('stamp')); flash(R.printer, 'blink', 900); sayR('final.after', 'Wendell', null, 'proud', 1); after(D(2200, 250), () => sayR('final.pocket', 'Wendell'));
          R.wpocket.hidden = false; R.wpocket.textContent = ''; if (p) R.wpocket.appendChild(thumb(p)); else R.wpocket.textContent = '🎫';
          award(7.5, 'a drawing for a clerk'); api.confetti(); sfx('tada'); if (p) pushKept({ t: 'thing wendell lost at 4:17', e: '🎫', k: 'tk', n: no, d: 0, a: 0, p });
          after(D(3200, 400), () => { R.sback.textContent = 'FOUND: A DIFFERENT PLACE, SLIGHTLY BEHIND, WITH YOU IN IT'; flipSign(true); after(D(1000, 200), () => { flipSign(false); after(D(700, 100), certStep); }); });
        });
      }
      function certStep() {
        R.sback.textContent = 'LOST: YOUR PLACE IN LINE. FOUND: A DIFFERENT PLACE, SLIGHTLY BEHIND.'; setPhase('final', certDone);
        R.cert.textContent = ''; R.cert.appendChild(dv('certc', el('h3', { class: k('certh') }, 'CERTIFICATE OF EVERYTHING THAT REMAINS'), el('p', { class: k('certp') }, 'Awarded to ' + fill('$NAME', tok())),
          el('p', { class: k('certp') }, 'For ' + S.kept.length + ' things kept, 0 things found, and one clerk, slightly less lost.'), el('p', { class: k('certs') }, 'Signed: S.'), bt('certb', 'Close', () => certDone())));
        R.cert.hidden = false; R.cert.setAttribute('role', 'dialog'); R.cert.setAttribute('aria-label', 'Certificate'); sfx('tada'); after(D(12000, 1000), certDone);
        try { R.cert.querySelector('button').focus(); } catch (_) { /* no focus */ }
      }
      function certDone() {
        if (R.cert.hidden) return; R.cert.hidden = true; setPhase('final', null); sayR('final.board', 'Management');
        after(D(1400, 150), () => { sayR('final.congrats', 'Management', null, 'proud', 2); api.achieve('lost-and-found.keeping'); api.confetti(); });
        after(D(4200, 400), () => {
          S.awake = false; stat('loops'); V.loops++; S.epi = true; S.busy = false; S.mode = 'report'; persist(); setPhase('counter'); sfx('bell');
          later(900, () => { sayR('final.next', 'Wendell'); R.queue.classList.add(k('look')); if (!R.queue.hidden) later(2400, () => sayR('queue.look', 'Management', null, 'smug')); }); later(D(3000, 1500), () => { S.awake = true; paintWendell(); sayR('final.ask2', 'Wendell'); });
          if (V.loops === 1) later(D(7000, 2500), () => sayR('final.aside', 'Management'));
        });
      }

      /* ---------- the Night Shift, bell, Dennis ---------- */
      function startNight() {
        if (S.phase !== 'counter') return; setPhase('night'); S.nightFlip = false; R.night.hidden = false; R.night.textContent = ''; R.night.classList.remove(k('found'));
        (S.layout || []).slice(0, 6).forEach((it, i) => R.night.appendChild(dv('nc', sp('nce', it.e), sp('nct', 'Lost: you'))).style.animationDelay = (i * 0.35) + 's');
        sayR('idle.90', 'Management', null, 'smug', 1);
      }
      function endNight(claimed) {
        if (S.phase !== 'night') return; R.night.hidden = true; R.night.textContent = ''; setPhase('counter'); if (claimed) sayR('idle.claimed', 'Management');
      }
      function nightFound() {
        S.nightFlip = true; R.night.classList.add(k('found')); Array.prototype.forEach.call(R.night.children, (c) => { if (c.children[1]) c.children[1].textContent = 'Found: you. Condition: here. Kept: nobody has said.'; });
        [0, 350, 700, 1050].forEach((d) => later(d, () => sfx('bell'))); sayR('idle.found', 'Management', null, 'proud', 1);
        if (!S.nightPaid) { S.nightPaid = true; if (!api.stat.get('lost-and-found.nights')) award(10, 'being found'); stat('nights'); api.achieve('lost-and-found.night'); api.confetti(); }
      }
      function ring() {
        if (S.bellKept) { knock(); return; }
        noteIn(); wake(); const t = api.now(); S.bellTotal++; stat('bell'); S.bellTimes = S.bellTimes.filter((x) => t - x < 3000); S.bellTimes.push(t); flash(R.bell, 'rang', 400);
        if (S.intick) { sfx('tick'); anim('shake', 500); }
        if (S.paperBell) say(L('bell.paper'), 'Wendell'); else { sfx(bagOf('bs', ['bell', 'ding', 'blip', 'tick', 'pop', 'honk', 'boing']).next()); const n = S.bellTotal; sayR(n === 5 ? 'bell.five' : n === 10 ? 'bell.ten' : 'bell', 'Wendell'); }
        if (S.bellTimes.length >= 12 && !S.paperBell) paperBellOn();
        if (S.bellTotal === 30 && !S.bellKept) keepBell();
      }
      function paperBellOn() {
        S.paperBell = true; api.achieve('lost-and-found.bell'); if (!S.agit) { S.agit = true; award(-0.5, 'an agitation fee'); }
        pushTray(mkTicket({ no: 101, item: 'BELL (LOST)', thing: 'bell', chipLabel: 'BELL (lost) No. 0101', system: true })); renderTray(); sayR('bell.spam', 'Management', null, 'panic', 2); later(1500, () => sayR('bell.filed', 'Wendell', null, 'smug'));
        later(D(15000, 1000), () => { S.paperBell = false; refresh(); sayR('bell.back', 'Management'); }); refresh();
      }
      function keepBell() {
        const ae = document.activeElement, had = ae === R.bell || !ae || ae.tagName === 'BODY';
        S.bellKept = true; stat('kept'); pushKept({ t: 'one (1) bell', e: '🔔', k: 'bell', n: 0, d: 0, a: 0 }); sayR('bell.kept', 'Wendell', null, 'neutral', 1); refresh(); sfx('stamp');
        if (had) { try { R.knock.focus(); } catch (_) { /* no focus */ } }
      }
      function knock() { noteIn(); wake(); sfx('tick'); sayR('bell.knock', 'Wendell'); flash(R.knock, 'rang', 300); }
      function dennis() {
        noteIn(); S.dennis++; sfx('pop'); flash(R.dennis, 'rang', 400);
        if (S.dennis === 7) {
          S.found = '1'; paintBoard(); sayR('leaf.found', 'Management', null, 'confused', 1); award(0.5, 'a leaf'); api.achieve('lost-and-found.leaf');
          later(1000, () => { S.found = '0'; paintBoard(); sayR('leaf.recount', 'Management'); });
        } else if (S.dennis === 15 || S.dennis === 30 || S.dennis === 50) { sayR('dennis.' + S.dennis, 'Management', null, 'confused', 1); award(0.5, 'Dennis (Plant)'); } else sayR('dennis', 'Management');
      }
      /* rare events, the 3-minute break, the 10-minute review */
      function rareEvent() {
        const now = api.now(); if (S.busy || S.phase !== 'counter' || S.mode !== 'report' || S.tickets < 3 || now - S.rareAt < (api.selftest ? 3000 : 90000) || !api.chance(api.selftest ? 0.6 : 0.12)) return;
        S.rareAt = now; const w = bagOf('rare', ['sandra', 'phone', 'stapler']).next(); stat('rare'); award(0.7, 'something rare');
        if (w === 'sandra') { stampKept('SEEN BY SANDRA (INITIALS: S.)'); sfx('stamp'); sayR('rare.sandra', 'Management', null, 'smug', 1); }
        else if (w === 'phone') { sfx('bell'); sayR('rare.phone1', 'Management', null, 'confused', 1); later(2600, () => { sfx('bell'); sayR('rare.phone2', 'Wendell', null, 'neutral', 1); }); later(5800, () => sayR('rare.phone3', 'Wendell', null, 'disappointed', 1)); later(9200, () => sayR('rare.phone4', 'Management')); }
        else { sfx('honk'); sayR('rare.stapler', 'Management', null, 'confused', 1); }
      }
      const calm = () => S.phase === 'counter' && !S.busy && S.mode === 'report' && !S.rel && !S.locked && S.anyIn && !S.napping;
      function mark3() {
        S.m3 = 1; S.m3At = api.now(); sfx('bell'); setFront('MANDATORY FUN IN PROGRESS'); sayR('mid3.start', 'Management', null, 'smug', 1); later(5200, () => sayR('mid3.stretch', 'Management', null, 'neutral', 1));
        later(10400, () => { sayR('mid3.wendell', 'Wendell', null, 'neutral', 1); if (calm()) print(mkTicket({ item: 'ONE (1) MANDATORY BREAK', thing: 'mandatory break', kind: 'time', system: true }), { quiet: true }); });
        later(15600, () => { setFront('LOST & FOUND (MOSTLY LOST)'); sayR('mid3.end', 'Management', null, 'proud', 1); award(1.5, 'a mandatory break'); stat('breaks'); });
      }
      /* Sandra arrives: FLAGGED stamps slam onto the furniture, one at a time, and can be swatted */
      function flagNode(key) { return key === 'bell' ? (S.bellKept ? R.knock : R.bell) : key === 'dennis' ? R.dennis : key === 'pad' ? R.padw : key === 'printer' ? R.printer : key === 'wendell' ? R.wend : R.board; }
      function flagPos(key) {
        const n = flagNode(key), a = n && n.getBoundingClientRect(), b = R.scene.getBoundingClientRect(); if (!a || !(a.width > 0) || !(b.width > 0)) return null;
        return { x: Math.round(clamp(a.left - b.left + a.width / 2, 58, Math.max(58, b.width - 58))) + 'px', y: Math.round(a.top - b.top + a.height / 2) + 'px' };
      }
      function slamFlag(i) {
        const f = FT[i], pos = R.flags && flagPos(f[0]); if (!pos) return;
        while (R.flags.children.length > 8) R.flags.removeChild(R.flags.firstChild);
        const fl = el('button', { class: k('flag'), type: 'button', dataset: { key: f[0] }, style: 'left:' + pos.x + ';top:' + pos.y + ';--r:' + (i % 2 ? 8 : -9) + 'deg', 'aria-label': 'Flag stamped on the ' + f[0] + '. Swat it.' }, 'FLAGGED');
        api.on(fl, 'click', () => { if (!fl.parentNode) return; fl.parentNode.removeChild(fl); noteIn(); sfx('pop'); stat('swats'); award(0.2, 'a swatted flag'); if (++S.swats % 2 === 1) sayR('flag.swat', 'Wendell'); });
        R.flags.appendChild(fl); sfx('stamp');
      }
      function mark5() {
        S.m5 = 1; S.m5At = api.now(); S.busy = true; S.swats = 0; sfx('bell'); sayR('flag.start', 'Management', null, 'confused', 1);
        const gap = D(3200, 400);
        FT.forEach((f, i) => later(gap * (i + 1), () => { slamFlag(i); sayR(f[0] === 'bell' && S.bellKept ? 'flag.knock' : f[1], 'Management', null, 'neutral', 1); }));
        later(gap * (FT.length + 1), () => {
          R.flags.textContent = ''; const rv = el('div', { class: k('reviewed'), 'aria-hidden': 'true' }, 'REVIEWED'); R.flags.appendChild(rv); sfx('stamp'); S.busy = false;
          award(2, 'a review of everything'); stat('sandras'); api.achieve('lost-and-found.flagged'); api.confetti(); sayR('flag.end', 'Management', null, 'proud', 1);
          later(4200, () => { if (rv.parentNode) rv.parentNode.removeChild(rv); sayR('flag.after', 'Management'); });
        });
      }
      function mark10() {
        S.m10 = 1; sfx('bell'); setFront('PERFORMANCE REVIEW IN PROGRESS'); sayR('rev.start', 'Management', null, 'proud', 1);
        ['rev.1', 'rev.2', 'rev.3', 'rev.4'].forEach((c, i) => later(5500 * (i + 1), () => sayR(c, 'Management', null, 'neutral', 1))); later(5500 * 5, () => sayR('rev.5', 'Wendell', null, 'smug', 1));
        later(5500 * 6.4, () => { setFront('LOST & FOUND (MOSTLY LOST)'); sayR('rev.end', 'Management', null, 'proud', 1); award(3, 'a review attended'); api.achieve('lost-and-found.review'); api.confetti(); sfx('tada'); });
      }
      function noInputTicket() {
        wake(); S.reports++; V.total++; stat('reports'); S.lost++; award(0.5, 'a report'); const t = mkTicket({ item: 'THE THING YOU WERE ABOUT TO SAY', thing: 'thing you were about to say', kind: 'generic' });
        S.lastThing = t.thing; sayR('noinput', 'Wendell'); print(t, { quiet: true });
      }

      /* ---------- the heartbeat, keys, resize, frame loop ---------- */
      function tick500() {
        const t = api.now(), w = S.wd;
        if (document.hidden) { S.lastInput = t; if (w) w.last = t; return; }
        if (w) { const idle = api.selftest ? 3000 : 20000, hard = api.selftest ? 9000 : 45000; if (t - w.last > idle || t - w.t0 > hard) { S.wd = null; w.fn(); } }
        const ctr = S.phase === 'counter';
        if (!S.anyIn && !S.noinput && S.reports === 0 && ctr && S.mode === 'report' && t - S.t0 > 12000 * K_) { S.noinput = true; noInputTicket(); return; }
        if (ctr) {
          if (!S.napping && S.awake && t - S.lastInput > IDLE1) { S.napping = true; S.snoreAt = t + 9000 * K_; paintWendell(); sayR('idle.45', 'Management'); }
          else if (S.napping && t > S.snoreAt) { S.snoreAt = t + 16000 * K_; sayR('idle.snore', 'Wendell'); }
          if (S.anyIn && !S.nudged && !S.napping && S.awake && t - S.lastInput > 22000 * K_) { S.nudged = true; sayR('idle.nudge', 'Wendell'); }
          if (S.anyIn && !S.busy && !S.locked && t > S.paAt && t - S.lastInput < 20000 * K_) { S.paAt = t + api.randInt(24000, 40000) * (api.selftest ? 0.3 : 1); sayR('pa', 'Management'); }
          if (!S.m3 && t - S.t0 > (api.selftest ? 22000 : 180000) && calm()) mark3();
          else if (S.m3 && !S.m5 && t - S.t0 > (api.selftest ? 31000 : 270000) && t - S.m3At > 20000 && calm()) mark5();
          else if (S.m5 && !S.m10 && t - S.t0 > (api.selftest ? 40000 : 600000) && t - S.m3At > 20000 && t - S.m5At > 25000 && calm()) mark10();
          if (t - S.lastInput > IDLE2) { startNight(); return; }
          if (t > S.misAt && S.sel && !S.rel) { S.misAt = t + api.randInt(20000, 40000); if (S.sel.kind === 'keys' || S.sel.kind === 'umbrella') anim((KINDS[S.sel.kind]).anim, 1200); }
        } else if (S.phase === 'night' && !S.nightFlip && t - S.lastInput > IDLE2 + STILL) nightFound();
      }
      function escKey() {
        if (S.phase === 'search') { const s = S.search; if (s) endSearch(s.t, true); return; }
        if (S.rel) { cancelRelease('esc'); return; }
        if (S.mode === 'return') { cancelReturn(); return; }
        sayR('esc', 'Wendell');
      }
      function docKey(e) {
        noteIn(); const tg = e.target, tn = tg && tg.tagName; if (tn === 'INPUT' || tn === 'TEXTAREA' || tn === 'SELECT') { if (e.key === 'Escape' && S.mode === 'return' && !S.rel && S.phase === 'counter') cancelReturn(); return; }
        if (e.ctrlKey || e.altKey || e.metaKey) return; if (S.phase === 'search' && searchKey(e)) return;
        const key = e.key; if (key === 'Escape') { escKey(); return; } if (e.repeat || !key) return;
        const lk = key.length === 1 ? key.toLowerCase() : key;
        if (S.phase === 'search' && S.search && S.search.ask >= 0 && (lk === 'y' || lk === 'n')) { answer(lk === 'y'); return; }
        if (S.phase === 'stool' && /^[1-3]$/.test(key)) { stoolPick(+key - 1); return; }
        if (/^[1-6]$/.test(key)) { if (tg !== R.pad && !R.pockets.hidden && S.phase === 'counter') selPocket(+key - 1); return; }
        if (lk === 'b') ring(); else if (lk === 'u') use(); else if (lk === 'h') light(); else if (lk === 'f') flip(); else if (lk === 'r') redeem(); else if (lk === 'l') relDown('ticket'); else if (lk === 'g') give(); else if (lk === 's') relDown('pocket');
      }
      function docKeyUp(e) { const lk = e.key && e.key.length === 1 ? e.key.toLowerCase() : ''; if (lk === 'l') relUp('ticket'); else if (lk === 's') relUp('pocket'); }
      function onResize(init) {
        const w = root.clientWidth || root.getBoundingClientRect().width || 1000, nar = w < 520, was = S.narrow;
        S.narrow = nar; { const want = nar ? R.counter : R.foot; if (R.cap.nextElementSibling !== want && want.parentNode === R.scene) R.scene.insertBefore(R.cap, want); }
        root.classList.toggle(k('narrow'), nar); root.classList.toggle(k('stack'), w < 760); root.classList.toggle(k('rm'), RM());
        if (!init && nar !== was) {
          if (nar) { S.wasNarrow = true; if (api.now() - S.narLine > 20000) { S.narLine = api.now(); sayR('resize.narrow', 'Management'); } } else if (S.wasNarrow) { S.wasNarrow = false; sayR('resize.wide', 'Wendell'); }
        }
        drawShelf(); measure(); paintWendell();
        Array.prototype.forEach.call(R.flags.children, (f) => { const p = f.dataset && f.dataset.key ? flagPos(f.dataset.key) : null; if (p) { f.style.left = p.x; f.style.top = p.y; } });
      }
      function paintString() {
        const p = S.pen, dx = p.x - AX, dy = p.y - AY, d = Math.hypot(dx, dy) || 1; let cx = (AX + p.x) / 2, cy = (AY + p.y) / 2;
        if (S.taut) { const a = S.twang * Math.sin(S.twPh); cx += -dy / d * a; cy += dx / d * a; } else cy += Math.max(0, radius() - d) * 0.35;
        R.path.setAttribute('d', 'M' + AX + ' ' + AY + ' Q' + cx.toFixed(1) + ' ' + cy.toFixed(1) + ' ' + p.x + ' ' + p.y); R.tip.setAttribute('cx', p.x); R.tip.setAttribute('cy', p.y);
      }
      function tickPad(dt) {
        if (S.padDirty) padDraw();
        if (S.twang > 0.05) { S.twPh += dt * Math.PI * 2 * 30; S.twang *= Math.exp(-6 * dt); S.penDirty = true; } else if (S.twang) { S.twang = 0; S.penDirty = true; }
        if (S.penDirty) { S.penDirty = false; paintString(); }
        if (S.mode === 'blind') { const o = S.peekUntil > api.now() ? '1' : '0'; if (R.pad.style.opacity !== o) R.pad.style.opacity = o; } else if (R.pad.style.opacity) R.pad.style.opacity = '';
      }
      let lastTs = 0;
      function frame(ts) {
        if (api.destroyed) return; ts = Number.isFinite(ts) ? ts : api.now();
        const dt = lastTs ? Math.min(0.1, Math.max(0, (ts - lastTs) / 1000)) : 0.016; lastTs = ts;
        tickLamp(dt); tickRel(dt); tickPad(dt); tickWob(dt); api.requestAnimationFrame(frame);
      }

      /* ---------- go ---------- */
      bindHold(R.vLet, 'ticket'); bindHold(R.surr, 'pocket');
      api.on(root, 'pointerdown', () => noteIn()); api.on(root, 'input', () => noteIn());
      api.on(root, 'pointermove', (e) => { const p = S.mp; if (!p || Math.hypot(e.clientX - p.x, e.clientY - p.y) > 20) { S.mp = { x: e.clientX, y: e.clientY }; if (p) noteIn(); } });
      api.on(R.pad, 'pointerdown', (e) => { if (e.button > 0 || !padOk()) return; noteIn(); try { R.pad.setPointerCapture(e.pointerId); } catch (_) { /* synthetic pointer */ } const p = padPos(e); beginStroke(p[0], p[1], 'ptr'); });
      api.on(R.pad, 'pointermove', (e) => { if (!padOk()) return; const p = padPos(e); movePen(p[0], p[1], 'ptr'); });
      ['pointerup', 'pointercancel', 'lostpointercapture', 'blur'].forEach((n) => api.on(R.pad, n, () => endStroke()));
      api.on(R.pad, 'keydown', padKey);
      api.on(R.inp, 'keydown', (e) => { if (e.key === 'Enter') { e.preventDefault(); enterGo(); } });
      api.on(R.frame, 'pointermove', (e) => { if (S.phase !== 'search' || !S.lamp) return; const r = R.frame.getBoundingClientRect(); S.lamp.tx = clamp(e.clientX - r.left, 0, r.width); S.lamp.ty = clamp(e.clientY - r.top, 0, r.height); });
      api.on(R.frame, 'pointerdown', (e) => { if (S.phase !== 'search' || !S.lamp) return; const r = R.frame.getBoundingClientRect(); S.lamp.tx = clamp(e.clientX - r.left, 0, r.width); S.lamp.ty = clamp(e.clientY - r.top, 0, r.height); });
      api.on(document, 'keydown', docKey); api.on(document, 'keyup', docKeyUp); api.on(window, 'resize', () => onResize());
      api.on(document, 'visibilitychange', () => { cancelRelease('cancel'); endStroke(); });

      api.setTitle('Lost Property, Window 7 1/2'); api.flag.set('lost-and-found.seen', true);
      rotateChips(); { const L0 = api.shuffle(SCEN.filter((x) => x.e !== '📅')).slice(0, 13); L0.unshift(SCEN[3]); L0.splice(2, 0, GHOST); setSlots(L0); } padDraw(); paintString(); renderTray(); renderTicket(); renderShelfList(); onResize(true); drawShelf(); refresh();
      api.setInterval(tick500, 500); api.setInterval(() => { if (S.mode !== 'report' || document.activeElement === R.inp) return; S.ph = ((S.ph || 0) + 1) % PLACEH.length; R.inp.placeholder = PLACEH[S.ph]; }, 5000);
      api.requestAnimationFrame(frame);
      /* the opening: first joke inside 10 seconds, zero input */
      if (V.loops > 0) say(LN.again[Math.min(V.loops - 1, 3)], 'Wendell', 'neutral', 1); else sayR('open', 'Management', null, 'neutral', 1);
      later(1000, () => { flipSign(true); sfx('tick'); sayR('open.sign', 'Management'); });
      later(3000, () => { if (!S.awake) wake(); });
      later(5600, () => { if (rd(() => !!api.flag.get('metGerald'), false)) sayR('open.gerald', 'Management'); });
      later(7000, () => { if (S.kept.length && V.loops === 0) sayR('welcomeBack', 'Management', { count: S.kept.length, COUNT: S.kept.length }); });
      return { destroy() { persist(); } };
    }
  });
})();
