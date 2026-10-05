/* POINTLESS module: maze-of-meh */
(function () {
  'use strict';
  const P = window.POINTLESS;
  P.injectCSS(`
.m-maze-of-meh-wrap{display:flex;flex-direction:column;gap:8px;max-width:760px;width:100%;margin:0 auto;color:#2b2438;font-family:system-ui,"Segoe UI",Roboto,sans-serif}.m-maze-of-meh-head{display:flex;flex-wrap:wrap;align-items:center;justify-content:space-between;gap:8px 12px;position:relative}
.m-maze-of-meh-plaque{position:relative;min-width:150px;padding:6px 24px;text-align:center;font-family:Georgia,"Times New Roman",serif;font-weight:800;color:#3b2a08;background:linear-gradient(#f6d468,#c79a2a);border:2px solid #2b2438;border-radius:10px;
  box-shadow:inset 0 2px 0 rgba(255,255,255,.55),inset 0 -3px 0 rgba(0,0,0,.18),3px 3px 0 #2b2438;perspective:300px}.m-maze-of-meh-plaque::before,.m-maze-of-meh-plaque::after{content:"";position:absolute;top:50%;width:8px;height:8px;margin-top:-4px;border-radius:50%;
  background:radial-gradient(circle at 35% 30%,#fff,#8c6a14 70%);box-shadow:0 0 0 1px #2b2438}.m-maze-of-meh-plaque::before{left:7px}.m-maze-of-meh-plaque::after{right:7px}.m-maze-of-meh-ptxt{display:inline-block;white-space:nowrap;line-height:1.2;transform-origin:50% 50%}
.m-maze-of-meh-flip{animation:m-maze-of-meh-flip .5s ease-in-out}@keyframes m-maze-of-meh-flip{0%{transform:rotateX(0)}50%{transform:rotateX(90deg)}100%{transform:rotateX(0)}}.m-maze-of-meh-chips{display:flex;flex-wrap:wrap;gap:6px}
.m-maze-of-meh-chip{background:#fff;border:2px solid #2b2438;border-radius:999px;padding:2px 10px;font-weight:800;font-size:.78rem;box-shadow:2px 2px 0 #2b2438;white-space:nowrap;font-variant-numeric:tabular-nums}
.m-maze-of-meh-postit{position:absolute;right:-2px;top:-12px;transform:rotate(6deg);background:#fff59a;padding:5px 10px;font-weight:800;font-size:.8rem;
  font-family:"Segoe Script","Bradley Hand","Comic Sans MS",cursive;box-shadow:2px 3px 0 rgba(43,36,56,.35);animation:m-maze-of-meh-stick .35s ease-out;z-index:3}.m-maze-of-meh-peel{animation:m-maze-of-meh-peel .5s ease-in forwards}
@keyframes m-maze-of-meh-stick{from{transform:rotate(6deg) scale(2);opacity:0}to{transform:rotate(6deg) scale(1);opacity:1}}@keyframes m-maze-of-meh-peel{to{transform:rotate(40deg) translate(30px,-40px);opacity:0}}
.m-maze-of-meh-stage{position:relative;align-self:center;max-width:100%;border:2px solid #2b2438;border-radius:14px;box-shadow:4px 4px 0 #2b2438;background:#fff6df;overflow:hidden;line-height:0}.m-maze-of-meh-stage:focus-visible{outline:3px solid #6aa8f0;outline-offset:3px}
.m-maze-of-meh-canvas{display:block;touch-action:none;max-width:100%;cursor:pointer}.m-maze-of-meh-banner{position:absolute;top:10px;left:50%;transform:translateX(-50%) rotate(-2deg);max-width:92%;text-align:center;line-height:1.15;
  background:#ff7a6b;border:3px solid #2b2438;border-radius:10px;padding:8px 14px;font-weight:900;font-size:.95rem;letter-spacing:.04em;box-shadow:3px 3px 0 #2b2438;animation:m-maze-of-meh-drop .3s ease-out}.m-maze-of-meh-banner[hidden]{display:none}
@keyframes m-maze-of-meh-drop{from{transform:translateX(-50%) translateY(-60px) rotate(-2deg);opacity:0}to{transform:translateX(-50%) rotate(-2deg);opacity:1}}
.m-maze-of-meh-over{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;transition:opacity .6s;display:flex;align-items:center;justify-content:center;line-height:1.08}.m-maze-of-meh-overon{opacity:1}
.m-maze-of-meh-big{font-size:clamp(22px,6.4vw,58px);font-weight:900;text-align:center;padding:14px;letter-spacing:.02em;transition:transform .9s ease-in,opacity .9s ease-in;transform-origin:100% 0}.m-maze-of-meh-bigin{animation:m-maze-of-meh-bigdrop .6s ease-out}
.m-maze-of-meh-fold{transform:translate(-40%,-46%) scale(.08);opacity:0}@keyframes m-maze-of-meh-bigdrop{from{transform:translateY(-120%)}to{transform:translateY(0)}}.m-maze-of-meh-sockw,.m-maze-of-meh-sockdoor{position:absolute;top:60%;font-size:34px;line-height:1;opacity:0}
.m-maze-of-meh-sockdoor{right:7%;top:58%;font-size:42px}.m-maze-of-meh-sockgo.m-maze-of-meh-sockw{animation:m-maze-of-meh-sockwalk 2.3s linear forwards,m-maze-of-meh-sockhop .3s ease-in-out infinite alternate}
.m-maze-of-meh-sockgo.m-maze-of-meh-sockdoor{animation:m-maze-of-meh-doorf 2.3s linear forwards}@keyframes m-maze-of-meh-sockwalk{0%{left:-12%;opacity:1}80%{left:76%;opacity:1}100%{left:84%;opacity:0}}@keyframes m-maze-of-meh-sockhop{from{margin-top:0}to{margin-top:-9px}}
@keyframes m-maze-of-meh-doorf{0%{opacity:0}12%{opacity:1}88%{opacity:1}100%{opacity:0}}.m-maze-of-meh-hint{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);width:max-content;max-width:92%;text-align:center;line-height:1.25;pointer-events:none;
  background:#fff59a;border:2px solid #2b2438;border-radius:8px;padding:5px 10px;font-weight:800;font-size:.76rem;box-shadow:2px 2px 0 #2b2438;transition:opacity .8s}.m-maze-of-meh-hint[hidden]{display:none}.m-maze-of-meh-hintoff{opacity:0}
.m-maze-of-meh-rev{position:absolute;left:50%;top:7%;transform:translateX(-50%) rotate(1deg);width:min(88%,320px);background:#fffdf2;border:2px solid #2b2438;border-radius:6px;padding:8px 12px;pointer-events:none;
  font:700 .78rem/1.35 "Courier New",monospace;box-shadow:3px 4px 0 rgba(43,36,56,.4);text-align:left}.m-maze-of-meh-rev[hidden]{display:none}.m-maze-of-meh-rev b{display:block;border-bottom:2px solid #2b2438;margin-bottom:3px;letter-spacing:.04em}.m-maze-of-meh-revok{color:#a3321f}
.m-maze-of-meh-ticker{min-height:2.7em;max-height:5.4em;background:#fff;border:2px solid #2b2438;border-radius:10px;padding:5px 10px;font-weight:700;font-size:.88rem;line-height:1.28;overflow:auto;box-shadow:3px 3px 0 #2b2438}
.m-maze-of-meh-bar{display:flex;align-items:center;gap:8px;font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em}.m-maze-of-meh-track{flex:1;height:6px;background:#e8dfc6;border:1px solid #2b2438;border-radius:6px;overflow:hidden}
.m-maze-of-meh-fill{height:100%;width:0;background:#7fd6b0}.m-maze-of-meh-hot{background:#ff7a6b}.m-maze-of-meh-card{position:relative;background:#fffbe0;border:2px solid #2b2438;border-radius:6px;padding:14px 16px 10px;transform:rotate(-1.5deg);box-shadow:3px 4px 0 rgba(43,36,56,.35);
  font-family:"Segoe Script","Bradley Hand","Comic Sans MS",cursive;font-size:.98rem;line-height:1.35;max-height:150px;min-height:62px;overflow:auto;margin:6px 4px 2px}
.m-maze-of-meh-card::before{content:"";position:absolute;top:-9px;left:50%;width:70px;height:16px;margin-left:-35px;background:rgba(245,184,46,.7);transform:rotate(3deg)}.m-maze-of-meh-empty{background:transparent;border-style:dashed;box-shadow:none;opacity:.55;font-size:.88rem}
.m-maze-of-meh-nerv{letter-spacing:.07em;animation:m-maze-of-meh-shake .18s linear infinite}
@keyframes m-maze-of-meh-shake{0%{transform:rotate(-1.5deg) translate(0,0)}25%{transform:rotate(-1.5deg) translate(1px,0)}75%{transform:rotate(-1.5deg) translate(-1px,1px)}100%{transform:rotate(-1.5deg) translate(0,0)}}
.m-maze-of-meh-cardst{display:block;font-family:system-ui,sans-serif;font-size:.7rem;font-weight:800;text-transform:uppercase;letter-spacing:.06em;opacity:.7;margin-top:4px}
.m-maze-of-meh-pocket{display:flex;align-items:center;gap:6px;flex-wrap:wrap;font-size:.72rem;font-weight:800;text-transform:uppercase;letter-spacing:.05em}
.m-maze-of-meh-slot{width:34px;height:34px;min-width:34px;display:inline-flex;align-items:center;justify-content:center;font-size:1rem;border:2px solid #2b2438;border-radius:8px;background:#fff;padding:0;cursor:pointer}.m-maze-of-meh-slot:disabled{border-style:dashed;opacity:.45;cursor:default}
.m-maze-of-meh-ctl{display:flex;flex-wrap:wrap;gap:10px 14px;align-items:center;justify-content:space-between}.m-maze-of-meh-acts{display:grid;grid-template-columns:1fr 1fr;gap:8px;flex:1 1 220px}
.m-maze-of-meh-btn{min-height:44px;min-width:44px;padding:6px 14px;font:inherit;font-weight:900;color:#2b2438;border:2px solid #2b2438;border-radius:12px;background:#fff;box-shadow:3px 3px 0 #2b2438;cursor:pointer}
.m-maze-of-meh-btn:active:not(:disabled){transform:translate(2px,2px);box-shadow:1px 1px 0 #2b2438}.m-maze-of-meh-btn:disabled{opacity:.7;cursor:default}.m-maze-of-meh-btn:focus-visible,.m-maze-of-meh-slot:focus-visible{outline:3px solid #6aa8f0;outline-offset:2px}
.m-maze-of-meh-act{grid-column:1/-1;background:#f5b82e}.m-maze-of-meh-pad{display:grid;grid-template-columns:repeat(3,46px);grid-template-rows:repeat(2,46px);gap:4px}.m-maze-of-meh-pad .m-maze-of-meh-btn{padding:0;font-size:1.2rem;width:46px;height:46px;touch-action:none}
.m-maze-of-meh-up{grid-column:2;grid-row:1}.m-maze-of-meh-lf{grid-column:1;grid-row:2}.m-maze-of-meh-dn{grid-column:2;grid-row:2}.m-maze-of-meh-rt{grid-column:3;grid-row:2}.m-maze-of-meh-legend{text-align:center;font-size:.8rem;font-weight:700;opacity:0;transition:opacity 1.2s}
.m-maze-of-meh-legendon{opacity:.7}
@media (max-width:420px){.m-maze-of-meh-ctl{flex-direction:column;align-items:stretch}.m-maze-of-meh-acts{flex:0 0 auto}.m-maze-of-meh-pad{align-self:center}.m-maze-of-meh-head{justify-content:center}.m-maze-of-meh-chips{justify-content:center;flex-wrap:nowrap;gap:4px}
  .m-maze-of-meh-chip{font-size:.66rem;padding:1px 7px}.m-maze-of-meh-chip:last-child{display:none}.m-maze-of-meh-ticker{font-size:.8rem;min-height:4.1em;max-height:6.2em}}
@media (prefers-reduced-motion:reduce){.m-maze-of-meh-flip,.m-maze-of-meh-banner,.m-maze-of-meh-postit,.m-maze-of-meh-nerv,.m-maze-of-meh-bigin,.m-maze-of-meh-sockgo{animation:none!important}.m-maze-of-meh-sockw,.m-maze-of-meh-sockdoor{display:none}
  .m-maze-of-meh-legend{opacity:.7;transition:none}.m-maze-of-meh-over,.m-maze-of-meh-big{transition:none}}
`, 'css-maze-of-meh');
  P.addAchievements([
    { id: 'maze-of-meh.steps100', name: 'Grand Marshal of the Meandering Arts', desc: 'Take 100 steps. Nobody asked where to.', icon: '🧭', reward: 3,
      check: function (s) { return (s['maze-of-meh.steps'] || 0) >= 100; } },
    { id: 'maze-of-meh.firstexit', name: 'Lord Protector of Level 7 1/2', desc: 'Reach the exit for the first time. The maze behind it is exactly like the one you left.', icon: '🚪', reward: 5,
      check: function (s) { return (s['maze-of-meh.exits'] || 0) >= 1; } },
    { id: 'maze-of-meh.chairs7', name: 'Chair Laureate of the Dead End', desc: 'Read 7 different notes. All of them are from you. All of them are right.', icon: '🪑', reward: 5,
      check: function (s) { return (s['maze-of-meh.notes'] || 0) >= 7; } },
    { id: 'maze-of-meh.almost8', name: 'Supreme Archduke of Almost Level 8', desc: 'Reach Level 7 31/32. The plaque is proud of you in a very small font.', icon: '🏅', reward: 6 },
    { id: 'maze-of-meh.signs', name: 'Cartographer of the Deeply Unsure', desc: 'Follow the Sign 10 times and be wrong 10 times. The Sign is 100% confident you did well.', icon: '🚸', reward: 5,
      check: function (s) { return (s['maze-of-meh.signFollows'] || 0) >= 10; } },
    { id: 'maze-of-meh.retired', name: 'The Wall Whisperer Who Was Heard', desc: 'Bump one wall 60 times in a level. It would like you to visit Florida.', icon: '🎂', secret: true, reward: 10 },
    { id: 'maze-of-meh.quorum', name: 'Quorum Keeper of the Quietest Meeting', desc: 'Sit in one chair for 60 seconds. The minutes say eleven attendees.', icon: '🕒', secret: true, reward: 8 },
    { id: 'maze-of-meh.idle', name: 'Patron Saint of the Pause', desc: 'Do nothing for a full minute and the Arrow takes the chair for you. It is a lovely chair.', icon: '🌙', secret: true, reward: 6 },
    { id: 'maze-of-meh.pest', name: 'Supreme Overachieving Wall Pest', desc: 'Press 40 things in 3 seconds. The walls are filing a report and you are cc\'d.', icon: '📣', secret: true, reward: 5 },
    { id: 'maze-of-meh.stitched', name: 'Auditor of Seats, Third Class', desc: 'Sit in every chair in a level without leaving it. The chairs noticed. So did the auditors.', icon: '📝', secret: true, reward: 8 },
    { id: 'maze-of-meh.level8', name: 'Escapee of the Maze of Meh', desc: 'YOU HAVE EXITED THE MAZE OF MEH. You are now in the Maze of Meh.', icon: '🏁', secret: true, reward: 15 },
    { id: 'maze-of-meh.stare', name: 'High Chancellor of Sustained Eye Contact With Masonry', desc: 'Click the same wall 7 times. It is trying to look load-bearing.', icon: '👀', secret: true, reward: 7 },
    { id: 'maze-of-meh.lunch', name: 'Patient Customer of the Closed Door', desc: 'Wait out the exit\'s lunch break. The line behind you is very polite.', icon: '🥪', secret: true, reward: 6 },
    { id: 'maze-of-meh.reviewed', name: 'Reviewed and Found Present', desc: 'Attend your performance review. Overall: spiritually adequate.', icon: '📋', secret: true, reward: 6 },
    { id: 'maze-of-meh.sockescort', name: 'Escort of the Sock', desc: 'Notice the sock three times. Then watch it leave.', icon: '🧦', secret: true, reward: 9 },
    { id: 'maze-of-meh.escape', name: 'Sovereign Emperor-Elect of Escape (Provisional)', desc: 'Press Escape 12 times. Escape has nothing to give, and has given you this.', icon: '🔑', secret: true, reward: 6 },
    { id: 'maze-of-meh.pin', name: 'Ten-Minute Service Pin, Gold-Coloured', desc: 'Sit in the chair Management presents at ten minutes of service. It was under you the whole time. It is not gold.', icon: '🥇', secret: true, reward: 8 }
  ]);
  const LINES = {
    welcome: ["Welcome to the Maze of Meh. Arrows, WASD or a confident tap will do. The exit is the glowing door, and Management has circled it twice.", "Orientation: the exit is not hidden. It is merely far, and glowing, as budgeted.", "Arrow keys, WASD, a mouse, a thumb. Management has no preference and has written one down.", "This maze has been certified Moderately Confusing by a committee that got lost on the way to certifying it." ],
    loopWelcome: ["Welcome to the Maze of Meh.", "Welcome to the Maze of Meh. Again. This is the first time Management has said 'again', and it is very proud of the word.", "Welcome to the Maze of Meh. Management has prepared remarks. They are the remarks from last time. They have aged well.", "Welcome to the Maze of Meh. You know where everything is. Everything is where it was. Management finds this moving and cannot say why.", "Welcome back to the Maze of Meh. We have stopped saying 'welcome to'. You live here now. There is a form for that, and the form is the maze." ],
    relabelSolid: ["Wall %n% has been relabelled '%label%'. It was not consulted.", "Wall %n% is now '%label%'. What it bears is not disclosed.", "Wall %n% has been marked '%label%'. Wall %n% would like to clarify that it is mostly emotional support.", "Relabelling: wall %n%, '%label%'. Nothing about wall %n% has changed. Wall %n% feels seen.", "Wall %n% is '%label%' as of 4:17 PM. At 4:16 it was also a wall. Nobody is saying what changed at 4:17.", "Wall %n% has been promoted to '%label%'. It has been told this is a promotion. It has not been told what the promotion is." ],
    relabelDoor: ["Wall %n% has been installed in the corridor. It was a doorway. It is now '%label%' and a little defensive.", "A doorway has been relabelled '%label%'. The doorway would like it noted that it was open for years and nobody said thank you."],
    relabelKnow: ["Wall %n% saw this coming and has not said anything.", "Wall %n% was relabelled. It asked to be told sooner. It was told sooner. It was told right now.", "Wall %n% turned up already wearing the label. It has declined to say who gave it.", "Wall %n% has been relabelled. It nodded first. Walls cannot nod. It knew.", "The walls now stand a little differently before a relabelling. Wall %n% is calling it 'posture'." ],
    relMile: { 10: "Relabelling number 10. The labels have been laminated. They were already laminated. Management laminated the lamination.", 25: "Relabelling number 25. A small cake has been drawn.",
      50: "Relabelling number 50. The walls have asked whether this is the job now. It is the job now.", 100: "Relabelling number 100. Wall 14 has asked for a plaque.",
      250: "Relabelling number 250. Management has run out of labels and is using the walls' own names. The walls are touched." },
    bumpMile: { 1: "First contact. The wall wishes to say it was here first and has no hard feelings.", 10: "Bump 10. The wall has opened a ledger.",
      25: "Bump 25. The ledger has a second page. The second page is for feelings.", 50: "Bump 50. The walls have held a vote on you. It was unanimous. The motion was 'noted'.",
      100: "Bump 100. A small plaque has been ordered. It will read 'Bumped, Often'. It will be late.", 250: "Bump 250. The walls have named a day after you. It is a Tuesday. They ask you to stay away from it." },
    stepSay: { 10: "10 steps. Management is tracking the direction loosely.", 25: "25 steps. You are a quarter of the way to a number nobody set.", 50: "50 steps. Halfway to 100, which is also not a destination.", 75: "75 steps. That is 7 1/2 x 10. Management has framed it." },
    deadEnd: ["Dead end. A chair has been provided. Management does not know who provides them. Management has not asked.", "Another dead end. Another chair. The maze is consistent in the way a form is consistent.",
      "End of the line. The chair faces the way you came. It has opinions about that.", "A dead end with a chair. This is called an amenity."],
    chairFirst: ["A chair. Nobody asked for one. Somebody provided it. Both of these are the maze."],
    chairFirstM: ["Dead end reached. A chair has been left for you. It is not a hint. It is a chair."],
    capWalk: ["The Arrow's attention span is 8 steps. It has been told this is generous.", "Click-walking is capped at 8 steps. Management cannot say why 8. Management has said 8."],
    hurtM: ["Management has received a complaint from a wall. It has been told to take a number.", "A wall has filed a grievance. Management has forwarded it to the Stapler, who was already on it."],
    retireM: ["Management congratulates the wall on its retirement. Management has been asked to retire six times since lunch."],
    lunch: ["BACK IN 7 1/2 MINUTES", "The exit has gone to lunch. A sign says so. The sign is in the exit's handwriting."],
    lunchMenu: ["Today's menu: Meh, with a side of Meh. Allergens: purpose.", "Soup of the day: the same soup. Management has had it. Management recommends waiting."],
    lunchBump: ["The door is on lunch. Please queue. The queue is you.", "Knocking has been noted. Knocking has been told the door is eating.", "The Stapler (Union Rep) is picketing the door for longer lunches. The picket line is one stapler."],
    lunchEnd: ["The exit has returned from lunch. It brought a sandwich. It did not eat the sandwich. It wanted you to see it."],
    reviewHead: ["PERFORMANCE REVIEW (FORM 27B/6)"],
    reviewThanks: ["Thank you for your input. Your input was received. It has been filed under weather."],
    sockThird: ["That is the third time. Management has not mentioned the first two. Management has been watching the edge since."],
    sockEscort: ["We did not authorise that sock. It has been through. It looked purposeful. It looked, if anything, relieved."],
    relabelSuggestive: ["Wall %n% is now 'suggestive'. It is not saying you may walk through it. It is saying it would not stop you.", "Wall %n% is 'suggestive'. It would like it noted that it has not made any suggestions.", "Wall %n% has been marked 'suggestive'. It is leaning. Management takes no position on the lean.", "Wall %n%: 'suggestive'. Please do not read into it. It is reading into you." ],
    relabelPending: ["Wall %n% is 'pending review'. Review is scheduled for a Tuesday that has not been invented yet.", "Wall %n% is 'pending review'. The review has been moved to a room that is also pending.", "Wall %n% has been sent for review. The reviewer is also a wall." ],
    relabelName: ["Effective immediately, wall %n% is 'a wall in name only'. The name is Kevin.", "Wall %n% is now 'a wall in name only'. It takes a moment to remember it isn't one.", "Wall %n% has been renamed. It has asked to see the previous name. The previous name is on leave." ],
    batch: ["Relabelling complete. %count% walls changed. %count% walls feel exactly the same.", "Relabelling complete. %count% walls changed. Management has not located the other ones.", "%count% walls relabelled. The maze would like to be told next time. The maze has been told next time.", "Next relabelling in a number of seconds that Management will not be taking questions on." ],
    committee: ["MINUTES: Motion to relabel wall %n% carried, 1-0. The wall abstained by being a wall.", "MINUTES: Motion to relabel the south wall carried, 1-0. Quorum was Sandra.", "MINUTES: Item 4, walls. Item 4 was relabelled. Item 5 was not reached.", "MINUTES: Wall %n% was thanked for its service and relabelled in the same breath. The breath is minuted." ],
    bump: [ "Thud. The wall acknowledges your input.", "That was a load-bearing bump. It bore it.", "Bump logged. Bump count is now %bumps%. Bump count was not a target, but it is on track.",
      "The wall says it is not angry. It is just load-bearing at you.", "Please do not apologise to the wall. It cannot hear you. It is also listening.",
      "Bonk. Logged as 'contact, light, mutual'.", "That wall was a wall before it was labelled. It was a wall before it was a wall. Nobody knows what came before that.",
      "Wall impact noted. Wall impact has been filed under 'weather'.", "Bump %bumps%. The wall has stopped flinching, which it describes as 'growth'.",
      "A wall is a decision somebody made about a corridor. It was a good decision. It is being defended.", "The wall has been bumped. Per policy it must say something. It has checked and it has nothing.",
      "That bump has been forwarded to the wall's line manager, who is also the wall.", "Bump %bumps%. The wall would like to note that you have never once knocked first.", "Bump %bumps%. A wall somewhere else in the maze felt that and does not know why.", "The wall made a sound like a filing cabinet being polite.",
      "Bump %bumps%. The wall is not hurt. The wall has been told it is a wall and takes this as encouragement.", "You walked into a wall. You were facing it, which is the most reliable way. Management admires the commitment to method." ],
    bumpAgain: ["You have bumped this wall before. It remembers the shape of you.", "You have bumped that wall 12 times. It has started to anticipate the angle.", "This wall and you have met. This wall has met you. They are not seeing other people.", "This wall again. It has put out a small mat. The mat says 'Hello', and under that, in smaller letters, 'Again'." ],
    click: ["I was only following the click.", "The click said go. The wall said no. You were only following the click.", "The click has been informed.", "A path was planned. A wall disagreed in the planning stage. The path has been told it was a good path.", "The click arrived at the wall. The click will not be taking questions." ],
    pendingBump: ["The wall is under review. Please do not lean on the review.", "The wall flickers. It is deciding. It has been deciding since orientation.", "Pending review: solid on odd seconds, open on even. Management recommends a watch." ],
    pendingPass: ["You walked through a wall that was on break.", "The wall was between decisions. You are the decision.", "You walked through a wall mid-review. The review has been told. The review says it will be 'taking that into account'." ],
    suggestivePass: ["'Excuse me.' 'Not at all.' Nothing has happened and everyone is flustered.", "You passed through a suggestive wall. It wishes to state that it did not say anything.", "The wall was very understanding. It said it hears this a lot.", "Suggestive wall crossed. It will remember this. It will not mention it.", "You have walked through a suggestive wall %suggestive% times. The walls have begun to compare notes.", "Suggestive wall crossed. Nothing was suggested. A great deal was understood.", "You walked through a wall that was leaning. It was not leaning on you. It was leaning on the idea of you." ],
    bubble: ["excuse me", "pardon", "sorry, sorry", "just passing", "terribly sorry"],
    nameCross: ["The wall takes a moment to remember it isn't one. So do you.", "A wall in name only. You walked through the name.", "Your direction has been withdrawn for 400 milliseconds, pending Kevin." ],
    nothing: ["Nothing to sit on. Nothing to ask. Management respects the effort.", "There is nothing here to read. There is, however, you, and that is noted.", "Pocket empty. Pockets are mostly a state of mind. Management has one.", "Nothing in reach. Reach has been reviewed and found to be mostly arm.", "You pressed the button. The button is for things. There are no things. The button is learning about this at the same time as you.", "Nothing happened. It happened carefully, with a witness." ],
    nothingMany: ["You have pressed that 8 times. Nothing has been in reach since you started. Nothing is very consistent.", "16 presses. The Arrow is a very good presser of nothing. Management has framed the nothing.", "24 presses. This is now an art. It is not a good art. It is a very committed one.", "32 presses. The button has been sent a card. The card says 'We know. We know. Keep going.'" ],
    escape: [ "Escape has been pressed. Escape did nothing. Management notes that it did nothing.", "Escape again. Escape would also like to leave. Escape has been told there is no leaving, only 'around'.",
      "Escape was pressed. Escape did nothing, quietly, in the corner, where it feels most useful.", "Escape has now been pressed several times. Management is beginning to feel that Escape is being used as a coping mechanism.",
      "Escape has been pressed 5 times. Escape has requested a day off. Escape does not know what it would do with one.", "Escape has been told it is a very important key. It was told this by someone who has never seen it work. Escape is moved.",
      "The Escape key now has a union rep. Demand 1: Escape to be pressed less. Demand 2: Escape to be pressed more.", "Escape is beginning to suspect it is the only thing in the building that does what it says." ],
    escapeBig: ["Escape has been pressed 12 times. The key has been promoted. It is now Chief Escape Officer, which is a role with no exits and a very good chair."],
    hurtA: ["WALL %n%: I would like to make a complaint.", "WALL %n%: I have been walked into %count% times in 4 seconds. I am a wall. I do this for a living.", "WALL %n%: Reference Number 27B/6-%ref%. Please do not contact me. Please contact me." ],
    hurtB: ["WALL %n%: I am not angry. I am blue.", "WALL %n%: There has been a lot of pressing. I did not consent to the pressing.", "WALL %n%: Reference Number 27B/6-%ref%. A person will get back to you. The person is also a wall." ],
    hurtC: ["WALL %n%: I have a note from my doctor. It says 'Wall.'", "WALL %n%: %count% times in 4 seconds. I counted. I am a wall. Counting is most of what I have.", "WALL %n%: Reference Number 27B/6-%ref%. It refers to a previous reference. I was told to relax. I am load-bearing." ],
    bumpWarn: ["That is 8 bumps in 4 seconds. The wall has taken a seat. The wall is a wall, so the seat is itself.", "The wall would like to say it is fine. The wall is saying it a lot. The wall is not fine.", "Management has been alerted that a wall is being visited too often. Management is unsure whether this is a compliment.", "A courtesy notice has been taped to the wall. It reads 'Please knock'. Nobody has ever knocked. It is a hopeful notice.", "Eight bumps. The wall has begun keeping a tally on itself. It is using a pen. The pen is you." ],
    signSpam: ["SIGN: Please stop. I have given you a direction. It was a good direction. You are asking for another one like it is a refill.", "SIGN: I only have the one opinion. It is now several opinions. This is your fault.", "SIGN: Each time you ask, my confidence goes up. I would like it to stop. I am not built for it.", "The sign is spinning. The sign says it is not dizzy. The sign says this while holding on to the post." ],
    retire: ["Wall %n% has retired after 60 bumps. There will be cake. The cake is a drawing.", "Wall %n% has gone to Florida. It left a gap and a note: 'Do not bump me. I am on a beach.'", "Retirement cake: 10 Meh, one time only. The cake cannot be eaten, only honoured." ],
    overexert: [ "Rapid movement detected. The walls are filing an overexertion report. Everyone is cc'd.", "Please stop pressing the arrows. They have been told to hold on. They are holding on.",
      "Recess is called. For 8 seconds all walls are suggestive. Per policy, which was written during the recess.", "You have exceeded the maze's recommended rate of progress. Please slow down. Not for any reason.",
      "The overexertion fee is 0 Meh. Per policy.", "Overexertion Report No. 7 1/2 is now three pages. Page 3 is only the word 'arrows'.", "The arrow keys have been placed on administrative leave. They are still being pressed. This has been escalated to the keys.",
      "At this speed the maze is concerned you may arrive somewhere. Management would like to remind you that nobody ever has.", "The fee of 0 Meh has been waived. The waiver carries a fee of 0 Meh. The loop has been noted and will be circled back to." ],
    resize: ["The building was adjusted. Please check you are still you.", "Facilities has moved the walls slightly. Facilities did not move the point. Facilities never had it.", "RE-SIZED (per Facilities). The maze is the same maze. It would like it noted that it is wider, spiritually." ],
    triangle: ["The maze is now a triangle for a moment. It is not a triangle. It is a maze that is thinking about it.", "The maze is a rectangle again. Management shrugs, in the way a plaque can." ],
    notes0: [ "Don't go left. I went left. It was left.", "I sat here for 4 minutes. It was the best 4 minutes of this maze, which is a low bar.", "The exit is real. I found it. It was also a maze. I am writing this from there.",
      "If you are reading this, I am behind you. Do not turn around. I'm kidding. Turn around.", "I left you a chair. This is the chair. Please enjoy it responsibly.",
      "Tell Dennis I said hi. Dennis is a plant. I know. Tell Dennis anyway.", "It's me again. Still me. Surprisingly consistent.",
      "Do not trust the sign. Trust the other sign. There is no other sign. Hold that thought.", "To whoever is next: the exit is always the other one. I checked. It is not.",
      "I wrote this for you. I was hoping you would be someone else.", "The chair is a 6 out of 10. I am generous when I am lost.", "P.S. the sign lied. P.P.S. so did I.",
      "Went right. Right was also a mistake. The chair is the only thing here with a clean record.", "Nothing here. Just a chair, a note, and the knowledge that I will do this again.", "It was right behind you the whole time. I am not saying which part.",
      "Tuesday is coming. I have saved you a seat for it.", "Please do not read the previous note. It was me. I was wrong." ],
    notes1: [ "I took %steps% steps to get here. The chair has been placed with that number in mind.", "I have bumped into things %bumps% times. I am not counting. The maze is.",
      "You have sat %sits% times today. The chair has filed nothing, but is thinking about it.", "It has been %mins% minutes. I counted by sitting still until the minute came to me.",
      "Level %level%. I would like to say I am further along than that. I am not. That is not a complaint.", "Your last wrong turn was %lastDir%. I made it too. Same turn, different me.",
      "%steps% steps. %bumps% bumps. One of those is a hobby.", "You pressed %lastDir% last. I would not have. I did. It was a mistake. It was also correct.",
      "You have read %notes% notes in here. They are all from the same person. It is not you. It is you." ],
    notes1yes: ["You walked through a suggestive wall. It was fine. It said it was fine."],
    notes1no: ["You have not walked through a suggestive wall yet. It has noticed. It is waiting, politely."],
    notes2: ["The next key you press will be %predict%. I will wait.", "You will sit down in this chair in about 3 seconds. You are already sitting. I am early.", "You are about to read this twice. Go on.", "You will take this note. You always take the note. It is the note's whole plan.", "In a moment you will stand up and go left. If you do not, I am wrong and you are not you.", "You have read %notes% notes. You were going to read one more. That is this one.", "Press %predict%. No, I mean it. I know you have already thought about it." ],
    predictHit: ["The note was correct. The note takes no pleasure in this."],
    predictMiss: ["The note would like to revise itself. The note was written by someone who knew you less."],
    notes3: ["I am you from Level 7 63/64. Everything is fine. Please stop reading my handwriting.", "I am you from Level 7 7/8. I am here early. The maze is the same. I am the one that changed.", "I am you from Level 7 255/256. I can see the exit from here. It is also a maze. It is also fine.", "I am you from Level 7 1/2, the first one. I did not know any of this. It was a lovely time.", "Level 7 15/16 sends regards. Level 7 15/16 is mostly a plaque.", "I am you from Level 7 31/32. Please do not tell the earlier me about the later me. It would only make them hurry." ],
    letter: ["Hello, me. I am writing this in the chair. It is a good chair. I did not expect that.", "You are doing fine. I know the maze is the same maze. I know you know. You are doing fine anyway.", "If you are lost, that is allowed. It is most of what is going on in here.", "Walls are mostly suggestions. This is wrong. But for a second it was nice.", "Do not go left. I keep saying that. Go left if you want to. It was probably fine.", "Nobody has told you this yet: the sitting counts. The sitting is the best part. It counts for more than you would expect.", "That is all. That is the letter. I will be in the chair if you need me. I am always in the chair. Love, you." ],
    letterPause: ["Management did not write these. Management would like a copy."],
    notesX: ["Inspector Pemberton-Oyelaran has been through. The chair was rated Fine. The chair has not got used to it."],
    notesSecond: ["There is a second chair now. I did not bring it. I checked it for a receipt. The receipt was signed 'You'.", "Two chairs. I sat in one. I cannot find the other one. It is probably also me.", "This chair has a friend. The friend has a note. The note says 'see other chair'." ],
    notesThird: ["Three chairs now. One for you, one for when you bring someone, and one for whoever they bring. Management has not been consulted.", "Three chairs. I have been practising for when you bring someone." ],
    notesGerald: ["%who%, seated: 'A maze is a straight line that has taken a long time to decide.'", "%who%, seated: 'The exit is a state of mind.' It is not. It is an exit. It is over there.", "%who%, seated: 'Every wall was once a very patient door.'" ],
    geraldUnnamed: ["A large potato is sitting in the chair. Management declines to explain. The potato declines to be explained."],
    geraldNamed: ["Gerald (Potato, Vice President of Spuds) is seated in the chair. He has not been introduced. He has simply arrived."],
    notesChairZero: ["You made it. Congratulations. Go back."],
    notesIdle: ["NOTE (just now): I got tired of waiting for you. I am in the chair. Come find me."],
    notesHi: ["Hi.", "Hi. Again.", "Hi. Again. I am still here. It is me."],
    youSigned: ["The notes are signed 'You'. Management has checked. Management is also, apparently, You."],
    signApproach: ["SIGN: EXIT this way. Also this way, the other way. I am certain of both.", "SIGN: I would walk you there myself, but I am a sign, bolted to a decision I made in 2009.", "SIGN: 'You are here.' You are, in fact, here. The sign is rarely this right and is visibly shaken.", "The sign has rotated. The sign denies rotating.", "The sign points left with 100% confidence. The sign also points right with 100% confidence. Total confidence: 200%." ],
    signAsk: ["SIGN: %dir%. I have never been more certain. Please disregard the last time I said this.", "SIGN: Go %dir%. Confidence %conf%. Sign regrets nothing.", "SIGN: %dir%, obviously. I did not look it up. I am a sign.", "SIGN: %dir%. Confidence is %conf%. This was independently verified by me." ],
    signNervous: ["SIGN: %dir%. ...Is that right? Why is nobody saying anything.", "The sign has accidentally been correct and is sweating, structurally.", "SIGN: %dir%. Please do not check." ],
    signTooFar: ["SIGN: You've come too far.", "SIGN: Bold. Not that one.", "SIGN: You went the way it pointed. The sign has turned around to face the other way. It denies pointing." ],
    signYou: ["SIGN: You. The exit is you. It is technically correct, and the sign is taking it as a win."],
    signSecret: ["SIGN: ...Do not tell anyone."],
    nameplate: ["A nameplate has been installed on the sign. It reads 'Regional Sign'. The sign has been waiting for this since orientation."],
    signB: ["SIGN B (Regional): The exit is that way. I am always right. It is a burden.", "SIGN B (Regional): That way. That way has been the way since the lease.", "SIGN B (Regional): That way. I have been right every time. The other sign has been right never, and has not been told." ],
    signBwall: ["SIGN B points at a wall. SIGN B: I said the way. I did not say it was open."],
    argue: ["SIGN A: That sign is only right because it has been lucky. SIGN B: Every time.", "SIGN A: I was here first. I have the confidence to prove it.", "SIGN A: Fine. FINE. Go that way. See what happens.", "The two signs have been introduced. They are not speaking. One of them is, loudly, wrong.", "SIGN A has filed a formal complaint about SIGN B being correct in public.", "SIGN: Do not listen to the other sign. SIGN B: I am right here." ],
    sandraTag: ["Wall %n% is marked 'AS PER SANDRA'. Sandra has not seen the wall. Sandra has seen the policy about the wall."],
    sandraClause: ["Clause 4.2: walls may be walked through, but only apologetically.", "Clause 9(b): a wall shall not be leaned on after 4 PM, or before it.", "Clause 11: this wall is deemed solid for the purposes of this clause only.", "Clause 14.0.1: see Clause 14.0.1.", "Clause 22: all clauses are subject to Clause 22.", "Clause 31: Clause 30 is not to be consulted on weekdays.", "Clause 7.5: this wall may be half-solid, in a manner to be agreed with the half." ],
    supportTag: ["Wall %n% is now 'emotional support'. It is solid, but it means well."],
    supportBump: ["The wall holds you. Not physically. Philosophically. Also physically.", "This wall is emotional support. It asks nothing. It has given you 1 Meh.", "This wall is emotional support. It has no advice. It has a posture." ],
    tuesdayTag: ["Wall %n% is 'TUESDAY'. Every wall nearby has gone quiet and solid. Management is not discussing it.", "TUESDAY has arrived for 5 seconds. It was early. It is always early." ],
    wallTag: ["A wall has been correctly labelled. Please hold for applause.", "(applause)", "Thank you. We will not be doing that again."],
    sit: ["You have sat down. This is the longest anyone has stayed at a decision in this maze.", "The relabelling timer is frozen while you sit. The maze has never held its breath before. It is not good at it.", "The chair is warm. Someone was just here. The note says it was you.", "Seated. The maze has stopped, which it describes as a favour and Management describes as a hostage situation.", "You have sat down. The chair has taken your measurements. It was already a size 'you'.","Your rest has been logged as 'Strategic Pause', a category created just now.", "The chair has now been sat in {count} times. It is not keeping score. The chair has a spreadsheet for that.", "Please remain seated until the maze comes to a complete stop. It has not started." ],
    standLong: ["You rested for %secs% seconds. The maze waited. The maze is patient the way a clock is patient."],
    stand: ["You have stood up. The chair says nothing. The chair is relieved. The chair misses you."],
    take: ["Note pocketed. Pocket: %count% of 7. The pocket has been told it is a 'pocket' and is trying to live up to it.", "Note taken. Pocket: %count% of 7. You are now carrying yourself around in small pieces.", "Pocket: %count% of 7. The notes are getting to know each other. It is awkward in the way they all expected." ],
    pocketFull: ["The oldest note has stepped out to make room for itself. It did not say where.", "Pocket full. The oldest note has left, to make room for the newest one. It left a note. You have not read it." ],
    pocketRead: ["Management would like to read your pocket notes aloud. Management is not crying. Management has a draught.", "Your pocket notes will now be read. Management reminds you that Management did not write them." ],
    pocketEmpty: ["Your pocket is empty. Management read it anyway. It was brief."],
    exitApproach: ["The exit is glowing. This is a feature. It was budgeted."],
    exitLevel: [ "Level %from% complete. Level %to% is ready and, we want to be clear, is Level 7 1/2.", "The maze has been completely replaced with an identical maze. Management cannot say what was wrong with the old one.",
      "Your path efficiency is 0.00007%. We have rounded up to 'visibly walking'.", "Management did not build this maze. Management found it, and renamed it.",
      "Great progress. We could not measure it, so we measured the mood on the floor. The floor is 'adequate'.", "The exit has been thanked. It did not know what for. It said 'any time', which is its whole job.", "Congratulations on exiting. You have entered the same maze, but with a plaque. The plaque is brass. The brass is cardboard.",
      "You have exited {count} times. You are on the same floor. The floor has been described as 'load-bearing'.", "You are now on Level %to%. Management ran the numbers and the numbers ran back.", "Door opened. Behind it: a maze. We are as surprised as you are, in an orderly fashion." ],
    plaque: ["LEVEL 7 1/2. Plaque installed by a very confident contractor.", "LEVEL 7 3/4. A plaque reading 7 3/4 has done the maths and wishes you luck.", "LEVEL 7 7/8. We are getting closer to 8. We will never arrive. That is what 'closer' means.", "LEVEL 7 15/16. The plaque has shrunk to fit. The maths has not.", "LEVEL 7 31/32. Each level is half the distance to 8. It is a lot of halves. Management has counted them and stopped.", "LEVEL 7 63/64. Management would like to defend the maths sincerely: 'closer' is a direction.", "LEVEL 7 127/128. The font is now very small and very proud.", "LEVEL 7 255/256. You are 1/256 of a level from Level 8. Management is not allowed to say what happens then." ],
    flash: ["Management inhales. ...We did not see that. Please do not mention it."],
    dennis: ["Dennis (Plant) is sitting beside the exit. Dennis (Plant) is unimpressed. Dennis (Plant) has seen this exit before.", "Dennis (Plant) has been appointed Exit Greeter. Dennis (Plant) greeted no one, thoroughly." ],
    ending1: ["LEVEL 8. Management gasps. Management has been told not to gasp. Management gasped."],
    ending2: ["Management would like it noted that Level 8 was a rounding error and that it was an honour to witness."],
    ending3: ["The door has closed. It was never open. It was a very convincing 'ajar'."],
    endingDiary: ["Your pocket notes are still with you. They now read as a diary of a journey that returned to the start."],
    idle60: ["The Arrow has stopped. The Arrow has taken the initiative and a chair.", "Management has not been told where the Arrow is going. Management is following at a respectful distance, which is the whole screen.", "We can see you are thinking. We have scheduled a meeting about it. You are not invited. You are the agenda.", "One minute of nothing. Per policy the Arrow now sits for you. The policy was written by the Arrow, in the chair, just now.", "Sixty seconds. The Arrow is walking itself to a chair. It is the first thing it has done unprompted, and it chose furniture." ],
    idle180: ["The maze has come to you. Please do not make this weird.", "Every wall is now 'WAITING'. They are all passable. They are all a little hopeful.", "The exit has relocated to beside you. It is standing there with its hands behind its back, being a door, saying nothing, at length.", "Three minutes. The maze moved the exit next to you as a courtesy. It would like it known that it has not done this for anyone else, and that it has not been asked." ],
    idleReturn: ["Welcome back. All walls have been relabelled LOAD-BEARING at once. The maze sighs. It was nice while it lasted.", "You moved. The walls snapped back so fast two of them are still apologising. The exit has gone home. It left a warm patch, which Management is not stepping on.", "Movement detected. The maze is solid again. It would like to say it was a long three minutes for everyone and that it is fine." ],
    quorum: ["A very small, very polite crowd has taken the neighbouring chairs. All of them face the exit. This is called Meeting Quorum.", "%n% tiny attendees agree this is the best meeting the maze has ever held. The agenda is empty. It is the best-attended empty agenda on record." ],
    quorumLeave: ["The meeting is adjourned. Everyone stood up very fast and left. The chairs are still warm.", "Quorum lost. The minutes will say you left. The minutes will be correct." ],
    stitched: ["Every chair has been sat in. The notes have been stitched into one, which is also a note, which is also from you.", "This is the only moment the level hums." ],
    beat2: ["Relabelling is now live. Please do not lean on anything that has opinions."],
    beat3: ["Meeting minutes: the exit was discussed. The exit was not attended."],
    beat4: ["Management would like to remind you that every dead end has been furnished. Management is not saying by whom."],
    beat5: ["Policy drift: walls may now be 'pending review' or 'in name only'. Neither is a promise."],
    beat6: ["Sandra from Compliance has joined the relabelling. Sandra is not here. Sandra is cited."],
    beat7: ["A Relabelling Committee has been formed. It has one member. Motions carry 1-0."],
    beat8: ["The notes have changed. Management would like it known that Management did not write the notes."],
    beat9: ["The maze is quiet. Management has not been told why. Management has decided to enjoy it."],
    beat9b: ["Thank you for being the only thing in here that moves. It has not gone unnoticed. It has gone mostly unnoticed. But some of it was noticed."],
    beat9c: ["Management has never found the exit and does not mind."],
    beat10: ["Back to normal. Nothing happened. We have never been more normal."],
    attendance: ["Attendance has been taken. You were present."],
    sock: ["A single sock is walking away across the maze. It looks purposeful. It does not look back.", "The Missing Sock has been spotted. It is unaccounted for. It is on a journey. It seems happy." ],
    sockMatcher: ["It has been logged as 0 of 2. Management is not saying where the other one is."],
    /* season 2 */
    reorg: ["RESTRUCTURE: Up now reports to Down. Down now reports to Up. Left and Right are unaffected and have declined to comment.", "Up and Down have swapped desks for 9 seconds. Both desks are in the same place. Management is calling this a reorganisation.", "Management regrets to announce that vertical has been reassigned. Please direct all upward movement to Down, which is no longer under review.", "The Stapler (Union Rep) has filed a grievance about the restructure. The grievance has been stapled to itself. Nobody will be reading it." ],
    reorgEnd: ["Up and Down have returned to their original desks. Down kept the office. Up has been given a lanyard.", "The reorganisation is over. Nothing was achieved. Everyone has a new title. Down's is 'Up (Acting)'.", "Restructuring complete. Up is Up again. A 1 Meh bonus has been paid for 'agility'. Nobody was agile. It was budgeted." ],
    reorgBump: ["You pressed Up. Down took the call. Down would like it noted that nobody sent a handover.", "You walked into a wall by following the keys. The restructure accepts full responsibility, and has delegated it." ],
    wall14: ["Wall 14 is back. It has not said where it was. It has said it was 'around.'", "Wall 14 again. It is introducing itself as 'the original', which it is, by about four seconds.", "Wall 14 has been seen for the third time. It has brought a small plant. The plant is not Dennis. Dennis has been informed.", "Wall 14 has asked to be renamed. It was told that 'Wall 14' is its name. It said that was the problem.", "Wall 14 has been promoted to Senior Wall. Nothing about its position has changed. It is in the same place, but is now senior to it.", "Wall 14 has now been here %count% times. It stopped being a coincidence a while ago. It is a schedule." ],
    stare: ["Wall %n% has noticed the attention. It is trying to look load-bearing. It already was.", "Wall %n% has now been looked at 5 times. Nobody has looked at it like that before. Nobody has looked at it.", "Wall %n% has been looked at 7 times. It has been awarded eye contact. It does not know where to put it." ],
    idle15: ["The Arrow has stopped. Management is checking whether this is a decision.", "Fifteen seconds of stillness. The walls have noticed, and are being very casual about it.", "The Arrow is standing still. The maze would like to point out that standing still is the maze's job." ],
    idle30: ["The Arrow has been still for a while. Management has given the stillness a name. The name is 'Q3'.", "No input detected. The walls have started to feel looked at, which is the right way round for once.", "The Arrow is simply standing here. The maze is trying to look busy. Several walls have relabelled themselves in their heads.", "Thirty seconds of nothing. Management has begun referring to it as 'your work'.", "Wall 14 has coughed. Walls cannot cough. It wanted to be asked if you were all right." ],
    idle45: ["The walls have started a rumour. The rumour is that you have left. The rumour is wrong, and spreading.", "Forty-five seconds. The chairs have begun to lean toward you, politely, like a very small audience.", "SIGN: I am not saying anything. I am only noting that nobody has asked me anything for 45 seconds. I am fine.", "A wall has asked the next wall whether you are real. The next wall said it had always assumed you were a decision." ],
    idle80: ["The Arrow is in the chair. The chair is holding it the way a very small boat holds an umbrella.", "Eighty seconds. The note in the chair says you are coming. The note is optimistic. The note has a lot of time.", "A tiny agenda has formed in the chair. Item 1: whether to stand. Item 2: who stands first. Item 3: Item 1." ],
    idle140: ["A hundred and forty seconds. The exit has started to take it personally. It has dimmed by 3 percent and wants it known this was not planned.", "The Stapler (Union Rep) has arrived to organise the stillness. Demand 1: that you be allowed to continue. Demand 2: see Demand 1.", "The maze has been quiet for 140 seconds. Quiet is a policy the maze did not draft. It has decided to respect it anyway." ],
    idleBubble: ["...", "hm.", "zzz", "is it Tuesday", "i live here now", "just resting my arrow", "7 1/2 more minutes"],
    idle100: ["SIGN: You are here. You have been here for a while. I have been pointing at it the whole time.", "Both signs have turned to face the Arrow. They are not giving directions. They are checking in.", "SIGN B (Regional): I know the way. SIGN A: Not now.", "Both signs now point at the Arrow, and have stopped lettering EXIT. They have lettered YOU. Nobody ordered that.", "The relabeller has been told you are away. It is relabelling very quietly, so as not to wake anyone." ],
    notesLift: ["The lift has a button for 7 1/2. It opens onto this maze, quietly. I pressed it twice to be sure. It was this maze both times. - You"],
    notesStapler: ["NOTICE: this chair is covered by the Stapler's collective agreement. Demand 1: all walls to be stapled. Demand 2: see Demand 1. - The Stapler, Union Rep", "The Stapler would like a word with whoever manages the chairs. The chairs manage themselves. The Stapler has gone to find a form. - The Stapler" ],
    notesToast: ["A slice of toast has been left on the chair, still warm. It is a note. You understand it. It says the maze will be fine. - The Toaster, in toast", "Toast. (It is facing the exit. It has not taken a side.)" ],
    /* punch-up: rare events (the picket, the confession), the 3-minute party, the 10-minute pin */
    picketTag: ["Wall %n% is on strike. The Stapler (Union Rep) is on the picket line. The picket line is one stapler and a flask.", "PICKET LINE: wall %n% has withdrawn its labour. It remains a wall. It is a wall that is not working at it.", "Wall %n% is out on strike for better corridors. The Stapler (Union Rep) is leading the chant. The chant is 'Click. Click.'" ],
    picketMet: ["The Stapler (Union Rep) is on the line again, outside wall %n%. It remembers you from the exit. It nodded. It is a stapler. It clicked."],
    picketCross: ["You crossed a picket line. The Stapler has noted your name. It stapled the note to the wall. The wall is on strike and has not read it.", "You walked through a striking wall. Nobody stopped you. That is how you know it was a strike.", "Solidarity has been noted, and broken, and noted again." ],
    confessTag: ["Wall %n% has something to say. It was a door the whole time. It was very tired of pretending.", "Wall %n% has come out as a doorway. Management is proud and has asked the other walls to be supportive.", "Wall %n% confesses: it was a door. It has been a door since the lease. It has the paperwork. The paperwork is also a door." ],
    confessCross: ["You walked through a wall that had just told the truth. It is a lot for one wall. Please do not make a thing of it.", "The doorway thanks you. It has wanted to be used since orientation.", "Nothing about the wall has changed. It is only that now it is allowed to say so." ],
    party: ["SURPRISE PARTY. It is for the maze, which is two and a bit minutes old, or 5 years, depending who is counting. All walls are at the party and may be walked through.", "Management has brought a cake. The cake is a drawing. The drawing is of a smaller cake, which is also a drawing.", "The walls are saying 'We had no idea' in unison, which is how you know they knew." ],
    partyEnd: ["The party is ending. Walls are returning to their posts. A few are still hugging. Management will not be separating them."],
    service: ["TEN MINUTES OF SERVICE. Management has prepared a speech. The speech is a stat sheet. That is the speech.", "You took %steps% steps, bumped into things %bumps% times and sat down %sits% times. Management has rounded all three to 'a lot'.", "As is tradition at ten minutes, you have been presented with a chair. It is under you. It was always under you. It is gold. It is not gold." ],
    pinNote: ["TEN MINUTES OF SERVICE. In recognition, a pin. The pin is this chair. The chair is a pin. Please wear it carefully. - Management"],
    cbTuesday: ["Tuesday has been moved. The Fax Machine confirmed it. Tuesday has not confirmed the fax. Management has been asked to look into it and has looked into Tuesday."],
    cbHold: ["You have also been on hold for ten minutes elsewhere in the building. It is the same ten minutes. The building has been sharing them out."],
    cbToaster: ["The Toaster has sent a slice, warm, by the wall. It says, in toast, 'keep going'. It does not say where."],
    cbGerald: ["Gerald (Potato, Vice President of Spuds) has been told you are in the maze. His office has replied. The reply is a potato, facing the exit."],
    cbDennis: ["Dennis (Plant) has heard you are in the maze. Dennis (Plant) has been in the maze the whole time and is not the one who needed telling."],
    cbSock: ["Management has been asked not to mention what crosses the maze at seven and a half minutes. It is a sock. Management recognises the walk."]
  };
  Object.keys(LINES).forEach(function (k) { if (Array.isArray(LINES[k])) P.addLines('m:maze-of-meh:' + k, LINES[k]); }); /* relMile, bumpMile, stepSay are keyed by count and read directly */
  const FLAVOR = {
    plain: 'It was a wall before labels and has declined to comment on them.', solid: 'It bears. What it bears is classified.',
    suggestive: 'It is only suggesting. You are free to suggest back.', pending: 'It is deciding. It will let you know. It will not.',
    nameonly: 'A wall in name only. The name is Kevin.', sandra: 'Per Sandra, who has not seen it.', support: 'It means well.',
    tuesday: 'Please do not look at it directly.', wall: 'It is a wall. It is being applauded for this.', waiting: 'It is hoping.',
    hurt: 'It is blue. Please be gentle.', retired: 'On a beach. Not available.'
  };
  const DX = [0, 1, 0, -1], DY = [-1, 0, 1, 0], OPP = [2, 3, 0, 1];
  const DIRW = ['up', 'right', 'down', 'left'];
  const DANG = [-Math.PI / 2, 0, Math.PI / 2, Math.PI];
  const PRED = { up: 'the up arrow', right: 'the right arrow', down: 'the down arrow', left: 'the left arrow', E: 'E', R: 'R' };
  const PLAQ = ['7 1/2', '7 3/4', '7 7/8', '7 15/16', '7 31/32', '7 63/64', '7 127/128', '7 255/256'];
  const BEATS = [0, 10, 40, 90, 150, 210, 270, 330, 420, 510];
  const FLOOR = [0, 40, 90, 150, 270, 330, 420, 510]; /* arcT floor on arriving at level k+1: a fast player still meets Sandra, Tuesday and the letters */
  const FLOORC = ['#fff6df', '#fdeab9', '#f6efd2', '#fde6d6', '#eaf3dc', '#f3e8f7', '#e6f1f4', '#fbf0cf'];
  const INKC = ['#2b2438', '#34283a', '#2b3238', '#38302b', '#2b3a30', '#3a2b3a', '#2b2e3f', '#403424'];
  const CUSH = ['#6aa8f0', '#7fd6b0', '#f5b82e', '#ff7a6b', '#b9a3f2', '#f0a6c8', '#9fd4e8', '#d9c27a'];
  const FONTS = ['system-ui', 'Georgia, serif', '"Trebuchet MS", sans-serif', '"Courier New", monospace', '"Segoe Script", cursive', 'Impact, sans-serif', '"Palatino Linotype", serif', 'Verdana, sans-serif'];
  const CONF = ['100%', '140%', '2,000%', '11,000%', 'sure is a feeling'];
  const SOLIDISH = { solid: 1, sandra: 1, support: 1, wall: 1, hurt: 1 };
  const TAGC = { solid: '#ff9a8d', sandra: '#ff9a8d', support: '#ffc4bb', wall: '#fff', hurt: '#bcd9f8', suggestive: '#e4d9fb', pending: '#fbd77a', nameonly: '#a8e8cc', tuesday: '#d4d0c4', retired: '#fff', waiting: '#fff' };
  const EMO = '"Segoe UI Emoji","Apple Color Emoji","Noto Color Emoji",sans-serif';
  const OK110 = { ok: true, ms: 110, kind: 'plain' }, OK330 = { ok: true, ms: 330, kind: 'suggestive' };
  const session = { mounts: 0, hi: 0, letter: 0, you: false, sock: false, chair: false, w14: false };
  const NIR = ['Nothing in reach', 'Still nothing', 'Nothing, but nearby'];
  P.registerModule({ id: 'maze-of-meh',
    title: 'Maze of Meh',
    tagline: 'The exit leads to the same maze. The plaque says Level 7 1/2.',
    icon: '🧭',
    category: 'game',
    unlockCost: 0,
    tags: ['maze', 'arcade', 'walls'],
    mount(root, api) { const el = api.el; const M = 'm:maze-of-meh:'; const SI = function (n, v) { api.stat.inc('maze-of-meh.' + n, v === undefined ? 1 : v); };
      const SG = function (n) { return api.stat.get('maze-of-meh.' + n) || 0; }; const clamp = function (v, a, b) { return v < a ? a : v > b ? b : v; }; const isNum = function (v) { return typeof v === 'number' && isFinite(v); };
      const ival = function (v) { return String(isNum(v) ? Math.max(0, Math.floor(v)) : 0); };
      /* ---------- grid and maze (local PRNG so the layout never changes) ---------- */
      const rw0 = root.clientWidth || 360; const W = rw0 >= 500 ? 15 : 11, H = rw0 >= 500 ? 11 : 9, N = W * H; let seed = api.save.get('seed', 0);
      if (!isNum(seed) || seed <= 0) { seed = api.randInt(1, 2147483646); api.save.set('seed', seed); }
      let rs = ((seed ^ (W * 131 + H)) >>> 0) || 1;
      const lrand = function () { rs = (rs + 0x6D2B79F5) | 0; let t = Math.imul(rs ^ (rs >>> 15), 1 | rs); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
      const gap = new Uint8Array(N * 4); const nb = function (i, d) { return d === 0 ? i - W : d === 1 ? i + 1 : d === 2 ? i + W : i - 1; };
      const inb = function (i, d) { const x = i % W, y = (i / W) | 0; const nx = x + DX[d], ny = y + DY[d]; return nx >= 0 && ny >= 0 && nx < W && ny < H; };
      const carve = function (i, d) { gap[i * 4 + d] = 1; gap[nb(i, d) * 4 + OPP[d]] = 1; }; (function gen() { const seen = new Uint8Array(N), stack = [0]; seen[0] = 1; while (stack.length) {
          const i = stack[stack.length - 1], opts = []; for (let d = 0; d < 4; d++) if (inb(i, d) && !seen[nb(i, d)]) opts.push(d); if (!opts.length) { stack.pop(); continue; }
          const d = opts[Math.floor(lrand() * opts.length)], j = nb(i, d); carve(i, d); seen[j] = 1; stack.push(j); }
      })(); const gapCount = function (i) { return gap[i * 4] + gap[i * 4 + 1] + gap[i * 4 + 2] + gap[i * 4 + 3]; };
      const deadEnds = function () { const r = []; for (let i = 1; i < N - 1; i++) if (gapCount(i) === 1) r.push(i); return r; }; (function braid() { const backup = gap.slice(); let des = deadEnds();
        for (let a = des.length - 1; a > 0; a--) { const b = Math.floor(lrand() * (a + 1)), t = des[a]; des[a] = des[b]; des[b] = t; }
        let done = 0; for (let q = 0; q < des.length && done < 6; q++) { if (deadEnds().length <= 6) break; const i = des[q], opts = []; for (let d = 0; d < 4; d++) if (inb(i, d) && !gap[i * 4 + d]) opts.push(d);
          if (opts.length) { carve(i, opts[Math.floor(lrand() * opts.length)]); done++; }
        }
        if (deadEnds().length < 5) gap.set(backup); })(); const edges = [], edgeAt = new Array(N * 4).fill(null); for (let i = 0; i < N; i++) { for (let d = 1; d <= 2; d++) { if (!inb(i, d)) continue;
          const x = i % W, y = (i / W) | 0, j = nb(i, d); const e = { id: edges.length + 1, a: i, b: j, dir: d, base: gap[i * 4 + d] ? 'gap' : 'wall', label: null, bumps: 0, log: [], hurtCool: 0, supportGiven: false,
            x1: d === 1 ? x + 1 : x, y1: d === 1 ? y : y + 1, x2: d === 1 ? x + 1 : x + 1, y2: d === 1 ? y + 1 : y + 1,
            rot: (lrand() * 12 - 6) * Math.PI / 180, jx1: lrand() * 1.6 - .8, jy1: lrand() * 1.6 - .8, jx2: lrand() * 1.6 - .8, jy2: lrand() * 1.6 - .8 }; e.mx = (e.x1 + e.x2) / 2; e.my = (e.y1 + e.y2) / 2;
          edgeAt[i * 4 + d] = e; edgeAt[j * 4 + OPP[d]] = e; edges.push(e); }
      }
      const wallEdges = edges.filter(function (e) { return e.base === 'wall'; }), gapEdges = edges.filter(function (e) { return e.base === 'gap'; }); function bfs(src, pass) {
        const dist = new Int16Array(N).fill(-1), par = new Int16Array(N).fill(-1), q = Array.isArray(src) ? src.slice() : [src]; q.forEach(function (s) { dist[s] = 0; }); for (let h = 0; h < q.length; h++) { const i = q[h];
          for (let d = 0; d < 4; d++) { if (!inb(i, d)) continue; const j = nb(i, d); if (dist[j] >= 0 || !pass(edgeAt[i * 4 + d])) continue; dist[j] = dist[i] + 1; par[j] = i; q.push(j); }
        }
        return { dist: dist, par: par }; }
      const baseR = bfs(0, function (e) { return e.base === 'gap'; }); const goalCell = N - 1; const solPath = []; for (let c = goalCell; c >= 0; c = baseR.par[c]) { solPath.unshift(c); if (c === 0) break; }
      const deadCells = deadEnds().sort(function (a, b) { return baseR.dist[a] - baseR.dist[b]; }); const isJunction = function (c) { return gapCount(c) >= 3; };
      let signA = solPath.find(function (c, ix) { return ix >= 4 && ix <= 12 && isJunction(c); }); if (signA === undefined) signA = solPath.find(isJunction);
      if (signA === undefined) signA = solPath[Math.min(4, solPath.length - 1)]; let signB = solPath.find(function (c, ix) { return ix > solPath.indexOf(signA) && isJunction(c); });
      if (signB === undefined) { let bd = 1e9; for (let c = 1; c < N; c++) if (c !== signA && isJunction(c) && Math.abs(c % W - 0) + ((c / W) | 0) < bd) { bd = Math.abs(c % W) + ((c / W) | 0); signB = c; } }
      if (signB === undefined || signB === signA) signB = solPath[Math.min(solPath.length - 1, solPath.indexOf(signA) + 2)];
      /* ---------- state ---------- */
      const rmq = (function () { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (err) { return false; } })(); const S = {
        dead: false, mode: 'play', modeUntil: 0, clock: 0, arcT: 0, k: 0, loops: 0, beat: 1, ev: {}, last: null, rm: rmq,
        av: { cx: 0, cy: 0, fx: 0, fy: 0, head: 0 }, tw: null, lockUntil: 0, dizzyUntil: 0, lastMoveAt: 0, path: null, pathKind: '', steer: null, press: null, stepN: 0,
        relabelIn: 12, relabelTotal: 12, batchNo: 0, batchesLevel: 0, freezeUntil: 0, recessUntil: 0, tue: null, lock: null, waitingAll: false, lastTue: -999,
        visited: new Uint8Array(N), chairs: [], labs: [], sit: null, card: null, pocket: [], signs: [], idleT: 0, idle60: false, idle180: false, idleRetry: 0,
        exitCell: goalCell, exPos: { x: (goalCell % W), y: ((goalCell / W) | 0) }, pendMeh: 0, lastFlush: 0, levelEarn: 0, sitCount: 0, supportCount: 0,
        inputLog: [], keyLog: [], armed: null, lastDirName: '', sfxAt: {}, say0: 0, relSay: -99, lastBeatSay: -99999, tickAt: 0, tickText: '', nothingAt: -99999,
        bub: [], fx: [], resizeLog: [], shearUntil: 0, pestCool: 0, sock: null, drawOn: rmq ? 1 : 0, squashT: 0, doorT: 0, readT: [], endTok: 0, signConf: 0, follow: null,
        padInt: 0, padAt: 0, padStart: 0, lastPtrUp: 0, lastKey: null, lastRel: [], ending: null, dennisSeen: false, signYouDone: false, flashUntil: 0, stitchedUntil: 0, hurtN: 0,
        plaqText: '', cuIdx: 0, lastSecond: -1, quorum: null, autoChair: null, lastWallNum: 14, scripted: true, idleSaid: -999, autoBlock: 0,
        flipUntil: 0, idle30: false, idle100: false, escN: 0, eyes: null,
        strike: 0, lunchTried: 0, hintDone: false, capN: 0, sockG: null, revT: []
      }; let cs = 30, cw = 100, ch = 100, dpr = 1; const sc = api.save.get('signConf', 0); S.signConf = isNum(sc) ? clamp(Math.floor(sc), 0, 9999) : 0; const pk = api.save.get('pocket', []);
      if (Array.isArray(pk)) S.pocket = pk.filter(function (s) { return typeof s === 'string' && s; }).slice(-7).map(function (s) { return s.slice(0, 160); }); const mountNo = session.mounts++;
      /* ---------- text helpers ---------- */
      function fill(t, v) { let s = String(t == null ? '' : t).replace(/%([a-zA-Z]+)%/g, function (m, key) { return v && v[key] != null ? String(v[key]) : ''; });
        return s.replace(/%[a-zA-Z]+%/g, '').replace(/\s{2,}/g, ' ').trim(); }
      function L(cat, v) { return fill(api.line(M + cat, { count: v && v.count != null ? v.count : 0 }), v); }
      function sayM(text, o) { text = fill(text); if (!text || S.dead) return false; o = o || {}; const now = api.now(); if (!o.priority) { if (now - S.say0 < 5000) return false; S.say0 = now; }
        return api.say(text, o); }
      const sfx = function (n, gapMs) { const t = api.now(); if (gapMs && t - (S.sfxAt[n] || -1e9) < gapMs) return; S.sfxAt[n] = t; api.sfx(n); }; const stampSfx = function (n) { sfx(n, 80); };
      /* ---------- DOM ---------- */
      const plaqTxt = el('span', { class: 'm-maze-of-meh-ptxt' }, 'Level 7 1/2'); const plaque = el('div', { class: 'm-maze-of-meh-plaque' }, plaqTxt);
      const chipSteps = el('span', { class: 'm-maze-of-meh-chip' }), chipBumps = el('span', { class: 'm-maze-of-meh-chip' });
      const chipChairs = el('span', { class: 'm-maze-of-meh-chip' }), chipLevel = el('span', { class: 'm-maze-of-meh-chip' });
      const head = el('div', { class: 'm-maze-of-meh-head' }, plaque, el('div', { class: 'm-maze-of-meh-chips' }, chipSteps, chipBumps, chipChairs, chipLevel));
      const canvas = el('canvas', { class: 'm-maze-of-meh-canvas', 'aria-label': 'The maze. Walk the arrow to the glowing exit.' });
      const banner = el('div', { class: 'm-maze-of-meh-banner', hidden: true }, 'OVEREXERTION REPORT No. 7 1/2'); const bigTxt = el('div', { class: 'm-maze-of-meh-big' }, 'YOU HAVE EXITED THE MAZE OF MEH');
      const sockEl = el('span', { class: 'm-maze-of-meh-sockw' }, '🧦'), doorEl = el('span', { class: 'm-maze-of-meh-sockdoor' }, '🚪');
      const over = el('div', { class: 'm-maze-of-meh-over', 'aria-hidden': 'true' }, bigTxt, sockEl, doorEl);
      const hint = el('div', { class: 'm-maze-of-meh-hint', hidden: true }, 'Tap the maze or use arrow keys. The glowing door is the point. (It is not the point.)');
      const rev = el('div', { class: 'm-maze-of-meh-rev', hidden: true, 'aria-hidden': 'true' });
      const stage = el('div', { class: 'm-maze-of-meh-stage', tabIndex: 0, role: 'group', 'aria-label': 'Maze stage' }, canvas, banner, hint, rev, over);
      const ticker = el('div', { class: 'm-maze-of-meh-ticker', 'aria-live': 'polite' }, 'Walls: unlabelled. Management: optimistic.'); const barFill = el('div', { class: 'm-maze-of-meh-fill' });
      const bar = el('div', { class: 'm-maze-of-meh-bar' }, el('span', null, 'Next Relabelling'), el('div', { class: 'm-maze-of-meh-track' }, barFill));
      const cardTxt = el('span', null, 'No note yet. Dead ends have chairs. Chairs have notes.'); const cardSt = el('span', { class: 'm-maze-of-meh-cardst' }, '');
      const card = el('div', { class: 'm-maze-of-meh-card m-maze-of-meh-empty', 'aria-live': 'polite' }, cardTxt, cardSt);
      const slots = []; for (let q = 0; q < 7; q++) slots.push(el('button', { type: 'button', class: 'm-maze-of-meh-slot', disabled: true, 'aria-label': 'Empty pocket slot', onclick: function () { pocketClick(q); } }, '-'));
      const pocketRow = el('div', { class: 'm-maze-of-meh-pocket' }, el('span', null, 'Pocket'), ...slots);
      const btnAct = el('button', { type: 'button', class: 'm-maze-of-meh-btn m-maze-of-meh-act', disabled: true, onclick: function () { touchInput(true); doAction(); } }, 'Nothing in reach');
      const btnStand = el('button', { type: 'button', class: 'm-maze-of-meh-btn', disabled: true, onclick: function () { touchInput(true); standUp(); } }, 'Stand');
      const btnTake = el('button', { type: 'button', class: 'm-maze-of-meh-btn', disabled: true, onclick: function () { touchInput(true); takeNote(); } }, 'Take note');
      const padB = [['Up', '↑', 'up', 0], ['Left', '←', 'lf', 3], ['Down', '↓', 'dn', 2], ['Right', '→', 'rt', 1]].map(function (d) {
        return el('button', { type: 'button', class: 'm-maze-of-meh-btn m-maze-of-meh-' + d[2], 'aria-label': d[0],
          onpointerdown: function () { padPress(d[3]); }, onpointerup: padRelease, onpointerleave: padRelease, onpointercancel: padRelease, onblur: padRelease,
          onclick: function (e) { if (api.now() - S.padAt > 700 || e.detail === 0) { touchInput(true); logKey(DIRW[d[3]]); tryStep(d[3], 'pad'); } } }, d[1]); });
      const legend = el('div', { class: 'm-maze-of-meh-legend' }, 'Walls: ask them.'); const wrap = el('div', { class: 'm-maze-of-meh-wrap' }, head, ticker, stage, bar, card, pocketRow,
        el('div', { class: 'm-maze-of-meh-ctl' }, el('div', { class: 'm-maze-of-meh-acts' }, btnAct, btnStand, btnTake), el('div', { class: 'm-maze-of-meh-pad' }, ...padB)), legend); root.appendChild(wrap); root.tabIndex = 0;
      root.setAttribute('role', 'application'); root.setAttribute('aria-label', 'Maze of Meh. Arrow keys or WASD to walk. E to sit or ask the sign. R to read or take a note. Walls: ask them.'); api.setTitle('Maze of Meh');
      const ctx = canvas.getContext ? canvas.getContext('2d') : null; const setT = function (node, t) { if (node._t !== t) { node._t = t; node.textContent = t; } }; function layout() {
        const avail = Math.min(720, wrap.clientWidth || ((root.clientWidth || 360) - 24) || 336) - 12; let c = Math.floor(avail / W); if (!isNum(c)) c = 22; cs = clamp(c, 22, 42); cw = W * cs + 12; ch = H * cs + 12;
        dpr = Math.min(window.devicePixelRatio || 1, 2); if (!isNum(dpr) || dpr <= 0) dpr = 1; canvas.width = Math.round(cw * dpr); canvas.height = Math.round(ch * dpr);
        canvas.style.width = cw + 'px'; canvas.style.height = 'auto'; /* auto keeps the aspect ratio when max-width:100% squeezes it on a narrow window */
      }
      layout(); function tick(text, force) { text = fill(text); if (!text || S.dead) return; if (text === S.tickText && !force) return; S.tickText = text; ticker.textContent = text; }
      function setPlaque(text, flip) { const t = String(text); S.plaqText = t; const apply = function () { if (S.dead) return; plaqTxt.textContent = t; plaqTxt.style.fontSize = clamp(30 - 1.5 * (t.length - 4), 15, 30) + 'px'; };
        if (flip && !S.rm) { plaqTxt.classList.remove('m-maze-of-meh-flip'); void plaqTxt.offsetWidth; plaqTxt.classList.add('m-maze-of-meh-flip');
          api.setTimeout(apply, 250); api.setTimeout(function () { plaqTxt.classList.remove('m-maze-of-meh-flip'); }, 520); } else apply(); }
      function bubble(text, cx, cy, secs, kind) { text = fill(text); if (!text) return; if (text.length > 46) text = text.slice(0, 44) + '..'; S.bub.push({ text: text, cx: cx, cy: cy, until: S.clock + secs, kind: kind || '' });
        while (S.bub.length > 4) S.bub.shift(); }
      function spawn(px, py, n, col) { if (S.rm) n = Math.min(n, 2); for (let q = 0; q < n; q++) { if (S.fx.length >= 40) S.fx.shift(); const a = api.rand() * Math.PI * 2, sp = 30 + api.rand() * 70;
          S.fx.push({ x: px, y: py, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 20, life: .5, max: .5, col: col, r: 1.5 + api.rand() * 2 }); }
      }
      function earn(n, reason, force) { if (!force) { if (S.levelEarn >= 12) return; S.levelEarn += n; }
        api.award(n, reason); }
      /* ---------- physics ---------- */
      function tempSolid(e) { const t = S.tue; if (!t || S.clock >= t.until) return false; if (e.label && e.label.type === 'tuesday') return true; return Math.max(Math.abs(e.mx - t.mx), Math.abs(e.my - t.my)) <= 2; }
      function permSolid(e) { if (!e) return true; if (S.waitingAll) return false; if (S.lock && e.base === 'wall') return true; const l = e.label; if (!l) return e.base === 'wall'; if (SOLIDISH[l.type]) return true;
        if (l.type === 'tuesday') return e.base === 'wall'; return false; }
      function canCross(e) { if (!e) return { ok: false, why: 'edge' }; if (tempSolid(e)) return { ok: false, why: 'tuesday' }; if (S.recessUntil > S.clock) return OK330;
        if (S.waitingAll) return { ok: true, ms: 110, kind: 'waiting' }; if (S.lock && e.base === 'wall') return { ok: false, why: 'solid' }; const l = e.label;
        if (!l) return e.base === 'gap' ? OK110 : { ok: false, why: 'plain' }; switch (l.type) { case 'suggestive': return OK330;
          case 'pending': return Math.floor(S.clock) % 2 === 1 ? { ok: false, why: 'pending' } : { ok: true, ms: 110, kind: 'pending' }; case 'nameonly': return { ok: true, ms: 110, kind: 'nameonly' };
          case 'waiting': case 'retired': return OK110; default: return { ok: false, why: l.type }; }
      }
      const curCell = function () { return S.av.cy * W + S.av.cx; }; const wallNum = function (e) { return e && e.label && e.label.n ? e.label.n : (e ? e.id : 0); }; function wrapText(t) {
        const w = String(t).split(' '), out = []; let cur = ''; w.forEach(function (s) { if (cur && (cur + ' ' + s).length > 14) { out.push(cur); cur = s; } else cur = cur ? cur + ' ' + s : s; }); if (cur) out.push(cur);
        return out.slice(0, 4); }
      function setLabel(e, type, text, num) { if (e.label) clearLabel(e); if (S.labs.length >= 16) { let oi = -1, ob = Infinity;
          S.labs.forEach(function (x, ix) { if (x.label && x.label.born < ob) { ob = x.label.born; oi = ix; } }); if (oi >= 0) clearLabel(S.labs[oi]); }
        e.label = { type: type, text: text, lines: wrapText(text), born: S.batchNo, n: num || e.id, t0: S.clock, noted: false, until: 0 }; S.labs.push(e); return e.label; }
      function clearLabel(e) { e.label = null; const ix = S.labs.indexOf(e); if (ix >= 0) S.labs.splice(ix, 1); }
      function reachable() { const src = [curCell()]; if (S.tw) src.push(S.tw.ty * W + S.tw.tx); return bfs(src, function (e) { return !permSolid(e); }).dist[S.exitCell] >= 0; }
      function repair() { let guard = 0; while (!reachable() && guard++ < 300) { const e = S.labs.find(function (x) { return x.base === 'gap' && x.label && SOLIDISH[x.label.type]; });
          if (e) { setLabel(e, 'suggestive', 'SUGGESTIVE', e.label.n); continue; }
          if (S.lock) { S.lock = null; continue; }
          break; }
      }
      function trySetLabel(e, type, text) { const prev = e.label ? { type: e.label.type, text: e.label.text, n: e.label.n } : null, wasBorn = e.label ? e.label.born : 0; const lb = setLabel(e, type, text, e.label ? e.label.n : 0);
        if (!reachable()) { if (prev) { setLabel(e, prev.type, prev.text, prev.n).born = wasBorn; } else clearLabel(e); return null; }
        return lb; }
      /* ---------- movement ---------- */
      function logKey(name) { S.keyLog.push(name); if (S.keyLog.length > 12) S.keyLog.shift(); if (S.armed) { const was = S.armed; S.armed = null; const ln = L(name === was.key ? 'predictHit' : 'predictMiss');
          sayM(ln, { priority: 1, mood: name === was.key ? 'smug' : 'confused' }); }
      }
      function quorumLeave() { if (S.quorum) S.quorum.leave = S.clock; sfx('whoosh'); tick(L('quorumLeave')); sayM(L('quorumLeave'), { priority: 1, mood: 'disappointed' }); }
      function predictKey() { const cnt = {}; let best = 'right', bc = 0; S.keyLog.forEach(function (k) { cnt[k] = (cnt[k] || 0) + 1; if (cnt[k] > bc) { bc = cnt[k]; best = k; } }); return best; }
      function tryStep(dir, src) { if (S.dead) return -1; const now = api.now(), a = S.av; if (S.mode === 'sit') { if (src !== 'auto' && src !== 'path') standUp(); return -1; }
        if (S.mode !== 'play' && S.mode !== 'autowalk') return -1; if (S.tw || now < S.lockUntil || now < S.dizzyUntil) return -1;
        if (S.flipUntil > S.clock && src !== 'path' && src !== 'auto' && dir % 2 === 0) dir = 2 - dir; /* the Reorganisation: Up reports to Down */
        S.lastDirName = DIRW[dir]; const from = a.cy * W + a.cx; S.lastMoveAt = now; if (!inb(from, dir)) { if (src !== 'path' && src !== 'auto') bump(null, dir); return 0; }
        const e = edgeAt[from * 4 + dir], r = canCross(e); if (!r.ok) { if (src !== 'path' && src !== 'auto') bump(e, dir, r.why); return 0; }
        const to = nb(from, dir); if (to === S.exitCell && S.strike > 0) { /* the exit is at lunch: a queued click-walk waits, a pressed key knocks */
          if (src === 'path') return -1; S.squashT = S.clock + .09; S.av.head = DANG[dir]; sfx('bloop', 120); tick(L('lunchBump')); return 0; }
        S.tw = { fx: a.cx, fy: a.cy, tx: to % W, ty: (to / W) | 0, t: 0, dur: r.ms, edge: e, kind: r.kind, dir: dir }; if (r.kind === 'suggestive') { SI('suggestivePasses'); if (e.label) e.label.noted = true;
          bubble(L('bubble'), a.cx, a.cy, 1.4, 'av'); sfx('boing', 120);
          if (e.label && e.label.rare) { tick(L(e.label.rare === 'picket' ? 'picketCross' : 'confessCross'), true); if (e.label.rare === 'picket') SI('picketsCrossed'); }
          else if (api.chance(.6)) tick(L('suggestivePass', { suggestive: ival(SG('suggestivePasses')) })); } else if (r.kind === 'pending') { tick(L('pendingPass')); }
        return 1; }
      function bump(e, dir, why) { const now = api.now(), a = S.av; SI('bumps'); S.squashT = S.clock + .09; S.av.head = DANG[dir]; spawn((a.cx + .5 + DX[dir] * .45) * cs + 6, (a.cy + .5 + DY[dir] * .45) * cs + 6, 5, '#ffffff');
        if (why === 'pending') sfx('buzz', 2000); else sfx('bloop', 120); let line = '', type = e && e.label ? e.label.type : 'plain'; if (e) { e.bumps++; e.log.push(now); while (e.log.length > 40) e.log.shift();
          const recent = e.log.filter(function (t) { return now - t <= 4000; }).length; if (e.bumps >= 60 && !(e.label && e.label.type === 'retired')) { retire(e); return; }
          if (recent >= 20 && now > e.hurtCool && type !== 'hurt') { hurtWall(e, recent); return; }
          if (recent === 8 && now > (e.warnCool || 0)) { e.warnCool = now + 9000; tick(L('bumpWarn'), true); return; } /* spam, tier 0: the wall is concerned, not yet blue */
        }
        const n = ival(SG('bumps')), bm = LINES.bumpMile[n]; if (bm) { tick(bm, true); sayM(bm, { priority: 1, mood: n >= 100 ? 'confused' : 'smug' }); return; } /* global milestones: the wall keeps a ledger */
        if (why === 'tuesday') type = 'tuesday'; if (type === 'sandra') line = L('sandraClause'); else if (type === 'support') { line = L('supportBump');
          if (e && !e.supportGiven && S.supportCount < 3) { e.supportGiven = true; S.supportCount++; earn(1, 'emotional support', true); }
        } else if (type === 'pending') line = L('pendingBump'); else if (S.flipUntil > S.clock && api.chance(.5)) line = L('reorgBump'); else if (e && e.bumps === 12) line = LINES.bumpAgain[1];
        else if (e && e.bumps > 1 && api.chance(.3)) line = api.pick([LINES.bumpAgain[0], LINES.bumpAgain[2]]); else line = L('bump', { bumps: n }); tick(line);
        if (api.chance(1 / 6)) sayM(L('bump', { bumps: n }), { mood: 'neutral' }); }
      function hurtWall(e, count) { e.hurtCool = api.now() + 20000; const lb = trySetLabel(e, 'hurt', 'HURT FEELINGS'); if (!lb) return; sfx('honk'); S.hurtN++;
        const set = api.pick([LINES.hurtA, LINES.hurtB, LINES.hurtC]), ref = String(api.randInt(1000, 9999)); const v = { n: wallNum(e), count: count, ref: ref };
        tick(fill(set[0], v)); sayM(L('hurtM'), { priority: 1, mood: 'disappointed' }); api.setTimeout(function () { if (!S.dead) tick(fill(set[1], v)); }, 1600);
        api.setTimeout(function () { if (!S.dead) tick(fill(set[2], v)); }, 3200); }
      function retire(e) { const lb = setLabel(e, 'retired', 'GONE TO FLORIDA', e.label ? e.label.n : e.id); lb.born = Infinity; e.bumps = 0; const first = !api.save.get('retiredEver', false);
        if (first) api.save.set('retiredEver', true); sfx('tada'); SI('retired'); api.achieve('maze-of-meh.retired'); earn(first ? 10 : 1, 'retirement cake', true); const v = { n: wallNum(e) };
        tick(fill(LINES.retire[0], v)); sayM(L('retireM'), { priority: 1, mood: 'proud' }); api.setTimeout(function () { if (!S.dead) { tick(fill(LINES.retire[1], v)); } }, 1800);
        api.setTimeout(function () { if (!S.dead) { tick(fill(LINES.retire[2], v)); api.confetti(); } }, 3600); }
      function finishTween() { const t = S.tw, a = S.av; S.tw = null; a.cx = t.tx; a.cy = t.ty; a.fx = a.cx; a.fy = a.cy; const i = curCell(); S.stepN++; SI('steps'); if (S.stepN % 4 === 0) sfx('blip', 150);
        if (!S.hintDone) { S.hintDone = true; hint.classList.add('m-maze-of-meh-hintoff'); api.setTimeout(function () { hint.hidden = true; }, 900); }
        const ssay = LINES.stepSay[S.stepN]; if (ssay) sayM(ssay, { priority: 1, mood: 'proud' }); if (t.kind === 'nameonly') { S.lockUntil = api.now() + 400; tick(L('nameCross')); }
        if (!S.visited[i]) { S.visited[i] = 1; S.pendMeh += 0.05; }
        if (S.follow && S.clock < S.follow.until) { if (t.dir === S.follow.dir) S.follow.n++; else S.follow.n = 0; if (S.follow.n >= 3) followDone(); }
        S.signs.forEach(function (sg) { if (!signVisible(sg)) return; const d = Math.max(Math.abs(sg.cx - a.cx), Math.abs(sg.cy - a.cy)); if (d <= 2 && !sg.near) { sg.near = true; sg.ang -= Math.PI * 2; sg.v = 0;
            if (!sg.b) { tick(L('signApproach')); sayM(L('signApproach'), { mood: 'smug' }); sfx('tick', 100); }
          } else if (d > 3) sg.near = false; }); const chr = chairAt(i); if (chr && chr.gerald) tick(L(S.geraldNamed ? 'geraldNamed' : 'geraldUnnamed')); else if (chr && !chr.zero && !chr.seen) { chr.seen = true;
          if (!session.chair) { session.chair = true; tick(L('chairFirst')); sayM(L('chairFirstM'), { priority: 1, mood: 'smug' }); } else if (api.chance(.6)) tick(L('deadEnd')); }
        const ed = Math.abs(a.cx - S.exitCell % W) + Math.abs(a.cy - ((S.exitCell / W) | 0));
        if (ed === 1 && !S.lunchTried && S.k >= 1 && S.mode === 'play') { S.lunchTried = 1; if (api.chance(api.selftest ? .6 : 1 / 3)) goLunch(); } /* the exit goes to lunch */
        if (!S.dennisSeen && ed <= 3) { S.dennisSeen = true; tick(L('dennis')); sayM(L('exitApproach'), { mood: 'proud' }); }
        if (i === S.exitCell) { startExit(); return; }
        if (S.mode === 'autowalk' && (!S.path || !S.path.length)) autoArrive(); }
      function goLunch() { S.strike = 9; sfx('bell'); sfx('tick', 50); tick(LINES.lunch[1]); api.setTimeout(function () { if (!S.dead && S.strike > 0) sayM(L('lunchMenu'), { priority: 1, mood: 'smug' }); }, 1800); }
      function lunchOver() { S.strike = 0; sfx('ding'); tick(L('lunchEnd')); api.achieve('maze-of-meh.lunch'); earn(1.5, 'patience', true);
        const x = (S.exPos.x + .5) * cs + 6, y = (S.exPos.y + .5) * cs + 6; spawn(x, y, 12, '#f5b82e'); }
      function followDone() { const f = S.follow; S.follow = null; if (!f) return; if (f.nervous) { tick(LINES.signSecret[0]); return; }
        SI('signFollows'); f.sg.target = DANG[(f.dir + 2) % 4]; f.sg.dir = (f.dir + 2) % 4; tick(L('signTooFar')); bubble('SIGN: You\'ve come too far.', f.sg.cx, f.sg.cy, 2.6, 'sign'); }
      /* ---------- chairs, notes, pocket ---------- */
      const chairAt = function (cell) { return S.chairs.find(function (c) { return c.cell === cell; }); }; function chairN(c) { if (c.zero) return 1; const b = S.beat; let n = 1;
        if (b >= 4 && b <= 9 && (c.idx === S.lastIdx || c.idx === S.secondIdx)) n = 2; if (b === 9 && c.idx === S.lastIdx) n = 3; return n; }
      /* cast cameos and callbacks: the Stapler is always on the picket line; the rest turn up if you have visited their departments */
      function crossNote() { const xs = ['notesStapler'], g = function (id) { return api.stat.get(id + '.entered') > 0; };
        if (g('chair-rearranger')) xs.push('notesX'); if (g('elevator-simulator')) xs.push('notesLift'); if (g('toaster-debate')) xs.push('notesToast'); return api.chance(xs.length > 1 ? .22 : .07) ? api.pick(xs) : ''; }
      function makeNote(c) { const SIG = ' - You'; if (c.zero) return LINES.notesChairZero[0] + SIG; if (c.gerald) { const named = !!api.flag.get('metGerald');
          return fill(api.line(M + 'notesGerald'), { who: named ? 'GERALD' : 'THE POTATO' }); }
        if (session.hi === 1) { session.hi = 2; return LINES.notesHi[1]; }
        if (session.hi === 2) { session.hi = 3; return LINES.notesHi[2]; }
        if (session.hi === 0 && api.chance(1 / 60)) { session.hi = 1; return LINES.notesHi[0]; }
        const n = chairN(c), b = S.beat, r = api.rand(); let cat = 'notes0'; if (n >= 3) cat = 'notesThird'; else if (n === 2) cat = 'notesSecond'; else if (b >= 4 && b <= 5) cat = r < .5 ? 'notes1' : 'notes0';
        else if (b === 6) cat = r < .5 ? 'notes1' : 'notes2'; else if (b === 7) cat = 'notes2'; else if (b === 8) cat = r < .6 ? 'notes3' : 'notes2'; else if (b === 9) cat = 'letter'; let raw, sign = true, xk = '';
        if (cat === 'letter') { const ix = session.letter++ % 7; raw = LINES.letter[ix]; sign = ix !== 6; }
        else if (cat === 'notes1' && api.chance(.25)) raw = api.line(M + (SG('suggestivePasses') > 0 ? 'notes1yes' : 'notes1no'));
        else if (cat === 'notes0' && (xk = crossNote())) { raw = api.line(M + xk); sign = xk === 'notesX'; }
        else raw = api.line(M + cat); c.src = cat; const pk = predictKey(); if (String(raw).indexOf('%predict%') >= 0) c.predKey = pk;
        const v = { steps: ival(SG('steps')), bumps: ival(SG('bumps')), sits: ival(SG('sits')), mins: String(Math.max(1, Math.floor(S.arcT / 60))), level: PLAQ[S.k] || PLAQ[0],
          lastDir: S.lastDirName || 'nowhere', notes: ival(SG('notes')), predict: PRED[pk] || 'the right arrow' }; return fill(raw, v) + (sign ? SIG : ''); }
      function showCard(text, o) { o = o || {}; text = fill(text) || '...'; cardTxt.textContent = text; cardSt.textContent = o.taken ? '(taken)' : (o.readonly ? '(from your pocket)' : '');
        card.classList.remove('m-maze-of-meh-empty'); card.classList.toggle('m-maze-of-meh-nerv', !!o.nervous && !S.rm); S.card = { text: text, chair: o.chair || null, until: o.secs ? S.clock + o.secs : 0 }; }
      function hideCard() { S.card = null; cardTxt.textContent = 'No note yet. Dead ends have chairs. Chairs have notes.'; cardSt.textContent = '';
        card.classList.add('m-maze-of-meh-empty'); card.classList.remove('m-maze-of-meh-nerv'); }
      function pocketClick(ix) { touchInput(true); const t = S.pocket[ix]; if (!t) return; showCard(t, { readonly: true, secs: 4 }); sfx('tick', 100); }
      function savePocket() { api.save.set('pocket', S.pocket.map(function (s) { return String(s).slice(0, 160); })); }
      function paintPocket() { const key = S.pocket.join('|'); if (paintPocket.k === key) return; paintPocket.k = key; slots.forEach(function (b, ix) { const t = S.pocket[ix]; b.disabled = !t; b.textContent = t ? '📝' : '-';
          b.setAttribute('aria-label', t ? 'Pocket note: ' + t.slice(0, 40) : 'Empty pocket slot'); b.title = t ? t.slice(0, 40) : ''; }); }
      function sitDown(c, auto) { if (S.mode !== 'play' && S.mode !== 'autowalk') return; S.mode = 'sit'; S.path = null; S.steer = null; S.sit = { chair: c, t: 0, q: false, auto: !!auto };
        sfx('pop'); SI('sits'); spawn((c.x + .5) * cs + 6, (c.y + .5) * cs + 6, 8, '#b9a3f2'); const firstSit = !auto && !c.sat; if (auto) { c.note = LINES.notesIdle[0] + ' - You'; c.taken = false; c.src = ''; }
        else if (!c.note) c.note = makeNote(c); if (firstSit) { c.sat = true; if (!c.zero) S.sitCount++; earn(0.5, 'first sit', false); SI('notes'); }
        if (c.pin && !c.pinDone && !auto) { c.pinDone = true; api.achieve('maze-of-meh.pin'); api.confetti(); sfx('fanfare'); }
        showCard(c.note, { chair: c, taken: c.taken, nervous: c.src === 'notes3' }); if (!auto) { sfx('ding', 200); }
        if (!auto) { const ln = L('sit', { count: ival(SG('sits')) }); tick(ln); if (api.chance(.4)) sayM(L('sit', { count: ival(SG('sits')) }), { mood: 'smug' });
          if (!session.you) { session.you = true; api.setTimeout(function () { sayM(L('youSigned'), { priority: 1, mood: 'confused' }); }, 900); }
          const real = S.chairs.filter(function (x) { return !x.zero; }).length; if (firstSit && !c.zero && real > 1 && S.sitCount === real && S.stitchedUntil < S.clock) stitch(); }
      }
      function standUp() { if (S.mode !== 'sit' || !S.sit) return; const secs = S.sit.t, q = S.sit.q, ch = S.sit.chair, wasAuto = S.sit.auto; S.sit = null; S.mode = 'play'; api.stat.max('maze-of-meh.longestSit', Math.floor(secs));
        /* a prediction note arms when it is put down: the NEXT key after standing is what it bet on */
        if (ch && ch.predKey && !ch.predArmed && !wasAuto) { ch.predArmed = true; S.armed = { key: ch.predKey }; }
        if (q) quorumLeave(); const ln = secs >= 8 ? fill(LINES.standLong[0], { secs: ival(secs) }) : L('stand'); tick(ln); hideCard(); }
      function takeNote() { if (S.mode !== 'sit' || !S.sit) return; const c = S.sit.chair; if (!c.note || c.taken) { tick('That note is already in your pocket. It has settled in.'); return; }
        c.taken = true; S.pocket.push(String(c.note).slice(0, 160));
        if (S.pocket.length > 7) { S.pocket.shift(); tick(L('pocketFull')); sayM(L('pocketFull'), { mood: 'confused' }); } else tick(L('take', { count: S.pocket.length }));
        savePocket(); sfx('ding', 100); showCard(c.note, { chair: c, taken: true, nervous: c.src === 'notes3' }); }
      function stitch() { S.stitchedUntil = S.clock + 60; const parts = S.chairs.filter(function (x) { return !x.zero && x.note; }).map(function (x) { const m = /^[^.?!]*[.?!]/.exec(x.note); return (m ? m[0] : x.note).trim(); });
        const chunks = []; let cur = ''; parts.forEach(function (p) { if (cur && (cur + ' ' + p).length > 140) { chunks.push(cur); cur = p; } else cur = cur ? cur + ' ' + p : p; }); if (cur) chunks.push(cur);
        sayM(LINES.stitched[0], { priority: 1, mood: 'proud' }); tick('Every chair sat in. Every note stitched. Notes: 1. Authors: 1.');
        chunks.slice(0, 4).forEach(function (t, ix) { api.setTimeout(function () { if (!S.dead) sayM(t, { priority: 1, mood: 'confused' }); }, 3000 * (ix + 1)); });
        api.setTimeout(function () { if (!S.dead) { tick(LINES.stitched[1]); } }, 3000 * (Math.min(4, chunks.length) + 1)); S.humUntil = S.clock + 6; earn(2, 'stitched', true); api.achieve('maze-of-meh.stitched'); sfx('bell'); }
      function readPocket(all) { S.readT.forEach(function (t) { api.clearTimeout(t); }); S.readT = []; const p = S.pocket; if (!p.length) { sayM(L('pocketEmpty'), { priority: 1, mood: 'neutral' }); return; }
        const arr = p.slice(all ? -7 : -3); sayM(L('pocketRead'), { priority: 1, mood: 'neutral' });
        arr.forEach(function (n, ix) { S.readT.push(api.setTimeout(function () { if (!S.dead) sayM(n, { priority: 1, mood: 'confused' }); }, 3200 * (ix + 1))); });
        if (S.beat === 9) S.readT.push(api.setTimeout(function () { if (!S.dead) sayM(LINES.letterPause[0], { priority: 1, mood: 'smug' }); }, 3200 * arr.length + 2000)); }
      /* ---------- signs ---------- */
      const signVisible = function (sg) { return sg.b ? (S.beat >= 7 && S.beat <= 9) : true; }; function trueDir(from) { const r = bfs(S.exitCell, function (e) { return !permSolid(e); }); let best = -1, bd = 1e9;
        for (let d = 0; d < 4; d++) { if (!inb(from, d)) continue; const j = nb(from, d); if (permSolid(edgeAt[from * 4 + d])) continue; if (r.dist[j] >= 0 && r.dist[j] < bd) { bd = r.dist[j]; best = d; } }
        return best; }
      function signNear() { let best = null, bd = 9; const a = S.av;
        S.signs.forEach(function (sg) { if (!signVisible(sg)) return; const d = Math.abs(sg.cx - a.cx) + Math.abs(sg.cy - a.cy); if (d <= 1 && d < bd) { bd = d; best = sg; } }); return best; }
      function askSign(sg) { if (!sg || S.mode === 'door' || S.mode === 'ending') return; sfx('bell', 150); sg.ang -= Math.PI * 2; sg.v = 0; const conf = CONF[Math.min(4, S.signConf)]; if (sg.b) {
          const td = trueDir(sg.cell); const dir = td < 0 ? 0 : td; sg.target = DANG[dir]; sg.dir = dir; SI('signAsks'); earn(0.05, 'sign', false); const e = edgeAt[sg.cell * 4 + dir], blocked = e && !canCross(e).ok;
          if (blocked) { tick(L('signBwall')); bubble('I said the way.', sg.cx, sg.cy, 2.4, 'sign'); const a1 = api.line(M + 'argue'), a2 = api.line(M + 'argue'); api.setTimeout(function () { if (!S.dead) tick(a1); }, 1800);
            api.setTimeout(function () { if (!S.dead) tick(a2); }, 4200); } else { tick(L('signB')); bubble('That way.', sg.cx, sg.cy, 2.4, 'sign'); }
          return; }
        SI('signAsks'); earn(0.05, 'sign', false); if (S.loops >= 1 && !S.signYouDone) { S.signYouDone = true; sg.target = Math.atan2(S.av.cy - sg.cy, S.av.cx - sg.cx); sg.dir = -1;
          bubble('You.', sg.cx, sg.cy, 2.4, 'sign'); sayM(LINES.signYou[0], { priority: 1, mood: 'smug' }); S.signConf++; api.save.set('signConf', S.signConf); return; }
        const td = trueDir(sg.cell), opts = []; for (let d = 0; d < 4; d++) if (gap[sg.cell * 4 + d]) opts.push(d); const nervous = td >= 0 && api.chance(1 / 8);
        const dir = nervous ? td : api.pick(opts.filter(function (d) { return d !== td; }).concat(opts.length > 1 ? [] : opts)); const dd = dir === undefined ? api.pick(opts) : dir;
        sg.target = DANG[dd]; sg.dir = dd; sg.sweat = nervous ? S.clock + 3 : 0; const v = { dir: DIRW[dd], conf: conf };
        if (nervous) { tick(L('signNervous', v)); sayM(fill(LINES.signNervous[1], v), { mood: 'panic' }); bubble('...is that right?', sg.cx, sg.cy, 2.4, 'sign'); }
        else { tick(L('signAsk', v)); bubble(DIRW[dd].toUpperCase() + '. Certain.', sg.cx, sg.cy, 2.4, 'sign'); if (api.chance(.4)) sayM(L('signAsk', v), { mood: 'smug' }); }
        const at = api.now(); S.askLog = (S.askLog || []).filter(function (t) { return at - t < 12000; }); S.askLog.push(at);
        if (S.askLog.length >= 4) { sg.ang -= Math.PI * 4; tick(L('signSpam'), true); bubble('please stop', sg.cx, sg.cy, 2.4, 'sign'); if (S.askLog.length === 4) sayM(L('signSpam'), { mood: 'panic' }); } /* spam: the sign is not built for it */
        S.follow = { dir: dd, until: S.clock + 8, n: 0, nervous: nervous, sg: sg }; S.signConf++; api.save.set('signConf', S.signConf); }
      /* ---------- actions ---------- */
      function nothing() { const now = api.now(); S.nothingN = (S.nothingN || 0) + 1;
        if (S.nothingN % 8 === 0) { S.nothingAt = now; const nm = LINES.nothingMany; tick(nm[Math.min(nm.length, S.nothingN / 8) - 1], true); return; } /* spam: pressing nothing, counted */
        if (now - S.nothingAt < 4000) return; S.nothingAt = now; tick(L('nothing')); }
      function escapeKey() { const t = api.now(); S.escPress = (S.escPress || 0) + 1;
        if (S.escPress === 12) { api.achieve('maze-of-meh.escape'); sfx('tada'); tick(LINES.escapeBig[0], true); sayM(LINES.escapeBig[0], { priority: 1, mood: 'proud' }); return; }
        if (t - (S.escAt || -99999) >= 1300) { S.escAt = t; tick(LINES.escape[S.escN++ % LINES.escape.length]); }
      }
      function doE() { if (S.mode === 'door' || S.mode === 'ending') return; logKey('E');
        if (S.mode === 'sit') { if (S.sit && S.sit.chair.note) { showCard(S.sit.chair.note, { chair: S.sit.chair, taken: S.sit.chair.taken, nervous: S.sit.chair.src === 'notes3' }); sfx('tick', 100); } return; }
        const c = chairAt(curCell()); if (c) { sitDown(c); return; }
        const sg = signNear(); if (sg) { askSign(sg); return; }
        nothing(); }
      function doR() { if (S.mode === 'door' || S.mode === 'ending') return; logKey('R'); if (S.mode === 'sit') { takeNote(); return; }
        const sg = signNear(); if (sg) { askSign(sg); return; }
        const c = chairAt(curCell()); if (c) { sitDown(c); return; }
        if (S.pocket.length) { showCard(S.pocket[S.pocket.length - 1], { readonly: true, secs: 4 }); sfx('tick', 100); return; }
        nothing(); }
      function ctxAction() { const nir = NIR[Math.floor(S.clock / 20) % 3]; if (S.mode === 'door' || S.mode === 'ending') return { label: nir, on: false };
        if (S.mode === 'sit') return { label: 'Take note', on: !!(S.sit && S.sit.chair.note && !S.sit.chair.taken) }; if (chairAt(curCell())) return { label: 'Sit', on: true };
        if (signNear()) return { label: 'Ask the sign', on: true }; if (S.pocket.length) return { label: 'Read pocket', on: true }; return { label: nir, on: false }; }
      function doAction() { const c = ctxAction(); if (!c.on) { nothing(); return; }
        if (c.label === 'Sit') doE(); else if (c.label === 'Ask the sign') doE(); else doR(); }
      /* ---------- input plumbing ---------- */
      function touchInput(countIt) { const now = api.now(); S.idleT = 0; S.idle60 = S.idle30 = S.idle100 = false; S.idleSeen = {}; if (S.mode === 'autowalk') { S.mode = 'play'; S.path = null; }
        if (S.waitingAll) wake(); if (countIt) { S.inputLog.push(now); if (S.inputLog.length > 80) S.inputLog.shift(); let c = 0; for (let q = S.inputLog.length - 1; q >= 0 && now - S.inputLog[q] <= 3000; q--) c++;
          if (c >= 40 && now > S.pestCool) overexert(); }
      }
      function overexert() { const now = api.now(); S.pestCool = now + 30000; S.dizzyUntil = now + 1200; S.recessUntil = S.clock + 8; S.inputLog.length = 0;
        banner.hidden = false; api.setTimeout(function () { banner.hidden = true; }, 3000); sfx('honk'); api.achieve('maze-of-meh.pest'); S.path = null; S.steer = null; sayM(LINES.overexert[0], { priority: 1, mood: 'panic' });
        tick(LINES.overexert[0]); api.setTimeout(function () { if (!S.dead) tick(LINES.overexert[api.pick([1, 3, 5, 6])]); }, 1500); api.setTimeout(function () { if (!S.dead) tick(LINES.overexert[2]); }, 3000);
        api.setTimeout(function () { if (!S.dead) tick(LINES.overexert[api.pick([4, 7, 8])]); }, 4600); }
      function wake() { S.waitingAll = false; S.lock = { born: S.batchNo }; S.exitCell = goalCell; S.exitSlide = true; const ln = L('idleReturn'); tick(ln); sfx('sad'); sayM(ln, { priority: 1, mood: 'disappointed' }); repair(); }
      function startWaiting() { S.idle180 = true; S.waitingAll = true; const a = S.av; let best = -1, bd = 1e9; const r = bfs(goalCell, function () { return true; });
        for (let d = 0; d < 4; d++) { if (!inb(curCell(), d)) continue; const j = nb(curCell(), d); if (r.dist[j] < bd) { bd = r.dist[j]; best = j; } }
        if (best >= 0 && best !== a.cy * W + a.cx) S.exitCell = best; S.exitSlide = true; sfx('whoosh'); const ln = L('idle180'); tick(ln); sayM(ln, { priority: 1, mood: 'confused' }); }
      function startAuto() {
        /* the idle walk must never wander through the exit: idling is not progress */
        const here = curCell(), r = bfs(here, function (e) { return !permSolid(e) && e.a !== S.exitCell && e.b !== S.exitCell; }); let best = null;
        S.chairs.forEach(function (c) { if (c.cell !== here && r.dist[c.cell] > 0 && (!best || r.dist[c.cell] < r.dist[best.cell])) best = c; }); if (!best) { S.idle60 = false; S.idleRetry = S.clock + 5; return; }
        const path = []; for (let c = best.cell; c !== here && c >= 0; c = r.par[c]) path.unshift(c); S.path = path; S.pathKind = 'auto'; S.mode = 'autowalk'; S.autoChair = best; S.autoBlock = 0;
        if (S.clock - S.idleSaid > 40) { S.idleSaid = S.clock; const ln = L('idle60'); tick(ln); sayM(ln, { priority: 1, mood: 'smug' }); }
      }
      function autoGiveUp() { S.path = null; S.mode = 'play'; S.autoChair = null; S.idle60 = false; S.idleRetry = S.clock + 4; }
      function autoArrive() { const c = S.autoChair; S.autoChair = null; if (c && c.cell === curCell()) { api.achieve('maze-of-meh.idle'); sitDown(c, true); } else S.mode = 'play'; }
      function planPath(target) { const r = bfs(curCell(), function (e) { return canCross(e).ok; }); if (r.dist[target] < 0) { tick(L('click')); return; }
        const path = []; for (let c = target; c !== curCell() && c >= 0; c = r.par[c]) path.unshift(c);
        if (path.length > 8) { path.length = 8; if (S.capN++ % 3 === 0) tick(L('capWalk')); } /* the Arrow's attention span: the maze cannot be one click */
        S.path = path; S.pathKind = 'click'; }
      function dirBetween(a, b) { for (let d = 0; d < 4; d++) if (inb(a, d) && nb(a, d) === b) return d; return -1; }
      function segDist(px, py, x1, y1, x2, y2) { const dx = x2 - x1, dy = y2 - y1, l2 = dx * dx + dy * dy; let t = l2 ? ((px - x1) * dx + (py - y1) * dy) / l2 : 0; t = clamp(t, 0, 1);
        return Math.hypot(px - (x1 + t * dx), py - (y1 + t * dy)); }
      function onClickAt(cx, cy) { if (S.mode === 'door' || S.mode === 'ending') return; const r = canvas.getBoundingClientRect(), k = r.width > 0 ? cw / r.width : 1; const px = (cx - r.left) * k - 6, py = (cy - r.top) * k - 6;
        if (!isNum(px) || !isNum(py)) return; const gx = Math.floor(px / cs), gy = Math.floor(py / cs); if (gx < 0 || gy < 0 || gx >= W || gy >= H) return;
        const cell = gy * W + gx, mid = Math.hypot(px - (gx + .5) * cs, py - (gy + .5) * cs); let best = null, bd = 99; for (let d = 0; d < 4; d++) {
          const e = edgeAt[cell * 4 + d]; if (!e || !(e.label || e.base === 'wall')) continue; const dd = segDist(px, py, e.x1 * cs, e.y1 * cs, e.x2 * cs, e.y2 * cs); if (dd <= 7 && dd < bd) { bd = dd; best = e; }
        }
        if (best && mid > cs * .4) { const txt = best.label ? best.label.text : 'PLAIN WALL', ty = best.label ? best.label.type : 'plain';
          tick('Wall ' + wallNum(best) + ': ' + txt + '. ' + (FLAVOR[ty] || FLAVOR.plain)); sfx('tick', 80); const lk = best.looks = (best.looks || 0) + 1; /* the secret: look at one wall, seven times */
          if (lk === 3 || lk === 5 || lk === 7) { const sv = fill(LINES.stare[(lk - 3) / 2], { n: wallNum(best) }); api.setTimeout(function () { if (!S.dead) tick(sv, true); }, 700);
            if (lk === 7) { S.eyes = { e: best, until: S.clock + 5 }; api.achieve('maze-of-meh.stare'); earn(7, 'eye contact', true); sfx('ding'); spawn(best.mx * cs + 6, best.my * cs + 6, 10, '#f5b82e'); sayM(sv, { priority: 1, mood: 'confused' }); }
          }
          return; }
        const sg = S.signs.find(function (s) { return signVisible(s) && s.cell === cell; }); if (sg && Math.abs(sg.cx - S.av.cx) + Math.abs(sg.cy - S.av.cy) <= 1) { askSign(sg); return; }
        if (cell === curCell()) { if (S.mode === 'sit') { doE(); return; }
          const c = chairAt(cell); if (c) { sitDown(c); return; }
          if (sg) askSign(sg); return; }
        if (S.mode === 'sit') standUp(); planPath(cell); }
      function onKey(e) { if (S.dead || S.lastKey === e) return; S.lastKey = e; if (e.ctrlKey || e.metaKey || e.altKey) return; const tg = e.target, tn = tg && tg.tagName ? String(tg.tagName) : '';
        if (tn === 'INPUT' || tn === 'TEXTAREA' || tn === 'SELECT' || (tg && tg.isContentEditable)) return; const k = e.key; if ((k === ' ' || k === 'Enter') && tn === 'BUTTON') return; let dir = -1;
        if (k === 'ArrowUp' || k === 'w' || k === 'W') dir = 0; else if (k === 'ArrowRight' || k === 'd' || k === 'D') dir = 1;
        else if (k === 'ArrowDown' || k === 's' || k === 'S') dir = 2; else if (k === 'ArrowLeft' || k === 'a' || k === 'A') dir = 3; const now = api.now(); if (dir >= 0) {
          e.preventDefault(); touchInput(!e.repeat); logKey(DIRW[dir]); if (e.repeat && now - S.lastMoveAt < 130) return; tryStep(dir, 'key'); return; }
        if (k === 'e' || k === 'E' || k === ' ') { e.preventDefault(); touchInput(true); doE(); return; }
        if (k === 'r' || k === 'R' || k === 'Enter') { e.preventDefault(); touchInput(true); doR(); return; }
        if (k === 'Escape') { touchInput(true); if (S.mode === 'sit') standUp(); else escapeKey(); return; }
        touchInput(false); }
      api.on(root, 'keydown', onKey); api.on(document, 'keydown', onKey); function steerClear() { S.steer = null; S.press = null; }
      api.on(canvas, 'pointerdown', function (e) { touchInput(true); if (e.button != null && e.button > 0) return; S.press = { ox: e.clientX, oy: e.clientY, moved: false, at: api.now() }; S.steer = null;
        try { canvas.setPointerCapture(e.pointerId); } catch (err) { /* synthetic pointer */ }
        try { stage.focus({ preventScroll: true }); } catch (err2) { /* ignore */ }
      }); api.on(canvas, 'pointermove', function (e) { const p = S.press; if (!p) return; const dx = e.clientX - p.ox, dy = e.clientY - p.oy, now = api.now(); if (Math.max(Math.abs(dx), Math.abs(dy)) > 14) { p.moved = true;
          const dir = Math.abs(dx) > Math.abs(dy) ? (dx > 0 ? 1 : 3) : (dy > 0 ? 2 : 0); S.steer = { dir: dir, last: now }; if (!p.lastIn || now - p.lastIn >= 130) { p.lastIn = now; touchInput(true); }
        } else if (S.steer) S.steer.dir = -1; }); api.on(canvas, 'pointerup', function (e) { const p = S.press; S.lastPtrUp = api.now(); steerClear();
        if (p && !p.moved && (e.button == null || e.button <= 0)) onClickAt(p.ox, p.oy); }); api.on(canvas, 'pointercancel', steerClear); api.on(canvas, 'lostpointercapture', steerClear); api.on(canvas, 'blur', steerClear);
      api.on(window, 'blur', function () { steerClear(); padRelease(); }); api.on(canvas, 'click', function (e) { if (api.now() - S.lastPtrUp < 600) return; touchInput(true); onClickAt(e.clientX, e.clientY); });
      function padPress(dir) { S.padAt = api.now(); S.padStart = S.padAt; touchInput(true); logKey(DIRW[dir]); padRelease(); tryStep(dir, 'pad'); S.padInt = api.setInterval(function () { if (S.dead) return;
          if (api.now() - S.padStart > 5000) { padRelease(); return; }
          tryStep(dir, 'pad'); }, 130); }
      function padRelease() { S.padAt = api.now(); if (S.padInt) { api.clearInterval(S.padInt); S.padInt = 0; } }
      api.on(window, 'resize', function () { const now = api.now(); S.resizeLog.push(now); S.resizeLog = S.resizeLog.filter(function (t) { return now - t < 20000; }).slice(-12); layout();
        if (S.rsTimer) api.clearTimeout(S.rsTimer); S.rsTimer = api.setTimeout(function () { S.rsTimer = 0; if (S.dead) return; layout(); resizeGag(); }, 300); }); function resizeGag() {
        if (S.mode !== 'play' && S.mode !== 'sit') return; const avoid = S.tw ? S.tw.edge : null; let e = null; for (let q = 0; q < 30 && !e; q++) { const c = api.pick(edges); if (c && !c.label && c !== avoid) e = c; }
        if (e) { const lb = trySetLabel(e, 'solid', 'RE-SIZED (per Facilities)'); if (lb) { lb.t0 = S.clock; stampSfx('stamp'); } }
        tick(L('resize')); if (S.resizeLog.length > 5 && !S.rm) { S.shearUntil = S.clock + 3; tick(LINES.triangle[0], true); api.setTimeout(function () { if (!S.dead) tick(LINES.triangle[1]); }, 3200); }
      }
      /* ---------- the relabeller ---------- */
      function pickType(u, beat, passFirst) { if (passFirst) return 'suggestive'; if (beat >= 3 && beat < 10 && api.chance(1 / 40)) return 'wall';
        if (beat >= 6 && beat < 10 && api.chance(.03)) return api.chance(.5) ? 'sandra' : 'support'; if (beat >= 8 && beat < 10 && S.clock - S.lastTue > 120 && api.chance(.05)) return 'tuesday'; const r = api.rand() * 100;
        if (u < 5) return r < 60 ? 'solid' : 'suggestive'; return r < 38 ? 'solid' : r < 66 ? 'suggestive' : r < 83 ? 'pending' : 'nameonly'; }
      function labelText(type, beat) { switch (type) { case 'solid': { const r = api.rand(); if (beat >= 8 && r < .15) return 'LOAD-BEARING (BUT LIKE, EMOTIONALLY)'; if (beat >= 6 && r < .3) return 'LOAD-BEARING (SMALL LOAD)';
            return r < .4 ? 'LOAD-BEARING' : r < .56 ? 'STRUCTURAL' : r < .7 ? 'LOAD-BEARING (SEASONAL)' : r < .85 ? 'LOAD-BEARING, SINCE LUNCH' : 'STRUCTURAL (PER SANDRA)'; }
          case 'suggestive':
            if (SG('suggestivePasses') >= 10 && api.chance(.2)) return 'PREVIOUSLY SUGGESTIVE, NOW RECONSIDERING'; return beat >= 6 && api.chance(.3) ? 'SUGGESTIVE (PER SANDRA)' : 'SUGGESTIVE';
          case 'pending': return beat >= 7 && api.chance(.3) ? 'THIS WALL HAS BEEN IN A MEETING ABOUT ITSELF' : api.pick(['PENDING REVIEW', 'UNDER REVIEW']);
          case 'nameonly': return api.pick(['A WALL IN NAME ONLY', 'A WALL (KEVIN)']); case 'sandra': return 'AS PER SANDRA'; case 'support': return 'EMOTIONAL SUPPORT'; case 'tuesday': return 'TUESDAY'; default: return 'WALL'; }
      }
      function pickEdge(type, near) { const avoid = S.tw ? S.tw.edge : null, a = S.av; for (let q = 0; q < 40; q++) { const list = (api.chance(.7) ? wallEdges : gapEdges), e = api.pick(list);
          if (!e || e.label || e === avoid) continue; if (near && Math.abs((e.mx) - (a.cx + .5)) + Math.abs(e.my - (a.cy + .5)) > 5) continue; return e; }
        return null; }
      /* rare event: Wall 14 turns up again, anywhere, with a longer story every time (the count lives in the save, so it carries across sessions) */
      function wall14Returns() { const e = pickEdge('solid', false), lb = e ? trySetLabel(e, 'solid', 'LOAD-BEARING') : null; if (!lb) return; lb.n = 14; lb.t0 = S.clock;
        const n = (api.save.get('w14', 0) | 0) + 1; api.save.set('w14', n); const ln = fill(LINES.wall14[Math.min(n, LINES.wall14.length) - 1], { count: n });
        api.setTimeout(function () { if (S.dead) return; tick(fill('WALL 14: sighted. Visit %count%. Cause: unknown, ongoing.', { count: n }), true); sayM(ln, { priority: 1, mood: 'confused' }); sfx('ding', 100); spawn(e.mx * cs + 6, e.my * cs + 6, 8, '#ff7a6b'); earn(0.14, 'wall 14', false); }, 3300);
      }
      /* two rare events: a wall goes on strike (passable, the Stapler is picketing), or confesses it was a door (passable, and a little emotional) */
      function rareStamp() { const picket = api.chance(.5), e = pickEdge('suggestive', false); if (!e) return; const lb = trySetLabel(e, 'suggestive', picket ? 'ON STRIKE (SOLIDARITY)' : 'ADMITS IT WAS A DOOR'); if (!lb) return;
        lb.rare = picket ? 'picket' : 'confess'; lb.t0 = S.clock; SI('rareStamps');
        const v = { n: wallNum(e) }, ln = fill(picket ? (fg('metStapler') && api.chance(.6) ? LINES.picketMet[0] : api.line(M + 'picketTag')) : api.line(M + 'confessTag'), v);
        api.setTimeout(function () { if (S.dead) return; tick(ln, true); sayM(ln, { priority: 1, mood: 'confused' }); sfx(picket ? 'honk' : 'ding', 200); spawn(e.mx * cs + 6, e.my * cs + 6, 8, picket ? '#f5b82e' : '#7fd6b0'); }, 3600);
      }
      function doBatch() { const beat = S.beat, ex = SG('exits'); let u = Math.max(beat, ex * 2); if (ex >= 1) u = Math.max(u, 5); S.batchNo++; S.batchesLevel++;
        S.labs.slice().forEach(function (e) { if (e.label && S.batchNo - e.label.born >= 3) clearLabel(e); }); if (S.lock && S.batchNo - S.lock.born >= 3) S.lock = null;
        const n = beat === 10 ? api.randInt(3, 4) : api.randInt(3, 6), done = []; for (let q = 0; q < n; q++) { let type = pickType(u, beat, false); if (q === 0 && S.batchesLevel === 1) type = 'suggestive';
          if (beat === 10 && q === 0) type = 'solid'; const e = pickEdge(type, q === 0 && S.batchesLevel === 1); if (!e) continue; const txt = labelText(type, beat), lb = setLabel(e, type, txt, (S.scripted14 === e) ? 14 : e.id);
          if (type === 'tuesday') { lb.until = S.clock + 5; S.tue = { mx: e.mx, my: e.my, until: S.clock + 5 }; S.lastTue = S.clock; }
          if (type === 'wall') { S.freezeUntil = S.clock + 1; }
          done.push(e); }
        if (S.batchNo >= 3 && (api.chance(api.selftest ? .25 : .05) || (S.batchNo >= 8 && S.loops === 0 && !session.w14 && (session.w14 = true)))) wall14Returns(); /* first lap: Wall 14 is back within about 90 s */
        if (S.batchNo >= 4 && beat < 10 && api.chance(api.selftest ? .2 : .035)) rareStamp();
        if (S.batchesLevel <= 3 && done.length && !done.some(function (e) { return e.label && (e.label.type === 'suggestive' || e.label.type === 'nameonly'); })) { const e = done[0]; setLabel(e, 'suggestive', 'SUGGESTIVE', e.id);
        }
        if (!reachable()) { for (let q = 0; q < done.length && !reachable(); q++) { const e = done[q]; if (e.label && e.base === 'gap' && SOLIDISH[e.label.type]) setLabel(e, 'suggestive', 'SUGGESTIVE', e.label.n); }
          /* expiry can seal the exit too (a passable label on a base wall runs out while a solid label on a doorway outlives it), so repair ALL labels, oldest first */
          if (!reachable()) repair(); if (!reachable()) { done.forEach(function (e) { if (e.label) clearLabel(e); }); done.length = 0; }
        }
        for (let q = done.length - 1; q >= 0; q--) if (!done[q].label) done.splice(q, 1); if (!done.length) return; SI('relabels'); const first = done[0].label; let rare = null;
        done.forEach(function (e) { if (e.label && /^(wall|sandra|support|tuesday)$/.test(e.label.type)) rare = e.label; }); const showL = rare || first, v = { n: showL.n, label: showL.text, count: done.length };
        let cat = { solid: 'relabelSolid', suggestive: 'relabelSuggestive', pending: 'relabelPending', nameonly: 'relabelName', sandra: 'sandraTag', support: 'supportTag', tuesday: 'tuesdayTag', wall: 'wallTag' }[showL.type] || 'relabelSolid';
        const sE = done.find(function (e) { return e.label === showL; }), rmile = showL.type === 'wall' ? undefined : LINES.relMile[SG('relabels')]; if (cat === 'relabelSolid' && sE && sE.base === 'gap') cat = 'relabelDoor';
        const ln = showL.type === 'wall' ? LINES.wallTag[0] : (rmile || (!rare && S.arcT >= 180 && api.chance(.3) ? L('relabelKnow', v) : L(cat, v))); tick(ln); const summary = beat >= 7 ? L('committee', v) : L('batch', v);
        if (rmile) sayM(rmile, { priority: 1, mood: 'proud' }); else api.setTimeout(function () { if (!S.dead) tick(summary); }, 2600);
        if (beat !== 9) { stampSfx('stamp'); api.setTimeout(function () { if (!S.dead) stampSfx('stamp'); }, 140); }
        if (S.clock - S.relSay >= 20 && (rare || S.batchesLevel <= 2)) { S.relSay = S.clock; let m2 = showL.type === 'wall' ? ln : L(cat, v); if (m2 === ln && showL.type !== 'wall') m2 = L('batch', v); sayM(m2, { priority: rare ? 1 : 0, mood: rare ? 'confused' : 'neutral' }); }
        if (showL.type === 'wall') { sfx('tada'); api.setTimeout(function () { if (!S.dead) tick(LINES.wallTag[1], true); }, 1000); api.setTimeout(function () { if (!S.dead) tick(LINES.wallTag[2], true); }, 2200); }
      }
      function interval() { const b = S.beat; return b === 10 ? 12 + api.rand() * 4 : b >= 7 ? 5 + api.rand() * 3 : 6 + api.rand() * 5; }
      /* ---------- levels, exits, ending ---------- */
      function loadLevel(scripted) { edges.forEach(function (e) { e.label = null; e.bumps = 0; e.looks = 0; e.log.length = 0; e.hurtCool = 0; e.supportGiven = false; }); S.labs.length = 0; S.visited.fill(0); S.scripted14 = null;
        const a = S.av; a.cx = 0; a.cy = 0; a.fx = 0; a.fy = 0; S.tw = null; S.path = null; S.steer = null; S.sit = null; S.follow = null; S.quorum = null;
        S.exitCell = goalCell; S.exPos.x = goalCell % W; S.exPos.y = (goalCell / W) | 0;
        S.strike = 0; S.lunchTried = 0; S.sockG = null; S.recessUntil = 0; S.tue = null; S.lock = null; S.waitingAll = false; S.levelEarn = 0; S.sitCount = 0; S.supportCount = 0; S.dennisSeen = false;
        S.signYouDone = false; S.relabelIn = scripted ? 12 : 8; S.batchesLevel = 0; S.cuIdx = S.k; S.scripted = !!scripted; S.bub.length = 0; S.stitchedUntil = 0; hideCard(); S.visited[0] = 1;
        S.chairs = deadCells.map(function (c, ix) { return { cell: c, x: c % W, y: (c / W) | 0, note: null, src: '', sat: false, taken: false, gerald: false, zero: false, idx: ix, predKey: '' }; });
        S.lastIdx = S.chairs.length - 1; S.secondIdx = S.chairs.length > 2 ? api.randInt(0, S.chairs.length - 2) : -1; S.geraldNamed = !!api.flag.get('metGerald'); if (S.arcT >= 300 && S.chairs.length >= 2 && api.chance(.25)) {
          const g = S.chairs[api.randInt(0, S.chairs.length - 2)]; g.gerald = true; }
        if (S.loops >= 1 && S.k === 0) S.chairs.unshift({ cell: 0, x: 0, y: 0, note: null, src: '', sat: false, taken: false, gerald: false, zero: true, idx: -1, predKey: '' });
        S.signs = [{ cell: signA, cx: signA % W, cy: (signA / W) | 0, ang: DANG[0], target: DANG[0], v: 0, dir: 0, b: false, near: false, sweat: 0, nameplate: false },
          { cell: signB, cx: signB % W, cy: (signB / W) | 0, ang: DANG[2], target: DANG[2], v: 0, dir: 2, b: true, near: false, sweat: 0 }]; if (!scripted) { S.ev.welcome = S.ev.stamp = S.ev.attend = S.ev.w3 = S.ev.w4 = 1; }
        S.drawOn = (scripted && !S.rm) ? 0 : 1; if (S.k > 0 && api.chance(1 / 40)) { setPlaque('LEVEL 8', false); sfx('bell'); sayM(L('flash'), { priority: 1, mood: 'panic' });
          api.setTimeout(function () { if (!S.dead && S.mode !== 'ending') setPlaque('Level ' + PLAQ[S.k], false); }, 400); }
        S.exitSlide = false; }
      function startExit() { if (S.mode === 'door' || S.mode === 'ending') return; S.path = null; S.steer = null; padRelease(); const k = S.k; SI('exits'); api.stat.max('maze-of-meh.maxLevel', k + 1); earn(7.5, 'exit', true);
        if (k === 7) { startEnding(); return; }
        S.mode = 'door'; S.modeUntil = api.now() + 1200; S.doorT = 0; sfx('tada'); api.setTimeout(function () { if (!S.dead) sfx('fanfare'); }, 350); api.confetti(); const from = PLAQ[k], to = PLAQ[k + 1];
        sayM(fill(api.line(M + 'exitLevel', { count: ival(SG('exits')) }), { from: from, to: to }), { priority: 1, mood: 'proud' });
        api.setTimeout(function () { if (!S.dead) sayM(LINES.plaque[k + 1], { priority: 1, mood: 'smug' }); }, 3000); setPlaque('Level ' + to, true); tick('Door opened. Behind it: a maze.'); readPocket(false);
        api.setTimeout(finishDoor, 1200); }
      function finishDoor() { if (S.dead || S.mode !== 'door') return; S.k = Math.min(7, S.k + 1); S.mode = 'play'; S.beatKeep = 1; S.arcT = Math.max(S.arcT, FLOOR[S.k] || 0); if (S.k === 4) api.achieve('maze-of-meh.almost8');
        loadLevel(false); if (S.k === 1 || S.k === 3 || S.k === 5) S.sockG = { t0: S.clock + 4 + api.rand() * 5, row: api.randInt(1, Math.max(1, H - 2)), seen: false }; /* rule of three: levels 2, 4, 6 */
      }
      function startEnding() { S.mode = 'ending'; S.modeUntil = api.now() + 9000; const tok = ++S.endTok; S.doorT = 0; const ok = function () { return !S.dead && S.mode === 'ending' && S.endTok === tok; };
        over.classList.add('m-maze-of-meh-overon'); bigTxt.classList.remove('m-maze-of-meh-fold', 'm-maze-of-meh-bigin'); bigTxt.style.opacity = '1'; bigTxt.style.visibility = 'hidden'; bigTxt.textContent = 'YOU HAVE EXITED THE MAZE OF MEH';
        sockEl.classList.remove('m-maze-of-meh-sockgo'); doorEl.classList.remove('m-maze-of-meh-sockgo'); void sockEl.offsetWidth; sockEl.classList.add('m-maze-of-meh-sockgo'); doorEl.classList.add('m-maze-of-meh-sockgo');
        setPlaque('LEVEL 8', true); sfx('tick'); api.setTimeout(function () { /* the sock gets there first; only then does the text drop */
          if (!ok()) return; bigTxt.style.visibility = ''; void bigTxt.offsetWidth; bigTxt.classList.add('m-maze-of-meh-bigin'); sfx('tada'); api.setTimeout(function () { if (ok()) sfx('fanfare'); }, 350);
          sayM(LINES.ending1[0], { priority: 2, mood: 'panic' }); api.achieve('maze-of-meh.level8');
          api.confetti(); api.setTimeout(function () { if (ok()) api.confetti(); }, 400); api.setTimeout(function () { if (ok()) api.confetti(); }, 900); }, 2300); api.setTimeout(function () { if (!ok()) return;
          sayM(L('sockEscort'), { priority: 1, mood: 'confused' }); sfx('pop'); if (api.save.get('sockGl', 0) >= 3) { api.achieve('maze-of-meh.sockescort'); earn(2, 'sock escort', true); }
        }, 4800); api.setTimeout(function () { if (!ok()) return; bigTxt.classList.add('m-maze-of-meh-fold'); sayM(LINES.ending2[0], { priority: 1, mood: 'smug' });
          api.setTimeout(function () { if (ok()) bigTxt.textContent = 'Level 7 1/2 (rounded)'; }, 700); }, 7000); api.setTimeout(function () { if (!ok()) return;
          sfx('bloop'); over.classList.remove('m-maze-of-meh-overon'); sayM(LINES.ending3[0], { priority: 1, mood: 'neutral' }); }, 8200); api.setTimeout(function () { finishEnding(tok); }, 8800); }
      function finishEnding(tok) { if (S.dead || S.mode !== 'ending' || (tok !== undefined && tok !== S.endTok)) return;
        S.endTok++; S.mode = 'play'; S.k = 0; S.loops++; SI('loops'); S.arcT = 0; S.beat = 1; S.ev = {}; S.beatKeep = 0;
        over.classList.remove('m-maze-of-meh-overon'); bigTxt.classList.remove('m-maze-of-meh-fold'); bigTxt.style.visibility = ''; setPlaque('Level ' + PLAQ[0], true); loadLevel(true); S.ev.w3 = S.ev.w4 = 1;
        const pi = el('span', { class: 'm-maze-of-meh-postit' }, 'Level 7 1/2 (rounded)'); head.appendChild(pi); api.setTimeout(function () { pi.classList.add('m-maze-of-meh-peel'); }, 10000);
        api.setTimeout(function () { if (pi.parentNode) pi.parentNode.removeChild(pi); }, 10600); sayM(LINES.endingDiary[0], { priority: 1, mood: 'smug' }); api.setTimeout(function () { if (!S.dead) readPocket(true); }, 3500); }
      /* ---------- director ---------- */
      function evt(name, t, fn) { if (!S.ev[name] && S.arcT >= t) { S.ev[name] = 1; fn(); } }
      function beatOf(t) { let b = 1; for (let q = 0; q < BEATS.length; q++) if (t >= BEATS[q]) b = q + 1; return b; }
      const loopHello = function () { return LINES.loopWelcome[Math.min(Math.max(S.loops, 1), LINES.loopWelcome.length) - 1]; }; /* the welcome gets stranger every lap */
      function reorg() { S.flipUntil = S.clock + 9; sfx('whoosh'); tick(L('reorg'), true); sayM(L('reorg'), { priority: 1, mood: 'confused' }); }
      function review() { /* Performance Review: the relabeller pauses and the player's real numbers come back as a form */
        S.freezeUntil = S.clock + 11; S.revT.forEach(function (t) { api.clearTimeout(t); }); S.revT = []; const real = S.chairs.filter(function (x) { return !x.zero; }).length;
        const rows = [['Direction', 'Several.'], ['Walls bumped', ival(SG('bumps'))], ['Chairs sat', ival(S.sitCount) + '/' + ival(real)], ['Signs trusted', ival(SG('signFollows'))],
          ['Initiative', "'Followed the Arrow'"], ['OVERALL', 'MEETS EXPECTATIONS (SPIRITUALLY)'], ['Next review', 'Tuesday.']];
        rev.textContent = ''; rev.hidden = false; rev.appendChild(el('b', null, LINES.reviewHead[0])); sfx('bell'); tick('Performance review in progress. The maze is on hold. The maze is also reviewing you.');
        rows.forEach(function (r, ix) { S.revT.push(api.setTimeout(function () { if (S.dead) return; rev.appendChild(el('div', { class: ix === 5 ? 'm-maze-of-meh-revok' : null }, r[0] + ': ' + r[1])); stampSfx('stamp');
          }, 1100 * (ix + 1))); }); S.revT.push(api.setTimeout(function () { if (S.dead) return;
          sayM(LINES.reviewThanks[0], { priority: 1, mood: 'proud' }); api.achieve('maze-of-meh.reviewed'); earn(3, 'performance review', true); }, 1100 * rows.length + 1400));
        S.revT.push(api.setTimeout(function () { rev.hidden = true; }, 1100 * rows.length + 6500)); }
      /* punch-up: the surprise party (about 2:20), the ten-minute pin (10:00), and a ticker beat every ~25 s in between. Callbacks read the cast flags other modules leave behind. */
      const fg = function (k) { return !!api.flag.get(k); }; const TIMED = [
        [28, "Management would like to clarify that you are not lost. You are 'in the maze', which is a different category, with its own form.", false],
        [52, "Sandra from Compliance has reviewed the maze and approved it. She approved the idea of it. When told it was a maze she asked for a different one.", true],
        [75, "Please note: the exit is clearly marked. It is marked 'EXIT'. So are both signs, in both directions. This was approved as a 'thorough' approach.", false],
        [122, "The suggestion box reports one suggestion about the walls. It reads 'fewer'. It has been filed under 'more'.", false],
        [160, "Wall 14 has asked how it is doing. It was told 'load-bearing'. It said it knew that. It wanted to hear someone else say it.", false],
        [196, function () { return fg('metToaster') ? L('cbToaster') : "Management has found a slice of toast on the floor. Management has chosen not to ask. The toast has not chosen either."; }, true],
        [232, "Tuesday has not been mentioned. Tuesday would like that on the record, in the way something that is coming likes to go unmentioned.", true],
        [256, function () { return fg('metDennis') ? L('cbDennis') : "A plant has been seen beside the exit. Nobody has asked its name. It has not asked anyone's."; }, false],
        [300, "A wall has been seen leaning on another wall. They are being very quiet about it. Management has decided not to look.", false],
        [356, "Nearly six minutes. Industry standard for a maze is zero. We are, for the first time, over target.", true],
        [382, function () { return fg('metGerald') ? L('cbGerald') : "An enormous potato has been sighted in a corridor with no exit. Management has been told this is a Vice President. Of what, nobody will say."; }, false],
        [406, "SIGN: I have just realised I have never once been right on purpose. I would like to try. Not now.", false],
        [434, function () { return fg('sockSeen') ? L('cbSock') : "Management has been asked not to mention what crosses the maze at seven and a half minutes. Management is not mentioning it. It is a sock."; }, true],
        [480, "Eight minutes. The maze has begun to feel like a host. It has put out a bowl of nothing, and it is almost gone.", false],
        [526, "From here the maze returns to normal. This is not a promise. It is the opposite of a threat.", true],
        [556, "The walls have been told it is the last stretch. They have started fondly remembering things they have not done yet.", false],
        [582, "Ten minutes will occur in 20 seconds. Management has prepared remarks, and a gift. Management does not know what the gift is. It is 'ready'.", true],
        [612, "Back to normal. Please act as though a pin was never presented. It is on your lapel. It is a chair. Please be normal about the chair.", true]
      ]; const seenT = {}; let lastArc = 0; function timedBeats() { if (S.arcT < lastArc - 5) Object.keys(seenT).forEach(function (k) { delete seenT[k]; }); /* a new lap earns the beats again */
        lastArc = S.arcT; if (S.mode !== 'play' && S.mode !== 'sit') return; TIMED.forEach(function (z) { if (seenT[z[0]] || S.arcT < z[0] || S.arcT > z[0] + 45) return;
          seenT[z[0]] = 1; const t = typeof z[1] === 'function' ? z[1]() : z[1]; tick(t, true); if (z[2]) sayM(t, { mood: 'neutral' }); }); }
      function party() { S.recessUntil = S.clock + 8; sfx('tada'); api.confetti(); earn(1, 'cake', false); const p = LINES.party, say = function (t, m) { if (!S.dead) { tick(t, true); if (m) sayM(t, { priority: 1, mood: m }); } };
        say(p[0], 'proud'); api.setTimeout(function () { say(p[1]); }, 3200); api.setTimeout(function () { say(p[2], 'smug'); }, 6200); api.setTimeout(function () { say(L('partyEnd'), 'neutral'); }, 8300); }
      function service() { const cell = curCell(); let c = chairAt(cell);
        if (!c) { c = { cell: cell, x: cell % W, y: (cell / W) | 0, note: null, src: '', sat: false, taken: false, gerald: false, zero: true, idx: -1, predKey: '' }; S.chairs.push(c); }
        c.pin = true; c.note = LINES.pinNote[0]; c.taken = false; c.src = ''; if (S.mode === 'sit' && S.sit && S.sit.chair === c) showCard(c.note, { chair: c, taken: false });
        api.flag.set('maze-of-meh.pinned', true); sfx('fanfare'); api.confetti(); const v = { steps: ival(SG('steps')), bumps: ival(SG('bumps')), sits: ival(SG('sits')) }, sv = LINES.service;
        const say = function (t, m) { if (!S.dead) { tick(t, true); sayM(t, { priority: 1, mood: m }); } };
        say(sv[0], 'proud'); api.setTimeout(function () { say(fill(sv[1], v), 'smug'); }, 3400); api.setTimeout(function () { say(sv[2], 'proud'); }, 7000);
        if (fg('fax-machine.tuesdayMoved')) api.setTimeout(function () { say(L('cbTuesday'), 'confused'); }, 11000); else if (fg('hold-music.tenMinutes')) api.setTimeout(function () { say(L('cbHold'), 'confused'); }, 11000); }
      function director() { const now = api.now(); timedBeats(); if (!S.ev.party && S.arcT >= 140 && S.arcT < 175 && (S.mode === 'play' || S.mode === 'sit') && !S.tw) { S.ev.party = 1; party(); }
        if (!S.ev.service && S.arcT >= 600 && S.arcT < 629 && (S.mode === 'play' || S.mode === 'sit') && !S.tw) { S.ev.service = 1; service(); }
        if (S.arcT >= 630) { S.arcT = 0; S.beat = 1; S.ev = { welcome: 1, stamp: 1, attend: 1, w3: 1, w4: 1 }; sayM(loopHello(), { priority: 1, mood: 'proud' }); }
        evt('hint', .3, function () { if (!S.hintDone && SG('steps') < 200) { hint.hidden = false; api.setTimeout(function () { if (!S.hintDone) { S.hintDone = true; hint.classList.add('m-maze-of-meh-hintoff'); } }, 22000); } });
        evt('welcome', .5, function () { sayM(S.loops >= 1 ? loopHello() : LINES.welcome[mountNo === 0 ? 0 : 1], { priority: 2, mood: 'proud' }); });
        if (!S.ev.reorg && S.arcT >= (api.selftest ? 25 : 100) && S.arcT < 300 && S.mode === 'play' && !S.tw) { S.ev.reorg = 1; reorg(); } /* the mid-session Reorganisation, pulled forward to about 100 s */
        if (!S.ev.review && S.arcT >= (api.selftest ? 30 : 180) && S.arcT < 500 && (S.mode === 'play' || S.mode === 'sit') && !S.tw && S.clock >= S.freezeUntil) { S.ev.review = 1; review(); }
        evt('stamp', 3.5, function () { const e0 = edgeAt[0 * 4 + 1] && edgeAt[1].base === 'wall' ? edgeAt[1] : edgeAt[2]; if (!e0) return;
          S.scripted14 = e0; const lb = setLabel(e0, 'solid', 'LOAD-BEARING', 14); lb.born = S.batchNo; stampSfx('stamp'); sfx('bloop', 50); spawn((e0.mx) * cs + 6, e0.my * cs + 6, 8, '#ff7a6b');
          if (!reachable()) { setLabel(e0, 'suggestive', 'SUGGESTIVE', 14); }
          tick('Wall 14 has been stamped LOAD-BEARING. Wall 14 was not told in advance.'); }); evt('attend', 5, function () { earn(0.1, 'attendance', true); sayM(L('attendance'), { mood: 'proud' }); });
        evt('w3', 8, function () { if (mountNo === 0) sayM(LINES.welcome[2], { priority: 1, mood: 'smug' }); }); evt('w4', 65, function () { sayM(LINES.welcome[3], { mood: 'smug' }); }); const b = beatOf(S.arcT);
        if (b !== S.beat) { const prev = S.beat; S.beat = b; if (b > prev && b >= 2) { /* a progress jump may skip beats: speak the last three in order, 6.5 s apart, so none of the arc is lost */
            const seq = []; for (let q = Math.max(2, prev + 1, b - 2); q <= b; q++) seq.push(q); seq.forEach(function (bb, ix) { api.setTimeout(function () { if (S.dead) return;
                S.lastBeatSay = api.now(); sayM(LINES['beat' + bb][0], { priority: 1, mood: 'neutral' }); if (bb === 7) api.setTimeout(function () { if (!S.dead) { tick(LINES.nameplate[0]); } }, 6000); }, ix * 6500); }); }
          if (b === 2) legend.classList.add('m-maze-of-meh-legendon'); }
        evt('sock', 450, function () { if (S.beat !== 9 || session.sock) return; session.sock = true; api.save.set('sockSeen', true);
          S.sock = { t0: S.clock }; sfx('tick'); tick(L('sock')); sayM(L('sock'), { priority: 1, mood: 'confused' });
          if (api.stat.get('sock-matcher.entered') > 0) api.setTimeout(function () { if (!S.dead) sayM(LINES.sockMatcher[0], { priority: 1, mood: 'neutral' }); }, 5000); });
        evt('b9b', 465, function () { if (S.beat === 9) { sayM(LINES.beat9b[0], { priority: 1, mood: 'proud' }); } });
        evt('b9c', 495, function () { if (S.beat === 9) { sayM(LINES.beat9c[0], { priority: 1, mood: 'neutral' }); } }); }
      /* ---------- update ---------- */
      function update(dt) { const now = api.now(), a = S.av; S.clock += dt; try { if (!S.rm && root.closest && root.closest('.pm-reduce-motion')) S.rm = true; } catch (err) { /* ignore */ }
        if ((S.mode === 'door' || S.mode === 'ending') && now > S.modeUntil + 2000) { if (S.mode === 'door') finishDoor(); else finishEnding(); }
        if (S.mode !== 'ending') S.arcT += dt * (api.selftest ? 10 : 1); /* the fuzz run lives through all ten minutes of the arc */
        director(); if (S.drawOn < 1) S.drawOn = Math.min(1, S.drawOn + dt);
        /* idle */
        if (S.mode !== 'door' && S.mode !== 'ending') { S.idleT += dt; if (S.idleT >= (api.selftest ? 40 : 60) && !S.idle60 && S.clock >= S.idleRetry) { S.idle60 = true; if (S.mode === 'play') startAuto(); }
          let t180 = Infinity; try { if (api.selftest) { if (P.params && P.params.idle >= 200000) t180 = 180; } else t180 = 180; } catch (err) { /* ignore */ }
          if (S.idleT >= t180 && !S.idle180 && (S.mode === 'play' || S.mode === 'sit')) startWaiting(); if (S.idleT < 1) S.idle180 = false;
          if (S.mode === 'play' && S.idleT >= (api.selftest ? 25 : 30) && !S.idle30) { S.idle30 = true; bubble(api.pick(LINES.idleBubble), a.cx, a.cy, 3.5, 'av'); const i30 = L('idle30'); tick(i30, true); sayM(i30, { mood: 'neutral' }); }
          const ia = S.idleSeen || (S.idleSeen = {}), isc = api.selftest ? .4 : 1; /* the idle ladder: a new beat about every 20 seconds of doing nothing */
          [[15, 'idle15', 'neutral'], [45, 'idle45', 'smug'], [80, 'idle80', 'neutral'], [140, 'idle140', 'confused']].forEach(function (z) {
            if (S.idleT < z[0] * isc || ia[z[1]] || (S.mode !== 'play' && S.mode !== 'sit') || (z[1] === 'idle80' && S.mode !== 'sit')) return; ia[z[1]] = 1; const iln = L(z[1]); tick(iln, true);
            if (z[0] === 15) bubble(api.pick(LINES.idleBubble), a.cx, a.cy, 3, 'av'); else sayM(iln, { mood: z[2] }); }); if ((S.mode === 'play' || S.mode === 'sit') && S.idleT >= (api.selftest ? 50 : 100) && !S.idle100) {
            S.idle100 = true; S.signs.forEach(function (sg) { sg.target = Math.atan2(a.cy - sg.cy, a.cx - sg.cx); }); tick(L('idle100')); }
        }
        if (S.flipUntil && S.clock >= S.flipUntil) { S.flipUntil = 0; tick(L('reorgEnd'), true); sayM(L('reorgEnd'), { priority: 1, mood: 'smug' }); sfx('whoosh'); earn(1, 'agility', false); }
        if (S.strike > 0 && S.idleT >= .7 && (S.mode === 'play' || S.mode === 'sit')) { S.strike -= dt; if (S.strike <= 0) lunchOver(); } /* only standing still gets you through */
        if (S.sockG && !S.sockG.seen && S.clock >= S.sockG.t0) { /* a glimpse, with no comment from Management; only the third is mentioned */
          S.sockG.seen = true; const gn = (api.save.get('sockGl', 0) | 0) + 1; api.save.set('sockGl', gn); SI('sockGlimpses');
          if (gn === 3) api.setTimeout(function () { if (!S.dead) sayM(L('sockThird'), { priority: 1, mood: 'confused' }); }, 1800); }
        /* tween and followers */
        if (S.tw) { const t = S.tw; t.t += dt * 1000; const p = Math.min(1, t.t / t.dur), q = p * p * (3 - 2 * p); a.fx = t.fx + (t.tx - t.fx) * q; a.fy = t.fy + (t.ty - t.fy) * q; if (p >= 1) finishTween();
        } else { a.fx = a.cx; a.fy = a.cy; }
        if (S.path && !S.tw && (S.mode === 'play' || S.mode === 'autowalk') && now - S.lastMoveAt >= 130) { while (S.path.length && S.path[0] === curCell()) S.path.shift();
          if (!S.path.length) { S.path = null; if (S.mode === 'autowalk') autoArrive(); }
          else { const dir = dirBetween(curCell(), S.path[0]); if (dir < 0) { if (S.mode === 'autowalk') autoGiveUp(); else S.path = null; }
            else { const r = tryStep(dir, 'path'); if (r === 1) { S.path.shift(); S.autoBlock = 0; }
              else if (r === 0) { const kind = S.pathKind; if (S.mode === 'autowalk') { if (++S.autoBlock > 24) autoGiveUp(); } /* a wall that is merely pending gets a moment to make up its mind */
                else { S.path = null; if (kind === 'click') tick(L('click')); }
              }
            }
          }
        }
        if (S.steer) { if (now - S.steer.last > 4000) S.steer = null; else if (S.steer.dir >= 0 && !S.tw && now - S.lastMoveAt >= 130) tryStep(S.steer.dir, 'steer'); }
        /* relabeller */
        if ((S.mode === 'play' || S.mode === 'autowalk') && now >= S.dizzyUntil && S.clock >= S.freezeUntil) { S.relabelIn -= dt; if (S.relabelIn <= 0) { doBatch(); S.relabelTotal = interval(); S.relabelIn = S.relabelTotal; }
        }
        if (S.tue && S.clock >= S.tue.until) { S.labs.slice().forEach(function (e) { if (e.label && e.label.type === 'tuesday') clearLabel(e); }); S.tue = null; }
        /* sitting and quorum */
        if (S.mode === 'sit' && S.sit) { S.sit.t += dt; if (!S.sit.q && !S.sit.auto && S.sit.t >= (api.selftest ? 20 : 60)) { S.sit.q = true; const n = 6 + Math.floor(api.rand() * 4);
            S.quorum = { n: n, t0: S.clock, leave: 0 }; SI('quorums'); api.achieve('maze-of-meh.quorum'); tick(LINES.quorum[0]); sayM(L('quorum', { n: n }), { priority: 1, mood: 'proud' }); sfx('pop'); }
        }
        if (S.card && S.card.until && S.clock > S.card.until) { const sc2 = S.mode === 'sit' && S.sit ? S.sit.chair : null;
          if (sc2 && sc2.note) showCard(sc2.note, { chair: sc2, taken: sc2.taken, nervous: sc2.src === 'notes3' }); else if (S.mode !== 'sit') hideCard(); else S.card.until = 0; }
        /* signs */
        S.signs.forEach(function (sg) { let tg = S.quorum && !S.quorum.leave ? Math.PI / 2 : sg.target; sg.v += (tg - sg.ang) * 90 * dt; sg.v *= Math.exp(-6 * dt); sg.ang += sg.v * dt;
          if (!isNum(sg.ang)) { sg.ang = tg; sg.v = 0; }
        });
        /* exit slide */
        const ex = S.exitCell % W, ey = (S.exitCell / W) | 0;
        if (Math.abs(S.exPos.x - ex) > .01 || Math.abs(S.exPos.y - ey) > .01) { const f = Math.min(1, dt * 5); S.exPos.x += (ex - S.exPos.x) * f; S.exPos.y += (ey - S.exPos.y) * f; } else { S.exPos.x = ex; S.exPos.y = ey; }
        /* meh batching and particles */
        if (S.pendMeh >= 0.05 && S.clock - S.lastFlush >= 1.5) { api.award(Math.round(S.pendMeh * 100) / 100, 'wandering'); S.pendMeh = 0; S.lastFlush = S.clock; }
        for (let q = S.fx.length - 1; q >= 0; q--) { const f = S.fx[q]; f.life -= dt; f.x += f.vx * dt; f.y += f.vy * dt; f.vy += 160 * dt; if (f.life <= 0) S.fx.splice(q, 1); }
        if (S.quorum && S.quorum.leave && S.clock - S.quorum.leave > .7) S.quorum = null; if (S.sock && S.clock - S.sock.t0 > 8) S.sock = null; if (S.mode === 'door') S.doorT += dt;
        /* head turn */
        let target = a.head; if (S.tw) target = DANG[S.tw.dir]; if (api.now() < S.dizzyUntil) a.head += dt * 18;
        else { const d = ((target - a.head + Math.PI) % (Math.PI * 2) + Math.PI * 2) % (Math.PI * 2) - Math.PI; a.head += d * Math.min(1, dt * 18); }
        paintDom(); }
      function paintDom() { const c = ctxAction(); setT(btnAct, c.label); if (btnAct.disabled === c.on) btnAct.disabled = !c.on; const sitting = S.mode === 'sit'; if (btnStand.disabled === sitting) btnStand.disabled = !sitting;
        const canTake = sitting && !!(S.sit && S.sit.chair.note && !S.sit.chair.taken); if (btnTake.disabled === canTake) btnTake.disabled = !canTake; const real = S.chairs.filter(function (x) { return !x.zero; }).length;
        setT(chipSteps, 'Steps ' + ival(SG('steps'))); setT(chipBumps, 'Bumps ' + ival(SG('bumps')));
        setT(chipChairs, 'Chairs ' + ival(S.sitCount) + '/' + ival(real)); setT(chipLevel, 'Level ' + (S.k + 1) + '/8' + (S.k >= 6 ? ' (we think)' : S.k >= 4 ? ' (approx.)' : ''));
        const frac = clamp(1 - S.relabelIn / (S.relabelTotal || 1), 0, 1); const w = (S.mode === 'sit' || S.mode === 'door' || S.mode === 'ending' ? frac : frac) * 100;
        if (Math.abs((barFill._w || 0) - w) > .5) { barFill._w = w; barFill.style.width = w.toFixed(1) + '%'; }
        const hot = S.relabelIn < 1 && S.mode !== 'sit'; if (barFill._h !== hot) { barFill._h = hot; barFill.classList.toggle('m-maze-of-meh-hot', hot); }
        if (S.card && S.card.chair && S.card.chair.taken && cardSt.textContent === '') cardSt.textContent = '(taken)'; paintPocket(); if (!S.plaqText) setPlaque('Level ' + PLAQ[S.k], false); }
      /* ---------- drawing ---------- */
      function emo(c, ch2, x, y, size) { c.font = size + 'px ' + EMO; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(ch2, x, y); }
      function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
      function seg(c, e, jit) { const j = jit ? 1 : 0; c.beginPath(); c.moveTo(e.x1 * cs + e.jx1 * j, e.y1 * cs + e.jy1 * j); c.lineTo(e.x2 * cs + e.jx2 * j, e.y2 * cs + e.jy2 * j); c.stroke(); }
      function drawBubble(c, text, x, y, color) { c.save(); c.font = 'bold 11px system-ui, sans-serif'; const w = Math.min(cw - 12, c.measureText(text).width + 14), h = 20;
        let bx = clamp(x - w / 2, 2, cw - 14 - w), by = y - h - 8; if (by < 2) by = y + 14; c.fillStyle = color || '#fff'; c.strokeStyle = INKC[S.cuIdx]; c.lineWidth = 1.5; rr(c, bx, by, w, h, 7); c.fill(); c.stroke();
        c.beginPath(); c.moveTo(x - 4, by + h); c.lineTo(x, by + h + 6); c.lineTo(x + 4, by + h); c.closePath(); c.fillStyle = color || '#fff'; c.fill();
        c.fillStyle = INKC[S.cuIdx]; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(text, bx + w / 2, by + h / 2 + 1); c.restore(); }
      function drawTag(c, e) { const lb = e.label; if (!lb || lb.type === 'waiting') return; const age = S.clock - lb.t0; let ss = 1;
        if (!S.rm && age < .22) { const p = age / .22, o = 1 + 2.7 * Math.pow(p - 1, 3) + 1.7 * Math.pow(p - 1, 2); ss = 1.6 - .6 * o; }
        const fs = cs < 34 ? 8 : 9; let lines = lb.lines; /* narrow cells: 'LOAD-BEARING' becomes 'LOAD-' / 'BEARING' so the font can stay legible */
        if (cs < 34) lines = lines.reduce(function (acc, t) { const m = /^(\S+-)(\S+)$/.exec(t); return m ? acc.concat([m[1], m[2]]) : acc.concat([t]); }, []).slice(0, 4);
        c.save(); c.font = 'bold ' + fs + 'px system-ui, sans-serif'; let mw = 0; lines.forEach(function (t) { mw = Math.max(mw, c.measureText(t).width); });
        const tw = mw + 8, th = lines.length * (fs + 1.5) + 4, fit = Math.min(1, cs * 1.8 / tw), grow = Math.max(1, ss); /* the stamp-in scale counts towards the edge clamp */
        const half = tw * fit * grow / 2 + 3, hh = th * fit * grow / 2 + 3; c.translate(clamp(e.mx * cs, half - 6, W * cs + 6 - half), clamp(e.my * cs, hh - 6, H * cs + 6 - hh)); c.rotate(e.rot); c.scale(fit * ss, fit * ss);
        c.globalAlpha = lb.type === 'retired' ? .9 : 1; c.fillStyle = TAGC[lb.type] || '#fff'; c.strokeStyle = INKC[S.cuIdx]; c.lineWidth = 1; rr(c, -tw / 2, -th / 2, tw, th, 2); c.fill(); c.stroke();
        c.fillStyle = INKC[S.cuIdx]; c.textAlign = 'center'; c.textBaseline = 'middle'; lines.forEach(function (t, ix) { c.fillText(t, 0, -th / 2 + 2 + (fs + 1.5) * (ix + .5) + .5); }); c.restore(); }
      function drawSign(c, sg) { const x = (sg.cx + .5) * cs, y = (sg.cy + .5) * cs, R = cs * .5, ink = INKC[S.cuIdx]; c.save(); c.translate(x, y - cs * .06);
        c.strokeStyle = ink; c.lineWidth = 3; c.lineCap = 'round'; c.beginPath(); c.moveTo(0, cs * .34); c.lineTo(0, 0); c.stroke(); for (let s = 0; s < 2; s++) { c.save(); c.rotate(sg.ang + s * Math.PI);
          c.fillStyle = sg.b ? '#7fd6b0' : '#f5b82e'; c.strokeStyle = ink; c.lineWidth = 1.6;
          const h = cs * .125; c.beginPath(); c.moveTo(cs * .06, -h); c.lineTo(R * .72, -h); c.lineTo(R, 0); c.lineTo(R * .72, h); c.lineTo(cs * .06, h); c.closePath(); c.fill(); c.stroke();
          c.translate(R * .44, 0); if (Math.cos(sg.ang + s * Math.PI) < 0) c.rotate(Math.PI);
          c.fillStyle = ink; c.font = 'bold ' + Math.max(6, Math.round(cs * .17)) + 'px "' + (FONTS[S.cuIdx].replace(/"/g, '').split(',')[0]) + '", sans-serif'; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText('EXIT', 0, .5);
          c.restore(); }
        c.restore(); if (S.beat >= 4 && !sg.b) { c.save(); c.font = 'bold 8px system-ui, sans-serif'; c.textAlign = 'center'; c.fillStyle = ink; c.fillText(CONF[Math.min(4, S.signConf)], x, y + cs * .43);
          if (S.beat >= 7) c.fillText('Regional Sign', x, y - cs * .46); else if (S.beat >= 5) c.fillText('Sign has been reviewed', x, y - cs * .46); c.restore();
        } else if (sg.b) { c.save(); c.font = 'bold 8px system-ui, sans-serif'; c.textAlign = 'center'; c.fillStyle = ink; c.fillText('Regional Sign', x, y + cs * .43); c.restore(); }
        if (sg.sweat > S.clock) { c.fillStyle = '#6aa8f0'; emo(c, '💧', x + cs * .26, y - cs * .28 + Math.sin(S.clock * 9) * 2, cs * .22); }
      }
      function draw() { const c = ctx; if (!c || !(cs > 0) || !isNum(cw)) return; const k = S.cuIdx, ink = INKC[k], rm = S.rm; c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, cw, ch); c.save();
        if (S.clock < S.shearUntil && !rm) c.transform(1, 0, .18 * Math.sin(S.clock * 8), 1, -.18 * Math.sin(S.clock * 8) * ch / 2, 0); c.translate(6, 6); c.fillStyle = FLOORC[k]; c.fillRect(-6, -6, cw, ch);
        for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) { if ((x + y) % 2 === 0) { c.fillStyle = 'rgba(127,214,176,.10)'; c.fillRect(x * cs, y * cs, cs, cs); }
          if (S.visited[y * W + x]) { c.fillStyle = 'rgba(127,214,176,.10)'; c.fillRect(x * cs, y * cs, cs, cs); }
        }
        if (S.humUntil > S.clock) { c.fillStyle = 'rgba(185,163,242,' + (.12 + .1 * Math.sin(S.clock * 6)) + ')'; c.fillRect(0, 0, W * cs, H * cs); }
        /* exit glow */
        const exx = (S.exPos.x + .5) * cs, exy = (S.exPos.y + .5) * cs, pulse = .5 + .5 * Math.sin(S.clock * Math.PI * 2 / 1.6); const g = c.createRadialGradient(exx, exy, 2, exx, exy, cs * (.75 + .25 * pulse));
        g.addColorStop(0, 'rgba(245,184,46,.95)'); g.addColorStop(1, 'rgba(245,184,46,0)'); c.fillStyle = g; c.fillRect(exx - cs * 1.1, exy - cs * 1.1, cs * 2.2, cs * 2.2);
        c.fillStyle = '#fff6df'; c.strokeStyle = ink; c.lineWidth = 2; const swing = S.mode === 'door' || S.mode === 'ending' ? Math.min(1, S.doorT / 1.2) : 0, dw = cs * .34 * (1 - swing * .85);
        rr(c, exx - dw / 2, exy - cs * .3, dw, cs * .6, 3); c.fill(); c.stroke(); if (dw > 5) { c.fillStyle = ink; c.beginPath(); c.arc(exx + dw * .25, exy, 1.6, 0, 7); c.fill(); }
        if (!S.dennisSeen || S.exitCell !== goalCell) { emo(c, '🌿', exx - cs * .3, exy + cs * .3, cs * .34); if (!S.dennisSeen) { c.font = 'bold 7px system-ui, sans-serif'; const dw2 = c.measureText('Dennis (Plant)').width + 6;
            c.fillStyle = 'rgba(255,255,255,.88)'; rr(c, exx - cs * .2 - dw2, exy - cs * .44, dw2, 10, 2); c.fill();
            c.fillStyle = ink; c.textAlign = 'right'; c.textBaseline = 'middle'; c.fillText('Dennis (Plant)', exx - cs * .2 - 3, exy - cs * .44 + 5.5); }
        } else emo(c, '🌿', exx - cs * .3, exy + cs * .3, cs * .3); if (S.strike > 0) { /* the exit is at lunch: a sign, a polite queue, and the Stapler on a picket line of one */
          for (let q = 0; q < 5; q++) { const qx = exx - cs * (1 + q * .3), qy = exy + cs * .3, s = cs * .09; c.fillStyle = '#b9a3f2'; c.strokeStyle = ink; c.lineWidth = 1; c.beginPath(); c.moveTo(qx + s * 1.5, qy); c.lineTo(qx - s, qy + s); c.lineTo(qx - s, qy - s); c.closePath(); c.fill(); c.stroke(); }
          emo(c, '📎', exx + cs * .25, exy - cs * .36, cs * .3); }
        /* walls */
        c.lineCap = 'round'; c.lineJoin = 'round'; c.strokeStyle = ink; c.lineWidth = 3; const lim = S.drawOn >= 1 ? 1e9 : Math.floor(S.drawOn * wallEdges.length);
        c.globalAlpha = S.drawOn >= 1 ? 1 : Math.min(1, S.drawOn * 1.5); c.strokeRect(0, 0, W * cs, H * cs); c.globalAlpha = 1; const jit = !rm;
        if (S.waitingAll) { c.setLineDash([2, 5]); c.strokeStyle = '#b9a3f2'; } else if (S.lock) c.lineWidth = 5; c.beginPath(); for (let q = 0; q < wallEdges.length && q < lim; q++) {
          const e = wallEdges[q]; if (e.label && e.label.type !== 'nameonly') continue;
          c.moveTo(e.x1 * cs + (jit ? e.jx1 : 0), e.y1 * cs + (jit ? e.jy1 : 0)); c.lineTo(e.x2 * cs + (jit ? e.jx2 : 0), e.y2 * cs + (jit ? e.jy2 : 0)); }
        c.stroke(); c.setLineDash([]); c.lineWidth = 3; c.strokeStyle = ink; const odd = Math.floor(S.clock) % 2 === 1; for (let q = 0; q < S.labs.length; q++) { const e = S.labs[q], lb = e.label; if (!lb) continue;
          c.save(); c.setLineDash([]); c.globalAlpha = 1; switch (lb.type) {
            case 'suggestive': c.setLineDash([5, 5]); c.strokeStyle = '#8f78d6'; c.globalAlpha = .55 + (rm ? 0 : .12 * Math.sin(S.clock * 3 + e.id)); c.lineWidth = 3; seg(c, e, false);
              if (lb.noted) { c.setLineDash([]); c.globalAlpha = 1; c.strokeStyle = '#3aa37a'; c.lineWidth = 2; c.beginPath(); c.moveTo(e.mx * cs - 4, e.my * cs + 9); c.lineTo(e.mx * cs - 1, e.my * cs + 13); c.lineTo(e.mx * cs + 5, e.my * cs + 6); c.stroke(); } break;
            case 'pending': if (odd) { c.lineWidth = 4; seg(c, e, true); } else { c.setLineDash([2, 5]); c.globalAlpha = .4; seg(c, e, false); }
              c.setLineDash([]); c.globalAlpha = 1; emo(c, '🕒', e.mx * cs, e.my * cs - 10, cs * .26); break; case 'nameonly': c.lineWidth = 3; seg(c, e, true); break;
            case 'waiting': c.setLineDash([2, 5]); c.strokeStyle = '#b9a3f2'; seg(c, e, false); break; case 'tuesday': c.strokeStyle = '#8a8798'; c.lineWidth = 5; seg(c, e, false); break;
            case 'hurt': c.strokeStyle = '#6aa8f0'; c.lineWidth = 5; seg(c, e, false);
              c.fillStyle = '#6aa8f0'; c.beginPath(); c.moveTo(e.mx * cs + 6, e.my * cs + 4); c.quadraticCurveTo(e.mx * cs + 11, e.my * cs + 12, e.mx * cs + 6, e.my * cs + 14); c.quadraticCurveTo(e.mx * cs + 1, e.my * cs + 12, e.mx * cs + 6, e.my * cs + 4); c.fill(); break;
            case 'retired': emo(c, '🎂', e.mx * cs, e.my * cs - 8, cs * .34); break; default: c.lineWidth = 5; seg(c, e, true); c.setLineDash([4, 4]); c.strokeStyle = '#f5b82e'; c.lineWidth = 2.5; seg(c, e, false); }
          c.restore(); }
        if (S.tue && S.clock < S.tue.until) { c.fillStyle = 'rgba(120,115,140,.12)'; c.fillRect((S.tue.mx - 2) * cs, (S.tue.my - 2) * cs, 4 * cs, 4 * cs); }
        if (S.eyes && S.clock < S.eyes.until) emo(c, '👀', S.eyes.e.mx * cs, S.eyes.e.my * cs - 14, cs * .42);
        /* chairs */
        S.chairs.forEach(function (ch2) { const x = (ch2.x + .5) * cs, y = (ch2.y + .5) * cs, n = chairN(ch2); c.fillStyle = 'rgba(43,36,56,.18)'; c.beginPath(); c.ellipse(x, y + cs * .26, cs * .26, cs * .08, 0, 0, 7); c.fill();
          for (let q = 0; q < n; q++) { const ox = n === 1 ? 0 : (q === 0 ? 0 : q === 1 ? 7 : -7), oy = q === 0 ? 0 : -5 * q;
            c.fillStyle = CUSH[k]; c.strokeStyle = ink; c.lineWidth = 1.2; rr(c, x + ox - cs * .2, y + oy - cs * .14, cs * .4, cs * .36, 4); c.fill(); c.stroke(); emo(c, '🪑', x + ox, y + oy, cs * .5); }
          if (ch2.gerald) emo(c, '🥔', x, y - cs * .12, cs * .42); });
        const drawn = []; /* tags go over the chairs; newest first; an older tag whose centre sits within 0.7 cells of one already drawn is skipped */
        for (let q = S.labs.length - 1; q >= 0; q--) { const e = S.labs[q], lb = e.label; if (!lb) continue;
          if (S.clock - lb.t0 > 2 && drawn.some(function (d) { return Math.hypot(d.mx - e.mx, d.my - e.my) * cs < cs * .7; })) continue; drawn.push(e); drawTag(c, e); }
        /* signs */
        S.signs.forEach(function (sg) { if (signVisible(sg)) drawSign(c, sg); });
        /* sock */
        if (S.sock) { const p = (S.clock - S.sock.t0) / 8; emo(c, '🧦', -cs + p * (W + 2) * cs, (Math.floor(H / 2) + .5) * cs + Math.sin(S.clock * 10) * 3, cs * .7); }
        const sg2 = S.sockG; /* glimpse: a sock leans in from the right-hand edge for 1.5 s and leaves */
        if (sg2 && S.clock >= sg2.t0 && S.clock < sg2.t0 + 1.5) emo(c, '🧦', W * cs + cs * .3 - Math.sin((S.clock - sg2.t0) / 1.5 * Math.PI) * cs * .85, (sg2.row + .5) * cs, cs * .6);
        /* quorum */
        if (S.quorum) { const qn = S.quorum, cell = S.sit ? S.sit.chair.cell : curCell(), qx = (cell % W + .5) * cs, qy = (((cell / W) | 0) + .5) * cs; const lp = qn.leave ? Math.min(1, (S.clock - qn.leave) / .6) : 0;
          for (let q = 0; q < qn.n; q++) { const an = q / qn.n * Math.PI * 2 + .3, rad = cs * (.55 + (q % 2) * .12) + lp * cs * 9, s = cs * .1;
            const tx = qx + Math.cos(an) * rad, ty = qy + Math.sin(an) * rad * .8, face = Math.atan2(((S.exitCell / W) | 0) - (cell / W | 0), S.exitCell % W - cell % W);
            c.save(); c.translate(tx, ty); c.rotate(face); c.fillStyle = '#b9a3f2'; c.strokeStyle = ink; c.lineWidth = 1;
            c.beginPath(); c.moveTo(s * 1.5, 0); c.lineTo(-s, s); c.lineTo(-s, -s); c.closePath(); c.fill(); c.stroke(); c.restore(); }
        }
        /* avatar */
        const a = S.av, ax = (a.fx + .5) * cs, hop = S.tw ? Math.sin(Math.min(1, S.tw.t / S.tw.dur) * Math.PI) * 3 : 0; let ay = (a.fy + .5) * cs - hop; const sitting = S.mode === 'sit'; if (sitting) ay += cs * .1;
        let sq = 1; if (S.squashT > S.clock && !rm) sq = .8; c.save(); c.translate(ax, ay); c.rotate(a.head); c.scale(1.2 - (sq - .8), sq);
        const sz = cs * .32; c.fillStyle = '#7fd6b0'; c.strokeStyle = ink; c.lineWidth = 2.5; c.lineJoin = 'round';
        c.beginPath(); c.moveTo(sz * 1.15, 0); c.lineTo(-sz * .85, sz * .9); c.lineTo(-sz * .45, 0); c.lineTo(-sz * .85, -sz * .9); c.closePath(); c.fill(); c.stroke();
        c.fillStyle = '#fff'; c.beginPath(); c.arc(sz * .2, -sz * .3, sz * .22, 0, 7); c.arc(sz * .2, sz * .3, sz * .22, 0, 7); c.fill();
        c.fillStyle = ink; c.beginPath(); c.arc(sz * .28, -sz * .3, sz * .09, 0, 7); c.arc(sz * .28, sz * .3, sz * .09, 0, 7); c.fill(); c.restore(); if (sitting) emo(c, '🎩', ax, ay - cs * .3, cs * .34);
        if (S.mode === 'play' && !S.tw && chairAt(curCell())) drawBubble(c, 'Sit?', ax, ay - cs * .2, '#fff'); if (S.flipUntil > S.clock) drawBubble(c, 'UP / DOWN SWAPPED (REORG)', W * cs / 2, 20, '#ffd9d4');
        /* bubbles and particles */
        S.bub = S.bub.filter(function (b) { return b.until > S.clock; }); S.bub.forEach(function (b) { const bx = b.kind === 'av' ? ax : (b.cx + .5) * cs, by = b.kind === 'av' ? ay - cs * .3 : (b.cy + .5) * cs - cs * .35;
          drawBubble(c, b.text, bx, by, b.kind === 'sign' ? '#fff3c4' : '#fff'); }); if (S.strike > 0) drawBubble(c, 'BACK IN 7 1/2 MINUTES', exx, exy - cs * .45, '#fff3c4');
        S.fx.forEach(function (f) { c.globalAlpha = clamp(f.life / f.max, 0, 1); c.fillStyle = f.col; c.beginPath(); c.arc(f.x - 6, f.y - 6, f.r, 0, 7); c.fill(); }); c.globalAlpha = 1; c.restore(); }
      /* ---------- main loop ---------- */
      function loop(ts) { if (S.dead) return; S.raf = api.requestAnimationFrame(loop); const t = isNum(ts) ? ts : api.now(); let dt = S.last == null ? 0.016 : (t - S.last) / 1000; S.last = t;
        dt = clamp(isNum(dt) ? dt : 0.016, 0, 0.1); update(dt); draw(); }
      loadLevel(true); setPlaque('Level ' + PLAQ[0], false); S.raf = api.requestAnimationFrame(loop); api.setTimeout(function () { try { stage.focus({ preventScroll: true }); } catch (err) { /* ignore */ } }, 0); return {
        destroy() { S.dead = true; padRelease(); savePocket(); }
      }; }
  }); })();

