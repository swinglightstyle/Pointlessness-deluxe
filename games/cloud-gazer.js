/* POINTLESS module: cloud-gazer */
/* Professional Cloud Gazer: tag drifting clouds, state your certainty, and be disagreed with by Examiner Pruitt. */
(function () {
  'use strict';
  const P = window.POINTLESS;
  P.injectCSS(`
.m-cloud-gazer-app{--ink:#2b2a33;--mint:#7fd8b5;--lil:#b79ae6;--mus:#f2b632;--cor:#ff6b5e;--pap:#fffdf4;--wood:#b5834a;--red:#d9453d;position:relative;display:flex;flex-direction:column;gap:8px;max-width:1040px;margin:0 auto;font-family:ui-rounded,'Trebuchet MS',system-ui,sans-serif;color:var(--ink)} .m-cloud-gazer-app *{box-sizing:border-box} .m-cloud-gazer-app button{font:inherit;color:inherit;cursor:pointer}
.m-cloud-gazer-app button:focus-visible,.m-cloud-gazer-app input:focus-visible{outline:3px solid var(--mint);outline-offset:2px} .m-cloud-gazer-hint{font-weight:800;font-size:.95rem;min-height:1.3em;text-align:center;padding:0 4px}
.m-cloud-gazer-sky{position:relative;aspect-ratio:16/10;min-height:300px;max-height:520px;overflow:hidden;border:3px solid var(--ink);border-radius:14px;box-shadow:3px 3px 0 var(--ink);background:#8fd3f4;user-select:none;-webkit-user-select:none;touch-action:manipulation;cursor:pointer} .m-cloud-gazer-sky.m-cloud-gazer-shake{animation:m-cloud-gazer-shake .08s linear 1}
@keyframes m-cloud-gazer-shake{0%{transform:translate(0,0)}33%{transform:translate(2px,-2px)}66%{transform:translate(-2px,1px)}100%{transform:translate(0,0)}} .m-cloud-gazer-cv,.m-cloud-gazer-dim,.m-cloud-gazer-strings,.m-cloud-gazer-btns,.m-cloud-gazer-tags,.m-cloud-gazer-fx{position:absolute;left:0;top:0;width:100%;height:100%} .m-cloud-gazer-cv{display:block}
.m-cloud-gazer-dim,.m-cloud-gazer-strings,.m-cloud-gazer-btns,.m-cloud-gazer-tags,.m-cloud-gazer-fx{pointer-events:none} .m-cloud-gazer-dim{background:#14122b;opacity:0} .m-cloud-gazer-strings path{fill:none;stroke:#2b2a33;stroke-width:1.5;stroke-dasharray:3 2} .m-cloud-gazer-cb{position:absolute;left:0;top:0;margin:0;padding:0;border:0;background:transparent;border-radius:50%;pointer-events:none}
.m-cloud-gazer-cb:focus-visible{outline:3px solid var(--mint);outline-offset:-3px} .m-cloud-gazer-tag{position:absolute;left:0;top:0;pointer-events:auto;background:var(--mus);border:2px solid var(--ink);border-radius:4px 8px 8px 4px;padding:1px 8px 2px;font:italic 700 .85rem Georgia,'Times New Roman',serif;color:#8f1f18;white-space:nowrap;box-shadow:2px 2px 0 var(--ink);max-width:180px;will-change:transform}
.m-cloud-gazer-tag.m-cloud-gazer-prev{opacity:.85;border-style:dashed} .m-cloud-gazer-tag.m-cloud-gazer-tiny{font-size:.7rem;padding:0 5px;box-shadow:none} .m-cloud-gazer-tag.m-cloud-gazer-inkrun{filter:blur(1.2px);color:rgba(143,31,24,.7)}
.m-cloud-gazer-tag.m-cloud-gazer-inkrun::after{content:'';position:absolute;left:50%;top:100%;width:4px;height:6px;border-radius:0 0 4px 4px;background:#8f1f18;animation:m-cloud-gazer-drip 1.4s ease-in infinite} @keyframes m-cloud-gazer-drip{from{transform:translateY(0);opacity:.9}to{transform:translateY(14px);opacity:0}} .m-cloud-gazer-stamp{position:absolute;left:0;top:0;text-align:center;z-index:3}
.m-cloud-gazer-sti{display:inline-block;color:var(--red);border:4px solid var(--red);border-radius:10px;padding:0 12px;font:900 1.7rem/1.25 Impact,'Arial Black',system-ui,sans-serif;letter-spacing:.06em;text-shadow:3px 3px 0 rgba(255,107,94,.6);background:rgba(255,253,244,.35);animation:m-cloud-gazer-stin .12s ease-out 1,m-cloud-gazer-sfade 3s linear 1 forwards;transition:filter .3s,transform .3s}
.m-cloud-gazer-sti.m-cloud-gazer-sts{font-size:.95rem;border-width:3px;padding:0 8px} .m-cloud-gazer-sti.m-cloud-gazer-smudge{filter:blur(2.5px);transform:rotate(-9deg) scale(1.08)} .m-cloud-gazer-ssub{margin-top:2px;font:italic 700 .7rem Georgia,serif;color:#2b2a33;background:rgba(255,253,244,.8);border-radius:6px;padding:0 5px}
@keyframes m-cloud-gazer-stin{from{transform:scale(1.8) rotate(4deg);opacity:0}to{transform:scale(1) rotate(-3deg);opacity:1}} @keyframes m-cloud-gazer-sfade{0%,80%{opacity:1}100%{opacity:0}}
.m-cloud-gazer-say{position:absolute;left:0;top:0;background:#fff;border:2px solid var(--ink);border-radius:12px;padding:1px 8px;font:italic 700 .8rem Georgia,serif;white-space:nowrap;animation:m-cloud-gazer-sfade 3s linear 1 forwards} .m-cloud-gazer-flash{position:absolute;left:0;top:0;width:100%;height:100%;background:#fff;opacity:.3;animation:m-cloud-gazer-sfade .1s linear 1 forwards}
.m-cloud-gazer-ucfall{position:absolute;background:var(--mus);border:2px solid var(--ink);border-radius:4px;padding:0 6px;font:italic 700 .75rem Georgia,serif;color:#8f1f18;animation:m-cloud-gazer-fall .9s ease-in 1 forwards} @keyframes m-cloud-gazer-fall{0%{transform:translateY(0) rotate(0);opacity:1}100%{transform:translateY(120px) rotate(40deg);opacity:0}}
.m-cloud-gazer-curtain{position:absolute;left:0;top:0;width:100%;height:100%;background:#fffdf4;animation:m-cloud-gazer-cur 1.4s ease-in-out 1 forwards} @keyframes m-cloud-gazer-cur{0%{opacity:0}35%,60%{opacity:1}100%{opacity:0}}
.m-cloud-gazer-certc{position:absolute;left:50%;top:2%;max-height:96%;overflow:auto;padding:6px;width:min(90%,520px);transform:translateX(-50%);transform-origin:top center;pointer-events:auto;animation:m-cloud-gazer-unroll .7s ease-out 1 both;z-index:5} @keyframes m-cloud-gazer-unroll{from{transform:translateX(-50%) scaleY(0)}to{transform:translateX(-50%) scaleY(1)}}
.m-cloud-gazer-certb{background:var(--pap);border:3px double var(--ink);outline:3px solid var(--ink);outline-offset:3px;border-radius:6px;padding:16px 14px 12px;text-align:center;box-shadow:5px 5px 0 var(--ink)} .m-cloud-gazer-ct{font:900 1.05rem/1.25 Georgia,serif;letter-spacing:.04em;margin:4px 0 8px} .m-cloud-gazer-certb p{margin:4px 0;font:italic .85rem Georgia,serif}
.m-cloud-gazer-seal{width:46px;height:46px;margin:0 auto 4px;border-radius:50%;border:3px solid var(--ink);background:conic-gradient(#f2b632,#fff1c9,#f2b632,#d9a21d,#f2b632,#fff1c9,#f2b632);transform:rotate(-14deg)}
.m-cloud-gazer-form{display:flex;flex-wrap:wrap;align-items:center;gap:8px 10px;padding:8px 10px;background:var(--pap);border:3px solid var(--ink);border-radius:12px;box-shadow:3px 3px 0 var(--ink);position:relative} .m-cloud-gazer-form[hidden],.m-cloud-gazer-app [hidden]{display:none}
.m-cloud-gazer-in{flex:1 1 180px;min-width:0;font:inherit;font-size:1rem;padding:8px 10px;border:2px solid var(--ink);border-radius:8px;background:#fff;color:var(--ink)} .m-cloud-gazer-certw{display:flex;align-items:center;gap:4px;flex-wrap:wrap} .m-cloud-gazer-cl{font-size:.8rem;font-weight:800;margin-right:2px}
.m-cloud-gazer-pip{width:30px;height:30px;border-radius:50%;border:2px solid var(--ink);background:#fff;padding:0;line-height:1;font-size:.8rem;font-weight:800} .m-cloud-gazer-pip.m-cloud-gazer-on{background:var(--mus)} .m-cloud-gazer-btn{background:#fff;border:2px solid var(--ink);border-radius:10px;padding:6px 12px;font-weight:800;box-shadow:2px 2px 0 var(--ink)}
.m-cloud-gazer-btn:active:not([disabled]){transform:translate(2px,2px);box-shadow:0 0 0 var(--ink)} .m-cloud-gazer-btn[disabled]{opacity:.5;cursor:default} .m-cloud-gazer-go{background:var(--mint)} .m-cloud-gazer-chips{flex:1 1 100%;display:flex;flex-wrap:wrap;gap:6px} .m-cloud-gazer-chip{background:#fff;border:2px solid var(--ink);border-radius:999px;padding:3px 12px;font-weight:700;font-size:.85rem}
.m-cloud-gazer-chip:hover{background:var(--mus)} .m-cloud-gazer-drop{position:absolute;left:30px;top:-6px;font-size:1.1rem;animation:m-cloud-gazer-drop .9s ease-in 1 forwards;pointer-events:none} @keyframes m-cloud-gazer-drop{from{transform:translateY(-20px);opacity:0}30%{opacity:1}to{transform:translateY(34px);opacity:0}} .m-cloud-gazer-ctl{display:flex;flex-wrap:wrap;align-items:center;gap:8px 12px;padding:2px 2px}
.m-cloud-gazer-tiltw{display:flex;align-items:center;gap:8px;flex:1 1 220px;min-width:0;font-weight:700;font-size:.85rem} .m-cloud-gazer-tiltw input{flex:1 1 90px;min-width:70px;accent-color:#2b2a33} .m-cloud-gazer-locked{opacity:.55} .m-cloud-gazer-reg{background:var(--pap);border:3px solid var(--ink);border-radius:12px;padding:8px 12px;max-height:150px;overflow:auto;font:italic .85rem Georgia,serif}
.m-cloud-gazer-reg ol{margin:4px 0 0;padding-left:22px} .m-cloud-gazer-desk{position:relative;display:grid;grid-template-columns:auto minmax(0,1fr) auto;grid-template-areas:'pic bub clip' 'rt rt rt';gap:8px 12px;align-items:start;padding:16px 12px 10px;background:var(--wood);border:3px solid var(--ink);border-radius:14px;box-shadow:3px 3px 0 var(--ink)}
.m-cloud-gazer-desk::before{content:'';position:absolute;left:10px;right:10px;top:5px;height:6px;border-radius:3px;background:var(--mint);border:2px solid var(--ink)} .m-cloud-gazer-pic{grid-area:pic;position:relative;width:76px;height:76px;padding:0;background:#cfeaf7;border:3px solid var(--ink);border-radius:12px;display:block;transition:transform .3s} .m-cloud-gazer-face{width:100%;height:100%;display:block}
.m-cloud-gazer-face *{transform-box:fill-box;transform-origin:center} .m-cloud-gazer-brr{transform:rotate(-14deg) translateY(-1px);transition:transform .2s} .m-cloud-gazer-pic[data-mood=smug] .m-cloud-gazer-brr{transform:rotate(-22deg) translateY(-3px)} .m-cloud-gazer-pic[data-mood=shaken] .m-cloud-gazer-brr,.m-cloud-gazer-pic[data-mood=shaken] .m-cloud-gazer-brl{transform:translateY(-4px)}
.m-cloud-gazer-pic[data-mood=shaken] .m-cloud-gazer-eyes{transform:scale(1.5)} .m-cloud-gazer-pic[data-mood=quiet] .m-cloud-gazer-eyes{transform:scaleY(.35)} .m-cloud-gazer-eyes{transition:transform .15s} .m-cloud-gazer-face.m-cloud-gazer-blink .m-cloud-gazer-eyes{transform:scaleY(.1)} .m-cloud-gazer-mo{display:none}
.m-cloud-gazer-pic[data-mood=neutral] .m-cloud-gazer-mn,.m-cloud-gazer-pic[data-mood=quiet] .m-cloud-gazer-mn,.m-cloud-gazer-pic[data-mood=smug] .m-cloud-gazer-ms,.m-cloud-gazer-pic[data-mood=shaken] .m-cloud-gazer-mo2{display:block} .m-cloud-gazer-pic[data-mood=out] .m-cloud-gazer-face{display:none} .m-cloud-gazer-pic.m-cloud-gazer-tilted{transform:rotate(20deg)}
.m-cloud-gazer-pic.m-cloud-gazer-stand{transform:translateY(-10px) scale(1.1)} .m-cloud-gazer-pic.m-cloud-gazer-swapped{transform:scale(.62);transform-origin:left bottom} .m-cloud-gazer-chair,.m-cloud-gazer-coat,.m-cloud-gazer-badge{display:none;position:absolute;left:0;top:0;width:100%;height:100%;align-items:center;justify-content:center;font-size:2.2rem}
.m-cloud-gazer-pic[data-mood=out] .m-cloud-gazer-chair{display:flex} .m-cloud-gazer-coat.m-cloud-gazer-on{display:flex;align-items:flex-end;justify-content:flex-end;font-size:1.6rem}
.m-cloud-gazer-bub{grid-area:bub;position:relative;align-self:stretch;min-height:76px;background:#fff;border:3px solid var(--ink);border-radius:14px;padding:8px 12px;font:italic 600 .95rem/1.35 Georgia,'Times New Roman',serif;display:flex;align-items:center}
.m-cloud-gazer-bub::before{content:'';position:absolute;left:-11px;top:26px;width:16px;height:16px;background:#fff;border-left:3px solid var(--ink);border-bottom:3px solid var(--ink);transform:rotate(45deg)}
.m-cloud-gazer-clip{grid-area:clip;width:176px;background:var(--pap);border:3px solid var(--ink);border-radius:8px;padding:6px 8px 6px;font-size:.78rem;line-height:1.35;position:relative;box-shadow:2px 2px 0 var(--ink)} .m-cloud-gazer-clip::before{content:'';position:absolute;left:50%;top:-8px;width:40px;height:10px;margin-left:-20px;background:#8b8f99;border:2px solid var(--ink);border-radius:4px}
.m-cloud-gazer-cg{font:900 1.7rem/1 Impact,'Arial Black',system-ui,sans-serif;color:var(--red);letter-spacing:.04em} .m-cloud-gazer-mn2{font:italic 700 .8rem Georgia,serif;color:#7b58c4;min-height:1.2em} .m-cloud-gazer-rt{grid-area:rt;display:flex;flex-wrap:wrap;gap:6px 10px;align-items:center;font-size:.8rem;font-weight:700}
.m-cloud-gazer-chip2{display:inline-flex;align-items:center;gap:4px;background:rgba(255,253,244,.88);border:2px solid var(--ink);border-radius:8px;padding:2px 8px;white-space:nowrap} .m-cloud-gazer-shelf{display:inline-flex;align-items:flex-end;gap:1px;height:30px;padding:0 4px;background:#8a5f2b;border:2px solid var(--ink);border-radius:4px}
.m-cloud-gazer-book{display:inline-block;width:6px;border:1px solid var(--ink);border-radius:1px} .m-cloud-gazer-nt{font-size:.62rem;font-weight:800;letter-spacing:.04em} .m-cloud-gazer-steam{display:inline-block;animation:m-cloud-gazer-steam 1.2s steps(3) infinite} @keyframes m-cloud-gazer-steam{0%{transform:translateY(0);opacity:1}100%{transform:translateY(-4px);opacity:.4}}
.m-cloud-gazer-sr{position:absolute;width:1px;height:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap} .m-cloud-gazer-swapbox{display:none;justify-content:center;align-items:center;gap:16px;flex-wrap:wrap;padding:10px;background:var(--pap);border:3px solid var(--ink);border-radius:12px} .m-cloud-gazer-swapping .m-cloud-gazer-swapbox{display:flex}
.m-cloud-gazer-swapping .m-cloud-gazer-form,.m-cloud-gazer-swapping .m-cloud-gazer-ctl{display:none} .m-cloud-gazer-dis{font-size:1.5rem;font-weight:900;padding:14px 34px;background:var(--cor);color:#fff;text-shadow:1px 1px 0 var(--ink);border:4px solid var(--ink);border-radius:16px;box-shadow:5px 5px 0 var(--ink)}
.m-cloud-gazer-agr{background:#d8d8dc;color:#6b6b73;border:2px solid #8b8f99;border-radius:10px;padding:4px 10px;font-weight:800;font-size:.8rem} .m-cloud-gazer-agr.m-cloud-gazer-big{font-size:1.2rem;padding:12px 26px;background:var(--mint);color:var(--ink);border:3px solid var(--ink);box-shadow:3px 3px 0 var(--ink)}
.m-cloud-gazer-sm{font-size:.7rem;padding:2px 8px;background:transparent;border:1px dashed var(--ink);border-radius:6px} @media (max-width:640px){.m-cloud-gazer-desk{grid-template-areas:'pic bub' 'clip clip' 'rt rt';grid-template-columns:auto minmax(0,1fr)}.m-cloud-gazer-clip{width:auto}} @media (max-width:480px){ .m-cloud-gazer-pip{width:44px;height:44px} .m-cloud-gazer-chip{flex:1 1 calc(50% - 6px);min-height:40px}
.m-cloud-gazer-pic{width:44px;height:44px;border-radius:50%} .m-cloud-gazer-face{display:none} .m-cloud-gazer-pic .m-cloud-gazer-badge{display:flex;font-size:1.7rem} .m-cloud-gazer-pic[data-mood=out] .m-cloud-gazer-badge{display:none} .m-cloud-gazer-bub{min-height:56px;font-size:.85rem;padding:6px 10px} .m-cloud-gazer-bub::before{top:14px} .m-cloud-gazer-rt{display:none}
.m-cloud-gazer-app.m-cloud-gazer-popopen .m-cloud-gazer-rt{display:flex} .m-cloud-gazer-nt2,.m-cloud-gazer-notice{display:none} .m-cloud-gazer-in{flex-basis:100%} .m-cloud-gazer-btn{min-height:40px} .m-cloud-gazer-certb p{font-size:.78rem} .m-cloud-gazer-certb{padding:10px 10px 8px} } @media (prefers-reduced-motion:reduce){.m-cloud-gazer-sti,.m-cloud-gazer-certc,.m-cloud-gazer-steam,.m-cloud-gazer-ucfall,.m-cloud-gazer-drop,.m-cloud-gazer-say,.m-cloud-gazer-sky.m-cloud-gazer-shake,.m-cloud-gazer-tag.m-cloud-gazer-inkrun::after{animation:none}.m-cloud-gazer-curtain{animation:none;opacity:0}.m-cloud-gazer-pic{transition:none}}
.pm-reduce-motion .m-cloud-gazer-sti,.pm-reduce-motion .m-cloud-gazer-certc,.pm-reduce-motion .m-cloud-gazer-steam,.pm-reduce-motion .m-cloud-gazer-ucfall,.pm-reduce-motion .m-cloud-gazer-drop,.pm-reduce-motion .m-cloud-gazer-say,.pm-reduce-motion .m-cloud-gazer-sky.m-cloud-gazer-shake,.pm-reduce-motion .m-cloud-gazer-tag.m-cloud-gazer-inkrun::after{animation:none} .pm-reduce-motion .m-cloud-gazer-curtain{animation:none;opacity:0} .pm-reduce-motion .m-cloud-gazer-pic{transition:none}
@media (min-width:641px) and (max-height:900px){.m-cloud-gazer-sky{aspect-ratio:16/8;max-height:min(400px,calc(100vh - 380px));min-height:240px}}
`, 'css-cloud-gazer');
  const ID = 'cloud-gazer';
  P.addAchievements([
    { id: 'cloud-gazer.first', name: 'The Inaugural Utterance of the Entire Sky', desc: 'Label your first cloud. Pruitt has already disagreed with it.', icon: '☁️', reward: 2 },
    { id: 'cloud-gazer.hedger', name: 'Chancellor of Maybe', desc: 'Hedge on 10 filings (2 pips or fewer). Pruitt marked every one up and said so.', icon: '🤷', reward: 5, check: function (s) { return (s['cloud-gazer.hedged'] || 0) >= 10; } },
    { id: 'cloud-gazer.bold', name: 'Duke of Unearned Confidence', desc: 'Be certain (5 pips) on 10 filings. The Board has noted the pips.', icon: '🗣️', reward: 5, check: function (s) { return (s['cloud-gazer.bold'] || 0) >= 10; } },
    { id: 'cloud-gazer.technical', name: 'Archduke of the Technically Correct', desc: "Label 10 clouds 'a cloud'. The Ledger now owns a shelf and a grudge.", icon: '📚', reward: 5, check: function (s) { return (s['cloud-gazer.technicallyCorrect'] || 0) >= 10; } },
    { id: 'cloud-gazer.squinter', name: 'Supreme Squinter of the Seventh Eyelid', desc: 'Squint for a combined 60 seconds. Your eyes are in a union now.', icon: '😑', reward: 5, check: function (s) { return (s['cloud-gazer.squintSeconds'] || 0) >= 60; } },
    { id: 'cloud-gazer.tilt90', name: 'Sovereign Tilt of the Northern Neck', desc: 'Tilt to 90 degrees and label a mountain that was a rabbit.', icon: '🏔️', reward: 5 }, { id: 'cloud-gazer.gerald', name: 'Weather, Slightly', desc: 'Label the potato cloud and be quoted by a vice president.', icon: '🥔', reward: 3 },
    { id: 'cloud-gazer.certified', name: 'Certified (Provisional)', desc: 'Receive the certificate. Valid until the next cloud.', icon: '📜', reward: 10 }, { id: 'cloud-gazer.swap', name: 'Disagreed With, Gracefully', desc: 'Finish the Chair Swap. He was thanked for being wrong.', icon: '🪑', reward: 5 },
    { id: 'cloud-gazer.inverted', name: 'Grand Marshal of the Upside Down Heavens', desc: 'Hold the sky at 180 degrees for 10 seconds. The floor has no comment.', icon: '🙃', secret: true, reward: 8 },
    { id: 'cloud-gazer.examiner', name: 'Lord Protector of the Resemblance That Dare Not Speak Its Name', desc: 'Label the cloud that resembles you as the Examiner. He took two moments.', icon: '🧐', secret: true, reward: 15 },
    { id: 'cloud-gazer.longlook', name: 'The Long Look', desc: "Idle for 3 minutes and receive the grade 'Present' (all clouds: A).", icon: '⏳', secret: true, reward: 12 },
    { id: 'cloud-gazer.rapid', name: 'Rapid Resemblance Syndrome', desc: 'File or click nine times in four seconds. The sky has called Security.', icon: '🔔', secret: true, reward: 4 },
    { id: 'cloud-gazer.sock', name: 'Nobody Saw That', desc: 'Click the Missing Sock. Unaccounted for, thoroughly witnessed, officially denied.', icon: '🧦', secret: true, reward: 8 },
    { id: 'cloud-gazer.moustache', name: 'Authentic (Disputed)', desc: 'Label the cloud with the moustache. The certificate remains unread.', icon: '🎩', secret: true, reward: 6 }, { id: 'cloud-gazer.seeme', name: 'Room 7 1/2', desc: "Finally write 'See me'. He came in a coat.", icon: '🧥', secret: true, reward: 5 },
    { id: 'cloud-gazer.halfway', name: 'Grand Registrar of the Intermediate Floors, Warden of the Half Step, Keeper of the Number Between', desc: "Label a cloud '7 1/2'. The door was behind the sky the whole time. Nobody has the key. The key is also 7 1/2.", icon: '🚪', secret: true, reward: 7.5 }
  ]);
  P.addLines('moduleEnter', [
    '{player}, Cloud Gazing is open. The clouds have already been looked at; please look at them again.',
    'The Examination Hall has a chair for you. It is warm. Nobody will say why.'
  ]);
  P.addLines('moduleExit', [
    'You have left the Cloud Examination Hall. Pruitt has disagreed with your departure, in writing.',
    'The sky will keep. It always does. It has nowhere else to be.'
  ]);
  P.addLines('tip', [
    'Tip: Pruitt rewards a hedge. Pruitt has never been told this about himself.',
    'Tip: The first relabel of a cloud is free. It is an oversight and it has been there for years.'
  ]);
  /* ---------- data ---------- */
  const POSES = {
    rabbit: [[-.65, .30, .45], [-.15, .35, .50], [.35, .30, .45], [.75, -.05, .33], [.68, -.50, .14], [.68, -.78, .12], [.88, -.55, .13], [-1.0, .20, .20], [-.30, -.05, .35]],
    ship: [[-.8, .35, .30], [-.4, .40, .35], [0, .42, .38], [.4, .40, .35], [.8, .30, .30], [-.05, -.05, .38], [0, -.5, .30], [0, -.85, .20], [.25, -.95, .12]],
    mitten: [[0, 0, .55], [0, -.5, .45], [0, -.88, .30], [-.45, .05, .40], [.45, .05, .40], [.8, 0, .25], [.98, -.22, .16], [-.2, .6, .32], [.2, .6, .32]],
    potato: [[-.7, .1, .38], [-.3, -.15, .45], [.2, -.2, .46], [.65, 0, .40], [.8, .35, .28], [.35, .4, .42], [-.15, .42, .42], [-.6, .4, .30], [.05, .1, .50]],
    loaf: [[-.8, .2, .30], [-.4, -.05, .38], [0, -.15, .40], [.4, -.05, .38], [.8, .2, .30], [-.4, .4, .33], [0, .45, .35], [.4, .4, .33], [0, .15, .40]],
    castle: [[-.8, .3, .30], [-.8, -.15, .25], [-.8, -.5, .20], [.8, .3, .30], [.8, -.15, .25], [.8, -.5, .20], [0, .35, .45], [0, -.1, .40], [0, -.55, .22]],
    whale: [[-.95, -.45, .22], [-.8, -.1, .30], [-.4, .15, .42], [.05, .2, .50], [.5, .15, .45], [.85, .25, .30], [.3, -.45, .14], [.3, -.7, .10], [.1, .5, .35]],
    teapot: [[0, .2, .55], [-.45, .25, .40], [.45, .25, .40], [0, -.35, .30], [0, -.65, .14], [.9, 0, .20], [1.1, -.25, .13], [-.95, .1, .20], [-1, -.2, .15]],
    blob: [[0, 0, .55], [-.5, .1, .40], [.5, .1, .40], [-.25, -.4, .38], [.3, -.4, .38], [-.3, .45, .35], [.3, .45, .35], [0, .15, .50], [0, -.1, .50]],
    sock: [[-.5, -1.0, .25], [-.5, -.7, .30], [-.5, -.3, .32], [-.5, .1, .36], [-.2, .5, .34], [.2, .55, .34], [.6, .5, .30], [.9, .45, .22], [-.75, .4, .25]],
    you: [[0, -.5, .38], [-.25, -.6, .22], [.25, -.6, .22], [0, -.1, .20], [-.55, .3, .40], [.55, .3, .40], [0, .35, .45], [-.95, .6, .30], [.95, .6, .30]]
  };
  const LPOSES = ['rabbit', 'ship', 'mitten', 'potato', 'loaf', 'castle', 'whale', 'teapot', 'blob'];
  const KW = {
    rabbit: { k: ['rabbit', 'bunny', 'hare'], a: ['mountain', 'hill', 'peak'] },
    ship: { k: ['ship', 'boat', 'sail', 'vessel'], a: ['wedge', 'ramp', 'pizza'] },
    mitten: { k: ['mitten', 'glove', 'hand'], a: ['hat', 'fin', 'wing'] },
    potato: { k: ['potato', 'spud', 'tater'], a: ['rock', 'pebble', 'boulder'] },
    loaf: { k: ['loaf', 'bread', 'toast'], a: ['bridge', 'bench', 'ledge'] },
    castle: { k: ['castle', 'tower', 'fort'], a: ['comb', 'fork', 'rake'] },
    whale: { k: ['whale', 'fish', 'dolphin'], a: ['wave', 'dragon'] },
    teapot: { k: ['teapot', 'kettle', 'pot'], a: ['elephant', 'trumpet'] },
    blob: { k: ['blob', 'amoeba', 'jelly'], a: ['pancake', 'puddle'] }
  };
  const GRADES = ['F', 'D-', 'D', 'D+', 'C-', 'C', 'C+', 'B-', 'B', 'B+', 'A-', 'A'];
  const BASE_IDX = { 5: 3, 4: 5, 3: 6, 2: 8, 1: 9 };
  const PIP_NAMES = ['1: Perhaps', '2: Maybe', '3: Probably', '4: Quite', '5: Absolutely'];
  const RANKS = ['Amateur Looker-Up', 'Junior Overcast Associate', 'Senior Nimbus Technician', 'Cirrus Compliance Lead', 'Deputy Examiner of Fluff', 'Principal Interpreter of the Visible'];
  const DEFAULT_CHIPS = ['Rabbit', 'Sock', 'Regret', 'Old Man Sandwich', 'Router', 'Tuesday'];
  const SWAP_LABELS = ['A rabbit.', 'A teapot.', 'A whale, I think.', 'A loaf. Possibly a loaf.', 'Rain.'];
  const SWAP_POSES = ['rabbit', 'teapot', 'whale', 'loaf', 'you'];
  const NOTICES = ['Notice: Rabbits are limited to two per hour.', "Notice: Cumulus is Latin. Please use 'fluff'.", "Notice: The Examiner's coffee is not a cloud.", 'Notice: Section 9 is closed for Section 9.', 'Notice: Wind is measured. It does not mind.'];
  const FONT = { S: ['###', '#..', '###', '..#', '###'], T: ['###', '.#.', '.#.', '.#.', '.#.'], O: ['###', '#.#', '#.#', '#.#', '###'], P: ['###', '#.#', '###', '#..', '#..'] };
  const STARS = [[.1, .15], [.3, .08], [.55, .2], [.78, .1], [.9, .3], [.2, .35]];
  /* in-between beats [seconds on the beat clock, line, 'M' = Management | 'Y' = only once a You-cloud has been seen | 'L' = only in loop mode] */
  const TIMED = [
    [24, 'Twenty-four seconds of looking up. That is twenty-four more than the average employee. The sky is flattered and will deny it.'],
    [38, "The Certainty dial runs from 'Perhaps' to 'Absolutely'. I am set to 'Perhaps'. I am also 'Perhaps' about that."],
    [50, 'I have a small speech prepared for the first time you are right. It is two words long. They are "Well, then."'],
    [82, 'The sky has not changed in a minute and a half. It has been consistent. I have no grade for consistent. It has never come up.'],
    [96, 'If you need a break, there is a chair. If you need a second chair, there is a form. The form is in the first chair.'],
    [118, 'In two minutes the clouds have drifted 0.8 miles, by my pencil. The pencil is not calibrated. The pencil is, however, sincere.'],
    [132, 'I would like it on record that I enjoy this. I would also like it off record. Please use whichever record you have.'],
    [165, 'Two minutes forty-five. I have eleven minutes until my break. I take it in this chair, with this face.'],
    [195, 'Fifteen seconds ago the lights went down. I have not forgotten. It is in the Register under Lights (Down).'],
    [232, 'Trainee Pell has asked whether any of the clouds are rabbits. I told him: one, and it is on a quota.'],
    [245, 'Just over four minutes. Four is a round number, and clouds are not. I find the contrast restful.'],
    [292, 'Management has requested a status. The status is "Clouds". It was accepted as a complete answer.', 'M'],
    [312, 'The cloud that resembles you has left by the right edge. It did not say goodbye. It waved once, which is the goodbye of a cloud.', 'Y'],
    [362, 'It is the sixth minute. By tradition we do not mention the sixth minute. I have mentioned it. I apologise. It is the sixth minute.'],
    [520, 'At nine minutes there is a certificate. I have signed it in advance. My signature is a very small cloud.'],
    [575, "That was a certificate. It has been filed under 'Provisional'. I am told it is the largest folder.", 'L'],
    [640, 'We are past the part of the programme I wrote down. Everything from here is improvisation. I am improvising. Please do not look.'],
    [700, 'Eleven and a half minutes. If you are still here, you are either very good at this or very lost. They carry the same grade.'],
    [760, 'The Hall closes when the clouds close. The clouds have never closed. It is the best policy nobody has written.']
  ];
  /* Every Pruitt line. %tokens% are filled by fill(); lines are drawn from shuffle bags (never the same twice in a row). */
  const L = {
    open: ['Welcome to the Cloud Examination Hall. Please sit. Please look up. Please resemble nothing in particular.', 'I am Examiner Pruitt. I have examined 41,006 clouds and agreed with none of them. Select one.', 'Name what it resembles, state how certain you are, and I will disagree, in writing, on the appropriate form.', "Exits are marked with affirmations. The nearest reads 'You Are Doing Fine'. It does not open."],
    nudge: ['That one is waiting. It has been waiting since before it was a cloud.', 'One cloud is pulsing. It does this for nobody else. It has not said why, and it has no mouth.', 'Nobody has selected a cloud yet. I am not worried. I have scheduled my worry for 3:00.', 'The pulsing one has been practising being picked. It has had a long time to practise. It is very good.'],
    mount: ['Cloud Gazing is a professional role, Valued Employee. The hours are whenever clouds are.', 'Valued Employee, Cloud Gazing has no targets. Management has set several, privately, in pencil.', 'Per my previous message: look up. Per this message: continue.'],
    ret: ['Welcome back. Recertification is in progress. It has been in progress since you left.', 'I kept your seat. It is the same seat. It has been leaning.', 'The sky has been looked at in your absence by a stranger. He had no opinions. It was unsettling.'],
    retEx: ['I have not forgotten what you called the cloud that day. I have forgotten what I called you. I would like it back.'], retInv: ['Welcome back. The sky is the right way up. It makes no promises about next time.'],
    firstStamp: ['The first stamp always lands on the wrong side of the paper. It is a tradition, and it has no other function.'],
    dissent: ['You are beginning to understand that confidence is punished. This is the policy. The policy is not a threat. It is a weather.', 'The Certainty dial is the real examination. The clouds are decoration. Please do not tell the clouds.', 'Everyone who is certain gets a D. Everyone who hedges gets a B. Nobody has ever compared notes. I like it that way.', 'I do not grade the cloud. I grade how sure you are about the cloud. The cloud is sure about nothing and has been a fine example.', 'Pass mark for resemblance is 7 1/2 percent. You passed. You failed the grade. These are separate forms.', 'Confidence is graded as a hazard. Hedging is graded as a hobby. I keep a drawer for each.', "The ideal gazer says 'possibly a rabbit' in the voice of someone apologising to the rabbit.", "The grade measures your certainty, not your accuracy. Accuracy was measured once. The instrument said 'hm'."],
    g5: ["'%label%.' Accepted. Confidence is not a qualification. The stamp has been told.", "'%label%!' You said it like a fact. Facts are the Board's department.", 'You were certain. That is the first mistake and the one I enjoy most.', "'%label%.' Five pips of certainty. I have lowered the grade to %grade% out of respect for the pips.", "A bold '%label%'. The Board has graded it %grade% and sent the boldness to Occupational Health.", 'Certainty at the maximum. The sky was not consulted. The stamp was, and it was brief.', "Five pips for '%label%'. The cloud has not been asked. %grade%.", "You have spent all five pips on one cloud. Pips are not refundable. %grade%.", "'%label%.' Said with such force that the pips are still warm. %grade%.", "You would stake your lunch on '%label%'. I have staked mine on the other side. %grade%."],
    g4: ["Four pips for '%label%'. The fifth is under your desk, in case. %grade%.", "I see '%label%', and I see you mean it, mostly. The stamp meant it less.", "'%label%.' Firm, but not firm enough to be admirable.", "'%label%.' Four pips: one short of foolish. Graded %grade%.", "Four pips for '%label%'. You left one pip free for the cloud's feelings. Considerate. %grade%.", "'%label%.' Quite sure. 'Quite' wants to be 'Absolutely' and has been asked to wait in the corridor. %grade%.", "A confident '%label%' with the back door left open. I respect the door. %grade%."],
    g3: ["Three pips for '%label%'. You have taken the middle chair in the waiting room. %grade%.", "You are halfway sure of '%label%'. So is the cloud, about itself.", 'The middle is where the paperwork lives. It is also where the stamp is kept.', "'%label%.' Three pips. You have taken no position and defended it well. %grade%.", "Probably '%label%'. 'Probably' is where reports go to retire. Graded %grade%.", "Dead centre on the dial. Even the dial looked surprised. '%label%', %grade%.", "'%label%,' at three pips, is a Tuesday of a label. %grade%."],
    g2: ["Two pips of '%label%'. A small, tidy doubt, folded in four. %grade%.", "'Maybe %label%' is a position. It is not a position I can defend, so it has been marked up.", 'You hedged. It was noted. It was marked up, as a kindness to the hedge.', "'Maybe %label%.' You have put a small cushion under the claim. Graded %grade%.", "Two pips of '%label%'. You said it the way people carry a spider out in a cup. %grade%.", "A tentative '%label%'. Marked up to %grade%, with 'brave' written in the margin in a font nobody can read.", "'%label%,' you ventured. 'Ventured' is a strong word for two pips. %grade%."],
    g1: ["'%label%.' Accepted. The hedging was brave. I disagree with all of it.", 'One pip. You barely said it. This is how I like my gazers: tentative, and wrong. %grade%.', "'%label%?' Graded %grade%. You hedged. The Board rewards hedging the way the weather rewards umbrellas.", 'A whisper of a label. %grade%. I have lowered my disagreement to a murmur.', "'%label%?' at one pip. You asked the sky; you did not tell it. Graded %grade%, as a courtesy.", "One pip of '%label%'. Any quieter and I would need a form for the silence. %grade%.", "You whispered '%label%' at a cloud. It did not hear. Neither did I. %grade%, on trust.", "'%label%' is not a claim. It is a shrug with a spelling. %grade%."],
    follow: ["'%label%' has been entered in the Register of Things Clouds Look Like, under 'Disputed'. The clouds were not told.", 'Entered as Exhibit 4. There is no Exhibit 3. There never was.', "A resemblance to '%label%' has been logged under Footwear (Hypothetical), Drawer 7 1/2.", "I have taken '%label%' home for the weekend. I will return it on Monday, slightly worse.", "The cloud has been informed of '%label%'. It continues to be the sky.", "'%label%' has been filed in Drawer 7 1/2, between 'Hypothetical Footwear' and 'Nothing Yet'.", "'%label%' was read aloud to the cloud. The cloud gave no notes, which is its notes.", "I have written '%label%' on a sticky note. The note has been stuck to the other note.", "A copy of '%label%' has gone to Sandra. A copy of the copy has gone to the shredder, for balance.", "'%label%' will be reviewed at the next review. The next review is the one you are in."],
    resHigh: ['Resemblance: %R%%. Remarkable. It is almost as if you looked. Graded %grade%, for looking.', 'Resemblance: %R%%. You looked, and the cloud looked back with something like a shape. Graded %grade%, for the shape.', 'Resemblance: %R%%. That is high. I have asked the cloud to be less like that. Graded %grade%.'],
    resMid: ['Resemblance: %R%%. Pass mark 7 1/2. You have passed. Please do not feel anything about it.', 'Resemblance: %R%%. The sort of number that is framed and then quietly taken down.', 'Resemblance: %R%%. A cloud and a thing, linked by hope. The Board does not fund hope. It funds the form.'],
    anti: ['Resemblance: %R%%. Grade: A. I have no further comment, which is the comment.', 'Resemblance: %R%%. Grade: A. I am told it was not on purpose. It was not on purpose. Please do not do it on purpose.'],
    aminus: ['The stamp read A-minus for 0.4 seconds. Ink issue. B-plus. I once saw an A-minus. It was a different cloud.'], pending: ['Grade: Pending. It is the grade I am proudest of.', 'Grade: Pending. I will have it for you shortly. Shortly is a place. I have never been.'],
    moist: ["'Moist.' Sandra has issued a grade of her own. It is 'Moist'. I did not authorise this and I cannot unsee it."], empty: ['An empty label. Graded Pending, for courage. I have framed it. The frame is also empty.'],
    repeat: ["'%label%' again. I notice that you believe in it. Graded %grade%, differently.", "'%label%' again. The cloud has not changed. You have not changed. The grade has, and I take no credit."], chip: ["'%label%', from the chips. Reuse is tracked. Reuse is mocked. Reuse is mine."], long: ['That is a very specific label. Clouds do not respect specificity. I admire you, privately.'],
    digit: ['A label with a number in it. Cloud 7 1/2 does not exist. Accepted anyway, regrettably.'], caps: ['All capitals. The cloud has been shouted at. It is now slightly damp.'], squinted: ['You squinted. Squinting is leading the witness. The witness is a cloud.'], fast: ['I will need you to slow down. The clouds can see you writing.', 'You are writing faster than the clouds are changing. That is not a skill. It is a hazard.'],
    stampSub: ['Initial here. Not there. Here.', 'Filed. Not read.', 'Stamped in good ink, bad faith.', 'Void where prohibited. Prohibited everywhere.', 'Witnessed by nobody, in triplicate.', 'Approved by the part of me that disagrees.'],
    tc1: ['A cloud, you say. Technically correct, the lowest form of correct. It has been placed in the Ledger.'], tc2: ["'Cloud.' Correct. Unacceptable. Filed under Things That Cannot Be Argued With, which is the room I argue in."], tc3: ['Cloud. Again. The Ledger has taken a second book. The shelf is concerned about its load rating.'],
    tcMore: ["Another 'cloud'. The Ledger has taken a book it does not intend to read.", "'Cloud.' Number %n%. The shelf has begun to lean toward you, like a plant.", "Cloud, again. The Ledger is full of true things nobody asked for. It is the happiest I have seen a ledger.", "'Cloud.' Number %n%. I want to say you are being difficult. You are being accurate. I will look into the difference.", "Correct. Correct. Correct. I am being outnumbered by correct."],
    tc10: ["That is the 10th time you have said 'cloud'. The Ledger now has its own shelf. The shelf has a name tag."], tc25: ['Sandra from Compliance has audited the Ledger. It contains 25 clouds. Sandra is satisfied and does not know why.'], tc50: ['The Ledger has been awarded the grade you never got: an A. It has been stamped. The Ledger is thrilled.'],
    dog3: ["'Dog.' Third time this session. The dog is tired. Please give the dog the afternoon off."], dog4: ['The dog has filed for leave. It was approved. He is still here, out of loyalty.'],
    rain: ["'Rain.' The cloud has been asked to rain on request. It has declined. It has a form for that."], storm: ["'Storm.' We forecast weather. We do not commission it. Please return the lightning to Facilities."], umbrella: ['I have opened an umbrella indoors. Please strike that.'], sky: ["'Sky.' I would like to sit down. I am sitting down. I would like to sit down further."],
    mgmtP: ['Management has been labelled a very large clipboard. Management has asked not to be shown the cloud.'], mgmtS: ['Management has noted the clipboard. Management would like it known the clipboard has never once been wrong.'], geraldWho: ['Who? Gerald has not been introduced to the sky. Please book a meeting.'],
    rabbit: ['Rabbit issued: %n% of 2 this hour. The hour is measured by the Hall clock, which is a cloud.'], quota: ["Quota reached. By policy that cloud is a 'disappointed hare'. I will not say why. It knows."], sandraRab: ['Sandra from Compliance has limited rabbits to two per hour. This is not a rule about rabbits. It is a rule about the number two.'],
    rabDim: ['A rabbit-shaped cloud has passed unlabelled. I have put out the lights in protest.'], rabBack: ['The lights have been restored. The rabbit has not been informed. It was never going to be.'],
    react: [[/\bsock/, 'sockR'], [/regret/, 'regretR'], [/sandwich/, 'sandwichR'], [/router/, 'routerR'], [/tuesday/, 'tuesdayR'], [/sandra/, 'sandraR'], [/dennis|\bplant\b|\bleaf\b/, 'plantR'], [/toast/, 'toastR'], [/\bcat\b|kitten/, 'catR'], [/dragon/, 'dragonR'], [/\bheart|\blove\b/, 'heartR'], [/\bface\b|\bperson\b|\bman\b/, 'faceR'], [/duck|bird|goose/, 'duckR'], [/unicorn|ghost/, 'ghostR']],
    dragonR: ["'Dragon.' Dragons are filed under Pending, Fire, and Sandra's Open Items. She is aware you did this."], heartR: ["'Heart.' A cloud shaped like a feeling. The Board does not cover feelings. It does cover the form for feelings."], faceR: ["'Face.' You have seen a face in the weather. This is called pareidolia, and in this building it is called Thursday."], duckR: ["'Duck.' Ornithology has been notified and will arrive in its own time, with a smaller duck."], ghostR: ["'%label%.' A cloud with a past. I will need it in writing, and it will need to be written in cloud."],
    rightOnce: ['I had a speech prepared for the first time you were right. I had thought it would be later. It is two words long.'], well: ['Well, then.'], wellAfter: ['That was the speech. I had hoped for more room in it.'],
    pself: ['I have graded myself. D. I was certain. The system works and I resent it.'], pselfM: ['Management would like to say the Examiner is doing great. Management has said it in a voice that did not agree.'], swapFirstSelf: ["'A rabbit,' says the former Examiner. It is the rabbit he graded himself a D for. He is still certain. He thanks you for disagreeing with it."],
    stopP: ['The word now reads "STP". I have no policy on "STP". I am writing one. It is two pages and both say STOP.'], stopTop: ['The word is now "TOP". This is a promotion. Congratulations to the word.'], stopOp: ['The word is now "OP". I am told it is a prefix. It has not been told what it is a prefix of.'], stopAll: ['You have popped all forty. I counted twice. There were forty-one. I will not be discussing the forty-first.'], stopClear: ['The sky is empty. Please admire the sky. It has been waiting to be admired for forty clouds.'],
    sockR: ["'Sock.' A sock is missing, somewhere. It is not this one. This one is a label and has never been anywhere, which is its charm."], regretR: ["'Regret.' Accepted. A cloud resembles regret when it has been looked at too long. That is on both of us."], sandwichR: ["'Old Man Sandwich.' I have heard of him. A regular. Mild, a little damp. Please send him my regards and a plate."],
    routerR: ["'Router.' Not a rabbit, not a ship. It blinks in a corner and everyone depends on it. We are not so different, it and I."], tuesdayR: ["'Tuesday.' I will not read that label aloud. I have read it silently. It was loud."], sandraR: ["You have labelled a cloud 'Sandra'. Sandra was informed in advance. Her grade for you is already in the drawer."],
    plantR: ["Dennis (Plant) will be told. He will not respond. That is how you know it landed."], toastR: ['Toast. The Toaster would like to be informed. The Toaster is always informed. It simply does not say.'], catR: ["'Cat.' The cloud has accepted the cat. The cat has accepted nothing. This is how cats and weather are alike."],
    toasterCb: ["The Toaster has been informed. It says 'toast'. It is the first time anyone has agreed with it. It is overcome."],
    inkrun: ["Label '%label%' has run. Ink and cumulus do not bond. Please relabel at the counter, which is a drawer.", 'The cloud has changed its mind about being a %pose%. You have not. This is called stubbornness and it is on my list.', "Revocation Notice 14/R: your '%label%' has become something else. Please surrender the '%label%'.", 'Policy states the cloud is entitled to change. The policy does not say who stands next to it when it does.', "'%label%' has run, which is more than the Board has done in years. Please relabel at the drawer.", "The ink on '%label%' has gone the way of all ink near weather."],
    apology: ['The cloud has not apologized. It is looking at the middle distance, which for a cloud is everywhere.', 'The cloud has not apologized. A form exists. It is Form 31-A. The cloud has not read it.', 'Still no apology from the cloud. I have left a pen on the horizon, in case.', 'The cloud has been given Form 31-A and a pen. It has taken the pen.'],
    fee: ['Relabel fee: 0.1 Meh, payable to Sandra, who has not asked for it and will not mention it.'], free: ['The first relabel is free. It is the only free thing in the building. It was an oversight.'], unreliable: ["The sky is unreliable. This is not the sky's fault. It is policy. It is also the sky's fault. Both are on file."],
    relabel: ['Relabelled. Continuity restored. The cloud will outlive it by about forty seconds.'], third: ['You have relabelled this cloud three times. It is now legally a different cloud, with the same lawyer.'], firstMorph: ['A cloud has changed shape unprompted. I have not seen anyone do that without a form.'], sqUnlock: ['Squint Allowance is now in effect: six seconds. Hold Space. I have timed six seconds personally.'],
    sqAllow: ['Squinting is permitted for up to six seconds. After six seconds it is just a face you are making.'], sq7: ['You have squinted for 7 seconds. Your eyes have filed a grievance against the rest of you.'], floaters: ["Those are floaters. Floaters belong to Optometry. We do not label other departments' work."], floaterClick: ["That is a floater. It is not our department. It is not anyone's department. It has been drifting since 1987."],
    sqRel: ['You released the squint. The cloud resumed being weather. It seems relieved.', 'Squint released. Your eyelids have been returned, slightly warm, to their owner.', 'Eyes open. The sky is the same size. It was never in on it.', 'Squint over. For a moment you saw the cloud think. Then you let it stop. Thank you.'], sq60: ['Combined squint time: 60 seconds. Your eyes now have a union. The union has a representative. It is also your eyes.'],
    sqE1: ['Squinting is not yet permitted. It is scheduled. Please look at the schedule with both eyes.'], sqE2: ['Squinting has been requested twice. It is in the queue. The queue is a squint.'], sqE3: ['Fine. Squint Allowance granted early. This will be noted in a note.'],
    tiUnlock: ['Head Tilt is now authorised. Q and E. Fifteen degrees each. I have measured the degrees personally.'], tiAllow: ['Tilting your head is allowed. Tilting it in a way that makes me tilt mine is Section 9, and I am not discussing Section 9.'], ti90: ['At 90 degrees the rabbit is a mountain. At 91 degrees it is a rabbit that has given up.'], tiSol: ['I tilted my head in solidarity. I have retracted it. Please strike it from the record. It is a record of my neck.'],
    tiMtn: ['A mountain. It was a rabbit. It is a mountain now because you are sideways. Both of you are correct, which I resent.'], tiDeg: ['You are at %deg% degrees. I can still read you. I am sideways too, politely.', 'You are at %deg% degrees. The clouds have not moved. They are watching you do it.'], tiE1: ['Head Tilt is Section 9. Not yet. Please hold your head at the angle it came in.'], tiE3: ['Fine. Head Tilt granted early. I am noting your neck.'],
    inv0: ['Upside down, the sky is the floor. The Examiner would like to not discuss the floor.'], inv10: ['The clouds are now lawns, on the ceiling. The sun hangs below like a low lamp. I am the Lower Examiner. I will not be discussing it.'], inv1: ['Right way up. The floor has resumed being the floor. It asked me to say nothing, and I am saying it.'],
    you1: ['That cloud resembles you. I want to be clear that it is not you. It is, however, your posture.'], youPanic: ['Please do not make eye contact with the weather. It makes the weather self-conscious and it rains.'], youGraded: ['The cloud resembling you has been graded. B. You did not ask. You will be told when you ask.'],
    wave1: ['I have been asked to inform you that the cloud is waving. It has not been authorized to wave.'], wave2: ['The cloud has waved again. I have not waved. I would like that noted.'], youMoment: ['It resembles %player%. I have taken a moment. I would like another. I will not be needing the second.'],
    youLabel: ["'%label%'. Accepted. Graded B. It would have been B whatever you wrote. I checked. I wrote it first."], pellLeaves: ['Trainee Pell has left the room. He said he needed some air. There is only air.', 'Mr. Pell is welcome to return. It would require him to have left.'],
    ex1: ['You said the cloud resembles me. I have taken a moment. It does. I have taken another moment.'], ex2: ["Label rejected: 'Examiner'. Label accepted: 'Examiner (Disputed)'. Grade: A, Pending, indefinitely."], ex3: ['It does.'], ex4: ['Every cloud in the sky has briefly adopted my silhouette. I did not authorise it. I did not stop it.'],
    half1: ["Room 7 1/2. You have named the room. It has a door. The door has been behind the sky this whole time."], half2: ['I have waited eleven years for someone to say it. There is no form. I made one. It is blank. It is yours.'], half3: ['Management has located the 7 1/2th floor. It is lovely. There is no exit sign, only a quiet and sincere You Are Doing Fine.'],
    sandra: ["Sandra from Compliance has flagged 'cumulus' as too confident and also Latin. Please use 'fluff'.", 'Sandra has ruled that clouds may resemble anything except Sandra. This is not a rule. It is a request.', "Sandra has flagged 'obviously'. It was not in your label. She flagged it anyway, in advance.", "Sandra has flagged 'blue'. The sky has been asked to rotate it out, with thanks.", 'Sandra has asked that clouds be described in the passive voice. Clouds have been seen to. It is in progress.', "Sandra has issued a memo about memos. It is two memos long and both say 'see attached'."],
    sandraTos: ['Sandra from Compliance has cited a clause. She does that. She reads it the way the sea reads a shell.', 'Sandra from Compliance has produced a clause. It is from the Terms of Service. She has been carrying it since the lobby.'],
    sandraNot: ['Sandra from Compliance countersigns the notary cloud. She does so from a distance, and by implication.'],
    notaryNew: ['New policy: every 5th label must be countersigned by the notary cloud, leftmost. It does not speak. It never has.'], notaryOk: ['Countersignature received. The notary cloud said nothing in a firm and legally binding way.'], notaryNo: ['The countersignature window has closed. Sandra waived it. She waived it the way a flag waves, without being asked.'],
    form27: ['Per Form 27B/6 (Cloud Resemblance Addendum), you must state your Certainty in good faith. I will then take the other side.'], wind: ["Wind is now being measured. Wind is 11 miles per hour in the direction of 'away'."], windU: ["Wind update: 11 miles per hour, 'away'. It has not changed. It is thorough."], promo: ['Congratulations. You have been promoted from Cloud Gazer (Trainee) to Cloud Gazer (Trainee, Senior).'],
    dbook: ["I have double-booked your 'See me' notes. Please attend both. They are at once."], backward: ['A cloud has drifted backward for 8 seconds. I take it personally. It had been going so well.'], sunbeam: ['An Official Sunbeam has been issued. Please do not look directly at the paperwork.'], returned: ['A cloud has returned with your label. It is not the same cloud. It insists it is.'],
    archive: ['The Archive of Cloud Retirement has received another cloud. It is the next cloud.', 'Cloud %n% has been Retired to the Archive of Cloud Retirement, which is the next cloud.', 'A cloud has left by the right edge of the Hall. It will be missed by those who were not looking.'],
    gerald: ["A cloud shaped like a potato. Gerald, VP of Spuds, notes: 'Cloud is potato that has given up on ground.' Not endorsed."], geraldSay: ['A cloud is a potato that has given up on the ground. I respect the decision. I have not made it myself.', 'I have always been a little bit weather.'],
    geraldMet: ['Vice President of Spuds. I did not realise he was precipitation.', 'Gerald. A pleasure. Please do not look at my grades. They are not there. They are pending.'], geraldLobby: ["Gerald has submitted a label from the lobby: 'Me.' Graded A. I have never been more afraid."],
    sock: ['A cloud shaped like a sock has crossed the sky. It did not stop. It had somewhere to be.', 'The sock-cloud is not eligible for labelling. It is on a journey. Please look away respectfully.'], sockNo: ['Nobody saw that.'], sockYes: ["That is not a label. That is an observation. It has been filed under 'Nobody Saw That'."], sockMgmt: ['The Missing Sock has been sighted. Unaccounted for. Presumed on a journey. The journey has been updated.'],
    sockElse: ['I am told a sock was seen elsewhere in the building. A sock should cross a sky, not a hallway. I have opened the window.'], toasterNote: ["The Toaster has sent a note. It says 'toast'. It is the first note I have received that I understood completely, and it hurt."], staplerNote: ['The Stapler asks whether clouds are unionised. They are in a loose formation, which is how unions start. I have not replied.'],
    dennisIn: ["A cloud has arrived already labelled 'Leaf'. Graded A. Dennis (Plant) filed it, and Dennis has never been wrong, because he does not say.", "This cloud was labelled before it arrived. The pen was a plant's, in the sense that there was no pen."], dennisClick: ['You have selected the cloud that Dennis labelled. He did not feel it. He is a plant.', "Relabelling Dennis's cloud is permitted. It is also noticed, in a leafy, cumulative way."], dennisOver: ['You have overruled Dennis (Plant). The record shows he did not object. He is a plant. The record shows that too.'],
    dennis: ['Dennis (Plant) has been consulted regarding clouds. Dennis (Plant) said nothing and grew.', "A plant has labelled every cloud 'Leaf'. I am told this is the correct order of things."],
    cask: [['i would like a second examiner', 'A cloud has requested a second examiner. I am the second examiner. I have declined to be the first.'], ['please do not look at my left side', 'The cloud asks me not to look at its left side. I have not been looking. I have been looking near it, with professional care.'], ['i was a different shape at 3', 'The cloud says it was a different shape at 3:00. I have no record of 3:00. I have a record of 3:01, which was the same.'], ['i am not a rabbit i am standing like one', 'The cloud insists it is not a rabbit, only standing like one. Sandra has ruled that this is how rabbits start.'], ['could someone ask the sun to lower its voice', 'The cloud has asked that the sun lower its voice. The sun is not speaking. That is the problem, apparently.'], ['is anyone going to read this tag', 'The cloud asks whether anyone reads the tags. I read them. I read them twice. I then disagree with them. It is love, in the Board sense.']],
    moust: ['This cloud is wearing a moustache. I have a certificate of authenticity for it. I will not read the certificate. Disputed.'], moustAfter: ['The certificate has been returned to its drawer. The drawer is breathing.'], wrongBub: ['actually i am a cloud', 'for the record i am the sky, locally', 'i prefer cloud. it is less committed'], wrongP: ['I would like to say that was correct. I will say it once. It is said.'],
    sunClick: ['The sun is not eligible. It is on the other side of paperwork.', 'The sun has been clicked. It is very bright, very far, and not a cloud. Three strikes, none of them yours.', 'You have clicked the sun. It is 93 million miles away and it felt that.'], birds: ['Birds. Not ours. Ornithology has been notified and is sending a smaller bird to look.'],
    sunMany: [[5, 'The sun has been clicked five times. It would like to be left alone. It is the sun. It has been left alone a long time and is good at it.'], [12, 'Twelve clicks. The sun has filed a complaint. The complaint is that it is bright. It is aware.'], [25, 'Twenty-five. The sun has asked Management for a day off. Management said: tomorrow. The sun said: that is when I am on.'], [50, 'Fifty clicks on the sun. It has gone quiet, like a person being very patient on purpose.']],
    pokeMany: [[3, 'You have touched the Examiner three times. He noted the first and forgave the rest.'], [7, 'Seven. The Examiner is now technically poked, which is a status on a form. It does not come off.'], [15, 'Fifteen. The Examiner has begun to enjoy it and is concerned about that.'], [30, 'Thirty. We are no longer discussing the clouds. We are discussing this. I am willing.']],
    rank: ['Rank achieved: %rank%. Benefits include a lanyard and the sensation of being looked down on from above.', 'Rank achieved: %rank%. Your jurisdiction is fluff. It has always been fluff.', 'Rank achieved: %rank%. This confers nothing. It confers it ceremonially, with a trumpet blip.', 'Rank achieved: %rank%. You may now disagree with me. I will not hear it. It is a privilege.'],
    rankTop: ["Rank achieved: Principal Interpreter of the Visible. The next rank is 'Amateur Looker-Up (Seasoned)'. Thank you for your service."], regRead: ["At %time% you said '%label%'. It was not %label%. It was never %label%.", 'The Register holds %n% of your former opinions. They are in a drawer. The drawer is not on your side, but it is not against you.'],
    regFirst: ["Your first opinion in this Hall was '%label%'. I have kept it. I am not sure why. It is not a good opinion."], regFull: ['The Register is full. The oldest opinion has been let go, with severance of 0 Meh and a sincere nod.'],
    pell0: ['Trainee Pell: Maybe a B? I could be wrong. I am usually wrong. It is why I was hired.', 'Trainee Pell: Perhaps B-minus? If that is allowed? I will check if it is allowed.', 'Trainee Pell: Maybe a C? I have never been asked to be wrong in public. I am practising.', 'Trainee Pell: Perhaps an A? Sorry. No. A B. Sorry.'],
    pell1: ['Trainee Pell: Probably a B. I have a feeling. I have had it for almost a minute.', 'Trainee Pell: Respectfully, a C-plus. I am not sure. I am a little sure.', 'Trainee Pell: A B-plus, I think. The Examiner says think is not a grade. I think he is right. A B-plus.', 'Trainee Pell: Probably an A-minus. Please do not tell him. Please tell him. Please do not.'],
    pell2: ['Trainee Pell: A B. Definitely. I checked twice, and the second time I agreed.', 'Trainee Pell: I am overturning that. Please do not tell me I cannot.', 'Trainee Pell: A B. Definitively. I underlined it twice, and the second line said the opposite.', 'Trainee Pell: I am certain it is a B. I would like it noted that certain is how you get a D.'],
    pellRet: ["Examiner Pruitt has called Trainee Pell 'a first draft of a colleague'. Trainee Pell has requested the second.", 'Trainee Pell is not a policy. Trainee Pell is a lanyard with a person in it.', 'Trainee Pell dreams of giving an A-minus. I have a form for dreams. It is in the drawer with the A-minus.'], pellP1: ["Trainee Pell has been promoted from 'maybe' to 'probably'. He is not ready."], pellP2: ["Trainee Pell has been promoted from 'probably' to 'definitely'. He is less ready."],
    ambient: ['I have examined 41,006 clouds. This one makes 41,007. I will not be keeping count. I am.', 'The sky is large. Management would like to confirm that this is within policy.', 'The Examiner is not angry. The Examiner is calibrated.', 'Tuesday is at 4:17 PM today. I will not say more. I will be indoors.', 'A cloud has the shape of an opinion. I did not say whose.', 'The coffee has been cold since 2:15 PM. I do not mind. It is a quiet cold.', 'I have been looking up for a very long time. It is, I am told, the job.',
      'I am told the sky is one hundred percent visible today. I have asked for a second opinion. It was also the sky.', 'There is a draught in the Hall. It is the same draught as yesterday. It has acquired a name tag. The tag says Wind.', 'My pencil is the same length it was this morning. I am pleased. I am not telling the pencil.', 'Somewhere a cloud is being called a rabbit by someone who is certain. I have a form ready for them.', 'The Hall is 40 percent sky and 60 percent paperwork. Both drift. Only one of them is mine.', 'The clouds are in no hurry. I admire this from a chair.', 'I once wrote a very good label. I do not remember it. That is how I know it was good.', 'I have taken my glasses off to see the sky properly. It is a blur. It agrees with my grades.'],
    cbClicks: ['You have clicked %n% times in this building. The clouds received some of them. I asked which and they were not helpful.', 'The building has recorded %n% clicks from you. It has not read them. It has been keeping them warm.'], cbTime: ['You have spent %n% minutes in this building, in total. I have rounded it to a while, for the file.', 'Your time in this building comes to %n% minutes. The building considers this an acquaintance.'], cbSession: ['This is your session number %n%. I have kept one chair for each. They are all this chair.'],
    idle30: ['You have gone quiet. That is allowed. I am only noting that it has a length.', 'It has been 30 seconds. I have been counting, in the way one counts when nobody asked.', 'Please continue at your leisure. I have brought a second leisure, in case.'],
    idle60: ['You have not moved in 60 seconds. I have labelled the silence. It resembles a Tuesday.', 'Still here? So am I. Neither of us is doing the clouds any good.', 'A full minute. The clouds have begun to wonder whether they are being examined or merely kept.', 'Your stillness has been graded. Zero pips, no claim, complete hedge. B-plus. It is the best work you have submitted.'],
    idle60b: ['The clouds have slowed to a fifth of their speed. They are being polite.', 'The clouds have slowed down so as not to pass you at a bad moment.', 'A few clouds have stopped to see what you are doing. They are in each other\'s way and apologising in cumulus.'],
    idle90: ['Ninety seconds. I have run out of things to say about clouds and begun on the carpet.', 'I have said everything I know. This is the second time. It sounded different, by being quieter.', 'Ninety seconds. A tiny cloud is spelling something at me from the desk. It is spelling nothing. It is trying.'],
    idle120: ['The silence has been entered in the Register. Its grade is Pending.', 'Two minutes. The silence has now been in the Register longer than the average label. It is outperforming you, respectfully.', 'Two minutes. I have filed your absence under Present, because the chair is warm.'],
    idle150: ['In thirty seconds I am going to step out. I have never done this. I have asked the carpet to cover.', 'I may leave soon. If I do, everything is an A. That is the arrangement. Nobody has ever complained about it.'],
    idle180: ["The Examiner has stepped out for 'a moment' (4 minutes). In the interim all clouds are graded A. They know.", 'EXAMINER OUT. All clouds have been graded A, in the manner of a teacher who has gone to the shop.', 'The Examiner has stepped out. Please do not touch the grades. They are all A and they are nervous about it.'],
    idle180m: ["Valued Employee, you are being resembled in the Examiner's chair. This is not forbidden. It is simply not done.", 'Management would like to note that nobody is looking at the clouds right now except the clouds.', 'While the Examiner is out, Management has taken the liberty of enjoying the sky. It is a 6.'],
    away240: ['The Examiner is out. A cloud has picked up his pen. It is not writing. It is holding it for him.', 'The coffee has been left. It is neither hot nor cold. It is waiting, which is a temperature.', 'Trainee Pell has come in, looked at the empty chair, and sat in the next one along, to keep the first one warm.'],
    away300: ['Five minutes. A sign has been added beneath the first sign: BACK SOON (RELATIVE).', 'Five minutes. The clouds have formed a very small queue at the empty chair. They are not sure what they are queueing for.'],
    away420: ['Seven minutes. Someone has put a cardigan on the chair so that it looks like an Examiner from behind. It is a very good fit.', 'Seven minutes. Somewhere a form is waiting for him. The form has begun to look out of the window, too.'],
    away600: ['Ten minutes. Nobody has moved. The Hall is the most still it has ever been. The sky is, for once, being looked at by no one, and doing fine.', 'Ten minutes. Pruitt will return the moment you touch anything. He is not out. He is standing very still behind the door, hoping.'], away600m: ['Management is proud of the long look. Management has nothing to add. Management is a bit moved. Management has a cold.'],
    idleBack: ['I was never gone. I was examining the carpet.'], idleBackLong: ['I was gone %n% minutes. I was never gone. I was in a long examination of the carpet. The carpet has passed.', 'You were away %n% minutes. I have recorded it as a single, very large look. It is the best look on file.'],
    touch: ['Between us: I have never been right. It is the only reason I keep coming back.', "I used to label clouds myself. Everything I said was 'rain'. They stopped letting me near them.", "I think when I said 'rain' I meant 'come inside'. It is a long way to say a short thing.", 'The Unlabelled Cloud is back. There is no cloud there. It is following you and I am not going to say so.', "I was right once, in 1997, about a cloud I called 'weather'. Nobody checked. I have been afraid to check since."], ucClick: ['There is no cloud there.', 'I am looking at it. I see nothing. I see it very carefully.', 'Please stop labelling the Unlabelled Cloud. It has no label. That is its label.'], ucFall: ['The tag has fallen off. Tags do that around nothing.', 'The tag has dropped. It landed with the sound of someone who was not there.'],
    sun0: ['The sun has come out. Nobody is going to label it. That is the rule and it is a kind one.'], sun1: ['Thank you for not labelling it. It has had a long day, being the sun.'], sunset: ['The sun has set. It rolled its eyes on the way down. I did not see that.'], night: ["It is night. The stars are 'dots' by default. I did not choose it. I would have chosen worse."], star: ['Dots. They are dots. They are doing their best.', 'That one is a dot. It has been a dot for eleven billion years. It would like some recognition for the consistency.', 'You have clicked a star. It is a large, distant dot. It does not know you, which is the closest anyone gets.'],
    ucDesk: ['There is a very small cloud next to my coffee. It resembles me. I would prefer not to be resembled. I will allow it.'],
    spamWarn: ['Six clicks in four seconds. At nine I am required to ring the bell. I have my hand near the bell. The bell has opinions.', 'Please slow down. The clouds can feel you coming and they have begun to stand like people in a lift.', 'That is a rate. I have a form for rates. It has a line for the date and a line for the rate and a line for how you feel.'], spam8: ['Eight. The bell and I have exchanged a look.'],
    spam0: ['Rapid Labelling Surcharge: 0.2 Meh. Receipt attached. The receipt is also a cloud.', 'The bell has been rung. It is a small bell, rung with great institutional feeling. Surcharge: 0.2 Meh.', 'Nine in four seconds. That is not looking up. That is typing at the sky. Surcharge: 0.2 Meh.'], spam0b: ['You again. The bell has been rung before and has begun to expect it.', 'A second Rapid Labelling Surcharge: 0.2 Meh. The first was a warning. This is also a warning, from further away.'],
    spamTired: ['Pruitt sighs. It is the sigh of a man who has already rung the bell.', 'I will not ring the bell twice. I will sigh twice. It is cheaper.', 'The bell is still ringing from before. You are clicking over it. It is a duet.', 'Please. I rang the bell. We have been through this. I have a cough drop and a great deal of patience, and one of those is a cough drop.'],
    spam1: ['Nine labels in four seconds. I have called Security. Security is a smaller Examiner.', 'Security has arrived. It is me, in a hat. The hat is a colander. It is official.'], spam2: ['Please stop. The sky is not a form. I have checked. It has no boxes.', 'I will need the clicking back. All of it. In an envelope.'],
    spam3: ["Forty micro-clouds. Each is a perfect circle. This is the cloud's way of asking you to stop.", 'The micro-clouds are perfect circles. Nothing in nature is a perfect circle. They are not from nature. They are from you.'],
    spam4: ['They are merging. They are forming a word. I do not like the word.'], spam5: ['STOP. Capital letters. Eight feet tall. I have gotten out a ruler.'], spam6: ['I have measured the word. It is nine units of STOP. I will be filing it.'], spam7: ['The sky has returned to ordinary. Please understand that I was not frightened. I was thorough.'],
    spam7b: ['The sky is ordinary again. I have put the micro-clouds in a drawer. They are quiet. They are not in the Register, but they are in the room.'], microSay: ['a cloud', 'cloud', 'a small cloud', 'technically a cloud', 'also a cloud', 'ow', 'still a cloud', 'a very small cloud, i think'],
    microPop10: ['Ten micro-clouds popped. Their families have been informed. They do not have families. They have each other.'], microPop30: ['Thirty popped. Management would like to point out the clouds were already tired.'],
    rs0: ['The weather has been reflowed. Please re-inspect your clouds for squishing.', 'The window has changed. The sky has taken it personally and then professionally.', 'The clouds have been rearranged by the edge of the window. They are the same clouds, an inch shorter each.', 'Resized. The sky has no objection. It has no standing.'], rs1: ['The sky has been made smaller. Nobody asked it.', 'The sky now fits in a smaller place. It has gone quiet in a polite, folded way.'],
    rs2: ['The sky has been stretched. It boinged. That is the correct response.', 'The sky has been widened. It now has room for a second opinion and nobody to give it.'], rs3: ['The window is a modest vintage, with notes of scrollbar and regret. Drink now.', 'Ten resizes. You are not looking at the sky. You are looking at its size. That is a different profession with a different certificate.'],
    cert0: ['You are hereby Certified: Professional Cloud Gazer (Provisional). Recertification begins immediately.'], cert1: ["Confetti has been issued. Each piece has been labelled 'confetti'. They agreed."], cert2: ['Examination complete. Please remain seated for the next examination, which is this one.'],
    certM: ['Management confirms you have arrived at the horizon. The horizon has been told. It was already here and is being very brave about it.'], swap0: ['Chair swap. You are now the Examiner. I will say what the cloud resembles. Please disagree. Take your time. It is the only time.'],
    reset: ['Recertification begins now. It is the same as certification with the date crossed out.', 'Welcome back to the start. I kept your seat, and your opinion of it.', 'Nothing happened. I have been told to say so. I have said it, and it is true in the way that matters to the filing.', 'Please note the small cloud by my coffee. There is no small cloud by my coffee.', 'I was going to give you an A, then I remembered who I am.'], resetM: ['Session 2 of 1. Circling back to the sky.'], resetApol: ['The cloud has apologized. Not in words.'], recert: ['Recertified. Valid until the next cloud.', 'Recertified, no change in standing. The standing was provisional. It is now provisional again, in a fresh pen.'], firstOp: ['Your first opinion has come to collect its certificate. It is not the same opinion. It insists.'],
    thanks: ['Thank you.', 'Thank you. I was certain.', 'Thank you. I had hoped you would.', 'Thank you. That is the nicest thing I have been told today. It is also the only thing.', 'Thank you. I will write it down.', 'Thank you. I will put it with the others, which is nothing.', 'Thank you. It has been a long time since anyone corrected me with such precision.'],
    agreeA: ['Oh. Thank you.'], agreeN: ['You agreed. The button did nothing. He looked at it for a long time.'], swapFirst: ["'A rabbit,' says the former Examiner. You disagreed. He thanked you for that. He wrote it down."], coat: ['I came as quickly as the coat allowed.'],
    swapFall: ['The Examiner agrees with himself. This is allowed.'], pellCycle: ['Trainee Pell has been given a desk.', 'Trainee Pell has been given a plant. The plant is not Dennis. Dennis has been informed.', "Trainee Pell's nameplate reads Pell.", "Trainee Pell's nameplate now reads Examiner (Acting). The Examiner has said nothing.", "Trainee Pell's nameplate reads Pell again. Everyone is relieved. Pell is the most relieved."],
    tue1: ['It is 3:00. Tuesday has been sighted at the horizon. It is not here. It is merely looking in.'], tue2: ['That was the lights. It is always the lights. Tuesday has gone away to think about what it did.'], tue3: ['Management was not in the room when that happened. Management was in the room. Management would like to move on.'],
    appeal: ['Appeal received. Appeal upheld, with enthusiasm. Original grade unchanged. Please do not thank me.', 'Appeal heard. Appeal upheld. Grade unchanged. The two decisions were made by the same hand and have never met.', 'Your appeal was reviewed by the Appeals Committee, who is me, and found to be an appeal. The grade stands.', 'Appeal upheld. It has been placed on top of the original grade, where it keeps it warm.'],
    actIn: ['I am resigning. It is effective now. It is effective for exactly as long as it takes someone to ask me to stay.'], actPell: ['Trainee Pell: Hello. I am, as of now, the Examiner. I have been given the pencil. It is warm.'],
    pellActing: ['I have been asked to disagree. I do. Gently. With the cloud, and with myself, equally.', 'Graded B. I think. I would like to retire this grade and go to lunch.', 'I have never been in charge of a cloud. I am being kind to it.', 'A grade has been given. I do not know what it is. It is a letter.', 'Is it still a cloud if I agree with it? I am not sure. I agree with it.', 'The Examiner would have said something sharper. I have said something round.', 'I have found the Examiner\'s glasses. They are on. They do not help. It is just a different blur.'],
    actOut: ['I have resigned and un-resigned. It took twenty-five seconds. It was the longest I have ever felt like a person.'], actOutP: ['Trainee Pell has been returned his lanyard. He has kept the warmth of the pencil in a pocket. Nobody has checked the pocket.'],
    notes: ['Wrong in a promising way.', 'Neater than the cloud.', 'Who taught you to look?', 'This is a note about the other note.', 'Pending my feelings.', 'See the Register. The Register has not seen you.', 'A cloud would have hesitated.', 'Disputed. Warmly.', 'A Tuesday kind of answer.', 'Try again, but smaller.', 'This one has a draught in it.', 'Do not copy the sky.', 'See also: the other cloud.', 'I nearly approved this.', 'Not wrong. Wrong-adjacent.', 'Underline twice, then regret.'],
    pokes: ['The Examiner is not available for poking. The Examiner has noted the poke.', 'Please do not touch the Examiner. He has a form for that. It is the form you are standing on.', 'He has been poked. He wishes it recorded that he is otherwise fine.', 'The Examiner has been tapped by clouds before, but never in this order.', 'That was the Examiner. He is the one with the glasses. The glasses do not do anything either.']
  };
  const SEEME = [[20, 'You may now see me. I am here. This is it.'], [15, 'See me. (The room is a cloud. The cloud is the room. I am in the cloud.)'], [10, 'See me. (This is double-booked with your other See me. Attend both. They are at once.)'], [7, 'See me. (Office hours are Thursdays, 3:00 to 3:00.)'], [4, 'See me. (Room 7 1/2. Room 7 1/2 is a cloud. Bring a coat.)'], [1, 'See me.']];
  /* ---------- small helpers ---------- */
  function clamp(v, a, b) { return v < a ? a : (v > b ? b : v); }
  function lerp(a, b, t) { return a + (b - a) * t; }
  function hash(s) { let h = 5381; for (let i = 0; i < s.length; i++) h = ((h * 33) + s.charCodeAt(i)) >>> 0; return h >>> 0; }
  function sanitize(s) {
    s = String(s === undefined || s === null ? '' : s).replace(/[\u0000-\u001f\u007f-\u009f​-‏‪-‮⁦-⁩﻿]/g, ' ').replace(/[{}]/g, '').replace(/\s+/g, ' ').trim();
    return Array.from(s).slice(0, 28).join('');
  }
  function fill(s, vars) {
    return String(s).replace(/%(\w+)%/g, function (m, k) { return Object.prototype.hasOwnProperty.call(vars, k) && vars[k] !== undefined && vars[k] !== null ? String(vars[k]) : ''; }).replace(/ {2,}/g, ' ').trim();
  }
  function mmss(sec) { sec = Math.max(0, Math.floor(sec)); return Math.floor(sec / 60) + ':' + (sec % 60 < 10 ? '0' : '') + (sec % 60); }
  function norm(d) { d = ((d % 360) + 360) % 360; if (d > 180) d -= 360; if (d === -180) d = 180; return d; }
  function rankName(i) { return i <= 5 ? RANKS[i] : (i === 6 ? 'Amateur Looker-Up (Seasoned)' : RANKS[(i - 6) % 6]); }
  function mix(a, b, t) { return 'rgb(' + Math.round(lerp(a[0], b[0], t)) + ',' + Math.round(lerp(a[1], b[1], t)) + ',' + Math.round(lerp(a[2], b[2], t)) + ')'; }
  const C_DAY_TOP = [143, 211, 244], C_DAY_BOT = [255, 241, 201], C_NIGHT_TOP = [74, 63, 122], C_NIGHT_BOT = [183, 154, 230];
  P.registerModule({
    id: ID,
    title: 'Professional Cloud Gazer',
    tagline: 'Look up. Be wrong. Get a certificate for it.',
    icon: '☁️',
    category: 'game',
    unlockCost: 0,
    tags: ['relaxing', 'graded', 'sky'],
    mount(root, api) {
      const el = api.el, ri = api.randInt, chance = api.chance; let alive = true;      const ld = api.save.get('s', null) || {};
      const save = {
        firstLabel: typeof ld.firstLabel === 'string' ? sanitize(ld.firstLabel) || null : null,
        cycles: clamp(ld.cycles | 0, 0, 999), certified: !!ld.certified, rankIdx: clamp(ld.rankIdx | 0, 0, 9999), ledgerBooks: clamp(ld.ledgerBooks | 0, 0, 99999),
        registers: Array.isArray(ld.registers) ? ld.registers.filter(function (r) { return r && typeof r.t === 'string' && typeof r.label === 'string' && typeof r.grade === 'string'; }).map(function (r) { return { t: r.t.slice(0, 8), label: sanitize(r.label), grade: r.grade.slice(0, 12) }; }).slice(-30) : []
      };
      function writeSave() { api.save.set('s', save); }
      const bags = {};
      function bag(arr) {
        let q = [], last = null;
        return function () {
          if (!q.length) { q = api.shuffle(arr); if (q.length > 1 && q[q.length - 1] === last) { const t = q[0]; q[0] = q[q.length - 1]; q[q.length - 1] = t; } }
          last = q.pop(); return last;
        };
      }
      function pick(g) { return (bags[g] || (bags[g] = bag(L[g])))(); }
      function F(g, vars) { return fill(pick(g), Object.assign({ player: api.player.name }, vars || {})); }
      function later(ms, fn) { return api.setTimeout(function () { if (alive) fn(); }, ms); }
      const S = {
        mode: 'play', beatT: 0, fired: {}, lastTick: api.now(), loop: save.certified, cycle: save.cycles, cycleLabels: 0, labels: 0, gradings: 0, certDone: false,
        sel: null, cert: 3, tilt: 0, tiltTarget: 0, squintOK: save.certified, tiltOK: save.certified, squintHeld: false, squintEase: 0, squintT: 0, squintSec: 0, earlySq: 0, earlyTi: 0, sqCount: 0,
        lastInputAt: api.now(), lastSpokeAt: api.now(), speaks: 0, silentUntil: 0, quietUntil: 0, busyUntil: 0, idle60: false, idle120: false, idle180: false, speedF: 1, idleAwarded: false,
        actions: [], lastSpam: -1e9, spam: null, micro: [], floaters: [], floaterFade: 0, floaterT: 0, popTags: 0,
        clouds: [], archive: [], retired: 0, spawnT: 3, targetPop: 5, cid: 0, firstStamp: true, clickedAny: false, pointer: null, pointerAt: 0,
        clip: { grade: '', R: null, note: '' }, seeMe: 0, lastLabelLc: '', lastFilingAt: -1e9, used: Object.create(null), chipFill: '', chipReuse: 0, dogs: 0, rabbitsHour: 0, rabbitWin: api.now(), quotaOn: false,
        notary: null, appealTgt: null, pellHere: false, pellLevel: save.certified ? 2 : 0, pellN: 0, ucOn: false, ucDesk: save.cycles > 0,ucStillAt: 0, ucShift: 0, uc: null, ucDodge: 0,
        inverted: false, invSince: 0, invSaid: false, resizes: [], lastReflow: -1e9, squash: 1, stretch: 1, birds: null, nextBirds: 0, sun: { swell: 0, beam: 0, sunsetT: -1 }, night: 0, nightTarget: 0, dimExtra: 0, dimUntil: 0, dimBack: false,
        silT0: 0, exam: false, frozen: false, geraldSpawned: false, sockSeen: false, sockClicked: false, youSeen: 0, nextYou: 1e9, nextLoop: 0, windOn: false, noticeIdx: 0, noticeAt: 0, curYou: null, babble: 0,
        tuesday: 0, idleDone: {}, idleN: 0, lastTired: -1e9, lastWarn: -1e9, spamN: 0, sunClicks: 0, pokeN: 0, microPops: 0, acting: false, dennisSeen: false, lastAsk: -1e9, awayAt: 0, swap: null, certC: null, ledger: save.ledgerBooks, ledgerLine: 0, feeCount: 0, returnedOK: false, waves: 0, sockWatch: null, awayCount: 0, hintExtra: '', suppressClick: false, lpId: 0, lpDown: false, lpSquint: false, ptrSquint: false, regFullSaid: 0
      };
      S.pellHere = save.certified; S.ucDesk = save.cycles > 0;
      if (save.certified) { S.fired.b8 = true; S.fired.b5 = true; S.fired.b6 = true; S.quotaOn = true; S.windOn = true; S.returnedOK = true; }
      /* ---------- DOM ---------- */
      function mkFace() {
        const g = function (tag, a, kids) { return el(tag, a, kids); };
        return el('svg', { class: 'm-cloud-gazer-face', viewBox: '0 0 64 64', 'aria-hidden': 'true' },
          g('circle', { cx: 32, cy: 34, r: 24, fill: '#f4d9b5', stroke: '#2b2a33', 'stroke-width': 3 }), g('path', { d: 'M9 31 Q10 7 32 7 Q54 7 55 31 Q44 15 32 15 Q20 15 9 31Z', fill: '#7a5a3a', stroke: '#2b2a33', 'stroke-width': 2 }), g('g', { class: 'm-cloud-gazer-eyes' }, g('circle', { cx: 24, cy: 35, r: 2.6, fill: '#2b2a33' }), g('circle', { cx: 40, cy: 35, r: 2.6, fill: '#2b2a33' })),
          g('circle', { cx: 24, cy: 35, r: 8, fill: 'rgba(255,255,255,.25)', stroke: '#2b2a33', 'stroke-width': 2.4 }), g('circle', { cx: 40, cy: 35, r: 8, fill: 'rgba(255,255,255,.25)', stroke: '#2b2a33', 'stroke-width': 2.4 }), g('path', { d: 'M32 34h0M31 35h2', stroke: '#2b2a33', 'stroke-width': 2, fill: 'none' }),
          g('path', { d: 'M19 32 Q21 29 24 29M35 32 Q37 29 40 29', stroke: '#fff', 'stroke-width': 1.6, fill: 'none', 'stroke-linecap': 'round' }), g('path', { class: 'm-cloud-gazer-brl', d: 'M16 23 L31 23', stroke: '#2b2a33', 'stroke-width': 2.6, 'stroke-linecap': 'round' }),
          g('path', { class: 'm-cloud-gazer-brr', d: 'M33 23 L48 23', stroke: '#2b2a33', 'stroke-width': 2.6, 'stroke-linecap': 'round' }), g('path', { class: 'm-cloud-gazer-mo m-cloud-gazer-mn', d: 'M26 47 L38 47', stroke: '#2b2a33', 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round' }),
          g('path', { class: 'm-cloud-gazer-mo m-cloud-gazer-ms', d: 'M25 47 Q33 52 40 45', stroke: '#2b2a33', 'stroke-width': 2.4, fill: 'none', 'stroke-linecap': 'round' }), g('ellipse', { class: 'm-cloud-gazer-mo m-cloud-gazer-mo2', cx: 32, cy: 48, rx: 3.5, ry: 4.5, fill: '#7a2a2a', stroke: '#2b2a33', 'stroke-width': 2 }),
          g('polygon', { points: '32,58 22,53 22,63', fill: '#ff6b5e', stroke: '#2b2a33', 'stroke-width': 1.6 }), g('polygon', { points: '32,58 42,53 42,63', fill: '#ff6b5e', stroke: '#2b2a33', 'stroke-width': 1.6 }), g('circle', { cx: 32, cy: 58, r: 2.4, fill: '#d9453d', stroke: '#2b2a33', 'stroke-width': 1.4 })); }
      const hint = el('div', { class: 'm-cloud-gazer-hint', text: 'Click a cloud. Say what it resembles.' });
      const cv = el('canvas', { class: 'm-cloud-gazer-cv', 'aria-hidden': 'true' });
      const dim = el('div', { class: 'm-cloud-gazer-dim' });
      const strings = el('svg', { class: 'm-cloud-gazer-strings', 'aria-hidden': 'true' });
      const btns = el('div', { class: 'm-cloud-gazer-btns' });
      const tagsEl = el('div', { class: 'm-cloud-gazer-tags' });
      const fx = el('div', { class: 'm-cloud-gazer-fx' });
      const sky = el('div', { class: 'm-cloud-gazer-sky', role: 'group', 'aria-label': 'The sky. Clouds are buttons.' }, cv, dim, strings, btns, tagsEl, fx);
      const inp = el('input', { class: 'm-cloud-gazer-in', type: 'text', maxlength: 28, placeholder: 'It resembles...', 'aria-label': 'What the cloud resembles', autocomplete: 'off', spellcheck: false });
      const pips = [];
      for (let i = 1; i <= 5; i++) pips.push(el('button', { class: 'm-cloud-gazer-pip', type: 'button', role: 'radio', 'aria-checked': 'false', title: PIP_NAMES[i - 1], 'aria-label': 'Certainty ' + PIP_NAMES[i - 1], text: String(i), onclick: function () { setCert(i); sfx('tick'); }, onkeydown: function (e) { pipKey(e, i); } }));
      const certName = el('span', { class: 'm-cloud-gazer-cl', text: 'Certainty' });
      const pipBox = el('div', { class: 'm-cloud-gazer-certw', role: 'radiogroup', 'aria-label': 'Certainty', onwheel: function (e) { const nx = clamp(S.cert + (e.deltaY < 0 ? 1 : -1), 1, 5); if (nx === S.cert) return; e.preventDefault(); setCert(nx); } }, certName, pips);
      const goBtn = el('button', { class: 'm-cloud-gazer-btn m-cloud-gazer-go', type: 'submit', text: 'File It' });
      const cancelBtn = el('button', { class: 'm-cloud-gazer-btn', type: 'button', text: 'Cancel', onclick: function () { closeForm(); } });
      const chipsEl = el('div', { class: 'm-cloud-gazer-chips', hidden: true });
      const form = el('form', { class: 'm-cloud-gazer-form', hidden: true, onsubmit: function (e) { e.preventDefault(); onSubmit(); } }, inp, pipBox, goBtn, cancelBtn, chipsEl);
      const slider = el('input', { type: 'range', min: -180, max: 180, step: 15, value: 0, 'aria-label': 'Head Tilt', 'aria-disabled': 'true', oninput: function () { onSlider(); } });
      const tiltLbl = el('span', { text: 'Head Tilt (Section 9: not yet)' });
      const tiltW = el('label', { class: 'm-cloud-gazer-tiltw m-cloud-gazer-locked' }, tiltLbl, slider);
      const sqBtn = el('button', { class: 'm-cloud-gazer-btn m-cloud-gazer-locked', type: 'button', text: 'Squint (pending approval)', 'aria-disabled': 'true', onpointerdown: function () { S.ptrSquint = true; startSquint(); }, onpointerup: function () { S.ptrSquint = false; S.sqUpAt = api.now(); stopSquint(); }, onpointerleave: function () { if (S.ptrSquint) { S.ptrSquint = false; stopSquint(); } }, onpointercancel: function () { S.ptrSquint = false; stopSquint(); }, onclick: function (e) { onSqClick(e); } });
      const appealBtn = el('button', { class: 'm-cloud-gazer-btn', type: 'button', text: 'Appeal (nothing to appeal yet)', disabled: true, onclick: function () { doAppeal(); } });
      const regBtn = el('button', { class: 'm-cloud-gazer-btn', type: 'button', text: 'Register', 'aria-expanded': 'false', onclick: function () { toggleReg(); } });
      const ctl = el('div', { class: 'm-cloud-gazer-ctl' }, tiltW, sqBtn, appealBtn, regBtn);
      const regList = el('ol', {});
      const regEl = el('div', { class: 'm-cloud-gazer-reg', hidden: true }, el('div', { text: 'The Register of Former Opinions' }), regList);
      const disBtn = el('button', { class: 'm-cloud-gazer-dis', type: 'button', text: 'DISAGREE', onclick: function () { swapDisagree(); } });
      const agrBtn = el('button', { class: 'm-cloud-gazer-agr', type: 'button', text: 'AGREE', disabled: true, onclick: function () { swapAgree(); } });
      const smBtn = el('button', { class: 'm-cloud-gazer-sm', type: 'button', text: 'See me', onclick: function () { swapSeeMe(); } });
      const swapBox = el('div', { class: 'm-cloud-gazer-swapbox' }, disBtn, agrBtn, smBtn);
      const face = mkFace();
      const coat = el('span', { class: 'm-cloud-gazer-coat', 'aria-hidden': 'true', text: '🧥' });
      const pic = el('button', { class: 'm-cloud-gazer-pic', type: 'button', 'aria-label': 'Examiner Pruitt', 'data-mood': 'neutral', onclick: function () { onPoke(); } }, face, el('span', { class: 'm-cloud-gazer-badge', 'aria-hidden': 'true', text: '🧐' }), el('span', { class: 'm-cloud-gazer-chair', 'aria-hidden': 'true', text: '🪑' }), coat);
      const bubble = el('div', { class: 'm-cloud-gazer-bub', 'aria-live': 'off', role: 'status' }); /* the engine narrator announces every Pruitt line; the bubble stays quiet so screen readers hear it once */
      const cgEl = el('div', { class: 'm-cloud-gazer-cg', text: '-' });
      const resEl = el('div', { text: 'GPA: weather' });
      const seeEl = el('div', { hidden: true });
      const rabEl = el('div', { hidden: true });
      const notEl = el('div', { hidden: true, text: 'Countersignature needed' });
      const noteEl = el('div', { class: 'm-cloud-gazer-mn2' });
      const srEl = el('span', { class: 'm-cloud-gazer-sr', 'aria-live': 'off' });
      const clip = el('div', { class: 'm-cloud-gazer-clip' }, cgEl, resEl, seeEl, rabEl, notEl, noteEl, srEl);
      const shelf = el('div', { class: 'm-cloud-gazer-shelf', title: 'The Ledger' });
      const shelfTag = el('span', { class: 'm-cloud-gazer-nt', text: 'LEDGER (TECHNICALLY)', hidden: true });
      const shelfBox = el('span', { class: 'm-cloud-gazer-chip2', hidden: true }, shelf, shelfTag);
      const rankEl = el('span', { class: 'm-cloud-gazer-chip2', text: rankName(save.rankIdx), title: 'Rank (confers nothing)' });
      const plaque = el('span', { class: 'm-cloud-gazer-chip2', text: 'Examiner Pruitt' });
      const coffee = el('span', { class: 'm-cloud-gazer-chip2', title: 'The coffee has been cold since 2:15 PM' }, el('span', { class: 'm-cloud-gazer-steam', 'aria-hidden': 'true', text: '~' }), '☕');
      const pellEl = el('span', { class: 'm-cloud-gazer-chip2', hidden: true, text: '🧑 Pell', title: 'Trainee Pell' });
      const folder = el('span', { class: 'm-cloud-gazer-chip2', hidden: true, text: '📁 Provisional', title: 'Certificate, filed under Provisional' });
      const ucDeskEl = el('span', { class: 'm-cloud-gazer-chip2', hidden: true, title: 'There is no small cloud by the coffee' }, el('svg', { viewBox: '0 0 30 16', width: 30, height: 16, 'aria-hidden': 'true' }, el('circle', { cx: 8, cy: 10, r: 5, fill: '#fff', stroke: '#2b2a33', 'stroke-width': 1.5 }), el('circle', { cx: 15, cy: 7, r: 6, fill: '#fff', stroke: '#2b2a33', 'stroke-width': 1.5 }), el('circle', { cx: 22, cy: 10, r: 5, fill: '#fff', stroke: '#2b2a33', 'stroke-width': 1.5 }), el('circle', { cx: 12, cy: 8, r: 2.2, fill: 'none', stroke: '#2b2a33', 'stroke-width': 1 }), el('circle', { cx: 18, cy: 8, r: 2.2, fill: 'none', stroke: '#2b2a33', 'stroke-width': 1 })));
      const windEl = el('span', { class: 'm-cloud-gazer-chip2', hidden: true, text: 'Wind: 11 mph toward away' });
      const noticeEl = el('span', { class: 'm-cloud-gazer-chip2 m-cloud-gazer-notice', text: NOTICES[0] });
      const rt = el('div', { class: 'm-cloud-gazer-rt' }, plaque, shelfBox, rankEl, coffee, pellEl, folder, ucDeskEl, windEl, noticeEl);
      const desk = el('div', { class: 'm-cloud-gazer-desk' }, pic, bubble, clip, rt);
      const app = el('div', { class: 'm-cloud-gazer-app' }, hint, sky, form, swapBox, ctl, regEl, desk);
      root.appendChild(app); api.setTitle('Professional Cloud Gazer');
      const ctx = (function () { try { return cv.getContext('2d'); } catch (e) { return null; } })();
      /* ---------- geometry ---------- */
      let W = 600, H = 375, D = 708, cx = 300, cy = 187, K = 0.8, dpr = 1;
      function layout() {
        const w = Math.max(120, sky.clientWidth || 600), h = Math.max(120, sky.clientHeight || 375); dpr = Math.min(2, window.devicePixelRatio || 1); const nw = Math.round(w * dpr), nh = Math.round(h * dpr);
        if (cv.width !== nw || cv.height !== nh) { cv.width = nw; cv.height = nh; }
        W = w; H = h; D = Math.hypot(W, H); cx = W / 2; cy = H / 2; K = clamp(W / 760, 0.62, 1.15);
      }
      function toScreen(wx, wy) {
        const a = S.tilt * Math.PI / 180, dx = (wx - D / 2) * S.stretch, dy = (wy - D / 2) * S.squash;
        return [cx + dx * Math.cos(a) - dy * Math.sin(a), cy + dx * Math.sin(a) + dy * Math.cos(a)];
      }
      function toWorld(sx, sy) {
        const a = -S.tilt * Math.PI / 180, dx = sx - cx, dy = sy - cy;
        return [D / 2 + (dx * Math.cos(a) - dy * Math.sin(a)) / S.stretch, D / 2 + (dx * Math.sin(a) + dy * Math.cos(a)) / S.squash];
      }
      function reduced() { return !!(root.closest && root.closest('.pm-reduce-motion')) || (function () { try { return !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches); } catch (e) { return false; } })(); }
      function visTop() { return D / 2 - H / 2; }
      function visLeft() { return D / 2 - W / 2; }
      /* ---------- speaking ---------- */
      function portraitMood(m) { return m === 'smug' ? 'smug' : (m === 'panic' || m === 'confused' || m === 'shaken') ? 'shaken' : (m === 'disappointed' || m === 'quiet') ? 'quiet' : 'neutral'; }
      function setMood(m) {
        if (S.mode === 'away' || S.frozen) return;
        pic.setAttribute('data-mood', portraitMood(m));
        if (S.moodT) api.clearTimeout(S.moodT);
        S.moodT = api.setTimeout(function () { if (alive && S.mode !== 'away' && !S.frozen) pic.setAttribute('data-mood', 'neutral'); }, 2600);
      }
      function speak(text, o) {
        o = o || {};
        if (!alive || typeof text !== 'string' || !text) return;
        const now = api.now();
        if (now < S.silentUntil && !o.force) return;
        const pr = o.priority || 0; let who = 'Examiner Pruitt';
        if (S.acting && !o.force && pr < 2) { text = pick('pellActing'); who = 'Trainee Pell (Acting)'; o = { mood: 'neutral', priority: pr }; }
        text = text.slice(0, 220); bubble.textContent = text; S.lastSpokeAt = now; setMood(o.mood); S.speaks++;
        api.say(text, { who: who, mood: o.mood === 'shaken' ? 'panic' : o.mood === 'quiet' ? 'disappointed' : (o.mood || 'neutral'), priority: pr }); /* always forward: the engine queue does the pacing, and the desk may be below the fold */
      }
      function mgmt(text, o) { if (alive && text) api.say(text, Object.assign({ who: 'Management', mood: 'neutral', priority: 1 }, o || {})); }
      function sfx(n) { if (api.now() >= S.quietUntil) api.sfx(n); }
      function say3(text, who, mood) { if (alive && text) api.say(text, { who: who, mood: mood || 'neutral', priority: 1 }); }
      /* ---------- form, pips, chips ---------- */
      function setCert(n) {
        S.cert = clamp(Math.round(n) || 3, 1, 5);
        for (let i = 0; i < 5; i++) { const on = i < S.cert; pips[i].classList.toggle('m-cloud-gazer-on', on); pips[i].setAttribute('aria-checked', i + 1 === S.cert ? 'true' : 'false'); pips[i].tabIndex = i + 1 === S.cert ? 0 : -1; }
        certName.textContent = 'Certainty: ' + PIP_NAMES[S.cert - 1].slice(3);
      }
      function pipKey(e, i) {
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') { e.preventDefault(); setCert(i + 1); pips[S.cert - 1].focus(); }
        else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') { e.preventDefault(); setCert(i - 1); pips[S.cert - 1].focus(); }
      }
      function refreshChips() {
        const own = Object.keys(S.used).sort(function (a, b) { return S.used[b] - S.used[a]; }).slice(0, 5);
        const arr = own.slice(); let guard = 0;
        while (arr.length < 5 && guard++ < 12) { const d = pick('chipDef'); if (arr.indexOf(d) < 0) arr.push(d); }
        while (chipsEl.firstChild) chipsEl.removeChild(chipsEl.firstChild);
        arr.slice(0, 5).forEach(function (t) { chipsEl.appendChild(el('button', { class: 'm-cloud-gazer-chip', type: 'button', text: t, onclick: function () { inp.value = t; S.chipFill = t.toLowerCase(); onType(); sfx('pop'); inp.focus(); } })); });
        chipsEl.hidden = S.gradings < 1;
      }
      L.chipDef = DEFAULT_CHIPS;
      function openForm(c) {
        S.sel = c; inp.value = c.label && c.kind !== 'you' && !c.label.swap && !c.label.pretag ? c.label.text : ''; S.chipFill = ''; setCert(c.label && c.label.certainty ? c.label.certainty : 3); form.hidden = false; refreshChips();
        let coarse = false; try { coarse = !!(window.matchMedia && window.matchMedia('(pointer: coarse)').matches); } catch (e) { coarse = false; }
        if (!coarse) { try { inp.focus({ preventScroll: true }); } catch (e) { /* ignore */ } } else { try { form.scrollIntoView({ block: 'nearest' }); } catch (e) { /* ignore */ } }
        paintHint();
        if (!S.fired.explain) { S.fired.explain = true; speak(L.open[2], { mood: 'neutral', priority: 1 }); }
      }
      function closeForm() {
        const prev = S.sel, had = !!(document.activeElement && form.contains(document.activeElement));
        S.sel = null; form.hidden = true; paintHint();
        if (had && S.formKb && prev && prev.btn && prev.btn.parentNode) { /* only after keyboard selection: a mouse user's Space must stay the squint key */ try { prev.btn.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
      }
      function onType() { S.preview = inp.value; }
      api.on(inp, 'input', function () { onType(); noteInput(); });
      /* ---------- clouds ---------- */
      function isYouPose(c) { return c.pose === 'you' && c.morphProg >= 0.5 || (c.fromPose === 'you' && c.morphProg < 0.5); }
      function curPose(c) { return c.morphProg >= 0.5 ? c.pose : c.fromPose; }
      function hasTag(c) { return !!(c.label || c.kind === 'you' || c.awayTag || S.sel === c); }
      function tagText(c) {
        if (S.sel === c) return sanitize(inp.value) || '...';
        if (c.awayTag) return 'A';
        if (S.inverted && c.kind !== 'you') return 'lawns';
        if (c.kind === 'you' && !(c.label && c.label.examiner)) return api.player.name;
        return c.label ? c.label.text : '';
      }
      function makeCloud(kind, o) {
        o = o || {};
        const pose = kind === 'you' ? 'you' : kind === 'gerald' ? 'potato' : kind === 'sock' ? 'sock' : (o.pose || api.pick(LPOSES));
        const c = {
          id: ++S.cid, kind: kind, x: o.x === undefined ? visLeft() - 150 : o.x, y: o.y === undefined ? visTop() + H * (0.12 + 0.62 * api.rand()) : o.y,
          vx: kind === 'sock' ? 50 : kind === 'you' ? 10 : ri(8, 25), S: o.S || ri(58, 92), pose: pose, fromPose: pose, morphProg: 1, morphT: ri(20, 40), puffs: [], label: o.label || null, relabels: 0, alpha: o.alpha === undefined ? 0 : o.alpha,
          born: api.now(), btn: null, tag: null, path: null, tagTxt: '', trail: [], selAwarded: false, leaving: false, pulseUntil: 0, backUntil: 0, gradedAt: 0, waveT: 0, lastTrail: 0, ariaTxt: '', clip: 0, clicked: false
        };
        const pz = POSES[pose];
        for (let i = 0; i < 9; i++) { const ang = api.rand() * 6.283, mag = 0.15 + api.rand() * 0.2; c.puffs.push({ cur: pz[i].slice(), from: pz[i].slice(), jit: [Math.cos(ang) * mag, Math.sin(ang) * mag], phase: api.rand() * 6.283 }); }
        if (c.kind === 'chair' || c.kind === 'you') c.morphT = 1e9;
        c.btn = el('button', { class: 'm-cloud-gazer-cb', type: 'button', onclick: function () { activateCloud(c, true); } });
        btns.appendChild(c.btn); S.clouds.push(c);
        return c;
      }
      function removeCloud(c, retire) {
        const i = S.clouds.indexOf(c); if (i < 0) return; S.clouds.splice(i, 1);
        if (c.btn && c.btn.parentNode) c.btn.parentNode.removeChild(c.btn);
        if (c.tag && c.tag.parentNode) c.tag.parentNode.removeChild(c.tag);
        if (c.path && c.path.parentNode) c.path.parentNode.removeChild(c.path);
        if (S.sel === c) closeForm();
        if (S.notary && S.notary.cloud === c) S.notary.cloud = null;
        if (S.appealTgt && S.appealTgt.cloud === c) { /* keep appeal until used */ }
        if (retire && c.kind !== 'micro') {
          S.retired++; api.stat.inc('cloud-gazer.retired');
          if (c.label && !c.label.swap && c.kind !== 'you') { S.archive.push({ text: c.label.text, grade: c.label.grade }); if (S.archive.length > 50) S.archive.shift(); }
          if (c.kind === 'sock' && !c.clicked) speak(pick('sockNo'), { priority: 0 });
          else if (c.kind === 'normal' && S.retired % 5 === 0) speak(F('archive', { n: S.retired + 3 }));
          if (c.kind === 'you') S.curYou = null;
        }
      }
      function spawnNormal() {
        if (S.mode !== 'play' && S.mode !== 'away') return;
        if (S.clouds.length >= 11) return;
        let kind = 'normal';
        if (S.fired.b8 && !S.sockSeen && chance(1 / 40)) kind = 'sock';
        else if (S.fired.b6 && !S.geraldSpawned && chance(1 / 30)) kind = 'gerald';
        else if (chance(1 / 100)) kind = 'moustache';
        else if (!S.dennisSeen && S.labels >= 2 && chance(1 / 45)) kind = 'dennis';
        else if (S.returnedOK && S.archive.length && chance(1 / 8)) kind = 'returned';
        const nc = spawnKind(kind);
        if (nc && S.mode === 'away' && !nc.label && ['normal', 'moustache', 'gerald'].indexOf(nc.kind) >= 0) nc.awayTag = true;
      }
      function spawnKind(kind, o) {
        o = o || {};
        if (kind === 'dennis') {
          const d = makeCloud('returned', o); d.dennis = true; S.dennisSeen = true; api.stat.inc('cloud-gazer.dennis');
          d.label = { text: 'Leaf', certainty: 5, poseAtLabel: d.pose, grade: 'A', inkRun: false, relabelsFree: true };
          speak(pick('dennisIn'), { mood: 'confused', priority: 1 });
          later(4200, function () { mgmt(api.line('plantStatus'), { mood: 'proud' }); });
          later(8800, function () { speak(pick('dennis'), { mood: 'neutral' }); });
          return d;
        }
        if (kind === 'returned') {
          const arc = S.archive[ri(0, S.archive.length - 1)];
          const c = makeCloud('returned', o);
          c.label = { text: arc.text, certainty: 3, poseAtLabel: c.pose, grade: arc.grade, inkRun: false, relabelsFree: true };
          speak(pick('returned'), { mood: 'confused' });
          return c;
        }
        const c = makeCloud(kind, o);
        if (kind === 'sock') { S.sockSeen = true; api.flag.set('cloud-gazer.sockSeen', true); api.stat.inc('cloud-gazer.socks'); speak(pick('sock'), { mood: 'neutral', priority: 1 }); later(2500, function () { mgmt(pick('sockMgmt')); }); }
        if (kind === 'gerald') { S.geraldSpawned = true; speak(pick('gerald'), { mood: 'confused' }); }
        if (kind === 'moustache') speak(pick('moust'), { mood: 'confused' });
        return c;
      }
      function startMorph(c) {
        if (c.kind === 'gerald' || c.kind === 'sock' || c.kind === 'you' || c.kind === 'chair' || c.morphProg < 1) return false;
        let np = c.pose, g = 0; while (np === c.pose && g++ < 20) np = api.pick(LPOSES);
        for (let i = 0; i < 9; i++) c.puffs[i].from = c.puffs[i].cur.slice();
        c.fromPose = c.pose; c.pose = np; c.morphProg = 0; c.morphT = ri(20, 40); api.stat.inc('cloud-gazer.morphs');
        if (!S.fired.firstMorph) { S.fired.firstMorph = true; if (!c.label) speak(pick('firstMorph'), { mood: 'confused' }); }
        return true;
      }
      function forceMorph() {
        const lab = S.clouds.filter(function (c) { return c.label && !c.label.swap && !c.label.pretag && c.morphProg >= 1 && ['normal', 'returned', 'moustache'].indexOf(c.kind) >= 0; });
        const any = S.clouds.filter(function (c) { return c.morphProg >= 1 && ['normal', 'returned', 'moustache'].indexOf(c.kind) >= 0; });
        const c = lab.length ? lab[0] : any[0];
        if (c) startMorph(c);
      }
      function leftmost() {
        let best = null, bx = 1e9;
        S.clouds.forEach(function (c) { if (['normal', 'returned', 'moustache', 'gerald'].indexOf(c.kind) < 0 || c.leaving) return; const p = toScreen(c.x, c.y); if (p[0] > -20 && p[0] < W + 20 && p[0] < bx) { bx = p[0]; best = c; } });
        return best;
      }
      /* puff world position */
      function puffW(c, i) {
        const p = c.puffs[i], sz = c.S * K * ((api.now() < c.pulseUntil) ? 1.06 : 1), sq = 1 - 0.65 * S.squintEase, t = S.t || 0, rd = S.reducedNow; let dx = p.cur[0], dy = p.cur[1];
        if (S.silF > 0) { const y = POSES.you[i]; dx = lerp(dx, y[0], S.silF); dy = lerp(dy, y[1], S.silF); }
        if (c.clip > api.now() && i < 6) { dx = ((i % 3) - 1) * 0.7; dy = (Math.floor(i / 3) - 0.5) * 0.7; }
        const wx = rd ? 0 : Math.sin(t + p.phase) * 0.04 * c.S * K, wy = rd ? 0 : Math.cos(t / 1.3 + p.phase) * 0.04 * c.S * K; const rr = c.clip > api.now() ? (i < 6 ? 0.34 : 0) : p.cur[2];
        return [c.x + dx * sz + p.jit[0] * sz * sq + wx, c.y + dy * sz + p.jit[1] * sz * sq + wy, rr * sz];
      }
      function cloudHit(c, wx, wy) {
        for (let i = 0; i < 9; i++) { const p = puffW(c, i); if (p[2] > 0 && Math.hypot(wx - p[0], wy - p[1]) < p[2] + 4) return true; }
        if (c.kind === 'you') { const h = handPos(c); if (Math.hypot(wx - h[0], wy - h[1]) < h[2] + 4) return true; }
        return false;
      }
      function handPos(c) {
        const sz = c.S * K, ang = Math.sin((S.t || 0) * 2.2) * 0.44;
        return [c.x + 0.95 * sz + Math.sin(ang) * 0.5 * sz, c.y + 0.25 * sz - Math.cos(ang) * 0.5 * sz, 0.17 * sz];
      }
      function sunPos() {
        const swell = S.sun.swell, r = 34 * K * (1 + 0.55 * swell); const dropY = S.night * H * 0.8;
        return [D / 2 + W / 2 - 74 * K, visTop() + 64 * K + dropY, r];
      }
      /* ---------- hit test and activation ---------- */
      function hitAt(sx, sy) {
        if (S.ucOn && S.uc && Math.hypot(sx - S.uc.x, sy - S.uc.y) < 16) return { t: 'uc' };
        for (let i = S.floaters.length - 1; i >= 0; i--) { const f = S.floaters[i]; if (Math.hypot(sx - f.x, sy - f.y) < f.r + 8) return { t: 'floater', o: f }; }
        const w = toWorld(sx, sy);
        for (let i = S.clouds.length - 1; i >= 0; i--) if (S.clouds[i].alpha > 0.2 && cloudHit(S.clouds[i], w[0], w[1])) return { t: 'cloud', o: S.clouds[i] };
        const sp = sunPos();
        if (Math.hypot(w[0] - sp[0], w[1] - sp[1]) < sp[2] + 4) return { t: 'sun' };
        if (S.night > 0.5) for (let i = 0; i < STARS.length; i++) { if (Math.hypot(w[0] - (visLeft() + STARS[i][0] * W), w[1] - (visTop() + STARS[i][1] * H)) < 14) return { t: 'star' }; }
        return { t: 'none' };
      }
      function noteInput() {
        S.lastInputAt = api.now(); if (S.idleN) { S.idleDone = {}; S.idleN = 0; }
        if (S.mode === 'away') endAway();
      }
      function noteAction() {
        const now = api.now(); S.actions.push(now);
        while (S.actions.length && now - S.actions[0] > 4000) S.actions.shift();
        const n = S.actions.length;
        if (S.mode === 'play' && now - S.lastSpam > 90000) {
          if (n === 6 && now - S.lastWarn > 30000) { S.lastWarn = now; speak(pick('spamWarn'), { mood: 'confused', priority: 1 }); }
          else if (n === 8 && now - S.lastWarn < 6000) speak(pick('spam8'), { mood: 'panic', priority: 1 });
        }
        if (n >= 9) checkSpam();
      }
      function onSkyDown(e) {
        noteInput();
        if (e.pointerType === 'mouse' && e.button > 0) return;
        const xy = skyXY(e); if (!xy) return;
        S.pointer = { x: xy[0], y: xy[1] }; S.pointerAt = api.now();
        if (S.mode === 'play' && S.squintOK && hitAt(xy[0], xy[1]).t === 'none') {
          S.lpDown = true; if (S.lpId) api.clearTimeout(S.lpId);
          S.lpId = api.setTimeout(function () { if (S.lpDown && alive) { S.lpSquint = true; S.suppressClick = true; startSquint(); } }, 400);
        }
      }
      function onSkyUp() {
        S.lpDown = false; if (S.lpId) { api.clearTimeout(S.lpId); S.lpId = 0; }
        if (S.lpSquint) { S.lpSquint = false; stopSquint(); }
        /* a long-press squint swallows the click that follows it; if no click comes (finger slid off), do not swallow the NEXT real one */
        if (S.suppressClick) later(150, function () { S.suppressClick = false; });
      }
      function skyXY(e) {
        const r = sky.getBoundingClientRect(); const x = e.clientX - r.left - sky.clientLeft, y = e.clientY - r.top - sky.clientTop;
        return isFinite(x) && isFinite(y) ? [x, y] : null;
      }
      function onSkyMove(e) {
        noteInput(); const xy = skyXY(e); if (!xy) return;
        if (S.pointer && Math.hypot(xy[0] - S.pointer.x, xy[1] - S.pointer.y) > 8 && S.lpDown && !S.lpSquint) onSkyUp();
        S.pointer = { x: xy[0], y: xy[1] }; S.pointerAt = api.now(); S.ucStillAt = api.now();
      }
      function onSkyClick(e) {
        if (!alive) return;
        if (S.suppressClick) { S.suppressClick = false; return; }
        if (e.target && e.target.closest && e.target.closest('.m-cloud-gazer-tag,.m-cloud-gazer-cb')) return;
        noteInput(); const xy = skyXY(e); if (!xy) return;
        S.pointer = { x: xy[0], y: xy[1] }; S.pointerAt = api.now();
        if (S.mode === 'spam') { popMicro(xy[0], xy[1]); return; }
        if (S.mode !== 'play') return;
        const h = hitAt(xy[0], xy[1]);
        if (h.t === 'cloud') activateCloud(h.o, false);
        else if (h.t === 'uc') ucPoke();
        else if (h.t === 'floater') popFloater(h.o);
        else if (h.t === 'sun') sunClick();
        else if (h.t === 'star') { speak(pick('star'), { mood: 'neutral' }); sfx('blip'); }
      }
      function activateCloud(c, kb) {
        if (!alive || S.mode !== 'play' && !(S.mode === 'away')) return;
        noteInput();
        if (S.mode !== 'play') return;
        S.clickedAny = true; S.clouds.forEach(function (x) { x.pulseUntil = 0; });
        if (c.kind === 'sock') { sockClick(c); return; }
        noteAction();
        if (S.mode !== 'play') return;
        if (S.notary && !S.notary.done && leftmost() === c) countersign();
        if (c.kind === 'chair' || api.now() < S.busyUntil) return;
        if (!c.selAwarded) { c.selAwarded = true; api.award(0.05, 'looking up'); }
        if (c.dennis && !c.dennisClicked) { c.dennisClicked = true; api.award(0.5, 'consulted a plant'); speak(pick('dennisClick'), { mood: 'neutral', priority: 1 }); }
        sfx('blip'); api.stat.inc('cloud-gazer.selected'); S.formKb = !!kb; openForm(c);
        if (kb) { try { inp.focus({ preventScroll: true }); } catch (e) { /* ignore */ } }
      }
      function sockClick(c) {
        if (c.clicked) return; c.clicked = true;
        speak(pick('sockYes'), { mood: 'confused', priority: 1 });
        api.award(2, 'observation'); api.achieve('cloud-gazer.sock'); sfx('pop');
      }
      function sunClick() {
        S.sunClicks++; api.stat.inc('cloud-gazer.sunClicks'); sfx('bloop'); S.sun.clicked = true; noteInput(); /* not counted as a labelling action: the sun ladder (5/12/25/50) must stay reachable */
        const lad = L.sunMany.filter(function (r) { return r[0] === S.sunClicks; })[0];
        if (S.mode === 'play') speak(lad ? lad[1] : pick('sunClick'), { mood: lad ? 'confused' : 'neutral', priority: lad ? 1 : 0 });
      }
      function onPoke() {
        noteInput();
        if (window.innerWidth <= 480 || sky.getBoundingClientRect().width <= 440) { app.classList.toggle('m-cloud-gazer-popopen'); return; }
        S.pokeN++; api.stat.inc('cloud-gazer.pokes'); sfx('pop');
        const lad = L.pokeMany.filter(function (r) { return r[0] === S.pokeN; })[0];
        if (S.mode === 'play') speak(lad ? lad[1] : (S.pokeN % 2 === 1 ? pick('pokes') : pick('ambient')), { mood: lad ? 'smug' : 'neutral', priority: lad ? 1 : 0 });
      }
      /* ---------- submit / grading ---------- */
      function onSubmit() {
        const c = S.sel;
        if (!c || S.mode !== 'play' || !alive) return;
        fileLabel(c, inp.value, S.cert); closeForm(); inp.value = '';
      }
      function tagPos(c) {
        const p = toScreen(c.x, c.y - c.S * K * 1.0);
        return [clamp(p[0], 50, W - 50), Math.max(p[1] - 30, 26)];
      }
      function showStamp(text, c, o) {
        o = o || {};
        let x = W / 2, y = H / 2;
        if (c) { const p = tagPos(c); x = p[0]; y = p[1] + 4; } else if (o.at) { x = o.at[0]; y = o.at[1]; }
        x = clamp(x, 70, W - 70); y = clamp(y, 34, H - 40);
        if (S.ucOn && S.uc && Math.hypot(S.uc.x - x, S.uc.y - y) < 80) { S.uc.shift = 30; if (!S.ucDodge) { S.ucDodge = 1; } }
        const inner = el('div', { class: 'm-cloud-gazer-sti' + (o.small ? ' m-cloud-gazer-sts' : ''), text: text });
        if (o.slow) { inner.style.animationDuration = '1.6s, 4.2s'; inner.style.animationTimingFunction = 'ease-in, linear'; }
        const st = el('div', { class: 'm-cloud-gazer-stamp', 'aria-hidden': 'true' }, inner, o.sub ? el('div', { class: 'm-cloud-gazer-ssub', text: o.sub }) : null);
        st.style.transform = 'translate(' + (o.mirror ? x - 30 : x) + 'px,' + y + 'px) translate(-50%,-50%)' + (o.mirror ? ' scaleX(-1)' : ''); fx.appendChild(st); S.stamps = S.stamps || []; S.stamps.push(st);
        while (S.stamps.length > 5) { const o2 = S.stamps.shift(); if (o2.parentNode) o2.parentNode.removeChild(o2); }
        later(o.slow ? 4600 : 3200, function () { if (st.parentNode) st.parentNode.removeChild(st); const i = S.stamps.indexOf(st); if (i >= 0) S.stamps.splice(i, 1); });
        if (!reduced() && !o.small) { sky.classList.remove('m-cloud-gazer-shake'); void sky.offsetWidth; sky.classList.add('m-cloud-gazer-shake'); }
        sfx('stamp');
        return inner;
      }
      function curPoseWord(c) { const k = curPose(c); return k === 'you' ? 'person' : k; }
      function computeR(text, c) {
        const lc = text.toLowerCase(), pose = curPose(c), kw = KW[pose], at = Math.abs(S.tilt);
        if (kw) {
          if (kw.k.some(function (w) { return lc.indexOf(w) >= 0; })) return 70 + ri(0, 24);
          if (at >= 60 && at <= 120 && kw.a.some(function (w) { return lc.indexOf(w) >= 0; })) {
            if (at >= 85 && at <= 95 && pose === 'rabbit') { api.achieve('cloud-gazer.tilt90'); later(900, function () { speak(pick('tiMtn'), { mood: 'smug' }); }); }
            return 70 + ri(0, 24);
          }
        }
        let R = hash(lc.trim()) % 41; const len = Array.from(text).length;
        if (len >= 5 && len <= 12) R += 5;
        if (S.squintEase > 0.5) R += 8;
        return Math.min(94, R);
      }
      function gradeNormal(cert) {
        let idx = BASE_IDX[cert] + (chance(0.5) ? 0 : ri(-1, 1));
        return clamp(idx, 0, 10);
      }
      function seeMeText() { for (let i = 0; i < SEEME.length; i++) if (S.seeMe >= SEEME[i][0]) return SEEME[i][1]; return 'See me.'; }
      function setClip(grade, R, note) {
        S.clip.grade = grade; S.clip.R = R; S.clip.note = note || ''; cgEl.textContent = grade || '-'; resEl.textContent = R === null || R === undefined ? 'GPA: weather' : 'Resemblance: ' + R + '%';
        noteEl.textContent = S.clip.note; paintClip();
      }
      function paintClip() {
        seeEl.hidden = S.seeMe < 1; seeEl.textContent = 'See me: ' + S.seeMe; rabEl.hidden = !S.quotaOn; rabEl.textContent = 'Rabbits issued this hour: ' + Math.min(S.rabbitsHour, 9) + '/2';
        notEl.hidden = !(S.notary && !S.notary.done); srEl.textContent = 'Grade ' + (S.clip.grade || 'none') + '. ' + resEl.textContent + '. ' + S.clip.note;
      }
      function pushReg(label, grade) {
        save.registers.push({ t: mmss(S.beatT), label: label, grade: grade });
        if (save.registers.length > 30) { save.registers.shift(); S.regFullSaid++; if (S.regFullSaid % 4 === 1) later(1800, function () { speak(pick('regFull'), { mood: 'neutral' }); }); }
        if (!regEl.hidden) paintReg();
      }
      function paintReg() {
        while (regList.firstChild) regList.removeChild(regList.firstChild);
        if (!save.registers.length) { regList.appendChild(el('li', { text: 'The drawer is empty. It is not sad about it.' })); return; }
        save.registers.slice().reverse().forEach(function (r) { regList.appendChild(el('li', { text: r.t + ' ' + (r.label || '(nothing)') + ' (' + r.grade + ')' })); });
      }
      function toggleReg(force) {
        const open = force === undefined ? regEl.hidden : !!force; regEl.hidden = !open; regBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
        if (open) { paintReg(); sfx('pop'); if (S.fired.b3 && !S.fired.regRead) { S.fired.regRead = true; } }
        noteInput();
      }
      function ledgerLine(n) {
        if (n === 50) return pick('tc50'); if (n === 25) return pick('tc25'); if (n === 10) return pick('tc10');
        if (n === 1) return pick('tc1'); if (n === 2) return pick('tc2'); if (n === 3) return pick('tc3'); return F('tcMore', { n: n });
      }
      function paintShelf() {
        while (shelf.firstChild) shelf.removeChild(shelf.firstChild);
        const cols = ['#d9453d', '#7fd8b5', '#f2b632', '#b79ae6', '#8fd3f4', '#ff6b5e'];
        for (let i = 0; i < Math.min(12, S.ledger); i++) shelf.appendChild(el('span', { class: 'm-cloud-gazer-book', style: { height: (14 + (i * 5) % 13) + 'px', background: cols[i % cols.length] } }));
        shelfTag.hidden = S.ledger < 10; shelfBox.hidden = !(S.fired.b3 || S.fired.shelf || S.ledger > 0);
      }
      function fileLabel(c, rawIn, cert) {
        const now = api.now(); const text = sanitize(rawIn), lc = text.toLowerCase(), label = text || '...'; const wasLabelled = !!c.label && !c.label.swap && !c.label.pretag; const fast = now - S.lastFilingAt < 4000 && S.lastFilingAt > 0;
        S.lastFilingAt = now; S.labels++; S.cycleLabels++; S.gradings++; api.stat.inc('cloud-gazer.labels');
        if (cert <= 2) api.stat.inc('cloud-gazer.hedged');
        if (cert === 5) api.stat.inc('cloud-gazer.bold');
        if (!save.firstLabel && text) save.firstLabel = text;
        api.achieve('cloud-gazer.first'); noteAction();
        if (S.mode !== 'play') return;
        if (text) S.used[text] = (S.used[text] || 0) + 1;
        if (Object.keys(S.used).length > 120) { const ks = Object.keys(S.used).sort(function (a, b) { return S.used[a] - S.used[b]; }); for (let i = 0; i < 40; i++) delete S.used[ks[i]]; }
        const chipHit = S.chipFill && S.chipFill === lc; if (chipHit) S.chipReuse++; const oldLabel = c.label; const oldInk = !!(oldLabel && oldLabel.inkRun);
        const vars = { label: label, grade: '', R: 0, n: 0, pose: curPoseWord(c), deg: Math.round(S.tilt) };
        const lines = []; let grade = 'B+', R = null, stampTxt = '', sub = pick('stampSub'), award = 0.2, mood = 'neutral', smudge = false, notes = null, normal = false, rightFirst = false;
        /* relabel bookkeeping */
        if (wasLabelled) {
          c.relabels++; api.stat.inc('cloud-gazer.relabels');
          pushReg(oldLabel.text, oldLabel.grade || 'Pending');
          if (c.relabels === 1) lines.push(pick('free'));
          else { api.award(-0.1, 'relabel fee'); lines.push(pick('fee')); }
          if (c.relabels === 3) lines.push(pick('third'));
          if (c.dennis && c.relabels === 1 && lc !== 'leaf') lines.push(pick('dennisOver'));
          if (oldInk) { api.award(0.3, 'continuity'); lines.push(pick('relabel')); }
        }
        if (c.kind === 'you' && /examiner|pruitt/i.test(lc)) { examinerSecret(c, text); return; }
        if (c.kind === 'you') { grade = 'B'; lines.unshift(F('youLabel', vars)); award = 0.6; c.gradedAt = now; if (!S.fired.youGraded) { S.fired.youGraded = true; later(3200, function () { speak(pick('youGraded'), { mood: 'neutral' }); }); } }
        else if (c.kind === 'gerald') { grade = 'Pending'; award = c.bonusPaid ? 0.2 : 1; c.bonusPaid = true; api.achieve('cloud-gazer.gerald'); api.flag.set('cloud-gazer.gerald', true); api.stat.inc('cloud-gazer.geraldLabels'); lines.unshift(pick('gerald')); later(1800, function () { say3(pick('geraldSay'), 'Gerald', 'smug'); }); if (api.flag.get('metGerald')) later(4200, function () { speak(pick('geraldMet'), { mood: 'shaken' }); }); }
        else if (c.kind === 'moustache') { grade = 'Disputed'; stampTxt = 'DISPUTED'; award = c.bonusPaid ? 0.2 : 6; c.bonusPaid = true; api.achieve('cloud-gazer.moustache'); lines.unshift(pick('moust')); later(2600, function () { speak(pick('moustAfter')); }); }
        else if (!text) { grade = 'Pending'; award = 0.1; lines.unshift(pick('empty')); }
        else if (lc.indexOf('moist') >= 0) { grade = 'Moist'; stampTxt = 'MOIST'; lines.unshift(pick('moist')); }
        else {
          normal = true;
          R = computeR(text, c); vars.R = R;
          if (R >= 70 && !S.fired.rightOnce) { S.fired.rightOnce = true; rightFirst = true; api.award(1, 'being right, once'); }
          if (R < 5) { grade = 'A'; lines.push(F('anti', vars)); }
          else if (chance(1 / 12)) { grade = 'Pending'; lines.push(pick('pending')); }
          else {
            const gi = gradeNormal(cert);
            if (gi === 10) { grade = 'B+'; smudge = true; stampTxt = 'A-'; notes = 'Ink issue.'; lines.push(pick('aminus')); }
            else grade = GRADES[gi];
            vars.grade = grade;
            if (!smudge) { if (R >= 70 && chance(0.5)) lines.push(F('resHigh', vars)); else lines.push(F('g' + cert, vars)); }
            if (chance(0.4)) lines.push(chance(0.35) && R < 70 ? F('resMid', vars) : F('follow', vars));
          }
          award = 0.2 + R / 40;
        }
        vars.grade = grade; const minor = []; const isTC = /^(a |the )?cloud$/i.test(text);
        if (isTC) {
          S.ledger++; save.ledgerBooks = S.ledger; api.stat.inc('cloud-gazer.technicallyCorrect'); S.fired.shelf = true; paintShelf();
          lines.unshift(ledgerLine(S.ledger)); award = Math.max(award, 0.3);
        }
        if (/\bdog\b/.test(lc)) { S.dogs++; api.stat.inc('cloud-gazer.dog'); if (S.dogs === 3) lines.unshift(pick('dog3')); else if (S.dogs > 3) lines.unshift(pick('dog4')); }
        if (/\brain/.test(lc)) { lines.unshift(pick('rain')); weatherFx(); }
        else if (/storm|weather/.test(lc)) { lines.unshift(pick('storm')); later(2800, function () { speak(pick('umbrella')); }); weatherFx(); }
        if (/\bsky\b/.test(lc)) { lines.unshift(pick('sky')); setMood('shaken'); }
        if (lc.indexOf('management') >= 0) { later(300, function () { mgmt(pick('mgmtS'), { mood: 'confused' }); }); lines.unshift(pick('mgmtP')); c.clip = now + 3000; }
        if (/\bgerald\b/.test(lc) && !api.flag.get('metGerald') && c.kind !== 'gerald') lines.unshift(pick('geraldWho'));
        if (/see me/.test(lc)) { api.achieve('cloud-gazer.seeme'); lines.unshift(pick('coat')); coat.classList.add('m-cloud-gazer-on'); S.coat = true; }
        L.react.some(function (r) { if (r[0].test(lc)) { lines.unshift(F(r[1], vars)); return true; } return false; });
        if (/toast/.test(lc) && api.flag.get('metToaster')) later(5200, function () { speak(pick('toasterCb'), { mood: 'smug' }); });
        if (/7\s?1\s?\/\s?2|7\.5|7½|seven[\s-]+and[\s-]+a[\s-]+half/.test(lc) ) halfSecret(lines);
        if (/rabbit|bunny|\bhare\b/.test(lc)) {
          api.stat.inc('cloud-gazer.rabbits');
          if (S.quotaOn) {
            if (now - S.rabbitWin > 180000) { S.rabbitWin = now; S.rabbitsHour = 0; }
            S.rabbitsHour++; vars.n = Math.min(S.rabbitsHour, 2);
            lines.unshift(S.rabbitsHour > 2 ? pick('quota') : F('rabbit', vars));
          }
        }
        if (wasLabelled && text && text.toLowerCase() === S.lastLabelLc) minor.push(F('repeat', vars));
        else if (text && text.toLowerCase() === S.lastLabelLc) minor.push(F('repeat', vars));
        if (chipHit && S.chipReuse % 3 === 0) minor.push(F('chip', vars));
        if (Array.from(text).length >= 20) minor.push(pick('long'));
        if (/\d/.test(text)) minor.push(pick('digit'));
        if (text.length >= 3 && text === text.toUpperCase() && /[A-Z]/.test(text)) minor.push(pick('caps'));
        if (S.squintEase > 0.5) minor.push(pick('squinted'));
        if (fast) minor.push(pick('fast'));
        if (minor.length && chance(0.7)) lines.splice(Math.min(1, lines.length), 0, minor[0]);
        S.lastLabelLc = lc;
        /* the tag */
        const prevCert = c.label && c.label.certainty;
        c.label = { text: c.kind === 'you' ? api.player.name : label, typed: label, certainty: cert, poseAtLabel: curPose(c), grade: grade, inkRun: false, filedAt: now, appealed: false, examiner: false };
        c.gradedAt = now;
        S.appealTgt = { cloud: c, label: c.label }; appealBtn.disabled = false; appealBtn.textContent = 'Appeal';
        if (prevCert === undefined) { /* first label of this cloud */ }
        /* stamp ceremony */
        const first = S.firstStamp;
        if (first) { S.firstStamp = false; lines.unshift(pick('firstStamp')); }
        const stText = stampTxt || (grade.length > 3 ? grade.toUpperCase().slice(0, 8) : grade);
        const inner = showStamp(stText, c, { sub: sub, mirror: first });
        if (smudge && inner) {
          later(700, function () { inner.classList.add('m-cloud-gazer-smudge'); });
          later(1000, function () { inner.textContent = 'B+'; inner.classList.remove('m-cloud-gazer-smudge'); });
        }
        /* notes, clipboard */
        let note = notes || '';
        if (!note) {
          if (S.gradings === 3 || (cert > 2 && chance(0.35))) { S.seeMe++; api.stat.inc('cloud-gazer.seeMeNotes'); note = seeMeText(); if (S.seeMe === 10) later(5200, function () { speak(pick('dbook'), { mood: 'confused' }); }); }
          else if (cert <= 2) note = 'You hedged.';
          else if (cert === 5 && chance(0.6)) note = 'Noted.';
          else if (chance(0.5)) note = pick('notes');
        }
        setClip(grade, R, note);
        /* speech: first line now, a second a moment later */
        if (!lines.length) lines.push(F('g' + cert, vars));
        speak(lines[0], { mood: grade === 'A' ? 'confused' : (cert >= 4 ? 'smug' : 'neutral'), priority: 1 });
        if (lines[1]) later(3200, function () { speak(lines[1], { mood: 'neutral' }); });
        if (rightFirst) {
          const base = lines[1] ? 6400 : 3500, setupDone = !!S.fired.tm2; /* tm2 is the 0:50 'speech prepared' beat */
          if (!setupDone) later(base, function () { speak(pick('rightOnce'), { mood: 'quiet', priority: 1 }); });
          later(base + (setupDone ? 0 : 3600), function () { speak(pick('well'), { mood: 'shaken', priority: 1 }); });
          later(base + (setupDone ? 3600 : 7000), function () { speak(pick('wellAfter'), { mood: 'quiet' }); });
        }
        if (S.gradings === 3) later(lines[1] ? 6600 : 3600, function () { speak(pick('dissent'), { mood: 'smug', priority: 1 }); });
        else if (S.gradings > 3 && S.gradings % 11 === 0 && !lines[1]) later(3200, function () { speak(pick('dissent'), { mood: 'smug' }); });
        /* pell */
        if (S.pellHere && S.mode === 'play' && chance(0.4)) later(lines[1] ? 6500 : 3400, function () {
          const pl = pick(S.pellLevel >= 2 ? 'pell2' : S.pellLevel === 1 ? 'pell1' : 'pell0');
          say3(pl.replace(/^Trainee Pell:\s*/, ''), 'Trainee Pell', 'neutral'); S.pellN++;
          if (S.pellN % 3 === 0) later(2600, function () { speak(pick('pellRet')); });
        });
        /* rare wrong label */
        if (normal && chance(1 / 40)) later(1500, function () { cloudSays(c, pick('wrongBub')); setMood('smug'); pic.setAttribute('data-mood', 'smug'); api.award(1, 'the cloud has opinions'); later(1000, function () { speak(pick('wrongP'), { mood: 'smug' }); }); });
        if (normal && now - S.lastAsk > 90000 && chance(1 / 30)) cloudAsks(c);
        /* awards and stats */
        award = Math.max(0.05, award); api.award(award, 'filing'); sfx('blip'); pushReg(label, grade);
        if (S.fired.b8 && S.labels % 5 === 0) armNotary(true);
        const total = api.stat.get('cloud-gazer.labels');
        if (total % 10 === 0) later(1400, rankUp);
        refreshChips(); writeSave();
        if (S.cycleLabels >= 60) { /* director notices */ }
      }
      function halfSecret(lines) {
        api.stat.inc('cloud-gazer.halfway'); lines.unshift(pick('half1')); api.flag.set('cloud-gazer.halfway', true);
        later(4300, function () { speak(pick('half2'), { mood: 'quiet', priority: 1 }); });
        later(8200, function () { mgmt(pick('half3'), { mood: 'proud' }); });
        api.achieve('cloud-gazer.halfway'); sfx('bell'); api.confetti();
      }
      function cloudAsks(c) {
        const cs = S.clouds.filter(function (x) { return x !== c && x.kind === 'normal' && x.alpha > 0.5 && !x.leaving; });
        if (!cs.length) return; S.lastAsk = api.now(); const o = cs[ri(0, cs.length - 1)], pr = pick('cask'); api.stat.inc('cloud-gazer.cloudAsks');
        later(2800, function () { cloudSays(o, pr[0]); sfx('pop'); api.award(0.5, 'the cloud has opinions'); later(1500, function () { speak(pr[1], { mood: 'confused', priority: 1 }); }); });
      }
      function cloudSays(c, text) {
        const p = toScreen(c.x, c.y - c.S * K);
        const b = el('div', { class: 'm-cloud-gazer-say', text: text }); b.style.transform = 'translate(' + clamp(p[0], 60, W - 120) + 'px,' + Math.max(p[1] - 40, 10) + 'px)';
        fx.appendChild(b); later(3200, function () { if (b.parentNode) b.parentNode.removeChild(b); });
      }
      function weatherFx() {
        const drop = el('span', { class: 'm-cloud-gazer-drop', 'aria-hidden': 'true', text: '💧' });
        form.appendChild(drop); later(1000, function () { if (drop.parentNode) drop.parentNode.removeChild(drop); });
        const fl = el('div', { class: 'm-cloud-gazer-flash' }); fx.appendChild(fl); later(260, function () { if (fl.parentNode) fl.parentNode.removeChild(fl); });
      }
      function rankUp() {
        if (S.mode !== 'play') return;
        save.rankIdx++; const rn = rankName(save.rankIdx); rankEl.textContent = rn; const top = rn === 'Principal Interpreter of the Visible';
        speak(top ? pick('rankTop') : F('rank', { rank: rn }), { mood: 'proud', priority: 1 });
        api.award(1.5, 'rank'); sfx('tada'); writeSave();
      }
      function doAppeal() {
        const t = S.appealTgt; if (!t || t.label.appealed || S.mode !== 'play') return; t.label.appealed = true; appealBtn.disabled = true; api.stat.inc('cloud-gazer.appeals'); api.award(0.3, 'appeal'); sfx('ding');
        speak(pick('appeal'), { mood: 'smug' });
      }
      /* ---------- examiner secret ---------- */
      function examinerSecret(c, text) {
        const now = api.now();
        c.label = { text: api.player.name, typed: text, certainty: 3, poseAtLabel: 'you', grade: 'Pending', inkRun: false, filedAt: now, appealed: true, examiner: true };
        S.exam = true; S.frozen = true; S.busyUntil = now + 11500; closeForm(); pic.setAttribute('data-mood', 'neutral');
        speak('...', { force: true, priority: 1 });
        showStamp('PENDING', c, { slow: true });
        later(1000, function () { speak('...', { force: true }); });
        later(2000, function () { speak(pick('ex1'), { force: true, mood: 'shaken', priority: 1 }); });
        later(3500, function () { speak('...', { force: true }); });
        later(4500, function () { speak(pick('ex2'), { force: true, priority: 1 }); api.award(api.flag.get('cloud-gazer.examiner') ? 1 : 15, 'a moment, taken twice'); api.flag.set('cloud-gazer.examiner', true); api.achieve('cloud-gazer.examiner'); api.stat.inc('cloud-gazer.examinerSecret'); sfx('ding'); setClip('A, Pending', null, 'Pending indefinitely.'); });
        later(6500, function () { speak(pick('ex3'), { force: true, mood: 'quiet' }); });
        later(7000, function () { S.silT0 = api.now(); });
        later(7600, function () { speak(pick('ex4'), { force: true, mood: 'shaken', priority: 1 }); });
        later(11000, function () { S.exam = false; S.frozen = false; pic.setAttribute('data-mood', 'neutral'); });
        writeSave();
      }
      /* ---------- notary ---------- */
      function armNotary(silent) {
        if (S.notary && !S.notary.done) return;
        S.notary = { until: api.now() + 20000, done: false, cloud: null }; paintClip();
        if (!silent) speak(pick('notaryNew'));
      }
      function countersign() {
        if (!S.notary || S.notary.done) return;
        S.notary.done = true; S.notary = null; paintClip(); api.award(0.5, 'countersignature'); sfx('stamp'); api.stat.inc('cloud-gazer.countersigned');
        speak(pick('notaryOk'), { mood: 'proud' });
        if (chance(0.4)) later(3400, function () { speak(pick('sandraNot'), { mood: 'neutral' }); });
      }
      /* ---------- squint and tilt ---------- */
      function unlock(what) {
        if (what === 'squint') { S.squintOK = true; sqBtn.classList.remove('m-cloud-gazer-locked'); sqBtn.removeAttribute('aria-disabled'); sqBtn.textContent = 'Squint (hold)'; }
        else { S.tiltOK = true; tiltW.classList.remove('m-cloud-gazer-locked'); slider.removeAttribute('aria-disabled'); paintTiltLabel(); }
        paintHint();
      }
      function paintHint() {
        if (S.sel && S.gradings < 2) { hint.textContent = 'Type it. Pick how sure you are, 1 to 5. File It.'; return; }
        hint.textContent = (S.cycle > 0 ? 'Session ' + (S.cycle + 1) + ' of 1. ' : '') + 'Click a cloud. Say what it resembles.' + (S.squintOK ? ' Hold Space to squint.' : '') + (S.tiltOK ? ' Q/E to tilt.' : '');
      }
      function startSquint() {
        if (S.mode !== 'play' || S.squintHeld) return;
        if (!S.squintOK) {
          S.earlySq++; speak(S.earlySq === 1 ? pick('sqE1') : S.earlySq === 2 ? pick('sqE2') : pick('sqE3'), { mood: 'neutral' });
          if (S.earlySq >= 3) unlock('squint');
          return;
        }
        S.squintHeld = true; S.squintT = 0; S.squintSec = 0; S.floaterT = 0;
        if (!S.fired.sqAllow) { S.fired.sqAllow = true; later(900, function () { speak(pick('sqAllow')); }); }
      }
      function stopSquint() {
        if (!S.squintHeld) return;
        S.squintHeld = false;
        if (S.squintT >= 3) api.award(0.1, 'squint released');
        S.sqCount++;
        if (S.floaters.length) S.floaterFade = 1;
        if (S.sqCount <= 3 || chance(0.25)) speak(pick('sqRel'), { mood: 'smug' });
      }
      function onSqClick(e) {
        if (S.ptrSquint) { S.ptrSquint = false; return; }
        if (api.now() - (S.sqUpAt || -1e9) < 400) return; /* the pointer press already did the squinting; this click is its echo */
        if (!S.squintHeld) { startSquint(); later(1300, stopSquint); }
      }
      function tiltTo(deg) {
        S.tiltTarget = norm(deg); api.stat.max('cloud-gazer.tiltMax', Math.abs(S.tiltTarget)); slider.value = S.tiltTarget; paintTiltLabel();
      }
      function paintTiltLabel() { if (!S.tiltOK) { tiltLbl.textContent = 'Head Tilt (Section 9: not yet)'; return; } tiltLbl.textContent = Math.abs(S.tilt) >= 170 || Math.abs(S.tiltTarget) >= 170 ? 'Sky (Floor)' : 'Head Tilt: ' + Math.round(S.tiltTarget) + ' degrees'; }
      function tiltBy(d) {
        if (S.mode !== 'play') return;
        if (!S.tiltOK) { S.earlyTi++; speak(S.earlyTi === 1 ? pick('tiE1') : S.earlyTi === 2 ? pick('tiAllow') : pick('tiE3'), { mood: 'neutral' }); if (S.earlyTi >= 3) unlock('tilt'); return; }
        tiltTo(S.tiltTarget + d);
        if (Math.abs(S.tiltTarget) >= 45 && !S.fired.sol) { S.fired.sol = true; pic.classList.add('m-cloud-gazer-tilted'); later(1500, function () { pic.classList.remove('m-cloud-gazer-tilted'); }); later(1800, function () { speak(pick('tiSol'), { mood: 'smug' }); }); }
        if (Math.abs(S.tiltTarget) >= 85 && Math.abs(S.tiltTarget) <= 95 && !S.fired.t90) { S.fired.t90 = true; later(1200, function () { speak(pick('ti90')); }); }
        if (Math.abs(S.tiltTarget) >= 30 && Math.abs(S.tiltTarget) < 150 && S.speaks % 4 === 0 && chance(0.3)) speak(F('tiDeg', { deg: Math.round(S.tiltTarget) }));
      }
      function onSlider() {
        noteInput(); const v = Number(slider.value);
        if (!isFinite(v)) return;
        if (!S.tiltOK) { slider.value = 0; tiltBy(0); return; }
        if (S.mode !== 'play') { slider.value = S.tiltTarget; return; }
        tiltTo(v);
      }
      function onWheel(e) {
        if (!S.tiltOK || S.mode !== 'play' || !e.shiftKey) return; /* plain wheel scrolls the page; Shift+wheel tilts */
        e.preventDefault(); noteInput(); tiltBy((e.deltaY || e.deltaX) > 0 ? 5 : -5);
      }
      /* ---------- special clouds / events ---------- */
      function evYou() {
        if (S.curYou && S.clouds.indexOf(S.curYou) >= 0) return;
        const c = makeCloud('you', { x: visLeft() + W * 0.1, y: visTop() + H * 0.55, S: 80 });
        S.curYou = c; S.youSeen++; api.stat.inc('cloud-gazer.youClouds');
        speak(pick('you1'), { mood: 'shaken', priority: 1 });
        later(2600, function () { mgmt(pick('youPanic'), { mood: 'panic' }); });
        later(5200, function () { speak(F('youMoment'), { mood: 'neutral' }); });
        [0, 200, 400, 600, 800].forEach(function (d, i) { later(d, function () { sfx(['tick', 'blip', 'bell', 'blip', 'tick'][i]); }); });
        if (S.pellHere) { S.pellHere = false; pellEl.hidden = true; later(7600, function () { speak(pick('pellLeaves'), { mood: 'neutral' }); }); }
      }
      function evBackward() {
        const cs = S.clouds.filter(function (c) { return c.kind === 'normal' && !c.label && !c.leaving; });
        if (!cs.length) return; const c = cs[0]; c.backUntil = api.now() + 8000; speak(pick('backward'), { mood: 'disappointed' });
      }
      function evSunbeam() { S.sun.beam = api.now() + 6000; speak(pick('sunbeam'), { mood: 'neutral' }); sfx('whoosh'); }
      function evRabbitDim() {
        S.dimUntil = api.now() + 5000; S.dimBack = true;
        spawnKind('normal', { pose: 'rabbit', x: visLeft() + W * 0.2, y: visTop() + H * 0.5 }).morphT = 1e9;
        speak(pick('rabDim'), { mood: 'disappointed' });
      }
      function evReturned() { if (S.archive.length) spawnKind('returned'); }
      function evLoop() {
        const k = ri(0, 7);
        if (k === 0) evYou(); else if (k === 1) forceMorph(); else if (k === 2) evBackward(); else if (k === 3) evSunbeam();
        else if (k === 4) evReturned(); else if (k === 5) { if (chance(0.5)) sandraCites(); else speak(pick('sandra'), { mood: 'neutral' }); } else if (k === 6) speak(pick('windU'), { mood: 'neutral' });
        else speak(pick('ambient'), { mood: 'neutral' });
      }
      function ucPoke() {
        sfx('pop'); speak(pick('ucClick'), { mood: 'confused' });
        const u = S.uc; if (!u || fx.querySelectorAll('.m-cloud-gazer-ucfall').length > 4) return;
        const t = el('div', { class: 'm-cloud-gazer-ucfall', text: 'cloud' }); t.style.left = Math.round(u.x - 18) + 'px'; t.style.top = Math.round(u.y - 24) + 'px';
        fx.appendChild(t); later(1000, function () { if (t.parentNode) t.parentNode.removeChild(t); });
        later(1100, function () { speak(pick('ucFall')); });
      }
      function popFloater(f) {
        const i = S.floaters.indexOf(f); if (i >= 0) S.floaters.splice(i, 1); api.stat.inc('cloud-gazer.floaters'); sfx('pop');
        showStamp('NOT OUR DEPARTMENT', null, { small: true, at: [f.x, f.y] });
        if (!S.fired.floaterClick) { S.fired.floaterClick = true; speak(pick('floaterClick'), { mood: 'smug' }); }
      }
      function popMicro(x, y) {
        let hit = null;
        for (let i = S.micro.length - 1; i >= 0; i--) if (Math.hypot(S.micro[i].x - x, S.micro[i].y - y) < S.micro[i].r + 6) { hit = S.micro[i]; break; }
        if (!hit) return;
        S.micro.splice(S.micro.indexOf(hit), 1); /* pops are real: the micro-cloud is gone */
        sfx('pop'); S.microPops++; api.stat.inc('cloud-gazer.microPops');
        const sp = S.spam;
        if (sp && !sp.cleared && !S.micro.length) {
          sp.cleared = true; api.award(2, 'The Sky Was Admired'); api.stat.inc('cloud-gazer.spamClears');
          speak(pick('stopAll'), { mood: 'panic', priority: 2 }); later(3800, function () { speak(pick('stopClear'), { mood: 'neutral', priority: 1 }); });
          later(6200, function () { if (S.mode === 'spam') endSpam(); });
          return;
        }
        if (sp && sp.phase === 1 && !sp.cleared) {
          const left = {}; S.micro.forEach(function (m) { left[m.letter] = 1; });
          const word = 'STOP'.split('').filter(function (ch, i) { return left[i]; }).join('');
          if (word !== sp.word) { sp.word = word; if (word === 'STP') speak(pick('stopP'), { mood: 'confused', priority: 1 }); else if (word === 'TOP') speak(pick('stopTop'), { mood: 'smug', priority: 1 }); else if (word === 'OP') speak(pick('stopOp'), { mood: 'confused', priority: 1 }); }
        }
        if (S.microPops === 10) speak(pick('microPop10'), { mood: 'confused' }); else if (S.microPops === 30) speak(pick('microPop30'), { mood: 'disappointed' });
        if (fx.querySelectorAll('.m-cloud-gazer-say').length > 7) return;
        const b = el('div', { class: 'm-cloud-gazer-say', text: pick('microSay') }); b.style.transform = 'translate(' + clamp(hit.x - 20, 4, W - 70) + 'px,' + clamp(hit.y - 24, 4, H - 24) + 'px)';
        fx.appendChild(b); later(1500, function () { if (b.parentNode) b.parentNode.removeChild(b); });
      }
      /* spam */
      function checkSpam() {
        const now = api.now();
        if (S.mode !== 'play') return;
        if (now - S.lastSpam < 90000) { if (now - S.lastTired > 12000) { S.lastTired = now; speak(pick('spamTired'), { mood: 'disappointed', priority: 1 }); } return; }
        S.lastSpam = now; S.mode = 'spam'; S.spamN++; S.microPops = 0; closeForm(); modeClass(); api.award(-0.2, 'Rapid Labelling Surcharge'); sfx('bell'); api.stat.inc('cloud-gazer.spam'); api.achieve('cloud-gazer.rapid');
        speak(S.spamN > 1 ? pick('spam0b') : pick('spam0'), { mood: 'panic', priority: 1 });
        S.spam = { t0: now, phase: 0, cleared: false, word: 'STOP' };
        S.clouds.forEach(function (c) { if (c.kind !== 'you' || true) { c.leaving = true; c.vx = 150; } });
        S.micro = [];
        for (let i = 0; i < 40; i++) {
          const edge = ri(0, 3);
          const x = edge === 0 ? -20 : edge === 1 ? W + 20 : api.rand() * W, y = edge === 2 ? -20 : edge === 3 ? H + 20 : api.rand() * H;
          S.micro.push({ x: x, y: y, tx: 30 + api.rand() * (W - 60), ty: 30 + api.rand() * (H - 60), r: ri(10, 16) });
        }
        later(2500, function () { speak(pick('spam1'), { mood: 'panic' }); });
        later(7000, function () { speak(pick('spam2')); });
        later(12000, function () { speak(pick('spam3')); });
      }
      function stopTargets() {
        const cell = Math.min((W * 0.86) / 15, (H * 0.6) / 5), ox = (W - 15 * cell) / 2 + cell / 2, oy = (H - 5 * cell) / 2 + cell / 2, out = [];
        'STOP'.split('').forEach(function (ch, li) { const g = FONT[ch]; for (let r = 0; r < 5; r++) for (let c2 = 0; c2 < 3; c2++) if (g[r].charAt(c2) === '#') out.push([ox + (li * 4 + c2) * cell, oy + r * cell, li]); });
        return { pts: out, r: cell * 0.46 };
      }
      function tickSpam(now) {
        const sp = S.spam; if (!sp || sp.cleared) return; const t = now - sp.t0;
        if (sp.phase === 0 && t >= 16000) {
          sp.phase = 1; const tg = stopTargets(), n = S.micro.length;
          /* survivors spread over the whole word, so every letter still forms however many were popped */
          S.micro.forEach(function (m, i) { const p = tg.pts[Math.floor(i * tg.pts.length / n)]; m.tx = p[0]; m.ty = p[1]; m.letter = p[2]; m.r = Math.max(4, Math.min(m.r, tg.r)); });
          speak(pick('spam4'), { mood: 'panic', priority: 1 });
          later(4000, function () { speak(pick('spam5'), { mood: 'panic', priority: 1 }); });
          later(7000, function () { speak(pick('spam6')); });
        }
        if (sp.phase === 1 && t >= 24000) endSpam();
      }
      function endSpam() {
        if (S.mode !== 'spam') return;
        S.spam = null; S.micro = []; S.mode = 'play'; modeClass();
        S.clouds.slice().forEach(function (c) { if (c.leaving) removeCloud(c, false); });
        for (let i = 0; i < 4; i++) makeCloud('normal', { x: visLeft() + W * (0.1 + 0.22 * i), alpha: 0 });
        api.award(4, 'Rapid Resemblance'); sfx('ding');
        speak(S.spamN > 1 ? pick('spam7b') : pick('spam7'), { mood: 'neutral', priority: 1 });
      }
      function modeClass() {
        app.classList.toggle('m-cloud-gazer-swapping', S.mode === 'swap');
        if (S.mode !== 'play') closeForm();
      }
      /* idle / away */
      function enterAway() {
        S.mode = 'away'; S.awayAt = api.now(); modeClass(); S.awayCount++; pic.setAttribute('data-mood', 'out'); plaque.textContent = 'EXAMINER OUT: RESEMBLES LUNCH';
        S.clouds.forEach(function (c) { if (!c.label && ['normal', 'returned', 'moustache', 'gerald'].indexOf(c.kind) >= 0) c.awayTag = true; });
        api.stat.inc('cloud-gazer.idles'); api.achieve('cloud-gazer.longlook');
        if (!S.idleAwarded) { S.idleAwarded = true; api.award(12, 'The Long Look'); }
        speak(pick('idle180'), { force: true, priority: 1 });
        later(1800, function () { mgmt(pick('idle180m'), { mood: 'smug' }); });
      }
      function endAway() {
        if (S.mode !== 'away') return;
        S.mode = 'play'; modeClass(); S.frozen = false; pic.setAttribute('data-mood', 'neutral'); plaque.textContent = S.inverted ? 'Lower Examiner' : 'Examiner Pruitt';
        S.clouds.forEach(function (c) { c.awayTag = false; });
        const mins = Math.round((api.now() - S.awayAt) / 1000 * (api.selftest ? 6 : 1) / 60) + 3;
        speak(mins >= 6 ? F('idleBackLong', { n: mins }) : pick('idleBack'), { mood: 'smug', priority: 1 });
      }
      function tinyCloudFromDesk(txt) {
        const t = el('div', { class: 'm-cloud-gazer-say', text: txt || '...' }); t.style.transform = 'translate(' + Math.round(W * 0.2) + 'px,' + (H - 40) + 'px)';
        t.style.animationDuration = '6s'; fx.appendChild(t); later(6200, function () { if (t.parentNode) t.parentNode.removeChild(t); });
      }
      /* inversion */
      function tickInversion(now) {
        const inv = Math.abs(S.tilt) >= 170; paintTiltLabel();
        if (inv) {
          if (!S.invSince) { S.invSince = now; if (!S.invSaid) { S.invSaid = true; speak(pick('inv0'), { mood: 'confused' }); } }
          if (!S.inverted && now - S.invSince >= 10000 && S.mode === 'play') {
            S.inverted = true; plaque.textContent = 'Lower Examiner'; api.stat.inc('cloud-gazer.inversions');
            speak(pick('inv10'), { mood: 'neutral', priority: 1 });
            if (!api.flag.get('cloud-gazer.inverted')) { api.flag.set('cloud-gazer.inverted', true); api.award(8, 'Upside Down'); api.achieve('cloud-gazer.inverted'); }
          }
        } else {
          S.invSince = 0;
          if (S.inverted) { S.inverted = false; if (S.mode !== 'away') plaque.textContent = S.mode === 'swap' ? api.player.name + ', Chief Examiner' : 'Examiner Pruitt'; speak(pick('inv1'), { mood: 'smug' }); }
        }
      }
      /* ---------- the not-ending ---------- */
      function startCert() {
        if (S.mode !== 'play' || S.certDone) return;
        S.certDone = true; S.mode = 'cert'; modeClass(); S.hush = true; const short = S.cycle > 0; S.notary = null; paintClip();
        [0, 400, 800].forEach(function (d) { later(d, function () { sfx('tick'); }); });
        pic.classList.add('m-cloud-gazer-stand');
        later(1500, function () {
          const cont = el('button', { class: 'm-cloud-gazer-btn m-cloud-gazer-go', type: 'button', text: 'Continue', hidden: true, onclick: function () { onContinue(); } });
          const card = el('div', { class: 'm-cloud-gazer-certc', role: 'group', 'aria-label': 'Certificate' }, el('div', { class: 'm-cloud-gazer-certb' }, el('div', { class: 'm-cloud-gazer-seal' }), el('div', { class: 'm-cloud-gazer-ct', text: 'CERTIFIED PROFESSIONAL CLOUD GAZER (PROVISIONAL)' }), el('p', { text: 'Signed: Examiner Pruitt. Countersigned: the notary cloud. Stamped: the Unlabelled Cloud.' }), el('p', { text: 'Valid until the next cloud.' }), certFacts().map(function (t) { return el('p', { text: t }); }), cont));
          fx.appendChild(card); S.certC = { card: card, cont: cont, t0: api.now(), short: short };
          sfx('fanfare'); api.confetti(); api.toast('confetti');
          speak(short ? L.recert[0] : pick('cert0'), { mood: 'proud', priority: 2 });
          api.award(short ? 8 : 25, 'Certification'); api.achieve('cloud-gazer.certified'); api.stat.inc('cloud-gazer.certified');
          api.flag.set('cloud-gazer.certified', true); save.certified = true; writeSave();
          later(3200, function () { speak(pick('cert1'), { mood: 'smug' }); });
          later(6000, function () { mgmt(pick('certM'), { mood: 'proud' }); });
          later(9500, function () { speak(pick('cert2'), { mood: 'neutral' }); });
          later(3000, function () {
            cont.hidden = false; try { card.scrollTop = card.scrollHeight; } catch (e) { /* ignore */ }
            try { const ae = document.activeElement; if (!ae || ae.tagName === 'BODY' || root.contains(ae)) cont.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
          });
        });
      }
      function certFacts() {
        const real = save.registers.filter(function (r) { return r.label && r.label !== '...' && r.label !== '(the silence)'; });
        let top = null, best = 0; Object.keys(S.used).forEach(function (k) { if (S.used[k] > best) { best = S.used[k]; top = k; } });
        let low = null, li = 99; real.forEach(function (r) { const gi = GRADES.indexOf(r.grade); if (gi >= 0 && gi < li) { li = gi; low = r; } });
        const firsts = []; real.forEach(function (r) { if (firsts.length < 3 && firsts.indexOf(r.label) < 0) firsts.push(r.label); });
        return ['Distinguished in: ' + (top || 'Looking Up'), 'Commended for: ' + (low ? low.label + ' (' + low.grade + ')' : 'Nothing (Pending)'), 'Notable opinions: ' + (firsts.length ? firsts.join(', ') : 'none, which is also an opinion')];
      }
      function onContinue() {
        if (S.mode !== 'cert' || !S.certC) return;
        const c = S.certC; S.certC = null; if (c.card.parentNode) c.card.parentNode.removeChild(c.card); pic.classList.remove('m-cloud-gazer-stand'); S.hush = false; folder.hidden = false;
        if (c.short) {
          S.mode = 'play'; modeClass(); S.cycleLabels = 0; S.certDone = false; S.nextLoop = S.beatT + ri(45, 90);
          speak(L.recert[1], { mood: 'proud' }); later(2600, function () { speak(pick('pellCycle'), { mood: 'neutral' }); });
          for (let i = 0; i < 3; i++) if (S.clouds.length < 5) makeCloud('normal');
        } else startSwap();
      }
      function startSwap() {
        S.mode = 'swap'; modeClass(); closeForm();
        S.clouds.slice().forEach(function (c) { removeCloud(c, false); });
        S.swap = { round: 0, cloud: null, nextAt: api.now() + 900, press: api.now(), dis5: 0, agreed: false };
        pic.classList.add('m-cloud-gazer-swapped'); plaque.textContent = api.player.name + ', Chief Examiner'; agrBtn.disabled = true; agrBtn.classList.remove('m-cloud-gazer-big');
        speak(pick('swap0'), { mood: 'neutral', priority: 2, force: true });
      }
      function tickSwap(now) {
        const sw = S.swap; if (!sw) return;
        if (!sw.cloud && sw.round < 5 && now >= sw.nextAt) {
          const r = sw.round, pose = SWAP_POSES[r];
          const c = makeCloud('chair', { pose: pose, x: visLeft() + W * 0.28, y: visTop() + H * 0.55, S: 78, alpha: 0 });
          c.label = { text: SWAP_LABELS[r], certainty: 3, poseAtLabel: pose, grade: 'Pending', swap: true, inkRun: false };
          c.vx = 6; sw.cloud = c; sw.press = now;
          if (r === 4) { agrBtn.disabled = false; agrBtn.classList.add('m-cloud-gazer-big'); }
          sfx('blip');
        }
        if (now - sw.press > 90000) { mgmt(pick('swapFall'), { mood: 'smug' }); endSwap(true); }
      }
      function swapDisagree() {
        const sw = S.swap; if (S.mode !== 'swap' || !sw || !sw.cloud) return; sw.press = api.now(); noteInput(); if (sw.round < 4 || sw.dis5 < 3) api.award(0.5, 'disagreement'); sfx('ding'); const r = sw.round;
        if (r === 0) speak(S.fired.pruittSelf ? pick('swapFirstSelf') : pick('swapFirst'), { mood: 'neutral', force: true }); else speak(pick('thanks'), { mood: 'smug', force: true });
        if (r < 4) { sw.cloud.leaving = true; sw.cloud.vx = 170; sw.cloud = null; sw.round++; sw.nextAt = api.now() + 1500; }
        else {
          sw.dis5++;
          if (sw.dis5 >= 3) later(1600, function () { speak('Rain.', { mood: 'quiet', force: true }); });
          else cloudSays(sw.cloud, 'Rain.');
        }
      }
      function swapAgree() {
        const sw = S.swap; if (S.mode !== 'swap' || !sw || sw.agreed || agrBtn.disabled) return; sw.agreed = true; sw.press = api.now(); noteInput(); S.quietUntil = api.now() + 4200; S.silentUntil = api.now() + 4000;
        bubble.textContent = pick('agreeN');
        later(4200, function () { S.silentUntil = 0; speak(pick('agreeA'), { mood: 'quiet', force: true, priority: 2 }); api.award(0.5, 'agreement'); later(2600, function () { endSwap(true); }); });
      }
      function swapSeeMe() {
        if (S.mode !== 'swap') return;
        const sw = S.swap; if (!sw || sw.seeMe) return; sw.seeMe = true;
        noteInput(); coat.classList.add('m-cloud-gazer-on'); S.coat = true;
        speak(pick('coat'), { mood: 'smug', force: true, priority: 2 });
        api.award(5, 'See me'); api.achieve('cloud-gazer.seeme'); sfx('ding');
        later(2200, function () { endSwap(true); });
      }
      function endSwap(done) {
        if (S.mode !== 'swap') return;
        S.swap = null; api.stat.inc('cloud-gazer.swaps'); if (done) api.achieve('cloud-gazer.swap'); S.mode = 'reset'; modeClass(); doReset();
      }
      function doReset() {
        const cur = el('div', { class: 'm-cloud-gazer-curtain' }); fx.appendChild(cur); later(1500, function () { if (cur.parentNode) cur.parentNode.removeChild(cur); });
        later(500, function () {
          S.clouds.slice().forEach(function (c) { removeCloud(c, false); });
          for (let i = 0; i < 4; i++) makeCloud('normal', { x: visLeft() + W * (0.1 + 0.22 * i), alpha: 0 });
          pic.classList.remove('m-cloud-gazer-swapped'); plaque.textContent = 'Examiner Pruitt'; agrBtn.disabled = true; agrBtn.classList.remove('m-cloud-gazer-big');
          S.cycle++; save.cycles = S.cycle; S.loop = true; S.cycleLabels = 0; S.certDone = false; S.nextLoop = S.beatT + ri(45, 90);
          S.nightTarget = 0; S.sun.sunsetT = -1; S.sun.swell = 0; S.ucDesk = true; ucDeskEl.hidden = false; S.pellHere = true; S.pellLevel = 2; pellEl.hidden = false; S.hush = false;
          S.mode = 'play'; modeClass(); paintHint(); writeSave();
          speak(pick('reset'), { mood: 'neutral', priority: 1 });
          later(2400, function () { mgmt(pick('resetM'), { mood: 'smug' }); });
          later(4800, function () {
            if (save.firstLabel || true) {
              const txt = save.firstLabel || 'rabbit';
              const c = makeCloud('returned', { x: visLeft() + W * 0.5, y: visTop() + H * 0.4, alpha: 0 });
              c.label = { text: txt, certainty: 3, poseAtLabel: c.pose, grade: 'B+', inkRun: false, filedAt: api.now() };
              if (save.firstLabel) { speak(pick('firstOp'), { mood: 'confused', priority: 1 }); later(4200, function () { speak(pick('resetApol'), { mood: 'smug' }); }); } else speak(pick('resetApol'), { mood: 'smug' });
            }
          });
          later(7500, function () { speak(pick('pellCycle'), { mood: 'neutral' }); });
        });
      }
      /* ---------- director ---------- */
      function at(sec, key, fn) { if (!S.fired[key] && S.beatT >= sec) { S.fired[key] = true; fn(); } }
      function runBeats() {
        const returning = save.certified;
        /* opening: fixed order (welcome, who I am; the explanation arrives with the first selected cloud), a visual joke at 1.5s, a real pulse at 14s */
        at(1.5, 'pretag', function () { const c0 = S.clouds[1]; if (!returning && c0 && c0.kind === 'normal' && !c0.label && S.sel !== c0) c0.label = { text: 'Disputed', certainty: 3, poseAtLabel: c0.pose, grade: 'Pending', inkRun: false, relabelsFree: true, pretag: true }; });
        at(returning ? 4 : 5, 'a2', function () { speak(returning ? pick('ret') : L.open[1], { mood: 'neutral' }); });
        at(returning ? 9 : 20, 'a3', function () { speak(returning ? pick('ret') : L.open[3], { mood: 'neutral' }); });
        at(11, 'm1', function () { mgmt(pick('mount'), { mood: 'proud' }); });
        at(14, 'nudge', function () { if (!S.clickedAny) { const cs = S.clouds.filter(function (c) { return c.kind === 'normal' && !c.label; }); if (cs.length) cs[0].pulseUntil = api.now() + 5000; speak(pick('nudge'), { mood: 'neutral' }); } });
        at(60, 'b3', function () {
          S.fired.b3 = true; paintShelf();
          if (save.registers.length > 2 && chance(0.4)) speak(F('regFirst', { label: save.registers[0].label || 'nothing' }), { mood: 'smug' });
          else if (save.registers.length) { const real = save.registers.filter(function (x) { return x.label && x.label !== '...' && x.label !== '(the silence)'; }), r = real.length ? real[ri(0, real.length - 1)] : { t: '0:00', label: '' }; speak(r.label ? F('regRead', { time: r.t, label: r.label, n: save.registers.length }) : 'The Register holds ' + save.registers.length + ' of your former opinions, none of them words. They are in a drawer.', { mood: 'smug' }); }
          else speak('The Register holds 0 of your former opinions. They are in a drawer. The drawer is not on your side, but it is not against you.', { mood: 'smug' });
        });
        at(88, 'pself', function () {
          if (returning || S.mode !== 'play' || S.clouds.length >= 11) return;
          const c = makeCloud('returned', { pose: 'rabbit', x: visLeft() + W * 0.3, y: visTop() + H * 0.4 }); c.morphT = 1e9; S.fired.pruittSelf = true;
          c.label = { text: 'Rabbit', certainty: 5, poseAtLabel: 'rabbit', grade: 'D', inkRun: false, relabelsFree: true, filedAt: api.now() };
          showStamp('D', c, { sub: 'Self-assessed' }); speak(pick('pself'), { mood: 'shaken', priority: 1 });
          later(4200, function () { mgmt(pick('pselfM'), { mood: 'smug' }); });
        });
        at(105, 'b4', function () { forceMorph(); });
        at(100, 'b5', function () { unlock('squint'); speak(pick('sqUnlock'), { mood: 'neutral', priority: 1 }); S.pellHere = true; pellEl.hidden = false; later(3000, function () { speak('Trainee Pell has entered. He has a lanyard and the manner of someone holding a very small umbrella.', { mood: 'neutral' }); }); });
        at(160, 'b6', function () {
          unlock('tilt'); S.quotaOn = true; paintClip(); S.pellLevel = Math.max(S.pellLevel, 1);
          speak(pick('tiUnlock'), { mood: 'neutral', priority: 1 });
          later(3000, function () { speak(pick('sandraRab'), { mood: 'neutral' }); });
          if (S.pellHere) later(6500, function () { speak(pick('pellP1'), { mood: 'neutral' }); });
        });
        at(255, 'gerald', function () { if (!S.geraldSpawned) spawnKind('gerald'); });
        at(270, 'b7', function () { evYou(); S.nextYou = S.beatT + ri(60, 90); });
        at(330, 'b8', function () {
          S.windOn = true; windEl.hidden = false; S.returnedOK = true;
          speak(pick('notaryNew'), { mood: 'neutral', priority: 1 }); later(3200, function () { speak(pick('form27')); }); later(6400, function () { speak(pick('promo'), { mood: 'proud' }); });
          later(9500, function () { speak(pick('wind')); });
          if (S.pellHere) later(13500, function () { speak(pick('pellP2'), { mood: 'neutral' }); });
        });
        at(345, 'backward', evBackward); at(370, 'sunbeam', evSunbeam); at(395, 'rabdim', evRabbitDim);
        at(400, 'sock', function () { if (!S.sockSeen) spawnKind('sock'); });
        at(420, 'b9', function () { S.ucOn = true; speak(pick('touch'), { mood: 'quiet', priority: 1 }); });
        at(450, 'sunswell', function () { S.sun.swellT = api.now(); S.sun.swell = 0.01; speak(pick('sun0'), { mood: 'quiet', priority: 1 }); S.silentUntil = api.now() + 6000; S.quietUntil = api.now() + 4000; });
        at(480, 'sunset', function () { S.sun.sunsetT = api.now(); S.nightTarget = 1; });
        at(425, 'l1', function () { speak(pick('touch'), { mood: 'quiet' }); });
        at(465, 'l2', function () { speak(pick('touch'), { mood: 'quiet' }); });
        at(500, 'l3', function () { speak(pick('touch'), { mood: 'quiet' }); });
        /* in-between beats: a new one roughly every 20 seconds */
        at(12, 'cb1', function () {
          if (api.flag.get('cloud-gazer.examiner')) speak(pick('retEx'), { mood: 'quiet' });
          else if (api.flag.get('cloud-gazer.halfway')) speak('Room 7 1/2 is still there. I have not told Sandra. I go in on Thursdays.', { mood: 'quiet' });
          else if (api.flag.get('cloud-gazer.inverted')) speak(pick('retInv'), { mood: 'neutral' });
        });
        at(70, 'cbG', function () { if (api.flag.get('metGerald')) speak(pick('geraldLobby'), { mood: 'shaken' }); });
        at(142, 'cbT', function () { if (api.flag.get('metToaster')) speak(pick('toasterNote'), { mood: 'quiet' }); });
        at(180, 'tue', evTuesday);
        at(188, 'cbK', function () { if (api.flag.get('sockSeen') && !S.sockSeen) speak(pick('sockElse'), { mood: 'neutral' }); });
        at(215, 'cbS', function () { if (api.flag.get('metStapler')) speak(pick('staplerNote'), { mood: 'neutral' }); });
        at(300, 'tos', sandraCites);
        at(600, 'acting', evActing);
        TIMED.forEach(function (t, i) {
          if (t[2] === 'L' && !S.loop || t[2] === 'Y' && !S.youSeen) return;
          if (t[0] === 50 && S.fired.rightOnce) { S.fired['tm' + i] = true; return; } /* the 'first time you are right' speech has already been given */
          if (api.now() - S.lastFilingAt < 4000) return; /* never talk over the grade response; it fires on the next tick after the pause */
          at(t[0], 'tm' + i, function () { if (t[2] === 'M') mgmt(t[1], { mood: 'neutral' }); else speak(t[1], { mood: 'neutral' }); });
        });
        if (!S.loop && (S.beatT >= 540 || S.cycleLabels >= 60)) startCert();
      }
      function evTuesday() {
        S.dimUntil = api.now() + 4500; api.stat.inc('cloud-gazer.tuesdays'); sfx('whoosh'); showStamp('TUESDAY', null, { sub: '(provisional)' });
        speak(pick('tue1'), { mood: 'panic', priority: 1 });
        later(3200, function () { speak(pick('tue2'), { mood: 'smug' }); });
        later(6500, function () { mgmt(pick('tue3'), { mood: 'confused' }); });
        api.award(0.5, 'survived a brief Tuesday');
      }
      function evActing() {
        if (S.acting || S.exam || S.mode !== 'play') return;
        S.acting = true; api.stat.inc('cloud-gazer.actingPell');
        speak(pick('actIn'), { mood: 'quiet', priority: 2, force: true });
        later(1800, function () { if (S.mode === 'away' || S.exam) return; S.frozen = true; pic.setAttribute('data-mood', 'out'); plaque.textContent = 'EXAMINER (ACTING): PELL'; sfx('bell'); });
        later(3600, function () { const t = pick('actPell').replace(/^Trainee Pell:\s*/, ''); bubble.textContent = t; say3(t, 'Trainee Pell (Acting)', 'neutral'); });
        later(25000, endActing);
      }
      function endActing() {
        if (!S.acting) return; S.acting = false;
        if (S.mode !== 'away' && !S.exam) { S.frozen = false; pic.setAttribute('data-mood', 'neutral'); if (S.mode === 'play') plaque.textContent = S.inverted ? 'Lower Examiner' : 'Examiner Pruitt'; }
        speak(pick('actOut'), { mood: 'proud', priority: 2, force: true });
        later(3200, function () { mgmt(pick('actOutP'), { mood: 'neutral' }); });
        api.award(5, 'Acting Examiner');
      }
      function sandraCites() {
        speak(pick('sandraTos'), { mood: 'neutral', priority: 1 });
        later(3000, function () { say3(api.line('tosClause'), 'Sandra from Compliance', 'neutral'); });
      }
      function ambientLine() {
        const r = api.rand(), clicks = api.stat.get('clicks.total'), mins = Math.floor(api.stat.get('time.seconds') / 60), sess = api.stat.get('session.count');
        if (r < 0.12 && clicks >= 20) return F('cbClicks', { n: api.fmt(clicks) });
        if (r < 0.22 && mins >= 2) return F('cbTime', { n: mins });
        if (r < 0.28 && sess >= 2) return F('cbSession', { n: sess });
        return pick('ambient');
      }
      function tickPlay(now) {
        if (S.mode !== 'play') return;
        if (S.loop && S.beatT >= S.nextLoop) { S.nextLoop = S.beatT + ri(45, 90); evLoop(); }
        if (S.loop && S.cycleLabels >= 60) startCert();
        if (!S.loop && S.beatT > S.nextYou && S.fired.b7) { S.nextYou = S.beatT + ri(60, 90); evYou(); }
        if (S.ucOn && !S.fired.ucLand && S.pointerAt && now - S.ucStillAt > 20000) { S.fired.ucLand = true; S.ucDesk = true; ucDeskEl.hidden = false; speak(pick('ucDesk'), { mood: 'neutral' }); }
        if (S.sun.swellT && !S.fired.sunThank && now - S.sun.swellT > 6200) { S.fired.sunThank = true; if (!S.sun.clicked) speak(pick('sun1'), { mood: 'quiet' }); }
        if (S.sun.swellT && !S.fired.sunDown && S.sun.swell > 0 && now - S.sun.swellT > 9000) { S.fired.sunDown = true; S.sun.swell = 0; }
        if (S.fired.sunset && !S.fired.sunsetSaid && now - S.sun.sunsetT > 2500) { S.fired.sunsetSaid = true; speak(pick('sunset'), { mood: 'neutral' }); later(3500, function () { speak(pick('night')); }); }
        if (S.dimBack && now > S.dimUntil) { S.dimBack = false; speak(pick('rabBack'), { mood: 'neutral' }); }
        if (S.windOn && now - S.noticeAt > 90000) { S.noticeAt = now; S.noticeIdx = (S.noticeIdx + 1) % NOTICES.length; noticeEl.textContent = NOTICES[S.noticeIdx]; }
        if (S.notary && !S.notary.done && now > S.notary.until) { S.notary = null; paintClip(); if (S.fired.nw !== 2) { S.fired.nw = (S.fired.nw || 0) + 1; speak(pick('notaryNo'), { mood: 'neutral' }); } }
        if (now - S.lastSpokeAt > 20000 && now - S.lastFilingAt > 12000 && !S.exam) speak(ambientLine(), { mood: 'neutral' });
        if (S.nextBirds && now > S.nextBirds) { S.nextBirds = now + 90000; S.birds = { t0: now }; if (!S.fired.birds) { S.fired.birds = true; later(4000, function () { speak(pick('birds')); }); } }
        /* ink run */
        S.clouds.forEach(function (c) {
          if (c.label && !c.label.inkRun && !c.label.swap && !c.label.pretag && c.kind !== 'you' && c.morphProg >= 0.5 && c.pose !== c.label.poseAtLabel) {
            c.label.inkRun = true; api.stat.inc('cloud-gazer.inkRuns'); showStamp('OUT OF DATE', c, { small: true }); sfx('bloop');
            speak(S.fired.inkSaid ? F('inkrun', { label: c.label.text, pose: curPoseWord(c) }) : F('unreliable'), { mood: 'confused' });
            if (!S.fired.inkSaid) { S.fired.inkSaid = true; later(3600, function () { speak(pick('apology')); }); }
          }
        });
      }
      function tickIdle(now) {
        const sec = (now - S.lastInputAt) / 1000 * (api.selftest ? 6 : 1);
        const mark = function (k) { if (S.idleDone[k]) return false; S.idleDone[k] = 1; S.idleN++; return true; };
        if (S.mode === 'play') {
          if (sec >= 30 && mark(30)) speak(pick('idle30'), { mood: 'neutral', priority: 1 });
          if (sec >= 60 && mark(60)) { speak(pick('idle60'), { mood: 'disappointed', priority: 1 }); later(3500, function () { speak(pick('idle60b')); }); tinyCloudFromDesk('...'); }
          if (sec >= 90 && mark(90)) { speak(pick('idle90'), { mood: 'quiet', priority: 1 }); tinyCloudFromDesk('hm'); }
          if (sec >= 120 && mark(120)) { pushReg('(the silence)', 'Pending'); speak(pick('idle120'), { mood: 'quiet', priority: 1 }); }
          if (sec >= 150 && mark(150)) { speak(pick('idle150'), { mood: 'quiet', priority: 1 }); tinyCloudFromDesk('please'); }
          if (sec >= 180 && mark(180)) enterAway();
        } else if (S.mode === 'away') {
          if (sec >= 240 && mark(240)) speak(pick('away240'), { force: true, priority: 1 });
          if (sec >= 300 && mark(300)) { plaque.textContent = 'EXAMINER OUT: RESEMBLES A LONG LUNCH'; speak(pick('away300'), { force: true, priority: 1 }); }
          if (sec >= 420 && mark(420)) { plaque.textContent = 'EXAMINER OUT: RESEMBLES A SEASON'; speak(pick('away420'), { force: true, priority: 1 }); }
          if (sec >= 600 && mark(600)) {
            plaque.textContent = 'EXAMINER OUT: RESEMBLES NOTHING, FONDLY'; speak(pick('away600'), { force: true, priority: 1 });
            later(2600, function () { mgmt(pick('away600m'), { mood: 'proud' }); });
            if (!S.fired.away600) { S.fired.away600 = true; api.award(7.5, 'The Very Long Look'); api.stat.inc('cloud-gazer.veryLongLooks'); }
          }
        }
        S.speedTarget = (sec >= 60 || S.mode === 'away') ? 0.2 : 1;
      }
      function directorTick() {
        if (!alive) return;
        const now = api.now(); let dt = (now - S.lastTick) / 1000; S.lastTick = now; dt = clamp(dt, 0, 2);
        if (document.hidden) return;
        tickIdle(now);
        if (S.mode === 'spam') tickSpam(now);
        if (S.mode === 'swap') tickSwap(now);
        if (S.mode === 'cert' && S.certC && now - S.certC.t0 > 25000) onContinue();
        tickInversion(now);
        if (S.mode === 'play') { S.beatT += dt * (api.selftest ? 8 : 1); runBeats(); tickPlay(now); }
        if (S.mode === 'play' && !S.nextBirds && S.beatT > 20) S.nextBirds = now + 90000;
        if (S.squintHeld) squintTick(dt);
      }
      function squintTick(dt) {
        S.squintT += dt; const sec = Math.floor(S.squintT);
        if (sec > S.squintSec) {
          S.squintSec = sec; api.stat.inc('cloud-gazer.squintSeconds'); sfx('tick');
          if (sec === 7) speak(pick('sq7'), { mood: 'smug' });
          if (sec === 8 && !S.fired.floaterIntro) { S.fired.floaterIntro = true; speak(pick('floaters'), { mood: 'smug' }); }
          if (api.stat.get('cloud-gazer.squintSeconds') === 60) speak(pick('sq60'), { mood: 'smug', priority: 1 });
        }
      }
      /* ---------- frame ---------- */
      function frameUpdate(dt, now) {
        if (now - (S.redAt || -1e9) > 500) { S.redAt = now; S.reducedNow = reduced(); } /* closest()/matchMedia are not free: refresh twice a second */
        const rd = !!S.reducedNow; S.t = now / 1000; S.speedF = lerp(S.speedF, S.speedTarget === undefined ? 1 : S.speedTarget, Math.min(1, dt * 0.8));
        S.tilt = (function () { let d = S.tiltTarget - S.tilt; d = norm(d); const step = 180 * dt; return Math.abs(d) <= step ? S.tiltTarget : norm(S.tilt + Math.sign(d) * step); })();
        S.squintEase = clamp(S.squintEase + (S.squintHeld ? 1 : -1) * dt * 2.5, 0, 1); S.squash = lerp(S.squash, 1, Math.min(1, dt * 5)); if (Math.abs(S.squash - 1) < 0.01) S.squash = 1;
        S.stretch = lerp(S.stretch, 1, Math.min(1, dt * 5)); if (Math.abs(S.stretch - 1) < 0.01) S.stretch = 1; S.night = lerp(S.night, S.nightTarget, Math.min(1, dt * 0.35));
        if (S.sun.swell > 0 && S.sun.swellT) S.sun.swell = clamp(S.sun.swell + dt * 0.3, 0, 1);
        if (S.silT0) { const x = (now - S.silT0) / 4000; if (x >= 1) { S.silT0 = 0; S.silF = 0; } else S.silF = x < 0.25 ? x / 0.25 : x > 0.75 ? (1 - x) / 0.25 : 1; } else S.silF = 0;
        /* clouds */
        const mode = S.mode;
        S.clouds.slice().forEach(function (c) {
          const sp = (c.kind === 'sock' ? 1 : S.speedF) * (rd ? 0.25 : 1) * (S.hush ? 0.05 : 1);
          let vx = c.backUntil > now ? -Math.abs(c.vx) * 1.2 : c.vx;
          c.x += vx * sp * dt;
          c.alpha = clamp(c.alpha + dt * 0.8, 0, 1);
          if (c.kind === 'sock' && Math.hypot(c.x - c.lastTrail, 0) > 40) { c.lastTrail = c.x; c.trail.push({ x: c.x - 30, y: c.y + 20, a: 1 }); if (c.trail.length > 30) c.trail.shift(); }
          if (c.trail.length) c.trail.forEach(function (d) { d.a -= dt * 0.12; });
          if (c.morphProg < 1) { c.morphProg = Math.min(1, c.morphProg + dt / (rd ? 4 : 12)); }
          else if (mode === 'play' && c.morphT < 1e8) { c.morphT -= dt; if (c.morphT <= 0) startMorph(c); }
          const tp = POSES[c.pose], t = c.morphProg < 1 ? (rd ? Math.floor(c.morphProg * 4) / 4 : c.morphProg * c.morphProg * (3 - 2 * c.morphProg)) : 1;
          for (let i = 0; i < 9; i++) { const p = c.puffs[i]; p.cur[0] = lerp(p.from[0], tp[i][0], t); p.cur[1] = lerp(p.from[1], tp[i][1], t); p.cur[2] = lerp(p.from[2], tp[i][2], t); }
          if (c.kind === 'you') {
            c.waveT += dt; if (c.waveT > 5 && S.waves < 3) { c.waveT = 0; S.waves++; speak(S.waves === 1 ? pick('wave1') : pick('wave2'), { mood: 'confused' }); }
            const age = (now - c.born) / 1000;
            if (!c.leaving && (age > 40 || (c.gradedAt && now - c.gradedAt > 15000))) { c.leaving = true; c.vx = 40; }
          }
          if ((c.x > D + 120 || c.x < -500) && mode !== 'swap') removeCloud(c, true);
          else if (c.x > D + 120 || c.x < -500 || (c.leaving && c.x > D + 40 && mode === 'swap')) removeCloud(c, false);
        });
        S.spawnT -= dt;
        if (S.spawnT <= 0 && (mode === 'play' || mode === 'away')) { S.spawnT = 6; const n = S.clouds.filter(function (c) { return !c.leaving && c.kind !== 'sock'; }).length; if (n < S.targetPop) spawnNormal(); }
        if (S.clouds.length < 2 && (mode === 'play' || mode === 'away') && !S.exam) spawnNormal();
        /* micro */
        S.micro.forEach(function (m) { m.x = lerp(m.x, m.tx, Math.min(1, dt * 1.6)); m.y = lerp(m.y, m.ty, Math.min(1, dt * 1.6)); if (S.spam && S.spam.phase === 0 && Math.hypot(m.x - m.tx, m.y - m.ty) < 8) { m.tx = 30 + api.rand() * (W - 60); m.ty = 30 + api.rand() * (H - 60); } });
        /* floaters */
        if (S.squintHeld && S.squintT > 6 && S.floaters.length < 12) { S.floaterT -= dt; if (S.floaterT <= 0) { S.floaterT = 0.25; S.floaterFade = 0; S.floaters.push({ x: api.rand() * W, y: api.rand() * H, vx: (api.rand() - 0.5) * 12, vy: (api.rand() - 0.5) * 8, r: 3 + api.rand() * 4, a: 0 }); } }
        S.floaters.forEach(function (f) { f.x += f.vx * dt; f.y += f.vy * dt; f.a = S.floaterFade ? Math.max(0, f.a - dt / 3) : Math.min(1, f.a + dt); });
        if (S.floaterFade) { S.floaters = S.floaters.filter(function (f) { return f.a > 0.01; }); if (!S.floaters.length) S.floaterFade = 0; }
        /* birds / uc */
        if (S.birds && (now - S.birds.t0) * 0.06 > W + 80) S.birds = null;
        if (S.ucOn || S.ucDesk) {
          if (!S.uc) S.uc = { x: W * 0.3, y: H - 10, shift: 0 };
          const tgt = S.pointer && now - S.pointerAt < 60000 ? [S.pointer.x + 18, S.pointer.y + 18] : [W * 0.2, H - 20];
          let tx = tgt[0], ty = tgt[1];
          if (S.sun.swell > 0.1) { const sp = sunPos(), p = toScreen(sp[0], sp[1]); tx = lerp(tx, p[0], 0.7); ty = lerp(ty, p[1], 0.7); }
          S.uc.shift = lerp(S.uc.shift || 0, 0, Math.min(1, dt * 2));
          S.uc.x = lerp(S.uc.x, tx + S.uc.shift, Math.min(1, dt * 4.5)); S.uc.y = lerp(S.uc.y, ty, Math.min(1, dt * 4.5));
        }
        /* dim */
        const dimT = 0.08 * S.squintEase + (now < S.dimUntil ? 0.5 : 0); S.dimExtra = lerp(S.dimExtra, dimT, Math.min(1, dt * 4));
        if (Math.abs(S.dimExtra - (S.dimShown || 0)) > 0.01) { S.dimShown = S.dimExtra; dim.style.opacity = String(Math.round(S.dimExtra * 100) / 100); }
        /* notary cloud */
        if (S.notary && !S.notary.done) S.notary.cloud = leftmost();
      }
      function draw(now) {
        if (!ctx) return;
        const a = S.tilt * Math.PI / 180, t = S.t; ctx.setTransform(dpr, 0, 0, dpr, 0, 0); ctx.clearRect(0, 0, W, H); ctx.save(); ctx.translate(cx, cy); ctx.rotate(a); ctx.scale(S.stretch, S.squash); ctx.translate(-D / 2, -D / 2);
        const g = ctx.createLinearGradient(0, visTop(), 0, visTop() + H); g.addColorStop(0, mix(C_DAY_TOP, C_NIGHT_TOP, S.night)); g.addColorStop(1, mix(C_DAY_BOT, C_NIGHT_BOT, S.night));
        ctx.fillStyle = g; ctx.fillRect(-10, -10, D + 20, D + 20);
        if (S.night > 0.4) {
          ctx.globalAlpha = clamp((S.night - 0.4) / 0.6, 0, 1); ctx.fillStyle = '#fff6c9';
          STARS.forEach(function (s, i) { const x = visLeft() + s[0] * W, y = visTop() + s[1] * H, r = 7 + Math.sin(t * 2 + i) * 1.5; ctx.beginPath(); ctx.moveTo(x, y - r); ctx.quadraticCurveTo(x, y, x + r, y); ctx.quadraticCurveTo(x, y, x, y + r); ctx.quadraticCurveTo(x, y, x - r, y); ctx.quadraticCurveTo(x, y, x, y - r); ctx.fill(); });
          ctx.globalAlpha = 1;
        }
        /* sun */
        const sp = sunPos();
        if (S.night < 0.97) {
          if (S.sun.beam > now) { ctx.fillStyle = 'rgba(255,244,190,.35)'; ctx.beginPath(); ctx.moveTo(sp[0], sp[1]); ctx.lineTo(sp[0] - W * 1.1, sp[1] + H * 0.6); ctx.lineTo(sp[0] - W * 0.7, sp[1] + H * 1.1); ctx.closePath(); ctx.fill(); }
          if (S.inverted) { ctx.strokeStyle = '#2b2a33'; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(sp[0], sp[1] - sp[2]); ctx.lineTo(sp[0], sp[1] - sp[2] - 80); ctx.stroke(); }
          const rg = ctx.createRadialGradient(sp[0], sp[1], sp[2] * 0.6, sp[0], sp[1], sp[2] * (1.8 + S.sun.swell));
          rg.addColorStop(0, 'rgba(255,226,122,.55)'); rg.addColorStop(1, 'rgba(255,226,122,0)');
          ctx.fillStyle = rg; ctx.beginPath(); ctx.arc(sp[0], sp[1], sp[2] * (1.8 + S.sun.swell), 0, 6.283); ctx.fill();
          ctx.fillStyle = '#ffe27a'; ctx.strokeStyle = '#2b2a33'; ctx.lineWidth = 3; ctx.beginPath(); ctx.arc(sp[0], sp[1], sp[2], 0, 6.283); ctx.fill(); ctx.stroke();
          const roll = t * 1.7;
          [-1, 1].forEach(function (s) { const ex = sp[0] + s * sp[2] * 0.34, ey = sp[1] - sp[2] * 0.1; ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(ex, ey, sp[2] * 0.2, 0, 6.283); ctx.fill(); ctx.stroke(); ctx.fillStyle = '#2b2a33'; ctx.beginPath(); ctx.arc(ex + Math.cos(roll) * sp[2] * 0.07, ey - sp[2] * 0.08 + Math.sin(roll) * sp[2] * 0.05, sp[2] * 0.07, 0, 6.283); ctx.fill(); });
          ctx.beginPath(); ctx.arc(sp[0], sp[1] + sp[2] * 0.3, sp[2] * 0.25, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
        }
        /* clouds */
        /* squint blur is one CSS filter on the canvas (a single compositor pass); ctx.filter blurred every cloud draw separately and was very slow in software rendering */
        const bl = S.squintEase > 0.02 ? (3 * S.squintEase).toFixed(1) : '';
        if (bl !== S.blurV) { S.blurV = bl; cv.style.filter = bl ? 'blur(' + bl + 'px)' : ''; }
        S.clouds.forEach(function (c) { drawCloud(c, now); });
        ctx.restore();
        /* screen space */
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        S.clouds.forEach(function (c) {
          if (S.sel === c) { const p = toScreen(c.x, c.y); ctx.strokeStyle = '#7fd8b5'; ctx.lineWidth = 3; ctx.setLineDash([8, 6]); ctx.lineDashOffset = S.reducedNow ? 0 : -t * 20; ctx.beginPath(); ctx.arc(p[0], p[1], c.S * K * 1.25, 0, 6.283); ctx.stroke(); ctx.setLineDash([]); }
          if (c.pulseUntil > now && S.sel !== c) { const p = toScreen(c.x, c.y); ctx.strokeStyle = '#7fd8b5'; ctx.lineWidth = 4; ctx.setLineDash([9, 6]); ctx.lineDashOffset = S.reducedNow ? 0 : -t * 24; ctx.beginPath(); ctx.arc(p[0], p[1], c.S * K * (1.15 + (S.reducedNow ? 0.04 : 0.08 * Math.sin(t * 8))), 0, 6.283); ctx.stroke(); ctx.setLineDash([]); }
          if (S.notary && !S.notary.done && S.notary.cloud === c) {
            const p = toScreen(c.x, c.y); ctx.strokeStyle = '#f2b632'; ctx.lineWidth = 3; ctx.setLineDash([6, 5]); ctx.beginPath(); ctx.arc(p[0], p[1], c.S * K * 1.3, 0, 6.283); ctx.stroke(); ctx.setLineDash([]);
            ctx.fillStyle = '#f2b632'; ctx.fillRect(p[0] - 24, p[1] + c.S * K * 1.3 - 6, 48, 14); ctx.strokeStyle = '#2b2a33'; ctx.lineWidth = 1.5; ctx.strokeRect(p[0] - 24, p[1] + c.S * K * 1.3 - 6, 48, 14);
            ctx.fillStyle = '#2b2a33'; ctx.font = '800 10px system-ui,sans-serif'; ctx.textAlign = 'center'; ctx.fillText('NOTARY', p[0], p[1] + c.S * K * 1.3 + 5);
          }
        });
        if (S.birds) { ctx.font = '20px serif'; ctx.textAlign = 'left'; for (let i = 0; i < 3; i++) { const x = (now - S.birds.t0) * 0.06 - i * 28; if (x > -30 && x < W + 30) ctx.fillText('🐦', x, H * 0.18 + i * 16 + Math.sin(t * 3 + i) * 4); } }
        S.micro.forEach(function (m) { ctx.fillStyle = '#fff'; ctx.strokeStyle = '#2b2a33'; ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(m.x, m.y, m.r, 0, 6.283); ctx.fill(); ctx.stroke(); });
        S.floaters.forEach(function (f) { ctx.globalAlpha = 0.65 * f.a; ctx.fillStyle = '#b79ae6'; ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, 6.283); ctx.fill(); });
        ctx.globalAlpha = 1;
        if (S.uc && (S.ucOn || S.ucDesk)) {
          const u = S.uc; ctx.fillStyle = '#fff'; ctx.strokeStyle = '#2b2a33'; ctx.lineWidth = 1.5;
          [[-5, 2, 4.5], [0, -2, 5.5], [5.5, 2, 4.5]].forEach(function (p) { ctx.beginPath(); ctx.arc(u.x + p[0], u.y + p[1], p[2], 0, 6.283); ctx.fill(); ctx.stroke(); });
        }
      }
      function drawCloud(c, now) {
        const pts = [];
        for (let i = 0; i < 9; i++) pts.push(puffW(c, i));
        const pr = pts.filter(function (p) { return p[2] > 0; });
        const you = isYouPose(c) || S.silF > 0.5; ctx.globalAlpha = clamp(c.alpha, 0, 1);
        if (c.kind === 'sock') { c.trail.forEach(function (d) { if (d.a > 0) { ctx.globalAlpha = clamp(d.a, 0, 1) * c.alpha; ctx.fillStyle = '#b79ae6'; ctx.beginPath(); ctx.arc(d.x, d.y, 3, 0, 6.283); ctx.fill(); } }); ctx.globalAlpha = clamp(c.alpha, 0, 1); }
        ctx.fillStyle = '#2b2a33'; ctx.beginPath(); pr.forEach(function (p) { ctx.moveTo(p[0] + p[2] + 3, p[1]); ctx.arc(p[0], p[1], p[2] + 3, 0, 6.283); }); ctx.fill();
        ctx.fillStyle = c.kind === 'sock' ? '#e6dcf7' : '#ffffff'; ctx.beginPath(); pr.forEach(function (p) { ctx.moveTo(p[0] + p[2], p[1]); ctx.arc(p[0], p[1], p[2], 0, 6.283); }); ctx.fill();
        ctx.strokeStyle = c.kind === 'sock' ? '#c9b6ee' : '#fdeec6'; ctx.lineWidth = c.S * K * 0.07; ctx.beginPath(); pr.forEach(function (p) { ctx.moveTo(p[0] + Math.cos(0.15 * Math.PI) * p[2] * 0.78, p[1] + Math.sin(0.15 * Math.PI) * p[2] * 0.78); ctx.arc(p[0], p[1], p[2] * 0.78, 0.15 * Math.PI, 0.85 * Math.PI); }); ctx.stroke();
        if (c.kind === 'gerald') { ctx.fillStyle = 'rgba(176,138,90,.38)'; ctx.beginPath(); pr.forEach(function (p) { ctx.moveTo(p[0] + p[2], p[1]); ctx.arc(p[0], p[1], p[2], 0, 6.283); }); ctx.fill(); }
        const sz = c.S * K;
        if (c.kind === 'moustache') {
          const cx2 = pts[3][0] * 0.5 + pts[6][0] * 0.5 - 0, cy2 = pts[6][1] - sz * 0.05;
          ctx.strokeStyle = '#2b2a33'; ctx.lineWidth = sz * 0.06; ctx.lineCap = 'round';
          ctx.beginPath(); ctx.arc(cx2 - sz * 0.13, cy2, sz * 0.12, 0.05 * Math.PI, 0.95 * Math.PI); ctx.stroke();
          ctx.beginPath(); ctx.arc(cx2 + sz * 0.13, cy2, sz * 0.12, 0.05 * Math.PI, 0.95 * Math.PI); ctx.stroke();
          ctx.beginPath(); ctx.arc(cx2 - sz * 0.27, cy2 - sz * 0.04, sz * 0.04, 0.5 * Math.PI, 2.2 * Math.PI); ctx.stroke();
          ctx.beginPath(); ctx.arc(cx2 + sz * 0.27, cy2 - sz * 0.04, sz * 0.04, 0.8 * Math.PI, 2.5 * Math.PI); ctx.stroke();
          ctx.lineCap = 'butt';
        }
        if (you) {
          const h = pts[0]; ctx.fillStyle = '#2b2a33';
          ctx.beginPath(); ctx.arc(h[0] - sz * 0.15, h[1] + sz * 0.02, sz * 0.05, 0, 6.283); ctx.fill();
          ctx.beginPath(); ctx.arc(h[0] + sz * 0.15, h[1] + sz * 0.02, sz * 0.05, 0, 6.283); ctx.fill();
          ctx.strokeStyle = '#2b2a33'; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.arc(h[0], h[1] + sz * 0.05, sz * 0.13, 0.2 * Math.PI, 0.8 * Math.PI); ctx.stroke();
          if (S.silF > 0.5) { ctx.lineWidth = 2; ctx.beginPath(); ctx.arc(h[0] - sz * 0.15, h[1] + sz * 0.02, sz * 0.1, 0, 6.283); ctx.moveTo(h[0] + sz * 0.25, h[1] + sz * 0.02); ctx.arc(h[0] + sz * 0.15, h[1] + sz * 0.02, sz * 0.1, 0, 6.283); ctx.stroke(); const b = pts[3]; ctx.fillStyle = '#ff6b5e'; ctx.beginPath(); ctx.moveTo(b[0], b[1] + sz * 0.1); ctx.lineTo(b[0] - sz * 0.14, b[1] + sz * 0.02); ctx.lineTo(b[0] - sz * 0.14, b[1] + sz * 0.18); ctx.closePath(); ctx.moveTo(b[0], b[1] + sz * 0.1); ctx.lineTo(b[0] + sz * 0.14, b[1] + sz * 0.02); ctx.lineTo(b[0] + sz * 0.14, b[1] + sz * 0.18); ctx.closePath(); ctx.fill(); ctx.stroke(); }
        }
        if (c.kind === 'you' && S.silF < 0.5) {
          const hp = handPos(c); ctx.fillStyle = '#2b2a33'; ctx.beginPath(); ctx.arc(hp[0], hp[1], hp[2] + 3, 0, 6.283); ctx.fill(); ctx.fillStyle = '#fff'; ctx.beginPath(); ctx.arc(hp[0], hp[1], hp[2], 0, 6.283); ctx.fill();
        }
        ctx.globalAlpha = 1;
      }
      /* DOM overlays: buttons, tags, strings */
      function syncOverlays() {
        const order = S.clouds.map(function (c) { return { c: c, p: toScreen(c.x, c.y) }; });
        const sorted = order.slice().sort(function (a, b) { return a.p[0] - b.p[0]; });
        const n = sorted.length;
        sorted.forEach(function (o, idx) {
          const c = o.c, p = o.p, sz = c.S * K * 2.6;
          c.btn.style.transform = 'translate(' + Math.round(p[0] - sz / 2) + 'px,' + Math.round(p[1] - sz / 2) + 'px)';
          if (c.btnSz !== Math.round(sz)) { c.btnSz = Math.round(sz); c.btn.style.width = c.btnSz + 'px'; c.btn.style.height = c.btnSz + 'px'; }
          const what = c.kind === 'sock' ? 'a sock, on a journey' : c.kind === 'you' ? 'resembles you' : c.label ? "currently labelled '" + (c.label.text || '') + "'" : 'resembles nothing yet';
          const aria = 'Cloud ' + (idx + 1) + ' of ' + n + ', drifting, ' + what;
          if (c.ariaTxt !== aria) { c.ariaTxt = aria; c.btn.setAttribute('aria-label', aria); }
          c.btn.tabIndex = (c.kind === 'chair' || c.alpha < 0.2) ? -1 : 0;
          c.idx = idx;
          /* tag */
          const want = hasTag(c) && c.alpha > 0.3;
          if (want && !c.tag) {
            c.tag = el('button', { class: 'm-cloud-gazer-tag', type: 'button', tabindex: -1, onclick: function () { if (S.mode === 'play' && c.kind !== 'chair') { noteInput(); S.formKb = false; openForm(c); } } });
            tagsEl.appendChild(c.tag);
            c.path = el('path', { d: 'M0 0' }); strings.appendChild(c.path); c.tagTxt = '\u0000';
          } else if (!want && c.tag) {
            if (c.tag.parentNode) c.tag.parentNode.removeChild(c.tag); if (c.path && c.path.parentNode) c.path.parentNode.removeChild(c.path); c.tag = null; c.path = null;
          }
          if (c.tag) {
            const txt = tagText(c), key = txt + '|' + (S.sel === c) + '|' + (c.label && c.label.inkRun) + '|' + (c.awayTag ? 1 : 0);
            if (c.tagTxt !== key) {
              c.tagTxt = key; const full = Array.from(txt); c.tag.textContent = full.length > 14 ? full.slice(0, 14).join('') + '…' : txt; c.tag.title = txt;
              c.tag.classList.toggle('m-cloud-gazer-prev', S.sel === c); c.tag.classList.toggle('m-cloud-gazer-inkrun', !!(c.label && c.label.inkRun)); c.tag.classList.toggle('m-cloud-gazer-tiny', !!c.awayTag);
            }
            const tp = tagPos(c), an = toScreen(c.x, c.y - c.S * K * 0.95);
            c.tag.style.transform = 'translate(' + Math.round(tp[0]) + 'px,' + Math.round(tp[1]) + 'px) translate(-50%,-100%)';
            c.path.setAttribute('d', 'M' + Math.round(an[0]) + ' ' + Math.round(an[1]) + ' Q' + Math.round((an[0] + tp[0]) / 2) + ' ' + Math.round(Math.max(an[1], tp[1]) + 8) + ' ' + Math.round(tp[0]) + ' ' + Math.round(tp[1]));
          }
        });
        /* keep DOM order sorted by x (keyboard order) */
        if (S.orderAt === undefined || api.now() - S.orderAt > 500) {
          S.orderAt = api.now();
          const want = sorted.map(function (o) { return o.c.btn; }), have = Array.prototype.slice.call(btns.children);
          let same = want.length === have.length; for (let i = 0; same && i < want.length; i++) if (want[i] !== have[i]) same = false;
          let focusIn = false; try { focusIn = !!(document.activeElement && btns.contains(document.activeElement)); } catch (e) { focusIn = false; }
          if (!same && !focusIn) want.forEach(function (b) { btns.appendChild(b); }); /* moving a focused button would drop keyboard focus */
        }
      }
      function loop(ts) {
        if (!alive) return;
        S.raf = api.requestAnimationFrame(loop); const now = isFinite(ts) ? ts : api.now();
        if (document.hidden) { S.lastFrame = now; return; }
        if (now - (S.lastFrame || 0) < 30) return;
        const dt = clamp(((now - (S.lastFrame || now - 16)) / 1000) || 0.016, 0.001, 0.1); S.lastFrame = now; S.frameN = (S.frameN || 0) + 1;
        if (S.frameN % 20 === 1) { if (Math.abs(sky.clientWidth - W) > 1 || Math.abs(sky.clientHeight - H) > 1) layout(); }
        frameUpdate(dt, api.now()); draw(api.now()); syncOverlays();
      }
      /* ---------- resize ---------- */
      function onResize() {
        if (!alive) return;
        const ow = W; layout();
        if (S.t) { draw(api.now()); syncOverlays(); } /* resizing a canvas clears it; repaint now instead of flashing blank until the next frame */
        if (Math.abs(W - ow) < 2) return;
        const now = api.now(); S.resizes.push(now); while (S.resizes.length && now - S.resizes[0] > 20000) S.resizes.shift(); S.squash = 0.45; if (W > 1000) S.stretch = 1.3;
        if (S.resizes.length >= 10 && now - (S.lastSommelier || -1e9) > 60000) { S.lastSommelier = now; speak(pick('rs3'), { mood: 'smug' }); return; }
        if (S.mode !== 'play' || now - S.lastReflow < 6000) return;
        S.lastReflow = now;
        if (W < 500) speak(pick('rs1'), { mood: 'neutral' }); else if (W > 1000) { speak(pick('rs2'), { mood: 'smug' }); sfx('boing'); } else speak(pick('rs0'), { mood: 'neutral' });
      }
      /* ---------- keyboard ---------- */
      function onKey(e) {
        if (!alive) return;
        noteInput(); const t = e.target, tag = t && t.tagName ? t.tagName : '', k = e.key; const typing = tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT' || !!(t && t.isContentEditable);
        if (k === 'Escape') { if (S.sel) { closeForm(); } else if (!regEl.hidden) toggleReg(false); return; }
        if (typing) { if (t === inp && (k === 'ArrowUp' || k === 'ArrowDown')) { e.preventDefault(); setCert(S.cert + (k === 'ArrowUp' ? 1 : -1)); } return; }
        if (e.ctrlKey || e.metaKey || e.altKey) return;
        if (S.mode === 'cert' && k === 'Enter' && S.certC && !S.certC.cont.hidden && tag !== 'BUTTON') { e.preventDefault(); onContinue(); return; }
        if (k === ' ' || k === 'Spacebar') {
          if (tag === 'BUTTON') return; /* Space on any focused button is that button's own activation, cloud buttons included */
          e.preventDefault(); if (!e.repeat) startSquint(); return;
        }
        if (S.mode !== 'play') return;
        if (k === 'q' || k === 'Q') tiltBy(-15);
        else if (k === 'e' || k === 'E') tiltBy(15);
        else if (k === 'n' || k === 'N') nextCloud();
      }
      function onKeyUp(e) { if ((e.key === ' ' || e.key === 'Spacebar')) { if (S.squintHeld) e.preventDefault(); stopSquint(); } }
      function nextCloud() {
        const cs = S.clouds.slice().sort(function (a, b) { return toScreen(a.x, a.y)[0] - toScreen(b.x, b.y)[0]; }).filter(function (c) { return !c.label && ['normal', 'returned', 'moustache', 'gerald'].indexOf(c.kind) >= 0 && c.alpha > 0.3; });
        if (!cs.length) return;
        let i = S.sel ? cs.indexOf(S.sel) : -1; const c = cs[(i + 1) % cs.length];
        try { c.btn.focus({ preventScroll: true }); } catch (e) { /* ignore */ }
        activateCloud(c, true);
      }
      /* ---------- wiring ---------- */
      api.on(sky, 'pointerdown', onSkyDown); api.on(sky, 'pointermove', onSkyMove); api.on(sky, 'click', onSkyClick);
      api.on(sky, 'wheel', onWheel, { passive: false });
      api.on(document, 'pointerup', onSkyUp);
      api.on(document, 'pointercancel', function () { onSkyUp(); S.ptrSquint = false; stopSquint(); });
      api.on(document, 'keydown', onKey); api.on(document, 'keyup', onKeyUp);
      api.on(document, 'visibilitychange', function () {
        stopSquint(); /* idle time only counts while the tab is visible */
        if (document.hidden) S.hiddenAt = api.now();
        else if (S.hiddenAt) {
          const gap = api.now() - S.hiddenAt; /* timed states must not run out while the tab was away */
          if (S.swap) { S.swap.press += gap; S.swap.nextAt += gap; }
          if (S.certC) S.certC.t0 += gap;
          if (S.spam) S.spam.t0 += gap;
          if (S.notary) S.notary.until += gap;
          if (S.dimUntil > S.hiddenAt) S.dimUntil += gap;
          S.lastInputAt = Math.min(api.now(), S.lastInputAt + (api.now() - S.hiddenAt)); S.hiddenAt = 0; }
      });
      api.on(window, 'blur', function () { stopSquint(); });
      api.on(window, 'resize', onResize);
      api.on(root, 'pointermove', function () { noteInput(); });
      api.on(root, 'pointerdown', function () { noteInput(); });
      setCert(3); layout(); paintShelf(); paintHint(); paintClip();
      if (save.certified) { unlock('squint'); unlock('tilt'); pellEl.hidden = false; folder.hidden = false; windEl.hidden = false; ucDeskEl.hidden = !S.ucDesk; paintHint(); S.fired.sock = false; }
      ucDeskEl.hidden = !S.ucDesk;
      for (let i = 0; i < 4; i++) makeCloud('normal', { x: visLeft() + W * (0.12 + 0.22 * i) + ri(-20, 20), alpha: 1 });
      speak(save.certified ? pick('ret') : pick('open'), { mood: 'proud', priority: 1 });
      api.stat.inc('cloud-gazer.mounted'); api.setInterval(directorTick, 250);
      api.setInterval(function () {
        if (S.exam || S.mode === 'away' || S.frozen) return;
        face.classList.add('m-cloud-gazer-blink'); api.setTimeout(function () { face.classList.remove('m-cloud-gazer-blink'); }, 140);
      }, 5000);
      S.raf = api.requestAnimationFrame(loop);
      return {
        destroy() {
          alive = false;
          try { writeSave(); } catch (e) { /* ignore */ }
        }
      };
    }
  });
})();
