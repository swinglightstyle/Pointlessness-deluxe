/* POINTLESS module: hold-music */
(function () {
  'use strict';
  const P = window.POINTLESS;

  P.injectCSS(`
.m-hold-music-root{padding:6px} .m-hold-music-root [hidden]{display:none!important} .m-hold-music-desk{container-type:inline-size;position:relative;border:3px solid #2a1f14;border-radius:16px;padding:12px;overflow-x:hidden;color:#2a1f14; background:repeating-linear-gradient(92deg,rgba(0,0,0,.12) 0 2px,transparent 2px 9px),repeating-linear-gradient(88deg,rgba(255,235,200,.07) 0 1px,transparent 1px 14px),repeating-linear-gradient(95deg,rgba(0,0,0,.09) 0 3px,transparent 3px 23px),#7a4e2d; transition:transform 1.4s ease}
.m-hold-music-tilt{transform:rotate(1.5deg)} .m-hold-music-cols{display:grid;grid-template-columns:minmax(0,1fr);gap:14px} @container (min-width:700px){.m-hold-music-cols{grid-template-columns:minmax(300px,5fr) 6fr}}
.m-hold-music-mini{display:none;font:900 .8rem 'Courier New',ui-monospace,monospace;background:#1f2b14;color:#b7e36a;border-radius:6px;padding:3px 8px;align-self:flex-start} .m-hold-music-dim{opacity:.55} .m-hold-music-gold{color:#ffe08a;text-shadow:0 0 12px rgba(255,209,102,.95)} .m-hold-music-over{background:#fff;border:3px solid #2a1f14;border-radius:12px;padding:6px 10px;font-size:.85rem;font-weight:700;display:flex;flex-wrap:wrap;gap:6px;align-items:center;box-shadow:2px 2px 0 #2a1f14} .m-hold-music-over b{color:#8a3a0c}
@container (max-width:699px){.m-hold-music-cols .m-hold-music-right{display:contents}.m-hold-music-cols .m-hold-music-ring{order:-1}.m-hold-music-cols .m-hold-music-staff{order:1}.m-hold-music-phone .m-hold-music-log{min-height:3.4em}.m-hold-music-mini{display:block}} .m-hold-music-right{display:flex;flex-direction:column;gap:14px;min-width:0} .m-hold-music-phone{background:#e0a526;border:3px solid #2a1f14;border-radius:22px 22px 14px 14px;padding:10px;box-shadow:4px 4px 0 #2a1f14;display:flex;flex-direction:column;gap:9px;min-width:0}
.m-hold-music-lcd{background:#1f2b14 repeating-linear-gradient(0deg,rgba(0,0,0,.3) 0 1px,transparent 1px 3px);color:#b7e36a;border:3px solid #2a1f14;border-radius:8px;padding:8px 10px; font-family:'Courier New',ui-monospace,monospace;text-shadow:0 0 6px rgba(183,227,106,.65);animation:m-hold-music-flicker 3.1s infinite} @keyframes m-hold-music-flicker{0%,100%{opacity:1}50%{opacity:.96}52%{opacity:.92}54%{opacity:1}} .m-hold-music-lcdlab{font-size:.68rem;letter-spacing:.12em;opacity:.8}
.m-hold-music-odorow{display:flex;align-items:center;gap:6px;flex-wrap:wrap} .m-hold-music-odo{display:flex;align-items:flex-start;font-size:1.85rem;font-weight:900;line-height:1;height:1em;user-select:none;-webkit-user-select:none} .m-hold-music-odocol{display:block;height:1em;overflow:hidden;width:.64em;text-align:center}
.m-hold-music-odostrip{display:block;transition:transform .4s cubic-bezier(.3,.9,.3,1)} .m-hold-music-odod{display:block;height:1em;line-height:1} .m-hold-music-comma{display:block;width:.22em;text-align:center;line-height:1.15em;align-self:flex-end;transition:opacity .2s}
.m-hold-music-frac{font-size:.9rem;font-weight:900} .m-hold-music-behind{font-size:.7rem;font-weight:900;color:#ffd166} .m-hold-music-lcdrow{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;font-size:.78rem;letter-spacing:.05em;margin-top:5px}
.m-hold-music-status{font-weight:900} .m-hold-music-flash .m-hold-music-status{animation:m-hold-music-blink 1s steps(2) infinite} @keyframes m-hold-music-blink{50%{opacity:.2}}
.m-hold-music-reason{background:#f3e9d2;border:2px solid #2a1f14;border-radius:6px;padding:4px 7px;font-size:.92rem;font-weight:700;line-height:1.25;min-height:3.4em;overflow-wrap:anywhere} .m-hold-music-log{list-style:none;margin:0;padding:6px 8px;background:#fffdf4;border:2px dashed #2a1f14;border-radius:4px;font-family:'Courier New',ui-monospace,monospace;font-size:.68rem;min-height:5.6em;transform:rotate(-.6deg)} .m-hold-music-pad{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;max-width:300px;width:100%;margin:0 auto}
.m-hold-music-key{position:relative;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;min-height:56px;border:3px solid #2a1f14;border-radius:12px;background:#f3e9d2;color:#2a1f14;font:900 1.45rem/1 system-ui,sans-serif;cursor:pointer; box-shadow:0 4px 0 #2a1f14,0 0 calc(var(--g,0)*12px) calc(var(--g,0)*4px) rgba(217,98,43,calc(var(--g,0)*.85))} .m-hold-music-key:active{transform:translateY(3px);box-shadow:0 1px 0 #2a1f14} .m-hold-music-key:hover{background:#fff8e6}
.m-hold-music-keyl{display:block;font-size:.5rem;letter-spacing:.1em;font-weight:700;opacity:.65;margin-top:2px} .m-hold-music-badge{position:absolute;right:4px;bottom:2px;font-size:.58rem;font-weight:900;color:#d9622b} .m-hold-music-pulse{animation:m-hold-music-pulse .2s ease-out}
@keyframes m-hold-music-pulse{0%{box-shadow:0 4px 0 #2a1f14,0 0 0 0 rgba(217,98,43,.9)}100%{box-shadow:0 4px 0 #2a1f14,0 0 0 14px rgba(217,98,43,0)}} .m-hold-music-sticky::after{content:'';position:absolute;inset:0;border-radius:9px;background:#e0a526;opacity:.35;pointer-events:none} .m-hold-music-btnrow{display:flex;flex-wrap:wrap;gap:7px;justify-content:center}
.m-hold-music-btn{min-height:42px;padding:6px 12px;border:3px solid #2a1f14;border-radius:10px;background:#f3e9d2;color:#2a1f14;font:800 .82rem system-ui,sans-serif;cursor:pointer;box-shadow:0 3px 0 #2a1f14} .m-hold-music-btn:active{transform:translateY(2px);box-shadow:0 1px 0 #2a1f14} .m-hold-music-btn[disabled]{opacity:.55;cursor:default}
.m-hold-music-hang{background:#d9622b;color:#fff8e6} .m-hold-music-armed{background:#2a1f14;color:#ffd166} .m-hold-music-speak{background:#8a9a3b;color:#1f2b14;animation:m-hold-music-flashy .5s steps(2) infinite}
@keyframes m-hold-music-flashy{50%{background:#b9cf4a}} .m-hold-music-root button:focus-visible,.m-hold-music-root input:focus-visible,.m-hold-music-root [tabindex]:focus-visible{outline:3px solid #2a1f14;outline-offset:2px} .m-hold-music-cordbox{position:relative;height:150px;border-radius:12px;border:3px solid #2a1f14;background:rgba(42,31,20,.16);overflow:hidden;touch-action:pan-y}
.m-hold-music-svg{position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none} .m-hold-music-handset{position:absolute;width:80px;height:32px;margin:-16px 0 0 -40px;background:#f3e9d2;border:3px solid #2a1f14;border-radius:16px;display:flex;align-items:center;justify-content:center;gap:5px; font:900 .72rem system-ui,sans-serif;cursor:default;touch-action:none;box-shadow:0 3px 0 #2a1f14;user-select:none} .m-hold-music-live{cursor:grab}
.m-hold-music-snap{transition:left .22s cubic-bezier(.3,1.6,.5,1),top .22s cubic-bezier(.3,1.6,.5,1)} .m-hold-music-heart{color:#d9622b;display:inline-block} .m-hold-music-meter{position:absolute;right:8px;top:6px;font:900 .72rem 'Courier New',monospace;background:#f3e9d2;border:2px solid #2a1f14;border-radius:6px;padding:1px 6px}
.m-hold-music-ring{--p:0;padding:6px;border-radius:24px;background:conic-gradient(#d9622b calc(var(--p)*1%),rgba(42,31,20,.28) 0)} .m-hold-music-card{background:#f3e9d2;border:3px solid #2a1f14;border-radius:18px;box-shadow:4px 4px 0 #2a1f14;padding:14px;min-height:300px;display:flex;flex-direction:column;gap:9px;position:relative;overflow:hidden} .m-hold-music-react{font-weight:700;font-size:.95rem;min-height:2.5em;line-height:1.25;color:#8a3a0c}
.m-hold-music-speech{font-size:1.04rem;font-weight:700;line-height:1.35;white-space:pre-wrap;min-height:5.4em;overflow-wrap:anywhere} .m-hold-music-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap} .m-hold-music-opts{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:6px}
.m-hold-music-opt{display:block;width:100%;text-align:left;min-height:42px;padding:8px 12px;border:3px solid #2a1f14;border-radius:10px;background:#fff8e6;color:#2a1f14;font:700 .9rem system-ui,sans-serif;cursor:pointer;box-shadow:0 3px 0 #2a1f14} .m-hold-music-opt:hover{background:#ffe08a} .m-hold-music-opt:active{transform:translateY(2px);box-shadow:0 1px 0 #2a1f14}
.m-hold-music-zero{background:#e8dcc0} .m-hold-music-voice{display:flex;gap:6px} .m-hold-music-voice input{flex:1;min-width:0;min-height:42px;border:3px solid #2a1f14;border-radius:10px;padding:0 10px;font:600 .95rem system-ui,sans-serif;background:#fff}
.m-hold-music-kp{display:flex;gap:6px;align-items:center} .m-hold-music-kpread{flex:1;min-height:42px;display:flex;align-items:center;padding:0 10px;background:#1f2b14;color:#b7e36a;border:3px solid #2a1f14;border-radius:8px;font:900 1.2rem 'Courier New',monospace;letter-spacing:.15em;overflow:hidden} .m-hold-music-hold{--p:0;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent;min-height:76px;border:4px solid #2a1f14;border-radius:50px;font:900 1.1rem system-ui,sans-serif;color:#2a1f14;cursor:pointer;touch-action:none;box-shadow:0 4px 0 #2a1f14; background:conic-gradient(#8a9a3b calc(var(--p)*1%),#f3e9d2 0)}
.m-hold-music-bubble{background:#fff;border:3px solid #2a1f14;border-radius:14px;padding:10px 12px;position:relative;min-height:4em;font-weight:700;overflow-wrap:anywhere} .m-hold-music-bubble small{display:block;font-weight:600;opacity:.75;margin-top:6px} .m-hold-music-stamp{position:absolute;pointer-events:none;right:8px;bottom:6px;border:4px solid #c0392b;color:#c0392b;font-weight:900;letter-spacing:.12em;padding:1px 9px;border-radius:6px;background:rgba(255,255,255,.8);transform:rotate(-9deg);opacity:0;font-size:.95rem}
.m-hold-music-on{opacity:.92;animation:m-hold-music-slam .14s ease-out} @keyframes m-hold-music-slam{from{transform:rotate(-9deg) scale(1.6);opacity:0}to{transform:rotate(-9deg) scale(1);opacity:.92}} .m-hold-music-reels{display:grid;gap:6px}
.m-hold-music-reel{background:#1f2b14;color:#b7e36a;font:700 .95rem 'Courier New',monospace;padding:8px 10px;border:3px solid #2a1f14;border-radius:8px;min-height:2.5em;text-shadow:0 0 5px rgba(183,227,106,.6)} .m-hold-music-stopped{background:#2e4220;box-shadow:inset 0 0 0 2px #b7e36a} .m-hold-music-plaque{background:#e0a526;border:3px solid #2a1f14;border-radius:10px;padding:10px;font-weight:900;text-align:center;letter-spacing:.06em;transform:translateY(46px);opacity:0;transition:transform .5s cubic-bezier(.2,1.2,.4,1),opacity .4s}
.m-hold-music-plaque.m-hold-music-in{transform:none;opacity:1} .m-hold-music-big{min-height:48px;font-size:1rem} .m-hold-music-staff{background:#f3e9d2;border:3px solid #2a1f14;border-radius:14px;box-shadow:4px 4px 0 #2a1f14;padding:10px;display:flex;flex-direction:column;gap:6px}
.m-hold-music-eq{display:flex;align-items:flex-end;gap:4px;height:46px} .m-hold-music-bar{flex:1;height:100%;background:linear-gradient(#d9622b,#e0a526);border-radius:3px 3px 0 0;transform-origin:bottom;transform:scaleY(.08)} .m-hold-music-notes{display:flex;justify-content:space-between;font-size:1.15rem;animation:m-hold-music-drift 5s ease-in-out infinite alternate}
@keyframes m-hold-music-drift{from{transform:translateX(-5px)}to{transform:translateX(5px)}} .m-hold-music-note{display:inline-block;min-width:1em;text-align:center} .m-hold-music-wince{animation:m-hold-music-wob .4s ease-in-out}
@keyframes m-hold-music-wob{25%{transform:rotate(-25deg) scale(.8)}75%{transform:rotate(25deg) scale(.8)}} .m-hold-music-cap{font-size:.82rem;font-weight:700;line-height:1.3} .m-hold-music-volrow{display:flex;align-items:center;gap:8px;font-size:.72rem;font-weight:700}
.m-hold-music-bottom{display:flex;flex-wrap:wrap;gap:12px;align-items:flex-end;margin-top:14px} .m-hold-music-strip{flex:1 1 320px;min-width:0;display:flex;flex-wrap:wrap;align-items:flex-end;gap:8px 6px;padding:62px 8px 8px;background:rgba(243,233,210,.9);border:3px solid #2a1f14;border-radius:12px;box-shadow:4px 4px 0 #2a1f14;animation:m-hold-music-sway 6s ease-in-out infinite alternate} @keyframes m-hold-music-sway{from{transform:translateX(-3px)}to{transform:translateX(3px)}}
.m-hold-music-sign{background:#2a1f14;color:#ffd166;font-size:.62rem;font-weight:900;letter-spacing:.08em;padding:4px 6px;border-radius:5px;max-width:74px;text-align:center} .m-hold-music-slot{position:relative;display:flex;flex-direction:column;align-items:center;width:46px;font-size:1.4rem;line-height:1.1;opacity:.85} .m-hold-music-tag{font-size:.56rem;font-weight:800;line-height:1.1;text-align:center;border-radius:4px;padding:1px 3px;background:#c9bfa3;border:1px solid #2a1f14;overflow-wrap:anywhere;max-width:62px}
.m-hold-music-you{opacity:1;transform:scale(1.15)} .m-hold-music-you .m-hold-music-tag{background:#d9622b;color:#fff8e6} .m-hold-music-lit{opacity:1;filter:drop-shadow(0 0 6px #e0a526)}
.m-hold-music-named .m-hold-music-tag{background:#8a9a3b;color:#1f2b14} .m-hold-music-named .m-hold-music-sbub{left:auto;right:-8px}.m-hold-music-sbub{position:absolute;bottom:100%;left:-40px;width:min(200px,62cqw);background:#fff;border:3px solid #2a1f14;border-radius:10px;padding:5px 8px;font-size:.7rem;font-weight:700;line-height:1.25;margin-bottom:6px;z-index:2;box-shadow:2px 2px 0 #2a1f14;overflow-wrap:anywhere} .m-hold-music-reply{margin-top:3px;font-size:.7rem;min-height:42px;max-width:80px;padding:2px 6px;border:2px solid #2a1f14;border-radius:6px;background:#ffd166;font-weight:800;cursor:pointer}
.m-hold-music-rol{flex:1 1 220px;min-width:0;display:flex;flex-direction:column;gap:6px} .m-hold-music-pile{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:4px} .m-hold-music-pile li{background:#fffdf4;border:2px solid #2a1f14;border-radius:6px;padding:4px 8px;font-size:.74rem;overflow-wrap:anywhere}
.m-hold-music-breathe{animation:m-hold-music-breathe 2.4s ease-in-out infinite} @keyframes m-hold-music-breathe{50%{transform:scale(1.04)}} .m-hold-music-rolfoot{font-size:.7rem;font-weight:800;color:#fff8e6}
.m-hold-music-note{transition:transform .07s} .m-hold-music-bp .m-hold-music-note{transform:scale(1.4)} .m-hold-music-alarm{animation:m-hold-music-alarm .5s steps(2) infinite}
@keyframes m-hold-music-alarm{50%{box-shadow:0 0 0 3px #d9622b,0 0 14px 4px #d9622b;color:#ffd166}} .m-hold-music-ringing{animation:m-hold-music-rattle .22s linear infinite} @keyframes m-hold-music-rattle{25%{transform:rotate(-1.4deg)}75%{transform:rotate(1.4deg)}}
.m-hold-music-ringing .m-hold-music-handset{animation:m-hold-music-jit .1s linear infinite} @keyframes m-hold-music-jit{50%{transform:translate(2px,-2px)}} .m-hold-music-jamming .m-hold-music-slot{animation:m-hold-music-bop .5s ease-in-out infinite alternate}
.m-hold-music-jamming .m-hold-music-slot:nth-child(even){animation-delay:.25s} @keyframes m-hold-music-bop{from{transform:translateY(0) rotate(-6deg)}to{transform:translateY(-8px) rotate(6deg)}} @media (prefers-reduced-motion:reduce){.m-hold-music-root *,.m-hold-music-desk{animation:none!important;transition:none!important} .m-hold-music-tilt{transform:none!important} .m-hold-music-on{opacity:.92}}
.pm-reduce-motion .m-hold-music-root *,.pm-reduce-motion .m-hold-music-desk{animation:none!important;transition:none!important} .pm-reduce-motion .m-hold-music-tilt{transform:none!important} .pm-reduce-motion .m-hold-music-on{opacity:.92}
`, 'css-hold-music');

  /* ----------------------------------------------------------------- achievements */
  P.addAchievements([
    { id: 'hold-music.grand-chancellor', name: 'Grand Chancellor of the Held', desc: 'Stay on hold for 5 minutes without hanging up. Your patience has been noted, notarized, and filed under Patience, Noted.', icon: '☎', reward: 5 },
    { id: 'hold-music.previous-menu', name: 'Lord Warden of the Previous Menu (Which Did Not Exist)', desc: "Press 0 to 'return to the previous menu' 10 times. Each one was prepared specially for you. They would like you to know that.", icon: '📋', reward: 3 },
    { id: 'hold-music.almost-heard', name: 'Knight Commander of Almost Being Heard', desc: 'Get a Human to say a full 7 words before they say please hold. The 8th word was not available at this time.', icon: '👂', reward: 3 },
    { id: 'hold-music.voice-sultan', name: 'High Sultan of Voice Recognition (Disputed)', desc: 'Be misheard 5 different ways. The machine remembers every one and is proud of none.', icon: '🎤', reward: 3 },
    { id: 'hold-music.press-all', name: 'Press All of the Buttons Society, Lifetime Membership', desc: 'Press every key on the keypad, 0 to 9, star and pound, at least once. The society is you, and a toaster.', icon: '🔢', reward: 2 },
    { id: 'hold-music.season-two', name: 'Distinguished Order of Position 1, Rev. 4,000,000', desc: 'Reach caller number 1 for the first time. You are then returned to position 4,000,000 with honor.', icon: '🏅', reward: 5 },
    { id: 'hold-music.pontiff', name: 'Supreme Pontiff of the Seven-and-a-Half Extension', desc: 'Dial extension 7 and a half. It rings in the wall between 7 and 8. Nobody answers. It was perfect.', icon: '🔔', secret: true, reward: 7.5 },
    { id: 'hold-music.marguerite', name: "Dowager Empress of Marguerite's Place in Line", desc: "Idle for 3 minutes. Marguerite will let you go ahead of her. She says it is fine. The record shows it is not fine.", icon: '👤', secret: true, reward: 3 },
    { id: 'hold-music.surcharge', name: 'Emperor of the Keypad, Who Has Been Asked to Stop', desc: 'Press keys so enthusiastically that Billing (Enthusiasm Dept.) opens a file. The file is breathing.', icon: '💥', secret: true, reward: 1 },
    { id: 'hold-music.tangled', name: 'Knight of the Form 27B/6', desc: 'Tangle the cord around the base twice. The cord files its own paperwork.', icon: '📎', secret: true, reward: 2 },
    { id: 'hold-music.eavesdropper', name: 'Honorary Doreen', desc: 'Listen in on a crossed line. Is someone on the line? Yes. It was you.', icon: '🎧', secret: true, reward: 2 },
    { id: 'hold-music.tuesday', name: 'Viceroy-Elect of the Tuesday That Was Briefly Available', desc: "Say 'Tuesday' into the phone. For about a syllable, Tuesday was available. It has asked that this not be mentioned. You have mentioned it.", icon: '📅', secret: true, reward: 7 },
    { id: 'hold-music.recital', name: 'Concertmaster of the Keypad, Retired Before It Began', desc: 'Press 1 through 9, star, 0 and pound, in that order, inside 15 seconds. This is called a recital. The keypad has asked for a program.', icon: '🎹', secret: true, reward: 4.5 },
    { id: 'hold-music.callback', name: 'Chairman Emeritus of the Callback Nobody Requested', desc: 'Accept a callback, hang up as instructed, and answer when Management rings. You were called back by the thing you were holding for. Both of you are still on hold.', icon: '📞', secret: true, reward: 9 }
  ]);

  /* ----------------------------------------------------------------- Management lines */
  const L = {
    open: ['Management has answered. Management would like to stress that this is not the same as helping.', 'Management has been expecting you since caller 3,999,999. He is still expecting.', 'Your call is being held by a committee of one. The committee is having a good day.', 'This call has been answered by a recording. The recording is delighted. It has been rehearsing.', 'Welcome to Customer Experience. Your experience is being scheduled. It has been scheduled for after this one.', 'Your call is important to us. Management tried to explain how, in a meeting. The meeting was called to order and has not left it.', 'Please hold. Management is assisting another caller. The other caller is also Management. It is going well.', 'All of our representatives are assisting other customers. All of our customers are assisting each other. Please hold.', 'Your position is already improving. Please do not watch it do that. It gets shy.'],
    beat: ['Per my previous message: please hold. Per my message before that: please also hold. Per my first message: hello.', 'Lionel has joined the queue ahead of you, carrying a sandwich. He says he is not on hold. He says he is early for lunch.', 'TAP ALONG is now available, and so is the handset. Management is thrilled and has no further details.', 'Please remain on the line. The line has been advised of your remaining. It has taken no position.', 'We are going to transfer you. Do not be alarmed. Be alarmed in a calm way.', 'Management has asked to be reminded that it, too, has a call waiting. It has put itself on speaker so the hold music can be shared.', 'The menu has noticed your habits. It would like to discuss them. It has booked a room.', 'Management has been on hold for nine years. It has written this down, in cursive, in a drawer. It is not asking to be rescued. It is asking whether the song has a second verse.', 'Final approach. Please keep your hands, feet and expectations inside the call at all times.'],
    dial: ['Dial {count} has been filed. The filing cabinet has been advised it is not full. It is full.', 'Dial {count} noted. Dials are tracked. By whom is a Sandra matter.', 'Pressing keys in order is a skill. Pressing them out of order is also a skill. Both have been filed under Other.', 'Every number you press is a number. This has been independently confirmed by a second number.', 'A reminder that this call is recorded for training. You are the trainer. The trainee is a chair. Please be patient with the chair.', 'The estimated wait has not changed. Management considers this a form of stability.', 'Press 0 to return to the previous menu. There was no previous menu. One has been prepared.', 'Your {count} presses have been averaged into a single press. It was a 5. It was always going to be a 5.', 'The keypad has been pressed {count} times in your care. It has asked for a raise. HR is on hold.', 'Holding is a skill, and you are doing it at a professional level. This is not a compliment. It is a classification.', 'No key on this phone is the key to anything. The keys have been asked to stop implying.', 'Our records show {count} presses. Our records were not asked to show anything. They are volunteering.', 'A study of hold times has concluded. It took 11 centuries. Its finding was: yes.', 'A study has found that time spent holding is exactly as long as time spent not holding, but with worse chairs.'],
    zeroes: ['That is ten previous menus. Each was prepared specially for you. Each would like you to know that.'],
    music: ['The music has been upgraded. It now has reverb, which nobody requested and everyone can hear.', 'The music has moved to a single, apologetic note. It would like to be left out of this.', 'Silence has been scheduled for four bars. Please enjoy it responsibly. Please hum only if you have to.', "Someone else's hold music is leaking through the wall. We have informed them. They have turned it up."],
    ping: ['A heartbeat check is in progress. Please be alive for the next seven seconds.', "We noticed you left. That's fine. We held your place for four seconds. It is now Carol's.", 'You have been disconnected. This is not a failure. This is a standing feature of the line.', 'Welcome back. We saved your place. It is where you left it, minus all of it.'],
    tap: ['Rapport with the hold music is now {count} percent. The hold music has not noticed you. It is very busy.', 'You are slightly off the beat. The beat has made a note.', 'Perfect timing. The music wants you to know it did not need the help.', 'A note has winced. It is fine. It has been through worse.', 'Rapport 100. Your tapping has been licensed to the hold music. Royalties are payable in Tuesdays.', 'Rapport is declining. The hold music has moved on. It did not say goodbye.', 'That is a great deal of tapping. We have filed it as a drum solo. The drum has filed it as something else.'],
    cord: ['You have stretched the cord to 7 and a half feet. The cord has filed a grievance. It is coiled and bitter.', 'The cord is now tangled. This is a Form 27B/6 matter. The cord has already filled in its half.', 'The cord has snapped back. It would like to be left alone for a moment. It has been alone for years.', 'The ear has been switched. The hold music is now in your other ear. It is slightly different. It is not.'],
    spam: ['Our system has detected excessive enthusiasm. A surcharge of 1 Meh has been applied, payable to the enthusiasm.', 'Please press your keys one at a time. We are a small system and we have feelings.', 'Billing (Enthusiasm Dept.) has opened a file. The file is breathing.', 'The keypad is now sticky. This is not a feature. It is, however, consistent.', 'The keypad has recovered. It has not forgotten.', '(a very tired sigh)'],
    idle: ["Hello? ... Still there? ... That's fine. We're also here. Both of us.", 'The line has gone quiet. Quiet has been added to your plan. It is free for 30 seconds and then costs the same as noise.', 'We have placed ourselves on hold as well. It is very peaceful here.', 'Welcome back. You were missed by someone. It was us.', 'Marguerite says it is fine. It is not fine. She is now 4,000,000.'],
    cameo: ['You have visited a great many departments. We are pleased to report that this one is the one you are in.', 'Our records show you have been to the elevator. The elevator sends its regards from Floor 4.', 'Our records show you have been very busy elsewhere. We are not hurt. We have updated the wall chart.', 'Sandra from Compliance has listened to this call. Sandra had notes. The notes were laminated.', 'I am also on hold. Different queue. Same potato.', 'Your call has been toasted.', 'toast.'],
    choir: ['That was lovely. We would like to hear it again, but later.', 'The queue would like you to know it saw that.', 'Thank you for pressing that. It meant something. It meant a number.', 'Everyone is here. Nobody is going anywhere. It is the nicest thing about the line.', 'That key has been pressed by someone before. They sent their regards. They are still here.', 'You are being held. It is mutual.', 'Marguerite pressed the same key as you, at the same time. It has been logged as a duet.', 'Lionel has put down his sandwich to listen. The sandwich is also listening.', 'The line is being held by everyone in it. Nobody has volunteered to let go. This is what a bridge is.'],
    end: ['You have reached caller number 1. Your call is important to us. We would like to say it always was. We checked: it was.', 'That was the most meaningful 5 Meh in company history.', 'You have already arrived. Please arrive again.', 'Welcome to Season {count}: Callback. Your call is important to us. We checked.', 'Season 3. The caller ahead of you is you. We recommend not making eye contact. You are very easy to recognize.', 'Congratulations. You have reached the end of the queue. The queue continues.'],
    secret: ['We will not discuss that.', 'That is 7.5 Meh. It is the only amount that was ever going to be correct.', 'You have been hung up on. This is not a redial. It is a redial that has not been told.', 'The number you have dialed is the number you are calling from. The line is busy. It is you.', 'You have been consolidated.'],
    recount: ['Callers ahead of you have been re-counted by hand. The hand has been thanked.', 'A second recount found callers in a drawer marked Miscellaneous. The drawer has been thanked and told to keep going.'],
    human: ['A Human has been detected. This is not a drill. It is an event with a stamp.', 'The Human has said please hold. They are very good at it. They have been trained.', 'Missed Human Incident Report, Form 27B/6, has been filed on your behalf. Form 27B/7 has been requested from 1998, which has not replied.', 'Trevor has never gotten past the comma. Management has asked him to try the comma. He is trying.', 'The Human was also on hold. This is considered normal.'],
    season: ["Season 2: Callback. Please hold. The previous season has been renamed 'Season 1' to avoid confusion.", 'Welcome back, {player}. Your position has been preserved in a manner that is technically correct.', 'You are caller 4,000,000 again. Your history has been kept. It is in a drawer.'],
    transfer: ['Please hold while we transfer you. Please hold while we transfer you. Please hold while we transfer you.', 'Transfers are routed at random by a roulette. The roulette has a license.', 'We transferred you to where you already were. It was a close call.', 'Our transfer policy: if you are transferred and nobody answers, you were transferred correctly.', 'You are being transferred to a department that is not accepting transfers. It will accept you. You are not a transfer. You are a feeling.']
  };
  /* extra banks (read by bags, not registered as categories) */
  const X = {
    ambA: ['This call is being monitored for quality. Quality has been listening since 9:00. It has not said anything. We are encouraged.', 'A tip from Management: pressing a key makes the key feel useful. This is a kindness you can afford.', 'Please enjoy the pauses between menu options. Each is 1.4 seconds, as measured by Doug. Doug retired during the third one and was not replaced.', 'Your hold has been logged under Hold. If you would like it logged under Something Else, please hold.', 'Management would like to say the wait is shorter than it feels. It is exactly as long as it feels. We measured the feeling.', 'Fun fact: 61 percent of callers press 5 within their first minute. You are in the other 39. Management is not worried. Management has written not worried on its hand.', 'This hold is sponsored by the previous hold. The previous hold would like you to know it was longer.', 'Management wishes to reassure you that your call has been answered. It was answered by a recording. The recording was thrilled.'],
    ambB: ['Lionel has finished one half of his sandwich. The other half has been placed in the queue behind you. It would like to be called Lionel Two.', 'A reminder that the line is shorter than it was. It was also longer than it was. We are tracking both.', 'Sandra from Compliance has requested a moment of your time. It has been logged as a moment. It was 4 seconds. Sandra is satisfied.', 'The phone tree has branches. We are told it also has roots, in a building you cannot call. Do not water it.', 'You are doing very well at this. We do not know what this is. You are doing it at the rate we expected, or slower.', 'The hold music has been described by one caller as a smell. The caller has been thanked and moved back four places.', 'We have a policy where a caller held for four minutes receives something. We are working on what. It is a feeling at the moment. We are keeping it warm.', 'If you can hear this, you are the person this message was recorded for. Please do not tell the others. There are no others. Please keep it that way.'],
    ambC: ['The queue has formed a committee. The committee has formed a queue. They are in line to see each other.', 'Please hold while we locate your position. It was here a moment ago. It was last seen near the third ficus.', 'A caller ahead of you has been promoted. A caller behind you has been demoted. You are, we are happy to report, the same.', 'This message was recorded by a woman who is now also on hold with us. She says hello. She says it is not how she remembers it.', 'The Department of Hold has been renamed the Department of Held. Nobody has been told. You are the first. Please act surprised for the others.', 'We have found the end of the line. It is a door. The door has a sign. The sign says Please Hold.', 'We have misplaced the word soon. If you find it, please do not use it. It has had a very busy few years.', 'Tuesday has been sighted at the edge of the queue. It is not approaching. It is being very patient about it. Please hold.'],
    ambD: ['I wanted to say you are the best caller I have had this week. I have had one caller this week. It was also you.', 'Nobody tells you this, but the hold music is for you. It was always for you. They just have to say it is for everyone.', 'If this line ever ends, I would like to say it was a good line. I will probably not be allowed to.', 'The queue is quiet in a way I think is called peace. Please do not look it up. It might not be.', 'Marguerite has been in this queue since before I was recorded. I mention it because she seems to like how you stand in a line.', 'This is the part where Management is supposed to say something about the call being important. Instead: thank you for staying.', 'It has been a pleasure holding with you. I mean this in the legal and the personal sense. Do not tell Sandra.', 'Every number ahead of you was someone. Every number behind you is someone. You are also someone. The odometer has been told.'],
    ambE: ['Welcome back to the line. It is the same line. It is, if anything, slightly more line than before.', 'Please hold. We have already told you this. We are telling you again as a courtesy to the part of you that forgot.', 'Your hold is important to us. We have a new way of saying so. It is the same way, in a different font.', 'Everything is normal. Nothing has happened. The previous eleven minutes did not take place, by order of Management.', 'A reminder: you are caller 4,000,000. Please do not adjust your expectations. They are exactly where we left them.', 'The menu has changed. It is the same menu. It has been changed back. Please listen carefully, as the options have not been changed.', 'You have been here before. The line remembers. The line has asked the walls to stop mentioning it.', 'Welcome back to a queue you already completed. It has been reset to 4,000,000 as a courtesy. It was not a courtesy. It was Policy 7 1/2.', 'Carol has been issued a lanyard. It does not say what she is. It says Carol. This is considered enough.', 'Trevor has been practicing. He has told no one what. He has been seen mouthing the comma.', 'The second time around, the hold music is the same. It is you who has been rearranged.', 'All the callers ahead of you are the same callers as last time. They have gotten no farther. They have gotten quieter, which they count as progress.', 'This is still the queue. We have added nothing. We have, however, dusted.', 'Marguerite has saved your place by not leaving hers. She is calling this loyalty. She is also calling it a pension.'],
    back: ['You have returned. Marguerite asked after you. She asked it quietly. She asks most things quietly.', 'Welcome back. You were gone a long time. The line moved. You did not. It was fine. It was not fine. It was Wednesday.', 'You are back. We have withdrawn the missing person report. The report would like to remain on file as a keepsake.'],
    lionel: ['I have been pressing 4 since lunch. I am not saying it is the wrong key. I am saying it is a very long lunch.', 'I got as far as 3,999,000 once. I could see the number from there. It was smaller. It looked at me.', 'Psst. The man behind you is a lamp. I checked. He has a very good attitude.', 'I have been on hold so long I have read the sandwich. It is not a good sandwich. It is a loyal one.', 'Is it just me, or does the music sound like it is apologizing in advance?', 'My wife says I should hang up. I say I have come so far. I have not moved. But I have come so far.'],
    sur: ['Second surcharge. The first surcharge has been consulted. It is sympathetic but cannot help.', 'Third surcharge. A person from Billing (Enthusiasm Dept.) has come out to look at you. She is holding a clipboard shaped like a sigh.', 'Fourth surcharge. The keypad has asked for a lawyer. The lawyer is also a keypad.', 'Fifth surcharge. We would like to speak to your enthusiasm directly. It has put us on hold.', 'Sixth surcharge. The surcharges have formed a union. Demand number one is fewer of you.', 'Further surcharge. Management has stopped numbering them out of respect. We are numbering them in our hearts.', 'Another surcharge. Billing (Enthusiasm Dept.) has run out of forms and is now writing on its own hand.'],
    nofield: ['There is still no field. Your persistence has been logged under Fields, Absence Of.', 'There is no field. There has never been a field. There was a meadow once. It was rezoned.', 'We looked for the field in the walls, in the cord and in Lionel. Lionel says it is not in the sandwich.', 'Please stop pressing R. R is not the key to anything. It is the key to being asked to stop pressing R.', 'One more and we will have to do something. We have not decided what. Please enjoy the suspense. It is on the house.', 'Fine. There is now a field. It has been there the whole time. We were waiting to see how many R presses you had.'],
    arm: ['You asked to hang up and then thought better of it. Both of you have been noted.', 'Third attempt to hang up. Management has begun to suspect you do not want to leave. Management agrees. This is a first.', 'Fourth attempt. Management does not know what you want. Management has checked itself and does not know that either.'],
    tapSpam: ['The tap button has filed for overtime. Overtime was approved, then denied, then approved again by someone who did not read it. The button is thrilled and suspicious.', 'Your tapping has exceeded the legal limit of rhythm. The beat has been returned to its owner.', 'The hold music asked who is doing that. It was told. It nodded slowly, like a man who knew.', 'That is not tapping. That is a strike. Management respects it and does not recognise it.'],
    ear: ['The ear has been switched five times in six seconds. Neither ear feels wanted. The music has chosen a third ear and is not saying where.', 'Please stop. The ears are talking to each other, and it is about you.'],
    humPre: ['A Human has picked up. They are looking for the part of the script that begins with your name.', 'Somebody answered. The system thinks it is a person. The person thinks it is a system. Both are doing their best.', 'A Human is on the line. They have been told you are important. They are checking.', 'A Human has been located, in the way a lost glove is located: by someone standing very still.'],
    humTail: ['I would stay on the line with you, but I am required to be on this one.', 'I have been instructed to say your call is important. I have also been instructed to say it with feeling. I am doing the feeling now.'],
    react: ['You chose %k%. The menu needs a moment. It was expecting something with fewer feelings in it.', 'Selection %k% accepted. A receipt will be mailed to the person you were before you pressed it.', 'Option %k% has been selected. The previous option was told. It took it well, and by that we mean it said nothing.', 'You have selected %k%. This is the first time it has been selected this week. It asked us to say thank you and not to make it weird.', 'We have received %k%. It is in the system now, where it will sit until the system is needed.', 'Thank you. %k% has been routed to a person who is not here. They have been sent a very warm silence.', 'You chose %k% with your finger. We would have chosen it with a committee. We are a little jealous.'],
    bad: ['%k% is not on this menu. It is on the next one, which has not been built yet. It is being built around you.', 'No such option: %k%. There was one, briefly. It left to open a sandwich shop.', 'That key was pressed with enormous confidence and no menu. Management has reviewed the footage. It was beautiful.', 'We did not offer %k%. We are not offended. We are formally noting that it happened.'],
    not5: ['Please press 5. It is the middle key. Everyone else has found it. Some of them are in your queue.', 'That was a key. It was not 5. Five is the one with J, K and L on it. It has been waiting.', 'We will accept 5. We will also accept 5. Please press 5.'],
    timeout: ['I am sorry, I did not hear that. It may have been a silence. It was a very good one.', 'I did not get a response. I will interpret that as thoughtfulness and read the menu again, thoughtfully.', "I'm having trouble hearing you. This may be because I do not have ears. I'll read the menu again."]
  };
  /* the update: the Reorganization, the Callback, the Recital, new cameos and the idle nap */
  const Y = {
    reorg: ['Effective immediately, the keypad has been reorganized. Keys 2 and 8 have swapped places. They were not consulted. They are fine with it in writing.', 'The keypad has been restructured for efficiency. Two keys are now in each other\'s jobs. Both would like it noted that they did not apply.', 'Please note the new layout. It is the old layout, with feelings. Keys 2 and 8 have been seconded to each other for one quarter.', 'A reorganization has occurred. Nobody has been let go. Two keys have been let across. We call this synergy and also a Thursday.', 'Management has moved 2 to where 8 was and 8 to where 2 was. The keyboard has been exempted. The keyboard has not been told.'],
    reorg2: ['The reorganization has been reorganized. It is the same reorganization. It has been renamed Last Time.', 'Keys 2 and 8 are swapping again. They have a system now. It involves a handshake you cannot see.'],
    unreorg: ['The keypad has been restored. Keys 2 and 8 are back where they were, with experience. Key 8 has asked to be addressed as Senior.', 'The reorganization has concluded. The results are the same as before, but now documented.', 'Layout restored. A report on the reorganization has been written. The report recommends a reorganization.'],
    stapler: 'The Stapler has objected to the reorganization. The objection has been stapled to the reorganization. Procedurally, this is a merger.',
    cb: ['We are experiencing a high volume of you. We can offer a callback. A callback is when we call, and you are called. Please decide within 12 seconds.', 'The callback offer has been withdrawn. It has been returned to the shelf, where it will wait for someone braver.', 'Wonderful. To be called back you will need to hang up. We cannot call a line that is in use. We are told this is how lines work.', 'Dial tone. Please do not touch anything. We are about to call you.', 'Your phone is ringing. It is us. Please answer it. We are very nervous about this.', 'Hello, this is Management, returning your call. You were holding for us. We have been holding for you. Please accept our apology for the wait, which was yours.', 'You have been called back. Your place in line has been kept, because you were the one keeping it. Carol was not told.', 'You called us as we were calling you. The line was busy. It was us. We have agreed not to speak of it.', 'Thank you for returning my call. You are caller 4,000,000. Please hold.'],
    recital: ['That was every key on the phone, in order, without a mistake. Under the Telephone Act this is a recital. Management is applauding with what it has.', 'The keypad would like to thank its teachers. The keypad had no teachers. The keypad would like to thank the idea of teachers.', 'You have played the whole keypad. Billing (Enthusiasm Dept.) was told. It says this one is allowed.'],
    dennis: ['Dennis (Plant) has noticed you are idle. He has been idle since 2019. He is thriving. These may be related.', 'A plant somewhere in the building has noticed you are idle. It has not said anything. It has not needed to.'],
    nap: 'The callers in the queue have fallen asleep in solidarity. Lionel is asleep with his eyes open, which is how he does lunch.',
    cam: ['The Fax Machine has sent a fax to this call. It reads Please Hold. The Fax Machine has also received it. They are on speaking terms.', 'The Missing Sock called while you were on hold. It said it was fine and on a journey. It would not say where. It asked after the other one.', 'Our records show you have waited for it before. It is also on hold. It has been waiting for you to wait for it, in a different queue.', 'Dennis (Plant) was informed that you are on hold. Dennis has never been on hold. Dennis has never called anyone. Dennis is considered a success.']
  };
  Y.cbMiss = 'The phone has stopped ringing. Management let it ring for 15 seconds, which is a long time to be nervous. Please press REDIAL to be somebody\'s problem again.';
  Y.cbTalk = ['The phone is answered. Someone on the other end is breathing, carefully, as if reading it off a card.', 'Hello? Oh. Hello. You picked up. I had a first line prepared and it was not this.', 'This is Management. It says so on my badge. I am also nervous, if that helps. Does that help?', 'Neither of us has done this before. I have a script. It says to say thank you for holding.'];
  P.addLines('m:hold-music:open', L.open);
  const SV = { intro: 'Please stay on the line to complete a short survey about whether you stayed on the line.', q: ['Question 1 of 3. How would you rate your hold?', 'Question 2 of 3. Would you recommend this hold to a friend?', 'Question 3 of 3. In your own words, please say anything. It will be forwarded.'], rate: ['Held', 'Holding', 'Hold', 'Hold but louder', 'Held (completed)'], r1: 'You rated your hold: %r%. It has been averaged with every rating ever given. The average is Hold.', r1n: 'No rating given. That has been recorded as a rating.', friend: 'Your friend has been placed in the queue behind you. They were not consulted. They are already holding.', q2n: 'No answer given. Management has taken it as a yes. ', said: "You said '%raw%'. It has been forwarded to Nothing. Nothing has acknowledged receipt.", done: 'Thank you for completing a survey about completing a survey. Please hold while we disconnect you.' };
  P.addLines('m:hold-music:transfer', L.transfer);
  Object.keys(L).forEach(function (k) { if (k !== 'open' && k !== 'transfer') P.addLines('m:hold-music:' + k, L[k]); });

  /* ----------------------------------------------------------------- IVR text (module tokens are %name%) */
  const SENTENCE = ['Hello,', 'thank', 'you', 'for', 'calling', 'Customer', 'Experience,', 'my', 'name', 'is', 'Trevor,', 'how', 'can', 'I', 'help', 'you', 'today?'];
  const WORDS = [1, 2, 3, 5, 7, 9, 12, 16];
  const PICK_AT = [40, 105, 170, 255, 300, 370, 440, 505];
  const BEAT_AT = [0, 30, 60, 120, 180, 240, 300, 390, 450, 540];
  const ANCH_A = [[0, 4000000], [30, 3999985], [60, 3999950], [120, 3999850], [180, 3999700], [240, 3999450], [299, 3999100]];
  const ANCH_B = [[300, 4000300], [390, 3999200], [450, 3997500], [540, 3997000]];
  const GREET = ['Thank you for calling. Your position in the queue is 4,000,000. It is a number, and we stand by it.'];
  const MAIN_SAYS = [ [2, 'Please listen carefully, as our menu options have changed. They changed just now. You were here.'], [2, 'To hear these options in a different order, press 4. To hear them in the same order, press 4 again, which we will treat as a new request.', '4'], [3, 'Press 9 for options you have already heard. Press 9 again for the same options in a calmer voice.', '9'], [3, 'To speak with a representative, press 6. To speak with the person who designed this menu, press 7. They have asked not to be reached.', '67'], [5, "If you know your party's extension, press it now. If you do not know your party, press nothing and become a mystery."], [2, 'Our menu options have not changed. Please listen carefully anyway.'], [2, 'Welcome to the main menu. You have been here. The main menu remembers you fondly and without details.'], [6, 'This menu has been recorded in a calm voice. The voice has asked to be left out of it.'], [8, 'Press 0 to return to the previous menu you have not yet visited.']];
  const MAIN_B1 = 'Please listen carefully. Our menu is available in English. It is also available in English.';
  const REACT_GENERIC = ['You have selected %k%. %k% has been noted. It is in a drawer.', 'Thank you. That option has been selected. It was not available. We selected it anyway.', 'You pressed %k%. We heard %k%. These were different. We went with the first.', 'Option %k% is very popular. You are the only person who has chosen it.', 'Option %k% has been selected on your behalf. You were consulted on the way out.', 'Thank you for your selection. It has been placed behind your previous selection, who is also still thinking.', 'Excellent choice. This is the only sentence we have for this moment. We have been saving it.', 'Press %k% noted. Press %k% again for the same note in a calmer voice.', 'We are sorry. That option has been selected by someone else. We have asked them to share.', 'You have chosen %k%. Sandra from Compliance has reviewed this. Sandra approved it in a margin.'].concat(X.react); const BAD_KEY = ['Press %k% is not an option. We admire the confidence.', 'We did not offer %k%. We are touched that you did.', '%k% is not on this menu. It is on a different menu. That menu is on hold.', 'That key exists. It is not for this. Thank you for trying it on our behalf.'].concat(X.bad); const NOT_5 = ['Please press 5 to acknowledge. 5 is the key below 2 and next to 4. It is very acknowledgeable.', 'That was not 5. We will wait for 5. We have time. It is mostly afternoon.'].concat(X.not5); const TIMEOUT = ["I didn't catch that. I did bring a net. It is a small net.", "Sorry, I didn't catch that. Neither did the machine behind me. It is listening harder.", 'I did not hear a selection. I did hear a selection waiting to happen. I will read the menu again.'].concat(X.timeout); const HOLD_TIGHT = ['Please continue to hold. You were holding. You stopped.', 'You are holding. This has been entered under Holding.', 'That was less than three seconds. We have rounded it up to three, out of pity.'];
  const SHOUT = 'Please do not shout. The telephone is right here.';
  const COURTESY = 'Thank you for your courtesy. It has been noted and will not be used.';
  const EMPTY_SAY = 'You said nothing. We have forwarded it to Nothing.';
  const ECHO = "You said '%raw%'. We heard that. We are as surprised as you.";
  const LOUD_NOTHING = "Did you say 'a very loud nothing'? Please say yes or no. You said something. We heard a very loud nothing.";
  const CONFIRM = "Did you say '%h%'? Please say yes or no.";
  const CONFIRM_REACT = "You said '%raw%'. That is also what we heard.";
  const VOICE_KEY = 'Please say it. Do not press it.';
  const VOICE_SKIP = 'Skipping voice. Voice has taken it personally.';
  const TRANSFER_KEY = 'Please hold while we transfer you. Press star to spin it again.';
  const HEARD = ['Reptile Talk Fest', 'Rapid Sentiment Tip', 'A Pep Rally Toothpaste', 'Wrap Presents At Eve', 'Reprieve Of Tuesday', 'Wrap A Presentation Tip', 'Repressed Tentacle Ahead'];
  const PREV_LABELS = ['Menu 7 1/2', 'Menu 12B', 'Menu Previous (New)', 'Menu 3 (Revised)', 'Menu 0.5', 'Menu 14 (Annex)', 'Menu 4 Bis', 'Menu Alpha-7', 'Menu Previous (Previous)', 'Menu Six-ish', 'Menu 2 (Tuesday Edition)', 'Menu 9 Prime'];
  const PREV_SAY = ['Welcome to %label%. This is the previous menu. It was prepared for you just now, and it would like you to know that.', 'You have returned to %label%. You were never here. We have made it look like you were.', 'This is %label%, the menu you were on before. It did not exist until you left it.', '%label% has been assembled from the parts of the menu you just heard. Please enjoy it responsibly.', 'Returning you to %label%. It is the previous menu. It is also the next one. Nobody checked.'];
  const CLAUSES = ['in a way we are still drafting', 'in a way our lawyers have asked us not to describe', 'in the fourteenth way', 'in a way that was approved by Sandra in a margin', 'in the way a door is important to a wall', 'to the extent legally required, and also personally', 'in a way we have stopped trying to measure', 'in a way that is, honestly, the only way left'];
  const RECORD = ['This call may be recorded for training purposes. The training is for the recording.', 'This call may be recorded by Sandra from Compliance. Sandra has already listened. She had notes.', 'This call is being recorded. The recording is on hold. Both of you are doing well.', 'This call may be recorded for quality purposes. Quality has listened and is not assured.'];
  const POSITION = ['Your position is now %pos%. Do not check again. Checking again increases it.', 'Good news. Your position has improved by 1. Bad news: so has everyone\'s.'];
  const R_FWD = ['You have been moved forward %n% places. A caller ahead of you has been promoted to Caller Ahead Of You, Senior.', 'Moved forward %n%. A caller ahead of you has hung up. We have replaced them with a lamp. The lamp is very patient.', 'Moved forward %n% places. Reason: you pressed it like a person with a plan. We have flagged the plan.', 'Moved forward %n%. A caller ahead of you was so moved by your confidence that he stepped aside and kept stepping.', 'Moved forward %n%. The caller ahead of you was a rumor. The rumor has been removed.', 'Moved forward %n%. A caller ahead of you has learned something and left.', 'Moved forward %n% places. Two callers ahead of you have discovered each other and will be some time.', 'Callers ahead of you have been consolidated into a single, larger caller. You have moved forward %n%.', 'Moved forward %n%. A caller ahead of you was promoted out of the queue. He is now Customer Experience.', 'Moved forward %n% places. The caller ahead of you gave up and became a notary.', 'Moved forward %n%. Three callers ahead of you were found to be the same caller. He has been informed.', 'Moved forward %n%. A caller ahead of you has been reclassified as weather.', 'Moved forward %n%. A caller ahead of you went to check the number. He is still checking. The number is fine.', 'Moved forward %n%. A caller ahead of you was invited to join a committee and was not seen again, as is customary.', 'Moved forward %n% places. The caller ahead of you was recounted and found to be a coat.', 'Moved forward %n%. A caller ahead of you is learning the ukulele and has stepped aside to practice.', 'Moved forward %n%. Callers ahead of you have swapped places with each other, for tax reasons.'];
  const NOUNS = [[/coat/, 'COAT'], [/lamp/, 'LAMP'], [/ukulele/, 'UKULELE'], [/rumor/, 'RUMOR'], [/weather/, 'WEATHER'], [/notary/, 'NOTARY'], [/committee/, 'COMMITTEE'], [/cabinet/, 'CABINET'], [/desk/, 'DESK'], [/drawer/, 'DRAWER'], [/tax reasons/, 'TAX'], [/doctor/, 'DOCTOR'], [/plan/, 'PLAN'], [/confidence/, 'CONFIDENCE'], [/decision/, 'DECISION'], [/building/, 'BUILDING'], [/promoted/, 'PROMOTION']];
  const R_NOREASON = 'You have been moved forward %n% places. No reason is available. The reason is on hold.';
  const R_BACK = ['You have been moved back %n% places for pressing with confidence.', 'Moved back %n%. You pressed that key as if it were a decision.', 'Moved back %n%, again, with interest. Pressing earlier was noted.', 'Moved back %n% places. A caller has been added ahead of you. The caller is a lamp. The lamp has seniority.', 'Moved back %n%. The caller behind you asked to switch places. You did not say yes. It was assumed.', 'Moved back %n% places for pressing like a person who is going to press again.', 'Moved back %n%. A caller has cut in front of you with a note from a doctor. The note says Tuesday.'];
  const R_RECOUNT = ['Your position has been revised upward by %n%. Callers ahead of you have been re-counted by hand.', 'Recount complete. %n% callers were found under a desk. They have been returned to the queue ahead of you.', 'A recount has added %n% places. The recount was asked to stop. It is thorough.', 'Position revised by %n%. The previous number was from a different building.', 'Recount: %n% more callers were hiding in a filing cabinet. They have been placed ahead of you out of respect for the cabinet.'];
  const BEAT7_RECOUNT = 'Your position has been revised to %pos%. Callers ahead of you have been re-counted by hand.';
  const FRACTION = 'Your position is %pos% and a quarter. The quarter has been rounded for your convenience. It would like a word.';
  const REEL_NAMES = ['Department of Departments', 'Department of Transfers', 'Department of Hold Music', 'Voicemail of Voicemail', 'Window 4', 'Sandra', 'Gerald', 'Billing (Enthusiasm Dept.)', 'Department of Pending', 'Lost Lines (Lost)', 'The Other Lobby', 'Receiving (Sending)'];
  const DESTS = [ { n: 'Department of Departments', t: 'You have reached the Department of Departments. For a department, please hold. For the Department of Departments, you are in it.' }, { n: 'Department of Transfers', t: 'You have reached the Department of Transfers. We transfer you. That is the department. Please hold while we do.' }, { n: 'Department of Hold Music', t: 'You have reached the Department of Hold Music. We are the hold music. We are also on hold. It is very musical.' }, { n: 'Voicemail of Voicemail', t: 'You have reached the Voicemail of Voicemail. Please leave a message after the tone. This is a message. Thank you for leaving it. Please leave a message after the tone.' }, { n: 'Sandra', t: 'You have reached Sandra from Compliance. Sandra is out of the office until the previous Tuesday. Please leave a message in the past.' }, { n: 'Window 4', t: 'You have reached Window 4. Window 4 is a drawing of a window. Please take a number. The number is 4.' }, { n: 'Gerald', t: 'Hello. This is Gerald. I was told someone would transfer me. I have been transferred to you. Please hold.', who: 'Gerald' }, { n: 'Department of Toast', t: '(toast) (toast, warm) (toast that was not asked for)', who: 'The Toaster' }];
  const TRANSFER_SKIP = 'Transfer skipped. It has been spun again at no extra cost. The cost was already extra.';
  const TRANSFER_SHOWN = 'The roulette has been shown to you. It has declined to be shown again.';
  const INTERRUPTED = "Sorry, did someone speak? That's fine. Please hold.";
  const HUMAN_MISSED = 'A Human picked up and said hello to you, then to the line, then to the wall. The wall said nothing. The Human has hung up on the wall.';
  const HOLD_TOO = 'Thank you for- oh no. Please hold.';
  const HOLD_TOO_FAINT = 'Hello? Hello? Is anyone there?';
  const GERALD_YES = 'Hello, this is Gerald, Vice President of Spuds. I am also on hold. Different queue. Same potato. Please hold.';
  const GERALD_NO = 'Mr. G. Potato is not available. He is in a meeting about being a potato. Please hold.';
  const BRENDA = 'Brenda, Window 4. I am mid-sandwich. Please hold. Window 4 is a drawing of a window, so I am not sure how you got through.';
  const HUMAN_TAIL = ['I can help with that. I cannot help with that.', 'I would love to transfer you, but the transfer button is also on hold.', "Hello? Hello? Oh. I'm on hold.", 'That is the whole sentence I am permitted at this time.'].concat(X.humTail);
  const HUMAN_S2 = ['Hello again, %player%. Please hold.', 'Welcome back, we missed you. Please hold.', 'Hello again. We have your name on a card. Please hold.', 'You again. That is lovely. Please hold.', 'Hello again, %player%. We kept your card. It has been thinking about you. Please hold.', 'Hello again. Trevor says hi. Trevor has not said hi. This is how we say it for him. Please hold.', 'Oh. It is you. Good. We were just about to ask someone else to hold. Please hold.'];
  const SPEAK_OK = 'You spoke. The Human heard. The Human has not said so.';
  const SPEAK_NONE = 'Nobody spoke to the Human. The Human noticed.';
  const PING_Q = { any: 'Are you still there? Please press any key to prove it. Not that one.', k5: 'Are you still there? Please press exactly 5.', k7: 'Are you still there? Please press the key below 4.',
    voice: "Are you still there? Please say 'still here'.", hash: 'Are you still there? Please hold the pound key for two seconds. Think of it as a handshake.',
    star: 'Are you still there? Please press star, then pound, in that order. The order is important. It is the only thing that is.' };
  const PING_WRONG = ['Not that one.', 'That was a different key. We will allow it. We will not enjoy it.', 'Close. We are marking it as close.', 'That is a key. It is not the key. We have decided to be sad about it later.', 'Almost. Nobody has ever been this almost.', 'Not that one. Not that one either. You are being very consistent about it.'];
  const PING_OK = ['Thank you for confirming. You are still there. This has been entered under Still There.', 'Confirmed. You are here. We are also here. This is a good start to a long afternoon.', 'You are still there. We have written that down twice, in case of Tuesday.', 'Confirmed. You are alive and present. We will not be charging for this. It would feel wrong.', 'You are still there. We were worried. We have a form for worry. It is in the other queue.', 'Presence verified. A small bell rang in an office you will never see. A man looked up, then down.', 'Confirmed. You are still there. We were prepared for a different answer. We have kept the speech.', 'You are here. The line has been told. The line was in the next room and came when called.', 'Still there: confirmed. Your presence has been countersigned by a lamp.'];
  const REDIAL_GREET = 'Welcome back. You are caller %pos%. Carol is behind you. Carol sends her regards.';
  const PITY = 'We have noticed this is the second time. Carol has given your place back. She says it is fine. It is a little bit fine.';
  const HANG_ARM = 'Are you sure you want to hang up? Your position will be given to a stranger. She is, I\'m told, thrilled.';
  const DIAL_SIGH = ['Dial tone. Press REDIAL to be somebody\'s problem again.', 'Dial tone. The keypad has gone home. The REDIAL button has not.', 'That key does nothing here. It did it with great sincerity.', 'Dial tone. Somewhere a stranger has moved up one place because you left. She does not know your name. She is whispering thank you to a wall.'];
  const SPAM_IVR = ['Please press your keys one at a time. We are a small system and we have feelings.', 'Our system has detected excessive enthusiasm. A surcharge of 1 Meh has been applied, payable to the enthusiasm.', 'Please hold your enthusiasm. It will be returned at the end of the call.', 'You are pressing as though the keys are on fire. The keys are not on fire. We have checked. We are checking again.', 'Please slow down. The phone tree is only a tree, and you are a very fast wind.', 'Easy. The buttons are not going anywhere. It is the one thing in the building we can promise.'];
  const MARG = { intro: "Hello? Are you in the queue? I'm ahead of you. I'm Marguerite. I've been here since a Tuesday.", story: ['I called on a Tuesday to ask about a sandwich. I was number 9.', 'They said please hold. I held. A nice man named Trevor took my number and gave me a different one.', 'Anyway, it has been a long Tuesday. It is nice to have someone behind me.'],
    go: "You go ahead. I've been here a long time. It's fine.", trevor: 'Trevor? He has never gotten past the comma.', choir: 'I used to think the number would end. Now I think the number is just company.', s2: 'I waited for you. It was not long. It was a Tuesday.' };
  const CROSS = ['-no, the sandwiches cannot be rescheduled, Doreen. That is what makes them lunch.', '-well, if lunch is a state of mind, then mine is in Accounts.', '-I am not saying the tuna is the problem. I am saying the tuna has had a long week.', '-Doreen. DOREEN. Is someone on the line?'];
  const CROSS_ANNOUNCE = 'Crossed line detected. You are hearing two people argue about whether Tuesday counts as a weekend. It does not. It has been asked to stop.';
  const EXT_RING = 'You have dialed extension 7 and a half. It is in the wall between 7 and 8. It rings. Nobody picks up. It is the nicest silence on the line.';
  const YOURSELF = ['You have dialed 4,000,000. That is your own position. You are being connected to yourself.', 'You are now behind yourself in the queue. The number is 4,000,001. You are still in front.', 'You have been consolidated.'];
  const FINAL_APPROACH = 'Final approach. Please hold. You are now in the final stretch of a very long stretch.';
  const FIN_REPLIES = ['Certainly. I will transfer you to a manager. The manager is the person you are talking to. Congratulations. Please hold.', 'That is fine. That is what everyone says at this point. I have written down forgot as the reason for your call. It is the only reason we have ever had.', 'That is the nicest thing anyone has said to me on this line. I am going to put you on hold now. I mean it as a gift.'];
  const THREE_REACT = 'LONG SERVICE: 3 minutes on hold, plus 20 seconds to find the Pin. The Pin is on hold.';
  const THREE_SAY = 'Three minutes on hold, plus 20 seconds for Management to find the pin. Under Policy 7 1/2 this earns you a Long Service Pin, a handshake and a moment of quiet. The quiet is arriving now.';
  const LIONEL_DONE = 'That is it. It is finished. I have nothing left to do now but be in line. It is nicer than I expected.';
  const TEN_SAY = 'Ten minutes. Management prepared a speech. Management has lost the speech. Management will now improvise: thank you.';
  const TEN_GERALD = ['Ten minutes. I once waited nine weeks for a hole in the ground to be ready. It was the best nine weeks of my life. Please hold.', 'Gerald, Vice President of Spuds, was going to say a few words. He is a potato. We are told the words were profound.'];
  const CLER_START = 'Good news. You are now caller number 1. Please hold while we confirm that this is allowed.';
  const CLER_REACT = 'POSITION 1. Please do not touch anything. It is being looked at by a clerk.'; const CLER_PANIC = 'Position 1. Management would like to be the first to congratulate you. The clerk is the first. Management is the second.';
  const CLER_END = 'Correction. Caller number 1 was a clerical error. The clerk has been moved to position 4,000,000 to experience the consequences. He is doing very well.';
  const KEYWORDS = [
    [/\btuesday\b/i, 'tuesday'], [/\bgerald\b/i, 'gerald'], [/\bsandra\b/i, 'sandra'], [/\bdennis\b/i, 'dennis'], [/\btoast(er)?\b/i, 'toast'],
    [/\bstapler\b/i, 'stapler'], [/\bsocks?\b/i, 'sock'], [/\bmarguerite\b/i, 'marguerite'], [/\btrevor\b/i, 'trevor'], [/\blionel\b/i, 'lionel']];
  const KW_SAY = {
    tuesday: 'Tuesday is not available. Tuesday was just available. We are as startled as you. It has been put back.',
    gerald: 'We do not know a Gerald. We have written it down in case we do.',
    geraldMet: 'Mr. G. Potato has been told you said his name. He nodded, in the manner of a potato. The nod has been recorded for training.',
    toast: 'We have noted the word toast. The Toaster has been notified. The Toaster is, as always, warm and available.',
    stapler: 'The Stapler would like it known that it is not on hold. It is on strike. The difference is in the paperwork.',
    sock: 'The Missing Sock has not called. We would have been told. Please keep the line open for it.',
    marguerite: 'Marguerite says hi. She is ahead of you. She says it is a long way to the front and she is enjoying every part.',
    trevor: 'Trevor has never gotten past the comma. He would like you to try the comma. He says it is easier than it looks.',
    lionel: 'Lionel has heard. Lionel says it is a good sandwich. Lionel has not been asked.',
    sandraLead: 'Sandra from Compliance heard her name. She would like to read you something from the terms you did not read: ',
    dennisLead: 'Dennis has no phone and no interest. Management relays his status regardless: '};
  const T_CAP = ['', 'Smooth Jazz (Elevator Grade). Composed by a committee, performed by an apology.', 'Smooth Jazz (Reverb Added Where It Was Not Asked).', 'A Single Note, Apologizing.',
    'Your Own Ringtone, Played Back to You Slightly Disappointed.', "Someone Else's Hold Music, Leaking Through the Wall.", 'Silence, Remastered. The silence has been remastered. You can hear it better.',
    'Your Tapping. Management has licensed it. Royalties are payable in Tuesdays.', 'The Sound of the Queue, Humming Nervously.', 'Smooth Jazz (Elevator Grade), Finally Allowed To Feel Something.'];
  const T_GLYPH = ['', '🎷', '🎵', '🎺', '🎻', '🥁', '·', '🎶', '👂', '🎺'];
  const ELEVATOR_CB = ' This is the same piece they play in the elevator. The elevator sends its regards from Floor 4.';
  const KEYS = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '*', '0', '#'];
  const KEYSUB = { '1': '', '2': 'ABC', '3': 'DEF', '4': 'GHI', '5': 'JKL', '6': 'MNO', '7': 'PQRS', '8': 'TUV', '9': 'WXYZ', '*': '', '0': '', '#': '' };

  /* ----------------------------------------------------------------- the node pool */
  const N = {};
  function nd(id, kind, say, opts, x) { N[id] = Object.assign({ id: id, kind: kind, say: say, opts: (opts || []).map(function (o) { return { k: o[0], t: o[1], to: o[2] }; }) }, x || {}); }
  const ACK = function (to) { return [['5', 'Acknowledge', to]]; };
  nd('eng', 'info', 'You have selected English. It has been selected for you before.', ACK('main'));
  nd('quiet', 'info', 'English, but quieter, has been selected. It sounds exactly the same. It is just less sure of itself.', ACK('main'));
  nd('billing', 'menu', 'You have selected Billing. Billing would like to know if you have considered Shipping. Shipping would like to know the same about Billing.', [['1', 'Being billed', 'billed'], ['2', 'The quiet feeling that you have been billed', 'feeling'], ['3', 'Shipping', 'shipping'], ['4', 'Sales', 'sales']]);
  nd('billed', 'menu', 'You have reached Being Billed. This menu is for people who have been billed. It is also for people who will be.', [['1', 'To dispute the bill', 'acct'], ['2', 'To pay the bill', 'paid'], ['3', 'To be told how much', 'amount'], ['4', 'To be billed for this call', 'callbill']]);
  nd('feeling', 'info', 'The quiet feeling that you have been billed is not a charge. It is a mood. We have noted it.', ACK('main'));
  nd('paid', 'info', 'Your bill has been paid. We would like to thank whoever paid it. We are not sure who that was.', ACK('billing'));
  nd('amount', 'info', 'The amount due is the number you are thinking of, plus tax, minus the tax. Please do not think of a different number. We will know.', ACK('billed'));
  nd('callbill', 'info', 'This call has been billed to this call. The balance is zero and also due.', ACK('main'));
  nd('shipping', 'menu', 'Shipping. For packages that have left, press 1. For packages that have not, press 2. For packages that are thinking about it, press 3.', [['1', 'Packages that have left', 'lost'], ['2', 'Packages that have not', 'returns'], ['3', 'Packages that are thinking about it', 'techdiff']]);
  nd('sales', 'menu', 'Sales is on the line. Sales is asking who is on the other end. It is you, again. Sales is pleased.', [['1', 'To speak to Sales', 'salesinfo'], ['2', 'To sell us something', 'main'], ['3', 'To be sold', 'returns']]);
  nd('salesinfo', 'info', 'Sales has asked us to say it is not a good time, but it is an excellent moment. Sales is holding a pen.', ACK('sales'));
  nd('returns', 'menu', 'Returns of Returns. To return an item, press 1. To return the return, press 2. To return the call, press 3.', [['1', 'Return an item', 'main'], ['2', 'Return the return', 'returns'], ['3', 'Return the call', 'holdsupport']]);
  nd('compliments', 'menu', 'The Compliments department is closed. Press 1 to leave a compliment after the tone. There is no tone.', [['1', 'Leave a compliment', 'complimentinfo'], ['2', 'Complaints about Compliments', 'complaints']]);
  nd('complimentinfo', 'info', 'Your compliment has been left. It will be received on a day that has not been named and returned to sender with thanks.', ACK('main'));
  nd('complaints', 'menu', 'Complaints about Compliments. To complain about a compliment, press 1. To compliment a complaint, press 2.', [['1', 'Complain about a compliment', 'complaints'], ['2', 'Compliment a complaint', 'compliments'], ['3', 'Neither', 'main']]);
  nd('lost', 'menu', 'You have reached Lost Lines. Your line is lost. Press 1 if you found it. Press 2 if it found you.', [['1', 'I found it', 'main'], ['2', 'It found me', 'techdiff'], ['3', 'To leave a compliment about the lost line', 'compliments']]);
  nd('holdsupport', 'menu', 'Hold Support. For help with being on hold, press 1. For help with help, press 2. For hold support support, press 3.', [['1', 'Help with being on hold', 'holdtight'], ['2', 'Help with help', 'holdsupport'], ['3', 'Hold Support Support', 'holdsupport2']]);
  nd('holdsupport2', 'menu', 'You have reached Hold Support Support. We support the people who support hold. They support us back, at a distance.', [['1', 'To support them', 'main'], ['2', 'To be supported', 'holdsupport'], ['3', 'To ask about Tuesday', 'tuesday']]);
  nd('techdiff', 'menu', 'We are experiencing technical difficulties about this menu. This menu has asked not to be pressed.', [['1', 'Press it anyway', 'main'], ['2', 'Leave it alone', 'menuaboutmenu']]);
  nd('menuaboutmenu', 'menu', 'Press 2 for the menu about the menu. You have pressed it. This is the menu about the menu. It is about this.', [['1', 'The menu about the menu about the menu', 'main'], ['2', 'Back', 'techdiff']], { min: 5 });
  nd('tuesday', 'info', 'You have reached Tuesday. Tuesday is not available. Tuesday never is. That is what makes it Tuesday.', ACK('main'));
  nd('keyfatigue', 'menu', 'You have reached Key Fatigue. This queue is inside the other queue. Please hold within your hold.', [['1', 'To rest the keys', 'main'], ['2', 'To be rested', 'holdsupport']]);
  nd('designer', 'info', 'The person who designed this menu is unavailable. They designed it that way, and then they hid.', ACK('main'));
  nd('directory', 'keypad', "If you know your party's extension, enter it now, followed by pound.", [], { to: 'main', result: function (d) {
    if (!d) return 'You entered nothing and became a mystery.';
    if (d.length === 1) return 'Extension ' + d + ' is in the wall. Extension ' + d + ' is not in the wall. Please hold.';
    if (d.length <= 4) return 'Extension ' + d + ' is a person. They are in a meeting about ' + d + '.';
    return 'Extension ' + d + ' was a very long extension. It has returned to its party, who is in Accounts.'; } });
  nd('acct', 'keypad', 'Please enter your account number, followed by pound.', [], { to: 'main', result: function (d) { return 'You entered ' + (d || 'nothing') + '. That is not an account. It is now.'; } });
  nd('rep', 'menu', 'Representatives are unavailable at this time and at most others.', [['1', 'To hold', 'main'], ['2', 'To hold more', 'main'], ['3', 'To hear this again', 'rep']]);
  nd('repvoice', 'voice', 'Please say Representative.', [], { to: 'main', back: 'repvoice' });
  nd('holdtight', 'hold', 'To confirm that you are holding, please hold any key for three seconds.', [], { to: 'main' });
  nd('prevs2', 'info', 'Oh, you came back to this.', ACK('main'));

  /* ----------------------------------------------------------------- module */
  P.registerModule({
    id: 'hold-music',
    title: 'On Hold With Management',
    tagline: 'Your call is important to us. Management is holding it very carefully.',
    icon: '☎',
    category: 'department',
    unlockCost: 0,
    tags: ['phone', 'waiting', 'music', 'menus'],
    mount(root, api) {
      const h = api.el;
      const SPEED = api.selftest ? 20 : 1;
      const clamp = function (v, a, b) { return Math.max(a, Math.min(b, v)); };
      const f = function (n) { return Number.isFinite(n) ? Math.round(n).toLocaleString('en-US') : '4,000,000'; };
      const fill = function (s, o) { return String(s).replace(/%(\w+)%/g, function (m, k) { return o && o[k] != null ? String(o[k]) : ''; }); };
      const mmss = function (s) { const t = Math.max(0, Math.floor(Number.isFinite(s) ? s : 0)); return String(Math.floor(t / 60)).padStart(2, '0') + ':' + String(t % 60).padStart(2, '0'); };
      const clearEl = function (el) { while (el.firstChild) el.removeChild(el.firstChild); };
      function bag(arr) {
        let q = [], last = null;
        return function () {
          if (!q.length) { q = api.shuffle(arr); if (q.length > 1 && q[q.length - 1] === last) { const t = q[0]; q[0] = q[q.length - 1]; q[q.length - 1] = t; } }
          last = q.pop(); return last;
        };
      }
      const bReact = bag(REACT_GENERIC), bBad = bag(BAD_KEY), bNot5 = bag(NOT_5), bTimeout = bag(TIMEOUT), bFwd = bag(R_FWD), bBack = bag(R_BACK), bRecount = bag(R_RECOUNT),
        bRecord = bag(RECORD), bPos = bag(POSITION), bPrevLabel = bag(PREV_LABELS), bPrevSay = bag(PREV_SAY), bWrong = bag(PING_WRONG), bOk = bag(PING_OK), bTail = bag(HUMAN_TAIL),
        bS2 = bag(HUMAN_S2), bSpamIvr = bag(SPAM_IVR), bSigh = bag(DIAL_SIGH), bComm = bag(L.dial), bChoir = bag(L.choir), bSpam = bag([0, 1, 2, 3]),
        bAmb = { a: bag(X.ambA), b: bag(X.ambB), c: bag(X.ambC), d: bag(X.ambD), e: bag(X.ambE) }, bLio = bag(X.lionel), bTapSpam = bag(X.tapSpam.concat([L.tap[6]])), bHum = bag(X.humPre), bReorg = bag(Y.reorg), bUnreorg = bag(Y.unreorg), bRecital = bag(Y.recital),
        bAck = bag(['Acknowledge', 'Acknowledge again', 'Noted', 'I acknowledge receipt of nothing', 'To have been told', 'Fine']), bL1 = bag(['For English', 'For English, as previously offered', 'For English (the other kinds are out)']), bL3 = bag(['For English, again', 'For English, once more, with feeling', 'For the English we were just discussing']);

      const savedRhythm = api.save.get('rhythm', null);
      const S = {
        mode: 'ivr', token: 0, sim: 0, last: api.now(), idleSim: 0, idleFlags: {}, offset: 0, season: 1, call: 1, redials: 0, hangups: 0, callSim: 0, sinceHangup: 0, beatFired: {}, beat: 1,
        tier: 0, step: 0, stepAt: api.now(), stepsTotal: 0, tierSteps: 0, bars: 0, node: null, nodeKey: 0, readAt: 0, reads: 0, depth: 0, history: [], reverse: false, zeroes: 0,
        clauseIdx: 0, interIdx: 0, mt: [], mi: [], typing: null, typeIv: null, speechFull: '', ringEnd: 0, ringTotal: 1, ringKind: '', shown: [], dials: 0, nextComment: api.randInt(3, 4),
        awardIn: api.randInt(3, 5), pressed: {}, buf: [], lastKey: {}, pressTimes: [], stickyUntil: 0, stickyOn: false, spamCool: 0, starRej: 0, sighed: false, hold: null, holdFired: false,
        suppressUntil: 0, extArmed: false, ext: null, ping: null, nextPing: 48, pingFails: 0, pingAlt: 0, pickAt: [], pickIdx: 0, pickups: 0, interruptions: 0, human: null, cards: [], billingCard: false,
        lastHumanWords: '', met: 0, heldToo: false, xfer: null, lastXfer: -999, lastDest: '', toastSeen: false, crossAt: 180, crossDone: false, cross: null, tapOn: false, rapport: 0, licensed: false,
        taps: [], tapTimes: [], tapSpamAt: 0, rhythm: Array.isArray(savedRhythm) ? savedRhythm.filter(function (x) { return Number.isInteger(x) && x >= 0 && x < 16; }).slice(0, 8) : [],
        cordOn: false, hx: 0, hy: 0, base: { x: 60, y: 110 }, boxW: 300, boxH: 150, drag: null, maxStretch: 0, taut: false, tautAt: -99999, orbit: 0, lastAng: null, tangled: false, snapAt: -99999,
        earRight: false, vol: 7, marg: false, margOffer: false, margOfferUntil: 0, margSwapUntil: 0, goAhead: false, bub: {}, lit: 0, carol: false, lanyard: false, fin: null, finishes: Number.isFinite(api.save.get('seasons', 0)) ? Math.max(0, Math.floor(api.save.get('seasons', 0))) : 0,
        heard: (function () { const hv = api.save.get('heard', []); return Array.isArray(hv) ? hv.filter(function (x, i) { return Number.isInteger(x) && x >= 0 && x < 8 && hv.indexOf(x) === i; }) : []; })(),
        noDelta: false, heartR: -1, chancel: false, pressAll: false, voiceTries: 0, lastMain: '', mainVisits: 0, lastZeroLabel: '', relabel1: false, firstZero: false, noReasonAt: -99, posAtDown: 4000000, pityAt: -9999,
        recountDone: false, fracDone: false, fracUntil: 0, behind: false, log: [], hangArmed: false, hangTimer: 0, speakUntil: 0, odoShown: -1, elevatorCb: false, capText: '', crossCap: false,
        mainBag: null, kp: '', tapAnnounced: false, choirAt: 0, youHoldAt: -99999, flashHold: false, seasonLabel: '', lastTierSay: 0, ringPct: -1, holdPct: -1, statusTxt: '', etaTxt: '', timerTxt: '', cameoDone: false, goAheadDone: false, margTrevor: false
      };
      Object.assign(S, { lastSayAt: 0, nextAmb: 12, concert: false, tipDone: false, reasonSeen: false, total: 0, surN: 0, noField: 0, gift: 0, armCount: 0, earTimes: [], lionelAt: -999, lionelDone: false, threeDone: false, tenDone: false, clerAt: 235, clerUntil: 0, clerDone: false, cbDone: false, cbTalk: 0, youSaid: false, noun: '', reorg: 0, cbAt: 130, cbUntil: 0, cbDown: false, cbRing: false, scale: 0, scaleT: 0, nap: false, rap50: false, rapHi: false });
      const U = {};
      root.classList.add('m-hold-music-root');

      /* ------------------------------------------------------------- build the UI */
      function buildUI() {
        U.odo = []; U.commas = [];
        const odo = h('div', { class: 'm-hold-music-odo', role: 'img', 'aria-label': 'Queue position' });
        for (let i = 0; i < 7; i++) {
          const strip = h('span', { class: 'm-hold-music-odostrip' });
          for (let d = 0; d < 10; d++) strip.appendChild(h('span', { class: 'm-hold-music-odod', text: String(d) }));
          const col = h('span', { class: 'm-hold-music-odocol', 'aria-hidden': 'true' }, strip);
          strip.style.transitionDuration = (i === 6 ? 240 : 400) + 'ms';
          strip.style.transitionDelay = (i * 40) + 'ms';
          U.odo.push({ col: col, strip: strip });
          odo.appendChild(col);
          if (i === 0 || i === 3) { const c = h('span', { class: 'm-hold-music-comma', text: ',' }); U.commas.push(c); odo.appendChild(c); }
        }
        U.frac = h('span', { class: 'm-hold-music-frac', 'aria-hidden': 'true', text: '' });
        U.behindTag = h('span', { class: 'm-hold-music-behind', text: '' });
        U.eta = h('div', { class: 'm-hold-music-eta' });
        U.status = h('span', { class: 'm-hold-music-status' });
        U.timer = h('span'); U.callNo = h('span'); U.seasonLab = h('div', { class: 'm-hold-music-lcdlab', text: '' });
        U.lcd = h('div', { class: 'm-hold-music-lcd' },
          h('div', { class: 'm-hold-music-lcdlab', text: 'QUEUE POSITION' }),
          h('div', { class: 'm-hold-music-odorow' }, odo, U.frac, U.behindTag),
          h('div', { class: 'm-hold-music-lcdrow' }, h('span', null, 'ETA '), U.eta),
          h('div', { class: 'm-hold-music-lcdrow' }, U.status, U.timer, U.callNo), U.seasonLab);
        U.reason = h('div', { class: 'm-hold-music-reason', text: 'Queue notes will appear here. They will not help.' });
        U.logEl = h('ul', { class: 'm-hold-music-log', 'aria-hidden': 'true' });
        U.keys = {};
        const pad = h('div', { class: 'm-hold-music-pad', role: 'group', 'aria-label': 'Keypad' });
        KEYS.forEach(function (k) {
          const badge = h('span', { class: 'm-hold-music-badge', 'aria-hidden': 'true' });
          const lab = k === '*' ? 'star' : k === '#' ? 'pound' : (KEYSUB[k] ? k + ' ' + KEYSUB[k] : k);
          const btn = h('button', { type: 'button', class: 'm-hold-music-key', 'aria-label': lab, onclick: function () { onKeyClick(k); }, oncontextmenu: function (e) { e.preventDefault(); },
            onkeydown: function (e) { if (k === '#' && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); if (!e.repeat) startHold('#'); } },
            onkeyup: function (e) { if (k === '#' && (e.key === ' ' || e.key === 'Enter')) { e.preventDefault(); const supp = S.holdFired || api.now() < S.suppressUntil; endHold(); if (!supp) dial('#', 'btn'); } },
            onpointerdown: function () { startHold(k); }, onpointerup: function () { endHold(); }, onpointercancel: function () { endHold(); }, onpointerleave: function () { if (S.hold && !S.holdFired) endHold(); } },
            h('span', { 'aria-hidden': 'true' }, k), badge);
          U.keys[k] = { btn: btn, badge: badge };
          pad.appendChild(btn);
        });
        U.hang = h('button', { type: 'button', class: 'm-hold-music-btn m-hold-music-hang', onclick: function () { armHang(); } }, 'HANG UP');
        U.tap = h('button', { type: 'button', class: 'm-hold-music-btn m-hold-music-dim', 'aria-disabled': 'true', onclick: function () { tap(); } }, 'TAP ALONG (locked)');
        U.speak = h('button', { type: 'button', class: 'm-hold-music-btn m-hold-music-big m-hold-music-speak', hidden: true, onclick: function () { speak(); } }, '☎ SPEAK');
        U.ear = h('button', { type: 'button', class: 'm-hold-music-btn', onclick: function () { shiftEar(); } }, 'Shift Ear');
        U.heartTxt = h('span', { class: 'm-hold-music-heart', 'aria-hidden': 'true', text: '♥ 0' });
        U.handset = h('div', { class: 'm-hold-music-handset', role: 'button', tabindex: '-1', 'aria-label': 'Handset. Arrow keys move it.',
          onpointerdown: dragStart, onpointermove: dragMove, onpointerup: dragEnd, onpointercancel: dragEnd, onkeydown: handsetKey }, U.heartTxt, h('span', { 'aria-hidden': 'true' }, 'EAR L'));
        U.earLab = U.handset.lastChild;
        U.cord = h('path', { d: 'M0 0', fill: 'none', stroke: '#2a1f14', 'stroke-width': '3', 'stroke-linecap': 'round' });
        U.cordShadow = h('path', { d: 'M0 0', fill: 'none', stroke: 'rgba(0,0,0,.35)', 'stroke-width': '3', 'stroke-linecap': 'round', transform: 'translate(0 3)' });
        U.cradle = h('rect', { x: '0', y: '0', width: '84', height: '18', rx: '6', fill: '#b9831c', stroke: '#2a1f14', 'stroke-width': '3' });
        U.knots = [0, 1, 2].map(function () { return h('circle', { r: '6', fill: 'none', stroke: '#2a1f14', 'stroke-width': '3', style: 'display:none' }); });
        U.svg = h('svg', { class: 'm-hold-music-svg', 'aria-hidden': 'true', width: '300', height: '150' }, U.cradle, U.cordShadow, U.cord, U.knots[0], U.knots[1], U.knots[2]);
        U.meter = h('div', { class: 'm-hold-music-meter', hidden: true, text: 'Cord: 0.0 ft' });
        U.cordbox = h('div', { class: 'm-hold-music-cordbox', hidden: true }, U.svg, U.meter, U.handset);
        U.btnrow = h('div', { class: 'm-hold-music-btnrow' }, U.hang, U.tap, U.speak, U.ear);
        U.phone = h('div', { class: 'm-hold-music-phone' }, U.lcd, U.reason, U.logEl, pad, U.btnrow, U.cordbox);

        /* the prompt card */
        U.mini = h('div', { class: 'm-hold-music-mini', 'aria-hidden': 'true' }); U.over = h('div', { class: 'm-hold-music-over', hidden: true });
        U.react = h('div', { class: 'm-hold-music-react', 'aria-live': 'polite' });
        U.speech = h('div', { class: 'm-hold-music-speech', 'aria-hidden': 'true' });
        U.live = h('div', { class: 'm-hold-music-sr', 'aria-live': 'polite' });
        U.extra = h('div', { class: 'm-hold-music-extra' });
        U.input = h('input', { type: 'text', maxlength: 60, 'aria-label': 'Say it', placeholder: 'Say it here', onkeydown: voiceKey });
        U.voiceBox = h('div', { class: 'm-hold-music-voice', hidden: true }, U.input, h('button', { type: 'button', class: 'm-hold-music-btn', onclick: function () { submitVoice(); } }, 'Send'));
        U.kpRead = h('div', { class: 'm-hold-music-kpread', 'aria-live': 'off' });
        U.kpBox = h('div', { class: 'm-hold-music-kp', hidden: true }, U.kpRead, h('button', { type: 'button', class: 'm-hold-music-btn', onclick: function () { dial('#', 'btn'); } }, 'Done (#)'));
        U.holdBtn = h('button', { type: 'button', class: 'm-hold-music-hold', hidden: true, oncontextmenu: function (e) { e.preventDefault(); }, onpointerdown: function () { startHold('hold-btn'); }, onpointerup: function () { endHold(); }, onpointercancel: function () { endHold(); }, onpointerleave: function () { endHold(); },
          onclick: function () { if (S.mode === 'ivr' && !S.holdFired && api.now() >= S.suppressUntil) setReact(HOLD_TIGHT[0]); },
          onkeydown: function (e) { if ((e.key === ' ' || e.key === 'Enter') && !e.repeat) { e.preventDefault(); startHold('hold-btn'); } }, onkeyup: function (e) { if (e.key === ' ' || e.key === 'Enter') endHold(); } }, 'HOLD TIGHT');
        U.opts = h('ul', { class: 'm-hold-music-opts' });
        U.cstamp = h('span', { class: 'm-hold-music-stamp', 'aria-hidden': 'true', text: 'CLERICAL ERROR' });
        U.card = h('div', { class: 'm-hold-music-card', tabindex: '-1', onclick: function () { if (S.mode === 'ping' && S.ping && S.ping.variant === 'any') pingOK(); } },
          U.mini, U.react, U.speech, U.live, U.extra, U.voiceBox, U.kpBox, U.holdBtn, U.opts, U.over, U.cstamp);
        U.ring = h('div', { class: 'm-hold-music-ring' }, U.card);

        /* the staff */
        U.eq = []; U.notes = [];
        const eq = h('div', { class: 'm-hold-music-eq', 'aria-hidden': 'true' });
        for (let i = 0; i < 12; i++) { const b = h('div', { class: 'm-hold-music-bar' }); U.eq.push(b); eq.appendChild(b); }
        U.notesRow = h('div', { class: 'm-hold-music-notes', 'aria-hidden': 'true' });
        for (let i = 0; i < 12; i++) { const n = h('span', { class: 'm-hold-music-note' }); U.notes.push(n); U.notesRow.appendChild(n); }
        U.cap = h('div', { class: 'm-hold-music-cap' });
        U.vol = h('input', { type: 'range', min: 0, max: 10, value: 7, 'aria-label': 'Volume (decorative)', oninput: function () { S.vol = Number(U.vol.value) || 0; paintCaption(); } });
        const staff = h('div', { class: 'm-hold-music-staff' }, eq, U.notesRow, U.cap, h('div', { class: 'm-hold-music-volrow' }, h('span', null, 'Volume'), U.vol));

        /* the queue strip and the rolodex */
        U.slots = [];
        U.live2 = h('div', { class: 'm-hold-music-sr', 'aria-live': 'polite' });
        U.strip = h('div', { class: 'm-hold-music-strip' }, h('div', { class: 'm-hold-music-sign', text: 'FRONT OF LINE (rumored)' }), U.live2);
        for (let i = 0; i < 8; i++) {
          const bub = h('span', { class: 'm-hold-music-sbub', hidden: true });
          const reply = h('button', { type: 'button', class: 'm-hold-music-reply', hidden: true, onclick: function () { margReply(); } }, 'Hi Marguerite');
          const tag = h('span', { class: 'm-hold-music-tag' });
          const gl = h('span', { 'aria-hidden': 'true' }, '👤');
          const slot = h('span', { class: 'm-hold-music-slot' }, bub, gl, tag, reply);
          U.slots.push({ slot: slot, tag: tag, bub: bub, reply: reply, gl: gl });
          U.strip.appendChild(slot);
        }
        U.rolBtn = h('button', { type: 'button', class: 'm-hold-music-btn', hidden: true, 'aria-expanded': 'false', onclick: function () { toggleRol(); } }, 'Humans Met: 0/12 (Helpful: 0)');
        U.pile = h('ul', { class: 'm-hold-music-pile', hidden: true });
        U.rolFoot = h('div', { class: 'm-hold-music-rolfoot', hidden: true });
        const rol = h('div', { class: 'm-hold-music-rol' }, U.rolBtn, U.pile, U.rolFoot);

        U.desk = h('div', { class: 'm-hold-music-desk' },
          h('div', { class: 'm-hold-music-cols' }, U.phone, h('div', { class: 'm-hold-music-right' }, U.ring, staff)),
          h('div', { class: 'm-hold-music-bottom' }, U.strip, rol));
        root.appendChild(U.desk);
      }
      buildUI();

      /* ------------------------------------------------------------- small painters */
      function setReact(t) { U.react.textContent = t || ''; }
      function setStatus(t) { if (t !== S.statusTxt) { S.statusTxt = t; U.status.textContent = t; } }
      function paintOdo(n) {
        n = Number.isFinite(n) ? clamp(Math.round(n), 0, 9999999) : 4000000;
        if (n === S.odoShown) return;
        S.odoShown = n; U.mini.textContent = 'POSITION ' + f(n);
        const s = String(n), len = s.length;
        for (let i = 0; i < 7; i++) {
          const blank = i < 7 - len, d = blank ? 0 : Number(s[i - (7 - len)]);
          U.odo[i].strip.style.transform = 'translateY(' + (-d) + 'em)';
          U.odo[i].col.style.opacity = blank ? '0' : '1';
        }
        U.commas[0].style.opacity = len >= 7 ? '1' : '0';
        U.commas[1].style.opacity = len >= 4 ? '1' : '0';
        U.odo[0].col.parentNode.setAttribute('aria-label', 'Queue position ' + f(n));
      }
      function addLog(t) {
        S.log.push(mmss(S.callSim) + ' ' + t);
        while (S.log.length > 8) S.log.shift();
        clearEl(U.logEl);
        S.log.forEach(function (x) { U.logEl.appendChild(h('li', { text: x })); });
      }
      function setRing(p) {
        const v = Math.round(clamp(p, 0, 100));
        if (v !== S.ringPct) { S.ringPct = v; U.ring.style.setProperty('--p', String(v)); }
      }
      function paintCaption() {
        let t = S.vol === 0 ? 'Playing in your heart.' : (S.crossCap ? 'Two People, Leaking Through the Wall' : (T_CAP[S.tier] || ''));
        if (S.vol !== 0 && !S.crossCap && S.tier === 3 && Math.floor(S.stepsTotal / 256) % 2 === 1) t = 'Pan Flute Interpretation of a Fax.';
        if (S.vol !== 0 && !S.crossCap && S.tier === 1 && S.elevatorCb) t += ELEVATOR_CB;
        if (S.concert && S.vol !== 0 && !S.crossCap) t = 'The Queue (Live, One Night Only, Same Night)';
        if (t !== S.capText) { S.capText = t; U.cap.textContent = 'Now playing: ' + t; }
      }
      function paintNotes(glyph) { U.notes.forEach(function (n) { n.textContent = glyph; }); }
      function paintKey(k) {
        const c = S.pressed[k] || 0, o = U.keys[k];
        o.badge.textContent = c ? String(Math.min(99, c)) : '';
        o.btn.style.setProperty('--g', String(Math.min(c, 20) / 20));
        o.btn.classList.remove('m-hold-music-pulse'); void o.btn.offsetWidth; o.btn.classList.add('m-hold-music-pulse');
        api.setTimeout(function () { o.btn.classList.remove('m-hold-music-pulse'); }, 220);
      }

      /* ------------------------------------------------------------- positions and beats */
      function interp(tab, t) {
        if (t <= tab[0][0]) return tab[0][1];
        for (let i = 1; i < tab.length; i++) if (t <= tab[i][0]) { const a = tab[i - 1], b = tab[i]; return a[1] + (b[1] - a[1]) * (t - a[0]) / (b[0] - a[0]); }
        return tab[tab.length - 1][1];
      }
      function base(sim) { return sim < 299 ? interp(ANCH_A, sim) : sim < 300 ? 3999100 : interp(ANCH_B, sim); }
      function curPos() {
        if (S.fin && S.fin.pos) return S.fin.pos;
        if (S.clerUntil && S.sim < S.clerUntil) return 1;
        const v = base(S.sim) + S.offset;
        return clamp(Number.isFinite(v) ? Math.round(v) : 4000000, 1, 4001000);
      }
      function beatOf(sim) { let b = 1; for (let i = 0; i < BEAT_AT.length; i++) if (sim >= BEAT_AT[i]) b = i + 1; return b; }
      function resetOffsetTo(pos) { S.offset = pos - base(S.sim); }

      /* ------------------------------------------------------------- modes */
      function mt(fn, ms) {
        const tok = S.token;
        const id = api.setTimeout(function () { if (tok === S.token) fn(); }, ms);
        S.mt.push(id); return id;
      }
      function mi(fn, ms) {
        const tok = S.token;
        const id = api.setInterval(function () { if (tok === S.token) fn(); }, ms);
        S.mi.push(id); return id;
      }
      function setMode(m) {
        const had = focusInside();
        S.mode = m; S.token++; U.phone.classList.remove('m-hold-music-ringing');
        if (m !== 'cross' && S.crossCap) { S.crossCap = false; paintNotes(T_GLYPH[S.tier] || ''); paintCaption(); }
        S.mt.forEach(function (id) { api.clearTimeout(id); }); S.mt = [];
        S.mi.forEach(function (id) { api.clearInterval(id); }); S.mi = [];
        if (S.typeIv) { api.clearInterval(S.typeIv); S.typeIv = null; }
        S.typing = null; S.ringEnd = 0; setRing(0);
        if (U.speak.parentNode !== U.btnrow) U.btnrow.insertBefore(U.speak, U.ear);
        clearEl(U.extra); clearEl(U.opts);
        U.voiceBox.hidden = true; U.kpBox.hidden = true; U.holdBtn.hidden = true; U.speak.hidden = true;
        S.shown = []; S.human = null;
        if (had && m !== 'ivr') { try { U.card.focus({ preventScroll: true }); } catch (err) { /* nothing to focus */ } }
      }
      function mkOptBtn(o) {
        const key = S.nodeKey;
        return h('li', null, h('button', { type: 'button', class: 'm-hold-music-opt' + (o.zero ? ' m-hold-music-zero' : ''), onclick: function () { if (key !== S.nodeKey || S.mode !== 'ivr') return; if (S.holdFired || api.now() < S.suppressUntil) return; dial(o.k, 'opt'); } },
          'Press ' + o.k + ': ' + o.t));
      }
      function focusInside() { const a = root.ownerDocument && root.ownerDocument.activeElement; return !!(a && U.card.contains(a)); }

      function type(text, done) {
        if (S.typeIv) { api.clearInterval(S.typeIv); S.typeIv = null; }
        S.speechFull = text; U.live.textContent = text;
        if (!text) { U.speech.textContent = ''; S.typing = null; if (done) done(); return; }
        let i = 0; S.typing = { done: done }; U.speech.textContent = '';
        S.typeIv = api.setInterval(function () { i++; if (i >= text.length) finishType(); else U.speech.textContent = text.slice(0, i); }, 18);
      }
      function finishType() {
        if (!S.typing) return;
        const d = S.typing.done;
        if (S.typeIv) { api.clearInterval(S.typeIv); S.typeIv = null; }
        S.typing = null; U.speech.textContent = S.speechFull;
        if (d) d();
      }
      function startRing(ms, kind) { S.ringTotal = ms; S.ringEnd = api.now() + ms; S.ringKind = kind || 'ivr'; setRing(100); }

      /* ------------------------------------------------------------- IVR nodes */
      function pickMainSay(opts) {
        if (S.beat <= 1 && S.season === 1) return MAIN_B1;
        const have = opts.map(function (o) { return o.k; }).join('');
        const pool = MAIN_SAYS.filter(function (e) { return e[0] <= S.beat && e[1] !== S.lastMain && (!e[2] || e[2].split('').every(function (c) { return have.indexOf(c) >= 0; })); });
        const e = pool.length ? api.pick(pool) : MAIN_SAYS[0];
        S.lastMain = e[1]; return e[1];
      }
      function makeMain() {
        S.mainVisits++;
        if (S.beat >= 8 && S.mainVisits % 2 === 0) return makeKnows();
        const opts = [{ k: '1', t: S.relabel1 ? 'If you are returning' : bL1(), to: 'eng' }, { k: '2', t: 'For English but quieter', to: 'quiet' }, { k: '3', t: bL3(), to: 'main' }];
        S.relabel1 = false;
        const pool = [
          { k: '4', t: 'To hear these options in a different order', to: function () { S.reverse = !S.reverse; return 'main'; } },
          { k: '5', t: 'For billing', to: 'billing' }, { k: '6', t: 'To speak with a representative', to: 'rep' },
          { k: '7', t: 'To speak with the person who designed this menu', to: 'designer' }, { k: '8', t: 'For the directory', to: 'directory' }, { k: '9', t: 'For options you have already heard', to: 'heard' }];
        if (!S.mainBag) S.mainBag = bag(pool.map(function (p) { return p.k; }));
        const picks = [S.mainBag(), S.mainBag()];
        if (picks[0] === picks[1]) picks[1] = pool[(pool.findIndex(function (p) { return p.k === picks[0]; }) + 1) % pool.length].k;
        if (S.dials >= 60 && api.chance(0.5)) picks[1] = 'kf';
        const used = {};
        picks.forEach(function (k) {
          if (k === 'kf') { opts.push({ k: '*', t: 'For Key Fatigue', to: 'keyfatigue' }); used['*'] = 1; return; }
          const p = pool.find(function (x) { return x.k === k; }); opts.push(p); used[k] = 1;
        });
        if (S.beat >= 3 && api.chance(0.5)) {
          const free = ['4', '5', '6', '7', '8', '9'].find(function (k) { return !used[k]; });
          if (free) opts.push({ k: free, t: 'To confirm that you are holding', to: 'holdtight' });
        }
        opts.sort(function (a, b) { return a.k < b.k ? -1 : a.k > b.k ? 1 : 0; });
        const fin = opts.slice(0, 6);
        return { id: 'main', kind: 'menu', say: pickMainSay(fin), opts: fin };
      }
      function makeKnows() {
        const hist = S.history, old = hist.find(function (e) { return S.sim - e.sim >= 110; }) || hist[0];
        let top = '5', topN = 0;
        Object.keys(S.pressed).forEach(function (k) { if (S.pressed[k] > topN) { topN = S.pressed[k]; top = k; } });
        const words = S.lastHumanWords ? 'The last Human said, "' + S.lastHumanWords + '". You replied with nothing. The Human has kept it.' : 'You said nothing to the Human. The Human has kept it.';
        const opts = [
          { k: '1', t: 'To repeat the option you pressed two minutes ago', to: old && N[old.nodeId] ? old.nodeId : 'main' },
          { k: '2', t: 'To hear what you said to the Human, as a comfort', to: { id: 'k2', kind: 'info', say: words, opts: [{ k: '5', t: 'Acknowledge', to: 'main' }] } },
          { k: '3', t: 'To hear your most pressed key', to: { id: 'k3', kind: 'info', say: 'Your most pressed key is ' + (top === '*' ? 'star' : top === '#' ? 'pound' : top) + '. It has been pressed ' + topN + ' times. It is tired.', opts: [{ k: '5', t: 'Acknowledge', to: 'main' }] } },
          { k: '6', t: 'To speak with the person who designed this menu (they are also on hold)', to: 'designer' },
          { k: '7', t: 'To be told what you will press next. You will press 7', to: 'main' }];
        return { id: 'knows', kind: 'menu', say: 'The menu has been updated based on your history. Your history was consulted. It did not mind.', opts: opts };
      }
      function makeHeard() {
        let src = null;
        for (let i = S.history.length - 1; i >= 0 && !src; i--) { const n = N[S.history[i].nodeId]; if (n && n.kind === 'menu') src = n; }
        const m = src || makeMain();
        return { id: 'heard', kind: 'menu', say: 'Here are the options you have already heard. They are the same, but calmer.', opts: m.opts.map(function (o) { return Object.assign({}, o); }) };
      }
      function resolve(dest) {
        if (dest && typeof dest === 'object') return dest;
        let id = dest;
        if (id === 'rep' && S.beat >= 5) id = 'repvoice';
        if (id === 'main') return makeMain();
        if (id === 'heard') return makeHeard();
        const n = N[id];
        if (!n || (n.min && S.beat < n.min)) return makeMain();
        return n;
      }
      function interlude() {
        const i = S.interIdx++ % 4;
        if (i === 0) { const c = CLAUSES[Math.min(S.clauseIdx, CLAUSES.length - 1)]; S.clauseIdx++; return 'Your call is important to us ' + c + '.'; }
        if (i === 1) {
          if (S.season >= 2) return 'Your estimated wait time is 11 centuries. It was 11 centuries last time. We are consistent.';
          if (S.beat <= 1) return 'Your estimated wait time is 11 centuries. This estimate is based on a stopwatch and a feeling.';
          if (S.beat <= 3) return 'Your estimated wait time is about 11 centuries, give or take a Tuesday.';
          if (S.beat <= 6) return 'Your estimated wait time is 11 centuries and a bit. We are not measuring the bit.';
          return 'Your estimated wait time is 11 centuries. We have stopped saying the number after it.';
        }
        if (i === 2) return bRecord();
        return fill(bPos(), { pos: f(curPos()) });
      }
      function present(node, o) {
        o = o || {};
        const hadFocus = focusInside();
        const again = node === S.node;
        setMode('ivr');
        const inst = Object.assign({}, node, { opts: (node.opts || []).map(function (x) { return Object.assign({}, x); }) }); if (inst.kind === 'info') inst.opts.forEach(function (o) { if (o.k === '5' && o.t === 'Acknowledge') o.t = bAck(); });
        S.node = inst; S.nodeKey++; S.readAt = api.now(); S.reads++;
        if (inst.id === 'main') S.depth = 0; else if (!again) S.depth++;
        api.stat.max('hold-music.depth', S.depth);
        let say = typeof inst.say === 'function' ? inst.say() : inst.say;
        say = fill(say, { pos: f(curPos()) });
        const parts = (o.pre || []).slice();
        if (!o.silent && S.reads % 4 === 0 && !o.pre) parts.push(interlude());
        parts.push(say);
        const text = parts.join('\n');
        let shown = inst.opts.slice(0, 6);
        if (S.reverse && inst.id === 'main') shown.reverse();
        if (inst.kind !== 'info' && inst.kind !== 'keypad') shown.push({ k: '0', t: S.beat >= 8 ? 'Return to the previous menu you have not yet visited' : 'Return to the previous menu', zero: true });
        S.shown = shown;
        shown.forEach(function (op) { U.opts.appendChild(mkOptBtn(op)); });
        U.voiceBox.hidden = inst.kind !== 'voice' && !(S.gift > api.now());
        U.kpBox.hidden = inst.kind !== 'keypad'; S.kp = '';
        U.kpRead.textContent = inst.kind === 'keypad' ? '_' : '';
        U.holdBtn.hidden = inst.kind !== 'hold';
        setReact(o.react || '');
        const tok = S.token;
        const go = function () { if (tok === S.token) startRing(14000, 'ivr'); };
        if (o.silent) { S.speechFull = text; U.speech.textContent = text; U.live.textContent = text; go(); } else type(text, go);
        if (hadFocus) { const b = U.opts.querySelector('button'); if (b) b.focus({ preventScroll: true }); }
        if (!again) S.history.push({ nodeId: N[inst.id] || inst.id === 'main' ? inst.id : 'main', sim: S.sim });
        while (S.history.length > 12) S.history.shift();
      }
      function readDest(dest, o) { present(resolve(dest), o); }

      /* ------------------------------------------------------------- dialing */
      function onKeyClick(k) {
        if (S.holdFired || api.now() < S.suppressUntil) return;
        endHold(); dial(k, 'pad');
      }
      function touch() {
        const was = S.idleSim;
        S.idleSim = 0; S.idleFlags = {};
        if (S.nap) { S.nap = false; paintStrip(); }
        if (S.margOffer) S.margOfferUntil = api.now() + 15000;
        if (was >= 30 && S.mode !== 'down') { const bk = was < 60 ? L.idle[3] : was < 180 ? X.back[0] : was < 420 ? X.back[1] : X.back[2]; api.say(bk, { mood: 'smug', priority: was >= 60 ? 1 : 0 }); setReact(bk); }
        if (S.season >= 3 && api.now() - S.youHoldAt >= 12000) { S.youHoldAt = api.now(); bubble('you', 'Please hold.', 4000); }
      }
      function dial(k, via) {
        const now = api.now();
        if (S.mode === 'down') { setReact(bSigh()); return; }
        const sticky = now < S.stickyUntil;
        if (sticky && S.lastKey[k] && now - S.lastKey[k] < 1000) {
          if (k === '*') { S.starRej++; if (S.starRej >= 3 && !S.sighed) { S.sighed = true; api.sfx('sad'); api.say(L.spam[5], { mood: 'disappointed', priority: 1 }); } }
          return;
        }
        S.lastKey[k] = now;
        S.pressTimes.push(now);
        while (S.pressTimes.length && now - S.pressTimes[0] > 3000) S.pressTimes.shift();
        if (S.pressTimes.length > 14 && !sticky && now >= S.spamCool) surcharge(now);
        touch();
        S.dials++; api.stat.inc('hold-music.dials');
        S.pressed[k] = (S.pressed[k] || 0) + 1; paintKey(k); api.sfx('blip');
        if (S.pressed[k] === 20 || S.pressed[k] === 50) { const kn = k === '*' ? 'star' : k === '#' ? 'pound' : k; api.say('The ' + kn + ' key has been pressed ' + S.pressed[k] + (S.pressed[k] === 20 ? ' times. It has begun to take it personally.' : ' times. It is no longer a key. It is a relationship.'), { mood: 'confused', priority: 1 }); }
        if (!S.pressAll && Object.keys(S.pressed).length >= 12) { S.pressAll = true; api.achieve('hold-music.press-all'); }
        if (S.scale > 0 && now - S.scaleT > 15000) S.scale = 0;
        S.scale = k === KEYS[S.scale] ? S.scale + 1 : (k === '1' ? 1 : 0); if (S.scale === 1) S.scaleT = now; if (S.scale === 12) { S.scale = 0; recital(); }
        S.buf.push({ k: k, t: now }); if (S.buf.length > 8) S.buf.shift();
        if (S.sim >= S.fracUntil && S.fracUntil) { S.fracUntil = 0; U.frac.textContent = ''; }
        route(k);
        postDial(k);
      }
      function route(k) {
        const m = S.mode;
        if (m === 'finale') return;
        if (m === 'ivr' && S.buf.length >= 7) {
          const last7 = S.buf.slice(-7);
          if (last7.map(function (e) { return e.k; }).join('') === '4000000' && last7[6].t - last7[0].t <= 8000) { dialYourself(); return; }
        }
        if (m === 'ping') { pingKey(k); return; }
        if (m === 'human' || m === 'cb') return;
        if (m === 'survey') { const sq = S.sv ? S.sv.q : -1, nk = Number(k) - 1; if ((sq === 0 && nk >= 0 && nk <= 4) || (sq === 1 && (nk === 0 || nk === 1))) svNext(nk); return; }
        if (m === 'ext') { if (api.now() - S.ext.t0 >= 8000) endExt(); return; }
        if (m === 'cross') { if (k === '#') listenIn(); return; }
        if (m === 'transfer') { if (k === '*') spinAgain(); else setReact(TRANSFER_KEY); return; }
        if (S.typing) { finishType(); if (api.now() - S.readAt < 250) return; }
        nodeKey(k);
      }
      function nodeKey(k) {
        const n = S.node; if (!n) return;
        if (n.kind === 'menu') {
          const o = S.shown.find(function (x) { return x.k === k; });
          if (o) follow(o, k); else setReact(fill(bBad(), { k: k === '*' ? 'star' : k === '#' ? 'pound' : k }));
        } else if (n.kind === 'info') {
          if (k === '5' && n.opts[0]) follow(n.opts[0], k); else if (k === '0') prevMenu(); else setReact(bNot5());
        } else if (n.kind === 'keypad') {
          if (/[0-9]/.test(k)) { if (S.kp.length < 12) S.kp += k; U.kpRead.textContent = S.kp || '_'; }
          else if (k === '*') { S.kp = ''; U.kpRead.textContent = '_'; }
          else submitKeypad();
        } else if (n.kind === 'hold') {
          if (k === '0') prevMenu(); else setReact(HOLD_TIGHT[0]);
        } else if (n.kind === 'voice') {
          if (k === '0') prevMenu(); else if (k === '*') readDest(n.to || 'main', { react: VOICE_SKIP }); else setReact(VOICE_KEY);
        }
      }
      function follow(o, k) {
        if (o.zero) { prevMenu(); return; }
        const dest = typeof o.to === 'function' ? o.to() : o.to;
        const react = o.r || fill(bReact(), { k: k === '*' ? 'star' : k });
        if (typeof dest === 'string' && dest !== 'main' && S.beat >= 6 && S.sim - S.lastXfer >= 90 && api.chance(0.3)) { startTransfer(react); return; }
        readDest(dest, { react: react });
      }
      function prevMenu() {
        S.zeroes++; api.stat.inc('hold-music.zeroes');
        if (S.zeroes === 10) { api.achieve('hold-music.previous-menu'); api.say(L.zeroes[0], { mood: 'proud', priority: 1 }); }
        if (S.zeroes === 25) api.say('That is 25 previous menus. They have asked to be called something else. They have chosen Menu.', { mood: 'confused', priority: 1 });
        if (S.firstZero) { S.firstZero = false; readDest('prevs2', { react: 'Press 0 noted. It was already noted.' }); return; }
        let label = bPrevLabel(); if (label === S.lastZeroLabel) label = bPrevLabel(); S.lastZeroLabel = label;
        const pool = ['billing', 'billed', 'shipping', 'sales', 'returns', 'complaints', 'holdsupport'].filter(function (id) { return !S.node || S.node.id !== id; });
        const src = N[api.pick(pool)];
        const cnt = Math.min(src.opts.length, api.randInt(3, 5));
        present({ id: 'prev', kind: 'menu', say: fill(bPrevSay(), { label: label }), opts: src.opts.slice(0, cnt) }, { react: 'Press 0 noted. A previous menu has been prepared.' });
      }
      function submitKeypad() {
        const n = S.node; if (!n || n.kind !== 'keypad') return;
        const d = S.kp;
        present({ id: n.id + '-done', kind: 'info', say: n.result(d), opts: [{ k: '5', t: 'Acknowledge', to: n.to || 'main' }] }, {});
      }
      function applyDelta() {
        if (S.mode === 'finale') return null;
        const r = api.rand(); let d, type; S.noun = '';
        if (r < 0.8) { d = -api.randInt(1, 37); type = 'f'; }
        else if (r < 0.92) { d = api.randInt(1, 9); type = 'b'; }
        else if (S.beat >= 2) { d = api.randInt(10, 400); type = 'r'; }
        else { d = -api.randInt(1, 37); type = 'f'; }
        S.offset = clamp(S.offset + d, -3000, 5000);
        if (type !== 'f' || S.dials % 3 === 1 || !S.reasonSeen) {
          S.reasonSeen = true;
          let txt;
          if (type === 'f') txt = (S.dials - S.noReasonAt >= 20 && api.chance(0.08)) ? (S.noReasonAt = S.dials, R_NOREASON) : bFwd();
          else txt = type === 'b' ? bBack() : bRecount();
          U.reason.textContent = fill(txt, { n: Math.abs(d) }); const nn = NOUNS.find(function (x) { return x[0].test(txt); }); S.noun = nn ? nn[1] : '';
        }
        return d;
      }
      function postDial(k) {
        const d = S.noDelta ? null : applyDelta();
        S.noDelta = false;
        addLog('DIAL ' + k + (d == null ? '' : ' (' + (d > 0 ? '+' : '') + d + ')') + (S.noun ? ' ' + S.noun : ''));
        if (--S.awardIn <= 0) { api.award(0.1 + api.rand() * 0.4, 'dial'); S.awardIn = api.randInt(3, 5); }
        if (S.dials >= S.nextComment) { S.nextComment = S.dials + api.randInt(7, 11); api.say(bComm().replace('{count}', String(S.dials)), { priority: 0 }); }
        if (S.beat >= 9 && S.mode !== 'finale' && api.now() - S.choirAt > 3000) { S.choirAt = api.now(); api.say(bChoir(), { mood: 'proud', priority: 0 }); }
        if (S.beat >= 3 && S.season < 3 && S.mode === 'ivr' && S.sim - S.lionelAt >= 90 && api.chance(1 / 45)) lionel();
        if (S.beat >= 4 && !S.fin && S.mode === 'ivr' && S.sim >= S.clerAt && api.chance(1 / 60)) clerical();
        if (S.beat >= 4 && !S.fin && S.mode === 'ivr' && S.sim - S.cbAt >= 200 && api.chance(1 / 70)) callbackOffer();
      }
      /* the update: the keypad reorganization (mid-session escalation), the callback offer (rare) and the recital (secret) */
      function swapKeys() { const a = U.keys['2'].btn, b = U.keys['8'].btn, pad = a.parentNode, na = a.nextSibling, nb = b.nextSibling, ae = root.ownerDocument.activeElement; pad.insertBefore(a, nb); pad.insertBefore(b, na); if (ae === a || ae === b) ae.focus(); }
      function reorg(on) {
        S.reorg = on ? 1 : 2; swapKeys();
        if (!on) { api.say(bUnreorg(), { mood: 'proud', priority: 0 }); return; }
        api.stat.inc('hold-music.reorgs'); api.sfx('stamp'); addLog('REORGANIZED'); setReact('Keys 2 and 8 have been reorganized. Keyboard users are exempt. They have not been told.');
        api.say(S.season > 1 ? Y.reorg2[S.finishes % 2] : bReorg(), { mood: 'smug', priority: 1 });
        if (api.flag.get('metStapler')) api.setTimeout(function () { api.say(Y.stapler, { mood: 'confused', priority: 1 }); }, 5500);
      }
      function callbackOffer() {
        S.cbAt = S.sim; S.cbDone = true; setMode('cb'); api.sfx('bell'); api.stat.inc('hold-music.offers'); setReact(''); type(Y.cb[0], null); startRing(12000, 'cbo'); addLog('CALLBACK OFFER');
        U.extra.appendChild(h('button', { type: 'button', class: 'm-hold-music-btn m-hold-music-big', onclick: function () { acceptCb(); } }, 'Yes, please call me back'));
        mt(function () { api.say(Y.cb[1], { mood: 'disappointed', priority: 0 }); present(S.node || makeMain(), { silent: true, react: Y.cb[1] }); }, 12000);
      }
      function acceptCb() {
        if (S.mode !== 'cb') return;
        touch(); S.cbUntil = api.now() + 25000; api.award(0.5, 'accepted a callback'); api.sfx('ding'); api.say(Y.cb[2], { mood: 'proud', priority: 1 }); present(S.node || makeMain(), { silent: true, react: Y.cb[2] });
      }
      function cbMiss() {
        if (S.mode !== 'down' || !S.cbRing) return;
        S.cbRing = false; S.cbDown = false; S.mi.forEach(function (id) { api.clearInterval(id); }); S.mi = []; U.phone.classList.remove('m-hold-music-ringing');
        if (U.redial) { U.redial.textContent = 'REDIAL'; U.redial.classList.remove('m-hold-music-speak'); }
        S.speechFull = Y.cbMiss; U.speech.textContent = Y.cbMiss; U.live.textContent = Y.cbMiss; api.sfx('sad'); api.say(Y.cbMiss, { mood: 'disappointed', priority: 1 }); addLog('MISSED CALLBACK');
      }
      function cbAnswer() {
        S.cbRing = false; S.cbTalk = 1; touch(); setReact(''); S.ringEnd = 0; setRing(0); S.mi.forEach(function (id) { api.clearInterval(id); }); S.mi = []; U.phone.classList.remove('m-hold-music-ringing'); api.sfx('pop'); addLog('ANSWERED');
        const say = function (t) { S.speechFull = t; U.speech.textContent = t; U.live.textContent = t; };
        const step = function (i) {
          clearEl(U.extra);
          if (i > 2) { mt(function () { cbWin(); }, 3200); return; }
          U.extra.appendChild(h('button', { type: 'button', class: 'm-hold-music-btn m-hold-music-big', onclick: function () {
            if (S.mode !== 'down' || S.cbTalk !== i + 1) return;
            S.cbTalk = i + 2; api.sfx('blip'); api.award(0.3, 'a nervous exchange'); say(Y.cbTalk[i + 1]); api.say(Y.cbTalk[i + 1], { mood: i === 2 ? 'proud' : 'confused', priority: 1 }); step(i + 1);
          } }, ['Hello', 'Who is this?', '...'][i]));
        };
        say(Y.cbTalk[0]); step(0);
      }
      function cbWin() {
        S.cbRing = false; S.cbDown = false; S.cbTalk = 0; S.pingFails = 0; S.idleSim = 0; resetOffsetTo(S.posAtDown); api.award(4, 'called back'); api.achieve('hold-music.callback'); api.stat.inc('hold-music.callbacks');
        api.sfx('tada'); api.confetti(); addLog('CALLED BACK'); api.say(Y.cb[5], { mood: 'proud', priority: 2 }); paintStrip(); present(makeMain(), { pre: [Y.cb[6], Y.cb[8]] });
      }
      function recital() { api.achieve('hold-music.recital'); api.award(1.5, 'the recital'); api.sfx('tada'); api.confetti(); api.stat.inc('hold-music.recitals'); addLog('RECITAL'); api.say(bRecital(), { mood: 'proud', priority: 2 }); }
      /* two rare events: Lionel speaks up, and a clerk puts you at the front of the line */
      function lionel() { S.lionelAt = S.sim; api.stat.inc('hold-music.lionel'); api.award(0.4, 'Lionel'); api.sfx('pop'); bubble('lio', bLio(), 6500); }
      function clerical() {
        S.clerDone = true; S.clerAt = S.sim + 240; S.clerUntil = S.sim + 10; api.stat.inc('hold-music.clerical'); api.sfx('fanfare'); api.setTimeout(function () { api.sfx('whoosh'); }, 350);
        U.lcd.classList.add('m-hold-music-alarm', 'm-hold-music-gold'); U.behindTag.textContent = '🚨'; paintStrip(); api.confetti(); api.setTimeout(function () { api.say(CLER_PANIC, { mood: 'panic', priority: 2 }); }, 5200);
        api.say(CLER_START, { mood: 'proud', priority: 2 }); setReact(CLER_REACT); U.reason.textContent = CLER_REACT; addLog('POSITION 1 (?)');
      }
      function clerEnd() {
        api.sfx('sad'); resetOffsetTo(4000000); U.lcd.classList.remove('m-hold-music-alarm', 'm-hold-music-gold'); if (!S.behind) U.behindTag.textContent = ''; paintStrip();
        U.cstamp.classList.add('m-hold-music-on'); api.setTimeout(function () { U.cstamp.classList.remove('m-hold-music-on'); }, 3200);
      }
      function surLine() {
        const i = S.surN - 2;
        if (i < 5) return X.sur[i] + (i === 4 && api.flag.get('metStapler') ? ' The Stapler is representing them and has brought a folding chair.' : '');
        return X.sur[5 + (S.surN % 2)];
      }
      function surcharge(now) {
        S.stickyUntil = now + 4000; S.spamCool = now + 10000; S.starRej = 0; S.sighed = false; S.pressTimes = []; S.stickyOn = true; S.surN++;
        api.award(-1, 'enthusiasm surcharge'); api.sfx('buzz'); api.stat.inc('hold-music.surcharges'); api.achieve('hold-music.surcharge');
        api.say(S.surN === 1 ? L.spam[bSpam()] : surLine(), { mood: 'panic', priority: 1 });
        setReact(bSpamIvr());
        if (!S.billingCard) { S.billingCard = true; addCard('Billing (Enthusiasm Dept.)', 'a breathing file', true); }
        KEYS.forEach(function (k) { U.keys[k].btn.classList.add('m-hold-music-sticky'); });
      }
      function endSticky() {
        S.stickyOn = false;
        KEYS.forEach(function (k) { U.keys[k].btn.classList.remove('m-hold-music-sticky'); });
        api.say(L.spam[4], { mood: 'neutral', priority: 0 });
      }

      /* the hold-key tracker */
      function startHold(id) {
        endHold();
        const now = api.now();
        S.hold = { id: id, t0: now, timers: [] };
        S.holdFired = false;
        if (id === '#') {
          const b = S.buf, n = b.length;
          S.extArmed = n >= 2 && b[n - 1].k === '5' && b[n - 2].k === '7' && now - b[n - 2].t <= 8000;
          S.hold.timers.push(api.setTimeout(function () {
            if (!S.hold || S.hold.id !== '#' || !S.extArmed) return;
            if (S.mode === 'down' || S.mode === 'finale' || S.mode === 'ext' || S.mode === 'human') return;
            S.holdFired = true; startExt();
          }, 1500));
          S.hold.timers.push(api.setTimeout(function () {
            if (!S.hold || S.hold.id !== '#') return;
            if (S.mode === 'ping' && S.ping && S.ping.variant === 'hash') { S.holdFired = true; pingOK(); }
          }, 2000));
        }
        S.hold.timers.push(api.setTimeout(function () {
          if (!S.hold || S.holdFired) return;
          if (S.mode === 'ivr' && S.node && S.node.kind === 'hold') {
            S.holdFired = true; touch(); api.stat.inc('hold-music.dials'); api.sfx('ding');
            readDest(S.node.to || 'main', { react: HOLD_TIGHT[1] });
          }
        }, 3000));
      }
      function endHold() {
        const was = S.holdFired;
        if (S.hold) { S.hold.timers.forEach(function (id) { api.clearTimeout(id); }); S.hold = null; }
        if (was) { S.suppressUntil = api.now() + 450; S.holdFired = false; }
      }

      /* ------------------------------------------------------------- voice */
      function focusVoice() {
        if (U.voiceBox.hidden) {
          const n = ++S.noField;
          if (n === 1) api.say('There is no field. Press R again anyway.', { mood: 'confused', priority: 0 });
          else if (n < 7) api.say(X.nofield[n - 2], { mood: n >= 5 ? 'panic' : 'confused', priority: 1 });
          else { S.noField = 0; S.gift = api.now() + 45000; U.voiceBox.hidden = false; api.sfx('ding'); api.award(0.5, 'a field'); api.stat.inc('hold-music.fields'); api.say(X.nofield[5], { mood: 'smug', priority: 2 }); }
          return;
        }
        U.input.focus();
      }
      function keyword(raw) {
        let id = '';
        for (let i = 0; i < KEYWORDS.length && !id; i++) if (KEYWORDS[i][0].test(raw)) id = KEYWORDS[i][1];
        if (!id) return false;
        api.stat.inc('hold-music.names');
        if (id === 'tuesday') { api.say(KW_SAY.tuesday, { mood: 'confused', priority: 2 }); api.achieve('hold-music.tuesday'); api.award(0.7, 'Tuesday'); api.sfx('bell'); }
        else if (id === 'gerald' && api.flag.get('metGerald')) {
          api.say(KW_SAY.geraldMet, { mood: 'confused', priority: 1 });
          api.setTimeout(function () { api.say('I was not on the call. I was near it. This is how potatoes participate.', { who: 'Gerald', priority: 1 }); }, 3000);
        }
        else if (id === 'sandra') api.say(KW_SAY.sandraLead + api.line('tosClause'), { mood: 'smug', priority: 1 });
        else if (id === 'dennis') api.say(KW_SAY.dennisLead + api.line('plantStatus'), { mood: 'smug', priority: 1 });
        else if (id === 'toast' && api.flag.get('metToaster')) api.say(L.cameo[6], { who: 'The Toaster', priority: 1 });
        else api.say(KW_SAY[id], { mood: 'confused', priority: 1 });
        return true;
      }
      function voiceKey(e) {
        if (e.key === 'Enter') { e.preventDefault(); submitVoice(); }
        else if (e.key === 'Escape') { e.preventDefault(); U.input.blur(); }
      }
      function submitVoice() {
        const raw = String(U.input.value || '').replace(/\s+/g, ' ').trim().slice(0, 60);
        U.input.value = '';
        touch();
        const named = raw ? keyword(raw) : false;
        if (S.mode === 'survey') { if (S.sv && S.sv.q === 2) svNext(raw || null); return; }
        if (S.mode === 'ping' && S.ping && S.ping.variant === 'voice') {
          if (raw.toLowerCase().replace(/[^a-z ]/g, '').trim() === 'still here') pingOK(); else setReact(bWrong());
          return;
        }
        const n = S.node;
        if (S.mode !== 'ivr' || !n) return;
        if (n.kind !== 'voice') { if (!named && raw) setReact('You said it into a field that belongs to no department. It has been forwarded to the field.'); return; }
        api.sfx('blip');
        if (!raw) { setReact(EMPTY_SAY); return; }
        const shown = raw.slice(0, 24);
        const letters = raw.replace(/[^A-Za-z]/g, '');
        let pre = '';
        if ((letters.length >= 3 && letters === letters.toUpperCase()) || raw.indexOf('!') >= 0) pre += SHOUT + ' ';
        if (/please/i.test(raw)) { pre += COURTESY + ' '; api.award(0.3, 'courtesy'); }
        S.voiceTries++;
        const tries = S.voiceTries;
        let hh, say;
        if (tries <= 4) {
          const hs = Number.isFinite(P.util.hashStr(raw.toLowerCase())) ? P.util.hashStr(raw.toLowerCase()) : 0;
          const idx = (Math.abs(hs) + tries * 3) % 7; hh = HEARD[idx];
          if (S.heard.indexOf(idx) < 0) { S.heard.push(idx); api.save.set('heard', S.heard); if (S.heard.length >= 5) api.achieve('hold-music.voice-sultan'); }
          say = fill(CONFIRM, { h: hh });
        } else if (tries <= 7) {
          hh = 'a very loud nothing'; say = LOUD_NOTHING;
          if (S.heard.indexOf(7) < 0) { S.heard.push(7); api.save.set('heard', S.heard); if (S.heard.length >= 5) api.achieve('hold-music.voice-sultan'); }
        }
        else { hh = HEARD[(tries * 5) % 7]; say = fill(CONFIRM, { h: hh }); pre += ECHO.split('%raw%').join(shown) + ' '; S.voiceTries = 0; }
        api.stat.inc('hold-music.mishears');
        addLog('SAY ' + shown.slice(0, 8));
        const react = pre + CONFIRM_REACT.split('%raw%').join(shown);
        present({ id: 'confirm', kind: 'menu', say: say, opts: [{ k: '1', t: 'Yes', to: 'main' }, { k: '2', t: 'No', to: n.back || 'repvoice' }] }, { react: react });
      }

      /* ------------------------------------------------------------- timeouts */
      function timeoutIvr() {
        if (S.mode !== 'ivr' || !S.node) return;
        const n = S.node, react = bTimeout();
        if (n.kind === 'menu') {
          const idx = n.opts.map(function (o, i) { return i; });
          if (idx.length >= 2) { const a = api.pick(idx), rest = idx.filter(function (i) { return i !== a; }), b = api.pick(rest); const t = n.opts[a].to; n.opts[a].to = n.opts[b].to; n.opts[b].to = t; }
          present(n, { react: react });
        } else if (n.kind === 'hold') readDest(n.to || 'main', { react: HOLD_TIGHT[2] });
        else if (n.kind === 'keypad') submitKeypad();
        else if (n.kind === 'voice') { present(n, { react: EMPTY_SAY }); }
        else present(n, { react: react });
      }

      /* ------------------------------------------------------------- the heartbeat */
      function pingVariant() {
        const s = S.sim;
        if (s < 120) return 'any';
        if (s < 180) { S.pingAlt ^= 1; return S.pingAlt ? 'k5' : 'k7'; }
        if (s < 240) return 'voice';
        if (s < 300) return 'hash';
        if (s < 390) return 'star';
        return api.pick(['any', 'k5', 'k7', 'voice', 'hash', 'star']);
      }
      function startPing() {
        const v = pingVariant();
        setMode('ping');
        S.ping = { variant: v, seq: 0, done: false };
        U.voiceBox.hidden = v !== 'voice';
        setReact('');
        type(PING_Q[v], null);
        startRing(v === 'voice' ? 12000 : 7000, 'ping'); if (v === 'voice' && focusInside()) { try { U.input.focus({ preventScroll: true }); } catch (err) { /* nothing to focus */ } }
        api.say(L.ping[0], { mood: 'neutral', priority: 1 });
      }
      function pingKey(k) {
        const p = S.ping; if (!p || p.done) return;
        const v = p.variant;
        if (v === 'any') { pingOK(); return; }
        if (v === 'k5' || v === 'k7') { if (k === (v === 'k5' ? '5' : '7')) pingOK(); else setReact(bWrong()); return; }
        if (v === 'star') {
          if (p.seq === 0 && k === '*') { p.seq = 1; setReact('Star received. Pound, please.'); }
          else if (p.seq === 1 && k === '#') pingOK();
          else { p.seq = k === '*' ? 1 : 0; setReact(bWrong()); }
          return;
        }
        setReact(bWrong());
      }
      function pingOK() {
        if (S.mode !== 'ping' || !S.ping || S.ping.done) return;
        S.ping.done = true;
        api.award(0.2, 'still there'); api.stat.inc('hold-music.pings'); api.sfx('ding');
        S.pingFails = 0; S.nextPing = S.sim + api.randInt(45, 75);
        addLog('PING OK');
        present(S.node || makeMain(), { silent: true, react: bOk() });
        if (api.chance(1 / 40)) api.say(L.cameo[6], { who: 'The Toaster', mood: 'neutral', priority: 1 });
        else if (api.flag.get('metGerald') && api.chance(1 / 50)) api.say(L.cameo[4], { who: 'Gerald', priority: 1 });
      }
      function pingFail() {
        if (S.mode !== 'ping') return;
        goDown('fail');
      }

      /* ------------------------------------------------------------- hang up, disconnect, redial */
      function startSurvey() {
        api.save.set('surveyed', true); api.stat.inc('hold-music.surveys'); setMode('survey'); S.sv = { q: 0 }; setReact(''); addLog('EXIT SURVEY');
        api.say(SV.intro, { mood: 'smug', priority: 2 }); svShow(0);
      }
      function svBtn(q, i, t) {
        return h('li', null, h('button', { type: 'button', class: 'm-hold-music-opt', onclick: function () { if (S.mode === 'survey' && S.sv && S.sv.q === q) svNext(i); } }, 'Press ' + (i + 1) + ': ' + t));
      }
      function svShow(q) {
        S.sv.q = q; clearEl(U.extra); clearEl(U.opts); U.voiceBox.hidden = q !== 2; type(SV.q[q], null); startRing(q === 2 ? 10000 : 7000, 'sv');
        (q === 0 ? SV.rate : q === 1 ? ['Yes', 'No'] : []).forEach(function (t, i) { U.opts.appendChild(svBtn(q, i, t)); });
        if (q === 2) U.extra.appendChild(h('button', { type: 'button', class: 'm-hold-music-btn', onclick: function () { if (S.mode === 'survey' && S.sv && S.sv.q === 2) svNext(null); } }, 'Prefer not to say, to anyone'));
      }
      function svNext(ans) {
        const q = S.sv ? S.sv.q : -1;
        if (S.mode !== 'survey' || q < 0 || q > 2) return;
        touch(); api.sfx('blip'); api.award(0.2, 'survey');
        if (q === 0) { setReact(typeof ans === 'number' ? fill(SV.r1, { r: SV.rate[ans] }) : SV.r1n); svShow(1); }
        else if (q === 1) { setReact((ans === null ? SV.q2n : '') + SV.friend); svShow(2); }
        else {
          setReact(typeof ans === 'string' ? fill(SV.said, { raw: ans.slice(0, 24) }) : EMPTY_SAY);
          S.sv.q = 3; S.ringEnd = 0; setRing(0); U.voiceBox.hidden = true; clearEl(U.extra); clearEl(U.opts); type(SV.done, null);
          mt(function () { goDown('hang'); }, 3200);
        }
      }
      function armHang() {
        if (S.mode === 'down' || S.mode === 'finale') return;
        if (!S.hangArmed) {
          S.hangArmed = true; U.hang.textContent = 'Really?'; U.hang.classList.add('m-hold-music-armed'); S.armCount++;
          setReact(S.armCount === 1 ? HANG_ARM : X.arm[Math.min(S.armCount - 2, X.arm.length - 1)]);
          S.hangTimer = api.setTimeout(disarmHang, 2500);
          touch();
        } else { disarmHang(); if (!api.save.get('surveyed', false) && S.mode !== 'survey' && api.now() >= S.cbUntil) startSurvey(); else goDown('hang'); }
      }
      function disarmHang() {
        if (S.hangTimer) { api.clearTimeout(S.hangTimer); S.hangTimer = 0; }
        if (!S.hangArmed) return;
        S.hangArmed = false; U.hang.textContent = 'HANG UP'; U.hang.classList.remove('m-hold-music-armed');
      }
      function goDown(kind) {
        if (S.mode === 'down') return;
        S.posAtDown = curPos();
        const hadFocus = root.contains(root.ownerDocument.activeElement);
        const cb = api.now() < S.cbUntil; S.cbUntil = 0;
        setMode('down'); S.hangups++; S.sinceHangup = 0; S.armCount = 0; S.cbTalk = 0;
        if (kind === 'fail') S.pingFails++;
        S.speechFull = cb ? Y.cb[3] : kind === 'fail' ? L.ping[1] : 'Dial tone.';
        U.speech.textContent = S.speechFull; U.live.textContent = S.speechFull;
        setReact('Dial tone.');
        const rb = h('button', { type: 'button', class: 'm-hold-music-btn m-hold-music-big', onclick: function () { redial(); } }, 'REDIAL');
        U.extra.appendChild(rb); U.redial = rb;
        if (hadFocus) rb.focus({ preventScroll: true });
        api.sfx('sad');
        if (cb) {
          S.cbDown = true;
          mt(function () { S.cbRing = true; U.phone.classList.add('m-hold-music-ringing'); rb.textContent = '☎ ANSWER'; rb.classList.add('m-hold-music-speak'); api.sfx('bell'); api.say(Y.cb[4], { mood: 'panic', priority: 2 }); startRing(15000, 'cb'); mi(function () { api.sfx('bell'); }, 900); }, 3500);
        } else api.say(kind === 'fail' && S.pingFails < 2 ? L.ping[2] : L.ping[1], { mood: 'disappointed', priority: 1 });
        addLog(kind === 'fail' ? 'DISCONNECT' : 'HANG UP');
        paintStrip();
      }
      function redial() {
        if (S.mode !== 'down') return;
        if (S.cbRing) { cbAnswer(); return; }
        const early = S.cbDown; S.cbDown = false;
        S.call++; S.redials++; api.stat.inc('hold-music.redials'); S.callSim = 0; S.carol = true; S.idleSim = 0;
        let react;
        if (S.pingFails >= 2 && S.sim - S.pityAt >= 300) { S.pityAt = S.sim; S.pingFails = 0; resetOffsetTo(S.posAtDown); react = PITY; }
        else { resetOffsetTo(4000000 + S.redials); react = fill(REDIAL_GREET, { pos: f(4000000 + S.redials) }); }
        api.say(L.ping[3], { mood: 'smug', priority: 1 });
        addLog('REDIAL'); paintStrip();
        present(makeMain(), { pre: early ? [Y.cb[7], react] : [react] });
      }

      /* ------------------------------------------------------------- transfers */
      function pickDest() {
        const elig = DESTS.filter(function (d) {
          if (d.n === S.lastDest) return false;
          if (d.n === 'Gerald') return !!api.flag.get('metGerald');
          if (d.n === 'Department of Toast') return api.stat.get('toaster-debate.entered') > 0 && !S.toastSeen;
          return true;
        });
        return api.pick(elig) || DESTS[0];
      }
      function startTransfer(react) {
        setMode('transfer'); S.lastXfer = S.sim;
        S.xfer = { skips: 0, react: react };
        api.say(api.line('m:hold-music:transfer'), { priority: 0 });
        runSpin();
        api.stat.inc('hold-music.transfers'); api.award(0.2, 'transfer');
      }
      function runSpin() {
        const dest = pickDest(); S.xfer.dest = dest; S.lastDest = dest.n;
        clearEl(U.extra);
        const reels = [0, 1, 2].map(function () { return h('div', { class: 'm-hold-music-reel', text: 'Spinning...' }); });
        U.extra.appendChild(h('div', { class: 'm-hold-music-reels', 'aria-hidden': 'true' }, reels[0], reels[1], reels[2]));
        setReact(S.xfer.react || '');
        S.speechFull = 'Please hold while we transfer you.'; U.speech.textContent = S.speechFull; U.live.textContent = S.speechFull;
        const stopped = [false, false, false];
        mi(function () { reels.forEach(function (r, i) { if (!stopped[i]) r.textContent = api.pick(REEL_NAMES); }); }, 90);
        [1800, 2400, 3000].forEach(function (ms, i) {
          mt(function () {
            stopped[i] = true;
            const near = REEL_NAMES.filter(function (n) { return n !== dest.n; });
            reels[i].textContent = i === 2 ? dest.n : api.pick(near);
            reels[i].classList.add('m-hold-music-stopped'); api.sfx(i === 2 ? 'ding' : 'tick');
            if (i === 2) {
              S.speechFull = 'Transferring you to ' + dest.n + '.'; U.speech.textContent = S.speechFull; U.live.textContent = S.speechFull;
              mt(function () {
                if (dest.n === 'Department of Toast') { S.toastSeen = true; api.say(L.cameo[5], { who: 'The Toaster', priority: 1 }); }
                if (dest.who === 'Gerald') api.say(dest.t, { who: 'Gerald', priority: 1 });
                present({ id: 'dest', kind: 'info', say: dest.t, opts: [{ k: '5', t: 'Acknowledge', to: 'main' }] }, {});
              }, 1200);
            }
          }, ms);
        });
      }
      function spinAgain() {
        if (!S.xfer) return;
        if (S.xfer.skips >= 3) { setReact(TRANSFER_SHOWN); return; }
        S.xfer.skips++; S.token++;
        S.mt.forEach(function (id) { api.clearTimeout(id); }); S.mt = [];
        S.mi.forEach(function (id) { api.clearInterval(id); }); S.mi = [];
        runSpin(); setReact(TRANSFER_SKIP);
      }

      /* ------------------------------------------------------------- humans */
      function addCard(name, words, unique) {
        S.cards.unshift({ name: name, words: words, unique: !!unique });
        while (S.cards.length > 12) S.cards.pop();
        paintRol();
      }
      function paintRol() {
        const met = Math.min(12, S.met);
        U.rolBtn.textContent = 'Humans Met: ' + met + '/12 (Helpful: 0)';
        clearEl(U.pile);
        if (!S.cards.length) U.pile.appendChild(h('li', { text: 'No Humans met yet. They are shy. They are busy. They are on hold.' }));
        S.cards.forEach(function (c) {
          const li = h('li', { class: c.unique ? 'm-hold-music-breathe' : '' }, h('b', null, c.name + ': '), h('strong', null, c.words));
          U.pile.appendChild(li);
        });
        U.rolFoot.textContent = 'Interruption Ratio: ' + S.interruptions + ':' + S.pickups;
      }
      function toggleRol() {
        const open = U.pile.hidden;
        U.pile.hidden = !open; U.rolFoot.hidden = !open; U.rolBtn.setAttribute('aria-expanded', open ? 'true' : 'false'); paintRol();
      }
      function humanText(i) {
        const n = WORDS[i - 1], words = SENTENCE.slice(0, n).join(' ').replace(/[,?]$/, '');
        if (i === 1) return { say: 'Hel- please hold.', words: 'Hel-', name: 'Trevor' };
        return { say: words + '- please hold.', words: words, name: 'Trevor' };
      }
      function startHuman() {
        const idx = S.pickIdx++, i = idx + 1;
        setMode('human');
        let v = null, name = 'Trevor', say, words;
        if (S.season >= 2) { say = fill(bS2(), { player: api.player.name }); words = 'Hello again'; v = 's2'; }
        else {
          const std = humanText(i); say = std.say; words = std.words;
          if (i === 4) { if (api.flag.get('metGerald')) { say = GERALD_YES; name = 'Gerald'; words = 'Hello, this is Gerald'; v = 'gerald'; } else { say = GERALD_NO; name = 'Mr. G. Potato'; words = 'Not available'; v = 'potato'; } }
          else if (i === 6 && api.stat.get('complaints-dept.entered') > 0) { say = BRENDA; name = 'Brenda'; words = 'Brenda, Window 4'; v = 'brenda'; }
          else if ((i === 3 || i === 5 || i === 7) && api.chance(1 / 12)) { say = HOLD_TOO; name = 'Trevor (also on hold)'; words = 'Thank you for-'; v = 'held'; }
        }
        const H = S.human = { i: i, say: say, name: name, words: words, v: v, t0: api.now(), speakUntil: api.now() + (i === 1 ? 4500 : 3500), clickEnd: api.now() + 800, spoke: false, interrupted: false };
        S.pickups++; S.met++; api.stat.inc('hold-music.pickups');
        setReact(i === 1 ? 'The Human is listening. This is the only chance. It is not a good chance. (SPEAK, or the S key.)' : '');
        const bub = h('div', { class: 'm-hold-music-bubble', 'aria-hidden': 'true' }), txt = h('span'), tail = h('small'), stamp = h('span', { class: 'm-hold-music-stamp', text: 'PLEASE HOLD' });
        bub.appendChild(txt); bub.appendChild(tail); bub.appendChild(stamp); if (i === 1) tail.textContent = 'You may speak now. This is a brief window.';
        U.extra.appendChild(bub);
        S.speechFull = '(click) A Human has picked up.'; U.speech.textContent = S.speechFull; U.live.textContent = 'A Human has picked up. They are about to speak.';
        U.extra.appendChild(U.speak); U.speak.hidden = false;
        api.sfx('pop'); addLog('HUMAN #' + i);
        api.say(i === 1 ? L.human[0] : (i === 4 ? L.human[3] : bHum()), { mood: 'confused', priority: 1 });
        mt(function () { U.speak.hidden = true; }, i === 1 ? 4500 : 3500);
        mt(function () {
          if (H.interrupted) return;
          const ws = say.split(' '); let k = 0;
          mi(function () {
            k++; txt.textContent = ws.slice(0, k).join(' ');
            if (k >= ws.length) finishHuman(H, stamp, tail);
          }, 180);
        }, 800);
      }
      function finishHuman(H, stamp, tail) {
        S.mi.forEach(function (id) { api.clearInterval(id); }); S.mi = [];
        if (H.v === 'gerald') api.say(H.say, { who: 'Gerald', priority: 1 });
        stamp.classList.add('m-hold-music-on'); api.sfx('stamp');
        if (!H.spoke) { api.award(0.2, 'human'); mt(function () { if (!H.spoke) setReact(SPEAK_NONE); }, Math.max(0, H.speakUntil - api.now())); }
        completeHuman(H, tail);
      }
      function completeHuman(H, tail) {
        const wn = H.interrupted ? 0 : WORDS[H.i - 1];
        api.stat.max('hold-music.words', wn);
        S.lastHumanWords = H.words;
        if (wn > (api.save.get('maxWords', 0) || 0)) api.save.set('maxWords', wn);
        addCard(H.name, H.interrupted ? '(interrupted)' : H.words, false);
        if (H.i >= 5 && !H.interrupted && S.season === 1) api.achieve('hold-music.almost-heard');
        if (H.v === 'held') { S.heldToo = true; api.award(3, 'on hold too'); mt(function () { api.sfx('pop'); tail.textContent = HOLD_TOO_FAINT; }, 2000); }
        else if (!H.interrupted && wn >= 3 && api.chance(0.5)) tail.textContent = bTail();
        if (H.i === 5) api.say(L.cameo[3], { mood: 'smug', priority: 0 }); else if (H.v === 'held') api.say(L.human[4], { mood: 'confused', priority: 0 }); else if (!H.interrupted && H.v !== 'gerald' && api.chance(0.4)) api.say(L.human[1], { mood: 'neutral', priority: 0 });
        mt(function () { present(S.node || makeMain(), { silent: true }); }, H.v === 'held' ? 4200 : H.i === 1 ? 3400 : 2200);
      }
      function speak() {
        const H = S.human;
        if (S.mode !== 'human' || !H || H.spoke || api.now() > H.speakUntil) return;
        touch(); H.spoke = true;
        if (api.now() < H.clickEnd) {
          H.interrupted = true; S.interruptions++; api.stat.inc('hold-music.interruptions');
          S.mt.forEach(function (id) { api.clearTimeout(id); }); S.mt = [];
          const bub = U.extra.firstChild; bub.firstChild.textContent = INTERRUPTED;
          setReact('(interrupted)'); api.sfx('stamp'); api.award(0.1, 'interruption');
          U.speak.hidden = true; completeHuman(H, bub.children[1]);
        } else { api.award(0.5, 'spoke'); setReact(SPEAK_OK); api.sfx('blip'); }
        U.speak.hidden = true;
      }

      /* ------------------------------------------------------------- secrets: extension, crossed line, yourself */
      function startExt() {
        setMode('ext'); S.ext = { t0: api.now() };
        S.speechFull = EXT_RING; U.speech.textContent = EXT_RING; U.live.textContent = EXT_RING;
        setReact(''); api.sfx('bell');
        U.extra.appendChild(h('div', { class: 'm-hold-music-plaque m-hold-music-in', 'aria-hidden': 'true' }, '☎ 7 1/2 ☎'));
        mt(function () {
          api.say(L.secret[0], { mood: 'smug', priority: 2 });
          api.award(7.5, 'extension 7 1/2'); api.achieve('hold-music.pontiff');
          mt(function () { api.say(L.secret[1], { mood: 'proud', priority: 1 }); }, 2600);
        }, 7500);
        mt(function () { endExt(); }, 12000);
        addLog('EXT 7 1/2');
      }
      function endExt() { if (S.mode !== 'ext') return; S.nextPing = Math.max(S.nextPing, S.sim + 5); present(S.node || makeMain(), { silent: true }); }
      function startCross() {
        setMode('cross'); S.crossDone = true; S.crossCap = true; paintNotes('👤');
        S.cross = { listened: false };
        setReact('');
        type(CROSS_ANNOUNCE, null);
        U.extra.appendChild(h('button', { type: 'button', class: 'm-hold-music-btn m-hold-music-big', onclick: function () { listenIn(); } }, 'Press # to listen in'));
        const box = h('div', { class: 'm-hold-music-bubble', 'aria-live': 'polite', text: '' }); U.extra.appendChild(box);
        S.cross.box = box;
        mt(function () { box.textContent = CROSS[0]; api.sfx('tick'); }, 2200);
        mt(function () { box.textContent = CROSS[1]; api.sfx('tick'); }, 4400);
        mt(function () { endCross(); }, 8000);
        api.say('Crossed line detected. Please do not take sides. Sides have been taken.', { mood: 'confused', priority: 1 });
        addLog('CROSSED LINE');
      }
      function endCross() { S.crossCap = false; paintNotes(T_GLYPH[S.tier]); if (S.mode === 'cross') present(S.node || makeMain(), { silent: true }); }
      function listenIn() {
        if (S.mode !== 'cross' || S.cross.listened) return;
        S.cross.listened = true; touch();
        S.token++; S.mt.forEach(function (id) { api.clearTimeout(id); }); S.mt = [];
        api.achieve('hold-music.eavesdropper'); api.sfx('pop');
        const box = S.cross.box;
        [1, 2, 3].forEach(function (li, n) { mt(function () { box.textContent = CROSS[li]; api.sfx('tick'); }, 300 + n * 2200); });
        mt(function () {
          box.textContent = '(click) Dial tone.'; setStatus('DIAL TONE'); api.sfx('sad');
          api.say(L.secret[2], { mood: 'confused', priority: 1 });
          mt(function () { S.call++; S.callSim = 0; S.crossCap = false; paintNotes(T_GLYPH[S.tier]); addLog('HUNG UP ON'); present(makeMain(), { react: 'You have been hung up on. Welcome back to the same call.' }); }, 1200);
        }, 300 + 3 * 2200);
      }
      function dialYourself() {
        resetOffsetTo(4000001); S.noDelta = true; S.behind = true; U.behindTag.textContent = '(BEHIND YOU)';
        api.award(3, 'dialed yourself'); api.sfx('bell');
        api.say(L.secret[3], { mood: 'confused', priority: 2 });
        present({ id: 'self', kind: 'info', say: YOURSELF.join('\n'), opts: [{ k: '5', t: 'Acknowledge', to: 'main' }] }, {});
        addLog('DIALED SELF');
        api.setTimeout(function () { S.behind = false; U.behindTag.textContent = ''; S.offset = 0; api.say(L.secret[4], { mood: 'proud', priority: 1 }); }, 6500);
      }

      /* ------------------------------------------------------------- Marguerite and the strip */
      function bubble(who, text, ms, pr) {
        S.bub[who] = { text: text, until: api.now() + ms, at: api.now() }; paintStrip();
        const nm = who === 'marg' ? 'Marguerite' : who === 'lio' ? 'Lionel' : '';
        if (nm) { U.live2.textContent = nm + ': ' + text; api.say(text, { who: nm, mood: 'neutral', priority: pr == null ? 1 : pr }); }
        else if (!S.youSaid) { S.youSaid = true; api.say(text, { who: (api.player && api.player.name) || 'Valued Employee', mood: 'neutral', priority: 0 }); }
      }
      /* the strip is below the fold: the newest bubble is repeated inside the prompt card */
      function paintOver() {
        let w = null;
        ['marg', 'lio', 'you'].forEach(function (k) { const b = S.bub[k]; if (b && api.now() < b.until && (!w || b.at > S.bub[w].at)) w = k; });
        const offer = !w && S.margOffer;
        clearEl(U.over); U.over.hidden = !w && !offer;
        if (U.over.hidden) return;
        const nm = (offer || w === 'marg') ? 'Marguerite' : w === 'lio' ? 'Lionel' : ((api.player && api.player.name) || 'Valued Employee');
        U.over.appendChild(h('span', null, h('b', null, nm + ': '), offer ? '(Marguerite is looking at you, hopefully.)' : S.bub[w].text));
        if (S.margOffer && nm === 'Marguerite') U.over.appendChild(h('button', { type: 'button', class: 'm-hold-music-btn', onclick: function () { margReply(); } }, 'Hi Marguerite'));
      }
      function paintStrip() { paintOver();
        const names = [];
        const you = api.player && api.player.name ? api.player.name : 'Valued Employee';
        const mg = S.marg || S.beat >= 5;
        const mgTag = S.sim < S.margSwapUntil ? 'Marguerite 4,000,000' : 'Marguerite';
        if (S.season >= 3) names.push(['Caller', ''], [mgTag, 'marg'], [you + ' (ahead)', 'you2']);
        else names.push(['Caller', ''], S.beat >= 3 ? [S.lionelDone ? 'Lionel (finished sandwich)' : 'Lionel (has a sandwich)', 'lio'] : ['Caller', ''], [mg ? mgTag : 'Caller', mg ? 'marg' : '']);
        names.push(['YOU', 'me'], [S.lanyard ? 'Carol (Lanyard)' : (S.carol ? 'Carol' : 'Caller'), ''], ['Caller', ''], ['Caller', ''], ['Also caller', '']);
        if (S.clerUntil && S.sim < S.clerUntil) { const mi0 = names.findIndex(function (x) { return x[1] === 'me'; }); names.unshift(names.splice(mi0, 1)[0]); }
        U.slots.forEach(function (o, i) {
          const n = names[i] || ['Caller', ''];
          o.tag.textContent = (n[1] === 'me' ? 'YOU' : n[0]) + (S.nap && (n[1] === '' || n[1] === 'lio') ? ' zzz' : '');
          o.gl.textContent = S.concert ? ['🎷', '🥁', '🎺'][i % 3] : '👤';
          o.slot.className = 'm-hold-music-slot' + (n[1] === 'me' ? ' m-hold-music-you' : '') + (n[1] === 'marg' ? ' m-hold-music-named' : '') + (i < S.lit ? ' m-hold-music-lit' : '');
          let bt = '';
          if (n[1] === 'marg' && S.bub.marg && api.now() < S.bub.marg.until) bt = S.bub.marg.text;
          if (n[1] === 'you2' && S.bub.you && api.now() < S.bub.you.until) bt = S.bub.you.text;
          if (n[1] === 'lio' && S.bub.lio && api.now() < S.bub.lio.until) bt = S.bub.lio.text;
          o.bub.hidden = !bt; if (bt) o.bub.textContent = bt;
          o.reply.hidden = !(n[1] === 'marg' && S.margOffer);
        });
      }
      function margReply() {
        if (!S.margOffer) return;
        S.margOffer = false; touch(); api.award(0.5, 'Marguerite'); api.sfx('pop');
        MARG.story.forEach(function (t, i) { api.setTimeout(function () { bubble('marg', t, 3600, 1); }, i * 3000); });
        paintStrip();
      }

      /* ------------------------------------------------------------- music */
      function tierNow() {
        if (S.fin) return 9;
        if (S.sim >= 450) return 8;
        if (S.season >= 2) return 7;
        if (S.licensed && S.sim >= 60) return 7;
        const s = S.sim;
        return s < 60 ? 1 : s < 120 ? 2 : s < 240 ? 3 : s < 300 ? 4 : s < 390 ? 5 : 6;
      }
      function setTier(t, quiet) {
        const old = S.tier; S.tier = t; S.tierSteps = 0; paintNotes(T_GLYPH[t]); paintCaption();
        if (quiet || S.season > 1) return;
        const m = { 2: 0, 3: 1, 5: 3, 6: 2 }[t];
        if (m != null && t > old) api.say(L.music[m], { mood: 'neutral', priority: 0 });
      }
      function silentNow() { return S.mode === 'ext' || S.mode === 'cross' || S.mode === 'down' || (S.fin && S.fin.phase !== 'approach'); }
      function musicStep() {
        S.step = (S.step + 1) % 16; S.stepAt = api.now(); S.stepsTotal++; S.tierSteps++;
        if (S.step === 0) S.bars++;
        const st = S.step, t = S.tier, dip = S.idleSim >= 30;
        let name = null;
        if (t === 1) name = st % 8 === 0 ? 'bloop' : st % 4 === 0 ? 'blip' : null;
        else if (t === 2 || t === 3 || t === 4) {
          name = st % 8 === 0 ? 'bloop' : st % 4 === 0 ? 'blip' : 'tick';
          if (t >= 3 && (st === 0 || st === 10)) name = 'bell';
          if (t === 4 && st === 0) name = 'sad';
        } else if (t === 5) name = st % 2 === 0 ? 'tick' : null;
        else if (t === 6) { if (S.tierSteps === 65) { name = 'pop'; paintNotes('🔔'); } }
        else if (t === 7) { const r = S.rhythm.length ? S.rhythm : [0, 3, 6, 8, 11, 14]; name = r.indexOf(st) >= 0 ? 'bloop' : st % 4 === 0 ? 'tick' : null; }
        else if (t === 8) name = st % 4 === 0 ? 'bloop' : null;
        else if (t === 9) { name = 'tick'; if (st === 4 || st === 12) name = 'blip'; if (st === 0 || st === 8) name = 'bell'; if (st === 0) name = 'bloop'; }
        const quiet = silentNow() || (t === 6 && S.tierSteps <= 64);
        if (name && !quiet && !(dip && name !== 'tick')) api.sfx(name);
        const amp = quiet ? 0.06 : (t === 9 ? 1 : t === 8 ? 0.6 : t === 6 ? 0.1 : 0.8) * (S.vol / 7 + 0.15) * (dip ? 0.5 : 1);
        const rm = root.ownerDocument.body.classList.contains('pm-reduce-motion');
        if (!rm || st % 4 === 0) U.eq.forEach(function (b) {
          const v = quiet ? 0.06 : (S.concert && st % 4 === 0 ? 1 : clamp(0.1 + api.rand() * 0.9 * amp + (st % 4 === 0 ? 0.2 * amp : 0), 0.05, 1));
          b.style.transform = 'scaleY(' + (Math.round(v * 100) / 100) + ')';
        });
        if (S.tapOn) { U.notesRow.classList.toggle('m-hold-music-bp', st % 4 === 0 && !quiet); if (st % 4 === 0 && !quiet) { U.tap.classList.remove('m-hold-music-pulse'); void U.tap.offsetWidth; U.tap.classList.add('m-hold-music-pulse'); } }
        if (st === 0 && S.tier === 3) paintCaption();
      }

      /* ------------------------------------------------------------- tap along */
      function tap() {
        if (!S.tapOn) { setReact('TAP ALONG is not available yet. It is still being approved by Sandra.'); return; }
        const now = api.now(); touch();
        S.tapTimes.push(now); while (S.tapTimes.length && now - S.tapTimes[0] > 3000) S.tapTimes.shift();
        const spam = S.tapTimes.length >= 14;
        const ph = (S.step % 4) * 125 + (now - S.stepAt), m = ((ph % 500) + 500) % 500, dist = Math.min(m, 500 - m);
        const qs = (S.step + Math.round((now - S.stepAt) / 125)) % 16;
        S.taps.push(qs); if (S.taps.length > 8) S.taps.shift();
        if (!spam && dist <= 105) {
          S.rapport = Math.min(100, S.rapport + 8); api.award(0.1, 'in time'); api.stat.inc('hold-music.taps'); api.sfx('tick');
          if (api.chance(0.18)) api.say(L.tap[0].replace('{count}', String(Math.round(S.rapport))), { priority: 0 });
          if (S.rapport >= 70) S.rapHi = true;
          if (S.rapport >= 50 && !S.rap50) { S.rap50 = true; api.say(L.tap[2], { mood: 'proud', priority: 0 }); }
          if (S.rapport >= 100 && !S.licensed) license();
        } else {
          S.rapport = Math.max(0, S.rapport - 3); wince();
          if (spam) { if (now - S.tapSpamAt > 3000) { S.tapSpamAt = now; api.say(bTapSpam(), { mood: 'confused', priority: 1 }); } }
          else if (api.chance(0.35)) api.say(api.pick([L.tap[1], L.tap[3]]), { priority: 0 });
        }
        paintHeart();
      }
      function wince() { const n = U.notes[api.randInt(0, 11)]; n.classList.remove('m-hold-music-wince'); void n.offsetWidth; n.classList.add('m-hold-music-wince'); api.setTimeout(function () { n.classList.remove('m-hold-music-wince'); }, 420); }
      function paintHeart() { S.heartR = Math.round(S.rapport); U.heartTxt.textContent = '♥ ' + Math.round(S.rapport); U.heartTxt.style.transform = 'scale(' + (1 + S.rapport / 160) + ')'; }
      function license() {
        S.licensed = true;
        const r = S.taps.slice(); while (r.length < 8) r.push([0, 3, 6, 8, 11, 14][r.length % 6]);
        S.rhythm = r.slice(-8); api.save.set('rhythm', S.rhythm);
        api.say(L.tap[4], { mood: 'proud', priority: 1 }); api.award(1, 'licensed'); api.sfx('fanfare');
        S.rapport = 40;
        S.concert = true; U.strip.classList.add('m-hold-music-jamming'); paintStrip(); paintCaption(); api.confetti();
        if (S.beat >= 3 && S.season < 3) bubble('lio', 'I am not dancing. This is how I stand.', 6000);
        api.setTimeout(function () { S.concert = false; U.strip.classList.remove('m-hold-music-jamming'); paintStrip(); paintCaption(); }, 8000);
      }

      /* ------------------------------------------------------------- the handset and cord */
      function layoutCord(reset) {
        const w = U.cordbox.clientWidth || 300, hgt = U.cordbox.clientHeight || 150;
        S.boxW = w; S.boxH = hgt; S.base = { x: Math.round(w * 0.3), y: Math.round(hgt / 2) };
        U.svg.setAttribute('width', String(w)); U.svg.setAttribute('height', String(hgt));
        U.cradle.setAttribute('x', String(S.base.x - 42)); U.cradle.setAttribute('y', String(S.base.y + 8));
        if (reset || !S.hx) { S.hx = S.base.x; S.hy = S.base.y; }
        else {
          let x = clamp(S.hx, 24, Math.max(24, w - 24)), y = clamp(S.hy, 16, Math.max(16, hgt - 16));
          const dx = x - S.base.x, dy = y - S.base.y, dist = Math.hypot(dx, dy), mx = maxPx();
          if (dist > mx) { x = S.base.x + dx * mx / dist; y = S.base.y + dy * mx / dist; }
          S.hx = x; S.hy = y;
        }
        placeHandset(); drawCord();
      }
      function placeHandset() { U.handset.style.left = S.hx + 'px'; U.handset.style.top = S.hy + 'px'; }
      function maxPx() { return Math.max(40, Math.min(0.8 * S.boxW, 0.7 * S.boxW - 30)); }
      function stretchFt() { return clamp(Math.hypot(S.hx - S.base.x, S.hy - S.base.y) / maxPx() * 7.5, 0, 7.5); }
      function drawCord() {
        const bx = S.base.x, by = S.base.y + 6, hx = S.hx, hy = S.hy, dx = hx - bx, dy = hy - by, len = Math.hypot(dx, dy) || 1, nx = -dy / len, ny = dx / len, tx = dx / len, ty = dy / len;
        const amp = Math.min(9, 3 + len / 14); let d = '';
        for (let i = 0; i <= 84; i++) {
          const t = i / 84, a = t * 14 * Math.PI * 2, x = bx + dx * t + nx * Math.sin(a) * amp + tx * (Math.cos(a) - 1) * amp * 0.8, y = by + dy * t + ny * Math.sin(a) * amp + ty * (Math.cos(a) - 1) * amp * 0.8;
          d += (i ? 'L' : 'M') + x.toFixed(1) + ' ' + y.toFixed(1);
        }
        U.cord.setAttribute('d', d); U.cordShadow.setAttribute('d', d);
        [0.3, 0.5, 0.7].forEach(function (t, i) { U.knots[i].setAttribute('cx', (bx + dx * t).toFixed(1)); U.knots[i].setAttribute('cy', (by + dy * t).toFixed(1)); U.knots[i].style.display = S.tangled ? '' : 'none'; });
      }
      function moveHandset(x, y) {
        x = clamp(x, 24, S.boxW - 24); y = clamp(y, 16, S.boxH - 16);
        let dx = x - S.base.x, dy = y - S.base.y; const dist = Math.hypot(dx, dy), mx = maxPx();
        if (dist > mx) { dx *= mx / dist; dy *= mx / dist; x = S.base.x + dx; y = S.base.y + dy; }
        S.hx = x; S.hy = y; placeHandset();
        const ft = stretchFt(); U.meter.textContent = 'Cord: ' + ft.toFixed(1) + ' ft';
        if (ft > S.maxStretch) S.maxStretch = ft;
        api.stat.max('hold-music.cord', Math.round(ft * 10));
        if (ft >= 7.4) {
          if (!S.taut) { S.taut = true; api.sfx('bloop'); if (api.now() - S.tautAt > 20000) { S.tautAt = api.now(); api.say(L.cord[0], { mood: 'confused', priority: 0 }); } }
        } else if (ft < 7) S.taut = false;
        const dd = Math.hypot(S.hx - S.base.x, S.hy - S.base.y);
        if (dd > 25) {
          const ang = Math.atan2(S.hy - S.base.y, S.hx - S.base.x);
          if (S.lastAng != null) { let da = ang - S.lastAng; while (da > Math.PI) da -= 2 * Math.PI; while (da < -Math.PI) da += 2 * Math.PI; S.orbit += da; }
          S.lastAng = ang;
          if (Math.abs(S.orbit) >= 4 * Math.PI && !S.tangled) { S.tangled = true; api.say(L.cord[1], { mood: 'confused', priority: 1 }); api.achieve('hold-music.tangled'); api.sfx('boing'); }
        } else S.lastAng = null;
        drawCord();
      }
      function dragStart(e) {
        if (!S.cordOn) return;
        try { U.handset.setPointerCapture(e.pointerId); } catch (err) { /* synthetic events have no active pointer */ }
        U.handset.classList.remove('m-hold-music-snap');
        S.drag = true; S.lastAng = null; touch();
      }
      function dragMove(e) {
        if (!S.drag) return;
        if (e.pointerType === 'mouse' && e.buttons === 0) { dragEnd(e); return; }
        const r = U.cordbox.getBoundingClientRect(); moveHandset(e.clientX - r.left, e.clientY - r.top);
      }
      function dragEnd(e) {
        if (!S.drag) return;
        try { U.handset.releasePointerCapture(e.pointerId); } catch (err) { /* nothing captured */ }
        S.drag = false; release(false);
      }
      function release(keep) {
        const dd = Math.hypot(S.hx - S.base.x, S.hy - S.base.y);
        if (dd <= 0.08 * maxPx() && S.maxStretch > 3) {
          U.handset.classList.add('m-hold-music-snap'); S.hx = S.base.x; S.hy = S.base.y; placeHandset();
          api.setTimeout(function () { U.handset.classList.remove('m-hold-music-snap'); }, 260);
          api.sfx('boing');
          if (api.now() - S.snapAt > 20000) { S.snapAt = api.now(); api.award(0.3, 'snap-back'); api.say(L.cord[2], { priority: 0 }); }
          S.maxStretch = 0; S.orbit = 0; S.lastAng = null; S.tangled = false; S.taut = false;
          U.meter.textContent = 'Cord: 0.0 ft'; drawCord();
        } else if (!keep) { S.maxStretch = Math.min(S.maxStretch, 3); }
      }
      function handsetKey(e) {
        const k = e.key, m = { ArrowLeft: [-12, 0], ArrowRight: [12, 0], ArrowUp: [0, -12], ArrowDown: [0, 12] }[k];
        if (!m) return;
        if (!S.cordOn) return;
        e.preventDefault();
        touch(); U.handset.classList.remove('m-hold-music-snap');
        moveHandset(S.hx + m[0], S.hy + m[1]); release(true);
      }
      function shiftEar() {
        S.earRight = !S.earRight; U.earLab.textContent = S.earRight ? 'EAR R' : 'EAR L'; touch();
        if (S.cordOn) { S.lastAng = null; moveHandset(S.boxW - S.hx, S.hy); S.lastAng = null; }
        const tn = api.now(); S.earTimes.push(tn); while (S.earTimes.length && tn - S.earTimes[0] > 6000) S.earTimes.shift();
        const flurry = S.earTimes.length >= 5; if (flurry) S.earTimes = [];
        api.sfx('pop'); api.say(flurry ? api.pick(X.ear) : L.cord[3], { mood: 'confused', priority: flurry ? 1 : 0 });
      }

      /* ------------------------------------------------------------- beats */
      function etaText() {
        if (S.fin) return 'SOON';
        if (S.season >= 2) return '11 centuries (again)';
        const b = S.beat;
        return b <= 1 ? '11 CENTURIES' : b === 2 ? '11 Centuries' : b === 3 ? '11 centuries' : b <= 5 ? '11 centuries, +/- a Tuesday' : b <= 7 ? '11 centuries and a bit' : '11 centuries (...)';
      }
      function cameos() {
        if (S.cameoDone) return; S.cameoDone = true;
        const list = [];
        if (api.stat.get('modules.entered') >= 6) list.push(L.cameo[0]);
        if (api.stat.get('elevator-simulator.entered') > 0) list.push(L.cameo[1]);
        if (api.stat.get('toaster-debate.entered') > 0) list.push('The Toaster has been told that you called. The Toaster has been toasted.');
        if (api.stat.get('complaints-dept.entered') > 0) list.push('Window 4 has noted your previous visit. Window 4 is a drawing of a window. It remembers you anyway.');
        if (api.stat.get('fax-machine.entered') > 0) list.push(Y.cam[0]);
        if (api.stat.get('sock-matcher.entered') > 0 || ['cloud-gazer', 'complaints-dept', 'museum-of-objects', 'pet-rock'].some(function (m) { return api.flag.get(m + '.sockSeen'); })) list.push(Y.cam[1]);
        if (api.stat.get('wait-for-it.entered') > 0) list.push(Y.cam[2]);
        if (api.flag.get('metDennis')) list.push(Y.cam[3]);
        if (!list.length) list.push(L.cameo[2]);
        api.shuffle(list).slice(0, 3).forEach(function (t, i) { api.setTimeout(function () { api.say(t, { mood: 'smug', priority: 0 }); }, 11000 + i * 7000); });
      }
      function fireBeat(b, quiet) {
        S.beatFired[b] = true;
        if (b >= 2 && b <= 9 && !quiet && S.season === 1) api.say(L.beat[b - 2], { mood: b === 8 ? 'smug' : b === 9 ? 'proud' : 'neutral', priority: 1 });
        if (b === 3) { U.rolBtn.hidden = false; paintRol(); }
        if (b === 4) {
          S.tapOn = true; S.cordOn = true; U.tap.removeAttribute('aria-disabled'); U.tap.classList.remove('m-hold-music-dim'); U.tap.textContent = 'TAP ALONG'; U.meter.hidden = false; U.handset.classList.add('m-hold-music-live'); U.handset.style.cursor = 'grab'; U.cordbox.hidden = false; U.handset.tabIndex = 0;
          if (!quiet && !S.tapAnnounced) { S.tapAnnounced = true; api.sfx('fanfare'); api.setTimeout(function () { api.sfx('boing'); }, 500); setReact('TAP ALONG is open. Tap when the notes bounce. The handset is also detachable: please detach it a little.'); }
          layoutCord(true);
        }
        if (b === 5) { S.marg = true; if (!quiet) cameos(); }
        if (b === 7 && !S.recountDone) { S.recountDone = true; if (!quiet) { setReact(fill(BEAT7_RECOUNT, { pos: f(curPos()) })); U.reason.textContent = fill(BEAT7_RECOUNT, { pos: f(curPos()) }); api.say(L.recount[0], { priority: 0 }); api.setTimeout(function () { api.say(L.recount[1], { priority: 0 }); }, 9000); } }
        if (b === 8 && S.met > 0 && !S.margTrevor && !quiet) { S.margTrevor = true; bubble('marg', MARG.trevor, 6000); }
        if (b === 9 && !quiet) {
          bubble('marg', MARG.choir, 6000);
          for (let i = 1; i <= 8; i++) api.setTimeout(function () { S.lit = i; paintStrip(); api.sfx('tick'); }, i * 400);
        }
        paintStrip();
      }
      function startApproach() {
        setMode('finale'); S.fin = { phase: 'approach', t: 0, pos: 3997000 };
        U.desk.classList.add('m-hold-music-tilt');
        api.say(L.beat[8], { mood: 'proud', priority: 1 });
        S.speechFull = FINAL_APPROACH; U.speech.textContent = FINAL_APPROACH; U.live.textContent = FINAL_APPROACH; setReact('');
        addLog('FINAL APPROACH');
      }
      function startSentence() {
        const F = S.fin; F.phase = 'sentence'; F.pos = 1;
        U.desk.classList.remove('m-hold-music-tilt');
        api.sfx('pop'); paintNotes(''); setReact('Congratulations. You are caller number 1. This is the front of the line. The line has no front. Please hold.');
        S.speechFull = '(click)'; U.speech.textContent = '(click)'; U.live.textContent = 'The line connects. Trevor is about to speak.';
        const bub = h('div', { class: 'm-hold-music-bubble', 'aria-hidden': 'true' }), txt = h('span'), stamp = h('span', { class: 'm-hold-music-stamp', text: 'PLEASE HOLD' });
        bub.appendChild(txt); bub.appendChild(stamp); U.extra.appendChild(bub);
        const full = (S.season >= 2 ? 'Oh, you came back to this. ' : '') + SENTENCE.join(' ');
        const ws = full.split(' '); let k = 0;
        mt(function () {
          mi(function () {
            k++; txt.textContent = ws.slice(0, k).join(' ');
            if (k >= ws.length) {
              S.mi.forEach(function (id) { api.clearInterval(id); }); S.mi = [];
              U.live.textContent = full;
              const box = h('div', { class: 'm-hold-music-opts' });
              ['I would like to speak to a manager', 'I forgot', 'Nothing, I just wanted to be on hold'].forEach(function (t, i) { box.appendChild(h('button', { type: 'button', class: 'm-hold-music-opt', onclick: function () { reply(i, txt, stamp); } }, t)); });
              U.extra.appendChild(box); F.box = box;
              mt(function () { reply(1, txt, stamp); }, 20000);
            }
          }, 180);
        }, 900);
      }
      function reply(i, txt, stamp) {
        const F = S.fin; if (!F || F.phase !== 'sentence') return;
        F.phase = 'done'; touch();
        if (F.box) F.box.remove();
        const fr = FIN_REPLIES[i] || FIN_REPLIES[1]; txt.textContent = fr; U.live.textContent = fr; stamp.classList.add('m-hold-music-on'); api.sfx('stamp');
        const plaque = h('div', { class: 'm-hold-music-plaque', 'aria-live': 'polite' }, 'YOU HAVE BEEN CONNECTED. TO THE QUEUE.');
        U.extra.appendChild(plaque);
        mt(function () { plaque.classList.add('m-hold-music-in'); }, 100);
        mt(function () {
          api.say(L.end[S.finishes > 1 ? 5 : S.finishes > 0 ? 2 : 0], { mood: 'proud', priority: 2 });
          api.sfx('fanfare'); api.confetti(); api.award(5, 'caller number 1');
          api.achieve('hold-music.season-two');
          S.finishes++; api.save.set('seasons', S.finishes); api.flag.set('hold-music.reachedOne', true);
          api.setTimeout(function () { api.say(L.end[1], { mood: 'proud', priority: 1 }); }, 2500);
        }, 1200);
        const ten = !S.tenDone && S.total >= 540; if (ten) api.setTimeout(function () { tenMin(true); }, 4600);
        mt(function () { nextSeason(); }, ten ? 13000 : 6200);
      }
      function nextSeason() {
        S.season++; S.fin = null; S.sim = 60; S.cbAt = -999; S.nextAmb = 80; S.clerUntil = 0; S.clerAt = 0; S.offset = 0; resetOffsetTo(4000000); S.beatFired = { 1: true, 2: true }; S.beat = 3;
        S.pickIdx = 0; rollPicks(); S.nextPing = S.sim + 30; S.crossAt = 180; S.lit = 0; S.fracUntil = 0; U.frac.textContent = ''; S.cameoDone = true; S.recountDone = false; S.margTrevor = false;
        if (S.reorg === 1) swapKeys(); S.reorg = 0; S.lanyard = S.season >= 2; S.carol = true; S.firstZero = true; S.relabel1 = true; S.idleSim = 0; S.idleFlags = {}; S.goAheadDone = false;
        api.stat.max('hold-music.season', S.season); U.desk.classList.remove('m-hold-music-tilt');
        U.seasonLab.textContent = 'SEASON ' + S.season + ': CALLBACK';
        const pl = api.player.name;
        api.say(S.season >= 3 ? L.end[4] : api.pick([L.season[0], L.season[1].replace('{player}', pl), L.season[2], L.end[3].replace('{count}', String(S.season))]), { mood: 'smug', priority: 2 });
        if (S.season === 2) bubble('marg', MARG.s2, 7000);
        paintStrip(); setTier(tierNow(), true);
        present(makeMain(), { pre: ['Welcome back, ' + pl + '. Press 1 if you are returning.'] });
      }
      function rollPicks() {
        S.pickAt = PICK_AT.map(function (t) { return t + api.randInt(0, 15); });
        while (S.pickIdx < S.pickAt.length && S.pickAt[S.pickIdx] < S.sim) S.pickIdx++;
      }

      /* ------------------------------------------------------------- landmarks: the 3 minute pin, the 10 minute speech, and a new quip every ~20 seconds */
      function threeMin() {
        S.threeDone = true; S.lionelDone = true; paintStrip();
        if (S.idleSim >= 30) return;
        api.sfx('fanfare'); api.award(1.8, 'long service'); addLog('LONG SERVICE');
        if (S.mode === 'ivr') setReact(THREE_REACT);
        api.say(THREE_SAY, { mood: 'proud', priority: 2 });
        api.toast('Long Service Pin: 3 minutes');
        api.setTimeout(function () { bubble('lio', LIONEL_DONE, 7000); }, 5500);
      }
      function tenMin(fin) {
        S.tenDone = true; api.flag.set('hold-music.tenMinutes', true); api.stat.inc('hold-music.tenMinutes');
        api.sfx('tada'); api.confetti(); api.award(6, 'ten minutes'); addLog('10:00 TEN MINUTES');
        api.say(TEN_SAY, { mood: 'proud', priority: fin ? 1 : 2 });
        api.setTimeout(function () { if (api.flag.get('metGerald')) api.say(TEN_GERALD[0], { who: 'Gerald', priority: 1 }); else api.say(TEN_GERALD[1], { mood: 'confused', priority: 1 }); }, fin ? 10000 : 6500);
      }
      function ambient() {
        if (S.sim < S.nextAmb || S.fin) return;
        if (S.mode !== 'ivr' || S.idleSim >= 30 || api.now() - S.lastSayAt < 7000) { S.nextAmb = S.sim + 2; return; }
        S.nextAmb = S.sim + api.randInt(18, 26);
        const b = S.beat, ph = S.season >= 2 ? 'e' : b <= 2 ? 'a' : b <= 4 ? 'b' : b <= 7 ? 'c' : 'd';
        api.say(bAmb[ph](), { mood: ph === 'c' ? 'confused' : ph === 'd' ? 'proud' : 'neutral', priority: 0 });
      }

      /* ------------------------------------------------------------- the clock */
      function tick() {
        const now = api.now(), rdt = clamp(now - S.last, 0, 1000); S.last = now;
        const dt = rdt / 1000 * SPEED;
        const down = S.mode === 'down';
        if (!down) {
          S.sim += dt; S.idleSim += dt; S.sinceHangup += dt; S.callSim += dt;
          S.offset *= Math.pow(0.5, dt / 45);
          S.rapport = Math.max(0, S.rapport - dt / 3);
        }
        if (S.ringEnd) {
          if ((S.mode === 'ivr' || S.mode === 'ping' || S.mode === 'survey') && !U.voiceBox.hidden && U.input.value) S.ringEnd += rdt;
          const rem = S.ringEnd - now; setRing(100 * Math.max(0, rem) / S.ringTotal);
          if (rem <= 0) { const k = S.ringKind; S.ringEnd = 0; setRing(0); if (k === 'ping') pingFail(); else if (k === 'cb') cbMiss(); else if (k === 'sv') svNext(null); else timeoutIvr(); }
        }
        if (S.mode === 'ivr' && S.node && S.node.kind === 'hold' && S.hold) { const p = Math.min(100, (now - S.hold.t0) / 30); if (Math.round(p) !== S.holdPct) { S.holdPct = Math.round(p); U.holdBtn.style.setProperty('--p', String(S.holdPct)); } }
        else if (S.holdPct !== 0) { S.holdPct = 0; U.holdBtn.style.setProperty('--p', '0'); }
        if (S.stickyOn && now >= S.stickyUntil) endSticky();
        if (Math.round(S.rapport) !== S.heartR) paintHeart();
        if (down) { paintStatus(); return; }
        S.beat = beatOf(S.sim); S.total += dt;
        for (let b = 1; b <= S.beat; b++) if (!S.beatFired[b]) fireBeat(b, b < S.beat);
        if (!S.threeDone && S.season === 1 && S.sim >= 200) threeMin();
        if (!S.tenDone && !S.fin && S.mode === 'ivr' && S.total >= 600 && (S.season === 1 || S.sim >= 100) && api.now() - S.lastSayAt > 5000) tenMin();
        if (!S.clerDone && S.season === 1 && S.sim >= 235 && S.mode === 'ivr' && S.idleSim < 30 && !S.fin) clerical();
        if (!S.cbDone && S.season === 1 && S.sim >= 330 && S.mode === 'ivr' && S.idleSim < 30 && !S.fin && !(S.clerUntil && S.sim < S.clerUntil)) callbackOffer();
        if (!S.tipDone && S.sim >= 90 && S.season === 1 && S.mode === 'ivr' && S.idleSim < 30) { S.tipDone = true; api.say('Management reminds you that you may use your keyboard. Management does not remind you which key.', { priority: 1 }); }
        if (S.clerUntil && S.sim >= S.clerUntil) { S.clerUntil = 0; api.say(CLER_END, { mood: 'confused', priority: 2 }); api.award(1, 'clerical error'); U.reason.textContent = CLER_END; clerEnd(); }
        if (S.gift && api.now() > S.gift) { S.gift = 0; if (S.mode === 'ivr' && S.node && S.node.kind !== 'voice') U.voiceBox.hidden = true; }
        ambient();
        if (!S.fin) { if (S.reorg === 0 && S.sim >= 345 && S.sim < 440 && S.mode === 'ivr' && S.idleSim < 30) reorg(true); else if (S.reorg === 1 && S.sim >= 450) reorg(false); }
        if (S.rapHi && S.rapport < 20) { S.rapHi = false; api.say(L.tap[5], { mood: 'disappointed', priority: 0 }); }
        const t = tierNow(); if (t !== S.tier) setTier(t);
        if (S.sim >= 150 && !S.fracDone && S.mode === 'ivr' && S.season === 1) { S.fracDone = true; S.fracUntil = S.sim + 8; U.frac.textContent = '1/4'; setReact(fill(FRACTION, { pos: f(curPos()) })); }
        if (S.fracUntil && S.sim >= S.fracUntil) { S.fracUntil = 0; U.frac.textContent = ''; }
        if (!S.chancel && S.sinceHangup >= 300) { S.chancel = true; api.achieve('hold-music.grand-chancellor'); }
        if (S.fin) finaleTick(dt);
        else {
          if (S.sim >= 540 && S.mode === 'ivr' && S.idleSim < 30) startApproach();
          else if (S.sim < 535) schedule();
        }
        idleLadder();
        for (const w in S.bub) if (S.bub[w] && api.now() >= S.bub[w].until) { S.bub[w] = null; delete S.bub[w]; paintStrip(); }
        if (S.margSwapUntil && S.sim >= S.margSwapUntil) { S.margSwapUntil = 0; paintStrip(); }
        paintOdo(curPos());
        paintStatus();
      }
      function paintStatus() {
        let s = 'MENU';
        const m = S.mode;
        if (m === 'down') s = S.cbDown ? (S.cbRing ? 'RINGING' : S.cbTalk ? 'ON THE LINE' : 'AWAITING CALLBACK') : 'DIAL TONE'; else if (m === 'ping') s = 'HOLDING'; else if (m === 'human') s = 'CONNECTING'; else if (m === 'transfer') s = 'TRANSFERRING'; else if (m === 'cb') s = 'PLEASE HOLD'; else if (m === 'survey') s = 'SURVEY';
        else if (m === 'cross') s = S.cross && S.cross.listened && S.statusTxt === 'DIAL TONE' ? 'DIAL TONE' : 'CROSSED'; else if (m === 'ext') s = 'EXT 7 1/2';
        else if (m === 'finale') s = S.fin && S.fin.phase === 'approach' ? (S.fin.hold ? 'PLEASE HOLD' : 'HOLDING') : 'CONNECTING';
        else if (S.idleSim >= 30 || (S.node && S.node.kind === 'hold')) s = 'HOLDING';
        setStatus(s);
        U.lcd.classList.toggle('m-hold-music-flash', !!(S.fin && S.fin.hold));
        const eta = etaText(); if (eta !== S.etaTxt) { S.etaTxt = eta; U.eta.textContent = eta; }
        const tt = mmss(S.callSim); if (tt !== S.timerTxt) { S.timerTxt = tt; U.timer.textContent = tt; U.callNo.textContent = 'CALL # ' + S.call; }
      }
      function finaleTick(dt) {
        const F = S.fin;
        if (F.phase !== 'approach') return;
        F.t += dt;
        const k = Math.min(1, F.t / 25), e = k < 0.5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2;
        F.pos = Math.max(1, Math.round(3997000 + (1 - 3997000) * e));
        if (k >= 1) { if (S.idleSim >= 30) { F.pos = 3; F.hold = true; } else { F.hold = false; startSentence(); } }
      }
      function schedule() {
        const busy = S.mode !== 'ivr';
        if (S.sim >= S.nextPing && S.sim >= 30) {
          if (busy) S.nextPing = S.sim + 3;
          else if (S.idleSim >= 30) { S.nextPing = S.sim + api.randInt(45, 75); setReact(L.idle[0]); }
          else startPing();
        }
        if (S.mode === 'ivr' && S.pickIdx < S.pickAt.length && S.sim >= S.pickAt[S.pickIdx]) {
          if (S.idleSim >= 30) { S.pickAt[S.pickIdx] = S.sim + 30; setReact(HUMAN_MISSED); api.say(L.human[2], { mood: 'disappointed', priority: 0 }); }
          else startHuman();
        } else if (busy && S.pickIdx < S.pickAt.length && S.sim >= S.pickAt[S.pickIdx] && S.mode !== 'down') S.pickAt[S.pickIdx] = S.sim + 3;
        if (S.mode === 'ivr' && S.sim >= 180 && S.sim >= S.crossAt) {
          S.crossAt += 20;
          if ((api.chance(1 / 25) || (!S.crossDone && S.sim >= 320)) && S.idleSim < 30) startCross();
        }
      }
      function idleLadder() {
        const i = S.idleSim, fl = S.idleFlags;
        if (i >= 30 && !fl[30]) { fl[30] = 1; api.say(L.idle[0], { mood: 'confused', priority: 0 }); if (S.mode === 'ivr') setReact(L.idle[0]); }
        if (i >= 60 && !fl[60]) { fl[60] = 1; S.marg = true; S.margOffer = true; S.margOfferUntil = api.now() + 3600000; bubble('marg', MARG.intro, 9000, 1); }
        if (i >= 90 && !fl[90]) { fl[90] = 1; if (S.beat >= 3 && S.season < 3) bubble('lio', 'Hey. Are you there? I have a sandwich. I would pass some back, but the queue does not allow food to move backward.', 8000, 1); }
        if (i >= 120 && !fl[120]) { fl[120] = 1; api.say(L.idle[1], { mood: 'confused', priority: 0 }); }
        if (i >= 150 && !fl[150]) { fl[150] = 1; api.say('Management is now whispering so as not to wake the line. The line is not asleep. The line is very still, which is its way.', { mood: 'neutral', priority: 0 }); }
        if (i >= 180 && !fl[180] && !S.goAheadDone) {
          fl[180] = 1; S.goAheadDone = true; S.goAhead = true; S.marg = true;
          bubble('marg', MARG.go, 9000, 1); resetOffsetTo(3999999); S.margSwapUntil = S.sim + 20;
          api.achieve('hold-music.marguerite'); api.flag.set('hold-music.wentAhead', true); api.award(2, 'you went ahead'); api.say(L.idle[4], { mood: 'disappointed', priority: 1 });
        }
        if (i >= 240 && !fl[240]) { fl[240] = 1; const rd = 'The menu has begun reading itself aloud to no one. It has reached press 3. It likes press 3. It has not told the others.'; if (S.mode === 'ivr') setReact(rd); api.say(rd, { mood: 'confused', priority: 0 }); }
        if (i >= 300 && !fl[300]) { fl[300] = 1; api.say(L.idle[2], { mood: 'neutral', priority: 1 }); }
        if (i >= 360 && !fl[360]) { fl[360] = 1; api.say(Y.dennis[api.flag.get('metDennis') ? 0 : 1], { mood: 'smug', priority: 0 }); }
        if (i >= 480 && !fl[480]) { fl[480] = 1; S.nap = true; paintStrip(); bubble('marg', "I'm awake. I'm always awake. It's how I keep my place.", 9000); api.say(Y.nap, { mood: 'neutral', priority: 1 }); }
        if (i >= 420 && !fl[420]) { fl[420] = 1; api.say('Management has filed a missing person report for you. It lists your height as Seated, your hair as Unknown and your last known location as This Call. Sandra is the witness.', { mood: 'panic', priority: 1 }); }
        if (i >= 600 && !fl[600]) { fl[600] = 1; api.say('Management has gone home. The line is being held by the line. It is holding up well. Management left a light on and a note. The note says: still here?', { mood: 'neutral', priority: 1 }); }
        if (S.margOffer && api.now() > S.margOfferUntil) { S.margOffer = false; paintStrip(); }
      }

      /* ------------------------------------------------------------- input wiring */
      api.on(document, 'keydown', function (e) {
        if (!root.isConnected) return;
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        const t = e.target, tag = t && t.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (t && t.isContentEditable)) return;
        const key = e.key;
        if (key === 'Escape') { disarmHang(); return; }
        if (e.repeat) return;
        if (key && (/^[0-9*]$/.test(key) || key === '#')) { startHold(key); if (key !== '#') dial(key, 'key'); return; }
        const lk = key && key.length === 1 ? key.toLowerCase() : '';
        if (lk === 't') tap(); else if (lk === 'r') focusVoice(); else if (lk === 's') speak(); else if (lk === 'h') armHang(); else if (lk === 'e') shiftEar();
      });
      api.on(document, 'keyup', function (e) {
        if (!root.isConnected) return;
        const t = e.target, tag = t && t.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA') return;
        const kk = (e.key === '3' && S.hold && S.hold.id === '#') ? '#' : e.key;
        if (kk === '#') {
          const supp = S.holdFired || api.now() < S.suppressUntil;
          endHold();
          if (!supp) dial('#', 'key');
        } else if (S.hold && S.hold.id === kk) endHold();
      });
      api.on(window, 'blur', function () { endHold(); });
      api.on(document, 'visibilitychange', function () { endHold(); });
      api.on(window, 'resize', function () { layoutCord(false); });
      api.on(root, 'pointerdown', function () { touch(); });

      /* ------------------------------------------------------------- start */
      api.setTitle('Customer Experience (Please Hold)');
      root.__hm = api.selftest ? { S: S, jump: function (sec) { S.sim = sec; S.idleSim = 0; S.nextPing = sec + 5; S.crossAt = Math.max(180, sec); S.pickIdx = 0; rollPicks(); S.beat = beatOf(sec); for (let b = 1; b <= S.beat; b++) if (!S.beatFired[b]) fireBeat(b, true); setTier(tierNow(), true); } } : null;
      S.pickAt = []; rollPicks();
      S.elevatorCb = api.stat.get('elevator-simulator.entered') > 0;
      setTier(1, true); paintCaption(); paintHeart(); paintStrip(); paintStatus(); paintRol(); paintOdo(0); addLog('CALL CONNECTED (RUMORED)'); addLog('HOLD MUSIC STARTED');
      fireBeat(1, true);
      U.seasonLab.textContent = '';
      api.onEvent('say', function () { S.lastSayAt = api.now(); });
      api.setInterval(tick, 100);
      api.setInterval(musicStep, 125);
      api.setTimeout(function () { layoutCord(true); }, 60);
      api.setTimeout(function () { api.sayRandom('m:hold-music:open', { mood: 'proud', priority: 1 }); }, 1200);
      present({ id: 'main', kind: 'menu', say: MAIN_B1, opts: [{ k: '1', t: 'For English', to: 'eng' }, { k: '2', t: 'For English but quieter', to: 'quiet' }, { k: '3', t: 'For English, again', to: 'main' }] }, { pre: GREET });
      api.setTimeout(function () { paintOdo(curPos()); }, 300);

      return { destroy() { endHold(); } };
    }
  });
})();
