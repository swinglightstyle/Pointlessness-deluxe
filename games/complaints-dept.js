/* POINTLESS module: complaints-dept */
(function () { 'use strict';
  const P = window.POINTLESS;
  /* ================= content banks (immutable) ================= */
  const A_OPEN = [ 'Please take a number. We have 0. Please take it anyway.', 'Welcome to the Department of Complaints. Your complaint is important to us in a way we cannot file.',
    'We have not read your complaint. We have, however, rejected it in advance, to save time.', 'Please hold the form level. The form has asked you to hold it level. It has been asking since 2009.', 'The Department of Complaints is open. It has been open since the previous opening.'
  ];
  const PLACEHOLDERS = ['Describe your grievance in the pluperfect.', 'Describe your grievance. Be specific. Not that specific.', 'I would like to complain about...', 'Begin typing. We will know.', 'State your grievance. State it again, in the correct tense.',
    'Tell us what happened. Then what should have happened. We will pick neither.', 'Grievance goes here. Please keep it under the weight limit.', 'Type with feeling. Not that feeling.', 'The Department is listening. The Department is also eating. Begin.'];
  const MARGINS = ['Margin note, Brenda: ink is optional. Blue is not.', 'Margin note, Brenda: please do not press so hard. It is a screen.', 'Margin note, Brenda: the form is also a feeling. Handle with care.', 'Margin note, Brenda: I will read at least 30 percent of this.',
    'Margin note, Brenda: if you are in a hurry, the form is not.', 'Margin note, Brenda: if you spill on it, it becomes evidence.', 'Margin note, Brenda: this form was a tree. Be worthy.', 'Margin note, Brenda: I have drawn a small arrow. It points at nothing. Please be inspired.',
    'Margin note, Brenda: the jam on this form is not related to your complaint. Probably.', 'Margin note, Brenda: Shift+Enter makes a new line. The Department neither endorses nor has seen lines.'];
  const CAPTIONS = ['Verifying the verifier...', 'Notarizing the notary. The notary asks who notarizes the pen...', 'Calibrating the stamp...', 'Consulting the Binder. The Binder is consulting back.', 'Warming the stamp pad to the temperature of a no...', 'Asking the ink for a second opinion...',
    'Moving the paper to the tray it was already in...', 'Reconciling the reconciliation. Off by 7 1/2. Within tolerance...'];
  const REEL = ['Category 4 (Retired), Subcategory Sigh', 'Category 11, Subcategory Mild Feeling', 'Category 9(c), Subcategory Sat On A Cat', 'Category 2, Subcategory Technically', 'Category 7 1/2, Subcategory Tuesday-Adjacent', 'Category 14, Subcategory Please See Category 14'];
  const COMM = [
    [ "Brenda is reading your complaint aloud. She is getting about 30 percent of it, and most of that percent is the word 'the'.", 'Brenda has picked up your complaint with the tongs she keeps for complaints. The tongs have seen things.',
      'Brenda reads with a finger under each word. The finger is not helping. The finger is committed.', 'Your complaint has been handed to Brenda. Brenda has handed it to her sandwich. The sandwich is reviewing.',
      'Brenda reads your complaint, nods at the part she understood, and nods at the rest to be safe.' ],
    [ 'Classifying. The reel has landed. It was not told what it landed on.', 'The reel has landed on a category. The category has been informed. It says it will think about it.',
      'A category has been selected. It is not the one you wanted. It is the one that was nearest.', 'Classification complete. The category is a number. The number is sitting down.' ],
    [ 'The stamp has been summoned. The stamp was not told what it is stamping.', 'The stamp has risen. The stamp has not yet decided. The stamp has never had to.',
      'The stamp is held over your complaint by a clerk who is looking elsewhere, for plausible deniability.', 'Stamping. The stamp would like it noted that it is only the stamp.' ],
    [ 'Printing your rejection. The printer is dot-matrix and emotionally unavailable.', 'Your rejection is printing. The printer has jammed twice on the word Rejected, out of what appears to be guilt.',
      'The rejection is printing one line at a time. Each line is checking on the last one.', 'Printing. Please do not stand behind the printer. It knows, and prints more slowly.' ]
  ];
  const RECEIPT = [
    ['Grievance No. %CASE received. Receiving is the easy part. Please do not get attached.', 'Grievance No. %CASE has been entered in the Log, which is a book, which is also a log.', 'Grievance No. %CASE received. It is a lovely number. It will not be going anywhere.'],
    ['Estimated resolution: never (provisional). The word provisional is carrying a great deal of weight here.', 'Estimated resolution: 11 business years, plus the reorganization.', 'Estimated resolution: a Thursday. The Thursday has not been identified.'],
    ['Tone Assessment: Aggrieved (Mild). You may be Aggrieved (Standard) on Thursday.', 'Tone Assessment: Aggrieved (Upper Mild). A supervisor will be along to lower it.', 'Tone Assessment: Aggrieved, but in a way the form can work with.']
  ];
  const ESC_LINES = ['Appeal granted. You now have the right to appeal. The right to win is sold separately.', 'The elevator is a rumor, so your complaint has been sent by hope.', "Your complaint has been escalated. It is now somebody else's feeling.",
    'Sending your complaint up. Gravity has been informed and has no objection.', 'Escalation costs nothing. This is also what it is worth.', 'Your complaint has been issued a lanyard and sent upstairs.',
    'Your complaint is going up the stairwell. It will pass itself on the way down.', 'Your complaint has been put in the pneumatic tube. The tube said it was a lot to ask. It asked it anyway.',
    'Forwarded to the person above the person above the person you just met.', 'Your complaint has been strapped to a clipboard and handed to Phil, who goes up on Tuesdays. Today is not one.'];
  const AFTER = ['You have been awarded %AMT Meh for your rejection. A rejection is a kind of attendance.', "Management has reviewed your complaint and has chosen the word 'noted' because it is the shortest way to say nothing.",
    'Your Case File has been updated. Your Case File would like to be left alone with its feelings.', 'That rejection took 4.2 seconds. The stamp has asked that the 0.2 be recognized.', '+%AMT Meh (rounded up to %AMT).',
    'Good news: the rejection is final. Better news: nothing is final. Please enjoy whichever arrives first.', "Rejections are filed under 'Experience'. We have a lot of Experience. Nobody can find it.", 'Please remember: a rejection is not a no. It is a no with paperwork.',
    'A rejection has been placed in your tray. The tray has been placed in a drawer. The drawer has been placed in a feeling.', 'Your rejection has been laminated. Lamination is how we say sorry without admitting to a form.',
    'Your rejection has been copied to nobody. Nobody has acknowledged receipt, which is how we know it arrived.', 'Your rejection is number 4 in the Top 3 Rejections this week. It can see the Top 3 from where it is.',
    'Management thanks the rejection for being so prompt. It arrived before the complaint had finished feeling things.', 'Do not take it personally. It is not from a person. It is from a department, which is nobody, in bulk.',
    'The Department regrets that this rejection is not also a prize. A request to make it one has been rejected, warmly.'];
  const WITHDRAW = ['Shredder alert: your complaint has been withdrawn with love. It went peacefully.', "Your complaint has been filed under 'Withdrawn With Love'. It had a lovely time.", 'Your complaint has gone through the trap door. The trap door says it was not a big deal. It was a medium deal.',
    'Your complaint has been withdrawn. It left a note. The note has been withdrawn.', 'Withdrawn. The complaint has gone to a better place. It is the shredder. It is a place.'];
  const SURVEY = ['Thank you. Your feedback of %N has been averaged with 7 1/2 stars from a previous respondent, who was a lamp.', 'Thank you. Your %N has been shared with the lamp. The lamp has no comment, but is glowing.', 'Thank you. Your %N has been entered in the Survey of Surveys, which has been out of stars since 1998.',
    'Thank you. %N stars received. The Department rates your rating 3.', 'Thank you. %N has been recorded in pencil. Pencil is for numbers that may change their minds.', 'Thank you. Your %N has been forwarded to the Department of Stars, which is closed for stars.',
    'Thank you. %N is a number. The Department has seen it. The Department did not blink.'];
  const REMEDY = ['Remedy: please resubmit this complaint before you submitted it.', 'Remedy: obtain Form 27B/7 (destroyed 1998) and attach it to Form 27B/6.', 'Remedy: have the problem occur to someone who is allowed to have it.', 'Remedy: return to Window 4 by way of Window 4.',
    'Remedy: stand 11 cm to the left of where you are standing. We will know.', 'Remedy: wait for the reorganization to finish. It has been scheduled for the reorganization.', 'Remedy: be a different complainant, ideally one with a stamp.',
    'Remedy: write the complaint again, in the order it happened to the other person.', 'Remedy: seek advice from the Department of Advice, which will refer you here.', 'Remedy: stop having the problem, in triplicate.',
    'Remedy: wait for a problem that comes with the correct form already attached.', 'Remedy: hold the complaint up to a window until it sets.', 'Remedy: please be in two places on Thursday, preferably adjacent.',
    'Remedy: complain to the person currently complaining about you. They are two windows down.'];
  const CTITLES = ['Statements of the Obvious', 'Adjectives, Excessive', 'Verbs, Unreasonable', 'Feelings, Unfiled', 'Punctuation, Hopeful', 'Grievances, Provisional', 'Capitals, Presumptuous', 'Nouns of Assembly', 'Opinions, Unaccompanied', 'Sighs, Written',
    'Emphasis, Unlicensed', 'Tone, Borrowed', 'Spelling, Aspirational'];
  const MILD = 'Rejected. Submitted in ink that is, per the stamp pad, insufficiently blue.';
  const G = [ 'Rejected. Filed 4 minutes before the Window opened. The Window has since opened, rendering your complaint stale and the Window embarrassed.', 'Rejected. You complained on a day that is not a complaint day. Complaint days are Tuesdays, which are not available.',
    'Rejected. Your complaint arrived 11 seconds after the deadline. The deadline was announced 11 seconds after it passed.', 'Rejected. The complaint is in the wrong typeface. We use Comic Procedure. You appear to have used Procedure Comic.',
    'Rejected. Filed in triplicate, but only the second copy was ever written. The first and third are pending.', 'Rejected. This matter falls under the Department of Matters, which has no jurisdiction over matters.',
    'Rejected. You appear to be making a complaint. That is the work of the Department of Complaints, which is where you are, so we must decline.', 'Rejected. No signature was found. A signature was found, but it was not yours. It was rather good.',
    'Rejected. Your signature is legible, which is a defect. Please resubmit with a signature nobody can read, including you.', MILD,
    'Rejected. The complaint is the wrong shade of cream. We accept Cream 4 and Cream 6. This is Cream 5, a cream nobody ordered.', 'Rejected. Your grievance is mostly red. Grievances must be filed in a color that is neither warm nor cool. We call it Department.',
    'Rejected. The complaint should have been filed by your cousin. We have a form for that. It is a form for your cousin.', 'Rejected. Your complaint is correct, which is not a valid ground for a complaint.',
    'Rejected. Category 4 was retired in 1994 after it became too accurate. Yours is Category 4.', 'Rejected. The complaint is so precise that it constitutes a finding. Findings are filed by Findings.',
    'Rejected. Your complaint has already been resolved. It was resolved by being filed. Please see: this.', 'Rejected. The problem you describe was fixed yesterday. We do not know by whom. We are told it was fixed with a sense of calm.',
    'Rejected. You describe an event that has not happened yet. The Department accepts grievances in the past tense, or Thursday.', 'Rejected. Your complaint is premature. Please experience the problem more fully and then return.',
    'Rejected. The subject of your complaint is classified. We cannot say what it is. We can say it is a good one.', 'Rejected. Parts of your complaint have been redacted. All of the parts. The redaction is rather elegant.',
    'Rejected. Your complaint requires the Department to be in two places. We are in one place, and it is a corridor.', 'Rejected. The remedy you imply requires a Tuesday that has never existed. We checked, in person, at some expense.',
    'Rejected. The paper your complaint is written on weighs 4 grams more than the paper it describes. Please send a lighter grievance.', 'Rejected. A complaint presupposes a complainant. We could not locate one. We located a person who was nearby.',
    'Rejected. If we accepted this, the Department would have nothing to reject, and then what would we be.', 'Rejected. Your complaint is the right size to be a feeling. Feelings are routed to Floor 7 1/2, which is not yet built.',
    'Rejected. Your complaint has been given Reference 7 1/2. We can file the 7. The 1/2 has been sent to find itself.', 'Rejected. Your complaint is in a font we could not see. That is the font\'s fault, but the form is yours.',
    'Rejected. The complaint has been rejected pre-emptively, and this is the formal paperwork for that. Please keep it somewhere dry.',
    'Rejected. Your complaint contains a verb. Verbs are filed under Action, which this Department does not take.', 'Rejected. The complaint was received by the wrong ear. We have a left ear and a right ear and they have not spoken since the move.',
    'Rejected. Your complaint is accurate to within 3 percent, which is more accuracy than the Department can safely hold.', 'Rejected. Your complaint has the right words in the wrong mood. The mood has been returned to you in an envelope.',
    'Rejected. The staple holding your complaint together is the wrong staple. It is a staple that is thinking about being a paper clip.', 'Rejected. Submitted during a fire drill that has not yet been scheduled. Please resubmit during the next one.',
    'Rejected. You have complained about something that is, technically, a Wednesday. Wednesdays are handled by the Department of Halfway.', 'Rejected. We have received 40 complaints identical to yours. They have all been rejected, together, in a very small room.',
    'Rejected. A clerk read your complaint aloud in the break room. Nobody reacted. The kettle was seen to leave.', 'Rejected. Complaint must be signed by a witness. The witnesses are on leave. The leave is witnessed.',
    'Rejected. The Department has matched your complaint to a previous complaint. The previous complaint was also you, and also from the future.'
  ];
  const BANKS = {
    caps: ['Rejected. Your capitals exceed the permitted 6 decibels per paragraph. Please lower your case.', 'Rejected. The Department has a quiet policy and a loud policy, and today is the quiet one.', 'Rejected. Your complaint arrived shouting. Shouting complaints are heard in the Quiet Room, which is quiet because it is closed.',
      'Rejected. Capital letters are reserved for proper nouns and for Gerald. You are neither, but we admire the effort.'],
    lower: ['Rejected. Entirely lowercase. The Department classifies this as a whisper. Whispers will be heard at a later date, to be decided by whisper.', 'Rejected. Not one capital letter. Complaints must begin with authority, and also several other places.',
      'Rejected. Not one capital was found. A clerk was sent to look again. He sends his regrets and a lowercase g.', 'Rejected. Lowercase throughout. A complaint with no capitals has nothing to stand on and has been asked to sit.'],
    bang: ['Rejected. Exclamation mark detected. Exclamation marks must be filed separately, in triplicate, by the exclamation.', 'Rejected. Our quota for exclamation marks is zero. Sandra has been counting. Sandra counts with her whole heart.', 'Rejected. Your exclamation mark has been deducted from your Sentiments. It was not enough to cover the exclamation mark.',
      'Rejected. The exclamation mark at the end was standing very straight, as if waiting to be congratulated. It has been asked to relax.'],
    question: ['Rejected. Complaints may not be asked as questions. Your question mark has been left unanswered. Please answer it yourself and resubmit.', 'Rejected. A question is an Inquiry. Inquiries are handled by the Department of Answers, which has none.', 'Rejected. We do not answer questions. We have answered this one by rejecting it, which is a sort of answer.',
      'Rejected. Your question has been sent to a clerk who has answered it with a different question. Please answer that one first.'],
    interrobang: ['Rejected. The interrobang is licensed to exactly one person, and she is on leave until further punctuation.', 'Rejected. A question mark and an exclamation mark were found together. They have been separated for their own safety.'],
    please: ['Rejected. You said please. Please is a request, not a complaint. Requests are handled by the Department of Requests, which has been closed since lunch.', 'Rejected. Politeness detected. This is a complaint, not a favor. Please complain more rudely, within the guidelines for rudeness (see Annex R).',
      'Rejected. The Department thanks you for your please. It has been framed and hung in the Hall of Pleases, which is a hook.'],
    digits: ['Rejected. Your complaint contains the number %NUM. Numbers above 7 1/2 require a signature from a number.', "Rejected. Digits are reserved for Accounts. We have replaced yours with the words 'a number of'.", 'Rejected. A number appears in your complaint. All numbers must be declared at the border. The border is a mat.'],
    bignum: ['Rejected. %NUM is a large number. Large numbers must be accompanied by a smaller number, as a chaperone.', 'Rejected. %NUM is more than the Department can count in one sitting. The Department has asked to stand.'],
    tiny: ['Rejected. Complaint too short. Please resubmit with at least 4 characters, none of which may be the number 4.', 'Rejected. We have received a complaint the size of a crumb. Please resubmit the rest of the loaf.'],
    short: ['Rejected. A single word. Single words must be accompanied by a second word as a chaperone.', 'Rejected. The complaint is too short to be a complaint and too long to be a sigh.', 'Rejected. One word. The Department needs at least two, so that one of them can disagree.'],
    long: ['Rejected. Over 200 characters. Also under the minimum of 201. We regret the inconvenience of this arithmetic.', 'Rejected. Your complaint is too long. Please resubmit with fewer words, in the order you originally intended, at 11:47 on a day of your choosing.'],
    empty: ['Rejected. Your complaint is about nothing. Nothing is the jurisdiction of the Department of Nothing, on Floor 7 1/2. They are expecting you.', 'Rejected. We have read your complaint in full. It was a very restful read. Rejected on grounds of restfulness.',
      'Rejected. An empty complaint has been filed. The Department has filed an empty rejection in reply. Both are on file. Neither is a mistake.', 'Rejected. The void has been consulted. The void declined to comment and asked to be put on file.', 'Rejected. Nothing detected. Nothing is permitted in the building only by appointment, and nothing has none.'],
    repeat: ['Rejected. This is the same complaint as before. Complaints may not be recycled; they may only be reincarnated, and this one has not died yet.', 'Rejected. This complaint has already been rejected. It was very good at it.', 'Rejected. Resubmission requires Form 3/Resubmission, which was rejected as a duplicate.'],
    echo: ['Rejected. You have pasted our rejection back at us. This is allowed. It is also rejected.', 'Rejected. We recognize this text. It is ours. We would like it back, and then we would like to reject it again.'],
    emoji: ['Rejected. The complaint contains an emoji. Emoji may only be filed in the Department of Faces.', "Rejected. A small picture was found in your complaint. It has been returned to the picture's family.", 'Rejected. The small picture in your complaint has been identified as a face. The face has been asked to wait outside.'],
    fast: ['Rejected. Typed too quickly. The complaint must be given time to feel things.', 'Rejected. Typed in under 2 seconds. The Department does not accept anything that arrives with that much confidence.', 'Rejected. Your complaint was typed so quickly that the letters have not been introduced to each other.'],
    slow: ['Rejected. Typed too slowly. By the time you finished, the problem had retired.', 'Rejected. The complaint took 90 seconds to type. In that time it became a memoir. Memoirs go to Floor 11.'],
    mgmt: ['Rejected. The complaint mentions Management. Management is not a valid subject of complaint and is, in any case, listening.', 'Rejected. You have named Management. Management has been informed and would like to speak to you about being named.'],
    rock: ['Rejected. Complaint mentions a rock. Rocks are covered by an entirely different, higher building.', 'Rejected. The Department cannot hear complaints about rocks. We are told the rock has heard worse.'],
    complaintWord: ["Rejected. You have used the word 'complaint' in a complaint. This is a recursive grievance and must be filed with itself.", "Rejected. The word 'complaint' is on the Approved Words list as a compliment."],
    obvious: ['Rejected. Your use of the phrase %QQ falls under Clause 14(c)(ii)(a), Statements of the Obvious.', 'Rejected. The word %QQ was last used in this building in 1987. It got everybody\'s hopes up.', 'Rejected. The word %QQ is a conclusion. This Department accepts only premises. Please bring us a premise and we will take it from there.'],
    name: ['Rejected. The complaint names %NAME. %NAME has been notified and has declined to be a party. %NAME sends polite and legally meaningless regards.', 'Rejected. Complaints naming %NAME must be accompanied by a character reference from %NAME. %NAME says it is a lot to ask.'],
    food: ['Rejected. You have mentioned %FOOD. Brenda has noted this. Brenda would like to be left with the %FOOD.', 'Rejected. Complaints about food may be made only on an empty stomach, and we have checked yours.',
      'Rejected. Complaints about %FOOD are on hold while %FOOD is under review. It has been under review for 11 months.'],
    broken: ["Rejected. The item you describe as broken has been reclassified as 'differently assembled'. No remedy exists for items that are differently assembled.", 'Rejected. You report something broken. The Department regards this as the thing becoming more honest.'],
    wait: ['Rejected. You complain of a wait of unspecified length. We can only process waits of known length. Please wait and measure.', 'Rejected. Your wait has been measured. It was exactly as long as it felt, which is outside tolerance.'],
    late: ['Rejected. You describe something as late. It was on time for a different time. We have asked it which.', 'Rejected. Late for what? Lateness cannot be processed without something to be late for. Please supply an on-time version for comparison.'],
    cold: ['Rejected. Complaints about cold must be filed at 18 degrees or below. It is currently 21. You are too warm to be cold.', 'Rejected. Cold is not a complaint. It is a temperature with a grudge. Please file it at 21 degrees.'],
    rude: ["Rejected. The clerk you describe as rude has been verified as 'efficiently warm'. Rudeness is measured in clerk-degrees. This clerk scored 4.", 'Rejected. Rudeness requires a witness. The only witness available was Dennis, a plant, who declines to be rude about it.'],
    hate: ["Rejected. 'Hate' is a strong word and the Department only has a weak form for it. Form 12/Weak is at Window 2, which is out of 12/Weak.", 'Rejected. Hate is on the Banned Feelings List, beside mild enthusiasm and fondness for Thursdays. Please try Strong Disappointment, which is allowed.'],
    noise: ['Rejected. The noise you describe has been investigated. It was found to be the sound of an investigation.', 'Rejected. Noise complaints must be submitted quietly. Yours was loud, in places.'],
    weather: ['Rejected. The Department has no authority over weather. The weather has no authority over the Department. The two have an understanding.', 'Rejected. The weather has been written to. It has replied with weather.'],
    meeting: ['Rejected. Your complaint about a meeting has been scheduled as a meeting. Please bring the complaint.', 'Rejected. A meeting has been called to discuss your complaint about the meeting. It overlaps with the meeting. Please attend both, at once.'],
    iStart: ["Rejected. You began with 'I'. Grievances must be filed by a committee of at least 3. You are a committee of 1. Please borrow 2 people and a quorum.", 'Rejected. You began with I. The Department has a We policy. If you find 3 others who also began with I, you may file as a We.'],
    haiku: ['Rejected. Your haiku is correct in syllables and incorrect in feeling. The Department accepts only grievances that scan.', 'Rejected. Three lines detected. This is a poem, and poems go to the Poetry Board, which meets on the second Friday of a month that was decommissioned.'],
    repeatLetters: ["Rejected. Your complaint contains a letter repeated more than the letter's contract allows. Please contact the letter.", 'Rejected. A letter appears three times in a row, like a rumor. Rumors go to Rumors, Room 12.'],
    ecount: ["Rejected. Each complainant is issued 11 letter e. You have used %ECOUNT. Please return the difference, unused if possible."],
    toast: ['Rejected. Your complaint mentions toast. The Toaster has been consulted and is not available for comment. The Toaster is toast.', 'Rejected. Toast was mentioned. The Toaster has asked us to say only: warm. We have said it. It is in the file.'],
    sock: ['Rejected. Your complaint contains a sock. We are legally unable to comment on the sock, though we hope it is somewhere nice.', 'Rejected. Your complaint contains a sock. The sock has been spotted on a bus. It does not want to talk about it.'],
    plant: ['Rejected. The Department cannot accept complaints about plants. Dennis has asked that we stress this is not about Dennis.', 'Rejected. A plant has been mentioned. Dennis has asked to be left out of it. He has not asked anything. He has been left out of it anyway.'],
    stapler: ['Rejected. You are complaining about the stapler. The stapler is a union representative and has asked that you address your complaint to its jaw.', 'Rejected. The stapler has been named. The Union asks that you stop naming its members and start naming their rates.'],
    gerald: ['Rejected. Gerald is a Vice President and cannot be complained about. He can, however, be complained near.', 'Rejected. Gerald has been mentioned. He said nothing. He said it very deeply.'],
    tuesday: ['Rejected. Your complaint about Tuesday has been redirected to Tuesday. Tuesday has not replied. Tuesday never does.', 'Rejected. Tuesday has been named. It has been added to the list of things that would rather be a Wednesday.'],
    brenda: ['Rejected. You have named Brenda. Brenda has asked that you complain to the sandwich instead. It has fewer feelings.', 'Rejected. Brenda has been named. She is eating and cannot reply, which is also the reply.'],
    refund: ["Rejected. You wrote 'refund'. The Refund Desk is on the third floor, which is the second floor, which is closed.", 'Rejected. A refund of 0 Meh has been issued. It has been rejected for being a refund of nothing. A refund of something was never in the building.'],
    manager: ['Rejected. You have requested a manager. Our managers are all in a meeting about requests for managers. It has been 11 years. It is going well.', 'Rejected. We have contacted a manager. A manager has contacted us. We have agreed to contact each other.']
  };
  const META = [ 'Rejected. You have complained about the Department. This has been filed under Departments, Complaints about, Resolved (by being filed).',
    'Rejected. You have complained about complaining about the Department. This has been filed under Complaints about Complaints.', 'Rejected. A complaint about a complaint about a complaint. The folder is now a tree. The tree is not a plant. Dennis has been informed.',
    'Rejected. The folder labeled Complaints about Complaints about Complaints about Complaints has itself been the subject of a complaint.', 'Rejected. The nesting depth has exceeded the nesting depth. The folders have been moved to a larger folder, which is also a folder.',
    'Rejected. At this depth the label wraps. It now reads: Ground Floor (the floor above the floor above).', 'Rejected. At depth 7 the form has taken out a loan from the future to make room. The future has asked for the form back.'
  ];
  const ALWAYS = { prime: 'Rejected. Your complaint has %WORDS words. Section 9(c) accepts only a prime number of words. %WORDS is prime. Section 9(d) rejects unregistered primes.',
    even: 'Rejected. Your complaint has %WORDS words, which is even. We process odd-numbered grievances only. Please remove one word, ideally the one you like best.',
    odd: 'Rejected. Your complaint has %WORDS words, which is odd. We process even grievances only. Resubmit with one extra word. We will not tell you which.',
    first: "Rejected. Your complaint begins with the letter '%FIRST'. Today we accept any letter except '%FIRST'. Yesterday it was the reverse.",
    stop: 'Rejected. Full stop detected. A full stop implies finality. The Department cannot accept anything final until after the reorganization.', nostop: 'Rejected. No full stop. A complaint without a full stop is a rumor, and rumors go to Rumors, Room 12.',
    clock: 'Rejected. Filed at %TIME. Complaints are accepted between 9:00 and 9:00. This includes a lunch of twenty-four hours.', longest: "Rejected. The word '%LONGEST' is not on the approved vocabulary list. The list has one word on it. It is 'noted'.",
    chars: 'Rejected. %CHARS characters, including spaces. Spaces are classified as Not Complaint and must be filed separately, at Window 3, which is also a drawing.'
  };
  const SANDRA_REASON = 'Sandra has read this. Sandra will not be commenting. Sandra has commented.';
  const FINAL_REASON = 'Collecting reasons is not a valid grievance.';
  const RARE_REASON = 'Rejected. This reason has never been used before and will be unusable by tomorrow.';
  const COMBINED = 'Rejected, collectively, with feeling.';
  const APOLOGY_SLIP = 'Sorry about the stamp. It has had a day. -B';
  const REASON_ALL = (function () { const seen = new Set();
    const add = function (s) { seen.add(s); };
    G.forEach(add); META.forEach(add);
    Object.keys(BANKS).forEach(function (kk) { BANKS[kk].forEach(add); });
    Object.keys(ALWAYS).forEach(function (kk) { add(ALWAYS[kk]); });
    add(SANDRA_REASON); add(FINAL_REASON); add(RARE_REASON);
    return Array.from(seen);
  })();
  const RIDX = new Map(REASON_ALL.map(function (s, i) { return [s, i]; }));
  const ORDER = ['echo', 'repeat', 'meta', 'empty', 'mgmt', 'rock', 'toast', 'sock', 'gerald', 'plant', 'stapler', 'tuesday', 'brenda', 'refund', 'manager', 'interrobang', 'caps', 'bang', 'question', 'please', 'digits', 'emoji', 'tiny', 'short', 'long', 'fast', 'slow', 'obvious', 'name', 'food', 'broken', 'wait', 'late', 'cold', 'rude', 'hate', 'noise', 'weather', 'meeting', 'iStart', 'haiku', 'repeatLetters', 'ecount', 'complaintWord', 'lower'];
  const KW = { mgmt: /management/, rock: /\brock\b/, toast: /toast/, sock: /\bsock/, gerald: /gerald|potato|spud/, plant: /\bplant|dennis/, stapler: /stapler|staple/,
    tuesday: /tuesday/, brenda: /brenda/, refund: /refund/, manager: /manager/, please: /\bplease\b/, broken: /broken|broke/, wait: /wait|slow|queue/,
    late: /\blate\b/, cold: /\bcold\b/, rude: /rude/, hate: /hate/, noise: /noise|loud/, weather: /weather|rain/, meeting: /meeting/, complaintWord: /complaint/,
    meta: /department|reject|stamp|ladder|this game/, sandra: /sandra/, food: /\b(toast|bread|cheese|pizza|soup|pasta|sandwich|coffee|tea|cake|egg|eggs|rice|pie|salad|lunch|dinner|breakfast)\b/, obvious: /ridiculous|unacceptable|terrible|awful|worst|outrageous|disgraceful/
  };
  const RM = { brenda: { n: 'Intake Clerk Brenda, Window 4', g: 'Brenda, Window 4:', e: '👩‍💼' }, desmond: { n: 'Senior Intake Clerk Desmond', g: 'Senior Intake Clerk Desmond:', e: '👨‍💼' },
    queue: { n: 'Supervising Senior Intake Clerk', g: 'Supervising Senior Intake Clerk:', e: '🎟️' }, contrition: { n: 'Assistant to the Regional Assistant', g: 'Assistant to the Regional Assistant:', e: '⌨️' },
    intern: { n: "Gerald's Nephew (Intern)", g: "Gerald's Nephew (Intern):", e: '🧑' }, committee: { n: 'The Committee of One', g: 'The Committee of One:', e: '⚖️' },
    gerald: { n: 'Gerald, Vice President of Spuds', g: 'Gerald, VP of Spuds:', e: '🥔' }, half: { n: "The Complaints Department's Own Complaints Department", g: 'Rung 7 1/2:', e: '📁' },
    mirror: { n: 'A Mirror Facing a Mirror', g: 'The Mirror:', e: '🖼️' }, vane: { n: 'The Complaints Appeals Weather Vane', g: 'The Weather Vane:', e: '🌬️' },
    stapler: { n: "The Stapler's Union Rep", g: "The Stapler's Union Rep:", e: '📌' }, hat: { n: 'The Ombudsman Who Is Also a Hat', g: 'The Hat:', e: '🎩' },
    tuesday: { n: "Tuesday's Assistant", g: "Tuesday's Assistant:", e: '📅' }, bigrock: { n: 'A Bigger Rock', g: 'The Bigger Rock:', e: '🌑' },
    cloudrock: { n: 'A Rock That Is Technically A Cloud', g: 'The Cloud (Technically A Rock):', e: '☁️' }, rock: { n: 'THE ROCK', g: 'The Rock:', e: '🌑' }
  };
  const BASE_LADDER = ['brenda', 'desmond', 'queue', 'contrition', 'intern', 'committee', 'gerald', 'mirror', 'vane', 'stapler', 'hat', 'tuesday', 'rock'];
  const SANDWICHES = [ "Brenda's sandwich is ham. She would like the Department to know the ham has been in the fridge since Q2. She is not scared. She is committed.",
    "Brenda's sandwich is egg salad. The egg salad has opinions. Brenda has asked it to keep them to itself.", "Brenda's sandwich is cheese. It has a history. She has not read the history. She respects it.",
    "Brenda's sandwich is a wrap. She insists it is a sandwich. Nobody has asked.", "Brenda's sandwich is two slices of bread being supportive.", "Brenda's sandwich is tuna, with ambitions.",
    "Brenda's sandwich is jam, and only jam, with dignity.", "Brenda's sandwich is a sandwich she cannot identify. She is eating it anyway. It is going well."
  ];
  const BELL = ["Brenda: 'The bell is for emergencies. This is not an emergency. This is, however, a bell.'", "Brenda: 'Window 4. Please take a number.' You have no number. 'Then take this one. It is 7 1/2. Nobody wanted it.'", "Brenda: 'Ding. I heard it. I hear everything. I act on some of it.'", "Brenda: 'If you ring it again I will have to file the bell.'"];
  const BELL_MORE = ["Brenda: 'That is the fifth ding. I have filed them under Dings. It is a small file but a proud one.'", "Brenda: 'You are ringing a bell at a woman eating a sandwich. I want you to hear how that sounds.'",
    "Brenda has stopped looking up. She is answering from memory. Her memory says: ding.", "Brenda: 'Every time you ring that, a stamp somewhere stops and wonders.'", "Brenda: 'I am ringing it back. Hear that? That is a ding in your direction.'",
    'The bell would like it known that it has never been in charge of any of this.', 'Brenda has put a tiny hat on the bell. It does not help. The hat has also been rung.', "Brenda: 'I have a bell at home. It is at peace. I want that for this one.'",
    "Brenda: 'In 11 years nobody has rung it this much. I would like to thank you and ask you to stop, in that order.'", "Brenda: 'The bell has asked for a day off. I said every day is a day off. It said that is the problem.'"];
  const BELL_BURST = "Brenda has taken the bell. She has put it in the drawer with the other bell. She never said there were two bells.";
  const KNOCK = ['Window 4 is a drawing. Please do not knock on a drawing. It is rude, and also it has no door.', 'Please stop knocking. The drawing is trying to concentrate on being a window.', "Brenda: 'Come in.' There is no door. She has said it anyway, out of habit.",
    'The knocking has been logged under Percussion, Unsolicited.', 'Brenda has started knocking back. It is on the inside of the drawing and sounds very far away.', 'Brenda is looking for a pencil. She has a pencil. She is looking for the other pencil.',
    'Seven knocks. The window has noted the number. It is a good number. It is not 7 1/2.', "Brenda: 'It is a drawing of a window. With me in it. It is not a door, and I live here.'", 'A tiny hand has appeared at the edge of the window and drawn a tiny doorknob. It is round. It is not attached to anything.',
    'The doorknob has been drawn again, more firmly. It has a small sense of purpose and a very small shadow.', 'Brenda has drawn the outline of a door. It is a door-shaped nothing. She is using the good pencil.'];
  const KNOCK_DOOR = 'Window 4 has been given a door. The door is also drawn. Brenda has gone through it and come back out the same side. She says it was lovely.';
  const KNOCK_AFTER = ["Brenda: 'It is a door now. Knock if you like. I will say come in and you will not.'", "Brenda: 'The door goes to the same place as the window. It is a very efficient building.'", 'The door has been knocked on. It has said come in. It is a drawing. It is not clear who said it.'];
  const FLOORCLK = ['You may not skip ahead. You may, however, look ahead.', 'That floor is dark. It has been dark since the lights were invented.', 'You have pressed a floor. The floor felt it. The floor is not ready.', 'Floors may not be pressed from this side. They may be pressed from the other side, which you are on.'];
  const FASTSAY = ['That was very fast. The complaint did not have time to be written. It has been rejected for being unwritten.', 'You typed that in under a second. The keyboard has asked for a union.',
    'Typing speed noted: 11 words per second. The words have not had time to mean anything. Rejected for being unripe.'];
  const WAITING = ['Your rejection has been waiting. It has begun to feel unwanted. Please escalate it, or at least say something kind.', 'Your rejection is going cold. We have a lamp for that. The lamp is also cold.',
    'Please take your rejection with you. Rejections left overnight are adopted.', 'The slip is looking at you. It is paper. It is doing its best.', 'Your rejection has been in the tray 30 seconds. Per policy, at 40 it becomes a keepsake.'];
  const MURMUR = ["Overheard at Window 4: 'It is not a no. It is a not yet, extended indefinitely.'", 'Reminder: the Department has an open-window policy. The window is a drawing. The policy is a drawing of a policy.',
    'The Department is proud to announce that it is proud. The announcement has been rejected as too proud.', 'Please remember to take your complaint with you when you leave. It will want to go. It has not said so.',
    'A staff member was seen reading a complaint. The staff member has been spoken to, gently, by the complaint.', 'Tip of the day: the correct ink is blue. We do not stock blue. Please bring your own, and do not be seen with it.',
    'The Department thanks you for your patience. Patience is not currently being collected, but it is noted.', 'Facilities reports that the building has gained 1 cm overnight. Nobody has accepted responsibility. The building has been thanked.',
    'Department memo: lanyards must now be worn around something. The something has not been approved.', 'A reminder that all complaints are equal, except those stapled together, which are a committee.',
    'Please note: the fire exit sign now reads YOU ARE DOING GREAT. The exit is unchanged and not marked.', 'Somewhere in the building a photocopier has just made 7 1/2 copies. It has been asked to explain. It has made another.',
    'The break room kettle has been rejected. It was a good kettle. It boiled, in breach of the Quiet Policy.', 'The clock in the corridor says 4:17. It has said 4:17 since the Tuesday before the last one. It remains confident.'];
  const TYPING = ["Brenda: 'I can hear you typing from here. It is a lovely sound. It is also a lot of sound.'", "Brenda: 'Take your time. Take more of it. The Department has plenty, and none of it is being used.'",
    "Brenda: 'If you are stuck, I recommend a smaller grievance. They are easier to reject. I keep a shelf for them.'", 'Brenda is trying not to read over your shoulder. She is reading over your shoulder very carefully, as if it were a form.',
    "Brenda: 'You do not have to finish it. Nobody ever has. The cabinets are full of almosts.'"];
  const ESC3 = ['Please be patient. The building is only so tall.', 'Escalation is being processed at the speed of stairs.', 'You have pressed Escalate three times. The complaint has noticed. It is getting dizzy.'];
  const AUTO = ['The supervisor has ruled by default.', 'The supervisor has fallen asleep on the stamp. This is a ruling.', 'No input received. The supervisor has treated your silence as a position, and has rejected the position.',
    'The supervisor waited 20 seconds, which is longer than the supervisor has ever waited for anything, and then ruled.', 'The supervisor has ruled by default. Default is a very reliable colleague.'];
  const SANDRA_FLAGS = ['Sandra has flagged this. Sandra has also unflagged this. Sandra has asked that we stop calling it a flag and start calling it a feeling.', 'Sandra has read the previous slip and has issued a correction. The correction is the previous slip.',
    'Sandra has asked that the Department stop mentioning Sandra. The request has been cited as Clause 3(b).'];
  const CLERK_ADD = ['A third Brenda has arrived. She has not been scheduled. She has been eating, scheduled or not.', "The fourth Brenda is standing behind the other three, mouthing the word 'Next'.", 'There are five Brendas. The Department has been advised this is a lot of Brenda and has chosen to take it as a compliment.'];
  const RUSH_AGAIN = ['Rush Hour has returned. It has brought a second Rush Hour, for support.', 'Volume again. The Department would like it noted that it was just getting comfortable with the quiet.', 'The siren has been switched on. It was never switched off. It was just waiting for you.'];
  const DECOY = { dodge: ['The button has moved. It was not told you were coming.', 'The button is not unavailable. It is merely elsewhere, and has left no forwarding button.', 'The button has relocated 3 cm to be closer to its work.', 'You have missed the button. The button apologizes. It did not move. You moved. The button is calm about it.', 'The button is practicing for a different job.', 'The button has gone to find a pen. It will not need the pen.'],
    tired: 'The button has stopped dodging. It would like you to know that is not the same as accepting.', hide: 'The button is behind the slip. It says it is doing its job from there.',
    hat: 'The button is wearing a tiny hat. This is not relevant to anything. It is, however, very tiny.', sleep: 'The button is asleep. Please do not wake it. It has not accepted anything all day.',
    brk: 'ACCEPT REJECTION is on its break. It is on the break that comes after the break.', rock: 'The button is a rock now. It declines to be pressed. It declines it flatly.', trap: 'Accept? ACCEPT? I have never accepted anything. I thought this was a stress test.'
  };
  const SOCKS = [ "Postcard: 'Wish you were here. I am not where you think I am. The weather is Tuesday-ish.'",
    'Lost Complaints bin: one sock. Label: Property of Nobody (Presumed On A Journey). The clerk has rejected the sock\'s claim to be a complaint. The sock continues its journey.'
  ];
  const IDLE_LINES = { I1: 'Brenda has rejected the weather. The weather has not been informed.', I2: 'Brenda has rejected the ceiling. The ceiling accepted this, in the way ceilings do.',
    I3: 'Brenda has rejected her own sandwich. It was ham. It took it better than the ceiling.', I4: 'Brenda reached for the stamp, thought better of it, and stamped the air. The air is now REJECTED (PRE-EMPTIVE).',
    I5: 'Brenda has filed a complaint in your name about being left waiting. She has rejected it herself for lacking a complainant. You have been copied in.',
    I5b: 'To whom it may concern: I have been at Window 4 since the previous Window 4. Nobody has complained about anything I could fix.', I6: 'Brenda has slid something under the glass. It is not a complaint. It is a draft. It is addressed to you.',
    I6b: 'ACCEPTED (UNOFFICIALLY). Brenda has been rejected by you, very kindly, and has accepted it. This is the kindest thing anyone has ever done at Window 4.',
    I7: "A note has been slid under the glass: 'Thank you for not complaining. Nobody ever doesn't.'", I8: 'Memo to all staff: do not look at the Rock.', I9: 'The note has been stamped WITHDRAWN, retroactively. It was sincere. This has been noted.',
    I10: 'Brenda has gone to lunch. The sign says BACK AFTER LUNCH. Lunch is not a time. She has left a chair, which is nearly as good.',
    I11: 'The sandwich has been left in charge of Window 4. Nobody has noticed. It is doing about as well as anyone has.'
  };
  const MGMT_IDLE = ['Management has noticed the pause. Management would like to remind you that pauses are also processed.', 'Please be advised: the complaint is not going to type itself. It has asked. It does not have hands.',
    'Silence detected. The Department has filed it under Complaints, Quiet, and rejected it.', 'No input received. The Department has noted this, and the noting. Both are noted.'];
  const SPAM = { s1: 'Alert. Volume detected. The Department has been informed that it is a department.', s1b: 'Rush Hour Surcharge: -0.5 Meh. Per policy. The policy was written just now, by the rush.',
    s1c: 'Brenda has wheeled in a second Brenda. The second Brenda is identical and also eating.', s1d: 'The now-serving board has been on 3 since the morning of the reorganization.',
    s2: 'Emergency Stamp Cooling Protocol. The stamp is warm. The stamp has been stamping since 6 AM and is considering its options.', s2b: 'Brenda has gently placed a bag of frozen peas on the stamp. The peas are not a permanent solution. They are, however, peas.',
    s3: 'A man on an office chair has rolled in from the left. He looks at you for 4 seconds. He files a Form. He rolls out.', s3b: 'Please stop. The stamp is a mechanical arm. It has no opinion, but it is leaning.',
    s3c: 'Rate limit exceeded. A Rejection Fee of 1 paper clip has been deducted from nothing. The paper clip is grateful to have been mentioned.', shred: 'Sigh. [Sigh acknowledged.]'
  };
  const WARM_AGAIN = ['The stamp is warm again. It has asked for a cold compress, a window, and a word with whoever keeps doing this.', 'Cooling Protocol, second edition. The peas have been recalled. They are the same peas. They are less hopeful.',
    'The stamp has submitted a complaint about you. Brenda has rejected it. Everyone involved is fine.'];
  const SEC_AGAIN = ['The man on the office chair has returned. He nods like an old colleague. He files nothing this time. He rolls past slowly, to make a point.', 'The man on the office chair is back. He has brought a second chair for balance. It has nobody on it. It is on a different job.'];
  const COMMITTEE_OBJ = [ ['🌿', 'The plant has been invited. The plant recuses itself. The plant is, however, thriving.'], ['🕰️', 'The clock has been invited. The clock recuses itself at 4:17, which it states is correct.'],
    ['👻', 'The ghost has been invited. The ghost recuses itself and passes through the motion.'], ['📊', 'The spreadsheet has been invited. The spreadsheet recuses itself and sends a second spreadsheet.'],
    ['🧦', 'The sock has been invited. The sock recuses itself. It has not been seen since, and is presumed on a journey.'], ['🍞', 'The slice of bread has been invited. It recuses itself warmly.'],
    ['☂️', 'The umbrella has been invited. It recuses itself, and then, out of principle, opens.'], ['📎', 'The paper clip has been invited. It is holding things together and cannot attend.'], ['🪑', 'The chair has been invited. It is a chair. It has declined to sit in itself.']
  ];
  const MIRROR = ['Rejected by me, who is also you.', 'Rejected by me, who is also you, who is also the reason.', 'Rejected by the reflection of the reflection of the rejection.', 'The Mirror has been recursive since 1998. It is considered a manager.', 'The Mirror considers your complaint. The Mirror considers the Mirror considering your complaint.', 'At this depth the complaint is the size of a thought and has the same legal standing.', 'Almost there. There is no there. There is almost.', 'Hm.'];
  const CLOCKS = ['N', 'NE', 'E', 'Pending'];
  const VANE_LINES = { N: 'The vane points North. North is rejected. North has been informed.', NE: 'The vane points North-East. The Department rejects North-East on behalf of both of its halves.',
    E: 'The vane points East. East is where the Department was before it moved.', Pending: 'The vane reads Pending. The ruling is pending. It is also pending a ruling on pending.',
    Moist: 'The Weather Vane has ruled: Moist. This is a Deferral to a Future Climate. It is not a rejection. It is a damp maybe.'
  };
  const TUE_RULES = ['Rejected. %ANSWER is a day.', 'Rejected. %ANSWER is not a day, which is also a defect. It would be a day if it tried.', "Tuesday's Assistant cannot say the day. Tuesday's Assistant has written it on a Post-it and then eaten the Post-it.", 'Rejected. %ANSWER is a nice try at a day. It has been stamped Day (Attempted).'];
  const ROCK_CLICKS = ["Brenda: 'I do not see a rock.'", 'Brenda has not acknowledged the rock. The rock has not acknowledged Brenda. It is mutual.', 'The rock is on the counter. The counter is on the floor. The floor has not been consulted.', "Brenda: 'It has always been there. It has not.'", 'The clerk has declined to acknowledge a rock. The clerk has been told it is a stress test.', 'Brenda is looking at the ceiling with great concentration.',
    "Brenda: 'If a rock were on the counter I would have to report it. So there is not one. I am relieved.'", 'The rock has been moved 2 cm to the left by someone who will not say who. It looks more settled.'];
  const FUN_LINES = ['Fun detected. Please continue to have it.', 'That was 1 Fun. The target is 3 Fun by 3:00.', 'Fun achieved. Brenda has been asked to smile. She has done it with her mouth, which is the standard.'];
  const PHONE_LINES = ['Caller: "Hello, I am calling to complain about your complaint. It is very good. I cannot accept it."', 'Caller (a stapler, low voice): "This is not about the 3 breaks. It is about the 4th."',
    'Caller: "I have a complaint about whoever is on this line. Oh. It is you. I will call back."', 'Caller: "Please hold. Your hold is important. It has been placed on hold."', 'Caller: "I am calling from a drawer. I found your complaint in a hat. Please come and be rejected."'];
  const CB = [ ['metToaster', "A memo from the Toaster was found in the tray. It reads 'Warm.' It has been filed under Complaints (Positive)."], ['pet-rock.met', 'A rock registered under your name has been asked about at Window 4. It has not replied. Brenda says that is how you can tell.'],
    ['metDennis', 'Dennis (Plant) has asked that his file be kept open. It is very thin. It has one leaf in it.'], ['plantClicked', 'The lobby plant has reported being poked. It is not complaining. It is filing the report in a way that is thriving.'],
    ['the-button.ceremony', 'The Department has a record that you pressed The Button. It would like to know what it was for. The answer has been rejected in advance.'], ['staring-contest.met', 'Our records show you once blinked first, or second. It was filed under Eyes, Outcomes Of. The eyes have not appealed.'],
    ['elevator-simulator.arrived', 'You have arrived somewhere in an elevator. The Department has no record of the elevator. It has a record of the arrival and has rejected it politely.'], ['snail-marathon.crossed', 'A snail you know finished a marathon. The finish line has complained about the time. It is still being processed. It will be a while.'],
    ['cloud-gazer.certified', 'You are a Certified Cloud Examiner. The Cloud (Technically A Rock) has been told. It is not impressed. It is a cloud, or a rock.'], ['tiny-bureaucracy.tuesday', 'Word has come from a smaller bureaucracy. It has more forms per square foot. We are not threatened.'],
    ['metGerald', 'Gerald, VP of Spuds, has sent a note. It says only: You were taller.'], ['metStapler', "The Stapler's Union Rep has put you on its list of people who have not been stapled to anything. You are on page 1."],
    ['sockSeen', 'A sock was seen near Window 4. It declined to give a statement. It is presumed on a journey.'] ];
  const UNITS = ['degrees of Satisfaction', 'Satisfactions per Hour', 'Sats', 'Smiles', 'Gerald'];
  const UNITS_AFTER = ['Tuesdays', 'Brendas', 'Meh-adjacent units'];
  const RTAG = { desmond: 'Desmond has looked up. He has looked back down. Both are on his record.', queue: 'Please take a number. It is a fraction. The fraction has been told it is early.', contrition: 'Please be sorry quickly. The Assistant has been asked to be sorry slowly, and is conflicted.',
    intern: "Gerald's nephew has a lanyard that says INTERN. It also says NEPHEW. He is unsure which one is the job.", committee: 'The Committee has been called to order. The Committee had been out of order since 11:47.', mirror: 'The Mirror is ready. The Mirror was ready. The Mirror will have been ready.',
    vane: 'The Weather Vane is facing the wrong way on purpose. It is called leadership.', stapler: 'The Union Rep has put down its jaw. It has picked it up again. It is a negotiating style.', tuesday: "Tuesday's Assistant has left the room in order not to say the word. They are in the corridor, not saying it." };
  const PEOPLE = ['🧍', '👴', '👨‍🍳', '👩‍🎓', '👨‍🔧'];
  /* ================= pure helpers ================= */
  function fill(s, m) { return String(s).replace(/%([A-Z]+)/g, function (a, t) { return m && m[t] != null ? String(m[t]) : ''; }).replace(/ {2,}/g, ' ').replace(/\s+([.,;:])/g, '$1').trim();
  }
  function clean(s) { return String(s == null ? '' : s).replace(/[\t\r\n]+/g, ' ').replace(/[%{}\u0000-\u001f\u007f​-‏‪-‮]/g, '').replace(/ {2,}/g, ' ').trim(); }
  function isPrime(n) { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; } function cutWords(s, n) { if (s.length <= n) return s; s = s.slice(0, n); const sp = s.lastIndexOf(' '); return (sp > n / 2 ? s.slice(0, sp) : s).replace(/[\s,;:]+$/, ''); }
  function normT(s) { return String(s || '').toLowerCase().replace(/\s+/g, ' ').trim(); } function fmtHalf(x) { if (!isFinite(x)) return '7 1/2';
    if (x === 0) return '0';
    if (Math.abs(x - 7.5) < 0.05) return '7 1/2';
    return x.toFixed(1);
  }
  function sharedRun(a, b, n) { const A = a.split(/\s+/).filter(Boolean), B = ' ' + b.split(/\s+/).filter(Boolean).join(' ') + ' ';
    for (let i = 0; i + n <= A.length; i++) if (B.indexOf(' ' + A.slice(i, i + n).join(' ') + ' ') >= 0) return true;
    return false;
  }
  function clauseFor(n, who) { if (n <= 1) return 'Clause 14(c)';
    if (n === 2) return 'Clause 3, which requires complaints to be both filed and unfiled';
    if (n === 3) return 'Clause 14(c)(ii)';
    if (n <= 6) return 'Clause 14(c)(ii)(a)';
    if (n <= 9) return 'Clause 14(c)(ii)(a)(iv) bis';
    if (n === 10) return 'Clause 14(c)(ii)(a)(iv) bis, which is the opposite of Clause 3. Both clauses are in force';
    if (n <= 24) return 'Clause 14(c)(ii)(a)(iv) bis, as amended Tuesday';
    if (n === 25) return 'Clause 14(c)(ii)(a)(iv) bis, as amended Tuesday, which cites ' + who + ' by name';
    return 'Clause 14(c)(ii)(a)(iv) bis, as amended Tuesday, as it applies to ' + who + ', who has been cited so often it is now a clause';
  }
  let EMOJI_RX = null;
  try { EMOJI_RX = new RegExp('\\p{Extended_Pictographic}', 'u'); } catch (e) { EMOJI_RX = /[←-⯿\uD83C-\uDBFF]/; }
  function analyze(raw, c) { c = c || {};
    const t = String(raw || '').trim(), low = t.toLowerCase(), words = t ? t.split(/\s+/) : [];
    const letters = t.replace(/[^a-z]/gi, ''), up = letters.replace(/[^A-Z]/g, '').length;
    const dm = t.match(/\d+/), f = { t: t, low: low, words: words, n: words.length, chars: t.length };
    f.empty = !t; f.tiny = t.length > 0 && t.length <= 3; f.short = words.length === 1 && t.length > 3; f.long = t.length >= 170;
    f.caps = letters.length >= 4 && up / letters.length >= 0.6;
    f.lower = t.length >= 8 && t === low && /[a-z]/.test(t);
    f.bang = t.indexOf('!') >= 0; f.question = t.indexOf('?') >= 0; f.interrobang = f.bang && f.question;
    f.digits = !!dm; f.NUM = dm ? dm[0].slice(0, 12) : ''; f.bignum = !!dm && (dm[0].length > 3 || Number(dm[0]) > 100);
    f.emoji = !!t && EMOJI_RX.test(t);
    Object.keys(KW).forEach(function (kk) { f[kk] = KW[kk].test(low); });
    const fm = low.match(KW.food); f.FOOD = fm ? fm[0] : '';
    const om = low.match(KW.obvious); f.obviousWord = om ? om[0] : '';
    const nm = words.slice(1).map(function (w) { return w.replace(/[^A-Za-z']/g, ''); }).find(function (w) { return /^[A-Z][a-z]{1,}/.test(w) && !/^I'/.test(w); });
    f.name = !!nm; f.NAME = nm ? clean(nm) : '';
    f.iStart = /^I(['’](m|ve))?([^A-Za-z]|$)/.test(t);
    f.haiku = t.split(/\n/).filter(function (s) { return s.trim(); }).length === 3;
    f.repeatLetters = /([a-z])\1\1/i.test(t);
    const ec = (low.match(/e/g) || []).length; f.ecount = ec >= 12; f.ECOUNT = ec;
    f.repeat = !!t && !!c.prevText && normT(t) === normT(c.prevText);
    f.echo = !!t && (/rejected\./.test(low) || /^rejected/.test(low) || (!!c.lastReason && sharedRun(low.replace(/[^a-z0-9 ]/g, ' '), String(c.lastReason).toLowerCase().replace(/[^a-z0-9 ]/g, ' '), 6)));
    f.fast = !!t && (!!c.instant || (c.firstAt > 0 && c.submittedAt - c.firstAt < 2000));
    f.slow = !!t && c.firstAt > 0 && c.submittedAt - c.firstAt > 90000;
    f.meta = f.meta && !!t;
    f.WORDS = words.length; f.FIRST = t ? clean(Array.from(t)[0]).toUpperCase() : '';
    let lw = ''; words.forEach(function (w) { const x = w.replace(/[^\w'-]/g, ''); if (x.length > lw.length) lw = x; });
    f.LONGEST = clean(lw);
    f.CHARS = t.length;
    return f;
  }
  P.injectCSS(`
.m-complaints-dept-root{--cd-paper:#fbf3df;--cd-manila:#e8d29a;--cd-ink:#2a2118;--cd-red:#c4332b;--cd-blue:#2b4fb3;--cd-mint:#9fdcc0;--cd-mustard:#e9b43c;--cd-coral:#ff7a68;--cd-lilac:#c9b6e8;--cd-rock:#6f6a64;--cd-floor:#f3e7c0;--cd-fh:30px;position:relative;overflow-x:hidden;padding:12px;min-height:420px;color:var(--cd-ink);font-family:system-ui,-apple-system,'Segoe UI',sans-serif;background:var(--cd-paper) radial-gradient(#0000001a 1px,transparent 1px) 0 0/12px 12px}.m-complaints-dept-root *{box-sizing:border-box}
.m-complaints-dept-root[data-rung="5"],.m-complaints-dept-root[data-rung="6"]{--cd-floor:#e6dcd0}.m-complaints-dept-root[data-rung="7"],.m-complaints-dept-root[data-rung="8"]{--cd-floor:#ddd2dc}.m-complaints-dept-root[data-rung="9"],.m-complaints-dept-root[data-rung="10"],.m-complaints-dept-root[data-rung="11"],.m-complaints-dept-root[data-rung="12"]{--cd-floor:#d9ccef}.m-complaints-dept-root[data-rung="13"],.m-complaints-dept-root[data-rung="14"]{--cd-floor:#b9b6b2}
:where(.m-complaints-dept-root) :where(button,textarea,input,select){font:inherit;color:inherit}.m-complaints-dept-root button:focus-visible,.m-complaints-dept-root textarea:focus-visible,.m-complaints-dept-root input:focus-visible,.m-complaints-dept-root select:focus-visible,.m-complaints-dept-root summary:focus-visible,.m-complaints-dept-zone:focus-visible{outline:3px solid var(--cd-coral);outline-offset:3px}.m-complaints-dept-esc:focus-visible,.m-complaints-dept-coral:focus-visible{outline-color:var(--cd-ink)!important}
.m-complaints-dept-grid{display:grid;grid-template-columns:minmax(0,1fr);gap:12px}
@media (min-width:760px){.m-complaints-dept-grid{grid-template-columns:minmax(0,62fr) minmax(0,38fr)}}
.m-complaints-dept-main,.m-complaints-dept-side{display:flex;flex-direction:column;gap:12px;min-width:0}.m-complaints-dept-banner{margin:0 0 10px;padding:8px 12px;background:var(--cd-mustard);border:3px solid var(--cd-ink);border-radius:10px;font-weight:800;box-shadow:3px 3px 0 var(--cd-ink)}.m-complaints-dept-diorama{position:relative;height:200px;border:3px solid var(--cd-ink);border-radius:14px;background:linear-gradient(#cfe9f5,#f6efd8 64%);overflow:hidden;box-shadow:4px 4px 0 var(--cd-ink)}
.m-complaints-dept-window{position:absolute;left:15%;right:15%;top:14px;height:120px;border:4px solid var(--cd-ink);border-radius:12px 18px 10px 20px/18px 10px 20px 12px;background:#bfe3f1;overflow:hidden}.m-complaints-dept-clerks{position:absolute;left:0;right:0;bottom:-6px;display:flex;justify-content:center;gap:2px;font-size:3.6rem;line-height:1;animation:m-complaints-dept-blink 4s infinite}.m-complaints-dept-clerk{display:inline-block;animation:m-complaints-dept-bob 3.2s ease-in-out infinite}
.m-complaints-dept-faint .m-complaints-dept-clerk{transform:rotate(80deg) translateY(20px);animation:none}.m-complaints-dept-glass{position:absolute;inset:0;background:linear-gradient(115deg,#fff4 0 30%,#fff1 30% 100%);pointer-events:none}.m-complaints-dept-dim .m-complaints-dept-glass{background:#0006}.m-complaints-dept-winbtn{position:absolute;inset:0;background:transparent;border:0;padding:0;cursor:help}
.m-complaints-dept-curtain{position:absolute;left:0;top:0;bottom:0;width:30%;background:repeating-linear-gradient(90deg,#d96b5f 0 6px,#c4332b 6px 12px);opacity:.85;border-right:3px solid var(--cd-ink)}.m-complaints-dept-cat{position:absolute;right:10px;bottom:6px;font-size:1.5rem}.m-complaints-dept-mini{position:absolute;right:8px;top:6px;width:44px;height:34px;border:2px solid var(--cd-ink);border-radius:5px;background:#bfe3f1;font-size:1.1rem;text-align:center;line-height:34px}
.m-complaints-dept-pstamp{position:absolute;left:45%;top:30%;transform:translateX(-50%) rotate(-7deg) scale(1);border:4px double var(--cd-red);color:var(--cd-red);padding:3px 10px;font:900 1rem system-ui;letter-spacing:.1em;white-space:nowrap;opacity:0;pointer-events:none;mix-blend-mode:multiply}.m-complaints-dept-pstamp.m-complaints-dept-on{opacity:.92;animation:m-complaints-dept-land .35s cubic-bezier(.3,1.6,.5,1)}.m-complaints-dept-pstamp.m-complaints-dept-st-green{border-color:#2f8f4e;color:#2f8f4e}
.m-complaints-dept-arm{position:absolute;right:11%;top:28px;font-size:1.6rem;transform-origin:50% 100%;background:#6f8fb3;border:2px solid var(--cd-ink);border-radius:8px;padding:0 6px;z-index:2}.m-complaints-dept-arm.m-complaints-dept-swing{animation:m-complaints-dept-swing .4s ease-out}.m-complaints-dept-arm.m-complaints-dept-hot{background:var(--cd-red);animation:m-complaints-dept-bob .3s infinite}
.m-complaints-dept-counter{position:absolute;left:0;right:0;bottom:0;height:58px;background:var(--cd-mustard);border-top:3px solid var(--cd-ink);display:flex;align-items:center;gap:10px;padding:0 10px;z-index:3}.m-complaints-dept-sandwich{font-size:1.6rem}.m-complaints-dept-nameplate{flex:1;min-width:0;text-align:center;background:#fffdf5;border:2px solid var(--cd-ink);border-radius:4px;padding:2px 6px;font:800 .72rem ui-monospace,Consolas,monospace}
.m-complaints-dept-bell{font-size:1.5rem;background:#fffdf5;border:2px solid var(--cd-ink);border-radius:50%;width:42px;height:42px;cursor:pointer;padding:0;box-shadow:2px 2px 0 var(--cd-ink)}.m-complaints-dept-bell.m-complaints-dept-ring{animation:m-complaints-dept-swing .5s}.m-complaints-dept-smallrock{position:relative;background:none;border:0;padding:4px;cursor:pointer;transform:scale(var(--rs,1));transform-origin:50% 100%}
.m-complaints-dept-rockblob{display:inline-block;width:30px;height:22px;border-radius:60% 40% 55% 45%/50% 60% 40% 50%;background:radial-gradient(circle at 35% 30%,#a39d96,#6f6a64 60%,#4a4540);box-shadow:inset -3px -3px 6px #0005}.m-complaints-dept-tinyrock{width:16px;height:12px;vertical-align:middle;margin-right:4px}.m-complaints-dept-eye{position:absolute;left:50%;top:40%;width:8px;height:2px;margin-left:-4px;border-radius:50%;background:#fff;border:1px solid var(--cd-ink);transition:height .3s}.m-complaints-dept-open .m-complaints-dept-eye{height:14px}
.m-complaints-dept-sign{position:absolute;left:8px;top:8px;max-width:27%;background:#fffdf5;border:2px solid var(--cd-ink);border-radius:4px;padding:3px 6px;font:700 .6rem/1.2 ui-monospace,Consolas,monospace;transform:rotate(-3deg);z-index:2;transition:transform .5s}.m-complaints-dept-sign.m-complaints-dept-flip{background:var(--cd-mint)}.m-complaints-dept-sign.m-complaints-dept-flip{transform:rotate(3deg)}.m-complaints-dept-siren{position:absolute;right:8px;top:6px;font-size:1.6rem;z-index:4;animation:m-complaints-dept-pulse .5s infinite}
.m-complaints-dept-wallclock{position:absolute;left:8px;top:70px;width:34px;height:34px;border:3px solid var(--cd-ink);border-radius:50%;background:#fff;z-index:2}.m-complaints-dept-wallclock i{position:absolute;left:50%;top:50%;width:2px;height:12px;background:var(--cd-ink);transform-origin:50% 100%;margin:-12px 0 0 -1px;animation:m-complaints-dept-back 6s linear infinite}.m-complaints-dept-wallclock i+i{height:8px;animation-duration:36s}.m-complaints-dept-smoke{position:absolute;right:8%;top:6px;z-index:4;font-size:1.2rem}
.m-complaints-dept-fan{display:inline-block;animation:m-complaints-dept-spin .6s linear infinite}.m-complaints-dept-draft,.m-complaints-dept-slidnote{position:absolute;left:12%;right:12%;bottom:62px;z-index:5;background:#fffdf5;border:2px solid var(--cd-ink);border-radius:4px;padding:6px 8px;font:.72rem/1.3 'Brush Script MT',cursive,ui-monospace;transform:rotate(-1.5deg);max-height:70px;overflow:hidden;box-shadow:2px 2px 0 var(--cd-ink)}
.m-complaints-dept-slidnote{left:auto;right:5%;width:46%;bottom:74px;transform:rotate(2deg)}.m-complaints-dept-slidnote.m-complaints-dept-withdrawn::after{content:'WITHDRAWN';position:absolute;inset:auto 6px 4px auto;color:var(--cd-red);border:2px solid var(--cd-red);padding:0 4px;font:900 .7rem system-ui;transform:rotate(-8deg)}.m-complaints-dept-stagewrap{position:relative;overflow:hidden;overflow:clip;border:3px solid var(--cd-ink);border-radius:14px;box-shadow:4px 4px 0 var(--cd-ink)}.m-complaints-dept-stage{position:relative;min-height:260px;padding:14px;background:var(--cd-floor);transition:background .6s,filter .6s}
.m-complaints-dept-stage.m-complaints-dept-sepia{filter:sepia(.7) contrast(.95);background:radial-gradient(circle,#e8d4a8,#a78b5b)}.m-complaints-dept-stage.m-complaints-dept-loom{background:linear-gradient(90deg,var(--cd-floor),#4a3f66 70%)}.m-complaints-dept-stage.m-complaints-dept-drop{animation:m-complaints-dept-drop .7s ease-in forwards}.m-complaints-dept-hush .m-complaints-dept-stage{background:radial-gradient(circle,#d6d3cf,#9a958f)}.m-complaints-dept-cool{position:absolute;inset:0;z-index:20;background:#fffc;display:flex;align-items:center;justify-content:center}
.m-complaints-dept-coolbox{background:#fff;border:3px solid var(--cd-ink);border-radius:12px;padding:12px 16px;font-weight:800;min-width:60%;text-align:center}.m-complaints-dept-bar{height:14px;border:3px solid var(--cd-ink);border-radius:8px;background:#fff;overflow:hidden;margin-top:6px}.m-complaints-dept-coolfill,.m-complaints-dept-cfill{display:block;height:100%;width:0;background:linear-gradient(90deg,var(--cd-coral),var(--cd-mustard))}.m-complaints-dept-dark{position:absolute;inset:0;z-index:30;background:#000e;pointer-events:none}
.m-complaints-dept-shredder{position:absolute;left:0;right:0;bottom:0;height:18px;background:repeating-linear-gradient(90deg,#2a2118 0 8px,#4a3d31 8px 16px);color:#fff;font:800 .6rem/18px system-ui;text-align:center;letter-spacing:.2em;transform:translateY(100%);transition:transform .3s;z-index:6}.m-complaints-dept-shredder.m-complaints-dept-open{transform:none}.m-complaints-dept-trail{display:flex;flex-direction:column;gap:6px}.m-complaints-dept-thead{font-weight:900;font-size:.8rem;letter-spacing:.15em;text-transform:uppercase}
.m-complaints-dept-tslip{background:#fffdf5;border:2px solid var(--cd-ink);border-radius:6px;padding:4px 8px;font:.72rem/1.3 ui-monospace,Consolas,monospace;display:flex;flex-direction:column;overflow-wrap:anywhere}.m-complaints-dept-tfold{font-size:.75rem;opacity:.7;font-style:italic}.m-complaints-dept-postcard{background:#fff0c9;transform:rotate(-1deg)}.m-complaints-dept-building{border:3px solid var(--cd-ink);border-radius:14px;background:#fff8e6;padding:10px;box-shadow:4px 4px 0 var(--cd-ink)}
.m-complaints-dept-building.m-complaints-dept-dolly{animation:m-complaints-dept-dolly .7s ease-in-out}.m-complaints-dept-building.m-complaints-dept-nudge .m-complaints-dept-floor:first-child{transform:translateX(1px)}.m-complaints-dept-btitle{font-weight:900;font-size:.8rem;letter-spacing:.15em;text-transform:uppercase;margin-bottom:6px}.m-complaints-dept-crumb{display:none;background:var(--cd-mustard);border:2px solid var(--cd-ink);border-radius:999px;padding:4px 10px;font-weight:800;font-size:.74rem}.m-complaints-dept-root[data-compact="1"] .m-complaints-dept-crumb{display:block}.m-complaints-dept-crumb2{display:none;background:var(--cd-mustard);border:2px solid var(--cd-ink);border-radius:999px;padding:4px 10px;font-weight:800;font-size:.74rem}.m-complaints-dept-root[data-compact="1"][data-climb="1"] .m-complaints-dept-crumb2{display:block}.m-complaints-dept-stage:focus{outline:none}.m-complaints-dept-fine summary{cursor:pointer;font-size:.74rem;font-weight:700;margin-bottom:6px}
.m-complaints-dept-root[data-compact="1"] .m-complaints-dept-shaft,.m-complaints-dept-hush .m-complaints-dept-shaft{display:none}.m-complaints-dept-hush .m-complaints-dept-crumb{display:block}.m-complaints-dept-shaft{position:relative}.m-complaints-dept-floors{display:flex;flex-direction:column}
.m-complaints-dept-floor{display:flex;align-items:center;gap:6px;width:100%;height:var(--cd-fh,30px);padding:0 30px 0 8px;margin:0;border:2px solid var(--cd-ink);border-radius:999px;background:#3a3445;color:#cfc8da;font-size:.7rem;text-align:left;cursor:pointer;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.m-complaints-dept-floor.m-complaints-dept-lit{background:var(--cd-lilac);color:var(--cd-ink);font-weight:700}.m-complaints-dept-floor.m-complaints-dept-lit .m-complaints-dept-fe{animation:m-complaints-dept-flicker 2.4s steps(2) infinite}
.m-complaints-dept-floor.m-complaints-dept-here{background:var(--cd-mustard)}.m-complaints-dept-floor.m-complaints-dept-tarp{background:repeating-linear-gradient(45deg,#585260 0 8px,#4a4552 8px 16px)}.m-complaints-dept-floor.m-complaints-dept-annex{background:#fffdf5;color:var(--cd-ink);border-style:dashed;cursor:default}.m-complaints-dept-fn{font-weight:900;min-width:18px}.m-complaints-dept-ft{overflow:hidden;text-overflow:ellipsis}.m-complaints-dept-elev{position:absolute;right:6px;top:2px;font-size:1rem;line-height:calc(var(--cd-fh,30px) - 4px);transition:top .6s;z-index:2;pointer-events:none}
.m-complaints-dept-meter{display:flex;gap:12px;align-items:center;flex-wrap:wrap;border:3px solid var(--cd-ink);border-radius:14px;background:#fffdf5;padding:10px;box-shadow:4px 4px 0 var(--cd-ink)}.m-complaints-dept-thermo{position:relative;flex:none;width:24px;height:90px;border:3px solid var(--cd-ink);border-radius:12px;background:#fff;overflow:hidden}.m-complaints-dept-fill{position:absolute;left:0;right:0;bottom:0;height:var(--fill,50%);background:linear-gradient(to top,#ff7a68,#e9b43c);transition:height .6s}
.m-complaints-dept-mhead{font-weight:900;font-size:.78rem;text-transform:uppercase;letter-spacing:.1em}.m-complaints-dept-mval{font:900 1.8rem ui-monospace,Consolas,monospace}.m-complaints-dept-munit{font-size:.78rem;opacity:.8}.m-complaints-dept-plaque{flex-basis:100%;background:var(--cd-mustard);border:2px solid var(--cd-ink);border-radius:4px;padding:4px 8px;font:700 .72rem ui-monospace,Consolas,monospace}
.m-complaints-dept-sandra,.m-complaints-dept-binder{border:3px solid var(--cd-ink);border-radius:12px;background:var(--cd-mint);padding:6px 12px;font-weight:700;font-size:.85rem;box-shadow:3px 3px 0 var(--cd-ink)}.m-complaints-dept-binder{background:var(--cd-lilac)}.m-complaints-dept-dbtn{width:100%;border:3px solid var(--cd-ink);border-radius:12px;background:var(--cd-manila);padding:8px 12px;font-weight:800;cursor:pointer;box-shadow:3px 3px 0 var(--cd-ink);text-align:left}.m-complaints-dept-dlist{max-height:240px;overflow:auto;display:flex;flex-direction:column;gap:6px;margin-top:8px}
.m-complaints-dept-card{background:#fffdf5;border:2px solid var(--cd-ink);border-radius:6px;padding:4px 8px;font-size:.74rem;overflow-wrap:anywhere}.m-complaints-dept-cq{font-style:italic;opacity:.8}.m-complaints-dept-form{position:relative;background:#fffdf5;border:3px solid var(--cd-ink);border-radius:6px;padding:12px 14px 14px 30px;box-shadow:4px 4px 0 var(--cd-ink);font-family:ui-monospace,'Cascadia Mono',Consolas,monospace}.m-complaints-dept-perf{position:absolute;left:8px;top:6px;bottom:6px;width:0;border-left:3px dotted var(--cd-ink);opacity:.5}
.m-complaints-dept-fhead{font-weight:900;font-size:.82rem;letter-spacing:.04em}.m-complaints-dept-fno{font-size:.78rem;opacity:.75;margin:2px 0 6px}.m-complaints-dept-margin{font:italic .8rem Georgia,serif;transform:rotate(-2deg);color:#4a3f66;margin:4px 0 8px}.m-complaints-dept-ta,.m-complaints-dept-inp,.m-complaints-dept-sel{width:100%;border:2px solid var(--cd-ink);border-radius:6px;background:#fff;padding:8px;font-family:inherit;font-size:.9rem;resize:vertical}.m-complaints-dept-ticker{margin:6px 0 10px;font-size:.8rem}
.m-complaints-dept-btn,.m-complaints-dept-submit,.m-complaints-dept-esc{border:3px solid var(--cd-ink);border-radius:12px;background:#fffdf5;padding:8px 14px;min-height:44px;font-weight:800;cursor:pointer;box-shadow:3px 3px 0 var(--cd-ink);transition:transform .08s,box-shadow .08s}.m-complaints-dept-submit,.m-complaints-dept-esc,.m-complaints-dept-coral{background:var(--cd-coral)}.m-complaints-dept-submit{width:100%;font-size:1rem;letter-spacing:.04em}
.m-complaints-dept-btn:active,.m-complaints-dept-submit:active,.m-complaints-dept-esc:active{transform:translate(3px,3px);box-shadow:0 0 0 var(--cd-ink)}.m-complaints-dept-btn:disabled,.m-complaints-dept-star:disabled{opacity:.55;cursor:default}.m-complaints-dept-small{min-height:36px;padding:4px 10px;font-size:.78rem}.m-complaints-dept-big{font-size:1.1rem;padding:12px 18px}.m-complaints-dept-ceremony,.m-complaints-dept-special,.m-complaints-dept-rung{display:flex;flex-direction:column;gap:10px;align-items:stretch}.m-complaints-dept-chead{font-weight:900;letter-spacing:.15em}
.m-complaints-dept-belt{position:relative;height:40px;border:3px solid var(--cd-ink);border-radius:8px;background:repeating-linear-gradient(90deg,#444 0 14px,#5a5a5a 14px 28px);background-size:28px 100%;animation:m-complaints-dept-belt .5s linear infinite;overflow:hidden;cursor:pointer;color:#fff;padding:0;font-size:.7rem}.m-complaints-dept-folder{position:absolute;left:0;top:4px;font-size:1.4rem;animation:m-complaints-dept-slide 3s linear infinite}.m-complaints-dept-belttext{position:absolute;right:6px;bottom:2px;opacity:.85}
.m-complaints-dept-reel{background:#fff;border:3px solid var(--cd-ink);border-radius:8px;padding:6px 10px;font:800 .85rem ui-monospace,Consolas,monospace;min-height:34px}.m-complaints-dept-ccap,.m-complaints-dept-rline{font-size:.9rem;line-height:1.4;overflow-wrap:anywhere}.m-complaints-dept-barwrap{display:flex;align-items:center;gap:8px}.m-complaints-dept-barwrap .m-complaints-dept-bar{flex:1;margin:0}.m-complaints-dept-marks{display:flex;gap:6px;flex-wrap:wrap}
.m-complaints-dept-mark{border:3px solid var(--cd-red);color:var(--cd-red);font-weight:900;padding:0 8px;border-radius:4px;transform:rotate(-5deg);font-size:.8rem}.m-complaints-dept-cnotes{font:.76rem/1.4 ui-monospace,Consolas,monospace;opacity:.85}.m-complaints-dept-bigtext{font:900 1.5rem/1.15 system-ui;text-align:center}.m-complaints-dept-office{display:flex;justify-content:center;align-items:center;gap:8px;font-size:3.4rem}
.m-complaints-dept-note,.m-complaints-dept-postit{align-self:center;background:#fff59b;border:2px solid #b8a53b;padding:8px 12px;font:italic 800 .95rem Georgia,serif;transform:rotate(-2deg);box-shadow:3px 3px 0 #0003}.m-complaints-dept-years{text-align:center;font:900 1.2rem ui-monospace,Consolas,monospace}.m-complaints-dept-hugestamp{align-self:center;border:8px double #2f8f4e;color:#2f8f4e;font:900 2.4rem system-ui;letter-spacing:.12em;padding:6px 22px;transform:rotate(-8deg);animation:m-complaints-dept-land .5s cubic-bezier(.3,1.6,.5,1);mix-blend-mode:multiply}
.m-complaints-dept-hugestamp.m-complaints-dept-over{position:absolute;left:50%;top:44%;margin-left:-110px;border-color:var(--cd-red);color:var(--cd-red);font-size:2.6rem;z-index:3;background:#fff4}.m-complaints-dept-slipwrap{position:relative;overflow:hidden;padding:12px 6px 6px}.m-complaints-dept-slip{position:relative;background:#fffdf5;font-family:ui-monospace,'Cascadia Mono',Consolas,monospace;font-size:.84rem;line-height:1.45;padding:14px 14px 16px;filter:drop-shadow(4px 4px 0 var(--cd-ink));overflow-wrap:anywhere;max-width:100%}
.m-complaints-dept-slip::before,.m-complaints-dept-slip::after{content:'';position:absolute;left:0;right:0;height:8px;background:linear-gradient(135deg,#fffdf5 25%,transparent 25%) -6px 0,linear-gradient(225deg,#fffdf5 25%,transparent 25%) -6px 0;background-size:12px 12px}.m-complaints-dept-slip::before{top:-8px;transform:scaleY(-1)}.m-complaints-dept-slip::after{bottom:-8px}.m-complaints-dept-slip.m-complaints-dept-printing{animation:m-complaints-dept-print .8s steps(10) backwards}
.m-complaints-dept-warmslip{font-family:'Brush Script MT','Segoe Script',cursive;font-size:1.1rem;background:#fff6dd}.m-complaints-dept-stampbox{min-height:54px;margin-bottom:6px}.m-complaints-dept-stamp{--c:var(--cd-red);display:inline-block;border:4px double var(--c);color:var(--c);padding:3px 12px;font:900 1.05rem/1.15 system-ui;letter-spacing:.1em;text-transform:uppercase;transform:rotate(-7deg);mix-blend-mode:multiply;filter:url(#cd-rough);animation:m-complaints-dept-land .35s cubic-bezier(.3,1.6,.5,1)}.m-complaints-dept-st-blue{--c:var(--cd-blue)}.m-complaints-dept-st-green{--c:#2f8f4e}
.m-complaints-dept-st-mint{--c:#1f8a64;background:#9fdcc055}.m-complaints-dept-sgreet{font-weight:900;margin-bottom:6px}.m-complaints-dept-sflav,.m-complaints-dept-sreason,.m-complaints-dept-sclause,.m-complaints-dept-sremedy,.m-complaints-dept-crumbline{margin:0 0 8px}.m-complaints-dept-sreason{font-weight:700}.m-complaints-dept-sclause{padding-left:8px;border-left:3px solid var(--cd-ink);opacity:.9}.m-complaints-dept-sremedy,.m-complaints-dept-tiny{font-size:.76rem;opacity:.85}.m-complaints-dept-cursive{font-size:1.2rem}
.m-complaints-dept-crumbline{font-size:.72rem;background:#efe6cb;padding:3px 6px}.m-complaints-dept-snote{font:italic .9rem 'Brush Script MT',cursive;color:#4a3f66;transform:rotate(-3deg)}.m-complaints-dept-ssign{margin:8px 0 4px;text-align:right;font-style:italic}.m-complaints-dept-sfoot{font-size:.74rem;border-top:2px dashed var(--cd-ink);padding-top:6px;opacity:.85}.m-complaints-dept-toastcard,.m-complaints-dept-invite{border:2px dashed var(--cd-ink);padding:6px 8px;margin:0 0 8px;background:#fff0c9;font-size:.78rem}
.m-complaints-dept-controls{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:14px;position:relative}.m-complaints-dept-decoybox{position:relative;min-width:0}.m-complaints-dept-decoy{border:2px dashed var(--cd-ink);border-radius:10px;background:#fff;padding:6px 10px;font-size:.72rem;cursor:not-allowed;transition:transform .25s;min-height:36px}.m-complaints-dept-d1{height:14px;min-height:0;overflow:hidden;padding:0 10px;margin-top:22px;opacity:.9}.m-complaints-dept-d3{opacity:.7}.m-complaints-dept-dhat{display:block;line-height:.8;font-size:.8rem;text-align:center}
.m-complaints-dept-live{background:var(--cd-mint);cursor:pointer;border-style:solid;font-weight:800;font-size:.9rem;align-self:center}.m-complaints-dept-pressed{transform:scale(.9);background:var(--cd-mustard)}.m-complaints-dept-dnote{font:italic .72rem/1.3 ui-monospace,Consolas,monospace;max-width:260px;border:2px dotted var(--cd-ink);padding:4px 8px}.m-complaints-dept-srbtn{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap;padding:0;border:0}.m-complaints-dept-amendbox{flex-basis:100%}
.m-complaints-dept-amendbox summary{cursor:pointer;font-size:.78rem;font-weight:700}.m-complaints-dept-amend{margin-top:6px}.m-complaints-dept-stars{flex-basis:100%;display:flex;gap:4px;align-items:center;flex-wrap:wrap}.m-complaints-dept-slabel{font-size:.74rem;margin-right:6px}.m-complaints-dept-star{width:40px;height:40px;border:2px solid var(--cd-ink);border-radius:50%;background:var(--cd-mint);font-size:1.1rem;cursor:pointer;padding:0;color:#7a6a40}.m-complaints-dept-star.m-complaints-dept-on{background:var(--cd-mustard);color:var(--cd-ink)}
.m-complaints-dept-rhead{display:flex;gap:12px;align-items:flex-start}.m-complaints-dept-remoji{font-size:2.6rem;line-height:1;flex:none}.m-complaints-dept-rname{font-weight:900;font-size:.82rem;letter-spacing:.04em;margin-bottom:3px}.m-complaints-dept-desks,.m-complaints-dept-qbtns,.m-complaints-dept-minform{display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center}.m-complaints-dept-desk{flex:1 1 90px;min-height:70px;border:3px solid var(--cd-ink);border-radius:6px;background:#c8a46a;box-shadow:3px 3px 0 var(--cd-ink);font-weight:800;cursor:pointer}
.m-complaints-dept-dk{display:inline-block;width:20px;height:20px;line-height:17px;border:2px solid var(--cd-ink);border-radius:50%;background:#fff;font-size:.7rem;margin-right:6px;text-align:center}.m-complaints-dept-gauge{width:140px;height:80px;align-self:center}.m-complaints-dept-needle{transform-origin:60px 62px;animation:m-complaints-dept-wob 1.6s ease-in-out infinite}.m-complaints-dept-qtop{display:flex;gap:10px;flex-wrap:wrap;justify-content:center}
.m-complaints-dept-board{background:#1d1a24;color:#7dff9a;font:800 1rem ui-monospace,Consolas,monospace;padding:8px 14px;border:3px solid var(--cd-ink);border-radius:6px}.m-complaints-dept-ticket{background:#fff;border:2px dashed var(--cd-ink);padding:8px 12px;font:900 1rem ui-monospace,Consolas,monospace;transform:rotate(2deg)}.m-complaints-dept-crowd{display:flex;flex-wrap:wrap;gap:8px;justify-content:center}.m-complaints-dept-person{display:flex;flex-direction:column;align-items:center;gap:4px;max-width:92px;transition:transform .5s,opacity .5s,max-width .5s}
.m-complaints-dept-pe{font-size:2rem}.m-complaints-dept-person.m-complaints-dept-gone{transform:translateX(120px);opacity:0;max-width:0;overflow:hidden}.m-complaints-dept-target{border:3px solid var(--cd-ink);background:#fff;padding:10px;font:800 1rem ui-monospace,Consolas,monospace;border-radius:6px}.m-complaints-dept-tlabel{font-size:.78rem;font-weight:800}.m-complaints-dept-table{position:relative;width:100%;max-width:440px;height:230px;margin:6px auto}
.m-complaints-dept-oval{position:absolute;left:14%;right:14%;top:20%;bottom:20%;border:3px solid var(--cd-ink);border-radius:50%;background:var(--cd-manila);display:flex;align-items:center;justify-content:center;font-weight:900;letter-spacing:.2em;font-size:.75rem}.m-complaints-dept-chairb,.m-complaints-dept-chair1{position:absolute;transform:translate(-50%,-50%);width:42px;height:42px;border-radius:50%;border:3px solid var(--cd-ink);background:#fff;font-weight:800;font-size:1rem;padding:0;cursor:pointer;display:flex;align-items:center;justify-content:center}
.m-complaints-dept-chair1{background:var(--cd-mustard);cursor:default}.m-complaints-dept-chairb.m-complaints-dept-used{background:var(--cd-mint)}.m-complaints-dept-chairb.m-complaints-dept-fade{opacity:.4;transition:opacity 1s}.m-complaints-dept-votes{text-align:center;font:800 .85rem ui-monospace,Consolas,monospace}.m-complaints-dept-frame{border:6px double #6b5230;background:#f3e6c4;padding:12px;font:italic 1rem Georgia,serif;text-align:center;overflow-wrap:anywhere}.m-complaints-dept-reading{min-height:60px;font:italic .95rem Georgia,serif;text-align:center}
.m-complaints-dept-reading p{margin:2px 0}.m-complaints-dept-mirror{max-width:100%;overflow:hidden;display:flex;justify-content:center}.m-complaints-dept-mframe{display:block;width:100%;border:3px solid var(--cd-ink);background:#fffdf5;padding:8px;border-radius:6px;opacity:calc(1 - var(--d,0) * .07);pointer-events:none;font:inherit;text-align:center;overflow-wrap:anywhere}.m-complaints-dept-mbtn{pointer-events:auto;cursor:zoom-in;background:#fff;font-size:.9rem}
.m-complaints-dept-zone{position:relative;height:190px;border:3px dashed var(--cd-ink);border-radius:14px;background:#e9f6fb;display:flex;align-items:center;justify-content:center;touch-action:none}.m-complaints-dept-arrow{width:90px;height:90px;transform:rotate(var(--a,0deg));transition:transform 600ms cubic-bezier(.34,1.56,.64,1)}.m-complaints-dept-arrow svg{width:100%;height:100%}.m-complaints-dept-stapwrap{display:flex;gap:12px;align-items:center;flex-wrap:wrap;justify-content:center}.m-complaints-dept-staplersvg{width:150px;height:70px}
.m-complaints-dept-demands{margin:0;padding-left:18px;font-size:.82rem;font-weight:700}.m-complaints-dept-paper{position:relative;background:#fffdf5;border:2px solid var(--cd-ink);padding:10px;min-height:56px;font:.82rem ui-monospace,Consolas,monospace;overflow-wrap:anywhere}.m-complaints-dept-staples{position:absolute;right:6px;top:2px;display:flex;gap:2px;color:#6f6a64;font-weight:900}.m-complaints-dept-rung{position:relative}.m-complaints-dept-stand{display:flex;gap:30px;justify-content:center;align-items:flex-end}.m-complaints-dept-hatstand{font-size:3.4rem}
.m-complaints-dept-dennis{border:0;background:none;font-size:1.8rem;cursor:pointer}.m-complaints-dept-avatar{text-align:center;font-size:2.6rem}.m-complaints-dept-hatfollow{position:absolute;font-size:2rem;z-index:5;pointer-events:none;transition:left .1s,top .1s}.m-complaints-dept-wall{align-self:center;border:3px solid var(--cd-ink);border-radius:999px;background:#fff;padding:4px 14px;font:800 .85rem ui-monospace,Consolas,monospace}.m-complaints-dept-arena{position:relative;height:230px;display:flex;align-items:center;justify-content:center;overflow:hidden}
.m-complaints-dept-therock{position:relative;z-index:1;width:150px;height:110px;border:0;padding:0;cursor:pointer;border-radius:60% 40% 55% 45%/50% 60% 40% 50%;background:radial-gradient(circle at 35% 28%,#a39d96,#6f6a64 58%,#48433e);box-shadow:inset -8px -10px 18px #0005;transition:transform .8s}.m-complaints-dept-therock.m-complaints-dept-big{width:225px;height:165px}.m-complaints-dept-therock.m-complaints-dept-cloud{background:radial-gradient(circle at 40% 35%,#fff,#d4d8dc 60%,#b9bec4);filter:blur(1px)}
.m-complaints-dept-therock.m-complaints-dept-away,.m-complaints-dept-smallrockfly.m-complaints-dept-away{transform:rotate(25deg)}.m-complaints-dept-therock.m-complaints-dept-rolled{transform:rotate(90deg)}.m-complaints-dept-rshadow{position:absolute;left:50%;bottom:16px;width:170px;height:20px;margin-left:-85px;border-radius:50%;background:#0003}.m-complaints-dept-sticky{position:absolute;left:50%;bottom:6px;transform:translateX(-50%) rotate(-3deg);z-index:2;background:#fff59b;border:2px solid #b8a53b;padding:4px 8px;font:italic 700 .72rem Georgia,serif;max-width:80%;text-align:center}
.m-complaints-dept-smallrockfly{position:absolute;right:-70px;bottom:26px;width:44px;height:34px;border-radius:60% 40% 55% 45%/50% 60% 40% 50%;background:radial-gradient(circle at 35% 30%,#a39d96,#6f6a64 60%,#4a4540);transition:right 1s,transform .8s}.m-complaints-dept-smallrockfly.m-complaints-dept-in{right:14%}.m-complaints-dept-stampslot{position:absolute;left:50%;top:8px;transform:translateX(-50%);z-index:3}.m-complaints-dept-rockmsg{text-align:center;font-weight:700;font-size:.9rem;overflow-wrap:anywhere}
.m-complaints-dept-slam{position:absolute;inset:0;z-index:10;display:flex;align-items:center;justify-content:center;background:#fff8}.m-complaints-dept-cert{position:relative;background:#fffaf0;border:6px double #b8862b;padding:18px;text-align:center;animation:m-complaints-dept-certin 1.2s ease-out;overflow:hidden}.m-complaints-dept-ctitle{font:900 1.3rem/1.2 Georgia,serif;letter-spacing:.06em;margin-bottom:8px}.m-complaints-dept-sigs{display:flex;flex-wrap:wrap;gap:6px 14px;justify-content:center;margin:8px 0;font:italic 1rem 'Brush Script MT',cursive}
.m-complaints-dept-sealrow{display:flex;justify-content:center;align-items:center;gap:18px;margin:6px 0}.m-complaints-dept-seal{width:84px;height:84px}.m-complaints-dept-doodle{font-size:2.4rem}.m-complaints-dept-offer{background:#fffdf5;border:3px solid var(--cd-ink);border-radius:10px;padding:8px 12px;margin-bottom:10px;box-shadow:3px 3px 0 var(--cd-ink)}.m-complaints-dept-offer p{margin:0 0 6px}.m-complaints-dept-rejectit{width:100%;margin-bottom:10px}
.m-complaints-dept-sec{position:absolute;left:0;bottom:20px;z-index:25;font-size:2.6rem;animation:m-complaints-dept-roll 6.4s ease-in-out forwards;display:flex;align-items:flex-end;pointer-events:none}.m-complaints-dept-manemoji{position:relative;top:-4px;margin-right:-34px;z-index:1}.m-complaints-dept-formcard{font:800 .6rem ui-monospace,Consolas,monospace;background:#fff;border:2px solid var(--cd-ink);padding:2px 4px;align-self:center;margin-left:24px}.m-complaints-dept-shake{animation:m-complaints-dept-shake .12s linear 2}
.m-complaints-dept-door{position:absolute;right:22%;bottom:0;width:30px;height:58px;border:3px solid var(--cd-ink);border-bottom:0;border-radius:6px 6px 0 0;background:#9a6a3a;z-index:1}.m-complaints-dept-door i{position:absolute;right:4px;top:30px;width:6px;height:6px;border-radius:50%;background:var(--cd-mustard);border:1px solid var(--cd-ink)}
.m-complaints-dept-flipped .m-complaints-dept-window,.m-complaints-dept-flipped .m-complaints-dept-sandwich{transform:scaleX(-1)}.m-complaints-dept-balloons{font-size:2rem;text-align:center;letter-spacing:.3em;min-height:2.6rem}.m-complaints-dept-phone{font-size:3rem;text-align:center;animation:m-complaints-dept-swing .5s infinite}
.m-complaints-dept-quake{animation:m-complaints-dept-shake .1s linear 6}.m-complaints-dept-flick .m-complaints-dept-stagewrap{animation:m-complaints-dept-flick .4s steps(4)}.pm-reduce-motion .m-complaints-dept-root,.pm-reduce-motion .m-complaints-dept-root *,.m-complaints-dept-reduced *,.m-complaints-dept-reduced{animation:none!important;transition:none!important}
@media (max-width:640px){.m-complaints-dept-diorama{height:112px}.m-complaints-dept-window{height:64px;top:6px}.m-complaints-dept-clerks{font-size:2.2rem}.m-complaints-dept-counter{height:48px}.m-complaints-dept-sign{max-width:34%;font-size:.5rem}.m-complaints-dept-pstamp{font-size:.55rem;top:20%;left:50%;letter-spacing:.04em;max-width:90%;white-space:normal;text-align:center}.m-complaints-dept-stage{padding:10px}.m-complaints-dept-root{padding:8px 8px 100px}.m-complaints-dept-arena{height:200px}.m-complaints-dept-therock.m-complaints-dept-big{width:190px;height:140px}.m-complaints-dept-hugestamp{font-size:1.5rem}.m-complaints-dept-wallclock{top:50px}.m-complaints-dept-draft,.m-complaints-dept-slidnote{bottom:50px}.m-complaints-dept-slipwrap{padding:12px 10px 10px}.m-complaints-dept-controls{padding:4px}}
@media (pointer:coarse){.m-complaints-dept-root{--cd-fh:40px}.m-complaints-dept-btn,.m-complaints-dept-star,.m-complaints-dept-bell{min-height:48px;min-width:48px}}
@keyframes m-complaints-dept-shake{0%{transform:translate(0,0)}25%{transform:translate(2px,-2px)}50%{transform:translate(-2px,1px)}75%{transform:translate(2px,2px)}100%{transform:translate(0,0)}}
@keyframes m-complaints-dept-land{0%{transform:rotate(-7deg) scale(1.7);opacity:0}100%{transform:rotate(-7deg) scale(1);opacity:1}}
@keyframes m-complaints-dept-print{from{clip-path:inset(0 0 100% 0)}to{clip-path:inset(-12px -12px -12px -12px)}}
@keyframes m-complaints-dept-bob{0%,100%{transform:translateY(0)}50%{transform:translateY(-3px)}}
@keyframes m-complaints-dept-blink{0%,94%,100%{transform:scaleY(1)}97%{transform:scaleY(.92)}}
@keyframes m-complaints-dept-swing{0%{transform:rotate(0)}30%{transform:rotate(-24deg)}60%{transform:rotate(12deg)}100%{transform:rotate(0)}}
@keyframes m-complaints-dept-pulse{0%,100%{transform:scale(1);filter:drop-shadow(0 0 4px #f00)}50%{transform:scale(1.25);filter:drop-shadow(0 0 12px #f00)}}
@keyframes m-complaints-dept-spin{to{transform:rotate(360deg)}}
@keyframes m-complaints-dept-back{to{transform:rotate(-360deg)}}
@keyframes m-complaints-dept-belt{to{background-position:28px 0}}
@keyframes m-complaints-dept-slide{from{left:-10%}to{left:100%}}
@keyframes m-complaints-dept-flicker{0%{opacity:1}50%{opacity:.4}100%{opacity:1}}
@keyframes m-complaints-dept-dolly{0%{transform:scale(1) rotate(0)}50%{transform:scale(1.08) rotate(3deg)}100%{transform:scale(1) rotate(0)}}
@keyframes m-complaints-dept-drop{to{transform:translateY(110%);opacity:0}}
@keyframes m-complaints-dept-wob{0%,100%{transform:rotate(-30deg)}50%{transform:rotate(34deg)}}
@keyframes m-complaints-dept-certin{from{transform:translateY(120%)}to{transform:none}}
@keyframes m-complaints-dept-roll{0%{transform:translateX(-80px)}25%,70%{transform:translateX(30%)}100%{transform:translateX(-90px)}}
@keyframes m-complaints-dept-flick{0%{opacity:1}30%{opacity:.4}60%{opacity:1}80%{opacity:.4}100%{opacity:1}}
`, 'css-complaints-dept');
  P.addAchievements([
    { id: 'complaints-dept.first', name: 'Grand Order of the Rejected Slip, First Class (Laminated)', desc: 'Receive your first rejection. It is a sign of belonging and also a form.', icon: '📜', reward: 1, check: function (s) { return (s['complaints-dept.rejected'] || 0) >= 1; } },
    { id: 'complaints-dept.gerald', name: 'Escalator Of The Realm, Third Class', desc: 'Escalate to rung 7 and meet Gerald, who is quietly unimpressed by your ambition.', icon: '🥔', reward: 3 },
    { id: 'complaints-dept.rock', name: 'The Ultimate Appellant of the Rock-Based Judiciary', desc: 'Appeal a complaint all the way to the Rock. The elevator was a rumor; you took the stairs of hope.', icon: '🌑', reward: 10 },
    { id: 'complaints-dept.queue', name: 'Knight Commander of the Queue (Honorary, Pending Quorum)', desc: 'Let 3 people go ahead of you at Supervising Senior Intake. Nobody was keeping track.', icon: '🎟️', reward: 2 },
    { id: 'complaints-dept.sandra25', name: 'Grand Marshal of Clause 14(c)(ii)(a)(iv) bis, as Amended Tuesday', desc: 'Be cited by Sandra from Compliance 25 times. Sandra thanks you. Sandra has not thanked you.', icon: '📑', reward: 5, check: function (s) { return (s['complaints-dept.sandraCitations'] || 0) >= 25; } },
    { id: 'complaints-dept.reasons25', name: 'Master of Procedure, Honorary, Retroactively', desc: 'Collect 25 different rejection reasons in the Binder, none of which will ever help you.', icon: '📒', reward: 5 },
    { id: 'complaints-dept.rejected50', name: 'Archduke of Archived Annoyance', desc: 'Have 50 complaints rejected. The Department honors consistency, specifically its own.', icon: '🗄️', reward: 5, check: function (s) { return (s['complaints-dept.rejected'] || 0) >= 50; } },
    { id: 'complaints-dept.meta7', name: 'Chief Archivist of the Folder Within The Folder', desc: 'Complain about complaints about complaints, 7 folders deep. The form has taken out a loan.', icon: '📂', reward: 5 },
    { id: 'complaints-dept.halfsandwich', name: 'Half A Sandwich, Whole Heart', desc: "Complete 3 laps, then accept half of Brenda's sandwich. It is just bread. It was never just bread.", icon: '🥪', reward: 3 },
    { id: 'complaints-dept.knighthood', name: 'Knight Commander of the Resubmission', desc: 'Complete 3 laps. The Rock has taken note. The Rock has not taken anything else.', icon: '🛡️', reward: 8, check: function (s) { return (s['complaints-dept.laps'] || 0) >= 3; } },
    { id: 'complaints-dept.silent', name: 'The Silent Majority Of One (Quorum Pending)', desc: 'SECRET. Idle at the counter for 3 minutes without complaining. A clerk is moved.', icon: '🤫', secret: true, reward: 10 },
    { id: 'complaints-dept.kindest', name: 'The Kindest Thing Anyone Ever Did At Window 4', desc: 'SECRET. Sit idle long enough that Brenda writes her own complaint, then accept it (unofficially).', icon: '💌', secret: true, reward: 5 },
    { id: 'complaints-dept.accepted', name: 'The Accepted One (Revoked Pending Appeal)', desc: 'SECRET. Have a complaint accepted by the Department. This is not supposed to be possible.', icon: '✅', secret: true, reward: 5 },
    { id: 'complaints-dept.tuesdayrock', name: 'It Is Tuesday (Officially)', desc: 'SECRET. After your first lap, click the small rock on the counter 7 times. 7 and a half was not available.', icon: '🗿', secret: true, reward: 10 },
    { id: 'complaints-dept.stones', name: 'Grievance Of The Stones', desc: 'SECRET. Find what the Rock has been meaning to complain about.', icon: '🗒️', secret: true, reward: 5 },
    { id: 'complaints-dept.dame', name: 'Honorary Dame of the Rock', desc: "SECRET. Reject the Rock's own complaint. Whichever reason you pick is a good one.", icon: '👑', secret: true, reward: 5 },
    { id: 'complaints-dept.observed', name: 'Grand Duchess of Doing Nothing Under Observation', desc: 'SECRET. Idle in the Department for 10 minutes while the Rock does something. Do not look at the Rock.', icon: '👁️', secret: true, reward: 10 },
    { id: 'complaints-dept.sandra', name: 'Sandra Has Entered The Chat', desc: 'SECRET. Type the name. Do not do that.', icon: '👀', secret: true, reward: 3 },
    { id: 'complaints-dept.volume', name: 'Overwhelmed (Departmentally)', desc: 'SECRET. Submit complaints so quickly the stamp needs peas.', icon: '🚨', secret: true, reward: 2 }, { id: 'complaints-dept.manager', name: 'Back In 5 (Years)', desc: 'SECRET. Ask for the manager. Wait.', icon: '🪑', secret: true, reward: 3 },
    { id: 'complaints-dept.tiny', name: 'The Department Is This Small', desc: 'SECRET. Shrink the window until the Department admits it.', icon: '🔬', secret: true, reward: 2 },
    { id: 'complaints-dept.door', name: 'Grand Architect of the Door That Was Drawn (Hereditary, Non-Hereditary)', desc: 'SECRET. Knock on Window 4 until it grows a door. It is a drawing. Be gentle with it.', icon: '🚪', secret: true, reward: 8 },
    { id: 'complaints-dept.tenure', name: 'Eternal Lord Warden of the Waiting Room, Seven and a Half Terms (Consecutive, Non-Consecutive)', desc: 'SECRET. Spend 10 minutes in the Department. You have been reviewed. The reviewer was a drawer.', icon: '🏅', secret: true, reward: 10 },
    { id: 'complaints-dept.fun', name: 'Supreme Commander of Mandatory Fun, Third Class (Fun Pending)', desc: 'SECRET. Attend a Mandatory Fun Break. Fun was had. It was logged.', icon: '🎈', secret: true, reward: 4 },
    { id: 'complaints-dept.ode', name: 'Poet Laureate of Provisional Grief (Unpublished)', desc: 'SECRET. Attend the Annual Complaints Recital, in which Brenda reads your own complaints back to you.', icon: '🎤', secret: true, reward: 4 },
    { id: 'complaints-dept.strike', name: 'Grand Negotiator of the Stamp Strike (Settled, Pending)', desc: 'SECRET. Settle the Stamp Strike. The stamp did not ask for much. It asked for a lot.', icon: '✊', secret: true, reward: 4 },
    { id: 'complaints-dept.reversal', name: 'The Reject Who Rejected Brenda', desc: "SECRET. Complete a lap, then reject Brenda's own complaint. Give a reason. Nobody ever has.", icon: '🙃', secret: true, reward: 5 }
  ]);
  P.addLines('ticker', [
    'POINTLESS NEWS: Department of Complaints reports record rejection rate. The rate was rejected.', 'POINTLESS NEWS: A rock has been promoted. The promotion was rejected by a smaller rock.', 'POINTLESS NEWS: Window 4 acquires a tiny cat. The cat is a drawing and has asked for nothing.',
    'POINTLESS NEWS: Sandra from Compliance has cited someone. Sandra will not say who. Sandra has said who.', "POINTLESS NEWS: Brenda's sandwich 'going well', says Brenda.", 'POINTLESS NEWS: Floor 7 1/2 confirmed. Floor 7 1/2 declined to comment on whether it exists.'
  ]);
  P.addLines('moduleEnter', [ 'You are entering the Department of Complaints. Please have your grievance ready, and a second grievance for backup.', 'Brenda has seen you coming. Brenda has already rejected you. It was for your convenience.'
  ]);
  P.addLines('moduleExit', [ 'You have left the Department of Complaints. Your complaint remains, pending.', 'Brenda waves. She has never waved. It was a small adjustment of the sandwich.', 'Exit noted. Exit rejected. Exit permitted, on a technicality.'
  ]);
  P.registerModule({ id: 'complaints-dept', title: 'The Department of Complaints', tagline: 'Your complaint is important to us in a way we cannot file.', icon: '🗂️', category: 'department',
    unlockCost: 0, tags: ['typing', 'bureaucracy', 'ladder'], mount(root, api) { const el = api.el, T = api.selftest ? 0.1 : 1;
      const k = function (s) { return 'm-complaints-dept-' + s; };
      let destroyed = false, kbd = false;
      const reduced = (function () { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } })();
      const isReduced = function () { return reduced || document.body.classList.contains('pm-reduce-motion'); }, isCalm = function () { return isReduced() || !!(P.params && P.params.shot); }; // lint-ignore
      const PN = clean(api.player && api.player.name) || 'Valued Employee';
      const num = function (v) { v = Number(v); return isFinite(v) && v > 0 ? Math.min(v, 1e9) : 0; };
      function loadSave() { let v = null;
        try { v = api.save.get('v', null); } catch (e) { v = null; }
        if (!v || typeof v !== 'object') v = {};
        return { highestRung: Math.floor(num(v.highestRung)), filed: Math.floor(num(v.filed)), reasons: Array.isArray(v.reasons) ? v.reasons.filter(function (x) { return Number.isInteger(x) && x >= 0 && x < REASON_ALL.length; }).slice(0, 400) : [],
          firstComplaint: typeof v.firstComplaint === 'string' ? v.firstComplaint.slice(0, 120) : '', laps: Math.floor(num(v.laps)), sockSeen: !!v.sockSeen, rockMet: !!v.rockMet, brendaHalf: Math.floor(num(v.brendaHalf)), decoyStage: Math.min(4, Math.floor(num(v.decoyStage))),
          windowUses: Math.floor(num(v.windowUses)), slips: Math.floor(num(v.slips)), vane: Math.floor(num(v.vane)), knocks: Math.floor(num(v.knocks))
        };
      }
      const sv = loadSave();
      function buildLadder(lap) { const a = BASE_LADDER.slice();
        if (lap >= 2) a.splice(a.indexOf('mirror'), 0, 'half');
        if (lap >= 3) a.splice(a.indexOf('rock'), 0, 'bigrock');
        if (lap >= 4) a.splice(a.indexOf('rock'), 0, 'cloudrock');
        return a;
      }
      const S = { phase: 'intake', runId: 0, pos: 0, lap: Math.min(9, 1 + sv.laps), caseNo: sv.filed + 1, text: '', timers: [], seen: new Set(sv.reasons), cases: [], trail: [],
        sandra: 0, index: 7.5, metaDepth: 0, lastKey: '', lastReason: '', prevText: '', quiet: 0, says: [], lastInput: api.now(), spam: [], rush: false, rushUntil: 0, cool: false,
        coolDownAt: 0, warmNext: false, tierAt: 0, tier3Done: false, firstAt: 0, instant: false, fin: false, rid: 'brenda', onDigit: null, reached: 0, revealed: false, meterShown: false,
        slipsLap: 0, surveyDone: false, unrated: false, escTimes: [], sandraFlagAt: -99, sandraFlagN: 0, rockDone: false, firstOfLap: '', metaMax: 0, decoyDodges: 0, decoyTrap: false,
        stones: false, drawer: false, thermoSaid: false, compact: false, bannerSaid: {}, special: '', preempt: false, lastRungSay: 0, hatOn: false, brendaSock: false, ladder: null, pendingSock: false,
        lastSayAt: api.now(), bellT: [], bellN: 0, mountFiled: 0, rushN: 0, mile3: false, mile10: false, cbUsed: {}, t0: api.now(), bellOff: false
      };
      S.ladder = buildLadder(S.lap);
      const bags = {};
      function bag(arr) { let q = [], last = null;
        return { round: 0, next: function () { if (!q.length) { q = api.shuffle(arr); this.round++; if (q.length > 1 && q[q.length - 1] === last) { const t = q[0]; q[0] = q[q.length - 1]; q[q.length - 1] = t; } }
          last = q.pop(); return last;
        } };
      }
      function deal(name, arr) { return (bags[name] || (bags[name] = bag(arr))).next(); }
      function dealBag(name, arr) { return bags[name] || (bags[name] = bag(arr)); }
      function saveNow() {
        try { api.save.set('v', { highestRung: sv.highestRung, filed: sv.filed, reasons: Array.from(S.seen).slice(0, 400), firstComplaint: sv.firstComplaint, laps: sv.laps, sockSeen: sv.sockSeen, rockMet: sv.rockMet, brendaHalf: sv.brendaHalf, decoyStage: sv.decoyStage, windowUses: sv.windowUses, slips: sv.slips, vane: sv.vane, knocks: sv.knocks }); } catch (e) { /* the Department never forgets, except here */ }
      }
      /* ---- phase-guarded timers: every callback dies with its phase ---- */
      function clearTimers() { S.timers.forEach(function (o) { if (o.i) api.clearInterval(o.t); else api.clearTimeout(o.t); }); S.timers = []; }
      function go(phase) { S.runId++; S.phase = phase; clearTimers(); S.onDigit = null; S.fin = false; S.sceneOn = false; if (wrap) { wrap.dataset.phase = phase; } }
      function later(ms, fn) { const rid = S.runId;
        const t = api.setTimeout(function () { if (rid !== S.runId || destroyed) return; fn(); }, ms);
        S.timers.push({ t: t }); return t;
      }
      function every(ms, fn) { const rid = S.runId;
        const t = api.setInterval(function () { if (rid !== S.runId || destroyed) return; fn(); }, ms);
        S.timers.push({ t: t, i: 1 }); return t;
      }
      function soon(ms, fn) { return api.setTimeout(function () { if (!destroyed) fn(); }, ms); }
      function say(text, o) { o = o || {};
        const n = api.now();
        if (destroyed || (n < S.quiet && !o.force)) return false;
        S.says = S.says.filter(function (t) { return n - t < 1000; });
        if (S.says.length >= 2 && !o.force) return false;
        S.says.push(n);
        const opts = {};
        Object.keys(o).forEach(function (kk) { if (kk !== 'force') opts[kk] = o[kk]; });
        let txt = fill(text, { PLAYER: PN }); const who = o.who || 'Management', bm = /^Brenda: /.exec(txt);
        if (txt.indexOf(who + ': ') === 0) txt = txt.slice(who.length + 2); else if (bm && who === 'Management') { opts.who = 'Brenda'; txt = txt.slice(bm[0].length); }
        const ok = api.say(txt, opts);
        if (ok) S.lastSayAt = n;
        return ok;
      }
      function sayRung(text, who, o) { S.lastRungSay = api.now(); return say(text === S.cardLine && RTAG[S.rid] ? RTAG[S.rid] : text, Object.assign({ who: who || 'Management', duration: 5200 }, o || {})); }
      function sayMgmt(text, o) { if (api.now() - S.lastRungSay < 2500) return false; return say(text, o); }
      function award(n, why) { return api.award(Math.max(-50, Math.min(50, n)), why); }
      function stat(n, v) { api.stat.inc('complaints-dept.' + n, v == null ? 1 : v); }
      function numLabel(i) { return S.ladder[i] === 'half' ? '7 1/2' : String(i + 1); }
      function shake() { if (isReduced()) return;
        wrap.classList.remove(k('shake')); void wrap.offsetWidth; wrap.classList.add(k('shake'));
        soon(200, function () { wrap.classList.remove(k('shake')); });
      }
      const STAMPS = { rej: ['REJECTED', ''], again: ['REJECTED (AGAIN)', ''], love: ['REJECTED (WITH LOVE)', ''], warm: ['DECLINED, WARMLY', ''], nope: ['NOPE (OFFICIAL)', ''], pre: ['REJECTED (PRE-EMPTIVE)', ''], unoff: ['ACCEPTED (UNOFFICIALLY)', 'green'], appr: ['APPROVED', 'green'], err: ['ACCEPTED IN ERROR (ERROR ACCEPTED)', 'green'], moist: ['DEFERRED (MOIST)', 'mint'], blue: ['REJECTED', 'blue'] };
      function stampEl(kind, tag) { const s = STAMPS[kind] || STAMPS.rej;
        return el('div', { class: k('stamp') + (s[1] ? ' ' + k('st-' + s[1]) : ''), 'aria-hidden': 'true' }, tag ? 'REJECTED (' + tag + ')' : s[0]);
      }
      function toast(t) { try { api.toast(t); } catch (e) { /* toasts are optional, like hope */ } }
      function FL(n) { try { return api.flag.get(n) === true; } catch (e) { return false; } }
      function cbLine() { const open = CB.filter(function (c) { return FL(c[0]) && !S.cbUsed[c[0]]; });
        if (!open.length) return '';
        const c = api.pick(open); S.cbUsed[c[0]] = 1; return c[1];
      }
      function phaseCalm() { return !S.cool && (S.phase === 'intake' || S.phase === 'slip') && !S.sceneOn && !S.special; }
      /* ================= skeleton DOM ================= */
      let wrap = null;
      const D = {};
      D.sign = el('div', { class: k('sign') }, 'WINDOW 4 IS OPEN (PROVISIONALLY)');
      D.clerks = el('div', { class: k('clerks'), 'aria-hidden': 'true' });
      D.name = el('div', { class: k('nameplate') });
      D.sand = el('span', { class: k('sandwich'), 'aria-hidden': 'true' }, '🥪');
      D.bell = el('button', { class: k('bell'), type: 'button', 'aria-label': 'Ring the bell', onclick: function () { ringBell(); } }, '🔔');
      D.rock = el('button', { class: k('smallrock'), type: 'button', 'aria-label': 'A small rock on the counter', hidden: true, onclick: function () { smallRock(); } }, el('span', { class: k('rockblob'), 'aria-hidden': 'true' }), el('span', { class: k('eye'), 'aria-hidden': 'true' }));
      D.pstamp = el('div', { class: k('pstamp'), 'aria-hidden': 'true' });
      D.arm = el('div', { class: k('arm'), 'aria-hidden': 'true' }, '🤚');
      D.curtain = el('div', { class: k('curtain'), 'aria-hidden': 'true', hidden: true });
      D.door = el('div', { class: k('door'), 'aria-hidden': 'true', hidden: true }, el('i', {}));
      D.cat = el('span', { class: k('cat'), 'aria-hidden': 'true', hidden: true }, '🐈');
      D.mini = el('div', { class: k('mini'), 'aria-hidden': 'true', hidden: true }, el('span', {}, '👩‍💼'));
      D.clock = el('div', { class: k('wallclock'), 'aria-hidden': 'true', hidden: true }, el('i', { class: k('hand1') }), el('i', { class: k('hand2') }));
      D.siren = el('div', { class: k('siren'), 'aria-hidden': 'true', hidden: true }, '🚨');
      D.smoke = el('div', { class: k('smoke'), 'aria-hidden': 'true', hidden: true }, '💨', '💨', el('span', { class: k('fan') }, '🌀'));
      D.winbtn = el('button', { class: k('winbtn'), type: 'button', 'aria-label': 'Window 4, which is a drawing', onclick: function () { knockWindow(); } });
      const diorama = el('div', { class: k('diorama') }, el('div', { class: k('window') }, D.curtain, D.clerks, D.cat, D.mini, D.door, el('div', { class: k('glass'), 'aria-hidden': 'true' }), D.winbtn, D.pstamp), D.sign, D.siren, D.clock, D.smoke, D.arm,
        el('div', { class: k('counter') }, D.sand, D.name, D.bell, D.rock));
      const banner = el('div', { class: k('banner'), role: 'status', hidden: true });
      const stage = el('div', { class: k('stage'), 'aria-live': 'polite', tabIndex: -1 });
      D.cool = el('div', { class: k('cool'), hidden: true }, el('div', { class: k('coolbox') }, el('span', {}, 'Cooling (fictitious)'), el('div', { class: k('bar') }, el('i', { class: k('coolfill') }))));
      D.dark = el('div', { class: k('dark'), 'aria-hidden': 'true', hidden: true });
      D.shred = el('div', { class: k('shredder'), 'aria-hidden': 'true' }, '▼ SHREDDER ▼');
      const trailEl = el('div', { class: k('trail') });
      const stagewrap = el('div', { class: k('stagewrap') }, stage, D.cool, D.dark, D.shred);
      /* side column */
      const floorsEl = el('div', { class: k('floors') });
      D.elev = el('span', { class: k('elev'), 'aria-hidden': 'true' }, '🧾');
      D.crumb = el('div', { class: k('crumb') }); D.crumb2 = el('div', { class: k('crumb2'), 'aria-hidden': 'true' });
      const building = el('div', { class: k('building') }, el('div', { class: k('btitle') }, 'The Building'), D.crumb, el('div', { class: k('shaft') }, floorsEl, D.elev));
      D.fill = el('i', { class: k('fill') });
      D.mval = el('div', { class: k('mval') });
      D.munit = el('div', { class: k('munit') });
      D.plaque = el('div', { class: k('plaque'), hidden: true }, 'Satisfaction: not the point. The point: not the point.');
      const meter = el('div', { class: k('meter'), hidden: true }, el('div', { class: k('thermo'), 'aria-hidden': 'true' }, D.fill), el('div', { class: k('mtext') }, el('div', { class: k('mhead') }, 'Satisfaction Index'), D.mval, D.munit), D.plaque);
      D.sandraN = el('b', {}, '0');
      D.binderN = el('b', {}, '0');
      D.dlist = el('div', { class: k('dlist'), hidden: true });
      D.dbtn = el('button', { class: k('dbtn'), type: 'button', 'aria-expanded': 'false', onclick: function () { toggleDrawer(); } });
      const side = el('div', { class: k('side') }, building, meter, el('div', { class: k('sandra') }, 'Sandra Has Cited: ', D.sandraN),
        el('div', { class: k('binder') }, 'Reasons Collected ', D.binderN, ' of ', el('b', {}, String(REASON_ALL.length + 1))), el('div', { class: k('drawer') }, D.dbtn, D.dlist));
      wrap = el('div', { class: k('root') + (reduced ? ' ' + k('reduced') : ''), dataset: { rung: '1', lap: String(S.lap), compact: '0', phase: 'intake' } },
        el('svg', { width: 0, height: 0, 'aria-hidden': 'true', style: 'position:absolute' }, el('filter', { id: 'cd-rough' }, el('feTurbulence', { type: 'fractalNoise', baseFrequency: '0.9', numOctaves: '2', result: 'n' }), el('feDisplacementMap', { in: 'SourceGraphic', in2: 'n', scale: '1.6' }))),
        banner, el('div', { class: k('grid') }, el('div', { class: k('main') }, diorama, D.crumb2, stagewrap, trailEl), side));
      root.appendChild(wrap);
      api.setTitle('Department of Complaints (Window 4)');
      /* ---------- diorama ---------- */
      function paintDiorama() { D.name.textContent = 'Brenda, ' + (S.lap >= 2 ? 'Acting ' + 'Acting '.repeat(Math.min(5, S.lap - 2)) + 'Rock' : 'Intake Clerk');
        D.curtain.hidden = sv.windowUses < 3; D.cat.hidden = sv.windowUses < 6; D.mini.hidden = sv.windowUses < 10; D.door.hidden = sv.knocks < 12;
        D.rock.hidden = S.lap < 2;
        D.rock.style.setProperty('--rs', String(1 + S.lap * 0.12));
        wrap.dataset.lap = String(S.lap);
        D.sand.title = SANDWICHES[Math.floor(sv.slips / 4) % SANDWICHES.length];
      }
      function setClerks(n, face) { D.clerks.textContent = '';
        for (let i = 0; i < n; i++) D.clerks.appendChild(el('span', { class: k('clerk'), style: { animationDelay: (i * 0.17) + 's' } }, face || '👩‍💼'));
      }
      function setSign(t) { D.sign.textContent = t; }
      function dioStamp(kind) { const s = STAMPS[kind] || STAMPS.rej;
        D.pstamp.textContent = s[0];
        D.pstamp.className = k('pstamp') + ' ' + k('on') + (s[1] ? ' ' + k('st-' + s[1]) : '');
        api.sfx('stamp'); shake();
        D.arm.classList.remove(k('swing')); void D.arm.offsetWidth; D.arm.classList.add(k('swing'));
        soon(2600, function () { D.pstamp.className = k('pstamp'); });
      }
      function ringBell() { if (S.bellOff) { api.sfx('blip'); return; }
        const n = api.now(); api.sfx('ding'); S.lastInput = n; stat('bells'); S.bellN++;
        S.bellT = S.bellT.filter(function (t) { return n - t < 5000 * T; }); S.bellT.push(n);
        D.bell.classList.remove(k('ring')); void D.bell.offsetWidth; D.bell.classList.add(k('ring'));
        if (S.bellT.length >= 6) { S.bellOff = true; S.bellT = []; D.bell.disabled = true; stat('bellsTaken'); say(BELL_BURST, { who: 'Brenda', mood: 'confused', priority: 1, force: true, duration: 6500 });
          soon(7000 * T, function () { S.bellOff = false; D.bell.disabled = false; });
          return;
        }
        say(S.bellN <= 4 ? deal('bell', BELL) : S.bellN === 5 ? BELL_MORE[0] : deal('bell2', BELL_MORE.slice(1)), { who: 'Brenda', duration: 5000 });
      }
      function knockWindow() { api.sfx('blip'); sv.knocks++; stat('knocks'); const n = sv.knocks;
        if (n === 12) { D.door.hidden = false; award(7.5, 'a door was drawn'); api.achieve('complaints-dept.door'); api.sfx('fanfare'); api.confetti(); saveNow();
          say(KNOCK_DOOR, { mood: 'proud', priority: 2, force: true, duration: 8000 }); return;
        }
        say(n < 12 ? KNOCK[n - 1] : deal('kd', KNOCK_AFTER), { mood: 'disappointed', priority: 1 });
      }
      let rockN = 0, rockT = 0;
      function smallRock() { api.sfx('pop'); stat('rockclicks');
        const n = api.now(); if (n - rockT > 6000) rockN = 0; rockT = n; rockN++;
        if (rockN < 7) { say(deal('rclk', ROCK_CLICKS), { who: 'Management' }); return; }
        rockN = 0;
        D.rock.classList.add(k('open'));
        D.clerks.classList.add(k('faint')); setClerks(1, '😵');
        say('Brenda has fainted. This is a first, and also a floor.', { who: 'Management', mood: 'panic', priority: 1 });
        api.achieve('complaints-dept.tuesdayrock');
        soon(900, function () { say('It is Tuesday.', { who: 'The Rock', mood: 'disappointed', priority: 2, force: true, duration: 4500 }); D.dark.hidden = false; api.sfx('tick'); });
        soon(2000, function () { D.dark.hidden = true; });
        soon(2600, function () { D.rock.classList.remove(k('open')); D.clerks.classList.remove(k('faint')); setClerks(S.rush ? S.clerkN : 1); });
      }
      S.clerkN = 1;
      /* ---------- side panels ---------- */
      let floorKey = '';
      function paintFloors() { const key = S.ladder.join(',');
        if (key !== floorKey) { floorKey = key; floorsEl.textContent = '';
          for (let i = S.ladder.length - 1; i >= 0; i--) { const id = S.ladder[i];
            floorsEl.appendChild(el('button', { class: k('floor'), type: 'button', dataset: { i: String(i) }, onclick: function () { say(deal('flr', FLOORCLK), { mood: 'smug' }); api.sfx('blip'); } },
              el('span', { class: k('fn') }, id === 'half' ? '7½' : String(i + 1)), el('span', { class: k('fe'), 'aria-hidden': 'true' }, ''), el('span', { class: k('ft') }, '???')));
          }
          if (S.lap >= 2) floorsEl.insertBefore(el('div', { class: k('floor') + ' ' + k('annex') }, el('span', { class: k('fn') }, '7½'), el('span', { class: k('fe') }, '🔼'), el('span', { class: k('ft') }, 'Floor 7 1/2 (Roof Annex). Elevator: a rumor')), floorsEl.firstChild);
        }
        const top = S.ladder.length - 1, rows = floorsEl.querySelectorAll('.' + k('floor') + '[data-i]');
        for (let j = 0; j < rows.length; j++) { const r = rows[j], i = +r.dataset.i, id = S.ladder[i], lit = i <= S.reached;
          r.classList.toggle(k('lit'), lit); r.classList.toggle(k('here'), i === S.pos); r.classList.toggle(k('tarp'), i === top && !lit);
          r.children[1].textContent = lit ? RM[id].e : '';
          r.children[2].textContent = lit ? RM[id].n : '???';
          r.setAttribute('aria-label', 'Floor ' + numLabel(i) + ': ' + (lit ? RM[id].n : 'dark'));
        }
        D.elev.style.top = 'calc(' + ((S.ladder.length - 1 - S.pos) + (S.lap >= 2 ? 1 : 0)) + ' * var(--cd-fh,30px) + 2px)';
        D.crumb.textContent = 'Rung ' + numLabel(S.pos) + ' of ' + S.ladder.length + ': ' + RM[S.ladder[S.pos]].n + (S.pos < S.ladder.length - 1 ? '  >  ??? (dark)' : '');
        wrap.dataset.rung = String(Math.min(S.pos + 1, 13)); D.crumb2.textContent = D.crumb.textContent; wrap.dataset.climb = S.pos > 0 ? '1' : '0';
      }
      function paintMeter() { const unit = S.lap <= UNITS.length ? UNITS[S.lap - 1] : UNITS_AFTER[(S.lap - UNITS.length - 1) % UNITS_AFTER.length];
        D.mval.textContent = fmtHalf(S.index);
        D.munit.textContent = unit;
        D.fill.style.setProperty('--fill', String(Math.round(Math.max(0, Math.min(1, S.index / 15)) * 100)) + '%');
        meter.hidden = !S.meterShown;
      }
      function paintCounters() { D.sandraN.textContent = api.fmt(S.sandra);
        D.binderN.textContent = String(S.seen.size);
        D.dbtn.textContent = '🗂️ Case File (' + S.cases.length + ')';
      }
      function toggleDrawer(force) { S.drawer = force == null ? !S.drawer : !!force;
        D.dbtn.setAttribute('aria-expanded', S.drawer ? 'true' : 'false');
        D.dlist.hidden = !S.drawer;
        if (S.drawer) { D.dlist.textContent = '';
          if (!S.cases.length) D.dlist.appendChild(el('div', { class: k('card') }, 'The Case File is empty. This is also a case.'));
          S.cases.slice().reverse().forEach(function (c) { D.dlist.appendChild(el('div', { class: k('card') }, el('b', {}, 'Case ' + c.no), ' · ' + c.rung, c.quote ? el('div', { class: k('cq') }, c.quote) : null));
          });
        }
      }
      function showBanner(text, key) { if (key) { if (S.bannerSaid[key]) return; S.bannerSaid[key] = 1; }
        banner.textContent = text; banner.hidden = false;
        soon(7000, function () { if (banner.textContent === text) banner.hidden = true; });
      }
      let lastW = root.clientWidth || 0, booted = false;
      function onResize() { const w = root.clientWidth || 0, c = w > 0 && w < 500, shrank = lastW > 0 && w < lastW - 8; if (w > 0) lastW = w;
        S.compact = c; wrap.dataset.compact = c ? '1' : '0';
        if (c && shrank) showBanner('The building has compressed. Please keep your arms inside the building.', 'compress');
        if (w > 0 && w <= 360 && shrank) { showBanner('The department cannot be this small. The department is this small.', 'tiny'); api.achieve('complaints-dept.tiny'); }
        if (window.innerWidth > 1200 && !S.bannerSaid.wide) soon(booted ? 0 : 2500, function () { showBanner('Complaint is too wide. We process portrait grievances only.', 'wide'); });
        if (S.rid === 'committee' && S.phase === 'rung') paintChair12();
      }
      let paintChair12 = function () {};
      function show() { const ae = document.activeElement, had = booted && (!ae || ae === document.body || stage.contains(ae)); // lint-ignore
        stage.textContent = ''; stage.className = k('stage'); stage.inert = !!S.cool;
        for (let i = 0; i < arguments.length; i++) if (arguments[i]) stage.appendChild(arguments[i]);
        if (had) { try { const c = Array.prototype.find.call(stage.querySelectorAll('button:not([disabled]):not([tabindex="-1"]),textarea,input,select'), function (x) { return !x.hidden && !x.closest('[hidden]'); }); (c || stage).focus({ preventScroll: true }); } catch (e) { /* focus is a luxury */ } }
      }
      /* ================= INTAKE ================= */
      let ta = null, tickerEl = null, tickN = 0, prevLen = 0, draftEl = null;
      function grievNo() { return String(S.caseNo).padStart(6, '0') + (S.lap >= 2 ? '/R' + S.lap : ''); }
      function paintTicker() { if (!tickerEl || !ta) return;
        const t = ta.value, ex = (t.match(/!/g) || []).length, c = t.length, tr = t.trim(), n = tr ? tr.split(/\s+/).length : 0, u = tickN % 5;
        const minus = Math.min(c, 2 * ex);
        tickerEl.textContent = u === 0 ? n + (n === 1 ? ' word' : ' words') : u === 1 ? c + ' characters' : u === 2 ? (c / 40).toFixed(1) + ' grievances' : u === 3 ? (c - minus) + ' Sentiments (minus ' + minus + ' for exclamation marks)' : (c / 25).toFixed(1) + ' sighs';
      }
      function resetDioramaMood() { wrap.classList.remove(k('dim')); D.clerks.classList.remove(k('faint'));
        setClerks(S.rush ? S.clerkN : 1);
        D.sign.classList.remove(k('flip'));
        if (!S.rush) setSign('WINDOW 4 IS OPEN (PROVISIONALLY)');
      }
      function toIntake(focus) { go('intake'); S.pos = 0; S.rid = 'brenda'; S.text = ''; S.firstAt = 0; S.instant = false; S.special = ''; S.skipped = false; S.expedited = false;
        S.idleStage = 0; S.idleN = 0; prevLen = 0; idleClear();
        S.lastInput = api.now();
        resetDioramaMood(); paintFloors(); paintCounters(); paintDiorama(); paintMeter(); paintTrail();
        wrap.dataset.rung = '1';
        ta = el('textarea', { class: k('ta'), rows: 4, maxlength: 200, placeholder: PLACEHOLDERS[0], 'aria-label': 'Your complaint', spellcheck: 'false', oninput: function () { const v = ta.value, added = v.length - prevLen;
          if (!S.firstAt && v.length) S.firstAt = api.now();
          if (added > 10) S.instant = true;
          prevLen = v.length; paintTicker();
          if (v.length >= 200 && !S.capSaid) { S.capSaid = true; say('Characters beyond 200 have been returned to you. They are in the post.', { who: 'Brenda', mood: 'smug' }); }
        } });
        tickerEl = el('b', { class: k('tickval') });
        const form = el('div', { class: k('form') }, el('div', { class: k('perf'), 'aria-hidden': 'true' }), el('div', { class: k('fhead') }, 'FORM C-1 (COMPLAINT, GENERAL, NOT SPECIFIC)'),
          el('div', { class: k('fno') }, 'Grievance No. ' + grievNo()), el('div', { class: k('margin') }, deal('margin', MARGINS)), ta, el('div', { class: k('ticker'), 'aria-hidden': 'true' }, el('span', {}, 'Word Count Under Review: '), tickerEl),
          el('button', { class: k('submit'), type: 'button', onclick: function () { submit(); } }, 'SUBMIT FOR PROCESSING'));
        show(form); paintTicker();
        if (focus) { try { ta.focus({ preventScroll: true }); } catch (e) { /* focus is optional */ } }
        if (!S.preempt) { S.preempt = true;
          later(7000 * T, function () { if (!ta || ta.value) return; dioStamp('pre'); say('Brenda has stamped a blank form. It was pre-emptive. It was also a form.', { who: 'Brenda', mood: 'smug', duration: 5000 }); });
        }
      }
      function submit() { if (S.phase !== 'intake' || S.cool) return;
        if (noteAction()) return;
        const raw = ta ? ta.value.slice(0, 200) : '', t = raw.trim();
        S.text = raw; S.submitAt = api.now();
        const nth = sv.filed + 1;
        sv.filed = nth; stat('filed');
        if (t) { api.stat.max('complaints-dept.longestComplaint', t.length);
          const sh = api.stat.get('complaints-dept.shortestComplaint');
          if (!sh || t.length < sh) api.stat.set('complaints-dept.shortestComplaint', t.length);
          if (!sv.firstComplaint) sv.firstComplaint = t.slice(0, 120);
        } else stat('emptyFiled');
        if (!S.firstSet) { S.firstSet = true; S.firstOfLap = t; }
        const low = normT(t).replace(/[.!?\s]+$/, '');
        let sp = '';
        if (low === 'rock' && S.pos < S.ladder.length - 1) sp = 'accept';
        else if (low === 'i want to speak to the manager') sp = 'manager';
        else if (/sandra/i.test(t)) sp = 'sandra';
        else if (S.mountFiled >= 7 && !S.recitalDone && S.cases.filter(function (c) { return c.quote; }).length >= 3) sp = 'recital';
        else if (sv.slips >= 12 && api.stat.get('complaints-dept.strikes') === 0) sp = 'strike';
        else if (nth === 100 || api.chance(1 / 200)) sp = 'accept';
        else if (nth >= 5 && api.chance(1 / 45)) sp = 'fun';
        else if (nth >= 5 && api.chance(1 / 55)) sp = 'phone';
        S.mountFiled++;
        if (!sv.sockSeen && (KW.sock.test(low) || api.flag.get('sockSeen') === true || api.flag.get('pet-rock.sockSeen') === true)) S.pendingSock = true;
        if (S.firstAt && S.submitAt - S.firstAt < 1000 && t.length > 3 && api.chance(0.5)) sayMgmt(deal('fast', FASTSAY), { mood: 'confused' });
        saveNow();
        startCeremony(sp);
      }
      /* ================= CEREMONY ================= */
      function startCeremony(sp) { go('ceremony'); S.special = sp; S.skipped = false; S.expedited = false;
        if (sp === 'sandra') { sandraScene(); return; }
        if (sp === 'manager') { managerScene(); return; }
        if (sp === 'fun') { funScene(); return; }
        if (sp === 'phone') { phoneScene(); return; }
        if (sp === 'recital') { recitalScene(); return; }
        if (sp === 'strike') { strikeScene(); return; }
        const empty = !S.text.trim(), base = empty && api.stat.get('complaints-dept.emptyFiled') <= 1 ? 6000 : 3500, D0 = api.selftest ? 600 : Math.round(base * (sv.filed < 3 ? 1 : sv.filed < 6 ? 0.6 : 0.35)), t0 = api.now();
        const skipBtn = btn('Skip ceremony (Space)', function () { skipCeremony(); }, 'small');
        const cap = el('div', { class: k('ccap') }, CAPTIONS[0]), reel = el('div', { class: k('reel') }, '...'), bar = el('i', { class: k('cfill') });
        const pct = el('span', { class: k('cpct') }, '0%'), notes = el('div', { class: k('cnotes') }), marks = el('div', { class: k('marks') });
        S.cNotes = notes;
        const belt = el('button', { class: k('belt'), type: 'button', tabIndex: -1, 'aria-hidden': 'true', onclick: function () { skipCeremony(); } },
          el('span', { class: k('folder'), 'aria-hidden': 'true' }, '📁'), el('span', { class: k('belttext') }, 'Conveyor of Grievances (click to skip)'));
        show(el('div', { class: k('ceremony') }, el('div', { class: k('chead') }, 'PROCESSING' + (empty ? ' (VOID POOL)' : '')), belt, reel, cap, el('div', { class: k('barwrap') }, el('div', { class: k('bar') }, bar), pct), skipBtn, marks, notes));
        try { skipBtn.focus({ preventScroll: true }); } catch (e) { /* ok */ }
        api.sfx('whoosh'); say(deal('c0', COMM[0]), { who: 'Brenda', duration: 5000 });
        if (sv.filed === 3) soon(2500, function () { if (S.phase === 'ceremony') say("The ceremony has been abbreviated at the ceremony's own request. It said it had seen this one.", { mood: 'smug' }); });
        let ri = 0, ci = 0;
        const rt = every(130, function () { reel.textContent = REEL[ri++ % REEL.length]; });
        later(0.45 * D0, function () { api.clearInterval(rt); reel.textContent = api.pick(REEL); api.sfx('ding'); say(deal('c1', COMM[1]), { mood: 'confused' }); });
        const stampAt = empty ? [0.4, 0.55, 0.7, 0.8] : [0.55, 0.68, 0.8];
        stampAt.forEach(function (u, i) { later(u * D0, function () { api.sfx('stamp'); shake(); marks.appendChild(el('span', { class: k('mark') }, 'STAMP ' + (i + 1))); if (i === 0) say(deal('c2', COMM[2]), { mood: 'confused' }); }); });
        [0.1, 0.3, 0.5].forEach(function (u, i) { later(u * D0, function () { notes.appendChild(el('div', {}, fill(deal('rc' + i, RECEIPT[i]), { CASE: grievNo() }))); }); });
        every(60, function () { const u = Math.min(1, (api.now() - t0) / D0);
          const p = u < 0.3 ? u / 0.3 * 40 : u < 0.7 ? 40 + (u - 0.3) / 0.4 * 59 : u < 0.9 ? 99 : 41;
          bar.style.width = p.toFixed(0) + '%'; pct.textContent = p.toFixed(0) + '%';
          const c = Math.min(CAPTIONS.length - 1, Math.floor(u * CAPTIONS.length));
          if (c !== ci) { ci = c; cap.textContent = CAPTIONS[c]; api.sfx('tick'); }
        });
        later(0.85 * D0, function () { say(deal('c3', COMM[3]), { mood: 'disappointed' }); });
        later(D0, function () { endCeremony(); });
      }
      function skipCeremony() { if (S.phase !== 'ceremony' || S.sceneOn || S.special === 'sandra' || S.special === 'manager') return;
        S.skipped = true; stat('skipped');
        
        say('Skipped Ceremony Surcharge: 0 Meh. The ceremony would like you to know it noticed.', { mood: 'disappointed' });
        api.sfx('pop');
        endCeremony();
      }
      function endCeremony() { if (S.phase !== 'ceremony') return;
        if (S.special === 'accept') acceptScene(); else makeSlip('brenda', {});
      }
      function expedite() { if (S.phase !== 'ceremony' || S.expedited || S.special) return;
        S.expedited = true;
        if (S.cNotes) S.cNotes.appendChild(el('div', {}, 'Expedite Fee: 1 paper clip, deducted from nothing.'));
      }
      /* ---------- special scenes ---------- */
      function sandraScene() { S.quiet = api.now() + 3000 * T;
        show(el('div', { class: k('special') }, el('div', { class: k('bigtext') }, 'Sandra Has Entered The Chat.'), el('div', { class: k('rline') }, 'Brenda has put down her sandwich, which has never happened.'),
          el('button', { class: k('btn'), type: 'button', onclick: function () { api.sfx('blip'); } }, 'Do not look directly at the form')));
        wrap.classList.add(k('dim')); setClerks(2, '👀');
        stat('sandraSummoned'); api.achieve('complaints-dept.sandra');
        later(3000 * T, function () { wrap.classList.remove(k('dim')); setClerks(S.rush ? S.clerkN : 1);
          say('Please do not do that.', { mood: 'panic', force: true, priority: 2 });
          makeSlip('brenda', { primary: SANDRA_REASON, kind: 'sandra' });
        });
      }
      function funScene() { S.sceneOn = true; stat('funBreaks'); let n = 0, done = false;
        const bal = el('div', { class: k('balloons'), 'aria-hidden': 'true' }, '🎈🎈🎈');
        const hb = el('button', { class: k('btn') + ' ' + k('coral') + ' ' + k('big'), type: 'button', onclick: function () { pop(); } }, 'Have fun');
        show(el('div', { class: k('special') }, el('div', { class: k('bigtext') }, 'MANDATORY FUN BREAK'), el('div', { class: k('rline') }, 'Fun has been scheduled for you. Attendance is mandatory. Enjoyment is optional, in the sense that it is also mandatory.'), bal, hb));
        api.sfx('honk'); say('Attention. A Mandatory Fun Break is in progress. Please have it at once. A supervisor is watching for smiles.', { mood: 'proud', priority: 1, force: true });
        function pop() { if (done || S.phase !== 'ceremony') return; n++; api.sfx('pop'); bal.textContent = '🎈'.repeat(Math.max(0, 3 - n)) + '🎉'.repeat(Math.min(3, n));
          say(FUN_LINES[Math.min(2, n - 1)], { who: n >= 3 ? 'Brenda' : 'Management', mood: 'proud', priority: 1 });
          if (n >= 3) end();
        }
        function end() { if (done || S.phase !== 'ceremony') return; done = true; hb.disabled = true; award(3, 'mandatory fun'); stat('funHad'); api.achieve('complaints-dept.fun'); api.confetti(undefined, undefined, 12);
          say('Fun has concluded. Attendance: 100 percent. Enjoyment: 7 1/2. The 7 1/2 has been rounded up to 7 1/2.', { mood: 'smug', priority: 1, force: true, duration: 6500 });
          later(sc(1800), function () { makeSlip('brenda', { stamp: 'love', flavor: ['Your complaint attended the Fun and stood near the snacks. There were no snacks. It stood near where they would be.'], primary: 'Rejected, but cheerfully. The Fun was asked to review your complaint and found it a lot to do on a break.' }); });
        }
        later(api.selftest ? 3000 : 20000, end);
      }
      function phoneScene() { S.sceneOn = true; stat('phoneCalls'); let done = false;
        const ans = btn('Answer', function () { end(true); }, 'coral'), ring = btn('Let it ring', function () { end(false); });
        show(el('div', { class: k('special') }, el('div', { class: k('phone'), 'aria-hidden': 'true' }, '☎️'), el('div', { class: k('rline') }, 'A phone is ringing on the counter. It is plugged into nothing. It is for you.'), el('div', { class: k('qbtns') }, ans, ring)));
        api.sfx('buzz'); say('The phone on the counter has been ringing since before you arrived. Brenda has asked that somebody take it. She did not say who. She looked at you.', { mood: 'confused', priority: 1, force: true });
        function end(took) { if (done || S.phase !== 'ceremony') return; done = true; ans.disabled = true; ring.disabled = true; api.sfx(took ? 'bell' : 'sad'); if (took) award(2, 'took the call');
          let line = took ? deal('ph', PHONE_LINES) : 'The phone rings 7 1/2 times and stops. It has left a message. The message is a dial tone, which Brenda has filed.';
          if (took && FL('metToaster') && api.chance(0.5)) line = "Caller: 'Warm. Complaint. Noted. Crisp.' (The Toaster, at some distance.)";
          say(line, { mood: 'confused', priority: 1, force: true, duration: 7000 });
          later(sc(2400), function () { makeSlip('brenda', { stamp: 'rej', flavor: ['A complaint about you was received by telephone. It was taken down in ' + (took ? 'pencil.' : 'the dial tone.')], primary: 'Rejected. The complaint about you has been rejected. It was from you, from earlier. Neither of you has been told.' }); });
        }
        later(api.selftest ? 3000 : 20000, function () { end(false); });
      }
      function managerScene() { let started = false;
        const strip = el('div', { class: k('years'), 'aria-live': 'off' }, 'YEAR 0');
        const wait = el('button', { class: k('btn') + ' ' + k('coral'), type: 'button', onclick: function () { startWait(); } }, 'Wait');
        show(el('div', { class: k('special') }, el('div', { class: k('office') }, el('span', { class: k('chair'), 'aria-hidden': 'true' }, '🪑'), el('span', { class: k('ring'), 'aria-hidden': 'true' }, '☕')),
          el('div', { class: k('note') }, 'Back in 5 (years).'), el('div', { class: k('rline') }, 'The Manager rejects you by not being there. The stamp thuds on its own.'), strip, wait));
        api.sfx('stamp'); shake(); stat('managerAsked');
        function startWait() { if (started) return; started = true; wait.disabled = true;
          const W = api.selftest ? 1000 : 8000;
          for (let y = 1; y <= 5; y++) later(W * y / 5 - W / 5 + 10, function () { strip.textContent = 'YEAR ' + y; api.sfx('tick'); });
          later(W + 60, function () { strip.textContent = 'YEAR 5';
            say('This is awkward. I am the voice. I cannot also be the manager. Please complain to me later.', { mood: 'confused', priority: 2, force: true });
            award(3, 'waited for the manager'); api.achieve('complaints-dept.manager');
            show(el('div', { class: k('special') }, el('div', { class: k('office') }, el('span', { class: k('chair'), 'aria-hidden': 'true' }, '🪑'), el('span', { class: k('ring') }, '🎙️')), el('div', { class: k('rline') }, 'The chair is occupied by Management itself. Management is not sure it is allowed to sit.'), el('button', { class: k('btn'), type: 'button', onclick: function () { makeSlip('brenda', {}); } }, 'Receive your slip')));
            later(2500 * T, function () { makeSlip('brenda', {}); });
          });
        }
        later(20000 * (api.selftest ? 0.15 : 1), startWait);
      }
      function acceptScene() { const wait = 5000 * T; S.sceneOn = true;
        show(el('div', { class: k('special') }, el('div', { class: k('hugestamp') }, 'APPROVED'), el('div', { class: k('rline') }, 'A complaint has been accepted. Please remain seated.'),
          el('button', { class: k('btn'), type: 'button', onclick: function () { api.sfx('blip'); reveal(); } }, 'Remain seated')));
        api.sfx('fanfare'); api.confetti(); shake(); wrap.classList.add(k('flick')); soon(900, function () { wrap.classList.remove(k('flick')); });
        say('Alert. A complaint has been accepted. Clearing the area. Please remain seated and do not be resolved.', { mood: 'panic', priority: 2, force: true });
        let done = false;
        function reveal() { if (done || S.phase !== 'ceremony') return; done = true;
          say('Update: the accepted complaint belonged to someone else. It was a complaint about a rock. You have been thanked for helping the other complainant.', { mood: 'confused', priority: 1, force: true, duration: 7000 });
          award(10, 'accepted in error'); api.achieve('complaints-dept.accepted'); stat('accepted');
          makeSlip('brenda', { kind: 'accept', stamp: 'err', primary: 'The accepted complaint belonged to someone else. It was a complaint about a rock. You have been thanked for helping the other complainant.' });
        }
        later(wait, reveal);
      }
      /* ---------- set pieces: the Recital, the Strike, the Reversal ---------- */
      function recitalScene() { S.sceneOn = true; S.recitalDone = true; stat('recitals');
        const qs = api.shuffle(S.cases.filter(function (c) { return c.quote; }).map(function (c) { return c.quote; })).slice(0, 5), reading = el('div', { class: k('reading') }), claps = el('div', { class: k('balloons'), 'aria-hidden': 'true' }, '');
        show(el('div', { class: k('special') }, el('div', { class: k('bigtext') }, 'ANNUAL COMPLAINTS RECITAL'), el('div', { class: k('rline') }, 'Ode to Grievance (Provisional). Read by Brenda, who has stood up. It is a first, and a stand.'), reading, claps));
        setClerks(1, '🎤'); api.sfx('bell'); say('Attention. The Annual Complaints Recital is under way. It is annual because it is now. Please do not clap until the Department has stopped being surprised.', { mood: 'proud', priority: 1, force: true, duration: 6500 });
        qs.forEach(function (q, i) { later(sc(1500) * (i + 1), function () { reading.appendChild(el('p', {}, '"' + q + '"')); api.sfx(i % 2 ? 'bloop' : 'blip'); }); });
        later(sc(1500) * (qs.length + 1), function () { claps.textContent = '👏👏👏👏👏'; api.sfx('tada'); api.confetti(undefined, undefined, 10); award(3, 'Annual Complaints Recital'); api.achieve('complaints-dept.ode'); setClerks(S.rush ? S.clerkN : 1);
          say('The Ode has been read. It was about you, in your own words, which the Department found unforgivably moving.', { mood: 'smug', priority: 1, force: true, duration: 6500 }); });
        later(sc(1500) * (qs.length + 3), function () { makeSlip('brenda', { stamp: 'love', flavor: ['The Ode was received by the Poetry Board, which meets on the second Friday of a month that was decommissioned.'], primary: 'Rejected. The Ode does not scan. It does not rhyme. It opens with "' + (qs[0] || 'nothing') + '", which is not an opening, it is a grievance.' }); });
      }
      function strikeScene() { S.sceneOn = true; stat('strikes'); let done = false;
        const DEM = [['A longer lunch', 'LONGER LUNCH'], ['Blue ink', 'BLUE INK'], ['7 1/2 breaks', '7 1/2 BREAKS']];
        const buttons = DEM.map(function (d, i) { return btn(d[0], function () { settle(i); }, i === 1 ? 'coral' : ''); });
        show(el('div', { class: k('special') }, el('div', { class: k('balloons'), 'aria-hidden': 'true' }, '✊📌📎 ✊📌📎 ✊📌📎'), el('div', { class: k('bigtext') }, 'STAMP STRIKE'), el('div', { class: k('rline') }, 'Signs read: NO STAMP, NO PEACE. WE WANT A DIFFERENT INK. The stamp is on the picket line and has asked to be called Stamp.'),
          el('div', { class: k('qbtns') }, buttons), el('p', { class: k('tiny') }, 'Choose the demand to grant. Provisionally. Click one, or press 1 to 3.')));
        api.sfx('honk'); say('Attention. The stamp has downed itself. Complaints cannot be rejected until a demand is met. Please choose one. The stamp is not good at waiting, and has been doing it professionally.', { mood: 'panic', priority: 1, force: true, duration: 7000 });
        if (FL('metStapler')) later(sc(2500), function () { say("The Stapler's Union Rep has sent a solidarity staple. It is in the tray. It is asking to be counted.", { who: "The Stapler's Union Rep", mood: 'smug' }); });
        function settle(i) { if (done || S.phase !== 'ceremony') return; done = true; buttons.forEach(function (b) { b.disabled = true; }); api.sfx('tada'); S.demand = DEM[i][1]; S.demandN = 3; award(4, 'Stamp Strike settled'); api.achieve('complaints-dept.strike'); api.confetti(undefined, undefined, 10);
          say('Granted, provisionally. ' + DEM[i][0] + ' has been agreed with the stamp, which accepted it with a thud. The strike is over.', { mood: 'proud', priority: 1, force: true, duration: 6500 });
          later(sc(2400), function () { makeSlip('brenda', { stamp: 'rej', flavor: ['The stamp returned to work at ' + hhmm() + ', on terms that are provisional and also terms.'], primary: 'Rejected. This rejection was issued under a settlement. The settlement is pending a rejection of the settlement.' }); });
        }
        S.onDigit = function (n) { if (n >= 1 && n <= 3) settle(n - 1); };
        later(api.selftest ? 3000 : 20000, function () { settle(api.randInt(0, 2)); });
      }
      function reversalScene() { go('reversal'); stat('reversals'); let done = false;
        const why = el('input', { class: k('inp'), type: 'text', maxlength: 80, 'aria-label': 'Reason for rejecting Brenda', placeholder: 'Your reason. Brenda has never had one.', autocomplete: 'off' });
        const form = el('div', { class: k('form') }, el('div', { class: k('fhead') }, 'FORM C-1 (COMPLAINT, FILED BY BRENDA)'), el('div', { class: k('fno') }, 'Grievance No. ' + grievNo() + '-B'),
          el('textarea', { class: k('ta'), rows: 2, readOnly: true, 'aria-label': "Brenda's complaint", value: 'I would like to complain about the same thing as always.' }), el('label', { class: k('tiny') }, 'Reason for rejection (optional, unprecedented): '), why, btn('REJECT BRENDA', function () { reject(); }, 'coral'));
        show(el('div', { class: k('special') }, el('div', { class: k('rline') }, 'Window 4 has been vacated. Brenda has slid a form under the glass for you to stamp. She does not know how this works from this side.'), form));
        setClerks(1, '😬'); say('Brenda has filed a complaint. It is her first. Please reject it. She has never seen it done from the front.', { mood: 'confused', priority: 1, force: true, duration: 7000 });
        function reject() { if (done || S.phase !== 'reversal') return; done = true; why.disabled = true; const r = clean(why.value).slice(0, 80) || 'because Brenda asked'; api.sfx('stamp'); shake(); dioStamp('unoff'); setClerks(1, '😊');
          award(5, 'Brenda was rejected'); api.achieve('complaints-dept.reversal'); stat('sandraCitations');
          say('Rejected. Per policy: ' + r + '.', { mood: 'proud', priority: 2, force: true, duration: 7000 });
          later(sc(2600), function () { say("Brenda: 'Nobody has ever given me a reason.' She has put a tiny sandwich on the counter for you. It is a quarter. She was saving it.", { who: 'Brenda', mood: 'proud', priority: 1, force: true, duration: 8000 }); });
          later(sc(5600), function () { setClerks(S.rush ? S.clerkN : 1); toIntake(true); say('Next.', { who: 'Brenda', force: true }); });
        }
        later(api.selftest ? 3000 : 30000, reject);
      }
      /* ================= matcher ================= */
      function extractQuote(f, key) { if (f.empty) return '';
        if (key === 'obvious' && f.obviousWord) return f.obviousWord;
        const toks = f.words, rx = KW[key] || null;
        const hit = rx ? toks.findIndex(function (w) { return rx.test(w.toLowerCase()); }) : -1;
        const span = toks.length > 5 ? 3 : toks.length;
        const i = hit >= 0 ? Math.max(0, Math.min(hit - 1, toks.length - span)) : api.randInt(0, Math.max(0, toks.length - span));
        let frag = clean(toks.slice(i, i + span).join(' ').replace(/^[^\w']+|[^\w']+$/g, '')).slice(0, 40).trim();
        if (!frag) frag = clean(f.t).slice(0, 40).trim();
        return frag;
      }
      function pickReason(f, forceMild, rid) { if (forceMild && !['toast', 'sock', 'gerald', 'plant', 'stapler', 'tuesday', 'brenda', 'refund', 'manager', 'rock', 'food'].some(function (kk) { return f[kk]; })) return { key: 'mild', text: MILD, tmpl: MILD };
        if (S.lap >= 6 && !S.rareUsed && rid === 'brenda') { S.rareUsed = true; return { key: 'rare', text: RARE_REASON, tmpl: RARE_REASON }; }
        if (!S.seen.has(RIDX.get(FINAL_REASON)) && S.seen.size >= REASON_ALL.length - 1) return { key: 'final', text: FINAL_REASON, tmpl: FINAL_REASON };
        for (let i = 0; i < ORDER.length; i++) { const kk = ORDER[i];
          if (!f[kk]) continue;
          if (kk === 'meta') { S.metaDepth++; S.metaMax = Math.max(S.metaMax, S.metaDepth);
            const text = META[Math.min(S.metaDepth, META.length) - 1];
            return { key: 'meta', text: text, tmpl: text };
          }
          if (kk === S.lastKey) continue;
          const bk = kk === 'digits' && f.bignum ? 'bignum' : kk;
          if (!BANKS[bk]) continue;
          const text = deal('b:' + bk, BANKS[bk]);
          return { key: kk, text: text, tmpl: text };
        }
        const al = [];
        if (f.n > 0) al.push(isPrime(f.n) ? 'prime' : f.n % 2 === 0 ? 'even' : 'odd');
        if (f.FIRST) al.push('first');
        if (/\.$/.test(f.t)) al.push('stop'); else if (f.t && !/[.!?]$/.test(f.t)) al.push('nostop');
        al.push('clock'); if (f.LONGEST) al.push('longest'); if (f.chars > 0) al.push('chars');
        const cand = al.filter(function (x) { return 'a:' + x !== S.lastKey; });
        if (api.chance(0.5) && cand.length) { const x = api.pick(cand); return { key: 'a:' + x, text: ALWAYS[x], tmpl: ALWAYS[x] }; }
        const gb = dealBag('G', G), line = gb.next();
        return { key: 'G', text: gb.round > 1 ? line.replace(/^Rejected\. /, gb.round === 2 ? 'Rejected, again, for a reason you have previously been given and which is still good. ' : 'Rejected, again. As before: ') : line, tmpl: line };
      }
      function hhmm() { const d = new Date(); return String(d.getHours()).padStart(2, '0') + ':' + String(d.getMinutes()).padStart(2, '0'); } // lint-ignore
      function clauseLine(f, quote) { const n = S.sandra, cl = clauseFor(n, PN), ct = deal('ctitle', CTITLES);
        if (!f.t) return fill('Your complaint, quoted in full, reads: "". The Department found it clear. See %CLAUSE.', { CLAUSE: cl });
        const qq = quote ? '"' + quote + '"' : '"' + clean(f.t).slice(0, 40) + '"';
        const olds = S.cases.filter(function (c) { return c.quote; }), old = olds.length ? olds[api.randInt(0, olds.length - 1)] : null;
        const oldNo = old ? String(old.no).padStart(6, '0') : '', oldQ = old ? '"' + old.quote + '"' : '';
        const m = { QQ: qq, CLAUSE: cl, CTITLE: ct, OLDCASE: oldNo, OLDQQ: oldQ, OLDREASON: old ? '"' + cutWords(clean(old.reason.replace(/^Rejected\.\s*/, '')), 90) + '"' : '' };
        if (n >= 18 && old) return fill('On Case %OLDCASE the Department quoted you saying %OLDQQ. You have now said %QQ. That is a quote of a quote under %CLAUSE, %CTITLE.', m);
        if (n >= 10 && n <= 17 && old) return fill('The Department previously stated, %OLDREASON This has not changed. It has been stamped again for emphasis. See %CLAUSE.', m);
        if (n >= 5 && n <= 9 && S.cases.length >= 3 && old) return fill('As you stated on Case %OLDCASE, %OLDQQ. This is relevant under %CLAUSE, %CTITLE, and so is the fact that you stated it.', m);
        return fill('Your phrase %QQ falls under %CLAUSE, %CTITLE.', m);
      }
      /* ================= THE SLIP ================= */
      const MATCH_RUNGS = ['brenda', 'desmond', 'queue', 'contrition'];
      const SIGN_FULL = 'We apologize for the inconvenience of being right.';
      function signoffFor(rid) { if (rid === 'rock' || rid === 'bigrock' || rid === 'cloudrock') return '';
        const n = S.pos + 1;
        return n <= 3 ? SIGN_FULL : n <= 6 ? 'We apologize for being right.' : n <= 9 ? 'Apologies.' : '.';
      }
      function paintTrail(skip) { trailEl.textContent = ''; const list = skip ? S.trail.slice(1) : S.trail;
        if (!list.length && !S.postcard) return;
        trailEl.appendChild(el('div', { class: k('thead') }, 'Paper Trail'));
        list.forEach(function (t) { trailEl.appendChild(el('div', { class: k('tslip') }, el('b', {}, 'Case ' + t.no + ' · ' + t.rung), el('span', {}, t.reason))); });
        if (S.trailTotal > S.trail.length) trailEl.appendChild(el('div', { class: k('tfold') }, 'Previous Disappointments (' + (S.trailTotal - S.trail.length) + ')'));
        if (S.postcard) SOCKS.forEach(function (s) { trailEl.appendChild(el('div', { class: k('tslip') + ' ' + k('postcard') }, s)); });
      }
      function growWindow() { const u = sv.windowUses;
        if (u === 3) say('Window 4 now has a curtain. It was drawn on. It is also drawn.', { mood: 'confused', force: true });
        else if (u === 6) say('Window 4 now has a tiny cat. The cat is also a drawing and has no comment.', { mood: 'smug', force: true });
        else if (u === 10) say('Window 4 now contains a smaller drawing of Window 4. That window has a smaller Brenda. She is also eating.', { mood: 'confused', force: true });
        else if (u === 15) say("We have been informed that Window 4 is 'not a window'. The Department disagrees and has filed a window complaint.", { mood: 'smug', duration: 6000, force: true });
        paintDiorama();
      }
      function makeSlip(rid, o) { o = o || {};
        const isB = rid === 'brenda', kind = o.kind || '';
        const rockish = rid === 'rock' || rid === 'bigrock' || rid === 'cloudrock';
        const f = analyze(S.text, { prevText: isB ? S.prevText : '', lastReason: S.lastReason, firstAt: isB ? S.firstAt : 0, submittedAt: S.submitAt || 0, instant: isB && S.instant });
        const firstEver = isB && api.stat.get('complaints-dept.rejected') === 0;
        let key = '', tmpl = '', reason = '';
        if (kind) reason = o.primary || '';
        else if (S.rush && !rockish) { reason = COMBINED; key = 'rush'; }
        else if (o.primary) reason = o.primary;
        else if (S.warmNext && !rockish) { reason = APOLOGY_SLIP; key = 'warm'; }
        else if (isB && sv.windowUses === 14 && !firstEver) { reason = 'Rejected. The window complaint has been rejected. It is a drawing of a complaint, and also of a window.'; key = 'window'; }
        else if (MATCH_RUNGS.indexOf(rid) >= 0) { let p = pickReason(f, firstEver, rid);
          if (p.key === 'a:clock' && api.chance(0.3)) p = pickReason(f, false, rid);
          key = p.key; tmpl = p.tmpl; reason = p.text;
        } else reason = 'Rejected.';
        const plain = key === 'rush' || key === 'warm' || kind === 'accept';
        const quote = (plain || rockish || kind === 'moist') ? '' : extractQuote(f, key);
        reason = fill(reason, { NUM: f.NUM, NAME: f.NAME, FOOD: f.FOOD, ECOUNT: f.ECOUNT, WORDS: f.WORDS, FIRST: f.FIRST, LONGEST: f.LONGEST, CHARS: f.CHARS, TIME: hhmm(), QQ: quote ? '"' + quote + '"' : '', ANSWER: o.answer || '' });
        if (!plain && !kind && !rockish && /^Rejected\. /.test(reason) && api.chance(1 / 6)) reason = deal('opn', ['Declined. ', 'Noted, and rejected. ', 'Not this time, and not any time. ']) + reason.slice(10);
        go('slip'); S.special = '';
        if (kind === 'sandra') tmpl = SANDRA_REASON; if (tmpl && RIDX.has(tmpl)) S.seen.add(RIDX.get(tmpl));
        if (S.seen.size >= 25) api.achieve('complaints-dept.reasons25');
        const showClause = !plain && kind !== 'moist';
        let clauseText = '';
        if (showClause) { S.sandra++; stat('sandraCitations');
          clauseText = rockish ? "Clause 1. Clause 1 says: 'Clause 1.'" : clauseLine(f, quote);
          if (S.sandra === 10) say('Clause 10 contradicts Clause 3. Management has asked them to talk it out. They are not on speaking terms.', { mood: 'confused', priority: 1, force: true });
          else if (S.sandra === 25) { api.achieve('complaints-dept.sandra25'); award(5, 'cited by Sandra'); say('Sandra has cited you by name. Sandra has thanked you. Sandra has not thanked you.', { mood: 'proud', force: true }); }
          else if (sv.slips - S.sandraFlagAt >= 8 && api.chance(0.25)) { S.sandraFlagAt = sv.slips; sayMgmt(deal('sflag', SANDRA_FLAGS), { mood: 'confused' }); }
        }
        const remedy = !plain && !kind && !rockish && (MATCH_RUNGS.indexOf(rid) >= 0 || api.chance(0.4)) ? deal('remedy', REMEDY) : '';
        /* bookkeeping */
        sv.slips++; S.slipsLap++; if (kind !== 'moist' && kind !== 'accept') stat('rejected'); stat('stamps');
        if (kind !== 'moist' && kind !== 'accept') S.lastKey = key;
        S.lastReason = reason;
        if (isB && f.t) S.prevText = f.t;
        if (isB && !plain) { sv.windowUses++; growWindow(); }
        if (sv.slips % 4 === 0) { const sw = SANDWICHES[Math.floor(sv.slips / 4) % SANDWICHES.length]; soon(1800, function () { say(sw, { who: 'Brenda', duration: 6000, mood: 'smug' }); }); paintDiorama(); }
        sv.decoyStage = Math.min(4, Math.floor(sv.slips / 4));
        const dir = kind === 'moist' || kind === 'accept' ? -0.3 : 0.1 + api.rand() * 0.3;
        if (!S.settled) { const before = S.index; S.index = Math.max(0, S.index + dir);
          if (dir > 0 && S.meterShown && !S.thermoSaid) { S.thermoSaid = true; soon(2500, function () { say('Satisfaction Index: up ' + (S.index - before).toFixed(1) + ' degrees. Per policy, this is the wrong direction, and so the right one.', { mood: 'smug' }); }); }
        } else S.index = 0;
        paintMeter();
        let amt = kind === 'accept' || kind === 'moist' ? 0 : S.rush ? 0 : (f.empty && isB ? 1 : 0.5);
        if (S.skipped && isB) { amt = 0; S.skipped = false; }
        if (key === 'warm') { amt += 2; S.warmNext = false; }
        const isMeta = key === 'meta' || !!o.meta;
        if (isMeta) { amt += 0.5; if (key === 'meta') stat('metaComplaints'); if (S.metaDepth >= 7) { api.achieve('complaints-dept.meta7'); if (S.metaDepth === 7) say('The form has taken out a loan from the future. The future has asked for the form back.', { mood: 'confused', priority: 1, force: true }); } }
        if (amt > 0) award(amt, 'Rejection Participation Payment');
        S.cases.push({ no: S.caseNo, rung: rid === 'brenda' ? 'Brenda, Window 4' : RM[rid].n, text: S.text.slice(0, 200), reason: reason.slice(0, 160), quote: quote });
        if (S.cases.length > 40) S.cases.shift();
        S.trail.unshift({ no: String(S.caseNo).padStart(6, '0'), rung: RM[rid].n.split(',')[0], reason: reason.slice(0, 70) + (reason.length > 70 ? '...' : '') });
        S.trailTotal = (S.trailTotal || 0) + 1; if (S.trail.length > 6) S.trail.length = 6;
        if (S.pendingSock) { S.pendingSock = false; S.postcard = true; sv.sockSeen = true; api.flag.set('complaints-dept.sockSeen', true); api.flag.set('sockSeen', true); } // lint-ignore
        paintTrail(true); paintCounters(); saveNow();
        if (S.cases.length && S.drawer) toggleDrawer(true);
        /* ---- build the receipt ---- */
        const stampKind = o.stamp || (kind === 'moist' ? 'moist' : rid === 'desmond' ? 'blue' : rid === 'intern' ? 'love' : (rid === 'committee' || rid === 'gerald') ? 'warm' : (rid === 'mirror' || rid === 'vane' || rid === 'stapler' || rid === 'hat' || rid === 'tuesday' || rid === 'half') ? 'nope' : (key === 'repeat' || S.lap >= 2) ? 'again' : 'rej');
        let dtag = ''; if (S.demandN > 0 && S.demand && !/green|mint/.test((STAMPS[stampKind] || STAMPS.rej)[1])) { dtag = S.demand; S.demandN--; if (!S.demandN) soon(2600, function () { say('The strike is over. The stamp has returned. It has asked that nobody mention the strike. The stamp mentioned the strike.', { mood: 'smug', priority: 1 }); }); }
        const body = el('div', { class: k('sbody') });
        const add = function (n) { if (n) body.appendChild(n); };
        add(el('div', { class: k('stampbox') }, stampEl(key === 'warm' ? 'love' : stampKind, dtag)));
        if (key === 'warm') { add(el('p', { class: k('sreason') + ' ' + k('cursive') }, reason));
        } else { add(el('div', { class: k('sgreet') }, o.greet || RM[rid].g));
          (o.flavor || []).forEach(function (t) { add(el('p', { class: k('sflav') }, t)); });
          if (reason) add(el('p', { class: k('sreason') }, reason));
          (o.after || []).forEach(function (t) { add(el('p', { class: k('sflav') }, t)); });
          if (clauseText || remedy) add(el('details', { class: k('fine'), open: sv.slips <= 2 }, el('summary', {}, "Fine print (Sandra's)"), clauseText ? el('p', { class: k('sclause') }, clauseText) : null, remedy ? el('p', { class: k('sremedy') }, remedy) : null));
          if (isMeta) { const hops = Math.min(S.metaDepth, 5); let bc = 'Departments';
            if (S.metaDepth >= 6) bc += ' > ... > Ground Floor (the floor above the floor above)'; else for (let h = 0; h < hops; h++) bc += ' > Complaints about';
            add(el('p', { class: k('crumbline') }, bc));
          }
          (o.extra || []).forEach(add);
          if (S.postcard && !S.postcardShown) { S.postcardShown = true; SOCKS.forEach(function (s) { add(el('p', { class: k('sflav') + ' ' + k('postcard') }, s)); }); stat('sockPostcards'); }
          if (S.unrated) { add(el('p', { class: k('tiny') }, 'We have chosen 3 for you.')); S.unrated = false; }
          if (api.chance(1 / 20) && !plain) add(el('p', { class: k('snote') }, 'Please do not stamp me. -S'));
          const so = o.signoff != null ? o.signoff : signoffFor(rid);
          if (so) add(el('p', { class: k('ssign') }, so));
        }
        const nSeen = S.seen.size;
        if (!kind || kind === 'rock') { const done = S.rockDone && !rockish;
          const foot = rockish ? 'Rejected for reason ' + nSeen + ' of ' + nSeen + '.' : done ? 'Rejected for reason 0 of 0.' : 'Rejected for reason ' + nSeen + ' of ' + (nSeen + 1) + '.';
          add(el('div', { class: k('sfoot'), title: done ? 'Technically complete.' : null }, foot));
        }
        const slip = el('div', { class: k('slip') + (isCalm() ? '' : ' ' + k('printing')) + (key === 'warm' ? ' ' + k('warmslip') : '') }, body);
        /* ---- controls ---- */
        const last = S.pos >= S.ladder.length - 1;
        const escBtn = el('button', { class: k('esc'), type: 'button', onclick: function () { escalate(); } }, last ? 'ESCALATE (TO BRENDA)' : 'ESCALATE');
        const fileBtn = el('button', { class: k('btn'), type: 'button', onclick: function () { fileAnother(); } }, 'FILE ANOTHER');
        const wdBtn = btn('WITHDRAW (Shift+Esc)', function () { tryWithdraw(); }, 'small');
        const amend = el('textarea', { class: k('ta') + ' ' + k('amend'), rows: 2, maxlength: 200, 'aria-label': 'Amend complaint', oninput: function () { S.text = amend.value.slice(0, 200); } });
        amend.value = S.text;
        const stars = el('div', { class: k('stars'), role: 'group', 'aria-label': 'Survey' }, el('span', { class: k('slabel') }, 'How satisfied were you with this rejection?'));
        const starBtns = [1, 2, 3, 4, 5].map(function (n) { return el('button', { class: k('star'), type: 'button', 'aria-label': n + ' of 5 stars', onclick: function () { rate(n); } }, '★'); });
        starBtns.forEach(function (b) { stars.appendChild(b); });
        S.surveyDone = false;
        function rate(n) { if (S.phase !== 'slip' || S.surveyDone) return;
          S.surveyDone = true; S.unrated = false;
          starBtns.forEach(function (b, i) { b.disabled = true; if (i < n) b.classList.add(k('on')); });
          award(0.1, 'survey'); stat('surveys'); api.sfx('pop');
          S.index += (7.5 - S.index) * 0.5; if (S.settled) S.index = 0; paintMeter();
          say(deal('survey', SURVEY).replace('%N', String(n)), { mood: 'proud' });
        }
        S.onDigit = function (n) { if (n >= 1 && n <= 5) rate(n); };
        const decoyBox = el('div', { class: k('decoybox') });
        buildDecoy(decoyBox, rid);
        const ctl = el('div', { class: k('controls') }, escBtn, fileBtn, wdBtn, decoyBox, el('details', { class: k('amendbox') }, el('summary', {}, 'Amend complaint'), amend), stars);
        const sw = el('div', { class: k('slipwrap') }, slip, ctl);
        show(sw);
        S.slipEl = slip; S.escBtn = escBtn; S.readText = reason; if (!isCalm()) soon(1000, function () { slip.classList.remove(k('printing')); });
        api.sfx('stamp'); shake();
        if (sv.slips % 2 === 0 && !kind) soon(reason.length > 90 ? 4500 : 1500, function () { sayMgmt(fill(deal('after', AFTER), { AMT: fmtHalf(amt) }), { mood: 'smug' }); });
        else if (sv.slips === 1) soon(1500, function () { sayMgmt('We value your feedback. We value it the way a hat values a head: loosely.', { mood: 'smug' }); });
        later(450, function () { try { if (!document.activeElement || document.activeElement.tagName === 'BODY' || stage.contains(document.activeElement)) escBtn.focus({ preventScroll: true }); } catch (e) { /* focus is a luxury */ } });
        if (S.compact) soon(900, function () { if (S.phase === 'slip' && S.escBtn === escBtn) { try { escBtn.scrollIntoView({ block: 'nearest' }); } catch (e) { /* ok */ } } });
        later(api.selftest ? 3000 : 30000, function () { say(deal('wait', WAITING), { mood: 'disappointed' }); });
        if (sv.slips === 1) later(1200, function () { say('A rejection has been issued. It is a very good one. Press ESCALATE to appeal to a higher authority, which exists.', { mood: 'proud' }); });
      }
      function buildDecoy(box, rid) { const rockish = rid === 'rock' || rid === 'bigrock' || rid === 'cloudrock';
        const st = S.lap >= 5 && rockish ? 5 : sv.decoyStage, label = 'ACCEPT REJECTION (NOT AVAILABLE)';
        let dodges = 0, trapped = false, zz = false;
        function trap() { if (trapped) return; trapped = true;
          say(DECOY.trap, { mood: 'smug' }); award(0.1, 'decoy'); stat('decoy'); api.sfx('boing');
        }
        const hidden = el('button', { class: k('srbtn'), type: 'button', onclick: function () { trap(); } }, label + ' (SCREEN READER COPY)');
        if (st === 4) { box.appendChild(el('div', { class: k('dnote') }, 'NOTE: ACCEPT REJECTION has gone to Floor 7 1/2 to find itself. Back in 5 (years).'));
        } else { const btn = el('button', { class: k('decoy') + ' ' + k('d' + st), type: 'button', 'aria-label': label, onpointerenter: function (e) { if (st !== 0 || (e && e.pointerType && e.pointerType !== 'mouse')) return;
              if (dodges >= 6) return;
              dodges++; S.lastInput = api.now();
              const bw = box.clientWidth || 200, bb = btn.offsetWidth || 120;
              const mx = Math.max(0, Math.min(90, bw - bb));
              btn.style.transform = 'translate(' + (api.randInt(-mx, mx) * 0.5) + 'px,' + api.randInt(-34, 34) + 'px)';
              award(0.1, 'decoy chased'); stat('decoy'); api.sfx('boing');
              say(dodges >= 6 ? DECOY.tired : deal('dodge', DECOY.dodge), { mood: 'smug' });
            }, onfocus: function () { if (kbd) trap(); }, onclick: function () { api.sfx('blip');
              if (st === 0) say(dodges >= 6 ? DECOY.tired : DECOY.brk, { mood: 'smug' });
              else if (st === 1) say(DECOY.hide, { mood: 'smug' });
              else if (st === 2) say(DECOY.hat, { mood: 'smug' });
              else if (st === 3) { say('Shh.', { mood: 'smug' }); if (!zz) { zz = true; api.toast('zzz'); } }
              else if (st === 5) say(DECOY.rock, { mood: 'smug' });
            } }, st === 2 ? el('span', { class: k('dhat'), 'aria-hidden': 'true' }, '🎩') : null, st === 3 ? el('span', { 'aria-hidden': 'true' }, '😴 ') : null,
            st === 5 ? el('span', { class: k('rockblob') + ' ' + k('tinyrock'), 'aria-hidden': 'true' }) : null, el('span', { class: k('dlabel') }, label));
          box.appendChild(btn);
        }
        box.appendChild(hidden);
      }
      /* ================= THE LADDER ================= */
      const sc = function (ms) { return api.selftest ? Math.max(40, ms * 0.1) : ms; };
      const WHO = { desmond: 'Desmond', queue: 'Supervising Senior Intake Clerk', contrition: 'Assistant to the Regional Assistant', intern: "Gerald's Nephew", committee: 'The Committee of One', gerald: 'Gerald', half: 'Management', mirror: 'The Mirror', vane: 'The Weather Vane', stapler: "The Stapler's Union Rep", hat: 'The Hat', tuesday: "Tuesday's Assistant", bigrock: 'Management', cloudrock: 'Management', rock: 'Management' };
      function rbox(id, line, cls) { S.cardLine = line; const box = el('div', { class: k('rung') + ' ' + k('r-' + id) + (cls ? ' ' + cls : '') }, el('div', { class: k('rhead') }, el('span', { class: k('remoji'), 'aria-hidden': 'true' }, RM[id].e),
            el('div', {}, el('div', { class: k('rname') }, 'Rung ' + numLabel(S.pos) + ' · ' + RM[id].n), el('div', { class: k('rline') }, line))));
        for (let i = 3; i < arguments.length; i++) if (arguments[i]) box.appendChild(arguments[i]);
        return box;
      }
      function btn(text, fn, cls) { return el('button', { class: k('btn') + (cls ? ' ' + k(cls) : ''), type: 'button', onclick: fn }, text); }
      function defaultStamp(rid) { return rid === 'desmond' ? 'blue' : rid === 'intern' ? 'love' : (rid === 'committee' || rid === 'gerald') ? 'warm' : rid === 'rock' ? 'rej' : 'nope'; }
      function fin(res) { if (S.phase !== 'rung' || S.fin) return;
        S.fin = true; S.onDigit = null;
        const rid = S.rid; res = res || {};
        if (res.kind === 'moist') { api.sfx('bloop'); } else if (rid !== 'gerald' && rid !== 'rock' && rid !== 'bigrock' && rid !== 'cloudrock') api.sfx('stamp');
        if (!res.noSlam) { stage.appendChild(el('div', { class: k('slam') }, stampEl(res.kind === 'moist' ? 'moist' : (res.stamp || defaultStamp(rid))))); shake(); }
        later(res.noSlam ? 10 : sc(800), function () { makeSlip(rid, res); });
      }
      function autoRule() { if (S.phase !== 'rung' || S.fin || S.noAuto) return;
        say(deal('auto', AUTO), { who: 'Management', mood: 'smug' });
        fin(S.autoRes ? S.autoRes() : {});
      }
      function armAuto() { if (S.noAuto) return;
        S.hardT = later(api.selftest ? 4500 : 45000, autoRule); rearmSoft();
      }
      function rearmSoft() { if (S.phase !== 'rung' || S.fin || S.noAuto) return;
        if (S.softT) { api.clearTimeout(S.softT); const dead = S.softT; S.timers = S.timers.filter(function (o) { return o.t !== dead; }); }
        S.softT = later(api.selftest ? 3000 : 20000, autoRule);
      }
      function enterRung(pos) { go('rung'); S.pos = pos; const id = S.ladder[pos]; S.rid = id; S.noAuto = false; S.noEsc = false; S.autoRes = null; S.softT = null;
        S.reached = Math.max(S.reached, pos); sv.highestRung = Math.max(sv.highestRung, pos + 1);
        api.stat.max('complaints-dept.maxRung', pos + 1);
        paintChair12 = function () {};
        if (pos >= 1 && !S.meterShown) { S.meterShown = true; soon(2600, function () { say('The Satisfaction Index has appeared. It was always at 7 1/2. It has simply not been introduced.', { mood: 'smug', force: true }); }); }
        paintFloors(); paintMeter(); paintCounters(); paintTrail(); saveNow();
        stage.className = k('stage');
        RUNGFN[id]();
        armAuto();
      }
      function ladderReveal() { building.hidden = false; building.classList.add(k('dolly'));
        soon(900, function () { building.classList.remove(k('dolly')); });
      }
      const RUNGFN = {};
      RUNGFN.desmond = function () { const DESK = ['Desk A is the wrong desk by a margin of 11 cm.', 'Desk B is the wrong desk by a margin of 4 1/2 inches.', 'Desk A (2) is the wrong desk by exactly one desk.'];
        const DESM = ['Desmond has reviewed your complaint for 11 seconds, which he describes as a personal best.', 'Desmond rejects you for being the wrong amount of aggrieved. Please be 14 percent more aggrieved and resubmit during Lent.', 'Desmond has stamped your complaint with the stamp he uses only for stamps.', 'Desmond has asked a colleague for a second opinion. The colleague is also Desmond, at a different desk.'];
        const line = 'Senior Intake Clerk Desmond. I am Senior. I am also Intake. I am mostly Clerk.';
        function pick(i) { if (S.fin) return; api.sfx('blip'); fin({ stamp: 'blue', flavor: [DESK[i], deal('desm', DESM)] }); }
        const gauge = el('svg', { class: k('gauge'), viewBox: '0 0 120 70', 'aria-hidden': 'true' }, el('path', { d: 'M10 62 A50 50 0 0 1 110 62', fill: 'none', stroke: '#2a2118', 'stroke-width': '4' }),
          el('line', { class: k('needle'), x1: '60', y1: '62', x2: '60', y2: '20', stroke: '#c4332b', 'stroke-width': '3' }), el('text', { x: '60', y: '68', 'text-anchor': 'middle', 'font-size': '8' }, 'wrong amount aggrieved'));
        const desks = ['Desk A', 'Desk B', 'Desk A (2)'].map(function (t, i) { return el('button', { class: k('desk'), type: 'button', onclick: function () { pick(i); } }, el('span', { class: k('dk') }, String(i + 1)), t); });
        show(rbox('desmond', line, '', el('div', { class: k('desks') }, desks), gauge));
        sayRung(line, 'Desmond'); S.onDigit = function (n) { if (n >= 1 && n <= 3) pick(n - 1); };
        S.autoRes = function () { return { stamp: 'blue', flavor: [DESK[1], DESM[0]] }; };
      };
      RUNGFN.queue = function () { const base = api.selftest ? 1500 : 6000, cap = api.selftest ? 3500 : 14000, add = api.selftest ? 150 : 1200;
        let ticket = false, ahead = 0, called = false, ct = null, t0 = 0, bi = 0;
        const GO = ['Person %N went ahead of you. They did not say thank you. They did not need to. They did.', "Person %N went ahead. You have been moved back by exactly one person's worth of dignity.", 'Person %N went ahead and has already been rejected. They were very grateful about it.', "Person %N went ahead. The Department notes your courtesy. The Department will use it against you.", 'Person %N went ahead and held the door for the person after them. There is no door. It was very gracious.', 'Person %N went ahead, was rejected at once, and came back to say thank you. They were rejected again.'];
        const BOARD = ['NOW SERVING: 7 1/2.', 'NOW SERVING: 7 1/2.', 'NOW SERVING: still 7 1/2.'];
        const board = el('div', { class: k('board') }, 'NOW SERVING: 7 1/2');
        const ticketEl = el('div', { class: k('ticket'), hidden: true }, 'YOUR NUMBER: 7 1/2');
        const waitBtn = btn('Wait', function () { callNow(); }); waitBtn.hidden = true;
        const takeBtn = btn('Take a ticket', function () { take(); }, 'coral');
        const crowd = el('div', { class: k('crowd') });
        PEOPLE.forEach(function (p, i) { const row = el('div', { class: k('person') }, el('span', { class: k('pe'), 'aria-hidden': 'true' }, p), btn('Let them go ahead', function () { goAhead(row); }, 'small'));
          crowd.appendChild(row);
        });
        function resched() { if (ct) api.clearTimeout(ct);
          const total = Math.min(cap, base + add * ahead), rem = Math.max(250, total - (api.now() - t0));
          ct = later(rem, callNow);
        }
        function take() { if (ticket || S.fin) return; ticket = true; t0 = api.now(); api.sfx('bell');
          ticketEl.hidden = false; takeBtn.disabled = true; waitBtn.hidden = false;
          sayRung('You are number 7 1/2 in the queue. This is an honor, and also a fraction.', 'Supervising Senior Intake Clerk');
          resched();
          every(sc(2000), function () { board.textContent = BOARD[bi++ % BOARD.length]; api.sfx('tick'); });
        }
        function goAhead(row) { if (S.fin || called || row.dataset.gone) return;
          if (!ticket) take();
          row.dataset.gone = '1'; row.classList.add(k('gone')); ahead++; stat('letAhead'); award(0.1, 'courtesy'); api.sfx('pop');
          say(fill(deal('goahead', GO), { N: ahead }), { who: 'Management', mood: 'smug' });
          resched();
          if (ahead === 3) { if (!S.medalToast) { S.medalToast = true; toast('Customer Courtesy Medal (Not A Medal)'); }
            say('Customer Courtesy Medal (Not A Medal) awarded. It is a sticker of a medal. The sticker is also on break.', { mood: 'proud', priority: 1 });
            api.achieve('complaints-dept.queue');
          }
        }
        function callNow() { if (called || S.fin) return; called = true; if (ct) api.clearTimeout(ct);
          if (!ticket) { ticket = true; ticketEl.hidden = false; }
          sayRung('Your number has been called. The number was 7 1/2. You are 7 1/2. You may now be rejected.', 'Supervising Senior Intake Clerk');
          board.textContent = 'NOW SERVING: YOU (7 1/2)'; api.sfx('ding');
          fin({ flavor: ['The Supervising Senior Intake Clerk apologizes on behalf of the Senior Intake Clerk. The Senior Intake Clerk does not apologize back.'] });
        }
        const line = 'Supervising Senior Intake Clerk. Please take a number. Please then take another.';
        show(rbox('queue', line, '', el('div', { class: k('qtop') }, board, ticketEl), el('div', { class: k('qbtns') }, takeBtn, waitBtn), crowd));
        sayRung(line, 'Supervising Senior Intake Clerk');
        S.autoRes = function () { called = true; return { flavor: ['The Supervising Senior Intake Clerk apologizes on behalf of the Senior Intake Clerk. The Senior Intake Clerk does not apologize back.'] }; };
      };
      RUNGFN.contrition = function () { const W0 = 'I am sorry to the complaint, which has done nothing wrong.'.split(' ');
        const PAIRS = [['sorry', 'regretful'], ['complaint,', 'grievance,'], ['nothing', 'very little'], ['wrong.', 'incorrect.'], ['which', 'that'], ['done', 'achieved'], ['am', 'remain'], ['to', 'toward']];
        const RES = ['Your apology has been accepted as substantially similar, and rejected for being substantially similar.', 'The Department has a quota of similarity and you are now over it.', "The Assistant says: 'I am acting on behalf of someone who is on holiday. It is a very good holiday. I have been told.'", 'Your apology has been shredded and reassembled as a smaller apology. It is smaller. It is also more sorry.'];
        const cur = W0.slice(), U = api.selftest ? 100 : 1000;
        let n = 0, limit = api.selftest ? 3000 : 9000, t0 = api.now(), typed = false;
        const target = el('div', { class: k('target'), 'aria-live': 'off' }, cur.join(' '));
        const fillEl = el('i', { class: k('cfill') });
        const inp = el('input', { class: k('inp'), type: 'text', maxlength: 80, 'aria-label': 'Retype the apology', autocomplete: 'off', oninput: function () { typed = true; n++;
          const pr = PAIRS[(n - 1) % PAIRS.length], idx = W0.indexOf(pr[0]);
          if (idx >= 0) cur[idx] = cur[idx] === pr[0] ? pr[1] : pr[0];
          target.textContent = cur.join(' ');
          limit = Math.max(api.selftest ? 1500 : 5000, Math.min(api.selftest ? 4000 : 12000, limit + (api.chance(0.5) ? U : -U)));
        } });
        const line = 'I am the Assistant to the Regional Assistant. The Regional Assistant is on holiday, and I am on his holiday.';
        const lab = el('div', { class: k('tlabel') }, 'Time Remaining: (varies)');
        show(rbox('contrition', line, '', el('p', { class: k('rline') }, 'Please retype the following apology to the complaint (not the complainant):'), target, inp, lab, el('div', { class: k('bar') }, fillEl)));
        sayRung(line, 'Assistant to the Regional Assistant');
        function result() { stat('contrition'); return { flavor: [typed ? deal('cres', RES) : 'Your apology has been accepted as substantially similar to nothing.'] }; }
        S.autoRes = result;
        every(100, function () { const rem = limit - (api.now() - t0);
          fillEl.style.width = Math.max(0, Math.min(100, rem / limit * 100)).toFixed(0) + '%';
          if (rem <= 0) fin(result());
        });
      };
      RUNGFN.intern = function () { let toaster = KW.toast.test(normT(S.text));
        try { toaster = toaster || api.stat.get('toaster.toasts') > 0 || api.stat.get('toaster.slices') > 0; } catch (e) { /* the Toaster is shy */ }
        const R = ['Rejected, but I want you to know I read all of it. And I felt it in my lanyard.', 'Rejected. I did read it twice. The second time was for me.', 'Rejected. This is the kindest rejection the Department offers, and I am the only one authorized to offer it, and I am not authorized.', 'Rejected. I have drawn a small heart on the form. It is not official. It is also not a heart.', 'Rejected. I checked with Gerald and then I checked with myself. Neither of us was sure.'];
        const fonts = ['Georgia, serif', 'ui-monospace, Consolas, monospace', 'cursive'];
        const line = 'Hi. I am Gerald\'s nephew. I am an intern. I have a question and it is about you.';
        function pick() { if (S.fin) return; api.sfx('blip');
          say('Right. That is what I would have said.', { who: "Gerald's Nephew" });
          soon(1800, function () { say("Gerald's nephew whispers: 'Please do not tell my uncle I asked a person.'", { who: "Gerald's Nephew", mood: 'confused' }); });
          if (toaster) { stat('toasterSlips'); api.sfx('sad');
            fin({ stamp: 'love', greet: "The Toaster has replied: 'Warm. Complaint. Noted. Crisp.'", primary: 'Rejected. You are insufficiently toasted.', extra: [el('div', { class: k('toastcard') }, el('span', { 'aria-hidden': 'true' }, '🍞'), ' Re: complaint. Toast. (Warm.)')] });
          } else fin({ stamp: 'love', primary: deal('intern', R) });
        }
        const bs = fonts.map(function (ff, i) { return el('button', { class: k('btn') + ' ' + k('big'), type: 'button', style: { fontFamily: ff }, onclick: pick }, el('span', { class: k('dk') }, String(i + 1)), 'Reject'); });
        show(rbox('intern', line, '', el('div', { class: k('desks') }, bs), el('p', { class: k('tiny') }, toaster ? 'A slip is sliding under the door. It is warm.' : 'He nods gravely, whichever you pick.')));
        sayRung(line, "Gerald's Nephew"); S.onDigit = function (n) { if (n >= 1 && n <= 3) pick(); };
        S.autoRes = function () { return { stamp: 'love', primary: R[0] }; };
      };
      RUNGFN.committee = function () {
        const R = ['The Committee has achieved quorum and, as a result, must reject for exceeding quorum.', 'The Committee of One has voted. The Committee of One abstained from himself. Motion tabled; the table is also on break.', 'The Committee recuses itself. The vote is therefore unanimous, and nobody is happy.', 'The Committee has adjourned. The Committee has not been told. It continues, adjourned.'];
        const VOTES = ['Votes: 1 against, 0 abstaining', 'Votes: 0 against, 1 abstaining', 'The Committee has recused itself.'];
        let invited = 0, oi = 0, vi = 0;
        const vote = el('div', { class: k('votes') }, VOTES[0]);
        const chairs = [];
        const tbl = el('div', { class: k('table') }, el('div', { class: k('oval'), 'aria-hidden': 'true' }, 'THE TABLE'));
        for (let i = 0; i < 12; i++) { const a = (-90 + i * 30) * Math.PI / 180, x = 50 + 44 * Math.cos(a), y = 50 + 40 * Math.sin(a);
          let c;
          if (i === 0) c = el('span', { class: k('chair1'), style: { left: x + '%', top: y + '%' }, 'aria-label': 'Chair 1, occupied by the Committee', role: 'img' }, '⚖️');
          else { c = el('button', { class: k('chairb'), type: 'button', style: { left: x + '%', top: y + '%' }, 'aria-label': 'Chair ' + (i + 1) + ', empty', dataset: { n: String(i + 1) }, onclick: function () { invite(c); } }, String(i + 1)); chairs.push(c); }
          tbl.appendChild(c);
        }
        function invite(c) { if (S.fin || c.disabled) return;
          const o = COMMITTEE_OBJ[oi++ % COMMITTEE_OBJ.length];
          c.disabled = true; c.textContent = o[0]; c.classList.add(k('used')); api.sfx('pop'); invited++; c.setAttribute('aria-label', 'Chair ' + c.dataset.n + ', occupied by ' + o[1].split(' has ')[0].toLowerCase());
          say(o[1], { who: 'The Committee of One', mood: 'confused' });
          soon(1200, function () { c.classList.add(k('fade')); });
          if (invited === 5) { sayRung('The Committee has achieved quorum.', 'The Committee of One'); later(sc(900), function () { fin({ stamp: 'warm', primary: deal('com', R) }); }); }
        }
        paintChair12 = function () { const c = chairs[10]; if (!c || (c.disabled && !S.compact && !c.dataset.bath)) return;
          if (S.compact) { if (!c.disabled) { c.disabled = true; c.dataset.bath = '1'; c.setAttribute('aria-label', 'Chair 12 is in the bathroom.'); c.textContent = '🚪'; say('Chair 12 is in the bathroom. The Committee has noted this and kept going.', { mood: 'confused' }); } }
          else if (c.dataset.bath) { c.disabled = false; delete c.dataset.bath; c.textContent = '12'; c.setAttribute('aria-label', 'Chair 12, empty'); }
        };
        const line = 'The Committee of One will now come to order. The Committee is in order. The Committee is disorder-adjacent.';
        show(rbox('committee', line, '', tbl, vote, el('p', { class: k('tiny') }, 'Invite five guests to the table. Click a chair, or press 1 to 9.')));
        sayRung(line, 'The Committee of One'); paintChair12();
        every(sc(2000), function () { vi = Math.min(2, vi + 1); vote.textContent = VOTES[vi]; });
        S.onDigit = function () { const c = chairs.filter(function (x) { return !x.disabled; })[0]; if (c) invite(c); };
        S.autoRes = function () { return { stamp: 'warm', primary: R[2] }; };
      };
      RUNGFN.gerald = function () { const met = api.flag.get('metGerald') === true;
        const R = ['Your complaint is sound. Sound travels poorly through mashed forms.', 'Rejected for insufficient starch.', 'I am sorry. I am sorry that I am sorry. That second sorry was starchy.', 'Gerald has considered your complaint at length. The length was mostly peeling.'];
        const WRONG = ['You were taller.', 'You had a hat. I remember the hat. You did not have a hat.', 'You were a Thursday, I believe.', 'You were shorter, and wearing a different Tuesday.'];
        const line = met ? 'We have met. I do not recall it. That is what makes it a meeting. ' + deal('wrong', WRONG) : 'Gerald, Vice President of Spuds, regrets to inform you that he is a potato. Do not tell the others I came down from the vegetable drawer.';
        api.flag.set('metGerald', true); api.achieve('complaints-dept.gerald'); S.quiet = api.now() + 3000 * T;
        const parts = S.text.trim() ? S.text.split(/[.!?\n]+/).map(function (s) { return clean(s); }).filter(Boolean).slice(0, 3) : ['(blank)'];
        if (!parts.length) parts.push('(blank)');
        const reading = el('div', { class: k('reading'), 'aria-live': 'polite' });
        const nod = btn('Nod gravely', function () { done(); }, 'coral'); nod.hidden = true;
        function done() { if (S.fin) return; const fl = ['Gerald apologizes. The apology is somehow worse. It is warm and it has eyes.'];
          if (met) { let fo = ''; try { fo = api.line('fortune'); } catch (e) { fo = ''; } if (fo) fl.push("Gerald slides you a fortune he found in the vegetable drawer: '" + clean(fo) + "'"); }
          fin({ stamp: 'warm', primary: deal('ger', R), flavor: fl });
        }
        stage.classList.add(k('sepia'));
        show(rbox('gerald', line, k('sepiabox'), el('div', { class: k('frame') }, S.text.trim() ? '"' + clean(S.text) + '"' : '(blank)'), reading, nod));
        stage.classList.add(k('sepia'));
        sayRung(line, 'Gerald', { force: true, mood: 'proud', duration: 6500 });
        parts.forEach(function (p, i) { later(sc(1200) * (i + 1), function () { reading.appendChild(el('p', {}, '"' + p + '"')); }); });
        later(sc(1200) * (parts.length + 1), function () { reading.appendChild(el('p', { class: k('rline') }, 'Every grievance, he says, is a potato that has not yet been mashed.')); nod.hidden = false; try { nod.focus({ preventScroll: true }); } catch (e) { /* ok */ } });
        S.onDigit = function (n) { if (n === 1 && !nod.hidden) done(); };
        S.autoRes = function () { return { stamp: 'warm', primary: R[1] }; };
      };
      RUNGFN.half = function () {
        const R = ['Rejected. A complaint about the complaint process must be filed with itself. It has been. It is pending, with itself.', 'Both complaints have been forwarded to each other. They have not been introduced.', 'The Complaints Department\'s Own Complaints Department has reviewed the Complaints Department. It would like to be left alone with its feelings.'];
        const line = 'Rung 7 1/2. The building has quietly added a rung. It was not there. It was always there. The rung has asked not to be asked.';
        const inp = el('input', { class: k('inp'), type: 'text', maxlength: 80, 'aria-label': 'Complain about the Complaints Department', placeholder: 'Complain about the Complaints Department', autocomplete: 'off' });
        function file() { if (S.fin) return; S.metaDepth++; S.metaMax = Math.max(S.metaMax, S.metaDepth); stat('metaComplaints'); api.sfx('stamp'); fin({ stamp: 'nope', meta: true, primary: deal('half', R) }); }
        show(rbox('half', line, '', el('div', { class: k('minform') }, inp, btn('FILE COMPLAINT ABOUT THIS COMPLAINT', file, 'coral'))));
        sayRung(line, 'Management', { mood: 'confused' });
        S.autoRes = function () { S.metaDepth++; return { stamp: 'nope', meta: true, primary: R[1] }; };
      };
      RUNGFN.mirror = function () { let depth = 1;
        const holder = el('div', { class: k('mirror') }), cap = el('div', { class: k('rline') });
        function rule() { return { stamp: 'nope', primary: MIRROR[depth - 1] }; }
        function paintM() { holder.textContent = ''; let node = null;
          for (let d = depth - 1; d >= 0; d--) { const inner = d === depth - 1 ? (depth === 8 ? '🙂' : S.text.trim() ? clean(S.text).slice(0, 36) : '(blank)') : null;
            node = d === depth - 1
              ? el('button', { class: k('mframe') + ' ' + k('mbtn'), type: 'button', style: '--d:' + d, 'aria-label': depth >= 8 ? 'The bottom of the Mirror' : 'Look deeper', onclick: function () { zoom(); } }, el('span', {}, inner))
              : el('div', { class: k('mframe'), style: '--d:' + d }, node);
          }
          holder.appendChild(node); cap.textContent = MIRROR[depth - 1];
        }
        function zoom() { if (S.fin) return;
          if (depth >= 8) { fin(rule()); return; }
          depth++; paintM(); api.sfx('tick'); say(MIRROR[depth - 1], { who: 'The Mirror', mood: 'confused' });
        }
        const line = 'The Mirror will see you now. The Mirror has seen you. The Mirror will see you now again.';
        paintM();
        show(rbox('mirror', line, '', holder, cap, btn('Conclude', function () { fin(rule()); }, 'small')));
        sayRung(line, 'The Mirror', { mood: 'confused' }); S.autoRes = rule;
      };
      RUNGFN.vane = function () { sv.vane++; const visit = sv.vane, need = api.selftest ? 40 : 400;
        let budget = 0, angle = 0, settling = false, settled = false;
        const arrow = el('div', { class: k('arrow') }, el('svg', { viewBox: '0 0 100 100', 'aria-hidden': 'true' }, el('path', { d: 'M50 6 L68 42 L56 42 L56 88 L44 88 L44 42 L32 42 Z', fill: '#c4332b', stroke: '#2a2118', 'stroke-width': '4', 'stroke-linejoin': 'round' })));
        const gauge = el('div', { class: k('tiny'), 'aria-live': 'off' }, 'Wind collected: 0');
        function spin(w, dir) { if (S.fin || settled) return;
          budget += w; angle += (dir || 1) * w * 0.9; arrow.style.setProperty('--a', angle + 'deg'); gauge.textContent = 'Wind collected: ' + Math.min(budget, need) + ' of ' + need;
          if (budget >= need && !settling) { settling = true; later(sc(2000), settle); }
        }
        function settle() { if (settled || S.fin) return; settled = true;
          const moist = visit % 13 === 0 || api.chance(0.04), d = moist ? 'Moist' : CLOCKS[api.randInt(0, 3)];
          angle = Math.round(angle / 360) * 360 + (d === 'N' ? 0 : d === 'NE' ? 45 : d === 'E' ? 90 : d === 'Pending' ? 20 : 180);
          arrow.style.setProperty('--a', angle + 'deg');
          if (moist) { stat('moist'); award(1, 'Moist deferral'); fin({ kind: 'moist', primary: VANE_LINES.Moist, stamp: 'moist' }); }
          else fin({ stamp: 'nope', primary: VANE_LINES[d] });
        }
        const zone = el('div', { class: k('zone'), tabIndex: 0, 'aria-label': 'Wind zone. Move the pointer or use the arrow keys.', onpointermove: function (e) { spin(Math.min(60, Math.abs(e.movementX || 0) + Math.abs(e.movementY || 0)) || 3, 1); },
          onkeydown: function (e) { if (e.key === 'ArrowLeft') spin(40, -1); else if (e.key === 'ArrowRight') spin(40, 1); } }, arrow);
        const line = 'The Weather Vane rules by wind. The wind is you. Please be consistent.';
        show(rbox('vane', line, '', zone, gauge, el('div', { class: k('qbtns') }, btn('Blow left', function () { spin(70, -1); }), btn('Blow right', function () { spin(70, 1); }))));
        sayRung(line, 'The Weather Vane');
        later(api.selftest ? 3000 : 14000, settle);
        S.autoRes = function () { settled = true; return { stamp: 'nope', primary: VANE_LINES.Pending }; };
      };
      RUNGFN.stapler = function () {
        const R = ['The Stapler\'s Union Rep rejects your complaint as under-stapled (0). It would like 2 staples, dental coverage, and a longer lunch.', 'Under-stapled (1). The Union is moved. The Union is also still 1 staple short, which is a matter for the Union.', 'Two staples. The Union notes this is the number it asked for. It rejects the complaint for being what it asked for.', 'Over-stapled. The complaint is now more staple than complaint. This is a union victory and also a rejection.'];
        let staples = 0;
        const row = el('div', { class: k('staples'), 'aria-hidden': 'true' }), count = el('div', { class: k('tiny'), 'aria-live': 'off' }, 'Staples: 0');
        const paper = el('div', { class: k('paper') }, el('span', {}, S.text.trim() ? clean(S.text).slice(0, 90) : '(blank complaint)'), row);
        function staple() { if (S.fin) return; staples++; api.sfx('pop'); stat('staples');
          if (row.children.length < 6) row.appendChild(el('i', {}, '▬'));
          count.textContent = 'Staples: ' + staples;
          if (staples === 7) say('The Union asks that prime numbers of staples be paid. Seven is prime. Seven is owed seven.', { who: "The Stapler's Union Rep", mood: 'smug' });
        }
        function submitS() { if (S.fin) return; fin({ stamp: 'nope', primary: R[Math.min(3, staples)] }); }
        const sv2 = el('svg', { class: k('staplersvg'), viewBox: '0 0 150 70', 'aria-hidden': 'true' }, el('rect', { x: '8', y: '24', width: '134', height: '32', rx: '14', fill: '#b9772e', stroke: '#2a2118', 'stroke-width': '4' }), el('rect', { x: '8', y: '12', width: '120', height: '20', rx: '9', fill: '#d79a4a', stroke: '#2a2118', 'stroke-width': '4' }), el('circle', { cx: '40', cy: '36', r: '5', fill: '#fff', stroke: '#2a2118', 'stroke-width': '2' }), el('circle', { cx: '62', cy: '36', r: '5', fill: '#fff', stroke: '#2a2118', 'stroke-width': '2' }), el('circle', { cx: '41', cy: '37', r: '2', fill: '#2a2118' }), el('circle', { cx: '63', cy: '37', r: '2', fill: '#2a2118' }));
        const line = "The Stapler's Union Rep will hear your complaint after the following demands: 3 breaks, a pay review, and to be stapled to nothing, ever.";
        show(rbox('stapler', line, '', el('div', { class: k('stapwrap') }, sv2, el('ul', { class: k('demands') }, el('li', {}, '3 breaks'), el('li', {}, 'a pay review'), el('li', {}, 'to be stapled to nothing, ever'))), paper, count,
          el('div', { class: k('qbtns') }, btn('Staple the complaint', staple, 'coral'), btn('Submit stapled complaint', submitS))));
        sayRung(line, "The Stapler's Union Rep"); S.onDigit = function (n) { if (n === 1) submitS(); };
        if (FL('metStapler')) later(sc(3200), function () { say("The Stapler's Union Rep recognizes you from another department. It has your file. It has stapled your file.", { who: "The Stapler's Union Rep", mood: 'smug' }); });
        S.autoRes = function () { return { stamp: 'nope', primary: R[Math.min(3, staples)] }; };
      };
      RUNGFN.hat = function () {
        const TIPS = ['For references see Dennis (Plant), the only employee who has never been the subject of a complaint, because he has never moved.', 'Tip: a hat is a ruling you can wear.', 'Tip: always keep your head level and your complaint covered.'];
        const R = ['The Hat has ruled. The Hat does not answer to the head it is on.', 'The Hat has taken your complaint seriously. The Hat has also taken it to the hat rack. It will be reviewed.', 'The Ombudsman rejects you by being a hat. This is an honest answer and also a fashion.', 'The Hat has been on a lot of heads. Yours was in the top three. Of three.'];
        let worn = false;
        const follow = el('span', { class: k('hatfollow'), 'aria-hidden': 'true' }, '🎩'); follow.hidden = true;
        const status = el('div', { class: k('tiny') }, 'The hat is on the coat stand. It is waiting.');
        const putOn = btn('Put the hat on', function () { wear(); }, 'coral');
        const dennis = el('button', { class: k('dennis'), type: 'button', 'aria-label': 'Dennis (Plant)', onclick: function () { api.sfx('blip'); say('Dennis (Plant) has been consulted. Dennis (Plant) did not respond. This is the most professional response to date and the Department has taken notes.', { who: 'The Hat', mood: 'proud' }); } }, '🌿');
        const stand = el('div', { class: k('stand') }, el('span', { class: k('hatstand'), 'aria-hidden': 'true' }, '🎩'), dennis);
        const avatar = el('div', { class: k('avatar'), 'aria-hidden': 'true' }, '🙂');
        const box = rbox('hat', 'The Ombudsman is a hat. The hat is on a coat stand. Please put the hat on.', '', stand, avatar, status, putOn, follow);
        box.addEventListener && api.on(box, 'pointermove', function (e) { if (!worn) return; const r = box.getBoundingClientRect();
          follow.style.left = Math.max(8, Math.min(r.width - 34, e.clientX - r.left - 14)) + 'px'; follow.style.top = Math.max(8, Math.min(r.height - 34, e.clientY - r.top - 24)) + 'px';
        });
        function wear() { if (worn || S.fin) return; worn = true; putOn.disabled = true; api.sfx('honk'); follow.hidden = false; follow.style.left = '50%'; follow.style.top = '40%';
          status.textContent = 'The hat is worn. You are the head.';
          sayRung('The Hat is on. The Hat has noted that you are the head. This is a career advancement for you.', 'The Hat', { mood: 'proud' });
          let n = 0;
          every(sc(1000), function () { if (n < 3) say(deal('tip', TIPS), { who: 'The Hat', mood: 'smug' }); n++; });
          later(sc(3000), function () { fin({ stamp: 'nope', primary: deal('hatr', R) }); });
        }
        show(box); sayRung('The Ombudsman is a hat. The hat is on a coat stand. Please put the hat on.', 'The Hat');
        if (FL('metDennis') || FL('plantClicked')) later(sc(3200), function () { if (!worn) say("The Hat: 'Dennis (Plant) speaks highly of you. Dennis (Plant) has not spoken. It was a very high silence.'", { who: 'The Hat', mood: 'smug' }); });
        S.onDigit = function (n) { if (n === 1) wear(); };
        S.autoRes = function () { return { stamp: 'nope', primary: R[2] }; };
      };
      RUNGFN.tuesday = function () { let sub = false;
        const line = "I am Tuesday's Assistant. I cannot say the word. I can say 'the day after Monday', which is not the word. Please write it.";
        const inp = el('input', { class: k('inp'), type: 'text', maxlength: 60, 'aria-label': 'Write the day after Monday', autocomplete: 'off' });
        const clock = el('div', { class: k('wall') }, '4:17');
        function inviteCard() {
          const c = el('div', { class: k('invite') }, el('b', {}, 'Calendar invite: Tuesday'), el('div', {}, 'Tuesday has declined to attend, but has marked you Tentative.'), el('div', {}, 'The Stapler: Required (accepted)'), el('div', {}, 'The Rock: Optional (no response, filed as a strong no)'));
          let b = 0; try { b = api.stat.get('shop.bought'); } catch (e) { b = 0; }
          if (b > 0) c.appendChild(el('div', { class: k('tiny') }, "Sandra's footnote: Purchases are not complaints but they are not not complaints."));
          return c;
        }
        function submitT() { if (sub || S.fin) return; sub = true;
          const ans = clean(inp.value).slice(0, 30) || 'nothing';
          inp.disabled = true; sb.disabled = true; stat('tuesdays'); api.sfx('stamp');
          stage.classList.add(k('loom')); clock.textContent = 'Tuesday (Approx.)'; wrap.classList.add(k('flick')); soon(500, function () { wrap.classList.remove(k('flick')); });
          S.quiet = api.now() + 1000;
          later(1000, function () { fin({ stamp: 'nope', answer: ans, primary: deal('tue', TUE_RULES), extra: [inviteCard()] }); });
        }
        const sb = btn('Submit', submitT, 'coral');
        show(rbox('tuesday', line, '', el('div', { class: k('postit') }, 'I cannot say the word. Please write the day after Monday.'), el('div', { class: k('minform') }, inp, sb), clock));
        sayRung(line, "Tuesday's Assistant");
        S.autoRes = function () { sub = true; return { stamp: 'nope', answer: 'nothing', primary: TUE_RULES[0], extra: [inviteCard()] }; };
      };
      RUNGFN.rock = function () { rockRung('rock'); };
      RUNGFN.bigrock = function () { rockRung('bigrock'); };
      RUNGFN.cloudrock = function () { rockRung('cloudrock'); };
      function rockRung(id) { S.noAuto = true; S.noEsc = true;
        const dur = id === 'bigrock' ? 10000 : 7500, total = api.selftest ? 1000 : dur, scale = total / dur;
        S.quiet = api.now() + total + 2500;
        wrap.classList.add(k('hush'));
        const first = sv.firstComplaint ? '"' + clean(sv.firstComplaint) + '"' : '"I would like to complain about..."';
        const msg = el('div', { class: k('rockmsg') }, 'The Rock is considering: ' + first);
        const quiet = el('div', { class: k('tiny') }, id === 'rock' ? '[Quiet.]' : id === 'bigrock' ? "This Rock is bigger. The Department has rated it 'technically more'." : 'A Rock That Is Technically A Cloud. The Department checked. The Department is not sure what it checked.');
        let pokes = 0, lastPoke = 0;
        const rock = el('button', { class: k('therock') + (id === 'bigrock' ? ' ' + k('big') : '') + (id === 'cloudrock' ? ' ' + k('cloud') : ''), type: 'button', 'aria-label': 'The Rock', onclick: function () {
          const n = api.now(); pokes = n - lastPoke <= 1000 ? pokes + 1 : 1; lastPoke = n; api.sfx('tick');
          if (pokes === 7 && !S.stones) { S.stones = true; rock.classList.add(k('rolled')); stat('stones'); award(20, 'the Rock complains'); api.achieve('complaints-dept.stones');
            note.hidden = false;
            say("The Department has accepted the Rock's complaint for filing, and rejected it for being 'a complaint from a rock, which is outside our jurisdiction, which is the ground.'", { who: 'Management', mood: 'confused', force: true, priority: 2, duration: 8000 });
          }
        } }, el('span', { class: k('rockface') }));
        const note = el('div', { class: k('sticky'), hidden: true }, 'I would like to formally complain about being a rock.');
        const small = el('div', { class: k('smallrockfly'), 'aria-hidden': 'true' });
        const stampSlot = el('div', { class: k('stampslot') });
        const arena = el('div', { class: k('arena') }, el('div', { class: k('rshadow') }), rock, small, note, stampSlot);
        show(rbox(id, id === 'rock' ? '[Quiet.]' : quiet.textContent, '', arena, msg));
        if (id !== 'rock') stage.firstChild.querySelector('.' + k('rline')).textContent = quiet.textContent;
        let t = 0, gap = 1000 * scale;
        while (t < total * 0.97) { t += gap; if (t < total) later(t, function () { api.sfx('tick'); }); gap = Math.max(150 * scale, gap * 0.78); }
        later(total, function () { msg.textContent = 'The Rock has heard you.'; api.sfx('whoosh'); small.classList.add(k('in'));
          later(sc(1000), function () { stampSlot.appendChild(stampEl('rej')); api.sfx('stamp'); shake(); rock.classList.add(k('away')); small.classList.add(k('away'));
            later(sc(1400), function () { rockEnd(id); });
          });
        });
      }
      function rockEnd(id) { stat('rock'); wrap.classList.remove(k('hush'));
        let lines;
        if (id === 'bigrock') lines = ['The Bigger Rock has considered your complaint at greater length. Length was the only difference.'];
        else if (id === 'cloudrock') lines = ['The Cloud has considered your complaint. The Cloud has rained on it. This is a ruling.'];
        else lines = ['The Rock has no further questions. The Rock never had any questions. That is why it is the Rock.', "A smaller rock has stamped REJECTED on the Rock's ruling. Both rocks are looking away.", 'We have run out of reasons. We are using the ones we have.'];
        if (id === 'rock' && FL('pet-rock.met')) lines.push('A smaller rock, registered to you elsewhere, has sent a card. The card is blank. The Rock has read it twice.');
        const firstTime = id === 'rock' && !sv.rockMet;
        if (id === 'rock') { api.achieve('complaints-dept.rock'); sv.rockMet = true; api.flag.set('complaints-dept.rockMet', true); S.rockDone = true; }
        S.quiet = 0;
        if (firstTime) { award(25, 'first audience with the Rock'); soon(1500, function () { say('The Rock has no budget but would like you to know it is tangible.', { mood: 'proud', priority: 1 }); }); api.confetti(undefined, undefined, 14); }
        else award(5, 'audience with a rock');
        makeSlip(id, { kind: 'rock', primary: lines[0], after: lines.slice(1), stamp: 'rej' });
      }
      /* ================= ESCALATE, FILE ANOTHER, WITHDRAW ================= */
      function escalate() { if (S.phase !== 'slip' || S.cool) return;
        if (noteAction()) return;
        if (!S.surveyDone) S.unrated = true;
        const n = api.now(); S.escTimes = S.escTimes.filter(function (t) { return n - t < 3000 * T; }); S.escTimes.push(n);
        if (S.escTimes.length === 3) say(deal('esc3', ESC3), { mood: 'disappointed' });
        if (S.pos >= S.ladder.length - 1) { toTop(); return; }
        award(1, 'rung climbed'); stat('escalated'); stat('rungs');
        api.sfx('whoosh');
        if (S.escTimes.length < 3) say(deal('esc', ESC_LINES), { mood: 'proud' });
        if (!S.revealed) { S.revealed = true; ladderReveal(); }
        enterRung(S.pos + 1);
      }
      function fileAnother() { if (S.phase !== 'slip' || S.cool) return;
        if (noteAction()) return;
        if (!S.surveyDone) S.unrated = true;
        S.caseNo++; api.sfx('whoosh'); stat('refiled');
        toIntake(true);
      }
      function withdraw(bulk) { S.caseNo++; stat('withdrawn'); award(0.1, 'withdrawn with love'); api.sfx('whoosh');
        if (bulk) stat('shredded');
        api.confetti(undefined, undefined, 8);
        S.cases.push({ no: S.caseNo - 1, rung: 'Withdrawn With Love', text: '', reason: '', quote: '' }); if (S.cases.length > 40) S.cases.shift();
        paintCounters(); D.shred.classList.add(k('open')); stage.classList.add(k('drop'));
        say(bulk ? 'Withdrawn In Bulk, With Love.' : deal('wd', WITHDRAW), { mood: 'smug', priority: 1 });
        if (bulk) soon(1800, function () { say(SPAM.shred, { mood: 'disappointed' }); });
        go('shred');
        later(sc(750), function () { D.shred.classList.remove(k('open')); toIntake(true); });
      }
      function tryWithdraw() { const ok = (S.phase === 'slip') || (S.phase === 'rung' && !S.noEsc) || (S.phase === 'ceremony' && S.special !== 'accept');
        if (!ok) return;
        if (noteAction()) return;
        withdraw(false);
      }
      function toTop() { if (S.lap === 5 && !S.rockPlea) { S.rockPlea = true; rockComplaint(); return; }
        toBrenda();
      }
      function toBrenda() { go('referral'); stat('referrals');
        const brendaLine = S.lap === 1 ? "Brenda: 'I only ever wanted somebody to complain about something I could fix.'" : "Brenda: 'You know.'";
        show(el('div', { class: k('special') }, el('div', { class: k('bigtext') }, 'Brenda, Acting Rock'), el('div', { class: k('rline') }, 'The Rock has referred you to Brenda. Brenda is now Acting Rock. Brenda does not feel acting is the right word.'),
          el('button', { class: k('btn'), type: 'button', onclick: function () { showCert(); } }, 'Proceed to the certificate')));
        say('The Rock has referred you to Brenda. Brenda is now Acting Rock. Brenda does not feel acting is the right word.', { mood: 'disappointed', priority: 1, duration: 6000 });
        later(sc(2800), function () { say(brendaLine, { who: 'Brenda', mood: 'proud', duration: 6500, priority: 1 }); });
        later(sc(4600), function () { dioStamp('love'); setClerks(1, '🙂'); soon(1000, function () { setClerks(S.rush ? S.clerkN : 1); }); });
        later(sc(6200), function () { showCert(); });
      }
      function rockComplaint() { go('rockplea');
        const sel = el('select', { class: k('sel'), 'aria-label': 'Reason for rejecting the Rock' }, ['Too small', 'Too final', 'Not a word', 'Is a word', 'Is a rock', 'Already upheld'].map(function (t) { return el('option', { value: t }, t); }));
        const form = el('div', { class: k('form') }, el('div', { class: k('fhead') }, 'FORM C-1 (COMPLAINT, FILED BY THE ROCK)'), el('div', { class: k('fno') }, 'Grievance No. ' + grievNo() + '-R'),
          el('textarea', { class: k('ta'), rows: 2, readOnly: true, 'aria-label': "The Rock's complaint", value: 'Hm.' }), el('label', { class: k('tiny') }, 'Six equally valid reasons: '), sel, btn('Reject it', function () { rejectIt(); }, 'coral'));
        show(el('div', { class: k('special') }, el('div', { class: k('rline') }, 'The Rock has filed a complaint. It is two letters and a full stop. Please process it.'), form));
        say('The Rock has filed a complaint. Please process it. The Rock will wait. The Rock is good at that.', { mood: 'confused', priority: 1 });
        let done = false;
        function rejectIt() { if (done) return; done = true; sel.disabled = true; api.sfx('stamp'); shake();
          const live = el('button', { class: k('decoy') + ' ' + k('live'), type: 'button', 'aria-label': 'ACCEPT REJECTION (NOT AVAILABLE)' }, el('span', { class: k('rockblob') + ' ' + k('tinyrock'), 'aria-hidden': 'true' }), el('span', { class: k('dlabel') }, 'ACCEPT REJECTION'));
          stage.querySelector('.' + k('special')).appendChild(el('div', { class: k('rline') }, 'The Rock accepts the rejection with a slight, deeply sincere nod. The button is live. For the first and only time.'));
          stage.querySelector('.' + k('special')).appendChild(live);
          later(sc(1400), function () { live.classList.add(k('pressed')); api.sfx('fanfare'); api.confetti(); award(30, 'the Rock accepts'); stat('rockPeace'); api.achieve('complaints-dept.dame');
            say('The Rock has accepted the rejection. It is the first thing in the history of the Department to accept anything.', { mood: 'proud', priority: 2, duration: 7000, force: true });
            S.settled = true; S.index = 0; paintMeter(); D.plaque.hidden = false;
          });
          later(sc(4200), function () { say("Brenda: 'We have a Rock problem. Please take a number.'", { who: 'Brenda', mood: 'confused', priority: 1, force: true }); });
          later(sc(6500), function () { toBrenda(); });
        }
        later(api.selftest ? 3000 : 20000, rejectIt);
      }
      function showCert() { if (S.phase === 'cert') return;
        go('cert'); S.certEnding = false;
        const first = S.firstOfLap ? S.firstOfLap : '(blank)';
        const printBtn = el('button', { class: k('btn'), type: 'button', onclick: function () { printCert(); } }, 'Print Certificate');
        const cont = btn('Continue (Not Required)', function () { endCert(); }, 'small');
        const seal = el('svg', { class: k('seal'), viewBox: '0 0 100 100', 'aria-hidden': 'true' }, el('polygon', { points: '50,2 58,12 70,6 74,19 88,18 86,32 98,38 90,50 98,62 86,68 88,82 74,81 70,94 58,88 50,98 42,88 30,94 26,81 12,82 14,68 2,62 10,50 2,38 14,32 12,18 26,19 30,6 42,12', fill: '#e9b43c', stroke: '#2a2118', 'stroke-width': '3' }), el('circle', { cx: '50', cy: '50', r: '30', fill: 'none', stroke: '#2a2118', 'stroke-width': '2' }), el('text', { x: '50', y: '48', 'text-anchor': 'middle', 'font-size': '7', 'font-weight': '700' }, 'OFFICIAL'), el('text', { x: '50', y: '58', 'text-anchor': 'middle', 'font-size': '7', 'font-weight': '700' }, '(UNOFFICIAL)'));
        const cert = el('div', { class: k('cert') }, el('div', { class: k('ctitle') }, 'CERTIFICATE OF COMPLETED COMPLAINT'), el('p', {}, 'You have exhausted the complaint process. The process is fine. It is resting.'),
          el('p', {}, 'Awarded to ' + PN + ' in recognition of having been told no by a hat, a mirror, a stapler, and a boulder.'),
          el('div', { class: k('sigs') }, ['Gerald (V.P. of Spuds)', 'Sandra (see footnote)', 'The Toaster (toast)', 'Dennis (not present)', 'The Stapler', 'Tuesday (tentative)'].map(function (s) { return el('span', {}, s); })),
          el('p', { class: k('tiny') }, "Sandra's footnote: 'See footnote.'"), el('div', { class: k('sealrow') }, seal, el('span', { class: k('doodle'), 'aria-hidden': 'true' }, '🥪')), el('div', { class: k('qbtns') }, printBtn, cont));
        show(cert); api.sfx('tada'); api.confetti(); wrap.dataset.rung = '14'; soon(isCalm() ? 0 : 1500, function () { cert.style.animation = 'none'; });
        later(sc(2000), function () { say('Congratulations. You have been rejected at every level, by everyone, including a rock. The process is complete.', { mood: 'proud', priority: 1, duration: 9000 }); });
        later(sc(4200), function () { say('Brenda reads, flatly: "' + clean(first) + '" ... Noted.', { who: 'Brenda', priority: 1, duration: 8000 }); });
        later(sc(8000), function () { say('The process has not concluded. It is only resting.', { mood: 'smug', priority: 1 }); });
        later(api.selftest ? 3000 : 25000, endCert);
        let printing = false;
        function printCert() { if (printing) return; printing = true; printBtn.disabled = true; printBtn.textContent = 'Printing...'; api.sfx('tick');
          later(api.selftest ? 1500 : 12000, function () { printBtn.textContent = 'Printer out of Tuesday.'; api.sfx('sad'); later(sc(1500), endCert); });
        }
        try { cont.focus({ preventScroll: true }); } catch (e) { /* ok */ }
      }
      function endCert() { if (S.phase !== 'cert' || S.certEnding) return; S.certEnding = true;
        const c = stage.querySelector('.' + k('cert'));
        if (c) c.appendChild(el('div', { class: k('hugestamp') + ' ' + k('over'), 'aria-hidden': 'true' }, 'REJECTED'));
        api.sfx('stamp'); shake();
        later(sc(1300), resetLap);
      }
      function resetLap() { S.lap++; sv.laps++; S.caseNo++; S.pos = 0; S.reached = 0; S.metaDepth = 0; S.rockDone = false; S.firstSet = false; S.firstOfLap = ''; S.rareUsed = false; S.slipsLap = 0; S.rockPlea = false; S.postcardShown = false;
        award(5, 'lap complete'); stat('laps'); api.sfx('tada');
        S.ladder = buildLadder(S.lap); sv.highestRung = Math.max(sv.highestRung, 1); if (!S.settled) S.index = 7.5;
        saveNow();
        S.preempt = true;
        const rev = sv.laps === 1;
        if (rev) reversalScene(); else toIntake(true);
        say('Lap complete. 5 Meh. The elevator is still a rumor. You took the stairs of hope.', { mood: 'proud', priority: 1 });
        if (!rev) soon(2500, function () { say('Next.', { who: 'Brenda', priority: 1, force: true }); dioStamp('pre'); });
        soon(5200, function () { say('It is nice that somebody came.', { mood: 'smug' }); });
        if (S.lap === 3) soon(9000, function () { say('You have exactly one reason left. It is: no.', { who: 'Brenda', mood: 'smug' }); });
        if (S.lap >= 4) offerHalf();
        if (S.lap >= 6) sayMgmt('The building has grown another rung. Nobody has seen it grow. That is how buildings do it.', { mood: 'confused' });
      }
      function offerHalf() { const card = el('div', { class: k('offer') }, el('p', {}, 'Brenda offers you half her sandwich. It is a gesture. It is also half.'), el('div', { class: k('qbtns') }, btn('Accept half', function () {
            card.remove(); api.sfx('bell'); say("It's just bread.", { who: 'Brenda', mood: 'proud', force: true }); award(1, 'half a sandwich'); stat('brendaSandwiches'); sv.brendaHalf++; api.achieve('complaints-dept.halfsandwich'); saveNow();
          }, 'coral'), btn('Decline', function () { card.remove(); say('Brenda nods. She has been declined by better.', { who: 'Brenda', force: true }); })));
        stage.insertBefore(card, stage.firstChild);
      }
      /* ================= SPAM: THREE TIERS ================= */
      function noteAction() { const n = api.now();
        S.spam = S.spam.filter(function (t) { return n - t < 60000 * T; }); S.spam.push(n);
        const c = function (ms) { return S.spam.filter(function (t) { return n - t < ms * T; }).length; };
        const cd = api.selftest ? 2000 : 10000;
        if (S.tier3At && n - S.tier3At < 30000 * T && c(8000) >= 8) { S.tier3At = 0; withdraw(true); return true; }
        if (c(60000) >= 20 && n >= S.tierAt) { S.tierAt = n + cd; S.tier3At = n; security(); }
        else if (c(5000) >= 8 && n >= S.tierAt) { S.tierAt = n + cd; warmStamp(); }
        else if (c(8000) >= 5) { if (!S.rush) { if (n >= S.tierAt) { S.tierAt = n + Math.round(cd * 0.3); rushStart(); } } else if (S.clerkN < 5) { S.clerkN++; setClerks(S.clerkN); if (S.clerkN >= 3) say(CLERK_ADD[S.clerkN - 3], { mood: 'confused' }); } }
        if (S.rush) S.rushUntil = n + 6000 * T;
        return false;
      }
      function rushStart() { S.rush = true; S.clerkN = 2; S.rushUntil = api.now() + 6000 * T;
        D.siren.hidden = false; setClerks(2); setSign('DUE TO VOLUME WE ARE REJECTING ALL INCOMING VOLUME'); D.sign.classList.add(k('flip'));
        api.sfx('buzz'); wrap.classList.add(k('quake')); soon(650, function () { wrap.classList.remove(k('quake')); });
        say(S.rushN++ === 0 ? SPAM.s1 : deal('rush2', RUSH_AGAIN), { mood: 'panic', priority: 1, force: true });
        award(-0.5, 'Rush Hour Surcharge'); stat('surcharge');
        showBanner('YOUR NUMBER: 4,112 / NOW SERVING: 3');
        soon(2200, function () { say(SPAM.s1b, { mood: 'smug' }); });
        soon(4400, function () { say(SPAM.s1c, { mood: 'confused' }); });
        soon(6800, function () { say(SPAM.s1d, { mood: 'smug' }); });
      }
      function endRush() { S.rush = false; S.clerkN = 1; D.siren.hidden = true; setClerks(1); D.sign.classList.remove(k('flip'));
        setSign('WINDOW 4 IS OPEN (PROVISIONALLY)');
      }
      function warmStamp() { S.cool = true; stage.inert = true; D.cool.hidden = false; D.smoke.hidden = false; D.arm.classList.add(k('hot'));
        const dur = api.selftest ? 800 : 4000, f = D.cool.querySelector('.' + k('coolfill'));
        f.style.transition = 'none'; f.style.width = '0%'; void f.offsetWidth; f.style.transition = 'width ' + dur + 'ms linear'; f.style.width = '100%';
        api.sfx('buzz'); say((S.warmN = (S.warmN || 0) + 1) === 1 ? SPAM.s2 : deal('w2', WARM_AGAIN), { mood: 'panic', priority: 1, duration: 6500, force: true });
        soon(Math.min(2400, dur / 2), function () { say(SPAM.s2b, { mood: 'smug', duration: 6500 }); });
        soon(dur, function () { S.cool = false; stage.inert = false; D.cool.hidden = true; D.smoke.hidden = true; D.arm.classList.remove(k('hot'));
          S.warmNext = true; api.achieve('complaints-dept.volume');
        });
      }
      function security() { if (S.secBusy) return; S.secBusy = true;
        const man = el('div', { class: k('sec'), 'aria-hidden': 'true' }, el('span', { class: k('manemoji') }, '🧍'), el('span', { class: k('chairemoji') }, '🪑'));
        stagewrap.appendChild(man);
        say((S.secN = (S.secN || 0) + 1) === 1 ? SPAM.s3 : deal('s3x', SEC_AGAIN), { mood: 'smug', priority: 1, duration: 6500, force: true }); award(0.1, 'security'); stat('security');
        soon(2400, function () { say(SPAM.s3b, { mood: 'disappointed' }); });
        soon(4200, function () { say(SPAM.s3c, { mood: 'smug', duration: 6500 }); man.appendChild(el('span', { class: k('formcard') }, 'FORM 27B/6')); });
        soon(6600, function () { man.remove(); S.secBusy = false; });
      }
      /* ================= IDLE (INTAKE ONLY) ================= */
      const draft = el('div', { class: k('draft'), hidden: true }), slidNote = el('div', { class: k('slidnote'), hidden: true }, 'Thank you for not complaining. Nobody ever doesn\'t.');
      diorama.appendChild(draft); diorama.appendChild(slidNote);
      let rejectIt = null;
      function idleClear() { draft.hidden = true; draft.textContent = ''; slidNote.hidden = true; slidNote.classList.remove(k('withdrawn')); D.clock.hidden = true; D.sign.classList.remove(k('flip'));
        if (rejectIt) { rejectIt.remove(); rejectIt = null; }
        building.classList.remove(k('nudge'));
      }
      function idleRestore() { const had = S.idleStage;
        if (had >= 6) { setSign(S.rush ? 'DUE TO VOLUME WE ARE REJECTING ALL INCOMING VOLUME' : 'WINDOW 4 IS OPEN (PROVISIONALLY)'); D.clock.hidden = true; if (!S.rush) D.sign.classList.remove(k('flip')); }
        if (had >= 7) { setClerks(S.rush ? S.clerkN : 1); soon(1800, function () { say(had >= 8 ? 'Brenda has returned. The sandwich has been thanked for its service and promoted back to a sandwich.' : 'Brenda is back from lunch. She says it was a normal lunch for someone who is not a time.', { who: 'Brenda', mood: 'smug', duration: 6000 }); }); }
        if (had >= 6 && !S.i9) { S.i9 = true; slidNote.classList.add(k('withdrawn')); say(IDLE_LINES.I9, { mood: 'smug', who: 'Management' }); soon(3000, function () { slidNote.hidden = true; }); }
        else if (had >= 6) slidNote.hidden = true;
        draft.hidden = true; if (rejectIt) { rejectIt.remove(); rejectIt = null; }
        S.idleStage = 0; S.idleN = 0;
      }
      function idleFire(i) { const n = api.now();
        if (i === 0) say(deal('mi', MGMT_IDLE), { mood: 'confused' });
        else if (i === 1) { S.idleN = 1; S.idleLast = n; dioStamp('rej'); say(IDLE_LINES.I1, { who: 'Brenda', mood: 'smug', duration: 5000 }); }
        else if (i === 2) say(deal('mi', MGMT_IDLE), { mood: 'disappointed' });
        else if (i === 3) { say(IDLE_LINES.I5, { mood: 'confused', duration: 7000 });
          draft.hidden = false; draft.textContent = ''; let ch = 0; const txt = IDLE_LINES.I5b;
          const iv = every(40, function () { if (ch < txt.length) { ch++; draft.textContent = txt.slice(0, ch); } else api.clearInterval(iv); });
        } else if (i === 4) { say(IDLE_LINES.I6, { mood: 'confused', duration: 7000, who: 'Brenda' });
          if (!rejectIt) { rejectIt = el('button', { class: k('btn') + ' ' + k('coral') + ' ' + k('rejectit'), type: 'button', onclick: function () { if (S.phase !== 'intake' || !rejectIt) return;
              rejectIt.remove(); rejectIt = null; draft.hidden = true; dioStamp('unoff'); api.sfx('fanfare'); api.confetti(undefined, undefined, 10);
              award(15, 'accepted unofficially'); api.achieve('complaints-dept.kindest'); stat('kindest');
              say(IDLE_LINES.I6b, { mood: 'proud', priority: 2, force: true, duration: 8000 });
              S.idleStage = 0; S.idleN = 0; S.lastInput = api.now();
            } }, 'Reject it');
            stage.insertBefore(rejectIt, stage.firstChild);
          }
        } else if (i === 5) { slidNote.hidden = false; say(IDLE_LINES.I7, { mood: 'proud', duration: 7000 }); api.achieve('complaints-dept.silent'); api.sfx('bell');
        } else if (i === 6) { setSign('BACK IN 1 HOUR (PROVISIONAL)'); D.sign.classList.add(k('flip')); D.clock.hidden = false; say('The sign has flipped. The wall clock is running backwards, with confidence.', { mood: 'confused' }); }
        else if (i === 7) { setSign('BACK AFTER LUNCH (LUNCH IS NOT A TIME)'); D.sign.classList.add(k('flip')); setClerks(1, '🪑'); say(IDLE_LINES.I10, { mood: 'confused', duration: 7000 }); }
        else if (i === 8) { setClerks(1, '🥪'); api.sfx('bloop'); say(IDLE_LINES.I11, { mood: 'smug', duration: 7000 }); }
        else if (i === 9) { building.classList.add(k('nudge')); api.sfx('tick'); showBanner(IDLE_LINES.I8); say(IDLE_LINES.I8, { mood: 'panic', priority: 1 }); api.achieve('complaints-dept.observed'); }
      }
      const IDLE_AT = [20, 45, 70, 90, 150, 180, 240, 330, 450, 600];
      function idleTick() { const n = api.now();
        if (S.rush && n > S.rushUntil) endRush();
        if (S.phase !== 'intake' || S.cool || destroyed || document.hidden) return;
        const idle = (n - S.lastInput) / 1000, k30 = api.selftest ? 1 / 30 : 1;
        if (S.idleStage >= 2 && S.idleStage < 4 && S.idleN < 4 && idle < 90 * k30 && n - S.idleLast >= 5000 * k30) { S.idleN++; S.idleLast = n; dioStamp('rej'); say(IDLE_LINES['I' + S.idleN], { who: 'Brenda', mood: 'smug', duration: 5000 }); return;
        }
        if (S.idleStage < IDLE_AT.length && idle >= IDLE_AT[S.idleStage] * k30) { if (api.selftest && S.idleStage === 9) return;
          idleFire(S.idleStage); S.idleStage++;
        }
      }
      let sec = 0;
      function tickerTick() { sec++;
        if (sec % 3 === 0) { tickN++; paintTicker(); }
        if (sec % 6 === 0 && ta && S.phase === 'intake' && !ta.value) ta.placeholder = deal('ph', PLACEHOLDERS);
        murmur();
      }
      function murmur() { const n = api.now();
        if (destroyed || !phaseCalm() || n < S.quiet || n - S.lastSayAt < 22000 * T) return;
        if (S.phase === 'intake' && S.idleStage > 0) return;
        const typing = S.phase === 'intake' && ta && ta.value.length > 8;
        say(typing ? deal('typ', TYPING) : deal('mur', MURMUR), { who: typing ? 'Brenda' : 'Management', mood: 'smug' });
      }
      /* ---------- the 3 and 10 minute surprises ---------- */
      function whenCalm(fn, tries) { if (destroyed) return;
        if (phaseCalm() && api.now() >= S.quiet) { fn(); return; }
        if ((tries || 0) < 60) soon(6000 * T, function () { whenCalm(fn, (tries || 0) + 1); });
      }
      function reorg() { if (S.mile3) return; S.mile3 = true;
        if (S.idleStage >= 2) return;
        stat('reorgs'); wrap.classList.add(k('flipped')); api.sfx('bell'); award(3, 'Reorganization Bonus');
        showBanner('NOTICE: The Department has been reorganized. It is exactly where it was, facing the other way.');
        say('Attention. As of 3 minutes ago the Department has been reorganized. Nobody was told. Nobody has moved. Everyone is in a different order.', { mood: 'proud', priority: 1, force: true, duration: 8000 });
        soon(5000 * T, function () { D.name.textContent = 'Brenda, Interim Brenda'; say("Brenda: 'I have been moved to Window 4. I was at Window 4. I have been moved there firmly.'", { who: 'Brenda', mood: 'confused', priority: 1, force: true, duration: 6500 }); });
        soon(11000 * T, function () { say('Reorganization Bonus: 3 Meh, transferred from a department that no longer exists. It has been told. It was relieved.', { mood: 'smug', priority: 1, force: true, duration: 6500 }); });
        soon(17000 * T, function () { const c = cbLine(); if (c) say(c, { mood: 'smug', duration: 7000 }); });
        soon(24000 * T, function () { wrap.classList.remove(k('flipped')); paintDiorama(); showBanner('The Department has been reorganized back. Nobody noticed. This is the mark of a good reorganization.'); });
      }
      function review() { if (S.mile10) return; S.mile10 = true; stat('reviews'); const N = S.mountFiled;
        const rv = function (t, ms, o) { soon(ms * T, function () { say(t, Object.assign({ mood: 'smug', priority: 1, force: true, duration: 7000 }, o || {})); }); };
        rv('It has been 10 minutes. Management has been asked to conduct your annual review. It is annual because it is the only one.', 0, { mood: 'proud' });
        rv('Strengths: attendance, and a strong sense of being here. Areas for growth: the other areas.', 5500);
        rv(N > 0 ? 'You have filed ' + N + (N === 1 ? ' complaint' : ' complaints') + ' this session. All have been rejected. This is the best rejection rate ever recorded by a person who is not a stamp.' : 'You have filed 0 complaints in 10 minutes. HR has been called. HR is a drawer. The drawer has questions.', 11000);
        rv('Overall rating: 7 1/2 out of 7 1/2. A perfect score. A fraction of a perfect score. Both are in force.', 16500);
        soon(22000 * T, function () { let tl = ''; try { tl = clean(api.line('ticker')); } catch (e) { tl = ''; } if (tl) say('Outside the window, the news ticker has just reported: ' + tl, { mood: 'confused', priority: 1, force: true, duration: 9000 }); });
        soon(28000 * T, function () { award(10, 'Employee of the Quarter'); api.achieve('complaints-dept.tenure'); api.sfx('fanfare'); api.confetti(); toast('Employee of the Quarter (Quarter To Be Confirmed)');
          showBanner('EMPLOYEE OF THE QUARTER (QUARTER TO BE CONFIRMED)');
          say('You are Employee of the Quarter. The quarter has not been identified. A search is under way, in a drawer.', { mood: 'proud', priority: 2, force: true, duration: 8000 });
        });
        rv('Thank you for staying. People do not usually stay. It is nice to have somebody to review.', 36000, { mood: 'neutral', duration: 8000 });
      }
      /* ================= KEYBOARD AND POINTER ================= */
      function onAct(isKey, tg) { kbd = !!isKey; S.lastInput = api.now();
        const onDraft = !!(rejectIt && tg && (tg === rejectIt || (rejectIt.contains && rejectIt.contains(tg)))); /* pressing the draft button must not withdraw it before the press lands */
        if (S.idleStage > 0 && S.phase === 'intake' && !onDraft) idleRestore();
        if (S.phase === 'rung') rearmSoft();
        if (S.phase === 'ceremony') expedite();
      }
      function onKey(e) { onAct(true, e.target);
        const tg = e.target, tag = tg && tg.tagName ? tg.tagName : '', typing = /^(INPUT|TEXTAREA|SELECT)$/.test(tag) || !!(tg && tg.isContentEditable), key = e.key;
        if (e.ctrlKey || e.metaKey || e.altKey) { if (!(key === 'Enter' && e.ctrlKey && tg === ta && S.phase === 'intake' && !S.cool)) return; e.preventDefault(); submit(); return; }
        if (key === 'Escape') { if (S.drawer) { toggleDrawer(false); return; }
          if (S.cool) return;
          if (S.phase === 'intake') { if (ta && ta.value) { ta.value = ''; prevLen = 0; S.firstAt = 0; S.instant = false; paintTicker(); say('Brenda has taken your complaint back. She says she will keep it somewhere safe, which is the bin.', { who: 'Brenda', mood: 'smug' }); } return; }
          if (e.shiftKey) tryWithdraw(); return;
        }
        if (S.cool) return;
        if (typing) { if (key === 'Enter' && tg === ta && S.phase === 'intake' && !e.shiftKey) { e.preventDefault(); submit(); }
          return;
        }
        if (key === ' ' || key === 'Spacebar') { if (S.phase === 'ceremony' && tag !== 'BUTTON' && !S.sceneOn) { e.preventDefault(); skipCeremony(); } return; }
        if (/^[1-9]$/.test(key)) { if (S.onDigit) S.onDigit(Number(key)); return; }
        if ((key === 'e' || key === 'E') && S.phase === 'slip') { escalate(); return; }
        if ((key === 'r' || key === 'R') && S.phase === 'slip' && S.readText) { say(S.readText, { mood: 'neutral', force: true, duration: 6000 }); return; }
      }
      /* ================= BOOT ================= */
      building.hidden = true;
      api.on(root, 'keydown', onKey);
      api.on(root, 'pointerdown', function (e) { onAct(false, e.target); });
      api.on(window, 'resize', onResize);
      let hidAt = 0; api.on(document, 'visibilitychange', function () { if (document.hidden) hidAt = api.now(); else if (hidAt) { S.lastInput += api.now() - hidAt; hidAt = 0; } });
      api.setInterval(idleTick, 1000);
      api.setInterval(tickerTick, 1000);
      toIntake(false); onResize(); booted = true;
      soon(api.selftest ? 150 : 1000, function () { say(A_OPEN[0], { mood: 'neutral' }); });
      soon(api.selftest ? 600 : 70000, function () { say(S.phase === 'intake' ? A_OPEN[1] : A_OPEN[4], { mood: 'proud' }); });
      soon(api.selftest ? 1100 : 28000, function () { if (sv.filed > 0) say('Welcome back, ' + PN + '. The Department has kept your ' + sv.filed + ' complaints warm. Brenda has kept her sandwich warmer.', { mood: 'smug', who: 'Brenda' }); else say(A_OPEN[2], { mood: 'smug' }); });
      soon(api.selftest ? 1700 : 16000, function () { if (S.phase === 'intake') say(A_OPEN[3], { mood: 'neutral' }); });
      soon(api.selftest ? 2400 : 40000, function () { if (!phaseCalm()) return; const c = cbLine(); if (c) say(c, { mood: 'smug', duration: 7000 }); });
      soon(180000 * T, function () { whenCalm(reorg); });
      soon(600000 * T, function () { whenCalm(review); });
      return { destroy: function () { destroyed = true; saveNow(); } };
    }
  });
})();
