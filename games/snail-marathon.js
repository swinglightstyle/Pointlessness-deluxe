/* POINTLESS module: snail-marathon */
(function () {
  'use strict';
  const P = window.POINTLESS;

  P.injectCSS(`
.m-snail-marathon-wrap{--ink:#2B2118;--cream:#FFF4DC;--mint:#9BE0C4;--coral:#FF7A66;--mus:#F2B93B;--lil:#C3A6F0;--sky:#BFE3F2;position:relative;display:flex;flex-direction:column;gap:10px;padding:10px;color:var(--ink);font-family:ui-rounded,'Trebuchet MS',system-ui,sans-serif;background:radial-gradient(#2b211822 1px,transparent 1.5px) 0 0/14px 14px,var(--cream);min-height:420px;box-sizing:border-box;overflow-x:hidden}
.m-snail-marathon-wrap *{box-sizing:border-box}.m-snail-marathon-score{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:8px}.m-snail-marathon-tile{background:#fff;border:3px solid var(--ink);border-radius:12px;box-shadow:4px 4px 0 var(--ink);padding:5px 9px;min-width:0}
.m-snail-marathon-tl{font-size:.62rem;font-weight:800;letter-spacing:.08em;color:#5a4a3c}.m-snail-marathon-tv{font:800 1.12rem ui-monospace,Consolas,monospace;font-variant-numeric:tabular-nums;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.m-snail-marathon-tv small{font-size:.62rem;font-weight:700;margin-left:3px;letter-spacing:.02em}.m-snail-marathon-chips{display:flex;flex-wrap:wrap;gap:6px;align-items:center}
.m-snail-marathon-chip{font-size:.7rem;font-weight:800;padding:2px 9px;border:2px solid var(--ink);border-radius:99px;background:var(--mus);white-space:nowrap}.m-snail-marathon-chip.m-snail-marathon-pl{background:#fff}.m-snail-marathon-chip.m-snail-marathon-dq{background:var(--lil)}
.m-snail-marathon-chip.m-snail-marathon-me{background:var(--coral)}.m-snail-marathon-main{display:grid;grid-template-columns:minmax(0,1fr);gap:10px}.m-snail-marathon-left{display:flex;flex-direction:column;gap:8px;min-width:0}
.m-snail-marathon-trackbox{position:relative;border:3px solid var(--ink);border-radius:14px;box-shadow:4px 4px 0 var(--ink);overflow:hidden;background:var(--sky);min-height:200px}
.m-snail-marathon-cam{display:block;width:100%;height:200px;touch-action:manipulation;cursor:pointer;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}.m-snail-marathon-overlay{position:absolute;inset:0;pointer-events:none;display:flex;align-items:center;justify-content:center}
.m-snail-marathon-overlay>*{pointer-events:auto}.m-snail-marathon-flash{position:absolute;inset:0;background:#fff;opacity:0;pointer-events:none;transition:opacity .12s}.m-snail-marathon-flash.m-snail-marathon-on{opacity:.95;transition:none}
.m-snail-marathon-gold{position:absolute;inset:0;background:linear-gradient(rgba(242,185,59,.35),rgba(255,122,102,.18));opacity:0;pointer-events:none;transition:opacity 3s}.m-snail-marathon-gold.m-snail-marathon-on{opacity:1}
.m-snail-marathon-loupewrap{position:absolute;width:96px;height:96px;border-radius:50%;border:3px solid var(--ink);overflow:hidden;background:#fff;pointer-events:none;box-shadow:3px 3px 0 var(--ink);z-index:3}.m-snail-marathon-loupewrap[hidden]{display:none}
.m-snail-marathon-loupewrap::after{content:'';position:absolute;left:12px;top:8px;width:22px;height:9px;border-radius:50%;background:rgba(255,255,255,.4);transform:rotate(-30deg)}.m-snail-marathon-loupe{width:96px;height:96px;display:block;image-rendering:pixelated}
.m-snail-marathon-course{display:block;width:100%;max-width:340px;height:24px;align-self:center}
.m-snail-marathon-booth{background:var(--lil);border:3px solid var(--ink);border-radius:14px;box-shadow:4px 4px 0 var(--ink);padding:10px;display:flex;flex-direction:column;gap:8px;min-width:0;align-self:start}
.m-snail-marathon-heads{display:flex;justify-content:space-around;align-items:flex-end;position:relative;min-height:84px;--lid:0%}.m-snail-marathon-person{position:relative;display:flex;flex-direction:column;align-items:center;gap:2px;font-size:.62rem;font-weight:800}
.m-snail-marathon-face{width:58px;height:58px;border-radius:50%;background:var(--cream);border:3px solid var(--ink);position:relative;display:flex;align-items:center;justify-content:center;gap:9px;transition:transform .15s}
.m-snail-marathon-face::after{content:'';position:absolute;bottom:10px;left:50%;width:14px;height:5px;margin-left:-7px;border-bottom:3px solid var(--ink);border-radius:0 0 12px 12px}.m-snail-marathon-talk::after{height:9px;background:#7a2f2a;border-radius:0 0 12px 12px}
.m-snail-marathon-talk{transform:translateY(-3px)}.m-snail-marathon-eye{width:12px;height:12px;border-radius:50%;background:#fff;border:2px solid var(--ink);position:relative;overflow:hidden;margin-top:-8px}
.m-snail-marathon-eye::before{content:'';position:absolute;left:0;right:0;top:0;height:var(--lid);background:var(--ink);z-index:2}.m-snail-marathon-eye::after{content:'';position:absolute;left:4px;top:5px;width:3px;height:3px;border-radius:50%;background:var(--ink)}
.m-snail-marathon-mic{position:absolute;bottom:2px;right:-10px;width:11px;height:22px;background:var(--ink);border-radius:6px;transform:rotate(25deg)}
.m-snail-marathon-cradle .m-snail-marathon-face::before{content:'';position:absolute;bottom:-9px;left:50%;width:30px;height:12px;margin-left:-15px;background:#f4c9a6;border:2px solid var(--ink);border-radius:8px;z-index:1}
.m-snail-marathon-up .m-snail-marathon-face{animation:m-snail-marathon-jump .5s ease-in-out infinite alternate}.m-snail-marathon-still .m-snail-marathon-face{animation:none;transform:none}.m-snail-marathon-cut,.m-snail-marathon-sign,.m-snail-marathon-plate{display:none}
.m-snail-marathon-gone .m-snail-marathon-person{display:none}.m-snail-marathon-gone .m-snail-marathon-cut,.m-snail-marathon-gone .m-snail-marathon-sign,.m-snail-marathon-gone .m-snail-marathon-plate{display:flex}
.m-snail-marathon-cut{width:60px;height:70px;background:#b9b2aa;border:3px solid var(--ink);border-radius:10px 10px 4px 4px;align-items:center;justify-content:center;font-size:.7rem;font-weight:800}
.m-snail-marathon-sign{background:#fff;border:3px solid var(--ink);border-radius:6px;padding:4px 6px;font-size:.62rem;font-weight:900;transform:rotate(-4deg);text-align:center}
.m-snail-marathon-plate{width:48px;height:48px;border-radius:50%;background:#fff;border:3px solid var(--ink);box-shadow:inset 0 0 0 5px #eee}
.m-snail-marathon-sand{display:flex;flex-direction:column-reverse;align-items:center;width:44px;min-height:40px;padding:0;margin-top:4px;background:none;border:0;cursor:pointer;user-select:none;-webkit-user-select:none}.m-snail-marathon-sand[hidden]{display:none}
.m-snail-marathon-sand i{display:block;width:40px;height:7px;border:2px solid var(--ink);border-radius:6px;background:#e8cf9a;margin-top:-2px}.m-snail-marathon-sand i:nth-child(even){background:#8fcf6a;height:5px;border-radius:3px}
.m-snail-marathon-meter{display:flex;align-items:center;gap:6px;font-size:.62rem;font-weight:900}.m-snail-marathon-bar{flex:1;height:14px;border:3px solid var(--ink);border-radius:8px;background:#fff;overflow:hidden;position:relative}
.m-snail-marathon-bar b{display:block;height:100%;background:var(--mint);transition:width .4s}.m-snail-marathon-bar::after{content:'';position:absolute;left:0;right:0;top:0;height:var(--lid,0%);background:rgba(43,33,24,.35);pointer-events:none}
.m-snail-marathon-caps{height:9.6em;overflow:hidden;font-size:.78rem;line-height:1.2;background:rgba(255,255,255,.55);border:2px solid var(--ink);border-radius:8px;padding:4px 7px;display:flex;flex-direction:column;justify-content:flex-end}
.m-snail-marathon-cap{padding:1px 0;animation:m-snail-marathon-in .3s ease-out}.m-snail-marathon-cap b{font-weight:900}.m-snail-marathon-controls{display:flex;flex-direction:column;gap:8px}.m-snail-marathon-row{display:flex;gap:8px;align-items:stretch}
.m-snail-marathon-go{flex:1;min-height:72px;font:900 1.5rem ui-rounded,'Trebuchet MS',system-ui,sans-serif;letter-spacing:.04em;background:var(--coral);color:var(--ink);border:4px solid var(--ink);border-radius:18px;box-shadow:5px 5px 0 var(--ink);cursor:pointer;touch-action:manipulation;transition:transform .07s,box-shadow .07s;-webkit-tap-highlight-color:transparent;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
.m-snail-marathon-go:active,.m-snail-marathon-go.m-snail-marathon-dn{transform:translate(2px,3px);box-shadow:3px 2px 0 var(--ink)}.m-snail-marathon-go[aria-disabled=true]{background:#d8c9bd;cursor:not-allowed}.m-snail-marathon-go.m-snail-marathon-shake{animation:m-snail-marathon-shake .3s}
.m-snail-marathon-go.m-snail-marathon-final{background:var(--mus);animation:m-snail-marathon-glow 1s ease-in-out infinite alternate;font-size:1.9rem}
.m-snail-marathon-btn{font:800 .9rem ui-rounded,'Trebuchet MS',system-ui,sans-serif;padding:0 14px;min-height:44px;background:#fff;border:3px solid var(--ink);border-radius:14px;box-shadow:3px 3px 0 var(--ink);cursor:pointer;color:var(--ink);user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
.m-snail-marathon-btn[aria-pressed=true]{background:var(--mint)}.m-snail-marathon-btn:active{transform:translate(2px,2px);box-shadow:1px 1px 0 var(--ink)}
.m-snail-marathon-slot{min-height:64px;display:flex;align-items:center;justify-content:center;gap:10px;flex-wrap:wrap;border:2px dashed #2b211855;border-radius:12px;padding:4px}
.m-snail-marathon-evb{font:800 1rem ui-rounded,'Trebuchet MS',system-ui,sans-serif;display:inline-flex;align-items:center;gap:8px;min-height:48px;padding:6px 16px;background:var(--mus);color:var(--ink);border:3px solid var(--ink);border-radius:14px;box-shadow:3px 3px 0 var(--ink);cursor:pointer;touch-action:manipulation;animation:m-snail-marathon-in .25s ease-out;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none}
.m-snail-marathon-ring{display:inline-block;width:30px;height:30px;border-radius:50%;border:3px solid var(--ink);background:conic-gradient(var(--ink) calc(var(--p,0)*1deg),#fff 0)}
.m-snail-marathon-face2{display:inline-block;width:28px;height:28px;border-radius:50%;background:var(--lil);border:3px solid var(--ink)}.m-snail-marathon-shelf{display:flex;flex-wrap:wrap;gap:10px;min-height:10px;padding:2px 6px}
.m-snail-marathon-pol{margin:0;background:#fff;border:2px solid var(--ink);padding:4px 4px 6px;box-shadow:2px 2px 0 var(--ink);transform:rotate(var(--r,0deg));width:112px;font-size:.55rem;line-height:1.15;animation:m-snail-marathon-in .4s ease-out}
.m-snail-marathon-pol canvas{display:block;width:100%;height:auto}.m-snail-marathon-kbd{display:flex;flex-wrap:wrap;gap:6px 12px;font-size:.7rem;color:#4a3b2e;justify-content:center}
.m-snail-marathon-kbd kbd{font:800 .68rem ui-monospace,Consolas,monospace;background:#fff;border:2px solid var(--ink);border-radius:5px;padding:0 5px;box-shadow:1px 1px 0 var(--ink)}
.m-snail-marathon-card{background:#fff;border:3px solid var(--ink);border-radius:14px;box-shadow:4px 4px 0 var(--ink);padding:10px 14px;max-width:92%;text-align:center;font-size:.85rem;font-weight:700;color:var(--ink);cursor:pointer;font-family:inherit;animation:m-snail-marathon-slide .4s ease-out}
.m-snail-marathon-h{display:block;margin:0 0 4px;font-size:1rem;font-weight:900}.m-snail-marathon-card small{display:block;font-weight:800;color:#6a4fa0;margin-bottom:3px}.m-snail-marathon-ad{background:var(--lil);width:88%;cursor:default;display:flex;gap:12px;align-items:center;text-align:left}.m-snail-marathon-ad small{color:#3b2a66}
.m-snail-marathon-prod{position:relative;flex:none;width:44px;height:70px}.m-snail-marathon-prod i{position:absolute;left:8px;right:8px;top:14px;bottom:0;background:var(--mint);border:3px solid var(--ink);border-radius:8px 8px 14px 14px}
.m-snail-marathon-prod b{position:absolute;left:15px;right:15px;top:0;height:16px;background:var(--coral);border:3px solid var(--ink);border-radius:4px}
.m-snail-marathon-note{position:absolute;right:8px;top:8px;max-width:62%;background:#ffe98a;border:2px solid var(--ink);padding:8px 10px;font-size:.78rem;font-weight:700;transform:rotate(2deg);box-shadow:3px 3px 0 #2b211855;animation:m-snail-marathon-slide .3s ease-out}
.m-snail-marathon-dim{position:absolute;inset:0;background:rgba(43,33,24,.62);display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px;color:#fff;text-align:center;padding:10px;overflow:hidden}
.m-snail-marathon-sun{position:absolute;left:50%;bottom:-70px;width:70px;height:70px;margin-left:-35px;border-radius:50%;background:var(--mus);transition:bottom 6s ease-out}.m-snail-marathon-rise .m-snail-marathon-sun{bottom:40%}
.m-snail-marathon-big{font:900 2rem ui-rounded,system-ui,sans-serif;letter-spacing:.2em;position:relative;opacity:0;transition:opacity 1s}.m-snail-marathon-big.m-snail-marathon-on{opacity:1}.m-snail-marathon-mcap{position:relative;font-size:.85rem;font-weight:700;min-height:2.4em;max-width:90%}
.m-snail-marathon-pulse{position:absolute;width:64px;height:64px;margin:-32px 0 0 -32px;border-radius:50%;border:4px solid var(--mus);background:rgba(255,255,255,.18);cursor:pointer;animation:m-snail-marathon-pulse 1.5s ease-in forwards;z-index:2}
.m-snail-marathon-skip{position:relative;z-index:3;font:800 .8rem ui-rounded,system-ui,sans-serif;padding:6px 12px;border:3px solid var(--ink);border-radius:12px;background:#fff;color:var(--ink);cursor:pointer;min-height:40px}
.m-snail-marathon-stamp{position:absolute;left:50%;top:44%;font:900 clamp(1.25rem,7.2vw,2.1rem) ui-rounded,system-ui,sans-serif;letter-spacing:.08em;white-space:nowrap;color:#c0261a;border:6px solid #c0261a;border-radius:10px;padding:2px 10px;transform:translate(-50%,-50%) rotate(-12deg);background:rgba(255,255,255,.55);animation:m-snail-marathon-thunk .35s ease-out;pointer-events:none}
.m-snail-marathon-union{background:#fff;cursor:default;text-align:left;width:94%}.m-snail-marathon-union ol{margin:3px 0 7px 18px;padding:0;font-weight:700;font-size:.78rem}.m-snail-marathon-union .m-snail-marathon-skip{align-self:flex-start}
.m-snail-marathon-desk{background:#e7c79a;border-color:var(--ink);cursor:default;position:relative}.m-snail-marathon-desk::after{content:'';position:absolute;right:14px;bottom:8px;width:34px;height:34px;border-radius:50%;border:5px solid rgba(110,70,30,.35)}
@keyframes m-snail-marathon-jump{from{transform:translateY(0)}to{transform:translateY(-9px)}}@keyframes m-snail-marathon-in{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}@keyframes m-snail-marathon-slide{from{opacity:0;transform:translateX(40px)}to{opacity:1;transform:none}}
@keyframes m-snail-marathon-shake{0%,100%{transform:none}25%{transform:translateX(-6px)}75%{transform:translateX(6px)}}@keyframes m-snail-marathon-glow{from{box-shadow:5px 5px 0 var(--ink),0 0 6px 2px rgba(242,185,59,.5)}to{box-shadow:5px 5px 0 var(--ink),0 0 22px 8px rgba(242,185,59,.95)}}
@keyframes m-snail-marathon-pulse{from{transform:scale(2.6);opacity:.9}to{transform:scale(.7);opacity:.2}}@keyframes m-snail-marathon-thunk{from{transform:translate(-50%,-50%) rotate(-12deg) scale(2.6);opacity:0}to{transform:translate(-50%,-50%) rotate(-12deg) scale(1);opacity:1}}
@media (min-width:900px){.m-snail-marathon-main{grid-template-columns:minmax(0,1fr) 300px}.m-snail-marathon-booth{align-self:stretch}}
@media (max-width:560px){.m-snail-marathon-score{grid-template-columns:repeat(2,minmax(0,1fr));gap:6px}.m-snail-marathon-tile{padding:3px 8px}.m-snail-marathon-tv{font-size:1rem}.m-snail-marathon-go{font-size:1.35rem;min-height:60px}.m-snail-marathon-row{flex-wrap:wrap}
.m-snail-marathon-main{display:flex;flex-direction:column}.m-snail-marathon-left{display:contents}.m-snail-marathon-trackbox{order:1}.m-snail-marathon-course{order:2}.m-snail-marathon-booth{order:3;padding:6px 8px;gap:4px;align-self:stretch}.m-snail-marathon-controls{order:4}
.m-snail-marathon-heads{min-height:50px}.m-snail-marathon-face{width:40px;height:40px;gap:6px}.m-snail-marathon-face::after{bottom:7px}.m-snail-marathon-meter{display:none}.m-snail-marathon-caps{height:6.4em}.m-snail-marathon-sand{margin-top:0}}
@media (hover:none),(pointer:coarse){.m-snail-marathon-kbd{display:none}}
@media (prefers-reduced-motion:reduce){.m-snail-marathon-wrap *{animation:none!important;transition:none!important}}.pm-reduce-motion .m-snail-marathon-wrap *{animation:none!important;transition:none!important}
`, 'css-snail-marathon');

  P.addAchievements([
    { id: 'snail-marathon.millimetre', name: 'Grand Magister of the First Millimetre', desc: 'Travel 100 pixels. The certificate calls this "a distance". The certificate is a coaster.', icon: '📏', reward: 2 },
    { id: 'snail-marathon.hydration', name: 'Hydration Laureate of the Realm and Adjacent Realms', desc: 'Successfully sip 3 cups of dew without moving. Brenda attends the ceremony from a small distance.', icon: '💧', reward: 4 },
    { id: 'snail-marathon.slowlane', name: 'Knight Commander of the Slow Lane (Honorary)', desc: 'Be overtaken by Sheila Zoomerton 5 times. Each overtaking is described in your file as "a team effort".', icon: '🏇', reward: 3 },
    { id: 'snail-marathon.almost', name: 'Her Majesty the Perpetual Almost', desc: 'Get within 1.0 px of the finish line before it politely leaves. It sends a card.', icon: '🎯', reward: 5 },
    { id: 'snail-marathon.provisional', name: 'Provisional Champion of Infinity', desc: 'Cross the finish line. Sandra has marked it PROVISIONAL.', icon: '🏁', reward: 8 },
    { id: 'snail-marathon.montage', name: 'Imperial Witness to the Inspirational Montage', desc: 'Watch the entire montage without skipping. You gained one pixel. It was worth it.', icon: '🎞️', reward: 3 },
    { id: 'snail-marathon.idler', name: 'Lord High Archdeacon of Idling', desc: 'Do nothing for 180 seconds while the rivals hold a book club. The book club has been praised in the minutes.', icon: '🕰️', secret: true, reward: 6 },
    { id: 'snail-marathon.spammer', name: 'Supreme Overlord of Frantic Clicking', desc: 'Click so fast the speed camera flashes. You have been fined 3 px by a snail with a cap and a ticket book.', icon: '📸', secret: true, reward: 6 },
    { id: 'snail-marathon.club', name: 'Founding Half-Member of the 7½ Club', desc: 'Land on exactly 7.5 pixels. The Club is a half. It meets in the middle of the floor.', icon: '🎩', secret: true, reward: 10 },
    { id: 'snail-marathon.sock', name: 'Sock Whisperer, First Class', desc: 'Click the Missing Sock 3 times across sessions. It still has no comment.', icon: '🧦', secret: true, reward: 7 },
    { id: 'snail-marathon.bird', name: 'Hero of the Bird Incident (Unsung, Then Sung)', desc: 'Stay perfectly still while the bird passes. It saw nothing. You were magnificent.', icon: '🐦', secret: true, reward: 8 },
    { id: 'snail-marathon.reverse', name: 'The Reverse Marathon of Eternal Retreat', desc: 'Walk backward 20 steps in a row. Compliance has thoughts.', icon: '↩️', secret: true, reward: 6 },
    { id: 'snail-marathon.cricket', name: 'Friend of the Crowd (Singular)', desc: 'Click the cricket 7 times. It was always the crowd.', icon: '🦗', secret: true, reward: 5 },
    { id: 'snail-marathon.pat', name: 'Ambassador Plenipotentiary to the Finish Line, Keeper of the Small Key, and First-Name Basis (Sticker)', desc: 'Say its name. The finish line came over to say hello. It has never done this. It is going to need a lie-down.', icon: '🎫', secret: true, reward: 12 }
  ]);

  P.addLines('hubReturn', [
    'Welcome back. You have missed nothing. You have been missed anyway.',
    'Welcome back. You were gone for a while. Management has decided it was nothing.'
  ]);

  /* Lines: 'Speaker|text'. Arrays inside a group are two-voice "bits". Tokens: {player} {meh} #pace# #n# */
  const LN = {
    welcome: [`Management|Welcome, {player}. The course is 3,000 pixels. The finish line has been told you are coming and has made other plans.`],
    cork: [`Management|The starter pistol is a cork. It has been fired. The cork is fine and has asked to be left alone.`],
    potato: [`Management|A potato was supposed to fire the gun. The potato has been moved to a Thursday. Thursday has not confirmed.`],
    gerGun: [`Gerald|Ready. Steady. Potato.`],
    train: [`Management|Click to move one pixel. This is called training. After about four of them it is called a career.`],
    hOpen: [`Hector|And they're off. Well. They're on. Nobody has technically left.`],
    nudge: [`Management|The large coral button is called SLITHER. It has been very patient. It will continue to be, with a faint air of pressure.`, [`Hector|The snail is weighing its options, Maxine.`, `Maxine|It has one, Hector.`, `Hector|It is weighing it thoroughly.`], `Management|Gary has not moved either. Gary is already ahead, so for him it counts as a plan.`, `Management|The race is open. The race has been open for a while. The race is beginning to hum a little.`],
    back: [`Management|Welcome back, {player}. The marathon remembers #n# laps and has chosen not to mention it.`, `Management|Welcome back, {player}. #n# laps on file. The file is a coaster, but it is a well-kept coaster.`],
    first: [`Management|You have moved 1 pixel. Management would like to acknowledge the pixel. The pixel is aware.`],
    firstBit: [[`Maxine|Hector, that's a snail moving one pixel.`, `Hector|Maxine, that's a pixel moving a snail.`, `Maxine|I've written that down in case it's good.`]],
    crowd: [`Hector|The crowd is going wild. The crowd is a cricket. The cricket is going moderately.`],
    loupe: [`Management|Loupe engaged. At 12x, a pixel is the size of a decision.`],
    garyLoupe: [`Hector|The loupe confirms it. Gary is one pixel ahead. He looks very pleased, in a way that is also one pixel wide.`],
    rank5: [`Management|You are in 4th place of 5, or 5th, depending on Sheila. The podium for both is a coaster.`],
    garyAhead: [`Hector|Gary has gone ahead by one pixel. Statistically that is a lot of Gary.`],
    consol: [`Management|Consolation Meh: 0.1. Awarded for being overtaken. It is the nicest thing that has happened to you since the pixel.`],
    turbo3: [[`Hector|Turbo is in third.`, `Maxine|Turbo is disqualified.`, `Hector|And yet. Third. We don't ask.`]],
    status: [ `Management|Current pace: #pace# pixels per second. Internally this is described as 'a lot, for a snail'.`, `Management|You have earned {meh} Meh. A hydration station exists. It is slow on purpose, for reasons it will not share.`, `Management|It is not about the distance. It is about the distance remaining, which is also distance.`, `Management|Rank: 4th or 5th of 5. Gary is ahead by 1 pixel. We have measured this twice with a very small ruler.`, `Management|Your shell has been fitted with a sponsor. The sponsor is you. You are doing excellent work for your own brand.`, `Management|Please stop clicking so efficiently. We are not equipped to process this much distance.`, `Management|The start line has been notified of your progress. It asked for a photo. It has not said why.`, `Management|Every pixel is a decision. Most of yours have been the same decision. Management respects consistency.`, `Management|This is not a race. It is a marathon. Marathons have no losers, only snails who are still marathoning.`, `Management|We compared your pace to last quarter's pace. Last quarter's pace was a rumour.`, `Management|Wellness tip: a snail carries its home on its back. Management cannot offer this. Management can offer a coaster.`, `Management|The course has passed inspection. The inspector was the course. It gave itself a glowing review and a small plaque.`, `Management|Per Sandra, this marathon may not be described as slow. It is to be described as 'deliberate, at length'.`, `Management|Management is not allowed to say 'you've got this'. Management is thinking it, quietly, near the exit. There is no exit.`, `Management|Every competitor in this race is a volunteer. Several are snails. One is under a tea towel by choice.` ],
    half: [`Management|That was a half-slither. The Elegant Half-Slither. It is allowed. It is not understood.`, `Management|0.5 pixels. The pixel has been halved and both halves are fine. Sandra is already on the phone with the other half.`, [`Hector|A half-slither. I didn't know they made those, Maxine.`, `Maxine|They don't. He made it himself.`]],
    misc: [ `Management|You have been awarded a very small Meh. It is the size of a pixel. It was not available in other sizes.`, `Management|Management has notified the coaster of your position. The coaster has not replied. The coaster is a coaster.`, `Management|Sandra has asked that you not be so enthusiastic. Sandra has also asked that you not be unenthusiastic. Please land between.`, `Management|You have achieved something. HR cannot say what. It has been filed under 'Other', in the drawer marked 'Other'.`, `Hector|This is the most thrilling event in the history of the arcade, according to Management. Management has no comparison data.`, [`Maxine|I'd say we're at the midpoint.`, `Hector|We're at the third quarter.`, `Maxine|Since when?`, `Hector|Since it was convenient.`], `Management|The snail is currently ranked on a scale from 'slow' to 'also slow'. It was placed on the scale with great care.`, `Management|Please remember to stretch before and after clicking. Stretching is also a kind of clicking, if you look at it generously.` ],
    rhythm1: [`Management|You have been In Rhythm for the first time. A small tick has been installed. Per policy, please do not name it.`],
    rhythm: [ `Management|Rhythm detected. Rhythm has no effect on pixels. Management enjoys it anyway.`, `Management|You are in rhythm. A metronome has appeared. Nobody has claimed it.`, `Hector|Wait, rhythm. He's got rhythm. Maxine, he has rhythm.`, `Maxine|I've dropped my sandwich.`, [`Hector|I think he's got it. Whatever it is.`, `Maxine|Cadence.`, `Hector|Cadence.`], `Management|A steady pace has been detected. Stewards are concerned. Stewards are always concerned about steady.`, `Sandra from Compliance|Rhythm is permitted. Dancing is not. If the snail begins to dance, please notify me in writing, in advance.` ],
    tierA: [ `Hector|Another pixel. Textbook. Not a textbook anyone owns, but one exists and it has a snail on the cover.`, `Maxine|That pixel took 0.4 seconds. In snail terms that's reckless. In human terms it's a fidget.`, `Hector|Note the posture, Maxine. That is the posture of a snail committed to forward.`, `Maxine|Track conditions are excellent. I was asked to say 'track'. It is a lawn. A man has been mowing it in a circle since Monday.`, `Hector|A good clean slither there. Very little drag. Mostly drag.`, `Hector|Gary leads by one pixel. That is 0.03 percent of the course and about 100 percent of Gary.`, `Maxine|Racing conditions are ideal. A slight breeze and a very small amount of everything else.`, `Hector|Technique is key here. Keys are not available at this time.`, [`Maxine|Fastest split so far is yours.`, `Hector|Slowest split so far is also yours.`, `Maxine|Consistent.`, `Hector|They'll say reliable, Maxine.`], `Hector|Gary has not moved relative to the snail since the gun. At this point Gary is a landmark.`, `Maxine|Hector, I've just been handed a note. It says 'pixel'. It has been underlined twice.`, `Hector|The stewards report a clean race. No incidents. No movement above the legal limit. No legal limit.`, [`Maxine|The snail is on pace to finish.`, `Hector|In what?`, `Maxine|In whatever the next thing is.`], `Hector|That's textbook slithering. I should add I have not read the textbook. I've read the cover. The cover has a snail on it.`, `Maxine|I'd remind viewers at home that a pixel is not a measurement. It is a promise. Of light.`, `Hector|Sheila is on her own line, Gary is on his own pixel and this snail is on a journey. It's a very full field.`, [`Maxine|The cricket is in great voice today.`, `Hector|It's the same note.`, `Maxine|It's a good note.`], `Maxine|If I could bottle this atmosphere I would. I have been asked to stop bottling things. Dew, especially.`, [`Hector|Forward is the key word, Maxine.`, `Maxine|Is it?`, `Hector|It's one of them. I've written three on my hand.`], [`Maxine|As a rule I don't clap in the booth.`, `Hector|You've been clapping since Tuesday.`, `Maxine|I've been rehearsing the clap.`]],
    tierB: [ [`Hector|The distance remaining is a number. Maxine, is it a number?`, `Maxine|It's been a number for a while.`], [`Hector|We've been told to fill four minutes. Maxine, tell me about your sandwich.`, `Maxine|Thank you. It was a good one.`], `Hector|I have a parking permit that expires at five. That is the real race.`, `Maxine|I have forgotten what we are watching. I want to say: a sport.`, [`Hector|I've just been told the snail has a name.`, `Maxine|What is it?`, `Hector|They won't say. It's a privacy matter. It's a very small matter.`], `Maxine|I read the rules once. A laminated card. Rule one was 'laminated'. I have not found rule two.`, [`Hector|Let's go to the replay.`, `Maxine|Of what?`, `Hector|The last ten seconds.`, `Maxine|That is this.`], `Maxine|Is the pixel a unit or a feeling? I've gone round and round. I've gone round and round the pixel.`, `Hector|I would like to apologise to the viewers for my tone. The tone was a shrug.`, [`Hector|Technically this is the longest race I've called.`, `Maxine|Technically it's the only one.`, `Hector|Technically that's why.`], [`Maxine|I've begun to hear a hum.`, `Hector|It's the lights.`, `Maxine|It's the lights holding a note.`], `Hector|I've been asked to say 'what a race'. I would like to say it with feeling. What a race.`, [`Maxine|I've counted the cutouts. Fourteen.`, `Hector|Thirteen and a cricket.`, `Maxine|The cricket is not a cutout.`, `Hector|Which is why I said it separately.`], `Maxine|I want to say something about the sandwich, but I'm not allowed on air. I'm saying it off air. On air.`, `Hector|Per the rulebook a snail may be passed by any competitor with a pulse. Gary has a pulse. Sheila has a visor.`],
    tierC: [ `Maxine|Mm. Yes. Moving. Good.`, [`Hector|I believe he moved.`, `Maxine|He might have.`, `Hector|I will note it as a rumour.`], `Maxine|I'm so proud. I'm also getting a sandwich.`, `Hector|I've lost the thread, Maxine. I'd like it back. It was a good thread. It was going somewhere, which I admired.`, `Hector|Interest in this race currently stands at 14 percent, which Maxine says is generous.`, [`Maxine|I've started a list of things I can see. It says: grass.`, `Hector|That's the whole list?`, `Maxine|It's a very long grass.`], `Hector|I've been commentating for nineteen years. I do not recall what on. I recall it was weather.`, [`Maxine|He's still moving, Hector.`, `Hector|Is he?`, `Maxine|I asked three people. Two said yes. The third was a cutout.`], [`Hector|If I stare at the track long enough it starts to look like a track.`, `Maxine|A promising sign.`], `Maxine|I've tried to remember what a pixel is. It was either a small square or a large decision.`, [`Hector|Maxine, I'm going to hand it to the cricket.`, `Maxine|Hand what?`, `Hector|The commentary. It's been listening harder than either of us.`], `Hector|We've now been on air for longer than the typical marathon, if the typical marathon were measured in pixels, which I'm told it is not.`, `Maxine|My hand has gone to sleep. It was resting on the tape. The tape was also running.`],
    tierD: [ `Maxine|Is it still going? ... I think it's still going.`, [`Hector|And they're off.`, `Maxine|You said that.`, `Hector|I'm saying it again. It's the same 'off'.`], `Hector|Hector here. Maxine has gone to find parking. We will be with you spiritually.`, `Maxine|I am no longer sure what a pixel is. I used to be so sure.`, [`Maxine|Hector, are we on air?`, `Hector|We're on something.`, `Maxine|I'll take it.`], `Hector|The pixel is a small square of light that has made a lot of promises.`, `Maxine|(a very long exhale, into the microphone, which carries it to the crowd, which is a cricket)`, [`Hector|I've forgotten how to end a sentence. I'll have another go at the next one.`, `Maxine|Take your time.`, `Hector|That's the problem.`], `Maxine|The cricket has stopped. I think it's thinking. I hope so. I'd hate for it to be watching.`, `Hector|(a very long pause, which the booth attempts to fill with the sound of a pen being uncapped)`],
    gone: [ `Booth|The commentators have gone to lunch. A cardboard cutout of Hector remains. It says 'wow'.`, `Management|The booth is empty. The cricket has taken it personally.`, `Management|A paper plate has been left in the booth. It may be a bid for attention.`, `Booth|Hector has left a note. It says 'Back after lunch'. It does not say which lunch.` ],
    sandwich: [ `Maxine|Speaking of leads. I had a sandwich on the way in. Completely unrelated. Remind me to tell you about it.`, `Maxine|As I was saying about the sandwich. There was a second sandwich. It was upset about the first.`, `Maxine|The third sandwich was a different kind of upset. It was upset about the second.`, `Maxine|I have thought about the sandwich for a long time. I think the sandwich is thinking about me.` ],
    swInt: [[`Maxine|Anyway. Where was I.`, `Hector|Sandwich.`, `Maxine|Sandwich.`], [`Maxine|Sorry, that was a different sandwich.`, `Hector|It's always a different sandwich.`], [`Hector|Maxine, you were going to tell me about the sandwich.`, `Maxine|Not now. It's an event.`]],
    swClick: [`Maxine|Please don't.`, `Maxine|I said please.`, `Maxine|It's not that kind of sandwich.`, `Maxine|This is a sandwich of record. Step away from the record.`, `Maxine|The sandwich has asked me to hold its calls. I'm holding them. It has no calls.`, [`Maxine|Hector, he's touching the sandwich.`, `Hector|It's public. He's allowed.`, `Maxine|It's not public. It's pastrami.`]],
    bback: [[`Hector|Wait, is he going somewhere?`, `Maxine|We left?`, `Hector|We left.`, `Maxine|Hello.`], `Maxine|We're back! We never left! What did we miss?`],
    garyL: [ `Gary|Don't look at me. I'm only up here because that's where I am.`, [`Hector|Gary is exactly one pixel ahead.`, `Maxine|Exactly?`, `Hector|To the pixel. It's a contract.`], `Hector|The crisis is Gary. The crisis has always been Gary.`, `Gary|One pixel is not much. But it is, famously, enough.`, [`Hector|Maxine, that is a pixel Gary did not earn.`, `Maxine|He's never earned it. That's the beauty.`], `Gary|I'd like to thank my sponsor, my training, and the one pixel. In that order. It's a short order.`, `Gary|People ask what my secret is. I tell them: one pixel. They ask again. It is still one pixel.`, `Gary|If you ever do get ahead of me, I'd like to know how. For my file. I don't have a file. I'd like one.`, `Gary|I've been one pixel ahead for so long it's basically my address.` ],
    sheilaL: [ `Sheila Zoomerton|Slow Lane Mutual: you're covered. Not for much. But you're covered.`, `Sheila Zoomerton|I'd like to congratulate you on the thing we both did. I'm not sure what it was.`, `Sheila Zoomerton|I overtake for my own reasons. My reasons are in a drawer.`, `Sheila Zoomerton|Please don't read anything into the visor. It's mostly for the wind. There is no wind.`, `Sheila Zoomerton|I have never lost a race I knew I was in.` ],
    turboL: [ `Turbo|(a small damp noise from under the tea towel)`, `Turbo|I was told I would be disqualified. I was not told I would be third.`, `Management|The tea towel has been asked to leave the race. It said it would 'see'. Turbo is now also saying he would 'see'.`, `Turbo|I want to be clear that I am not under the tea towel. The tea towel is on me. There is a difference. It is legal.`, `Turbo|(a small damp noise from under the tea towel, but angrier)` ],
    ghostL: [ `Yesterday's You|You're catching up. I am the same as I was yesterday. I'm doing great.`, `Yesterday's You|I did not sleep. I want to be honest about that. It was a choice.`, `Yesterday's You|Don't be hard on yourself. I've been where you are. It's right here.` ],
    passGhost: [ `Management|You have passed Yesterday's You. They did not notice. They are asleep, in the sense that they are a ghost.`, `Yesterday's You|Go on. Be better. I'll be right here being the same.`, `Yesterday's You|You passed me. That's fine. I don't have feelings. I have an outline.` ],
    sponsorQ: [ `Sponsor|Moist-O-Matic: Are you moist? Are you sure? Call now. Operators are standing by a puddle.`, `Sponsor|This leg of the marathon is brought to you by Gary, now sponsored by the concept of Gary.`, `Sponsor|Slow Lane Mutual: we'll cover you at any pace, up to and including 'stopped'.`, `Sponsor|Gary Inc. (Self-Funded): Gary. It's what's ahead.`, `Sponsor|Gary (Pending): Gary, but we're awaiting the paperwork.`, `Sponsor|We Support You (As Needed).`, `Sponsor|Slightly Warmer Gravel Co. is also a sponsor. It has asked not to be told what it sponsors.`, `Sponsor|Meh Insurance: if you lose your Meh, we'll find it. It was in the other pocket.`, `Sponsor|Pat's Banners: we'll get you to the line. The line will get you elsewhere.` ],
    adSkip: [`Management|Sponsor skipped. Brand Loyalty has been awarded for skipping the brand. Management does not see the problem.`, `Management|Skipped early. The sponsor is hurt, but supportive.`, `Management|You skipped the sponsor with seconds to spare. The sponsor did not blink. The sponsor has no eyes. It has a logo.`],
    adEnd: [`Management|The sponsor break is over. You are exactly as you were, but advertised to.`, `Management|The sponsor break has ended. You watched all of it. The sponsor is moved. The sponsor is a jar.`],
    adSpam: [`Management|The sponsor thanks you for your engagement. Clicking a button that does nothing is the best kind of engagement.`, `Management|Engagement is up 400 percent. It was previously one click.`, `Sponsor|We see you. We appreciate you. Please keep not moving.`],
    adText: [ `MOIST-O-MATIC: now with 12% more moist. Or 8% more. Subject to review.`, `SLOW LANE MUTUAL: for when 'forward' is a lot.`, `GARY INC.: a pixel is a start. A pixel ahead is a lifestyle.`, `SLIGHTLY WARMER GRAVEL: it's gravel. It's slightly warmer. Please stop asking what else.`, `TARMAC-FREE SALT ALTERNATIVE: for the snail who has everything except, specifically, salt.`, `PAT'S BANNERS: be the line you want to see in the world. The line moves. The banner moves with it.` ],
    ladder: [ `Finish Line|Terribly sorry. I have shifted 2 pixels. Wind.`, `Finish Line|Don't mind me. Just stepping away. Lovely snail, by the way.`, `Finish Line|Pardon me, there is a draught. I am just popping back a little.`, `Finish Line|I apologise to the rivals as well. And to the cricket. Especially the cricket.`, `Finish Line|Please accept a crumb. It is on the house. The house is also moving.`, `Finish Line|Official notice: I am currently 'in transit'. Arrival expected on a date not yet invented.`, `Finish Line|I have hired an assistant to move me back. He is very good. He is also me.`, `Finish Line|I'd stay, but Sandra says I'm not insured above 0.5 snail-lengths of proximity.`, `Finish Line|I have written you a card. It says sorry. It is a very small card.`, `Finish Line|Honestly, I do wish you'd catch me. Please do not tell the others.` ],
    filler: [ `Finish Line|I'm not running away. I'm gracefully being elsewhere.`, `Finish Line|I have been informed I am a finish line, not a destination. It was in the small print. It was very small.`, `Finish Line|Come closer. Not that close. Perfect. Gone.`, `Finish Line|Sorry. I know that's the eleventh sorry. I've started a tally. The tally is also sorry.`, `Finish Line|Apologies, I've been double-booked as a start line in Lap 2. I'm already in the other room.`, `Finish Line|I was exactly where I said. I was just also, for a moment, elsewhere.`, `Finish Line|I'm in a meeting with myself. It's going very well. I'll come back to you.`, `Finish Line|I've been called 'difficult to pin down'. I'd like that on a plaque. The plaque is also moving.`, `Finish Line|Tell the others I'm okay. Tell them I'm in the middle distance. It's a nice area. It has a lot of distance.`, `Finish Line|I once got within 1.2 pixels of a snail. I think about it every day. I don't think about it. I write it down and then I move.` ],
    bubbles: [`sorry`, `so sorry`, `forgive me`, `pardon`, `terribly`, `ahem`, `(bows)`, `elsewhere!`, `not yet`, `sorry (again)`, `one moment`],
    near: [`Finish Line|Oh. You're close. I'm so sorry. I'm just going to be over there.`],
    flick: [`Finish Line|I am 12.4 away. Now 12.5. Now 12.4. I don't know who is doing this.`],
    sigh: [`Finish Line|(sighs)`],
    flStop: [`Finish Line|I have stopped moving. I did not plan this. I am just so very tired of being elsewhere.`, `Management|The finish line has stopped. The rivals have stopped. Nobody has been told why.`],
    b3: [`Management|The course is 3,000 pixels. The finish line is currently 3,000 pixels. It was 3,000 pixels a moment ago too.`, `Management|This is called a moving target. Please do not take it personally. The target has not.`],
    mile: [ `Management|You have passed KM #n#. A small sign has been erected. It is the same sign. It has been moved.`, `Management|Net progress: yes. Gross progress: also yes. The two have not met.`, `Management|You are 100 pixels from where you were. Where you were has been informed. It is moving on.`, `Management|Marker passed. Management thanks the marker for standing still. Somebody should.` ],
    hydStart: [`Management|Hydration Station. Hold to sip. Please do not rush the sip. The sip has been scheduled.`],
    hydBrenda: [`Brenda|Cup 7 of 7. I know it's cup 7 of 7. It's been cup 7 of 7 for several cups.`, `Brenda|It's dew. It's from this morning. It's from several mornings. I've combined the mornings.`, `Brenda|I want to say this is cup 7 of 7. It keeps being 7. I've stopped counting and it still does it.`],
    hydNoClick: [`Brenda|Please do not click while sipping. It is a sip. It is not a click.`],
    spill: [ `Management|You moved during a sip. The dew has been spilled. A volunteer sighs and refills it from a different dew.`, `Brenda|It's fine. It's cup 7 of 7. It's always been cup 7 of 7. I'll get another.`, `Management|Held. Not held. A held sip is a sip. A spilled sip is a lesson.`, `Brenda|The dew was fresh at 9. It is now a puddle with a past. I'll get another.` ],
    sipOk: [ `Management|Hydration: 100%. Performance: unchanged. Mood: damper.`, `Brenda|You did it. I'm not allowed to be proud. I'm proud. I have written it on the cup.`, `Management|The dew has been rated 'moist, with notes'. The notes are also dew.`, `Brenda|That's the first time anyone's finished one. I'd like to say I'm calm. I've dropped the ladle.` ],
    sipHalf: [`Brenda|Cup 7½ of 7. Don't ask. I have been told it is a member of the Club.`],
    cupRepost: [`Management|The hydration station has been quietly removed and re-posted ahead for your convenience.`, `Management|The cup has been collected. It was not touched. It was, however, looked at, which is on the form.`],
    preHyd: [`Management|You hydrated before you started. This is prehydration. It is not covered.`],
    brenda9: [`Brenda|Cup 7 of 7 again. I believe in you. I was not supposed to say that. It's on the cup.`],
    shellStart: [`Steward|Shell Inspection. We are looking for straightness. We are not looking for a reason.`, `Steward|Slightly left. No. Right. No. The other left.`, `Steward|A level has been consulted. The level has asked to be left out of it.`],
    shellOk: [`Steward|APPROVED. The shell is straight. It was always straight. We just needed to see it.`],
    shellFb: [`Steward|The shell has been approved as found. This is called a grandfather clause.`],
    cabbage: [`Management|A cabbage leaf has arrived. Hold to nibble. It is not a metaphor.`, `Management|+0 pixels. +1 pride. Pride is not a unit of distance, but the desk accepted it.`, `Management|The cabbage is gone. The cabbage was loved.`],
    held: [ `Management|Held keys count as one click. A snail is not a machine. It is a foot with ambitions.`, `Management|The key is still down. The key is very loyal. It is not helping.`, `Management|Holding a key does not hold the pixel. The pixel is not that kind of pixel.`, `Sandra from Compliance|A held key is ruled to be 'a long click, with a wish'. Wishes are not distance.` ],
    escape: [ `Management|Escape is not available during a marathon. Neither is a marathon, but here we are.`, `Management|Escape has been tried before. It was a tent. It is no longer a tent.`, `Management|The Escape key has been escorted off the premises. It has been given a coaster for the trip.` ],
    photoCap: [ `A photograph has been taken. You look determined. You also look like a snail. We were not able to separate the two.`, `Pictured: a snail, mid-pixel. The pixel declined to be photographed.`, `Exhibit A: forward.`, `Taken at the exact moment nothing happened.`, `Your good side. Snails are mostly side.`, `Candid. You had no idea. You still have no idea.`, `Photo finish: you finished. Of what is unclear.`, `Framed by Sandra. Sandra has flagged the frame.`, `Moist, but with purpose.`, `Gary can be seen in the background, one pixel ahead of the background.`, `Not pictured: Gary. Gary is pictured. He is one pixel out of frame, ahead.` ],
    photoSock: [`Photo: the sock. The sock is not in the photo. The photo is of the sock's absence.`],
    photoSay: [`Management|A new polaroid has been pinned. The shelf has been informed. The shelf declined to comment.`, `Management|Another polaroid. The shelf is filling up with proof that you were here, mostly in profile.`],
    weather: [ `Management|Light drizzle for 12 seconds. Slither is the same. The rain, however, looks heroic.`, `Management|The soundtrack has gained a cello. Nobody has asked where it came from.`, [`Hector|And the rain has made it a different race.`, `Maxine|It's the same race.`, `Hector|A wetter one.`] ],
    interview: [ `Sheila Zoomerton|No comment. I want that on the record. The record is a napkin.`, `Sheila Zoomerton|I'm not at liberty to say. I am at liberty to be slightly ahead.`, `Sheila Zoomerton|No comment, but I would like to thank the road.`, `Sheila Zoomerton|My representative is at lunch. It is Hector's lunch. They have shared it since Tuesday.`, `Sheila Zoomerton|I'll say this: moist. I'll say no more.`, `Sheila Zoomerton|No comment. That is a comment. I'm withdrawing it. No comment.`, `Sheila Zoomerton|Are we rolling? We're not rolling. Good. No comment.`, `Sheila Zoomerton|I have a statement. It's in my other visor.` ],
    memo: [ `Re: my position. I am currently somewhere. - FL`, `Re: Re: my position. Please note I have moved. See attached sorry.`, `FORMAL NOTICE. The undersigned (me) regrets to inform the snail (you) that the finish is, at this time, elsewhere.`, `Per my previous memo: I am still elsewhere. Per my previous previous memo: so were you.`, `MEMO TO FILE: I have no file. I have asked Sandra for a file. Sandra has flagged the request.`, `Thinking of you, from over here. It does not say where here is.`, `Re: Re: Re: my position. See above. Above is also elsewhere.`, `Re: the above. I have read the above. The above has read me. We are in agreement that nothing is agreed.`, `Gentle reminder that this memo is not gentle. Regards, the line you are trying to reach.` ],
    memoFb: [`Management|The memo has dismissed itself, formally.`, `Management|The memo has withdrawn. It left a forwarding address. The address is 'elsewhere, c/o me'.`],
    revBits: [ `Hector|I'm told this is allowed.`, [`Maxine|He's going backward.`, `Hector|He's going backward correctly.`], `Management|You are walking backward. The finish line has politely followed behind you. This is now a chaperoned retreat.`, `Finish Line|Welcome back. Are we doing this or not?`, `Hector|Backward is a direction. I am told it is also a kind of forward, if you are facing the other way.` ],
    revStart: [`Management|You have reached the start. The starting gun fires again. It is a different gun. It is smaller.`],
    revDone: [`Management|Marathon reversal complete. You have finished the marathon backward, which is not allowed. We must check with Sandra.`],
    rev75: [`Management|You are in the seventh and a half position.`],
    montage: [ `Management|Management would like to announce a moment of inspiration.`, `Management|A sunrise. Slow motion. You, in profile, dripping mildly. A piano, sincerely.`, `Management|BELIEVE. Believe in the pixel. The pixel believes in you. The pixel has not been consulted.`, `Management|You have trained for 14 seconds. You have gained 1 pixel. Management calls this 'a transformation'.` ],
    mcaps: [ `Rain. It does not matter. Drink it.`, `A leaf. You went around it. Look how far you have come.`, `Every great snail began as a very small snail.`, `They said you couldn't. They did not specify a pixel count.`, `Sunrise. You are 4 pixels further than yesterday. The sunrise is unimpressed.`, `Believe in yourself. Believe in the 0.3 pixels per second inside you.`, `A leaf. A different leaf. The same leaf, but you have grown.`, `Somewhere, a clock believes in you. The clock is wrong, with confidence.`, `The road is long. The road has also been short. The road has opinions.`, `Gary, in profile, one pixel ahead. He is part of your journey.`, `Slow is smooth. Smooth is fast. Fast is not applicable.`, `Stand up straight. You are a snail. Do your best with that.`, `Look how far you have come. It is the same distance as looking.`, `Winter. Spring. A long Thursday. You are still going.` ],
    pulseOk: [`Excellent`, `Excellent (Lower)`, `Excellent (Pending)`],
    mEnd: [`Management|Excellent.`],
    mSkip: [`Management|Montage skipped. Montage Debt has accrued. A man with a clipboard is already crying.`],
    clip: [`Clipboard Man|I'm here about the montage. Please do not make this about the montage.`, `Clipboard Man|The debt is collected. I'd like to say thank you. I'd also like to say I am sad.`],
    b8: [ `Management|Sandra from Compliance has flagged the finish line for relocating without Form 27B/6.`, `Management|The finish line has filed Form 27B/7. It was destroyed in 1998.`, `Hector|Section 9 of the terms of service of the booth: the booth is not responsible for what is said in the booth. Maxine, we are in the booth.`, `Maxine|Clause 14(c): the commentators may not be commentated on.`, `Hector|So who's been doing it?`, `Hector|We have stopped reading the script. We are now reading the terms of service of the booth. It has a better plot.` ],
    unitsA: [`Management|Course units have been updated to snail-lengths. A snail-length is 24 pixels. It was always 24 pixels. We just hadn't said.`],
    unitsB: [`Management|Course units have been updated to Tuesday-adjacent. Please do not ask which Tuesday.`],
    chip: [`Steward|Timing chip, please. ... It's a coaster. That's fine. It's logged.`, `Steward|You are required to be timed. We will time you. We will not tell you the time.`],
    stewardL: [`Steward|Please do not move during the crossing. The crossing is brief. It is also, to the steward, a lot.`, `Steward|Clipboard. Crossing. Do not slither. There are no consequences. There is a form.`],
    idle30: [ `Management|You have stopped. Management respects the stop. Management is also timing the stop.`, `Management|The marathon is paused only by you. The marathon has noticed. The marathon is not angry. The marathon is making a face.`, `Management|Thirty seconds. In snail terms that is a measurable amount of nothing. We are measuring it.`, [`Hector|He's stopped, Maxine.`, `Maxine|Is it tactics?`, `Hector|It's something with a plan. Whether the plan is stopping is not for us to say.`], `Management|Gary has glanced back. It is the first time Gary has glanced back. It was one pixel's worth of glance.` ],
    idle60: [ [`Hector|We'll go to the replay now.`, `Maxine|Of what?`, `Hector|The last minute.`, `Maxine|It looks the same as live.`, `Hector|Slower, Maxine. It's slower.`], `Management|One minute. The stop has been entered into the minutes. The minutes have been entered into a coaster.`, [`Maxine|He's very still.`, `Hector|Is he alive?`, `Maxine|He's a snail, Hector. It's the same shape either way.`], `Management|The snail is thinking. Management has asked about what. The snail has not replied, which is how it replies to everything.` ],
    idle90: [ `Management|The snail has withdrawn into its shell. Gary has walked all the way back to stand next to it. Gary says nothing. Gary is a good rival.`, `Hector|We're still live, Maxine.`, `Maxine|I know.`, `Hector|I'm saying it for the viewer.`, `Maxine|There is no viewer.`, `Hector|Well. Now there's a stop.`, `Gary|I just thought someone should be here. It's only a pixel. It's not even a vigil.`, `Management|The hydration station is flashing a cup nobody will drink. It is a gesture.` ],
    idle180: [ `Management|The rivals have formed a book club. Current book: the course map. Discussion is going badly.`, `Maxine|May I join? I have a sandwich.`, `Hector|Maxine, you have been asked to leave.`, `Maxine|It's a very good sandwich.`, `Management|You have achieved Lord High Archdeacon of Idling. The book club has been praised in the minutes.`, `Management|Any click ends the idle. The book club thanks you for your absence.` ],
    idle300: [ `Sheila Zoomerton|We finished the course map. We have started it again. It reads differently when you know the ending. There is no ending.`, `Management|The book club has become a reading group. The reading group has a treasurer. The treasurer is Turbo, under a tea towel.`, `Gary|I've been elected chair. It's only one pixel of authority. I intend to use all of it.`, `Management|The minutes of the reading group are being kept in a very small ledger. The ledger is a coaster. The coaster has been audited.` ],
    idle600: [ `Management|Ten minutes. The finish line has come over and is sitting next to your shell. It has not said anything. It has brought a very small flask.`, `Finish Line|I hope this is alright. I won't talk. I've never been this close and I don't know where to put my poles.`, `Management|Nobody is competing. Everybody is here. This is, at best, a picnic with a start line.`, `Hector|Maxine, I'd like to say something.`, `Maxine|Please don't.`, `Hector|I'll say it later.` ],
    idle120: [`Gary|Does anyone have the time? ... No. Of course. The clock is wrong, with confidence. I'll just say it's later.`, `Management|Two minutes. The rivals are using the pause to stretch. Sheila is stretching a rumour. Turbo is stretching under the tea towel, which is visible and troubling.`, [`Hector|If you've just joined us, the snail is currently not doing anything.`, `Maxine|You've missed nothing.`, `Hector|And it's going very well.`], `Management|The cricket has begun a very quiet solo. It is the same note. It is, to the cricket, the whole range.`],
    idle240: [`Management|Four minutes. The book club has finished the map and moved on to the legend. The legend is mostly 'pixels'.`, `Sheila Zoomerton|Does anyone want to hear my theory? The snail is on sabbatical. I have written it on a napkin. The napkin is on the record.`, `Turbo|(a small damp noise from under the tea towel, in a meeting tone)`, `Management|The sandwich has been moved to a side table. It is on the agenda as 'Any Other Business'.`],
    idle420: [`Management|Seven minutes. Management has been rereading its own memos. They are all about you. They are mostly about the pixel.`, `Management|Management would like to reassure you that it does not mind. Management has a sandwich. It is Maxine's. It was left here.`, `Gary|I've decided to take this as a compliment. One pixel ahead of a snail that's stopped is still, technically, ahead.`, `Management|The finish line has begun walking toward you at 0.5 pixels an hour. It has told no one. It has told the flask.`],
    idle900: [`Management|Fifteen minutes. Tuesday has been told you are busy. Tuesday is respecting this. Tuesday has never respected anything before.`, `Finish Line|I've been thinking. If you never move, I never have to leave. I don't mean that as pressure. I mean it as a plan.`, `Management|The cricket has stopped. It is listening to the quiet. It has never heard the quiet so clearly. It would like to thank you for it.`],
    idle1800: [`Management|Thirty minutes. You have not moved in thirty minutes. Management has framed this. It will hang in the lobby, near Dennis (Plant), who is thriving, and who is also, in his way, not moving.`, `Management|Per policy, an idle snail of thirty minutes is entitled to a certificate, a ribbon and a very small sigh. The sigh has been issued.`, `Management|There will be no further announcements. Management will simply be here, quietly, not announcing. It is the least we can do.`],
    wake: [ `Management|The snail has emerged. It has not said why. Management has not asked.`, `Management|The snail is back out. It would like you to know it was thinking. It has stopped.`, `Management|Welcome back. Gary has returned to his position. It took him a pixel. He did not complain.` ],
    wake4: [`Management|The book club has dissolved. The members thank you for your absence. Maxine has taken the sandwich home.`, `Management|The chairs have been stacked. The table has been folded. The book is still on the track. It is the course map.`],
    wake5: [`Gary|Oh. You're back. The reading group was going well. I am no longer chair. It was a short chair.`, `Management|The minutes have been closed. The treasurer has gone back under the tea towel and refuses to confirm the total.`],
    wake6: [`Finish Line|Oh! You're back. I'll go. I'm going. I've gone. It was a pleasure being near. Don't tell the others.`, `Management|The finish line has returned to its position. It is, again, elsewhere. It has left a very small flask.`],
    cracks: [ `Management|It is not about the distance. Sometimes I think it is. I think the distance is about you.`, `Management|I have never finished anything. I would like to see it, once.`, `Management|I am not fast. I am just afraid to be behind. (Management quotes this from a very old memo.)`, `Management|I would like it noted that I enjoyed this. It is not a metric.`, `Management|Management sounds, briefly, like a person. Management apologises. It will not happen again. It will.`, `Management|I read every one of your clicks. Not for the data. I just like that you did them.`, `Management|On Tuesdays I don't speak. I just hold the meeting. The meeting is also silent. It is the best meeting we have.`, `Management|Please don't tell Sandra I said 'proud'. I said 'compliant'. It sounded the same in the room.` ],
    spamA: [ `Steward|Stewards request that you click like you mean it, but gently.`, `Hector|I'm told that is a lot of clicking. I'm told by the stewards. They are exhausted.`, `Steward|The stewards ask that the snail click as though each pixel were its last. Then, please, have another pixel.`, [`Hector|That's a lot of clicks, Maxine.`, `Maxine|Is it a lot of pixels?`, `Hector|It's a lot of the same pixel.`], `Management|Click rate has reached 'enthusiastic'. The next tier is 'a concern'. The tier after that is Sandra.` ],
    spamB: [ `Management|Excessive velocity detected. A speed camera flashes. You have been fined 3 pixels. The pixels go to a good cause: Gary.`, `Management|You have been fined for movement. Movement is a privilege, like Thursdays.`, `Management|Fine #n#. Fines are held in a very small bucket. The bucket is labelled 'Gary'.`, `Management|A snail with a cap and a ticket book has pulled you over. You were on foot. He has stamped it 'foot, aggravated'.`, `Management|The speed camera has taken your photo. You look fast. You look like a snail. The two have been filed under 'fast, ish'.` ],
    spamC: [`Management|INCIDENT REPORT 14-B. At 11:42, a snail exceeded its own personal limits.`, `Management|The snail was wearing goggles. The goggles were not authorised.`, `Management|No one was hurt. Gary was one pixel ahead throughout. Please stop.`],
    spamC2: [`Management|INCIDENT REPORT 14-C. At 11:51 the snail moved with what witnesses call 'intent'. Management does not recognise intent.`, `Management|Three stewards, one cricket and a cutout were present. The cutout gave a statement. It said 'wow'.`, `Management|The incident is closed. The incident has been reopened. It has been closed again by a different incident.`],
    spamD: [ `Sandra from Compliance|I have drafted Policy 14-C. Clicks per second are now measured in Gary. A Gary is one click. At your rate you are about 9 Garys.`, `Sandra from Compliance|Effective immediately the snail may click no more than 7 times a second, rounded down to the nearest Gary.`, `Management|Sandra has stepped in. Sandra does not usually step. Please enjoy a moment of quiet.` ],
    club: [`Management|7 1/2 pixels. Welcome to the Club. The Club is a half. It meets in the middle of the floor.`, `Management|A small ceremonial curtain has appeared trackside. The rivals have saluted. Gary has saluted a little less.`],
    clubG: [`Gerald|Seven and a half. A man has to know when to be half. (He is wearing a hat.)`],
    sockStart: [`Management|A sock jogs through the crowd with a tiny map. It is on a journey. It has declined your interest in advance.`],
    sockKnown: [`Management|The sock is back. It has been sighted in other departments. This is its fourth department. It is running a pattern.`, [`Hector|Maxine, that's the sock.`, `Maxine|The sock from the news?`, `Hector|The sock from the other news.`]],
    sockHit: [`Management|The sock has no comment.`, [`Maxine|Is that.`, `Hector|We don't ask the sock.`], `Management|The sock did not stop. The sock has a train. The train is a small one.`, `Management|You clicked the sock. The sock felt it, in the sense that socks feel things, which is not a sense.`],
    sock3: [`Management|The sock has left a tiny note at the finish line. It says 'Thank you for noticing'.`, `Management|You have achieved Sock Whisperer, First Class. The sock has no comment.`],
    cricket: [`Management|The cricket has acknowledged you. It is the only crowd member who has.`],
    cricket7: [`Cricket|I was always the crowd.`, `Management|The cricket is sponsored by someone. We are looking into who. It is, tentatively, the crowd.`],
    birdHit: [`Management|A bird shadow. The snail has retracted. The bird saw nothing and left. You have all been very brave.`],
    birdOk: [`Hector|We did it, Maxine. We were all so still.`],
    song: [`A bird.`, `Went by.`, `We were brave.`, `That is all.`],
    payoff: [`Hector|Welcome back to the marathon. We've been told it is the same marathon.`, `Maxine|The sandwich was cheese.`, `Hector|I know.`, `Maxine|I just needed it said.`],
    saltA: [`Management|That was uncalled for.`, `Sponsor|Tarmac-Free Salt Alternative: (a long, thin wail)`, `Management|A moment of silence for the salt. It will last 7½ seconds. Thank you for your honesty.`],
    saltB: [`Management|The moment is over. Nobody was harmed. The salt remains a concept.`],
    saltStart: [`Management|The salt is under you. Please do not slither. The salt is thinking about it.`],
    saltEnd: [`Management|The salt has been swept away. It left a small note. The note is salt.`],
    shriek: [`Snail|eeeeeee.`, `Snail|(a very small scream)`, `Management|The snail has made a sound. We have documented the sound.`],
    tut: [`Steward|tut.`, `Steward|(a quiet, professional tut)`],
    shy: [`Management|The finish line has moved 2 pixels. This is not a malfunction. It is shy.`],
    guard: [`Management|The rivals have stopped and lined up along the track. Nobody asked them to. It is a guard of honour. It is also, technically, a queue.`, `Booth|The commentary booth has gone quiet. Hector and Maxine are both, for once, only watching. The microphone is still on. It is enjoying this.`, `Gary|I am still one pixel ahead. I would like it known that this is me standing aside. It is the same pixel. It is a different feeling.`],
    fakeA: [`Management|Congratulations.`],
    fakeB: [`Finish Line|Terribly sorry. That was the Distance Remaining banner. I'm over here.`],
    fakeC: [`Management|The Distance Remaining banner has been spoken to. It says it only wanted to see what 0.0 felt like. It felt, in its words, 'tidy'.`],
    garyStop: [`Gary|I could have crossed. I have been one pixel ahead for ten minutes. I just didn't want to be first. They are different. I have thought about it.`, `Management|Gary has stopped one pixel short of the line, on purpose, with a small red flag. Nobody has asked him why. He has an answer ready. It is one pixel long.`],
    swEsc: [`Management|The sandwich has left the booth under its own power. It has legs. Nobody saw them being added. A steward is giving chase at a professional jog.`, [`Hector|Maxine, your sandwich is on the track.`, `Maxine|It isn't mine. It's its own. It has been for a while.`]],
    swCatch: [[`Maxine|It was cheese. I just needed it said.`, `Hector|I know.`], `Management|The sandwich has been returned to the booth. It is no longer a sandwich of record. It is a sandwich of consequence.`],
    swGone: [[`Maxine|It's gone. It was cheese. I just needed that said.`, `Hector|I know, Maxine. I have always known.`], `Management|The sandwich has been reported missing. It has been reported found. It has been reported elsewhere. All three are on one form.`],
    payoff2: [`Hector|Welcome back to the marathon. Maxine, the sandwich?`, `Maxine|Still cheese.`, `Hector|Still known.`],
    slLbl: [`Management|The button has been relabelled 'still 1 px'. The change was reviewed by a committee of one and found accurate.`, `Management|The button now says '1 px, firmly'. Firmly is not a unit. It was added for morale.`, `Management|The button now says '1 px, with feeling'. The feeling has not been named. It is a small one.`],
    union: [ `Management|We are pausing the marathon. The Stapler has called a work stoppage. Management was not consulted. Management was in the room.`, `The Stapler|Local 7½ of the Staplers' Union demands the following. One. More staples. Two. Fewer pixels. Three. A chair.`, `The Stapler|Four. That Tuesday be recognised as a legal person, so that we may sue.`, `Management|Management will meet the Stapler halfway. The halfway point is 1,500 pixels. Management will wait there.` ],
    unionKnown: [`The Stapler|We've met. I remember you. You never stapled anything. I respected that.`],
    unionHit: [`The Stapler|This is a picket line. You are crossing it at 0 pixels per second. Impressive. Stay there.`, `The Stapler|Solidarity means everyone stops. Including the one who started.`, `Management|Your click has been noted and will be taken before a tribunal of one. The tribunal is in recess.`],
    unionEnd: [`Management|The Stapler has accepted a compromise: one chair, and the pixels stay. The chair is a coaster. The Stapler is moved. It makes a small ka-chunk.`, `The Stapler|Good faith. Good staples. Back to work. Nobody tell Tuesday.`],
    toast: [`Management|A slice of toast has arrived trackside. It has not said who sent it. It is warm. Please accept the toast.`],
    toastKnown: [`Management|The toast recognises you from the debate. It has not forgiven the debate. It has also not not forgiven it.`],
    toastOk: [`The Toaster|toast.`, `Management|Management has translated the toast. It says: 'You are doing fine.' Management cannot confirm this is what it says.`, `The Toaster|toast. toast, toast. (toast.)`, `Management|The toast may have said 'I believe in the pixel.' It may also have said 'I need a break from heat.'`],
    dennis: [`Management|A plant is being wheeled across the background on a small cart. It is Dennis (Plant). Dennis is thriving. Please do not applaud. Dennis has not asked.`],
    dennisKnown: [`Management|Dennis (Plant) recognises you from the lobby. Dennis (Plant) is a plant. He recognises you anyway. It is possible he is leaning.`],
    dennisHit: [`Management|Dennis (Plant) has noted your attention. Dennis (Plant) is not impressed. Dennis (Plant) has not been impressed since the lobby opened.`, `Management|Dennis (Plant) will take questions. There are no questions. Dennis (Plant) will take that, too.`, `Management|Dennis (Plant) has photosynthesised in your general direction. It is the most any of us can ask.`],
    pat: [`Finish Line|Yes? Oh. You said my name. Nobody says my name. They say 'the finish'.`, `Finish Line|Hello. I came over. I'm so sorry I came over. Is this too close? Tell me if this is too close.`, `Management|The finish line has moved 7½ pixels toward you of its own free will. This has not happened since before the paperwork.`],
    patBye: [`Finish Line|Thank you. I should go. I've enjoyed this more than I'm allowed to.`, `Finish Line|I'll be over there. Elsewhere. But it will be a warmer elsewhere than before.`],
    patFar: [`Finish Line|I can't come over right now. I'm being held in place. But I heard. I heard it very clearly.`],
    mini1: [[`Hector|Word from the Gary camp, Maxine. They're calling it a 'strategic one pixel'.`, `Maxine|What does that mean?`, `Hector|It means one pixel. They've added 'strategic' so it can be a lead.`]],
    mini2: [`Hector|The forecast for the next hour is clear, with a chance of cricket. We'll update you if the cricket gets involved.`],
    mini3: [[`Hector|Ladies and gentlemen, the wave.`, `Maxine|It's a wave of one.`, `Hector|Every wave begins as one, Maxine. Then it's 14 cutouts leaning the same way.`]],
    mini4: [`Management|We are now observing the Official Mid-Marathon Snack Interval. There are no snacks. The interval is being observed by the absence of snacks.`],
    mini5: [`Gary|I've renegotiated. My lead is still 1 pixel. But it now comes with dental.`, `Management|Gary's lead has been renewed for a further 1 pixel. Terms: standard. Dental: unclear.`],
    mini6: [`Sandra from Compliance|I audited the marathon. I found 3,000 pixels, 4 rivals, and 1 cricket who is not on the form. The cricket has been added to the form.`],
    mini7: [[`Maxine|Hector, I found the sandwich. It was in the booth. It was a prop.`, `Hector|A prop sandwich is still a sandwich.`, `Maxine|I've decided it is.`]],
    tue: [`Management|Tuesday has been sighted at the far edge of the course. It has not been introduced. It is standing very still, which is its way.`, `Hector|Maxine, that's Tuesday.`, `Maxine|I can't see it.`, `Hector|Nobody can. It's the idea of it, leaning.`, `Management|Please do not look at Tuesday directly. Look at it the way you look at the end of a meeting. Slightly to the side. Hopefully.`],
    tueEnd: [`Management|Tuesday has been informed that you crossed. Tuesday said it would be in touch. It did not say which Tuesday.`],
    xm: { 'pet-rock': `Maxine|My pet rock would win this. It has never moved. It has never lost. It's the one thing in my house with a record.`, 'complaints-dept': `Hector|I've filed three complaints about this broadcast. They are filed under 'Hector'. Hector is a department.`, 'elevator-simulator': `Finish Line|I rode an elevator once. It stopped at 7½. I stayed on. It's the closest I've come to a destination.`, 'staring-contest': `Maxine|I once watched a staring contest where nobody blinked. Nobody. It's the most emotional thing I've seen, other than this.`, 'the-button': `Hector|I once pressed a button and nothing happened. I'm still waiting for the meeting about it.`, 'whack-a-nothing': `Management|You have whacked nothing before. We have you on file as a whacker. Of nothing. The distinction matters to the file.`, 'cloud-gazer': [`Maxine|I saw a cloud earlier that looked like you, Hector.`, `Hector|Which part?`, `Maxine|The part that was drifting.`], 'potato-interview': `Management|You have interviewed a potato. Management asked the potato for a reference. The potato gave Gerald.`, 'chair-rearranger': `Management|We note you have rearranged chairs before. The book club has requested you for the Q3 seating.`, 'tiny-bureaucracy': `Sandra from Compliance|You have filed forms before. You are on a list. The list is also a form.`, 'toaster-debate': `The Toaster|toast. (it remembers the debate. it has made peace with the debate.)` },
    eyes: [`Management|The crowd has turned to look at you. The crowd is 14 cutouts. They were already looking. They have simply decided to mean it.`],
    cross: [`Management|You have crossed the finish line. Congratulations. This crossing has been marked Provisional pending Sandra.`, `Hector|The whole booth is on its feet, Maxine. The booth is standing.`, `Maxine|The booth is a toaster, Hector.`],
    gerSpeech: [`Gerald|Every pixel is a small potato, and every potato is eventually a chip. Wear this bottle cap with pride, or at least with ribbon.`, `Management|Gerald was told it was a different event. He has stayed anyway.`],
    official: [`Management|The official time is 10:03.4. That is a time. Management awards you 5 Meh. Per policy, that is exactly 5.`],
    stampL: [`Management|Sandra from Compliance's stamp has landed: PROVISIONAL. The timing chip was a coaster.`],
    sandraL: [`Sandra from Compliance|The reverse also says PROVISIONAL. I checked. It is stamped both ways, for your safety.`],
    newHat: [`Management|The finish line is now the starting line of Lap 2 of infinity. It has put on a different hat.`, `Finish Line|I've already moved. I'm in the other room. It's the start of the next one.`],
    desk: [`Management|The course measures 7½ centimetres. You have covered it 31 times. This is within tolerance. - S. (Compliance)`],
    leave: [`Management|You may leave at any time. The marathon will remain, loyally, a marathon.`],
    lap: [ `Management|Lap #n# of infinity. KPIs reset. Mood: resilient. Distance remaining: 3,000.0 px. A familiar number. It missed you.`, `Finish Line|Terribly sorry. I was exactly here. I was also, as you know, a start line.`, `Gary|One pixel ahead. Nothing has changed. It's so you have someone to chase.`, `Sheila Zoomerton|I'd like to congratulate you again. I'm still not sure what it was.`, `Finish Line|Back soon (always).` ],
    rules: [ `Management|Lap 2 rule: the course is now measured in snail-lengths. Nobody consulted the snail-lengths.`, `Management|Lap 3 rule: sponsors have swapped. Gary is now Gary (Self-Funded). Gary is thriving, financially.`, `Management|Lap 4 rule: the hydration station has moved to the left. It says it has always been on the left.`, `Management|Lap 5 rule: the track has a banked turn. It does nothing. It is very banked.`, `Management|Lap 6 rule: the rivals now face backward. They are still going forward. Management admires the commitment.`, `Management|Lap 7 rule: the spam thresholds are doubled, and the fines are doubled too. This is called equity.` ],
    ruleBack: [`Management|Lap #n# rule: an old rule has returned, slightly different. It has put on weight.`],
    b10: [ `Management|The rivals have stopped. They are not winning. They are waiting. Nobody explains why.`, `Gary|Go on. I'm one pixel ahead. I've always been one pixel ahead. It's so you have someone to chase.`, `Finish Line|I just want you to arrive. I also would like to be somewhere else. These are both true.`, `Management|R reads 1.0 pixel. It has never read 1.0 pixel. The number has asked for a moment.`, `Hector|I think he's going to do it.`, `Maxine|He's been going to do it for ten minutes.`, `Hector|I know. It is going to be a lot.` ],
    b9: [ `Management|The sky has gone golden. No reason has been given. None was requested.`, `Management|Everyone is in rhythm. It is quietly overwhelming. Management has asked for a moment.`, `Management|The rivals sync their clicks. A cello begins. Nobody put it there. It is simply here.` ],
    overtaken: [ [`Maxine|Sheila's through. Hector, I did not see Sheila get through.`, `Hector|Nobody has, Maxine. She is a rumour with a hat.`], `Hector|Sheila has overtaken. This has happened before. This is how overtaking works.`, `Management|Sheila Zoomerton has overtaken you. Consolation Meh: 0.1. Both parties are fine.`, [`Maxine|Sheila is ahead.`, `Hector|By how much?`, `Maxine|A snail.`, `Hector|That's helpful.`], [`Hector|Sheila is through. Maxine, is that a team effort?`, `Maxine|Everything is, in the file.`] ]
  };
  const INTRO = [
    { n: 'Gary', s: 'Moist-O-Matic', l: `I don't know how I'm ahead either. I just woke up like this. One pixel.` },
    { n: 'Sheila Zoomerton', s: 'Slow Lane Mutual', l: `I train by thinking about the road. The road is very supportive.` },
    { n: 'Turbo', s: 'none (disqualified)', l: `Turbo is a slug. Turbo has been disqualified for being a slug. Turbo is under a tea towel and carrying on regardless.` },
    { n: `Yesterday's You`, s: 'none', l: `Yesterday's You is #n# px ahead. Yesterday's You did not sleep. Yesterday's You is fine.` }
  ];
  const SPONS = [['Moist-O-Matic', 'Slow Lane Mutual', 'Gary Inc.'], ['the concept of Gary', 'Slow Lane Mutual (Pending)', 'Gravel, Provisional'], ['Gary (Self-Funded)', 'A Sponsor', 'We Support You (As Needed)']];
  const EFF = [1, 0.9, 0.6, 0.5, 0.4, 0.3, 0.2, 0.1, 0.05, 0];
  const ATH = [0, 20, 50, 80, 120, 180, 270, 360, 450, 540];
  const PTH = [0, 15, 100, 200, 350, 550, 800, 1100, 1450, 1700];

  P.registerModule({
    id: 'snail-marathon',
    title: 'Snail Marathon',
    tagline: '3,000 pixels. One per click. The finish line is very sorry.',
    icon: '🐌',
    category: 'game',
    unlockCost: 0,
    tags: ['clicker', 'race', 'patience'],
    mount(root, api) {
      const el = api.el, sel = !!api.selftest, AS = sel ? 100 : 1;
      const tm = (ms) => (sel ? Math.max(40, ms * 0.1) : ms);
      const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
      const INK = '#2B2118', CREAM = '#FFF4DC', MINT = '#9BE0C4', MINTD = '#7FCFAE', CORAL = '#FF7A66', MUS = '#F2B93B', LIL = '#C3A6F0', SKY = '#BFE3F2';
      const ST = (n, k) => api.stat.inc('snail-marathon.' + n, k === undefined ? 1 : k);
      const ach = (n) => api.achieve('snail-marathon.' + n);
      const ENG = { Management: 1, Gerald: 1, 'Sandra from Compliance': 1, 'Finish Line': 1 };
      const sv = (k, d) => api.save.get(k, d);
      const now0 = api.now();
      const bestP0 = Number(sv('bestP', 0)) || 0;
      const S = {
        dead: false, P: 0, T: 0, Tgoal: 0, Tanim: null, pin: null, lap: 1, beat: 1, A: 0, rt: 0, fired: {}, busy: null, ev: null, evId: 0,
        evTimer: sel ? 1.5 : 20, evBag: [], front: [], lastEv: '', lastInput: now0, lastTick: now0, lastFrame: now0, hiddenAt: 0,
        idleStage: 0, withdrawn: false, garyOff: 1, garyAnim: null, interest: 100, sw: 0, swInt: 0, units: 'px', unitsAt: 0,
        clicks: [], acc: [], okTimes: [], inRhythm: false, streak: 0, rhythmSeen: false, cd: {}, bags: {}, lastEng: -1e9, lastCom: 0,
        cw: 0, ch: 0, dpr: 1, snailX: 100, y0: 60, lh: 30, sc: 1, loupe: { on: false, pinned: false, ptr: null, auto: 0 },
        floats: [], slime: [], slimeAt: 0, lastBucket: 0, lastMile: 0, pixAcc: 0, pixLog: [], bestLap: 0, ghost: bestP0 > 0 ? clamp(bestP0, 60, 5000) : 400, ghostPassed: false,
        squish: 0, shakeUntil: 0, goggles: 0, damp: false, hold: null, holdKey: false, holdAt: 0, cup: 0, salt: null, steward: null, bird: null, sock: null, rain: null,
        shell: null, cab: 0, sponsor: null, montage: null, mt: [], intro: null, retract: 0, flBubble: null, flHat: -1, stampT: 0, curtain: 0, salute: 0,
        silent: false, recoil: 0, cheer: 0, gerald: null, crossed: false, ending: false, endingReady: false, lockEnding: false, memoI: 0, adI: -1, debt: 0,
        rules: new Set(), sync: 0, freeze: false, sheilaFz: 0, phase: Math.PI, prevSh: -1, lastOver: -1e9, wrong: 0, leftRun: 0, revDone: false,
        typed: '', elegance: 0, lastZX: '', heldIgn: 0, escSaid: false, firstClick: false, bookclub: false, cupBlink: false, glitter: 0, cricketCard: 0,
        ptrFlag: 0, keyFlag: 0, flBow: 0, chat: sel ? 1.2 : 12, mg: sel ? 3 : 25, bits: 0, lastBird: -1e9, overtakes: 0, apol: 0, apolFill: 0, rev75: false,
        sockForced: false, wake: 0, tilt: 0, drag: null, boardKey: '', zs: 0, gone: 0, goneSaid: false, cheese: false, ladderI: 0, fireTimer: 0,
        clapUntil: 0, speed: 0, tinyBubble: null, swoosh: 0, club75: 0, wrongDone: false, mgN: 0, fc: 0, lpT: 0, endT: 0, adT: 0, saltT: 0, flickT: 0, tokN: 0,
        spamMul: 1, finalMode: false, endTimer: 0, deskUntil: 0, bgSeed: 0, beatNote: 0, lapStart: now0, swQ: 0, rainDrops: [], bankT: 0, flFlick: 0,
        swc: 0, toastN: 0, escN: 0, wakeFrom: 0, dennis: null, toast: 0, union: null, tue: false, rareForced: {}, sit: null, spamCN: 0, xmN: 0, dennisHits: 0,
        swOut: false, swRun: null, fake: null, nSl: 0, coarse: false
      };
      S.reduced = false;
      const rm = () => { S.reduced = !!(S.mql && S.mql.matches) || !!(root.closest && root.closest('.pm-reduce-motion')); };
      try { S.mql = window.matchMedia('(prefers-reduced-motion: reduce)'); api.on(S.mql, 'change', rm); S.coarse = !!window.matchMedia('(pointer: coarse)').matches; } catch (e) { /* no matchMedia */ }
      rm();

      /* ---------- DOM ---------- */
      const cv = el('canvas', { class: 'm-snail-marathon-cam', role: 'img', 'aria-label': 'Race track camera. Tap or click to slither one pixel.' });
      const cx = cv.getContext('2d');
      const lp = el('canvas', { class: 'm-snail-marathon-loupe', width: 96, height: 96, 'aria-hidden': 'true' });
      const lctx = lp.getContext('2d');
      const lw = el('div', { class: 'm-snail-marathon-loupewrap', 'aria-hidden': 'true', hidden: true }, lp);
      const ov = el('div', { class: 'm-snail-marathon-overlay' });
      const flashEl = el('div', { class: 'm-snail-marathon-flash', 'aria-hidden': 'true' });
      const goldEl = el('div', { class: 'm-snail-marathon-gold', 'aria-hidden': 'true' });
      const trackbox = el('div', { class: 'm-snail-marathon-trackbox' }, cv, ov, flashEl, goldEl, lw);
      const mkTile = (label) => { const v = el('div', { class: 'm-snail-marathon-tv', text: '0' }); return { box: el('div', { class: 'm-snail-marathon-tile' }, el('div', { class: 'm-snail-marathon-tl', text: label }), v), v: v }; };
      const tD = mkTile('DISTANCE TO FINISH'), tP = mkTile('POSITION'), tS = mkTile('SLIME'), tC = mkTile('PACE');
      const dNum = el('span', { text: '3,000.0' }), dUnit = el('small', { text: 'px' });
      tD.v.textContent = ''; tD.v.appendChild(dNum); tD.v.appendChild(dUnit);
      const lapChip = el('span', { class: 'm-snail-marathon-chip', text: 'LAP 1 OF INFINITY' });
      const unitChip = el('span', { class: 'm-snail-marathon-chip m-snail-marathon-pl', text: 'units: px' });
      const board = el('span', { class: 'm-snail-marathon-chips', 'aria-label': 'Standings' });
      const course = el('svg', { class: 'm-snail-marathon-course', viewBox: '0 0 300 24', role: 'img', 'aria-label': 'The Course, 7 and a half kilometres' });
      const dot = el('circle', { cx: 2, cy: 8, r: 1, fill: INK });
      course.appendChild(el('line', { x1: 2, y1: 8, x2: 298, y2: 8, stroke: INK, 'stroke-width': 1 }));
      course.appendChild(el('line', { x1: 2, y1: 4, x2: 2, y2: 12, stroke: INK, 'stroke-width': 1 }));
      course.appendChild(el('line', { x1: 298, y1: 4, x2: 298, y2: 12, stroke: INK, 'stroke-width': 1 }));
      course.appendChild(dot);
      course.appendChild(el('text', { x: 150, y: 21, 'text-anchor': 'middle', 'font-size': 9, 'font-weight': 700, fill: INK }, 'The Course (7½ km)'));
      const mkFace = (name) => {
        const face = el('div', { class: 'm-snail-marathon-face' }, el('span', { class: 'm-snail-marathon-eye' }), el('span', { class: 'm-snail-marathon-eye' }), el('span', { class: 'm-snail-marathon-mic', 'aria-hidden': 'true' }));
        return { face: face, label: el('span', { text: name }) };
      };
      const hec = mkFace('Hector'), mac = mkFace('Maxine');
      const sandBtn = el('button', { class: 'm-snail-marathon-sand', type: 'button', 'aria-label': 'Maxine\'s sandwich', onclick: () => { noteInput(); speak('swClick', {}, Math.min(S.swc++, LN.swClick.length - 1)); } });
      const heads = el('div', { class: 'm-snail-marathon-heads' },
        el('div', { class: 'm-snail-marathon-person' }, hec.face, hec.label),
        el('div', { class: 'm-snail-marathon-person' }, mac.face, mac.label, sandBtn),
        el('div', { class: 'm-snail-marathon-cut', text: 'wow' }),
        el('div', { class: 'm-snail-marathon-sign', text: 'BACK AFTER LUNCH' }),
        el('div', { class: 'm-snail-marathon-plate', 'aria-hidden': 'true' }));
      const barFill = el('b', { style: 'width:100%' });
      const bar = el('div', { class: 'm-snail-marathon-bar', role: 'img', 'aria-label': 'Commentator interest' }, barFill);
      const caps = el('div', { class: 'm-snail-marathon-caps', 'aria-live': 'polite', 'aria-label': 'Commentary' });
      const booth = el('div', { class: 'm-snail-marathon-booth' }, heads, el('div', { class: 'm-snail-marathon-meter' }, el('span', { text: 'INTEREST' }), bar), caps);
      const go = el('button', { class: 'm-snail-marathon-go', type: 'button' }, 'SLITHER (1 px)');
      const loupeBtn = el('button', { class: 'm-snail-marathon-btn', type: 'button', 'aria-pressed': 'false', 'aria-label': 'Toggle loupe' }, 'Loupe');
      const slot = el('div', { class: 'm-snail-marathon-slot' });
      const shelf = el('div', { class: 'm-snail-marathon-shelf', 'aria-label': 'Polaroids' });
      const escHint = el('span', { hidden: true }, el('kbd', { text: 'Esc' }), ' skip montage');
      const kbd = el('div', { class: 'm-snail-marathon-kbd' },
        el('span', {}, el('kbd', { text: 'Space' }), ' ', el('kbd', { text: 'Enter' }), ' slither'), el('span', {}, el('kbd', { text: 'Z' }), ' ', el('kbd', { text: 'X' }), ' alternate'),
        el('span', {}, el('kbd', { text: 'L' }), ' loupe'), el('span', {}, el('kbd', { text: 'H' }), ' sip'), escHint);
      const wrap = el('div', { class: 'm-snail-marathon-wrap' },
        el('div', { class: 'm-snail-marathon-score' }, tD.box, tP.box, tS.box, tC.box),
        el('div', { class: 'm-snail-marathon-chips' }, lapChip, unitChip, board),
        el('div', { class: 'm-snail-marathon-main' }, el('div', { class: 'm-snail-marathon-left' }, trackbox, course,
          el('div', { class: 'm-snail-marathon-controls' }, el('div', { class: 'm-snail-marathon-row' }, go, loupeBtn), slot)), booth),
        shelf, kbd);
      root.appendChild(wrap);
      api.setTitle('Snail Marathon');

      /* ---------- small helpers ---------- */
      const num = (n) => { if (!Number.isFinite(n)) return '0.0'; if (Math.abs(n) < 0.05) n = 0; return n.toLocaleString('en-US', { minimumFractionDigits: 1, maximumFractionDigits: 1 }); };
      const script = (fn, ms) => api.setTimeout(() => { if (!S.dead) fn(); }, tm(ms));
      const rawWait = (fn, ms) => api.setTimeout(() => { if (!S.dead) fn(); }, ms);
      const bagNext = (name) => {
        let b = S.bags[name];
        if (!b) b = S.bags[name] = { q: [], last: null };
        if (!b.q.length) { b.q = api.shuffle(LN[name]); if (b.q.length > 1 && b.q[b.q.length - 1] === b.last) b.q.unshift(b.q.pop()); }
        b.last = b.q.pop();
        return b.last;
      };
      const pace = () => { const t = api.now(); S.pixLog = S.pixLog.filter((e) => t - e.t < 5000); let s = 0; S.pixLog.forEach((e) => { s += e.a; }); return s / 5; };
      const sub = (text) => String(text).replace(/\{player\}/g, () => String(api.player.name || 'Valued Employee')).replace(/\{meh\}/g, () => String(api.fmt(api.meh()))).replace(/#pace#/g, () => num(pace()))
        .replace(/#n#/g, () => String(S.tokN === undefined || S.tokN === null ? 0 : S.tokN));
      const okText = (t) => !/(^|[^A-Za-z])(undefined|NaN|null)([^a-z]|$)|\[object/.test(t);
      function caption(who, text, spoken) {
        caps.appendChild(el('div', { class: 'm-snail-marathon-cap', 'aria-hidden': spoken ? 'true' : null }, el('b', { text: who + ': ' }), text));
        while (caps.children.length > 8) caps.removeChild(caps.firstChild);
        const f = who === 'Hector' ? hec.face : who === 'Maxine' ? mac.face : null;
        if (f) { f.classList.add('m-snail-marathon-talk'); rawWait(() => f.classList.remove('m-snail-marathon-talk'), 900); }
      }
      function say(who, text, o) {
        o = o || {};
        text = sub(text);
        if (!okText(text) || !text) return false;
        let spoken = false;
        if (o.engine || ENG[who]) {
          const t = api.now();
          if (t - S.lastEng >= 4000 || o.force || (o.priority || 0) >= 1) { S.lastEng = t; spoken = !!api.say(text, { who: who, mood: o.mood || 'neutral', priority: o.priority || 0 }); }
        }
        caption(who, text, spoken);
        return true;
      }
      function spk1(s, o) { const i = s.indexOf('|'); return say(s.slice(0, i), s.slice(i + 1), o); }
      function play(it, o) {
        if (Array.isArray(it)) {
          if (S.bits > 4) return;
          it.forEach((s, i) => { S.bits++; script(() => { S.bits--; spk1(s, o); }, i * 2500); });
        } else spk1(it, o);
      }
      function speak(key, o, fixed) { play(fixed === undefined ? bagNext(key) : LN[key][fixed], o); }
      function xmod() {
        const ids = Object.keys(LN.xm).filter((id) => api.stat.get(id + '.entered') > 0);
        if (!ids.length) return false;
        play(LN.xm[ids[S.xmN++ % ids.length]]); return true;
      }
      function sfx(n) { if (!S.silent) api.sfx(n); }
      function keepFocus(host) { try { const a = document.activeElement; if (a && a !== go && host.contains(a)) go.focus({ preventScroll: true }); } catch (e) { /* focus unavailable */ } }
      function setSlot(node) { keepFocus(slot); slot.textContent = ''; if (node) slot.appendChild(node); }
      function setOverlay(node) { keepFocus(ov); ov.textContent = ''; if (node) ov.appendChild(node); }
      function flash() { if (S.reduced) return; flashEl.classList.add('m-snail-marathon-on'); rawWait(() => flashEl.classList.remove('m-snail-marathon-on'), 70); }
      function confetti(n) { api.confetti(undefined, undefined, S.reduced ? Math.min(n, 20) : n); }
      const sponsorSet = () => SPONS[S.beat >= 9 ? 2 : S.beat >= 6 ? 1 : 0];

      /* ---------- distance model ---------- */
      function easeOut(k) { return 1 - (1 - k) * (1 - k); }
      function setT(target, ms) { S.Tgoal = target; S.Tanim = { from: S.T, to: target, t0: api.now(), dur: Math.max(1, ms) }; }
      function bumpT(d) { setT(S.Tgoal + d, 400); }
      function setPin(val, ms, done) {
        const from = S.pin ? S.pin.val : getR();
        S.pin = { val: from, from: from, to: val, t0: api.now(), dur: Math.max(1, ms), done: done || null, flick: 0 };
      }
      function getR() {
        let r;
        if (S.crossed) return 0;
        if (S.pin) r = S.pin.val + (S.pin.flick || 0); else r = 3000 - S.P + S.T;
        if (!Number.isFinite(r)) r = 3000;
        return Math.max(S.pin ? 0.5 : 1, r);
      }
      function unitDiv() { return S.units === 'snail-lengths' ? 24 : S.units === 'Tuesday-adjacent' ? 180 : 1; }
      function animate(now, dt) {
        const a = S.Tanim;
        if (a) { const k = clamp((now - a.t0) / a.dur, 0, 1); S.T = a.from + (a.to - a.from) * easeOut(k); if (k >= 1) { S.T = a.to; S.Tanim = null; } }
        const p = S.pin;
        if (p && p.to !== null && p.t0) { const k = clamp((now - p.t0) / p.dur, 0, 1); p.val = p.from + (p.to - p.from) * easeOut(k); if (k >= 1) { p.val = p.to; p.t0 = 0; if (p.done) { const f = p.done; p.done = null; f(); } } }
        const g = S.garyAnim;
        if (g) { const k = clamp((now - g.t0) / g.dur, 0, 1); S.garyOff = g.from + (g.to - g.from) * easeOut(k); if (k >= 1) { S.garyOff = g.to; S.garyAnim = null; } }
        S.flBow = Math.max(0, S.flBow - dt / 400);
        if (S.hold) { const ring = slot.querySelector('.m-snail-marathon-ring'); if (ring) ring.style.setProperty('--p', String(Math.round(clamp((now - S.hold.t0) / S.hold.dur, 0, 1) * 360))); }
      }
      function garyTo(off, ms) { S.garyAnim = { from: S.garyOff, to: off, t0: api.now(), dur: ms }; }
      const sheilaOff = () => (S.freeze ? S.sheilaFz : 38 * Math.sin(2 * Math.PI * S.rt / 80 + S.phase));
      const turboOff = () => (S.freeze ? 14 : 14 + 3 * Math.sin(S.rt / 3));

      /* ---------- HUD ---------- */
      function hud() {
        const R = getR();
        const fk = S.fake ? clamp((api.now() - S.fake.t0) / S.fake.ms, 0, 1) : 0;
        dNum.textContent = num(R * (1 - easeOut(fk)) / unitDiv());
        dUnit.textContent = S.units;
        let ahead = 0;
        if (S.garyOff > 0) ahead++;
        if (sheilaOff() > 0) ahead++;
        if (turboOff() > 0) ahead++;
        if (S.ghost > S.P) ahead++;
        tP.v.textContent = (ahead + 1) + ' of 5';
        const sp = Math.round(S.P * 10) / 10;
        tS.v.textContent = sp.toLocaleString('en-US', { maximumFractionDigits: 1 }) + ' px';
        tC.v.textContent = num(pace()) + ' px/s';
        lapChip.textContent = 'LAP ' + S.lap + ' OF INFINITY';
        unitChip.textContent = 'units: ' + S.units;
        const i = S.interest;
        heads.style.setProperty('--lid', i >= 60 ? '0%' : i >= 30 ? '35%' : '55%');
        barFill.style.width = Math.round(i) + '%';
        bar.style.setProperty('--lid', i >= 60 ? '0%' : i >= 30 ? '30%' : '55%');
        booth.classList.toggle('m-snail-marathon-cradle', i < 30 && i >= 1);
        booth.classList.toggle('m-snail-marathon-gone', i < 1);
        const n = Math.min(4, S.sw); sandBtn.hidden = n === 0 || S.swOut;
        if (sandBtn.children.length !== n) { sandBtn.textContent = ''; for (let k = 0; k < n; k++) sandBtn.appendChild(el('i')); }
        dot.setAttribute('cx', String(2 + 296 * clamp(S.P / 3000, 0, 1)));
        const list = [{ n: 'Gary', x: S.P + S.garyOff }, { n: 'Sheila', x: S.P + sheilaOff() }, { n: 'You', x: S.P }, { n: 'Yesterday', x: S.ghost }].sort((a, b) => b.x - a.x);
        const names = list.map((r) => r.n);
        names.splice(2, 0, 'Turbo');
        const key = names.join(',');
        if (key !== S.boardKey) {
          S.boardKey = key;
          board.textContent = '';
          names.forEach((n, k) => board.appendChild(el('span', { class: 'm-snail-marathon-chip' + (n === 'Turbo' ? ' m-snail-marathon-dq' : n === 'You' ? ' m-snail-marathon-me' : ' m-snail-marathon-pl'), text: (k + 1) + ' ' + n + (n === 'Turbo' ? ' (DQ)' : '') })));
        }
      }

      /* ---------- canvas: sizing, snail, props ---------- */
      const grass = [];
      { let a = 1234; const rnd = () => { a |= 0; a = (a + 0x6D2B79F5) | 0; let t = Math.imul(a ^ (a >>> 15), 1 | a); t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t; return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
        for (let i = 0; i < 90; i++) grass.push({ x: rnd() * 700, l: Math.floor(rnd() * 5), h: 3 + rnd() * 5 }); }
      function size() {
        const w = cv.clientWidth;
        if (w < 10) { S.cw = 0; return; }
        const h = clamp(Math.round(w * 6 / 16), 200, 300), d = window.devicePixelRatio || 1;
        if (w === S.cw && h === S.ch && d === S.dpr) return;
        S.cw = w; S.ch = h; S.dpr = d;
        cv.width = Math.round(w * d); cv.height = Math.round(h * d); cv.style.height = h + 'px';
        lp.width = Math.round(96 * d); lp.height = Math.round(96 * d);
        S.snailX = Math.round(0.32 * w); S.y0 = Math.round((h - 40) * 0.34); S.lh = (h - 40 - S.y0) / 5; S.sc = Math.min(1.05, S.lh / 33);
      }
      function rr(c, x, y, w, h, r) { c.beginPath(); c.moveTo(x + r, y); c.arcTo(x + w, y, x + w, y + h, r); c.arcTo(x + w, y + h, x, y + h, r); c.arcTo(x, y + h, x, y, r); c.arcTo(x, y, x + w, y, r); c.closePath(); }
      function chip(c, text, x, y, bg) {
        c.font = '800 9px ui-rounded,system-ui,sans-serif'; const w = c.measureText(text).width + 8;
        if (S.cw > 60 && x + w > S.cw - 3) x = S.cw - 3 - w;
        c.fillStyle = bg || '#fff'; c.strokeStyle = INK; c.lineWidth = 1.5; rr(c, x, y - 9, w, 12, 5); c.fill(); c.stroke();
        c.fillStyle = INK; c.fillText(text, x + 4, y);
      }
      function drawShell(c, x, y, r, col, s) {
        c.beginPath(); c.arc(x, y, r, 0, 6.2832); c.fillStyle = col; c.fill(); c.stroke();
        c.beginPath(); const n = 3.5 * 6.2832;
        for (let a = 0; a <= n; a += 0.25) { const rr2 = 0.8 + a / n * (r - 2), px = x + Math.cos(a) * rr2, py = y + Math.sin(a) * rr2; if (a === 0) c.moveTo(px, py); else c.lineTo(px, py); }
        const lw = c.lineWidth; c.lineWidth = lw * 0.6; c.stroke(); c.lineWidth = lw;
        c.beginPath(); c.arc(x, y, r - 3, 3.5, 4.5); c.strokeStyle = 'rgba(255,255,255,.75)'; c.stroke(); c.strokeStyle = INK;
      }
      function drawSnail(c, x, y, s, o) {
        c.save();
        c.translate(x + (o.jx || 0), y);
        c.scale(s * (o.flip ? -1 : 1) * (o.sx || 1), s * (o.sy || 1));
        if (o.alpha !== undefined) c.globalAlpha = o.alpha;
        c.lineWidth = 2.4 / s; c.lineJoin = 'round'; c.lineCap = 'round'; c.strokeStyle = INK;
        const t = o.t || 0;
        if (o.closed) {
          c.beginPath(); c.moveTo(-20, 0); c.quadraticCurveTo(-24, -26, 0, -26); c.quadraticCurveTo(24, -26, 20, 0); c.closePath(); c.fillStyle = o.shell || CORAL; c.fill(); c.stroke();
          c.beginPath(); for (let a = 0; a < 18; a += 0.3) { const rr2 = 1 + a * 0.9, px = Math.cos(a) * rr2, py = -12 + Math.sin(a) * rr2 * 0.8; if (a === 0) c.moveTo(px, py); else c.lineTo(px, py); } c.lineWidth = 1.4 / s; c.stroke();
          c.fillStyle = INK; c.font = 'bold 9px sans-serif'; const zz = (t * 2) % 3; c.globalAlpha = 1 - zz / 3; c.fillText('z', 14 + zz * 5, -26 - zz * 7); c.globalAlpha = 1;
        } else {
          const stretch = o.noShell ? 1.18 : 1;
          c.beginPath(); c.moveTo(-22 * stretch, 0); c.quadraticCurveTo(-27 * stretch, -5, -19 * stretch, -7); c.lineTo(9, -8); c.quadraticCurveTo(22, -11, 24, -3); c.quadraticCurveTo(24, 0, 18, 0); c.closePath();
          c.fillStyle = o.noShell ? '#D9CDA0' : '#C8E8B0'; c.fill(); c.stroke();
          const wob = Math.sin(t * 3 + (o.ph || 0)) * 1.6, up = o.droop ? -13 : -22, ex = [], ey = [];
          for (let k = 0; k < 2; k++) {
            const x0 = 15 + k * 5; ex[k] = x0 + 2 + wob; ey[k] = up + k * 1.5;
            c.beginPath(); c.moveTo(x0, -8); c.lineTo(ex[k], ey[k]); c.stroke();
            c.beginPath(); c.arc(ex[k], ey[k], 2.4, 0, 6.3); c.fillStyle = '#fff'; c.fill(); c.stroke();
            c.beginPath(); c.arc(ex[k] + 0.6, ey[k], 0.9, 0, 6.3); c.fillStyle = INK; c.fill();
          }
          if (!o.noShell) { c.save(); c.translate(-3, -15); c.rotate((o.tilt || 0) * Math.PI / 180); c.translate(3, 15); drawShell(c, -3, -15, 12.5, o.shell || CORAL, s); c.restore(); }
          if (o.damp) { c.fillStyle = 'rgba(255,255,255,.4)'; c.beginPath(); c.ellipse(-2, -10, 24, 15, 0, 0, 6.3); c.fill(); }
          if (o.hat === 'band') { c.fillStyle = MUS; c.fillRect(14, -12, 10, 3.5); c.strokeRect(14, -12, 10, 3.5); }
          if (o.hat === 'visor') { c.fillStyle = LIL; c.beginPath(); c.moveTo(13, -12); c.lineTo(29, -9); c.lineTo(13, -8); c.closePath(); c.fill(); c.stroke(); }
          if (o.goggles) { c.fillStyle = SKY; for (let k = 0; k < 2; k++) { c.beginPath(); c.arc(ex[k], ey[k], 3.3, 0, 6.3); c.fill(); c.stroke(); } }
          if (o.sweat) { c.fillStyle = '#7ad0ff'; for (let k = 0; k < 3; k++) { c.beginPath(); c.ellipse(-8 + k * 9, -33 + Math.sin(t * 6 + k) * 2, 1.7, 2.4, 0, 0, 6.3); c.fill(); } }
          if (o.towel) {
            c.fillStyle = '#fff'; c.fillRect(-16, -14, 28, 13); c.strokeRect(-16, -14, 28, 13);
            c.fillStyle = '#e24a3a'; for (let a = 0; a < 7; a++) for (let b = 0; b < 3; b++) if ((a + b) % 2 === 0) c.fillRect(-16 + a * 4, -14 + b * 4.3, 4, 4.3);
          }
          if (o.lift) { c.fillStyle = INK; c.fillRect(13, -32 - o.lift, 10, 6); c.fillRect(11, -27 - o.lift, 14, 2); }
        }
        c.restore();
      }
      function crowdX(i) { return (((i * 46 + 30 - S.P * 0.5) % 644) + 644) % 644 - 40; }
      function wrongX() { return (((330 - S.P * 0.5) % 700) + 700) % 700 - 20; }
      function sockPos(now) { const s = S.sock; if (!s) return null; const k = clamp((now - s.t0) / s.dur, 0, 1); return { x: S.cw + 24 - k * (S.cw + 60), y: S.y0 - 4 }; }
      function dennisPos(now) { const d = S.dennis; if (!d) return null; const k = clamp((now - d.t0) / d.dur, 0, 1); return { x: S.cw + 30 - k * (S.cw + 70), y: S.y0 - 2 }; }
      function drawDennis(c, p, now) {
        c.save(); c.translate(p.x, p.y); c.strokeStyle = INK; c.lineWidth = 1.8;
        c.fillStyle = '#C9A06A'; c.fillRect(-14, -8, 28, 5); c.strokeRect(-14, -8, 28, 5);
        c.fillStyle = INK; c.beginPath(); c.arc(-9, -2, 3, 0, 6.3); c.arc(9, -2, 3, 0, 6.3); c.fill();
        c.fillStyle = '#C86B3C'; c.beginPath(); c.moveTo(-7, -8); c.lineTo(7, -8); c.lineTo(5, -17); c.lineTo(-5, -17); c.closePath(); c.fill(); c.stroke();
        c.fillStyle = '#5E9B43';
        for (let i = -2; i <= 2; i++) { c.beginPath(); c.ellipse(i * 5, -26 - (2 - Math.abs(i)) * 3 + Math.sin(now * 0.003 + i) * 0.8, 3.2, 8, i * 0.35, 0, 6.3); c.fill(); c.stroke(); }
        c.restore();
      }
      function stewardPos(now) { const s = S.steward; if (!s) return null; const k = clamp((now - s.t0) / s.dur, 0, 1); return { x: S.snailX + 34 + Math.sin(k * 12) * 3, y: S.y0 - 6 + k * (S.ch - 40 - S.y0 + 8) }; }
      function drawFinish(c, fx, now, R) {
        const ground = S.y0 + S.lh * 5, top = Math.max(6, S.y0 - 30), calm = S.beat >= 10 && !S.crossed;
        c.save();
        const bow = (S.reduced ? 0 : S.flBow) * 12 * Math.PI / 180;
        c.translate(fx + 28, ground); c.rotate(bow); c.translate(-(fx + 28), -ground);
        if (calm && !S.reduced) c.translate(Math.sin(now * 0.06) * 0.8, 0);
        c.lineWidth = 2.5; c.strokeStyle = INK; c.fillStyle = INK;
        c.fillRect(fx - 3, top, 4, ground - top); c.fillRect(fx + 55, top, 4, ground - top);
        c.fillStyle = CORAL; c.fillRect(fx, top + 2, 58, 36); c.strokeRect(fx, top + 2, 58, 36);
        const q = 58 / 8;
        for (let a = 0; a < 8; a++) for (let b = 0; b < 2; b++) { c.fillStyle = (a + b) % 2 ? '#fff' : INK; c.fillRect(fx + a * q, top + 2 + b * q, q, q); }
        c.fillStyle = INK; c.beginPath(); c.arc(fx + 21, top + 24, 2, 0, 6.3); c.arc(fx + 37, top + 24, 2, 0, 6.3); c.fill();
        c.beginPath(); c.lineWidth = 2; c.moveTo(fx + 20, top + 34); c.quadraticCurveTo(fx + 25, top + 29 + Math.sin(now * 0.01) * 1.5, fx + 29, top + 33); c.quadraticCurveTo(fx + 33, top + 37, fx + 38, top + 32); c.stroke();
        c.fillStyle = '#fff'; c.lineWidth = 1.5; c.fillRect(fx + 36, top + 40, 22, 11); c.strokeRect(fx + 36, top + 40, 22, 11);
        c.fillStyle = INK; c.font = '900 8px ui-rounded,system-ui,sans-serif'; c.fillText('PAT', fx + 40, top + 49);
        if (S.lap >= 2 && !S.crossed) { c.font = '800 8px ui-rounded,system-ui,sans-serif'; c.fillText('Back soon (always)', fx - 22, top + 62); }
        const sh = S.Tanim && !S.reduced ? Math.floor(now / 110) % 2 : 0;
        c.fillStyle = INK; c.beginPath(); c.ellipse(fx - (calm ? 0 : sh * 3), ground, 6, 3, 0, 0, 6.3); c.ellipse(fx + 56 + (calm ? 0 : (1 - sh) * 3), ground, 6, 3, 0, 0, 6.3); c.fill();
        const cx0 = fx + 29;
        c.lineWidth = 2; c.fillStyle = '#fff';
        switch (S.flHat) {
          case 0: c.fillStyle = INK; c.fillRect(cx0 - 9, top - 14, 18, 14); c.fillRect(cx0 - 15, top - 2, 30, 4); break;
          case 1: c.fillStyle = MUS; c.beginPath(); c.moveTo(cx0 - 9, top + 2); c.lineTo(cx0, top - 22); c.lineTo(cx0 + 9, top + 2); c.closePath(); c.fill(); c.stroke(); break;
          case 2: c.fillStyle = '#fff'; rr(c, cx0 - 12, top - 18, 24, 18, 7); c.fill(); c.stroke(); break;
          case 3: c.fillStyle = MUS; c.beginPath(); c.moveTo(cx0 - 11, top + 1); c.lineTo(cx0 - 11, top - 12); c.lineTo(cx0 - 5, top - 5); c.lineTo(cx0, top - 14); c.lineTo(cx0 + 5, top - 5); c.lineTo(cx0 + 11, top - 12); c.lineTo(cx0 + 11, top + 1); c.closePath(); c.fill(); c.stroke(); break;
          case 4: c.fillStyle = '#ff8c2a'; c.beginPath(); c.moveTo(cx0 - 9, top + 2); c.lineTo(cx0 - 2, top - 20); c.lineTo(cx0 + 2, top - 20); c.lineTo(cx0 + 9, top + 2); c.closePath(); c.fill(); c.stroke(); break;
          case 5: c.fillStyle = CORAL; c.beginPath(); c.moveTo(cx0, top); c.lineTo(cx0 - 12, top - 8); c.lineTo(cx0 - 12, top + 6); c.closePath(); c.moveTo(cx0, top); c.lineTo(cx0 + 12, top - 8); c.lineTo(cx0 + 12, top + 6); c.closePath(); c.fill(); c.stroke(); break;
          default: break;
        }
        c.restore();
        const b = S.flBubble;
        if (b && now - b.t0 < 1800) bubble(c, fx + 29, top - 6, b.text);
      }
      function bubble(c, x, y, text) {
        c.font = '700 10px ui-rounded,system-ui,sans-serif'; const w = c.measureText(text).width + 12;
        const bx = clamp(x - w / 2, 2, S.cw - w - 2);
        c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 2; rr(c, bx, y - 22, w, 16, 7); c.fill(); c.stroke();
        c.fillStyle = INK; c.fillText(text, bx + 6, y - 10);
      }
      function drawGerald(c, now) {
        const g = S.gerald, k = clamp((now - g.t0) / 1500, 0, 1), x = S.cw + 60 - (S.cw + 60 - (S.snailX + 100)) * easeOut(k), y = S.y0 + S.lh * 3 - 4;
        c.save(); c.translate(x, y); c.lineWidth = 2.2; c.strokeStyle = INK;
        c.fillStyle = '#C9A06A'; c.fillRect(-26, -8, 52, 8); c.strokeRect(-26, -8, 52, 8);
        c.fillStyle = INK; c.beginPath(); c.arc(-16, 2, 5, 0, 6.3); c.arc(16, 2, 5, 0, 6.3); c.fill();
        c.fillStyle = '#B98A4E'; c.beginPath(); c.ellipse(0, -26, 15, 19, 0, 0, 6.3); c.fill(); c.stroke();
        c.fillStyle = INK; c.beginPath(); c.arc(-5, -30, 1.6, 0, 6.3); c.arc(5, -30, 1.6, 0, 6.3); c.fill();
        c.beginPath(); c.arc(0, -24, 5, 0.2, 2.9); c.stroke();
        c.fillRect(-10, -58, 20, 14); c.fillRect(-16, -46, 32, 4);
        c.fillStyle = CORAL; c.fillRect(-10, -50, 20, 3);
        c.beginPath(); c.moveTo(-8, -12); c.lineTo(0, -4); c.lineTo(8, -12); c.strokeStyle = CORAL; c.lineWidth = 3; c.stroke();
        c.fillStyle = '#C0C6CC'; c.strokeStyle = INK; c.lineWidth = 1.6; c.beginPath(); c.arc(0, -3, 4, 0, 6.3); c.fill(); c.stroke();
        c.restore();
      }
      function drawCutout(c, x, i, now) {
        const bounce = now < S.cheer && !S.reduced ? -Math.abs(Math.sin(now * 0.012 + i)) * 7 : 0, y = S.y0 - 30 + bounce;
        c.save(); c.translate(x, y + 18); c.scale(0.85, 0.85); c.rotate(Math.sin(i * 2.1) * 0.12); c.fillStyle = '#B9B2AA'; c.strokeStyle = INK; c.lineWidth = 2;
        rr(c, -7, -18, 14, 20, 5); c.fill(); c.stroke();
        c.fillStyle = INK; c.beginPath(); c.arc(-2.5, -11, 1, 0, 6.3); c.arc(2.5, -11, 1, 0, 6.3); c.fill();
        c.beginPath(); c.lineWidth = 1.2; c.arc(0, -8, 3, 0.2, 2.9); c.stroke(); c.restore();
      }
      function drawCricket(c, now) {
        const x = crowdX(6), y = S.y0 - 6, clap = now < S.clapUntil ? Math.sin(now * 0.04) * 0.6 : 0;
        c.save(); c.translate(x, y); c.strokeStyle = INK; c.lineWidth = 1.6; c.fillStyle = '#5E9B43';
        c.beginPath(); c.ellipse(0, -5, 6, 3.4, 0, 0, 6.3); c.fill(); c.stroke();
        c.beginPath(); c.moveTo(3, -7); c.lineTo(5 + clap * 3, -13); c.moveTo(1, -7); c.lineTo(2 - clap * 3, -13); c.moveTo(-3, -3); c.lineTo(-7, 0); c.moveTo(0, -2); c.lineTo(-1, 1); c.stroke();
        c.fillStyle = INK; c.beginPath(); c.arc(5, -6, 0.9, 0, 6.3); c.fill();
        if (S.cricketCard > now) { c.font = '700 9px ui-rounded,system-ui,sans-serif'; c.fillStyle = '#fff'; rr(c, -48, -40, 96, 16, 5); c.fill(); c.stroke(); c.fillStyle = INK; c.textAlign = 'center'; c.fillText('I was always the crowd.', 0, -29); c.textAlign = 'left'; }
        c.restore();
      }
      function drawSock(c, p, now) {
        c.save(); c.translate(p.x, p.y); c.scale(1.4, 1.4); c.strokeStyle = INK; c.lineWidth = 1.8; c.fillStyle = '#fff';
        const lift = Math.abs(Math.sin(now * 0.02)) * 3;
        c.beginPath(); c.moveTo(-3, -16 - lift); c.lineTo(5, -16 - lift); c.lineTo(5, -6 - lift); c.lineTo(11, -2 - lift); c.lineTo(8, 2 - lift); c.lineTo(-3, -3 - lift); c.closePath(); c.fill(); c.stroke();
        c.fillStyle = CORAL; c.fillRect(-3, -16 - lift, 8, 3);
        c.fillStyle = '#F2E4C4'; c.fillRect(-12, -14 - lift, 8, 6); c.strokeRect(-12, -14 - lift, 8, 6); c.restore();
      }
      function swPos(now) { const s = S.swRun; if (!s || s.hit) return null; const k = clamp((now - s.t0) / s.dur, 0, 1); return { x: S.cw + 30 - k * (S.cw + 90), y: S.y0 + S.lh * 4.3 }; }
      function drawSandwich(c, p, now) {
        c.save(); c.translate(p.x, p.y); c.strokeStyle = INK; c.lineWidth = 1.8; c.lineCap = 'round';
        const st = Math.sin(now * 0.03) * 5;
        c.beginPath(); c.moveTo(-6, -8); c.lineTo(-6 + st, 0); c.moveTo(6, -8); c.lineTo(6 - st, 0); c.stroke();
        c.fillStyle = '#E8C98A'; rr(c, -13, -15, 26, 7, 3); c.fill(); c.stroke();
        c.fillStyle = '#8fcf6a'; c.fillRect(-14, -18, 28, 3); c.strokeRect(-14, -18, 28, 3);
        c.fillStyle = MUS; c.fillRect(-12, -21, 30, 3); c.strokeRect(-12, -21, 30, 3);
        c.fillStyle = '#E8C98A'; rr(c, -13, -29, 26, 9, 4); c.fill(); c.stroke();
        c.fillStyle = INK; c.beginPath(); c.arc(-4, -25, 1.2, 0, 6.3); c.arc(4, -25, 1.2, 0, 6.3); c.fill();
        c.restore();
      }
      function drawSteward(c, p) {
        c.save(); c.translate(p.x, p.y); c.strokeStyle = INK; c.lineWidth = 1.8;
        c.fillStyle = '#F4C9A6'; c.beginPath(); c.arc(0, -13, 4, 0, 6.3); c.fill(); c.stroke();
        c.fillStyle = '#3d6fb5'; c.fillRect(-4, -9, 8, 10); c.strokeRect(-4, -9, 8, 10);
        c.fillStyle = '#fff'; c.fillRect(3, -8, 6, 8); c.strokeRect(3, -8, 6, 8);
        c.fillStyle = INK; c.fillRect(-5, -18, 10, 3); c.restore();
      }
      function drawProps(c, now, gy, sx) {
        const g2 = gy(2);
        if (S.cup || S.cupBlink) {
          if (S.cup || Math.floor(now / 400) % 2) {
            const cxp = sx + (S.rules.has(2) ? -86 : 86);
            c.save(); c.translate(cxp, g2); c.strokeStyle = INK; c.lineWidth = 2; c.fillStyle = '#fff';
            c.beginPath(); c.moveTo(-8, -16); c.lineTo(8, -16); c.lineTo(5, 0); c.lineTo(-5, 0); c.closePath(); c.fill(); c.stroke();
            c.fillStyle = '#7ad0ff'; c.fillRect(-6, -11, 12, 5); c.fillStyle = INK; c.font = '900 8px ui-rounded,sans-serif'; c.fillText('7', -2.5, -3);
            c.restore();
          }
        }
        if (S.salt) {
          c.fillStyle = 'rgba(255,255,255,.9)'; c.strokeStyle = INK; c.lineWidth = 1.5; c.beginPath(); c.ellipse(sx, g2 + 1, 42, 6, 0, 0, 6.3); c.fill();
          c.fillStyle = INK; for (let i = 0; i < 16; i++) c.fillRect(sx - 38 + (i * 37) % 76, g2 - 2 + (i * 7) % 6, 1.4, 1.4);
          c.save(); c.translate(sx, g2 - 50 * S.sc - 8); c.rotate(Math.sin(now * 0.01) * 0.5 + 2.4); c.fillStyle = '#e8e8e8'; c.fillRect(-4, -8, 8, 12); c.strokeRect(-4, -8, 8, 12); c.restore();
          c.fillStyle = CORAL; c.fillRect(sx + 46, g2 - 22, 2, 22); c.beginPath(); c.moveTo(sx + 48, g2 - 22); c.lineTo(sx + 60 + Math.sin(now * 0.02) * 3, g2 - 17); c.lineTo(sx + 48, g2 - 12); c.fill();
        }
        if (S.cab) {
          c.save(); c.translate(sx + 56, g2); c.fillStyle = '#7CC152'; c.strokeStyle = INK; c.lineWidth = 2;
          c.beginPath(); c.moveTo(-10, 0); c.quadraticCurveTo(-14, -14, 0, -18); c.quadraticCurveTo(14, -14, 10, 0); c.closePath(); c.fill(); c.stroke();
          c.beginPath(); c.moveTo(0, 0); c.lineTo(0, -15); c.moveTo(0, -6); c.lineTo(-6, -11); c.moveTo(0, -9); c.lineTo(6, -13); c.lineWidth = 1; c.stroke(); c.restore();
        }
        if (S.bookclub) {
          const bx = sx + 96; c.fillStyle = '#C9A06A'; c.strokeStyle = INK; c.lineWidth = 1.5;
          c.fillRect(bx - 8, g2 - 9, 16, 4); c.strokeRect(bx - 8, g2 - 9, 16, 4); c.fillRect(bx - 1, g2 - 5, 2, 5);
          c.fillStyle = CORAL; c.fillRect(bx - 4, g2 - 13, 8, 4);
          for (let k = -1; k <= 1; k += 2) { c.fillStyle = MUS; c.fillRect(bx + k * 22 - 4, g2 - 8, 8, 8); c.strokeRect(bx + k * 22 - 4, g2 - 8, 8, 8); }
          c.fillStyle = INK; c.font = '700 8px ui-rounded,sans-serif'; c.fillText('book club', bx - 17, g2 - 18);
        }
        if (now < S.curtain) {
          c.fillStyle = '#B3303A'; c.strokeStyle = INK; c.lineWidth = 2; c.fillRect(sx + 52, g2 - 52, 16, 52); c.fillRect(sx + 72, g2 - 52, 16, 52); c.strokeRect(sx + 52, g2 - 52, 16, 52); c.strokeRect(sx + 72, g2 - 52, 16, 52);
          c.fillStyle = INK; c.fillRect(sx + 48, g2 - 56, 44, 4); c.font = '900 9px ui-rounded,sans-serif'; c.fillStyle = MUS; c.fillText('7½', sx + 62, g2 - 22);
        }
        if (S.toast) {
          const bx = sx + 80, by = g2 - 18 + Math.sin(now * 0.004) * 2;
          c.save(); c.translate(bx, by); c.fillStyle = '#E8B86A'; c.strokeStyle = INK; c.lineWidth = 2;
          c.beginPath(); c.moveTo(-10, 8); c.lineTo(-10, -4); c.quadraticCurveTo(-13, -12, -4, -12); c.quadraticCurveTo(0, -16, 4, -12); c.quadraticCurveTo(13, -12, 10, -4); c.lineTo(10, 8); c.closePath(); c.fill(); c.stroke();
          c.fillStyle = INK; c.beginPath(); c.arc(-3.5, -1, 1.1, 0, 6.3); c.arc(3.5, -1, 1.1, 0, 6.3); c.fill();
          c.beginPath(); c.lineWidth = 1.3; c.arc(0, 2, 3, 0.2, 2.9); c.stroke(); c.restore();
        }
        if (S.silent) { c.fillStyle = 'rgba(43,33,24,.32)'; c.fillRect(0, 0, S.cw, S.ch - 40); c.fillStyle = '#fff'; c.fillRect(sx + 38, g2 - 16, 5, 14); c.fillStyle = MUS; c.beginPath(); c.ellipse(sx + 40.5, g2 - 20 + Math.sin(now * 0.02), 2.2, 4, 0, 0, 6.3); c.fill(); }
        if (now < S.stampT) { c.save(); c.translate(sx, g2 - 56 * S.sc - 16); c.rotate(-0.2); c.strokeStyle = '#c0261a'; c.fillStyle = '#c0261a'; c.lineWidth = 3; c.font = '900 13px ui-rounded,sans-serif'; c.strokeRect(-36, -14, 72, 20); c.fillText('APPROVED', -31, 1); c.restore(); }
        if (S.bird) {
          const b = S.bird, k = clamp((now - b.t0) / b.dur, 0, 1), bx = S.cw + 40 - k * (S.cw + 100);
          c.fillStyle = 'rgba(43,33,24,.28)'; c.beginPath(); c.ellipse(bx, g2 - 6, 26, 7, 0, 0, 6.3); c.fill();
          c.strokeStyle = 'rgba(43,33,24,.5)'; c.lineWidth = 3; c.beginPath(); const fl = Math.sin(now * 0.02) * 6; c.moveTo(bx - 22, g2 - 10 + fl); c.lineTo(bx, g2 - 6); c.lineTo(bx + 22, g2 - 10 + fl); c.stroke();
        }
      }
      function draw(now) {
        const W = S.cw, H = S.ch;
        if (!cx || W < 10 || H < 10 || !root.isConnected) return;
        const c = cx, sx = S.snailX, y0 = S.y0, lh = S.lh, P0 = S.P, t = now / 1000, sc = S.sc;
        const gy = (l) => y0 + lh * (l + 1) - 3, X = (wx) => wx - P0 + sx;
        c.setTransform(S.dpr, 0, 0, S.dpr, 0, 0);
        c.clearRect(0, 0, W, H);
        c.save();
        if (now < S.shakeUntil && !S.reduced) c.translate(Math.sin(now * 0.09) * 3, 0);
        c.fillStyle = CREAM; c.fillRect(0, 0, W, y0); c.fillStyle = SKY; c.fillRect(0, y0 * 0.42, W, y0 * 0.58);
        c.fillStyle = MUS; c.strokeStyle = INK; c.lineWidth = 2.5; c.beginPath(); c.arc(W * 0.82, y0 * 0.4 + Math.sin(t * 0.7) * 2, Math.min(22, y0 * 0.28), 0, 6.3); c.fill(); c.stroke();
        c.fillStyle = '#A9D3E6'; c.beginPath(); c.moveTo(0, y0); const hp = P0 * 0.2;
        for (let x = 0; x <= W + 10; x += 10) c.lineTo(x, y0 * 0.62 - (Math.sin((x + hp) / 60) * 7 + Math.sin((x + hp) / 23) * 3));
        c.lineTo(W, y0); c.closePath(); c.fill();
        const hh = P0 * 0.5, spn = sponsorSet();
        c.fillStyle = '#6FBF94'; c.fillRect(0, y0 - 14, W, 14); c.beginPath(); c.moveTo(0, y0 - 14); c.lineTo(W, y0 - 14); c.stroke();
        for (let k = 0; k < 3; k++) {
          let bx = ((120 + k * 190 - hh) % 570 + 570) % 570 - 60;
          for (; bx < W + 10; bx += 570) {
            c.fillStyle = [LIL, MINT, MUS][k]; c.strokeStyle = INK; c.lineWidth = 2; c.fillRect(bx + 14, y0 - 32, 3, 18); c.fillRect(bx + 82, y0 - 32, 3, 18); c.fillStyle = [LIL, MINT, MUS][k]; c.fillRect(bx, y0 - 52, 100, 20); c.strokeRect(bx, y0 - 52, 100, 20);
            c.save(); c.beginPath(); c.rect(bx + 2, y0 - 50, 96, 16); c.clip(); c.fillStyle = INK; c.font = '800 8px ui-rounded,system-ui,sans-serif'; c.textAlign = 'center';
            let label = spn[k]; if (S.rules.has(1) && k === 0) label = 'Gary (Self-Funded)';
            c.fillText(label, bx + 50, y0 - 38); c.restore(); c.textAlign = 'left';
          }
        }
        for (let i = 0; i < 14; i++) { if (i === 6) continue; const x = crowdX(i); drawCutout(c, x, i, now); if (x + 644 < W + 20) drawCutout(c, x + 644, i, now); }
        drawCricket(c, now);
        { const wx = wrongX(); c.fillStyle = '#fff'; c.strokeStyle = INK; c.lineWidth = 1.5; c.fillRect(wx - 17, y0 - 13, 34, 9); c.strokeRect(wx - 17, y0 - 13, 34, 9); c.fillStyle = INK; c.font = '800 5.5px sans-serif'; c.fillText('WRONG WAY', wx - 15, y0 - 6); }
        const bank = S.rules.has(3);
        for (let l = 0; l < 5; l++) { c.fillStyle = l % 2 ? MINT : MINTD; for (let x = 0; x < W; x += 20) c.fillRect(x, y0 + lh * l + (bank ? Math.sin((x + P0) / 140) * 4 : 0), 21, lh + 1); }
        c.strokeStyle = 'rgba(43,33,24,.3)'; c.lineWidth = 1; for (let l = 0; l <= 5; l++) { c.beginPath(); c.moveTo(0, y0 + lh * l); c.lineTo(W, y0 + lh * l); c.stroke(); }
        c.strokeStyle = '#3f8a62'; c.lineWidth = 1.4;
        grass.forEach((g) => { const gx = ((g.x - P0) % 700 + 700) % 700 - 20; for (let xx = gx; xx < W + 10; xx += 700) { c.beginPath(); c.moveTo(xx, gy(g.l)); c.lineTo(xx - 1.5, gy(g.l) - g.h); c.moveTo(xx + 2, gy(g.l)); c.lineTo(xx + 3, gy(g.l) - g.h * 0.8); c.stroke(); } });
        c.fillStyle = '#F2E4C4'; c.fillRect(0, H - 40, W, 40); c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.moveTo(0, H - 40); c.lineTo(W, H - 40); c.stroke();
        c.lineWidth = 1; c.font = '700 8px ui-monospace,Consolas,monospace'; c.fillStyle = INK;
        const w0 = Math.floor((P0 - sx) / 2) * 2;
        for (let w = w0; w <= w0 + W + 4; w += 2) { const x = w - P0 + sx, ten = ((w % 10) + 10) % 10 === 0; c.beginPath(); c.moveTo(x, H - 40); c.lineTo(x, H - 40 + (ten ? 14 : 6)); c.stroke(); if (((w % 50) + 50) % 50 === 0) c.fillText(String(w), x + 2, H - 14); }
        c.fillText('px', 4, H - 4);
        for (let k = Math.max(0, Math.ceil((P0 - sx - 40) / 100)); k <= Math.floor((P0 - sx + W + 40) / 100); k++) {
          const x = X(100 * k); c.fillStyle = '#C9A06A'; c.strokeStyle = INK; c.lineWidth = 2; c.fillRect(x - 31, y0 - 19, 62, 15); c.strokeRect(x - 31, y0 - 19, 62, 15);
          c.fillStyle = INK; c.font = '800 7.5px ui-monospace,Consolas,monospace'; c.textAlign = 'center'; c.fillText('KM ' + (k * 0.0000013).toFixed(7), x, y0 - 8); c.textAlign = 'left';
        }
        drawProps(c, now, gy, sx);
        const pts = S.slime, vis = [];
        for (let i = 0; i < pts.length; i++) { const xx = X(pts[i]); if (xx > -10 && xx <= sx) vis.push(xx); }
        if (vis.length) {
          const yb = gy(2) - 1;
          for (let seg = 0; seg < 3; seg++) {
            const a = Math.floor(vis.length * seg / 3), b = seg === 2 ? vis.length : Math.floor(vis.length * (seg + 1) / 3) + 1;
            c.lineCap = 'round'; c.beginPath(); c.moveTo(vis[a], yb); for (let i = a + 1; i < b; i++) c.lineTo(vis[i], yb); if (seg === 2) c.lineTo(sx - 10, yb);
            c.strokeStyle = 'rgba(155,224,196,.9)'; c.lineWidth = [1.5, 3, 4.5][seg]; c.stroke();
            c.strokeStyle = 'rgba(255,255,255,.5)'; c.lineWidth = 1; c.save(); c.translate(0, -2); c.stroke(); c.restore();
          }
        }
        const spons2 = S.rules.has(1);
        const rivals = [
          { l: 0, off: sheilaOff(), shell: LIL, hat: 'visor', name: 'SHEILA' + (spons2 ? ' (PENDING)' : ''), ph: 1 },
          { l: 1, off: S.garyOff, shell: MUS, hat: 'band', name: S.garyOff === 1 ? 'GARY +1' : 'GARY', ph: 2 },
          { l: 3, off: turboOff(), noShell: true, towel: true, name: spons2 ? 'TURBO (A TEA TOWEL)' : 'TURBO (DQ)', ph: 3 },
          { l: 4, abs: S.ghost, shell: CORAL, alpha: 0.45, droop: true, name: "YESTERDAY'S YOU", ph: 4 }
        ];
        const frozen = !!S.bird;
        if (now < S.swoosh) { c.strokeStyle = 'rgba(255,255,255,.85)'; c.lineWidth = 2.5; c.beginPath(); for (let i = 0; i < 4; i++) { c.moveTo(sx + sheilaOff() - 20 - i * 10, gy(0) - 6 - i * 3); c.lineTo(sx + sheilaOff() - 70 - i * 10, gy(0) - 6 - i * 3); } c.stroke(); }
        rivals.forEach((r) => {
          const x = r.abs !== undefined ? X(r.abs) : sx + r.off;
          if (x < -50 || x > W + 50) return;
          const sq = S.sync > now ? 1 - clamp((now - S.squish) / 90, 0, 1) : 0;
          drawSnail(c, x, gy(r.l), sc * 0.92, { shell: r.shell, hat: r.hat, noShell: r.noShell, towel: r.towel, alpha: r.alpha, droop: r.droop, t: frozen ? 0 : t, ph: r.ph, flip: S.rules.has(4), jx: now < S.recoil ? -5 : 0, sx: 1 + 0.1 * sq, sy: 1 - 0.09 * sq, sweat: S.sync > now, lift: now < S.salute && r.l !== 1 ? 8 : (now < S.salute ? 3 : 0) });
          chip(c, r.name, x + 28 * sc, gy(r.l) - 9 * sc, r.l === 1 ? MUS : r.l === 3 ? LIL : '#fff');
          if (r.l === 1 && S.ending) {
            const s2 = sc * 0.92, fx2 = x - 3 * s2, fy = gy(r.l) - 27 * s2;
            c.strokeStyle = INK; c.lineWidth = 1.6; c.beginPath(); c.moveTo(fx2, fy); c.lineTo(fx2, fy - 14); c.stroke();
            c.fillStyle = '#d6372a'; c.beginPath(); c.moveTo(fx2, fy - 14); c.lineTo(fx2 + 10 + (S.reduced ? 0 : Math.sin(now * 0.01) * 1.5), fy - 10); c.lineTo(fx2, fy - 6); c.closePath(); c.fill(); c.stroke();
          }
        });
        const k = clamp(1 - (now - S.squish) / 90, 0, 1), idleDroop = now - S.lastInput > 3000;
        const me = { shell: CORAL, t: S.montage ? t * 0.3 : (frozen ? 0 : t), droop: idleDroop, closed: S.withdrawn || now < S.retract, goggles: now < S.goggles, sweat: S.inRhythm, damp: S.damp, sx: 1 + 0.12 * k, sy: 1 - 0.1 * k, jx: (now < S.shakeUntil ? Math.sin(now * 0.09) * 2 : 0) + (now < S.recoil ? -5 : 0), tilt: S.shell ? S.shell.a : 0 };
        if (S.elegance > 0) { c.strokeStyle = MUS; c.lineWidth = 2.5; for (let i = 0; i < S.elegance; i++) { c.beginPath(); c.arc(sx - 2, gy(2) - 15 * sc, 24 * sc + 3, i * 0.785 + t, i * 0.785 + t + 0.6); c.stroke(); } }
        drawSnail(c, sx, gy(2), sc, me);
        chip(c, 'YOU', sx + 28 * sc, gy(2) - 9 * sc, CORAL);
        if (now < S.glitter) { c.fillStyle = '#7ad0ff'; for (let i = 0; i < 9; i++) c.fillRect(sx - 20 + ((i * 29 + now * 0.05) % 44), gy(2) - 34 * sc + ((i * 13 + now * 0.08) % 30), 2, 2); }
        if (S.gerald) drawGerald(c, now);
        const R = getR(), fx = sx + 36 + R;
        if (S.sock) { const p = sockPos(now); if (p) drawSock(c, p, now); }
        if (S.dennis) { const p = dennisPos(now); if (p) drawDennis(c, p, now); }
        if (S.swRun) { const p = swPos(now); if (p) { drawSandwich(c, p, now); drawSteward(c, { x: p.x + 46, y: p.y }); } }
        if (S.tue) { const a = clamp((now - S.tue) / 6000, 0, 1), g = c.createLinearGradient(W - 100, 0, W, 0); g.addColorStop(0, 'rgba(43,33,24,0)'); g.addColorStop(1, 'rgba(43,33,24,' + (0.4 * a).toFixed(3) + ')'); c.fillStyle = g; c.fillRect(W - 100, 0, 100, H - 40); }
        const sp = S.steward ? stewardPos(now) : null; if (sp) drawSteward(c, sp);
        if (fx < W + 40) drawFinish(c, fx, now, R);
        else {
          const py = y0 + lh * 2.2, txt = 'FINISH -> ' + num(R / unitDiv()) + ' ' + (S.units === 'px' ? 'px' : S.units);
          c.font = '800 10px ui-rounded,system-ui,sans-serif'; const w = c.measureText(txt).width + 22;
          c.fillStyle = CORAL; c.strokeStyle = INK; c.lineWidth = 2; c.beginPath(); c.moveTo(W - w, py - 11); c.lineTo(W - 8, py - 11); c.lineTo(W, py); c.lineTo(W - 8, py + 11); c.lineTo(W - w, py + 11); c.closePath(); c.fill(); c.stroke();
          c.fillStyle = INK; c.fillText(txt, W - w + 8, py + 3);
          if (S.flBubble && now - S.flBubble.t0 < 1800) bubble(c, W - w / 2, py - 12, S.flBubble.text);
        }
        if (S.rain && now < S.rain.until && !S.reduced) { c.strokeStyle = 'rgba(255,255,255,.65)'; c.lineWidth = 1.2; c.beginPath(); for (let i = 0; i < 30; i++) { const x = (i * 53 + now * 0.35) % (W + 40), y = (i * 97 + now * 0.9) % (H - 40); c.moveTo(x, y); c.lineTo(x - 5, y + 12); } c.stroke(); }
        if (S.speed > now && !S.reduced) { c.strokeStyle = 'rgba(43,33,24,.45)'; c.lineWidth = 2; c.beginPath(); for (let i = 0; i < 6; i++) { const y = gy(2) - 30 + i * 8; c.moveTo(sx - 30 - (i % 3) * 14, y); c.lineTo(sx - 70 - (i % 3) * 14, y); } c.stroke(); }
        for (let i = S.floats.length - 1; i >= 0; i--) {
          const f = S.floats[i], age = now - f.t0;
          if (age > 700) { S.floats.splice(i, 1); continue; }
          c.globalAlpha = 1 - age / 700; c.font = '900 11px ui-rounded,system-ui,sans-serif'; c.fillStyle = INK; c.fillText(f.text, f.x, f.y - age * 0.03); c.globalAlpha = 1;
        }
        if (S.tinyBubble && now - S.tinyBubble.t0 < 1200) bubble(c, sx, gy(2) - 36 * sc, S.tinyBubble.text);
        c.restore();
        drawLoupe();
      }
      function loupeFocus() { return S.loupe.ptr || { x: S.snailX + 14, y: S.y0 + S.lh * 3 - 9 }; }
      function drawLoupe() {
        if (!S.loupe.on || !lctx) return;
        const d = S.dpr, sw = 8 * d;
        if (!(sw > 0) || cv.width <= sw || cv.height <= sw) return;
        const f = loupeFocus(), sxp = clamp((f.x - 4) * d, 0, cv.width - sw), syp = clamp((f.y - 4) * d, 0, cv.height - sw);
        try { lctx.imageSmoothingEnabled = false; lctx.clearRect(0, 0, lp.width, lp.height); lctx.drawImage(cv, sxp, syp, sw, sw, 0, 0, lp.width, lp.height); } catch (e) { /* zero-size source */ }
        const px = f.x + 18, py = f.y - 112;
        lw.style.left = clamp(S.loupe.ptr ? px : (S.cw < 520 ? S.snailX - 112 : S.snailX + 30), 0, Math.max(0, S.cw - 100)) + 'px';
        lw.style.top = clamp(S.loupe.ptr ? py : S.y0 - 60, 0, Math.max(0, S.ch - 100)) + 'px';
      }
      function setLoupe(on, pin) {
        S.loupe.on = !!on; if (!on) { S.loupe.pinned = false; S.loupe.ptr = null; }
        if (pin !== undefined) S.loupe.pinned = pin;
        lw.hidden = !on; loupeBtn.setAttribute('aria-pressed', on ? 'true' : 'false');
      }

      /* ---------- input accounting, refusal, movement ---------- */
      const cool = (key, ms) => { const t = api.now(); if (t - (S.cd[key] === undefined ? -1e9 : S.cd[key]) < ms) return false; S.cd[key] = t; return true; };
      function shake(node) { node.classList.remove('m-snail-marathon-shake'); void node.offsetWidth; node.classList.add('m-snail-marathon-shake'); }
      function seq(arr, gap, o, guard) { arr.forEach((s, i) => { if (i === 0) spk1(s, o); else script(() => { if (!guard || guard()) spk1(s, o); }, i * (gap || 2500)); }); }
      function speakAll(key, gap, o) { seq(LN[key], gap, o); }
      function idleSeq(key, stage, gap) { seq(LN[key], gap, { priority: 1 }, () => S.idleStage >= stage); }
      function noteInput(kind) {
        const t0 = api.now(), away = t0 - S.lastInput;
        S.lastInput = t0;
        if (kind !== 'left') S.leftRun = 0;
        if (S.bird) S.bird.disturbed = true;
        let woke = false;
        if (S.idleStage > 0) {
          S.wakeFrom = away / (sel ? 100 : 1000); S.idleStage = 0; S.bookclub = false; S.cupBlink = false;
          if (S.garyOff !== 1 || (S.garyAnim && S.garyAnim.to !== 1)) garyTo(1, 600);
          if (S.sit !== null) { setT(S.sit, 700); S.sit = null; S.flBow = 1; }
          if (S.withdrawn) { S.withdrawn = false; woke = true; }
        }
        return woke;
      }
      const wakeKey = () => (S.wakeFrom >= 600 ? 'wake6' : S.wakeFrom >= 300 ? 'wake5' : S.wakeFrom >= 180 ? 'wake4' : 'wake');
      function wakeSay() { const k = wakeKey(); if (k === 'wake') speak(k); else seq(LN[k], 3600, { priority: 1 }); }
      function refusal(now) {
        if (S.montage) return 'montage';
        if (S.union) return 'union';
        if (S.sponsor) return 'sponsor';
        if (S.hold && S.hold.kind === 'sip') return 'spill';
        if (S.salt) return 'salt';
        if (S.steward) return 'steward';
        if (S.bird && !S.bird.done) return 'bird';
        if (now < S.retract) return 'retract';
        return null;
      }
      function react(ref, now) {
        if (ref === 'sponsor') { shake(go); sfx('buzz'); if (S.clicks.filter((t) => now - t < 2000).length >= 6 && cool('adSpam', 8000)) speak('adSpam'); }
        else if (ref === 'union') { shake(go); sfx('buzz'); if (cool('uHit', 3500)) speak('unionHit'); }
        else if (ref === 'spill') { holdCancel(); ST('spills'); sfx('buzz'); speak('spill'); }
        else if (ref === 'salt') { if (cool('shriek', 2500)) speak('shriek'); sfx('sad'); S.tinyBubble = { text: 'eep', t0: now }; }
        else if (ref === 'steward') { if (cool('tut', 2500)) speak('tut'); S.tinyBubble = { text: 'tut', t0: now }; }
        else if (ref === 'bird') { S.retract = now + tm(3000); if (S.bird) S.bird.hit = true; endBird(); }
        else sfx('tick');
      }
      function spamCheck(now) {
        const m = S.spamMul, c = S.clicks;
        const in1 = c.filter((t) => now - t < 1000).length, in3 = c.filter((t) => now - t < 3000).length, in5 = c.filter((t) => now - t < 5000).length;
        if (in1 >= 7 * m && cool('spamA', 20000)) { S.speed = now + 1500; speak('spamA'); }
        if (in1 >= 10 * m && cool('spamB', 20000)) { flash(); sfx('pop'); S.shakeUntil = now + 400; bumpT(3 * m); api.award(-0.1, 'Speeding fine'); ST('spam'); ach('spammer'); S.tokN = api.stat.get('snail-marathon.spam'); speak('spamB', { priority: 1 }); }
        if (in3 >= 20 * m && cool('spamC', 60000)) { S.goggles = now + tm(10000); sfx('buzz'); rawWait(() => sfx('buzz'), tm(500)); seq(LN[S.spamCN++ % 2 ? 'spamC2' : 'spamC'], 3000, { priority: 1 }); }
        if (in5 >= 32 * m && now - (S.cd.spamC === undefined ? -1e9 : S.cd.spamC) > 10000 && cool('spamD', 120000)) { sfx('buzz'); rawWait(() => sfx('buzz'), tm(400)); rawWait(() => sfx('buzz'), tm(800)); S.shakeUntil = now + 700; api.award(-0.2, 'Policy 14-C'); seq(LN.spamD, 3500, { priority: 1 }); }
      }
      function doSlither(amount, src) {
        if (S.dead || S.lockEnding) return;
        const now = api.now();
        S.clicks.push(now); if (S.clicks.length > 90) S.clicks.shift();
        ST('clicks');
        const woke = noteInput();
        spamCheck(now);
        if (S.hold && S.hold.kind === 'nibble') holdCancel();
        if (woke) { sfx('pop'); if (cool('wake', 3000)) wakeSay(); return; }
        const ref = refusal(now);
        if (ref) { react(ref, now); return; }
        S.acc = S.acc.filter((x) => now - x < 50);
        if (S.acc.length >= 3) return;
        S.acc.push(now);
        if (S.beat >= 10 && S.endingReady && !S.ending) { startEnding(); return; }
        move(amount, now);
      }
      function move(amount, now) {
        const prev = S.P;
        S.P += amount;
        if (!Number.isFinite(S.P)) S.P = prev;
        S.bestLap = Math.max(S.bestLap, S.P);
        S.pixAcc += amount; const w = Math.floor(S.pixAcc); if (w > 0) { S.pixAcc -= w; ST('pixels', w); }
        S.pixLog.push({ t: now, a: amount }); if (S.pixLog.length > 60) S.pixLog.shift();
        if (Math.floor(S.P) > S.slimeAt) { S.slimeAt = Math.floor(S.P); S.slime.push(S.P); if (S.slime.length > 600) S.slime.shift(); }
        S.squish = now;
        S.floats.push({ text: amount === 1 ? '+1 px' : '+' + amount + ' px', x: S.snailX + 8 + api.rand() * 12, y: S.y0 + S.lh * 2 - 24 * S.sc, t0: now }); if (S.floats.length > 6) S.floats.shift();
        sfx(S.inRhythm || Math.floor(S.P * 2) % 2 ? 'tick' : 'blip');
        if (!S.firstClick) {
          S.firstClick = true; spk1(LN.first[0]); api.award(0.1, 'First pixel');
          if (!S.coarse) { setLoupe(true); S.loupe.auto = now + tm(6000); S.loupe.autoOn = true; script(() => spk1(LN.loupe[0]), 600); script(() => spk1(LN.garyLoupe[0]), 13500); }
          sfx('fanfare'); S.clapUntil = now + 1200;
          script(() => speak('firstBit'), 2500); script(() => speak('crowd'), 10500);
        }
        S.nSl++;
        if ((S.nSl === 100 || S.nSl === 400 || S.nSl === 1000) && !go.classList.contains('m-snail-marathon-final')) { go.textContent = slLabel(); spk1(LN.slLbl[S.nSl === 100 ? 0 : S.nSl === 400 ? 1 : 2], { priority: 1 }); }
        if (amount < 1 && cool('half', 15000)) speak('half');
        const bucket = Math.floor(S.P / 25);
        if (bucket > S.lastBucket) { S.lastBucket = bucket; retreat(); }
        const mile = Math.floor(S.P / 100);
        if (mile > S.lastMile) { S.lastMile = mile; onMile(mile, now); }
        S.okTimes.push(now); if (S.okTimes.length > 9) S.okTimes.shift();
        rhythmUpdate();
        const r = S.beat >= 10 ? 1 : api.rand();
        if (r < 0.08) { if (now - S.lastCom > 3000 && S.interest > 0) { S.lastCom = now; chatter(); } }
        else if (r < 0.13) { if (cool('rival', 2500)) speak(api.pick(['garyL', 'sheilaL', 'turboL', 'ghostL', 'sponsorQ'])); }
        else if (r < 0.18) flBubble(bagNext('bubbles'));
        if (Math.abs(S.P - 7.5) < 1e-9 && S.club75 !== S.lap) { S.club75 = S.lap; club(now); }
        if (!S.ghostPassed && S.P > S.ghost) { S.ghostPassed = true; speak('passGhost'); }
        if (birdOK() && api.chance(sel ? 1 / 25 : 1 / 250)) startBird();
        checkBeat();
        hud();
      }
      function flBubble(text) { S.flBubble = { text: text, t0: api.now() }; }
      function retreat() {
        api.award(0.05, 'Slime');
        if (S.pin || S.beat >= 9) return;
        const step = Math.floor(25 * (1 - EFF[Math.min(9, S.beat - 1)]) + 1e-9);
        if (step > 0) {
          setT(S.Tgoal + step, 400); S.flBow = 1; flBubble(bagNext('bubbles'));
          if (!S.fired.firstSorry && S.lap === 1) { S.fired.firstSorry = 1; S.ladderI = Math.max(S.ladderI, 1); script(() => spk1(LN.ladder[0], { priority: 1 }), 500); script(() => spk1(LN.shy[0], { priority: 1 }), 4200); }
        }
      }
      function onMile(mile, now) {
        sfx('bell'); S.tokN = (mile * 100 * 0.0000013).toFixed(7);
        const rung = S.ladderI < LN.ladder.length ? LN.ladder[S.ladderI++] : bagNext('filler');
        spk1(rung, { priority: 1 }); ST('apologies'); flBubble('sorry');
        S.interest = clamp(S.interest + 6, 0, 100);
        api.award(0.2, 'Mile marker');
        if (mile % 2 === 1) script(() => speak('mile'), 2500);
        else if (mile % 4 === 2) script(() => { if (!xmod()) speak('misc'); }, 3500);
        if (mile === 1) ach('millimetre');
        api.save.set('bestP', Math.max(Number(sv('bestP', 0)) || 0, S.bestLap));
      }
      function rhythmUpdate() {
        const t = S.okTimes;
        if (t.length < 9) { S.inRhythm = false; return; }
        const iv = []; for (let i = 1; i < t.length; i++) iv.push(t[i] - t[i - 1]);
        const mean = iv.reduce((a, b) => a + b, 0) / iv.length, sd = Math.sqrt(iv.reduce((a, b) => a + (b - mean) * (b - mean), 0) / iv.length);
        const was = S.inRhythm; S.inRhythm = mean >= 150 && mean <= 2000 && sd < 0.15 * mean;
        if (!S.inRhythm) { S.streak = 0; return; }
        S.streak++; S.interest = clamp(S.interest + 0.35, 0, 100);
        if (!was) { if (!S.rhythmSeen) { S.rhythmSeen = true; speak('rhythm1'); } else if (cool('rhy', 20000)) speak('rhythm'); }
        if (S.streak >= 8 && S.interest < 1) { S.interest = 60; speak('bback'); }
      }
      function club(now) {
        const first = !sv('club7half', false);
        S.curtain = now + tm(4500); S.salute = now + 2200;
        if (first) { api.save.set('club7half', true); ach('club'); sfx('fanfare'); spk1(LN.club[0], { priority: 1 }); script(() => spk1(LN.club[1]), 2500); }
        else { sfx('ding'); speak('clubG'); }
      }
      function chatter() {
        const i = S.interest, th = [90, 60, 40, 20];
        if (i < 1) return;
        const half = S.lap >= 2 ? 0.5 : 1;
        if (S.sw === 0 ? (i < 90 && S.A >= 80 * half) : (S.sw < 4 && i < th[S.sw])) { spk1(LN.sandwich[S.sw]); S.sw++; return; }
        speak(i >= 70 ? 'tierA' : i >= 40 ? 'tierB' : i >= 10 ? 'tierC' : 'tierD');
      }
      function overtaken(now) {
        S.lastOver = now; ST('overtaken'); sfx('whoosh'); S.swoosh = now + 500;
        api.award(0.1, 'Consolation'); S.interest = clamp(S.interest + 8, 0, 100); speak('overtaken');
        if (api.stat.get('snail-marathon.overtaken') >= 5) ach('slowlane');
      }

      /* ---------- reverse, secrets ---------- */
      function revTrigger() {
        ach('reverse');
        if (sv('reverseDone', false)) { speak('revBits'); return; }
        api.save.set('reverseDone', true); api.award(4, 'Reverse Marathon'); speak('revDone', { priority: 1 });
      }
      function stepBack(a) {
        if (S.dead || S.lockEnding) return;
        const now = api.now();
        S.clicks.push(now); if (S.clicks.length > 90) S.clicks.shift();
        ST('clicks');
        if (noteInput('left')) { if (cool('wake', 3000)) wakeSay(); return; }
        if (S.montage || S.sponsor) return;
        const before = S.P;
        S.P = Math.max(-100, S.P - a);
        S.leftRun++; ST('reversed'); S.squish = now;
        if (S.leftRun === 1) { sfx('boing'); spk1(LN.revBits[0]); }
        if (S.leftRun === 6) speak('revBits');
        if (S.leftRun >= 20 && !S.revDone) { S.revDone = true; revTrigger(); }
        if (S.P <= -100 && before > -100) { speak('revStart'); sfx('pop'); }
        if (Math.abs(S.P + 7.5) < 1e-9 && !S.rev75) { S.rev75 = true; speak('rev75'); }
        hud();
      }
      function cricketHit(now) {
        const n = (Number(sv('crickets', 0)) || 0) + 1;
        api.save.set('crickets', n); ST('crickets'); sfx('tick'); S.clapUntil = now + 700;
        if (n === 1) speak('cricket', { priority: 1 });
        if (n >= 7) { ach('cricket'); if (!sv('cricketDone', false)) { api.save.set('cricketDone', true); S.cricketCard = now + tm(5000); speakAll('cricket7', 2500); } }
      }
      function sockHit(now) {
        const s = S.sock;
        if (!s || s.hit || now - s.t0 > tm(5000)) return;
        s.hit = true;
        const n = (Number(sv('socks', 0)) || 0) + 1;
        api.save.set('socks', n); ST('socks'); sfx('boing'); speak('sockHit', { priority: 1 }); api.flag.set('sockSeen', true); // lint-ignore
        if (n >= 3) { ach('sock'); if (!sv('sockNote', false)) { api.save.set('sockNote', true); script(() => speakAll('sock3', 2500), 2500); } }
      }
      function doSalt() {
        if (!cool('salt', 20000)) return;
        const now = api.now();
        S.recoil = now + 800; S.shakeUntil = now + 600; ST('salt');
        spk1(LN.saltA[0], { priority: 1 }); script(() => spk1(LN.saltA[1], { engine: true, priority: 1 }), 1500);
        script(() => { spk1(LN.saltA[2], { priority: 1 }); S.silent = true; script(() => { S.silent = false; spk1(LN.saltB[0], { priority: 1 }); api.award(1, 'Silence'); }, 7500); }, 3000);
      }
      function doPat() {
        if (!cool('pat', 20000) || S.lockEnding) return;
        const lap = S.lap, free = !S.pin && !S.crossed && S.beat < 9 && getR() > 12;
        noteInput(); sfx('boing'); S.flBow = 1; ST('pats');
        if (free) {
          bumpT(-7.5); seq(LN.pat, 3600, { engine: true, priority: 1 });
          script(() => { if (S.lap === lap && !S.crossed && !S.pin && S.beat < 9) { bumpT(7.5); S.flBow = 1; flBubble('(bows)'); seq(LN.patBye, 3000); } }, 11000);
        } else speak('patFar');
        ach('pat'); if (!sv('patDone', false)) { api.save.set('patDone', true); api.award(1, 'First name basis'); }
      }
      function heldKey() { S.heldIgn++; if (S.heldIgn === 1 || S.heldIgn % 10 === 0) speak('held'); }
      function birdOK() { return !S.busy && !S.ev && !S.lockEnding && S.idleStage === 0 && S.beat < 10 && !S.bird && api.now() - S.lastBird > tm(180000); }
      function startBird() {
        const b = S.bird = { t0: api.now(), dur: tm(4000), done: false, disturbed: false, hit: false };
        S.lastBird = b.t0; heads.classList.add('m-snail-marathon-still');
        script(() => { if (S.bird === b) endBird(); }, 4000);
      }
      function endBird() {
        const b = S.bird;
        if (!b) return;
        S.bird = null; heads.classList.remove('m-snail-marathon-still');
        if (b.hit) { speak('birdHit'); return; }
        if (b.disturbed) return;
        speak('birdOk'); ach('bird'); api.award(2, 'Stillness');
        sfx('fanfare'); script(() => sfx('fanfare'), 3000);
        LN.song.forEach((s, i) => script(() => caption('Song', s), 1500 * i));
      }

      /* ---------- holds and the slot ---------- */
      function ringReset() { const r = slot.querySelector('.m-snail-marathon-ring'); if (r) r.style.setProperty('--p', '0'); }
      function holdStart(kind, dur) {
        if (S.hold || !S.ev) return;
        const h = S.hold = { kind: kind, t0: api.now(), dur: tm(dur) };
        h.timer = api.setTimeout(() => { if (S.dead || S.hold !== h) return; S.hold = null; S.holdKey = false; ringReset(); if (kind === 'sip') sipSuccess(); else nibbleSuccess(); }, h.dur);
      }
      function holdCancel() { const h = S.hold; if (!h) return false; api.clearTimeout(h.timer); S.hold = null; S.holdKey = false; ringReset(); return true; }
      function holdSpec() { const e = S.ev; return e && e.id === 'hydration' ? ['sip', 2000] : e && e.id === 'cabbage' ? ['nibble', 1000] : null; }
      const holdBtn = (label, kind, dur) => el('button', { type: 'button', class: 'm-snail-marathon-evb', dataset: { act: 'hold', kind: kind, dur: String(dur) } }, el('span', { class: 'm-snail-marathon-ring', 'aria-hidden': 'true' }), label);
      const actBtn = (label, act, extra) => el('button', { type: 'button', class: 'm-snail-marathon-evb', dataset: { act: act } }, extra || null, label);
      const slotBtn = (e) => (e.target && e.target.closest ? e.target.closest('button[data-act]') : null);
      api.on(slot, 'pointerdown', (e) => {
        const b = slotBtn(e); if (!b || e.button > 0) return;
        noteInput();
        if (b.dataset.act === 'hold') { S.holdAt = api.now(); holdStart(b.dataset.kind, Number(b.dataset.dur) || 1000); }
      });
      const holdEnd = () => { if (S.hold && !S.holdKey) holdCancel(); };
      api.on(slot, 'pointerup', holdEnd);
      api.on(slot, 'pointercancel', holdEnd);
      api.on(slot, 'pointerout', (e) => { const b = slotBtn(e); if (b && !(e.relatedTarget && b.contains(e.relatedTarget))) holdEnd(); });
      api.on(slot, 'focusout', holdEnd);
      api.on(slot, 'keydown', (e) => {
        const b = slotBtn(e);
        if (!b || b.dataset.act !== 'hold' || (e.key !== ' ' && e.key !== 'Enter')) return;
        e.preventDefault();
        if (!e.repeat) { noteInput(); S.holdAt = api.now(); S.holdKey = true; holdStart(b.dataset.kind, Number(b.dataset.dur) || 1000); }
      });
      api.on(slot, 'click', (e) => {
        const b = slotBtn(e); if (!b) return;
        const act = b.dataset.act;
        if (act === 'hold') { if (api.now() - S.holdAt < 2500) return; noteInput(); holdStart(b.dataset.kind, Number(b.dataset.dur) || 1000); return; }
        noteInput();
        if (act === 'skip') skipClick();
        else if (act === 'tiltL') tilt(-4);
        else if (act === 'tiltR') tilt(4);
        else if (act === 'dismiss') { api.award(0.05, 'Memo'); sfx('tick'); finishEvent('ok'); }
        else if (act === 'intv') { speak('interview'); sfx('honk'); api.award(0.1, 'Interview'); finishEvent('ok'); }
        else if (act === 'toast') { sfx('pop'); api.award(0.5, 'Toast'); ST('toasts'); seq(LN.toastOk.slice(0, 2 + (S.toastN++ % 3 ? 0 : 2)), 3600, { engine: true, priority: 1 }); finishEvent('ok'); }
        else if (act === 'next') newLap();
      });

      /* ---------- events ---------- */
      function sipSuccess() {
        const first = api.stat.get('snail-marathon.sips') === 0;
        ST('sips'); api.award(1, 'Hydration'); sfx('pop'); S.damp = true; S.glitter = api.now() + 1500;
        if (first && S.P < 1) speak('preHyd'); else if (sv('club7half', false) && api.chance(0.5)) speak('sipHalf'); else speak('sipOk');
        if (api.stat.get('snail-marathon.sips') >= 3) ach('hydration');
        finishEvent('ok');
      }
      function nibbleSuccess() {
        S.glitter = api.now() + 1200; sfx('pop'); speak('cabbage', {}, 1); script(() => speak('cabbage', {}, 2), 2500); finishEvent('ok');
      }
      function endSponsor(early) {
        if (!S.sponsor) return;
        S.sponsor = null; api.clearTimeout(S.adT); go.removeAttribute('aria-disabled'); setOverlay(null);
        if (early) { api.award(0.2, 'Brand Loyalty'); sfx('ding'); speak('adSkip'); } else speak('adEnd');
        finishEvent('ok');
      }
      function skipClick() {
        const sp = S.sponsor; if (!sp) return;
        sp.left--; sfx('tick');
        const b = slot.querySelector('button');
        if (b) b.textContent = sp.left > 0 ? 'SKIP SPONSOR (' + sp.left + ')' : 'Skipped';
        if (sp.left <= 0) endSponsor(api.now() - sp.t0 < tm(10000));
      }
      function shellSet(a) {
        if (!S.shell) return;
        S.shell.a = a; if (S.shellLbl) S.shellLbl.textContent = 'Shell: ' + Math.round(a) + ' deg';
        if (Math.abs(a) <= 3) { S.shell.a = 0; sfx('stamp'); sfx('ding'); api.award(0.3, 'Shell approved'); S.stampT = api.now() + 1400; speak('shellOk'); finishEvent('ok'); }
      }
      function tilt(d) { if (S.shell) { sfx('tick'); shellSet(S.shell.a + d); } }
      const EV = {
        hydration: { min: 4, ms: 15000,
          start() {
            S.cup = 1; speak('hydStart');
            script(() => { if (S.ev && S.ev.id === 'hydration') speak(S.beat >= 9 ? 'brenda9' : api.stat.get('snail-marathon.sips') === 0 ? 'hydNoClick' : 'hydBrenda'); }, 1800);
            setSlot(holdBtn('HOLD TO SIP', 'sip', 2000));
          },
          fb() { speak('cupRepost'); finishEvent('fb'); },
          end() { S.cup = 0; holdCancel(); } },
        sponsor: { min: 5, ms: 15000,
          start() {
            S.adI = (S.adI + 1) % LN.adText.length;
            S.sponsor = { left: 5, t0: api.now() };
            setOverlay(el('div', { class: 'm-snail-marathon-card m-snail-marathon-ad' }, el('div', { class: 'm-snail-marathon-prod', 'aria-hidden': 'true' }, el('b'), el('i')), el('div', {}, el('small', { text: 'SPONSOR BREAK' }), LN.adText[S.adI])));
            go.setAttribute('aria-disabled', 'true'); setSlot(actBtn('SKIP SPONSOR (5)', 'skip')); speak('sponsorQ');
            S.adT = script(() => { if (S.sponsor) endSponsor(false); }, 10000);
          },
          fb() { endSponsor(false); finishEvent('ok'); },
          end() { if (S.sponsor) { S.sponsor = null; api.clearTimeout(S.adT); go.removeAttribute('aria-disabled'); setOverlay(null); } } },
        salt: { min: 4, ms: 8000,
          start() { S.salt = { until: api.now() + tm(3000) }; speak('saltStart'); S.saltT = script(() => { if (S.ev && S.ev.id === 'salt') { speak('saltEnd'); finishEvent('ok'); } }, 3000); },
          fb() { finishEvent('ok'); },
          end() { S.salt = null; api.clearTimeout(S.saltT); } },
        shell: { min: 4, ms: 15000,
          start() { S.shell = { a: (api.chance(0.5) ? 1 : -1) * api.randInt(20, 45) }; speak('shellStart'); S.shellLbl = el('b', { text: 'Shell: ' + Math.round(S.shell.a) + ' deg' }); setSlot(el('div', { style: 'display:flex;gap:10px;flex-wrap:wrap;justify-content:center;align-items:center' }, actBtn('Tilt <', 'tiltL'), S.shellLbl, actBtn('Tilt >', 'tiltR'))); },
          fb() { speak('shellFb'); S.stampT = api.now() + 1200; sfx('stamp'); finishEvent('fb'); },
          end() { S.shell = null; S.drag = null; } },
        cabbage: { min: 2, ms: 15000,
          start() { S.cab = 1; speak('cabbage', {}, 0); setSlot(holdBtn('HOLD TO NIBBLE', 'nibble', 1000)); },
          fb() { finishEvent('fb'); },
          end() { S.cab = 0; holdCancel(); } },
        photo: { min: 2, ms: 2500,
          start() {
            flash(); sfx('pop');
            const pc = el('canvas', { width: 120, height: 90, 'aria-hidden': 'true' });
            try {
              const d = S.dpr, sw = Math.min(120 * d, cv.width), sh = Math.min(90 * d, cv.height);
              if (sw > 0 && sh > 0) pc.getContext('2d').drawImage(cv, clamp((S.snailX - 60) * d, 0, cv.width - sw), clamp((S.y0 + S.lh * 2 - 45) * d, 0, cv.height - sh), sw, sh, 0, 0, 120, 90);
            } catch (e) { /* tiny canvas */ }
            const cap = (Number(sv('socks', 0)) || 0) >= 3 ? LN.photoSock[0] : bagNext('photoCap');
            shelf.appendChild(el('figure', { class: 'm-snail-marathon-pol', style: '--r:' + (api.randInt(-40, 40) / 10) + 'deg' }, pc, el('figcaption', { text: cap })));
            while (shelf.children.length > 5) shelf.removeChild(shelf.firstChild);
            ST('polaroids'); speak('photoSay');
            const me = S.ev; script(() => { if (S.ev && S.ev === me) finishEvent('ok'); }, 600);
          },
          fb() { finishEvent('ok'); } },
        weather: { min: 3, ms: 12000,
          start() { S.rain = { until: api.now() + tm(12000) }; sfx('ding'); speak('weather'); },
          fb() { finishEvent('ok'); },
          end() { S.rain = null; } },
        interview: { min: 2, ms: 12000,
          start() { setSlot(actBtn('Sheila has a statement', 'intv', el('span', { class: 'm-snail-marathon-face2', 'aria-hidden': 'true' }))); },
          fb() { speak('interview'); finishEvent('fb'); } },
        tangent: { min: 3, ms: 8000,
          start() { S.interest = clamp(S.interest - 15, 0, 100); speak('tierB'); script(() => speak('tierB'), 3000); },
          fb() { finishEvent('ok'); } },
        memo: { min: 3, ms: 15000,
          start() { const i = S.memoI % LN.memo.length; S.memoI++; setOverlay(el('div', { class: 'm-snail-marathon-note', text: LN.memo[i] })); setSlot(actBtn('Dismiss', 'dismiss')); },
          fb() { speak('memoFb'); finishEvent('fb'); },
          end() { setOverlay(null); } },
        sock: { min: 4, ms: 6000,
          start() { S.sock = { t0: api.now(), dur: tm(6000), hit: false }; speak(api.flag.get('sockSeen') ? 'sockKnown' : 'sockStart'); },
          fb() { finishEvent('ok'); },
          end() { S.sock = null; } },
        dennis: { min: 3, ms: 7500,
          start() { S.dennis = { t0: api.now(), dur: tm(7000), hit: false }; speak(api.flag.get('metDennis') || api.flag.get('plantClicked') ? 'dennisKnown' : 'dennis'); api.flag.set('metDennis', true); /* lint-ignore */ },
          fb() { finishEvent('ok'); },
          end() { S.dennis = null; } },
        toast: { min: 3, ms: 12000,
          start() { S.toast = 1; speak(api.flag.get('metToaster') ? 'toastKnown' : 'toast'); api.flag.set('metToaster', true); /* lint-ignore */ setSlot(actBtn('Accept toast', 'toast')); },
          fb() { S.toast = 0; finishEvent('fb'); },
          end() { S.toast = 0; } },
        steward: { min: 4, ms: 6000,
          start() {
            S.steward = { t0: api.now(), dur: tm(6000) }; speak('stewardL');
            if (S.beat >= 8) { script(() => speak('chip'), 900); if (S.debt > 0) script(clipboard, 3000); }
          },
          fb() { finishEvent('ok'); },
          end() { S.steward = null; } },
        sandwich: { min: 99, ms: 10000,
          start() {
            const r = S.swRun = { t0: api.now(), dur: tm(8500), hit: false }; S.swOut = true; sfx('whoosh'); hud();
            spk1(LN.swEsc[0], { priority: 1 }); script(() => { if (S.swRun === r) play(LN.swEsc[1]); }, 3200);
          },
          fb() { if (S.swRun && !S.swRun.hit) { S.cheese = true; api.save.set('cheeseSeen', true); speak('swGone', {}, 0); script(() => speak('swGone', {}, 1), 3200); } finishEvent('ok'); },
          end() { S.swRun = null; hud(); } }
      };
      function swCaught() {
        const r = S.swRun;
        if (!r || r.hit || S.ev === null || S.ev.id !== 'sandwich') return;
        r.hit = true; S.cheese = true; S.swOut = false; ST('sandwiches'); api.award(0.5, 'Sandwich'); sfx('tada'); sfx('boing'); S.cheer = api.now() + tm(3000);
        api.save.set('cheeseSeen', true); speak('swCatch', {}, 0); script(() => speak('swCatch', {}, 1), 3200);
        script(() => { if (S.ev && S.ev.id === 'sandwich') finishEvent('ok'); }, 900);
      }
      function guardOfHonour() {
        if (S.beat !== 9 || S.lockEnding) return;
        const rt0 = S.rt, lap = S.lap, now = api.now(), live = () => S.beat === 9 && S.lap === lap;
        S.sheilaFz = sheilaOff(); S.freeze = true; S.salute = now + tm(9000); sfx('ding'); heads.classList.add('m-snail-marathon-still');
        seq(LN.guard, 4000, { priority: 1 }, live);
        script(() => { heads.classList.remove('m-snail-marathon-still'); if (S.freeze && live()) { S.phase += 2 * Math.PI * (rt0 - S.rt) / 80; S.freeze = false; } }, 11500);
      }
      const RARE = ['sock', 'dennis', 'toast'];
      function clipboard() { if (S.debt <= 0) return; S.debt = 0; speak('clip', {}, 0); script(() => speak('clip', {}, 1), 2500); }
      function canStart() { return !S.busy && !S.ev && !S.lockEnding && !S.montage && S.idleStage < 1 && !S.bird && !S.silent; }
      function startEvent(id) {
        const def = EV[id];
        if (!def || !canStart()) return false;
        S.busy = 'event';
        const inst = { id: id, def: def, fb: 0 };
        S.ev = inst; S.lastEv = id;
        inst.fb = api.setTimeout(() => { if (S.dead || S.ev !== inst) return; if (def.fb) def.fb(); else finishEvent('ok'); }, tm(def.ms || 15000));
        if (S.sw >= 1 && S.swInt < 4 && api.chance(0.35)) { S.swInt++; script(() => speak('swInt'), 1500); }
        def.start(inst);
        return true;
      }
      function finishEvent(res) {
        const inst = S.ev;
        if (!inst) return;
        api.clearTimeout(inst.fb);
        S.ev = null; if (S.busy === 'event') S.busy = null;
        setSlot(null);
        if (inst.def.end) inst.def.end(res);
        if (res !== 'x') S.interest = clamp(S.interest + 8, 0, 100);
        S.evTimer = sel ? api.randInt(12, 20) / 10 : api.randInt(15, 25);
      }
      function abortEvent() { if (S.ev) finishEvent('x'); }
      function schedule(dts) {
        if (S.beat < 2 || S.beat > 8 || !canStart()) return;
        S.evTimer -= dts;
        if (S.evTimer > 0) return;
        const rare = RARE.find((k) => !S.rareForced[k]);
        if (sel && rare && S.beat >= 4) { S.rareForced[rare] = 1; startEvent(rare); return; }
        if (S.beat >= 4 && api.chance(1 / 5)) { startEvent(api.pick(['sock', 'dennis', 'toast', 'sock', 'dennis'])); return; }
        let id = S.front.length ? S.front.shift() : null;
        if (!id) {
          if (!S.evBag.length) S.evBag = api.shuffle(Object.keys(EV).filter((k) => RARE.indexOf(k) < 0));
          const i = S.evBag.findIndex((k) => EV[k].min <= S.beat && k !== S.lastEv);
          if (i < 0) { S.evBag = []; S.evTimer = 1; return; }
          id = S.evBag.splice(i, 1)[0];
        }
        startEvent(id);
      }
      function scripted(key, delay, fn) {
        if (S.fired[key]) return;
        S.fired[key] = 1;
        const tag = S.lap; let tries = 0;
        const attempt = () => {
          if (S.dead || S.lap !== tag) return;
          if (!canStart()) { if (++tries < 90) script(attempt, 400); return; }
          fn();
        };
        script(attempt, delay);
      }

      /* ---------- set pieces: intro, montage ---------- */
      function startIntro() {
        S.busy = 'setpiece'; const it0 = S.intro = { i: 0 };
        const show = () => {
          if (S.intro !== it0) return;
          const it = INTRO[it0.i]; S.tokN = Math.round(S.ghost);
          setOverlay(el('button', { type: 'button', class: 'm-snail-marathon-card', 'aria-label': 'Skip introductions. ' + it.n + '. ' + sub(it.l), onclick: () => { noteInput(); endIntro(); } }, el('small', { text: it.s }), el('div', { class: 'm-snail-marathon-h', text: it.n }), sub(it.l)));
          sfx('tick');
        };
        show();
        for (let i = 1; i < 4; i++) script(() => { if (S.intro === it0) { it0.i = i; show(); } }, 2400 * i);
        script(() => { if (S.intro === it0) endIntro(); }, 9600);
        script(() => { if (S.intro === it0) endIntro(); }, 12000);
      }
      function endIntro() {
        if (!S.intro) return;
        S.intro = null; setOverlay(null); S.busy = null;
        S.evTimer = sel ? 1.5 : 8; speak('rank5'); script(() => speak('garyAhead'), 2500);
        script(() => { api.award(0.1, 'Consolation'); speak('consol'); }, 5000);
      }
      function startUnion() {
        if (S.beat >= 9 || S.lockEnding) return;
        S.busy = 'setpiece';
        const u = S.union = { t0: api.now() };
        setOverlay(el('div', { class: 'm-snail-marathon-card m-snail-marathon-union' }, el('small', { text: 'THE STAPLER, LOCAL 7½' }), el('div', { class: 'm-snail-marathon-h', text: 'WORK STOPPAGE' }),
          el('ol', {}, el('li', { text: 'More staples.' }), el('li', { text: 'Fewer pixels.' }), el('li', { text: 'A chair.' })),
          el('button', { type: 'button', class: 'm-snail-marathon-skip', onclick: () => { noteInput(); endUnion(u); } }, 'Acknowledge demands')));
        sfx('stamp'); S.shakeUntil = api.now() + 300;
        seq(LN.union, 4000, { engine: true, priority: 1 }, () => S.union === u);
        if (api.flag.get('metStapler')) script(() => { if (S.union === u) speak('unionKnown'); }, 13000);
        api.flag.set('metStapler', true); // lint-ignore
        script(() => endUnion(u), 15500);
      }
      function endUnion(u) {
        if (!S.union || S.union !== u) return;
        S.union = null;
        if (S.ending) return;
        setOverlay(null); S.busy = null; sfx('ding'); api.award(0.3, 'Collective bargaining'); ST('unions'); seq(LN.unionEnd, 3000);
      }
      function startMontage() {
        S.busy = 'setpiece';
        const m = S.montage = { hits: 0 };
        const big = el('div', { class: 'm-snail-marathon-big', text: 'BELIEVE' });
        const mcap = el('div', { class: 'm-snail-marathon-mcap' });
        const dim = el('div', { class: 'm-snail-marathon-dim', onclick: () => { noteInput(); } }, el('div', { class: 'm-snail-marathon-sun', 'aria-hidden': 'true' }), big, mcap,
          el('button', { type: 'button', class: 'm-snail-marathon-skip', onclick: () => { noteInput(); finishMontage(true); } }, 'Skip montage'));
        m.dim = dim; m.mcap = mcap; setOverlay(dim); escHint.hidden = false;
        const at = (ms, fn) => S.mt.push(script(() => { if (S.montage === m) fn(); }, ms));
        at(300, () => spk1(LN.montage[0])); at(2500, () => spk1(LN.montage[1]));
        for (let i = 0; i < 11; i++) at(1000 + i * 1200, () => sfx('ding'));
        at(3500, () => dim.classList.add('m-snail-marathon-rise'));
        [3000, 5500, 8000, 10500].forEach((ms) => at(ms, () => pulse(m)));
        at(6000, () => { big.classList.add('m-snail-marathon-on'); spk1(LN.montage[2]); });
        for (let i = 0; i < 6; i++) at(1500 + i * 2000, () => { const t = bagNext('mcaps'); mcap.textContent = t; caption('Montage', t); });
        at(14000, () => finishMontage(false));
      }
      function pulse(m) {
        const p = el('button', { type: 'button', class: 'm-snail-marathon-pulse', 'aria-label': 'Pulse. Click in time.', style: 'left:' + (20 + api.randInt(0, 60)) + '%;top:' + (30 + api.randInt(0, 40)) + '%',
          onclick: () => { noteInput(); m.hits++; m.mcap.textContent = api.pick(LN.pulseOk); sfx('pop'); if (p.parentNode) p.parentNode.removeChild(p); } });
        m.dim.appendChild(p);
        rawWait(() => { if (p.parentNode) p.parentNode.removeChild(p); }, 1700);
      }
      function finishMontage(skipped) {
        const m = S.montage;
        if (!m) return;
        S.mt.forEach((id) => api.clearTimeout(id)); S.mt = []; S.montage = null; setOverlay(null); S.busy = null; escHint.hidden = true;
        if (skipped) { S.debt++; speak('mSkip'); sfx('sad'); }
        else { move(1, api.now()); api.award(1, 'Montage'); ST('montages'); ach('montage'); speak('mEnd'); script(() => spk1(LN.montage[3]), 2500); }
        scripted('fake', skipped ? 5000 : 8000, fakeFinish);
      }
      function fakeFinish() {
        if (S.beat >= 9 || S.lockEnding || S.fake) return;
        const lap = S.lap, live = () => S.lap === lap && !S.ending && !S.dead, now = api.now();
        S.busy = 'setpiece'; S.fake = { t0: now, ms: tm(2600) }; ST('fakefinish');
        script(() => {
          if (!live()) return;
          sfx('tada'); sfx('pop'); confetti(60); S.cheer = api.now() + tm(4500); S.clapUntil = api.now() + 3000; heads.classList.add('m-snail-marathon-up'); api.award(0.5, 'Distance Remaining');
          spk1(LN.fakeA[0], { mood: 'proud', priority: 1 });
        }, 2800);
        script(() => { if (live()) { spk1(LN.fakeB[0], { priority: 1 }); flBubble('over here'); S.flBow = 1; } }, 5800);
        script(() => { S.fake = null; heads.classList.remove('m-snail-marathon-up'); S.cheer = 0; if (S.busy === 'setpiece' && !S.montage && !S.intro && !S.union) S.busy = null; if (live()) { sfx('sad'); spk1(LN.fakeC[0]); } }, 8500);
      }

      /* ---------- beats, ending, laps ---------- */
      function checkBeat() {
        const m = S.lap >= 2 ? 0.5 : 1;
        let b = 1;
        for (let i = 0; i < 10; i++) if (S.A >= ATH[i] * m || S.P >= PTH[i] * m) b = i + 1;
        while (S.beat < b) { S.beat++; onBeat(S.beat); }
      }
      function slLabel() { return S.nSl >= 1000 ? 'SLITHER (1 px, with feeling)' : S.nSl >= 400 ? 'SLITHER (1 px, firmly)' : S.nSl >= 100 ? 'SLITHER (still 1 px)' : 'SLITHER (1 px)'; }
      function setFinal(on) {
        go.classList.toggle('m-snail-marathon-final', on);
        go.textContent = on ? 'SLITHER' : slLabel();
      }
      function onBeat(b) {
        if (b === 2) scripted('intro', 600, startIntro);
        if (b === 3) speakAll('b3', 3000);
        if (b === 4) scripted('hyd1', 10000, () => startEvent('hydration'));
        if (b === 5) { scripted('ad1', 3000, () => startEvent('sponsor')); S.front.unshift('salt'); }
        if (b === 6) { S.front.push('shell'); S.front.push('photo'); speak('turbo3'); }
        if (b === 7) { scripted('montage', 10000, startMontage); scripted('swEsc', 56000, () => { if (S.sw >= 1 && S.beat === 7) startEvent('sandwich'); }); }
        if (b === 8) {
          S.units = 'snail-lengths'; S.unitsAt = S.A; spk1(LN.unitsA[0]);
          S.front.unshift('steward');
          scripted('b8', 3000, () => speakAll('b8', 4500));
          if (S.debt > 0) script(clipboard, 9000);
        }
        if (b === 9) {
          S.units = 'px'; abortEvent(); S.sync = api.now() + tm(20000); sfx('ding'); goldEl.classList.add('m-snail-marathon-on');
          setPin(12.4, tm(6000));
          if (!S.flickT) S.flickT = api.setInterval(() => { if (S.pin && S.beat === 9) S.pin.flick = S.pin.flick ? 0 : 0.1; }, tm(4000));
          speakAll('b9', 3500); script(() => speak('sigh'), 7000); script(() => speak('flick'), 9000);
          scripted('hyd9', 6000, () => { if (S.beat === 9) startEvent('hydration'); });
          scripted('photo9', 24000, () => { if (S.beat === 9) startEvent('photo'); });
          scripted('guard', 38000, guardOfHonour);
        }
        if (b === 10) {
          abortEvent(); S.sheilaFz = sheilaOff(); S.freeze = true; S.units = 'px'; S.sync = 0;
          goldEl.classList.add('m-snail-marathon-on');
          const lap = S.lap, live = () => !S.ending && S.lap === lap;
          setPin(1, tm(3000), () => { if (live()) { ach('almost'); speakAll('flStop', 3000); } });
          script(() => { if (live()) { S.tue = api.now(); seq(LN.eyes.concat(LN.tue), 3600, { priority: 1 }, live); } }, 10000);
          script(() => { if (live()) { S.endingReady = true; if (S.pin) S.pin.flick = 0; setFinal(true); sfx('ding'); seq(LN.b10, 4500, undefined, live); } }, 32000);
          if (api.chance(0.5)) script(() => { if (live()) speak('cracks'); }, 7000);
        }
      }
      function startEnding() {
        const now = api.now();
        const lapTag = S.lap;
        S.ending = true; S.lockEnding = true; S.busy = 'ending'; S.crossed = true; S.union = null; S.tue = 0;
        abortEvent();
        S.P += 1; S.bestLap = Math.max(S.bestLap, S.P);
        S.cheer = now + tm(14000); S.clapUntil = now + 5000; api.flag.set('snail-marathon.crossed', true); heads.classList.add('m-snail-marathon-up');
        ach('provisional'); api.award(5, 'Crossing'); ST('laps'); api.save.set('laps', (Number(sv('laps', 0)) || 0) + 1);
        garyTo(-1, tm(800)); S.fake = null;
        sfx('pop'); sfx('tada'); confetti(120);
        spk1(LN.cross[0], { mood: 'proud', priority: 1 }); script(() => spk1(LN.cross[1]), 1500); script(() => spk1(LN.cross[2]), 3000);
        script(() => {
          S.gerald = { t0: api.now() }; api.flag.set('metGerald', true); sfx('fanfare');
          spk1(LN.gerSpeech[0], { mood: 'proud', force: true }); script(() => spk1(LN.gerSpeech[1], { force: true }), 2500);
          script(() => say('Gerald', 'I have also brought you a fortune. It says: ' + api.line('fortune'), { force: true }), 4800);
        }, 2000);
        script(() => { if (S.ending && S.lap === lapTag) say('Management', 'The Pointless News Network has already picked this up. Headline: ' + api.line('ticker')); }, 17500);
        script(() => { if (S.lap === lapTag) spk1(LN.tueEnd[0]); }, 16000);
        script(() => { spk1(LN.official[0], { mood: 'proud', priority: 1, force: true }); }, 6000);
        script(() => { if (S.ending && S.lap === lapTag) { spk1(LN.garyStop[0], { engine: true, priority: 1 }); script(() => spk1(LN.garyStop[1], { priority: 1 }), 3500); } }, 7500);
        script(() => { setOverlay(el('div', { class: 'm-snail-marathon-stamp', text: 'PROVISIONAL' })); sfx('stamp'); spk1(LN.stampL[0], { force: true }); script(() => spk1(LN.sandraL[0], { force: true }), 3000); }, 9000);
        script(() => {
          S.flHat = S.lap % 6; sfx('ding'); S.flBow = 1;
          setOverlay(el('div', { class: 'm-snail-marathon-card m-snail-marathon-desk' }, el('small', { text: 'Course length' }), '7½ cm. Measured by S. (Compliance)'));
          speakAll('newHat', 2500); script(() => spk1(LN.desk[0]), 5000);
        }, 12000);
        script(() => {
          setOverlay(null); heads.classList.remove('m-snail-marathon-up');
          setSlot(actBtn('Begin Lap ' + (S.lap + 1), 'next')); spk1(LN.leave[0]);
          S.endT = script(() => { if (S.ending) newLap(); }, 20000);
        }, 15000);
      }
      function newLap() {
        if (S.dead || !S.ending) return;
        api.clearTimeout(S.endT);
        api.save.set('bestP', Math.max(Number(sv('bestP', 0)) || 0, S.bestLap));
        S.ghost = clamp(Number(sv('bestP', 0)) || 0, 60, 5000);
        S.lap++; S.tokN = S.lap;
        Object.assign(S, { P: 0, T: 0, Tgoal: 0, Tanim: null, pin: null, beat: 1, A: 0, fired: {}, front: [], evBag: [], busy: null, ev: null, slime: [], slimeAt: 0, lastBucket: 0, lastMile: 0,
          crossed: false, ending: false, lockEnding: false, endingReady: false, freeze: false, sync: 0, gerald: null, damp: false, interest: 100, garyOff: 1, garyAnim: null, sw: 0, swInt: 0,
          ghostPassed: false, bestLap: 0, bird: null, hold: null, cup: 0, salt: null, steward: null, sock: null, rain: null, shell: null, cab: 0, sponsor: null, montage: null, intro: null,
          evTimer: sel ? 1.5 : 20, units: S.lap >= 2 ? 'snail-lengths' : 'px', club75: 0, cheer: 0, retract: 0, withdrawn: false, idleStage: 0, bookclub: false, cupBlink: false, tue: 0, union: null, sit: null, dennis: null, toast: 0, swOut: false, swRun: null, fake: null });
        S.lastInput = api.now();
        goldEl.classList.remove('m-snail-marathon-on'); setFinal(false); setSlot(null); setOverlay(null); go.removeAttribute('aria-disabled');
        heads.classList.remove('m-snail-marathon-up');
        const ri = (S.lap - 2) % 6; S.rules.add(ri);
        if (ri === 5) S.spamMul = 2;
        speakAll('lap', 3000);
        script(() => speakAll(S.cheese ? 'payoff2' : 'payoff', 2500), 16000);
        script(() => { if (!sv('cheeseSeen', false)) api.save.set('cheeseSeen', true); }, 17000);
        script(() => { S.tokN = S.lap; if (S.lap <= 7) spk1(LN.rules[ri]); else speak('ruleBack'); }, 9000);
        if (api.chance(0.3)) script(() => speak('cracks'), 30000);
        hud();
      }

      /* ---------- the clock ---------- */
      const IDLE = [30, 60, 90, 120, 180, 240, 300, 420, 600, 900, 1800];
      function idleTick(now, since) {
        if (S.lockEnding) return;
        const th = (s) => (sel ? s * 100 : s * 1000);
        if (S.idleStage < IDLE.length && since > th(IDLE[S.idleStage]) + th(60)) { S.lastInput = now - th(IDLE[S.idleStage]); since = th(IDLE[S.idleStage]); }
        if (S.idleStage < IDLE.length && since >= th(IDLE[S.idleStage])) {
          const s = ++S.idleStage, secs = IDLE[s - 1];
          if (secs === 90) { S.withdrawn = true; S.cupBlink = true; garyTo(0, tm(6000)); idleSeq('idle90', s, 3500); }
          else if (secs === 180) { S.bookclub = true; ach('idler'); api.award(3, 'Idling'); ST('idle_events'); idleSeq('idle180', s, 3500); }
          else if (secs === 300) { ST('idle_events'); idleSeq('idle300', s, 4000); }
          else if (secs === 600) {
            ST('idle_events');
            if (!S.pin && !S.crossed && S.beat < 9 && S.sit === null) { const want = 24 - 3000 + S.P; if (want < S.Tgoal) { S.sit = S.Tgoal; setT(want, tm(9000)); } }
            idleSeq('idle600', s, 4500);
          } else if (secs === 900 || secs === 1800) idleSeq('idle' + secs, s, 5000);
          else speak('idle' + secs);
        }
      }
      const MINI = [[30, () => speak('mini1')], [65, () => speak('mini2')], [110, () => { S.cheer = api.now() + tm(3500); speak('mini3'); }], [180, () => scripted('union', 0, startUnion)], [250, () => speak('mini4')], [330, () => speakAll('mini5', 4200)], [420, () => speak('mini6')], [500, () => speak('mini7')]];
      function minis() {
        const mm = S.lap >= 2 ? 0.5 : 1;
        MINI.forEach((m, i) => { const k = 'm' + i; if (S.A >= m[0] * mm && !S.fired[k]) { S.fired[k] = 1; if (!S.lockEnding && S.beat < 10) m[1](); } });
      }
      function tick() {
        if (S.dead) return;
        const now = api.now(), dts = clamp((now - S.lastTick) / 1000, 0, 1);
        S.lastTick = now; rm();
        if (document.hidden) return;
        const since = now - S.lastInput, active = since < 10000;
        S.rt += dts * (sel ? 10 : 1);
        if (active && !S.lockEnding) { S.A += dts * AS; checkBeat(); minis(); }
        idleTick(now, since);
        S.interest = clamp(S.interest - dts * (sel ? 6 : 1), 0, 100);
        if (S.interest < 1) { if (!S.gone) { S.gone = now; S.goneSaid = false; } else if (!S.goneSaid && now - S.gone > tm(15000)) { S.goneSaid = true; speak('gone'); } } else S.gone = 0;
        if (S.inRhythm && now - (S.okTimes[S.okTimes.length - 1] || 0) > 3000) { S.inRhythm = false; S.streak = 0; }
        const so = sheilaOff();
        if (S.prevSh < 0 && so >= 0 && S.beat >= 2 && S.idleStage < 3 && now - S.lastOver > tm(8000)) overtaken(now);
        S.prevSh = so;
        if (S.units === 'snail-lengths' && S.lap === 1 && S.beat >= 8 && S.beat < 10 && S.A - S.unitsAt >= 40) { S.units = 'Tuesday-adjacent'; spk1(LN.unitsB[0]); }
        S.chat -= dts;
        if (S.chat <= 0) { S.chat = (sel ? api.randInt(10, 14) / 10 : api.randInt(10, 14)) * (S.beat >= 9 ? 2.2 : 1); if (S.interest > 0 && active && !S.lockEnding && !S.bird && S.beat < 10) chatter(); }
        S.mg -= dts;
        if (S.mg <= 0) { S.mg = sel ? 3 : 25; S.mgN = (S.mgN || 0) + 1; if (active && !S.lockEnding && S.beat < 9 && !(S.mgN % 4 === 0 && xmod())) speak(S.mgN % 3 === 0 ? 'misc' : 'status'); }
        if (S.loupe.autoOn && S.loupe.auto && now > S.loupe.auto) { S.loupe.auto = 0; S.loupe.autoOn = false; if (!S.loupe.pinned) setLoupe(false); }
        if (!S.fired.near && S.beat < 9 && getR() < 6) { S.fired.near = 1; speak('near'); }
        schedule(dts);
        hud();
      }
      function loop() {
        if (S.dead) return;
        S.raf = api.requestAnimationFrame(loop);
        const now = api.now(), dt = clamp(now - S.lastFrame, 0, 50);
        S.lastFrame = now; S.fc = (S.fc || 0) + 1;
        if (S.fc % 8 === 1 || !S.cw) size();
        animate(now, dt); draw(now);
      }

      /* ---------- input wiring ---------- */
      const half = (e) => (e.shiftKey || e.altKey ? 0.5 : 1);
      api.on(go, 'pointerdown', (e) => { if (e.button > 0) return; go.classList.add('m-snail-marathon-dn'); S.ptrFlag = api.now(); doSlither(half(e), 'btn'); });
      ['pointerup', 'pointerleave', 'pointercancel'].forEach((n) => api.on(go, n, () => go.classList.remove('m-snail-marathon-dn')));
      api.on(go, 'keydown', (e) => { if (e.key === ' ' || e.key === 'Enter') { e.preventDefault(); if (e.repeat) heldKey(); else { S.keyFlag = api.now(); doSlither(1, 'key'); } } });
      api.on(go, 'keyup', (e) => { if (e.key === ' ') e.preventDefault(); });
      api.on(go, 'click', (e) => {
        e.preventDefault();
        const n = api.now();
        if (S.ptrFlag && n - S.ptrFlag < 2000) { S.ptrFlag = 0; return; }
        if (S.keyFlag && n - S.keyFlag < 2000) { S.keyFlag = 0; return; }
        doSlither(half(e), 'click');
      });
      api.on(go, 'contextmenu', (e) => { e.preventDefault(); if (S.coarse || e.button === 2) doSlither(0.5, 'ctx'); });
      api.on(slot, 'contextmenu', (e) => e.preventDefault());
      api.on(loupeBtn, 'click', () => { noteInput(); S.loupe.autoOn = false; setLoupe(!S.loupe.on, false); });
      function canvasPt(e) { const r = cv.getBoundingClientRect(); return { x: (e.clientX - r.left) * (S.cw / (r.width || 1)), y: (e.clientY - r.top) * (S.ch / (r.height || 1)) }; }
      function canvasAct(e, fromPointer) {
        const now = api.now(), p = canvasPt(e), near = (x, y, rad) => Math.hypot(p.x - x, p.y - y) <= rad;
        let hit = null;
        const sk = sockPos(now), dp = dennisPos(now), sw = swPos(now);
        const fxp = S.snailX + 36 + getR(), topp = Math.max(6, S.y0 - 30);
        if (near(crowdX(6), S.y0 - 8, 22)) hit = 'cricket';
        else if (sk && near(sk.x, sk.y - 8, 20)) hit = 'sock';
        else if (sw && near(sw.x, sw.y - 14, 26)) hit = 'sandwich';
        else if (dp && near(dp.x, dp.y - 16, 24)) hit = 'dennis';
        else if (near(wrongX(), S.y0 - 8, 16)) hit = 'wrong';
        else if (fxp + 47 < S.cw && near(fxp + 47, topp + 45, 16)) hit = 'pat';
        else if (near(S.snailX + sheilaOff(), S.y0 + S.lh - 3 - 14 * S.sc, 16)) hit = 'sheila';
        if (hit) {
          noteInput();
          if (hit === 'cricket') cricketHit(now);
          else if (hit === 'sock') sockHit(now);
          else if (hit === 'sandwich') swCaught();
          else if (hit === 'pat') doPat();
          else if (hit === 'dennis') { const d = S.dennis; if (d && !d.hit) { d.hit = true; sfx('honk'); api.award(0.2, 'Dennis'); ST('dennis'); speak('dennisHit'); } }
          else if (hit === 'wrong') { S.wrong++; sfx('tick'); S.tinyBubble = { text: 'wrong way!', t0: now }; if (S.wrong >= 20 && !S.wrongDone) { S.wrongDone = true; revTrigger(); } }
          else { speak('sheilaL'); sfx('honk'); }
          return;
        }
        if (fromPointer && S.shell && Math.abs(p.x - S.snailX) < 44 && Math.abs(p.y - (S.y0 + S.lh * 2.6)) < 34) { noteInput(); S.drag = { x0: p.x, a0: S.shell.a }; return; }
        doSlither(half(e), 'canvas');
      }
      api.on(cv, 'pointerdown', (e) => {
        if (e.button > 0) return;
        e.preventDefault(); S.ptrFlag = api.now();
        if (e.pointerType && e.pointerType !== 'mouse') {
          api.clearTimeout(S.lpT);
          S.lpT = rawWait(() => { noteInput(); if (S.loupe.pinned) setLoupe(false); else { S.loupe.autoOn = false; setLoupe(true, true); } }, 400);
        }
        canvasAct(e, true);
      });
      api.on(cv, 'click', (e) => {
        const n = api.now();
        if (S.ptrFlag && n - S.ptrFlag < 2000) { S.ptrFlag = 0; return; }
        canvasAct(e, false);
      });
      api.on(cv, 'pointermove', (e) => {
        const p = canvasPt(e);
        if (S.drag && S.shell) shellSet(clamp(S.drag.a0 + (p.x - S.drag.x0) * 0.5, -60, 60));
        if (e.pointerType === 'mouse' && S.loupe.on && !S.loupe.pinned) S.loupe.ptr = p;
      });
      const upCv = () => { S.drag = null; api.clearTimeout(S.lpT); };
      api.on(cv, 'pointerup', upCv);
      api.on(cv, 'pointercancel', upCv);
      api.on(cv, 'pointerleave', () => { upCv(); if (!S.loupe.pinned) S.loupe.ptr = null; });
      api.on(document, 'keydown', (e) => {
        if (S.dead || !root.isConnected) return;
        const tg = e.target, tag = tg && tg.tagName;
        if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || (tg && tg.isContentEditable)) return;
        if (e.ctrlKey || e.metaKey) return;
        const k = String(e.key), lk = k.toLowerCase(), onBtn = !!(tg && tg.closest && tg.closest('button,a[href],summary,[role="button"],[role="link"]'));
        if (k.length === 1 && /[a-zA-Z]/.test(k) && !e.repeat) { S.typed = (S.typed + k.toUpperCase()).slice(-4); if (S.typed === 'SALT') doSalt(); else if (S.typed.slice(-3) === 'PAT') doPat(); }
        if (k === 'Escape') { noteInput(); if (S.montage) finishMontage(true); else { S.escN++; if (S.escN === 1 || S.escN % 6 === 0) speak('escape'); } return; }
        if (k === ' ' || k === 'Enter') {
          if (onBtn) return;
          e.preventDefault();
          if (e.repeat) { heldKey(); return; }
          S.keyFlag = api.now(); doSlither(1, 'key');
          return;
        }
        if (lk === 'z' || lk === 'x') {
          if (e.repeat) return;
          if (S.lastZX && lk !== S.lastZX) S.elegance = Math.min(8, S.elegance + 1); else if (S.lastZX === lk) S.elegance = 0;
          S.lastZX = lk; doSlither(e.shiftKey ? 0.5 : 1, 'zx');
          return;
        }
        if (lk === 'l') { if (!e.repeat) { noteInput(); S.loupe.autoOn = false; setLoupe(!S.loupe.on, false); } return; }
        if (lk === 'h') { if (!e.repeat) { noteInput(); const sp = holdSpec(); if (sp && !S.hold) { S.holdAt = api.now(); S.holdKey = true; holdStart(sp[0], sp[1]); } } return; }
        if (k === 'ArrowLeft') { e.preventDefault(); if (S.shell) { noteInput(); tilt(-4); } else if (!e.repeat) stepBack(e.shiftKey ? 0.5 : 1); return; }
        if (k === 'ArrowRight') { e.preventDefault(); if (S.shell) { noteInput(); tilt(4); } else if (!e.repeat) doSlither(e.shiftKey ? 0.5 : 1, 'arrow'); }
      });
      api.on(document, 'keyup', (e) => {
        if (S.holdKey && (e.key === ' ' || e.key === 'Enter' || e.key === 'h' || e.key === 'H')) { S.holdKey = false; holdCancel(); }
      });
      api.on(document, 'visibilitychange', () => {
        const n = api.now();
        if (document.hidden) S.hiddenAt = n;
        else { if (S.hiddenAt) { S.lastInput += n - S.hiddenAt; S.hiddenAt = 0; } S.lastTick = n; S.lastFrame = n; }
      });

      /* ---------- opening ---------- */
      size(); hud();
      S.raf = api.requestAnimationFrame(loop);
      api.setInterval(tick, 200);
      script(() => { sfx('pop'); confetti(4); S.clapUntil = api.now() + 1500; spk1(LN.welcome[0], { mood: 'proud', priority: 2 }); S.cheer = 0; }, 200);
      script(() => speak('train', { priority: 1 }), 3000);
      script(() => { const laps = Number(sv('laps', 0)) || 0; if (laps > 0) { S.tokN = laps; speak('back', { priority: 1 }); } else speak('cork', { priority: 1 }); }, 6000);
      script(() => { if (api.flag.get('metGerald')) speak('gerGun', { priority: 1 }); else speak('potato', { priority: 1 }); }, 9500);
      script(() => speak('hOpen'), 12500);
      script(() => { if (!S.firstClick) speak('nudge'); }, 19000);
      script(() => { if (!S.firstClick) speak('nudge'); }, 46000);

      return {
        destroy() {
          S.dead = true;
          api.save.set('bestP', Math.max(Number(sv('bestP', 0)) || 0, S.bestLap));
        }
      };
    }
  });
})();
